// What a 3D printer reports, read in the integrations' own code: OctoPrint and
// PrusaLink in the core, Bambu Lab, Moonraker (Klipper, Qidi), Creality,
// Elegoo, Flashforge, Anycubic, Snapmaker and RepRapFirmware. Each has its
// own list, as an enum or a raw string; they are matched lowercased.
const PRINTER_STATES = {
  printing: "printing", printing_sd: "printing", printing_streaming: "printing", running: "printing",
  processing: "printing", print_started: "printing", printing_recovery: "printing", recovery: "printing",
  resuming: "printing", finishing: "printing", simulating: "printing", building: "printing", dropping: "printing", lifting: "printing",
  prepare: "preparing", preparing: "preparing", init: "preparing", slicing: "preparing", busy: "preparing", startup: "preparing",
  starting: "preparing", starting_sd: "preparing", starting_streaming: "preparing",
  "self-testing": "preparing", self_testing: "preparing", checking: "preparing", file_checking: "preparing",
  printers_checking: "preparing", devices_testing: "preparing", exposure_testing: "preparing",
  downloading: "preparing", file_transferring: "preparing", transferring_file: "preparing",
  preheating: "preheating", heating: "preheating",
  paused: "paused", pause: "paused", pausing: "paused",
  attention: "attention",
  complete: "done", completed: "done", finished: "done", finish: "done",
  abort: "cancelled", aborted: "cancelled", cancelled: "cancelled", canceled: "cancelled", cancelling: "cancelled", stopped: "cancelled", stopping: "cancelled",
  failed: "failed",
  error: "error", offline_after_error: "error", halted: "error",
  idle: "idle", standby: "idle", operational: "idle", ready: "idle", available: "idle",
  open_serial: "idle", detect_serial: "idle", connecting: "idle",
  offline: "offline", off: "offline", shutdown: "offline", disconnected: "offline",
};
// How each of those runs the card: a cancelled job is over without being
// finished, and a failed one reads as an error.
const PRINTER_NORMS = {
  printing: "running", preparing: "running", preheating: "preheating", paused: "paused", attention: "paused",
  done: "done", cancelled: "idle", failed: "error", error: "error", idle: "idle", offline: "idle",
};
const PRINTER_LABELS = {
  printing: "p3_printing", preparing: "p3_preparing", preheating: "preheating", paused: "paused",
  attention: "p3_attention", done: "done", cancelled: "p3_cancelled", failed: "p3_failed", error: "error",
  idle: "idle", offline: "p3_offline", leveling: "p3_leveling", filament: "p3_filament",
  cooling: "p3_cooling", calibrating: "p3_calibrating", homing: "p3_homing",
};
// The same warm tone as every heater on the card, and the cold blue of the
// fridge for cooling down. The other steps of a job keep the running colour.
const PRINTER_COLORS = { preheating: "#ff7043", cooling: "#29b6f6" };
const NORM_PRINTER_MODES = { running: "printing", preheating: "preheating", paused: "paused", done: "done", idle: "idle", error: "error" };

// What the printer is busy with inside a job. Bambu Lab says it in its
// current stage, Elegoo in its print status, and a few printers in their
// state itself (leveling, homing). A milestone such as preheating_completed
// stays up for the whole job on an Elegoo, so it names no step at all.
function printerPhaseOf(raw) {
  const f = String(raw === undefined || raw === null ? "" : raw).trim().toLowerCase();
  if (!f || /_complete(d)?$/.test(f)) return "";
  if (/pause/.test(f)) return "paused";
  if (/preheat|heating_hotend|heating_chamber|waiting_for_heatbed|waiting_chamber|thermal_precondition|preparing_hotend/.test(f)) return "preheating";
  if (/cool/.test(f)) return "cooling";
  if (/level|scanning_bed|measuring_surface/.test(f)) return "leveling";
  if (/filament|loading|feeding|preparing_ams|changingtool|changing_tool/.test(f)) return "filament";
  if (/calibrat|input_shaping|pid_tuning|resonance|motor_noise|accuracy/.test(f)) return "calibrating";
  if (/homing/.test(f)) return "homing";
  return "";
}

// The state as the printer means it, and the step it names when it names one.
function printerModeOf(raw, stateMap) {
  if (raw === undefined || raw === null) return { mode: "", phase: "" };
  const s = String(raw).trim();
  if (stateMap && Object.prototype.hasOwnProperty.call(stateMap, s)) {
    return { mode: NORM_PRINTER_MODES[stateMap[s]] || "", phase: "" };
  }
  const f = s.toLowerCase();
  let mode = Object.prototype.hasOwnProperty.call(PRINTER_STATES, f) ? PRINTER_STATES[f] : "";
  const phase = mode === "preheating" ? "" : printerPhaseOf(f);
  if (!mode && phase) mode = phase === "paused" ? "paused" : "preparing";
  // A milestone inside a job (Elegoo's preheating_completed): the job goes on.
  if (!mode && /_complete(d)?$/.test(f) && !/^(print|job)/.test(f)) mode = "printing";
  return { mode, phase: phase === "paused" ? "" : phase };
}

function printerNorm(raw, stateMap) {
  const { mode } = printerModeOf(raw, stateMap);
  return mode ? PRINTER_NORMS[mode] : normalizeState(raw, stateMap);
}

// The card reads the state of a 3D printer with its own vocabulary, and every
// other appliance with the shared one.
function normFor(type, raw, stateMap) {
  if (type === "printer_3d") return printerNorm(raw, stateMap);
  // A charger's words are its own, state_map first; a word the card does not
  // know falls back on the shared vocabulary, as anywhere else.
  if (type === "ev_charger") {
    const mode = evModeOf(raw, stateMap);
    if (mode) return EV_NORMS[mode];
  }
  // An air fryer's firmware words come first, unless state_map says otherwise.
  if (type === "air_fryer" && !(stateMap && raw !== undefined && raw !== null
    && Object.prototype.hasOwnProperty.call(stateMap, String(raw).trim()))) {
    const mode = fryerModeOf(raw);
    if (mode) return FRYER_NORMS[mode];
  }
  const norm = normalizeState(raw, stateMap);
  // A coffee machine warming up has not made anything yet; a kettle holds its
  // water at temperature, and "heat" is its thermostat at work (Stagg).
  const mappedOwn = !!stateMap && raw !== undefined && raw !== null && Object.prototype.hasOwnProperty.call(stateMap, String(raw).trim());
  if (!mappedOwn && raw !== undefined && raw !== null) {
    const w = String(raw).trim().toLowerCase();
    if (type === "coffee" && w === "warming") return "preheating";
    if (type === "kettle" && w === "hold") return "keep_warm";
    if (type === "kettle" && w === "heat") return "running";
  }
  // A laundry machine or a dishwasher whose state names its step is running,
  // even on a word the card does not sort: LG reports soaking and detecting,
  // Whirlpool cycle_filling, and a step only exists inside a cycle. An entry
  // of state_map says what the state is, and is not second-guessed.
  if (norm === "unknown" && LAUNDRY_TYPES.includes(type) && raw !== undefined && raw !== null
    && mapInfoValue(String(raw).trim(), stateMap) === null && stepOfWord(raw)) return "running";
  return norm;
}

// What a state says about running, for the day's running time. A heat pump
// and a boiler name a mode rather than a cycle: space_heating, hot_water,
// cooling, defrost and starting are the appliance at work, idle and waiting
// are not. Their state_map targets those modes, which normFor does not sort,
// so the day would never start a run. History rows carry no attributes, so
// only the state's own words are read. The state of a climate or water_heater
// entity is a mode the user picked, not what the appliance does: there only an
// explicit state_map entry is taken as a mode, as on the card itself.
function todayNormFor(type, raw, stateMap, modeEntity) {
  if (type === "heat_pump") {
    const mode = heatPumpModeOf(raw, {}, stateMap, modeEntity);
    if (mode) return mode === "idle" ? "idle" : "running";
  }
  if (type === "boiler") {
    const mapped = !!stateMap && raw !== undefined && raw !== null
      && Object.prototype.hasOwnProperty.call(stateMap, String(raw).trim());
    const mode = !modeEntity || mapped ? boilerModeOf(raw, stateMap) : "";
    if (mode) return mode === "idle" || mode === "waiting" ? "idle" : "running";
  }
  return normFor(type, raw, stateMap);
}

