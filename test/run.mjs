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

// The editor builds a card of its own to ask which lines it draws. The harness
// hands back inert nodes for every tag, so a defined element is instantiated
// here instead, which is what a browser does.
const plainCreate = document.createElement;
document.createElement = (tag) => {
  const Defined = registry.get(tag);
  return Defined ? new Defined() : plainCreate(tag);
};

FakeNodeProto.addEventListener = function (type, cb) {
  (this.__handlers ||= {})[type] = cb;
};
FakeNodeProto.querySelector = function (sel) {
  const memo = (this.__qs ||= new Map());
  if (!memo.has(sel)) memo.set(sel, document.createElement('div'));
  return memo.get(sel);
};
// The card wires the tap on its header, which it finds by id. Without this the
// handler is never registered and the whole tap path is unreachable.
FakeNodeProto.getElementById = function (id) {
  const memo = (this.__ids ||= new Map());
  if (!memo.has(id)) memo.set(id, document.createElement('div'));
  return memo.get(id);
};
// Only attribute-presence selectors are resolved, which is all the editor uses
// ([data-field], [data-toggle]), and the stubs are built from the markup this
// node was actually given, so they carry real attribute values.
FakeNodeProto.querySelectorAll = function (sel) {
  // The card wires its own clicks on a class selector, and a button carries
  // what the click has to pass on: the entity, and for a list or a number the
  // option to pick or the value to write. Without this the whole click path
  // would be unreachable, which is exactly where such a payload gets lost.
  if (sel === '.action-btn, .light-badge') {
    const memo = (this.__qsa ||= new Map());
    if (memo.has(sel)) return memo.get(sel);
    const out = [];
    for (const m of String(this._html || '').matchAll(/<div class="(?:action-btn|light-badge)[^"]*"([^>]*)>/g)) {
      const node = document.createElement('div');
      for (const a of m[1].matchAll(/([a-z-]+)="([^"]*)"/g)) node.setAttribute(a[1], a[2]);
      out.push(node);
    }
    memo.set(sel, out);
    return out;
  }
  // The info lines and the alert rows open their entity: their click is wired
  // on class selectors as well, and the entity rides on data-more. The nodes
  // are kept by entity, for a test to click the one the card wired, and are
  // made again whenever the markup changes.
  if (/^\.[a-z-]+\[data-more\](,\s*\.[a-z-]+\[data-more\])*$/.test(sel)) {
    const classes = [...sel.matchAll(/\.([a-z-]+)\[data-more\]/g)].map(m => m[1]);
    if (this.__moreHtml !== this._html) {
      this.__moreHtml = this._html;
      this.__more = new Map();
    }
    const out = [];
    for (const m of String(this._html || '').matchAll(/<div class="([^"]*)"([^>]*)>/g)) {
      const id = /data-more="([^"]*)"/.exec(m[2])?.[1];
      if (!id || !m[1].split(/\s+/).some(c => classes.includes(c))) continue;
      const node = this.__more.get(id) || document.createElement('div');
      node.setAttribute('data-more', id);
      this.__more.set(id, node);
      out.push(node);
    }
    return out;
  }
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

// Progress is the time the cycle has run over that time plus what is left.
// The start is when the state turned to running, pauses are taken out, and a
// change of phase or a gap in the data does not restart it.
const MIN = 60000;
const at = m => new Date(T0 + m * MIN).toISOString();
const wst = (state, lcMin) => ({ state, attributes: {}, last_changed: at(lcMin) });
const secs = n => ({ state: String(n), attributes: {} });
const finish = m => ({ state: at(m), attributes: { device_class: 'timestamp' } });
const WCFG = { appliance_type: 'washer', state_entity: 'sensor.w', remaining_time_entity: 'sensor.r' };
const clockAt = m => freezeClock(at(m));

const prog = build(WCFG, { 'sensor.w': wst('Idle', -90), 'sensor.r': secs(0) });
check('progression : pas de barre a l\'arret', /class="bar-fill"/.test(prog.html), false);
check('progression : depart vu = 0 %',
  barWidth(rerender(prog.card, { 'sensor.w': wst('Running', 0), 'sensor.r': secs(3600) })), '0');
clockAt(30);
check('progression : moitie du temps ecoule = 50 %',
  barWidth(rerender(prog.card, { 'sensor.w': wst('Running', 0), 'sensor.r': secs(1800) })), '50');
// A change of phase is a new state, with its own last change: the cycle
// still began where it began.
clockAt(45);
check('progression : un changement de phase ne remet pas a zero',
  barWidth(rerender(prog.card, { 'sensor.w': wst('Rinsing', 45), 'sensor.r': secs(900) })), '75');
check('progression : cycle termine = 100 %',
  barWidth(rerender(prog.card, { 'sensor.w': wst('Finished', 60), 'sensor.r': secs(0) })), '100');
// The finished cycle is over: the next one starts from its own beginning.
clockAt(100);
check('progression : le cycle suivant repart de son debut',
  barWidth(rerender(prog.card, { 'sensor.w': wst('Running', 100), 'sensor.r': secs(3600) })), '0');
clockAt(0);

// A pause is not time spent on the cycle. 20 minutes run, 10 paused, then 40
// left: a third of the way.
const paused = build(WCFG, { 'sensor.w': wst('Idle', -90), 'sensor.r': secs(0) });
rerender(paused.card, { 'sensor.w': wst('Running', 0), 'sensor.r': secs(3600) });
// The card is told a little after each change: the times come from the
// states, not from when the card happened to hear about them.
clockAt(25);
check('pause : la barre disparait pendant la pause',
  /class="bar-fill"/.test(rerender(paused.card, { 'sensor.w': wst('Paused', 20), 'sensor.r': secs(2400) })), false);
// 31 minutes since the start, paused from 20 to 30: 21 run, 40 left.
clockAt(31);
check('pause : le temps en pause est retire',
  barWidth(rerender(paused.card, { 'sensor.w': wst('Running', 30), 'sensor.r': secs(2400) })), '34');
// A restart of Home Assistant turns every state unavailable for a moment.
clockAt(32);
rerender(paused.card, { 'sensor.w': wst('unavailable', 32), 'sensor.r': secs(2340) });
// 33 minutes since the start, 10 of them paused: 23 run, 38 left.
clockAt(33);
check('coupure : une indisponibilite ne remet pas a zero',
  barWidth(rerender(paused.card, { 'sensor.w': wst('Running', 33), 'sensor.r': secs(2280) })), '38');
clockAt(0);

// Opened during a pause: the pause is not run time either, history or not.
const openPaused = build(WCFG, { 'sensor.w': wst('Paused', -10), 'sensor.r': secs(1800) });
check('pause : ouverte en pause, pas de barre', /class="bar-fill"/.test(openPaused.html), false);
check('pause : ouverte en pause, la reprise part de zero',
  barWidth(rerender(openPaused.card, { 'sensor.w': wst('Running', 0), 'sensor.r': secs(1800) })), '0');

// A browser clock a little behind Home Assistant sees the state change in
// the future. That is no time run, and certainly not a finished cycle.
check('horloge en retard : pas de temps negatif',
  barWidth(render(WCFG, { 'sensor.w': wst('Running', 5), 'sensor.r': secs(60) })), '0');
// Nothing run and nothing left: there is nothing to draw.
check('progression : ni temps ecoule ni temps restant, pas de barre',
  /class="bar-fill"/.test(render(WCFG, { 'sensor.w': wst('Running', 0), 'sensor.r': secs(0) })), false);
// A state derived from the power meter did not change when the cycle began:
// the plug's own state says nothing about it.
check('puissance : le changement d\'etat de la prise ne sert pas de depart',
  barWidth(render({ ...WCFG, power_entity: 'sensor.pw', power_on_threshold: 10 },
    { 'sensor.w': wst('on', -60), 'sensor.pw': secs(500), 'sensor.r': secs(1800) })), '0');

// Opened in the middle of a cycle: the reported case, an LG ThinQ washer
// whose finish time is a timestamp. Running since 14 minutes, 47 left.
const midway = render(WCFG, { 'sensor.w': wst('Running', -14), 'sensor.r': finish(47) });
check('en plein cycle : la barre part du debut du cycle, pas de zero', barWidth(midway), '23');
// Without any time of change, the card can only start from now.
check('en plein cycle : sans heure de changement, depart maintenant',
  barWidth(render(WCFG, { 'sensor.w': { state: 'Running', attributes: {} }, 'sensor.r': secs(1800) })), '0');
// A progress entity says it all.
check('progression : l\'entite de progression prime',
  barWidth(render({ ...WCFG, progress_entity: 'sensor.p' },
    { 'sensor.w': wst('Running', -14), 'sensor.r': finish(47), 'sensor.p': secs(80) })), '80');

// ── The history lookup ──
// Opened during the rinse, the last change of state is only the rinse. The
// card reads the history once to find where the cycle really began.
const H = (state, m) => ({ s: state, lu: (T0 + m * MIN) / 1000 });
function withHistory(config, states, answer) {
  const calls = [];
  const c = new Card();
  c.setConfig({ type: 'custom:ha-appliance-card', ...config });
  c._hass = { ...HASS(states), callWS: msg => { calls.push(msg); return typeof answer === 'function' ? answer(msg) : Promise.resolve(answer); } };
  c._render();
  return { card: c, calls, html: markup(c) };
}
const settle = () => new Promise(r => setTimeout(r, 0));
const RINSE = { 'sensor.w': wst('Rinsing', -5), 'sensor.r': secs(35 * 60) };
const hist = withHistory(WCFG, RINSE, { 'sensor.w': [
  H('Idle', -60), H('Running', -40), H('Paused', -30), H('Running', -25), H('Rinsing', -5)] });
check('historique : en attendant, le dernier changement sert de depart', barWidth(hist.html), '13');
check('historique : une seule demande', hist.calls.length, 1);
check('historique : la bonne demande', hist.calls[0]?.type, 'history/history_during_period');
check('historique : sur l\'entite d\'etat', hist.calls[0]?.entity_ids?.join(','), 'sensor.w');
check('historique : sur douze heures', hist.calls[0]?.start_time, new Date(T0 - 12 * 60 * MIN).toISOString());
check('historique : jusqu\'a maintenant', hist.calls[0]?.end_time, at(0));
check('historique : sans attributs', hist.calls[0]?.no_attributes, true);
check('historique : avec l\'etat au debut de la fenetre', hist.calls[0]?.include_start_time_state, true);
check('historique : au format court', hist.calls[0]?.minimal_response, true);
check('historique : tous les changements', hist.calls[0]?.significant_changes_only, false);
await settle();
// 40 minutes since the start, 5 of them paused: 35 run, 35 left.
check('historique : le vrai debut, pauses retirees', barWidth(markup(hist.card)), '50');
rerender(hist.card, RINSE);
check('historique : pas de seconde demande pour le meme cycle', hist.calls.length, 1);

// "lc" wins over "lu" when Home Assistant sends both.
const histLc = withHistory(WCFG, RINSE, { 'sensor.w': [
  { s: 'Idle', lu: (T0 - 60 * MIN) / 1000 }, { s: 'Running', lu: (T0 - 20 * MIN) / 1000, lc: (T0 - 40 * MIN) / 1000 },
  H('Rinsing', -5)] });
await settle();
check('historique : last_changed plutot que last_updated', barWidth(markup(histLc.card)), '53');

// A gap cannot open a cycle: idle, then out of sight, then running.
const histGap = withHistory(WCFG, RINSE, { 'sensor.w': [
  H('Idle', -60), H('unavailable', -50), H('Running', -40), H('Rinsing', -5)] });
await settle();
check('historique : une indisponibilite n\'ouvre pas le cycle', barWidth(markup(histGap.card)), '53');
// ...but one in the middle of the cycle belongs to it.
const histMid = withHistory(WCFG, RINSE, { 'sensor.w': [
  H('Idle', -60), H('Running', -40), H('unavailable', -20), H('Running', -19), H('Rinsing', -5)] });
await settle();
check('historique : une indisponibilite en cours de cycle en fait partie', barWidth(markup(histMid.card)), '53');
// Running since before the window: the window is all there is.
const histLong = withHistory(WCFG, RINSE, { 'sensor.w': [H('Running', -40), H('Rinsing', -5)] });
await settle();
check('historique : en marche depuis le debut de la fenetre', barWidth(markup(histLong.card)), '53');
// Still paused: the pause in progress is not run time either.
const histPaused = withHistory(WCFG, { 'sensor.w': wst('Running', -5), 'sensor.r': secs(30 * 60) }, { 'sensor.w': [
  H('Idle', -60), H('Running', -40), H('Paused', -20), H('Running', -5)] });
await settle();
check('historique : les pauses terminees sont retirees', barWidth(markup(histPaused.card)), '45');
// Opened during a pause: the history knows since when, and the resume counts
// it out. 40 minutes since the start, paused from -10 to 0: 30 run, 30 left.
const histInPause = withHistory(WCFG, { 'sensor.w': wst('Paused', -10), 'sensor.r': secs(30 * 60) }, { 'sensor.w': [
  H('Idle', -60), H('Running', -40), H('Paused', -10)] });
await settle();
histInPause.card._hass = { ...histInPause.card._hass, states: { 'sensor.w': wst('Running', 0), 'sensor.r': secs(30 * 60) } };
histInPause.card._render();
check('historique : ouverte en pause, la pause en cours est retiree', barWidth(markup(histInPause.card)), '50');

// What the history cannot improve is left alone.
const histLate = withHistory(WCFG, RINSE, { 'sensor.w': [H('Idle', -60), H('Rinsing', -2)] });
await settle();
check('historique : un debut plus tardif est ignore', barWidth(markup(histLate.card)), '13');
const histStale = withHistory(WCFG, RINSE, { 'sensor.w': [H('Running', -40), H('Finished', -30)] });
await settle();
check('historique : un historique en retard sur l\'etat est ignore', barWidth(markup(histStale.card)), '13');
const histEmpty = withHistory(WCFG, RINSE, {});
await settle();
check('historique : entite hors de l\'historique, le dernier changement reste', barWidth(markup(histEmpty.card)), '13');
const histFail = withHistory(WCFG, RINSE, () => Promise.reject(new Error('refuse')));
await settle();
check('historique : une demande refusee ne casse rien', barWidth(markup(histFail.card)), '13');
const histThrow = withHistory(WCFG, RINSE, () => { throw new Error('pas de websocket'); });
check('historique : une demande qui leve ne casse rien', barWidth(histThrow.html), '13');

// An answer that arrives after the cycle ended must not bring it back.
let release;
const histSlow = withHistory(WCFG, RINSE, () => new Promise(r => { release = r; }));
rerender(histSlow.card, { 'sensor.w': wst('Finished', 0), 'sensor.r': secs(0) });
let lateRenders = 0;
const slowRender = histSlow.card._render.bind(histSlow.card);
histSlow.card._render = () => { lateRenders++; slowRender(); };
release({ 'sensor.w': [H('Idle', -60), H('Running', -40), H('Rinsing', -5)] });
await settle();
check('historique : une reponse apres la fin est ignoree', histSlow.card._cycle, null);
check('historique : une reponse apres la fin ne redessine rien', lateRenders, 0);
check('historique : la barre reste pleine', barWidth(markup(histSlow.card)), '100');

// No lookup when there is nothing to find.
check('historique : depart vu, aucune demande', (() => {
  const seen = withHistory(WCFG, { 'sensor.w': wst('Idle', -60), 'sensor.r': secs(0) }, {});
  seen.card._hass = { ...seen.card._hass, states: { 'sensor.w': wst('Running', 0), 'sensor.r': secs(3600) } };
  seen.card._render();
  return seen.calls.length;
})(), 0);
check('historique : etat tire de la puissance, aucune demande',
  withHistory({ ...WCFG, power_entity: 'sensor.pw', power_on_threshold: 10 },
    { 'sensor.w': wst('on', -60), 'sensor.pw': secs(500), 'sensor.r': secs(1800) }, {}).calls.length, 0);
check('historique : entite de progression, aucune demande',
  withHistory({ ...WCFG, progress_entity: 'sensor.p' }, { ...RINSE, 'sensor.p': secs(40) }, {}).calls.length, 0);
check('historique : sans temps restant, aucune demande',
  withHistory({ appliance_type: 'washer', state_entity: 'sensor.w' }, RINSE, {}).calls.length, 0);
check('historique : ouverte indisponible, aucune demande',
  withHistory(WCFG, { 'sensor.w': wst('unavailable', -60), 'sensor.r': secs(1800) }, {}).calls.length, 0);
check('historique : a l\'arret, aucune demande',
  withHistory(WCFG, { 'sensor.w': wst('Idle', -60), 'sensor.r': secs(0) }, {}).calls.length, 0);

// ── The countdown beat ──
// A finish time does not change while the minutes run out: the card keeps
// its own beat, and the minute on screen joins what decides a redraw.
const tick = build(WCFG, { 'sensor.w': wst('Running', -14), 'sensor.r': finish(47) }).card;
check('decompte : la carte bat la mesure', !!tick._countdownTimer, true);
check('decompte : la minute compte pour redessiner', tick._stateSignature(tick._hass).includes('|c'), true);
tick.disconnectedCallback();
check('decompte : arrete quand la carte est retiree', tick._countdownTimer, null);
check('decompte : pas pour une duree, qui se met a jour seule',
  !!build(WCFG, { 'sensor.w': wst('Running', -14), 'sensor.r': secs(1800) }).card._countdownTimer, false);
const tickDone = build(WCFG, { 'sensor.w': wst('Running', -14), 'sensor.r': finish(47) }).card;
rerender(tickDone, { 'sensor.w': wst('Finished', 0), 'sensor.r': finish(0) });
check('decompte : arrete en fin de cycle', tickDone._countdownTimer, null);
check('decompte : la minute sort de la signature', tickDone._stateSignature(tickDone._hass).includes('|c'), false);

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

