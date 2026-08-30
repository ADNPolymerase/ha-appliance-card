/**
 * ha-appliance-card behaviour tests.  Run with:  node test/run.mjs
 *
 * Two things can go wrong in this card without looking wrong:
 *
 *   1. the cycle arithmetic (remaining time, ETA, progress, preheating), which
 *      is all derived and therefore all silently wrong when a rule changes;
 *   2. the brand mapping: every field is a configurable entity, so an unknown
 *      state or a missing entity must degrade, never throw.
 *
 * The editor gets its own section: CustomEvent.detail is a readonly accessor,
 * so a dispatch built the wrong way drops the payload and every edit is lost.
 * This card has ten CustomEvent sites and they are all exercised below.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { loadCard, markup, freezeClock, now, check, contains, report }
  from './harness.mjs';

const HERE     = dirname(fileURLToPath(import.meta.url));
const registry = await loadCard(join(HERE, '..', 'dist', 'ha-appliance-card.js'));
const Card     = registry.get('ha-appliance-card');
const Editor   = registry.get('ha-appliance-card-editor');

const T0 = freezeClock('2026-08-12T10:00:00Z');

// ── DOM instrumentation ──────────────────────────────────────────────────────
// harness.mjs hands back inert stubs on purpose, which is enough for the card
// but leaves five of the editor's ten dispatches unreachable: they live inside
// DOM listeners. The harness is shared with the other cards and is copied here
// verbatim, so the recording lives in this file instead of forking it.

const FakeNodeProto = Object.getPrototypeOf(document.createElement('div'));

FakeNodeProto.addEventListener = function (type, cb) {
  (this.__handlers ||= {})[type] = cb;
};
FakeNodeProto.querySelector = function (sel) {
  const memo = (this.__qs ||= new Map());
  if (!memo.has(sel)) memo.set(sel, document.createElement('div'));
  return memo.get(sel);
};
// Only attribute-presence selectors are resolved, which is all the editor uses
// ([data-field], [data-toggle]), and the stubs are built from the markup this
// node was actually given, so they carry real attribute values.
FakeNodeProto.querySelectorAll = function (sel) {
  const attr = /^\[([a-z-]+)\]$/.exec(sel)?.[1];
  if (!attr) return [];
  const memo = (this.__qsa ||= new Map());
  if (memo.has(sel)) return memo.get(sel);
  const seen = new Set(), out = [];
  for (const m of String(this._html || '').matchAll(new RegExp(`${attr}="([^"]*)"`, 'g'))) {
    if (seen.has(m[1])) continue;
    seen.add(m[1]);
    const node = document.createElement('input');
    node.setAttribute(attr, m[1]);
    out.push(node);
  }
  memo.set(sel, out);
  return out;
};

/** Fires a recorded handler, failing loudly if the wiring never happened. */
function fire(node, type, event) {
  const h = node?.__handlers?.[type];
  if (!h) throw new Error(`aucun handler "${type}" enregistre sur ce noeud`);
  h(event);
  return event;
}

// ── Fixtures ─────────────────────────────────────────────────────────────────

const HASS = states => ({
  states,
  entities: {},
  devices: {},
  locale: { language: 'en' },
  language: 'en',
  config: { unit_system: { temperature: '°C' } },
  callService() {},
});

/** Builds a card, renders it once, and returns { card, html }. */
function build(config, states) {
  const c = new Card();
  c.setConfig({ type: 'custom:ha-appliance-card', ...config });
  c._hass = HASS(states);
  c._render();
  return { card: c, html: markup(c) };
}

const render = (config, states) => build(config, states).html;

/** Re-renders an existing card against new states, for the stateful paths. */
function rerender(card, states) {
  card._hass = HASS(states);
  card._render();
  return markup(card);
}

// ── Extractors ───────────────────────────────────────────────────────────────

const stateLine  = h => (/<div class="state-line">([^<]*)<\/div>/.exec(h) || [, ''])[1].trim();
const machineCls = h => (/<div class="machine ([^"]*)"/.exec(h) || [, ''])[1].replace(/\s+/g, ' ').trim();
const barStyle   = h => (/<div class="bar-fill" style="([^"]*)"/.exec(h) || [, ''])[1];
/** Colour the state line is actually painted with, read from the style block. */
const stateColor = h => (/\.state-line \{[^}]*color: ([^;]+);/.exec(h) || [, ''])[1].trim();
const barWidth   = h => (/width:([\d.]+)%/.exec(barStyle(h)) || [, null])[1];
const ovenDisp   = h => (/<div class="ov-disp">([^<]*)<\/div>/.exec(h) || [, ''])[1];
const mwDisp     = h => (/<div class="mw-disp">([^<]*)<\/div>/.exec(h) || [, ''])[1];
const zones      = h => [...h.matchAll(/<div class="ck-zone ([^"]*)"[^>]*>([^<]*)</g)]
  .map(m => `${m[1].trim()}:${m[2]}`);
/** Action buttons as "label:classes", so both presence and state are testable. */
const actionBtns = h => [...h.matchAll(/<div class="action-btn ([^"]*)"[^>]*title="([^"]*)"/g)]
  .map(m => `${m[2]}:${m[1].trim()}`);

/** Value of the info line carrying `label`, or null when the line is absent. */
function infoLine(html, label) {
  const re = new RegExp(`<span class="label">${label}</span>(?:<span>([^<]*)</span>)?`);
  const m = re.exec(html);
  return m ? (m[1] ?? '') : null;
}

// =============================================================================
// 1. Cycle arithmetic: remaining time, ETA, progress, preheating
// =============================================================================

const OVEN = {
  'sensor.oven_state':   { state: 'Preheating', attributes: {} },
  'number.oven_target':  { state: '180', attributes: { unit_of_measurement: '°C' } },
  'sensor.oven_current': { state: '142', attributes: { unit_of_measurement: '°C' } },
  'sensor.oven_rem':     { state: '1440', attributes: {} },
};

const remOven = render(
  { appliance_type: 'oven', state_entity: 'sensor.oven_state', remaining_time_entity: 'sensor.oven_rem' },
  OVEN);

contains('temps restant : 1440 s sans unite = 24 min', infoLine(remOven, 'Remaining time'), '24 min');
check('temps restant : une heure de fin est calculee',
  /ready at \d{1,2}:\d{2}/.test(infoLine(remOven, 'Remaining time') || ''), true);

contains('temps restant : unite minutes explicite',
  infoLine(render({ appliance_type: 'oven', state_entity: 'sensor.oven_state',
                    remaining_time_entity: 'sensor.rem_min', remaining_time_unit: 'minutes' },
    { ...OVEN, 'sensor.rem_min': { state: '24', attributes: {} } }), 'Remaining time'), '24 min');

contains('temps restant : unite auto depuis unit_of_measurement "min"',
  infoLine(render({ appliance_type: 'oven', state_entity: 'sensor.oven_state',
                    remaining_time_entity: 'sensor.rem_auto' },
    { ...OVEN, 'sensor.rem_auto': { state: '24', attributes: { unit_of_measurement: 'min' } } }),
    'Remaining time'), '24 min');

// device_class timestamp: an absolute finish time, not a duration.
contains('temps restant : device_class timestamp = difference a maintenant',
  infoLine(render({ appliance_type: 'oven', state_entity: 'sensor.oven_state',
                    remaining_time_entity: 'sensor.rem_ts' },
    { ...OVEN, 'sensor.rem_ts': { state: new Date(T0 + 30 * 60000).toISOString(),
                                  attributes: { device_class: 'timestamp' } } }),
    'Remaining time'), '30 min');

check('temps restant : timestamp deja passe = termine',
  infoLine(render({ appliance_type: 'oven', state_entity: 'sensor.oven_state',
                    remaining_time_entity: 'sensor.rem_past' },
    { ...OVEN, 'sensor.rem_past': { state: new Date(T0 - 60000).toISOString(),
                                    attributes: { device_class: 'timestamp' } } }),
    'Remaining time'), 'Done');

// A stale finish time must not linger once the appliance goes idle.
check('hide_when_idle : masque le temps restant hors marche',
  infoLine(render({ appliance_type: 'washer', state_entity: 'sensor.idle',
                    remaining_time_entity: 'sensor.oven_rem', remaining_time_hide_when_idle: true },
    { ...OVEN, 'sensor.idle': { state: 'Idle', attributes: {} } }), 'Remaining time'), null);

contains('hide_when_idle : affiche le temps restant en marche',
  infoLine(render({ appliance_type: 'washer', state_entity: 'sensor.run',
                    remaining_time_entity: 'sensor.oven_rem', remaining_time_hide_when_idle: true },
    { ...OVEN, 'sensor.run': { state: 'Running', attributes: {} } }), 'Remaining time'), '24 min');

// Progress is latched on the first running render, then counts down from it.
const prog = build({ appliance_type: 'washer', state_entity: 'sensor.w', remaining_time_entity: 'sensor.r' },
  { 'sensor.w': { state: 'Running', attributes: {} }, 'sensor.r': { state: '3600', attributes: {} } });
check('progression : premier rendu = 0 %', barWidth(prog.html), '0');
check('progression : moitie du temps ecoule = 50 %',
  barWidth(rerender(prog.card, { 'sensor.w': { state: 'Running', attributes: {} },
                                 'sensor.r': { state: '1800', attributes: {} } })), '50');
check('progression : cycle termine = 100 %',
  barWidth(rerender(prog.card, { 'sensor.w': { state: 'Finished', attributes: {} },
                                 'sensor.r': { state: '0', attributes: {} } })), '100');

