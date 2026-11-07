class ApplianceCard extends HTMLElement {
  static getStubConfig(hass) {
    const sensors = Object.keys(hass.states).filter((e) => e.startsWith("sensor."));
    const guess = sensors.find((e) => /state/i.test(e) && /washer|wash|dry|dish|lave|linge/i.test(e));
    return { type: "custom:ha-appliance-card", state_entity: guess || "" };
  }

  setConfig(config) {
    if (!config || (!config.state_entity && !stateFreeSource(config))) {
      throw new Error("ha-appliance-card: 'state_entity' is required");
    }
    this._config = config;
    // The release fetches each drawing on first use: ask for it now, while the
    // states are still on their way.
    if (config.appliance_type && config.appliance_type !== "auto" && config.compact !== "hide") drawingOf(drawKeyOf(config.appliance_type));
    // A reconfiguration changes what is drawn without touching any state, so
    // the next hass must go through whatever the signature says.
    this._lastSignature = undefined;
    this._cycle = null;
    this._prevNormState = null;
    this._evPrev = null;
    this._evShot = null;
    if (!this._root) {
      this.attachShadow({ mode: "open" });
      this._root = this.shadowRoot;
    }
  }

  getCardSize() {
    return 3;
  }

  // Sections dashboards size a card from this rather than from getCardSize().
  // Without it the card is guessed at and usually ends up squeezed, which is
  // what pushes the info lines into two- and three-line wraps. The height is
  // derived from the config, since that is what decides how many rows are
  // actually drawn.
  getGridOptions() {
    // Sections sizes a card from this. Counting the rows here was always an
    // approximation: it assumed one visual line per info entity, and at half
    // width a label like "Vitesse rotation" wraps onto two. The card then grew
    // past the height it had declared, which a section renders as one card
    // overlapping the next.
    //
    // The content is variable by construction. Info lines wrap on a narrow
    // column, an alerts banner appears and disappears with the appliance, the
    // button row comes and goes with the entities configured, and a fridge
    // gains a line the moment its plug drops out. No row count is right for
    // all of that, so the card asks for the height it actually takes and lets
    // the grid measure it. min_rows and max_rows are deliberately absent:
    // either one would clamp it back to a fixed height.
    //
    // Full width by default, because the card pairs an illustration with a
    // column of labelled lines and half a section is where those labels start
    // wrapping. min_columns still allows a narrower one on purpose.
    return { columns: 12, min_columns: 4, rows: "auto" };
  }

  // The editor is a file of its own in a release, fetched the first time a
  // card is edited: nobody looking at a dashboard pays for it.
  static async getConfigElement() {
    await loadEditor();
    return document.createElement("ha-appliance-card-editor");
  }

  // Entities this card actually reads: the *_entity config keys, the extra
  // info lines, and the cooking zones, which nest their own entity keys.
  _watchedEntityIds() {
    const cfg = this._config || {};
    const ids = [];
    for (const [k, v] of Object.entries(cfg)) {
      if (k.endsWith("_entity") && typeof v === "string" && v) ids.push(v);
    }
    for (const e of (cfg.info_entities || []).slice(0, INFO_MAX)) {
      const id = typeof e === "string" ? e : e && e.entity;
      if (id) ids.push(id);
    }
    for (const e of alertEntitiesList(cfg.alerts_entities)) ids.push(e.entity);
    for (const e of entityEntries(cfg.corner_entities, CORNERS_MAX)) ids.push(e.entity);
    for (const z of cfg.zones || []) {
      if (z && z.level_entity) ids.push(z.level_entity);
      if (z && z.residual_heat_entity) ids.push(z.residual_heat_entity);
    }
    return ids;
  }

  // A fingerprint of everything the rendered output depends on. Only the
  // attributes the card reads are folded in: an integration that republishes
  // telemetry every second, as Electrolux does, would otherwise defeat the
  // whole point. alerts_entity is the exception, since its attributes are its
  // content.
  _stateSignature(hass) {
    if (!hass || !this._config) return "";
    const parts = [
      (hass.locale && hass.locale.language) || hass.language || "",
      (hass.config && hass.config.unit_system && hass.config.unit_system.temperature) || "",
    ];
    for (const id of this._watchedEntityIds()) {
      const st = hass.states ? hass.states[id] : null;
      if (!st) { parts.push(id + "=-"); continue; }
      const a = st.attributes || {};
      parts.push(id + "=" + st.state + "@" + (st.last_changed || ""));
      parts.push([a.friendly_name, a.icon, a.unit_of_measurement, a.device_class,
                  Array.isArray(a.options) ? a.options.join(",") : ""].join("~"));
      if (id === this._config.alerts_entity) parts.push(JSON.stringify(a));
      if (domainOf(id) === "media_player") parts.push([a.app_name, a.source, a.media_title, a.is_volume_muted, a.entity_picture].join("~"));
      // A light changes colour or brightness without changing state or
      // last_changed: the bulb is drawn in its colour, so that is a change.
      if (domainOf(id) === "light") parts.push(JSON.stringify([a.brightness, a.color_mode, a.rgb_color, a.hs_color, a.xy_color, a.color_temp_kelvin, a.effect]));
    }
    // While a fridge counts the minutes since its plug went quiet, the minute
    // is part of what is displayed even though no state carries it. The card
    // also ticks on its own, but a browser throttles the timers of a hidden
    // tab, so the count has to be able to catch up on the next update too.
    if (this._belowSince) parts.push("u" + Math.floor((Date.now() - this._belowSince) / 60000));
    // Same for a countdown to a finish time: the minute left is on screen.
    if (this._countingDown) parts.push("c" + Math.floor(Date.now() / 60000));
    return parts.join("|");
  }

  set hass(hass) {
    // _render rebuilds the subtree through innerHTML, which restarts every CSS
    // animation at zero. Home Assistant calls this setter on any state change
    // anywhere in the system, so on a busy instance the drum never gets past a
    // few degrees. Redraw only when something this card shows has moved.
    const sig = this._stateSignature(hass);
    const first = this._lastSignature === undefined;
    this._hass = hass;
    if (!first && sig !== "" && sig === this._lastSignature) return;
    this._lastSignature = sig;
    this._render();
  }

  // A feeder that does not report while it serves (Aqara's C1 over
  // Zigbee2MQTT) is drawn serving for a moment after it was asked to, or after
  // its count of the day goes up.
  _feedPulse(redraw) {
    this._feedUntil = Date.now() + FEED_PULSE_MS;
    if (this._feedTimer) clearTimeout(this._feedTimer);
    this._feedTimer = setTimeout(() => {
      this._feedTimer = null;
      this._render();
    }, FEED_PULSE_MS + 50);
    if (redraw) this._render();
  }

  // How far a delayed start has counted down. The full length is the longest
  // seen for that start time, kept in the browser, so a reload in the middle
  // of a countdown does not start the bar again from nothing.
  _delayProgress(entityId, left) {
    const end = Date.now() + left * 1000;
    const key = `ha-appliance-card-delay:${entityId}`;
    let seen = this._delaySeen && this._delaySeen.key === key ? this._delaySeen : null;
    if (!seen) {
      try { seen = JSON.parse(localStorage.getItem(key) || "null"); } catch (e) { seen = null; }
    }
    if (!seen || Math.abs(seen.end - end) > 180000) seen = { key, end, total: left };
    seen = { key, end, total: Math.max(seen.total, left) };
    this._delaySeen = seen;
    try { localStorage.setItem(key, JSON.stringify(seen)); } catch (e) { /* the bar still runs for this visit */ }
    return seen.total > 0 ? Math.max(0, Math.min(100, (1 - left / seen.total) * 100)) : null;
  }

  // A mode picked in the menu: a select's option, a fan's preset, or a
  // media player's source.
  _pickMode(option) {
    const cfg = this._config || {};
    const cap = this._hass ? caps(detectApplianceType(cfg, stateObj(this._hass, cfg.state_entity))) : null;
    const menu = this._hass ? cardMenuOf(this._hass, cfg, cap) : null;
    if (!menu || !menu.options.includes(option)) return this._render();
    // A speed turns its own entity on and nothing else: the unit's own
    // automations switch the other speeds off (#78).
    if (menu.dom === "speed") {
      const id = menu.ids[Number(option) - 1];
      if (id) this._hass.callService(domainOf(id), "turn_on", { entity_id: id });
      return this._render();
    }
    if (["fan", "climate"].includes(menu.dom)) this._hass.callService(menu.dom, "set_preset_mode", { entity_id: menu.entity, preset_mode: option });
    else if (menu.dom === "media_player") this._hass.callService("media_player", "select_source", { entity_id: menu.entity, source: option });
    else this._hass.callService(menu.dom, "select_option", { entity_id: menu.entity, option });
    this._render();
  }

  // A program or a delayed start picked in a line's menu (#79): a select's
  // option, or a number set to the hours chosen.
  _pickLine(kind, option) {
    const menu = this._lineMenus && this._lineMenus[kind];
    this._lineMenu = null;
    if (menu && menu.options.includes(option)) {
      if (["number", "input_number"].includes(menu.dom)) this._hass.callService(menu.dom, "set_value", { entity_id: menu.entity, value: Number(option) });
      else if (menu.dom === "humidifier") this._hass.callService("humidifier", "set_mode", { entity_id: menu.entity, mode: option });
      else this._hass.callService(menu.dom, "select_option", { entity_id: menu.entity, option });
    }
    this._render();
  }

  _clearClockTimer() {
    if (this._clockTimer) {
      clearInterval(this._clockTimer);
      this._clockTimer = null;
    }
  }

  _clearCountdownTimer() {
    if (this._countdownTimer) {
      clearInterval(this._countdownTimer);
      this._countdownTimer = null;
    }
  }

  // Back on the page with a shot still remembered, the card draws again: the
  // shot picks up where it was, or gives way to the state if it is over,
  // rather than the browser playing it again from the start.
  connectedCallback() {
    if (this._evShot && this._hass) this._render();
    if (!this._onLanguage) this._onLanguage = () => { if (this._hass && this._config) this._render(); };
    onLanguageLoaded(this._onLanguage, true);
    // A drawing wider than the card shrinks to fit it, and grows back when
    // the card widens: a phone turned on its side, a column resized.
    if (!this._resizer && typeof ResizeObserver !== "undefined") {
      this._resizer = new ResizeObserver(() => this._fitDrawing());
      this._resizer.observe(this);
    }
  }

  // A screen is drawn up to 192 px wide, more than a card gets in a phone's
  // two columns. The space beside it is measured and the drawing scaled down
  // to it, never up.
  _fitDrawing() {
    const m = this._root && this._root.querySelector ? this._root.querySelector(".machine[data-fit-w]") : null;
    if (!m || typeof m.getAttribute !== "function" || !this.style || typeof this.style.setProperty !== "function") return;
    const need = parseFloat(m.getAttribute("data-fit-w"));
    // Beside the text, a screen is drawn the size of every other appliance.
    const side = !!(this._card && this._card.classList && this._card.classList.contains("cmp-side"));
    const room = side ? 96 : m.parentElement ? m.parentElement.clientWidth / illustrationSizeOf(this._config && this._config.illustration_size) : 0;
    const fit = need > 0 && room > 0 ? Math.min(1, room / need) : 1;
    this.style.setProperty("--scr-fit", String(Math.round(fit * 1000) / 1000));
  }

  disconnectedCallback() {
    if (this._onLanguage) onLanguageLoaded(this._onLanguage, false);
    if (this._resizer) this._resizer.disconnect();
    this._resizer = null;
    this._clearClockTimer();
    this._clearCountdownTimer();
    if (this._elapsedTimer) clearInterval(this._elapsedTimer);
    this._elapsedTimer = null;
    if (this._feedTimer) clearTimeout(this._feedTimer);
    this._feedTimer = null;
    if (this._offDelayTimer) clearTimeout(this._offDelayTimer);
    this._offDelayTimer = null;
    if (this._evShotTimer) clearTimeout(this._evShotTimer);
    this._evShotTimer = null;
    if (this._lcRetryTimer) clearTimeout(this._lcRetryTimer);
    this._lcRetryTimer = null;
    if (this._lcCloseTimer) clearTimeout(this._lcCloseTimer);
    this._lcCloseTimer = null;
    this._cancelHold();
    this._disarm();
  }

  // Nothing changes on a plug that has stopped drawing, so nothing would
  // tell the card that the delay is over: it wakes itself up.
  _armOffDelay(ms) {
    if (this._inert) return;
    if (this._offDelayTimer) clearTimeout(this._offDelayTimer);
    this._offDelayTimer = setTimeout(() => {
      this._offDelayTimer = null;
      this._render();
    }, ms + 500);
  }

  // Nothing need change on a charger once a plug has gone in or out, so
  // nothing would tell the card that the shot is over: it wakes itself up to
  // draw the state as it is. Left drawn, the shot would play again whenever
  // the browser shows the card anew, back from another view.
  _armEvShotEnd(ms) {
    if (this._inert) return;
    if (this._evShotTimer) clearTimeout(this._evShotTimer);
    this._evShotTimer = setTimeout(() => {
      this._evShotTimer = null;
      this._render();
    }, ms + 50);
  }

  // Reads the history for the last cycle that ran to its end: once, again
  // when a cycle ends before the card's eyes, and at most every half hour.
  _lookUpLastCycle(cfg, type, fromPower, threshold) {
    const hass = this._hass;
    if (this._inert || !hass || typeof hass.callWS !== "function") return;
    const entity = fromPower ? cfg.power_entity : cfg.state_entity;
    if (!entity) return;
    const gapMs = fromPower ? Math.max(0, parseFloat(cfg.power_off_delay) || 0) * 60000 : 0;
    const key = [entity, type, fromPower ? threshold : "", gapMs].join("|");
    const end = Date.now();
    const from = end - (fromPower ? LAST_CYCLE_POWER_MS : LAST_CYCLE_STATE_MS);
    if (this._lastCycleKey === key && !this._lastCycleStale && end - this._lastCycleAt < 30 * 60 * 1000) return;
    this._lastCycleKey = key;
    this._lastCycleAt = end;
    this._lastCycleStale = false;
    let req;
    try {
      req = hass.callWS({
        type: "history/history_during_period",
        start_time: new Date(from).toISOString(),
        end_time: new Date(end).toISOString(),
        entity_ids: [entity],
        include_start_time_state: true,
        significant_changes_only: false,
        minimal_response: true,
        no_attributes: true,
      });
    } catch (e) {
      return;
    }
    Promise.resolve(req).then((res) => {
      if (this._lastCycleKey !== key) return;
      const rows = res && res[entity];
      const runs = fromPower ? powerRuns(rows, threshold, gapMs, Date.now(), from)
        : stateRuns(rows, (raw) => normFor(type, raw, cfg.state_map), from);
      const lc = lastFinishedRun(runs);
      this._lastCycle = lc;
      // The recorder writes in batches, so the history read the moment a
      // cycle ends may not hold its last rows yet: the cycle still looks
      // open and the one before it is shown (#24). Until the cycle the card
      // saw end is in the history, it reads it again a little later.
      const seen = this._lcEndSeenAt;
      if (seen && !(lc && lc.end >= seen - gapMs - 5 * 60000)) this._armLastCycleRetry();
      else this._lcEndSeenAt = null;
      // A cycle that stopped drawing less than power_off_delay ago is not over
      // yet, so the one before it is shown. A card opened in that window never
      // sees the end happen, and kept the old cycle until its half-hourly read
      // (#24). It reads again the moment the delay runs out.
      const last = runs[runs.length - 1];
      this._armLastCycleClose(last && last.closesAt);
      this._render();
    }, () => {});
  }

  _armLastCycleClose(at) {
    if (this._lcCloseTimer) clearTimeout(this._lcCloseTimer);
    this._lcCloseTimer = null;
    if (this._inert || !Number.isFinite(at)) return;
    this._lcCloseTimer = setTimeout(() => {
      this._lcCloseTimer = null;
      this._lastCycleStale = true;
      this._render();
    }, Math.max(0, at - Date.now()) + 2000);
  }

  _armLastCycleRetry() {
    if (this._inert || this._lcRetryTimer) return;
    if ((this._lcRetries || 0) >= 5) {
      this._lcEndSeenAt = null;
      return;
    }
    this._lcRetries = (this._lcRetries || 0) + 1;
    this._lcRetryTimer = setTimeout(() => this._retryLastCycle(), 30000);
  }

  _retryLastCycle() {
    this._lcRetryTimer = null;
    this._lastCycleStale = true;
    this._render();
  }

  // Reads the state history once per cycle to find where it really began.
  // Without a recorder, or with the entity excluded from it, the last change
  // of state stays the best guess.
  _lookUpCycle(cycle, cfg, type) {
    const hass = this._hass;
    if (this._inert) return;
    if (!hass || typeof hass.callWS !== "function" || !cfg.state_entity) return;
    const end = Date.now();
    let req;
    try {
      req = hass.callWS({
        type: "history/history_during_period",
        start_time: new Date(end - CYCLE_HISTORY_MS).toISOString(),
        end_time: new Date(end).toISOString(),
        entity_ids: [cfg.state_entity],
        include_start_time_state: true,
        significant_changes_only: false,
        minimal_response: true,
        no_attributes: true,
      });
    } catch (e) {
      return;
    }
    Promise.resolve(req).then((res) => {
      // The cycle may have ended, or the card been reconfigured, meanwhile.
      if (this._cycle !== cycle) return;
      const found = cycleFromHistory(res && res[cfg.state_entity], (raw) => normFor(type, raw, cfg.state_map));
      if (!found || found.start > cycle.start) return;
      Object.assign(cycle, found);
      this._render();
    }, () => {});
  }

  // A cycle read from a plug, opened in its middle: its meter's history says
  // when the plug began to draw.
  _lookUpPowerCycle(cycle, cfg, threshold) {
    const hass = this._hass;
    if (this._inert || !hass || typeof hass.callWS !== "function" || !cfg.power_entity) return;
    const end = Date.now();
    const from = end - CYCLE_HISTORY_MS;
    let req;
    try {
      req = hass.callWS({
        type: "history/history_during_period",
        start_time: new Date(from).toISOString(),
        end_time: new Date(end).toISOString(),
        entity_ids: [cfg.power_entity],
        include_start_time_state: true,
        significant_changes_only: false,
        minimal_response: true,
        no_attributes: true,
      });
    } catch (e) {
      return;
    }
    Promise.resolve(req).then((res) => {
      if (this._cycle !== cycle) return;
      const gapMs = Math.max(0, parseFloat(cfg.power_off_delay) || 0) * 60000;
      const runs = powerRuns(res && res[cfg.power_entity], threshold, gapMs, Date.now(), from);
      const last = runs[runs.length - 1];
      if (!last || last.end !== null || last.start > cycle.start) return;
      cycle.start = last.start;
      this._render();
    }, () => {});
  }

  // Today's running time and starts, read from the history of the meter or of
  // the state since midnight, and kept five minutes.
  _lookUpToday(cfg, type, fromPower, threshold) {
    const hass = this._hass;
    if (this._inert || !hass || typeof hass.callWS !== "function") return;
    const entity = fromPower ? cfg.power_entity : cfg.state_entity;
    if (!entity) return;
    const midnight = new Date(Date.now());
    midnight.setHours(0, 0, 0, 0);
    const from = midnight.getTime();
    const gapMs = fromPower ? Math.max(0, parseFloat(cfg.power_off_delay) || 0) * 60000 : 0;
    const key = [entity, type, fromPower ? threshold : "", gapMs, from].join("|");
    const now = Date.now();
    if (this._today && this._today.key === key && now - this._today.at < HISTORY_REFRESH_MS) return;
    if (this._todayPending === key) return;
    this._todayPending = key;
    let req;
    try {
      req = hass.callWS({
        type: "history/history_during_period",
        start_time: new Date(from).toISOString(),
        end_time: new Date(now).toISOString(),
        entity_ids: [entity],
        include_start_time_state: true,
        significant_changes_only: false,
        minimal_response: true,
        no_attributes: true,
      });
    } catch (e) {
      this._todayPending = null;
      return;
    }
    Promise.resolve(req).then((res) => {
      if (this._todayPending !== key) return;
      this._todayPending = null;
      const rows = Array.isArray(res && res[entity]) ? res[entity] : [];
      this._today = { key, at: Date.now(), rows, from, fromPower, threshold, gapMs, type, entity };
      this._render();
    }, () => { this._todayPending = null; });
  }

  // Today's runs: the history read, then what the card saw happen since
  // (HACF #127). The history is kept five minutes and the recorder writes
  // late, so a lamp switched on a moment ago would otherwise wait for the
  // next read to be counted, and two quick switches between reads not at all.
  _todayRuns(cfg) {
    const td = this._today;
    if (!td || !td.rows) return null;
    const rowTime = (e) => Number(e && (e.lc !== undefined ? e.lc : e.lu));
    const last = td.rows.reduce((m, e) => Math.max(m, rowTime(e) || 0), 0);
    const st = stateObj(this._hass, td.entity);
    if (st) {
      const lc = Date.parse(st.last_changed) / 1000;
      const seen = this._todaySeen && this._todaySeen.key === td.key ? this._todaySeen : (this._todaySeen = { key: td.key, rows: [] });
      const prev = seen.rows[seen.rows.length - 1];
      if (Number.isFinite(lc) && (!prev || lc > prev.lc || (lc === prev.lc && String(st.state) !== prev.s))) seen.rows.push({ s: String(st.state), lc });
      seen.rows = seen.rows.filter((e) => e.lc > last);
    }
    const rows = td.rows.concat(this._todaySeen && this._todaySeen.key === td.key ? this._todaySeen.rows : []);
    return td.fromPower ? powerRuns(rows, td.threshold, td.gapMs, Date.now(), td.from)
      : stateRunsOpen(rows, (raw) => todayNormFor(td.type, raw, cfg.state_map, /^(climate|water_heater)\./.test(td.entity)), td.from);
  }

  // Reads the history once the curve is unfolded, then keeps it five
  // minutes: a dashboard left open does not ask the recorder at every render.
  // Up to two days the raw history; past that Home Assistant's statistics, or
  // the raw history again for a sensor that keeps none; a washer's, a dryer's
  // or a dishwasher's days as bars.
  _lookUpHistory(entity, hours, bars) {
    const hass = this._hass;
    if (this._inert || !hass || typeof hass.callWS !== "function" || !entity) return;
    const key = `${entity}|${hours}|${bars ? JSON.stringify(bars) : ""}`;
    const now = Date.now();
    if (this._history && this._history.key === key && now - this._history.at < HISTORY_REFRESH_MS) return;
    if (this._historyPending === key) return;
    this._historyPending = key;
    const from = now - hours * 3600000;
    const ws = (msg) => { try { return Promise.resolve(hass.callWS(msg)); } catch (e) { return Promise.reject(e); } };
    const iso = (ms) => new Date(ms).toISOString();
    const raw = (id, start) => ws({ type: "history/history_during_period", start_time: iso(start), end_time: iso(now), entity_ids: [id],
      include_start_time_state: true, significant_changes_only: false, minimal_response: true, no_attributes: true }).then((res) => (res && Array.isArray(res[id]) ? res[id] : []));
    const stats = (id, start, period, types) => ws({ type: "recorder/statistics_during_period", start_time: iso(start), end_time: iso(now), statistic_ids: [id], period, types })
      .then((res) => (res && Array.isArray(res[id]) ? res[id] : []), () => []);
    let job;
    if (bars) {
      const starts = historyDays(Math.round(hours / 24), now);
      const s0 = starts[0];
      const needPower = bars.power && (!bars.energy || !bars.state);
      job = Promise.all([
        bars.energy ? stats(bars.energy, s0, "day", ["change"]) : null,
        needPower ? stats(bars.power, s0, "hour", ["mean", "max"]) : null,
        bars.state ? raw(bars.state, s0) : null,
      ]).then(([energyRows, powerRows, stateRows]) => {
        const rowTime = (e) => 1000 * Number(e && (e.lc !== undefined ? e.lc : e.lu));
        const runs = stateRows && stateRows.length ? stateRunsOpen(stateRows, (v) => todayNormFor(bars.type, v, bars.stateMap, false), s0) : null;
        return historyDayBars(starts, now, {
          energyRows: energyRows && energyRows.length ? energyRows : null, energyUnit: bars.energyUnit,
          powerRows: powerRows && powerRows.length ? powerRows : null, powerUnit: bars.powerUnit,
          runs, covered: runs ? rowTime(stateRows[0]) - 1000 : Infinity, threshold: bars.threshold,
        });
      });
    } else if (hours <= HISTORY_RAW_HOURS) {
      job = raw(entity, from).then((rows) => historyValues(rows, from, now));
    } else {
      const byDay = hours > 24 * 14;
      const start = byDay ? historyDays(Math.ceil(hours / 24), now)[0] : Math.floor(from / 3600000) * 3600000;
      job = stats(entity, start, byDay ? "day" : "hour", ["mean", "min", "max", "state"])
        .then((rows) => historyStatValues(rows, start, now, (byDay ? 24 : 1) * 3600000) || raw(entity, from).then((r) => historyValues(r, from, now)));
    }
    job.then((v) => {
      if (this._historyPending !== key) return;
      this._historyPending = null;
      this._history = bars ? { key, at: Date.now(), bars: v } : { key, at: Date.now(), ...v };
      if (this._historyOpen) this._render();
    }, () => { this._historyPending = null; });
  }

  // A control is not always a button. A pet feeder dispenses from a select set
  // to START (Aqara over Zigbee2MQTT) or from a number written with the number
  // of portions (Tuya), and a card that only knew how to press buttons would
  // be tied to one brand, which is the one thing this card refuses to be.
  _call(entityId, opts) {
    if (!this._hass || !entityId) return;
    // A feeder served from the card is serving: draw it at once, without
    // waiting for a counter that may take ten seconds or never come.
    if (this._isFeeder && this._config && entityId === this._config.start_entity) this._feedPulse(true);
    const domain = domainOf(entityId);
    // A robot's own controls name their service: start, pause, the way home.
    if (opts && opts.service) return this._hass.callService(domain, opts.service, { entity_id: entityId });
    if (domain === "select" || domain === "input_select") {
      const option = (opts && opts.option) || soleOption(this._hass, entityId);
      // Without an option there is nothing to pick, and picking the wrong one
      // would run the wrong programme: open the entity and let the user choose.
      if (!option) return this._moreInfo(entityId);
      return this._hass.callService(domain, "select_option", { entity_id: entityId, option });
    }
    // A humidifier's setpoint, from its slider (#89).
    // A button sends no value, which reads as null: its power button is a toggle (#94).
    if (domain === "humidifier" && opts && opts.value !== undefined && opts.value !== null && opts.value !== "") {
      return this._hass.callService("humidifier", "set_humidity", { entity_id: entityId, humidity: Number(opts.value) });
    }
    if (domain === "number" || domain === "input_number") {
      const value = opts && opts.value;
      if (value === undefined || value === null || value === "" || !Number.isFinite(Number(value))) {
        return this._moreInfo(entityId);
      }
      return this._hass.callService(domain, "set_value", { entity_id: entityId, value: Number(value) });
    }
    // Plenty of ovens expose their lamp as a binary_sensor: it reports the
    // light, it does not drive it. Toggling one only writes an error to the
    // log, so the click opens the entity instead, which is the one useful
    // thing left to do with a reading.
    if (READ_ONLY_DOMAINS.includes(domain)) return this._moreInfo(entityId);
    if (domain === "button" || domain === "input_button") {
      this._hass.callService(domain, "press", { entity_id: entityId });
    } else if (["switch", "input_boolean", "fan", "light", "valve", "humidifier"].includes(domain)) {
      this._hass.callService(domain, "toggle", { entity_id: entityId });
    } else if (domain === "script") {
      this._hass.callService("script", "turn_on", { entity_id: entityId });
    } else if (domain === "automation") {
      // Toggling an automation would switch it off, silently, which is the
      // opposite of what a button reading "start" is asking for.
      this._hass.callService("automation", "trigger", { entity_id: entityId });
    } else {
      this._hass.callService("homeassistant", "toggle", { entity_id: entityId });
    }
  }

  // How a control answers a finger (#28). "tap", the default, runs it at once.
  // "hold" runs it only after a long press, so a stray tap or a child's finger
  // does nothing. "off" never runs it from the card: a tap does nothing and a
  // long press opens the entity. The press is timed on the card, not on the
  // button, because a state update redraws the buttons mid-press and the
  // release would then land on a new one that knows nothing of the old timer.
  _wireControl(el, mode, entityId, run) {
    mode = activationOf(mode);
    // The phone vibrates when a control acts, as Home Assistant's own
    // buttons do: the Companion app listens for a haptic event on the window.
    const act = run;
    run = () => {
      haptic("light");
      act();
    };
    // "confirm": the first tap arms the control, a second one within three
    // seconds runs it. The armed key outlives a redraw, so a state update
    // between the two taps does not lose it.
    if (mode === "confirm") {
      const key = [entityId, el.getAttribute("data-option") || "", el.getAttribute("data-value") || ""].join("|");
      if (this._armedKey === key && Date.now() < this._armedUntil) this._showArmed(el);
      el.addEventListener("click", (ev) => {
        if (ev && ev.stopPropagation) ev.stopPropagation();
        if (this._armedKey === key && Date.now() < this._armedUntil) {
          this._disarm();
          run();
          return;
        }
        this._disarm();
        haptic("selection");
        this._armedKey = key;
        this._armedUntil = Date.now() + CONFIRM_MS;
        this._armTimer = setTimeout(() => {
          this._disarm();
          this._render();
        }, CONFIRM_MS);
        this._render();
      });
      return;
    }
    if (mode === "tap") {
      el.addEventListener("click", (ev) => {
        if (ev && ev.stopPropagation) ev.stopPropagation();
        run();
      });
      return;
    }
    el.addEventListener("pointerdown", () => {
      this._cancelHold();
      this._holdTimer = setTimeout(() => {
        this._holdTimer = null;
        if (mode === "hold") run();
        else this._moreInfo(entityId);
      }, HOLD_MS);
    });
    ["pointerup", "pointerleave", "pointercancel"].forEach((type) => el.addEventListener(type, () => this._cancelHold()));
    // A long press on a phone would otherwise bring up the copy menu.
    el.addEventListener("contextmenu", (ev) => { if (ev && ev.preventDefault) ev.preventDefault(); });
    el.addEventListener("click", (ev) => { if (ev && ev.stopPropagation) ev.stopPropagation(); });
  }

  _showArmed(el) {
    if (el.classList) el.classList.add("armed");
    if (el.hasAttribute && el.hasAttribute("data-pic-tap")) {
      el.setAttribute("title", t(this._hass, "confirm_again"));
      return;
    }
    const icon = el.querySelector && el.querySelector("ha-icon");
    if (icon) icon.setAttribute("icon", "mdi:check-bold");
    el.setAttribute("title", t(this._hass, "confirm_again"));
  }

  _disarm() {
    if (this._armTimer) clearTimeout(this._armTimer);
    this._armTimer = null;
    this._armedKey = null;
  }

  _cancelHold() {
    if (this._holdTimer) clearTimeout(this._holdTimer);
    this._holdTimer = null;
  }

  _moreInfo(entityId) {
    const ev = new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true });
    this.dispatchEvent(ev);
  }

  // What a tap on the card does. Home Assistant's own action config, the one
  // every dashboard already speaks, rather than a wording of the card's: a tap
  // opens the entity unless the YAML says otherwise (HACF). fire-dom-event is
  // the one the popup cards are built on: browser_mod listens for ll-custom
  // and reads the action itself, so the card hands it over whole.
  _tap(cfg, fallback) {
    const action = cfg.tap_action || {};
    const kind = action.action || "more-info";
    const entityId = action.entity || cfg.state_entity || fallback;
    if (kind === "none") return;
    if (kind === "fire-dom-event") {
      this.dispatchEvent(new CustomEvent("ll-custom", { detail: action, bubbles: true, composed: true }));
      return;
    }
    if (kind === "navigate" && action.navigation_path) {
      if (typeof history !== "undefined" && history.pushState) history.pushState(null, "", action.navigation_path);
      this.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false }, bubbles: true, composed: true }));
      return;
    }
    if (kind === "url" && action.url_path) {
      if (typeof window !== "undefined" && typeof window.open === "function") {
        window.open(action.url_path, action.target || "_blank");
      }
      return;
    }
    if (kind === "toggle" && this._hass) {
      this._hass.callService("homeassistant", "toggle", { entity_id: entityId });
      return;
    }
    // "call-service" was renamed "perform-action" in 2024.8, and both spellings
    // are still written in dashboards today.
    if ((kind === "call-service" || kind === "perform-action") && this._hass) {
      const called = action.perform_action || action.service;
      const [domain, service] = String(called || "").split(".");
      if (domain && service) {
        this._hass.callService(domain, service, action.data || action.service_data || {}, action.target);
      }
      return;
    }
    // Anything else, an action the card does not know or one missing what it
    // needs, opens the entity: a tap that does nothing at all reads as broken.
    this._moreInfo(entityId);
  }

  _render() {
    const cfg = this._config;
    const hass = localizedHass(this._hass, cfg);
    if (!hass || !cfg) return;

    const st = stateObj(hass, cfg.state_entity);
    const rawState = st ? st.state : "unknown";
    const applianceType = detectApplianceType(cfg, st);
    const cap = caps(applianceType);
    let norm = normFor(applianceType, rawState, cfg.state_map);
    // Miele's on is a machine switched on with no programme; its enum says so.
    if (String(rawState).trim().toLowerCase() === "on" && st && Array.isArray(st.attributes.options) && st.attributes.options.includes("in_use") && !(cfg.state_map && "on" in cfg.state_map)) norm = "idle";

    // HomeWhiz says a finished cycle in its message rather than in its state:
    // the washer goes back to "on" and asks for the laundry back, the dryer and
    // the dishwasher call the programme complete, and only a while later does
    // the machine switch itself off (issue #18). Still switched on, it is
    // finished; switched off, it is off.
    if (rawState === "device_state_on" && cfg.phase_entity) {
      const pst = stateObj(hass, cfg.phase_entity);
      if (pst && homewhizDone(pst.state)) norm = "done";
    }

    // A power threshold, when configured, wins over the state entity: on a
    // smart-plug setup the state entity is the plug itself, which reads "on"
    // as soon as the appliance is plugged in and says nothing about whether
    // it is actually doing anything.
    let powerDerived = false;
    // In watts whatever the plug counts in: a meter in kW is not 0.5 W.
    const watts = cfg.power_entity ? wattsOf(hass, cfg.power_entity) : null;
    const hasThreshold = cfg.power_on_threshold !== undefined && cfg.power_on_threshold !== "";
    // Pointing state_entity at the power meter itself can only mean "derive the
    // state from it"; without a default threshold the card would print a bare
    // wattage as the appliance's state.
    // A plug's switch only says the appliance is plugged in: with a meter on
    // the same plug, what it draws says whether it works, against a threshold
    // of its own type when none is set (#plug-only). A state from an
    // integration says more than a meter, and keeps the say.
    const plugState = !!cfg.power_entity && plugSourceOf(cfg, applianceType);
    const threshold = hasThreshold
      ? parseFloat(cfg.power_on_threshold)
      : cap.fridgeTemp
        ? 1
        : cap.hairDryer && cfg.power_entity
          ? 10
        : plugState && PLUG_THRESHOLDS[applianceType] !== undefined
          ? PLUG_THRESHOLDS[applianceType]
        : cfg.power_entity === cfg.state_entity
          ? 10
          : NaN;
    // A fridge is excluded here on purpose: its compressor cycles all day, so
    // reading the meter as a cycle state would report "finished" every twenty
    // minutes. What the meter says on a fridge is whether it is still plugged
    // in, and that is decided further down with the health summary. A charger
    // too: its meter only stands in for a status it does not have, together
    // with the plug, further down.
    if (!cap.fridgeTemp && !cap.evCharger && !cap.screen && !cap.network && !cap.solar && !cap.homeBattery && !cap.ups && cfg.power_entity && isFinite(threshold)) {
      let derived = powerDerivedState(watts, threshold, this._powerWasRunning);
      // A hood or a hob has nothing to finish: once it draws nothing it is off.
      if (derived === "done" && ["hood", "cooktop"].includes(applianceType)) derived = "idle";
      // A pause under the threshold is not the end: a dishwasher drying, a
      // washer soaking. With power_off_delay the card waits that many minutes
      // below the threshold before it calls the cycle finished.
      // A dishwasher on a plug dries on the heat it left in the tub, drawing
      // next to nothing for a while before it is done: the card waits that
      // long unless told otherwise.
      const offDelayCfg = cfg.power_off_delay === undefined || cfg.power_off_delay === "" ? (applianceType === "dishwasher" ? DW_DRY_MIN : 0) : cfg.power_off_delay;
      const offDelayMs = Math.max(0, parseFloat(offDelayCfg) || 0) * 60000;
      if (derived === "running") this._powerBelowSince = null;
      else if (derived === "done" && offDelayMs > 0) {
        if (!this._powerBelowSince) this._powerBelowSince = Date.now();
        const left = this._powerBelowSince + offDelayMs - Date.now();
        if (left > 0) {
          derived = "running";
          this._armOffDelay(left);
        }
      }
      if (derived) {
        // Only "running" flips the latch on. "done" must leave it set, or the
        // next render would fall straight back to "idle" and the finished
        // cycle would never be shown.
        if (derived === "running") this._powerWasRunning = true;
        else if (derived === "idle") this._powerWasRunning = false;
        norm = derived;
        powerDerived = true;
        // A coffee machine or a rice cooker done with its work keeps a hot
        // plate or a warm pot going on a few watts: that is keeping warm,
        // not finished, until the plug reads nothing at all.
        if (KEEP_WARM_TYPES.includes(applianceType) && derived !== "running" && plugState && watts > KEEP_WARM_W
          && !(st && String(st.state).toLowerCase() === "off")) norm = "keep_warm";
      }
    }

    // A delayed start counting down (#56): Home Connect's StartInRelative, or
    // any countdown in seconds, minutes or as a start time. While it runs the
    // machine waits, whatever word its state uses for waiting.
    let delaySec = null;
    if (cfg.delay_entity && cap.cycle) {
      const d = remainingSeconds(hass, cfg.delay_entity, cfg.delay_unit, true);
      if (d !== null && d >= 30) {
        delaySec = d;
        if (!CONTROL_RUNNING.includes(norm) && !["paused", "error"].includes(norm)) norm = "delayed";
      }
    }
    // hide_when_off (#79): with its power switch off, an appliance reads Off
    // whatever its state sensor last said, and shows its state alone.
    const toggleSt = cfg.toggle_entity ? stateObj(hass, cfg.toggle_entity) : null;
    const offHidden = !!cfg.hide_when_off && ((!!toggleSt && String(toggleSt.state).toLowerCase() === "off") || norm === "off");
    if (offHidden) { norm = "idle"; delaySec = null; }
    let color = STATE_COLORS[norm] || STATE_COLORS.unknown;
    const rawIsMeaningless = ["unknown", "unavailable", "none", ""].includes(String(rawState).trim().toLowerCase());
    // When the raw state doesn't match any known vocabulary, show it as-is
    // instead of a generic "Unknown" label, which is common for custom template
    // sensors (e.g. power-threshold based presence) whose wording we can't
    // guess. Falls back to the translated label when there's truly no data.
    // state_show_raw opts into always showing the raw text (still colored/
    // animated per the detected category) for setups without a real
    // appliance integration, where the category label alone loses the
    // user's own wording.
    // Never echo the raw state when it came from the power meter: the "raw"
    // text there is a wattage, which is not a state anyone wants to read.
    let stateLabel = !powerDerived && (cfg.state_show_raw || norm === "unknown") && !rawIsMeaningless
      ? (cfg.state_show_raw ? rawStateText(hass, st, rawState, cfg) : translatedOrClean(hass, st, rawState, cfg))
      : t(hass, norm);
    if (offHidden) stateLabel = t(hass, "ac_off");

    // A card with no state entity is named after its type, and a tap opens
    // what it reads in its place.
    const name = cfg.name || defaultCardName(hass, cfg.state_entity, st) || cfg.state_entity || t(hass, `type_${applianceType}`);
    const tapFallback = noStateSourceOf(cfg, applianceType);

    // Program
    let programText = null;
    if (!offHidden) {
      // During a cycle the running programme comes first: a selected-programme
      // entity can go blank once the cycle starts (#92). Between cycles it is
      // the other way round, so the line shows what the menu will change.
      const ids = betweenCycles(norm) ? [cfg.program_entity, cfg.active_program_entity] : [cfg.active_program_entity, cfg.program_entity];
      for (const id of ids) {
        const pst = id ? stateObj(hass, id) : null;
        if (pst && !["unknown", "unavailable"].includes(pst.state)) {
          programText = cap.printer3d ? printerFileName(pst.state) : programLabel(hass, pst, pst.state, cfg);
          break;
        }
      }
    }

    // Remaining time / progress
    let remSec = null;
    if (cfg.remaining_time_entity && !offHidden) {
      // remaining_time_hide_when_idle cross-references the already-normalized
      // machine state so stale completion timestamps (integrations like
      // Samsung SmartThings keep reporting a past cycle's finish time after
      // the appliance goes idle) don't show a leftover "remaining time".
      // A printer keeps its last job's times once it is done with it, so it
      // hides them outside a job unless told otherwise; a pause is still one.
      const hideIdle = cfg.remaining_time_hide_when_idle !== undefined ? cfg.remaining_time_hide_when_idle : !!cap.printer3d || !!cap.ntDryer;
      if (!hideIdle || isActiveState(norm) || (cap.printer3d && norm === "paused")) {
        remSec = remainingSeconds(hass, cfg.remaining_time_entity, cfg.remaining_time_unit);
      }
    }

    // Progress is the time the cycle has run over that time plus what is
    // left. The start is when the state turned to running, which Home
    // Assistant carries with the state, so reopening the page mid-cycle no
    // longer starts the bar from zero. Pauses are taken out of the time run.
    let progressPct = null;
    const role = cycleRole(norm);
    const nowMs = Date.now();
    // When the state moved. A state derived from the power meter has no such
    // moment of its own, and a fixture or a bare state may carry none.
    const since = !powerDerived && st && Number.isFinite(Date.parse(st.last_changed))
      ? Date.parse(st.last_changed)
      : nowMs;
    // Only a cycle measured against its remaining time needs a start. A
    // progress entity says it all, and a kettle has no cycle to time.
    // The elapsed time needs one too (HACF): a plug alone says nothing of the
    // time left, but it does say since when the machine has been running.
    const elapsedWanted = !!cfg.show_elapsed;
    if (role === "out" || ((cfg.progress_entity || !cfg.remaining_time_entity) && !elapsedWanted)) {
      this._cycle = null;
    } else if (!this._cycle) {
      // A gap opens nothing: the card waits for a state it can read.
      if (role !== "gap") {
        // Opened in the middle of a cycle, or on a state the card never saw
        // begin: the last change is only a phase, a pause or a restart away
        // from the real start, which the state history still holds.
        const seenStart = this._prevNormState !== null && cycleRole(this._prevNormState) === "out";
        this._cycle = { start: since, pausedMs: 0, pausedSince: role === "paused" ? since : null };
        if (!seenStart && !powerDerived) this._lookUpCycle(this._cycle, cfg, applianceType);
        else if (!seenStart && powerDerived && elapsedWanted) this._lookUpPowerCycle(this._cycle, cfg, threshold);
      }
    } else if (role === "paused" && this._cycle.pausedSince === null) {
      this._cycle.pausedSince = since;
    } else if (role === "active" && this._cycle.pausedSince !== null) {
      this._cycle.pausedMs += Math.max(0, since - this._cycle.pausedSince);
      this._cycle.pausedSince = null;
    }
    if (cfg.progress_entity) {
      const p = numericState(hass, cfg.progress_entity);
      if (p !== null) progressPct = Math.max(0, Math.min(100, p));
    } else if (remSec !== null) {
      if (role === "active" && this._cycle) {
        const c = this._cycle;
        const ranMs = Math.max(0, nowMs - c.start - c.pausedMs);
        const totalMs = ranMs + remSec * 1000;
        if (totalMs > 0) progressPct = Math.min(100, (ranMs / totalMs) * 100);
      } else if (norm === "done") {
        progressPct = 100;
      }
    }
    this._prevNormState = norm;

    // A finish time does not change while the minutes run out, so nothing
    // pushes an update: the card keeps its own beat while it counts down.
    const remTs = cfg.remaining_time_entity ? stateObj(hass, cfg.remaining_time_entity) : null;
    this._countingDown = role === "active" && remSec !== null
      && !!remTs && remTs.attributes.device_class === "timestamp";
    this._clearCountdownTimer();
    if (this._countingDown) {
      if (!this._inert) this._countdownTimer = setInterval(() => this._render(), COUNTDOWN_TICK_MS);
    }

    // Door
    let doorOpen = false;
    if (cfg.door_entity) {
      const dst = stateObj(hass, cfg.door_entity);
      if (dst) {
        doorOpen = doorStateOpen(dst.state, cfg);
        if (cfg.door_invert) doorOpen = !doorOpen;
      }
    }

    // Alerts
    const alerts = cfg.alerts_entity ? activeAlerts(hass, cfg.alerts_entity) : [];

    // Phase is optional. A phase sensor is useful for richer dishwasher
    // animation, but integrations that do not expose one must render exactly
    // as before. Unknown vendor phases are intentionally ignored as well.
    const phaseState = cfg.phase_entity ? stateObj(hass, cfg.phase_entity) : null;
    let phase = phaseState ? normalizeDishwasherPhase(phaseState.state, cfg.phase_map) : "";

    // A washer-dryer's drum shows water or hot air, read from the step it is
    // at: from its own state or, when the state stays at "Running" all the way
    // through, from a phase entity. The phase entity wins, since a machine
    // that has one says nothing in its state. Outside a cycle there is no step
    // to show.
    const washerDryer = applianceType === "washer" && isWasherDryer(cfg, st);
    let laundryPhase = "";
    if (!washerDryer || (!isActiveState(norm) && norm !== "paused")) {
      this._wdDrying = false;
    } else {
      laundryPhase = (phaseState ? laundryPhaseOf(phaseState.state, cfg.phase_map) : "")
        || laundryPhaseOf(rawState, cfg.state_map);
      // The drum keeps the last step it was told. A cycle that finishes its
      // drying on an anti-crease or a cool-down names no step at all, and
      // filling the drum with water again at that point would be a plain lie.
      if (laundryPhase) this._wdDrying = laundryPhase === "drying";
    }

    // The step itself, named on the state line while the machine runs (issue
    // #18): Washing, Rinsing, Spinning rather than an hour of "Running". It
    // comes from the same two places. A phase entity's own words are shown
    // even when the card does not know them, since naming the step is what
    // such an entity is for; the state names a step only in a word the card
    // recognises. Paused, finished or delayed say more than any step. Only the
    // words change: the remaining time and the bar stay the whole cycle's.
    let step = null;
    if (LAUNDRY_TYPES.includes(applianceType) && isActiveState(norm)) {
      step = phaseState ? phaseStepOf(phaseState.state, cfg.phase_map) : null;
      if (!step) {
        const own = stateStepOf(rawState, cfg.state_map);
        if (own) step = { step: own };
      }
      // Nothing names the step, but the plug's meter tells it: a washer
      // heating its water draws a kilowatt or two, its motor spinning the drum
      // a few hundred watts, and much less while it tumbles the wash; a
      // dishwasher heats, washes, then dries on next to nothing; a dryer
      // heats its air, then cools the load with the heater off.
      if (!step && powerDerived && watts !== null && !washerDryer) {
        const num = (v, d) => { const n = parseFloat(v); return isFinite(n) && n > 0 ? n : d; };
        const heatAt = num(cfg.heat_threshold, applianceType === "dryer" ? DRYER_HEAT_W : WASH_HEAT_W);
        const own = applianceType === "washer" ? (watts >= heatAt ? "heating" : watts >= num(cfg.spin_threshold, WASH_SPIN_W) ? "spinning" : "washing")
          : applianceType === "dishwasher" ? (watts < threshold ? "drying" : watts >= heatAt ? "heating" : "washing")
          : watts >= heatAt ? "drying" : "cooling";
        step = { step: own, power: true };
        if (applianceType === "dishwasher" && !phase) phase = own === "drying" ? "drying" : "mainwash";
      }
      if (step && !cfg.state_show_raw) stateLabel = step.step ? t(hass, `step_${step.step}`) : step.text;
    }

    // Extra info chips
    const infoEntities = (cfg.info_entities || [])
      .slice(0, INFO_MAX)
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

    // ---- Type-specific readings -------------------------------------------
    const extraLines = [];
    // Sliders under the lines, for a value the card sets itself (an ERV's
    // speed in Manual, its humidity setpoint).
    const sliders = [];
    let heatBarPct = null;
    let filterPct = null;

    // Oven / microwave: light, heat and what the front display shows.
    let lit = false;
    if (cap.light && cfg.light_entity) {
      const lst = stateObj(hass, cfg.light_entity);
      lit = !!lst && ["on", "true"].includes(String(lst.state).toLowerCase());
    }

    let heating = false;
    let displayText = "";
    if (cap.temperature) {
      const target = cfg.target_temperature_entity ? numericState(hass, cfg.target_temperature_entity) : null;
      const current = cfg.current_temperature_entity ? numericState(hass, cfg.current_temperature_entity) : null;
      const unit = temperatureUnit(hass, cfg.target_temperature_entity || cfg.current_temperature_entity);
      if (cfg.heating_entity) {
        const hst = stateObj(hass, cfg.heating_entity);
        heating = !!hst && ["on", "true", "heating"].includes(String(hst.state).toLowerCase());
      } else {
        heating = isActiveState(norm);
      }
      if (target !== null) displayText = `${Math.round(target)}\u00b0`;
      if (current !== null || target !== null) {
        extraLines.push({
          key: "temperature",
          icon: "mdi:thermometer",
          label: t(hass, "temperature"),
          value: current !== null && target !== null
            ? `${Math.round(current)} ${unit} \u2192 ${Math.round(target)} ${unit}`
            : `${Math.round(current !== null ? current : target)} ${unit}`,
        });
      }
      // While the oven is still climbing, the bar is far more useful as a
      // preheat gauge than as a cycle progress bar.
      if (heating && current !== null && target !== null && target > 0 && current < target) {
        heatBarPct = Math.max(0, Math.min(100, (current / target) * 100));
      }
    } else {
      heating = isActiveState(norm);
    }

    if (cap.powerLevel && cfg.power_level_entity) {
      const plst = stateObj(hass, cfg.power_level_entity);
      if (plst && !["unknown", "unavailable"].includes(plst.state)) {
        extraLines.push({
          key: "power_level",
          icon: "mdi:signal-cellular-2",
          label: t(hass, "power_level"),
          value: formatInfoValue(plst, hass, null, cfg, cfg.power_level_entity),
        });
      }
    }
    if (["microwave", "coffee", "rice_cooker"].includes(applianceType) && remSec !== null && remSec > 0) {
      displayText = formatClock(remSec);
    }
    // A washer or a dryer counts in hours and minutes, as theirs do: 0:23.
    if (["washer", "dryer"].includes(applianceType) && remSec !== null && remSec > 0) {
      const min = Math.ceil(remSec / 60);
      displayText = `${Math.floor(min / 60)}:${String(min % 60).padStart(2, "0")}`;
    }

    // Hood: fan speed, light and filter wear.
    let fan = { level: 0, boost: false, percentage: null, preset: null };
    if (cap.fan) {
      fan = hoodFanState(hass, cfg, norm);
      // Shown even at rest: this line is what opens the speed entity, so
      // hiding it while the hood is off removes the only way to set it.
      if (!cfg.fan_entity && fan.powerLevel && isActiveState(norm)) {
        extraLines.push({ key: "fan_speed", icon: "mdi:fan", label: t(hass, "fan_speed"), value: `${fan.powerLevel} / 3`, entity: cfg.power_entity });
      }
      if (cfg.fan_entity) {
        // A speed entity that dropped out while the hood runs is unknown, not
        // zero; once the hood is off, "off" is the truthful reading.
        const fanLost = !entityUsable(hass, cfg.fan_entity) && norm !== "idle";
        extraLines.push({
          key: "fan_speed",
          icon: "mdi:fan",
          label: t(hass, "fan_speed"),
          value: fanLost
            ? "--"
            : fan.level === 0
            ? t(hass, "off_short")
            : fan.boost
              ? t(hass, "boost")
              : fan.percentage !== null
                ? `${Math.round(fan.percentage)} %`
                : fan.label || String(fan.level),
          entity: cfg.fan_entity,
        });
      }
    }
    if (cap.filter && cfg.filter_life_entity) {
      const f = numericState(hass, cfg.filter_life_entity);
      // Worn out rather than left (SmartThings' usage), or hours and counts
      // that are no percentage at all (Electrolux, hOn): shown as they come.
      const fUnit = unitOf(hass, cfg.filter_life_entity) || "";
      const fWorn = /usage|used/i.test(cfg.filter_life_entity);
      const fPct = fUnit === "%" || (!fUnit && /life|remain/i.test(cfg.filter_life_entity));
      if (f !== null && (fPct || fWorn)) {
        filterPct = Math.max(0, Math.min(100, fWorn ? 100 - f : f));
        extraLines.push({
          key: "filter",
          icon: "mdi:air-filter",
          label: t(hass, "filter"),
          value: `${Math.round(filterPct)} %`,
          warn: filterPct <= 15,
        });
      } else if (f !== null) {
        extraLines.push({ key: "filter", icon: "mdi:air-filter", label: t(hass, "filter"), value: keepTogether(`${Math.round(f)}${fUnit ? ` ${fUnit}` : ""}`) });
      }
    }

    // Cooktop: one entry per zone, plus the child lock.
    let zones = [];
    let childLock = false;
    if (cap.zones) {
      const configured = (cfg.zones || []).filter((z) => z && (z.level_entity || z.residual_heat_entity));
      if (configured.length) {
        zones = configured.map((z) => ({ ...zoneState(hass, z), title: z.name || "" }));
      } else {
        // Nothing but an on/off signal: show that it heats without inventing
        // a level or a zone we have no data for. Home Connect hobs are exactly
        // this case: they report a global power level but never say which
        // zone it belongs to.
        const on = isActiveState(norm);
        let intensity = on ? 0.3 : 0;
        if (on && cfg.power_level_entity) {
          const gl = numericState(hass, cfg.power_level_entity);
          if (gl !== null && gl > 0) intensity = Math.max(0.2, Math.min(1, gl / 9));
        }
        zones = Array.from({ length: cfg.zones_count || 4 }, () => ({
          on, label: "", intensity, residual: false, max: false, title: "",
        }));
        // A hob on a plug: what it draws, spread over as many zones as it
        // takes at a zone's power each, the level on each from 1 to 9. A zone
        // just turned off stays hot for a while, and says H.
        if (powerDerived && watts !== null && !cfg.power_level_entity) {
          const zp = parseFloat(cfg.zone_power) > 0 ? parseFloat(cfg.zone_power) : ZONE_POWER_W;
          const n = on ? Math.max(1, Math.min(zones.length, Math.ceil(watts / (zp * 1.4)))) : 0;
          const lv = n ? Math.max(1, Math.min(9, Math.round((watts / n) / zp * 9))) : 0;
          const now = Date.now();
          this._zoneHot = (this._zoneHot || []).slice(0, zones.length);
          zones = zones.map((z, i) => {
            if (i < n) {
              this._zoneHot[i] = now;
              return { ...z, on: true, label: String(lv), intensity: Math.max(0.2, lv / 9), max: lv >= 9 };
            }
            const hot = this._zoneHot[i] && now - this._zoneHot[i] < ZONE_RESIDUAL_MS;
            return { ...z, on: false, intensity: 0, label: hot ? "H" : "", residual: !!hot };
          });
          const left = zones.map((z, i) => (z.residual ? ZONE_RESIDUAL_MS - (now - this._zoneHot[i]) : Infinity));
          if (Math.min(...left) < Infinity) this._armOffDelay(Math.min(...left));
          if (n) extraLines.push({ key: "zones", icon: "mdi:circle-slice-8", label: t(hass, "section_zones"), value: `${n} / ${zones.length}` });
          // A hob is never "finished": off, it is at rest, or still hot.
          if (!n && norm !== "off") {
            norm = "idle";
            const warm = zones.some((z) => z.residual);
            if (!cfg.state_show_raw) stateLabel = t(hass, warm ? "residual_heat" : "idle");
            color = warm ? "#ff7043" : STATE_COLORS.idle;
          }
        }
      }
      if (cfg.power_level_entity) {
        const plst = stateObj(hass, cfg.power_level_entity);
        if (plst && !["unknown", "unavailable"].includes(plst.state)) {
          extraLines.push({
            key: "power_level",
            icon: "mdi:speedometer",
            label: t(hass, "power_level"),
            value: formatInfoValue(plst, hass, null, cfg, cfg.power_level_entity),
            entity: cfg.power_level_entity,
          });
        }
      }
      const active = zones.filter((z) => z.on).length;
      if (configured.length && active > 0) {
        extraLines.push({
          key: "zones",
          icon: "mdi:circle-slice-8",
          label: t(hass, "section_zones"),
          value: `${active} / ${zones.length}`,
        });
      }
      if (cfg.child_lock_entity) {
        const clst = stateObj(hass, cfg.child_lock_entity);
        // A lock sensor is on while unlocked (hOn).
        const clRaw = clst ? String(clst.state).toLowerCase() : "";
        childLock = !!clst && (domainOf(cfg.child_lock_entity) === "binary_sensor" && (clst.attributes || {}).device_class === "lock" ? clRaw === "off" : ["on", "true", "locked"].includes(clRaw));
        if (childLock) {
          extraLines.push({ key: "child_lock", icon: "mdi:lock", label: t(hass, "child_lock"), value: "" });
        }
      }
    }

    // ---- Fridge -----------------------------------------------------------
    // Read-only by design: a fridge exposes nothing to press, so the card
    // reports and never commands. The state line is a health summary instead
    // of a cycle, because "running" is true of a fridge every hour of its life
    // and therefore says nothing.
    let fridgeCtx = null;
    if (cap.fridgeTemp) {
      const unit = temperatureUnit(hass, cfg.fridge_temperature_entity || cfg.freezer_temperature_entity);
      // Configured but silent is not the same as not configured: a Zigbee probe
      // keeps reporting after the plug is pulled, and one that stops must show
      // dashes rather than a stale number. Nothing is drawn without an entity.
      const readTemp = (entityId) => {
        if (!entityId) return { value: null, text: undefined };
        const v = tempState(hass, entityId);
        return v === null
          ? { value: null, text: "--\u00b0" }
          : { value: v, text: screenTemp(hass, cfg, entityId, v) };
      };
      const fridgeT = readTemp(cfg.fridge_temperature_entity);
      const freezerT = readTemp(cfg.freezer_temperature_entity);
      // A wine cooler keeps 10 to 14 degrees on purpose; past 18 the wine suffers.
      const wine = cfg.fridge_layout === "wine";
      // A chest or a drawer freezer keeps its food frozen: -12 and up is warm.
      const coldBox = ["chest", "drawers"].includes(cfg.fridge_layout);
      const maxTemp = cfg.fridge_max_temperature === undefined || cfg.fridge_max_temperature === ""
        ? (wine ? 18 : coldBox ? -12 : 8)
        : parseFloat(cfg.fridge_max_temperature);
      const probe = coldBox && freezerT.value !== null ? freezerT : fridgeT;
      const tempHigh = probe.value !== null && isFinite(maxTemp) && probe.value > maxTemp;

      let freezerDoorOpen = false;
      if (cfg.freezer_door_entity) {
        const fdst = stateObj(hass, cfg.freezer_door_entity);
        if (fdst) {
          freezerDoorOpen = doorStateOpen(fdst.state, cfg);
          if (cfg.door_invert) freezerDoorOpen = !freezerDoorOpen;
        }
      }

      // Below the threshold is only worth reporting once it has lasted: a plug
      // emits isolated zeroes while everything is fine.
      // Only the plug's own switch can say the fridge is unplugged, and it says
      // so at once. A meter at 0 W only says the fridge draws nothing, which a
      // compressor pause does too, sometimes for longer than half an hour.
      let unplugged = false;
      if (cfg.plug_entity) {
        const pst = stateObj(hass, cfg.plug_entity);
        unplugged = !!pst && ["off", "false"].includes(String(pst.state).toLowerCase());
      }
      const afterMin = parseFloat(cfg.no_power_after);
      const afterMs = Number.isFinite(afterMin) && afterMin > 0 ? afterMin * 60000 : FRIDGE_UNPLUGGED_AFTER_MS;
      // No power draw has a threshold of its own, 1 W by default: a fridge
      // resting at 18 W between two cooling runs at 60 W draws plenty, and
      // the cooling threshold set between the two must not count it as off.
      const noPowerW = parseFloat(cfg.no_power_threshold);
      const noPowerThreshold = Number.isFinite(noPowerW) && noPowerW >= 0 ? noPowerW : 1;
      let noPower = false;
      let belowMs = 0;
      if (cfg.power_entity && watts !== null && watts < noPowerThreshold) {
        if (!this._belowSince) this._belowSince = changedSinceOf(stateObj(hass, cfg.power_entity));
        belowMs = Date.now() - this._belowSince;
        noPower = belowMs >= afterMs;
      } else {
        this._belowSince = null;
      }
      // This line reads the clock, not the state: a plug sitting at 0 W stops
      // changing, so nothing pushes an update and the count would freeze where
      // it started. The card keeps its own beat while it is counting, which
      // also covers the moment the thirty minutes are up.
      this._clearClockTimer();
      if (this._belowSince) {
        if (!this._inert) this._clockTimer = setInterval(() => this._render(), CLOCK_TICK_MS);
      }

      // The power threshold tells cooling from resting.
      const cooling = cfg.power_entity && watts !== null && isFinite(threshold) ? watts >= threshold : null;
      norm = fridgeHealth(unplugged, noPower, doorOpen || freezerDoorOpen, tempHigh, cooling);
      color = STATE_COLORS[norm];
      // Both words already exist: the air conditioner's "Cooling" and "Standby",
      // so every language has them.
      stateLabel = t(hass, { fridge_cooling: "ac_cooling", fridge_standby: "ac_idle" }[norm] || norm);

      const twoDoors = !!(cfg.door_entity && cfg.freezer_door_entity);
      // Each door line has its key, so the line order can place it: the
      // fridge's door, the freezer's, and the one line both make once shut.
      const doorLine = (key, open, openKey) => ({
        key,
        icon: open ? "mdi:door-open" : "mdi:door-closed",
        label: t(hass, open ? openKey : "door_closed"),
        value: "",
        warn: open,
      });
      if (!cfg.door_hide_in_list) {
        if (twoDoors && !doorOpen && !freezerDoorOpen) {
          // Naming each compartment only to say "closed" twice reads as noise;
          // one line says the same thing.
          extraLines.push({ key: "doors", icon: "mdi:door-closed", label: t(hass, "doors_closed"), value: "" });
        } else {
          if (cfg.door_entity && (!twoDoors || doorOpen)) {
            extraLines.push(doorLine("door", doorOpen, twoDoors ? "fridge_door_open" : "door_open"));
          }
          if (cfg.freezer_door_entity && (!twoDoors || freezerDoorOpen)) {
            extraLines.push(doorLine(twoDoors ? "freezer_door" : "door", freezerDoorOpen, twoDoors ? "freezer_door_open" : "door_open"));
          }
        }
      }
      if (cfg.fridge_temperature_entity && !cfg.temperature_hide_in_list) {
        extraLines.push({
          key: "fridge_temp",
          icon: "mdi:thermometer",
          label: t(hass, wine ? "temperature" : "fridge_compartment"),
          value: fridgeT.value === null ? "--" : tempText(hass, cfg, cfg.fridge_temperature_entity, fridgeT.value, unit),
          warn: tempHigh,
          entity: cfg.fridge_temperature_entity,
        });
      }
      if (cfg.freezer_temperature_entity && !cfg.temperature_hide_in_list) {
        extraLines.push({
          key: "freezer_temp",
          icon: "mdi:snowflake",
          label: t(hass, "freezer_compartment"),
          value: freezerT.value === null ? "--" : tempText(hass, cfg, cfg.freezer_temperature_entity, freezerT.value, unit),
          entity: cfg.freezer_temperature_entity,
        });
      }
      let ice;
      if (cfg.ice_maker_entity) {
        const ist = stateObj(hass, cfg.ice_maker_entity);
        ice = !!ist && ["on", "true", "running"].includes(String(ist.state).toLowerCase());
        extraLines.push({
          key: "ice_maker",
          icon: "mdi:snowflake-variant",
          label: t(hass, "ice_maker"),
          value: t(hass, ice ? "ice_on" : "ice_off"),
          entity: cfg.ice_maker_entity,
        });
      }
      if (cfg.power_entity && watts !== null) {
        extraLines.push({
          key: "power",
          icon: cfg.power_icon || "mdi:power-plug",
          label: t(hass, "power"),
          // While the plug reads low, how long it has been low is the whole
          // point: it is what separates a compressor pause from an unplugged fridge.
          value: this._belowSince
            ? `${Math.round(watts)} ${unitOf(hass, cfg.power_entity) || "W"} \u00b7 ${t(hass, "since")} ${formatDuration(Math.round(belowMs / 1000), hass)}`
            : `${Math.round(watts)} ${unitOf(hass, cfg.power_entity) || "W"}`,
          warn: unplugged,
          caution: noPower,
          entity: cfg.power_entity,
        });
      }

      fridgeCtx = {
        layout: cfg.fridge_layout || "freezer_bottom",
        fridgeTemp: fridgeT.text,
        freezerTemp: freezerT.text,
        fridgeWarn: tempHigh || unplugged,
        // No current, no light: the cabinet goes dark behind the glass.
        dark: unplugged || noPower,
        freezerDoorOpen,
        ice,
        coldBox,
        cooling,
        coldText: freezerT.value !== null ? tempText(hass, cfg, cfg.freezer_temperature_entity, freezerT.value, unit)
          : fridgeT.value !== null ? tempText(hass, cfg, cfg.fridge_temperature_entity, fridgeT.value, unit)
          : cfg.freezer_temperature_entity || cfg.fridge_temperature_entity ? "--" : "",
      };
    } else {
      this._clearClockTimer();
      this._belowSince = null;
    }

    // Cooker: the blade turns at the speed the appliance reports, and the
    // temperature block above already drives the heat and the preheat gauge.
    let mixer = { level: 0, label: "" };
    if (cap.speed && cfg.speed_entity) {
      mixer = mixerSpeed(hass, cfg);
      extraLines.push({
        key: "speed",
        icon: "mdi:blender",
        label: t(hass, "speed"),
        value: mixer.level === 0 ? t(hass, "off_short") : mixer.label,
        entity: cfg.speed_entity,
      });
    }

    // Coffee machine: the three consumables are why one goes on a dashboard,
    // and Home Connect reports each as its own event
    // (ConsumerProducts.CoffeeMaker.Event.WaterTankEmpty and friends).
    let coffeeCtx = null;
    if (cap.consumables) {
      const flagged = (entityId, onStates) => {
        if (!entityId) return null;
        const cst = stateObj(hass, entityId);
        if (!cst || ["unknown", "unavailable"].includes(String(cst.state).toLowerCase())) return null;
        return onStates.includes(String(cst.state).toLowerCase());
      };
      const ON = ["on", "true", "present", "confirmed"];
      // The water tank comes in two shapes. Home Connect fires an event, so the
      // entity is a boolean; a filter machine reports a level, and there the
      // useful reading is how much is left, not just whether it ran out.
      let waterPct = null;
      let noWater = null;
      if (cfg.water_entity) {
        const lvl = numericState(hass, cfg.water_entity);
        if (lvl !== null) {
          waterPct = Math.max(0, Math.min(100, lvl));
          noWater = waterPct <= 10;
        } else {
          noWater = flagged(cfg.water_entity, ON);
        }
      }
      // Philips gives the beans as a level.
      const beansLevel = cfg.beans_entity ? numericState(hass, cfg.beans_entity) : null;
      const noBeans = beansLevel !== null ? beansLevel <= 0 : flagged(cfg.beans_entity, ON);
      const trayFull = flagged(cfg.tray_entity, ON);
      const descale = flagged(cfg.descaling_entity, ON);
      // Order of what stops you getting a coffee first.
      const need = noWater ? "water_empty"
        : noBeans ? "beans_empty"
          : trayFull ? "tray_full"
            : descale ? "descale" : null;
      // A consumable never overrides a cycle in progress: while the machine is
      // actually pouring, that is the more useful thing to read. Home Connect
      // stops the machine on an empty tank anyway, so the two rarely collide.
      if (need && !["running", "preheating", "paused", "error"].includes(norm)) {
        norm = need;
        color = STATE_COLORS[need];
        stateLabel = t(hass, need);
      }
      for (const [flag, key] of [[noWater, "water_empty"], [noBeans, "beans_empty"],
                                 [trayFull, "tray_full"], [descale, "descale"]]) {
        // Only what needs doing takes a line. A machine with nothing wrong says
        // so on its state line already.
        if (flag) extraLines.push({ key, icon: "mdi:alert-circle-outline", label: t(hass, key), value: "", warn: true });
      }
      const cupInfo = cupCount(hass, cfg.cups_entity);
      if (cfg.cups_entity && cupInfo.label) {
        extraLines.push({
          key: "cups",
          icon: "mdi:coffee-outline",
          label: t(hass, "cups"),
          value: cupInfo.label,
          entity: cfg.cups_entity,
        });
      }
      const strength = strengthLevel(hass, cfg.strength_entity);
      if (cfg.strength_entity && strength.label) {
        extraLines.push({
          key: "strength",
          icon: "mdi:coffee-maker",
          label: t(hass, "strength"),
          value: strength.label,
          entity: cfg.strength_entity,
        });
      }
      if (waterPct !== null) {
        extraLines.push({
          key: "water",
          icon: "mdi:cup-water",
          label: t(hass, "section_water"),
          value: `${Math.round(waterPct)} %`,
          warn: !!noWater,
          entity: cfg.water_entity,
        });
      }
      coffeeCtx = {
        noWater: !!noWater, noBeans: !!noBeans, trayFull: !!trayFull,
        waterPct, cups: cupInfo.cups, strength: strength.level,
      };
    }

    const isOn = (id) => {
      const os = stateObj(hass, id);
      // ebusd publishes some demands as yes/no rather than on/off.
      return !!os && ["on", "true", "yes", "heating", "active"].includes(String(os.state).toLowerCase());
    };

    // Water heater. A tank never finishes, so a power meter falling back under
    // its threshold means it is waiting again, not that something is done.
    let tankTemp = null;
    let tankHeating = false;
    if (cap.tankTemp) {
      // A water_heater entity reports its mode, never whether it heats: "on" is
      // Overkiz's standard mode. Only an indicator, a power meter or MELCloud's
      // status attribute can say the tank is heating; without one, the card
      // shows the mode and leaves the element cold.
      const tankEntity = /^water_heater\./.test(cfg.state_entity || "");
      const tankStatus = tankEntity && st ? String(st.attributes.status || "").toLowerCase() : "";
      let tankLabel = null;
      if (cfg.heating_entity) {
        tankHeating = isOn(cfg.heating_entity);
        tankLabel = t(hass, tankHeating ? "kettle_heating" : "standby");
      } else if (tankEntity && !powerDerived) {
        if (MELCLOUD_STATUSES.includes(tankStatus)) {
          tankHeating = tankStatus === "heat_water";
          tankLabel = t(hass, tankHeating ? "kettle_heating" : "standby");
        } else if (["off", "idle"].includes(String(rawState).trim().toLowerCase())) {
          tankLabel = t(hass, "standby");
        } else if (String(rawState).trim().toLowerCase() === "heating") {
          // Aquarea says it in its state: heating, idle, off.
          tankHeating = true;
          tankLabel = t(hass, "kettle_heating");
        } else if (!rawIsMeaningless) {
          tankLabel = modeLabel(hass, st, rawState, cfg);
        }
      } else {
        tankHeating = isActiveState(norm);
        if (["running", "idle", "done"].includes(norm)) tankLabel = t(hass, tankHeating ? "kettle_heating" : "standby");
      }
      if (tankLabel !== null) {
        if (!cfg.state_show_raw) stateLabel = tankLabel;
        color = tankHeating ? "#ff7043" : STATE_COLORS.idle;
      }
      let wv = cfg.temperature_entity ? numericState(hass, cfg.temperature_entity) : null;
      let wunit = temperatureUnit(hass, cfg.temperature_entity || cfg.state_entity);
      // A water_heater entity carries its own reading; nothing else to configure.
      if (wv === null && st && /^water_heater\./.test(cfg.state_entity || "")) {
        const a = parseFloat(st.attributes.current_temperature);
        if (Number.isFinite(a)) wv = a;
      }
      if (wv !== null) {
        tankTemp = /F/.test(wunit) ? (wv - 32) * 5 / 9 : wv;
        displayText = screenTemp(hass, cfg, cfg.temperature_entity, wv);
        extraLines.push({
          key: "temperature",
          icon: "mdi:thermometer-water",
          label: t(hass, "temperature"),
          value: tempText(hass, cfg, cfg.temperature_entity, wv, wunit),
          entity: cfg.temperature_entity,
        });
      }
    }

    // Combi boiler. Two optional indicators say it outright; otherwise the state
    // entity's words or panel codes do; failing both, a burner that is lit at
    // least says it is heating something.
    let boilerMode = "";
    let boilerThermo = null;
    let boilerRoom = null;
    if (cap.boilerMode) {
      if (cfg.hot_water_entity || cfg.heating_entity) {
        // Hot water takes priority on a combi boiler, so it wins a tie.
        // Both off while the flame is lit (frost protection, or only one of the
        // two indicators configured) is still a burner at work.
        boilerMode = cfg.hot_water_entity && isOn(cfg.hot_water_entity) ? "hot_water"
          : cfg.heating_entity && isOn(cfg.heating_entity) ? "space_heating"
          // InComfort's and EMS-ESP's state says it where their contacts do not.
          : (!powerDerived && boilerModeOf(rawState, cfg.state_map)) || (isActiveState(norm) ? "burner" : "idle");
      } else if (!powerDerived) {
        boilerMode = boilerModeOf(rawState, cfg.state_map);
        // A climate entity (Remeha) says what it does in its action; its state
        // is the mode it was set to.
        const boilerAction = /^climate\./.test(cfg.state_entity || "") && st ? String(st.attributes.hvac_action || "") : "";
        if (boilerAction) boilerMode = boilerAction === "heating" ? "space_heating" : "idle";
      }
      // A water_heater's state is a mode the user picked (ViCare's and
      // Overkiz's "on"), never a lit burner.
      const boilerMoot = !boilerMode && !powerDerived && /^(water_heater|climate)\./.test(cfg.state_entity || "") && String(rawState).trim().toLowerCase() !== "off";
      if (boilerMoot) {
        if (!cfg.state_show_raw && !rawIsMeaningless) stateLabel = modeLabel(hass, st, rawState, cfg);
        color = STATE_COLORS.idle;
      } else if (!boilerMode) {
        if (isActiveState(norm)) boilerMode = "burner";
        else if (norm === "idle" || norm === "done") boilerMode = "idle";
      }
      if (boilerMode) {
        if (!cfg.state_show_raw) stateLabel = t(hass, boilerMode === "idle" ? "standby" : `boiler_${boilerMode}`);
        color = boilerMode === "hot_water" ? "#ef5350"
          : boilerMode === "idle" || boilerMode === "waiting" ? STATE_COLORS.idle : "#ff7043";
      }
      // InComfort's faults: flame_detection_fault_e6, no_flame_signal_e4.
      const boilerRawLow = String(rawState === undefined || rawState === null ? "" : rawState).trim().toLowerCase();
      if (!powerDerived && /fault|_e\d+$/.test(boilerRawLow)) {
        boilerMode = "";
        if (!cfg.state_show_raw) stateLabel = translatedOrClean(hass, st, rawState, cfg);
        color = STATE_COLORS.error;
      }
      // Its room thermostat, on the wall beside it: the room and the setpoint
      // on a line of their own, and the thermostat drawn.
      const tst = cfg.thermostat_entity ? stateObj(hass, cfg.thermostat_entity) : null;
      if (tst && !["unknown", "unavailable"].includes(tst.state)) {
        const ta = tst.attributes || {};
        const tmode = thermostatModeOf(tst);
        const room = numberOrNull(ta.current_temperature), target = numberOrNull(ta.temperature);
        boilerRoom = room === null ? null : { key: "room_temp", icon: "mdi:home-thermometer-outline", label: t(hass, "ps_line_room"), entity: cfg.thermostat_entity,
          value: thermoLine(hass, cfg, cfg.thermostat_entity, room, tmode === "off" ? null : target) };
        boilerThermo = { ...thermoFace(hass, cfg, room, target), mode: tmode || "idle", eco: !!thermostatPresetOf(ta.preset_mode) && tmode === "idle",
          layout: TH_LAYOUTS.slice(0, 3).includes(cfg.thermostat_layout) ? cfg.thermostat_layout : thermostatLayoutOf({ state_entity: cfg.thermostat_entity }, tst) === "round" ? "round"
            : thermostatLayoutOf({ state_entity: cfg.thermostat_entity }, tst) === "glass" ? "glass" : "square" };
      }
      let bv = cfg.temperature_entity ? numericState(hass, cfg.temperature_entity) : null;
      // InComfort's water_heater entity carries the boiler temperature itself.
      if (bv === null && st && /^water_heater\./.test(cfg.state_entity || "")) {
        const a = parseFloat(st.attributes.current_temperature);
        if (Number.isFinite(a)) bv = a;
      }
      if (bv !== null) {
        const bunit = temperatureUnit(hass, cfg.temperature_entity || cfg.state_entity);
        displayText = screenTemp(hass, cfg, cfg.temperature_entity, bv);
        extraLines.push({
          key: "temperature",
          icon: "mdi:thermometer",
          label: t(hass, "temperature"),
          value: tempText(hass, cfg, cfg.temperature_entity, bv, bunit),
          entity: cfg.temperature_entity,
        });
      }
      if (boilerRoom) extraLines.push(boilerRoom);
    }

    // 3D printer. The state names the job, a stage entity or the heaters say
    // what the job is doing: most integrations report "printing" from the
    // moment the start code begins heating, so a heater still well below its
    // target at the start of a job is read as preheating.
    let p3 = null;
    if (cap.printer3d) {
      const { mode, phase: statePhase } = printerModeOf(rawState, cfg.state_map);
      let pPhase = statePhase;
      const inJob = mode === "printing" || mode === "preparing";
      const stageSt = cfg.phase_entity ? stateObj(hass, cfg.phase_entity) : null;
      if (stageSt && (inJob || mode === "paused")) {
        const staged = printerPhaseOf(stageSt.state);
        if (staged) pPhase = staged;
      }
      const heater = (curEntity, targetEntity) => {
        const cur = curEntity ? numericState(hass, curEntity) : null;
        let target = targetEntity ? numericState(hass, targetEntity) : null;
        // Creality puts the target in an attribute of the reading.
        if (target === null && curEntity) {
          const a = (stateObj(hass, curEntity) || {}).attributes || {};
          const v = Number(a.target !== undefined ? a.target : a.target_temperature);
          if (a.target !== undefined || a.target_temperature !== undefined) target = Number.isFinite(v) ? v : null;
        }
        return { cur, target, entity: curEntity };
      };
      const nozzle = heater(cfg.nozzle_temperature_entity, cfg.nozzle_target_entity);
      const bed = heater(cfg.bed_temperature_entity, cfg.bed_target_entity);
      const chamber = heater(cfg.chamber_temperature_entity, null);
      const heaters = [nozzle, bed].filter((h) => h.cur !== null && h.target !== null && h.target > 0);
      const warming = heaters.some((h) => h.cur < h.target - P3_HEAT_MARGIN);
      if (inJob && !pPhase && warming && !(progressPct > 1)) pPhase = "preheating";
      // The gauge, whether the printer says it heats (Anycubic, Flashforge)
      // or the card worked it out.
      if ((pPhase === "preheating" || mode === "preheating") && heaters.length) {
        heatBarPct = Math.min(100, ...heaters.map((h) => (h.cur / h.target) * 100));
      }
      const shown = pPhase === "paused" ? "paused" : pPhase && (inJob || mode === "preheating") ? pPhase : mode;
      if (shown) {
        if (!cfg.state_show_raw) stateLabel = t(hass, PRINTER_LABELS[shown]);
        color = PRINTER_COLORS[shown] || STATE_COLORS[PRINTER_NORMS[shown]] || STATE_COLORS.running;
      }
      // A failed job keeps its part on the drawing, in red, at the height it
      // reached.
      const reached = progressPct;
      // Only a job has a progress: an idle printer keeps its last one (a
      // Bambu Lab shows 100 until the next print), which is no longer news.
      if (!(isActiveState(norm) || norm === "paused" || norm === "done")) {
        progressPct = null;
      } else if (norm === "paused" && !(progressPct > 0) && this._p3Pct) {
        // Moonraker drops its progress to 0 while paused: the print did not.
        progressPct = this._p3Pct;
      }
      if (isActiveState(norm) && progressPct > 0) this._p3Pct = progressPct;
      if (!isActiveState(norm) && norm !== "paused") this._p3Pct = null;

      const tLine = (h, key, icon, label) => {
        if (h.cur === null) return;
        const unit = temperatureUnit(hass, h.entity);
        const now = tempText(hass, cfg, h.entity, h.cur, unit);
        const goal = h.target !== null && h.target > 0 ? tempText(hass, cfg, h.entity, h.target, unit) : null;
        extraLines.push({
          key,
          icon,
          label,
          // The target only when there is still a way to go: a bed holding
          // 60 degrees reads 60 degrees, not 60 to 60.
          value: goal !== null && goal !== now ? `${keepTogether(now)} \u2192 ${keepTogether(goal)}` : keepTogether(now),
          entity: h.entity,
        });
      };
      const layer = cfg.current_layer_entity ? numericState(hass, cfg.current_layer_entity) : null;
      if (layer !== null) {
        const total = cfg.total_layers_entity ? numericState(hass, cfg.total_layers_entity) : null;
        extraLines.push({
          key: "layer",
          icon: "mdi:layers-triple-outline",
          label: t(hass, "p3_layer"),
          value: total !== null && total > 0 ? `${Math.round(layer)} / ${Math.round(total)}` : `${Math.round(layer)}`,
          entity: cfg.current_layer_entity,
        });
      }
      tLine(nozzle, "nozzle", "mdi:printer-3d-nozzle-heat-outline", t(hass, "p3_nozzle"));
      tLine(bed, "bed", "mdi:heating-coil", t(hass, "p3_bed"));
      tLine(chamber, "chamber", "mdi:thermometer", t(hass, "p3_chamber"));
      if (nozzle.cur !== null) displayText = screenTemp(hass, cfg, nozzle.entity, nozzle.cur);

      const job = isActiveState(norm) || norm === "paused" || norm === "error";
      const pStyle = printerStyleOf(cfg, st);
      const ams = printerAmsOf(hass, cfg);
      if (ams && ams.active) {
        const as = stateObj(hass, ams.active.entity);
        extraLines.push({ key: "ams_spool", icon: "mdi:printer-3d-nozzle-outline", label: t(hass, "ams_spool"), value: formatInfoValue(as, hass, null, cfg, ams.active.entity), entity: ams.active.entity });
      }
      if (cfg.ams_humidity_entity && ams) {
        const hs = stateObj(hass, cfg.ams_humidity_entity);
        if (hs && !HA_OFFLINE_STATES.includes(String(hs.state).toLowerCase())) extraLines.push({ key: "ams_humidity", icon: "mdi:water-percent", label: t(hass, "ac_line_humidity"), value: keepTogether(formatInfoValue(hs, hass, null, cfg, cfg.ams_humidity_entity)), entity: cfg.ams_humidity_entity });
      }
      if (ams && ams.drying) extraLines.push({ key: "ams_drying", icon: "mdi:heat-wave", label: t(hass, "ams_box"), value: t(hass, "fd_drying"), entity: cfg.ams_drying_entity });
      p3 = {
        layout: pStyle ? (pStyle === "bambu_a" || pStyle === "elegoo_n" ? "open" : "enclosed") : cfg.printer_layout === "open" ? "open" : "enclosed",
        style: pStyle,
        ams,
        part: ["pyramid", "duck"].includes(cfg.printed_part) ? cfg.printed_part : "cube",
        // The part on the bed grows with the job, and stays whole once done.
        height: norm === "done" ? 1 : norm === "error" ? (reached || 0) / 100 : (progressPct || 0) / 100,
        moving: isActiveState(norm) && shown !== "preheating",
        nozzleHot: nozzle.target !== null ? nozzle.target > 0 : isActiveState(norm),
        bedHot: bed.target !== null ? bed.target > 0 : isActiveState(norm),
        // Out of a job and with nothing on it, the bed rests at the bottom.
        parked: !job && norm !== "done",
      };
    }

    // Heat pump. An indicator that is on says it outright; otherwise the state
    // entity does. A climate or water_heater entity that says nothing about
    // what the pump does still shows its mode, without pretending it runs.
    let hpMode = "";
    let hpCircuit = "";
    // A pump whose compressor is idle is only pushing water around, so its fan
    // has no reason to turn.
    let compressorOff = false;
    if (cap.heatPump) {
      const modeEntity = /^(climate|water_heater)\./.test(cfg.state_entity || "");
      // The compressor answers the one question a flow temperature cannot: is
      // the machine making heat or cold, or only pushing water around. A
      // frequency in hertz or a contact, and unknown when it says nothing.
      const compSt = cfg.compressor_entity ? stateObj(hass, cfg.compressor_entity) : null;
      // A temperature or a pressure says nothing of whether it runs (ViCare's
      // compressor_inlet_temperature), and a word names its phase.
      const compUnit = cfg.compressor_entity ? unitOf(hass, cfg.compressor_entity).toLowerCase() : "";
      const compKnown = !!compSt && !["unknown", "unavailable"].includes(compSt.state) && !/\u00b0|^c$|^f$|bar|pa$/.test(compUnit);
      const compHz = compKnown ? numericState(hass, cfg.compressor_entity) : null;
      const compOn = compKnown && (compHz !== null ? compHz > 0 : !["off", "false", "no", "ready", "pause", "paused", "idle", "standby", "stopped", "stop"].includes(String(compSt.state).toLowerCase()));
      compressorOff = compKnown && !compOn;
      // The indicators (issue #17). A contact says its own mode when it is on;
      // a valve says in words where the water goes, whichever field it sits
      // in, so a 2-way valve put in the heating field still says Cooling in
      // summer. The tank comes first, since the 3-way valve takes all the water
      // for it, then cooling, then heating, which share the 2-way valve.
      const said = new Set();
      for (const [field, own] of [["hot_water_entity", "hot_water"], ["cooling_entity", "cooling"], ["heating_entity", "space_heating"]]) {
        const os = cfg[field] ? stateObj(hass, cfg[field]) : null;
        if (!os) continue;
        const valve = hpValveMode(os.state);
        // A tank "heating" is a tank taking heat: in the hot water field that
        // word is the field's own mode, as it always was.
        if (valve && !(own === "hot_water" && valve === "space_heating")) said.add(valve);
        else if (HP_ON_WORDS.includes(String(os.state).trim().toLowerCase())) said.add(own);
      }
      const indicated = ["hot_water", "cooling", "space_heating"].find((m) => said.has(m)) || "";
      // A valve is a position, not a sign of work: with the compressor at
      // rest, the pump is on standby whichever way the valves point.
      if (indicated) hpMode = compressorOff ? "idle" : indicated;
      else if (!powerDerived && st) hpMode = heatPumpModeOf(rawState, st.attributes, cfg.state_map, modeEntity);
      if (!hpMode && (powerDerived || !modeEntity)) {
        if (isActiveState(norm)) hpMode = "running";
        else if (norm === "idle" || norm === "done") hpMode = "idle";
      }
      // And a compressor at work is a pump at work, whatever the state says.
      if (hpMode === "idle" && compOn) hpMode = "running";
      // The readings follow the circuit the valves point to, even at rest: on
      // a summer night the lines are the cooling ones, at zero.
      hpCircuit = indicated || hpMode;
      if (hpMode) {
        const key = { space_heating: "boiler_space_heating", hot_water: "boiler_hot_water", cooling: "hp_cooling",
          defrost: "hp_defrost", idle: "standby", running: "running" }[hpMode];
        if (!cfg.state_show_raw) stateLabel = t(hass, key);
        color = { space_heating: "#ff7043", hot_water: "#ef5350", cooling: "#29b6f6", defrost: "#4dd0e1",
          idle: STATE_COLORS.idle, running: STATE_COLORS.running }[hpMode];
      } else if (modeEntity && !rawIsMeaningless && !cfg.state_show_raw) {
        stateLabel = modeLabel(hass, st, rawState, cfg);
        color = STATE_COLORS.idle;
      }
      const flow = cfg.temperature_entity ? numericState(hass, cfg.temperature_entity) : null;
      if (flow !== null) displayText = screenTemp(hass, cfg, cfg.temperature_entity, flow);
      // Temperatures follow temperature_decimals like everywhere else on the
      // card; power, heat and COP keep the entity's own formatting.
      const hpTemp = (entity, key, icon, label) => {
        const v = entity ? numericState(hass, entity) : null;
        if (v === null) return;
        // A reading never breaks between its number and its unit: the labels
        // are long, and a narrow card would leave the unit alone below.
        extraLines.push({ key, icon, label, value: keepTogether(tempText(hass, cfg, entity, v, temperatureUnit(hass, entity))), entity });
      };
      const hpLine = (entity, key, icon, label) => {
        const ls = entity ? stateObj(hass, entity) : null;
        if (!ls || ["unknown", "unavailable"].includes(ls.state)) return;
        extraLines.push({ key, icon, label, value: keepTogether(formatInfoValue(ls, hass, null, cfg, entity)), entity });
      };
      // Flow and return share one line, as the water's own journey: two lines
      // for one pipe is what makes this card long.
      const ret = cfg.return_temperature_entity ? numericState(hass, cfg.return_temperature_entity) : null;
      if (flow !== null && ret !== null) {
        const fu = temperatureUnit(hass, cfg.temperature_entity);
        const ru = temperatureUnit(hass, cfg.return_temperature_entity);
        extraLines.push({
          key: "flow_return",
          icon: "mdi:thermometer",
          label: t(hass, "hp_flow_return"),
          value: `${keepTogether(tempText(hass, cfg, cfg.temperature_entity, flow, fu))} \u2192 ${keepTogether(tempText(hass, cfg, cfg.return_temperature_entity, ret, ru))}`,
          entity: cfg.temperature_entity,
        });
      } else {
        hpTemp(cfg.temperature_entity, "flow_temp", "mdi:thermometer", t(hass, "section_flow_temperature"));
        hpTemp(cfg.return_temperature_entity, "return_temp", "mdi:thermometer-low", t(hass, "section_return_temperature"));
      }
      // The delta is worked out rather than asked for, like the COP: the two
      // temperatures are already there, and what the emitter takes out of the
      // water is the number a heat pump is read on. Taken as a distance, since
      // the return is the warmer one when the pump cools the house.
      // Two sensors in different units give no difference worth reading.
      const fUnit = temperatureUnit(hass, cfg.temperature_entity);
      if (flow !== null && ret !== null && fUnit === temperatureUnit(hass, cfg.return_temperature_entity)) {
        const d = tempDecimals(cfg);
        extraLines.push({
          key: "delta",
          icon: "mdi:delta",
          label: t(hass, "hp_delta"),
          // Never in whole degrees: a heat pump works on a couple of them, and
          // rounding a delta of 4.4 to 4 hides most of what it says.
          value: keepTogether(`${fixedTemp(hass, Math.abs(flow - ret), d === 0 ? 1 : d === null ? 1 : d)} ${deltaUnit(fUnit)}`),
        });
      }
      hpLine(cfg.water_flow_entity, "water_flow", "mdi:water-pump", t(hass, "section_water_flow"));
      hpTemp(cfg.outdoor_temperature_entity, "outdoor_temp", "mdi:sun-thermometer-outline", t(hass, "section_outdoor_temperature"));
      // HeishaMon measures each circuit apart: what the pump draws and makes
      // while it heats, while it cools and for the tank. The card reads the
      // pair of the circuit in use, and the heating pair when there is none.
      const cooling = hpCircuit === "cooling";
      const tankCircuit = hpCircuit === "hot_water";
      const powerId = (cooling && cfg.cooling_power_entity) || (tankCircuit && cfg.hot_water_power_entity) || cfg.power_entity;
      const outputId = (cooling && cfg.cooling_output_entity) || (tankCircuit && cfg.hot_water_output_entity) || cfg.heat_output_entity;
      // A meter in kWh is energy, not power (#76).
      const coldOut = cooling;
      const energyUnit = (id) => /^[kmg]?wh$/i.test(String(unitOf(hass, id) || "").replace(/\s/g, ""));
      hpLine(powerId, "power", cfg.power_icon || "mdi:flash", t(hass, powerId && energyUnit(powerId) ? "energy_line" : "power"));
      hpLine(outputId, "heat_output", coldOut ? "mdi:snowflake" : "mdi:heat-wave",
        t(hass, coldOut ? "section_cooling_output" : "section_heat_output"));
      // What the circuit in use has consumed, in kWh, each circuit apart (#76).
      const energyKey = cooling ? "cooling" : tankCircuit ? "hot_water" : "heating";
      hpLine(cfg[`${energyKey}_energy_entity`], "hp_energy", "mdi:lightning-bolt-outline", t(hass, `section_${energyKey}_energy`));
      const pw = powerId ? numericState(hass, powerId) : null;
      if (cfg.cop_entity) {
        hpLine(cfg.cop_entity, "cop", "mdi:gauge", "COP");
      } else if (outputId && pw !== null) {
        // No COP entity: what comes out over power in, once both are in
        // watts. Cooling, the same ratio is called an EER.
        const kw = (v, id) => {
          const u = String(unitOf(hass, id) || "").toLowerCase();
          return u === "w" ? v / 1000 : u === "kw" ? v : NaN;
        };
        const made = numericState(hass, outputId);
        const cop = made === null ? NaN : kw(made, outputId) / kw(pw, powerId);
        // At rest the ratio is infinite, and a meter below zero gives nonsense.
        if (Number.isFinite(cop) && cop > 0) {
          extraLines.push({
            key: "cop",
            icon: "mdi:gauge",
            label: coldOut ? "EER" : "COP",
            value: new Intl.NumberFormat(lang(hass), { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(cop),
          });
        }
      }

      // A frequency in hertz reads as it comes, a contact reads in words, and
      // either way a compressor at rest stops the fan on the drawing.
      if (compKnown) {
        extraLines.push({
          key: "compressor",
          icon: "mdi:sine-wave",
          label: t(hass, "section_compressor"),
          value: keepTogether(compHz !== null
            ? formatInfoValue(compSt, hass, null, cfg, cfg.compressor_entity)
            : t(hass, compOn ? "running" : "off_short")),
          entity: cfg.compressor_entity,
        });
      }
      hpLine(cfg.fan_speed_entity, "fan_speed", "mdi:fan", t(hass, "section_fan_speed"));
    }

    // Pellet stove. The phase comes from the stove's status when there is
    // one, since a climate entity only knows a lit fire from an idle one; a
    // climate entity put in the state carries the room and the setpoint. An
    // alarm entity that reports an alarm wins over any phase, since a stove in
    // alarm has stopped whatever it was doing.
    let stove = null;
    if (cap.pelletStove) {
      const climate = domainOf(cfg.state_entity) === "climate" ? st : null;
      const phaseSt = cfg.phase_entity ? stateObj(hass, cfg.phase_entity) : null;
      let mode = phaseSt ? stoveModeOf(phaseSt.state, cfg.state_map) : "";
      if (!mode) mode = climate ? stoveClimateMode(climate) : !powerDerived ? stoveModeOf(rawState, cfg.state_map) : "";
      // A plug, or a word the card does not know: lit or not, as the rest of
      // the card reads it.
      if (!mode) {
        if (isActiveState(norm)) mode = "burning";
        else if (norm === "idle" || norm === "done") mode = "off";
        else if (norm === "error") mode = "alarm";
      }
      const alarm = stoveAlarmOf(cfg.error_entity ? stateObj(hass, cfg.error_entity) : null);
      if (alarm.active) mode = "alarm";
      const said = stripAccents(`${phaseSt ? phaseSt.state : ""} ${climate ? "" : rawState} ${alarm.text}`).toLowerCase();

      // The pellets, as a share of the hopper or as a contact that only says
      // empty, like a feeder's tank. A level in centimetres or kilograms only
      // fills the drawing once the hopper's capacity is known.
      const levelSt = cfg.level_entity ? stateObj(hass, cfg.level_entity) : null;
      const levelKnown = !!levelSt && !["unknown", "unavailable"].includes(levelSt.state);
      const levelPct = levelKnown ? numericState(hass, cfg.level_entity) : null;
      const levelEmpty = levelPct !== null
        ? levelPct <= (parseFloat(cfg.level_empty_below) || 0)
        : levelKnown && ["on", "true", "empty", "low"].includes(String(levelSt.state).toLowerCase());
      const noPellets = levelEmpty || (mode === "alarm" && STOVE_NO_PELLETS_RE.test(said));
      const doorOpenAlarm = mode === "alarm" && !noPellets && STOVE_DOOR_RE.test(said);
      let fill = null;
      if (levelPct !== null) {
        const max = parseFloat(cfg.level_max);
        const unit = unitOf(hass, cfg.level_entity);
        const pct = max > 0 ? (levelPct / max) * 100 : !unit || unit === "%" ? levelPct : null;
        if (pct !== null) fill = Math.max(0, Math.min(100, pct));
      }
      if (noPellets) fill = 0;

      if (mode) {
        if (!cfg.state_show_raw) {
          stateLabel = t(hass, noPellets && mode === "alarm" ? "ps_no_pellets" : doorOpenAlarm ? "door_open" : `ps_${mode}`);
        }
        color = STOVE_COLORS[mode];
      }

      // The screen: the power stage while the fire burns, the alarm's own
      // code in alarm, a short word otherwise.
      const stage = cfg.power_level_entity ? numericState(hass, cfg.power_level_entity) : null;
      if ((mode === "burning" || mode === "modulating") && stage !== null) displayText = `P${Math.round(stage)}`;
      else if (mode === "alarm") displayText = stoveAlarmCode(alarm.text) || stoveAlarmCode(said) || STOVE_SCREEN.alarm;
      else displayText = STOVE_SCREEN[mode] || "";

      const room = cfg.current_temperature_entity ? numericState(hass, cfg.current_temperature_entity)
        : climate ? numberOrNull(climate.attributes.current_temperature) : null;
      const target = cfg.target_temperature_entity ? numericState(hass, cfg.target_temperature_entity)
        : climate ? numberOrNull(climate.attributes.temperature) : null;
      if (room !== null) {
        const roomId = cfg.current_temperature_entity || cfg.state_entity;
        const unit = temperatureUnit(hass, cfg.current_temperature_entity || cfg.target_temperature_entity);
        const now = tempText(hass, cfg, roomId, room, unit);
        const goal = target !== null && mode !== "off" ? tempText(hass, cfg, cfg.target_temperature_entity || cfg.state_entity, target, unit) : null;
        extraLines.push({
          key: "room_temp",
          icon: "mdi:home-thermometer-outline",
          label: t(hass, "ps_line_room"),
          // The setpoint while the stove works towards it, as the room
          // temperature reads it: 20 to 21 degrees.
          value: goal !== null && goal !== now ? `${keepTogether(now)} \u2192 ${keepTogether(goal)}` : keepTogether(now),
          entity: cfg.current_temperature_entity || cfg.state_entity,
        });
      }
      // The stage out of its range when the entity knows the range, 4 / 5.
      const stageSt = cfg.power_level_entity ? stateObj(hass, cfg.power_level_entity) : null;
      if (stageSt && !["unknown", "unavailable"].includes(stageSt.state)) {
        const top = numberOrNull((stageSt.attributes || {}).max);
        extraLines.push({
          key: "power_level",
          icon: "mdi:fire",
          label: t(hass, "ps_line_power"),
          value: keepTogether(stage !== null && top !== null && top > 0 ? `${Math.round(stage)} / ${Math.round(top)}`
            : formatInfoValue(stageSt, hass, null, cfg, cfg.power_level_entity)),
          entity: cfg.power_level_entity,
        });
      }
      const flue = cfg.flue_temperature_entity ? numericState(hass, cfg.flue_temperature_entity) : null;
      if (flue !== null) {
        extraLines.push({
          key: "flue_temp",
          icon: "mdi:thermometer-high",
          label: t(hass, "ps_line_flue"),
          value: keepTogether(tempText(hass, cfg, cfg.flue_temperature_entity, flue, temperatureUnit(hass, cfg.flue_temperature_entity))),
          entity: cfg.flue_temperature_entity,
        });
      }
      // A fan entity says on or off in its state and how fast in its
      // percentage; a number, a select or a sensor says it in its state.
      const fanSt = cfg.fan_speed_entity ? stateObj(hass, cfg.fan_speed_entity) : null;
      if (fanSt && !["unknown", "unavailable"].includes(fanSt.state)) {
        const pct = domainOf(cfg.fan_speed_entity) === "fan" ? numberOrNull((fanSt.attributes || {}).percentage) : null;
        extraLines.push({
          key: "fan_speed",
          icon: "mdi:fan",
          label: t(hass, "ps_line_fan"),
          value: keepTogether(pct !== null && fanSt.state === "on" ? `${Math.round(pct)} %` : formatInfoValue(fanSt, hass, null, cfg, cfg.fan_speed_entity)),
          entity: cfg.fan_speed_entity,
        });
      }
      // A contact that says nothing is wrong says nothing worth a line.
      if (levelKnown && (levelPct !== null || levelEmpty)) {
        extraLines.push({
          key: "pellet_level",
          icon: levelEmpty ? "mdi:alert-circle-outline" : "mdi:grain",
          label: t(hass, "ps_line_pellets"),
          value: keepTogether(levelPct !== null ? formatInfoValue(levelSt, hass, null, cfg, cfg.level_entity) : t(hass, "ps_no_pellets")),
          entity: cfg.level_entity,
          warn: levelEmpty,
        });
      }
      // The alarm in the stove's own words, when it has some.
      if (alarm.active && alarm.text) {
        extraLines.push({
          key: "alarm",
          icon: "mdi:alert-circle-outline",
          label: t(hass, "ps_alarm"),
          value: alarm.text,
          entity: cfg.error_entity,
          warn: true,
          wrap: true,
        });
      }
      stove = { mode: mode || "off", fill, empty: noPellets };
    }

    // Pet feeder: read like a fridge, since it is idle almost all the time.
    // Its state is worked out rather than reported, and what it did today is
    // the content of the card.
    let feeding = false;
    let feederEmpty = false;
    let feederAlert = false;
    let feederFill = null;
    let feederFillB = null;
    let feederEmptyA = false;
    let feederEmptyB = false;
    let feederScreen = "";
    if (cap.petFeeder) {
      const errSt = cfg.error_entity ? stateObj(hass, cfg.error_entity) : null;
      const errText = errSt ? String(errSt.state).toLowerCase() : "";
      // A feeder names its fault in one of three ways: a contact that turns on,
      // a word, or a code. Tuya reports a number on which zero is the only good
      // value, so anything else is a fault however it is spelled.
      const errCode = errText === "" ? NaN : Number(errText);
      const erred = !!errSt && (Number.isFinite(errCode)
        ? errCode !== 0
        : ["on", "true", "error", "problem", "fault"].includes(errText) || /jam|block|stuck|clog|bourrage|abnormal|^fault\d|^e\d+$/.test(errText));
      // An error that says which error it is, when the feeder names it: an
      // empty tank is not a fault to look into, it is a bag to go and fetch.
      const errEmpty = !!errSt && /empty|no.?food|lack|out.?of.?food|vide|leer|vacio|vuoto|tom\b|pust|pr(a|\u00e1)zdn/.test(stripAccents(errText));
      // The level, as a percentage that fills the hopper or as a contact that
      // only says "empty". Polarity is the usual one: on means there is a
      // problem, which for a feeder means nothing left to serve.
      const levelPct = cfg.level_entity ? numericState(hass, cfg.level_entity) : null;
      const levelSt = cfg.level_entity ? stateObj(hass, cfg.level_entity) : null;
      const levelEmpty = levelPct !== null
        ? levelPct <= (parseFloat(cfg.level_empty_below) || 0)
        : !!levelSt && ["on", "true", "empty", "low"].includes(String(levelSt.state).toLowerCase());
      // A feeder with two hoppers has a second level, read the same way and
      // against the same threshold and capacity: one empty hopper is a bag to
      // fetch just as much as a single one is.
      const levelBPct = cfg.level_b_entity ? numericState(hass, cfg.level_b_entity) : null;
      const levelBSt = cfg.level_b_entity ? stateObj(hass, cfg.level_b_entity) : null;
      const levelBEmpty = levelBPct !== null
        ? levelBPct <= (parseFloat(cfg.level_empty_below) || 0)
        : !!levelBSt && ["on", "true", "empty", "low"].includes(String(levelBSt.state).toLowerCase());
      feederEmptyA = levelEmpty;
      feederEmptyB = levelBEmpty;
      // A feeder that reports anything at all reports a pulse while it serves.
      // One that reports nothing still counts: a count of the day that goes
      // up is a meal just served. Only a rise between two numbers counts, so
      // the reset at midnight and the return after a restart do not.
      this._isFeeder = true;
      const counts = [cfg.portions_today_entity, cfg.weight_today_entity].map((id) => (id ? numericState(hass, id) : null));
      const seen = this._feedSeen;
      if (seen && counts.some((v, i) => v !== null && seen[i] !== null && v > seen[i])) this._feedPulse(false);
      this._feedSeen = counts;
      feeding = (!!st && ["on", "true", "dispensing", "feeding", "running"].includes(String(rawState).toLowerCase()))
        || Date.now() < (this._feedUntil || 0);
      norm = errEmpty || ((levelEmpty || levelBEmpty) && !erred) ? "feeder_empty"
        : erred ? "error"
        : feeding ? "feeder_feeding" : "feeder_ready";
      feederEmpty = norm === "feeder_empty";
      // Empty or jammed, the cat is equally unimpressed.
      feederAlert = feederEmpty || norm === "error";
      // The screen shows what the real ones show: the time. While it serves it
      // shows the portion being served, when the card knows the serving size.
      const serving = cfg.serving_size_entity ? numericState(hass, cfg.serving_size_entity) : null;
      feederScreen = feeding && serving !== null ? `P ${Math.round(serving)}` : feederClock(hass);
      // A clock has to tick on its own: nothing in the states changes when a
      // minute goes by.
      this._clearClockTimer();
      if (compactModeOf(cfg.compact) !== "hide" && !this._inert) this._clockTimer = setInterval(() => this._render(), CLOCK_TICK_MS);
      // The first hopper's line keeps its warning unless only the second one
      // is empty.
      const aEmpty = feederEmpty && !(levelBEmpty && !levelEmpty);
      if (levelSt && !["unknown", "unavailable"].includes(levelSt.state)) {
        extraLines.push({
          key: "level",
          icon: aEmpty ? "mdi:alert-circle-outline" : "mdi:silo",
          label: t(hass, "section_level"),
          value: keepTogether(levelPct !== null ? formatInfoValue(levelSt, hass, null, cfg, cfg.level_entity) : t(hass, aEmpty ? "feeder_empty" : "feeder_ready")),
          entity: cfg.level_entity,
          warn: aEmpty,
        });
      }
      if (levelBSt && !["unknown", "unavailable"].includes(levelBSt.state)) {
        extraLines.push({
          key: "level_b",
          icon: levelBEmpty ? "mdi:alert-circle-outline" : "mdi:silo",
          label: t(hass, "section_level_b"),
          value: keepTogether(levelBPct !== null ? formatInfoValue(levelBSt, hass, null, cfg, cfg.level_b_entity) : t(hass, levelBEmpty ? "feeder_empty" : "feeder_ready")),
          entity: cfg.level_b_entity,
          warn: levelBEmpty,
        });
      }
      color = STATE_COLORS[norm];
      // The heap is drawn from a percentage. A tank counted in grams or in
      // litres only says how full it is once its capacity is known, so without
      // that capacity the drawing stays at its resting height rather than
      // reading 729 g as a brimming hopper.
      const levelMax = parseFloat(cfg.level_max);
      const levelUnit = cfg.level_entity ? unitOf(hass, cfg.level_entity) : null;
      if (levelPct !== null) {
        const filled = levelMax > 0 ? (levelPct / levelMax) * 100
          : !levelUnit || levelUnit === "%" ? levelPct : null;
        if (filled !== null) feederFill = Math.max(0, Math.min(100, filled));
      }
      if (levelBPct !== null) {
        const levelBUnit = unitOf(hass, cfg.level_b_entity);
        const filledB = levelMax > 0 ? (levelBPct / levelMax) * 100
          : !levelBUnit || levelBUnit === "%" ? levelBPct : null;
        if (filledB !== null) feederFillB = Math.max(0, Math.min(100, filledB));
      }
      // "Ready" is what a feeder is nearly all day long, so saying it says
      // nothing. At rest the line tells how full the tank is when that is
      // known and stays empty otherwise; serving, empty and a fault keep their
      // own words. With two hoppers it is the lower one that counts, being
      // the one to refill first.
      const restFill = cfg.feeder_layout !== "dual_split" || feederFillB === null ? feederFill
        : feederFill === null ? feederFillB : Math.min(feederFill, feederFillB);
      if (!cfg.state_show_raw) {
        stateLabel = norm !== "feeder_ready" ? t(hass, norm)
          : restFill === null ? ""
          : t(hass, "feeder_level").replace("{pct}",
            new Intl.NumberFormat(lang(hass), { style: "percent", maximumFractionDigits: 0 }).format(restFill / 100));
      }

      const portionsSt = cfg.portions_today_entity ? stateObj(hass, cfg.portions_today_entity) : null;
      const portions = cfg.portions_today_entity ? numericState(hass, cfg.portions_today_entity) : null;
      const weight = cfg.weight_today_entity ? numericState(hass, cfg.weight_today_entity) : null;
      const perPortion = cfg.portion_weight_entity ? numericState(hass, cfg.portion_weight_entity) : null;
      // Grams are worked out when the feeder does not count them itself, from
      // its own portion weight: how much a portion weighs is a setting, from
      // one gram to twenty, and never something to assume.
      const grams = weight !== null ? weight
        : portions !== null && perPortion !== null ? portions * perPortion : null;
      const gramUnit = (weight !== null ? unitOf(hass, cfg.weight_today_entity) : unitOf(hass, cfg.portion_weight_entity)) || "g";
      const gramText = grams === null ? "" : keepTogether(`${Math.round(grams)} ${gramUnit}`);
      if (portions !== null) {
        const count = unitOf(hass, cfg.portions_today_entity)
          ? formatInfoValue(portionsSt, hass, null, cfg, cfg.portions_today_entity)
          : `${formatInfoValue(portionsSt, hass, null, cfg, cfg.portions_today_entity)} ${t(hass, "portions")}`;
        extraLines.push({
          key: "portions_today",
          icon: "mdi:bowl-mix",
          label: t(hass, "section_portions_today"),
          value: keepTogether(count) + (gramText ? ` \u00b7 ${gramText}` : ""),
          entity: cfg.portions_today_entity,
        });
      } else if (gramText) {
        extraLines.push({ key: "weight_today", icon: "mdi:bowl-mix", label: t(hass, "section_weight_today"), value: gramText, entity: cfg.weight_today_entity });
      }

      const last = feederLastFeed(hass, cfg, portions);
      if (last !== null) {
        extraLines.push({ key: "last_feed", icon: "mdi:clock-outline", label: t(hass, "section_last_feed"), value: keepTogether(feedTime(hass, last)) });
      }

      const feederLine = (entity, key, icon, label) => {
        const ls = entity ? stateObj(hass, entity) : null;
        if (!ls || ["unknown", "unavailable"].includes(ls.state)) return;
        extraLines.push({ key, icon, label, value: keepTogether(formatInfoValue(ls, hass, null, cfg, entity)), entity });
      };
      feederLine(cfg.serving_size_entity, "serving_size", "mdi:bowl-mix-outline", t(hass, "section_serving_size"));
      feederLine(cfg.portion_weight_entity, "portion_weight", "mdi:weight-gram", t(hass, "section_portion_weight"));
      // The schedule is a sentence rather than a number, so it wraps.
      const schedSt = cfg.schedule_entity ? stateObj(hass, cfg.schedule_entity) : null;
      if (schedSt && !["unknown", "unavailable"].includes(schedSt.state)) {
        extraLines.push({ key: "schedule", icon: "mdi:calendar-clock", label: t(hass, "section_feeder_schedule"), value: schedSt.state, entity: cfg.schedule_entity, wrap: true });
      }
    }

    // Kettle: no timer, no program. The drawing carries the state, and the
    // water temperature is the only reading it can show.
    if (cap.kettleTemp) {
      if (norm === "running" || norm === "idle") {
        if (!cfg.state_show_raw) {
          stateLabel = t(hass, norm === "running" ? "kettle_heating" : "kettle_off");
        }
        if (norm === "running") color = "#ff7043";
      }
      if (cfg.temperature_entity) {
        const kv = numericState(hass, cfg.temperature_entity);
        const kunit = temperatureUnit(hass, cfg.temperature_entity);
        if (kv !== null) {
          displayText = screenTemp(hass, cfg, cfg.temperature_entity, kv);
          extraLines.push({
            key: "temperature",
            icon: "mdi:thermometer-water",
            label: t(hass, "temperature"),
            value: tempText(hass, cfg, cfg.temperature_entity, kv, kunit),
            entity: cfg.temperature_entity,
          });
        }
      }
    }

    // Air conditioner. A climate entity says it all: the mode it is set to,
    // what it is actually doing in hvac_action, the room and the setpoint, the
    // fan and the vanes. The entities of the editor are for what it keeps
    // apart: Panasonic's vanes and nanoe, an outdoor sensor, a defrost flag.
    let ac = null;
    if (cap.airConditioner) {
      const climate = domainOf(cfg.state_entity) === "climate" ? st : null;
      const attrs = (climate && climate.attributes) || {};
      let set = "";
      let mode = "";
      if (!powerDerived && st && cfg.state_map && Object.prototype.hasOwnProperty.call(cfg.state_map, rawState)) {
        const mapped = cfg.state_map[rawState];
        mode = AC_MODES.includes(mapped) ? mapped : "";
        set = ["cool", "heat", "dry", "fan", "auto"].includes(mode) ? mode : "";
      } else if (!powerDerived && st && !rawIsMeaningless) {
        set = acSetModeOf(rawState);
        mode = set ? acModeOf(set, attrs.hvac_action) : "";
      }
      // A plug, or a word the card does not know: running or not, as the
      // rest of the card reads it.
      if (!mode) {
        if (isActiveState(norm)) mode = "run";
        else if (norm === "idle" || norm === "done" || powerDerived) mode = "off";
      }
      const defrostSt = cfg.defrost_entity ? stateObj(hass, cfg.defrost_entity) : null;
      if (defrostSt && mode !== "off" && ["on", "true", "defrost", "defrosting"].includes(String(defrostSt.state).toLowerCase())) mode = "defrost";

      if (mode) {
        if (!cfg.state_show_raw) stateLabel = t(hass, AC_LABELS[mode]);
        color = AC_COLORS[mode];
      }

      // The vanes, from their own selects when the integration keeps them
      // there, from the climate entity's swing modes otherwise. Daikin says
      // both axes in one swing mode: Vertical, Horizontal or 3D.
      const vaneRaw = (field, attr) => {
        const vs = cfg[field] ? stateObj(hass, cfg[field]) : null;
        return vs ? vs.state : attrs[attr];
      };
      const swingRaw = String(attrs.swing_mode || "").toLowerCase();
      const vane = acVanePos(vaneRaw("vane_vertical_entity", "swing_mode"), "v");
      let hvane = acVanePos(vaneRaw("vane_horizontal_entity", "swing_horizontal_mode"), "h");
      if (!cfg.vane_horizontal_entity && attrs.swing_horizontal_mode === undefined && /3d|both|horizontal/.test(swingRaw)) hvane = "swing";

      // The fan: a fan entity's percentage, a select's option, or the climate
      // entity's fan mode.
      const fanSt = cfg.fan_speed_entity ? stateObj(hass, cfg.fan_speed_entity) : null;
      const fanPct = fanSt && domainOf(cfg.fan_speed_entity) === "fan" ? numberOrNull((fanSt.attributes || {}).percentage) : null;
      const fanRaw = fanSt ? fanSt.state : attrs.fan_mode;
      const speed = acFanSpeedOf(fanRaw, fanPct, attrs.fan_modes);

      // The lights: the purifier, and the preset or the fan saying eco,
      // quiet or boost.
      const leds = [];
      const purSt = cfg.purifier_entity ? stateObj(hass, cfg.purifier_entity) : null;
      if (purSt && !["off", "false", "unknown", "unavailable", "none", ""].includes(String(purSt.state).toLowerCase())) leds.push("ion");
      const preset = acPresetOf(attrs.preset_mode);
      if (preset === "eco") leds.push("eco");
      if (preset === "quiet" || (!preset && speed === "quiet")) leds.push("quiet");
      if (preset === "boost") leds.push("boost");

      // The screen: the mode's symbol and the setpoint, as the unit shows
      // them. A fan has no setpoint to show.
      const target = cfg.target_temperature_entity ? numericState(hass, cfg.target_temperature_entity) : numberOrNull(attrs.temperature);
      const icon = set || (mode === "idle" || mode === "defrost" || mode === "preheat" ? "" : ["cool", "heat", "dry", "fan", "auto"].includes(mode) ? mode : "");
      const screen = mode !== "off" && icon !== "fan" && target !== null ? acScreenTemp(target) : "";
      displayText = screen;

      const room = cfg.current_temperature_entity ? numericState(hass, cfg.current_temperature_entity) : numberOrNull(attrs.current_temperature);
      if (room !== null) {
        const roomId = cfg.current_temperature_entity || cfg.state_entity;
        const unit = temperatureUnit(hass, cfg.current_temperature_entity || cfg.target_temperature_entity);
        const now = tempText(hass, cfg, roomId, room, unit);
        const goal = target !== null && mode !== "off" && icon !== "fan"
          ? tempText(hass, cfg, cfg.target_temperature_entity || cfg.state_entity, target, unit) : null;
        extraLines.push({
          key: "room_temp",
          icon: "mdi:home-thermometer-outline",
          label: t(hass, "ps_line_room"),
          value: goal !== null && goal !== now ? `${keepTogether(now)} \u2192 ${keepTogether(goal)}` : keepTogether(now),
          entity: roomId,
        });
      }
      // The humidity, and while it dries, the humidity it aims at.
      const hum = numberOrNull(attrs.current_humidity);
      if (hum !== null) {
        const aim = mode !== "off" && set === "dry" ? numberOrNull(attrs.humidity) : null;
        extraLines.push({
          key: "humidity",
          icon: "mdi:water-percent",
          label: t(hass, "ac_line_humidity"),
          value: keepTogether(aim !== null && Math.round(aim) !== Math.round(hum) ? `${Math.round(hum)} % \u2192 ${Math.round(aim)} %` : `${Math.round(hum)} %`),
          entity: cfg.state_entity,
        });
      }
      if (mode !== "off" && fanRaw !== undefined && fanRaw !== null && !["unknown", "unavailable", ""].includes(String(fanRaw))) {
        extraLines.push({
          key: "fan_speed",
          icon: "mdi:fan",
          label: t(hass, "ps_line_fan"),
          value: keepTogether(fanPct !== null && fanSt.state === "on" ? `${Math.round(fanPct)} %`
            : fanSt ? formatInfoValue(fanSt, hass, null, cfg, cfg.fan_speed_entity) : attrLabel(hass, climate, "fan_mode", fanRaw, cfg)),
          entity: cfg.fan_speed_entity || cfg.state_entity,
        });
      }
      const outdoor = cfg.outdoor_temperature_entity ? numericState(hass, cfg.outdoor_temperature_entity) : null;
      if (outdoor !== null) {
        extraLines.push({
          key: "outdoor_temp",
          icon: "mdi:sun-thermometer-outline",
          label: t(hass, "section_outdoor_temperature"),
          value: keepTogether(tempText(hass, cfg, cfg.outdoor_temperature_entity, outdoor, temperatureUnit(hass, cfg.outdoor_temperature_entity))),
          entity: cfg.outdoor_temperature_entity,
        });
      }
      ac = {
        mode: mode || "off",
        icon,
        screen,
        vane: Number.isInteger(vane) ? vane : null,
        hvane: Number.isInteger(hvane) ? hvane : null,
        swingV: vane === "swing",
        swingH: hvane === "swing",
        speed,
        leds,
      };
    }

    // Dehumidifier, space heater and towel warmer. Each reads its own entity
    // and falls back on the plug it sits on: at work above the threshold, and
    // at rest while the plug is switched on but the thermostat or the
    // hygrostat has nothing to do.
    const plugMode = (working, resting) => {
      if (isActiveState(norm)) return working;
      const sw = st && ["switch", "input_boolean"].includes(domainOf(cfg.state_entity)) ? String(st.state).toLowerCase() : "";
      return sw === "on" ? resting : "off";
    };
    const mappedMode = (modes) => {
      if (powerDerived || !st || !cfg.state_map || !Object.prototype.hasOwnProperty.call(cfg.state_map, rawState)) return "";
      return modes.includes(cfg.state_map[rawState]) ? cfg.state_map[rawState] : "";
    };
    // The room and the setpoint on one line, as for the stove and the air
    // conditioner.
    const roomLine = (attrs, showTarget) => {
      const room = cfg.current_temperature_entity ? numericState(hass, cfg.current_temperature_entity) : numberOrNull(attrs.current_temperature);
      const target = cfg.target_temperature_entity ? numericState(hass, cfg.target_temperature_entity) : numberOrNull(attrs.temperature);
      if (room === null) return target;
      const roomId = cfg.current_temperature_entity || cfg.state_entity;
      const unit = temperatureUnit(hass, cfg.current_temperature_entity || cfg.target_temperature_entity);
      const now = tempText(hass, cfg, roomId, room, unit);
      const goal = target !== null && showTarget ? tempText(hass, cfg, cfg.target_temperature_entity || cfg.state_entity, target, unit) : null;
      extraLines.push({
        key: "room_temp",
        icon: "mdi:home-thermometer-outline",
        label: t(hass, "ps_line_room"),
        value: goal !== null && goal !== now ? `${keepTogether(now)} \u2192 ${keepTogether(goal)}` : keepTogether(now),
        entity: roomId,
      });
      return target;
    };
    // A preset or a mode worth naming on its own line, in Home Assistant's
    // words for it.
    const modeLine = (ent, attr) => {
      const v = ent ? (ent.attributes || {})[attr] : null;
      if (v === undefined || v === null || ["", "none"].includes(String(v).toLowerCase())) return;
      extraLines.push({ key: "mode", icon: "mdi:tune-variant", label: t(hass, "line_mode"), value: attrLabel(hass, ent, attr, v, cfg), entity: cfg.state_entity });
    };

    // Dehumidifier. A humidifier entity says whether it is on and, in its
    // action, whether it is drying or has reached the humidity asked; its mode
    // says when it dries the laundry. A full tank stops it, and wins.
    let dh = null;
    if (cap.dehumidifier) {
      const hum = domainOf(cfg.state_entity) === "humidifier" ? st : null;
      const attrs = (hum && hum.attributes) || {};
      let mode = mappedMode(["off", "drying", "laundry", "idle", "full"]);
      if (!mode && !powerDerived && hum) mode = dehumidifierModeOf(hum);
      if (!mode) mode = plugMode("drying", "idle");
      if (mode === "drying" && DH_LAUNDRY_RE.test(stripAccents(String(attrs.mode || "")).toLowerCase())) mode = "laundry";
      // The tank: a level in percent, or a contact on when it is full.
      const tankSt = cfg.tank_entity ? stateObj(hass, cfg.tank_entity) : null;
      const tankKnown = !!tankSt && !["unknown", "unavailable"].includes(tankSt.state);
      const tankPct = tankKnown ? numericState(hass, cfg.tank_entity) : null;
      const full = tankPct !== null
        ? tankPct >= (parseFloat(cfg.tank_full_above) || 100)
        : tankKnown && ["on", "true", "full"].includes(String(tankSt.state).toLowerCase());
      if (full) mode = "full";
      if (!cfg.state_show_raw) stateLabel = t(hass, DH_LABELS[mode]);
      color = DH_COLORS[mode];

      const current = cfg.current_humidity_entity ? numericState(hass, cfg.current_humidity_entity) : numberOrNull(attrs.current_humidity);
      const target = numberOrNull(attrs.humidity);
      if (current !== null) {
        const aim = target !== null && mode !== "off" && Math.round(target) !== Math.round(current);
        extraLines.push({
          key: "humidity",
          icon: "mdi:water-percent",
          label: t(hass, "ac_line_humidity"),
          value: keepTogether(aim ? `${Math.round(current)} % \u2192 ${Math.round(target)} %` : `${Math.round(current)} %`),
          entity: cfg.current_humidity_entity || cfg.state_entity,
        });
      }
      if (mode !== "off") modeLine(hum, "mode");
      if (tankKnown && (tankPct !== null || full)) {
        extraLines.push({
          key: "tank",
          icon: full ? "mdi:alert-circle-outline" : "mdi:cup-water",
          label: t(hass, "dh_line_tank"),
          value: tankPct !== null ? keepTogether(`${Math.round(tankPct)} %`) : t(hass, "dh_full"),
          entity: cfg.tank_entity,
          warn: full,
        });
      }
      const fanSt = cfg.fan_speed_entity ? stateObj(hass, cfg.fan_speed_entity) : null;
      if (fanSt && mode !== "off" && !["unknown", "unavailable"].includes(fanSt.state)) {
        extraLines.push({ key: "fan_speed", icon: "mdi:fan", label: t(hass, "ps_line_fan"),
          value: keepTogether(formatInfoValue(fanSt, hass, null, cfg, cfg.fan_speed_entity)), entity: cfg.fan_speed_entity });
      }
      const unit = tankPct !== null ? unitOf(hass, cfg.tank_entity) : null;
      dh = {
        mode,
        fill: tankPct !== null && (!unit || unit === "%") ? Math.max(0, Math.min(100, tankPct)) : null,
        icon: mode === "laundry" ? "laundry" : "dry",
        screen: mode !== "off" && current !== null ? `${Math.round(current)}%` : "",
      };
    }

    // Space heater, a fan heater or an oil-filled radiator. A climate entity
    // says in hvac_action whether it heats or has reached the setpoint.
    let heater = null;
    if (cap.spaceHeater) {
      const climate = domainOf(cfg.state_entity) === "climate" ? st : null;
      const attrs = (climate && climate.attributes) || {};
      let mode = mappedMode(["off", "heating", "idle", "fan"]);
      if (!mode && !powerDerived && climate) mode = spaceHeaterModeOf(climate);
      if (!mode) mode = plugMode("heating", "idle");
      if (!cfg.state_show_raw) stateLabel = t(hass, SH_LABELS[mode]);
      color = SH_COLORS[mode];
      const target = roomLine(attrs, mode === "heating" || mode === "idle");
      if (mode !== "off") modeLine(climate, "preset_mode");
      heater = {
        mode,
        layout: cfg.heater_layout === "oil" ? "oil" : "fan",
        icon: mode === "off" ? "" : mode === "fan" ? "fan" : "heat",
        screen: (mode === "heating" || mode === "idle") && target !== null ? acScreenTemp(target) : "",
      };
    }

    // A thermostat or a radiator valve: what it does, its preset, an open
    // window; the room and the setpoint on one line, and how far a valve
    // has opened.
    let thermo = null;
    if (cap.thermostat) {
      const climate = domainOf(cfg.state_entity) === "climate" ? st : null;
      const attrs = (climate && climate.attributes) || {};
      let mode = mappedMode(["off", "heat", "cool", "idle"]) || thermostatModeOf(climate) || (st ? "idle" : "off");
      const preset = thermostatPresetOf(attrs.preset_mode);
      const win = attrs.window_open === true || /open|ouvert/i.test(String(attrs.window_state || ""));
      const shown = mode === "off" ? "off" : win ? "window" : mode === "idle" && preset ? preset : mode;
      if (!cfg.state_show_raw) stateLabel = t(hass, TH_LABELS[shown]);
      color = TH_COLORS[shown];
      const room = cfg.current_temperature_entity ? numericState(hass, cfg.current_temperature_entity) : numberOrNull(attrs.current_temperature);
      const target = cfg.target_temperature_entity ? numericState(hass, cfg.target_temperature_entity)
        : numberOrNull(attrs.temperature) ?? numberOrNull(mode === "cool" ? attrs.target_temp_high : attrs.target_temp_low);
      if (room !== null) {
        extraLines.push({ key: "room_temp", icon: "mdi:home-thermometer-outline", label: t(hass, "ps_line_room"), entity: cfg.current_temperature_entity || cfg.state_entity,
          value: thermoLine(hass, cfg, cfg.current_temperature_entity || cfg.state_entity, room, mode === "off" ? null : target) });
      }
      const opening = numberOrNull(attrs.valve_position ?? attrs.pi_heating_demand ?? attrs.valve_opening ?? attrs.heating_power_request);
      if (opening !== null && mode !== "off") {
        extraLines.push({ key: "valve", icon: "mdi:valve", label: t(hass, "th_line_valve"), value: keepTogether(`${Math.round(opening)} %`), entity: cfg.state_entity });
      }
      if (mode !== "off" && !preset && !/^(none|home|comfort|confort|manual|manuel)$/i.test(String(attrs.preset_mode || "none"))) modeLine(climate, "preset_mode");
      thermo = { ...thermoFace(hass, cfg, room, target), mode, eco: !!preset && mode === "idle", layout: thermostatLayoutOf(cfg, st) };
    }

    // Towel warmer. Its mode is the pilot wire's: in the climate entity's
    // preset (Heatzy, Atlantic), in a select as the state (NodOn), or read as
    // comfort from a plug that is on.
    let towel = null;
    if (cap.towelWarmer) {
      const climate = domainOf(cfg.state_entity) === "climate" ? st : null;
      const attrs = (climate && climate.attributes) || {};
      let mode = mappedMode(TW_MODES);
      if (!mode && !powerDerived && climate) {
        mode = String(climate.state).toLowerCase() === "off" ? "off"
          : towelModeOf(attrs.preset_mode) || (["unknown", "unavailable"].includes(climate.state) ? "" : "comfort");
      } else if (!mode && !powerDerived && st && !rawIsMeaningless) {
        mode = towelModeOf(rawState);
      }
      if (!mode) mode = plugMode("comfort", "comfort");
      if (!cfg.state_show_raw) stateLabel = t(hass, TW_LABELS[mode]);
      color = TW_COLORS[mode];
      const target = roomLine(attrs, ["comfort", "eco", "frost"].includes(mode));
      towel = {
        mode,
        layout: cfg.towel_warmer_layout,
        icon: TW_ICONS[mode] || "",
        screen: ["comfort", "eco", "frost"].includes(mode) && target !== null ? acScreenTemp(target) : "",
      };
    }

    // Pet fountain. The water runs or it does not, from a switch or the plug the
    // fountain sits on; then the water left, the filter and the pump, each of
    // which takes the state line over while it needs a hand.
    let fountain = null;
    if (cap.petFountain) {
      let mode = mappedMode(FT_MODES);
      // The pump may be read apart from the power (Petkit's pump running,
      // Xiaomi's watering status): the water runs only while both say so.
      const pumpSt = cfg.pump_running_entity ? stateObj(hass, cfg.pump_running_entity) : null;
      const pumpRuns = pumpSt && !["unknown", "unavailable"].includes(pumpSt.state) ? ftFlowOf(pumpSt.state) : null;
      const base = mode && mode !== "filter" && mode !== "pump" && mode !== "low" ? mode
        : powerDerived ? (isActiveState(norm) ? "flowing" : "off")
        : ftFlowOf(rawState) && pumpRuns !== false ? "flowing" : "off";
      // Days or a percentage, due at or below a threshold: three days by
      // default, or ten percent for a counter kept in percent.
      const wear = (id) => {
        const ws = id ? stateObj(hass, id) : null;
        if (!ws || ["unknown", "unavailable"].includes(ws.state)) return null;
        const lim = parseFloat(cfg.filter_due_below);
        const unit = String(unitOf(hass, id) || "").trim().toLowerCase();
        // A date (the next flush) gives the days left until it; it is read
        // first, since a number would take its year for a count.
        if ((ws.attributes && ws.attributes.device_class === "timestamp") || /^\d{4}-\d{2}-\d{2}/.test(String(ws.state))) {
          const at = Date.parse(ws.state);
          if (!Number.isFinite(at)) return null;
          const left = (at - Date.now()) / 86400000;
          return { v: left, due: left <= (Number.isFinite(lim) ? lim : 3) };
        }
        let v = numericState(hass, id);
        if (v === null) return null;
        if (unit === "%") return { v, due: v <= (Number.isFinite(lim) ? lim : 10) };
        const days = Object.prototype.hasOwnProperty.call(FT_DAY_UNITS, unit) ? v * FT_DAY_UNITS[unit] : v;
        return { v: days, due: days <= (Number.isFinite(lim) ? lim : 3) };
      };
      const filter = wear(cfg.filter_life_entity);
      const pump = wear(cfg.pump_clean_entity);
      const wSt = cfg.water_level_entity ? stateObj(hass, cfg.water_level_entity) : null;
      const wKnown = !!wSt && !["unknown", "unavailable"].includes(wSt.state);
      // A number is a percentage only when it says so: a level from 1 to 4
      // or millilitres would otherwise always read as low.
      const wNum = wKnown ? numericState(hass, cfg.water_level_entity) : null;
      const wUnitRaw = wNum !== null ? String(unitOf(hass, cfg.water_level_entity) || "").trim() : "";
      const wPct = wNum !== null && wUnitRaw === "%" ? wNum : null;
      const wLim = parseFloat(cfg.level_empty_below);
      const low = wPct !== null ? wPct <= (Number.isFinite(wLim) ? wLim : 10)
        : wNum !== null ? Number.isFinite(wLim) && wNum <= wLim
        : wKnown && ftLowOf(wSt) === true;
      const offline = ["unavailable", "unknown"].includes(String(rawState)) || /^offline$/i.test(String(rawState).trim());
      if (offline) mode = "offline";
      else if (!mode || mode === base) mode = low ? "low" : filter && filter.due ? "filter" : pump && pump.due ? "pump" : base;
      if (!cfg.state_show_raw) stateLabel = t(hass, FT_LABELS[mode]);
      color = FT_COLORS[mode];
      // A word says the level ("medium") and earns its line; a contact only
      // speaks up when the water runs low.
      const wWord = wKnown && wNum === null && !["on", "off", "true", "false"].includes(String(wSt.state).trim().toLowerCase());
      if (wKnown && (wNum !== null || low || wWord)) {
        extraLines.push({
          key: "water", icon: low ? "mdi:alert-circle-outline" : "mdi:cup-water", label: t(hass, "ft_line_water"),
          value: wNum !== null || !low ? keepTogether(formatInfoValue(wSt, hass, null, cfg, cfg.water_level_entity)) : t(hass, "ft_low_water"),
          entity: cfg.water_level_entity, warn: low,
        });
      }
      if (filter) {
        extraLines.push({ key: "filter", icon: "mdi:air-filter", label: t(hass, "filter"),
          value: keepTogether(formatInfoValue(stateObj(hass, cfg.filter_life_entity), hass, null, cfg, cfg.filter_life_entity)),
          entity: cfg.filter_life_entity, caution: filter.due });
      }
      // When the pump last ran (#58): running now, or the time it stopped.
      if (pumpSt && pumpRuns !== null && cfg.pump_running_entity) {
        const ts = Date.parse(pumpSt.last_changed);
        if (pumpRuns || Number.isFinite(ts)) {
          extraLines.push({ key: "pump_last", icon: "mdi:water-sync", label: t(hass, "ft_last_pump"),
            value: keepTogether(pumpRuns ? t(hass, "ft_pump_on") : feedTime(hass, ts)), entity: cfg.pump_running_entity });
        }
      }
      if (pump) {
        extraLines.push({ key: "pump", icon: "mdi:pump", label: t(hass, "ft_line_pump"),
          value: keepTogether(formatInfoValue(stateObj(hass, cfg.pump_clean_entity), hass, null, cfg, cfg.pump_clean_entity)),
          entity: cfg.pump_clean_entity, caution: pump.due });
      }
      fountain = {
        mode,
        flowing: base === "flowing",
        offline: mode === "offline",
        low,
        due: !!((filter && filter.due) || (pump && pump.due)),
        fill: wPct !== null ? Math.max(0, Math.min(100, wPct)) : null,
        round: cfg.fountain_layout === "round",
      };
    }

    // Air fryer. Its own words first, then the shared state, and last the
    // sensors that know better than the state: a basket pulled out, and the
    // reminder to shake it.
    let fryer = null;
    if (cap.airFryer) {
      const mappedRaw = !!(st && cfg.state_map && Object.prototype.hasOwnProperty.call(cfg.state_map, rawState));
      let mode = !powerDerived && !mappedRaw ? fryerModeOf(rawState) : "";
      if (!mode) mode = FRYER_FROM_NORM[norm] || "off";
      const flag = (id) => {
        const s = id ? stateObj(hass, id) : null;
        return !!s && ["on", "true", "open", "opened"].includes(String(s.state).toLowerCase());
      };
      if (flag(cfg.basket_entity) && ["preheating", "preheated", "cooking", "shake", "paused", "keep_warm"].includes(mode)) mode = "basket_out";
      else if (mode === "cooking" && flag(cfg.shake_entity)) mode = "shake";
      if (!cfg.state_show_raw && FRYER_LABELS[mode]) stateLabel = t(hass, FRYER_LABELS[mode]);
      if (mode === "shake" || mode === "basket_out") color = STATE_COLORS.paused;

      const target = cfg.target_temperature_entity ? numericState(hass, cfg.target_temperature_entity) : null;
      const clock = remSec !== null && remSec > 0 ? formatClock(remSec) : "";
      const temp = target !== null ? `${Math.round(target)}\u00b0` : "";
      const screen = ["preheating", "keep_warm"].includes(mode) ? temp || clock
        : ["cooking", "shake", "paused", "basket_out", "delayed"].includes(mode) ? clock || temp
        : "";

      // The second basket of a dual fryer, when it reports on its own.
      const layout = ["window", "dual"].includes(cfg.fryer_layout) ? cfg.fryer_layout : "basket";
      let mode2 = mode;
      if (layout === "dual" && cfg.basket2_state_entity) {
        const s2 = stateObj(hass, cfg.basket2_state_entity);
        const raw2 = s2 ? s2.state : null;
        mode2 = fryerModeOf(raw2) || FRYER_FROM_NORM[normalizeState(raw2, cfg.state_map)] || "off";
        if (s2 && !["unknown", "unavailable"].includes(s2.state)) {
          extraLines.push({
            key: "basket2",
            icon: "mdi:numeric-2-box-outline",
            label: t(hass, "af_basket2"),
            value: t(hass, FRYER_LABELS[mode2] || FRYER_NORMS[mode2] || "idle"),
            entity: cfg.basket2_state_entity,
          });
        }
      }
      // With basket 1 at rest, the screen of a dual fryer shows basket 2.
      const lead = layout === "dual" && mode === "off" ? mode2 : mode;
      // Its time left is basket 1's, so only the temperature carries over.
      const leadScreen = lead === mode ? screen : lead === "done" ? "" : temp;
      fryer = { mode, mode2, layout, icon: FRYER_ICONS[lead] || "", screen: leadScreen };
    }

    // EV charger. The status says what the charger does, in its own words or
    // through state_map. Two entities may say more, and only where they cannot
    // be wrong: an error entity reporting an error makes it an error, whatever
    // else is known, and a plug with no car makes a recognised status a
    // charger with no vehicle, unless that status is an error or offline.
    // Without a status entity, the plug and the power meter say it between
    // them, the way a smart plug says a washing machine runs: no car, then
    // charging above the threshold, then plugged in. A plug's contact, the
    // meter or a switch put in the state is not a status either.
    let ev = null;
    if (cap.evCharger) {
      const plugAsState = !cfg.vehicle_entity && !!st && domainOf(cfg.state_entity) === "binary_sensor"
        && st.attributes.device_class === "plug";
      const plugged = evPluggedOf(cfg.vehicle_entity ? stateObj(hass, cfg.vehicle_entity) : plugAsState ? st : null);
      const errSt = cfg.error_entity ? stateObj(hass, cfg.error_entity) : null;
      const fault = evErrorOf(errSt);
      const evThreshold = hasThreshold && Number.isFinite(parseFloat(cfg.power_on_threshold))
        ? parseFloat(cfg.power_on_threshold) : EV_POWER_THRESHOLD;
      const w = cfg.power_entity ? wattsOf(hass, cfg.power_entity) : null;
      const flowing = w === null ? null : w >= evThreshold;
      // The energy going the other way, from the car: on a meter of its own
      // (OCPP's Power.Active.Export) above the threshold, or below zero on a
      // meter that counts it that way (a Quasar over Modbus). A meter that
      // counts both ways alike says nothing of the direction; the status does.
      const back = cfg.discharge_power_entity ? wattsOf(hass, cfg.discharge_power_entity) : null;
      const feeding = (back !== null && back >= evThreshold) || (w !== null && w <= -evThreshold);
      const fromPlug = !cfg.state_entity || plugAsState
        || cfg.state_entity === cfg.power_entity || cfg.state_entity === cfg.vehicle_entity
        || cfg.state_entity === cfg.discharge_power_entity
        || ["switch", "input_boolean"].includes(domainOf(cfg.state_entity));
      let mode = "";
      if (fromPlug) {
        if (plugged === false) mode = "no_vehicle";
        else if (feeding) mode = "discharging";
        else if (flowing) mode = "charging";
        else if (plugged) mode = "connected";
        else if (flowing === null) mode = "offline";
      } else {
        mode = evModeOf(rawState, cfg.state_map);
        // A car that stopped taking energy after taking some has its charge,
        // once both the session and the meter can be read. An entry of
        // state_map says what the state is, and is not second-guessed.
        const key = String(rawState).trim();
        const mapped = !!cfg.state_map && Object.prototype.hasOwnProperty.call(cfg.state_map, key);
        if (mode === "paused" && !mapped && EV_SUSPENDED_BY_CAR.includes(evKey(key))) {
          const energy = cfg.session_energy_entity ? numericState(hass, cfg.session_energy_entity) : null;
          if (energy !== null && energy > 0 && flowing === false) mode = "done";
        }
        // A car giving energy back discharges, whatever the status calls it:
        // OCPP has no word for it and reports a charge.
        if (feeding && EV_CAR_STATES.includes(mode)) mode = "discharging";
        if (plugged === false && mode && mode !== "error" && mode !== "offline") mode = "no_vehicle";
        // Tesla's ready is a car plugged in, which only its contact can tell
        // from a Wallbox's ready, a box with no car at it.
        if (plugged === true && !mode && evKey(key) === "ready") mode = "connected";
      }
      if (fault.active) mode = "error";
      // The entity's own words on request, while it has some.
      const showRaw = cfg.state_show_raw && !fromPlug && !!st && !HA_OFFLINE_STATES.includes(String(rawState).trim());
      if (mode) {
        if (!showRaw) stateLabel = t(hass, `ev_${mode}`);
        color = EV_COLORS[mode];
        norm = EV_NORMS[mode];
      } else if (fromPlug) {
        // A meter at rest and no plug to ask: not charging, which is all that
        // can be said. Never the wattage as a state.
        stateLabel = t(hass, "idle");
        color = STATE_COLORS.idle;
        norm = "idle";
      }

      // The power, the session's energy and the current limit, as Home
      // Assistant prints them: a charger counts in kilowatts and kilowatt
      // hours, and the decimals are what makes them worth reading.
      const evLine = (entity, key, icon, label) => {
        const s = entity ? stateObj(hass, entity) : null;
        if (!s || HA_OFFLINE_STATES.includes(s.state)) return;
        extraLines.push({ key, icon, label, value: keepTogether(formatInfoValue(s, hass, null, cfg, entity)), entity });
      };
      evLine(cfg.power_entity, "power", cfg.power_icon || "mdi:flash", t(hass, "power"));
      evLine(cfg.discharge_power_entity, "discharge_power", "mdi:battery-arrow-up-outline", t(hass, "ev_line_discharge"));
      evLine(cfg.session_energy_entity, "session_energy", "mdi:battery-charging", t(hass, "ev_line_session"));
      evLine(cfg.current_limit_entity, "current_limit", "mdi:current-ac", t(hass, "ev_line_limit"));
      // The error in the charger's words, when it has some.
      if (fault.active && fault.text) {
        extraLines.push({
          key: "error",
          icon: "mdi:alert-circle-outline",
          label: t(hass, "error"),
          value: modeLabel(hass, errSt, fault.text, cfg),
          entity: cfg.error_entity,
          warn: true,
          wrap: true,
        });
      }
      // A car at the plug, as far as the card can tell: every state that has
      // one, and an error the plug says has one too. The drawing takes the
      // plug out of its holster for it.
      ev = { mode: mode || norm, plugged: EV_CAR_STATES.includes(mode) || (mode === "error" && plugged === true) };
      // The energy runs along the cable at the pace of the power, the power
      // given back when the car discharges on a meter of its own.
      ev.flow = evFlowSeconds(back !== null && back >= evThreshold ? back : w);
      // A plug that moved, or a charge that ended, while the card was open is
      // played once: the plug going into the car or back to its holster, the
      // light flashing at the end of a charge. Only from a state that says
      // so: a card that opens, or a charger coming back online, shows the
      // state as it is, not a change nobody saw happen. The shot lasts while
      // what it shows holds, so a charge starting right after the plug went
      // in does not cut it short, and the card redraws itself once it is over.
      const prev = this._evPrev;
      const now = Date.now();
      if (prev) {
        const name = prev.mode === "no_vehicle" && ev.plugged ? "plug-in"
          : prev.plugged && ev.mode === "no_vehicle" ? "plug-out"
          : ["charging", "paused"].includes(prev.mode) && ev.mode === "done" ? "just-done"
          : "";
        if (name) this._evShot = { name, at: now, from: prev.mode };
      }
      this._evPrev = { mode: ev.mode, plugged: ev.plugged };
      const shot = this._evShot;
      const holds = shot && (shot.name === "plug-in" ? ev.plugged
        : shot.name === "plug-out" ? ev.mode === "no_vehicle" : ev.mode === "done");
      if (holds && now >= shot.at && now - shot.at < EV_ONE_SHOT_MS) {
        ev.shot = shot.name;
        ev.from = shot.from;
        ev.since = (shot.at - now) / 1000;
        this._armEvShotEnd(EV_ONE_SHOT_MS - (now - shot.at));
      } else {
        this._evShot = null;
      }
    }

    // An iron, read from the plug it is on: heating or off, and the state line
    // says so in its own words, since "running" says nothing of an iron.
    let leftOn = false;
    let iron = null;
    if (cap.iron) {
      // Its thermostat cuts in and out all the while it is on: at temperature
      // the plug reads nothing, and the iron is hot and ready rather than off.
      // So the plug's switch says whether it is on, the meter whether it is
      // heating, and how hard: the more it draws, the more steam. Ready only
      // follows a heat seen since the switch went on, since a plug left on
      // with the iron switched off on its own body reads nothing either.
      const sw = st && ["switch", "input_boolean"].includes(domainOf(cfg.state_entity)) ? String(st.state).toLowerCase() : "";
      const onAt = isFinite(threshold) ? threshold : 10;
      let mode;
      if (sw === "off") mode = "off";
      else if (watts !== null) {
        if (watts > onAt) mode = "heating";
        else mode = sw === "on" && this._ironHot ? "ready" : "off";
      } else mode = isActiveState(norm) ? "heating" : "off";
      if (mode === "heating") this._ironHot = true;
      else if (mode === "off") this._ironHot = false;
      const level = mode !== "heating" ? 0 : watts === null ? 3 : watts < IRON_LOW_W ? 1 : watts < IRON_HIGH_W ? 2 : 3;
      norm = mode === "off" ? "idle" : "running";
      if (!cfg.state_show_raw) stateLabel = t(hass, IRON_LABELS[mode]);
      color = IRON_COLORS[mode];
      iron = { mode, level };
      // Left on: the one thing an owner puts a plug on an iron for. The card
      // counts the minutes itself, because a plug left on stops changing and
      // nothing would push the update that crosses the threshold. The count
      // starts when the state entity last changed, which on a switch is the
      // moment it was switched on; a meter moving with every watt only dates
      // from when the card first saw it heating.
      const afterMin = parseFloat(cfg.left_on_after);
      if (Number.isFinite(afterMin) && afterMin > 0 && mode !== "off") {
        if (!this._onSince) this._onSince = changedSinceOf(st);
        leftOn = Date.now() - this._onSince >= afterMin * 60000;
      } else {
        this._onSince = null;
      }
      this._clearClockTimer();
      // Once it has fired there is nothing left to count: the next change of
      // state is the one that clears it, and that one arrives on its own.
      if (this._onSince && !leftOn && !this._inert) {
        this._clockTimer = setInterval(() => this._render(), CLOCK_TICK_MS);
      }
      if (leftOn && !cfg.state_show_raw) {
        stateLabel = t(hass, "left_on");
        color = STATE_COLORS.error;
      }
    }

    // Air purifier and fan. The fan entity says on or off, its speed, its
    // preset, whether it oscillates and which way it blows; a select names the
    // mode of the purifiers that have no fan entity (LG, Haier, Midea), and a
    // plug only says whether it runs. Night mode may be a switch of its own,
    // and heat a thermostat of its own.
    const airState = () => {
      const a = (st && st.attributes) || {};
      const dom = domainOf(cfg.state_entity);
      const raw = String(rawState === undefined || rawState === null ? "" : rawState).trim().toLowerCase();
      const isSelect = dom === "select" || dom === "input_select";
      const presetRaw = isSelect ? rawState : a.preset_mode;
      const preset = airPresetOf(presetRaw);
      const offline = !powerDerived && (!st || ["unavailable", "unknown"].includes(raw));
      // LG's purifier keeps its mode in a select and its power in a switch.
      const toggleSt = cfg.toggle_entity ? stateObj(hass, cfg.toggle_entity) : null;
      const on = powerDerived ? isActiveState(norm)
        : toggleSt && String(toggleSt.state).toLowerCase() === "off" ? false
        : isSelect ? !AIR_STOP_RE.test(stripAccents(raw))
        : dom === "climate" ? raw !== "off"
        : ["on", "true", "1"].includes(raw) || isActiveState(norm);
      const nightSt = cfg.night_mode_entity ? stateObj(hass, cfg.night_mode_entity) : null;
      const night = preset === "night" || (!!nightSt && ["on", "true"].includes(String(nightSt.state).toLowerCase()));
      const heaterSt = cfg.heater_entity ? stateObj(hass, cfg.heater_entity) : null;
      // A Dyson Hot+Cool may be its climate entity: heating is then its own.
      const action = String(a.hvac_action || "").toLowerCase();
      let heat = preset === "heat" || (dom === "climate" && (action ? ["heating", "preheating"].includes(action) : raw === "heat"));
      if (heaterSt) {
        const hs = String(heaterSt.state).toLowerCase();
        const ha = String((heaterSt.attributes || {}).hvac_action || "").toLowerCase();
        heat = heat || (domainOf(cfg.heater_entity) === "climate"
          ? hs !== "off" && (ha ? ["heating", "preheating"].includes(ha) : hs === "heat")
          : ["on", "true", "heat", "heating"].includes(hs));
      }
      let mode = offline ? "offline" : !on ? "off" : night ? "night" : heat ? "heat" : "run";
      const mapped = mappedMode(["off", "run", "night", "heat"]);
      if (mapped) mode = mapped;
      const pct = numberOrNull(a.percentage);
      let level = airLevelOf(pct, mode === "night" ? "night" : preset, presetRaw);
      // Nothing says the speed but the plug: its power does, when told how
      // much the fan draws at the top.
      const byPower = pct === null && !presetSpeedOf(presetRaw) && !["night", "turbo"].includes(preset) ? powerSpeedLevel(hass, cfg) : 0;
      if (byPower) level = byPower;
      if (["run", "night", "heat"].includes(mode)) {
        if (pct !== null && pct > 0) {
          extraLines.push({ key: "speed", icon: "mdi:fan", label: t(hass, "section_fan_speed"), value: `${Math.round(pct)} %`, entity: cfg.state_entity });
        } else if (byPower) {
          extraLines.push({ key: "speed", icon: "mdi:fan", label: t(hass, "section_fan_speed"), value: `${byPower} / 3`, entity: cfg.power_entity });
        }
        // The preset gets a line of its own only when the state line does not
        // already say it: not for the night, the heat, auto or the natural wind,
        // nor for manual.
        if (!isSelect && !["night", "heat", "auto", "natural"].includes(preset)
          && !/^(manual|normal|none|direct|customize)$/i.test(String(presetRaw || ""))) modeLine(st, "preset_mode");
      }
      return { a, mode, preset, presetRaw, level, heat, night, pct,
        spd: mode === "night" ? 3 : AIR_SPEEDS[level], warm: mode === "night" && heat };
    };
    const airLabel = (mode, runKey) => (mode === "offline" ? "ev_offline" : mode === "off" ? "ac_off"
      : mode === "night" ? "pf_night" : mode === "heat" ? "ac_heating" : runKey);

    let purifier = null;
    if (cap.airPurifier) {
      const s = airState();
      // The quality of the air: its four steps on the gauge, and a line that
      // names the step and gives the reading.
      const aqSt = cfg.air_quality_entity ? stateObj(hass, cfg.air_quality_entity) : null;
      const aq = aqLevelOf(aqSt, cfg.air_quality_entity);
      if (aqSt && !["unknown", "unavailable"].includes(aqSt.state)) {
        const n = parseFloat(aqSt.state);
        const reading = /^-?\d+(\.\d+)?$/.test(String(aqSt.state).trim())
          ? `${Math.round(n)}${unitOf(hass, cfg.air_quality_entity) ? ` ${unitOf(hass, cfg.air_quality_entity)}` : ""}` : "";
        const word = aq ? t(hass, AQ_LABELS[aq]) : reading ? "" : cleanStateLabel(aqSt.state);
        extraLines.push({
          key: "air_quality", icon: "mdi:air-filter", label: t(hass, "section_air_quality"),
          value: [word, reading].filter(Boolean).map(keepTogether).join(" \u00b7 "), entity: cfg.air_quality_entity,
        });
      }
      if (!cfg.state_show_raw) stateLabel = t(hass, airLabel(s.mode, s.preset === "auto" ? "pf_auto" : "pf_purifying"));
      color = AIR_COLORS[s.mode];
      const name = `${cfg.state_entity || ""} ${(st && st.attributes.friendly_name) || ""}`.toLowerCase();
      purifier = {
        mode: s.mode, level: s.level, spd: s.spd, warm: s.warm, aq,
        osc: s.a.oscillating === true, back: String(s.a.direction || "").toLowerCase() === "reverse",
        layout: ["cylinder", "box", "ring"].includes(cfg.purifier_layout) ? cfg.purifier_layout : /dyson/.test(name) ? "ring" : "cylinder",
        screen: cfg.display_entity ? airScreenOf(stateObj(hass, cfg.display_entity)) : undefined,
      };
    }

    let fanCtx = null;
    if (cap.fanAppliance) {
      const s = airState();
      const name = `${cfg.state_entity || ""} ${(st && st.attributes.friendly_name) || ""}`.toLowerCase();
      const layout = ["stand", "table", "ceiling"].includes(cfg.fan_layout) ? cfg.fan_layout : FAN_CEILING_RE.test(stripAccents(name)) ? "ceiling" : "stand";
      const ceiling = layout === "ceiling";
      // Summer draws the air up, winter sends it down. Most integrations call
      // winter reverse, Dreo puts it in a preset, and a brand that does it the
      // other way round has its own box to tick.
      const reverse = String(s.a.direction || "").toLowerCase() === "reverse" || /^reverse$/i.test(String(s.presetRaw || ""));
      const winter = ceiling && reverse !== !!cfg.fan_direction_inverted;
      const natural = s.preset === "natural" && s.mode === "run";
      const lightSt = ceiling && cfg.light_entity ? stateObj(hass, cfg.light_entity) : null;
      const runKey = natural ? "fan_natural" : ceiling ? (winter ? "fan_winter" : "fan_summer") : "fan_on";
      if (!cfg.state_show_raw) stateLabel = t(hass, airLabel(s.mode, runKey));
      color = s.mode === "run" && winter ? "#ff7043" : AIR_COLORS[s.mode];
      const slow = ceiling ? 1.3 : 1;
      fanCtx = {
        mode: s.mode, level: s.level, spd: s.spd, warm: s.warm, natural, winter, layout,
        rot: ((s.mode === "night" ? 1.6 : ROTOR_SPEEDS[s.level]) * slow).toFixed(2),
        // An entity that says whether it oscillates is believed; a fan on a
        // plug cannot say, so the box says it for it.
        osc: !ceiling && (typeof s.a.oscillating === "boolean" ? s.a.oscillating : !!cfg.oscillating),
        lamp: !!lightSt, lit: !!lightSt && ["on", "true"].includes(String(lightSt.state).toLowerCase()),
        wood: ceiling && !!cfg.wood_blades,
      };
    }

    // A toaster, read from its plug. Toasting above the threshold, then the
    // slices are up: ready for a few minutes, after which it waits again,
    // since nobody leaves their toast in the toaster for the afternoon.
    let toaster = null;
    if (cap.toaster) {
      const sw = st && ["switch", "input_boolean"].includes(domainOf(cfg.state_entity)) ? String(st.state).toLowerCase() : "";
      let mode = isActiveState(norm) ? "toasting" : norm === "done" ? "done" : sw === "off" || rawIsMeaningless ? "off" : "idle";
      if (mode === "done") {
        if (!this._toastDoneAt) this._toastDoneAt = Date.now();
        if (Date.now() - this._toastDoneAt >= TOASTER_READY_MS) mode = "idle";
      } else {
        this._toastDoneAt = null;
      }
      this._clearClockTimer();
      if (mode === "done" && !this._inert) this._clockTimer = setInterval(() => this._render(), CLOCK_TICK_MS);
      if (!cfg.state_show_raw) stateLabel = t(hass, TOASTER_LABELS[mode]);
      color = TOASTER_COLORS[mode];
      toaster = { mode, layout: TOASTER_LAYOUTS[cfg.toaster_layout] ? cfg.toaster_layout : "two" };
    }

    // A hair dryer, read from its plug: nothing is off, the fan alone is cool
    // air, the heater on is hot air, and the air comes out harder on high.
    // Without a meter, its switch only says whether it is on.
    let hairDryer = null;
    if (cap.hairDryer) {
      const sw = st && ["switch", "input_boolean"].includes(domainOf(cfg.state_entity)) ? String(st.state).toLowerCase() : "";
      const onAt = isFinite(threshold) ? threshold : 10;
      const heatCfg = parseFloat(cfg.heat_threshold);
      const heatAt = isFinite(heatCfg) && heatCfg > 0 ? heatCfg : HD_HEAT_W;
      let mode;
      if (sw === "off") mode = "off";
      else if (watts !== null) mode = watts <= onAt ? "off" : watts < heatAt ? "cool" : "hot";
      else mode = sw === "on" || isActiveState(norm) ? "on" : "off";
      const level = mode === "cool" ? 2 : mode === "hot" ? (watts >= Math.max(HD_HIGH_W, heatAt * 2) ? 5 : 3) : mode === "on" ? 3 : 0;
      if (!cfg.state_show_raw) stateLabel = t(hass, HD_LABELS[mode]);
      color = HD_COLORS[mode];
      hairDryer = { mode, level, layout: cfg.hair_dryer_layout === "ring" ? "ring" : "pistol" };
    }

    // A screen, read from its plug first: nothing at all is off, a trickle up
    // to the threshold is standby, above it the screen is on. Its players then
    // say what it shows; without a meter, they say whether it is on at all.
    let screen = null;
    if (cap.screen) {
      const ids = [domainOf(cfg.state_entity) === "media_player" ? cfg.state_entity : null]
        .concat(SCREEN_MEDIA_FIELDS.map((f) => cfg[f]));
      const players = [...new Set(ids.filter(Boolean))].map((id) => stateObj(hass, id)).filter(Boolean);
      const rank = (p) => MEDIA_RANK[String(p.state).toLowerCase()] || 0;
      const active = players.reduce((best, p) => (rank(p) > (best ? rank(best) : 0) ? p : best), null);
      const ms = active ? String(active.state).toLowerCase() : "";
      // A light too: Kiosk Satellite gives a tablet's screen as one, its
      // brightness and all.
      const sw = st && ["switch", "input_boolean", "binary_sensor", "light"].includes(domainOf(cfg.state_entity)) ? String(st.state).toLowerCase() : "";
      const limit = hasThreshold && isFinite(threshold) ? threshold : SCREEN_STANDBY_W;
      let power = null;
      // A ping or any on/off sensor says the screen itself answers; a plug
      // only says it has power, so a box on standby then has the last word.
      const alive = sw === "on" && domainOf(cfg.state_entity) === "binary_sensor";
      if (sw === "off") power = "off";
      else if (watts !== null) power = watts <= SCREEN_OFF_W ? "off" : watts <= limit ? "standby" : "on";
      else if (alive || active) power = "on";
      else if (players.some((p) => String(p.state).toLowerCase() === "standby")) power = "standby";
      else if (players.some((p) => String(p.state).toLowerCase() === "off")) power = "off";
      else if (sw === "on") power = "on";
      const layout = screenLayoutOf(cfg, st);
      const tablet = SCREEN_TABLETS.includes(layout);
      let mode = power || "off";
      if (power === "on") {
        if (cfg.lock_entity && screenLocked(stateObj(hass, cfg.lock_entity), cfg.lock_entity)) mode = "locked";
        // A tablet's screensaver keeps its screen on: the clock it shows is
        // what the card draws.
        else if (tablet && camOn(hass, cfg.screensaver_entity)) mode = "saver";
        else if (ms === "playing" || ms === "buffering") mode = "playing";
        else if (ms === "paused") mode = "paused";
        // A tablet on, and its browser at rest, shows its dashboard.
        else if (tablet) mode = "dashboard";
        else if (ms === "idle") mode = "home";
      }
      // A new picture each time the screen comes on, unless one was chosen.
      const lit = SCREEN_LIT.includes(mode);
      const pool = tablet ? SCREEN_TAB_IMAGES : layout === "computer" || layout === "laptop" ? SCREEN_PC_IMAGES : SCREEN_TV_IMAGES;
      if (SCREEN_IMAGES.includes(cfg.screen_image)) this._screenImage = cfg.screen_image;
      else if (lit && (!this._screenLit || !pool.includes(this._screenImage))) {
        this._screenImage = pool[Math.floor(Math.random() * pool.length)];
      }
      this._screenLit = lit;
      const a = (active && active.attributes) || {};
      // What a player is playing has its cover, which says it better than
      // any picture of the card's.
      // And a tablet's own screenshot, as a camera or an image entity,
      // shows what its dashboard really looks like.
      const shot = tablet && mode === "dashboard" && cfg.screenshot_entity ? stateObj(hass, cfg.screenshot_entity) : null;
      const shotPic = shot && !["unavailable", "unknown"].includes(String(shot.state).toLowerCase()) && shot.attributes.entity_picture
        ? String(shot.attributes.entity_picture) : "";
      const pic = (mode === "playing" || mode === "paused") && a.entity_picture ? String(a.entity_picture) : shotPic;
      const cover = pic && this._hass && typeof this._hass.hassUrl === "function" ? this._hass.hassUrl(pic) : pic;
      // A laptop runs on its battery and charges on its cable, as a tablet.
      const laptop = layout === "laptop";
      const charging = (tablet || laptop) && screenCharging(hass, cfg.charging_entity);
      if (power !== null && !cfg.state_show_raw) {
        stateLabel = t(hass, tablet && mode === "off" ? "screen_dark" : SCREEN_LABELS[mode]);
        if (charging) stateLabel += ` \u00b7 ${t(hass, "tab_charging")}`;
      }
      if (power !== null) color = SCREEN_COLORS[mode];
      // Nothing it reads answers: the plug, the meter and the players are all
      // unavailable. That is a screen out of reach, not one whose state is
      // unknown.
      else if (rawIsMeaningless && watts === null && players.every((p) => ["unavailable", "unknown"].includes(String(p.state).toLowerCase()))) {
        stateLabel = t(hass, "ev_offline");
        color = SCREEN_COLORS.off;
      }
      const muted = !!active && a.is_volume_muted === true && lit;
      if (active && lit && mode !== "locked") {
        const value = [a.app_name || a.source, a.media_title, muted ? t(hass, "screen_muted") : ""].filter(Boolean).map((v) => keepTogether(String(v))).join(" \u00b7 ");
        if (value) {
          extraLines.push({ key: "media", icon: "mdi:television-play", label: a.friendly_name || active.entity_id, value, entity: active.entity_id });
        }
      }
      const source = lit ? screenSourceOptions(hass, cfg) : null;
      if (source && source.current) {
        extraLines.push({ key: "screen_source", icon: "mdi:video-input-hdmi", label: t(hass, "screen_source"), value: keepTogether(screenSourceLabel(hass, stateObj(hass, source.entity), source.current)), entity: source.entity });
      }
      if (tablet && power !== null) {
        const page = cfg.url_entity ? screenPage((stateObj(hass, cfg.url_entity) || {}).state) : "";
        if (page && lit) extraLines.push({ key: "tab_page", icon: "mdi:web", label: t(hass, "tab_line_page"), value: page, entity: cfg.url_entity });
        const touched = screenTouchedAt(hass, cfg.last_interaction_entity);
        if (touched !== null) {
          extraLines.push({ key: "tab_touched", icon: "mdi:gesture-tap", label: t(hass, "tab_line_touched"), value: keepTogether(feedTime(hass, touched)), entity: cfg.last_interaction_entity });
        }
        const bright = lit ? screenBrightness(hass, cfg.brightness_entity) : null;
        if (bright !== null) {
          extraLines.push({ key: "tab_brightness", icon: "mdi:brightness-6", label: t(hass, "lamp_line_brightness"), value: keepTogether(`${bright} %`), entity: cfg.brightness_entity });
        }
      }
      // The screensaver's clock moves on with the time.
      this._clearClockTimer();
      if (mode === "saver" && !this._inert) this._clockTimer = setInterval(() => this._render(), CLOCK_TICK_MS);
      // A computer whose tower and screens hang on two plugs (HACF): the tower
      // has its own entity, a switch, a ping or a meter, and its own light.
      let tower = null;
      if (layout === "computer" && cfg.tower_entity) {
        const ts = stateObj(hass, cfg.tower_entity);
        if (ts) {
          const tw = parseFloat(ts.state);
          const meter = domainOf(cfg.tower_entity) === "sensor" && Number.isFinite(tw);
          tower = meter ? (tw > SCREEN_STANDBY_W ? "on" : "off") : ["on", "home", "true"].includes(String(ts.state).toLowerCase()) ? "on" : "off";
          if (meter) {
            extraLines.push({ key: "tower_power", icon: "mdi:desktop-tower", label: t(hass, "tower_line"), value: `${Math.round(tw)} ${unitOf(hass, cfg.tower_entity) || "W"}`, entity: cfg.tower_entity });
          }
          if (tower === "on" && !lit && !cfg.state_show_raw) {
            stateLabel = t(hass, "tower_on");
            color = SCREEN_COLORS.on;
          }
        }
      }
      const battery = (tablet || laptop) && cfg.battery_entity ? numericState(hass, cfg.battery_entity) : null;
      screen = {
        tower,
        mode, layout, image: this._screenImage || pool[0], cover, muted, tablet, laptop, charging, battery,
        laptopStyle: laptop ? laptopStyleOf(cfg, stateObj(hass, cfg.state_entity)) : "",
        // A classic laptop is black unless a colour is chosen, its own or the card's.
        color: cfg.laptop_color || (laptop && !cfg.illustration_color && laptopStyleOf(cfg, stateObj(hass, cfg.state_entity)) === "classic" ? "black" : ""),
        seen: tablet && camOn(hass, cfg.motion_entity),
        clock: mode === "saver" ? feederClock(hass) : "",
        date: mode === "saver" ? new Date(Date.now()).toLocaleDateString(lang(hass), { weekday: "short", day: "numeric", month: "short" }).toUpperCase() : "",
      };
    }

    // A network device, read from whatever it reports: off or online from its
    // state, busy from its traffic, its disks or its processor, in alert from
    // a problem, a failed disk or a temperature too high.
    let network = null;
    if (cap.network) {
      // The device itself, found without its disks: a disk on a device of its
      // own is read from that device, not taken for the NAS.
      const anchor = anchorEntity(hass, { ...cfg, disk1_entity: undefined, disk2_entity: undefined, disk3_entity: undefined, disk4_entity: undefined });
      const anchorReg = anchor && hass.entities ? hass.entities[anchor] : null;
      const anchorDevice = anchorReg ? anchorReg.device_id : null;
      const num = (f) => (cfg[f] ? numericState(hass, cfg[f]) : null);
      const down = cfg.download_entity ? netRateBits(hass, cfg.download_entity) : null;
      const up = cfg.upload_entity ? netRateBits(hass, cfg.upload_entity) : null;
      const cpu = num("cpu_entity"), mem = num("memory_entity"), vol = num("volume_entity");
      const temp = num("temperature_entity"), ports = num("ports_entity"), poe = num("poe_entity"), fan = num("fan_speed_entity");
      const reading = [down, up, cpu, mem, vol, temp, ports, poe, watts].some((v) => v !== null);
      const raw = st ? String(st.state).trim().toLowerCase() : "";
      const layout = netLayoutOf(cfg, st);
      const bays = netBaysOf(cfg);
      const ids = [1, 2, 3, 4].map((i) => cfg[`disk${i}_entity`]);
      const anyDisk = ids.some(Boolean);
      // Without any disk given, the bays only blink with the device's activity.
      const disks = ids.map((id) => (id ? netDiskState(hass, id, anchorDevice) : anyDisk ? "empty" : "gen"))
        .slice(0, layout === "nas" ? bays : 4);
      let mode;
      if (st && NET_OFF_STATES.includes(raw)) mode = "off";
      else if (watts !== null && hasThreshold && isFinite(threshold) && watts <= threshold) mode = "off";
      else if ((!st || rawIsMeaningless) && !reading) mode = "unav";
      else mode = "on";
      let warn = false;
      // A router whose internet link is down is in alert, whatever its own
      // state says; its Wi-Fi switched off stops the waves.
      const offWord = (id) => { const s = stateObj(hass, id); return !!s && NET_OFF_STATES.includes(String(s.state).trim().toLowerCase()); };
      const noWan = layout === "router" && mode !== "off" && mode !== "unav" && !!cfg.wan_entity && offWord(cfg.wan_entity);
      const wifiOff = layout === "router" && !!cfg.wifi_entity && offWord(cfg.wifi_entity);
      if (mode === "on") {
        const tCfg = parseFloat(cfg.temperature_alert);
        const tMax = isFinite(tCfg) && tCfg > 0 ? tCfg : NET_TEMP_ALERT;
        const bCfg = parseFloat(cfg.busy_threshold);
        const busyBits = (isFinite(bCfg) && bCfg > 0 ? bCfg : NET_BUSY_MBIT) * 1e6;
        const pst = cfg.problem_entity ? stateObj(hass, cfg.problem_entity) : null;
        const problem = !!pst && ALERT_ON_STATES.includes(String(pst.state).trim().toLowerCase());
        const watched = layout === "switch" || layout === "rack" ? [] : disks;
        if (problem || (!/^no/.test(raw) && NET_STATE_ALERT_RE.test(raw)) || watched.includes("fail") || (temp !== null && temp >= tMax)) mode = "alert";
        else if ((down || 0) + (up || 0) >= busyBits || watched.includes("busy") || (cpu !== null && cpu >= NET_BUSY_CPU)) mode = "busy";
        warn = mode !== "alert" && watched.includes("warn");
      }
      if (noWan) { mode = "alert"; warn = false; }
      if (!cfg.state_show_raw || mode === "unav") stateLabel = t(hass, noWan ? "net_no_internet" : warn ? "net_warn" : NET_LABELS[mode]);
      color = warn ? NET_COLORS.warn : NET_COLORS[mode];
      const live = mode !== "off" && mode !== "unav";
      const pct = (v) => keepTogether(`${netNumber(hass, v, v < 10 ? 1 : 0)} %`);
      const total = parseFloat(cfg.ports_total);
      if (live) {
        if (down !== null || up !== null) {
          extraLines.push({ key: "net_rate", icon: "mdi:swap-vertical", label: t(hass, "net_line_rate"),
            value: [down !== null ? `\u2193\u00a0${netRateText(hass, down)}` : "", up !== null ? `\u2191\u00a0${netRateText(hass, up)}` : ""]
              .filter(Boolean).join(" \u00b7 "),
            entity: cfg.download_entity || cfg.upload_entity });
        }
        if (cpu !== null || mem !== null) {
          extraLines.push({ key: "net_load", icon: "mdi:chip", label: t(hass, "net_line_load"),
            value: [cpu !== null ? `CPU\u00a0${pct(cpu)}` : "", mem !== null ? `RAM\u00a0${pct(mem)}` : ""].filter(Boolean).join(" \u00b7 "),
            entity: cfg.cpu_entity || cfg.memory_entity });
        }
        if (vol !== null) {
          extraLines.push({ key: "net_volume", icon: "mdi:harddisk", label: t(hass, "net_line_volume"), value: pct(vol), entity: cfg.volume_entity });
        }
        if (ports !== null || poe !== null) {
          const p = ports !== null ? `${Math.round(ports)}${isFinite(total) && total > 0 ? `/${Math.round(total)}` : ""}` : "";
          extraLines.push({ key: "net_ports", icon: "mdi:ethernet", label: t(hass, "section_net_ports"),
            value: [p, poe !== null ? keepTogether(`PoE ${netNumber(hass, poe, 1)} W`) : ""].filter(Boolean).join(" \u00b7 "),
            entity: cfg.ports_entity || cfg.poe_entity });
        }
        const clients = layout === "router" ? num("clients_entity") : null;
        if (clients !== null) {
          extraLines.push({ key: "net_clients", icon: "mdi:devices", label: t(hass, "net_line_clients"),
            value: netNumber(hass, Math.max(0, clients), 0), entity: cfg.clients_entity });
        }
        if (temp !== null) {
          const tst = numericEntity(hass, cfg.temperature_entity);
          const unit = (tst && tst.attributes.unit_of_measurement) || "\u00b0C";
          extraLines.push({ key: "net_temperature", icon: "mdi:thermometer", label: t(hass, "temperature"),
            value: keepTogether(`${netNumber(hass, temp, 1)} ${unit}`), entity: cfg.temperature_entity });
        }
      }
      // The ports lit: as many as are up, or in proportion when the switch has
      // more than are drawn; all of them when nothing counts them.
      const drawn = netPortsOf(cfg);
      let lit = 0;
      if (live) {
        if (ports === null) lit = drawn;
        else if (isFinite(total) && total > drawn) lit = Math.round((ports * drawn) / total);
        else lit = Math.min(drawn, Math.max(0, Math.round(ports)));
      }
      network = { mode, layout, ports: drawn, lit, bays, disks, fanOff: fan !== null && fan <= 0, wifiOff };
    }

    // A pool pump: off, filtering, injecting chlorine, backwashing, running
    // against the frost, in error. Its lines give the water, the air, the pH,
    // the RedOx, the time filtered today, the pressure and the pump's mode.
    let pool = null;
    if (cap.poolPump) {
      const mode = poolModeOf(hass, cfg, st, watts);
      const chlorine = !!cfg.chlorine_pump_entity;
      const dosing = chlorine && poolOn(hass, cfg.chlorine_pump_entity);
      const shown = dosing && mode === "running" ? "chlorinating" : mode;
      if (!cfg.state_show_raw || mode === "unav") {
        stateLabel = t(hass, POOL_LABELS[shown]);
        if (lit && mode !== "unav") stateLabel += ` \u00b7 ${t(hass, "pool_light_on")}`;
      }
      color = POOL_COLORS[shown];
      const pressure = cfg.pressure_entity ? poolPressureBar(hass, cfg.pressure_entity) : null;
      const can = cfg.chlorine_level_entity ? numericState(hass, cfg.chlorine_level_entity) : null;
      if (mode !== "unav") {
        const reading = (key, field, icon, label, digits, fallbackUnit) => {
          // Pentair's water temperature is on its climate entity alone.
          if (domainOf(cfg[field] || "") === "climate") {
            const v = tempState(hass, cfg[field]);
            if (v !== null) extraLines.push({ key, icon, label, entity: cfg[field], value: keepTogether(tempText(hass, cfg, cfg[field], v, temperatureUnit(hass, cfg[field]))) });
            return;
          }
          const e = numericEntity(hass, cfg[field]);
          if (!e) return;
          // pH has no unit, whatever the integration writes after it.
          const unit = key === "pool_ph" ? "" : e.attributes.unit_of_measurement || fallbackUnit;
          extraLines.push({ key, icon, label, entity: cfg[field],
            value: keepTogether(`${netNumber(hass, Number(e.state), digits)}${unit ? ` ${unit}` : ""}`) });
        };
        reading("pool_water", "water_temperature_entity", "mdi:pool-thermometer", t(hass, "pool_line_water"), 1, "\u00b0C");
        reading("pool_air", "air_temperature_entity", "mdi:thermometer", t(hass, "pool_line_air"), 1, "\u00b0C");
        reading("pool_ph", "ph_entity", "mdi:ph", "pH", 2, "");
        reading("pool_redox", "redox_entity", "mdi:lightning-bolt-outline", "RedOx", 0, "mV");
        const ft = numericEntity(hass, cfg.filtration_time_entity);
        if (ft) {
          const u = String(ft.attributes.unit_of_measurement || "h").toLowerCase();
          const secs = Number(ft.state) * (u === "s" ? 1 : u === "min" ? 60 : u === "d" ? 86400 : 3600);
          extraLines.push({ key: "pool_filtered", icon: "mdi:timer-outline", label: t(hass, "pool_line_filtered"),
            value: keepTogether(formatDuration(Math.max(0, secs), hass)), entity: cfg.filtration_time_entity });
        }
        reading("pool_pressure", "pressure_entity", "mdi:gauge", t(hass, "pool_line_pressure"), 1, "bar");
        if (chlorine && can !== null) {
          extraLines.push({ key: "pool_chlorine", icon: "mdi:flask-outline", label: t(hass, "pool_line_chlorine"),
            value: keepTogether(`${Math.round(can)} %`), entity: cfg.chlorine_level_entity, caution: can <= 15 });
        }
        const pm = stateObj(hass, cfg.pool_mode_entity);
        if (pm && entityUsable(hass, cfg.pool_mode_entity)) {
          let text = String(pm.state);
          try {
            if (typeof hass.formatEntityState === "function") text = hass.formatEntityState(pm) || text;
          } catch (e) { /* the raw word, then */ }
          extraLines.push({ key: "pool_mode", icon: "mdi:tune-variant", label: t(hass, "pool_line_mode"), value: text, entity: cfg.pool_mode_entity });
        }
      }
      // The gauge reads the pressure when it is known, else where the mode
      // puts it.
      const needle = pressure !== null && mode !== "unav"
        ? Math.round(-120 + Math.max(0, Math.min(1, pressure / POOL_GAUGE_MAX_BAR)) * 240) : null;
      pool = { mode, chlorine, dosing, lit, needle, can };
    }

    // Solar panels: they produce, produce little, rest at night or are in
    // error. Their lines give the power and the energy of the day.
    let solar = null;
    if (cap.solar) {
      const r = solarReadOf(hass, cfg, st);
      if (!cfg.state_show_raw || r.mode === "unav" || !st) stateLabel = t(hass, SOLAR_LABELS[r.mode]);
      color = SOLAR_COLORS[r.mode];
      if (r.mode !== "unav") {
        if (r.watts !== null) {
          extraLines.push({ key: "power", icon: cfg.power_icon || "mdi:solar-power", label: t(hass, "power"),
            value: keepTogether(energyPowerText(hass, r.watts, false)), entity: r.powerId });
        }
        const today = cfg.energy_today_entity ? stateObj(hass, cfg.energy_today_entity) : null;
        if (today && entityUsable(hass, cfg.energy_today_entity)) {
          extraLines.push({ key: "energy_today", icon: "mdi:solar-power-variant", label: t(hass, "solar_line_today"),
            value: keepTogether(formatInfoValue(today, hass, null, cfg, cfg.energy_today_entity)), entity: cfg.energy_today_entity });
        }
      }
      solar = { mode: r.mode, sky: r.sky, layout: cfg.solar_layout };
    }

    // A home battery: it charges, discharges, rests, is full or low, or is in
    // error. Its lines give its level, its power, the time to full or until
    // the reserve, and the reserve itself.
    let battery = null;
    if (cap.homeBattery) {
      const b = batteryReadOf(hass, cfg, st);
      const shown = b.low && ["idle", "discharging"].includes(b.mode) ? "low" : b.mode;
      if (!cfg.state_show_raw || b.mode === "unav" || !st) stateLabel = t(hass, BATTERY_LABELS[shown]);
      color = BATTERY_COLORS[shown];
      if (b.mode !== "unav") {
        if (b.level !== null) {
          extraLines.push({ key: "battery", icon: robotBatteryIcon(b.level, b.mode === "charging"), label: t(hass, "section_battery"),
            value: keepTogether(`${Math.round(b.level)} %`), entity: b.levelId, caution: b.low });
        }
        if (b.net !== null) {
          extraLines.push({ key: "power", icon: cfg.power_icon || (b.mode === "discharging" ? "mdi:battery-arrow-down-outline" : "mdi:battery-arrow-up-outline"),
            label: t(hass, "power"), value: keepTogether(energyPowerText(hass, b.net, ["charging", "discharging"].includes(b.mode))), entity: b.powerId });
        }
        const cap_ = parseFloat(cfg.battery_capacity);
        if (isFinite(cap_) && cap_ > 0 && b.level !== null && b.net !== null) {
          let hours = null;
          let key = "";
          if (b.mode === "charging") {
            hours = ((b.top - b.level) / 100 * cap_ * 1000) / b.net;
            key = "bat_line_full_in";
          } else if (b.mode === "discharging") {
            hours = ((b.level - (b.reserve !== null ? b.reserve : 0)) / 100 * cap_ * 1000) / -b.net;
            key = "bat_line_left";
          }
          if (hours !== null && hours > 0 && hours < 100) {
            extraLines.push({ key: "battery_time", icon: "mdi:timer-sand", label: t(hass, key),
              value: keepTogether(formatDuration(hours * 3600, hass)), entity: b.powerId || b.levelId });
          }
        }
        if (b.reserve !== null) {
          extraLines.push({ key: "battery_reserve", icon: "mdi:shield-half-full", label: t(hass, "bat_line_reserve"),
            value: keepTogether(`${Math.round(b.reserve)} %`), entity: cfg.reserve_entity });
        }
      }
      battery = { mode: b.mode, layout: batteryLayoutOf(cfg, st), level: b.level, reserve: b.reserve, low: b.low };
    }

    // A diffuser: its mist and its light.
    let diffuser = null;
    if (cap.diffuser) {
      const d = diffuserReadOf(hass, cfg, st, norm, powerDerived);
      if (!cfg.state_show_raw || d.mode === "unav") stateLabel = t(hass, DIFFUSER_LABELS[d.mode]);
      color = DIFFUSER_COLORS[d.mode];
      diffuser = { ...d, layout: diffuserLayoutOf(cfg, st), palette: cfg.illustration_color };
    }

    // Heat recovery ventilation: the mode, its speed, its airflow and its
    // filter as lines, the four temperatures on the drawing.
    let hrv = null;
    let hrvFilterPct = null;
    if (cap.hrv) {
      // A unit that changes mode on its own (an ERV in smart mode, #54)
      // reports the mode it is in apart from the one set: the drawing and
      // the state follow the active one, the menu keeps the one set.
      const act = cfg.active_mode_entity ? stateObj(hass, cfg.active_mode_entity) : null;
      const actOk = act && st && !["unknown", "unavailable", ""].includes(String(act.state).trim().toLowerCase());
      const h = hrvReadOf(hass, cfg, actOk ? { ...st, state: act.state } : st, norm, powerDerived);
      if (!cfg.state_show_raw || h.mode === "unav") stateLabel = h.mode === "run" && h.step && !h.paused ? `${t(hass, "hrv_speed")} ${h.step}`
        : t(hass, h.paused ? "hrv_inter_paused" : h.mode === "run" && h.speed ? `hrv_${h.speed}_speed` : HRV_LABELS[h.mode]);
      if (h.steps && !["off", "unav"].includes(h.mode)) {
        extraLines.push({ key: "hrv_speed", icon: "mdi:fan", label: t(hass, "hrv_speed"), value: keepTogether(h.step ? `${h.step} / ${h.steps}` : "-"), entity: h.stepEntity || entityEntries(cfg.speed_entities, 6)[0].entity });
      }
      color = HRV_COLORS[h.mode];
      const live = !["off", "unav"].includes(h.mode);
      // The mode of a select is what the state line says (Smart, Manual, Turbo
      // on a Broan) while the unit simply runs in it; a defrost, a bypass, a
      // filter due or an intermittent pause still says itself.
      const anyMenu = hrvModeOptions(hass, cfg);
      const menu = anyMenu && anyMenu.dom !== "speed" ? anyMenu : null;
      if (menu && live && menu.dom !== "fan" && !cfg.state_show_raw && ["run", "boost", "away", "rec", "hum", "inter"].includes(h.mode) && !h.paused
        && (h.mode !== "hum" || /humid|feucht/i.test(stripAccents(String((actOk ? act.state : menu.current) || ""))))) {
        // With an active mode, the state says the mode it runs in and a line
        // the one set, when they differ.
        stateLabel = actOk ? hrvModeLabel(hass, act, act.state) : hrvModeLabel(hass, st, menu.current);
        if (actOk && stripAccents(String(act.state)).trim().toLowerCase() !== stripAccents(String(menu.current || "")).trim().toLowerCase()) {
          extraLines.push({ key: "hrv_mode", icon: "mdi:tune-variant", label: t(hass, "hrv_mode"), value: keepTogether(hrvModeLabel(hass, st, menu.current)), entity: cfg.state_entity });
        }
      } else if (menu && live && menu.dom !== "fan") {
        extraLines.push({ key: "hrv_mode", icon: "mdi:tune-variant", label: t(hass, "hrv_mode"), value: keepTogether(hrvModeLabel(hass, st, menu.current)), entity: cfg.state_entity });
      }
      const flowText = (id) => {
        const v = id ? numericState(hass, id) : null;
        return v === null ? "" : `${netNumber(hass, v, 0)} ${unitOf(hass, id) || "m\u00b3/h"}`;
      };
      const rpmText = (v, id) => `${netNumber(hass, v, 0)} ${unitOf(hass, id) || "rpm"}`;
      // The air each fan moves, written by it on the drawing too.
      if (live) {
        h.flowS = esc(flowText(cfg.airflow_entity));
        h.flowE = esc(flowText(cfg.exhaust_airflow_entity));
      }
      // A slider for what the mode leaves to set by hand: the speed in Manual,
      // the humidity setpoint under humidity control, when it is a number.
      const settable = (id) => !!id && ["number", "input_number"].includes(domainOf(id)) && !!stateObj(hass, id);
      if (live && settable(cfg.fan_speed_entity) && (/manu/.test(stripAccents(String((st && st.state) || "")).toLowerCase()) || (menu && /manu/i.test(String(menu.current || ""))))) {
        sliders.push({ entity: cfg.fan_speed_entity, icon: "mdi:fan", label: t(hass, "section_fan_speed") });
      }
      if (live && h.mode === "hum" && settable(cfg.target_humidity_entity)) {
        sliders.push({ entity: cfg.target_humidity_entity, icon: "mdi:water-percent", label: t(hass, "section_target_humidity") });
      }
      if (live) {
        const speedSlider = !!cfg.fan_speed_entity && ["number", "input_number"].includes(domainOf(cfg.fan_speed_entity))
          && (/manu/.test(stripAccents(String((st && st.state) || "")).toLowerCase()) || (menu && /manu/i.test(String(menu.current || ""))));
        if (h.pct !== null && h.pct > 0 && !speedSlider) {
          extraLines.push({ key: "hrv_speed", icon: "mdi:fan", label: t(hass, "section_fan_speed"), value: keepTogether(`${Math.round(h.pct)} %`), entity: cfg.fan_speed_entity || cfg.state_entity });
        }
        // Each fan on a line of its own when it reports its speed, with the
        // air it moves; otherwise the airflow alone.
        if (h.sRpm !== null) {
          const f = flowText(cfg.airflow_entity);
          extraLines.push({ key: "hrv_supply", icon: "mdi:fan", label: t(hass, "hrv_supply_fan"), value: keepTogether(`${rpmText(h.sRpm, cfg.supply_fan_entity)}${f ? ` \u00b7 ${f}` : ""}`), entity: cfg.supply_fan_entity });
        } else if (flowText(cfg.airflow_entity)) {
          extraLines.push({ key: "hrv_airflow", icon: "mdi:weather-windy", label: t(hass, "section_airflow"), value: keepTogether(flowText(cfg.airflow_entity)), entity: cfg.airflow_entity });
        }
        if (h.eRpm !== null) {
          const f = flowText(cfg.exhaust_airflow_entity);
          extraLines.push({ key: "hrv_exhaust", icon: "mdi:fan", label: t(hass, "hrv_exhaust_fan"), value: keepTogether(`${rpmText(h.eRpm, cfg.exhaust_fan_entity)}${f ? ` \u00b7 ${f}` : ""}`), entity: cfg.exhaust_fan_entity });
        } else if (flowText(cfg.exhaust_airflow_entity)) {
          extraLines.push({ key: "hrv_exhaust_airflow", icon: "mdi:weather-windy", label: t(hass, "section_exhaust_airflow"), value: keepTogether(flowText(cfg.exhaust_airflow_entity)), entity: cfg.exhaust_airflow_entity });
        }
      }
      // The humidity and its setpoint: on a line, and on the drawing while
      // humidity control runs the unit.
      const hum = cfg.current_humidity_entity ? numericState(hass, cfg.current_humidity_entity) : null;
      const target = cfg.target_humidity_entity ? numericState(hass, cfg.target_humidity_entity) : null;
      if (hum !== null || target !== null) {
        const v = [hum, target].filter((x) => x !== null).map((x) => `${netNumber(hass, x, 0)} %`).join(" \u2192 ");
        extraLines.push({ key: "hrv_humidity", icon: "mdi:water-percent", label: t(hass, "ac_line_humidity"), value: keepTogether(v), entity: cfg.current_humidity_entity || cfg.target_humidity_entity });
      }
      h.humText = [hum, target].filter((x) => x !== null).map((x) => netNumber(hass, x, 0)).join(" \u2192 ") + (hum !== null || target !== null ? " %" : "");
      h.humBadge = h.mode === "hum";
      // The filter's life as a bar: its percentage, or its days out of
      // filter_life_full (90 by default, a filter changed each season).
      if (h.filterValue !== null && h.filterValue !== undefined) {
        const full = parseFloat(cfg.filter_life_full);
        hrvFilterPct = Math.max(0, Math.min(100, h.filterDays ? (h.filterValue / (isFinite(full) && full > 0 ? full : 90)) * 100 : h.filterValue));
      }
      if (h.filterText) {
        extraLines.push({ key: "hrv_filter", icon: "mdi:air-filter", label: t(hass, "filter"), value: keepTogether(h.filterText), entity: cfg.filter_life_entity, caution: h.filterDue });
      }
      const temp = (id) => {
        const v = id ? numericState(hass, id) : null;
        return v === null ? "" : `${netNumber(hass, v, 0)}\u00b0`;
      };
      // The zone dampers of an extract unit in the basement (#87), each on a
      // line with its state.
      const hrvLayout = hrvLayoutOf(cfg, st);
      const zoneEntries = hrvLayout === "single_basement" ? entityEntries(cfg.zone_valves, 4) : [];
      const zones = zoneEntries.map((e) => ({ open: hrvZoneOpen(hass, e.entity), at: e.at }));
      if (zoneEntries.length) {
        const zname = (e) => e.name || (stateObj(hass, e.entity) && stateObj(hass, e.entity).attributes.friendly_name) || humanizeEntityId(e.entity);
        extraLines.push({ key: "hrv_zones", icon: "mdi:valve", label: t(hass, "hrv_zones"), entity: zoneEntries[0].entity, wrap: true,
          value: zoneEntries.map((e, i) => `${zname(e)} : ${t(hass, zones[i].open ? "hrv_zone_open" : "hrv_zone_shut")}`).join(" \u00b7 ") });
      }
      hrv = { ...h, layout: hrvLayout, zones, floors: cfg.hrv_floors, dark: cfg.illustration_color === "black",
        lcd: h.mode === "run" ? `V${h.level}` : HRV_LCD[h.mode] || "",
        t: { o: temp(cfg.outdoor_temperature_entity), s: temp(cfg.supply_temperature_entity), e: temp(cfg.extract_temperature_entity), x: temp(cfg.exhaust_temperature_entity) },
        n: { o: t(hass, "hrv_t_outdoor"), s: t(hass, "hrv_t_supply"), e: t(hass, "hrv_t_extract"), x: t(hass, "hrv_t_exhaust"), out: t(hass, "hrv_outside"), room: t(hass, "hrv_room") } };
    }

    // A camera: what it does, and lines for its battery, its signal, the last
    // motion and its night vision.
    let camera = null;
    if (cap.camera) {
      const { mode, night } = cameraReadOf(hass, cfg, st);
      if (!cfg.state_show_raw || mode === "unav") stateLabel = t(hass, CAMERA_LABELS[mode]);
      color = CAMERA_COLORS[mode];
      const a = (st && st.attributes) || {};
      if (mode !== "unav") {
        const batt = cfg.battery_entity ? numericState(hass, cfg.battery_entity) : numberOrNull(a.battery_level);
        if (batt !== null) {
          extraLines.push({ key: "cam_battery", icon: robotBatteryIcon(batt, a.charging === true), label: t(hass, "section_battery"),
            value: keepTogether(`${Math.round(batt)} %`), entity: cfg.battery_entity || cfg.state_entity, caution: batt <= 15 });
        }
        const sig = cfg.signal_entity ? numericState(hass, cfg.signal_entity) : numberOrNull(a.signal_strength);
        if (sig !== null) {
          const unit = cfg.signal_entity ? unitOf(hass, cfg.signal_entity) : "";
          extraLines.push({ key: "cam_signal", icon: "mdi:wifi", label: t(hass, "cam_line_signal"),
            value: keepTogether(`${netNumber(hass, sig, 0)}${unit ? ` ${unit}` : ""}`), entity: cfg.signal_entity || cfg.state_entity });
        }
        const mst = cfg.motion_entity ? stateObj(hass, cfg.motion_entity) : null;
        const seen = mst && mode !== "motion" ? camMotionAt(hass, cfg.motion_entity) : NaN;
        if (isFinite(seen)) {
          extraLines.push({ key: "cam_motion", icon: "mdi:motion-sensor", label: t(hass, "cam_line_last_motion"),
            value: keepTogether(feedTime(hass, seen)), entity: cfg.motion_entity });
        }
        const ringAt = cfg.ring_entity ? camRingAt(hass, cfg.ring_entity) : null;
        if (ringAt !== null && mode !== "ring") {
          extraLines.push({ key: "cam_ring", icon: "mdi:doorbell", label: t(hass, "cam_line_last_ring"),
            value: keepTogether(feedTime(hass, ringAt)), entity: cfg.ring_entity });
        }
        // An event's ring has no end of its own: the card ends it.
        if (this._ringTimer) { clearTimeout(this._ringTimer); this._ringTimer = null; }
        if (mode === "ring" && domainOf(cfg.ring_entity) === "event") {
          this._ringTimer = setTimeout(() => { this._ringTimer = null; this._render(); }, Math.max(0, CAM_RING_MS - (Date.now() - ringAt)) + 50);
        } else if (mode === "motion" && domainOf(cfg.motion_entity) === "event") {
          this._ringTimer = setTimeout(() => { this._ringTimer = null; this._render(); }, Math.max(0, CAM_RING_MS - (Date.now() - camMotionAt(hass, cfg.motion_entity))) + 50);
        }
        if (night) {
          extraLines.push({ key: "cam_night", icon: "mdi:weather-night", label: t(hass, "cam_line_night"), value: "IR", entity: cfg.night_entity });
        }
      }
      camera = { mode, night, layout: cameraLayoutOf(cfg, st), dark: cfg.illustration_color === "black" };
    }

    // A mailbox: empty, with mail in it, or a door open. Lines for the count,
    // the last mail and each door. A letter is drawn arriving when the count
    // goes up, a door swinging when it opens, never on the first drawing.
    let mailbox = null;
    if (cap.mailbox) {
      const m = mailboxReadOf(hass, cfg, st);
      if (!cfg.state_show_raw || m.mode === "unav") {
        stateLabel = m.mode === "mail" && m.count ? `${t(hass, "mb_mail")} \u00b7 ${m.count}` : t(hass, MAILBOX_LABELS[m.mode]);
      }
      color = MAILBOX_COLORS[m.mode];
      const now = Date.now();
      const prev = this._mbPrev;
      if (prev && m.mode !== "unav") {
        if ((m.count !== null && prev.count !== null && m.count > prev.count) || (m.present && !prev.present)) this._mbArriveAt = now;
        if (m.front && !prev.front) this._mbSwingF = now;
        if (m.back && !prev.back) this._mbSwingB = now;
      }
      this._mbPrev = m;
      const since = (at, ms) => (at && now - at < ms ? now - at : null);
      const arrive = m.present ? since(this._mbArriveAt, MAILBOX_ARRIVE_MS) : null;
      const drawn = m.present ? Math.min(MAILBOX_MAX_LETTERS, m.count || 1) : 0;
      if (m.mode !== "unav") {
        if (m.count !== null) {
          extraLines.push({ key: "mb_count", icon: "mdi:email-outline", label: t(hass, "mb_line_count"), value: String(m.count),
            entity: cfg.mail_count_entity || cfg.state_entity });
        }
        const lastSt = m.present ? stateObj(hass, cfg.mail_count_entity || cfg.state_entity) : null;
        const last = lastSt ? Date.parse(lastSt.last_changed) : NaN;
        if (isFinite(last)) {
          extraLines.push({ key: "mb_last", icon: "mdi:email-arrow-left-outline", label: t(hass, "mb_line_last"),
            value: keepTogether(feedTime(hass, last)), entity: cfg.mail_count_entity || cfg.state_entity });
        }
        if (cfg.front_door_entity) {
          extraLines.push({ key: "mb_front", icon: m.front ? "mdi:door-open" : "mdi:door-closed", label: t(hass, "mb_front_door"),
            value: t(hass, m.front ? "mb_open" : "mb_closed"), entity: cfg.front_door_entity });
        }
        if (cfg.back_door_entity) {
          extraLines.push({ key: "mb_back", icon: m.back ? "mdi:door-open" : "mdi:door-closed", label: t(hass, "mb_back_door"),
            value: t(hass, m.back ? "mb_open" : "mb_closed"), entity: cfg.back_door_entity });
        }
      }
      mailbox = { ...m, drawn, over: m.present && (m.count || 0) > MAILBOX_MAX_LETTERS,
        newIdx: arrive !== null && (m.count || 1) <= MAILBOX_MAX_LETTERS ? drawn : 0, arrive, arriveAt: arrive !== null ? this._mbArriveAt : 0,
        swingF: m.front && since(this._mbSwingF, MAILBOX_SWING_MS) !== null, swingB: m.back && since(this._mbSwingB, MAILBOX_SWING_MS) !== null,
        layout: mailboxLayoutOf(cfg), side: MAILBOX_SIDES.includes(cfg.mailbox_front) ? cfg.mailbox_front : "left", color: cfg.mailbox_color,
        street: t(hass, "mb_street"), house: t(hass, "mb_house") };
      // The arrival is drawn once: the card goes back to the still pile after it.
      if (this._mbTimer) { clearTimeout(this._mbTimer); this._mbTimer = null; }
      if (arrive !== null) this._mbTimer = setTimeout(() => { this._mbTimer = null; this._render(); }, MAILBOX_ARRIVE_MS - arrive + 50);
    }

    // A lamp: on or off, and lines for its brightness, its colour
    // temperature and its effect.
    let lampDraw = null;
    if (cap.lamp) {
      const l = lampReadOf(hass, cfg, st);
      if (!cfg.state_show_raw || l.mode === "unav") stateLabel = t(hass, LAMP_LABELS[l.mode]);
      color = LAMP_COLORS[l.mode];
      if (l.pct !== null) {
        extraLines.push({ key: "lamp_brightness", icon: "mdi:brightness-6", label: t(hass, "lamp_line_brightness"),
          value: keepTogether(`${l.pct} %`), entity: cfg.state_entity });
      }
      if (l.kelvin) {
        extraLines.push({ key: "lamp_kelvin", icon: "mdi:thermometer-lines", label: t(hass, "lamp_line_color_temp"),
          value: keepTogether(`${Math.round(l.kelvin)} K`), entity: cfg.state_entity });
      }
      if (l.effect) {
        extraLines.push({ key: "lamp_effect", icon: "mdi:auto-fix", label: t(hass, "lamp_line_effect"), value: l.effect, entity: cfg.state_entity });
      }
      lampDraw = { mode: l.mode, rgb: l.rgb, pct: l.pct, fx: !!l.effect, layout: lampLayoutOf(cfg, st), spots: lampSpotsOf(cfg, st) };
    }

    // The HACF drawings: a pump, underfloor heating, a spa, a sauna, an
    // aquarium, a meter, a Christmas tree.
    let ntDraw = null;
    if (NT_TYPES.includes(applianceType)) {
      const r = ntReadOf(applianceType, hass, cfg, st, watts, isFinite(threshold) ? threshold : 10);
      if (!cfg.state_show_raw || r.mode === "unav") stateLabel = r.label;
      color = r.color;
      extraLines.push(...r.lines);
      ntDraw = r.draw;
      if (r.sliders) sliders.push(...r.sliders);
      // A ride without a battery entity, unplugged, keeps the charge the
      // card last saw: full once it was charged, kept in the browser so a
      // reload does not empty the gauge.
      if (applianceType === "mobility" && (r.draw.level === null || r.draw.level === undefined)) {
        const key = `ha-appliance-card-mob:${cfg.state_entity || ""}`;
        if (r.draw.st === "full" || r.draw.st === "charging") {
          this._mobLast = r.draw.st === "full" ? 100 : null;
          try { localStorage.setItem(key, r.draw.st === "full" ? "100" : ""); } catch (e) { /* private browsing */ }
        } else if (r.draw.st === "off") {
          let last = this._mobLast;
          if (last === undefined || last === null) {
            try { last = parseFloat(localStorage.getItem(key)); } catch (e) { last = null; }
          }
          if (Number.isFinite(last)) ntDraw = { ...r.draw, level: last };
        }
      }
    }

    extraLines.push(...optLines(hass, cfg, applianceType));

    // A bathroom scale: its state entity is the weight, shown on its screen.
    // The goal, the fat, the muscles and the bones are lines.
    let scale = null;
    if (cap.scale) {
      const w0 = st && !rawIsMeaningless ? numericState(hass, cfg.state_entity) : null;
      // Tuya's scale counts in grams.
      const inGrams = !!st && st.attributes.unit_of_measurement === "g";
      const w = w0 !== null && inGrams ? w0 / 1000 : w0;
      const unit = inGrams ? "kg" : (st && st.attributes.unit_of_measurement) || "kg";
      const goalSt = cfg.weight_goal_entity ? numericState(hass, cfg.weight_goal_entity) : null;
      const goalCfg = parseFloat(cfg.weight_goal);
      const goal = goalSt !== null ? goalSt : isFinite(goalCfg) && goalCfg > 0 ? goalCfg : null;
      const when = st ? Date.parse(st.last_changed) : NaN;
      const mode = w === null ? "unav" : goal !== null && Math.abs(w - goal) <= SCALE_GOAL_MARGIN ? "goal" : "weighed";
      if (!cfg.state_show_raw || mode === "unav") {
        stateLabel = mode === "unav" ? t(hass, "ev_offline") : mode === "goal" ? t(hass, "scale_goal_reached")
          : isFinite(when) ? `${t(hass, "scale_weighed")} ${feedTime(hass, when)}` : t(hass, "scale_weighed");
      }
      color = SCALE_COLORS[mode];
      const kg = (v) => keepTogether(`${netNumber(hass, v, 1)} ${unit}`);
      if (mode !== "unav") {
        if (goal !== null) {
          const diff = w - goal;
          extraLines.push({ key: "scale_goal", icon: "mdi:flag-checkered", label: t(hass, "scale_line_goal"),
            value: mode === "goal" ? kg(goal) : `${kg(goal)} \u00b7 ${kg(Math.abs(diff))} ${t(hass, diff > 0 ? "scale_to_lose" : "scale_to_gain")}`,
            entity: cfg.weight_goal_entity || cfg.state_entity });
        }
        const ratio = cfg.fat_ratio_entity ? numericState(hass, cfg.fat_ratio_entity) : null;
        const fat = cfg.fat_mass_entity ? numericState(hass, cfg.fat_mass_entity) : null;
        if (ratio !== null || fat !== null) {
          extraLines.push({ key: "scale_fat", icon: "mdi:water-percent", label: t(hass, "scale_line_fat"),
            value: [ratio !== null ? keepTogether(`${netNumber(hass, ratio, 1)} %`) : "", fat !== null ? kg(fat) : ""].filter(Boolean).join(" \u00b7 "),
            entity: cfg.fat_ratio_entity || cfg.fat_mass_entity });
        }
        const muscle = cfg.muscle_mass_entity ? numericState(hass, cfg.muscle_mass_entity) : null;
        if (muscle !== null) {
          extraLines.push({ key: "scale_muscle", icon: "mdi:arm-flex", label: t(hass, "scale_line_muscle"), value: kg(muscle), entity: cfg.muscle_mass_entity });
        }
        const bone = cfg.bone_mass_entity ? numericState(hass, cfg.bone_mass_entity) : null;
        if (bone !== null) {
          extraLines.push({ key: "scale_bone", icon: "mdi:bone", label: t(hass, "scale_line_bone"), value: kg(bone), entity: cfg.bone_mass_entity });
        }
      }
      scale = { mode, text: w === null ? "--" : netNumber(hass, w, 1), unit: w === null ? "" : unit,
        fresh: mode !== "unav" && isFinite(when) && Date.now() - when < SCALE_FRESH_MS };
    }

    // A UPS: on mains, on battery, in bypass or off, from its NUT status or
    // its words; a low battery, an overload or a battery to replace say so
    // first. Its lines give the battery, the time left on it, the load and
    // the voltage at the wall.
    let ups = null;
    if (cap.ups) {
      const { mode, codes, text } = upsStatusOf(hass, cfg, st);
      const live = mode !== "off" && mode !== "unav";
      const pct = cfg.battery_entity ? numericState(hass, cfg.battery_entity) : null;
      const load = cfg.load_entity ? numericState(hass, cfg.load_entity) : null;
      const lowCfg = parseFloat(cfg.battery_low);
      const lowAt = isFinite(lowCfg) && lowCfg >= 0 ? lowCfg : UPS_BATTERY_LOW;
      const charging = live && mode !== "battery" && (codes.has("CHRG") || (!codes.size && /charging|en charge/.test(text)));
      const low = live && (codes.has("LB") || (mode === "battery" && pct !== null && pct <= lowAt));
      const overload = live && (codes.has("OVER") || (load !== null && load >= 100));
      const replace = live && codes.has("RB");
      const shown = overload ? "overload" : low ? "low" : replace ? "replace" : mode;
      if (!cfg.state_show_raw || mode === "unav") {
        stateLabel = t(hass, UPS_LABELS[shown]);
        if (charging && shown === "online") stateLabel += ` \u00b7 ${t(hass, "ups_charging")}`;
      }
      color = UPS_COLORS[shown];
      // NUT gives the runtime in seconds, others in minutes or hours.
      const rt = numericEntity(hass, cfg.runtime_entity);
      let secs = null;
      if (rt) {
        const u = String(rt.attributes.unit_of_measurement || "s").toLowerCase();
        secs = Math.max(0, Number(rt.state)) * (u === "h" ? 3600 : u === "min" ? 60 : 1);
      }
      // The load in watts when its nominal power is known and no meter says it.
      const nominal = parseFloat(cfg.nominal_power);
      const loadW = load !== null && !cfg.power_entity && isFinite(nominal) && nominal > 0 ? (load * nominal) / 100 : null;
      if (live) {
        if (pct !== null) {
          extraLines.push({ key: "ups_battery", icon: robotBatteryIcon(pct, charging), label: t(hass, "ups_line_battery"),
            value: keepTogether(`${netNumber(hass, pct, 0)} %`), entity: cfg.battery_entity, caution: low });
        }
        if (secs !== null) {
          extraLines.push({ key: "ups_runtime", icon: "mdi:timer-sand", label: t(hass, "ups_line_runtime"),
            value: keepTogether(formatDuration(secs, hass)), entity: cfg.runtime_entity, caution: mode === "battery" && secs < 300 });
        }
        if (load !== null) {
          extraLines.push({ key: "ups_load", icon: "mdi:gauge", label: t(hass, "ups_line_load"),
            value: [keepTogether(`${netNumber(hass, load, 0)} %`), loadW !== null ? keepTogether(`${Math.round(loadW)} W`) : ""].filter(Boolean).join(" \u00b7 "),
            entity: cfg.load_entity, caution: overload });
        }
        const vin = cfg.input_voltage_entity ? numericState(hass, cfg.input_voltage_entity) : null;
        if (vin !== null) {
          extraLines.push({ key: "ups_input", icon: "mdi:sine-wave", label: t(hass, "ups_line_input"),
            value: keepTogether(`${netNumber(hass, vin, 0)} V`), entity: cfg.input_voltage_entity });
        }
      }
      // The screen: the charge, or the time left while on battery.
      const lcd = !live ? (mode === "off" ? "OFF" : "--")
        : mode === "battery" && secs !== null ? upsShortTime(secs) : pct !== null ? `${Math.round(pct)}%` : "--";
      const segs = pct === null ? 0 : Math.max(pct > 0 ? 1 : 0, Math.ceil(Math.min(100, Math.max(0, pct)) / 20));
      const level = pct === null ? "ok" : pct <= lowAt ? "low" : pct <= 40 ? "mid" : "ok";
      // The energy flows faster as the load grows.
      const pace = Math.round((1.6 - Math.max(0, Math.min(1, load !== null ? load / 100 : 0.3)) * 1.2) * 100) / 100;
      ups = { mode, alert: overload || low || replace, charging, segs, lcd, level, pace };
    }

    // A robot, from its own state and its status: the work, the way home, a
    // pause, the station busy with the bin or the pads, rain on a mower's
    // lawn. On the base it is charging until its battery is full, docked
    // after that.
    let robot = null;
    if (cap.robot) {
      const layout = robotLayoutOf(cfg, st);
      const stick = layout === "stick" || layout === "floor_washer";
      let mode = stick ? stickModeOf(hass, cfg, st, layout) : robotModeOf(hass, cfg, st, layout);
      const battery = robotBattery(hass, cfg, st);
      // A stick vacuum's plug says it charges: only its own battery can say
      // it is full.
      if (mode === "charging" && (stick ? battery !== null && battery >= 100 : battery === null || battery >= 100)) mode = "docked";
      // Put away for the winter, it reads so whatever its integration says,
      // often nothing at all once it is unplugged (#80).
      if (layout === "mower" && robotWinter(hass, cfg)) mode = "winter";
      if (!cfg.state_show_raw || mode === "unav") {
        const washer = layout === "floor_washer" ? { washing: "fw_self_cleaning", full: "fw_dirty_full", empty: "fw_clean_empty" } : {};
        stateLabel = t(hass, mode === "cleaning" ? ROBOT_WORK_LABELS[layout] : stick && mode === "docked" ? "stick_charged" : washer[mode] || ROBOT_LABELS[mode]);
      }
      color = ROBOT_COLORS[mode];
      const water = robotWaterPct(hass, cfg);
      // The station's two water tanks, on the lines and on its front (#69).
      const tankOn = ["vacuum", "mop", "combo"].includes(layout);
      const cleanTank = tankOn ? robotTank(hass, cfg.robot_clean_tank_entity) : null;
      const dirtyTank = tankOn ? robotTank(hass, cfg.robot_dirty_tank_entity) : null;
      const cleanMode = layout === "combo" ? robotCleanModeOf(hass, cfg) : null;
      if (mode !== "unav" && mode !== "winter") {
        if (battery !== null && !cfg.battery_corner) {
          extraLines.push({ key: "robot_battery", icon: robotBatteryIcon(battery, mode === "charging"), label: t(hass, "section_battery"),
            value: keepTogether(`${Math.round(battery)} %`), entity: cfg.battery_entity || cfg.state_entity });
        }
        if (water !== null) {
          extraLines.push({ key: "robot_water", icon: "mdi:water", label: t(hass, "section_robot_water"),
            value: keepTogether(`${Math.round(water)} %`), entity: cfg.robot_water_entity });
        }
        if (cleanMode) {
          const cm = stateObj(hass, cfg.robot_clean_mode_entity);
          extraLines.push({ key: "robot_clean_mode", icon: "mdi:broom", label: t(hass, "section_robot_clean_mode"), value: formatInfoValue(cm, hass, null, cfg, cfg.robot_clean_mode_entity), entity: cfg.robot_clean_mode_entity });
        }
        for (const [key, tk, id] of [["robot_clean_tank", cleanTank, cfg.robot_clean_tank_entity], ["robot_dirty_tank", dirtyTank, cfg.robot_dirty_tank_entity]]) {
          if (!tk) continue;
          const clean = key === "robot_clean_tank";
          // Low on clean water, or the dirty one nearly full: worth a look.
          const warn = tk.pct !== null ? (clean ? tk.pct <= 15 : tk.pct >= 85) : tk.raised;
          extraLines.push({ key, icon: clean ? "mdi:water" : "mdi:water-opacity", label: t(hass, `section_${key}`),
            value: tk.pct !== null ? keepTogether(`${Math.round(tk.pct)} %`) : t(hass, tk.raised ? (clean ? "mb_empty" : "bat_full") : "fridge_ok"),
            entity: id, ...(warn ? { warn: true } : {}) });
        }
      }
      // An error says which one when an entity words it: the error entity's
      // text first, then the status, never a bare on or a number.
      if (mode === "error") {
        const id = [cfg.robot_error_entity, cfg.robot_status_entity].find((e) => {
          const s = stateObj(hass, e);
          if (!s || numericEntity(hass, e)) return false;
          const v = String(s.state).trim().toLowerCase();
          return !["on", "off", "true", "false", "error", "unknown", "unavailable", ""].includes(v) && !robotOkWord(v);
        });
        if (id) {
          const s = stateObj(hass, id);
          let text = String(s.state);
          try {
            if (typeof hass.formatEntityState === "function") text = hass.formatEntityState(s) || text;
          } catch (e) { /* the raw word, then */ }
          // The state above already says Error: the line keeps its icon and
          // the text alone, which gets the whole width (#69).
          extraLines.push({ key: "robot_error", icon: "mdi:alert-circle-outline", label: t(hass, "error"), value: text, entity: id, warn: true, bare: true });
        }
      }
      // A pool robot's time left, on its power supply on the deck; the line
      // under the state already says it.
      let poolTime = "";
      if (layout === "pool" && cfg.remaining_time_entity) {
        const secs = ntRemaining(hass, cfg.remaining_time_entity);
        if (secs !== null) poolTime = formatDuration(secs, hass);
      }
      robot = { layout, mode, water, cleanMode, battery, poolTime, floor: cfg.robot_floor, base: cfg.robot_station === "base", shelter: cfg.robot_shelter ? (SHELTER_STYLES.includes(cfg.robot_shelter_style) ? cfg.robot_shelter_style : "lean_to") : "",
        shelterColor: cfg.robot_shelter_color, mowerStyle: mowerStyleOf(cfg, st),
        box: cfg.robot_station === "box", boxColor: cfg.robot_station_color, camera: !!cfg.robot_camera, cleanTank, dirtyTank };
    }

    // The last cycle, on request: how long it ran and when it ended. Shown
    // between cycles only, where the time left has nothing to say.
    const lcRole = cycleRole(norm);
    if (this._lcPrevRole && this._lcPrevRole !== "out" && lcRole === "out") {
      this._lastCycleStale = true;
      this._lcEndSeenAt = Date.now();
      this._lcRetries = 0;
    }
    this._lcPrevRole = lcRole;
    if (cfg.show_last_cycle) {
      this._lookUpLastCycle(cfg, applianceType, powerDerived, threshold);
      const lc = this._lastCycle;
      if (lc && lcRole === "out") {
        extraLines.push({
          key: "last_cycle",
          icon: "mdi:history",
          label: t(hass, "last_cycle"),
          value: `${keepTogether(formatDuration((lc.end - lc.start) / 1000, hass))} \u00b7 ${keepTogether(feedTime(hass, lc.end))}`,
          entity: powerDerived ? cfg.power_entity : cfg.state_entity,
        });
      }
    }

    // The time the cycle has run so far, on request (HACF): with a plug alone
    // there is no time left to show, but there is a start.
    if (this._elapsedTimer) {
      clearInterval(this._elapsedTimer);
      this._elapsedTimer = null;
    }
    if (elapsedWanted && this._cycle && (lcRole === "active" || lcRole === "paused")) {
      const c = this._cycle;
      const now = Date.now();
      const pausedNow = c.pausedSince !== null ? Math.max(0, now - c.pausedSince) : 0;
      const ran = Math.max(0, now - c.start - c.pausedMs - pausedNow);
      extraLines.push({
        key: "elapsed",
        icon: "mdi:timer-outline",
        label: t(hass, "elapsed_line"),
        value: keepTogether(formatDuration(ran / 1000, hass)),
        entity: powerDerived ? cfg.power_entity : cfg.state_entity,
      });
      if (!this._inert) this._elapsedTimer = setInterval(() => this._render(), COUNTDOWN_TICK_MS);
    }

    // Today's running time and starts, on request: a pump, a heater, a water
    // heater, any appliance whose day is told by how long it ran.
    if (cfg.show_today && !cap.solar && !cap.homeBattery) {
      const fromPower = !!cfg.power_entity && (powerDerived || !cfg.state_entity) && isFinite(threshold);
      this._lookUpToday(cfg, applianceType, fromPower, isFinite(threshold) ? threshold : 10);
      const td = this._today;
      const todayRuns = this._todayRuns(cfg);
      if (todayRuns) {
        const { ms, starts } = runsSince(todayRuns, td.from, Date.now());
        const startsText = t(hass, starts === 1 ? "starts_one" : "starts_other").replace("{n}", String(starts));
        extraLines.push({
          key: "today",
          icon: "mdi:chart-timeline-variant",
          label: t(hass, "today_line"),
          value: `${keepTogether(formatDuration(ms / 1000, hass))} \u00b7 ${keepTogether(startsText)}`,
          entity: fromPower ? cfg.power_entity : cfg.state_entity,
        });
      }
    }

    // Power draw is worth showing on any type once the entity is there. A
    // charger prints its own, in kilowatts.
    if (!cap.fridgeTemp && !cap.heatPump && !cap.evCharger && !cap.solar && !cap.homeBattery && cfg.power_entity && watts !== null) {
      extraLines.push({
        key: "power",
        icon: cfg.power_icon || "mdi:power-plug",
        label: t(hass, "power"),
        value: `${Math.round(watts)} ${unitOf(hass, cfg.power_entity) || "W"}`,
        entity: cfg.power_entity,
      });
    }

    // What it used, and what that cost at the price given: a number for a
    // fixed tariff, an entity for one that changes (HACF).
    if (!cap.solar && !cap.homeBattery && cfg.energy_entity && entityUsable(hass, cfg.energy_entity)) {
      extraLines.push({
        key: "energy",
        icon: "mdi:lightning-bolt",
        label: t(hass, "energy_line"),
        value: keepTogether(formatInfoValue(stateObj(hass, cfg.energy_entity), hass, null, cfg, cfg.energy_entity)),
        entity: cfg.energy_entity,
      });
      const kwh = energyKwh(hass, cfg.energy_entity);
      const price = energyPriceOf(hass, cfg.energy_price);
      if (kwh !== null && price !== null) {
        extraLines.push({ key: "cost", icon: "mdi:cash", label: t(hass, "cost_line"), value: keepTogether(formatMoney(hass, kwh * price)), entity: cfg.energy_entity });
      }
    }

    // A new dish each time the oven or the microwave starts, so two of them
    // on a dashboard rarely cook the same thing.
    if (COOK_DISHES[applianceType]) {
      const cooking = isActiveState(norm);
      if (this._dish === undefined || (cooking && !this._dishOn)) this._dish = Math.floor(Math.random() * COOK_DISHES[applianceType]);
      this._dishOn = cooking;
    }
    const illustrationCtx = {
      ...(fridgeCtx || {}),
      ...(coffeeCtx || {}),
      speed: mixer.level,
      spinning: isActiveState(norm),
      doorOpen: cap.door && doorOpen,
      done: norm === "done",
      paused: norm === "paused",
      heating: ["oven", "cooker", "rice_cooker"].includes(applianceType) ? heating
        : applianceType === "water_heater" ? tankHeating
        : applianceType === "iron" ? !!iron && iron.mode === "heating"
        : applianceType === "thermostat" ? !!thermo && thermo.mode === "heat" : false,
      keepWarm: norm === "keep_warm",
      lit,
      display: displayText,
      dish: this._dish || 0,
      fanLevel: fan.level,
      boost: fan.boost,
      zones,
      zoneColumns: zoneColumns(zones.length, cfg.zones_layout),
      anyZoneOn: zones.some((z) => z.on),
      childLock,
      phase: applianceType === "dishwasher" ? phase : "",
      // The drum of a washer-dryer: water while it washes, clothes tumbling in
      // hot air while it dries.
      drying: !!this._wdDrying,
      // Spinning: the water is out and the load whirls against the drum.
      spinCycle: applianceType === "washer" && !!step && step.step === "spinning",
      feeding,
      feederEmpty,
      feederAlert,
      feederFill,
      feederFillB,
      feederEmptyA,
      feederEmptyB,
      feederLayout: ["canister", "double", "dual_split", "rotary"].includes(cfg.feeder_layout) ? cfg.feeder_layout : "",
      feederScreen,
      ironLayout: cfg.iron_layout === "generator" ? "generator" : "",
      ironLine: ["blue", "body"].includes(cfg.iron_line_color) ? cfg.iron_line_color : "orange",
      kettleLayout: cfg.kettle_layout,
      coffeeLayout: cfg.coffee_layout,
      boilerLayout: cfg.boiler_layout,
      boilerThermo,
      thermo,
      toaster,
      hairDryer,
      network,
      robot,
      pool,
      solar,
      battery,
      scale,
      camera,
      lampDraw,
      ntDraw,
      mailbox,
      diffuser,
      hrv,
      ups,
      purifier,
      screen,
      fan: fanCtx,
      leftOn,
      iron,
      tankTemp,
      boilerMode,
      hpMode,
      compressorOff,
      noTank: applianceType === "heat_pump" && !!cfg.no_hot_water,
      underfloor: applianceType === "heat_pump" && !!cfg.underfloor_heating,
      p3,
      stove,
      ac,
      dh,
      heater,
      towel,
      fountain,
      fryer,
      ev,
    };

    // A plain on/off control, for the types that have no cycle to start or
    // stop: a hood or a cooktop could report its state but never change it.
    let toggleOn = false;
    // On a plug, its switch is the power button unless another is set.
    const plugToggle = !cfg.toggle_entity && plugState && ["switch", "input_boolean"].includes(domainOf(cfg.state_entity));
    const toggleEntity = cfg.toggle_entity || (plugToggle ? cfg.state_entity : undefined);
    if (toggleEntity) {
      const tst = stateObj(hass, toggleEntity);
      toggleOn = !!tst && ["on", "true", "open"].includes(String(tst.state).toLowerCase());
    }

    // A two-speed unit's power button when it is the speed switch: it shows
    // the speed it is at, not a power sign (HACF #150).
    const speedToggle = !!cap.hrv && !!cfg.toggle_entity && cfg.toggle_entity === cfg.high_speed_entity;

    // Action buttons
    const actions = [
      { key: "toggle", entity: toggleEntity, icon: speedToggle ? (toggleOn ? "mdi:fan-speed-2" : "mdi:fan-speed-1") : "mdi:power",
        label: speedToggle ? t(hass, toggleOn ? "hrv_high_speed" : "hrv_low_speed") : t(hass, "toggle"), on: toggleOn, plugDefault: plugToggle },
      { key: "start", entity: cfg.start_entity, icon: "mdi:play", label: t(hass, "start") },
      { key: "pause", entity: cfg.pause_entity, icon: "mdi:pause", label: t(hass, "pause") },
      { key: "resume", entity: cfg.resume_entity, icon: "mdi:play-pause", label: t(hass, "resume") },
      { key: "stop", entity: cfg.stop_entity, icon: "mdi:stop", label: t(hass, "stop") },
      cap.filter || cap.petFountain ? { key: "filter_reset", entity: cfg.filter_reset_entity, icon: "mdi:air-filter", label: t(hass, "filter_reset") } : {},
      cap.petFountain ? { key: "pump_reset", entity: cfg.pump_reset_entity, icon: "mdi:pump", label: t(hass, "ft_pump_reset") } : {},
      ...robotControls(hass, cfg, robot),
      ...(cap.diffuser ? diffuserControls(hass, cfg) : []),
      ...(cap.hrv ? hrvControls(hass, cfg) : []),
      ...(cap.screen ? screenControls(hass, cfg) : []),
      ...(cap.lamp ? lampControls(hass, cfg) : []),
      ...(NT_TYPES.includes(applianceType) ? ntControls(hass, cfg, applianceType) : []),
    ]
      .map((a) => (a.key && a.key !== "toggle" ? { ...a, option: cfg[`${a.key}_option`] ?? a.option, value: cfg[`${a.key}_value`] ?? a.value } : a))
      // A button's icon can be swapped for another, `start_icon` and its
      // siblings: what a press does is the owner's business, and mdi:play
      // reads as "run a programme" where a feeder only drops a portion. The
      // editor does not offer it, since a menu long enough to hold every
      // icon of the card would be a menu nobody reads.
      .map((a) => (a.key && cfg[`${a.key}_icon`] ? { ...a, icon: cfg[`${a.key}_icon`] } : a))
      .map((a) => (a.key === "toggle" && a.on && cfg.toggle_icon_on ? { ...a, icon: cfg.toggle_icon_on } : a))
      // A fridge offers no cycle to drive, only its plug: the switch shows
      // when one is set, and nothing else does.
      // A type that already offers its state's switch keeps its own button.
      .filter((a, i, all) => !(a.plugDefault && all.some((b, j) => j !== i && b.entity === a.entity)))
      .filter((a) => a.entity && (!cap.readOnly || a.key === "toggle"))
      // A button whose entity is gone or unavailable cannot do anything, so
      // it is left out unless asked for (issue #48). A button's "unknown"
      // only says it was never pressed.
      .filter((a) => {
        if (cfg.show_unavailable_controls) return true;
        const ast = stateObj(hass, a.entity);
        return !!ast && String(ast.state).toLowerCase() !== "unavailable";
      })
      .filter((a) => controlFitsState(a.key, norm, cap, cfg, toggleOn))
      // The speed button means nothing while the motor is off (HACF #157). It
      // is never the power button here: the motor is state_entity.
      .filter((a) => !(a.key === "toggle" && speedToggle && ["off", "false"].includes(String(rawState).toLowerCase())));

    const spinning = isActiveState(norm);

    // How long the current animation has been running. A redraw restarts every
    // CSS animation at zero, so the elapsed time is handed to the stylesheet as
    // a negative delay and the cycle picks up where it left off. The key is
    // every flag that drives an animation: when one of them changes, the
    // appliance is doing something else and the cycle genuinely starts over.
    const animKey = [
      illustrationCtx.spinning, illustrationCtx.heating, illustrationCtx.lit,
      illustrationCtx.ice, illustrationCtx.noWater, illustrationCtx.speed,
      illustrationCtx.fanLevel, illustrationCtx.boost, illustrationCtx.keepWarm,
      illustrationCtx.anyZoneOn,
      illustrationCtx.phase,
      illustrationCtx.drying,
      illustrationCtx.feeding,
      illustrationCtx.feederEmpty,
      illustrationCtx.feederAlert,
      illustrationCtx.feederFill,
      illustrationCtx.feederFillB,
      illustrationCtx.feederEmptyA,
      illustrationCtx.feederEmptyB,
      illustrationCtx.boilerMode,
      illustrationCtx.thermo && [illustrationCtx.thermo.mode, illustrationCtx.thermo.layout, illustrationCtx.thermo.eco].join("/"),
      illustrationCtx.boilerThermo && [illustrationCtx.boilerThermo.mode, illustrationCtx.boilerThermo.layout].join("/"),
      illustrationCtx.hpMode,
      illustrationCtx.compressorOff,
      illustrationCtx.noTank,
      illustrationCtx.underfloor,
      illustrationCtx.leftOn,
      illustrationCtx.iron && [illustrationCtx.iron.mode, illustrationCtx.iron.level].join("/"),
      illustrationCtx.stove && illustrationCtx.stove.mode,
      illustrationCtx.ac && [illustrationCtx.ac.mode, illustrationCtx.ac.swingV, illustrationCtx.ac.swingH, illustrationCtx.ac.speed].join("/"),
      illustrationCtx.dh && illustrationCtx.dh.mode,
      illustrationCtx.heater && illustrationCtx.heater.mode,
      illustrationCtx.toaster && illustrationCtx.toaster.mode,
      illustrationCtx.hairDryer && [illustrationCtx.hairDryer.mode, illustrationCtx.hairDryer.level, illustrationCtx.hairDryer.layout].join("/"),
      illustrationCtx.network && [illustrationCtx.network.mode, illustrationCtx.network.layout, illustrationCtx.network.lit,
        illustrationCtx.network.disks.join(""), illustrationCtx.network.wifiOff].join("/"),
      illustrationCtx.robot && [illustrationCtx.robot.mode, illustrationCtx.robot.layout, illustrationCtx.robot.poolTime].join("/"),
      illustrationCtx.ntDraw && JSON.stringify(illustrationCtx.ntDraw),
      illustrationCtx.coldBox && [illustrationCtx.coldText, illustrationCtx.cooling, illustrationCtx.dark, illustrationCtx.fridgeWarn].join("/"),
      illustrationCtx.pool && [illustrationCtx.pool.mode, illustrationCtx.pool.dosing, illustrationCtx.pool.lit].join("/"),
      illustrationCtx.solar && [illustrationCtx.solar.mode, illustrationCtx.solar.sky, illustrationCtx.solar.layout].join("/"),
      illustrationCtx.battery && [illustrationCtx.battery.mode, illustrationCtx.battery.layout, illustrationCtx.battery.low].join("/"),
      illustrationCtx.diffuser && [illustrationCtx.diffuser.mode, illustrationCtx.diffuser.lit, illustrationCtx.diffuser.layout].join("/"),
      illustrationCtx.hrv && [illustrationCtx.hrv.mode, illustrationCtx.hrv.level, illustrationCtx.hrv.layout, illustrationCtx.hrv.paused, illustrationCtx.hrv.sPace, illustrationCtx.hrv.ePace].join("/"),
      illustrationCtx.camera && [illustrationCtx.camera.mode, illustrationCtx.camera.night, illustrationCtx.camera.layout].join("/"),
      illustrationCtx.mailbox && [illustrationCtx.mailbox.mode, illustrationCtx.mailbox.drawn, illustrationCtx.mailbox.count, illustrationCtx.mailbox.front,
        illustrationCtx.mailbox.back, illustrationCtx.mailbox.layout, illustrationCtx.mailbox.side, illustrationCtx.mailbox.color, illustrationCtx.mailbox.arriveAt].join("/"),
      illustrationCtx.lampDraw && [illustrationCtx.lampDraw.mode, illustrationCtx.lampDraw.rgb.join(","), illustrationCtx.lampDraw.pct,
        illustrationCtx.lampDraw.fx, illustrationCtx.lampDraw.layout, illustrationCtx.lampDraw.spots].join("/"),
      illustrationCtx.scale && [illustrationCtx.scale.mode, illustrationCtx.scale.text, illustrationCtx.scale.unit, illustrationCtx.scale.fresh].join("/"),
      illustrationCtx.ups && [illustrationCtx.ups.mode, illustrationCtx.ups.alert, illustrationCtx.ups.charging, illustrationCtx.ups.segs,
        illustrationCtx.ups.lcd, illustrationCtx.ups.level, illustrationCtx.ups.pace].join("/"),
      illustrationCtx.screen && [illustrationCtx.screen.mode, illustrationCtx.screen.layout, illustrationCtx.screen.image, illustrationCtx.screen.cover].join("/"),
      illustrationCtx.purifier && [illustrationCtx.purifier.mode, illustrationCtx.purifier.osc, illustrationCtx.purifier.back].join("/"),
      illustrationCtx.fan && [illustrationCtx.fan.mode, illustrationCtx.fan.osc, illustrationCtx.fan.natural, illustrationCtx.fan.winter].join("/"),
      illustrationCtx.towel && illustrationCtx.towel.mode,
      illustrationCtx.fountain && [illustrationCtx.fountain.mode, illustrationCtx.fountain.flowing, illustrationCtx.fountain.fill].join("/"),
      illustrationCtx.fryer && [illustrationCtx.fryer.mode, illustrationCtx.fryer.mode2, illustrationCtx.fryer.layout].join("/"),
      illustrationCtx.ev && [illustrationCtx.ev.mode, illustrationCtx.ev.plugged,
        ["charging", "discharging"].includes(illustrationCtx.ev.mode) ? illustrationCtx.ev.flow : ""].join("/"),
    ].join(",");
    if (animKey !== this._animKey) {
      this._animKey = animKey;
      this._animStart = Date.now();
    }
    const animOffset = -((Date.now() - this._animStart) / 1000);
    const bodyPreset = BODY_COLORS[cfg.illustration_color];
    const bodyVar = bodyPreset
      ? ` --ac-body: ${bodyPreset.body}; --ac-body-hi: ${bodyPreset.hi};`
        + ` --ac-body-lo: ${bodyPreset.lo};`
      : "";

    const css = `
        :host { font-size: ${Math.round(16 * fontScaleOf(cfg.font_scale) * 100) / 100}px; --anim-offset: ${animOffset}s;${bodyVar} }
        ha-card { display: block; padding: 16px; position: relative; }
        ha-card.clear { background: none; box-shadow: none; border: none; --ha-card-border-width: 0; }
        /* The three icons along the top of a card read as one row, and two of
           them are meant to be tapped: they share one size. */
        .conn-badge {
          position: absolute; top: 10px; right: 12px;
          --mdc-icon-size: 24px; color: var(--secondary-text-color, #767676);
        }
        .conn-badge.disconnected { color: var(--error-color, #f44336); }
        /* The light sits in the header rather than in the button row: on a
           hood it is the only control, and a full row for it made the card
           needlessly tall. */
        .light-badge {
          position: absolute; top: 10px; left: 12px; cursor: pointer;
          --mdc-icon-size: 24px; color: var(--secondary-text-color, #767676);
        }
        .light-badge.on { color: #ffb300; }
        .door-badge {
          position: absolute; cursor: pointer;
          --mdc-icon-size: 24px; color: var(--success-color, #43a047);
        }
        .door-badge.left { left: 12px; }
        .door-badge.right { right: 12px; }
        .door-badge.open { color: var(--warning-color, #ff9800); }
        .batt-badge {
          position: absolute; cursor: pointer; display: flex; align-items: center; gap: 2px;
          --mdc-icon-size: 22px; color: var(--secondary-text-color, #767676); font-size: 0.85em; font-weight: 500;
          /* Over the drawing, on the card's own background: a wide drawing
           (the rectangular station) must not hide the percentage (#69). */
          z-index: 2; padding: 1px 5px 1px 1px; border-radius: 10px;
          background: var(--ha-card-background, var(--card-background-color, #fff));
        }
        .batt-badge.left { left: 10px; }
        /* A drawing as wide as the rectangular station or a laptop would run
           under the battery in its corner: it is drawn lower instead (#69),
           and so is every robot's, so floors side by side stay level. */
        .batt-badge ~ .top .machine.rbt-l-vacuum, .batt-badge ~ .top .machine.rbt-l-mop, .batt-badge ~ .top .machine.rbt-l-combo, .batt-badge ~ .top .machine.scr-laptop { margin-top: 18px; }
        .batt-badge.right { right: 10px; }
        .batt-badge.low { color: var(--warning-color, #ff9800); }
        /* Switches at hand, lined up under the light on the left and under
           the connection on the right, centred on the same axis. */
        .corner-btn {
          position: absolute; width: 32px; height: 32px; border-radius: 50%; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          --mdc-icon-size: 24px; color: var(--secondary-text-color, #767676);
        }
        .corner-btn.left { left: 8px; }
        .corner-btn.right { right: 8px; }
        .corner-btn.on { color: #ffb300; }
        .corner-btn:hover { background: var(--secondary-background-color, rgba(0, 0, 0, 0.04)); }
        .top { display: flex; flex-direction: column; align-items: center; text-align: center; cursor: pointer; }
        .machine { position: relative; width: 96px; height: 108px; margin: 0 auto 8px; zoom: ${illustrationSizeOf(cfg.illustration_size)}; }
        /* illustration_frame: every drawing sits at the bottom of a frame of
           the full height, so a robot without its station keeps its floor
           level with one that has it, side by side (#61). */
        .pic-frame { min-height: ${Math.round(116 * illustrationSizeOf(cfg.illustration_size))}px; display: flex; flex-direction: column; justify-content: flex-end; }
        .pic-frame > .machine { margin-left: auto; margin-right: auto; }
        ${illustrationCss(applianceType, color)}
        .name { font-size: 1.2em; font-weight: 500; color: var(--primary-text-color, #1c1c1c); }
        .state-line { font-size: 1.05em; color: ${color}; margin-top: 2px; }
        .info-lines { margin-top: 12px; display: flex; flex-direction: column; gap: 8px; }
        .info-line {
          display: flex; align-items: center; gap: 8px;
          font-size: 1em; color: var(--primary-text-color, #1c1c1c); text-align: left;
        }
        .info-line ha-icon { --mdc-icon-size: 20px; color: var(--secondary-text-color, #767676); flex-shrink: 0; }
        .info-line .label { color: var(--secondary-text-color, #767676); }
        /* A short value (80 %) that no longer fits beside its label on a
           narrow card goes under it rather than out of the card. */
        .info-line.fit { flex-wrap: wrap; row-gap: 0; padding-left: 28px; position: relative; }
        .info-line.fit ha-icon { position: absolute; left: 0; top: calc(0.6em - 10px); }
        .info-lines.compact .info-line.fit { padding-left: 26px; }
        .info-lines.compact .info-line.fit ha-icon { top: calc(0.6em - 9px); }
        /* Lines backed by an entity open its more-info dialog: that is where a
           venting level or a power level is actually changed, and it costs no
           extra height on the card. */
        .info-lines.compact { gap: 4px; }
        .info-lines.compact .info-line { font-size: 0.92em; }
        .info-lines.compact .info-line ha-icon { --mdc-icon-size: 18px; }
        .history-toggle {
          margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 4px;
          font-size: 0.85em; color: var(--secondary-text-color); cursor: pointer; user-select: none;
        }
        .history-toggle ha-icon { --mdc-icon-size: 16px; }
        .history { margin-top: 6px; position: relative; height: 56px; padding-right: 52px; }
        .history svg { width: 100%; height: 100%; display: block; overflow: visible; }
        .history .h-line { fill: none; stroke: var(--h-color, var(--primary-color)); stroke-width: 2; vector-effect: non-scaling-stroke; stroke-linejoin: round; stroke-linecap: round; }
        .history .h-area { fill: var(--h-color, var(--primary-color)); opacity: 0.12; }
        .history .h-max, .history .h-min { position: absolute; right: 0; font-size: 0.75em; color: var(--secondary-text-color); pointer-events: none; }
        .history .h-max { top: -2px; }
        .history .h-min { bottom: -2px; }
        .info-line.has-menu .chev { --mdc-icon-size: 16px; margin-left: 2px; opacity: .6; flex: none; }
        .line-menu { grid-column: 1 / -1; margin: 2px 0 4px; border: 1px solid var(--divider-color, rgba(127,127,127,.25)); border-radius: 10px; overflow: hidden; max-height: 240px; overflow-y: auto; }
        .line-menu .mode-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 7px 12px; cursor: pointer; font-size: .9em; }
        .line-menu .mode-row.sel { color: var(--primary-color, #03a9f4); }
        .line-menu .mode-row ha-icon { --mdc-icon-size: 18px; }
        .h-periods { display: flex; gap: 6px; margin-top: 6px; flex-wrap: wrap; }
        .h-chip { font-size: 0.75em; padding: 2px 9px; border-radius: 10px; border: 1px solid var(--divider-color, rgba(127,127,127,.3)); color: var(--secondary-text-color); cursor: pointer; user-select: none; }
        .h-chip.on { background: var(--primary-color, #03a9f4); border-color: var(--primary-color, #03a9f4); color: var(--text-primary-color, #fff); }
        .history .h-bars { display: flex; align-items: flex-end; gap: 1px; height: 100%; }
        .history .h-col { flex: 1; min-width: 0; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; }
        .history .h-bar { width: 72%; background: var(--h-color, var(--primary-color)); opacity: 0.75; border-radius: 2px 2px 0 0; }
        .history .h-n { font-size: 0.6em; line-height: 1.3; color: var(--secondary-text-color); }
        .h-days { display: flex; gap: 1px; padding-right: 52px; margin-top: 2px; }
        .h-days span { flex: 1; text-align: center; font-size: 0.6em; color: var(--secondary-text-color); }
        .h-sum { margin-top: 4px; font-size: 0.75em; color: var(--secondary-text-color); }
        .history .h-empty { text-align: center; font-size: 0.85em; line-height: 56px; color: var(--secondary-text-color); }
        .info-line.clickable { cursor: pointer; }
        /* A print file is one long word: it breaks anywhere rather than
           spilling out of the card. */
        .info-line.wrap span:last-child { min-width: 0; overflow-wrap: anywhere; }
        .info-line.warn { color: var(--error-color, #f44336); }
        .info-line.warn ha-icon { color: var(--error-color, #f44336); }
        .info-line.caution, .info-line.caution ha-icon { color: var(--warning-color, #ff9800); }
        .bar-row { margin-top: 4px; }
        .cmp-wrap + .bar-row { margin-top: 10px; }
        .bar-row.labelled { display: flex; align-items: center; gap: 6px; font-size: 0.85em; color: var(--secondary-text-color, #767676); }
        .bar-row.labelled ha-icon { --mdc-icon-size: 18px; flex-shrink: 0; }
        .bar-row.labelled .bar { flex: 1; min-width: 24px; }
        .bar-row.labelled .bar-pct { flex-shrink: 0; }
        .cmp-side .bar-row.labelled .bar-lbl, .cmp-hide .bar-row.labelled .bar-lbl { display: none; }
        .bar { height: 6px; border-radius: 3px; background: var(--divider-color, #e0e0e0); overflow: hidden; }
        .bar-fill { height: 100%; background: ${color}; transition: width 1s linear; }
        .alerts-wrap { margin-top: 12px; display: flex; flex-direction: column; align-items: center; }
        .alerts-pill {
          display: inline-flex; align-items: center; gap: 6px; max-width: 100%; box-sizing: border-box;
          padding: 6px 14px; border-radius: 16px; cursor: pointer; font-size: 1em;
          background: rgba(244, 67, 54, 0.12); color: var(--error-color, #f44336);
        }
        .alerts-pill ha-icon, .alert-row ha-icon { --mdc-icon-size: 20px; flex-shrink: 0; }
        .alerts-menu {
          align-self: stretch; margin-top: 8px; padding: 6px 0; border-radius: 10px;
          background: var(--card-background-color, #fff);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.16), 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .alert-row {
          display: flex; align-items: center; gap: 8px; padding: 8px 14px; cursor: pointer;
          color: var(--error-color, #f44336);
        }
        .alert-row .alert-label { flex: 1; min-width: 0; }
        .alert-row .go { color: var(--secondary-text-color, #727272); }
        .actions-row { display: flex; gap: 8px; margin-top: 12px; justify-content: center; }
        /* The menu floats over the page next to its button, like Home
           Assistant's own lists, and opens upwards when there is no room
           below; placed by _placeModeMenu. */
        .mode-menu {
          position: fixed; z-index: 20; min-width: 180px; max-height: 60vh; overflow-y: auto;
          padding: 6px 0; border-radius: 10px;
          background: var(--card-background-color, var(--ha-card-background, #fff));
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.16), 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .mode-menu[popover] { position: fixed; inset: auto; margin: 0; border: 0; color: var(--primary-text-color, #212121); }
        .sliders { display: flex; flex-direction: column; gap: 4px; margin-top: 6px; }
        .slider-row { display: flex; align-items: center; gap: 8px; color: var(--secondary-text-color, #727272); }
        .slider-row ha-icon { --mdc-icon-size: 18px; flex-shrink: 0; }
        .slider-row .s-label { flex: 0 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .slider-row input { flex: 1 1 70px; min-width: 50px; margin: 0; accent-color: var(--primary-color, #03a9f4); }
        .slider-row .s-val { flex-shrink: 0; min-width: 2.8em; text-align: right; color: var(--primary-text-color, #1c1c1c); font-weight: 500; }
        .mode-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 8px 14px; cursor: pointer; }
        .mode-row.sel { color: var(--primary-color, #03a9f4); font-weight: 500; }
        .mode-row ha-icon { --mdc-icon-size: 18px; }
        .action-btn {
          display: flex; align-items: center; justify-content: center;
          width: 40px; height: 40px; flex-shrink: 0;
          border: 1px solid var(--divider-color, #e0e0e0);
          border-radius: 50%; cursor: pointer;
          background: var(--card-background-color, transparent);
          color: var(--primary-text-color, #1c1c1c);
        }
        .action-btn:hover { background: var(--secondary-background-color, rgba(0,0,0,0.04)); }
        /* A button that shows its value, a lamp's timer: a pill with a chevron. */
        .pic-tap { cursor: pointer; }
        .action-btn.pill { width: auto; padding: 0 10px 0 12px; gap: 6px; border-radius: 20px; font-size: 0.95em; white-space: nowrap; }
        .action-btn.pill .chev { --mdc-icon-size: 18px; }
        .action-btn.on { color: var(--primary-color, #03a9f4); border-color: var(--primary-color, #03a9f4); }
        /* confirm: an armed control turns red and waits for its second tap. */
        .armed, .action-btn.armed, .cmp-icons .armed {
          color: #fff; background: var(--error-color, #f44336); border-color: var(--error-color, #f44336); border-radius: 50%;
          animation: ac-armed 0.8s ease-in-out infinite alternate; animation-delay: var(--anim-offset, 0s);
        }
        .pic-tap.armed, .cmp-pic.armed { color: inherit; background: none; border-radius: 14px; box-shadow: 0 0 0 2px var(--error-color, #f44336); }
        @keyframes ac-armed { to { opacity: 0.65; } }
        @media (prefers-reduced-motion: reduce) { .armed { animation-name: none; } }
        .action-btn ha-icon { --mdc-icon-size: 20px; }
        /* The compact modes. The name's line carries every icon, so none of
           them sits on top of anything. */
        .cmp-head { display: flex; align-items: center; gap: 6px; min-height: 32px; }
        .cmp-icons { display: flex; align-items: center; gap: 2px; flex-shrink: 0; }
        .cmp-icons .light-badge, .cmp-icons .conn-badge, .cmp-icons .corner-btn, .cmp-icons .door-badge, .cmp-icons .batt-badge { position: static; }
        .cmp-icons .door-badge, .cmp-icons .batt-badge { display: flex; padding: 4px; }
        .cmp-icons .conn-badge, .cmp-icons .light-badge { display: flex; padding: 4px; }
        .cmp-icons .action-btn { width: 32px; height: 32px; }
        .cmp-icons .action-btn ha-icon { --mdc-icon-size: 18px; }
        .cmp-icons .action-btn.pill { width: auto; padding: 0 8px; font-size: 0.85em; gap: 4px; }
        .cmp-icons .action-btn.pill .chev { display: none; }
        .cmp-hide .cmp-head { display: grid; grid-template-columns: 1fr minmax(0, auto) 1fr; }
        .cmp-hide .cmp-icons.right { justify-self: end; }
        .cmp-side .cmp-wrap { display: flex; gap: 12px; align-items: center; }
        .cmp-side .cmp-pic { flex-shrink: 0; cursor: pointer; }
        .cmp-side .machine { zoom: ${Math.round(0.75 * illustrationSizeOf(cfg.illustration_size) * 1000) / 1000}; margin: 0; }
        /* A narrow card has no room for the name and its buttons side by
           side: the buttons go under the name rather than over it. The name
           keeps the width of its longest word, which a word cannot shrink
           below anyway, so that is where the line breaks. */
        .cmp-side .cmp-wrap .cmp-head { flex: 1; min-width: 0; flex-wrap: wrap; row-gap: 4px; }
        /* Wrapped under the name, the buttons keep to the right (HACF #127). */
        .cmp-side .cmp-head .cmp-icons { margin-left: auto; }
        .cmp-side .cmp-col { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px; }
        .cmp-side .info-lines.beside { margin-top: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 3px 10px; }
        .cmp-side .info-lines.beside .info-line { font-size: 0.8em; gap: 4px; min-width: 0; }
        .cmp-side .info-lines.beside .info-line > span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .cmp-side .info-lines.beside .info-line ha-icon { --mdc-icon-size: 16px; }
        .cmp-side .info-lines.beside .info-line.fit { flex-wrap: nowrap; padding-left: 0; }
        .cmp-side .info-lines.beside .info-line.fit ha-icon { position: static; }
        .cmp-side .info-lines.beside .info-line .label { display: none; }
        .cmp-more {
          width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
          cursor: pointer; color: var(--secondary-text-color, #727272); --mdc-icon-size: 22px; transition: transform 0.25s, background 0.2s;
        }
        .cmp-more:hover { background: var(--secondary-background-color, rgba(0, 0, 0, 0.06)); }
        .cmp-more.open { transform: rotate(180deg); }
        .cmp-side .cmp-head .top { flex: 1 1 0; min-width: min-content; align-items: flex-start; text-align: left; }
        .cmp-side .info-lines { margin-top: 10px; }
        /* fill_height: the card takes the height of its slot, so two cards
           side by side match, and the buttons sit at the bottom. A minimum
           rather than a height: in a slot shorter than its content (a grid
           row count forced too low), the card grows with what it draws
           instead of leaving it hanging outside its own background. */
        ha-card.fill { min-height: 100%; box-sizing: border-box; display: flex; flex-direction: column; }
        ha-card.fill .fill-gap { flex: 1; }
        /* done_alert: a green badge on the drawing, pulsing until seen. */
        .done-badge {
          position: absolute; top: -6px; right: -6px; z-index: 3; width: 26px; height: 26px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          background: var(--success-color, #43a047); color: #fff; --mdc-icon-size: 18px;
          box-shadow: 0 0 0 0 rgba(67, 160, 71, 0.6);
          animation: ac-done-pulse 1.6s ease-out infinite; animation-delay: var(--anim-offset, 0s);
        }
        .cmp-icons .done-badge { position: static; width: 28px; height: 28px; }
        @keyframes ac-done-pulse {
          0% { box-shadow: 0 0 0 0 rgba(67, 160, 71, 0.65); opacity: 1; }
          60% { box-shadow: 0 0 0 12px rgba(67, 160, 71, 0); opacity: 0.55; }
          100% { box-shadow: 0 0 0 0 rgba(67, 160, 71, 0); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) { .done-badge { animation-name: none; } }
        /* On the name's line the corner switches are round, like the buttons. */
        .cmp-icons .corner-btn { border: 1px solid var(--divider-color, #e0e0e0); --mdc-icon-size: 18px; color: var(--primary-text-color, #1c1c1c); }
        .cmp-icons .corner-btn.on { color: var(--primary-color, #03a9f4); border-color: var(--primary-color, #03a9f4); }
    `;

    const compact = compactModeOf(cfg.compact);
    let iconHtml = compact === "hide" ? "" : illustrationHtml(applianceType, illustrationCtx);

    const stripNamePrefix = (friendlyName, entityId) => stripDeviceName(hass, friendlyName, entityId, name);

    // The program and the delayed start, picked in the card between cycles (#79).
    const programMenu = offHidden ? null : programMenuOf(hass, cfg, cap, norm);
    const delayMenu = offHidden ? null : delayMenuOf(hass, cfg, cap, norm);
    this._lineMenus = { program: programMenu, delay: delayMenu, hum_mode: applianceType === "humidifier" ? humidifierModeMenuOf(hass, cfg) : null, hum_mist: applianceType === "humidifier" ? humidifierMistMenuOf(hass, cfg) : null };
    if (!this._lineMenus[this._lineMenu]) this._lineMenu = null;
    let lines = [];
    if (programText) {
      lines.push(cap.printer3d
        ? { key: "file", icon: "mdi:file-outline", label: t(hass, "p3_file"), value: programText, wrap: true }
        : { key: "program", icon: "mdi:tag-outline", label: t(hass, "program"), value: programText, menu: programMenu ? "program" : "" });
    }
    if (delayMenu) {
      lines.push({ key: "delay_set", icon: "mdi:clock-start", label: t(hass, "delay_set"), value: lineMenuLabel(hass, cfg, delayMenu, delayMenu.current), menu: "delay" });
    }
    if (remSec !== null) {
      const remRounded = Math.round(remSec / 60);
      // Opt-in: the end time on a line of its own keeps both readings on one
      // row down to a much narrower card than the combined value manages.
      if (remRounded > 0 && cfg.remaining_time_split) {
        lines.push({
          key: "remaining",
          icon: "mdi:timer-outline",
          label: t(hass, "section_remaining"),
          value: keepTogether(formatDuration(remSec, hass)),
        });
        lines.push({
          key: "ready_at",
          icon: "mdi:clock-end",
          label: t(hass, "section_ready_at"),
          value: keepTogether(formatEta(remSec, hass)),
        });
      } else {
        lines.push({
          key: "remaining",
          icon: "mdi:timer-outline",
          label: t(hass, "section_remaining"),
          value: remRounded > 0
            ? `${keepTogether(formatDuration(remSec, hass))}\u00a0\u00b7 ${keepTogether(`${t(hass, "ready_at")} ${formatEta(remSec, hass)}`)}`
            : t(hass, "time_done"),
        });
      }
    }
    if (delaySec !== null) {
      lines.push({
        key: "delay",
        icon: "mdi:timer-sand",
        label: t(hass, "delay_starts_in"),
        value: `${keepTogether(formatDuration(delaySec, hass))}\u00a0\u00b7 ${keepTogether(formatEta(delaySec, hass))}`,
        entity: cfg.delay_entity,
      });
    }
    if (cap.door && !cap.fridgeTemp && cfg.door_entity && !cfg.door_hide_in_list && !cfg.door_corner) {
      lines.push({
        key: "door",
        icon: doorOpen ? "mdi:door-open" : "mdi:door-closed",
        label: doorOpen ? t(hass, "door_open") : t(hass, "door_closed"),
        value: "",
        warn: doorOpen,
      });
    }
    lines.push(...extraLines);
    // Lines you added come after the ones the card knows how to read on its
    // own: the appliance first, then whatever else you wanted next to it. They
    // carry their entity like every other line, so a tap opens its dialog,
    // which is how a tank or a filter gets reset from the card.
    infoEntities.forEach((e) => {
      lines.push({
        icon: e.icon || e.st.attributes.icon || "mdi:information-outline",
        label: e.label || stripNamePrefix(e.st.attributes.friendly_name, e.entity),
        value: formatInfoValue(e.st, hass, e.value_map, cfg, e.entity, e.hide_unit),
        entity: e.entity,
        key: e.entity,
      });
    });

    // The order you chose, then everything else where the card puts it. A list
    // naming one line pins that line to the top without having to describe the
    // rest, a line that is not showing today is simply skipped, and an empty
    // list is the card's own order. Sorting is stable, so what you left out
    // keeps the order it had.
    const order = (Array.isArray(cfg.lines_order) ? cfg.lines_order : []).filter(Boolean);
    if (order.length) {
      // A fridge's two doors make one line while both are shut and two once
      // one opens: either stands in for the other, so a door that opens
      // stays where the line was put.
      const aliases = { doors: ["door", "freezer_door"], door: ["doors"], freezer_door: ["doors"] };
      const rank = (l) => {
        const keys = l.key ? [l.key].concat(aliases[l.key] || []) : [];
        const at = keys.map((k) => order.indexOf(k)).filter((i) => i !== -1);
        return at.length ? Math.min(...at) : order.length;
      };
      lines = lines
        .map((line, at) => ({ line, at }))
        .sort((a, b) => rank(a.line) - rank(b.line) || a.at - b.at)
        .map((x) => x.line);
    }
    // What the editor reads to offer an order: the lines actually drawn, in
    // the card's own language, rather than a second list to keep in step with
    // this one.
    const hidden = Array.isArray(cfg.hidden_lines) ? cfg.hidden_lines : [];
    this._drawnLines = lines.filter((l) => l.key).map((l) => ({ key: l.key, label: l.label, hidden: hidden.includes(l.key) }));
    // hidden_lines: a line you never want to see (HACF #127), still offered
    // in the editor so it can be shown again.
    if (hidden.length) lines = lines.filter((l) => !l.key || !hidden.includes(l.key));
    if (offHidden) lines = [];
    // The history: a discreet button under the lines unfolds the curve.
    let historyHtml = "";
    const historyEntity = cfg.show_history ? historyEntityOf(hass, cfg, applianceType) : null;
    if (historyEntity) {
      const periods = historyPeriodsOf(cfg);
      const hours = periods.includes(this._historyHours) ? this._historyHours : periods.includes(historyHoursOf(cfg)) ? historyHoursOf(cfg) : periods[0];
      const open = !!this._historyOpen;
      let body = "";
      if (open) {
        // A washer's, a dryer's or a dishwasher's week or month, as a bar per
        // day: a power curve says nothing at that scale (HACF #138).
        const unitOf = (id) => { const o = id && stateObj(hass, id); return (o && o.attributes.unit_of_measurement) || ""; };
        const bars = HISTORY_BAR_TYPES.includes(applianceType) && !cfg.history_entity && historyInDays(hours) && hours > HISTORY_RAW_HOURS ? {
          energy: cfg.energy_entity || null, energyUnit: unitOf(cfg.energy_entity),
          power: cfg.power_entity || null, powerUnit: unitOf(cfg.power_entity),
          state: cfg.state_entity && !powerDerived ? cfg.state_entity : null, stateMap: cfg.state_map || null,
          type: applianceType, threshold: isFinite(threshold) ? threshold : 10,
        } : null;
        this._lookUpHistory(historyEntity, hours, bars);
        const hkey = `${historyEntity}|${hours}|${bars ? JSON.stringify(bars) : ""}`;
        const h = this._history && this._history.key === hkey ? this._history : null;
        const chips = periods.length > 1 ? `<div class="h-periods">${periods.map((p) => `<span class="h-chip${p === hours ? " on" : ""}" data-history-hours="${p}" role="button">${esc(historyChip(hass, p))}</span>`).join("")}</div>` : "";
        const chart = h ? historyChart(h) : null;
        const hst = stateObj(hass, historyEntity);
        const unit = (hst && hst.attributes.unit_of_measurement) || "";
        const fmt = (v) => keepTogether(`${netNumber(hass, v, Math.abs(v) < 100 ? 1 : 0)}${unit ? ` ${unit}` : ""}`);
        body = chips + (!h ? `<div class="history"><div class="h-empty">\u2026</div></div>`
          : bars ? (h.bars ? `<div class="history bars" style="--h-color:var(--primary-color, #03a9f4)">${historyBarsHtml(hass, h.bars)}` : `<div class="history"><div class="h-empty">${esc(t(hass, "history_empty"))}</div></div>`)
          : chart ? `<div class="history" style="--h-color:${color}"><span class="h-max">${esc(fmt(chart.max))}</span>${chart.svg}<span class="h-min">${esc(fmt(chart.min))}</span></div>`
            : `<div class="history"><div class="h-empty">${esc(t(hass, "history_empty"))}</div></div>`);
      }
      historyHtml = `<div class="history-toggle" data-history-toggle="1" aria-expanded="${open}"><ha-icon icon="mdi:chart-line"></ha-icon><span>${esc(historyLabel(hass, hours))}</span><ha-icon class="caret" icon="mdi:chevron-${open ? "up" : "down"}"></ha-icon></div>${body}`;
    }
    // A line's menu, open under the lines: every option, the current one ticked.
    const lineMenu = this._lineMenu ? this._lineMenus[this._lineMenu] : null;
    const lineMenuHtml = lineMenu && lines.some((l) => l.menu === this._lineMenu)
      ? `<div class="line-menu" role="listbox">${lineMenu.options.map((o) => `<div class="mode-row${o === lineMenu.current ? " sel" : ""}" role="option" aria-selected="${o === lineMenu.current}" data-line-option="${esc(o)}"><span>${esc(lineMenuLabel(hass, cfg, lineMenu, o))}</span>${o === lineMenu.current ? `<ha-icon icon="mdi:check"></ha-icon>` : ""}</div>`).join("")}</div>`
      : "";
    const linesHtml = lines.length
      ? `<div class="info-lines${infoEntities.length > INFO_COMPACT_ABOVE ? " compact" : ""}">${lines
          .map((l) => ({ ...l, open: !!l.entity && entityUsable(hass, l.entity) }))
          .map(
            (l) =>
              `<div class="info-line ${l.warn ? "warn" : l.caution ? "caution" : ""}${l.open || l.menu ? " clickable" : ""}${l.menu ? " has-menu" : ""}${l.wrap ? " wrap" : ""}${!l.wrap && !l.bare && l.value && String(l.value).length <= 14 ? " fit" : ""}"${l.open ? ` data-more="${esc(l.entity)}"` : ""}${l.menu ? ` data-line-menu="${l.menu}" aria-expanded="${this._lineMenu === l.menu}"` : ""} title="${esc(l.label)}"><ha-icon icon="${esc(l.icon)}"></ha-icon>${l.bare && l.value ? "" : `<span class="label">${esc(l.label)}</span>`}${l.value ? `<span>${esc(l.value)}</span>` : ""}${l.menu ? `<ha-icon class="chev" icon="mdi:chevron-${this._lineMenu === l.menu ? "up" : "down"}"></ha-icon>` : ""}</div>`
          )
          .join("")}${lineMenuHtml}</div>`
      : "";

    const slidersHtml = sliders.length
      ? `<div class="sliders">${sliders.map((sl) => {
        const sst = stateObj(hass, sl.entity);
        const a = (sst && sst.attributes) || {};
        const min = sl.min ?? numberOrNull(a.min) ?? 0, max = sl.max ?? numberOrNull(a.max) ?? 100, step = sl.step ?? numberOrNull(a.step) ?? 1;
        const v = sl.value ?? numberOrNull(sst && sst.state) ?? min;
        const unit = sl.unit ?? a.unit_of_measurement ?? "";
        return `<div class="slider-row" title="${esc(sl.label)}"><ha-icon icon="${esc(sl.icon)}"></ha-icon><span class="s-label">${esc(sl.label)}</span>`
          + `<input type="range" data-slider="${esc(sl.entity)}" data-unit="${esc(unit)}" min="${min}" max="${max}" step="${step}" value="${v}" aria-label="${esc(sl.label)}">`
          + `<span class="s-val">${esc(`${netNumber(hass, v, 0)}${unit ? ` ${unit}` : ""}`)}</span></div>`;
      }).join("")}</div>`
      : "";

    // Bar priority: preheating beats cycle progress (it's the live information
    // while an oven climbs), and a hood has no cycle so its bar is the filter.
    let barPct = offHidden ? null : progressPct;
    // A watering's progress (#85).
    if (!offHidden && ntDraw && ntDraw.progress !== undefined && ntDraw.progress !== null) barPct = ntDraw.progress;
    let barColor = color;
    // A filter's life on the bar says so, with its icon and its percentage
    // (#54): a bar alone reads as a cycle's progress.
    let barLabel = "";
    // The countdown of a delayed start, as a bar that fills up to the start.
    const delayPct = delaySec !== null && norm === "delayed" ? this._delayProgress(cfg.delay_entity, delaySec) : null;
    if (delayPct !== null && progressPct === null) barPct = delayPct;
    if (heatBarPct !== null) {
      barPct = heatBarPct;
      barColor = "#ff7043";
    } else if (cap.filter && filterPct !== null && progressPct === null) {
      barPct = filterPct;
      barColor = filterPct <= 15 ? "var(--error-color, #f44336)" : "var(--warning-color, #ff9800)";
      barLabel = t(hass, "section_filter_life");
    } else if (hrvFilterPct !== null && progressPct === null) {
      barPct = hrvFilterPct;
      barColor = hrv && hrv.filterDue ? "var(--error-color, #f44336)" : "var(--warning-color, #ff9800)";
      barLabel = t(hass, "section_filter_life");
    }

    // hide_when_off also drops an empty bar between cycles (#79).
    if (cfg.hide_when_off && barPct === 0 && !isActiveState(norm) && norm !== "paused") barPct = null;
    const barHtml = barPct !== null
      ? `
        <div class="bar-row${barLabel ? " labelled" : ""}"${barLabel ? ` title="${esc(barLabel)}"` : ""}>${barLabel ? `<ha-icon icon="mdi:air-filter"></ha-icon><span class="bar-lbl">${esc(barLabel)}</span>` : ""}
          <div class="bar"><div class="bar-fill" style="width:${barPct.toFixed(0)}%;background:${barColor}"></div></div>${barLabel ? `<span class="bar-pct">${barPct.toFixed(0)}\u00a0%</span>` : ""}
        </div>`
      : "";

    // Every alert, the alerts entity's attributes and the alert entities
    // alike, each a tap away from the entity where it gets acknowledged. One
    // shows under its own name; several gather behind their count, which
    // opens them.
    const alertItems = alerts.map((key) => ({ entity: cfg.alerts_entity, label: key, icon: "mdi:alert-circle" }))
      .concat(raisedAlerts(hass, cfg.alerts_entities).map((a) => ({
        entity: a.entity,
        label: a.label || stripNamePrefix(a.st.attributes.friendly_name, a.entity),
        icon: a.icon || a.st.attributes.icon || "mdi:alert-circle",
      })));
    if (alertItems.length < 2) this._alertsOpen = false;
    const alertItem = (a, cls) => `<div class="${cls} clickable" data-more="${esc(a.entity)}"><ha-icon icon="${esc(a.icon)}"></ha-icon><span class="alert-label">${esc(a.label)}</span>`;
    let alertsHtml = "";
    if (offHidden) alertItems.length = 0;
    if (alertItems.length === 1) {
      alertsHtml = `<div class="alerts-wrap">${alertItem(alertItems[0], "alerts-pill")}</div></div>`;
    } else if (alertItems.length > 1) {
      const open = !!this._alertsOpen;
      alertsHtml = `<div class="alerts-wrap"><div class="alerts-pill" data-alerts-toggle="1" aria-expanded="${open}"><ha-icon icon="mdi:alert-circle"></ha-icon><span class="alert-label">${esc(alertsCountLabel(hass, alertItems.length))}</span><ha-icon class="caret" icon="mdi:chevron-${open ? "up" : "down"}"></ha-icon></div>${open
        ? `<div class="alerts-menu">${alertItems.map((a) => `${alertItem(a, "alert-row")}<ha-icon class="go" icon="mdi:chevron-right"></ha-icon></div>`).join("")}</div>`
        : ""}</div>`;
    }

    // The mode menu, open under the buttons: every mode the unit offers, the
    // current one ticked.
    const menuAction = actions.find((a) => a.menu);
    if (!menuAction) this._modeMenuOpen = false;
    const modeMenu = menuAction && this._modeMenuOpen ? cardMenuOf(hass, cfg, cap) : null;
    const modeMenuHtml = modeMenu
      ? `<div class="mode-menu" role="listbox">${modeMenu.options.map((o) => `<div class="mode-row${o === modeMenu.current ? " sel" : ""}" role="option" aria-selected="${o === modeMenu.current}" data-mode-option="${esc(o)}"><span>${esc(cardMenuLabel(hass, modeMenu, o))}</span>${o === modeMenu.current ? `<ha-icon icon="mdi:check"></ha-icon>` : ""}</div>`).join("")}</div>`
      : "";
    const actionsHtml = actions.length
      ? `<div class="actions-row">${actions
          .map(
            (a) =>
              `<div class="action-btn${a.text ? " pill" : ""} ${a.on || (a.menu && this._modeMenuOpen) ? "on" : ""}" data-entity="${esc(a.entity)}"${a.menu ? ` data-menu="1" aria-expanded="${!!this._modeMenuOpen}"` : ""}${a.service ? ` data-service="${esc(a.service)}"` : ""}${a.option ? ` data-option="${esc(a.option)}"` : ""}${a.value !== undefined && a.value !== null && a.value !== "" ? ` data-value="${esc(a.value)}"` : ""} title="${esc(a.label)}" aria-label="${esc(a.label)}"><ha-icon icon="${esc(a.icon)}"></ha-icon>${a.text ? `<span>${esc(a.text)}</span><ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>` : ""}</div>`
          )
          .join("")}</div>${modeMenuHtml}`
      : "";

    const connBadgeHtml = connectivity !== null
      ? `<div class="conn-badge ${connectivity ? "" : "disconnected"}"><ha-icon icon="${connectivity ? "mdi:wifi" : "mdi:wifi-off"}"></ha-icon></div>`
      : "";

    const lightBadgeHtml = cap.light && cfg.light_entity
      ? `<div class="light-badge ${lit ? "on" : ""}" data-entity="${esc(cfg.light_entity)}" title="${esc(t(hass, "light"))}" aria-label="${esc(t(hass, "light"))}"><ha-icon icon="${lit ? "mdi:lightbulb-on" : "mdi:lightbulb-outline"}"></ha-icon></div>`
      : "";

    // The door, in a corner rather than in the lines when asked (issue #41):
    // on the left, or on the right when the light has the left. Green shut,
    // orange open, and a tap opens its dialog.
    const doorSide = cap.door && !cap.fridgeTemp && cfg.door_entity && cfg.door_corner && stateObj(hass, cfg.door_entity)
      ? (lightBadgeHtml ? "right" : "left") : "";
    const doorLabel = t(hass, doorOpen ? "door_open" : "door_closed");
    const doorBadgeHtml = doorSide
      ? `<div class="door-badge ${doorSide}${doorOpen ? " open" : ""}" style="top:${doorSide === "right" && connBadgeHtml ? 40 : 10}px" data-more="${esc(cfg.door_entity)}" title="${esc(doorLabel)}" aria-label="${esc(doorLabel)}"><ha-icon icon="${doorOpen ? "mdi:door-open" : "mdi:door-closed"}"></ha-icon></div>`
      : "";

    // A robot's battery, in a corner rather than in the lines when asked
    // (#49): an icon that fills and its percentage, orange when it runs low.
    // A wall tablet always has it there (#62), as its battery is all a
    // glance at it needs.
    const batt = robot ? (cfg.battery_corner && robot.mode !== "unav" ? { pct: robot.battery, charging: robot.mode === "charging" } : null)
      : screen && (screen.tablet || screen.laptop) ? { pct: screen.battery, charging: screen.charging } : null;
    const battSide = batt && batt.pct !== null
      ? (lightBadgeHtml || doorSide === "left" ? "right" : "left") : "";
    const battBadgeHtml = battSide
      ? `<div class="batt-badge ${battSide}${batt.pct <= 20 ? " low" : ""}" style="top:${battSide === "right" && connBadgeHtml ? 40 : 10}px" data-more="${esc(cfg.battery_entity || cfg.state_entity)}" title="${esc(t(hass, "section_battery"))}" aria-label="${esc(t(hass, "section_battery"))}"><ha-icon icon="${robotBatteryIcon(batt.pct, batt.charging)}"></ha-icon><span>${Math.round(batt.pct)} %</span></div>`
      : "";

    // The switches the user wants at hand: the first on the left, the second
    // on the right, each under what already sits in its corner. The icon says
    // what each one does and whether it holds.
    const cornerList = entityEntries(cfg.corner_entities, CORNERS_MAX)
      .filter((c) => stateObj(hass, c.entity))
      .map((c, i) => {
        const cst = stateObj(hass, c.entity);
        const on = cornerOn(cst);
        const icon = cornerIcon(hass, c);
        const label = c.label || stripNamePrefix(cst.attributes.friendly_name, c.entity);
        const side = i ? "right" : "left";
        const top = side === "left" ? (lightBadgeHtml || doorSide === "left" || battSide === "left" ? 36 : 6)
          : (connBadgeHtml ? 36 : 6) + (doorSide === "right" || battSide === "right" ? 30 : 0);
        return `<div class="corner-btn ${side}${on ? " on" : ""}" style="top:${top}px" data-corner="${esc(c.entity)}" title="${esc(label)}" aria-label="${esc(label)}"><ha-icon icon="${esc(icon)}"></ha-icon></div>`;
      });
    const cornersHtml = cornerList.join("");

    // A theme reaches this card through its ha-card, and card_mod styles that
    // element too. Rebuilding the whole shadow root would hand them a new one
    // on every state change, and the card would sit there unthemed until the
    // page was reloaded (issue #21). The shell is therefore built once and
    // only its contents are redrawn.
    if (!this._card) {
      this._styleEl = document.createElement("style");
      this._card = document.createElement("ha-card");
      this._root.appendChild(this._styleEl);
      this._root.appendChild(this._card);
    }
    this._styleEl.textContent = css;
    // A finished cycle can flash until someone has seen it: the door opening
    // says so, and so does a tap on the badge. Read again after a reload: the
    // door having moved since the cycle ended counts as seen.
    const doneAlert = !!cfg.done_alert && norm === "done";
    if (!doneAlert) this._doneSeen = false;
    else if (doorOpen) this._doneSeen = true;
    else if (cfg.door_entity && !this._doneSeen) {
      const dst = stateObj(hass, cfg.door_entity);
      const sst = stateObj(hass, cfg.state_entity);
      if (dst && sst && !powerDerived && Date.parse(dst.last_changed) > Date.parse(sst.last_changed)) this._doneSeen = true;
    }
    const doneBadge = doneAlert && !this._doneSeen
      ? `<div class="done-badge" data-done-seen="1" title="${esc(t(hass, "done_seen"))}" aria-label="${esc(t(hass, "done_seen"))}"><ha-icon icon="mdi:check-bold"></ha-icon></div>`
      : "";
    if (doneBadge && iconHtml && compact !== "hide") iconHtml = iconHtml.replace(/<\/div>\s*$/, `${doneBadge}</div>`);
    const titleHtml = `${cfg.show_name === false ? "" : `<div class="name">${esc(name)}</div>`}
          ${stateLabel && cfg.show_state !== false ? `<div class="state-line">${esc(stateLabel)}</div>` : ""}`;
    // A compact card has no row of its own for its buttons: they join the
    // corner switches, the light and the connection on the name's line.
    const buttonsInline = actionsHtml.replace('<div class="actions-row">', "").replace(/<\/div>$/, "");
    // A tap on the drawing alone (HACF #125): a lamp lit by touching it, while
    // the rest of the card keeps its own tap.
    const picTap = illustrationTapOf(cfg);
    const leftIcons = lightBadgeHtml + (doorSide === "left" ? doorBadgeHtml : "") + (battSide === "left" ? battBadgeHtml : "") + (cornerList[0] || "");
    const rightIcons = (compact === "hide" ? doneBadge : "") + (cornerList[1] || "") + (doorSide === "right" ? doorBadgeHtml : "") + (battSide === "right" ? battBadgeHtml : "") + connBadgeHtml
      + (compact ? buttonsInline : "");
    // Classes rather than a className: a theme or card_mod may add its own.
    if (this._card.classList) {
      this._card.classList.toggle("cmp", !!compact);
      this._card.classList.toggle("cmp-hide", compact === "hide");
      this._card.classList.toggle("cmp-side", compact === "side");
      this._card.classList.toggle("fill", !!cfg.fill_height);
      this._card.classList.toggle("clear", !!cfg.transparent);
    }
    // Side: the drawing, the name and the buttons on one row, and the lines
    // under them the whole width of the card, a narrow card wrapping nothing.
    // Its lines, on a compact card set to: under the row as ever, beside the
    // drawing under the name, or hidden behind a chevron that shows them
    // beside it, a choice each browser keeps for itself.
    const linesMode = ["beside", "toggle"].includes(cfg.compact_lines) ? cfg.compact_lines : "below";
    if (this._linesOpen === undefined) this._linesOpen = linesOpenStored(cfg);
    const linesBeside = !!linesHtml && (linesMode === "beside" || (linesMode === "toggle" && this._linesOpen));
    const linesBelow = linesMode === "below" ? linesHtml : "";
    const chevron = compact === "side" && linesMode === "toggle" && linesHtml
      ? `<div class="cmp-more${this._linesOpen ? " open" : ""}" data-lines-toggle role="button" tabindex="0" aria-expanded="${!!this._linesOpen}" title="${esc(t(hass, this._linesOpen ? "lines_hide" : "lines_show"))}"><ha-icon icon="mdi:chevron-down"></ha-icon></div>` : "";
    this._card.innerHTML = compact === "side" ? `
        <div class="cmp-wrap">
          <div class="cmp-pic" ${picTap ? 'data-pic-tap="1"' : 'data-tap="1"'}>${iconHtml}</div>
          <div class="cmp-col">
            <div class="cmp-head">
              <div class="top" id="header">${titleHtml}</div>
              <div class="cmp-icons">${leftIcons}${rightIcons}${chevron}</div>
            </div>
            ${linesBeside ? linesHtml.replace('class="info-lines', 'class="info-lines beside') : ""}
          </div>
        </div>
        ${barHtml}
        ${linesBelow}${slidersHtml}${historyHtml}
        ${alertsHtml}
    ` : compact === "hide" ? `
        <div class="cmp-head">
          <div class="cmp-icons left">${leftIcons}</div>
          <div class="top" id="header">${titleHtml}</div>
          <div class="cmp-icons right">${rightIcons}</div>
        </div>
        ${barHtml}
        ${linesHtml}${slidersHtml}${historyHtml}
        ${alertsHtml}
    ` : `
        ${lightBadgeHtml}
        ${connBadgeHtml}
        ${doorBadgeHtml}
        ${battBadgeHtml}
        ${cornersHtml}
        <div class="top" id="header">
          ${picTap ? '<div class="pic-tap" data-pic-tap="1">' : ""}${cfg.illustration_frame ? `<div class="pic-frame">${iconHtml}</div>` : iconHtml}${picTap ? "</div>" : ""}
          ${titleHtml}
        </div>
        ${barHtml}
        ${linesHtml}${slidersHtml}${historyHtml}
        ${alertsHtml}
        <div class="fill-gap"></div>
        ${actionsHtml}
    `;

    if (this.style && typeof this.style.setProperty === "function") {
      if (cfg.fill_height) this.style.setProperty("height", "100%");
      else this.style.removeProperty("height");
    }
    this._fitDrawing();
    const header = this._root.getElementById("header");
    if (header) header.addEventListener("click", () => this._tap(cfg, tapFallback));
    this._root.querySelectorAll("[data-tap]").forEach((el) => el.addEventListener("click", () => this._tap(cfg, tapFallback)));
    // A drawing that switches the appliance asks for the same touch as its
    // buttons (HACF #127): a tap, two taps or a long press, as the card's
    // controls are set to.
    this._root.querySelectorAll("[data-pic-tap]").forEach((el) => {
      const pic = illustrationTapOf(cfg);
      const run = () => this._tap({ ...cfg, tap_action: pic }, tapFallback);
      if (pic && pic.action === "toggle" && cfg.state_entity) this._wireControl(el, cfg.controls_activation, cfg.state_entity, run);
      else el.addEventListener("click", (ev) => { ev.stopPropagation(); run(); });
    });
    this._root.querySelectorAll("[data-lines-toggle]").forEach((el) => {
      const flip = (ev) => {
        ev.stopPropagation();
        this._linesOpen = !this._linesOpen;
        linesOpenStore(cfg, this._linesOpen);
        this._render();
      };
      el.addEventListener("click", flip);
      el.addEventListener("keydown", (ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); flip(ev); } });
    });
    this._root.querySelectorAll("[data-done-seen]").forEach((el) => el.addEventListener("click", (ev) => {
      ev.stopPropagation();
      this._doneSeen = true;
      this._render();
    }));
    this._placeModeMenu();
    this._root.querySelectorAll("[data-mode-option]").forEach((el) => el.addEventListener("click", (ev) => {
      ev.stopPropagation();
      this._modeMenuOpen = false;
      this._pickMode(el.getAttribute("data-mode-option"));
    }));
    this._root.querySelectorAll(".action-btn, .light-badge").forEach((el) => {
      // The mode button opens its menu rather than calling anything.
      if (el.getAttribute("data-menu")) {
        el.addEventListener("click", (ev) => {
          ev.stopPropagation();
          this._modeMenuOpen = !this._modeMenuOpen;
          this._render();
        });
        return;
      }
      const id = el.getAttribute("data-entity");
      this._wireControl(el, cfg.controls_activation, id, () => this._call(id, {
        service: el.getAttribute("data-service"),
        option: el.getAttribute("data-option"),
        value: el.getAttribute("data-value"),
      }));
    });
    this._root.querySelectorAll(".info-line[data-more], .alert-row[data-more], .alerts-pill[data-more], .door-badge[data-more], .batt-badge[data-more]").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.stopPropagation();
        this._moreInfo(el.getAttribute("data-more"));
      });
    });
    // A lock is opened rather than unlocked: a stray tap on a dashboard must
    // never unlock anything.
    this._root.querySelectorAll("[data-corner]").forEach((el) => {
      const id = el.getAttribute("data-corner");
      this._wireControl(el, cfg.controls_activation, id,
        () => (domainOf(id) === "lock" ? this._moreInfo(id) : this._call(id)));
    });
    this._root.querySelectorAll("[data-alerts-toggle]").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.stopPropagation();
        this._alertsOpen = !this._alertsOpen;
        this._render();
      });
    });
    // A slider shows its value as it moves and sets it when let go; a tap on
    // it never reaches the card's own tap.
    this._root.querySelectorAll("input[data-slider]").forEach((el) => {
      const out = el.parentNode && el.parentNode.querySelector ? el.parentNode.querySelector(".s-val") : null;
      const unit = el.getAttribute("data-unit") || "";
      ["click", "pointerdown", "touchstart"].forEach((n) => el.addEventListener(n, (ev) => ev.stopPropagation()));
      el.addEventListener("input", () => { if (out) out.textContent = `${el.value}${unit ? ` ${unit}` : ""}`; });
      el.addEventListener("change", () => this._call(el.getAttribute("data-slider"), { value: el.value }));
    });
    this._root.querySelectorAll("[data-line-menu]").forEach((el) => el.addEventListener("click", (ev) => {
      ev.stopPropagation();
      const kind = el.getAttribute("data-line-menu");
      this._lineMenu = this._lineMenu === kind ? null : kind;
      this._render();
    }));
    this._root.querySelectorAll("[data-line-option]").forEach((el) => el.addEventListener("click", (ev) => {
      ev.stopPropagation();
      this._pickLine(this._lineMenu, el.getAttribute("data-line-option"));
    }));
    this._root.querySelectorAll("[data-history-hours]").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.stopPropagation();
        this._historyHours = Number(el.getAttribute("data-history-hours"));
        this._render();
      });
    });
    this._root.querySelectorAll("[data-history-toggle]").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.stopPropagation();
        this._historyOpen = !this._historyOpen;
        this._render();
      });
    });
    this._fridgeSwing(applianceType === "fridge" && compact !== "hide" ? illustrationCtx : null);
  }

  // The open mode menu sits under its button, or above it when the page has
  // no room below, kept inside the window. Whatever ancestor turns fixed into
  // relative (a transform, a container), the offset it adds is measured and
  // taken back.
  _placeModeMenu() {
    const menu = this._root && this._root.querySelector ? this._root.querySelector(".mode-menu") : null;
    const btn = menu ? this._root.querySelector("[data-menu]") : null;
    // A click anywhere else, or the page scrolling under it, closes it.
    if (typeof window !== "undefined" && window.addEventListener) {
      if (this._menuAway) {
        window.removeEventListener("click", this._menuAway);
        window.removeEventListener("scroll", this._menuAway, true);
        this._menuAway = null;
      }
      if (menu) {
        this._menuAway = () => {
          window.removeEventListener("click", this._menuAway);
          window.removeEventListener("scroll", this._menuAway, true);
          this._menuAway = null;
          if (this._modeMenuOpen) { this._modeMenuOpen = false; this._render(); }
        };
        setTimeout(() => {
          if (!this._menuAway) return;
          window.addEventListener("click", this._menuAway);
          window.addEventListener("scroll", this._menuAway, true);
        }, 0);
      }
    }
    if (!menu || !btn || typeof menu.getBoundingClientRect !== "function" || typeof window === "undefined" || !window.innerHeight) return;
    // In the top layer, over every other card of the dashboard (#54): a card
    // below, glass or not, can no longer paint over the list.
    if (typeof menu.showPopover === "function") {
      try {
        menu.setAttribute("popover", "manual");
        if (!menu.matches(":popover-open")) menu.showPopover();
      } catch (e) { /* the card's own layer, then */ }
    }
    const b = btn.getBoundingClientRect();
    const vw = window.innerWidth, vh = window.innerHeight;
    menu.style.left = "0px";
    menu.style.top = "0px";
    const m0 = menu.getBoundingClientRect();
    const w = m0.width, h = m0.height;
    const below = vh - b.bottom - 8, above = b.top - 8;
    const top = h <= below || below >= above ? b.bottom + 6 : Math.max(8, b.top - 6 - h);
    const left = Math.min(Math.max(8, b.left + b.width / 2 - w / 2), vw - w - 8);
    menu.style.left = `${left - m0.left}px`;
    menu.style.top = `${top - m0.top}px`;
    menu.style.maxHeight = `${Math.max(120, Math.max(below, above))}px`;
  }

  // A fridge door opening or closing turns on its hinge rather than jumping:
  // for a moment after the change the drawing is redrawn frame by frame, each
  // door that moved going from shut to open or back. Nothing moves on the
  // first drawing, nor for someone who asked for less motion.
  _fridgeSwing(ctx) {
    const now = ctx ? (ctx.coldBox ? { f: !!(ctx.doorOpen || ctx.freezerDoorOpen), z: false } : { f: !!ctx.doorOpen, z: !!ctx.freezerDoorOpen }) : null;
    const prev = this._frDoors;
    this._frDoors = now;
    if (!now || !prev || (prev.f === now.f && prev.z === now.z)) return;
    if (typeof requestAnimationFrame !== "function" || typeof performance === "undefined") return;
    if (typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (this._frRaf) cancelAnimationFrame(this._frRaf);
    const t0 = performance.now(), dur = 800;
    const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
    const step = (t) => {
      const host = this._root && this._root.querySelector(".fr3");
      if (!host) { this._frRaf = null; return; }
      const p = Math.min(1, (t - t0) / dur), e = ease(p);
      const k = (a, b) => (a === b ? 1 : b ? e : 1 - e);
      host.innerHTML = p < 1
        ? FR3(ctx, { open: prev.f || now.f, freezerOpen: prev.z || now.z, kF: k(prev.f, now.f), kZ: k(prev.z, now.z) })
        : FR3(ctx);
      this._frRaf = p < 1 ? requestAnimationFrame(step) : null;
    };
    this._frRaf = requestAnimationFrame(step);
  }
}

// The editor is fetched on demand in a release. This stand-in is all a
// source build needs, the editor being defined further down; tools/build.mjs
// swaps it for the loader.