// A button's icon is the owner's to choose (HACF): mdi:play reads as "run a
// programme", which is not what every press does. YAML only, no editor field.
{
  const btnIcon = (cfg, extra) => (/<div class="action-btn[^"]*"[^>]*><ha-icon icon="([^"]*)"/
    .exec(render({ appliance_type: 'washer', state_entity: 'sensor.w', ...cfg },
      { 'sensor.w': { state: 'Idle', attributes: {} }, ...(extra || {}) })) || [, ''])[1];
  check('icone de bouton : mdi:play par defaut', btnIcon({ start_entity: 'button.b' }), 'mdi:play');
  check('icone de bouton : celle du YAML',
    btnIcon({ start_entity: 'button.b', start_icon: 'mdi:gesture-tap-button' }), 'mdi:gesture-tap-button');
  check('icone de bouton : une valeur vide garde la sienne',
    btnIcon({ start_entity: 'button.b', start_icon: '' }), 'mdi:play');
  // Every button, not only the start: each one takes the icon named after it.
  for (const [key, field, dflt] of [['pause', 'pause_entity', 'mdi:pause'], ['resume', 'resume_entity', 'mdi:play-pause'],
    ['stop', 'stop_entity', 'mdi:stop'], ['toggle', 'toggle_entity', 'mdi:power']]) {
    check(`icone de bouton : ${key} par defaut`, btnIcon({ [field]: 'button.b' }), dflt);
    check(`icone de bouton : ${key} au choix`, btnIcon({ [field]: 'button.b', [`${key}_icon`]: 'mdi:gesture-tap-button' }), 'mdi:gesture-tap-button');
  }
  check('icone de bouton : le filtre d\'une hotte aussi',
    (/<div class="action-btn[^"]*"[^>]*><ha-icon icon="([^"]*)"/.exec(render({ appliance_type: 'hood',
      state_entity: 'switch.hood', filter_reset_entity: 'button.b', filter_reset_icon: 'mdi:broom' },
      { 'switch.hood': { state: 'on', attributes: {} } })) || [, ''])[1], 'mdi:broom');
}

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
check('non-regression lave-linge : etat', stateLine(washer), 'Washing');
check('non-regression lave-linge : en marche', machineCls(washer).includes('spinning'), true);
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

// 5bis/10. The order panel asks the card which lines it draws, and dragging one
// writes the whole order down rather than a diff, so it survives the next edit.
const edOrder = newEditor({ appliance_type: 'oven', state_entity: 'sensor.oven_appliance_state',
                            program_entity: 'sensor.oven_program', door_entity: 'sensor.oven_door' });
const drawnKeys = edOrder._drawnLines().map((l) => l.key);
check('5bis/10 ordre : l\'editeur lit les lignes de la carte',
  drawnKeys.join(' '), 'program door');
check('5bis/10 ordre : le panneau liste les lignes',
  (markup(edOrder).match(/data-line-index=/g) || []).length, 2);
edOrder._reorderLines(0, 1);
checkFired('5bis/10 _reorderLines', edOrder,
  ev => check('5bis/10 _reorderLines : ordre inverse dans lines_order',
    (ev.detail.config.lines_order || []).join(' '), 'door program'));
const edNoOrder = newEditor({ appliance_type: 'kettle', state_entity: 'sensor.z1' });
check('5bis/10 ordre : rien a ranger, pas de panneau',
  /data-line-index=/.test(markup(edNoOrder)), false);

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

noInjection('icone de bouton choisie', render({ appliance_type: 'washer', state_entity: 'sensor.w',
  start_entity: 'button.b', start_icon: XSS }, { 'sensor.w': { state: 'Idle', attributes: {} } }));

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

// ── Heat pump ────────────────────────────────────────────────────────────────
// A climate entity says what the pump does in hvac_action (Octopus Energy sets
// heating or idle from the zone's relay); its state is only the mode picked.
const hpOf = (state, attributes = {}, extra = {}, more = {}) => render(
  { appliance_type: 'heat_pump', state_entity: 'climate.hp_zone', ...extra },
  { 'climate.hp_zone': { state, attributes }, ...more });
const hasCls = (h, c) => machineCls(h).split(' ').includes(c);
for (const [action, label, mode, fan] of [
  ['heating', 'Heating', 'space_heating', true], ['preheating', 'Heating', 'space_heating', true],
  ['idle', 'Standby', 'idle', false], ['off', 'Standby', 'idle', false],
  ['defrosting', 'Defrosting', 'defrost', false], ['cooling', 'Cooling', 'cooling', true],
]) {
  const h = hpOf('heat', { hvac_action: action });
  check(`pac : hvac_action ${action} se lit ${label}`, stateLine(h), label);
  check(`pac : hvac_action ${action} dessine le mode ${mode}`, hasCls(h, `mode-${mode}`), true);
  check(`pac : hvac_action ${action}, ventilateur ${fan ? 'en marche' : 'arrete'}`, hasCls(h, 'fan'), fan);
}
check('pac : sans hvac_action, le mode choisi et rien de plus', stateLine(hpOf('heat')), 'Heat');
check('pac : sans hvac_action, le ventilateur ne tourne pas', hasCls(hpOf('heat'), 'fan'), false);
check('pac : le mode cool n\'est pas un refroidissement en cours', stateLine(hpOf('cool')), 'Cool');
check('pac : un mode reste gris', stateColor(hpOf('heat')), 'var(--disabled-text-color, #9e9e9e)');
check('pac : sans hvac_action, off reste le mode off', stateLine(hpOf('off')), 'Off');
// Overkiz calls a mode "on", which reads as running anywhere else.
const hpOn = render({ appliance_type: 'heat_pump', state_entity: 'water_heater.hp_tank' },
  { 'water_heater.hp_tank': { state: 'on', attributes: {} } });
check('pac : un mode "on" n\'est pas une marche', stateLine(hpOn), 'On');
check('pac : un mode "on" reste gris', stateColor(hpOn), 'var(--disabled-text-color, #9e9e9e)');
check('pac : un mode "on" ne fait pas tourner le ventilateur', hasCls(hpOn, 'fan'), false);
check('pac : chauffage en orange', stateColor(hpOf('heat', { hvac_action: 'heating' })), '#ff7043');
check('pac : refroidissement en bleu', stateColor(hpOf('cool', { hvac_action: 'cooling' })), '#29b6f6');
check('pac : degivrage en cyan', stateColor(hpOf('heat', { hvac_action: 'defrosting' })), '#4dd0e1');
check('pac : veille en gris', stateColor(hpOf('heat', { hvac_action: 'idle' })), 'var(--disabled-text-color, #9e9e9e)');
contains('pac : en francais', hpOf('heat', { hvac_action: 'defrosting' }, { language: 'fr' }), 'Dégivrage');

// Indicators win when they are on, and hot water wins a tie.
const hpInd = (hw, ch, action = 'heating') => hpOf('heat', { hvac_action: action },
  { hot_water_entity: 'binary_sensor.hw', heating_entity: 'binary_sensor.ch' },
  { 'binary_sensor.hw': { state: hw, attributes: {} }, 'binary_sensor.ch': { state: ch, attributes: {} } });
check('pac : indicateur d\'eau chaude', stateLine(hpInd('on', 'off')), 'Hot water');
check('pac : eau chaude en rouge', stateColor(hpInd('on', 'off')), '#ef5350');
check('pac : l\'eau chaude passe devant le chauffage', stateLine(hpInd('on', 'on')), 'Hot water');
check('pac : indicateur de chauffage sur une zone au repos', stateLine(hpInd('off', 'on', 'idle')), 'Heating');
check('pac : indicateurs eteints, la zone decide', stateLine(hpInd('off', 'off', 'idle')), 'Standby');
check('pac : eau chaude, ventilateur en marche', hasCls(hpInd('on', 'off'), 'fan'), true);

// MELCloud (Ecodan) says it in its water heater's status attribute.
const hpMel = status => render({ appliance_type: 'heat_pump', state_entity: 'water_heater.hp_tank' },
  { 'water_heater.hp_tank': { state: 'auto', attributes: { status } } });
for (const [status, label] of [['heat_water', 'Hot water'], ['legionella', 'Hot water'], ['heat_zones', 'Heating'],
  ['defrost', 'Defrosting'], ['cool', 'Cooling'], ['idle', 'Standby']]) {
  check(`pac : MELCloud ${status} se lit ${label}`, stateLine(hpMel(status)), label);
}

// A sensor speaks in words, and state_map still wins.
const hpWord = (state, extra = {}) => render({ appliance_type: 'heat_pump', state_entity: 'sensor.hp_status', ...extra },
  { 'sensor.hp_status': { state, attributes: {} } });
for (const [raw, label, mode] of [['Defrost', 'Defrosting', 'defrost'], ['Abtauen', 'Defrosting', 'defrost'],
  ['Cooling', 'Cooling', 'cooling'], ['Rafraîchissement', 'Cooling', 'cooling'], ['DHW', 'Hot water', 'hot_water'],
  ['Heating', 'Heating', 'space_heating'], ['Standby', 'Standby', 'idle']]) {
  check(`pac : ${raw} se lit ${label}`, stateLine(hpWord(raw)), label);
  check(`pac : ${raw} dessine le mode ${mode}`, hasCls(hpWord(raw), `mode-${mode}`), true);
}
check('pac : state_map vers le degivrage', stateLine(hpWord('7', { state_map: { 7: 'defrost' } })), 'Defrosting');
check('pac : state_map passe devant hvac_action',
  stateLine(hpOf('heat', { hvac_action: 'heating' }, { state_map: { heat: 'idle' } })), 'Standby');
check('pac : un mot inconnu reste lisible', stateLine(hpWord('Maintenance')), 'Maintenance');

// Only a power meter: it runs, without saying what for.
const hpPow = w => render({ appliance_type: 'heat_pump', state_entity: 'sensor.hp_in', power_entity: 'sensor.hp_in', power_on_threshold: 50 },
  { 'sensor.hp_in': { state: w, attributes: { unit_of_measurement: 'W' } } });
check('pac : compteur seul, en marche', stateLine(hpPow('900')), 'Running');
check('pac : compteur seul, le ventilateur tourne', hasCls(hpPow('900'), 'fan'), true);
check('pac : compteur seul, a l\'arret', stateLine(hpPow('3')), 'Standby');

// The readings.
const HP_READINGS = {
  'sensor.hp_flow': { state: '41.6', attributes: { unit_of_measurement: '°C' } },
  'sensor.hp_out': { state: '7.5', attributes: { unit_of_measurement: '°C' } },
  'sensor.hp_in': { state: '0.85', attributes: { unit_of_measurement: 'kW' } },
  'sensor.hp_heat': { state: '2.55', attributes: { unit_of_measurement: 'kW' } },
  'sensor.hp_cop': { state: '3.2', attributes: {} },
};
const hpFull = (extra = {}, more = {}) => hpOf('heat', { hvac_action: 'heating' },
  { temperature_entity: 'sensor.hp_flow', outdoor_temperature_entity: 'sensor.hp_out', power_entity: 'sensor.hp_in',
    heat_output_entity: 'sensor.hp_heat', ...extra }, { ...HP_READINGS, ...more });
const hpH = hpFull();
contains('pac : temperature de depart a l\'ecran', hpH, '<div class="hp-lcd">42°</div>');
check('pac : ligne temperature de depart, au degre par defaut', infoLine(hpH, 'Flow temperature'), '42\u00a0°C');
check('pac : ligne temperature exterieure, au degre par defaut', infoLine(hpH, 'Outdoor temperature'), '8\u00a0°C');
const hpDix = hpFull({ temperature_decimals: '1' });
check('pac au dixieme : depart', infoLine(hpDix, 'Flow temperature'), '41.6\u00a0°C');
check('pac au dixieme : exterieur', infoLine(hpDix, 'Outdoor temperature'), '7.5\u00a0°C');
contains('pac au dixieme : l\'ecran', hpDix, '<div class="hp-lcd">41.6°</div>');
check('pac : la puissance garde ses decimales au degre', infoLine(hpH, 'Power'), '0.85\u00a0kW');
check('pac : une sonde exterieure muette ne fait pas de ligne',
  infoLine(hpFull({}, { 'sensor.hp_out': { state: 'unavailable', attributes: { unit_of_measurement: '°C' } } }), 'Outdoor temperature'), null);
check('pac : puissance en kW sans arrondi', infoLine(hpH, 'Power'), '0.85\u00a0kW');
check('pac : une seule ligne de puissance', (hpH.match(/<span class="label">Power<\/span>/g) || []).length, 1);
check('pac : chaleur produite', infoLine(hpH, 'Heat output'), '2.55\u00a0kW');
check('pac : COP calcule sans entite', infoLine(hpH, 'COP'), '3.0');
check('pac : COP calcule en watts et kilowatts',
  infoLine(hpFull({}, { 'sensor.hp_in': { state: '850', attributes: { unit_of_measurement: 'W' } } }), 'COP'), '3.0');
check('pac : pas de COP a l\'arret',
  infoLine(hpFull({}, { 'sensor.hp_in': { state: '0', attributes: { unit_of_measurement: 'kW' } } }), 'COP'), null);
check('pac : pas de COP sur un compteur negatif',
  infoLine(hpFull({}, { 'sensor.hp_in': { state: '-0.2', attributes: { unit_of_measurement: 'kW' } } }), 'COP'), null);
check('pac : pas de COP sans unite connue',
  infoLine(hpFull({}, { 'sensor.hp_heat': { state: '2.55', attributes: {} } }), 'COP'), null);
check('pac : l\'entite COP passe devant le calcul', infoLine(hpFull({ cop_entity: 'sensor.hp_cop' }), 'COP'), '3.2');
// The hydraulics (issue #17): what comes back, what the emitter took out of
// it on the way, how fast the water goes round and what the machine is doing
// to make it happen.
const HP_HYDRO = {
  'sensor.hp_return': { state: '36.2', attributes: { unit_of_measurement: '°C' } },
  'sensor.hp_rate':   { state: '17.4', attributes: { unit_of_measurement: 'L/min' } },
  'sensor.hp_hz':     { state: '43',   attributes: { unit_of_measurement: 'Hz' } },
  'sensor.hp_rpm':    { state: '720',  attributes: { unit_of_measurement: 'rpm' } },
};
const hpHydro = (extra = {}, more = {}) => hpFull({ return_temperature_entity: 'sensor.hp_return',
  water_flow_entity: 'sensor.hp_rate', compressor_entity: 'sensor.hp_hz',
  fan_speed_entity: 'sensor.hp_rpm', ...extra }, { ...HP_HYDRO, ...more });
const hpHy = hpHydro();
// One line for one pipe: the water leaves at 42 and comes back at 36.
check('pac : depart et retour sur une ligne', infoLine(hpHy, 'Flow and return'), '42 °C → 36 °C');
check('pac : et plus de ligne de retour separee', infoLine(hpHy, 'Return temperature'), null);
check('pac : le retour seul garde sa ligne',
  infoLine(hpOf('heat', { hvac_action: 'heating' }, { return_temperature_entity: 'sensor.hp_return' }, HP_HYDRO), 'Return temperature'), '36 °C');
check('pac : le depart seul garde la sienne', infoLine(hpFull(), 'Flow temperature'), '42 °C');
check('pac : debit d\'eau', infoLine(hpHy, 'Water flow'), '17.4 L/min');
check('pac : frequence du compresseur', infoLine(hpHy, 'Compressor'), '43 Hz');
check('pac : vitesse du ventilateur', infoLine(hpHy, 'Fan speed'), '720 rpm');

// The delta is worked out from the two temperatures, like the COP from heat
// over power. Never at the whole degree: a pump works on a couple of them.
check('pac : l\'ecart est calcule', infoLine(hpHy, 'Delta'), '5.4 °C');
check('pac : l\'ecart garde son dixieme quand le reste est au degre entier',
  infoLine(hpHydro({ temperature_decimals: '0' }), 'Delta'), '5.4 °C');
check('pac : l\'ecart au dixieme demande', infoLine(hpHydro({ temperature_decimals: '1' }), 'Delta'), '5.4 °C');
check('pac : pas d\'ecart sans le retour', infoLine(hpFull(), 'Delta'), null);
check('pac : pas d\'ecart sans le depart',
  infoLine(hpOf('heat', { hvac_action: 'heating' }, { return_temperature_entity: 'sensor.hp_return' }, HP_HYDRO), 'Delta'), null);
// In cooling the water comes back warmer, and an ecart is a distance.
check('pac : en froid l\'ecart reste positif',
  infoLine(hpHydro({}, { 'sensor.hp_flow': { state: '18.0', attributes: { unit_of_measurement: '°C' } },
                         'sensor.hp_return': { state: '23.0', attributes: { unit_of_measurement: '°C' } } }), 'Delta'),
  '5.0 °C');

// What the pump feeds: a tank and radiators by default, and either of them
// can go. An installation without domestic hot water has no tank to draw, and
// aerothermal installs mostly heat a floor rather than radiators.
const hpDraw = (extra) => hpOf('heat', { hvac_action: 'heating' }, extra, HP_READINGS);
const hpPlain = hpDraw({});
check('pac : le ballon est dessine par defaut', /class="hp-tank"/.test(hpPlain), true);
check('pac : et des radiateurs', /class="hp-rad"/.test(hpPlain), true);
const hpNoTank = hpDraw({ no_hot_water: true });
check('pac sans eau chaude : plus de ballon', /class="hp-tank"/.test(hpNoTank), false);
check('pac sans eau chaude : ni ses tuyaux', /class="hp-pipe tank/.test(hpNoTank), false);
check('pac : avec le ballon, ses deux tuyaux', (hpPlain.match(/class="hp-pipe tank (flow|ret)"/g) || []).length, 2);
check('pac sans eau chaude : la classe est posee', hasCls(hpNoTank, 'no-tank'), true);
contains('pac sans eau chaude : ce qui reste se recentre', hpNoTank, '.machine.no-tank .hp-rad { left: 31px;');
const hpFloor = hpDraw({ underfloor_heating: true });
check('pac plancher : le plancher remplace les radiateurs', /class="hp-floor"/.test(hpFloor), true);
check('pac plancher : et il n\'y a plus de radiateurs', /class="hp-rad"/.test(hpFloor), false);
check('pac plancher : la classe est posee', hasCls(hpFloor, 'underfloor'), true);
// The slab, as the underfloor symbol draws it (mdi:heating-coil): a pipe
// snaking across it, four runs and three bends, one bend a box whose long
// borders are two runs.
check('pac plancher : un serpentin dans la dalle',
  /<div class="hp-slab"><div class="hp-coil"><b><\/b><b><\/b><b><\/b><\/div><\/div>/.test(hpFloor), true);
check('pac plancher : plus de panneaux', /\.hp-slab b::before/.test(hpFloor), false);
contains('pac plancher : premier coude', hpFloor, '.hp-coil b:nth-child(1) { top: 2px; }');
contains('pac plancher : le deuxieme tourne de l\'autre cote', hpFloor,
  '.hp-coil b:nth-child(2) { top: 9px; border-left: 3px solid #6b737c; border-right: 0; border-radius: 5px 0 0 5px; }');
contains('pac plancher : troisieme coude', hpFloor, '.hp-coil b:nth-child(3) { top: 16px; }');
// Each box shares its last run with the next one's first: a box of 10 with a
// border of 3 hands over 7 lower, which is where the next one starts.
check('pac plancher : les passages se touchent', cssPx(hpFloor, '.hp-coil b', 'height') - 3, 7);
// The coil is drawn flat and laid down: a square of 30 turned by 45 degrees
// spans 42 across, which is the slab, and squashed to its 15 in height.
{
  const side = cssPx(hpFloor, '.hp-coil', 'width');
  const squash = Number((/transform: scaleY\(([\d.]+)\) rotate\(45deg\);/.exec(hpFloor) || [])[1]);
  const slabW = 96 - cssPx(hpFloor, '.hp-floor', 'left') - cssPx(hpFloor, '.hp-floor', 'right') - 2 * cssPx(hpFloor, '.hp-slab', 'left');
  check('pac plancher : le serpentin couvre la dalle en largeur', Math.round(side * Math.SQRT2), slabW);
  check('pac plancher : et en hauteur', Math.round(side * Math.SQRT2 * squash), cssPx(hpFloor, '.hp-slab', 'height'));
  // Both pipes reach the slab's near edge, which rises from its left corner
  // to its top one: the flow at the corner, the return a little higher.
  const left = cssPx(hpFloor, '.hp-floor', 'left') + cssPx(hpFloor, '.hp-slab', 'left');
  const corner = cssPx(hpFloor, '.hp-floor', 'top') + cssPx(hpFloor, '.hp-floor', 'height')
    - cssPx(hpFloor, '.hp-slab', 'bottom') - cssPx(hpFloor, '.hp-slab', 'height') / 2;
  const edgeAt = x => corner - (x - left) / (slabW / 2) * (cssPx(hpFloor, '.hp-slab', 'height') / 2);
  const top = cssPx(hpFloor, '.hp-pipe', 'top');
  const w = cssPx(hpFloor, '.hp-pipe', 'width');
  for (const [name, sel] of [['aller', '.machine.underfloor .hp-pipe.rad.flow'], ['retour', '.machine.underfloor .hp-pipe.rad.ret']]) {
    const x = cssPx(hpFloor, sel, 'left');
    check(`pac plancher : le tuyau ${name} arrive sur la dalle`,
      Math.abs(top + cssPx(hpFloor, sel, 'height') - edgeAt(x + w / 2)) <= 1, true);
  }
}
contains('pac plancher : la dalle chauffe', hpFloor, '.machine.mode-space_heating .hp-coil b { border-color: #ff7043; }');
contains('pac plancher : et la chaleur monte',
  hpFloor, '.machine.mode-space_heating .hp-floor i { animation: hp-rise');
check('pac plancher : trois volutes', (hpFloor.match(/<div class="hp-floor"><i><\/i><i><\/i><i><\/i>/g) || []).length, 1);
check('pac : en froid la chaleur ne monte pas',
  /mode-cooling .hp-floor i \{ animation/.test(hpOf('heat', { hvac_action: 'cooling' }, { underfloor_heating: true }, HP_READINGS)), false);
contains('pac plancher : et refroidit en froid',
  hpOf('heat', { hvac_action: 'cooling' }, { underfloor_heating: true }, HP_READINGS),
  '.machine.mode-cooling .hp-coil b { border-color: #29b6f6; }');
const hpBoth = hpDraw({ no_hot_water: true, underfloor_heating: true });
check('pac : les deux options tiennent ensemble',
  /class="hp-floor"/.test(hpBoth) && !/class="hp-tank"/.test(hpBoth), true);
contains('pac : et la dalle se recentre aussi', hpBoth, '.machine.no-tank .hp-floor { left: 31px;');

// A compressor at rest is a pump pushing water around, and its fan has no
// reason to turn even though the pump reports heating.
check('pac : compresseur en marche, le ventilateur tourne', hasCls(hpHy, 'fan'), true);
const hpIdleComp = hpHydro({}, { 'sensor.hp_hz': { state: '0', attributes: { unit_of_measurement: 'Hz' } } });
check('pac : compresseur a zero, le ventilateur s\'arrete', hasCls(hpIdleComp, 'fan'), false);
check('pac : compresseur a zero, la ligne reste', infoLine(hpIdleComp, 'Compressor'), '0 Hz');
check('pac : un contact ferme se lit en mots',
  infoLine(hpHydro({ compressor_entity: 'binary_sensor.hp_comp' },
    { 'binary_sensor.hp_comp': { state: 'on', attributes: {} } }), 'Compressor'), 'Running');
const hpCompOff = hpHydro({ compressor_entity: 'binary_sensor.hp_comp' },
  { 'binary_sensor.hp_comp': { state: 'off', attributes: {} } });
check('pac : un contact ouvert aussi', infoLine(hpCompOff, 'Compressor'), 'Off');
check('pac : et il arrete le ventilateur', hasCls(hpCompOff, 'fan'), false);
const hpCompNone = hpHydro({}, { 'sensor.hp_hz': { state: 'unavailable', attributes: {} } });
check('pac : un compresseur muet ne fait pas de ligne', infoLine(hpCompNone, 'Compressor'), null);
check('pac : et ne prive pas le ventilateur', hasCls(hpCompNone, 'fan'), true);

// == The valves, the compressor and the circuits (issue #17, second round) ===
// HeishaMon, behind most Panasonic Aquarea installs, reads its 2-way valve
// Heating or Cooling and its 3-way valve Room or Tank. A valve is a position:
// the compressor says whether the pump works. And each circuit is measured
// apart, so the readings follow the circuit the valves point to.
const HMW = n => ({ state: String(n), attributes: { unit_of_measurement: 'W' } });
const HM = (v2, v3, hz, extra = {}, more = {}) => render({ appliance_type: 'heat_pump', state_entity: 'sensor.hm_state',
  heating_entity: 'sensor.hm_2way', hot_water_entity: 'sensor.hm_3way', compressor_entity: 'sensor.hm_hz', ...extra },
  { 'sensor.hm_state': { state: 'idle', attributes: {} },
    'sensor.hm_2way': { state: v2, attributes: {} }, 'sensor.hm_3way': { state: v3, attributes: {} },
    'sensor.hm_hz': { state: String(hz), attributes: { unit_of_measurement: 'Hz' } }, ...more });

// The reported case: the 2-way valve in the heating field, in summer.
const hmCool = HM('Cooling', 'Room', 17);
check('vannes : Cooling dans le champ chauffage, la pompe refroidit', stateLine(hmCool), 'Cooling');
check('vannes : et dessine le froid', hasCls(hmCool, 'mode-cooling'), true);
check('vannes : le ventilateur tourne', hasCls(hmCool, 'fan'), true);
check('vannes : Heating chauffe', stateLine(HM('Heating', 'Room', 41)), 'Heating');
// The 3-way valve takes all the water for the tank: hot water comes first.
check('vannes : Tank passe devant le froid', stateLine(HM('Cooling', 'Tank', 55)), 'Hot water');
check('vannes : et devant le chauffage', stateLine(HM('Heating', 'Tank', 55)), 'Hot water');
// Cooling and heating share the 2-way valve and exclude each other; two
// contacts both on are settled the same way, cooling first.
check('vannes : le froid passe devant le chauffage', stateLine(render({ appliance_type: 'heat_pump',
  state_entity: 'sensor.hm_state', heating_entity: 'binary_sensor.hm_heat', cooling_entity: 'binary_sensor.hm_cool' },
  { 'sensor.hm_state': { state: 'idle', attributes: {} }, 'binary_sensor.hm_heat': { state: 'on', attributes: {} },
    'binary_sensor.hm_cool': { state: 'on', attributes: {} } })), 'Cooling');
// A cooling indicator of its own, a contact or the same valve.
const coolContact = (s, hz = 30) => render({ appliance_type: 'heat_pump', state_entity: 'sensor.hm_state',
  cooling_entity: 'binary_sensor.hm_cool', compressor_entity: 'sensor.hm_hz' },
  { 'sensor.hm_state': { state: 'idle', attributes: {} }, 'binary_sensor.hm_cool': { state: s, attributes: {} },
    'sensor.hm_hz': { state: String(hz), attributes: { unit_of_measurement: 'Hz' } } });
check('vannes : un contact de froid allume', stateLine(coolContact('on')), 'Cooling');
check('vannes : eteint, rien', stateLine(coolContact('off')), 'Running');
// A valve says where the water goes whatever field it sits in.
check('vannes : la vanne dans le champ froid dit Heating', stateLine(HM('Heating', 'Room', 41,
  { heating_entity: undefined, cooling_entity: 'sensor.hm_2way' })), 'Heating');
// A tank "heating" is a tank taking heat, as it always read.
check('vannes : un ballon qui chauffe reste l\'eau chaude', stateLine(HM('Cooling', 'heating', 50)), 'Hot water');

// The compressor judges. At rest, the pump is on standby whichever way the
// valves point; at work, it works, whatever the state said.
const hmNight = HM('Cooling', 'Room', 0);
check('compresseur : a zero, en veille malgre la vanne', stateLine(hmNight), 'Standby');
check('compresseur : a zero, rien de dessine en froid', hasCls(hmNight, 'mode-idle'), true);
check('compresseur : a zero, pas d\'eau qui coule', hasCls(hmNight, 'flowing'), false);
check('compresseur : un contact de froid aussi', stateLine(coolContact('on', 0)), 'Standby');
check('compresseur : en marche sur un etat au repos', stateLine(render({ appliance_type: 'heat_pump',
  state_entity: 'sensor.hm_state', compressor_entity: 'sensor.hm_hz' },
  { 'sensor.hm_state': { state: 'idle', attributes: {} }, 'sensor.hm_hz': { state: '30', attributes: { unit_of_measurement: 'Hz' } } })), 'Running');
// What the state entity itself reports is not second-guessed: a climate that
// says heating keeps its word, the fan alone stopping.
check('compresseur : l\'action du climat garde son mot', stateLine(hpIdleComp), 'Heating');

// The readings of the circuit in use.
const HMF = { power_entity: 'sensor.hm_heat_in', heat_output_entity: 'sensor.hm_heat_out',
  cooling_power_entity: 'sensor.hm_cool_in', cooling_output_entity: 'sensor.hm_cool_out',
  hot_water_power_entity: 'sensor.hm_dhw_in', hot_water_output_entity: 'sensor.hm_dhw_out' };
const HMR = (heat, cool, dhw) => ({ 'sensor.hm_heat_in': HMW(heat[0]), 'sensor.hm_heat_out': HMW(heat[1]),
  'sensor.hm_cool_in': HMW(cool[0]), 'sensor.hm_cool_out': HMW(cool[1]),
  'sensor.hm_dhw_in': HMW(dhw[0]), 'sensor.hm_dhw_out': HMW(dhw[1]) });
const rCool = HM('Cooling', 'Room', 17, HMF, HMR([0, 0], [520, 2900], [0, 0]));
check('circuits : en froid, la puissance du froid', infoLine(rCool, 'Power'), '520 W');
check('circuits : le froid produit', infoLine(rCool, 'Cooling output'), '2900 W');
check('circuits : sous un flocon', /<ha-icon icon="mdi:snowflake"><\/ha-icon><span class="label">Cooling output/.test(rCool), true);
check('circuits : pas de chaleur produite en froid', infoLine(rCool, 'Heat output'), null);
check('circuits : le rapport s\'appelle EER en froid', infoLine(rCool, 'EER'), '5.6');
check('circuits : et pas COP', infoLine(rCool, 'COP'), null);
const rHeat = HM('Heating', 'Room', 41, HMF, HMR([900, 3600], [0, 0], [0, 0]));
check('circuits : en chauffage, sa puissance', infoLine(rHeat, 'Power'), '900 W');
check('circuits : sa chaleur', infoLine(rHeat, 'Heat output'), '3600 W');
check('circuits : son COP', infoLine(rHeat, 'COP'), '4.0');
const rTank = HM('Cooling', 'Tank', 55, HMF, HMR([0, 0], [0, 0], [1400, 4200]));
check('circuits : pour le ballon, sa puissance', infoLine(rTank, 'Power'), '1400 W');
check('circuits : sa chaleur', infoLine(rTank, 'Heat output'), '4200 W');
check('circuits : son COP', infoLine(rTank, 'COP'), '3.0');
// On a summer night the lines are still the cooling ones, at zero.
const rNight = HM('Cooling', 'Room', 0, HMF, HMR([0, 0], [0, 0], [0, 0]));
check('circuits : la nuit en ete, le froid a zero', infoLine(rNight, 'Cooling output'), '0 W');
// Without cooling fields, the card falls back to the ones it has, and still
// calls what comes out cold.
const rBare = HM('Cooling', 'Room', 17, { power_entity: 'sensor.hm_heat_in', heat_output_entity: 'sensor.hm_heat_out' },
  HMR([610, 2400], [0, 0], [0, 0]));
check('circuits : sans champ de froid, la puissance du chauffage', infoLine(rBare, 'Power'), '610 W');
check('circuits : nommee froid produit', infoLine(rBare, 'Cooling output'), '2400 W');
// A COP entity is the owner's own, and keeps its name.
check('circuits : une entite COP reste COP en froid', infoLine(HM('Cooling', 'Room', 17,
  { ...HMF, cop_entity: 'sensor.hp_cop' }, { ...HMR([0, 0], [520, 2900], [0, 0]), ...HP_READINGS }), 'COP'), '3.2');
check('circuits : en francais', infoLine(HM('Cooling', 'Room', 17, { ...HMF, language: 'fr' },
  HMR([0, 0], [520, 2900], [0, 0])), 'Froid produit'), '2900 W');

// The water: down the flow pipe and back up the return, on the circuit the
// pump works, out hot and back cooler while it heats, the other way round
// while it cools.
check('eau : deux tuyaux vers l\'emetteur', (hmCool.match(/class="hp-pipe rad (flow|ret)"/g) || []).length, 2);
check('eau : elle coule en froid', hasCls(hmCool, 'flowing'), true);
check('eau : en chauffage', hasCls(HM('Heating', 'Room', 41), 'flowing'), true);
check('eau : vers le ballon', hasCls(HM('Cooling', 'Tank', 55), 'flowing'), true);
check('eau : pas quand on ne sait pas ou', hasCls(render({ appliance_type: 'heat_pump', state_entity: 'sensor.hm_state',
  compressor_entity: 'sensor.hm_hz' }, { 'sensor.hm_state': { state: 'idle', attributes: {} },
  'sensor.hm_hz': { state: '30', attributes: { unit_of_measurement: 'Hz' } } }), 'flowing'), false);
check('eau : pas pendant le degivrage', hasCls(hpOf('heat', { hvac_action: 'defrosting' }), 'flowing'), false);
check('eau : pas quand le compresseur se repose', hasCls(hpIdleComp, 'flowing'), false);
contains('eau : elle court dans les tuyaux', hmCool, 'animation: hp-flow 0.8s linear infinite;');
contains('eau : sur le circuit en froid', hmCool, '.machine.flowing.mode-cooling .hp-pipe.rad::after');
contains('eau : et remonte par le retour', hmCool, '.machine.flowing .hp-pipe.ret::after { animation-direction: reverse; }');
contains('eau : part froide', hmCool, '.machine.mode-cooling .hp-pipe.rad.flow { background: #29b6f6; }');
contains('eau : revient plus chaude', hmCool, '.machine.mode-cooling .hp-pipe.rad.ret { background: #ff8a65; }');
contains('eau : part chaude en chauffage', hmCool, '.machine.mode-space_heating .hp-pipe.rad.flow { background: #ff7043; }');
contains('eau : et revient plus froide', hmCool, '.machine.mode-space_heating .hp-pipe.rad.ret,');
contains('eau : rouge vers le ballon', hmCool, '.machine.mode-hot_water .hp-pipe.tank.flow { background: #ef5350; }');
contains('eau : et elle y coule', hmCool, '.machine.flowing.mode-hot_water .hp-pipe.tank::after,');

{
  // HeishaMon's own names. The flow rate mode and the pump duty come before
  // the flow itself on purpose: neither is a flow.
  const ids = ['sensor.aquarea_main_state', 'sensor.aquarea_3_way_valve', 'sensor.aquarea_2_way_valve',
    'sensor.aquarea_pump_flowrate_mode', 'sensor.aquarea_pump_duty', 'sensor.aquarea_pump_flow',
    'sensor.aquarea_heat_power_produced', 'sensor.aquarea_heat_power_consumed',
    'sensor.aquarea_thermal_cooling_power_production', 'sensor.aquarea_thermal_cooling_power_consumption',
    'sensor.aquarea_dhw_power_produced', 'sensor.aquarea_dhw_power_consumed'];
  const ed = new Editor();
  ed.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'heat_pump', state_entity: 'sensor.aquarea_main_state' });
  ed.hass = { ...HASS(Object.fromEntries(ids.map(id => [id, { state: '1', attributes: {} }]))),
    entities: Object.fromEntries(ids.map(id => [id, { device_id: 'hm' }])) };
  const sug = ed.events.at(-1)?.detail?.config || {};
  check('suggestion heishamon : la vanne 3 voies pour l\'eau chaude', sug.hot_water_entity, 'sensor.aquarea_3_way_valve');
  check('suggestion heishamon : la vanne 2 voies pour le chauffage', sug.heating_entity, 'sensor.aquarea_2_way_valve');
  check('suggestion heishamon : et pour le froid', sug.cooling_entity, 'sensor.aquarea_2_way_valve');
  check('suggestion heishamon : le debit, pas son mode ni la pompe', sug.water_flow_entity, 'sensor.aquarea_pump_flow');
  check('suggestion heishamon : la chaleur produite', sug.heat_output_entity, 'sensor.aquarea_heat_power_produced');
  check('suggestion heishamon : la puissance du chauffage', sug.power_entity, 'sensor.aquarea_heat_power_consumed');
  check('suggestion heishamon : le froid produit', sug.cooling_output_entity, 'sensor.aquarea_thermal_cooling_power_production');
  check('suggestion heishamon : la puissance du froid', sug.cooling_power_entity, 'sensor.aquarea_thermal_cooling_power_consumption');
  check('suggestion heishamon : la chaleur du ballon', sug.hot_water_output_entity, 'sensor.aquarea_dhw_power_produced');
  check('suggestion heishamon : la puissance du ballon', sug.hot_water_power_entity, 'sensor.aquarea_dhw_power_consumed');
}

// The cooling line in fourteen languages: a label of its own in each, never
// the English one a missing entry would fall back to.
for (const language of ['fr', 'ru', 'de', 'es', 'it', 'nl', 'pt', 'sv', 'no', 'da', 'pl', 'zh', 'cs']) {
  const h = HM('Cooling', 'Room', 17, { ...HMF, language }, HMR([0, 0], [520, 2900], [0, 0]));
  const labels = [...h.matchAll(/<span class="label">([^<]*)<\/span>/g)].map(m => m[1]);
  check(`circuits : froid produit en ${language}`,
    labels.some(l => l === 'Cooling output' || l.startsWith('section_')), false);
}

check('pac : aucune barre de progression', /class="bar-fill"/.test(hpH), false);
contains('pac : la cuve se remplit d\'eau chaude', hpInd('on', 'off'),
  '.machine.mode-hot_water .hp-tank i { height: 100%;');
contains('pac : les radiateurs chauffent', hpH, '.machine.mode-space_heating .hp-rad i { background: linear-gradient(180deg, #ffab91, #ff7043);');

for (const [label, h, names] of [
  ['pac en chauffage', hpOf('heat', { hvac_action: 'heating' }), ['hp-spin', 'hp-glow']],
  ['pac en eau chaude', hpInd('on', 'off'), ['hp-spin', 'hp-glow']],
  ['pac en degivrage', hpOf('heat', { hvac_action: 'defrosting' }), ['hp-frost']],
]) {
  const used = [...h.matchAll(/animation:\s*([a-z0-9-]+)/g)].map(m => m[1]);
  const defined = new Set([...h.matchAll(/@keyframes\s+([a-z0-9-]+)/g)].map(m => m[1]));
  check(`${label} : chaque animation a ses keyframes`, [...new Set(used)].filter(n => !defined.has(n)).join(','), '');
  for (const n of names) check(`${label} : declare ${n}`, used.includes(n), true);
}

// ── Detection by name ────────────────────────────────────────────────────────
const drawn = h => /class="hp-unit"/.test(h) ? 'heat_pump' : /class="wh-tank"/.test(h) ? 'water_heater' : /class="bl-box"/.test(h) ? 'boiler'
  : /class="kt-body"/.test(h) ? 'kettle' : 'other';
for (const [id, want, icon] of [
  ['switch.chauffe_eau', 'water_heater'], ['switch.cumulus', 'water_heater'], ['water_heater.dhw', 'water_heater'],
  ['switch.salle_de_bain', 'water_heater', 'mdi:water-boiler'],
  ['sensor.chaudiere_etat', 'boiler'], ['sensor.boiler_status', 'boiler'],
  ['switch.kettle', 'kettle'], ['sensor.dryer_state', 'other'], ['sensor.washer_state', 'other'],
  ['climate.octopus_energy_heat_pump_00a1_zone_1', 'heat_pump'], ['water_heater.octopus_energy_heat_pump_00a1', 'heat_pump'],
  ['sensor.pompe_a_chaleur_etat', 'heat_pump'], ['sensor.waermepumpe_status', 'heat_pump'],
  ['sensor.warmtepomp_status', 'heat_pump'], ['water_heater.ecodan', 'heat_pump'],
  ['switch.buanderie', 'heat_pump', 'mdi:heat-pump'],
]) {
  check(`detection : ${icon || id}`, drawn(render({ state_entity: id },
    { [id]: { state: 'off', attributes: icon ? { icon } : {} } })), want);
}

// The editor offers the heat pump, its readings, and the entities it is
// usually exposed as.
{
  const hpEd = newEditor({ state_entity: 'sensor.oven_appliance_state', appliance_type: 'heat_pump' });
  const hpHtml = markup(hpEd._root);
  const hpToggles = [...hpHtml.matchAll(/data-toggle="([^"]+)"/g)].map(m => m[1]);
  contains('editeur : la pompe a chaleur est au choix', hpHtml, 'value="heat_pump"');
  for (const f of ['temperature_entity', 'outdoor_temperature_entity', 'heat_output_entity', 'cop_entity',
    'hot_water_entity', 'heating_entity', 'power_entity']) {
    check(`editeur pac : propose ${f}`, hpToggles.filter(x => x === f).length, 1);
  }
  check('editeur pac : pas de programme', hpToggles.includes('program_entity'), false);
  const hpPrec = markup(newEditor({ state_entity: 'sensor.oven_appliance_state', appliance_type: 'heat_pump', temperature_entity: 'sensor.t' })._root);
  check('editeur pac : la precision sous la temperature de depart', /data-field="temperature_decimals"/.test(hpPrec), true);
  const domainsOf = type => newEditor({ state_entity: 'sensor.oven_appliance_state', appliance_type: type })
    ._root.querySelector('[data-slot="state_entity"]')?.children.at(-1)?.includeDomains || [];
  check('editeur pac : l\'etat accepte une entite climate', domainsOf('heat_pump').includes('climate'), true);
  check('editeur pac : et un water_heater', domainsOf('heat_pump').includes('water_heater'), true);
  check('editeur : le chauffe-eau accepte un water_heater', domainsOf('water_heater').includes('water_heater'), true);
  check('editeur : la chaudiere accepte un water_heater', domainsOf('boiler').includes('water_heater'), true);
  check('editeur : un lave-linge ne propose pas climate', domainsOf('washer').includes('climate'), false);
  check('editeur : les capteurs restent proposes', domainsOf('heat_pump').includes('sensor'), true);
}

// Auto-suggestion on the pump's own device: the live readings, never the
// lifetime ones, and no target flow temperature passed off as the measured one.
{
  const dev = { device_id: 'hp1' };
  // The lifetime readings come first, so a pattern that let them through would pick them.
  const ids = ['climate.hp_zone_1', 'sensor.hp_lifetime_power_input', 'sensor.hp_lifetime_heat_output',
    'sensor.hp_lifetime_scop', 'sensor.hp_fixed_target_flow_temperature', 'sensor.hp_live_power_input',
    'sensor.hp_live_heat_output', 'sensor.hp_live_cop', 'sensor.hp_live_outdoor_temperature'];
  const states = Object.fromEntries(ids.map(id => [id, { state: '1', attributes: {} }]));
  const ed = new Editor();
  ed.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'heat_pump', state_entity: 'climate.hp_zone_1' });
  ed.hass = { ...HASS(states), entities: Object.fromEntries(ids.map(id => [id, dev])) };
  const sug = ed.events.at(-1)?.detail?.config || {};
  check('suggestion pac : puissance instantanee', sug.power_entity, 'sensor.hp_live_power_input');
  check('suggestion pac : chaleur instantanee', sug.heat_output_entity, 'sensor.hp_live_heat_output');
  check('suggestion pac : COP instantane', sug.cop_entity, 'sensor.hp_live_cop');
  check('suggestion pac : temperature exterieure', sug.outdoor_temperature_entity, 'sensor.hp_live_outdoor_temperature');
  check('suggestion pac : pas de consigne prise pour la mesure', sug.temperature_entity, undefined);
}
{
  // HeishaMon's naming, the Panasonic bridge behind most aerothermal installs:
  // the unit's outlet is the water going out, its inlet the water coming back.
  // The hours come first on purpose, since they carry the compressor's name.
  const ids = ['climate.aquarea', 'sensor.aquarea_compressor_hours', 'sensor.aquarea_main_target_temp',
    'sensor.aquarea_main_outlet_temp', 'sensor.aquarea_main_inlet_temp',
    // Named like a flow rate, but it is a temperature.
    'sensor.aquarea_water_flow_temperature', 'sensor.aquarea_pump_flow',
    'sensor.aquarea_compressor_freq', 'sensor.aquarea_fan1_motor_speed'];
  const ed = new Editor();
  ed.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'heat_pump', state_entity: 'climate.aquarea' });
  ed.hass = { ...HASS(Object.fromEntries(ids.map(id => [id, { state: '1', attributes: {} }]))),
    entities: Object.fromEntries(ids.map(id => [id, { device_id: 'aq' }])) };
  const sug = ed.events.at(-1)?.detail?.config || {};
  check('suggestion pac : la sortie est le depart', sug.temperature_entity, 'sensor.aquarea_main_outlet_temp');
  check('suggestion pac : l\'entree est le retour', sug.return_temperature_entity, 'sensor.aquarea_main_inlet_temp');
  check('suggestion pac : le debit de la pompe, pas une temperature', sug.water_flow_entity, 'sensor.aquarea_pump_flow');
  check('suggestion pac : la frequence, pas les heures de compresseur', sug.compressor_entity, 'sensor.aquarea_compressor_freq');
  check('suggestion pac : la vitesse du ventilateur', sug.fan_speed_entity, 'sensor.aquarea_fan1_motor_speed');
}
{
  // Its only temperature is the outdoor one: it goes to its field, not twice.
  const ids = ['climate.hp_zone_1', 'sensor.hp_live_outdoor_temperature'];
  const ed = new Editor();
  ed.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'heat_pump', state_entity: 'climate.hp_zone_1' });
  ed.hass = { ...HASS(Object.fromEntries(ids.map(id => [id, { state: '1', attributes: {} }]))),
    entities: Object.fromEntries(ids.map(id => [id, { device_id: 'hp1' }])) };
  const sug = ed.events.at(-1)?.detail?.config || {};
  check('suggestion pac : la temperature exterieure dans son champ', sug.outdoor_temperature_entity, 'sensor.hp_live_outdoor_temperature');
  check('suggestion pac : et pas une seconde fois en ligne d\'info', sug.info_entities, undefined);
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
for (const f of ['no_hot_water', 'underfloor_heating']) {
  check(`editeur pac : la case ${f}`, new RegExp(`data-field="${f}"`).test(edHtml('heat_pump')), true);
  check(`editeur : ${f} n'est pas sur une chaudiere`, new RegExp(`data-field="${f}"`).test(edHtml('boiler')), false);
}
for (const f of ['return_temperature_entity', 'water_flow_entity', 'compressor_entity', 'fan_speed_entity']) {
  check(`editeur pac : ${f} est propose`, toggles('heat_pump').includes(f), true);
  check(`editeur : ${f} n'est pas sur une chaudiere`, toggles('boiler').includes(f), false);
}
// The indicators and readings of issue #17's second round, on the heat pump
// only.
for (const f of ['cooling_entity', 'cooling_power_entity', 'cooling_output_entity', 'hot_water_power_entity', 'hot_water_output_entity']) {
  check(`editeur pac : ${f}`, toggles('heat_pump').includes(f), true);
  check(`editeur chaudiere : pas de ${f}`, toggles('boiler').includes(f), false);
}

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

