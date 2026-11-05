// What a combi boiler is doing. Nefit and Bosch display -H, =H and 0H on the
// front panel and report CH, HW and No in their status. InComfort (Intergas)
// reports central_heating, starting_ch and tapwater, ebusd hwc_on and its
// siblings, MELCloud heat_zones and heat_water, myVAILLANT HEATING. The words
// cover the rest. A state_map entry pointing at one of the modes wins, as it
// does everywhere.
const BOILER_MODES = ["space_heating", "hot_water", "starting", "waiting", "idle"];
// The same panel letters as numbers, the cause code Nefit and Bosch keep in
// /system/appliance/causecode: 200 is -H, 201 is =H, 203 is 0H. Start-up is 0U,
// then 0C (fan and pump) and 0L (gas valve). The waits are a burner resting
// with a demand still there (0A anti-cycling, 305 right after hot water, 0Y
// flow above its setpoint, 0E low-load cycling): waiting, not standby.
const NEFIT_CAUSE_CODES = {
  200: "space_heating", 201: "hot_water", 203: "idle",
  270: "starting", 283: "starting", 284: "starting",
  202: "waiting", 204: "waiting", 265: "waiting", 305: "waiting", 353: "waiting",
};
const NEFIT_PANEL_CODES = {
  "0h": "idle", "0u": "starting", "0c": "starting", "0l": "starting",
  "0a": "waiting", "0y": "waiting", "0e": "waiting",
};
function boilerModeOf(raw, stateMap) {
  if (raw === undefined || raw === null) return "";
  const s = String(raw).trim();
  if (stateMap && Object.prototype.hasOwnProperty.call(stateMap, s)) {
    return BOILER_MODES.includes(stateMap[s]) ? stateMap[s] : "";
  }
  // A numeric sensor can hand the code over as "201.0".
  const code = /^(\d+)(?:\.0+)?$/.exec(s);
  if (code && Object.prototype.hasOwnProperty.call(NEFIT_CAUSE_CODES, code[1])) return NEFIT_CAUSE_CODES[code[1]];
  const f = stripAccents(s).toLowerCase();
  // Hot water first: "chauffage eau chaude" is about the taps, not the radiators.
  // EMS-ESP (Bosch, Buderus, Junkers, Nefit) words its states in the language
  // it is set to: varmvatten, varmtvann, c.w.u., sicak su, horuca/horka voda.
  if (f === "=h" || /\b(hw|dhw|ecs|acs)\b|\bhwc|tap.?water|heat.?water|hot.?water|eau.?chaude|sanitaire|warmwasser|agua.?caliente|acqua.?calda|warm.?water|varmvatten|varmtvann|\bc\.?w\.?u\b|s(i|\u0131)cak.?su|hor(uca|ka).?voda/.test(f)) return "hot_water";
  // Plain "heating" only after hot water has had its turn: on a boiler, a
  // heating that is not about the taps is about the radiators.
  // EMS-ESP again: Heizen, verwarmen, uppvarmning, ogrzewanie, oppvarming,
  // isitma, kurenie, topeni.
  if (f === "-h" || /\bch\b|starting.?ch|central.?heating|space.?heating|heat.?zones|\bheating\b|chauffage|heizung|heizbetrieb|calefaccion|riscaldamento|verwarming|\bcv\b|heizen|verwarmen|uppvarmning|ogrzewanie|oppvarming|(i|\u0131)s(i|\u0131)tma|kurenie|topeni/.test(f)) return "space_heating";
  if (Object.prototype.hasOwnProperty.call(NEFIT_PANEL_CODES, f)) return NEFIT_PANEL_CODES[f];
  if (f === "no") return "idle";
  return "";
}

// MELCloud puts what an air-to-water heat pump is doing in a status attribute
// on its water_heater entity. heat_water is the tank; the rest is not.
const MELCLOUD_STATUSES = ["idle", "heat_water", "heat_zones", "cool", "defrost", "standby", "legionella"];

// What an air-to-water heat pump is doing. A climate entity says it in
// hvac_action (Octopus Energy sets heating or idle from the zone's relay),
// MELCloud in its water heater's status attribute, a sensor in words. The state
// of a climate or water_heater entity is a mode the user picked, never what the
// pump does, so its words are left alone.
const HEAT_PUMP_MODES = ["space_heating", "hot_water", "cooling", "defrost", "idle"];
const HVAC_ACTION_MODES = {
  heating: "space_heating", preheating: "space_heating", cooling: "cooling",
  defrosting: "defrost", idle: "idle", off: "idle",
};
const MELCLOUD_MODES = {
  heat_water: "hot_water", legionella: "hot_water", heat_zones: "space_heating",
  cool: "cooling", defrost: "defrost", idle: "idle", standby: "idle",
};
function heatPumpModeOf(raw, attrs, stateMap, modeEntity) {
  if (raw === undefined || raw === null) return "";
  const s = String(raw).trim();
  if (stateMap && Object.prototype.hasOwnProperty.call(stateMap, s)) {
    return HEAT_PUMP_MODES.includes(stateMap[s]) ? stateMap[s] : "";
  }
  const a = attrs || {};
  const action = String(a.hvac_action || "").toLowerCase();
  if (Object.prototype.hasOwnProperty.call(HVAC_ACTION_MODES, action)) return HVAC_ACTION_MODES[action];
  const status = String(a.status || "").toLowerCase();
  if (Object.prototype.hasOwnProperty.call(MELCLOUD_MODES, status)) return MELCLOUD_MODES[status];
  if (modeEntity) return "";
  const f = stripAccents(s).toLowerCase();
  // With EMS-ESP's own words: odladzanie, tine, buz cozucu, scongelamento;
  // Kyler, kjoling, soguma, raffreddamento, chladenie. The letters NFD does
  // not take apart (\u00f8, \u0142, \u0131) are written out.
  if (/defrost|degivr|abtau|descongel|desescarch|sbrin|ontdooi|avfrost|avrim|afrim|odszran|odmraz|odladzanie|^tine$|buz.?cozucu|scongel/.test(f)) return "defrost";
  if (/\bcool(ing)?\b|refroidissement|rafraichissement|kuhlen|kuehlen|refrigeracion|raffrescamento|koelen|kylning|kjoling|koling|chlodzenie|chlazeni|kyler|kj\u00f8ling|ch\u0142odzenie|soguma|raffreddamento|chladenie/.test(f)) return "cooling";
  // EMS-ESP's compressor at rest, off or none in its eleven languages: the
  // whole word only, since some are short enough to sit inside another.
  if (/^(off|aus|uit|av|wy(l|\u0142)aczono|kapal(i|\u0131)|vyp|none|keine|geen|ingen|brak|aucun|hi(c|\u00e7)biri|nessuno|ziadny|zadne)$/.test(f)) return "idle";
  const m = boilerModeOf(s, null);
  return HEAT_PUMP_MODES.includes(m) ? m : "";
}

