// The palettes of a diffuser: wood, the default for the shapes that are made
// of it, or the card's colour.
const DIF_WOOD = ["#c98f55", "#a8693a", "#7d4a26", "#e3b07a"];
const DIF_WHITE = ["#ffffff", "#eceef0", "#c9cfd5", "#ffffff"];
const DIF_PAL = { white: DIF_WHITE, grey: ["#b6bbbf", "#9ea4a8", "#7e8488", "#d0d5d8"], black: ["#4a4f55", "#2c3035", "#16191c", "#5c636a"], red: ["#8a3035", "#6d2226", "#4a1518", "#a3434a"] };
function difGrain(clip) {
  let g = "";
  for (let i = 0; i < 9; i++) {
    const x = 26 + i * 8.5, w = 3 + (i % 3) * 2;
    g += `<path d="M${x} 20 C${x + w} 40 ${x - w} 60 ${x + w / 2} 80 S${x - w} 96 ${x} 104" stroke="#7a4522" stroke-width="${(0.6 + (i % 2) * 0.5).toFixed(1)}" fill="none" opacity=".35"/>`;
  }
  return `<g clip-path="url(#${clip})">${g}<ellipse cx="72" cy="66" rx="9" ry="14" fill="none" stroke="#7a4522" stroke-width=".7" opacity=".35"/></g>`;
}
const DIF_PUFFS = (x, y) => `<g class="dif-puffs">${[0, 1, 2, 3].map(() => `<ellipse cx="${x}" cy="${y}" rx="6" ry="4.5"/>`).join("")}</g>`;
const DIF_DROP_BADGE = `<g class="dif-empty"><circle cx="104" cy="16" r="9" fill="#f44336"/><path d="M104 10 Q100 15.5 100 18 A4 4 0 0 0 108 18 Q108 15.5 104 10 Z" fill="#fff"/></g>`;
const DIF_HALO = (cx, cy, rx, ry) => `<ellipse class="dif-halo" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#dif-g-halo)"/>`;
const DIFFUSER_SVGS = {
  drop: (wood, b) => {
    const d = "M56.5 14 H63.5 C63.5 30 71 40 85 50 C100 60 103 79 97 91 Q94 99 85 99 H35 Q26 99 23 91 C17 79 20 60 35 50 C49 40 56.5 30 56.5 14 Z";
    return `<defs><radialGradient id="dif-g-b" cx=".38" cy=".38" r=".75"><stop offset="0" stop-color="${b[3]}"/><stop offset=".55" stop-color="${b[0]}"/><stop offset="1" stop-color="${b[2]}"/></radialGradient><clipPath id="dif-c"><path d="${d}"/></clipPath></defs>
<g transform="translate(12 20) scale(.8)">${DIF_HALO(60, 104, 66, 15)}<ellipse cx="60" cy="106" rx="34" ry="3.5" fill="#000" opacity=".16"/>
<rect x="33" y="99" width="7" height="4" rx="1.5" fill="${b[2]}"/><rect x="80" y="99" width="7" height="4" rx="1.5" fill="${b[2]}"/>
<path d="${d}" fill="url(#dif-g-b)"/>${wood ? difGrain("dif-c") : ""}
<path d="M30 60 Q38 50 50 46" stroke="#fff" stroke-width="3" opacity=".25" fill="none" stroke-linecap="round"/>
<path class="dif-band" d="M21 82 Q60 88 99 82 L98.6 84.4 Q60 90.4 21.4 84.4 Z"/>
<rect x="47" y="88" width="12" height="4" rx="2" fill="none" stroke="#f4f4f2" stroke-width=".9"/><rect x="61" y="88" width="12" height="4" rx="2" fill="none" stroke="#f4f4f2" stroke-width=".9"/></g>${DIF_PUFFS(60, 30)}`;
  },
  cone: (wood, b) => `<defs><linearGradient id="dif-g-b" x1="0" x2="1"><stop offset="0" stop-color="${b[2]}"/><stop offset=".35" stop-color="${b[3]}"/><stop offset=".75" stop-color="${b[0]}"/><stop offset="1" stop-color="${b[2]}"/></linearGradient></defs>
<g transform="translate(12 20) scale(.8)">${DIF_HALO(60, 102, 62, 15)}<ellipse cx="60" cy="104" rx="32" ry="3.5" fill="#000" opacity=".16"/>
<path d="M30 92 Q60 101 90 92 L91 98 Q60 107 29 98 Z" fill="${wood ? "#a8693a" : b[2]}"/>
<path d="M50 22 Q60 18 70 22 L88 92 Q60 100 32 92 Z" fill="url(#dif-g-b)"/>
<path class="dif-band" d="M40 70 Q60 75 80 70 L83 82 Q60 88 37 82 Z"/>
<ellipse cx="60" cy="21" rx="9" ry="2.6" fill="${b[2]}"/><ellipse cx="60" cy="20.4" rx="3" ry="1" fill="#555"/></g>${DIF_PUFFS(60, 33)}`,
  stone: (wood, b) => {
    const c = wood ? ["#efe9e1", "#d8cfc3", "#b9ad9f"] : [b[3], b[1], b[2]];
    const d = "M60 34 C82 34 92 60 90 80 C88 98 76 104 60 104 C44 104 32 98 30 80 C28 60 38 34 60 34 Z";
    return `<defs><radialGradient id="dif-g-b" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="${c[0]}"/><stop offset=".6" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[2]}"/></radialGradient></defs>
${DIF_HALO(60, 105, 54, 13)}<ellipse cx="60" cy="106" rx="30" ry="3.5" fill="#000" opacity=".16"/>
<path class="dif-band" d="M36 102 Q60 108 84 102 L84 104 Q60 110 36 104 Z"/>
<path d="${d}" fill="url(#dif-g-b)"/>
<path d="M41 56 Q46 44 56 40" stroke="#fff" stroke-width="3" opacity=".3" fill="none" stroke-linecap="round"/>
<ellipse cx="60" cy="36" rx="4" ry="1.4" fill="#6d655c"/>${DIF_PUFFS(60, 32)}`;
  },
  flame: (wood, b) => `<defs><linearGradient id="dif-g-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b[3]}"/><stop offset="1" stop-color="${b[2]}"/></linearGradient>
<linearGradient id="dif-g-fl" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffcc80"/><stop offset=".4" stop-color="#ff9100"/><stop offset=".85" stop-color="#ff6d00" stop-opacity=".5"/><stop offset="1" stop-color="#ff6d00" stop-opacity="0"/></linearGradient></defs>
${DIF_HALO(60, 106, 58, 12)}<ellipse cx="60" cy="107" rx="40" ry="3.5" fill="#000" opacity=".16"/>
<g class="dif-fl"><path d="M60 72 C50 62 54 50 58 40 C60 48 66 50 64 40 C74 52 72 64 60 72 Z" fill="url(#dif-g-fl)"/></g>
<g class="dif-fl dif-f2"><path d="M50 72 C44 64 46 56 50 50 C52 58 56 60 55 52 C62 60 60 68 50 72 Z" fill="url(#dif-g-fl)" opacity=".8"/><path d="M70 72 C64 64 66 58 70 52 C72 60 76 62 75 54 C82 62 80 68 70 72 Z" fill="url(#dif-g-fl)" opacity=".8"/></g>
<path d="M22 72 H98 Q102 72 102 76 V100 Q102 104 98 104 H22 Q18 104 18 100 V76 Q18 72 22 72 Z" fill="url(#dif-g-b)"/>
<rect x="40" y="68" width="40" height="6" rx="3" fill="#2b2f34"/>
<circle cx="34" cy="90" r="2.4" fill="none" stroke="${b[2]}" stroke-width=".8"/><circle cx="86" cy="90" r="2.4" fill="none" stroke="${b[2]}" stroke-width=".8"/>
<path class="dif-band" d="M18 98 H102 V100 Q102 104 98 104 H22 Q18 104 18 100 Z"/>`,
  nebulizer: (wood, b) => {
    const base = wood ? ["#c98f55", "#7d4a26"] : [b[0], b[2]];
    return `<defs><linearGradient id="dif-g-b" x1="0" x2="1"><stop offset="0" stop-color="${base[1]}"/><stop offset=".45" stop-color="${base[0]}"/><stop offset="1" stop-color="${base[1]}"/></linearGradient>
<radialGradient id="dif-g-gl" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".5" stop-color="#e3f0f6" stop-opacity=".35"/><stop offset="1" stop-color="#a7c0cc" stop-opacity=".5"/></radialGradient></defs>
${DIF_HALO(60, 106, 52, 12)}<ellipse cx="60" cy="107" rx="28" ry="3.5" fill="#000" opacity=".16"/>
<path d="M34 84 H86 L82 104 H38 Z" fill="url(#dif-g-b)"/>
<path d="M57 30 H63 V44 C78 48 84 60 82 70 C80 80 72 84 60 84 C48 84 40 80 38 70 C36 60 42 48 57 44 Z" fill="url(#dif-g-gl)" stroke="#9fb6c2" stroke-width=".8"/>
<path d="M42 74 Q60 78 78 74 C76 80 70 83 60 83 C50 83 44 80 42 74 Z" fill="#e0a64b" opacity=".75"/>
<path class="dif-glass" d="M40 72 Q60 64 80 72 C78 80 70 84 60 84 C50 84 42 80 40 72 Z"/>
<path d="M47 56 Q50 50 56 48" stroke="#fff" stroke-width="2" opacity=".7" fill="none" stroke-linecap="round"/>
<circle cx="60" cy="96" r="2" fill="none" stroke="${base[1]}" stroke-width=".8"/>${DIF_PUFFS(60, 27)}`;
  },
};
function diffuserHtml(cls, d) {
  const layout = DIFFUSER_LAYOUTS.includes(d.layout) ? d.layout : "drop";
  const pal = DIF_PAL[d.palette];
  const wood = !pal && ["drop", "flame", "nebulizer"].includes(layout);
  const b = pal || (wood ? DIF_WOOD : DIF_WHITE);
  const flags = ["dif", `dif-l-${layout}`, `dif-m-${d.mode || "unav"}`, d.lit ? "dif-lit" : ""].filter(Boolean).join(" ");
  return `
        <div class="machine ${cls} ${flags}" style="--dif-lc:${d.lightColor || "#ffd180"}"><svg class="dif-svg" viewBox="0 0 120 120">
<defs><radialGradient id="dif-g-halo" r=".5"><stop offset="0" stop-color="var(--dif-lc)" stop-opacity="1"/><stop offset=".45" stop-color="var(--dif-lc)" stop-opacity=".55"/><stop offset="1" stop-color="var(--dif-lc)" stop-opacity="0"/></radialGradient></defs>
${DIFFUSER_SVGS[layout](wood, b)}${DIF_DROP_BADGE}</svg></div>`;
}

// Heat recovery ventilation, read from its fan (or climate, or select) entity:
// on or off, its speed and its preset (boost, away); a bypass or Vallox's
// cell state (heat recovery, cool recovery, bypass, defrosting); a filter in
// days or in percent; four temperatures drawn at the ends of the ducts.
// The units a power and an energy field accept in the editor's lists.
const UNIT_FILTERS = { power: /^[mkMG]?W$/, energy: /^[mkMG]?Wh$/ };
const HRV_ONLY_FIELDS = ["hrv_layout", "active_mode_entity", "supply_temperature_entity", "extract_temperature_entity", "exhaust_temperature_entity", "bypass_entity", "airflow_entity",
  "supply_fan_entity", "exhaust_fan_entity", "exhaust_airflow_entity", "fan_max_rpm", "humidity_control_entity", "filter_life_full", "high_speed_entity", "speed_entities"];
const HRV_LAYOUTS = ["diagram", "one_duct", "pair", "single", "single_box"];
const HRV_NAME_RE = /(^|[^a-z])(hrv|erv|vmc|wtw|ftx|mvhr)([^a-z]|$)|double.?flux|heat.?recovery|recuperat|comfoair|comfoconnect|vallox|zehnder|lunos|twinfresh|danfoss.?air|renson|endura|brink.?(flair|renovent)|wohnraumluft/;
const HRV_LABELS = { run: "hrv_run", boost: "hrv_boost", bypass: "hrv_bypass", defrost: "hrv_defrost", filter: "hrv_filter", away: "hrv_away",
  rec: "hrv_recirc", hum: "hrv_humidity", inter: "hrv_inter", off: "ac_off", unav: "ev_offline" };
const HRV_COLORS = { run: "#03a9f4", boost: "#ff9800", bypass: "#26a69a", defrost: "#4fc3f7", filter: "#ff9800", away: "#607d8b",
  rec: "#ff9800", hum: "#1e88e5", inter: "#607d8b",
  off: "var(--disabled-text-color, #9e9e9e)", unav: "var(--disabled-text-color, #9e9e9e)" };
