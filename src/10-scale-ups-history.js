// A bathroom scale: its state entity is the weight. Weighed, and when; the
// goal reached within half a unit; offline when there is no weight to show.
const SCALE_ONLY_FIELDS = ["weight_goal_entity", "weight_goal", "fat_ratio_entity", "fat_mass_entity", "muscle_mass_entity", "bone_mass_entity"];
const SCALE_NAME_RE = /withings|renpho|body.?(cardio|comp|scan)|(^|[^a-z])(scale|waage|bascula|bilancia|weegschaal|waga)([^a-z]|$)|pese.?personne|personenwaage|\u4f53\u91cd\u79e4|\u0432\u0435\u0441\u044b/;
const SCALE_COLORS = { weighed: "#1e88e5", goal: "#43a047", unav: "var(--disabled-text-color, #9e9e9e)" };
const SCALE_GOAL_MARGIN = 0.5;
// The screen stays lit for an hour after a weighing.
const SCALE_FRESH_MS = 3600000;

// A UPS, read the way NUT says it: ups.status holds one code or several,
// "OL CHRG", "OB DISCHRG LB", and the integration's text sensor says it in
// words. On mains, on battery, in bypass, or off; a low battery, one to
// replace and an overload are what it raises.
const UPS_ONLY_FIELDS = ["runtime_entity", "load_entity", "input_voltage_entity", "nominal_power", "battery_low"];
const UPS_NAME_RE = /(^|[^a-z])(ups|usv|onduleur|nobreak|\u0438\u0431\u043f)([^a-z]|$)|back.?ups|smart.?ups|\u4e0d\u95f4\u65ad\u7535\u6e90/;
const UPS_CODES = ["OL", "OB", "LB", "HB", "RB", "CHRG", "DISCHRG", "BYPASS", "CAL", "OFF", "OVER", "TRIM", "BOOST", "FSD"];
const UPS_LABELS = { online: "ups_online", battery: "ups_battery", bypass: "ups_bypass", off: "ac_off", unav: "ev_offline",
  low: "ups_low", replace: "ups_replace", overload: "ups_overload" };
const UPS_COLORS = { online: "#43a047", battery: "#fb8c00", bypass: "#fb8c00", replace: "#fb8c00", low: "#f44336", overload: "#f44336",
  off: "var(--disabled-text-color, #9e9e9e)", unav: "var(--disabled-text-color, #9e9e9e)" };
// Below 20 % on battery the card says so, whatever NUT's own LB says; below
// 100 V at the wall there is no mains.
const UPS_BATTERY_LOW = 20;
const UPS_MAINS_V = 100;

function upsStatusOf(hass, cfg, st) {
  const raw = st ? String(st.state).trim() : "";
  const text = stripAccents(raw.toLowerCase());
  const codes = new Set(raw.toUpperCase().split(/[\s,]+/).filter((c) => UPS_CODES.includes(c)));
  // NUT's Status sensor spells its flags out, apcupsd writes them in one word.
  if (/low.?batt|batt.?low/.test(text)) codes.add("LB");
  if (/replac|batt.?fault/.test(text)) codes.add("RB");
  // Eaton's shutdown_imminent and internal_failure, ups-snmp's hardware fault.
  if (!/^no.?(fault|failure)/.test(text) && /(^|[^a-z])(fault|failure)|imminent/.test(text)) codes.add("LB");
  if (/overload/.test(text)) codes.add("OVER");
  let mode;
  if (st && (["unavailable", "unknown", ""].includes(text) || /comm.?lost|no.?comm/.test(text))) mode = "unav";
  else if (codes.has("OFF")) mode = "off";
  else if (codes.has("OB") || codes.has("DISCHRG")) mode = "battery";
  else if (codes.has("BYPASS")) mode = "bypass";
  else if (codes.has("OL")) mode = "online";
  else if (st) {
    // aburow's output source, in words: battery, software_bypass, rebooting.
    if (/on.?batt|sur.?batt|batteriebetrieb|discharg|decharg|^battery|^batterie$/.test(text) && !/batt.?low|battery.?(low|fault)/.test(text)) mode = "battery";
    else if (/bypass/.test(text)) mode = "bypass";
    else if (/^(off|arret|shutdown|none)$|^offline|forced.?shutdown|shutting|rebooting|sleeping/.test(text)) mode = "off";
    else mode = "online";
  } else {
    // No status at all: the voltage at the wall says whether the mains is there.
    const v = cfg.input_voltage_entity ? numericState(hass, cfg.input_voltage_entity) : null;
    const b = cfg.battery_entity ? numericState(hass, cfg.battery_entity) : null;
    mode = v !== null ? (v < UPS_MAINS_V ? "battery" : "online") : b !== null ? "online" : "unav";
  }
  return { mode, codes, text };
}