// "Preheating" has no word boundary before "heating", so it fell through to the
// unknown bucket until it got its own keyword. It must count as an active state.
check('prechauffage : etat normalise, pas de repli brut', stateLine(remOven), 'Preheating');
contains('prechauffage : compte comme etat actif', machineCls(remOven), 'spinning');
contains('prechauffage : les resistances chauffent', machineCls(remOven), 'heating');

// While the oven climbs, the bar is a preheat gauge and takes over the cycle
// bar. The state here is "Running", not "Preheating", so the warm colour can
// only come from the gauge, since the preheating state is warm-coloured too, which
// would make the assertion pass for the wrong reason.
const OVEN_RUN = { ...OVEN, 'sensor.oven_run': { state: 'Running', attributes: {} } };
const preheat = render({ appliance_type: 'oven', state_entity: 'sensor.oven_run',
                         target_temperature_entity: 'number.oven_target',
                         current_temperature_entity: 'sensor.oven_current',
                         remaining_time_entity: 'sensor.oven_rem' }, OVEN_RUN);
check('prechauffage : la jauge de montee prime sur la progression', barWidth(preheat), '79');
contains('prechauffage : jauge en couleur chaude', barStyle(preheat), '#ff7043');
contains('four : consigne affichee sur le bandeau', ovenDisp(preheat), '180');
contains('four : temperature courante et consigne sur une ligne',
  infoLine(preheat, 'Temperature'), '142 °C → 180 °C');

// Once at temperature the preheat gauge steps aside for the cycle progress.
const atTemp = render({ appliance_type: 'oven', state_entity: 'sensor.oven_run',
                        target_temperature_entity: 'number.oven_target',
                        current_temperature_entity: 'sensor.at_temp',
                        remaining_time_entity: 'sensor.oven_rem' },
  { ...OVEN_RUN, 'sensor.at_temp': { state: '180', attributes: { unit_of_measurement: '°C' } } });
contains('a temperature : retour a la couleur d\'etat', barStyle(atTemp), 'var(--info-color');

// The microwave shows a countdown, not a humanised duration.
check('micro-ondes : minuteur formate en compte a rebours',
  mwDisp(render({ appliance_type: 'microwave', state_entity: 'sensor.mw',
                  remaining_time_entity: 'sensor.mw_rem' },
    { 'sensor.mw': { state: 'Running', attributes: {} },
      'sensor.mw_rem': { state: '80', attributes: {} } })), '1:20');

// =============================================================================
// 2. Brand mapping: unknown states and missing entities must degrade
// =============================================================================

const unknownState = render({ appliance_type: 'washer', state_entity: 'sensor.x' },
  { 'sensor.x': { state: 'Zwischenschleudern', attributes: {} } });
check('etat inconnu : affiche tel quel', stateLine(unknownState), 'Zwischenschleudern');
check('etat inconnu : la carte est rendue quand meme', /<ha-card>/.test(unknownState), true);

check('entite d\'etat absente : rendu sans exception',
  stateLine(render({ appliance_type: 'washer', state_entity: 'sensor.nope' }, {})), 'Unknown');

// Every optional field pointed at an entity that does not exist.
const allMissing = render({
  appliance_type: 'oven',
  state_entity: 'sensor.ghost', program_entity: 'select.ghost',
  remaining_time_entity: 'sensor.ghost2', progress_entity: 'sensor.ghost3',
  door_entity: 'binary_sensor.ghost', alerts_entity: 'sensor.ghost4',
  connectivity_entity: 'binary_sensor.ghost2', light_entity: 'light.ghost',
  target_temperature_entity: 'number.ghost', current_temperature_entity: 'sensor.ghost5',
  power_entity: 'sensor.ghost6', start_entity: 'button.ghost',
}, {});
check('toutes les entites absentes : rendu sans exception', /<ha-card>/.test(allMissing), true);
check('toutes les entites absentes : aucune ligne temperature', infoLine(allMissing, 'Temperature'), null);
check('toutes les entites absentes : aucune barre', barStyle(allMissing), '');

check('state_map : correspondance explicite prioritaire',
  stateLine(render({ appliance_type: 'washer', state_entity: 'sensor.sm',
                     state_map: { 'Sluttet': 'done' } },
    { 'sensor.sm': { state: 'Sluttet', attributes: {} } })), 'Finished');

contains('alertes : les attributs actifs remontent',
  render({ appliance_type: 'washer', state_entity: 'sensor.w', alerts_entity: 'sensor.al' },
    { 'sensor.w': { state: 'Running', attributes: {} },
      'sensor.al': { state: 'on', attributes: { door_open: 'on', no_water: 'off', friendly_name: 'x' } } }),
  'door_open');

check('alertes : les attributs inactifs sont ignores',
  /no_water/.test(render({ appliance_type: 'washer', state_entity: 'sensor.w', alerts_entity: 'sensor.al' },
    { 'sensor.w': { state: 'Running', attributes: {} },
      'sensor.al': { state: 'on', attributes: { door_open: 'on', no_water: 'off' } } })), false);

check('porte : door_invert inverse bien la lecture',
  infoLine(render({ appliance_type: 'washer', state_entity: 'sensor.w',
                    door_entity: 'binary_sensor.d', door_invert: true },
    { 'sensor.w': { state: 'Running', attributes: {} },
      'binary_sensor.d': { state: 'on', attributes: {} } }), 'Door closed'), '');

contains('value_map : renomme une valeur brute',
  render({ appliance_type: 'washer', state_entity: 'sensor.w',
           info_entities: [{ entity: 'sensor.phase', label: 'Phase', value_map: { 3: 'Spinning' } }] },
    { 'sensor.w': { state: 'Running', attributes: {} },
      'sensor.phase': { state: '3', attributes: {} } }), 'Spinning');

// Smart-plug setups: the state comes from consumption alone.
const plugCfg = { appliance_type: 'oven', state_entity: 'sensor.plug',
                  power_entity: 'sensor.plug', power_on_threshold: 10 };
const plugStates = w => ({ 'sensor.plug': { state: String(w), attributes: { unit_of_measurement: 'W' } } });

const plug = build(plugCfg, plugStates(1850));
check('seuil de puissance : au-dessus du seuil = en marche', stateLine(plug.html), 'Running');
contains('seuil de puissance : l\'unite est affichee', infoLine(plug.html, 'Power'), 'W');
check('seuil de puissance : retombee sous le seuil = termine',
  stateLine(rerender(plug.card, plugStates(2))), 'Finished');
check('seuil de puissance : jamais la valeur brute comme etat',
  /1850/.test(stateLine(plug.html)), false);

check('seuil de puissance : sans passage en marche prealable = veille',
  stateLine(build(plugCfg, plugStates(2)).html), 'Idle');

// Same sensor on both fields implies the threshold, or the raw watts would be
// printed as the appliance state.
check('seuil implicite quand state_entity et power_entity sont le meme capteur',
  stateLine(render({ appliance_type: 'oven', state_entity: 'sensor.plug', power_entity: 'sensor.plug' },
    plugStates(1850))), 'Running');

// Home Connect exposes a hood's venting level as a select of opaque options.
// The real option strings from a Siemens LR97CBS20 on Home Connect, as shown
// in the reporter's own more-info dialog.
const HC_OPTS = [
  'Cooking.Hood.EnumType.Stage.FanOff',
  'Cooking.Hood.EnumType.Stage.FanStage01',
  'Cooking.Hood.EnumType.Stage.FanStage02',
  'Cooking.Hood.EnumType.Stage.FanStage03',
];
const hoodSelect = render({ appliance_type: 'hood', state_entity: 'switch.hood', fan_entity: 'select.venting' },
  { 'switch.hood': { state: 'on', attributes: {} },
    'select.venting': { state: HC_OPTS[2], attributes: { options: HC_OPTS } } });
contains('hotte : vitesse lue depuis un select Home Connect', machineCls(hoodSelect), 'v2');
check('hotte : le niveau du select est affiche', infoLine(hoodSelect, 'Fan speed'), '2');

check('hotte : select sur FanOff = arret',
  machineCls(render({ appliance_type: 'hood', state_entity: 'switch.hood', fan_entity: 'select.venting' },
    { 'switch.hood': { state: 'on', attributes: {} },
      'select.venting': { state: HC_OPTS[0], attributes: { options: HC_OPTS } } })).includes('v0'), true);

contains('hotte : entite fan classique via percentage',
  machineCls(render({ appliance_type: 'hood', state_entity: 'sensor.h', fan_entity: 'fan.h' },
    { 'sensor.h': { state: 'on', attributes: {} },
      'fan.h': { state: 'on', attributes: { percentage: 66 } } })), 'v2');

contains('hotte : preset boost force l\'intensif',
  machineCls(render({ appliance_type: 'hood', state_entity: 'sensor.h', fan_entity: 'fan.h' },
    { 'sensor.h': { state: 'on', attributes: {} },
      'fan.h': { state: 'on', attributes: { percentage: 100, preset_mode: 'boost' } } })), 'boost');

// Without a fan entity the speed is unknown: the drawing may move, the card
// must not claim a level it never received.
check('hotte sur prise seule : aucune vitesse inventee',
  infoLine(render({ appliance_type: 'hood', state_entity: 'sensor.h' },
    { 'sensor.h': { state: 'on', attributes: {} } }), 'Fan speed'), null);

// The speed line is the only way in to the speed entity, so it must survive the
// hood being switched off, since hiding it locked the user out of the setting.
const hoodOff = render({ appliance_type: 'hood', state_entity: 'switch.hood', fan_entity: 'select.venting' },
  { 'switch.hood': { state: 'off', attributes: {} },
    'select.venting': { state: HC_OPTS[0], attributes: { options: HC_OPTS } } });