const HRV_LCD = { run: "", boost: "BST", bypass: "BYP", defrost: "DEF", filter: "FIL", away: "AWY", rec: "REC", hum: "HUM", inter: "INT", off: "OFF", unav: "--" };
// A fan read in revolutions per minute turns as fast as its motor: the top
// speed, the owner's or 2000 rpm, spins in 0.6 s, a crawl in 2.6 s (#54).
const HRV_MAX_RPM = 2000;
function hrvPace(rpm, max) {
  if (rpm === null) return "";
  if (rpm <= 0) return "0s";
  return `${(2.6 - 2 * Math.min(1, rpm / (max > 0 ? max : HRV_MAX_RPM))).toFixed(2)}s`;
}
// The modes a select offers, in the words of the integration when it has
// them, and the card's when it does not (Broan's ESPHome: off, min, max, int,
// manual, turbo, humidity, recirculate, smart, ovr).
function hrvModeLabel(hass, st, option) {
  const raw = stripAccents(String(option)).trim().toLowerCase();
  if (st && typeof hass.formatEntityState === "function") {
    try {
      const own = hass.formatEntityState(st, option);
      if (own && own !== option) return own;
    } catch (e) { /* the card's word, then */ }
  }
  if (/^(off|stop|standby)$/.test(raw)) return t(hass, "ac_off");
  if (/^int$|intermit|interval/.test(raw)) return t(hass, "hrv_inter");
  if (/recirc|umluft/.test(raw)) return t(hass, "hrv_recirc");
  if (/^humid|humidity|feucht/.test(raw)) return t(hass, "hrv_humidity");
  return String(option).charAt(0).toUpperCase() + String(option).slice(1);
}
// One entity per speed, in order (#78): a boolean, a switch or a light each,
// as a home-made unit runs its relays. The speed is the one whose entity is
// on, the highest when several are; none on reads no speed.
function hrvSpeedOf(hass, cfg) {
  const ids = entityEntries(cfg.speed_entities, 6).map((e) => e.entity);
  if (ids.length < 2) return null;
  let step = 0;
  ids.forEach((id, i) => {
    const s = stateObj(hass, id);
    if (s && ["on", "true"].includes(String(s.state).toLowerCase())) step = i + 1;
  });
  return { ids, step, count: ids.length };
}
// The mode menu: the options of a select, or the presets of a fan; for a unit
// run by one entity per speed, its speeds.
function hrvModeOptions(hass, cfg) {
  const st = stateObj(hass, cfg.state_entity);
  const sp = hrvSpeedOf(hass, cfg);
  const speeds = sp ? { entity: sp.ids[0], current: sp.step ? String(sp.step) : "", options: sp.ids.map((_, i) => String(i + 1)), dom: "speed", kind: "speed", ids: sp.ids } : null;
  if (!st) return speeds;
  const dom = domainOf(cfg.state_entity);
  const a = st.attributes || {};
  if ((dom === "select" || dom === "input_select") && Array.isArray(a.options) && a.options.length > 1) {
    return { entity: cfg.state_entity, current: st.state, options: a.options.filter((o) => String(o).trim() !== ""), dom };
  }
  if (dom === "fan" && Array.isArray(a.preset_modes) && a.preset_modes.length > 1) {
    return { entity: cfg.state_entity, current: a.preset_mode, options: a.preset_modes, dom };
  }
  return speeds;
}
const HRV_PACE = { 1: "2.2s", 2: "1.4s", 3: ".7s" };
function hrvReadOf(hass, cfg, st, norm, powerDerived) {
  const raw = st ? stripAccents(String(st.state)).trim().toLowerCase() : "";
  const a = (st && st.attributes) || {};
  const dom = domainOf(cfg.state_entity);
  if (!powerDerived && (!st || ["unavailable", "unknown", ""].includes(raw))) return { mode: "unav", level: 0 };
  const on = powerDerived ? isActiveState(norm)
    : dom === "climate" ? raw !== "off"
    : dom === "select" || dom === "input_select" ? !/^(off|stop|standby|0|none)$/.test(raw)
    : dom === "sensor" ? !/^(off|stop|standby)$/.test(raw)
    : ["on", "true"].includes(raw) || isActiveState(norm);
  if (!on) return { mode: "off", level: 0 };
  const preset = stripAccents(String(dom === "select" || dom === "input_select" ? raw : a.preset_mode || a.fan_mode || "")).toLowerCase();
  // The speed in percent: the fan's own, or a number of its own (Broan).
  const pct = numberOrNull(a.percentage) ?? (cfg.fan_speed_entity ? numericState(hass, cfg.fan_speed_entity) : null);
  // Recirculation closes the outdoor dampers, humidity control runs the unit
  // until the air is dry enough, intermittent runs it part of each hour.
  const recirc = /recirc|umluft/.test(preset);
  const hst = cfg.humidity_control_entity ? stateObj(hass, cfg.humidity_control_entity) : null;
  const humidity = /^humid|humidity|feucht/.test(preset) || (!!hst && ["on", "true"].includes(String(hst.state).toLowerCase()));
  const inter = /^int$|intermit|interval/.test(preset);
  // Each fan at the speed of its motor, when the unit reports it.
  const max = parseFloat(cfg.fan_max_rpm);
  const sRpm = cfg.supply_fan_entity ? numericState(hass, cfg.supply_fan_entity) : null;
  const eRpm = cfg.exhaust_fan_entity ? numericState(hass, cfg.exhaust_fan_entity) : null;
  const rpms = [sRpm, eRpm].filter((v) => v !== null);
  // Intermittent between two runs: both fans still.
  const paused = inter && rpms.length > 0 && rpms.every((v) => v <= 0);
  const boost = /boost|turbo|max|party|intensiv|fireplace|cheminee|kamin/.test(preset);
  const away = /away|absen|holiday|vacan|urlaub/.test(preset);
  // The bypass: a switch or a binary sensor that is on, a percentage open, or
  // a state that names it; Vallox's cell state also says when it defrosts.
  const bst = cfg.bypass_entity ? stateObj(hass, cfg.bypass_entity) : null;
  const braw = bst ? stripAccents(String(bst.state)).toLowerCase() : "";
  const bnum = bst ? parseFloat(bst.state) : NaN;
  const defrost = /defrost|degivr|abtau|frost/.test(braw) || /defrost|degivr|abtau/.test(raw);
  const bypass = !defrost && (["on", "true", "open", "opened", "bypass", "active"].includes(braw) || /bypass|cool.?recovery/.test(braw) || (isFinite(bnum) && bnum > 0));
  // The filter: days or percent left, or a sensor that says it is due.
  let filterDue = false, filterText = "", filterValue = null, filterDays = false;
  const fst = cfg.filter_life_entity ? stateObj(hass, cfg.filter_life_entity) : null;
  if (fst) {
    const fv = parseFloat(fst.state);
    const unit = String((fst.attributes || {}).unit_of_measurement || "").toLowerCase();
    if (isFinite(fv)) {
      const days = /^(d|day|days|jours?|tage?|dias?|giorni)$/.test(unit);
      const due = parseFloat(cfg.filter_due_below);
      filterDue = fv <= (isFinite(due) ? due : days ? 7 : 10);
      filterText = `${Math.round(fv)}${days ? ` ${unit}` : " %"}`;
      filterValue = fv;
      filterDays = days;
    } else filterDue = ["on", "true", "due", "replace", "dirty"].includes(String(fst.state).toLowerCase());
  }
  const named = presetSpeedOf(preset);
  // A two-speed extract unit: its speed switch on is the high speed, off the
  // low one.
  const hs = cfg.high_speed_entity ? stateObj(hass, cfg.high_speed_entity) : null;
  const speed = hs && !["unavailable", "unknown"].includes(String(hs.state).toLowerCase()) ? (["on", "true"].includes(String(hs.state).toLowerCase()) ? "high" : "low") : null;
  const sp = hrvSpeedOf(hass, cfg);
  const step = sp && sp.step ? sp.step : 0;
  const level = boost ? 3 : step ? Math.max(1, Math.min(3, Math.round(step / sp.count * 3))) : speed ? (speed === "high" ? 3 : 1)
    : pct !== null && pct > 0 ? (pct <= 40 ? 1 : pct <= 75 ? 2 : 3) : named || 2;
  const mode = defrost ? "defrost" : recirc ? "rec" : bypass ? "bypass" : boost ? "boost" : humidity ? "hum" : inter ? "inter"
    : filterDue ? "filter" : away ? "away" : "run";
  return { mode, level, speed, step, steps: sp ? sp.count : 0, stepEntity: step ? sp.ids[step - 1] : "", pct, bypass, defrost, filterDue, filterText, filterValue, filterDays, paused,
    sRpm, eRpm, sPace: hrvPace(sRpm, max), ePace: hrvPace(eRpm, max) };
}
function hrvLayoutOf(cfg, st) {
  if (HRV_LAYOUTS.includes(cfg.hrv_layout)) return cfg.hrv_layout;
  const a = (st && st.attributes) || {};
  const hay = stripAccents(`${cfg.state_entity || ""} ${cfg.name || ""} ${a.friendly_name || ""}`).toLowerCase();
  if (/lunos.?e2|e\u00b2|twinfresh|pair|paire|decentral|dezentral/.test(hay)) return "pair";
  if (/ego|comfoair.?70|single.?room|monotube|un.?conduit/.test(hay)) return "one_duct";
  if (/simple.?flux|single.?flow|extract|hygro/.test(hay)) return "single";
  return "diagram";
}
const hvLab = (x, y, temp, name, anchor) => `<text class="hv-t" x="${x}" y="${y}" text-anchor="${anchor}">${anchor === "start"
  ? `${temp} <tspan class="hv-n">${name}</tspan>` : `<tspan class="hv-n">${name}</tspan> ${temp}`}</text>`;