// What a UPS's screen shows on battery: the time left, short.
function upsShortTime(secs) {
  const m = Math.round(secs / 60);
  return m >= 60 ? `${Math.floor(m / 60)}h${String(m % 60).padStart(2, "0")}` : `${m}m`;
}

// The history under the lines: one reading over the last hours, read only
// once unfolded and kept five minutes. Left to itself, a card plots what says
// the most about its type, then its meter, then its own state when that is a
// number. Off by default.
const HISTORY_HOURS = 24;
const HISTORY_REFRESH_MS = 5 * 60 * 1000;
// Ten-minute steps over a day: a gap of unavailability stays visible.
const HISTORY_BUCKETS = 144;
const HISTORY_SOURCES = {
  fridge: ["fridge_temperature_entity"],
  network: ["download_entity", "cpu_entity"],
  pool_pump: ["water_temperature_entity"],
  ups: ["load_entity", "battery_entity"],
  scale: ["state_entity"],
  home_battery: ["battery_entity"],
  camera: ["battery_entity", "signal_entity"],
  hrv: ["outdoor_temperature_entity", "supply_temperature_entity"],
};

function historyEntityOf(hass, cfg, type) {
  if (cfg.history_entity) return cfg.history_entity;
  // A washer, a dryer or a dishwasher with an energy meter alone still has
  // its days to show as bars (#79).
  const field = (HISTORY_SOURCES[type] || []).concat(["power_entity", "temperature_entity", "state_entity"], HISTORY_BAR_TYPES.includes(type) ? ["energy_entity"] : [])
    .find((f) => cfg[f] && numericState(hass, cfg[f]) !== null);
  return field ? cfg[field] : null;
}

function historyHoursOf(cfg) {
  const n = parseFloat(cfg.history_hours);
  return isFinite(n) && n > 0 ? Math.min(168, Math.max(1, Math.round(n))) : HISTORY_HOURS;
}

// The longest period offered: a year.
const HISTORY_MAX_HOURS = 8760;
// Past two days, the card reads Home Assistant's statistics rather than the
// raw history: they are kept for good and weigh far less.
const HISTORY_RAW_HOURS = 48;

// The periods offered above the curve, in hours: history_periods when set
// ("24h, 7d, 30d" or a list of hours), else the hours chosen, a week and a
// month (HACF #138).
function historyPeriodsOf(cfg) {
  const parse = (v) => {
    if (typeof v === "number") return v;
    const m = /^\s*(\d+(?:[.,]\d+)?)\s*([a-z]*)\.?\s*$/i.exec(String(v));
    if (!m) return NaN;
    const n = parseFloat(m[1].replace(",", "."));
    if (/^(d|j|t|g|days?|jours?|tage?|dias?|giorni)$/i.test(m[2])) return n * 24;
    if (/^(w|wk|weeks?|sem|semaines?|wochen?)$/i.test(m[2])) return n * 168;
    if (/^(m|mo|months?|mois)$/i.test(m[2])) return n * 720;
    return n;
  };
  const raw = Array.isArray(cfg.history_periods) ? cfg.history_periods
    : typeof cfg.history_periods === "string" && cfg.history_periods.trim() ? cfg.history_periods.split(/[,;]+|\s+(?=\d)/)
      : [historyHoursOf(cfg), 168, 720];
  const out = [...new Set(raw.map(parse).filter((n) => isFinite(n) && n > 0).map((n) => Math.min(HISTORY_MAX_HOURS, Math.max(1, Math.round(n)))))];
  return out.length ? out : [historyHoursOf(cfg)];
}

