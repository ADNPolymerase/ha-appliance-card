/**
 * ha-appliance-card — behaviour tests.  Run with:  node test/run.mjs
 *
 * Two things can go wrong in this card without looking wrong:
 *
 *   1. the cycle arithmetic — remaining time, ETA, progress, preheating — which
 *      is all derived and therefore all silently wrong when a rule changes;
 *   2. the brand mapping — every field is a configurable entity, so an unknown
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
// Only attribute-presence selectors are resolved — that is all the editor uses
// ([data-field], [data-toggle]) — and the stubs are built from the markup this
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

/** Re-renders an existing card against new states — for the stateful paths. */
function rerender(card, states) {
  card._hass = HASS(states);
  card._render();
  return markup(card);
}

// ── Extractors ───────────────────────────────────────────────────────────────

const stateLine  = h => (/<div class="state-line">([^<]*)<\/div>/.exec(h) || [, ''])[1].trim();
const machineCls = h => (/<div class="machine ([^"]*)"/.exec(h) || [, ''])[1].replace(/\s+/g, ' ').trim();
const barStyle   = h => (/<div class="bar-fill" style="([^"]*)"/.exec(h) || [, ''])[1];
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
// 1. Cycle arithmetic — remaining time, ETA, progress, preheating
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
// only come from the gauge — the preheating state is warm-coloured too, which
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
// 2. Brand mapping — unknown states and missing entities must degrade
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
// hood being switched off — hiding it locked the user out of the setting.
const hoodOff = render({ appliance_type: 'hood', state_entity: 'switch.hood', fan_entity: 'select.venting' },
  { 'switch.hood': { state: 'off', attributes: {} },
    'select.venting': { state: HC_OPTS[0], attributes: { options: HC_OPTS } } });
check('hotte a l\'arret : la ligne vitesse reste affichee', infoLine(hoodOff, 'Fan speed'), 'Off');
contains('hotte a l\'arret : la ligne vitesse reste cliquable', hoodOff, 'data-more="select.venting"');

// Home Connect drops the venting level to unavailable while the hood is off.
// The line still says "Off" — which is true — but must not invite a click that
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
      'select.venting': { state: 'unavailable', attributes: {} } }), 'Fan speed'), '—');

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
// '>' is left alone on purpose: inside a quoted attribute it cannot break out,
// and only & " < can.
contains('nom de foyer echappe dans l\'attribut title', quoted, 'title="Avant &quot;gauche&quot; &lt;b>"');
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

// 1/10 — the card's own more-info request.
const moreInfoCard = build({ appliance_type: 'washer', state_entity: 'sensor.w' },
  { 'sensor.w': { state: 'Running', attributes: {} } }).card;
moreInfoCard._moreInfo('sensor.w');
const miEv = moreInfoCard.events.at(-1);
check('1/10 hass-more-info : type', miEv?.type, 'hass-more-info');
check('1/10 hass-more-info : detail.entityId', miEv?.detail?.entityId, 'sensor.w');

// 2/10 — auto-suggestion on the first hass, which patches the config.
const edSuggest = new Editor();
edSuggest.setConfig({ type: 'custom:ha-appliance-card', state_entity: 'sensor.oven_appliance_state' });
edSuggest.hass = HASS(EDITOR_STATES);
checkFired('2/10 _applySuggestions', edSuggest,
  ev => check('2/10 _applySuggestions : le programme a ete suggere',
    ev.detail.config.program_entity, 'sensor.oven_program'));

// 3/10 — a cooking zone edited.
const edZone = newEditor({ state_entity: 'sensor.oven_appliance_state', appliance_type: 'cooktop' });
edZone._updateZone(0, { level_entity: 'sensor.z1' });
checkFired('3/10 _updateZone', edZone,
  ev => check('3/10 _updateZone : la zone est dans la config',
    ev.detail.config.zones[0].level_entity, 'sensor.z1'));