// Each fan turns on its own centre: the box of its blades is not centred on
// it, so the turn is set on the drawing's own coordinates.
const hvFan = (x, y, r, cls) => `<circle cx="${x}" cy="${y}" r="${r}" class="hv-fanbody"/><g class="hv-fan${cls ? ` ${cls}` : ""}" style="transform-origin:${x}px ${y}px">${[0, 120, 240].map((d) => `<path d="M${x} ${y} q${(r * 0.45).toFixed(1)} -${(r * 0.85).toFixed(1)} 0 -${(r * 0.85).toFixed(1)} q-${(r * 0.45).toFixed(1)} ${(r * 0.3).toFixed(1)} 0 ${(r * 0.85).toFixed(1)}z" transform="rotate(${d} ${x} ${y})"/>`).join("")}</g>`;
const hvBadges = (h, cx, y) => `<g class="hv-hum"><rect x="${cx - 34}" y="${y}" width="68" height="13" rx="6.5" fill="#1e88e5"/><path d="M${cx - 26} ${y + 2.5} C${cx - 24} ${y + 5.5} ${cx - 22.5} ${y + 7} ${cx - 22.5} ${y + 8.6} a3.5 3.5 0 0 1 -7 0 C${cx - 29.5} ${y + 7} ${cx - 28} ${y + 5.5} ${cx - 26} ${y + 2.5}Z" fill="#fff"/><text class="hv-badge" x="${cx + 4}" y="${y + 9.6}" text-anchor="middle">${h.humText || ""}</text></g>
<g class="hv-int"><rect x="${cx - 20}" y="${y}" width="40" height="13" rx="6.5" fill="#607d8b"/><circle cx="${cx - 12}" cy="${y + 6.5}" r="4" fill="none" stroke="#fff" stroke-width="1.2"/><path d="M${cx - 12} ${y + 4} V${y + 6.5} L${cx - 10} ${y + 7.6}" stroke="#fff" stroke-width="1.1" fill="none" stroke-linecap="round"/><text class="hv-badge" x="${cx + 4}" y="${y + 9.6}" text-anchor="middle">INT</text></g>`;
const HRV_SVGS = {
  diagram: (h) => `<defs><linearGradient id="hv-g-fa" x1="0" x2="1"><stop offset="0" stop-color="#42a5f5"/><stop offset="1" stop-color="#ff9800"/></linearGradient>
<linearGradient id="hv-g-ex" x1="1" x2="0"><stop offset="0" stop-color="#ef5350"/><stop offset="1" stop-color="#78909c"/></linearGradient></defs>
<path d="M10 74 a9 9 0 0 1 4 -17 a11 11 0 0 1 20 3 a8 8 0 0 1 2 14 z" fill="#90caf9"/><path d="M208 64 L220 53 L232 64 V78 H208 Z" fill="#ef9a9a"/>
<rect x="62" y="20" width="112" height="92" rx="8" class="hv-box"/>
<path d="M118 36 L148 66 L118 96 L88 66 Z" fill="#2c3238" stroke="#7b858f"/>
<g class="hv-out"><g class="hv-through"><path class="hv-flow" d="M10 34 H62 C90 34 96 52 118 66 C140 80 146 98 174 98 H226" stroke="url(#hv-g-fa)"/><path class="hv-dash hv-ds" d="M10 34 H62 C90 34 96 52 118 66 C140 80 146 98 174 98 H226"/></g>
<g class="hv-bypass"><path class="hv-flow" d="M10 98 H226" stroke="#42a5f5"/><path class="hv-dash hv-ds" d="M10 98 H226"/></g>
<path class="hv-flow" d="M226 34 H174 C146 34 140 52 118 66 C96 80 90 98 62 98 H10" stroke="url(#hv-g-ex)"/><path class="hv-dash hv-de" d="M226 34 H174 C146 34 140 52 118 66 C96 80 90 98 62 98 H10"/></g>
<g class="hv-rc"><path class="hv-flow" d="M226 34 H170 C128 34 128 98 170 98 H226" stroke="#ff9800"/><path class="hv-dash hv-ds" d="M226 34 H170 C128 34 128 98 170 98 H226"/></g>
<path class="hv-damper" d="M58 27 L66 41 M58 91 L66 105"/>${hvFan(160, 98, 8, "hv-fs")}${hvFan(76, 98, 8, "hv-fe")}
${h.flowS ? `<text class="hv-n hv-cfm" x="160" y="85" text-anchor="middle">${h.flowS}</text>` : ""}${h.flowE ? `<text class="hv-n hv-cfm" x="76" y="85" text-anchor="middle">${h.flowE}</text>` : ""}
${hvLab(8, 26, h.t.o, "", "start")}${hvLab(228, 118, h.t.s, "", "end")}${hvLab(228, 26, h.t.e, "", "end")}${hvLab(8, 118, h.t.x, "", "start")}
<text class="hv-frost" x="118" y="16" text-anchor="middle">\u2744</text><g class="hv-filt"><circle cx="168" cy="27" r="6"/><text x="168" y="30.5" text-anchor="middle">!</text></g>${hvBadges(h, 118, 4)}`,
  one_duct: (h) => `<defs><linearGradient id="hv-g-fa" gradientUnits="userSpaceOnUse" x1="130" x2="182"><stop offset="0" stop-color="#42a5f5"/><stop offset="1" stop-color="#ff9800"/></linearGradient>
<linearGradient id="hv-g-ex" gradientUnits="userSpaceOnUse" x1="182" x2="130"><stop offset="0" stop-color="#ef5350"/><stop offset="1" stop-color="#78909c"/></linearGradient></defs>
<rect x="56" y="4" width="54" height="124" class="hv-wall"/><path d="M56 4 V128 M110 4 V128" stroke="#b7a68e"/>
<rect x="44" y="47" width="78" height="34" rx="3" class="hv-tube"/><path d="M44 64 H122" stroke="#aab3bb" stroke-width="1.4"/><path d="M44 43 V85 L36 81 V47 Z" fill="#9aa3ad"/>
<rect x="118" y="28" width="78" height="72" rx="7" class="hv-box"/>
<rect x="132" y="50" width="46" height="28" rx="2" fill="#3a4148" stroke="#7b858f"/>${Array.from({ length: 11 }, (_, i) => `<path d="M${136 + i * 4} 51 V77" stroke="#7b858f" stroke-width=".7"/>`).join("")}
${hvFan(188, 56, 6.5, "hv-fs")}${hvFan(126, 72, 6.5, "hv-fe")}
${h.flowS ? `<text class="hv-n hv-cfm" x="188" y="47" text-anchor="middle">${h.flowS}</text>` : ""}${h.flowE ? `<text class="hv-n hv-cfm" x="126" y="86" text-anchor="middle">${h.flowE}</text>` : ""}
<g class="hv-through"><path class="hv-flow" d="M22 56 H214" stroke="url(#hv-g-fa)"/><path class="hv-dash hv-ds" d="M22 56 H214"/></g>
<g class="hv-bypass"><path class="hv-flow" d="M22 56 H124 C130 56 130 40 140 40 H170 C180 40 180 56 186 56 H214" stroke="#42a5f5"/><path class="hv-dash hv-ds" d="M22 56 H124 C130 56 130 40 140 40 H170 C180 40 180 56 186 56 H214"/></g>
<path class="hv-flow" d="M214 72 H22" stroke="url(#hv-g-ex)"/><path class="hv-dash hv-rev hv-de" d="M22 72 H214"/>
<path d="M214 50 l9 6 -9 6z" fill="#ff9800"/><path d="M22 66 l-9 6 9 6z" fill="#78909c"/>
<rect x="140" y="86" width="32" height="8" rx="1.5" fill="#0e1b2c"/><text class="hv-lcd" x="156" y="92.3" text-anchor="middle">${h.lcd}</text>
<g class="hv-filt"><circle cx="188" cy="34" r="6"/><text x="188" y="37.5" text-anchor="middle">!</text></g><text class="hv-frost" x="156" y="22" text-anchor="middle">\u2744</text>
${hvLab(4, 20, h.t.o, h.n.o, "start")}${hvLab(4, 114, h.t.x, h.n.x, "start")}${hvLab(232, 20, h.t.s, h.n.s, "end")}${hvLab(232, 114, h.t.e, h.n.e, "end")}${hvBadges(h, 157, 104)}`,
  // An extract-only unit: the box in the attic draws the stale air from the
  // kitchen and the bathroom through their ceiling vents and blows it out
  // over the roof, fresh air coming in through the windows' vents.
  single: (h) => `<defs><linearGradient id="hv-g-sx" gradientUnits="userSpaceOnUse" x1="0" y1="104" x2="0" y2="40"><stop offset="0" stop-color="#ff9800"/><stop offset="1" stop-color="#ef5350"/></linearGradient></defs>
<path d="M12 70 L118 10 L224 70 Z" fill="#f5efe6"/><path d="M6 72 L118 8 L230 72" fill="none" stroke="#8d6e63" stroke-width="4" stroke-linejoin="round"/>
<rect x="8" y="70" width="220" height="6" class="hv-wall"/><path d="M10 76 V128 M226 76 V128 M118 76 V128" stroke="#b7a68e" stroke-width="2"/>
<rect x="111" y="2" width="14" height="30" rx="2" class="hv-tube"/><path d="M106 4 H130" stroke="#7b858f" stroke-width="3" stroke-linecap="round"/>
<path d="M62 72 C62 50 78 44 92 44 M174 72 C174 50 158 44 144 44" fill="none" stroke="#c9d0d6" stroke-width="9" stroke-linecap="round"/>
<path d="M62 72 C62 50 78 44 92 44 M174 72 C174 50 158 44 144 44" fill="none" stroke="#e3e7ea" stroke-width="6" stroke-linecap="round"/>
<rect x="88" y="28" width="60" height="32" rx="5" class="hv-box"/>${hvFan(118, 44, 10, "hv-fe")}
<g class="hv-ins"><path class="hv-flow" d="M62 108 V76 C62 56 78 44 92 44" stroke="url(#hv-g-sx)"/><path class="hv-dash hv-de" d="M62 108 V76 C62 56 78 44 92 44"/>
<path class="hv-flow" d="M174 108 V76 C174 56 158 44 144 44" stroke="url(#hv-g-sx)"/><path class="hv-dash hv-de" d="M174 108 V76 C174 56 158 44 144 44"/>
<path class="hv-flow" d="M118 30 V2" stroke="#78909c"/><path class="hv-dash hv-de" d="M118 30 V2"/>
<path class="hv-flow" d="M-6 100 H30" stroke="#42a5f5"/><path class="hv-dash hv-de" d="M-6 100 H30"/><path class="hv-flow" d="M242 100 H206" stroke="#42a5f5"/><path class="hv-dash hv-de" d="M242 100 H206"/></g>
<ellipse cx="62" cy="77" rx="10" ry="2.6" fill="#eceff1" stroke="#90a4ae"/><ellipse cx="174" cy="77" rx="10" ry="2.6" fill="#eceff1" stroke="#90a4ae"/>
<rect x="6" y="95" width="8" height="10" rx="1" fill="#eceff1" stroke="#90a4ae"/><rect x="222" y="95" width="8" height="10" rx="1" fill="#eceff1" stroke="#90a4ae"/>
<g class="hv-filt"><circle cx="146" cy="30" r="6"/><text x="146" y="33.5" text-anchor="middle">!</text></g>
${h.t.o ? hvLab(4, 16, h.t.o, h.n.o, "start") : ""}${h.t.e ? hvLab(232, 16, h.t.e, h.n.e, "end") : ""}${hvBadges(h, 118, 112)}`,
  // The same extract unit drawn alone: its box, the fan behind its grille,
  // the vents' ducts coming in on one side and the outlet on the other.
  single_box: (h) => `<path d="M70 40 L84 28 H180 L166 40 Z" fill="#f7f9fa" stroke="#b9c1c8"/><path d="M166 40 L180 28 V84 L166 96 Z" fill="#cfd6dc" stroke="#b9c1c8"/>
<rect x="70" y="40" width="96" height="56" rx="5" class="hv-box"/>
${[50, 68, 86].map((y) => `<rect x="34" y="${y - 5}" width="38" height="10" rx="2" class="hv-tube"/><path d="M34 ${y - 6} V${y + 6} L30 ${y + 4} V${y - 4} Z" fill="#9aa3ad"/>`).join("")}
<rect x="172" y="44" width="40" height="16" rx="3" class="hv-tube"/><path d="M212 42 V62 L218 59 V45 Z" fill="#9aa3ad"/>
<g>${[50, 68, 86].map((y) => `<path class="hv-flow" d="M14 ${y} H70" stroke="#ff9800"/><path class="hv-dash hv-de" d="M14 ${y} H70"/>`).join("")}
<path class="hv-flow" d="M168 52 H222" stroke="#78909c"/><path class="hv-dash hv-de" d="M168 52 H222"/></g>
<path d="M222 46 l9 6 -9 6z" fill="#78909c"/>${[50, 68, 86].map((y) => `<path d="M6 ${y - 5} l9 5 -9 5z" fill="#ff9800"/>`).join("")}
<circle cx="118" cy="68" r="21" fill="#dfe4e8" stroke="#9aa3ad"/>${hvFan(118, 68, 15, "hv-fe")}
<circle cx="118" cy="68" r="21" fill="none" stroke="#7b858f" stroke-width=".8"/><circle cx="118" cy="68" r="14" fill="none" stroke="#7b858f" stroke-width=".6" opacity=".7"/><path d="M97 68 H139 M118 47 V89" stroke="#7b858f" stroke-width=".6" opacity=".7"/>
<circle class="hv-led" cx="156" cy="88" r="2.4"/>
<g class="hv-filt"><circle cx="160" cy="46" r="6"/><text x="160" y="49.5" text-anchor="middle">!</text></g>
${h.t.e ? hvLab(4, 16, h.t.e, h.n.e, "start") : ""}${h.t.o ? hvLab(232, 16, h.t.o, h.n.o, "end") : ""}${hvBadges(h, 118, 112)}`,
  pair: (h) => {
    const unit = (cy) => `<rect x="72" y="${cy - 12}" width="92" height="24" rx="3" class="hv-tube"/>${Array.from({ length: 18 }, (_, i) => `<rect x="${104 + (i % 6) * 5}" y="${cy - 7 + Math.floor(i / 6) * 5}" width="4" height="4" fill="#e9dccb" stroke="#bfae96" stroke-width=".5"/>`).join("")}
${hvFan(146, cy, 8.5)}<path d="M72 ${cy - 15} V${cy + 15} L64 ${cy + 12} V${cy - 12} Z" fill="#9aa3ad"/><rect x="164" y="${cy - 16}" width="6" height="32" rx="3" class="hv-box"/>`;
    const inF = (cy) => `<path class="hv-flow" d="M28 ${cy} H118" stroke="#42a5f5"/><path class="hv-flow" d="M118 ${cy} H200" stroke="#ff9800"/><path class="hv-dash" d="M28 ${cy} H200"/><path d="M200 ${cy - 6} l9 6 -9 6z" fill="#ff9800"/>`;
    const outF = (cy) => `<path class="hv-flow" d="M200 ${cy} H118" stroke="#ef5350"/><path class="hv-flow" d="M118 ${cy} H28" stroke="#78909c"/><path class="hv-dash hv-rev" d="M28 ${cy} H200"/><path d="M28 ${cy - 6} l-9 6 9 6z" fill="#78909c"/>`;
    return `<path d="M4 70 a9 9 0 0 1 4 -17 a11 11 0 0 1 20 3 a8 8 0 0 1 2 14 z" fill="#90caf9" opacity=".85"/><path d="M208 60 L220 49 L232 60 V74 H208 Z" fill="#ef9a9a" opacity=".85"/>
<rect x="80" y="4" width="76" height="124" class="hv-wall"/><path d="M80 4 V128 M156 4 V128" stroke="#b7a68e"/>${unit(34)}${unit(98)}
<g class="hv-pa">${inF(34)}${outF(98)}</g><g class="hv-pb">${outF(34)}${inF(98)}</g>
${hvLab(6, 16, h.t.o, "", "start")}${hvLab(230, 16, h.t.s, "", "end")}
<text class="hv-n" x="6" y="126">${h.n.out}</text><text class="hv-n" x="230" y="126" text-anchor="end">${h.n.room}</text>
<g class="hv-filt"><circle cx="118" cy="66" r="6"/><text x="118" y="69.5" text-anchor="middle">!</text></g>${hvBadges(h, 118, 58)}`;
  },
};
function hrvHtml(cls, h) {
  const layout = HRV_LAYOUTS.includes(h.layout) ? h.layout : "diagram";
  const live = !["off", "unav"].includes(h.mode) && !h.paused;
  const flags = ["hv", `hv-l-${layout}`, `hv-m-${h.mode || "unav"}`, live ? "hv-on" : "", h.bypass ? "hv-by" : "", h.defrost ? "hv-df" : "", h.filterDue ? "hv-fd" : "", h.dark ? "hv-dark" : "",
    h.sPace === "0s" ? "hv-sx" : "", h.ePace === "0s" ? "hv-ex" : "", h.humBadge ? "hv-hb" : ""].filter(Boolean).join(" ");
  const pace = HRV_PACE[h.level] || "1.4s";
  const fans = `${h.sPace && h.sPace !== "0s" ? `;--hv-sp:${h.sPace}` : ""}${h.ePace && h.ePace !== "0s" ? `;--hv-ep:${h.ePace}` : ""}`;
  return `
        <div class="machine ${cls} ${flags}" style="--hv-pace:${pace}${fans}"><svg class="hv-svg" viewBox="0 0 236 132">${HRV_SVGS[layout](h)}</svg></div>`;
}

// A camera, read from its camera entity: idle, streaming or recording, and
// off once it is switched off. A motion sensor, a recording sensor and an
// infrared mode say more when the integration has them, a privacy switch (or
// Netatmo's monitoring attribute) says it is off, and a connectivity sensor
// that it is gone.
const CAMERA_ONLY_FIELDS = ["camera_layout", "motion_entity", "recording_entity", "night_entity", "privacy_entity", "signal_entity", "ring_entity"];
const CAMERA_LAYOUTS = ["indoor", "tube", "outdoor", "dome", "doorbell"];
const CAMERA_LABELS = { idle: "cam_idle", live: "cam_live", rec: "cam_rec", motion: "cam_motion", ring: "cam_ring", off: "cam_off", unav: "ev_offline" };
const CAMERA_COLORS = { idle: "var(--secondary-text-color, #727272)", live: "#03a9f4", rec: "#f44336", motion: "#ff9800", ring: "#03a9f4",
  off: "var(--disabled-text-color, #9e9e9e)", unav: "var(--disabled-text-color, #9e9e9e)" };
const CAMERA_ON = ["on", "true", "1", "yes", "detected", "recording", "motion", "home"];
function camOn(hass, id) {
  const st = id ? stateObj(hass, id) : null;
  return !!st && CAMERA_ON.includes(String(st.state).toLowerCase());
}
// A doorbell's button: a binary sensor on while it is pressed (Reolink's
// visitor), or an event entity whose state is the time of its last ring (Ring,
// Nest, UniFi Protect), drawn ringing for half a minute after it.
const CAM_RING_MS = 30000;
function camRingAt(hass, id) {
  const st = id ? stateObj(hass, id) : null;
  if (!st) return null;
  if (domainOf(id) === "event") {
    const at = Date.parse(st.state);
    const type = String((st.attributes || {}).event_type || "").toLowerCase();
    return isFinite(at) && (!type || /ring|press|doorbell|single|button/.test(type)) ? at : null;
  }
  const at = Date.parse(st.last_changed);
  return CAMERA_ON.includes(String(st.state).toLowerCase()) ? Date.now() : isFinite(at) ? at : null;
}
function camRinging(hass, id) {
  const at = camRingAt(hass, id);
  if (at === null) return false;
  return domainOf(id) === "event" ? Date.now() - at < CAM_RING_MS : camOn(hass, id);
}
function cameraReadOf(hass, cfg, st) {
  const raw = st ? String(st.state).trim().toLowerCase() : "";
  const a = (st && st.attributes) || {};
  const conn = cfg.connectivity_entity ? stateObj(hass, cfg.connectivity_entity) : null;
  const gone = !!conn && ["off", "false", "disconnected", "offline", "unavailable"].includes(String(conn.state).toLowerCase());
  let mode;
  if (!st || ["unavailable", "unknown", "none", ""].includes(raw) || gone) mode = "unav";
  else if (raw === "off" || a.monitoring === false || camOn(hass, cfg.privacy_entity)) mode = "off";
  else if (camRinging(hass, cfg.ring_entity)) mode = "ring";
  else if (raw === "recording" || camOn(hass, cfg.recording_entity)) mode = "rec";
  else if (raw === "motion" || camOn(hass, cfg.motion_entity)) mode = "motion";
  else if (raw === "streaming") mode = "live";
  else mode = "idle";
  return { mode, night: mode !== "off" && mode !== "unav" && camOn(hass, cfg.night_entity) };
}
// The shape: picked, or read from the name, the brand and the model. A
// Netatmo indoor camera is its aluminium tube; the outdoor ones and the
// battery cameras that live on a wall are drawn on their arm.
function cameraLayoutOf(cfg, st) {
  if (CAMERA_LAYOUTS.includes(cfg.camera_layout)) return cfg.camera_layout;
  const a = (st && st.attributes) || {};
  const hay = stripAccents(`${cfg.state_entity || ""} ${cfg.name || ""} ${a.friendly_name || ""} ${a.brand || ""} ${a.model_name || a.model || ""}`).toLowerCase();
  if (cfg.ring_entity || /doorbell|sonnette|klingel|timbre|campanello|deurbel|campainha|dorrklocka|ringeklokke|dorklokke|dzwonek|zvonek|visitor/.test(hay)) return "doorbell";
  if (/dome|kuppel|domo|cupola|turret/.test(hay)) return "dome";
  if (/netatmo/.test(hay) && !/presence|outdoor|exterieur|exterior/.test(hay)) return "tube";
  if (/outdoor|exterieur|exterior|aussen|garden|jardin|garage|driveway|porch|terrasse|street|front|back|arriere|avant|entree|portail|gate|spotlight|bullet|presence|arlo/.test(hay)) return "outdoor";
  return "indoor";
}

