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

contains('temps restant : 1440 s sans unite = 24 min', infoLine(remOven, 'Remaining time'), '24\u00a0min');
check('temps restant : une heure de fin est calculee',
  /ready\u00a0at\u00a0\d{1,2}:\d{2}/.test(infoLine(remOven, 'Remaining time') || ''), true);

contains('temps restant : unite minutes explicite',
  infoLine(render({ appliance_type: 'oven', state_entity: 'sensor.oven_state',
                    remaining_time_entity: 'sensor.rem_min', remaining_time_unit: 'minutes' },
    { ...OVEN, 'sensor.rem_min': { state: '24', attributes: {} } }), 'Remaining time'), '24\u00a0min');

contains('temps restant : unite auto depuis unit_of_measurement "min"',
  infoLine(render({ appliance_type: 'oven', state_entity: 'sensor.oven_state',
                    remaining_time_entity: 'sensor.rem_auto' },
    { ...OVEN, 'sensor.rem_auto': { state: '24', attributes: { unit_of_measurement: 'min' } } }),
    'Remaining time'), '24\u00a0min');

// device_class timestamp: an absolute finish time, not a duration.
contains('temps restant : device_class timestamp = difference a maintenant',
  infoLine(render({ appliance_type: 'oven', state_entity: 'sensor.oven_state',
                    remaining_time_entity: 'sensor.rem_ts' },
    { ...OVEN, 'sensor.rem_ts': { state: new Date(T0 + 30 * 60000).toISOString(),
                                  attributes: { device_class: 'timestamp' } } }),
    'Remaining time'), '30\u00a0min');

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
    { ...OVEN, 'sensor.run': { state: 'Running', attributes: {} } }), 'Remaining time'), '24\u00a0min');

// A narrow card may only wrap the combined value right after its dot. The
// duration and the end time keep their inner spaces unbreakable, so the time
// can never end up alone on the next line, cut off from what it is.
const remValue = infoLine(remOven, 'Remaining time') || '';
check('temps restant : une seule espace secable dans la valeur',
  (remValue.match(/ /g) || []).length, 1);
check('temps restant : cette espace suit le point',
  remValue.includes('\u00b7 '), true);

// remaining_time_split gives the end time a row of its own.
const splitOven = render({ appliance_type: 'oven', state_entity: 'sensor.oven_state',
                           remaining_time_entity: 'sensor.oven_rem', remaining_time_split: true }, OVEN);
check('split : la duree seule sur sa ligne', infoLine(splitOven, 'Remaining time'), '24\u00a0min');
check('split : l heure de fin sur sa propre ligne',
  /^\d{1,2}:\d{2}/.test(infoLine(splitOven, 'Ready at') || ''), true);
check('sans split : aucune ligne heure de fin', infoLine(remOven, 'Ready at'), null);
const splitDone = render({ appliance_type: 'oven', state_entity: 'sensor.oven_state',
                           remaining_time_entity: 'sensor.rem_past', remaining_time_split: true },
  { ...OVEN, 'sensor.rem_past': { state: new Date(T0 - 60000).toISOString(),
                                  attributes: { device_class: 'timestamp' } } });
check('split : cycle termine, une seule ligne', infoLine(splitDone, 'Remaining time'), 'Done');
check('split : cycle termine, pas d heure de fin', infoLine(splitDone, 'Ready at'), null);

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

const dishwasherClosed = render({ appliance_type: 'dishwasher', state_entity: 'sensor.dw',
                                  door_entity: 'binary_sensor.dw_door' },
  { 'sensor.dw': { state: 'Idle', attributes: {} },
    'binary_sensor.dw_door': { state: 'off', attributes: {} } });
check('lave-vaisselle : illustration dediee', /class="dw-body"/.test(dishwasherClosed), true);
check('lave-vaisselle : pas de corps lave-linge', /class="mbody"/.test(dishwasherClosed), false);
check('lave-vaisselle : inactiv ne porte pas spinning',
  machineCls(dishwasherClosed).includes('spinning'), false);

const dishwasherRunning = render({ appliance_type: 'dishwasher', state_entity: 'sensor.dw',
                                   door_entity: 'binary_sensor.dw_door' },
  { 'sensor.dw': { state: 'Running', attributes: {} },
    'binary_sensor.dw_door': { state: 'on', attributes: {} } });
check('lave-vaisselle : porte ouverte porte la classe open',
  /class="dw-door open"/.test(dishwasherRunning), true);
check('lave-vaisselle : en marche porte la classe spinning',
  machineCls(dishwasherRunning).includes('spinning'), true);
contains('lave-vaisselle : en marche anime le bras de lavage',
  dishwasherRunning, 'animation: dw-spray-spin');

const dishwasherDrying = render({ appliance_type: 'dishwasher', state_entity: 'sensor.dw',
                                 phase_entity: 'sensor.dw_phase' },
  { 'sensor.dw': { state: 'Running', attributes: {} },
    'sensor.dw_phase': { state: 'Drying', attributes: {} } });
check('lave-vaisselle : Drying donne une classe de phase',
  machineCls(dishwasherDrying).includes('phase-drying'), true);
contains('lave-vaisselle : Drying affiche les barres de chaleur',
  dishwasherDrying, 'class="dw-heat"');
// Both drying phases share one heat animation; only its position differs.
contains('lave-vaisselle : Drying anime la chaleur',
  dishwasherDrying, '.machine.phase-drying .dw-heat i,');
// The steam box is the door box, and it clips: without overflow the rising
// volutes escape above the machine and float over the card.
contains('lave-vaisselle : la vapeur est confinee au cadre de la porte',
  dishwasherDrying, 'top: 22px; right: 8px; bottom: 8px; left: 8px; z-index: 6;');
contains('lave-vaisselle : la vapeur est rognee au cadre',
  dishwasherDrying, 'overflow: hidden; border-radius: 4px; opacity: 0;');

const dishwasherAdoDrying = render({ appliance_type: 'dishwasher', state_entity: 'sensor.dw',
                                    phase_entity: 'sensor.dw_phase' },
  { 'sensor.dw': { state: 'Running', attributes: {} },
    'sensor.dw_phase': { state: 'Ado Drying', attributes: {} } });
check('lave-vaisselle : Ado Drying donne une classe de phase',
  machineCls(dishwasherAdoDrying).includes('phase-ado_drying'), true);
contains('lave-vaisselle : Ado Drying affiche la chaleur',
  dishwasherAdoDrying, 'class="dw-heat"');
contains('lave-vaisselle : Ado Drying anime la chaleur',
  dishwasherAdoDrying, 'animation: dw-heat-rise');

const dishwasherPrewash = render({ appliance_type: 'dishwasher', state_entity: 'sensor.dw',
                                  phase_entity: 'sensor.dw_phase' },
  { 'sensor.dw': { state: 'Running', attributes: {} },
    'sensor.dw_phase': { state: 'Pre Wash', attributes: {} } });
check('lave-vaisselle : Prewash pose la classe phase-prewash',
  machineCls(dishwasherPrewash).includes('phase-prewash'), true);
// A wash phase must keep the wash animation: only its character changes.
check('lave-vaisselle : Prewash reste en lavage',
  machineCls(dishwasherPrewash).includes('spinning'), true);
// The three wash phases deliberately share one animation: a dishwasher is
// doing the same thing in all of them, so none of them overrides the default.
check('lave-vaisselle : Prewash ne surcharge rien',
  /\.machine\.phase-prewash /.test(dishwasherPrewash), false);

const dishwasherRinsing = render({ appliance_type: 'dishwasher', state_entity: 'sensor.dw',
                                  phase_entity: 'sensor.dw_phase' },
  { 'sensor.dw': { state: 'Running', attributes: {} },
    'sensor.dw_phase': { state: 'Rinse', attributes: {} } });
check('lave-vaisselle : Rinsing pose la classe phase-rinsing',
  machineCls(dishwasherRinsing).includes('phase-rinsing'), true);
check('lave-vaisselle : Rinsing ne surcharge rien',
  /\.machine\.phase-rinsing /.test(dishwasherRinsing), false);

// mainwash has no rules of its own on purpose: the default wash animation is
// the main wash, so a phase class with no CSS behind it is the correct result.
const dishwasherMainwash = render({ appliance_type: 'dishwasher', state_entity: 'sensor.dw',
                                   phase_entity: 'sensor.dw_phase' },
  { 'sensor.dw': { state: 'Running', attributes: {} },
    'sensor.dw_phase': { state: 'Main Wash', attributes: {} } });
check('lave-vaisselle : Mainwash pose la classe phase-mainwash',
  machineCls(dishwasherMainwash).includes('phase-mainwash'), true);
check('lave-vaisselle : Mainwash ne surcharge rien',
  /\.machine\.phase-mainwash /.test(dishwasherMainwash), false);

const dishwasherNoPhase = render({ appliance_type: 'dishwasher', state_entity: 'sensor.dw',
                                  phase_entity: 'sensor.dw_phase' },
  { 'sensor.dw': { state: 'Running', attributes: {} },
    'sensor.dw_phase': { state: 'Unavailable', attributes: {} } });
check('lave-vaisselle : phase indisponible ne casse pas la classe',
  machineCls(dishwasherNoPhase).includes('phase-'), false);
contains('lave-vaisselle : phase indisponible conserve le lavage',
  dishwasherNoPhase, 'animation: dw-spray-spin');

// An animation whose @keyframes is missing from the injected CSS is set on the
// element but never runs: the browser resolves animation-name to nothing and the
// element silently keeps its base style. A stray brace above the rule is enough
// to lose it, and the card still renders, so nothing else catches this.
for (const [label, markupOf] of [['lave-vaisselle', dishwasherDrying], ['lave-linge', washer]]) {
  const names = [...markupOf.matchAll(/animation:\s*([a-z0-9-]+)/g)].map(m => m[1]);
  const defined = new Set([...markupOf.matchAll(/@keyframes\s+([a-z0-9-]+)/g)].map(m => m[1]));
  const missing = [...new Set(names)].filter(n => !defined.has(n));
  check(`${label} : chaque animation a ses keyframes dans le CSS injecte`, missing.join(',') , '');
}

const dishwasherDone = render({ appliance_type: 'dishwasher', state_entity: 'sensor.dw' },
  { 'sensor.dw': { state: 'Finished', attributes: {} } });
check('lave-vaisselle : cycle termine pose la classe done',
  machineCls(dishwasherDone).includes('done'), true);
contains('lave-vaisselle : vaisselle verte une fois termine',
  dishwasherDone, '.machine.done .dw-plate');
check('lave-vaisselle : a l arret la vaisselle reste neutre',
  machineCls(dishwasherClosed).includes('done'), false);

const dishwasherPaused = render({ appliance_type: 'dishwasher', state_entity: 'sensor.dw' },
  { 'sensor.dw': { state: 'Paused', attributes: {} } });
check('lave-vaisselle : en pause pose la classe paused',
  machineCls(dishwasherPaused).includes('paused'), true);
// done and paused both have a load to show, so the glass clears for them too.
contains('lave-vaisselle : la vitre s eclaircit aussi termine et en pause',
  dishwasherPaused, '.machine.done .dw-door,');

// At rest the arm is a still object in the state colour, not a dimmed version
// of the running one: no animation, and the accent the card already computed.
check('lave-vaisselle : termine, le bras ne tourne pas',
  machineCls(dishwasherDone).includes('spinning'), false);
contains('lave-vaisselle : termine, le bras prend la couleur de l etat',
  dishwasherDone, '#4caf50');
contains('lave-vaisselle : en pause, le bras prend la couleur de l etat',
  dishwasherPaused, '#ff9800');

// The shell colour is a preset, not a free value: it is injected as one CSS
// variable that every illustration family already reads for its body, doors and
// lids, so one option recolours the whole appliance without touching the state
// colours. Unset, nothing is emitted and the theme keeps its say.
const dwBlack = render({ appliance_type: 'dishwasher', state_entity: 'sensor.dw',
                         illustration_color: 'black' },
  { 'sensor.dw': { state: 'Idle', attributes: {} } });
contains('couleur du corps : le preset noir est injecte', dwBlack, '--ac-body: #3b4045;');
check('couleur du corps : par defaut rien n est impose',
  /--ac-body:/.test(dishwasherClosed), false);
contains('couleur du corps : la carrosserie lit la variable',
  dishwasherClosed, 'var(--ac-body, var(--secondary-background-color, #d7d7d7))');