// A period as the button and the chips say it: in days from two days up.
const historyInDays = (hours) => hours >= HISTORY_RAW_HOURS && hours % 24 === 0;
function historyLabel(hass, hours) {
  return historyInDays(hours) ? t(hass, "history_last_days").replace("{d}", String(hours / 24)) : t(hass, "history_last").replace("{h}", String(hours));
}
function historyChip(hass, hours) {
  return historyInDays(hours) ? t(hass, "history_chip_d").replace("{d}", String(hours / 24)) : t(hass, "history_chip_h").replace("{h}", String(hours));
}

// A statistic row's start, in milliseconds: a number in recent versions of
// Home Assistant, a date before.
const statStart = (r) => (typeof r.start === "number" ? r.start : Date.parse(r.start));

// The curve read from statistics: one step per hour or per day, its mean (the
// state for a sensor that keeps no mean), the minimum and maximum their own.
function historyStatValues(rows, from, to, stepMs) {
  const n = Math.max(1, Math.ceil((to - from) / stepMs));
  const values = new Array(n).fill(null);
  let lo = Infinity;
  let hi = -Infinity;
  let any = false;
  (Array.isArray(rows) ? rows : []).forEach((r) => {
    const i = Math.floor((statStart(r) - from) / stepMs);
    const v = Number.isFinite(r.mean) ? r.mean : Number.isFinite(r.state) ? r.state : null;
    if (i < 0 || i >= n || v === null) return;
    values[i] = v;
    any = true;
    lo = Math.min(lo, Number.isFinite(r.min) ? r.min : v);
    hi = Math.max(hi, Number.isFinite(r.max) ? r.max : v);
  });
  return any ? { values, min: lo, max: hi } : null;
}

// The starts of the days of a period, at local midnight, oldest first.
function historyDays(days, now) {
  const d = new Date(now);
  return Array.from({ length: days }, (_, k) => new Date(d.getFullYear(), d.getMonth(), d.getDate() - (days - 1 - k)).getTime());
}
const dayIndex = (starts, t) => { let i = -1; for (let k = 0; k < starts.length && starts[k] <= t; k++) i = k; return i; };
// The types whose long periods are drawn as a bar per day.
const HISTORY_BAR_TYPES = ["washer", "dryer", "dishwasher"];
// A reading in kilowatt-hours, from what its unit says.
const toKwh = (v, unit) => (/^mwh$/i.test(unit) ? v * 1000 : /^wh$/i.test(unit) ? v / 1000 : v);

// What a washer, a dryer or a dishwasher did each day: the energy it used,
// from its energy meter's daily change or its power's hourly means, and the
// cycles it started, from its state's history or from the hours its plug
// went past the threshold.
function historyDayBars(starts, now, src) {
  const days = starts.map((s) => ({ start: s, kwh: null, cycles: null }));
  if (src.energyRows) {
    src.energyRows.forEach((r) => {
      const i = dayIndex(starts, statStart(r));
      if (i >= 0 && Number.isFinite(r.change)) days[i].kwh = (days[i].kwh || 0) + toKwh(r.change, src.energyUnit);
    });
  } else if (src.powerRows) {
    src.powerRows.forEach((r) => {
      const i = dayIndex(starts, statStart(r));
      if (i >= 0 && Number.isFinite(r.mean)) days[i].kwh = (days[i].kwh || 0) + (/^kw$/i.test(src.powerUnit) ? r.mean : r.mean / 1000);
    });
  }
  if (src.runs) {
    const from = src.covered;
    days.forEach((d) => { if (d.start + 86400000 > from) d.cycles = 0; });
    src.runs.forEach((r) => {
      if (r.cut) return;
      const i = dayIndex(starts, r.start);
      if (i >= 0 && days[i].cycles !== null) days[i].cycles += 1;
    });
  } else if (src.powerRows && Number.isFinite(src.threshold)) {
    let was = false;
    src.powerRows.slice().sort((a, b) => statStart(a) - statStart(b)).forEach((r) => {
      const i = dayIndex(starts, statStart(r));
      const on = Number.isFinite(r.max) && r.max >= src.threshold;
      if (i >= 0) {
        if (days[i].cycles === null) days[i].cycles = 0;
        if (on && !was) days[i].cycles += 1;
      }
      was = on;
    });
  }
  const kwh = days.some((d) => d.kwh !== null);
  const cycles = days.some((d) => d.cycles !== null);
  return kwh || cycles ? { days, kwh, cycles } : null;
}