// The camera, drawn in its colour: the lens, its glint, the blue of a live
// view, an infrared ring that glows red at night, the status light, the REC
// tag and the waves of a motion.
const CAM_DEFS = `<defs>
<linearGradient id="cam-g-sh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--ac-body-hi,#fff)"/><stop offset=".55" style="stop-color:var(--ac-body,#eef1f4)"/><stop offset="1" style="stop-color:var(--ac-body-lo,#c9d0d7)"/></linearGradient>
<linearGradient id="cam-g-shv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--ac-body-hi,#fff)"/><stop offset="1" style="stop-color:var(--ac-body-lo,#c9d0d7)"/></linearGradient>
<radialGradient id="cam-g-sph" cx=".38" cy=".32" r=".75"><stop offset="0" style="stop-color:var(--ac-body-hi,#fff)"/><stop offset=".6" style="stop-color:var(--ac-body,#eef1f4)"/><stop offset="1" style="stop-color:var(--ac-body-lo,#c9d0d7)"/></radialGradient>
<radialGradient id="cam-g-glass" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#3a4552"/><stop offset=".55" stop-color="#11161c"/><stop offset="1" stop-color="#05070a"/></radialGradient>
<radialGradient id="cam-g-lens" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#4f6b8a"/><stop offset=".45" stop-color="#16263a"/><stop offset="1" stop-color="#020407"/></radialGradient>
<radialGradient id="cam-g-glow" r=".5"><stop offset="0" stop-color="#4fc3f7" stop-opacity=".95"/><stop offset="1" stop-color="#4fc3f7" stop-opacity="0"/></radialGradient>
<radialGradient id="cam-g-smoke" cx=".4" cy=".25" r=".85"><stop offset="0" stop-color="#56606b" stop-opacity=".85"/><stop offset=".6" stop-color="#1c2228" stop-opacity=".9"/><stop offset="1" stop-color="#0b0e11" stop-opacity=".95"/></radialGradient>
<linearGradient id="cam-g-al" x1="0" y1="0" x2="1" y2="0"><stop offset="0" class="cam-al0"/><stop offset=".32" class="cam-al1"/><stop offset=".7" class="cam-al2"/><stop offset="1" class="cam-al3"/></linearGradient>
<linearGradient id="cam-g-dbglass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a323b"/><stop offset=".5" stop-color="#0e1216"/><stop offset="1" stop-color="#05070a"/></linearGradient>
<radialGradient id="cam-g-pir" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#6b737c"/><stop offset="1" stop-color="#1b2026"/></radialGradient>
<linearGradient id="cam-g-blk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#05070a"/><stop offset=".35" stop-color="#2a3138"/><stop offset=".6" stop-color="#0d1014"/><stop offset="1" stop-color="#030405"/></linearGradient>
<filter id="cam-f-soft" x="-40%" y="-80%" width="180%" height="260%"><feGaussianBlur stdDeviation="2.4"/></filter>
<linearGradient id="cam-g-cyl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" style="stop-color:var(--ac-body-lo,#c9d0d7)"/><stop offset=".3" style="stop-color:var(--ac-body-hi,#fff)"/><stop offset=".7" style="stop-color:var(--ac-body,#eef1f4)"/><stop offset="1" style="stop-color:var(--ac-body-lo,#c9d0d7)"/></linearGradient>
<linearGradient id="cam-g-visor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b333c"/><stop offset=".45" stop-color="#0d1115"/><stop offset="1" stop-color="#05070a"/></linearGradient>
<linearGradient id="cam-g-ceil" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d9d4cb" stop-opacity="0"/><stop offset=".18" stop-color="#e3dfd7"/><stop offset=".82" stop-color="#e3dfd7"/><stop offset="1" stop-color="#d9d4cb" stop-opacity="0"/></linearGradient>
<linearGradient id="cam-g-ceiledge" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b9b2a6" stop-opacity="0"/><stop offset=".18" stop-color="#c4bdb1"/><stop offset=".82" stop-color="#c4bdb1"/><stop offset="1" stop-color="#b9b2a6" stop-opacity="0"/></linearGradient>
</defs>`;
const CAM_EDGE = 'stroke="rgba(0,0,0,.28)"';
function camLens(x, y, r, irR) {
  const irs = irR ? `<g class="cam-ir">${Array.from({ length: 8 }, (_, i) => {
    const t = (i / 8) * Math.PI * 2;
    return `<circle cx="${(x + Math.cos(t) * irR).toFixed(1)}" cy="${(y + Math.sin(t) * irR).toFixed(1)}" r="1.1"/>`;
  }).join("")}</g>` : "";
  const gx = x - r * 0.35, gy = y - r * 0.38;
  return `${irs}<circle cx="${x}" cy="${y}" r="${r + 1.6}" fill="#05070a"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#cam-g-lens)"/>`
    + `<circle cx="${x}" cy="${y}" r="${(r * 0.42).toFixed(2)}" fill="#03060a"/><circle class="cam-glow" cx="${x}" cy="${y}" r="${(r * 1.9).toFixed(2)}" fill="url(#cam-g-glow)"/>`
    + `<ellipse cx="${gx.toFixed(2)}" cy="${gy.toFixed(2)}" rx="${(r * 0.32).toFixed(2)}" ry="${(r * 0.2).toFixed(2)}" fill="#fff" opacity=".55" transform="rotate(-30 ${gx.toFixed(2)} ${gy.toFixed(2)})"/>`;
}
const camWaves = (x, y) => `<g class="cam-waves" transform="translate(${x} ${y})"><path d="M6 -7 Q11 0 6 7"/><path d="M12 -12 Q20 0 12 12"/><path d="M18 -17 Q29 0 18 17"/></g>`;
const CAM_REC = `<g class="cam-rec"><rect x="4" y="4" width="25" height="11" rx="3" fill="#000" opacity=".55"/><circle cx="9.5" cy="9.5" r="2.4" fill="#ff3b30"/><text x="13.5" y="12.4" font-size="7.5" font-family="Arial, sans-serif" font-weight="700" fill="#fff">REC</text></g>`;
// A soft shadow on the floor or on the wall, blurred rather than a hard ellipse.
const camShadow = (cx, cy, rx, ry, op = .24) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="${op}" filter="url(#cam-f-soft)"/>`;
const CAMERA_SVGS = {
  // A pan-and-tilt camera, after the Tapo C200 or the Ezviz C6: a round head
  // with a black face on a neck and a round foot. Tilted down for privacy.
  indoor: () => `${camShadow(60, 113, 27, 3.6)}
<path d="M35 99 V106 A25 5.6 0 0 0 85 106 V99 Z" fill="url(#cam-g-cyl)" ${CAM_EDGE} stroke-width=".5"/>
<ellipse cx="60" cy="99" rx="25" ry="5.6" fill="url(#cam-g-shv)" ${CAM_EDGE} stroke-width=".5"/>
<ellipse cx="60" cy="98.6" rx="16" ry="3.2" fill="#000" opacity=".06"/>
<path d="M52.5 76 V97 A7.5 1.8 0 0 0 67.5 97 V76 Z" fill="url(#cam-g-cyl)" ${CAM_EDGE} stroke-width=".5"/>
<ellipse cx="60" cy="80" rx="9.5" ry="2.6" fill="url(#cam-g-cyl)" ${CAM_EDGE} stroke-width=".5"/>
<circle cx="60" cy="46" r="31" fill="url(#cam-g-sph)" ${CAM_EDGE} stroke-width=".7"/>
<path d="M33 60 Q60 72 87 60" stroke="#000" stroke-width=".6" opacity=".12" fill="none"/>
<g class="cam-on"><rect x="38.5" y="26" width="43" height="41" rx="19" fill="url(#cam-g-visor)"/>
<path d="M44 33 Q50 28.5 60 28.4" stroke="#fff" stroke-width="1.4" opacity=".22" fill="none" stroke-linecap="round"/>
${camLens(60, 45, 7.4, 12.6)}<circle cx="47.6" cy="36.4" r="1.2" fill="#2b3946"/><circle cx="72.4" cy="36.4" r="1.2" fill="#2b3946"/>
<circle class="cam-led" cx="60" cy="61" r="1.5"/></g>
<g class="cam-off"><path d="M41 69 Q60 80 79 69 Q74 76.5 60 77.5 Q46 76.5 41 69 Z" fill="#0d1115"/><path d="M33 40 Q60 33 87 40" fill="none" ${CAM_EDGE} stroke-width=".7"/><circle cx="60" cy="24" r="1.4" fill="rgba(0,0,0,.18)"/></g>
<path d="M38 24 Q46 16 58 15.5" stroke="#fff" stroke-width="2.4" opacity=".55" fill="none" stroke-linecap="round"/>
${camWaves(86, 46)}${CAM_REC}`,
  // The Netatmo indoor camera: a tube of brushed aluminium, a black window
  // at the top with the lens, a light under it.
  tube: () => `${camShadow(60, 108.5, 20, 3.6, .3)}
<path d="M43 16 V104 A17 5 0 0 0 77 104 V16 Z" fill="url(#cam-g-al)"/>
<ellipse cx="60" cy="16" rx="17" ry="5" class="cam-al-top"/><ellipse cx="60" cy="16" rx="15.5" ry="4.2" fill="url(#cam-g-al)" opacity=".8"/>
<path d="M47 22 Q60 26 73 22 V60 Q60 64 47 60 Z" fill="url(#cam-g-blk)"/>
<path d="M50 25 Q56 27 62 27" stroke="#fff" stroke-width="1.2" opacity=".2" fill="none" stroke-linecap="round"/>
<g class="cam-on">${camLens(60, 38, 6.2, 9.5)}</g>
<g class="cam-off"><circle cx="60" cy="38" r="7.8" fill="#2a3037"/><circle cx="60" cy="38" r="5" fill="#1c2127"/></g>
<circle class="cam-led" cx="60" cy="54" r="1.4"/>
<path d="M49 68 V100 M53 68 V102 M67 68 V102 M71 68 V100" stroke="#fff" stroke-width=".5" opacity=".25"/>
${camWaves(74, 38)}${CAM_REC}`,
  // A wall camera, after the Arlo Essential and Pro: a white box with
  // rounded corners, seen three-quarters, its black glass front standing
  // upright with the lens at the top, on a white wall bracket whose stem
  // holds it from below by a ball joint.
  outdoor: () => `${camShadow(17, 92, 7, 16, .18)}
<rect x="9" y="74" width="15" height="36" rx="5" fill="url(#cam-g-shv)" ${CAM_EDGE} stroke-width=".6"/>
<rect x="11" y="76" width="2.6" height="32" rx="1.3" fill="#fff" opacity=".55"/>
<circle cx="16.5" cy="79.5" r="1.1" fill="rgba(0,0,0,.28)"/><circle cx="16.5" cy="104.5" r="1.1" fill="rgba(0,0,0,.28)"/>
<path d="M23 92 H52 Q58 92 58 86 V80" style="stroke:var(--ac-body-lo,#c9d0d7)" stroke-width="7.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M23 92 H52 Q58 92 58 86 V80" style="stroke:var(--ac-body,#eef1f4)" stroke-width="4.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25 90.6 H51" stroke="#fff" stroke-width="1.2" opacity=".7" stroke-linecap="round"/>
${camShadow(64, 78, 26, 3, .18)}
<path d="M66 18 L40 23 Q31 25 31 34 V62 Q31 71 40 72 L66 76 Z" fill="url(#cam-g-sh)" ${CAM_EDGE} stroke-width=".6"/>
<path d="M66 18 L40 23 Q31 25 31 34 V62 Q31 71 40 72 L66 76 Z" fill="#000" opacity=".07"/>
<path d="M40 23 L66 18" stroke="#fff" stroke-width="2" opacity=".75" stroke-linecap="round"/>
<path d="M35 32 V62" stroke="#fff" stroke-width="2.2" opacity=".5" stroke-linecap="round"/>
<path d="M40 72 L66 76" stroke="#000" stroke-width="1.2" opacity=".1"/>
<rect x="62" y="16" width="38" height="61" rx="13" fill="url(#cam-g-shv)" ${CAM_EDGE} stroke-width=".7"/>
<rect x="66.5" y="20.5" width="29" height="52" rx="10" fill="url(#cam-g-dbglass)"/>
<path d="M70 26 Q75 22.5 84 22.5" stroke="#fff" stroke-width="1.3" opacity=".22" fill="none" stroke-linecap="round"/>
<g class="cam-on">${camLens(81, 35, 6.2, 0)}<g class="cam-ir"><circle cx="72" cy="35" r="1"/><circle cx="90" cy="35" r="1"/></g></g>
<g class="cam-off"><circle cx="81" cy="35" r="7.6" fill="#2a3037"/><circle cx="81" cy="35" r="4.8" fill="#1c2127"/></g>
<rect x="74" y="50" width="14" height="3.2" rx="1.6" fill="#2c343d"/>
<circle class="cam-led" cx="81" cy="62" r="1.3"/>
<path d="M62.5 48 L60 76" stroke="#000" stroke-width=".6" opacity=".12"/>
<ellipse cx="58" cy="78.5" rx="5" ry="2.4" fill="#000" opacity=".12"/>
<circle cx="58" cy="79" r="4.6" fill="url(#cam-g-sph)" ${CAM_EDGE} stroke-width=".6"/>
${camWaves(96, 46)}${CAM_REC}`,
  // A ceiling dome: the ceiling drawn as a plane fading at its ends, the
  // white base, and the smoked glass with the camera ball behind it.
  dome: () => `<rect x="-8" y="-8" width="136" height="26" fill="url(#cam-g-ceil)"/>
<rect x="-8" y="18" width="136" height="3" fill="url(#cam-g-ceiledge)"/>
${camShadow(60, 21, 56, 3.5, .22)}
<g transform="translate(60 0) scale(1.3) translate(-60 0)">
<path d="M14 15 H106 Q106 27 95 34 H25 Q14 27 14 15 Z" fill="url(#cam-g-shv)" ${CAM_EDGE} stroke-width=".7"/>
<path d="M20 18 H100" stroke="#fff" stroke-width="1.4" opacity=".6" stroke-linecap="round"/>
<circle cx="27" cy="22" r="1.3" fill="rgba(0,0,0,.3)"/><circle cx="93" cy="22" r="1.3" fill="rgba(0,0,0,.3)"/>
<rect x="21" y="33" width="78" height="6" rx="2.5" style="fill:var(--ac-body-lo,#c9d0d7)"/>
<path d="M24 39 A36 37 0 0 0 96 39 Z" fill="#0d1115"/>
<g class="cam-on"><circle cx="66" cy="58" r="16" fill="#1a1f25"/><circle cx="66" cy="58" r="16" fill="url(#cam-g-glass)" opacity=".6"/>${camLens(67, 59, 6.8, 11)}</g>
<g class="cam-off"><path d="M33 48 Q60 70 87 48" fill="#2a3037"/><path d="M42 56 Q60 64 78 56" stroke="#3b434c" stroke-width="1.2" fill="none"/></g>
<path d="M24 39 A36 37 0 0 0 96 39 Z" fill="url(#cam-g-smoke)" opacity=".55"/>
<path d="M32 46 Q37 62 52 70" stroke="#fff" stroke-width="2.6" fill="none" opacity=".32" stroke-linecap="round"/>
<path d="M24 39 A36 37 0 0 0 96 39" fill="none" ${CAM_EDGE} stroke-width=".7"/>
<circle class="cam-led" cx="40" cy="50" r="1.3"/>
</g>${camWaves(86, 96)}<g transform="translate(0 92)">${CAM_REC}</g>`,
  // A video doorbell on its wall: the lens at the top, the motion sensor, and
  // the button in its ring of light, which beats when someone rings.
  doorbell: () => `${camShadow(62, 62, 22, 58, .14)}
