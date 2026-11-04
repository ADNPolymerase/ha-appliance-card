// Drawings added in 3.10.0 after the HACF thread: a booster set and a sump
// pump, a pool robot, underfloor heating on hot water or electric, a spa, a
// sauna, an aquarium, a Linky meter and a Christmas tree. Drawn in SVG on a 120 x 135 field; what
// moves moves only on a machine carrying nt-on, staggered through --d0, and
// the robot's cable and the sump's float follow their SMIL animations.
const NT_TYPES = ["water_pump", "floor_heating", "spa", "sauna", "aquarium", "meter", "christmas_tree", "mobility", "irrigation", "litter_box", "detector", "speaker", "console"];
const CONSOLE_LAYOUTS = ["ps1", "ps2", "ps3", "ps4", "ps4_pro", "ps5", "xbox", "xbox_360", "xbox_one", "xbox_series_x", "xbox_series_s", "switch", "switch_2", "switch_lite", "ps_vita", "nes", "snes", "n64", "gamecube", "wii", "megadrive"];
const IRRIGATION_LAYOUTS = ["sprinkler", "tap"];
const LITTER_LAYOUTS = ["globe", "box"];
const DETECTOR_LAYOUTS = ["smoke", "co", "leak"];
const SPEAKER_LAYOUTS = ["smart", "homepod_mini", "sonos_one", "sonos_era100", "sonos_era300", "sonos_move", "soundbar", "bose_wave", "bose_500", "bose_soundlink", "bose_soundbar", "bookshelf", "echo_dot", "nest_mini"];
const MOBILITY_LAYOUTS = ["scooter", "offroad", "ebike", "gyropode", "motorcycle"];
const PUMP_LAYOUTS = ["booster", "sump"];
const FLOOR_LAYOUTS = ["water", "electric"];
const NT_ONLY_FIELDS = {
  water_pump: ["pump_layout", "pressure_entity", "level_entity", "high_level_entity", "level_max"],
  floor_heating: ["floor_layout"],
  spa: ["bubbles_entity"],
  christmas_tree: ["tree_palette", "presents"],
  mobility: ["mobility_layout"],
  irrigation: ["irrigation_layout", "zone_entity", "rain_delay_entity", "soil_moisture_entity", "next_run_entity"],
  litter_box: ["litter_layout", "waste_drawer_entity", "litter_level_entity", "pet_weight_entity", "visits_entity", "cat_present_entity", "last_use_entity"],
  detector: ["detector_layout", "co_level_entity"],
  speaker: ["speaker_layout", "speaker_color"],
  console: ["console_layout", "game_entity", "playtime_entity", "playtime_left_entity"],
  meter: ["tariff_entity", "high_power", "meter_layout", "today_entity", "total_entity", "export_total_entity", "meter_direction"],
};
// Optional readings on the older types: each is a line when its entity is
// set. A level is a caution when low, an open window or an unlocked ride too.
const OPT_LINES = {
  oven: [{ field: "meat_probe_entity", key: "opt_meat_probe", icon: "mdi:thermometer-probe", label: "sec_meat_probe", domains: ["sensor"], target: "meat_probe_target_entity", targetLabel: "sec_meat_probe_target" }],
  washer: [
    { field: "detergent_level_entity", key: "opt_detergent", icon: "mdi:bottle-tonic-outline", label: "sec_detergent", domains: ["sensor", "binary_sensor", "number"], level: true },
    { field: "softener_level_entity", key: "opt_softener", icon: "mdi:flower-outline", label: "sec_softener", domains: ["sensor", "binary_sensor", "number"], level: true },
    { field: "wash_temperature_entity", key: "opt_wash_temp", icon: "mdi:thermometer-water", label: "sec_wash_temp", domains: ["sensor", "select", "number"] },
    { field: "spin_speed_entity", key: "opt_spin", icon: "mdi:rotate-right", label: "sec_spin", domains: ["sensor", "select", "number"] }],
  water_heater: [
    { field: "heater_mode_entity", key: "opt_heater_mode", icon: "mdi:tune-variant", label: "sec_heater_mode", domains: ["sensor", "select", "input_select", "water_heater"] },
    { field: "showers_entity", key: "opt_showers", icon: "mdi:shower-head", label: "sec_showers", domains: ["sensor"] }],
  space_heater: [
    { field: "pilot_mode_entity", key: "opt_pilot", icon: "mdi:sine-wave", label: "sec_pilot_mode", domains: ["select", "sensor", "input_select", "climate"] },
    { field: "window_entity", key: "opt_window", icon: "mdi:window-open-variant", label: "sec_window", domains: ["binary_sensor"], window: true }],
  towel_warmer: [
    { field: "pilot_mode_entity", key: "opt_pilot", icon: "mdi:sine-wave", label: "sec_pilot_mode", domains: ["select", "sensor", "input_select", "climate"] },
    { field: "window_entity", key: "opt_window", icon: "mdi:window-open-variant", label: "sec_window", domains: ["binary_sensor"], window: true }],
  mobility: [
    { field: "range_entity", key: "opt_range", icon: "mdi:map-marker-distance", label: "sec_range", domains: ["sensor"] },
    { field: "vehicle_lock_entity", key: "opt_lock", icon: "mdi:lock", label: "sec_vehicle_lock", domains: ["lock", "binary_sensor", "switch"], lock: true }],
  spa: [
    { field: "water_ph_entity", key: "opt_ph", icon: "mdi:ph", label: "section_ph", domains: ["sensor"] },
    { field: "water_chlorine_entity", key: "opt_chlorine", icon: "mdi:flask-outline", label: "sec_water_chlorine", domains: ["sensor"] }],
  aquarium: [
    { field: "water_ph_entity", key: "opt_ph", icon: "mdi:ph", label: "section_ph", domains: ["sensor"] },
    { field: "aquarium_filter_entity", key: "opt_aq_filter", icon: "mdi:pump", label: "sec_aq_filter", domains: ["switch", "binary_sensor", "sensor"], running: true }],
};
function optLines(hass, cfg, type) {
  const out = [];
  for (const o of OPT_LINES[type] || []) {
    const id = cfg[o.field];
    const s = id ? stateObj(hass, id) : null;
    if (!s || HA_OFFLINE_STATES.includes(String(s.state).toLowerCase())) continue;
    const raw = String(s.state).trim().toLowerCase();
    const binary = ["binary_sensor", "switch", "input_boolean"].includes(domainOf(id));
    let value, icon = o.icon, caution = false;
    if (o.window) {
      const open = NT_ON.includes(raw);
      value = t(hass, open ? "mb_open" : "mb_closed"); caution = open; if (!open) icon = "mdi:window-closed-variant";
    } else if (o.lock) {
      const locked = ["locked", "on", "true", "1"].includes(raw) && !(domainOf(id) === "binary_sensor");
      const unlocked = domainOf(id) === "binary_sensor" ? NT_ON.includes(raw) : !locked;
      value = t(hass, unlocked ? "lock_unlocked" : "lock_locked"); icon = unlocked ? "mdi:lock-open-variant" : "mdi:lock"; caution = unlocked;
    } else if (o.running) {
      const on = NT_ON.includes(raw) || raw === "running";
      value = t(hass, on ? "opt_running" : "opt_stopped"); caution = !on;
    } else if (o.level && binary) {
      const low = NT_ON.includes(raw);
      value = t(hass, low ? "opt_low" : "opt_ok"); caution = low;
    } else {
      value = formatInfoValue(s, hass, null, cfg, id);
      const v = numberOrNull(s.state);
      if (o.level && v !== null && (unitOf(hass, id) || "%") === "%") caution = v <= 15;
      const tv = o.target ? numericState(hass, cfg[o.target]) : null;
      if (tv !== null) value = `${value} / ${formatInfoValue(stateObj(hass, cfg[o.target]), hass, null, cfg, cfg[o.target])}`;
    }
    out.push({ key: o.key, icon, label: t(hass, o.label), value: keepTogether(String(value)), entity: id, caution });
  }
  return out;
}
// By name, in the languages the card speaks; "whirlpool" is left out, it is a
// maker of washing machines too.
const NT_NAME_RES = [
  ["console", /playstation|(^|[^a-z])ps[1-5]([^a-z0-9]|$)|xbox|nintendo|gamecube|(^|[^a-z])(n64|snes|nes|wii|switch.?lite|switch.?2)([^a-z0-9]|$)|mega.?drive|genesis|console|konsole|consola|konsol/],
  ["litter_box", /litter|litiere|katzenklo|arenero|lettiera|kattlada|kuweta|kattebak|kattesand|(^|[^a-z])pura.?(x|max)/],
  ["irrigation", /arrosage|irrigat|sprinkler|bewasserung|(^|[^a-z])riego|beregening|bevattning|vanning|vanding|nawadnian|zavlaz|opensprinkler|linktap|hydrawise|rachio|rain.?bird/],
  ["detector", /smoke|fumee|detecteur.?(de.?)?(fumee|co|fuite)|monoxyde|carbon.?monoxide|(^|[^a-z])co.?(alarm|detector)|rauchmelder|detector.?de.?humo|rilevatore|rookmelder|brandvarnare|roykvarsler|roegalarm|czujnik.?dymu|water.?leak|fuite.?d.?eau|wassermelder|leak.?sensor/],
  ["christmas_tree", /christmas|xmas|(^|[^a-z])sapin|(^|[^a-z])noel([^a-z]|$)|weihnacht|tannenbaum|navidad|natale|kerstboom|julgran|juletre|juletrae|choink|vanocni.?strom/],
  ["aquarium", /aquari|akwari|akvari/],
  ["mobility", /trottinette|e-?scooter|(^|[^a-z])scooter([^a-z]|$)|ninebot|(^|[^a-z])(velo|e-?bike|ebike|vae|pedelec)([^a-z]|$)|gyropode|gyroroue|monowheel|hoverboard|(^|[^a-z])moto([^a-z]|$)|motorcycle|super.?soco|sur.?ron|ausom|dualtron|kaabo|patinete|monopattino|hulajnoga|elsparkcykel|elsparkesykkel|kolobezka/],
  ["sauna", /sauna/],
  ["spa", /(^|[^a-z])(spa|jacuzzi|hot.?tub|bain.?nordique|whirlpoolwanne)([^a-z]|$)/],
  ["meter", /linky|compteur.?(electrique|edf|enedis)|smart.?meter|(^|[^a-z])(teleinfo|papp|sinsts)([^a-z]|$)/],
  ["floor_heating", /plancher.?chauffant|underfloor|floor.?heat|fussbodenheizung|suelo.?radiante|pavimento.?radiante|vloerverwarming|golvvarme|gulvvarme|ogrzewanie.?podlog|podlahov/],
  ["water_pump", /surpresseur|booster|relevage|(^|[^a-z])sump|pompe.?(a.?eau|de.?puits|immergee)|water.?pump|well.?pump|(^|[^a-z])forage|tauchpumpe|hauswasser|hebeanlage/],
];
// A meter's drawing: the one chosen, else its unit and its name (#68). A
// Linky stays a Linky; gas and water by their device class or their name;
// otherwise the European electricity meter it always was.
const METER_LAYOUTS = ["linky", "box", "dome", "gas", "water"];
function meterLayoutOf(cfg, st) {
  if (METER_LAYOUTS.includes(cfg.meter_layout)) return cfg.meter_layout;
  const a = (st && st.attributes) || {};
  const hay = stripAccents(`${cfg.state_entity || ""} ${cfg.total_entity || ""} ${cfg.name || ""} ${a.friendly_name || ""}`).toLowerCase();
  if (/linky|teleinfo|papp|sinsts/.test(hay)) return "linky";
  if (a.device_class === "gas" || /(^|[^a-z])(gas|gaz)([^a-z]|$)|gazpar/.test(hay)) return "gas";
  if (a.device_class === "water" || /water|(^|[^a-z])eau([^a-z]|$)|wasser|agua|acqua|water_meter/.test(hay)) return "water";
  return "linky";
}
// The new drawings, picked or read from the name, the device class.
function irrigationLayoutOf(cfg, st) {
  if (IRRIGATION_LAYOUTS.includes(cfg.irrigation_layout)) return cfg.irrigation_layout;
  const hay = stripAccents(`${cfg.state_entity || ""} ${cfg.name || ""} ${(st && st.attributes.friendly_name) || ""}`).toLowerCase();
  return /gardena|linktap|robinet|(^|[^a-z])tap([^a-z]|$)|faucet|wasserhahn|grifo|rubinetto|kraan|kran|timer/.test(hay) ? "tap" : "sprinkler";
}
function litterLayoutOf(cfg, st) {
  if (LITTER_LAYOUTS.includes(cfg.litter_layout)) return cfg.litter_layout;
  const hay = stripAccents(`${cfg.state_entity || ""} ${cfg.name || ""} ${(st && st.attributes.friendly_name) || ""}`).toLowerCase();
  return /petkit|pura|(^|[^a-z])box([^a-z]|$)|caja|scooper/.test(hay) ? "box" : "globe";
}
function detectorLayoutOf(cfg, st) {
  if (DETECTOR_LAYOUTS.includes(cfg.detector_layout)) return cfg.detector_layout;
  const dc = String((st && st.attributes.device_class) || "");
  if (dc === "moisture") return "leak";
  if (dc === "carbon_monoxide" || dc === "gas") return "co";
  if (dc === "smoke") return "smoke";
  const hay = stripAccents(`${cfg.state_entity || ""} ${cfg.name || ""} ${(st && st.attributes.friendly_name) || ""}`).toLowerCase();
  if (/leak|fuite|water|(^|[^a-z])eau([^a-z]|$)|wasser|fuga|perdita|lekk|lack|moisture|flood/.test(hay)) return "leak";
  if (/(^|[^a-z])co([^a-z0-9]|$)|monox|carbon|(^|[^a-z])gas([^a-z]|$)|(^|[^a-z])gaz([^a-z]|$)/.test(hay)) return "co";
  return "smoke";
}
function speakerLayoutOf(cfg, st) {
  if (SPEAKER_LAYOUTS.includes(cfg.speaker_layout)) return cfg.speaker_layout;
  const hay = stripAccents(`${cfg.state_entity || ""} ${cfg.name || ""} ${(st && st.attributes.friendly_name) || ""}`).toLowerCase();
  if (/bose/.test(hay) && /soundbar|barre.?de.?son|tv.?speaker|(^|[^a-z])(smart.?soundbar|ultra)([^a-z]|$)/.test(hay)) return "bose_soundbar";
  if (/soundbar|barre.?de.?son|(^|[^a-z])(beam|arc|ray|playbar|playbase)([^a-z]|$)/.test(hay)) return "soundbar";
  if (/(^|[^a-z])wave([^a-z]|$)|soundtouch.?wave/.test(hay)) return "bose_wave";
  if (/soundlink|(^|[^a-z])(flex|revolve)([^a-z]|$)/.test(hay)) return "bose_soundlink";
  if (/bose/.test(hay)) return "bose_500";
  if (/homepod.?mini/.test(hay)) return "homepod_mini";
  if (/sonos.?(move|roam)|portable|(^|[^a-z])(jbl|ue.?boom|boombox)/.test(hay)) return "sonos_move";
  if (/era.?300/.test(hay)) return "sonos_era300";
  if (/era.?100/.test(hay)) return "sonos_era100";
  if (/sonos.?(one|play.?1|symfonisk)/.test(hay)) return "sonos_one";
  if (/echo.?dot|(^|[^a-z])dot([^a-z]|$)/.test(hay)) return "echo_dot";
  if (/nest.?mini|google.?home.?mini|home.?mini/.test(hay)) return "nest_mini";
  if (/bookshelf|sonos.?(five|play.?5)|(^|[^a-z])(kef|denon|yamaha|marantz|monitor)([^a-z]|$)|bibliotheque|regallautsprecher/.test(hay)) return "bookshelf";
  return "smart";
}
// A console's model, by its name: the generation of a PlayStation, which
// Xbox, which Switch, the retro ones; a brand alone draws its latest.
function consoleLayoutOf(cfg, st) {
  if (CONSOLE_LAYOUTS.includes(cfg.console_layout)) return cfg.console_layout;
  const hay = stripAccents(`${cfg.state_entity || ""} ${cfg.name || ""} ${(st && st.attributes.friendly_name) || ""}`).toLowerCase();
  const re = [["ps_vita", /vita/], ["ps4_pro", /ps.?4.?pro|playstation.?4.?pro/], ["ps1", /(^|[^a-z])(ps.?1|psx|psone)([^0-9]|$)|playstation.?1([^0-9]|$)/], ["ps2", /ps.?2([^0-9]|$)|playstation.?2/],
    ["ps3", /ps.?3([^0-9]|$)|playstation.?3/], ["ps4", /ps.?4([^0-9]|$)|playstation.?4/], ["ps5", /ps.?5([^0-9]|$)|playstation/],
    ["xbox_series_s", /series.?s([^a-z]|$)|xbox.?s([^a-z]|$)/], ["xbox_series_x", /series.?x|xbox.?x([^a-z]|$)/], ["xbox_360", /360/], ["xbox_one", /xbox.?one/],
    ["switch_lite", /switch.?lite|(^|[^a-z])lite([^a-z]|$)/], ["switch_2", /switch.?2/], ["gamecube", /gamecube|game.?cube|(^|[^a-z])ngc([^a-z]|$)/], ["n64", /n64|nintendo.?64/],
    ["snes", /snes|super.?(nes|nintendo|famicom)/], ["nes", /(^|[^a-z])(nes|famicom)([^a-z]|$)/], ["wii", /(^|[^a-z])wii([^a-z]|$)/], ["megadrive", /mega.?drive|genesis|sega/],
    ["xbox_series_x", /xbox/], ["switch", /switch|nintendo/]];
  const hit = re.find(([, r]) => r.test(hay));
  return hit ? hit[0] : "ps5";
}
// A line read from any entity, as Home Assistant prints its state.
function ntLine(hass, cfg, key, icon, labelKey, id) {
  const s = id ? stateObj(hass, id) : null;
  if (!s || String(s.state) === "" || HA_OFFLINE_STATES.includes(String(s.state).toLowerCase())) return null;
  return { key, icon, label: t(hass, labelKey), value: keepTogether(formatInfoValue(s, hass, null, cfg, id)), entity: id };
}
// An electric ride's drawing: the one chosen, else its name.
function mobilityLayoutOf(cfg, st) {
  if (MOBILITY_LAYOUTS.includes(cfg.mobility_layout)) return cfg.mobility_layout;
  const hay = stripAccents(`${cfg.state_entity || ""} ${cfg.name || ""} ${(st && st.attributes.friendly_name) || ""}`).toLowerCase();
  if (/ausom|dualtron|kaabo|off.?road|tout.?terrain|gelande|todoterreno|fuoristrada|teren/.test(hay)) return "offroad";
  if (/gyropode|gyroroue|monowheel|hoverboard|segway.?pt|one.?wheel/.test(hay)) return "gyropode";
  if (/(^|[^a-z])moto([^a-z]|$)|motorcycle|motorrad|motocicl|motocykl|super.?soco|sur.?ron|talaria|horwin|zero.?s/.test(hay)) return "motorcycle";
  if (/(^|[^a-z])(velo|e-?bike|ebike|vae|pedelec|bike|fahrrad|bici|fiets|cykel|sykkel|rower|kolo)([^a-z]|$)/.test(hay)) return "ebike";
  return "scooter";
}
const ROBOT_POOL_RE = /pool|piscine|dolphin|maytronics|aiper|zodiac|polaris|beatbot|wybot|bwt.?(d|p)\d|pool.?robot|schwimmbad|piscina|zwembad|basen/;

const TREE_PALETTES = {
  multicolor: { balls: ["#c62828", "#1565c0", "#f9a825", "#ec407a", "#00897b", "#6a1b9a", "#ef6c00", "#b0bec5", "#e91e63", "#43a047", "#26c6da"], lights: ["#ff5252", "#ffd740", "#40c4ff", "#69f0ae", "#ff80ab", "#b388ff", "#ff9100", "#18ffff"], tinsel: ["#e53935", "#cfd8dc"], star: ["#fff59d", "#f9a825", "#f57f17"], pot: ["#d32f2f", "#8e1b1b"], gifts: ["#c62828", "#1565c0", "#00897b", "#8e24aa"], ribbons: ["#ffd54f", "#ffffff", "#ffeb3b", "#ffd54f"] },
  red_gold: { balls: ["#c62828", "#f9a825", "#b71c1c", "#ffca28"], lights: ["#ffe0a3"], tinsel: ["#f9a825"], star: ["#fff59d", "#f9a825", "#f57f17"], pot: ["#d32f2f", "#8e1b1b"], gifts: ["#c62828", "#f9a825", "#b71c1c", "#c62828"], ribbons: ["#ffd54f", "#c62828", "#ffd54f", "#ffd54f"] },
  red_silver: { balls: ["#c62828", "#cfd8dc", "#b71c1c", "#eceff1"], lights: ["#f1f8ff"], tinsel: ["#cfd8dc"], star: ["#ffffff", "#b0bec5", "#78909c"], pot: ["#eceff1", "#b0bec5"], gifts: ["#c62828", "#eceff1", "#b71c1c", "#cfd8dc"], ribbons: ["#eceff1", "#c62828", "#eceff1", "#c62828"] },
  gold_silver: { balls: ["#f9a825", "#cfd8dc", "#e6c77a", "#eceff1"], lights: ["#ffe0a3"], tinsel: ["#f9a825", "#cfd8dc"], star: ["#fff59d", "#f9a825", "#f57f17"], pot: ["#f5d77e", "#b4842a"], gifts: ["#f9a825", "#eceff1", "#e6c77a", "#cfd8dc"], ribbons: ["#ffffff", "#f9a825", "#ffffff", "#f9a825"] },
  blue_silver: { balls: ["#1565c0", "#cfd8dc", "#42a5f5", "#eceff1"], lights: ["#e3f2fd"], tinsel: ["#cfd8dc"], star: ["#ffffff", "#b0bec5", "#78909c"], pot: ["#eceff1", "#b0bec5"], gifts: ["#1565c0", "#eceff1", "#42a5f5", "#1565c0"], ribbons: ["#eceff1", "#1565c0", "#eceff1", "#eceff1"] },
  white_silver: { balls: ["#ffffff", "#cfd8dc", "#e3f2fd", "#eceff1"], lights: ["#f1f8ff"], tinsel: ["#ffffff"], star: ["#ffffff", "#b0bec5", "#78909c"], pot: ["#ffffff", "#cfd8dc"], gifts: ["#ffffff", "#cfd8dc", "#e3f2fd", "#eceff1"], ribbons: ["#b0bec5", "#ffffff", "#90a4ae", "#90a4ae"] },
  red_green: { balls: ["#c62828", "#2e7d32", "#f9a825", "#b71c1c"], lights: ["#ffe0a3", "#ff5252", "#69f0ae"], tinsel: ["#f9a825", "#e53935"], star: ["#fff59d", "#f9a825", "#f57f17"], pot: ["#d32f2f", "#8e1b1b"], gifts: ["#c62828", "#2e7d32", "#f9a825", "#c62828"], ribbons: ["#ffd54f", "#ffd54f", "#c62828", "#ffffff"] },
};
const TREE_PRESENTS = ["auto", "show", "hide"];
// Presents under the tree on Christmas Eve and Christmas Day, unless asked
// otherwise.
function treePresents(cfg) {
  const p = cfg.presents === true ? "show" : cfg.presents === false ? "hide" : TREE_PRESENTS.includes(cfg.presents) ? cfg.presents : "auto";
  if (p !== "auto") return p === "show";
  const d = new Date(Date.now());
  return d.getMonth() === 11 && (d.getDate() === 24 || d.getDate() === 25);
}
function pumpLayoutOf(cfg, st) {
  if (PUMP_LAYOUTS.includes(cfg.pump_layout)) return cfg.pump_layout;
  if (cfg.level_entity || cfg.high_level_entity) return "sump";
  const hay = stripAccents(`${cfg.state_entity || ""} ${cfg.name || ""} ${(st && st.attributes.friendly_name) || ""}`).toLowerCase();
  return /relevage|sump|tauch|hebe|vide.?cave|drain|eaux.?usees|crue/.test(hay) ? "sump" : "booster";
}
function floorLayoutOf(cfg) {
  return FLOOR_LAYOUTS.includes(cfg.floor_layout) ? cfg.floor_layout : "water";
}

const NT_ON = ["on", "true", "1", "yes", "heat", "heating", "open", "running", "pumping", "auto", "home"];
// Running or not: the state entity's own word, a thermostat's action, and a
// plug's power above its threshold when there is one. Null when nothing
// answers.
function ntRunning(hass, cfg, st, watts, threshold) {
  const raw = st ? String(st.state).trim().toLowerCase() : "";
  const dead = !st || ["unavailable", "unknown", "none", ""].includes(raw);
  const metered = cfg.power_entity && watts !== null && isFinite(threshold);
  if (dead && !metered) return null;
  if (!dead) {
    const dom = domainOf(cfg.state_entity);
    if (["climate", "water_heater"].includes(dom)) {
      if (raw === "off") return false;
      const act = String((st.attributes || {}).hvac_action || "").toLowerCase();
      if (act) return act === "heating" || act === "preheating" || act === "cooling";
      if (metered) return watts >= threshold;
      return true;
    }
    if (!NT_ON.includes(raw) && !(numberOrNull(st.state) > 0)) return false;
  }
  return metered ? watts >= threshold : true;
}
function ntOnOff(hass, id) {
  const s = id ? stateObj(hass, id) : null;
  return !!s && NT_ON.includes(String(s.state).trim().toLowerCase());
}
// The temperature: its own entity, or the thermostat's.
function ntTemp(hass, cfg, st) {
  if (cfg.temperature_entity) {
    const v = numericState(hass, cfg.temperature_entity);
    return v === null ? null : { v, text: tempText(hass, cfg, cfg.temperature_entity, v, temperatureUnit(hass, cfg.temperature_entity)) };
  }
  const v = st ? numberOrNull((st.attributes || {}).current_temperature) : null;
  if (v === null) return null;
  const unit = (hass && hass.config && hass.config.unit_system && hass.config.unit_system.temperature) || "\u00b0C";
  return { v, text: tempText(hass, cfg, null, v, unit) };
}
function ntTarget(hass, cfg, st) {
  if (cfg.target_temperature_entity) return numericState(hass, cfg.target_temperature_entity);
  return st ? numberOrNull((st.attributes || {}).temperature) : null;
}
function ntValueText(hass, cfg, id) {
  const s = id ? stateObj(hass, id) : null;
  if (!s || numberOrNull(s.state) === null) return null;
  return formatInfoValue(s, hass, null, cfg, id);
}

// Drawing helpers
let ntN = 0;
const ntId = () => `nt${++ntN}`;
const NT_FONT = `font-family="Roboto, 'Segoe UI', Helvetica, Arial, sans-serif"`;
const ntV = (id, a, b) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const ntBlur = (id, s) => `<filter id="${id}" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="${s}"/></filter>`;
const ntShadow = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="3.2" fill="#000" opacity=".14"/>`;
const ntFoot = (pts, op = .22) => { const id = ntId(); return `<filter id="${id}" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="1.5"/></filter><polygon points="${pts}" fill="#000" opacity="${op}" filter="url(#${id})"/>`; };
// A display in large bold figures, so the value and its unit read at card size.
const ntLcd = (x, y, w, h, text, lit, color = "#4fc3f7", fs = 8.5) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.8" fill="#141a21" stroke="#0a0d11" stroke-width=".5"/>` +
  `<rect x="${x + .8}" y="${y + .8}" width="${w - 1.6}" height="${(h * .38).toFixed(2)}" rx="1.2" fill="#fff" opacity=".05"/>` +
  (text ? `<text x="${x + w / 2}" y="${(y + h / 2 + fs * .36).toFixed(2)}" font-size="${fs}" font-weight="700" text-anchor="middle" fill="${lit ? color : "#5d6773"}" ${NT_FONT}>${esc(text)}</text>` : "");
const ntFlake = (x, y, r, color, w = .8) =>
  `<path d="M${x} ${y - r}v${2 * r}M${x - r} ${y}h${2 * r}M${x - r * .7} ${y - r * .7}l${r * 1.4} ${r * 1.4}M${x + r * .7} ${y - r * .7}l${-r * 1.4} ${r * 1.4}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
// The text of a display fits its width: a long reading is drawn smaller.
const ntFit = (text, width, fs) => Math.min(fs, (width - 3) / Math.max(1, String(text || "").length * .6));

// Booster set: the pump on its pressure tank and its electronic controller
function ntBooster(c) {
  const m = ntId(), t = ntId(), cs = ntId(), b = ntId(), p = ntId(), pv = ntId();
  const on = c.on;
  const fins = [0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="${62 + i * 5}" y="51.5" width="1.6" height="21" rx=".8" fill="#123f78" opacity=".5"/>`).join("");
  const slots = [0, 1, 2, 3, 4, 5].map((i) => `<path d="M100 ${54 + i * 3}h5.4" stroke="#7a838f" stroke-width="1" stroke-linecap="round"/>`).join("");
  const txt = c.lcd || "";
  return `<defs>${ntV(m, "#62a8f0", "#1b56a0")}${ntV(t, "#3f8fe4", "#16457f")}${ntV(cs, "#e3e7ec", "#8b95a1")}${ntV(b, "#f5d77e", "#b4842a")}${ntV(p, "#5a636e", "#262b31")}${ntV(pv, "#eceff2", "#b6bec8")}</defs>
${ntShadow(63, 107.2, 44)}
<path d="M24 98 v9 h9 v-9 M92 98 v9 h9 v-9" fill="#3f4752"/>
<rect x="16" y="80" width="94" height="20" rx="10" fill="url(#${t})"/>
<rect x="24" y="82.6" width="78" height="3" rx="1.5" fill="#fff" opacity=".28"/>
<path d="M30 80.4v19.2M96 80.4v19.2" stroke="#0f3563" stroke-width=".7"/>
<rect x="34" y="74" width="72" height="6" rx="1.2" fill="#555e69"/>
<g class="nta-vib">
<rect x="58" y="50" width="42" height="24" rx="4" fill="url(#${m})"/>${fins}
<rect x="58" y="51.5" width="42" height="3" fill="#fff" opacity=".2"/>
<rect x="97.5" y="51.5" width="9.5" height="21" rx="3" fill="#353c46"/>${slots}
<rect x="67" y="42.5" width="20" height="8.2" rx="1.5" fill="#2b3139"/>
<rect x="70" y="44.2" width="6" height="4.6" rx="1" fill="${on ? "#43a047" : "#59626e"}"/>
<circle cx="82" cy="46.5" r="1.4" fill="${on ? "#76ff03" : "#59626e"}"/>
<path d="M38 50 Q34 46 41 46 H53 Q59 46 59 52 V71 Q59 76 53 76 H41 Q35 76 35 70 Z" fill="url(#${cs})"/>
<path d="M38 52 Q38 48 42 48 H48" stroke="#fff" stroke-width="1" opacity=".6" fill="none"/>
<rect x="55.5" y="47.5" width="4.4" height="28" rx="1" fill="#7a848f"/>
<circle cx="57.7" cy="51" r="1" fill="#4a525e"/><circle cx="57.7" cy="72" r="1" fill="#4a525e"/>
<circle cx="46" cy="62" r="5.2" fill="#9aa3ae" stroke="#6d7682" stroke-width=".6"/><circle cx="46" cy="62" r="1.6" fill="#59626e"/>
<rect x="37" y="74" width="5" height="3" rx=".6" fill="url(#${b})"/>
</g>
<rect x="0" y="57.5" width="36" height="9" fill="url(#${p})"/>
<rect x="20" y="56" width="8" height="12" rx="1" fill="url(#${b})"/><path d="M22 56v12M24 56v12M26 56v12" stroke="#9a7020" stroke-width=".5"/>
<rect x="42.5" y="30" width="7" height="17" fill="url(#${pv})" stroke="#9aa3ae" stroke-width=".5"/>
<rect x="62" y="17" width="58" height="7" fill="url(#${pv})" stroke="#9aa3ae" stroke-width=".5"/>
<g class="nt-run"><path class="nta-flow" d="M1 62H35" stroke="#81d4fa" stroke-width="2.4" stroke-dasharray="4 4" fill="none"/>
<path class="nta-flow" d="M46 46V32" stroke="#81d4fa" stroke-width="2.2" stroke-dasharray="4 4" fill="none"/>
<path class="nta-flow" d="M69 20.5H119" stroke="#81d4fa" stroke-width="2.4" stroke-dasharray="4 4" fill="none"/></g>
<rect x="28" y="4" width="41" height="28" rx="3" fill="#eef1f4" stroke="#aab2bc" stroke-width=".6"/>
<rect x="28" y="4" width="41" height="4" rx="2" fill="#1e88e5"/>
${ntLcd(31, 9.5, 35, 13, txt, true, on ? "#4fc3f7" : "#90a4ae", ntFit(txt, 35, 8.6))}
<circle cx="34" cy="27" r="1.3" fill="#43a047"/><circle cx="52" cy="27" r="1.3" fill="${on ? "#43a047" : "#b0b7c1"}"/>`;
}