// =============================================================================
// 3D printer
// =============================================================================
// Every raw value below is one an integration actually sends, read in its
// code: OctoPrint and PrusaLink (core), Bambu Lab, Moonraker, Creality,
// Elegoo, Flashforge, Anycubic, RepRapFirmware. The entities are made up.
const P3 = { appliance_type: 'printer_3d', state_entity: 'sensor.p3_status' };
const p3 = (state, extra = {}, more = {}) => render({ ...P3, ...extra },
  { 'sensor.p3_status': { state, attributes: {} }, ...more });
const TEMP = v => ({ state: String(v), attributes: { unit_of_measurement: '°C', device_class: 'temperature' } });
const PCT = v => ({ state: String(v), attributes: { unit_of_measurement: '%' } });

for (const [raw, want] of [
  ['printing', 'Printing'], ['printing_sd', 'Printing'], ['running', 'Printing'], ['RUNNING', 'Printing'],
  ['Printing', 'Printing'], ['processing', 'Printing'], ['resuming', 'Printing'], ['print_started', 'Printing'],
  ['prepare', 'Preparing'], ['slicing', 'Preparing'], ['busy', 'Preparing'], ['self-testing', 'Preparing'],
  ['file_transferring', 'Preparing'], ['starting', 'Preparing'],
  ['preheating', 'Preheating'], ['heating', 'Preheating'],
  ['pause', 'Paused'], ['paused', 'Paused'], ['pausing', 'Paused'],
  ['attention', 'Needs attention'],
  ['finish', 'Finished'], ['complete', 'Finished'], ['completed', 'Finished'], ['finished', 'Finished'],
  ['cancelled', 'Cancelled'], ['stopped', 'Cancelled'], ['cancelling', 'Cancelled'],
  ['failed', 'Failed'], ['error', 'Error'], ['offline_after_error', 'Error'],
  ['operational', 'Idle'], ['standby', 'Idle'], ['ready', 'Idle'], ['idle', 'Idle'], ['available', 'Idle'],
  ['offline', 'Offline'], ['shutdown', 'Offline'],
  ['leveling', 'Bed levelling'], ['levelling', 'Bed levelling'], ['homing', 'Homing'],
  ['loading_unloading', 'Changing filament'], ['input_shaping', 'Calibrating'], ['pid_tuning', 'Calibrating'],
]) {
  check(`imprimante : etat ${raw}`, stateLine(p3(raw)), want);
}
check('imprimante : un etat inconnu reste affiche', stateLine(p3('Zwischenschritt')), 'Zwischenschritt');
check('imprimante : state_map passe avant le vocabulaire', stateLine(p3('Druckt', { state_map: { Druckt: 'running' } })), 'Printing');
check('imprimante : state_map vers un etat sans equivalent', stateLine(p3('Wartet', { state_map: { Wartet: 'delayed' } })), 'Delayed start');
check('imprimante : state_show_raw garde le mot brut', stateLine(p3('prepare', { state_show_raw: true })), 'prepare');

// Colours: the heaters' warm tone, the fridge's cold blue, and the card's own
// colours for the rest.
check('imprimante : prechauffage en orange chaud', stateColor(p3('preheating')), '#ff7043');
check('imprimante : impression en bleu', stateColor(p3('printing')), 'var(--info-color, #2196f3)');
check('imprimante : echec en rouge', stateColor(p3('failed')), 'var(--error-color, #f44336)');
check('imprimante : annulee en gris', stateColor(p3('cancelled')), 'var(--disabled-text-color, #9e9e9e)');
check('imprimante : intervention en orange', stateColor(p3('attention')), 'var(--warning-color, #ff9800)');
check('imprimante : hors ligne en gris', stateColor(p3('offline')), 'var(--disabled-text-color, #9e9e9e)');

// The stage entity (Bambu Lab current_stage, Elegoo print_status) says what
// the job is busy with.
const staged = (state, stage) => p3(state, { phase_entity: 'sensor.p3_stage' }, { 'sensor.p3_stage': { state: stage, attributes: {} } });
check('etape : changement de filament', stateLine(staged('running', 'changing_filament')), 'Changing filament');
check('etape : plateau en chauffe', stateLine(staged('running', 'heatbed_preheating')), 'Preheating');
check('etape : plateau en chauffe, orange', stateColor(staged('running', 'heatbed_preheating')), '#ff7043');
// A stage that still says preheating with the heaters already there: the
// gauge is full, not past full.
check('etape : chauffe annoncee deja atteinte, jauge pleine', barWidth(p3('running', { phase_entity: 'sensor.p3_stage',
  bed_temperature_entity: 'sensor.p3_bed', bed_target_entity: 'sensor.p3_bt' },
  { 'sensor.p3_stage': { state: 'heatbed_preheating', attributes: {} }, 'sensor.p3_bed': TEMP(105), 'sensor.p3_bt': TEMP(100) })), '100');
check('etape : buse en refroidissement', stateLine(staged('running', 'cooling_nozzle')), 'Cooling');
check('etape : refroidissement en bleu froid', stateColor(staged('running', 'cooling_nozzle')), '#29b6f6');
check('etape : nivellement', stateLine(staged('prepare', 'auto_bed_leveling')), 'Bed levelling');
check('etape : calibration', stateLine(staged('running', 'calibrating_extrusion_flow')), 'Calibrating');
check('etape : mise a l\'origine', stateLine(staged('running', 'homing_toolhead')), 'Homing');
check('etape : une pause nommee reste une pause', stateLine(staged('running', 'paused_filament_runout')), 'Paused');
check('etape : un jalon atteint ne nomme aucune etape', stateLine(staged('printing', 'preheating_completed')), 'Printing');
check('etape : une etape inconnue laisse l\'etat', stateLine(staged('running', 'printing')), 'Printing');
check('etape : ignoree hors d\'un travail', stateLine(staged('idle', 'auto_bed_leveling')), 'Idle');
check('etape : ignoree une fois termine', stateLine(staged('finish', 'cooling_nozzle')), 'Finished');
check('etape : une pause nommee ne met pas en pause une imprimante a l\'arret', stateLine(staged('idle', 'paused_user')), 'Idle');
check('etape : en pause, la pause l\'emporte sur l\'etape', stateLine(staged('pause', 'cooling_nozzle')), 'Paused');

// Most integrations report "printing" from the start code on: a heater still
// well below its target at the start of a job is preheating.
const heating = (state, n, nt, b, bt, extra = {}, more = {}) => p3(state, {
  nozzle_temperature_entity: 'sensor.p3_nozzle', nozzle_target_entity: 'number.p3_nozzle_target',
  bed_temperature_entity: 'sensor.p3_bed', bed_target_entity: 'number.p3_bed_target', ...extra,
}, { 'sensor.p3_nozzle': TEMP(n), 'number.p3_nozzle_target': TEMP(nt),
     'sensor.p3_bed': TEMP(b), 'number.p3_bed_target': TEMP(bt), ...more });
check('chauffe deduite : buse froide au depart', stateLine(heating('printing', 120, 240, 100, 100)), 'Preheating');
check('chauffe deduite : plateau froid au depart', stateLine(heating('printing', 240, 240, 40, 100)), 'Preheating');
check('chauffe deduite : la jauge suit le plus en retard', barWidth(heating('printing', 120, 240, 40, 100)), '40');
check('chauffe deduite : la jauge en couleur chaude', barStyle(heating('printing', 120, 240, 40, 100)).includes('#ff7043'), true);
check('chauffe deduite : a cinq degres pres, c\'est arrive', stateLine(heating('printing', 236, 240, 96, 100)), 'Printing');
check('chauffe deduite : juste au-dela, ca chauffe encore', stateLine(heating('printing', 234, 240, 100, 100)), 'Preheating');
check('chauffe deduite : pas en cours de piece', stateLine(heating('printing', 120, 240, 100, 100,
  { progress_entity: 'sensor.p3_progress' }, { 'sensor.p3_progress': PCT(30) })), 'Printing');
check('chauffe deduite : a 1 % encore au depart', stateLine(heating('printing', 120, 240, 100, 100,
  { progress_entity: 'sensor.p3_progress' }, { 'sensor.p3_progress': PCT(1) })), 'Preheating');
check('chauffe deduite : une consigne a zero ne compte pas', stateLine(heating('printing', 30, 0, 25, 0)), 'Printing');
check('chauffe deduite : pas hors d\'un travail', stateLine(heating('idle', 120, 240, 40, 100)), 'Idle');
check('chauffe deduite : pas de jauge hors d\'un travail', barWidth(heating('idle', 120, 240, 40, 100)), null);
check('chauffe annoncee : la jauge suit les consignes', barWidth(heating('preheating', 120, 240, 40, 100)), '40');
check('chauffe annoncee : Flashforge dit heating', barWidth(heating('heating', 120, 240, 90, 100)), '50');
check('chauffe deduite : pas en pause', stateLine(heating('paused', 120, 240, 40, 100)), 'Paused');
check('chauffe deduite : une etape nommee l\'emporte', stateLine(heating('running', 120, 240, 40, 100,
  { phase_entity: 'sensor.p3_stage' }, { 'sensor.p3_stage': { state: 'auto_bed_leveling', attributes: {} } })), 'Bed levelling');
check('chauffe deduite : sans consigne, rien a deduire', stateLine(p3('printing',
  { nozzle_temperature_entity: 'sensor.p3_nozzle' }, { 'sensor.p3_nozzle': TEMP(120) })), 'Printing');
check('chauffe annoncee : jauge sans consigne, pas de barre de chauffe', barWidth(p3('preheating')), null);
check('chauffe annoncee : une consigne a zero ne fait pas de jauge', barWidth(p3('preheating',
  { nozzle_temperature_entity: 'sensor.p3_nozzle', nozzle_target_entity: 'sensor.p3_nt' },
  { 'sensor.p3_nozzle': TEMP(30), 'sensor.p3_nt': TEMP(0) })), null);

// Creality keeps the target in an attribute of the reading.
const creality = (attrs) => p3('printing', { nozzle_temperature_entity: 'sensor.p3_nozzle' },
  { 'sensor.p3_nozzle': { state: '150', attributes: { unit_of_measurement: '°C', ...attrs } } });
check('consigne en attribut : lue', infoLine(creality({ target: 220 }), 'Nozzle'), '150\u00a0°C → 220\u00a0°C');
check('consigne en attribut : target_temperature aussi', infoLine(creality({ target_temperature: 220 }), 'Nozzle'), '150\u00a0°C → 220\u00a0°C');
check('consigne en attribut : chauffe deduite', stateLine(creality({ target: 220 })), 'Preheating');
check('consigne en attribut : illisible, ignoree', infoLine(creality({ target: 'n/a' }), 'Nozzle'), '150\u00a0°C');
// Unreadable, it is no target at all: the nozzle is hot because it prints.
contains('consigne en attribut : illisible, la buse suit l\'activite', machineCls(creality({ target: 'n/a' })), 'nozzle-hot');
check('consigne en attribut : l\'entite de consigne passe avant', infoLine(p3('printing',
  { nozzle_temperature_entity: 'sensor.p3_nozzle', nozzle_target_entity: 'number.p3_nozzle_target' },
  { 'sensor.p3_nozzle': { state: '150', attributes: { unit_of_measurement: '°C', target: 180 } },
    'number.p3_nozzle_target': TEMP(220) }), 'Nozzle'), '150\u00a0°C → 220\u00a0°C');

// The lines: layer, heaters, chamber, file.
const job = (extra = {}, more = {}) => p3('printing', {
  nozzle_temperature_entity: 'sensor.p3_nozzle', nozzle_target_entity: 'sensor.p3_nozzle_target',
  bed_temperature_entity: 'sensor.p3_bed', bed_target_entity: 'sensor.p3_bed_target',
  chamber_temperature_entity: 'sensor.p3_chamber', current_layer_entity: 'sensor.p3_layer',
  total_layers_entity: 'sensor.p3_layers', program_entity: 'sensor.p3_file', progress_entity: 'sensor.p3_progress', ...extra,
}, { 'sensor.p3_nozzle': TEMP(219), 'sensor.p3_nozzle_target': TEMP(220), 'sensor.p3_bed': TEMP(60),
     'sensor.p3_bed_target': TEMP(60), 'sensor.p3_chamber': TEMP(34), 'sensor.p3_layer': { state: '84', attributes: {} },
     'sensor.p3_layers': { state: '190', attributes: {} }, 'sensor.p3_file': { state: 'jobs/Benchy_PLA.3mf', attributes: {} },
     'sensor.p3_progress': PCT(45), ...more });
const busy = job();
check('lignes : buse vers sa consigne', infoLine(busy, 'Nozzle'), '219\u00a0°C → 220\u00a0°C');
check('lignes : plateau a sa consigne, sans fleche', infoLine(busy, 'Bed'), '60\u00a0°C');
check('lignes : enceinte', infoLine(busy, 'Chamber'), '34\u00a0°C');
check('lignes : couche sur le total', infoLine(busy, 'Layer'), '84 / 190');
check('lignes : couche seule sans total', infoLine(job({ total_layers_entity: undefined }), 'Layer'), '84');
check('lignes : un total a zero est ignore', infoLine(job({}, { 'sensor.p3_layers': { state: '0', attributes: {} } }), 'Layer'), '84');
check('lignes : fichier sans dossier ni extension', infoLine(busy, 'File'), 'Benchy_PLA');
check('lignes : fichier gcode', infoLine(job({}, { 'sensor.p3_file': { state: 'cube.gcode', attributes: {} } }), 'File'), 'cube');
check('lignes : fichier sans extension connue', infoLine(job({}, { 'sensor.p3_file': { state: 'cube.v2', attributes: {} } }), 'File'), 'cube.v2');
check('lignes : un nom long peut se couper', /class="info-line  wrap"[^>]*><ha-icon icon="mdi:file-outline">/.test(busy), true);
contains('lignes : la coupure est dans le style', busy, '.info-line.wrap span:last-child { min-width: 0; overflow-wrap: anywhere; }');
check('lignes : pas de ligne Programme', infoLine(busy, 'Program'), null);
check('lignes : plateau froid, consigne a zero, sans fleche', infoLine(job({}, { 'sensor.p3_bed': TEMP(24), 'sensor.p3_bed_target': TEMP(0) }), 'Bed'), '24\u00a0°C');
check('lignes : sonde muette, pas de ligne', infoLine(job({}, { 'sensor.p3_chamber': { state: 'unavailable', attributes: {} } }), 'Chamber'), null);
check('lignes : la precision au dixieme s\'applique', infoLine(job({ temperature_decimals: '1' }), 'Nozzle'), '219.0\u00a0°C → 220.0\u00a0°C');
check('ecran : la buse sur l\'afficheur', /<div class="p3-lcd">219°<\/div>/.test(busy), true);

// Only a job has a progress bar: a Bambu Lab keeps 100 once idle.
check('barre : en cours', barWidth(busy), '45');
check('barre : a l\'arret, pas de barre malgre 100 %', barWidth(p3('idle', { progress_entity: 'sensor.p3_progress' }, { 'sensor.p3_progress': PCT(100) })), null);
check('barre : annulee, pas de barre', barWidth(p3('cancelled', { progress_entity: 'sensor.p3_progress' }, { 'sensor.p3_progress': PCT(40) })), null);
check('barre : terminee, pleine', barWidth(p3('finish', { progress_entity: 'sensor.p3_progress' }, { 'sensor.p3_progress': PCT(100) })), '100');
check('barre : en pause, la progression reste', barWidth(p3('paused', { progress_entity: 'sensor.p3_progress' }, { 'sensor.p3_progress': PCT(62) })), '62');
// Moonraker drops its progress to 0 while paused: the print did not.
const moon = build({ ...P3, progress_entity: 'sensor.p3_progress' },
  { 'sensor.p3_status': { state: 'printing', attributes: {} }, 'sensor.p3_progress': PCT(62) });
check('barre : pause Moonraker, la derniere progression reste',
  barWidth(rerender(moon.card, { 'sensor.p3_status': { state: 'paused', attributes: {} }, 'sensor.p3_progress': PCT(0) })), '62');
check('barre : reprise, la vraie progression revient',
  barWidth(rerender(moon.card, { 'sensor.p3_status': { state: 'printing', attributes: {} }, 'sensor.p3_progress': PCT(63) })), '63');
rerender(moon.card, { 'sensor.p3_status': { state: 'idle', attributes: {} }, 'sensor.p3_progress': PCT(0) });
check('barre : une fois a l\'arret, plus de souvenir',
  barWidth(rerender(moon.card, { 'sensor.p3_status': { state: 'paused', attributes: {} }, 'sensor.p3_progress': PCT(0) })), '0');

// A printer keeps its last job's times: they are hidden out of a job.
const rem = (state, extra = {}) => infoLine(p3(state, { remaining_time_entity: 'sensor.p3_left', ...extra },
  { 'sensor.p3_left': { state: '30', attributes: { unit_of_measurement: 'min' } } }), 'Remaining time');
contains('temps restant : affiche en cours', rem('printing') || '', '30 min');
contains('temps restant : affiche en pause', rem('paused') || '', '30 min');
check('temps restant : masque a l\'arret', rem('idle'), null);
check('temps restant : masque une fois termine', rem('finish'), null);
contains('temps restant : affiche a l\'arret si demande', rem('idle', { remaining_time_hide_when_idle: false }) || '', '30 min');
contains('temps restant : les autres types restent comme avant',
  infoLine(render({ appliance_type: 'washer', state_entity: 'sensor.w', remaining_time_entity: 'sensor.r' },
    { 'sensor.w': { state: 'Idle', attributes: {} }, 'sensor.r': { state: '30', attributes: { unit_of_measurement: 'min' } } }), 'Remaining time') || '', '30 min');

// ── The drawing ──
const p3Cls = h => machineCls(h);
const p3H = h => (/style="--p3-h:(\d+)px"/.exec(h) || [, null])[1];
contains('dessin : fermee par defaut', p3Cls(busy), 'p3-enclosed');
contains('dessin : cadre ouvert', p3Cls(job({ printer_layout: 'open' })), 'p3-open');
check('dessin : cadre ouvert, un portique', /class="p3-gantry"/.test(job({ printer_layout: 'open' })), true);
check('dessin : fermee, une vitre', /class="p3-window"/.test(busy), true);
contains('dessin : fermee pour une valeur inconnue', p3Cls(job({ printer_layout: 'cube' })), 'p3-enclosed');
check('dessin : la piece suit la progression', p3H(busy), '18');
check('dessin : terminee, la piece est entiere', p3H(p3('finish', { progress_entity: 'sensor.p3_progress' }, { 'sensor.p3_progress': PCT(0) })), '40');
check('dessin : a l\'arret, plateau vide', p3H(p3('idle', { progress_entity: 'sensor.p3_progress' }, { 'sensor.p3_progress': PCT(100) })), '0');
check('dessin : un echec garde sa piece', p3H(p3('failed', { progress_entity: 'sensor.p3_progress' }, { 'sensor.p3_progress': PCT(35) })), '14');
check('dessin : un echec sans progression, plateau vide', p3H(p3('failed')), '0');
contains('dessin : la piece prend la couleur de l\'etat', busy, 'transparent 1px 3px), var(--info-color, #2196f3);');
contains('dessin : la tete bouge en impression', p3Cls(busy), 'moving');
check('dessin : pas pendant la chauffe', /moving/.test(p3Cls(heating('printing', 120, 240, 40, 100))), false);
check('dessin : pas en pause', /moving/.test(p3Cls(p3('paused'))), false);
contains('dessin : une piece presente', p3Cls(busy), 'has-part');
check('dessin : sans piece, pas de trait qui s\'allume', /has-part/.test(p3Cls(heating('printing', 120, 240, 40, 100))), false);
contains('dessin : buse chaude', p3Cls(busy), 'nozzle-hot');
contains('dessin : plateau chaud', p3Cls(busy), 'bed-hot');
check('dessin : buse froide, consigne a zero', /nozzle-hot/.test(p3Cls(job({}, { 'sensor.p3_nozzle_target': TEMP(0) }))), false);
contains('dessin : sans consigne, chaude en impression', p3Cls(p3('printing')), 'nozzle-hot');
check('dessin : sans consigne, froide a l\'arret', /nozzle-hot|bed-hot/.test(p3Cls(p3('idle'))), false);
contains('dessin : a l\'arret, le plateau descend', p3Cls(p3('idle')), 'parked');
check('dessin : en chauffe, le plateau reste en haut', /parked/.test(p3Cls(heating('printing', 120, 240, 40, 100))), false);
check('dessin : terminee, pas range', /parked/.test(p3Cls(p3('finish'))), false);
contains('dessin : le plateau range est en bas', busy, '.p3-enclosed.parked .p3-bed { top: auto; bottom: 8px; }');
contains('dessin : la tete va et vient', busy, '.machine.moving .p3-head { animation: p3-move 1.6s ease-in-out infinite alternate;');
contains('dessin : la couche se depose', busy, '.machine.moving.has-part .p3-part i { animation: p3-draw');
contains('dessin : le plateau descend avec la piece', busy, 'top: calc(21px + var(--p3-h, 0px))');
contains('dessin : le portique monte avec la piece', busy, 'bottom: calc(22px + var(--p3-h, 0px))');
// The part: a cube by default, a pyramid or a rubber duck on request. The
// whole shape is drawn and only what is printed shows, from the bottom up.
contains('piece : un cube par defaut', p3Cls(busy), 'p3-part-cube');
contains('piece : une pyramide', p3Cls(job({ printed_part: 'pyramid' })), 'p3-part-pyramid');
contains('piece : un canard', p3Cls(job({ printed_part: 'duck' })), 'p3-part-duck');
contains('piece : une forme inconnue reste un cube', p3Cls(job({ printed_part: 'benchy' })), 'p3-part-cube');
check('piece : le canard a un oeil', /<b class="p3-eye"><\/b>/.test(job({ printed_part: 'duck' })), true);
check('piece : le cube n\'en a pas', /p3-eye"/.test(busy), false);
check('piece : la pyramide non plus', /p3-eye"/.test(job({ printed_part: 'pyramid' })), false);
contains('piece : la forme entiere dans la partie imprimee', busy, '<div class="p3-part"><div class="p3-shape"><i></i></div></div>');
contains('piece : on ne voit que ce qui est imprime', busy, 'height: var(--p3-h, 0px);\n          overflow: hidden;');
contains('piece : la forme a sa pleine hauteur', busy, 'position: absolute; left: 0; bottom: 0; width: 100%; height: 40px;');
contains('piece : la couche en cours au sommet de l\'imprime', busy, 'bottom: calc(var(--p3-h, 0px) - 2px); height: 2px;');
contains('piece : pyramide en triangle', busy, '.p3-part-pyramid .p3-shape { border-radius: 0; clip-path: polygon(50% 0, 100% 100%, 0 100%); }');
contains('piece : pyramide plus large', busy, '.p3-part-pyramid .p3-part { width: 32px; margin-left: -16px; }');
check('piece : canard decoupe', /[\s;{]clip-path: path\("M1 20 L10 24 [^"]* Z"\);/.test(busy), true);
contains('piece : canard plus large', busy, '.p3-part-duck .p3-part { width: 34px; margin-left: -17px; }');
check('editeur : la piece proposee pour l\'imprimante', /data-field="printed_part"/.test(edHtml('printer_3d')), true);
check('editeur : la piece absente ailleurs', /data-field="printed_part"/.test(edHtml('oven')), false);
for (const v of ['cube', 'pyramid', 'duck']) contains(`editeur : piece ${v}`, edHtml('printer_3d'), `value="${v}"`);
contains('editeur : le canard a son nom', edHtml('printer_3d'), 'Rubber duck');
// A reading keeps its number and its unit together on a narrow card.
check('lignes : une temperature ne se coupe pas', /219 °C|220 °C/.test(infoLine(busy, 'Nozzle')), false);
const lit = job({ light_entity: 'light.p3_light' }, { 'light.p3_light': { state: 'on', attributes: {} } });
contains('lumiere : l\'enceinte s\'eclaire', p3Cls(lit), 'lit');
check('lumiere : le bouton en tete', /class="light-badge on"/.test(lit), true);
contains('lumiere : la vitre eclairee', lit, '.machine.lit .p3-window {');

// ── Remaining time in any unit ──
const remIn = (state, attributes, extra = {}) => infoLine(render({ appliance_type: 'washer', state_entity: 'sensor.w',
  remaining_time_entity: 'sensor.r', ...extra }, { 'sensor.w': { state: 'Running', attributes: {} },
  'sensor.r': { state, attributes } }), 'Remaining time') || '';
contains('duree : en heures (Bambu Lab)', remIn('1.25', { unit_of_measurement: 'h' }), '1h15');
contains('duree : en heures ecrites', remIn('2', { unit_of_measurement: 'hours' }), '2h00');
contains('duree : en millisecondes', remIn('1800000', { unit_of_measurement: 'ms' }), '30 min');
contains('duree : en jours', remIn('0.5', { unit_of_measurement: 'd' }), '12h00');
contains('duree : en secondes par defaut', remIn('1800', {}), '30 min');
contains('duree : unite forcee en heures', remIn('1.5', {}, { remaining_time_unit: 'hours' }), '1h30');
contains('duree : horloge H:MM:SS (Snapmaker)', remIn('1:02:03', {}), '1h02');
contains('duree : horloge a zero', remIn('00:00:00', {}), 'Done');

// ── History, with the printer's own words ──
// Generic words would read "printing" as a gap and start the job at the pause.
{
  clockAt(0);
  const H3 = (state, m) => ({ s: state, lu: (T0 + m * MIN) / 1000 });
  const c = new Card();
  c.setConfig({ type: 'custom:ha-appliance-card', ...P3, remaining_time_entity: 'sensor.p3_left' });
  c._hass = { ...HASS({ 'sensor.p3_status': { state: 'printing', attributes: {}, last_changed: at(-25) },
    'sensor.p3_left': { state: String(35 * 60), attributes: {} } }),
    callWS: () => Promise.resolve({ 'sensor.p3_status': [H3('standby', -60), H3('printing', -40), H3('paused', -30), H3('printing', -25)] }) };
  c._render();
  await settle();
  check('historique imprimante : le vocabulaire de l\'imprimante', barWidth(markup(c)), '50');
}

// ── Detection ──
const p3drawn = h => /class="p3-/.test(h);
for (const [id, want, icon] of [
  ['sensor.p1s_01p00a123_print_status', true], ['sensor.x1c_00m09c_print_status', true], ['sensor.a1_mini_03919_print_status', true],
  ['sensor.octoprint_current_state', true], ['sensor.voron_current_print_state', true], ['sensor.prusa_mk4', true],
  ['sensor.ender_3_v3_status', true], ['sensor.kobra_2_job_state', true], ['sensor.creality_k1_print_status', true],
  ['sensor.centauri_carbon_current_status', true], ['sensor.flashforge_ad5m_machine_status', true],
  ['sensor.atelier', true, 'mdi:printer-3d'],
  ['sensor.blender_state', false], ['sensor.imprimante_etat', false], ['sensor.hp_printer_status', false],
]) {
  check(`detection imprimante : ${icon || id}`, p3drawn(render({ state_entity: id },
    { [id]: { state: 'idle', attributes: icon ? { icon } : {} } })), want);
}
check('detection imprimante : une buse suffit', p3drawn(render({ state_entity: 'sensor.atelier', nozzle_temperature_entity: 'sensor.n' },
  { 'sensor.atelier': { state: 'idle', attributes: {} }, 'sensor.n': TEMP(25) })), true);
check('detection imprimante : la piece suffit', p3drawn(render({ state_entity: 'sensor.atelier', printed_part: 'duck' },
  { 'sensor.atelier': { state: 'idle', attributes: {} } })), true);
check('detection imprimante : le cadre suffit', p3drawn(render({ state_entity: 'sensor.atelier', printer_layout: 'open' },
  { 'sensor.atelier': { state: 'idle', attributes: {} } })), true);

// ── Editor ──
contains('editeur : l\'imprimante 3D est au choix', edHtml('printer_3d'), 'value="printer_3d"');
check('editeur : le cadre propose pour l\'imprimante', /data-field="printer_layout"/.test(edHtml('printer_3d')), true);
check('editeur : le cadre absent ailleurs', /data-field="printer_layout"/.test(edHtml('washer')), false);
for (const f of ['nozzle_temperature_entity', 'nozzle_target_entity', 'bed_temperature_entity', 'bed_target_entity',
  'chamber_temperature_entity', 'current_layer_entity', 'total_layers_entity', 'program_entity', 'phase_entity',
  'progress_entity', 'remaining_time_entity', 'light_entity', 'pause_entity', 'resume_entity', 'stop_entity']) {
  check(`editeur imprimante : ${f}`, toggles('printer_3d').includes(f), true);
}
{
  const withFile = markup(newEditor({ state_entity: 'sensor.oven_appliance_state', appliance_type: 'printer_3d', program_entity: 'sensor.f' })._root) || '';
  check('editeur imprimante : pas de format de programme', /data-field="program_format"/.test(withFile), false);
  check('editeur imprimante : une seule section fichier', (withFile.match(/data-toggle="program_entity"/g) || []).length, 1);
}
check('editeur : le format de programme reste au lave-linge', /data-field="program_format"/.test(edHtml('washer')), true);
check('editeur : pas de buse sur un four', toggles('oven').includes('nozzle_temperature_entity'), false);
check('editeur : pas d\'etape sur un four', toggles('oven').includes('phase_entity'), false);
{
  const ed = newEditor({ state_entity: 'sensor.oven_appliance_state', appliance_type: 'printer_3d', remaining_time_entity: 'sensor.x' });
  contains('editeur : les heures pour le temps restant', markup(ed._root) || ed._root._html || '', 'value="hours"');
}
contains('editeur : le fichier imprime a son libelle', edHtml('printer_3d'), 'Print file');

// Auto-suggestion on a Bambu Lab device: the readings, their targets, and
// buttons, never OctoPrint's start_time sensor or Moonraker's emergency stop.
{
  const ids = ['sensor.p1s_x_print_status', 'sensor.p1s_x_start_time', 'sensor.p1s_x_end_time', 'sensor.p1s_x_print_progress',
    'sensor.p1s_x_nozzle_target_temperature', 'sensor.p1s_x_nozzle_temperature', 'number.p1s_x_bed_target_temperature',
    'sensor.p1s_x_bed_temperature', 'sensor.p1s_x_chamber_temperature', 'sensor.p1s_x_current_layer',
    'sensor.p1s_x_total_layer_count', 'sensor.p1s_x_task_name', 'sensor.p1s_x_current_stage', 'light.p1s_x_chamber_light',
    'button.p1s_x_pause', 'button.p1s_x_resume', 'button.p1s_x_emergency_stop', 'button.p1s_x_stop',
    'sensor.p1s_x_extruder_power', 'sensor.p1s_x_plug_power'];
  const ed = new Editor();
  ed.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'printer_3d', state_entity: 'sensor.p1s_x_print_status' });
  ed.hass = { ...HASS(Object.fromEntries(ids.map(id => [id, { state: '1', attributes: {} }]))),
    entities: Object.fromEntries(ids.map(id => [id, { device_id: 'p1s' }])) };
  const sug = ed.events.at(-1)?.detail?.config || {};
  check('suggestion imprimante : progression', sug.progress_entity, 'sensor.p1s_x_print_progress');
  check('suggestion imprimante : fin prevue', sug.remaining_time_entity, 'sensor.p1s_x_end_time');
  check('suggestion imprimante : buse mesuree, pas la consigne', sug.nozzle_temperature_entity, 'sensor.p1s_x_nozzle_temperature');
  check('suggestion imprimante : consigne de buse', sug.nozzle_target_entity, 'sensor.p1s_x_nozzle_target_temperature');
  check('suggestion imprimante : plateau mesure', sug.bed_temperature_entity, 'sensor.p1s_x_bed_temperature');
  check('suggestion imprimante : consigne de plateau', sug.bed_target_entity, 'number.p1s_x_bed_target_temperature');
  check('suggestion imprimante : enceinte', sug.chamber_temperature_entity, 'sensor.p1s_x_chamber_temperature');
  check('suggestion imprimante : couche', sug.current_layer_entity, 'sensor.p1s_x_current_layer');
  check('suggestion imprimante : total des couches', sug.total_layers_entity, 'sensor.p1s_x_total_layer_count');
  check('suggestion imprimante : fichier', sug.program_entity, 'sensor.p1s_x_task_name');
  check('suggestion imprimante : etape', sug.phase_entity, 'sensor.p1s_x_current_stage');
  check('suggestion imprimante : lumiere', sug.light_entity, 'light.p1s_x_chamber_light');
  check('suggestion imprimante : pause', sug.pause_entity, 'button.p1s_x_pause');
  check('suggestion imprimante : reprise', sug.resume_entity, 'button.p1s_x_resume');
  check('suggestion imprimante : arret, pas l\'arret d\'urgence', sug.stop_entity, 'button.p1s_x_stop');
  check('suggestion imprimante : pas le capteur start_time en bouton', sug.start_entity, undefined);
  check('suggestion imprimante : la prise, pas la chauffe de la buse', sug.power_entity, 'sensor.p1s_x_plug_power');
}
{
  // OctoPrint names: actual and target, tool0; Moonraker: extruder, number targets.
  const ids = ['sensor.octoprint_current_state', 'sensor.octoprint_target_tool0_temp', 'sensor.octoprint_actual_tool0_temp',
    'sensor.octoprint_target_bed_temp', 'sensor.octoprint_actual_bed_temp', 'sensor.octoprint_current_file_size',
    'sensor.octoprint_current_file', 'sensor.octoprint_estimated_finish_time', 'button.octoprint_stop_job'];
  const ed = new Editor();
  ed.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'printer_3d', state_entity: 'sensor.octoprint_current_state' });
  ed.hass = { ...HASS(Object.fromEntries(ids.map(id => [id, { state: '1', attributes: {} }]))),
    entities: Object.fromEntries(ids.map(id => [id, { device_id: 'op' }])) };
  const sug = ed.events.at(-1)?.detail?.config || {};
  check('suggestion OctoPrint : buse', sug.nozzle_temperature_entity, 'sensor.octoprint_actual_tool0_temp');
  check('suggestion OctoPrint : consigne de buse', sug.nozzle_target_entity, 'sensor.octoprint_target_tool0_temp');
  check('suggestion OctoPrint : plateau', sug.bed_temperature_entity, 'sensor.octoprint_actual_bed_temp');
  check('suggestion OctoPrint : consigne de plateau', sug.bed_target_entity, 'sensor.octoprint_target_bed_temp');
  check('suggestion OctoPrint : le fichier, pas sa taille', sug.program_entity, 'sensor.octoprint_current_file');
  check('suggestion OctoPrint : fin prevue', sug.remaining_time_entity, 'sensor.octoprint_estimated_finish_time');
  check('suggestion OctoPrint : arret du travail', sug.stop_entity, 'button.octoprint_stop_job');
}
{
  const ids = ['sensor.voron_current_print_state', 'sensor.voron_extruder_temperature', 'number.voron_extruder_target',
    'sensor.voron_bed_temperature', 'number.voron_bed_target', 'sensor.voron_print_time_left', 'button.voron_cancel_print',
    'button.voron_emergency_stop', 'sensor.voron_extruder_power', 'sensor.voron_bed_power'];
  const ed = new Editor();
  ed.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'printer_3d', state_entity: 'sensor.voron_current_print_state' });
  ed.hass = { ...HASS(Object.fromEntries(ids.map(id => [id, { state: '1', attributes: {} }]))),
    entities: Object.fromEntries(ids.map(id => [id, { device_id: 'vo' }])) };
  const sug = ed.events.at(-1)?.detail?.config || {};
  check('suggestion Moonraker : extrudeur', sug.nozzle_temperature_entity, 'sensor.voron_extruder_temperature');
  check('suggestion Moonraker : consigne en nombre', sug.nozzle_target_entity, 'number.voron_extruder_target');
  check('suggestion Moonraker : plateau', sug.bed_target_entity, 'number.voron_bed_target');
  check('suggestion Moonraker : temps restant', sug.remaining_time_entity, 'sensor.voron_print_time_left');
  check('suggestion Moonraker : annuler, pas l\'arret d\'urgence', sug.stop_entity, 'button.voron_cancel_print');
  check('suggestion Moonraker : aucune chauffe prise pour la prise', sug.power_entity, undefined);
}

