const CARD_VERSION = "0.0.1";

console.info(
  "%c HA-APPLIANCE-CARD %c v" + CARD_VERSION + " ",
  "color:white;background:#00838f;font-weight:700;",
  "color:#00838f;background:white;font-weight:700;"
);

// ---------------------------------------------------------------------------
// i18n
// ---------------------------------------------------------------------------

const T = {
  en: {
    idle: "Idle", running: "Running", paused: "Paused", done: "Finished",
    delayed: "Delayed start", error: "Error", unknown: "Unknown",
    program: "Program", remaining: "remaining", ready_at: "ready at",
    door_open: "Door open", door_closed: "Door closed", alerts: "Alerts",
    connected: "Connected", disconnected: "Disconnected",
    start: "Start", pause: "Pause", resume: "Resume", stop: "Stop",
    name: "Name", icon: "Icon", entity: "Entity",
    main_settings: "Main entities", display_settings: "Display",
    action_settings: "Controls",
    compact: "Compact mode (hide icon)",
    appliance_type: "Appliance type",
    type_auto: "Auto-detect", type_washer: "Washer", type_dryer: "Dryer", type_dishwasher: "Dishwasher",
    state_entity: "State entity (required)",
    program_entity: "Program entity",
    program_format: "Program name format",
    program_format_raw: "Raw", program_format_clean: "Cleaned up",
    remaining_time_entity: "Remaining time entity",
    remaining_time_unit: "Remaining time unit",
    unit_auto: "Auto-detect", unit_seconds: "Seconds", unit_minutes: "Minutes",
    progress_entity: "Progress % entity (optional override)",
    door_entity: "Door sensor entity",
    door_open_state: "\"Open\" state value",
    alerts_entity: "Alerts entity (attributes-style)",
    info_entities: "Extra info entities (comma-separated entity IDs)",
    connectivity_entity: "Connectivity entity",
    connectivity_connected_state: "\"Connected\" state value",
    start_entity: "Start button entity",
    pause_entity: "Pause button entity",
    resume_entity: "Resume button entity",
    stop_entity: "Stop / reset button entity",
    section_program: "Program", section_remaining: "Remaining time",
    section_progress: "Progress % (override)", section_door: "Door sensor",
    section_alerts: "Alerts", section_connectivity: "Connectivity",
    section_info: "Extra info entities (up to 3)",
    section_start: "Start button", section_pause: "Pause button",
    section_resume: "Resume button", section_stop: "Stop / reset button",
    picker_icon: "Icon (optional)",
  },
  fr: {
    idle: "En veille", running: "En cours", paused: "En pause", done: "Terminé",
    delayed: "Départ différé", error: "Erreur", unknown: "Inconnu",
    program: "Programme", remaining: "restant", ready_at: "fin ~",
    door_open: "Porte ouverte", door_closed: "Porte fermée", alerts: "Alertes",
    connected: "Connecté", disconnected: "Déconnecté",
    start: "Démarrer", pause: "Pause", resume: "Reprendre", stop: "Stop",
    name: "Nom", icon: "Icône", entity: "Entité",
    main_settings: "Entités principales", display_settings: "Affichage",
    action_settings: "Commandes",
    compact: "Mode compact (masquer l'icône)",
    appliance_type: "Type d'appareil",
    type_auto: "Détection auto", type_washer: "Lave-linge", type_dryer: "Sèche-linge", type_dishwasher: "Lave-vaisselle",
    state_entity: "Entité d'état (obligatoire)",
    program_entity: "Entité programme",
    program_format: "Format du nom de programme",
    program_format_raw: "Brut", program_format_clean: "Nettoyé",
    remaining_time_entity: "Entité temps restant",
    remaining_time_unit: "Unité du temps restant",
    unit_auto: "Détection auto", unit_seconds: "Secondes", unit_minutes: "Minutes",
    progress_entity: "Entité progression % (remplace l'estimation)",
    door_entity: "Entité capteur de porte",
    door_open_state: "Valeur d'état \"ouverte\"",
    alerts_entity: "Entité alertes (façon attributs)",
    info_entities: "Entités d'info complémentaires (IDs séparés par virgule)",
    connectivity_entity: "Entité de connectivité",
    connectivity_connected_state: "Valeur d'état \"connecté\"",
    start_entity: "Entité bouton Démarrer",
    pause_entity: "Entité bouton Pause",
    resume_entity: "Entité bouton Reprendre",
    stop_entity: "Entité bouton Stop / Reset",
    section_program: "Programme", section_remaining: "Temps restant",
    section_progress: "Progression % (remplace l'estimation)", section_door: "Capteur de porte",
    section_alerts: "Alertes", section_connectivity: "Connectivité",
    section_info: "Entités d'info complémentaires (jusqu'à 3)",
    section_start: "Bouton Démarrer", section_pause: "Bouton Pause",
    section_resume: "Bouton Reprendre", section_stop: "Bouton Stop / Reset",
    picker_icon: "Icône (optionnel)",
  },
};