// 4/10 — an extra info entity edited.
const edInfo = newEditor({ state_entity: 'sensor.oven_appliance_state' });
edInfo._updateInfoEntity(0, { entity: 'sensor.oven_door' });
checkFired('4/10 _updateInfoEntity', edInfo,
  ev => check('4/10 _updateInfoEntity : l\'entite est dans la config',
    ev.detail.config.info_entities[0].entity, 'sensor.oven_door'));

// 5/10 — info entities reordered by drag and drop.
const edReorder = newEditor({ state_entity: 'sensor.oven_appliance_state',
                              info_entities: [{ entity: 'sensor.a' }, { entity: 'sensor.b' }] });
edReorder._reorderInfoEntities(0, 1);
checkFired('5/10 _reorderInfoEntities', edReorder,
  ev => check('5/10 _reorderInfoEntities : ordre inverse',
    ev.detail.config.info_entities[0].entity, 'sensor.b'));

// 6/10 — an entity picker changed.
const edPicker = newEditor({ state_entity: 'sensor.oven_appliance_state' });
const slot   = edPicker._root.querySelector('[data-slot="state_entity"]');
const picker = slot.children.at(-1);
fire(picker, 'value-changed', { detail: { value: 'sensor.other' } });
checkFired('6/10 picker value-changed', edPicker,
  ev => check('6/10 picker value-changed : nouvelle entite',
    ev.detail.config.state_entity, 'sensor.other'));

// 7/10 — a text/select/checkbox field changed.
const edField = newEditor({ state_entity: 'sensor.oven_appliance_state' });
const nameField = edField._root.querySelectorAll('[data-field]').find(n => n.getAttribute('data-field') === 'name');
nameField.value = 'Mon four';
fire(nameField, 'change', { target: nameField });
checkFired('7/10 champ [data-field]', edField,
  ev => check('7/10 champ [data-field] : valeur reportee', ev.detail.config.name, 'Mon four'));

// 8/10 — a section switched off, which also clears its companion options.
const edToggle = newEditor({ state_entity: 'sensor.oven_appliance_state',
                             door_entity: 'sensor.oven_door', door_invert: true });
const doorToggle = edToggle._root.querySelectorAll('[data-toggle]').find(n => n.getAttribute('data-toggle') === 'door_entity');
doorToggle.checked = false;
fire(doorToggle, 'change', { target: doorToggle });
checkFired('8/10 section decochee', edToggle, ev => {
  check('8/10 section decochee : l\'entite est retiree', ev.detail.config.door_entity, undefined);
  check('8/10 section decochee : les options liees aussi', ev.detail.config.door_invert, undefined);
});

// 9/10 — the number of extra info entities changed.
const edCount = newEditor({ state_entity: 'sensor.oven_appliance_state',
                            info_entities: [{ entity: 'sensor.a' }, { entity: 'sensor.b' }] });
const infoSelect = edCount._root.querySelector('[data-role="info-count-select"]');
fire(infoSelect, 'change', { target: { value: '1' } });
checkFired('9/10 nombre d\'entites d\'info', edCount,
  ev => check('9/10 nombre d\'entites d\'info : liste tronquee',
    ev.detail.config.info_entities.length, 1));

// 10/10 — the number of cooking zones changed.
const edZoneCount = newEditor({ state_entity: 'sensor.oven_appliance_state', appliance_type: 'cooktop',
                                zones: [{ level_entity: 'sensor.z1' }, { level_entity: 'sensor.z2' }] });
const zoneSelect = edZoneCount._root.querySelector('[data-role="zone-count-select"]');
fire(zoneSelect, 'change', { target: { value: '1' } });
checkFired('10/10 nombre de foyers', edZoneCount,
  ev => check('10/10 nombre de foyers : liste tronquee', ev.detail.config.zones.length, 1));

// ── Silent config loss on rebuild ────────────────────────────────────────────
// Home Assistant calls setConfig again after every config-changed the editor
// emits. When that round trip changes which sections are filled, the editor
// rebuilds and recreates every ha-entity-picker — and a fresh picker announces
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
// been in the form — otherwise the guard would make entities unremovable.
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

report();