// == Washer-dryers, and a catch-all for their many states (issue #16) =========
// A combo washes and then dries in the same drum, so one card has to show two
// machines. The step comes from the state itself, from a phase entity, or from
// a map entry; everything else on a washer must be untouched by all of it.

const WD = { appliance_type: 'washer', washer_dryer: true, state_entity: 'sensor.wd' };
const wd = (state, extra, states) => render({ ...WD, ...(extra || {}) },
  { 'sensor.wd': { state, attributes: {} }, ...(states || {}) });
const drum = h => /<div class="water-level">/.test(h) ? 'water'
  : /<div class="garments">/.test(h) ? 'clothes' : '';

const wdWashing = wd('Washing');
// Every step is named since 2.11.0, the washing as well as the drying.
check('lavante-sechante : le lavage est nomme', stateLine(wdWashing), 'Washing');
check('lavante-sechante : lavage, de l\'eau dans le tambour', drum(wdWashing), 'water');
check('lavante-sechante : lavage, pas de classe de sechage',
  machineCls(wdWashing).includes('drying'), false);

const wdDrying = wd('Drying');
check('lavante-sechante : sechage nomme', stateLine(wdDrying), 'Drying');
check('lavante-sechante : sechage, du linge et plus d\'eau', drum(wdDrying), 'clothes');
check('lavante-sechante : sechage, la classe y est', machineCls(wdDrying).includes('drying'), true);
contains('lavante-sechante : sechage, la chaleur monte', wdDrying, '<div class="wd-heat"');
contains('lavante-sechante : et elle est animee', wdDrying, 'animation: wd-rise');
check('lavante-sechante : lavage, aucune volute', /<div class="wd-heat"/.test(wdWashing), false);
check('lavante-sechante : sechage, le tambour tourne toujours',
  machineCls(wdDrying).includes('spinning'), true);

// Rinsing is the wash: the drum still has water in it. A spin empties it, but
// it is no drying either: no heat. Proven against the latch, since water is
// also what an unread step leaves in place.
{
  const dried = (state, states) => {
    const c = build({ ...WD, phase_entity: 'sensor.ph' },
      { 'sensor.wd': { state: 'Run', attributes: {} }, 'sensor.ph': { state: 'drying', attributes: {} } }).card;
    return drum(rerender(c, states || { 'sensor.wd': { state, attributes: {} } }));
  };
  check('lavante-sechante : le rincage ramene l\'eau', dried('Rinsing'), 'water');
  check('lavante-sechante : l\'essorage leve aussi le sechage', (() => {
    const c = build({ ...WD, phase_entity: 'sensor.ph' },
      { 'sensor.wd': { state: 'Run', attributes: {} }, 'sensor.ph': { state: 'drying', attributes: {} } }).card;
    return machineCls(rerender(c, { 'sensor.wd': { state: 'Spinning', attributes: {} } }));
  })(), 'spinning spin-cycle');
}

// The drying drum never reaches a plain washer, whatever its state says. The
// state line says what the state says, as it does for every step.
const plainDrying = render({ appliance_type: 'washer', state_entity: 'sensor.wd' },
  { 'sensor.wd': { state: 'Drying', attributes: {} } });
check('lave-linge simple : Drying est nomme tel quel', stateLine(plainDrying), 'Drying');
check('lave-linge simple : et garde son eau', drum(plainDrying), 'water');

// A step only exists inside a running cycle: a phase entity left on its last
// value must not dry an idle machine.
const wdIdle = wd('Idle', { phase_entity: 'sensor.ph' }, { 'sensor.ph': { state: 'Drying', attributes: {} } });
check('lavante-sechante : a l\'arret, aucun sechage', machineCls(wdIdle).includes('drying'), false);
check('lavante-sechante : a l\'arret, l\'etat reste l\'etat', stateLine(wdIdle), 'Idle');

// Home Connect, Miele and SmartThings keep the state at "Running" all the way
// through and name the step in an entity of their own.
const wdPhase = wd('Run', { phase_entity: 'sensor.ph' }, { 'sensor.ph': { state: 'Drying', attributes: {} } });
check('lavante-sechante : l\'etape vient de l\'entite de phase', stateLine(wdPhase), 'Drying');
check('lavante-sechante : et le tambour la suit', drum(wdPhase), 'clothes');

// hOn reports a numbered phase, which phase_map turns into a word.
const wdCode = wd('Run', { phase_entity: 'sensor.ph', phase_map: { 14: 'Drying' } },
  { 'sensor.ph': { state: '14', attributes: {} } });
check('lavante-sechante : un code de phase traduit par phase_map', stateLine(wdCode), 'Drying');

// And a state nobody can read is named by hand in state_map, which is the
// request: a step as a target, not just a state.
const wdMapped = wd('DRY_28', { state_map: { DRY_28: 'drying' } });
check('lavante-sechante : state_map peut nommer l\'etape', stateLine(wdMapped), 'Drying');
check('lavante-sechante : et la machine reste en marche',
  machineCls(wdMapped).includes('spinning'), true);
{
  const cfg = { ...WD, state_map: { DRY_28: 'drying', WASH_12: 'washing' } };
  const c = build(cfg, { 'sensor.wd': { state: 'DRY_28', attributes: {} } }).card;
  check('lavante-sechante : lavage nomme a la main aussi',
    drum(rerender(c, { 'sensor.wd': { state: 'WASH_12', attributes: {} } })), 'water');
  check('lavante-sechante : et il est nomme',
    stateLine(rerender(c, { 'sensor.wd': { state: 'WASH_12', attributes: {} } })), 'Washing');
  check('lavante-sechante : et il reste en marche',
    machineCls(rerender(c, { 'sensor.wd': { state: 'WASH_12', attributes: {} } })).includes('spinning'), true);
}

// The words are not only English. A German phase entity says Trocknen, and a
// state in a language the card does not read is still a step once the machine
// is known to be running.
check('lavante-sechante : Trocknen est un sechage',
  stateLine(wd('Run', { phase_entity: 'sensor.ph' }, { 'sensor.ph': { state: 'Trocknen', attributes: {} } })), 'Drying');
check('lavante-sechante : Asciugatura aussi',
  drum(wd('Run', { phase_entity: 'sensor.ph' }, { 'sensor.ph': { state: 'Asciugatura', attributes: {} } })), 'clothes');
check('lavante-sechante : un etat etranger, une fois en marche, seche quand meme',
  stateLine(wd('Trocknen', { state_map: { '*': 'running' } })), 'Drying');
check('lavante-sechante : un mot inconnu ne seche pas',
  machineCls(wd('Aquaplus', { state_map: { '*': 'running' } })).includes('drying'), false);

// Integrations answer in snake case as often as in words, and an underscore is
// a word character: without separators turned into spaces these match nothing.
check('lavante-sechante : ai_drying est un sechage',
  stateLine(wd('Run', { phase_entity: 'sensor.ph' }, { 'sensor.ph': { state: 'ai_drying', attributes: {} } })), 'Drying');
{
  const c = build({ ...WD, phase_entity: 'sensor.ph' },
    { 'sensor.wd': { state: 'Run', attributes: {} }, 'sensor.ph': { state: 'drying', attributes: {} } }).card;
  check('lavante-sechante : pre_wash est un lavage',
    drum(rerender(c, { 'sensor.wd': { state: 'Run', attributes: {} },
                       'sensor.ph': { state: 'pre_wash', attributes: {} } })), 'water');
}
// Electrolux and Midea say "Dry", not "Drying".
check('lavante-sechante : Dry tout court', stateLine(wd('Run', { phase_entity: 'sensor.ph' },
  { 'sensor.ph': { state: 'Dry', attributes: {} } })), 'Drying');

// The drum keeps the last step it was told. A cycle ends its drying on an
// anti-crease or a cool-down, which name no step at all, and water back in the
// drum at that point would be a plain lie.
{
  const run = ph => ({ 'sensor.wd': { state: 'Run', attributes: {} },
                       'sensor.ph': { state: ph, attributes: {} } });
  const c = build({ ...WD, phase_entity: 'sensor.ph' }, run('drying')).card;
  check('lavante-sechante : le sechage est pris', drum(markup(c)), 'clothes');
  check('lavante-sechante : l\'anti-froissage garde le linge',
    drum(rerender(c, run('anti_crease'))), 'clothes');
  check('lavante-sechante : et la chaleur avec',
    machineCls(rerender(c, run('cooling_down'))).includes('drying'), true);
  check('lavante-sechante : un lavage nomme ramene l\'eau',
    drum(rerender(c, run('main_wash'))), 'water');
  rerender(c, run('drying'));
  check('lavante-sechante : en pause, le linge reste',
    drum(rerender(c, { 'sensor.wd': { state: 'Paused', attributes: {} },
                       'sensor.ph': { state: 'anti_crease', attributes: {} } })), 'clothes');
  check('lavante-sechante : en pause, l\'etat prime sur l\'etape',
    stateLine(rerender(c, { 'sensor.wd': { state: 'Paused', attributes: {} },
                            'sensor.ph': { state: 'drying', attributes: {} } })), 'Paused');
  check('lavante-sechante : le cycle fini rend le tambour a l\'eau',
    drum(rerender(c, { 'sensor.wd': { state: 'End Of Cycle', attributes: {} },
                       'sensor.ph': { state: 'drying', attributes: {} } })), 'water');
}

// A machine whose name says it dries is one, without the option being set.
const wdAuto = render({ state_entity: 'sensor.washer_dryer_state' },
  { 'sensor.washer_dryer_state': { state: 'Drying', attributes: {} } });
check('lavante-sechante : le nom suffit a la reconnaitre', stateLine(wdAuto), 'Drying');
contains('lavante-sechante : et c\'est bien un lave-linge, pas un seche-linge', wdAuto, 'class="mbody"');
check('lavante-sechante : reconnue par le nom, le tambour seche', drum(wdAuto), 'clothes');

// The option always wins over the name, in both directions.
const wdOff = render({ state_entity: 'sensor.washer_dryer_state', washer_dryer: false },
  { 'sensor.washer_dryer_state': { state: 'Drying', attributes: {} } });
check('lavante-sechante : l\'option a false rend un lave-linge ordinaire',
  drum(wdOff), 'water');

// The catch-all, the other half of the request: naming the handful of states
// that are not "running" is shorter than naming the dozens that are.
const catchAll = { appliance_type: 'washer', state_entity: 'sensor.wd', state_map: { '*': 'running' } };
const wdUnknown = render(catchAll, { 'sensor.wd': { state: 'Aquaplus XL', attributes: {} } });
check('fourre-tout : un etat inconnu passe en marche', stateLine(wdUnknown), 'Running');
check('fourre-tout : et la machine tourne', machineCls(wdUnknown).includes('spinning'), true);
check('fourre-tout : les etats connus gardent leur sens',
  stateLine(render(catchAll, { 'sensor.wd': { state: 'Ready to start', attributes: {} } })), 'Idle');
check('fourre-tout : une entree nommee passe avant',
  stateLine(render({ ...catchAll, state_map: { '*': 'running', Aquaplus: 'error' } },
    { 'sensor.wd': { state: 'Aquaplus', attributes: {} } })), 'Error');
check('fourre-tout : une cible invalide ne cree pas d\'etat',
  stateLine(render({ ...catchAll, state_map: { '*': 'sechage' } },
    { 'sensor.wd': { state: 'Aquaplus XL', attributes: {} } })), 'Aquaplus XL');
check('fourre-tout : rien n\'est invente sans l\'etoile',
  machineCls(render({ appliance_type: 'washer', state_entity: 'sensor.wd' },
    { 'sensor.wd': { state: 'Aquaplus XL', attributes: {} } })).includes('spinning'), false);

// The editor: one checkbox, and the phase field on every washer.
const edWasher = cfg => markup(newEditor({ state_entity: 'sensor.oven_appliance_state',
  appliance_type: 'washer', ...cfg })._root);
const edWasherToggles = cfg => [...edWasher(cfg).matchAll(/data-toggle="([^"]+)"/g)].map(m => m[1]);
contains('editeur : la case lavante-sechante est sur le lave-linge',
  edWasher(), 'data-field="washer_dryer"');
check('editeur : elle n\'est pas sur le seche-linge',
  /data-field="washer_dryer"/.test(edHtml('dryer')), false);
check('editeur : la phase est offerte sans la case',
  edWasherToggles().includes('phase_entity'), true);
check('editeur : cochee, la phase est offerte',
  edWasherToggles({ washer_dryer: true }).includes('phase_entity'), true);

// Opening the editor on a machine whose name says it dries writes the option
// down, so the YAML says what the card is already doing.
{
  const ids = ['sensor.washer_dryer_machine_state', 'sensor.washer_dryer_program_phase'];
  const ed = new Editor();
  ed.setConfig({ type: 'custom:ha-appliance-card', state_entity: 'sensor.washer_dryer_machine_state' });
  ed.hass = { ...HASS(Object.fromEntries(ids.map(id => [id, { state: 'Drying', attributes: {} }]))),
    entities: Object.fromEntries(ids.map(id => [id, { device_id: 'wd' }])) };
  const sug = ed.events.at(-1)?.detail?.config || {};
  check('suggestion : l\'option est ecrite dans la config', sug.washer_dryer, true);
  check('suggestion : la phase du programme est proposee',
    sug.phase_entity, 'sensor.washer_dryer_program_phase');
}

// == Cycle steps on the state line (issue #18) ================================
// An hour of "Running" says nothing of where the wash is. The step comes from a
// phase entity (Electrolux, SmartThings, Miele) or from the state itself (LG,
// Whirlpool), and only the words change: the remaining time and the bar stay
// the whole cycle's. Every value below is one an integration really sends.

const LV = { appliance_type: 'washer', state_entity: 'sensor.lv_state', phase_entity: 'sensor.lv_phase' };
const lv = (phase, extra = {}, state = 'Running') => render({ ...LV, ...extra },
  { 'sensor.lv_state': { state, attributes: {} }, 'sensor.lv_phase': { state: phase, attributes: {} } });

// Electrolux: the state stays at Running while cyclePhase walks the steps.
check('etapes : Wash', stateLine(lv('Wash')), 'Washing');
check('etapes : Rinse', stateLine(lv('Rinse')), 'Rinsing');
check('etapes : Drain', stateLine(lv('Drain')), 'Draining');
check('etapes : Spin', stateLine(lv('Spin')), 'Spinning');
check('etapes : Anticrease', stateLine(lv('Anticrease')), 'Anti-crease');
check('etapes : Prewash, pas un lavage', stateLine(lv('Prewash')), 'Pre-wash');
check('etapes : en francais', stateLine(lv('Rinse', { language: 'fr' })), 'Rinçage');
// At rest Electrolux says Unavailable, and Cycle Phase Hidden when it would
// rather not say: neither is a step.
check('etapes : Unavailable ne nomme rien', stateLine(lv('Unavailable')), 'Running');
check('etapes : Cycle Phase Hidden non plus', stateLine(lv('Cycle Phase Hidden')), 'Running');

// A step exists only while the machine runs. Paused, finished or at rest say
// more, and Electrolux still reports Spin ten seconds after End Of Cycle.
check('etapes : en pause, la pause', stateLine(lv('Rinse', {}, 'Paused')), 'Paused');
check('etapes : fini, le cycle fini', stateLine(lv('Spin', {}, 'End Of Cycle')), 'Finished');
check('etapes : a l\'arret, l\'arret', stateLine(lv('Wash', {}, 'Idle')), 'Idle');
check('etapes : en pause, le tambour ne s\'emballe pas',
  machineCls(lv('Spin', {}, 'Paused')).includes('spin-cycle'), false);
check('etapes : state_show_raw garde le texte de l\'entite',
  stateLine(lv('Rinse', { state_show_raw: true })), 'Running');

// SmartThings: job states in snake case, the AI ones included.
check('etapes : ai_rinse', stateLine(lv('ai_rinse')), 'Rinsing');
check('etapes : weight_sensing', stateLine(lv('weight_sensing')), 'Weighing');
check('etapes : wrinkle_prevent', stateLine(lv('wrinkle_prevent')), 'Anti-crease');
// A state word is never a step: a delayed start is a delay, a finish is done.
check('etapes : delay_wash n\'est pas un lavage', stateLine(lv('delay_wash')), 'Running');
check('etapes : finish non plus', stateLine(lv('finish')), 'Running');
check('etapes : none non plus', stateLine(lv('none')), 'Running');
// Samsung's air wash is hot air and no water: no wash.
check('etapes : air_wash n\'est pas un lavage', stateLine(lv('air_wash')), 'Running');
// The raw capability values come in camel case, which is split like snake case.
check('etapes : aiSpin en camel case', stateLine(lv('aiSpin')), 'Spinning');
check('etapes : airWash non plus', stateLine(lv('airWash')), 'Running');

// Miele: its programme phases.
check('etapes : main_wash', stateLine(lv('main_wash')), 'Washing');
check('etapes : pre_wash, pas un lavage', stateLine(lv('pre_wash')), 'Pre-wash');
check('etapes : cooling_down', stateLine(lv('cooling_down')), 'Cooling');
check('etapes : soak', stateLine(lv('soak')), 'Soaking');
check('etapes : steam_smoothing', stateLine(lv('steam_smoothing')), 'Steam');
check('etapes : rinse_hold est une attente', stateLine(lv('rinse_hold')), 'Running');
check('etapes : not_running ne nomme rien', stateLine(lv('not_running')), 'Running');
// A phase entity is there to name the step: a word the card cannot translate
// is shown as the integration writes it, minus its underscores.
check('etapes : un mot inconnu tel quel', stateLine(lv('freshen_up_and_moisten')), 'Freshen up and moisten');

// hOn counts its phases. A code is a number to map, not a word to show.
check('etapes : un code sans table ne dit rien', stateLine(lv('4')), 'Running');
check('etapes : un code nomme par sa cle', stateLine(lv('4', { phase_map: { 4: 'spinning' } })), 'Spinning');
check('etapes : un code nomme par ses mots', stateLine(lv('9', { phase_map: { 9: 'Programme 9' } })), 'Programme 9');
check('etapes : et ses mots tels qu\'ecrits', stateLine(lv('9', { phase_map: { 9: 'AquaPlus' } })), 'AquaPlus');

// A dishwasher and a dryer name their steps the same way, and nothing else does.
const dwStep = phase => stateLine(render({ appliance_type: 'dishwasher', state_entity: 'sensor.dw',
  phase_entity: 'sensor.dw_phase' },
  { 'sensor.dw': { state: 'Running', attributes: {} }, 'sensor.dw_phase': { state: phase, attributes: {} } }));
check('etapes lave-vaisselle : Mainwash', dwStep('Mainwash'), 'Washing');
check('etapes lave-vaisselle : Hotrinse', dwStep('Hotrinse'), 'Rinsing');
check('etapes lave-vaisselle : Ado Drying', dwStep('Ado Drying'), 'Drying');
check('etapes lave-vaisselle : pre_dishwash', dwStep('pre_dishwash'), 'Pre-wash');
const tdStep = phase => render({ appliance_type: 'dryer', state_entity: 'sensor.td', phase_entity: 'sensor.td_phase' },
  { 'sensor.td': { state: 'Running', attributes: {} }, 'sensor.td_phase': { state: phase, attributes: {} } });
check('etapes seche-linge : Cool', stateLine(tdStep('Cool')), 'Cooling');
check('etapes seche-linge : Dry', stateLine(tdStep('Dry')), 'Drying');
// A steam oven drains and rinses too, in its state: it is no washer, and its
// unknown words stay as they came.
check('etapes : un four qui vidange n\'est pas en marche',
  stateLine(render({ appliance_type: 'oven', state_entity: 'sensor.ov' },
    { 'sensor.ov': { state: 'draining', attributes: {} } })), 'draining');
check('etapes : pas sur un four', stateLine(render({ appliance_type: 'oven', state_entity: 'sensor.ov',
  phase_entity: 'sensor.ov_phase' },
  { 'sensor.ov': { state: 'Running', attributes: {} }, 'sensor.ov_phase': { state: 'Rinse', attributes: {} } })), 'Running');

// LG and Whirlpool say the step in the state itself, in words the card did not
// sort: a machine soaking is a machine running.
const own = (state, extra = {}) => render({ appliance_type: 'washer', state_entity: 'sensor.lg', ...extra },
  { 'sensor.lg': { state, attributes: {} } });
check('etapes dans l\'etat : soaking', stateLine(own('soaking')), 'Soaking');
check('etapes dans l\'etat : soaking tourne', machineCls(own('soaking')).includes('spinning'), true);
check('etapes dans l\'etat : detecting', stateLine(own('detecting')), 'Weighing');
check('etapes dans l\'etat : rinsing', stateLine(own('rinsing')), 'Rinsing');
check('etapes dans l\'etat : cycle_filling', stateLine(own('cycle_filling')), 'Filling');
check('etapes dans l\'etat : cycle_spinning', stateLine(own('cycle_spinning')), 'Spinning');
check('etapes dans l\'etat : running_maincycle reste En cours', stateLine(own('running_maincycle')), 'Running');
// Only a word the card knows: an unknown state stays unknown, as it came.
check('etapes dans l\'etat : un mot inconnu ne tourne pas', machineCls(own('dispensing')).includes('spinning'), false);
check('etapes dans l\'etat : et reste tel quel', stateLine(own('dispensing')), 'dispensing');
// An entry of state_map says what the state is, even a wrong one: a target the
// card rejects makes no state, and no step either.
check('etapes dans l\'etat : state_map n\'est pas contredit',
  machineCls(own('soaking', { state_map: { soaking: 'trempage' } })).includes('spinning'), false);
check('etapes dans l\'etat : state_map peut nommer l\'essorage',
  stateLine(own('P7', { state_map: { P7: 'spinning' } })), 'Spinning');
check('etapes dans l\'etat : state_map en marche garde le mot de l\'etat',
  stateLine(own('Rinsing', { state_map: { Rinsing: 'running' } })), 'Rinsing');
// Both at once: the phase entity wins, as a machine that has one says little
// in its state.
check('etapes : la phase prime sur l\'etat', stateLine(render(LV,
  { 'sensor.lv_state': { state: 'rinsing', attributes: {} }, 'sensor.lv_phase': { state: 'Spin', attributes: {} } })), 'Spinning');

// The end of the wash stays the end of the wash. A step has its own last
// change, but the cycle began when the state turned to running, and the time
// left is the whole cycle's. Opened during the rinse, 40 minutes in with 20
// left: two thirds, not the two minutes of rinse against the twenty.
clockAt(0);
{
  const cfg = { ...LV, remaining_time_entity: 'sensor.lv_end' };
  const midWash = (phase, phaseMin) => ({
    'sensor.lv_state': wst('Running', -40),
    'sensor.lv_phase': { state: phase, attributes: {}, last_changed: at(phaseMin) },
    'sensor.lv_end': secs(20 * 60) });
  const c = build(cfg, midWash('Rinse', -2)).card;
  check('etapes : la barre suit le cycle, pas l\'etape', barWidth(markup(c)), '67');
  // The finish time printed is the cycle's too: twenty minutes from now.
  const endOfWash = new Date(T0 + 20 * MIN).toLocaleString('en', { hour: '2-digit', minute: '2-digit' })
    .replace(/[ \u202f]/g, '\u00a0');
  check('etapes : le temps restant est celui du cycle', infoLine(markup(c), 'Remaining time'),
    `20\u00a0min\u00a0\u00b7 ready\u00a0at\u00a0${endOfWash}`);
  check('etapes : a l\'essorage, toujours le cycle', barWidth(rerender(c, midWash('Spin', -1))), '67');
  check('etapes : et toujours son heure de fin',
    infoLine(rerender(c, midWash('Spin', -1)), 'Remaining time'), `20\u00a0min\u00a0\u00b7 ready\u00a0at\u00a0${endOfWash}`);
}
// LG begins a cycle detecting the load, a word the card did not sort. The
// history read took it for a gap in the data, which cannot open a cycle, and
// started the bar at the washing, five minutes late.
{
  const h = withHistory({ appliance_type: 'washer', state_entity: 'sensor.w', remaining_time_entity: 'sensor.r' },
    { 'sensor.w': wst('rinsing', -5), 'sensor.r': secs(20 * 60) },
    { 'sensor.w': [H('standby', -60), H('detecting', -40), H('washing', -35), H('rinsing', -5)] });
  await settle();
  check('etapes : la pesee compte dans le cycle', barWidth(markup(h.card)), '67');
}

// Spinning, the water is out and the load whirls: clothes, fast, no heat.
const spinning = lv('Spin');
check('essorage : la classe du tambour', machineCls(spinning), 'spinning spin-cycle');
check('essorage : du linge et plus d\'eau', drum(spinning), 'clothes');
contains('essorage : il tourne vite', spinning, '.machine.spinning.spin-cycle .garments { animation-duration: 0.7s; }');
check('essorage : au rincage, de l\'eau', drum(lv('Rinse')), 'water');
check('essorage : au rincage, pas de classe', machineCls(lv('Rinse')).includes('spin-cycle'), false);
check('essorage : un seche-linge ne s\'emballe pas', machineCls(tdStep('thermo_spin')).includes('spin-cycle'), false);

// Twelve steps in fourteen languages. The English ones exactly; the French
// exactly, as the author reads them; and for the other twelve, a label that
// is neither the English one nor a bare key, which is what a missing entry
// would fall back to.
{
  const PHASES = ['Prewash', 'soak', 'weight_sensing', 'cycle_filling', 'Wash', 'Rinse', 'Drain', 'Spin',
    'Dry', 'Cool', 'Anticrease', 'Steam'];
  const labels = language => PHASES.map(ph => stateLine(lv(ph, language ? { language } : {})));
  const en = labels();
  check('etapes : les douze en anglais', en.join('|'),
    'Pre-wash|Soaking|Weighing|Filling|Washing|Rinsing|Draining|Spinning|Drying|Cooling|Anti-crease|Steam');
  check('etapes : les douze en francais', labels('fr').join('|'),
    'Prélavage|Trempage|Pesée|Remplissage|Lavage|Rinçage|Vidange|Essorage|Séchage|Refroidissement|Anti-froissage|Vapeur');
  for (const language of ['ru', 'de', 'es', 'it', 'nl', 'pt', 'sv', 'no', 'da', 'pl', 'zh', 'cs']) {
    const got = labels(language);
    check(`etapes : les douze en ${language}`,
      got.filter((l, i) => !l || l === en[i] || l.startsWith('step_')).length, 0);
  }
}