const dwBogus = render({ appliance_type: 'dishwasher', state_entity: 'sensor.dw',
                         illustration_color: 'chartreuse' },
  { 'sensor.dw': { state: 'Idle', attributes: {} } });
check('couleur du corps : une valeur inconnue est ignoree',
  /--ac-body:/.test(dwBogus), false);

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

// Hiding the unit is set per info entity, from the form.
const edHide = new Editor();
edHide.setConfig({ type: 'custom:ha-appliance-card', state_entity: 'sensor.washer_state',
                   info_entities: [{ entity: 'sensor.other_program' }] });
edHide.hass = HASS(LOSS_STATES);
const hideBox = edHide._root.querySelector('[data-slot="__info_hideunit_0"]').children.at(-1).children[0];
fire(hideBox, 'change', { target: { checked: true } });
check('editeur : masquer l\'unite est enregistre', edHide._config.info_entities[0]?.hide_unit, true);
fire(hideBox, 'change', { target: { checked: false } });
check('editeur : decocher retire l\'option', edHide._config.info_entities[0]?.hide_unit, undefined);

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

check('locale cs-CZ : resolue vers le bloc cs',
  stateLine((() => {
    const c = new Card();
    c.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'washer', state_entity: 'sensor.w' });
    c._hass = { ...HASS({ 'sensor.w': { state: 'Running', attributes: {} } }),
                locale: { language: 'cs-CZ' }, language: 'cs-CZ' };
    c._render();
    return markup(c);
  })()), 'V provozu');

// ── Home Connect operation states (issue #8) ─────────────────────────────────
// Half of BSH's OperationState enum was recognised and half was not, and an
// unrecognised one printed its whole namespace on the card. Both halves are
// asserted here so a future keyword edit cannot quietly undo one of them.

const HC = "BSH.Common.EnumType.OperationState.";
const hcState = (value, extra) => {
  const c = new Card();
  c.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'washer',
    state_entity: 'sensor.hc', ...extra });
  c._hass = HASS({ 'sensor.hc': { state: value, attributes: {} } });
  c._render();
  return markup(c);
};

for (const [value, label] of [
  ['Run', 'Running'], ['Finished', 'Finished'], ['Pause', 'Paused'],
  ['DelayedStart', 'Delayed start'],
  // The four that fell through before.
  ['Ready', 'Idle'], ['Inactive', 'Idle'], ['Aborting', 'Running'],
]) {
  check(`home connect : ${value} se lit "${label}"`, stateLine(hcState(HC + value)), label);
}

// Aborting is a cycle being cancelled, so the drum is still turning: the
// category has to drive the animation, not just the label.
check('home connect : Aborting anime encore le tambour',
  machineCls(hcState(HC + 'Aborting')).split(' ').includes('spinning'), true);
check('home connect : Ready ne l\'anime pas',
  machineCls(hcState(HC + 'Ready')).split(' ').includes('spinning'), false);

// An enum the card has no opinion on is still echoed, but without the four
// words of namespace, and split where the vendor ran two words together.
check('home connect : un etat inconnu perd son espace de noms',
  stateLine(hcState(HC + 'ActionRequired')), 'Action Required');
check('home connect : et reste en gris, faute de categorie',
  stateColor(hcState(HC + 'ActionRequired')), 'var(--disabled-text-color, #9e9e9e)');

// state_show_raw asks for the entity's own text: it gets it whole, namespace
// included, because that is what was asked for.
check('home connect : state_show_raw garde l\'enum entier',
  stateLine(hcState(HC + 'ActionRequired', { state_show_raw: true })), HC + 'ActionRequired');

// The escape hatch the issue was really asking for, and which predates it.
check('home connect : state_map classe ce que les mots-cles ignorent',
  stateLine(hcState(HC + 'ActionRequired', { state_map: { [HC + 'ActionRequired']: 'error' } })),
  'Error');

// A plain state must not be mangled by the namespace stripper.
check('home connect : un etat sans point n\'est pas touche',
  stateLine(hcState('Souple', {})), 'Souple');

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

// ── Info line limit ──────────────────────────────────────────────────────────
// Eight extra lines at most: past that the card is a list. The ninth and after
// are ignored rather than squeezed in, and past five the lines tighten up.
const nineInfo = Array.from({ length: 9 }, (_, i) => ({ entity: `sensor.info${i + 1}`, label: `Info ${i + 1}` }));
const nineStates = unavailableAt => {
  const st = { 'sensor.w': { state: 'Running', attributes: {} } };
  for (let i = 1; i <= 9; i++) {
    st[`sensor.info${i}`] = { state: i === unavailableAt ? 'unavailable' : String(i), attributes: {} };
  }
  return st;
};
const infoCard = (infos, states) => render({ appliance_type: 'washer', state_entity: 'sensor.w', info_entities: infos }, states);
const infoCount = h => (h.match(/<span class="label">Info \d<\/span>/g) || []).length;
const isCompact = h => /<div class="info-lines compact">/.test(h);

const nine = infoCard(nineInfo, nineStates());
check('lignes d\'info : huit au plus', infoCount(nine), 8);
contains('lignes d\'info : la huitieme est la', nine, '<span class="label">Info 8</span>');
check('lignes d\'info : la neuvieme est ignoree', /Info 9/.test(nine), false);
// The limit applies to the configured list, not to what is left once the
// unavailable ones are gone: the ninth never steps in for a missing line.
const nineGap = infoCard(nineInfo, nineStates(2));
check('lignes d\'info : une ligne indisponible ne fait pas entrer la neuvieme', /Info 9/.test(nineGap), false);
check('lignes d\'info : sept affichees quand une des huit manque', infoCount(nineGap), 7);

check('lignes d\'info : resserrees au dela de cinq', isCompact(infoCard(nineInfo.slice(0, 6), nineStates())), true);
check('lignes d\'info : cinq gardent l\'espacement normal', isCompact(infoCard(nineInfo.slice(0, 5), nineStates())), false);
contains('lignes d\'info : sans resserrage la classe est nue', infoCard(nineInfo.slice(0, 5), nineStates()), '<div class="info-lines">');
// What counts is what is shown: six configured with one unavailable is five
// lines on screen, and five keep the normal spacing.
check('lignes d\'info : une ligne indisponible ne compte pas', isCompact(infoCard(nineInfo.slice(0, 6), nineStates(3))), false);
// Only the extra info entities count: the program and the remaining time were
// always there, and a card that did not change must not change its look.
check('lignes d\'info : programme et temps restant ne comptent pas',
  isCompact(render({ appliance_type: 'washer', state_entity: 'sensor.w', program_entity: 'sensor.p',
    remaining_time_entity: 'sensor.r', info_entities: nineInfo.slice(0, 5) },
    { ...nineStates(), 'sensor.p': { state: 'Cotton', attributes: {} },
      'sensor.r': { state: '45', attributes: { unit_of_measurement: 'min' } } })), false);
contains('lignes d\'info : l\'espacement resserre', nine, '.info-lines.compact { gap: 4px; }');
contains('lignes d\'info : le texte resserre', nine, '.info-lines.compact .info-line { font-size: 0.92em; }');
contains('lignes d\'info : les icones resserrees', nine, '.info-lines.compact .info-line ha-icon { --mdc-icon-size: 18px; }');

// An ignored line must not redraw the card either.
const nineCard = build({ appliance_type: 'washer', state_entity: 'sensor.w', info_entities: nineInfo }, nineStates()).card;
check('lignes d\'info : la huitieme est surveillee', nineCard._watchedEntityIds().includes('sensor.info8'), true);
check('lignes d\'info : la neuvieme n\'est pas surveillee', nineCard._watchedEntityIds().includes('sensor.info9'), false);

// The editor offers the same eight, and opens a longer YAML list on eight.
const infoOptions = config => {
  const ed = newEditor({ state_entity: 'sensor.oven_appliance_state', ...config });
  const html = markup(ed._root) || ed._root._html || '';
  const sel = (/data-role="info-count-select">([\s\S]*?)<\/select>/.exec(html) || [, ''])[1];
  return { ed, values: [...sel.matchAll(/<option value="(\d+)"/g)].map(m => Number(m[1])) };
};
check('editeur : le nombre de lignes va de 0 a 8', infoOptions({}).values.join(','), '0,1,2,3,4,5,6,7,8');
check('editeur : huit lignes s\'ouvrent sur huit', infoOptions({ info_entities: nineInfo.slice(0, 8) }).ed._infoCount, 8);
check('editeur : une liste plus longue s\'ouvre sur huit', infoOptions({ info_entities: nineInfo }).ed._infoCount, 8);

// ── Info line formatting ─────────────────────────────────────────────────────
// Home Assistant prints a state the way its entity asks, and its formatter is
// what applies the display precision chosen in the entity's settings. The raw
// state showed a probe set to whole degrees as 48.7999992370605 °C.
const fmtCard = (info, states, extra = {}, hassExtra = {}) => {
  const c = new Card();
  c.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'washer', state_entity: 'sensor.w',
    info_entities: [info], ...extra });
  c._hass = { ...HASS({ 'sensor.w': { state: 'Running', attributes: {} }, ...states }), ...hassExtra };
  c._render();
  return markup(c);
};
const probe = { 'sensor.t': { entity_id: 'sensor.t', state: '48.7999992370605',
  attributes: { friendly_name: 'Top', unit_of_measurement: '°C' } } };
// A stand-in for hass.formatEntityState that honours the precision the way
// the frontend does.
const fmtHass = (precision) => ({
  entities: { 'sensor.t': { display_precision: precision } },
  formatEntityState: (st) => `${Number(st.state).toFixed(precision)} ${st.attributes.unit_of_measurement}`,
});
check('info : la precision d\'affichage passe par Home Assistant',
  infoLine(fmtCard({ entity: 'sensor.t' }, probe, {}, fmtHass(0)), 'Top'), '49 °C');
// What only the frontend knows: the translated label of an on/off.
check('info : un etat traduit par Home Assistant',
  infoLine(fmtCard({ entity: 'binary_sensor.d' },
    { 'binary_sensor.d': { entity_id: 'binary_sensor.d', state: 'on', attributes: { friendly_name: 'Door' } } },
    {}, { formatEntityState: (st) => (st.state === 'on' ? 'Open' : 'Closed') }), 'Door'), 'Open');
check('info : value_map garde la main sur le formateur',
  infoLine(fmtCard({ entity: 'sensor.t', value_map: { '48.7999992370605': 'Chaud' } }, probe, {}, fmtHass(0)), 'Top'), 'Chaud');
check('info : hide_unit retire l\'unite rendue par Home Assistant',
  infoLine(fmtCard({ entity: 'sensor.t', hide_unit: true }, probe, {}, fmtHass(1)), 'Top'), '48.8');
check('info : hide_unit quand l\'unite est collee au nombre',
  infoLine(fmtCard({ entity: 'sensor.p', hide_unit: true },
    { 'sensor.p': { entity_id: 'sensor.p', state: '50.92', attributes: { friendly_name: 'Filled', unit_of_measurement: '%' } } },
    {}, { formatEntityState: (st) => `${st.state}%` }), 'Filled'), '50.92');
check('info : un formateur en erreur retombe sur le repli',
  infoLine(fmtCard({ entity: 'sensor.t' }, probe, {}, { entities: { 'sensor.t': { display_precision: 0 } },
    formatEntityState: () => { throw new Error('x'); } }), 'Top'), '49 °C');
// Pinned to another language, the frontend would answer in Home Assistant's
// language: the card formats the number itself, precision included.
check('info : langue forcee, la precision est appliquee localement',
  infoLine(fmtCard({ entity: 'sensor.t' }, probe, { language: 'fr' },
    { entities: { 'sensor.t': { display_precision: 1 } }, formatEntityState: () => 'NE PAS UTILISER' }), 'Top'), '48,8 °C');
check('info : repli, la precision retrouvee sans entity_id dans l\'etat',
  infoLine(fmtCard({ entity: 'sensor.t' },
    { 'sensor.t': { state: '48.79', attributes: { friendly_name: 'Top', unit_of_measurement: '°C' } } },
    {}, { entities: { 'sensor.t': { display_precision: 0 } } }), 'Top'), '49 °C');
check('info : repli, un pas entier donne un entier',
  infoLine(fmtCard({ entity: 'input_number.c' },
    { 'input_number.c': { state: '177.0', attributes: { friendly_name: 'Compteur', step: 1 } } }), 'Compteur'), '177');