function lang(hass) {
  const l = String((hass && ((hass.locale && hass.locale.language) || hass.language)) || "en")
    .toLowerCase().split("-")[0];
  return T[l] ? l : "en";
}
function t(hass, key) {
  const l = lang(hass);
  return (T[l] && T[l][key]) || T.en[key] || key;
}

// ---------------------------------------------------------------------------
// State normalization — works across brands/integrations
// ---------------------------------------------------------------------------

const STATE_KEYWORDS = {
  idle: ["idle", "off", "standby", "veille", "ready_to_start", "ready to start"],
  running: ["run", "wash", "spin", "dry", "rinsing", "heating", "cours", "on", "active"],
  paused: ["pause", "hold", "suspended"],
  done: ["end", "done", "finish", "complete", "termin"],
  delayed: ["delay", "differ", "scheduled", "programmed"],
  error: ["error", "fault", "alarm", "erreur"],
};

function normalizeState(raw, stateMap) {
  if (raw === undefined || raw === null) return "unknown";
  const s = String(raw).trim();
  if (["unknown", "unavailable", "none", ""].includes(s.toLowerCase())) return "unknown";
  if (stateMap && Object.prototype.hasOwnProperty.call(stateMap, s)) return stateMap[s];
  const low = s.toLowerCase();
  for (const norm of Object.keys(STATE_KEYWORDS)) {
    if (STATE_KEYWORDS[norm].some((kw) => low.includes(kw))) return norm;
  }
  return "unknown";
}

const STATE_COLORS = {
  idle: "var(--disabled-text-color, #9e9e9e)",
  running: "var(--info-color, #2196f3)",
  paused: "var(--warning-color, #ff9800)",
  done: "var(--success-color, #4caf50)",
  delayed: "#9c27b0",
  error: "var(--error-color, #f44336)",
  unknown: "var(--disabled-text-color, #9e9e9e)",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function stateObj(hass, entityId) {
  return entityId && hass.states[entityId] ? hass.states[entityId] : null;
}

function numericState(hass, entityId) {
  const st = stateObj(hass, entityId);
  if (!st) return null;
  const v = parseFloat(st.state);
  return Number.isFinite(v) ? v : null;
}

function remainingSeconds(hass, entityId, unitCfg) {
  const st = stateObj(hass, entityId);
  if (!st) return null;
  const v = parseFloat(st.state);
  if (!Number.isFinite(v) || v < 0) return null;
  let unit = unitCfg || "auto";
  if (unit === "auto") {
    const u = (st.attributes.unit_of_measurement || "").toLowerCase();
    unit = u.startsWith("min") ? "minutes" : "seconds";
  }
  return unit === "minutes" ? v * 60 : v;
}

function formatDuration(totalSeconds, hass) {
  const mins = Math.round(totalSeconds / 60);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h > 0) return `${h}h${String(m).padStart(2, "0")}`;
  return `${m} min`;
}