// Sump pit in cross-section: the float pivots on its cable with the water
function ntSump(c) {
  const s = ntId(), w = ntId(), con = ntId(), pu = ntId(), pv = ntId();
  const angleOf = (y) => Math.max(-8, Math.min(90, Math.asin(Math.max(-1, Math.min(1, (86 - y + 1) / 24))) * 180 / Math.PI));
  // The water: the level read when there is one, high on an alarm, falling
  // while it pumps, mid-pit at rest.
  const known = c.level !== null && c.level !== undefined;
  const lv = known ? 108 - Math.max(0, Math.min(1, c.level)) * 80 : c.alarm ? 40 : 64;
  const moving = c.on && !known && !c.alarm;
  const water = moving
    ? `<rect x="31" y="62" width="58" height="46" fill="url(#${w})"><animate attributeName="y" values="62;88;62" keyTimes="0;.7;1" dur="7s" repeatCount="indefinite"/><animate attributeName="height" values="46;20;46" keyTimes="0;.7;1" dur="7s" repeatCount="indefinite"/></rect>`
    : `<rect x="31" y="${lv.toFixed(1)}" width="58" height="${(108 - lv).toFixed(1)}" fill="url(#${w})"/><path d="M31 ${lv.toFixed(1)}h58" stroke="#b3e5fc" stroke-width=".8"/>`;
  const swing = moving ? `<animateTransform attributeName="transform" type="rotate" values="${angleOf(62)} 52 86;${angleOf(88)} 52 86;${angleOf(62)} 52 86" keyTimes="0;.7;1" dur="7s" repeatCount="indefinite"/>` : "";
  const soil = [[8, 40], [14, 70], [6, 96], [18, 110], [100, 44], [108, 66], [114, 90], [102, 104], [20, 54], [112, 30], [9, 84]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.6" ry="1" fill="#4e342e" opacity=".5"/>`).join("");
  const grass = Array.from({ length: 24 }, (_, i) => { const x = i * 5 + 1; return x > 23 && x < 97 ? "" : `<path d="M${x} 24 l1 -3.4 M${x + 2} 24 l-.6 -2.6" stroke="#558b2f" stroke-width=".8"/>`; }).join("");
  const txt = c.lcd || "";
  return `<defs>${ntV(s, "#8d6e63", "#5d4037")}${ntV(w, "#4fc3f7", "#0d5c9e")}${ntV(con, "#c4c7cc", "#9a9ea6")}${ntV(pu, "#4a5b55", "#1d2623")}${ntV(pv, "#eceff2", "#b6bec8")}</defs>
<rect x="0" y="24" width="120" height="96" fill="url(#${s})"/>${soil}
<rect x="0" y="21.5" width="24" height="3.5" fill="#7cb342"/><rect x="96" y="21.5" width="24" height="3.5" fill="#7cb342"/>${grass}
<rect x="26" y="24" width="68" height="90" fill="url(#${con})"/>
<rect x="31" y="26" width="58" height="82" fill="#3a4148"/><rect x="31" y="26" width="58" height="6" fill="#000" opacity=".25"/>
${water}
<path d="M31 46h9" stroke="#ef5350" stroke-width=".9" stroke-dasharray="1.6 1"/><text x="33" y="44.6" font-size="5" font-weight="700" fill="#ef5350" ${NT_FONT}>max</text>
<path d="M31 90h9" stroke="#ffb74d" stroke-width=".9" stroke-dasharray="1.6 1"/><text x="33" y="88.6" font-size="5" font-weight="700" fill="#ffb74d" ${NT_FONT}>min</text>
<rect x="0" y="29" width="32" height="7" fill="url(#${pv})" stroke="#9aa3ae" stroke-width=".5"/>
<g class="nta-fall"><circle cx="33" cy="38" r="1.1" fill="#81d4fa"/></g><g class="nta-fall ntd2"><circle cx="33.6" cy="38" r=".9" fill="#81d4fa"/></g>
<rect x="57" y="7" width="6" height="71" fill="url(#${pv})" stroke="#9aa3ae" stroke-width=".5"/>
<rect x="57" y="6" width="63" height="6" fill="url(#${pv})" stroke="#9aa3ae" stroke-width=".5"/>
<g class="nt-run"><path class="nta-flow" d="M60 76V9H119" stroke="#81d4fa" stroke-width="2.4" stroke-dasharray="4 4" fill="none"/></g>
<rect x="54.5" y="48" width="11" height="10" rx="1.4" fill="#37474f"/><path d="M60 56.5v-6.5M57.6 52.4 60 50l2.4 2.4" stroke="#cfd8dc" stroke-width=".9" fill="none" stroke-linecap="round"/>
<rect x="24" y="19.5" width="72" height="5" rx="1" fill="#5b6470"/><path d="M30 20.5v3M36 20.5v3M42 20.5v3M48 20.5v3M70 20.5v3M76 20.5v3M82 20.5v3M88 20.5v3" stroke="#3a414b" stroke-width="1.2"/>
<g class="nta-vib">
<path d="M55 80 Q55 75 60 75 Q65 75 65 80 Z" fill="#2c3834"/>
<rect x="52" y="79" width="16" height="22" rx="2.4" fill="url(#${pu})"/>
<rect x="53.5" y="81" width="2" height="18" rx="1" fill="#fff" opacity=".18"/>
<rect x="50" y="100" width="20" height="8" rx="1.4" fill="#37474f"/>
<path d="M53 101.5v5M56 101.5v5M59 101.5v5M62 101.5v5M65 101.5v5M68 101.5v5" stroke="#90a4ae" stroke-width=".8"/>
</g>
<g transform="rotate(${moving ? 0 : angleOf(lv).toFixed(1)} 52 86)">${swing}
<path d="M52 86 H32" stroke="#212121" stroke-width=".9"/>
<ellipse cx="28" cy="86" rx="5.4" ry="3.6" fill="#ffca28" stroke="#c49000" stroke-width=".5"/><ellipse cx="26.6" cy="84.8" rx="2" ry=".9" fill="#fff" opacity=".6"/>
</g>
<rect x="11.5" y="17" width="3" height="6" fill="#5b6470"/>
<rect x="0" y="2" width="27" height="16" rx="2" fill="#eceff2" stroke="#aab2bc" stroke-width=".5"/>
${ntLcd(2, 4.2, 23, 11.6, txt, true, c.alarm ? "#ff5252" : "#4fc3f7", ntFit(txt, 23, 7.6))}
${c.alarm ? `<rect x="29" y="9" width="7" height="3" rx=".6" fill="#5b6470"/><path d="M29.6 9 Q32.5 1.5 35.4 9 Z" fill="#e53935"/><circle class="nta-beacon" cx="32.5" cy="6" r="6" fill="#ff5252" opacity=".5"/>` : ""}`;
}

// Pool robot: the cable from the deck follows it to and fro
function ntPoolRobot(c) {
  const tp = ntId(), w = ntId(), bd = ntId(), dk = ntId();
  const on = c.on, x0 = 34, x1 = 88;
  const cable = (x) => `M90 21 C83 21 80 27 76 35.5 C${x + 16} 42 ${x + 7} 62 ${x} 79`;
  const keys = "0;.45;.5;.95;1";
  const cablePath = on
    ? `<path d="${cable(x0)}" stroke="#263238" stroke-width="1.2" fill="none"><animate attributeName="d" values="${[x0, x1, x1, x0, x0].map(cable).join(";")}" keyTimes="${keys}" dur="9s" repeatCount="indefinite"/></path>`
    : `<path d="${cable(46)}" stroke="#263238" stroke-width="1.2" fill="none"/>`;
  const brush = (cx) => `<g transform="translate(${cx} 1)"><g class="nta-spin"><circle r="4.2" fill="#1e88e5"/>${[0, 45, 90, 135].map((a) => `<path d="M-4 0H4" transform="rotate(${a})" stroke="#90caf9" stroke-width=".9"/>`).join("")}</g><circle r="1.2" fill="#0d47a1"/></g>`;
  const robot = `<rect x="-15" y="-2" width="30" height="8.2" rx="4" fill="#263238"/>
<path class="nta-flow-fast" d="M-12 6H12" stroke="#78909c" stroke-width="1.6" stroke-dasharray="1.6 1.6"/>
${brush(-13.5)}${brush(13.5)}
<path d="M-15 -1 Q-15 -14 0 -14 Q15 -14 15 -1 Z" fill="url(#${bd})" stroke="#90a4ae" stroke-width=".5"/>
<path d="M-15 -3 H15" stroke="#1e88e5" stroke-width="2"/>
<rect x="-7" y="-11" width="14" height="5" rx="1.5" fill="#37474f"/><path d="M-5.5 -8.5h11" stroke="#78909c" stroke-width=".6" stroke-dasharray="1 .8"/>
<path d="M-6 -13.4 Q0 -21 6 -13.4" stroke="#455a64" stroke-width="1.8" fill="none" stroke-linecap="round"/>
<circle cx="10" cy="-6.5" r="1" fill="${on ? "#76ff03" : "#78909c"}"/>`;
  const anim = on ? `<animateTransform attributeName="transform" type="translate" values="${x0} 98;${x1} 98;${x1} 98;${x0} 98;${x0} 98" keyTimes="${keys}" dur="9s" repeatCount="indefinite"/>` : "";
  const flip = on ? `<animateTransform attributeName="transform" type="scale" values="1 1;1 1;-1 1;-1 1;1 1" keyTimes="${keys}" calcMode="discrete" dur="9s" repeatCount="indefinite"/>` : "";
  const bubbles = [0, 1, 2].map((i) => `<circle class="nta-rise ntd${i + 1}" cx="${-2 + i * 2}" cy="-16" r="${1 - i * .15}" fill="#e1f5fe" opacity="0"/>`).join("");
  const caust = [14, 30, 52, 70, 92].map((x, i) => `<path class="nta-caust ntd${i + 1}" d="M${x} 102 q3 -2 6 0 q3 2 6 0" stroke="#e1f5fe" stroke-width=".8" fill="none"/>`).join("");
  const txt = on ? c.lcd || "" : "";
  return `<defs><pattern id="${tp}" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="#8fd0ec"/><path d="M5 0V5M0 5H5" stroke="#6fbbe0" stroke-width=".5"/></pattern>
${ntV(w, "#4fc3f7", "#0277bd")}${ntV(bd, "#ffffff", "#b0bec5")}${ntV(dk, "#efe5d0", "#d6c7a7")}</defs>
<rect x="0" y="20" width="120" height="8" fill="url(#${dk})"/><rect x="0" y="27" width="120" height="1.2" fill="#b9a988"/>
<rect x="6" y="28" width="108" height="80" fill="#cfd8dc"/>
<rect x="8" y="28" width="104" height="78" fill="url(#${tp})"/>
<rect x="8" y="35" width="104" height="71" fill="url(#${w})" opacity=".72"/>
<path class="nta-bob" d="M8 35 q6.5 -1.6 13 0 t13 0 t13 0 t13 0 t13 0 t13 0 t13 0 t13 0" stroke="#e1f5fe" stroke-width="1.2" fill="none"/>
${caust}
<rect x="6" y="106" width="108" height="3" fill="#90a4ae"/>
${cablePath}
<ellipse cx="76" cy="35.4" rx="3" ry="1.8" fill="#ffca28" stroke="#c49000" stroke-width=".4"/>
<g transform="translate(${on ? x0 : 46} 98)">${anim}<g>${flip}${robot}<g class="nt-run">${bubbles}</g></g></g>
<rect x="86" y="5" width="32" height="16" rx="2" fill="#eceff2" stroke="#aab2bc" stroke-width=".5"/>
${ntLcd(88.5, 7, 27, 11.6, txt, on, "#4fc3f7", ntFit(txt, 27, 7.8))}
<circle cx="116" cy="19" r=".9" fill="${on ? "#76ff03" : "#9aa1ab"}"/>`;
}

// Underfloor heating: a corner of the room, the tiles cut open over the loop
function ntFloor(c) {
  const wl = ntId(), tl = ntId(), gl = ntId();
  const on = c.on, electric = c.electric;
  const P = (u, v) => [22 + 96 * u - 20 * v, 60 + 36 * v];
  const pt = (u, v) => P(u, v).map((x) => x.toFixed(1)).join(" ");
  const poly = (pts, fill, extra = "") => `<polygon points="${pts.map(([u, v]) => pt(u, v)).join(" ")}" fill="${fill}" ${extra}/>`;
  const grout = [1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${pt(i / 8, 0)} L${pt(i / 8, 1)}" stroke="#bfb5a4" stroke-width=".5"/>`).join("") +
    [1, 2, 3, 4].map((j) => `<path d="M${pt(0, j / 5)} L${pt(1, j / 5)}" stroke="#bfb5a4" stroke-width=".5"/>`).join("");
  const u0 = .4, v0 = .34;
  const runs = [.44, .54, .64, .74, .84, .94];
  let d = `M${pt(.47, runs[0])}`;
  runs.forEach((v, i) => {
    const end = i % 2 ? .47 : .95;
    d += ` L${pt(end, v)}`;
    if (i < runs.length - 1) d += ` Q${pt(end === .95 ? 1.01 : .41, (v + runs[i + 1]) / 2)} ${pt(end, runs[i + 1])}`;
  });
  const pipeColor = electric ? (on ? "#ff7043" : "#8d6e63") : (on ? "#e53935" : "#b0857c");
  const mesh = electric
    ? Array.from({ length: 7 }, (_, i) => { const u = u0 + (1 - u0) * (i + .5) / 7; return `<path d="M${pt(u, v0)} L${pt(u, 1)}" stroke="#fff" stroke-width=".35" opacity=".8"/>`; }).join("") +
      Array.from({ length: 6 }, (_, j) => { const v = v0 + (1 - v0) * (j + .5) / 6; return `<path d="M${pt(u0, v)} L${pt(1, v)}" stroke="#fff" stroke-width=".35" opacity=".8"/>`; }).join("")
    : "";
  const layers = electric
    ? [[0, 2, "#d9cfbf"], [2, 4, "#9e9e9e"], [4, 12, "#a8a196"], [12, 17, "#f2e3a0"], [17, 20, "#8a8f96"]]
    : [[0, 2, "#d9cfbf"], [2, 11, "#a8a196"], [11, 17, "#f2e3a0"], [17, 20, "#8a8f96"]];
  const front = layers.map(([a, b, col]) => `<rect x="2" y="${96 + a}" width="96" height="${b - a}" fill="${col}"/>`).join("") +
    layers.map(([a, b, col]) => `<polygon points="98 ${96 + a} 118 ${60 + a} 118 ${60 + b} 98 ${96 + b}" fill="${col}" opacity=".78"/>`).join("");
  const dots = electric
    ? Array.from({ length: 12 }, (_, i) => `<circle cx="${7 + i * 8}" cy="99" r=".9" fill="${pipeColor}"/>`).join("")
    : Array.from({ length: 12 }, (_, i) => `<circle cx="${7 + i * 8}" cy="102.5" r="1.7" fill="${i % 2 ? (on ? "#1e88e5" : "#7f97ad") : pipeColor}" stroke="#fff" stroke-width=".3"/>`).join("");
  const studs = electric ? "" : Array.from({ length: 16 }, (_, i) => `<rect x="${3 + i * 6}" y="105.5" width="3" height="1.4" rx=".5" fill="#e0cf7c"/>`).join("");
  const manifold = electric ? "" : `<rect x="18" y="20" width="9" height="11" rx="2" fill="#c62828"/><circle cx="22.5" cy="25.5" r="3" fill="#ef9a9a"/>
<g class="${on ? "nta-spin-slow" : ""}">${ntFlake(22.5, 25.5, 2.2, "#b71c1c", .7)}</g>
<rect x="27" y="24" width="33" height="3.6" rx="1.2" fill="#d32f2f"/>
<rect x="27" y="36" width="33" height="3.6" rx="1.2" fill="#1e88e5"/>
${[0, 1, 2, 3].map((k) => { const x = 33 + k * 7.5; return `<rect x="${x - 1.4}" y="15.5" width="2.8" height="8.5" rx="1" fill="#e3f2fd" stroke="#90a4ae" stroke-width=".4"/>
<rect class="nta-bob" x="${x - 1}" y="${on ? 17.6 : 21.4}" width="2" height="2" fill="#e53935"/>
<circle cx="${x + 2.6}" cy="41.6" r="1.6" fill="#263238"/>
<path d="M${x - 1.2} 27.6 V60" stroke="${on ? "#ef5350" : "#c08a84"}" stroke-width="1.6"/><path d="M${x + 1.2} 39.6 V60" stroke="${on ? "#42a5f5" : "#8fa6bb"}" stroke-width="1.6"/>`; }).join("")}`;
  const waves = [[.18, .3], [.5, .2], [.75, .5], [.32, .7], [.62, .8], [.88, .15]].map(([u, v], i) => { const [x, y] = P(u, v); return `<path class="nta-heat ntd${i + 1}" d="M${x.toFixed(1)} ${y.toFixed(1)} q-1.6 -2.6 0 -5.2 q1.6 -2.6 0 -5.2" stroke="#ff8a65" stroke-width="1.1" fill="none" stroke-linecap="round" opacity="0"/>`; }).join("");
  const txt = c.lcd || "";
  return `<defs>${ntV(wl, "#f5f7fa", "#e3e8ee")}${ntV(tl, "#f1ece3", "#ddd4c4")}${ntBlur(gl, 1.1)}</defs>
<polygon points="22 4 118 4 118 60 22 60" fill="url(#${wl})"/>
<rect x="22" y="56" width="96" height="4" fill="#fff" stroke="#d7dce3" stroke-width=".4"/>
${manifold}
${poly([[0, 0], [1, 0], [1, 1], [0, 1]], `url(#${tl})`)}${grout}
<g class="nt-run">${poly([[0, 0], [1, 0], [1, 1], [0, 1]], "#ff7043", `class="nta-warm" opacity=".1"`)}</g>
${poly([[u0, v0], [1, v0], [1, 1], [u0, 1]], electric ? "#9e9e9e" : "#a8a196")}
${mesh}
<g class="nt-run"><path d="${d}" stroke="${pipeColor}" stroke-width="${electric ? 3.4 : 4.4}" fill="none" opacity=".45" filter="url(#${gl})"/></g>
<path d="${d}" stroke="${pipeColor}" stroke-width="${electric ? 1.1 : 2.2}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
${electric ? "" : `<g class="nt-run"><path class="nta-flow" d="${d}" stroke="#ffcdd2" stroke-width=".8" stroke-dasharray="2 5" fill="none"/></g>`}
<polygon points="${pt(u0, v0)} ${pt(1, v0)} ${P(1, v0)[0].toFixed(1)} ${(P(1, v0)[1] + 1.8).toFixed(1)} ${P(u0, v0)[0].toFixed(1)} ${(P(u0, v0)[1] + 1.8).toFixed(1)}" fill="#a39886"/>
<polygon points="${pt(u0, v0)} ${pt(u0, 1)} ${(P(u0, 1)[0] + 1.6).toFixed(1)} ${P(u0, 1)[1].toFixed(1)} ${(P(u0, v0)[0] + 1.6).toFixed(1)} ${(P(u0, v0)[1] + 1.8).toFixed(1)}" fill="#b8ad9b"/>
${front}${dots}${studs}
<g class="nt-run">${waves}</g>
<rect x="82" y="14" width="33" height="30" rx="3" fill="#ffffff" stroke="#c3c9d1" stroke-width=".6"/>
${ntLcd(84.5, 17, 28, 13, txt, true, on ? "#ffb74d" : "#90a4ae", ntFit(txt, 28, 7.4))}
<path d="M89 39 q-2 -2.6 0 -5 q.6 2 2 2.4 q1 1.4 0 2.6 Z" fill="${on ? "#ff7043" : "#c3c9d1"}"/>
<circle cx="101" cy="37" r="2.2" fill="#eceff1" stroke="#b0bec5" stroke-width=".4"/><circle cx="108" cy="37" r="2.2" fill="#eceff1" stroke="#b0bec5" stroke-width=".4"/>
<path d="M99.8 37h2.4M106.8 37h2.4M108 35.8v2.4" stroke="#607d8b" stroke-width=".5"/>
${electric ? `<path d="M98.5 44 V58" stroke="#78909c" stroke-width=".9"/>` : ""}`;
}

// Square spa, three-quarter view
function ntSpa(c) {
  const wa = ntId(), rim = ntId(), cl = ntId(), gl = ntId(), sd = ntId();
  const P = (u, v) => [30 + 80 * u - 22 * v, 40 + 22 * v];
  const pt = (u, v) => P(u, v).map((x) => x.toFixed(1)).join(" ");
  const roundQuad = (a0, a1, b0, b1, dy = 0) => {
    const k = [[a0, b0], [a1, b0], [a1, b1], [a0, b1]].map(([u, v]) => { const [x, y] = P(u, v); return [x, y + dy]; });
    const lerp = (a, b, q) => [a[0] + (b[0] - a[0]) * q, a[1] + (b[1] - a[1]) * q];
    let d = "";
    k.forEach((p, i) => { const prev = k[(i + 3) % 4], next = k[(i + 1) % 4]; const a = lerp(p, prev, .16), b = lerp(p, next, .16); d += `${i ? "L" : "M"}${a[0].toFixed(1)} ${a[1].toFixed(1)} Q${p[0].toFixed(1)} ${p[1].toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)} `; });
    return d + "Z";
  };
  const glow = c.lit || c.bubbles;
  const slatsF = Array.from({ length: 13 }, (_, i) => `<path d="M${14 + i * 6} 63.5 V96" stroke="#3e3128" stroke-width=".6" opacity=".55"/>`).join("");
  const slatsS = Array.from({ length: 5 }, (_, i) => { const q = (i + 1) / 6; return `<path d="M${(88 + 22 * q).toFixed(1)} ${(63.5 - 22 * q).toFixed(1)} V${(96 - 22 * q).toFixed(1)}" stroke="#2f251e" stroke-width=".6" opacity=".55"/>`; }).join("");
  const bubbles = [[.3, .4], [.5, .3], [.7, .45], [.4, .62], [.62, .66], [.22, .55], [.8, .6], [.52, .5]].map(([u, v], i) => { const [x, y] = P(u, v); return `<circle class="nta-pop ntd${(i % 6) + 1}" cx="${x.toFixed(1)}" cy="${(y + 2).toFixed(1)}" r="${1.4 + (i % 3) * .5}" fill="none" stroke="#e0f7fa" stroke-width=".7" opacity="0"/>`; }).join("");
  const steam = [[.35, .4], [.55, .35], [.72, .5]].map(([u, v], i) => { const [x, y] = P(u, v); return `<path class="nta-steam ntd${i + 1}" d="M${x.toFixed(1)} ${(y - 2).toFixed(1)} q-2 -3 0 -6 q2 -3 0 -6" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round" opacity="0"/>`; }).join("");
  const jets = [.25, .4, .6, .75].map((u) => { const [x, y] = P(u, .14); return `<circle cx="${x.toFixed(1)}" cy="${(y + .8).toFixed(1)}" r=".8" fill="#78909c"/>`; }).join("");
  const [hx1, hy1] = P(.12, .15), [hx2, hy2] = P(.86, .15);
  const [gx, gy] = P(.5, .52);
  const txt = c.lcd || "";
  return `<defs>${ntV(wa, glow ? "#4dd0e1" : "#4f8fa3", glow ? "#0097a7" : "#1f5568")}${ntV(rim, "#f4f6f8", "#cfd6dd")}${ntV(cl, "#6d5848", "#4a3b30")}${ntBlur(gl, 3)}${ntV(sd, "#5a483b", "#3a2e26")}</defs>
${ntFoot("7 97.2 89 97.2 111.5 74.8 30 74.8")}${ntFoot("9.5 106 40 106 49 96.8 20 96.8")}
<polygon points="88 62 110 40 110 74 88 96" fill="url(#${sd})"/>${slatsS}
<rect x="8" y="62" width="80" height="34" fill="url(#${cl})"/>${slatsF}
<rect x="8" y="62" width="4" height="34" fill="#3a2e26"/><rect x="84" y="62" width="4" height="34" fill="#3a2e26"/>
<polygon points="8 62 88 62 88 64.4 8 64.4" fill="#9ea7b0"/>
<polygon points="20 89 48 89 39 98 11 98" fill="#8a7260"/>
<polygon points="11 98 39 98 39 105 11 105" fill="#5a483b"/><path d="M11 101.5h28" stroke="#2f251e" stroke-width=".45" opacity=".6"/>
<polygon points="39 98 48 89 48 96 39 105" fill="#3f322a"/>
<polygon points="20 82 48 82 43.5 86.5 15.5 86.5" fill="#9a8270"/>
<polygon points="15.5 86.5 43.5 86.5 43.5 93.5 15.5 93.5" fill="#5a483b"/><path d="M15.5 90h28" stroke="#2f251e" stroke-width=".45" opacity=".6"/>
<polygon points="43.5 86.5 48 82 48 89 43.5 93.5" fill="#3f322a"/>
<path d="M20 82H48M11 98H39" stroke="#b39d8a" stroke-width=".5"/>
<polygon points="88 62 110 40 110 42.4 88 64.4" fill="#8a939c"/>
<polygon points="${pt(0, 0)} ${pt(1, 0)} ${pt(1, 1)} ${pt(0, 1)}" fill="url(#${rim})" stroke="#aab4be" stroke-width=".5"/>
<path d="${roundQuad(.07, .93, .12, .88)}" fill="#dfe8ed" stroke="#b0bec5" stroke-width=".5"/>
${jets}
<path d="${roundQuad(.1, .9, .18, .85, 2)}" fill="url(#${wa})"/>
${glow ? `<ellipse class="nta-glow" cx="${gx.toFixed(1)}" cy="${(gy + 2).toFixed(1)}" rx="20" ry="5" fill="#b2ebf2" filter="url(#${gl})"/>` : ""}
<path d="${roundQuad(.17, .83, .3, .74, 2)}" fill="none" stroke="#ffffff" stroke-width=".6" opacity=".35"/>
<rect x="${(hx1 - 3).toFixed(1)}" y="${(hy1 - 1.4).toFixed(1)}" width="7" height="3" rx="1.5" fill="#37474f"/>
<rect x="${(hx2 - 3).toFixed(1)}" y="${(hy2 - 1.4).toFixed(1)}" width="7" height="3" rx="1.5" fill="#37474f"/>
${c.bubbles ? `<g class="nt-run">${bubbles}</g>` : ""}${c.steam ? `<g class="nt-run">${steam}</g>` : ""}
<rect x="58" y="67" width="27" height="15" rx="1.8" fill="#263238"/>
${ntLcd(59.5, 68.5, 24, 12, txt, true, c.heating ? "#ffb74d" : "#80deea", ntFit(txt, 24, 8.6))}`;
}

// Sauna cabin with a glass door: the stones glow and steam rises inside
function ntSauna(c) {
  const g = ntId(), cp = ntId(), gl = ntId(), inside = ntId(), st = ntId();
  const on = c.on;
  const planks = Array.from({ length: 14 }, (_, i) => { const y = 24 + i * 6; return `<rect x="10" y="${y}" width="90" height="6" fill="${i % 2 ? "#c48d58" : "#cf9963"}"/><path d="M12 ${y + 3} q14 -1.2 28 0 t28 0 t30 .4" stroke="#a8713f" stroke-width=".35" fill="none" opacity=".7"/>`; }).join("");
  const side = Array.from({ length: 14 }, (_, i) => `<polygon points="100 ${24 + i * 6} 112 ${16 + i * 6} 112 ${22 + i * 6} 100 ${30 + i * 6}" fill="${i % 2 ? "#9c6b3f" : "#a87447"}"/>`).join("");
  const stones = [[42, 79], [46, 78], [50, 79.4], [44, 76], [48, 75.6], [46.2, 73.8], [40.6, 76.6], [51.4, 76.4]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="2.2" fill="${on ? ["#ff7043", "#ff8a65", "#f4511e"][i % 3] : ["#78716c", "#8b8580", "#6b6560"][i % 3]}" stroke="${on ? "#bf360c" : "#57524d"}" stroke-width=".4"/>`).join("");
  const steam = [[44, 70], [48, 69], [40, 71], [50, 66]].map(([x, y], i) => `<path class="nta-steam ntd${i + 1}" d="M${x} ${y} q-2 -3 0 -6 q2 -3 0 -6" stroke="#fff3e0" stroke-width="2" fill="none" stroke-linecap="round" opacity="0"/>`).join("");
  // The dial reads from 0 to 120 degrees over 240 of its turn.
  const deg = c.temp === null || c.temp === undefined ? -120 : -120 + Math.max(0, Math.min(120, c.temp)) * 2;
  const txt = c.lcd || "";
  return `<defs>${ntV(g, on ? "#a35a26" : "#4b3223", on ? "#6d3b19" : "#2b1d14")}${ntBlur(gl, 2.4)}<clipPath id="${cp}"><rect x="18" y="32" width="36" height="71"/></clipPath>${ntV(st, "#5d6670", "#363c43")}
<radialGradient id="${inside}" cx=".5" cy=".1" r=".9"><stop offset="0" stop-color="#ffcc80" stop-opacity="${on ? .75 : 0}"/><stop offset="1" stop-color="#ffcc80" stop-opacity="0"/></radialGradient></defs>
${ntFoot("8 110.6 101.5 110.6 113.5 101.6 21 101.6")}
${side}
<path d="M7 18 L19 10 L115 10 L103 18 Z" fill="#7b4f2d"/><path d="M103 18 L115 10 L115 16 L103 24 Z" fill="#5b3a22"/>
<rect x="7" y="18" width="96" height="6" fill="#8d5a34"/>
${planks}
<rect x="15" y="29" width="42" height="77" rx="1" fill="#8d5a34"/>
<g clip-path="url(#${cp})">
<rect x="18" y="32" width="36" height="71" fill="url(#${g})"/>
${Array.from({ length: 12 }, (_, i) => `<path d="M18 ${36 + i * 6}h36" stroke="#000" stroke-width=".4" opacity=".25"/>`).join("")}
<rect x="18" y="32" width="36" height="71" fill="url(#${inside})"/>
<rect x="18" y="58" width="36" height="4" fill="#d9a46d"/><rect x="18" y="62" width="36" height="7" fill="#b07a46"/>
<path d="M18 64.5h36M18 67h36" stroke="#8d5a34" stroke-width=".4"/>
<rect x="18" y="84" width="20" height="3.4" fill="#d9a46d"/><rect x="18" y="87.4" width="20" height="15.6" fill="#b07a46"/>
<path d="M22 78 h8 l-1 6 h-6 Z" fill="#a1663a" stroke="#6d4123" stroke-width=".4"/><path d="M22.4 80h7.2M22.7 82.4h6.6" stroke="#cfd8dc" stroke-width=".6"/>
<path d="M28 79 L33 70" stroke="#6d4123" stroke-width=".9" stroke-linecap="round"/>
<rect x="39" y="80" width="14" height="23" rx="1" fill="url(#${st})"/>
${[41.5, 44.5, 47.5, 50.5].map((x) => `<path d="M${x} 81v21" stroke="#22272c" stroke-width=".8"/>`).join("")}
${on ? `<ellipse class="nta-glow" cx="46" cy="77" rx="9" ry="5" fill="#ff7043" filter="url(#${gl})"/>` : ""}
${stones}<g class="nt-run">${steam}</g>
</g>
<rect x="18" y="32" width="36" height="71" fill="#3b2412" opacity="${on ? .18 : .35}"/>
<path d="M20 34 L30 34 L20 60 Z" fill="#fff" opacity=".14"/>
<rect x="19.6" y="50" width="3.6" height="26" rx="1.6" fill="#e2b07a" stroke="#8d5a34" stroke-width=".5"/>
<rect x="63" y="32" width="33" height="25" rx="2.2" fill="#263238"/>
${ntLcd(65.5, 35, 28, 13, txt, true, on ? "#ff9800" : "#90a4ae", ntFit(txt, 28, 9.4))}
<circle cx="70" cy="52.6" r="1.4" fill="${on ? "#ff7043" : "#546e7a"}"/><circle cx="79.5" cy="52.6" r="1.4" fill="#546e7a"/><circle cx="89" cy="52.6" r="1.4" fill="#546e7a"/>
<circle cx="79.5" cy="77" r="11" fill="#8d5a34"/><circle cx="79.5" cy="77" r="9.2" fill="#fbf3e6"/>
${Array.from({ length: 11 }, (_, i) => `<path d="M79.5 69.4 V71.2" stroke="#6d4c41" stroke-width=".6" transform="rotate(${-120 + i * 24} 79.5 77)"/>`).join("")}
<path d="M73 77.5 A6.6 6.6 0 0 1 75 72" stroke="#42a5f5" stroke-width="1" fill="none"/><path d="M84 72 A6.6 6.6 0 0 1 86 77.5" stroke="#ef5350" stroke-width="1" fill="none"/>
<text x="79.5" y="83.6" font-size="3.6" text-anchor="middle" fill="#6d4c41" font-weight="700" ${NT_FONT}>\u00b0C</text>
<path d="M79.5 77 V69.8" stroke="#c62828" stroke-width=".9" stroke-linecap="round" transform="rotate(${deg} 79.5 77)"/><circle cx="79.5" cy="77" r="1.2" fill="#3e2723"/>
<rect x="9" y="106" width="92" height="4" fill="#6d4123"/>`;
}

// Planted aquarium on its cabinet
function ntAquarium(c) {
  const wa = ntId(), cab = ntId(), sand = ntId(), ray = ntId(), gl = ntId();
  const on = c.on;
  const neon = (x, y) => `<g transform="translate(${x} ${y})"><ellipse rx="2.8" ry="1" fill="#cfd8dc"/><path d="M-2.4 -.2 H1.8" stroke="#00b0ff" stroke-width=".7"/><path d="M-2.6 .35 H0" stroke="#ff1744" stroke-width=".6"/><path d="M2.6 0 l1.4 -1 v2 Z" fill="#cfd8dc"/></g>`;
  const angel = `<g transform="translate(46 50)"><path d="M6 0 L0 -4.5 L-2 -12 L-3.2 -3.5 L-7 -1.2 L-7.6 1.2 L-3.2 3.5 L-2 12 L0 4.5 Z" fill="#eceff1" stroke="#90a4ae" stroke-width=".4"/><path d="M-.2 -4.4 V4.4 M-3 -3 V3 M2.6 -2.4 V2.4" stroke="#37474f" stroke-width=".9"/><circle cx="3.6" cy="-.6" r=".7" fill="#212121"/></g>`;
  const platy = `<g transform="translate(34 70)"><path d="M4 0 Q0 -3 -3 0 Q0 3 4 0 Z" fill="#ff8f00"/><path d="M-3 0 L-6 -2.4 L-6 2.4 Z" fill="#ffb300"/><circle cx="2.4" cy="-.4" r=".5" fill="#212121"/></g>`;
  const grassLeaves = [18, 21, 24, 27, 30].map((x, i) => `<path class="nta-sway ntd${i + 1}" d="M${x} 82 C${x - 3} 66 ${x + 3} 52 ${x - 1} 36" stroke="${["#2e7d32", "#43a047", "#388e3c"][i % 3]}" stroke-width="1.3" fill="none"/>`).join("");
  const redPlant = `<g class="nta-sway ntd3"><path d="M82 82 V48" stroke="#8d3a2b" stroke-width=".8"/>${[50, 56, 62, 68, 74].map((y) => `<ellipse cx="79.6" cy="${y}" rx="2.6" ry="1" fill="#e64a19" transform="rotate(-20 79.6 ${y})"/><ellipse cx="84.4" cy="${y + 1.5}" rx="2.6" ry="1" fill="#ff7043" transform="rotate(20 84.4 ${y + 1.5})"/>`).join("")}</g>`;
  const carpet = Array.from({ length: 20 }, (_, i) => `<circle cx="${40 + i * 2.2}" cy="${81.6 - (i % 3) * .5}" r="1.1" fill="${i % 2 ? "#66bb6a" : "#7cb342"}"/>`).join("");
  const bubbles = [0, 1, 2, 3].map((i) => `<circle class="nta-rise ntd${i + 1}" cx="${64 + (i % 2) * .8}" cy="76" r="${(.9 - i * .1).toFixed(1)}" fill="#e1f5fe" opacity="0"/>`).join("");
  return `<defs>${ntV(wa, on ? "#b3e5fc" : "#2c3f4c", on ? "#1976d2" : "#0f1d27")}${ntV(cab, "#5d4037", "#3e2723")}${ntV(sand, "#e8d6ad", "#c2a76f")}${ntBlur(gl, 1.4)}
<linearGradient id="${ray}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
${ntShadow(60, 111.4, 47)}
<rect x="16" y="88" width="88" height="23" rx="1.5" fill="url(#${cab})"/>
<path d="M60 90v19" stroke="#2b1b17" stroke-width=".7"/><circle cx="57.4" cy="99" r="1" fill="#bcaaa4"/><circle cx="62.6" cy="99" r="1" fill="#bcaaa4"/>
<rect x="13" y="20" width="94" height="5" rx="1.5" fill="#263238"/>
<rect x="16" y="24.4" width="88" height="1.3" rx=".6" fill="${on ? "#e3f2fd" : "#455a64"}"/>
${on ? `<rect x="16" y="24" width="88" height="2.4" fill="#e3f2fd" filter="url(#${gl})"/>` : ""}
<rect x="14" y="26" width="92" height="60" fill="url(#${wa})"/>
${on ? `<g class="nta-rays"><polygon points="28 26 36 26 30 84 20 84" fill="url(#${ray})"/><polygon points="54 26 61 26 58 84 48 84" fill="url(#${ray})"/><polygon points="82 26 88 26 90 84 80 84" fill="url(#${ray})"/></g>` : ""}
<path d="M14 40 q10 -6 20 0 t20 0 t20 0 t20 0 t12 -2 V86 H14 Z" fill="#000" opacity="${on ? .06 : .2}"/>
<rect x="17" y="34" width="2.8" height="34" rx="1.4" fill="#cfd8dc" opacity=".7"/><rect x="17.4" y="34" width="2" height="5" rx="1" fill="${c.heater ? "#ff5722" : "#78909c"}"/>
<rect x="96" y="32" width="8" height="30" rx="1.5" fill="#263238"/><path d="M97.6 36v22M100 36v22M102.4 36v22" stroke="#455a64" stroke-width=".7"/>
${grassLeaves}${redPlant}
<path d="M88 84 C86 74 92 70 98 66 M92 74 L99 72 M90 78 L84 70" stroke="#6d4c41" stroke-width="2.4" fill="none" stroke-linecap="round"/>
<path d="M30 86 Q30 76 38 75 Q46 76 46 86 Z" fill="#78909c"/><path d="M33 80 Q37 77 41 79" stroke="#b0bec5" stroke-width=".6" fill="none"/>
<path d="M14 82 q6 -2 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t8 0 V86 H14 Z" fill="url(#${sand})"/>${carpet}
<circle cx="64" cy="83" r="1.6" fill="#90a4ae"/><g class="nt-run">${bubbles}</g>
<g class="nta-swim">${angel}</g>
<g class="nta-swimB"><g>${neon(76, 44)}${neon(80, 41)}${neon(83, 45.6)}${neon(78, 48)}${neon(86, 42.4)}</g></g>
<g class="nta-swim ntd3">${platy}</g>
${on ? "" : `<rect x="14" y="26" width="92" height="60" fill="#06121b" opacity=".35"/>`}
<path d="M20 28 L30 28 L18 60 Z" fill="#fff" opacity=".1"/>
<rect x="13" y="85" width="94" height="4" rx="1" fill="#263238"/>
<rect x="13.4" y="25.4" width="93.2" height="60.4" fill="none" stroke="#90a4ae" stroke-width=".7" opacity=".7"/>
${c.lcd ? `<rect x="71" y="64" width="31" height="13" rx="2" fill="#eceff1" stroke="#90a4ae" stroke-width=".5"/>${ntLcd(72.5, 65.4, 28, 10.2, c.lcd, true, "#69f0ae", ntFit(c.lcd, 28, 7.2))}` : ""}`;
}

// Linky meter on its wall
// The meter's pulse LED: red on what is drawn, green on what is fed in (#77),
// and the arrow that points back to the grid.
function ntPulse(c) { return c.exp ? "#00e676" : "#ff1744"; }
function ntExportArrow(x, y) {
  return `<path d="M${x} ${y} l3.6 -2.6 v1.6 h4 v2 h-4 v1.6 Z" fill="#2e7d32"/>`;
}
function ntLinky(c) {
  const b = ntId(), cv = ntId(), sc = ntId(), sh = ntId();
  const val = c.lcd || "";
  return `<defs>${ntV(b, "#d9e36a", "#bccb3d")}${ntV(cv, "#c3d03f", "#a4b22c")}${ntV(sc, "#c7d1b8", "#a8b598")}<filter id="${sh}" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1.8"/></filter></defs>
<rect x="33.6" y="8" width="56" height="106" rx="8" fill="#000" opacity=".22" filter="url(#${sh})"/>
<rect x="32" y="6" width="56" height="106" rx="8" fill="url(#${b})" stroke="#9aa82a" stroke-width=".6"/>
<path d="M36 10 H50" stroke="#fff" stroke-width="1.4" opacity=".55" stroke-linecap="round"/>
<rect x="37" y="14" width="46" height="28" rx="2.4" fill="#5a6347"/>
<rect x="39" y="16" width="42" height="24" rx="1.4" fill="url(#${sc})"/>
<text x="41.5" y="23.4" font-size="6" font-weight="700" fill="#1f2a18" ${NT_FONT}>${esc(c.label || "")}</text>
${c.tariff ? `<text x="78.5" y="23.4" font-size="4.6" text-anchor="end" fill="#1f2a18" ${NT_FONT}>${esc(c.tariff)}</text>` : ""}
<text x="60" y="35.4" font-size="${ntFit(val, 42, 10).toFixed(1)}" font-weight="700" text-anchor="middle" fill="#1f2a18" ${NT_FONT}>${esc(val)}</text>
<circle cx="45" cy="50" r="3.6" fill="#eef3c7" stroke="#8c9a24" stroke-width=".6"/><path d="M43.2 50h3.6M45 48.2v3.6" stroke="#4b5320" stroke-width=".7"/>
<circle cx="56" cy="50" r="3.6" fill="#eef3c7" stroke="#8c9a24" stroke-width=".6"/><path d="M54.2 50h3.6" stroke="#4b5320" stroke-width=".7"/>
<circle cx="74" cy="50" r="2.4" fill="${c.exp ? "#0d3d1a" : "#5d1010"}"/>${c.unav || c.still ? "" : `<circle class="${c.heavy ? "nta-blinkfast" : "nta-blink"}" cx="74" cy="50" r="2.4" fill="${ntPulse(c)}"/>`}${c.exp ? ntExportArrow(62.4, 50) : ""}
<text x="74" y="57.4" font-size="3.6" text-anchor="middle" fill="#4b5320" ${NT_FONT}>1 Wh</text>
<path d="M32 62 H88" stroke="#8c9a24" stroke-width=".7"/>
<rect x="34" y="64" width="52" height="40" rx="4" fill="url(#${cv})"/>
<text x="60" y="84" font-size="11" font-weight="700" font-style="italic" text-anchor="middle" fill="#ffffff" ${NT_FONT}>linky</text>
<path d="M45 87.4 Q60 92 76 86" stroke="#ffffff" stroke-width="1.1" fill="none" stroke-linecap="round"/>
<circle cx="38.6" cy="68.4" r="1.4" fill="#8c9a24"/><circle cx="81.4" cy="68.4" r="1.4" fill="#8c9a24"/>
<path d="M81.4 69.8 q2 6 -1 10" stroke="#1565c0" stroke-width=".5" fill="none"/><rect x="78.8" y="79.4" width="3.6" height="2.4" rx=".5" fill="#1565c0"/>
<path d="M48 112 V122" stroke="#5d4037" stroke-width="3"/><path d="M56 112 V122" stroke="#1565c0" stroke-width="3"/><path d="M64 112 V122" stroke="#5d4037" stroke-width="3"/><path d="M72 112 V122" stroke="#1565c0" stroke-width="3"/>`;
}

// A meter's index on rolling drums: whole units in white on black, the
// fraction in red, the last drum turning while something flows (#68).
function ntDrums(x, y, cw, h, text, dec, on) {
  const [ip, fp = ""] = String(text || "").split(".");
  const whole = ip.replace(/\D/g, "").slice(-5).padStart(5, "0");
  const frac = fp.replace(/\D/g, "").slice(0, dec).padEnd(dec, "0");
  const cells = (whole + frac).split("");
  const cid = ntId();
  let out = `<defs><clipPath id="${cid}"><rect x="${x + (cells.length - 1) * cw + .4}" y="${y + .4}" width="${cw - .8}" height="${h - .8}"/></clipPath></defs>`;
  cells.forEach((d, i) => {
    const red = i >= 5;
    const cx = x + i * cw;
    out += `<rect x="${cx + .4}" y="${y + .4}" width="${cw - .8}" height="${h - .8}" rx=".6" fill="${red ? "#b71c1c" : "#15191d"}"/>`;
    if (i === cells.length - 1) {
      // The last drum: ten figures stacked, rolling up while on.
      const col = Array.from({ length: 11 }, (_, k) => `<text x="${cx + cw / 2}" y="${(y + h * .76 + k * h).toFixed(2)}" font-size="${(h * .72).toFixed(2)}" font-weight="700" text-anchor="middle" fill="#fff" ${NT_FONT}>${(Number(d) + k) % 10}</text>`).join("");
      out += `<g clip-path="url(#${cid})"><g class="${on ? "nta-roll" : ""}" style="--roll:${-10 * h}px">${col}</g></g>`;
    } else {
      out += `<text x="${cx + cw / 2}" y="${(y + h * .76).toFixed(2)}" font-size="${(h * .72).toFixed(2)}" font-weight="700" text-anchor="middle" fill="#fff" ${NT_FONT}>${d}</text>`;
    }
  });
  return out + `<rect x="${x}" y="${y}" width="${cells.length * cw}" height="${h}" rx="1" fill="none" stroke="#0b0d10" stroke-width=".8"/>
<rect x="${x}" y="${y}" width="${cells.length * cw}" height="${(h * .35).toFixed(2)}" fill="#fff" opacity=".08"/>`;
}
const ntCable = (x0, n) => Array.from({ length: n }, (_, i) => `<path d="M${x0 + i * 8} 108 V122" stroke="${i % 2 ? "#1565c0" : "#5d4037"}" stroke-width="3"/>`).join("");
// A digital electricity meter on its wall: its display, a pulse LED, its
// plate and its cables.
function ntMeterBox(c) {
  const b = ntId(), sh = ntId();
  return `<defs>${ntV(b, "#f5f7f9", "#d3d9df")}${ntBlur(sh, 2.2)}</defs>
<rect x="31.6" y="9.4" width="60" height="98" rx="6" fill="#000" opacity=".2" filter="url(#${sh})"/>
<rect x="30" y="8" width="60" height="98" rx="6" fill="url(#${b})" stroke="#a7b0b9" stroke-width=".7"/>
<path d="M34 12 H52" stroke="#fff" stroke-width="1.4" opacity=".7" stroke-linecap="round"/>
<rect x="35" y="15" width="50" height="30" rx="2.6" fill="#3c4550"/>
${ntLcd(37, 17, 46, 17, c.lcd, !c.unav, "#9be7ff", ntFit(c.lcd, 46, 10))}
${c.today ? `<text x="60" y="41.4" font-size="${ntFit(c.today, 44, 5).toFixed(1)}" text-anchor="middle" fill="#c8d2dc" ${NT_FONT}>${esc(c.today)}</text>` : ""}
<circle cx="42" cy="54" r="2.4" fill="${c.exp ? "#0d3d1a" : "#4a1010"}"/>${c.unav || c.still ? "" : `<circle class="${c.heavy ? "nta-blinkfast" : "nta-blink"}" cx="42" cy="54" r="2.4" fill="${ntPulse(c)}"/>`}${c.exp ? ntExportArrow(47.4, 54) : ""}
<text x="42" y="61" font-size="3.4" text-anchor="middle" fill="#5d6773" ${NT_FONT}>imp/kWh</text>
<rect x="64" y="51" width="8" height="5" rx="2.5" fill="#9aa4ae"/><rect x="75" y="51" width="8" height="5" rx="2.5" fill="#9aa4ae"/>
<rect x="38" y="66" width="44" height="24" rx="2" fill="#e9edf0" stroke="#b9c1c9" stroke-width=".5"/>
<text x="42" y="74" font-size="4.6" font-weight="700" fill="#37414b" ${NT_FONT}>kWh</text>
<text x="42" y="80" font-size="3" fill="#6b7580" ${NT_FONT}>230 V  50 Hz  5(60) A</text>
${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => `<rect x="${55 + i * 2.1}" y="83" width="${i % 3 ? .9 : 1.5}" height="5" fill="#37414b"/>`).join("")}
<rect x="34" y="94" width="52" height="12" rx="3" fill="#c7ced5" stroke="#a7b0b9" stroke-width=".5"/>
${ntCable(48, 4)}`;
}
// A North American meter: a glass dome on its socket box, a dial plate and a
// display under the glass.
function ntMeterDome(c) {
  const box = ntId(), gl = ntId(), sh = ntId(), rim = ntId();
  return `<defs>${ntV(box, "#c9d0d6", "#9aa4ad")}${ntV(rim, "#eef1f3", "#a9b2ba")}${ntBlur(sh, 2.2)}
<radialGradient id="${gl}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffffff" stop-opacity=".75"/><stop offset=".5" stop-color="#dbeaf3" stop-opacity=".25"/><stop offset="1" stop-color="#9fb8c8" stop-opacity=".4"/></radialGradient></defs>
<rect x="27.6" y="13.4" width="68" height="94" rx="8" fill="#000" opacity=".2" filter="url(#${sh})"/>
<rect x="26" y="12" width="68" height="94" rx="8" fill="url(#${box})" stroke="#8a949d" stroke-width=".7"/>
<circle cx="60" cy="56" r="31" fill="url(#${rim})" stroke="#7d8790" stroke-width=".8"/>
<circle cx="60" cy="56" r="27" fill="#f6f8f9"/>
<text x="60" y="38" font-size="5" font-weight="700" text-anchor="middle" fill="#37414b" ${NT_FONT}>kWh</text>
<text x="60" y="43" font-size="3" text-anchor="middle" fill="#6b7580" ${NT_FONT}>CL200  240V  3W</text>
${ntLcd(44, 46, 32, 14, c.lcd, !c.unav, "#9be7ff", ntFit(c.lcd, 32, 8))}
${c.today ? `<text x="60" y="68" font-size="${ntFit(c.today, 40, 4.4).toFixed(1)}" text-anchor="middle" fill="#37414b" ${NT_FONT}>${esc(c.today)}</text>` : ""}
<rect x="57.4" y="72" width="5.2" height="2.6" rx=".6" fill="${c.exp ? "#0d3d1a" : "#3b1010"}"/>${c.unav || c.still ? "" : `<rect class="${c.heavy ? "nta-blinkfast" : "nta-blink"}" x="57.4" y="72" width="5.2" height="2.6" rx=".6" fill="${ntPulse(c)}"/>`}${c.exp ? ntExportArrow(64.4, 73.3) : ""}
<circle cx="60" cy="56" r="27" fill="url(#${gl})"/>
<path d="M41 40 A24 24 0 0 1 58 31" stroke="#fff" stroke-width="2.2" fill="none" opacity=".7" stroke-linecap="round"/>
<rect x="54" y="106" width="12" height="16" fill="#8a949d"/><rect x="52" y="104" width="16" height="4" rx="1" fill="#7a848d"/>`;
}
// A diaphragm gas meter: its two pipes on top, its window of drums.
function ntGas(c) {
  const b = ntId(), sh = ntId(), p = ntId();
  const pipe = (x) => `<rect x="${x}" y="-6" width="9" height="30" fill="url(#${p})"/><rect x="${x - 2}" y="18" width="13" height="8" rx="1.4" fill="#b8892f" stroke="#8a6420" stroke-width=".5"/>`;
  return `<defs>${ntV(b, "#ecebe3", "#cdc9bb")}${ntBlur(sh, 2.4)}<linearGradient id="${p}" x1="0" x2="1"><stop offset="0" stop-color="#a6adb4"/><stop offset=".45" stop-color="#e3e7ea"/><stop offset="1" stop-color="#8d959c"/></linearGradient></defs>
${pipe(32)}${pipe(79)}
<rect x="23.6" y="27.4" width="76" height="80" rx="7" fill="#000" opacity=".2" filter="url(#${sh})"/>
<rect x="22" y="26" width="76" height="80" rx="7" fill="url(#${b})" stroke="#a8a291" stroke-width=".8"/>
<path d="M26 31 H58" stroke="#fff" stroke-width="1.6" opacity=".6" stroke-linecap="round"/>
<rect x="29" y="38" width="62" height="20" rx="3" fill="#3a3f45"/>
${ntDrums(31, 41.5, 7.25, 13, c.counter, 3, c.on && !c.unav)}
<text x="88" y="64" font-size="4.6" font-weight="700" text-anchor="end" fill="#4a4538" ${NT_FONT}>m\u00b3</text>
<text x="31" y="64" font-size="3.4" fill="#6f6857" ${NT_FONT}>G4  Qmax 6 m\u00b3/h</text>
${c.lcd ? `<text x="60" y="76" font-size="${ntFit(c.lcd, 56, 7).toFixed(1)}" font-weight="700" text-anchor="middle" fill="#4a4538" ${NT_FONT}>${esc(c.lcd)}</text>` : ""}
${c.today ? `<text x="60" y="86" font-size="${ntFit(c.today, 56, 5).toFixed(1)}" text-anchor="middle" fill="#6f6857" ${NT_FONT}>${esc(c.today)}</text>` : ""}
<rect x="30" y="92" width="60" height="8" rx="2" fill="#dcd7c8" stroke="#b5ae9b" stroke-width=".5"/>`;
}
// A water meter on its pipe: brass body, a dial with its drums, the litre
// dials and the star that turns as soon as water runs.
function ntWater(c) {
  const br = ntId(), sh = ntId(), p = ntId();
  const on = c.on && !c.unav;
  const dial = (x, y) => `<circle cx="${x}" cy="${y}" r="3.6" fill="#fff" stroke="#b71c1c" stroke-width=".6"/><g class="${on ? "nta-spin" : ""}"><path d="M${x} ${y + .6} L${x} ${y - 3}" stroke="#b71c1c" stroke-width=".9" stroke-linecap="round"/></g>`;
  const star = `<g class="${on ? "nta-spin" : ""}"><path d="M60 82 l1.3 -3.4 1.3 3.4 3.4 -1.3 -2.1 3 2.1 3 -3.4 -1.3 -1.3 3.4 -1.3 -3.4 -3.4 1.3 2.1 -3 -2.1 -3 3.4 1.3 Z" fill="#c62828"/><circle cx="60" cy="84.4" r=".9" fill="#fff"/></g>`;
  return `<defs><radialGradient id="${br}" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#f3d27c"/><stop offset=".6" stop-color="#c9952f"/><stop offset="1" stop-color="#8f6519"/></radialGradient>${ntBlur(sh, 2.4)}
<linearGradient id="${p}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3e7ea"/><stop offset=".5" stop-color="#b4bcc3"/><stop offset="1" stop-color="#7f878e"/></linearGradient></defs>
<rect x="-2" y="68" width="36" height="12" fill="url(#${p})"/><rect x="86" y="68" width="36" height="12" fill="url(#${p})"/>
<path d="M22 65 h8 l2 4 v10 l-2 4 h-8 l-2 -4 v-10 Z" fill="#c9952f" stroke="#8f6519" stroke-width=".5"/><path d="M90 65 h8 l2 4 v10 l-2 4 h-8 l-2 -4 v-10 Z" fill="#c9952f" stroke="#8f6519" stroke-width=".5"/>
<ellipse cx="61.6" cy="77.4" rx="31" ry="30" fill="#000" opacity=".2" filter="url(#${sh})"/>
<circle cx="60" cy="74" r="31" fill="url(#${br})" stroke="#7a5512" stroke-width=".8"/>
<circle cx="60" cy="74" r="25.5" fill="#1e5aa8"/>
<circle cx="60" cy="74" r="23.6" fill="#f8f8f3"/>
<text x="60" y="59" font-size="4.4" font-weight="700" text-anchor="middle" fill="#1e3a68" ${NT_FONT}>m\u00b3</text>
${ntDrums(43.6, 61, 4.1, 7.6, c.counter, 3, on)}
${dial(49, 77)}${dial(71, 77)}
${star}
<path d="M44 57 A22 22 0 0 1 60 51" stroke="#fff" stroke-width="2" fill="none" opacity=".8" stroke-linecap="round"/>
${c.lcd ? `<text x="60" y="114" font-size="${ntFit(c.lcd, 80, 7).toFixed(1)}" font-weight="700" text-anchor="middle" fill="#37414b" ${NT_FONT}>${esc(c.lcd)}</text>` : ""}
${c.today ? `<text x="60" y="122" font-size="${ntFit(c.today, 80, 5).toFixed(1)}" text-anchor="middle" fill="#6b7580" ${NT_FONT}>${esc(c.today)}</text>` : ""}`;
}

// Christmas tree: the lights, the baubles and the star in a palette
function ntTree(c) {
  const gr = ntId(), st = ntId(), gl = ntId(), pot = ntId();
  const on = c.on;
  const pal = TREE_PALETTES[c.palette] || TREE_PALETTES.multicolor;
  const tier = (yt, yb, w) => {
    let d = `M60 ${yt} L${60 + w} ${yb}`;
    const n = Math.round(w / 3.6);
    for (let i = 1; i <= 2 * n; i++) { const x = 60 + w - (i * w) / n; d += ` L${x.toFixed(1)} ${i % 2 ? yb - 3.4 : yb}`; }
    return `<path d="${d} Z" fill="url(#${gr})" stroke="#1b5e20" stroke-width=".5" stroke-linejoin="round"/>` +
      [-.6, -.3, .3, .6].map((k) => `<path d="M60 ${yt + 4} L${(60 + w * k).toFixed(1)} ${yb - 3}" stroke="#66bb6a" stroke-width=".6" opacity=".45"/>`).join("");
  };
  const tiers = [[52, 94, 44], [38, 78, 35], [24, 62, 26], [12, 45, 17]];
  let k = 0;
  const lights = tiers.map(([, yb, w]) => {
    const a = [60 - w * .78, yb - 14], m = [60 + w * .1, yb - 1], b = [60 + w * .82, yb - 7];
    const q = (s) => [(1 - s) ** 2 * a[0] + 2 * (1 - s) * s * m[0] + s * s * b[0], (1 - s) ** 2 * a[1] + 2 * (1 - s) * s * m[1] + s * s * b[1]];
    const tinsel = `<path d="M${(60 - w * .7).toFixed(1)} ${yb - 5} Q60 ${yb - 14} ${(60 + w * .72).toFixed(1)} ${yb - 12}" stroke="${pal.tinsel[k % pal.tinsel.length]}" stroke-width="1.4" stroke-dasharray="1.4 .6" fill="none" opacity=".85"/>`;
    const wire = `<path d="M${a[0].toFixed(1)} ${a[1]} Q${m[0].toFixed(1)} ${m[1]} ${b[0].toFixed(1)} ${b[1]}" stroke="#2e5e2e" stroke-width=".7" fill="none" opacity=".9"/>`;
    const bulbs = [.12, .3, .48, .66, .84].map((s) => {
      const [x, y] = q(s); const col = pal.lights[k % pal.lights.length]; const dl = `ntd${(k++ % 6) + 1}`;
      return on
        ? `<circle class="nta-twinkle ${dl}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="${col}" opacity=".7" filter="url(#${gl})"/><circle class="nta-twinkle ${dl}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.3" fill="${col}"/>`
        : `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.3" fill="#b0b5bb" stroke="#7d8590" stroke-width=".3"/>`;
    }).join("");
    return tinsel + wire + bulbs;
  }).join("");
  const balls = [[44, 92], [76, 91], [60, 86], [33, 93], [87, 93], [49, 75], [72, 74], [40, 77], [80, 77], [55, 60], [67, 58], [46, 62], [74, 61], [60, 44], [54, 46], [66, 47]]
    .map(([x, y], i) => `<rect x="${x - .8}" y="${y - 3.6}" width="1.6" height="1.2" fill="#bdbdbd"/><circle cx="${x}" cy="${y}" r="2.6" fill="${pal.balls[i % pal.balls.length]}"/><circle cx="${x - .8}" cy="${y - .9}" r=".8" fill="#fff" opacity=".75"/>`).join("");
  let star = "";
  for (let i = 0; i < 10; i++) { const r = i % 2 ? 3.2 : 7.4, ang = -Math.PI / 2 + i * Math.PI / 5; star += `${i ? "L" : "M"}${(60 + r * Math.cos(ang)).toFixed(1)} ${(10 + r * Math.sin(ang)).toFixed(1)}`; }
  const G = pal.gifts, R = pal.ribbons, edge = `stroke="#263238" stroke-width=".5" stroke-opacity=".7"`;
  const bow = (x, y, col) => `<path d="M${x} ${y} q-4 -4 -5 0 q4 1 5 0 q4 -4 5 0 q-4 1 -5 0" fill="${col}" stroke="#263238" stroke-width=".35" stroke-opacity=".6"/>`;
  const presents = c.presents
    ? `<rect x="9" y="106" width="9" height="7" rx=".8" fill="${G[2]}" ${edge}/><path d="M13.5 106v7M9 109.5h9" stroke="${R[2]}" stroke-width="1"/>
<rect x="18" y="100" width="20" height="13" rx="1" fill="${G[0]}" ${edge}/><path d="M28 100v13M18 106.5h20" stroke="${R[0]}" stroke-width="1.6"/>${bow(28, 100, R[0])}
<rect x="82" y="96" width="18" height="17" rx="1" fill="${G[1]}" ${edge}/><path d="M91 96v17M82 104.5h18" stroke="${R[1]}" stroke-width="1.6"/>${bow(91, 96, R[1])}
<rect x="101" y="105" width="9" height="8" rx=".8" fill="${G[3]}" ${edge}/><path d="M105.5 105v8" stroke="${R[3]}" stroke-width="1.2"/>`
    : "";
  return `<defs>${ntV(gr, "#43a047", "#1b5e20")}${ntV(st, pal.star[0], pal.star[1])}${ntBlur(gl, 1.4)}${ntV(pot, pal.pot[0], pal.pot[1])}</defs>
${ntShadow(60, 113.2, 48)}
<rect x="56" y="92" width="8" height="8" fill="#6d4c41"/>
<path d="M46 98 H74 L71 112 H49 Z" fill="url(#${pot})" stroke="#263238" stroke-width=".5" stroke-opacity=".6"/><rect x="45" y="97" width="30" height="3" rx="1" fill="${pal.star[1]}"/>
${tiers.map(([yt, yb, w]) => tier(yt, yb, w)).join("")}
${balls}${lights}
${on ? `<circle class="nta-glow" cx="60" cy="10" r="9" fill="${pal.star[0]}" filter="url(#${gl})"/>` : ""}
<path d="${star}Z" fill="${on ? `url(#${st})` : "#d6d9dd"}" stroke="${on ? pal.star[2] : "#9aa1ab"}" stroke-width=".5"/>
${presents}`;
}

// Electric rides on their charger (#72): a scooter, an off-road scooter like
// the Ausom DT2 Pro, an e-bike, a gyropode and an electric motorcycle, front
// to the left. The charger's light is red while it charges, green once
// full; the current runs from the charger to the vehicle.
// A wheel: tyre, rim, hub; knobs for an off-road tyre, spokes for a bike.
function mobWheel(cx, cy, r, o = {}) {
  const t = o.tyre || "#1e2226";
  let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${t}"/>`;
  if (o.knobby) {
    const n = 18;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const x = cx + Math.cos(a) * (r - .2), y = cy + Math.sin(a) * (r - .2);
      s += `<rect x="${(x - 1.6).toFixed(2)}" y="${(y - 1.1).toFixed(2)}" width="3.2" height="2.2" rx=".6" fill="${t}" transform="rotate(${(a * 180 / Math.PI + 90).toFixed(1)} ${x.toFixed(2)} ${y.toFixed(2)})"/>`;
    }
  }
  const rim = o.rim || r * .58;
  if (o.spokes) {
    s += `<circle cx="${cx}" cy="${cy}" r="${r - 1.8}" fill="none" stroke="#8a939d" stroke-width=".9"/>`;
    for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; s += `<path d="M${cx} ${cy} L${(cx + Math.cos(a) * (r - 2)).toFixed(2)} ${(cy + Math.sin(a) * (r - 2)).toFixed(2)}" stroke="#a7aeb6" stroke-width=".35"/>`; }
    s += `<circle cx="${cx}" cy="${cy}" r="2.2" fill="#3b4148"/>`;
    return s;
  }
  s += `<circle cx="${cx}" cy="${cy}" r="${rim}" fill="${o.rimColor || "#4a525b"}"/>`;
  if (o.disc) s += `<circle cx="${cx}" cy="${cy}" r="${rim * .82}" fill="none" stroke="#b9c0c8" stroke-width="1.2" stroke-dasharray="1.4 .8"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${rim * .38}" fill="#22272c"/><circle cx="${cx}" cy="${cy}" r="${rim * .14}" fill="#9aa3ad"/>`;
  return s;
}

// The charger on the floor, its cable to the vehicle's port; its light red
// while charging, green once full, dark when the plug is off.
function mobCharger(x, port, c) {
  const led = c.st === "charging" ? "#ff5252" : c.st === "full" ? "#43a047" : "#3a4048";
  const [px, py] = port;
  // Unplugged, its cable lies on the floor and its plug is free.
  const lying = c.st === "off";
  const cable = lying ? `M${x} 104 C${x - 6} 107.4 ${x - 14} 107.4 ${x - 20} 106.6` : `M${px} ${py} C${px + 2} ${py + 14} ${x - 10} 104 ${x} 103`;
  return `<path d="${cable}" stroke="#2a2f35" stroke-width="1.6" fill="none" stroke-linecap="round"/>
${c.st === "charging" ? `<path class="nta-feed" d="${cable}" stroke="#ffca28" stroke-width=".9" fill="none" stroke-dasharray="2 4"/>` : ""}
${lying ? `<rect x="${x - 25}" y="104.6" width="5.4" height="3.4" rx="1" fill="#2a2f35"/>` : ""}
<circle cx="${px}" cy="${py}" r="1.5" fill="#15181c"/>
<rect x="${x}" y="98" width="20" height="10" rx="2.2" fill="#24292e"/><rect x="${x + 1}" y="98.8" width="18" height="2.4" rx="1.2" fill="#fff" opacity=".08"/>
<circle class="${c.st === "charging" ? "nta-led" : ""}" cx="${x + 16}" cy="101.6" r="1.3" fill="${led}"/>
<path d="M${x + 20} 104 C${x + 26} 104 ${x + 28} 106 116 106" stroke="#2a2f35" stroke-width="1.3" fill="none"/>`;
}

// Unplugged, the ride is greyed out.
const mobGrey = (c) => (c.st === "off" ? ' opacity=".5" style="filter:grayscale(1)"' : "");

// One bar of four: the real level when it is known (a bar per quarter, the
// next one blinking while it charges), else the bars filling from 0 to 4 in
// turn while it charges, all four once full, none lit when nothing says.
function mobBar(c, i, lit, dim) {
  if (c.level !== null && c.level !== undefined) {
    const n = c.st === "full" ? 4 : Math.max(0, Math.min(4, Math.ceil(c.level / 25)));
    const low = n <= 1 && c.st !== "charging";
    if (i < n) return `fill="${low ? "#e53935" : lit}"`;
    if (c.st === "charging" && i === n) return `class="nta-next" fill="${lit}"`;
    return `fill="${dim}"`;
  }
  if (c.st === "charging") return `class="nta-bar${i + 1}" fill="${lit}"`;
  return `fill="${c.st === "full" ? lit : dim}"`;
}

// The battery gauge over the vehicle, four bars read by mobBar.
function mobGauge(cx, cy, c) {
  const bars = [0, 1, 2, 3].map((i) => `<rect x="${cx - 9.2 + i * 4.4}" y="${cy - 2.6}" width="3.6" height="5.2" rx=".6" ${mobBar(c, i, "#43a047", "#dfe3e7")}/>`).join("");
  return `<rect x="${cx - 11}" y="${cy - 4.4}" width="20" height="8.8" rx="2" fill="#fff" stroke="#9aa3ad" stroke-width=".8"/><rect x="${cx + 9}" y="${cy - 1.6}" width="1.6" height="3.2" rx=".6" fill="#9aa3ad"/>${bars}
${c.st === "charging" ? `<path class="nta-led" d="M${cx + 15} ${cy - 5} l-3 5.4 h2.4 l-1.4 4.6 l4 -6 h-2.4 l1.6 -4 Z" fill="#ffb300" stroke="#e65100" stroke-width=".3"/>` : ""}`;
}

// A commuter scooter, Segway / Ninebot style, front to the left.
function mobScooter(c) {
  const g = ntId();
  return `<defs>${ntV(g, "#7d858e", "#4c535b")}</defs>${ntShadow(58, 110, 46)}<g${mobGrey(c)}>
${mobWheel(22, 98, 10)}${mobWheel(94, 98, 10)}
<path d="M84 88 Q94 82 104 90 L104 92 Q94 86 86 91 Z" fill="#1f2328"/>
<path d="M28 90 L34 84 H86 L88 90 Q87 93 84 93 H32 Q29 93 28 90 Z" fill="#23272c"/>
<path d="M40 86.4 H80" stroke="#5a626b" stroke-width="1.6" stroke-linecap="round"/>
<path d="M22 98 L27 74 L33 84" stroke="url(#${g})" stroke-width="5" fill="none" stroke-linejoin="round"/>
<path d="M27 76 L37 20" stroke="#1e2226" stroke-width="3.6" stroke-linecap="round"/>
<path d="M36 22 L37 16" stroke="#1e2226" stroke-width="3" stroke-linecap="round"/>
<path d="M33 16.6 L44 15" stroke="#1e2226" stroke-width="3" stroke-linecap="round"/><path d="M40 15.4 L46 14.6" stroke="#3b4148" stroke-width="3.4" stroke-linecap="round"/>
<path d="M34 24 Q30 34 31 46" stroke="#e53935" stroke-width=".7" fill="none"/>
<rect x="23.6" y="80" width="3.4" height="4" rx="1" fill="#f5f5f5" opacity=".85"/>
<rect x="100" y="89" width="3" height="1.6" rx=".6" fill="#e53935"/>
</g>${mobCharger(60, [38, 88], c)}${mobGauge(78, 52, c)}`;
}

// Ausom DT2 Pro: dual motors, off-road tyres, swing arms, yellow touches.
function mobOffroad(c) {
  const g = ntId(), d = ntId();
  return `<defs>${ntV(g, "#5c636b", "#2f3439")}${ntV(d, "#4a5057", "#24282c")}</defs>${ntShadow(60, 110, 50)}<g${mobGrey(c)}>
${mobWheel(20, 96, 12, { knobby: true, disc: true })}${mobWheel(98, 96, 12, { knobby: true, disc: true })}
<path d="M88 84 L98 96" stroke="#3a4046" stroke-width="5" stroke-linecap="round"/>
<path d="M90 84 Q100 74 110 84 L110 87 Q100 79 92 88 Z" fill="#2a2f34"/>
<path d="M30 92 L36 82 H86 L90 90 Q89 94 85 94 H33 Q30 94 30 92 Z" fill="url(#${d})"/>
<text x="62" y="91.6" font-size="3.2" font-weight="700" text-anchor="middle" fill="#c9ced3" font-family="Arial, sans-serif" letter-spacing=".3">AUSOM</text>
<path d="M80 82 L82 74 H90" stroke="#2a2f34" stroke-width="2.4" fill="none" stroke-linejoin="round"/>
<path d="M20 96 L28 80" stroke="#3a4046" stroke-width="4.4" stroke-linecap="round"/>
<path d="M27 82 L33 77 L37 83" stroke="url(#${g})" stroke-width="5.6" fill="none" stroke-linejoin="round"/>
<path d="M25.4 86.4 L29 80.6" stroke="#ffb300" stroke-width="2.2" stroke-dasharray="1 .7"/>
<path d="M31 78 L40 18" stroke="url(#${g})" stroke-width="4.6" stroke-linecap="round"/>
<circle cx="33.4" cy="62" r="2.4" fill="#ffb300"/><circle cx="33.4" cy="62" r=".9" fill="#c77800"/>
<path d="M36 40 L37.4 32" stroke="#ffb300" stroke-width="1.6" stroke-linecap="round" opacity=".9"/>
<path d="M33 16.4 L47 14" stroke="#1e2226" stroke-width="3" stroke-linecap="round"/><path d="M42 14.8 L49 13.6" stroke="#3b4148" stroke-width="3.6" stroke-linecap="round"/>
<rect x="37" y="11.6" width="5" height="3.4" rx=".8" fill="#14181c"/><rect x="37.8" y="12.4" width="3.4" height="1.8" rx=".4" fill="${c.st === "off" ? "#2b3138" : "#4fc3f7"}"/>
<circle cx="33" cy="26" r="1.8" fill="#fffde7" stroke="#2a2f34" stroke-width=".6"/>
<rect x="107" y="85" width="3" height="1.8" rx=".6" fill="#e53935"/>
</g>${mobCharger(62, [42, 89], c)}${mobGauge(80, 50, c)}`;
}

// An e-bike: its battery along the down tube, the motor at the cranks.
function mobEbike(c) {
  const f = "#2e7d6b";
  // The down tube runs from the head tube (46,62) to the cranks (60,92); the
  // battery lies on its upper side, along it.
  const ang = (Math.atan2(30, 14) * 180 / Math.PI).toFixed(1);
  const bars = [0, 1, 2, 3].map((i) => `<rect x="${4 + i * 2}" y="-1.6" width="1.3" height="3.2" rx=".4" ${mobBar(c, i, "#69f0ae", "#4a525b")}/>`).join("");
  return `${ntShadow(60, 110, 52)}<g${mobGrey(c)}>
${mobWheel(24, 92, 17, { spokes: true })}${mobWheel(96, 92, 17, { spokes: true })}
<path d="M24 92 L46 62 L82 62 L96 92 M46 62 L60 92 L82 62 M60 92 L96 92" stroke="${f}" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
<g transform="translate(55.6 76.4) rotate(${ang})"><rect x="-13" y="-3.4" width="24" height="6.8" rx="2.6" fill="#30363c"/><rect x="-11" y="-2.6" width="16" height="1.2" rx=".6" fill="#fff" opacity=".12"/>${bars}</g>
<path d="M46 62 L44 50 Q44 47 47 47 H52" stroke="#1e2226" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M50 47 H54" stroke="#3b4148" stroke-width="3.2" stroke-linecap="round"/>
<path d="M82 62 L85 48" stroke="#9aa3ad" stroke-width="2.2" stroke-linecap="round"/>
<path d="M79 47 Q86 44.6 93 46.4 Q93 48.6 88 48.6 H81 Q78.6 48.4 79 47 Z" fill="#1e2226"/>
<circle cx="60" cy="92" r="4.6" fill="#3b4148"/><circle cx="60" cy="92" r="2" fill="#6c757e"/>
<path d="M60 92 L64 98" stroke="#22272c" stroke-width="1.6"/><rect x="62" y="97" width="5" height="1.6" rx=".6" fill="#22272c"/>
<circle cx="43" cy="57" r="1.8" fill="#fffde7" stroke="#2a2f34" stroke-width=".5"/>
<path d="M88 66 L92 66" stroke="#e53935" stroke-width="1.6" stroke-linecap="round"/>
</g>${mobCharger(70, [52, 78], c)}${mobGauge(98, 30, c)}`;
}

// A self-balancing gyropode (Segway PT): two wheels side by side, a platform
// between them, a tall stem and its handlebar.
function mobGyropode(c) {
  const g = ntId();
  return `<defs>${ntV(g, "#e9edf1", "#a9b2bc")}</defs>${ntShadow(52, 110, 30)}<g${mobGrey(c)}>
${mobWheel(52, 92, 17, { rim: 9.6 })}
<path d="M34 96 H70 Q72 96 72 98 V101 Q72 103 70 103 H34 Q32 103 32 101 V98 Q32 96 34 96 Z" fill="#22272c"/>
<rect x="34" y="92.6" width="36" height="4" rx="1.4" fill="#3b4148"/>
<path d="M44 80 Q52 76 60 80 L58 94 H46 Z" fill="url(#${g})" stroke="#8a939d" stroke-width=".6"/>
<path d="M52 82 L56 22" stroke="#2a2f34" stroke-width="3.6" stroke-linecap="round"/>
<path d="M48 22 H64" stroke="#2a2f34" stroke-width="3.2" stroke-linecap="round"/><path d="M47 22 H51 M61 22 H65" stroke="#4a525b" stroke-width="4" stroke-linecap="round"/>
<rect x="53.4" y="25" width="5" height="3.4" rx=".8" fill="#14181c"/><rect x="54.2" y="25.8" width="3.4" height="1.8" rx=".4" fill="${c.st === "off" ? "#2b3138" : "#4fc3f7"}"/>
</g>${mobCharger(82, [58, 88], c)}${mobGauge(84, 50, c)}`;
}

// An electric motorcycle, neo-retro like the Super Soco TC Max: round
// headlight, a tank that holds the battery, flat ribbed seat, silver swing
// arm and the motor in the rear hub. Front to the left like the others.
function mobAlloy(cx, cy, r) {
  let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#1b1f23"/><circle cx="${cx}" cy="${cy}" r="${r - 2.6}" fill="#2c3238"/><circle cx="${cx}" cy="${cy}" r="${r - 3.4}" fill="#14171a"/>`;
  for (let i = 0; i < 5; i++) {
    const a = i / 5 * Math.PI * 2 - Math.PI / 2;
    const x1 = cx + Math.cos(a - .12) * (r - 3.4), y1 = cy + Math.sin(a - .12) * (r - 3.4);
    const x2 = cx + Math.cos(a + .12) * (r - 3.4), y2 = cy + Math.sin(a + .12) * (r - 3.4);
    s += `<path d="M${cx} ${cy} L${x1.toFixed(2)} ${y1.toFixed(2)} L${x2.toFixed(2)} ${y2.toFixed(2)} Z" fill="#3d444c"/>`;
  }
  return s;
}
function mobMotorcycle(c) {
  const b = ntId(), sv = ntId(), sh = ntId();
  // Low and long: the seat about 1.3 wheels high, as on the real bike.
  return `<defs>${ntV(b, "#4a525b", "#16191c")}${ntV(sv, "#e9edf1", "#9aa3ad")}${ntV(sh, "#30363c", "#111316")}</defs>${ntShadow(60, 110, 56)}<g${mobGrey(c)}>
${mobAlloy(22, 92, 16)}<circle cx="22" cy="92" r="7.6" fill="none" stroke="#c4cbd2" stroke-width="1.4" stroke-dasharray="1.6 .9"/><circle cx="22" cy="92" r="2.2" fill="#9aa3ad"/>
${mobAlloy(98, 92, 16)}<circle cx="98" cy="92" r="6.8" fill="url(#${sv})"/><circle cx="98" cy="92" r="3" fill="#5a636c"/>
<path d="M85 76 Q98 66 112 77 L111 80 Q98 70 87 79 Z" fill="#1f2328"/>
<rect x="107" y="75" width="6" height="4.4" rx=".8" fill="#e9edf1" stroke="#9aa3ad" stroke-width=".4"/>
<path d="M64 86 L98 92" stroke="url(#${sv})" stroke-width="4.4" stroke-linecap="round"/>
<path d="M78 66 L82 84" stroke="#e9edf1" stroke-width="2.6" stroke-linecap="round"/><path d="M78.6 68.6 L81.6 81" stroke="#e53935" stroke-width="1.6" stroke-dasharray="1 .8"/>
<path d="M36 56 L22 92" stroke="#1f2328" stroke-width="4" stroke-linecap="round"/><path d="M27.6 77 L23 90" stroke="#c4cbd2" stroke-width="2.6" stroke-linecap="round"/>
<path d="M76 62 L106 61 L103 67 H78 Z" fill="#1f2328"/><path d="M103 66 L108 75" stroke="#1f2328" stroke-width="1.8" stroke-linecap="round"/>
<path d="M105 60.6 L109.6 61.4 L108.8 64.4 L104.4 63.8 Z" fill="#e53935"/>
<path d="M38 58 L54 54 Q70 52 78 58 L80 70 L76 84 H50 Q42 82 40 72 Z" fill="url(#${b})"/>
<path d="M44 72 H79 L76 84 H50 Q45 81 44 72 Z" fill="url(#${sv})"/>
<text x="64" y="81" font-size="4.4" font-weight="700" font-style="italic" text-anchor="middle" fill="#5a636c" font-family="Arial, sans-serif">TC</text>
<path d="M48 60 Q60 56 72 60" stroke="#fff" stroke-width=".8" fill="none" opacity=".18"/>
<circle cx="58" cy="65" r="2.4" fill="#2a3036" stroke="#7d868f" stroke-width=".5"/>
<path d="M70 57 Q72 54 78 54 H101 Q107 54.4 107 58 L106 61.4 H72 Q69 60.6 70 57 Z" fill="url(#${sh})"/>
${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M${79 + i * 3.6} 55 V61" stroke="#4a525b" stroke-width=".5"/>`).join("")}
<path d="M72 54.8 H105" stroke="#c4cbd2" stroke-width=".6"/>
<path d="M37 55 L42 46 M42 46 L49 47" stroke="#1f2328" stroke-width="2.2" stroke-linecap="round"/><path d="M46 46.8 L51 47.6" stroke="#3b4148" stroke-width="3" stroke-linecap="round"/>
<path d="M41 47 L38 38" stroke="#1f2328" stroke-width="1"/><circle cx="37.6" cy="36.4" r="2.6" fill="#2a2f34" stroke="#9aa3ad" stroke-width=".6"/>
<ellipse cx="30.6" cy="62" rx="4.4" ry="5.4" fill="#2a2f34" stroke="#c4cbd2" stroke-width=".9"/><ellipse cx="28.4" cy="62" rx="2" ry="4.2" fill="#fffde7"/>
<path d="M62 86 L66 86" stroke="#9aa3ad" stroke-width="1.8" stroke-linecap="round"/>
</g>${mobCharger(70, [76, 74], c)}${mobGauge(88, 30, c)}`;
}

// Watering, a self-cleaning litter box, a smoke, CO or leak detector and a
// speaker.
// A round island of lawn, seen in three-quarter view: its edge of soil, its
// tufts and a few flowers, all kept inside it.
function ntLawnDisc(cx, cy, rx, ry) {
  const g = ntId(), so = ntId();
  const tufts = [];
  for (let i = 0; i < 34; i++) {
    const a = (i * 137.5) * Math.PI / 180, q = Math.sqrt(((i * 61) % 97) / 97) * .86;
    const x = cx + Math.cos(a) * rx * q, y = cy + Math.sin(a) * ry * q;
    tufts.push(`<path d="M${(x - 1.4).toFixed(1)} ${y.toFixed(1)} l.7 -2.6 l.7 2 l.7 -2.8 l.7 3.4" fill="none" stroke="${i % 3 ? "#3f7d2c" : "#86c262"}" stroke-width=".7" stroke-linejoin="round"/>`);
  }
  const flowers = [[-.62, .1, "#fff59d"], [.58, -.34, "#f8bbd0"], [.7, .42, "#fff"], [-.3, .56, "#fff59d"]].map(([u, v, col]) => {
    const x = cx + u * rx, y = cy + v * ry;
    return `<g>${[0, 1, 2, 3, 4].map((k) => `<circle cx="${(x + Math.cos(k * 1.256) * 1.3).toFixed(1)}" cy="${(y + Math.sin(k * 1.256) * .8).toFixed(1)}" r=".9" fill="${col}"/>`).join("")}<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r=".7" fill="#ffb300"/></g>`;
  }).join("");
  return `<defs><radialGradient id="${g}" cx=".45" cy=".35" r=".7"><stop offset="0" stop-color="#9ccc65"/><stop offset=".7" stop-color="#6fa646"/><stop offset="1" stop-color="#4f8a34"/></radialGradient>${ntV(so, "#7a5638", "#4e3524")}</defs>
${ntFoot(`${cx - rx + 4} ${cy + ry + 6} ${cx + rx - 4} ${cy + ry + 6} ${cx + rx} ${cy + 4} ${cx - rx} ${cy + 4}`, .25)}
<path d="M${cx - rx} ${cy} V${cy + 6} A${rx} ${ry} 0 0 0 ${cx + rx} ${cy + 6} V${cy} Z" fill="url(#${so})"/>
<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${g})"/>
<path d="M${cx - rx + 6} ${cy - 3} A${rx - 6} ${ry - 3} 0 0 1 ${cx + rx * .3} ${cy - ry + 1.6}" fill="none" stroke="#c5e1a5" stroke-width="1" opacity=".6"/>
${tufts.join("")}${flowers}`;
}
// The rain while the watering waits for the weather: the robot mower's cloud
// and its slanted drops, each splashing on the ground.
const ntRainCloud = (ground, dx = 0, sc = 1.25) => { const g = ntId(), dr = ntId(); let drops = ""; const x0 = 15 + dx, w = 72 * sc, n = Math.round(14.4 * sc);
  for (let i = 0; i < n; i++) { const x = +(x0 + w * .12 + ((i * 37) % 76) / 76 * w * .76).toFixed(1), d = 7 / (10 + ((i * 7) % 5)), dl = -((i * 0.23) % d), st = `animation-duration:${d.toFixed(2)}s;animation-delay:${dl.toFixed(2)}s`;
    drops += `<path class="nta-rdrop" style="${st}" d="M${x} ${(-9 + 25 * sc).toFixed(1)} l-1.9 8.8" stroke="url(#${dr})" stroke-width="1.1" stroke-linecap="round"/><ellipse class="nta-rsplash" style="${st}" cx="${x - 16}" cy="${ground + (i % 4) * 3}" rx="4" ry="1.3" fill="none" stroke="#b4d7f5" stroke-width=".9"/>`; }
  return `<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="26" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d7dde2"/><stop offset=".55" stop-color="#a9b2ba"/><stop offset="1" stop-color="#7f8a94"/></linearGradient>
<linearGradient id="${dr}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a0c8f0" stop-opacity="0"/><stop offset="1" stop-color="#96c3f0" stop-opacity=".95"/></linearGradient></defs>${drops}
<g transform="translate(${x0} -9) scale(${sc})"><path d="M12 25.5 C5 25.5 3 18 9 15.5 C8 9 15 6 20 9 C23 2 35 0 40 7 C45 3 54 6 54 12 C61 11 67 16 64 21 C66 24 63 25.5 60 25.5 Z" fill="url(#${g})"/><path d="M14 13 C15 10 18 9 21 10.5 M27 7 C30 4 35 4 38 7.5" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.4" stroke-linecap="round"/></g>`; };
// The soil probe: a stake in the lawn, its gauge how wet the ground is.
const ntSoil = (x, y, m) => m === null || m === undefined ? "" : `<ellipse cx="${x + 3.5}" cy="${y + 23}" rx="4" ry="1.3" fill="#2e5a20" opacity=".6"/>
<rect x="${x}" y="${y}" width="7" height="22" rx="3.5" fill="#eceff1" stroke="#90a4ae" stroke-width=".6"/>
<rect x="${x + 1.6}" y="${y + 2}" width="3.8" height="18" rx="1.9" fill="#37474f"/>
<rect x="${x + 1.6}" y="${(y + 2 + 18 * (1 - m)).toFixed(1)}" width="3.8" height="${(18 * m).toFixed(1)}" rx="1.9" fill="${m < 0.25 ? "#ffb300" : "#29b6f6"}"/>
<path d="M${x + 3.5} ${y - 8} q-3 4 0 5.6 q3 -1.6 0 -5.6 Z" fill="${m < 0.25 ? "#ffb300" : "#29b6f6"}"/>`;
// Water thrown in an arc: a fine mist along it and the drops flying in it.
const ntJet = (d, i) => `<path d="${d}" fill="none" stroke="#e1f5fe" stroke-width="4" stroke-linecap="round" opacity=".55"/>
<path class="nta-flow ntd${i + 1}" d="${d}" fill="none" stroke="#4fc3f7" stroke-width="1.8" stroke-dasharray="0 4" stroke-linecap="round"/>
<path class="nta-flow ntd${i + 1}" d="${d}" fill="none" stroke="#0288d1" stroke-width=".9" stroke-dasharray="0 6" stroke-linecap="round" opacity=".7"/>`;
// A pop-up spray head in the middle of the lawn: the riser comes up and
// throws its fan of jets, the head sinks back flush with the grass when it
// stops.
function ntIrrSprinkler(c) {
  const bd = ntId(), cap = ntId(), mi = ntId();
  const ends = [[6, 100], [24, 112], [44, 116], [76, 116], [96, 112], [114, 100]];
  const top = [60, 82];
  const arcs = ends.map(([x, y], i) => [`M${top[0]} ${top[1]} Q${(top[0] + (x - top[0]) * .55).toFixed(1)} ${-22 + Math.abs(x - 60) * .5} ${x} ${y}`, i]);
  return `<defs>${ntV(bd, "#4a5560", "#1e2328")}<radialGradient id="${cap}" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#8d9aa6"/><stop offset="1" stop-color="#37424c"/></radialGradient>${ntBlur(mi, 2.4)}</defs>
${c.rain ? ntRainCloud(100) : ""}
${ntLawnDisc(60, 104, 58, 18)}
${ntSoil(100, 84, c.moist)}
<g class="nt-run">${arcs.map(([d, i]) => ntJet(d, i)).join("")}
${ends.map(([x, y], i) => `<circle cx="${x}" cy="${y - 3}" r="5" fill="#e1f5fe" opacity=".55" filter="url(#${mi})"/>
<circle class="nta-fall ntd${(i % 6) + 1}" cx="${x + 1.5}" cy="${y - 10}" r="1.2" fill="#4fc3f7"/>`).join("")}</g>
<ellipse cx="60" cy="105" rx="13" ry="4" fill="#2f5e22" opacity=".55"/>
<ellipse cx="60" cy="104" rx="10" ry="3.2" fill="url(#${cap})"/>
${c.on ? `<rect x="55.4" y="88" width="9.2" height="16" fill="url(#${bd})"/><path d="M57.2 90 V102" stroke="#8d9aa6" stroke-width=".9" opacity=".8"/>
<path d="M53 88 Q60 80 67 88 V91 H53 Z" fill="url(#${cap})"/><ellipse cx="60" cy="83.4" rx="3.6" ry="1.6" fill="#263238"/><circle cx="60" cy="83" r="1" fill="#81d4fa"/>` : `<ellipse cx="60" cy="103.4" rx="5" ry="1.5" fill="#1e2328"/><circle cx="60" cy="103.2" r=".9" fill="#8d9aa6"/>`}
${c.lcd ? `<rect x="44" y="113" width="32" height="10" rx="5" fill="#1e2328" opacity=".82"/><text x="60" y="120.2" font-size="${ntFit(c.lcd, 30, 6.4).toFixed(1)}" font-weight="700" text-anchor="middle" fill="#b3e5fc" ${NT_FONT}>${esc(c.lcd)}</text>` : ""}`;
}
// A tap timer on the garden tap of a brick wall, the hose running down to the
// terrace and spraying from its nozzle while it waters.
function ntIrrTap(c) {
  const br = ntId(), bx = ntId(), bs = ntId(), wl = ntId(), gd = ntId();
  const bricks = [];
  for (let r = 0; r < 9; r++) {
    const y = -10 + r * 11;
    bricks.push(`<path d="M-10 ${y} H130" stroke="#b9a07c" stroke-width=".8"/>`);
    for (let x = (r % 2 ? -4 : 8); x < 130; x += 24) bricks.push(`<path d="M${x} ${y} V${y + 11}" stroke="#b9a07c" stroke-width=".8"/>`);
  }
  const [wm, wdef] = ntFade(60, 40, 74, 62), [gm, gdef] = ntFade(60, 110, 72, 22);
  return `<defs>${ntV(br, "#f6dc8c", "#a8781e")}${ntV(bx, "#5cbf5f", "#2a7a2e")}${ntV(bs, "#2a7a2e", "#17511b")}${ntV(wl, "#eadcc6", "#d2bf9f")}${ntV(gd, "#c9c2b6", "#a59d8f")}</defs>${wdef}${gdef}
<g mask="url(#${wm})"><rect x="-10" y="-10" width="140" height="106" fill="url(#${wl})"/>${bricks.join("")}</g>
<g mask="url(#${gm})"><rect x="-10" y="96" width="140" height="30" fill="url(#${gd})"/><path d="M-10 96.5 H130" stroke="#8d8577" stroke-width="1"/>
${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${-6 + i * 26} 125 L${6 + i * 26} 97" stroke="#9a9283" stroke-width=".7"/>`).join("")}<path d="M-10 110 H130" stroke="#9a9283" stroke-width=".7"/></g>
${c.rain ? ntRainCloud(104, 52, .75) : ""}
<rect x="50" y="9" width="20" height="9" rx="2" fill="#8a6418" opacity=".25"/>
<circle cx="56" cy="13" r="7" fill="url(#${br})" stroke="#8a6418" stroke-width=".5"/><ellipse cx="56" cy="14" rx="3.6" ry="3" fill="#7a5714"/>
<path d="M52 12 H64 Q69 12 69 17 V24 H62 V19 H52 Z" fill="url(#${br})" stroke="#8a6418" stroke-width=".4"/>
<rect x="54.8" y="1" width="2.6" height="10" fill="#8a6418"/><path d="M49 1 Q56 -3.4 63 1 L61 3.2 Q56 .6 51 3.2 Z" fill="#d32f2f"/>
<rect x="61.6" y="23" width="7.8" height="5" fill="url(#${br})"/><rect x="60.4" y="27" width="10.2" height="4.4" rx="1.2" fill="#26a69a"/>
${ntRoundBox(47, 31, 34, 42, 6, 8, `url(#${bx})`, `url(#${bs})`, "#7ed37f", "#17511b")}
<path d="M51 35.6 Q64 32.6 77 35.6" fill="none" stroke="#fff" stroke-width="1.3" opacity=".45" stroke-linecap="round"/>
<rect x="50.6" y="38" width="26.8" height="15.4" rx="2.4" fill="#1b2a1c"/>
${ntLcd(51.6, 39, 24.8, 13.4, c.lcd || "--", c.on, "#b9f6ca", ntFit(c.lcd || "--", 24, 7))}
<circle cx="57" cy="62" r="3.6" fill="#e8f5e9" stroke="#17511b" stroke-width=".5"/><circle cx="71" cy="62" r="3.6" fill="#e8f5e9" stroke="#17511b" stroke-width=".5"/>
<path d="M55.4 62 h3.2 M69.4 62 h3.2 M71 60.4 v3.2" stroke="#2a7a2e" stroke-width=".9"/>
<rect x="59.6" y="73" width="9" height="5.4" rx="1.4" fill="#ffb300"/><rect x="60.8" y="77.6" width="6.6" height="4" fill="#ffca28"/>
<ellipse cx="88" cy="114" rx="30" ry="4" fill="#000" opacity=".12"/>
<path d="M64 81 C62 100 50 106 40 110 C28 115 34 121 56 119 C72 117 84 112 92 109" fill="none" stroke="#1b5e20" stroke-width="5.6" stroke-linecap="round"/>
<path d="M64 81 C62 100 50 106 40 110 C28 115 34 121 56 119 C72 117 84 112 92 109" fill="none" stroke="#43a047" stroke-width="3.8" stroke-linecap="round"/>
<path d="M63 84 C61 99 50 105 41 109" fill="none" stroke="#a5d6a7" stroke-width="1" opacity=".7"/>
<path class="nt-run nta-flow" d="M64 81 C62 100 50 106 40 110 C28 115 34 121 56 119 C72 117 84 112 92 109" fill="none" stroke="#b3e5fc" stroke-width="1.2" stroke-dasharray="3 5"/>
<g transform="rotate(-14 96 108)"><rect x="90" y="105" width="11" height="6" rx="2" fill="#ffb300"/><path d="M100 105.4 L106 104 V112 L100 110.6 Z" fill="#f57c00"/></g>
<g class="nt-run">${[["M106 105 Q114 99 125 101", 0], ["M106 107 Q115 103 125 107", 2], ["M106 109 Q114 108 124 114", 4]].map(([d, i]) => ntJet(d, i)).join("")}
<path d="M106 107 L126 98 L126 116 Z" fill="#e1f5fe" opacity=".35"/></g>
${ntSoil(14, 78, c.moist)}`;
}
// The status light of a litter box: ready, cleaning, a cat in, full.
const litLed = (c) => ({ ready: "#43a047", cleaning: "#29b6f6", cat: "#ff9800", full: "#e53935", fault: "#e53935", off: "#5d6773" }[c.st] || "#5d6773");
const litLedCls = (c) => c.st === "full" || c.st === "fault" ? "nta-blinkfast" : c.on ? "nta-glow" : "";
// A cat in the doorway: its head, its ears, its eyes and whiskers.
const litCat = (cx, cy, s = 1) => `<g transform="translate(${cx} ${cy}) scale(${s})">
<path d="M-12 10 Q-14 -2 -10 -6 L-11 -15 L-4 -9 Q0 -10 4 -9 L11 -15 L10 -6 Q14 -2 12 10 Z" fill="#6d4c41"/>
<path d="M-9.4 -12 L-5.6 -8.6 L-9 -7.4 Z M9.4 -12 L5.6 -8.6 L9 -7.4 Z" fill="#f48fb1"/>
<path d="M-8 -2 Q-4 -5 0 -2 Q4 -5 8 -2" fill="none" stroke="#4e342e" stroke-width=".8"/>
<ellipse cx="-4.6" cy="0" rx="2.4" ry="2.8" fill="#d4e157"/><ellipse cx="4.6" cy="0" rx="2.4" ry="2.8" fill="#d4e157"/>
<ellipse cx="-4.6" cy="0" rx=".8" ry="2.4" fill="#212121"/><ellipse cx="4.6" cy="0" rx=".8" ry="2.4" fill="#212121"/>
<path d="M-1.4 4 H1.4 L0 5.6 Z" fill="#f48fb1"/><path d="M-3 6 Q0 8 3 6" fill="none" stroke="#3e2723" stroke-width=".7"/>
<path d="M-3 5 L-12 3.6 M-3 6 L-12 7 M3 5 L12 3.6 M3 6 L12 7" stroke="#efebe9" stroke-width=".5"/></g>`;
// The waste drawer's level, on a little window of its front.
const litDrawer = (x, y, w, f) => f === null || f === undefined ? "" : `<rect x="${x}" y="${y}" width="${w}" height="4.4" rx="2.2" fill="#10151a"/>
<rect x="${x + .7}" y="${y + .7}" width="${((w - 1.4) * Math.max(0.04, f)).toFixed(1)}" height="3" rx="1.5" fill="${f >= 0.9 ? "#e53935" : f >= 0.75 ? "#ffb300" : "#a1887f"}"/>`;
// The litter's grains, and the clumps the cleaning sifts out of it.
const litGrains = (x, y, w, hgt) => Array.from({ length: 24 }, (_, i) => { const u = ((i * 37) % 23) / 23, v = ((i * 53) % 19) / 19; return `<circle cx="${(x + u * w).toFixed(1)}" cy="${(y + v * hgt).toFixed(1)}" r=".7" fill="${i % 2 ? "#a88a56" : "#f1e2c0"}"/>`; }).join("");
const litClumps = (pts) => pts.map(([x, y], i) => `<g class="nta-clump ntd${i + 1}"><ellipse cx="${x}" cy="${y}" rx="2.6" ry="1.4" fill="#8d6e4a"/><ellipse cx="${x - .6}" cy="${y - .4}" rx="1.2" ry=".6" fill="#b08d62"/></g>`).join("");
// A globe that turns on its base, Litter-Robot style. While it cleans the
// door turns away and back; the litter stays at the bottom of the globe, seen
// through the door wherever it is.
function ntLitterGlobe(c) {
  const g = ntId(), bs = ntId(), bt = ntId(), sd = ntId(), ins = ntId(), lit = ntId(), dr = ntId();
  const door = "M36 44 Q36 22 60 20 Q84 22 84 44 Q84 60 60 62 Q36 60 36 44 Z";
  return `<defs><radialGradient id="${g}" cx=".36" cy=".3" r=".78"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#e3e8ec"/><stop offset="1" stop-color="#9eabb6"/></radialGradient>
${ntV(bs, "#3c434b", "#16191d")}${ntV(bt, "#5a636c", "#2b3036")}${ntV(sd, "#25292e", "#0e1013")}
<radialGradient id="${ins}" cx=".5" cy=".35" r=".7"><stop offset="0" stop-color="#3a4047"/><stop offset="1" stop-color="#0d1013"/></radialGradient>
${ntV(lit, "#e8d5ab", "#bfa06a")}<clipPath id="${dr}"><path class="nta-lrcycle" d="${door}"/></clipPath></defs>
${ntFoot("14 116 98 116 110 106 26 106", .3)}
${ntRoundBox(18, 70, 76, 45, 11, 4, `url(#${bs})`, `url(#${sd})`, `url(#${bt})`)}
<path d="M22 74 H90" stroke="#5a636c" stroke-width=".6"/>
<path d="M28 92 H84 Q86 92 86 94 V108 Q86 110 84 110 H28 Q26 110 26 108 V94 Q26 92 28 92 Z" fill="#20252a" stroke="#4a525b" stroke-width=".6"/>
${litDrawer(32, 97, 48, c.drawer)}
<path d="M48 105 H64" stroke="#5a636c" stroke-width="1.8" stroke-linecap="round"/>
<ellipse cx="60" cy="66" rx="30" ry="6" fill="#000" opacity=".35"/>
<circle cx="60" cy="38" r="34" fill="url(#${g})" stroke="#8e9ba6" stroke-width=".7"/>
<g clip-path="url(#${dr})"><circle cx="60" cy="38" r="34" fill="url(#${ins})"/>
<g class="nta-littilt" style="transform-origin:60px 56px"><path d="M14 56 H106 V96 H14 Z" fill="url(#${lit})"/><path d="M20 56 H100" stroke="#f3e5c4" stroke-width="1.2" opacity=".9"/>
${litGrains(30, 58, 60, 10)}${c.on ? litClumps([[48, 57], [66, 58], [58, 57.4]]) : ""}</g>
${c.cat && !c.on ? litCat(60, 42, 1.05) : ""}</g>
<path class="nta-lrcycle" d="${door}" fill="none" stroke="#c5ced6" stroke-width="2.4"/>
<path d="M30 30 Q34 12 52 6" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".85"/>
<rect x="54" y="80" width="12" height="4" rx="2" fill="#10151a"/><rect class="${litLedCls(c)}" x="55" y="81" width="10" height="2" rx="1" fill="${litLed(c)}"/>`;
}
// A box with rounded corners in three-quarter view, its depth going up and
// to the right at 45 degrees: the top and the side are the rounded outline
// swept back, so a rounded corner stays rounded on every face. They meet at
// the corner's 45 degree point, where the curve turns from one to the other.
function ntRoundBox(x0, y0, w, h, d, r, front, side, top, stroke = "") {
  const x1 = x0 + w, y1 = y0 + h, k = r * Math.SQRT1_2;
  const n = (v) => +v.toFixed(2);
  const B = (x, y) => `${n(x + d)} ${n(y - d)}`, F = (x, y) => `${n(x)} ${n(y)}`;
  const A = (sw, pt) => r ? `A${r} ${r} 0 0 ${sw} ${pt}` : `L${pt}`;
  const tl = [x0 + r - k, y0 + r - k], tr = [x1 - r + k, y0 + r - k], br = [x1 - r + k, y1 - r + k];
  const topFace = `M${F(...tl)} ${A(1, F(x0 + r, y0))} L${F(x1 - r, y0)} ${A(1, F(...tr))} L${B(...tr)} ${A(0, B(x1 - r, y0))} L${B(x0 + r, y0)} ${A(0, B(...tl))} Z`;
  const sideFace = `M${F(...tr)} ${A(1, F(x1, y0 + r))} L${F(x1, y1 - r)} ${A(1, F(...br))} L${B(...br)} ${A(0, B(x1, y1 - r))} L${B(x1, y0 + r)} ${A(0, B(...tr))} Z`;
  const frontFace = `M${F(x0 + r, y0)} H${n(x1 - r)} ${A(1, F(x1, y0 + r))} V${n(y1 - r)} ${A(1, F(x1 - r, y1))} H${n(x0 + r)} ${A(1, F(x0, y1 - r))} V${n(y0 + r)} ${A(1, F(x0 + r, y0))} Z`;
  return `<path d="${topFace}" fill="${top}"/><path d="${sideFace}" fill="${side}"/>
<path d="${frontFace}" fill="${front}"${stroke ? ` stroke="${stroke}" stroke-width=".7"` : ""}/>`;
}
// A closed box in three-quarter view, Petkit Pura style: a wide round
// entrance low on its front so the cat steps straight in, the litter lying
// flat inside, the drum turning around it while it cleans, and the waste
// drawer's gauge under the entrance.
function ntLitterBox(c) {
  const fr = ntId(), sd = ntId(), tp = ntId(), dr = ntId(), lit = ntId(), mt = ntId(), cp = ntId(), sh = ntId(), wl = ntId();
  const x0 = 8, y0 = 26, w = 88, h = 86, d = 16, r = 22;
  const x1 = x0 + w, y1 = y0 + h, ox = 52, oy = 70, orad = 30;
  return `<defs>${ntV(fr, "#ffffff", "#e3e8ec")}${ntV(sd, "#d3d9df", "#aab4bd")}${ntV(tp, "#f9fafb", "#e7ebee")}
<radialGradient id="${dr}" cx=".5" cy=".7" r=".8"><stop offset="0" stop-color="#e9edf0"/><stop offset=".55" stop-color="#bfc7ce"/><stop offset="1" stop-color="#7f8a94"/></radialGradient>${ntV(lit, "#ecdcb6", "#c4a670")}
<linearGradient id="${mt}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8c0c7"/><stop offset="1" stop-color="#8e98a1"/></linearGradient>
<linearGradient id="${sh}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".5"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
<linearGradient id="${wl}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e4e9ed"/><stop offset="1" stop-color="#b9c2ca"/></linearGradient><clipPath id="${cp}"><circle cx="${ox}" cy="${oy}" r="${orad - 2}"/></clipPath></defs>
${ntFoot(`${x0 - 4} ${y1 + 8} ${x1 + 2} ${y1 + 8} ${x1 + d + 4} ${y1 - d + 2} ${x0 + d} ${y1 - d + 2}`, .22)}
<path d="M6 122 Q4 118 10 116 H96 Q104 116 106 120 L98 124 Q96 125 92 125 H12 Q6 125 6 122 Z" fill="url(#${mt})"/>
${ntRoundBox(x0, y0, w, h, d, r, `url(#${fr})`, `url(#${sd})`, `url(#${tp})`, "#b3bdc5")}
<path d="M${x0 + 12} ${y0 + 5} Q${x0 + 36} ${y0 + 1.4} ${x0 + 62} ${y0 + 2.8}" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>
<rect x="38" y="31" width="28" height="4" rx="2" fill="#22272c"/><rect class="${litLedCls(c)}" x="40" y="32.1" width="24" height="1.8" rx=".9" fill="${litLed(c)}"/>
<circle cx="${ox}" cy="${oy + 1}" r="${orad + 2.4}" fill="#c9d1d8"/><circle cx="${ox}" cy="${oy}" r="${orad + 1.2}" fill="#eef1f4"/><circle cx="${ox}" cy="${oy}" r="${orad}" fill="url(#${dr})"/>
<g clip-path="url(#${cp})">
<rect x="${ox - orad}" y="${oy - orad}" width="${orad * 2}" height="10" fill="url(#${sh})"/>
<g class="nta-littilt" style="transform-origin:${ox}px ${oy + 14}px"><path d="M${ox - 40} ${oy + 12} H${ox + 40} V${oy + 40} H${ox - 40} Z" fill="url(#${lit})"/><path d="M${ox - 30} ${oy + 12} H${ox + 30}" stroke="#f7ecd0" stroke-width="1.2"/>
${litGrains(ox - 24, oy + 14, 48, 10)}${c.on ? litClumps([[ox - 9, oy + 13], [ox + 8, oy + 13.6], [ox, oy + 13]]) : ""}</g>
<g class="nta-lrcycle" style="transform-origin:${ox}px ${oy}px"><path d="M${ox - orad + 2} ${oy} a${orad - 2} ${orad - 2} 0 1 0 ${(orad - 2) * 2} 0 a${orad - 2} ${orad - 2} 0 1 0 ${-(orad - 2) * 2} 0 Z M${ox - 19} ${oy + 7} a19 19 0 1 1 38 0 a19 19 0 1 1 -38 0 Z" fill="url(#${wl})" fill-rule="evenodd" stroke="#8f9aa4" stroke-width=".6"/>
${[-50, 0, 50].map((a) => `<path d="M${ox} ${oy - orad + 4} v4" stroke="#9aa4ad" stroke-width="1.4" stroke-linecap="round" transform="rotate(${a} ${ox} ${oy})"/>`).join("")}</g>
${c.cat && !c.on ? litCat(ox, oy + 4, 1.2) : ""}</g>
<path d="M${ox - orad + 3} ${oy - 4} A${orad - 3} ${orad - 3} 0 0 1 ${ox + 4} ${oy - orad + 3}" fill="none" stroke="#fff" stroke-width="1" opacity=".35" stroke-linecap="round"/>
<path d="M${ox - orad - 1} ${oy + 6} A${orad + 1.6} ${orad + 1.6} 0 0 0 ${ox + orad + 1} ${oy + 6}" fill="none" stroke="#b7c0c8" stroke-width="1.2"/>
${litDrawer(30, 104.4, 44, c.drawer)}`;
}
// Sound waves on both sides of a detector or a speaker.
const ntWaves = (x, y, color, gap = 22) => `<g class="nt-run">${[0, 1, 2].map((i) => `<path class="nta-beacon ntd${i + 1}" d="M${x - gap - i * 6} ${y - 8 - i * 3} q-${4 + i * 2} ${8 + i * 3} 0 ${16 + i * 6}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round"/>
<path class="nta-beacon ntd${i + 1}" d="M${x + gap + i * 6} ${y - 8 - i * 3} q${4 + i * 2} ${8 + i * 3} 0 ${16 + i * 6}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round"/>`).join("")}</g>`;
// The detector's light: a slow green blink, amber on a low battery, red and
// fast on alarm, with its halo.
const detLed = (c, x, y, r = 2.2) => { const h = ntId(); const col = c.on ? "#ff1744" : c.low ? "#ffb300" : "#43a047"; return `<defs>${ntBlur(h, 1.6)}</defs>
<circle class="${c.on ? "nta-blinkfast" : "nta-blink"}" cx="${x}" cy="${y}" r="${r * 2.4}" fill="${col}" opacity=".55" filter="url(#${h})"/>
<circle class="${c.on ? "nta-blinkfast" : "nta-blink"}" cx="${x}" cy="${y}" r="${r}" fill="${col}"/>`; };
// A patch of floor, wall or ceiling that fades out at its edges, so the
// drawing does not sit in a box.
const ntPatch = (cx, cy, rx, ry, color) => { const g = ntId(); return `<defs><radialGradient id="${g}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${color}"/><stop offset=".65" stop-color="${color}" stop-opacity=".8"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient></defs>
<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${g})"/>`; };
const ntFade = (cx, cy, rx, ry) => { const m = ntId(), g = ntId(); return [m, `<defs><radialGradient id="${g}" cx=".5" cy=".5" r=".5"><stop offset=".45" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>
<mask id="${m}"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${g})"/></mask></defs>`]; };
// A corner of the room: a ceiling or a wall, softly lit.
const ntRoom = (id) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1f3f5"/><stop offset="1" stop-color="#dde2e7"/></linearGradient></defs>`;
// A puff of smoke: three soft blobs, light grey.
const ntPuff = (x, y, r, cls, f) => `<g class="${cls}" filter="url(#${f})"><circle cx="${x}" cy="${y}" r="${r}" fill="#cfd8dc" opacity=".8"/><circle cx="${(x + r * .8).toFixed(1)}" cy="${(y - r * .5).toFixed(1)}" r="${(r * .75).toFixed(1)}" fill="#eceff1" opacity=".85"/><circle cx="${(x - r * .7).toFixed(1)}" cy="${(y - r * .3).toFixed(1)}" r="${(r * .6).toFixed(1)}" fill="#b0bec5" opacity=".75"/></g>`;
// The smoke as it behaves: it rises from below, swells and thins out, then
// spreads under the ceiling to both sides of the detector.
const ntSmoke = (f) => `<g class="nt-run">${[[42, 114, 9, 1], [58, 118, 10, 3], [74, 114, 9, 5], [50, 120, 8, 2], [66, 118, 9, 4], [82, 120, 8, 6], [36, 120, 7, 4], [60, 112, 8, 6]].map(([x, y, r, d]) => ntPuff(x, y, r, `nta-smoke ntd${d}`, f)).join("")}
${[[48, 50, 7, "nta-spreadL ntd2"], [72, 50, 7, "nta-spreadR ntd4"], [44, 54, 6, "nta-spreadL ntd5"], [76, 54, 6, "nta-spreadR ntd1"], [54, 56, 6, "nta-spreadL ntd3"], [66, 56, 6, "nta-spreadR ntd6"]].map(([x, y, r, cls]) => ntPuff(x, y, r, cls, f)).join("")}</g>`;
// A smoke detector on the ceiling, seen from below: its face towards us, its
// vented rim going up to the ceiling. On alarm the smoke rises from the room
// and spreads under the ceiling around it.
function ntDetSmoke(c) {
  const b = ntId(), sd = ntId(), bt = ntId(), pf = ntId(), rg = ntId(), cl = ntId();
  const cx = 60, cy = 50, rx = 46, ry = 14, h = 12;
  const puff = (x, y, r, cls) => `<g class="${cls}"><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${pf})"/><circle cx="${(x + r * .7).toFixed(1)}" cy="${(y - r * .45).toFixed(1)}" r="${(r * .72).toFixed(1)}" fill="url(#${pf})"/><circle cx="${(x - r * .65).toFixed(1)}" cy="${(y - r * .3).toFixed(1)}" r="${(r * .6).toFixed(1)}" fill="url(#${pf})"/></g>`;
  const slots = [];
  for (let i = 0; i < 15; i++) { const a = Math.PI * (1.08 + i * .06); const x = cx + Math.cos(a) * rx * .97; const y = cy - h + Math.sin(a) * ry * .97 + h * .5; slots.push(`<rect x="${(x - .9).toFixed(1)}" y="${(y - 2.6).toFixed(1)}" width="1.8" height="5.2" rx=".9" fill="#9aa6b0" opacity="${(.35 + .65 * Math.sin((i + .5) / 15 * Math.PI)).toFixed(2)}"/>`); }
  return `<defs><radialGradient id="${b}" cx=".42" cy=".4" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset=".75" stop-color="#eef1f4"/><stop offset="1" stop-color="#cdd4da"/></radialGradient>
<linearGradient id="${sd}" x1="0" x2="1"><stop offset="0" stop-color="#b9c2ca"/><stop offset=".45" stop-color="#eef1f4"/><stop offset="1" stop-color="#aeb8c1"/></linearGradient>
<radialGradient id="${bt}" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d6dce2"/></radialGradient>
<radialGradient id="${pf}" cx=".45" cy=".4" r=".55"><stop offset="0" stop-color="#7f8c97" stop-opacity=".85"/><stop offset=".6" stop-color="#a3afb9" stop-opacity=".6"/><stop offset="1" stop-color="#cfd8dc" stop-opacity="0"/></radialGradient>
<radialGradient id="${rg}" cx=".5" cy=".5" r=".5"><stop offset=".55" stop-color="#ff1744" stop-opacity=".55"/><stop offset="1" stop-color="#ff1744" stop-opacity="0"/></radialGradient>
<linearGradient id="${cl}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9dee3"/><stop offset="1" stop-color="#d9dee3" stop-opacity="0"/></linearGradient></defs>
${ntPatch(60, 20, 80, 30, "#e3e7eb")}
${c.on ? `<ellipse class="nta-blinkfast" cx="${cx}" cy="${cy}" rx="${rx + 14}" ry="${ry + 9}" fill="url(#${rg})"/>
<g class="nt-run">${[[40, 118, 9, 1], [60, 122, 10, 3], [80, 118, 9, 5], [50, 124, 8, 2], [70, 122, 9, 4], [30, 124, 7, 6], [90, 124, 7, 3]].map(([x, y, r, d]) => puff(x, y, r, `nta-smoke ntd${d}`)).join("")}
${[[46, 62, 8, "nta-spreadL ntd2"], [74, 62, 8, "nta-spreadR ntd4"], [52, 66, 7, "nta-spreadL ntd5"], [68, 66, 7, "nta-spreadR ntd1"], [60, 64, 7, "nta-spreadL ntd6"]].map(([x, y, r, cls]) => puff(x, y, r, cls)).join("")}</g>` : ""}
<ellipse cx="${cx}" cy="${cy - h}" rx="${rx + 4}" ry="${ry + 2}" fill="#000" opacity=".07"/>
<path d="M${cx - rx} ${cy} V${cy - h} A${rx} ${ry} 0 0 1 ${cx + rx} ${cy - h} V${cy} Z" fill="url(#${sd})"/>
${slots.join("")}
<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${b})" stroke="#b5bfc8" stroke-width=".6"/>
<ellipse cx="${cx}" cy="${cy}" rx="${rx * .82}" ry="${ry * .82}" fill="none" stroke="#d3d9df" stroke-width="1"/>
${Array.from({ length: 16 }, (_, i) => { const a = i * Math.PI / 8; return `<path d="M${(cx + Math.cos(a) * rx * .36).toFixed(1)} ${(cy + Math.sin(a) * ry * .36).toFixed(1)} L${(cx + Math.cos(a) * rx * .72).toFixed(1)} ${(cy + Math.sin(a) * ry * .72).toFixed(1)}" stroke="#c2cad2" stroke-width="1.8" stroke-linecap="round"/>`; }).join("")}
<ellipse cx="${cx}" cy="${cy + 1.2}" rx="${rx * .3}" ry="${ry * .3}" fill="#c9d0d7"/><ellipse cx="${cx}" cy="${cy}" rx="${rx * .28}" ry="${ry * .28}" fill="url(#${bt})" stroke="#b5bfc8" stroke-width=".5"/>
<path d="M${cx - rx * .7} ${cy - ry * .45} Q${cx - rx * .3} ${cy - ry * .85} ${cx + rx * .1} ${cy - ry * .86}" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".9"/>
${c.on ? `<ellipse class="nta-blinkfast" cx="${cx}" cy="${cy}" rx="${rx + 1}" ry="${ry + 1}" fill="none" stroke="#ff1744" stroke-width="1.8"/>` : ""}
${detLed(c, cx + rx * .5, cy + ry * .42, 1.5)}
${c.on ? ntWaves(cx, cy + 30, "#e53935", 26) : ""}`;
}
// A CO alarm on the wall, its display reading the parts per million.
function ntDetCo(c) {
  const rm = ntId(), b = ntId(), sd = ntId(), al = ntId();
  return `${ntRoom(rm)}<defs>${ntV(b, "#ffffff", "#d7dde3")}${ntV(sd, "#c9d1d8", "#a2adb7")}<radialGradient id="${al}" cx=".5" cy=".5" r=".5"><stop offset=".55" stop-color="#ff1744" stop-opacity=".45"/><stop offset="1" stop-color="#ff1744" stop-opacity="0"/></radialGradient></defs>
${ntPatch(62, 58, 58, 60, "#e7ebef")}
${c.on ? `<ellipse class="nta-blinkfast" cx="60" cy="56" rx="50" ry="58" fill="url(#${al})"/>` : ""}
${ntWaves(62, 46, "#e53935", 36)}
${ntFoot("36 108 92 108 96 104 40 104", .2)}
${ntRoundBox(32, 12, 54, 92, 6, 12, `url(#${b})`, `url(#${sd})`, "#eef1f4", "#aab4bd")}
<path d="M38 18 Q58 14 80 18" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>
${Array.from({ length: 21 }, (_, i) => `<circle cx="${43 + (i % 7) * 5.4}" cy="${26 + Math.floor(i / 7) * 5.6}" r="1.5" fill="#9fabb5"/>`).join("")}
<rect x="38" y="46" width="42" height="22" rx="3" fill="#1f262d"/>
${ntLcd(39.4, 47.4, 39.2, 19.2, c.lcd || "", true, c.on ? "#ff5252" : "#69f0ae", ntFit(c.lcd || "", 39, 9))}
<text x="59" y="80" font-size="10" font-weight="800" text-anchor="middle" fill="${c.on ? "#e53935" : "#37414b"}" ${NT_FONT}>CO</text>
<text x="59" y="86" font-size="3.6" text-anchor="middle" fill="#7a8590" ${NT_FONT}>ALARM</text>
<circle cx="50" cy="95" r="5" fill="#eef1f4" stroke="#aab4bd" stroke-width=".6"/><text x="50" y="96.4" font-size="3.4" text-anchor="middle" fill="#5d6773" ${NT_FONT}>TEST</text>
${detLed(c, 70, 95)}`;
}
// A leak sensor on the floor, and the water that sets it off.
function ntDetLeak(c) {
  const fl = ntId(), wl = ntId(), b = ntId(), sd = ntId(), pd = ntId();
  return `<defs><linearGradient id="${fl}" x1="0" y1="1" x2=".3" y2="0"><stop offset="0" stop-color="#c7cfd5"/><stop offset="1" stop-color="#e3e8ec"/></linearGradient>${ntV(wl, "#f3f5f7", "#e2e6ea")}
<radialGradient id="${b}" cx=".4" cy=".3" r=".75"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dfe5ea"/></radialGradient>${ntV(sd, "#d3dae0", "#a9b4bd")}
<radialGradient id="${pd}" cx=".45" cy=".45" r=".55"><stop offset="0" stop-color="#4fc3f7" stop-opacity=".75"/><stop offset=".8" stop-color="#29b6f6" stop-opacity=".45"/><stop offset="1" stop-color="#29b6f6" stop-opacity="0"/></radialGradient></defs>
${(() => { const [m, d] = ntFade(60, 84, 70, 42); return `${d}<g mask="url(#${m})"><polygon points="-8 125 128 125 128 53 -8 53" fill="url(#${fl})"/>
${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M${-14 + i * 24} 125 L${10 + i * 24} 53" stroke="#aeb8c0" stroke-width=".8"/>`).join("")}
${[66, 80, 98].map((y) => `<path d="M-8 ${y} H128" stroke="#aeb8c0" stroke-width=".8"/>`).join("")}</g>`; })()}
<g transform="translate(60 78) scale(1.45) translate(-60 -86)"><g class="nt-run"><ellipse class="nta-shimmer" cx="58" cy="94" rx="58" ry="20" fill="url(#${pd})"/>
${[0, 1, 2].map((i) => `<ellipse class="nta-pop ntd${i * 2 + 1}" cx="58" cy="94" rx="${30 + i * 10}" ry="${10 + i * 3.4}" fill="none" stroke="#e1f5fe" stroke-width=".8" opacity="0"/>`).join("")}</g>
${ntFoot("34 100 86 100 82 92 38 92", .25)}
<path d="M32 86 V92 Q32 101 60 101 Q88 101 88 92 V86 Z" fill="url(#${sd})"/>
${[0, 1, 2, 3].map((i) => `<rect x="${41 + i * 11}" y="${97.6 - Math.abs(1.5 - i) * .8}" width="3" height="2.6" rx=".6" fill="#b0bec5" stroke="#78909c" stroke-width=".4"/>`).join("")}
<ellipse cx="60" cy="86" rx="28" ry="9.4" fill="url(#${b})" stroke="#b5bfc8" stroke-width=".6"/>
<ellipse cx="60" cy="86" rx="18" ry="5.6" fill="none" stroke="#d8dee3" stroke-width="1"/>
<path d="M40 82 Q50 78 62 78" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
${detLed(c, 60, 86, 2)}
<g class="nt-run">${[[54, 1], [66, 3], [60, 5]].map(([x, d]) => `<ellipse class="nta-splash ntd${d}" cx="${x}" cy="84.6" rx="6" ry="1.8" fill="none" stroke="#4fc3f7" stroke-width=".9"/>
<path class="nta-drip ntd${d}" d="M${x} 78 q-2.6 3.8 0 5.4 q2.6 -1.6 0 -5.4 Z" fill="#4fc3f7" stroke="#0288d1" stroke-width=".3"/>`).join("")}</g>
${ntWaves(60, 66, "#e53935", 36)}</g>`;
}
// Musical notes rising while a speaker plays.
const spkNotes = (x, y) => `<g class="nt-run">${[["\u266a", 0, 0, 10], ["\u266b", 15, 7, 11], ["\u266a", -14, 10, 9]].map(([n, dx, dy, fs], i) => `<text class="nta-rise ntd${i * 2 + 1}" x="${x + dx}" y="${y + dy}" font-size="${fs}" fill="var(--primary-color, #03a9f4)" ${NT_FONT}>${n}</text>`).join("")}</g>`;
const spkMute = (x, y) => `<g><circle cx="${x + 6}" cy="${y}" r="7" fill="#fff" stroke="#cfd6dc" stroke-width=".6"/><path d="M${x + 1.4} ${y - 2} h2.4 l3.4 -2.6 v9.2 l-3.4 -2.6 h-2.4 Z" fill="#5d6773"/><path d="M${x + 8.6} ${y - 1.8} l3.6 3.6 M${x + 12.2} ${y - 1.8} l-3.6 3.6" stroke="#e53935" stroke-width="1.3" stroke-linecap="round"/></g>`;
const spkPause = (x, y, col = "#fff") => `<rect x="${x - 4.4}" y="${y - 5}" width="3.2" height="10" rx="1" fill="${col}" opacity=".9"/><rect x="${x + 1.2}" y="${y - 5}" width="3.2" height="10" rx="1" fill="${col}" opacity=".9"/>`;
// The colours each speaker comes in, the first one its own when none is set:
// [highlight, body, shade, top, detail]. A colour a model is not sold in
// falls back to its first.
const SPK_COLORS = ["white", "black", "silver", "yellow", "orange", "blue"];
const SPK_PALETTES = {
  homepod: { black: ["#5b636c", "#3c434a", "#1f2328", "#2c3238", "#15181b"], white: ["#fbfaf7", "#e7e5e0", "#c3c1bb", "#dcdad5", "#f4f3f0"] },
  mini: { black: ["#6a737c", "#3c434a", "#1c2024", "#2c3238", "#15181b"], white: ["#fbfaf7", "#e4e2dd", "#bdbbb5", "#d8d6d1", "#f1f0ec"],
    yellow: ["#fff2a8", "#f2d14b", "#c9a52a", "#e3c13d", "#fae58a"], orange: ["#ffc79a", "#ef8f45", "#c4692a", "#e07f38", "#f9b077"],
    blue: ["#9fc0de", "#4f7ca6", "#2f557a", "#45719a", "#7ea3c6"] },
  sonos: { black: ["#4a5058", "#2a2e33", "#16191c", "#1f2226", "#0b0d0f"], white: ["#ffffff", "#ecebe8", "#c8c7c3", "#f6f5f2", "#b9b8b3"] },
  bose500: { silver: ["#f1f3f5", "#cfd3d7", "#9aa1a8", "#e3e6e9", "#8e959c"], black: ["#565b61", "#2e3236", "#17191c", "#3a3e43", "#0d0f11"] },
  wave: { black: ["#5e636a", "#3a3e44", "#1f2226", "#4a4f55", "#15171a"], silver: ["#eef0f2", "#c9cdd1", "#959ca3", "#dfe2e5", "#6f767d"] },
  flex: { black: ["#4b4f55", "#2b2e32", "#151719", "#36393e", "#0f1012"], white: ["#f6f4ee", "#dedbd2", "#b5b1a6", "#ebe8e0", "#8f8b80"],
    blue: ["#8fb1d1", "#4a72a0", "#2b4b71", "#5a82ae", "#1e3550"] },
};
function spkPal(model, color) {
  const set = SPK_PALETTES[model];
  return set[color] || set[Object.keys(set)[0]];
}
// The colour a speaker is drawn in: speaker_color, else its name, else the
// card's illustration_color.
function speakerColorOf(cfg, st) {
  if (SPK_COLORS.includes(cfg.speaker_color)) return cfg.speaker_color;
  const hay = stripAccents(`${cfg.state_entity || ""} ${cfg.name || ""} ${(st && st.attributes.friendly_name) || ""}`).toLowerCase();
  const words = [["white", /white|blanc|weiss|blanco|bianco|wit|vit|hvit|arctic|stone/], ["black", /black|noir|midnight|minuit|schwarz|negro|nero|zwart|svart|graphite|space.?gr[ae]y/],
    ["silver", /silver|argent|platin|silber/], ["yellow", /yellow|jaune|gelb|amarillo|giallo/], ["orange", /orange/], ["blue", /blue|bleu|blau|azul|blu([^a-z]|$)/]];
  const hit = words.find(([, re]) => re.test(hay));
  if (hit) return hit[0];
  if (cfg.illustration_color === "white") return "white";
  if (cfg.illustration_color === "black") return "black";
  if (cfg.illustration_color === "grey") return "silver";
  return "";
}
// A body lit from the left, as the round speakers are.
const spkSide = (id, p) => `<linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="${p[2]}"/><stop offset=".22" stop-color="${p[1]}"/><stop offset=".36" stop-color="${p[0]}"/><stop offset=".72" stop-color="${p[1]}"/><stop offset="1" stop-color="${p[2]}"/></linearGradient>`;
// The bottom of a body falling into shade.
const spkFoot = (id) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></linearGradient>`;
// Apple's knit, in fine rows.
const spkKnit = (id, col) => `<pattern id="${id}" width="2.2" height="1.7" patternUnits="userSpaceOnUse"><path d="M0 .85 Q.55 .35 1.1 .85 T2.2 .85" fill="none" stroke="${col}" stroke-width=".5" opacity=".55"/></pattern>`;
// A perforated grille.
const spkHoles = (id, col, step = 1.9, r = .48) => `<pattern id="${id}" width="${step}" height="${step}" patternUnits="userSpaceOnUse"><circle cx="${step / 2}" cy="${step / 2}" r="${r}" fill="${col}"/></pattern>`;
// The Siri swirl on top of a HomePod while it plays, its glass dark at rest.
const spkSwirl = (c, cx, cy, rx, ry, r, gl, rest) => (c.on
  ? `<ellipse class="nta-glow" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${r})" filter="url(#${gl})"/><ellipse class="nta-shimmer" cx="${cx}" cy="${cy}" rx="${rx * .62}" ry="${ry * .62}" fill="url(#${r})"/>`
  : `<ellipse cx="${cx}" cy="${cy}" rx="${rx * .62}" ry="${ry * .62}" fill="${c.st === "paused" ? "#8f98a2" : rest}" opacity=".9"/>`);
const spkLed = (c, x, y, r = 1.1, col = "#ffffff") => `<circle class="${c.on ? "nta-glow" : ""}" cx="${x}" cy="${y}" r="${r}" fill="${c.on ? col : c.st === "paused" ? "#ffb300" : "#5d6773"}"/>`;
const spkLogo = (x, y, col, size = 4.2, word = "BOSE") => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-weight="700" letter-spacing=".5" fill="${col}" ${NT_FONT}>${word}</text>`;

// A HomePod: a column of knit with rounded shoulders, the glass on top lit
// with the Siri swirl while it plays.
function ntSpkSmart(c) {
  const p = spkPal("homepod", c.color);
  const b = ntId(), k = ntId(), sh = ntId(), r = ntId(), gl = ntId(), tp = ntId();
  const light = c.color === "white";
  const body = "M35 47 C35 39.6 45 36 60 36 C75 36 85 39.6 85 47 V96 Q85 111 70 111 H50 Q35 111 35 96 Z";
  return `<defs>${spkSide(b, p)}${spkKnit(k, light ? "#bdbab4" : "#0c0e10")}${spkFoot(sh)}${spkGlowDefs(r, gl)}
<radialGradient id="${tp}" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="${p[4]}"/><stop offset="1" stop-color="${p[3]}"/></radialGradient></defs>
${spkNotes(66, 4)}${ntWaves(60, 70, "var(--primary-color, #03a9f4)", 33)}
${ntShadow(60, 112, 24)}
<path d="${body}" fill="url(#${b})"/><path d="${body}" fill="url(#${k})"/><path d="${body}" fill="url(#${sh})"/>
<path d="M39 46 Q40 40.6 47 39" fill="none" stroke="#fff" stroke-width="1.6" opacity="${light ? .9 : .25}" stroke-linecap="round"/>
<path d="M41 50 V96" stroke="#fff" stroke-width="2.6" opacity="${light ? .45 : .12}" stroke-linecap="round"/>
<ellipse cx="60" cy="40" rx="17" ry="3.2" fill="${p[2]}" opacity=".55"/>
<ellipse cx="60" cy="39.8" rx="15.4" ry="2.7" fill="url(#${tp})"/>
${spkSwirl(c, 60, 39.8, 10.4, 1.9, r, gl, light ? "#cfccc6" : "#0f1113")}
${c.st === "paused" ? spkPause(60, 72, light ? "#7d7a74" : "#fff") : ""}${c.muted ? spkMute(66, 100) : ""}`;
}
// A HomePod mini: a ball of knit cut flat on top, the touch glass lit while
// it plays, in its five colours.
function ntSpkMini(c) {
  const p = spkPal("mini", c.color);
  const b = ntId(), k = ntId(), r = ntId(), gl = ntId(), tp = ntId();
  const light = c.color && c.color !== "black";
  const ball = "M42.6 54 A30 30 0 0 0 42.8 103 H77.2 A30 30 0 0 0 77.4 54 Z";
  return `<defs><radialGradient id="${b}" cx=".34" cy=".3" r=".85"><stop offset="0" stop-color="${p[0]}"/><stop offset=".55" stop-color="${p[1]}"/><stop offset="1" stop-color="${p[2]}"/></radialGradient>
${spkKnit(k, light ? "#000" : "#0c0e10")}${spkGlowDefs(r, gl)}
<radialGradient id="${tp}" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="${p[4]}"/><stop offset="1" stop-color="${p[3]}"/></radialGradient></defs>
${spkNotes(64, 18)}${ntWaves(60, 78, "var(--primary-color, #03a9f4)", 36)}
${ntShadow(60, 107, 22)}
<ellipse cx="60" cy="103.4" rx="15.6" ry="2.2" fill="${p[2]}"/><ellipse cx="60" cy="103.8" rx="11" ry="1.4" fill="#000" opacity=".35"/>
<path d="${ball}" fill="url(#${b})"/><path d="${ball}" fill="url(#${k})" opacity="${light ? .35 : 1}"/>
<path d="M36 72 Q37 60 46 56" fill="none" stroke="#fff" stroke-width="2.2" opacity="${light ? .55 : .2}" stroke-linecap="round"/>
<ellipse cx="60" cy="54.2" rx="17.6" ry="4.2" fill="${p[2]}"/>
<ellipse cx="60" cy="53.8" rx="15.6" ry="3.5" fill="url(#${tp})"/>
${spkSwirl(c, 60, 53.8, 10, 2.2, r, gl, light ? p[2] : "#0f1113")}
${c.st === "paused" ? spkPause(60, 80, light ? "#00000080" : "#fff") : ""}${c.muted ? spkMute(70, 102) : ""}`;
}
// The touch controls on top of a Sonos: play, the volume either side, its light.
const sonosTop = (c, cx, cy, s, col) => `<g transform="translate(${cx} ${cy}) scale(${s} ${s * .36})" opacity=".85">
${c.on ? `<rect x="-2.2" y="-2.6" width="1.5" height="5.2" fill="${col}"/><rect x=".7" y="-2.6" width="1.5" height="5.2" fill="${col}"/>` : `<path d="M-1.6 -2.8 L2.6 0 L-1.6 2.8 Z" fill="${col}"/>`}
<path d="M-13 0 h5 M8 0 h5 M10.5 -2.5 v5" stroke="${col}" stroke-width="1.4"/></g>`;
// A Sonos One: a squarish column, its grille wrapping round, the controls on top.
function ntSpkOne(c) {
  const p = spkPal("sonos", c.color);
  const f = ntId(), h = ntId(), sh = ntId();
  const light = c.color === "white";
  return `<defs>${spkSide(f, p)}${spkHoles(h, light ? "#a9a8a3" : "#08090a")}${spkFoot(sh)}</defs>
${spkNotes(62, 2)}${ntWaves(60, 68, "var(--primary-color, #03a9f4)", 32)}
${ntShadow(60, 111, 26)}
<path d="M35 44 Q35 33 46 33 H74 Q85 33 85 44 V100 Q85 110 75 110 H45 Q35 110 35 100 Z" fill="url(#${f})"/>
<path d="M37 47 Q37 40 44 40 H76 Q83 40 83 47 V99 Q83 107 76 107 H44 Q37 107 37 99 Z" fill="url(#${h})"/>
<path d="M35 44 Q35 33 46 33 H74 Q85 33 85 44 V100 Q85 110 75 110 H45 Q35 110 35 100 Z" fill="url(#${sh})"/>
<path d="M37 42 Q38 35 46 35 H74 Q82 35 83 42 Q60 44.6 37 42 Z" fill="${p[3]}"/>
${sonosTop(c, 60, 38.4, .9, light ? "#8f8e89" : "#c7ccd1")}${spkLed(c, 77, 37.6, .8)}
<path d="M39 50 V98" stroke="#fff" stroke-width="2" opacity="${light ? .6 : .1}" stroke-linecap="round"/>
${c.st === "paused" ? spkPause(60, 74, light ? "#6f6e69" : "#fff") : ""}${c.muted ? spkMute(66, 100) : ""}`;
}
// A Sonos Era 100: taller and softer than the One, its top sloping to a
// groove for the volume.
function ntSpkEra100(c) {
  const p = spkPal("sonos", c.color);
  const f = ntId(), h = ntId(), sh = ntId();
  const light = c.color === "white";
  const body = "M37 44 Q37 26 60 26 Q83 26 83 44 V96 Q83 111 68 111 H52 Q37 111 37 96 Z";
  return `<defs>${spkSide(f, p)}${spkHoles(h, light ? "#a9a8a3" : "#08090a", 1.7, .44)}${spkFoot(sh)}</defs>
${spkNotes(64, -2)}${ntWaves(60, 68, "var(--primary-color, #03a9f4)", 31)}
${ntShadow(60, 112, 24)}
<path d="${body}" fill="url(#${f})"/>
<path d="M39 46 Q39 34 60 34 Q81 34 81 46 V95 Q81 108 67 108 H53 Q39 108 39 95 Z" fill="url(#${h})"/>
<path d="${body}" fill="url(#${sh})"/>
<path d="M39.6 36 Q42 27.6 60 27.6 Q78 27.6 80.4 36 Q60 39 39.6 36 Z" fill="${p[3]}"/>
<path d="M50 32.6 Q60 34 70 32.6" fill="none" stroke="${light ? "#bdbcb7" : "#0b0d0f"}" stroke-width="1.6" stroke-linecap="round"/>
${sonosTop(c, 60, 30.4, .62, light ? "#8f8e89" : "#c7ccd1")}${spkLed(c, 75, 31.6, .8)}
<path d="M41 48 V96" stroke="#fff" stroke-width="2" opacity="${light ? .6 : .1}" stroke-linecap="round"/>
${c.st === "paused" ? spkPause(60, 74, light ? "#6f6e69" : "#fff") : ""}${c.muted ? spkMute(66, 101) : ""}`;
}
// A Sonos Era 300: the hourglass, wide at the top and the foot and drawn in at
// the waist, its grille all over.
function ntSpkEra300(c) {
  const p = spkPal("sonos", c.color);
  const f = ntId(), h = ntId(), sh = ntId();
  const light = c.color === "white";
  const body = "M22 50 C22 41 29 38 37 38 H83 C91 38 98 41 98 50 C98 62 87 68 87 78 C87 88 97 94 97 102 C97 109 91 111 84 111 H36 C29 111 23 109 23 102 C23 94 33 88 33 78 C33 68 22 62 22 50 Z";
  const grille = "M25 51 C25 44 31 42.6 37 42.6 H83 C89 42.6 95 44 95 51 C95 62 84.4 68 84.4 78 C84.4 88 94 94 94 101 C94 106 89 108 84 108 H36 C31 108 26 106 26 101 C26 94 35.6 88 35.6 78 C35.6 68 25 62 25 51 Z";
  return `<defs>${spkSide(f, p)}${spkHoles(h, light ? "#a9a8a3" : "#08090a", 1.7, .44)}${spkFoot(sh)}</defs>
${spkNotes(64, 10)}${ntWaves(60, 76, "var(--primary-color, #03a9f4)", 44)}
${ntShadow(60, 112, 36)}
<path d="${body}" fill="url(#${f})"/><path d="${grille}" fill="url(#${h})"/><path d="${body}" fill="url(#${sh})"/>
<path d="M25 44 Q30 38.6 40 38.6 H80 Q90 38.6 95 44 Q60 47 25 44 Z" fill="${p[3]}"/>
${sonosTop(c, 60, 42.2, .8, light ? "#8f8e89" : "#c7ccd1")}${spkLed(c, 82, 41.6, .8)}
<path d="M29 52 Q30 62 37 70" fill="none" stroke="#fff" stroke-width="2" opacity="${light ? .6 : .12}" stroke-linecap="round"/>
${c.st === "paused" ? spkPause(60, 76, light ? "#6f6e69" : "#fff") : ""}${c.muted ? spkMute(84, 100) : ""}`;
}
// A Sonos Move: a tall oval on its charging base, the handle cut into its back.
function ntSpkMove(c) {
  const p = spkPal("sonos", c.color);
  const f = ntId(), h = ntId(), bs = ntId(), sh = ntId();
  const light = c.color === "white";
  const body = "M37 36 Q37 17 60 17 Q83 17 83 36 V95 Q83 108 60 108 Q37 108 37 95 Z";
  return `<defs>${spkSide(f, p)}${spkHoles(h, light ? "#a9a8a3" : "#08090a", 1.8, .46)}${ntV(bs, light ? "#e2e1dd" : "#3a4047", light ? "#b3b2ad" : "#16191d")}${spkFoot(sh)}</defs>
${spkNotes(62, -6)}${ntWaves(60, 64, "var(--primary-color, #03a9f4)", 32)}
${ntShadow(60, 113, 26)}
<path d="M39 105 H81 L85 111 Q85 113.6 81 113.6 H39 Q35 113.6 35 111 Z" fill="url(#${bs})"/>
<path d="${body}" fill="url(#${f})"/>
<path d="M39 40 Q39 32 47 32 H73 Q81 32 81 40 V94 Q81 105 60 105 Q39 105 39 94 Z" fill="url(#${h})"/>
<path d="${body}" fill="url(#${sh})"/>
<path d="M47 21.6 Q60 16 73 21.6 Q71 26.6 60 26 Q49 26.6 47 21.6 Z" fill="${light ? "#c9c8c3" : "#0b0d0f"}"/>
${sonosTop(c, 60, 29, .7, light ? "#8f8e89" : "#c7ccd1")}${spkLed(c, 60, 101, 1)}
<path d="M41 42 V94" stroke="#fff" stroke-width="2" opacity="${light ? .6 : .1}" stroke-linecap="round"/>
${c.st === "paused" ? spkPause(60, 66, light ? "#6f6e69" : "#fff") : ""}${c.muted ? spkMute(70, 22) : ""}`;
}
// The television and the low cabinet a soundbar sits on.
function spkTvCabinet(tv, sc, cb, ct) {
  return `${ntPatch(60, 30, 66, 46, "#e9edf0")}
<rect x="10" y="-2" width="100" height="58" rx="2.6" fill="url(#${tv})"/>
<rect x="13" y="1" width="94" height="52" rx="1.2" fill="url(#${sc})"/>
<path d="M13 1 L54 1 L30 53 L13 53 Z" fill="#fff" opacity=".05"/>
${spkNotes(60, 40)}
${ntWaves(60, 78, "var(--primary-color, #03a9f4)", 54)}
${ntFoot("6 118 104 118 116 108 18 108", .3)}
${ntRoundBox(6, 94, 96, 24, 11, 2, `url(#${cb})`, "#5d4430", `url(#${ct})`)}
<path d="M54 96 V116" stroke="#5d4430" stroke-width=".8"/><circle cx="50" cy="106" r="1.1" fill="#e0d2bf"/><circle cx="58" cy="106" r="1.1" fill="#e0d2bf"/>`;
}
const spkTvDefs = (tv, sc, cb, ct) => `${ntV(tv, "#2b3036", "#121518")}${ntV(cb, "#a98a66", "#7a5f42")}${ntV(ct, "#c9ab84", "#a98a66")}
<linearGradient id="${sc}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a5878"/><stop offset=".6" stop-color="#1d3047"/><stop offset="1" stop-color="#0f1c2b"/></linearGradient>`;
// A soundbar (Sonos Arc, Beam) on a low cabinet under the television: a long
// rounded bar, perforated all along, its light on top.
function ntSpkBar(c) {
  const p = spkPal("sonos", c.color);
  const b = ntId(), tv = ntId(), cb = ntId(), ct = ntId(), sc = ntId(), h = ntId();
  const light = c.color === "white";
  return `<defs>${spkTvDefs(tv, sc, cb, ct)}${ntV(b, p[0], p[2])}${spkHoles(h, light ? "#a9a8a3" : "#08090a", 1.6, .42)}</defs>
${spkTvCabinet(tv, sc, cb, ct)}
<ellipse cx="60" cy="85" rx="48" ry="2.4" fill="#000" opacity=".22"/>
<path d="M18 70 H102 Q109 70 109 77 Q109 84 102 84 H18 Q11 84 11 77 Q11 70 18 70 Z" fill="url(#${b})"/>
<path d="M18 74 H102 Q106 74 106 78 Q106 82 102 82 H18 Q14 82 14 78 Q14 74 18 74 Z" fill="url(#${h})"/>
<path d="M20 71.6 H100" stroke="#fff" stroke-width=".8" opacity="${light ? .9 : .3}" stroke-linecap="round"/>
${spkLed(c, 60, 72.6, .9)}
${c.st === "paused" ? spkPause(60, 28) : ""}${c.muted ? spkMute(92, 62) : ""}`;
}
// A Bose Smart Soundbar on the same cabinet: a slimmer bar wrapped in its
// metal grille, the glass on top and its light bar.
function ntSpkBoseBar(c) {
  const p = spkPal("bose500", c.color === "white" ? "silver" : c.color);
  const b = ntId(), tv = ntId(), cb = ntId(), ct = ntId(), sc = ntId(), h = ntId(), g = ntId();
  const light = c.color === "white" || c.color === "silver";
  return `<defs>${spkTvDefs(tv, sc, cb, ct)}${ntV(b, p[0], p[2])}${spkHoles(h, light ? "#7d848b" : "#050607", 1.5, .4)}${ntBlur(g, 1.2)}</defs>
${spkTvCabinet(tv, sc, cb, ct)}
<ellipse cx="60" cy="84" rx="50" ry="2.2" fill="#000" opacity=".22"/>
<path d="M14 73 Q14 71 17 71 H103 Q106 71 106 73 V80 Q106 83 103 83 H17 Q14 83 14 80 Z" fill="url(#${b})"/>
<path d="M14 74 H106 V80 Q106 83 103 83 H17 Q14 83 14 80 Z" fill="url(#${h})"/>
<path d="M15 71.8 H105" stroke="#0b0d0f" stroke-width="1.6" stroke-linecap="round"/>
${c.on ? `<path class="nta-glow" d="M54 71.8 H66" stroke="#fff" stroke-width="1.4" stroke-linecap="round" filter="url(#${g})"/><path d="M55 71.8 H65" stroke="#fff" stroke-width=".7" stroke-linecap="round"/>` : ""}
${spkLogo(60, 81.4, light ? "#5d646b" : "#9aa1a8", 3.2)}
${c.st === "paused" ? spkPause(60, 28) : ""}${c.muted ? spkMute(92, 62) : ""}`;
}
// A Bose Wave SoundTouch: the wide table unit with its arched top and the CD
// slot, the display between its grilles, on its SoundTouch pedestal.
function ntSpkWave(c) {
  const p = spkPal("wave", c.color);
  const b = ntId(), sh = ntId(), h = ntId(), ped = ntId();
  const light = c.color === "silver" || c.color === "white";
  const lit = c.on || c.st === "paused" || c.st === "idle";
  const body = "M20 72 Q20 64.6 27 63.8 Q60 60.6 93 63.8 Q100 64.6 100 72 V96 Q100 102 94 102 H26 Q20 102 20 96 Z";
  return `<defs>${ntV(b, p[1], p[2])}${spkHoles(h, light ? "#6f767d" : "#0b0c0e", 1.5, .45)}${ntV(ped, p[2], "#111316")}
<linearGradient id="${sh}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p[0]}"/><stop offset=".22" stop-color="${p[0]}" stop-opacity="0"/></linearGradient></defs>
${spkNotes(60, 36)}${ntWaves(60, 86, "var(--primary-color, #03a9f4)", 41)}
${ntFoot("24 110 96 110 102 102 18 102", .28)}
<path d="M32 101 H88 L86 107 H34 Z" fill="url(#${ped})"/>
<path d="${body}" fill="url(#${b})"/><path d="${body}" fill="url(#${sh})"/>
<path d="M27 64.6 Q60 61.6 93 64.6" fill="none" stroke="#fff" stroke-width=".9" opacity="${light ? .9 : .35}" stroke-linecap="round"/>
<rect x="23" y="72" width="74" height="27" rx="4" fill="url(#${h})"/>
<rect x="45" y="68.6" width="30" height="1.4" rx=".7" fill="#0b0c0e"/>
<rect x="47" y="73.6" width="26" height="11" rx="1.6" fill="#0d1116" stroke="${light ? "#8e959c" : "#000"}" stroke-width=".5"/>
${lit ? `<text x="60" y="81.6" text-anchor="middle" font-size="5.2" fill="#7fd3ff" ${NT_FONT}${c.on ? ` class="nta-glow"` : ""}>${c.on ? "\u25b6 \u266a" : c.st === "paused" ? "II" : "12:00"}</text>` : ""}
${spkLogo(60, 93, light ? "#5d646b" : "#9aa1a8", 4.4)}
${c.muted ? spkMute(96, 56) : ""}`;
}
// A Bose Home Speaker 500: a flattened oval of perforated aluminium, its small
// screen on the front, the light bar on top.
function ntSpkBose500(c) {
  const p = spkPal("bose500", c.color === "white" ? "silver" : c.color);
  const f = ntId(), h = ntId(), sh = ntId(), art = ntId(), g = ntId();
  const light = c.color !== "black";
  const body = "M60 29 C78 29 84 33 85.4 49 C86.4 62 86.4 78 85.4 91 C84 107 78 111 60 111 C42 111 36 107 34.6 91 C33.6 78 33.6 62 34.6 49 C36 33 42 29 60 29 Z";
  return `<defs>${spkSide(f, p)}${spkHoles(h, light ? "#6f767d" : "#050607", 1.4, .38)}${spkFoot(sh)}${ntBlur(g, 1.2)}
<linearGradient id="${art}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff7043"/><stop offset=".5" stop-color="#7e57c2"/><stop offset="1" stop-color="#26c6da"/></linearGradient></defs>
${spkNotes(64, 2)}${ntWaves(60, 72, "var(--primary-color, #03a9f4)", 33)}
${ntShadow(60, 112, 22)}
<path d="${body}" fill="url(#${f})"/><path d="${body}" fill="url(#${h})"/><path d="${body}" fill="url(#${sh})"/>
<rect x="50" y="44" width="20" height="14" rx="1.6" fill="#0b0d10" stroke="${light ? "#8e959c" : "#000"}" stroke-width=".5"/>
${c.on ? `<rect x="51.6" y="45.6" width="10.8" height="10.8" rx=".8" fill="url(#${art})"/><path d="M64 48 h4.6 M64 51 h3.4 M64 54 h4" stroke="#cfd8dc" stroke-width=".8"/>`
    : c.st === "paused" ? `<rect x="51.6" y="45.6" width="10.8" height="10.8" rx=".8" fill="url(#${art})" opacity=".45"/>${spkPause(57, 51)}`
    : c.st === "idle" ? `<text x="60" y="53.2" text-anchor="middle" font-size="5" fill="#cfd8dc" ${NT_FONT}>12:00</text>` : ""}
${c.on ? `<path class="nta-glow" d="M52 29.4 Q60 28.2 68 29.4" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" filter="url(#${g})"/>` : ""}
<path d="M52 29.4 Q60 28.2 68 29.4" fill="none" stroke="${c.on ? "#fff" : "#0b0d10"}" stroke-width=".8" stroke-linecap="round"/>
<path d="M39 50 Q37.6 70 39 90" fill="none" stroke="#fff" stroke-width="2.2" opacity="${light ? .55 : .12}" stroke-linecap="round"/>
${spkLogo(60, 102, light ? "#5d646b" : "#9aa1a8", 3.6)}
${c.muted ? spkMute(72, 100) : ""}`;
}
// A Bose SoundLink Flex: a rounded slab of soft-touch silicone, its metal
// grille and logo on the front, the buttons along the top and its loop.
function ntSpkFlex(c) {
  const p = spkPal("flex", c.color);
  const b = ntId(), h = ntId(), gr = ntId(), sh = ntId();
  const light = c.color === "white";
  const body = "M16 72 Q16 62 26 62 H94 Q104 62 104 72 V98 Q104 108 94 108 H26 Q16 108 16 98 Z";
  return `<defs>${ntV(b, p[0], p[2])}${ntV(gr, light ? "#cfccc3" : "#3b3f45", light ? "#a29e93" : "#16181b")}${spkHoles(h, light ? "#6f6b62" : "#050607", 1.5, .42)}${spkFoot(sh)}</defs>
${spkNotes(64, 26)}${ntWaves(60, 86, "var(--primary-color, #03a9f4)", 50)}
${ntShadow(60, 110, 42)}
<path d="M12 78 Q8 78 8 83 V89 Q8 94 12 94" fill="none" stroke="${p[3]}" stroke-width="3" stroke-linecap="round"/>
<path d="${body}" fill="url(#${b})"/><path d="${body}" fill="url(#${sh})"/>
<rect x="22" y="68" width="76" height="35" rx="6" fill="url(#${gr})"/><rect x="22" y="68" width="76" height="35" rx="6" fill="url(#${h})"/>
${spkLogo(60, 88, light ? "#4a4740" : "#c9cdd1", 5.4)}
${[-12, -4, 4, 12].map((dx, i) => `<rect x="${60 + dx - 2.6}" y="60.6" width="5.2" height="2.4" rx="1.2" fill="${p[3]}" stroke="${p[2]}" stroke-width=".4"/>${i === 1 && c.on ? `<circle class="nta-glow" cx="${60 + dx}" cy="61.8" r=".7" fill="#fff"/>` : ""}`).join("")}
<path d="M24 65 H96" stroke="#fff" stroke-width="1.2" opacity="${light ? .7 : .2}" stroke-linecap="round"/>
${spkLed(c, 96, 65.6, .8)}
${c.st === "paused" ? spkPause(60, 46, "#8f98a2") : ""}${c.muted ? spkMute(84, 50) : ""}`;
}
// A bookshelf speaker in three-quarter view: its tweeter, and a woofer whose
// cone beats with the music.
function ntSpkShelf(c) {
  const f = ntId(), sd = ntId(), tp = ntId(), w = ntId(), sr = ntId(), tw = ntId();
  return `<defs>${ntV(f, "#3a4047", "#1c2024")}${ntV(sd, "#8d6e4a", "#5d4430")}${ntV(tp, "#a07e57", "#7a5c3e")}
<radialGradient id="${w}" cx=".42" cy=".38" r=".7"><stop offset="0" stop-color="#6b7580"/><stop offset=".6" stop-color="#2b3036"/><stop offset="1" stop-color="#111417"/></radialGradient>
<radialGradient id="${sr}" cx=".5" cy=".5" r=".5"><stop offset=".78" stop-color="#1b1f23"/><stop offset=".9" stop-color="#4a525b"/><stop offset="1" stop-color="#1b1f23"/></radialGradient>
<radialGradient id="${tw}" cx=".4" cy=".35" r=".6"><stop offset="0" stop-color="#e3e7eb"/><stop offset="1" stop-color="#6b7580"/></radialGradient></defs>
${spkNotes(60, 2)}${ntWaves(54, 64, "var(--primary-color, #03a9f4)", 36)}
${ntFoot("24 116 84 116 98 104 38 104", .3)}
${ntRoundBox(26, 20, 56, 94, 13, 3, `url(#${f})`, `url(#${sd})`, `url(#${tp})`, "#111417")}
${[0, 1, 2, 3].map((i) => `<path d="M${85 + i * 2.6} ${19 - i * 2.6} V${110 - i * 2.6}" stroke="#4a3624" stroke-width=".5" opacity=".5"/>`).join("")}
<path d="M29 23 H79" stroke="#5d6670" stroke-width=".8" opacity=".6"/>
<circle cx="54" cy="40" r="10" fill="#111417" stroke="#4a525b" stroke-width="1"/><circle cx="54" cy="40" r="7" fill="#22272c"/>
<circle cx="54" cy="40" r="4.2" fill="url(#${tw})"/><circle cx="52.6" cy="38.6" r="1.2" fill="#fff" opacity=".7"/>
<circle cx="54" cy="78" r="24" fill="#111417" stroke="#4a525b" stroke-width="1.2"/>
${[0, 1, 2, 3].map((i) => { const a = Math.PI / 4 + i * Math.PI / 2; return `<circle cx="${(54 + Math.cos(a) * 21.4).toFixed(1)}" cy="${(78 + Math.sin(a) * 21.4).toFixed(1)}" r="1.1" fill="#8f98a2"/>`; }).join("")}
<g class="nta-pop"><circle cx="54" cy="78" r="19.4" fill="url(#${sr})"/><circle cx="54" cy="78" r="16.4" fill="url(#${w})"/>
<circle cx="54" cy="78" r="6.4" fill="#3a4047"/><circle cx="52.4" cy="76.4" r="2.4" fill="#8f98a2" opacity=".5"/></g>
<circle class="${c.on ? "nta-glow" : ""}" cx="54" cy="108" r="1.6" fill="${c.on ? "#69f0ae" : c.st === "paused" ? "#ffb300" : "#5d6773"}"/>
${c.st === "paused" ? spkPause(54, 78) : ""}${c.muted ? spkMute(66, 26) : ""}`;
}
// A mesh of fabric, for the speakers dressed in it.
const spkMesh = (id, op = .35) => `<pattern id="${id}" width="3" height="3" patternUnits="userSpaceOnUse"><path d="M0 3 L3 0 M-1 1 L1 -1 M2 4 L4 2" stroke="#000" stroke-width=".5" opacity="${op}"/></pattern>`;
const spkGlowDefs = (r, gl) => `<linearGradient id="${r}" x1="0" x2="1"><stop offset="0" stop-color="#ff4081"/><stop offset=".33" stop-color="#7c4dff"/><stop offset=".66" stop-color="#18ffff"/><stop offset="1" stop-color="#ffab40"/></linearGradient>${ntBlur(gl, 2.2)}`;
// An Echo Dot: a ball of fabric, the light ring around its foot.
function ntSpkDot(c) {
  const b = ntId(), m = ntId(), rg = ntId(), gl = ntId();
  return `<defs><radialGradient id="${b}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#6f7983"/><stop offset=".6" stop-color="#3a4249"/><stop offset="1" stop-color="#1a1e22"/></radialGradient>${spkMesh(m)}
<linearGradient id="${rg}" x1="0" x2="1"><stop offset="0" stop-color="#00e5ff"/><stop offset=".5" stop-color="#2979ff"/><stop offset="1" stop-color="#00e5ff"/></linearGradient>${ntBlur(gl, 2)}</defs>
${spkNotes(62, 14)}${ntWaves(60, 70, "#00b8d4", 38)}
${ntShadow(60, 110, 26)}
<circle cx="60" cy="72" r="34" fill="url(#${b})"/><circle cx="60" cy="72" r="34" fill="url(#${m})"/>
<path d="M34 60 Q40 44 56 40" fill="none" stroke="#fff" stroke-width="2.4" opacity=".16" stroke-linecap="round"/>
<path d="M30 92 Q60 108 90 92" fill="none" stroke="#1a1e22" stroke-width="4" stroke-linecap="round"/>
${c.on ? `<path class="nta-glow" d="M30 92 Q60 108 90 92" fill="none" stroke="url(#${rg})" stroke-width="5" stroke-linecap="round" filter="url(#${gl})"/><path d="M30 92 Q60 108 90 92" fill="none" stroke="url(#${rg})" stroke-width="2.4" stroke-linecap="round"/>` : ""}
${[[46, 52], [74, 52], [52, 46], [68, 46]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="#262b30" stroke="#5d6670" stroke-width=".5"/>`).join("")}
${c.st === "paused" ? spkPause(60, 74) : ""}${c.muted ? spkMute(72, 46) : ""}`;
}
// A Nest Mini: a pebble of fabric on the table, four lights under the fabric.
function ntSpkNest(c) {
  const t = ntId(), sd = ntId(), m = ntId(), gl = ntId();
  return `<defs><radialGradient id="${t}" cx=".42" cy=".3" r=".75"><stop offset="0" stop-color="#fbfbfa"/><stop offset=".7" stop-color="#e2e0db"/><stop offset="1" stop-color="#c8c5be"/></radialGradient>${ntV(sd, "#d9d6d0", "#99958d")}${spkMesh(m, .16)}${ntBlur(gl, 1.4)}</defs>
${spkNotes(60, 26)}${c.on ? ntWaves(60, 76, "var(--primary-color, #03a9f4)", 52) : ""}
${ntShadow(60, 104, 48)}
<path d="M12 80 Q12 100 60 102 Q108 100 108 80 Z" fill="url(#${sd})"/>
<path d="M12 80 Q12 100 60 102 Q108 100 108 80 Z" fill="url(#${m})"/>
<path d="M12 80 Q12 60 60 58 Q108 60 108 80 Q108 92 60 93 Q12 92 12 80 Z" fill="url(#${t})"/>
<path d="M12 80 Q12 60 60 58 Q108 60 108 80 Q108 92 60 93 Q12 92 12 80 Z" fill="url(#${m})"/>
<path d="M22 72 Q36 62 58 61" fill="none" stroke="#fff" stroke-width="2.4" opacity=".7" stroke-linecap="round"/>
${[-1.5, -.5, .5, 1.5].map((k, i) => `<circle class="${c.on ? `nta-glow ntd${i + 1}` : ""}" cx="${60 + k * 8}" cy="76" r="2" fill="${c.on ? "#ffffff" : c.st === "paused" ? "#ffb74d" : "#cbc8c1"}"${c.on ? ` filter="url(#${gl})"` : ""}/>
${c.on ? `<circle cx="${60 + k * 8}" cy="76" r="1.2" fill="#fff"/>` : ""}`).join("")}
${c.st === "paused" ? spkPause(60, 44, "#8d8a83") : ""}${c.muted ? spkMute(96, 52) : ""}`;
}
// Game consoles. Sparks rise while a game runs; a console's light is lit
// when it is on, amber in rest mode, dark when it is off.
// What rises while a game runs: the PlayStation symbols, the Xbox buttons,
// or a pixel heart and coin on the Nintendo and the retro ones.
const CON_PLAY = {
  ps: [`<path d="M0 -2.8 L2.6 1.6 H-2.6 Z" fill="none" stroke="#2ec27e" stroke-width="1.1" stroke-linejoin="round"/>`, `<circle r="2.5" fill="none" stroke="#ff4d4d" stroke-width="1.1"/>`,
    `<path d="M-2.1 -2.1 L2.1 2.1 M2.1 -2.1 L-2.1 2.1" stroke="#4d8dff" stroke-width="1.1" stroke-linecap="round"/>`, `<rect x="-2.2" y="-2.2" width="4.4" height="4.4" fill="none" stroke="#ff7ac8" stroke-width="1.1"/>`],
  xbox: [["A", "#3fb950"], ["B", "#e5484d"], ["X", "#3b82f6"], ["Y", "#f5b301"]].map(([l, col]) => `<circle r="3" fill="${col}"/><text y="1.3" font-size="3.6" font-weight="700" fill="#fff" text-anchor="middle" ${NT_FONT}>${l}</text>`),
  nin: [`<path d="M-2 -2 h1.3 v.7 h1.4 v-.7 h1.3 v.7 h.7 v2 h-.7 v.7 h-.7 v.7 h-.7 v.7 h-.6 v-.7 h-.7 v-.7 h-.7 v-.7 h-.7 v-2 h.7 Z" fill="#e53935"/>`, `<ellipse rx="2" ry="2.8" fill="#fbc02d" stroke="#c88a00" stroke-width=".6"/><rect x="-.4" y="-1.6" width=".8" height="3.2" fill="#c88a00"/>`,
    `<path d="M-2 -2 h1.3 v.7 h1.4 v-.7 h1.3 v.7 h.7 v2 h-.7 v.7 h-.7 v.7 h-.7 v.7 h-.6 v-.7 h-.7 v-.7 h-.7 v-.7 h-.7 v-2 h.7 Z" fill="#e53935"/>`],
};
const conSparks = (c, x, y, kind = "nin") => (c.st === "playing" ? `<g class="nt-run">${CON_PLAY[kind].map((g, i) => { const [dx, dy] = [[-12, 10], [0, 0], [11, 8], [20, -2]][i]; return `<g class="nta-rise ntd${i * 2 + 1}"><g transform="translate(${x + dx} ${y + dy})">${g}</g></g>`; }).join("")}</g>` : "");
const conLit = (c, on, rest = "#ffa000", off = "#3a3f45") => (c.on ? on : c.st === "rest" ? rest : off);
const conLed = (c, x, y, r, on, rest = "#ffa000") => `<circle class="${c.on ? "nta-glow" : ""}" cx="${x}" cy="${y}" r="${r}" fill="${conLit(c, on, rest)}"/>`;
const conNum = (v) => +v.toFixed(1);
// A console seen from the front and a little above: its front face, rounded
// at the bottom, and its top narrowing away to the back. at(u, v) gives a
// point on that top, u across from the left, v from the front edge back.
function conBox(x, y, w, h, d, k, r, front, top, edge = "") {
  const st = edge ? ` stroke="${edge}" stroke-width=".5" stroke-linejoin="round"` : "";
  return `<path d="M${x} ${y} L${x + k} ${y - d} H${x + w - k} L${x + w} ${y} Z" fill="${top}"${st}/>
<path d="M${x} ${y} H${x + w} V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} H${x + r} Q${x} ${y + h} ${x} ${y + h - r} Z" fill="${front}"${st}/>
<path d="M${x + 1} ${y + .5} H${x + w - 1}" stroke="#fff" stroke-width=".6" opacity=".22"/>`;
}
const conAt = (x, y, w, d, k) => (u, v) => [conNum(x + k * v + u * (w - 2 * k * v)), conNum(y - d * v)];
const conPt = (p) => p.join(" ");
// A strip across a box's top, from u0 to u1 and v0 to v1.
const conQuad = (at, u0, u1, v0, v1, fill, extra = "") => `<path d="M${conPt(at(u0, v0))} L${conPt(at(u1, v0))} L${conPt(at(u1, v1))} L${conPt(at(u0, v1))} Z" fill="${fill}"${extra}/>`;
// The shadow a console casts where it stands: dark right under its edge,
// fading wider around it.
function conFloor(x0, x1, y) {
  const b = ntId();
  return `<filter id="${b}" x="-20%" y="-300%" width="140%" height="700%"><feGaussianBlur stdDeviation="1.3"/></filter>
<ellipse cx="${conNum((x0 + x1) / 2)}" cy="${conNum(y + 1.4)}" rx="${conNum((x1 - x0) / 2 + 5)}" ry="2.8" fill="#000" opacity=".16" filter="url(#${b})"/>
<rect x="${conNum(x0 + 1.5)}" y="${conNum(y - 1.4)}" width="${conNum(x1 - x0 - 3)}" height="2.8" rx="1.4" fill="#000" opacity=".34" filter="url(#${b})"/>`;
}
// A handheld lifted a little above the table: a soft shadow under it.
function conFloat(x0, x1, y) {
  const b = ntId();
  return `<filter id="${b}" x="-20%" y="-300%" width="140%" height="700%"><feGaussianBlur stdDeviation="1.8"/></filter><ellipse cx="${conNum((x0 + x1) / 2)}" cy="${conNum(y + 6)}" rx="${conNum((x1 - x0) * .42)}" ry="2.2" fill="#000" opacity=".22" filter="url(#${b})"/>`;
}
// A controller port: a rounded socket and its pins.
const conPort = (x, y, w, h, body, hole = "#141518") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h * .3}" fill="${body}"/><rect x="${conNum(x + w * .18)}" y="${conNum(y + h * .3)}" width="${conNum(w * .64)}" height="${conNum(h * .4)}" rx=".5" fill="${hole}"/>`;
// What a handheld's screen shows: a game while one runs, the home menu when
// it is only on, nothing when it is off or asleep.
function conScreen(c, x, y, w, h, id) {
  if (c.st === "playing") {
    return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6ec6ff"/><stop offset=".62" stop-color="#bfe8ff"/><stop offset=".62" stop-color="#5cb85c"/><stop offset="1" stop-color="#3d8b3d"/></linearGradient></defs>
<rect x="${x}" y="${y}" width="${w}" height="${h}" rx=".8" fill="url(#${id})"/>
<path d="M${x} ${conNum(y + h * .66)} Q${conNum(x + w * .3)} ${conNum(y + h * .44)} ${conNum(x + w * .55)} ${conNum(y + h * .62)} T${x + w} ${conNum(y + h * .58)} V${y + h} H${x} Z" fill="#4caf50"/>
<circle cx="${conNum(x + w * .78)}" cy="${conNum(y + h * .26)}" r="${conNum(h * .12)}" fill="#ffd54f"/>
<g class="nta-pop"><rect x="${conNum(x + w * .3)}" y="${conNum(y + h * .5)}" width="${conNum(w * .09)}" height="${conNum(h * .16)}" rx=".6" fill="#e53935"/><circle cx="${conNum(x + w * .345)}" cy="${conNum(y + h * .46)}" r="${conNum(h * .06)}" fill="#ffcc80"/></g>`;
  }
  if (c.on) {
    const tw = (w - 8) / 4;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx=".8" fill="#eceff1"/>${[0, 1, 2, 3].map((i) => `<rect x="${conNum(x + 2 + i * (tw + 1.33))}" y="${conNum(y + h * .32)}" width="${conNum(tw)}" height="${conNum(h * .36)}" rx=".6" fill="${["#ef5350", "#42a5f5", "#ffca28", "#66bb6a"][i]}"/>`).join("")}`;
  }
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx=".8" fill="#0d0f12"/><path d="M${x + 2} ${y + 2} L${conNum(x + w * .4)} ${y + 2} L${x + 2} ${conNum(y + h * .7)} Z" fill="#fff" opacity=".06"/>`;
}
// The PlayStation mark, small: the P standing, the S lying flat in front.
const conPsLogo = (x, y, s, mono = "") => `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke-linecap="round" stroke-width="1.1"><path d="M-.4 1.4 V-4 Q3 -4 3 -2 Q3 0 -.4 -.2" stroke="${mono || "#e53935"}"/>
<path d="M3.8 .6 H-1.6 Q-3.6 .6 -3.6 1.5 Q-3.6 2.4 -1.6 2.4" stroke="${mono || "#fbc02d"}"/><path d="M-1.6 2.4 H1.8 Q3.8 2.4 3.8 3.3 Q3.8 4.2 1.8 4.2 H-3.6" stroke="${mono || "#1e88e5"}"/></g>`;

// PlayStation: the grey box, its round lid, Open on the back corner, Reset
// and Power at the front, two controller ports under their card slots.
function conPs1(c) {
  const f = ntId(), t = ntId(), l = ntId();
  const at = conAt(10, 80, 100, 26, 8);
  const [lx, ly] = at(.53, .52), [ox, oy] = at(.9, .74), [rx, ry] = at(.09, .3), [px, py] = at(.19, .3);
  return `<defs>${ntV(f, "#c7c6c1", "#a6a5a0")}${ntV(t, "#c9c8c3", "#e3e2dd")}<radialGradient id="${l}" cx=".45" cy=".35" r=".75"><stop offset="0" stop-color="#e8e7e2"/><stop offset="1" stop-color="#c3c2bd"/></radialGradient></defs>
${conSparks(c, 60, 36, "ps")}${conFloor(10, 110, 102)}
${conBox(10, 80, 100, 22, 26, 8, 3, `url(#${f})`, `url(#${t})`, "#97968f")}
<ellipse cx="${lx}" cy="${ly + .8}" rx="23" ry="8.8" fill="#a9a8a3"/><ellipse cx="${lx}" cy="${ly}" rx="22.4" ry="8.4" fill="url(#${l})" stroke="#9c9b96" stroke-width=".5"/>
<ellipse cx="${lx}" cy="${ly}" rx="17" ry="6.2" fill="none" stroke="#c9c8c3" stroke-width=".6"/><ellipse cx="${lx}" cy="${ly}" rx="3.4" ry="1.3" fill="#b4b3ae"/>
${conPsLogo(lx - 10, ly + 2.2, .7)}
<ellipse cx="${ox}" cy="${oy + .5}" rx="4" ry="1.9" fill="#8f8e89"/><ellipse cx="${ox}" cy="${oy}" rx="3.6" ry="1.6" fill="#d2d1cc" stroke="#9c9b96" stroke-width=".4"/>
<ellipse cx="${rx}" cy="${ry + .5}" rx="2.8" ry="1.3" fill="#8f8e89"/><ellipse cx="${rx}" cy="${ry}" rx="2.5" ry="1.1" fill="#d2d1cc"/>
<ellipse cx="${px}" cy="${py + .5}" rx="3.2" ry="1.5" fill="#8f8e89"/><ellipse cx="${px}" cy="${py}" rx="2.9" ry="1.3" fill="#d2d1cc"/>
${conLed(c, px + 4.6, py + .6, .8, "#7cff6b")}
<rect x="24" y="84" width="14" height="2.2" rx=".6" fill="#3b3a38"/><rect x="66" y="84" width="14" height="2.2" rx=".6" fill="#3b3a38"/>
${conPort(23, 89, 16, 6.4, "#8d8c87", "#2d2c2a")}${conPort(65, 89, 16, 6.4, "#8d8c87", "#2d2c2a")}
<path d="M12 99 H108" stroke="#97968f" stroke-width=".5"/>`;
}
// PlayStation 2: the black slab, its ridges down the left of the top and the
// front, the tray, the reset and eject buttons with their lights.
function conPs2(c) {
  const f = ntId(), t = ntId();
  const X = 8, Y = 80, W = 104, D = 22, K = 7, at = conAt(X, Y, W, D, K);
  const ridges = Array.from({ length: 9 }, (_, i) => .02 + i * .034);
  const [lgx, lgy] = at(.74, .45);
  return `<defs>${ntV(f, "#26282c", "#121315")}${ntV(t, "#18191c", "#2f3236")}</defs>
${conSparks(c, 60, 40, "ps")}${conFloor(8, 112, 100)}
${conBox(X, Y, W, 20, D, K, 2, `url(#${f})`, `url(#${t})`)}
${ridges.map((u) => `<path d="M${conPt(at(u, 0))} L${conPt(at(u, 1))}" stroke="#08090a" stroke-width="1.5"/><path d="M${conPt(at(u + .012, 0))} L${conPt(at(u + .012, 1))}" stroke="#44474c" stroke-width=".4"/>`).join("")}
${ridges.map((u) => `<path d="M${conNum(X + u * W)} 80 V89" stroke="#08090a" stroke-width="1.5"/>`).join("")}
<text x="${lgx}" y="${lgy}" font-size="3.4" font-style="italic" font-weight="700" fill="#4a68c9" text-anchor="middle" ${NT_FONT}>PS2</text>
<path d="M8 89 H112" stroke="#060607" stroke-width="1.2"/><path d="M8 90 H112" stroke="#3a3d42" stroke-width=".4"/>
<path d="M46 84.6 H100" stroke="#060607" stroke-width="1.4"/><path d="M46 85.6 H100" stroke="#4a4d52" stroke-width=".4"/>
${[12, 26].map((x) => `<rect x="${x}" y="91.6" width="11" height="1.8" rx=".5" fill="#060607"/>${conPort(x, 95, 11, 3.6, "#33363b", "#060607")}`).join("")}
<circle cx="106" cy="84.6" r="1.6" fill="#2b2d31" stroke="#060607" stroke-width=".4"/>${conLed(c, 102.6, 84.6, .7, "#7cff6b", "#ff3d00")}
<circle cx="106" cy="94.6" r="1.6" fill="#2b2d31" stroke="#060607" stroke-width=".4"/><circle cx="102.6" cy="94.6" r=".7" fill="${conLit(c, "#2979ff", "#1a2a44", "#1a2a44")}"${c.on ? ` class="nta-glow"` : ""}/>`;
}
// PlayStation 3: the wide glossy black body, its top rounded from front to
// back, the glossy flap on the left, the chrome band with the slot on the
// right, the PlayStation mark, the USB ports and vents along the bottom.
function conPs3(c) {
  const t = ntId(), fl = ntId(), cr = ntId(), lo = ntId();
  return `<defs><linearGradient id="${t}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050506"/><stop offset=".55" stop-color="#2e3237"/><stop offset=".8" stop-color="#6b7178"/><stop offset="1" stop-color="#111214"/></linearGradient>
<linearGradient id="${fl}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3e44"/><stop offset=".35" stop-color="#131417"/><stop offset="1" stop-color="#050506"/></linearGradient>
<linearGradient id="${cr}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f6f8"/><stop offset=".45" stop-color="#b9c0c6"/><stop offset=".55" stop-color="#8d949b"/><stop offset="1" stop-color="#e3e6e9"/></linearGradient>${ntV(lo, "#141517", "#050506")}</defs>
${conSparks(c, 60, 44, "ps")}${conFloor(8, 112, 104)}
<path d="M8 104 V80 Q8 68 22 68 H98 Q112 68 112 80 V104 Z" fill="url(#${lo})"/>
<path d="M8.4 81 Q8.4 68.6 22 68.6 H98 Q111.6 68.6 111.6 81 Z" fill="url(#${t})"/>
<path d="M9 81 H50 V92 Q50 94 48 94 H11 Q9 94 9 92 Z" fill="url(#${fl})"/>
<path d="M12 82.6 H46" stroke="#fff" stroke-width=".6" opacity=".25"/>
<path d="M50 81 H111 V89.4 H50 Z" fill="url(#${cr})"/><path d="M60 85.2 H107" stroke="#050506" stroke-width="1.3"/>
${conPsLogo(76, 91.2, .5)}
<path d="M95.6 91.6 a1.4 1.4 0 1 0 2 0 M96.6 90.9 V92.7" fill="none" stroke="#8a9097" stroke-width=".4"/>
<path d="M101 93 h2.6 M101.2 92.4 l1.1 -1.4 l1.1 1.4 Z" fill="#8a9097" stroke="#8a9097" stroke-width=".35"/>
${conLed(c, 92.6, 92, .5, "#7cff6b", "#ff3d00")}
<path d="M8 95.6 H112" stroke="#2c2f34" stroke-width=".5"/>
${[13, 20, 27, 34].map((x) => `<rect x="${x}" y="98.2" width="4.6" height="1.8" rx=".3" fill="#2e3136"/><rect x="${x + .6}" y="98.7" width="3.4" height=".8" fill="#050506"/>`).join("")}
${Array.from({ length: 26 }, (_, i) => `<path d="M${44 + i * 2.2} 97 V102.4" stroke="#000" stroke-width="1"/>`).join("")}`;
}
// PlayStation 4: a thin slab leaning forward, its top split between the
// glossy left and the matte right by the light bar; the Pro is three layers.
function conPs4(c, pro) {
  const gl = ntId(), mt = ntId(), fr = ntId(), lb = ntId(), rf = ntId();
  const bar = conLit(c, "#f4f8ff", "#ffa000", "#1b1d20");
  const X = 8, W = 104, D = 22, K = 8, Y = pro ? 76 : 82, at = conAt(X, Y, W, D, K);
  const split = pro ? 0 : .38;
  const glow = c.on ? ` filter="url(#${lb})" class="nta-glow"` : "";
  const top = pro ? `${conQuad(at, 0, 1, 0, 1, `url(#${mt})`)}${conPsLogo(...at(.5, .5), 1.1, "#5a5f66")}`
    : `${conQuad(at, 0, split, 0, 1, `url(#${gl})`)}${conQuad(at, 0, split, 0, 1, `url(#${rf})`)}${conQuad(at, split, 1, 0, 1, `url(#${mt})`)}${conPsLogo(...at(.1, .7), .8, "#6b7077")}
<path d="M${conPt(at(split, 0))} L${conPt(at(split, 1))}" stroke="#050506" stroke-width="2.4"/><path d="M${conPt(at(split, 0))} L${conPt(at(split, 1))}" stroke="${bar}" stroke-width="1.1"${glow}/>
${c.on || c.st === "rest" ? `<path d="M${conPt(at(split, 0))} L${conPt(at(split, 1))}" stroke="${bar}" stroke-width=".5"/>` : ""}`;
  const layers = pro
    ? `<path d="M8 76 H112 L111 80 H9 Z" fill="url(#${fr})"/><rect x="9" y="80" width="102" height="3.4" fill="#050506"/>
<path d="M10 83.4 H110 L109 89 H11 Z" fill="url(#${fr})"/><rect x="11" y="89" width="98" height="3" fill="#050506"/>
<path d="M30 90.5 H90" stroke="${bar}" stroke-width="1"${glow}/><path d="M12 92 H108 L107 99 Q107 100 105 100 H15 Q13 100 13 99 Z" fill="#1a1b1e"/>
<path d="M26 81.8 H70" stroke="#2a2c30" stroke-width=".7"/>`
    : `<path d="M8 82 H112 L111 86 H9 Z" fill="url(#${fr})"/><rect x="10" y="86" width="100" height="5.6" fill="#050506"/>
<path d="M18 88.6 H62" stroke="#2a2c30" stroke-width=".9"/><path d="M${conPt(at(split, 0))} V86" stroke="${bar}" stroke-width="1"${glow}/>
<path d="M68 88.8 h4 M76 88.8 h4" stroke="#3a3d42" stroke-width=".8"/>
<path d="M12 91.6 H108 L107 99 Q107 100 105 100 H15 Q13 100 13 99 Z" fill="#1a1b1e"/>`;
  return `<defs>${ntV(gl, "#2e3136", "#0b0c0e")}${ntV(mt, "#1d1f22", "#2e3034")}${ntV(fr, "#2b2d31", "#141517")}${ntBlur(lb, 1.4)}
<linearGradient id="${rf}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
${conSparks(c, 60, Y - 42, "ps")}${conFloor(12, 108, 100)}
${top}${layers}`;
}
// PlayStation 5, standing, seen from its front left: the tall white side
// panel widening towards the bottom, its front corner pointing up, the
// PlayStation mark high on it, the black core lit white at the top, amber at rest, the
// thin far panel flaring out, the black stand.
function conPs5(c) {
  const wl = ntId(), sh = ntId(), k = ntId(), lb = ntId(), fb = ntId(), sd = ntId();
  const light = conLit(c, "#f4f8ff", "#ffa000", "#2a2f36");
  const panel = "M27.6 96 Q27 98.6 30 99 L81.6 104.6 Q77 50 72 7.4 Q55 8.2 40.6 12.8 Q38 13.6 37.8 16.4 Z";
  return `<defs><linearGradient id="${wl}" x1="0" x2="1"><stop offset="0" stop-color="#e3e7eb"/><stop offset=".5" stop-color="#fcfcfd"/><stop offset="1" stop-color="#ffffff"/></linearGradient>
<linearGradient id="${sh}" x1="0" y1="0" x2="0" y2="1"><stop offset=".5" stop-color="#8a96a3" stop-opacity="0"/><stop offset="1" stop-color="#8a96a3" stop-opacity=".22"/></linearGradient>
<linearGradient id="${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.on ? "#5d6470" : c.st === "rest" ? "#7a4a08" : "#20232a"}"/><stop offset=".35" stop-color="#101219"/><stop offset="1" stop-color="#050608"/></linearGradient>${ntBlur(lb, 2.2)}${ntBlur(fb, 2)}<linearGradient id="${sd}" x1="0" x2="1"><stop offset="0" stop-color="#0b0c0e"/><stop offset=".55" stop-color="#2c2f34"/><stop offset="1" stop-color="#0b0c0e"/></linearGradient></defs>
${conSparks(c, 56, -6, "ps")}<ellipse cx="60" cy="107.6" rx="33" ry="3.6" transform="rotate(5 60 107.6)" fill="#000" opacity=".22" filter="url(#${fb})"/><g transform="rotate(6 58 104)"><ellipse cx="58" cy="107.6" rx="31" ry="3.4" fill="#000" opacity=".32" filter="url(#${fb})"/>
<path d="M27 104 V105.8 A31 4.6 0 0 0 89 105.8 V104 Z" fill="url(#${sd})"/><ellipse cx="58" cy="104" rx="31" ry="4.6" fill="#1b1d20"/><ellipse cx="58" cy="103.8" rx="29.4" ry="3.8" fill="none" stroke="#3a3d42" stroke-width=".4"/></g>
<path d="M72 7.4 L86.4 7 Q86 50 85.6 105.2 L81.6 104.6 Q77 50 72 7.4 Z" fill="url(#${k})"/>
${c.on || c.st === "rest" ? `<path d="M80 9 Q84 24 84.4 44" fill="none" stroke="${light}" stroke-width="3.6" opacity=".8" filter="url(#${lb})"${c.on ? ` class="nta-glow"` : ""}/>` : ""}
<rect x="83" y="50" width="1" height="2.6" rx=".4" fill="#3a3f48"/><rect x="83" y="56" width="1" height="2.6" rx=".4" fill="#3a3f48"/>
<path d="M86.4 7 L89.6 5.8 Q88.4 50 87.6 105.4 L85.6 105.2 Q86 50 86.4 7 Z" fill="#f5f6f7" stroke="#c3c8cd" stroke-width=".4"/>
<path d="${panel}" fill="url(#${wl})" stroke="#c9ced3" stroke-width=".5"/><path d="${panel}" fill="url(#${sh})"/>
<path d="M73.6 10 Q78 50 81.6 102" fill="none" stroke="#fff" stroke-width="1"/>
${conPsLogo(42.6, 32, .8, "#9aa0a6")}`;
}
// Xbox: the big black box, the X raised on its top meeting at the green
// jewel, the tray, the power ring and four ports in front.
function conXbox(c) {
  const f = ntId(), t = ntId(), j = ntId(), gl = ntId(), pn = ntId();
  const at = conAt(10, 76, 100, 24, 8), [jx, jy] = at(.5, .52);
  const corners = [[.06, .1], [.94, .1], [.94, .94], [.06, .94]];
  return `<defs>${ntV(f, "#25272a", "#101112")}${ntV(t, "#18191b", "#35383c")}${ntV(pn, "#34373b", "#17181a")}
<radialGradient id="${j}" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="${c.on ? "#c6ff8a" : "#86b764"}"/><stop offset=".55" stop-color="${c.on ? "#54c21f" : "#3d6b2c"}"/><stop offset="1" stop-color="#173210"/></radialGradient>${ntBlur(gl, 2)}</defs>
${conSparks(c, 60, 34, "xbox")}${conFloor(10, 110, 102)}
${conBox(10, 76, 100, 26, 24, 8, 4, `url(#${f})`, `url(#${t})`)}
${corners.map(([u, v]) => `<path d="M${jx} ${jy} L${conPt(at(u, v))}" stroke="#45484d" stroke-width="3.4" stroke-linecap="round"/><path d="M${jx} ${jy + .6} L${conPt(at(u, v))}" stroke="#0a0a0b" stroke-width="1.2" stroke-linecap="round" opacity=".7"/>`).join("")}
${c.on ? `<ellipse class="nta-glow" cx="${jx}" cy="${jy}" rx="13" ry="5.6" fill="#76ff03" opacity=".45" filter="url(#${gl})"/>` : ""}
<ellipse cx="${jx}" cy="${jy}" rx="11" ry="4.8" fill="#0a0a0b"/><ellipse cx="${jx}" cy="${jy - .3}" rx="9" ry="3.8" fill="url(#${j})"/>
<path d="M${jx - 4.4} ${jy - 2.2} Q${jx} ${jy - .4} ${jx + 4.4} ${jy + 1.8} M${jx + 4.4} ${jy - 2.2} Q${jx} ${jy - .4} ${jx - 4.4} ${jy + 1.8}" stroke="#173210" stroke-width="1.1" fill="none" opacity=".7"/>
<path d="M30 76 Q60 79 90 76 V102 H30 Z" fill="url(#${pn})"/>
<path d="M36 83.6 H80" stroke="#000" stroke-width="1.4"/><path d="M36 84.6 H80" stroke="#55585e" stroke-width=".4"/>
<circle cx="96" cy="84" r="2.6" fill="#2b2d31" stroke="${conLit(c, "#76ff03", "#ffa000", "#000")}" stroke-width=".7"/><circle cx="103.4" cy="84" r="2" fill="#2b2d31" stroke="#000" stroke-width=".5"/>
${[13.5, 21.5, 91.5, 99.5].map((x) => conPort(x, 92.4, 7, 4.4, "#0a0a0b", "#2a2c30")).join("")}`;
}
// Xbox 360: white and lying flat, its front drawn in, the hard drive on top,
// the tray and the ring of light around the power button.
function conX360(c) {
  const f = ntId(), t = ntId(), hd = ntId(), gl = ntId();
  const ring = c.on ? "#76ff03" : c.st === "rest" ? "#ffa000" : "#c3c7cb";
  const at = conAt(8, 80, 104, 22, 8);
  return `<defs>${ntV(f, "#f6f7f8", "#d5d9dd")}${ntV(t, "#e1e4e7", "#fbfcfc")}${ntV(hd, "#a9b0b6", "#8a9198")}${ntBlur(gl, 1.6)}</defs>
${conSparks(c, 60, 36, "xbox")}${conFloor(8, 112, 101.4)}
<path d="M8 80 L16 58 H104 L112 80 Q60 76 8 80 Z" fill="url(#${t})" stroke="#c5cacf" stroke-width=".5"/>
${conQuad(at, .05, .46, .14, .92, `url(#${hd})`, ` stroke="#7a8188" stroke-width=".4"`)}
${Array.from({ length: 9 }, (_, i) => `<path d="M${conPt(at(.08 + i * .04, .26))} L${conPt(at(.08 + i * .04, .8))}" stroke="#6b7279" stroke-width=".8"/>`).join("")}
<path d="M8 80 Q60 76 112 80 V102 Q60 98 8 102 Z" fill="url(#${f})" stroke="#c5cacf" stroke-width=".5"/>
<path d="M14 85 H26 V95 H14 Z" fill="none" stroke="#c0c5ca" stroke-width=".6"/>
<path d="M32 88 Q58 86 82 88" fill="none" stroke="#8d949b" stroke-width="1.2"/><circle cx="87" cy="88.4" r="1.2" fill="#e6e9ec" stroke="#a9b0b6" stroke-width=".4"/>
${c.on ? `<circle class="nta-glow" cx="100" cy="90" r="6" fill="none" stroke="${ring}" stroke-width="2.4" filter="url(#${gl})"/>` : ""}
<circle cx="100" cy="90" r="5.8" fill="#e6e9ec" stroke="#b9bec3" stroke-width=".5"/>
${[0, 1, 2, 3].map((i) => { const a0 = i * Math.PI / 2 + .22, a1 = (i + 1) * Math.PI / 2 - .22; return `<path d="M${conNum(100 + 4.8 * Math.cos(a0))} ${conNum(90 + 4.8 * Math.sin(a0))} A4.8 4.8 0 0 1 ${conNum(100 + 4.8 * Math.cos(a1))} ${conNum(90 + 4.8 * Math.sin(a1))}" fill="none" stroke="${ring}" stroke-width="1.3"/>`; }).join("")}
<circle cx="100" cy="90" r="3" fill="#f4f5f6" stroke="#b9bec3" stroke-width=".4"/>`;
}
// Xbox One: the long black slab, the vents over the left of its top, the
// glossy right, the slot and the glowing logo in front.
function conXone(c) {
  const f = ntId(), t = ntId(), gs = ntId(), gl = ntId();
  const at = conAt(6, 84, 108, 24, 8);
  return `<defs>${ntV(f, "#2a2c2f", "#0e0f10")}${ntV(t, "#141517", "#25272a")}${ntV(gs, "#3a3d42", "#0e0f10")}${ntBlur(gl, 1.6)}</defs>
${conSparks(c, 60, 40, "xbox")}${conFloor(6, 114, 100)}
${conBox(6, 84, 108, 16, 24, 8, 2, `url(#${f})`, `url(#${t})`)}
${Array.from({ length: 28 }, (_, i) => `<path d="M${conPt(at(.02 + i * .02, .04))} L${conPt(at(.02 + i * .02, .96))}" stroke="#050506" stroke-width="1.1"/>`).join("")}
${conQuad(at, .6, 1, 0, 1, `url(#${gs})`)}
<path d="M${conPt(at(.6, 0))} L${conPt(at(.6, 1))}" stroke="#000" stroke-width=".8"/>
<path d="M14 90 H60" stroke="#000" stroke-width="1.3"/><path d="M14 91 H60" stroke="#3a3d42" stroke-width=".4"/>
${c.on ? `<circle class="nta-glow" cx="101" cy="91" r="3.6" fill="#fff" filter="url(#${gl})"/>` : ""}
<circle cx="101" cy="91" r="2.6" fill="${conLit(c, "#ffffff", "#c6cbd0", "#4a4d52")}"/>
<path d="M99.4 89.2 Q101 91 102.6 89.2 M99.4 92.8 Q101 91 102.6 92.8" fill="none" stroke="#111214" stroke-width=".7"/>`;
}
// Xbox Series X: the black tower, the dish on top showing green through its
// holes, the logo button, the vertical disc slot.
function conXsx(c) {
  const f = ntId(), t = ntId(), g = ntId(), gl = ntId();
  const at = conAt(40, 30, 40, 12, 4), [cx, cy] = at(.5, .5);
  const holes = [];
  for (let j = -3; j <= 3; j++) for (let i = -8; i <= 8; i++) {
    const x = i * 1.9 + (j % 2 ? .95 : 0), y = j * 1.25;
    if ((x / 15.2) ** 2 + (y / 4.3) ** 2 < 1) holes.push(`<circle cx="${conNum(cx + x)}" cy="${conNum(cy + y)}" r=".55" fill="#050506"/>`);
  }
  return `<defs><linearGradient id="${f}" x1="0" x2="1"><stop offset="0" stop-color="#1c1e20"/><stop offset=".5" stop-color="#26282b"/><stop offset="1" stop-color="#121314"/></linearGradient>${ntV(t, "#141517", "#2a2c2f")}
<radialGradient id="${g}" cx=".5" cy=".7" r=".6"><stop offset="0" stop-color="#4fe24a"/><stop offset=".7" stop-color="#1c8a24"/><stop offset="1" stop-color="#071a09"/></radialGradient>${ntBlur(gl, 1.4)}</defs>
${conSparks(c, 64, -4, "xbox")}${conFloor(40, 80, 108)}
${conBox(40, 30, 40, 78, 12, 4, 3, `url(#${f})`, `url(#${t})`)}
<ellipse cx="${cx}" cy="${cy + .4}" rx="17.6" ry="5.4" fill="#050506"/><ellipse cx="${cx}" cy="${cy}" rx="16.6" ry="4.9" fill="url(#${g})"/>
${holes.join("")}
${c.on ? `<circle class="nta-glow" cx="46.4" cy="36" r="3.2" fill="#fff" filter="url(#${gl})"/>` : ""}<circle cx="46.4" cy="36" r="2.1" fill="${conLit(c, "#ffffff", "#c6cbd0", "#3a3d42")}"/>
<path d="M45.2 34.8 L47.6 37.2 M47.6 34.8 L45.2 37.2" stroke="#111214" stroke-width=".5"/>
<path d="M73 46 V92" stroke="#000" stroke-width="1.6"/><path d="M74 46 V92" stroke="#3a3d42" stroke-width=".4"/><circle cx="73.4" cy="96" r="1" fill="#2e3034"/>
<rect x="44.4" y="100" width="4" height="1.6" rx=".4" fill="#000"/><circle cx="46.4" cy="96" r=".8" fill="#2e3034"/>`;
}
// Xbox Series S: the small white box lying flat, the big black round vent
// on its top, the logo button in front.
function conXss(c) {
  const f = ntId(), t = ntId(), gl = ntId();
  const at = conAt(14, 84, 92, 28, 8), [cx, cy] = at(.58, .5);
  const holes = [];
  for (let j = -4; j <= 4; j++) for (let i = -10; i <= 10; i++) {
    const x = i * 1.9 + (j % 2 ? .95 : 0), y = j * 1.9;
    if ((x / 17.4) ** 2 + (y / 9) ** 2 < 1) holes.push(`<circle cx="${conNum(cx + x)}" cy="${conNum(cy + y)}" r=".5" fill="#2a2c2f"/>`);
  }
  return `<defs>${ntV(f, "#f4f5f5", "#d3d6d9")}${ntV(t, "#e2e4e6", "#fbfbfb")}${ntBlur(gl, 1.4)}</defs>
${conSparks(c, 60, 38, "xbox")}${conFloor(14, 106, 102)}
${conBox(14, 84, 92, 18, 28, 8, 3, `url(#${f})`, `url(#${t})`, "#c2c6c9")}
<ellipse cx="${cx}" cy="${cy + .6}" rx="20" ry="10.6" fill="#a6abaf"/><ellipse cx="${cx}" cy="${cy}" rx="19.4" ry="10.2" fill="#121314"/>
${holes.join("")}
${c.on ? `<circle class="nta-glow" cx="23" cy="92" r="3" fill="#fff" filter="url(#${gl})"/>` : ""}<circle cx="23" cy="92" r="2" fill="${conLit(c, "#ffffff", "#9aa1a8", "#c6cacd")}" stroke="#a6abaf" stroke-width=".4"/>
<path d="M21.9 90.9 L24.1 93.1 M24.1 90.9 L21.9 93.1" stroke="#7a8086" stroke-width=".45"/>
<rect x="29" y="91.2" width="4.4" height="1.6" rx=".4" fill="#3a3d42"/><circle cx="37" cy="92" r=".9" fill="#c6cacd" stroke="#a6abaf" stroke-width=".3"/>`;
}
// A handheld's buttons: four in a diamond, a stick, a cross.
const conDiamond = (x, y, g, r, fills) => [[0, -g], [g, 0], [0, g], [-g, 0]].map(([dx, dy], i) => `<circle cx="${conNum(x + dx)}" cy="${conNum(y + dy)}" r="${r}" fill="${fills[i] || fills[0]}"/>`).join("");
const conStick = (x, y, r, ring = "") => `<circle cx="${x}" cy="${y}" r="${r + .6}" fill="#0b0c0e"/>${ring ? `<circle cx="${x}" cy="${y}" r="${r + 1.2}" fill="none" stroke="${ring}" stroke-width=".9"/>` : ""}<circle cx="${x}" cy="${y}" r="${r}" fill="#26282c"/><circle cx="${x}" cy="${y}" r="${conNum(r * .62)}" fill="#33363b"/><circle cx="${conNum(x - r * .25)}" cy="${conNum(y - r * .25)}" r="${conNum(r * .25)}" fill="#fff" opacity=".12"/>`;
const conCross = (x, y, a, fill) => `<path d="M${x - a / 3} ${y - a} h${conNum(a * 2 / 3)} v${conNum(a * 2 / 3)} h${conNum(a * 2 / 3)} v${conNum(a * 2 / 3)} h${conNum(-a * 2 / 3)} v${conNum(a * 2 / 3)} h${conNum(-a * 2 / 3)} v${conNum(-a * 2 / 3)} h${conNum(-a * 2 / 3)} v${conNum(-a * 2 / 3)} h${conNum(a * 2 / 3)} Z" fill="${fill}"/>`;
// Nintendo Switch: the console held in hand, the neon blue and red Joy-Con
// either side of the screen; the Switch 2 is wider, its Joy-Con black with a
// colour ring under each stick.
function conSwitch(c, two) {
  const l = ntId(), r = ntId(), sc = ntId(), bz = ntId();
  const W = two ? 68 : 60, H = two ? 38 : 34, J = two ? 13 : 12, sx = 60 - W / 2, sy = 72 - H / 2;
  const lc = two ? ["#34363b", "#17181b"] : ["#25d0ea", "#009fbd"], rc = two ? ["#34363b", "#17181b"] : ["#ff6b62", "#e83a3a"];
  const btn = two ? "#0b0c0e" : "#1d1e21";
  const lx = sx - J / 2, rx = sx + W + J / 2;
  const joy = (x0, dir, fill) => `<path d="M${x0} ${sy} H${x0 + dir * (J - 6)} Q${x0 + dir * J} ${sy} ${x0 + dir * J} ${sy + 6} V${sy + H - 6} Q${x0 + dir * J} ${sy + H} ${x0 + dir * (J - 6)} ${sy + H} H${x0} Z" fill="url(#${fill})"/>`;
  return `<defs>${ntV(l, ...lc)}${ntV(r, ...rc)}${ntV(bz, "#2a2c30", "#121315")}</defs>
${conSparks(c, 64, sy - 18)}${conFloat(sx - J, sx + W + J, sy + H)}
<rect x="${sx - J + 1}" y="${sy + 2}" width="${W + 2 * J - 2}" height="${H}" rx="6" fill="#000" opacity=".25"/>
${joy(sx, -1, l)}${joy(sx + W, 1, r)}
<rect x="${sx}" y="${sy}" width="${W}" height="${H}" fill="url(#${bz})"/>
${conScreen(c, sx + 4, sy + 3, W - 8, H - 6, sc)}
<path d="M${sx + .5} ${sy} V${sy + H} M${sx + W - .5} ${sy} V${sy + H}" stroke="#000" stroke-width=".6" opacity=".5"/>
${conStick(lx, conNum(sy + H * .27), 3.2, two ? "#1fa3ff" : "")}${conDiamond(lx, conNum(sy + H * .62), 2.9, 1.25, [btn])}
<path d="M${sx - 3.6} ${sy + 3.4} h2.2" stroke="${btn}" stroke-width=".8"/><rect x="${lx - 1.4}" y="${conNum(sy + H * .84)}" width="1.9" height="1.9" rx=".3" fill="${btn}"/>
${conDiamond(rx, conNum(sy + H * .27), 2.9, 1.25, [btn])}${conStick(rx, conNum(sy + H * .62), 3.2, two ? "#ff3b3b" : "")}
<path d="M${sx + W + 1.4} ${sy + 3.4} h2.2 M${sx + W + 2.5} ${sy + 2.3} v2.2" stroke="${btn}" stroke-width=".8"/><circle cx="${rx + .6}" cy="${conNum(sy + H * .87)}" r="1.1" fill="${btn}" stroke="#777" stroke-width=".3"/>
${two ? `<path d="M${sx + 1} ${sy + 1.2} V${sy + H - 1.2}" stroke="#1fa3ff" stroke-width=".7"/><path d="M${sx + W - 1} ${sy + 1.2} V${sy + H - 1.2}" stroke="#ff3b3b" stroke-width=".7"/>` : ""}`;
}
// Nintendo Switch Lite: the turquoise handheld in one piece, a real cross on
// its left.
function conSwitchLite(c) {
  const b = ntId(), sc = ntId();
  return `<defs>${ntV(b, "#6fdbe6", "#2ba7b6")}</defs>
${conSparks(c, 62, 38)}${conFloat(10, 110, 97)}
<rect x="11" y="57" width="98" height="42" rx="13" fill="#000" opacity=".22"/>
<rect x="10" y="55" width="100" height="42" rx="13" fill="url(#${b})"/>
<path d="M22 56.6 H98" stroke="#fff" stroke-width=".9" opacity=".55" stroke-linecap="round"/>
<rect x="33" y="57.6" width="54" height="36.8" rx="2" fill="#141518"/>
${conScreen(c, 36, 60.4, 48, 31.2, sc)}
${conStick(21.6, 66, 3.3)}${conCross(21.6, 82, 3.9, "#1b1c1f")}
<path d="M27 60 h2.2" stroke="#1b1c1f" stroke-width=".8"/><rect x="27" y="88.6" width="1.9" height="1.9" rx=".3" fill="#1b1c1f"/>
${conDiamond(98.4, 66, 3.1, 1.35, ["#1b1c1f"])}${conStick(98.4, 82, 3.3)}
<path d="M90.8 60 h2.2 M91.9 58.9 v2.2" stroke="#1b1c1f" stroke-width=".8"/><circle cx="92" cy="89.6" r="1.1" fill="#1b1c1f"/>`;
}
// PlayStation Vita: the black oval, its screen between the cross and stick
// on the left and the four symbols and stick on the right.
function conVita(c) {
  const b = ntId(), sc = ntId(), rim = ntId();
  const sym = [`<path d="M100 66.6 l1.2 2 h-2.4 Z" fill="none" stroke="#3fd19a" stroke-width=".5"/>`, `<circle cx="103.6" cy="70.2" r="1" fill="none" stroke="#ff5b5b" stroke-width=".5"/>`,
    `<path d="M99.2 73 l1.6 1.6 M100.8 73 l-1.6 1.6" stroke="#7fb2ff" stroke-width=".5"/>`, `<rect x="95.6" y="69.4" width="1.6" height="1.6" fill="none" stroke="#ff8fd1" stroke-width=".5"/>`];
  return `<defs>${ntV(b, "#34373c", "#0b0c0e")}${ntV(rim, "#c9ced3", "#6b7177")}</defs>
${conSparks(c, 62, 38, "ps")}${conFloat(8, 112, 99)}
<rect x="9" y="57" width="102" height="44" rx="22" fill="#000" opacity=".22"/>
<rect x="8" y="55" width="104" height="44" rx="22" fill="url(#${b})" stroke="url(#${rim})" stroke-width="1"/>
<path d="M26 57 Q60 54.6 94 57" fill="none" stroke="#fff" stroke-width=".7" opacity=".25"/>
<rect x="31" y="60" width="58" height="34" rx="2" fill="#050506"/>
${conScreen(c, 33, 62, 54, 30, sc)}
${conCross(20, 70.2, 3.6, "#43464c")}<path d="M20 67.6 v-.8 M20 72.8 v.8" stroke="#55585e" stroke-width=".4"/>
${conStick(23.6, 84.4, 2.4)}<circle cx="15.6" cy="90.6" r="1.4" fill="${conLit(c, "#3d8bff", "#ffa000", "#1d1f22")}" stroke="#55585e" stroke-width=".3"${c.on ? ` class="nta-glow"` : ""}/>
${conDiamond(100, 70.2, 3.6, 1.7, ["#2c2f34"])}${sym.join("")}
${conStick(96.4, 84.4, 2.4)}<rect x="98.4" y="90" width="2.8" height="1.1" rx=".55" fill="#3a3d42"/><rect x="103" y="90" width="2.8" height="1.1" rx=".55" fill="#3a3d42"/>
<text x="60" y="97.6" font-size="2.2" fill="#6b7177" text-anchor="middle" letter-spacing=".5" ${NT_FONT}>SONY</text>`;
}
// NES: the grey box, the grooves on the back of its top, the cartridge door
// in front, the black band with power, reset and two ports.
function conNes(c) {
  const f = ntId(), t = ntId(), dr = ntId();
  const at = conAt(12, 70, 96, 22, 7);
  return `<defs>${ntV(f, "#d4d2cb", "#bebcb5")}${ntV(t, "#c6c4bd", "#dddbd4")}${ntV(dr, "#c9c7c0", "#b3b1aa")}</defs>
${conSparks(c, 60, 28)}${conFloor(12, 108, 102)}
${conBox(12, 70, 96, 32, 22, 7, 2, `url(#${f})`, `url(#${t})`, "#9e9c94")}
${[.5, .6, .7, .8, .9].map((v) => `<path d="M${conPt(at(.03, v))} L${conPt(at(.97, v))}" stroke="#a8a69f" stroke-width=".9"/><path d="M${conPt(at(.03, v - .03))} L${conPt(at(.97, v - .03))}" stroke="#ecebe5" stroke-width=".4"/>`).join("")}
<rect x="32" y="72" width="64" height="14" rx="1" fill="url(#${dr})" stroke="#9e9c94" stroke-width=".5"/>
${[0, 1, 2, 3].map((i) => `<path d="M35 ${75 + i * 2.6} H93" stroke="#a5a39c" stroke-width=".5"/>`).join("")}
<text x="15" y="76" font-size="3" font-weight="700" fill="#c62828" ${NT_FONT}>Nintendo</text><path d="M15 78.4 H29 M15 80.2 H26" stroke="#3b3b3d" stroke-width=".6"/>
<path d="M12 88 H108 V100 Q108 102 106 102 H14 Q12 102 12 100 Z" fill="#2d2d2f"/>
<circle cx="17.6" cy="95" r="1.1" fill="${conLit(c, "#ff1744", "#ff1744", "#4a1a1a")}"${c.on ? ` class="nta-glow"` : ""}/>
<rect x="21" y="92.6" width="8" height="4.6" rx=".6" fill="#c9c7c0"/><rect x="32" y="92.6" width="8" height="4.6" rx=".6" fill="#c9c7c0"/>
${conPort(70, 91.6, 14, 7, "#c9c7c0", "#2d2d2f")}${conPort(88, 91.6, 14, 7, "#c9c7c0", "#2d2d2f")}`;
}
// Super Nintendo: the rounded grey shell, the raised slot in the middle of
// its top, the eject button before it, the power and reset sliders, the
// four colours of its logo.
function conSnes(c) {
  const f = ntId(), t = ntId(), sl = ntId();
  const at = conAt(12, 84, 96, 28, 8), [ex, ey] = at(.5, .2), [px, py] = at(.18, .46), [rx, ry] = at(.82, .46), [ox, oy] = at(.2, .12);
  return `<defs>${ntV(f, "#cbcbc8", "#adadaa")}${ntV(t, "#d2d2d0", "#e9e9e7")}${ntV(sl, "#8d8d8b", "#a9a9a7")}</defs>
${conSparks(c, 60, 40)}${conFloor(12, 108, 100)}
${conBox(12, 84, 96, 16, 28, 8, 6, `url(#${f})`, `url(#${t})`, "#9b9b98")}
${conQuad(at, .3, .7, .36, .86, `url(#${sl})`, ` stroke="#7f7f7d" stroke-width=".5"`)}
<path d="M${conPt(at(.36, .62))} L${conPt(at(.64, .62))}" stroke="#2e2e30" stroke-width="2"/>
<ellipse cx="${ex}" cy="${ey}" rx="4.4" ry="1.8" fill="#8d8d8b" stroke="#6f6f6d" stroke-width=".4"/>
<rect x="${px - 4}" y="${py - 1.4}" width="8" height="2.8" rx="1" fill="#8d8d8b" stroke="#6f6f6d" stroke-width=".4"/><rect x="${rx - 4}" y="${ry - 1.4}" width="8" height="2.8" rx="1" fill="#8d8d8b" stroke="#6f6f6d" stroke-width=".4"/>
${["#e53935", "#fbc02d", "#43a047", "#1e88e5"].map((col, i) => `<circle cx="${conNum(ox + i * 2.4)}" cy="${oy}" r=".9" fill="${col}"/>`).join("")}
${conLed(c, 18, 89, .8, "#ff1744", "#ff1744")}
${conPort(40, 88.4, 13, 6.4, "#8d8d8b", "#3a3a3c")}${conPort(66, 88.4, 13, 6.4, "#8d8d8b", "#3a3a3c")}`;
}
// Nintendo 64: the charcoal shell, the slot on the hump at the back, the
// power and reset sliders, the four-colour cube, four ports in front.
function conN64(c) {
  const f = ntId(), t = ntId(), h = ntId();
  const at = conAt(10, 86, 100, 24, 6), [hx, hy] = at(.5, .7), [px, py] = at(.2, .32), [rx, ry] = at(.8, .32), [lx, ly] = at(.5, .2);
  return `<defs>${ntV(f, "#34363b", "#17181b")}${ntV(t, "#202226", "#3b3d42")}<radialGradient id="${h}" cx=".5" cy=".3" r=".8"><stop offset="0" stop-color="#55585e"/><stop offset="1" stop-color="#202226"/></radialGradient></defs>
${conSparks(c, 60, 40)}${conFloor(10, 110, 102)}
${conBox(10, 86, 100, 16, 24, 6, 4, `url(#${f})`, `url(#${t})`)}
<path d="M${hx - 22} ${hy + 6} Q${hx - 20} ${hy - 7} ${hx} ${hy - 7} Q${hx + 20} ${hy - 7} ${hx + 22} ${hy + 6} Z" fill="url(#${h})"/>
<rect x="${hx - 11}" y="${hy - 4}" width="22" height="3.6" rx="1" fill="#0b0c0e"/><path d="M${hx - 9} ${hy - 2.2} H${hx + 9}" stroke="#3a3d42" stroke-width=".5"/>
<rect x="${px - 4.4}" y="${py - 1.4}" width="8.8" height="2.8" rx="1.2" fill="#55585e"/><rect x="${rx - 4.4}" y="${ry - 1.4}" width="8.8" height="2.8" rx="1.2" fill="#55585e"/>
<g transform="translate(${lx} ${ly})"><path d="M0 -2.6 L2.6 0 L0 0 Z" fill="#e53935"/><path d="M2.6 0 L0 2.6 L0 0 Z" fill="#1e88e5"/><path d="M0 2.6 L-2.6 0 L0 0 Z" fill="#fbc02d"/><path d="M-2.6 0 L0 -2.6 L0 0 Z" fill="#43a047"/></g>
${conLed(c, 20, 90.6, .8, "#ff1744", "#ff1744")}
${[24, 42, 60, 78].map((x) => `<path d="M${x} 98 V93.6 Q${x} 91.6 ${x + 2} 91.6 H${x + 8} Q${x + 10} 91.6 ${x + 10} 93.6 V98 Z" fill="#0b0c0e"/><rect x="${x + 2.6}" y="93.6" width="4.8" height="2" rx=".5" fill="#55585e"/>`).join("")}`;
}
// GameCube: the indigo cube, the handle at its back, the round lid, the
// buttons at its front corners, the card slots and four ports in front.
function conGamecube(c) {
  const f = ntId(), t = ntId(), l = ntId();
  const at = conAt(30, 56, 56, 22, 6), [lx, ly] = at(.5, .55), [px, py] = at(.15, .16), [ox, oy] = at(.85, .16);
  return `<defs>${ntV(f, "#5c4ea6", "#3d3380")}${ntV(t, "#4a3e8c", "#6b5cb4")}<radialGradient id="${l}" cx=".45" cy=".35" r=".75"><stop offset="0" stop-color="#8273c9"/><stop offset="1" stop-color="#5a4ba3"/></radialGradient></defs>
${conSparks(c, 60, 10)}${conFloor(30, 86, 106)}
<path d="M40 36 Q42 20 58 20 Q74 20 76 36" fill="none" stroke="#2c2358" stroke-width="5" stroke-linecap="round"/><path d="M40.6 35 Q42.4 21.8 58 21.8 Q73.6 21.8 75.4 35" fill="none" stroke="#5446a0" stroke-width="1.4"/>
${conBox(30, 56, 56, 50, 22, 6, 6, `url(#${f})`, `url(#${t})`)}
<ellipse cx="${lx}" cy="${ly + .7}" rx="19.6" ry="7.6" fill="#2c2358"/><ellipse cx="${lx}" cy="${ly}" rx="19" ry="7.2" fill="url(#${l})"/>
<g transform="translate(${lx} ${ly}) scale(1 .45)" fill="none" stroke="#2c2358" stroke-width="1"><path d="M0 -5 L4.4 -2.5 V2.5 L0 5 L-4.4 2.5 V-2.5 Z M0 0 L4.4 -2.5 M0 0 V5 M0 0 L-4.4 -2.5"/></g>
<ellipse cx="${px}" cy="${py}" rx="2.6" ry="1.2" fill="#3d3380" stroke="#2c2358" stroke-width=".4"/><ellipse cx="${ox}" cy="${oy}" rx="2.6" ry="1.2" fill="#3d3380" stroke="#2c2358" stroke-width=".4"/>
${conLed(c, px + 4.4, py + .4, .7, "#7cff6b", "#ffa000")}
<rect x="36" y="68" width="18" height="3" rx=".6" fill="#2c2358"/><rect x="62" y="68" width="18" height="3" rx=".6" fill="#2c2358"/>
<rect x="53" y="78" width="10" height="7" rx="1.4" fill="none" stroke="#2c2358" stroke-width=".7"/>
${[35, 47, 59, 71].map((x) => conPort(x, 93, 10, 6, "#2c2358", "#18132f")).join("")}`;
}
// Wii: the thin white console standing on its foot, the blue glow along its
// slot, power and reset under it, its name on the side.
function conWii(c) {
  const f = ntId(), s = ntId(), t = ntId(), gl = ntId();
  return `<defs>${ntV(f, "#ffffff", "#e3e6e9")}${ntV(s, "#eceff1", "#cdd2d6")}${ntV(t, "#ffffff", "#f1f3f4")}${ntBlur(gl, 1.6)}</defs>
${conSparks(c, 106, 34)}<filter id="${gl}f" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1.6"/></filter>
<path d="M42 112.6 H70 L102 80.6 H74 Z" fill="#000" opacity=".2" filter="url(#${gl}f)"/>
<path d="M44.6 109.6 Q43 111.4 45.4 111.4 H67.6 L99.4 79.6 Q101 77.8 98.6 77.8 H76.4 Z" fill="#b9bec3"/>
<path d="M44.6 108 Q43 109.8 45.4 109.8 H67.6 L99.4 78 Q101 76.2 98.6 76.2 H76.4 Z" fill="#eef0f2" stroke="#c3c8cd" stroke-width=".4"/>
${ntRoundBox(48, 22, 15, 86, 30, 2, `url(#${f})`, `url(#${s})`, `url(#${t})`, "#c8cdd2")}
<text transform="translate(80 70) rotate(-90) skewX(-25)" font-size="9" font-weight="700" fill="#c3c8cd" text-anchor="middle" ${NT_FONT}>Wii</text>
${c.on ? `<path class="nta-glow" d="M55.5 30 V92" stroke="#40c4ff" stroke-width="3.4" filter="url(#${gl})"/>` : ""}
<path d="M55.5 30 V92" stroke="#7a8188" stroke-width="1.4"/><path d="M55.5 30 V92" stroke="${c.on ? "#82e1ff" : "#9aa1a8"}" stroke-width=".7"/>
<rect x="50.4" y="95" width="10.2" height="7" rx="1" fill="none" stroke="#c8cdd2" stroke-width=".5"/>
<circle cx="53" cy="104.4" r="1.1" fill="#e9ecee" stroke="#b9bec3" stroke-width=".4"/><circle cx="58" cy="104.4" r="1.1" fill="#e9ecee" stroke="#b9bec3" stroke-width=".4"/>
<circle cx="53" cy="104.4" r=".45" fill="${conLit(c, "#7cff6b", "#ff1744", "#9aa1a8")}"/>`;
}
// Mega Drive: the black box, the vents on the left of its top, the round
// ring with 16-BIT around the slot, the reset button, its name in white.
function conMegadrive(c) {
  const f = ntId(), t = ntId(), r = ntId();
  const at = conAt(10, 84, 100, 26, 8), [cx, cy] = at(.58, .5), [bx, by] = at(.92, .42), [nx, ny] = at(.08, .16);
  return `<defs>${ntV(f, "#25272b", "#101113")}${ntV(t, "#18191c", "#2f3135")}<radialGradient id="${r}" cx=".5" cy=".3" r=".8"><stop offset="0" stop-color="#3c3f44"/><stop offset="1" stop-color="#1b1c1f"/></radialGradient></defs>
${conSparks(c, 60, 38)}${conFloor(10, 110, 100)}
${conBox(10, 84, 100, 16, 26, 8, 4, `url(#${f})`, `url(#${t})`)}
${Array.from({ length: 8 }, (_, i) => `<path d="M${conPt(at(.06 + i * .03, .55))} L${conPt(at(.06 + i * .03, .92))}" stroke="#050506" stroke-width="1"/>`).join("")}
<ellipse cx="${cx}" cy="${cy + 1.6}" rx="25" ry="9.6" fill="#08090a"/><ellipse cx="${cx}" cy="${cy}" rx="24" ry="9" fill="url(#${r})"/>
<ellipse cx="${cx}" cy="${cy}" rx="24" ry="9" fill="none" stroke="#9e1b1b" stroke-width=".5"/><ellipse cx="${cx}" cy="${cy}" rx="16" ry="5.6" fill="#16171a"/>
<text x="${cx}" y="${conNum(cy - 5.6)}" font-size="2.6" font-weight="700" fill="#e7c66a" text-anchor="middle" letter-spacing=".8" ${NT_FONT}>16-BIT</text>
<rect x="${cx - 12}" y="${cy - 1.4}" width="24" height="2.8" rx=".8" fill="#050506"/>
<ellipse cx="${bx}" cy="${by + .5}" rx="3" ry="1.5" fill="#050506"/><ellipse cx="${bx}" cy="${by}" rx="2.7" ry="1.2" fill="#3a3d42"/>
<text x="${nx}" y="${ny}" font-size="3.2" font-weight="700" font-style="italic" fill="#f2f2f2" ${NT_FONT}>MEGA DRIVE</text>
<rect x="15" y="89" width="9" height="2.6" rx=".6" fill="#3a3d42"/><rect x="18.6" y="89.4" width="2.6" height="1.8" rx=".3" fill="#7a8086"/>${conLed(c, 27, 90.3, .7, "#ff1744", "#ff1744")}
<rect x="31" y="89" width="7" height="1.6" rx=".6" fill="#3a3d42"/><circle cx="42" cy="90" r="1" fill="#050506" stroke="#3a3d42" stroke-width=".4"/>
${[78, 94].map((x) => `<path d="M${x} 89 H${x + 11} L${x + 10} 95 H${x + 1} Z" fill="#050506"/><path d="M${x + 2} 91 H${x + 9}" stroke="#3a3d42" stroke-width=".6"/>`).join("")}`;
}
const NT_DRAW = { irr_sprinkler: ntIrrSprinkler, irr_tap: ntIrrTap, lit_globe: ntLitterGlobe, lit_box: ntLitterBox, det_smoke: ntDetSmoke, det_co: ntDetCo, det_leak: ntDetLeak, spk_smart: ntSpkSmart, spk_homepod_mini: ntSpkMini, spk_sonos_one: ntSpkOne, spk_bookshelf: ntSpkShelf, spk_sonos_move: ntSpkMove, spk_soundbar: ntSpkBar, spk_echo_dot: ntSpkDot, spk_nest_mini: ntSpkNest, spk_sonos_era100: ntSpkEra100, spk_sonos_era300: ntSpkEra300, spk_bose_wave: ntSpkWave, spk_bose_500: ntSpkBose500, spk_bose_soundlink: ntSpkFlex, spk_bose_soundbar: ntSpkBoseBar, con_ps1: conPs1, con_ps2: conPs2, con_ps3: conPs3, con_ps4: (c) => conPs4(c, false), con_ps4_pro: (c) => conPs4(c, true), con_ps5: conPs5, con_xbox: conXbox, con_xbox_360: conX360, con_xbox_one: conXone, con_xbox_series_x: conXsx, con_xbox_series_s: conXss, con_switch: (c) => conSwitch(c, false), con_switch_2: (c) => conSwitch(c, true), con_switch_lite: conSwitchLite, con_ps_vita: conVita, con_nes: conNes, con_snes: conSnes, con_n64: conN64, con_gamecube: conGamecube, con_wii: conWii, con_megadrive: conMegadrive, mob_scooter: mobScooter, mob_offroad: mobOffroad, mob_ebike: mobEbike, mob_gyropode: mobGyropode, mob_motorcycle: mobMotorcycle, meter_box: ntMeterBox, meter_dome: ntMeterDome, meter_gas: ntGas, meter_water: ntWater, booster: ntBooster, sump: ntSump, pool: ntPoolRobot, floor: ntFloor, spa: ntSpa, sauna: ntSauna, aquarium: ntAquarium, linky: ntLinky, tree: ntTree };
function ntSvg(d) {
  ntN = 0;
  const draw = NT_DRAW[d && d.kind] || ntLinky;
  return `<svg class="nt-svg" viewBox="0 -10 120 135">${draw(d || {})}</svg>`;
}
function ntHtml(cls, d) {
  const flags = ["nt", `nt-k-${(d && d.kind) || "none"}`, d && /^(irr|lit|det|spk)_/.test(d.kind) ? "nt-c7" : "", d && d.on ? "nt-on" : "", d && d.unav ? "nt-unav" : ""].filter(Boolean).join(" ");
  return `
        <div class="machine ${cls} ${flags}">${ntSvg(d)}</div>`;
}

// The new drawings' motion: nothing moves until the machine runs (nt-on),
// except a meter's LED and an alarm's beacon. Each part's stagger is its --d0.
const NT_CSS = `
        svg.nt-svg{position:absolute;left:0;top:0;width:96px;height:108px;overflow:visible}
        .machine.nt:not(.nt-on) .nt-run{display:none}
        .machine.nt-unav{opacity:.45;filter:grayscale(1)}
        .ntd1{--d0:.3s}.ntd2{--d0:.7s}.ntd3{--d0:1.1s}.ntd4{--d0:1.5s}.ntd5{--d0:1.9s}.ntd6{--d0:2.3s}
        .nt-on .nta-spin{transform-box:fill-box;transform-origin:center;animation:nt-spin .6s linear infinite}
        .nt-on .nta-spin-slow{transform-box:fill-box;transform-origin:center;animation:nt-spin 4s linear infinite}
        .nt-on .nta-flow{animation:nt-flow .8s linear infinite}
        .nt-on .nta-flow-fast{animation:nt-flow .4s linear infinite}
        .nt-on .nta-rise{transform-box:fill-box;animation:nt-rise 2.4s ease-in infinite}
        .nt-on .nta-steam{transform-box:fill-box;transform-origin:center bottom;animation:nt-steam 2.8s ease-out infinite}
        .nt-on .nta-fall{transform-box:fill-box;animation:nt-fall 2.6s ease-in infinite}
        .nt-k-sump .nta-fall{transform-box:fill-box;animation:nt-fall 2.6s ease-in infinite}
        .nt-on .nta-twinkle{animation:nt-twinkle 1.3s ease-in-out infinite}
        .nt-on .nta-frost{transform-box:fill-box;transform-origin:center;animation:nt-frost 2.4s ease-in-out infinite}
        .nt-on .nta-shimmer{animation:nt-shimmer 3s ease-in-out infinite}
        .nta-glow{animation:nt-glow 1.8s ease-in-out infinite}
        .nt-on .nta-warm{animation:nt-warm 2.6s ease-in-out infinite}
        .nt-on .nta-pop{transform-box:fill-box;transform-origin:center;animation:nt-pop 1.6s ease-out infinite}
        .nt-on .nta-sway{transform-box:fill-box;transform-origin:center bottom;animation:nt-sway 3.2s ease-in-out infinite}
        .nt-on .nta-vib{animation:nt-vib .12s linear infinite}
        .nt-on .nta-heat{transform-box:fill-box;animation:nt-heat 2.2s ease-out infinite}
        .nt-on .nta-bob{animation:nt-bob 1.2s ease-in-out infinite}
        .nt-on .nta-swim{transform-box:fill-box;transform-origin:center;animation:nt-swim 8s ease-in-out infinite}
        .nt-on .nta-swimB{transform-box:fill-box;transform-origin:center;animation:nt-swimB 6.5s ease-in-out infinite}
        .nt-on .nta-rays{animation:nt-rays 4s ease-in-out infinite}
        .nta-caust{opacity:.35}
        .nt-on .nta-caust{opacity:0;animation:nt-shimmer 3s ease-in-out infinite}
        .nta-blink{animation:nt-blink 2.4s linear infinite}
        .nt-on .nta-feed{animation:nt-feed .625s linear infinite}
        .nt-on .nta-led,.nt-on .nta-next{animation:nt-glow 1.25s ease-in-out infinite}
        .nt-on .nta-bar1{animation:nt-bar1 5s steps(1) infinite}.nt-on .nta-bar2{animation:nt-bar2 5s steps(1) infinite}
        .nt-on .nta-bar3{animation:nt-bar3 5s steps(1) infinite}.nt-on .nta-bar4{animation:nt-bar4 5s steps(1) infinite}
        @keyframes nt-feed{to{stroke-dashoffset:12}}
        @keyframes nt-bar1{0%{opacity:.15}12%,100%{opacity:1}}
        @keyframes nt-bar2{0%{opacity:.15}30%,100%{opacity:1}}
        @keyframes nt-bar3{0%{opacity:.15}48%,100%{opacity:1}}
        @keyframes nt-bar4{0%{opacity:.15}66%,100%{opacity:1}}
        .nta-blinkfast{animation:nt-blinkfast .45s linear infinite}
        .nta-rain{transform-box:fill-box;animation:nt-fall 1.4s ease-in infinite}
        .nta-rdrop{animation:nt-rdrop .6s linear infinite}.nta-rsplash{transform-box:fill-box;transform-origin:center;opacity:0;animation:nt-rsplash .6s ease-out infinite}
        @keyframes nt-rdrop{0%{transform:translate(0,0);opacity:0}10%{opacity:1}100%{transform:translate(-16px,80px);opacity:1}}
        @keyframes nt-rsplash{0%,80%{transform:scale(.2);opacity:0}85%{opacity:1}100%{transform:scale(1.3);opacity:0}}
        .nt-on .nta-smoke{transform-box:fill-box;transform-origin:center;animation:nt-smoke 4.2s ease-out infinite}
        .nt-on .nta-spreadL{transform-box:fill-box;transform-origin:center;animation:nt-spreadL 4.2s ease-out infinite}
        .nt-on .nta-spreadR{transform-box:fill-box;transform-origin:center;animation:nt-spreadR 4.2s ease-out infinite}
        .nt-on .nta-drip{animation:nt-drip 1.5s ease-in infinite}
        .nt-on .nta-splash{transform-box:fill-box;transform-origin:center;animation:nt-splash 1.5s ease-out infinite}
        .nt-on .nta-lrcycle{transform-box:view-box;transform-origin:60px 38px;animation:nt-lrcycle 7s ease-in-out infinite}
        /* The watering, litter box, detector and speaker drawings share one 7 s
           cycle, every motion fitting it a whole number of times. */
        .nt-c7 .nta-flow{animation-duration:.875s}.nt-c7 .nta-fall{animation-duration:1.75s}.nt-c7 .nta-spin-slow{animation-duration:3.5s}
        .nt-c7 .nta-smoke,.nt-c7 .nta-spreadL,.nt-c7 .nta-spreadR{animation-duration:3.5s}.nt-c7 .nta-drip,.nt-c7 .nta-splash,.nt-c7 .nta-pop,.nt-c7 .nta-glow{animation-duration:1.75s}
        .nt-c7 .nta-rise,.nt-c7 .nta-blink{animation-duration:2.333s}.nt-c7 .nta-blinkfast{animation-duration:.4375s}.nt-c7 .nta-shimmer{animation-duration:3.5s}
        .nt-on .nta-littilt{transform-box:view-box;animation:nt-littilt 7s ease-in-out infinite}
        .nt-on .nta-clump{animation:nt-clump 7s ease-in-out infinite}
        .nta-smoke,.nta-spreadL,.nta-spreadR,.nta-drip,.nta-splash{opacity:0}
        @keyframes nt-smoke{0%{transform:translateY(0) scale(.4);opacity:0}18%{opacity:.8}100%{transform:translateY(-66px) scale(2.1);opacity:0}}
        @keyframes nt-spreadL{0%{transform:translate(0,0) scale(.6);opacity:0}30%{opacity:.6}100%{transform:translate(-34px,-3px) scale(2.3);opacity:0}}
        @keyframes nt-spreadR{0%{transform:translate(0,0) scale(.6);opacity:0}30%{opacity:.6}100%{transform:translate(34px,-3px) scale(2.3);opacity:0}}
        @keyframes nt-drip{0%{transform:translateY(-52px);opacity:0}12%{opacity:1}84%{transform:translateY(0);opacity:1}86%,100%{transform:translateY(0);opacity:0}}
        @keyframes nt-splash{0%,82%{transform:scale(.2);opacity:0}86%{opacity:.95}100%{transform:scale(1.7);opacity:0}}
        @keyframes nt-lrcycle{0%,6%{transform:rotate(0)}42%,54%{transform:rotate(-240deg)}80%,86%{transform:rotate(20deg)}96%,100%{transform:rotate(0)}}
        @keyframes nt-littilt{0%,6%{transform:rotate(0)}24%{transform:rotate(-14deg)}42%,54%{transform:rotate(-8deg)}68%{transform:rotate(6deg)}80%,84%{transform:rotate(10deg)}92%{transform:rotate(-3deg)}100%{transform:rotate(0)}}
        @keyframes nt-clump{0%,18%{opacity:1;transform:translate(0,0)}34%{opacity:1;transform:translate(-10px,3px)}44%{opacity:0;transform:translate(-14px,6px)}97%{opacity:0;transform:translate(0,0)}100%{opacity:1}}
        .nta-beacon{animation:nt-glow .7s ease-in-out infinite}
        @keyframes nt-spin{to{transform:rotate(360deg)}}
        @keyframes nt-flow{to{stroke-dashoffset:-24}}
        @keyframes nt-rise{0%{transform:translateY(0);opacity:0}15%{opacity:.95}100%{transform:translateY(-30px);opacity:0}}
        @keyframes nt-steam{0%{transform:translateY(0) scaleX(1);opacity:0}30%{opacity:.6}100%{transform:translateY(-20px) scaleX(1.7);opacity:0}}
        @keyframes nt-fall{0%{transform:translateY(-2px);opacity:0}35%{opacity:.85}100%{transform:translateY(12px);opacity:0}}
        @keyframes nt-twinkle{0%,100%{opacity:1}50%{opacity:.25}}
        @keyframes nt-blink{0%,70%,100%{opacity:.15}78%,92%{opacity:1}}
        .nt-on .nta-roll{animation:nt-roll 4s linear infinite}
        @keyframes nt-roll{to{transform:translateY(var(--roll,-90px))}}
        @keyframes nt-blinkfast{0%,100%{opacity:.15}45%,55%{opacity:1}}
        @keyframes nt-frost{0%,100%{opacity:0;transform:scale(.5)}50%{opacity:1;transform:scale(1)}}
        @keyframes nt-shimmer{0%,100%{opacity:0}50%{opacity:.5}}
        @keyframes nt-glow{0%,100%{opacity:.45}50%{opacity:1}}
        @keyframes nt-warm{0%,100%{opacity:.1}50%{opacity:.26}}
        @keyframes nt-pop{0%{transform:scale(.2);opacity:0}40%{opacity:.95}100%{transform:scale(1.4);opacity:0}}
        @keyframes nt-sway{0%,100%{transform:skewX(-7deg)}50%{transform:skewX(7deg)}}
        @keyframes nt-vib{0%,100%{transform:translate(0,0)}25%{transform:translate(.35px,-.2px)}75%{transform:translate(-.35px,.2px)}}
        @keyframes nt-heat{0%{transform:translateY(0);opacity:0}30%{opacity:.8}100%{transform:translateY(-14px);opacity:0}}
        @keyframes nt-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.6px)}}
        @keyframes nt-swim{0%{transform:translateX(0) scaleX(1)}46%{transform:translateX(34px) scaleX(1)}50%{transform:translateX(34px) scaleX(-1)}96%{transform:translateX(0) scaleX(-1)}100%{transform:translateX(0) scaleX(1)}}
        @keyframes nt-swimB{0%{transform:translateX(0) scaleX(-1)}46%{transform:translateX(-30px) scaleX(-1)}50%{transform:translateX(-30px) scaleX(1)}96%{transform:translateX(0) scaleX(1)}100%{transform:translateX(0) scaleX(-1)}}
        @keyframes nt-rays{0%,100%{opacity:.18}50%{opacity:.38}}
        .machine.nt * { animation-delay: calc(var(--d0, 0s) + var(--anim-offset, 0s)) !important; }
        @media (prefers-reduced-motion: reduce) { .machine.nt * { animation-name: none !important; } }
`;

const NT_COLORS = { off: "var(--disabled-text-color, #9e9e9e)", idle: "var(--secondary-text-color, #727272)", run: "#1e88e5",
  heat: "#f4511e", alarm: "#e53935", lit: "#43a047", high: "#e53935", unav: "var(--disabled-text-color, #9e9e9e)" };
// How a remaining time reads on the robot's power supply: seconds, minutes or
// hours as its unit says, or a finish time.
function ntRemaining(hass, id) {
  const s = id ? stateObj(hass, id) : null;
  if (!s) return null;
  const v = numberOrNull(s.state);
  if (v === null) {
    const at = Date.parse(s.state);
    return isFinite(at) ? Math.max(0, (at - Date.now()) / 1000) : null;
  }
  const u = String((s.attributes || {}).unit_of_measurement || "min").toLowerCase();
  return u === "s" ? v : u === "h" ? v * 3600 : v * 60;
}
// One reading of the new types: the mode, the state line, its colour, the
// lines under it and what the drawing needs.
function ntReadOf(type, hass, cfg, st, watts, threshold) {
  const lines = [];
  const raw = st ? String(st.state).trim().toLowerCase() : "";
  const dead = !st || ["unavailable", "unknown", "none", ""].includes(raw);
  const running = ntRunning(hass, cfg, st, watts, threshold);
  const unav = running === null && !(type === "meter" && !dead);
  const tmp = ntTemp(hass, cfg, st);
  const out = (mode, labelKey, color, draw) => ({ mode, label: t(hass, labelKey), color, lines, draw: { ...draw, unav } });
  if (unav) {
    const ml = meterLayoutOf(cfg, st);
    const kinds = { water_pump: pumpLayoutOf(cfg, st), floor_heating: "floor", spa: "spa", sauna: "sauna", aquarium: "aquarium", meter: ml === "linky" ? "linky" : `meter_${ml}`, christmas_tree: "tree", mobility: `mob_${mobilityLayoutOf(cfg, st)}`,
      irrigation: `irr_${irrigationLayoutOf(cfg, st)}`, litter_box: `lit_${litterLayoutOf(cfg, st)}`, detector: `det_${detectorLayoutOf(cfg, st)}`, speaker: `spk_${speakerLayoutOf(cfg, st)}`, console: `con_${consoleLayoutOf(cfg, st)}` };
    return out("unav", "ev_offline", NT_COLORS.unav, { kind: kinds[type], on: false, electric: floorLayoutOf(cfg) === "electric",
      palette: cfg.tree_palette, presents: type === "christmas_tree" && treePresents(cfg), color: type === "speaker" ? speakerColorOf(cfg, st) : "" });
  }
  if (type === "irrigation") {
    // Watering while its valve or switch is on; waiting otherwise, or held
    // by the weather when a rain delay is set.
    const layout = irrigationLayoutOf(cfg, st);
    const kind = `irr_${layout}`;
    const zone = ntLine(hass, cfg, "irr_zone", "mdi:sprinkler-variant", "irr_zone", cfg.zone_entity);
    if (zone) lines.push(zone);
    const secs = cfg.remaining_time_entity ? ntRemaining(hass, cfg.remaining_time_entity) : null;
    const left = secs !== null && secs > 0 ? formatDuration(secs, hass) : "";
    const watering = !!running || (st && ["open", "opening"].includes(raw));
    const mv = cfg.soil_moisture_entity ? numericState(hass, cfg.soil_moisture_entity) : null;
    const moist = mv === null ? null : Math.max(0, Math.min(1, mv / 100));
    const soil = ntLine(hass, cfg, "irr_soil", "mdi:water-percent", "section_soil_moisture", cfg.soil_moisture_entity);
    if (soil) lines.push({ ...soil, caution: moist !== null && moist < 0.25 });
    const next = ntLine(hass, cfg, "irr_next", "mdi:calendar-clock", "section_next_run", cfg.next_run_entity);
    if (next) lines.push(next);
    const rain = ntOnOff(hass, cfg.rain_delay_entity) || (numberOrNull((stateObj(hass, cfg.rain_delay_entity) || {}).state) > 0);
    const draw = { kind, on: watering, rain, moist, lcd: watering ? left : "" };
    if (watering) return out("watering", "irr_watering", NT_COLORS.run, draw);
    if (rain) return out("rain", "irr_rain", "#8e24aa", draw);
    return out("idle", "irr_waiting", NT_COLORS.idle, draw);
  }
  if (type === "litter_box") {
    // Its status in words or in Litter-Robot's codes, a waste drawer that
    // fills, and a cat sensor that says when to wait.
    const layout = litterLayoutOf(cfg, st);
    const kind = `lit_${layout}`;
    const dv = cfg.waste_drawer_entity ? numericState(hass, cfg.waste_drawer_entity) : null;
    const drawer = dv === null ? null : Math.max(0, Math.min(1, dv / 100));
    const dl = ntLine(hass, cfg, "lit_drawer", "mdi:delete-variant", "sec_waste_drawer", cfg.waste_drawer_entity);
    if (dl) lines.push({ ...dl, caution: drawer !== null && drawer >= 0.8 });
    const lv = cfg.litter_level_entity ? numericState(hass, cfg.litter_level_entity) : null;
    const ll = ntLine(hass, cfg, "lit_level", "mdi:texture-box", "sec_litter_level", cfg.litter_level_entity);
    if (ll) lines.push({ ...ll, caution: lv !== null && unitOf(hass, cfg.litter_level_entity) === "%" && lv <= 20 });
    for (const [key, icon, label, id] of [["lit_weight", "mdi:scale", "sec_pet_weight", cfg.pet_weight_entity], ["lit_visits", "mdi:paw", "sec_visits", cfg.visits_entity], ["lit_last", "mdi:clock-outline", "sec_last_use", cfg.last_use_entity]]) {
      const l = ntLine(hass, cfg, key, icon, label, id);
      if (l) lines.push(l);
    }
    const code = raw.replace(/\s+/g, "_");
    const cat = ntOnOff(hass, cfg.cat_present_entity) || ["cst", "csi", "cat_detected", "cat_present"].includes(code) || /cat.?(detect|sensor|present|inside)|chat.?(dedans|present)/.test(raw);
    let mode = "ready";
    if (/(^|_)(ccp|ec)$|clean|cycl|nettoy|reinig|limpi|puliz|reinigung|empty_cycle/.test(code) && !/complete|ccc/.test(code)) mode = "cleaning";
    else if (["dfs", "sdf", "df2"].includes(code) || /full|plein|voll|lleno|pieno/.test(raw) || (drawer !== null && drawer >= 1)) mode = "full";
    else if (["csf", "dhf", "dpf", "otf", "pd", "spf", "hpf", "br", "error", "fault"].includes(code) || /fault|error|erreur|defaut|fehler|jam|pinch/.test(raw)) mode = "fault";
    else if (["off", "sleep", "sleeping", "offline", "p", "paused"].includes(code) || /sleep|veille|schlaf/.test(raw)) mode = "off";
    if (domainOf(cfg.state_entity) === "vacuum") mode = raw === "cleaning" ? "cleaning" : raw === "error" ? "fault" : mode;
    if (mode === "ready" && cat) mode = "cat";
    const draw = { kind, on: mode === "cleaning", st: mode, cat: mode === "cat" || (cat && mode !== "cleaning"), drawer };
    const map = { cleaning: ["lit_cleaning", NT_COLORS.run], cat: ["lit_cat", "#fb8c00"], full: ["lit_full", NT_COLORS.alarm], fault: ["lit_fault", NT_COLORS.alarm], off: ["lit_sleep", NT_COLORS.off], ready: ["lit_ready", NT_COLORS.lit] };
    return out(mode, map[mode][0], map[mode][1], draw);
  }
  if (type === "detector") {
    // On is an alarm: smoke, CO or water, as its device class or its drawing
    // says. A low battery is a line, the light turns amber.
    const layout = detectorLayoutOf(cfg, st);
    const kind = `det_${layout}`;
    const alarm = !dead && (NT_ON.includes(raw) || /alarm|smoke|detect|leak|wet|fuite|fumee|emergency|warning/.test(raw)) && !/^(off|ok|clear|dry|normal|idle)$/.test(raw);
    const bv = cfg.battery_entity ? numericState(hass, cfg.battery_entity) : null;
    const bs = cfg.battery_entity ? stateObj(hass, cfg.battery_entity) : null;
    const low = bv !== null ? bv <= 20 : !!bs && domainOf(cfg.battery_entity) === "binary_sensor" && NT_ON.includes(String(bs.state).toLowerCase());
    const bl = ntLine(hass, cfg, "det_battery", low ? "mdi:battery-alert-variant-outline" : "mdi:battery", "section_battery", cfg.battery_entity);
    if (bl) lines.push({ ...bl, value: domainOf(cfg.battery_entity) === "binary_sensor" ? t(hass, low ? "opt_low" : "opt_ok") : bl.value, caution: low });
    const co = ntLine(hass, cfg, "det_co_level", "mdi:molecule-co", "sec_co_level", cfg.co_level_entity);
    if (co) lines.push(co);
    const cv = cfg.co_level_entity ? numericState(hass, cfg.co_level_entity) : null;
    const draw = { kind, on: alarm, low, lcd: cv !== null ? `${Math.round(cv)} ppm` : alarm ? "ALARM" : "OK" };
    if (alarm) return out("alarm", { smoke: "det_smoke", co: "det_co", leak: "det_leak" }[layout], NT_COLORS.alarm, draw);
    return out("ok", "det_ok", NT_COLORS.lit, draw);
  }
  if (type === "console") {
    // A console: a media player from PlayStation Network, Xbox or the PS4
    // integration, PSN's online status, a smart plug, or anything on and off.
    // Playing while a game runs, on in its menus, resting, or off.
    const kind = `con_${consoleLayoutOf(cfg, st)}`;
    const a = (st && st.attributes) || {};
    const gst = cfg.game_entity ? stateObj(hass, cfg.game_entity) : null;
    const gameOk = gst && !["unknown", "unavailable", "", "none", "off", "null"].includes(String(gst.state).trim().toLowerCase());
    const game = gameOk ? String(gst.state) : a.media_title ? String(a.media_title) : "";
    const metered = cfg.power_entity && watts !== null && isFinite(threshold);
    const rest = !metered && ["standby", "rest", "rest_mode"].includes(raw);
    const on = metered ? watts >= threshold
      : !dead && ["on", "true", "playing", "idle", "paused", "home", "online", "availabletoplay", "availabletocommunicate", "busy", "buffering"].includes(raw);
    // A plug drawing power is a console being played; so is a game running.
    const playing = on && (raw === "playing" || !!game || (metered && domainOf(cfg.state_entity) !== "media_player"));
    if (on && game) lines.push({ key: "con_game", icon: "mdi:gamepad-variant", label: t(hass, "con_game"), value: game, entity: gameOk ? cfg.game_entity : cfg.state_entity, wrap: true });
    const played = ntLine(hass, cfg, "con_playtime", "mdi:timer-outline", "con_playtime", cfg.playtime_entity);
    if (played) lines.push(played);
    const left = ntLine(hass, cfg, "con_playtime_left", "mdi:timer-sand", "con_playtime_left", cfg.playtime_left_entity);
    if (left) lines.push(left);
    const draw = { kind, on, st: playing ? "playing" : on ? "on" : rest ? "rest" : "off" };
    if (playing) return out("playing", "con_playing", NT_COLORS.run, draw);
    if (on) return out("on", "con_on", NT_COLORS.lit, draw);
    if (rest) return out("rest", "con_rest", "#fb8c00", draw);
    return out("off", "con_off", NT_COLORS.off, draw);
  }
  if (type === "speaker") {
    // A media player: what it plays and how loud, in the lines.
    const layout = speakerLayoutOf(cfg, st);
    const kind = `spk_${layout}`;
    const a = (st && st.attributes) || {};
    const playing = raw === "playing" || raw === "buffering";
    const paused = raw === "paused";
    const offish = dead || ["off", "standby", "unavailable"].includes(raw);
    if (!offish) {
      if (a.media_title) lines.push({ key: "spk_title", icon: "mdi:music-note", label: t(hass, "spk_title"), value: String(a.media_title), entity: cfg.state_entity, wrap: true });
      if (a.media_artist) lines.push({ key: "spk_artist", icon: "mdi:account-music", label: t(hass, "spk_artist"), value: String(a.media_artist), entity: cfg.state_entity, wrap: true });
      const src = a.app_name || a.source;
      if (src) lines.push({ key: "spk_source", icon: "mdi:import", label: t(hass, "spk_source"), value: String(src), entity: cfg.state_entity });
      const vol = numberOrNull(a.volume_level);
      if (vol !== null) lines.push({ key: "spk_volume", icon: a.is_volume_muted ? "mdi:volume-off" : vol < 0.34 ? "mdi:volume-low" : vol < 0.67 ? "mdi:volume-medium" : "mdi:volume-high", label: t(hass, "spk_volume"),
        value: keepTogether(a.is_volume_muted ? t(hass, "spk_muted") : `${Math.round(vol * 100)} %`), entity: cfg.state_entity });
    }
    const draw = { kind, on: playing, st: playing ? "playing" : paused ? "paused" : offish ? "off" : "idle", muted: !!a.is_volume_muted && !offish, color: speakerColorOf(cfg, st) };
    if (playing) return out("playing", "spk_playing", NT_COLORS.run, draw);
    if (paused) return out("paused", "spk_paused", NT_COLORS.idle, draw);
    if (offish) return out("off", "spk_off", NT_COLORS.off, draw);
    return out("idle", "spk_idle", NT_COLORS.idle, draw);
  }
  if (type === "mobility") {
    // On its charger (#72): unplugged when the plug is off, charging while
    // it draws its threshold or more (40 W by default, a charger tapering
    // off draws less), charged below it. A battery entity gives the level,
    // and says charged at 100 % whatever the plug says.
    const kind = `mob_${mobilityLayoutOf(cfg, st)}`;
    const lv = cfg.battery_entity ? numericState(hass, cfg.battery_entity) : null;
    const level = lv === null ? null : Math.max(0, Math.min(100, lv));
    if (level !== null) {
      lines.push({ key: "mob_battery", icon: level >= 95 ? "mdi:battery" : `mdi:battery-${Math.max(10, Math.round(level / 10) * 10)}`, label: t(hass, "section_battery"),
        value: keepTogether(`${Math.round(level)} %`), entity: cfg.battery_entity, caution: level <= 15 });
    }
    const isOff = !dead && ["off", "false", "0", "no", "unplugged"].includes(raw);
    const metered = cfg.power_entity && watts !== null && isFinite(threshold);
    if (isOff) return out("off", "mob_unplugged", NT_COLORS.off, { kind, on: false, st: "off", level });
    if (level !== null && level >= 100) return out("full", "mob_charged", NT_COLORS.lit, { kind, on: false, st: "full", level });
    if (metered) {
      return watts >= threshold ? out("charging", "mob_charging", "#fb8c00", { kind, on: true, st: "charging", level })
        : out("full", "mob_charged", NT_COLORS.lit, { kind, on: false, st: "full", level });
    }
    if (level !== null) return out("charging", "mob_charging", "#fb8c00", { kind, on: true, st: "charging", level });
    return out("idle", "mob_plugged", NT_COLORS.idle, { kind, on: false, st: "plugged", level });
  }
  if (type === "water_pump") {
    const layout = pumpLayoutOf(cfg, st);
    const pressure = ntValueText(hass, cfg, cfg.pressure_entity);
    if (pressure) lines.push({ key: "pump_pressure", icon: "mdi:gauge", label: t(hass, "section_pressure"), value: keepTogether(pressure), entity: cfg.pressure_entity });
    let level = null;
    let levelText = null;
    if (cfg.level_entity) {
      const v = numericState(hass, cfg.level_entity);
      if (v !== null) {
        const max = parseFloat(cfg.level_max);
        const pct = unitOf(hass, cfg.level_entity) === "%";
        level = pct ? v / 100 : Number.isFinite(max) && max > 0 ? v / max : null;
        levelText = ntValueText(hass, cfg, cfg.level_entity);
        lines.push({ key: "pump_level", icon: "mdi:waves-arrow-up", label: t(hass, "section_water_level"), value: keepTogether(levelText), entity: cfg.level_entity });
      }
    }
    const alarm = layout === "sump" && (ntOnOff(hass, cfg.high_level_entity) || (level !== null && level >= 0.9));
    const on = !!running || alarm;
    // A pump on a metered plug left on pumps when it draws power, so
    // the plug cut means it cannot pump at all: off, in red on a sump pump,
    // the water rising with nothing to take it away. Without a power meter
    // the switch is the pump's own and off is only waiting.
    const cut = !dead && !!cfg.power_entity && ["off", "false"].includes(raw) && !alarm;
    if (cut) return out("off", "wp_off", layout === "sump" ? NT_COLORS.alarm : NT_COLORS.off, { kind: layout, on: false, alarm: false, level, lcd: "OFF" });
    const lcd = layout === "sump" ? levelText || "" : pressure || (cfg.power_entity && watts !== null ? `${Math.round(watts)} W` : "");
    if (alarm) return out("alarm", "wp_high", NT_COLORS.alarm, { kind: "sump", on, alarm, level, lcd });
    return out(on ? "run" : "idle", on ? "wp_pumping" : "ac_idle", on ? NT_COLORS.run : NT_COLORS.idle, { kind: layout, on, alarm: false, level, lcd });
  }
  if (type === "floor_heating" || type === "sauna") {
    const isOff = !dead && raw === "off" && !(cfg.power_entity && watts !== null && watts >= threshold);
    if (tmp) lines.push({ key: "nt_temp", icon: "mdi:thermometer", label: t(hass, "temperature"), value: keepTogether(tmp.text), entity: cfg.temperature_entity || cfg.state_entity });
    const target = ntTarget(hass, cfg, st);
    const draw = type === "sauna"
      ? { kind: "sauna", on: !!running && !isOff, temp: tmp ? tmp.v : null, lcd: tmp ? tmp.text : "" }
      : { kind: "floor", on: !!running && !isOff, electric: floorLayoutOf(cfg) === "electric", lcd: tmp ? tmp.text : "" };
    if (isOff) return out("off", "ac_off", NT_COLORS.off, { ...draw, on: false });
    if (type === "sauna" && tmp && target !== null && tmp.v >= target - 3) return out("ready", "sauna_ready", NT_COLORS.lit, { ...draw, on: true });
    return running ? out("heat", "ac_heating", NT_COLORS.heat, draw) : out("idle", "ac_idle", NT_COLORS.idle, draw);
  }
  if (type === "spa") {
    const isOff = !dead && raw === "off";
    const bubbles = ntOnOff(hass, cfg.bubbles_entity);
    const lit = ntOnOff(hass, cfg.light_entity);
    if (tmp) lines.push({ key: "nt_temp", icon: "mdi:thermometer", label: t(hass, "temperature"), value: keepTogether(tmp.text), entity: cfg.temperature_entity || cfg.state_entity });
    const heating = !!running && !isOff;
    const draw = { kind: "spa", on: heating || bubbles, heating, bubbles, lit, steam: heating || bubbles, lcd: tmp ? tmp.text : "" };
    if (bubbles) return out("bubbles", "spa_bubbles", NT_COLORS.run, draw);
    if (isOff) return out("off", "ac_off", NT_COLORS.off, draw);
    return heating ? out("heat", "ac_heating", NT_COLORS.heat, draw) : out("idle", "ac_idle", NT_COLORS.idle, draw);
  }
  if (type === "aquarium") {
    if (tmp) lines.push({ key: "nt_temp", icon: "mdi:thermometer", label: t(hass, "temperature"), value: keepTogether(tmp.text), entity: cfg.temperature_entity || cfg.state_entity });
    const draw = { kind: "aquarium", on: !!running, lcd: tmp ? tmp.text : "", heater: cfg.power_entity && watts !== null ? watts >= threshold : false };
    return running ? out("lit", "aq_lit", NT_COLORS.lit, draw) : out("off", "aq_dark", NT_COLORS.off, draw);
  }
  if (type === "meter") {
    const layout = meterLayoutOf(cfg, st);
    const v = numberOrNull(st && st.state);
    // Today's use and the index, on lines and on the meter (#68).
    const today = ntValueText(hass, cfg, cfg.today_entity);
    if (today) lines.push({ key: "meter_today", icon: "mdi:calendar-today", label: t(hass, "today_line"), value: keepTogether(today), entity: cfg.today_entity });
    const indexV = cfg.total_entity ? numericState(hass, cfg.total_entity) : null;
    const tariffSt = cfg.tariff_entity ? stateObj(hass, cfg.tariff_entity) : null;
    const tariff = tariffSt && !["unknown", "unavailable"].includes(String(tariffSt.state)) ? String(tariffSt.state) : "";
    if (tariff) lines.push({ key: "meter_tariff", icon: "mdi:clock-time-four-outline", label: t(hass, "section_tariff"), value: tariff, entity: cfg.tariff_entity });
    // Which way the power flows (#77): below zero it feeds in, as most smart
    // meter readers report it, unless the meter is set to one direction; at
    // zero nothing is used.
    const direction = ["import", "export"].includes(cfg.meter_direction) ? cfg.meter_direction : "auto";
    const flowOf = (w) => direction === "export" ? (Math.abs(w) < 1 ? "none" : "export")
      : direction === "import" ? (w < 1 ? "none" : "import")
      : Math.abs(w) < 1 ? "none" : w < 0 ? "export" : "import";
    const high = parseFloat(cfg.high_power);
    const highW = Number.isFinite(high) ? high : 3000;
    const exportIdx = cfg.export_total_entity ? numericState(hass, cfg.export_total_entity) : null;
    const exportLine = () => {
      if (exportIdx === null) return;
      const u = unitOf(hass, cfg.export_total_entity);
      lines.push({ key: "meter_export_index", icon: "mdi:transmission-tower-export", label: t(hass, "meter_export_index"),
        value: keepTogether(`${netNumber(hass, exportIdx, 3)}${u ? ` ${u}` : ""}`), entity: cfg.export_total_entity });
    };
    if (layout === "linky") {
      exportLine();
      if (v === null) return out("unav", "ev_offline", NT_COLORS.unav, { kind: "linky", on: false, unav: true, lcd: "", label: "" });
      const unit = unitOf(hass, cfg.state_entity) || "VA";
      const flow = flowOf(v);
      const heavy = Math.abs(v) >= highW;
      const value = `${Math.round(Math.abs(v))} ${unit}`;
      const draw = { kind: "linky", on: true, heavy, still: flow === "none", exp: flow === "export", lcd: value, label: unit.toUpperCase() === "VA" ? "PAPP" : "SINSTS", tariff: tariff.toUpperCase().slice(0, 6) };
      if (flow === "none") return out("idle", "meter_idle", NT_COLORS.idle, draw);
      if (flow === "export") return out("export", "meter_export", NT_COLORS.lit, draw);
      return out(heavy ? "high" : "low", heavy ? "meter_high" : "meter_low", heavy ? NT_COLORS.high : NT_COLORS.idle, draw);
    }
    const kind = `meter_${layout}`;
    if (v === null) return out("unav", "ev_offline", NT_COLORS.unav, { kind, on: false, unav: true, lcd: "", counter: indexV !== null ? String(indexV) : "", today });
    // The state is either a rate (W, kW, m3/h, L/min), drawn on the display,
    // or an index (kWh, m3, L), drawn on the drums and running while it
    // moved in the last two minutes.
    const unit = unitOf(hass, cfg.state_entity) || "";
    const rate = /^(m?w|kw|va|kva|.*\/(h|min|s))$/i.test(unit.replace(/\s/g, "")) || ["power", "volume_flow_rate", "apparent_power"].includes(String((st.attributes || {}).device_class || ""));
    const moved = st.last_changed ? Date.now() - Date.parse(st.last_changed) < 120000 : false;
    const electric = layout === "box" || layout === "dome";
    const on = rate ? v > 0 : moved;
    // A rate below zero on an electric meter is power fed in: the display
    // shows its size, the state says which way it goes.
    const shown = rate && electric ? Math.abs(v) : v;
    const text = `${netNumber(hass, shown, Math.abs(shown) < 10 && shown % 1 ? 2 : Math.abs(shown) < 100 && shown % 1 ? 1 : 0)}${unit ? ` ${unit}` : ""}`;
    const counter = indexV !== null ? String(indexV) : !rate ? String(v) : "";
    // The live reading on a line of its own, first: the power, or the flow.
    const feeding = rate && electric && flowOf(v) === "export";
    if (rate) {
      lines.unshift({ key: "meter_live", icon: feeding ? "mdi:transmission-tower-export" : electric ? "mdi:flash" : layout === "gas" ? "mdi:fire" : "mdi:water",
        label: t(hass, feeding ? "meter_export" : electric ? "power" : "meter_flow"), value: keepTogether(text), entity: cfg.state_entity });
    }
    if (indexV !== null) {
      lines.push({ key: "meter_index", icon: "mdi:counter", label: t(hass, "meter_index"),
        value: keepTogether(`${netNumber(hass, indexV, 3)}${unitOf(hass, cfg.total_entity) ? ` ${unitOf(hass, cfg.total_entity)}` : ""}`), entity: cfg.total_entity });
    }
    if (electric) exportLine();
    // An electric meter read from its index takes its live power from the
    // power entity when there is one: the display shows it, and high use
    // is worked out from it (#68).
    let live = rate ? { v, unit } : null;
    if (!live && electric && cfg.power_entity) {
      const p = numericState(hass, cfg.power_entity);
      if (p !== null) live = { v: p, unit: unitOf(hass, cfg.power_entity) || "W" };
    }
    const watts = live && electric ? (/^k(w|va)$/i.test(live.unit.replace(/\s/g, "")) ? live.v * 1000 : live.v) : null;
    const flow = watts !== null ? flowOf(watts) : null;
    const heavy = watts !== null && Math.abs(watts) >= highW;
    const liveText = live && !rate ? `${netNumber(hass, Math.abs(live.v), Math.abs(live.v) < 10 && live.v % 1 ? 2 : 0)} ${live.unit}` : text;
    const lcd = rate || electric ? liveText : "";
    // Today's use under the display, unless the display already says it.
    const draw = { kind, on: on || (!!live && live.v !== 0), heavy, still: flow === "none", exp: flow === "export", lcd, counter, today: today && today !== lcd ? today : "" };
    if (electric) {
      if (flow === "none") return out("idle", "meter_idle", NT_COLORS.idle, draw);
      if (flow === "export") return out("export", "meter_export", NT_COLORS.lit, draw);
      return out(heavy ? "high" : "low", heavy ? "meter_high" : "meter_low", heavy ? NT_COLORS.high : NT_COLORS.idle, draw);
    }
    return on ? out("low", "meter_flowing", NT_COLORS.run, draw) : out("idle", "meter_idle", NT_COLORS.idle, draw);
  }
  // A Christmas tree.
  const draw = { kind: "tree", on: !!running, palette: TREE_PALETTES[cfg.tree_palette] ? cfg.tree_palette : "multicolor", presents: treePresents(cfg) };
  return running ? out("lit", "tree_on", NT_COLORS.lit, draw) : out("off", "tree_off", NT_COLORS.off, draw);
}
// Each new type's switch, unless the card has a power switch of its own; the
// spa's bubbles have theirs.
function ntControls(hass, cfg, type) {
  const out = [];
  const st = stateObj(hass, cfg.state_entity);
  if (st && !cfg.toggle_entity && type !== "meter" && ["light", "switch", "input_boolean"].includes(domainOf(cfg.state_entity))) {
    out.push({ key: "toggle", entity: cfg.state_entity, icon: type === "christmas_tree" ? "mdi:pine-tree" : type === "aquarium" ? "mdi:lightbulb" : type === "mobility" ? "mdi:power-plug" : "mdi:power", label: t(hass, "toggle"),
      on: String(st.state).toLowerCase() === "on" });
  }
  if (type === "speaker" && st && ["playing", "paused", "buffering", "idle", "on"].includes(String(st.state).toLowerCase())) {
    const playing = ["playing", "buffering"].includes(String(st.state).toLowerCase());
    out.push({ key: "play_pause", entity: cfg.state_entity, icon: playing ? "mdi:pause" : "mdi:play", label: t(hass, "play_pause"), on: playing, service: "media_play_pause" });
  }
  if (type === "detector" && cfg.test_entity) out.push({ key: "det_test", entity: cfg.test_entity, icon: "mdi:bell-ring-outline", label: t(hass, "sec_test") });
  if (type === "spa" && cfg.bubbles_entity && ["switch", "input_boolean", "fan"].includes(domainOf(cfg.bubbles_entity))) {
    out.push({ key: "bubbles", entity: cfg.bubbles_entity, icon: "mdi:chart-bubble", label: t(hass, "section_bubbles"), on: ntOnOff(hass, cfg.bubbles_entity) });
  }
  return out;
}