// What a pellet stove is doing. Palazzetti names its phases in keys (burning,
// burning_mod, fire_stop), Micronova's Agua IOT in the stove's own words and
// in its owner's language (WORK, LAVORO, TRAVAIL), Edilkamin, Duepi and Rika
// in plain English. The alarms come first, since a stove in alarm often still
// names the phase it stopped in, and a cleaning warning is an alarm, not a
// cleaning. Eco comes before the stop words, which "ECO STOP" also holds.
const STOVE_MODES = ["off", "ignition", "burning", "modulating", "eco", "cooling", "cleaning", "alarm"];
const STOVE_ALARM_RE = /alarm|allarm|alarme|alarma|error|fault|failure|defaut|guasto|warning|pellet.?finished|firewood.?finished|out.?of.?pellet|no.?pellet|door.?open|hatch|probe|pressure|temp.?too.?high|exhaust.?temp|chimney|grate|\bt05\b|\bmem\.?.?al|\bm\.?\s?al/;
const STOVE_CLEANING_RE = /clean|pulizia|pul\.|nettoy|netoy|netoage|reinig|reining|limpi|limpeza|limpar|reng|czyszcz|brazier|brasier|brasero|creuset|bracier|bracere|brandkorf|brennt?opf|ashpan|sauber/;
const STOVE_ECO_RE = /\beco\b|ecomode|stand.?by|cool_fluid|external.?request|frost|bereithalten|etre.?pret|en.?enspera|\bwait\b|\battesa$|\batten\.?$|\bwart\.?$/;
const STOVE_COOLING_RE = /cool|raffred|refroid|kuhl|kuehl|enfria|esfriar|afkoel|shut.?down|shut.?off|burn.?off|fire_stop|spegnimento|extinct|extincion|extincao|abschaltung|arresto|\barret\b|\bstop\b|stopp|\bsluk\b|blussen|zgasic|kachel.?stopt|loschen|eteindre|chlodz|wygasz/;
const STOVE_IGNITION_RE = /ignit|ignic|ignicao|accen|acend|allum|zund|zuend|anzuend|einschal|ontsteking|t(a|ae|\u00e6)nding|zap(l|\u0142)on|zapal|rozpal|starting|start|avvio|inicio|comece|commencez|debut|opstart|anlaufen|uruchom|load.?pellet|pellet.?load|carica|carico|carga|charge|laden|awaiting.?flame|waiting.?flame|attesa.?fiamma|atteinte.?flamme|flamme.?dans|attente.?de.?flamme|espera.?llama|llama.?a.?la.?espera|aguardando|warte|wartet|afwachting|afventer|oczekiwanie|flamm?e.?(light|licht|lumiere)|fiamma.?presente|fuoco.?presente|flamme.?presente|flamme.?vorhanden|llama.?presente|fuego.?presente|chama.?presente|vlam.?aanwezig|check.?up|kontrolle|controle|controlo|styring|lighting|fueling|heatup|ign_test|test_fire|stabili[sz]|encend|enciende/;
const STOVE_MODULATING_RE = /modul|burning_mod/;
const STOVE_BURNING_RE = /burning|\bwork|lavoro|travail|arbeit|betrieb|trabaj|trabalho|werk|\bdrift\b|flame.?on|running|\bon\b|pracuje|split.?log/;
const STOVE_OFF_RE = /^(off|0)$|off_timer|stove_off|spent|apagad|eteint|^aus$|ausgeschaltet|^uit$|uitgeschakeld|desligad|wylaczon|slukket|vypnut/;
function stoveModeOf(raw, stateMap) {
  if (raw === undefined || raw === null) return "";
  const s = String(raw).trim();
  if (stateMap && Object.prototype.hasOwnProperty.call(stateMap, s)) {
    return STOVE_MODES.includes(stateMap[s]) ? stateMap[s] : "";
  }
  const f = stripAccents(s).toLowerCase();
  if (["", "unknown", "unavailable", "none"].includes(f)) return "";
  if (STOVE_ALARM_RE.test(f)) return "alarm";
  if (STOVE_CLEANING_RE.test(f)) return "cleaning";
  if (STOVE_ECO_RE.test(f)) return "eco";
  if (STOVE_OFF_RE.test(f)) return "off";
  if (STOVE_COOLING_RE.test(f)) return "cooling";
  if (STOVE_MODULATING_RE.test(f)) return "modulating";
  if (STOVE_IGNITION_RE.test(f)) return "ignition";
  if (STOVE_BURNING_RE.test(f)) return "burning";
  return "";
}

// A stove's climate entity knows one thing more than on or off: whether the
// fire is lit, in its hvac_action. Palazzetti and Agua IOT both say heating
// or idle, and idle on a stove that is switched on is its eco standby.
function stoveClimateMode(st) {
  if (!st) return "";
  const state = String(st.state).toLowerCase();
  if (state === "off") return "off";
  const action = String((st.attributes || {}).hvac_action || "").toLowerCase();
  const byAction = { heating: "burning", preheating: "ignition", idle: "eco", off: "off" };
  if (Object.prototype.hasOwnProperty.call(byAction, action)) return byAction[action];
  // Switched on and silent about the fire: a stove on is a stove burning.
  return ["heat", "auto", "heat_cool"].includes(state) ? "burning" : "";
}

// What a stove's alarm entity says. Agua IOT names the alarm in the stove's
// language and "no alarm" in half a dozen ways, Duepi says All OK, Edilkamin
// counts its alarms, and a binary sensor is on when there is a problem.
const STOVE_NO_ALARM_RE = /^(-+|_+|ok|all.?ok|none|off|false|no.?al|no.?allarm[ei]?|no.?alarm|nessun.?allarme|pas.?d.?alarme|kein.?(wecker|alarm)|geen.?alarm|ninguna.?alarma|sin.?alarma|sem.?alarme|brak.?alarmu|zadny.?alarm|ingen.?alarm)$/;
function stoveAlarmOf(st) {
  if (!st) return { active: false, text: "" };
  const s = String(st.state).trim();
  const f = stripAccents(s).toLowerCase();
  if (["", "unknown", "unavailable"].includes(f) || STOVE_NO_ALARM_RE.test(f)) return { active: false, text: "" };
  if (["on", "true", "problem"].includes(f)) return { active: true, text: "" };
  const n = Number(f);
  if (Number.isFinite(n)) return { active: n !== 0, text: n !== 0 ? s : "" };
  return { active: true, text: s };
}

// The two alarms a stove has an answer for: out of pellets, which is a bag to
// go and fetch, and an open door, which is a door to go and close.
const STOVE_NO_PELLETS_RE = /pellet.?finished|firewood.?finished|out.?of.?pellets?|no.?pellets?|pellets?.?(depleted|esaurit|finit|epuis|leer|op\b)|sin.?pellets?|sem.?pellets?|mancanza.?pellet|brak.?pellet/;
const STOVE_DOOR_RE = /door.?open|hatch|porta.?aperta|porte.?ouverte|tur.?offen/;
// The code a stove's own display would show for an alarm: A05, AL 05, E12.
function stoveAlarmCode(text) {
  const m = /\b(al|a|e|er)\s?(\d{1,3})\b/i.exec(String(text || ""));
  return m ? `${m[1].toUpperCase()}${m[2].padStart(2, "0")}` : "";
}
const STOVE_COLORS = {
  off: "var(--disabled-text-color, #9e9e9e)", ignition: "#ff9800", burning: "#ff5722", modulating: "#ff7043",
  eco: "var(--success-color, #4caf50)", cooling: "#29b6f6", cleaning: "#ffb300", alarm: "var(--error-color, #f44336)",
};
// What the stove's own little screen shows. The power stage while it burns,
// as the stoves themselves print it, and a short word otherwise.
const STOVE_SCREEN = { off: "OFF", ignition: "IGN", eco: "ECO", cooling: "---", cleaning: "CLN", alarm: "AL" };

// What a split air conditioner is set to, from its climate entity or from a
// sensor or select that names the mode. Home Assistant's own modes first, then
// the words a template sensor might use.
const AC_SET_MODES = { off: "off", cool: "cool", heat: "heat", dry: "dry", fan_only: "fan", fan: "fan", auto: "auto", heat_cool: "auto" };
function acSetModeOf(raw) {
  if (raw === undefined || raw === null) return "";
  const f = stripAccents(String(raw).trim()).toLowerCase();
  if (Object.prototype.hasOwnProperty.call(AC_SET_MODES, f)) return AC_SET_MODES[f];
  if (/^(off|0|aus|uit|eteint|apagad[oa]|spent[oa]|desligad[oa]|av|slukket|wylaczon[ya]|vypnut[oa]?)$/.test(f)) return "off";
  if (/dry|dehum|deshum|entfeucht|deumid|ontvocht|avfukt|affugt|osusz|odvlh|secado/.test(f)) return "dry";
  if (/cool|cold|froid|refroid|kuhl|kuehl|frio|enfri|freddo|raffred|koel|kyl|kjol|kol\b|chlod|chlaz/.test(f)) return "cool";
  if (/heat|chaud|chauff|heiz|calor|calent|caldo|riscald|warm|verwarm|varm|grzan|grzej|topen|aquec/.test(f)) return "heat";
  if (/fan|vent|luft|lueft|ventil|flakt|vifte|blaes|wentyl/.test(f)) return "fan";
  if (/auto/.test(f)) return "auto";
  return "";
}

// What the unit is doing, which is not always what it is set to: set to cool,
// it may have reached the setpoint and wait, or melt the ice off its outdoor
// unit in winter. hvac_action says so when the integration knows; a defrost
// entity says it for the ones that report it apart.
const AC_MODES = ["off", "cool", "heat", "dry", "fan", "auto", "idle", "defrost", "preheat", "run"];
function acModeOf(set, action) {
  if (set === "off") return "off";
  const a = String(action || "").toLowerCase();
  const byAction = { cooling: "cool", heating: "heat", drying: "dry", fan: "fan", idle: "idle", off: "idle", defrosting: "defrost", preheating: "preheat" };
  if (Object.prototype.hasOwnProperty.call(byAction, a)) return byAction[a];
  return set;
}