check('hotte a l\'arret : la ligne vitesse reste affichee', infoLine(hoodOff, 'Fan speed'), 'Off');
contains('hotte a l\'arret : la ligne vitesse reste cliquable', hoodOff, 'data-more="select.venting"');

// Home Connect drops the venting level to unavailable while the hood is off.
// The line still says "Off", which is true, but must not invite a click that
// lands on a more-info dialog where nothing can be set.
const hoodLost = render({ appliance_type: 'hood', state_entity: 'switch.hood',
                          fan_entity: 'select.venting' },
  { 'switch.hood': { state: 'off', attributes: {} },
    'select.venting': { state: 'unavailable', attributes: {} } });
check('entite indisponible : la ligne reste affichee', infoLine(hoodLost, 'Fan speed'), 'Off');
check('entite indisponible : la ligne n\'est plus cliquable',
  /data-more="select.venting"/.test(hoodLost), false);
check('entite indisponible : plus de classe clickable',
  /class="info-line \s*clickable"/.test(hoodLost), false);

// Lost while the hood runs is not a speed of zero: we simply do not know.
check('entite perdue en marche : ni "Off" ni un niveau invente',
  infoLine(render({ appliance_type: 'hood', state_entity: 'switch.hood', fan_entity: 'select.venting' },
    { 'switch.hood': { state: 'on', attributes: {} },
      'select.venting': { state: 'unavailable', attributes: {} } }), 'Fan speed'), '--');

// The rule is generic, not hood-specific.
check('puissance indisponible : ligne non cliquable',
  /data-more="sensor.pw"/.test(render({ appliance_type: 'washer', state_entity: 'sensor.w',
    power_entity: 'sensor.pw' },
    { 'sensor.w': { state: 'Running', attributes: {} },
      'sensor.pw': { state: 'unavailable', attributes: {} } })), false);

contains('puissance disponible : ligne cliquable',
  render({ appliance_type: 'washer', state_entity: 'sensor.w', power_entity: 'sensor.pw' },
    { 'sensor.w': { state: 'Running', attributes: {} },
      'sensor.pw': { state: '1850', attributes: { unit_of_measurement: 'W' } } }),
  'data-more="sensor.pw"');

// ── On/off control ───────────────────────────────────────────────────────────
// A hood or a cooktop has no cycle to start or stop, so without this option it
// could report its state but never change it.

const hoodOn = render({ appliance_type: 'hood', state_entity: 'switch.hood',
                        toggle_entity: 'switch.hood', fan_entity: 'select.venting' },
  { 'switch.hood': { state: 'on', attributes: {} },
    'select.venting': { state: HC_OPTS[2], attributes: { options: HC_OPTS } } });
check('interrupteur : bouton rendu', actionBtns(hoodOn).length, 1);
contains('interrupteur : icone d\'alimentation', hoodOn, 'mdi:power');
contains('interrupteur : cible la bonne entite', hoodOn, 'data-entity="switch.hood"');
check('interrupteur : marque actif quand allume', actionBtns(hoodOn)[0].endsWith(':on'), true);

check('interrupteur : non marque quand eteint',
  actionBtns(render({ appliance_type: 'hood', state_entity: 'switch.hood', toggle_entity: 'switch.hood' },
    { 'switch.hood': { state: 'off', attributes: {} } }))[0].endsWith(':on'), false);

check('interrupteur : absent si l\'option n\'est pas configuree',
  actionBtns(render({ appliance_type: 'hood', state_entity: 'switch.hood' },
    { 'switch.hood': { state: 'on', attributes: {} } })).length, 0);

// Cooktop zones: numeric levels, worded levels and residual heat.
const hob = render({ appliance_type: 'cooktop', state_entity: 'sensor.hob',
                     child_lock_entity: 'binary_sensor.lock',
                     zones: [{ level_entity: 'sensor.z1' },
                             { level_entity: 'sensor.z2', residual_heat_entity: 'binary_sensor.z2hot' },
                             { level_entity: 'sensor.z3' }] },
  { 'sensor.hob': { state: 'on', attributes: {} },
    'sensor.z1': { state: '3', attributes: {} },
    'sensor.z2': { state: '0', attributes: {} },
    'sensor.z3': { state: 'boost', attributes: {} },
    'binary_sensor.z2hot': { state: 'on', attributes: {} },
    'binary_sensor.lock': { state: 'on', attributes: {} } });
check('plaque : niveaux numerique, residuel et booster',
  zones(hob).join(' | '), 'on:3 | residual:H | on max:P');
check('plaque : nombre de foyers actifs', infoLine(hob, 'Cooking zones'), '2 / 3');
check('plaque : securite enfant signalee', infoLine(hob, 'Child lock'), '');

check('plaque sans entite par foyer : 4 foyers indetermines',
  zones(render({ appliance_type: 'cooktop', state_entity: 'sensor.hob' },
    { 'sensor.hob': { state: 'on', attributes: {} } })).join(' | '),
  'on: | on: | on: | on:');

// The three original types must be untouched by all of the above.
const washer = render({ appliance_type: 'washer', state_entity: 'sensor.w',
                        door_entity: 'binary_sensor.d' },
  { 'sensor.w': { state: 'Washing', attributes: {} },
    'binary_sensor.d': { state: 'off', attributes: {} } });
check('non-regression lave-linge : etat', stateLine(washer), 'Running');
contains('non-regression lave-linge : illustration du tambour', washer, 'water-level');
check('non-regression lave-linge : porte fermee', infoLine(washer, 'Door closed'), '');

// ── Escaping ─────────────────────────────────────────────────────────────────

const quoted = render({ appliance_type: 'cooktop', state_entity: 'sensor.hob',
                        zones: [{ level_entity: 'sensor.z1', name: 'Avant "gauche" <b>' }] },
  { 'sensor.hob': { state: 'on', attributes: {} }, 'sensor.z1': { state: '3', attributes: {} } });