// A print file as a person names it: no folder, no slicer extension.
function printerFileName(raw) {
  const base = String(raw).split(/[\\/]/).pop();
  return base.replace(/\.(gcode|gco|g|bgcode|3mf|ufp|ctb|goo|pwmx)$/i, "") || base;
}

// One state_map target, checked against the categories a map may name.
function mappedState(target) {
  if (MAPPABLE_STATES.includes(target)) return target;
  return PHASE_STATE_TARGETS[target] || "unknown";
}

// HomeWhiz (Beko, Grundig, Arcelik, Bauknecht) hands over the keys of the
// machine's own firmware, lowercased: DEVICE_STATE_RUNNING. Read as words they
// say nothing, since no keyword can start inside a key, and they would mislead
// if they could: "on" there is a machine switched on and waiting for a
// programme, and a delay counting down is not running. A paused countdown will
// not start by itself, so it is a pause rather than a delay. Cancelling drains
// the water out, which the card counts as running, like an aborted cycle.
const HOMEWHIZ_STATES = {
  device_state_on: "idle", device_state_off: "idle", device_state_settings: "idle",
  device_state_door_open: "idle",
  device_state_running: "running", device_state_cooking: "running", device_state_cancelling: "running",
  device_state_paused: "paused", device_state_time_delay_paused: "paused",
  device_state_time_delay_active: "delayed",
};

// The states a keyword cannot tell, as the integrations spell them: Miele, LG
// ThinQ, SmartThings, Whirlpool and Home Connect. "_" is a letter to a keyword,
// so power_off and program_ended would read nothing, and running_end "run".
function doorStateOpen(state, cfg) {
  if (cfg.door_open_state) return state === cfg.door_open_state;
  // Home Connect's door is an enum sensor: open, closed, locked.
  return ["on", "open", "opened", "true", "ajar"].includes(String(state).trim().toLowerCase());
}
const INTEGRATION_STATES = {
  // Miele
  in_use: "running", autocleaning: "running", program_ended: "done", failure: "error", program_interrupted: "error",
  waiting_to_start: "delayed", programmed: "idle", rinse_hold: "paused", not_connected: "unknown",
  // LG ThinQ
  power_off: "idle", initial: "idle", initializing: "idle", sleep: "idle", reserved: "delayed", running_end: "done", end_cooling: "running",
  cook: "running", cooking_in_progress: "running", cook_complete: "done", preheat_complete: "running", preheating_is_done: "running",
  // SmartThings
  stop: "idle", fast_preheat: "preheating", time_hold_preheat: "preheating", stone_heating: "preheating", searing: "running", defrosting: "running",
  // Whirlpool
  hard_stop_or_error: "error", exception: "error", power_failure: "error", cancelled: "idle", setting: "idle", system_initialize: "idle",
  // Home Connect, with its long key cut to the last part
  actionrequired: "paused", action_required: "paused",
  // Midea, ConnectLife, GE, Xiaomi's cookers, Tokit, Nespresso, Philips, De'Longhi
  start: "running", work: "running", working: "running", add_clothes: "running", refreshing: "running", recovering: "running",
  order: "delayed", reservation: "delayed", delay_run: "delayed", dsm_delay_run: "delayed",
  stand_by: "idle", program_select: "idle", low_power: "idle", power_up: "idle", asleep: "idle", online: "idle", waiting: "idle",
  turned_off: "idle", power_save: "idle", rinsing_ready: "idle",
  eoc: "done", rinsing_paused: "paused",
  finishing_unsuccessfully: "error", suspended_alarm: "error", unusual: "error", out_of_order: "error", overheated: "error",
  precook: "preheating", autokeepwarm: "keep_warm", keeptemp: "keep_warm", keep_temp: "keep_warm", keeping_warm: "keep_warm", warm: "keep_warm",
};
// The order a state in snake case is read in: delay_wash is a wait, wash_done
// is over and heating_off is off, whichever word comes first.
const SECOND_PASS_ORDER = ["error", "delayed", "paused", "done", "preheating", "keep_warm", "idle", "running"];

function normalizeState(raw, stateMap) {
  if (raw === undefined || raw === null) return "unknown";
  const s = String(raw).trim();
  if (["unknown", "unavailable", "none", ""].includes(s.toLowerCase())) return "unknown";
  if (stateMap && Object.prototype.hasOwnProperty.call(stateMap, s)) return mappedState(stateMap[s]);
  if (Object.prototype.hasOwnProperty.call(HOMEWHIZ_STATES, s)) return HOMEWHIZ_STATES[s];
  // LG's dash is a machine with nothing to report.
  if (/^-+$/.test(s)) return "idle";
  const exact = s.toLowerCase();
  if (Object.prototype.hasOwnProperty.call(INTEGRATION_STATES, exact)) return INTEGRATION_STATES[exact];
  // BSH.Common.EnumType.OperationState.ActionRequired, Delay Run, stand-by.
  const key = exact.slice(exact.lastIndexOf(".") + 1).trim().replace(/[\s-]+/g, "_");
  if (Object.prototype.hasOwnProperty.call(INTEGRATION_STATES, key)) return INTEGRATION_STATES[key];
  const flat = stripAccents(s);
  const low = flat.toLowerCase();
  // A word that says there is none, then one that outranks what comes with
  // it: no_error is fine, a cleaning paused on a system error is an error.
  const words = !/^(no|not|kein|keine|sans|ohne)[\s_.-]/.test(low);
  if (!words) return "idle";
  if (/(^|[\s_.-])(error|fault|failed|failure)($|[\s_.-])/.test(low)) return "error";
  if (/(^|[\s_.-])paused?($|[\s_.-])/.test(low)) return "paused";
  // "_" is a letter to a keyword, so a state in snake case is read in separate
  // words, and a word further along may change what the first one said.
  const spaced = low.replace(/[_.]+/g, " ");
  if (spaced !== low) {
    for (const norm of SECOND_PASS_ORDER) {
      if (STATE_KEYWORD_PATTERNS[norm].some((re) => re.test(spaced))) return norm;
    }
  } else {
    for (const norm of Object.keys(STATE_KEYWORD_PATTERNS)) {
      if (STATE_KEYWORD_PATTERNS[norm].some((re) => re.test(flat))) return norm;
    }
  }
  // A state_map may end on a catch-all. Machines that run one long programme
  // in many named steps, washer-dryers above all, report dozens of values that
  // all mean "running": naming the handful that do not, and sending the rest
  // to one category, is the short way round. It comes last on purpose, so the
  // states the card already knows keep their own meaning.
  if (stateMap && Object.prototype.hasOwnProperty.call(stateMap, "*")) return mappedState(stateMap["*"]);
  return "unknown";
}