// The editor offers the phase to the three, and suggests it by its name.
check('editeur : la phase sur le seche-linge', toggles('dryer').includes('phase_entity'), true);
check('editeur : la phase sur le lave-vaisselle', toggles('dishwasher').includes('phase_entity'), true);
for (const [type, ids] of [
  ['washer', ['sensor.washer_appliance_state', 'sensor.washer_cycle_phase']],
  ['dryer', ['sensor.dryer_machine_state', 'sensor.dryer_job_state']],
  ['dishwasher', ['sensor.dishwasher_status', 'sensor.dishwasher_program_phase']],
]) {
  const ed = new Editor();
  ed.setConfig({ type: 'custom:ha-appliance-card', appliance_type: type, state_entity: ids[0] });
  ed.hass = { ...HASS(Object.fromEntries(ids.map(id => [id, { state: 'Idle', attributes: {} }]))),
    entities: Object.fromEntries(ids.map(id => [id, { device_id: type }])) };
  const sug = ed.events.at(-1)?.detail?.config || {};
  check(`suggestion : la phase du ${type}`, sug.phase_entity, ids[1]);
  if (type === 'washer') check('suggestion : sans en faire une lavante-sechante', sug.washer_dryer, undefined);
}

// == HomeWhiz: Beko, Grundig, Arcelik, Bauknecht (issue #18, second round) ======
// HomeWhiz hands over the firmware's own keys, lowercased, for the state and
// for the step alike. Read as words they said nothing, and the card showed
// "device state running" in grey all cycle long. Every value below is one of
// its appliance configurations, read in the integration's test fixtures.

const HW = { appliance_type: 'washer', state_entity: 'sensor.hw_state', phase_entity: 'sensor.hw_sub_state' };
const hw = (state, sub, extra = {}) => render({ ...HW, ...extra },
  { 'sensor.hw_state': { state, attributes: {} }, 'sensor.hw_sub_state': { state: sub, attributes: {} } });
const hwRun = (sub, extra) => hw('device_state_running', sub, extra);

// The state. "On" is a machine switched on and waiting for a programme.
check('homewhiz : allumee, en veille', stateLine(hw('device_state_on', 'unknown')), 'Idle');
check('homewhiz : allumee, le tambour ne tourne pas', hasCls(hw('device_state_on', 'unknown'), 'spinning'), false);
check('homewhiz : eteinte', stateLine(hw('device_state_off', 'unknown')), 'Idle');
check('homewhiz : dans ses reglages', stateLine(hw('device_state_settings', 'unknown')), 'Idle');
check('homewhiz : porte ouverte', stateLine(hw('device_state_door_open', 'unknown')), 'Idle');
check('homewhiz : en marche', stateLine(hw('device_state_running', 'unknown')), 'Running');
check('homewhiz : en marche, le tambour tourne', hasCls(hw('device_state_running', 'unknown'), 'spinning'), true);
check('homewhiz : l\'annulation vidange encore', stateLine(hw('device_state_cancelling', 'unknown')), 'Running');
check('homewhiz : en pause', stateLine(hw('device_state_paused', 'unknown')), 'Paused');
check('homewhiz : un depart differe', stateLine(hw('device_state_time_delay_active', 'unknown')), 'Delayed start');
// A countdown on hold will not start by itself.
check('homewhiz : un depart differe en pause', stateLine(hw('device_state_time_delay_paused', 'unknown')), 'Paused');
check('homewhiz : une table de cuisson qui cuit', stateLine(render({ appliance_type: 'cooktop', state_entity: 'sensor.hw_hob' },
  { 'sensor.hw_hob': { state: 'device_state_cooking', attributes: {} } })), 'Running');
check('homewhiz : en francais', stateLine(hw('device_state_paused', 'unknown', { language: 'fr' })), 'En pause');
// state_map still says what the state is, and a key of the table's own object
// is no HomeWhiz state.
check('homewhiz : state_map passe devant',
  stateLine(hw('device_state_on', 'unknown', { state_map: { device_state_on: 'done' } })), 'Finished');
check('homewhiz : un etat nomme constructor reste tel quel',
  stateLine(render({ appliance_type: 'washer', state_entity: 'sensor.hw_state' },
    { 'sensor.hw_state': { state: 'constructor', attributes: {} } })), 'constructor');

// The step, from the sub state, on a washer.
check('homewhiz : le prelavage', stateLine(hwRun('washer_substate_prewash')), 'Pre-wash');
check('homewhiz : le lavage', stateLine(hwRun('washer_substate_washing')), 'Washing');
check('homewhiz : l\'arrivee d\'eau', stateLine(hwRun('washer_water_intake')), 'Filling');
check('homewhiz : le rincage', stateLine(hwRun('washer_substate_rinsing')), 'Rinsing');
// The softener goes in with the last rinse.
check('homewhiz : l\'adoucissant est un rincage', stateLine(hwRun('washer_substate_softener')), 'Rinsing');
check('homewhiz : l\'essorage', stateLine(hwRun('washer_substate_spin')), 'Spinning');
check('homewhiz : l\'essorage s\'emballe', hasCls(hwRun('washer_substate_spin'), 'spin-cycle'), true);
check('homewhiz : le sechage', stateLine(hwRun('washer_substate_drying')), 'Drying');
check('homewhiz : l\'anti-froissage', stateLine(hwRun('washer_substate_remote_anticrease')), 'Anti-crease');
// Analysing is the load, which its Spanish words say: "Analizando la carga".
check('homewhiz : l\'analyse de la charge', stateLine(hwRun('washer_substate_analysing')), 'Weighing');
check('homewhiz : l\'essorage en francais', stateLine(hwRun('washer_substate_spin', { language: 'fr' })), 'Essorage');
// Its messages say more than steps. None of these is one.
for (const sub of ['program_started', 'door_locked', 'locking_door', 'opening_door', 'add_laundry',
  'remove_laundry', 'rinse_hold', 'time_delay_enabled', 'time_delay_paused', 'paused']) {
  check(`homewhiz : ${sub} ne nomme pas d'etape`, stateLine(hwRun('washer_substate_' + sub)), 'Running');
}
// phase_map still names a value by hand, a step by its key or in its own words.
check('homewhiz : phase_map nomme une etape',
  stateLine(hwRun('washer_substate_program_started', { phase_map: { washer_substate_program_started: 'filling' } })), 'Filling');
check('homewhiz : phase_map donne ses mots',
  stateLine(hwRun('washer_substate_door_locked', { phase_map: { washer_substate_door_locked: 'Door locked' } })), 'Door locked');
check('homewhiz : une etape a l\'arret ne dit rien', stateLine(hw('device_state_on', 'washer_substate_spin')), 'Idle');

// The end of a cycle, as the machine reports it: the state goes back to "on"
// and the message asks for the laundry, then the washer switches itself off a
// while later. Idle at that moment would say the cycle never ran.
check('homewhiz : le cycle fini', stateLine(hw('device_state_on', 'washer_substate_remove_laundry')), 'Finished');
check('homewhiz : eteinte ensuite, plus rien',
  stateLine(hw('device_state_off', 'washer_substate_remove_laundry')), 'Idle');
check('homewhiz : allumee sans message, en veille', stateLine(hw('device_state_on', 'washer_substate_program_started')), 'Idle');
check('homewhiz : fini en francais',
  stateLine(hw('device_state_on', 'washer_substate_remove_laundry', { language: 'fr' })), 'Terminé');
check('homewhiz : sans entite de phase, l\'etat seul',
  stateLine(render({ appliance_type: 'washer', state_entity: 'sensor.hw_state' },
    { 'sensor.hw_state': { state: 'device_state_on', attributes: {} } })), 'Idle');

// A dryer, and a dryer's messages: every one says "dryer", which is no drying.
const hwDryer = sub => render({ ...HW, appliance_type: 'dryer' },
  { 'sensor.hw_state': { state: 'device_state_running', attributes: {} }, 'sensor.hw_sub_state': { state: sub, attributes: {} } });
check('homewhiz seche-linge : le sechage', stateLine(hwDryer('dryer_message_drying')), 'Drying');
check('homewhiz seche-linge : le refroidissement', stateLine(hwDryer('dryer_message_cooling')), 'Cooling');
check('homewhiz seche-linge : l\'anti-froissage', stateLine(hwDryer('dryer_message_anti_creasing')), 'Anti-crease');
for (const sub of ['hello', 'closing', 'child_lock', 'program_started', 'refreshing', 'drum_empty']) {
  check(`homewhiz seche-linge : ${sub} ne nomme pas d'etape`, stateLine(hwDryer('dryer_message_' + sub)), 'Running');
}
const hwEnd = (type, sub) => stateLine(render({ ...HW, appliance_type: type },
  { 'sensor.hw_state': { state: 'device_state_on', attributes: {} }, 'sensor.hw_sub_state': { state: sub, attributes: {} } }));
check('homewhiz seche-linge : le programme fini', hwEnd('dryer', 'dryer_message_program_finished'), 'Finished');

// A dishwasher, whose drawing takes the step too.
const hwDish = sub => render({ ...HW, appliance_type: 'dishwasher' },
  { 'sensor.hw_state': { state: 'device_state_running', attributes: {} }, 'sensor.hw_sub_state': { state: sub, attributes: {} } });
check('homewhiz lave-vaisselle : le lavage', stateLine(hwDish('dishwasher_message_washing')), 'Washing');
check('homewhiz lave-vaisselle : le lavage dessine', hasCls(hwDish('dishwasher_message_washing'), 'phase-mainwash'), true);
check('homewhiz lave-vaisselle : le rincage', stateLine(hwDish('dishwasher_message_rinsing')), 'Rinsing');
check('homewhiz lave-vaisselle : le rincage dessine', hasCls(hwDish('dishwasher_message_rinsing'), 'phase-rinsing'), true);
check('homewhiz lave-vaisselle : le sechage', stateLine(hwDish('dishwasher_message_drying')), 'Drying');
check('homewhiz lave-vaisselle : le sechage dessine', hasCls(hwDish('dishwasher_message_drying'), 'phase-drying'), true);
for (const sub of ['program_started', 'cancelling', 'program_sanitized']) {
  check(`homewhiz lave-vaisselle : ${sub} ne nomme pas d'etape`, stateLine(hwDish('dishwasher_message_' + sub)), 'Running');
}
check('homewhiz lave-vaisselle : le programme fini', hwEnd('dishwasher', 'dishwasher_message_program_finished'), 'Finished');
// Complete, and sanitized with it.
check('homewhiz lave-vaisselle : et desinfecte', hwEnd('dishwasher', 'dishwasher_message_program_sanitized'), 'Finished');

// A washer-dryer: the drum dries on the drying, and an anti-crease after it
// keeps the heat rather than pouring the water back in.
check('homewhiz lavante-sechante : le sechage seche',
  hasCls(hwRun('washer_substate_drying', { washer_dryer: true }), 'drying'), true);
check('homewhiz lavante-sechante : l\'essorage ne seche pas',
  drum(hwRun('washer_substate_spin', { washer_dryer: true })), 'clothes');
{
  const c = build({ ...HW, washer_dryer: true }, { 'sensor.hw_state': { state: 'device_state_running', attributes: {} },
    'sensor.hw_sub_state': { state: 'washer_substate_drying', attributes: {} } }).card;
  check('homewhiz lavante-sechante : l\'anti-froissage garde le sechage', hasCls(rerender(c, {
    'sensor.hw_state': { state: 'device_state_running', attributes: {} },
    'sensor.hw_sub_state': { state: 'washer_substate_remote_anticrease', attributes: {} } }), 'drying'), true);
}

// The editor, on a HomeWhiz washer as its entities come: selects first, then
// the sensors. It finds the sub state, and no start button, since the one entity
// that says start is the start delay, a sensor and a number.
{
  const ids = ['select.hw_state', 'select.hw_programme', 'select.hw_temperature', 'select.hw_spin',
    'sensor.hw_state', 'sensor.hw_programme', 'sensor.hw_sub_state', 'sensor.hw_duration', 'sensor.hw_remaining',
    'sensor.hw_start_delay', 'sensor.hw_programme_end_time', 'sensor.hw_delay_start_time',
    'number.hw_start_delay', 'switch.hw_steam', 'binary_sensor.hw_remote_control', 'binary_sensor.hw_door_is_open'];
  const ed = new Editor();
  ed.setConfig({ type: 'custom:ha-appliance-card', state_entity: 'sensor.hw_state' });
  ed.hass = { ...HASS(Object.fromEntries(ids.map(id => [id, { state: 'x', attributes: {} }]))),
    entities: Object.fromEntries(ids.map(id => [id, { device_id: 'hw' }])) };
  const sug = ed.events.at(-1)?.detail?.config || {};
  check('suggestion homewhiz : le sous-etat comme phase', sug.phase_entity, 'sensor.hw_sub_state');
  check('suggestion homewhiz : pas le depart differe comme bouton', sug.start_entity, undefined);
}
// A sensor that says start is no button either, and a real button still is.
{
  const ids = ['sensor.lv_state', 'sensor.lv_program_start', 'number.lv_start_delay', 'button.lv_start'];
  const ed = new Editor();
  ed.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'washer', state_entity: 'sensor.lv_state' });
  ed.hass = { ...HASS(Object.fromEntries(ids.map(id => [id, { state: 'x', attributes: {} }]))),
    entities: Object.fromEntries(ids.map(id => [id, { device_id: 'lv' }])) };
  const sug = ed.events.at(-1)?.detail?.config || {};
  check('suggestion : le bouton, ni un capteur ni un delai', sug.start_entity, 'button.lv_start');
}

// == Pet feeder (issue: two feeders, two transports) =========================
// A feeder is read like a fridge and not run like a washer: no cycle, no
// programme, no door. What it did today and when it last served is the whole
// card, and it must be as readable with three entities as with ten.

const AGO = ms => new Date(T0 - ms).toISOString();
// The card prints a clock time in the card's own language, so the tests
// compare against the same formatter rather than a hard-coded hour.
// ...and through the same no-break rule, since the card never lets a time
// split between its number and its AM.
const HHMM = ms => new Date(T0 - ms).toLocaleString('en', { hour: '2-digit', minute: '2-digit' })
  .replace(/[ \u202f]/g, '\u00a0');
const FEEDER_IN = {
  'select.croquettes_feed': { state: '', attributes: { options: ['', 'START'] }, last_changed: AGO(3600e3) },
  'sensor.croquettes_portions_per_day': { state: '12', attributes: { unit_of_measurement: 'portion' }, last_changed: AGO(1800e3) },
  'sensor.croquettes_weight_per_day': { state: '96', attributes: { unit_of_measurement: 'g' } },
  'number.croquettes_portion_weight': { state: '8', attributes: { unit_of_measurement: 'g' } },
  'number.croquettes_serving_size': { state: '3', attributes: { unit_of_measurement: 'portion' } },
  'sensor.croquettes_schedule_pretty': { state: '07:00 | 12:00 | 19:00', attributes: {} },
  'binary_sensor.croquettes_error': { state: 'off', attributes: {} },
};
const CFG_IN = { appliance_type: 'pet_feeder', start_entity: 'select.croquettes_feed',
  portions_today_entity: 'sensor.croquettes_portions_per_day',
  weight_today_entity: 'sensor.croquettes_weight_per_day',
  portion_weight_entity: 'number.croquettes_portion_weight',
  serving_size_entity: 'number.croquettes_serving_size',
  schedule_entity: 'sensor.croquettes_schedule_pretty',
  error_entity: 'binary_sensor.croquettes_error' };
const feeder = (extra = {}, more = {}) => render({ ...CFG_IN, ...extra }, { ...FEEDER_IN, ...more });

const fIn = feeder();
check('gamelle : au repos, rien a dire', /class="state-line"/.test(fIn), false);
check('gamelle : portions du jour', infoLine(fIn, 'Portions today'), '12 portion · 96 g');
check('gamelle : taille de la portion', infoLine(fIn, 'Serving size'), '3 portion');
check('gamelle : poids d\'une portion', infoLine(fIn, 'Portion weight'), '8 g');
check('gamelle : le planning tel quel', infoLine(fIn, 'Schedule'), '07:00 | 12:00 | 19:00');
check('gamelle : le planning s\'enroule', /class="info-line[^"]* wrap"/.test(fIn), true);
check('gamelle : aucune barre de progression', /class="bar-fill"/.test(fIn), false);
check('gamelle : et le bouton de distribution', /data-entity="select.croquettes_feed"/.test(fIn), true);

// Grams are worked out when the feeder does not count them, and never assumed:
// a portion weighs what its own setting says, from one gram to twenty.
check('gamelle : les grammes se calculent',
  infoLine(feeder({ weight_today_entity: undefined }), 'Portions today'), '12 portion · 96 g');
check('gamelle : avec un autre poids de portion, un autre total',
  infoLine(feeder({ weight_today_entity: undefined },
    { 'number.croquettes_portion_weight': { state: '20', attributes: { unit_of_measurement: 'g' } } }), 'Portions today'),
  '12 portion · 240 g');
check('gamelle : sans poids de portion, pas de grammes inventes',
  infoLine(feeder({ weight_today_entity: undefined, portion_weight_entity: undefined }), 'Portions today'), '12 portion');

// The state is worked out, like a fridge's health.
check('gamelle : une erreur passe devant tout',
  stateLine(feeder({}, { 'binary_sensor.croquettes_error': { state: 'on', attributes: {} } })), 'Error');
const fBusy = feeder({ state_entity: 'binary_sensor.wifi_feeder_alimentation' },
  { 'binary_sensor.wifi_feeder_alimentation': { state: 'on', attributes: {} } });
check('gamelle : une distribution en cours se lit', stateLine(fBusy), 'Dispensing');
check('gamelle : et les croquettes tombent', machineCls(fBusy).includes('feeding'), true);
contains('gamelle : elles tombent vraiment', fBusy, 'animation: pf-fall');
// They fall in front of the bowl, or the bowl would hide the whole fall.
check('gamelle : la chute passe devant la gamelle',
  fBusy.indexOf('class="pf-fall"') > fBusy.indexOf('class="pf-bowl"'), true);
check('gamelle : au repos rien ne tombe', machineCls(fIn).includes('feeding'), false);

// An empty tank: the one thing a feeder cannot fix by itself, so it takes the
// state line rather than hiding in a reading.
const fEmpty = feeder({ level_entity: 'binary_sensor.no_food' },
  { 'binary_sensor.no_food': { state: 'on', attributes: {} } });
check('gamelle : un contact de manque annonce le reservoir vide', stateLine(fEmpty), 'Tank empty');
check('gamelle : et la tremie se vide sur le dessin', machineCls(fEmpty).includes('empty'), true);
check('gamelle : le tas disparait alors', /\.machine\.empty \.pf-heap \{ display: none; \}/.test(fEmpty), true);
check('gamelle : contact ferme, rien a signaler',
  /class="state-line"/.test(feeder({ level_entity: 'binary_sensor.no_food' },
    { 'binary_sensor.no_food': { state: 'off', attributes: {} } })), false);
// A percentage fills the hopper, and empties it at the bottom.
const fLevel = (pct, extra) => feeder({ level_entity: 'sensor.food_level', ...extra },
  { 'sensor.food_level': { state: String(pct), attributes: { unit_of_measurement: '%' } } });