// The bars, one per day, the cycles over them; their height is the energy,
// or the cycles when there is no energy to read.
function historyBarsHtml(hass, bars) {
  const val = (d) => (bars.kwh ? d.kwh : d.cycles);
  const top = Math.max(0, ...bars.days.map((d) => val(d) || 0));
  const kwhText = (v) => keepTogether(`${netNumber(hass, v, v < 10 ? 1 : 0)} kWh`);
  const cols = bars.days.map((d) => {
    const v = val(d);
    const pct = top > 0 && v ? Math.max(2, Math.round((v / top) * 100)) : 0;
    const when = new Date(d.start).toLocaleDateString(lang(hass), { weekday: "short", day: "numeric", month: "short" });
    const parts = [bars.kwh && d.kwh !== null ? kwhText(d.kwh) : "", d.cycles !== null ? t(hass, d.cycles === 1 ? "starts_one" : "starts_other").replace("{n}", String(d.cycles)) : ""].filter(Boolean);
    return `<div class="h-col" title="${esc([when, ...parts].join(" \u00b7 "))}"><span class="h-n">${bars.kwh && d.cycles ? d.cycles : ""}</span><div class="h-bar" style="height:${pct}%"></div></div>`;
  }).join("");
  const total = bars.days.reduce((s, d) => s + (d.kwh || 0), 0);
  const count = bars.days.reduce((s, d) => s + (d.cycles || 0), 0);
  const sum = [bars.kwh ? kwhText(total) : "", bars.cycles ? t(hass, count === 1 ? "starts_one" : "starts_other").replace("{n}", String(count)) : ""].filter(Boolean).join(" \u00b7 ");
  const maxText = bars.kwh ? kwhText(top) : String(top);
  // The days under a week or two, by the first letters of their names.
  const days = bars.days.length <= 14 ? `<div class="h-days">${bars.days.map((d) => `<span>${esc(new Date(d.start).toLocaleDateString(lang(hass), { weekday: "narrow" }))}</span>`).join("")}</div>` : "";
  return `<span class="h-max">${esc(maxText)}</span><div class="h-bars">${cols}</div><span class="h-min">0</span></div>${days}<div class="h-sum">${esc(`${t(hass, "history_total")} ${sum}`)}</div>`;
}

// Each step's mean, weighted by how long each reading lasted, from Home
// Assistant's short history format: a one-minute peak cannot vanish between
// two samples, and the minimum and maximum are the readings' own. A step that
// is mostly unavailable is a gap.
function historyValues(rows, from, to) {
  const pts = (rows || [])
    .map((r) => ({ t: r.lu !== undefined ? r.lu * 1000 : Date.parse(r.last_updated || r.last_changed), v: parseFloat(r.s !== undefined ? r.s : r.state) }))
    .filter((p) => Number.isFinite(p.t))
    .sort((a, b) => a.t - b.t);
  const step = (to - from) / HISTORY_BUCKETS;
  const values = [];
  let i = 0;
  let cur = NaN;
  let lo = Infinity;
  let hi = -Infinity;
  const seen = (v) => { if (Number.isFinite(v)) { lo = Math.min(lo, v); hi = Math.max(hi, v); } };
  while (i < pts.length && pts[i].t <= from) { cur = pts[i].v; i++; }
  seen(cur);
  for (let b = 0; b < HISTORY_BUCKETS; b++) {
    const end = from + step * (b + 1);
    let t0 = from + step * b;
    let sum = 0;
    let dur = 0;
    while (i < pts.length && pts[i].t <= end) {
      if (Number.isFinite(cur)) { sum += cur * (pts[i].t - t0); dur += pts[i].t - t0; }
      t0 = pts[i].t;
      cur = pts[i].v;
      seen(cur);
      i++;
    }
    if (Number.isFinite(cur)) { sum += cur * (end - t0); dur += end - t0; }
    values.push(dur >= step / 2 ? sum / dur : null);
  }
  return { values, min: lo, max: hi };
}