check('info : repli, un pas fractionnaire garde ses decimales',
  infoLine(fmtCard({ entity: 'input_number.c' },
    { 'input_number.c': { state: '2.0', attributes: { friendly_name: 'Dose', step: 0.5 } } }), 'Dose'), '2.0');
check('info : repli, sans precision la valeur reste telle quelle',
  infoLine(fmtCard({ entity: 'sensor.l' },
    { 'sensor.l': { state: '121.7', attributes: { friendly_name: 'Litres', unit_of_measurement: 'L' } } }), 'Litres'), '121.7 L');
check('info : repli, hide_unit',
  infoLine(fmtCard({ entity: 'sensor.l', hide_unit: true },
    { 'sensor.l': { state: '121.7', attributes: { friendly_name: 'Litres', unit_of_measurement: 'L' } } }), 'Litres'), '121.7');

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
// A meter alone cannot tell a long pause from a pulled plug: it warns, it does not diagnose.
check('frigo : 31 min sous le seuil, aucune consommation', stateLine(frUnplugged), 'No power draw');
check('frigo : aucune consommation en orange', stateColor(frUnplugged), 'var(--warning-color, #ff9800)');
check('frigo : aucune consommation, la ligne de puissance en orange',
  /<div class="info-line caution[^"]*"[^>]*><ha-icon icon="[^"]*"><\/ha-icon><span class="label">Power<\/span>/.test(frUnplugged), true);
contains('frigo : la ligne orange a sa couleur', frUnplugged, '.info-line.caution, .info-line.caution ha-icon { color: var(--warning-color, #ff9800); }');
check('frigo : aucune consommation, l\'ecran du frigo reste normal', /class="fr-lcd warn"/.test(frUnplugged), false);
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
check('frigo : aucune consommation passe devant une porte ouverte',
  stateLine(rerender(frBoth.card,
    withStates({ 'sensor.plug': { state: '0', attributes: { unit_of_measurement: 'W' } },
                 'binary_sensor.fr_d': { state: 'on', attributes: {} } }))),
  'No power draw');
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

// Whole degrees by default, on the screens and in the lines: an update must
// not change what a dashboard shows. temperature_decimals: auto hands each
// reading to its entity, decimals included.
{
  const fmt = st => st.state === '4.2' ? '4,2 °C' : st.state === '-20.6' ? '-20,6 °C' : st.state;
  const fridgeWith = (extra) => {
    const c = new Card();
    c.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'fridge', fridge_temperature_entity: 'sensor.fr_t',
      freezer_temperature_entity: 'sensor.cg_t', ...extra });
    c._hass = { ...HASS(withStates({ 'sensor.fr_t': { state: '4.2', attributes: { unit_of_measurement: '°C' } },
      'sensor.cg_t': { state: '-20.6', attributes: { unit_of_measurement: '°C' } } })), formatEntityState: fmt };
    c._render();
    return markup(c);
  };
  const def = fridgeWith({});
  check('temperature par defaut : le frigo au degre', infoLine(def, 'Fridge'), '4 °C');
  check('temperature par defaut : le congelateur au degre', infoLine(def, 'Freezer'), '-21 °C');
  contains('temperature par defaut : l\'ecran au degre', def, '>4°</div>');
  contains('temperature par defaut : l\'ecran du congelateur au degre', def, '>-21°</div>');
  const h = fridgeWith({ temperature_decimals: 'auto' });
  check('temperature auto : le frigo garde ses decimales', infoLine(h, 'Fridge'), '4,2 °C');
  check('temperature auto : le congelateur aussi', infoLine(h, 'Freezer'), '-20,6 °C');
  contains('temperature auto : l\'ecran suit la precision de l\'entite', h, '>4,2°</div>');
  contains('temperature auto : l\'ecran du congelateur aussi', h, '>-20,6°</div>');
  check('temperature auto : sans formateur, la valeur telle quelle', infoLine(render(fridgeCfg({ fridge_temperature_entity: 'sensor.fr_t',
    temperature_decimals: 'auto' }), withStates({ 'sensor.fr_t': { state: '4.2', attributes: { unit_of_measurement: '°C' } } })), 'Fridge'), '4.2 °C');
  check('temperature auto : sans unite, le degre entier et l\'unite de HA', infoLine(render(fridgeCfg({ fridge_temperature_entity: 'input_number.fr',
    temperature_decimals: 'auto' }), withStates({ 'input_number.fr': { state: '4.2', attributes: {} } })), 'Fridge'), '4 °C');
  const blf = (extra = {}) => render({ appliance_type: 'boiler', state_entity: 'sensor.bl', temperature_entity: 'sensor.flow', ...extra },
    { 'sensor.bl': { state: 'CH', attributes: {} }, 'sensor.flow': { state: '56.5', attributes: { unit_of_measurement: '°C' } } });
  check('temperature par defaut : la chaudiere au degre', infoLine(blf(), 'Temperature'), '57 °C');
  contains('temperature par defaut : l\'ecran de la chaudiere au degre', blf(), '<div class="bl-lcd">57°</div>');
  check('temperature auto : la chaudiere aussi', infoLine(blf({ temperature_decimals: 'auto' }), 'Temperature'), '56.5 °C');
  const ktf = (extra = {}) => render({ appliance_type: 'kettle', state_entity: 'switch.kt', temperature_entity: 'sensor.kt_t', ...extra },
    { 'switch.kt': { state: 'on', attributes: {} }, 'sensor.kt_t': { state: '71.4', attributes: { unit_of_measurement: '°C' } } });
  check('temperature par defaut : la bouilloire au degre', infoLine(ktf(), 'Temperature'), '71 °C');
  check('temperature auto : la bouilloire aussi', infoLine(ktf({ temperature_decimals: 'auto' }), 'Temperature'), '71.4 °C');
  const whf = (extra = {}) => render({ appliance_type: 'water_heater', state_entity: 'switch.wh', temperature_entity: 'sensor.wh_t', ...extra },
    { 'switch.wh': { state: 'on', attributes: {} }, 'sensor.wh_t': { state: '48.5', attributes: { unit_of_measurement: '°C' } } });
  check('temperature par defaut : le chauffe-eau au degre', infoLine(whf(), 'Temperature'), '49 °C');
  check('temperature auto : le chauffe-eau aussi', infoLine(whf({ temperature_decimals: 'auto' }), 'Temperature'), '48.5 °C');
  const whAttr = render({ appliance_type: 'water_heater', state_entity: 'water_heater.tank', temperature_decimals: 'auto' },
    { 'water_heater.tank': { state: 'eco', attributes: { current_temperature: 47.6 } } });
  check('temperature auto : un attribut garde le degre entier', infoLine(whAttr, 'Temperature'), '48 °C');
}

// temperature_decimals: whole degree by default, one decimal, or each reading's
// own entity precision, on the screens and in the lines alike.
{
  const fmt = st => ({ '4.2': '4,2 \u00b0C', '-20.6': '-20,6 \u00b0C', '56.5': '56,5 \u00b0C', '71.4': '71,4 \u00b0C', '48.5': '48,5 \u00b0C' })[st.state] || st.state;
  const withFmt = (config, states, entities = {}) => {
    const c = new Card();
    c.setConfig({ type: 'custom:ha-appliance-card', ...config });
    c._hass = { ...HASS(states), entities, formatEntityState: fmt };
    c._render();
    return markup(c);
  };
  const T = (v) => ({ state: v, attributes: { unit_of_measurement: '\u00b0C' } });
  const frCfg = (extra = {}) => ({ appliance_type: 'fridge', fridge_temperature_entity: 'sensor.fr_t',
    freezer_temperature_entity: 'sensor.cg_t', ...extra });
  const frSt = (a = '4.2', b = '-20.6') => withStates({ 'sensor.fr_t': T(a), 'sensor.cg_t': T(b) });
  const deg = withFmt(frCfg({ temperature_decimals: '0' }), frSt());
  contains('precision au degre : l\'ecran', deg, '>4\u00b0</div>');
  contains('precision au degre : le congelateur arrondit', deg, '>-21\u00b0</div>');
  check('precision au degre : la ligne', infoLine(deg, 'Fridge'), '4 \u00b0C');
  const dix = withFmt(frCfg({ temperature_decimals: '1' }), frSt('4', '-18'));
  contains('precision au dixieme : l\'ecran', dix, '>4.0\u00b0</div>');
  check('precision au dixieme : la ligne', infoLine(dix, 'Fridge'), '4.0 \u00b0C');
  check('precision au dixieme : le congelateur', infoLine(dix, 'Freezer'), '-18.0 \u00b0C');
  check('precision en nombre YAML : 0 compris', infoLine(withFmt(frCfg({ temperature_decimals: 0 }), frSt()), 'Fridge'), '4 \u00b0C');
  check('precision en nombre YAML : 1 compris', infoLine(withFmt(frCfg({ temperature_decimals: 1 }), frSt('4')), 'Fridge'), '4.0 \u00b0C');
  check('precision auto : comme l\'entite', infoLine(withFmt(frCfg({ temperature_decimals: 'auto' }), frSt()), 'Fridge'), '4,2 \u00b0C');
  check('precision inconnue : au degre', infoLine(withFmt(frCfg({ temperature_decimals: '2' }), frSt()), 'Fridge'), '4 \u00b0C');
  const zero = withFmt(frCfg({ temperature_decimals: '0' }), frSt('-0.3'));
  contains('precision au degre : -0,3 se lit 0', zero, '>0\u00b0</div>');
  check('precision au degre : jamais -0', /-0\u00b0/.test(zero), false);
  // A pinned language: the formatter would answer in the wrong one.
  check('langue forcee : la precision de l\'entite', /(>4,2\u00b0<\/div>)/.test(withFmt(frCfg({ language: 'fr', temperature_decimals: 'auto' }), frSt(),
    { 'sensor.fr_t': { display_precision: 1 } })), true);
  check('langue forcee : sans precision, le degre entier', /(>4\u00b0<\/div>)/.test(withFmt(frCfg({ language: 'fr', temperature_decimals: 'auto' }), frSt())), true);
  // Every appliance with a temperature, screens included.
  const blf = withFmt({ appliance_type: 'boiler', state_entity: 'sensor.bl', temperature_entity: 'sensor.flow', temperature_decimals: 'auto' },
    { 'sensor.bl': { state: 'CH', attributes: {} }, 'sensor.flow': T('56.5') });
  contains('chaudiere : l\'ecran suit l\'entite', blf, '<div class="bl-lcd">56,5\u00b0</div>');
  const blDeg = withFmt({ appliance_type: 'boiler', state_entity: 'sensor.bl', temperature_entity: 'sensor.flow', temperature_decimals: '0' },
    { 'sensor.bl': { state: 'CH', attributes: {} }, 'sensor.flow': T('56.5') });
  contains('chaudiere au degre : l\'ecran', blDeg, '<div class="bl-lcd">57\u00b0</div>');
  check('chaudiere au degre : la ligne', infoLine(blDeg, 'Temperature'), '57 \u00b0C');
  contains('bouilloire : l\'ecran suit l\'entite', withFmt({ appliance_type: 'kettle', state_entity: 'switch.kt', temperature_entity: 'sensor.kt_t', temperature_decimals: 'auto' },
    { 'switch.kt': { state: 'on', attributes: {} }, 'sensor.kt_t': T('71.4') }), '>71,4\u00b0</div>');
  contains('chauffe-eau : l\'ecran suit l\'entite', withFmt({ appliance_type: 'water_heater', state_entity: 'switch.wh', temperature_entity: 'sensor.wh_t', temperature_decimals: 'auto' },
    { 'switch.wh': { state: 'on', attributes: {} }, 'sensor.wh_t': T('48.5') }), '>48,5\u00b0</div>');
  const whAttr = withFmt({ appliance_type: 'water_heater', state_entity: 'water_heater.tank', temperature_decimals: '1' },
    { 'water_heater.tank': { state: 'eco', attributes: { current_temperature: 47.6 } } });
  contains('chauffe-eau : un attribut au dixieme, l\'ecran', whAttr, '>47.6\u00b0</div>');
  check('chauffe-eau : un attribut au dixieme, la ligne', infoLine(whAttr, 'Temperature'), '47.6 \u00b0C');
  // A probe that stopped reporting hands over to the tank's own reading, not
  // its word "unknown".
  const whGone = withFmt({ appliance_type: 'water_heater', state_entity: 'water_heater.tank', temperature_entity: 'sensor.wh_t', temperature_decimals: 'auto' },
    { 'water_heater.tank': { state: 'eco', attributes: { current_temperature: 47.6 } },
      'sensor.wh_t': { state: 'unknown', attributes: { unit_of_measurement: '\u00b0C' } } });
  check('sonde muette : la ligne reprend la cuve', infoLine(whGone, 'Temperature'), '48 \u00b0C');
  contains('sonde muette : l\'ecran aussi', whGone, '>48\u00b0</div>');
}