<rect x="40" y="2" width="40" height="114" rx="17" fill="url(#cam-g-shv)" ${CAM_EDGE} stroke-width=".7"/>
<path d="M47 8 H73" stroke="#fff" stroke-width="2" opacity=".6" stroke-linecap="round"/>
<rect x="42" y="5" width="3" height="104" rx="1.5" fill="#fff" opacity=".45"/>
<rect x="44" y="12" width="32" height="56" rx="13" fill="url(#cam-g-dbglass)"/>
<g class="cam-on">${camLens(60, 28, 6.6, 10.4)}</g>
<g class="cam-off"><circle cx="60" cy="28" r="7.8" fill="#2a3037"/><circle cx="60" cy="28" r="5" fill="#1c2127"/></g>
<circle class="cam-led" cx="60" cy="42.5" r="1.2"/>
<circle cx="60" cy="54" r="5" fill="url(#cam-g-pir)"/><path d="M56 54 H64 M57 51.5 H63 M57 56.5 H63" stroke="#000" stroke-width=".4" opacity=".4"/>
<path d="M49 18 Q55 14 64 14" stroke="#fff" stroke-width="1.2" opacity=".2" fill="none" stroke-linecap="round"/>
<path d="M53 74 H67 M54.5 77 H65.5" stroke="rgba(0,0,0,.35)" stroke-width="1.1" stroke-linecap="round"/>
<circle class="cam-dbhalo" cx="60" cy="96" r="12"/>
<circle cx="60" cy="96" r="13" fill="#1b2026"/>
<circle class="cam-dbring" cx="60" cy="96" r="11.6"/>
<circle cx="60" cy="96" r="9.6" fill="url(#cam-g-sh)" ${CAM_EDGE} stroke-width=".5"/>
<path d="M60 91.4 q-3.4 0 -3.4 3.6 v2.2 l-1.2 1.6 h9.2 l-1.2 -1.6 v-2.2 q0 -3.6 -3.4 -3.6 Z M58.8 99.6 a1.2 1.2 0 0 0 2.4 0" fill="#7b8590"/>
<g class="cam-bell"><path d="M84 88 Q89 96 84 104" style="--dx:4px"/><path d="M90 84 Q97 96 90 108" style="--dx:5px"/><path d="M36 88 Q31 96 36 104" style="--dx:-4px"/><path d="M30 84 Q23 96 30 108" style="--dx:-5px"/></g>
${camWaves(80, 40)}${CAM_REC}`,
};
function cameraHtml(cls, c) {
  const layout = CAMERA_LAYOUTS.includes(c.layout) ? c.layout : "indoor";
  const flags = ["cam", `cam-l-${layout}`, `cam-m-${c.mode || "unav"}`, c.night ? "cam-night" : "", c.dark ? "cam-dark" : ""].filter(Boolean).join(" ");
  return `
        <div class="machine ${cls} ${flags}"><svg class="cam-svg" viewBox="0 -8 120 135">${CAM_DEFS}${CAMERA_SVGS[layout]()}</svg></div>`;
}

// A mailbox, read from a mail indicator or a counter, and from the contacts on
// its doors: empty, with mail in it, or one of its doors open. Up to twelve
// letters are drawn in the pile.
const MAILBOX_ONLY_FIELDS = ["mailbox_layout", "mailbox_front", "mail_count_entity", "mail_present_entity", "front_door_entity", "back_door_entity", "mailbox_color"];
const MAILBOX_LAYOUTS = ["through", "through_3d", "classic"];
const MAILBOX_SIDES = ["left", "right"];
const MAILBOX_MAX_LETTERS = 12;
const MAILBOX_LABELS = { empty: "mb_empty", mail: "mb_mail", front: "mb_front_open", back: "mb_back_open", unav: "ev_offline" };
const MAILBOX_COLORS = { empty: "var(--secondary-text-color, #727272)", mail: "#ffa000", front: "#03a9f4", back: "#03a9f4",
  unav: "var(--disabled-text-color, #9e9e9e)" };
const MAILBOX_ON = ["on", "true", "1", "yes", "open", "opened", "detected", "mail", "full"];
// How long a letter takes to arrive, and a door to swing open.
const MAILBOX_ARRIVE_MS = 2200;
const MAILBOX_SWING_MS = 700;
const MAILBOX_NAME_RE = /mail.?box|letter.?box|boite.?aux.?lettres|(^|[\s._])bal([\s._]|$)|briefkasten|buzon|brievenbus|postkasse|brevlada|skrzynka|cassetta.?postale|caixa.?de.?correio|schranka/;
function mailboxOpen(hass, id) {
  const st = id ? stateObj(hass, id) : null;
  return !!st && MAILBOX_ON.includes(String(st.state).toLowerCase());
}
function mailboxReadOf(hass, cfg, st) {
  const raw = st ? String(st.state).trim().toLowerCase() : "";
  if (!st || ["unavailable", "unknown", "none", ""].includes(raw)) return { mode: "unav", count: null, present: false, front: false, back: false };
  const own = numberOrNull(st.state);
  const counted = cfg.mail_count_entity ? numericState(hass, cfg.mail_count_entity) : own;
  const count = counted === null ? null : Math.max(0, Math.round(counted));
  // An entity saying whether mail is inside (HACF): on when it arrives, off
  // once collected, whatever a counter of the day still says.
  const flag = cfg.mail_present_entity ? stateObj(hass, cfg.mail_present_entity) : null;
  const flagged = flag && !HA_OFFLINE_STATES.includes(String(flag.state).toLowerCase());
  const present = flagged ? MAILBOX_ON.includes(String(flag.state).trim().toLowerCase())
    : (count !== null && count > 0) || MAILBOX_ON.includes(raw) || (own !== null && own > 0);
  const front = mailboxOpen(hass, cfg.front_door_entity);
  const back = mailboxOpen(hass, cfg.back_door_entity);
  const mode = back ? "back" : front ? "front" : present ? "mail" : "empty";
  return { mode, count, present, front, back };
}
// Seen from the side through its wall when it has a door on each face, from
// the front otherwise.
function mailboxLayoutOf(cfg) {
  if (MAILBOX_LAYOUTS.includes(cfg.mailbox_layout)) return cfg.mailbox_layout;
  return cfg.back_door_entity ? "through" : "classic";
}

const MB_DEFS = `<defs>
<linearGradient id="mb-g-shv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--ac-body-hi,#fff)"/><stop offset="1" style="stop-color:var(--ac-body-lo,#c9d0d7)"/></linearGradient>
<linearGradient id="mb-g-sh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--ac-body-hi,#fff)"/><stop offset=".55" style="stop-color:var(--ac-body,#eef1f4)"/><stop offset="1" style="stop-color:var(--ac-body-lo,#c9d0d7)"/></linearGradient>
<linearGradient id="mb-g-stone" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a89f92"/><stop offset=".5" stop-color="#cbc3b6"/><stop offset="1" stop-color="#9c9386"/></linearGradient>
<linearGradient id="mb-g-in" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4249"/><stop offset="1" stop-color="#5b646d"/></linearGradient>
<linearGradient id="mb-g-day" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#fff6d6"/><stop offset="1" stop-color="#fff6d6" stop-opacity="0"/></linearGradient>
<linearGradient id="mb-g-dayl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff6d6"/><stop offset="1" stop-color="#fff6d6" stop-opacity="0"/></linearGradient>
<linearGradient id="mb-g-dayt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6d6"/><stop offset="1" stop-color="#fff6d6" stop-opacity="0"/></linearGradient>
<clipPath id="mb-clip-slot"><rect x="0" y="-8" width="120" height="40"/></clipPath>
</defs>`;
const MB_EDGE = 'stroke="rgba(0,0,0,.28)"';
const MB_BODY = "url(#mb-g-shv)";
const MB_ROT = [-3, 2, -1, 4, -2, 1, 3, -4, 2, -1, 0, 3];
const MB_JIT = [0, 2, -1, 1, -2, 0, 2, 1, -1, 0, -2, 1];
const mbEnvelope = (x, y, r, w = 22, h = 9) => `<g transform="rotate(${r} ${x + w / 2} ${y + h / 2})"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1" fill="#fff" stroke="#c7ccd2" stroke-width=".5"/><path d="M${x} ${y} L${x + w / 2} ${y + h * 0.55} L${x + w} ${y}" fill="none" stroke="#c7ccd2" stroke-width=".6"/></g>`;
// The pile, three letters a layer. The one just received starts at the slot
// (sx, sy) and travels to its place.
function mbLetters(n, x0, step, floor, newIdx, sx, sy) {
  let out = "";
  for (let i = 0; i < Math.min(n, MAILBOX_MAX_LETTERS); i++) {
    const x = x0 + (i % 3) * step + MB_JIT[i], y = floor - 10 - Math.floor(i / 3) * 6.5 + (i % 2);
    out += `<g class="mb-letter${i + 1 === newIdx ? " mb-new" : ""}" style="--dx:${sx - x}px;--dy:${sy - y}px">${mbEnvelope(x, y, MB_ROT[i])}</g>`;
  }
  return out;
}
const mbBadge = (n) => {
  const txt = n === null || n === undefined ? "" : String(n);
  const w = txt ? (txt.length > 1 ? 30 : 25) : 17;
  return `<g class="mb-badge"><rect x="4" y="6" width="${w}" height="12" rx="6" fill="#ffa000"/><rect x="8" y="9" width="9" height="6" rx="1" fill="#fff"/><path d="M8 9 l4.5 3 l4.5 -3" fill="none" stroke="#ffa000" stroke-width=".9"/>${txt ? `<text x="19.5" y="15.4" font-size="8" font-family="Arial, sans-serif" font-weight="700" fill="#fff">${txt}</text>` : ""}</g>`;
};
// More than twelve: some no longer fit, and end up on the ground.
const mbSpill = (spots) => `<g>${spots.map(([x, y, r]) => `<g class="mb-spill">${mbEnvelope(x, y, r)}</g>`).join("")}</g>`;
// A through-wall mailbox in three-quarter view (HACF), in the colours they
// come in.
// A through-wall mailbox seen in three-quarter view, after the Decayeux
// boxes: the street door in front with its letter flap, its lock and its
// name plate, the box running back to the house door at the rear.
// Front face 18..54 x 44..102, depth vector (32, -14).
const MB3_PAL = {
  anthracite: ["#5b6168", "#474c52", "#383c41", "#2e3236"],
  white: ["#ffffff", "#eef0f1", "#d6dadd", "#c3c8cc"],
  grey: ["#c9cdd1", "#aeb3b8", "#959ba1", "#80868c"],
  green: ["#3f6b4d", "#335a40", "#284a34", "#1f3c2a"],
  brown: ["#6d5546", "#5b4639", "#4a392e", "#3d2f26"],
};
function mbThrough3d(c) {
  const id = (n) => `mb3-${n}`;
  const P = MB3_PAL[c.color] || MB3_PAL.anthracite;
  const [hi, face, side, edge] = P;
  const light = c.color === "white" || c.color === "grey";
  const ink = light ? "rgba(0,0,0,.35)" : "rgba(0,0,0,.55)";
  const sheen = light ? ".7" : ".22";
  const dx = 30, dy = -13;
  const F = { x0: 14, x1: 62, y0: 48, y1: 100 };
  const pt = (u, v, w) => [F.x0 + u + dx * w, F.y0 + v + dy * w]; // u across, v down, w depth 0..1
  const pp = (...ps) => ps.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L");
  const W = F.x1 - F.x0, H = F.y1 - F.y0;
  // Letters on the floor, three a row, stacked when there are many.
  // The letters lie flat on the floor, in two piles near the door, each
  // envelope seen in the same perspective as the box, the pile rising.
  const env = (u, w, lift, r) => {
    const k = .34, ew = 17;
    const [x, y] = pt(u, H - lift, w);
    const a = [x, y], b = [x + ew, y], cc = [x + ew + dx * k, y + dy * k], d = [x + dx * k, y + dy * k];
    const m = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
    const tip = m(m(a, b, .5), m(d, cc, .5), .55);
    return `<g class="mb-letter" transform="rotate(${r} ${x + ew / 2} ${y - 2})"><path d="M${pp(a, b, cc, d)} Z" fill="#fff" stroke="#b9c0c6" stroke-width=".35"/><path d="M${pp(d, tip, cc)}" fill="none" stroke="#c7ccd2" stroke-width=".4"/><path d="M${pp(a, b)}" stroke="#d5dade" stroke-width=".9"/></g>`;
  };
  const letters = Array.from({ length: Math.min(12, c.drawn || 0) }, (_, i) => {
    const pile = i % 2, layer = Math.floor(i / 2);
    return env(4 + pile * 22 + [0, 1, -1, 2, -2, 1][layer], .1 + pile * .08, 1.2 + layer * 1.5, [-4, 5, 3, -6, -2, 4, 6, -3, 2, -5, -1, 3][i]);
  }).join("");
  // The street door's face: the flap under its lip, the lock, the plate.
  const doorFace = (tr) => `<g transform="${tr}">
<rect x="0" y="0" width="${W}" height="${H}" rx="1.4" fill="url(#${id("fd")})" stroke="${ink}" stroke-width=".5"/>
<path d="M1.2 1.2 H${W - 1.2}" stroke="#fff" stroke-opacity="${sheen}" stroke-width=".7"/>
<rect x="${W * .2}" y="${H * .08}" width="${W * .68}" height="${H * .19}" rx="1" fill="url(#${id("fl")})" stroke="${ink}" stroke-width=".45"/>
<path d="M${W * .21} ${H * .265} H${W * .48} Q${W * .54} ${H * .23} ${W * .6} ${H * .265} H${W * .87}" fill="none" stroke="${ink}" stroke-width=".55"/>
<path d="M${W * .21} ${H * .095} H${W * .87}" stroke="#fff" stroke-opacity="${sheen}" stroke-width=".7"/>
<circle cx="${W * .1}" cy="${H * .175}" r="2" fill="url(#${id("lk")})" stroke="#6d757d" stroke-width=".35"/><rect x="${W * .1 - .35}" y="${H * .175 - 1.1}" width=".7" height="2.2" rx=".3" fill="#4a5158"/>
<rect x="${W * .55}" y="${H * .46}" width="${W * .3}" height="${H * .09}" rx=".4" fill="#f4f6f7" stroke="#aeb5bb" stroke-width=".35"/><path d="M${W * .58} ${H * .49} H${W * .82} M${W * .58} ${H * .52} H${W * .74}" stroke="#c7ccd2" stroke-width=".4"/>
<ellipse cx="${W * .5}" cy="${H - 5}" rx="2" ry="1.1" fill="none" stroke="${ink}" stroke-width=".35"/>
</g>`;
  // The front opening's inside: the left wall, the floor, the back wall.
  const inside = `<g clip-path="url(#${id("op")})">
<rect x="${F.x0}" y="${F.y0}" width="${W}" height="${H}" fill="#1b1f23"/>
<path d="M${pp(pt(0, 0, 1), pt(W, 0, 1), pt(W, H, 1), pt(0, H, 1))} Z" fill="${c.back ? "url(#" + id("day") + ")" : "#30363c"}"/>
<path d="M${pp(pt(0, 0, 0), pt(0, 0, 1), pt(0, H, 1), pt(0, H, 0))} Z" fill="url(#${id("iw")})"/>
<path d="M${pp(pt(0, H, 0), pt(W, H, 0), pt(W, H, 1), pt(0, H, 1))} Z" fill="url(#${id("if")})"/>
<path d="M${pp(pt(0, 0, 1), pt(0, H, 1), pt(W, H, 1))}" fill="none" stroke="#000" stroke-opacity=".35" stroke-width=".5"/>
${letters}
<path d="M${pp(pt(0, 0, 0), pt(W, 0, 0), pt(W, H, 0))}" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="1.6"/></g>`;
  // The street door, shut or open on its left hinge.
  const th = 55 * Math.PI / 180, du = [dx, dy].map((v) => v / Math.hypot(dx, dy));
  const ex = W * (Math.cos(th) - du[0] * Math.sin(th)), ey = -W * du[1] * Math.sin(th);
  const frontDoor = c.front
    ? `<g class="mb-swing hl">${doorFace(`matrix(${(ex / W).toFixed(3)} ${(ey / W).toFixed(3)} 0 1 ${F.x0} ${F.y0})`)}</g>`
    : doorFace(`translate(${F.x0} ${F.y0})`);
  // The house door at the back, opening outwards to the right.
  const th2 = 65 * Math.PI / 180;
  const bx = F.x1 + dx, by = F.y0 + dy;
  const rx = -W * Math.cos(th2) + W * du[0] * Math.sin(th2), ry = W * du[1] * Math.sin(th2);
  const backDoor = c.back
    ? `<g class="mb-swing hr"><path d="M${bx} ${by} L${(bx + rx).toFixed(1)} ${(by + ry).toFixed(1)} L${(bx + rx).toFixed(1)} ${(by + ry + H).toFixed(1)} L${bx} ${by + H} Z" fill="url(#${id("bd")})" stroke="${ink}" stroke-width=".5"/>
<circle cx="${(bx + rx * .82).toFixed(1)}" cy="${(by + ry * .82 + H * .4).toFixed(1)}" r="1.6" fill="url(#${id("lk")})" stroke="#6d757d" stroke-width=".35"/></g>`
    : `<path d="M${bx - .2} ${by + 3} V${by + H - 3}" stroke="${ink}" stroke-width=".6"/><circle cx="${bx - 1.6}" cy="${by + H * .42}" r="1.1" fill="url(#${id("lk")})"/>`;
  const jam = c.over ? `<g transform="translate(${F.x0 + W * .42} ${F.y0 + H * .33}) rotate(-7)"><rect x="0" y="-6" width="12" height="7.5" rx=".6" fill="#fff" stroke="#c7ccd2" stroke-width=".4"/><path d="M0 -6 L6 -2.2 L12 -6" fill="none" stroke="#c7ccd2" stroke-width=".45"/></g>` : "";
  return `<defs>
<linearGradient id="${id("fd")}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${hi}"/><stop offset=".55" stop-color="${face}"/><stop offset="1" stop-color="${side}"/></linearGradient>
<linearGradient id="${id("fl")}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hi}"/><stop offset="1" stop-color="${face}"/></linearGradient>
<linearGradient id="${id("sd")}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${side}"/><stop offset="1" stop-color="${edge}"/></linearGradient>
<linearGradient id="${id("tp")}" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="${hi}"/><stop offset="1" stop-color="${face}"/></linearGradient>
<linearGradient id="${id("bd")}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${side}"/><stop offset="1" stop-color="${hi}"/></linearGradient>
<radialGradient id="${id("lk")}" cx=".35" cy=".35"><stop offset="0" stop-color="#f4f6f8"/><stop offset="1" stop-color="#8f979e"/></radialGradient>
<linearGradient id="${id("day")}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6d6"/><stop offset="1" stop-color="#e6dcb8"/></linearGradient>
<linearGradient id="${id("iw")}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a636c"/><stop offset="1" stop-color="#2c3238"/></linearGradient>
<linearGradient id="${id("if")}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#6c757e"/><stop offset="1" stop-color="#3b4249"/></linearGradient>
<clipPath id="${id("op")}"><rect x="${F.x0}" y="${F.y0}" width="${W}" height="${H}"/></clipPath>
<clipPath id="${id("sl")}"><rect x="0" y="-10" width="120" height="${F.y0 + 10 + H * .08}"/></clipPath>
</defs>
<ellipse cx="${F.x0 + W / 2 + dx / 2}" cy="${F.y1 + 3 + dy / 2}" rx="${W / 2 + 20}" ry="5" fill="#000" opacity=".14"/>
<path d="M${pp(pt(W, 0, 0), pt(W, 0, 1), pt(W, H, 1), pt(W, H, 0))} Z" fill="url(#${id("sd")})" stroke="${ink}" stroke-width=".5"/>
<path d="M${pp(pt(0, 0, 0), pt(0, 0, 1), pt(W, 0, 1), pt(W, 0, 0))} Z" fill="url(#${id("tp")})" stroke="${ink}" stroke-width=".5"/>
<path d="M${pp(pt(W - .8, 1, 0), pt(W - .8, 1, 1))}" stroke="#fff" stroke-opacity="${sheen}" stroke-width=".5"/>
<path d="M${pp(pt(.8, .5, .03), pt(W - 1, .5, .03), pt(W - 1, .5, .97))}" fill="none" stroke="#fff" stroke-opacity="${sheen}" stroke-width=".5"/>
${backDoor}
${c.front ? inside : ""}
${c.front ? `<rect x="${F.x0 + .4}" y="${F.y0 + .4}" width="${W - .8}" height="${H - .8}" fill="none" stroke="${side}" stroke-width=".9"/>` : ""}
${frontDoor}
<g clip-path="url(#${id("sl")})"><g class="mb-post"><g transform="translate(${F.x0 + W * .4} ${F.y0 - 6})"><rect x="0" y="0" width="14" height="10" rx=".6" fill="#fff" stroke="#c7ccd2" stroke-width=".4"/><path d="M0 0 L7 5 L14 0" fill="none" stroke="#c7ccd2" stroke-width=".45"/></g></g></g>
${jam}
<text x="${F.x0 + W / 2}" y="118" font-size="7" font-family="Arial, sans-serif" text-anchor="middle" class="mb-lbl">${esc(c.street || "")}</text>
<text x="${F.x1 + dx - 2}" y="${F.y1 + dy + 14}" font-size="7" font-family="Arial, sans-serif" text-anchor="middle" class="mb-lbl">${esc(c.house || "")}</text>`;
}
const MAILBOX_COLORS_3D = Object.keys(MB3_PAL);
const MB_SVGS = {
  // Drawn a size up: the box alone leaves room around it.
  through_3d: (c) => `<g transform="translate(-3 -10) scale(1.1)">${mbThrough3d(c)}</g>`,
  // Through a pillar, seen from the side: the street door on the left, the
  // house door on the right. A door hinged on a vertical edge shows its face
  // as it opens.
  through: (c) => {
    const front = c.front
      ? `<g class="mb-swing hl"><path d="M24 34 L7 38.5 V77.5 L24 82 Z" fill="url(#mb-g-sh)" ${MB_EDGE} stroke-width=".6"/><path d="M10 43 V73" stroke="#fff" stroke-width="1.1" opacity=".5"/><path d="M21.4 40.2 L8.6 43.6 V47.6 L21.4 44.2 Z" style="fill:var(--ac-body-lo,#c9d0d7)" ${MB_EDGE} stroke-width=".4"/><path d="M20.6 41.1 L9.4 44.1 V46.5 L20.6 43.5 Z" fill="#151a20"/><path d="M20.6 41.1 L9.4 44.1 V45.6 L20.6 42.6 Z" fill="url(#mb-g-sh)" ${MB_EDGE} stroke-width=".3"/><path d="M20.2 41.5 L9.8 44.3" stroke="#fff" stroke-width=".4" opacity=".6"/><circle cx="10.6" cy="61" r="1.3" fill="#7b8590"/><rect x="10.25" y="61" width=".7" height="2.2" fill="#7b8590"/></g>`
      : `<rect x="22" y="34" width="5" height="48" rx="1" fill="${MB_BODY}" ${MB_EDGE} stroke-width=".6"/><rect x="20.4" y="44" width="1.8" height="10" rx=".9" fill="#7b8590"/><path d="M22 36.4 L16.6 37.8 V40 H22 Z" fill="${MB_BODY}" ${MB_EDGE} stroke-width=".5"/><rect x="16.6" y="40" width="5.4" height="1.2" fill="#151a20"/>`;
    const back = c.back
      ? `<g class="mb-swing hr"><path d="M96 34 L113 38.5 V77.5 L96 82 Z" fill="url(#mb-g-sh)" ${MB_EDGE} stroke-width=".6"/><circle cx="109" cy="58" r="1.5" fill="#7b8590"/><rect x="108.6" y="58" width=".8" height="2.4" fill="#7b8590"/></g>`
      : `<rect x="93" y="34" width="5" height="48" rx="1" fill="${MB_BODY}" ${MB_EDGE} stroke-width=".6"/><circle cx="99" cy="58" r="1.6" fill="#7b8590"/><rect x="98.6" y="58" width=".8" height="2.6" fill="#7b8590"/>`;
    const box = `<ellipse cx="60" cy="124" rx="44" ry="3" fill="#000" opacity=".12"/>
<rect x="46" y="-8" width="28" height="134" fill="url(#mb-g-stone)"/>
<path d="M46 6 H74 M46 22 H74 M46 96 H74 M46 112 H74 M60 -8 V6 M54 6 V22 M66 22 V34 M58 82 V96 M64 96 V112 M56 112 V126" stroke="#8d8477" stroke-width=".6" opacity=".7"/>
<rect x="26" y="34" width="68" height="48" rx="2" fill="url(#mb-g-in)"/>
<rect class="mb-light" x="60" y="36" width="33" height="44" fill="url(#mb-g-day)"/>
<rect class="mb-light-f" x="27" y="36" width="33" height="44" fill="url(#mb-g-dayl)"/>
<rect x="46" y="34" width="28" height="48" fill="#000" opacity=".18"/>
${mbLetters(c.drawn, 28, 21, 81, c.newIdx, -6, 36)}
<rect x="24" y="30" width="72" height="5" rx="1.5" fill="${MB_BODY}" ${MB_EDGE} stroke-width=".6"/>
<rect x="24" y="81" width="72" height="4" rx="1" style="fill:var(--ac-body-lo,#c9d0d7)" ${MB_EDGE} stroke-width=".5"/>
${front}${back}
${c.over ? `<g class="mb-jam">${mbEnvelope(6, 33, -12, 20, 8)}</g>${mbSpill([[2, 113, -8], [16, 116, 6], [30, 112, -3]])}` : ""}`;
    const right = c.side === "right";
    const lbl = (x, text) => `<text x="${x}" y="100" font-size="7" font-family="Arial, sans-serif" class="mb-lbl" text-anchor="middle">${esc(text || "")}</text>`;
    return `${right ? `<g transform="translate(120 0) scale(-1 1)">${box}</g>` : box}
${lbl(34, right ? c.house : c.street)}${lbl(86, right ? c.street : c.house)}`;
  },
  // A box on a post, seen from the front: a slot under a visor, a window, a
  // name plate and a lock on its door.
  classic: (c) => {
    const door = c.front
      ? `<g class="mb-swing hl"><path d="M30 40 L12 45 V89 L30 94 Z" fill="${MB_BODY}" ${MB_EDGE} stroke-width=".6"/><path d="M15 50 V84" stroke="#fff" stroke-width="1.2" opacity=".5"/></g>`
      : `<rect x="30" y="40" width="60" height="54" rx="3" fill="url(#mb-g-sh)" ${MB_EDGE} stroke-width=".6"/>
<rect x="40" y="46" width="40" height="10" rx="2" fill="#151a20"/>
<g class="mb-glass">${c.drawn > 0 ? '<rect x="43" y="50" width="16" height="6" fill="#fff"/>' : ""}${c.drawn > 4 ? '<rect x="57" y="49" width="18" height="7" fill="#f4f1e8"/>' : ""}${c.drawn > 8 ? '<rect x="50" y="47" width="14" height="9" fill="#fff" transform="rotate(-6 57 51)"/>' : ""}</g>
<path d="M41 47.5 H58" stroke="#fff" stroke-width=".8" opacity=".3"/>
<rect x="44" y="62" width="32" height="8" rx="1" fill="#c8a24e"/><path d="M48 66 H72" stroke="#8a6d2a" stroke-width=".8"/>
<circle cx="82" cy="80" r="2.2" fill="#7b8590"/><rect x="81.4" y="80" width="1.2" height="3.4" fill="#7b8590"/>`;
    return `<ellipse cx="60" cy="124" rx="22" ry="2.6" fill="#000" opacity=".14"/>
<rect x="55" y="98" width="10" height="27" fill="#8f979f"/><rect x="55" y="98" width="3" height="27" fill="#fff" opacity=".25"/>
<rect x="24" y="18" width="72" height="82" rx="5" fill="${MB_BODY}" ${MB_EDGE} stroke-width=".7"/>
<rect x="30" y="40" width="60" height="54" rx="3" fill="url(#mb-g-in)"/>
${mbLetters(c.drawn, 31, 19, 94, 0, 0, 0)}
<rect class="mb-light-f" x="30" y="40" width="60" height="36" fill="url(#mb-g-dayt)"/>
${door}
<rect x="20" y="12" width="80" height="9" rx="3" fill="${MB_BODY}" ${MB_EDGE} stroke-width=".7"/><path d="M24 14 H96" stroke="#fff" stroke-width="1.4" opacity=".7"/>
<rect x="36" y="29.6" width="48" height="3.4" rx="1" fill="#151a20"/>
<g clip-path="url(#mb-clip-slot)"><g class="mb-post"><rect x="47" y="21" width="26" height="10" rx="1" fill="#fff" stroke="#c7ccd2" stroke-width=".5"/><path d="M47 21 L60 27 L73 21" fill="none" stroke="#c7ccd2" stroke-width=".6"/></g></g>
<path d="M34 30 L36.4 24.6 H83.6 L86 30 Z" fill="url(#mb-g-sh)" ${MB_EDGE} stroke-width=".5"/><path d="M37 25.6 H83" stroke="#fff" stroke-width=".8" opacity=".6"/>
${c.over ? `<g class="mb-jam">${mbEnvelope(40, 18, -14, 18, 10)}${mbEnvelope(54, 16, 4, 18, 11)}${mbEnvelope(66, 19, 16, 17, 9)}</g>${mbSpill([[22, 114, -6], [72, 116, 8], [86, 112, -4]])}` : ""}`;
  },
};
function mailboxHtml(cls, c) {
  const layout = MAILBOX_LAYOUTS.includes(c.layout) ? c.layout : "classic";
  const flags = ["mb", `mb-l-${layout}`, `mb-m-${c.mode || "unav"}`, c.present ? "mb-mail" : "", c.front ? "mb-front" : "", c.back ? "mb-back" : "",
    c.arrive !== null && c.arrive !== undefined ? "mb-arrive" : "", c.swingF ? "mb-swing-f" : "", c.swingB ? "mb-swing-b" : ""].filter(Boolean).join(" ");
  // A redraw while a letter is on its way resumes it where it was.
  const ago = c.arrive ? `--mb-ago:${(-c.arrive / 1000).toFixed(2)}s` : "";
  return `
        <div class="machine ${cls} ${flags}" style="${ago}"><svg class="mb-svg" viewBox="0 -8 120 135">${MB_DEFS}${MB_SVGS[layout](c)}${c.present ? mbBadge(c.count) : ""}</svg></div>`;
}