// A line and a faint area per run of readings, in a 100 x 32 box stretched to
// the card's width.
function historyChart(h) {
  const values = h.values;
  if (!Array.isArray(values)) return null;
  const nums = values.filter((v) => v !== null);
  if (!nums.length || !Number.isFinite(h.min)) return null;
  const lo = h.min;
  const hi = h.max;
  const span = hi - lo > 1e-9 ? hi - lo : 1;
  const base = hi - lo > 1e-9 ? lo : lo - 0.5;
  const n = values.length - 1;
  const runs = [];
  let run = [];
  values.forEach((v, i) => {
    if (v === null) { if (run.length) runs.push(run); run = []; return; }
    run.push([Math.round((i / n) * 10000) / 100, Math.round((28 - ((v - base) / span) * 24) * 100) / 100]);
  });
  if (run.length) runs.push(run);
  const pts = (r) => r.map(([x, y]) => `${x},${y}`).join(" ");
  const areas = runs.filter((r) => r.length > 1).map((r) => `<polygon class="h-area" points="${r[0][0]},32 ${pts(r)} ${r[r.length - 1][0]},32"/>`).join("");
  const lines = runs.map((r) => `<polyline class="h-line" points="${pts(r)}"/>`).join("");
  return { svg: `<svg viewBox="0 0 100 32" preserveAspectRatio="none">${areas}${lines}</svg>`, min: lo, max: hi, runs: runs.length };
}

const IRON_COLORS = { off: "var(--disabled-text-color, #9e9e9e)", heating: "#ff7043", ready: "#ffa726" };
const HD_COLORS = { off: "var(--disabled-text-color, #9e9e9e)", cool: "#29b6f6", hot: "#ff7043", on: "#ff7043" };

// How long a toaster says its toast is ready once it has popped up.
const TOASTER_READY_MS = 5 * 60 * 1000;
const TOASTER_LABELS = { off: "ac_off", idle: "standby", toasting: "toaster_toasting", done: "toaster_done" };
const TOASTER_COLORS = { off: "var(--disabled-text-color, #9e9e9e)", idle: "var(--disabled-text-color, #9e9e9e)", toasting: "#ff7043", done: "var(--success-color, #4caf50)" };
// Same beat for a cycle counting down to a finish time.
const COUNTDOWN_TICK_MS = 30 * 1000;

// Mixing speed, on the 0-3 scale the blade animation runs at. Thermomix goes
// to 10 and calls the top one "Turbo"; the exact figure stays on the info line,
// this is only how fast the drawing turns.
function mixerSpeed(hass, cfg) {
  if (!cfg.speed_entity) return { level: 0, label: "" };
  const st = stateObj(hass, cfg.speed_entity);
  if (!st || ["unknown", "unavailable"].includes(String(st.state).toLowerCase())) {
    return { level: 0, label: "" };
  }
  const raw = String(st.state);
  const v = parseFloat(raw);
  if (!isFinite(v)) {
    // A word rather than a number: only "off" means stopped, anything else
    // ("turbo", "knead") is the fastest thing the appliance does.
    const off = /^(off|arret|arr\u00eat|aus|apagado|spento|uit|0)$/i.test(stripAccents(raw));
    return { level: off ? 0 : 3, label: raw };
  }
  return { level: v <= 0 ? 0 : v <= 3 ? 1 : v <= 6 ? 2 : 3, label: raw };
}