// No current, no light: the cabinet goes dark behind the glass, and inside
// any fridge whose door is open.
{
  const cave = (extra, states) => render({ appliance_type: 'fridge', fridge_layout: 'wine', fridge_temperature_entity: 'sensor.fr_t',
    power_entity: 'sensor.p', ...extra }, { 'sensor.fr_t': FRIDGE['sensor.fr_t'], ...states });
  const lit = cave({ plug_entity: 'switch.plug' }, { 'sensor.p': { state: '14', attributes: { unit_of_measurement: 'W' } },
    'switch.plug': { state: 'on', attributes: {} } });
  check('cave allumee : la vitre est eclairee', /class="fr-glass"/.test(lit), true);
  check('cave allumee : pas d\'extinction', /fr-glass off/.test(lit), false);
  const unpl = cave({ plug_entity: 'switch.plug' }, { 'sensor.p': { state: '0', attributes: { unit_of_measurement: 'W' } },
    'switch.plug': { state: 'off', attributes: {} } });
  check('cave debranchee : la lumiere s\'eteint', /class="fr-glass off"/.test(unpl), true);
  const zeroFrom = m => ({ 'sensor.p': { state: '0', attributes: { unit_of_measurement: 'W' },
    last_changed: new Date(now() - m * 60000).toISOString() } });
  const zeroW = cave({}, zeroFrom(45));
  check('cave a 0 W : la lumiere s\'eteint aussi', /class="fr-glass off"/.test(zeroW), true);
  check('cave a 0 W depuis 10 min : encore allumee', /fr-glass off/.test(cave({}, zeroFrom(10))), false);
  const openOff = render({ appliance_type: 'fridge', fridge_layout: 'wine', door_entity: 'binary_sensor.fr_d', plug_entity: 'switch.plug' },
    { 'binary_sensor.fr_d': { state: 'on', attributes: {} }, 'switch.plug': { state: 'off', attributes: {} } });
  check('cave debranchee ouverte : l\'interieur est noir', /class="fr-cav wine off"/.test(openOff), true);
  const single = (sw) => render({ appliance_type: 'fridge', fridge_layout: 'single', door_entity: 'binary_sensor.fr_d', plug_entity: 'switch.plug' },
    { 'binary_sensor.fr_d': { state: 'on', attributes: {} }, 'switch.plug': { state: sw, attributes: {} } });
  check('frigo debranche ouvert : l\'interieur est noir', /class="fr-cav off"/.test(single('off')), true);
  check('frigo branche ouvert : l\'interieur est eclaire', /class="fr-cav"/.test(single('on')), true);
  contains('lumiere eteinte : sa couleur', lit, '.fr-cav.off, .fr-glass.off { background: #15171b; }');
  contains('lumiere eteinte : les bouteilles dans le noir', lit, '.fr-cav.off .fr-rack, .fr-glass.off .fr-rack { filter: brightness(0.35); }');
}

// Hidden from the list, still on the doors: an American fridge already shows
// both readings on its drawing.
{
  const hot = render(fridgeCfg({ fridge_temperature_entity: 'sensor.fr_t', freezer_temperature_entity: 'sensor.cg_t',
    door_entity: 'binary_sensor.fr_d', temperature_hide_in_list: true, fridge_layout: 'side_by_side' }),
    withStates({ 'sensor.fr_t': { state: '11', attributes: { unit_of_measurement: '°C' } } }));
  check('masquer les temperatures : plus de ligne frigo', infoLine(hot, 'Fridge'), null);
  check('masquer les temperatures : plus de ligne congelateur', infoLine(hot, 'Freezer'), null);
  contains('masquer les temperatures : toujours sur les portes', hot, '>11°</div>');
  contains('masquer les temperatures : et le congelateur', hot, '>-18°</div>');
  check('masquer les temperatures : l\'alerte reste', stateLine(hot), 'Temperature high');
  check('masquer les temperatures : la porte reste dans la liste', /Door closed/.test(hot), true);
}

// A wine cooler: one glass door, bottles lying on wooden racks behind it,
// and a cellar temperature that would alarm on a fridge.
const wineT = t => ({ 'sensor.fr_t': { state: t, attributes: { unit_of_measurement: '°C' } } });
const wine = (extra = {}, states = {}) => render(fridgeCfg({ fridge_layout: 'wine', fridge_temperature_entity: 'sensor.fr_t',
  door_entity: 'binary_sensor.fr_d', ...extra }), withStates(states));
const wineShut = wine({}, wineT('12'));
check('cave a vin : une vitre', (wineShut.match(/class="fr-glass"/g) || []).length, 1);
check('cave a vin : cinq casiers derriere la vitre', (wineShut.match(/class="fr-rack"/g) || []).length, 5);
check('cave a vin : les casiers sont dans la vitre',
  /<div class="fr-glass"[^>]*>(\s*<div class="fr-rack"[^>]*><\/div>){5}\s*<\/div>/.test(wineShut), true);
contains('cave a vin : la temperature a l\'ecran', wineShut, '>12°</div>');
check('cave a vin : 12 degres, c\'est normal', stateLine(wineShut), 'Normal');
check('cave a vin : la ligne dit Temperature', infoLine(wineShut, 'Temperature'), '12 °C');
check('cave a vin : pas de ligne Fridge', infoLine(wineShut, 'Fridge'), null);
check('cave a vin : 18 degres, encore normal', stateLine(wine({}, wineT('18'))), 'Normal');
check('cave a vin : au-dessus de 18, temperature haute', stateLine(wine({}, wineT('19'))), 'Temperature high');
check('cave a vin : le seuil choisi passe devant', stateLine(wine({ fridge_max_temperature: 14 }, wineT('15'))), 'Temperature high');
check('frigo une porte : 12 degres restent trop chauds', stateLine(render(fridgeCfg({ fridge_layout: 'single',
  fridge_temperature_entity: 'sensor.fr_t' }), withStates(wineT('12')))), 'Temperature high');
