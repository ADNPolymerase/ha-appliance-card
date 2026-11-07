// Built by tools/build.mjs from the files of src/: edit those, not this file.
const CARD_VERSION = "4.15.1";

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
    program: "Program", remaining: "remaining", ready_at: "ready at", time_done: "Done",
    door_open: "Door open", door_closed: "Door closed", alerts: "Alerts",
    alerts_n_one: "{n} alert", alerts_n_few: "{n} alerts", alerts_n_many: "{n} alerts", alerts_n_other: "{n} alerts",
    connected: "Connected", disconnected: "Disconnected",
    start: "Start", pause: "Pause", resume: "Resume", stop: "Stop",
    name: "Name", icon: "Icon", entity: "Entity",
    main_settings: "Main entities", display_settings: "Display",
    action_settings: "Controls",
    group_general: "General settings",
    compact: "Compact mode (hide icon)",
    state_show_raw: "Always show the entity's raw text instead of the translated label",
    appliance_type: "Appliance type",
    type_auto: "Auto-detect", type_washer: "Washer", type_dryer: "Dryer", type_dishwasher: "Dishwasher",
    state_entity: "State entity (required)",
    program_entity: "Program entity",
    program_format: "Program name format",
    program_format_raw: "Raw", program_format_clean: "Cleaned up",
    remaining_time_entity: "Remaining time entity",
    remaining_time_unit: "Remaining time unit",
    remaining_time_hide_when_idle: "Hide remaining time unless running",
    remaining_time_split: "Show the end time on its own line",
    unit_auto: "Auto-detect", unit_seconds: "Seconds", unit_minutes: "Minutes",
    progress_entity: "Progress % entity (optional override)",
    door_entity: "Door sensor entity",
    door_open_state: "\"Open\" state value",
    door_invert: "Invert (state means closed, not open)",
    door_hide_in_list: "Don't show in the info list",
    alerts_entity: "Alerts entity (attributes-style)",
    info_entities: "Extra info entities (comma-separated entity IDs)",
    connectivity_entity: "Connectivity entity",
    connectivity_connected_state: "\"Connected\" state value",
    start_entity: "Start button entity",
    pause_entity: "Pause button entity",
    resume_entity: "Resume button entity",
    stop_entity: "Stop / reset button entity",
    section_program: "Program", type_filament_dryer: "Filament dryer", fd_drying: "Drying", section_spool_count: "Spools", section_printer_style: "Printer model", printer_style_classic: "Simple drawing", printer_style_bambu_x: "Enclosed, Bambu P1S / X1 style", printer_style_elegoo_c: "Enclosed, Elegoo Centauri style", printer_style_bambu_a: "Open, Bambu A1 style", printer_style_elegoo_n: "Open, Elegoo Neptune style", ams_box: "Filament box", ams_spool: "Spool", section_ams_list: "Spools in the box", ams_add: "Add a spool", section_ams_position: "Box position", ams_position_side: "Beside the printer", ams_position_top: "On top of the printer", section_active_program: "Running program", section_remaining: "Remaining time",
    section_ready_at: "Ready at",
    section_progress: "Progress % (override)", section_door: "Door sensor",
    section_alerts: "Alerts", section_connectivity: "Connectivity",
    section_info: "Extra info entities", section_lines_order: "Line order",
    info_count: "Number of extra entities",
    section_alert_list: "Alert entities", alerts_add: "Add an alert\u2026", list_other: "Other entity\u2026", list_remove: "Remove",
    section_corner_list: "Corner switches", corners_add: "Add a switch\u2026",
    info_label: "Display name (optional)",
    info_value_map: "Value mapping (optional)",
    info_value_map_placeholder: "One per line, e.g.\n0: Ready\n1: Washing",
    info_hide_unit: "Hide unit",
    state_map_placeholder: "One per line, e.g.\nReady: idle\nAborting: running\n*: running",
    info_drag: "Drag to reorder",
    section_start: "Start button", section_pause: "Pause button",
    section_resume: "Resume button", section_stop: "Stop / reset button",
    picker_icon: "Icon (optional)",
    type_oven: "Oven", type_microwave: "Microwave",
    type_hood: "Cooker hood", type_cooktop: "Cooktop",
    preheating: "Preheating", standby: "Standby",
    temperature: "Temperature", fan_speed: "Fan speed",
    filter: "Filter", power: "Power",
    power_level: "Power level", child_lock: "Child lock",
    residual_heat: "Residual heat", boost: "Boost",
    light: "Light", filter_reset: "Reset filter",
    zone: "Zone", zones_active: "active zones",
    section_target_temperature: "Target temperature", section_current_temperature: "Current temperature",
    section_light: "Light", section_heating: "Heating indicator",
    section_power_level: "Power level", section_fan: "Fan",
    section_filter_life: "Filter life", section_filter_reset: "Reset filter button",
    section_boost: "Boost mode", section_child_lock: "Child lock",
    section_power: "Power consumption", section_zones: "Cooking zones",
    target_temperature_entity: "Target temperature entity", current_temperature_entity: "Current temperature entity",
    light_entity: "Light entity", heating_entity: "Heating entity (optional)",
    power_level_entity: "Power level entity", fan_entity: "Fan entity",
    filter_life_entity: "Filter life % entity", filter_reset_entity: "Reset filter button entity",
    boost_entity: "Boost mode entity", child_lock_entity: "Child lock entity",
    power_entity: "Power (W) entity", power_on_threshold: "Running above this power (W)",
    zones_count: "Number of cooking zones", zone_level_entity: "Level entity",
    section_toggle: "Power switch", toggle: "Power",
    off_short: "Off", toggle_entity: "Power switch entity",
    zone_residual_entity: "Residual heat entity", zone_name: "Zone name (optional)",
    type_fridge: "Fridge", type_kettle: "Kettle",
    fridge_ok: "Normal", temp_high: "Temperature high",
    unplugged: "Unplugged", no_power: "No power draw", section_plug: "Plug switch", no_power_after: "Warn after (minutes without power draw)", temperature_decimals: "Temperature precision", precision_auto: "Like the entity", precision_0: "Whole degree", precision_1: "One decimal", kettle_heating: "Heating",
    kettle_off: "Off", layout_kettle_classic: "Classic", layout_kettle_steel: "Stainless steel", layout_coffee_silver: "Silver", layout_coffee_black: "Black and chrome", layout_boiler_wall: "Wall boiler", layout_boiler_window: "Burner window", layout_towel_warmer_ladder: "Ladder", layout_towel_warmer_panel: "Flat panels", fridge_compartment: "Fridge",
    freezer_compartment: "Freezer", ice_maker: "Ice maker",
    since: "for", section_fridge_layout: "Layout",
    layout_single: "One door", layout_freezer_bottom: "Freezer at the bottom",
    layout_freezer_top: "Freezer on top", layout_side_by_side: "Side by side", layout_wine: "Glass door (wine cooler)",
    section_fridge_temperature: "Fridge temperature", section_freezer_temperature: "Freezer temperature",
    section_freezer_door: "Freezer door sensor", section_ice_maker: "Ice maker",
    fridge_max_temperature: "Warn above this temperature", section_kettle_temperature: "Water temperature",
    ice_on: "Running", ice_off: "Off", doors_closed: "Doors closed",
    fridge_door_open: "Fridge door open", freezer_door_open: "Freezer door open",
    type_cooker: "Cooker", type_coffee: "Coffee machine",
    water_empty: "Water tank empty", beans_empty: "Bean container empty",
    tray_full: "Drip tray full", descale: "Descaling due",
    speed: "Speed", section_speed: "Mixing speed",
    section_water: "Water tank", section_beans: "Bean container",
    section_tray: "Drip tray", section_descaling: "Descaling",
    cups: "Cups", strength: "Strength",
    section_cups: "Number of cups", section_strength: "Coffee strength",
    type_rice_cooker: "Rice cooker", keep_warm: "Keeping warm",
    language: "Language", language_auto: "Follow Home Assistant",
    illustration_color: "Appliance colour", color_auto: "Follow the theme",
    color_white: "White", color_yellow: "Yellow", color_grey: "Grey", color_black: "Black", color_red: "Dark red",
    controls_activation: "Controls", activation_tap: "Tap to run", activation_hold: "Hold to run", activation_confirm: "Tap twice to confirm", confirm_again: "Tap again to confirm", activation_off: "Locked (hold opens the entity)",
    type_water_heater: "Water heater", type_boiler: "Boiler", type_heat_pump: "Heat pump",
    boiler_space_heating: "Heating", boiler_hot_water: "Hot water", boiler_burner: "Burner on", boiler_starting: "Ignition", boiler_waiting: "Waiting", hp_cooling: "Cooling", hp_defrost: "Defrosting",
    section_space_heating: "Central heating indicator", section_hot_water: "Hot water indicator", section_flow_temperature: "Flow temperature", section_heat_output: "Heat output", section_cop: "Coefficient of performance (COP)", section_outdoor_temperature: "Outdoor temperature",
    section_cooling: "Cooling indicator", section_cooling_power: "Power while cooling", section_cooling_output: "Cooling output", section_hot_water_power: "Power while heating water", section_hot_water_output: "Heat output for hot water", section_heating_power: "Power while heating", section_heating_energy: "Energy used for heating", section_cooling_energy: "Energy used for cooling", section_hot_water_energy: "Energy used for hot water",
    section_return_temperature: "Return temperature", section_water_flow: "Water flow", section_compressor: "Compressor", hp_delta: "Delta T", section_fan_speed: "Fan speed",
    hp_flow_return: "Flow and return", no_hot_water: "No hot water tank", underfloor_heating: "Underfloor heating instead of radiators",
    type_printer_3d: "3D printer", section_nozzle_temperature: "Nozzle temperature", section_nozzle_target: "Nozzle target temperature",
    section_bed_temperature: "Bed temperature", section_bed_target: "Bed target temperature", section_chamber_temperature: "Chamber temperature",
    section_current_layer: "Current layer", section_total_layers: "Total layers", section_print_file: "Print file",
    section_print_stage: "Print stage", section_printer_layout: "Frame", layout_enclosed: "Enclosed",
    layout_open: "Open frame (moving bed)", unit_hours: "Hours", p3_nozzle: "Nozzle",
    p3_bed: "Bed", p3_chamber: "Chamber", p3_layer: "Layer",
    p3_file: "File", p3_printing: "Printing", p3_preparing: "Preparing",
    p3_cancelled: "Cancelled", p3_failed: "Failed", p3_offline: "Offline",
    p3_attention: "Needs attention", p3_leveling: "Bed levelling", p3_filament: "Changing filament",
    p3_cooling: "Cooling", p3_calibrating: "Calibrating", p3_homing: "Homing",
    section_printed_part: "Printed part", part_cube: "Cube", part_pyramid: "Pyramid", part_duck: "Rubber duck",
    type_pet_feeder: "Pet feeder", type_pet_fountain: "Pet fountain", ft_flowing: "Flowing", ft_off: "Off", ft_filter_due: "Filter due", ft_pump_due: "Clean the pump", ft_low_water: "Low water", ft_line_pump: "Pump", ft_line_water: "Water", ft_pump_reset: "Reset pump", ft_last_pump: "Pump last ran", ft_pump_on: "Running", section_pump_clean: "Pump cleaning", section_pump_reset: "Reset pump button", section_pump_running: "Pump running", section_water_level: "Water level", filter_due_below: "Due at or below", filter_life_full: "Days of a new filter", feeder_ready: "Ready", feeder_feeding: "Dispensing", section_portions_today: "Portions today", section_weight_today: "Weight today", section_portion_weight: "Portion weight", section_serving_size: "Serving size", section_feeder_schedule: "Schedule", section_last_feed: "Last feed", section_error: "Error indicator", start_option: "Option to select", start_value: "Value to write", portions: "portions",
    feeder_empty: "Tank empty", feeder_level: "Tank at {pct}", section_level: "Food level", section_level_b: "Food level, second hopper", level_empty_below: "Empty at or below", level_max: "Tank capacity",
    section_feeder_layout: "Model", layout_tower: "Square tank", layout_canister: "Round tank", layout_double: "Two bowls", layout_dual_split: "Two hoppers, split bowl", layout_rotary: "Rotating plates (wet food)",
    type_iron: "Iron", section_iron_layout: "Model", layout_iron: "Iron", layout_generator: "Steam generator", iron_line_color: "Line colour", color_blue: "Blue", color_body: "Same as the appliance",
    type_toaster: "Toaster", section_toaster_layout: "Model", layout_toaster_two: "Two slots", layout_toaster_four: "Four slots",
    layout_toaster_long: "Long slot", toaster_toasting: "Toasting", toaster_done: "Toast ready", type_air_purifier: "Air purifier",
    type_screen: "Screen (TV, projector, computer)", section_screen_layout: "Model", layout_tv_feet: "TV on feet", layout_tv_stand: "TV on a stand", layout_tv_wall: "Wall-mounted TV", layout_projector: "Projector", layout_computer: "Computer", layout_laptop: "Laptop", laptop_style: "Laptop style", laptop_thin: "Thin, MacBook style", laptop_classic: "Classic PC", laptop_color: "Laptop colour", color_silver: "Silver", color_space_grey: "Space grey", color_midnight: "Midnight", color_rose: "Rose gold", section_screen_image: "Picture on screen", img_random: "Random", img_sunset: "Sunset", img_aquarium: "Aquarium", img_bars: "Test card", img_football: "Football match", img_space: "Space", img_bounce: "Bouncing logo", img_desktop: "Desktop", img_code: "Scrolling code", img_pong: "Pong", screen_on: "On", screen_playing: "Playing", screen_home: "Home screen", screen_locked: "Locked", screen_muted: "Muted", screen_standby_threshold: "Standby up to this power (W)", section_media: "Media player", section_media2: "Second media player", section_media3: "Third media player", section_lock: "Session lock", layout_tablet_wall: "Wall tablet", layout_tablet_frame: "Framed tablet", layout_tablet_portrait: "Upright tablet with light bar", img_dashboard: "Dashboard", screen_dashboard: "Dashboard", screen_saver: "Screensaver", screen_dark: "Screen off", tab_charging: "charging", tab_line_page: "Page", tab_line_touched: "Last interaction", tab_screen: "Screen", tab_reload: "Reload page", section_screensaver: "Screensaver", section_tab_charging: "Charging sensor", section_tab_page: "Current page", section_tab_brightness: "Screen brightness", section_tab_touched: "Last interaction", tab_restart: "Restart app", section_tab_screenshot: "Screenshot",
    step_heat_threshold: "Heating above this power (W)", step_spin_threshold: "Spinning above this power (W)", zone_power: "One zone at full power (W)",
    source: "Source", source_plug: "A smart plug", source_integration: "Integration entities", plug_switch: "Smart plug switch",
    type_thermostat: "Thermostat", section_thermostat_layout: "Model", layout_th_square: "Square", layout_th_round: "Round", layout_th_glass: "Black glass", layout_th_valve: "Radiator valve", th_idle: "Target reached", th_eco: "Eco", th_away: "Away", th_frost: "Frost protection", th_window: "Window open", th_line_valve: "Valve", section_thermostat: "Room thermostat",
    compact_lines: "Information", lines_below: "Under the card", lines_beside: "Beside the drawing", lines_toggle: "Hidden, a chevron shows them", lines_show: "Show the information", lines_hide: "Hide the information",
    type_mobility: "Electric ride", layout_mob_scooter: "Scooter", layout_mob_offroad: "Off-road scooter", layout_mob_ebike: "E-bike", layout_mob_gyropode: "Gyropode", layout_mob_motorcycle: "Electric motorcycle", mob_charging: "Charging", mob_charged: "Charged", mob_unplugged: "Unplugged", mob_plugged: "Plugged in", type_hair_dryer: "Hair dryer", layout_hd_pistol: "Classic", layout_hd_ring: "Ring", hd_cool: "Cool air", hd_hot: "Hot air", hd_heat_threshold: "Hot air above this power (W)", fill_height: "Fill the height of its slot", done_alert: "Flash at the end of the cycle", done_seen: "Seen", no_power_threshold: "No power draw below (W)", group_appearance: "Appearance", show_name: "Show the name", show_state: "Show the state", transparent: "Transparent background", font_scale: "Text size", illustration_size: "Drawing size", compact_mode: "Compact mode", compact_off: "Off", compact_hide: "No drawing", compact_side: "Drawing on the side", group_laundry: "Laundry", group_kitchen: "Kitchen", group_heating: "Heating and hot water", group_air: "Air and climate", group_home: "Home and media", group_pets: "Pets", illustration_frame: "Same drawing height as the cards beside it", section_screen_source: "Input source", screen_source: "Input",
    type_network: "Network device (switch, NAS, server)", group_network: "Network and servers", layout_net_switch: "Switch", layout_net_server: "Server", layout_net_nas: "NAS", layout_net_rack: "Rack", net_ports_count: "Ports drawn", net_bays: "NAS bays", net_online: "Online", net_busy: "Busy", net_alert: "Alert", net_warn: "Disk to watch", section_net_cpu: "CPU usage (%)", section_net_memory: "Memory usage (%)", section_net_volume: "Volume used (%)", section_net_download: "Download rate", section_net_upload: "Upload rate", section_net_ports: "Active ports", net_ports_total: "Port count", section_net_poe: "PoE power", section_net_problem: "Problem alert", section_net_temperature: "Temperature", net_temp_alert: "Alert above this temperature (\u00b0C)", net_busy_threshold: "Busy above this rate (Mbit/s)", net_line_rate: "Throughput", net_line_load: "Load", net_line_volume: "Volume", section_net_disk1: "Disk 1", section_net_disk2: "Disk 2", section_net_disk3: "Disk 3", section_net_disk4: "Disk 4",
    type_robot: "Robot (vacuum, mop, mower)", layout_robot_vacuum: "Robot vacuum", layout_robot_mop: "Mopping robot", layout_robot_combo: "Vacuum and mop robot", layout_robot_mower: "Robot mower", section_robot_station: "Base", robot_station_station: "Emptying or washing station", robot_station_base: "Charging base only", robot_shelter: "Shelter over the base", robot_shelter_style: "Shelter style", mower_style: "Mower style", mower_classic: "Classic", mower_navimow: "Navimow, orange wheels", shelter_lean_to: "Wooden lean-to", shelter_shell: "Shell", shelter_garage: "Garage", robot_shelter_color: "Shell colour", delay_starts_in: "Starts in", section_delay: "Delayed start countdown", state_entity_optional: "State entity (optional)", color_green: "Green", color_orange: "Orange", robot_charging: "Charging", robot_docked: "Docked", robot_cleaning: "Cleaning", robot_mopping: "Mopping", robot_mowing: "Mowing", robot_edgecut: "Edge cutting", robot_returning: "Returning to base", robot_emptying: "Emptying the bin", robot_bin_full: "Bin full", robot_washing: "Washing the pads", robot_drying: "Drying the pads", robot_water_empty: "Water tank empty", robot_rain: "Rain delay", robot_idle: "Stopped", section_robot_status: "Detailed status", section_battery: "Battery", section_robot_bin: "Bin full alert", section_robot_water: "Water tank", section_robot_rain: "Rain", section_robot_error: "Error", robot_station_box: "Rectangular station", robot_station_color: "Station colour", color_gold: "Gold", robot_camera: "Camera module on the robot", section_robot_clean_tank: "Clean water", section_robot_dirty_tank: "Dirty water",
    type_pool_pump: "Pool pump", pool_filtering: "Filtering", pool_chlorinating: "Chlorine injection", pool_backwash: "Backwash", pool_frost: "Frost protection", pool_light_on: "light on", section_water_temperature: "Water temperature", section_air_temperature: "Air temperature", section_ph: "pH", section_redox: "RedOx (ORP)", section_filtration_time: "Filtration time today", section_pressure: "Filter pressure", pool_pressure_alert: "Alert above this pressure (bar)", section_pool_mode: "Pump mode", section_chlorine_pump: "Chlorine pump", section_chlorine_level: "Chlorine tank level", section_backwash: "Backwash", section_frost: "Frost protection", section_pool_alert: "Alert", pool_line_water: "Water", pool_line_air: "Air", pool_line_filtered: "Filtered today", pool_line_pressure: "Pressure", pool_line_chlorine: "Chlorine tank", pool_line_mode: "Mode",
    history_last: "Last {h} h", show_history: "Show the history", section_history: "History sensor", history_hours: "Hours of history", history_empty: "No history yet", history_last_days: "Last {d} days", history_chip_h: "{h} h", history_chip_d: "{d} d", history_periods: "History periods", history_total: "Total", delay_set: "Delayed start", delay_none: "None", section_delay_set: "Delayed start setting", hide_when_off: "Show only the state when off", robot_winter: "Winter storage", section_robot_winter: "Winter storage switch",
    type_scale: "Bathroom scale", scale_weighed: "Weighed", scale_goal_reached: "Goal reached", section_weight_goal: "Weight goal", scale_goal_value: "Weight goal, without a sensor", section_fat_ratio: "Body fat (%)", section_fat_mass: "Fat mass", section_muscle_mass: "Muscle mass", section_bone_mass: "Bone mass", scale_line_goal: "Goal", scale_line_fat: "Fat", scale_line_muscle: "Muscle", scale_line_bone: "Bone", scale_to_lose: "to lose", scale_to_gain: "to gain",
    type_ups: "UPS (uninterruptible power supply)", ups_online: "On mains", ups_battery: "On battery", ups_bypass: "Bypass", ups_charging: "charging", ups_low: "Battery low", ups_replace: "Replace battery", ups_overload: "Overload", section_ups_runtime: "Runtime", section_ups_load: "Load (%)", section_ups_input_voltage: "Input voltage", ups_nominal_power: "Nominal power, for the load in watts (W)", ups_battery_low: "Battery low below (%)", ups_line_battery: "Battery", ups_line_runtime: "Runtime", ups_line_load: "Load", ups_line_input: "Input",
    door_corner: "Show it in a corner of the card", controls_always: "Always show every button", show_unavailable_controls: "Show buttons whose entity is unavailable",
    layout_robot_stick: "Stick vacuum", stick_charged: "Charged",
    layout_robot_floor_washer: "Floor washer", stick_away: "Off the base", stick_away_threshold: "Off the base below this power (W)",
    type_diffuser: "Essential oil diffuser", dif_mist: "Diffusing", dif_inter: "Intermittent", dif_low: "Light mist", dif_empty: "Tank empty", dif_mode: "Mist mode", layout_dif_drop: "Teardrop", layout_dif_cone: "Cone", layout_dif_stone: "Pebble", layout_dif_flame: "Flame", layout_dif_nebulizer: "Nebulizer", section_tank_empty: "Empty tank sensor", type_hrv: "Heat recovery ventilation (HRV/ERV)", hrv_run: "Ventilating", hrv_boost: "Boost", hrv_bypass: "Bypass", hrv_defrost: "Defrosting", hrv_filter: "Replace filter", hrv_away: "Away", hrv_recirc: "Recirculation", hrv_humidity: "Humidity control", hrv_inter: "Intermittent", hrv_inter_paused: "Intermittent, paused", hrv_mode: "Mode", hrv_speed: "Speed", section_speed_list: "Speeds (one entity per speed)", speeds_add: "Add a speed", section_active_mode: "Active mode (when it differs from the one set)", hrv_supply_fan: "Supply fan", hrv_exhaust_fan: "Exhaust fan", section_supply_fan: "Supply fan speed (rpm)", section_exhaust_fan: "Exhaust fan speed (rpm)", fan_max_rpm: "Fan top speed (rpm)", section_exhaust_airflow: "Exhaust airflow", section_target_humidity: "Humidity setpoint", section_humidity_control: "Humidity control switch", layout_hrv_diagram: "Air flows", layout_hrv_one_duct: "Wall unit, one duct", layout_hrv_pair: "Through-wall pair", section_supply_temperature: "Supply air temperature", section_extract_temperature: "Extract air temperature", section_exhaust_temperature: "Exhaust air temperature", section_bypass: "Bypass", section_airflow: "Airflow", hrv_t_outdoor: "fresh air", hrv_t_supply: "supply", hrv_t_extract: "extract", hrv_t_exhaust: "exhaust", hrv_outside: "outside", hrv_room: "room", layout_hrv_single: "Extract only (single flow)", hrv_low_speed: "Low speed", hrv_high_speed: "High speed", section_high_speed: "High speed switch", wp_off: "Switched off", layout_hrv_single_box: "Extract unit alone",
    type_camera: "Camera", cam_idle: "Idle", cam_live: "Streaming", cam_rec: "Recording", cam_motion: "Motion detected", cam_off: "Off", cam_line_last_motion: "Last motion", cam_line_night: "Night vision", cam_line_signal: "Signal", section_motion: "Motion sensor", section_recording: "Recording sensor", section_night_vision: "Night vision", section_privacy: "Privacy mode", section_signal: "Signal strength", layout_cam_indoor: "Indoor, pan and tilt", layout_cam_tube: "Indoor tube", layout_cam_outdoor: "Outdoor", layout_cam_dome: "Dome", layout_cam_doorbell: "Doorbell", cam_ring: "Ringing", cam_line_last_ring: "Last ring", section_ring: "Doorbell button", type_mailbox: "Mailbox", mb_empty: "Empty", mb_mail: "Mail", mb_front_open: "Front door open", mb_back_open: "Back door open", mb_line_count: "Mail received", mb_line_last: "Last mail", mb_front_door: "Front door", mb_back_door: "Back door", mb_open: "Open", mb_closed: "Closed", section_mail_count: "Mail counter", layout_mb_through: "Through the wall", layout_mb_classic: "Classic", mb_street: "street", mb_house: "house", mb_front_side: "Street side", mb_side_left: "Left", mb_side_right: "Right", type_water_pump: "Water pump", type_floor_heating: "Underfloor heating", type_spa: "Spa", type_sauna: "Sauna", type_aquarium: "Aquarium", type_meter: "Electricity meter", type_christmas_tree: "Christmas tree", layout_chest: "Chest freezer", layout_drawers: "Drawer freezer", layout_pump_booster: "Booster set", layout_pump_sump: "Sump pump", layout_floor_water: "Hot water", layout_floor_electric: "Electric", layout_robot_pool: "Pool robot", wp_pumping: "Pumping", wp_high: "High level", spa_bubbles: "Bubbles", sauna_ready: "Ready", aq_lit: "Light on", aq_dark: "Light off", meter_low: "Low use", meter_high: "High use", layout_meter_linky: "Linky", layout_meter_box: "Electricity meter", layout_meter_dome: "Round meter", layout_meter_gas: "Gas meter", layout_meter_water: "Water meter", section_today_use: "Today's use (kWh, m\u00b3)", section_meter_index: "Meter index", meter_index: "Index", meter_flowing: "In use", meter_idle: "No use", meter_export: "Feeding in", meter_export_index: "Export index", meter_direction: "Power direction", meter_dir_auto: "Auto (negative = feed-in)", meter_dir_import: "Consumption only", meter_dir_export: "Feed-in only", meter_dir_inverted: "Inverted (positive is fed in)", meter_flow: "Flow", section_pressure: "Pressure", section_water_level: "Water level", section_high_level: "High level alarm", level_max: "Level when full", section_bubbles: "Bubbles", section_tariff: "Tariff period", high_power: "High use from (W or VA)", tree_palette: "Colours", palette_multicolor: "Multicolour", palette_red_gold: "Red and gold", palette_red_silver: "Red and silver", palette_gold_silver: "Gold and silver", palette_blue_silver: "Blue and silver", palette_white_silver: "White and silver", palette_red_green: "Red and green", presents: "Presents", presents_auto: "On 24 and 25 December", presents_show: "Always", presents_hide: "Never", tree_on: "On", tree_off: "Off",
    type_lamp: "Lamp", lamp_off: "Off", lamp_on: "On", lamp_line_brightness: "Brightness", lamp_line_color_temp: "Colour temperature", lamp_line_effect: "Effect", lamp_timer: "Timer", show_toggle: "On/off button", line_hide: "Hide this line", line_show: "Show this line", illustration_tap_action: "Tap on the drawing", pic_tap_default: "Card's own", pic_tap_toggle: "Toggle", pic_tap_more: "Details", pic_tap_none: "Nothing", lamp_spots: "Number of spots", layout_lamp_bulb: "Bulb", layout_lamp_bedside: "Bedside lamp", layout_lamp_floor: "Arc floor lamp", layout_lamp_torch: "Torchiere", layout_lamp_pendant: "Pendant", layout_lamp_strip: "LED strip", layout_lamp_spot: "Recessed spots", layout_lamp_panels: "Light panels", layout_lamp_desk: "Desk lamp", layout_lamp_wall: "Wall lantern", layout_lamp_garden_spot: "Garden spotlight", layout_lamp_bollard: "Garden bollard", layout_lamp_string: "String lights", layout_lamp_curtain: "Curtain lights", layout_lamp_icicle: "Icicle lights", layout_lamp_festoon: "Festoon lights", layout_lamp_squares: "Pixel squares", type_irrigation: "Watering", type_litter_box: "Self-cleaning litter box", type_detector: "Smoke, CO or leak detector", type_speaker: "Speaker", type_console: "Game console", con_playing: "Playing", con_on: "On", con_rest: "Rest mode", con_off: "Off", con_game: "Game", con_playtime: "Play time today", con_playtime_left: "Play time left", layout_con_ps1: "PlayStation", layout_con_ps2: "PlayStation 2", layout_con_ps3: "PlayStation 3", layout_con_ps4: "PlayStation 4", layout_con_ps4_pro: "PlayStation 4 Pro", layout_con_ps5: "PlayStation 5", layout_con_xbox: "Xbox", layout_con_xbox_360: "Xbox 360", layout_con_xbox_one: "Xbox One", layout_con_xbox_series_x: "Xbox Series X", layout_con_xbox_series_s: "Xbox Series S", layout_con_switch: "Nintendo Switch", layout_con_switch_2: "Nintendo Switch 2", layout_con_switch_lite: "Nintendo Switch Lite", layout_con_ps_vita: "PS Vita", layout_con_nes: "NES", layout_con_snes: "Super Nintendo", layout_con_n64: "Nintendo 64", layout_con_gamecube: "GameCube", layout_con_wii: "Wii", layout_con_megadrive: "Mega Drive", layout_irr_sprinkler: "Pop-up sprinkler", layout_irr_tap: "Tap timer", layout_lit_globe: "Rotating globe", layout_lit_box: "Closed box", layout_det_smoke: "Smoke detector", layout_det_co: "CO alarm", layout_det_leak: "Water leak sensor", layout_spk_smart: "Smart speaker (HomePod)", layout_spk_bookshelf: "Bookshelf speaker", layout_spk_soundbar: "Soundbar", layout_spk_homepod_mini: "HomePod mini", layout_spk_sonos_one: "Compact (Sonos One)", layout_spk_sonos_move: "Portable (Sonos Move)", layout_spk_echo_dot: "Sphere (Echo Dot)", layout_spk_nest_mini: "Puck (Nest Mini)", layout_spk_sonos_era100: "Sonos Era 100", layout_spk_sonos_era300: "Sonos Era 300", layout_spk_bose_wave: "Bose Wave SoundTouch", layout_spk_bose_500: "Bose Home Speaker 500", layout_spk_bose_soundlink: "Portable (Bose SoundLink)", layout_spk_bose_soundbar: "Soundbar (Bose)", speaker_color: "Speaker colour", irr_watering: "Watering", irr_waiting: "Waiting", irr_rain: "Rain delay", irr_zone: "Zone", section_rain_delay: "Rain delay", section_soil_moisture: "Soil moisture", section_next_run: "Next watering", lit_ready: "Ready", lit_cleaning: "Cleaning", lit_cat: "Cat inside", lit_full: "Drawer full", lit_fault: "Fault", lit_sleep: "Sleeping", sec_waste_drawer: "Waste drawer", sec_litter_level: "Litter level", sec_pet_weight: "Cat's weight", sec_visits: "Visits", sec_last_use: "Last visit", sec_cat_present: "Cat sensor", det_ok: "All clear", det_smoke: "Smoke detected", det_co: "CO detected", det_leak: "Leak detected", sec_test: "Test button", sec_co_level: "CO level", spk_playing: "Playing", spk_paused: "Paused", spk_idle: "Idle", spk_off: "Off", spk_title: "Title", spk_artist: "Artist", spk_source: "Source", spk_volume: "Volume", spk_muted: "Muted", play_pause: "Play/pause", opt_low: "Low", opt_ok: "OK", opt_running: "Running", opt_stopped: "Stopped", lock_locked: "Locked", lock_unlocked: "Unlocked", sec_meat_probe: "Meat probe", sec_meat_probe_target: "Probe target", sec_detergent: "Detergent level", sec_softener: "Softener level", sec_wash_temp: "Wash temperature", sec_spin: "Spin speed", sec_heater_mode: "Mode", sec_showers: "Showers available", sec_pilot_mode: "Pilot wire mode", sec_window: "Window", sec_range: "Range", sec_vehicle_lock: "Lock", sec_water_chlorine: "Chlorine", sec_aq_filter: "Filter pump", type_storage_tank: "Buffer tank", type_fresh_water_station: "Fresh water station", type_solar_thermal: "Solar thermal", type_wood_stove: "Wood stove", heat_delta: "Difference", heat_fault: "Fault", heat_fault_state: "Fault", heat_pump_mod: "Pump modulation", tank_charge: "Charge", tank_energy: "Stored energy", tank_sources: "Sources", tank_consumers: "Consumers", tank_none: "None", tank_loading: "Loading", tank_charged: "Charged", tank_partly: "Partly charged", tank_discharged: "Discharged", tank_temps_list: "Tank temperatures (top to bottom)", tank_temps_add: "Add a temperature", tank_sources_add: "Add a source", tank_consumers_add: "Add a consumer", tank_min_temp: "Cold temperature (0 %)", tank_max_temp: "Charged temperature (100 %)", tank_volume: "Volume (litres)", fws_flow: "Flow", fws_outlet: "Outlet temperature", fws_supply: "Tank supply", fws_cold: "Cold water", fws_circ_mode: "Circulation mode", fws_drawing: "Drawing hot water", fws_too_cold: "Supply too cold", fws_circulating: "Circulating", fws_standby: "Standby", fws_pump: "Primary pump", fws_circulation: "Circulation pump", sth_collector: "Collector", sth_tank: "Tank", sth_power: "Heat output", sth_today: "Yield today", sth_stagnation: "Stagnation", sth_loading: "Loading", sth_full: "Tank full", sth_frost: "Frost", sth_standby: "Standby", sth_stagnation_temp: "Stagnation temperature", layout_sth_flat: "Flat plates", layout_sth_tubes: "Evacuated tubes", wood_temp: "Stove temperature", wood_flow: "Flow", wood_return: "Return", wood_pump: "Pump", wood_valve: "Valve", wood_room: "Room", wood_last_fire: "Last fire", wood_overheat: "Overheating", wood_burning: "Burning", wood_embers: "Embers", wood_cold: "Cold", wood_water_jacket: "Water jacket", wood_burning_temp: "Burning from (temperature)", wood_embers_temp: "Embers from (temperature)", wood_overheat_temp: "Overheat above (water)", wood_scale: "Temperature scale (multiplier)", section_mail_present: "Mail inside (on: mail, off: empty)", layout_mb_through_3d: "Through the wall, 3/4 view", mb_color: "Colour", mb_color_anthracite: "Anthracite", mb_color_white: "White", mb_color_grey: "Aluminium grey", mb_color_green: "Green", mb_color_brown: "Brown", layout_irr_drip: "Vegetable patch, drip line", layout_irr_flowers: "Flower bed, micro-sprayers", irr_model: "Tap timer model", irr_model_generic: "Generic", irr_model_sonoff: "Sonoff (black and orange)", irr_wall: "Wall", irr_wall_brick: "Brick", irr_wall_render: "White render", irr_wall_none: "None (standpipe)", irr_duration: "Watering duration", fws_supply_margin: "Supply margin over the setpoint (K)", layout_hrv_single_basement: "Extract unit in the basement", section_hrv_floors: "Floors", zone_valves_list: "Zone dampers", zone_valves_add: "Add a damper", hrv_zones: "Dampers", hrv_zone_open: "open", hrv_zone_shut: "closed", layout_pump_circulator: "Heating circulator", circ_running: "Running", circ_nodata: "No data", circ_speed: "Speed", circ_max_speed: "Maximum speed", circ_head: "Head", circ_voltage: "Voltage", circ_mode: "Control mode", circ_model: "Brand", circ_model_generic: "Generic", type_humidifier: "Humidifier", hum_running: "Humidifying", hum_empty: "Add water", hum_lifted: "Tank removed", hum_mist: "Mist level", hum_night: "Night light", hum_display: "Display", hum_low_water: "Low water",
    speed_power_max: "Power at top speed (W)", speed_power_custom: "Custom speed thresholds", speed_power_2: "Speed 2 from (W)", speed_power_3: "Speed 3 from (W)",
    fw_self_cleaning: "Self-cleaning", fw_dirty_full: "Dirty water tank full", fw_clean_empty: "Clean water tank empty",
    group_energy: "Energy", type_solar: "Solar panels", type_home_battery: "Home battery", solar_producing: "Producing", solar_low: "Low production", solar_night: "Night", section_solar_layout: "Mounting", layout_solar_ground: "On the ground", layout_solar_roof: "On a roof", section_solar_power: "Power produced", section_energy_today: "Energy produced today", solar_line_today: "Today", solar_peak_power: "Peak power of the panels (W)", section_battery_power: "Battery power (+ charging, \u2212 discharging)", power_inverted: "Positive power means discharging", section_charge_power: "Charge power", section_battery_discharge: "Discharge power", section_reserve: "Backup reserve", section_charge_limit: "Charge limit", battery_capacity: "Capacity (kWh)", layout_battery_wall: "Wall battery", layout_battery_station: "Portable power station", bat_idle: "Idle", bat_full: "Full", bat_low: "Low battery", bat_line_full_in: "Full in", bat_line_left: "Remaining", bat_line_reserve: "Reserve",
    robot_controls: "Start, pause and return buttons", robot_go_home: "Return to base", battery_corner: "Show the battery in a corner of the card", section_robot_clean_mode: "Cleaning mode", section_robot_floor: "Floor", floor_rug: "Rug", floor_tiles: "Tiles", floor_parquet: "Parquet", floor_smooth: "Smooth floor",
    layout_net_router: "Router / box", section_net_clients: "Connected clients", section_net_wan: "Internet link", section_net_wifi: "Wi-Fi", net_line_clients: "Clients", net_no_internet: "No internet",
    section_purifier_layout: "Model", layout_purifier_cylinder: "Cylinder", layout_purifier_box: "Square box", layout_purifier_ring: "Bladeless ring",
    pf_purifying: "Purifying", pf_auto: "Auto", pf_night: "Night mode", section_air_quality: "Air quality",
    section_screen: "Screen", section_heater: "Heating (thermostat)", aq_good: "Good", aq_fair: "Fair",
    aq_poor: "Poor", aq_bad: "Very poor", type_fan: "Fan", layout_fan_stand: "Pedestal",
    layout_fan_table: "Desk", layout_fan_ceiling: "Ceiling", fan_natural: "Natural wind", fan_summer: "Summer",
    fan_winter: "Winter", oscillating: "Oscillates", fan_direction_inverted: "Swap summer and winter", fan_wood_blades: "Wood blades", fan_on: "On",
    section_fan_layout: "Model",
    iron_heating: "Heating", iron_off: "Off", iron_ready: "Ready", left_on: "Left on", left_on_after: "Warn after (minutes switched on)",
    type_pellet_stove: "Pellet stove", ps_off: "Off", ps_ignition: "Ignition", ps_burning: "Burning", ps_modulating: "Modulating",
    ps_eco: "Eco standby", ps_cooling: "Cooling down", ps_cleaning: "Cleaning", ps_alarm: "Alarm", ps_no_pellets: "Out of pellets",
    section_stove_status: "Stove status", section_room_temperature: "Room temperature", section_flue_temperature: "Flue gas temperature", section_pellet_level: "Pellet level",
    ps_line_room: "Room", ps_line_power: "Power", ps_line_flue: "Flue gas", ps_line_fan: "Fan", ps_line_pellets: "Pellets",
    type_air_conditioner: "Air conditioner", ac_off: "Off", ac_cooling: "Cooling", ac_heating: "Heating", ac_drying: "Drying", ac_fan_only: "Fan only", ac_auto: "Auto", ac_idle: "Standby", ac_defrost: "Defrosting", ac_preheating: "Warming up", ac_line_humidity: "Humidity", section_vane_vertical: "Vane up/down", section_vane_horizontal: "Vane left/right", section_purifier: "Air purifier (nanoe, plasma)", section_defrost: "Defrost indicator",
    type_dehumidifier: "Dehumidifier", type_space_heater: "Space heater", type_towel_warmer: "Towel warmer", dh_laundry: "Drying laundry", dh_full: "Tank full", dh_line_tank: "Tank", line_mode: "Mode", tw_comfort: "Comfort", tw_eco: "Eco", tw_frost: "Frost protection", tw_boost: "Boost", tw_drying: "Drying", section_tank: "Water tank", section_current_humidity: "Humidity sensor", section_heater_layout: "Model", layout_fan_heater: "Fan heater", layout_oil_radiator: "Oil-filled radiator",
    type_air_fryer: "Air fryer", af_cooking: "Cooking", af_shake: "Shake the basket", af_basket_out: "Basket out", af_preheated: "Preheated", af_basket2: "Basket 2", section_fryer_layout: "Model", layout_basket: "Basket", layout_window: "Basket with window", layout_dual: "Dual basket", section_basket: "Basket sensor", section_shake: "Shake reminder", section_basket2: "Basket 2 state (dual)",
    last_cycle: "Last cycle", show_last_cycle: "Show the last cycle", power_off_delay: "Delay before Finished (min, plug only)", section_energy: "Energy used", energy_price: "Price per kWh (number or entity)", energy_line: "Energy", cost_line: "Cost", show_elapsed: "Show the time elapsed in the cycle", elapsed_line: "Elapsed", show_today: "Show today's running time and starts", today_line: "Today", starts_one: "{n} start", starts_other: "{n} starts", section_tower: "Tower (second plug)", tower_line: "Tower", tower_on: "Tower on", tower_toggle: "Tower",
    washer_dryer: "Washer-dryer (washes and dries)", step_drying: "Drying", section_cycle_phase: "Cycle phase",
    step_heating: "Heating", step_prewash: "Pre-wash", step_soaking: "Soaking", step_weighing: "Weighing", step_filling: "Filling", step_washing: "Washing", step_rinsing: "Rinsing", step_draining: "Draining", step_spinning: "Spinning", step_cooling: "Cooling", step_anti_crease: "Anti-crease", step_steam: "Steam",
    type_ev_charger: "EV charger", ev_no_vehicle: "No vehicle", ev_connected: "Plugged in", ev_awaiting_auth: "Awaiting authorisation", ev_charging: "Charging", ev_paused: "Charging paused", ev_scheduled: "Scheduled", ev_done: "Charging complete", ev_error: "Error", ev_offline: "Offline", section_vehicle: "Vehicle plugged in (plug sensor)", section_session_energy: "Session energy", section_current_limit: "Charging current limit", ev_power_threshold: "Charging above this power (W)", ev_line_session: "Charged", ev_line_limit: "Current limit",
    ev_discharging: "Discharging", section_discharge_power: "Power the car gives back (to the home or the grid)", ev_line_discharge: "Discharge",
  },
};

function canonicalLanguage(code) {
  const base = String(code || "en").toLowerCase().split("-")[0];
  // Home Assistant uses nb/nb-NO for Norwegian Bokmal. The card's existing
  // translation is kept under no for backwards compatibility, so treat both
  // identifiers as the same language instead of falling back to English.
  return base === "nb" ? "no" : base;
}
function lang(hass) {
  const l = canonicalLanguage(hass && ((hass.locale && hass.locale.language) || hass.language));
  return LANGUAGE_NAMES[l] ? l : "en";
}
function t(hass, key) {
  const d = langDict(lang(hass));
  return (d && d[key]) || T.en[key] || key;
}

// A release carries English inside the card and every other language in a
// file of its own beside it, ha-appliance-card-<lang>.json, so a dashboard
// reads one language and not fourteen. The source keeps them all, which is
// what the tests run on; tools/build.mjs splits them out.
//
// A language is fetched the first time it is asked for, and kept in local
// storage under the card's version, so every later visit finds it before the
// first render and never shows English for a moment. A new version starts a
// new key and drops the old ones. Until the file arrives the card speaks
// English, then every card on the page draws itself again.
const LANG_CACHE = "ha-appliance-card-i18n:";
// Cards and editors on the page, to draw again once a language has arrived.
const langListeners = new Set();
function onLanguageLoaded(fn, on) {
  if (on) langListeners.add(fn);
  else langListeners.delete(fn);
}
const langState = {};
function langDict(l) {
  if (T[l]) return T[l];
  if (!langState[l]) requestLanguage(l);
  return T[l] || null;
}
function requestLanguage(l) {
  langState[l] = "loading";
  const key = `${LANG_CACHE}${CARD_VERSION}:${l}`;
  try {
    const store = window.localStorage;
    for (let i = store.length - 1; i >= 0; i--) {
      const k = store.key(i);
      if (k && k.startsWith(LANG_CACHE) && !k.startsWith(`${LANG_CACHE}${CARD_VERSION}:`)) store.removeItem(k);
    }
    const kept = JSON.parse(store.getItem(key) || "null");
    if (kept && typeof kept === "object") {
      T[l] = kept;
      langState[l] = "ready";
      return;
    }
  } catch (e) {
    /* no storage: fetch it */
  }
  if (typeof fetch !== "function") return;
  fetch(assetUrl(`ha-appliance-card-${l}.json`))
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then((dict) => {
      T[l] = dict;
      langState[l] = "ready";
      try { window.localStorage.setItem(key, JSON.stringify(dict)); } catch (e) { /* full or blocked */ }
      for (const fn of Array.from(langListeners)) {
        try { fn(); } catch (e) { /* one card failing must not stop the others */ }
      }
    })
    .catch((err) => {
      // Once per page: a missing file stays missing, and English is shown.
      langState[l] = "failed";
      console.warn(`HA-APPLIANCE-CARD: no ${l} translation, English it is (${err && err.message})`);
    });
}

// Where the card's own files are served. A classic script knows its own
// address while it runs; Home Assistant adds a resource as a module, which
// does not, so the page is asked for the card's <script> next, and HACS's
// folder is the last resort. The version in the query keeps the browser from
// serving a previous release's file from its cache.
const SCRIPT_URL = (() => {
  try { return (document.currentScript && document.currentScript.src) || null; } catch (e) { return null; }
})();
function assetUrl(name) {
  let src = SCRIPT_URL;
  if (!src) {
    try {
      const tag = Array.from(document.querySelectorAll("script[src]")).find((el) => /\/ha-appliance-card\.js(\?|#|$)/.test(el.src));
      src = tag && tag.src;
    } catch (e) {
      src = null;
    }
  }
  const base = src ? new URL(".", src).href : "/hacsfiles/ha-appliance-card/";
  return `${base}${name}?v=${CARD_VERSION}`;
}

// Each language names itself, so the list needs no translating.
const LANGUAGE_NAMES = {
  en: "English", fr: "Fran\u00e7ais", de: "Deutsch", es: "Espa\u00f1ol",
  it: "Italiano", nl: "Nederlands", pt: "Portugu\u00eas", sv: "Svenska",
  no: "Norsk", da: "Dansk", pl: "Polski", ru: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439",
  zh: "\u4e2d\u6587", cs: "\u010ce\u0161tina",
  hu: "Magyar",
};

// A card can be pinned to one language whatever Home Assistant is set to.
// Someone running HA in English so error messages match what they find online
// may still want the card in their own language. Overriding the locale on a
// copy of hass leaves every t() call downstream working unchanged, and carries
// the choice to the dates as well, which share the same resolution.
function localizedHass(hass, cfg) {
  const want = cfg && cfg.language;
  const resolved = canonicalLanguage(want);
  if (!hass || !want || want === "auto" || !LANGUAGE_NAMES[resolved]) return hass;
  return { ...hass, language: resolved, locale: { ...(hass.locale || {}), language: resolved } };
}

// ---------------------------------------------------------------------------
// State normalization, working across brands and integrations
// ---------------------------------------------------------------------------

const STATE_KEYWORDS = {
  // "ready" covers the "Ready To Start" spelling as well as Home Connect's
  // OperationState.Ready. "inactive" has to be listed here rather than left
  // to "active" under running: that keyword cannot match inside a word, and
  // would mean the opposite of the state if it could.
  idle: ["idle", "off", "stand.?by", "veille", "eteint", "arret", "inactif", "inactive", "ready", "wait", "asleep"],
  // Before "running": ovens report "Preheating", and the "heating" keyword
  // below cannot match it anyway (no word boundary inside "preheating").
  preheating: ["preheat", "pre-heat", "pre_heat", "prechauff", "vorheiz", "precalent", "voorverwarm"],
  // A rice cooker sits in this state for hours after it has finished, and so
  // does an oven on its warming setting. MIoT reports it as status 4,
  // "Keep-warm", and it is neither running nor done.
  keep_warm: ["keep.?warm", "keepwarm", "keeping.?warm", "keep.?temp", "warming", "maintien", "au chaud",
    "warmhalten", "mantener caliente", "mantenimento", "warmhouden"],
  // "on" stops at the word: Online is not a machine at work.
  running: ["run", "wash", "spin", "dry", "rinsing", "heating", "cours", "on(?:going)?\\b", "active", "marche", "actif",
    "cooking\\b(?!\\s*(?:complete|finished|done|end))", "cuisson\\b(?!\\s*termin)", "brew", "bak(?:e|ing)\\b",
    // What an oven, a coffee machine or a kettle says it is doing.
    "broil", "roast", "proof", "boil(?!er)", "busy", "making", "deliver", "prepar", "process", "clean(?!ed)", "descal",
    // Aborting is a cancelled cycle still draining, not an error and not
    // finished: the appliance is doing something until it stops.
    "abort"],
  paused: ["pause", "hold", "suspended", "action.?required", "attention"],
  done: ["end", "done", "finish", "complete", "termin", "made\\b"],
  delayed: ["delay", "differ", "scheduled", "programmed", "pre.?set\\b", "reservation"],
  error: ["error", "fault", "alarm", "erreur", "fail", "out.?of.?order", "overheat", "unusual"],
};

// States where the appliance is actually doing something: they drive the
// animations, the progress latch and the heat glow alike.
const ACTIVE_STATES = ["running", "preheating"];
function isActiveState(norm) {
  return ACTIVE_STATES.includes(norm);
}

// Where a state stands in a cycle, for timing the progress bar. A pause and a
// gap in the data (Home Assistant restarting, the integration reconnecting)
// belong to the cycle they interrupt. Anything else ends it.
function cycleRole(norm) {
  if (isActiveState(norm)) return "active";
  if (norm === "paused") return "paused";
  if (norm === "unknown") return "gap";
  return "out";
}

// How far back the card looks for the start of a cycle it opened in the
// middle of. The longest programs, eco dishwashers and washer-dryers, stay
// well under it.
const CYCLE_HISTORY_MS = 12 * 60 * 60 * 1000;

// Rebuilds the cycle in progress from the state history Home Assistant keeps,
// in its compressed format: { s: state, lu: last updated, lc: last changed },
// times in seconds. Walks back from the latest state to the first one of the
// streak the machine is still in, and adds up the pauses already over. A
// pause still going on is the current state, which the card times itself.
function cycleFromHistory(entries, normOf) {
  if (!Array.isArray(entries)) return null;
  const rows = entries
    .map((e) => ({ role: cycleRole(normOf(e && e.s)), t: 1000 * Number(e && (e.lc !== undefined ? e.lc : e.lu)) }))
    .filter((r) => Number.isFinite(r.t));
  const last = rows.length - 1;
  if (last < 0 || rows[last].role === "out") return null;
  let i = last;
  while (i > 0 && rows[i - 1].role !== "out") i--;
  // A gap cannot open a cycle: the machine was idle, then dropped out of
  // sight, and the cycle began when it came back running.
  while (i < last && rows[i].role === "gap") i++;
  let pausedMs = 0;
  for (let j = i; j < last; j++) {
    if (rows[j].role === "paused") pausedMs += rows[j + 1].t - rows[j].t;
  }
  return { start: rows[i].t, pausedMs };
}

// Home Assistant's own long press lasts half a second.
const HOLD_MS = 500;
// How long a control asking to be confirmed waits for the second tap.
const CONFIRM_MS = 3000;
// YAML reads a bare off as false (issue #28): the card takes it for the lock
// it was meant to be, never for the default.
function activationOf(v) {
  if (v === false) return "off";
  const s = String(v == null ? "" : v).trim().toLowerCase();
  return s === "hold" || s === "off" || s === "confirm" ? s : "tap";
}

// The last cycle is looked for further back than a cycle in progress: a
// washing machine may sit for days between two. A power meter reports every
// few seconds, so its history is kept to two days.
const LAST_CYCLE_STATE_MS = 7 * 24 * 60 * 60 * 1000;
const LAST_CYCLE_POWER_MS = 48 * 60 * 60 * 1000;
// A plug that draws for less than a minute has not run a cycle.
const LAST_CYCLE_MIN_MS = 60 * 1000;

// The cycles a state history went through, as { start, end }: from the first
// state inside a cycle to the one that took the machine out of it. A gap does
// not open one, and a cycle still under way at the end is left out.
function stateRuns(entries, normOf, windowStartMs) {
  if (!Array.isArray(entries)) return [];
  const runs = [];
  let cur = null;
  entries.forEach((e) => {
    const t = 1000 * Number(e && (e.lc !== undefined ? e.lc : e.lu));
    if (!Number.isFinite(t)) return;
    const role = cycleRole(normOf(e && e.s));
    if (role === "out") {
      if (cur && cur.active) runs.push({ start: cur.start, end: t });
      cur = null;
    } else if (!cur && role !== "gap") {
      // A cycle already going when the window opens has no known start:
      // Home Assistant dates that first state to the window itself.
      cur = { start: t, active: false, cut: t <= windowStartMs + 1000 };
    }
    if (cur && role === "active" && !cur.cut) cur.active = true;
  });
  return runs;
}

// The runs of a power meter, as { start, end }: above the threshold, with the
// dips shorter than gapMs counted as pauses of the same run. The last one has
// no end while the plug still draws, or while its dip is shorter than gapMs;
// in that second case closesAt says when the dip becomes the end.
function powerRuns(entries, threshold, gapMs, nowMs, windowStartMs) {
  if (!Array.isArray(entries)) return [];
  const runs = [];
  let cur = null;
  entries.forEach((e) => {
    const t = 1000 * Number(e && (e.lc !== undefined ? e.lc : e.lu));
    const w = parseFloat(e && e.s);
    if (!Number.isFinite(t) || !Number.isFinite(w)) return;
    if (w >= threshold) {
      if (cur && cur.end !== null && t - cur.end < gapMs) cur.end = null;
      else if (!cur || cur.end !== null) {
        cur = { start: t, end: null, cut: t <= windowStartMs + 1000 };
        runs.push(cur);
      }
    } else if (cur && cur.end === null) {
      cur.end = t;
    }
  });
  runs.forEach((r) => {
    if (r.end !== null && nowMs - r.end < gapMs) {
      r.closesAt = r.end + gapMs;
      r.end = null;
    }
  });
  return runs;
}

// The last cycle that ran to its end, long enough to be one.
function lastFinishedRun(runs) {
  for (let i = runs.length - 1; i >= 0; i--) {
    const r = runs[i];
    if (r.end !== null && !r.cut && r.end - r.start >= LAST_CYCLE_MIN_MS) return r;
  }
  return null;
}

// The runs of a state history, the one still under way included, its end
// then null: what an appliance did today, it is still doing.
function stateRunsOpen(entries, normOf, windowStartMs) {
  if (!Array.isArray(entries)) return [];
  const runs = [];
  let cur = null;
  entries.forEach((e) => {
    const t = 1000 * Number(e && (e.lc !== undefined ? e.lc : e.lu));
    if (!Number.isFinite(t)) return;
    const role = cycleRole(normOf(e && e.s));
    if (role === "out") {
      if (cur) cur.end = t;
      cur = null;
    } else if (!cur && role !== "gap") {
      cur = { start: t, end: null, cut: t <= windowStartMs + 1000 };
      runs.push(cur);
    }
  });
  return runs;
}

// How long the runs lasted since fromMs, and how many began after it.
function runsSince(runs, fromMs, nowMs) {
  let ms = 0;
  let starts = 0;
  runs.forEach((r) => {
    const end = r.end === null ? nowMs : r.end;
    const start = Math.max(r.start, fromMs);
    if (end > start) ms += end - start;
    if (!r.cut && r.start >= fromMs) starts += 1;
  });
  return { ms, starts };
}

function stripAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Matching requires a word boundary before the keyword (but not necessarily
// after), so "on" matches "On"/"Ongoing" but not the "on" inside "Done" or
// "Pending". And "wash"/"dry"/"spin" still match gerund forms like
// "Washing"/"Drying"/"Spinning".
const STATE_KEYWORD_PATTERNS = Object.fromEntries(
  Object.entries(STATE_KEYWORDS).map(([norm, keywords]) => [
    norm,
    keywords.map((kw) => new RegExp(`\\b${kw}`, "i")),
  ])
);

// A state_map names its target category by hand, so a typo lands a value no
// other part of the card knows: no colour, no label, no animation. Rejecting it
// here covers all three at once, rather than adding a fallback at every read.
const MAPPABLE_STATES = Object.keys(STATE_KEYWORDS).concat("unknown");

// The steps a washer, a dryer or a dishwasher names while it runs, which the
// state line shows in place of "Running".
const CYCLE_STEPS = ["prewash", "soaking", "weighing", "filling", "washing", "rinsing",
  "draining", "spinning", "drying", "cooling", "anti_crease", "steam"];

// A state_map may name a step as well as a category, for a machine whose state
// is the step: "Drying" is a machine that is running, and which step it is at
// is read from the same entry.
const PHASE_STATE_TARGETS = Object.fromEntries(CYCLE_STEPS.map((step) => [step, "running"]));

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
  // InComfort's central_heating_wait: a demand, and no flame yet.
  if (/\bwait|_wait/.test(f)) return "waiting";
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
  // MELCloud Home's operation_status.
  hotwater: "hot_water", stop: "idle", heatroomtemperature: "space_heating", heatflowtemperature: "space_heating", heatcurve: "space_heating",
  coolroomtemperature: "cooling", coolflowtemperature: "cooling",
};
function heatPumpModeOf(raw, attrs, stateMap, modeEntity) {
  if (raw === undefined || raw === null) return "";
  const s = String(raw).trim();
  if (stateMap && Object.prototype.hasOwnProperty.call(stateMap, s)) {
    return HEAT_PUMP_MODES.includes(stateMap[s]) ? stateMap[s] : "";
  }
  const a = attrs || {};
  // On MELCloud Home, hvac_action says idle while the valve is on the tank.
  const opStatus = String(a.operation_status || "").toLowerCase();
  if (Object.prototype.hasOwnProperty.call(MELCLOUD_MODES, opStatus)) return MELCLOUD_MODES[opStatus];
  const action = String(a.hvac_action || "").toLowerCase();
  if (Object.prototype.hasOwnProperty.call(HVAC_ACTION_MODES, action)) return HVAC_ACTION_MODES[action];
  const status = String(a.status || "").toLowerCase();
  if (Object.prototype.hasOwnProperty.call(MELCLOUD_MODES, status)) return MELCLOUD_MODES[status];
  if (modeEntity) return "";
  const f = stripAccents(s).toLowerCase();
  // EMS-ESP's pool, in its languages: not the house, the raw word says it.
  if (/pool|basen|basseng|piscin|havuz|bazen|medence|zwembad/.test(f)) return "";
  // Hungarian EMS-ESP, MELCloud Home's sensor and Lambda's own short words.
  if (f === "leolvasztas") return "defrost";
  if (f === "hutes" || f === "cc" || /^cool(room|flow)/.test(f)) return "cooling";
  if (f === "melegviz" || f === "hotwater") return "hot_water";
  if (f === "futes" || /^heat(room|flow|curve)/.test(f)) return "space_heating";
  if (f === "ki" || f === "stop" || /^stby/.test(f)) return "idle";
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
const STOVE_ALARM_RE = /alarm|allarm|alarme|alarma|alert|storung|fehler|error|fault|failure|defaut|guasto|warning|pellet.?finished|firewood.?finished|out.?of.?pellet|no.?pellet|door.?open|hatch|probe|pressure|temp.?too.?high|exhaust.?temp|chimney|grate|\bt05\b|\bmem\.?.?al|\bm\.?\s?al/;
const STOVE_CLEANING_RE = /clean|pulizia|pul\.|nettoy|netoy|netoage|reinig|reining|limpi|limpeza|limpar|reng|czyszcz|brazier|brasier|brasero|creuset|bracier|bracere|brandkorf|brennt?opf|ashpan|sauber/;
const STOVE_ECO_RE = /\beco\b|ecomode|temp_ok|wait_on|wait_time|stand.?by|cool_fluid|external.?request|frost|bereithalten|etre.?pret|en.?enspera|\bwait\b|\battesa$|\batten\.?$|\bwart\.?$/;
const STOVE_COOLING_RE = /cool|raffred|refroid|kuhl|kuehl|enfria|esfriar|afkoel|shut.?down|shut.?off|burn(ing)?.?off|fire_stop|spegnimento|extinct|extincion|extincao|abschaltung|arresto|\barret\b|\bstop\b|stopp|\bsluk\b|blussen|zgasic|kachel.?stopt|loschen|eteindre|chlodz|wygasz/;
const STOVE_IGNITION_RE = /ignit|kindl|ignic|ignicao|accen|acend|allum|zund|zuend|anzuend|einschal|ontsteking|t(a|ae|\u00e6)nding|zap(l|\u0142)on|zapal|rozpal|starting|start|avvio|inicio|comece|commencez|debut|opstart|anlaufen|uruchom|load.?pellet|pellet.?load|carica|carico|carga|charge|laden|awaiting.?flame|waiting.?flame|attesa.?fiamma|atteinte.?flamme|flamme.?dans|attente.?de.?flamme|espera.?llama|llama.?a.?la.?espera|aguardando|warte|wartet|afwachting|afventer|oczekiwanie|flamm?e.?(light|licht|lumiere)|fiamma.?presente|fuoco.?presente|flamme.?presente|flamme.?vorhanden|llama.?presente|fuego.?presente|chama.?presente|vlam.?aanwezig|check.?up|kontrolle|controle|controlo|styring|lighting|fueling|heatup|ign_test|test_fire|stabili[sz]|encend|enciende/;
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
  // Mitsubishi's WF-RAC swings or leaves it to the unit.
  if (/auto$/.test(s)) return null;
  if (s === "leftright" || s === "rightleft") return axis === "h" ? 0 : null;
  // LG: Top, MiddleTop1, MiddleTop2, MiddleBottom2, MiddleBottom1, Bottom.
  const lg = /^middle(top|bottom)([12])$/.exec(s);
  if (lg && axis === "v") return lg[1] === "top" ? Number(lg[2]) + 1 : 5 - Number(lg[2]);
  // Kumo's steps between its two ends.
  if (axis === "v" && ["midhorizontal", "midpoint", "midvertical"].includes(s)) return { midhorizontal: 2, midpoint: 3, midvertical: 4 }[s];
  // MELCloud Home counts in words.
  const word = ["one", "two", "three", "four", "five"].indexOf(s);
  if (word >= 0) return axis === "v" ? word + 1 : word - 2;
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
function acFanSpeedOf(raw, pct, modes) {
  if (pct !== null && pct !== undefined) {
    if (pct <= 0) return "";
    return pct <= 20 ? "quiet" : pct <= 45 ? "low" : pct <= 70 ? "medium" : pct <= 90 ? "high" : "turbo";
  }
  const s = stripAccents(String(raw || "")).toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!s) return "";
  if (/quiet|silen|night|mute|sleep|lowest|ultralow|silence|gentle/.test(s)) return "quiet";
  if (/turbo|power|boost|max|strong|highest|super|jet|^full$/.test(s)) return "turbo";
  const n = /^(\d)$/.exec(s);
  if (n) return ["quiet", "low", "low", "medium", "high", "high"][Math.min(5, Number(n[1]))];
  // Midea's l1 to l7, Xiaomi's level1, Mysa's speed_1, MELCloud's one to five,
  // spread over the five steps the drawing has.
  const words = ["one", "two", "three", "four", "five"].indexOf(s);
  const rank = words >= 0 ? words + 1 : (/^(?:l|level|speed|fan|stage|step)(\d)$/.exec(s) || [])[1];
  if (rank) {
    // How many steps the unit has, when it lists them.
    const listed = Array.isArray(modes) ? modes.filter((m) => /^(?:l|level|speed|fan|stage|step)_?\d$/i.test(String(m).replace(/\s/g, ""))).length : 0;
    const scale = words >= 0 ? 5 : listed || 7;
    return ["quiet", "low", "medium", "high", "turbo"][Math.min(4, Math.floor((Number(rank) - 1) / scale * 5))];
  }
  if (/high/.test(s)) return "high";
  if (/low/.test(s)) return "low";
  return "medium";
}
// A preset says quiet, eco or boost on the units that keep them there.
function acPresetOf(raw) {
  const s = stripAccents(String(raw || "")).toLowerCase();
  if (/eco|econom|energy.?sav/.test(s)) return "eco";
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
  // Nest and ecobee keep a range in heat_cool, not a setpoint.
  const low = numberOrNull(a.target_temp_low), high = numberOrNull(a.target_temp_high);
  if (room !== null && target === null && low !== null && high !== null) return room < low - 0.2 ? "heat" : room > high + 0.2 ? "cool" : "idle";
  if (room === null || target === null) return state === "cool" ? "cool" : "heat";
  if (state === "cool") return room > target + 0.2 ? "cool" : "idle";
  return room < target - 0.2 ? "heat" : "idle";
}
// A preset that changes what the thermostat means: eco, away, frost guard.
function thermostatPresetOf(raw) {
  const p = stripAccents(String(raw || "")).toLowerCase();
  if (/frost|hors.?gel|anti.?gel|anti.?freeze|^ice$|antiheladas|frostschutz|vorst/.test(p)) return "frost";
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
  // No action at all (Tuya): it heats until the setpoint is reached.
  const room = numberOrNull((st.attributes || {}).current_temperature), target = numberOrNull((st.attributes || {}).temperature);
  if (state === "heat" && room !== null && target !== null) return room < target ? "heating" : "idle";
  return ["heat", "auto", "heat_cool", "on"].includes(state) ? "heating" : "";
}

// A unit at rest, in its integration's words (Systemair's manual_stop, Swegon's
// user_stop and ext_stop, Wolf's aus, a language of its own).
const AIR_STOP_RE = /^(off|stop|stopped|standby|stand_by|power_?off|0|none|aus|uit|eteint|arret|apagad[oa]?|spento|av|ingen)$|_stop$|^stopped_/;

// Air purifiers and fans. Every integration names its presets its own way
// (Levoit says sleep, Philips night, Sharp silent, Matter sleep_wind, Xiaomi
// Home translates them), so they are read by family, lowercased.
const AIR_PRESETS = {
  heat: /^(heat|heating|warm|hot)$/,
  night: /sleep|night|silent|quiet|mute|baby|idle|displayoff|nacht|nuit|noche|notte|nocturn|sommeil|schlaf|sueno|slaap|natt|sen|spanek|\u7761\u7720|\u591c\u95f4/,
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

const AQ_LABELS = { 1: "aq_good", 2: "aq_fair", 3: "aq_poor", 4: "aq_bad" };
const AQ_WORDS = {
  excellent: 1, good: 1, very_good: 1, great: 1, healthy: 1,
  fair: 2, moderate: 2, normal: 2, average: 2, acceptable: 2, satisfactory: 2, mild: 2, medium: 2,
  poor: 3, bad: 3, unhealthy: 3, slightly_unhealthy: 3, unhealthy_for_sensitive_groups: 3,
  very_poor: 4, very_bad: 4, very_unhealthy: 4, extremely_poor: 4, severe: 4, hazardous: 4, danger: 4, harmful: 4, polluted: 4,
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
  // Winix's level is an enum from 1 (good) to 4 (very poor).
  if (a.device_class === "enum" && Array.isArray(a.options) && a.options.map(String).join() === "1,2,3,4") return num;
  if (/allergen|(^|_)iai(_|$)/.test(id)) return num <= 3 ? 1 : num <= 6 ? 2 : num <= 9 ? 3 : 4;
  if (a.device_class === "pm25" || /g\/m/.test(unit)) return num <= 12 ? 1 : num <= 35.4 ? 2 : num <= 55.4 ? 3 : 4;
  if (a.device_class === "aqi" || /aqi/.test(id)) {
    if (num <= 6 && Number.isInteger(num)) return null;
    return num <= 50 ? 1 : num <= 100 ? 2 : num <= 150 ? 3 : 4;
  }
  return null;
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
  if (/frost|hors.?gel|antigel|anti.?freeze|\bice\b|away|absen|vacation|holiday|vacanc|frostschutz/.test(f)) return "frost";
  if (/eco|night|nuit|reduced|reduit|moon|sleep/.test(f)) return "eco";
  if (/comfort|confort|komfort|^home$|^heat$|^on$/.test(f)) return "comfort";
  return "";
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
  // Xiaomi's dual baskets and steam models.
  cookcancel: "off", keepwarmcancel: "off", coolingfinish: "done", coolingdown: "done", waitcooking: "delayed", waitcookingpause: "paused",
  watershortagepause: "paused", watershortpaused: "paused", watershorttimeout: "paused", standbynetworking: "off", connectedstandby: "off",
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
  if (Object.prototype.hasOwnProperty.call(FRYER_STATES, k)) return FRYER_STATES[k];
  // The same firmware word, slugged by the integration: keepwarm_finish.
  const joined = k.replace(/_/g, "");
  return Object.prototype.hasOwnProperty.call(FRYER_STATES, joined) ? FRYER_STATES[joined] : "";
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
  preparing_charging: "connected", wait_for_car: "connected", wait_car: "connected",
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
  // Read in each integration's own code. Ratio and V2C wait for a car that is
  // not there, and V2C says when one is: "Vehicle connected (idle)".
  waiting_for_vehicle: "no_vehicle", no_vehicle: "no_vehicle", cable_disconnected: "no_vehicle", not_plugged_in: "no_vehicle",
  vehicle_connected_idle: "connected", handshaking: "connected", half_connected: "connected", idle_plugged: "connected",
  connected_waiting_for_car: "connected", connected_waiting_current: "connected",
  unauthorized: "awaiting_auth", authentication_waiting: "awaiting_auth", waiting_for_release: "awaiting_auth", rfid: "awaiting_auth",
  awaiting_authentication: "awaiting_auth",
  charging_active: "charging", charging_with_cooling: "charging", charging_ventilation: "charging", boost: "charging", excess_pv: "charging",
  active: "charging", starting: "charging",
  charging_paused: "paused", charger_paused: "paused", vehicle_paused: "paused", charging_cancelled: "paused",
  queued_by_power_boost: "paused", queued_by_eco_smart: "paused", stopped: "paused", stop_charging: "paused", no_power: "paused",
  de_authorizing: "paused", de_authenticating: "paused",
  waiting_for_schedule: "scheduled",
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
  return String(raw).trim().toLowerCase().replace(/[^\p{L}\p{N}_]+/gu, "_").replace(/^_+|_+$/g, "");
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
  // Garo's RCD_FAULT, Victron's overheating_detected: every box names its
  // faults its own way.
  if (!/^no_/.test(k) && /fault|error|overheat|critical|overvolt|undervolt|residual|failed|abnormal/.test(k)) return "error";
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
const EV_NO_ERROR_RE = /^(no.?error|no.?errors|no.?fault|no.?faults|no.?alarm|no.?alarms|no.?warning|none|ok|normal|clear|good|healthy|off|false|0|-+|kein.?fehler|aucune?.?erreur|pas.?d.?erreur|sin.?error|nessun.?errore|geen.?fout|ingen.?fel|ingen.?feil|ingen.?fejl|brak.?bledu|zadna.?chyba)$/;
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
const EV_NAME_RE = /(^|[^a-z])(goe|garo|autel|trydan|v2c|evcc|warp[0-9]?|pracht)([^a-z0-9]|$)|kathrein|heidelberg.?(energy|wallbox)|amperfied|elli.?(charger|wallbox)|wall.?box|ev.?charg|car.?charg|evse|charge.?point|charging.?station|wall.?connector|ocpp|status.?connector|peblar|nrgkick|openevse|lektrico|blue.?current|webasto|easee|zaptec|go.?e.?charger|wattpilot|zappi|hypervolt|nexblue|technove|pod.?point|charge.?amps|(^|[^a-z])(ohme|keba|alfen)([^a-z]|$)|ladestation|lades(a|ae|\u00e4)ule|ladepunkt|borne.?(de.?)?recharge|laadpaal|laadpunt|laadstation|punto.?de.?recarga|estacion.?de.?carga|cargador.?(de.?)?(ve|coche|vehiculo)|colonnina|stazione.?di.?ricarica|posto.?de.?carregamento|carregador.?(de.?)?(ve|carro)|laddbox|laddstolpe|ladeboks|ladestasjon|stacja.?ladowania|nab(i|\u00ed)jec(i|\u00ed).?stanic|\u0437\u0430\u0440\u044f\u0434\u043d\u0430\u044f.?\u0441\u0442\u0430\u043d\u0446|\u5145\u7535\u6869|ev-station|ev-plug/;

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

function stateObj(hass, entityId) {
  return entityId && hass.states[entityId] ? hass.states[entityId] : null;
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
  mainwash: "mainwash",
  "main wash": "mainwash",
  wash: "mainwash",
  washing: "mainwash",
  rinse: "rinsing",
  rinsing: "rinsing",
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
  const hay = stripAccents(`${cfg.icon || ""} ${cfg.state_entity || ""} ${cfg.name || ""} ${(st && st.attributes.friendly_name) || ""}`);
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
    if (["icon", "friendly_name", "device_class", "unit_of_measurement"].includes(key)) continue;
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

// Suggested only for the types that can actually use them, so a washing
// machine doesn't end up with a "filter life" field pre-filled.
const TYPE_AUTO_PATTERNS = {
  water_pump: {
    pressure_entity: /pressure|pression|druck|presion|pressione|druk|tryck|trykk|cisnien|tlak/i,
    level_entity: /^(?!.*(batter|signal|rf_)).*(level|niveau|hauteur|pegel|nivel|livello|niva|poziom|hladina)/i,
    high_level_entity: /^(?!.*(batter|signal|rf_)).*(high|alarm|haut|alert|hoch|flood|inond)/i,
    // A Grundfos Alpha3 over ESPHome.
    head_entity: /(^|[._])head$/i,
    flow_entity: /(^|[._])flow(_rate)?$/i,
    speed_entity: /(^|[._])speed$|rpm/i,
    voltage_entity: /voltage/i,
  },
  spa: {
    // Balboa's and Gecko's massage pumps; the circulation one runs all day.
    bubbles_entity: /^(?!.*(circ|filter)).*(bubble|bulle|blase|burbuj|bolle|jet|massage|whirl|pump|pompe|pumpe|blower|soufflant)/i,
    temperature_entity: /temp/i,
    light_entity: /light|lamp|led/i,
  },
  sauna: { temperature_entity: /temp/i },
  filament_dryer: { temperature_entity: /temp/i, humidity_entity: /humid|hygro/i, remaining_time_entity: /remain|time_left|restant/i },
  floor_heating: { temperature_entity: /temp/i },
  aquarium: { temperature_entity: /temp|^climate\./i },
  mobility: { battery_entity: /batter|akku|(^|[._])soc([._]|$)/i },
  // linkytic's tarif_option is the contract, ptec the period running now.
  meter: { tariff_entity: /^(?!.*(option|index)).*(tarif|ptec|period|hchp|tempo)/i },
  diffuser: {
    light_entity: /light|lumiere|licht|luz|luce|lamp|led|night/i,
    tank_empty_entity: /tank|water|lack|empty|vide|leer|vacio/i,
  },
  // Vallox, Zehnder, Danfoss: four temperatures, a bypass or a cell state, a
  // filter, an airflow.
  hrv: {
    outdoor_temperature_entity: /^(?!.*(fan|rpm|cfm|flow|humid|duty|speed|power|energy))(.*(outdoor|outside|exterieur|aussen|frisch|fresh)|.*temp\w*_ext)/i,
    supply_temperature_entity: /^(?!.*(fan|rpm|cfm|flow|humid|duty|speed|power|energy)).*(supply|soufflage|zuluft|insufl|impuls|mandata|toevoer|tillu)/i,
    extract_temperature_entity: /^(?!.*(fan|rpm|cfm|flow|humid|duty|speed|power|energy)).*(extract|reprise|abluft|extrac|ripresa|afzuig|franlu|indoor|inside)/i,
    exhaust_temperature_entity: /^(?!.*(fan|rpm|cfm|flow|humid|duty|speed|power|energy)).*(exhaust|rejet|fortluft|expuls|espuls|afvoer|avlu)/i,
    // Renson's activation temperature and Vallox's lock are no bypass.
    bypass_entity: /^(?!.*(temp|activation|lock|timeout|threshold)).*(bypass|by.?pass|cell.?state)/i,
    // Flexit's operating hours count up: they are no life left.
    filter_life_entity: /^(?!.*(operating|hours|usage)).*(filter|filtre)/i,
    // Renson's total_airflow_out is the extract side, ComfoConnect's constraint no flow.
    airflow_entity: /^(?!.*(exhaust|extract|stale|rejet|abluft|fortluft|vicie|_out(_|$)|constraint)).*(air.?flow|debit|luftmenge|caudal|portata|m3|(supply|fresh|soufflage|zuluft).*(cfm|flow))/i,
    // Broan / Venmar over ESPHome: each fan's rpm and the air it moves.
    supply_fan_entity: /(supply|fresh|soufflage|zuluft|insufl).*(rpm|fan.?speed|air.?speed)/i,
    exhaust_fan_entity: /(exhaust|extract|stale|rejet|abluft|fortluft|vicie).*(rpm|fan.?speed|air.?speed)/i,
    exhaust_airflow_entity: /(exhaust|extract|stale|rejet|abluft|fortluft|vicie).*(cfm|flow|debit|m3)|air.?flow.?out/i,
  },
  // Arlo calls its sensors motion_camera_x and connected_camera_x, Reolink
  // and Tapo name a privacy switch, and most of them an infrared mode.
  camera: {
    // Frigate's person count is a number, its motion a contact.
    motion_entity: /^(?!sensor\..*(count|last|sensitiv)).*(motion|mouvement|bewegung|movimiento|movimento|person|human)/i,
    // Reolink's record switches are settings, on all the time.
    recording_entity: /^(?!switch\.)(?!.*(audio|capacity|oldest|mode|last)).*(record|enregistr|aufnahme|grabac)/i,
    night_entity: /night|nuit|infra.?red|(^|[._])ir([._]|$)|nacht|notte|noche|is_dark/i,
    privacy_entity: /privacy|confidential|privat|lens.?mask/i,
    battery_entity: /batter|akku/i,
    signal_entity: /signal|rssi|wifi/i,
    connectivity_entity: /connect|online/i,
    // Ring's ding and Nest's chime, whole words: recording holds a "ding".
    ring_entity: /^(?!.*record).*(ring|visitor|visiteur|doorbell|sonnette|klingel|press|appui)|(^|[._])(ding|chime)([._]|$)/i,
  },
  // A mailbox: a counter of the mail, and a contact on each door.
  mailbox: {
    mail_count_entity: /count|compteur|zahl|contador|contatore|teller|licznik|nombre/i,
    front_door_entity: /front|avant|vorn|delanter|anterior|voor|flap|clapet|slot|fente/i,
    back_door_entity: /back|rear|arriere|hinten|traser|posterior|achter|empt|vidage/i,
  },
  solar: {
    // The inverter's total, not one string nor what the battery or the house do.
    power_entity: /^(?!.*(batter|grid|load|storage|consum|today|daily|total|energy|max|peak|pv\d)).*((solar|pv|production|produced|inverter|onduleur|generation).*(power|watt)|(power|watt).*(solar|pv|production)|(^|[._])ac.?power|output.?power)/i,
    energy_today_entity: /(today|daily|aujourd|heute|_day_|jour).*(energy|kwh|production|yield)|(energy|production|yield).*(today|daily|aujourd|heute|jour)|(energy|yield)_?day$/i,
    solar_alert_entity: /error|fault|alarm|defaut/i,
  },
  home_battery: {
    battery_entity: /battery_?level|state_?of_?charge|(^|[._])soc([._]|$)|batter/i,
    // One signed power, the battery's and nobody else's (Huawei, Tesla).
    power_entity: /^(?!.*(solar|pv\d?_|grid|load|house|home_)).*(charge.?(or.?)?discharge.?power|(batter|storage).*(power|watt))/i,
    // Huawei's charge/discharge power is one signed sensor: it is power_entity.
    charge_power_entity: /^(?!.*dis)(?!.*out).*(charg|input|_in_|total_in).*(power|watt)/i,
    discharge_power_entity: /^(?!.*charge.?(or.?)?discharge)(?!.*in.?out).*(discharg|output|_out_|total_out).*(power|watt)/i,
    reserve_entity: /reserve|backup/i,
    charge_limit_entity: /charge_?limit|max_?charge|charge_?level_?max/i,
    battery_alert_entity: /error|fault|alarm|defaut/i,
  },
  pool_pump: {
    // Pentair's water temperature is only on its climate entity.
    water_temperature_entity: /(water|eau|wasser|agua|acqua).*temp|temp.*(water|eau|wasser|agua|acqua)|^climate\.(?!.*spa)/i,
    air_temperature_entity: /(air|luft|aire|aria).*temp|temp.*(air|luft|aire|aria)/i,
    ph_entity: /(^|[._])ph([._]|$)|ph_corr/i,
    redox_entity: /redox|orp/i,
    filtration_time_entity: /filtration|filter_?time|run_?time/i,
    pressure_entity: /pressure|pression|druck/i,
    pool_mode_entity: /mode/i,
    chlorine_pump_entity: /chlor|electroly|dosing|dosage/i,
    backwash_entity: /backwash|contre_?lavage/i,
    frost_entity: /frost|freez|hors_?gel|antigel/i,
    light_entity: /light|lamp|lampe|projecteur|spot/i,
  },
  // Withings names its sensors in the user's language as well: fat_mass,
  // masse_musculaire, taux_de_graisse, weight_goal.
  scale: {
    weight_goal_entity: /goal|objectif|ziel|target|cible|obiettivo|objetivo/i,
    fat_ratio_entity: /fat.?(ratio|percent|pct)|taux.?de.?graisse|body.?fat|fettanteil|grasa.?corporal|grasso.?corporeo/i,
    fat_mass_entity: /^(?!.*(free|maigre|frei|ratio|taux)).*(fat.?mass|masse.?grasse|fettmasse|masa.?grasa|massa.?grassa)/i,
    muscle_mass_entity: /muscle|musculaire|muskel|muscular|muscolare/i,
    bone_mass_entity: /bone|osseuse|knochen|osea|ossea/i,
  },
  // NUT names its sensors in the user's language: "ups_charge" is the load in
  // French, "ups_charge_de_la_batterie" the battery.
  ups: {
    // apcupsd calls it battery, its own "bcharge" in the raw names.
    battery_entity: /^(?!.*(low|faible|niedrig))((?=.*(batt|akku)).*(charge|ladung|carica|carga|lading)|.*(battery$|bcharge))/i,
    runtime_entity: /^(?!.*(low|faible|niedrig|bas)).*(runtime|autonomie|laufzeit|autonomia|time.?left)/i,
    load_entity: /^(?!.*batt).*(^|[._])(load|charge|last|carico|carga|belastning|obciazenie)$/i,
    input_voltage_entity: /^(?!.*(nominal|transf)).*(input.?voltage|tension.?d.?entree|eingangsspannung)/i,
  },
  robot: {
    // Ecovacs's station_state, Dreame's state carry the washing and the emptying.
    robot_status_entity: /status|activity|phase|etat|(^|[._])state$/i,
    battery_entity: /batter|akku/i,
    robot_bin_entity: /bin_?full|dust_?bin_?full|box_?full/i,
    // Roborock's water_box_attached is on while the box is in place, its
    // dirty_box_full the wrong tank.
    robot_water_entity: /^(?!.*(attached|carriage|dirty)).*(water_?(shortage|box|tank|level)|low_?water|mop_?water|clean_?water|(^|[._])tank_level)/i,
    robot_clean_mode_entity: /clean\w*.?mode|mode.?(de.?)?nettoy|reinigungs.?modus/i,
    robot_error_entity: /error|erreur|fault/i,
    robot_rain_entity: /rain|pluie|regen/i,
  },
  oven: {
    // A meat probe has a target and a reading of its own.
    target_temperature_entity: /^(?!.*(probe|core|meat|food)).*(target.?temp|setpoint|temperature_setting)/i,
    current_temperature_entity: /^(?!.*(target|setpoint|probe|core|meat|food)).*(current.?temp|cavity.?temp|temperature)/i,
    light_entity: /light|lamp/i,
  },
  microwave: {
    power_level_entity: /power.?level|watt.?level/i,
  },
  hood: {
    // Home Connect's program_progress sits on a device named hood.
    fan_entity: /^fan\.|fan.?(speed|level)|venting/i,
    light_entity: /light|lamp/i,
    filter_life_entity: /filter/i,
  },
  cooktop: {
    child_lock_entity: /child.?lock|lock/i,
  },
  fridge: {
    fridge_temperature_entity: /^(?!.*(freez|congel|gefrier|vriezer|target|setpoint|set_)).*((fridge|refriger|frigo|cooler|kuhl|koel).*temp|temp.*(fridge|refriger|frigo|cooler)|^climate\..*(fridge|refriger|frigo|cooler))/i,
    freezer_temperature_entity: /^(?!.*(target|setpoint|set_)).*((freez|congel|gefrier|vriezer).*temp|temp.*(freez|congel|gefrier|vriezer)|^climate\..*(freez|congel|gefrier|vriezer))/i,
    // The freezer's door is a field of its own (hOn's door_open_freezer).
    door_entity: /^(?!.*(lock|alarm|assistant|freez|congel)).*door/i,
    freezer_door_entity: /freez.*door|door.*freez|congel.*door|door.*congel/i,
    ice_maker_entity: /ice.?maker|ice/i,
  },
  washer: {
    phase_entity: PHASE_ENTITY_RE,
  },
  dryer: {
    phase_entity: PHASE_ENTITY_RE,
  },
  dishwasher: {
    phase_entity: PHASE_ENTITY_RE,
  },
  kettle: {
    // Tuya's number is the setpoint.
    temperature_entity: /^sensor\.(?!.*(target|set|boiling)).*(temperature|water.?temp)/i,
  },
  water_heater: {
    // ViCare and Overkiz list the outside, the setpoints and the boiler too.
    temperature_entity: /^(?!.*(target|set|min|max|outside|outdoor|room|ambient|supply|flow|return|boiler|compressor))(.*(dhw|tank|cylinder|storage|water).*temp|.*[._]temperature$)/i,
    // A contact, not ViCare's "heating gas consumption".
    heating_entity: /^(binary_sensor|switch|input_boolean)\..*(heating|chauffe)/i,
  },
  // Octopus Energy names both a live and a lifetime reading, and its flow
  // temperature is a target: only the live ones say what the pump does now.
  heat_pump: {
    temperature_entity: /^(?!.*(target|setpoint|fixed)).*(flow|supply|leaving|outlet|vorlauf|depart).*temp/i,
    // The water coming back is the unit's inlet, which is what HeishaMon and
    // the Aquarea integrations call it.
    return_temperature_entity: /^(?!.*(target|setpoint|fixed)).*(return|inlet|ruck|rueck|retour|retorno|ritorno|retur).*temp/i,
    outdoor_temperature_entity: /outdoor|outside|exterieur|aussen/i,
    // A flow rate, never the flow temperature, nor HeishaMon's flow rate mode.
    water_flow_entity: /^(?!.*(temp|mode)).*(pump.?flow|water.?flow|flow.?rate|debit|caudal|durchfluss|portata)/i,
    compressor_entity: /^(?!.*(temp|pressure|control|state$)).*(compressor|compresseur|kompressor|compresor)(?!.*(power|current|energy|hours|starts|count))/i,
    fan_speed_entity: /fan.?\d?.?(motor)?.?(speed|rpm)|ventilateur.*vitesse|luefter.?drehzahl/i,
    heat_output_entity: /^(?!.*lifetime).*heat.?(power.?)?(output|produc)/i,
    cop_entity: /(^|[._])cop$/i,
    power_entity: /^(?!.*lifetime).*(power.?input|heat.?power.?consum|_power$|power_w$|watt)/i,
    // HeishaMon: the valves, and what each circuit draws and makes.
    hot_water_entity: /3.?way.?valve|three.?way/i,
    heating_entity: /2.?way.?valve|two.?way/i,
    cooling_entity: /2.?way.?valve|two.?way/i,
    cooling_power_entity: /cool\w*.?power.?consum/i,
    cooling_output_entity: /cool\w*.?power.?produc/i,
    hot_water_power_entity: /(dhw|hot.?water).?power.?consum/i,
    hot_water_output_entity: /(dhw|hot.?water).?power.?produc/i,
  },
  boiler: {
    thermostat_entity: /^climate\./i,
    // EMS-ESP's selflowtemp is a setpoint, ViCare lists the outside too.
    temperature_entity: /^(?!.*(target|set|sel|outside|outdoor|room|return|ret|dhw|min|max|rate)).*(flow|supply|depart|boiler.?temp|[._]temperature$)/i,
    hot_water_entity: /^(?!.*(temp|set|flow|press|gas|consum|energy|power|hours|starts|valve)).*(hot.?water|dhw|eau.?chaude|tap.?water)/i,
    heating_entity: /^(?!.*(temp|set|flow|press|gas|consum|energy|power|hours|starts|valve)).*(central.?heating|chauffage|heating.?active)/i,
  },
  cooker: {
    target_temperature_entity: /target.?temp|setpoint/i,
    current_temperature_entity: /current.?temp|^(?!.*target).*temperature/i,
    speed_entity: /speed|vitesse|drehzahl/i,
  },
  // Names read in the integrations' code. Targets come as sensors or
  // numbers, and a control is a button or a script, never the start_time
  // sensor that OctoPrint and Bambu Lab also have.
  printer_3d: {
    progress_entity: /progress|percent_?complete|job_percentage/i,
    remaining_time_entity: /remaining|time_left|estimated_finish|print_finish|end_time|print_eta/i,
    program_entity: /task_name|gcode_file|file_?name|current_file(?!_size)|job_name/i,
    phase_entity: /current_stage/i,
    nozzle_temperature_entity: /^sensor\.(?!.*(target|min|max)).*(nozzle|extruder|hotend|tool0).*temp/i,
    nozzle_target_entity: /(nozzle|extruder|hotend|tool0).*target|target.*(nozzle|extruder|hotend|tool0)/i,
    bed_temperature_entity: /^sensor\.(?!.*target).*(heatbed|hotbed|[._]bed).*temp/i,
    bed_target_entity: /(heatbed|hotbed|[._]bed).*target|target.*(heatbed|hotbed|[._]bed)/i,
    chamber_temperature_entity: /^sensor\.(?!.*target).*(chamber|box|enclosure).*temp/i,
    current_layer_entity: /current_layer|working_layer/i,
    total_layers_entity: /total_layer/i,
    ams_humidity_entity: /^sensor\..*ams.*humidity(?!.?index)/i,
    ams_drying_entity: /^binary_sensor\..*ams.*drying/i,
    light_entity: /^(light|switch)\..*(light|led)/i,
    start_entity: /^(button|script)\.(?!.*restart).*start/i,
    pause_entity: /^(button|script)\..*pause/i,
    resume_entity: /^(button|script)\..*(resume|continue)/i,
    stop_entity: /^(button|script)\..*(?<!emergency_)(stop|cancel)/i,
    power_entity: /^sensor\.(?!.*(extruder|bed|chamber|heater|nozzle)).*(_power$|power_w$|watt)/i,
  },
  // A feeder's own words, read on an Aqara over Zigbee2MQTT and on a Tuya.
  // The schedule is only suggested when a readable one exists: the raw one is
  // a Python repr, which belongs in a template rather than on a card.
  pet_feeder: {
    start_entity: /^(button|script|automation|select|number)\.(?!.*(cancel|disable|enable|delete|skip|schedule|plan|reset|desiccant|restart)).*(feed|start|distribu|croquette|portion)/i,
    portions_today_entity: /portions?.?(per.?day|today|du.?jour)|distributions?.?(per.?day|today|du.?jour)|today.?s.?feeding.?times/i,
    weight_today_entity: /weight.?(per.?day|today)|poids.?du.?jour|today.?s.?feeding.?quantity|food.?dispensed.?today/i,
    last_feed_entity: /last.?(feed|feeding|meal)/i,
    portion_weight_entity: /portion.?weight|poids.?(d.)?une?.?portion/i,
    serving_size_entity: /serving.?size|feeding.?size|taille.*portion/i,
    schedule_entity: /schedule.?(pretty|text|readable)|planning/i,
    error_entity: /error|fault|defaut/i,
    level_entity: /food.?(level|remain|status|low)|level.?(of.)?food|lack.?of.?food|niveau.*croquette|remaining.?food/i,
  },
  // A fountain's wear counters and their reset buttons, by the words the
  // Tuya, Petkit and Xiaomi integrations use.
  pet_fountain: {
    filter_life_entity: /^sensor\..*filter.?(day|life|remain|time|percent|left|duration)|^sensor\..*filter$/i,
    filter_reset_entity: /^(button|script|switch)\..*(reset.?filter|filter.?reset)/i,
    pump_clean_entity: /^sensor\..*(pump.?(clean|day|time|remain|duration)|remain.?clean|clean.?(day|time|left)|cleaning.?day)/i,
    pump_reset_entity: /^(button|script|switch)\..*(reset.?pump|pump.?reset|reset.?clean|clean.?reset|cleaning.?reset)/i,
    water_level_entity: /water.?(level|shortage|lack|state|percent)|low.?water|lack.?(of.?water|.?warning)|no.?water|weight.?percent|tank.?(low|empty|state)|remaining.?water/i,
    pump_running_entity: /pump.?(running|run$|status|state)|watering.?status|^binary_sensor\..*pump$/i,
  },
  // Names read in the integrations' code: Palazzetti, Micronova's Agua IOT,
  // Edilkamin, Rika Firenet, Duepi EVO. The status sits next to a climate
  // entity, which is the one a stove is usually put on a dashboard with. A
  // stove's power is a stage from 1 to 5, never a wattage, so the meter
  // pattern is narrowed to the words that only a meter uses.
  pellet_stove: {
    phase_entity: /(status|stove_state|operational_phase|burner_status)$/i,
    current_temperature_entity: /room.?temp|temp_air$|air.?temp|ambient/i,
    target_temperature_entity: /target.?temp|setpoint|set.?temp/i,
    flue_temperature_entity: /smoke|flue|flu.?gas|exhaust.?temp|gas.?flue|fumi|fumee/i,
    power_level_entity: /combustion.?power|power.?level|real.?power|actual.?power|(^|[._])power$/i,
    fan_speed_entity: /fan.?(left|right|front|rear|\d)?.?speed|fan.?mode|vent.?(front|rear)|^fan\./i,
    level_entity: /pellet.?(level|quantity)|pellets?.?depleted|ris_pellet|[._]tank$/i,
    error_entity: /alarm|error.?code|nb.?alarms/i,
    power_entity: /power_w$|watt|electric/i,
  },
  // Philips calls the basket a drawer and Xiaomi a pot; VeSync sets its
  // temperature, Xiaomi counts the time left.
  air_fryer: {
    remaining_time_entity: /time.?to.?end|remaining|left.?time|time.?left|time.?remaining/i,
    target_temperature_entity: /target.?temp|set.?temp|cook.?temp/i,
    current_temperature_entity: /current.?temp|work.?temp/i,
    basket_entity: /drawer|basket|pot.?out|pull.?out/i,
    shake_entity: /shake|flip/i,
  },
  // VeSync keeps each part of a humidifier in its own entity (#89).
  humidifier: {
    current_humidity_entity: /^(?!.*(target|set)).*(humidity$|current.?humid|humidite$)/i,
    mist_level_entity: /mist|fog.?level|spray(ing)?.?(level|volume)|brume/i,
    night_light_entity: /night.?light|mood.?light|veilleuse|ambient.?light/i,
    display_entity: /^(?!.*auto.?off).*(display|screen|backlight|[._]led($|_)|ecran)/i,
    low_water_entity: /low.?water|water.?(lack|shortage|empty)|no.?water|tank.?empty|manque.?d.?eau/i,
    tank_lifted_entity: /lifted|detached|tank.?(removed|missing|off)|water.?tank$/i,
    water_level_entity: /water.?level|niveau.?d.?eau/i,
  },
  // Midea LAN and Tuya keep the tank apart, as a contact or a level.
  dehumidifier: {
    tank_entity: /tank.?(full|level)|water.?(tank|level|full)|bucket|full.?tank/i,
    current_humidity_entity: /(current|indoor|room).?humid/i,
    fan_speed_entity: /fan.?(speed|mode|level)|wind.?speed|(^|_)speed$|^fan\./i,
    power_entity: /power$|power_w$|watt/i,
  },
  // The air a purifier measures, its night mode and its heater, by the names
  // VeSync, Philips, Dyson, Winix and Xiaomi give them.
  air_purifier: {
    air_quality_entity: /^sensor\..*(pm.?2.?5|air.?quality|aqi|allergen)/i,
    night_mode_entity: /^(switch|binary_sensor)\..*(night|sleep)/i,
    heater_entity: /^climate\./i,
  },
  fan: {
    light_entity: /^light\./i,
    night_mode_entity: /^(switch|binary_sensor)\..*(night|sleep)/i,
  },
  // Names read in the integrations: Panasonic Comfort Cloud keeps its vanes
  // and nanoe in selects and switches, Midea LAN its wind angles, and most
  // report the outdoor unit's temperature apart. Gree calls its ioniser the
  // health mode.
  air_conditioner: {
    vane_vertical_entity: /vertical.?(swing|vane|louver|direction|position)|(swing|vane|louver|airflow).?vertical|wind.?ud|up.?down|updown/i,
    vane_horizontal_entity: /horizontal.?(swing|vane|louver|direction|position)|(swing|vane|louver|airflow).?horizontal|wind.?lr|left.?right|leftright/i,
    purifier_entity: /nanoe|plasma|ioni[sz]|anion|streamer|purif|air.?clean|health|sante/i,
    outdoor_temperature_entity: /outdoor|outside|exterieur|aussen/i,
    current_temperature_entity: /inside.?temp|indoor.?temp|room.?temp/i,
    defrost_entity: /defrost|degivr|abtau/i,
    power_entity: /(current|real(.?time)?).?power|power_w$|watt/i,
  },
  // Names read in the integrations: the plug of the Tesla Wall Connector and
  // OpenEVSE, the cable of a Modbus box, the session of OCPP, Peblar, Tesla,
  // NRGkick and OpenEVSE, their current limits and their meters. A box can
  // be restarted or reset by a button: neither is the start or the stop of a
  // charge, and a phase's power is not the total.
  ev_charger: {
    vehicle_entity: /vehicle.?connected(?!.?since)|cable.?state|plug.?state|vehicle.?status|(ev|car).?connected/i,
    session_energy_entity: /session.?energy|energy.?session|charged.?energy|added.?energy|(usage|energy).?this.?session/i,
    current_limit_entity: /^(number|input_number)\..*(current.?limit|charge.?limit|max(imum)?.?current|charging.?current|charge.?rate|dynamic.?limit)/i,
    error_entity: /error.?code|fault.?code|active.?errors/i,
    power_entity: /^sensor\.(?!.*(factor|limit|offered|reactive|apparent|phase|discharg|powershare|export|_l[123](_|$))).*(active.?power|charging.?power|total.?power|current.?power|power.?active.?import|power.?total|_power$|power_w$)/i,
    discharge_power_entity: /^sensor\.(?!.*(factor|limit|reactive|apparent|[._]m(ax|in)(imum)?[._]|_l[123](_|$))).*(power.?active.?export|export.?power|discharg\w*.?power|powershare.*power)/i,
    start_entity: /^(button|script|switch)\.(?!.*(restart|delay)).*start/i,
    stop_entity: /^(button|script|switch)\.(?!.*(restart|reset)).*stop/i,
  },
  // Hydrawise, Rachio, Rain Bird, LinkTap.
  irrigation: {
    zone_entity: /zone|station/i,
    rain_delay_entity: /rain.?(delay|sensor)|rainsensor|^binary_sensor\..*[._]rain$/i,
    soil_moisture_entity: /soil|moisture|humidite.?sol/i,
    next_run_entity: /next.?(run|cycle|water)/i,
    watering_duration_entity: /(total|watering).?duration/i,
  },
  // Z2M's battery_low, X-Sense's and Nest's battery.
  detector: {
    battery_entity: /batter/i,
    co_level_entity: /(^|[._])co([._]|$)|carbon.?monoxide|co.?level|co.?ppm/i,
  },
  // PSN's and Xbox's now_playing, Nintendo's screen time.
  console: {
    game_entity: /now.?playing|current.?game|game.?title/i,
    playtime_entity: /(play|online|screen).?time/i,
  },
  // Litter-Robot, PetKit, Tuya's bag_full, Neakasa.
  litter_box: {
    waste_drawer_entity: /waste.?(drawer|bin|bucket)|wastebin|bag.?full/i,
    litter_level_entity: /litter.?level|sand.?(level|percent|lack)/i,
    pet_weight_entity: /(pet|cat).?weight/i,
    visits_entity: /visits|times.?used|excretion.?times/i,
    cat_present_entity: /cat.?(present|detected)|toilet.?occupied/i,
    last_use_entity: /last.?(seen|visit|used)/i,
  },
  // Xiaomi's cooker counts the time left.
  rice_cooker: { remaining_time_entity: /left.?time|time.?left|remain/i },
  // Fully Kiosk's tablet.
  screen: {
    screensaver_entity: /screensaver$/i,
    charging_entity: /plugged/i,
    url_entity: /current_page/i,
    brightness_entity: /screen_brightness/i,
    screenshot_entity: /screenshot/i,
    reload_entity: /load_start_url/i,
    restart_entity: /restart_browser/i,
  },
  coffee: {
    water_entity: /water.?tank|water.?level|reservoir/i,
    beans_entity: /beans?.?(container|empty|lack|level)/i,
    // Full, whichever container fills first, not De'Longhi's tray in place.
    tray_entity: /^(?!.*missing).*(grounds?.?container|capsule.?container|waste.?container|drip.?tray|tray)/i,
    // What says it is due, not Nespresso's brews since nor De'Longhi's count.
    descaling_entity: /^binary_sensor\..*(descal|calc)|^sensor\.(?!.*(count|done|progress|since|until|days|counter|autonomy)).*(descal|calc)/i,
    // An option, not Home Connect's lifetime count of hot water cups.
    cups_entity: /^(select|number|switch|input_\w+)\..*(cups|multiple.?beverages|tasses)|cup.?(number|count)/i,
    strength_entity: /strength|bean.?amount|force/i,
  },
};

// Eight extra info lines at most: past that the card turns into a list, so
// the ninth and after are ignored, by the card and by the editor alike. Past
// five, the lines tighten up so that eight still read as a card.
const INFO_MAX = 8;
const INFO_COMPACT_ABOVE = 5;

const INFO_PATTERNS = [
  { re: /temperature/i, icon: "mdi:thermometer" },
  { re: /spin/i, icon: "mdi:rotate-3d-variant" },
  { re: /steam/i, icon: "mdi:weather-fog" },
];

// A network device's readings, found on its own device and on the devices that
// hang from it: Synology gives each disk and each volume a device of its own,
// UGREEN, Unraid and Glances name them on the device itself.
function netSuggest(hass, cfg) {
  const anchor = anchorEntity(hass, { ...cfg, disk1_entity: undefined, disk2_entity: undefined, disk3_entity: undefined, disk4_entity: undefined });
  if (!anchor) return {};
  const reg = hass.entities && hass.entities[anchor];
  const dev = reg && reg.device_id;
  const devices = hass.devices || {};
  const ofDevice = (d) => Object.keys(hass.entities || {}).filter((id) => hass.entities[id].device_id === d && hass.states[id]);
  const nameOf = (d) => String((devices[d] && (devices[d].name_by_user || devices[d].name)) || "").trim().toLowerCase();
  // A router's tracker makes a device of its own for the NAS, under the same
  // name: the readings are on the other one.
  const devs = dev ? [dev].concat(Object.keys(devices).filter((d) => d !== dev && nameOf(d) && nameOf(d) === nameOf(dev)
    && !devices[d].via_device_id)) : [];
  const own = devs.length ? [...new Set(devs.flatMap(ofDevice))] : siblingEntityIds(hass, anchor).filter((id) => hass.states[id]);
  const children = Object.keys(devices).filter((d) => devs.includes(devices[d].via_device_id));
  const pool = [...new Set(own.concat(...children.map(ofDevice)))];
  const attr = (id) => hass.states[id].attributes || {};
  const words = (id) => stripAccents(`${id.split(".")[1] || ""} ${String(attr(id).friendly_name || "")}`.toLowerCase());
  const sensor = (id) => domainOf(id) === "sensor";
  const pct = (id) => sensor(id) && attr(id).unit_of_measurement === "%";
  const notDisk = (id) => !NET_DISK_TOKEN_RE.test(id.split(".")[1] || "");
  const patch = {};
  const set = (field, id) => { if (id && !cfg[field]) patch[field] = id; };
  const cpu = (id) => pct(id) && /cpu|processor|processeur|prozessor/.test(words(id)) && !/user|utilisateur|system|iowait|temp|freq/.test(words(id));
  set("cpu_entity", pool.find((id) => cpu(id) && /total/.test(words(id))) || pool.find(cpu));
  set("memory_entity", pool.find((id) => pct(id) && /memory|memoire|(^|[\s_])(ram|mem)([\s_]|$)|speicher/.test(words(id)) && !/swap|echange/.test(words(id))));
  set("volume_entity", pool.find((id) => pct(id) && /volume|pool|storage|stockage|disk_use|array/.test(words(id)) && !/memory|memoire|swap|cpu/.test(words(id))));
  const rate = (id) => sensor(id) && notDisk(id) && (attr(id).device_class === "data_rate" || NET_RATE_BITS[attr(id).unit_of_measurement] !== undefined)
    && !/read|write|lecture|ecriture|iops/.test(words(id));
  set("download_entity", pool.find((id) => rate(id) && /download|telecharg|(^|[\s_])rx|receiv|recu|ingress|(^|_)in(_|$)/.test(words(id))));
  set("upload_entity", pool.find((id) => rate(id) && /upload|transfert|(^|[\s_])tx|sent|send|envoi|egress|(^|_)out(_|$)/.test(words(id))));
  set("temperature_entity", own.find((id) => sensor(id) && attr(id).device_class === "temperature" && notDisk(id)));
  set("fan_speed_entity", pool.find((id) => sensor(id) && /rpm/i.test(String(attr(id).unit_of_measurement || ""))));
  set("ports_entity", pool.find((id) => sensor(id) && /ports?_?(up|active|actifs|connected|online|in_use)|(active|connected|up)_?ports/.test(words(id))));
  set("poe_entity", pool.find((id) => sensor(id) && /poe/.test(words(id)) && /^k?W$/.test(String(attr(id).unit_of_measurement || ""))));
  set("problem_entity", own.find((id) => domainOf(id) === "binary_sensor" && notDisk(id) && ["problem", "safety"].includes(attr(id).device_class)));
  // A router: how many clients, the internet link and the main Wi-Fi.
  if (netLayoutOf(cfg, hass.states[cfg.state_entity]) === "router") {
    const clients = (id) => sensor(id) && Number.isFinite(Number(hass.states[id].state)) && /client|connected|connectes|appareils|devices/.test(words(id))
      && !/guest|invite|iot|wired|cable|filaire|main|principal/.test(words(id));
    set("clients_entity", pool.find((id) => clients(id) && /total/.test(words(id))) || pool.find(clients));
    set("wan_entity", own.find((id) => domainOf(id) === "binary_sensor" && attr(id).device_class === "connectivity")
      || pool.find((id) => sensor(id) && /internet|wan/.test(words(id)) && !/port/.test(words(id)) && /status|etat|state/.test(words(id))));
    set("wifi_entity", own.find((id) => domainOf(id) === "switch" && /wi.?fi|wlan/.test(words(id)) && !/guest|invite|wps/.test(words(id))));
  }
  if (![1, 2, 3, 4].some((i) => cfg[`disk${i}_entity`])) {
    // A disk is best shown by its status, else by its temperature.
    const pick = (ids) => ids.find((id) => sensor(id) && !Number.isFinite(Number(hass.states[id].state)) && !/temp/.test(id))
      || ids.find((id) => sensor(id) && attr(id).device_class === "temperature") || ids[0];
    const lastNumber = (str) => { const m = String(str).match(/(\d+)\D*$/); return m ? parseInt(m[1], 10) : 0; };
    let disks = children
      .map((d) => ({ d, name: stripAccents(String(hass.devices[d].name_by_user || hass.devices[d].name || "").toLowerCase()) }))
      .filter((x) => /(disk|disque|drive|laufwerk|festplatte|disco|dysk|hdd|ssd|bay|baie)\D*\d+/.test(x.name))
      .sort((a, b) => lastNumber(a.name) - lastNumber(b.name))
      .map((x) => pick(ofDevice(x.d)));
    if (!disks.length) {
      const groups = new Map();
      for (const id of own) {
        const m = (id.split(".")[1] || "").match(NET_DISK_TOKEN_RE);
        if (!m) continue;
        const key = m[0].replace(/^_/, "");
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(id);
      }
      disks = [...groups.keys()].sort((a, b) => (lastNumber(a) - lastNumber(b)) || a.localeCompare(b)).map((k) => pick(groups.get(k)));
    }
    disks.filter(Boolean).slice(0, 4).forEach((id, i) => { patch[`disk${i + 1}_entity`] = id; });
  }
  return patch;
}

// EMS-ESP names a heat pump's entities after their telegram fields, the same
// in every language it speaks: hptc1 is the heat carrier going out, hptc0 the
// one coming back, hpcurrpower what the compressor draws, hppower the heat it
// gives. The generic patterns would take curflowtemp for the flow, which on a
// heat pump is the boiler module's sensor, often down in a buffer tank.
const EMS_HP_FIELDS = {
  compressor_entity: "hpcompon",
  temperature_entity: "hptc1",
  return_temperature_entity: "hptc0",
  power_entity: "hpcurrpower",
  heat_output_entity: "hppower",
  water_flow_entity: "pc0flow",
  fan_speed_entity: "fanspd",
  outdoor_temperature_entity: "outdoortemp",
};
function emsSuggest(hass, cfg, siblings, domains) {
  const m = /^sensor\.(.*?)hpactivity$/.exec(String(cfg.state_entity || ""));
  if (!m) return {};
  const patch = {};
  for (const [field, key] of Object.entries(EMS_HP_FIELDS)) {
    if (cfg[field]) continue;
    const id = siblings.find((e) => (e.split(".")[1] || "") === m[1] + key
      && (domains[field] || []).includes(domainOf(e)));
    if (id) patch[field] = id;
  }
  return patch;
}

// The start every id of a device shares, cut at a word.
function commonPrefixOf(ids) {
  const objects = ids.map((id) => id.split(".")[1] || "");
  if (objects.length < 3) return "";
  let words = objects[0].split("_");
  for (const o of objects.slice(1)) {
    const w = o.split("_");
    let i = 0;
    while (i < words.length && i < w.length && words[i] === w[i]) i += 1;
    words = words.slice(0, i);
  }
  // At least one word must be left of the shortest id.
  const shortest = Math.min(...objects.map((o) => o.split("_").length));
  if (words.length >= shortest) words = words.slice(0, shortest - 1);
  return words.length ? `${words.join("_")}_` : "";
}

const SHARED_FIELDS = ["heating_entity", "cooling_entity"];
// Whether an entity's unit and class can be what a field reads. No unit says
// nothing: a template or a word is left to its name.
function fieldFits(hass, field, id) {
  const dom = domainOf(id);
  const a = (hass.states[id] && hass.states[id].attributes) || {};
  const dc = a.device_class;
  if (field === "battery_entity" && dom === "binary_sensor") return dc === "battery";
  if (!["sensor", "number", "input_number"].includes(dom)) return true;
  const u = String(a.unit_of_measurement || "").toLowerCase();
  if (/temperature_entity$/.test(field)) return (!u || /\u00b0|^c$|^f$|^k$/.test(u)) && (!dc || dc === "temperature");
  if (field === "battery_entity") return (!u || u === "%") && (!dc || dc === "battery");
  if (/(^|_)power_entity$/.test(field)) return (!u || /^(m|k|g)?w$/.test(u)) && (!dc || dc === "power");
  if (/humidity_entity$/.test(field)) return (!u || u === "%") && (!dc || dc === "humidity");
  if (field === "progress_entity") return !u || u === "%";
  if (field === "remaining_time_entity") return !["%", "w", "kw", "kwh", "wh", "l", "kg", "g", "km", "m"].includes(u) && !/\u00b0/.test(u);
  return true;
}

// The sections live in the editor, which is a file of its own in a release:
// it hands them over, since only the editor ever asks for suggestions.
function autoSuggest(hass, cfg, sectionsFor) {
  if (!cfg.state_entity || !hass.states[cfg.state_entity]) return {};
  const siblings = siblingEntityIds(hass, cfg.state_entity).filter((id) => id !== cfg.state_entity);
  const type = detectApplianceType(cfg, hass.states[cfg.state_entity]);
  // Only ever fill fields the current type actually shows: a suggestion the
  // editor then hides is just a stray key in the user's YAML. Nor one its own
  // picker would refuse: a sensor whose name says start is no start button.
  const sections = sectionsFor(type, cfg);
  const allowed = new Set(sections.map((s) => s.field));
  const domains = Object.fromEntries(sections.map((s) => [s.field, s.includeDomains]));
  // A type's own fields choose first: the generic ones would take a session's
  // energy for the meter's.
  const patterns = { ...(TYPE_AUTO_PATTERNS[type] || {}) };
  for (const [field, re] of Object.entries(AUTO_PATTERNS)) if (!patterns[field]) patterns[field] = re;
  const patch = type === "heat_pump" ? emsSuggest(hass, cfg, siblings, domains) : {};
  // On an EMS-ESP heat pump curflowtemp is never the pump's flow, even when
  // hptc1 is missing: better no flow than the buffer tank's.
  const emsHeatPump = type === "heat_pump" && /^sensor\..*hpactivity$/.test(String(cfg.state_entity || ""));
  for (const f of Object.keys(patch)) if (!allowed.has(f)) delete patch[f];
  // A machine whose name says it washes and dries gets the option written
  // down, so that the editor shows it ticked and the YAML says what the card
  // is doing, rather than both relying on the name for ever.
  if (type === "washer" && cfg.washer_dryer === undefined && isWasherDryer(cfg, hass.states[cfg.state_entity])) {
    patch.washer_dryer = true;
  }
  // The words the device's own name brings to every id of the device: on a
  // fridge, "fridge_power" holds "fridge" without being about it. An id is
  // tried without them first.
  const prefix = commonPrefixOf(siblings.concat(cfg.state_entity));
  const bare = (id) => prefix ? `${domainOf(id)}.${(id.split(".")[1] || "").slice(prefix.length)}` : id;
  const ownReading = (hass.states[cfg.state_entity].attributes || {}).current_temperature;
  for (const [field, re] of Object.entries(patterns)) {
    if (cfg[field] || patch[field] || !allowed.has(field)) continue;
    // A water_heater carries its own reading.
    if (field === "temperature_entity" && ["water_heater", "kettle"].includes(type) && ownReading !== undefined && ownReading !== null) continue;
    // A field does not take what another has: a fridge's and a freezer's
    // temperature are two entities. A valve says both heating and cooling.
    const used = new Set(Object.entries(patch).concat(Object.entries(cfg))
      .filter(([k]) => !(SHARED_FIELDS.includes(k) && SHARED_FIELDS.includes(field))).map(([, v]) => v));
    const fit = siblings.filter((id) => domains[field].includes(domainOf(id)) && !used.has(id) && fieldFits(hass, field, id)
      && !(emsHeatPump && field === "temperature_entity" && /(^|[._])curflowtemp$/.test(id)));
    const match = fit.find((id) => re.test(bare(id))) || fit.find((id) => re.test(id));
    if (match) patch[field] = match;
  }
  if (type === "network") Object.assign(patch, netSuggest(hass, cfg));
  // An entity already given a field of its own would only repeat itself.
  const takenIds = () => new Set(Object.values(patch).concat(Object.values(cfg)).flat());
  // Home Connect's alerts, on an empty list only.
  if (!alertsArray(cfg.alerts_entities).length) {
    const taken = takenIds();
    const found = siblings.filter((id) => !taken.has(id) && isEventAlert(hass, id)).slice(0, ALERTS_MAX);
    if (found.length) patch.alerts_entities = found;
  }
  if (!cfg.info_entities || !cfg.info_entities.length) {
    const taken = takenIds();
    const infos = [];
    for (const { re, icon } of INFO_PATTERNS) {
      const match = siblings.find((id) => re.test(id) && !taken.has(id));
      if (match) infos.push({ entity: match, icon });
    }
    if (infos.length) patch.info_entities = infos;
  }
  return patch;
}

// ---------------------------------------------------------------------------
// Appliance types
// ---------------------------------------------------------------------------

// What each type can express. Drives both the illustration and which sections
// the visual editor offers: a hood has no program, no remaining time and no
// door, and a cooktop has no cycle at all, so offering those fields anyway
// would only be noise.
const TYPE_CAPS = {
  washer: { cycle: true, door: true },
  dryer: { cycle: true, door: true },
  dishwasher: { cycle: true, door: true },
  oven: { cycle: true, door: true, temperature: true, light: true, heating: true },
  microwave: { cycle: true, door: true, powerLevel: true },
  hood: { fan: true, light: true, filter: true, boost: true },
  cooktop: { zones: true, childLock: true },
  // A fridge never stops, so it has no cycle, no program and nothing to press.
  // What it has is a health summary, which is what its state line carries.
  fridge: { fridgeTemp: true, door: true, freezerDoor: true, ice: true, readOnly: true },
  kettle: { kettleTemp: true },
  // Robot cuiseur. Bosch ships one (the Cookit) but it has no keys at all in
  // the public Home Connect API (only an icon in the docs stylesheet), and
  // Thermomix and Cookeo have no official integration either. So the options
  // stay generic on purpose: whatever an owner can expose, plus a smart plug.
  cooker: { cycle: true, temperature: true, heating: true, speed: true },
  // Coffee machine, the opposite case: Home Connect exposes it in detail, and
  // the three consumables below are the reason to put one on a dashboard.
  coffee: { cycle: true, consumables: true },
  // Rice cooker. Everything it reports already exists on the card: MIoT gives
  // status, cook-mode and left-time, which are the state, the program and the
  // remaining time. It needs a drawing of its own and nothing else.
  rice_cooker: { cycle: true, temperature: true, heating: true },
  // A storage tank. It heats or it waits, and the water temperature is the one
  // reading worth having. Nothing to program and no cycle to count down.
  water_heater: { tankTemp: true },
  // A combi boiler, which is not a tank: the same flame serves the radiators or
  // the taps, and which one is the whole story.
  boiler: { boilerMode: true },
  // An air-to-water heat pump: the radiators, the hot water tank, and the
  // outdoor unit that sometimes has to melt its own ice.
  heat_pump: { heatPump: true },
  // A 3D printer: a job with a progress and a remaining time like any cycle,
  // two heaters to bring up to temperature first, and often a chamber light.
  printer_3d: { cycle: true, light: true, printer3d: true },
  // A pet feeder. It sits idle almost all the time, so it is read like a
  // fridge rather than run like a washer: no cycle, no programme, no door.
  // What matters is how much was served today and when the last meal was.
  pet_feeder: { petFeeder: true },
  // A pet fountain. It runs all day, so like a feeder it is read rather than
  // run: the water flowing, the filter and the pump that wear, and the water
  // left in the tank when the fountain knows it.
  pet_fountain: { petFountain: true },
  // An iron, on its own or on the base of a steam generator. Nothing connects
  // one to Home Assistant, so it is read from the smart plug it is on, which
  // is why it is there: an iron left on is the one an owner worries about.
  iron: { iron: true },
  // A toaster, read from its plug like the iron: it waits, it toasts, and the
  // slices pop up. Nothing reports a toaster to Home Assistant on its own.
  toaster: { toaster: true },
  // A hair dryer, read from its plug: the fan alone draws a few dozen watts,
  // the heater a thousand more, so the meter tells cool air from hot.
  hair_dryer: { hairDryer: true },
  // A switch, a server, a NAS or a rack: nothing to run, only to read. It is
  // online, busy or in alert, and its LEDs say why.
  network: { network: true, readOnly: true },
  // A robot: a vacuum, a mop or a mower. Nothing to count down, but a base
  // it leaves and comes back to, and a station that sometimes has work of its
  // own.
  robot: { robot: true },
  // A pool pump: it filters, rests, backwashes or keeps the frost out, and its
  // pool has a light.
  pool_pump: { poolPump: true, light: true },
  // Solar panels: they produce, a little or a lot, or rest at night. Nothing
  // to start or stop, only to read.
  solar: { solar: true, readOnly: true },
  // A home battery, on a wall or on wheels: it charges, discharges or rests,
  // and keeps a reserve for a power cut.
  home_battery: { homeBattery: true, readOnly: true },
  // A bathroom scale: the last weight, how far the goal is, and what the body
  // is made of.
  scale: { scale: true },
  // A UPS: on mains or on its battery, how long that battery would last, and
  // what it carries.
  ups: { ups: true },
  // A camera: whether it watches, streams or records, what it has seen, and
  // its privacy mode. Never its picture: Home Assistant has cards for that.
  camera: { camera: true },
  // A lamp: on or off, how bright, in what colour, and its effect.
  lamp: { lamp: true },
  // A mailbox: empty or with mail in it, and its doors.
  mailbox: { mailbox: true, readOnly: true },
  // An essential oil diffuser: its mist, continuous or now and then, its
  // light, and its tank.
  diffuser: { diffuser: true, light: true },
  // Heat recovery ventilation: fresh air in through the exchanger, stale air
  // out, a bypass for the summer nights and a filter to change.
  hrv: { hrv: true },
  // Ten drawings from the HACF thread: two pumps, underfloor heating, a spa,
  // a sauna, an aquarium, an electricity meter and a Christmas tree.
  water_pump: { ntPump: true },
  floor_heating: { ntFloor: true },
  spa: { ntSpa: true },
  sauna: { ntSauna: true },
  filament_dryer: { ntDryer: true },
  aquarium: { ntAqua: true },
  meter: { ntMeter: true, readOnly: true },
  christmas_tree: { ntTree: true },
  // A scooter, a bike, a gyropode or a motorcycle on its charger (#72).
  mobility: { ntMobility: true },
  // Watering, a self-cleaning litter box, a smoke, CO or leak detector, a
  // speaker.
  irrigation: { ntIrrigation: true },
  litter_box: { ntLitter: true },
  detector: { ntDetector: true },
  speaker: { ntSpeaker: true },
  // A game console, on PlayStation Network, Xbox, the PS4 integration or a plug.
  console: { ntConsole: true },
  // The heating of #81 to #84: a buffer tank, a fresh water station, solar
  // thermal collectors and a log stove, read from their temperatures.
  storage_tank: { readOnly: true },
  fresh_water_station: { readOnly: true },
  solar_thermal: { readOnly: true },
  wood_stove: { readOnly: true },
  humidifier: { ntHumidifier: true },
  // A thermostat on the wall or a valve on a radiator: the room, the
  // setpoint, and whether it calls for heat. A climate entity says it all.
  thermostat: { thermostat: true, readOnly: true },
  // A television, a projector or a computer, read from its plug: what it
  // draws at rest is its standby, and a media player says what it shows.
  screen: { screen: true },
  // An air purifier: it runs, sleeps or heats, its fan blows forward or back
  // and turns from side to side, and its gauge reads the air it cleans.
  air_purifier: { airPurifier: true },
  // A fan on its stand, on a desk or on the ceiling: a speed, a preset, an
  // oscillation, and for the ceiling a direction and often a light.
  fan: { fanAppliance: true },
  // A pellet stove: a fire behind glass, a hopper of pellets beside it, and a
  // display that names the phase. No cycle and no programme, but a status that
  // says more than on and off: lighting, burning, modulating, the eco pause,
  // the cool-down and the cleaning of the burn pot.
  pellet_stove: { pelletStove: true },
  // A split air conditioner's indoor unit: the mode it cools, heats, dries or
  // blows in, the vanes that point the air and the fan that pushes it. No
  // cycle, and a climate entity usually says everything else.
  air_conditioner: { airConditioner: true },
  // A portable dehumidifier: the humidity it aims at and the tank it fills.
  dehumidifier: { dehumidifier: true },
  // A small room heater, blowing or oil-filled, on a thermostat or a plug.
  space_heater: { spaceHeater: true },
  // A towel warmer, driven by the pilot wire's modes.
  towel_warmer: { towelWarmer: true },
  // An air fryer: a cycle with a temperature, a basket that comes out and,
  // on the Philips, a reminder to shake it.
  air_fryer: { cycle: true, temperature: true, airFryer: true },
  // An EV charger on the wall: no cycle to count down, but a car that is
  // there or not, a charge that runs, pauses or is done, and the energy and
  // the current that go with it.
  ev_charger: { evCharger: true },
};
const APPLIANCE_TYPES = Object.keys(TYPE_CAPS);
const LAUNDRY_TYPES = ["washer", "dryer", "dishwasher"];
// Fields no other type has. Their presence identifies a fridge on its own,
// which matters because a fridge is the one type that can be configured
// without a state entity at all.
const FRIDGE_ONLY_FIELDS = [
  "fridge_temperature_entity",
  "freezer_temperature_entity",
  "freezer_door_entity",
  "ice_maker_entity",
  "fridge_layout",
];

// How long a feeder that does not say so is drawn serving.
const FEED_PULSE_MS = 30000;

// Same for a pet feeder: nothing else counts portions.
const FEEDER_ONLY_FIELDS = [
  "feeder_layout",
  "portions_today_entity",
  "weight_today_entity",
  "portion_weight_entity",
  "serving_size_entity",
  "last_feed_entity",
  "level_b_entity",
];

// Same for a pet fountain: nothing else has a pump to clean.
const FOUNTAIN_ONLY_FIELDS = ["fountain_layout", "pump_clean_entity", "pump_reset_entity", "water_level_entity", "pump_running_entity"];

// Same for a 3D printer: nothing else has a nozzle or a print bed.
// A flue gas reading belongs to a fire, and the only fire the card draws is a
// stove's.
const STOVE_ONLY_FIELDS = ["flue_temperature_entity"];
// And vanes point the air of an air conditioner only.
const AC_ONLY_FIELDS = ["vane_vertical_entity", "vane_horizontal_entity", "purifier_entity"];
// A gauge of the air and the shape of a purifier belong to a purifier, and
// the shape of a fan, its blades and its oscillation to a fan.
// The domains a type's main entity may be, besides a sensor: a tank, a
// combi boiler and a heat pump are often their integration's own water_heater
// or climate entity, a stove, an air conditioner and a heater their climate
// entity, a dehumidifier its humidifier entity, a towel warmer a select on
// its pilot wire; and the ones that live on a smart plug may be read from the
// plug itself.
const STATE_DOMAINS = {
  thermostat: ["climate"],
  hood: ["fan", "switch", "select"], kettle: ["water_heater", "switch"],
  water_heater: ["water_heater"], boiler: ["water_heater", "climate"], heat_pump: ["climate", "water_heater"],
  pellet_stove: ["climate"], air_conditioner: ["climate", "select", "switch"], dehumidifier: ["humidifier", "switch"], humidifier: ["humidifier", "switch", "fan", "input_boolean"],
  space_heater: ["climate", "switch"], towel_warmer: ["climate", "select", "switch"], iron: ["switch"], toaster: ["switch"], hair_dryer: ["switch"], air_fryer: ["switch"],
  screen: ["switch", "media_player", "input_boolean", "binary_sensor"],
  air_purifier: ["fan", "switch", "select", "climate"], fan: ["fan", "switch"],
  pet_fountain: ["switch", "fan", "input_boolean"],
  pet_feeder: ["switch", "select", "input_select", "input_boolean"],
  network: ["device_tracker", "switch", "input_boolean"],
  robot: ["vacuum", "lawn_mower", "select", "input_select"],
  pool_pump: ["switch", "binary_sensor", "select", "input_select", "input_boolean", "fan"],
  camera: ["camera", "switch", "binary_sensor", "input_boolean"],
  lamp: ["light", "switch", "input_boolean"],
  mailbox: ["binary_sensor", "input_boolean", "sensor", "counter", "input_number", "switch"],
  diffuser: ["fan", "switch", "select", "input_select", "humidifier", "input_boolean"],
  hrv: ["fan", "climate", "select", "input_select", "switch", "input_boolean"],
  water_pump: ["switch", "binary_sensor", "input_boolean", "sensor"],
  floor_heating: ["climate", "switch", "input_boolean", "binary_sensor"],
  spa: ["climate", "water_heater", "switch", "input_boolean", "binary_sensor"],
  sauna: ["climate", "switch", "input_boolean", "binary_sensor"],
  filament_dryer: ["switch", "sensor", "binary_sensor", "input_boolean", "climate", "select"],
  aquarium: ["light", "switch", "input_boolean"],
  meter: ["sensor"],
  christmas_tree: ["light", "switch", "input_boolean"],
  mobility: ["switch", "input_boolean", "binary_sensor", "sensor"],
  irrigation: ["valve", "switch", "binary_sensor", "input_boolean", "sensor"],
  litter_box: ["sensor", "vacuum", "binary_sensor", "select", "switch"],
  detector: ["binary_sensor", "sensor", "input_boolean"],
  speaker: ["media_player"],
  console: ["media_player", "sensor", "switch", "binary_sensor", "device_tracker", "input_boolean"],
  storage_tank: ["sensor", "number", "input_number", "water_heater"],
  fresh_water_station: ["sensor", "binary_sensor", "switch"],
  solar_thermal: ["binary_sensor", "switch", "sensor"],
  wood_stove: ["sensor", "binary_sensor", "switch", "input_boolean", "climate"],
};
// A model, a picture, the players it shows and a session lock belong to a
// screen.
const SCREEN_ONLY_FIELDS = ["screen_layout", "laptop_style", "laptop_color", "screen_image", "media_entity", "media2_entity", "media3_entity", "lock_entity", "source_entity",
  "screensaver_entity", "charging_entity", "url_entity", "brightness_entity", "last_interaction_entity", "reload_entity",
  "restart_entity", "screenshot_entity"];
// Ports, bays, disks and traffic belong to a network device.
const NETWORK_ONLY_FIELDS = ["network_layout", "switch_ports", "bays", "busy_threshold", "temperature_alert", "cpu_entity",
  "memory_entity", "volume_entity", "download_entity", "upload_entity", "ports_entity", "ports_total", "poe_entity",
  "problem_entity", "disk1_entity", "disk2_entity", "disk3_entity", "disk4_entity", "clients_entity", "wan_entity", "wifi_entity"];
const SCREEN_MEDIA_FIELDS = ["media_entity", "media2_entity", "media3_entity"];
const PURIFIER_ONLY_FIELDS = ["purifier_layout", "air_quality_entity", "display_entity"];
const FAN_ONLY_FIELDS = ["fan_layout", "wood_blades", "fan_direction_inverted", "oscillating"];
// A water tank and a humidity reading belong to a dehumidifier, and the
// choice of a heater's model to a heater.
const DEHUMIDIFIER_ONLY_FIELDS = ["tank_entity", "current_humidity_entity"];
// A basket, and the reminder to shake it, belong to an air fryer.
const FRYER_ONLY_FIELDS = ["fryer_layout", "basket_entity", "shake_entity", "basket2_state_entity"];
// A car at the plug, the energy of a charging session and a current limit
// belong to a charger. Like a fridge, it can do without a state entity: the
// plug and the power meter are enough.
const EV_ONLY_FIELDS = ["vehicle_entity", "session_energy_entity", "current_limit_entity", "discharge_power_entity"];
// What a card with no state entity reads in its place, first to last, and
// so what a tap on it opens: a charger's meter or plug, a fridge's probes,
// doors or meter, a feeder's counters or its button.
const NO_STATE_SOURCES = {
  ev_charger: ["power_entity", "vehicle_entity"],
  fridge: ["fridge_temperature_entity", "freezer_temperature_entity", "door_entity", "freezer_door_entity", "ice_maker_entity",
    "power_entity"],
  pet_feeder: ["portions_today_entity", "weight_today_entity", "last_feed_entity", "portion_weight_entity", "serving_size_entity",
    "start_entity"],
  screen: ["power_entity", "media_entity", "media2_entity", "media3_entity"],
  hair_dryer: ["power_entity"],
  network: ["cpu_entity", "download_entity", "volume_entity", "ports_entity", "power_entity"],
  pool_pump: ["power_entity", "water_temperature_entity"],
  solar: ["power_entity", "energy_today_entity"],
  home_battery: ["battery_entity", "power_entity", "charge_power_entity", "discharge_power_entity"],
  ups: ["input_voltage_entity", "battery_entity"],
};
function noStateSourceOf(cfg, type) {
  const field = (NO_STATE_SOURCES[type] || []).find((f) => cfg[f]);
  return field ? cfg[field] : undefined;
}
const PRINTER_ONLY_FIELDS = [
  "nozzle_temperature_entity",
  "nozzle_target_entity",
  "bed_temperature_entity",
  "bed_target_entity",
  "chamber_temperature_entity",
  "current_layer_entity",
  "total_layers_entity",
  "printer_layout",
  "printed_part",
  "printer_style",
  "ams_entities",
  "ams_position",
  "ams_humidity_entity",
  "ams_drying_entity",
];

// The compact modes: "hide" draws no appliance, the card's original compact
// mode; "side" draws it small on the left, with the text beside it. Both
// move the buttons and the corner switches up onto the name's line.
// The drawing's size, 0.3 to 1.2 times its own, the text left as it is.
function illustrationSizeOf(v) {
  const n = parseFloat(v);
  if (!isFinite(n) || n <= 0) return 1;
  return Math.round(Math.min(1.6, Math.max(0.3, n)) * 100) / 100;
}

// The text's size, 0.7 to 1.4 times its own, the drawing left as it is.
function fontScaleOf(v) {
  const n = parseFloat(v);
  if (!isFinite(n) || n <= 0) return 1;
  return Math.round(Math.min(1.4, Math.max(0.7, n)) * 100) / 100;
}

// Whether a compact card's lines are shown, as this browser left them. The
// key is the card's own entity, so two cards of the same appliance agree.
function linesKey(cfg) {
  return `ha-appliance-card:lines:${cfg.state_entity || cfg.power_entity || cfg.name || cfg.appliance_type || ""}`;
}
function linesOpenStored(cfg) {
  try {
    const v = globalThis.localStorage && globalThis.localStorage.getItem(linesKey(cfg));
    return v === null || v === undefined ? cfg.compact_lines_open === true : v === "1";
  } catch (e) {
    return cfg.compact_lines_open === true;
  }
}
function linesOpenStore(cfg, open) {
  try {
    if (globalThis.localStorage) globalThis.localStorage.setItem(linesKey(cfg), open ? "1" : "0");
  } catch (e) { /* a private window keeps it for the page only */ }
}
function compactModeOf(v) {
  const s = String(v === undefined || v === null ? "" : v).trim().toLowerCase();
  if (s === "side") return "side";
  return v === true || s === "true" || s === "hide" ? "hide" : "";
}

// The type menu, by family, each sorted by its name in the user's language:
// thirty types in one list were hard to find one's way in.
const TYPE_GROUPS = [
  ["laundry", ["washer", "dryer"]],
  ["kitchen", ["dishwasher", "oven", "microwave", "hood", "cooktop", "fridge", "kettle", "cooker", "coffee", "rice_cooker", "air_fryer", "toaster"]],
  ["heating", ["water_heater", "boiler", "heat_pump", "thermostat", "pellet_stove", "space_heater", "towel_warmer", "floor_heating", "storage_tank", "fresh_water_station", "wood_stove"]],
  ["air", ["air_conditioner", "dehumidifier", "humidifier", "air_purifier", "fan", "diffuser", "hrv"]],
  ["home", ["screen", "iron", "hair_dryer", "printer_3d", "filament_dryer", "robot", "pool_pump", "scale", "camera", "lamp", "mailbox", "water_pump", "spa", "sauna", "aquarium", "christmas_tree", "mobility", "irrigation", "detector", "speaker", "console"]],
  ["energy", ["solar", "solar_thermal", "home_battery", "ev_charger", "meter"]],
  ["pets", ["pet_feeder", "pet_fountain", "litter_box"]],
  ["network", ["network", "ups"]],
];

function caps(type) {
  return TYPE_CAPS[type] || TYPE_CAPS.washer;
}

const RICE_COOKER_RE = /rice.?cooker|ricecooker|pre.?cooker|cuiseur.?(a.?)?riz|reiskocher|arrocera|cuociriso|rijstkoker|multicooker.?rice/;
// VeSync's air fryer reports a cook status; so do ovens and hobs, by name.
const COOK_STATUS_RE = /^(?!.*(oven|four|hob|cooktop|microwave|cooker|kettle|coffee)).*cook(ing)?.?status/;
function optionsInclude(st, words) {
  const options = st && st.attributes && Array.isArray(st.attributes.options) ? st.attributes.options.map((o) => String(o).toLowerCase()) : [];
  return words.every((w) => options.includes(w));
}
// Names that say an air conditioner only where one can live: a solar
// inverter's ac_power is alternating current.
const AC_WORD_RE = /(^|[\s._])ac([\s._]|$)/;
function detectApplianceType(cfg, st) {
  if (cfg.appliance_type && cfg.appliance_type !== "auto") return cfg.appliance_type;
  // A humidifier by its own fields or its entity's class, before a humidity
  // sensor makes a dehumidifier of it. Essential oil diffusers often report
  // as humidifiers too, and keep their drawing.
  if (HUMIDIFIER_ONLY_FIELDS.some((f) => cfg[f])) return "humidifier";
  // VeSync gives its humidifiers no class at all: the domain says it, unless
  // the name or the action say it dries.
  if (st && domainOf(cfg.state_entity) === "humidifier" && !DIFFUSER_ONLY_FIELDS.some((f) => cfg[f])) {
    const named = stripAccents(`${cfg.state_entity || ""} ${st.attributes.friendly_name || ""} ${cfg.name || ""}`).toLowerCase();
    const dc = st.attributes.device_class;
    if (!DIFFUSER_NAME_RE.test(named) && (dc === "humidifier" || (!dc && !/dehumid|deshumid|entfeucht|deumidif|ontvocht|avfukt|affugt|osuszacz|odvlh|\u9664\u6e7f/.test(named) && st.attributes.action !== "drying"))) return "humidifier";
  }
  if (st && domainOf(cfg.state_entity) === "humidifier" && st.attributes.device_class === "dehumidifier") return "dehumidifier";
  // A fridge-only field settles it before any name matching: those keys mean
  // nothing on the other seven types, and a fridge may have no state entity
  // whose name could be matched in the first place.
  if (FRIDGE_ONLY_FIELDS.some((f) => cfg[f])) return "fridge";
  if (PRINTER_ONLY_FIELDS.some((f) => cfg[f])) return "printer_3d";
  if (FEEDER_ONLY_FIELDS.some((f) => cfg[f])) return "pet_feeder";
  if (FOUNTAIN_ONLY_FIELDS.some((f) => cfg[f])) return "pet_fountain";
  if (STOVE_ONLY_FIELDS.some((f) => cfg[f])) return "pellet_stove";
  if (AC_ONLY_FIELDS.some((f) => cfg[f])) return "air_conditioner";
  // A humidity sensor is a dehumidifier's, unless the fields of a
  // ventilation unit say otherwise (#54).
  if (DEHUMIDIFIER_ONLY_FIELDS.some((f) => cfg[f]) && !HRV_ONLY_FIELDS.some((f) => cfg[f])) return "dehumidifier";
  if (cfg.heater_layout) return "space_heater";
  if (cfg.toaster_layout) return "toaster";
  if (cfg.kettle_layout) return "kettle";
  if (cfg.coffee_layout) return "coffee";
  if (cfg.boiler_layout) return "boiler";
  if (cfg.towel_warmer_layout) return "towel_warmer";
  if (cfg.hair_dryer_layout || cfg.heat_threshold) return "hair_dryer";
  if (SCREEN_ONLY_FIELDS.some((f) => cfg[f])) return "screen";
  if (NETWORK_ONLY_FIELDS.some((f) => cfg[f])) return "network";
  if (ROBOT_ONLY_FIELDS.some((f) => cfg[f])) return "robot";
  if (POOL_ONLY_FIELDS.some((f) => cfg[f])) return "pool_pump";
  if (SOLAR_ONLY_FIELDS.some((f) => cfg[f])) return "solar";
  if (BATTERY_ONLY_FIELDS.some((f) => cfg[f])) return "home_battery";
  if (SCALE_ONLY_FIELDS.some((f) => cfg[f])) return "scale";
  if (UPS_ONLY_FIELDS.some((f) => cfg[f])) return "ups";
  if (CAMERA_ONLY_FIELDS.some((f) => cfg[f])) return "camera";
  if (LAMP_ONLY_FIELDS.some((f) => cfg[f])) return "lamp";
  if (MAILBOX_ONLY_FIELDS.some((f) => cfg[f])) return "mailbox";
  if (DIFFUSER_ONLY_FIELDS.some((f) => cfg[f])) return "diffuser";
  if (HRV_ONLY_FIELDS.some((f) => cfg[f])) return "hrv";
  for (const [ty, fields] of Object.entries(NT_ONLY_FIELDS)) if (fields.some((f) => cfg[f] !== undefined && cfg[f] !== "")) return ty;
  {
    // A spa, a sauna, an aquarium, a meter, a Christmas tree and the rest of
    // the HACF drawings by their name, before a light makes a lamp of them.
    const named = stripAccents(`${cfg.icon || ""} ${cfg.state_entity || ""} ${(st && st.attributes.friendly_name) || ""} ${cfg.name || ""}`).toLowerCase();
    for (const [ty, re] of NT_NAME_RES) if (re.test(named)) return ty;
    // Gecko calls its spa nothing but its name: the icon says it.
    if (st && st.attributes.icon === "mdi:hot-tub") return "spa";
  }
  // Home Assistant has a domain of its own for each of them. A valve is a
  // tap unless it says gas.
  if (domainOf(cfg.state_entity) === "valve" && !(st && st.attributes.device_class === "gas")) return "irrigation";
  if (["vacuum", "lawn_mower"].includes(domainOf(cfg.state_entity))) return "robot";
  if (domainOf(cfg.state_entity) === "camera") return "camera";
  if (domainOf(cfg.state_entity) === "light") return "lamp";
  // A smoke, CO, gas or water sensor by its device class (X-Sense gives none,
  // only its alarm_status); a media player that is no television. A player
  // nothing says anything about is a screen: Apple TV, Cast and Plex name no
  // class. It is never a washing machine.
  if (domainOf(cfg.state_entity) === "binary_sensor" && (["smoke", "carbon_monoxide", "gas", "moisture"].includes(String((st && st.attributes.device_class) || "")) || /_alarm_status$/.test(String(cfg.state_entity)))) return "detector";
  if (domainOf(cfg.state_entity) === "media_player" && st && st.attributes.device_class !== "tv"
    && (st.attributes.device_class === "speaker" || /sonos|homepod|echo|nest.?(audio|mini)|google.?home|speaker|enceinte|lautsprecher|altavoz|altoparlante|soundbar|barre.?de.?son|music.?assistant|airplay|snapcast|bose|wiim|bluesound|linkplay|heos|denon|marantz|yamaha|hivi/.test(stripAccents(`${cfg.state_entity} ${st.attributes.friendly_name || ""}`).toLowerCase()))) return "speaker";
  if (domainOf(cfg.state_entity) === "media_player" && st) return st.attributes.device_class === "receiver" ? "speaker" : "screen";
  {
    // A diffuser and a ventilation unit by their name or their maker's.
    const named = stripAccents(`${cfg.icon || ""} ${cfg.state_entity || ""} ${(st && st.attributes.friendly_name) || ""}`).toLowerCase();
    if (DIFFUSER_NAME_RE.test(named)) return "diffuser";
    if (HRV_NAME_RE.test(named)) return "hrv";
    if (MAILBOX_NAME_RE.test(named)) return "mailbox";
  }
  if (PURIFIER_ONLY_FIELDS.some((f) => cfg[f])) return "air_purifier";
  if (FAN_ONLY_FIELDS.some((f) => cfg[f])) return "fan";
  if (FRYER_ONLY_FIELDS.some((f) => cfg[f])) return "air_fryer";
  if (EV_ONLY_FIELDS.some((f) => cfg[f])) return "ev_charger";
  const hay = `${cfg.icon || ""} ${cfg.state_entity || ""} ${(st && st.attributes.icon) || ""}`.toLowerCase();
  // Before everything else: a printer's entities are named after its maker or
  // its software, and a Bambu Lab one after its model ("p1s_...", "a1_...").
  if (/3d.?print|print.?3d|printer-3d|octoprint|prusa|bambu|klipper|moonraker|creality|elegoo|centauri|anycubic|kobra|flashforge|snapmaker|voron|reprap|duet3d|ultimaker|dremel|mainsail|neptune.?[1-4]|saturn.?[1-4]|(^|[\s._])mars.?[1-5]|(^|[\s._])k[12]_(plus|max|pro|se)|(^|[\s._])(x1c|x1e|p1s|p1p|p2s|a1|a1_mini|a1mini|a2l|h2c|h2d|h2dpro|h2s|x2d)_|(^|[\s.])x1_(?!carbon|yoga|nano|extreme)|(^|[\s._-])ender[._-]?\d/.test(hay)) return "printer_3d";
  // An EV charger, by its name in any language, by its maker's or its
  // integration's, or by the icon of a charging station. "Charger" alone
  // could be a phone's on a plug, so it needs its car. An integration that
  // names its device after its model or its serial still lists its states.
  if (EV_NAME_RE.test(hay) || evOptionsSayCharger(st)) return "ev_charger";
  // An air fryer, by its name in any language, by Cosori's maker name, or by
  // the cook_status VeSync gives it. Before the oven and the microwave, since
  // plenty of them are sold as air fryer ovens.
  // A hair dryer, before the tumble dryer that "dryer" and "seche" would make
  // of it.
  if (HAIR_DRYER_RE.test(hay)) return "hair_dryer";
  // A rice cooker before it: Xiaomi's says cook_status too.
  if (RICE_COOKER_RE.test(hay)) return "rice_cooker";
  if (COOK_STATUS_RE.test(hay) || optionsInclude(st, ["preheat_end"])) return "air_fryer";
  if (/air.?fr[iy]er|airfryer|friteuse|fritteuse|hei(ss|\u00df)luft|freidora|fritadeira|friggitrice|frituurpan|frytkownic|frit[e\u00e9]z|cosori|\u7a7a\u6c14\u70b8|\u0430\u044d\u0440\u043e\u0433\u0440\u0438\u043b|\u0430\u044d\u0440\u043e\u0444\u0440\u0438\u0442/.test(hay)) return "air_fryer";
  // A pet fountain, by its name in any language. Before the feeder, since a
  // maker that sells both often puts the word pet in front of each.
  if (/fountain|eversweet|trinkbrunnen|wasserbrunnen|fontaine|abreuvoir|fuente|bebedero|fontanella|drinkfontein|font(a|\u00e4)n|vannfontene|font(a|\u00e6)ne|poide(l|\u0142)ko|font(a|\u00e1)nk|\u996e\u6c34\u673a|\u043f\u043e\u0438\u043b\u043a/.test(hay)) return "pet_fountain";
  // A feeder names itself after what it holds as often as after what it is.
  if (/feeder|pet.?feed|smart.?feed|fresh.?element|yumshare|croquette|kibble|futterautomat|comedero|alimentador|voerautomaat|foderautomat|f\u00f4rautomat|forautomat|karmnik|krmitko|\u5582\u98df|\u043a\u043e\u0440\u043c\u0443\u0448\u043a/.test(hay)) return "pet_feeder";
  // A Litter-Robot's status code says what it is; its name need not.
  if (optionsInclude(st, ["ccp", "rdy"])) return "litter_box";
  // A robot vacuum, mop or mower by its name or its maker's, read without
  // the entities' domains. Dreame's purifier is no robot.
  if (!["fan", "climate"].includes(domainOf(cfg.state_entity)) && ROBOT_NAME_RE.test(stripAccents(hay.replace(/\b[a-z_]+\./g, " ")))) return "robot";
  // A UPS, by its name in any language or by its maker's line.
  if (UPS_NAME_RE.test(stripAccents(hay.replace(/\b[a-z_]+\./g, " ")))) return "ups";
  // A pool pump, by its name in any language or by Oklyn's.
  if (POOL_NAME_RE.test(stripAccents(hay.replace(/\b[a-z_]+\./g, " ")))) return "pool_pump";
  // Solar panels by their name or their inverter's maker, before a home
  // battery: an EcoFlow PowerStream is the inverter of a battery's panels.
  // Anker's Solarbank and Zendure's SolarFlow say solar and are batteries.
  if (/solar.?bank|solar.?flow/.test(hay)) return "home_battery";
  if (domainOf(cfg.state_entity) !== "climate" && SOLAR_NAME_RE.test(stripAccents(hay.replace(/\b[a-z_]+\./g, " ")))) return "solar";
  if (BATTERY_NAME_RE.test(stripAccents(hay.replace(/\b[a-z_]+\./g, " ")))) return "home_battery";
  // A bathroom scale, by its name or its maker's, or a weight sensor in
  // kilograms, pounds or stones.
  if (SCALE_NAME_RE.test(stripAccents(hay.replace(/\b[a-z_]+\./g, " ")))) return "scale";
  // Renpho's gives no class, only a name. A pet's or a bag's weight is not a
  // person's; Tuya's counts in grams.
  if (st && domainOf(cfg.state_entity) === "sensor" && !/pet|cat|chat|dog|chien|food|litter|bag|bean|grain/.test(hay)) {
    const wUnit = String(st.attributes.unit_of_measurement || "");
    const weighs = st.attributes.device_class === "weight" || /weight|poids|gewicht|peso/.test(hay);
    if (weighs && (/^(kg|lb|lbs|st)$/i.test(wUnit) || (wUnit === "g" && parseFloat(st.state) > 2000))) return "scale";
  }
  // "microwave" before "oven": plenty of devices are named "microwave_oven".
  if (/microwave|micro.?onde|mikrowelle|magnetron|mikrob/.test(hay)) return "microwave";
  if (/coffee|cafeti|cafe|kaffee|espresso|cafetera|macchina.?caff|koffie|kaffemask|ekspres.?do.?kawy|delonghi|de.?longhi|primadonna|barista|fellow.?aiden|(^|[^a-z])(jura|aiden)([^a-z]|$)/.test(hay)) return "coffee";
  if (/cook.?processor|cookit|thermomix|robot.?cuiseur|companion|monsieur.?cuisine|cookeo|k\u00fcchenmaschine|kuchenmaschine|multicooker|tokit|(^|[\s._])cooker([\s._]|$)/.test(hay)) return "cooker";
  if (/wine.?(cooler|cellar|fridge|cabinet|conditioning|storage)|cave.?(a|\u00e0).?vin|weink(u|ue|\u00fc)hl|weinklima|vinoteca|cantinetta|wijnklimaat|vinkyl|vinkj|vink\u00f8l|winiark|vinotek/.test(hay)) return "fridge";
  if (/fridge|freezer|frigo|r\u00e9frig|refrig|kuhlschrank|k\u00fchlschrank|nevera|frigor|koelkast|kyl(skap)?\b|kj\u00f8leskap|lod\u00f3wka|lodowka|congel|gefrier|vriezer|(^|[^a-z])frys/.test(hay)) return "fridge";
  if (/kettle|stagg|fellow.?ekg|bouilloire|wasserkocher|hervidor|bollitore|waterkoker|vattenkokare|vannkoker|elkedel|czajnik/.test(hay)) return "kettle";
  // An iron, and the steam generator that is one on a boiler. Spanish and
  // Portuguese call a griddle a plancha as well, so theirs is the ironing one:
  // plancha de ropa, centro de planchado, ferro de engomar.
  if (/\biron(ing)?\b|steam.?(generator|station)|fer.?a.?repasser|centrale.?vapeur|bugeleisen|dampfstation|dampfbugel|plancha.?de.?ropa|planchado|ferro.?(da.?stiro|de.?engomar|de.?passar)|strijkijzer|stoomgenerator|stryk(jarn|ejern)|strygejern|zelazko|generator.?pary|zehlicka|parni.?generator|\u0443\u0442\u044e\u0433|\u043f\u0430\u0440\u043e\u0433\u0435\u043d\u0435\u0440\u0430\u0442\u043e\u0440|\u71a8\u6597/.test(hay)) return "iron";
  // A toaster, but not a toaster oven, which is an oven.
  // A screen, by its name in any language or by a media player that calls
  // itself a television. "TV" alone, since it hides in so many names.
  if (st && domainOf(cfg.state_entity) === "media_player" && st.attributes.device_class === "tv") return "screen";
  if (SCREEN_NAME_RE.test(hay)) return "screen";
  // A switch, a server or a NAS, by its name or its maker's. Read without
  // the entities' domains, since a plug's own entity is a switch.
  if (NET_NAME_RE.test(stripAccents(hay.replace(/\b[a-z_]+\./g, " ")))) return "network";
  if (/toaster(?!.?oven)|grille.?pain|tostador|tostapane|broodrooster|br(o|\u00f6)drost|br(o|\u00f8)drister|toster|topinkova|\u70e4\u9762\u5305|\u0442\u043e\u0441\u0442\u0435\u0440/.test(hay)) return "toaster";
  // A pellet stove, by its own name or by its maker's and its integration's.
  // "Stove" alone is a cooktop to an American, so the word needs its pellets.
  // A towel warmer, a dehumidifier and a small heater, by their names. They
  // come before the stove, since Italian calls an electric heater a stufa
  // too, and the dehumidifier also by the device class of its entity.
  if (/towel|seche.?serviette|s\u00e8che.?serviette|handtuch|toallero|scaldasalvie|handdoek|handduk|handkle|recznik|susak|\u6bdb\u5dfe/.test(hay)) return "towel_warmer";
  if (/dehumid|deshumid|d\u00e9shumid|entfeucht|deumidif|ontvocht|avfukt|affugt|osuszacz|odvlh|\u9664\u6e7f/.test(hay)) return "dehumidifier";
  if (st && /^humidifier\./.test(String(cfg.state_entity || "")) && st.attributes.device_class === "dehumidifier") return "dehumidifier";
  if (/space.?heater|fan.?heater|ceramic.?heater|oil.?(filled|heater|radiator)|panel.?heater|soufflant|bain.?d.?huile|chauffage.?d.?appoint|petit.?chauffage|convecteur|heizl(u|ue|\u00fc)fter|(o|oe|\u00f6)lradiator|calefactor|termoventil|stufetta|stufa.?elettric|scaldino|termoconvett|ventilatorkachel|varmefl|termowentyl|\u6696\u98ce\u673a|\u6cb9\u6c40/.test(hay)) return "space_heater";
  // An air purifier, by its name in any language or by Dyson's, which makes
  // little else for Home Assistant. Before the heater, since a Dyson heats too.
  // Blueair, Winix, Levoit and Coway make little else; VeSync names a Levoit
  // after its model, and a room may be all an id says.
  if (/purif|air.?clean|luftrein|depura|luchtrein|luftren|oczyszcz|cisticka|\u51c0\u5316|\u043e\u0447\u0438\u0441\u0442\u0438\u0442|dyson|blueair|blue.?pure|winix|levoit|coway|zhimi.?air|(^|[\s._])(core|vital).?\d{3}s|lv.?pur/.test(`${hay} ${stripAccents(String((st && st.attributes.friendly_name) || "")).toLowerCase()}`)) return "air_purifier";
  if (/pellet|pellematic|oekofen|froeling|ecomax|hargassner|centrometal|thermorossi|firenet|stufa|poele|po\u00eale|granule|granul\u00e9|pilleovn|palazzetti|micronova|aguaiot|extraflame|ravelli|piazzetta|edilkamin|duepi|(^|[^a-z])(rika|mcz)([^a-z]|$)|\u043f\u0435\u043b\u043b\u0435\u0442|\u9897\u7c92\u7089/.test(hay)) return "pellet_stove";
  // InComfort exposes an Intergas combi boiler as water_heater.boiler: the
  // domain says tank, the name says boiler, and the name is the one that knows.
  const eid = String(cfg.state_entity || "").toLowerCase();
  // First: a heat pump's own water heater is still the heat pump.
  if (/heat.?pump|pompe.?(a|\u00e0).?chaleur|w(a|ae|\u00e4)rmepumpe|bomba.?de.?calor|pompa.?di.?calore|warmtepomp|v(a|\u00e4)rmepump|pompa.?ciep|tepelne.?cerpadlo|ecodan|altherma|aquarea|thermia|yutaki|arotherm|vitocal|lambda.?(wp|heat|hp)|(^|[\s._])eu\d{2}l[\s._]/.test(hay)
    // EMS-ESP's compressor activity sits on its boiler device, under a
    // boiler's name: its short name says heat pump.
    || /(^|[._])hpactivity$/.test(eid)) return "heat_pump";
  // A split air conditioner, by its name in any language or its maker's, or
  // a climate entity named after its room that can cool, dry or only blow:
  // a boiler's or a stove's only heats. "Clim" and "AC" stand alone, or every
  // climate entity would be one.
  // A ventilation unit that only blows (Flexit, Systemair), before the
  // thermostat's name makes one of it.
  const hvacModes = st && Array.isArray(st.attributes.hvac_modes) ? st.attributes.hvac_modes : [];
  if (/^climate\./.test(eid) && hvacModes.includes("fan_only") && hvacModes.every((m) => ["off", "fan_only"].includes(m))) return "hrv";
  // A thermostat or a radiator valve, by its name or its maker's. Before the
  // air conditioner, since a Nest or an ecobee cools as well.
  if (/^climate\./.test(eid) && THERMOSTAT_NAME_RE.test(stripAccents(`${hay} ${(st && st.attributes.friendly_name) || ""}`.toLowerCase()))) return "thermostat";
  if (AC_WORD_RE.test(hay) && ["climate", "switch", "select"].includes(domainOf(cfg.state_entity))) return "air_conditioner";
  if (/air.?con|aircon|airco|mini.?split|(^|[\s._])(split|clim)([\s._]|$)|climatis|climatiz|condicionad|klimaanl|klimatyz|klimatiz|luftkondit|kondicion|sensibo|melcloud|\u043a\u043e\u043d\u0434\u0438\u0446\u0438\u043e\u043d\u0435\u0440|\u7a7a\u8c03/.test(hay)) return "air_conditioner";
  // Cooling alone does not make one: a Nest or an ecobee cools too, and says
  // heat_cool where a split says dry or fan_only.
  if (/^climate\./.test(eid) && (hvacModes.some((m) => ["dry", "fan_only"].includes(m))
    || (hvacModes.includes("cool") && !hvacModes.some((m) => ["heat_cool", "auto"].includes(m))))) return "air_conditioner";
  if (/^water_heater\..*(boiler|chaudiere)/.test(eid) && !/water.?boiler/.test(eid)) return "boiler";
  // Before the boiler: MDI names a storage tank "water-boiler", and water_heater
  // is the Home Assistant domain for one.
  if (/water.?heater|water.?boiler|chauffe.?eau|cumulus|warmwasserspeicher|termo.?electrico|scaldabagno|varmvattenberedare|varmtvannsbereder|podgrzewacz/.test(hay)) return "water_heater";
  if (/\bboiler|chaudiere|chaudi\u00e8re|heizkessel|gaskessel|caldaia|caldera|cv.?ketel|kocio\u0142|nefit/.test(hay)) return "boiler";
  // Any other climate entity that only heats is a thermostat: a boiler's
  // heating circuit (Bosch's hc1), a radiator valve, a zone.
  if (/^climate\./.test(eid)) return "thermostat";
  if (/hood|hotte|abzug|extractor|exaustor|afzuigkap|emh|okap/.test(hay)) return "hood";
  // A fan, by its name in any language, which a fan.* entity id carries; not
  // ventilation, which is a building's.
  if (/ventilat(eur|or|ore)|ventilador|wentylator|fl(a|\u00e4)kt|vifte|ceiling.?fan|(^|[\s._])fan([\s._]|$)|\u98ce\u6247|\u540a\u6247|\u0432\u0435\u043d\u0442\u0438\u043b\u044f\u0442\u043e\u0440/.test(hay)) return "fan";
  if (/cooktop|hotplate|plaque|kochfeld|kookplaat|induction|induktion|kogeplade|(^|[^a-z])hob([^a-z]|$)/.test(hay)) return "cooktop";
  if (/oven|four|backofen|horno|forno|piekarnik/.test(hay)) return "oven";
  // Before the dryer: a washer-dryer says "dry" in every language, and it is a
  // washer that also dries, not a dryer that also washes.
  if (WASHER_DRYER_RE.test(stripAccents(hay))) return "washer";
  // Not in the word laundry.
  if (/(?<!laun)dry|seche|s\u00e8che|tumble|trockner|secadora|asciugatrice|droger|torktumlare/.test(hay)) return "dryer";
  if (/dish|vaisselle|geschirrsp|spuelmasch|spulmasch|lavavajillas|lavastoviglie|vaatwasser|diskmaskin/.test(hay)) return "dishwasher";
  return "washer";
}

// On a machine that runs a cycle, each button shows when it can do something
// (issue #41): start at rest, pause while it runs, resume in a pause, stop
// during a cycle or a delayed start, the power switch outside a cycle. With a
// power switch that is off, the cycle buttons have nothing to act on.
const CONTROL_RUNNING = ["running", "preheating"];
function controlFitsState(key, norm, cap, cfg, toggleOn) {
  if (cfg.controls_always || !cap.cycle) return true;
  const busy = CONTROL_RUNNING.includes(norm) || norm === "paused";
  const off = !!cfg.toggle_entity && !toggleOn && !busy;
  if (key === "toggle") return !busy;
  if (key === "start") return !busy && !off;
  if (key === "pause") return CONTROL_RUNNING.includes(norm);
  if (key === "resume") return norm === "paused";
  if (key === "stop") return busy || norm === "delayed";
  return true;
}

// A plug reports isolated 0 W readings while everything is fine. Measured
// on a real fridge, the longest such run lasted 13 to 15 minutes. Half an hour
// below the threshold is therefore the shortest delay that cannot produce a
// false alarm, and it doubles the observed worst case.
const FRIDGE_UNPLUGGED_AFTER_MS = 30 * 60 * 1000;
// A heater within five degrees of its target has arrived: printing holds
// them within a degree or two, and preheating starts from the room.
const P3_HEAT_MARGIN = 5;
// A card that counts minutes of its own, the fridge without power and the
// iron left on, redraws on this beat: the count is shown in whole minutes, so
// half a minute is close enough to keep it honest.
const CLOCK_TICK_MS = 30 * 1000;
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
const SCREEN_NAME_RE = /bravia|android.?tv|webos|apple.?tv|chromecast|fire.?tv|(^|[^a-z])tv([^a-z]|$)|(^|[^a-z])t(e|\u00e9)l(e|\u00e9)([^a-z]|$)|t(e|\u00e9)l(e|\u00e9)vis|fernseher|televize|telewizor|\u0442\u0435\u043b\u0435\u0432\u0438\u0437\u043e\u0440|\u7535\u89c6|beamer|project(or|eur)|proyector|proiettore|projektor|\u6295\u5f71|\u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0440|computer|ordinateur|desktop|imac|ordenador|computador|komputer|po(c|\u010d)(i|\u00ed)ta(c|\u010d)|\u7535\u8111|\u043a\u043e\u043c\u043f\u044c\u044e\u0442\u0435\u0440|tablet|kiosk|wall ?panel|\u5e73\u677f|\u043f\u043b\u0430\u043d\u0448\u0435\u0442|laptop|notebook|macbook|chromebook|thinkpad|\u7b14\u8bb0\u672c|\u043d\u043e\u0443\u0442\u0431\u0443\u043a/;
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
  air_fryer: 50, kettle: 50, toaster: 50, water_heater: 50, space_heater: 30, towel_warmer: 10, dehumidifier: 30, humidifier: 5,
  air_purifier: 3, fan: 3, hood: 5, pool_pump: 50, printer_3d: 30, filament_dryer: 15, cooktop: 50, pet_fountain: 1,
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
const NET_ROUTER_RE = /(^|[\s._-])(router|routeur|ruter|udm|bbox|livebox|freebox|fritz.?box|modem|archer|keenetic|openwrt|mikrotik|omada|gl.?inet|asuswrt|rt.?a[xc]\d+|deco.?[mxpse]\d+)([\s._-]|\d|$)/;
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
const NET_FAIL_RE = /crash|fail|fault|degrad|broken|critical|abnormal|defect|missing|disabled|dsbl|invalid|wrong|dead/;
// A device's own state: UniFi's heartbeat_missed and adoption_failed, Omada's
// isolated and firmware mismatch.
const NET_STATE_ALERT_RE = /error|fail|heartbeat|isolated|mismatch|warning/;
const NET_WARN_RE = /warn|attention|caution|not_?initiali/;
// A disk's LED: failed, to watch, reading or writing, asleep or fine. Each
// integration says it its own way, so every entity of the disk is read.
function netDiskState(hass, entityId, anchorDevice) {
  const own = stateObj(hass, entityId);
  if (!own) return "empty";
  if (["unavailable", "unknown"].includes(String(own.state).toLowerCase())) return "unknown";
  // Unraid's slot with nothing in it.
  if (String(own.state).trim().toLowerCase() === "disk_np") return "empty";
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
const ROBOT_LAYOUTS = ["vacuum", "mop", "combo", "mower", "stick", "floor_washer", "pool"];
const ROBOT_STATIONS = ["station", "box", "base"];
// A rectangular station's front, as the brands make them (#69).
const ROBOT_BOX_COLORS = ["white", "black", "gold"];
const ROBOT_ONLY_FIELDS = ["robot_layout", "robot_station", "robot_station_color", "robot_camera", "robot_shelter", "robot_shelter_style", "mower_style", "robot_shelter_color", "robot_floor", "robot_controls", "away_threshold", "robot_status_entity", "robot_bin_entity",
  "robot_water_entity", "robot_clean_mode_entity", "robot_clean_tank_entity", "robot_dirty_tank_entity", "robot_rain_entity", "robot_error_entity", "robot_winter", "robot_winter_entity"];
// A robot by its name, its maker's or its integration's. A robot cook is a
// cooker, so the word robot needs what it does.
const ROBOT_NAME_RE = /dolphin|sileno|tapo.?rv\d+|proscenic|hombot|ambrogio|tineco|aspirateur.?balai|floor.?one|ifloor|laveur.?de.?sol|floor.?washer|nass.?trocken|lavapavimenti|stick.?vac|cordless.?vac|akkusauger|stielsauger|roomba|braava|roborock|ecovacs|deebot|dreame|neato|eufy.?clean|robovac|xiaomi.?vacuum|conga|robot.?(vacuum|aspir|mop|laveur|mower|tondeuse)|robot.?(clean|sweep)|vacuum|aspirateur|saugroboter|staubsauger|wischroboter|aspiradora|aspirapolvere|robotstofzuiger|stofzuiger|dammsugare|st(o|\u00f8)vsuger|odkurzacz|vysavac|landroid|automower|mammotion|navimow|(^|[^a-z])luba([^a-z]|$)|lawn.?mower|(^|[^a-z])mower|tondeuse|m(a|ae|\u00e4)hroboter|robotmaaier|grasmaaier|cortac(e|\u00e9)sped|tosaerba|corta.?relva|robotgr(a|\u00e4)sklipp|robotgressklipp|robotpl(a|\u00e6)neklipp|kosiarka|sekacka|\u626b\u5730|\u5438\u5c18|\u62d6\u5730|\u5272\u8349|\u043f\u044b\u043b\u0435\u0441\u043e\u0441|\u0433\u0430\u0437\u043e\u043d\u043e\u043a\u043e\u0441/;
const ROBOT_MOWER_RE = /mow|m(a|ae|\u00e4)h|tondeuse|maaier|cortac|tosaerba|relva|klipp|kosiark|sekack|landroid|automower|worx|mammotion|navimow|(^|[^a-z])luba([^a-z]|$)|\u5272\u8349|\u0433\u0430\u0437\u043e\u043d\u043e\u043a\u043e\u0441/;
// A robot that vacuums and mops in the same cycle (#91), named as such.
const ROBOT_COMBO_RE = /combo|hybrid|2.?[ei]n.?1|saug.?(und.?)?wisch|aspirateur.?laveur|\u626b\u62d6/;
const ROBOT_MOP_RE = /(^|[^a-z])mop|braava|wisch|serpill|laveur|fregas|lavapavim|dweil|moppe|mopuj|mopov|\u62d6\u5730/;
// Home Assistant's own words, the same for a vacuum and a mower.
const ROBOT_STATES = { cleaning: "cleaning", mowing: "cleaning", docked: "charging", returning: "returning", paused: "paused", idle: "idle", error: "error" };
// A status that says all is well is not an error, whatever it is called.
// "No error" as the integrations say it, and as people write it in a
// template of their own (#57): in any of the card's languages.
const ROBOT_OK_RE = /^(no_?errors?|(\w+_)?no_\w*error|none|ok|normal|0|255|100|null|no_?fault|false|off|all_?good|aucune_erreur|pas_d_?erreurs?|sans_erreur|keine?_fehler|fehlerfrei|sin_error(es)?|ningun_error|nessun_errore|geen_fout(en)?|nenhum_erro|sem_erros?|inga_fel|inget_fel|ingen_feil|ingen_fejl|brak_b(l|\u0142)edow|zadna_chyba|bez_chyby?|\u043d\u0435\u0442_\u043e\u0448\u0438\u0431\u043e\u043a|\u0431\u0435\u0437_\u043e\u0448\u0438\u0431\u043e\u043a|\u65e0\u9519\u8bef|\u65e0\u6545\u969c|\u6b63\u5e38)$/;
const robotOkWord = (v) => ROBOT_OK_RE.test(stripAccents(String(v)).trim().toLowerCase().replace(/[\s.:'\u2019-]+/g, "_"));
// What a status says, first match wins: an error before anything else, then
// what the station does, then the way home, a pause, the work and the base.
const ROBOT_WORDS = [
  ["error", /error|fault|problem|stuck|trapped|escaped|jam|blocked|cliff|lifted|wheel_?susp|erreur|fehler/],
  ["empty", /water_?(shortage|empty|low|lack)|no_?water|lack_?of_?water|tank_?empty|manque_?d_?eau/],
  ["full", /bin_?full|(dust_?)?bin_?full|box_?full|full_?bin|bac_?plein/],
  ["emptying", /emptying|empty_?(dust|bin|box)|evac|auto_?empt|dust_?collect|collecting_?dust|vidage/],
  // On the way to the dock to wash its mop, it is still on its way (Dreame).
  ["returning", /go(ing)?_?to_?wash/],
  ["washing", /wash|mop_?clean|(clean(ing)?|rins(e|ing))_?(the_?)?(mop|pad)|self_?clean|lavage/],
  ["drying", /dry|sechage|trockn/],
  ["rain", /(^|_)rain|pluie|regen/],
  // A return paused halfway is paused (Sunseeker).
  ["paused", /pause/],
  ["returning", /return|back_?to|go(ing)?_?(home|back|to_?(dock|base|station))|homing|hm_?(usr|mid|post)?_?(dock|msn)|searching_?(base|dock|station)|retour/],
  ["edgecut", /edge_?cut|edgecut|border|bordure|kante/],
  ["cleaning", /clean|mow|vacuum|sweep|mop|zon|spot|segment|room|(^|_)run|work|leav|starting|edge/],
  ["charging", /charg|dock|base|home|station/],
  ["idle", /idle|ready|standby|stop|sleep|wait/],
];
const ROBOT_LABELS = {
  charging: "robot_charging", docked: "robot_docked", returning: "robot_returning", paused: "paused", idle: "robot_idle",
  error: "error", emptying: "robot_emptying", full: "robot_bin_full", washing: "robot_washing", drying: "robot_drying",
  empty: "robot_water_empty", rain: "robot_rain", edgecut: "robot_edgecut", winter: "robot_winter", unav: "ev_offline", off: "ac_off", away: "stick_away",
};
const ROBOT_WORK_LABELS = { vacuum: "robot_cleaning", mop: "robot_mopping", combo: "robot_cleaning", mower: "robot_mowing", stick: "robot_cleaning", floor_washer: "robot_cleaning", pool: "robot_cleaning" };
const ROBOT_COLORS = {
  charging: "#43a047", docked: "#43a047", emptying: "#43a047",
  cleaning: "#1e88e5", edgecut: "#1e88e5", returning: "#1e88e5", washing: "#1e88e5",
  paused: "#fb8c00", full: "#fb8c00", empty: "#fb8c00", drying: "#fb8c00",
  rain: "#5c6bc0", error: "#f44336", winter: "#4fa3d8",
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
  if (ROBOT_COMBO_RE.test(name)) return "combo";
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
    // Roborock and Xiaomi say the box is attached: on is all is well.
    const wst = stateObj(hass, cfg.robot_water_entity);
    const attached = !!wst && ["connectivity", "plug", "presence"].includes((wst.attributes || {}).device_class);
    const low = attached ? String(wst.state).toLowerCase() === "off"
      : w ? Number(w.state) <= 5 : robotRaised(hass, cfg.robot_water_entity, /empty|low|short|lack|vide/);
    if (low) mode = "empty";
  }
  return mode;
}

// A mower put away for the winter (#80): ticked in the card, or switched on
// from any on and off entity, an input_boolean or a date-driven automation.
function robotWinter(hass, cfg) {
  return cfg.robot_winter === true || (!!cfg.robot_winter_entity && robotRaised(hass, cfg.robot_winter_entity, /winter|hiver/));
}

// The printers drawn after real ones (#93): chosen, or from the model's name.
const PRINTER_STYLES = ["bambu_x", "elegoo_c", "bambu_a", "elegoo_n"];
function printerStyleOf(cfg, st) {
  if (PRINTER_STYLES.includes(cfg.printer_style)) return cfg.printer_style;
  if (cfg.printer_style === "classic") return "";
  const hay = stripAccents(`${cfg.state_entity || ""} ${cfg.name || ""} ${(st && st.attributes && st.attributes.friendly_name) || ""}`).toLowerCase();
  const style = /(^|[._\s-])a1([._\s-]|$)|a1.?mini/.test(hay) ? "bambu_a"
    : /bambu|(^|[._\s-])(p1s|p1p|p2s|x1|x1c|x1e|x1.?carbon|h2d|h2s)([._\s-]|$)/.test(hay) ? "bambu_x"
    : /centauri/.test(hay) ? "elegoo_c"
    : /neptune/.test(hay) ? "elegoo_n" : "";
  // A layout set by hand wins over a guess that contradicts it.
  const open = style === "bambu_a" || style === "elegoo_n";
  if (style && ((cfg.printer_layout === "open" && !open) || (cfg.printer_layout === "enclosed" && open))) return "";
  return style;
}
// A filament box beside a printer (#93): one entity per spool. Bambu Lab keeps
// color, empty and active in attributes, Spoolman its filament_color_hex.
function spoolColorOf(a) {
  const c = String(a.color ?? a.filament_color_hex ?? a.color_hex ?? a.hex_color ?? "").trim();
  const m = /^#?([0-9a-f]{6})([0-9a-f]{2})?$/i.exec(c);
  return m ? `#${m[1]}` : "#9e9e9e";
}
function printerAmsOf(hass, cfg) {
  const entries = entityEntries(cfg.ams_entities, 4);
  if (!entries.length) return null;
  const slots = entries.map((e) => {
    const st = stateObj(hass, e.entity);
    const a = (st && st.attributes) || {};
    const raw = st ? String(st.state).trim().toLowerCase() : "";
    const empty = !st || a.empty === true || ["empty", "none", "unknown", "unavailable", ""].includes(raw);
    return { entity: e.entity, empty, color: empty ? "" : spoolColorOf(a), on: !empty && (a.active === true || a.in_use === true) };
  });
  return { slots, pos: cfg.ams_position === "top" ? "top" : "side", active: slots.find((x) => x.on) || null, drying: !!cfg.ams_drying_entity && robotRaised(hass, cfg.ams_drying_entity, /dry|sech/) };
}

// What a robot that does both is set to do (#91): Dreame's cleaning_mode says
// sweeping, mopping, both, or mopping after sweeping; a mop intensity set to
// off means it only vacuums. Null when nothing says it: both, then.
function robotCleanModeOf(hass, cfg) {
  const id = cfg.robot_clean_mode_entity;
  const st = id ? stateObj(hass, id) : null;
  if (!st || HA_OFFLINE_STATES.includes(String(st.state).toLowerCase())) return null;
  const v = stripAccents(String(st.state)).trim().toLowerCase();
  if (/mop|water|wisch|serpill/.test(id) && !/mode/.test(id)) return ["off", "none", "no_water", "dry"].includes(v) ? "vacuum" : "both";
  if (/(sweep|vacuum|aspir|saug|vac)\w*[\s_+&-]*(and|et|und|then|puis|after|plus|\+|&)?[\s_+&-]*(mop|lav|wisch)|(mop|lav|wisch)\w*[\s_+&-]*(and|et|und|then|puis|after|apres|nach|\+|&)[\s_+&-]*(sweep|vacuum|aspir|saug)|both|combo/.test(v)) return "both";
  if (/mop|lavage|laver|wisch|serpill|fregar/.test(v)) return "mop";
  if (/sweep|vacuum|aspir|saug|^dry/.test(v)) return "vacuum";
  return null;
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
const POOL_NAME_RE = /pool.?pump|swimming.?pool|(^|[^a-z])pool([^a-z]|$)|piscine|pompe.?(de.?)?piscine|oklyn|neopool|iopool|flipr|hayward|pentair|filter.?pump|(^|[^a-z])(exo|intex)([^a-z]|$)|poolstation|(^|[^a-z])pisc|schwimmbad|poolpumpe|filterpumpe|bomba.?de.?(piscina|filtra)|piscina|pompa.?(piscina|filtraz)|zwembad|zwempomp|bassengpump|poolpump|pompa.?basen|basen|baz(e|\u00e9)n|\u6cf3\u6c60|\u0431\u0430\u0441\u0441\u0435\u0439\u043d/;
const POOL_OFF_STATES = ["off", "false", "0", "stopped", "stop", "idle", "standby", "closed", "sleep", "sleeping", "paused", "disabled", "not_running", "inactive"];
// What a pump's state or status says, first match wins.
const POOL_WORDS = [
  ["error", /error|fault|alarm|defaut|failure|blocked|dry.?run|overload|panne|fehler/],
  ["backwash", /backwash|back.?wash|contre.?lavage|ruckspul|r\u00fcckspul|contralavado|controlavaggio|terugspoel/],
  ["frost", /frost|freez|gel|antigel|hors.?gel|frostschutz|antihielo|antigelo|vorst|^fp_mode$/],
  ["off", /^(off|stop(ped)?|idle|standby|arret|aus|apagad|spento|uit|false|0|sleep(ing)?|paused|disabled|not_running|inactive)$/],
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

// A pressure in bar, whichever unit Home Assistant shows it in.
function poolPressureBar(hass, entityId) {
  const v = numericState(hass, entityId);
  if (v === null) return null;
  const u = unitOf(hass, entityId).toLowerCase();
  return u === "psi" ? v / 14.5038 : u === "kpa" ? v / 100 : u === "mbar" || u === "hpa" ? v / 1000 : v;
}

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
    const p = poolPressureBar(hass, cfg.pressure_entity);
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
const SOLAR_NAME_RE = /solar|photovolt|(^|[^a-z])pv([^a-z]|$)|panneaux?.?solaires?|powerstream|hoymiles|enphase|envoy|apsystems|fronius|solaredge|growatt|solax|solis|sungrow|goodwe|foxess|sunsynk|kostal|(^|[^a-z])(sma|deye|sofar|tigo)([^a-z]|$)|^(?!.*(heat.?pump|compress|wash|fridge)).*inverter|wechselrichter|zonnepane|fotovolt|fotowolt|solcell|solpanel|\u592a\u9633\u80fd|\u0441\u043e\u043b\u043d\u0435\u0447/;
const SOLAR_LAYOUTS = ["ground", "roof"];
// What an inverter says when it is in trouble.
const ENERGY_ERROR_RE = /error|fault|alarm|defaut|panne|fehler|failure|storung|st\u00f6rung|guasto|averia|fout|abnormal/;
// The ways of saying there is none: Victron's no_alarm, a plain "No Error".
const ENERGY_NO_ERROR_RE = /^(no|not|kein|keine|aucune?|sans|pas)[\s_.-]*(d.)?(error|fault|alarm|defaut|fehler|erreur|panne|failure)/;
function energyErrorWord(raw) {
  return ENERGY_ERROR_RE.test(raw) && !ENERGY_NO_ERROR_RE.test(raw);
}
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
const BATTERY_NAME_RE = /home.?battery|house.?battery|powerwall|delta.?(pro|max|2)|ecoflow|bluetti|anker.?solix|solix|jackery|zendure|marstek|sonnen|senec|e3dc|sigen|pylontech|victron|(^|[^a-z])(sax|byd)([^a-z]|$)|power.?station|station.?(d.?)?energie|batterie.?(domestique|maison|murale|solaire)|hausbatterie|stromspeicher|heimspeicher|batteriespeicher|thuisbatterij|bateria.?domestica|batteria.?domestica|hemmabatteri|hjemmebatteri|magazyn.?energii|domaci.?baterie|\u5bb6\u7528\u7535\u6c60|\u0434\u043e\u043c\u0430\u0448\u043d.?\u0430\u043a\u043a\u0443\u043c/;
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
  else if ((stOk && energyErrorWord(raw)) || (cfg.solar_alert_entity && evErrorOf(stateObj(hass, cfg.solar_alert_entity)).active)) mode = "error";
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
const BATTERY_NEGATIVE_CHARGE = ["powerwall", "fronius", "sonnenbatterie", "solarman", "goodwe", "foxess_modbus"];
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
      // Home Assistant's own convention, negative while charging, is what
      // Powerwall, Fronius, Sonnen, Solarman, GoodWe and FoxESS report;
      // power_inverted false overrides it.
      const reg = hass.entities && hass.entities[cfg.power_entity];
      // Fronius's own power_battery_charge says which way it means.
      const inverted = cfg.power_inverted !== undefined ? cfg.power_inverted : !!reg && BATTERY_NEGATIVE_CHARGE.includes(reg.platform) && !/charge|_in$|_out$/i.test(cfg.power_entity);
      net = inverted ? -p : p;
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
  else if ((stOk && energyErrorWord(raw)) || (cfg.battery_alert_entity && evErrorOf(stateObj(hass, cfg.battery_alert_entity)).active)) mode = "error";
  else {
    const th = parseFloat(cfg.power_on_threshold);
    const idleW = isFinite(th) && th >= 0 ? th : BATTERY_IDLE_W;
    if (net !== null) mode = net > idleW ? "charging" : net < -idleW ? "discharging" : "idle";
    // Words that name a charge without one going on: not_charging, To be
    // charged (GoodWe), fully_charged (Anker). Victron counts its phases.
    else if (stOk && /not.?charg|no.?charg|^to.?be/.test(raw)) mode = "idle";
    else if (stOk && /(^|[^a-z])full|fully|(^|[^s])charged$/.test(raw) && !/dis.?charged$/.test(raw)) mode = "full";
    else if (stOk && /dis.?charg|decharg|entlad|descarg|scaric|ontlad|urladd|utlad|aflad|rozlad|vybij|inverting|power.?assist/.test(raw)) mode = "discharging";
    else if (stOk && /charg|laden|ladt|cargand|carica|carregand|opladen|laddar|lader|ladowan|nabij|^bulk|^absorption|^equali[sz]e/.test(raw)) mode = "charging";
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
const DIFFUSER_NAME_RE = /diffus(er|eur|or|ore)|aroma.?(diffus|therap)|airversa|mod100|(^|[._\s])spray(\s|$)|^(?!.*(coffee|cafe|espresso|kaffee|barista|jura|delonghi)).*((^|[._\s])(aroma|scent)([._\s]|$))|duftspender|essential.?oil|huiles?.?essentielles?|doftspridare|duftspreder/;
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
      : dom === "select" || dom === "input_select" ? !(AIR_STOP_RE.test(raw) || ["close", "closed"].includes(raw))
      : ["on", "true", "diffusing"].includes(raw) || isActiveState(norm);
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
// Between cycles, the machine waits for its settings (#79): nothing to pick
// while it runs, is paused or counts down to a delayed start.
const betweenCycles = (norm) => !isActiveState(norm) && !["paused", "delayed"].includes(norm);
// The programs a select offers, to pick one between cycles (#79).
function programMenuOf(hass, cfg, cap, norm) {
  const id = cfg.program_entity;
  if (!id || !cap || !cap.cycle || cap.printer3d || !["select", "input_select"].includes(domainOf(id)) || !betweenCycles(norm)) return null;
  const st = stateObj(hass, id);
  const opts = st && Array.isArray(st.attributes.options) ? st.attributes.options.map(String) : [];
  return opts.length > 1 ? { kind: "program", entity: id, dom: domainOf(id), options: opts, current: String(st.state) } : null;
}
// A humidifier's modes, picked in the card (#89).
function humidifierModeMenuOf(hass, cfg) {
  const st = stateObj(hass, cfg.state_entity);
  if (!st || domainOf(cfg.state_entity) !== "humidifier" || ["off", ...HA_OFFLINE_STATES].includes(String(st.state).toLowerCase())) return null;
  const opts = Array.isArray(st.attributes.available_modes) ? st.attributes.available_modes.map(String) : [];
  return opts.length > 1 ? { kind: "hum_mode", entity: cfg.state_entity, dom: "humidifier", options: opts, current: String(st.attributes.mode) } : null;
}
// Its mist when that is a select (Tuya's spraying level).
function humidifierMistMenuOf(hass, cfg) {
  const id = cfg.mist_level_entity;
  if (!id || !["select", "input_select"].includes(domainOf(id))) return null;
  const main = stateObj(hass, cfg.state_entity), st = stateObj(hass, id);
  if (!st || (main && String(main.state).toLowerCase() === "off") || HA_OFFLINE_STATES.includes(String(st.state).toLowerCase())) return null;
  const opts = Array.isArray(st.attributes.options) ? st.attributes.options.map(String) : [];
  return opts.length > 1 ? { kind: "program", entity: id, dom: domainOf(id), options: opts, current: String(st.state) } : null;
}
// A delayed start set between cycles (#79): a number in seconds, minutes or
// hours by its unit, offered hour by hour up to a day, or a select's options.
function delayMenuOf(hass, cfg, cap, norm) {
  const id = cfg.delay_set_entity;
  if (!id || !cap || !cap.cycle || !betweenCycles(norm)) return null;
  const st = stateObj(hass, id);
  if (!st || HA_OFFLINE_STATES.includes(String(st.state).toLowerCase())) return null;
  const dom = domainOf(id);
  if (["select", "input_select"].includes(dom)) {
    const opts = Array.isArray(st.attributes.options) ? st.attributes.options.map(String) : [];
    return opts.length > 1 ? { kind: "delay", entity: id, dom, options: opts, current: String(st.state) } : null;
  }
  if (!["number", "input_number"].includes(dom)) return null;
  const a = st.attributes;
  const unit = String(a.unit_of_measurement || "s").toLowerCase();
  const sec = /^h/.test(unit) ? 3600 : /^min/.test(unit) ? 60 : 1;
  const per = 3600 / sec;
  const min = Number.isFinite(parseFloat(a.min)) ? parseFloat(a.min) : 0;
  const max = Number.isFinite(parseFloat(a.max)) ? parseFloat(a.max) : 24 * per;
  const opts = min <= 0 ? ["0"] : [];
  for (let h = 1; h <= Math.min(24, Math.floor(max / per)); h++) if (h * per >= min) opts.push(String(h * per));
  const cur = parseFloat(st.state);
  return opts.length > 1 ? { kind: "delay", entity: id, dom, options: opts, current: Number.isFinite(cur) ? String(Math.round(cur)) : "", sec } : null;
}
// How a line's menu says an option: a program cleaned up, a delay as its
// length and the time it would start.
function lineMenuLabel(hass, cfg, menu, option) {
  if (menu.kind === "program") return programLabel(hass, stateObj(hass, menu.entity), option, cfg);
  if (menu.kind === "hum_mode") return attrLabel(hass, stateObj(hass, menu.entity), "mode", option, cfg);
  if (!menu.sec) return option;
  const s = parseFloat(option) * menu.sec;
  return s > 0 ? `${formatDuration(s, hass)} \u00b7 ${formatEta(s, hass)}` : t(hass, "delay_none");
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

// Heat recovery ventilation, read from its fan (or climate, or select) entity:
// on or off, its speed and its preset (boost, away); a bypass or Vallox's
// cell state (heat recovery, cool recovery, bypass, defrosting); a filter in
// days or in percent; four temperatures drawn at the ends of the ducts.
// The units a power and an energy field accept in the editor's lists.
const UNIT_FILTERS = { power: /^[mkMG]?W$/, energy: /^[mkMG]?Wh$/ };
const HRV_ONLY_FIELDS = ["hrv_layout", "active_mode_entity", "supply_temperature_entity", "extract_temperature_entity", "exhaust_temperature_entity", "bypass_entity", "airflow_entity",
  "supply_fan_entity", "exhaust_fan_entity", "exhaust_airflow_entity", "fan_max_rpm", "humidity_control_entity", "filter_life_full", "high_speed_entity", "speed_entities", "zone_valves", "hrv_floors"];
const HRV_LAYOUTS = ["diagram", "one_duct", "pair", "single", "single_box", "single_basement"];
const HRV_NAME_RE = /(^|[^a-z])(hrv|erv|vmc|wtw|ftx|mvhr|kwl|helios|brink)([^a-z]|$)|(^|[\s.])ventilation|flexit|pluggit|systemair|swegon|thessla|ambientika|double.?flux|heat.?recovery|recuperat|comfoair|comfoconnect|vallox|zehnder|lunos|twinfresh|danfoss.?air|renson|endura|brink.?(flair|renovent)|wohnraumluft/;
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
  if (["fan", "climate"].includes(dom) && Array.isArray(a.preset_modes) && a.preset_modes.length > 1) {
    return { entity: cfg.state_entity, current: a.preset_mode, options: a.preset_modes, dom };
  }
  return speeds;
}
function hrvReadOf(hass, cfg, st, norm, powerDerived) {
  const raw = st ? stripAccents(String(st.state)).trim().toLowerCase() : "";
  const a = (st && st.attributes) || {};
  const dom = domainOf(cfg.state_entity);
  if (!powerDerived && (!st || ["unavailable", "unknown", ""].includes(raw))) return { mode: "unav", level: 0 };
  const on = powerDerived ? isActiveState(norm)
    : dom === "climate" ? raw !== "off"
    : dom === "select" || dom === "input_select" ? !AIR_STOP_RE.test(raw)
    : dom === "sensor" ? !AIR_STOP_RE.test(raw)
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
  // A temperature (Renson's activation point) or a lock (Vallox) is no bypass.
  const bUnit = String((bst && bst.attributes && bst.attributes.unit_of_measurement) || "");
  const bNotOne = !!bst && ((bst.attributes || {}).device_class === "temperature" || /\u00b0/.test(bUnit) || /lock/i.test(cfg.bypass_entity));
  const bypass = !defrost && !bNotOne && (["on", "true", "open", "opened", "bypass", "active"].includes(braw) || /bypass|cool.?recovery/.test(braw) || (isFinite(bnum) && bnum > 0));
  // The filter: days or percent left, or a sensor that says it is due.
  let filterDue = false, filterText = "", filterValue = null, filterDays = false;
  const fst = cfg.filter_life_entity ? stateObj(hass, cfg.filter_life_entity) : null;
  if (fst) {
    const fv = parseFloat(fst.state);
    const unit = String((fst.attributes || {}).unit_of_measurement || "").toLowerCase();
    const fAt = (fst.attributes || {}).device_class === "timestamp" || /^\d{4}-\d{2}-\d{2}/.test(String(fst.state)) ? Date.parse(fst.state) : NaN;
    if (isFinite(fAt)) {
      // Vallox gives the date its filter is due.
      const left = Math.ceil((fAt - Date.now()) / 86400000);
      const due = parseFloat(cfg.filter_due_below);
      filterDue = left <= (isFinite(due) ? due : 7);
      filterText = `${left} d`;
      filterValue = left;
      filterDays = true;
    } else if (isFinite(fv) && unit && unit !== "%" && !/^(d|day|days|jours?|tage?|dias?|giorni)$/.test(unit)) {
      // Hours run (Flexit) say nothing of what is left.
      filterText = `${Math.round(fv)} ${unit}`;
    } else if (isFinite(fv) && /since|used|elapsed|depuis/.test(String(cfg.filter_life_entity || ""))) {
      // Days since the filter was reset (Brink) count up: no deadline here.
      filterText = `${Math.round(fv)} ${unit}`;
    } else if (isFinite(fv)) {
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
// A zone damper (#87): a valve, a cover or a switch, open unless it says it
// is shut. Its circle turns red and its blade crosses the duct when shut.
const hrvZoneOpen = (hass, id) => {
  const s = id ? stateObj(hass, id) : null;
  if (!s) return true;
  const v = String(s.state).toLowerCase();
  if (["closed", "closing", "off", "false"].includes(v)) return false;
  const pos = numberOrNull(s.attributes && s.attributes.current_position);
  return pos === null || pos > 0;
};
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
// Motion: an entity that says so, a count above nothing (Frigate's people), or
// an event entity whose state is the time it last saw something (Nest, Ring),
// drawn moving as long as a ring.
function camMotionAt(hass, id) {
  const st = id ? stateObj(hass, id) : null;
  if (!st) return NaN;
  return Date.parse(domainOf(id) === "event" ? st.state : st.last_changed);
}
function camMoving(hass, id) {
  const st = id ? stateObj(hass, id) : null;
  if (!st) return false;
  if (domainOf(id) === "event") return Date.now() - camMotionAt(hass, id) < CAM_RING_MS;
  return camOn(hass, id) || (domainOf(id) === "sensor" && parseFloat(st.state) > 0);
}
function cameraReadOf(hass, cfg, st) {
  const raw = st ? String(st.state).trim().toLowerCase() : "";
  const a = (st && st.attributes) || {};
  const conn = cfg.connectivity_entity ? stateObj(hass, cfg.connectivity_entity) : null;
  const gone = !!conn && ["off", "false", "disconnected", "offline", "unavailable"].includes(String(conn.state).toLowerCase());
  let mode;
  if (!st || ["unavailable", "unknown", "none", ""].includes(raw) || /^offline/.test(raw) || gone) mode = "unav";
  else if (raw === "off" || a.monitoring === false || camOn(hass, cfg.privacy_entity)) mode = "off";
  else if (camRinging(hass, cfg.ring_entity)) mode = "ring";
  else if (raw === "recording" || (camOn(hass, cfg.recording_entity) && !/record.?audio/i.test(cfg.recording_entity))) mode = "rec";
  else if (raw === "motion" || camMoving(hass, cfg.motion_entity)) mode = "motion";
  // Nest and Netatmo always say streaming: nobody is watching for all that.
  else if (raw === "streaming" && !/netatmo|google nest/i.test(String(a.brand || ""))) mode = "live";
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
const MAILBOX_NAME_RE = /mail.?box|(^|[._])mail_usps|letter.?box|boite.?aux.?lettres|(^|[\s._])bal([\s._]|$)|briefkasten|buzon|brievenbus|postkasse|brevlada|skrzynka|cassetta.?postale|caixa.?de.?correio|schranka/;
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
const MAILBOX_COLORS_3D = Object.keys(MB3_PAL);
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

// Drawings added in 3.10.0 after the HACF thread: a booster set and a sump
// pump, a pool robot, underfloor heating on hot water or electric, a spa, a
// sauna, an aquarium, a Linky meter and a Christmas tree. Drawn in SVG on a 120 x 135 field; what
// moves moves only on a machine carrying nt-on, staggered through --d0, and
// the robot's cable and the sump's float follow their SMIL animations.
const NT_TYPES = ["water_pump", "floor_heating", "spa", "sauna", "aquarium", "meter", "christmas_tree", "mobility", "irrigation", "litter_box", "detector", "speaker", "console", "storage_tank", "fresh_water_station", "solar_thermal", "wood_stove", "humidifier", "filament_dryer"];
// How many spools a filament dryer holds (#93).
const FD_COUNTS = [1, 2, 4];
const FD_COLORS = ["#43a047", "#fb8c00", "#8e24aa", "#eceff1"];
const CONSOLE_LAYOUTS = ["ps1", "ps2", "ps3", "ps4", "ps4_pro", "ps5", "xbox", "xbox_360", "xbox_one", "xbox_series_x", "xbox_series_s", "switch", "switch_2", "switch_lite", "ps_vita", "nes", "snes", "n64", "gamecube", "wii", "megadrive"];
const IRRIGATION_LAYOUTS = ["sprinkler", "tap", "drip", "flowers"];
// A tap timer: the generic one or Sonoff's, on a brick wall, white render or
// a standpipe (#85).
const TAP_MODELS = ["generic", "sonoff"];
const TAP_WALLS = ["brick", "render", "none"];
const LITTER_LAYOUTS = ["globe", "box"];
const DETECTOR_LAYOUTS = ["smoke", "co", "leak"];
const SPEAKER_LAYOUTS = ["smart", "homepod_mini", "sonos_one", "sonos_era100", "sonos_era300", "sonos_move", "soundbar", "bose_wave", "bose_500", "bose_soundlink", "bose_soundbar", "bookshelf", "echo_dot", "nest_mini"];
const MOBILITY_LAYOUTS = ["scooter", "offroad", "ebike", "gyropode", "motorcycle"];
const PUMP_LAYOUTS = ["booster", "sump", "circulator"];
const CIRC_MODELS = ["grundfos", "wilo", "dab", "generic"];
const FLOOR_LAYOUTS = ["water", "electric"];
const HUMIDIFIER_ONLY_FIELDS = ["mist_level_entity", "low_water_entity", "tank_lifted_entity", "night_light_entity"];
const NT_ONLY_FIELDS = {
  filament_dryer: ["spool_count", "spool_colors"],
  humidifier: HUMIDIFIER_ONLY_FIELDS,
  water_pump: ["pump_layout", "pressure_entity", "level_entity", "high_level_entity", "level_max", "head_entity", "control_mode_entity", "circulator_model", "max_speed"],
  floor_heating: ["floor_layout"],
  spa: ["bubbles_entity"],
  christmas_tree: ["tree_palette", "presents"],
  mobility: ["mobility_layout"],
  irrigation: ["irrigation_layout", "zone_entity", "rain_delay_entity", "soil_moisture_entity", "next_run_entity", "tap_model", "tap_wall", "watering_duration_entity"],
  litter_box: ["litter_layout", "waste_drawer_entity", "litter_level_entity", "pet_weight_entity", "visits_entity", "cat_present_entity", "last_use_entity"],
  detector: ["detector_layout", "co_level_entity"],
  speaker: ["speaker_layout", "speaker_color"],
  console: ["console_layout", "game_entity", "playtime_entity", "playtime_left_entity"],
  storage_tank: ["temperature_entities", "charge_entity", "charge_min_temp", "charge_max_temp", "tank_volume", "sources", "consumers"],
  fresh_water_station: ["primary_temperature_entity", "cold_water_temperature_entity", "circulation_entity", "circulation_mode_entity", "supply_margin"],
  solar_thermal: ["collector_style", "collector_temperature_entity", "tank_temperature_entity", "collector_shutdown_entity", "tank_full_entity", "stagnation_temp", "heat_power_entity"],
  wood_stove: ["water_jacket", "burning_temp", "embers_temp", "temperature_scale", "flow_temperature_entity", "valve_entity", "last_fire_entity", "overheat_temp"],
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
      // A binary sensor of class lock is on when unlocked; Bosch's lock_enabled,
      // with no class on purpose, is on when the lock is on.
      const lockSt = stateObj(hass, id);
      const lockClass = domainOf(id) === "binary_sensor" && (!lockSt || !lockSt.attributes || lockSt.attributes.device_class === "lock" || !lockSt.attributes.device_class && !/lock.?enabled|enabled|active/.test(id));
      const locked = ["locked", "on", "true", "1"].includes(raw) && !lockClass;
      const unlocked = lockClass ? NT_ON.includes(raw) : !locked;
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
  ["filament_dryer", /filament.?dry|dry.?box|filament.?(trockner|droger)|sech\w*.?(de.?)?(filament|bobine)|space.?pi|sunlu.?(s[124]|fd)|polydryer|filadryer/],
  // Not its domain alone, humidifier.basement may well dry the basement.
  ["humidifier", /^(?!.*(dehumid|deshumid|entfeucht|deumidif|ontvocht|avfukt|affugt|osuszacz|odvlh)).*(humidifier(?!\.)|humidificateur|luftbefeuchter|humidificador|umidificatore|luchtbevochtiger|luftfuktare|luftfukter|luftfugter|nawilzacz|zvlhcovac|\u52a0\u6e7f)/],
  ["fresh_water_station", /frischwasser|fresh.?water.?(station|module)|freshwater|station.?(d.?)?eau.?(fraiche|chaude)|module.?(d.?)?eau.?chaude|(^|[^a-z])fws([^a-z]|$)/],
  ["storage_tank", /pufferspeicher|(^|[^a-z])puffer|buffer.?tank|ballon.?tampon|thermal.?store|schichtspeicher|serbatoio.?(inerziale|di.?accumulo)|deposito.?de.?inercia|buffertank|zbiornik.?buforowy/],
  ["solar_thermal", /solar.?therm|solarthermie|solaire.?thermique|thermique.?solaire|kollektor|collector.?temp|capteur.?solaire|solar.?pump|solarpumpe|solar.?collector/],
  ["wood_stove", /^(?!.*(pellet|granul)).*((^|[^a-z])kamin|wood.?(stove|burner)|log.?(stove|burner)|poele.?(a.?)?bois|cheminee|holzofen|kachelofen|estufa.?de.?lena|stufa.?a.?legna|houtkachel|braskamin|vedovn|braendeovn|brandeovn|piec.?na.?drewno|fireplace)/],
  ["console", /used.?screen.?time|suspend.?software|playstation|(^|[^a-z])ps[1-5]([^a-z0-9]|$)|xbox|nintendo|gamecube|(^|[^a-z])(n64|snes|nes|wii|switch.?lite|switch.?2)([^a-z0-9]|$)|mega.?drive|genesis|console|konsole|consola|konsol/],
  ["litter_box", /scoopfree|purobot|litter|litiere|katzenklo|arenero|lettiera|kattlada|kuweta|kattebak|kattesand|(^|[^a-z])pura.?(x|max)/],
  ["irrigation", /arrosage|arroseur|watering|bhyve|netro|gardena(?!.?(sileno|mow))|irrigat|sprinkler|bewasserung|(^|[^a-z])riego|beregening|bevattning|vanning|vanding|nawadnian|zavlaz|opensprinkler|linktap|hydrawise|rachio|rain.?bird/],
  ["detector", /x.?sense|smoke|fumee|detecteur.?(de.?)?(fumee|co|fuite)|monoxyde|carbon.?monoxide|(^|[^a-z])co.?(alarm|detector)|rauchmelder|detector.?de.?humo|rilevatore|rookmelder|brandvarnare|roykvarsler|roegalarm|czujnik.?dymu|water.?leak|fuite.?d.?eau|wassermelder|leak.?sensor/],
  ["christmas_tree", /christmas|xmas|(^|[^a-z])sapin|(^|[^a-z])noel([^a-z]|$)|weihnacht|tannenbaum|navidad|natale|kerstboom|julgran|juletre|juletrae|choink|vanocni.?strom/],
  ["aquarium", /aquari|akwari|akvari/],
  ["mobility", /cowboy|vanmoof|(^|[.])niu([._\s]|$)|trottinette|e-?scooter|(^|[^a-z])scooter([^a-z]|$)|ninebot|(^|[^a-z])(velo|e-?bike|ebike|vae|pedelec)([^a-z]|$)|gyropode|gyroroue|monowheel|hoverboard|(^|[^a-z])moto([^a-z]|$)|motorcycle|super.?soco|sur.?ron|ausom|dualtron|kaabo|patinete|monopattino|hulajnoga|elsparkcykel|elsparkesykkel|kolobezka/],
  ["sauna", /sauna|saunum|huum|harvia|(^|[^a-z])(tylo|effe)([^a-z]|$)/],
  ["spa", /balboa|spanet|arctic.?spa|(^|[^a-z])(spa|gecko|jacuzzi|hot.?tub|bain.?nordique|whirlpoolwanne)([^a-z]|$)/],
  ["meter", /linky|compteur.?(electrique|edf|enedis)|smart.?meter|(^|[\s.])(electricity|gas|water).?meter|p1.?meter|(^|[^a-z])dsmr([^a-z]|$)|shelly.?(pro.?)?3?em([^a-z]|$)|tibber.?pulse|iammeter|ksem|homewizard.?(p1|kwh|energy)|(^|[^a-z])(teleinfo|papp|sinsts)([^a-z]|$)/],
  ["floor_heating", /plancher.?chauffant|underfloor|floor.?heat|fussbodenheizung|suelo.?radiante|pavimento.?radiante|vloerverwarming|golvvarme|gulvvarme|ogrzewanie.?podlog|podlahov/],
  ["water_pump", /grundfos|wilo|(^|[^a-z])alpha[23]([^a-z]|$)|surpresseur|booster|relevage|(^|[^a-z])sump|pompe.?(a.?eau|de.?puits|immergee)|water.?pump|well.?pump|(^|[^a-z])forage|tauchpumpe|hauswasser|hebeanlage/],
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
  // An index in kWh is drawn on the drums (#68).
  if (/wh$/i.test(String(a.unit_of_measurement || ""))) return "box";
  return "linky";
}
// The new drawings, picked or read from the name, the device class.
function irrigationLayoutOf(cfg, st) {
  if (IRRIGATION_LAYOUTS.includes(cfg.irrigation_layout)) return cfg.irrigation_layout;
  const hay = stripAccents(`${cfg.state_entity || ""} ${cfg.name || ""} ${(st && st.attributes.friendly_name) || ""}`).toLowerCase();
  if (/goutte|drip|potager|vegetable|gemuse|huerto|(^|[^a-z])orto([^a-z]|$)|moestuin|kokska|warzyw/.test(hay)) return "drip";
  if (/massif|parterre|flower|fleur|blumen|flores|aiuola|bloem|rabatt|kwiat/.test(hay)) return "flowers";
  return /gardena|linktap|sonoff|(^|[^a-z])swv|robinet|(^|[^a-z])tap([^a-z]|$)|faucet|wasserhahn|grifo|rubinetto|kraan|kran|timer|valve|vanne/.test(hay) ? "tap" : "sprinkler";
}
function tapModelOf(cfg, st) {
  if (TAP_MODELS.includes(cfg.tap_model)) return cfg.tap_model;
  const hay = stripAccents(`${cfg.state_entity || ""} ${cfg.name || ""} ${(st && st.attributes.friendly_name) || ""}`).toLowerCase();
  return /sonoff|(^|[^a-z])swv/.test(hay) ? "sonoff" : "generic";
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
  if (cfg.head_entity || cfg.control_mode_entity || CIRC_MODELS.includes(cfg.circulator_model)) return "circulator";
  const hay = stripAccents(`${cfg.state_entity || ""} ${cfg.name || ""} ${(st && st.attributes.friendly_name) || ""}`).toLowerCase();
  if (/relevage|sump|tauch|hebe|vide.?cave|drain|eaux.?usees|crue/.test(hay)) return "sump";
  return /circulat|umwalz|circolat|grundfos|alpha|magna|wilo|stratos|yonos|evosta|heizungspumpe/.test(hay) ? "circulator" : "booster";
}
// A circulator's maker, for the colour of its head: the one chosen, else its
// name (#88).
function circModelOf(cfg, st) {
  if (CIRC_MODELS.includes(cfg.circulator_model)) return cfg.circulator_model;
  const hay = stripAccents(`${cfg.state_entity || ""} ${cfg.power_entity || ""} ${cfg.name || ""} ${(st && st.attributes.friendly_name) || ""}`).toLowerCase();
  if (/grundfos|alpha|magna|\bups/.test(hay)) return "grundfos";
  if (/wilo|stratos|yonos|\bpara\b/.test(hay)) return "wilo";
  if (/\bdab\b|evosta/.test(hay)) return "dab";
  return "generic";
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
      // A water heater says it in its state (Gecko: Heating, Cooling, Idle).
      const act = String((st.attributes || {}).hvac_action || "").toLowerCase() || (dom === "water_heater" && ["heating", "cooling", "idle"].includes(raw) ? raw : "");
      if (act) return act === "heating" || act === "preheating" || act === "cooling";
      if (metered) return watts >= threshold;
      // No action at all (Tuya, Intex): it runs until the setpoint is reached.
      const cur = numberOrNull((st.attributes || {}).current_temperature), aim = numberOrNull((st.attributes || {}).temperature);
      if (cur !== null && aim !== null && raw === "heat") return cur < aim;
      if (cur !== null && aim !== null && raw === "cool") return cur > aim;
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
    const v = tempState(hass, cfg.temperature_entity);
    return v === null ? null : { v, text: tempText(hass, cfg, cfg.temperature_entity, v, temperatureUnit(hass, cfg.temperature_entity)) };
  }
  const v = st ? numberOrNull((st.attributes || {}).current_temperature) : null;
  if (v === null) return null;
  const unit = (hass && hass.config && hass.config.unit_system && hass.config.unit_system.temperature) || "\u00b0C";
  return { v, text: tempText(hass, cfg, null, v, unit) };
}
// What the humidifier integrations differ on (#89). VeSync keeps a number for
// its mist and a select for its night light; Tuya a select with level_1 to
// level_n, and a water level in words; SwitchBot empty, low, medium or high,
// and its mist in the mode; Xiaomi a water tank that is on when it is in place.
const HUM_OFF_WORDS = ["off", "false", "0", "none", ""];
function humWordLevel(raw) {
  if (/empty|lack|shortage|no.?water|vide/.test(raw)) return 0;
  if (/low|quiet|silent|faible|sleep|night|min/.test(raw)) return .25;
  if (/medium|mid|moyen/.test(raw)) return .55;
  if (/high|strong|turbo|boost|max|full|fort|plein/.test(raw)) return .9;
  return null;
}
// A level among a select's or an enum sensor's own options, its rank too.
function humOptionLevel(s) {
  const raw = String(s.state).trim().toLowerCase();
  const opts = (Array.isArray(s.attributes.options) ? s.attributes.options : []).map((o) => String(o).trim().toLowerCase()).filter((o) => !HUM_OFF_WORDS.includes(o));
  const i = opts.indexOf(raw);
  if (HUM_OFF_WORDS.includes(raw)) return { frac: 0, rank: 0 };
  const word = humWordLevel(raw);
  if (word !== null) return { frac: word, rank: i >= 0 ? i + 1 : 0 };
  return i >= 0 ? { frac: (i + 1) / opts.length, rank: i + 1 } : null;
}
function humMistOf(hass, cfg, attrs) {
  const s = cfg.mist_level_entity ? stateObj(hass, cfg.mist_level_entity) : null;
  if (s && !HA_OFFLINE_STATES.includes(String(s.state).toLowerCase())) {
    const v = numberOrNull(s.state);
    if (v !== null) {
      const max = numberOrNull(s.attributes.max) || 9;
      // A level reads L5; a motor's 1200 rpm is no level.
      return { frac: v / max, level: max <= 20 ? Math.round(v) : "" };
    }
    const o = humOptionLevel(s);
    if (o) return { frac: o.frac, level: o.rank || "" };
  }
  // SwitchBot and Xiaomi set their mist with the mode.
  const m = humWordLevel(String(attrs.mode || "").toLowerCase());
  return { frac: m, level: "" };
}
function humWaterOf(hass, id) {
  const s = id ? stateObj(hass, id) : null;
  if (!s || HA_OFFLINE_STATES.includes(String(s.state).toLowerCase())) return null;
  const v = numberOrNull(s.state);
  if (v === null) { const o = humOptionLevel(s); return o ? o.frac : null; }
  const max = numberOrNull(s.attributes.max);
  return Math.max(0, Math.min(1, v / (max || 100)));
}
// Xiaomi's water tank is a connectivity sensor, on while it is in place;
// VeSync's is a problem sensor, on once lifted.
function humTankOut(hass, id) {
  const s = id ? stateObj(hass, id) : null;
  if (!s || HA_OFFLINE_STATES.includes(String(s.state).toLowerCase())) return false;
  if (["connectivity", "plug", "presence"].includes(s.attributes.device_class)) return String(s.state).toLowerCase() === "off";
  return heatActive(hass, id);
}
function humDisplayOn(hass, id) {
  const s = id ? stateObj(hass, id) : null;
  if (!s || HA_OFFLINE_STATES.includes(String(s.state).toLowerCase())) return true;
  return !HUM_OFF_WORDS.includes(String(s.state).trim().toLowerCase());
}
// A humidifier's night light: off, dim or bright, from a select, a light's
// brightness, a number or a plain switch.
function humidifierNightOf(hass, cfg) {
  const s = cfg.night_light_entity ? stateObj(hass, cfg.night_light_entity) : null;
  if (!s || HA_OFFLINE_STATES.includes(String(s.state).toLowerCase())) return "off";
  const raw = String(s.state).trim().toLowerCase();
  if (["off", "false", "0", "none", ""].includes(raw)) return "off";
  const dom = domainOf(cfg.night_light_entity);
  if (dom === "light") { const b = numberOrNull(s.attributes.brightness); return b !== null && b < 128 ? "dim" : "bright"; }
  const n = numberOrNull(s.state);
  if (n !== null) {
    const opts = (Array.isArray(s.attributes.options) ? s.attributes.options : []).map(Number).filter(Number.isFinite);
    const max = numberOrNull(s.attributes.max) || (opts.length ? Math.max(...opts) : 100);
    return n / max < .5 ? "dim" : "bright";
  }
  return /dim|low|soft|faible|doux|med/.test(raw) ? "dim" : "bright";
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

const ntFlake = (x, y, r, color, w = .8) =>
  `<path d="M${x} ${y - r}v${2 * r}M${x - r} ${y}h${2 * r}M${x - r * .7} ${y - r * .7}l${r * 1.4} ${r * 1.4}M${x + r * .7} ${y - r * .7}l${-r * 1.4} ${r * 1.4}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
// A puff of smoke: three soft blobs, light grey.
const ntPuff = (x, y, r, cls, f) => `<g class="${cls}" filter="url(#${f})"><circle cx="${x}" cy="${y}" r="${r}" fill="#cfd8dc" opacity=".8"/><circle cx="${(x + r * .8).toFixed(1)}" cy="${(y - r * .5).toFixed(1)}" r="${(r * .75).toFixed(1)}" fill="#eceff1" opacity=".85"/><circle cx="${(x - r * .7).toFixed(1)}" cy="${(y - r * .3).toFixed(1)}" r="${(r * .6).toFixed(1)}" fill="#b0bec5" opacity=".75"/></g>`;
// The smoke as it behaves: it rises from below, swells and thins out, then
// spreads under the ceiling to both sides of the detector.
const ntSmoke = (f) => `<g class="nt-run">${[[42, 114, 9, 1], [58, 118, 10, 3], [74, 114, 9, 5], [50, 120, 8, 2], [66, 118, 9, 4], [82, 120, 8, 6], [36, 120, 7, 4], [60, 112, 8, 6]].map(([x, y, r, d]) => ntPuff(x, y, r, `nta-smoke ntd${d}`, f)).join("")}
${[[48, 50, 7, "nta-spreadL ntd2"], [72, 50, 7, "nta-spreadR ntd4"], [44, 54, 6, "nta-spreadL ntd5"], [76, 54, 6, "nta-spreadR ntd1"], [54, 56, 6, "nta-spreadL ntd3"], [66, 56, 6, "nta-spreadR ntd6"]].map(([x, y, r, cls]) => ntPuff(x, y, r, cls, f)).join("")}</g>`;
// The colours each speaker comes in, the first one its own when none is set:
// [highlight, body, shade, top, detail]. A colour a model is not sold in
// falls back to its first.
const SPK_COLORS = ["white", "black", "silver", "yellow", "orange", "blue"];
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
// A tank humidifier (#89), its body a soft squircle seen from just above: a
// white base with its display and buttons, a smoked tank tapering upwards with
// its water, its tube and its night light, the mist rising from the nozzle.
// What a filament dryer holds: its spools and their colours.
function fdLook(cfg) {
  const n = parseInt(cfg.spool_count, 10);
  const list = Array.isArray(cfg.spool_colors) ? cfg.spool_colors.filter((c) => /^#[0-9a-f]{3,8}$/i.test(String(c))) : [];
  return { count: FD_COUNTS.includes(n) ? n : 2, colors: list.length ? list : FD_COLORS };
}
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
  if (HEAT_NT.includes(type)) return heatReadOf(type, hass, cfg, st);
  const lines = [];
  const raw = st ? String(st.state).trim().toLowerCase() : "";
  const dead = !st || ["unavailable", "unknown", "none", ""].includes(raw);
  const running = ntRunning(hass, cfg, st, watts, threshold);
  // A detector's none is all clear (Shelly Gas), not a missing value.
  const unav = running === null && !(type === "meter" && !dead) && !(type === "detector" && st && raw === "none");
  const tmp = ntTemp(hass, cfg, st);
  const out = (mode, labelKey, color, draw) => ({ mode, label: t(hass, labelKey), color, lines, draw: { ...draw, unav } });
  if (unav) {
    const ml = meterLayoutOf(cfg, st);
    const kinds = { filament_dryer: "dryer", humidifier: "humidifier", water_pump: pumpLayoutOf(cfg, st), floor_heating: "floor", spa: "spa", sauna: "sauna", aquarium: "aquarium", meter: ml === "linky" ? "linky" : `meter_${ml}`, christmas_tree: "tree", mobility: `mob_${mobilityLayoutOf(cfg, st)}`,
      irrigation: `irr_${irrigationLayoutOf(cfg, st)}`, litter_box: `lit_${litterLayoutOf(cfg, st)}`, detector: `det_${detectorLayoutOf(cfg, st)}`, speaker: `spk_${speakerLayoutOf(cfg, st)}`, console: `con_${consoleLayoutOf(cfg, st)}` };
    return out("unav", "ev_offline", NT_COLORS.unav, { kind: kinds[type], on: false, electric: floorLayoutOf(cfg) === "electric", model: type === "water_pump" ? circModelOf(cfg, st) : "",
      palette: cfg.tree_palette, ...(type === "filament_dryer" ? fdLook(cfg) : {}), presents: type === "christmas_tree" && treePresents(cfg), color: type === "speaker" ? speakerColorOf(cfg, st) : "" });
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
    // Netro's watering, OpenSprinkler's running programmes.
    const watering = !!running || (st && ["open", "opening", "watering", "irrigating", "manual", "program", "once_program"].includes(raw));
    const mv = cfg.soil_moisture_entity ? numericState(hass, cfg.soil_moisture_entity) : null;
    const moist = mv === null ? null : Math.max(0, Math.min(1, mv / 100));
    const soil = ntLine(hass, cfg, "irr_soil", "mdi:water-percent", "section_soil_moisture", cfg.soil_moisture_entity);
    if (soil) lines.push({ ...soil, caution: moist !== null && moist < 0.25 });
    const next = ntLine(hass, cfg, "irr_next", "mdi:calendar-clock", "section_next_run", cfg.next_run_entity);
    if (next) lines.push(next);
    const rain = ntOnOff(hass, cfg.rain_delay_entity) || (numberOrNull((stateObj(hass, cfg.rain_delay_entity) || {}).state) > 0);
    // How far the watering is (#85): from a duration entity, or from the time
    // since it started and the time left.
    let progress = null;
    if (watering) {
      const total = cfg.watering_duration_entity ? ntRemaining(hass, cfg.watering_duration_entity) : null;
      const began = st ? Date.parse(st.last_changed) : NaN;
      const ran = isFinite(began) ? Math.max(0, (Date.now() - began) / 1000) : null;
      if (total && total > 0) progress = secs !== null ? 1 - secs / total : ran !== null ? ran / total : null;
      else if (secs !== null && ran !== null && ran + secs > 0) progress = ran / (ran + secs);
      if (progress !== null) progress = Math.max(0, Math.min(100, progress * 100));
    }
    const dur = ntLine(hass, cfg, "irr_duration", "mdi:timer-outline", "irr_duration", cfg.watering_duration_entity);
    if (dur) lines.push(dur);
    const draw = { kind, on: watering, rain, moist, lcd: watering ? left : "", model: tapModelOf(cfg, st), wall: TAP_WALLS.includes(cfg.tap_wall) ? cfg.tap_wall : "brick", progress };
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
    // A contact says full (Tuya's bag_full, PetKit's wastebin), not how full.
    const drawerFull = ntOnOff(hass, domainOf(cfg.waste_drawer_entity) === "binary_sensor" ? cfg.waste_drawer_entity : "");
    if (dl) lines.push({ ...dl, caution: drawerFull || (drawer !== null && drawer >= 0.8) });
    const lv = cfg.litter_level_entity ? numericState(hass, cfg.litter_level_entity) : null;
    const ll = ntLine(hass, cfg, "lit_level", "mdi:texture-box", "sec_litter_level", cfg.litter_level_entity);
    if (ll) lines.push({ ...ll, caution: (lv !== null && unitOf(hass, cfg.litter_level_entity) === "%" && lv <= 20) || ntOnOff(hass, domainOf(cfg.litter_level_entity) === "binary_sensor" ? cfg.litter_level_entity : "") });
    for (const [key, icon, label, id] of [["lit_weight", "mdi:scale", "sec_pet_weight", cfg.pet_weight_entity], ["lit_visits", "mdi:paw", "sec_visits", cfg.visits_entity], ["lit_last", "mdi:clock-outline", "sec_last_use", cfg.last_use_entity]]) {
      const l = ntLine(hass, cfg, key, icon, label, id);
      if (l) lines.push(l);
    }
    const code = raw.replace(/\s+/g, "_");
    const cat = ntOnOff(hass, cfg.cat_present_entity) || ["cst", "csi", "cat_detected", "cat_present"].includes(code) || /cat.?(detect|sensor|present|inside|appear)|pet.?using|chat.?(dedans|present)/.test(raw);
    let mode = "ready";
    // A pause is not a cycle: PetKit's cleaning_paused_system_error is a fault,
    // and an error is said before the word it stopped on.
    const litterFault = /fault|error|erreur|defaut|fehler|jam|pinch/.test(raw);
    if (!litterFault && !/pause/.test(code) && /(^|_)(ccp|ec|cd|scf)$|clean|cycl|nettoy|reinig|limpi|puliz|reinigung|empty_cycle|dump|empty|level|restor|rak|reset|calibr|odor|(^|_)uv(_|$)|maint/.test(code) && !/complete|ccc/.test(code)) mode = "cleaning";
    else if (["dfs", "sdf", "df2"].includes(code) || /full|plein|voll|lleno|pieno/.test(raw) || drawerFull || (drawer !== null && drawer >= 1)) mode = "full";
    else if (["csf", "dhf", "dpf", "otf", "pd", "spf", "hpf", "br", "error", "fault"].includes(code) || litterFault) mode = "fault";
    else if (["off", "sleep", "sleeping", "offline", "p", "paused"].includes(code) || /sleep|veille|schlaf|pause/.test(raw)) mode = "off";
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
    const alarm = !dead && (NT_ON.includes(raw) || /alarm|smoke|detect|leak|wet|fuite|fumee|emergency|warning|mild|heavy|critical|danger/.test(raw)) && !/^(off|ok|clear|dry|normal|idle|test)$|^(no|not|un)[ _-]?|inactive/.test(raw);
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
    // Xbox reports its apps as media too: Netflix is not a game.
    const game = gameOk ? String(gst.state) : a.media_title && a.media_content_type !== "app" ? String(a.media_title) : "";
    const metered = cfg.power_entity && watts !== null && isFinite(threshold);
    const rest = !metered && ["standby", "rest", "rest_mode"].includes(raw);
    const on = metered ? watts >= threshold
      : !dead && ["on", "true", "playing", "idle", "paused", "home", "online", "availabletoplay", "busy", "buffering"].includes(raw);
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
    const lvUnit = cfg.battery_entity ? unitOf(hass, cfg.battery_entity) : "";
    const lv = cfg.battery_entity && (!lvUnit || lvUnit === "%") ? numericState(hass, cfg.battery_entity) : null;
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
    // A level alone says nothing of a charger (Cowboy, MySmartBike): only a
    // plug that is on means it sits on one.
    if (level !== null && ["switch", "input_boolean"].includes(domainOf(cfg.state_entity))) return out("charging", "mob_charging", "#fb8c00", { kind, on: true, st: "charging", level });
    return out("idle", "mob_plugged", NT_COLORS.idle, { kind, on: false, st: "plugged", level });
  }
  if (type === "humidifier") {
    // A tank humidifier (#89): the humidity it reads and the one it aims at,
    // its mist level, its night light and its screen. A tank lifted off the
    // base wins, then a tank run dry.
    const a = (st && st.attributes) || {};
    const own = domainOf(cfg.state_entity) === "humidifier";
    const cur = cfg.current_humidity_entity ? numericState(hass, cfg.current_humidity_entity) : numberOrNull(a.current_humidity);
    const tgt = cfg.target_humidity_entity ? numericState(hass, cfg.target_humidity_entity) : own ? numberOrNull(a.humidity) : null;
    const off = !dead && ["off", "false"].includes(raw);
    const lifted = humTankOut(hass, cfg.tank_lifted_entity);
    const water = humWaterOf(hass, cfg.water_level_entity);
    const lowRaw = cfg.low_water_entity ? String((stateObj(hass, cfg.low_water_entity) || {}).state || "").trim().toLowerCase() : "";
    const empty = (!!cfg.low_water_entity && !/^(ok|normal|sufficient|full|good)$/.test(lowRaw) && heatActive(hass, cfg.low_water_entity)) || (water !== null && water <= .05);
    if (cur !== null) {
      const aim = tgt !== null && !off && Math.round(tgt) !== Math.round(cur);
      lines.push({ key: "humidity", icon: "mdi:water-percent", label: t(hass, "ac_line_humidity"), value: keepTogether(aim ? `${Math.round(cur)} % \u2192 ${Math.round(tgt)} %` : `${Math.round(cur)} %`), entity: cfg.current_humidity_entity || cfg.state_entity });
    }
    if (own && a.mode !== undefined && a.mode !== null && !["", "none"].includes(String(a.mode).toLowerCase())) {
      lines.push({ key: "mode", icon: "mdi:tune-variant", label: t(hass, "line_mode"), value: attrLabel(hass, st, "mode", a.mode, cfg), entity: cfg.state_entity, menu: humidifierModeMenuOf(hass, cfg) ? "hum_mode" : "" });
    }
    const settable = (id) => !!id && ["number", "input_number"].includes(domainOf(id)) && !!stateObj(hass, id);
    const mist = humMistOf(hass, cfg, a);
    if (!settable(cfg.mist_level_entity)) {
      const l = ntLine(hass, cfg, "hum_mist", "mdi:weather-fog", "hum_mist", cfg.mist_level_entity);
      if (l) lines.push({ ...l, menu: humidifierMistMenuOf(hass, cfg) ? "hum_mist" : "" });
    }
    const wl = ntLine(hass, cfg, "hum_water", "mdi:waves-arrow-up", "section_water_level", cfg.water_level_entity);
    if (wl) lines.push(wl);
    const nl = ntLine(hass, cfg, "hum_night", "mdi:weather-night", "hum_night", cfg.night_light_entity);
    if (nl) lines.push(nl);
    // What the card can set, while it is on and has its tank.
    const sliders = [];
    if (!off && !lifted) {
      if (settable(cfg.target_humidity_entity)) sliders.push({ entity: cfg.target_humidity_entity, icon: "mdi:water-percent", label: t(hass, "section_target_humidity") });
      else if (own && !cfg.target_humidity_entity && tgt !== null) {
        sliders.push({ entity: cfg.state_entity, icon: "mdi:water-percent", label: t(hass, "section_target_humidity"), unit: "%", value: tgt,
          min: numberOrNull(a.min_humidity) ?? 30, max: numberOrNull(a.max_humidity) ?? 80, step: numberOrNull(a.target_humidity_step) ?? 1 });
      }
      if (settable(cfg.mist_level_entity)) sliders.push({ entity: cfg.mist_level_entity, icon: "mdi:weather-fog", label: t(hass, "hum_mist") });
    }
    const action = String(a.action || "").toLowerCase();
    // SwitchBot dries its filter (drying), LG and ecobee rest (off, idle).
    const going = !!running && !off && (!action || action === "humidifying") && mist.frac !== 0;
    const draw = { kind: "humidifier", powered: !off, on: going, mist: mist.frac, level: mist.level, hum: cur,
      night: humidifierNightOf(hass, cfg), display: humDisplayOn(hass, cfg.display_entity), water, empty, lifted };
    const done = (r) => ({ ...r, sliders });
    if (lifted) return done(out("lifted", "hum_lifted", NT_COLORS.alarm, draw));
    if (empty) return done(out("empty", "hum_empty", NT_COLORS.alarm, draw));
    if (off) return done(out("off", "ac_off", NT_COLORS.off, draw));
    return done(going ? out("run", "hum_running", "#29a3e0", draw) : out("idle", "ac_idle", NT_COLORS.idle, draw));
  }
  if (type === "water_pump") {
    const layout = pumpLayoutOf(cfg, st);
    if (layout === "circulator") {
      // A heating circulator (#88): its power on the display, the impeller
      // turning at the speed it reports, its head, flow and control mode on
      // lines. Switched on while every value it reports has gone means the
      // link to it is down (Bluetooth, Modbus): no data, not off.
      const add = (key, icon, labelKey, id) => { const l = ntLine(hass, cfg, key, icon, labelKey, id); if (l) lines.push(l); };
      add("circ_speed", "mdi:speedometer", "circ_speed", cfg.speed_entity);
      add("circ_head", "mdi:arrow-collapse-up", "circ_head", cfg.head_entity);
      add("circ_flow", "mdi:waves-arrow-right", "section_water_flow", cfg.flow_entity);
      add("circ_voltage", "mdi:sine-wave", "circ_voltage", cfg.voltage_entity);
      const ms = cfg.control_mode_entity ? stateObj(hass, cfg.control_mode_entity) : null;
      const mode = ms && !HA_OFFLINE_STATES.includes(String(ms.state).toLowerCase()) && String(ms.state) !== "" ? String(ms.state) : "";
      add("circ_mode", "mdi:tune-variant", "circ_mode", mode ? cfg.control_mode_entity : null);
      const model = circModelOf(cfg, st);
      // A circulator draws a few watts at its lowest speed: running from 2 W
      // unless a threshold is set.
      const own = parseFloat(cfg.power_on_threshold);
      const turning = ntRunning(hass, cfg, st, watts, Number.isFinite(own) ? own : 2);
      const rpm = cfg.speed_entity ? numericState(hass, cfg.speed_entity) : null;
      const max = parseFloat(cfg.max_speed);
      const speed = rpm === null ? null : rpm / (Number.isFinite(max) && max > 0 ? max : 4500);
      const fault = !!cfg.fault_entity && heatActive(hass, cfg.fault_entity);
      const values = [cfg.power_entity, cfg.speed_entity, cfg.head_entity, cfg.flow_entity].filter(Boolean);
      const nodata = !dead && NT_ON.includes(raw) && values.length > 0 && values.every((id) => numericState(hass, id) === null);
      const lcd = cfg.power_entity && watts !== null ? `${Math.round(watts)} W` : "";
      const draw = { kind: "circulator", model, speed, lcd, mode: mode.length > 12 ? mode.slice(0, 11) + "\u2026" : mode };
      if (fault) {
        add("heat_fault", "mdi:alert-circle-outline", "heat_fault", cfg.fault_entity);
        return out("fault", "heat_fault", NT_COLORS.alarm, { ...draw, on: false, fault: true });
      }
      if (nodata) return out("nodata", "circ_nodata", "#fb8c00", { ...draw, on: false, nodata: true });
      if (!dead && ["off", "false"].includes(raw)) return out("off", "ac_off", NT_COLORS.off, { ...draw, on: false });
      return turning ? out("run", "circ_running", NT_COLORS.run, { ...draw, on: true }) : out("idle", "ac_idle", NT_COLORS.idle, { ...draw, on: false });
    }
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
  if (type === "filament_dryer") {
    const isOff = !dead && raw === "off" && !(cfg.power_entity && watts !== null && watts >= threshold);
    if (tmp) lines.push({ key: "nt_temp", icon: "mdi:thermometer", label: t(hass, "temperature"), value: keepTogether(tmp.text), entity: cfg.temperature_entity || cfg.state_entity });
    const hum = ntLine(hass, cfg, "nt_humidity", "mdi:water-percent", "ac_line_humidity", cfg.humidity_entity);
    if (hum) lines.push(hum);
    const drying = !isOff && (!!running || /dry|heat|sech|trock/.test(raw));
    const hv = cfg.humidity_entity ? numericState(hass, cfg.humidity_entity) : null;
    const draw = { kind: "dryer", on: drying, ...fdLook(cfg), lcd: tmp ? tmp.text : "", hum: hv === null ? "" : `${Math.round(hv)}%` };
    if (isOff) return out("off", "ac_off", NT_COLORS.off, draw);
    return drying ? out("drying", "fd_drying", NT_COLORS.heat, draw) : out("idle", "ac_idle", NT_COLORS.idle, draw);
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
    // A floor that cools (myVAILLANT, MELCloud) does not heat.
    const cooling = !!running && (String((st && st.attributes && st.attributes.hvac_action) || "").toLowerCase() === "cooling" || raw === "cool");
    if (cooling) return out("cool", "ac_cooling", "#29b6f6", { ...draw, on: false });
    return running ? out("heat", "ac_heating", NT_COLORS.heat, draw) : out("idle", "ac_idle", NT_COLORS.idle, draw);
  }
  if (type === "spa") {
    const isOff = !dead && raw === "off";
    const bubbles = ntOnOff(hass, cfg.bubbles_entity);
    const lit = ntOnOff(hass, cfg.light_entity);
    if (tmp) lines.push({ key: "nt_temp", icon: "mdi:thermometer", label: t(hass, "temperature"), value: keepTogether(tmp.text), entity: cfg.temperature_entity || cfg.state_entity });
    const heating = !!running && !isOff && String((st && st.attributes && st.attributes.hvac_action) || "").toLowerCase() !== "cooling" && raw !== "cooling";
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
    const direction = ["import", "export", "inverted"].includes(cfg.meter_direction) ? cfg.meter_direction : "auto";
    // GoodWe's active_power counts what goes out as positive.
    const flowOf = (w) => direction === "inverted" ? (Math.abs(w) < 1 ? "none" : w > 0 ? "export" : "import")
      : direction === "export" ? (Math.abs(w) < 1 ? "none" : "export")
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
      // An index (linkytic's BASE) is no power; DSMR reports kW.
      const isIndex = /wh$/i.test(unit);
      const kilo = /^k(w|va)$/i.test(unit);
      const w = isIndex ? 0 : kilo ? v * 1000 : v;
      const flow = flowOf(w);
      const heavy = Math.abs(w) >= highW;
      const value = `${isIndex || kilo ? netNumber(hass, Math.abs(v), isIndex ? 0 : 2) : Math.round(Math.abs(v))} ${unit}`;
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
  if (st && !cfg.toggle_entity && type !== "meter" && (["light", "switch", "input_boolean", "valve"].includes(domainOf(cfg.state_entity)) || (type === "humidifier" && domainOf(cfg.state_entity) === "humidifier"))) {
    out.push({ key: "toggle", entity: cfg.state_entity, icon: type === "christmas_tree" ? "mdi:pine-tree" : type === "aquarium" ? "mdi:lightbulb" : type === "mobility" ? "mdi:power-plug" : "mdi:power", label: t(hass, "toggle"),
      on: ["on", "open", "opening"].includes(String(st.state).toLowerCase()) });
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

// The heating parts of #81 to #84: a buffer tank, a fresh water station,
// solar thermal collectors and a log stove. They read temperatures more than
// a state, so they are read here, apart from the other new types.
const HEAT_NT = ["storage_tank", "fresh_water_station", "solar_thermal", "wood_stove"];
const COLLECTOR_STYLES = ["flat", "tubes"];
// A source or a consumer of a tank is idle on these, and on a number at 0.
const HEAT_IDLE = ["off", "false", "0", "no", "idle", "standby", "none", "unknown", "unavailable", "", "aus", "inactive", "closed", "stopped", "paused", "nein",
  "ok", "normal", "no_fault", "no_error", "clear", "good"];
function heatActive(hass, id) {
  const s = id ? stateObj(hass, id) : null;
  if (!s) return false;
  const raw = String(s.state).trim().toLowerCase();
  const n = numberOrNull(s.state);
  if (n !== null) return n > 0;
  return !HEAT_IDLE.includes(raw);
}
// A temperature in degrees Celsius for the colours, whatever its unit.
function heatCelsius(hass, id, v) {
  return /f/i.test(unitOf(hass, id)) ? (v - 32) * 5 / 9 : v;
}
function heatNum(v, def) {
  const n = numberOrNull(v);
  return n === null ? def : n;
}
// A temperature line, as Home Assistant prints it.
function heatTempLine(hass, cfg, key, icon, labelKey, id) {
  const v = id ? numericState(hass, id) : null;
  if (v === null) return null;
  return { key, icon, label: t(hass, labelKey), value: keepTogether(tempText(hass, cfg, id, v, temperatureUnit(hass, id))), entity: id };
}
// The difference between two temperatures, as a line.
function heatDeltaLine(hass, cfg, key, a, b) {
  const va = a ? numericState(hass, a) : null, vb = b ? numericState(hass, b) : null;
  if (va === null || vb === null) return null;
  const unit = /f/i.test(temperatureUnit(hass, a)) ? "\u00b0F" : "K";
  return { key, icon: "mdi:delta", label: t(hass, "heat_delta"), value: keepTogether(`${fixedTemp(hass, va - vb, 1)} ${unit}`), entity: a };
}
function collectorStyleOf(cfg, st) {
  if (COLLECTOR_STYLES.includes(cfg.collector_style)) return cfg.collector_style;
  const hay = stripAccents(`${cfg.state_entity || ""} ${cfg.collector_temperature_entity || ""} ${cfg.name || ""} ${(st && st.attributes.friendly_name) || ""}`).toLowerCase();
  return /tube|vacuum|vakuum|rohre|roehre|evacuated|sous.?vide/.test(hay) ? "tubes" : "flat";
}
function heatReadOf(type, hass, cfg, st) {
  const lines = [];
  const raw = st ? String(st.state).trim().toLowerCase() : "";
  const dead = !st || ["unavailable", "unknown", "none", ""].includes(raw);
  const out = (mode, labelKey, color, draw) => ({ mode, label: t(hass, labelKey), color, lines, draw: { ...draw, unav: mode === "unav" } });
  const fault = cfg.fault_entity && heatActive(hass, cfg.fault_entity);
  const faultLine = () => {
    const f = ntLine(hass, cfg, "heat_fault", "mdi:alert-circle-outline", "heat_fault", cfg.fault_entity);
    if (f) lines.push({ ...f, caution: fault });
  };

  if (type === "storage_tank") {
    // One to five temperatures, top to bottom; the state entity alone is a
    // tank with one probe.
    const ids = entityEntries(cfg.temperature_entities, 5).map((e) => e.entity);
    // A water_heater or a climate entity carries its reading in an attribute.
    const probes = (ids.length ? ids : [cfg.state_entity]).map((id) => ({ id, v: id ? numericState(hass, id) ?? numberOrNull(((stateObj(hass, id) || {}).attributes || {}).current_temperature) : null })).filter((p) => p.v !== null);
    if (!probes.length) return out("unav", "ev_offline", NT_COLORS.unav, { kind: "tank", temps: [] });
    const cs = probes.map((p) => heatCelsius(hass, p.id, p.v));
    const fahrenheit = /f/i.test(temperatureUnit(hass, probes[0].id));
    const lo = heatNum(cfg.charge_min_temp, fahrenheit ? 86 : 30), hi = Math.max(lo + 1, heatNum(cfg.charge_max_temp, fahrenheit ? 140 : 60));
    const loC = heatCelsius(hass, probes[0].id, lo), hiC = heatCelsius(hass, probes[0].id, hi);
    const own = cfg.charge_entity ? numericState(hass, cfg.charge_entity) : null;
    const charge = own !== null ? Math.max(0, Math.min(100, own))
      : 100 * cs.reduce((a, c) => a + Math.max(0, Math.min(1, (c - loC) / (hiC - loC))), 0) / cs.length;
    const srcs = entityEntries(cfg.sources, 6), cons = entityEntries(cfg.consumers, 6);
    const name = (e) => e.name || (stateObj(hass, e.entity) && stateObj(hass, e.entity).attributes.friendly_name) || humanizeEntityId(e.entity);
    const onSrc = srcs.filter((e) => heatActive(hass, e.entity)), onCon = cons.filter((e) => heatActive(hass, e.entity));
    lines.push({ key: "tank_charge", icon: "mdi:battery-heart-variant", label: t(hass, "tank_charge"), value: keepTogether(`${Math.round(charge)} %`), entity: cfg.charge_entity || probes[0].id });
    const vol = heatNum(cfg.tank_volume, null);
    if (vol && vol > 0) {
      // The heat above the cold temperature: litres x 4.186 kJ per kelvin.
      const meanC = cs.reduce((a, c) => a + c, 0) / cs.length;
      const kwh = Math.max(0, vol * 4.186 * (meanC - loC) / 3600);
      lines.push({ key: "tank_energy", icon: "mdi:lightning-bolt", label: t(hass, "tank_energy"), value: keepTogether(`${netNumber(hass, kwh, kwh < 10 ? 1 : 0)} kWh`), entity: probes[0].id });
    }
    if (srcs.length) lines.push({ key: "tank_sources", icon: "mdi:fire", label: t(hass, "tank_sources"), value: onSrc.length ? onSrc.map(name).join(", ") : t(hass, "tank_none"), entity: (onSrc[0] || srcs[0]).entity, wrap: true });
    if (cons.length) lines.push({ key: "tank_consumers", icon: "mdi:radiator", label: t(hass, "tank_consumers"), value: onCon.length ? onCon.map(name).join(", ") : t(hass, "tank_none"), entity: (onCon[0] || cons[0]).entity, wrap: true });
    const loading = onSrc.length > 0;
    const draw = { kind: "tank", on: loading || onCon.length > 0, temps: cs, labels: probes.map((p) => screenTemp(hass, cfg, p.id, p.v)), charge, loading, drawing: onCon.length > 0 };
    if (loading) return out("loading", "tank_loading", NT_COLORS.heat, draw);
    if (charge >= 80) return out("charged", "tank_charged", "#e53935", draw);
    if (charge >= 20) return out("partly", "tank_partly", "#fb8c00", draw);
    return out("discharged", "tank_discharged", NT_COLORS.run, draw);
  }

  if (type === "fresh_water_station") {
    // Drawing water while the flow is above zero or the tank pump runs; the
    // flow rate big on its screen, the outlet temperature otherwise.
    const flowNum = st ? numberOrNull(st.state) : null;
    const pumpOn = cfg.pump_entity ? heatActive(hass, cfg.pump_entity) : false;
    if (dead && !cfg.pump_entity) return out("unav", "ev_offline", NT_COLORS.unav, { kind: "fws", lcd: "" });
    const drawing = (flowNum !== null ? flowNum > 0 : !dead && NT_ON.includes(raw)) || pumpOn;
    const circ = cfg.circulation_entity ? heatActive(hass, cfg.circulation_entity) : false;
    const outV = cfg.temperature_entity ? numericState(hass, cfg.temperature_entity) : null;
    const setV = cfg.target_temperature_entity ? numericState(hass, cfg.target_temperature_entity) : null;
    const supV = cfg.primary_temperature_entity ? numericState(hass, cfg.primary_temperature_entity) : null;
    if (flowNum !== null && st) lines.push({ key: "fws_flow", icon: "mdi:water-pump", label: t(hass, "fws_flow"), value: keepTogether(formatInfoValue(st, hass, null, cfg, cfg.state_entity)), entity: cfg.state_entity });
    for (const [key, icon, label, id] of [["fws_out", "mdi:thermometer-water", "fws_outlet", cfg.temperature_entity], ["fws_set", "mdi:thermometer-check", "section_target_temperature", cfg.target_temperature_entity],
      ["fws_supply", "mdi:thermometer-chevron-up", "fws_supply", cfg.primary_temperature_entity], ["fws_cold", "mdi:snowflake-thermometer", "fws_cold", cfg.cold_water_temperature_entity]]) {
      const l = heatTempLine(hass, cfg, key, icon, label, id);
      if (l) lines.push(l);
    }
    const mod = ntLine(hass, cfg, "fws_mod", "mdi:speedometer", "heat_pump_mod", cfg.pump_modulation_entity);
    if (mod) lines.push(mod);
    const cm = ntLine(hass, cfg, "fws_circ_mode", "mdi:sync", "fws_circ_mode", cfg.circulation_mode_entity);
    if (cm) lines.push(cm);
    faultLine();
    // The supply is too cold under the setpoint plus a margin, 5 by default:
    // some stations hold their setpoint with less (#86).
    const cold = setV !== null && supV !== null && supV < setV + Math.max(0, heatNum(cfg.supply_margin, 5));
    const lcd = drawing && flowNum !== null && st ? formatInfoValue(st, hass, null, cfg, cfg.state_entity) : outV !== null ? screenTemp(hass, cfg, cfg.temperature_entity, outV).replace("\u00b0", `\u00b0${/f/i.test(temperatureUnit(hass, cfg.temperature_entity)) ? "F" : "C"}`) : "";
    const draw = { kind: "fws", on: drawing || circ, drawing, circulating: circ, lcd: String(lcd) };
    if (fault) return out("fault", "heat_fault_state", NT_COLORS.alarm, draw);
    if (drawing) return out("drawing", "fws_drawing", NT_COLORS.run, draw);
    if (cold) return out("cold", "fws_too_cold", "#fb8c00", draw);
    if (circ) return out("circulating", "fws_circulating", NT_COLORS.lit, draw);
    return out("standby", "fws_standby", NT_COLORS.idle, draw);
  }

  if (type === "solar_thermal") {
    // The solar pump runs while the collectors load the tank; a shutdown
    // entity or a collector above the stagnation limit is stagnation, a
    // collector at or below freezing is frost.
    const style = collectorStyleOf(cfg, st);
    const colV = cfg.collector_temperature_entity ? numericState(hass, cfg.collector_temperature_entity) : null;
    const colC = colV === null ? null : heatCelsius(hass, cfg.collector_temperature_entity, colV);
    if (dead && colV === null) return out("unav", "ev_offline", NT_COLORS.unav, { kind: "solth", style, lcd: "" });
    const modV = cfg.pump_modulation_entity ? numericState(hass, cfg.pump_modulation_entity) : null;
    const pump = (!dead && (NT_ON.includes(raw) || numberOrNull(st.state) > 0)) || (modV !== null && modV > 0);
    const stag = (cfg.collector_shutdown_entity && heatActive(hass, cfg.collector_shutdown_entity)) || (colV !== null && colV >= heatNum(cfg.stagnation_temp, /f/i.test(unitOf(hass, cfg.collector_temperature_entity)) ? 248 : 120));
    const full = cfg.tank_full_entity && heatActive(hass, cfg.tank_full_entity);
    const frost = colC !== null && colC <= 0;
    for (const [key, icon, label, id] of [["sth_col", "mdi:solar-panel-large", "sth_collector", cfg.collector_temperature_entity], ["sth_tank", "mdi:storage-tank-outline", "sth_tank", cfg.tank_temperature_entity]]) {
      const l = heatTempLine(hass, cfg, key, icon, label, id);
      if (l) lines.push(l);
    }
    const dl = heatDeltaLine(hass, cfg, "sth_delta", cfg.collector_temperature_entity, cfg.tank_temperature_entity);
    if (dl) lines.push(dl);
    for (const [key, icon, label, id] of [["sth_power", "mdi:fire", "sth_power", cfg.heat_power_entity], ["sth_today", "mdi:solar-power-variant", "sth_today", cfg.today_entity], ["sth_mod", "mdi:speedometer", "heat_pump_mod", cfg.pump_modulation_entity]]) {
      const l = ntLine(hass, cfg, key, icon, label, id);
      if (l) lines.push(l);
    }
    faultLine();
    const lcd = colV !== null ? screenTemp(hass, cfg, cfg.collector_temperature_entity, colV).replace("\u00b0", `\u00b0${/f/i.test(temperatureUnit(hass, cfg.collector_temperature_entity)) ? "F" : "C"}`) : "";
    const draw = { kind: "solth", style, on: pump || stag, lcd, fast: modV === null || modV >= 60, frost: frost && !pump, stagnation: stag };
    if (fault) return out("fault", "heat_fault_state", NT_COLORS.alarm, draw);
    if (stag) return out("stagnation", "sth_stagnation", NT_COLORS.alarm, draw);
    if (pump) return out("loading", "sth_loading", NT_COLORS.heat, draw);
    if (full) return out("full", "sth_full", NT_COLORS.lit, draw);
    if (frost) return out("frost", "sth_frost", NT_COLORS.run, draw);
    return out("standby", "sth_standby", NT_COLORS.idle, draw);
  }

  // A log stove: burning, embers or cold from its temperature and two
  // thresholds; a status entity that is simply on is a fire.
  const scale = heatNum(cfg.temperature_scale, 1) || 1;
  const stoveDomain = ["climate", "water_heater"].includes(domainOf(cfg.state_entity));
  const stoveAction = stoveDomain && st ? String((st.attributes || {}).hvac_action || "").toLowerCase() : "";
  const vRaw = st ? (stoveDomain ? numberOrNull((st.attributes || {}).current_temperature) : numberOrNull(st.state)) : null;
  const v = vRaw === null ? null : vRaw * scale;
  if (dead) return out("unav", "ev_offline", NT_COLORS.unav, { kind: "wood", st: "cold", water: !!cfg.water_jacket });
  const unit = temperatureUnit(hass, cfg.state_entity);
  const inF = /f/i.test(unit);
  const burnT = heatNum(cfg.burning_temp, inF ? 248 : 120), embT = Math.min(burnT, heatNum(cfg.embers_temp, inF ? 122 : 50));
  const fire = stoveAction ? (["heating", "preheating"].includes(stoveAction) ? "burning" : "cold") : v !== null ? (v >= burnT ? "burning" : v >= embT ? "embers" : "cold") : NT_ON.includes(raw) || /burn|fire|feu|brenn|heiz/.test(raw) ? "burning" : "cold";
  if (v !== null) lines.push({ key: "wood_temp", icon: "mdi:thermometer-high", label: t(hass, "wood_temp"), value: keepTogether(tempText(hass, { ...cfg, temperature_decimals: scale !== 1 ? "1" : cfg.temperature_decimals }, scale !== 1 ? null : cfg.state_entity, v, unit)), entity: cfg.state_entity });
  for (const [key, icon, label, id] of [["wood_flow", "mdi:thermometer-chevron-up", "wood_flow", cfg.flow_temperature_entity], ["wood_return", "mdi:thermometer-chevron-down", "wood_return", cfg.return_temperature_entity]]) {
    const l = heatTempLine(hass, cfg, key, icon, label, id);
    if (l) lines.push(l);
  }
  const dl = heatDeltaLine(hass, cfg, "wood_delta", cfg.flow_temperature_entity, cfg.return_temperature_entity);
  if (dl) lines.push(dl);
  const pumpOn = cfg.pump_entity ? heatActive(hass, cfg.pump_entity) : false;
  const waterId = cfg.flow_temperature_entity || cfg.state_entity;
  const waterV = cfg.flow_temperature_entity ? numericState(hass, cfg.flow_temperature_entity) : v;
  const overT = heatNum(cfg.overheat_temp, inF ? 194 : 90);
  const over = !!cfg.water_jacket && waterV !== null && waterV >= overT;
  if (cfg.pump_entity) {
    // A pump left off while the water is hot is worth a glance.
    const hot = !!cfg.water_jacket && waterV !== null && waterV >= Math.min(overT, inF ? 140 : 60) && waterId;
    lines.push({ key: "wood_pump", icon: "mdi:pump", label: t(hass, "wood_pump"), value: t(hass, pumpOn ? "opt_running" : "opt_stopped"), entity: cfg.pump_entity, caution: !pumpOn && !!hot });
  }
  const vs = cfg.valve_entity ? stateObj(hass, cfg.valve_entity) : null;
  if (vs && !HA_OFFLINE_STATES.includes(String(vs.state).toLowerCase())) {
    const pos = numberOrNull(vs.attributes.current_position);
    const n = numberOrNull(vs.state);
    const val = pos !== null ? `${Math.round(pos)} %` : n !== null ? formatInfoValue(vs, hass, null, cfg, cfg.valve_entity) : t(hass, ["open", "opening", "on"].includes(String(vs.state).toLowerCase()) ? "mb_open" : "mb_closed");
    lines.push({ key: "wood_valve", icon: "mdi:valve", label: t(hass, "wood_valve"), value: keepTogether(String(val)), entity: cfg.valve_entity });
  }
  const room = heatTempLine(hass, cfg, "wood_room", "mdi:home-thermometer-outline", "wood_room", cfg.temperature_entity);
  if (room) lines.push(room);
  const last = ntLine(hass, cfg, "wood_last", "mdi:history", "wood_last_fire", cfg.last_fire_entity);
  if (last) lines.push(last);
  // The dial reads to 400 degrees on a flue, to 100 on water.
  const max = burnT >= 100 ? (/f/i.test(unit) ? 800 : 400) : (/f/i.test(unit) ? 212 : 100);
  const draw = { kind: "wood", on: fire !== "cold", st: fire, flue: v, max, low: embT, water: !!cfg.water_jacket, pump: pumpOn, lcd: "" };
  if (over) return out("overheat", "wood_overheat", NT_COLORS.alarm, draw);
  if (fire === "burning") return out("burning", "wood_burning", NT_COLORS.heat, draw);
  if (fire === "embers") return out("embers", "wood_embers", "#fb8c00", draw);
  return out("cold", "wood_cold", NT_COLORS.off, draw);
}
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

// One entry per illustration family. Only the active type's rules are injected,
// so the class names are free to overlap between families and the style tag
// rebuilt on every state change stays small.
// Three presets rather than a free colour: the shell is shaded, so an
// arbitrary hue fights the highlights baked into every illustration. Black
// is a charcoal and white is an off-white for the same reason, a true
// extreme would flatten the body into a silhouette.
const BODY_COLORS = {
  white: { body: "#f1f3f4", hi: "#ffffff", lo: "#d8dcde" },
  grey: { body: "#b6bbbf", hi: "#d0d5d8", lo: "#8e9498" },
  black: { body: "#3b4045", hi: "#515860", lo: "#22262a" },
  red: { body: "#7f2a2e", hi: "#9a383d", lo: "#5a1a1d" },
};

function illustrationCss(type, color) {
  const key = drawKeyOf(type);
  const fn = drawCssOf(DRAW_KEYS.includes(key) ? key : "laundry");
  return fn ? fn(color) : "";
}


// Everything this card renders is concatenated into innerHTML, and much of it
// comes from the integration rather than the dashboard author: SmartThings,
// Home Connect, LG and Miele pass program names, phase labels, friendly names
// and alert keys straight through from a vendor cloud. Unescaped, any of them
// renders as live markup in the user's session, and inside a quoted attribute
// a bare double quote is enough to break out. Escape the five characters that
// matter, everywhere an entity-derived value reaches the template.
function esc(value) {
  return String(value === undefined || value === null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// The fridge drawing. Two sets of coordinates: `body` is laid out against the
// whole cabinet (doors shut), `door[]` against each panel (a door open). The
// display, the handle and the ice dispenser belong to their door and swing
// with it, which is also why an open door shows nothing but its edge.
// Fridges and freezers in three-quarter view: the cabinet with its side and
// top, doors that turn on their hinge (the outside until seen edge on, then
// the inside with its balconies), a lit inside with things standing on glass
// shelves, a cellar's bottles lying on wooden racks, an ice dispenser, a chest
// freezer whose lid lifts and an upright one with see-through drawers. Drawn
// in SVG on a 120 x 135 field. anim (from the card's door animation) sets
// open, freezerOpen and kF / kZ, how far each door has turned.
const FR3 = (() => {
  let n = 0;
  const id = () => `fr${n++}`;
  // The cabinet: front x0..x1, y0..y1; side and top drawn with a depth (dx, dy).
  const DX = 11, DY = -6;
  function cabinet(x0, y0, x1, y1, g) {
    return `<ellipse cx="${(x0 + x1) / 2 + 6}" cy="${y1 + 4}" rx="${(x1 - x0) / 2 + 12}" ry="3.2" fill="rgba(0,0,0,.14)"/>
    <path d="M${x1} ${y0} L${x1 + DX} ${y0 + DY} V${y1 + DY} L${x1} ${y1} Z" fill="url(#${g.side})"/>
    <path d="M${x0} ${y0} L${x0 + DX} ${y0 + DY} H${x1 + DX} L${x1} ${y0} Z" fill="url(#${g.top})"/>
    <path d="M${x1} ${y0} L${x1 + DX} ${y0 + DY}" stroke="rgba(255,255,255,.8)" stroke-width=".7"/>
    <rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" rx="2.5" fill="url(#${g.front})" stroke="rgba(0,0,0,.18)" stroke-width=".6"/>
    <rect x="${x0 + 3}" y="${y1}" width="5" height="3" rx="1" fill="#59616b"/><rect x="${x1 - 8}" y="${y1}" width="5" height="3" rx="1" fill="#59616b"/>`;
  }
  function defs(g, warmLight) {
    return `<defs>
    <linearGradient id="${g.front}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="var(--ac-body-hi, #ffffff)"/><stop offset=".55" stop-color="var(--ac-body, #e9edf1)"/><stop offset="1" stop-color="var(--ac-body-lo, #b9c2ca)"/></linearGradient>
    <linearGradient id="${g.side}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#aeb7bf"/><stop offset="1" stop-color="#8b959e"/></linearGradient>
    <linearGradient id="${g.top}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6f8fa"/><stop offset="1" stop-color="#d5dbe0"/></linearGradient>
    <linearGradient id="${g.door}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--ac-body-hi, #ffffff)"/><stop offset=".6" stop-color="var(--ac-body, #e9edf1)"/><stop offset="1" stop-color="var(--ac-body-lo, #b9c2ca)"/></linearGradient>
    <linearGradient id="${g.cav}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${warmLight ? "#fffdf5" : "#5f6a73"}"/><stop offset="1" stop-color="${warmLight ? "#e3eef5" : "#3d464e"}"/></linearGradient>
    <linearGradient id="${g.handle}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8f99a3"/><stop offset=".4" stop-color="#f3f5f7"/><stop offset="1" stop-color="#7d868f"/></linearGradient>
    <linearGradient id="${g.rec}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b1f24"/><stop offset="1" stop-color="#3a424a"/></linearGradient>
    <linearGradient id="${g.glass}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#cfe9ff" stop-opacity=".55"/><stop offset=".5" stop-color="#ffffff" stop-opacity=".25"/><stop offset="1" stop-color="#cfe9ff" stop-opacity=".5"/></linearGradient>
    <radialGradient id="${g.glow}" cx=".5" cy=".3" r=".7"><stop offset="0" stop-color="#fffbe6" stop-opacity=".9"/><stop offset="1" stop-color="#fffbe6" stop-opacity="0"/></radialGradient>
    </defs>`;
  }
  // A handle standing out from the door: its bar and the shadow it casts.
  const handle = (x, y, h, g) => `<rect x="${x + 1.4}" y="${y + 1}" width="2.4" height="${h}" rx="1.2" fill="rgba(0,0,0,.15)"/><rect x="${x}" y="${y}" width="2.6" height="${h}" rx="1.3" fill="url(#${g.handle})"/><rect x="${x + 2.6}" y="${y + 1.5}" width="1" height="${h - 3}" fill="#6d7680"/>`;
  // The display shows the reading as the card writes it; with no current it is
  // a dark pane.
  const lcd = (x, y, w, v, warn, dark) => v === undefined || v === "" ? "" : `<g class="fr-lcd${warn ? " warn" : ""}"><rect x="${x}" y="${y}" width="${w}" height="8" rx="1.6" fill="#15191d"/>${dark ? "" : `<text x="${x + w / 2}" y="${y + 6}" text-anchor="middle" font-size="${Math.min(5.6, (w * 1.75) / Math.max(3, String(v).length)).toFixed(2)}" font-weight="600" fill="${warn ? "#ff5252" : "#4fc3f7"}">${esc(v)}</text>`}</g>`;
  const seam = (x0, y, x1) => `<path d="M${x0} ${y} H${x1}" stroke="rgba(0,0,0,.28)" stroke-width=".9"/><path d="M${x0} ${y + 1} H${x1}" stroke="rgba(255,255,255,.7)" stroke-width=".5"/>`;
  const vseam = (x, y0, y1) => `<path d="M${x} ${y0} V${y1}" stroke="rgba(0,0,0,.28)" stroke-width=".9"/><path d="M${x + 1} ${y0} V${y1}" stroke="rgba(255,255,255,.6)" stroke-width=".5"/>`;
  // A cube of ice: rounded, pale blue, with a gleam on its corner.
  const cube = (x, y, s, r, cls = "", fall = 14) => `<g class="fr-cube ${cls}" style="--fall:${fall}px"><g transform="translate(${x} ${y}) rotate(${r})"><rect x="${-s / 2}" y="${-s / 2}" width="${s}" height="${s}" rx="${s * .25}" fill="#e6f6ff" stroke="#81c7f5" stroke-width=".45"/><path d="M${-s * .3} ${-s * .25} L${-s * .05} ${-s * .32}" stroke="#fff" stroke-width=".7" stroke-linecap="round"/></g></g>`;
  // The ice and water dispenser: a dark recess, the ice bin behind its window,
  // the chute, the lever, a glass on the drip tray, cubes dropping into it.
  function dispenser(x, y, w, h, s, g) {
    const cx = x + w / 2;
    const bin = s.ice !== undefined ? `<rect x="${x + 2.5}" y="${y + 2.5}" width="${w - 5}" height="9" rx="1.5" fill="#0f1317"/>${s.ice ? [0, 1, 2, 3, 4].map((i) => cube(x + 5 + i * (w - 10) / 4, y + 8 - (i % 2) * 2.2, 3.4, i * 23)).join("") + `<path class="fr-glint" d="M${x + 4} ${y + 4} H${x + w - 4}" stroke="#bfe6ff" stroke-width=".6"/>` : `<text x="${cx}" y="${y + 9}" text-anchor="middle" font-size="3.6" fill="#59616b">\u2014</text>`}` : "";
    const falling = s.ice ? cube(cx, y + 17, 2.8, 15, "drop", 11) + cube(cx - 1, y + 17, 2.6, 40, "drop d2", 11) + cube(cx + 1, y + 17, 2.6, 70, "drop d3", 11) : "";
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="url(#${g.rec})" stroke="rgba(0,0,0,.35)" stroke-width=".5"/>
    <path d="M${x + 1} ${y + 1} H${x + w - 1} L${x + w - 3} ${y + 3} H${x + 3} Z" fill="rgba(0,0,0,.4)"/>
    ${bin}
    <rect x="${cx - 2.5}" y="${y + 13}" width="5" height="3" rx="1" fill="#59616b"/>
    <rect x="${cx - 4}" y="${y + 16.5}" width="1.2" height="7" rx=".6" fill="#8f99a3"/>
    ${falling}
    <path d="M${cx - 4} ${y + h - 9} L${cx - 3.2} ${y + h - 3.6} H${cx + 3.2} L${cx + 4} ${y + h - 9}" fill="url(#${g.glass})" stroke="#9fc6e6" stroke-width=".5"/>
    ${s.ice ? cube(cx - 1.2, y + h - 5.4, 2.4, 20) + cube(cx + 1.4, y + h - 5.8, 2.2, 55) : ""}
    <rect x="${x + 2}" y="${y + h - 3.4}" width="${w - 4}" height="2.2" rx="1" fill="#59616b"/>`;
  }
  // The inside, seen through the open front as a real box: the back wall set
  // back along the cabinet's own depth, the left wall and the floor showing,
  // glass shelves seen a little from above, and things standing on them with
  // a top of their own. What lies right of or above the opening stays hidden
  // behind the frame.
  function box3(x, y, w, h, d, front, top, side) {
    // A box standing at (x, y) bottom-left of its front face, depth d along the
    // cabinet's depth vector.
    const kx = d * 0.73, ky = -d * 0.4;
    return `<path d="M${x} ${y - h} L${x + kx} ${y - h + ky} H${x + w + kx} L${x + w} ${y - h} Z" fill="${top}"/>
    <path d="M${x + w} ${y} L${x + w + kx} ${y + ky} V${y - h + ky} L${x + w} ${y - h} Z" fill="${side}"/>
    <rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${front}"/>`;
  }
  function inside(x0, y0, x1, y1, g, s, freezer) {
    const cid = id(), gl = id(), gb = id(), cy = id(), DXI = 12, DYI = -7;
    const bx0 = x0 + DXI, by0 = y0 + DYI, by1 = y1 + DYI;
    const lit = !s.dark;
    const wallBack = `url(#${gb})`, wallLeft = `url(#${gl})`, floor = lit ? "#c9d6e0" : "#3a434a";
    const grads = `<linearGradient id="${gl}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${lit ? "#aebfcc" : "#2c3338"}"/><stop offset="1" stop-color="${lit ? "#dbe6ee" : "#3d464e"}"/></linearGradient>
    <linearGradient id="${cy}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".35" stop-color="#fff" stop-opacity=".35"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
    <linearGradient id="${gb}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${lit ? "#ffffff" : "#4a545c"}"/><stop offset=".5" stop-color="${lit ? "#eef5fa" : "#434c54"}"/><stop offset="1" stop-color="${lit ? "#d6e2ea" : "#3a434a"}"/></linearGradient>`;
    const shelfYs = freezer === "drawers" ? [] : freezer ? [0.5] : [0.3, 0.58];
    const shelf = (f) => {
      const y = y0 + (y1 - y0) * f;
      return `<path d="M${x0} ${y} L${x0 + DXI} ${y + DYI} H${x1 + 2} V${y} Z" fill="rgba(190,225,250,.55)" stroke="rgba(110,160,195,.7)" stroke-width=".5"/>
      <rect x="${x0}" y="${y}" width="${x1 - x0}" height="1.6" fill="rgba(140,185,215,.9)"/><path d="M${x0} ${y + .3} H${x1}" stroke="#fff" stroke-width=".6"/>
      <path d="M${x0 + 2} ${y + 2.2} L${x0 + DXI + 2} ${y + DYI + 2.2} H${x1 + 2}" stroke="rgba(0,0,0,.08)" stroke-width="1.6" fill="none"/>`;
    };
    const sy = (f) => y0 + (y1 - y0) * f;
    const items = freezer === "drawers" ? drawerStack(x0, y0, x1, y1, s.dark, s.kF === undefined ? 1 : s.kF)
      : freezer
      ? box3(x0 + 6, sy(0.5) - 1, 12, 8, 6, "#90caf9", "#bbdefb", "#64b5f6") + box3(x0 + 21, sy(0.5) - 2, 10, 7, 6, "#ef9a9a", "#ffcdd2", "#e57373")
        + box3(x0 + 7, y1 - 2, 14, 9, 7, "#e0e0e0", "#f5f5f5", "#bdbdbd") + box3(x0 + 25, y1 - 3, 12, 8, 6, "#a5d6a7", "#c8e6c9", "#81c784")
      : box3(x0 + 7, sy(0.3) - 1, 5, 11, 4, "#fafafa", "#eceff1", "#cfd8dc") + `<path d="M${x0 + 7} ${sy(0.3) - 12} l2.5 -2.2 l2.5 2.2 z" fill="#42a5f5"/>`
        + box3(x0 + 16, sy(0.3) - 2, 9, 6, 5, "#ffb74d", "#ffe0b2", "#fb8c00")
        + `<ellipse cx="${x0 + 13}" cy="${sy(0.58) - 4}" rx="4.6" ry="3.6" fill="#e53935"/><path d="M${x0 + 11} ${sy(0.58) - 6} q1.5 -1 3 0" stroke="#fff" stroke-width=".7" fill="none" opacity=".7"/>`
        + standingBottle(x0 + 24, sy(0.58) - 3, 2.3, 16, "#43a047", "#1b5e20", cy)
        + `<ellipse cx="${x0 + 33}" cy="${sy(0.58) - 3}" rx="4" ry="2.4" fill="#fff176"/><ellipse cx="${x0 + 33}" cy="${sy(0.58) - 4}" rx="4" ry="1.6" fill="#fff9c4"/>`
        + box3(x0 + 3, y1 - 1.5, x1 - x0 - 10, 8, 6, "rgba(200,230,200,.75)", "rgba(220,240,220,.7)", "rgba(160,200,160,.75)")
        + `<ellipse cx="${x0 + 12}" cy="${y1 - 7}" rx="3" ry="2.2" fill="#7cb342"/><ellipse cx="${x0 + 20}" cy="${y1 - 6.5}" rx="3" ry="2.2" fill="#fb8c00"/>`;
    const lamp = lit ? `<rect x="${bx0 + 6}" y="${by0 + 1}" width="${x1 - bx0 - 10}" height="2.2" rx="1" fill="#fffde7"/><path d="M${bx0} ${by0 + 2} H${x1}" stroke="none"/>
      <polygon points="${bx0 + 6},${by0 + 3} ${x1 - 4},${by0 + 3} ${x1},${y1} ${x0},${y1}" fill="url(#${g.glow})" opacity=".55"/>` : "";
    return `<defs>${grads}</defs><clipPath id="${cid}"><rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}"/></clipPath>
    <g clip-path="url(#${cid})">
      <rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="${wallLeft}"/>
      <rect x="${bx0}" y="${by0}" width="${x1 - bx0 + 4}" height="${by1 - by0}" fill="${wallBack}"/>
      <path d="M${x0} ${y0} L${bx0} ${by0} V${by1} L${x0} ${y1} Z" fill="${wallLeft}"/>
      <path d="M${x0} ${y1} L${bx0} ${by1} H${x1 + 4} V${y1} Z" fill="${floor}"/>
      <path d="M${bx0} ${by0} V${by1} M${bx0} ${by1} H${x1 + 4}" stroke="rgba(0,0,0,.22)" stroke-width=".8"/>
      <path d="M${bx0 + 1} ${by0} V${by1 - 1} H${x1 + 4}" stroke="rgba(0,0,0,.08)" stroke-width="2.4" fill="none"/>
      ${[0.25, 0.5, 0.75].map((f) => `<path d="M${x0} ${y0 + (y1 - y0) * f} L${bx0} ${by0 + (by1 - by0) * f}" stroke="rgba(0,0,0,.06)" stroke-width=".6"/>`).join("")}
      ${lamp}
      ${shelfYs.map(shelf).join("")}
      ${items}
      ${freezer || !lit ? "" : [0, 1, 2].map((i) => `<path class="fr-mist m${i + 1}" d="M${x0 + 10 + i * 12} ${y1 - 2} q2 3 0 6" stroke="rgba(200,230,255,.8)" stroke-width="1" fill="none"/>`).join("")}
    </g>
    <rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="1.2"/>
    <path d="M${x0 + .6} ${y0 + .6} V${y1 - .6}" stroke="#e9eef2" stroke-width="1.6"/>`;
  }
  // A bottle standing upright, seen slightly from above: round foot, straight
  // sides, a curved shoulder, the neck and its cap.
  function standingBottle(cx, by, r, h, color, cap, shade) {
    const ry = r * 0.32, hb = h * 0.58, sh = h * 0.2, hn = h * 0.22, rn = r * 0.38;
    const t = by - hb, ts = t - sh, tn = ts - hn;
    const d = `M${cx - r} ${t} L${cx - r} ${by} A${r} ${ry} 0 0 0 ${cx + r} ${by} L${cx + r} ${t} C${cx + r} ${t - sh * .55} ${cx + rn} ${ts + sh * .35} ${cx + rn} ${ts} L${cx + rn} ${tn} L${cx - rn} ${tn} L${cx - rn} ${ts} C${cx - rn} ${ts + sh * .35} ${cx - r} ${t - sh * .55} ${cx - r} ${t} Z`;
    return `<path d="${d}" fill="${color}"/><path d="${d}" fill="url(#${shade})"/>
      <rect x="${cx - r}" y="${t + hb * .25}" width="${r * 2}" height="${hb * .4}" fill="#f5f0e1" opacity=".85"/><rect x="${cx - r}" y="${t + hb * .25}" width="${r * 2}" height="${hb * .4}" fill="url(#${shade})"/>
      <rect x="${cx - rn - .2}" y="${tn - 1.6}" width="${rn * 2 + .4}" height="1.8" rx=".4" fill="${cap}"/><ellipse cx="${cx}" cy="${tn - 1.6}" rx="${rn + .2}" ry="${(rn + .2) * .35}" fill="${cap}" opacity=".7"/>
      <path d="M${cx - r * .45} ${t - sh * .2} V${by - 1}" stroke="rgba(255,255,255,.45)" stroke-width=".6"/>`;
  }
  // A jar seen slightly from above: its lid is an ellipse.
  function jar(cx, by, r, h, color, lid, shade) {
    const ry = r * 0.32;
    const d = `M${cx - r} ${by - h} L${cx - r} ${by} A${r} ${ry} 0 0 0 ${cx + r} ${by} L${cx + r} ${by - h} Z`;
    return `<path d="${d}" fill="${color}"/><path d="${d}" fill="url(#${shade})"/>
      <rect x="${cx - r - .2}" y="${by - h - 1.8}" width="${r * 2 + .4}" height="1.8" fill="${lid}"/><ellipse cx="${cx}" cy="${by - h - 1.8}" rx="${r + .2}" ry="${ry}" fill="${lid}"/><ellipse cx="${cx}" cy="${by - h - 1.8}" rx="${r * .8}" ry="${ry * .7}" fill="rgba(255,255,255,.25)"/>`;
  }
  // A wine bottle lying on a rack, neck towards us: tip (tx, ty), its axis going
  // back along (ux, uy).
  function lyingBottle(tx, ty, ux, uy, len, glass, capsule) {
    const nx = -uy, ny = ux; // perpendicular, towards the bottom right
    const prof = [[0, 1.2], [2.6, 1.25], [4.6, 1.25], [6, 2.2], [7.4, 3], [8.8, 3.3], [len, 3.3]];
    const pt = (s0, r, side) => `${(tx + ux * s0 + nx * r * side).toFixed(2)} ${(ty + uy * s0 + ny * r * side).toFixed(2)}`;
    const outline = (from, to) => { const seg = prof.filter(([s0]) => s0 >= from && s0 <= to); return `M${seg.map(([s0, r]) => pt(s0, r, 1)).join(" L")} L${seg.reverse().map(([s0, r]) => pt(s0, r, -1)).join(" L")} Z`; };
    const end = prof[prof.length - 1];
    return `<ellipse cx="${tx + ux * end[0]}" cy="${ty + uy * end[0]}" rx="3.3" ry="3.3" fill="${glass}"/>
      <path d="${outline(0, len)}" fill="${glass}"/>
      <path d="M${pt(5.6, 1.4, -1)} L${pt(len - .5, 2.2, -1)}" stroke="rgba(255,255,255,.28)" stroke-width=".9" stroke-linecap="round"/>
      <path d="${outline(0, 2.6)}" fill="${capsule}"/>
      <ellipse cx="${tx}" cy="${ty}" rx="1.25" ry="1.25" fill="${capsule}" stroke="rgba(0,0,0,.35)" stroke-width=".4"/>`;
  }
  // A door turning on its hinge. Closed it spans W from the hinge (sgn +1: hinge
  // on the left, -1: on the right); wide open its free edge sits wOpen beyond the
  // hinge, inside face towards us (the drawing of door()). k (0..1) is how far
  // it has turned. Until it is seen edge on, its outside turns with it: the panel
  // and what is on it (front). A point gone out by z towards us moves by
  // (-DX, -DY) * z / DEPTH, the cabinet's own depth vector.
  const DEPTH = 40, KD = DX / DEPTH;
  function swing(xh, y0, y1, g, sgn, W, wOpen, kind, front, k = 1) {
    const proj = (th) => sgn * W * Math.cos(th) - KD * W * Math.sin(th);
    const thEdge = Math.atan2(sgn, KD);
    let lo = thEdge, hi = Math.PI * .99;
    for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (Math.abs(proj(m)) < wOpen) lo = m; else hi = m; }
    const th = k * lo, e = proj(th);
    if (Math.sign(e) === sgn) {
      const a = e / (sgn * W), b = Math.sin(th) * 1.4 / (sgn * W);
      const fx = xh + e, fy = (x) => x;
      return `<g transform="matrix(${a} ${b} 0 1 ${xh - a * xh} ${-b * xh})">${front}</g>`
        + `<path d="M${fx} ${y0 + b * sgn * W} V${y1 + b * sgn * W}" stroke="rgba(0,0,0,.35)" stroke-width="${.6 + 2.4 * Math.sin(th)}"/>`;
    }
    PF = Math.min(1, Math.abs(e) / wOpen);
    const d = door(xh, y0, y1, g, -sgn, Math.abs(e), kind);
    PF = 1;
    return d;
  }
  const panel = (x0, y0, x1, y1, g) => `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" rx="2.2" fill="url(#${g.front})" stroke="rgba(0,0,0,.2)" stroke-width=".6"/>`;
  // A door swung wide open on its hinge (dir -1: hinge on the left, +1: on the
  // right), seen from inside: a liner with a gasket, the thickness of the door
  // on its free edge, and balconies that stand out of the liner with what they
  // hold. kind: "bins" (fridge), "glass" (wine cellar: a framed pane, nothing in
  // it), "plain".
  let PF = 1;
  function door(xh, y0, y1, g, dir, w, kind) {
    const P = (u, f) => [xh + dir * w * u, y0 + (y1 - y0) * f + u * PF * (2.5 - 6.5 * (1 - f) + 4 * f)];
    const quad = (u0, f0, u1, f1) => { const a = P(u0, f0), b = P(u1, f0), c = P(u1, f1), d = P(u0, f1); return `M${a} L${b} L${c} L${d} Z`; };
    const lin = id(), cyl = id();
    const defs = `<defs><linearGradient id="${lin}" x1="${dir < 0 ? 1 : 0}" y1="0" x2="${dir < 0 ? 0 : 1}" y2="0"><stop offset="0" stop-color="#cfd8de"/><stop offset=".35" stop-color="#eef2f5"/><stop offset="1" stop-color="#fbfcfd"/></linearGradient>
      <linearGradient id="${cyl}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".35" stop-color="#fff" stop-opacity=".35"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient></defs>`;
    // The thickness of the door, seen on its free edge.
    const e0 = P(1, 0), e1 = P(1, 1), t = dir * 3;
    const edge = `<path d="M${e0} L${e0[0] + t} ${e0[1] + 1} L${e1[0] + t} ${e1[1] + 1} L${e1} Z" fill="url(#${g.side})"/>`;
    let body = `<path d="${quad(0, 0, 1, 1)}" fill="url(#${lin})" stroke="rgba(0,0,0,.25)" stroke-width=".6"/>
      <path d="${quad(.07, .02, .93, .98)}" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="1.4"/>
      <path d="${quad(0, 0, .14, 1)}" fill="rgba(0,0,0,.08)"/>`;
    if (kind === "glass") {
      body += `<path d="${quad(.16, .05, .84, .95)}" fill="rgba(180,215,235,.35)" stroke="#7b6a5a" stroke-width="1.6"/>
        <path d="${quad(.25, .1, .45, .1)} " fill="none"/>
        <path d="M${P(.28, .1)} L${P(.48, .1)} L${P(.24, .55)} L${P(.2, .55)} Z" fill="rgba(255,255,255,.35)"/>`;
    }
    if (kind === "bins") {
      body += [0.24, 0.52, 0.8].map((f, i) => {
        const lip = 4.2, back = [dir * 2.4, -2.6];
        const [ax, ay] = P(.1, f), [bx, by] = P(.9, f);
        // Floor of the balcony, seen from above.
        let out = `<path d="M${ax} ${ay} L${bx} ${by} L${bx + back[0]} ${by + back[1]} L${ax + back[0]} ${ay + back[1]} Z" fill="#dfe7ec"/>`;
        // What stands in it: bottles in the lower one, jars and a carton above.
        const items = i === 2 ? [[.25, "#43a047", 11, 3.2], [.5, "#8d6e63", 10, 3.2], [.75, "#fafafa", 9, 3.6]]
          : i === 1 ? [[.3, "#fff59d", 6, 4.4], [.7, "#ef9a9a", 7, 4]] : [[.3, "#ffcc80", 5, 3.6], [.62, "#b3e5fc", 5.5, 3.6]];
        out += items.map(([u, c, h, wd]) => {
          const [x, y] = P(u, f), cx = x + back[0] * .5, by2 = y + back[1] * .5 - .5;
          return i === 2 ? standingBottle(cx, by2, wd / 2, h + 3, c, "#37474f", cyl) : jar(cx, by2, wd / 2, h * .8, c, i === 1 ? "#e53935" : "#ffffff", cyl);
        }).join("");
        // The front lip, translucent, hiding the feet of what stands behind it.
        out += `<path d="M${ax} ${ay} L${bx} ${by} L${bx} ${by + lip} L${ax} ${ay + lip} Z" fill="rgba(205,228,242,.88)" stroke="#90a4ae" stroke-width=".5"/>
          <path d="M${ax} ${ay + .4} L${bx} ${by + .4}" stroke="#fff" stroke-width=".6"/>`;
        return out;
      }).join("");
    }
    return defs + body + edge;
  }
  // Inside of a wine cellar: dark wood walls in depth, a warm light, wooden racks
  // seen from above with bottles lying on them, their bases towards us.
  // While it cools, snowflakes come and go on its shut doors, one after the
  // other (first picks the first of the four staggers).
  const frost = (s, pts, first, color = "#4fc3f7") => s.cooling === true && !s.dark
    ? pts.map(([x, y], i) => `<g class="fr-flake fr-f${((first + i) % 4) + 1}">${ntFlake(x, y, 3.2, color, .9)}</g>`).join("") : "";
  // Door shut, the cellar's LEDs light it blue;
  // door open, its lamp lights it warm.
  function wineInside(x0, y0, x1, y1, g, s, blue) {
    const cid = id(), gl = id(), gb = id(), DXI = 12, DYI = -7;
    const bx0 = x0 + DXI, by0 = y0 + DYI, by1 = y1 + DYI, lit = !s.dark;
    const grads = `<linearGradient id="${gl}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${lit ? "#2a1d16" : "#141010"}"/><stop offset="1" stop-color="${lit ? "#4a352a" : "#1e1816"}"/></linearGradient>
    <linearGradient id="${gb}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${lit ? "#6b4c3b" : "#241c19"}"/><stop offset="1" stop-color="${lit ? "#3e2c22" : "#1a1513"}"/></linearGradient>`;
    const rows = 5, step = (y1 - y0 - 8) / rows;
    let racks = "";
    for (let r = 0; r < rows; r++) {
      const y = y0 + 10 + step * (r + 1) - 2;
      racks += `<path class="fr-rack" d="M${x0} ${y} L${x0 + DXI} ${y + DYI} H${x1 + 2} V${y} Z" fill="${lit ? "#8d6e63" : "#3e2f29"}"/>
        <rect x="${x0}" y="${y}" width="${x1 - x0}" height="2" fill="${lit ? "#6d4c41" : "#2e2320"}"/><path d="M${x0} ${y + .3} H${x1}" stroke="rgba(255,220,180,.35)" stroke-width=".5"/>`;
      racks += [2, 1, 0].map((c) => lyingBottle(x0 + 7 + c * 14, y - 3.4, 0.864, -0.504, 19, lit ? (c === 1 ? "#4a1a22" : "#26402a") : "#151b16", c === 1 ? "#c9a24b" : "#8e1b2c")).join("");
    }
    const lamp = !lit ? "" : blue
      ? `<rect x="${bx0 + 4}" y="${by0}" width="${x1 - bx0 - 6}" height="3" rx="1.5" fill="#4fc3f7" opacity=".55"/><rect x="${bx0 + 6}" y="${by0 + .6}" width="${x1 - bx0 - 10}" height="1.8" rx=".9" fill="#e1f5fe"/>
      <polygon points="${bx0 + 6},${by0 + 3} ${x1 - 4},${by0 + 3} ${x1},${y1} ${x0},${y1}" fill="#29b6f6" opacity=".3"/>`
      : `<rect x="${bx0 + 6}" y="${by0 + 1}" width="${x1 - bx0 - 10}" height="2" rx="1" fill="#ffe0b2"/>
      <polygon points="${bx0 + 6},${by0 + 3} ${x1 - 4},${by0 + 3} ${x1},${y1} ${x0},${y1}" fill="#ffb74d" opacity=".12"/>`;
    const tint = lit && blue ? `<rect class="fr-cool" x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="#29b6f6" opacity=".34"/>` : "";
    return `<defs>${grads}</defs><clipPath id="${cid}"><rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}"/></clipPath>
    <g clip-path="url(#${cid})">
      <rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="url(#${gl})"/>
      <rect x="${bx0}" y="${by0}" width="${x1 - bx0 + 4}" height="${by1 - by0}" fill="url(#${gb})"/>
      <path d="M${x0} ${y0} L${bx0} ${by0} V${by1} L${x0} ${y1} Z" fill="url(#${gl})"/>
      <path d="M${bx0} ${by0} V${by1}" stroke="rgba(0,0,0,.35)" stroke-width=".8"/>
      ${lamp}${racks}${tint}
    </g>
    <rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="1.2"/>`;
  }

  // Four see-through drawers stacked in an upright freezer, the top one pulled
  // out towards us.
  function drawerStack(x0, y0, x1, y1, dark, k) {
    const goods = [["#66bb6a", "#ef5350", "#fff176"], ["#f48fb1", "#64b5f6", "#ffb74d"], ["#aed581", "#ba68c8", "#e57373"], ["#4db6ac", "#ff8a65", "#90a4ae"]];
    const n = 4, gap = 2.4, h = (y1 - y0 - 6 - gap * n) / n, w = x1 - x0 - 5, d = 12;
    let out = "";
    for (let i = n - 1; i >= 0; i--) {
      const pull = i === 0 ? k : 0;
      const bx = x0 + 2 - pull * 7, by = y0 + 4 + (i + 1) * (h + gap) + pull * 7;
      const kx = d * 0.73, ky = -d * 0.4;
      // Goods first, then the clear plastic tub over them.
      const pk = goods[i].map((col, j) => box3(bx + 3 + j * (w - 6) / 3, by - 1.2, (w - 10) / 3, [6, 4.5, 7][j] * h / 14, 6, col, "rgba(255,255,255,.55)", "rgba(0,0,0,.18)")).join("");
      out += `<path d="M${bx} ${by - h} L${bx + kx} ${by - h + ky} H${bx + w + kx} L${bx + w} ${by - h} Z" fill="rgba(225,240,250,${pull ? .55 : .35})" stroke="rgba(120,170,200,.6)" stroke-width=".4"/>
        ${pk}
        <path d="M${bx + w} ${by} L${bx + w + kx} ${by + ky} V${by - h + ky} L${bx + w} ${by - h} Z" fill="rgba(190,220,240,.45)" stroke="rgba(120,170,200,.6)" stroke-width=".4"/>
        <rect x="${bx}" y="${by - h}" width="${w}" height="${h}" rx="1.2" fill="rgba(215,235,248,${dark ? .25 : .5})" stroke="rgba(110,160,195,.85)" stroke-width=".6"/>
        <rect x="${bx + w / 2 - 7}" y="${by - h + 1.2}" width="14" height="2.4" rx="1.2" fill="#5d6672"/>
        <path d="M${bx + 2} ${by - h + 1} L${bx + 6} ${by - 1}" stroke="rgba(255,255,255,.7)" stroke-width=".8"/>`;
    }
    return out;
  }
  // Chest freezer, seen from the front right and above: the lid lifts on its
  // back hinge and shows the tub, a wire basket and frozen food, cold mist
  // rising out of it.
  function chest(s) {
    const g = { front: id(), side: id(), top: id(), door: id(), cav: id(), handle: id(), rec: id(), glass: id(), glow: id() };
    const tub = id(), lin = id(), cid = id();
    const x0 = 4, x1 = 88, y0 = 66, y1 = 114, KX = 22, KY = -26, lip = 7;
    const lit = !s.dark;
    let out = defs(g, lit) + `<defs><linearGradient id="${tub}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${lit ? "#dfeaf2" : "#3a434a"}"/><stop offset="1" stop-color="${lit ? "#b6c8d6" : "#2a3137"}"/></linearGradient>
      <linearGradient id="${lin}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#cfd8de"/><stop offset="1" stop-color="#f4f7f9"/></linearGradient></defs>`;
    out += `<ellipse cx="${(x0 + x1) / 2 + 9}" cy="${y1 + 3}" rx="${(x1 - x0) / 2 + 16}" ry="3.6" fill="rgba(0,0,0,.14)"/>
      <path d="M${x1} ${y0} L${x1 + KX} ${y0 + KY} V${y1 + KY} L${x1} ${y1} Z" fill="url(#${g.side})"/>
      <rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" rx="2.5" fill="url(#${g.front})" stroke="rgba(0,0,0,.18)" stroke-width=".6"/>
      <rect x="${x0 + 5}" y="${y1 - 11}" width="26" height="6" rx="1.2" fill="#c5ccd3"/>${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${x0 + 7.5 + i * 3.8}" y="${y1 - 10}" width="1.8" height="4" rx=".6" fill="#6b747e"/>`).join("")}
      <rect x="${x0 + 3}" y="${y1}" width="6" height="2.6" rx="1" fill="#59616b"/><rect x="${x1 - 9}" y="${y1}" width="6" height="2.6" rx="1" fill="#59616b"/>
      ${lcd(x1 - 30, y0 + lip + 8, 24, s.fridgeTemp, s.warn, s.dark)}
      <circle cx="${x1 - 27}" cy="${y0 + lip + 21}" r="1.1" fill="${s.warn ? "#ff5252" : "#43a047"}"/>`;
    const rim = [[x0, y0], [x0 + KX, y0 + KY], [x1 + KX, y0 + KY], [x1, y0]];
    if (!s.open) {
      out += `<path d="M${rim.map((p) => p.join(" ")).join(" L")} Z" fill="url(#${g.top})" stroke="rgba(0,0,0,.18)" stroke-width=".6"/>
        <path d="M${x0 + 6} ${y0 - 3} L${x0 + KX - 2} ${y0 + KY + 2} H${x1 + KX - 8}" stroke="#fff" stroke-width="1" fill="none" opacity=".8"/>
        <path d="M${x1} ${y0} L${x1 + KX} ${y0 + KY} V${y0 + KY + lip} L${x1} ${y0 + lip} Z" fill="#a9b2bb"/>
        <rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${lip}" rx="2" fill="url(#${g.door})" stroke="rgba(0,0,0,.2)" stroke-width=".6"/>
        <rect x="${(x0 + x1) / 2 - 15}" y="${y0 + 2.2}" width="30" height="3" rx="1.5" fill="#363d48"/><rect x="${(x0 + x1) / 2 - 13.5}" y="${y0 + 2.6}" width="27" height="1" rx=".5" fill="#8f98a4"/>
        <path d="M${x0} ${y0 + lip + .6} H${x1}" stroke="rgba(0,0,0,.35)" stroke-width=".9"/>
        <g class="nt-run">${[[x0 + 20, y0 - 6], [x0 + 48, y0 - 14], [x0 + 74, y0 - 9], [x1 + 8, y0 - 20]].map(([x, y], i) => `<g class="nta-frost ntd${i + 1}">${ntFlake(x, y, 2.4, "#29b6f6", .7)}</g>`).join("")}</g>`;
      return out;
    }
    // Open: the lid turns on its back hinge. A point of the chest is (x, z, h):
    // z depth from the front (0..D), h height above the rim.
    const D = 40, P3 = (x, z, h) => [x + KX * z / D, y0 + KY * z / D - h];
    const th = (s.kF === undefined ? 1 : s.kF) * 98 * Math.PI / 180, cs = Math.cos(th), sn = Math.sin(th);
    // Inner face from the hinge (z = D, h = -lip) to the front edge; outer face
    // the thickness of the lid further along its normal.
    const inner = (x, f) => P3(x, D - f * D * cs + 0, -lip + f * D * sn);
    const outer = (x, f) => P3(x + 0, D - f * D * cs + lip * sn, -lip + f * D * sn + lip * cs);
    const quad = (A, B, C, E) => `M${A} L${B} L${C} L${E} Z`;
    const lidSvg = th < 1.05
      ? `<path d="${quad(outer(x0, 0), outer(x1, 0), outer(x1, 1), outer(x0, 1))}" fill="url(#${g.top})" stroke="rgba(0,0,0,.18)" stroke-width=".6"/>
        <path d="${quad(outer(x1, 0), inner(x1, 0), inner(x1, 1), outer(x1, 1))}" fill="#a9b2bb"/>
        <path d="${quad(outer(x0, 1), outer(x1, 1), inner(x1, 1), inner(x0, 1))}" fill="url(#${g.door})" stroke="rgba(0,0,0,.2)" stroke-width=".6"/>`
      : `<path d="${quad(inner(x0, 0), inner(x1, 0), inner(x1, 1), inner(x0, 1))}" fill="url(#${lin})" stroke="rgba(0,0,0,.25)" stroke-width=".6"/>
        <path d="${quad(inner(x0 + 4, .08), inner(x1 - 4, .08), inner(x1 - 4, .92), inner(x0 + 4, .92))}" fill="none" stroke="rgba(0,0,0,.16)" stroke-width="1.6"/>
        <path d="${quad(inner(x1, 0), outer(x1, 0), outer(x1, 1), inner(x1, 1))}" fill="url(#${g.side})"/>
        <path d="${quad(inner(x0, 1), inner(x1, 1), outer(x1, 1), outer(x0, 1))}" fill="#c3cad1"/>
        ${lit && th > 1.4 ? (() => { const L0 = inner((x0 + x1) / 2 - 10, .12), L1 = inner((x0 + x1) / 2 + 10, .12); return `<path d="M${L0} L${L1}" stroke="#fffde7" stroke-width="2" stroke-linecap="round"/>`; })() : ""}`;
    // The tub: opening, back and left inner walls, floor, then what it holds.
    const DEP = 15, inset = 3;
    const o = [[x0 + inset, y0 + 1], [x0 + KX + inset * .4, y0 + KY + 2], [x1 + KX - inset, y0 + KY + 2], [x1 - inset, y0 + 1]];
    // Frozen food lying on the floor of the tub, sinking behind the front rim.
    const fl = y0 + 7;
    const foods = box3(x0 + 9, fl, 18, 9, 10, "#90caf9", "#bbdefb", "#64b5f6") + box3(x0 + 29, fl + 1, 14, 8, 9, "#ef9a9a", "#ffcdd2", "#e57373")
      + box3(x0 + 45, fl, 16, 10, 10, "#e0e0e0", "#f5f5f5", "#bdbdbd") + box3(x0 + 17, fl - 9, 13, 7, 8, "#a5d6a7", "#c8e6c9", "#81c784")
      + box3(x0 + 36, fl - 10, 11, 6, 7, "#fff59d", "#fffde7", "#fbc02d")
      + `<ellipse cx="${x0 + 58}" cy="${fl - 12}" rx="7" ry="3.4" fill="#ffcc80"/><ellipse cx="${x0 + 58}" cy="${fl - 13}" rx="7" ry="2.4" fill="#fff3e0"/>`;
    // Wire basket hooked on the rim, on the right.
    const bx = x1 - 24, by = y0 - 6, bw = 26, bh = 10, bd = 20;
    const kx = bd * 0.73, ky = -bd * 0.4;
    const basket = box3(bx + 2, by - 1, 9, 5, 7, "#ffcc80", "#ffe0b2", "#ffb74d") + box3(bx + 12, by - 1, 8, 6, 7, "#b39ddb", "#d1c4e9", "#9575cd")
      + `<path d="M${bx} ${by - bh} L${bx + kx} ${by - bh + ky} H${bx + bw + kx} L${bx + bw} ${by - bh} Z M${bx + bw} ${by} L${bx + bw + kx} ${by + ky} V${by - bh + ky} M${bx} ${by - bh} V${by} H${bx + bw} V${by - bh}" fill="none" stroke="#9aa5ae" stroke-width=".7"/>
      ${[1, 2, 3, 4, 5].map((i) => `<path d="M${bx + i * bw / 6} ${by - bh} V${by}" stroke="#9aa5ae" stroke-width=".45"/>`).join("")}
      <path d="M${bx} ${by - bh / 2} H${bx + bw}" stroke="#9aa5ae" stroke-width=".45"/>`;
    out += `<clipPath id="${cid}"><path d="M${o.map((p) => p.join(" ")).join(" L")} Z"/></clipPath>
      <g clip-path="url(#${cid})">
        <rect x="${x0}" y="${y0 + KY - 2}" width="${x1 - x0 + KX + 4}" height="${-KY + 6}" fill="url(#${tub})"/>
        <path d="M${o[1]} L${o[2]} L${o[2][0]} ${o[2][1] + DEP} L${o[1][0]} ${o[1][1] + DEP} Z" fill="${lit ? "#eef4f8" : "#434c54"}"/>
        <path d="M${o[0]} L${o[1]} L${o[1][0]} ${o[1][1] + DEP} L${o[0][0]} ${o[0][1] + DEP} Z" fill="${lit ? "#c3d3df" : "#2c3338"}"/>
        ${[0.3, 0.6].map((f) => `<path d="M${o[1][0]} ${o[1][1] + DEP * f} H${o[2][0]}" stroke="rgba(255,255,255,.6)" stroke-width=".8"/>`).join("")}
        ${foods}${basket}
      </g>
      <path d="M${o.map((p) => p.join(" ")).join(" L")} Z" fill="none" stroke="#9aa5ae" stroke-width="1.6"/>
      <path d="M${rim.map((p) => p.join(" ")).join(" L")} Z" fill="none" stroke="url(#${g.top})" stroke-width="2.4"/>
      <rect x="${x0}" y="${y0}" width="${x1 - x0}" height="2.6" rx="1" fill="#d5dbe0" stroke="rgba(0,0,0,.2)" stroke-width=".5"/>
      ${lidSvg}
      ${lit && th > 1.2 ? [0, 1, 2, 3].map((i) => `<path class="fr-steam m${i + 1}" d="M${x0 + 18 + i * 18} ${y0 - 4} q-2.5 -3 0 -6 q2.5 -3 0 -6" stroke="rgba(215,238,255,.9)" stroke-width="1.4" fill="none" stroke-linecap="round"/>`).join("") : ""}`;
    return out;
  }
  // Upright freezer: one door, see-through drawers behind it.
  function uprightFreezer(s) {
    const g = { front: id(), side: id(), top: id(), door: id(), cav: id(), handle: id(), rec: id(), glass: id(), glow: id() };
    const x0 = 28, x1 = 84, y0 = 2, y1 = 116;
    let out = defs(g, !s.dark) + cabinet(x0, y0, x1, y1, g);
    const front = `<rect x="${x0 + 3}" y="${y0 + 3}" width="${x1 - x0 - 6}" height="14" rx="2" fill="rgba(0,0,0,.04)"/>`
      + handle(x1 - 7, y0 + 24, 44, g) + lcd(x0 + 5, y0 + 6, 26, s.fridgeTemp, s.warn, s.dark);
    if (s.open) return out + inside(x0 + 1, y0 + 1, x1 - 1, y1 - 1, g, s, "drawers") + swing(x0, y0, y1, g, 1, x1 - x0, 17, "plain", panel(x0, y0, x1, y1, g) + front, s.kF);
    return out + front + `<g class="nt-run">${[[x0 + 9, y0 + 32], [x1 - 15, y0 + 62], [x0 + 12, y0 + 96]].map(([x, y], i) => `<g class="nta-frost ntd${i + 1}">${ntFlake(x, y, 2.2, "#29b6f6", .65)}</g>`).join("")}</g>`;
  }
  function fridge(layout, s) {
    if (layout === "chest") return chest(s);
    if (layout === "drawers") return uprightFreezer(s);
    const g = { front: id(), side: id(), top: id(), door: id(), cav: id(), handle: id(), rec: id(), glass: id(), glow: id() };
    let out = defs(g, !s.dark);
    if (layout === "side_by_side") {
      const x0 = 18, x1 = 90, y0 = 6, y1 = 116, mid = 48;
      out += cabinet(x0, y0, x1, y1, g);
      const rFront = handle(mid + 3.5, y0 + 26, 50, g) + lcd(mid + 10, y0 + 8, 18, s.fridgeTemp, s.warn, s.dark);
      const lFront = lcd(x0 + 5, y0 + 8, 20, s.freezerTemp, false, s.dark) + dispenser(x0 + 3, y0 + 22, 19, 34, s, g) + handle(mid - 5.5, y0 + 26, 50, g);
      if (s.open) out += inside(mid + 1, y0 + 1, x1 - 1, y1 - 1, g, s, false) + swing(x1, y0, y1, g, -1, x1 - mid, 15, "bins", panel(mid, y0, x1, y1, g) + rFront, s.kF);
      else out += vseam(mid, y0, y1) + rFront + frost(s, [[mid + 22, y0 + 62], [mid + 12, y0 + 92]], 0);
      // Dispenser on the left of the freezer door, handle beside the seam in
      // front of it, never hidden behind it.
      if (s.freezerOpen) out += inside(x0 + 1, y0 + 1, mid - 1, y1 - 1, g, s, true) + swing(x0, y0, y1, g, 1, mid - x0, 15, "plain", panel(x0, y0, mid, y1, g) + lFront, s.kZ);
      else out += lFront + frost(s, [[x0 + 9, y0 + 68], [x0 + 21, y0 + 94]], 2);
      out += vseam(mid, y0, y1);
      return out;
    }
    const x0 = 28, x1 = 84, y0 = 2, y1 = 116;
    out += cabinet(x0, y0, x1, y1, g);
    if (layout === "wine") {
      // Closed: the same racks and lying bottles as the open cellar, seen
      // through the tinted glass of the door.
      const wx0 = x0 + 4, wy0 = y0 + 13, wx1 = x1 - 8, wy1 = y1 - 5;
      const glassFront = `<path d="M${x0} ${y0} H${x1} V${y1} H${x0} Z M${wx0} ${wy0} V${wy1} H${wx1} V${wy0} Z" fill="url(#${g.front})" fill-rule="evenodd" stroke="rgba(0,0,0,.2)" stroke-width=".6"/>
        <rect x="${wx0}" y="${wy0}" width="${wx1 - wx0}" height="${wy1 - wy0}" rx="2" fill="url(#${g.glass})" opacity=".45"/>
        <path d="M${wx0 + 3} ${wy0 + 2} L${wx0 + 15} ${wy0 + 2} L${wx0 + 3} ${wy0 + 48} Z" fill="rgba(255,255,255,.14)"/>
        <rect x="${wx0}" y="${wy0}" width="${wx1 - wx0}" height="${wy1 - wy0}" rx="2" fill="none" stroke="#3a3f45" stroke-width="1.6"/>
        ${handle(x1 - 6, y0 + 30, 50, g)}${lcd(x0 + 17, y0 + 3, 20, s.fridgeTemp, s.warn, s.dark)}`;
      if (s.open) return out + wineInside(x0 + 1, y0 + 1, x1 - 1, y1 - 1, g, s) + swing(x0, y0, y1, g, 1, x1 - x0, 17, "glass", glassFront, s.kF);
      return out + wineInside(wx0, wy0, wx1, wy1, g, s, true) + `
        <rect class="fr-glass" x="${wx0}" y="${wy0}" width="${wx1 - wx0}" height="${wy1 - wy0}" rx="2" fill="url(#${g.glass})" opacity=".45"/>
        <rect x="${wx0}" y="${wy0}" width="${wx1 - wx0}" height="${wy1 - wy0}" rx="2" fill="rgba(20,24,28,${s.dark ? .55 : .18})"/>
        <path d="M${wx0 + 3} ${wy0 + 2} L${wx0 + 15} ${wy0 + 2} L${wx0 + 3} ${wy0 + 48} Z" fill="rgba(255,255,255,.14)"/>
        <path d="M${wx0 + 19} ${wy0 + 2} L${wx0 + 23} ${wy0 + 2} L${wx0 + 9} ${wy0 + 56} L${wx0 + 7} ${wy0 + 56} Z" fill="rgba(255,255,255,.08)"/>
        <rect x="${wx0}" y="${wy0}" width="${wx1 - wx0}" height="${wy1 - wy0}" rx="2" fill="none" stroke="#3a3f45" stroke-width="1.6"/>
        ${frost(s, [[wx0 + 9, wy0 + 13], [wx1 - 9, wy0 + 33], [wx0 + 15, wy0 + 57], [wx1 - 11, wy0 + 80]], 0, "#e1f5fe")}
        ${handle(x1 - 6, y0 + 30, 50, g)}${lcd(x0 + 17, y0 + 3, 20, s.fridgeTemp, s.warn, s.dark)}`;
    }
    const cut = layout === "freezer_top" ? 0.34 : layout === "single" ? 1 : 0.63;
    const yc = y0 + (y1 - y0) * cut;
    const fridgeTop = layout !== "freezer_top";
    const fy0 = fridgeTop ? y0 : yc, fy1 = fridgeTop ? (layout === "single" ? y1 : yc) : y1;
    const zy0 = fridgeTop ? yc : y0, zy1 = fridgeTop ? y1 : yc;
    const fFront = handle(x1 - 7, fy0 + (fy1 - fy0) * 0.22, Math.min(40, (fy1 - fy0) * 0.45), g) + lcd(x0 + 5, fy0 + 6, 16, s.fridgeTemp, s.warn, s.dark)
      + (s.ice !== undefined && layout === "freezer_bottom" ? dispenser(x0 + 5, fy0 + 18, 17, 30, s, g) : "");
    if (s.open) out += inside(x0 + 1, fy0 + 1, x1 - 1, fy1 - 1, g, s, false) + swing(x0, fy0, fy1, g, 1, x1 - x0, 17, "bins", panel(x0, fy0, x1, fy1, g) + fFront, s.kF);
    else out += fFront + frost(s, [[x0 + 31, fy0 + (fy1 - fy0) * 0.42], [x0 + 15, fy0 + (fy1 - fy0) * 0.84]], 0);
    if (layout !== "single") {
      out += seam(x0, yc, x1);
      const zFront = handle(x1 - 7, zy0 + 6, Math.min(18, (zy1 - zy0) * 0.4), g) + lcd(x0 + 5, zy0 + 6, 16, s.freezerTemp, false, s.dark);
      if (s.freezerOpen) out += inside(x0 + 1, zy0 + 1, x1 - 1, zy1 - 1, g, s, true) + swing(x0, zy0, zy1, g, 1, x1 - x0, 17, "plain", panel(x0, zy0, x1, zy1, g) + zFront, s.kZ);
      else out += zFront + frost(s, [[x0 + 30, zy0 + (zy1 - zy0) * 0.62]], 2);
    }
    return out;
  }

  return (ctx, anim) => {
    n = 0;
    const L = ctx.layout || "freezer_bottom";
    const cold = L === "chest" || L === "drawers";
    const s = {
      fridgeTemp: cold ? ctx.coldText || undefined : ctx.fridgeTemp,
      freezerTemp: L === "single" || cold ? undefined : ctx.freezerTemp,
      warn: !!ctx.fridgeWarn,
      dark: !!ctx.dark,
      open: cold ? !!(ctx.doorOpen || ctx.freezerDoorOpen) : !!ctx.doorOpen,
      freezerOpen: !cold && !!ctx.freezerDoorOpen,
      ice: L === "wine" ? undefined : ctx.ice,
      cooling: ctx.cooling,
      kF: 1,
      kZ: 1,
      ...(anim || {}),
    };
    return `<svg class="fr-svg" viewBox="0 -10 120 135">${fridge(L, s)}</svg>`;
  };
})();

const MOWER_STYLES = ["classic", "navimow"];
// The mower's style: the one chosen, else its name (Navimow, Segway).
function mowerStyleOf(cfg, st) {
  if (MOWER_STYLES.includes(cfg.mower_style)) return cfg.mower_style;
  const hay = stripAccents(`${cfg.state_entity || ""} ${cfg.name || ""} ${(st && st.attributes && st.attributes.friendly_name) || ""}`).toLowerCase();
  return /navimow|segway/.test(hay) ? "navimow" : "classic";
}
const svgShadow = (cx, rx) => `<ellipse cx="${cx}" cy="103" rx="${rx}" ry="3" fill="rgba(0,0,0,.14)"/>`;
// The shelter over a mower's base, seen three-quarters like the mower: a part
// behind it (the far posts, the shadow, the inside of a shell) and a part in
// front (the near posts, the roof). The rain stops on the roof.
const SHELTER_STYLES = ["lean_to", "shell", "garage"];
const SHELTER_COLORS = {
  white: ["#ffffff", "#e2e6ea", "#c3cad0", "#c9d0d6", "#a3abb2", "#b3bbc2", "#8d959c", "#8a929a", "#aab2b9", "rgba(255,255,255,.9)", "#5f676f"],
  grey: ["#c9ced3", "#9ea5ac", "#7f878f", "#8a9299", "#677078", "#7a838b", "#5c646c", "#545c63", "#747c84", "rgba(255,255,255,.55)", "#3f454b"],
  black: ["#5c636b", "#3b4148", "#2a2f34", "#3a4046", "#262a2f", "#30353a", "#1f2327", "#15181b", "#2e3338", "rgba(255,255,255,.3)", "#1c1f22"],
  green: ["#8fcf8a", "#4f9a4c", "#3a7a38", "#4c8f49", "#33682f", "#41803e", "#2c5a29", "#24491f", "#3d7a3a", "rgba(255,255,255,.5)", "#2c4a2a"],
  orange: ["#ffb067", "#f07f1e", "#c9620f", "#e07314", "#b0560a", "#c8650f", "#9a4a07", "#7f3d05", "#c2600e", "rgba(255,255,255,.55)", "#6b3a12"],
};
// Where each part of a toaster sits: [left, top, width, height] and the
// corners of its top, the slots as [left, top, width], the slices as [class,
// left, top, width, height], the levers as [left, raised, lowered].
const TOASTER_LAYOUTS = {
  two: {
    top: [16, 38, 64, 13, "9px 9px 3px 3px"], face: [16, 49, 64, 45],
    slots: [[23, 40.5, 50], [22, 45.5, 52]], toasts: [["back", 26, 21, 44, 22], ["", 24, 26, 48, 21.5]],
    levers: [[68, 55, 78]], dials: [[22, 63, 11]], btns: [[38, 65], [38, 71]], led: [50, 66],
    tray: [26, 88, 44], feet: [20, 68], air: [18, 2, 60, 36],
  },
  four: {
    top: [4, 38, 88, 13, "9px 9px 3px 3px"], face: [4, 49, 88, 45],
    slots: [[10, 40.5, 34], [9, 45.5, 36], [52, 40.5, 34], [51, 45.5, 36]],
    toasts: [["back", 12, 21, 30, 22], ["", 11, 26, 32, 21.5], ["back", 54, 21, 30, 22], ["", 53, 26, 32, 21.5]],
    levers: [[8, 55, 78], [78, 55, 78]], dials: [[26, 63, 10], [60, 63, 10]], btns: [], led: [46.5, 66],
    tray: [26, 88, 44], feet: [10, 78], air: [6, 2, 84, 36],
  },
  long: {
    top: [4, 47, 88, 10, "8px 8px 2px 2px"], face: [4, 55, 88, 39],
    slots: [[11, 50, 74]], toasts: [["", 13, 32, 34, 20], ["", 49, 32, 34, 20]],
    levers: [[78, 60, 79]], dials: [[13, 66, 10]], btns: [[28, 69]], led: [40, 69.5],
    tray: [30, 88, 36], feet: [10, 78], air: [6, 12, 84, 36],
  },
};
// A laptop's keyboard in the deck's perspective: the deck widens towards the
// front, so each row's keys widen with it and their sides lean like the deck's.
const LAPTOP_COLORS = {
  silver: ["#c9ced4", "#eef0f2", "#8e959c"], space_grey: ["#7d8187", "#a3a7ac", "#55595e"],
  black: ["#3a3f45", "#575d64", "#202428"], midnight: ["#2e3440", "#4a5263", "#1b1f27"], gold: ["#e3cfae", "#f6ead6", "#b89f78"], rose: ["#e6c3bb", "#f6e1dc", "#b9918a"],
};
// The classic one, a PC's, adds its numeric keypad on the right.
const LAPTOP_STYLES = ["thin", "classic"];
const LAPTOP_THIN_RE = /macbook|apple|mac ?book/;
function laptopStyleOf(cfg, st) {
  if (LAPTOP_STYLES.includes(cfg.laptop_style)) return cfg.laptop_style;
  const name = stripAccents(`${cfg.state_entity || ""} ${(st && st.attributes && st.attributes.friendly_name) || ""}`.toLowerCase());
  return LAPTOP_THIN_RE.test(name) ? "thin" : "classic";
}
// Three dishes for the oven, three for the microwave. The card picks one each
// time the appliance starts, so two ovens rarely cook the same thing.
const OVEN_DISHES = [
  (h) => `<path d="M40 70 h40 l-3 5 h-34 Z" fill="#4e342e"/><path d="M40 70 h40" stroke="#6d4c41" stroke-width="1"/>
<ellipse cx="60" cy="65" rx="12" ry="6.4" fill="${h ? "#d9893e" : "#c8a27a"}"/><ellipse cx="57" cy="62.6" rx="6" ry="2.4" fill="#fff" opacity=".22"/>
<ellipse cx="47.5" cy="67" rx="4.4" ry="2.6" fill="${h ? "#c97a34" : "#b8956f"}" transform="rotate(-25 47.5 67)"/><ellipse cx="72.5" cy="67" rx="4.4" ry="2.6" fill="${h ? "#c97a34" : "#b8956f"}" transform="rotate(25 72.5 67)"/>
<circle cx="44.6" cy="68.4" r="1.2" fill="#f5e6d3"/><circle cx="75.4" cy="68.4" r="1.2" fill="#f5e6d3"/>`,
  (h) => `<rect x="38" y="69.5" width="44" height="2.2" rx="1" fill="#7d8792"/>
<ellipse cx="60" cy="68.6" rx="19" ry="3.6" fill="${h ? "#e0a050" : "#d9b98a"}"/><ellipse cx="60" cy="68.2" rx="16" ry="2.7" fill="${h ? "#d84315" : "#b8735a"}"/>
${[[52, 67.8], [60, 69], [67, 67.6], [56, 68.9], [64, 68.6]].map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="${i % 2 ? 1.6 : 2.2}" ry=".9" fill="${i % 2 ? "#fff3c4" : "#8e2a1a"}"/>`).join("")}
<ellipse cx="58" cy="67.6" rx="1.2" ry=".5" fill="#2e7d32"/>`,
  (h) => `<path d="M46 63 h28 v8 a14 2 0 0 1 -28 0 Z" fill="#59616b"/><path d="M46 63 h28" stroke="#9aa4ae" stroke-width=".8"/>
<path d="M47 63.5 Q60 ${h ? 53 : 57} 73 63.5 Z" fill="${h ? "#e8a95a" : "#d9c29a"}"/><path d="M53 60 Q60 ${h ? 57 : 59} 67 60" stroke="#a5652a" stroke-width=".7" fill="none" opacity=".7"/>`,
];
const MW_DISHES = [
  () => `<path d="M34 64 H58 Q57 74 46 74.5 Q35 74 34 64 Z" fill="#f5f5f5"/><ellipse cx="46" cy="64" rx="12" ry="2.6" fill="#ef6c00"/><ellipse cx="46" cy="64" rx="12" ry="2.6" fill="none" stroke="#fff" stroke-width=".8"/>`,
  () => `<ellipse cx="46" cy="72.5" rx="13" ry="2.8" fill="#f5f5f5"/><ellipse cx="46" cy="72" rx="10" ry="1.8" fill="#e0e0e0"/>
<path d="M36 71.6 Q45 66.6 55 70.4 L48 72.8 Z" fill="#e0a050"/><path d="M38 71.2 Q45 67.8 53 70.4 L47.6 72.1 Z" fill="#d84315"/>
<ellipse cx="44" cy="70.4" rx="1.4" ry=".6" fill="#8e2a1a"/><ellipse cx="49" cy="70.9" rx="1.2" ry=".5" fill="#fff3c4"/>`,
  () => `<path d="M53 63 q6 0 6 4.5 q0 4.5 -6 4.5" stroke="#1e88e5" stroke-width="2.2" fill="none"/>
<path d="M39 60.5 H53 V71 Q53 74 50 74 H42 Q39 74 39 71 Z" fill="#1e88e5"/><path d="M41 62 V71" stroke="#fff" stroke-width="1.2" opacity=".35" stroke-linecap="round"/>
<ellipse cx="46" cy="60.5" rx="7" ry="1.7" fill="#fafafa"/><ellipse cx="46" cy="60.5" rx="7" ry="1.7" fill="none" stroke="#1565c0" stroke-width=".6"/>`,
];
const COOK_DISHES = { oven: OVEN_DISHES.length, microwave: MW_DISHES.length };
// The room to a tenth and the setpoint, as a thermostat's line reads them:
// "19.5 \u00b0C -> 21 \u00b0C", or the room alone when off or at the setpoint.
function thermoLine(hass, cfg, entity, room, target) {
  const unit = temperatureUnit(hass, entity);
  const f = thermoFace(hass, cfg, room, target);
  const now = `${f.room} ${unit}`;
  return target !== null && Math.abs(room - target) >= 0.05 ? `${keepTogether(now)} \u2192 ${keepTogether(`${f.target} ${unit}`)}` : keepTogether(now);
}
// The numbers a thermostat shows: the room to a tenth, the setpoint whole
// when it is, both with the language's decimal mark.
function thermoFace(hass, cfg, room, target) {
  const l = lang(hass);
  const fmt = (v, d) => (v === null ? "" : Number(v).toLocaleString(l, { minimumFractionDigits: d, maximumFractionDigits: d }));
  return { room: fmt(room, 1), target: target === null ? "" : fmt(target, Number.isInteger(target) ? 0 : 1) };
}

// What each drawing is filed under: the laundry types share one, as the new
// types drawn by ntHtml do. The released card loads each drawing, with its
// CSS, from a file of its own the first time a card shows it.
function drawKeyOf(type) {
  if (type === "dishwasher") return "dishwasher";
  if (LAUNDRY_TYPES.includes(type)) return "laundry";
  if (NT_TYPES.includes(type)) return "nt";
  return type;
}

function illustrationHtml(type, ctx) {
  const cls = [
    ctx.spinning ? "spinning" : "",
    ctx.heating ? "heating" : "",
    ctx.lit ? "lit" : "",
    ctx.doorOpen ? "open" : "",
    ctx.done ? "done" : "",
    ctx.paused ? "paused" : "",
    ctx.phase && DISHWASHER_PHASES.has(ctx.phase) ? `phase-${ctx.phase}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const draw = drawingOf(drawKeyOf(type));
  return draw ? draw(cls, ctx, type) : "";
}

const DRAW_KEYS = ["dishwasher","laundry","pet_feeder","oven","microwave","hood","nt","fridge","water_heater","thermostat","boiler","air_conditioner","pet_fountain","dehumidifier","space_heater","towel_warmer","air_fryer","ev_charger","pellet_stove","heat_pump","printer_3d","toaster","hair_dryer","network","robot","pool_pump","solar","home_battery","scale","ups","camera","lamp","mailbox","diffuser","hrv","screen","air_purifier","fan","iron","kettle","cooker","coffee","rice_cooker","cooktop"];
const drawn = {};
const drawState = {};
let drawDeps = null;
function requestDrawing(key) {
  drawState[key] = "loading";
  import(assetUrl(`ha-appliance-card-draw-${key}.js`))
    .then((m) => {
      if (!drawDeps) drawDeps = { BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, zoneColumns };
      drawn[key] = m.default(drawDeps);
      drawState[key] = "ready";
      for (const fn of Array.from(langListeners)) {
        try { fn(); } catch (e) { /* one card failing must not stop the others */ }
      }
    })
    .catch((err) => {
      drawState[key] = "failed";
      console.warn(`HA-APPLIANCE-CARD: the ${key} drawing did not load (${err && err.message})`);
    });
}
function drawingOf(key) {
  if (drawn[key]) return drawn[key].draw;
  if (!drawState[key] && DRAW_KEYS.includes(key)) requestDrawing(key);
  return null;
}
function drawCssOf(key) {
  if (drawn[key]) return drawn[key].css;
  if (!drawState[key] && DRAW_KEYS.includes(key)) requestDrawing(key);
  return null;
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

// What makes a card complete without a state entity: a fridge's probe, a
// feeder's control, a charger's plug, and so on. The editor asks for a state
// entity only when nothing else will do (#55).
function stateFreeSource(config) {
  // Every type but the fridge is defined by a state entity. A fridge has no
  // state to report: a temperature probe and a door contact on an ordinary
  // fridge are a complete configuration, and demanding a state entity would
  // only push people to point it at something meaningless.
  const fridgeOnly = config && FRIDGE_ONLY_FIELDS.some((f) => config[f]);
  const asFridge = config && (config.appliance_type === "fridge" || fridgeOnly);
  const hasFridgeSource = fridgeOnly ||
    (asFridge && !!(config.door_entity || config.power_entity));
  // Same for a pet feeder, and for the same reason: most of them report
  // nothing while they wait. A control to serve with, or a counter of what
  // was served, is a complete configuration.
  const feederOnly = config && FEEDER_ONLY_FIELDS.some((f) => config[f]);
  const asFeeder = config && (config.appliance_type === "pet_feeder" || feederOnly);
  const hasFeederSource = feederOnly || (asFeeder && !!config.start_entity);
  // And for a charger with no status to read: the plug says whether a car
  // is there, the power meter whether it charges.
  const asCharger = config && (config.appliance_type === "ev_charger" || EV_ONLY_FIELDS.some((f) => config[f]));
  const hasChargerSource = asCharger && !!(config.vehicle_entity || config.power_entity);
  // And for a screen: its plug's meter or one of its players is enough.
  const asScreen = config && (config.appliance_type === "screen" || SCREEN_ONLY_FIELDS.some((f) => config[f]));
  const hasScreenSource = asScreen && !!(config.power_entity || SCREEN_MEDIA_FIELDS.some((f) => config[f]));
  // And for a pool pump on a smart plug: the meter says whether it filters.
  const asPool = config && (config.appliance_type === "pool_pump" || POOL_ONLY_FIELDS.some((f) => config[f]));
  const hasPoolSource = asPool && !!config.power_entity;
  // And for panels, whose power is all there is to read, and a battery,
  // read from its level or its power.
  const asSolar = config && (config.appliance_type === "solar" || SOLAR_ONLY_FIELDS.some((f) => config[f]));
  const hasSolarSource = asSolar && !!config.power_entity;
  const asBattery = config && (config.appliance_type === "home_battery" || BATTERY_ONLY_FIELDS.some((f) => config[f]));
  const hasBatterySource = asBattery && !!(config.battery_entity || config.power_entity || config.charge_power_entity || config.discharge_power_entity);
  // And for a UPS: its input voltage says whether the mains is there.
  const asUps = config && (config.appliance_type === "ups" || UPS_ONLY_FIELDS.some((f) => config[f]));
  const hasUpsSource = asUps && !!(config.input_voltage_entity || config.battery_entity);
  // And for a pump, a heater, a tree on a smart plug: the meter says it runs.
  const hasNtSource = !!config && NT_TYPES.includes(config.appliance_type) && config.appliance_type !== "meter" && !!config.power_entity;
  return !!(hasFridgeSource || hasFeederSource || hasChargerSource || hasScreenSource || hasPoolSource
    || hasSolarSource || hasBatterySource || hasUpsSource || hasNtSource);
}

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
      .filter((a) => controlFitsState(a.key, norm, cap, cfg, toggleOn));

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
let editorLoading = null;
function loadEditor() {
  if (customElements.get("ha-appliance-card-editor")) return Promise.resolve();
  if (!editorLoading) {
    editorLoading = import(assetUrl("ha-appliance-card-editor.js"))
      .then((m) => m.default({ t, onLanguageLoaded, LANGUAGE_NAMES, localizedHass, activationOf, TH_LAYOUTS, EV_POWER_THRESHOLD, stateObj, parseValueMap, stringifyValueMap, alertsArray, entityEntries, LIST_OTHER, ENTITY_LISTS, listCandidates, defaultCardName, stripDeviceName, domainOf, INFO_MAX, autoSuggest, APPLIANCE_TYPES, STATE_DOMAINS, SCREEN_ONLY_FIELDS, illustrationSizeOf, fontScaleOf, compactModeOf, TYPE_GROUPS, caps, detectApplianceType, SCREEN_STANDBY_W, SCREEN_LAYOUTS, SCREEN_IMAGES, screenLayoutOf, screenIsTablet, HD_HEAT_W, PLUG_THRESHOLDS, ZONE_POWER_W, PLUG_SOURCE_TYPES, plugSourceOf, DW_DRY_MIN, WASH_HEAT_W, WASH_SPIN_W, DRYER_HEAT_W, NET_LAYOUTS, SWITCH_PORTS, NET_BAYS, NET_BUSY_MBIT, NET_TEMP_ALERT, netLayoutOf, ROBOT_LAYOUTS, ROBOT_STATIONS, ROBOT_BOX_COLORS, ROBOT_FLOORS, ROBOT_SERVICES, STICK_AWAY_W, robotLayoutOf, PRINTER_STYLES, printerStyleOf, POOL_PRESSURE_ALERT, SOLAR_LAYOUTS, BATTERY_LAYOUTS, BATTERY_IDLE_W, DIFFUSER_LAYOUTS, illustrationTapOf, UNIT_FILTERS, HRV_LAYOUTS, hrvLayoutOf, CAMERA_LAYOUTS, MAILBOX_LAYOUTS, MAILBOX_SIDES, mailboxLayoutOf, MAILBOX_COLORS_3D, LAMP_LAYOUTS, LAMP_SPOTS, lampLayoutOf, FD_COUNTS, CONSOLE_LAYOUTS, IRRIGATION_LAYOUTS, TAP_MODELS, TAP_WALLS, LITTER_LAYOUTS, DETECTOR_LAYOUTS, SPEAKER_LAYOUTS, MOBILITY_LAYOUTS, PUMP_LAYOUTS, CIRC_MODELS, FLOOR_LAYOUTS, OPT_LINES, METER_LAYOUTS, meterLayoutOf, irrigationLayoutOf, detectorLayoutOf, TREE_PALETTES, TREE_PRESENTS, pumpLayoutOf, SPK_COLORS, COLLECTOR_STYLES, UPS_BATTERY_LOW, HISTORY_HOURS, BODY_COLORS, esc, MOWER_STYLES, SHELTER_STYLES, SHELTER_COLORS, LAPTOP_COLORS, LAPTOP_STYLES, drawn, stateFreeSource }))
      .catch((err) => {
        editorLoading = null;
        throw err;
      });
  }
  return editorLoading;
}


customElements.define("ha-appliance-card", ApplianceCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "ha-appliance-card",
  name: "HA Appliance Card",
  description: "Card for washers, dryers, dishwashers, ovens, microwaves, cooker hoods & cooktops. Works with any brand or integration via configurable entity mapping.",
});