// All five of & < > " ' are escaped, so the name survives as text and cannot
// close the attribute or open a tag.
contains('nom de foyer echappe dans l\'attribut title', quoted, 'title="Avant &quot;gauche&quot; &lt;b&gt;"');
check('nom de foyer : rien d\'injecte', /title="Avant "gauche"/.test(quoted), false);

// =============================================================================
// 3. The ten CustomEvent sites
// =============================================================================
// CustomEvent.detail is a readonly accessor: a dispatch built the wrong way
// silently loses detail.config and every edit made in the editor is discarded.

const EDITOR_STATES = {
  'sensor.oven_appliance_state': { state: 'Preheating', attributes: {} },
  'sensor.oven_program':         { state: 'hot_air', attributes: {} },
  'sensor.oven_door':            { state: 'off', attributes: {} },
  'sensor.z1':                   { state: '3', attributes: {} },
};

/** Asserts the last dispatch is a config-changed carrying a real config. */
function checkFired(label, el, extra) {
  const ev = el.events.at(-1);
  check(`${label} : type config-changed`, ev?.type, 'config-changed');
  check(`${label} : detail.config non nul`, !!ev?.detail?.config, true);
  if (extra) extra(ev);
}

function newEditor(config) {
  const ed = new Editor();
  ed.setConfig({ type: 'custom:ha-appliance-card', ...config });
  ed.hass = HASS(EDITOR_STATES);
  return ed;
}

// 1/10. The card's own more-info request.
const moreInfoCard = build({ appliance_type: 'washer', state_entity: 'sensor.w' },
  { 'sensor.w': { state: 'Running', attributes: {} } }).card;
moreInfoCard._moreInfo('sensor.w');
const miEv = moreInfoCard.events.at(-1);
check('1/10 hass-more-info : type', miEv?.type, 'hass-more-info');
check('1/10 hass-more-info : detail.entityId', miEv?.detail?.entityId, 'sensor.w');

// 2/10. Auto-suggestion on the first hass, which patches the config.
const edSuggest = new Editor();
edSuggest.setConfig({ type: 'custom:ha-appliance-card', state_entity: 'sensor.oven_appliance_state' });
edSuggest.hass = HASS(EDITOR_STATES);
checkFired('2/10 _applySuggestions', edSuggest,
  ev => check('2/10 _applySuggestions : le programme a ete suggere',
    ev.detail.config.program_entity, 'sensor.oven_program'));

// 3/10. A cooking zone edited.
const edZone = newEditor({ state_entity: 'sensor.oven_appliance_state', appliance_type: 'cooktop' });
edZone._updateZone(0, { level_entity: 'sensor.z1' });
checkFired('3/10 _updateZone', edZone,
  ev => check('3/10 _updateZone : la zone est dans la config',
    ev.detail.config.zones[0].level_entity, 'sensor.z1'));

// 4/10. An extra info entity edited.
const edInfo = newEditor({ state_entity: 'sensor.oven_appliance_state' });
edInfo._updateInfoEntity(0, { entity: 'sensor.oven_door' });
checkFired('4/10 _updateInfoEntity', edInfo,
  ev => check('4/10 _updateInfoEntity : l\'entite est dans la config',
    ev.detail.config.info_entities[0].entity, 'sensor.oven_door'));

// 5/10. Info entities reordered by drag and drop.
const edReorder = newEditor({ state_entity: 'sensor.oven_appliance_state',
                              info_entities: [{ entity: 'sensor.a' }, { entity: 'sensor.b' }] });
edReorder._reorderInfoEntities(0, 1);
checkFired('5/10 _reorderInfoEntities', edReorder,
  ev => check('5/10 _reorderInfoEntities : ordre inverse',
    ev.detail.config.info_entities[0].entity, 'sensor.b'));

// 6/10. An entity picker changed.
const edPicker = newEditor({ state_entity: 'sensor.oven_appliance_state' });
const slot   = edPicker._root.querySelector('[data-slot="state_entity"]');
const picker = slot.children.at(-1);
fire(picker, 'value-changed', { detail: { value: 'sensor.other' } });
checkFired('6/10 picker value-changed', edPicker,
  ev => check('6/10 picker value-changed : nouvelle entite',
    ev.detail.config.state_entity, 'sensor.other'));

// 7/10. A text, select or checkbox field changed.
const edField = newEditor({ state_entity: 'sensor.oven_appliance_state' });
const nameField = edField._root.querySelectorAll('[data-field]').find(n => n.getAttribute('data-field') === 'name');
nameField.value = 'Mon four';
fire(nameField, 'change', { target: nameField });
checkFired('7/10 champ [data-field]', edField,
  ev => check('7/10 champ [data-field] : valeur reportee', ev.detail.config.name, 'Mon four'));

// 8/10. A section switched off, which also clears its companion options.
const edToggle = newEditor({ state_entity: 'sensor.oven_appliance_state',
                             door_entity: 'sensor.oven_door', door_invert: true });
const doorToggle = edToggle._root.querySelectorAll('[data-toggle]').find(n => n.getAttribute('data-toggle') === 'door_entity');
doorToggle.checked = false;
fire(doorToggle, 'change', { target: doorToggle });
checkFired('8/10 section decochee', edToggle, ev => {
  check('8/10 section decochee : l\'entite est retiree', ev.detail.config.door_entity, undefined);
  check('8/10 section decochee : les options liees aussi', ev.detail.config.door_invert, undefined);
});

// 9/10. The number of extra info entities changed.
const edCount = newEditor({ state_entity: 'sensor.oven_appliance_state',
                            info_entities: [{ entity: 'sensor.a' }, { entity: 'sensor.b' }] });
const infoSelect = edCount._root.querySelector('[data-role="info-count-select"]');
fire(infoSelect, 'change', { target: { value: '1' } });
checkFired('9/10 nombre d\'entites d\'info', edCount,
  ev => check('9/10 nombre d\'entites d\'info : liste tronquee',
    ev.detail.config.info_entities.length, 1));

// 10/10. The number of cooking zones changed.
const edZoneCount = newEditor({ state_entity: 'sensor.oven_appliance_state', appliance_type: 'cooktop',
                                zones: [{ level_entity: 'sensor.z1' }, { level_entity: 'sensor.z2' }] });
const zoneSelect = edZoneCount._root.querySelector('[data-role="zone-count-select"]');
fire(zoneSelect, 'change', { target: { value: '1' } });
checkFired('10/10 nombre de foyers', edZoneCount,
  ev => check('10/10 nombre de foyers : liste tronquee', ev.detail.config.zones.length, 1));

// ── Silent config loss on rebuild ────────────────────────────────────────────
// Home Assistant calls setConfig again after every config-changed the editor
// emits. When that round trip changes which sections are filled, the editor
// rebuilds and recreates every ha-entity-picker, and a fresh picker announces
// an empty value before it knows its own. Taken at face value, that empty
// value deletes the configured entity and the card ends up saying the entity
// cannot be found, with nobody having touched anything.

const LOSS_STATES = {
  'sensor.washer_state':  { state: 'Running', attributes: {} },
  // Deliberately not a sibling of the state entity, so auto-suggestion stays
  // out of this scenario.
  'sensor.other_program': { state: 'Cotton', attributes: {} },
};

function editorAfterRoundTrip() {
  const ed = new Editor();
  ed.setConfig({ type: 'custom:ha-appliance-card', state_entity: 'sensor.washer_state' });
  ed.hass = HASS(LOSS_STATES);
  // The round trip: a second field arrives, the open-set changes, the form is
  // rebuilt and every picker is recreated.
  ed.setConfig({ type: 'custom:ha-appliance-card', state_entity: 'sensor.washer_state',
                 program_entity: 'sensor.other_program' });
  return ed;
}

const edLoss = editorAfterRoundTrip();
const freshPicker = edLoss._root.querySelector('[data-slot="state_entity"]').children.at(-1);
fire(freshPicker, 'value-changed', { detail: { value: '' } });
check('picker recree : l\'entite configuree survit a un value-changed vide',
  edLoss._config.state_entity, 'sensor.washer_state');

const edLossInfo = new Editor();
edLossInfo.setConfig({ type: 'custom:ha-appliance-card', state_entity: 'sensor.washer_state',
                       info_entities: [{ entity: 'sensor.other_program' }] });
edLossInfo.hass = HASS(LOSS_STATES);
const infoPicker = edLossInfo._root.querySelector('[data-slot="__info_0"]').children.at(-1);
fire(infoPicker, 'value-changed', { detail: { value: '' } });
check('picker d\'info recree : l\'entite survit a un value-changed vide',
  edLossInfo._config.info_entities[0]?.entity, 'sensor.other_program');

// The same empty value must still clear the field once the user has actually
// been in the form, otherwise the guard would make entities unremovable.
const edClear = editorAfterRoundTrip();
edClear._touched = true;
fire(edClear._root.querySelector('[data-slot="state_entity"]').children.at(-1),
     'value-changed', { detail: { value: '' } });
check('apres interaction : effacer reste possible', edClear._config.state_entity, undefined);

// An echo of the value already held is not a change and must not be republished.
const edEcho = editorAfterRoundTrip();
const echoBefore = edEcho.events.length;
fire(edEcho._root.querySelector('[data-slot="state_entity"]').children.at(-1),
     'value-changed', { detail: { value: 'sensor.washer_state' } });
check('echo de la meme valeur : aucun config-changed emis',
  edEcho.events.length, echoBefore);

// The guard must read the value the config holds now, not the one captured
// when the picker was mounted: info entities and zones change without forcing
// a rebuild, so a stale closure would refuse a legitimate clear.
const edLate = new Editor();
edLate.setConfig({ type: 'custom:ha-appliance-card', state_entity: 'sensor.washer_state' });
edLate.hass = HASS(LOSS_STATES);
edLate._touched = true;
const latePicker = edLate._root.querySelector('[data-slot="__info_0"]').children.at(-1);
fire(latePicker, 'value-changed', { detail: { value: 'sensor.other_program' } });
check('info : la selection est enregistree',
  edLate._config.info_entities[0]?.entity, 'sensor.other_program');
fire(latePicker, 'value-changed', { detail: { value: '' } });
check('info : effacer juste apres avoir choisi fonctionne encore',
  edLate._config.info_entities[0]?.entity, undefined);

// The structural guard itself: an equivalent config must not tear the form down.
const edStable = new Editor();
edStable.setConfig({ type: 'custom:ha-appliance-card', state_entity: 'sensor.washer_state' });
edStable.hass = HASS(LOSS_STATES);
edStable._root.innerHTML = '<!--sentinelle-->';
edStable.setConfig({ type: 'custom:ha-appliance-card', state_entity: 'sensor.washer_state' });
contains('config equivalente : le formulaire n\'est pas reconstruit',
  edStable._root.innerHTML, 'sentinelle');

// ── Editor guards ────────────────────────────────────────────────────────────

check('editeur : les sections suivent le type choisi',
  newEditor({ state_entity: 'sensor.oven_appliance_state', appliance_type: 'hood' })
    ._root.querySelectorAll('[data-toggle]').map(n => n.getAttribute('data-toggle')).includes('program_entity'),
  false);

check('editeur : la hotte propose bien la ventilation',
  newEditor({ state_entity: 'sensor.oven_appliance_state', appliance_type: 'hood' })
    ._root.querySelectorAll('[data-toggle]').map(n => n.getAttribute('data-toggle')).includes('fan_entity'),
  true);

// The on/off control is offered everywhere, including on the types that have
// no cycle and therefore no start/stop section.
for (const type of ['hood', 'cooktop', 'washer']) {
  check(`editeur : interrupteur propose sur ${type}`,
    newEditor({ state_entity: 'sensor.oven_appliance_state', appliance_type: type })
      ._root.querySelectorAll('[data-toggle]').map(n => n.getAttribute('data-toggle')).includes('toggle_entity'),
    true);
}

check('carte : state_entity manquante est refusee',
  (() => { try { new Card().setConfig({ type: 'custom:ha-appliance-card' }); return false; }
           catch { return true; } })(), true);

// ── Translation table ────────────────────────────────────────────────────────
// A partial language block degrades silently: t() falls back to English one key
// at a time, so a card ends up half translated with nothing ever failing. This
// is a static check on the table itself, which is what a contributed language
// needs before it can be trusted.

const SRC    = readFileSync(join(HERE, '..', 'dist', 'ha-appliance-card.js'), 'utf8');
const tStart = SRC.indexOf('const T = {');
const TABLE  = eval('(' + SRC.slice(tStart + 'const T ='.length, SRC.indexOf('\n};', tStart) + 2) + ')');
const EN_KEYS = Object.keys(TABLE.en);

for (const [code, block] of Object.entries(TABLE)) {
  const missing = EN_KEYS.filter(k => !(k in block));
  const extra   = Object.keys(block).filter(k => !EN_KEYS.includes(k));
  check(`traductions ${code} : parite des cles avec en`,
    [...missing.map(k => '-' + k), ...extra.map(k => '+' + k)].join(' ') || 'ok', 'ok');
}

// Regional variants must land on the base language, not fall back to English.
check('locale zh-CN : resolue vers le bloc zh',
  stateLine((() => {
    const c = new Card();
    c.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'washer', state_entity: 'sensor.w' });
    c._hass = { ...HASS({ 'sensor.w': { state: 'Running', attributes: {} } }),
                locale: { language: 'zh-CN' }, language: 'zh-CN' };
    c._render();
    return markup(c);
  })()), '\u8fd0\u884c\u4e2d');

