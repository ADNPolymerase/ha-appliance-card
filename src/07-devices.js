// A screen at 0 W is off, up to its threshold it is on standby, above it it
// is on. Half a watt is still nothing: plenty of plugs read 0.2 or 0.3 W with
// the screen unplugged behind them.
const SCREEN_OFF_W = 0.5;
const SCREEN_STANDBY_W = 20;
const SCREEN_LAYOUTS = ["tv_feet", "tv_stand", "tv_wall", "projector", "computer", "laptop", "tablet_wall", "tablet_frame", "tablet_portrait"];
// A wall tablet that shows a dashboard (#62): Fully Kiosk's, or any other
// that reports its screen, its screensaver and its charger.
const SCREEN_TABLETS = ["tablet_wall", "tablet_frame", "tablet_portrait"];
const SCREEN_TABLET_RE = /tablet|kiosk|wall ?panel|(^|[^a-z])fully([^a-z]|$)|\u5e73\u677f|\u043f\u043b\u0430\u043d\u0448\u0435\u0442/;
const SCREEN_NAME_RE = /(^|[^a-z])tv([^a-z]|$)|(^|[^a-z])t(e|\u00e9)l(e|\u00e9)([^a-z]|$)|t(e|\u00e9)l(e|\u00e9)vis|fernseher|televize|telewizor|\u0442\u0435\u043b\u0435\u0432\u0438\u0437\u043e\u0440|\u7535\u89c6|beamer|project(or|eur)|proyector|proiettore|projektor|\u6295\u5f71|\u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0440|computer|ordinateur|desktop|imac|ordenador|computador|komputer|po(c|\u010d)(i|\u00ed)ta(c|\u010d)|\u7535\u8111|\u043a\u043e\u043c\u043f\u044c\u044e\u0442\u0435\u0440|tablet|kiosk|wall ?panel|\u5e73\u677f|\u043f\u043b\u0430\u043d\u0448\u0435\u0442|laptop|notebook|macbook|chromebook|thinkpad|\u7b14\u8bb0\u672c|\u043d\u043e\u0443\u0442\u0431\u0443\u043a/;
// A laptop, by its name: the word for one, or a model everybody knows.
const SCREEN_LAPTOP_RE = /laptop|notebook|macbook|chromebook|thinkpad|ultrabook|(ordinateur|pc|computer|ordenador|computador)[ _]portable|portatil|baerbar|b\u00e6rbar|barbar dator|\u7b14\u8bb0\u672c|\u043d\u043e\u0443\u0442\u0431\u0443\u043a/;
const SCREEN_PROJECTOR_RE = /beamer|project(or|eur)|proyector|proiettore|projektor|\u6295\u5f71|\u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0440/;
const SCREEN_COMPUTER_RE = /computer|ordinateur|desktop|imac|ordenador|computador|komputer|po(c|\u010d)(i|\u00ed)ta(c|\u010d)|\u7535\u8111|\u043a\u043e\u043c\u043f\u044c\u044e\u0442\u0435\u0440|(^|[^a-z])pc([^a-z]|$)/;
const SCREEN_LABELS = { off: "ac_off", standby: "standby", on: "screen_on", playing: "screen_playing", paused: "paused", home: "screen_home", locked: "screen_locked", dashboard: "screen_dashboard", saver: "screen_saver" };
const SCREEN_COLORS = {
  off: "var(--disabled-text-color, #9e9e9e)", standby: "var(--warning-color, #ff9800)",
  on: "var(--info-color, #2196f3)", playing: "var(--info-color, #2196f3)", home: "var(--info-color, #2196f3)",
  paused: "var(--warning-color, #ff9800)", locked: "var(--warning-color, #ff9800)",
  dashboard: "var(--success-color, #43a047)", saver: "var(--info-color, #2196f3)",
};
const SCREEN_LIT = ["on", "playing", "paused", "home", "locked", "dashboard", "saver"];
// [top of the drawing, its height, how much larger it is drawn].
const SCREEN_BANDS = { tv_feet: [28, 66, 2], tv_stand: [26, 68, 2], tv_wall: [25, 62, 2], projector: [0, 87, 1.8], computer: [24, 62, 1.6], laptop: [24, 64, 1.6],
  tablet_wall: [26, 59, 2], tablet_frame: [26, 59, 2], tablet_portrait: [24, 64, 2] };