check('gamelle : le niveau remplit la tremie', /--pf-fill:15\.0px/.test(fLevel(50)), true);
check('gamelle : plein, elle est pleine', /--pf-fill:26\.0px/.test(fLevel(100)), true);
check('gamelle : le niveau fait une ligne', infoLine(fLevel(50), 'Food level'), '50\u00a0%');
check('gamelle : a zero le reservoir est vide', stateLine(fLevel(0)), 'Tank empty');
check('gamelle : et le seuil se regle', stateLine(fLevel(4, { level_empty_below: '5' })), 'Tank empty');
check('gamelle : au-dessus du seuil, le niveau seulement', stateLine(fLevel(6, { level_empty_below: '5' })), 'Tank at 6%');
check('gamelle : sans niveau, pas de hauteur imposee', /style="--pf-fill/.test(fIn), false);

// A tank counted in grams, as the Tuya feeders report it: the reading is what
// is left, and 729 g says nothing about how full the hopper is until the
// tank's capacity is known. The reading is shown either way.
const fGrams = (g, extra) => feeder({ level_entity: 'sensor.food_left', ...extra },
  { 'sensor.food_left': { state: String(g), attributes: { unit_of_measurement: 'g' } } });
check('grammes : la ligne montre le poids', infoLine(fGrams(729), 'Food level'), '729\u00a0g');
check('grammes : sans contenance, aucune hauteur imposee', /style="--pf-fill/.test(fGrams(729)), false);
check('grammes : avec la contenance, la tremie se remplit', /--pf-fill:20\.6px/.test(fGrams(729, { level_max: '964' })), true);
check('grammes : presque vide, presque plate', /--pf-fill:4\.7px/.test(fGrams(30, { level_max: '964' })), true);
check('grammes : le seuil de vide reste dans l\'unite du capteur',
  stateLine(fGrams(60, { level_empty_below: '100' })), 'Tank empty');
check('grammes : au-dessus du seuil, rien a signaler',
  /class="state-line"/.test(fGrams(200, { level_empty_below: '100' })), false);
// A reading with no unit at all keeps being read as a percentage, as before.
check('niveau sans unite : toujours un pourcentage',
  /--pf-fill:15\.0px/.test(feeder({ level_entity: 'sensor.food_level' },
    { 'sensor.food_level': { state: '50', attributes: {} } })), true);

// A fault code names which fault it is, and zero is the only value that says
// there is none: a feeder reporting 1 is jammed, not ready.
const fFault = (code) => feeder({}, { 'binary_sensor.croquettes_error': { state: String(code), attributes: {} } });
check('code de defaut : zero ne signale rien', /class="state-line"/.test(fFault(0)), false);
check('code de defaut : un code non nul est une erreur', stateLine(fFault(1)), 'Error');
check('code de defaut : et le chat vient le dire', /class="pf-cat"/.test(fFault(2)), true);
check('code de defaut : un bourrage nomme se lit aussi', stateLine(fFault('food_jam')), 'Error');
check('code de defaut : une entite muette ne crie pas', /class="state-line"/.test(fFault('unknown')), false);

// The appliance colour paints the machine: lid, dispenser, foot and bowl, the
// bowl a shade under the body so it keeps its own shape. The hopper is clear
// plastic on every one of these machines and stays out of it, or a black
// feeder would show black kibble in a black tank.
check('couleur : le bloc distributeur suit la couleur de l\'appareil',
  /\.pf-unit \{[^}]*background: var\(--ac-body,/.test(fIn), true);
check('couleur : le couvercle aussi',
  /\.pf-lid \{[^}]*background: var\(--ac-body-lo,/.test(fIn), true);
check('couleur : et le pied',
  /\.pf-base \{[^}]*background: var\(--ac-body-lo,/.test(fIn), true);
check('couleur : la gamelle, d\'un ton en dessous',
  /\.pf-bowl \{[^}]*background: var\(--ac-body-lo,/.test(fIn), true);
check('couleur : la tremie reste du plastique clair',
  /\.pf-body \{[^}]*--ac-body/.test(fIn), false);

// The body is drawn long enough to meet the bowl: one moulded piece rather
// than a block floating above a dish. Read from the CSS instead of pinned to a
// number, so moving either one has to keep them touching.
function cssPx(html, selector, prop) {
  const block = new RegExp(`\\${selector} \\{([^}]*)\\}`).exec(html);
  const m = block && new RegExp(`${prop}: (-?[\\d.]+)px`).exec(block[1]);
  return m ? parseFloat(m[1]) : null;
}
const machineH = cssPx(fIn, '.machine', 'height');
const unitBottom = cssPx(fIn, '.pf-unit', 'top') + cssPx(fIn, '.pf-unit', 'height');
const bowlTop = machineH - cssPx(fIn, '.pf-bowl', 'bottom') - cssPx(fIn, '.pf-bowl', 'height');
check('dessin : le corps descend jusqu\'au haut de la gamelle', unitBottom, bowlTop);

// Lines you add come under the ones the card reads on its own, and they carry
// their entity like every other line: a tap opens its dialog, which is how a
// tank or a dessicant gets reset from the card itself.
const fExtra = feeder({ info_entities: [{ entity: 'sensor.dessicant', label: 'Dessicant' }] },
  { 'sensor.dessicant': { state: '38', attributes: { unit_of_measurement: 'd' } } });
check('ligne ajoutee : elle passe sous les lignes de la carte',
  fExtra.indexOf('Dessicant') > fExtra.indexOf('Portions today'), true);
check('ligne ajoutee : un appui ouvre sa fiche',
  /data-more="sensor\.dessicant"/.test(fExtra), true);
check('ligne de la carte : cliquable elle aussi',
  /data-more="sensor\.croquettes_portions_per_day"/.test(fIn), true);

// lines_order names the lines you want first. Every line carries a key, the
// ones you add carry their entity id, and what the list leaves out keeps the
// order the card gave it.
const ORDER_IN = { ...CFG_IN, level_entity: 'sensor.food_level',
  info_entities: [{ entity: 'sensor.dessicant', label: 'Dessicant' }] };
const ORDER_ST = { ...FEEDER_IN,
  'sensor.food_level': { state: '50', attributes: { unit_of_measurement: '%' } },
  'sensor.dessicant': { state: '38', attributes: { unit_of_measurement: 'd' } } };
const ordered = (order) => {
  const html = render(order ? { ...ORDER_IN, lines_order: order } : ORDER_IN, ORDER_ST);
  return [...html.matchAll(/<span class="label">([^<]*)<\/span>/g)].map((m) => m[1]);
};
check('ordre : sans liste, l\'ordre de la carte',
  ordered().slice(0, 3).join(' | '), 'Food level | Portions today | Last feed');
check('ordre : une seule cle suffit a remonter sa ligne',
  ordered(['sensor.dessicant'])[0], 'Dessicant');
check('ordre : le reste garde sa place',
  ordered(['sensor.dessicant']).slice(1, 3).join(' | '), 'Food level | Portions today');
check('ordre : plusieurs cles, dans l\'ordre demande',
  ordered(['last_feed', 'level']).slice(0, 2).join(' | '), 'Last feed | Food level');
check('ordre : une cle qui ne s\'affiche pas est ignoree',
  ordered(['door', 'level'])[0], 'Food level');
check('ordre : une cle inconnue ne casse rien',
  ordered(['zzz', 'level'])[0], 'Food level');
check('ordre : une liste vide laisse la carte tranquille',
  ordered([]).join(' | '), ordered().join(' | '));
// An error that names itself reads as what it is.
check('gamelle : une erreur qui dit vide se lit vide',
  stateLine(feeder({}, { 'binary_sensor.croquettes_error': { state: 'no_food', attributes: {} } })), 'Tank empty');
check('gamelle : une erreur muette reste une erreur',
  stateLine(feeder({}, { 'binary_sensor.croquettes_error': { state: 'on', attributes: {} } })), 'Error');
check('gamelle : une vraie erreur passe devant un niveau bas',
  stateLine(feeder({ level_entity: 'binary_sensor.no_food' },
    { 'binary_sensor.croquettes_error': { state: 'on', attributes: {} },
      'binary_sensor.no_food': { state: 'on', attributes: {} } })), 'Error');

// The cat says it too, since a state line in a list is easy to miss: it shows
// up for an empty tank and for a jam, with the red triangle.
const fJam = feeder({}, { 'binary_sensor.croquettes_error': { state: 'on', attributes: {} } });
check('chat : il vient voir quand le reservoir est vide', /class="pf-cat"/.test(fEmpty), true);
check('chat : et quand c\'est bloque', /class="pf-cat"/.test(fJam), true);
check('chat : le triangle rouge avec lui', /class="pf-alert"/.test(fJam), true);
check('chat : rien a signaler, pas de chat', /class="pf-cat"/.test(fIn), false);
check('chat : ni de triangle', /class="pf-alert"/.test(fIn), false);
check('chat : pas de chat pendant une distribution', /class="pf-cat"/.test(fBusy), false);
// A jam is not an empty tank: the kibble is still there, and the drawing says so.
check('blocage : la tremie reste pleine', machineCls(fJam).includes('empty'), false);
check('blocage : le reservoir vide, lui, se vide', machineCls(fEmpty).includes('empty'), true);

// The last meal, from whichever source can prove one happened.
check('gamelle : le compteur donne l\'heure du dernier repas', infoLine(fIn, 'Last feed'), HHMM(1800e3));
check('gamelle : et c\'est une heure', /^\d{1,2}:\d{2}/.test(infoLine(fIn, 'Last feed')), true);
check('gamelle : a zero, le compteur ne prouve rien',
  infoLine(feeder({}, { 'sensor.croquettes_portions_per_day': { state: '0', attributes: {}, last_changed: AGO(60e3) } }), 'Last feed'), null);
check('gamelle : un select seul ne prouve rien non plus',
  infoLine(feeder({ portions_today_entity: undefined, weight_today_entity: undefined }), 'Last feed'), null);
// A script says when it last ran, whatever asked it to, which is how a feeder
// triggered from HomeKit still shows its meal.
const fScript = render({ appliance_type: 'pet_feeder', start_entity: 'script.distribuer_chat_exterieur',
    portions_today_entity: 'sensor.distributions_du_jour' },
  { 'script.distribuer_chat_exterieur': { state: 'off', attributes: { last_triggered: AGO(7200e3) } },
    'sensor.distributions_du_jour': { state: '2', attributes: {}, last_changed: AGO(7100e3) } });
// The script ran at 08:00 and the counter moved a minute later: the most
// recent of the two is the meal.
check('gamelle : le script et le compteur, le plus recent gagne', infoLine(fScript, 'Last feed'), HHMM(7100e3));
// With nothing served today, the script is the only thing that can answer.
check('gamelle : le script seul date le dernier repas',
  infoLine(render({ appliance_type: 'pet_feeder', start_entity: 'script.s', portions_today_entity: 'sensor.c' },
    { 'script.s': { state: 'off', attributes: { last_triggered: AGO(7200e3) } },
      'sensor.c': { state: '0', attributes: {}, last_changed: AGO(60e3) } }), 'Last feed'), HHMM(7200e3));
check('gamelle : et la plus recente des deux dates gagne',
  infoLine(render({ appliance_type: 'pet_feeder', start_entity: 'script.s', portions_today_entity: 'sensor.c' },
    { 'script.s': { state: 'off', attributes: { last_triggered: AGO(7200e3) } },
      'sensor.c': { state: '2', attributes: {}, last_changed: AGO(600e3) } }), 'Last feed'), HHMM(600e3));
check('gamelle : un bouton porte lui-meme son horodatage',
  infoLine(render({ appliance_type: 'pet_feeder', start_entity: 'button.feed' },
    { 'button.feed': { state: AGO(5400e3), attributes: {} } }), 'Last feed'), HHMM(5400e3));
check('gamelle : une entite d\'horodatage passe aussi',
  infoLine(render({ appliance_type: 'pet_feeder', start_entity: 'button.feed', last_feed_entity: 'sensor.last' },
    { 'button.feed': { state: 'unknown', attributes: {} },
      'sensor.last': { state: AGO(900e3), attributes: { device_class: 'timestamp' } } }), 'Last feed'), HHMM(900e3));

// Yesterday's meal has to say so: "04:30" on its own would read as this
// morning, so an older one carries its date as well.
{
  const older = infoLine(render({ appliance_type: 'pet_feeder', start_entity: 'button.feed' },
    { 'button.feed': { state: AGO(30 * 3600e3), attributes: {} } }), 'Last feed');
  check('gamelle : un repas d\'un autre jour ne se lit pas comme une heure', older === HHMM(30 * 3600e3), false);
  check('gamelle : il porte sa date', /\d{2}.\d{2}/.test(older), true);
}

// Three entities must read as well as ten.
const fOut = render({ appliance_type: 'pet_feeder', start_entity: 'script.distribuer_chat_exterieur',
    portions_today_entity: 'sensor.distributions_du_jour', state_entity: 'binary_sensor.wifi_feeder_alimentation' },
  { 'script.distribuer_chat_exterieur': { state: 'off', attributes: {} },
    'sensor.distributions_du_jour': { state: '0', attributes: {} },
    'binary_sensor.wifi_feeder_alimentation': { state: 'off', attributes: {} } });
check('gamelle nue : rien a dire au repos', /class="state-line"/.test(fOut), false);
check('gamelle nue : son compteur du jour', infoLine(fOut, 'Portions today'), '0 portions');
check('gamelle nue : aucune ligne vide', (fOut.match(/<span class="label">/g) || []).length, 1);
check('gamelle nue : elle garde son bouton', /data-entity="script.distribuer_chat_exterieur"/.test(fOut), true);

// A feeder reports nothing while it waits, so it is allowed to have no state
// entity at all, exactly like a fridge.
check('gamelle : une config sans entite d\'etat passe', accepts({ appliance_type: 'pet_feeder', start_entity: 'script.s' }), true);
check('gamelle : un compteur seul suffit aussi', accepts({ appliance_type: 'pet_feeder', portions_today_entity: 'sensor.c' }), true);
check('gamelle : mais un lave-linge exige toujours son etat', accepts({ appliance_type: 'washer' }), false);

// == Pet feeder, second round (HACF): the tank's level, a second model =========
// "Ready" is what a feeder is nearly all day long, so it said nothing. At rest
// the state line reads how full the tank is when that is known, and nothing at
// all otherwise; serving, empty and a fault keep their own words.
check('reservoir : le pourcentage remplace le pret', stateLine(fLevel(50)), 'Tank at 50%');
check('reservoir : en grammes, avec la contenance', stateLine(fGrams(729, { level_max: '964' })), 'Tank at 76%');
check('reservoir : arrondi a l\'unite', stateLine(fLevel(73.6)), 'Tank at 74%');
check('reservoir : jamais plus de cent', stateLine(fGrams(1200, { level_max: '964' })), 'Tank at 100%');
check('reservoir : en grammes sans contenance, rien a dire', /class="state-line"/.test(fGrams(729)), false);
check('reservoir : sans niveau, pas de ligne d\'etat du tout', /class="state-line"/.test(fIn), false);
check('reservoir : un contact de niveau ne donne pas de pourcentage',
  /class="state-line"/.test(feeder({ level_entity: 'binary_sensor.no_food' },
    { 'binary_sensor.no_food': { state: 'off', attributes: {} } })), false);
const LEVEL50 = { 'sensor.food_level': { state: '50', attributes: { unit_of_measurement: '%' } } };
check('reservoir : la distribution garde son mot',
  stateLine(feeder({ state_entity: 'binary_sensor.busy', level_entity: 'sensor.food_level' },
    { ...LEVEL50, 'binary_sensor.busy': { state: 'on', attributes: {} } })), 'Dispensing');
check('reservoir : le vide garde le sien', stateLine(fLevel(0)), 'Tank empty');
check('reservoir : et l\'erreur aussi',
  stateLine(feeder({ level_entity: 'sensor.food_level' },
    { ...LEVEL50, 'binary_sensor.croquettes_error': { state: 'on', attributes: {} } })), 'Error');
check('reservoir : l\'etat brut reste l\'etat brut',
  stateLine(feeder({ state_entity: 'sensor.feeder_state', state_show_raw: true, level_entity: 'sensor.food_level' },
    { ...LEVEL50, 'sensor.feeder_state': { state: 'standby', attributes: {} } })), 'standby');
// In the card's own language, and with the space French puts before the sign.
check('reservoir : dans la langue de la carte',
  stateLine(feeder({ language: 'fr', level_entity: 'sensor.food_level' },
    { 'sensor.food_level': { state: '74', attributes: { unit_of_measurement: '%' } } })), 'Réservoir à 74 %');

// The other family of feeders, the one in the photo on the forum: a round tank
// of smoked plastic on a round base, the bowl set down in front of it rather
// than built in. The tower stays the default.
const fCan = (level, extra, more) => feeder({ feeder_layout: 'canister', level_entity: 'sensor.food_level', ...extra },
  { 'sensor.food_level': { state: String(level), attributes: { unit_of_measurement: '%' } }, ...more });
const can50 = fCan(50);
check('rond : le modele se choisit', machineCls(can50).split(' ').includes('canister'), true);
check('rond : reservoir, couvercle, socle, boutons, trappe et gamelle',
  ['pfc-tank', 'pfc-lid', 'pfc-base', 'pfc-panel', 'pfc-chute', 'pfc-bowl', 'pfc-dish']
    .filter(c => !can50.includes(`class="${c}"`)).join(' '), '');
check('rond : rien de la tour',
  ['pf-lid', 'pf-body', 'pf-unit', 'pf-bowl', 'pf-base'].filter(c => can50.includes(`class="${c}"`)).join(' '), '');
check('rond : la tour reste le modele par defaut',
  /class="pf-unit"/.test(fIn) && !machineCls(fIn).split(' ').includes('canister'), true);
check('rond : la tour se nomme aussi', /class="pf-unit"/.test(feeder({ feeder_layout: 'tower' })), true);
check('rond : un modele inconnu reste une tour', /class="pf-unit"/.test(feeder({ feeder_layout: 'zzz' })), true);
// Its tank is taller, so the same level makes a taller heap.
check('rond : a moitie plein', /--pf-fill:21\.0px/.test(can50), true);
check('rond : plein', /--pf-fill:38\.0px/.test(fCan(100)), true);
check('rond : la tour garde sa hauteur', /--pf-fill:15\.0px/.test(fLevel(50)), true);
check('rond : vide, le reservoir se vide', machineCls(fCan(0)).includes('empty'), true);
check('rond : et son tas disparait', /\.machine\.empty \.pfc-heap \{ display: none; \}/.test(can50), true);

// The kibble leaves the dark mouth and lands on the heap at the top of the
// bowl. Read from the CSS, so moving the chute or the bowl has to keep the
// fall on both.
{
  const px = (sel, prop) => cssPx(can50, sel, prop);
  const H = px('.machine', 'height');
  const chuteTop = px('.pfc-base', 'top') + px('.pfc-chute', 'top');
  const chuteBottom = chuteTop + px('.pfc-chute', 'height');
  const fallTop = px('.machine.canister .pf-fall i', 'top');
  const drop = Number((/@keyframes pfc-fall \{[\s\S]*?100% \{ opacity: 0; transform: translateY\(([\d.]+)px\); \}/.exec(can50) || [])[1]);
  const dot = px('.pf-fall i', 'height');
  const heapTop = H - px('.pfc-dish', 'bottom') - px('.pfc-dish', 'height') + px('.pfc-dish::before', 'top');
  const rim = H - px('.pfc-bowl', 'bottom') - px('.pfc-bowl', 'height');
  check('rond : les croquettes partent de la bouche noire', fallTop >= chuteTop && fallTop < chuteBottom, true);
  contains('rond : avec sa propre chute', can50, '.machine.canister.feeding .pf-fall i { animation-name: pfc-fall; }');
  check('rond : et finissent sur le haut de la gamelle',
    fallTop + drop + dot >= heapTop && fallTop + drop + dot <= rim, true);
  check('rond : juste au-dessus de son bord', fallTop + drop + dot >= rim - 2, true);
  const fallLeft = px('.machine.canister .pf-fall i', 'left');
  const bowlLeft = px('.pfc-bowl', 'left');
  check('rond : au-dessus de la gamelle', fallLeft >= bowlLeft && fallLeft + dot <= bowlLeft + px('.pfc-bowl', 'width'), true);
  check('rond : la gamelle posee devant, a gauche du socle', bowlLeft < px('.pfc-base', 'left'), true);
}

// White by default, the way these are sold; the appliance colour paints the
// base, the lid and the bowl, never the smoked tank.
check('rond : blanc par defaut', /\.pfc-lid \{[^}]*background: var\(--ac-body-hi, #ffffff\)/.test(can50), true);
check('rond : la couleur de l\'appareil peint le socle', /\.pfc-base \{[^}]*var\(--ac-body,/.test(can50), true);
check('rond : et la gamelle', /\.pfc-bowl \{[^}]*var\(--ac-body,/.test(can50), true);
check('rond : le reservoir reste en plastique fume', /\.pfc-tank \{[^}]*--ac-body/.test(can50), false);

const canEmpty = fCan(0);
check('rond : le chat vient aussi', /class="pf-cat"/.test(canEmpty), true);
check('rond : a droite du socle, la gamelle etant a gauche',
  /\.machine\.canister \.pf-cat \{ left: auto; right: 0; \}/.test(canEmpty), true);
check('rond : son triangle le suit', /\.machine\.canister \.pf-alert \{ left: auto; right: 12px; \}/.test(canEmpty), true);
const canBusy = fCan(50, { state_entity: 'binary_sensor.busy' }, { 'binary_sensor.busy': { state: 'on', attributes: {} } });
check('rond : les croquettes tombent', machineCls(canBusy).includes('feeding'), true);
check('rond : devant la gamelle', canBusy.indexOf('class="pf-fall"') > canBusy.indexOf('class="pfc-bowl"'), true);
// The model alone says it is a feeder, like a fridge's layout says fridge.
check('rond : le modele suffit a la config', accepts({ feeder_layout: 'canister' }), true);
check('rond : et designe seul un distributeur', (() => {
  try {
    return machineCls(render({ feeder_layout: 'canister', start_entity: 'script.s' }, { 'script.s': { state: 'off', attributes: {} } }))
      .includes('canister');
  } catch { return 'refusee'; }
})(), true);

// == The control that is not a button =========================================
// Aqara dispenses from a select set to START, Tuya from a number written with
// a number of portions. A card that only knew how to press buttons would be
// tied to one brand, which is the one thing this card refuses to be.

const pressed = (config, states) => {
  const calls = [];
  const c = new Card();
  c.setConfig({ type: 'custom:ha-appliance-card', ...config });
  c._hass = { ...HASS(states), callService: (domain, service, data) => calls.push({ domain, service, data }) };
  c._render();
  c._call(config.start_entity, { option: config.start_option, value: config.start_value });
  return { card: c, calls };
};

const oneOption = pressed({ appliance_type: 'pet_feeder', start_entity: 'select.croquettes_feed' },
  { 'select.croquettes_feed': { state: '', attributes: { options: ['', 'START'] } } });
check('commande : un select est choisi, pas bascule', oneOption.calls.at(-1)?.service, 'select_option');
check('commande : sur son domaine', oneOption.calls.at(-1)?.domain, 'select');
check('commande : l\'option unique est trouvee toute seule',
  oneOption.calls.at(-1)?.data?.option, 'START');

const twoOptions = pressed({ appliance_type: 'pet_feeder', start_entity: 'select.feed' },
  { 'select.feed': { state: 'manual', attributes: { options: ['manual', 'schedule'] } } });
check('commande : deux options sans choix n\'appellent rien', twoOptions.calls.length, 0);
check('commande : elles ouvrent la fiche', twoOptions.card.events.at(-1)?.type, 'hass-more-info');
const chosen = pressed({ appliance_type: 'pet_feeder', start_entity: 'select.feed', start_option: 'schedule' },
  { 'select.feed': { state: 'manual', attributes: { options: ['manual', 'schedule'] } } });
check('commande : l\'option configuree est prise', chosen.calls.at(-1)?.data?.option, 'schedule');

const written = pressed({ appliance_type: 'pet_feeder', start_entity: 'number.wifi_feeder_distribuer', start_value: '3' },
  { 'number.wifi_feeder_distribuer': { state: '3', attributes: { min: 1, max: 12 } } });
check('commande : un number est ecrit', written.calls.at(-1)?.service, 'set_value');
check('commande : avec la valeur demandee, en nombre', written.calls.at(-1)?.data?.value, 3);
const noValue = pressed({ appliance_type: 'pet_feeder', start_entity: 'number.wifi_feeder_distribuer' },
  { 'number.wifi_feeder_distribuer': { state: '3', attributes: {} } });
check('commande : sans valeur, rien n\'est ecrit', noValue.calls.length, 0);
check('commande : la fiche s\'ouvre a la place', noValue.card.events.at(-1)?.type, 'hass-more-info');

const scripted = pressed({ appliance_type: 'pet_feeder', start_entity: 'script.distribuer_chat_exterieur' },
  { 'script.distribuer_chat_exterieur': { state: 'off', attributes: {} } });
check('commande : un script est toujours lance', scripted.calls.at(-1)?.service, 'turn_on');
// Plenty of feeders are served by an automation, which a toggle would switch
// off instead of running.
const automated = pressed({ appliance_type: 'pet_feeder', start_entity: 'automation.feed_the_cat' },
  { 'automation.feed_the_cat': { state: 'on', attributes: {} } });
check('commande : une automation est declenchee', automated.calls.at(-1)?.service, 'trigger');
check('commande : et pas basculee', automated.calls.at(-1)?.domain, 'automation');
check('gamelle : une automation date aussi le dernier repas',
  infoLine(render({ appliance_type: 'pet_feeder', start_entity: 'automation.feed_the_cat' },
    { 'automation.feed_the_cat': { state: 'on', attributes: { last_triggered: AGO(3600e3) } } }), 'Last feed'), HHMM(3600e3));
const buttoned = pressed({ appliance_type: 'washer', state_entity: 'sensor.w', start_entity: 'button.start' },
  { 'sensor.w': { state: 'Idle', attributes: {} }, 'button.start': { state: 'unknown', attributes: {} } });
check('commande : un bouton est toujours presse', buttoned.calls.at(-1)?.service, 'press');

// The whole click path, and not just the service call underneath it: the
// button carries the option, the handler has to hand it over.
{
  const calls = [];
  const c = new Card();
  c.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'pet_feeder',
    start_entity: 'select.feed', start_option: 'schedule' });
  c._hass = { ...HASS({ 'select.feed': { state: 'manual', attributes: { options: ['manual', 'schedule'] } } }),
    callService: (domain, service, data) => calls.push({ domain, service, data }) };
  c._render();
  const btn = c._root.querySelectorAll('.action-btn, .light-badge')
    .find(n => n.getAttribute('data-entity') === 'select.feed');
  check('clic : le bouton de distribution existe', !!btn, true);
  fire(btn, 'click', { stopPropagation() {} });
  check('clic : il choisit l\'option portee par le bouton', calls.at(-1)?.data?.option, 'schedule');
  check('clic : sur la bonne entite', calls.at(-1)?.data?.entity_id, 'select.feed');
}
{
  const calls = [];
  const c = new Card();
  c.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'pet_feeder',
    start_entity: 'number.portions', start_value: '4' });
  c._hass = { ...HASS({ 'number.portions': { state: '1', attributes: {} } }),
    callService: (domain, service, data) => calls.push({ domain, service, data }) };
  c._render();
  const btn = c._root.querySelectorAll('.action-btn, .light-badge')
    .find(n => n.getAttribute('data-entity') === 'number.portions');
  fire(btn, 'click', { stopPropagation() {} });
  check('clic : il ecrit la valeur portee par le bouton', calls.at(-1)?.data?.value, 4);
}

// The option travels through the markup, or the click would lose it.
contains('commande : l\'option est portee par le bouton',
  render({ appliance_type: 'pet_feeder', start_entity: 'select.feed', start_option: 'schedule' },
    { 'select.feed': { state: 'manual', attributes: { options: ['manual', 'schedule'] } } }),
  'data-option="schedule"');
contains('commande : la valeur aussi',
  render({ appliance_type: 'pet_feeder', start_entity: 'number.n', start_value: '3' },
    { 'number.n': { state: '1', attributes: {} } }), 'data-value="3"');

// The editor side of the feeder, and of the control that is not a button.
{
  const edFeeder = (cfg = {}) => markup(newEditor({ state_entity: 'sensor.oven_appliance_state',
    appliance_type: 'pet_feeder', ...cfg })._root);
  const feederToggles = (cfg = {}) => [...edFeeder(cfg).matchAll(/data-toggle="([^"]+)"/g)].map(m => m[1]);
  contains('editeur : la gamelle est au choix des types', edFeeder(), 'value="pet_feeder"');
  for (const f of ['portions_today_entity', 'weight_today_entity', 'serving_size_entity',
                   'portion_weight_entity', 'schedule_entity', 'last_feed_entity', 'level_entity', 'error_entity']) {
    check(`editeur gamelle : ${f} est propose`, feederToggles().includes(f), true);
    check(`editeur : ${f} n'est pas sur un lave-linge`, toggles('washer').includes(f), false);
  }
  check('editeur gamelle : le bouton de distribution est propose', feederToggles().includes('start_entity'), true);
  check('editeur gamelle : mais pas la pause', feederToggles().includes('pause_entity'), false);
  check('editeur gamelle : ni le programme', feederToggles().includes('program_entity'), false);
  check('editeur gamelle : ni le temps restant', feederToggles().includes('remaining_time_entity'), false);

  // The start control accepts what a feeder really has. A section only mounts
  // its picker once it holds a value, so each one is opened by giving it one.
  const slotDomains = (field, cfg) => newEditor({ state_entity: 'sensor.oven_appliance_state',
    appliance_type: 'pet_feeder', ...cfg })._root.querySelector(`[data-slot="${field}"]`)
    ?.children.at(-1)?.includeDomains;
  const startDomains = slotDomains('start_entity', { start_entity: 'script.feed' }) || [];
  check('editeur : le depart accepte un select', startDomains.includes('select'), true);
  check('editeur : et un number', startDomains.includes('number'), true);
  check('editeur : il accepte toujours un bouton', startDomains.includes('button'), true);
  check('editeur : et une automation', startDomains.includes('automation'), true);
  // The power switch is a different list: a select cannot be switched on.
  const toggleDomains = slotDomains('toggle_entity', { toggle_entity: 'switch.feeder' }) || [];
  check('editeur : l\'interrupteur, lui, refuse le select', toggleDomains.includes('select'), false);
  check('editeur : et garde ses propres domaines', toggleDomains.includes('switch'), true);
}
{
  // The option is only asked for when there is a choice to make.
  const withSelect = (options) => {
    const ed = new Editor();
    ed.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'pet_feeder', start_entity: 'select.feed' });
    ed.hass = HASS({ 'select.feed': { state: '', attributes: { options } } });
    return markup(ed._root);
  };
  check('editeur : une seule option, rien a demander',
    /data-field="start_option"/.test(withSelect(['', 'START'])), false);
  check('editeur : deux options, le choix est demande',
    /data-field="start_option"/.test(withSelect(['manual', 'schedule'])), true);
  const edNumber = new Editor();
  edNumber.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'pet_feeder', start_entity: 'number.feed' });
  edNumber.hass = HASS({ 'number.feed': { state: '3', attributes: {} } });
  check('editeur : un number demande sa valeur', /data-field="start_value"/.test(markup(edNumber._root)), true);
  const edScript = new Editor();
  edScript.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'pet_feeder', start_entity: 'script.feed' });
  edScript.hass = HASS({ 'script.feed': { state: 'off', attributes: {} } });
  const scripted = markup(edScript._root);
  check('editeur : un script ne demande ni option ni valeur',
    /data-field="start_(option|value)"/.test(scripted), false);
}
{
  // An Aqara over Zigbee2MQTT, named as Zigbee2MQTT names it.
  const ids = ['select.croquettes_feed', 'select.croquettes_mode', 'sensor.croquettes_portions_per_day',
    'sensor.croquettes_weight_per_day', 'number.croquettes_portion_weight', 'number.croquettes_serving_size',
    'sensor.croquettes_feeding_size', 'sensor.croquettes_schedule', 'sensor.croquettes_schedule_pretty',
    'binary_sensor.croquettes_error'];
  const ed = new Editor();
  ed.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'pet_feeder', state_entity: 'binary_sensor.croquettes_error' });
  ed.hass = { ...HASS(Object.fromEntries(ids.map(id => [id, { state: '1', attributes: {} }]))),
    entities: Object.fromEntries(ids.map(id => [id, { device_id: 'aq' }])) };
  const sug = ed.events.at(-1)?.detail?.config || {};
  check('suggestion gamelle : la distribution', sug.start_entity, 'select.croquettes_feed');
  check('suggestion gamelle : les portions du jour', sug.portions_today_entity, 'sensor.croquettes_portions_per_day');
  check('suggestion gamelle : les grammes du jour', sug.weight_today_entity, 'sensor.croquettes_weight_per_day');
  check('suggestion gamelle : le poids d\'une portion', sug.portion_weight_entity, 'number.croquettes_portion_weight');
  check('suggestion gamelle : la taille de la portion', sug.serving_size_entity, 'number.croquettes_serving_size');
  // The raw schedule is a Python repr, which belongs in a template and not on
  // a card: only a readable one is ever suggested.
  check('suggestion gamelle : le planning lisible, pas le brut', sug.schedule_entity, 'sensor.croquettes_schedule_pretty');
}
{
  // A Tuya feeder, which reports almost nothing, driven by a script.
  const ids = ['script.distribuer_chat_exterieur', 'number.wifi_feeder_distribuer',
    'binary_sensor.wifi_feeder_alimentation', 'sensor.croquettes_exterieur_distributions_du_jour'];
  const ed = new Editor();
  ed.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'pet_feeder',
    state_entity: 'binary_sensor.wifi_feeder_alimentation' });
  ed.hass = { ...HASS(Object.fromEntries(ids.map(id => [id, { state: '1', attributes: {} }]))),
    entities: Object.fromEntries(ids.map(id => [id, { device_id: 'tu' }])) };
  const sug = ed.events.at(-1)?.detail?.config || {};
  check('suggestion gamelle : un script fait un declencheur', sug.start_entity, 'script.distribuer_chat_exterieur');
  check('suggestion gamelle : le compteur du jour', sug.portions_today_entity, 'sensor.croquettes_exterieur_distributions_du_jour');
}
// Detection: by name, and by a field no other type has.
check('detection : une gamelle se reconnait a son nom',
  /class="pf-body"/.test(render({ state_entity: 'sensor.croquettes_portions_per_day' },
    { 'sensor.croquettes_portions_per_day': { state: '3', attributes: {} } })), true);
check('detection : un feeder aussi',
  /class="pf-body"/.test(render({ state_entity: 'binary_sensor.wifi_feeder_alimentation' },
    { 'binary_sensor.wifi_feeder_alimentation': { state: 'off', attributes: {} } })), true);
check('detection : un champ de gamelle suffit',
  /class="pf-body"/.test(render({ state_entity: 'sensor.x', portions_today_entity: 'sensor.p' },
    { 'sensor.x': { state: 'off', attributes: {} }, 'sensor.p': { state: '1', attributes: {} } })), true);
check('detection : un lave-linge reste un lave-linge',
  /class="pf-body"/.test(render({ state_entity: 'sensor.washer_state' },
    { 'sensor.washer_state': { state: 'Running', attributes: {} } })), false);

// ── Alert entities (issue #19) ───────────────────────────────────────────────
// Home Connect gives each alert an entity of its own: an enum sensor whose
// states are present, confirmed and off, named after its appliance. Read here
// as Home Assistant stores it, registry included.
const HC_OPTIONS = ['confirmed', 'off', 'present'];
const hcEvent = (state, name, extra = {}) =>
  ({ state, attributes: { friendly_name: `Dishwasher ${name}`, device_class: 'enum', options: HC_OPTIONS, ...extra } });

/** A dishwasher with alert entities, its menu opened unless told otherwise. */
function alertCard(config, states, withRegistry = true, open = true) {
  const all = { 'sensor.dw_state': { state: 'Ready', attributes: { friendly_name: 'Dishwasher Operation state' } }, ...states };
  const c = new Card();
  c.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'dishwasher', state_entity: 'sensor.dw_state', ...config });
  c._hass = { ...HASS(all),
    entities: withRegistry ? Object.fromEntries(Object.keys(all).map(id => [id, { device_id: 'dw' }])) : {},
    devices: withRegistry ? { dw: { name: 'Dishwasher' } } : {} };
  c._alertsOpen = open;
  c._render();
  return c;
}
/** New states for the same card, its registry kept. */
function alertRerender(card, states) {
  card._hass = { ...card._hass, states: { 'sensor.dw_state': card._hass.states['sensor.dw_state'], ...states } };
  card._render();
  return markup(card);
}
/** Every alert shown, alone on the pill or in the menu, as "entity|icon|label". */
const alertRows = h => [...h.matchAll(/<div class="(?:alert-row|alerts-pill) clickable" data-more="([^"]*)"><ha-icon icon="([^"]*)"><\/ha-icon><span class="alert-label">([^<]*)<\/span>/g)]
  .map(m => `${m[1]}|${m[2]}|${m[3]}`);
const alertLabel = (h, i = 0) => (alertRows(h)[i] || '||').split('|')[2];
const alertIcon = (h, i = 0) => (alertRows(h)[i] || '||').split('|')[1];
/** The pill gathering several alerts, as "count|open|caret", or '' without one. */
const alertsPill = h => {
  const m = /<div class="alerts-pill" data-alerts-toggle="1" aria-expanded="(true|false)"><ha-icon icon="mdi:alert-circle"><\/ha-icon><span class="alert-label">([^<]*)<\/span><ha-icon class="caret" icon="([^"]*)"><\/ha-icon><\/div>/.exec(h);
  return m ? `${m[2]}|${m[1]}|${m[3]}` : '';
};
const alertsShown = h => /class="alerts-wrap"/.test(h);
/** Clicks the row the card wired for `id`, and says what the card asked for. */
function clickMore(card, id) {
  const node = card._root.__more?.get(id);
  if (!node?.__handlers?.click) return 'aucun clic';
  let stopped = false;
  node.__handlers.click({ stopPropagation() { stopped = true; } });
  const ev = card.events.at(-1);
  return `${ev?.type} ${ev?.detail?.entityId}${stopped ? '' : ' propage'}`;
}
/** Taps the count as the card wired it, and gives the markup after. */
function tapAlerts(card) {
  const node = card._root.querySelectorAll('[data-alerts-toggle]')[0];
  if (!node?.__handlers?.click) return 'aucun clic';
  let stopped = false;
  node.__handlers.click({ stopPropagation() { stopped = true; } });
  return stopped ? markup(card) : 'propage';
}

{
  const ids = ['sensor.dw_salt_nearly_empty', 'sensor.dw_rinse_aid_nearly_empty', 'sensor.dw_machine_care_reminder'];
  const c = alertCard({ alerts_entities: ids }, {
    'sensor.dw_salt_nearly_empty': hcEvent('present', 'Salt nearly empty'),
    'sensor.dw_rinse_aid_nearly_empty': hcEvent('confirmed', 'Rinse aid nearly empty'),
    'sensor.dw_machine_care_reminder': hcEvent('off', 'Machine care reminder') });
  const h = markup(c);
  check('alertes : deux levees, un compte', alertsPill(h), '2 alerts|true|mdi:chevron-up');
  check('alertes : une ligne par alerte levee, dans l\'ordre donne', alertRows(h).join(' / '),
    'sensor.dw_salt_nearly_empty|mdi:alert-circle|Salt nearly empty / '
    + 'sensor.dw_rinse_aid_nearly_empty|mdi:alert-circle|Rinse aid nearly empty');
  check('alertes : la ligne ouvre son entite', clickMore(c, 'sensor.dw_rinse_aid_nearly_empty'),
    'hass-more-info sensor.dw_rinse_aid_nearly_empty');
  check('alertes : chaque ligne finit par un chevron',
    (h.match(/<\/span><ha-icon class="go" icon="mdi:chevron-right"><\/ha-icon><\/div>/g) || []).length, 2);
  check('alertes : une alerte eteinte n\'a rien a ouvrir', clickMore(c, 'sensor.dw_machine_care_reminder'), 'aucun clic');
  check('alertes : toutes sont surveillees, eteintes comprises',
    ids.every(id => c._watchedEntityIds().includes(id)), true);
}

// Several gather behind their count, closed until tapped.
{
  const two = { 'sensor.dw_a': hcEvent('present', 'Salt nearly empty'), 'sensor.dw_b': hcEvent('present', 'Rinse aid nearly empty') };
  const c = alertCard({ alerts_entities: ['sensor.dw_a', 'sensor.dw_b'] }, two, true, false);
  check('alertes : le menu est ferme au depart', alertsPill(markup(c)), '2 alerts|false|mdi:chevron-down');
  check('alertes : ferme, il ne montre aucune ligne', alertRows(markup(c)).length, 0);
  const opened = tapAlerts(c);
  check('alertes : un toucher l\'ouvre', alertsPill(opened), '2 alerts|true|mdi:chevron-up');
  check('alertes : ouvert, une ligne par alerte', alertRows(opened).length, 2);
  check('alertes : il reste ouvert quand les etats changent', alertsPill(alertRerender(c, two)), '2 alerts|true|mdi:chevron-up');
  check('alertes : un second toucher le referme', alertsPill(tapAlerts(c)), '2 alerts|false|mdi:chevron-down');
  // Down to one and back up to two: the menu starts closed again.
  tapAlerts(c);
  alertRerender(c, { ...two, 'sensor.dw_b': hcEvent('off', 'Rinse aid nearly empty') });
  check('alertes : revenu a deux, le menu est referme', alertsPill(alertRerender(c, two)), '2 alerts|false|mdi:chevron-down');
}

// One shows under its own name, and opens its entity straight away.
{
  const c = alertCard({ alerts_entities: ['sensor.dw_a', 'sensor.dw_b'] },
    { 'sensor.dw_a': hcEvent('present', 'Salt nearly empty'), 'sensor.dw_b': hcEvent('off', 'Rinse aid nearly empty') });
  const h = markup(c);
  check('alertes : une seule se montre sous son nom', alertRows(h).join(''), 'sensor.dw_a|mdi:alert-circle|Salt nearly empty');
  check('alertes : sans compte ni menu', alertsPill(h) + String(/class="alerts-menu"/.test(h)), 'false');
  check('alertes : et un toucher ouvre son entite', clickMore(c, 'sensor.dw_a'), 'hass-more-info sensor.dw_a');
}

// Raised on the words the alerts attributes are read with and on Home
// Connect's two, whatever the case or the spaces around; anything else is off.
const raisedBy = state => alertRows(markup(alertCard({ alerts_entities: ['sensor.dw_a'] },
  { 'sensor.dw_a': hcEvent(state, 'Salt nearly empty') }))).length;
for (const s of ['on', 'true', '1', 'active', 'present', 'confirmed', 'Present', ' on ', 'TRUE']) {
  check(`alertes : "${s}" leve l'alerte`, raisedBy(s), 1);
}
for (const s of ['off', 'false', '0', 'inactive', 'no', 'unavailable', 'unknown', '', 'Off']) {
  check(`alertes : "${s}" ne leve rien`, raisedBy(s), 0);
}

check('alertes : rien de leve, rien d\'affiche',
  alertsShown(markup(alertCard({ alerts_entities: ['sensor.dw_a'] }, { 'sensor.dw_a': hcEvent('off', 'Salt nearly empty') }))), false);
check('alertes : une entite absente ne dessine rien',
  alertsShown(markup(alertCard({ alerts_entities: ['sensor.dw_ghost'] }, {}))), false);
check('alertes : une entite seule, sans liste',
  alertRows(markup(alertCard({ alerts_entities: 'sensor.dw_a' }, { 'sensor.dw_a': hcEvent('present', 'Salt nearly empty') }))).length, 1);
check('alertes : les entrees vides sont sautees',
  alertRows(markup(alertCard({ alerts_entities: [null, '', { label: 'Sans entite' }, 'sensor.dw_a'] },
    { 'sensor.dw_a': hcEvent('present', 'Salt nearly empty') }))).join(''),
  'sensor.dw_a|mdi:alert-circle|Salt nearly empty');
check('alertes : les entrees vides ne comptent pas dans les huit',
  alertRows(markup(alertCard({ alerts_entities: ['', '', '', '', '', '', '', '', 'sensor.dw_a'] },
    { 'sensor.dw_a': hcEvent('present', 'Salt nearly empty') }))).length, 1);