// The vanes. Every integration names a position its own way: Panasonic
// UpMid, Gree fixed_upper_middle, MELCloud 1_up to 5_down, Midea up_mid,
// Sensibo fixedmiddletop, Toshiba Fixed 1. The card keeps five positions from
// top to bottom, or from left to right, and a swing.
const AC_SWING_RE = /swing|range|sweep|full|both|3d|^on$|oscil|schwenk|balay|oscill/;
function acVanePos(raw, axis) {
  if (raw === undefined || raw === null) return null;
  const s = stripAccents(String(raw)).toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!s || ["unknown", "unavailable", "none", "auto", "default", "off", "stop", "stopped"].includes(s)) return null;
  if (AC_SWING_RE.test(s)) return "swing";
  // Daikin's swing mode names the axis that swings.
  if (s === "vertical") return axis === "v" ? "swing" : null;
  if (s === "horizontal") return axis === "h" ? "swing" : null;
  const n = /(\d)/.exec(s);
  if (n) {
    const i = Math.max(1, Math.min(5, Number(n[1])));
    return axis === "v" ? i : i - 3;
  }
  const t = s.replace(/fixed|position|pos|vane|louver|louvre|wind|angle/g, "");
  const mid = /mid|center|centre|milieu|mitte|centro|midden/.test(t);
  if (axis === "v") {
    const up = /top|upper|up|high|haut|oben|alto|arriba/.test(t);
    const down = /bottom|lower|down|low|bas|unten|basso|abajo/.test(t);
    if (up) return mid ? 2 : 1;
    if (down) return mid ? 4 : 5;
    return mid ? 3 : null;
  }
  const left = /left|gauche|links|sinistra|izquierda|esquerda/.test(t);
  const right = /right|droite|rechts|destra|derecha|direita/.test(t);
  if (left) return mid ? -1 : -2;
  if (right) return mid ? 1 : 2;
  return mid || /split|wide/.test(t) ? 0 : null;
}

// How fast the fan blows, in five steps: Panasonic's LowMid, Gree's
// medium high, Daikin's 1 to 5, a fan entity's percentage.
function acFanSpeedOf(raw, pct) {
  if (pct !== null && pct !== undefined) {
    if (pct <= 0) return "";
    return pct <= 20 ? "quiet" : pct <= 45 ? "low" : pct <= 70 ? "medium" : pct <= 90 ? "high" : "turbo";
  }
  const s = stripAccents(String(raw || "")).toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!s) return "";
  if (/turbo|power|boost|max|strong|highest|super|jet/.test(s)) return "turbo";
  if (/quiet|silen|night|mute|sleep|lowest|ultralow|silence/.test(s)) return "quiet";
  const n = /^(\d)$/.exec(s);
  if (n) return ["quiet", "low", "low", "medium", "high", "high"][Math.min(5, Number(n[1]))];
  if (/high/.test(s)) return "high";
  if (/low/.test(s)) return "low";
  return "medium";
}
const AC_FAN_SECONDS = { quiet: 2.2, low: 1.7, medium: 1.2, high: 0.8, turbo: 0.5 };

// A preset says quiet, eco or boost on the units that keep them there.
function acPresetOf(raw) {
  const s = stripAccents(String(raw || "")).toLowerCase();
  if (/eco|econom/.test(s)) return "eco";
  if (/boost|powerful|turbo|power/.test(s)) return "boost";
  if (/quiet|silen|sleep|night/.test(s)) return "quiet";
  return "";
}