const wineMore = wine({ ice_maker_entity: 'switch.ice', freezer_temperature_entity: 'sensor.cg_t' }, wineT('12'));
check('cave a vin : pas de glacons', /class="fr-icebox/.test(wineMore), false);
check('frigo une porte : ses glacons, eux, sont la', /class="fr-icebox/.test(render(fridgeCfg({ fridge_layout: 'single', ice_maker_entity: 'switch.ice' }), FRIDGE)), true);
check('cave a vin : pas d\'ecran de congelateur', /-18°/.test(wineMore), false);
const wineOpen = wine({}, { ...wineT('12'), 'binary_sensor.fr_d': { state: 'on', attributes: {} } });
check('cave a vin ouverte : la porte pivote', panels(wineOpen).join(','), 'swung');
check('cave a vin ouverte : les bouteilles restent dans la cave',
  /<div class="fr-cav wine"[^>]*><div class="fr-racks">(<div class="fr-rack"[^>]*><\/div>){5}<\/div><\/div>/.test(wineOpen), true);
check('cave a vin ouverte : la vitre de la porte est vide', /<div class="fr-glass empty"[^>]*><\/div>/.test(wineOpen), true);
contains('cave a vin : cinq bouteilles entieres par casier', wineShut, 'left: 50%; width: 45px; margin-left: -22.5px;');
contains('cave a vin : en francais', render(fridgeCfg({ fridge_layout: 'wine', language: 'fr', fridge_temperature_entity: 'sensor.fr_t' }),
  withStates(wineT('12'))), 'Température');
for (const id of ['sensor.cave_a_vin_etat', 'sensor.wine_cooler_status', 'binary_sensor.weinkuehlschrank_tur', 'sensor.vinoteca_estado']) {
  check(`detection : ${id} est un frigo`, /fr-body|fr-wrap/.test(render({ state_entity: id }, { [id]: { state: 'off', attributes: {} } })), true);
}

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
// On the class attribute, not on the whole markup: "on" is a common word and
// a stylesheet comment should not be able to answer this question.
check('bouilloire : rien ne bouille au repos', machineCls(ktOff).split(' ').includes('on'), false);
contains('bouilloire : la sonde est affichee sur le corps', ktOff, '21°');

const ktOn = render({ appliance_type: 'kettle', state_entity: 'switch.kt', temperature_entity: 'sensor.kt_t' },
  { ...KETTLE, 'switch.kt': { state: 'on', attributes: {} }, 'sensor.kt_t': { state: '82', attributes: { unit_of_measurement: '°C' } } });
check('bouilloire : en chauffe plutot qu\'en cours', stateLine(ktOn), 'Heating');
check('bouilloire : le socle chauffe', machineCls(ktOn).split(' ').includes('on'), true);
// The blue of "running" contradicted the glowing base; heating must read warm.
check('bouilloire : la ligne d\'etat est chaude, pas bleue', stateColor(ktOn), '#ff7043');
check('lave-linge : la ligne d\'etat reste bleue en cours',
  stateColor(render({ appliance_type: 'washer', state_entity: 'sensor.w' },
    { 'sensor.w': { state: 'Running', attributes: {} } })), 'var(--info-color, #2196f3)');
// No timer on a kettle: nothing must draw a progress bar.
check('bouilloire : aucune barre de progression', /class="bar-fill"/.test(ktOn), false);
check('bouilloire : sans sonde, aucun afficheur',
  /class="kt-lcd/.test(render({ appliance_type: 'kettle', state_entity: 'switch.kt' }, KETTLE)), false);

// ── Water heater ─────────────────────────────────────────────────────────────
// A tank heats or waits. What it must never do is look finished, or blue.
const WH = {
  'switch.wh':   { state: 'on', attributes: {} },
  'sensor.wh_t': { state: '46', attributes: { unit_of_measurement: '°C' } },
};
const whCfg = { appliance_type: 'water_heater', state_entity: 'switch.wh', temperature_entity: 'sensor.wh_t' };
const whOn = render(whCfg, WH);
check('chauffe-eau : en chauffe', stateLine(whOn), 'Heating');
check('chauffe-eau : la resistance chauffe', machineCls(whOn).split(' ').includes('heating'), true);
check('chauffe-eau : la ligne d\'etat est chaude', stateColor(whOn), '#ff7043');
contains('chauffe-eau : la sonde s\'affiche sur la cuve', whOn, '<div class="wh-lcd">46°</div>');
// 46 degrees on the 15-65 scale fills the tank to 62 %.
contains('chauffe-eau : la couche chaude suit la temperature', whOn, '--wh-hot: 0.62');
check('chauffe-eau : ligne de temperature', infoLine(whOn, 'Temperature'), '46 °C');
check('chauffe-eau : aucune barre de progression', /class="bar-fill"/.test(whOn), false);

const whOff = render(whCfg, { ...WH, 'switch.wh': { state: 'off', attributes: {} } });
check('chauffe-eau : en veille a l\'arret', stateLine(whOff), 'Standby');
check('chauffe-eau : rien ne chauffe en veille', machineCls(whOff).split(' ').includes('heating'), false);
check('chauffe-eau : la veille est grise', stateColor(whOff), 'var(--disabled-text-color, #9e9e9e)');

// A plug falling back under its threshold means the tank is warm again.
const whPlug = build({ appliance_type: 'water_heater', state_entity: 'sensor.wh_p', power_entity: 'sensor.wh_p' },
  { 'sensor.wh_p': { state: '2400', attributes: { unit_of_measurement: 'W' } } });
check('chauffe-eau : la prise consomme, il chauffe', stateLine(whPlug.html), 'Heating');
check('chauffe-eau : la prise redescend, il attend plutot que terminer',
  stateLine(rerender(whPlug.card, { 'sensor.wh_p': { state: '0', attributes: { unit_of_measurement: 'W' } } })), 'Standby');

// A water_heater entity reports its operation mode as state and the temperature
// as an attribute; the heating indicator settles what the mode cannot.
const whNative = render({ appliance_type: 'water_heater', state_entity: 'water_heater.tank', heating_entity: 'binary_sensor.tank_heating' },
  { 'water_heater.tank': { state: 'eco', attributes: { current_temperature: 53, temperature: 55 } },
    'binary_sensor.tank_heating': { state: 'on', attributes: {} } });
contains('chauffe-eau : une entite water_heater donne sa temperature', whNative, '<div class="wh-lcd">53°</div>');
check('chauffe-eau : l\'indicateur de chauffe decide', stateLine(whNative), 'Heating');
check('chauffe-eau : indicateur eteint, en veille',
  stateLine(render({ appliance_type: 'water_heater', state_entity: 'water_heater.tank', heating_entity: 'binary_sensor.tank_heating' },
    { 'water_heater.tank': { state: 'eco', attributes: {} }, 'binary_sensor.tank_heating': { state: 'off', attributes: {} } })), 'Standby');

const whBare = render({ appliance_type: 'water_heater', state_entity: 'switch.wh' }, WH);
check('chauffe-eau : sans sonde, aucun afficheur', /class="wh-lcd/.test(whBare), false);
contains('chauffe-eau : sans sonde, la cuve reste neutre', whBare, '--wh-hot: 0.00');
contains('chauffe-eau : en francais', render({ ...whCfg, language: 'fr' }, WH), 'En chauffe');

// ── Boiler ───────────────────────────────────────────────────────────────────
// Nefit and Bosch show -H, =H and 0H on the panel and say CH, HW and No in their
// status. A combi boiler serves the taps first, so hot water wins a tie.
const blOf = (state, extra = {}, more = {}) => render({ appliance_type: 'boiler', state_entity: 'sensor.bl', ...extra },
  { 'sensor.bl': { state, attributes: {} }, ...more });
for (const [raw, label, mode] of [
  ['-H', 'Heating', 'space_heating'], ['=H', 'Hot water', 'hot_water'], ['0H', 'Standby', 'idle'],
  ['CH', 'Heating', 'space_heating'], ['HW', 'Hot water', 'hot_water'], ['No', 'Standby', 'idle'],
  ['Chauffage', 'Heating', 'space_heating'], ['Eau chaude', 'Hot water', 'hot_water'],
]) {
  const h = blOf(raw);
  check(`chaudiere : ${raw} se lit ${label}`, stateLine(h), label);
  check(`chaudiere : ${raw} dessine le mode ${mode}`, machineCls(h).split(' ').includes(`mode-${mode}`), true);
}
check('chaudiere : la flamme brule en chauffage', machineCls(blOf('-H')).split(' ').includes('flame'), true);
check('chaudiere : la flamme brule pour l\'eau chaude', machineCls(blOf('=H')).split(' ').includes('flame'), true);
check('chaudiere : pas de flamme en veille', machineCls(blOf('0H')).split(' ').includes('flame'), false);
check('chaudiere : chauffage en orange', stateColor(blOf('-H')), '#ff7043');
check('chaudiere : eau chaude en rouge', stateColor(blOf('=H')), '#ef5350');
check('chaudiere : veille en gris', stateColor(blOf('0H')), 'var(--disabled-text-color, #9e9e9e)');
check('chaudiere : state_map vers un mode', stateLine(blOf('7', { state_map: { 7: 'hot_water' } })), 'Hot water');
check('chaudiere : une valeur inconnue reste lisible', stateLine(blOf('Maintenance')), 'Maintenance');
contains('chaudiere : en francais', blOf('=H', { language: 'fr' }), 'Eau chaude');

// The same panel letters as a numeric cause code. Start-up reads Ignition, the
// waits a burner resting with a demand still there, and a code the card knows
// is never printed as a bare number.
for (const [raw, label, mode] of [
  ['200', 'Heating', 'space_heating'], ['201', 'Hot water', 'hot_water'], ['203', 'Standby', 'idle'],
  ['270', 'Ignition', 'starting'], ['283', 'Ignition', 'starting'], ['284', 'Ignition', 'starting'],
  ['202', 'Waiting', 'waiting'], ['204', 'Waiting', 'waiting'], ['265', 'Waiting', 'waiting'],
  ['305', 'Waiting', 'waiting'], ['353', 'Waiting', 'waiting'],
  ['0U', 'Ignition', 'starting'], ['0C', 'Ignition', 'starting'], ['0L', 'Ignition', 'starting'],
  ['0A', 'Waiting', 'waiting'], ['0Y', 'Waiting', 'waiting'], ['0E', 'Waiting', 'waiting'],
]) {
  const h = blOf(raw);
  check(`chaudiere : code ${raw} se lit ${label}`, stateLine(h), label);
  check(`chaudiere : code ${raw} dessine le mode ${mode}`, machineCls(h).split(' ').includes(`mode-${mode}`), true);
}
check('chaudiere : un code numerique flottant se lit aussi', stateLine(blOf('201.0')), 'Hot water');
check('chaudiere : un code d\'allumage flottant se lit aussi', stateLine(blOf('283.0')), 'Ignition');
check('chaudiere : la flamme brule sur le code 201', machineCls(blOf('201')).split(' ').includes('flame'), true);
check('chaudiere : pas de flamme sur une attente', machineCls(blOf('204')).split(' ').includes('flame'), false);
check('chaudiere : une petite flamme a l\'allumage', machineCls(blOf('283')).split(' ').includes('flame'), true);
contains('chaudiere : la flamme d\'allumage est plus petite', blOf('283'),
  '.machine.mode-starting .bl-flame { width: 8px; height: 10px; margin-left: -4px; }');
check('chaudiere : allumage en orange', stateColor(blOf('283')), '#ff7043');
check('chaudiere : attente en gris', stateColor(blOf('204')), 'var(--disabled-text-color, #9e9e9e)');
check('chaudiere : state_map passe devant un code', stateLine(blOf('201', { state_map: { 201: 'space_heating' } })), 'Heating');
check('chaudiere : state_map vers l\'allumage', stateLine(blOf('9', { state_map: { 9: 'starting' } })), 'Ignition');
check('chaudiere : state_map vers l\'attente', stateLine(blOf('9', { state_map: { 9: 'waiting' } })), 'Waiting');
check('chaudiere : un nombre qui commence comme un code n\'en est pas un', stateLine(blOf('2010')), '2010');
check('chaudiere : une decimale non nulle n\'est pas un code', stateLine(blOf('201.5')), '201.5');
contains('chaudiere : allumage en francais', blOf('283', { language: 'fr' }), 'Allumage');
contains('chaudiere : attente en francais', blOf('204', { language: 'fr' }), 'En attente');
// In several languages the word for standby already means waiting: the two
// must still read differently, and so must ignition and a lit burner.
for (const [code, block] of Object.entries(TABLE)) {
  check(`chaudiere ${code} : l'attente ne se confond pas avec la veille`, block.boiler_waiting !== block.standby, true);
  check(`chaudiere ${code} : l'allumage ne se confond pas avec le bruleur`, block.boiler_starting !== block.boiler_burner, true);
}

const blInd = (hw, ch) => blOf('whatever', { hot_water_entity: 'binary_sensor.hw', heating_entity: 'binary_sensor.ch' },
  { 'binary_sensor.hw': { state: hw, attributes: {} }, 'binary_sensor.ch': { state: ch, attributes: {} } });
check('chaudiere : indicateur d\'eau chaude', stateLine(blInd('on', 'off')), 'Hot water');
check('chaudiere : indicateur de chauffage', stateLine(blInd('off', 'on')), 'Heating');
check('chaudiere : les deux allumes, l\'eau chaude passe devant', stateLine(blInd('on', 'on')), 'Hot water');
check('chaudiere : les deux eteints, en veille', stateLine(blInd('off', 'off')), 'Standby');

// Only a burner modulation: the flame says it heats, not what for.
const blBurn = build({ appliance_type: 'boiler', state_entity: 'sensor.mod', power_entity: 'sensor.mod' },
  { 'sensor.mod': { state: '100', attributes: { unit_of_measurement: '%' } } });
check('chaudiere : bruleur seul', stateLine(blBurn.html), 'Burner on');
check('chaudiere : bruleur seul, la flamme sans sortie', machineCls(blBurn.html).split(' ').includes('mode-burner'), true);
check('chaudiere : bruleur eteint, en veille plutot que terminee',
  stateLine(rerender(blBurn.card, { 'sensor.mod': { state: '0', attributes: { unit_of_measurement: '%' } } })), 'Standby');
contains('chaudiere : temperature de depart a l\'ecran',
  blOf('-H', { temperature_entity: 'sensor.flow' }, { 'sensor.flow': { state: '62', attributes: { unit_of_measurement: '°C' } } }),
  '<div class="bl-lcd">62°</div>');
check('chaudiere : aucune barre de progression', /class="bar-fill"/.test(blOf('-H')), false);

for (const [label, h, names] of [
  ['chauffe-eau', whOn, ['wh-glow', 'wh-rise']],
  ['chaudiere en chauffage', blOf('-H'), ['bl-flicker', 'bl-rise']],
  ['chaudiere en eau chaude', blOf('=H'), ['bl-flicker', 'bl-drip']],
  ['chaudiere a l\'allumage', blOf('283'), ['bl-flicker']],
]) {
  const used = [...h.matchAll(/animation:\s*([a-z0-9-]+)/g)].map(m => m[1]);
  const defined = new Set([...h.matchAll(/@keyframes\s+([a-z0-9-]+)/g)].map(m => m[1]));
  check(`${label} : chaque animation a ses keyframes`, [...new Set(used)].filter(n => !defined.has(n)).join(','), '');
  for (const n of names) check(`${label} : declare ${n}`, used.includes(n), true);
}

// ── Detection by name ────────────────────────────────────────────────────────
const drawn = h => /class="wh-tank"/.test(h) ? 'water_heater' : /class="bl-box"/.test(h) ? 'boiler'
  : /class="kt-body"/.test(h) ? 'kettle' : 'other';
for (const [id, want, icon] of [
  ['switch.chauffe_eau', 'water_heater'], ['switch.cumulus', 'water_heater'], ['water_heater.dhw', 'water_heater'],
  ['switch.salle_de_bain', 'water_heater', 'mdi:water-boiler'],
  ['sensor.chaudiere_etat', 'boiler'], ['sensor.boiler_status', 'boiler'],
  ['switch.kettle', 'kettle'], ['sensor.dryer_state', 'other'], ['sensor.washer_state', 'other'],
]) {
  check(`detection : ${icon || id}`, drawn(render({ state_entity: id },
    { [id]: { state: 'off', attributes: icon ? { icon } : {} } })), want);
}

// ── Real integrations ────────────────────────────────────────────────────────
// Each shape below is what an integration actually stores, read from its source.
// A water_heater entity's state is its operation mode, never whether it heats.
const tank = (state, attributes = {}, extra = {}, more = {}) => render(
  { appliance_type: 'water_heater', state_entity: 'water_heater.tank', ...extra },
  { 'water_heater.tank': { state, attributes }, ...more });
// Overkiz reports its standard mode as "on".
const overkizOn = tank('on', { current_temperature: 48 });
check('integrations : le mode "on" d\'Overkiz n\'est pas une chauffe', stateLine(overkizOn), 'On');
check('integrations : mode "on", la resistance reste froide', machineCls(overkizOn).split(' ').includes('heating'), false);
check('integrations : un mode se lit avec une majuscule', stateLine(tank('performance')), 'Performance');
check('integrations : un mode en snake_case se lit en mots', stateLine(tank('heat_pump')), 'Heat pump');
// Home Assistant translates water_heater modes; its label wins, as for programmes.
{
  const c = new Card();
  c.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'water_heater', state_entity: 'water_heater.tank' });
  c._hass = { ...HASS({ 'water_heater.tank': { state: 'electric', attributes: {} } }), formatEntityState: () => 'Électrique' };
  c._render();
  check('integrations : le libelle de mode de Home Assistant est prefere', stateLine(markup(c)), 'Électrique');
}
check('integrations : chauffe-eau off, en veille', stateLine(tank('off')), 'Standby');
// MELCloud: status heat_water is the tank, heat_zones is the house.
const melTank = tank('auto', { current_temperature: 47, status: 'heat_water' });
check('integrations : MELCloud heat_water chauffe la cuve', stateLine(melTank), 'Heating');
check('integrations : MELCloud heat_water allume la resistance', machineCls(melTank).split(' ').includes('heating'), true);
check('integrations : MELCloud heat_zones laisse la cuve en veille', stateLine(tank('auto', { status: 'heat_zones' })), 'Standby');
check('integrations : une prise l\'emporte sur le mode',
  stateLine(render({ appliance_type: 'water_heater', state_entity: 'water_heater.tank', power_entity: 'sensor.tank_w', power_on_threshold: 10 },
    { 'water_heater.tank': { state: 'eco', attributes: {} }, 'sensor.tank_w': { state: '2000', attributes: { unit_of_measurement: 'W' } } })), 'Heating');

// Combi boiler vocabularies.
for (const [raw, label, who] of [
  ['tapwater', 'Hot water', 'InComfort'], ['tapwater_int', 'Hot water', 'InComfort'],
  ['starting_ch', 'Heating', 'InComfort'], ['central_heating_rf', 'Heating', 'InComfort'],
  ['hwc_on', 'Hot water', 'ebusd'], ['hwc_ignition', 'Hot water', 'ebusd'],
  ['HEATING', 'Heating', 'myVAILLANT'], ['heat_zones', 'Heating', 'MELCloud'], ['heat_water', 'Hot water', 'MELCloud'],
  ['ACS', 'Hot water', 'libelle espagnol'], ['Heizbetrieb', 'Heating', 'libelle allemand'],
]) {
  check(`integrations : ${who} ${raw} se lit ${label}`, stateLine(blOf(raw)), label);
}
// InComfort names its boiler water_heater.boiler and carries its temperature.
const incomfort = render({ state_entity: 'water_heater.boiler' },
  { 'water_heater.boiler': { state: 'tapwater', attributes: { current_temperature: 55 } } });
check('integrations : water_heater.boiler est une chaudiere', drawn(incomfort), 'boiler');
contains('integrations : la chaudiere InComfort donne sa temperature', incomfort, '<div class="bl-lcd">55°</div>');
check('integrations : water_heater.chauffe_eau reste un chauffe-eau',
  drawn(render({ state_entity: 'water_heater.chauffe_eau' }, { 'water_heater.chauffe_eau': { state: 'eco', attributes: {} } })), 'water_heater');
check('integrations : water_heater.water_boiler reste un chauffe-eau',
  drawn(render({ state_entity: 'water_heater.water_boiler' }, { 'water_heater.water_boiler': { state: 'eco', attributes: {} } })), 'water_heater');

// Flame lit while both indicators are off: frost protection on OpenTherm, or
// ViCare with only its hot water charging configured.
const otgw = (flame, ch, hw) => render({ appliance_type: 'boiler', state_entity: 'binary_sensor.flame',
  heating_entity: 'binary_sensor.ch', hot_water_entity: 'binary_sensor.hw' },
  { 'binary_sensor.flame': { state: flame, attributes: {} }, 'binary_sensor.ch': { state: ch, attributes: {} },
    'binary_sensor.hw': { state: hw, attributes: {} } });
check('integrations : flamme allumee, indicateurs eteints, bruleur allume', stateLine(otgw('on', 'off', 'off')), 'Burner on');
check('integrations : flamme eteinte, indicateurs eteints, en veille', stateLine(otgw('off', 'off', 'off')), 'Standby');
check('integrations : un indicateur allume passe devant la flamme', stateLine(otgw('on', 'on', 'off')), 'Heating');
// ebusd publishes some demands as yes/no.
check('integrations : un indicateur a "yes" compte comme allume', stateLine(otgw('on', 'off', 'yes')), 'Hot water');

// ── Editor ───────────────────────────────────────────────────────────────────
const edHtml = type => markup(newEditor({ state_entity: 'sensor.oven_appliance_state', appliance_type: type })._root)
  || newEditor({ state_entity: 'sensor.oven_appliance_state', appliance_type: type })._root._html || '';
const toggles = type => [...edHtml(type).matchAll(/data-toggle="([^"]+)"/g)].map(m => m[1]);
contains('editeur : le chauffe-eau est au choix', edHtml('boiler'), 'value="water_heater"');
contains('editeur : la chaudiere est au choix', edHtml('boiler'), 'value="boiler"');
check('editeur : la chaudiere propose l\'eau chaude', toggles('boiler').includes('hot_water_entity'), true);
check('editeur : la chaudiere propose le chauffage', toggles('boiler').includes('heating_entity'), true);
check('editeur : une seule temperature sur la chaudiere', toggles('boiler').filter(f => f === 'temperature_entity').length, 1);
check('editeur : un seul indicateur de chauffe sur le chauffe-eau', toggles('water_heater').filter(f => f === 'heating_entity').length, 1);
check('editeur : le chauffe-eau propose sa sonde', toggles('water_heater').includes('temperature_entity'), true);
check('editeur : pas d\'eau chaude a part sur le chauffe-eau', toggles('water_heater').includes('hot_water_entity'), false);
check('editeur : pas de programme sur une chaudiere', toggles('boiler').includes('program_entity'), false);

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

// "Ready" is now recognised as idle rather than echoed as an unknown state:
// the category is what drives the colour, the animations and the hiding of a
// stale remaining time, and a machine sitting at Ready is idle. The machine's
// own wording stays available through state_show_raw, asserted just below.
check('cafe : rien a signaler, la machine est au repos', stateLine(cafe({})), 'Idle');
check('cafe : state_show_raw rend son mot a la machine',
  stateLine(render(cafeCfg({ state_show_raw: true }), CAFE)), 'Ready');
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
check('cafe : un niveau confortable ne declenche rien', stateLine(lvl(76)), 'Idle');
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
check('editeur : les cinq implantations sont proposees',
  ['single', 'freezer_bottom', 'freezer_top', 'side_by_side', 'wine']
    .every((v) => edLayout({}).includes(`value="${v}"`)), true);
check('editeur : une cave a vin propose 18 degres',
  /data-field="fridge_max_temperature"[^>]*placeholder="18"|placeholder="18"[^>]*data-field="fridge_max_temperature"/
    .test(edLayout({ fridge_layout: 'wine', fridge_temperature_entity: 'sensor.fr_t' })), true);
check('editeur : un frigo garde 8 degres',
  /data-field="fridge_max_temperature"[^>]*placeholder="8"|placeholder="8"[^>]*data-field="fridge_max_temperature"/
    .test(edLayout({ fridge_layout: 'single', fridge_temperature_entity: 'sensor.fr_t' })), true);
check('editeur : l\'interrupteur de la prise est propose sur un frigo',
  [...edLayout({}).matchAll(/data-toggle="([^"]+)"/g)].map(m => m[1]).includes('plug_entity'), true);
check('editeur : pas sur un lave-linge',
  /data-toggle="plug_entity"/.test(markup(newEditor({ appliance_type: 'washer', state_entity: 'sensor.w' }))), false);
check('editeur : le delai sans consommation sur un frigo',
  /data-field="no_power_after"[^>]*placeholder="30"|placeholder="30"[^>]*data-field="no_power_after"/
    .test(edLayout({ power_entity: 'sensor.p' })), true);
check('editeur : pas de delai sur un lave-linge',
  /data-field="no_power_after"/.test(markup(newEditor({ appliance_type: 'washer', state_entity: 'sensor.w', power_entity: 'sensor.p' }))), false);
check('editeur : masquer les temperatures sous la sonde du frigo',
  /data-field="temperature_hide_in_list"/.test(edLayout({ fridge_temperature_entity: 'sensor.fr_t' })), true);
{
  const ed = newEditor({ appliance_type: 'fridge', power_entity: 'sensor.p', no_power_after: 90,
    fridge_temperature_entity: 'sensor.fr_t', temperature_hide_in_list: true });
  for (const [field, gone] of [['power_entity', 'no_power_after'], ['fridge_temperature_entity', 'temperature_hide_in_list']]) {
    const tg = ed._root.querySelectorAll('[data-toggle]').find(n => n.getAttribute('data-toggle') === field);
    tg.checked = false;
    fire(tg, 'change', { target: tg });
    check(`editeur : retirer ${field} efface ${gone}`, gone in (ed.events.at(-1)?.detail?.config || { [gone]: 1 }), false);
  }
}
{
  // Whole degree first: an unset option shows the default.
  check('editeur : le degre entier en tete de la precision',
    /<select data-field="temperature_decimals"><option value="0" >[^<]*<\/option><option value="1" >[^<]*<\/option><option value="auto" >/
      .test(edLayout({ fridge_temperature_entity: 'sensor.fr_t' })), true);
  const hasPrecision = html => /data-field="temperature_decimals"/.test(html)
    && ['auto', '0', '1'].every(v => new RegExp(`data-field="temperature_decimals"[\\s\\S]*?value="${v}"`).test(html));
  check('editeur : la precision sous la sonde du frigo', hasPrecision(edLayout({ fridge_temperature_entity: 'sensor.fr_t' })), true);
  for (const type of ['kettle', 'water_heater', 'boiler']) {
    check(`editeur : la precision sur ${type}`, hasPrecision(markup(newEditor({ appliance_type: type,
      state_entity: 'sensor.oven_appliance_state', temperature_entity: 'sensor.t' }))), true);
  }
  check('editeur : pas de precision sur un lave-linge', /data-field="temperature_decimals"/.test(markup(newEditor({ appliance_type: 'washer',
    state_entity: 'sensor.w', temperature_entity: 'sensor.t' }))), false);
  for (const [type, field] of [['fridge', 'fridge_temperature_entity'], ['kettle', 'temperature_entity']]) {
    const ed = newEditor({ appliance_type: type, state_entity: 'sensor.oven_appliance_state', [field]: 'sensor.t', temperature_decimals: '1' });
    const tg = ed._root.querySelectorAll('[data-toggle]').find(n => n.getAttribute('data-toggle') === field);
    tg.checked = false;
    fire(tg, 'change', { target: tg });
    check(`editeur : retirer ${field} efface la precision`, 'temperature_decimals' in (ed.events.at(-1)?.detail?.config || { temperature_decimals: 1 }), false);
  }
}
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

// ── Per-card language ────────────────────────────────────────────────────────
// Someone running Home Assistant in English so that error messages match what
// they find online may still want the card in their own language. Requested in
// issue #5.

/** Renders with an explicit Home Assistant UI language, whatever the card asks for. */
function inHa(haLang, config, states) {
  const c = new Card();
  c.setConfig({ type: 'custom:ha-appliance-card', ...config });
  c._hass = { ...HASS(states), language: haLang, locale: { language: haLang } };
  c._render();
  return markup(c);
}
const WASH = { 'sensor.w': { state: 'Running', attributes: {} },
               'binary_sensor.d': { state: 'off', attributes: {} } };
const base = { appliance_type: 'washer', state_entity: 'sensor.w', door_entity: 'binary_sensor.d' };

check('langue : sans option, la card suit Home Assistant',
  stateLine(inHa('en', base, WASH)), 'Running');
check('langue : forcee en francais malgre un HA anglais',
  stateLine(inHa('en', { ...base, language: 'fr' }, WASH)), 'En cours');
check('langue : forcee en anglais malgre un HA francais',
  stateLine(inHa('fr', { ...base, language: 'en' }, WASH)), 'Running');
// The override reaches every label, not just the state line.
contains('langue : les lignes d\'info suivent aussi',
  inHa('en', { ...base, language: 'fr' }, WASH), 'Porte fermée');
check('langue : auto revient au reglage de Home Assistant',
  stateLine(inHa('en', { ...base, language: 'auto' }, WASH)), 'Running');
// A code the card does not ship must not blank the card out.
check('langue : un code inconnu retombe sur Home Assistant',
  stateLine(inHa('fr', { ...base, language: 'xx' }, WASH)), 'En cours');
check('locale nb : resolue vers le bloc no',
  stateLine(inHa('nb', base, WASH)), 'I gang');
check('locale nb-NO : resolue vers le bloc no',
  stateLine(inHa('nb-NO', base, WASH)), 'I gang');
check('langue : forcee en bokmal malgre un HA anglais',
  stateLine(inHa('en', { ...base, language: 'nb' }, WASH)), 'I gang');
// Overriding the locale must not disturb anything else read from hass.
contains('langue : les entites restent lues normalement',
  inHa('en', { ...base, language: 'fr' }, WASH), 'mdi:door-closed');

// The editor offers it, and follows it too.
const edLang = markup(newEditor({ ...base, language: 'fr' }));
check('editeur : le selecteur de langue est propose',
  /data-field="language"/.test(edLang), true);
// The split option sits with the other remaining time settings.
check('split : la case est dans l editeur',
  /data-field="remaining_time_split"/.test(markup(newEditor({ appliance_type: 'washer',
    state_entity: 'sensor.w', remaining_time_entity: 'sensor.r' }))), true);
// Its own labels follow the choice too: picking a language and then reading
// English underneath would be its own kind of confusing. newEditor builds
// against an English Home Assistant, so a French label can only come from the
// card's own setting.
contains('editeur : ses libelles suivent la langue choisie', edLang, "Type d'appareil");
contains('editeur : jusque dans les sections depliantes', edLang, 'R\u00e9glages g\u00e9n\u00e9raux');
check('editeur : sans option, il reste dans la langue de Home Assistant',
  /Type d'appareil/.test(markup(newEditor(base))), false);
check('editeur : les quatorze langues et le mode auto sont listes',
  (edLang.match(/<option value="[a-z]{2}"/g) || []).length, 14);
contains('editeur : le mode auto est propose', edLang, 'value="auto"');

// ── A light that only reports (issue #8, follow-up) ──────────────────────────
// Ovens routinely expose their lamp as a binary_sensor. Reading it always
// worked; the editor was the only thing hiding it, and clicking the badge on
// one would have called a service the entity cannot answer.

const ovenLight = (entity, state) => {
  const calls = [];
  const c = new Card();
  c.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'oven',
    state_entity: 'sensor.o', light_entity: entity });
  c._hass = { ...HASS({ 'sensor.o': { state: 'Running', attributes: {} },
                        [entity]: { state, attributes: {} } }),
              callService: (domain, service, data) => calls.push({ domain, service, data }) };
  c._render();
  return { card: c, calls };
};
const badgeOn = (o) => {
  const m = /<div class="light-badge ([^"]*)"/.exec(markup(o.card));
  return m ? m[1].split(' ').includes('on') : null;
};