// A lamp, read from its light entity: on or off, how bright, in what colour,
// and whether an effect runs. A switch or a helper only says on or off, and
// the lamp is drawn in the warm white of a bulb.
const LAMP_ONLY_FIELDS = ["lamp_layout", "spots", "timer_entity"];
const LAMP_LAYOUTS = ["bulb", "bedside", "floor", "torch", "pendant", "strip", "spot", "panels", "desk", "wall", "garden_spot", "bollard", "string", "curtain", "icicle", "festoon", "squares"];
const LAMP_SPOTS = [1, 2, 3, 4];
const LAMP_LABELS = { on: "lamp_on", off: "lamp_off", unav: "ev_offline" };
const LAMP_COLORS = { on: "#ffa000", off: "var(--disabled-text-color, #9e9e9e)", unav: "var(--disabled-text-color, #9e9e9e)" };
const LAMP_WARM = [255, 197, 107];
// WLED calls the absence of an effect "Solid", other integrations "None".
const LAMP_NO_EFFECT = ["", "none", "off", "solid", "null", "normal"];
// Kelvin to RGB, Tanner Helland's fit of the black body: close enough for a
// drawing, and it gives the 2700 K of a bulb the amber it has.
function kelvinRgb(k) {
  const t = Math.min(40000, Math.max(1000, k)) / 100;
  const r = t <= 66 ? 255 : 329.698727446 * Math.pow(t - 60, -0.1332047592);
  const g = t <= 66 ? 99.4708025861 * Math.log(t) - 161.1195681661 : 288.1221695283 * Math.pow(t - 60, -0.0755148492);
  const b = t >= 66 ? 255 : t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  return [r, g, b].map((v) => Math.round(Math.min(255, Math.max(0, v))));
}
function hsRgb(h, s) {
  const f = (n) => {
    const k = (n + h / 60) % 6;
    return Math.round(255 * (1 - (s / 100) * Math.max(0, Math.min(k, 4 - k, 1))));
  };
  return [f(5), f(3), f(1)];
}
function lampReadOf(hass, cfg, st) {
  const raw = st ? String(st.state).trim().toLowerCase() : "";
  const a = (st && st.attributes) || {};
  let mode;
  if (!st || ["unavailable", "unknown", "none", ""].includes(raw)) mode = "unav";
  else mode = ["on", "true", "1", "home", "open"].includes(raw) ? "on" : "off";
  const on = mode === "on";
  const bri = numberOrNull(a.brightness);
  const pct = on && bri !== null ? Math.max(1, Math.round(bri / 2.55)) : null;
  const kelvin = on && a.color_mode === "color_temp" ? numberOrNull(a.color_temp_kelvin) : null;
  let rgb = null;
  if (Array.isArray(a.rgb_color) && a.rgb_color.length === 3 && a.rgb_color.every((v) => isFinite(Number(v)))) rgb = a.rgb_color.map(Number);
  else if (kelvin) rgb = kelvinRgb(kelvin);
  else if (Array.isArray(a.hs_color) && a.hs_color.length === 2) rgb = hsRgb(Number(a.hs_color[0]) || 0, Number(a.hs_color[1]) || 0);
  else if (numberOrNull(a.color_temp_kelvin)) rgb = kelvinRgb(numberOrNull(a.color_temp_kelvin));
  const effect = on && typeof a.effect === "string" && !LAMP_NO_EFFECT.includes(a.effect.trim().toLowerCase()) ? a.effect : null;
  return { mode, pct, kelvin, effect, rgb: rgb || LAMP_WARM };
}
// The shape: picked, or read from the name and the model. A light strip, a
// set of panels, a bedside or a desk lamp, a garden spotlight or a small
// garden post, a pendant, recessed spots, a lamp on a wall outside; a plain
// bulb otherwise.
function lampLayoutOf(cfg, st) {
  if (LAMP_LAYOUTS.includes(cfg.lamp_layout)) return cfg.lamp_layout;
  const a = (st && st.attributes) || {};
  const hay = stripAccents(`${cfg.state_entity || ""} ${cfg.name || ""} ${a.friendly_name || ""} ${a.model || ""}`).toLowerCase();
  if (/strip|ruban|bandeau|streifen|(^|[^a-z])tira|striscia|wled|govee|neon|gradient/.test(hay)) return "strip";
  if (/nanoleaf|panel|panneau|shapes|canvas|hexagon|triangle/.test(hay)) return "panels";
  if (/chevet|bedside|night.?stand|nachttisch|mesita|comodino|nachtkastje/.test(hay)) return "bedside";
  if (/desk|bureau|schreibtisch|escritorio|scrivania/.test(hay)) return "desk";
  // String lights (Twinkly and the like), then the garden.
  if (/curtain|rideau|vorhang|cortina|tenda.?lumin|gordijn|gardin|kurtyna|zaves/.test(hay)) return "curtain";
  if (/icicle|stalactit|eisregen|caramban|stalattit|ijspegel|istapp|istap|sopl|rampouch/.test(hay)) return "icicle";
  if (/festoon|guinguette|bulb.?string|partylicht|prikkabel|partyslinga/.test(hay)) return "festoon";
  if (/twinkly.{0,12}(square|matri)|pixel.?(square|panel|matri)|(^|[^a-z])matri(x|ce)/.test(hay)) return "squares";
  if (/twinkly|guirlande|fairy|string.?light|lichterkette|guirnalda|ghirlanda|lichtsnoer|ljusslinga|lysslynge|lyskaede|girlanda|lampki/.test(hay)) return "string";
  // In the garden: a spotlight on its spike, or a small post along a path.
  if (/garden.?spot|spike|piquet|spiess|erdspie|(spot|projecteur|projector|strahler|foco|faretto).{0,14}(jardin|garden|exterieur|outdoor|garten|giardino|tuin)/.test(hay)) return "garden_spot";
  if (/bollard|borne|potelet|path.?light|pollerleuchte|wegeleuchte|baliza|paletto|tuinpaal|lampadaire.{0,6}(de.?)?jardin|(petit|mini).?lampadaire|garden.?(post|lamp)/.test(hay)) return "bollard";
  if (/halogen|torch|uplight|deckenfluter/.test(hay)) return "torch";
  if (/lampadaire|floor|stehlampe|piantana|vloerlamp|(^|[^a-z])arc([^a-z]|$)/.test(hay)) return "floor";
  if (/(^|[^a-z])spots?([^a-z]|$)|gu10|downlight|einbau|faretti|encastr/.test(hay)) return "spot";
  if (/suspension|pendant|pendel|hanging|lustre|chandelier|colgante|sospensione|hanglamp/.test(hay)) return "pendant";
  if (/applique|lantern|wandleuchte|aplique|outdoor|exterieur|garden|jardin|terrasse|porch|facade|(^|[^a-z])wall([^a-z]|$)/.test(hay)) return "wall";
  return "bulb";
}
// Recessed spots: as many as picked, or as the group has lights, up to four.
function lampSpotsOf(cfg, st) {
  const n = parseInt(cfg.spots, 10);
  if (LAMP_SPOTS.includes(n)) return n;
  const members = st && Array.isArray(st.attributes.entity_id) ? st.attributes.entity_id.length : 0;
  return Math.min(4, Math.max(1, members));
}