// How many cups are coming. Three shapes reach this from real integrations:
// a count (Smarter's filter machines go 1 to 12), a boolean (Home Connect's
// ConsumerProducts.CoffeeMaker.Option.MultipleBeverages), and a beverage name
// where the plural is in the word (Jura's product select: "2 Espressi").
// The drawing only ever shows one cup or two, but the line keeps the real value.
function cupCount(hass, entityId) {
  if (!entityId) return { cups: 1, label: "" };
  const st = stateObj(hass, entityId);
  if (!st || ["unknown", "unavailable"].includes(String(st.state).toLowerCase())) {
    return { cups: 1, label: "" };
  }
  const raw = String(st.state);
  const n = parseFloat(raw);
  if (isFinite(n)) return { cups: n >= 2 ? 2 : 1, label: String(Math.round(n)) };
  if (/^(on|true)$/i.test(raw)) return { cups: 2, label: "2" };
  if (/^(off|false)$/i.test(raw)) return { cups: 1, label: "1" };
  // A beverage name: only a leading count tells us anything reliable.
  const lead = /^\s*(\d+)/.exec(raw);
  return { cups: lead && parseInt(lead[1], 10) >= 2 ? 2 : 1, label: raw };
}

// Coffee strength, as the number of beans the drawing shows. Home Connect uses
// a five-step BeanAmount enum, Jura a coffee_strength select; both come through
// as either a number or a word, so both are mapped onto 1-3.
function strengthLevel(hass, entityId) {
  if (!entityId) return { level: 3, label: "" };
  const st = stateObj(hass, entityId);
  if (!st || ["unknown", "unavailable"].includes(String(st.state).toLowerCase())) {
    return { level: 3, label: "" };
  }
  const raw = String(st.state);
  const n = parseFloat(raw);
  if (isFinite(n)) return { level: n <= 1 ? 1 : n <= 3 ? 2 : 3, label: raw };
  const word = stripAccents(raw).toLowerCase();
  if (/verymild|mild|weak|leger|schwach|suave|debole|1$/.test(word.replace(/[^a-z0-9]/g, ""))) return { level: 1, label: raw };
  if (/verystrong|strong|fort|stark|fuerte|forte|extra|3$/.test(word.replace(/[^a-z0-9]/g, ""))) return { level: 3, label: raw };
  return { level: 2, label: raw };
}

// The one thing worth reading on a fridge, in order of what it costs to miss.
// Where the half hour starts. The card is rebuilt every time a dashboard opens,
// which a phone app does at each launch, so counting from the moment this card
// first saw 0 W restarted the count at every visit and never reached it. Home
// Assistant knows when the reading last changed, and a value below the
// threshold has held at least since then: the real start can only be earlier,
// so the alarm can come late, never early.
function changedSinceOf(st) {
  const at = st ? Date.parse(st.last_changed) : NaN;
  return Number.isFinite(at) && at <= Date.now() ? at : Date.now();
}

// When the last meal was served, from whichever source can prove one happened.
// A script knows when it last ran, whatever asked it to: the card, an
// automation, or a HomeKit button, which is how most feeders are really used.
// A button's state is that same time. The counter moves on every meal the
// appliance reports, including the ones it serves on its own schedule, and at
// zero it has only just been reset at midnight. A select or a number cannot
// prove anything on its own, so it is only ever used to refine a time one of
// the others already established.
function feederLastFeed(hass, cfg, portions) {
  const times = [];
  const at = (v) => {
    const d = Date.parse(v);
    if (Number.isFinite(d)) times.push(d);
  };
  const explicit = cfg.last_feed_entity ? stateObj(hass, cfg.last_feed_entity) : null;
  if (explicit && !["unknown", "unavailable"].includes(explicit.state)) at(explicit.state);
  const start = cfg.start_entity ? stateObj(hass, cfg.start_entity) : null;
  const startDomain = domainOf(cfg.start_entity);
  if (start && start.attributes && start.attributes.last_triggered) at(start.attributes.last_triggered);
  else if (start && startDomain === "button") at(start.state);
  const counter = cfg.portions_today_entity ? stateObj(hass, cfg.portions_today_entity) : null;
  if (counter && portions > 0) at(counter.last_changed);
  if (!times.length) return null;
  if (start && ["select", "input_select", "number", "input_number"].includes(startDomain)) at(start.last_changed);
  return Math.max(...times);
}