check('lampe : un binary_sensor allume le badge', badgeOn(ovenLight('binary_sensor.lamp', 'on')), true);
check('lampe : et l\'eteint', badgeOn(ovenLight('binary_sensor.lamp', 'off')), false);
check('lampe : une vraie light marche toujours', badgeOn(ovenLight('light.lamp', 'on')), true);

// The click. A binary_sensor has nothing to toggle, so it opens instead.
const lampRO = ovenLight('binary_sensor.lamp', 'on');
lampRO.card._call('binary_sensor.lamp');
check('lampe : cliquer un capteur n\'appelle aucun service', lampRO.calls.length, 0);
check('lampe : il ouvre la fiche d\'entite', lampRO.card.events.at(-1)?.type, 'hass-more-info');
check('lampe : et sur la bonne entite',
  lampRO.card.events.at(-1)?.detail?.entityId, 'binary_sensor.lamp');

// A light that really can be switched must still be switched.
const lampRW = ovenLight('light.lamp', 'on');
lampRW.card._call('light.lamp');
check('lampe : une light est toujours basculee', lampRW.calls.at(-1)?.service, 'toggle');
check('lampe : sur son propre domaine', lampRW.calls.at(-1)?.domain, 'light');
const swRW = ovenLight('switch.lamp', 'on');
swRW.card._call('switch.lamp');
check('lampe : un switch aussi', swRW.calls.at(-1)?.service, 'toggle');

