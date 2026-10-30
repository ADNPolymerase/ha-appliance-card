// Built by tools/build.mjs from src/ha-appliance-card.js: edit the source, not this file.
// The card's editor, loaded by the card the first time it is edited.
export default function defineEditor({ t, onLanguageLoaded, LANGUAGE_NAMES, localizedHass, activationOf, TH_LAYOUTS, EV_POWER_THRESHOLD, stateObj, parseValueMap, stringifyValueMap, alertsArray, LIST_OTHER, ENTITY_LISTS, listCandidates, defaultCardName, stripDeviceName, domainOf, INFO_MAX, autoSuggest, APPLIANCE_TYPES, STATE_DOMAINS, SCREEN_ONLY_FIELDS, illustrationSizeOf, fontScaleOf, compactModeOf, TYPE_GROUPS, caps, detectApplianceType, SCREEN_STANDBY_W, SCREEN_LAYOUTS, SCREEN_IMAGES, screenLayoutOf, screenIsTablet, HD_HEAT_W, PLUG_THRESHOLDS, ZONE_POWER_W, PLUG_SOURCE_TYPES, plugSourceOf, DW_DRY_MIN, WASH_HEAT_W, WASH_SPIN_W, DRYER_HEAT_W, NET_LAYOUTS, SWITCH_PORTS, NET_BAYS, NET_BUSY_MBIT, NET_TEMP_ALERT, netLayoutOf, ROBOT_LAYOUTS, ROBOT_STATIONS, ROBOT_FLOORS, ROBOT_SERVICES, STICK_AWAY_W, robotLayoutOf, POOL_PRESSURE_ALERT, SOLAR_LAYOUTS, BATTERY_LAYOUTS, BATTERY_IDLE_W, DIFFUSER_LAYOUTS, HRV_LAYOUTS, CAMERA_LAYOUTS, MAILBOX_LAYOUTS, MAILBOX_SIDES, mailboxLayoutOf, LAMP_LAYOUTS, LAMP_SPOTS, lampLayoutOf, PUMP_LAYOUTS, FLOOR_LAYOUTS, TREE_PALETTES, TREE_PRESENTS, pumpLayoutOf, UPS_BATTERY_LOW, HISTORY_HOURS, BODY_COLORS, esc, SHELTER_STYLES, SHELTER_COLORS, stateFreeSource }) {
// ---------------------------------------------------------------------------
// Editor
// ---------------------------------------------------------------------------

const ACTION_DOMAINS = ["button", "input_button", "switch", "script", "input_boolean"];
// A control can also be a list to pick from or a number to write, which is how
// pet feeders dispense. A power switch cannot, so this list is its own.
const START_DOMAINS = ACTION_DOMAINS.concat(["automation", "select", "input_select", "number", "input_number"]);

// Which types a section applies to. Anything cycle-shaped keeps the original
// program/time/door/controls set; a hood or a cooktop would only be cluttered
// by fields it can never fill.
const CYCLE_TYPES = ["washer", "dryer", "dishwasher", "oven", "microwave", "cooker", "coffee", "rice_cooker", "air_fryer", "printer_3d"];
// A coffee machine has no door and a cooker's lid has no sensor, so neither
// belongs in the door section even though both run programs.
const DOOR_TYPES = ["washer", "dryer", "dishwasher", "oven", "microwave", "fridge"];
// A charger has no cycle either, but it starts, pauses and stops a charge.
const CONTROL_TYPES = CYCLE_TYPES.concat(["ev_charger"]);
// A pet feeder has no cycle, but it does have one thing to press.
const START_TYPES = CONTROL_TYPES.concat(["pet_feeder"]);
// The types a last cycle means something for: the ones that run a cycle, and
// the kettle, the iron and the toaster, which a plug reads the same way.
const LAST_CYCLE_TYPES = CYCLE_TYPES.concat(["kettle", "iron", "toaster", "hair_dryer"]);

const SECTIONS = [
  { field: "program_entity", types: CYCLE_TYPES.filter((ty) => ty !== "printer_3d"), labelKey: "section_program", includeDomains: ["select", "sensor", "input_select"], extra: (c, hass) => c._row("program_format", "program_format", {
      type: "select",
      options: [
        { value: "clean", label: t(hass, "program_format_clean") },
        { value: "raw", label: t(hass, "program_format_raw") },
      ],
    }) },
  { field: "delay_entity", types: CYCLE_TYPES, labelKey: "section_delay", includeDomains: ["sensor", "number", "input_number"] },
  { field: "remaining_time_entity", types: CYCLE_TYPES, labelKey: "section_remaining", includeDomains: ["sensor", "input_number"], extra: (c, hass) => c._row("remaining_time_unit", "remaining_time_unit", {
      type: "select",
      options: [
        { value: "auto", label: t(hass, "unit_auto") },
        { value: "seconds", label: t(hass, "unit_seconds") },
        { value: "minutes", label: t(hass, "unit_minutes") },
        { value: "hours", label: t(hass, "unit_hours") },
      ],
    }) + c._row("remaining_time_hide_when_idle", "remaining_time_hide_when_idle", { type: "checkbox" })
      + c._row("remaining_time_split", "remaining_time_split", { type: "checkbox" }) },
  { field: "progress_entity", types: CYCLE_TYPES, labelKey: "section_progress", includeDomains: ["sensor", "input_number"] },
  // The step of the cycle, for the machines that keep their state at
  // "Running" throughout and name the step in an entity of their own.
  { field: "phase_entity", types: ["washer", "dryer", "dishwasher"], labelKey: "section_cycle_phase", includeDomains: ["sensor", "input_select"] },
  { field: "door_entity", types: DOOR_TYPES, labelKey: "section_door", includeDomains: ["binary_sensor", "sensor"], extra: (c, hass) =>
      c._row("door_open_state", "door_open_state", { placeholder: "on" }) +
      c._row("door_invert", "door_invert", { type: "checkbox" }) +
      c._row("door_hide_in_list", "door_hide_in_list", { type: "checkbox" }) +
      (caps(c._currentType()).fridgeTemp ? "" : c._row("door_corner", "door_corner", { type: "checkbox" })) },

  // Oven
  { field: "target_temperature_entity", types: ["oven", "cooker", "rice_cooker", "air_fryer"], labelKey: "section_target_temperature", includeDomains: ["number", "sensor", "input_number"] },
  { field: "current_temperature_entity", types: ["oven", "cooker", "rice_cooker", "air_fryer"], labelKey: "section_current_temperature", includeDomains: ["sensor", "number"] },
  { field: "heating_entity", types: ["oven", "cooker", "rice_cooker"], labelKey: "section_heating", includeDomains: ["binary_sensor", "sensor", "switch"] },

  // Air fryer
  { field: "basket_entity", types: ["air_fryer"], labelKey: "section_basket", includeDomains: ["binary_sensor", "sensor"] },
  { field: "shake_entity", types: ["air_fryer"], labelKey: "section_shake", includeDomains: ["binary_sensor", "sensor"] },
  { field: "basket2_state_entity", types: ["air_fryer"], labelKey: "section_basket2", includeDomains: ["sensor", "binary_sensor", "select"] },

  // Microwave
  { field: "power_level_entity", types: ["microwave", "cooktop"], labelKey: "section_power_level", includeDomains: ["number", "select", "sensor", "input_number", "input_select"] },

  // Hood
  { field: "fan_entity", types: ["hood"], labelKey: "section_fan", includeDomains: ["fan", "select", "input_select", "sensor", "number", "input_number"] },
  { field: "boost_entity", types: ["hood"], labelKey: "section_boost", includeDomains: ["switch", "binary_sensor", "input_boolean"] },
  { field: "filter_life_entity", types: ["hood", "pet_fountain", "hrv"], labelKey: "section_filter_life", includeDomains: ["sensor", "number"], extra: (c) =>
      c._type === "pet_fountain" ? c._row("filter_due_below", "filter_due_below", { placeholder: "3" }) : "" },
  { field: "filter_reset_entity", types: ["hood", "pet_fountain"], labelKey: "section_filter_reset", includeDomains: ACTION_DOMAINS },

  // Pet fountain
  { field: "pump_clean_entity", types: ["pet_fountain"], labelKey: "section_pump_clean", includeDomains: ["sensor", "number"] },
  { field: "pump_reset_entity", types: ["pet_fountain"], labelKey: "section_pump_reset", includeDomains: ACTION_DOMAINS },
  { field: "pump_running_entity", types: ["pet_fountain"], labelKey: "section_pump_running", includeDomains: ["binary_sensor", "sensor", "switch"] },
  { field: "water_level_entity", types: ["pet_fountain"], labelKey: "section_water_level", includeDomains: ["sensor", "binary_sensor", "number"], extra: (c) =>
      c._row("level_empty_below", "level_empty_below", { placeholder: "10" }) },

  // Air purifier and fan
  { field: "air_quality_entity", types: ["air_purifier"], labelKey: "section_air_quality", includeDomains: ["sensor"] },
  { field: "display_entity", types: ["air_purifier"], labelKey: "section_screen", includeDomains: ["sensor", "number"] },
  // A screen: the players that show something on it, and on a computer the
  // lock of its session.
  { field: "media_entity", types: ["screen"], labelKey: "section_media", includeDomains: ["media_player"] },
  { field: "media2_entity", types: ["screen"], labelKey: "section_media2", includeDomains: ["media_player"] },
  { field: "media3_entity", types: ["screen"], labelKey: "section_media3", includeDomains: ["media_player"] },
  { field: "lock_entity", types: ["screen"], labelKey: "section_lock", includeDomains: ["binary_sensor", "sensor", "lock", "input_boolean"] },
  { field: "source_entity", types: ["screen"], labelKey: "section_screen_source", includeDomains: ["select", "input_select", "media_player"] },
  // A wall tablet (#62): its screensaver, its charger, what it sees, the page
  // it shows, its brightness, when it was last touched, and a reload.
  { field: "screensaver_entity", types: ["screen"], labelKey: "section_screensaver", includeDomains: ["switch", "binary_sensor", "input_boolean"], when: (c) => screenIsTablet(c) },
  { field: "charging_entity", types: ["screen"], labelKey: "section_tab_charging", includeDomains: ["binary_sensor", "sensor", "switch", "input_boolean"], when: (c) => screenIsTablet(c) },
  { field: "motion_entity", types: ["screen"], labelKey: "section_motion", includeDomains: ["binary_sensor", "sensor"], when: (c) => screenIsTablet(c) },
  { field: "url_entity", types: ["screen"], labelKey: "section_tab_page", includeDomains: ["sensor"], when: (c) => screenIsTablet(c) },
  { field: "brightness_entity", types: ["screen"], labelKey: "section_tab_brightness", includeDomains: ["number", "sensor", "light", "input_number"], when: (c) => screenIsTablet(c) },
  { field: "last_interaction_entity", types: ["screen"], labelKey: "section_tab_touched", includeDomains: ["sensor", "binary_sensor", "event", "input_datetime"], when: (c) => screenIsTablet(c) },
  { field: "reload_entity", types: ["screen"], labelKey: "tab_reload", includeDomains: ["button", "script", "input_button"], when: (c) => screenIsTablet(c) },
  { field: "restart_entity", types: ["screen"], labelKey: "tab_restart", includeDomains: ["button", "script", "input_button"], when: (c) => screenIsTablet(c) },
  { field: "screenshot_entity", types: ["screen"], labelKey: "section_tab_screenshot", includeDomains: ["camera", "image"], when: (c) => screenIsTablet(c) },
  // A network device: what it reports, each disk in its bay.
  { field: "download_entity", types: ["network"], labelKey: "section_net_download", includeDomains: ["sensor"], extra: (c) =>
      c._row("net_busy_threshold", "busy_threshold", { placeholder: String(NET_BUSY_MBIT) }) },
  { field: "upload_entity", types: ["network"], labelKey: "section_net_upload", includeDomains: ["sensor"] },
  { field: "cpu_entity", types: ["network"], labelKey: "section_net_cpu", includeDomains: ["sensor"] },
  { field: "memory_entity", types: ["network"], labelKey: "section_net_memory", includeDomains: ["sensor"] },
  { field: "volume_entity", types: ["network"], labelKey: "section_net_volume", includeDomains: ["sensor"] },
  { field: "ports_entity", types: ["network"], labelKey: "section_net_ports", includeDomains: ["sensor"], extra: (c) =>
      c._row("net_ports_total", "ports_total", { placeholder: "8" }) },
  { field: "poe_entity", types: ["network"], labelKey: "section_net_poe", includeDomains: ["sensor"] },
  { field: "temperature_entity", types: ["network"], labelKey: "section_net_temperature", includeDomains: ["sensor"], extra: (c) =>
      c._row("net_temp_alert", "temperature_alert", { placeholder: String(NET_TEMP_ALERT) }) },
  { field: "fan_speed_entity", types: ["network"], labelKey: "section_fan_speed", includeDomains: ["sensor"] },
  { field: "problem_entity", types: ["network"], labelKey: "section_net_problem", includeDomains: ["binary_sensor", "sensor"] },
  // A router: its clients, its internet link and its Wi-Fi.
  { field: "clients_entity", types: ["network"], labelKey: "section_net_clients", includeDomains: ["sensor"],
    when: (c) => netLayoutOf(c, null) === "router" },
  { field: "wan_entity", types: ["network"], labelKey: "section_net_wan", includeDomains: ["binary_sensor", "sensor"],
    when: (c) => netLayoutOf(c, null) === "router" },
  { field: "wifi_entity", types: ["network"], labelKey: "section_net_wifi", includeDomains: ["switch", "binary_sensor", "sensor"],
    when: (c) => netLayoutOf(c, null) === "router" },
  { field: "disk1_entity", types: ["network"], labelKey: "section_net_disk1", includeDomains: ["sensor", "binary_sensor"] },
  { field: "disk2_entity", types: ["network"], labelKey: "section_net_disk2", includeDomains: ["sensor", "binary_sensor"] },
  { field: "disk3_entity", types: ["network"], labelKey: "section_net_disk3", includeDomains: ["sensor", "binary_sensor"] },
  { field: "disk4_entity", types: ["network"], labelKey: "section_net_disk4", includeDomains: ["sensor", "binary_sensor"] },
  // A robot: its detailed status, its battery, and what raises something:
  // a full bin or an empty tank on a vacuum or a mop, rain on a mower.
  // A pool pump: the readings of its water, its filter and its chlorine pump.
  { field: "water_temperature_entity", types: ["pool_pump"], labelKey: "section_water_temperature", includeDomains: ["sensor"] },
  { field: "air_temperature_entity", types: ["pool_pump"], labelKey: "section_air_temperature", includeDomains: ["sensor"] },
  { field: "ph_entity", types: ["pool_pump"], labelKey: "section_ph", includeDomains: ["sensor"] },
  { field: "redox_entity", types: ["pool_pump"], labelKey: "section_redox", includeDomains: ["sensor"] },
  { field: "filtration_time_entity", types: ["pool_pump"], labelKey: "section_filtration_time", includeDomains: ["sensor"] },
  { field: "pressure_entity", types: ["pool_pump"], labelKey: "section_pressure", includeDomains: ["sensor"], extra: (c) =>
      c._row("pool_pressure_alert", "pressure_alert", { placeholder: String(POOL_PRESSURE_ALERT) }) },
  { field: "pool_mode_entity", types: ["pool_pump"], labelKey: "section_pool_mode", includeDomains: ["select", "input_select", "sensor"] },
  { field: "chlorine_pump_entity", types: ["pool_pump"], labelKey: "section_chlorine_pump", includeDomains: ["binary_sensor", "switch", "sensor", "input_boolean"] },
  { field: "chlorine_level_entity", types: ["pool_pump"], labelKey: "section_chlorine_level", includeDomains: ["sensor", "number", "input_number"],
    when: (c) => !!c.chlorine_pump_entity },
  { field: "backwash_entity", types: ["pool_pump"], labelKey: "section_backwash", includeDomains: ["binary_sensor", "switch", "sensor", "input_boolean"] },
  { field: "frost_entity", types: ["pool_pump"], labelKey: "section_frost", includeDomains: ["binary_sensor", "switch", "sensor", "input_boolean"] },
  { field: "pool_alert_entity", types: ["pool_pump"], labelKey: "section_pool_alert", includeDomains: ["binary_sensor", "sensor"] },
  // Solar panels: the energy of the day and an alert. A battery: what goes
  // in and out, its reserve, its charge limit and an alert.
  { field: "energy_today_entity", types: ["solar"], labelKey: "section_energy_today", includeDomains: ["sensor"] },
  { field: "solar_alert_entity", types: ["solar"], labelKey: "section_pool_alert", includeDomains: ["binary_sensor", "sensor"] },
  { field: "charge_power_entity", types: ["home_battery"], labelKey: "section_charge_power", includeDomains: ["sensor"] },
  { field: "discharge_power_entity", types: ["home_battery"], labelKey: "section_battery_discharge", includeDomains: ["sensor"] },
  { field: "reserve_entity", types: ["home_battery"], labelKey: "section_reserve", includeDomains: ["sensor", "number", "input_number"] },
  { field: "charge_limit_entity", types: ["home_battery"], labelKey: "section_charge_limit", includeDomains: ["sensor", "number", "input_number"] },
  { field: "battery_alert_entity", types: ["home_battery"], labelKey: "section_pool_alert", includeDomains: ["binary_sensor", "sensor"] },
  // A bathroom scale: the goal and what the body is made of.
  { field: "weight_goal_entity", types: ["scale"], labelKey: "section_weight_goal", includeDomains: ["sensor", "number", "input_number"], extra: (c) =>
      c._row("scale_goal_value", "weight_goal", { placeholder: "" }) },
  { field: "fat_ratio_entity", types: ["scale"], labelKey: "section_fat_ratio", includeDomains: ["sensor"] },
  { field: "fat_mass_entity", types: ["scale"], labelKey: "section_fat_mass", includeDomains: ["sensor"] },
  { field: "muscle_mass_entity", types: ["scale"], labelKey: "section_muscle_mass", includeDomains: ["sensor"] },
  { field: "bone_mass_entity", types: ["scale"], labelKey: "section_bone_mass", includeDomains: ["sensor"] },
  { field: "robot_status_entity", types: ["robot"], labelKey: "section_robot_status", includeDomains: ["sensor", "select", "input_select"] },
  // A diffuser's empty tank.
  { field: "tank_empty_entity", types: ["diffuser"], labelKey: "section_tank_empty", includeDomains: ["binary_sensor", "sensor"] },
  // A ventilation unit: the other three temperatures, its bypass, its
  // airflow and its filter.
  { field: "supply_temperature_entity", types: ["hrv"], labelKey: "section_supply_temperature", includeDomains: ["sensor"] },
  { field: "extract_temperature_entity", types: ["hrv"], labelKey: "section_extract_temperature", includeDomains: ["sensor"] },
  { field: "exhaust_temperature_entity", types: ["hrv"], labelKey: "section_exhaust_temperature", includeDomains: ["sensor"] },
  { field: "bypass_entity", types: ["hrv"], labelKey: "section_bypass", includeDomains: ["binary_sensor", "switch", "sensor", "select"] },
  { field: "airflow_entity", types: ["hrv"], labelKey: "section_airflow", includeDomains: ["sensor"] },
  { field: "exhaust_airflow_entity", types: ["hrv"], labelKey: "section_exhaust_airflow", includeDomains: ["sensor"] },
  { field: "fan_speed_entity", types: ["hrv"], labelKey: "section_fan_speed", includeDomains: ["number", "sensor", "input_number"] },
  { field: "supply_fan_entity", types: ["hrv"], labelKey: "section_supply_fan", includeDomains: ["sensor"],
    extra: (c) => c._row("fan_max_rpm", "fan_max_rpm", { placeholder: "2000" }) },
  { field: "exhaust_fan_entity", types: ["hrv"], labelKey: "section_exhaust_fan", includeDomains: ["sensor"] },
  { field: "current_humidity_entity", types: ["hrv"], labelKey: "section_current_humidity", includeDomains: ["sensor"] },
  { field: "target_humidity_entity", types: ["hrv"], labelKey: "section_target_humidity", includeDomains: ["number", "sensor", "input_number"] },
  { field: "humidity_control_entity", types: ["hrv"], labelKey: "section_humidity_control", includeDomains: ["switch", "input_boolean"] },
  // A camera: what it sees, whether it records, its night vision, its
  // privacy switch and its signal.
  { field: "motion_entity", types: ["camera"], labelKey: "section_motion", includeDomains: ["binary_sensor", "sensor"] },
  { field: "recording_entity", types: ["camera"], labelKey: "section_recording", includeDomains: ["binary_sensor", "switch", "sensor"] },
  { field: "night_entity", types: ["camera"], labelKey: "section_night_vision", includeDomains: ["binary_sensor", "switch", "select", "sensor", "input_boolean"] },
  { field: "privacy_entity", types: ["camera"], labelKey: "section_privacy", includeDomains: ["switch", "binary_sensor", "input_boolean"] },
  { field: "signal_entity", types: ["camera"], labelKey: "section_signal", includeDomains: ["sensor"] },
  { field: "ring_entity", types: ["camera"], labelKey: "section_ring", includeDomains: ["binary_sensor", "event", "input_boolean", "sensor"] },
  // A mailbox: the mail counter and its two doors.
  // The HACF drawings.
  { field: "pressure_entity", types: ["water_pump"], labelKey: "section_pressure", includeDomains: ["sensor", "number", "input_number"],
    when: (c) => pumpLayoutOf(c, null) === "booster" },
  { field: "level_entity", types: ["water_pump"], labelKey: "section_water_level", includeDomains: ["sensor", "number", "input_number"],
    when: (c) => pumpLayoutOf(c, null) === "sump", extra: (c) => c._row("level_max", "level_max", { placeholder: "100" }) },
  { field: "high_level_entity", types: ["water_pump"], labelKey: "section_high_level", includeDomains: ["binary_sensor", "input_boolean", "sensor"],
    when: (c) => pumpLayoutOf(c, null) === "sump" },
  { field: "temperature_entity", types: ["floor_heating", "spa", "sauna", "aquarium"], labelKey: "temperature", includeDomains: ["sensor", "number", "input_number"] },
  { field: "target_temperature_entity", types: ["sauna"], labelKey: "section_target_temperature", includeDomains: ["number", "sensor", "input_number"] },
  { field: "bubbles_entity", types: ["spa"], labelKey: "section_bubbles", includeDomains: ["switch", "input_boolean", "fan", "binary_sensor"] },
  { field: "tariff_entity", types: ["meter"], labelKey: "section_tariff", includeDomains: ["sensor", "select", "input_select"] },
  { field: "remaining_time_entity", types: ["robot"], labelKey: "section_remaining", includeDomains: ["sensor", "input_number"],
    when: (c) => robotLayoutOf(c, null) === "pool" },
  { field: "mail_count_entity", types: ["mailbox"], labelKey: "section_mail_count", includeDomains: ["sensor", "counter", "input_number", "number"] },
  { field: "front_door_entity", types: ["mailbox"], labelKey: "mb_front_door", includeDomains: ["binary_sensor", "sensor", "input_boolean", "switch"] },
  { field: "back_door_entity", types: ["mailbox"], labelKey: "mb_back_door", includeDomains: ["binary_sensor", "sensor", "input_boolean", "switch"] },
  { field: "battery_entity", types: ["robot", "home_battery", "ups", "camera", "screen"], labelKey: "section_battery", includeDomains: ["sensor"],
    when: (c) => !(c.appliance_type === "screen" || SCREEN_ONLY_FIELDS.some((f) => c[f])) || screenIsTablet(c), extra: (c) =>
      (caps(c._currentType()).ups ? c._row("ups_battery_low", "battery_low", { placeholder: String(UPS_BATTERY_LOW) }) : "") },
  // A UPS: the time left on its battery, its load and the mains voltage.
  { field: "runtime_entity", types: ["ups"], labelKey: "section_ups_runtime", includeDomains: ["sensor"] },
  { field: "load_entity", types: ["ups"], labelKey: "section_ups_load", includeDomains: ["sensor"], extra: (c) =>
      c._row("ups_nominal_power", "nominal_power", { placeholder: "" }) },
  { field: "input_voltage_entity", types: ["ups"], labelKey: "section_ups_input_voltage", includeDomains: ["sensor"] },
  { field: "robot_bin_entity", types: ["robot"], labelKey: "section_robot_bin", includeDomains: ["binary_sensor", "sensor"],
    when: (c) => robotLayoutOf(c, null) !== "mower" },
  { field: "robot_water_entity", types: ["robot"], labelKey: "section_robot_water", includeDomains: ["binary_sensor", "sensor"],
    when: (c) => robotLayoutOf(c, null) !== "mower" },
  { field: "robot_rain_entity", types: ["robot"], labelKey: "section_robot_rain", includeDomains: ["binary_sensor", "sensor", "switch"],
    when: (c) => robotLayoutOf(c, null) === "mower" },
  { field: "robot_error_entity", types: ["robot"], labelKey: "section_robot_error", includeDomains: ["sensor", "binary_sensor"] },
  { field: "night_mode_entity", types: ["air_purifier", "fan"], labelKey: "pf_night", includeDomains: ["switch", "binary_sensor", "input_boolean"] },
  { field: "heater_entity", types: ["air_purifier", "fan"], labelKey: "section_heater", includeDomains: ["climate", "switch", "select", "binary_sensor"] },

  // Oven + hood
  { field: "light_entity", types: ["oven", "hood", "printer_3d", "fan", "pool_pump", "diffuser", "spa"], labelKey: "section_light", includeDomains: ["light", "switch", "input_boolean", "binary_sensor"] },

  // Cooktop
  { field: "child_lock_entity", types: ["cooktop"], labelKey: "section_child_lock", includeDomains: ["binary_sensor", "switch", "lock"] },

  // Fridge. One option describes both the number of doors and where the
  // freezer sits, because on a real fridge those are the same fact.
  { field: "fridge_temperature_entity", types: ["fridge"], labelKey: "section_fridge_temperature", includeDomains: ["sensor", "number", "input_number"], extra: (c, hass) =>
      c._row("fridge_max_temperature", "fridge_max_temperature", { placeholder: c._config.fridge_layout === "wine" ? "18" : ["chest", "drawers"].includes(c._config.fridge_layout) ? "-12" : "8" })
      + c._row("door_hide_in_list", "temperature_hide_in_list", { type: "checkbox" })
      + c._row("temperature_decimals", "temperature_decimals", {
        type: "select",
        options: [
          { value: "0", label: t(hass, "precision_0") },
          { value: "1", label: t(hass, "precision_1") },
          { value: "auto", label: t(hass, "precision_auto") },
        ],
      }) },
  { field: "freezer_temperature_entity", types: ["fridge"], labelKey: "section_freezer_temperature", includeDomains: ["sensor", "number", "input_number"] },
  { field: "freezer_door_entity", types: ["fridge"], labelKey: "section_freezer_door", includeDomains: ["binary_sensor", "sensor"] },
  { field: "ice_maker_entity", types: ["fridge"], labelKey: "section_ice_maker", includeDomains: ["switch", "binary_sensor", "sensor", "input_boolean"] },
  // The smart plug's switch: off means unplugged, with no half hour to wait.
  { field: "plug_entity", types: ["fridge"], labelKey: "section_plug", includeDomains: ["switch", "binary_sensor", "input_boolean"] },

  // Kettle
  { field: "temperature_entity", types: ["kettle", "water_heater"], labelKey: "section_kettle_temperature", includeDomains: ["sensor", "number", "input_number"], extra: (c, hass) =>
      c._row("temperature_decimals", "temperature_decimals", {
        type: "select",
        options: [
          { value: "0", label: t(hass, "precision_0") },
          { value: "1", label: t(hass, "precision_1") },
          { value: "auto", label: t(hass, "precision_auto") },
        ],
      }) },

  // Water heater: whether it heats, when the state entity cannot say.
  { field: "heating_entity", types: ["water_heater"], labelKey: "section_heating", includeDomains: ["binary_sensor", "sensor", "switch", "input_boolean"] },

  // Boiler
  // The boiler's room thermostat, drawn on the wall beside it.
  { field: "thermostat_entity", types: ["boiler"], labelKey: "section_thermostat", includeDomains: ["climate"],
    extra: (c, hass) => c._row("section_thermostat_layout", "thermostat_layout", {
      type: "select",
      options: [{ value: "", label: t(hass, "type_auto") }].concat(["square", "round", "glass"].map((v) => ({ value: v, label: t(hass, `layout_th_${v}`) }))),
    }) },
  { field: "heating_entity", types: ["boiler", "heat_pump"], labelKey: "section_space_heating", includeDomains: ["binary_sensor", "sensor", "switch", "input_boolean"] },
  { field: "hot_water_entity", types: ["boiler", "heat_pump"], labelKey: "section_hot_water", includeDomains: ["binary_sensor", "sensor", "switch", "input_boolean"] },
  { field: "cooling_entity", types: ["heat_pump"], labelKey: "section_cooling", includeDomains: ["binary_sensor", "sensor", "switch", "input_boolean"] },
  { field: "temperature_entity", types: ["boiler", "heat_pump"], labelKey: "section_flow_temperature", includeDomains: ["sensor", "number", "input_number"], extra: (c, hass) =>
      c._row("temperature_decimals", "temperature_decimals", {
        type: "select",
        options: [
          { value: "0", label: t(hass, "precision_0") },
          { value: "1", label: t(hass, "precision_1") },
          { value: "auto", label: t(hass, "precision_auto") },
        ],
      }) },

  // Heat pump
  { field: "return_temperature_entity", types: ["heat_pump"], labelKey: "section_return_temperature", includeDomains: ["sensor", "number", "input_number"] },
  { field: "outdoor_temperature_entity", types: ["heat_pump", "hrv"], labelKey: "section_outdoor_temperature", includeDomains: ["sensor"] },
  { field: "water_flow_entity", types: ["heat_pump"], labelKey: "section_water_flow", includeDomains: ["sensor"] },
  { field: "compressor_entity", types: ["heat_pump"], labelKey: "section_compressor", includeDomains: ["sensor", "binary_sensor", "switch", "input_boolean"] },
  { field: "fan_speed_entity", types: ["heat_pump"], labelKey: "section_fan_speed", includeDomains: ["sensor", "number"] },
  { field: "heat_output_entity", types: ["heat_pump"], labelKey: "section_heat_output", includeDomains: ["sensor"] },
  { field: "cop_entity", types: ["heat_pump"], labelKey: "section_cop", includeDomains: ["sensor", "input_number"] },
  // What the pump draws and makes while it cools and for the tank, for the
  // integrations that measure each circuit apart.
  { field: "cooling_power_entity", types: ["heat_pump"], labelKey: "section_cooling_power", includeDomains: ["sensor"] },
  { field: "cooling_output_entity", types: ["heat_pump"], labelKey: "section_cooling_output", includeDomains: ["sensor"] },
  { field: "hot_water_power_entity", types: ["heat_pump"], labelKey: "section_hot_water_power", includeDomains: ["sensor"] },
  { field: "hot_water_output_entity", types: ["heat_pump"], labelKey: "section_hot_water_output", includeDomains: ["sensor"] },

  // Pellet stove. The status names the phase; a climate entity in the state
  // already carries the room and the setpoint, so both fields are for the
  // stoves that keep them in entities of their own.
  { field: "phase_entity", types: ["pellet_stove"], labelKey: "section_stove_status", includeDomains: ["sensor", "input_select"] },
  { field: "current_temperature_entity", types: ["pellet_stove"], labelKey: "section_room_temperature", includeDomains: ["sensor"] },
  { field: "target_temperature_entity", types: ["pellet_stove"], labelKey: "section_target_temperature", includeDomains: ["number", "sensor", "input_number"] },
  { field: "power_level_entity", types: ["pellet_stove"], labelKey: "section_power_level", includeDomains: ["number", "sensor", "select", "input_number", "input_select"] },
  { field: "flue_temperature_entity", types: ["pellet_stove"], labelKey: "section_flue_temperature", includeDomains: ["sensor"] },
  { field: "fan_speed_entity", types: ["pellet_stove"], labelKey: "section_fan_speed", includeDomains: ["sensor", "number", "select", "fan", "input_number", "input_select"] },
  { field: "level_entity", types: ["pellet_stove"], labelKey: "section_pellet_level", includeDomains: ["sensor", "binary_sensor", "number", "input_number"], extra: (c) =>
      c._row("level_empty_below", "level_empty_below", { placeholder: "0" })
      + c._row("level_max", "level_max", { placeholder: "100" }) },
  { field: "error_entity", types: ["pellet_stove"], labelKey: "section_error", includeDomains: ["binary_sensor", "sensor"] },

  // Dehumidifier. A humidifier entity carries the humidity and its target;
  // the tank lives apart on most of them.
  { field: "tank_entity", types: ["dehumidifier"], labelKey: "section_tank", includeDomains: ["binary_sensor", "sensor", "number"] },
  { field: "current_humidity_entity", types: ["dehumidifier"], labelKey: "section_current_humidity", includeDomains: ["sensor"] },
  { field: "fan_speed_entity", types: ["dehumidifier"], labelKey: "section_fan_speed", includeDomains: ["select", "fan", "sensor", "input_select"] },
  // Space heater and towel warmer: a climate entity carries the room and the
  // setpoint, these fields are for a plug with a thermometer beside it.
  { field: "current_temperature_entity", types: ["space_heater", "towel_warmer"], labelKey: "section_room_temperature", includeDomains: ["sensor"] },
  { field: "target_temperature_entity", types: ["space_heater", "towel_warmer"], labelKey: "section_target_temperature", includeDomains: ["number", "sensor", "input_number"] },

  // Air conditioner. A climate entity already carries the room, the setpoint,
  // the fan and, on most integrations, the vanes; these fields are for the
  // units that keep them in entities of their own.
  { field: "current_temperature_entity", types: ["air_conditioner"], labelKey: "section_room_temperature", includeDomains: ["sensor"] },
  { field: "target_temperature_entity", types: ["air_conditioner"], labelKey: "section_target_temperature", includeDomains: ["number", "sensor", "input_number"] },
  { field: "fan_speed_entity", types: ["air_conditioner"], labelKey: "section_fan_speed", includeDomains: ["select", "fan", "sensor", "input_select"] },
  { field: "vane_vertical_entity", types: ["air_conditioner"], labelKey: "section_vane_vertical", includeDomains: ["select", "sensor", "input_select"] },
  { field: "vane_horizontal_entity", types: ["air_conditioner"], labelKey: "section_vane_horizontal", includeDomains: ["select", "sensor", "input_select"] },
  { field: "purifier_entity", types: ["air_conditioner"], labelKey: "section_purifier", includeDomains: ["switch", "binary_sensor", "select", "sensor", "input_boolean"] },
  { field: "outdoor_temperature_entity", types: ["air_conditioner"], labelKey: "section_outdoor_temperature", includeDomains: ["sensor"] },
  { field: "defrost_entity", types: ["air_conditioner"], labelKey: "section_defrost", includeDomains: ["binary_sensor", "sensor"] },

  // 3D printer. A target may be a sensor or a number, as the integrations
  // put it; Creality keeps it as an attribute of the reading instead.
  { field: "program_entity", types: ["printer_3d"], labelKey: "section_print_file", includeDomains: ["sensor", "select", "input_select", "input_text"] },
  { field: "phase_entity", types: ["printer_3d"], labelKey: "section_print_stage", includeDomains: ["sensor", "input_select"] },
  { field: "nozzle_temperature_entity", types: ["printer_3d"], labelKey: "section_nozzle_temperature", includeDomains: ["sensor"], extra: (c, hass) =>
      c._row("temperature_decimals", "temperature_decimals", {
        type: "select",
        options: [
          { value: "0", label: t(hass, "precision_0") },
          { value: "1", label: t(hass, "precision_1") },
          { value: "auto", label: t(hass, "precision_auto") },
        ],
      }) },
  { field: "nozzle_target_entity", types: ["printer_3d"], labelKey: "section_nozzle_target", includeDomains: ["sensor", "number", "input_number"] },
  { field: "bed_temperature_entity", types: ["printer_3d"], labelKey: "section_bed_temperature", includeDomains: ["sensor"] },
  { field: "bed_target_entity", types: ["printer_3d"], labelKey: "section_bed_target", includeDomains: ["sensor", "number", "input_number"] },
  { field: "chamber_temperature_entity", types: ["printer_3d"], labelKey: "section_chamber_temperature", includeDomains: ["sensor"] },
  { field: "current_layer_entity", types: ["printer_3d"], labelKey: "section_current_layer", includeDomains: ["sensor", "number"] },
  { field: "total_layers_entity", types: ["printer_3d"], labelKey: "section_total_layers", includeDomains: ["sensor", "number"] },

  // Pet feeder. Everything is optional: one feeder counts portions, grams and
  // its own schedule, the next one counts nothing at all.
  { field: "portions_today_entity", types: ["pet_feeder"], labelKey: "section_portions_today", includeDomains: ["sensor", "counter", "number", "input_number"] },
  { field: "weight_today_entity", types: ["pet_feeder"], labelKey: "section_weight_today", includeDomains: ["sensor"] },
  { field: "serving_size_entity", types: ["pet_feeder"], labelKey: "section_serving_size", includeDomains: ["number", "sensor", "select", "input_number"] },
  { field: "portion_weight_entity", types: ["pet_feeder"], labelKey: "section_portion_weight", includeDomains: ["number", "sensor", "input_number"] },
  { field: "schedule_entity", types: ["pet_feeder"], labelKey: "section_feeder_schedule", includeDomains: ["sensor", "input_text"] },
  { field: "last_feed_entity", types: ["pet_feeder"], labelKey: "section_last_feed", includeDomains: ["sensor", "input_datetime"] },
  { field: "level_entity", types: ["pet_feeder"], labelKey: "section_level", includeDomains: ["sensor", "binary_sensor", "number", "input_number"], extra: (c) =>
      c._row("level_empty_below", "level_empty_below", { placeholder: "0" })
      + c._row("level_max", "level_max", { placeholder: "100" }) },
  { field: "level_b_entity", types: ["pet_feeder"], labelKey: "section_level_b", includeDomains: ["sensor", "binary_sensor", "number", "input_number"],
    when: (c) => c.feeder_layout === "dual_split" },
  { field: "error_entity", types: ["pet_feeder"], labelKey: "section_error", includeDomains: ["binary_sensor", "sensor"] },

  // EV charger. The plug says whether a car is there; the session's energy,
  // the current limit and an error entity are read as they come, and the
  // current limit opens its entity, which is where it is changed.
  { field: "vehicle_entity", types: ["ev_charger"], labelKey: "section_vehicle", includeDomains: ["binary_sensor", "sensor", "input_boolean"] },
  { field: "session_energy_entity", types: ["ev_charger"], labelKey: "section_session_energy", includeDomains: ["sensor", "input_number"] },
  { field: "discharge_power_entity", types: ["ev_charger"], labelKey: "section_discharge_power", includeDomains: ["sensor", "input_number"] },
  { field: "current_limit_entity", types: ["ev_charger"], labelKey: "section_current_limit", includeDomains: ["number", "sensor", "select", "input_number"] },
  { field: "error_entity", types: ["ev_charger"], labelKey: "section_error", includeDomains: ["binary_sensor", "sensor"] },

  // Cooker
  { field: "speed_entity", types: ["cooker"], labelKey: "section_speed", includeDomains: ["sensor", "number", "select", "input_number", "input_select"] },

  // Coffee machine. Each of these is one Home Connect event, exposed as its
  // own binary sensor.
  { field: "water_entity", types: ["coffee"], labelKey: "section_water", includeDomains: ["binary_sensor", "sensor"] },
  { field: "beans_entity", types: ["coffee"], labelKey: "section_beans", includeDomains: ["binary_sensor", "sensor"] },
  { field: "tray_entity", types: ["coffee"], labelKey: "section_tray", includeDomains: ["binary_sensor", "sensor"] },
  { field: "descaling_entity", types: ["coffee"], labelKey: "section_descaling", includeDomains: ["binary_sensor", "sensor"] },
  { field: "cups_entity", types: ["coffee"], labelKey: "section_cups", includeDomains: ["sensor", "number", "select", "binary_sensor", "switch", "input_number", "input_select"] },
  { field: "strength_entity", types: ["coffee"], labelKey: "section_strength", includeDomains: ["select", "sensor", "number", "input_select", "input_number"] },

  // Any type: the on/off control. Named toggle_entity rather than
  // power_switch_entity so it cannot be confused with power_entity below,
  // which is the wattage meter.
  { field: "toggle_entity", types: APPLIANCE_TYPES, labelKey: "section_toggle", includeDomains: ACTION_DOMAINS.concat(["fan"]) },

  // Any type: a plug's power meter, optionally driving the state itself.
  // A charger's threshold says when power flows: it stands in for a missing
  // status and tells a finished charge from a pause. There is no cycle whose
  // end it would have to wait for.
  // The history's sensor and its hours, once the history is on.
  { field: "history_entity", types: APPLIANCE_TYPES, labelKey: "section_history", includeDomains: ["sensor", "number", "input_number"],
    when: (c) => !!c.show_history, extra: (c) => c._row("history_hours", "history_hours", { placeholder: String(HISTORY_HOURS) }) },
  { field: "power_entity", types: APPLIANCE_TYPES, includeDomains: ["sensor"],
    labelKey: (type) => (type === "solar" ? "section_solar_power" : type === "home_battery" ? "section_battery_power" : "section_power"), extra: (c) => {
      const cap = caps(c._currentType());
      // Panels need no threshold; a battery's tells a rest from a charge.
      if (cap.solar) return "";
      if (cap.homeBattery) {
        return c._row("power_on_threshold", "power_on_threshold", { placeholder: String(BATTERY_IDLE_W) })
          + c._row("power_inverted", "power_inverted", { type: "checkbox" });
      }
      if (cap.ups) return "";
      // A fan's speed, read from what it draws.
      const speedRows = cap.fan || cap.airPurifier || cap.fanAppliance
        ? c._row("speed_power_max", "speed_power_max", { placeholder: "" })
          + c._row("speed_power_custom", "speed_power_custom", { type: "checkbox" })
          + (c._config.speed_power_custom
            ? c._row("speed_power_2", "speed_power_2", { placeholder: c._config.speed_power_max > 0 ? String(Math.round(c._config.speed_power_max / 3)) : "" })
              + c._row("speed_power_3", "speed_power_3", { placeholder: c._config.speed_power_max > 0 ? String(Math.round((c._config.speed_power_max * 2) / 3)) : "" })
            : "")
        : "";
      // What a plug alone tells of a washer's steps and a hob's zones.
      const plugRows = ["washer", "dishwasher", "dryer"].includes(c._type)
        ? c._row("step_heat_threshold", "heat_threshold", { placeholder: String(c._type === "dryer" ? DRYER_HEAT_W : WASH_HEAT_W) })
          + (c._type === "washer" ? c._row("step_spin_threshold", "spin_threshold", { placeholder: String(WASH_SPIN_W) }) : "")
        : c._type === "cooktop" ? c._row("zone_power", "zone_power", { placeholder: String(ZONE_POWER_W) }) : "";
      return speedRows + c._row(cap.evCharger ? "ev_power_threshold" : cap.screen ? "screen_standby_threshold" : "power_on_threshold", "power_on_threshold",
        { placeholder: cap.fridgeTemp ? "1" : cap.evCharger ? String(EV_POWER_THRESHOLD) : cap.screen ? String(SCREEN_STANDBY_W) : String(PLUG_THRESHOLDS[c._type] ?? 10) }) + plugRows
        + (cap.fridgeTemp ? c._row("no_power_threshold", "no_power_threshold", { placeholder: "1" }) + c._row("no_power_after", "no_power_after", { placeholder: "30" })
          : cap.evCharger || cap.screen || cap.hairDryer || cap.network || cap.poolPump ? "" : c._row("power_off_delay", "power_off_delay", { placeholder: c._type === "dishwasher" ? String(DW_DRY_MIN) : "0" }));
    } },

  // What it used, and the price of a kWh to tell what that cost (HACF).
  { field: "energy_entity", types: APPLIANCE_TYPES.filter((ty) => ty !== "solar" && ty !== "home_battery"), labelKey: "section_energy", includeDomains: ["sensor"],
    extra: (c) => c._row("energy_price", "energy_price", { placeholder: "0.2516" }) },
  // A computer's tower on a second plug (HACF).
  { field: "tower_entity", types: ["screen"], labelKey: "section_tower", includeDomains: ["switch", "input_boolean", "binary_sensor", "sensor"],
    when: (c) => screenLayoutOf(c) === "computer" },

  // Two sections read as alerts, and only their pickers tell them apart: one
  // entity carrying them in its attributes here, a list of entities of
  // their own next door. The picker says which one this is.
  { field: "alerts_entity", types: APPLIANCE_TYPES, labelKey: "section_alerts", pickerLabelKey: "alerts_entity", includeDomains: ["sensor", "binary_sensor"] },
  { field: "connectivity_entity", types: APPLIANCE_TYPES, labelKey: "section_connectivity", includeDomains: ["binary_sensor", "sensor"], extra: (c, hass) => c._row("connectivity_connected_state", "connectivity_connected_state", { placeholder: "on" }) },
  // The start control is the one an appliance always has in some form, and it
  // is not always a button: a feeder dispenses from a select or from a number.
  { field: "start_entity", types: START_TYPES, labelKey: "section_start", includeDomains: START_DOMAINS, extra: (c, hass) => {
      const d = domainOf(c._config.start_entity);
      if (d === "select" || d === "input_select") {
        const st = c._hass ? stateObj(c._hass, c._config.start_entity) : null;
        const options = (((st && st.attributes) || {}).options || []).filter((o) => String(o).trim() !== "");
        // One option and one only: the card picks it, so there is nothing to ask.
        return options.length > 1
          ? c._row("start_option", "start_option", { type: "select", options: options.map((o) => ({ value: o, label: o })) })
          : "";
      }
      return d === "number" || d === "input_number" ? c._row("start_value", "start_value", {}) : "";
    } },
  { field: "pause_entity", types: CONTROL_TYPES, labelKey: "section_pause", includeDomains: ACTION_DOMAINS },
  { field: "resume_entity", types: CONTROL_TYPES, labelKey: "section_resume", includeDomains: ACTION_DOMAINS },
  { field: "stop_entity", types: CONTROL_TYPES, labelKey: "section_stop", includeDomains: ACTION_DOMAINS },
];

// What a card read from a smart plug leaves out of its editor: what only an
// integration of the appliance reports or drives (its programme, its time
// left, its phase, its buttons, its consumables). A sensor beside the plug,
// a thermometer, a pool's pH, a door contact, stays on offer.
const PLUG_HIDDEN_SECTIONS = new Set(["program_entity", "delay_entity", "remaining_time_entity", "progress_entity", "phase_entity",
  "heating_entity", "basket_entity", "shake_entity", "basket2_state_entity", "power_level_entity", "fan_entity", "boost_entity",
  "filter_life_entity", "filter_reset_entity", "pump_clean_entity", "pump_reset_entity", "pump_running_entity", "air_quality_entity",
  "display_entity", "night_mode_entity", "heater_entity", "pool_mode_entity", "child_lock_entity", "light_entity", "tank_entity",
  "fan_speed_entity", "speed_entity", "water_entity", "beans_entity", "tray_entity", "descaling_entity", "cups_entity", "strength_entity",
  "nozzle_temperature_entity", "nozzle_target_entity", "bed_temperature_entity", "bed_target_entity", "chamber_temperature_entity",
  "current_layer_entity", "total_layers_entity", "connectivity_entity", "alerts_entity", "toggle_entity", "start_entity", "pause_entity", "resume_entity", "stop_entity"]);

// A section can also hang on the rest of the config: the second hopper only
// exists on the model that has one.
function sectionsForType(type, cfg = {}) {
  return SECTIONS.filter((s) => (!s.types || s.types.includes(type)) && (!s.when || s.when(cfg)));
}

function setsEqual(a, b) {
  if (a.size !== b.size) return false;
  for (const v of a) if (!b.has(v)) return false;
  return true;
}

class ApplianceCardEditor extends HTMLElement {
  connectedCallback() {
    if (!this._onLanguage) this._onLanguage = () => { this._needsBuild = true; this._maybeBuild(); };
    onLanguageLoaded(this._onLanguage, true);
  }

  disconnectedCallback() {
    if (this._onLanguage) onLanguageLoaded(this._onLanguage, false);
  }

  _currentType() {
    const st = this._hass && this._config ? stateObj(this._hass, this._config.state_entity) : null;
    return detectApplianceType(this._config || {}, st);
  }

  _sections() {
    const all = sectionsForType(this._currentType(), this._config || {});
    return this._plug() ? all.filter((sec) => !PLUG_HIDDEN_SECTIONS.has(sec.field)) : all;
  }

  // Read from a smart plug: the editor offers the plug, its meter and what
  // a meter tells, and none of an integration's entities.
  _plug() {
    return !!this._config && plugSourceOf(this._config, this._currentType());
  }

  _computeOpen(cfg) {
    return new Set(this._sections().filter((s) => cfg[s.field]).map((s) => s.field));
  }

  setConfig(config) {
    this._config = { ...config };
    const newOpen = this._computeOpen(this._config);
    if (!this._open || !setsEqual(this._open, newOpen)) this._needsBuild = true;
    // Switching appliance type swaps the whole set of visible sections, and
    // that alone does not change which fields are filled in, so the open-set
    // comparison above would miss it.
    const type = this._currentType();
    if (this._type !== type) {
      this._type = type;
      this._needsBuild = true;
    }
    // Nor would it see a section appear or go with the rest of the config,
    // such as the second hopper when the model changes.
    const shown = this._sections().map((s) => s.field).join(",");
    if (this._shown !== shown) {
      this._shown = shown;
      this._needsBuild = true;
    }
    this._open = newOpen;
    if (!this._panelOpen) {
      this._panelOpen = {
        general: true,
        info: (this._config.info_entities || []).length > 0,
        alerts: alertsArray(this._config.alerts_entities).length > 0,
        corners: alertsArray(this._config.corner_entities).length > 0,
        order: (this._config.lines_order || []).length > 0,
        zones: (this._config.zones || []).length > 0,
      };
    }
    if (this._infoCount === undefined) {
      const existing = (this._config.info_entities || []).length;
      this._infoCount = Math.min(INFO_MAX, existing || 3);
    }
    if (this._zoneCount === undefined) {
      this._zoneCount = Math.min(6, (this._config.zones || []).length || 4);
    }
    this._maybeBuild();
  }

  // A freshly created ha-entity-picker announces an empty value before it knows
  // its own, and Home Assistant calls setConfig again after every
  // config-changed we emit. A rebuild can therefore be followed immediately by
  // an empty pick that deletes a configured entity, with nobody having touched
  // anything. The card then reports an entity it can no longer find.
  // So: ignore an echo of the value already held, and never clear a field
  // until the user has actually been in the form.
  _acceptsPick(current, value) {
    const next = value || "";
    const held = current || "";
    if (next === held) return false;
    if (!next && held && !this._touched) return false;
    return true;
  }

  // Any real interaction with the form counts, whichever control it lands on.
  _wireTouchTracking() {
    if (this._touchWired) return;
    this._touchWired = true;
    for (const type of ["focusin", "pointerdown", "keydown"]) {
      this._root.addEventListener(type, () => { this._touched = true; });
    }
  }

  _entityList(field) {
    return alertsArray(this._config[field]).map((e) => (typeof e === "string" ? { entity: e } : { ...e }));
  }

  // An entry is its entity, so it is written back as a plain id unless a
  // label or an icon was set on it by hand. Nothing left, no key left.
  _writeList(field, list) {
    const entries = list.map((e) =>
      (Object.keys(e).some((k) => k !== "entity" && e[k] !== undefined) ? e : e.entity));
    if (entries.length) {
      this._config = { ...this._config, [field]: entries };
    } else {
      this._config = { ...this._config };
      delete this._config[field];
    }
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
  }

  _addToList(panel, entityId) {
    const list = ENTITY_LISTS.find((l) => l.panel === panel);
    const chosen = this._entityList(list.field).filter((e) => e.entity);
    if (chosen.length >= list.max || chosen.some((e) => e.entity === entityId)) return;
    this._writeList(list.field, chosen.concat({ entity: entityId }));
  }

  // The name the card will show, so the list reads like the card.
  _entryName(e) {
    if (e.label) return e.label;
    const hass = this._hass;
    const st = hass.states[e.entity];
    const card = this._config.state_entity && hass.states[this._config.state_entity];
    const cardName = this._config.name || defaultCardName(hass, this._config.state_entity, card);
    return stripDeviceName(hass, st && st.attributes.friendly_name, e.entity, cardName);
  }

  // Any other entity, from any appliance, through a picker of its own.
  _mountListOther(slotEl, list) {
    if (!slotEl) return;
    const picker = document.createElement("ha-entity-picker");
    picker.hass = this._hass;
    picker.value = "";
    picker.label = t(this._l10n, "entity");
    picker.includeDomains = list.domains;
    picker.addEventListener("value-changed", (ev) => {
      if (!ev.detail.value) return;
      this._otherList = "";
      this._addToList(list.panel, ev.detail.value);
      this._build();
    });
    slotEl.appendChild(picker);
  }

  // A list's panel: the menu to add from, then what is chosen, each with a
  // cross to take it out again.
  _listPanel(list) {
    const hass = this._l10n;
    const chosen = this._entityList(list.field).filter((e) => e.entity);
    const options = listCandidates(this._hass, this._config, list)
      .map((id) => ({ id, name: this._entryName({ entity: id }) }))
      .sort((a, b) => a.name.localeCompare(b.name));
    return `
      <details class="group" data-panel="${list.panel}" ${this._panelOpen[list.panel] ? "open" : ""}>
        <summary>${t(hass, list.title)}</summary>
        <div class="section">
          <div class="row">
            <select data-role="${list.panel}-add-select"${chosen.length >= list.max ? " disabled" : ""}>
              <option value="">${esc(t(hass, list.add))}</option>
              ${options.map((o) => `<option value="${esc(o.id)}">${esc(o.name)}</option>`).join("")}
              <option value="${LIST_OTHER}">${esc(t(hass, "list_other"))}</option>
            </select>
          </div>
          ${this._otherList === list.panel ? `<div class="picker-slot" data-slot="__${list.panel}_other"></div>` : ""}
        </div>
        ${chosen.length ? `<div class="section">${chosen.map((e, i) => `
          <div class="list-choice ${list.panel}"><ha-icon icon="${esc(list.icon(this._hass, e))}"></ha-icon><span>${esc(this._entryName(e))}</span><button type="button" class="list-remove" data-${list.panel}-remove="${i}" title="${esc(t(hass, "list_remove"))}" aria-label="${esc(t(hass, "list_remove"))}"><ha-icon icon="mdi:close"></ha-icon></button></div>`).join("")}
        </div>` : ""}
      </details>`;
  }

  _zonesList() {
    return (this._config.zones || []).map((z) => ({ ...z }));
  }

  _updateZone(index, patch) {
    const next = this._zonesList();
    while (next.length <= index) next.push({});
    next[index] = { ...next[index], ...patch };
    this._config = { ...this._config, zones: next };
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
  }

  _mountZonePicker(slotEl, index, field, labelKey, includeDomains) {
    const hass = this._hass;
    const current = this._zonesList()[index] || {};
    const picker = document.createElement("ha-entity-picker");
    picker.hass = hass;
    picker.value = current[field] || "";
    picker.label = `${t(this._l10n, labelKey)} ${index + 1}`;
    picker.includeDomains = includeDomains;
    picker.addEventListener("value-changed", (ev) => {
      const held = (this._zonesList()[index] || {})[field];
      if (!this._acceptsPick(held, ev.detail.value)) return;
      this._updateZone(index, { [field]: ev.detail.value || undefined });
    });
    slotEl.appendChild(picker);
  }

  _mountZoneName(slotEl, index) {
    const hass = this._l10n;
    const current = this._zonesList()[index] || {};
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = t(hass, "zone_name");
    input.value = current.name || "";
    input.addEventListener("change", (ev) => {
      this._updateZone(index, { name: ev.target.value || undefined });
    });
    slotEl.appendChild(input);
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
  // must NOT tear down and recreate <ha-entity-picker> elements, because that closes
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
    const patch = autoSuggest(this._hass, this._config, sectionsForType);
    if (Object.keys(patch).length > 0) {
      this._config = { ...this._config, ...patch };
      const newOpen = this._computeOpen(this._config);
      for (const s of this._sections()) if (patch[s.field]) newOpen.add(s.field);
      this._open = newOpen;
      this._needsBuild = true;
      if (patch.alerts_entities && this._panelOpen) {
        this._panelOpen.alerts = true;
      }
      if (patch.info_entities && this._panelOpen) {
        this._panelOpen.info = true;
        this._infoCount = Math.min(INFO_MAX, Math.max(this._infoCount || 0, patch.info_entities.length));
      }
    }
    this._maybeBuild();
    if (Object.keys(patch).length > 0) {
      this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    }
  }

  _row(labelKey, field, opts) {
    opts = opts || {};
    const hass = this._l10n;
    const value = opts.value !== undefined ? opts.value : this._config[field] || "";
    if (opts.type === "checkbox") {
      return `
        <div class="row row-inline">
          <label><input type="checkbox" data-field="${field}" data-type="checkbox" ${(opts.defaultOn ? this._config[field] !== false : this._config[field]) ? "checked" : ""} /> ${t(hass, labelKey)}</label>
        </div>`;
    }
    if (opts.type === "range") {
      const v = value === "" ? opts.default : value;
      return `
        <div class="row">
          <label>${t(hass, labelKey)} <span class="range-val">${esc(String(v))}</span></label>
          <input type="range" data-field="${field}" data-type="range" min="${opts.min}" max="${opts.max}" step="${opts.step}" value="${esc(String(v))}" />
        </div>`;
    }
    if (opts.type === "select") {
      const option = (o) => `<option value="${esc(o.value)}" ${o.value === value ? "selected" : ""}>${esc(o.label)}</option>`;
      const options = opts.options.map(option).join("")
        + (opts.groups || []).map((g) => `<optgroup label="${esc(g.label)}">${g.options.map(option).join("")}</optgroup>`).join("");
      return `
        <div class="row">
          <label>${t(hass, labelKey)}</label>
          <select data-field="${field}">${options}</select>
        </div>`;
    }
    return `
      <div class="row">
        <label>${t(hass, labelKey)}</label>
        <input type="text" data-field="${field}" value="${esc(value)}" placeholder="${esc(opts.placeholder || "")}" />
      </div>`;
  }

  _mountPicker(slotEl, field, opts) {
    opts = opts || {};
    const hass = this._hass;
    const picker = document.createElement("ha-entity-picker");
    picker.hass = hass;
    picker.value = this._config[field] || "";
    picker.label = opts.label || t(this._l10n, "entity");
    if (opts.includeDomains) picker.includeDomains = opts.includeDomains;
    picker.addEventListener("value-changed", (ev) => {
      const value = ev.detail.value;
      if (!this._acceptsPick(this._config[field], value)) return;
      this._config = { ...this._config };
      if (value) this._config[field] = value;
      else delete this._config[field];
      this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    });
    slotEl.appendChild(picker);
  }

  _infoEntitiesList() {
    return (this._config.info_entities || []).map((e) => (typeof e === "string" ? { entity: e } : { ...e }));
  }

  _updateInfoEntity(index, patch) {
    const next = this._infoEntitiesList();
    while (next.length <= index) next.push({});
    next[index] = { ...next[index], ...patch };
    this._config = { ...this._config, info_entities: next };
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
  }

  _mountInfoPicker(slotEl, index) {
    const hass = this._hass;
    const current = this._infoEntitiesList()[index] || {};
    const picker = document.createElement("ha-entity-picker");
    picker.hass = hass;
    picker.value = current.entity || "";
    picker.label = `${t(this._l10n, "entity")} ${index + 1}`;
    picker.addEventListener("value-changed", (ev) => {
      const held = (this._infoEntitiesList()[index] || {}).entity;
      if (!this._acceptsPick(held, ev.detail.value)) return;
      this._updateInfoEntity(index, { entity: ev.detail.value || undefined });
    });
    slotEl.appendChild(picker);
  }

  _mountInfoLabel(slotEl, index) {
    const hass = this._l10n;
    const current = this._infoEntitiesList()[index] || {};
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = t(hass, "info_label");
    input.value = current.label || "";
    input.addEventListener("change", (ev) => {
      this._updateInfoEntity(index, { label: ev.target.value || undefined });
    });
    slotEl.appendChild(input);
  }

  // state_map is the one value map the card has always accepted in YAML and
  // never offered here. That gap is what sends a Home Connect user looking for
  // a feature request: the option they need already exists, in the one place
  // they never open.
  _mountStateMap(slotEl) {
    if (!slotEl) return;
    const hass = this._l10n;
    const wrap = document.createElement("div");
    const label = document.createElement("label");
    label.textContent = t(hass, "info_value_map");
    const area = document.createElement("textarea");
    area.rows = 3;
    area.placeholder = t(hass, "state_map_placeholder");
    area.value = stringifyValueMap(this._config.state_map);
    // "change" (blur) rather than "input", for the same reason as the info
    // maps: committing per keystroke rewrites the config mid-line.
    area.addEventListener("change", (ev) => {
      const map = parseValueMap(ev.target.value);
      // A fresh object every time: mutating the one already handed out lets an
      // echoed config-changed put the old value back.
      const next = { ...this._config };
      if (map) next.state_map = map;
      else delete next.state_map;
      this._config = next;
      this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    });
    wrap.appendChild(label);
    wrap.appendChild(area);
    slotEl.appendChild(wrap);
  }

  _mountInfoValueMap(slotEl, index) {
    const hass = this._l10n;
    const current = this._infoEntitiesList()[index] || {};
    const wrap = document.createElement("div");
    const label = document.createElement("label");
    label.textContent = t(hass, "info_value_map");
    const area = document.createElement("textarea");
    area.rows = 3;
    area.placeholder = t(hass, "info_value_map_placeholder");
    area.value = stringifyValueMap(current.value_map);
    // "change" (blur) rather than "input": committing per keystroke would
    // rewrite the config mid-line and fight the user while typing.
    area.addEventListener("change", (ev) => {
      this._updateInfoEntity(index, { value_map: parseValueMap(ev.target.value) });
    });
    wrap.appendChild(label);
    wrap.appendChild(area);
    slotEl.appendChild(wrap);
  }

  _mountInfoHideUnit(slotEl, index) {
    if (!slotEl) return;
    const hass = this._l10n;
    const current = this._infoEntitiesList()[index] || {};
    const label = document.createElement("label");
    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = !!current.hide_unit;
    box.addEventListener("change", (ev) => {
      this._updateInfoEntity(index, { hide_unit: ev.target.checked || undefined });
    });
    const text = document.createElement("span");
    text.textContent = " " + t(hass, "info_hide_unit");
    label.appendChild(box);
    label.appendChild(text);
    slotEl.appendChild(label);
  }

  _mountInfoIcon(slotEl, index) {
    const hass = this._l10n;
    const current = this._infoEntitiesList()[index] || {};
    const picker = document.createElement("ha-icon-picker");
    picker.hass = hass;
    picker.value = current.icon || "";
    picker.label = t(hass, "picker_icon");
    picker.addEventListener("value-changed", (ev) => {
      this._updateInfoEntity(index, { icon: ev.detail.value || undefined });
    });
    slotEl.appendChild(picker);
  }

  _reorderInfoEntities(fromIndex, toIndex) {
    if (fromIndex === toIndex) return;
    const list = this._infoEntitiesList();
    while (list.length < this._infoCount) list.push({});
    const [moved] = list.splice(fromIndex, 1);
    list.splice(toIndex, 0, moved);
    this._config = { ...this._config, info_entities: list.filter((e) => e && e.entity) };
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    this._build();
  }

  // The lines the card is drawing right now, in the order it draws them. The
  // editor asks the card rather than keeping a second list that would drift
  // from it: a probe never joins the document, and an inert render neither
  // reads the history nor arms a clock.
  _drawnLines() {
    if (!this._hass || !this._config) return [];
    try {
      const probe = document.createElement("ha-appliance-card");
      probe._inert = true;
      probe.setConfig({ type: "custom:ha-appliance-card", ...this._config });
      probe.hass = this._hass;
      return probe._drawnLines || [];
    } catch (e) {
      return [];
    }
  }

  _reorderLines(fromIndex, toIndex) {
    const keys = this._drawnLines().map((l) => l.key);
    if (fromIndex === toIndex || !keys[fromIndex]) return;
    const [moved] = keys.splice(fromIndex, 1);
    keys.splice(toIndex, 0, moved);
    this._config = { ...this._config, lines_order: keys };
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    this._build();
  }

  _wireInfoDragAndDrop() {
    this._wireDragAndDrop(".info-row[data-drag-index]", "data-drag-index", (from, to) => this._reorderInfoEntities(from, to));
    this._wireDragAndDrop(".info-row[data-line-index]", "data-line-index", (from, to) => this._reorderLines(from, to));
  }

  // One list of rows that can be dragged onto each other, used by the extra
  // info entities and by the order of the lines alike.
  _wireDragAndDrop(selector, attr, onDrop) {
    const rows = this._root.querySelectorAll(selector);
    let dragIndex = null;
    rows.forEach((row) => {
      row.addEventListener("dragstart", (ev) => {
        dragIndex = parseInt(row.getAttribute(attr), 10);
        row.classList.add("dragging");
        ev.dataTransfer.effectAllowed = "move";
      });
      row.addEventListener("dragend", () => {
        row.classList.remove("dragging");
        rows.forEach((r) => r.classList.remove("drag-over"));
      });
      row.addEventListener("dragover", (ev) => {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move";
        row.classList.add("drag-over");
      });
      row.addEventListener("dragleave", () => {
        row.classList.remove("drag-over");
      });
      row.addEventListener("drop", (ev) => {
        ev.preventDefault();
        row.classList.remove("drag-over");
        const dropIndex = parseInt(row.getAttribute(attr), 10);
        if (dragIndex !== null) onDrop(dragIndex, dropIndex);
        dragIndex = null;
      });
    });
  }

  _sectionHtml(section) {
    const hass = this._l10n;
    const open = this._open.has(section.field);
    return `
      <div class="section">
        <label class="row-inline"><input type="checkbox" data-toggle="${section.field}" ${open ? "checked" : ""} /> ${t(hass, typeof section.labelKey === "function" ? section.labelKey(this._type) : section.labelKey)}</label>
        ${open ? `<div class="picker-slot" data-slot="${section.field}"></div>${section.extra ? section.extra(this, hass) : ""}` : ""}
      </div>`;
  }

  // Every label the editor draws goes through here. The helpers below used to
  // read this._hass directly, so the card's language choice reached the option
  // lists built in _build but not the labels sitting beside them.
  get _l10n() {
    return localizedHass(this._hass, this._config);
  }

  _build() {
    if (!this._hass || !this._config) return;
    this._built = true;
    // The editor follows the same choice: picking a language and then reading
    // English labels underneath would be its own kind of confusing.
    const hass = this._l10n;
    // setConfig may have run before hass was available, in which case the
    // detected type could not see the entity's icon yet.
    this._type = this._currentType();
    const drawn = this._drawnLines();

    if (!this._root) {
      this.attachShadow({ mode: "open" });
      this._root = this.shadowRoot;
    }

    this._root.innerHTML = `
      <style>
        :host { font-size: 16px; }
        .section { margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid var(--divider-color, #eee); }
        .section h4 { margin: 12px 0 4px; font-size: 1.05em; color: var(--secondary-text-color, #767676); }
        .row { display: flex; flex-direction: column; margin: 8px 0; }
        .row label { font-size: 0.95em; color: var(--secondary-text-color, #767676); margin-bottom: 4px; }
        .row input, .row select {
          padding: 8px 10px; border-radius: 4px; border: 1px solid var(--divider-color, #ccc);
          background: var(--card-background-color, white); color: var(--primary-text-color, #1c1c1c);
          font-size: 1em; font-family: inherit;
        }
        .row-inline { display: flex; align-items: center; gap: 8px; font-size: 1.05em; color: var(--primary-text-color, #1c1c1c); cursor: pointer; }
        .row-inline input { width: auto; }
        .picker-slot { margin: 6px 0; }
        .picker-slot input[type="text"], .picker-slot textarea {
          width: 100%; padding: 8px 10px; border-radius: 4px; box-sizing: border-box;
          border: 1px solid var(--divider-color, #ccc);
          background: var(--card-background-color, white); color: var(--primary-text-color, #1c1c1c);
          font-size: 1em; font-family: inherit;
        }
        .picker-slot textarea { resize: vertical; min-height: 62px; }
        .picker-slot label {
          display: block; font-size: 0.95em; margin-bottom: 4px;
          color: var(--secondary-text-color, #767676);
        }
        .info-row { display: flex; gap: 8px; align-items: flex-start; }
        .info-row-handle {
          cursor: grab; user-select: none; padding: 6px 4px; margin-top: 2px;
          color: var(--secondary-text-color, #767676); font-size: 1.3em; line-height: 1;
        }
        .info-row-handle:active { cursor: grabbing; }
        .info-row-fields { flex: 1; min-width: 0; }
        .order-line { padding: 7px 0; }
        .list-choice { display: flex; align-items: center; gap: 10px; padding: 6px 2px; color: var(--primary-text-color, #1c1c1c); }
        .list-choice > ha-icon { --mdc-icon-size: 20px; color: var(--secondary-text-color, #767676); flex-shrink: 0; }
        .list-choice.alerts > ha-icon { color: var(--error-color, #f44336); }
        .list-choice span { flex: 1; min-width: 0; }
        .list-remove {
          display: flex; border: none; background: none; padding: 4px; border-radius: 50%; cursor: pointer;
          color: var(--secondary-text-color, #767676);
        }
        .list-remove ha-icon { --mdc-icon-size: 18px; }
        .info-row.dragging { opacity: 0.4; }
        .info-row.drag-over { border-top: 2px solid var(--primary-color, #03a9f4); }
        details.group {
          border: 1px solid var(--divider-color, #eee); border-radius: 8px;
          margin-bottom: 10px; padding: 0 10px;
        }
        details.group summary {
          padding: 10px 0; font-weight: 500; font-size: 1.1em; cursor: pointer;
          color: var(--primary-text-color, #1c1c1c); list-style: none;
        }
        details.group summary::-webkit-details-marker { display: none; }
        details.group summary::before { content: "\u25b8 "; }
        details.group[open] summary::before { content: "\u25be "; }
        details.group .section:last-child { padding-bottom: 10px; }
      </style>
      <div class="section" style="border-bottom:none;">
        ${this._row("name", "name")}
        ${this._row("appliance_type", "appliance_type", {
          type: "select",
          options: [{ value: "auto", label: t(hass, "type_auto") }],
          groups: TYPE_GROUPS.map(([g, types]) => ({
            label: t(hass, `group_${g}`),
            options: types.map((v) => ({ value: v, label: t(hass, `type_${v}`) }))
              .sort((a, b) => a.label.localeCompare(b.label, hass.language || undefined)),
          })),
        })}
        ${PLUG_SOURCE_TYPES.includes(this._type) ? this._row("source", "source", {
          type: "select",
          value: this._plug() ? "plug" : "integration",
          options: [{ value: "plug", label: t(hass, "source_plug") }, { value: "integration", label: t(hass, "source_integration") }],
        }) : ""}
        ${this._type === "washer" && !this._plug() ? this._row("washer_dryer", "washer_dryer", { type: "checkbox" }) : ""}
        ${this._type === "heat_pump" ? this._row("no_hot_water", "no_hot_water", { type: "checkbox" }) : ""}
        ${this._type === "heat_pump" ? this._row("underfloor_heating", "underfloor_heating", { type: "checkbox" }) : ""}
        ${this._type === "fridge" ? this._row("section_fridge_layout", "fridge_layout", {
          type: "select",
          options: [
            { value: "freezer_bottom", label: t(hass, "layout_freezer_bottom") },
            { value: "freezer_top", label: t(hass, "layout_freezer_top") },
            { value: "side_by_side", label: t(hass, "layout_side_by_side") },
            { value: "single", label: t(hass, "layout_single") },
            { value: "wine", label: t(hass, "layout_wine") },
            { value: "chest", label: t(hass, "layout_chest") },
            { value: "drawers", label: t(hass, "layout_drawers") },
          ],
        }) : ""}
        ${this._type === "pet_feeder" ? this._row("section_feeder_layout", "feeder_layout", {
          type: "select",
          options: [
            { value: "tower", label: t(hass, "layout_tower") },
            { value: "canister", label: t(hass, "layout_canister") },
            { value: "double", label: t(hass, "layout_double") },
            { value: "dual_split", label: t(hass, "layout_dual_split") },
            { value: "rotary", label: t(hass, "layout_rotary") },
          ],
        }) : ""}
        ${this._type === "air_fryer" ? this._row("section_fryer_layout", "fryer_layout", {
          type: "select",
          options: [
            { value: "basket", label: t(hass, "layout_basket") },
            { value: "window", label: t(hass, "layout_window") },
            { value: "dual", label: t(hass, "layout_dual") },
          ],
        }) : ""}
        ${this._type === "space_heater" ? this._row("section_heater_layout", "heater_layout", {
          type: "select",
          options: [
            { value: "fan", label: t(hass, "layout_fan_heater") },
            { value: "oil", label: t(hass, "layout_oil_radiator") },
          ],
        }) : ""}
        ${this._type === "thermostat" ? this._row("section_thermostat_layout", "thermostat_layout", {
          type: "select",
          options: [{ value: "", label: t(hass, "type_auto") }].concat(TH_LAYOUTS.map((v) => ({ value: v, label: t(hass, `layout_th_${v}`) }))),
        }) : ""}
        ${this._type === "iron" ? this._row("section_iron_layout", "iron_layout", {
          type: "select",
          options: [
            { value: "iron", label: t(hass, "layout_iron") },
            { value: "generator", label: t(hass, "layout_generator") },
          ],
        }) + this._row("iron_line_color", "iron_line_color", {
          type: "select",
          options: [
            { value: "orange", label: t(hass, "color_orange") },
            { value: "blue", label: t(hass, "color_blue") },
            { value: "body", label: t(hass, "color_body") },
          ],
        }) + this._row("left_on_after", "left_on_after", { placeholder: "30" }) : ""}
        ${this._type === "toaster" ? this._row("section_toaster_layout", "toaster_layout", {
          type: "select",
          options: [
            { value: "two", label: t(hass, "layout_toaster_two") },
            { value: "four", label: t(hass, "layout_toaster_four") },
            { value: "long", label: t(hass, "layout_toaster_long") },
          ],
        }) : ""}
        ${["coffee", "boiler", "towel_warmer"].includes(this._type) ? this._row("section_screen_layout", `${this._type}_layout`, {
          type: "select",
          options: ({ coffee: ["silver", "black"], boiler: ["wall", "window"], towel_warmer: ["ladder", "panel"] })[this._type]
            .map((v) => ({ value: v, label: t(hass, `layout_${this._type}_${v}`) })),
        }) : ""}
        ${this._type === "kettle" ? this._row("section_screen_layout", "kettle_layout", {
          type: "select",
          options: [
            { value: "classic", label: t(hass, "layout_kettle_classic") },
            { value: "steel", label: t(hass, "layout_kettle_steel") },
          ],
        }) : ""}
        ${this._type === "hair_dryer" ? this._row("section_screen_layout", "hair_dryer_layout", {
          type: "select",
          options: [
            { value: "pistol", label: t(hass, "layout_hd_pistol") },
            { value: "ring", label: t(hass, "layout_hd_ring") },
          ],
        }) + this._row("hd_heat_threshold", "heat_threshold", { placeholder: String(HD_HEAT_W) }) : ""}
        ${this._type === "network" ? (() => {
          const layout = netLayoutOf(this._config, stateObj(hass, this._config.state_entity));
          return this._row("section_screen_layout", "network_layout", {
            type: "select",
            options: [{ value: "auto", label: t(hass, "unit_auto") }].concat(NET_LAYOUTS.map((v) => ({ value: v, label: t(hass, `layout_net_${v}`) }))),
          }) + (layout === "switch" ? this._row("net_ports_count", "switch_ports", {
            type: "select",
            options: [{ value: "auto", label: t(hass, "unit_auto") }].concat(SWITCH_PORTS.map((v) => ({ value: String(v), label: String(v) }))),
          }) : "") + (layout === "nas" ? this._row("net_bays", "bays", {
            type: "select",
            options: [{ value: "auto", label: t(hass, "unit_auto") }].concat(NET_BAYS.map((v) => ({ value: String(v), label: String(v) }))),
          }) : "");
        })() : ""}
        ${this._type === "diffuser" ? this._row("section_screen_layout", "diffuser_layout", {
          type: "select",
          options: [{ value: "auto", label: t(hass, "unit_auto") }].concat(DIFFUSER_LAYOUTS.map((v) => ({ value: v, label: t(hass, `layout_dif_${v}`) }))),
        }) : ""}
        ${this._type === "hrv" ? this._row("section_screen_layout", "hrv_layout", {
          type: "select",
          options: [{ value: "auto", label: t(hass, "unit_auto") }].concat(HRV_LAYOUTS.map((v) => ({ value: v, label: t(hass, `layout_hrv_${v}`) }))),
        }) : ""}
        ${this._type === "camera" ? this._row("section_screen_layout", "camera_layout", {
          type: "select",
          options: [{ value: "auto", label: t(hass, "unit_auto") }].concat(CAMERA_LAYOUTS.map((v) => ({ value: v, label: t(hass, `layout_cam_${v}`) }))),
        }) : ""}
        ${this._type === "mailbox" ? this._row("section_screen_layout", "mailbox_layout", {
          type: "select",
          options: [{ value: "auto", label: t(hass, "unit_auto") }].concat(MAILBOX_LAYOUTS.map((v) => ({ value: v, label: t(hass, `layout_mb_${v}`) }))),
        }) + (mailboxLayoutOf(this._config) === "through" ? this._row("mb_front_side", "mailbox_front", {
          type: "select",
          options: MAILBOX_SIDES.map((v) => ({ value: v, label: t(hass, `mb_side_${v}`) })),
        }) : "") : ""}
        ${this._type === "water_pump" ? this._row("section_screen_layout", "pump_layout", {
          type: "select",
          options: [{ value: "auto", label: t(hass, "unit_auto") }].concat(PUMP_LAYOUTS.map((v) => ({ value: v, label: t(hass, `layout_pump_${v}`) }))),
        }) : ""}
        ${this._type === "floor_heating" ? this._row("section_screen_layout", "floor_layout", {
          type: "select",
          options: FLOOR_LAYOUTS.map((v) => ({ value: v, label: t(hass, `layout_floor_${v}`) })),
        }) : ""}
        ${this._type === "meter" ? this._row("high_power", "high_power", { placeholder: "3000" }) : ""}
        ${this._type === "christmas_tree" ? this._row("tree_palette", "tree_palette", {
          type: "select",
          options: Object.keys(TREE_PALETTES).map((v) => ({ value: v, label: t(hass, `palette_${v}`) })),
        }) + this._row("presents", "presents", {
          type: "select",
          options: TREE_PRESENTS.map((v) => ({ value: v, label: t(hass, `presents_${v}`) })),
        }) : ""}
        ${this._type === "lamp" ? this._row("section_screen_layout", "lamp_layout", {
          type: "select",
          options: [{ value: "auto", label: t(hass, "unit_auto") }].concat(LAMP_LAYOUTS.map((v) => ({ value: v, label: t(hass, `layout_lamp_${v}`) }))),
        }) + (lampLayoutOf(this._config, stateObj(hass, this._config.state_entity)) === "spot" ? this._row("lamp_spots", "spots", {
          type: "select",
          options: [{ value: "auto", label: t(hass, "unit_auto") }].concat(LAMP_SPOTS.map((v) => ({ value: String(v), label: String(v) }))),
        }) : "") : ""}
        ${this._type === "robot" ? (() => {
          const layout = robotLayoutOf(this._config, stateObj(hass, this._config.state_entity));
          return this._row("section_screen_layout", "robot_layout", {
            type: "select",
            options: [{ value: "auto", label: t(hass, "unit_auto") }].concat(ROBOT_LAYOUTS.map((v) => ({ value: v, label: t(hass, `layout_robot_${v}`) }))),
          }) + (layout === "mower" ? this._row("robot_shelter", "robot_shelter", { type: "checkbox" })
              + (this._config.robot_shelter ? this._row("robot_shelter_style", "robot_shelter_style", {
                type: "select",
                options: SHELTER_STYLES.map((v) => ({ value: v, label: t(hass, `shelter_${v}`) })),
              }) + (this._config.robot_shelter_style === "shell" ? this._row("robot_shelter_color", "robot_shelter_color", {
                type: "select",
                options: Object.keys(SHELTER_COLORS).map((v) => ({ value: v, label: t(hass, `color_${v}`) })),
              }) : "") : "")
            : layout === "stick" || layout === "floor_washer"
              ? this._row("stick_away_threshold", "away_threshold", { placeholder: String(STICK_AWAY_W) })
            : this._row("section_robot_station", "robot_station", {
              type: "select",
              options: ROBOT_STATIONS.map((v) => ({ value: v, label: t(hass, `robot_station_${v}`) })),
            }) + this._row("section_robot_floor", "robot_floor", {
              type: "select",
              options: [{ value: "auto", label: t(hass, "unit_auto") }].concat(ROBOT_FLOORS.map((v) => ({ value: v, label: t(hass, `floor_${v}`) }))),
            }))
            + (ROBOT_SERVICES[domainOf(this._config.state_entity)] ? this._row("robot_controls", "robot_controls", { type: "checkbox" }) : "")
            + this._row("battery_corner", "battery_corner", { type: "checkbox" });
        })() : ""}
        ${this._type === "solar" ? this._row("section_solar_layout", "solar_layout", {
          type: "select",
          options: SOLAR_LAYOUTS.map((v) => ({ value: v, label: t(hass, `layout_solar_${v}`) })),
        }) + this._row("solar_peak_power", "peak_power", { placeholder: "1000" }) : ""}
        ${this._type === "home_battery" ? this._row("section_screen_layout", "battery_layout", {
          type: "select",
          options: [{ value: "auto", label: t(hass, "unit_auto") }].concat(BATTERY_LAYOUTS.map((v) => ({ value: v, label: t(hass, `layout_battery_${v}`) }))),
        }) + this._row("battery_capacity", "battery_capacity", { placeholder: "5" }) : ""}
        ${this._type === "air_purifier" ? this._row("section_purifier_layout", "purifier_layout", {
          type: "select",
          options: [
            { value: "cylinder", label: t(hass, "layout_purifier_cylinder") },
            { value: "box", label: t(hass, "layout_purifier_box") },
            { value: "ring", label: t(hass, "layout_purifier_ring") },
          ],
        }) : ""}
        ${this._type === "fan" ? this._row("section_fan_layout", "fan_layout", {
          type: "select",
          options: [
            { value: "stand", label: t(hass, "layout_fan_stand") },
            { value: "table", label: t(hass, "layout_fan_table") },
            { value: "ceiling", label: t(hass, "layout_fan_ceiling") },
          ],
        }) + (this._config.fan_layout === "ceiling"
          ? this._row("fan_direction_inverted", "fan_direction_inverted", { type: "checkbox" }) + this._row("fan_wood_blades", "wood_blades", { type: "checkbox" })
          : this._row("oscillating", "oscillating", { type: "checkbox" })) : ""}
        ${this._type === "screen" ? this._row("section_screen_layout", "screen_layout", {
          type: "select",
          options: SCREEN_LAYOUTS.map((v) => ({ value: v, label: t(hass, `layout_${v}`) })),
        }) + this._row("section_screen_image", "screen_image", {
          type: "select",
          options: ["random"].concat(SCREEN_IMAGES).map((v) => ({ value: v, label: t(hass, `img_${v}`) })),
        }) : ""}
        ${this._type === "printer_3d" ? this._row("section_printer_layout", "printer_layout", {
          type: "select",
          options: [
            { value: "enclosed", label: t(hass, "layout_enclosed") },
            { value: "open", label: t(hass, "layout_open") },
          ],
        }) : ""}
        ${this._type === "printer_3d" ? this._row("section_printed_part", "printed_part", {
          type: "select",
          options: [
            { value: "cube", label: t(hass, "part_cube") },
            { value: "pyramid", label: t(hass, "part_pyramid") },
            { value: "duck", label: t(hass, "part_duck") },
          ],
        }) : ""}
      </div>
      <details class="group" data-panel="general" ${this._panelOpen.general ? "open" : ""}>
        <summary>${t(hass, "group_general")}</summary>
        <div class="section">
          ${this._row("language", "language", {
            type: "select",
            options: [{ value: "auto", label: t(hass, "language_auto") }].concat(
              Object.keys(LANGUAGE_NAMES).map((code) => ({ value: code, label: LANGUAGE_NAMES[code] }))
            ),
          })}
          ${CYCLE_TYPES.includes(this._type) ? this._row("done_alert", "done_alert", { type: "checkbox" }) : ""}
          ${this._row("state_show_raw", "state_show_raw", { type: "checkbox" })}
          ${caps(this._type).readOnly && !this._config.toggle_entity ? "" : this._row("controls_activation", "controls_activation", {
            type: "select",
            value: activationOf(this._config.controls_activation),
            options: ["tap", "confirm", "hold", "off"].map((v) => ({ value: v, label: t(hass, `activation_${v}`) })),
          })}
          ${caps(this._type).cycle ? this._row("controls_always", "controls_always", { type: "checkbox" }) : ""}
          ${caps(this._type).readOnly && !this._config.toggle_entity ? "" : this._row("show_unavailable_controls", "show_unavailable_controls", { type: "checkbox" })}
          ${LAST_CYCLE_TYPES.includes(this._type) ? this._row("show_last_cycle", "show_last_cycle", { type: "checkbox" }) : ""}
          ${LAST_CYCLE_TYPES.includes(this._type) ? this._row("show_elapsed", "show_elapsed", { type: "checkbox" }) : ""}
          ${["solar", "home_battery"].includes(this._type) ? "" : this._row("show_today", "show_today", { type: "checkbox" })}
          ${this._row("show_history", "show_history", { type: "checkbox" })}
        </div>
        <div class="section">
          <div class="picker-slot" data-slot="state_entity"></div>
          ${this._plug() ? "" : `<div class="picker-slot" data-slot="__state_map"></div>`}
        </div>
        ${this._sections().map((s) => this._sectionHtml(s)).join("")}
      </details>
      <details class="group" data-panel="appearance" ${this._panelOpen.appearance ? "open" : ""}>
        <summary>${t(hass, "group_appearance")}</summary>
        <div class="section">
          ${this._row("illustration_color", "illustration_color", {
            type: "select",
            options: [{ value: "auto", label: t(hass, "color_auto") }].concat(
              Object.keys(BODY_COLORS).map((k) => ({ value: k, label: t(hass, `color_${k}`) }))
            ),
          })}
          ${this._row("compact_mode", "compact", {
            type: "select",
            value: compactModeOf(this._config.compact) || "off",
            options: [
              { value: "off", label: t(hass, "compact_off") },
              { value: "hide", label: t(hass, "compact_hide") },
              { value: "side", label: t(hass, "compact_side") },
            ],
          })}
          ${this._row("illustration_size", "illustration_size", {
            type: "range", min: 0.3, max: 1.2, step: 0.05, default: 1,
            value: this._config.illustration_size === undefined ? "" : illustrationSizeOf(this._config.illustration_size),
          })}
          ${this._row("font_scale", "font_scale", {
            type: "range", min: 0.7, max: 1.4, step: 0.05, default: 1,
            value: this._config.font_scale === undefined ? "" : fontScaleOf(this._config.font_scale),
          })}
          ${this._row("show_name", "show_name", { type: "checkbox", defaultOn: true })}
          ${this._row("show_state", "show_state", { type: "checkbox", defaultOn: true })}
          ${this._row("transparent", "transparent", { type: "checkbox" })}
          ${this._row("fill_height", "fill_height", { type: "checkbox" })}
          ${this._row("illustration_frame", "illustration_frame", { type: "checkbox" })}
        </div>
      </details>
      ${caps(this._type).zones && !this._plug() ? `
      <details class="group" data-panel="zones" ${this._panelOpen.zones ? "open" : ""}>
        <summary>${t(hass, "section_zones")}</summary>
        <div class="section">
          <div class="row">
            <label>${t(hass, "zones_count")}</label>
            <select data-role="zone-count-select">
              ${[0, 1, 2, 3, 4, 5, 6].map((n) => `<option value="${n}" ${n === this._zoneCount ? "selected" : ""}>${n}</option>`).join("")}
            </select>
          </div>
        </div>
        ${Array.from({ length: this._zoneCount }, (_, i) => `
          <div class="section">
            <h4>${t(hass, "zone")} ${i + 1}</h4>
            <div class="picker-slot" data-slot="__zone_level_${i}"></div>
            <div class="picker-slot" data-slot="__zone_residual_${i}"></div>
            <div class="picker-slot" data-slot="__zone_name_${i}"></div>
          </div>`).join("")}
      </details>` : ""}
      <details class="group" data-panel="info" ${this._panelOpen.info ? "open" : ""}>
        <summary>${t(hass, "section_info")}</summary>
        <div class="section">
          <div class="row">
            <label>${t(hass, "info_count")}</label>
            <select data-role="info-count-select">
              ${Array.from({ length: INFO_MAX + 1 }, (_, n) => n).map((n) => `<option value="${n}" ${n === this._infoCount ? "selected" : ""}>${n}</option>`).join("")}
            </select>
          </div>
        </div>
        ${Array.from({ length: this._infoCount }, (_, i) => `
          <div class="section info-row" draggable="true" data-drag-index="${i}">
            <div class="info-row-handle" title="${t(hass, "info_drag")}">\u283f</div>
            <div class="info-row-fields">
              <div class="picker-slot" data-slot="__info_${i}"></div>
              <div class="picker-slot" data-slot="__info_icon_${i}"></div>
              <div class="picker-slot" data-slot="__info_label_${i}"></div>
              <div class="picker-slot" data-slot="__info_valuemap_${i}"></div>
              <div class="picker-slot" data-slot="__info_hideunit_${i}"></div>
            </div>
          </div>`).join("")}
      </details>
      ${ENTITY_LISTS.filter((list) => !this._plug() || list.panel !== "alerts").map((list) => this._listPanel(list)).join("")}
      ${drawn.length > 1 ? `
      <details class="group" data-panel="order" ${this._panelOpen.order ? "open" : ""}>
        <summary>${t(hass, "section_lines_order")}</summary>
        ${drawn.map((l, i) => `
          <div class="section info-row" draggable="true" data-line-index="${i}">
            <div class="info-row-handle" title="${t(hass, "info_drag")}">\u283f</div>
            <div class="info-row-fields"><div class="order-line">${esc(l.label)}</div></div>
          </div>`).join("")}
      </details>` : ""}
    `;

    this._wireTouchTracking();
    if (!this._plug()) this._mountStateMap(this._root.querySelector('[data-slot="__state_map"]'));
    if (this._plug()) this._mountPicker(this._root.querySelector('[data-slot="state_entity"]'), "state_entity", {
      label: t(hass, "plug_switch"), includeDomains: ["switch", "input_boolean"],
    });
    else this._mountPicker(this._root.querySelector('[data-slot="state_entity"]'), "state_entity", {
      label: t(hass, !this._config.state_entity && stateFreeSource(this._config) ? "state_entity_optional" : "state_entity"),
      // Until a type is chosen the card guesses it from the entity, so the
      // list offers every domain a type can live on: limited to sensors, a
      // purifier's fan entity could never be picked to begin with.
      includeDomains: ["sensor", "binary_sensor"].concat(this._config.appliance_type
        ? STATE_DOMAINS[this._type] || []
        : [...new Set(Object.values(STATE_DOMAINS).flat())]),
    });
    for (const s of this._sections()) {
      if (this._open.has(s.field)) {
        this._mountPicker(this._root.querySelector(`[data-slot="${s.field}"]`), s.field,
          { includeDomains: s.includeDomains, label: s.pickerLabelKey ? t(hass, s.pickerLabelKey) : undefined });
      }
    }
    if (caps(this._type).zones && !this._plug()) {
      for (let i = 0; i < this._zoneCount; i++) {
        this._mountZonePicker(this._root.querySelector(`[data-slot="__zone_level_${i}"]`), i, "level_entity", "zone_level_entity", ["sensor", "number", "select", "input_number", "input_select"]);
        this._mountZonePicker(this._root.querySelector(`[data-slot="__zone_residual_${i}"]`), i, "residual_heat_entity", "zone_residual_entity", ["binary_sensor", "sensor"]);
        this._mountZoneName(this._root.querySelector(`[data-slot="__zone_name_${i}"]`), i);
      }
      const zoneCountSelect = this._root.querySelector('[data-role="zone-count-select"]');
      if (zoneCountSelect) {
        zoneCountSelect.addEventListener("change", (ev) => {
          const count = parseInt(ev.target.value, 10);
          this._zoneCount = count;
          this._config = { ...this._config, zones: this._zonesList().slice(0, count) };
          this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
          this._build();
        });
      }
    }
    for (let i = 0; i < this._infoCount; i++) {
      this._mountInfoPicker(this._root.querySelector(`[data-slot="__info_${i}"]`), i);
      this._mountInfoIcon(this._root.querySelector(`[data-slot="__info_icon_${i}"]`), i);
      this._mountInfoLabel(this._root.querySelector(`[data-slot="__info_label_${i}"]`), i);
      this._mountInfoValueMap(this._root.querySelector(`[data-slot="__info_valuemap_${i}"]`), i);
      this._mountInfoHideUnit(this._root.querySelector(`[data-slot="__info_hideunit_${i}"]`), i);
    }
    this._wireInfoDragAndDrop();

    for (const list of ENTITY_LISTS) {
      const select = this._root.querySelector(`[data-role="${list.panel}-add-select"]`);
      if (select) {
        select.addEventListener("change", (ev) => {
          const value = ev.target.value;
          if (!value) return;
          if (value === LIST_OTHER) this._otherList = list.panel;
          else this._addToList(list.panel, value);
          this._build();
        });
      }
      if (this._otherList === list.panel) {
        this._mountListOther(this._root.querySelector(`[data-slot="__${list.panel}_other"]`), list);
      }
      this._root.querySelectorAll(`[data-${list.panel}-remove]`).forEach((el) => {
        el.addEventListener("click", () => {
          const next = this._entityList(list.field).filter((e) => e.entity);
          next.splice(parseInt(el.getAttribute(`data-${list.panel}-remove`), 10), 1);
          this._writeList(list.field, next);
          this._build();
        });
      });
    }

    const infoCountSelect = this._root.querySelector('[data-role="info-count-select"]');
    if (infoCountSelect) {
      infoCountSelect.addEventListener("change", (ev) => {
        const count = parseInt(ev.target.value, 10);
        this._infoCount = count;
        const list = (this._config.info_entities || []).map((e) => (typeof e === "string" ? { entity: e } : e));
        this._config = { ...this._config, info_entities: list.slice(0, count).filter((e) => e && e.entity) };
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
        this._build();
      });
    }

    this._root.querySelectorAll("details.group").forEach((el) => {
      el.addEventListener("toggle", () => {
        this._panelOpen[el.getAttribute("data-panel")] = el.open;
      });
    });

    this._root.querySelectorAll('input[data-type="range"]').forEach((el) => {
      el.addEventListener("input", () => {
        const out = el.parentElement && el.parentElement.querySelector(".range-val");
        if (out) out.textContent = String((el.getAttribute("data-field") === "font_scale" ? fontScaleOf : illustrationSizeOf)(el.value));
      });
    });

    this._root.querySelectorAll("[data-field]").forEach((el) => {
      el.addEventListener("change", (ev) => {
        const field = ev.target.getAttribute("data-field");
        const value = ev.target.getAttribute("data-type") === "checkbox" ? ev.target.checked : ev.target.value;
        this._config = { ...this._config, [field]: value };
        // A size of 1 is the default and is not written.
        if (field === "illustration_size") {
          const n = illustrationSizeOf(value);
          if (n === 1) delete this._config.illustration_size;
          else this._config.illustration_size = n;
        }
        if (field === "font_scale") {
          const n = fontScaleOf(value);
          if (n === 1) delete this._config.font_scale;
          else this._config.font_scale = n;
        }
        // Custom speed steps that are switched off go with their values.
        if (field === "speed_power_custom" && !value) {
          delete this._config.speed_power_custom;
          delete this._config.speed_power_2;
          delete this._config.speed_power_3;
        }
        // Shown is the default and is not written: only false is.
        if ((field === "show_name" || field === "show_state") && value) delete this._config[field];
        // Compact is written the way it always was: true for the card without
        // its drawing, nothing at all when it is off.
        if (field === "compact") {
          if (value === "side") this._config.compact = "side";
          else if (value === "hide") this._config.compact = true;
          else delete this._config.compact;
        }
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
          delete this._config[field];
          if (field === "door_entity") {
            delete this._config.door_open_state;
            delete this._config.door_invert;
            delete this._config.door_hide_in_list;
          }
          if (field === "fridge_temperature_entity") {
            delete this._config.fridge_max_temperature;
            delete this._config.temperature_hide_in_list;
            delete this._config.temperature_decimals;
          }
          if (field === "temperature_entity") delete this._config.temperature_decimals;
          if (field === "connectivity_entity") delete this._config.connectivity_connected_state;
          if (field === "power_entity") {
            delete this._config.power_on_threshold;
            delete this._config.no_power_after;
            delete this._config.no_power_threshold;
            delete this._config.power_off_delay;
          }
          this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
        }
        this._build();
      });
    });
  }
}


if (!customElements.get("ha-appliance-card-editor")) customElements.define("ha-appliance-card-editor", ApplianceCardEditor);
}