// ── Escaping of everything an integration can inject ─────────────────────────
// The card builds its markup as a string. Every value below comes from the
// integration, not from the dashboard author: SmartThings, Home Connect, LG
// and Miele take program names, phase labels, friendly names and alert keys
// straight from a vendor cloud. Unescaped, any of them renders as HTML in the
// user's Home Assistant session. Reported by @frenck on hacs/default#9021.

const XSS = '<img src=x onerror=alert(1)>';

// The payload stays in the output: that is the point, it is a value the user
// should see. What must never happen is it arriving as live markup, so assert
// on the tag, not on the substring "onerror" which survives harmlessly as text.
function noInjection(label, html) {
  check(`${label} : aucune balise vivante`, /<img/i.test(html), false);
  contains(`${label} : la charge est echappee`, html, '&lt;img');
}

noInjection('nom convivial', render({ appliance_type: 'washer', state_entity: 'sensor.w' },
  { 'sensor.w': { state: 'Running', attributes: { friendly_name: XSS } } }));

noInjection('etat brut affiche tel quel',
  render({ appliance_type: 'washer', state_entity: 'sensor.w', state_show_raw: true },
    { 'sensor.w': { state: XSS, attributes: {} } }));

// A payload carrying no state keyword, so it really goes down the raw-echo
// path: '<img ... onerror=...>' would normalise to running on the leading
// " on" and never be echoed at all, which tested nothing.
const XSS_PLAIN = '<b>PWN</b>';
const unmapped = render({ appliance_type: 'washer', state_entity: 'sensor.w' },
  { 'sensor.w': { state: XSS_PLAIN, attributes: {} } });
check('etat non reconnu : aucune balise vivante', /<b>/i.test(unmapped), false);
contains('etat non reconnu : la charge est echappee', unmapped, '&lt;b&gt;PWN&lt;/b&gt;');

noInjection('libelle de ligne d\'info',
  render({ appliance_type: 'washer', state_entity: 'sensor.w', info_entities: [{ entity: 'sensor.i' }] },
    { 'sensor.w': { state: 'Running', attributes: {} },
      'sensor.i': { state: '40', attributes: { friendly_name: XSS } } }));

noInjection('valeur de ligne d\'info',
  render({ appliance_type: 'washer', state_entity: 'sensor.w', info_entities: [{ entity: 'sensor.i' }] },
    { 'sensor.w': { state: 'Running', attributes: {} },
      'sensor.i': { state: XSS, attributes: {} } }));

noInjection('cle d\'alerte',
  render({ appliance_type: 'washer', state_entity: 'sensor.w', alerts_entity: 'sensor.a' },
    { 'sensor.w': { state: 'Running', attributes: {} },
      'sensor.a': { state: 'on', attributes: { [XSS]: 'on' } } }));

// The icon sits inside a quoted attribute, so a bare double quote is enough to
// break out of it, no angle bracket needed.
const iconBreak = render(
  { appliance_type: 'washer', state_entity: 'sensor.w', info_entities: [{ entity: 'sensor.i' }] },
  { 'sensor.w': { state: 'Running', attributes: {} },
    'sensor.i': { state: '40', attributes: { icon: 'mdi:x" onload="alert(1)' } } });