// The name: the one given, else the entity's without the appliance's, which
// Home Connect puts in front of every entity.
{
  const one = (config, withRegistry = true, attrs = {}) => markup(alertCard({ alerts_entities: ['sensor.dw_a'], ...config },
    { 'sensor.dw_a': hcEvent('present', 'Salt nearly empty', attrs) }, withRegistry));
  check('alertes : le nom de l\'appareil est retire, lu dans le registre', alertLabel(one({})), 'Salt nearly empty');
  check('alertes : sans registre, le nom reste entier', alertLabel(one({}, false)), 'Dishwasher Salt nearly empty');
  check('alertes : ou sans le nom de la carte, s\'il le porte', alertLabel(one({ name: 'Dishwasher' }, false)), 'Salt nearly empty');
  check('alertes : sans nom du tout, l\'identifiant lisible',
    alertLabel(markup(alertCard({ alerts_entities: ['binary_sensor.salt_low'] },
      { 'binary_sensor.salt_low': { state: 'on', attributes: {} } }, false))), 'Salt Low');
  check('alertes : le libelle donne l\'emporte',
    alertLabel(one({ alerts_entities: [{ entity: 'sensor.dw_a', label: 'Sel a remettre' }] })), 'Sel a remettre');
  check('alertes : l\'icone donnee l\'emporte',
    alertIcon(one({ alerts_entities: [{ entity: 'sensor.dw_a', icon: 'mdi:shaker-outline' }] }, true, { icon: 'mdi:water' })),
    'mdi:shaker-outline');
  check('alertes : sinon celle de l\'entite', alertIcon(one({}, true, { icon: 'mdi:water' })), 'mdi:water');
  check('alertes : sinon le rond d\'alerte', alertIcon(one({})), 'mdi:alert-circle');
  check('alertes : une entree avec libelle est surveillee aussi',
    alertCard({ alerts_entities: [{ entity: 'sensor.dw_a', label: 'Sel' }] }, {})._watchedEntityIds().includes('sensor.dw_a'), true);
}

// The alerts entity's attributes count as well, first, each opening that entity.
{
  const c = alertCard({ alerts_entity: 'sensor.dw_alerts', alerts_entities: ['sensor.dw_a'] }, {
    'sensor.dw_alerts': { state: 'on', attributes: { door_open: 'on' } },
    'sensor.dw_a': hcEvent('present', 'Salt nearly empty') });
  const h = markup(c);
  check('alertes : les attributs comptent aussi', alertsPill(h).split('|')[0], '2 alerts');
  check('alertes : en premier, chacun ouvrant son entite', alertRows(h).join(' / '),
    'sensor.dw_alerts|mdi:alert-circle|door_open / sensor.dw_a|mdi:alert-circle|Salt nearly empty');
  check('alertes : la ligne d\'attribut ouvre l\'entite d\'alertes', clickMore(c, 'sensor.dw_alerts'), 'hass-more-info sensor.dw_alerts');
  contains('alertes : une pastille centree', h, '.alerts-wrap { margin-top: 12px; display: flex; flex-direction: column; align-items: center; }');
  contains('alertes : rouge sur fond rouge pale', h, 'background: rgba(244, 67, 54, 0.12); color: var(--error-color, #f44336);');
  contains('alertes : le menu se detache de la carte', h, 'box-shadow: 0 4px 14px rgba(0, 0, 0, 0.16), 0 1px 3px rgba(0, 0, 0, 0.1);');
  contains('alertes : une ligne du menu s\'etire', h, '.alert-row .alert-label { flex: 1; min-width: 0; }');
}
check('alertes : un attribut seul se montre sous son nom',
  alertRows(markup(alertCard({ alerts_entity: 'sensor.dw_alerts' }, { 'sensor.dw_alerts': { state: 'on', attributes: { door_open: 'on' } } }))).join(''),
  'sensor.dw_alerts|mdi:alert-circle|door_open');

// Eight at most, drawn and watched, like the info lines.
{
  const ids = Array.from({ length: 9 }, (_, i) => `sensor.dw_alert_${i + 1}`);
  const c = alertCard({ alerts_entities: ids }, Object.fromEntries(ids.map(id => [id, hcEvent('present', 'Alert')])));
  check('alertes : huit au plus', alertRows(markup(c)).length, 8);
  check('alertes : et huit comptees', alertsPill(markup(c)).split('|')[0], '8 alerts');
  check('alertes : la huitieme est surveillee', c._watchedEntityIds().includes('sensor.dw_alert_8'), true);
  check('alertes : la neuvieme ni dessinee ni surveillee',
    c._watchedEntityIds().includes('sensor.dw_alert_9') || markup(c).includes('sensor.dw_alert_9'), false);
}

// The count in each language's own plural: Russian, Polish and Czech do not
// agree 2 and 5 alike.
{
  const count = (language, n) => {
    const ids = Array.from({ length: n }, (_, i) => `sensor.dw_p${i}`);
    return alertsPill(markup(alertCard({ language, alerts_entities: ids },
      Object.fromEntries(ids.map(id => [id, hcEvent('present', 'P')])), true, false))).split('|')[0];
  };
  check('alertes : 2 en francais', count('fr', 2), '2 alertes');
  check('alertes : 2 en russe', count('ru', 2), '2 оповещения');
  check('alertes : 5 en russe', count('ru', 5), '5 оповещений');
  check('alertes : 2 en polonais', count('pl', 2), '2 alerty');
  check('alertes : 5 en polonais', count('pl', 5), '5 alertów');
  check('alertes : 8 en tcheque', count('cs', 8), '8 upozornění');
  check('alertes : 3 en chinois', count('zh', 3), '3 条警报');
  for (const language of ['de', 'es', 'it', 'nl', 'pt', 'sv', 'no', 'da']) {
    const text = count(language, 3);
    check(`alertes : le compte traduit en ${language}`, /^3 \S/.test(text) && text !== '3 alerts', true);
  }
}

// Every type has them: a pet feeder's desiccant is an alert as much as a
// dishwasher's salt, and a type drawn its own way must not lose it.
for (const type of ['washer', 'dryer', 'dishwasher', 'oven', 'microwave', 'hood', 'cooktop', 'fridge', 'kettle',
  'cooker', 'coffee', 'rice_cooker', 'water_heater', 'boiler', 'heat_pump', 'printer_3d', 'pet_feeder']) {
  check(`alertes : sur ${type} aussi`, alertRows(markup(alertCard({ appliance_type: type, alerts_entities: ['binary_sensor.x_alert'] },
    { 'binary_sensor.x_alert': { state: 'on', attributes: { friendly_name: 'Alerte' } } }))).length, 1);
}

// The info lines still open their entity through the same wiring.
check('lignes d\'info : la ligne ouvre toujours son entite',
  clickMore(alertCard({ info_entities: [{ entity: 'sensor.dw_rinse' }] }, { 'sensor.dw_rinse': { state: '3', attributes: {} } }),
    'sensor.dw_rinse'), 'hass-more-info sensor.dw_rinse');

noInjection('nom d\'alerte', markup(alertCard({ alerts_entities: ['sensor.dw_a'] },
  { 'sensor.dw_a': { state: 'present', attributes: { friendly_name: XSS } } })));
check('icone d\'alerte : aucun attribut onload forme',
  /onload="/i.test(markup(alertCard({ alerts_entities: ['sensor.dw_a'] },
    { 'sensor.dw_a': { state: 'on', attributes: { icon: 'mdi:x" onload="alert(1)' } } }))), false);

// ── The editor: a menu of the appliance's alerts ──
// A Home Connect dishwasher with its events, a door, two binary sensors that
// report a problem and one that does not, a battery level, and a leak sensor
// of another device. Home Connect's two alerts are found on opening.
const ALERT_DEVICE = {
  'sensor.dw_state': [{ state: 'ready', attributes: { friendly_name: 'Dishwasher Operation state' } }, null],
  'binary_sensor.dw_door': [{ state: 'off', attributes: { friendly_name: 'Dishwasher Door', device_class: 'door' } }, null],
  'binary_sensor.dw_leak': [{ state: 'off', attributes: { friendly_name: 'Dishwasher Leak', device_class: 'moisture' } }, null],
  'binary_sensor.dw_filter': [{ state: 'on', attributes: { friendly_name: 'Dishwasher Filter clogged', device_class: 'problem' } }, null],
  'binary_sensor.dw_remote': [{ state: 'on', attributes: { friendly_name: 'Dishwasher Remote control' } }, null],
  'sensor.dw_battery': [{ state: '80', attributes: { friendly_name: 'Dishwasher Battery', device_class: 'battery', unit_of_measurement: '%' } }, null],
  'sensor.dw_salt': [hcEvent('present', 'Salt nearly empty'), 'salt_nearly_empty'],
  'sensor.dw_rinse': [hcEvent('off', 'Rinse aid nearly empty'), 'rinse_aid_nearly_empty'],
  'sensor.dw_finished': [hcEvent('off', 'Program finished'), 'program_finished'],
};
function alertEditor(config = {}, extraStates = {}, extraDevice = {}) {
  const states = { 'binary_sensor.kitchen_leak': { state: 'off', attributes: { friendly_name: 'Kitchen leak', device_class: 'moisture' } },
    ...extraStates };
  const entities = {};
  for (const [id, [st, key]] of Object.entries({ ...ALERT_DEVICE, ...extraDevice })) {
    states[id] = st;
    entities[id] = key ? { device_id: 'dw', translation_key: key } : { device_id: 'dw' };
  }
  const ed = new Editor();
  ed.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'dishwasher', state_entity: 'sensor.dw_state',
    door_entity: 'binary_sensor.dw_door', ...config });
  ed.hass = { ...HASS(states), entities, devices: { dw: { name: 'Dishwasher' } } };
  return ed;
}
/** The menu's entries as "value:text". */
const alertMenu = h => {
  const sel = (/<select data-role="alerts-add-select"[^>]*>([\s\S]*?)<\/select>/.exec(h) || [, ''])[1];
  return [...sel.matchAll(/<option value="([^"]*)">([^<]*)<\/option>/g)].map(m => `${m[1]}:${m[2]}`);
};
/** The alerts chosen, as "icon|name|remove index". */
const alertChoices = h => [...h.matchAll(/<div class="list-choice alerts"><ha-icon icon="([^"]*)"><\/ha-icon><span>([^<]*)<\/span><button type="button" class="list-remove" data-alerts-remove="(\d+)"/g)]
  .map(m => `${m[1]}|${m[2]}|${m[3]}`);
const alertSelect = ed => ed._root.querySelector('[data-role="alerts-add-select"]');
{
  const ed = alertEditor();
  const html = markup(ed._root);
  contains('editeur alertes : un panneau a lui', html, 'data-panel="alerts"');
  check('editeur alertes : ouvert sur les alertes trouvees', /data-panel="alerts" open/.test(html), true);
  check('editeur alertes : les alertes trouvees, dans la liste', alertChoices(html).join(' / '),
    'mdi:alert-circle|Salt nearly empty|0 / mdi:alert-circle|Rinse aid nearly empty|1');
  // Limited: the appliance's own alerts, by name, without its news, its door,
  // what reports no problem, nor anything of another device.
  check('editeur alertes : le menu ne propose que les alertes de l\'appareil', alertMenu(html).join(' / '),
    ':Add an alert… / binary_sensor.dw_filter:Filter clogged / binary_sensor.dw_leak:Leak / __other__:Other entity…');
  check('editeur alertes : la croix se nomme', /class="list-remove" data-alerts-remove="0" title="Remove" aria-label="Remove"/.test(html), true);
  fire(alertSelect(ed), 'change', { target: { value: 'binary_sensor.dw_leak' } });
  checkFired('editeur alertes : choisir dans le menu', ed, ev =>
    check('editeur alertes : ajoutee a la suite, en simple identifiant', (ev?.detail?.config?.alerts_entities || []).join(' '),
      'sensor.dw_salt sensor.dw_rinse binary_sensor.dw_leak'));
  const after = markup(ed._root);
  check('editeur alertes : la liste la montre', alertChoices(after).length, 3);
  check('editeur alertes : le menu ne la propose plus', alertMenu(after).join(' / '),
    ':Add an alert… / binary_sensor.dw_filter:Filter clogged / __other__:Other entity…');
  const events = ed.events.length;
  fire(alertSelect(ed), 'change', { target: { value: '' } });
  check('editeur alertes : le titre du menu ne choisit rien', ed.events.length, events);
}
{
  // The remove buttons, and the key gone with the last alert.
  const ed = alertEditor({ alerts_entities: ['sensor.dw_salt', 'sensor.dw_rinse'] });
  const crosses = ed._root.querySelectorAll('[data-alerts-remove]');
  fire(crosses[0], 'click', {});
  checkFired('editeur alertes : retirer une alerte', ed, ev =>
    check('editeur alertes : elle quitte la liste', (ev?.detail?.config?.alerts_entities || []).join(' '), 'sensor.dw_rinse'));
  check('editeur alertes : et revient dans le menu', alertMenu(markup(ed._root)).some(o => o.startsWith('sensor.dw_salt:')), true);
  const last = alertEditor({ alerts_entities: ['sensor.dw_salt'] });
  fire(last._root.querySelectorAll('[data-alerts-remove]')[0], 'click', {});
  check('editeur alertes : plus d\'alerte, plus de cle', 'alerts_entities' in last._config, false);
}
{
  // Any other entity, through a picker of sensors and binary sensors.
  const ed = alertEditor({ alerts_entities: ['sensor.dw_salt'] });
  check('editeur alertes : pas de selecteur avant d\'en demander un', /data-slot="__alerts_other"/.test(markup(ed._root)), false);
  fire(alertSelect(ed), 'change', { target: { value: '__other__' } });
  check('editeur alertes : autre entite ouvre un selecteur', /data-slot="__alerts_other"/.test(markup(ed._root)), true);
  const picker = ed._root.querySelector('[data-slot="__alerts_other"]').children.at(-1);
  check('editeur alertes : capteurs et capteurs binaires', (picker.includeDomains || []).join(','), 'binary_sensor,sensor');
  check('editeur alertes : le selecteur se nomme', picker.label, 'Entity');
  const events = ed.events.length;
  fire(picker, 'value-changed', { detail: { value: '' } });
  check('editeur alertes : un selecteur vide n\'ajoute rien', ed.events.length, events);
  fire(picker, 'value-changed', { detail: { value: 'binary_sensor.kitchen_leak' } });
  check('editeur alertes : l\'entite choisie s\'ajoute', ed._config.alerts_entities.join(' '), 'sensor.dw_salt binary_sensor.kitchen_leak');
  check('editeur alertes : et le selecteur se referme', /data-slot="__alerts_other"/.test(markup(ed._root)), false);
  fire(alertSelect(ed), 'change', { target: { value: '__other__' } });
  fire(ed._root.querySelector('[data-slot="__alerts_other"]').children.at(-1), 'value-changed', { detail: { value: 'sensor.dw_salt' } });
  check('editeur alertes : une alerte deja choisie ne se double pas', ed._config.alerts_entities.join(' '),
    'sensor.dw_salt binary_sensor.kitchen_leak');
}
{
  const ed = alertEditor({ alerts_entities: ['sensor.dw_salt'], info_entities: [{ entity: 'binary_sensor.dw_leak' }] });
  check('editeur alertes : ce que la carte montre deja n\'est pas propose',
    alertMenu(markup(ed._root)).some(o => o.startsWith('binary_sensor.dw_leak:')), false);
  check('editeur alertes : ni ce qu\'un champ montre',
    alertMenu(markup(alertEditor({ alerts_entities: ['sensor.dw_salt'], alerts_entity: 'binary_sensor.dw_filter' })._root))
      .some(o => o.startsWith('binary_sensor.dw_filter:')), false);
  check('editeur alertes : ouvert sur une liste deja faite',
    /data-panel="alerts" open/.test(markup(alertEditor({ alerts_entities: ['sensor.dw_salt'] })._root)), true);
  const full = alertEditor({ alerts_entities: Array.from({ length: 8 }, (_, i) => `sensor.a${i}`) });
  check('editeur alertes : a huit, le menu se ferme', /<select data-role="alerts-add-select" disabled>/.test(markup(full._root)), true);
  full._addToList('alerts', 'binary_sensor.dw_leak');
  check('editeur alertes : et rien ne s\'y ajoute', full._config.alerts_entities.length, 8);
  const open = alertEditor({ alerts_entities: ['sensor.dw_salt'] });
  check('editeur alertes : sous huit, il reste ouvert', /<select data-role="alerts-add-select">/.test(markup(open._root)), true);
}
{
  const ed = alertEditor({ alerts_entities: [{ entity: 'sensor.dw_salt', label: 'Sel', icon: 'mdi:shaker' }, 'sensor.dw_rinse'] });
  check('editeur alertes : le libelle et l\'icone donnes se voient', alertChoices(markup(ed._root))[0], 'mdi:shaker|Sel|0');
  const cross = ed._root.querySelectorAll('[data-alerts-remove]')[1];
  if (cross) fire(cross, 'click', {});
  check('editeur alertes : et restent quand une autre part', JSON.stringify(ed._config.alerts_entities),
    '[{"entity":"sensor.dw_salt","label":"Sel","icon":"mdi:shaker"}]');
  check('editeur alertes : une entite seule, sans liste',
    alertChoices(markup(alertEditor({ alerts_entities: 'sensor.dw_salt' })._root)).join(''), 'mdi:alert-circle|Salt nearly empty|0');
  // Without a device, the name the card was given comes off, as on the card.
  check('editeur alertes : sans appareil, le nom de la carte s\'efface',
    alertChoices(markup(alertEditor({ name: 'Cellar', alerts_entities: ['binary_sensor.cellar_pump'] },
      { 'binary_sensor.cellar_pump': { state: 'off', attributes: { friendly_name: 'Cellar Pump fault', device_class: 'problem' } } })._root)).join(''),
    'mdi:alert-circle|Pump fault|0');
}
{
  // An appliance with nothing to offer: the panel stays closed, the menu
  // keeps only the other entity.
  const bare = new Editor();
  bare.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'dishwasher', state_entity: 'sensor.other_state' });
  bare.hass = HASS({ 'sensor.other_state': { state: 'Ready', attributes: {} } });
  const h = markup(bare._root);
  check('editeur alertes : ferme tant qu\'il n\'y a rien', /data-panel="alerts" open/.test(h), false);
  check('editeur alertes : rien a proposer que l\'autre entite', alertMenu(h).join(' / '), ':Add an alert… / __other__:Other entity…');
  const panel = (/data-panel="alerts"[\s\S]*?<\/details>/.exec(h) || [''])[0];
  check('editeur alertes : ni liste, pas meme vide', (panel.match(/<div class="section">/g) || []).length, 1);
}
noInjection('nom d\'alerte dans l\'editeur', markup(alertEditor({ alerts_entities: ['binary_sensor.xss'] },
  { 'binary_sensor.xss': { state: 'on', attributes: { friendly_name: XSS } } })._root));
noInjection('nom propose dans le menu de l\'editeur', markup(alertEditor({}, {},
  { 'binary_sensor.dw_xss': [{ state: 'off', attributes: { friendly_name: XSS, device_class: 'problem' } }, null] })._root));

for (const type of ['washer', 'dryer', 'dishwasher', 'oven', 'microwave', 'hood', 'cooktop', 'fridge', 'kettle',
  'cooker', 'coffee', 'rice_cooker', 'water_heater', 'boiler', 'heat_pump', 'printer_3d', 'pet_feeder']) {
  check(`editeur alertes : le panneau sur ${type} aussi`, /data-panel="alerts"/.test(markup(alertEditor({ appliance_type: type })._root)), true);
}

// The panel in fourteen languages: its own words in each, never the English
// ones a missing entry would fall back to.
for (const language of ['fr', 'ru', 'de', 'es', 'it', 'nl', 'pt', 'sv', 'no', 'da', 'pl', 'zh', 'cs']) {
  const html = markup(alertEditor({ language })._root);
  const title = (/data-panel="alerts"[^>]*>\s*<summary>([^<]*)<\/summary>/.exec(html) || [, ''])[1];
  const menu = alertMenu(html);
  const remove = (/class="list-remove" data-alerts-remove="0" title="([^"]*)"/.exec(html) || [, ''])[1];
  check(`editeur alertes : titre traduit en ${language}`, title !== '' && title !== 'Alert entities', true);
  check(`editeur alertes : menu traduit en ${language}`, menu[0] !== ':Add an alert…' && menu[0].startsWith(':'), true);
  check(`editeur alertes : autre entite traduite en ${language}`, menu.at(-1) !== '__other__:Other entity…' && menu.at(-1).startsWith('__other__:'), true);
  check(`editeur alertes : croix traduite en ${language}`, remove !== '' && remove !== 'Remove', true);
}
contains('editeur alertes : titre en anglais', markup(alertEditor()._root), '<summary>Alert entities</summary>');

// == Switches at hand, in the corners (HACF) ===================================
// A feeder's child lock and auto lock as icons in the top corners, one a side:
// the first left, the second right, each under what already sits in its
// corner. The icon says what the switch does and whether it holds.
const CORNER_ST = {
  'sensor.feeder_state': { state: 'standby', attributes: {} },
  'switch.feeder_child_lock': { state: 'on', attributes: { friendly_name: 'Feeder Child lock' } },
  'switch.feeder_auto_lock': { state: 'off', attributes: { friendly_name: 'Feeder Auto lock' } },
  'switch.feeder_forcing': { state: 'on', attributes: { friendly_name: 'Feeder Forcing' } },
  'lock.feeder_hatch': { state: 'locked', attributes: { friendly_name: 'Feeder Hatch' } },
  'switch.feeder_led': { state: 'off', attributes: { friendly_name: 'Feeder LED', icon: 'mdi:led-on' } },
  'binary_sensor.feeder_online': { state: 'on', attributes: {} },
};
const cornerCard = (list, extra = {}, states = {}) => build({ appliance_type: 'pet_feeder', name: 'Feeder',
  state_entity: 'sensor.feeder_state', corner_entities: list, ...extra }, { ...CORNER_ST, ...states });
/** The corner icons as "side[+ when on]:top:entity:title:icon". */
const corners = h => [...h.matchAll(/<div class="corner-btn (left|right)( on)?" style="top:(\d+)px" data-corner="([^"]*)" title="([^"]*)" aria-label="([^"]*)"><ha-icon icon="([^"]*)">/g)]
  .map(m => `${m[1]}${m[2] ? '+' : ''}:${m[3]}:${m[4]}:${m[5]}:${m[7]}`);
const cornerSpot = c => c.split(':').slice(0, 2).join(':');
const cornerIco = c => (c || '').split(':').slice(-2).join(':');
/** The body of a CSS rule, and the icon size it sets, class by class. */
const cssRule = (h, sel) => {
  const m = new RegExp(`\\.${sel}\\s*\\{([^}]*)\\}`).exec(h);
  return m ? m[1].replace(/\s+/g, ' ').trim() : '';
};
const cssIcon = (h, sel) => (/--mdc-icon-size: (\d+)px/.exec(cssRule(h, sel)) || [])[1];
{
  const h = cornerCard(['switch.feeder_child_lock', 'switch.feeder_auto_lock', 'switch.feeder_forcing']).html;
  check('coins : le premier a gauche, le second a droite, et pas de troisieme', corners(h).join(' / '),
    'left+:6:switch.feeder_child_lock:Child lock:mdi:account-lock / '
    + 'right:6:switch.feeder_auto_lock:Auto lock:mdi:timer-lock-open-outline');
  check('coins : son nom se lit aussi a l\'oreille',
    /data-corner="switch\.feeder_child_lock" title="Child lock" aria-label="Child lock"/.test(h), true);
  contains('coins : a gauche, au bord', h, '.corner-btn.left { left: 8px; }');
  contains('coins : a droite, au bord', h, '.corner-btn.right { right: 8px; }');
  contains('coins : allume, en ambre', h, '.corner-btn.on { color: #ffb300; }');
  // The top of a card reads as one row, and two of its three icons are meant
  // to be tapped: they are all drawn at the same size, on a button wide
  // enough for a finger.
  check('coins : le bouton, une pastille large comme le doigt',
    cssRule(h, 'corner-btn').includes('width: 32px; height: 32px; border-radius: 50%'), true);
  check('haut de carte : les trois icones a la meme taille',
    ['corner-btn', 'light-badge', 'conn-badge'].map(sel => cssIcon(h, sel)).join(' '), '24 24 24');
}
check('coins : sous le Wi-Fi a droite',
  corners(cornerCard(['switch.feeder_child_lock', 'switch.feeder_auto_lock'],
    { connectivity_entity: 'binary_sensor.feeder_online' }).html).map(cornerSpot).join(' '), 'left+:6 right:36');
check('coins : sous la lumiere a gauche',
  corners(render({ appliance_type: 'oven', state_entity: 'sensor.o', light_entity: 'light.o',
    corner_entities: ['switch.feeder_child_lock', 'switch.feeder_auto_lock'] },
  { ...CORNER_ST, 'sensor.o': { state: 'off', attributes: {} }, 'light.o': { state: 'off', attributes: {} } }))
    .map(cornerSpot).join(' '), 'left+:36 right:6');
check('coins : deux au plus',
  corners(cornerCard(['switch.feeder_child_lock', 'switch.feeder_auto_lock', 'switch.feeder_forcing',
    'lock.feeder_hatch', 'switch.feeder_led']).html).length, 2);
check('coins : une entite absente ne prend pas de place',
  corners(cornerCard(['switch.nothing', 'switch.feeder_auto_lock']).html).map(c => c.split(':').slice(0, 3).join(':')).join(' '),
  'left:6:switch.feeder_auto_lock');
check('coins : une entree vide non plus',
  corners(cornerCard([null, { label: 'x' }, 'switch.feeder_auto_lock']).html).length, 1);
check('coins : une entite seule, sans liste',
  corners(cornerCard('switch.feeder_auto_lock').html).length, 1);
check('coins : un libelle donne remplace le nom',
  /title="Enfants"/.test(cornerCard([{ entity: 'switch.feeder_child_lock', label: 'Enfants' }]).html), true);
check('coins : une icone donnee aussi, dans les deux etats',
  corners(cornerCard([{ entity: 'switch.feeder_child_lock', icon: 'mdi:baby-face' },
    { entity: 'switch.feeder_auto_lock', icon: 'mdi:baby-face' }]).html).map(cornerIco).join(' '),
  'mdi:baby-face mdi:baby-face');

// Each kind drawn locked and unlocked.
const cornerAs = (id, state) => corners(cornerCard([id], {}, { [id]: { ...CORNER_ST[id], state } }).html)[0] || '';
check('coins : securite enfant activee', cornerIco(cornerAs('switch.feeder_child_lock', 'on')), 'mdi:account-lock');
check('coins : securite enfant levee', cornerIco(cornerAs('switch.feeder_child_lock', 'off')), 'mdi:account-lock-open-outline');
check('coins : verrouillage auto actif', cornerIco(cornerAs('switch.feeder_auto_lock', 'on')), 'mdi:timer-lock');
check('coins : verrouillage auto coupe', cornerIco(cornerAs('switch.feeder_auto_lock', 'off')), 'mdi:timer-lock-open-outline');
check('coins : une serrure fermee', cornerIco(cornerAs('lock.feeder_hatch', 'locked')), 'mdi:lock');
check('coins : une serrure ouverte', cornerIco(cornerAs('lock.feeder_hatch', 'unlocked')), 'mdi:lock-open-variant-outline');
check('coins : une serrure grande ouverte n\'est pas fermee', cornerIco(cornerAs('lock.feeder_hatch', 'open')), 'mdi:lock-open-variant-outline');
check('coins : un interrupteur allume', cornerIco(cornerAs('switch.feeder_forcing', 'on')), 'mdi:toggle-switch');
check('coins : un interrupteur eteint', cornerIco(cornerAs('switch.feeder_forcing', 'off')), 'mdi:toggle-switch-off-outline');
check('coins : l\'icone propre a l\'entite reste', cornerIco(cornerAs('switch.feeder_led', 'off')), 'mdi:led-on');
check('coins : sauf quand la carte sait ce qu\'il verrouille',
  cornerIco(corners(cornerCard(['switch.feeder_child_lock'], {},
    { 'switch.feeder_child_lock': { state: 'off', attributes: { friendly_name: 'Feeder Child lock', icon: 'mdi:shield' } } }).html)[0]),
  'mdi:account-lock-open-outline');
check('coins : allume, il s\'eclaire', cornerAs('switch.feeder_forcing', 'on').startsWith('left+'), true);
check('coins : une serrure fermee s\'eclaire', cornerAs('lock.feeder_hatch', 'locked').startsWith('left+'), true);
check('coins : ouverte, non', cornerAs('lock.feeder_hatch', 'open').startsWith('left+'), false);
check('coins : eteint, non', cornerAs('switch.feeder_forcing', 'off').startsWith('left+'), false);
check('coins : indisponible, non', cornerAs('switch.feeder_forcing', 'unavailable').startsWith('left+'), false);

// What a switch is: the integration's key first, the same in every language,
// then its id and its name, in the card's fourteen languages.
{
  const kindOf = (id, name, key) => {
    const c = new Card();
    c.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'pet_feeder', state_entity: 'sensor.feeder_state',
      corner_entities: [id] });
    c._hass = { ...HASS({ ...CORNER_ST, [id]: { state: 'on', attributes: { friendly_name: name } } }),
      entities: key ? { [id]: { translation_key: key } } : {} };
    c._render();
    return cornerIco(corners(markup(c))[0]);
  };
  check('coins : la cle de l\'integration d\'abord', kindOf('switch.feeder_x', 'Feeder X', 'child_lock'), 'mdi:account-lock');
  check('coins : l\'identifiant parle aussi', kindOf('switch.feeder_children_lock', 'Feeder X'), 'mdi:account-lock');
  for (const [name, icon] of [
    ['Sécurité enfant', 'mdi:account-lock'], ['Verrouillage automatique', 'mdi:timer-lock'],
    ['Kindersicherung', 'mdi:account-lock'], ['Automatische Sperre', 'mdi:timer-lock'],
    ['Bloqueo infantil', 'mdi:account-lock'], ['Bloqueo automático', 'mdi:timer-lock'],
    ['Blocco bambini', 'mdi:account-lock'], ['Blocco automatico', 'mdi:timer-lock'],
    ['Kinderslot', 'mdi:account-lock'], ['Automatisch slot', 'mdi:timer-lock'],
    ['Bloqueio para crianças', 'mdi:account-lock'], ['Bloqueio automático', 'mdi:timer-lock'],
    ['Barnlås', 'mdi:account-lock'], ['Autolås', 'mdi:timer-lock'],
    ['Blokada rodzicielska', 'mdi:account-lock'], ['Automatyczna blokada', 'mdi:timer-lock'],
    ['Blokada przed dzie\u0107mi', 'mdi:account-lock'], ['Zamkni\u0119cie automatyczne', 'mdi:timer-lock'],
    ['\u0417\u0430\u043c\u043e\u043a', 'mdi:lock'],
    ['Dětská pojistka', 'mdi:account-lock'], ['Automatický zámek', 'mdi:timer-lock'],
    ['Защита от детей', 'mdi:account-lock'],
    ['Автоблокировка', 'mdi:timer-lock'],
    ['儿童锁', 'mdi:account-lock'], ['自动锁', 'mdi:timer-lock'],
    ['Verrou', 'mdi:lock'], ['Sperre', 'mdi:lock'], ['Clock sync', 'mdi:toggle-switch'],
    ['Automatic feeding', 'mdi:toggle-switch'],
  ]) check(`coins : ${name}`, kindOf('switch.feeder_x', name), icon);
}