function formatEta(totalSeconds) {
  const eta = new Date(Date.now() + totalSeconds * 1000);
  return eta.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function cleanProgramName(raw) {
  if (!raw) return raw;
  // Many integrations report "<Category> Pr <ProgramName>" — keep the meaningful part.
  const parts = String(raw).split(/\s+Pr\s+/i);
  const name = parts.length > 1 ? parts[1] : parts[0];
  return name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .trim();
}

function activeAlerts(hass, entityId) {
  const st = stateObj(hass, entityId);
  if (!st) return [];
  const active = [];
  for (const [key, val] of Object.entries(st.attributes)) {
    if (["icon", "friendly_name", "device_class", "unit_of_measurement"].includes(key)) continue;
    const v = String(val).toLowerCase();
    if (v === "on" || v === "true" || v === "1" || v === "active") active.push(key);
  }
  return active;
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
  program_entity: /program/i,
  remaining_time_entity: /time.?to.?end|remaining|finish.?in/i,
  door_entity: /door/i,
  alerts_entity: /alert/i,
  connectivity_entity: /connectiv/i,
  start_entity: /start/i,
  pause_entity: /pause/i,
  resume_entity: /resume/i,
  stop_entity: /stop|reset/i,
};

const INFO_PATTERNS = [
  { re: /temperature/i, icon: "mdi:thermometer" },
  { re: /spin/i, icon: "mdi:rotate-3d-variant" },
  { re: /steam/i, icon: "mdi:weather-fog" },
];

function autoSuggest(hass, cfg) {
  if (!cfg.state_entity || !hass.states[cfg.state_entity]) return {};
  const siblings = siblingEntityIds(hass, cfg.state_entity).filter((id) => id !== cfg.state_entity);
  const patch = {};
  for (const [field, re] of Object.entries(AUTO_PATTERNS)) {
    if (cfg[field]) continue;
    const match = siblings.find((id) => re.test(id));
    if (match) patch[field] = match;
  }
  if (!cfg.info_entities || !cfg.info_entities.length) {
    const infos = [];
    for (const { re, icon } of INFO_PATTERNS) {
      const match = siblings.find((id) => re.test(id));
      if (match) infos.push({ entity: match, icon });
    }
    if (infos.length) patch.info_entities = infos;
  }
  return patch;
}

function detectApplianceType(cfg, st) {
  if (cfg.appliance_type && cfg.appliance_type !== "auto") return cfg.appliance_type;
  const hay = `${cfg.icon || ""} ${cfg.state_entity || ""} ${(st && st.attributes.icon) || ""}`.toLowerCase();
  if (/dry|dryer|seche|sèche|tumble/.test(hay)) return "dryer";
  if (/dish|vaisselle/.test(hay)) return "dishwasher";
  return "washer";
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

class ApplianceCard extends HTMLElement {
  static getStubConfig(hass) {
    const sensors = Object.keys(hass.states).filter((e) => e.startsWith("sensor."));
    const guess = sensors.find((e) => /state/i.test(e) && /washer|wash|dry|dish|lave|linge/i.test(e));
    return { type: "custom:ha-appliance-card", state_entity: guess || "" };
  }

  setConfig(config) {
    if (!config || !config.state_entity) {
      throw new Error("ha-appliance-card: 'state_entity' is required");
    }
    this._config = config;
    this._runStartSeconds = null;
    this._prevNormState = null;
    if (!this._root) {
      this.attachShadow({ mode: "open" });
      this._root = this.shadowRoot;
    }
  }

  getCardSize() {
    return 3;
  }

  static getConfigElement() {
    return document.createElement("ha-appliance-card-editor");
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  _call(entityId) {
    if (!this._hass || !entityId) return;
    const domain = domainOf(entityId);
    if (domain === "button") {
      this._hass.callService("button", "press", { entity_id: entityId });
    } else if (["switch", "input_boolean", "fan", "light"].includes(domain)) {
      this._hass.callService(domain, "toggle", { entity_id: entityId });
    } else if (domain === "script") {
      this._hass.callService("script", "turn_on", { entity_id: entityId });
    } else {
      this._hass.callService("homeassistant", "toggle", { entity_id: entityId });
    }
  }

  _moreInfo(entityId) {
    const ev = new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true });
    this.dispatchEvent(ev);
  }

  _render() {
    const hass = this._hass;
    const cfg = this._config;
    if (!hass || !cfg) return;

    const st = stateObj(hass, cfg.state_entity);
    const rawState = st ? st.state : "unknown";
    const norm = normalizeState(rawState, cfg.state_map);
    const color = STATE_COLORS[norm] || STATE_COLORS.unknown;

    const name = cfg.name || (st && st.attributes.friendly_name) || cfg.state_entity;
    const applianceType = detectApplianceType(cfg, st);

    // Program
    let programText = null;
    if (cfg.program_entity) {
      const pst = stateObj(hass, cfg.program_entity);
      if (pst && !["unknown", "unavailable"].includes(pst.state)) {
        programText = cfg.program_format === "raw" ? pst.state : cleanProgramName(pst.state);
      }
    }

    // Remaining time / progress
    let remSec = null;
    if (cfg.remaining_time_entity) {
      remSec = remainingSeconds(hass, cfg.remaining_time_entity, cfg.remaining_time_unit);
    }

    let progressPct = null;
    if (cfg.progress_entity) {
      const p = numericState(hass, cfg.progress_entity);
      if (p !== null) progressPct = Math.max(0, Math.min(100, p));
    } else if (remSec !== null) {
      if (norm === "running") {
        if (this._prevNormState !== "running" || !this._runStartSeconds || remSec > this._runStartSeconds) {
          this._runStartSeconds = remSec > 0 ? remSec : null;
        }
        if (this._runStartSeconds) {
          progressPct = Math.max(0, Math.min(100, 100 - (remSec / this._runStartSeconds) * 100));
        }
      } else if (norm === "done") {
        progressPct = 100;
      } else {
        this._runStartSeconds = null;
      }
    } else {
      this._runStartSeconds = null;
    }
    this._prevNormState = norm;

    // Door
    let doorOpen = false;
    if (cfg.door_entity) {
      const dst = stateObj(hass, cfg.door_entity);
      if (dst) doorOpen = dst.state === (cfg.door_open_state || "on");
    }

    // Alerts
    const alerts = cfg.alerts_entity ? activeAlerts(hass, cfg.alerts_entity) : [];

    // Extra info chips
    const infoEntities = (cfg.info_entities || [])
      .map((e) => (typeof e === "string" ? { entity: e } : e))
      .map((e) => ({ ...e, st: stateObj(hass, e.entity) }))
      .filter((e) => e.st && !["unknown", "unavailable"].includes(e.st.state));

    // Connectivity
    let connectivity = null;
    if (cfg.connectivity_entity) {
      const cst = stateObj(hass, cfg.connectivity_entity);
      if (cst) {
        const want = (cfg.connectivity_connected_state || "on").toLowerCase();
        const got = String(cst.state).toLowerCase();
        connectivity = got === want || got === "true" || got === "connected";
      }
    }

    // Action buttons
    const actions = [
      { key: "start", entity: cfg.start_entity, icon: "mdi:play", label: t(hass, "start") },
      { key: "pause", entity: cfg.pause_entity, icon: "mdi:pause", label: t(hass, "pause") },
      { key: "resume", entity: cfg.resume_entity, icon: "mdi:play-pause", label: t(hass, "resume") },
      { key: "stop", entity: cfg.stop_entity, icon: "mdi:stop", label: t(hass, "stop") },
    ].filter((a) => a.entity);

    const spinning = norm === "running";

    const styleTag = `
      <style>
        ha-card { padding: 16px; }
        .top { display: flex; flex-direction: column; align-items: center; text-align: center; cursor: pointer; }
        .machine { position: relative; width: 96px; height: 108px; margin: 0 auto 8px; }
        .mbody {
          position: absolute; inset: 0; border-radius: 10px;
          background: var(--secondary-background-color, #d7d7d7);
          border: 1px solid var(--divider-color, #c7c7c7);
        }
        .mpanel {
          position: absolute; top: 6px; left: 8px; right: 8px; height: 10px;
          border-radius: 4px; background: var(--divider-color, #bdbdbd);
        }
        .mknob {
          position: absolute; top: 8px; right: 10px; width: 6px; height: 6px;
          border-radius: 50%; background: var(--disabled-text-color, #9e9e9e);
        }
        .mknob.k2 { right: 20px; }
        .bezel {
          position: absolute; left: 50%; top: 62%; transform: translate(-50%, -50%);
          width: 64px; height: 64px; border-radius: 50%;
          background: var(--divider-color, #b0b0b0);
          box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.15);
        }
        .rim { position: absolute; inset: 5px; border-radius: 50%; background: #2b2f36; }
        .glass {
          position: absolute; inset: 6px; border-radius: 50%; overflow: hidden;
          background: rgba(140, 180, 220, 0.18);
        }
        .water-level { position: absolute; left: 0; right: 0; bottom: 0; height: 55%; overflow: hidden; }
        .wave {
          position: absolute; left: -25%; top: -75%; width: 150%; height: 150%;
          border-radius: 45%; background: ${color}; opacity: 0.85;
          transition: background 1s linear;
        }
        .wave.wave2 { opacity: 0.45; }
        .machine.spinning .wave { animation: waterspin 6s linear infinite; }
        .machine.spinning .wave.wave2 { animation: waterspin 9s linear infinite reverse; }
        @keyframes waterspin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .garments { position: absolute; inset: 0; }
        .garment {
          position: absolute; width: 15px; height: 10px; border-radius: 6px;
          background: ${color}; opacity: 0.85; transition: background 1s linear;
        }
        .garment.g1 { top: 9px; left: 12px; }
        .garment.g2 { top: 27px; left: 32px; transform: rotate(15deg); }
        .garment.g3 { top: 15px; left: 36px; transform: rotate(-25deg); }
        .machine.spinning .garments { animation: tumble 2.6s linear infinite; }
        @keyframes tumble { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spray-arm {
          position: absolute; top: 50%; left: 50%; width: 3px; height: 72%;
          background: ${color}; transform: translate(-50%, -50%); transform-origin: center;
          transition: background 1s linear;
        }
        .spray-arm::before {
          content: ""; position: absolute; top: 50%; left: 50%; width: 72%; height: 3px;
          background: ${color}; transform: translate(-50%, -50%);
        }
        .spray-arm::after {
          content: ""; position: absolute; top: 50%; left: 50%; width: 6px; height: 6px;
          border-radius: 50%; background: ${color}; transform: translate(-50%, -50%);
        }
        .machine.spinning .spray-arm { animation: spray-spin 0.7s linear infinite; }
        @keyframes spray-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .name { font-size: 1.05em; font-weight: 500; color: var(--primary-text-color, #1c1c1c); }
        .state-line { font-size: 0.9em; color: ${color}; margin-top: 2px; }
        .info-lines { margin-top: 12px; display: flex; flex-direction: column; gap: 6px; }
        .info-line {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.85em; color: var(--primary-text-color, #1c1c1c); text-align: left;
        }
        .info-line ha-icon { --mdc-icon-size: 18px; color: var(--secondary-text-color, #767676); flex-shrink: 0; }
        .info-line .label { color: var(--secondary-text-color, #767676); }
        .info-line.warn { color: var(--error-color, #f44336); }
        .info-line.warn ha-icon { color: var(--error-color, #f44336); }
        .bar-row { margin-top: 4px; }
        .bar { height: 6px; border-radius: 3px; background: var(--divider-color, #e0e0e0); overflow: hidden; }
        .bar-fill { height: 100%; background: ${color}; transition: width 1s linear; }
        .alerts-banner {
          margin-top: 10px; padding: 6px 10px; border-radius: 8px;
          background: rgba(244, 67, 54, 0.12); color: var(--error-color, #f44336);
          font-size: 0.85em; display: flex; align-items: center; gap: 6px;
        }
        .actions-row { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; justify-content: center; }
        .action-btn {
          display: flex; align-items: center; gap: 6px;
          border: 1px solid var(--divider-color, #e0e0e0);
          border-radius: 20px; padding: 6px 14px; cursor: pointer;
          background: var(--card-background-color, transparent);
          color: var(--primary-text-color, #1c1c1c); font-size: 0.85em;
        }
        .action-btn:hover { background: var(--secondary-background-color, rgba(0,0,0,0.04)); }
        .action-btn ha-icon { --mdc-icon-size: 18px; }
      </style>
    `;

    const glassContent = {
      washer: `
        <div class="water-level">
          <div class="wave"></div>
          <div class="wave wave2"></div>
        </div>`,
      dryer: `
        <div class="garments">
          <div class="garment g1"></div>
          <div class="garment g2"></div>
          <div class="garment g3"></div>
        </div>`,
      dishwasher: `<div class="spray-arm"></div>`,
    }[applianceType];

    const iconHtml = cfg.compact
      ? ""
      : `
        <div class="machine ${spinning ? "spinning" : ""}">
          <div class="mbody">
            <div class="mpanel"></div>
            <div class="mknob"></div>
            <div class="mknob k2"></div>
          </div>
          <div class="bezel">
            <div class="rim">
              <div class="glass">
                ${glassContent}
              </div>
            </div>
          </div>
        </div>`;

    const lines = [];
    if (programText) lines.push({ icon: "mdi:tag-outline", label: t(hass, "program"), value: programText });
    infoEntities.forEach((e) => {
      lines.push({
        icon: e.icon || "mdi:information-outline",
        label: e.label || (e.st.attributes.friendly_name || e.entity),
        value: `${e.st.state}${e.st.attributes.unit_of_measurement ? " " + e.st.attributes.unit_of_measurement : ""}`,
      });
    });
    if (remSec !== null) {
      lines.push({
        icon: "mdi:timer-outline",
        label: t(hass, "remaining"),
        value: `${formatDuration(remSec, hass)} · ${t(hass, "ready_at")} ${formatEta(remSec)}`,
      });
    }
    if (cfg.door_entity) {
      lines.push({
        icon: doorOpen ? "mdi:door-open" : "mdi:door-closed",
        label: doorOpen ? t(hass, "door_open") : t(hass, "door_closed"),
        value: "",
        warn: doorOpen,
      });
    }
    if (connectivity !== null) {
      lines.push({
        icon: connectivity ? "mdi:wifi" : "mdi:wifi-off",
        label: connectivity ? t(hass, "connected") : t(hass, "disconnected"),
        value: "",
        warn: !connectivity,
      });
    }

    const linesHtml = lines.length
      ? `<div class="info-lines">${lines
          .map(
            (l) =>
              `<div class="info-line ${l.warn ? "warn" : ""}"><ha-icon icon="${l.icon}"></ha-icon><span class="label">${l.label}</span>${l.value ? `<span>${l.value}</span>` : ""}</div>`
          )
          .join("")}</div>`
      : "";

    const barHtml = progressPct !== null
      ? `
        <div class="bar-row">
          <div class="bar"><div class="bar-fill" style="width:${progressPct.toFixed(0)}%"></div></div>
        </div>`
      : "";

    const alertsHtml = alerts.length
      ? `<div class="alerts-banner"><ha-icon icon="mdi:alert-circle"></ha-icon>${t(hass, "alerts")}: ${alerts.join(", ")}</div>`
      : "";

    const actionsHtml = actions.length
      ? `<div class="actions-row">${actions
          .map(
            (a) =>
              `<div class="action-btn" data-entity="${a.entity}"><ha-icon icon="${a.icon}"></ha-icon>${a.label}</div>`
          )
          .join("")}</div>`
      : "";

    this._root.innerHTML = `
      ${styleTag}
      <ha-card>
        <div class="top" id="header">
          ${iconHtml}
          <div class="name">${name}</div>
          <div class="state-line">${t(hass, norm)}</div>
        </div>
        ${barHtml}
        ${linesHtml}
        ${alertsHtml}
        ${actionsHtml}
      </ha-card>
    `;

    const header = this._root.getElementById("header");
    if (header) header.addEventListener("click", () => this._moreInfo(cfg.state_entity));
    this._root.querySelectorAll(".action-btn").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.stopPropagation();
        this._call(el.getAttribute("data-entity"));
      });
    });
  }
}