// The lamp, drawn in the light's colour: its halo, the cone it throws, and
// segments that change hue when an effect runs.
const lpHalo = (id) => `<radialGradient id="lp-${id}" cx=".5" cy=".5" r=".5"><stop offset="0" class="lp-stop"/><stop offset="1" class="lp-stop" stop-opacity="0"/></radialGradient>`;
const lpBeam = (id) => `<linearGradient id="lp-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="lp-stop" stop-opacity=".95"/><stop offset="1" class="lp-stop" stop-opacity="0"/></linearGradient>`;
const lpMetal = (id, a = "#6f7882", b = "#e8ecf0") => `<linearGradient id="lp-${id}" x1="0" x2="1"><stop offset="0" stop-color="${a}"/><stop offset=".45" stop-color="${b}"/><stop offset="1" stop-color="${a}"/></linearGradient>`;
const LAMP_SVGS = {
  bulb: () => `<defs>${lpHalo("bH")}
<radialGradient id="lp-bG" cx=".42" cy=".38" r=".62"><stop offset="0" stop-color="#fff"/><stop offset=".45" class="lp-stop"/><stop offset="1" class="lp-stop" stop-opacity=".75"/></radialGradient>${lpMetal("bM")}</defs>
<circle class="lp-halo" cx="48" cy="38" r="44" fill="url(#lp-bH)"/>
<path d="M48 12 C63 12 72 23 72 36 C72 46 65 51 61 58 Q59 61 59 64 H37 Q37 61 35 58 C31 51 24 46 24 36 C24 23 33 12 48 12 Z" fill="url(#lp-bG)" stroke="#c5ccd3" stroke-width=".7"/>
<path d="M36 22 Q40 17 46 16" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".8"/>
<rect x="37" y="64" width="22" height="5" rx="1.2" fill="#e9edf0" stroke="#c5ccd3" stroke-width=".6"/>
<path d="M38 69 H58 L57 81 Q57 84 54 84 H42 Q39 84 39 81 Z" fill="url(#lp-bM)"/>
<path d="M38.4 72 L57.6 70.6 M38.6 75.4 L57.4 74 M38.8 78.8 L57.2 77.4" stroke="#7c858f" stroke-width="1"/>
<path d="M44 84 H52 L50.5 88 H45.5 Z" fill="#3a4047"/>`,
  bedside: () => `<defs>${lpHalo("cH")}${lpBeam("cB")}
<linearGradient id="lp-cS" x1="0" x2="1"><stop offset="0" stop-color="#d8cdbb"/><stop offset=".5" stop-color="#f7f1e6"/><stop offset="1" stop-color="#cfc3af"/></linearGradient>
<radialGradient id="lp-cL" cx=".5" cy=".7" r=".7"><stop offset="0" stop-color="#fff"/><stop offset="1" class="lp-stop"/></radialGradient>
<linearGradient id="lp-cV" x1="0" x2="1"><stop offset="0" stop-color="#3f6f8f"/><stop offset=".45" stop-color="#7fb2cf"/><stop offset="1" stop-color="#2f5670"/></linearGradient></defs>
<circle class="lp-halo" cx="48" cy="34" r="42" fill="url(#lp-cH)"/>
<path class="lp-beam" d="M22 50 L8 86 H88 L74 50 Z" fill="url(#lp-cB)"/>
<path d="M14 86 H82" stroke="#8a6d52" stroke-width="3" stroke-linecap="round"/>
<ellipse cx="48" cy="84" rx="13" ry="2" fill="#000" opacity=".18"/>
<path d="M41 56 C33 60 33 76 40 82 H56 C63 76 63 60 55 56 Z" fill="url(#lp-cV)"/>
<path d="M30 18 H66 L76 50 H20 Z" fill="url(#lp-cS)" stroke="#bdb09a" stroke-width=".7"/>
<path class="lp-wash" d="M30 18 H66 L76 50 H20 Z" fill="url(#lp-cL)"/>
<ellipse cx="48" cy="50" rx="28" ry="2.6" fill="#fff" opacity=".55"/>
<ellipse class="lp-lit" cx="48" cy="50" rx="24" ry="1.8" opacity=".9"/>
<rect x="46.4" y="51.2" width="3.2" height="5.8" fill="#b89a5e"/>`,
  floor: () => `<defs>${lpHalo("fH")}${lpBeam("fB")}${lpMetal("fM", "#8b949d", "#f4f6f8")}
<linearGradient id="lp-fD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b4148"/><stop offset="1" stop-color="#1e2226"/></linearGradient></defs>
<circle class="lp-halo" cx="70" cy="36" r="36" fill="url(#lp-fH)"/>
<path class="lp-beam" d="M60 34 L46 88 H94 L80 34 Z" fill="url(#lp-fB)"/>
<path d="M22 84 C18 40 30 10 60 12 C68 12.5 70 18 70 24" fill="none" stroke="url(#lp-fM)" stroke-width="2.6" stroke-linecap="round"/>
<ellipse cx="22" cy="87" rx="12" ry="3" fill="#000" opacity=".18"/>
<path d="M12 84 Q12 80 22 80 Q32 80 32 84 Q32 87 22 87 Q12 87 12 84 Z" fill="#2b3036"/>
<path d="M58 34 C58 25 63 22 70 22 C77 22 82 25 82 34 Z" fill="url(#lp-fD)"/>
<ellipse class="lp-lit" cx="70" cy="34" rx="12" ry="2.2"/>`,
  torch: () => `<defs>${lpHalo("tH")}
<linearGradient id="lp-tU" x1="0" y1="1" x2="0" y2="0"><stop offset="0" class="lp-stop" stop-opacity=".95"/><stop offset="1" class="lp-stop" stop-opacity="0"/></linearGradient>
${lpMetal("tM", "#8b949d", "#f4f6f8")}${lpMetal("tB", "#7c858f", "#e3e7eb")}</defs>
<path class="lp-beam" d="M35 16 L14 0 H82 L61 16 Z" fill="url(#lp-tU)"/>
<circle class="lp-halo" cx="48" cy="18" r="26" fill="url(#lp-tH)"/>
<rect x="46.8" y="22" width="2.4" height="62" rx="1.2" fill="url(#lp-tM)"/>
<rect x="45.4" y="52" width="5.2" height="7" rx="1.6" fill="#3a4047"/>
<circle cx="48" cy="55.5" r="1.3" fill="#8f98a2"/>
<ellipse cx="48" cy="88" rx="14" ry="2.6" fill="#000" opacity=".16"/>
<path d="M36 86 Q36 83 48 83 Q60 83 60 86 Q60 88.4 48 88.4 Q36 88.4 36 86 Z" fill="#2b3036"/>
<path d="M34 15 H62 L52 23 H44 Z" fill="url(#lp-tB)" stroke="#8f98a2" stroke-width=".6" stroke-linejoin="round"/>
<ellipse class="lp-lit" cx="48" cy="15" rx="14" ry="1.8"/>`,
  pendant: () => `<defs>${lpHalo("pH")}${lpBeam("pB")}
<linearGradient id="lp-pD" x1="0" x2="1"><stop offset="0" stop-color="#2f6b5a"/><stop offset=".45" stop-color="#5fa98f"/><stop offset="1" stop-color="#245446"/></linearGradient></defs>
<path d="M18 4 H78" stroke="#b9c1c9" stroke-width="3" stroke-linecap="round"/>
<rect x="42" y="4" width="12" height="3" rx="1" fill="#8f98a2"/>
<circle class="lp-halo" cx="48" cy="50" r="40" fill="url(#lp-pH)"/>
<path class="lp-beam" d="M28 50 L10 92 H86 L68 50 Z" fill="url(#lp-pB)"/>
<path d="M48 7 V26" stroke="#3a4047" stroke-width="1"/>
<rect x="45" y="26" width="6" height="5" rx="1" fill="#3a4047"/>
<path d="M45 31 C34 33 27 41 26 50 H70 C69 41 62 33 51 31 Z" fill="url(#lp-pD)"/>
<path d="M26 50 Q48 53.4 70 50" fill="none" class="lp-litS" stroke-width="1.2" opacity=".9"/>
<path d="M42.6 50.4 Q48 54 53.4 50.4 Z" class="lp-lit"/>
<path d="M45 51.2 Q48 52.6 51 51.2" fill="none" stroke="#fff" stroke-width=".8" opacity=".8"/>`,
  strip: () => `<defs>${lpBeam("sB")}
<linearGradient id="lp-sW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c99a6b"/><stop offset="1" stop-color="#8d6640"/></linearGradient></defs>
<rect x="0" y="10" width="96" height="80" rx="3" class="lp-wall"/>
<path class="lp-beam" d="M10 46 L2 90 H94 L86 46 Z" fill="url(#lp-sB)"/>
<rect x="8" y="38" width="80" height="8" rx="1.5" fill="url(#lp-sW)"/>
<rect x="20" y="24" width="10" height="14" rx="1" fill="#7c858f"/><rect x="32" y="20" width="8" height="18" rx="1" fill="#a85a3a"/><rect x="62" y="28" width="16" height="10" rx="2" fill="#4f7a96"/>
<g>${Array.from({ length: 12 }, (_, i) => `<rect class="lp-seg lp-lit" x="${10 + i * 6.4}" y="46" width="5.4" height="2.2" rx="1"/>`).join("")}</g>
<g class="lp-wash">${Array.from({ length: 12 }, (_, i) => `<ellipse class="lp-seg lp-lit" cx="${(12.7 + i * 6.4).toFixed(1)}" cy="55" rx="5" ry="7" opacity=".35"/>`).join("")}</g>`,
  // One spot alone throws a wider cone, several share the ceiling.
  spot: (c) => {
    const n = LAMP_SPOTS.includes(c.spots) ? c.spots : 1;
    const gap = { 1: 0, 2: 32, 3: 27, 4: 22 }[n];
    const w = { 1: 26, 2: 17, 3: 15, 4: 12 }[n];
    const xs = Array.from({ length: n }, (_, i) => 48 + (i - (n - 1) / 2) * gap);
    return `<defs>${lpBeam("gB")}</defs>
<rect x="0" y="6" width="96" height="10" class="lp-ceiling"/>
<path d="M0 16 H96" stroke="#c5ccd3" stroke-width=".8"/>
${xs.map((x) => `<path class="lp-beam" d="M${x - 5} 16 L${x - w} 90 H${x + w} L${x + 5} 16 Z" fill="url(#lp-gB)"/>
<ellipse cx="${x}" cy="16" rx="7" ry="2.4" fill="#aab3bc"/>
<ellipse class="lp-lit" cx="${x}" cy="16.6" rx="4.4" ry="1.5"/>`).join("")}
<path d="M4 90 H92" stroke="#c5ccd3" stroke-width="1.4"/>`;
  },
  panels: () => `<defs>${lpHalo("nH")}</defs>
<circle class="lp-halo" cx="48" cy="48" r="46" fill="url(#lp-nH)"/>
${[["24,58 36,37 48,58", 0], ["36,37 48,58 60,37", 1], ["48,58 60,37 72,58", 2], ["36,37 48,16 60,37", 3], ["48,58 60,79 72,58", 4], ["24,58 36,79 48,58", 5]]
    .map(([p, i]) => `<polygon class="lp-seg lp-lit" points="${p}" stroke="#fff" stroke-width="1.6" stroke-linejoin="round" style="filter:hue-rotate(${i * 14 - 35}deg)"/>`).join("")}`,
  desk: () => `<defs>${lpBeam("dB")}${lpMetal("dM", "#3a4047", "#7c858f")}</defs>
<path class="lp-beam" d="M61 37 L50 86 H92 L81 37 Z" fill="url(#lp-dB)"/>
<path d="M6 86 H92" stroke="#8a6d52" stroke-width="3" stroke-linecap="round"/>
<path d="M14 84 Q14 80 22 80 Q30 80 30 84 Z" fill="#2b3036"/>
<path d="M22 80 L34 46 L66 27" fill="none" stroke="url(#lp-dM)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="34" cy="46" r="2.6" fill="#3a4047"/>
<path d="M61 37 C61 29 65 24.5 71 24.5 C77 24.5 81 29 81 37 Z" fill="#2b3036"/>
<circle cx="66" cy="27" r="2.3" fill="#3a4047"/>
<ellipse class="lp-lit" cx="71" cy="37" rx="10" ry="1.8"/>`,
  wall: () => `<defs>${lpHalo("oH")}
<radialGradient id="lp-oG" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#fff"/><stop offset="1" class="lp-stop"/></radialGradient></defs>
<rect x="0" y="4" width="34" height="88" fill="#d7c6ad"/>
<path d="M0 22 H34 M0 40 H34 M0 58 H34 M0 76 H34 M14 4 V22 M24 22 V40 M10 40 V58 M22 58 V76 M12 76 V92" stroke="#c2ae92" stroke-width=".8"/>
<circle class="lp-halo" cx="56" cy="50" r="38" fill="url(#lp-oH)"/>
<path d="M34 40 H46" stroke="#2b3036" stroke-width="3"/>
<path d="M44 28 L56 20 L68 28 Z" fill="#2b3036"/>
<rect x="46" y="28" width="20" height="34" fill="url(#lp-oG)" stroke="#2b3036" stroke-width="2"/>
<path d="M56 28 V62 M46 45 H66" stroke="#2b3036" stroke-width="1.2"/>
<path d="M44 62 H68 L64 68 H48 Z" fill="#2b3036"/>`,
};
// A strip of lawn for the garden lights.
const lpGrass = () => `<path d="M0 84 Q48 80 96 84 V94 H0 Z" fill="#6f9e4a"/>
<path d="M0 86 Q48 82.4 96 86" fill="none" stroke="#8bbd5c" stroke-width="1"/>
${Array.from({ length: 16 }, (_, i) => `<path d="M${3 + i * 6} 85 l1.2 -3.6 l1.2 3.6" fill="none" stroke="#4f7d33" stroke-width=".9" stroke-linejoin="round"/>`).join("")}`;
// A spotlight on its spike in the grass, washing a shrub from below.
LAMP_SVGS.garden_spot = () => `<defs>${lpHalo("zH")}
<linearGradient id="lp-zB" x1="0" y1="1" x2=".8" y2="0"><stop offset="0" class="lp-stop" stop-opacity=".95"/><stop offset="1" class="lp-stop" stop-opacity="0"/></linearGradient>
<radialGradient id="lp-zW" cx=".35" cy=".85" r=".8"><stop offset="0" class="lp-stop" stop-opacity=".85"/><stop offset="1" class="lp-stop" stop-opacity="0"/></radialGradient>
<radialGradient id="lp-zG" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#4f8a3a"/><stop offset="1" stop-color="#2c5a22"/></radialGradient>
${lpMetal("zM", "#2b3036", "#6f7882")}</defs>
<path d="M62 84 V58" stroke="#6b4a2e" stroke-width="3.4" stroke-linecap="round"/>
<path d="M62 70 L54 62 M62 66 L70 58" stroke="#6b4a2e" stroke-width="1.8" stroke-linecap="round"/>
<path d="M36 46 C30 32 40 14 56 14 C66 8 82 14 84 28 C94 34 92 54 80 60 C72 66 50 66 42 60 C34 58 32 52 36 46 Z" fill="url(#lp-zG)"/>
<path d="M44 30 q4 -6 10 -6 M66 22 q6 -2 10 4 M76 44 q6 2 6 8" fill="none" stroke="#6fae54" stroke-width="1.4" stroke-linecap="round" opacity=".7"/>
<path class="lp-wash" d="M36 46 C30 32 40 14 56 14 C66 8 82 14 84 28 C94 34 92 54 80 60 C72 66 50 66 42 60 C34 58 32 52 36 46 Z" fill="url(#lp-zW)"/>
<path class="lp-beam" d="M30 56 L38 64 L94 26 L60 2 Z" fill="url(#lp-zB)"/>
${lpGrass()}
<path d="M24.6 74 L24.6 90 L23.4 94 L22.2 90 L22.2 74 Z" fill="#2b3036"/>
<circle cx="23.4" cy="74" r="2.6" fill="#3a4047"/>
<g transform="rotate(42 23.4 72)"><rect x="17.4" y="56" width="12" height="16" rx="2.4" fill="url(#lp-zM)"/>
<path d="M17.4 59 H29.4 M17.4 62 H29.4 M17.4 65 H29.4" stroke="#1e2226" stroke-width=".6"/>
<ellipse cx="23.4" cy="56" rx="6.6" ry="2.2" fill="#1e2226"/>
<ellipse class="lp-lit" cx="23.4" cy="56" rx="5" ry="1.6"/></g>
<circle class="lp-halo" cx="34.4" cy="59.4" r="11" fill="url(#lp-zH)"/>`;
// String lights in two swags between three hooks, Twinkly style: the bulbs
// twinkle while on, and with an effect each takes its own hue.
LAMP_SVGS.string = () => {
  const swag = (x0, x1, sag) => (u) => {
    const x = x0 + (x1 - x0) * u;
    return [x, 18 + sag * 4 * u * (1 - u)];
  };
  const pts = [];
  for (const [x0, x1, sag] of [[6, 48, 50], [48, 90, 44]]) {
    const f = swag(x0, x1, sag);
    for (let i = 1; i < 8; i++) pts.push(f(i / 8));
  }
  const wire = (x0, x1, sag) => `M${x0} 18 Q${(x0 + x1) / 2} ${18 + sag * 2} ${x1} 18`;
  return `<defs>${lpHalo("wH")}</defs>
<rect x="0" y="4" width="96" height="88" rx="3" class="lp-wall"/>
<path d="${wire(6, 48, 50)} ${wire(48, 90, 44)}" fill="none" stroke="#2f3a2f" stroke-width="1"/>
${[6, 48, 90].map((x) => `<circle cx="${x}" cy="18" r="1.8" fill="#8f98a2"/>`).join("")}
<g>${pts.map(([x, y], i) => `<rect x="${(x - .9).toFixed(1)}" y="${(y - .4).toFixed(1)}" width="1.8" height="1.8" fill="#2f3a2f"/>${lpTwBulb(x, y, i, 2.3)}`).join("")}</g>`;
};
// One small twinkling bulb on a wire, with its own hue for effects.
const lpTwBulb = (x, y, i, r = 1.8) => `<g class="lp-seg lp-tw" style="filter:hue-rotate(${(i * 47) % 360}deg)"><circle class="lp-halo" cx="${x.toFixed(1)}" cy="${(y + 3).toFixed(1)}" r="${(r * 3.2).toFixed(1)}" fill="url(#lp-wH)"/>
<ellipse class="lp-lit" cx="${x.toFixed(1)}" cy="${(y + 2.6).toFixed(1)}" rx="${r}" ry="${(r * 1.4).toFixed(1)}"/></g>`;
// A light curtain in a window: wires hanging from a rod.
LAMP_SVGS.curtain = () => {
  const xs = [14, 26, 38, 50, 62, 74, 86];
  let i = 0;
  return `<defs>${lpHalo("wH")}</defs>
<rect x="4" y="8" width="88" height="82" rx="2" fill="#2a3a4c" stroke="#d7dce1" stroke-width="2.4"/>
<path d="M48 8 V90 M4 49 H92" stroke="#d7dce1" stroke-width="1.6"/>
<path d="M4 12 H92" stroke="#8f98a2" stroke-width="2" stroke-linecap="round"/>
${xs.map((x) => `<path d="M${x} 12 V84" stroke="#3b4a3b" stroke-width=".6"/>`).join("")}
<g>${xs.map((x, k) => Array.from({ length: 8 }, (_, j) => lpTwBulb(x, 15 + j * 9 + (k % 2) * 4, i++, 1.5)).join("")).join("")}</g>`;
};
// Icicle lights under a gutter: drops of uneven lengths.
LAMP_SVGS.icicle = () => {
  const lens = [3, 5, 2, 4, 6, 3, 5, 2, 4, 3, 5];
  let i = 0;
  return `<defs>${lpHalo("wH")}</defs>
<rect x="0" y="14" width="96" height="80" class="lp-wall"/>
<path d="M-2 4 L48 -4 L98 4 V12 H-2 Z" fill="#8a4b38"/>
<rect x="0" y="11" width="96" height="4" rx="1.4" fill="#b9c1c9"/>
<path d="M2 16 H94" stroke="#2f3a2f" stroke-width=".9"/>
${lens.map((n, k) => { const x = 6 + k * 8.4; return `<path d="M${x.toFixed(1)} 16 V${16 + n * 8}" stroke="#2f3a2f" stroke-width=".6"/>`; }).join("")}
<g>${lens.map((n, k) => Array.from({ length: n }, (_, j) => lpTwBulb(6 + k * 8.4, 16 + j * 8, i++, 1.5)).join("")).join("")}</g>`;
};
// Festoon lights: big round bulbs on two swags, as over a terrace.
LAMP_SVGS.festoon = () => {
  const pts = [];
  for (const [x0, x1, sag] of [[4, 48, 34], [48, 92, 30]]) {
    for (let k = 1; k < 4; k++) { const u = k / 4; pts.push([x0 + (x1 - x0) * u, 12 + sag * 4 * u * (1 - u)]); }
  }
  return `<defs>${lpHalo("wH")}
<radialGradient id="lp-fG" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#fff"/><stop offset=".5" class="lp-stop"/><stop offset="1" class="lp-stop" stop-opacity=".8"/></radialGradient></defs>
<path d="M4 12 Q26 80 48 12 Q70 72 92 12" fill="none" stroke="#2b3036" stroke-width="1.4"/>
${[4, 48, 92].map((x) => `<circle cx="${x}" cy="12" r="2.2" fill="#8f98a2"/>`).join("")}
<g>${pts.map(([x, y], i) => `<g class="lp-seg lp-tw" style="filter:hue-rotate(${(i * 47) % 360}deg)"><circle class="lp-halo" cx="${x.toFixed(1)}" cy="${(y + 12).toFixed(1)}" r="16" fill="url(#lp-wH)"/>
<rect x="${(x - 2.4).toFixed(1)}" y="${y.toFixed(1)}" width="4.8" height="5" rx=".9" fill="#2b3036"/>
<circle cx="${x.toFixed(1)}" cy="${(y + 11.4).toFixed(1)}" r="6.8" fill="url(#lp-fG)" stroke="#c5ccd3" stroke-width=".5"/>
<path d="M${(x - 3.2).toFixed(1)} ${(y + 8.4).toFixed(1)} q1.2 -2.2 3.6 -2.4" fill="none" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".8"/></g>`).join("")}</g>`;
};
// Pixel squares on a wall, Twinkly Squares style: each pixel its own hue.
LAMP_SVGS.squares = () => {
  const tile = (tx, ty, k) => `<rect x="${tx}" y="${ty}" width="34" height="34" rx="2" fill="#1e2226"/>
${Array.from({ length: 36 }, (_, i) => { const c = i % 6, r = Math.floor(i / 6); return `<rect class="lp-seg lp-px lp-lit" x="${tx + 2.4 + c * 5}" y="${ty + 2.4 + r * 5}" width="4" height="4" rx=".6" style="filter:hue-rotate(${((c + r + k * 3) * 22) % 360}deg)"/>`; }).join("")}`;
  return `<defs>${lpHalo("qH")}</defs>
<rect x="0" y="4" width="96" height="88" rx="3" class="lp-wall"/>
<circle class="lp-halo" cx="48" cy="48" r="46" fill="url(#lp-qH)"/>
<g>${tile(12, 12, 0)}${tile(50, 12, 1)}</g><g>${tile(12, 50, 2)}${tile(50, 50, 3)}</g>`;
};
// A small garden post along a path: its glass head lights the stones.
LAMP_SVGS.bollard = () => `<defs>${lpHalo("yH")}
<radialGradient id="lp-yG" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#fff"/><stop offset="1" class="lp-stop"/></radialGradient>
<radialGradient id="lp-yP" cx=".5" cy=".5" r=".5"><stop offset="0" class="lp-stop" stop-opacity=".8"/><stop offset="1" class="lp-stop" stop-opacity="0"/></radialGradient>
${lpMetal("yM", "#2b3036", "#5d6670")}</defs>
${lpGrass()}
<path d="M30 94 C38 88 58 88 66 94 Z" fill="#b8b2a6"/>
<ellipse cx="40" cy="91" rx="5" ry="1.6" fill="#cfc9bd"/><ellipse cx="54" cy="90.4" rx="4.4" ry="1.4" fill="#cfc9bd"/>
<ellipse class="lp-wash" cx="48" cy="88" rx="36" ry="7" fill="url(#lp-yP)"/>
<circle class="lp-halo" cx="48" cy="38" r="30" fill="url(#lp-yH)"/>
<ellipse cx="48" cy="87" rx="9" ry="2" fill="#000" opacity=".22"/>
<rect x="44" y="46" width="8" height="40" rx="1" fill="url(#lp-yM)"/>
<path d="M41 86 H55 L53 82 H43 Z" fill="#2b3036"/>
<rect x="41" y="44" width="14" height="3" rx="1" fill="#2b3036"/>
<rect x="40" y="29" width="16" height="15" rx="1.5" fill="url(#lp-yG)" stroke="#2b3036" stroke-width="1.4"/>
<path d="M44.6 29 V44 M51.4 29 V44" stroke="#2b3036" stroke-width=".9"/>
<path d="M36 29 Q48 20 60 29 Z" fill="#2b3036"/>
<rect x="46.6" y="20.4" width="2.8" height="3" rx="1" fill="#2b3036"/>`;
function lampHtml(cls, c) {
  const layout = LAMP_LAYOUTS.includes(c.layout) ? c.layout : "bulb";
  const flags = ["lp", `lp-l-${layout}`, `lp-m-${c.mode || "unav"}`, c.fx ? "lp-fx" : ""].filter(Boolean).join(" ");
  const rgb = Array.isArray(c.rgb) ? c.rgb : LAMP_WARM;
  // Dimmed down to a quarter, never out: a lamp at 1 % is still a lit lamp.
  const level = c.pct === null || c.pct === undefined ? 1 : 0.25 + 0.75 * Math.min(100, Math.max(0, c.pct)) / 100;
  return `
        <div class="machine ${cls} ${flags}" style="--lc:rgb(${rgb.join(",")});--lb:${level.toFixed(2)}"><svg class="lp-svg" viewBox="0 -6 96 108">${LAMP_SVGS[layout](c)}</svg></div>`;
}