// The time as a card line shows it: the clock alone for a meal served today,
// the date as well for an older one, since "19:02" on its own would read as
// this evening.
function feedTime(hass, ts) {
  const d = new Date(ts);
  const now = new Date(Date.now());
  const sameDay = d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
  const opts = sameDay
    ? { hour: "2-digit", minute: "2-digit" }
    : { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" };
  return d.toLocaleString(lang(hass), opts);
}

// With nothing wrong, a power meter can still say what the fridge is doing:
// above the threshold the compressor runs, below it the fridge rests. Without
// a meter there is nothing to tell, and "Normal" is all the card can say.
function fridgeHealth(unplugged, noPower, doorOpen, tempHigh, cooling = null) {
  if (unplugged) return "unplugged";
  if (noPower) return "no_power";
  if (doorOpen) return "door_open";
  if (tempHigh) return "temp_high";
  if (cooling === true) return "fridge_cooling";
  if (cooling === false) return "fridge_standby";
  return "fridge_ok";
}

// Derive a cycle state from a power meter. This is what makes the card usable
// with nothing but a smart plug: 3 W is standby, 1800 W is running, and the
// drop back below the threshold is the only "finished" signal such a setup can
// ever give. "done" is deliberately sticky until the next run, the same
// way a real appliance integration keeps reporting "finished" until restarted.
function powerDerivedState(watts, threshold, wasRunning) {
  if (watts === null || !isFinite(threshold)) return null;
  if (watts >= threshold) return "running";
  return wasRunning ? "done" : "idle";
}

// Cooking zone level: numeric levels (0-9) and word levels ("boost", "P") both
// happen depending on the integration.
function zoneState(hass, zone) {
  const out = { on: false, label: "", intensity: 0, residual: false, max: false };
  if (!zone) return out;
  const st = zone.level_entity ? stateObj(hass, zone.level_entity) : null;
  if (st) {
    const raw = String(st.state).trim();
    const low = raw.toLowerCase();
    if (!["unknown", "unavailable", "none", "", "off", "false"].includes(low)) {
      // Miele's power steps: plate_step_0 is off, the others go up to 18.
      const step = /^plate_step_(\d+)$/.exec(low);
      const num = step ? Number(step[1]) : parseFloat(raw);
      const top = step ? 18 : 9;
      if (!isNaN(num)) {
        if (num > 0) {
          out.on = true;
          out.label = String(Math.round(num));
          out.intensity = Math.max(0, Math.min(1, num / top));
          out.max = num >= top;
        }
      } else if (low === "plate_step_warming") {
        out.on = true;
        out.intensity = 0.25;
        out.label = "W";
      } else {
        const isMax = /boost|power|turbo|max/.test(low) || low === "p";
        out.on = true;
        out.intensity = isMax ? 1 : 0.6;
        out.max = isMax;
        out.label = isMax ? "P" : raw.slice(0, 1).toUpperCase();
      }
    }
  }
  if (!out.on && zone.residual_heat_entity) {
    const rst = stateObj(hass, zone.residual_heat_entity);
    if (rst && ["on", "true", "hot"].includes(String(rst.state).toLowerCase())) {
      out.residual = true;
      out.label = "H";
    }
  }
  return out;
}

// Hood fan: a `fan` entity gives a percentage and/or a preset; anything else
// degrades to plain on/off, which is all a smart plug can tell us.
// A speed picker that is not a `fan` entity: Home Connect exposes a hood's
// venting level as a select of opaque options
// ("Cooking.Common.EnumType.Hood.VentingLevel.FanStage02"), so map the option
// to a 1-3 scale using the option list when there is one, and the trailing
// digit otherwise.
function levelFromChoice(st) {
  const raw = String(st.state);
  const low = raw.toLowerCase();
  if (["off", "unknown", "unavailable", "none", "", "0", "false"].includes(low) || /fanoff|\.off$|_off$/.test(low)) {
    return { level: 0, boost: false, label: null };
  }
  const boost = /intensiv|boost|turbo/.test(low);
  const options = Array.isArray(st.attributes.options) ? st.attributes.options : null;
  if (options && options.length) {
    const usable = options.filter((o) => !/fanoff|\.off$|_off$|^off$/i.test(String(o)));
    const idx = usable.indexOf(raw);
    if (idx >= 0 && usable.length > 1) {
      return { level: Math.max(1, Math.min(3, Math.round(((idx + 1) / usable.length) * 3))), boost, label: String(idx + 1) };
    }
  }
  const digits = low.match(/(\d+)\s*$/);
  if (digits) {
    const n = parseInt(digits[1], 10);
    return { level: Math.max(1, Math.min(3, n)), boost, label: String(n) };
  }
  return { level: boost ? 3 : 2, boost, label: null };
}

// A fan on a plug says how fast it runs only through what it draws: under a
// third of its top power it is on its first speed, under two thirds on its
// second, above that on its third. Fans differ, so the owner gives the top
// power, and may set the two steps by hand when the thirds do not fit.
function powerSpeedLevel(hass, cfg) {
  if (!cfg.power_entity) return 0;
  const max = parseFloat(cfg.speed_power_max);
  let t2 = cfg.speed_power_custom ? parseFloat(cfg.speed_power_2) : NaN;
  let t3 = cfg.speed_power_custom ? parseFloat(cfg.speed_power_3) : NaN;
  if (!(t2 > 0)) t2 = max > 0 ? max / 3 : NaN;
  if (!(t3 > 0)) t3 = max > 0 ? (max * 2) / 3 : NaN;
  if (!(t2 > 0) || !(t3 > 0)) return 0;
  const w = wattsOf(hass, cfg.power_entity);
  if (w === null || !(w > 0)) return 0;
  return w >= t3 ? 3 : w >= t2 ? 2 : 1;
}

function hoodFanState(hass, cfg, norm) {
  const out = { level: 0, boost: false, percentage: null, preset: null, label: null };
  const fst = cfg.fan_entity ? stateObj(hass, cfg.fan_entity) : null;
  if (fst) {
    const domain = domainOf(cfg.fan_entity);
    if (domain === "fan") {
      if (String(fst.state).toLowerCase() === "on") {
        const pct = fst.attributes.percentage;
        out.percentage = typeof pct === "number" ? pct : null;
        out.preset = fst.attributes.preset_mode || null;
        out.level = out.percentage === null ? 2 : Math.max(1, Math.min(3, Math.ceil(out.percentage / 33.34)));
      }
    } else if (norm === "idle") {
      // A select keeps its last venting level after the hood is switched off,
      // so the appliance's own state has the last word here.
      out.level = 0;
    } else {
      const parsed = levelFromChoice(fst);
      out.level = parsed.level;
      out.boost = parsed.boost;
      out.label = parsed.label;
      if (unitOf(hass, cfg.fan_entity) === "%") {
        const pct = parseFloat(fst.state);
        if (!isNaN(pct)) {
          out.percentage = pct;
          out.level = pct <= 0 ? 0 : Math.max(1, Math.min(3, Math.ceil(pct / 33.34)));
          out.label = null;
        }
      }
    }
  } else if (isActiveState(norm)) {
    // No fan entity: we know it runs, not how fast. Mid speed reads as "on"
    // without pretending to know a level we don't have, unless the plug's
    // power says it.
    out.powerLevel = powerSpeedLevel(hass, cfg);
    out.level = out.powerLevel || 2;
  }
  if (out.preset && /boost|turbo|intensiv|intensif|max/i.test(out.preset)) out.boost = true;
  if (cfg.boost_entity) {
    const bst = stateObj(hass, cfg.boost_entity);
    if (bst && ["on", "true"].includes(String(bst.state).toLowerCase())) out.boost = true;
  }
  if (out.boost) out.level = 3;
  return out;
}

// 1-2 zones sit in a row, 3 and 5-6 in three columns, 4 in a square.
function zoneColumns(count, layout) {
  if (layout === "2x1") return 2;
  if (layout === "2x2") return 2;
  if (layout === "3x2") return 3;
  if (count <= 1) return 1;
  if (count === 3 || count >= 5) return 3;
  return 2;
}

// ---------------------------------------------------------------------------
// Illustrations
// ---------------------------------------------------------------------------