// The editor offered every other on/off field a binary_sensor and not this one.
const edLight = newEditor({ state_entity: 'sensor.oven_appliance_state',
                            appliance_type: 'oven', light_entity: 'binary_sensor.lamp' });
const lightPicker = edLight._root.querySelector('[data-slot="light_entity"]')?.children.at(-1);
check('editeur : le selecteur de lampe accepte un capteur',
  (lightPicker?.includeDomains || []).includes('binary_sensor'), true);
check('editeur : et n\'a pas perdu les vraies lampes',
  (lightPicker?.includeDomains || []).includes('light'), true);

// The lamp lights the door glass. It used to light only the cavity, which sits
// behind a pane that is 94% opaque with the door shut, so the rule worked and
// the light was invisible. Asserting the glass rule specifically is the point:
// a cavity-only rule would pass a "is there a lit style" test and still show
// nothing.
const OVEN_CSS = SRC.slice(SRC.indexOf('oven: () => `'), SRC.indexOf('microwave: () => `'));
check('four : la lampe eclaire la vitre de la porte',
  /\.machine\.lit \.ov-glass \{[^}]*background:/.test(OVEN_CSS), true);
check('four : et toujours la cavite, porte ouverte',
  /\.machine\.lit \.ov-cavity \{[^}]*background:/.test(OVEN_CSS), true);
// The unlit pane must stay dark, or the oven would read as permanently on.
check('four : la vitre au repos reste sombre',
  /\.ov-glass \{[^}]*background: rgba\(16, 18, 22, 0\.94\)/.test(OVEN_CSS), true);

// ── state_map in the visual editor (issue #8) ────────────────────────────────
// The option existed in YAML from the start and was never offered here, which
// is exactly why it was requested as a new feature.

const edMap = newEditor({ state_entity: 'sensor.oven_appliance_state' });
const mapSlot = edMap._root.querySelector('[data-slot="__state_map"]');
const mapArea = mapSlot && mapSlot.children.at(-1).children.at(-1);
check('editeur : la zone de mapping d\'etat existe', !!mapArea, true);
contains('editeur : son exemple montre la forme attendue',
  mapArea.placeholder, 'Ready: idle');

mapArea.value = 'BSH.Common.EnumType.OperationState.Aborting: error\nReady: idle';
fire(mapArea, 'change', { target: mapArea });
checkFired('editeur : _mountStateMap', edMap, (ev) => {
  check('editeur : le mapping est ecrit dans la config',
    ev.detail.config.state_map['BSH.Common.EnumType.OperationState.Aborting'], 'error');
  check('editeur : et la seconde ligne aussi',
    ev.detail.config.state_map.Ready, 'idle');
});

// Emptying the box removes the key rather than leaving an empty object behind,
// which would show up in the YAML editor as noise the user never typed.
mapArea.value = '';
fire(mapArea, 'change', { target: mapArea });
check('editeur : vider la zone retire la cle',
  'state_map' in edMap.events.at(-1).detail.config, false);

// An existing mapping has to come back into the box, or opening the editor on a
// YAML-written card would look like the mapping had been lost.
// The event hands the dashboard a reference to the config object. Mutating the
// one already emitted lets a later edit rewrite an earlier payload under the
// dashboard's feet, which is how an edit ends up looking like it was lost.
const edEchoMap = newEditor({ state_entity: 'sensor.oven_appliance_state' });
const echoArea = edEchoMap._root.querySelector('[data-slot="__state_map"]').children.at(-1).children.at(-1);
echoArea.value = 'Ready: idle';
fire(echoArea, 'change', { target: echoArea });
const firstEmit = edEchoMap.events.at(-1).detail.config;
echoArea.value = 'Ready: done';
fire(echoArea, 'change', { target: echoArea });
check('editeur : la config deja emise n\'est pas reecrite',
  firstEmit.state_map.Ready, 'idle');
check('editeur : la seconde edition est bien prise en compte',
  edEchoMap.events.at(-1).detail.config.state_map.Ready, 'done');

const edMapPre = newEditor({ state_entity: 'sensor.oven_appliance_state',
                             state_map: { Ready: 'idle' } });
const preArea = edMapPre._root.querySelector('[data-slot="__state_map"]').children.at(-1).children.at(-1);
check('editeur : un mapping existant est reaffiche', preArea.value, 'Ready: idle');

// ── Re-rendering, and animations that survive it ─────────────────────────────
// _render rebuilds the whole subtree through innerHTML, which restarts every
// CSS animation at zero. Home Assistant calls the hass setter on any state
// change anywhere in the system, so on a busy instance the drum never gets
// past a few degrees. Two things follow: only redraw when something this card
// shows has moved, and when a redraw does happen, resume the animation instead
// of restarting it.

function counted(config) {
  const c = new Card();
  c.setConfig({ type: 'custom:ha-appliance-card', ...config });
  let renders = 0;
  const real = c._render.bind(c);
  c._render = function () { renders++; return real(); };
  return { card: c, count: () => renders };
}
const noise = (n, extra) => ({
  'sensor.w': { state: 'Running', attributes: {}, last_changed: 'T0' },
  'sensor.rem': { state: '600', attributes: {}, last_changed: 'T0' },
  ...Array.from({ length: 5 }, (_, i) => i).reduce((a, i) => {
    a['sensor.unrelated' + i] = { state: String(n), attributes: {}, last_changed: 'T' + n };
    return a;
  }, {}),
  ...(extra || {}),
});

const w = counted({ appliance_type: 'washer', state_entity: 'sensor.w', remaining_time_entity: 'sensor.rem' });
w.card.hass = HASS(noise(0));
const after1 = w.count();
for (let i = 1; i <= 20; i++) w.card.hass = HASS(noise(i));
check('rendu : 20 changements sans rapport ne redessinent pas', w.count() - after1, 0);

// What the card does show must still get through. Each step below moves one
// thing and holds the rest still: a helper that churned the watched entities
// would make every signature differ and prove nothing.
const shown = (over) => HASS({ ...noise(99), ...over });
w.card.hass = shown({ 'sensor.rem': { state: '540', attributes: {}, last_changed: 'T1' } });
check('rendu : un changement affiche redessine bien', w.count() - after1, 1);
w.card.hass = shown({ 'sensor.rem': { state: '540', attributes: {}, last_changed: 'T1' } });
check('rendu : le meme etat deux fois ne redessine pas', w.count() - after1, 1);
// An attribute the card reads is part of what it shows, and nothing else moves
// here: only the friendly name can carry this render.
w.card.hass = shown({
  'sensor.rem': { state: '540', attributes: {}, last_changed: 'T1' },
  'sensor.w': { state: 'Running', attributes: { friendly_name: 'Ma machine' }, last_changed: 'T0' },
});
check('rendu : un nom convivial qui change redessine', w.count() - after1, 2);
contains('rendu : et le nouveau nom est affiche', markup(w.card), 'Ma machine');

// setConfig must always force the next render, or an edit would not show. The
// states handed over afterwards are byte for byte the ones already seen, so
// only the reconfiguration itself can get this through.
const frozen = {
  'sensor.rem': { state: '540', attributes: {}, last_changed: 'T1' },
  'sensor.w': { state: 'Running', attributes: { friendly_name: 'Ma machine' }, last_changed: 'T0' },
};
w.card.hass = shown(frozen);
const beforeConfig = w.count();
w.card.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'washer',
  state_entity: 'sensor.w', remaining_time_entity: 'sensor.rem', name: 'Renommee' });
w.card.hass = shown(frozen);
check('rendu : une reconfiguration passe toujours', w.count() - beforeConfig, 1);
contains('rendu : et la card porte le nouveau nom', markup(w.card), 'Renommee');

// The fridge counts wall-clock time, not state. Its plug sits at 0 W with an
// unchanging last_changed, so nothing in the state can carry the minutes: the
// card has to keep its own beat or the line freezes at "0 min".
const T1 = freezeClock('2026-09-01T10:00:00Z');
const fr = counted({ appliance_type: 'fridge', power_entity: 'sensor.p', power_on_threshold: '1' });
const flat = () => ({ 'sensor.p': { state: '0', attributes: { unit_of_measurement: 'W' }, last_changed: 'T0' } });
fr.card.hass = HASS(flat());
const dur = () => (/<span class="label">Power<\/span><span>([^<]*)<\/span>/.exec(markup(fr.card)) || [, ''])[1];
contains('frigo : la duree part de zero', dur(), '0 min');
freezeClock(new Date(T1 + 12 * 60000).toISOString());
fr.card.hass = HASS(flat());
contains('frigo : la duree avance malgre une prise immobile', dur(), '12 min');
freezeClock(new Date(T1 + 31 * 60000).toISOString());
fr.card.hass = HASS(flat());
check('frigo : l\'alerte se declenche toujours', stateLine(markup(fr.card)), 'No power draw');
fr.card.disconnectedCallback();

// A dashboard rebuilds its cards at every visit, a phone app at each launch,
// so a count started by the card itself went back to zero every time and never
// reached the half hour. It starts from when Home Assistant saw the reading
// change: a plug off since last night is unplugged the moment the card opens.
const TP = freezeClock('2026-09-02T08:00:00Z');
const plugFrom = (minutesAgo) => ({ 'sensor.p': { state: '0', attributes: { unit_of_measurement: 'W' },
  last_changed: new Date(TP - minutesAgo * 60000).toISOString() } });