// The pictures a lit screen shows, one drawn at random each time it comes on:
// the first six suit a television or a projector, the next three a computer,
// and a tablet shows its dashboard.
const SCREEN_IMAGES = ["sunset", "aquarium", "bars", "football", "space", "bounce", "desktop", "code", "pong", "dashboard"];
const SCREEN_TV_IMAGES = SCREEN_IMAGES.slice(0, 6);
const SCREEN_PC_IMAGES = SCREEN_IMAGES.slice(6, 9);
const SCREEN_TAB_IMAGES = ["dashboard"];
// The order a screen's players are read in: one playing wins over one paused,
// which wins over one at rest. Several on one screen is the usual case: the
// television, and the box or the console that actually has the picture.
// A box on its home screen tells more than a television that is merely on.
const MEDIA_RANK = { playing: 4, buffering: 4, paused: 3, idle: 2.5, on: 2 };
// The model a screen is drawn as: the one chosen, or the one its names and
// its fields suggest. A tablet's own fields say it is one before its name does.
function screenLayoutOf(cfg, st) {
  if (SCREEN_LAYOUTS.includes(cfg.screen_layout)) return cfg.screen_layout;
  const name = stripAccents(`${cfg.state_entity || ""} ${cfg.media_entity || ""} ${(st && st.attributes.friendly_name) || ""}`.toLowerCase());
  if (cfg.screensaver_entity || cfg.charging_entity || cfg.url_entity || SCREEN_TABLET_RE.test(name)) return "tablet_wall";
  if (SCREEN_LAPTOP_RE.test(name)) return "laptop";
  return cfg.lock_entity || SCREEN_COMPUTER_RE.test(name) ? "computer" : SCREEN_PROJECTOR_RE.test(name) ? "projector" : "tv_feet";
}
function screenIsTablet(cfg, st = null) {
  return SCREEN_TABLETS.includes(screenLayoutOf(cfg, st));
}
// On its charger: a plugged-in sensor that is on, or a battery state that
// says charging, or full, which a phone or a tablet only says on its cable.
const SCREEN_CHARGING = ["on", "true", "yes", "charging", "plugged", "plugged_in", "ac", "usb", "wireless", "full"];
function screenCharging(hass, id) {
  const st = id ? stateObj(hass, id) : null;
  return !!st && SCREEN_CHARGING.includes(String(st.state).trim().toLowerCase().replace(/ /g, "_"));
}
// The page a tablet shows, without its address: the path is what tells one
// dashboard from another.
function screenPage(raw) {
  let v = String(raw || "").trim();
  if (!v || ["unavailable", "unknown"].includes(v.toLowerCase())) return "";
  v = v.replace(/^[a-z][a-z0-9+.-]*:\/\/[^/?#]+/i, "").replace(/^\/+/, "").replace(/[?#].*$/, "");
  try { v = decodeURIComponent(v); } catch (e) { /* as written */ }
  return v || "/";
}
// A screen's brightness in percent: a number of 0 to 255, as Fully Kiosk
// gives it, a percentage, or the brightness of a light.
function screenBrightness(hass, id) {
  const st = id ? stateObj(hass, id) : null;
  if (!st) return null;
  const a = st.attributes || {};
  if (domainOf(id) === "light") {
    if (String(st.state).toLowerCase() === "off") return 0;
    const b = numberOrNull(a.brightness);
    return b === null ? null : Math.round((b / 255) * 100);
  }
  const v = numericState(hass, id);
  if (v === null) return null;
  if (a.unit_of_measurement === "%") return Math.round(v);
  const max = numberOrNull(a.max);
  return Math.round((v / (max && max > 0 ? max : 255)) * 100);
}
// When a tablet was last touched: a timestamp it reports, or the moment the
// entity last changed.
function screenTouchedAt(hass, id) {
  const st = id ? stateObj(hass, id) : null;
  if (!st || ["unavailable", "unknown"].includes(String(st.state).toLowerCase())) return null;
  const at = Date.parse(st.state);
  if (isFinite(at) && /\d{4}-\d{2}-\d{2}/.test(st.state)) return at;
  const changed = Date.parse(st.last_changed);
  return isFinite(changed) ? changed : null;
}
// A session lock, whatever reports it: a lock entity, a binary sensor of the
// lock class (on means unlocked), or a sensor that says "locked".
function screenLocked(lst, id) {
  if (!lst) return false;
  const v = String(lst.state).toLowerCase();
  const d = domainOf(id);
  if (d === "lock") return v === "locked";
  if (d === "binary_sensor" && (lst.attributes || {}).device_class === "lock") return v === "off";
  return ["on", "locked", "true"].includes(v);
}

// A hair dryer, by its name in any language. Phon and Fohn on their own,
// since they hide in other words (an iPhone).
const HAIR_DRYER_RE = /hair.?dryer|blow.?dryer|s(e|\u00e8)che.?cheveux|haartrockner|(^|[^a-z])(f(o|\u00f6)hn|phon)([^a-z]|$)|secador.?de.?(pelo|cabelo)|asciugacapelli|haardroger|h(a|\u00e5)rtork|h\u00e5rf\u00f8ner|h\u00e5rt\u00f8rrer|suszark.?do.?w(l|\u0142)os|vysou\u0161e\u010d.?vlas|(^|[^a-z])f\u00e9n([^a-z]|$)|\u5439\u98ce\u673a|(^|[^\u0430-\u044f])\u0444\u0435\u043d([^\u0430-\u044f]|$)/;
// A hair dryer's fan alone stays well under this; its heater goes well over.
const HD_HEAT_W = 300;
// Above this the heater is on its high setting, and the air comes out harder.
const HD_HIGH_W = 1200;
// What each type draws at the least while it works, for a plug that has a
// meter and no power_on_threshold: a washer turning its drum draws a few
// watts at times, a fan on its lowest speed hardly more, a kettle a lot. The
// fridge, the iron, the hair dryer, screens and the rest read their plug in
// their own way and are not here.
const PLUG_THRESHOLDS = {
  washer: 10, dryer: 10, dishwasher: 10, oven: 50, microwave: 50, cooker: 20, coffee: 200, rice_cooker: 100,
  air_fryer: 50, kettle: 50, toaster: 50, water_heater: 50, space_heater: 30, towel_warmer: 10, dehumidifier: 30,
  air_purifier: 3, fan: 3, hood: 5, pool_pump: 50, printer_3d: 30, cooktop: 50, pet_fountain: 1,
  spa: 50, sauna: 100, aquarium: 3, water_pump: 30, floor_heating: 30, christmas_tree: 2, iron: 10, mobility: 40, irrigation: 3, litter_box: 5, speaker: 3, console: 8,
};
// A coffee machine or a rice cooker drawing more than this, under its
// threshold, is keeping warm.
const KEEP_WARM_TYPES = ["coffee", "rice_cooker"];
const KEEP_WARM_W = 5;
// A hob on a plug: what one zone draws at full power, and how long a zone
// stays hot once off.
const ZONE_POWER_W = 1500;
const ZONE_RESIDUAL_MS = 10 * 60000;
// The types a smart plug alone can read, and whether a card reads its
// appliance from one: as told by source, or else when its state is the
// plug's switch or the meter itself. A plug-read card offers only the plug in
// its editor, and an integration-read one never takes its switch for a plug.
// A fridge or a screen reads its plug and its sensors or players together,
// so it has no plug mode: its editor shows both.
const PLUG_SOURCE_TYPES = [...new Set(Object.keys(PLUG_THRESHOLDS).concat(["hair_dryer"]))];
function plugSourceOf(cfg, type) {
  if (!PLUG_SOURCE_TYPES.includes(type) || cfg.source === "integration") return false;
  if (cfg.source === "plug") return true;
  return !!cfg.power_entity && (!cfg.state_entity || cfg.state_entity === cfg.power_entity
    || ["switch", "input_boolean"].includes(domainOf(cfg.state_entity)));
}
// A dishwasher on a plug dries for this many minutes after its last heat.
const DW_DRY_MIN = 20;
// Above these a washer heats its water and spins its drum; a dishwasher heats
// its water above the first; a dryer heats its air above its own.
const WASH_HEAT_W = 1000;
const WASH_SPIN_W = 200;
const DRYER_HEAT_W = 600;
// An iron: off, heating, or hot with its thermostat cut out.
const IRON_LABELS = { off: "iron_off", heating: "iron_heating", ready: "iron_ready" };
// Below these, the steam is light, then fuller: a travel iron draws under a
// kilowatt, a full-size one or a steam generator two or more.
const IRON_LOW_W = 800;
const IRON_HIGH_W = 1600;
const HD_LABELS = { off: "ac_off", cool: "hd_cool", hot: "hd_hot", on: "screen_on" };
// A network device. Its name says which drawing it gets when none is chosen:
// a NAS by its maker or its system, a switch by its name, a rack by its own.
// A Nintendo Switch is a console, not a switch.
const NET_LAYOUTS = ["switch", "server", "nas", "rack", "router"];
const NET_NAS_RE = /(^|[\s._-])(nas|synology|diskstation|qnap|ugreen|unraid|truenas|freenas|openmediavault|omv|asustor|terramaster|ds\d{3})/;
const NET_SWITCH_RE = /(?<!nintendo.?)switch|(^|[\s._-])(usw|edgeswitch|poe)([\s._-]|$)/;
const NET_RACK_RE = /(^|[\s._-])(rack|baie|homelab)([\s._-]|$)/;
const NET_SERVER_RE = /(^|[\s._-])(server|serveur|servidor|serwer|proxmox|pve|esxi|unifi)([\s._-]|\d|$)/;
// A router or the box an ISP lends: by its name, its maker's, or the ISP's.
const NET_ROUTER_RE = /(^|[\s._-])(router|routeur|ruter|udm|bbox|livebox|freebox|fritz.?box|modem|archer)([\s._-]|\d|$)/;
const NET_NAME_RE = new RegExp([NET_NAS_RE, NET_SWITCH_RE, NET_RACK_RE, NET_SERVER_RE, NET_ROUTER_RE].map((r) => `(${r.source})`).join("|"));
// The switches drawn: one row of eight, then two rows of eight, twelve and
// sixteen, numbered like the real ones, odd on top and even below.
const SWITCH_PORTS = [8, 16, 24, 32];
const NET_BAYS = [1, 2, 4];
// Busy above 10 Mbit/s of traffic, or a processor above 80 %; in alert at
// 70 degrees, where a NAS or a switch is running hot.
const NET_BUSY_MBIT = 10;
const NET_BUSY_CPU = 80;
const NET_TEMP_ALERT = 70;
const NET_OFF_STATES = ["off", "not_home", "offline", "false", "disconnected", "down", "stopped", "shutdown", "away"];
const NET_LABELS = { off: "ac_off", on: "net_online", busy: "net_busy", alert: "net_alert", unav: "ev_offline" };
const NET_COLORS = { off: "var(--disabled-text-color, #9e9e9e)", on: "#43a047", busy: "#1e88e5", alert: "#f44336", warn: "#fb8c00", unav: "var(--disabled-text-color, #9e9e9e)" };
// Rates come in every unit there is: bytes or bits, decimal or binary.
const NET_RATE_BITS = {
  "bit/s": 1, "bps": 1, "kbit/s": 1e3, "kbps": 1e3, "Mbit/s": 1e6, "Mbps": 1e6, "Gbit/s": 1e9, "Gbps": 1e9,
  "B/s": 8, "kB/s": 8e3, "KB/s": 8e3, "MB/s": 8e6, "GB/s": 8e9, "KiB/s": 8192, "MiB/s": 8388608, "GiB/s": 8589934592,
};

function netLayoutOf(cfg, st) {
  if (NET_LAYOUTS.includes(cfg.network_layout)) return cfg.network_layout;
  const name = stripAccents(`${(cfg.state_entity || "").split(".")[1] || ""} ${(st && st.attributes.friendly_name) || ""} ${cfg.name || ""}`.toLowerCase());
  if (NET_RACK_RE.test(name)) return "rack";
  if (NET_NAS_RE.test(name)) return "nas";
  if (NET_ROUTER_RE.test(name) || cfg.clients_entity || cfg.wan_entity || cfg.wifi_entity) return "router";
  if (NET_SWITCH_RE.test(name) || cfg.ports_entity || cfg.poe_entity || cfg.switch_ports) return "switch";
  if (cfg.bays || [1, 2, 3, 4].some((i) => cfg[`disk${i}_entity`])) return "nas";
  return "server";
}

// The ports drawn: the model chosen, or the smallest one that holds them all.
function netPortsOf(cfg) {
  const n = parseInt(cfg.switch_ports, 10);
  if (SWITCH_PORTS.includes(n)) return n;
  const total = parseFloat(cfg.ports_total);
  if (isFinite(total) && total > 0) return SWITCH_PORTS.find((p) => p >= total) || 32;
  return 8;
}

// The bays drawn: the number chosen, or enough for the disks given.
function netBaysOf(cfg) {
  const n = parseInt(cfg.bays, 10);
  if (NET_BAYS.includes(n)) return n;
  let last = 0;
  [1, 2, 3, 4].forEach((i) => { if (cfg[`disk${i}_entity`]) last = i; });
  return last <= 1 ? (last ? 1 : 2) : last === 2 ? 2 : 4;
}

function netRateBits(hass, entityId) {
  const st = numericEntity(hass, entityId);
  if (!st) return null;
  const unit = st.attributes.unit_of_measurement;
  return Math.max(0, Number(st.state)) * (NET_RATE_BITS[unit] || 1e6);
}

function netNumber(hass, v, digits) {
  try {
    return new Intl.NumberFormat(lang(hass), { maximumFractionDigits: digits }).format(v);
  } catch (e) {
    return String(Math.round(v));
  }
}

function netRateText(hass, bits) {
  const [div, unit] = bits >= 1e9 ? [1e9, "Gbit/s"] : bits >= 1e6 ? [1e6, "Mbit/s"] : bits >= 1e3 ? [1e3, "kbit/s"] : [1, "bit/s"];
  const v = bits / div;
  return keepTogether(`${netNumber(hass, v, v < 10 ? 1 : 0)} ${unit}`);
}

// A disk's entities: its own device's when the integration gives each disk
// one (Synology), else those named after it on the device (UGREEN, Unraid,
// Glances: "disk_1_...", "sda_...").
const NET_DISK_TOKEN_RE = /(?:^|_)(?:(?:disk|disque|drive|laufwerk|festplatte|disco|dysk|hdd|ssd|bay|baie|nvme)_?\d+|sd[a-z])(?=_|$)/;
function netDiskEntities(hass, entityId, anchorDevice) {
  const reg = hass.entities && hass.entities[entityId];
  if (reg && reg.device_id && reg.device_id !== anchorDevice) return siblingEntityIds(hass, entityId);
  const obj = entityId.split(".")[1] || "";
  const m = obj.match(NET_DISK_TOKEN_RE);
  if (!m) return [entityId];
  const stem = obj.slice(0, m.index + m[0].length);
  return Object.keys(hass.states).filter((id) => {
    const o = id.split(".")[1] || "";
    return o === stem || o.startsWith(`${stem}_`);
  });
}

const NET_SLEEP_NAME_RE = /sleep|standby|spin|hibernat|veille/;
const NET_FAIL_RE = /crash|fail|fault|degrad|broken|critical|abnormal|defect|missing|disabled|dead/;
const NET_WARN_RE = /warn|attention|caution|not_?initiali/;
// A disk's LED: failed, to watch, reading or writing, asleep or fine. Each
// integration says it its own way, so every entity of the disk is read.
function netDiskState(hass, entityId, anchorDevice) {
  const own = stateObj(hass, entityId);
  if (!own) return "empty";
  if (["unavailable", "unknown"].includes(String(own.state).toLowerCase())) return "unknown";
  let fail = false, warn = false, busy = false, sleep = false;
  for (const id of netDiskEntities(hass, entityId, anchorDevice)) {
    const s = hass.states[id];
    if (!s) continue;
    const v = String(s.state).trim().toLowerCase();
    if (["unavailable", "unknown", ""].includes(v)) continue;
    const a = s.attributes || {};
    const obj = id.split(".")[1] || "";
    const dom = domainOf(id);
    if (a.spin_state === "standby" || a.standby === true || a.spinning === false) sleep = true;
    if (dom === "binary_sensor") {
      if (v !== "on") continue;
      if (NET_SLEEP_NAME_RE.test(obj)) sleep = true;
      else if (a.device_class === "problem") fail = true;
      else warn = true;
      continue;
    }
    if (dom !== "sensor") continue;
    if (NET_SLEEP_NAME_RE.test(obj)) {
      if (["on", "true", "yes", "1"].includes(v) || /sleep|standby|spun|hibernat|veille/.test(v)) sleep = true;
      continue;
    }
    const num = Number(s.state);
    if (Number.isFinite(num)) {
      if (a.device_class === "data_rate" || /iops|read|write|lecture|ecriture/.test(obj)) {
        if (num > 0) busy = true;
      } else if (/error|erreur|bad_?sector|reallocat/.test(obj) && num > 0) warn = true;
      continue;
    }
    if (/temp/.test(obj)) continue;
    if (NET_FAIL_RE.test(v)) fail = true;
    else if (NET_WARN_RE.test(v)) warn = true;
  }
  return fail ? "fail" : warn ? "warn" : busy ? "busy" : sleep ? "sleep" : "ok";
}

// A robot: a vacuum, a mop or a mower. Home Assistant gives the first its
// vacuum entity and the last its lawn_mower entity, with the same few words
// (cleaning or mowing, docked, returning, paused, idle, error). The
// integrations say more in a status of their own, read here for what the
// drawing can show: the station emptying the bin or washing and drying the
// pads, rain keeping a mower home, its edge cut.
const ROBOT_LAYOUTS = ["vacuum", "mop", "mower", "stick", "floor_washer", "pool"];
const ROBOT_STATIONS = ["station", "box", "base"];
// A rectangular station's front, as the brands make them (#69).
const ROBOT_BOX_COLORS = ["white", "black", "gold"];
const ROBOT_ONLY_FIELDS = ["robot_layout", "robot_station", "robot_station_color", "robot_camera", "robot_shelter", "robot_shelter_style", "mower_style", "robot_shelter_color", "robot_floor", "robot_controls", "away_threshold", "robot_status_entity", "robot_bin_entity",
  "robot_water_entity", "robot_clean_tank_entity", "robot_dirty_tank_entity", "robot_rain_entity", "robot_error_entity"];
// A robot by its name, its maker's or its integration's. A robot cook is a
// cooker, so the word robot needs what it does.
const ROBOT_NAME_RE = /tineco|aspirateur.?balai|floor.?one|ifloor|laveur.?de.?sol|floor.?washer|nass.?trocken|lavapavimenti|stick.?vac|cordless.?vac|akkusauger|stielsauger|roomba|braava|roborock|ecovacs|deebot|dreame|neato|eufy.?clean|robovac|xiaomi.?vacuum|conga|robot.?(vacuum|aspir|mop|laveur|mower|tondeuse)|robot.?(clean|sweep)|vacuum|aspirateur|saugroboter|staubsauger|wischroboter|aspiradora|aspirapolvere|robotstofzuiger|stofzuiger|dammsugare|st(o|\u00f8)vsuger|odkurzacz|vysavac|landroid|automower|mammotion|navimow|(^|[^a-z])luba([^a-z]|$)|lawn.?mower|(^|[^a-z])mower|tondeuse|m(a|ae|\u00e4)hroboter|robotmaaier|grasmaaier|cortac(e|\u00e9)sped|tosaerba|corta.?relva|robotgr(a|\u00e4)sklipp|robotgressklipp|robotpl(a|\u00e6)neklipp|kosiarka|sekacka|\u626b\u5730|\u5438\u5c18|\u62d6\u5730|\u5272\u8349|\u043f\u044b\u043b\u0435\u0441\u043e\u0441|\u0433\u0430\u0437\u043e\u043d\u043e\u043a\u043e\u0441/;
const ROBOT_MOWER_RE = /mow|m(a|ae|\u00e4)h|tondeuse|maaier|cortac|tosaerba|relva|klipp|kosiark|sekack|landroid|automower|worx|mammotion|navimow|(^|[^a-z])luba([^a-z]|$)|\u5272\u8349|\u0433\u0430\u0437\u043e\u043d\u043e\u043a\u043e\u0441/;
const ROBOT_MOP_RE = /(^|[^a-z])mop|braava|wisch|serpill|laveur|fregas|lavapavim|dweil|moppe|mopuj|mopov|\u62d6\u5730/;
// Home Assistant's own words, the same for a vacuum and a mower.
const ROBOT_STATES = { cleaning: "cleaning", mowing: "cleaning", docked: "charging", returning: "returning", paused: "paused", idle: "idle", error: "error" };
// A status that says all is well is not an error, whatever it is called.
// "No error" as the integrations say it, and as people write it in a
// template of their own (#57): in any of the card's languages.
const ROBOT_OK_RE = /^(no_?errors?|none|ok|normal|0|null|no_?fault|false|off|all_?good|aucune_erreur|pas_d_?erreurs?|sans_erreur|keine?_fehler|fehlerfrei|sin_error(es)?|ningun_error|nessun_errore|geen_fout(en)?|nenhum_erro|sem_erros?|inga_fel|inget_fel|ingen_feil|ingen_fejl|brak_b(l|\u0142)edow|zadna_chyba|bez_chyby?|\u043d\u0435\u0442_\u043e\u0448\u0438\u0431\u043e\u043a|\u0431\u0435\u0437_\u043e\u0448\u0438\u0431\u043e\u043a|\u65e0\u9519\u8bef|\u65e0\u6545\u969c|\u6b63\u5e38)$/;
const robotOkWord = (v) => ROBOT_OK_RE.test(stripAccents(String(v)).trim().toLowerCase().replace(/[\s.:'\u2019-]+/g, "_"));
// What a status says, first match wins: an error before anything else, then
// what the station does, then the way home, a pause, the work and the base.
const ROBOT_WORDS = [
  ["error", /error|fault|problem|stuck|trapped|jam|blocked|cliff|lifted|wheel_?susp|erreur|fehler/],
  ["empty", /water_?(shortage|empty|low|lack)|no_?water|lack_?of_?water|tank_?empty|manque_?d_?eau/],
  ["full", /bin_?full|(dust_?)?bin_?full|box_?full|full_?bin|bac_?plein/],
  ["emptying", /emptying|empty_?(dust|bin|box)|evac|auto_?empt|dust_?collect|collecting_?dust|vidage/],
  ["washing", /wash|(clean(ing)?|rins(e|ing))_?(the_?)?(mop|pad)|self_?clean|lavage/],
  ["drying", /dry|sechage|trockn/],
  ["rain", /(^|_)rain|pluie|regen/],
  ["returning", /return|back_?to|go(ing)?_?(home|back|to_?(dock|base|station))|homing|hm_?(usr|mid|post)?_?(dock|msn)|searching_?(base|dock|station)|retour/],
  ["paused", /pause/],
  ["edgecut", /edge_?cut|edgecut|border|bordure|kante/],
  ["cleaning", /clean|mow|vacuum|sweep|mop|zon|spot|segment|room|(^|_)run|work|leav|starting|edge/],
  ["charging", /charg|dock|base|home|station/],
  ["idle", /idle|ready|standby|stop|sleep|wait/],
];
const ROBOT_LABELS = {
  charging: "robot_charging", docked: "robot_docked", returning: "robot_returning", paused: "paused", idle: "robot_idle",
  error: "error", emptying: "robot_emptying", full: "robot_bin_full", washing: "robot_washing", drying: "robot_drying",
  empty: "robot_water_empty", rain: "robot_rain", edgecut: "robot_edgecut", unav: "ev_offline", off: "ac_off", away: "stick_away",
};
const ROBOT_WORK_LABELS = { vacuum: "robot_cleaning", mop: "robot_mopping", mower: "robot_mowing", stick: "robot_cleaning", floor_washer: "robot_cleaning", pool: "robot_cleaning" };
const ROBOT_COLORS = {
  charging: "#43a047", docked: "#43a047", emptying: "#43a047",
  cleaning: "#1e88e5", edgecut: "#1e88e5", returning: "#1e88e5", washing: "#1e88e5",
  paused: "#fb8c00", full: "#fb8c00", empty: "#fb8c00", drying: "#fb8c00",
  rain: "#5c6bc0", error: "#f44336",
  idle: "var(--disabled-text-color, #9e9e9e)", unav: "var(--disabled-text-color, #9e9e9e)", off: "var(--disabled-text-color, #9e9e9e)", away: "#1e88e5",
};

// The floors a vacuum or a mop can be drawn on. A mower has its lawn.
const ROBOT_FLOORS = ["rug", "tiles", "parquet", "smooth"];
// The robot's own controls, called on its entity (#49): Home Assistant names
// them differently for a vacuum and a mower, and each shows when it has
// something to do.
const ROBOT_SERVICES = {
  vacuum: { r_start: "start", r_pause: "pause", r_home: "return_to_base" },
  lawn_mower: { r_start: "start_mowing", r_pause: "pause", r_home: "dock" },
};
const ROBOT_AT_WORK = ["cleaning", "edgecut", "returning"];
const ROBOT_AT_BASE = ["charging", "docked", "emptying", "washing", "drying"];
function robotControls(hass, cfg, robot) {
  const services = ROBOT_SERVICES[domainOf(cfg.state_entity)];
  if (!cfg.robot_controls || !services || !robot || robot.mode === "unav") return [];
  const all = !!cfg.controls_always;
  const m = robot.mode;
  const out = [];
  if (all || !ROBOT_AT_WORK.includes(m) || m === "returning") out.push({ key: "r_start", icon: "mdi:play", label: t(hass, "start") });
  if (all || (ROBOT_AT_WORK.includes(m) && m !== "returning")) out.push({ key: "r_pause", icon: "mdi:pause", label: t(hass, "pause") });
  if (all || (!ROBOT_AT_BASE.includes(m) && m !== "returning")) out.push({ key: "r_home", icon: "mdi:home-import-outline", label: t(hass, "robot_go_home") });
  return out.map((a) => ({ ...a, entity: cfg.state_entity, service: services[a.key] }));
}

function robotWord(v) {
  const s = stripAccents(String(v === undefined || v === null ? "" : v)).trim().toLowerCase().replace(/[\s.:'\u2019-]+/g, "_");
  if (!s || ["unknown", "unavailable"].includes(s) || ROBOT_OK_RE.test(s)) return "";
  const hit = ROBOT_WORDS.find(([, re]) => re.test(s));
  return hit ? hit[0] : "";
}

// A stick vacuum on its wall dock, and a floor washer standing in its
// station, read from the plug the dock is on: above a few watts it charges,
// a little less and it rests charged, almost nothing and it is off its base,
// in use or badly seated. Off is the plug itself switched off. A floor
// washer's integration says more: in use, washing itself, a full dirty
// tank, an empty clean one, a tangled brush.
const ROBOT_STICK_RE = /dyson|balai|stick|cordless|sans.?fil|akkusauger|stielsauger|escoba|scopa|steelstofzuiger|skaftdammsugare|stavstovsuger|pionowy|tycovy/;
const ROBOT_WASHER_RE = /tineco|floor.?one|ifloor|laveur.?de.?sol|floor.?washer|wet.?dry|nass|lavapavimenti|fregona|vloerwasser|myci|\u6d17\u5730/;
const STICK_CHARGE_W = 5;
const STICK_AWAY_W = 1;
const STICK_AT_WORK = /^(in_operation|operating|working|cleaning|running|in_use)$/;
const STICK_SELF_CLEAN = /self.?clean|washing|auto.?clean/;
function stickModeOf(hass, cfg, st, layout) {
  const raw = st ? stripAccents(String(st.state)).trim().toLowerCase() : "";
  const plug = ["switch", "input_boolean"].includes(domainOf(cfg.state_entity));
  if (plug && ["off", "false"].includes(raw)) return "off";
  // The plug as the card's switch, the state being its power or the
  // integration: switched off, the dock is off, not the vacuum away from it.
  for (const id of [cfg.toggle_entity, cfg.plug_entity]) {
    const ps = id && ["switch", "input_boolean"].includes(domainOf(id)) ? stateObj(hass, id) : null;
    if (ps && ["off", "false"].includes(String(ps.state).toLowerCase())) return "off";
  }
  let mode = "";
  if (st && !plug && STICK_SELF_CLEAN.test(raw)) mode = "washing";
  else if (st && !plug && STICK_AT_WORK.test(raw.replace(/\s+/g, "_"))) mode = "away";
  const w = cfg.power_entity ? wattsOf(hass, cfg.power_entity) : null;
  if (!mode && w !== null) {
    const th = parseFloat(cfg.power_on_threshold);
    const away = parseFloat(cfg.away_threshold);
    if (w > (isFinite(th) && th >= 0 ? th : STICK_CHARGE_W)) mode = "charging";
    else if (w <= (isFinite(away) && away >= 0 ? away : STICK_AWAY_W)) mode = "away";
    else mode = "docked";
  }
  if (!mode) {
    if (plug && ["on", "true"].includes(raw)) mode = "docked";
    else if (st && ["idle", "docked", "charging", "standby"].includes(raw)) mode = raw === "charging" ? "charging" : "docked";
    else {
      mode = robotModeOf(hass, cfg, st, layout);
      return mode === "idle" ? "docked" : mode;
    }
  }
  if (["docked", "charging", "washing"].includes(mode)) {
    if (cfg.robot_error_entity && robotRaised(hass, cfg.robot_error_entity, /./)) return "error";
    if (mode !== "washing" && cfg.robot_bin_entity && robotRaised(hass, cfg.robot_bin_entity, /full|plein|voll/)) return "full";
    if (mode !== "washing" && cfg.robot_water_entity) {
      const wa = numericEntity(hass, cfg.robot_water_entity);
      if (wa ? Number(wa.state) <= 5 : robotRaised(hass, cfg.robot_water_entity, /empty|low|short|lack|vide/)) return "empty";
    }
  }
  return mode;
}

function haptic(kind) {
  try {
    if (typeof window !== "undefined" && window.dispatchEvent) window.dispatchEvent(new CustomEvent("haptic", { detail: kind }));
  } catch (e) { /* no window to tell */ }
}

function robotLayoutOf(cfg, st) {
  if (ROBOT_LAYOUTS.includes(cfg.robot_layout)) return cfg.robot_layout;
  if (domainOf(cfg.state_entity) === "lawn_mower") return "mower";
  const name = stripAccents(`${(cfg.state_entity || "").split(".")[1] || ""} ${(st && st.attributes.friendly_name) || ""} ${cfg.name || ""}`.toLowerCase());
  if (ROBOT_POOL_RE.test(name)) return "pool";
  if (ROBOT_MOWER_RE.test(name)) return "mower";
  if (ROBOT_WASHER_RE.test(name)) return "floor_washer";
  if (ROBOT_STICK_RE.test(name)) return "stick";
  if (ROBOT_MOP_RE.test(name)) return "mop";
  return "vacuum";
}

// An entity that raises something: a binary sensor on, a sensor that says
// so. A number is read by whoever asked.
function robotRaised(hass, entityId, re) {
  const s = stateObj(hass, entityId);
  if (!s) return false;
  const v = stripAccents(String(s.state)).trim().toLowerCase();
  if (["unknown", "unavailable", ""].includes(v) || robotOkWord(v)) return false;
  if (["on", "true", "1", "yes"].includes(v)) return true;
  return !!re && re.test(v);
}

// Where the robot is and what it does, from its own state first, then from
// its status, then from the entities that raise something: an error, a full
// bin, an empty tank, rain on a mower's lawn.
function robotModeOf(hass, cfg, st, layout) {
  const raw = st ? String(st.state).trim().toLowerCase() : "";
  if (!st || ["unavailable", "unknown", ""].includes(raw)) {
    if (!cfg.robot_status_entity || !entityUsable(hass, cfg.robot_status_entity)) return "unav";
  }
  let mode = ROBOT_STATES[raw] || robotWord(raw) || "";
  const statusSt = cfg.robot_status_entity ? stateObj(hass, cfg.robot_status_entity) : null;
  const detail = robotWord(statusSt ? statusSt.state : st && st.attributes ? st.attributes.status : "");
  if (!mode) mode = detail || "idle";
  const edge = mode === "edgecut" || detail === "edgecut";
  if (mode === "edgecut") mode = "cleaning";
  if (detail === "error") mode = "error";
  else if (mode !== "error") {
    if (["emptying", "washing", "drying"].includes(detail)) mode = detail;
    else if (detail === "returning" && ["cleaning", "idle"].includes(mode)) mode = "returning";
    else if (edge && mode === "cleaning" && layout === "mower") mode = "edgecut";
    else if (["full", "empty", "rain"].includes(detail) && ["charging", "idle", "paused"].includes(mode)) mode = detail;
  }
  if (mode === "rain" && layout !== "mower") mode = "charging";
  if (mode !== "error" && cfg.robot_error_entity && robotRaised(hass, cfg.robot_error_entity, /./)) mode = "error";
  const atRest = ["charging", "idle", "paused"].includes(mode);
  if (atRest && layout === "mower" && cfg.robot_rain_entity && robotRaised(hass, cfg.robot_rain_entity, /rain|pluie|regen|delay/)) mode = "rain";
  if (atRest && cfg.robot_bin_entity && robotRaised(hass, cfg.robot_bin_entity, /full|plein|voll/)) mode = "full";
  if (atRest && cfg.robot_water_entity) {
    const w = numericEntity(hass, cfg.robot_water_entity);
    const low = w ? Number(w.state) <= 5 : robotRaised(hass, cfg.robot_water_entity, /empty|low|short|lack|vide/);
    if (low) mode = "empty";
  }
  return mode;
}

// The tank's level, when a number says it.
function robotWaterPct(hass, cfg) {
  const w = cfg.robot_water_entity ? numericEntity(hass, cfg.robot_water_entity) : null;
  return w ? Math.max(0, Math.min(100, Number(w.state))) : null;
}

// A station tank, clean or dirty water (#69): its level when a number says
// it, or whether its sensor is raised (the clean one empty, the dirty one
// full). Null when nothing says it.
function robotTank(hass, id) {
  if (!id) return null;
  const n = numericEntity(hass, id);
  if (n) return { pct: Math.max(0, Math.min(100, Number(n.state))), raised: null };
  const s = stateObj(hass, id);
  if (!s || ["unknown", "unavailable"].includes(String(s.state))) return null;
  return { pct: null, raised: robotRaised(hass, id, /empty|low|short|lack|vide|leer|full|plein|voll/) };
}

function robotBattery(hass, cfg, st) {
  const b = cfg.battery_entity ? numericState(hass, cfg.battery_entity) : null;
  if (b !== null) return b;
  const a = st && st.attributes ? Number(st.attributes.battery_level) : NaN;
  return Number.isFinite(a) ? a : null;
}

function robotBatteryIcon(pct, charging) {
  const step = Math.max(1, Math.min(10, Math.round(pct / 10)));
  if (charging) return step >= 10 ? "mdi:battery-charging-100" : `mdi:battery-charging-${step * 10}`;
  return step >= 10 ? "mdi:battery" : `mdi:battery-${step * 10}`;
}

// A pool pump: a sand filter with its multiport valve and its gauge, the pump
// and its strainer, and the pool the water goes back to. It filters or it
// rests, and sometimes it backwashes the filter into the drain or runs to
// keep the pipes from freezing. A chlorine dosing pump is an option: its tank
// and its long tube only show when one is given.
const POOL_ONLY_FIELDS = ["water_temperature_entity", "air_temperature_entity", "ph_entity", "redox_entity",
  "filtration_time_entity", "pressure_entity", "pressure_alert", "pool_mode_entity", "chlorine_pump_entity",
  "chlorine_level_entity", "backwash_entity", "frost_entity", "pool_alert_entity"];
const POOL_NAME_RE = /pool.?pump|swimming.?pool|(^|[^a-z])pool([^a-z]|$)|piscine|pompe.?(de.?)?piscine|oklyn|poolstation|(^|[^a-z])pisc|schwimmbad|poolpumpe|filterpumpe|bomba.?de.?(piscina|filtra)|piscina|pompa.?(piscina|filtraz)|zwembad|zwempomp|bassengpump|poolpump|pompa.?basen|basen|baz(e|\u00e9)n|\u6cf3\u6c60|\u0431\u0430\u0441\u0441\u0435\u0439\u043d/;
const POOL_OFF_STATES = ["off", "false", "0", "stopped", "stop", "idle", "standby", "closed"];
// What a pump's state or status says, first match wins.
const POOL_WORDS = [
  ["error", /error|fault|alarm|defaut|failure|blocked|dry.?run|overload|panne|fehler/],
  ["backwash", /backwash|back.?wash|contre.?lavage|ruckspul|r\u00fcckspul|contralavado|controlavaggio|terugspoel/],
  ["frost", /frost|freez|gel|antigel|hors.?gel|frostschutz|antihielo|antigelo|vorst/],
  ["off", /^(off|stop(ped)?|idle|standby|arret|aus|apagad|spento|uit|false|0)$/],
  ["running", /^(on|true|1|running|run|filtering|filtration|filtrage|marche|en.?marche|ein|an|encendid|acceso|aan|boost|eco|manual|manuel)$/],
];
const POOL_LABELS = { off: "ac_off", running: "pool_filtering", chlorinating: "pool_chlorinating", backwash: "pool_backwash",
  frost: "pool_frost", error: "error", unav: "ev_offline" };
const POOL_COLORS = {
  off: "var(--disabled-text-color, #9e9e9e)", running: "#1e88e5", chlorinating: "#7cb342", backwash: "#8d6e63",
  frost: "#03a9f4", error: "#f44336", unav: "var(--disabled-text-color, #9e9e9e)",
};
// A pump draws hundreds of watts: below this one it is off.
const POOL_POWER_W = 50;
// The gauge reads up to 2.5 bar; a filter that needs washing is past 1.5.
const POOL_GAUGE_MAX_BAR = 2.5;
const POOL_PRESSURE_ALERT = 1.8;

function poolWord(v) {
  const s = stripAccents(String(v === undefined || v === null ? "" : v)).trim().toLowerCase();
  if (!s || ["unknown", "unavailable"].includes(s)) return "";
  const hit = POOL_WORDS.find(([, re]) => re.test(s));
  return hit ? hit[0] : "";
}

// An entity that says yes: on, true, a word that says so, a number above 0.
function poolOn(hass, entityId) {
  const s = stateObj(hass, entityId);
  if (!s) return false;
  const v = String(s.state).trim().toLowerCase();
  if (["on", "true", "1", "yes", "open", "running", "active"].includes(v)) return true;
  const n = Number(v);
  return Number.isFinite(n) && n > 0;
}

// What the pump does, from its own state, then from what raises something.
function poolModeOf(hass, cfg, st, watts) {
  const raw = st ? String(st.state).trim().toLowerCase() : "";
  let mode = "";
  const plug = ["switch", "input_boolean"].includes(domainOf(cfg.state_entity));
  if (st && plug && watts !== null && !["unavailable", "unknown", ""].includes(raw)) {
    // A pump on a plug: the switch says it may run, the meter that it does.
    const th = parseFloat(cfg.power_on_threshold);
    mode = raw === "off" ? "off" : watts > (isFinite(th) ? th : POOL_POWER_W) ? "running" : "off";
  } else if (st && !["unavailable", "unknown", ""].includes(raw)) {
    mode = poolWord(raw);
    // A pump's mode (auto, a schedule) does not say whether it runs: its
    // meter does, when there is one.
    const isMode = ["select", "input_select"].includes(domainOf(cfg.state_entity));
    if (!mode && isMode) {
      const th = parseFloat(cfg.power_on_threshold);
      mode = watts !== null && watts > (isFinite(th) ? th : POOL_POWER_W) ? "running" : "off";
    }
    if (!mode) mode = POOL_OFF_STATES.includes(raw) ? "off" : "running";
  } else if (watts !== null) {
    const th = parseFloat(cfg.power_on_threshold);
    mode = watts > (isFinite(th) ? th : POOL_POWER_W) ? "running" : "off";
  } else return "unav";
  if (mode !== "error" && cfg.pool_alert_entity && poolOn(hass, cfg.pool_alert_entity)) mode = "error";
  if (mode !== "error" && cfg.pressure_entity) {
    const p = numericState(hass, cfg.pressure_entity);
    const lim = parseFloat(cfg.pressure_alert);
    if (p !== null && mode !== "off" && p >= (isFinite(lim) && lim > 0 ? lim : POOL_PRESSURE_ALERT)) mode = "error";
  }
  if (mode !== "error" && cfg.backwash_entity && poolOn(hass, cfg.backwash_entity)) mode = "backwash";
  if (["off", "running"].includes(mode) && cfg.frost_entity && poolOn(hass, cfg.frost_entity)) mode = "frost";
  return mode;
}

// Solar panels: on their frame on the ground or on the slope of a roof,
// with their inverter. The sun shines, a few clouds pass, or the moon is up;
// in production a gleam runs over the cells and the energy down the cable.
const SOLAR_ONLY_FIELDS = ["solar_layout", "energy_today_entity", "peak_power", "solar_alert_entity"];
const SOLAR_NAME_RE = /solar|photovolt|(^|[^a-z])pv([^a-z]|$)|panneaux?.?solaires?|powerstream|hoymiles|enphase|apsystems|fronius|solaredge|growatt|solax|wechselrichter|zonnepane|fotovolt|fotowolt|solcell|solpanel|\u592a\u9633\u80fd|\u0441\u043e\u043b\u043d\u0435\u0447/;
const SOLAR_LAYOUTS = ["ground", "roof"];
// What an inverter says when it is in trouble.
const ENERGY_ERROR_RE = /error|fault|alarm|defaut|panne|fehler|failure|storung|st\u00f6rung|guasto|averia|fout/;
// Below this share of the panels' peak power, the sun is weak.
const SOLAR_LOW_SHARE = 0.15;
const SOLAR_LOW_W = 100;
const SOLAR_LABELS = { day: "solar_producing", low: "solar_low", night: "solar_night", error: "error", unav: "ev_offline" };
const SOLAR_COLORS = { day: "#f9a825", low: "#9e9d24", night: "#5c6bc0", error: "#f44336", unav: "var(--disabled-text-color, #9e9e9e)" };

// A home battery: a block on the wall with its gauge, or a portable station
// with its sockets. It charges in green, discharges in orange, and a dashed
// line marks the reserve it keeps for a power cut.
const BATTERY_ONLY_FIELDS = ["battery_layout", "charge_power_entity", "reserve_entity", "charge_limit_entity", "battery_capacity",
  "power_inverted", "battery_alert_entity"];
const BATTERY_NAME_RE = /home.?battery|house.?battery|powerwall|delta.?(pro|max|2)|ecoflow|bluetti|anker.?solix|solix|jackery|zendure|marstek|sonnen|power.?station|station.?(d.?)?energie|batterie.?(domestique|maison|murale|solaire)|hausbatterie|stromspeicher|heimspeicher|batteriespeicher|thuisbatterij|bateria.?domestica|batteria.?domestica|hemmabatteri|hjemmebatteri|magazyn.?energii|domaci.?baterie|\u5bb6\u7528\u7535\u6c60|\u0434\u043e\u043c\u0430\u0448\u043d.?\u0430\u043a\u043a\u0443\u043c/;
const BATTERY_STATION_RE = /delta|ecoflow|bluetti|jackery|anker|solix|zendure|river|power.?station|station/;
const BATTERY_LAYOUTS = ["wall", "station"];
// Under this power either way, the battery rests: a station feeding its own
// screen or a router through draws a few watts.
const BATTERY_IDLE_W = 10;
const BATTERY_LOW_PCT = 10;
const BATTERY_LABELS = { charging: "ev_charging", discharging: "ev_discharging", idle: "bat_idle", full: "bat_full", low: "bat_low",
  error: "error", unav: "ev_offline" };
const BATTERY_COLORS = { charging: "#43a047", discharging: "#fb8c00", idle: "var(--disabled-text-color, #9e9e9e)",
  full: "var(--success-color, #43a047)", low: "#f44336", error: "#f44336", unav: "var(--disabled-text-color, #9e9e9e)" };

// A power in watts, in kilowatts from a thousand, signed when asked.
function energyPowerText(hass, w, signed) {
  const a = Math.abs(w);
  const num = a >= 1000 ? `${netNumber(hass, a / 1000, 2)}\u00a0kW` : `${Math.round(a)}\u00a0W`;
  if (!signed || Math.round(a) === 0) return num;
  return `${w < 0 ? "\u2212" : "+"}${num}`;
}

// What the panels do: the inverter's word for an error first, then the
// power against the sun.
function solarReadOf(hass, cfg, st) {
  const powerId = cfg.power_entity || (numericEntity(hass, cfg.state_entity) ? cfg.state_entity : "");
  const watts = powerId ? wattsOf(hass, powerId) : null;
  const raw = st ? stripAccents(String(st.state)).trim().toLowerCase() : "";
  const stOk = !!st && !["unavailable", "unknown", ""].includes(raw);
  const sun = stateObj(hass, "sun.sun");
  const sunUp = sun ? sun.state === "above_horizon" : null;
  let mode;
  if (watts === null && !stOk) mode = "unav";
  else if ((stOk && ENERGY_ERROR_RE.test(raw)) || (cfg.solar_alert_entity && poolOn(hass, cfg.solar_alert_entity))) mode = "error";
  else {
    const w = watts === null ? 0 : watts;
    const peak = parseFloat(cfg.peak_power);
    const low = isFinite(peak) && peak > 0 ? peak * SOLAR_LOW_SHARE : SOLAR_LOW_W;
    if (w > low) mode = "day";
    else if (sunUp === false) mode = "night";
    else if (w > 2 || sunUp === true) mode = "low";
    else mode = "night";
  }
  const sky = ["day", "low", "night"].includes(mode) ? mode : sunUp === false ? "night" : "day";
  return { mode, sky, watts, powerId };
}

function batteryLayoutOf(cfg, st) {
  if (BATTERY_LAYOUTS.includes(cfg.battery_layout)) return cfg.battery_layout;
  const hay = stripAccents(`${cfg.name || ""} ${cfg.state_entity || ""} ${cfg.battery_entity || ""} ${(st && st.attributes.friendly_name) || ""}`.toLowerCase());
  return BATTERY_STATION_RE.test(hay) ? "station" : "wall";
}

// What the battery does: its level, the power going in or out, its word for
// an error, and whether it has reached the top it is allowed.
function batteryReadOf(hass, cfg, st) {
  const levelId = cfg.battery_entity || (numericEntity(hass, cfg.state_entity) ? cfg.state_entity : "");
  const level = levelId ? numericState(hass, levelId) : null;
  let net = null;
  let powerId = "";
  const cin = cfg.charge_power_entity ? wattsOf(hass, cfg.charge_power_entity) : null;
  const cout = cfg.discharge_power_entity ? wattsOf(hass, cfg.discharge_power_entity) : null;
  if (cin !== null || cout !== null) {
    net = (cin || 0) - Math.abs(cout || 0);
    powerId = net < 0 ? cfg.discharge_power_entity || cfg.charge_power_entity : cfg.charge_power_entity || cfg.discharge_power_entity;
  } else if (cfg.power_entity) {
    const p = wattsOf(hass, cfg.power_entity);
    if (p !== null) {
      net = cfg.power_inverted ? -p : p;
      powerId = cfg.power_entity;
    }
  }
  const raw = st ? stripAccents(String(st.state)).trim().toLowerCase() : "";
  const stOk = !!st && !["unavailable", "unknown", ""].includes(raw);
  const limit = cfg.charge_limit_entity ? numericState(hass, cfg.charge_limit_entity) : null;
  const top = limit !== null && limit > 0 && limit <= 100 ? limit : 100;
  const reserve = cfg.reserve_entity ? numericState(hass, cfg.reserve_entity) : null;
  let mode;
  if (level === null && net === null && !stOk) mode = "unav";
  else if ((stOk && ENERGY_ERROR_RE.test(raw)) || (cfg.battery_alert_entity && poolOn(hass, cfg.battery_alert_entity))) mode = "error";
  else {
    const th = parseFloat(cfg.power_on_threshold);
    const idleW = isFinite(th) && th >= 0 ? th : BATTERY_IDLE_W;
    if (net !== null) mode = net > idleW ? "charging" : net < -idleW ? "discharging" : "idle";
    else if (stOk && /dis.?charg|decharg|entlad|descarg|scaric|ontlad|urladd|utlad|aflad|rozlad|vybij/.test(raw)) mode = "discharging";
    else if (stOk && /charg|laden|ladt|cargand|carica|carregand|opladen|laddar|lader|ladowan|nabij/.test(raw)) mode = "charging";
    else mode = "idle";
    if (mode === "idle" && level !== null && level >= top - 1) mode = "full";
  }
  const low = level !== null && !["unav", "error"].includes(mode) && level <= BATTERY_LOW_PCT;
  return { mode, level, net, powerId, top, reserve, low, levelId };
}
// An essential oil diffuser: its mist from a switch, a fan (Tuya, a low
// speed is its intermittent mode), a select (Meross: off, eco, on) or a
// humidifier entity; its light from a light entity, coloured; an empty tank
// from a sensor.
const DIFFUSER_ONLY_FIELDS = ["diffuser_layout", "tank_empty_entity"];
const DIFFUSER_LAYOUTS = ["drop", "cone", "stone", "flame", "nebulizer"];
const DIFFUSER_NAME_RE = /diffus(er|eur|or|ore)|aroma.?(diffus|therap)|duftspender|essential.?oil|huiles?.?essentielles?|doftspridare|duftspreder/;
const DIFFUSER_LABELS = { mist: "dif_mist", low: "dif_low", inter: "dif_inter", empty: "dif_empty", off: "ac_off", unav: "ev_offline" };
const DIFFUSER_COLORS = { mist: "#26a69a", low: "#26a69a", inter: "#26a69a", empty: "#f44336", off: "var(--disabled-text-color, #9e9e9e)", unav: "var(--disabled-text-color, #9e9e9e)" };
// Meross's eco mode mists less, it does not pause (#53): a lower mist and a
// mist that comes and goes are two different things.
const DIFFUSER_INTER_RE = /interm|interval|pulse|cycle/;
const DIFFUSER_LOW_RE = /eco|low|small|gentle|weak|sleep|light|^1$|level_?1/;
function diffuserLightOf(hass, cfg) {
  const lst = cfg.light_entity ? stateObj(hass, cfg.light_entity) : null;
  if (!lst || !["on", "true"].includes(String(lst.state).toLowerCase())) return { lit: false, color: "" };
  const a = lst.attributes || {};
  if (Array.isArray(a.rgb_color) && a.rgb_color.length === 3) return { lit: true, color: `rgb(${a.rgb_color.map((v) => Math.round(Number(v) || 0)).join(",")})` };
  if (Array.isArray(a.hs_color) && a.hs_color.length === 2) return { lit: true, color: `hsl(${Math.round(a.hs_color[0])}, ${Math.round(a.hs_color[1])}%, 60%)` };
  return { lit: true, color: "#ffd180" };
}
function diffuserReadOf(hass, cfg, st, norm, powerDerived) {
  const raw = st ? stripAccents(String(st.state)).trim().toLowerCase() : "";
  const a = (st && st.attributes) || {};
  const dom = domainOf(cfg.state_entity);
  const tank = cfg.tank_empty_entity ? stateObj(hass, cfg.tank_empty_entity) : null;
  const tankRaw = tank ? String(tank.state).toLowerCase() : "";
  const tankNum = tank ? parseFloat(tank.state) : NaN;
  const empty = !!tank && (["on", "true", "empty", "low", "lack", "lack_water", "no_water"].includes(tankRaw) || (isFinite(tankNum) && tankNum <= 5));
  let mode;
  if (!powerDerived && (!st || ["unavailable", "unknown", ""].includes(raw))) mode = "unav";
  else {
    const on = powerDerived ? isActiveState(norm)
      : dom === "select" || dom === "input_select" ? !/^(off|stop|0|none|standby|close|closed)$/.test(raw)
      : ["on", "true"].includes(raw) || isActiveState(norm);
    const pct = numberOrNull(a.percentage);
    const word = (dom === "select" || dom === "input_select") ? raw : String(a.preset_mode || a.mode || "").toLowerCase();
    const inter = DIFFUSER_INTER_RE.test(word) || (!(dom === "select" || dom === "input_select") && pct !== null && pct > 0 && pct <= 50 && !DIFFUSER_LOW_RE.test(word));
    const low = !inter && DIFFUSER_LOW_RE.test(word);
    mode = empty ? "empty" : !on ? "off" : inter ? "inter" : low ? "low" : "mist";
  }
  const light = diffuserLightOf(hass, cfg);
  return { mode, lit: mode !== "unav" && light.lit, lightColor: light.color };
}
function diffuserLayoutOf(cfg, st) {
  if (DIFFUSER_LAYOUTS.includes(cfg.diffuser_layout)) return cfg.diffuser_layout;
  const a = (st && st.attributes) || {};
  const hay = stripAccents(`${cfg.state_entity || ""} ${cfg.name || ""} ${a.friendly_name || ""}`).toLowerCase();
  if (/nebuli|waterless|sans.?eau/.test(hay)) return "nebulizer";
  if (/flame|flamme|flamm|llama|fiamma/.test(hay)) return "flame";
  if (/stone|galet|pebble|vitruvi|govee/.test(hay)) return "stone";
  if (/cone|cono|kegel|muji|ceramic|ceramique/.test(hay)) return "cone";
  return "drop";
}
// The cycle of a mist select: tapping the button picks the next option.
function diffuserControls(hass, cfg) {
  const dom = domainOf(cfg.state_entity);
  const st = stateObj(hass, cfg.state_entity);
  if (!st) return [];
  if ((dom === "select" || dom === "input_select") && Array.isArray(st.attributes.options) && st.attributes.options.length > 1) {
    const opts = st.attributes.options;
    const next = opts[(opts.indexOf(st.state) + 1) % opts.length];
    return [{ key: "dif_mode", entity: cfg.state_entity, icon: "mdi:weather-fog", label: t(hass, "dif_mode"), option: next }];
  }
  if (!cfg.toggle_entity && ["fan", "switch", "humidifier", "input_boolean"].includes(dom)) {
    return [{ key: "toggle", entity: cfg.state_entity, icon: "mdi:power", label: t(hass, "toggle"), on: String(st.state).toLowerCase() === "on" }];
  }
  return [];
}

// A lamp's switch, unless the card has a power switch of its own.
function lampControls(hass, cfg) {
  const st = stateObj(hass, cfg.state_entity);
  const out = [];
  // Its timer as a pill that shows the duration chosen and opens the list.
  const timer = lampTimerOptions(hass, cfg);
  if (timer) {
    out.push({ key: "lamp_timer", entity: timer.entity, icon: "mdi:timer-cog-outline", label: t(hass, "lamp_timer"), menu: true,
      text: screenSourceLabel(hass, stateObj(hass, timer.entity), timer.current) });
  }
  // show_toggle: false leaves the switching to the drawing (HACF #127).
  if (!st || cfg.toggle_entity || cfg.show_toggle === false || !["light", "switch", "input_boolean"].includes(domainOf(cfg.state_entity))) return out;
  return out.concat([{ key: "toggle", entity: cfg.state_entity, icon: "mdi:lightbulb", label: t(hass, "toggle"), on: String(st.state).toLowerCase() === "on" }]);
}

// A screen's input, picked from a menu like a ventilation unit's mode (#60):
// the options of a select, or the sources a media player offers.
function screenSourceOptions(hass, cfg) {
  const id = cfg.source_entity;
  const st = id ? stateObj(hass, id) : null;
  if (!st || ["unavailable", "unknown"].includes(String(st.state).toLowerCase())) return null;
  const dom = domainOf(id);
  const a = st.attributes || {};
  if ((dom === "select" || dom === "input_select") && Array.isArray(a.options) && a.options.length > 1) {
    return { entity: id, current: st.state, options: a.options.filter((o) => String(o).trim() !== ""), dom, kind: "source" };
  }
  if (dom === "media_player" && Array.isArray(a.source_list) && a.source_list.length > 1) {
    return { entity: id, current: a.source, options: a.source_list, dom, kind: "source" };
  }
  return null;
}
// A source in words: a select's own translation, otherwise its name as given.
function screenSourceLabel(hass, st, option) {
  if (st && ["select", "input_select"].includes(domainOf(st.entity_id)) && typeof hass.formatEntityState === "function") {
    try {
      const own = hass.formatEntityState(st, option);
      if (own) return own;
    } catch (e) { /* its name, then */ }
  }
  return String(option);
}
// A lamp's timer (HACF #125): a list of durations, picked from the card.
function lampTimerOptions(hass, cfg) {
  const id = cfg.timer_entity;
  const st = id ? stateObj(hass, id) : null;
  const a = (st && st.attributes) || {};
  if (!st || !["select", "input_select"].includes(domainOf(id)) || !Array.isArray(a.options) || a.options.length < 2) return null;
  return { entity: id, current: st.state, options: a.options.filter((o) => String(o).trim() !== ""), dom: domainOf(id), kind: "timer" };
}
// illustration_tap_action: a tap on the drawing alone, given as
// Home Assistant's action or as its name alone (toggle, more-info, none).
// Unset or "default", the drawing does what the card does.
function illustrationTapOf(cfg) {
  const a = cfg.illustration_tap_action;
  if (!a || a === "default") return null;
  return typeof a === "string" ? { action: a } : typeof a === "object" && a.action && a.action !== "default" ? a : null;
}
// The menu a card opens from its buttons, if any.
function cardMenuOf(hass, cfg, cap) {
  if (cap && cap.screen) return screenSourceOptions(hass, cfg);
  if (cap && cap.lamp) return lampTimerOptions(hass, cfg);
  if (cap && cap.hrv) return hrvModeOptions(hass, cfg);
  return null;
}
function cardMenuLabel(hass, menu, option) {
  const st = stateObj(hass, menu.entity);
  if (menu.kind === "speed") return `${t(hass, "hrv_speed")} ${option}`;
  return menu.kind === "source" || menu.kind === "timer" ? screenSourceLabel(hass, st, option) : hrvModeLabel(hass, st, option);
}
function screenControls(hass, cfg) {
  const menu = screenSourceOptions(hass, cfg);
  const out = menu ? [{ key: "screen_source", entity: menu.entity, icon: "mdi:video-input-hdmi", label: t(hass, "screen_source"), menu: true }] : [];
  // A wall tablet's own buttons (#62): its screen, its screensaver, and a
  // reload of its page and a restart of its app, each only when there is
  // something to drive it.
  if (screenIsTablet(cfg, stateObj(hass, cfg.state_entity))) {
    const sw = (id) => ["switch", "input_boolean", "light"].includes(domainOf(id || ""));
    const on = (id) => { const st = stateObj(hass, id); return !!st && String(st.state).toLowerCase() === "on"; };
    if (!cfg.toggle_entity && sw(cfg.state_entity)) out.push({ key: "tab_screen", entity: cfg.state_entity, icon: "mdi:power", label: t(hass, "tab_screen"), on: on(cfg.state_entity) });
    if (sw(cfg.screensaver_entity)) out.push({ key: "tab_saver", entity: cfg.screensaver_entity, icon: "mdi:weather-night", label: t(hass, "screen_saver"), on: on(cfg.screensaver_entity) });
    if (cfg.reload_entity) out.push({ key: "tab_reload", entity: cfg.reload_entity, icon: "mdi:refresh", label: t(hass, "tab_reload") });
    if (cfg.restart_entity) out.push({ key: "tab_restart", entity: cfg.restart_entity, icon: "mdi:restart", label: t(hass, "tab_restart") });
  }
  // A computer's tower on a plug of its own has a switch of its own (HACF).
  if (cfg.tower_entity && ["switch", "input_boolean"].includes(domainOf(cfg.tower_entity))
    && screenLayoutOf(cfg, stateObj(hass, cfg.state_entity)) === "computer") {
    const ts = stateObj(hass, cfg.tower_entity);
    out.push({ key: "tower", entity: cfg.tower_entity, icon: "mdi:desktop-tower", label: t(hass, "tower_toggle"), on: !!ts && String(ts.state).toLowerCase() === "on" });
  }
  return out;
}

// A ventilation unit's controls: its mode, picked from a menu in the card
// (#54), and its humidity control switch.
function hrvControls(hass, cfg) {
  const out = [];
  const menu = hrvModeOptions(hass, cfg);
  if (menu) out.push(menu.kind === "speed" ? { key: "hrv_speed", entity: menu.entity, icon: "mdi:fan", label: t(hass, "hrv_speed"), menu: true }
    : { key: "hrv_mode", entity: menu.entity, icon: "mdi:tune-variant", label: t(hass, "hrv_mode"), menu: true });
  const hst = cfg.humidity_control_entity ? stateObj(hass, cfg.humidity_control_entity) : null;
  if (hst) out.push({ key: "hrv_humidity", entity: cfg.humidity_control_entity, icon: "mdi:water-percent", label: t(hass, "hrv_humidity"), on: ["on", "true"].includes(String(hst.state).toLowerCase()) });
  return out;
}