const AC_COLORS = {
  off: "var(--disabled-text-color, #9e9e9e)", cool: "#29b6f6", heat: "#ff7043", dry: "#26c6da", fan: "#78909c",
  auto: "#66bb6a", idle: "var(--success-color, #4caf50)", defrost: "#4dd0e1", preheat: "#ffa726", run: "#42a5f5",
};
const AC_LABELS = {
  off: "ac_off", cool: "ac_cooling", heat: "ac_heating", dry: "ac_drying", fan: "ac_fan_only", auto: "ac_auto",
  idle: "ac_idle", defrost: "ac_defrost", preheat: "ac_preheating", run: "running",
};
// The unit's own screen shows the mode by a symbol next to the setpoint: the
// Material Design icons Home Assistant itself uses for them.
const AC_ICONS = {
  cool: "M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z",
  heat: "M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z",
  dry: "M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z",
  fan: "M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z",
  auto: "M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z",
  sun: "M3.55 19.09L4.96 20.5L6.76 18.71L5.34 17.29M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12C18 8.68 15.31 6 12 6M20 13H23V11H20M17.24 18.71L19.04 20.5L20.45 19.09L18.66 17.29M20.45 5L19.04 3.6L17.24 5.39L18.66 6.81M13 1H11V4H13M6.76 5.39L4.96 3.6L3.55 5L5.34 6.81L6.76 5.39M1 13H4V11H1M13 20H11V23H13",
  moon: "M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95Z",
  rocket: "M13.13 22.19L11.5 18.36C13.07 17.78 14.54 17 15.9 16.09L13.13 22.19M5.64 12.5L1.81 10.87L7.91 8.1C7 9.46 6.22 10.93 5.64 12.5M21.61 2.39C21.61 2.39 16.66 .269 11 5.93C8.81 8.12 7.5 10.53 6.65 12.64C6.37 13.39 6.56 14.21 7.11 14.77L9.24 16.89C9.79 17.45 10.61 17.63 11.36 17.35C13.5 16.53 15.88 15.19 18.07 13C23.73 7.34 21.61 2.39 21.61 2.39M14.54 9.46C13.76 8.68 13.76 7.41 14.54 6.63S16.59 5.85 17.37 6.63C18.14 7.41 18.15 8.68 17.37 9.46C16.59 10.24 15.32 10.24 14.54 9.46Z",
  laundry: "M16,21H8A1,1 0 0,1 7,20V12.07L5.7,13.07C5.31,13.46 4.68,13.46 4.29,13.07L1.46,10.29C1.07,9.9 1.07,9.27 1.46,8.88L7.34,3H9C9,4.1 10.34,5 12,5C13.66,5 15,4.1 15,3H16.66L22.54,8.88C22.93,9.27 22.93,9.9 22.54,10.29L19.71,13.12C19.32,13.5 18.69,13.5 18.3,13.12L17,12.12V20A1,1 0 0,1 16,21",
  shake: "M16,19H8V5H16M16.5,3H7.5A1.5,1.5 0 0,0 6,4.5V19.5A1.5,1.5 0 0,0 7.5,21H16.5A1.5,1.5 0 0,0 18,19.5V4.5A1.5,1.5 0 0,0 16.5,3M19,17H21V7H19M22,9V15H24V9M3,17H5V7H3M0,15H2V9H0V15Z",
  pause: "M14,19H18V5H14M6,19H10V5H6V19Z",
  check: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z",
  clock: "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z",
  warm: "M7.95,3L6.53,5.19L7.95,7.4H7.94L5.95,10.5L4.22,9.6L5.64,7.39L4.22,5.19L6.22,2.09L7.95,3M13.95,2.89L12.53,5.1L13.95,7.3L13.94,7.31L11.95,10.4L10.22,9.5L11.64,7.3L10.22,5.1L12.22,2L13.95,2.89M20,2.89L18.56,5.1L20,7.3V7.31L18,10.4L16.25,9.5L17.67,7.3L16.25,5.1L18.25,2L20,2.89M2,22V14A2,2 0 0,1 4,12H20A2,2 0 0,1 22,14V22H20V20H4V22H2Z",
};
// The setpoint as the unit's screen prints it: 24, or 24.5 on the units that
// take halves. No unit and no locale, a seven-segment display has neither.
function acScreenTemp(v) {
  if (v === null || v === undefined || !Number.isFinite(v)) return "";
  const r = Math.round(v * 2) / 2;
  return Number.isInteger(r) ? String(r) : r.toFixed(1);
}
// An attribute value in the words Home Assistant gives it (fan modes and
// presets are translated by the integrations), or cleaned up.
function attrLabel(hass, st, attr, value, cfg) {
  const pinned = cfg && cfg.language && cfg.language !== "auto";
  if (!pinned && st && hass && typeof hass.formatEntityAttributeValue === "function") {
    try {
      const label = hass.formatEntityAttributeValue(st, attr, value);
      if (label && label !== value) return String(label);
    } catch (e) { /* fall through */ }
  }
  const clean = cleanStateLabel(String(value));
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

// A dehumidifier's mode says whether it dries a room or the laundry: Midea's
// clothes_dry, Tuya's laundry, De'Longhi's dry clothes. Shoes are not laundry.
const DH_LAUNDRY_RE = /cloth|laundry|linge|wasch|wasche|ropa|bucato|kleding|tvatt|pranie|pradl|\u8863/;
const DH_COLORS = {
  off: "var(--disabled-text-color, #9e9e9e)", drying: "#29b6f6", laundry: "#1565c0",
  idle: "var(--success-color, #4caf50)", full: "var(--error-color, #f44336)",
};
const DH_LABELS = { off: "ac_off", drying: "ac_drying", laundry: "dh_laundry", idle: "ac_idle", full: "dh_full" };
// A pet fountain: the water runs or it does not, and what an owner needs to
// hear about is the filter, the pump and the water left. Those take the state
// line over the plain running one, the water first since a dry pump burns out.
const FT_MODES = ["off", "flowing", "filter", "pump", "low"];
// What a fountain's pump or mode says, in the words of Petkit, Xiaomi,
// Petlibro, Catlink and Tuya: "Flowing Water (Constant)", "Intermittent",
// "Motion activated", a valve "open". The words that stop it come first, so
// "Do not flow" never reads as flowing.
const FT_STOP_RE = /(^|[^a-z])(off|false|stop|stopped|close|closed|waterless|pause|paused|do.?not.?flow|no.?flow|not.?flowing|idle|standby)([^a-z]|$)/;
const FT_FLOW_RE = /(^|[^a-z])(on|true|yes|running|run|working|flow|flows|flowing|watering|dispensing|normal|smart|eco|constant|continuous|intermittent|interval|scheduled|auto|common|motion|pir|induction|night|open|opened)([^a-z]|$)/;
function ftFlowOf(raw) {
  const s = String(raw === undefined || raw === null ? "" : raw).trim().toLowerCase();
  if (!s) return null;
  if (FT_STOP_RE.test(s)) return false;
  if (FT_FLOW_RE.test(s)) return true;
  return null;
}
// The water in words: a level, a shortage or a contact. A moisture contact
// says there is water when it is on; any other contact says it runs low.
const FT_LOW_RE = /(^|[^a-z])(low|empty|shortage|lack|lacking|waterless|no.?water|not.?enough|insufficient|level.?1|tank.?empty|water.?low|dry)([^a-z]|$)/;
const FT_OK_RE = /(^|[^a-z])(ok|normal|enough|medium|middle|mid|high|full|level.?[2-9]|sufficient)([^a-z]|$)/;
function ftLowOf(st) {
  if (!st) return null;
  const s = String(st.state).trim().toLowerCase();
  const moisture = st.attributes && st.attributes.device_class === "moisture";
  if (["on", "true"].includes(s)) return !moisture;
  if (["off", "false"].includes(s)) return moisture;
  if (FT_OK_RE.test(s)) return false;
  if (FT_LOW_RE.test(s)) return true;
  return null;
}
// A wear counter in days, whatever unit it comes in: hours, minutes and
// seconds are folded to days, a percentage stays one, and a date (the next
// flush) gives the days left until it.
const FT_DAY_UNITS = { d: 1, day: 1, days: 1, h: 1 / 24, hr: 1 / 24, hrs: 1 / 24, hour: 1 / 24, hours: 1 / 24,
  min: 1 / 1440, mins: 1 / 1440, minute: 1 / 1440, minutes: 1 / 1440, s: 1 / 86400, sec: 1 / 86400, seconds: 1 / 86400 };
const FT_COLORS = {
  off: "var(--disabled-text-color, #9e9e9e)", flowing: "#29b6f6",
  filter: "var(--warning-color, #ff9800)", pump: "var(--warning-color, #ff9800)", low: "var(--error-color, #f44336)",
  offline: "var(--disabled-text-color, #9e9e9e)",
};
const FT_LABELS = { off: "ft_off", flowing: "ft_flowing", filter: "ft_filter_due", pump: "ft_pump_due", low: "ft_low_water", offline: "ev_offline" };
// A dehumidifier from its humidifier entity: switched on or off in its state,
// and in its action whether it is drying or has reached the humidity asked.
function dehumidifierModeOf(st) {
  if (!st) return "";
  const state = String(st.state).toLowerCase();
  if (state === "off") return "off";
  if (state !== "on") return "";
  const action = String((st.attributes || {}).action || "").toLowerCase();
  if (action === "idle" || action === "off") return "idle";
  return "drying";
}

// A thermostat or a radiator valve. Named after itself or its maker: Nest,
// ecobee, tado, Netatmo, Honeywell, Hive, Drayton Wiser, Danfoss, Aqara, a
// Zigbee TRV, Fritz!DECT, Homematic.
const THERMOSTAT_NAME_RE = /thermostat|thermostaat|termostat|termostato|\btrv|valve|vanne|ventil|radiat|heizk(o|oe)rper|kopf|tete|nest|ecobee|tado|netatmo|honeywell|lyric|evohome|\bhive\b|wiser|danfoss|aqara|homematic|fritz|\u6e29\u63a7|\u0442\u0435\u0440\u043c\u043e\u0441\u0442\u0430\u0442/;
const TH_LAYOUTS = ["square", "round", "glass", "valve"];
const TH_LABELS = { off: "ac_off", heat: "ac_heating", cool: "ac_cooling", idle: "th_idle", eco: "th_eco", away: "th_away", frost: "th_frost", window: "th_window" };
const TH_COLORS = { off: "var(--disabled-text-color, #9e9e9e)", heat: "#ff7043", cool: "#29b6f6", idle: "var(--secondary-text-color, #727272)",
  eco: "#26a69a", away: "#26a69a", frost: "#29b6f6", window: "#29b6f6" };
// Which drawing: the one asked for, else the maker's or the word's (a Nest
// is round, an ecobee black glass, a valve a valve), else a white square.
function thermostatLayoutOf(cfg, st) {
  if (TH_LAYOUTS.includes(cfg.thermostat_layout)) return cfg.thermostat_layout;
  const a = (st && st.attributes) || {};
  const name = stripAccents(`${cfg.state_entity || ""} ${a.friendly_name || ""} ${cfg.name || ""}`).toLowerCase();
  if (/nest|honeywell|lyric|\bt6\b|round/.test(name)) return "round";
  if (/ecobee|ct200|easycontrol/.test(name)) return "glass";
  if (/\btrv|valve|vanne|ventil|radiat|heizk(o|oe)rper|kopf|tete|danfoss|aqara|sonoff|fritz|thermostatic|thermostatique/.test(name)
    || a.valve_position !== undefined || a.pi_heating_demand !== undefined) return "valve";
  return "square";
}
// What a thermostat is doing: off, heating, cooling or at rest, from its
// action when it gives one, else from the room against the setpoint.
function thermostatModeOf(st) {
  if (!st || ["unknown", "unavailable"].includes(st.state)) return "";
  const state = String(st.state).toLowerCase();
  if (state === "off") return "off";
  const a = st.attributes || {};
  const action = String(a.hvac_action || "").toLowerCase();
  if (["heating", "preheating"].includes(action)) return "heat";
  if (action === "cooling") return "cool";
  if (["idle", "off", "fan", "drying"].includes(action)) return "idle";
  const room = numberOrNull(a.current_temperature), target = numberOrNull(a.temperature);
  if (room === null || target === null) return state === "cool" ? "cool" : "heat";
  if (state === "cool") return room > target + 0.2 ? "cool" : "idle";
  return room < target - 0.2 ? "heat" : "idle";
}
// A preset that changes what the thermostat means: eco, away, frost guard.
function thermostatPresetOf(raw) {
  const p = stripAccents(String(raw || "")).toLowerCase();
  if (/frost|hors.?gel|antigel|antiheladas|frostschutz|vorst/.test(p)) return "frost";
  if (/away|absent|abwesend|ausente|afwezig|vacation|holiday|vacance/.test(p)) return "away";
  if (/eco|night|nuit|sleep|reduit|reduced|spar/.test(p)) return "eco";
  return "";
}

// A small room heater: a fan heater or an oil-filled radiator, read from a
// climate entity or from the plug it sits on.
const SH_COLORS = { off: "var(--disabled-text-color, #9e9e9e)", heating: "#ff7043", idle: "var(--success-color, #4caf50)", fan: "#78909c" };
const SH_LABELS = { off: "ac_off", heating: "ac_heating", idle: "ac_idle", fan: "ac_fan_only" };
function spaceHeaterModeOf(st) {
  if (!st) return "";
  const state = String(st.state).toLowerCase();
  if (state === "off") return "off";
  const action = String((st.attributes || {}).hvac_action || "").toLowerCase();
  const byAction = { heating: "heating", preheating: "heating", idle: "idle", off: "idle", fan: "fan" };
  if (Object.prototype.hasOwnProperty.call(byAction, action)) return byAction[action];
  if (state === "fan_only") return "fan";
  return ["heat", "auto", "heat_cool", "on"].includes(state) ? "heating" : "";
}

// Air purifiers and fans. Every integration names its presets its own way
// (Levoit says sleep, Philips night, Sharp silent, Matter sleep_wind, Xiaomi
// Home translates them), so they are read by family, lowercased.
const AIR_PRESETS = {
  heat: /^(heat|heating|warm|hot)$/,
  night: /sleep|night|silent|quiet|mute|baby|gentle|idle|displayoff|nacht|nuit|noche|notte|nocturn|sommeil|schlaf|sueno|slaap|natt|sen|spanek|\u7761\u7720|\u591c\u95f4/,
  natural: /natur|breeze|brise/,
  turbo: /turbo|rapid|strong|storm|boost|max|power|realize|fast|super/,
  auto: /auto|smart|allergen|bacteria|pollution|^gas$/,
};
function airPresetOf(raw) {
  if (raw === undefined || raw === null) return "";
  const p = stripAccents(String(raw)).toLowerCase().trim();
  if (!p || p === "none" || p === "off") return "";
  for (const [family, re] of Object.entries(AIR_PRESETS)) if (re.test(p)) return family;
  return "manual";
}
// Speeds that come as presets rather than as a percentage: low, medium and
// high, or the levels SwitchBot numbers.
function presetSpeedOf(raw) {
  const p = String(raw || "").toLowerCase();
  if (/^(low|level_1|speed_1|1)$/.test(p)) return 1;
  if (/^(medium|mid|middle|level_2|speed_2|2)$/.test(p)) return 2;
  if (/^(high|level_3|speed_3|3)$/.test(p)) return 3;
  return 0;
}
// How busy the air is, from 1 to 3: two lines, three, or five.
function airLevelOf(pct, preset, presetRaw) {
  if (preset === "night") return 1;
  if (preset === "turbo") return 3;
  const named = presetSpeedOf(presetRaw);
  if (named) return named;
  if (Number.isFinite(pct) && pct > 0) return pct <= 40 ? 1 : pct <= 75 ? 2 : 3;
  return 2;
}
// The seconds a dash of air takes, and a blade a turn, at each level.
const AIR_SPEEDS = { 1: 2.4, 2: 1.6, 3: 0.9 };
const ROTOR_SPEEDS = { 1: 1.1, 2: 0.6, 3: 0.35 };

// Air quality on four levels: good, fair, poor, bad. A PM2.5 reading in
// micrograms, a US AQI, Philips's allergen index from 1 to 12, or the words of
// the integrations, which run from VeSync's four to Matter's six. A small
// whole number on an AQI sensor is an index of its own (Govee's), and a scale
// the card cannot place says nothing rather than something wrong.
const AQ_COLORS = { 1: "#4caf50", 2: "#fdd835", 3: "#ff9800", 4: "#f44336" };
const AQ_LABELS = { 1: "aq_good", 2: "aq_fair", 3: "aq_poor", 4: "aq_bad" };
const AQ_WORDS = {
  excellent: 1, good: 1, very_good: 1, great: 1,
  fair: 2, moderate: 2, normal: 2, average: 2, acceptable: 2, satisfactory: 2,
  poor: 3, bad: 3, unhealthy: 3, slightly_unhealthy: 3, unhealthy_for_sensitive_groups: 3,
  very_poor: 4, very_bad: 4, very_unhealthy: 4, extremely_poor: 4, severe: 4, hazardous: 4, danger: 4,
};
const VESYNC_AQ = ["excellent", "good", "moderate", "poor"];
function aqLevelOf(st, entityId) {
  if (!st) return null;
  const raw = String(st.state).trim();
  const word = stripAccents(raw).toLowerCase().replace(/[\s-]+/g, "_");
  if (["", "unknown", "unavailable", "none", "invalid", "out_of_range"].includes(word)) return null;
  const a = st.attributes || {};
  const num = parseFloat(raw);
  if (!/^-?\d+(\.\d+)?$/.test(raw)) {
    // VeSync counts four steps from excellent to poor, where everyone else
    // calls poor the third: its own options say which scale it is.
    const opts = Array.isArray(a.options) ? a.options.map((o) => String(o).toLowerCase()).filter((o) => o !== "unknown") : [];
    if (opts.length === 4 && VESYNC_AQ.every((o, i) => opts[i] === o)) return VESYNC_AQ.indexOf(word) + 1 || null;
    return AQ_WORDS[word] || null;
  }
  const id = String(entityId || st.entity_id || "").toLowerCase();
  const unit = String(a.unit_of_measurement || "").toLowerCase();
  if (/allergen|(^|_)iai(_|$)/.test(id)) return num <= 3 ? 1 : num <= 6 ? 2 : num <= 9 ? 3 : 4;
  if (a.device_class === "pm25" || /g\/m/.test(unit)) return num <= 12 ? 1 : num <= 35.4 ? 2 : num <= 55.4 ? 3 : 4;
  if (a.device_class === "aqi" || /aqi/.test(id)) {
    if (num <= 6 && Number.isInteger(num)) return null;
    return num <= 50 ? 1 : num <= 100 ? 2 : num <= 150 ? 3 : 4;
  }
  return null;
}

// The air lines a purifier and a fan blow: five of them, listed so that the
// first two, then three, are evenly spread; the speed hides the rest. Up, down
// or sideways, the dashes run from the start of each line to its end.
function windLines(cls, x, y, w, h, dir) {
  const at = [0.08, 0.92, 0.5, 0.29, 0.71];
  const line = (f) => {
    if (dir === "side") {
      const v = (h * f).toFixed(1);
      return `<path d="M1 ${v} C${w * 0.3} ${v - 4} ${w * 0.6} ${+v + 4} ${w - 1} ${v - 1}"/>`;
    }
    const u = (w * f).toFixed(1);
    return dir === "up"
      ? `<path d="M${u} ${h - 1} C${u - 4} ${h * 0.66} ${+u + 4} ${h * 0.33} ${u} 1"/>`
      : `<path d="M${u} 1 C${u - 4} ${h * 0.33} ${+u + 4} ${h * 0.66} ${u} ${h - 1}"/>`;
  };
  return `<svg class="wind ${cls}" style="left: ${x}px; top: ${y}px; width: ${w}px; height: ${h}px" viewBox="0 0 ${w} ${h}">${at.map(line).join("")}</svg>`;
}
// Blades round a hub, in an SVG of their own: an invisible circle keeps the
// group centred on the hub, so a turn does not make them wobble, and r0 lets
// them start at the rim of a motor rather than at its centre.
function fanBlades(cx, cy, n, len, w, r0) {
  return `<g class="fn-rot"><circle cx="${cx}" cy="${cy}" r="${r0 + len + w}" fill="none"/>`
    + Array.from({ length: n }, (_, k) => `<path class="fn-blade" transform="rotate(${k * 360 / n} ${cx} ${cy}) translate(0 ${-r0})" d="M${cx} ${cy} `
      + `C${cx - w} ${cy - len * 0.35} ${cx - w * 0.8} ${cy - len} ${cx + w * 0.25} ${cy - len} C${cx + w * 0.9} ${cy - len * 0.7} ${cx + w * 0.5} ${cy - len * 0.3} ${cx} ${cy}Z"/>`).join("")
    + `</g>`;
}
const AIR_COLORS = { off: "var(--disabled-text-color, #9e9e9e)", run: "#42a5f5", night: "#7986cb", heat: "#ff7043", offline: "var(--disabled-text-color, #9e9e9e)" };
// What the optional screen prints: a number without its unit, a temperature
// with its degree sign.
function airScreenOf(st) {
  if (!st || ["unknown", "unavailable"].includes(st.state)) return "";
  const n = parseFloat(st.state);
  if (!Number.isFinite(n)) return String(st.state).slice(0, 4);
  const unit = String((st.attributes || {}).unit_of_measurement || "");
  return /\u00b0/.test(unit) ? `${Math.round(n)}\u00b0` : String(Math.round(n));
}

// A fan on the ceiling, by its name in any language.
const FAN_CEILING_RE = /ceiling|plafond|decken|techo|soffitto|plafon|teto|takfl|takvif|loftvent|sufit|stropn|\u5438\u9876|\u540a\u6247|\u043f\u043e\u0442\u043e\u043b/;
// A towel warmer on a pilot wire, the French way of driving an electric
// radiator: comfort, eco, frost protection and off, plus the boost and the
// towel drying of Atlantic, Thermor and Acova. Heatzy and Atlantic say it in
// the climate entity's preset, NodOn in a select of its own.
const TW_MODES = ["off", "comfort", "eco", "frost", "boost", "drying"];
const TW_COLORS = {
  off: "var(--disabled-text-color, #9e9e9e)", comfort: "#ff7043", eco: "#9575cd", frost: "#29b6f6", boost: "#f4511e", drying: "#ff8a65",
};
const TW_LABELS = { off: "ac_off", comfort: "tw_comfort", eco: "tw_eco", frost: "tw_frost", boost: "tw_boost", drying: "tw_drying" };
const TW_ICONS = { comfort: "sun", eco: "moon", frost: "cool", boost: "rocket", drying: "laundry" };
function towelModeOf(raw) {
  if (raw === undefined || raw === null) return "";
  const f = stripAccents(String(raw).trim()).toLowerCase();
  if (["", "unknown", "unavailable", "none"].includes(f)) return "";
  if (/^(off|0|arret|stop|aus|uit|apagado|spento)$/.test(f)) return "off";
  if (/boost|turbo|max/.test(f)) return "boost";
  if (/dry|sech|trock|secad|asciug|droog|tork|susz/.test(f)) return "drying";
  if (/frost|hors.?gel|antigel|anti.?freeze|away|absen|vacation|holiday|vacanc|frostschutz/.test(f)) return "frost";
  if (/eco|night|nuit|reduced|reduit|moon|sleep/.test(f)) return "eco";
  if (/comfort|confort|komfort|^home$|^heat$|^on$/.test(f)) return "comfort";
  return "";
}

// The small screen and the air lines the dehumidifier and the two heaters
// share. Warm air rises; the air a dehumidifier or a fan blows goes the other
// way along the same lines.
const MINI_LCD_CSS = `
        .mini-lcd {
          position: absolute; height: 9px; padding: 0 1.5px; border-radius: 1.5px;
          display: flex; align-items: center; justify-content: center; gap: 1px;
          background: rgba(10, 14, 18, 0.88); color: #7fdcff; text-shadow: 0 0 2px currentColor;
          font: 700 6.5px/9px ui-monospace, "SF Mono", Menlo, monospace;
        }
        .mini-lcd svg { width: 7px; height: 7px; flex: none; fill: currentColor; }
        .mini-lcd span:empty { display: none; }
        .machine.mode-off .mini-lcd { display: none; }
        .air-flow { position: absolute; display: none; overflow: visible; }
        .air-flow path {
          fill: none; stroke-width: 2; stroke-linecap: round; stroke-dasharray: 4 5;
          animation: air-up 1.4s linear infinite; animation-delay: var(--anim-offset, 0s);
        }
        .air-flow path:nth-child(2) { animation-delay: calc(-0.45s + var(--anim-offset, 0s)); }
        .air-flow path:nth-child(3) { animation-delay: calc(-0.9s + var(--anim-offset, 0s)); }
        .air-flow.down path { animation-name: air-down; }
        @keyframes air-up { to { stroke-dashoffset: -18; } }
        @keyframes air-down { to { stroke-dashoffset: 18; } }
`;
function miniLcd(cls, icon, text) {
  const svg = AC_ICONS[icon] ? `<svg viewBox="0 0 24 24"><path d="${AC_ICONS[icon]}"/></svg>` : "";
  return `<div class="mini-lcd ${cls}">${svg}<span>${esc(text || "")}</span></div>`;
}
// Three wavy lines, drawn from the bottom up.
function airFlow(cls, w, h, down) {
  const line = (x) => `<path d="M${x} ${h} C${x - w * 0.1} ${h * 0.66} ${x + w * 0.1} ${h * 0.33} ${x} 0"/>`;
  return `<svg class="air-flow ${cls} ${down ? "down" : ""}" viewBox="0 0 ${w} ${h}">${line(w * 0.25)}${line(w * 0.5)}${line(w * 0.75)}</svg>`;
}

// Air fryer. Philips (HomeID and the older HACS integration), Xiaomi (MIoT)
// and Cosori (VeSync) each report their own firmware words, read here once,
// lowercased. What the table does not know falls back on the shared
// vocabulary. A Cosori "heating" is its preheat, and a stop there is the
// owner's, not the end of the cooking. A Philips asking for a "user action"
// in the middle of a cook wants the basket shaken.
const FRYER_STATES = {
  standby: "off", idle: "off", setting: "off", mainmenu: "off", powersave: "off", pairing: "off", shutdown: "off",
  precook: "preheating", preheat: "preheating", heating: "preheating",
  preheatfinish: "preheated", preheatend: "preheated", preheat_finish: "preheated", preheat_end: "preheated", preheat_stop: "off", preheat_pause: "paused",
  cooking_end: "done", cooking_stop: "off", pull_out: "basket_out",
  cooking: "cooking", crispyroast: "cooking", degrease: "cooking",
  user_action: "shake",
  pause: "paused", pause2: "paused", parasetting: "paused", preheatpause: "paused", keepwarmpause: "paused",
  potpause: "basket_out", pullout: "basket_out",
  maintain: "keep_warm", keepwarm: "keep_warm",
  finish: "done", cooked: "done", cookend: "done", keepwarmfinish: "done",
  cookstop: "off", preheatstop: "off",
  appointment: "delayed", delay: "delayed",
};
const FRYER_NORMS = {
  off: "idle", preheating: "preheating", preheated: "paused", cooking: "running", shake: "running",
  paused: "paused", basket_out: "paused", keep_warm: "keep_warm", done: "done", delayed: "delayed", error: "error",
};
const FRYER_FROM_NORM = {
  idle: "off", unknown: "off", preheating: "preheating", running: "cooking", paused: "paused",
  keep_warm: "keep_warm", done: "done", delayed: "delayed", error: "error",
};
// The modes the shared labels do not name well.
const FRYER_LABELS = { cooking: "af_cooking", shake: "af_shake", basket_out: "af_basket_out", preheated: "af_preheated" };
const FRYER_ICONS = {
  preheating: "heat", preheated: "heat", cooking: "fan", shake: "shake", paused: "pause", basket_out: "pause",
  keep_warm: "warm", done: "check", delayed: "clock",
};
function fryerModeOf(raw) {
  if (raw === undefined || raw === null) return "";
  const k = String(raw).trim().toLowerCase().replace(/[\s-]+/g, "_");
  return Object.prototype.hasOwnProperty.call(FRYER_STATES, k) ? FRYER_STATES[k] : "";
}
// Which way a basket is drawn: cooking hot, keeping warm, ready, pulled out
// or resting.
function fryerZoneOf(mode) {
  if (["preheating", "cooking", "shake"].includes(mode)) return "hot";
  if (mode === "keep_warm") return "warm";
  if (mode === "done" || mode === "preheated") return "ready";
  if (mode === "basket_out") return "out";
  return "off";
}

// An EV charger (issue #27). Its status says whether a car is there, whether
// it waits for its owner to authorise it, charges, is paused by the box or by
// the car, waits for a schedule or is done, and each integration says it in
// its own words: OCPP's connector status as the charger sends it (Available,
// SuspendedEVSE), the enum keys of the integrations in Home Assistant itself.
// They are read once, lowercased. Where an integration stretches a word, the
// word keeps its own meaning: Peblar's "suspended" also covers a car waiting
// to be authorised, Blue Current's "available" a charge point with no session
// yet. A word that only says the car is waiting is "connected", never a pause
// or a wait for authorisation it does not name.
// IEC 61851's letters are left to state_map, since a bare "C" could be
// anything on another entity, and so is OCPP's Unavailable: Home Assistant's
// own unavailable means the entity is offline, and nothing else.
const EV_MODES = ["no_vehicle", "connected", "awaiting_auth", "charging", "discharging", "paused", "scheduled", "done", "error",
  "offline"];
const EV_STATES = {
  // OCPP 1.6, ChargePointStatus, as the ocpp integration passes it on: the
  // OCPP 2.0.1 chargers it reads come out in the same words. Reserved can
  // only follow Available, so no car is plugged in yet. Preparing is a car
  // plugged in or a tag presented before a transaction starts: the car is
  // there or about to be, and nothing says it waits for its owner.
  // Unavailable is not here, see above.
  available: "no_vehicle", reserved: "no_vehicle", preparing: "connected", charging: "charging",
  suspendedevse: "paused", suspendedev: "paused", finishing: "done", faulted: "error",
  // The same states in snake case, the way a Modbus integration hands them
  // over (Webasto's Unite), and a bare "suspended" for a box that does not
  // say who suspended the charge (Webasto's Next, and Peblar's State B,
  // "suspended by either EV or charger").
  suspended_evse: "paused", suspended_ev: "paused", suspended: "paused", error: "error",
  // Peblar, the control pilot's letters in words.
  no_ev_connected: "no_vehicle", fault: "error", invalid: "error",
  // Ohme.
  unplugged: "no_vehicle", pending_approval: "awaiting_auth", plugged_in: "connected", paused: "paused", finished: "done",
  // Tesla Wall Connector. Waiting for the car is a car not taking what the
  // box offers, OCPP's SuspendedEV. Its ready, a car plugged in, is left to
  // the shared words: on a Wallbox, Ready is a box with no car at it.
  not_connected: "no_vehicle", connected: "connected", negotiating: "connected",
  waiting_car: "paused", charging_reduced: "charging", charging_finished: "done",
  // NRGkick.
  standby: "no_vehicle",
  // OpenEVSE: sleeping and disabled are its two ways of pausing, and every
  // fault has a word of its own.
  sleeping: "paused", disabled: "paused", vent_required: "error", diode_check_failed: "error", gfci_fault: "error",
  gfci_self_test_failure: "error", no_ground: "error", stuck_relay: "error", over_temperature: "error",
  // Lektrico, the one that says when it waits for its schedule.
  need_auth: "awaiting_auth", paused_by_scheduler: "scheduled",
  // Blue Current, whose charge point can be offline in its cloud.
  offline: "offline",
  // The words of the other chargers, read in their source code: no car at
  // the box. Idle and disconnected say no car on every charger that uses
  // them (Greencell, Nexblue, Pod Point, Wattpilot, go-e; Tessie, Victron,
  // Easee, Zaptec); on a Wallbox, disconnected may be the box off its cloud,
  // which state_map sets right.
  idle: "no_vehicle", disconnected: "no_vehicle", charger_free: "no_vehicle", plug_not_connected: "no_vehicle",
  ev_disconnected: "no_vehicle", no_car: "no_vehicle", charger_ready_no_vehicle: "no_vehicle",
  // A cable in an Alfen's socket with no car on it is no car either.
  cable_connected: "no_vehicle",
  // A car at the box, nothing asked of it yet.
  charger_insert: "connected", plugged_waiting: "connected", ready_to_charge: "connected", ev_connected: "connected",
  preparing_charging: "connected", waiting_for_vehicle: "connected", wait_for_car: "connected", wait_car: "connected",
  connected_requesting: "connected", awaiting_start: "connected", waiting_for_start: "connected", sleep_mode: "connected",
  // Waiting for a tag, a card, a button or an app.
  awaiting_authorization: "awaiting_auth", authenticating: "awaiting_auth", authorizing: "awaiting_auth",
  waiting_for_rfid: "awaiting_auth", waiting_for_swipe: "awaiting_auth", waiting_for_button: "awaiting_auth",
  station_locked: "awaiting_auth", locked_car_connected: "awaiting_auth", ev_connected_press_start: "awaiting_auth",
  // Charging, in all its flavours.
  active_mode: "charging", charger_charging: "charging", plugged_charging: "charging", connected_charging: "charging",
  start_charging: "charging", boosting: "charging", charging_normal: "charging", charging_simplified: "charging",
  solar_charging: "charging", partial_solar_charging: "charging", switching_to_1_phase: "charging",
  switching_to_3_phase: "charging",
  // J1772's state D, a car charging that asks for ventilation: not a fault.
  ventilation_required: "charging",
  // Held back, by the box or by the car.
  charger_pause: "paused", charger_wait: "paused", ev_waiting: "paused", waiting_for_car: "paused",
  waiting_for_ev: "paused", waiting_for_car_demand: "paused", wait_vehicle_charging: "paused", lb_waiting: "paused",
  awaiting_load_balancing: "paused", paused_due_to_equalizer: "paused", waiting_in_queue_by_power_sharing: "paused",
  waiting_in_queue_by_power_boost: "paused", waiting_in_queue_by_eco_smart: "paused", not_ready_force_stopped: "paused",
  ev_ready_to_charge: "paused", waiting_for_power: "paused", solar_charging_wait: "paused", low_soc: "paused",
  suspended_over_current: "paused", suspended_hf_switching: "paused", load_balancing_forced_off: "paused",
  // Waiting for its hour, a cheaper tariff or the sun.
  scheduled: "scheduled",
  awaiting_scheduled_start: "scheduled", awaiting_smart_start: "scheduled", delay_waiting: "scheduled",
  charging_reservation: "scheduled", connected_waiting_for_schedule: "scheduled", high_tariff_period: "scheduled",
  out_of_activation_period: "scheduled", waiting_for_sun: "scheduled",
  // Done, the car still at the box.
  completed: "done", complete: "done", completed_full_charge: "done", charged: "done", charger_end: "done",
  connected_finished: "done", charging_completed: "done", finish_wait_vehicle: "done", finish_wait_disconnect: "done",
  charging_finished_vehicle_still_connected: "done",
  // Faults.
  station_fault: "error", out_of_service: "error", charger_fault: "error", charger_free_fault: "error",
  pilot_fault: "error", evse_fault: "error", ground_fault: "error", error_car: "error", error_evse: "error",
  erratic_ev: "error", error_temperature_too_high: "error", error_dead_powerboard: "error",
  error_overcurrent: "error", error_pen_fault: "error", charging_fault_1: "error", charging_fault_2: "error",
  see_error_state: "error", waiting_mid_failed: "error", waiting_mid_safety_margin_exceeded: "error",
  // The car giving energy back, to the home or the grid (V2H, V2G). No
  // standard has a status for it, neither OCPP up to 2.1 nor ISO 15118-20:
  // the Wallbox Quasar says it in a word, as do Sigenergy's DC charger and
  // the Volvo and Volkswagen integrations, and Renault for the grid.
  discharging: "discharging", v2g_discharging: "discharging",
};
// Chargers write the same word in many ways: Waiting for car demand,
// suspended-ev, charging normal. Folded to one spelling, lower case with
// underscores, they meet the table above.
function evKey(raw) {
  return String(raw).trim().toLowerCase().replace(/[\s,\-]+/g, "_").replace(/^_+|_+$/g, "");
}
// The pause that may be the end. SuspendedEV is a car that stopped taking the
// energy the box offers; with energy already in the session and no power
// flowing, it has its charge. SuspendedEVSE is the box holding back (a
// schedule, the solar surplus, load balancing) and resumes on its own, and a
// bare "suspended" does not say which: both stay a pause whatever the
// session holds.
const EV_SUSPENDED_BY_CAR = ["suspendedev", "suspended_ev", "waiting_car", "waiting_for_car_demand", "ev_waiting",
  "charger_wait", "waiting_for_car", "waiting_for_ev", "wait_vehicle_charging"];
// The states with a car at the plug.
const EV_CAR_STATES = ["connected", "awaiting_auth", "charging", "discharging", "paused", "scheduled", "done"];
// How each state runs the rest of the card.
const EV_NORMS = {
  no_vehicle: "idle", connected: "idle", awaiting_auth: "idle", charging: "running", discharging: "running", paused: "paused",
  scheduled: "delayed", done: "done", error: "error", offline: "unknown",
};
// The card's own colours wherever a state is one of its own: charging is the
// blue of running, a pause orange, the schedule the purple of a delayed start,
// done green. A car plugged in and waiting is teal, one waiting for its owner
// amber, the colour of something to do. A car giving energy back takes the
// violet of energy returned in Home Assistant's energy dashboard, which is
// also the colour of a discharging Quasar's light.
const EV_COLORS = {
  no_vehicle: "var(--disabled-text-color, #9e9e9e)", connected: "#26a69a", awaiting_auth: "#ffb300",
  charging: "var(--info-color, #2196f3)", discharging: "var(--energy-grid-return-color, #8353d1)",
  paused: "var(--warning-color, #ff9800)", scheduled: "#9c27b0",
  done: "var(--success-color, #4caf50)", error: "var(--error-color, #f44336)", offline: "var(--disabled-text-color, #9e9e9e)",
};
// Home Assistant's own words for an entity it cannot read, in its own
// spelling. An integration's "Unavailable" is a word of the charger's.
const HA_OFFLINE_STATES = ["unavailable", "unknown"];
// The status as the charger means it, or "" for a word the card does not know,
// which then reads as on any other appliance. An entry of state_map wins, as
// everywhere, and names one of the ten; "*" catches what is left.
function evModeOf(raw, stateMap) {
  if (raw === undefined || raw === null) return "";
  const s = String(raw).trim();
  if (HA_OFFLINE_STATES.includes(s)) return "offline";
  if (stateMap && Object.prototype.hasOwnProperty.call(stateMap, s)) return EV_MODES.includes(stateMap[s]) ? stateMap[s] : "";
  const k = evKey(s);
  if (Object.prototype.hasOwnProperty.call(EV_STATES, k)) return EV_STATES[k];
  if (stateMap && Object.prototype.hasOwnProperty.call(stateMap, "*")) return EV_MODES.includes(stateMap["*"]) ? stateMap["*"] : "";
  return "";
}
// Whether a car is plugged in: a plug's contact, or a cable or vehicle state
// in words (a cable at the box with no car on it is no car). null when the
// entity cannot say, which leaves the status alone. IEC 61851's letters are
// not read here either.
const EV_PLUGGED = ["on", "true", "yes", "plugged", "plugged_in", "connected", "vehicle_connected", "vehicle_locked",
  "vehicle_detected", "ev_connected", "car_connected", "connected_locked", "connected_unlocked"];
const EV_UNPLUGGED = ["off", "false", "no", "unplugged", "not_plugged", "disconnected", "not_connected", "cable_only",
  "no_vehicle", "no_ev_connected", "no_car", "ev_disconnected"];
function evPluggedOf(st) {
  if (!st) return null;
  const k = String(st.state).trim().toLowerCase().replace(/[\s-]+/g, "_");
  if (EV_PLUGGED.includes(k)) return true;
  if (EV_UNPLUGGED.includes(k)) return false;
  return null;
}
// What an error entity says: a contact on, a code other than zero, or a word
// other than one of the ways of saying there is none, OCPP's NoError first.
const EV_NO_ERROR_RE = /^(no.?error|no.?errors|no.?fault|none|ok|off|false|0|-+|kein.?fehler|aucune?.?erreur|pas.?d.?erreur|sin.?error|nessun.?errore|geen.?fout|ingen.?fel|ingen.?feil|ingen.?fejl|brak.?bledu|zadna.?chyba)$/;
function evErrorOf(st) {
  if (!st) return { active: false, text: "" };
  const s = String(st.state).trim();
  const f = stripAccents(s).toLowerCase();
  if (["", "unknown", "unavailable"].includes(f) || EV_NO_ERROR_RE.test(f)) return { active: false, text: "" };
  if (["on", "true", "problem"].includes(f)) return { active: true, text: "" };
  const n = Number(f);
  if (Number.isFinite(n)) return { active: n !== 0, text: n !== 0 ? s : "" };
  return { active: true, text: s };
}
// A charger's power in watts, whichever unit its meter reports: most of them
// count in kilowatts, and the threshold is written in watts. Milliwatts and
// megawatts differ by the case of their M alone, so mW is read as written.
function wattsOf(hass, entityId) {
  const v = numericState(hass, entityId);
  if (v === null) return null;
  const written = String(unitOf(hass, entityId)).trim();
  if (written === "mW") return v / 1000;
  const unit = written.toLowerCase();
  return unit === "kw" ? v * 1000 : unit === "mw" ? v * 1e6 : v;
}
// The threshold a charger's power has to pass to be charging, when none is
// given: well above what a box draws at rest, well under the 1.4 kW of the
// slowest charge.
const EV_POWER_THRESHOLD = 100;
// How fast the energy runs along the cable, in seconds per lap of its
// dashes, by the power going into the car: a solar surplus or a socket, a
// single phase, a three-phase box, and 22 kW or a DC box. In steps rather
// than in proportion, so that the cable does not jump at every reading of
// the meter. Without a meter it runs at the single phase's pace.
const EV_FLOW_STEPS = [[15000, 0.3], [6000, 0.4], [3000, 0.6], [0, 1]];
const EV_FLOW_DEFAULT = 0.6;
function evFlowSeconds(watts) {
  if (watts === null || !Number.isFinite(watts)) return EV_FLOW_DEFAULT;
  return EV_FLOW_STEPS.find(([min]) => Math.abs(watts) >= min)[1];
}
// How long the plug going in or out, or the end of a charge, is played for,
// in milliseconds. Past it, a redraw shows the state as it is.
const EV_ONE_SHOT_MS = 1600;
// An enum sensor whose list of states says it charges cars: "charging" next
// to a word only a charger uses, as Home Assistant publishes the list with the
// entity. Lektrico names its device after its model and its serial, Blue
// Current after the charge point.
const EV_OPTION_WORDS = ["available", "no_ev_connected", "unplugged", "not_connected", "plugged_in", "pending_approval",
  "need_auth", "paused_by_scheduler", "waiting_car", "charging_finished", "suspended_ev", "suspended_evse", "vent_required", "wakeup",
  "charger_free", "charger_insert", "plugged_waiting", "waiting_for_car", "ev_waiting", "lb_waiting", "station_locked", "awaiting_authorization"];
function evOptionsSayCharger(st) {
  const options = st && st.attributes && Array.isArray(st.attributes.options) ? st.attributes.options.map(evKey) : [];
  return options.includes("charging") && options.some((o) => EV_OPTION_WORDS.includes(o));
}
// The names a charger goes by: what it is, in the languages of the card, its
// makers and the integrations that read it, and the icons Home Assistant
// draws charging stations with.
const EV_NAME_RE = /wall.?box|ev.?charg|car.?charg|evse|charge.?point|charging.?station|wall.?connector|ocpp|status.?connector|peblar|nrgkick|openevse|lektrico|blue.?current|webasto|easee|zaptec|go.?e.?charger|wattpilot|zappi|hypervolt|nexblue|technove|pod.?point|charge.?amps|(^|[^a-z])(ohme|keba|alfen)([^a-z]|$)|ladestation|lades(a|ae|\u00e4)ule|ladepunkt|borne.?(de.?)?recharge|laadpaal|laadpunt|laadstation|punto.?de.?recarga|estacion.?de.?carga|cargador.?(de.?)?(ve|coche|vehiculo)|colonnina|stazione.?di.?ricarica|posto.?de.?carregamento|carregador.?(de.?)?(ve|carro)|laddbox|laddstolpe|ladeboks|ladestasjon|stacja.?ladowania|nab(i|\u00ed)jec(i|\u00ed).?stanic|\u0437\u0430\u0440\u044f\u0434\u043d\u0430\u044f.?\u0441\u0442\u0430\u043d\u0446|\u5145\u7535\u6869|ev-station|ev-plug/;

// What a heat pump's valve says. HeishaMon reads its 2-way valve Heating or
// Cooling and its 3-way valve Room or Tank: a position, which names the mode
// the water is going to, whatever field the valve was put in. Room names
// nothing, since it is the heating or the cooling, whichever the other valve
// says.
function hpValveMode(raw) {
  if (raw === undefined || raw === null) return "";
  if (/\btank\b/.test(stripAccents(String(raw)).toLowerCase())) return "hot_water";
  const mode = heatPumpModeOf(raw, {}, null, false);
  return ["space_heating", "hot_water", "cooling"].includes(mode) ? mode : "";
}

// A contact that is on, in the words indicators use.
const HP_ON_WORDS = ["on", "true", "yes", "heating", "active"];

// A water_heater entity's state is its operation mode. Home Assistant already
// translates those, so its label wins unless the card's language is pinned.
function modeLabel(hass, st, raw, cfg) {
  const pinned = cfg && cfg.language && cfg.language !== "auto";
  if (!pinned && st && hass && typeof hass.formatEntityState === "function") {
    try {
      const label = hass.formatEntityState(st, raw);
      if (label && label !== raw) return label;
    } catch (e) {
      /* fall through to the local cleanup */
    }
  }
  const clean = cleanStateLabel(raw);
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