// ---------------------------------------------------------------------------
// Editor
// ---------------------------------------------------------------------------

const ACTION_DOMAINS = ["button", "switch", "script", "input_boolean"];

const SECTIONS = [
  { field: "program_entity", labelKey: "section_program", includeDomains: ["select", "sensor", "input_select"], extra: (c, hass) => c._row("program_format", "program_format", {
      type: "select",
      options: [
        { value: "clean", label: t(hass, "program_format_clean") },
        { value: "raw", label: t(hass, "program_format_raw") },
      ],
    }) },
  { field: "remaining_time_entity", labelKey: "section_remaining", includeDomains: ["sensor", "input_number"], extra: (c, hass) => c._row("remaining_time_unit", "remaining_time_unit", {
      type: "select",
      options: [
        { value: "auto", label: t(hass, "unit_auto") },
        { value: "seconds", label: t(hass, "unit_seconds") },
        { value: "minutes", label: t(hass, "unit_minutes") },
      ],
    }) },
  { field: "progress_entity", labelKey: "section_progress", includeDomains: ["sensor", "input_number"] },
  { field: "door_entity", labelKey: "section_door", includeDomains: ["binary_sensor", "sensor"], extra: (c, hass) => c._row("door_open_state", "door_open_state", { placeholder: "on" }) },
  { field: "alerts_entity", labelKey: "section_alerts", includeDomains: ["sensor", "binary_sensor"] },
  { field: "connectivity_entity", labelKey: "section_connectivity", includeDomains: ["binary_sensor", "sensor"], extra: (c, hass) => c._row("connectivity_connected_state", "connectivity_connected_state", { placeholder: "on" }) },
  { field: "start_entity", labelKey: "section_start", includeDomains: ACTION_DOMAINS },
  { field: "pause_entity", labelKey: "section_pause", includeDomains: ACTION_DOMAINS },
  { field: "resume_entity", labelKey: "section_resume", includeDomains: ACTION_DOMAINS },
  { field: "stop_entity", labelKey: "section_stop", includeDomains: ACTION_DOMAINS },
];