const STATE_COLORS = {
  idle: "var(--disabled-text-color, #9e9e9e)",
  running: "var(--info-color, #2196f3)",
  // Same warm tone as the heating elements: preheating reads as "warming up",
  // not as a fourth kind of "running".
  preheating: "#ff7043",
  paused: "var(--warning-color, #ff9800)",
  done: "var(--success-color, #4caf50)",
  delayed: "#9c27b0",
  error: "var(--error-color, #f44336)",
  unknown: "var(--disabled-text-color, #9e9e9e)",
  // Fridge health. "fridge_ok" is the cold blue of the temperature displays,
  // so a healthy fridge reads as cold rather than as "idle" grey.
  fridge_ok: "#4fc3f7",
  fridge_cooling: "#4fc3f7",
  // A fridge between two cycles is at rest, the grey every other appliance
  // uses for standby.
  fridge_standby: "var(--disabled-text-color, #9e9e9e)",
  // A feeder at rest is idle, and a feeder serving is doing something: the
  // same two colours as everywhere else on the card.
  feeder_ready: "var(--disabled-text-color, #9e9e9e)",
  // An empty tank is the one thing a feeder cannot fix by itself.
  feeder_empty: "var(--warning-color, #ff9800)",
  feeder_feeding: "var(--info-color, #2196f3)",
  temp_high: "var(--warning-color, #ff9800)",
  door_open: "var(--error-color, #f44336)",
  unplugged: "var(--error-color, #f44336)",
  // A meter at 0 W cannot tell a long compressor pause from a pulled plug:
  // worth a look, not an alarm.
  no_power: "var(--warning-color, #ff9800)",
  // Coffee machine consumables. Orange rather than red: the machine is not
  // broken, it is waiting for you.
  water_empty: "var(--warning-color, #ff9800)",
  beans_empty: "var(--warning-color, #ff9800)",
  tray_full: "var(--warning-color, #ff9800)",
  descale: "var(--warning-color, #ff9800)",
  // Amber: the food is ready and being held, which is neither "running" blue
  // nor the green of a cycle that is over and needs emptying.
  keep_warm: "#ffb300",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// The device's maker and model, from the device registry (#96): entities are
// often named after the room, the model says what the appliance is. Carried in
// an attribute of its own that only the name matching reads, never shown.
const DEVICE_ATTR = "__hac_device";
const DEVICE_STATES = new WeakMap();
function stateObj(hass, entityId) {
  const s = entityId && hass.states[entityId] ? hass.states[entityId] : null;
  if (!s) return null;
  const reg = hass.entities && hass.entities[entityId];
  const dev = reg && reg.device_id && hass.devices && hass.devices[reg.device_id];
  const text = dev ? [dev.manufacturer, dev.model, dev.model_id].filter((v) => v && typeof v === "string").join(" ") : "";
  if (!text) return s;
  const hit = DEVICE_STATES.get(s);
  if (hit && hit.text === text) return hit.out;
  const out = { ...s, attributes: { ...s.attributes, [DEVICE_ATTR]: text } };
  DEVICE_STATES.set(s, { text, out });
  return out;
}
// What a state's name says, with its device's maker and model.
function stHay(st) {
  const a = (st && st.attributes) || {};
  return `${a.friendly_name || ""} ${a[DEVICE_ATTR] || ""}`;
}

// An entity you cannot act on. Integrations routinely drop an option to
// unavailable while the appliance is off (Home Connect does it with a
// hood's venting level), and opening the more-info dialog of such an
// entity is a dead end, so the card must not invite the click.
function entityUsable(hass, entityId) {
  const st = stateObj(hass, entityId);
  return !!st && !["unavailable", "unknown"].includes(String(st.state).toLowerCase());
}

function numericState(hass, entityId) {
  const st = stateObj(hass, entityId);
  if (!st) return null;
  const v = parseFloat(st.state);
  return Number.isFinite(v) ? v : null;
}

// An energy meter's reading in kWh, whatever unit it counts in.
function energyKwh(hass, entityId) {
  const v = numericState(hass, entityId);
  if (v === null) return null;
  const u = unitOf(hass, entityId).toLowerCase();
  return u === "wh" ? v / 1000 : u === "mwh" ? v * 1000 : v;
}

// The price of a kWh, given as a number or as the entity that holds it: a
// fixed tariff needs no sensor, a Tempo one comes from its own (HACF).
function energyPriceOf(hass, p) {
  if (p === undefined || p === null || p === "") return null;
  const str = String(p).trim();
  if (/^[a-z_]+\.[a-z0-9_]+$/i.test(str)) return numericState(hass, str);
  const n = Number(str.replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

// An amount in the currency set in Home Assistant, written the profile's way.
function formatMoney(hass, v) {
  const cur = (hass && hass.config && hass.config.currency) || "EUR";
  try {
    return new Intl.NumberFormat(lang(hass), { style: "currency", currency: cur }).format(v);
  } catch (e) {
    return `${v.toFixed(2)} ${cur}`;
  }
}

// A number held in an attribute, the way a climate entity keeps its
// temperatures. An empty attribute is no reading at all, not zero.
function numberOrNull(v) {
  if (v === undefined || v === null || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function remainingSeconds(hass, entityId, unitCfg, hoursMinutes) {
  const st = stateObj(hass, entityId);
  if (!st) return null;

  // Handle device_class: timestamp (ISO 8601 datetime) entities, as reported
  // by integrations like Samsung SmartThings and LG SmartThinQ for cycle end
  // time. These report an absolute completion time rather than a numeric
  // duration, so the remaining time must be derived from the difference to now.
  if (st.attributes.device_class === "timestamp") {
    const finish = new Date(st.state);
    if (isNaN(finish)) return null;
    const diff = (finish - Date.now()) / 1000;
    return diff > 0 ? diff : 0;
  }

  // A clock reading, "1:02:03", as an older Snapmaker reports it. Two parts
  // alone could be hours or minutes, so only the full form is read.
  const clock = /^(\d+):([0-5]\d):([0-5]\d)$/.exec(String(st.state).trim());
  if (clock) return Number(clock[1]) * 3600 + Number(clock[2]) * 60 + Number(clock[3]);
  // A delayed start is set in hours and minutes, and Home Connect shows it
  // so: "0:59" is 59 minutes away, not 59 seconds (#56).
  // Miele's own integration says "01:23" with no unit at all.
  const hm = (hoursMinutes || !st.attributes.unit_of_measurement) && /^(\d+):([0-5]\d)$/.exec(String(st.state).trim());
  if (hm) return Number(hm[1]) * 3600 + Number(hm[2]) * 60;
  const v = parseFloat(st.state);
  if (!Number.isFinite(v) || v < 0) return null;
  let unit = unitCfg || "auto";
  if (unit === "auto") {
    // Home Assistant lets a user show a duration in any unit, and Bambu Lab
    // defaults its remaining time to hours: the unit decides, not the brand.
    const u = (st.attributes.unit_of_measurement || "").toLowerCase();
    unit = u === "ms" ? "milliseconds"
      : u.startsWith("min") ? "minutes"
        : u === "h" || u.startsWith("hour") || u === "hr" ? "hours"
          : u === "d" || u.startsWith("day") ? "days"
            : "seconds";
  }
  const factor = { milliseconds: 0.001, minutes: 60, hours: 3600, days: 86400 }[unit] || 1;
  return v * factor;
}

function formatDuration(totalSeconds, hass) {
  const mins = Math.round(totalSeconds / 60);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h > 0) return `${h}h${String(m).padStart(2, "0")}`;
  return `${m} min`;
}

// A space inside one reading must never become a line break: "46 min" and
// "ready at 11:37" stay whole, so a narrow card can only wrap after the dot
// instead of leaving the time alone on the next line.
function keepTogether(s) {
  return String(s).replace(/[ \u202f]/g, "\u00a0");
}

// The time a feeder's screen shows: hours and minutes only, since the screen
// has no room for a 12-hour clock's AM or PM.
function feederClock(hass) {
  return clockTime(new Date(), hass).replace(/[^\d:]/g, "");
}

// A clock time the way the user's Home Assistant profile asks for it, not the
// way the browser would: the profile language, its 12 or 24 hour choice, and
// the server's time zone when the profile says so. The browser default showed
// 09:05 PM to someone whose profile asked for 21:05.
function timeLocale(hass) {
  const l = hass && ((hass.locale && hass.locale.language) || hass.language);
  return l ? [l] : [];
}

// Home Assistant's own rule: "12" and "24" are outright choices; "language"
// (the default) follows the profile language and "system" the browser.
function hourCycle(hass) {
  const f = hass && hass.locale && hass.locale.time_format;
  if (f === "12") return "h12";
  if (f === "24") return "h23";
  if (!hass || !hass.locale) return undefined;
  try {
    const probe = new Date(2023, 0, 1, 22, 0, 0).toLocaleString(f === "system" ? [] : timeLocale(hass));
    return probe.includes("10") ? "h12" : "h23";
  } catch (e) {
    return undefined;
  }
}

function timeOptions(hass, options) {
  const out = { ...options };
  const cycle = hourCycle(hass);
  if (cycle) out.hourCycle = cycle;
  const zone = hass && hass.locale && hass.locale.time_zone === "server" && hass.config && hass.config.time_zone;
  if (zone) out.timeZone = zone;
  return out;
}

// A time zone or language the browser does not know only costs that part of
// the choice: the 12 or 24 hour setting still holds.
function clockTime(date, hass) {
  const options = { hour: "2-digit", minute: "2-digit" };
  const full = timeOptions(hass, options);
  const { timeZone, ...noZone } = full;
  for (const [locale, opts] of [[timeLocale(hass), full], [timeLocale(hass), noZone], [[], noZone]]) {
    try { return date.toLocaleTimeString(locale, opts); } catch (e) { /* try the next */ }
  }
  return date.toLocaleTimeString([], options);
}

function formatEta(totalSeconds, hass) {
  return clockTime(new Date(Date.now() + totalSeconds * 1000), hass);
}

function unitOf(hass, entityId) {
  const st = stateObj(hass, entityId);
  return (st && st.attributes.unit_of_measurement) || "";
}

// A reading that lives on a climate entity (Pentair's pool water, a wine
// cabinet's zone): its state is a mode, its temperature an attribute.
function tempState(hass, entityId) {
  if (["climate", "water_heater"].includes(domainOf(entityId || ""))) {
    const st = stateObj(hass, entityId);
    return st ? numberOrNull((st.attributes || {}).current_temperature) : null;
  }
  return numericState(hass, entityId);
}

function temperatureUnit(hass, entityId) {
  return (
    unitOf(hass, entityId) ||
    (hass.config && hass.config.unit_system && hass.config.unit_system.temperature) ||
    "\u00b0C"
  );
}

// A difference of temperatures is written in kelvin, as the trade writes
// it: a gap of 5 degrees Celsius is 5 K. Fahrenheit has no such unit in
// common use, so its gaps stay in degrees Fahrenheit.
function deltaUnit(unit) {
  return unit === "\u00b0C" || unit === "\u2103" ? "K" : unit;
}

// Appliance front panels show a countdown, not "1h04".
function formatClock(totalSeconds) {
  const s = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(s / 60);
  if (minutes >= 60) return `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, "0")}`;
  return `${minutes}:${String(s % 60).padStart(2, "0")}`;
}

// Integrations often expose a phase/status as a bare code ("0".."18") or an
// untranslated token. value_map lets the user relabel those per info entity;
// keys are matched exactly first, then case-insensitively.
function mapInfoValue(state, valueMap) {
  if (!valueMap || typeof valueMap !== "object") return null;
  if (Object.prototype.hasOwnProperty.call(valueMap, state)) return valueMap[state];
  const lower = String(state).toLowerCase();
  for (const key of Object.keys(valueMap)) {
    if (String(key).toLowerCase() === lower) return valueMap[key];
  }
  return null;
}

// The editor edits value_map as plain text, one "code: label" per line, since
// integrations can expose ~20 phase codes and a row-per-entry UI would dwarf
// the rest of the editor. Split on the first ":" or "=" so a label may itself
// contain either character.
function parseValueMap(text) {
  const map = {};
  for (const rawLine of String(text || "").split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const match = line.match(/^([^:=]+)[:=](.*)$/);
    if (!match) continue;
    const key = match[1].trim();
    if (key) map[key] = match[2].trim();
  }
  return Object.keys(map).length ? map : undefined;
}

function stringifyValueMap(valueMap) {
  if (!valueMap || typeof valueMap !== "object") return "";
  return Object.keys(valueMap).map((key) => `${key}: ${valueMap[key]}`).join("\n");
}

// HomeWhiz names what a machine is busy with in its firmware's keys as well,
// one namespace per machine: WASHER_SUBSTATE_SPIN, DRYER_MESSAGE_COOLING,
// DISHWASHER_MESSAGE_RINSING. The namespace would be read as a step of its own,
// since every washer key says "washer" and every dryer key "dryer": the step is
// the word after it. The one washer key without it, WASHER_WATER_INTAKE, names
// its step whole.
const HOMEWHIZ_MESSAGE = /^(?:washer_substate|dryer_message|dishwasher_message)_(\w+)$/;

// A HomeWhiz message without its namespace, or null for any other value.
function homewhizMessage(text) {
  const m = HOMEWHIZ_MESSAGE.exec(text);
  return m ? m[1] : null;
}

// What HomeWhiz says once the cycle is over: the washer asks for the laundry
// back, the dryer and the dishwasher call the programme complete, and a
// sanitized one is complete as well. The card's own words for a finish read
// the rest.
const HOMEWHIZ_DONE = ["remove_laundry", "program_sanitized"];
function homewhizDone(raw) {
  const word = homewhizMessage(String(raw === undefined || raw === null ? "" : raw).trim());
  if (!word) return false;
  return HOMEWHIZ_DONE.includes(word)
    || STATE_KEYWORD_PATTERNS.done.some((re) => re.test(word.replace(/_/g, " ")));
}

// Dishwasher integrations do not share one phase vocabulary. Keep the
// visual model deliberately small and safe: an optional phase entity can add
// a known phase class, but a missing, unavailable, or new vendor value simply
// leaves the normal dishwasher animation in place.
const DISHWASHER_PHASE_ALIASES = {
  prewash: "prewash",
  "pre wash": "prewash",
  "pre rinse": "prewash",
  prerinsing: "prewash",
  prerinse: "prewash",
  "pre rinsing": "prewash",
  prelavage: "prewash",
  "pre lavage": "prewash",
  vorspulen: "prewash",
  vorwasche: "prewash",
  mainwash: "mainwash",
  "main wash": "mainwash",
  wash: "mainwash",
  washing: "mainwash",
  rinse: "rinsing",
  rinsing: "rinsing",
  finalrinse: "rinsing",
  "final rinse": "rinsing",
  "intermediate rinse": "rinsing",
  rincage: "rinsing",
  "rincage final": "rinsing",
  drying: "drying",
  dry: "drying",
  "ado drying": "ado_drying",
  adodrying: "ado_drying",
};
const DISHWASHER_PHASES = new Set(Object.values(DISHWASHER_PHASE_ALIASES));

function normalizeDishwasherPhase(raw, phaseMap) {
  if (raw === undefined || raw === null) return "";
  const text = String(raw).trim();
  if (["unknown", "unavailable", "none", ""].includes(text.toLowerCase())) return "";

  const mapped = mapInfoValue(text, phaseMap);
  const candidate = mapped === null || mapped === undefined ? homewhizMessage(text) || text : mapped;
  const key = stripAccents(String(candidate).trim()).toLowerCase().replace(/[\\_-]+/g, " ").replace(/\\s+/g, " ");
  const phase = DISHWASHER_PHASE_ALIASES[key] || key.replace(/ /g, "_");
  return DISHWASHER_PHASES.has(phase) ? phase : "";
}

// A washer-dryer runs one cycle that washes and then dries in the same drum,
// and the two steps look nothing alike: water, then hot air and no water at
// all. Which one is running comes from the state itself on the integrations
// that say it there, and from a phase entity on those that leave the state at
// "Running" and name the step elsewhere. Either way a state_map or a phase_map
// entry can name the step by hand, which is what an unknown vendor value needs.
const LAUNDRY_PHASES = ["drying", "washing"];
// Drying is tried first: a value naming both steps is a programme name, and
// the one it is actually doing is the one it dries with. The washing words
// carry the whole wash, rinse and spin, since all three put water in the drum.
const LAUNDRY_PHASE_PATTERNS = {
  drying: /\b(dry|tumble|sech|trockn|secad|secag|seca\b|asciug|droog|drogen|tork|torr|susz|susen)|t\u00f8rk|t\u00f8rr|\u0441\u0443\u0448|\u70d8\u5e72/i,
  washing: /\b(wash|rins|spin|soak|steam|lav|wasch|wass|spul|schleuder|essorag|centrifug|risciacqu|tvatt|skolj|vask|prani|plukan|wirowan|machan|odstred)|sk\u00f6lj|\u0441\u0442\u0438\u0440|\u043f\u043e\u043b\u043e\u0441\u043a|\u043e\u0442\u0436\u0438\u043c|\u6d17|\u8131\u6c34/i,
};

// The step a washer-dryer is at, from a raw value and the map that goes with
// it. The map wins, and it may name the step outright ("drying") as well as
// translate a vendor code into a word: both land on the same patterns, since
// a step names itself with the very words they look for.
function laundryPhaseOf(raw, valueMap) {
  if (raw === undefined || raw === null) return "";
  const text = String(raw).trim();
  if (["unknown", "unavailable", "none", ""].includes(text.toLowerCase())) return "";
  const mapped = mapInfoValue(text, valueMap);
  const candidate = String(mapped === null || mapped === undefined ? homewhizMessage(text) || text : mapped).trim();
  // Separators become spaces before anything is matched. Integrations answer in
  // snake case as often as in words, and an underscore is a word character:
  // without this, "ai_drying" and "pre_wash" match nothing at all.
  const flat = stripAccents(candidate).replace(/[._-]+/g, " ");
  for (const phase of LAUNDRY_PHASES) {
    if (LAUNDRY_PHASE_PATTERNS[phase].test(flat)) return phase;
  }
  return "";
}

// The words each step goes by, tried in this order: a narrower word before the
// wider one it contains, so a pre-wash is not read as a wash. They are the
// integrations' own, read in their code: Electrolux says Wash, Rinse, Drain,
// Spin and Anticrease, SmartThings ai_rinse, weight_sensing and
// wrinkle_prevent, LG soaking and detecting in the state itself, Miele
// main_wash and cooling_down, Whirlpool cycle_filling, HomeWhiz water_intake,
// analysing (the load, which its Spanish words say), softener (the last
// rinse, which takes it in) and anti_creasing. French, German,
// Spanish, Italian and Dutch cover a sensor written by hand, and the drying
// words are the washer-dryer's, so that the drum and the state line never
// disagree. Samsung's "air wash" is a refresh in hot air, with no water in
// it at all: no wash.
const CYCLE_STEP_PATTERNS = [
  ["prewash", /\bpre ?(dish ?)?wash|\bpre ?rins|\bprelav|\bvorwasch|\bvoorwas/],
  ["soaking", /\bsoak|\btremp|\beinweich|\bremoj|\bammoll|\bweken/],
  ["weighing", /\bweigh|\bweight|\bdetect|\bsensing|\banaly[sz]|\bpes(ee|ag|aje|atura)|\bwieg/],
  ["filling", /\bfill|\bintake|\bremplis|\bbefull|\bllenad|\bvullen/],
  ["anti_crease", /\banti ?creas|\bwrinkle|\bfroiss|\bknitter|\bantiarrug|\bantipieg|\bkreuk/],
  ["steam", /steam|\bvapeur|\bdampf|\bvapor|\bstoom/],
  ["cooling", /\bcool|\brefroid|\babkuhl|\benfri|\braffredd|\bafkoel/],
  ["draining", /\bdrain|\bvidang|\babpump|\bdesag|\bscaric|\bafpomp/],
  ["spinning", /\bspin|\bessor|\bschleuder|\bcentrifug/],
  ["rinsing", /rins|\bsoftener|\brinc|\bspul|\baclar|\benjuag|\brisciacq|\bspoel/],
  ["drying", LAUNDRY_PHASE_PATTERNS.drying],
  ["washing", /(?<!\bair )wash|\blavag|\blavad|\bwasch|\bwassen/],
];

// A value as the step patterns read it: no accents, no case, and the
// separators of snake case, dotted enums and camel case turned into spaces, so
// that "ai_rinse", "MainWash" and "WRINKLE_PREVENT" are words like any other.
function stepFlat(text) {
  return stripAccents(String(text))
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[._\-\/]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

// What an integration reports when it has no step to give: Electrolux answers
// Unavailable at rest, and Cycle Phase Hidden when it would rather not say.
const STEP_BLANK = /^(|unknown|unavailable|none|null|n a|not available|hidden|cycle phase hidden)$/;

// A state word is never a step, whatever else it says: "rinse_hold" is a pause
// and "delay_wash" a delayed start, and the state line says both already.
const NOT_A_STEP = Object.keys(STATE_KEYWORD_PATTERNS)
  .filter((norm) => norm !== "running")
  .flatMap((norm) => STATE_KEYWORD_PATTERNS[norm]);

// The step a word names, as a key of CYCLE_STEPS, or "" when it names none.
function stepOfWord(text) {
  const flat = stepFlat(text);
  if (NOT_A_STEP.some((re) => re.test(flat))) return "";
  const hit = CYCLE_STEP_PATTERNS.find(([, re]) => re.test(flat));
  return hit ? hit[0] : "";
}

// What a phase entity says: a step the card translates or, failing that, the
// integration's own word for it, since naming the step is all such an entity
// is for. A code nobody mapped says nothing, and neither does a word that is
// really a state, running or finished. A phase_map entry names a step by its
// key ("spinning") or gives the words to show. HomeWhiz's messages say more
// than steps (hello, child lock, door locked, remove the laundry): only one
// that names a step is shown.
function phaseStepOf(raw, phaseMap) {
  if (raw === undefined || raw === null) return null;
  const mapped = mapInfoValue(String(raw).trim(), phaseMap);
  const own = mapped === null || mapped === undefined;
  const message = own ? homewhizMessage(String(raw).trim()) : null;
  const text = String(own ? message || raw : mapped).trim();
  const step = stepOfWord(text);
  if (step) return { step };
  if (message) return null;
  const flat = stepFlat(text);
  if (STEP_BLANK.test(flat) || /^[\d\s]+$/.test(flat)) return null;
  if (Object.values(STATE_KEYWORD_PATTERNS).some((res) => res.some((re) => re.test(flat)))) return null;
  const words = own ? cleanStateLabel(text) : text;
  return { step: "", text: words.charAt(0).toUpperCase() + words.slice(1) };
}

// What the state says, for the machines that name their step there. An entry
// of state_map may name a step by its key; any other entry only settled the
// category, and the step is read from the state's own word.
function stateStepOf(raw, stateMap) {
  if (raw === undefined || raw === null) return "";
  const mapped = mapInfoValue(String(raw).trim(), stateMap);
  return CYCLE_STEPS.includes(mapped) ? mapped : stepOfWord(raw);
}

// Names that mean a machine that washes and then dries. Checked before the
// dryer test, since every one of them contains a drying word as well.
const WASHER_DRYER_RE = /washer.?dryer|washerdryer|washer.?drier|wash.?(and|n)?.?dry(er)?\b|wash.?combo|washcombo|lavante.?sechante|lave.?linge.?sechant|waschtrockner|lavasciuga|lavasecadora|lava.?e.?seca|was.?droog|wasdroogcombinatie|vaske.?torre|tvatt.?tork|pralko.?suszarka|pracka.?se.?susickou|\u0441\u0442\u0438\u0440\u0430\u043b\u044c\u043d\u043e.?\u0441\u0443\u0448\u0438\u043b/i;

// Whether this washer also dries. The option settles it, and a name that says
// so answers for the setups that never open the editor.
function isWasherDryer(cfg, st) {
  if (cfg.washer_dryer !== undefined && cfg.washer_dryer !== "") return !!cfg.washer_dryer;
  const hay = stripAccents(`${cfg.icon || ""} ${cfg.state_entity || ""} ${cfg.name || ""} ${stHay(st)}`);
  return WASHER_DRYER_RE.test(hay);
}

// A number as Home Assistant would print it, for a card pinned to another
// language: the frontend's formatter answers in Home Assistant's language, so
// it cannot be used there. The same two rules: the display precision set in the
// entity's settings, and whole numbers for a helper whose step is whole
// ("177.0" on an input_number). Anything else is left exactly as reported.
function localNumber(st, hass, entityId) {
  const n = Number(st.state);
  if (String(st.state).trim() === "" || !Number.isFinite(n)) return null;
  const ent = hass && hass.entities && hass.entities[st.entity_id || entityId];
  const p = ent ? Number(ent.display_precision) : NaN;
  const step = st.attributes.step;
  let options = null;
  if (ent && ent.display_precision !== undefined && ent.display_precision !== null && Number.isInteger(p) && p >= 0) {
    options = { minimumFractionDigits: p, maximumFractionDigits: p };
  } else if (step !== undefined && step !== null && step !== "" && Number.isInteger(Number(step)) && Number.isInteger(n)) {
    options = { maximumFractionDigits: 0 };
  }
  if (!options) return null;
  try {
    return new Intl.NumberFormat(lang(hass), options).format(n);
  } catch (e) {
    return null;
  }
}

// A temperature line reads like the entity does everywhere else in Home
// Assistant, decimals included. Only a reading with no unit of its own (an
// attribute, or a bare input_number) keeps the whole degree and a borrowed unit.
function tempText(hass, cfg, entityId, value, unit) {
  const d = tempDecimals(cfg);
  if (d !== null) return `${fixedTemp(hass, value, d)} ${unit}`;
  const st = numericEntity(hass, entityId);
  if (st && st.attributes.unit_of_measurement) return formatInfoValue(st, hass, null, cfg, entityId);
  return `${Math.round(value)} ${unit}`;
}

// temperature_decimals: every reading of the card, screens and lines, in whole
// degrees unless asked otherwise. "1" gives one decimal, "auto" hands each
// reading to its entity's own display precision.
function tempDecimals(cfg) {
  const d = String(cfg && cfg.temperature_decimals);
  if (d === "auto") return null;
  return d === "1" ? 1 : 0;
}
function fixedTemp(hass, value, d) {
  // Rounded first, so -0.3 at the whole degree reads 0 and not -0.
  const r = Math.round(value * 10 ** d) / 10 ** d;
  return new Intl.NumberFormat(lang(hass), { minimumFractionDigits: d, maximumFractionDigits: d }).format(r === 0 ? 0 : r);
}
function numericEntity(hass, entityId) {
  const st = entityId ? stateObj(hass, entityId) : null;
  return st && String(st.state).trim() !== "" && Number.isFinite(Number(st.state)) ? st : null;
}

// The small screen on an appliance shows the number Home Assistant shows,
// without the unit: 4,2 on a probe set to one decimal, 4 on one set to none.
// With a pinned language the formatter speaks the wrong one, so only an
// explicit precision is honoured there, and the whole degree otherwise.
function screenTemp(hass, cfg, entityId, value) {
  const d = tempDecimals(cfg);
  if (d !== null) return `${fixedTemp(hass, value, d)}\u00b0`;
  const st = numericEntity(hass, entityId);
  const unit = st ? st.attributes.unit_of_measurement : "";
  const pinned = cfg && cfg.language && cfg.language !== "auto";
  if (unit && !pinned && hass && typeof hass.formatEntityState === "function") {
    try {
      const label = String(hass.formatEntityState(st) || "");
      const text = label.endsWith(unit) ? label.slice(0, -unit.length).trim() : "";
      if (/\d/.test(text)) return `${text}\u00b0`;
    } catch (e) { /* fall through */ }
  }
  const local = st ? localNumber(st, hass, entityId) : null;
  return `${local !== null ? local : Math.round(value)}\u00b0`;
}

function formatInfoValue(st, hass, valueMap, cfg, entityId, hideUnit) {
  const mapped = mapInfoValue(st.state, valueMap);
  // A mapped label replaces the value outright: appending a unit to it
  // ("Rinsing rpm") would never read correctly.
  if (mapped !== null && mapped !== undefined) return String(mapped);
  const dc = st.attributes.device_class;
  if (dc === "timestamp" || dc === "date") {
    const d = new Date(st.state);
    if (!isNaN(d.getTime())) {
      const options = dc === "date" ? { dateStyle: "long" } : { dateStyle: "long", timeStyle: "short" };
      try {
        return new Intl.DateTimeFormat(lang(hass), dc === "date" ? options : timeOptions(hass, options)).format(d);
      } catch (e) {
        // Unsupported locale/options: fall through to the raw formatting below.
      }
    }
  }
  const unit = st.attributes.unit_of_measurement || "";
  // Home Assistant prints a state the way its entity asks: the display
  // precision chosen in the entity's settings, the locale's separators and a
  // translated on/off or enum. The raw state skipped all of that, and a probe
  // set to whole degrees showed 48.7999992370605 \u00b0C.
  const pinned = cfg && cfg.language && cfg.language !== "auto";
  if (!pinned && hass && typeof hass.formatEntityState === "function") {
    try {
      const label = hass.formatEntityState(st);
      if (label !== undefined && label !== null && String(label) !== "") {
        const text = String(label);
        // The unit is always the tail of what the frontend returns, with or
        // without a space depending on the locale.
        return hideUnit && unit && text.endsWith(unit) ? text.slice(0, -unit.length).trim() : text;
      }
    } catch (e) {
      /* fall through to the local formatting */
    }
  }
  const value = localNumber(st, hass, entityId) || st.state;
  return hideUnit || !unit ? `${value}` : `${value} ${unit}`;
}

// Home Connect, and the home_connect_alt custom integration, report the
// programme as a fully qualified enum: LaundryCare.Washer.Program.Auto40. Four
// segments at least, and only the last one names the programme. Requiring
// three dots rather than one keeps a decimal such as "1.5 kg", or a two-part
// name, from being mistaken for a namespace and cut down to its tail.
const DOTTED_ENUM = /^[A-Za-z][A-Za-z0-9]*(\.[A-Za-z0-9]+){3,}$/;

// An unrecognised state is echoed to the card rather than dropped, which is
// right: the card cannot know every vendor's wording. What it should not echo
// is the namespace around it. BSH.Common.EnumType.OperationState.Ready is one
// word of information and four of boilerplate, and programme names have had
// this cleanup since 2.0.4 while the state line never did.
// state_show_raw stays verbatim on purpose: it opts into the entity's own
// text, whatever shape that text has.
// The raw text as Home Assistant itself shows it. A climate or a switch has an
// internal key for a state (cool, heat_cool, on), which is English whatever the
// language; the frontend translates it, and the user reading "raw" expects the
// words of their own dashboard, not the key under them (#24). A template
// sensor's free text comes back unchanged. A language pinned on the card keeps
// the key, as the frontend's words would contradict it.
function rawStateText(hass, st, raw, cfg) {
  const text = String(raw);
  const pinned = cfg && cfg.language && cfg.language !== "auto";
  if (!pinned && st && hass && typeof hass.formatEntityState === "function") {
    try {
      const label = hass.formatEntityState(st, raw);
      if (label) return String(label);
    } catch (e) {
      /* fall back to the raw text */
    }
  }
  return text;
}

// A state the card cannot place: Home Assistant's own translation when the
// integration has one (Midea's order is "Scheduled"), its key made readable
// otherwise.
function translatedOrClean(hass, st, raw, cfg) {
  const text = rawStateText(hass, st, raw, cfg);
  return text !== String(raw) ? text : cleanStateLabel(raw);
}

function cleanStateLabel(raw) {
  if (raw === undefined || raw === null) return raw;
  let name = String(raw);
  if (DOTTED_ENUM.test(name)) name = name.slice(name.lastIndexOf(".") + 1);
  return name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanProgramName(raw) {
  if (!raw) return raw;
  // Many integrations report "<Category> Pr <ProgramName>": keep the meaningful part.
  const parts = String(raw).split(/\s+Pr\s+/i);
  let name = parts.length > 1 ? parts[1] : parts[0];
  if (DOTTED_ENUM.test(name)) name = name.slice(name.lastIndexOf(".") + 1);
  // Home Assistant's own home_connect integration slugifies the same enum,
  // so the programme arrives as dishcare_dishwasher_program_eco_50 and the
  // dotted pattern cannot see it. Everything up to "_program_" is the
  // namespace, exactly as before the last dot.
  const snake = /^[a-z0-9]+_[a-z0-9]+_program_(.+)$/.exec(name);
  const wasSnake = !!snake;
  if (snake) name = snake[1];
  const out = name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    // Vendors run the temperature and the duration into the name, where there
    // is no case boundary to split on: Auto40, Rapid20Min, Eco40-60.
    .replace(/([A-Za-z])(\d)/g, "$1 $2")
    .replace(/(\d)([A-Za-z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  // A slugified enum arrives entirely in lower case, which reads as a shout of
  // one beside the card's other lines. Only a value that actually came in that
  // shape is re-cased: a name carrying its own capitals keeps them, and a plain
  // reading like "1.5 kg" is not a programme name to capitalise.
  return wasSnake ? out.replace(/\b[a-z]/g, (c) => c.toUpperCase()) : out;
}

// Home Assistant ships the translated label for an enum option, and
// formatEntityState is how the frontend renders one. Prefer it over any string
// mangling of ours: it carries the integration's own wording and the user's
// language. It reads the Home Assistant locale though, so a language pinned on
// the card would be contradicted by it, and there our own cleanup wins.
function programLabel(hass, st, raw, cfg) {
  if (!raw) return raw;
  if (cfg && cfg.program_format === "raw") return raw;
  const pinned = cfg && cfg.language && cfg.language !== "auto";
  if (!pinned && st && hass && typeof hass.formatEntityState === "function") {
    try {
      const label = hass.formatEntityState(st, raw);
      if (label && label !== raw) return label;
    } catch (e) {
      /* fall through to the local cleanup */
    }
  }
  return cleanProgramName(raw);
}

function activeAlerts(hass, entityId) {
  const st = stateObj(hass, entityId);
  if (!st) return [];
  const active = [];
  for (const [key, val] of Object.entries(st.attributes)) {
    if (["icon", "friendly_name", "device_class", "unit_of_measurement", DEVICE_ATTR].includes(key)) continue;
    const v = String(val).toLowerCase();
    if (v === "on" || v === "true" || v === "1" || v === "active") active.push(key);
  }
  return active;
}

// Home Connect gives each alert an entity of its own (issue #19): the salt or
// the rinse aid running low, a detergent tank of the washer, a filter to
// clean. An alert stands while its entity says so, in the words the alerts
// attributes are read with, and in Home Connect's own: present, then confirmed
// once acknowledged on the appliance, which leaves the salt just as low. Both
// stand until the appliance says off.
const ALERT_ON_STATES = ["on", "true", "1", "active", "present", "confirmed"];
// Eight at most, like the info lines: the card and the editor stop there.
const ALERTS_MAX = 8;
// Every Home Connect event has these three states, alerts and news alike.
const EVENT_STATES = ["present", "confirmed", "off"];
// The events that report on a program, press a favourite or count down to a
// service ask nothing of anyone. Read on the integration's own key, which is
// the same in every language, or on the entity id when there is none.
const EVENT_NOT_ALERT_RE = /program_(aborted|finished)|alarm_clock|favorite|preheat|process_finished|_in_?\d+_?cups|keep_milk/;

// A list, or a single entity written without one.
function alertsArray(list) {
  if (Array.isArray(list)) return list;
  return list ? [list] : [];
}

function entityEntries(list, max) {
  return alertsArray(list)
    .map((e) => (typeof e === "string" ? { entity: e } : e || {}))
    .filter((e) => e.entity)
    .slice(0, max);
}

function alertEntitiesList(list) {
  return entityEntries(list, ALERTS_MAX);
}

// For the editor to find a device's alerts: its events, less the news.
function isEventAlert(hass, entityId) {
  const st = hass.states[entityId];
  const options = st && st.attributes && st.attributes.options;
  if (!Array.isArray(options) || !EVENT_STATES.every((s) => options.includes(s))) return false;
  const reg = hass.entities && hass.entities[entityId];
  return !EVENT_NOT_ALERT_RE.test((reg && reg.translation_key) || entityId);
}

// The binary sensors that report a problem rather than a state: a leak or a
// low battery is an alert, a door or a running flag is not.
const ALERT_DEVICE_CLASSES = ["problem", "safety", "battery", "moisture", "smoke", "gas", "carbon_monoxide", "heat", "cold", "tamper"];
function isAlertCandidate(hass, entityId) {
  if (isEventAlert(hass, entityId)) return true;
  const st = hass.states[entityId];
  return /^binary_sensor\./.test(entityId) && !!st && ALERT_DEVICE_CLASSES.includes(st.attributes.device_class);
}

// An alert as the card draws it: its own icon, or the red circle.
function alertIcon(hass, e) {
  const st = hass.states[e.entity];
  return e.icon || (st && st.attributes.icon) || "mdi:alert-circle";
}

// Two switches at most, one in each top corner: more would crowd the drawing
// they sit beside.
const CORNERS_MAX = 2;
// What a switch in the corners locks, if anything. A feeder has two: the child
// lock and the lock that closes the buttons by itself after a while. Read on
// the integration's own key first, the same in every language, then on the
// entity id, which names a lock's domain, and on its name. A clock is not a
// lock.
const CORNER_CHILD_RE = /child|kinder|enfant|infantil|crianca|bambin|barn|dziec|rodzic|detsk|\u0434\u0435\u0442|\u513f\u7ae5/;
const CORNER_LOCK_RE = /(^|[^c])lock|verrou|sperr|bloqu|blocc|slot|blokad|zamk|zamek|autolas|\u0431\u043b\u043e\u043a|\u0437\u0430\u043c\u043e\u043a|\u9501/;
const CORNER_AUTO_RE = /auto|\u0430\u0432\u0442\u043e|\u81ea\u52a8/;
function cornerKind(hass, entityId) {
  const reg = hass.entities && hass.entities[entityId];
  const st = hass.states[entityId];
  const hay = stripAccents([reg && reg.translation_key, entityId, st && st.attributes.friendly_name]
    .filter(Boolean).join(" ").toLowerCase());
  if (CORNER_CHILD_RE.test(hay)) return "child";
  const locks = CORNER_LOCK_RE.test(hay);
  if (locks && CORNER_AUTO_RE.test(hay)) return "auto";
  return locks ? "lock" : "";
}
// Each kind drawn locked and unlocked: what it is, and whether it holds.
const CORNER_ICONS = {
  child: ["mdi:account-lock", "mdi:account-lock-open-outline"],
  auto: ["mdi:timer-lock", "mdi:timer-lock-open-outline"],
  lock: ["mdi:lock", "mdi:lock-open-variant-outline"],
  "": ["mdi:toggle-switch", "mdi:toggle-switch-off-outline"],
};
// A switch holds while it is on, a lock while it is locked. An open lock is
// the opposite of a locked one.
function cornerOn(st) {
  return !!st && ["on", "locked"].includes(st.state);
}
// The icon says what the switch does and whether it holds, unless one was
// given. An entity's own icon is kept for a switch the card does not know.
function cornerIcon(hass, c) {
  if (c.icon) return c.icon;
  const st = hass.states[c.entity];
  const kind = cornerKind(hass, c.entity);
  if (!kind && st && st.attributes.icon) return st.attributes.icon;
  return CORNER_ICONS[kind][cornerOn(st) ? 0 : 1];
}

// What the corners offer: the appliance's own switches and locks. A helper
// belongs to no appliance, so it is reached through the picker instead.
function isCornerCandidate(hass, entityId) {
  return ["switch", "lock"].includes(domainOf(entityId)) && !!hass.states[entityId];
}

// The entity the appliance is found by: the first of the card's that belongs
// to a device, its state first. A feeder is often set up with no state at all.
function anchorEntity(hass, cfg) {
  const ids = [cfg.state_entity]
    .concat(Object.entries(cfg).filter(([k, v]) => k.endsWith("_entity") && typeof v === "string").map(([, v]) => v))
    .filter((id) => id && hass.states[id]);
  const reg = (id) => hass.entities && hass.entities[id];
  return ids.find((id) => reg(id) && reg(id).device_id) || ids[0] || null;
}

// Each menu's last entry, which opens a picker for any other entity.
const LIST_OTHER = "__other__";

// The two lists the editor fills from a menu: the alerts, and the switches in
// the corners. Each menu offers the appliance's own entities of its kind, and
// any other entity through its last entry.
const ENTITY_LISTS = [
  { panel: "alerts", field: "alerts_entities", max: ALERTS_MAX, title: "section_alert_list", add: "alerts_add",
    domains: ["binary_sensor", "sensor"], offers: isAlertCandidate, icon: alertIcon },
  { panel: "corners", field: "corner_entities", max: CORNERS_MAX, title: "section_corner_list", add: "corners_add",
    domains: ["switch", "input_boolean", "lock", "light", "fan"], offers: isCornerCandidate, icon: cornerIcon },
  // A filament box beside a 3D printer (#93): one entity per spool.
  { panel: "ams", field: "ams_entities", max: 4, title: "section_ams_list", add: "ams_add", types: ["printer_3d"],
    domains: ["sensor", "select", "input_text"], offers: (hass, id) => /tray|spool|bobine|ams/.test(id), icon: () => "mdi:printer-3d-nozzle-outline" },
  // A ventilation unit run by one entity per speed (#78), in order.
  { panel: "speeds", field: "speed_entities", max: 6, title: "section_speed_list", add: "speeds_add", types: ["hrv"],
    domains: ["input_boolean", "switch", "light"], offers: (hass, id) => ["input_boolean", "switch", "light"].includes(domainOf(id)), icon: () => "mdi:fan" },
  // A buffer tank (#81): its temperatures top to bottom, and the sources and
  // consumers drawn on its sides, lit while they run.
  { panel: "tank_temps", field: "temperature_entities", max: 5, title: "tank_temps_list", add: "tank_temps_add", types: ["storage_tank"],
    domains: ["sensor", "number", "input_number"], offers: (hass, id) => ["sensor", "number"].includes(domainOf(id)) && /temp/.test(String((stateObj(hass, id) || { attributes: {} }).attributes.device_class || id)), icon: () => "mdi:thermometer" },
  { panel: "tank_sources", field: "sources", max: 6, title: "tank_sources", add: "tank_sources_add", types: ["storage_tank"],
    domains: ["binary_sensor", "switch", "sensor", "input_boolean"], offers: () => false, icon: () => "mdi:fire" },
  // An extract unit in the basement (#87): the dampers of its zones, the
  // first on the riser and the second on the basement branch unless their
  // "at" places them elsewhere.
  { panel: "zone_valves", field: "zone_valves", max: 4, title: "zone_valves_list", add: "zone_valves_add", types: ["hrv"],
    when: (c) => hrvLayoutOf(c, null) === "single_basement",
    domains: ["valve", "cover", "switch", "input_boolean", "binary_sensor"], offers: (hass, id) => ["valve", "cover"].includes(domainOf(id)), icon: () => "mdi:valve" },
  { panel: "tank_consumers", field: "consumers", max: 6, title: "tank_consumers", add: "tank_consumers_add", types: ["storage_tank"],
    domains: ["binary_sensor", "switch", "sensor", "input_boolean"], offers: () => false, icon: () => "mdi:radiator" },
];

// What a menu offers: the appliance's own, less what the card already shows
// and what is already chosen.
function listCandidates(hass, cfg, list) {
  const anchor = hass && cfg ? anchorEntity(hass, cfg) : null;
  if (!anchor) return [];
  const used = new Set();
  for (const [k, v] of Object.entries(cfg)) if (k.endsWith("_entity") && typeof v === "string") used.add(v);
  for (const e of cfg.info_entities || []) used.add(typeof e === "string" ? e : e && e.entity);
  for (const e of entityEntries(cfg[list.field], list.max)) used.add(e.entity);
  return siblingEntityIds(hass, anchor).filter((id) => !used.has(id) && list.offers(hass, id));
}

// "2 alertes": the count in the plural its language wants. Russian, Polish
// and Czech do not agree 2 and 5 alike, so the form comes from the language's
// own rules.
function alertsCountLabel(hass, n) {
  const l = lang(hass);
  let form = "other";
  try {
    form = new Intl.PluralRules(l).select(n);
  } catch (e) {
    /* the plain plural then */
  }
  const tr = langDict(l) || T.en;
  return (tr[`alerts_n_${form}`] || tr.alerts_n_other || T.en.alerts_n_other).replace("{n}", n);
}

function raisedAlerts(hass, list) {
  return alertEntitiesList(list)
    .map((e) => ({ ...e, st: stateObj(hass, e.entity) }))
    .filter((e) => e.st && ALERT_ON_STATES.includes(String(e.st.state).trim().toLowerCase()));
}

function humanizeEntityId(entityId) {
  const objectId = (entityId || "").split(".")[1] || entityId || "";
  return objectId.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// A card with no name of its own takes its appliance's. Home Assistant names
// the state entity after the device and the reading ("Eaton3S550 Status
// code"), and the reading is not what the card is about. A name the user
// typed that does not start with the device's is left as it is.
function defaultCardName(hass, entityId, st) {
  const friendlyName = st && st.attributes.friendly_name;
  if (!friendlyName) return "";
  const reg = hass.entities && hass.entities[entityId];
  const device = reg && reg.device_id && hass.devices && hass.devices[reg.device_id];
  const deviceName = device && (device.name_by_user || device.name);
  if (deviceName && friendlyName.startsWith(`${deviceName} `)) return deviceName;
  return friendlyName;
}

// An entity's name without its appliance's, which integrations put in front:
// "Dishwasher Salt nearly empty" reads "Salt nearly empty" on the card.
function stripDeviceName(hass, friendlyName, entityId, cardName) {
  if (!friendlyName) return humanizeEntityId(entityId);
  const reg = hass.entities && hass.entities[entityId];
  const device = reg && reg.device_id && hass.devices && hass.devices[reg.device_id];
  const deviceName = (device && (device.name_by_user || device.name)) || cardName;
  if (deviceName && friendlyName.startsWith(`${deviceName} `)) {
    return friendlyName.slice(deviceName.length + 1);
  }
  return friendlyName;
}

// Domains that report rather than act. A click on one of these has nothing
// to call, so the card opens the entity instead of raising a service error.
const READ_ONLY_DOMAINS = ["binary_sensor", "sensor"];

// A select whose options are one command and nothing else, "" and "START" on
// an Aqara feeder: there is only one thing it can be asked, so asking for it
// needs no configuration at all.
function soleOption(hass, entityId) {
  const st = stateObj(hass, entityId);
  const options = (st && st.attributes && st.attributes.options) || [];
  const real = options.filter((o) => String(o).trim() !== "");
  return real.length === 1 ? real[0] : "";
}

function domainOf(entityId) {
  return entityId ? entityId.split(".")[0] : null;
}

function siblingEntityIds(hass, entityId) {
  const reg = hass.entities && hass.entities[entityId];
  if (reg && reg.device_id) {
    return Object.keys(hass.entities).filter((id) => hass.entities[id].device_id === reg.device_id);
  }
  const objectId = (entityId.split(".")[1] || "").replace(/(appliance_?state|status|state)$/i, "");
  const stem = objectId.replace(/_+$/, "");
  if (stem.length < 3) return Object.keys(hass.states);
  return Object.keys(hass.states).filter((id) => (id.split(".")[1] || "").includes(stem));
}

const AUTO_PATTERNS = {
  // Miele's program_phase and program_type, Home Connect's progress: not the
  // programme itself.
  program_entity: /^(?!.*(phase|finish|progress|type|time|remain|duration|a[ck]tiv|actif|attivo)).*program/i,
  active_program_entity: /a[ck]tiv\w*.?program|program\w*.?(a[ck]tiv|actif|attivo)/i,
  // What is left of the cycle, not of the filter or the detergent.
  remaining_time_entity: /^(?!.*(filter|water|clean|detergent|softener|salt|rinse.?aid|batter|range|capacity)).*(time.?to.?end|remain|time.?left|left.?time|finish.?(in|time)|completion.?time|end.?time)/i,
  progress_entity: /^(?!.*(update|firmware|filter)).*(progress|percent_?complete)/i,
  // A door lock (hOn, Electrolux) is not the door.
  door_entity: /^(?!.*(lock|alarm|assistant)).*door/i,
  alerts_entity: /alert/i,
  connectivity_entity: /connectiv/i,
  // A start delay is set, not pressed: HomeWhiz writes its own on a number.
  // Nor is a restart a start, or a relative start time (Home Connect).
  start_entity: /^(?!.*(delay|restart|start.?in|start.?time)).*start/i,
  pause_entity: /pause/i,
  resume_entity: /resume/i,
  // Resetting a filter or a counter stops nothing.
  stop_entity: /^(?!.*(filter|descal|counter|statistic|maintenance|hours|usage)).*(stop|reset)/i,
  power_entity: /_power$|power_w$|watt/i,
  energy_entity: /^(?!.*(cost|price|tarif|prix|batter)).*(energy|kwh)/i,
};

// The step of a cycle: Miele names it a program phase, Electrolux a cycle
// phase, SmartThings a job state, hOn a pr phase, HomeWhiz a sub state.
const PHASE_ENTITY_RE = /program.?phase|cycle.?phase|job.?state|pr.?phase|machine.?phase|sub.?state|(^|_)phase$/i;