const frFresh = build({ appliance_type: 'fridge', power_entity: 'sensor.p' }, plugFrom(45));
check('frigo : une carte neuve reprend le compte depuis le changement', stateLine(frFresh.html), 'No power draw');
contains('frigo : la duree part du changement d\'etat', infoLine(frFresh.html, 'Power'), '45 min');
const frRecent = build({ appliance_type: 'fridge', power_entity: 'sensor.p' }, plugFrom(10));
check('frigo : 10 min depuis le changement, toujours Normal', stateLine(frRecent.html), 'Normal');
// A browser clock behind the server's puts last_changed in the future. The
// count then starts now, rather than from a moment that has not come yet.
const frAhead = build({ appliance_type: 'fridge', power_entity: 'sensor.p' }, plugFrom(-60));
check('frigo : un horodatage dans le futur, Normal au depart', stateLine(frAhead.html), 'Normal');
freezeClock(new Date(TP + 31 * 60000).toISOString());
check('frigo : un horodatage dans le futur compte depuis maintenant',
  stateLine(rerender(frAhead.card, plugFrom(-60))), 'No power draw');
for (const f of [frFresh, frRecent, frAhead]) f.card.disconnectedCallback();
freezeClock(new Date(T1).toISOString());

// The plug's own switch is the only thing that can say unplugged, and it says
// it at once. Switched on, a long 0 W is only a missing draw.
freezeClock(new Date(TP).toISOString());
{
  const withPlug = (sw, minutesAgo, extra = {}) => build({ appliance_type: 'fridge', power_entity: 'sensor.p',
    plug_entity: 'switch.plug', fridge_temperature_entity: 'sensor.fr_t', ...extra },
    { ...plugFrom(minutesAgo), 'switch.plug': { state: sw, attributes: {} }, 'sensor.fr_t': FRIDGE['sensor.fr_t'],
      'binary_sensor.fr_d': { state: 'on', attributes: {} } });
  const off = withPlug('off', 2);
  check('prise coupee : debranche tout de suite', stateLine(off.html), 'Unplugged');
  check('prise coupee : en rouge', stateColor(off.html), 'var(--error-color, #f44336)');
  check('prise coupee : l\'ecran du frigo passe en alerte', /class="fr-lcd warn"/.test(off.html), true);
  check('prise coupee : la ligne de puissance en rouge', /<div class="info-line warn[^"]*"[^>]*><ha-icon icon="[^"]*"><\/ha-icon><span class="label">Power<\/span>/.test(off.html), true);
  check('prise coupee : passe devant une porte ouverte',
    stateLine(withPlug('off', 2, { door_entity: 'binary_sensor.fr_d' }).html), 'Unplugged');
  const offDraw = build({ appliance_type: 'fridge', power_entity: 'sensor.p', plug_entity: 'switch.plug' },
    { 'sensor.p': { state: '72', attributes: { unit_of_measurement: 'W' } }, 'switch.plug': { state: 'off', attributes: {} } });
  check('prise coupee : meme si le compteur dit autre chose', stateLine(offDraw.html), 'Unplugged');
  const on45 = withPlug('on', 45);
  check('prise allumee, 45 min a 0 W : aucune consommation', stateLine(on45.html), 'No power draw');
  check('prise allumee : l\'ecran du frigo reste normal', /class="fr-lcd warn"/.test(on45.html), false);
  check('prise allumee, 10 min a 0 W : Normal', stateLine(withPlug('on', 10).html), 'Normal');
  const gone = build({ appliance_type: 'fridge', power_entity: 'sensor.p', plug_entity: 'switch.plug' },
    { 'sensor.p': { state: '72', attributes: { unit_of_measurement: 'W' } }, 'switch.plug': { state: 'unavailable', attributes: {} } });
  check('prise injoignable : ignoree', stateLine(gone.html), 'Normal');
  // The delay is the owner's to set: a chest freezer can rest an hour.
  const delay = (v, minutesAgo) => stateLine(build({ appliance_type: 'fridge', power_entity: 'sensor.p', no_power_after: v },
    plugFrom(minutesAgo)).html);
  check('delai 90 min : a 45 min, Normal', delay(90, 45), 'Normal');
  check('delai 90 min : a 91 min, alerte', delay(90, 91), 'No power draw');
  check('delai 90 en texte : compris', delay('90', 45), 'Normal');
  check('delai 5 min : a 6 min, alerte', delay(5, 6), 'No power draw');
  for (const bad of ['abc', 0, -5, '']) check(`delai invalide ${JSON.stringify(bad)} : 30 min par defaut`, delay(bad, 31), 'No power draw');
  check('delai invalide : pas avant 30 min', delay('abc', 29), 'Normal');
  check('delai 0 : pas une alerte immediate', delay(0, 1), 'Normal');
  contains('aucune consommation : en francais', build({ appliance_type: 'fridge', power_entity: 'sensor.p', language: 'fr' },
    plugFrom(45)).html, 'Aucune consommation');
  for (const b of [off, offDraw, on45, gone]) b.card.disconnectedCallback();
}
freezeClock(new Date(T1).toISOString());

// Staggered delays are what make three bubbles read as three. A blanket
// animation-delay would collapse them onto one.
const kettleStagger = render({ appliance_type: 'kettle', state_entity: 'switch.k' },
  { 'switch.k': { state: 'on', attributes: {} } });
check('animation : aucune regle n\'ecrase les delais propres',
  /animation-delay:[^;]*!important/.test(kettleStagger), false);
contains('animation : les bulles gardent leur decalage',
  kettleStagger, 'animation-delay: calc(-0.55s + var(--anim-offset, 0s))');
contains('animation : la vapeur aussi',
  kettleStagger, 'animation-delay: calc(-1.1s + var(--anim-offset, 0s))');
// An element with no stagger of its own still gets the resume offset, and the
// shorthand that sets the animation must carry it or it resets the delay.
contains('animation : le raccourci porte le decalage',
  kettleStagger, 'animation-delay: var(--anim-offset, 0s)');
const hoodStagger = render({ appliance_type: 'hood', state_entity: 'sensor.h', fan_entity: 'sensor.f' },
  { 'sensor.h': { state: 'Running', attributes: {} }, 'sensor.f': { state: '3', attributes: {} } });
contains('animation : les chevrons de hotte gardent le leur',
  hoodStagger, 'animation-delay: calc(-0.45s + var(--anim-offset, 0s))');
// And the offset composes with them rather than replacing them.
check('animation : plus aucune variable --d orpheline',
  /--d:/.test(kettleStagger), false);

// The whole suite once passed with every animation dead: a shorthand had lost
// its semicolon, so `animation: kt-rise 1.6s linear infinite animation-delay:
// ...` parsed as nothing and animation-name computed to none. Nothing here
// runs a CSS engine, so guard the shape of the declaration itself.
// Checked on the source, not on one rendered card: the card injects only the
// active appliance's stylesheet, so a broken shorthand in any other family
// would go unseen.
check('animation : aucun raccourci ampute de son point-virgule',
  /animation:[^;{}\n]*animation-delay/.test(SRC), false);
// Every family that animates carries the resume offset on its shorthand,
// otherwise the shorthand resets the delay and the stagger is lost.
check('animation : chaque raccourci porte le decalage de reprise',
  (SRC.match(/animation: [^;{}\n]+;/g) || []).length,
  (SRC.match(/animation: [^;{}\n]+; animation-delay: var\(--anim-offset, 0s\);/g) || []).length);
const styleOf = (h) => (/<style>([\s\S]*?)<\/style>/.exec(h) || [, ''])[1];
// And the animations a running appliance is supposed to declare are declared.
for (const [label, markupOf, names] of [
  ['bouilloire', kettleStagger, ['kt-rise', 'kt-steam']],
  ['hotte', hoodStagger, ['hd-rise']],
]) {
  for (const n of names) {
    check(`animation : ${label} declare ${n}`,
      new RegExp('animation: ' + n + '[^;]*;').test(styleOf(markupOf)), true);
  }
}

// And the offset actually carries the time already spent running, so a redraw
// picks the animation up where it was instead of snapping back to zero.
const offsetOf = (h) => (/--anim-offset: (-?[\d.]+)s/.exec(h) || [, null])[1];
const T2 = freezeClock('2026-09-01T12:00:00Z');
const spin = new Card();
spin.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'washer',
  state_entity: 'sensor.w', remaining_time_entity: 'sensor.rem' });
const spinStates = (rem) => ({ 'sensor.w': { state: 'Running', attributes: {}, last_changed: 'T0' },
  'sensor.rem': { state: String(rem), attributes: {}, last_changed: 'r' + rem } });
spin.hass = HASS(spinStates(600));
check('animation : au demarrage, aucun decalage', offsetOf(markup(spin)), '0');
freezeClock(new Date(T2 + 5000).toISOString());
spin.hass = HASS(spinStates(595));
check('animation : cinq secondes plus tard, le cycle reprend ou il en etait',
  offsetOf(markup(spin)), '-5');
// Stopping and starting again is a new cycle, not a resumed one.
freezeClock(new Date(T2 + 9000).toISOString());
spin.hass = HASS({ 'sensor.w': { state: 'Idle', attributes: {}, last_changed: 'T1' },
  'sensor.rem': { state: '0', attributes: {}, last_changed: 'r0' } });
freezeClock(new Date(T2 + 12000).toISOString());
spin.hass = HASS(spinStates(900));
check('animation : un nouveau cycle repart de zero', offsetOf(markup(spin)), '0');
freezeClock(new Date(T2).toISOString());

// ── The official Home Connect integration, and Home Assistant's own label ────
// home_connect_alt reports the dotted enum handled above. Home Assistant's own
// home_connect integration slugifies it instead, so the same programme arrives
// as dishcare_dishwasher_program_eco_50 and the dotted pattern cannot see it.

check('programme : enum en snake_case de l\'integration officielle',
  progName('dishcare_dishwasher_program_eco_50'), 'Eco 50');
check('programme : lave-linge en snake_case',
  progName('laundrycare_washer_program_auto_40'), 'Auto 40');
check('programme : un seul mot apres le prefixe',
  progName('laundrycare_dryer_program_synthetic'), 'Synthetic');
// A snake_case token arrives entirely lower case, which shouts next to the
// other lines. Only such a token is re-cased.
check('programme : une valeur qui porte deja ses majuscules garde les siennes',
  progName('LaundryCare.Washer.Program.SportFitness'), 'Sport Fitness');
check('programme : une lecture ordinaire n\'est pas capitalisee', progName('1.5 kg'), '1.5 kg');

// Home Assistant ships the translated label for an enum option and renders it
// with formatEntityState. That beats any string mangling of ours: it carries
// the integration's own wording and the user's language.
function withFormatter(config, raw, formatted) {
  const c = new Card();
  c.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'washer',
    state_entity: 'sensor.w', program_entity: 'sensor.p', ...config });
  const states = { 'sensor.w': { state: 'Running', attributes: {} },
                   'sensor.p': { state: raw, attributes: {} } };
  c._hass = { ...HASS(states), formatEntityState: () => formatted };
  c._render();
  // The label beside the value follows the card's language, so read the line
  // by its position rather than by an English word.
  return infoLine(markup(c), config.language === 'fr' ? 'Programme' : 'Program');
}
check('programme : le libelle de Home Assistant est prefere',
  withFormatter({}, 'dishcare_dishwasher_program_eco_50', 'Eco 50 °C'), 'Eco 50 °C');
// It cannot honour a language pinned on the card, since it reads the Home
// Assistant locale. Rather than contradict the option, fall back to our own.
check('programme : une langue forcee sur la card l\'emporte sur le formateur',
  withFormatter({ language: 'fr' }, 'dishcare_dishwasher_program_eco_50', 'Eco 50 °C'), 'Eco 50');
// A formatter that hands the raw value straight back has told us nothing.
check('programme : un formateur qui ne formate rien laisse la main',
  withFormatter({}, 'dishcare_dishwasher_program_eco_50', 'dishcare_dishwasher_program_eco_50'), 'Eco 50');
check('programme : raw court-circuite tout',
  withFormatter({ program_format: 'raw' }, 'dishcare_dishwasher_program_eco_50', 'Eco 50 °C'),
  'dishcare_dishwasher_program_eco_50');

report();