function setsEqual(a, b) {
  if (a.size !== b.size) return false;
  for (const v of a) if (!b.has(v)) return false;
  return true;
}

class ApplianceCardEditor extends HTMLElement {
  _computeOpen(cfg) {
    const open = new Set(SECTIONS.filter((s) => cfg[s.field]).map((s) => s.field));
    if ((cfg.info_entities || []).length) open.add("__info");
    return open;
  }

  setConfig(config) {
    this._config = { ...config };
    const newOpen = this._computeOpen(this._config);
    if (!this._open || !setsEqual(this._open, newOpen)) this._needsBuild = true;
    this._open = newOpen;
    this._maybeBuild();
  }

  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (first) this._needsBuild = true;
    if (first && this._config && this._config.state_entity && !this._autoSuggested) {
      this._autoSuggested = true;
      this._applySuggestions();
      return;
    }
    this._maybeBuild();
  }

  // Only rebuilds the DOM when the set of visible sections actually changes.
  // hass updates on their own (which fire constantly as entity states change)
  // must NOT tear down and recreate <ha-entity-picker> elements — that closes
  // any open dropdown and can leave its floating listbox orphaned on screen.
  _maybeBuild() {
    if (!this._hass || !this._config) return;
    if (this._needsBuild || !this._built) {
      this._needsBuild = false;
      this._build();
    } else {
      this._refreshPickersHass();
    }
  }

  _refreshPickersHass() {
    if (!this._root) return;
    this._root.querySelectorAll("ha-entity-picker").forEach((p) => {
      p.hass = this._hass;
    });
  }

  _applySuggestions() {
    const patch = autoSuggest(this._hass, this._config);
    if (Object.keys(patch).length > 0) {
      this._config = { ...this._config, ...patch };
      const newOpen = this._computeOpen(this._config);
      for (const s of SECTIONS) if (patch[s.field]) newOpen.add(s.field);
      if (patch.info_entities) newOpen.add("__info");
      this._open = newOpen;
      this._needsBuild = true;
    }
    this._maybeBuild();
    if (Object.keys(patch).length > 0) {
      this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    }
  }

  _row(labelKey, field, opts) {
    opts = opts || {};
    const hass = this._hass;
    const value = this._config[field] || "";
    if (opts.type === "checkbox") {
      return `
        <div class="row row-inline">
          <label><input type="checkbox" data-field="${field}" data-type="checkbox" ${this._config[field] ? "checked" : ""} /> ${t(hass, labelKey)}</label>
        </div>`;
    }
    if (opts.type === "select") {
      const options = opts.options
        .map((o) => `<option value="${o.value}" ${o.value === value ? "selected" : ""}>${o.label}</option>`)
        .join("");
      return `
        <div class="row">
          <label>${t(hass, labelKey)}</label>
          <select data-field="${field}">${options}</select>
        </div>`;
    }
    return `
      <div class="row">
        <label>${t(hass, labelKey)}</label>
        <input type="text" data-field="${field}" value="${value}" placeholder="${opts.placeholder || ""}" />
      </div>`;
  }

  _mountPicker(slotEl, field, opts) {
    opts = opts || {};
    const hass = this._hass;
    const picker = document.createElement("ha-entity-picker");
    picker.hass = hass;
    picker.value = this._config[field] || "";
    picker.label = opts.label || t(hass, "entity");
    if (opts.includeDomains) picker.includeDomains = opts.includeDomains;
    picker.addEventListener("value-changed", (ev) => {
      const value = ev.detail.value;
      this._config = { ...this._config };
      if (value) this._config[field] = value;
      else delete this._config[field];
      this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    });
    slotEl.appendChild(picker);
  }

  _mountInfoPicker(slotEl, index) {
    const hass = this._hass;
    const list = (this._config.info_entities || []).map((e) => (typeof e === "string" ? { entity: e } : e));
    const current = list[index] || {};
    const picker = document.createElement("ha-entity-picker");
    picker.hass = hass;
    picker.value = current.entity || "";
    picker.label = `${t(hass, "entity")} ${index + 1}`;
    picker.addEventListener("value-changed", (ev) => {
      const value = ev.detail.value;
      const next = (this._config.info_entities || []).map((e) => (typeof e === "string" ? { entity: e } : { ...e }));
      while (next.length <= index) next.push({});
      if (value) next[index] = { ...next[index], entity: value };
      else next[index] = { ...next[index], entity: undefined };
      this._config = { ...this._config, info_entities: next.filter((e) => e.entity) };
      this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    });
    slotEl.appendChild(picker);
  }

  _sectionHtml(section) {
    const hass = this._hass;
    const open = this._open.has(section.field);
    return `
      <div class="section">
        <label class="row-inline"><input type="checkbox" data-toggle="${section.field}" ${open ? "checked" : ""} /> ${t(hass, section.labelKey)}</label>
        ${open ? `<div class="picker-slot" data-slot="${section.field}"></div>${section.extra ? section.extra(this, hass) : ""}` : ""}
      </div>`;
  }

  _build() {
    if (!this._hass || !this._config) return;
    this._built = true;
    const hass = this._hass;

    if (!this._root) {
      this.attachShadow({ mode: "open" });
      this._root = this.shadowRoot;
    }

    const infoOpen = (this._config.info_entities || []).length > 0 || this._open.has("__info");

    this._root.innerHTML = `
      <style>
        .section { margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid var(--divider-color, #eee); }
        .section h4 { margin: 12px 0 4px; font-size: 0.95em; color: var(--secondary-text-color, #767676); }
        .row { display: flex; flex-direction: column; margin: 8px 0; }
        .row label { font-size: 0.8em; color: var(--secondary-text-color, #767676); margin-bottom: 2px; }
        .row input, .row select {
          padding: 6px 8px; border-radius: 4px; border: 1px solid var(--divider-color, #ccc);
          background: var(--card-background-color, white); color: var(--primary-text-color, #1c1c1c);
        }
        .row-inline { display: flex; align-items: center; gap: 6px; font-size: 0.9em; color: var(--primary-text-color, #1c1c1c); cursor: pointer; }
        .row-inline input { width: auto; }
        .picker-slot { margin: 6px 0; }
      </style>
      <div class="section">
        <h4>${t(hass, "display_settings")}</h4>
        ${this._row("name", "name")}
        ${this._row("compact", "compact", { type: "checkbox" })}
        ${this._row("appliance_type", "appliance_type", {
          type: "select",
          options: [
            { value: "auto", label: t(hass, "type_auto") },
            { value: "washer", label: t(hass, "type_washer") },
            { value: "dryer", label: t(hass, "type_dryer") },
            { value: "dishwasher", label: t(hass, "type_dishwasher") },
          ],
        })}
      </div>
      <div class="section">
        <div class="picker-slot" data-slot="state_entity"></div>
      </div>
      ${SECTIONS.map((s) => this._sectionHtml(s)).join("")}
      <div class="section">
        <label class="row-inline"><input type="checkbox" data-toggle="__info" ${infoOpen ? "checked" : ""} /> ${t(hass, "section_info")}</label>
        ${infoOpen ? [0, 1, 2].map((i) => `<div class="picker-slot" data-slot="__info_${i}"></div>`).join("") : ""}
      </div>
    `;

    this._mountPicker(this._root.querySelector('[data-slot="state_entity"]'), "state_entity", {
      label: t(hass, "state_entity"),
      includeDomains: ["sensor", "binary_sensor"],
    });
    for (const s of SECTIONS) {
      if (this._open.has(s.field)) {
        this._mountPicker(this._root.querySelector(`[data-slot="${s.field}"]`), s.field, { includeDomains: s.includeDomains });
      }
    }
    if (infoOpen) {
      [0, 1, 2].forEach((i) => this._mountInfoPicker(this._root.querySelector(`[data-slot="__info_${i}"]`), i));
    }

    this._root.querySelectorAll("[data-field]").forEach((el) => {
      el.addEventListener("change", (ev) => {
        const field = ev.target.getAttribute("data-field");
        const value = ev.target.getAttribute("data-type") === "checkbox" ? ev.target.checked : ev.target.value;
        this._config = { ...this._config, [field]: value };
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
      });
    });

    this._root.querySelectorAll("[data-toggle]").forEach((el) => {
      el.addEventListener("change", (ev) => {
        const field = ev.target.getAttribute("data-toggle");
        if (ev.target.checked) {
          this._open.add(field);
        } else {
          this._open.delete(field);
          this._config = { ...this._config };
          if (field === "__info") {
            delete this._config.info_entities;
          } else {
            delete this._config[field];
            const section = SECTIONS.find((s) => s.field === field);
            if (section && section.field === "door_entity") delete this._config.door_open_state;
            if (section && section.field === "connectivity_entity") delete this._config.connectivity_connected_state;
          }
          this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
        }
        this._build();
      });
    });
  }
}

customElements.define("ha-appliance-card", ApplianceCard);
customElements.define("ha-appliance-card-editor", ApplianceCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "ha-appliance-card",
  name: "HA Appliance Card",
  description: "Cycle/program card for washers, dryers & dishwashers — works with any brand/integration via configurable entity mapping.",
});