// Unescaped this renders as icon="mdi:x" onload="alert(1)", a real attribute.
// Escaped, onload= survives as text but its quotes do not, so no attribute can
// form.
check('attribut icon : aucun attribut onload forme', /onload="/i.test(iconBreak), false);
contains('attribut icon : le guillemet est echappe', iconBreak, 'onload=&quot;');

// A legitimate value must still survive intact.
contains('valeur normale non alteree',
  render({ appliance_type: 'washer', state_entity: 'sensor.w', info_entities: [{ entity: 'sensor.i' }] },
    { 'sensor.w': { state: 'Running', attributes: {} },
      'sensor.i': { state: '1200', attributes: { friendly_name: 'Spin speed', unit_of_measurement: 'rpm' } } }),
  'Spin speed');

// ── Sections dashboard sizing ────────────────────────────────────────────────
// getCardSize() only serves the older masonry view. Sections sizes cards from
// getGridOptions(), and the height counted there was an approximation: it
// assumed one visual line per info entity. At half width a label like
// "Vitesse rotation" wraps onto two, the card grows past the rows it declared,
// and in a section that reads as one card overlapping the next.
//
// The content is variable by construction: info lines wrap, an alerts banner
// appears and disappears, the button row comes and goes. No row count can be
// right for all of it, so the card asks for the height it actually takes.

function grid(cfg) {
  const c = new Card();
  c.setConfig({ type: 'custom:ha-appliance-card', ...cfg });
  return c.getGridOptions();
}

const gMin  = grid({ state_entity: 'sensor.w' });
const gComp = grid({ state_entity: 'sensor.w', compact: true });
const gRich = grid({ state_entity: 'sensor.w', program_entity: 'p', remaining_time_entity: 'r',
                     door_entity: 'd', info_entities: [{ entity: 'a' }, { entity: 'b' }],
                     start_entity: 's' });

// Full width by default: the card carries an illustration and a column of
// labelled lines, and half a section is where those labels start wrapping.
check('grille : pleine largeur par defaut', gMin.columns, 12);
check('grille : largeur minimale declaree', gMin.min_columns, 4);
check('grille : pleine largeur aussi sur un frigo',
  grid({ appliance_type: 'fridge', power_entity: 'p' }).columns, 12);
// The whole point: never a number, whatever the config.
check('grille : hauteur automatique', gMin.rows, 'auto');
check('grille : automatique aussi en mode compact', gComp.rows, 'auto');
check('grille : automatique aussi sur une config chargee', gRich.rows, 'auto');
check('grille : automatique sur un frigo', grid({ appliance_type: 'fridge', power_entity: 'p' }).rows, 'auto');
// A leftover min_rows would let a section clamp the card back to a fixed height.
check('grille : aucun plancher de hauteur', gRich.min_rows, undefined);
check('grille : aucun plafond de hauteur', gRich.max_rows, undefined);

// ── Fridge and kettle ────────────────────────────────────────────────────────
// The fridge is the one type with no cycle: it never stops, so "running" is
// true of it every hour of its life and says nothing. Everything below tests
// the two consequences: the state line is a health summary instead, and the
// power meter is read backwards (staying low is the fault, not the idle state).

const FRIDGE = {
  'sensor.fr_t':       { state: '4',   attributes: { unit_of_measurement: '°C' } },
  'sensor.cg_t':       { state: '-18', attributes: { unit_of_measurement: '°C' } },
  'binary_sensor.fr_d': { state: 'off', attributes: {} },
  'binary_sensor.cg_d': { state: 'off', attributes: {} },
  'switch.ice':        { state: 'on',  attributes: {} },
  'sensor.plug':       { state: '72',  attributes: { unit_of_measurement: 'W' } },
};
const fridgeCfg = (extra) => ({ appliance_type: 'fridge', ...extra });
const withStates = (extra) => ({ ...FRIDGE, ...extra });

// A temperature probe and a door contact are a complete fridge. Demanding a
// state entity would only push people to point it at something meaningless.
function accepts(cfg) {
  try { new Card().setConfig({ type: 'custom:ha-appliance-card', ...cfg }); return true; }
  catch { return false; }
}
check('frigo : une sonde suffit, sans state_entity',
  accepts({ fridge_temperature_entity: 'sensor.fr_t' }), true);
check('frigo : un contact de porte suffit, sans state_entity',
  accepts({ appliance_type: 'fridge', door_entity: 'binary_sensor.fr_d' }), true);
check('frigo : une prise seule suffit, sans state_entity',
  accepts({ appliance_type: 'fridge', power_entity: 'sensor.plug' }), true);
// The relaxation must not leak to the other seven types.
check('lave-linge : state_entity reste obligatoire', accepts({ appliance_type: 'washer' }), false);
check('config vide : toujours refusee', accepts({}), false);

// A fridge-only field identifies the type on its own, which is what makes a
// state-entity-free config possible in the first place.
check('frigo : detecte sur un champ qui n\'existe que chez lui',
  /fr-body/.test(render({ fridge_temperature_entity: 'sensor.fr_t' }, FRIDGE)), true);

const frOk = render(fridgeCfg({ fridge_temperature_entity: 'sensor.fr_t',
  freezer_temperature_entity: 'sensor.cg_t', door_entity: 'binary_sensor.fr_d' }), FRIDGE);
check('frigo sain : l\'etat est Normal, pas En cours', stateLine(frOk), 'Normal');
contains('frigo sain : la sonde du frigo est affichee', infoLine(frOk, 'Fridge'), '4');
contains('frigo sain : la sonde du congelateur est affichee', infoLine(frOk, 'Freezer'), '-18');

// Health priority: what costs most to ignore wins the state line.
const frHot = render(fridgeCfg({ fridge_temperature_entity: 'sensor.fr_t' }),
  withStates({ 'sensor.fr_t': { state: '11', attributes: { unit_of_measurement: '°C' } } }));
check('frigo : au-dessus du seuil, temperature haute', stateLine(frHot), 'Temperature high');

const frDoor = render(fridgeCfg({ fridge_temperature_entity: 'sensor.fr_t', door_entity: 'binary_sensor.fr_d' }),
  withStates({ 'sensor.fr_t': { state: '11', attributes: { unit_of_measurement: '°C' } },
               'binary_sensor.fr_d': { state: 'on', attributes: {} } }));
check('frigo : une porte ouverte passe devant la temperature', stateLine(frDoor), 'Door open');

// The seuil is the fridge's own default of 1 W, not the 10 W a washer uses:
// a fridge below 1 W is unplugged, a fridge at 5 W is merely between cycles.
const frLow = build(fridgeCfg({ fridge_temperature_entity: 'sensor.fr_t', power_entity: 'sensor.plug' }),
  withStates({ 'sensor.plug': { state: '0', attributes: { unit_of_measurement: 'W' } } }));
check('frigo : 0 W depuis 0 min ne declenche rien', stateLine(frLow.html), 'Normal');

// Measured on a real fridge, isolated 0 W runs last up to 15 minutes while
// everything is fine. Ten minutes must therefore still read Normal.
freezeClock(new Date(T0 + 10 * 60 * 1000).toISOString());
check('frigo : 10 min sous le seuil, toujours Normal',
  stateLine(rerender(frLow.card, withStates({ 'sensor.plug': { state: '0', attributes: { unit_of_measurement: 'W' } } }))),
  'Normal');
freezeClock(new Date(T0 + 31 * 60 * 1000).toISOString());
const frUnplugged = rerender(frLow.card,
  withStates({ 'sensor.plug': { state: '0', attributes: { unit_of_measurement: 'W' } } }));
check('frigo : 31 min sous le seuil, debranche', stateLine(frUnplugged), 'Unplugged');
contains('frigo debranche : la duree accompagne la puissance', infoLine(frUnplugged, 'Power'), 'for');

// One reading back above the threshold clears the latch: a compressor restart
// must not leave a stale alarm behind.
// Priority again, at the top: a fridge whose plug is out is a worse problem
// than a door left open, and must be the one the state line reports.
freezeClock(new Date(T0 + 31 * 60 * 1000).toISOString());
const frBoth = build(fridgeCfg({ door_entity: 'binary_sensor.fr_d', power_entity: 'sensor.plug' }),
  withStates({ 'sensor.plug': { state: '0', attributes: { unit_of_measurement: 'W' } },
               'binary_sensor.fr_d': { state: 'on', attributes: {} } }));
freezeClock(new Date(T0 + 62 * 60 * 1000).toISOString());
check('frigo : debranche passe devant une porte ouverte',
  stateLine(rerender(frBoth.card,
    withStates({ 'sensor.plug': { state: '0', attributes: { unit_of_measurement: 'W' } },
                 'binary_sensor.fr_d': { state: 'on', attributes: {} } }))),
  'Unplugged');
freezeClock(new Date(T0 + 31 * 60 * 1000).toISOString());

const frBack = rerender(frLow.card, FRIDGE);
check('frigo : le retour au-dessus du seuil efface l\'alarme', stateLine(frBack), 'Normal');
freezeClock(new Date(T0).toISOString());

// The generic power-derived cycle state must never apply to a fridge: its
// compressor stops every twenty minutes and would report "Finished" each time.
const frCycle = render(fridgeCfg({ fridge_temperature_entity: 'sensor.fr_t', power_entity: 'sensor.plug',
  power_on_threshold: 50 }), withStates({ 'sensor.plug': { state: '2', attributes: { unit_of_measurement: 'W' } } }));
check('frigo : le compteur ne fabrique pas d\'etat de cycle', stateLine(frCycle), 'Normal');

// A Zigbee probe keeps reporting after the plug is pulled; one that stops must
// show dashes rather than a stale number, and must not read as too warm.
const frMute = render(fridgeCfg({ fridge_temperature_entity: 'sensor.fr_t', freezer_temperature_entity: 'sensor.cg_t' }),
  withStates({ 'sensor.fr_t': { state: 'unavailable', attributes: {} } }));
contains('frigo : sonde muette, l\'afficheur montre des tirets', frMute, '--°');
check('frigo : sonde muette ne declenche pas la temperature haute', stateLine(frMute), 'Normal');
// And nothing at all is drawn for a probe that was never configured.
check('frigo : sans sonde, aucun afficheur',
  /class="fr-lcd/.test(render(fridgeCfg({ door_entity: 'binary_sensor.fr_d' }), FRIDGE)), false);

// Two door sensors: naming a compartment only to say "closed" twice is noise.
const frBothShut = render(fridgeCfg({ door_entity: 'binary_sensor.fr_d', freezer_door_entity: 'binary_sensor.cg_d' }), FRIDGE);
check('frigo : deux portes fermees tiennent sur une ligne',
  (frBothShut.match(/class="info-line /g) || []).length, 1);
contains('frigo : deux portes fermees, libelle au pluriel', frBothShut, 'Doors closed');
const frCgOpen = render(fridgeCfg({ door_entity: 'binary_sensor.fr_d', freezer_door_entity: 'binary_sensor.cg_d' }),
  withStates({ 'binary_sensor.cg_d': { state: 'on', attributes: {} } }));
contains('frigo : la porte ouverte est nommee', frCgOpen, 'Freezer door open');
check('frigo : la porte fermee ne prend pas de ligne', /Fridge door open/.test(frCgOpen), false);

// Each door swings for its own sensor, hinged on the outer edge.
/** The two door panels, in DOM order, as "swung|shut". */
const panels = h => [...h.matchAll(/<div class="(fr-door[^"]*)" style="([^"]*)"/g)]
  .map(m => (m[1].includes('swung') ? 'swung' : 'shut'));
const sbs = (states) => render(fridgeCfg({ fridge_layout: 'side_by_side',
  door_entity: 'binary_sensor.fr_d', freezer_door_entity: 'binary_sensor.cg_d' }), withStates(states));
const sbsRight = sbs({ 'binary_sensor.fr_d': { state: 'on', attributes: {} } });
check('americain : la porte du refrigerateur est charniere a droite',
  /fr-door swung hinge-right/.test(sbsRight), true);
check('americain : le congelateur reste ferme', panels(sbsRight).join(','), 'shut,swung');
const sbsLeft = sbs({ 'binary_sensor.cg_d': { state: 'on', attributes: {} } });
check('americain : le congelateur s\'ouvre vers la gauche',
  /fr-door swung"/.test(sbsLeft), true);

// Stacked layouts: the top panel belongs to whichever compartment is on top,
// so the same open fridge door swings a different panel in each layout.
const openFridgeDoor = layout => render(
  fridgeCfg({ fridge_layout: layout, door_entity: 'binary_sensor.fr_d' }),
  withStates({ 'binary_sensor.fr_d': { state: 'on', attributes: {} } }));
check('congelateur en bas : la porte du frigo est celle du haut',
  panels(openFridgeDoor('freezer_bottom')).join(','), 'swung,shut');
check('congelateur en haut : la porte du frigo est celle du bas',
  panels(openFridgeDoor('freezer_top')).join(','), 'shut,swung');

// Read-only by design: a fridge exposes nothing to press, so a stray action
// entity left in the YAML must not grow a button row.
const frButtons = render(fridgeCfg({ fridge_temperature_entity: 'sensor.fr_t',
  toggle_entity: 'switch.ice', start_entity: 'switch.ice' }), FRIDGE);
check('frigo : aucun bouton, meme avec des entites d\'action', actionBtns(frButtons).length, 0);
check('frigo : le lave-linge garde les siens',
  actionBtns(render({ appliance_type: 'washer', state_entity: 'sensor.w', start_entity: 'switch.ice' },
    { ...FRIDGE, 'sensor.w': { state: 'Running', attributes: {} } })).length, 1);

// ── Kettle ───────────────────────────────────────────────────────────────────
const KETTLE = {
  'switch.kt':   { state: 'off', attributes: {} },
  'sensor.kt_t': { state: '21',  attributes: { unit_of_measurement: '°C' } },
};
const ktOff = render({ appliance_type: 'kettle', state_entity: 'switch.kt', temperature_entity: 'sensor.kt_t' }, KETTLE);
check('bouilloire : a l\'arret plutot qu\'en veille', stateLine(ktOff), 'Off');
check('bouilloire : rien ne bouille au repos', /machine [^"]*\bon\b/.test(ktOff), false);
contains('bouilloire : la sonde est affichee sur le corps', ktOff, '21°');

const ktOn = render({ appliance_type: 'kettle', state_entity: 'switch.kt', temperature_entity: 'sensor.kt_t' },
  { ...KETTLE, 'switch.kt': { state: 'on', attributes: {} }, 'sensor.kt_t': { state: '82', attributes: { unit_of_measurement: '°C' } } });
check('bouilloire : en chauffe plutot qu\'en cours', stateLine(ktOn), 'Heating');
check('bouilloire : le socle chauffe', /machine [^"]*\bon\b/.test(ktOn), true);
// The blue of "running" contradicted the glowing base; heating must read warm.
check('bouilloire : la ligne d\'etat est chaude, pas bleue', stateColor(ktOn), '#ff7043');
check('lave-linge : la ligne d\'etat reste bleue en cours',
  stateColor(render({ appliance_type: 'washer', state_entity: 'sensor.w' },
    { 'sensor.w': { state: 'Running', attributes: {} } })), 'var(--info-color, #2196f3)');
// No timer on a kettle: nothing must draw a progress bar.
check('bouilloire : aucune barre de progression', /class="bar-fill"/.test(ktOn), false);
check('bouilloire : sans sonde, aucun afficheur',
  /class="kt-lcd/.test(render({ appliance_type: 'kettle', state_entity: 'switch.kt' }, KETTLE)), false);

// ── Source encoding ──────────────────────────────────────────────────────────
// The card ships as one file loaded over HTTP by browsers whose charset
// guess is not ours to control. Every accented label is escaped at the source,
// and a copy-pasted literal would silently reintroduce mojibake.
check('source : purement ASCII', [...SRC].every((c) => c.charCodeAt(0) < 128), true);

// ── Cooker and coffee machine ────────────────────────────────────────────────
// Two opposite cases. Bosch sells a cooker (the Cookit) but it has no keys at
// all in the public Home Connect API, so its options must stay generic. The
// coffee machine is the reverse: Home Connect exposes its consumables in
// detail, and Jura and the filter machines add cups and strength on top.

const COOK = {
  'sensor.rc':       { state: 'Running', attributes: {} },
  'number.rc_tgt':   { state: '100', attributes: { unit_of_measurement: '°C' } },
  'sensor.rc_cur':   { state: '64',  attributes: { unit_of_measurement: '°C' } },
  'sensor.rc_spd':   { state: '0',   attributes: {} },
  'binary_sensor.rc_heat': { state: 'on', attributes: {} },
};
const cookCfg = (extra) => ({ appliance_type: 'cooker', state_entity: 'sensor.rc',
  target_temperature_entity: 'number.rc_tgt', current_temperature_entity: 'sensor.rc_cur',
  heating_entity: 'binary_sensor.rc_heat', speed_entity: 'sensor.rc_spd', ...extra });
const cook = (states) => render(cookCfg({}), { ...COOK, ...states });

// The blade turns at the speed the appliance reports. Thermomix goes to 10, so
// the scale is banded rather than one class per value.
check('robot : vitesse 0, le couteau ne tourne pas', machineCls(cook({})).includes('mixing'), false);
check('robot : vitesse 0 reste la classe s0', /\bs0\b/.test(machineCls(cook({}))), true);
check('robot : vitesse 2 tourne lentement',
  machineCls(cook({ 'sensor.rc_spd': { state: '2', attributes: {} } })), 'spinning heating mixing s1');
check('robot : vitesse 5 tourne plus vite',
  machineCls(cook({ 'sensor.rc_spd': { state: '5', attributes: {} } })), 'spinning heating mixing s2');
check('robot : vitesse 10 est au maximum',
  machineCls(cook({ 'sensor.rc_spd': { state: '10', attributes: {} } })), 'spinning heating mixing s3');
// A word instead of a number: only "off" means stopped.
check('robot : Turbo vaut la vitesse maximale',
  machineCls(cook({ 'sensor.rc_spd': { state: 'Turbo', attributes: {} } })), 'spinning heating mixing s3');
check('robot : le mot Arret arrete bien le couteau',
  machineCls(cook({ 'sensor.rc_spd': { state: 'Arrêt', attributes: {} } })).includes('mixing'), false);
contains('robot : la vitesse reelle reste sur la ligne',
  infoLine(cook({ 'sensor.rc_spd': { state: '7', attributes: {} } }), 'Speed'), '7');

// Heat is the oven machinery reused, so the preheat gauge must come with it.
check('robot : la chauffe s\'affiche', machineCls(cook({})).includes('heating'), true);
check('robot : la barre sert de jauge de montee en temperature', barWidth(cook({})), '64');
// A cooker has a lid, not a door with a sensor: no door line, ever.
check('robot : aucune ligne de porte',
  infoLine(render(cookCfg({ door_entity: 'binary_sensor.d' }),
    { ...COOK, 'binary_sensor.d': { state: 'on', attributes: {} } }), 'Door open'), null);

// ── Coffee machine ───────────────────────────────────────────────────────────
const CAFE = {
  'sensor.cf':            { state: 'Ready', attributes: {} },
  'binary_sensor.water':  { state: 'off', attributes: {} },
  'binary_sensor.beans':  { state: 'off', attributes: {} },
  'binary_sensor.tray':   { state: 'off', attributes: {} },
  'binary_sensor.desc':   { state: 'off', attributes: {} },
};
const cafeCfg = (extra) => ({ appliance_type: 'coffee', state_entity: 'sensor.cf',
  water_entity: 'binary_sensor.water', beans_entity: 'binary_sensor.beans',
  tray_entity: 'binary_sensor.tray', descaling_entity: 'binary_sensor.desc', ...extra });
const cafe = (states, extra) => render(cafeCfg(extra), { ...CAFE, ...states });
const ON = { state: 'on', attributes: {} };

check('cafe : rien a signaler, l\'etat reste celui de la machine', stateLine(cafe({})), 'Ready');
// Nothing wrong takes no line: the state line already says the machine is fine.
check('cafe : aucun consommable en alerte, aucune ligne',
  (cafe({}).match(/class="info-line /g) || []).length, 0);

// Priority is the order in which each one stops you getting a coffee.
check('cafe : reservoir vide', stateLine(cafe({ 'binary_sensor.water': ON })), 'Water tank empty');
check('cafe : le reservoir passe devant les grains',
  stateLine(cafe({ 'binary_sensor.water': ON, 'binary_sensor.beans': ON })), 'Water tank empty');
check('cafe : les grains passent devant le bac',
  stateLine(cafe({ 'binary_sensor.beans': ON, 'binary_sensor.tray': ON })), 'Bean container empty');
check('cafe : le bac passe devant le detartrage',
  stateLine(cafe({ 'binary_sensor.tray': ON, 'binary_sensor.desc': ON })), 'Drip tray full');
check('cafe : detartrage seul', stateLine(cafe({ 'binary_sensor.desc': ON })), 'Descaling due');
// But every one of them still gets its own line, priority or not.
check('cafe : deux alertes, deux lignes',
  (cafe({ 'binary_sensor.tray': ON, 'binary_sensor.desc': ON }).match(/class="info-line /g) || []).length, 2);

// A consumable never hides a cycle in progress: while the coffee is pouring,
// that is the more useful thing to read.
check('cafe : un ecoulement en cours passe devant une alerte',
  stateLine(cafe({ 'sensor.cf': { state: 'Run', attributes: {} }, 'binary_sensor.tray': ON })), 'Running');
check('cafe : le cafe coule',
  machineCls(cafe({ 'sensor.cf': { state: 'Run', attributes: {} } })).includes('pouring'), true);

// Cups reach the card in three shapes, and all three must land on one or two.
const cups = (st, entity) => machineCls(cafe({ 'sensor.x': st }, { cups_entity: entity || 'sensor.x' }));
check('cafe : MultipleBeverages a on = deux tasses',
  cups(ON).includes('two-cups'), true);
check('cafe : MultipleBeverages a off = une tasse',
  cups({ state: 'off', attributes: {} }).includes('two-cups'), false);
check('cafe : une cafetiere filtre a 8 tasses en dessine deux',
  cups({ state: '8', attributes: {} }).includes('two-cups'), true);
check('cafe : une seule tasse reste une seule tasse',
  cups({ state: '1', attributes: {} }).includes('two-cups'), false);
// Jura names the product rather than counting: "2 Espressi" is two cups.
check('cafe : un nom de boisson au pluriel compte pour deux',
  cups({ state: '2 Espressi', attributes: {} }).includes('two-cups'), true);
check('cafe : un nom de boisson au singulier compte pour une',
  cups({ state: 'Espresso', attributes: {} }).includes('two-cups'), false);
contains('cafe : la valeur reelle reste sur la ligne',
  infoLine(cafe({ 'sensor.x': { state: '8', attributes: {} } }, { cups_entity: 'sensor.x' }), 'Cups'), '8');

// Strength is a five-step enum on Home Connect and a word list on Jura.
const strength = (st) => machineCls(cafe({ 'sensor.s': st }, { strength_entity: 'sensor.s' }));
check('cafe : Mild vide le bac a grains dessine', /\bst1\b/.test(strength({ state: 'Mild', attributes: {} })), true);
check('cafe : Strong le remplit', /\bst3\b/.test(strength({ state: 'VeryStrong', attributes: {} })), true);
check('cafe : une valeur numerique moyenne', /\bst2\b/.test(strength({ state: '2', attributes: {} })), true);
check('cafe : sans entite de force, le bac est plein',
  /\bst3\b/.test(machineCls(cafe({}))), true);

// The water tank arrives as an event on Home Connect and as a level on a filter
// machine. A level is the more useful reading and must not be thrown away.
const lvl = (v) => cafe({ 'sensor.lvl': { state: String(v), attributes: { unit_of_measurement: '%' } } },
  { water_entity: 'sensor.lvl' });
contains('cafe : un niveau chiffre est affiche tel quel', infoLine(lvl(76), 'Water tank'), '76');
check('cafe : un niveau confortable ne declenche rien', stateLine(lvl(76)), 'Ready');
check('cafe : sous 10 %, le reservoir est vide', stateLine(lvl(6)), 'Water tank empty');
check('cafe : le niveau pilote la hauteur dessinee', /class="cf-water" style="height:76%"/.test(lvl(76)), true);
check('cafe : un booleen ne dessine pas de hauteur',
  /class="cf-water" style=/.test(cafe({ 'binary_sensor.water': ON })), false);

// Brewing shows the countdown, the way the microwave does: there is nothing
// else worth putting on that display.
contains('cafe : le decompte s\'affiche pendant l\'ecoulement',
  render(cafeCfg({ remaining_time_entity: 'sensor.rem' }),
    { ...CAFE, 'sensor.cf': { state: 'Run', attributes: {} },
      'sensor.rem': { state: '45', attributes: {} } }),
  'cf-disp');

// ── Rice cooker, and the cooking vocabulary ──────────────────────────────────
// Everything a rice cooker reports already existed on the card: MIoT's
// chunmi.cooker spec gives status, cook-mode and left-time, which are the
// state, the program and the remaining time. Two things did not exist: a
// "keep warm" state, and any keyword at all for "Cooking".

const rice = (raw, extra) => render(
  { appliance_type: 'rice_cooker', state_entity: 'sensor.rk', ...extra },
  { 'sensor.rk': { state: raw, attributes: {} } });

// "Cooking" matched nothing: not \brun, and not \bon either, since there is no
// word boundary inside the word. An oven, a hob and a rice cooker all fell
// through to unknown and printed their raw text in grey.
check('cuisson : Cooking est un etat en cours', stateLine(rice('Cooking')), 'Running');
check('cuisson : Cuisson aussi', stateLine(rice('Cuisson')), 'Running');
check('cuisson : Baking aussi', stateLine(rice('Baking')), 'Running');
check('cuisson : Brewing aussi', stateLine(rice('Brewing')), 'Running');
// The guard matters as much as the keyword: "done" is tested after "running"
// in the vocabulary, so without it a finished cycle would read as running.
check('cuisson : Cooking complete reste termine', stateLine(rice('Cooking complete')), 'Finished');
check('cuisson : Cooking finished reste termine', stateLine(rice('Cooking finished')), 'Finished');
check('cuisson : Cuisson terminee reste terminee', stateLine(rice('Cuisson terminée')), 'Finished');

// The MIoT status enum, end to end.
check('riz : status 1 Standby', stateLine(rice('Standby')), 'Idle');
check('riz : status 3 Scheduled', stateLine(rice('Scheduled')), 'Delayed start');
check('riz : status 4 Keep-warm', stateLine(rice('Keep-warm')), 'Keeping warm');
check('riz : status 5 Fault', stateLine(rice('Fault')), 'Error');
// Keeping warm is neither running nor done, and must not animate as either.
check('riz : le maintien au chaud n\'anime pas la cuisson',
  machineCls(rice('Keep-warm')).includes('heating'), false);
check('riz : le maintien au chaud a son propre repere',
  machineCls(rice('Keep-warm')).includes('warm'), true);
check('riz : la cuisson chauffe', machineCls(rice('Cooking')).includes('heating'), true);
// A rice cooker has a lid, not a door: no door line even if one is configured.
check('riz : aucune ligne de porte',
  infoLine(render({ appliance_type: 'rice_cooker', state_entity: 'sensor.rk', door_entity: 'binary_sensor.d' },
    { 'sensor.rk': { state: 'Cooking', attributes: {} },
      'binary_sensor.d': { state: 'on', attributes: {} } }), 'Door open'), null);

// Keeping warm belongs to every type that has it, not just to the rice cooker:
// an oven on its warming setting reports the same thing.
check('four : le maintien au chaud est reconnu la aussi',
  stateLine(render({ appliance_type: 'oven', state_entity: 'sensor.o' },
    { 'sensor.o': { state: 'Warming', attributes: {} } })), 'Keeping warm');

// ── Escaping in the visual editor, and out-of-range state_map ────────────────
// The card's own markup was covered in v1.2.2. The editor was not: it builds
// its rows as an innerHTML string too, and it writes config values straight
// into a value=" attribute, where a bare double quote is all it takes to break
// out. `name` is the field that matters most, since a dashboard config can be
// shared or generated rather than typed by the person reading it.

const edEsc = (config) => markup(newEditor({ appliance_type: 'washer', state_entity: 'sensor.w', ...config }));

const edQuote = edEsc({ name: 'Kitchen" onfocus="alert(1)' });
check('editeur : aucun attribut onfocus ne se forme', /onfocus="/i.test(edQuote), false);
contains('editeur : le guillemet du nom est echappe', edQuote, '&quot;');

const edScript = edEsc({ name: '<script>alert(1)</script>' });
check('editeur : aucune balise script vivante', /<script>alert/i.test(edScript), false);
contains('editeur : la balise du nom est echappee', edScript, '&lt;script&gt;');

// The other free text fields go through the same row builder.
const edState = edEsc({ door_entity: 'binary_sensor.d', door_open_state: 'x" onfocus="alert(1)' });
check('editeur : meme protection sur les autres champs texte', /onfocus="/i.test(edState), false);

// The card side, asserted explicitly rather than assumed.
const cardScript = render({ appliance_type: 'washer', state_entity: 'sensor.w' },
  { 'sensor.w': { state: 'Running', attributes: { friendly_name: '<script>alert(1)</script>' } } });
check('card : aucune balise script vivante dans le nom', /<script>alert/i.test(cardScript), false);
contains('card : le nom est echappe', cardScript, '&lt;script&gt;');

// state_map lets the user name the target category, so a typo lands a value no
// part of the card knows. Rejecting it in normalisation covers the colour, the
// label and the animation at once, instead of a fallback at each read site.
const mapped = (target) => render(
  { appliance_type: 'washer', state_entity: 'sensor.w', state_map: { Marche: target } },
  { 'sensor.w': { state: 'Marche', attributes: {} } });

const bogus = mapped('pas_un_etat');
// The target is rejected, so the card falls back to its unrecognised-state
// behaviour: the appliance's own wording is shown, which is more use on a
// dashboard than a generic "Unknown". What must never appear is the bogus
// category itself, and nothing may take its colour or its animation from it.
check('state_map hors normes : la valeur bidon ne s\'affiche pas', /pas_un_etat/.test(bogus), false);
check('state_map hors normes : le texte de l\'appareil est conserve', stateLine(bogus), 'Marche');
check('state_map hors normes : couleur de repli', stateColor(bogus), 'var(--disabled-text-color, #9e9e9e)');
check('state_map hors normes : rien ne bouge', machineCls(bogus).includes('spinning'), false);
// And a correct mapping must keep working.
check('state_map valide : toujours pris en compte', stateLine(mapped('running')), 'Running');
check('state_map valide : la machine tourne', machineCls(mapped('running')).includes('spinning'), true);

// The fridge layout decides the whole drawing: how many doors there are and
// where the freezer sits. Hiding it inside the temperature section meant a
// fridge set up with nothing but a door contact could never reach it.
const edLayout = (config) => markup(newEditor({ appliance_type: 'fridge', ...config }));
check('editeur : l\'implantation du frigo est offerte sans aucune sonde',
  /data-field="fridge_layout"/.test(edLayout({ door_entity: 'binary_sensor.d' })), true);
check('editeur : offerte aussi sur un frigo vide de tout',
  /data-field="fridge_layout"/.test(edLayout({})), true);
check('editeur : les quatre implantations sont proposees',
  ['single', 'freezer_bottom', 'freezer_top', 'side_by_side']
    .every((v) => edLayout({}).includes(`value="${v}"`)), true);
// And it belongs to the fridge alone.
check('editeur : aucune implantation sur un lave-linge',
  /data-field="fridge_layout"/.test(markup(newEditor({ appliance_type: 'washer', state_entity: 'sensor.w' }))), false);

// ── Fully qualified program enums ────────────────────────────────────────────
// Home Connect, and the home_connect_alt custom integration, report the
// programme as a namespaced enum: LaundryCare.Washer.Program.Auto40. Only the
// last segment names the programme; everything before it is noise on a card.
// Reported in issue #4.

const progName = (raw, extra) => infoLine(
  render({ appliance_type: 'washer', state_entity: 'sensor.w', program_entity: 'sensor.p', ...extra },
    { 'sensor.w': { state: 'Running', attributes: {} }, 'sensor.p': { state: raw, attributes: {} } }),
  'Program');

check('programme : l\'espace de noms Home Connect est retire',
  progName('LaundryCare.Washer.Program.Auto40'), 'Auto 40');
check('programme : sans chiffre non plus',
  progName('LaundryCare.Dryer.Program.Hygiene'), 'Hygiene');
// Confirmed on real hardware by @eclaassens in #4, on a Bosch WAXH2E70NL
// washer and a WTXH8E70NL dryer through home_connect_alt. Values seen on a
// device beat values invented for a test.
check('programme : SportFitness, releve sur un lave-linge Bosch',
  progName('LaundryCare.Washer.Program.SportFitness'), 'Sport Fitness');
check('programme : Synthetic, releve sur un seche-linge Bosch',
  progName('LaundryCare.Dryer.Program.Synthetic'), 'Synthetic');
check('programme : un enum a cinq segments aussi',
  progName('Cooking.Oven.Program.HeatingMode.HotAir'), 'Hot Air');
check('programme : la cafetiere de meme',
  progName('ConsumerProducts.CoffeeMaker.Program.Beverage.LatteMacchiato'), 'Latte Macchiato');

// Vendors run the temperature into the name, with no case boundary to split on.
check('programme : la temperature collee au nom est detachee', progName('Auto40'), 'Auto 40');
check('programme : et le suffixe apres le nombre', progName('Rapid20Min'), 'Rapid 20 Min');

// The behaviour that already existed must survive.
check('programme : le motif "<categorie> Pr <nom>" tient toujours',
  progName('Cotton Pr Eco40-60'), 'Eco 40-60');
check('programme : un nom deja lisible est laisse tel quel', progName('Eco 50 °C'), 'Eco 50 °C');
check('programme : raw ne touche a rien',
  progName('LaundryCare.Washer.Program.Auto40', { program_format: 'raw' }), 'LaundryCare.Washer.Program.Auto40');

// A value that merely contains a dot is not an enum and must be left alone.
check('programme : un nombre decimal n\'est pas un enum', progName('1.5 kg'), '1.5 kg');
check('programme : deux segments ne suffisent pas a en faire un', progName('Auto40.5'), 'Auto 40.5');

report();