// A tap toggles the switch; a lock only opens its dialog, since a stray tap
// on a dashboard must never unlock anything.
{
  const calls = [];
  const cardFor = (list) => {
    const c = new Card();
    c.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'pet_feeder', name: 'Feeder',
      state_entity: 'sensor.feeder_state', corner_entities: list });
    c._hass = { ...HASS({ ...CORNER_ST, 'input_boolean.feeder_holiday': { state: 'off', attributes: {} } }),
      callService: (domain, service, data) => calls.push(`${domain}.${service} ${data.entity_id}`) };
    c._render();
    return c;
  };
  const tap = (c, id) => {
    const node = c._root.querySelectorAll('[data-corner]').find(n => n.getAttribute('data-corner') === id);
    if (!node?.__handlers?.click) return 'aucun clic';
    let stopped = false;
    node.__handlers.click({ stopPropagation() { stopped = true; } });
    return stopped ? 'arrete' : 'propage';
  };
  const both = cardFor(['switch.feeder_child_lock', 'input_boolean.feeder_holiday']);
  check('coins : un appui ne remonte pas a la carte', tap(both, 'switch.feeder_child_lock'), 'arrete');
  check('coins : il bascule l\'interrupteur', calls.at(-1), 'switch.toggle switch.feeder_child_lock');
  tap(both, 'input_boolean.feeder_holiday');
  check('coins : un booleen aussi', calls.at(-1), 'input_boolean.toggle input_boolean.feeder_holiday');
  const lock = cardFor(['lock.feeder_hatch']);
  const before = calls.length;
  tap(lock, 'lock.feeder_hatch');
  check('coins : une serrure ne se deverrouille pas d\'un appui', calls.length, before);
  check('coins : sa fiche s\'ouvre', `${lock.events.at(-1)?.type} ${lock.events.at(-1)?.detail?.entityId}`,
    'hass-more-info lock.feeder_hatch');
}
check('coins : les interrupteurs sont surveilles',
  cornerCard(['switch.feeder_child_lock', 'switch.feeder_auto_lock']).card._watchedEntityIds()
    .filter(id => id.startsWith('switch.')).join(' '), 'switch.feeder_child_lock switch.feeder_auto_lock');
check('coins : deux surveilles au plus',
  cornerCard(['switch.feeder_child_lock', 'switch.feeder_auto_lock', 'switch.feeder_forcing', 'lock.feeder_hatch',
    'switch.feeder_led']).card._watchedEntityIds().filter(id => /^(switch|lock)\./.test(id)).length, 2);
noInjection('nom d\'un interrupteur', cornerCard(['switch.feeder_child_lock'], {},
  { 'switch.feeder_child_lock': { state: 'on', attributes: { friendly_name: XSS } } }).html);
check('icone d\'un interrupteur : aucun attribut onload forme',
  /onload="/i.test(cornerCard(['switch.feeder_led'], {},
    { 'switch.feeder_led': { state: 'on', attributes: { icon: 'mdi:x" onload="alert(1)' } } }).html), false);
for (const type of ['washer', 'dryer', 'dishwasher', 'oven', 'microwave', 'hood', 'cooktop', 'fridge', 'kettle',
  'cooker', 'coffee', 'rice_cooker', 'water_heater', 'boiler', 'heat_pump', 'printer_3d', 'pet_feeder']) {
  check(`coins : sur ${type} aussi`,
    corners(render({ appliance_type: type, state_entity: 'sensor.feeder_state', corner_entities: ['switch.feeder_forcing'] },
      CORNER_ST)).length, 1);
}

// ── The editor: a menu of the appliance's switches ──
// The same dishwasher, with a child lock, an eco switch and a door lock of
// its own, and a light switch of another device.
const CORNER_DEVICE = {
  'switch.dw_child_lock': [{ state: 'on', attributes: { friendly_name: 'Dishwasher Child lock' } }, 'child_lock'],
  'switch.dw_eco': [{ state: 'on', attributes: { friendly_name: 'Dishwasher Eco' } }, null],
  'lock.dw_door_lock': [{ state: 'locked', attributes: { friendly_name: 'Dishwasher Door lock' } }, null],
};
const cornerEditor = (config = {}, extraStates = {}) => alertEditor(config,
  { 'switch.kitchen_light': { state: 'off', attributes: { friendly_name: 'Kitchen light' } }, ...extraStates }, CORNER_DEVICE);
const cornerMenu = h => {
  const sel = (/<select data-role="corners-add-select"[^>]*>([\s\S]*?)<\/select>/.exec(h) || [, ''])[1];
  return [...sel.matchAll(/<option value="([^"]*)">([^<]*)<\/option>/g)].map(m => `${m[1]}:${m[2]}`);
};
/** The switches chosen, as "icon|name|remove index". */
const cornerChoices = h => [...h.matchAll(/<div class="list-choice corners"><ha-icon icon="([^"]*)"><\/ha-icon><span>([^<]*)<\/span><button type="button" class="list-remove" data-corners-remove="(\d+)"/g)]
  .map(m => `${m[1]}|${m[2]}|${m[3]}`);
const cornerSelect = ed => ed._root.querySelector('[data-role="corners-add-select"]');
{
  const ed = cornerEditor();
  const html = markup(ed._root);
  contains('editeur coins : un panneau a lui', html, 'data-panel="corners"');
  check('editeur coins : ferme tant qu\'il est vide', /data-panel="corners" open/.test(html), false);
  check('editeur coins : le menu ne propose que ce que l\'appareil bascule', cornerMenu(html).join(' / '),
    ':Add a switch… / switch.dw_child_lock:Child lock / lock.dw_door_lock:Door lock / switch.dw_eco:Eco / __other__:Other entity…');
  fire(cornerSelect(ed), 'change', { target: { value: 'switch.dw_child_lock' } });
  checkFired('editeur coins : choisir dans le menu', ed, ev =>
    check('editeur coins : en simple identifiant', (ev?.detail?.config?.corner_entities || []).join(' '), 'switch.dw_child_lock'));
  const after = markup(ed._root);
  check('editeur coins : la liste le montre, avec l\'icone de la carte', cornerChoices(after).join(' / '),
    'mdi:account-lock|Child lock|0');
  check('editeur coins : le menu ne le propose plus', cornerMenu(after).some(o => o.startsWith('switch.dw_child_lock:')), false);
  check('editeur coins : les alertes n\'en sont pas', /data-alerts-remove="2"/.test(after), false);
  const events = ed.events.length;
  fire(cornerSelect(ed), 'change', { target: { value: '' } });
  check('editeur coins : le titre du menu ne choisit rien', ed.events.length, events);
}
check('editeur coins : ni ce qu\'un champ commande deja',
  cornerMenu(markup(cornerEditor({ toggle_entity: 'switch.dw_eco' })._root)).some(o => o.startsWith('switch.dw_eco:')), false);
check('editeur coins : ni ce qu\'une ligne montre',
  cornerMenu(markup(cornerEditor({ info_entities: ['switch.dw_eco'] })._root)).some(o => o.startsWith('switch.dw_eco:')), false);
{
  const ed = cornerEditor();
  fire(cornerSelect(ed), 'change', { target: { value: '__other__' } });
  const picker = ed._root.querySelector('[data-slot="__corners_other"]').children.at(-1);
  check('editeur coins : autre entite, parmi ce qui se bascule', (picker.includeDomains || []).join(','),
    'switch,input_boolean,lock,light,fan');
  check('editeur coins : les alertes gardent leur selecteur ferme', /data-slot="__alerts_other"/.test(markup(ed._root)), false);
  fire(picker, 'value-changed', { detail: { value: 'switch.kitchen_light' } });
  check('editeur coins : l\'entite choisie s\'ajoute', ed._config.corner_entities.join(' '), 'switch.kitchen_light');
  check('editeur coins : et le selecteur se referme', /data-slot="__corners_other"/.test(markup(ed._root)), false);
}
{
  const full = cornerEditor({ corner_entities: ['switch.a', 'switch.b'] });
  check('editeur coins : a deux, le menu se ferme', /<select data-role="corners-add-select" disabled>/.test(markup(full._root)), true);
  full._addToList('corners', 'switch.dw_eco');
  check('editeur coins : et rien ne s\'y ajoute', full._config.corner_entities.length, 2);
  check('editeur coins : ouvert sur une liste deja faite', /data-panel="corners" open/.test(markup(full._root)), true);
  check('editeur coins : a un, il reste ouvert',
    /<select data-role="corners-add-select">/.test(markup(cornerEditor({ corner_entities: ['switch.a'] })._root)), true);
}
{
  const ed = cornerEditor({ corner_entities: ['switch.dw_child_lock', 'lock.dw_door_lock'] });
  fire(ed._root.querySelectorAll('[data-corners-remove]')[0], 'click', {});
  check('editeur coins : retirer un interrupteur', ed._config.corner_entities.join(' '), 'lock.dw_door_lock');
  const last = cornerEditor({ corner_entities: ['switch.dw_child_lock'] });
  fire(last._root.querySelectorAll('[data-corners-remove]')[0], 'click', {});
  check('editeur coins : plus rien, plus de cle', 'corner_entities' in last._config, false);
  check('editeur coins : les alertes restent',
    JSON.stringify(last._config.alerts_entities), JSON.stringify(['sensor.dw_salt', 'sensor.dw_rinse']));
}
{
  // A feeder is often set up with no state at all: the menus find the device
  // through the card's other entities, the first that belongs to one.
  const ed = new Editor();
  ed.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'pet_feeder', start_entity: 'script.feed',
    portions_today_entity: 'sensor.cq_portions' });
  ed.hass = { ...HASS({
    'script.feed': { state: 'off', attributes: {} },
    'sensor.cq_portions': { state: '2', attributes: {} },
    'switch.cq_child_lock': { state: 'on', attributes: { friendly_name: 'Croquettes Child lock' } },
    'binary_sensor.cq_jam': { state: 'off', attributes: { friendly_name: 'Croquettes Jam', device_class: 'problem' } },
    'switch.other_plug': { state: 'on', attributes: { friendly_name: 'Plug' } } }),
  entities: { 'sensor.cq_portions': { device_id: 'cq' }, 'switch.cq_child_lock': { device_id: 'cq' },
    'binary_sensor.cq_jam': { device_id: 'cq' }, 'switch.other_plug': { device_id: 'x' },
    'switch.cq_disabled': { device_id: 'cq' } },
  devices: { cq: { name: 'Croquettes' } } };
  const h = markup(ed._root);
  check('editeur coins : sans etat, l\'appareil se trouve par ses autres entites', cornerMenu(h).join(' / '),
    ':Add a switch… / switch.cq_child_lock:Child lock / __other__:Other entity…');
  check('editeur alertes : sans etat non plus', alertMenu(h).join(' / '),
    ':Add an alert… / binary_sensor.cq_jam:Jam / __other__:Other entity…');
}
{
  // A state entity that no longer exists finds no appliance, rather than
  // offering every switch of the house.
  const ed = new Editor();
  ed.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'washer', state_entity: 'sensor.w_state' });
  ed.hass = HASS({ 'switch.plug': { state: 'on', attributes: { friendly_name: 'Plug' } } });
  check('editeur coins : une entite d\'etat introuvable ne propose rien', cornerMenu(markup(ed._root)).join(' / '),
    ':Add a switch\u2026 / __other__:Other entity\u2026');
}
for (const type of ['washer', 'dryer', 'dishwasher', 'oven', 'microwave', 'hood', 'cooktop', 'fridge', 'kettle',
  'cooker', 'coffee', 'rice_cooker', 'water_heater', 'boiler', 'heat_pump', 'printer_3d', 'pet_feeder']) {
  check(`editeur coins : le panneau sur ${type} aussi`, /data-panel="corners"/.test(markup(cornerEditor({ appliance_type: type })._root)), true);
}
for (const language of ['fr', 'ru', 'de', 'es', 'it', 'nl', 'pt', 'sv', 'no', 'da', 'pl', 'zh', 'cs']) {
  const html = markup(cornerEditor({ language })._root);
  const title = (/data-panel="corners"[^>]*>\s*<summary>([^<]*)<\/summary>/.exec(html) || [, ''])[1];
  const menu = cornerMenu(html);
  check(`editeur coins : titre traduit en ${language}`, title !== '' && title !== 'Corner switches', true);
  check(`editeur coins : menu traduit en ${language}`, menu[0] !== ':Add a switch…' && menu[0].startsWith(':'), true);
}
contains('editeur coins : titre en anglais', markup(cornerEditor()._root), '<summary>Corner switches</summary>');

// ── The editor: the feeder's model ──
{
  const modelOf = (config) => {
    const ed = new Editor();
    ed.setConfig({ type: 'custom:ha-appliance-card', start_entity: 'script.feed', ...config });
    ed.hass = HASS({ 'script.feed': { state: 'off', attributes: {} } });
    return markup(ed._root);
  };
  const models = h => [...((/<select data-field="feeder_layout">([\s\S]*?)<\/select>/.exec(h) || [, ''])[1])
    .matchAll(/<option value="([^"]*)"\s*(selected)?>([^<]*)</g)].map(m => `${m[1]}${m[2] ? '*' : ''}:${m[3]}`);
  const h = modelOf({ appliance_type: 'pet_feeder' });
  check('editeur modele : les deux dessins', models(h).join(' / '), 'tower:Tower, built-in bowl / canister:Round tank, separate bowl');
  check('editeur modele : son titre', /<label>Model<\/label>\s*<select data-field="feeder_layout">/.test(h), true);
  check('editeur modele : le choix se relit', models(modelOf({ appliance_type: 'pet_feeder', feeder_layout: 'canister' }))[1],
    'canister*:Round tank, separate bowl');
  check('editeur modele : seulement pour un distributeur', /data-field="feeder_layout"/.test(modelOf({ appliance_type: 'washer' })), false);
  for (const language of ['fr', 'ru', 'de', 'es', 'it', 'nl', 'pt', 'sv', 'no', 'da', 'pl', 'zh', 'cs']) {
    const opts = models(modelOf({ appliance_type: 'pet_feeder', language }));
    check(`editeur modele : traduit en ${language}`,
      opts.length === 2 && !opts.some(o => /Tower, built-in bowl|Round tank, separate bowl/.test(o)), true);
  }
}

// ── Found on the device ──
// By Home Connect's three states and by the integration's key, which is the
// same in every language, never by the name.
function suggestOn(type, stateId, list, config = {}) {
  const states = { [stateId]: { state: 'ready', attributes: {} } };
  const entities = { [stateId]: { device_id: 'hc' } };
  for (const [id, key, options = HC_OPTIONS] of list) {
    states[id] = { state: 'off', attributes: options ? { options } : {} };
    entities[id] = key ? { device_id: 'hc', translation_key: key } : { device_id: 'hc' };
  }
  const ed = new Editor();
  ed.setConfig({ type: 'custom:ha-appliance-card', appliance_type: type, state_entity: stateId, ...config });
  ed.hass = { ...HASS(states), entities };
  return { ed, sug: ed.events.at(-1)?.detail?.config || {} };
}
{
  // Its news come first, and an enum of its own, so that anything short of
  // the three states and the key would pick them.
  const { ed, sug } = suggestOn('dishwasher', 'sensor.dishwasher_operation_state', [
    ['sensor.dishwasher_alarm_clock_elapsed', 'alarm_clock_elapsed'],
    ['sensor.dishwasher_door', 'door', ['open', 'closed', 'locked']],
    ['binary_sensor.dishwasher_salt_low', null, null],
    ['sensor.dishwasher_salt_nearly_empty', 'salt_nearly_empty'],
    ['sensor.dishwasher_rinse_aid_nearly_empty', 'rinse_aid_nearly_empty'],
    ['sensor.dishwasher_machine_care_reminder', 'machine_care_reminder'],
  ]);
  check('suggestion alertes : les alertes de Home Connect, pas ses nouvelles', (sug.alerts_entities || []).join(' '),
    'sensor.dishwasher_salt_nearly_empty sensor.dishwasher_rinse_aid_nearly_empty sensor.dishwasher_machine_care_reminder');
  check('suggestion alertes : le panneau s\'ouvre', ed._panelOpen?.alerts, true);
  check('suggestion alertes : et les liste', alertChoices(markup(ed._root)).length, 3);
}
{
  // Home Assistant set to French names the entities in French, never the keys.
  // The program is already chosen, so that nothing but the key keeps the
  // finished program out.
  const { sug } = suggestOn('dishwasher', 'sensor.lave_vaisselle_etat_de_fonctionnement', [
    ['sensor.lave_vaisselle_programme_termine', 'program_finished'],
    ['sensor.lave_vaisselle_sel_presque_vide', 'salt_nearly_empty'],
    ['sensor.lave_vaisselle_manque_de_liquide_de_rincage', 'rinse_aid_lack'],
  ], { program_entity: 'select.lave_vaisselle_programme_actif' });
  check('suggestion alertes : dans toutes les langues, par la cle', (sug.alerts_entities || []).join(' '),
    'sensor.lave_vaisselle_sel_presque_vide sensor.lave_vaisselle_manque_de_liquide_de_rincage');
}
for (const options of [['confirmed', 'off', 'on'], ['present', 'off', 'on'], ['present', 'confirmed', 'on'], ['off', 'eco', 'auto']]) {
  check(`suggestion alertes : ${options.join('/')} n'est pas un evenement`,
    suggestOn('dishwasher', 'sensor.dw_state', [['sensor.dw_ev', 'salt_nearly_empty', options]]).sug.alerts_entities, undefined);
}
check('suggestion alertes : sans cle, l\'identifiant fait foi',
  (suggestOn('dishwasher', 'sensor.dishwasher_operation_state', [
    ['sensor.dishwasher_alarm_clock_elapsed', null],
    ['sensor.dishwasher_salt_nearly_empty', null]]).sug.alerts_entities || []).join(' '),
  'sensor.dishwasher_salt_nearly_empty');
// Each of the news, and each kind of alert, on an entity whose id says nothing.
for (const key of ['program_aborted', 'program_finished', 'alarm_clock_elapsed', 'favorite_short_press',
  'favorite_long_press', 'preheat_finished', 'regular_preheat_finished', 'drying_process_finished',
  'descaling_in_20_cups', 'calc_n_clean_in5cups', 'keep_milk_tank_cool']) {
  check(`suggestion alertes : ${key} n'est pas une alerte`,
    suggestOn('dishwasher', 'sensor.dw_state', [['sensor.dw_ev', key]]).sug.alerts_entities, undefined);
}
for (const key of ['salt_lack', 'program_blocked_salt_lack', 'smart_filter_cleaning_reminder', 'poor_i_dos_1_fill_level',
  'grease_filter_max_saturation_reached', 'device_should_be_descaled', 'freezer_door_alarm']) {
  check(`suggestion alertes : ${key} en est une`,
    (suggestOn('dishwasher', 'sensor.dw_state', [['sensor.dw_ev', key]]).sug.alerts_entities || []).join(''), 'sensor.dw_ev');
}
{
  // A coffee machine keeps its reserves in their fields, not twice.
  const { sug } = suggestOn('coffee', 'sensor.coffee_maker_operation_state', [
    ['sensor.coffee_maker_bean_container_empty', 'bean_container_empty'],
    ['sensor.coffee_maker_water_tank_empty', 'water_tank_empty'],
    ['sensor.coffee_maker_device_should_be_cleaned', 'device_should_be_cleaned'],
  ]);
  check('suggestion alertes : le cafe garde ses reserves dans leurs champs, pas en alerte',
    [sug.beans_entity, sug.water_entity, ...(sug.alerts_entities || [])].join(' '),
    'sensor.coffee_maker_bean_container_empty sensor.coffee_maker_water_tank_empty sensor.coffee_maker_device_should_be_cleaned');
}
{
  // An alert named like a temperature goes to the alerts, and the info line to
  // the temperature itself.
  const { sug } = suggestOn('washer', 'sensor.washer_operation_state', [
    ['sensor.washer_temperature_alarm', 'temperature_alarm'],
    ['sensor.washer_temperature', null, null],
  ]);
  check('suggestion alertes : l\'alerte dans les alertes', (sug.alerts_entities || []).join(' '), 'sensor.washer_temperature_alarm');
  check('suggestion alertes : la ligne d\'info sur la temperature', (sug.info_entities || []).map(e => e.entity).join(' '),
    'sensor.washer_temperature');
}
check('suggestion alertes : huit au plus',
  (suggestOn('dishwasher', 'sensor.dw_state', Array.from({ length: 10 }, (_, i) => [`sensor.dw_ev_${i}`, 'machine_care_reminder']))
    .sug.alerts_entities || []).length, 8);
for (const [label, mine] of [['une liste', ['binary_sensor.mine']], ['une entite seule', 'binary_sensor.mine'],
  ['une entree seule', { entity: 'binary_sensor.mine', label: 'Mine' }]]) {
  const { ed } = suggestOn('dishwasher', 'sensor.dw_state', [['sensor.dw_ev', 'salt_nearly_empty']], { alerts_entities: mine });
  check(`suggestion alertes : ${label} deja faite est laissee`, JSON.stringify(ed._config.alerts_entities), JSON.stringify(mine));
}

// == What a tap on the card does (HACF) =======================================
// A dashboard speaks Home Assistant's action config, and the card only ever
// opened the entity. The popup cards people build on browser_mod need
// fire-dom-event, which is handed over whole. YAML only: the editor stays as
// long as it is.

{
  const tapCard = (cfg, states) => {
    const c = build({ appliance_type: 'washer', state_entity: 'sensor.w', ...cfg },
      states || { 'sensor.w': { state: 'Running', attributes: {} } }).card;
    const calls = [];
    c._hass = { ...c._hass, callService: (...a) => calls.push(a) };
    fire(c._root.getElementById('header'), 'click', {});
    return { card: c, ev: c.events.at(-1), calls };
  };
  const POPUP = { action: 'fire-dom-event', browser_mod: { service: 'browser_mod.popup', data: { popup_card_id: 'chauffe-eau' } } };

  const plain = tapCard({});
  check('appui : sans option, la fiche de l\'entite', plain.ev?.type, 'hass-more-info');
  check('appui : et c\'est celle de l\'etat', plain.ev?.detail?.entityId, 'sensor.w');

  const popup = tapCard({ tap_action: POPUP });
  check('appui : fire-dom-event leve ll-custom', popup.ev?.type, 'll-custom');
  check('appui : l\'action est passee entiere', popup.ev?.detail?.browser_mod?.data?.popup_card_id, 'chauffe-eau');
  check('appui : il sort de la carte', [popup.ev?.bubbles, popup.ev?.composed].join(' '), 'true true');
  check('appui : et la fiche ne s\'ouvre pas', popup.card.events.some(e => e.type === 'hass-more-info'), false);

  check('appui : none ne fait rien', tapCard({ tap_action: { action: 'none' } }).card.events.length, 0);
  check('appui : more-info sur une autre entite',
    tapCard({ tap_action: { action: 'more-info', entity: 'sensor.autre' } }).ev?.detail?.entityId, 'sensor.autre');
  check('appui : navigate previent le tableau de bord',
    tapCard({ tap_action: { action: 'navigate', navigation_path: '/lovelace/buanderie' } }).ev?.type, 'location-changed');
  check('appui : navigate sans chemin ouvre la fiche',
    tapCard({ tap_action: { action: 'navigate' } }).ev?.type, 'hass-more-info');
  {
    const { calls } = tapCard({ tap_action: { action: 'toggle' } });
    check('appui : toggle appelle le service', calls[0]?.slice(0, 2).join('.'), 'homeassistant.toggle');
    check('appui : sur l\'entite de la carte', JSON.stringify(calls[0]?.[2]), '{"entity_id":"sensor.w"}');
  }
  {
    const { calls } = tapCard({ tap_action: { action: 'perform-action', perform_action: 'script.repasser',
      data: { mode: 'vapeur' }, target: { entity_id: 'script.repasser' } } });
    check('appui : perform-action, le domaine et le service', calls[0]?.slice(0, 2).join('.'), 'script.repasser');
    check('appui : ses donnees', JSON.stringify(calls[0]?.[2]), '{"mode":"vapeur"}');
    check('appui : sa cible', JSON.stringify(calls[0]?.[3]), '{"entity_id":"script.repasser"}');
  }
  // The 2024.8 renaming: both spellings are written in dashboards today.
  check('appui : call-service est encore ecrit',
    tapCard({ tap_action: { action: 'call-service', service: 'light.turn_on' } }).calls[0]?.slice(0, 2).join('.'), 'light.turn_on');
  check('appui : un service sans domaine ne casse rien',
    tapCard({ tap_action: { action: 'perform-action', perform_action: 'repasser' } }).calls.length, 0);
  check('appui : une action inconnue ouvre la fiche',
    tapCard({ tap_action: { action: 'assist' } }).ev?.type, 'hass-more-info');
  {
    const opened = [];
    const realOpen = globalThis.window.open;
    globalThis.window.open = (...a) => opened.push(a);
    const { ev } = tapCard({ tap_action: { action: 'url', url_path: 'https://example.com/doc' } });
    globalThis.window.open = realOpen;
    check('appui : url ouvre le lien', opened[0]?.join(' '), 'https://example.com/doc _blank');
    check('appui : et rien d\'autre', ev, undefined);
  }
}

// == An iron, and the steam generator (issue #20) ==============================
// Nothing connects an iron to Home Assistant, so it is read from the smart
// plug it sits on, which is why it is on one: an iron left on is the one its
// owner worries about. The state line and the drawing say heating, and after
// the time the owner set, the iron catches fire.

const IRON = { appliance_type: 'iron', state_entity: 'switch.fer', power_entity: 'sensor.fer_w', power_on_threshold: 20 };
const ironStates = (state, onMin, watts) => ({
  'switch.fer': { state, attributes: {}, last_changed: AGO(onMin * 60e3) },
  'sensor.fer_w': { state: String(watts), attributes: { unit_of_measurement: 'W' } },
});
const iron = (state, onMin, watts, extra = {}) => render({ ...IRON, ...extra }, ironStates(state, onMin, watts));

check('fer : a l\'arret', stateLine(iron('off', 60, 0)), 'Off');
check('fer : en chauffe', stateLine(iron('on', 2, 1400)), 'Heating');
check('fer : en chauffe, la semelle chauffe', hasCls(iron('on', 2, 1400), 'heating'), true);
check('fer : a l\'arret, elle ne chauffe pas', hasCls(iron('off', 60, 0), 'heating'), false);
check('fer : en francais', stateLine(iron('on', 2, 1400, { language: 'fr' })), 'En chauffe');
check('fer : en chauffe, le mot est chaud', stateColor(iron('on', 2, 1400)), '#ff7043');
// Without a power threshold the state entity speaks for itself, and
// state_show_raw keeps its word rather than the card's.
check('fer : state_show_raw garde le mot de l\'entite',
  stateLine(render({ appliance_type: 'iron', state_entity: 'switch.fer', state_show_raw: true },
    { 'switch.fer': { state: 'on', attributes: {} } })), 'on');
contains('fer : la semelle est dessinee', iron('off', 60, 0), '<div class="ir-plate">');
contains('fer : le reservoir est dans la coque', iron('off', 60, 0), '<div class="ir-shell"><div class="ir-tank"></div></div>');
check('fer : sans centrale, pas de socle', /<div class="gen-base">/.test(iron('off', 60, 0)), false);
contains('fer : un cordon a la place', iron('off', 60, 0), '<div class="ir-cord">');

// The generator: the same iron on a base that holds the water.
const gen = (state, onMin, watts, extra = {}) => iron(state, onMin, watts, { iron_layout: 'generator', ...extra });
check('centrale : la classe du modele', hasCls(gen('on', 2, 1900), 'generator'), true);
contains('centrale : le socle', gen('on', 2, 1900), '<div class="gen-base">');
contains('centrale : son reservoir', gen('on', 2, 1900), '<div class="gen-tank">');
contains('centrale : le cordon de vapeur', gen('on', 2, 1900), '<div class="gen-hose">');
check('centrale : et plus de cordon simple', /<div class="ir-cord">/.test(gen('on', 2, 1900)), false);
check('centrale : le fer y est encore', /<div class="ir-plate">/.test(gen('on', 2, 1900)), true);
check('fer : un modele inconnu reste un fer', hasCls(iron('on', 2, 1400, { iron_layout: 'centrale' }), 'generator'), false);

// Left on: the minutes are counted by the card, since a plug left on stops
// changing and nothing would push the update that crosses the threshold.
check('fer : reste allume au-dela du delai', stateLine(iron('on', 45, 1400, { left_on_after: 30 })), 'Left on');
check('fer : il prend feu', hasCls(iron('on', 45, 1400, { left_on_after: 30 }), 'left-on'), true);
check('fer : en francais', stateLine(iron('on', 45, 1400, { left_on_after: 30, language: 'fr' })), 'Resté allumé');
check('fer : reste allume, le mot est rouge', stateColor(iron('on', 45, 1400, { left_on_after: 30 })), 'var(--error-color, #f44336)');
check('fer : avant le delai, il chauffe seulement', stateLine(iron('on', 10, 1400, { left_on_after: 30 })), 'Heating');
// The count is the card's own: it starts when the card first saw the iron
// heating, and a meter that moves with every watt must not push it back.
check('fer : le compteur ne repart pas a chaque mesure', (() => {
  const meter = w => ({ 'sensor.fer_w': { state: String(w), attributes: { unit_of_measurement: 'W' }, last_changed: AGO(w === 1400 ? 40 * 60e3 : 0) } });
  const c = build({ appliance_type: 'iron', state_entity: 'sensor.fer_w', power_entity: 'sensor.fer_w',
    power_on_threshold: 20, left_on_after: 30 }, meter(1400)).card;
  return hasCls(rerender(c, meter(1390)), 'left-on');
})(), true);
check('fer : avant le delai, aucune flamme', hasCls(iron('on', 10, 1400, { left_on_after: 30 }), 'left-on'), false);
check('fer : sans delai, jamais d\'alerte', hasCls(iron('on', 300, 1400), 'left-on'), false);
check('fer : un delai vide ne compte pas', hasCls(iron('on', 300, 1400, { left_on_after: '' }), 'left-on'), false);
check('fer : un delai a zero non plus', hasCls(iron('on', 300, 1400, { left_on_after: 0 }), 'left-on'), false);
check('fer : a l\'arret depuis des heures, rien ne brule', hasCls(iron('off', 300, 0, { left_on_after: 30 }), 'left-on'), false);
check('fer : eteint, l\'etat reste l\'etat', stateLine(iron('off', 300, 0, { left_on_after: 30 })), 'Off');
// The flames are drawn whatever happens: only the class lights them.
contains('fer : les flammes sont dans le dessin', iron('off', 60, 0), '<div class="ir-fire f1">');
check('fer : le compteur repart quand il s\'eteint', (() => {
  const c = build({ ...IRON, left_on_after: 30 }, ironStates('on', 45, 1400)).card;
  const before = hasCls(markup(c), 'left-on');
  rerender(c, ironStates('off', 0, 0));
  return [before, hasCls(rerender(c, ironStates('on', 1, 1400)), 'left-on')].join(' ');
})(), 'true false');

// Its own name says what it is, in the languages the card speaks.
const isIron = id => /<div class="ir-plate">/.test(render({ state_entity: id }, { [id]: { state: 'off', attributes: {} } }));
for (const id of ['switch.iron', 'switch.steam_generator', 'switch.fer_a_repasser', 'switch.centrale_vapeur',
  'switch.bugeleisen', 'switch.dampfstation', 'switch.plancha_de_ropa', 'switch.ferro_da_stiro',
  'switch.strijkijzer', 'switch.zelazko', 'switch.strykjarn']) {
  check(`fer : ${id} en est un`, isIron(id), true);
}
// A Spanish griddle is a plancha too, and it is no iron.
check('fer : une plancha de cuisine n\'en est pas un', isIron('switch.plancha_de_cocina'), false);
// And an environment sensor is not one either: "iron" hides inside the word.
check('fer : environment n\'en est pas un',
  /<div class="ir-plate">/.test(render({ state_entity: 'sensor.environment_state' },
    { 'sensor.environment_state': { state: 'off', attributes: {} } })), false);

// The editor: the type, its model and its delay, and nowhere else.
check('editeur : le fer est dans la liste des types',
  /<option value="iron"/.test(markup(newEditor({ state_entity: 'sensor.w', appliance_type: 'iron' }))), true);
check('editeur : le modele est propose sur un fer',
  /data-field="iron_layout"/.test(markup(newEditor({ state_entity: 'sensor.w', appliance_type: 'iron' }))), true);
check('editeur : le delai aussi',
  /data-field="left_on_after"/.test(markup(newEditor({ state_entity: 'sensor.w', appliance_type: 'iron' }))), true);
check('editeur : pas de modele de fer sur un lave-linge',
  /data-field="iron_layout"/.test(markup(newEditor({ state_entity: 'sensor.w', appliance_type: 'washer' }))), false);
check('editeur : ni le delai',
  /data-field="left_on_after"/.test(markup(newEditor({ state_entity: 'sensor.w', appliance_type: 'washer' }))), false);

report();
