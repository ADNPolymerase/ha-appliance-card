const CARD_VERSION = "2.15.1";

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
    section_program: "Program", section_remaining: "Remaining time",
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
    kettle_off: "Off", fridge_compartment: "Fridge",
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
    color_white: "White", color_grey: "Grey", color_black: "Black",
    type_water_heater: "Water heater", type_boiler: "Boiler", type_heat_pump: "Heat pump",
    boiler_space_heating: "Heating", boiler_hot_water: "Hot water", boiler_burner: "Burner on", boiler_starting: "Ignition", boiler_waiting: "Waiting", hp_cooling: "Cooling", hp_defrost: "Defrosting",
    section_space_heating: "Central heating indicator", section_hot_water: "Hot water indicator", section_flow_temperature: "Flow temperature", section_heat_output: "Heat output", section_cop: "Coefficient of performance (COP)", section_outdoor_temperature: "Outdoor temperature",
    section_cooling: "Cooling indicator", section_cooling_power: "Power while cooling", section_cooling_output: "Cooling output", section_hot_water_power: "Power while heating water", section_hot_water_output: "Heat output for hot water",
    section_return_temperature: "Return temperature", section_water_flow: "Water flow", section_compressor: "Compressor", hp_delta: "Delta", section_fan_speed: "Fan speed",
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
    type_pet_feeder: "Pet feeder", feeder_ready: "Ready", feeder_feeding: "Dispensing", section_portions_today: "Portions today", section_weight_today: "Weight today", section_portion_weight: "Portion weight", section_serving_size: "Serving size", section_feeder_schedule: "Schedule", section_last_feed: "Last feed", section_error: "Error indicator", start_option: "Option to select", start_value: "Value to write", portions: "portions",
    feeder_empty: "Tank empty", feeder_level: "Tank at {pct}", section_level: "Food level", level_empty_below: "Empty at or below", level_max: "Tank capacity",
    section_feeder_layout: "Model", layout_tower: "Tower, built-in bowl", layout_canister: "Round tank, separate bowl",
    type_iron: "Iron", section_iron_layout: "Model", layout_iron: "Iron", layout_generator: "Steam generator",
    iron_heating: "Heating", iron_off: "Off", left_on: "Left on", left_on_after: "Warn after (minutes switched on)",
    washer_dryer: "Washer-dryer (washes and dries)", step_drying: "Drying", section_cycle_phase: "Cycle phase",
    step_prewash: "Pre-wash", step_soaking: "Soaking", step_weighing: "Weighing", step_filling: "Filling", step_washing: "Washing", step_rinsing: "Rinsing", step_draining: "Draining", step_spinning: "Spinning", step_cooling: "Cooling", step_anti_crease: "Anti-crease", step_steam: "Steam",
  },
  fr: {
    idle: "En veille", running: "En cours", paused: "En pause", done: "Termin\u00e9",
    delayed: "D\u00e9part diff\u00e9r\u00e9", error: "Erreur", unknown: "Inconnu",
    program: "Programme", remaining: "restant", ready_at: "fin ~", time_done: "Fin",
    door_open: "Porte ouverte", door_closed: "Porte ferm\u00e9e", alerts: "Alertes",
    alerts_n_one: "{n} alerte", alerts_n_few: "{n} alertes", alerts_n_many: "{n} alertes", alerts_n_other: "{n} alertes",
    connected: "Connect\u00e9", disconnected: "D\u00e9connect\u00e9",
    start: "D\u00e9marrer", pause: "Pause", resume: "Reprendre", stop: "Stop",
    name: "Nom", icon: "Ic\u00f4ne", entity: "Entit\u00e9",
    main_settings: "Entit\u00e9s principales", display_settings: "Affichage",
    action_settings: "Commandes",
    group_general: "R\u00e9glages g\u00e9n\u00e9raux",
    compact: "Mode compact (masquer l'ic\u00f4ne)",
    state_show_raw: "Toujours afficher le texte brut de l'entit\u00e9 plut\u00f4t que le libell\u00e9 traduit",
    appliance_type: "Type d'appareil",
    type_auto: "D\u00e9tection auto", type_washer: "Lave-linge", type_dryer: "S\u00e8che-linge", type_dishwasher: "Lave-vaisselle",
    state_entity: "Entit\u00e9 d'\u00e9tat (obligatoire)",
    program_entity: "Entit\u00e9 programme",
    program_format: "Format du nom de programme",
    program_format_raw: "Brut", program_format_clean: "Nettoy\u00e9",
    remaining_time_entity: "Entit\u00e9 temps restant",
    remaining_time_unit: "Unit\u00e9 du temps restant",
    remaining_time_hide_when_idle: "Masquer le temps restant hors fonctionnement",
    remaining_time_split: "Afficher l'heure de fin sur une ligne \u00e0 part",
    unit_auto: "D\u00e9tection auto", unit_seconds: "Secondes", unit_minutes: "Minutes",
    progress_entity: "Entit\u00e9 progression % (remplace l'estimation)",
    door_entity: "Entit\u00e9 capteur de porte",
    door_open_state: "Valeur d'\u00e9tat \"ouverte\"",
    door_invert: "Inverser (l'\u00e9tat signifie ferm\u00e9e, pas ouverte)",
    door_hide_in_list: "Ne pas afficher dans la liste d'infos",
    alerts_entity: "Entit\u00e9 alertes (fa\u00e7on attributs)",
    info_entities: "Entit\u00e9s d'info compl\u00e9mentaires (IDs s\u00e9par\u00e9s par virgule)",
    connectivity_entity: "Entit\u00e9 de connectivit\u00e9",
    connectivity_connected_state: "Valeur d'\u00e9tat \"connect\u00e9\"",
    start_entity: "Entit\u00e9 bouton D\u00e9marrer",
    pause_entity: "Entit\u00e9 bouton Pause",
    resume_entity: "Entit\u00e9 bouton Reprendre",
    stop_entity: "Entit\u00e9 bouton Stop / Reset",
    section_program: "Programme", section_remaining: "Temps restant",
    section_ready_at: "Fin pr\u00e9vue",
    section_progress: "Progression % (remplace l'estimation)", section_door: "Capteur de porte",
    section_alerts: "Alertes", section_connectivity: "Connectivit\u00e9",
    section_info: "Entit\u00e9s d'info compl\u00e9mentaires", section_lines_order: "Ordre des lignes",
    info_count: "Nombre d'entit\u00e9s suppl\u00e9mentaires",
    section_alert_list: "Entit\u00e9s d'alerte", alerts_add: "Ajouter une alerte\u2026", list_other: "Autre entit\u00e9\u2026", list_remove: "Retirer",
    section_corner_list: "Interrupteurs dans les coins", corners_add: "Ajouter un interrupteur\u2026",
    info_label: "Nom affich\u00e9 (optionnel)",
    info_value_map: "Correspondance des valeurs (optionnel)",
    info_value_map_placeholder: "Une par ligne, ex.\n0: Pr\u00eat\n1: Lavage",
    info_hide_unit: "Masquer l'unit\u00e9",
    state_map_placeholder: "Une par ligne, ex.\nReady: idle\nAborting: running\n*: running",
    info_drag: "Glisser pour r\u00e9organiser",
    section_start: "Bouton D\u00e9marrer", section_pause: "Bouton Pause",
    section_resume: "Bouton Reprendre", section_stop: "Bouton Stop / Reset",
    picker_icon: "Ic\u00f4ne (optionnel)",
    type_oven: "Four", type_microwave: "Micro-ondes",
    type_hood: "Hotte", type_cooktop: "Plaque de cuisson",
    preheating: "Pr\u00e9chauffage", standby: "En veille",
    temperature: "Temp\u00e9rature", fan_speed: "Vitesse",
    filter: "Filtre", power: "Puissance",
    power_level: "Niveau de puissance", child_lock: "S\u00e9curit\u00e9 enfant",
    residual_heat: "Chaleur r\u00e9siduelle", boost: "Intensif",
    light: "\u00c9clairage", filter_reset: "R\u00e9initialiser le filtre",
    zone: "Foyer", zones_active: "foyers actifs",
    section_target_temperature: "Temp\u00e9rature de consigne", section_current_temperature: "Temp\u00e9rature actuelle",
    section_light: "\u00c9clairage", section_heating: "Indicateur de chauffe",
    section_power_level: "Niveau de puissance", section_fan: "Ventilation",
    section_filter_life: "Usure du filtre", section_filter_reset: "Bouton de r\u00e9initialisation du filtre",
    section_boost: "Mode intensif", section_child_lock: "S\u00e9curit\u00e9 enfant",
    section_power: "Consommation", section_zones: "Foyers de cuisson",
    target_temperature_entity: "Entit\u00e9 temp\u00e9rature de consigne", current_temperature_entity: "Entit\u00e9 temp\u00e9rature actuelle",
    light_entity: "Entit\u00e9 \u00e9clairage", heating_entity: "Entit\u00e9 de chauffe (optionnel)",
    power_level_entity: "Entit\u00e9 niveau de puissance", fan_entity: "Entit\u00e9 ventilation",
    filter_life_entity: "Entit\u00e9 usure du filtre (%)", filter_reset_entity: "Entit\u00e9 bouton de r\u00e9initialisation du filtre",
    boost_entity: "Entit\u00e9 mode intensif", child_lock_entity: "Entit\u00e9 s\u00e9curit\u00e9 enfant",
    power_entity: "Entit\u00e9 puissance (W)", power_on_threshold: "En marche au-dessus de cette puissance (W)",
    zones_count: "Nombre de foyers", zone_level_entity: "Entit\u00e9 niveau",
    section_toggle: "Interrupteur", toggle: "Marche / Arr\u00eat",
    off_short: "Arr\u00eat", toggle_entity: "Entit\u00e9 interrupteur",
    zone_residual_entity: "Entit\u00e9 chaleur r\u00e9siduelle", zone_name: "Nom du foyer (optionnel)",
    type_fridge: "R\u00e9frig\u00e9rateur", type_kettle: "Bouilloire",
    fridge_ok: "Normal", temp_high: "Temp\u00e9rature haute",
    unplugged: "D\u00e9branch\u00e9", no_power: "Aucune consommation", section_plug: "Interrupteur de la prise", no_power_after: "Alerter apr\u00e8s (minutes sans consommation)", temperature_decimals: "Pr\u00e9cision de la temp\u00e9rature", precision_auto: "Comme l'entit\u00e9", precision_0: "Au degr\u00e9", precision_1: "Au dixi\u00e8me", kettle_heating: "En chauffe",
    kettle_off: "\u00c0 l'arr\u00eat", fridge_compartment: "R\u00e9frig\u00e9rateur",
    freezer_compartment: "Cong\u00e9lateur", ice_maker: "Gla\u00e7ons",
    since: "depuis", section_fridge_layout: "Implantation",
    layout_single: "Une porte", layout_freezer_bottom: "Cong\u00e9lateur en bas",
    layout_freezer_top: "Cong\u00e9lateur en haut", layout_side_by_side: "Am\u00e9ricain", layout_wine: "Porte vitr\u00e9e (cave \u00e0 vin)",
    section_fridge_temperature: "Temp\u00e9rature du r\u00e9frig\u00e9rateur", section_freezer_temperature: "Temp\u00e9rature du cong\u00e9lateur",
    section_freezer_door: "Capteur de porte du cong\u00e9lateur", section_ice_maker: "Machine \u00e0 gla\u00e7ons",
    fridge_max_temperature: "Alerter au-dessus de cette temp\u00e9rature", section_kettle_temperature: "Temp\u00e9rature de l'eau",
    ice_on: "En marche", ice_off: "\u00c0 l'arr\u00eat", doors_closed: "Portes ferm\u00e9es",
    fridge_door_open: "R\u00e9frig\u00e9rateur ouvert", freezer_door_open: "Cong\u00e9lateur ouvert",
    type_cooker: "Robot cuiseur", type_coffee: "Machine \u00e0 caf\u00e9",
    water_empty: "R\u00e9servoir d'eau vide", beans_empty: "Bac \u00e0 grains vide",
    tray_full: "Bac d'\u00e9gouttage plein", descale: "D\u00e9tartrage \u00e0 faire",
    speed: "Vitesse", section_speed: "Vitesse du couteau",
    section_water: "R\u00e9servoir d'eau", section_beans: "Bac \u00e0 grains",
    section_tray: "Bac d'\u00e9gouttage", section_descaling: "D\u00e9tartrage",
    cups: "Tasses", strength: "Force",
    section_cups: "Nombre de tasses", section_strength: "Force du caf\u00e9",
    type_rice_cooker: "Cuiseur \u00e0 riz", keep_warm: "Maintien au chaud",
    language: "Langue", language_auto: "Suivre Home Assistant",
    illustration_color: "Couleur de l'appareil", color_auto: "Suivre le th\u00e8me",
    color_white: "Blanc", color_grey: "Gris", color_black: "Noir",
    type_water_heater: "Chauffe-eau", type_boiler: "Chaudi\u00e8re", type_heat_pump: "Pompe \u00e0 chaleur",
    boiler_space_heating: "Chauffage", boiler_hot_water: "Eau chaude", boiler_burner: "Br\u00fbleur allum\u00e9", boiler_starting: "Allumage", boiler_waiting: "En attente", hp_cooling: "Rafra\u00eechissement", hp_defrost: "D\u00e9givrage",
    section_space_heating: "Indicateur de chauffage", section_hot_water: "Indicateur d'eau chaude", section_flow_temperature: "Temp\u00e9rature de d\u00e9part", section_heat_output: "Chaleur produite", section_cop: "Coefficient de performance (COP)", section_outdoor_temperature: "Temp\u00e9rature ext\u00e9rieure",
    section_cooling: "Indicateur de rafra\u00eechissement", section_cooling_power: "Puissance en rafra\u00eechissement", section_cooling_output: "Froid produit", section_hot_water_power: "Puissance pour l'eau chaude", section_hot_water_output: "Chaleur produite pour l'eau chaude",
    section_return_temperature: "Temp\u00e9rature de retour", section_water_flow: "D\u00e9bit d'eau", section_compressor: "Compresseur", hp_delta: "\u00c9cart", section_fan_speed: "Vitesse du ventilateur",
    hp_flow_return: "D\u00e9part et retour", no_hot_water: "Pas de ballon d'eau chaude", underfloor_heating: "Plancher chauffant au lieu des radiateurs",
    type_printer_3d: "Imprimante 3D", section_nozzle_temperature: "Temp\u00e9rature de la buse", section_nozzle_target: "Consigne de la buse",
    section_bed_temperature: "Temp\u00e9rature du plateau", section_bed_target: "Consigne du plateau", section_chamber_temperature: "Temp\u00e9rature de l'enceinte",
    section_current_layer: "Couche en cours", section_total_layers: "Nombre de couches", section_print_file: "Fichier imprim\u00e9",
    section_print_stage: "\u00c9tape d'impression", section_printer_layout: "Ch\u00e2ssis", layout_enclosed: "Ferm\u00e9e (caisson)",
    layout_open: "Ouverte (plateau mobile)", unit_hours: "Heures", p3_nozzle: "Buse",
    p3_bed: "Plateau", p3_chamber: "Enceinte", p3_layer: "Couche",
    p3_file: "Fichier", p3_printing: "Impression", p3_preparing: "Pr\u00e9paration",
    p3_cancelled: "Annul\u00e9e", p3_failed: "\u00c9chec", p3_offline: "Hors ligne",
    p3_attention: "Intervention requise", p3_leveling: "Nivellement du plateau", p3_filament: "Changement de filament",
    p3_cooling: "Refroidissement", p3_calibrating: "Calibrage", p3_homing: "Mise \u00e0 l'origine",
    section_printed_part: "Pi\u00e8ce imprim\u00e9e", part_cube: "Cube", part_pyramid: "Pyramide", part_duck: "Canard en plastique",
    type_pet_feeder: "Distributeur de croquettes", feeder_ready: "Pr\u00eat", feeder_feeding: "Distribution", section_portions_today: "Portions du jour", section_weight_today: "Poids du jour", section_portion_weight: "Poids d'une portion", section_serving_size: "Taille de la portion", section_feeder_schedule: "Planning", section_last_feed: "Dernier repas", section_error: "Indicateur d'erreur", start_option: "Option \u00e0 choisir", start_value: "Valeur \u00e0 \u00e9crire", portions: "portions",
    feeder_empty: "R\u00e9servoir vide", feeder_level: "R\u00e9servoir \u00e0 {pct}", section_level: "Niveau de croquettes", level_empty_below: "Vide \u00e0 ce niveau ou moins", level_max: "Contenance du r\u00e9servoir",
    section_feeder_layout: "Mod\u00e8le", layout_tower: "Tour, gamelle int\u00e9gr\u00e9e", layout_canister: "R\u00e9servoir rond, gamelle \u00e0 part",
    type_iron: "Fer \u00e0 repasser", section_iron_layout: "Mod\u00e8le", layout_iron: "Fer seul", layout_generator: "Centrale vapeur",
    iron_heating: "En chauffe", iron_off: "\u00c0 l'arr\u00eat", left_on: "Rest\u00e9 allum\u00e9", left_on_after: "Alerter apr\u00e8s (minutes allum\u00e9)",
    washer_dryer: "Lavante-s\u00e9chante (lave et s\u00e8che)", step_drying: "S\u00e9chage", section_cycle_phase: "Phase du cycle",
    step_prewash: "Pr\u00e9lavage", step_soaking: "Trempage", step_weighing: "Pes\u00e9e", step_filling: "Remplissage", step_washing: "Lavage", step_rinsing: "Rin\u00e7age", step_draining: "Vidange", step_spinning: "Essorage", step_cooling: "Refroidissement", step_anti_crease: "Anti-froissage", step_steam: "Vapeur",
  },
  ru: {
    idle: "\u041e\u0436\u0438\u0434\u0430\u043d\u0438\u0435", running: "\u0420\u0430\u0431\u043e\u0442\u0430\u0435\u0442", paused: "\u041d\u0430 \u043f\u0430\u0443\u0437\u0435", done: "\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u043e",
    delayed: "\u041e\u0442\u043b\u043e\u0436\u0435\u043d\u043d\u044b\u0439 \u0441\u0442\u0430\u0440\u0442", error: "\u041e\u0448\u0438\u0431\u043a\u0430", unknown: "\u041d\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043d\u043e",
    program: "\u041f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0430", remaining: "\u043e\u0441\u0442\u0430\u043b\u043e\u0441\u044c", ready_at: "\u043e\u043a\u043e\u043d\u0447\u0430\u043d\u0438\u0435 ~", time_done: "\u0413\u043e\u0442\u043e\u0432\u043e",
    door_open: "\u0414\u0432\u0435\u0440\u044c \u043e\u0442\u043a\u0440\u044b\u0442\u0430", door_closed: "\u0414\u0432\u0435\u0440\u044c \u0437\u0430\u043a\u0440\u044b\u0442\u0430", alerts: "\u041e\u043f\u043e\u0432\u0435\u0449\u0435\u043d\u0438\u044f",
    alerts_n_one: "{n} \u043e\u043f\u043e\u0432\u0435\u0449\u0435\u043d\u0438\u0435", alerts_n_few: "{n} \u043e\u043f\u043e\u0432\u0435\u0449\u0435\u043d\u0438\u044f", alerts_n_many: "{n} \u043e\u043f\u043e\u0432\u0435\u0449\u0435\u043d\u0438\u0439", alerts_n_other: "{n} \u043e\u043f\u043e\u0432\u0435\u0449\u0435\u043d\u0438\u044f",
    connected: "\u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u043e", disconnected: "\u041e\u0442\u043a\u043b\u044e\u0447\u0435\u043d\u043e",
    start: "\u0421\u0442\u0430\u0440\u0442", pause: "\u041f\u0430\u0443\u0437\u0430", resume: "\u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c", stop: "\u0421\u0442\u043e\u043f",
    name: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435", icon: "\u0417\u043d\u0430\u0447\u043e\u043a", entity: "\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u044c",
    main_settings: "\u041e\u0441\u043d\u043e\u0432\u043d\u044b\u0435 \u0441\u0443\u0449\u043d\u043e\u0441\u0442\u0438", display_settings: "\u041e\u0442\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435",
    action_settings: "\u0423\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435",
    group_general: "\u041e\u0431\u0449\u0438\u0435 \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438",
    compact: "\u041a\u043e\u043c\u043f\u0430\u043a\u0442\u043d\u044b\u0439 \u0440\u0435\u0436\u0438\u043c (\u0441\u043a\u0440\u044b\u0442\u044c \u0437\u043d\u0430\u0447\u043e\u043a)",
    state_show_raw: "\u0412\u0441\u0435\u0433\u0434\u0430 \u043f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u043d\u0435\u043e\u0431\u0440\u0430\u0431\u043e\u0442\u0430\u043d\u043d\u044b\u0439 \u0442\u0435\u043a\u0441\u0442 \u0441\u0443\u0449\u043d\u043e\u0441\u0442\u0438 \u0432\u043c\u0435\u0441\u0442\u043e \u043f\u0435\u0440\u0435\u0432\u0435\u0434\u0451\u043d\u043d\u043e\u0433\u043e \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u044f",
    appliance_type: "\u0422\u0438\u043f \u043f\u0440\u0438\u0431\u043e\u0440\u0430",
    type_auto: "\u0410\u0432\u0442\u043e\u043e\u043f\u0440\u0435\u0434\u0435\u043b\u0435\u043d\u0438\u0435", type_washer: "\u0421\u0442\u0438\u0440\u0430\u043b\u044c\u043d\u0430\u044f \u043c\u0430\u0448\u0438\u043d\u0430", type_dryer: "\u0421\u0443\u0448\u0438\u043b\u044c\u043d\u0430\u044f \u043c\u0430\u0448\u0438\u043d\u0430", type_dishwasher: "\u041f\u043e\u0441\u0443\u0434\u043e\u043c\u043e\u0435\u0447\u043d\u0430\u044f \u043c\u0430\u0448\u0438\u043d\u0430",
    state_entity: "\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u044c \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u044f (\u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e)",
    program_entity: "\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u044c \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u044b",
    program_format: "\u0424\u043e\u0440\u043c\u0430\u0442 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u044f \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u044b",
    program_format_raw: "\u041a\u0430\u043a \u0435\u0441\u0442\u044c", program_format_clean: "\u041e\u0447\u0438\u0449\u0435\u043d\u043d\u044b\u0439",
    remaining_time_entity: "\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u044c \u043e\u0441\u0442\u0430\u0432\u0448\u0435\u0433\u043e\u0441\u044f \u0432\u0440\u0435\u043c\u0435\u043d\u0438",
    remaining_time_unit: "\u0415\u0434\u0438\u043d\u0438\u0446\u0430 \u043e\u0441\u0442\u0430\u0432\u0448\u0435\u0433\u043e\u0441\u044f \u0432\u0440\u0435\u043c\u0435\u043d\u0438",
    remaining_time_hide_when_idle: "\u0421\u043a\u0440\u044b\u0432\u0430\u0442\u044c \u043e\u0441\u0442\u0430\u0432\u0448\u0435\u0435\u0441\u044f \u0432\u0440\u0435\u043c\u044f \u0432\u043d\u0435 \u0440\u0430\u0431\u043e\u0442\u044b",
    remaining_time_split: "\u041f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u0432\u0440\u0435\u043c\u044f \u043e\u043a\u043e\u043d\u0447\u0430\u043d\u0438\u044f \u043e\u0442\u0434\u0435\u043b\u044c\u043d\u043e\u0439 \u0441\u0442\u0440\u043e\u043a\u043e\u0439",
    unit_auto: "\u0410\u0432\u0442\u043e\u043e\u043f\u0440\u0435\u0434\u0435\u043b\u0435\u043d\u0438\u0435", unit_seconds: "\u0421\u0435\u043a\u0443\u043d\u0434\u044b", unit_minutes: "\u041c\u0438\u043d\u0443\u0442\u044b",
    progress_entity: "\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u044c \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441\u0430 % (\u043f\u0435\u0440\u0435\u043e\u043f\u0440\u0435\u0434\u0435\u043b\u044f\u0435\u0442 \u0440\u0430\u0441\u0447\u0451\u0442)",
    door_entity: "\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u044c \u0434\u0430\u0442\u0447\u0438\u043a\u0430 \u0434\u0432\u0435\u0440\u0438",
    door_open_state: "\u0417\u043d\u0430\u0447\u0435\u043d\u0438\u0435 \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u044f \u00ab\u043e\u0442\u043a\u0440\u044b\u0442\u043e\u00bb",
    door_invert: "\u0418\u043d\u0432\u0435\u0440\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c (\u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0435 \u043e\u0437\u043d\u0430\u0447\u0430\u0435\u0442 \u0437\u0430\u043a\u0440\u044b\u0442\u043e, \u0430 \u043d\u0435 \u043e\u0442\u043a\u0440\u044b\u0442\u043e)",
    door_hide_in_list: "\u041d\u0435 \u043f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u0432 \u0441\u043f\u0438\u0441\u043a\u0435 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438",
    alerts_entity: "\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u044c \u043e\u043f\u043e\u0432\u0435\u0449\u0435\u043d\u0438\u0439 (\u0432 \u0432\u0438\u0434\u0435 \u0430\u0442\u0440\u0438\u0431\u0443\u0442\u043e\u0432)",
    info_entities: "\u0414\u043e\u043f. \u0441\u0443\u0449\u043d\u043e\u0441\u0442\u0438 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438 (ID \u0447\u0435\u0440\u0435\u0437 \u0437\u0430\u043f\u044f\u0442\u0443\u044e)",
    connectivity_entity: "\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u044c \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u044f",
    connectivity_connected_state: "\u0417\u043d\u0430\u0447\u0435\u043d\u0438\u0435 \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u044f \u00ab\u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u043e\u00bb",
    start_entity: "\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u044c \u043a\u043d\u043e\u043f\u043a\u0438 \u0421\u0442\u0430\u0440\u0442",
    pause_entity: "\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u044c \u043a\u043d\u043e\u043f\u043a\u0438 \u041f\u0430\u0443\u0437\u0430",
    resume_entity: "\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u044c \u043a\u043d\u043e\u043f\u043a\u0438 \u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c",
    stop_entity: "\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u044c \u043a\u043d\u043e\u043f\u043a\u0438 \u0421\u0442\u043e\u043f / \u0421\u0431\u0440\u043e\u0441",
    section_program: "\u041f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0430", section_remaining: "\u041e\u0441\u0442\u0430\u0432\u0448\u0435\u0435\u0441\u044f \u0432\u0440\u0435\u043c\u044f",
    section_ready_at: "\u041e\u043a\u043e\u043d\u0447\u0430\u043d\u0438\u0435",
    section_progress: "\u041f\u0440\u043e\u0433\u0440\u0435\u0441\u0441 % (\u043f\u0435\u0440\u0435\u043e\u043f\u0440\u0435\u0434\u0435\u043b\u0435\u043d\u0438\u0435)", section_door: "\u0414\u0430\u0442\u0447\u0438\u043a \u0434\u0432\u0435\u0440\u0438",
    section_alerts: "\u041e\u043f\u043e\u0432\u0435\u0449\u0435\u043d\u0438\u044f", section_connectivity: "\u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435",
    section_info: "\u0414\u043e\u043f. \u0441\u0443\u0449\u043d\u043e\u0441\u0442\u0438 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438", section_lines_order: "\u041f\u043e\u0440\u044f\u0434\u043e\u043a \u0441\u0442\u0440\u043e\u043a",
    info_count: "\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0434\u043e\u043f. \u0441\u0443\u0449\u043d\u043e\u0441\u0442\u0435\u0439",
    section_alert_list: "\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u0438 \u043e\u043f\u043e\u0432\u0435\u0449\u0435\u043d\u0438\u0439", alerts_add: "\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043e\u043f\u043e\u0432\u0435\u0449\u0435\u043d\u0438\u0435\u2026", list_other: "\u0414\u0440\u0443\u0433\u0430\u044f \u0441\u0443\u0449\u043d\u043e\u0441\u0442\u044c\u2026", list_remove: "\u0423\u0434\u0430\u043b\u0438\u0442\u044c",
    section_corner_list: "\u041f\u0435\u0440\u0435\u043a\u043b\u044e\u0447\u0430\u0442\u0435\u043b\u0438 \u0432 \u0443\u0433\u043b\u0430\u0445", corners_add: "\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043f\u0435\u0440\u0435\u043a\u043b\u044e\u0447\u0430\u0442\u0435\u043b\u044c\u2026",
    info_label: "\u041e\u0442\u043e\u0431\u0440\u0430\u0436\u0430\u0435\u043c\u043e\u0435 \u0438\u043c\u044f (\u043d\u0435\u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e)",
    info_value_map: "\u0421\u043e\u043f\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0439 (\u043d\u0435\u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e)",
    info_value_map_placeholder: "\u041f\u043e \u043e\u0434\u043d\u043e\u043c\u0443 \u0432 \u0441\u0442\u0440\u043e\u043a\u0435, \u043d\u0430\u043f\u0440.\n0: \u0413\u043e\u0442\u043e\u0432\u043e\n1: \u0421\u0442\u0438\u0440\u043a\u0430",
    info_hide_unit: "\u0421\u043a\u0440\u044b\u0442\u044c \u0435\u0434\u0438\u043d\u0438\u0446\u0443 \u0438\u0437\u043c\u0435\u0440\u0435\u043d\u0438\u044f",
    state_map_placeholder: "\u041f\u043e \u043e\u0434\u043d\u043e\u043c\u0443 \u0432 \u0441\u0442\u0440\u043e\u043a\u0435, \u043d\u0430\u043f\u0440.\nReady: idle\nAborting: running\n*: running",
    info_drag: "\u041f\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0434\u043b\u044f \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u043f\u043e\u0440\u044f\u0434\u043a\u0430",
    section_start: "\u041a\u043d\u043e\u043f\u043a\u0430 \u0421\u0442\u0430\u0440\u0442", section_pause: "\u041a\u043d\u043e\u043f\u043a\u0430 \u041f\u0430\u0443\u0437\u0430",
    section_resume: "\u041a\u043d\u043e\u043f\u043a\u0430 \u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c", section_stop: "\u041a\u043d\u043e\u043f\u043a\u0430 \u0421\u0442\u043e\u043f / \u0421\u0431\u0440\u043e\u0441",
    picker_icon: "\u0417\u043d\u0430\u0447\u043e\u043a (\u043d\u0435\u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e)",
    type_oven: "\u0414\u0443\u0445\u043e\u0432\u043a\u0430", type_microwave: "\u041c\u0438\u043a\u0440\u043e\u0432\u043e\u043b\u043d\u043e\u0432\u043a\u0430",
    type_hood: "\u0412\u044b\u0442\u044f\u0436\u043a\u0430", type_cooktop: "\u0412\u0430\u0440\u043e\u0447\u043d\u0430\u044f \u043f\u0430\u043d\u0435\u043b\u044c",
    preheating: "\u041f\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u043d\u0430\u0433\u0440\u0435\u0432", standby: "\u041e\u0436\u0438\u0434\u0430\u043d\u0438\u0435",
    temperature: "\u0422\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u0430", fan_speed: "\u0421\u043a\u043e\u0440\u043e\u0441\u0442\u044c",
    filter: "\u0424\u0438\u043b\u044c\u0442\u0440", power: "\u041c\u043e\u0449\u043d\u043e\u0441\u0442\u044c",
    power_level: "\u0423\u0440\u043e\u0432\u0435\u043d\u044c \u043c\u043e\u0449\u043d\u043e\u0441\u0442\u0438", child_lock: "\u0417\u0430\u0449\u0438\u0442\u0430 \u043e\u0442 \u0434\u0435\u0442\u0435\u0439",
    residual_heat: "\u041e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e\u0435 \u0442\u0435\u043f\u043b\u043e", boost: "\u0418\u043d\u0442\u0435\u043d\u0441\u0438\u0432\u043d\u044b\u0439",
    light: "\u041f\u043e\u0434\u0441\u0432\u0435\u0442\u043a\u0430", filter_reset: "\u0421\u0431\u0440\u043e\u0441\u0438\u0442\u044c \u0444\u0438\u043b\u044c\u0442\u0440",
    zone: "\u041a\u043e\u043d\u0444\u043e\u0440\u043a\u0430", zones_active: "\u0430\u043a\u0442\u0438\u0432\u043d\u044b\u0445 \u043a\u043e\u043d\u0444\u043e\u0440\u043e\u043a",
    section_target_temperature: "\u0426\u0435\u043b\u0435\u0432\u0430\u044f \u0442\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u0430", section_current_temperature: "\u0422\u0435\u043a\u0443\u0449\u0430\u044f \u0442\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u0430",
    section_light: "\u041f\u043e\u0434\u0441\u0432\u0435\u0442\u043a\u0430", section_heating: "\u0418\u043d\u0434\u0438\u043a\u0430\u0442\u043e\u0440 \u043d\u0430\u0433\u0440\u0435\u0432\u0430",
    section_power_level: "\u0423\u0440\u043e\u0432\u0435\u043d\u044c \u043c\u043e\u0449\u043d\u043e\u0441\u0442\u0438", section_fan: "\u0412\u0435\u043d\u0442\u0438\u043b\u044f\u0442\u043e\u0440",
    section_filter_life: "\u0420\u0435\u0441\u0443\u0440\u0441 \u0444\u0438\u043b\u044c\u0442\u0440\u0430", section_filter_reset: "\u041a\u043d\u043e\u043f\u043a\u0430 \u0441\u0431\u0440\u043e\u0441\u0430 \u0444\u0438\u043b\u044c\u0442\u0440\u0430",
    section_boost: "\u0418\u043d\u0442\u0435\u043d\u0441\u0438\u0432\u043d\u044b\u0439 \u0440\u0435\u0436\u0438\u043c", section_child_lock: "\u0417\u0430\u0449\u0438\u0442\u0430 \u043e\u0442 \u0434\u0435\u0442\u0435\u0439",
    section_power: "\u041f\u043e\u0442\u0440\u0435\u0431\u043b\u0435\u043d\u0438\u0435", section_zones: "\u041a\u043e\u043d\u0444\u043e\u0440\u043a\u0438",
    target_temperature_entity: "\u041e\u0431\u044a\u0435\u043a\u0442 \u0446\u0435\u043b\u0435\u0432\u043e\u0439 \u0442\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u044b", current_temperature_entity: "\u041e\u0431\u044a\u0435\u043a\u0442 \u0442\u0435\u043a\u0443\u0449\u0435\u0439 \u0442\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u044b",
    light_entity: "\u041e\u0431\u044a\u0435\u043a\u0442 \u043f\u043e\u0434\u0441\u0432\u0435\u0442\u043a\u0438", heating_entity: "\u041e\u0431\u044a\u0435\u043a\u0442 \u043d\u0430\u0433\u0440\u0435\u0432\u0430 (\u043e\u043f\u0446\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u043e)",
    power_level_entity: "\u041e\u0431\u044a\u0435\u043a\u0442 \u0443\u0440\u043e\u0432\u043d\u044f \u043c\u043e\u0449\u043d\u043e\u0441\u0442\u0438", fan_entity: "\u041e\u0431\u044a\u0435\u043a\u0442 \u0432\u0435\u043d\u0442\u0438\u043b\u044f\u0442\u043e\u0440\u0430",
    filter_life_entity: "\u041e\u0431\u044a\u0435\u043a\u0442 \u0440\u0435\u0441\u0443\u0440\u0441\u0430 \u0444\u0438\u043b\u044c\u0442\u0440\u0430 (%)", filter_reset_entity: "\u041e\u0431\u044a\u0435\u043a\u0442 \u043a\u043d\u043e\u043f\u043a\u0438 \u0441\u0431\u0440\u043e\u0441\u0430 \u0444\u0438\u043b\u044c\u0442\u0440\u0430",
    boost_entity: "\u041e\u0431\u044a\u0435\u043a\u0442 \u0438\u043d\u0442\u0435\u043d\u0441\u0438\u0432\u043d\u043e\u0433\u043e \u0440\u0435\u0436\u0438\u043c\u0430", child_lock_entity: "\u041e\u0431\u044a\u0435\u043a\u0442 \u0437\u0430\u0449\u0438\u0442\u044b \u043e\u0442 \u0434\u0435\u0442\u0435\u0439",
    power_entity: "\u041e\u0431\u044a\u0435\u043a\u0442 \u043c\u043e\u0449\u043d\u043e\u0441\u0442\u0438 (\u0412\u0442)", power_on_threshold: "\u0420\u0430\u0431\u043e\u0442\u0430\u0435\u0442 \u0432\u044b\u0448\u0435 \u044d\u0442\u043e\u0439 \u043c\u043e\u0449\u043d\u043e\u0441\u0442\u0438 (\u0412\u0442)",
    zones_count: "\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u043a\u043e\u043d\u0444\u043e\u0440\u043e\u043a", zone_level_entity: "\u041e\u0431\u044a\u0435\u043a\u0442 \u0443\u0440\u043e\u0432\u043d\u044f",
    section_toggle: "\u0412\u044b\u043a\u043b\u044e\u0447\u0430\u0442\u0435\u043b\u044c", toggle: "\u041f\u0438\u0442\u0430\u043d\u0438\u0435",
    off_short: "\u0412\u044b\u043a\u043b.", toggle_entity: "\u041e\u0431\u044a\u0435\u043a\u0442 \u0432\u044b\u043a\u043b\u044e\u0447\u0430\u0442\u0435\u043b\u044f",
    zone_residual_entity: "\u041e\u0431\u044a\u0435\u043a\u0442 \u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e\u0433\u043e \u0442\u0435\u043f\u043b\u0430", zone_name: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043a\u043e\u043d\u0444\u043e\u0440\u043a\u0438 (\u043e\u043f\u0446\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u043e)",
    type_fridge: "\u0425\u043e\u043b\u043e\u0434\u0438\u043b\u044c\u043d\u0438\u043a", type_kettle: "\u0427\u0430\u0439\u043d\u0438\u043a",
    fridge_ok: "\u041d\u043e\u0440\u043c\u0430", temp_high: "\u0412\u044b\u0441\u043e\u043a\u0430\u044f \u0442\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u0430",
    unplugged: "\u041e\u0442\u043a\u043b\u044e\u0447\u0451\u043d \u043e\u0442 \u0441\u0435\u0442\u0438", no_power: "\u041d\u0435\u0442 \u043f\u043e\u0442\u0440\u0435\u0431\u043b\u0435\u043d\u0438\u044f", section_plug: "\u0412\u044b\u043a\u043b\u044e\u0447\u0430\u0442\u0435\u043b\u044c \u0440\u043e\u0437\u0435\u0442\u043a\u0438", no_power_after: "\u041f\u0440\u0435\u0434\u0443\u043f\u0440\u0435\u0434\u0438\u0442\u044c \u0447\u0435\u0440\u0435\u0437 (\u043c\u0438\u043d\u0443\u0442 \u0431\u0435\u0437 \u043f\u043e\u0442\u0440\u0435\u0431\u043b\u0435\u043d\u0438\u044f)", temperature_decimals: "\u0422\u043e\u0447\u043d\u043e\u0441\u0442\u044c \u0442\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u044b", precision_auto: "\u041a\u0430\u043a \u0443 \u0441\u0443\u0449\u043d\u043e\u0441\u0442\u0438", precision_0: "\u0414\u043e \u0433\u0440\u0430\u0434\u0443\u0441\u0430", precision_1: "\u0414\u043e \u0434\u0435\u0441\u044f\u0442\u044b\u0445", kettle_heating: "\u041d\u0430\u0433\u0440\u0435\u0432",
    kettle_off: "\u0412\u044b\u043a\u043b\u044e\u0447\u0435\u043d", fridge_compartment: "\u0425\u043e\u043b\u043e\u0434\u0438\u043b\u044c\u043d\u0438\u043a",
    freezer_compartment: "\u041c\u043e\u0440\u043e\u0437\u0438\u043b\u044c\u043d\u0438\u043a", ice_maker: "\u041b\u0435\u0434\u043e\u0433\u0435\u043d\u0435\u0440\u0430\u0442\u043e\u0440",
    since: "\u0443\u0436\u0435", section_fridge_layout: "\u041a\u043e\u043c\u043f\u043e\u043d\u043e\u0432\u043a\u0430",
    layout_single: "\u041e\u0434\u043d\u0430 \u0434\u0432\u0435\u0440\u044c", layout_freezer_bottom: "\u041c\u043e\u0440\u043e\u0437\u0438\u043b\u043a\u0430 \u0441\u043d\u0438\u0437\u0443",
    layout_freezer_top: "\u041c\u043e\u0440\u043e\u0437\u0438\u043b\u043a\u0430 \u0441\u0432\u0435\u0440\u0445\u0443", layout_side_by_side: "Side by side", layout_wine: "\u0421\u0442\u0435\u043a\u043b\u044f\u043d\u043d\u0430\u044f \u0434\u0432\u0435\u0440\u044c (\u0432\u0438\u043d\u043d\u044b\u0439 \u0448\u043a\u0430\u0444)",
    section_fridge_temperature: "\u0422\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u0430 \u0445\u043e\u043b\u043e\u0434\u0438\u043b\u044c\u043d\u0438\u043a\u0430", section_freezer_temperature: "\u0422\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u0430 \u043c\u043e\u0440\u043e\u0437\u0438\u043b\u044c\u043d\u0438\u043a\u0430",
    section_freezer_door: "\u0414\u0430\u0442\u0447\u0438\u043a \u0434\u0432\u0435\u0440\u0438 \u043c\u043e\u0440\u043e\u0437\u0438\u043b\u044c\u043d\u0438\u043a\u0430", section_ice_maker: "\u041b\u0435\u0434\u043e\u0433\u0435\u043d\u0435\u0440\u0430\u0442\u043e\u0440",
    fridge_max_temperature: "\u041f\u0440\u0435\u0434\u0443\u043f\u0440\u0435\u0436\u0434\u0430\u0442\u044c \u0432\u044b\u0448\u0435 \u044d\u0442\u043e\u0439 \u0442\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u044b", section_kettle_temperature: "\u0422\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u0430 \u0432\u043e\u0434\u044b",
    ice_on: "\u0420\u0430\u0431\u043e\u0442\u0430\u0435\u0442", ice_off: "\u0412\u044b\u043a\u043b\u044e\u0447\u0435\u043d", doors_closed: "\u0414\u0432\u0435\u0440\u0438 \u0437\u0430\u043a\u0440\u044b\u0442\u044b",
    fridge_door_open: "\u0414\u0432\u0435\u0440\u044c \u0445\u043e\u043b\u043e\u0434\u0438\u043b\u044c\u043d\u0438\u043a\u0430 \u043e\u0442\u043a\u0440\u044b\u0442\u0430", freezer_door_open: "\u0414\u0432\u0435\u0440\u044c \u043c\u043e\u0440\u043e\u0437\u0438\u043b\u044c\u043d\u0438\u043a\u0430 \u043e\u0442\u043a\u0440\u044b\u0442\u0430",
    type_cooker: "\u041a\u0443\u0445\u043e\u043d\u043d\u044b\u0439 \u043a\u043e\u043c\u0431\u0430\u0439\u043d", type_coffee: "\u041a\u043e\u0444\u0435\u043c\u0430\u0448\u0438\u043d\u0430",
    water_empty: "\u0411\u0430\u043a \u0434\u043b\u044f \u0432\u043e\u0434\u044b \u043f\u0443\u0441\u0442", beans_empty: "\u041a\u043e\u043d\u0442\u0435\u0439\u043d\u0435\u0440 \u0434\u043b\u044f \u0437\u0451\u0440\u0435\u043d \u043f\u0443\u0441\u0442",
    tray_full: "\u041f\u043e\u0434\u0434\u043e\u043d \u043f\u0435\u0440\u0435\u043f\u043e\u043b\u043d\u0435\u043d", descale: "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u043e\u0447\u0438\u0441\u0442\u043a\u0430 \u043e\u0442 \u043d\u0430\u043a\u0438\u043f\u0438",
    speed: "\u0421\u043a\u043e\u0440\u043e\u0441\u0442\u044c", section_speed: "\u0421\u043a\u043e\u0440\u043e\u0441\u0442\u044c \u043d\u043e\u0436\u0430",
    section_water: "\u0411\u0430\u043a \u0434\u043b\u044f \u0432\u043e\u0434\u044b", section_beans: "\u041a\u043e\u043d\u0442\u0435\u0439\u043d\u0435\u0440 \u0434\u043b\u044f \u0437\u0451\u0440\u0435\u043d",
    section_tray: "\u041f\u043e\u0434\u0434\u043e\u043d", section_descaling: "\u041e\u0447\u0438\u0441\u0442\u043a\u0430 \u043e\u0442 \u043d\u0430\u043a\u0438\u043f\u0438",
    cups: "\u0427\u0430\u0448\u043a\u0438", strength: "\u041a\u0440\u0435\u043f\u043e\u0441\u0442\u044c",
    section_cups: "\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0447\u0430\u0448\u0435\u043a", section_strength: "\u041a\u0440\u0435\u043f\u043e\u0441\u0442\u044c \u043a\u043e\u0444\u0435",
    type_rice_cooker: "\u0420\u0438\u0441\u043e\u0432\u0430\u0440\u043a\u0430", keep_warm: "\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u0430\u043d\u0438\u0435 \u0442\u0435\u043f\u043b\u0430",
    language: "\u042f\u0437\u044b\u043a", language_auto: "\u0421\u043b\u0435\u0434\u043e\u0432\u0430\u0442\u044c Home Assistant",
    illustration_color: "\u0426\u0432\u0435\u0442 \u043f\u0440\u0438\u0431\u043e\u0440\u0430", color_auto: "\u041a\u0430\u043a \u0432 \u0442\u0435\u043c\u0435",
    color_white: "\u0411\u0435\u043b\u044b\u0439", color_grey: "\u0421\u0435\u0440\u044b\u0439", color_black: "\u0427\u0451\u0440\u043d\u044b\u0439",
    type_water_heater: "\u0412\u043e\u0434\u043e\u043d\u0430\u0433\u0440\u0435\u0432\u0430\u0442\u0435\u043b\u044c", type_boiler: "\u041a\u043e\u0442\u0451\u043b", type_heat_pump: "\u0422\u0435\u043f\u043b\u043e\u0432\u043e\u0439 \u043d\u0430\u0441\u043e\u0441",
    boiler_space_heating: "\u041e\u0442\u043e\u043f\u043b\u0435\u043d\u0438\u0435", boiler_hot_water: "\u0413\u043e\u0440\u044f\u0447\u0430\u044f \u0432\u043e\u0434\u0430", boiler_burner: "\u0413\u043e\u0440\u0435\u043b\u043a\u0430 \u0432\u043a\u043b\u044e\u0447\u0435\u043d\u0430", boiler_starting: "\u0420\u043e\u0437\u0436\u0438\u0433", boiler_waiting: "\u041f\u0430\u0443\u0437\u0430 \u0433\u043e\u0440\u0435\u043b\u043a\u0438", hp_cooling: "\u041e\u0445\u043b\u0430\u0436\u0434\u0435\u043d\u0438\u0435", hp_defrost: "\u041e\u0442\u0442\u0430\u0439\u043a\u0430",
    section_space_heating: "\u0418\u043d\u0434\u0438\u043a\u0430\u0442\u043e\u0440 \u043e\u0442\u043e\u043f\u043b\u0435\u043d\u0438\u044f", section_hot_water: "\u0418\u043d\u0434\u0438\u043a\u0430\u0442\u043e\u0440 \u0433\u043e\u0440\u044f\u0447\u0435\u0439 \u0432\u043e\u0434\u044b", section_flow_temperature: "\u0422\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u0430 \u043f\u043e\u0434\u0430\u0447\u0438", section_heat_output: "\u0422\u0435\u043f\u043b\u043e\u0432\u0430\u044f \u043c\u043e\u0449\u043d\u043e\u0441\u0442\u044c", section_cop: "\u041a\u043e\u044d\u0444\u0444\u0438\u0446\u0438\u0435\u043d\u0442 \u044d\u0444\u0444\u0435\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u0438 (COP)", section_outdoor_temperature: "\u041d\u0430\u0440\u0443\u0436\u043d\u0430\u044f \u0442\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u0430",
    section_cooling: "\u0418\u043d\u0434\u0438\u043a\u0430\u0442\u043e\u0440 \u043e\u0445\u043b\u0430\u0436\u0434\u0435\u043d\u0438\u044f", section_cooling_power: "\u041c\u043e\u0449\u043d\u043e\u0441\u0442\u044c \u043f\u0440\u0438 \u043e\u0445\u043b\u0430\u0436\u0434\u0435\u043d\u0438\u0438", section_cooling_output: "\u041c\u043e\u0449\u043d\u043e\u0441\u0442\u044c \u043e\u0445\u043b\u0430\u0436\u0434\u0435\u043d\u0438\u044f", section_hot_water_power: "\u041c\u043e\u0449\u043d\u043e\u0441\u0442\u044c \u043d\u0430 \u0433\u043e\u0440\u044f\u0447\u0443\u044e \u0432\u043e\u0434\u0443", section_hot_water_output: "\u0422\u0435\u043f\u043b\u043e\u0432\u0430\u044f \u043c\u043e\u0449\u043d\u043e\u0441\u0442\u044c \u043d\u0430 \u0433\u043e\u0440\u044f\u0447\u0443\u044e \u0432\u043e\u0434\u0443",
    section_return_temperature: "\u0422\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u0430 \u043e\u0431\u0440\u0430\u0442\u043a\u0438", section_water_flow: "\u0420\u0430\u0441\u0445\u043e\u0434 \u0432\u043e\u0434\u044b", section_compressor: "\u041a\u043e\u043c\u043f\u0440\u0435\u0441\u0441\u043e\u0440", hp_delta: "\u0414\u0435\u043b\u044c\u0442\u0430", section_fan_speed: "\u0421\u043a\u043e\u0440\u043e\u0441\u0442\u044c \u0432\u0435\u043d\u0442\u0438\u043b\u044f\u0442\u043e\u0440\u0430",
    hp_flow_return: "\u041f\u043e\u0434\u0430\u0447\u0430 \u0438 \u043e\u0431\u0440\u0430\u0442\u043a\u0430", no_hot_water: "\u0411\u0435\u0437 \u0431\u0430\u043a\u0430 \u0433\u043e\u0440\u044f\u0447\u0435\u0439 \u0432\u043e\u0434\u044b", underfloor_heating: "\u0422\u0451\u043f\u043b\u044b\u0439 \u043f\u043e\u043b \u0432\u043c\u0435\u0441\u0442\u043e \u0440\u0430\u0434\u0438\u0430\u0442\u043e\u0440\u043e\u0432",
    type_printer_3d: "3D-\u043f\u0440\u0438\u043d\u0442\u0435\u0440", section_nozzle_temperature: "\u0422\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u0430 \u0441\u043e\u043f\u043b\u0430", section_nozzle_target: "\u0417\u0430\u0434\u0430\u043d\u043d\u0430\u044f \u0442\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u0430 \u0441\u043e\u043f\u043b\u0430",
    section_bed_temperature: "\u0422\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u0430 \u0441\u0442\u043e\u043b\u0430", section_bed_target: "\u0417\u0430\u0434\u0430\u043d\u043d\u0430\u044f \u0442\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u0430 \u0441\u0442\u043e\u043b\u0430", section_chamber_temperature: "\u0422\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u0430 \u043a\u0430\u043c\u0435\u0440\u044b",
    section_current_layer: "\u0422\u0435\u043a\u0443\u0449\u0438\u0439 \u0441\u043b\u043e\u0439", section_total_layers: "\u0412\u0441\u0435\u0433\u043e \u0441\u043b\u043e\u0451\u0432", section_print_file: "\u0424\u0430\u0439\u043b \u043f\u0435\u0447\u0430\u0442\u0438",
    section_print_stage: "\u042d\u0442\u0430\u043f \u043f\u0435\u0447\u0430\u0442\u0438", section_printer_layout: "\u041a\u043e\u0440\u043f\u0443\u0441", layout_enclosed: "\u0417\u0430\u043a\u0440\u044b\u0442\u044b\u0439 \u043a\u043e\u0440\u043f\u0443\u0441",
    layout_open: "\u041e\u0442\u043a\u0440\u044b\u0442\u044b\u0439 \u043a\u0430\u0440\u043a\u0430\u0441 (\u043f\u043e\u0434\u0432\u0438\u0436\u043d\u044b\u0439 \u0441\u0442\u043e\u043b)", unit_hours: "\u0427\u0430\u0441\u044b", p3_nozzle: "\u0421\u043e\u043f\u043b\u043e",
    p3_bed: "\u0421\u0442\u043e\u043b", p3_chamber: "\u041a\u0430\u043c\u0435\u0440\u0430", p3_layer: "\u0421\u043b\u043e\u0439",
    p3_file: "\u0424\u0430\u0439\u043b", p3_printing: "\u041f\u0435\u0447\u0430\u0442\u044c", p3_preparing: "\u041f\u043e\u0434\u0433\u043e\u0442\u043e\u0432\u043a\u0430",
    p3_cancelled: "\u041e\u0442\u043c\u0435\u043d\u0435\u043d\u043e", p3_failed: "\u0421\u0431\u043e\u0439", p3_offline: "\u041d\u0435 \u0432 \u0441\u0435\u0442\u0438",
    p3_attention: "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u0432\u043d\u0438\u043c\u0430\u043d\u0438\u0435", p3_leveling: "\u0412\u044b\u0440\u0430\u0432\u043d\u0438\u0432\u0430\u043d\u0438\u0435 \u0441\u0442\u043e\u043b\u0430", p3_filament: "\u0421\u043c\u0435\u043d\u0430 \u0444\u0438\u043b\u0430\u043c\u0435\u043d\u0442\u0430",
    p3_cooling: "\u041e\u0445\u043b\u0430\u0436\u0434\u0435\u043d\u0438\u0435", p3_calibrating: "\u041a\u0430\u043b\u0438\u0431\u0440\u043e\u0432\u043a\u0430", p3_homing: "\u041f\u0430\u0440\u043a\u043e\u0432\u043a\u0430 \u043e\u0441\u0435\u0439",
    section_printed_part: "\u041f\u0435\u0447\u0430\u0442\u0430\u0435\u043c\u0430\u044f \u043c\u043e\u0434\u0435\u043b\u044c", part_cube: "\u041a\u0443\u0431", part_pyramid: "\u041f\u0438\u0440\u0430\u043c\u0438\u0434\u0430", part_duck: "\u0420\u0435\u0437\u0438\u043d\u043e\u0432\u0430\u044f \u0443\u0442\u043e\u0447\u043a\u0430",
    type_pet_feeder: "\u041a\u043e\u0440\u043c\u0443\u0448\u043a\u0430", feeder_ready: "\u0413\u043e\u0442\u043e\u0432\u0430", feeder_feeding: "\u041a\u043e\u0440\u043c\u043b\u0435\u043d\u0438\u0435", section_portions_today: "\u041f\u043e\u0440\u0446\u0438\u0439 \u0437\u0430 \u0434\u0435\u043d\u044c", section_weight_today: "\u0412\u0435\u0441 \u0437\u0430 \u0434\u0435\u043d\u044c", section_portion_weight: "\u0412\u0435\u0441 \u043f\u043e\u0440\u0446\u0438\u0438", section_serving_size: "\u0420\u0430\u0437\u043c\u0435\u0440 \u043f\u043e\u0440\u0446\u0438\u0438", section_feeder_schedule: "\u0420\u0430\u0441\u043f\u0438\u0441\u0430\u043d\u0438\u0435", section_last_feed: "\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u0435\u0435 \u043a\u043e\u0440\u043c\u043b\u0435\u043d\u0438\u0435", section_error: "\u0418\u043d\u0434\u0438\u043a\u0430\u0442\u043e\u0440 \u043e\u0448\u0438\u0431\u043a\u0438", start_option: "\u0412\u044b\u0431\u0438\u0440\u0430\u0435\u043c\u0430\u044f \u043e\u043f\u0446\u0438\u044f", start_value: "\u0417\u0430\u043f\u0438\u0441\u044b\u0432\u0430\u0435\u043c\u043e\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435", portions: "\u043f\u043e\u0440\u0446\u0438\u0439",
    feeder_empty: "\u0411\u0443\u043d\u043a\u0435\u0440 \u043f\u0443\u0441\u0442", feeder_level: "\u0411\u0443\u043d\u043a\u0435\u0440 \u0437\u0430\u043f\u043e\u043b\u043d\u0435\u043d \u043d\u0430 {pct}", section_level: "\u0423\u0440\u043e\u0432\u0435\u043d\u044c \u043a\u043e\u0440\u043c\u0430", level_empty_below: "\u041f\u0443\u0441\u0442\u043e \u043f\u0440\u0438 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0438 \u043d\u0435 \u0432\u044b\u0448\u0435", level_max: "\u0401\u043c\u043a\u043e\u0441\u0442\u044c \u0431\u0443\u043d\u043a\u0435\u0440\u0430",
    section_feeder_layout: "\u041c\u043e\u0434\u0435\u043b\u044c", layout_tower: "\u0411\u0430\u0448\u043d\u044f \u0441\u043e \u0432\u0441\u0442\u0440\u043e\u0435\u043d\u043d\u043e\u0439 \u043c\u0438\u0441\u043a\u043e\u0439", layout_canister: "\u041a\u0440\u0443\u0433\u043b\u044b\u0439 \u0431\u0443\u043d\u043a\u0435\u0440, \u043e\u0442\u0434\u0435\u043b\u044c\u043d\u0430\u044f \u043c\u0438\u0441\u043a\u0430",
    type_iron: "\u0423\u0442\u044e\u0433", section_iron_layout: "\u041c\u043e\u0434\u0435\u043b\u044c", layout_iron: "\u0423\u0442\u044e\u0433", layout_generator: "\u041f\u0430\u0440\u043e\u0433\u0435\u043d\u0435\u0440\u0430\u0442\u043e\u0440",
    iron_heating: "\u041d\u0430\u0433\u0440\u0435\u0432", iron_off: "\u0412\u044b\u043a\u043b\u044e\u0447\u0435\u043d", left_on: "\u041e\u0441\u0442\u0430\u043b\u0441\u044f \u0432\u043a\u043b\u044e\u0447\u0451\u043d\u043d\u044b\u043c", left_on_after: "\u041f\u0440\u0435\u0434\u0443\u043f\u0440\u0435\u0434\u0438\u0442\u044c \u0447\u0435\u0440\u0435\u0437 (\u043c\u0438\u043d\u0443\u0442 \u0432\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u044f)",
    washer_dryer: "\u0421\u0442\u0438\u0440\u0430\u043b\u044c\u043d\u043e-\u0441\u0443\u0448\u0438\u043b\u044c\u043d\u0430\u044f \u043c\u0430\u0448\u0438\u043d\u0430 (\u0441\u0442\u0438\u0440\u0430\u0435\u0442 \u0438 \u0441\u0443\u0448\u0438\u0442)", step_drying: "\u0421\u0443\u0448\u043a\u0430", section_cycle_phase: "\u0424\u0430\u0437\u0430 \u0446\u0438\u043a\u043b\u0430",
    step_prewash: "\u041f\u0440\u0435\u0434\u0441\u0442\u0438\u0440\u043a\u0430", step_soaking: "\u0417\u0430\u043c\u0430\u0447\u0438\u0432\u0430\u043d\u0438\u0435", step_weighing: "\u0412\u0437\u0432\u0435\u0448\u0438\u0432\u0430\u043d\u0438\u0435", step_filling: "\u041d\u0430\u0431\u043e\u0440 \u0432\u043e\u0434\u044b", step_washing: "\u0421\u0442\u0438\u0440\u043a\u0430", step_rinsing: "\u041f\u043e\u043b\u043e\u0441\u043a\u0430\u043d\u0438\u0435", step_draining: "\u0421\u043b\u0438\u0432", step_spinning: "\u041e\u0442\u0436\u0438\u043c", step_cooling: "\u041e\u0445\u043b\u0430\u0436\u0434\u0435\u043d\u0438\u0435", step_anti_crease: "\u0417\u0430\u0449\u0438\u0442\u0430 \u043e\u0442 \u0441\u043c\u0438\u043d\u0430\u043d\u0438\u044f", step_steam: "\u041f\u0430\u0440",
  },
  de: {
    idle: "Inaktiv", running: "L\u00e4uft", paused: "Pausiert", done: "Fertig",
    delayed: "Startverz\u00f6gerung", error: "Fehler", unknown: "Unbekannt",
    program: "Programm", remaining: "verbleibend", ready_at: "fertig um", time_done: "Fertig",
    door_open: "T\u00fcr offen", door_closed: "T\u00fcr geschlossen", alerts: "Warnungen",
    alerts_n_one: "{n} Warnung", alerts_n_few: "{n} Warnungen", alerts_n_many: "{n} Warnungen", alerts_n_other: "{n} Warnungen",
    connected: "Verbunden", disconnected: "Getrennt",
    start: "Start", pause: "Pause", resume: "Fortsetzen", stop: "Stopp",
    name: "Name", icon: "Symbol", entity: "Entit\u00e4t",
    main_settings: "Haupt-Entit\u00e4ten", display_settings: "Anzeige",
    action_settings: "Steuerung",
    group_general: "Allgemeine Einstellungen",
    compact: "Kompaktmodus (Symbol ausblenden)",
    state_show_raw: "Immer den rohen Entit\u00e4tstext statt der \u00fcbersetzten Bezeichnung anzeigen",
    appliance_type: "Ger\u00e4tetyp",
    type_auto: "Automatisch erkennen", type_washer: "Waschmaschine", type_dryer: "Trockner", type_dishwasher: "Geschirrsp\u00fcler",
    state_entity: "Status-Entit\u00e4t (erforderlich)",
    program_entity: "Programm-Entit\u00e4t",
    program_format: "Format des Programmnamens",
    program_format_raw: "Original", program_format_clean: "Bereinigt",
    remaining_time_entity: "Entit\u00e4t Restzeit",
    remaining_time_unit: "Einheit der Restzeit",
    remaining_time_hide_when_idle: "Restzeit nur w\u00e4hrend des Betriebs anzeigen",
    remaining_time_split: "Endzeit in eigener Zeile anzeigen",
    unit_auto: "Automatisch erkennen", unit_seconds: "Sekunden", unit_minutes: "Minuten",
    progress_entity: "Fortschritt %-Entit\u00e4t (optionale \u00dcberschreibung)",
    door_entity: "T\u00fcrsensor-Entit\u00e4t",
    door_open_state: "Zustandswert \"offen\"",
    door_invert: "Umkehren (Zustand bedeutet geschlossen, nicht offen)",
    door_hide_in_list: "Nicht in der Infoliste anzeigen",
    alerts_entity: "Warnungen-Entit\u00e4t (attributbasiert)",
    info_entities: "Zus\u00e4tzliche Info-Entit\u00e4ten (Entity-IDs durch Komma getrennt)",
    connectivity_entity: "Konnektivit\u00e4ts-Entit\u00e4t",
    connectivity_connected_state: "Zustandswert \"verbunden\"",
    start_entity: "Start-Taster-Entit\u00e4t",
    pause_entity: "Pause-Taster-Entit\u00e4t",
    resume_entity: "Fortsetzen-Taster-Entit\u00e4t",
    stop_entity: "Stopp/Reset-Taster-Entit\u00e4t",
    section_program: "Programm", section_remaining: "Restzeit",
    section_ready_at: "Fertig um",
    section_progress: "Fortschritt % (\u00dcberschreibung)", section_door: "T\u00fcrsensor",
    section_alerts: "Warnungen", section_connectivity: "Konnektivit\u00e4t",
    section_info: "Zus\u00e4tzliche Info-Entit\u00e4ten", section_lines_order: "Reihenfolge der Zeilen",
    info_count: "Anzahl zus\u00e4tzlicher Entit\u00e4ten",
    section_alert_list: "Warnungs-Entit\u00e4ten", alerts_add: "Warnung hinzuf\u00fcgen\u2026", list_other: "Andere Entit\u00e4t\u2026", list_remove: "Entfernen",
    section_corner_list: "Schalter in den Ecken", corners_add: "Schalter hinzuf\u00fcgen\u2026",
    info_label: "Anzeigename (optional)",
    info_value_map: "Wertzuordnung (optional)",
    info_value_map_placeholder: "Eine pro Zeile, z. B.\n0: Bereit\n1: Waschen",
    info_hide_unit: "Einheit ausblenden",
    state_map_placeholder: "Eine pro Zeile, z. B.\nReady: idle\nAborting: running\n*: running",
    info_drag: "Zum Neuordnen ziehen",
    section_start: "Start-Taste", section_pause: "Pause-Taste",
    section_resume: "Fortsetzen-Taste", section_stop: "Stopp/Reset-Taste",
    picker_icon: "Symbol (optional)",
    type_oven: "Backofen", type_microwave: "Mikrowelle",
    type_hood: "Dunstabzugshaube", type_cooktop: "Kochfeld",
    preheating: "Vorheizen", standby: "Bereitschaft",
    temperature: "Temperatur", fan_speed: "L\u00fcfterstufe",
    filter: "Filter", power: "Leistung",
    power_level: "Leistungsstufe", child_lock: "Kindersicherung",
    residual_heat: "Restw\u00e4rme", boost: "Intensiv",
    light: "Licht", filter_reset: "Filter zur\u00fccksetzen",
    zone: "Kochzone", zones_active: "aktive Kochzonen",
    section_target_temperature: "Solltemperatur", section_current_temperature: "Isttemperatur",
    section_light: "Licht", section_heating: "Heizanzeige",
    section_power_level: "Leistungsstufe", section_fan: "L\u00fcfter",
    section_filter_life: "Filterlebensdauer", section_filter_reset: "Filter-Reset-Taste",
    section_boost: "Intensivstufe", section_child_lock: "Kindersicherung",
    section_power: "Stromverbrauch", section_zones: "Kochzonen",
    target_temperature_entity: "Entit\u00e4t Solltemperatur", current_temperature_entity: "Entit\u00e4t Isttemperatur",
    light_entity: "Entit\u00e4t Licht", heating_entity: "Entit\u00e4t Heizen (optional)",
    power_level_entity: "Entit\u00e4t Leistungsstufe", fan_entity: "Entit\u00e4t L\u00fcfter",
    filter_life_entity: "Entit\u00e4t Filterlebensdauer (%)", filter_reset_entity: "Entit\u00e4t Filter-Reset-Taste",
    boost_entity: "Entit\u00e4t Intensivstufe", child_lock_entity: "Entit\u00e4t Kindersicherung",
    power_entity: "Entit\u00e4t Leistung (W)", power_on_threshold: "L\u00e4uft oberhalb dieser Leistung (W)",
    zones_count: "Anzahl der Kochzonen", zone_level_entity: "Entit\u00e4t Stufe",
    section_toggle: "Ein/Aus-Schalter", toggle: "Ein/Aus",
    off_short: "Aus", toggle_entity: "Entit\u00e4t Ein/Aus-Schalter",
    zone_residual_entity: "Entit\u00e4t Restw\u00e4rme", zone_name: "Name der Kochzone (optional)",
    type_fridge: "K\u00fchlschrank", type_kettle: "Wasserkocher",
    fridge_ok: "Normal", temp_high: "Temperatur zu hoch",
    unplugged: "Nicht angeschlossen", no_power: "Kein Verbrauch", section_plug: "Schalter der Steckdose", no_power_after: "Warnen nach (Minuten ohne Verbrauch)", temperature_decimals: "Temperaturgenauigkeit", precision_auto: "Wie die Entit\u00e4t", precision_0: "Ganze Grad", precision_1: "Eine Nachkommastelle", kettle_heating: "Heizt",
    kettle_off: "Aus", fridge_compartment: "K\u00fchlteil",
    freezer_compartment: "Gefrierteil", ice_maker: "Eisbereiter",
    since: "seit", section_fridge_layout: "Bauform",
    layout_single: "Eine T\u00fcr", layout_freezer_bottom: "Gefrierteil unten",
    layout_freezer_top: "Gefrierteil oben", layout_side_by_side: "Side-by-Side", layout_wine: "Glast\u00fcr (Weink\u00fchlschrank)",
    section_fridge_temperature: "K\u00fchltemperatur", section_freezer_temperature: "Gefriertemperatur",
    section_freezer_door: "T\u00fcrsensor Gefrierteil", section_ice_maker: "Eisbereiter",
    fridge_max_temperature: "Warnen oberhalb dieser Temperatur", section_kettle_temperature: "Wassertemperatur",
    ice_on: "L\u00e4uft", ice_off: "Aus", doors_closed: "T\u00fcren geschlossen",
    fridge_door_open: "K\u00fchlteil offen", freezer_door_open: "Gefrierteil offen",
    type_cooker: "K\u00fcchenmaschine", type_coffee: "Kaffeemaschine",
    water_empty: "Wassertank leer", beans_empty: "Bohnenbeh\u00e4lter leer",
    tray_full: "Tropfschale voll", descale: "Entkalken f\u00e4llig",
    speed: "Geschwindigkeit", section_speed: "R\u00fchrgeschwindigkeit",
    section_water: "Wassertank", section_beans: "Bohnenbeh\u00e4lter",
    section_tray: "Tropfschale", section_descaling: "Entkalken",
    cups: "Tassen", strength: "St\u00e4rke",
    section_cups: "Anzahl Tassen", section_strength: "Kaffeest\u00e4rke",
    type_rice_cooker: "Reiskocher", keep_warm: "Warmhalten",
    language: "Sprache", language_auto: "Home Assistant folgen",
    illustration_color: "Ger\u00e4tefarbe", color_auto: "Theme folgen",
    color_white: "Wei\u00df", color_grey: "Grau", color_black: "Schwarz",
    type_water_heater: "Warmwasserspeicher", type_boiler: "Heizkessel", type_heat_pump: "W\u00e4rmepumpe",
    boiler_space_heating: "Heizung", boiler_hot_water: "Warmwasser", boiler_burner: "Brenner an", boiler_starting: "Z\u00fcndung", boiler_waiting: "Wartezeit", hp_cooling: "K\u00fchlen", hp_defrost: "Abtauen",
    section_space_heating: "Heizungsanzeige", section_hot_water: "Warmwasseranzeige", section_flow_temperature: "Vorlauftemperatur", section_heat_output: "Heizleistung", section_cop: "Leistungszahl (COP)", section_outdoor_temperature: "Au\u00dfentemperatur",
    section_cooling: "K\u00fchlanzeige", section_cooling_power: "Leistung beim K\u00fchlen", section_cooling_output: "K\u00fchlleistung", section_hot_water_power: "Leistung f\u00fcr Warmwasser", section_hot_water_output: "Heizleistung f\u00fcr Warmwasser",
    section_return_temperature: "R\u00fccklauftemperatur", section_water_flow: "Wasserdurchfluss", section_compressor: "Kompressor", hp_delta: "Spreizung", section_fan_speed: "L\u00fcfterdrehzahl",
    hp_flow_return: "Vor- und R\u00fccklauf", no_hot_water: "Kein Warmwasserspeicher", underfloor_heating: "Fu\u00dfbodenheizung statt Heizk\u00f6rper",
    type_printer_3d: "3D-Drucker", section_nozzle_temperature: "D\u00fcsentemperatur", section_nozzle_target: "D\u00fcsen-Solltemperatur",
    section_bed_temperature: "Betttemperatur", section_bed_target: "Bett-Solltemperatur", section_chamber_temperature: "Bauraumtemperatur",
    section_current_layer: "Aktuelle Schicht", section_total_layers: "Schichten gesamt", section_print_file: "Druckdatei",
    section_print_stage: "Druckphase", section_printer_layout: "Bauform", layout_enclosed: "Geschlossen",
    layout_open: "Offen (bewegliches Bett)", unit_hours: "Stunden", p3_nozzle: "D\u00fcse",
    p3_bed: "Bett", p3_chamber: "Bauraum", p3_layer: "Schicht",
    p3_file: "Datei", p3_printing: "Druckt", p3_preparing: "Vorbereitung",
    p3_cancelled: "Abgebrochen", p3_failed: "Fehlgeschlagen", p3_offline: "Offline",
    p3_attention: "Eingriff n\u00f6tig", p3_leveling: "Bettnivellierung", p3_filament: "Filamentwechsel",
    p3_cooling: "Abk\u00fchlen", p3_calibrating: "Kalibrierung", p3_homing: "Referenzfahrt",
    section_printed_part: "Druckobjekt", part_cube: "W\u00fcrfel", part_pyramid: "Pyramide", part_duck: "Quietscheentchen",
    type_pet_feeder: "Futterautomat", feeder_ready: "Bereit", feeder_feeding: "F\u00fcttert", section_portions_today: "Portionen heute", section_weight_today: "Menge heute", section_portion_weight: "Portionsgewicht", section_serving_size: "Portionsgr\u00f6\u00dfe", section_feeder_schedule: "Zeitplan", section_last_feed: "Letzte F\u00fctterung", section_error: "St\u00f6rungsanzeige", start_option: "Auszuw\u00e4hlende Option", start_value: "Zu schreibender Wert", portions: "Portionen",
    feeder_empty: "Beh\u00e4lter leer", feeder_level: "Beh\u00e4lter zu {pct} voll", section_level: "F\u00fcllstand", level_empty_below: "Leer ab oder unter", level_max: "Fassungsverm\u00f6gen",
    section_feeder_layout: "Modell", layout_tower: "Turm, Napf integriert", layout_canister: "Runder Beh\u00e4lter, separater Napf",
    type_iron: "B\u00fcgeleisen", section_iron_layout: "Modell", layout_iron: "B\u00fcgeleisen", layout_generator: "Dampfstation",
    iron_heating: "Heizt", iron_off: "Aus", left_on: "Eingeschaltet geblieben", left_on_after: "Warnen nach (Minuten eingeschaltet)",
    washer_dryer: "Waschtrockner (w\u00e4scht und trocknet)", step_drying: "Trocknen", section_cycle_phase: "Programmphase",
    step_prewash: "Vorw\u00e4sche", step_soaking: "Einweichen", step_weighing: "Wiegen", step_filling: "Bef\u00fcllen", step_washing: "Waschen", step_rinsing: "Sp\u00fclen", step_draining: "Abpumpen", step_spinning: "Schleudern", step_cooling: "Abk\u00fchlen", step_anti_crease: "Knitterschutz", step_steam: "Dampf",
  },
  es: {
    idle: "Inactivo", running: "En marcha", paused: "En pausa", done: "Finalizado",
    delayed: "Inicio diferido", error: "Error", unknown: "Desconocido",
    program: "Programa", remaining: "restante", ready_at: "listo a las", time_done: "Fin",
    door_open: "Puerta abierta", door_closed: "Puerta cerrada", alerts: "Alertas",
    alerts_n_one: "{n} alerta", alerts_n_few: "{n} alertas", alerts_n_many: "{n} alertas", alerts_n_other: "{n} alertas",
    connected: "Conectado", disconnected: "Desconectado",
    start: "Iniciar", pause: "Pausa", resume: "Reanudar", stop: "Parar",
    name: "Nombre", icon: "Icono", entity: "Entidad",
    main_settings: "Entidades principales", display_settings: "Visualizaci\u00f3n",
    action_settings: "Controles",
    group_general: "Ajustes generales",
    compact: "Modo compacto (ocultar icono)",
    state_show_raw: "Mostrar siempre el texto bruto de la entidad en lugar de la etiqueta traducida",
    appliance_type: "Tipo de electrodom\u00e9stico",
    type_auto: "Detecci\u00f3n autom\u00e1tica", type_washer: "Lavadora", type_dryer: "Secadora", type_dishwasher: "Lavavajillas",
    state_entity: "Entidad de estado (obligatoria)",
    program_entity: "Entidad de programa",
    program_format: "Formato del nombre del programa",
    program_format_raw: "Sin procesar", program_format_clean: "Simplificado",
    remaining_time_entity: "Entidad de tiempo restante",
    remaining_time_unit: "Unidad del tiempo restante",
    remaining_time_hide_when_idle: "Ocultar tiempo restante si no est\u00e1 en marcha",
    remaining_time_split: "Mostrar la hora de fin en una l\u00ednea aparte",
    unit_auto: "Detecci\u00f3n autom\u00e1tica", unit_seconds: "Segundos", unit_minutes: "Minutos",
    progress_entity: "Entidad de progreso % (anula la estimaci\u00f3n)",
    door_entity: "Entidad del sensor de puerta",
    door_open_state: "Valor de estado \"abierta\"",
    door_invert: "Invertir (el estado significa cerrada, no abierta)",
    door_hide_in_list: "No mostrar en la lista de informaci\u00f3n",
    alerts_entity: "Entidad de alertas (tipo atributos)",
    info_entities: "Entidades de informaci\u00f3n adicionales (IDs separados por comas)",
    connectivity_entity: "Entidad de conectividad",
    connectivity_connected_state: "Valor de estado \"conectado\"",
    start_entity: "Entidad del bot\u00f3n Iniciar",
    pause_entity: "Entidad del bot\u00f3n Pausa",
    resume_entity: "Entidad del bot\u00f3n Reanudar",
    stop_entity: "Entidad del bot\u00f3n Parar/Reiniciar",
    section_program: "Programa", section_remaining: "Tiempo restante",
    section_ready_at: "Listo a las",
    section_progress: "Progreso % (anula estimaci\u00f3n)", section_door: "Sensor de puerta",
    section_alerts: "Alertas", section_connectivity: "Conectividad",
    section_info: "Entidades de informaci\u00f3n adicionales", section_lines_order: "Orden de las l\u00edneas",
    info_count: "N\u00famero de entidades adicionales",
    section_alert_list: "Entidades de alerta", alerts_add: "A\u00f1adir una alerta\u2026", list_other: "Otra entidad\u2026", list_remove: "Quitar",
    section_corner_list: "Interruptores en las esquinas", corners_add: "A\u00f1adir un interruptor\u2026",
    info_label: "Nombre mostrado (opcional)",
    info_value_map: "Correspondencia de valores (opcional)",
    info_value_map_placeholder: "Una por l\u00ednea, p. ej.\n0: Listo\n1: Lavado",
    info_hide_unit: "Ocultar la unidad",
    state_map_placeholder: "Una por l\u00ednea, p. ej.\nReady: idle\nAborting: running\n*: running",
    info_drag: "Arrastrar para reordenar",
    section_start: "Bot\u00f3n Iniciar", section_pause: "Bot\u00f3n Pausa",
    section_resume: "Bot\u00f3n Reanudar", section_stop: "Bot\u00f3n Parar/Reiniciar",
    picker_icon: "Icono (opcional)",
    type_oven: "Horno", type_microwave: "Microondas",
    type_hood: "Campana extractora", type_cooktop: "Placa de cocina",
    preheating: "Precalentando", standby: "En espera",
    temperature: "Temperatura", fan_speed: "Velocidad",
    filter: "Filtro", power: "Potencia",
    power_level: "Nivel de potencia", child_lock: "Bloqueo infantil",
    residual_heat: "Calor residual", boost: "Intensivo",
    light: "Luz", filter_reset: "Reiniciar filtro",
    zone: "Zona", zones_active: "zonas activas",
    section_target_temperature: "Temperatura objetivo", section_current_temperature: "Temperatura actual",
    section_light: "Luz", section_heating: "Indicador de calentamiento",
    section_power_level: "Nivel de potencia", section_fan: "Ventilador",
    section_filter_life: "Vida del filtro", section_filter_reset: "Bot\u00f3n de reinicio del filtro",
    section_boost: "Modo intensivo", section_child_lock: "Bloqueo infantil",
    section_power: "Consumo", section_zones: "Zonas de cocci\u00f3n",
    target_temperature_entity: "Entidad de temperatura objetivo", current_temperature_entity: "Entidad de temperatura actual",
    light_entity: "Entidad de luz", heating_entity: "Entidad de calentamiento (opcional)",
    power_level_entity: "Entidad de nivel de potencia", fan_entity: "Entidad de ventilador",
    filter_life_entity: "Entidad de vida del filtro (%)", filter_reset_entity: "Entidad del bot\u00f3n de reinicio del filtro",
    boost_entity: "Entidad de modo intensivo", child_lock_entity: "Entidad de bloqueo infantil",
    power_entity: "Entidad de potencia (W)", power_on_threshold: "En marcha por encima de esta potencia (W)",
    zones_count: "N\u00famero de zonas de cocci\u00f3n", zone_level_entity: "Entidad de nivel",
    section_toggle: "Interruptor", toggle: "Encendido",
    off_short: "Apagado", toggle_entity: "Entidad del interruptor",
    zone_residual_entity: "Entidad de calor residual", zone_name: "Nombre de la zona (opcional)",
    type_fridge: "Frigor\u00edfico", type_kettle: "Hervidor",
    fridge_ok: "Normal", temp_high: "Temperatura alta",
    unplugged: "Desenchufado", no_power: "Sin consumo", section_plug: "Interruptor del enchufe", no_power_after: "Avisar tras (minutos sin consumo)", temperature_decimals: "Precisi\u00f3n de la temperatura", precision_auto: "Como la entidad", precision_0: "Al grado", precision_1: "Un decimal", kettle_heating: "Calentando",
    kettle_off: "Apagado", fridge_compartment: "Frigor\u00edfico",
    freezer_compartment: "Congelador", ice_maker: "Fabricador de hielo",
    since: "desde hace", section_fridge_layout: "Distribuci\u00f3n",
    layout_single: "Una puerta", layout_freezer_bottom: "Congelador abajo",
    layout_freezer_top: "Congelador arriba", layout_side_by_side: "Side by side", layout_wine: "Puerta de cristal (vinoteca)",
    section_fridge_temperature: "Temperatura del frigor\u00edfico", section_freezer_temperature: "Temperatura del congelador",
    section_freezer_door: "Sensor de puerta del congelador", section_ice_maker: "Fabricador de hielo",
    fridge_max_temperature: "Avisar por encima de esta temperatura", section_kettle_temperature: "Temperatura del agua",
    ice_on: "En marcha", ice_off: "Apagado", doors_closed: "Puertas cerradas",
    fridge_door_open: "Frigor\u00edfico abierto", freezer_door_open: "Congelador abierto",
    type_cooker: "Robot de cocina", type_coffee: "Cafetera",
    water_empty: "Dep\u00f3sito de agua vac\u00edo", beans_empty: "Dep\u00f3sito de granos vac\u00edo",
    tray_full: "Bandeja de goteo llena", descale: "Descalcificaci\u00f3n pendiente",
    speed: "Velocidad", section_speed: "Velocidad de la cuchilla",
    section_water: "Dep\u00f3sito de agua", section_beans: "Dep\u00f3sito de granos",
    section_tray: "Bandeja de goteo", section_descaling: "Descalcificaci\u00f3n",
    cups: "Tazas", strength: "Intensidad",
    section_cups: "N\u00famero de tazas", section_strength: "Intensidad del caf\u00e9",
    type_rice_cooker: "Arrocera", keep_warm: "Manteniendo caliente",
    language: "Idioma", language_auto: "Seguir a Home Assistant",
    illustration_color: "Color del aparato", color_auto: "Seguir el tema",
    color_white: "Blanco", color_grey: "Gris", color_black: "Negro",
    type_water_heater: "Termo", type_boiler: "Caldera", type_heat_pump: "Bomba de calor",
    boiler_space_heating: "Calefacci\u00f3n", boiler_hot_water: "Agua caliente", boiler_burner: "Quemador encendido", boiler_starting: "Ignici\u00f3n", boiler_waiting: "Pausa del quemador", hp_cooling: "Refrigeraci\u00f3n", hp_defrost: "Desescarche",
    section_space_heating: "Indicador de calefacci\u00f3n", section_hot_water: "Indicador de agua caliente", section_flow_temperature: "Temperatura de impulsi\u00f3n", section_heat_output: "Calor producido", section_cop: "Coeficiente de rendimiento (COP)", section_outdoor_temperature: "Temperatura exterior",
    section_cooling: "Indicador de refrigeraci\u00f3n", section_cooling_power: "Potencia en refrigeraci\u00f3n", section_cooling_output: "Fr\u00edo producido", section_hot_water_power: "Potencia para agua caliente", section_hot_water_output: "Calor producido para agua caliente",
    section_return_temperature: "Temperatura de retorno", section_water_flow: "Caudal de agua", section_compressor: "Compresor", hp_delta: "Salto t\u00e9rmico", section_fan_speed: "Velocidad del ventilador",
    hp_flow_return: "Ida y retorno", no_hot_water: "Sin dep\u00f3sito de agua caliente", underfloor_heating: "Suelo radiante en vez de radiadores",
    type_printer_3d: "Impresora 3D", section_nozzle_temperature: "Temperatura de la boquilla", section_nozzle_target: "Temperatura objetivo de la boquilla",
    section_bed_temperature: "Temperatura de la cama", section_bed_target: "Temperatura objetivo de la cama", section_chamber_temperature: "Temperatura de la c\u00e1mara",
    section_current_layer: "Capa actual", section_total_layers: "Capas totales", section_print_file: "Archivo de impresi\u00f3n",
    section_print_stage: "Etapa de impresi\u00f3n", section_printer_layout: "Chasis", layout_enclosed: "Cerrada",
    layout_open: "Abierta (cama m\u00f3vil)", unit_hours: "Horas", p3_nozzle: "Boquilla",
    p3_bed: "Cama", p3_chamber: "C\u00e1mara", p3_layer: "Capa",
    p3_file: "Archivo", p3_printing: "Imprimiendo", p3_preparing: "Preparando",
    p3_cancelled: "Cancelada", p3_failed: "Fallida", p3_offline: "Sin conexi\u00f3n",
    p3_attention: "Requiere atenci\u00f3n", p3_leveling: "Nivelando la cama", p3_filament: "Cambiando el filamento",
    p3_cooling: "Enfriando", p3_calibrating: "Calibrando", p3_homing: "Buscando el origen",
    section_printed_part: "Pieza impresa", part_cube: "Cubo", part_pyramid: "Pir\u00e1mide", part_duck: "Patito de goma",
    type_pet_feeder: "Comedero autom\u00e1tico", feeder_ready: "Listo", feeder_feeding: "Dispensando", section_portions_today: "Raciones de hoy", section_weight_today: "Peso de hoy", section_portion_weight: "Peso de la raci\u00f3n", section_serving_size: "Tama\u00f1o de la raci\u00f3n", section_feeder_schedule: "Programaci\u00f3n", section_last_feed: "\u00daltima comida", section_error: "Indicador de error", start_option: "Opci\u00f3n a seleccionar", start_value: "Valor a escribir", portions: "raciones",
    feeder_empty: "Dep\u00f3sito vac\u00edo", feeder_level: "Dep\u00f3sito al {pct}", section_level: "Nivel de comida", level_empty_below: "Vac\u00edo en o por debajo de", level_max: "Capacidad del dep\u00f3sito",
    section_feeder_layout: "Modelo", layout_tower: "Torre, cuenco integrado", layout_canister: "Dep\u00f3sito redondo, cuenco aparte",
    type_iron: "Plancha", section_iron_layout: "Modelo", layout_iron: "Plancha", layout_generator: "Centro de planchado",
    iron_heating: "Calentando", iron_off: "Apagado", left_on: "Sigue encendida", left_on_after: "Avisar tras (minutos encendida)",
    washer_dryer: "Lavasecadora (lava y seca)", step_drying: "Secado", section_cycle_phase: "Fase del ciclo",
    step_prewash: "Prelavado", step_soaking: "Remojo", step_weighing: "Pesaje", step_filling: "Llenado", step_washing: "Lavado", step_rinsing: "Aclarado", step_draining: "Desag\u00fce", step_spinning: "Centrifugado", step_cooling: "Enfriamiento", step_anti_crease: "Antiarrugas", step_steam: "Vapor",
  },
  it: {
    idle: "Inattivo", running: "In funzione", paused: "In pausa", done: "Terminato",
    delayed: "Avvio ritardato", error: "Errore", unknown: "Sconosciuto",
    program: "Programma", remaining: "rimanente", ready_at: "pronto alle", time_done: "Fine",
    door_open: "Portello aperto", door_closed: "Portello chiuso", alerts: "Avvisi",
    alerts_n_one: "{n} avviso", alerts_n_few: "{n} avvisi", alerts_n_many: "{n} avvisi", alerts_n_other: "{n} avvisi",
    connected: "Connesso", disconnected: "Disconnesso",
    start: "Avvia", pause: "Pausa", resume: "Riprendi", stop: "Stop",
    name: "Nome", icon: "Icona", entity: "Entit\u00e0",
    main_settings: "Entit\u00e0 principali", display_settings: "Visualizzazione",
    action_settings: "Comandi",
    group_general: "Impostazioni generali",
    compact: "Modalit\u00e0 compatta (nascondi icona)",
    state_show_raw: "Mostra sempre il testo grezzo dell'entit\u00e0 invece dell'etichetta tradotta",
    appliance_type: "Tipo di elettrodomestico",
    type_auto: "Rilevamento automatico", type_washer: "Lavatrice", type_dryer: "Asciugatrice", type_dishwasher: "Lavastoviglie",
    state_entity: "Entit\u00e0 di stato (obbligatoria)",
    program_entity: "Entit\u00e0 programma",
    program_format: "Formato nome programma",
    program_format_raw: "Grezzo", program_format_clean: "Ripulito",
    remaining_time_entity: "Entit\u00e0 tempo rimanente",
    remaining_time_unit: "Unit\u00e0 del tempo rimanente",
    remaining_time_hide_when_idle: "Nascondi tempo residuo se non in funzione",
    remaining_time_split: "Mostra l'ora di fine su una riga a parte",
    unit_auto: "Rilevamento automatico", unit_seconds: "Secondi", unit_minutes: "Minuti",
    progress_entity: "Entit\u00e0 progresso % (sovrascrive la stima)",
    door_entity: "Entit\u00e0 sensore portello",
    door_open_state: "Valore di stato \"aperto\"",
    door_invert: "Inverti (lo stato significa chiuso, non aperto)",
    door_hide_in_list: "Non mostrare nell'elenco informazioni",
    alerts_entity: "Entit\u00e0 avvisi (tipo attributi)",
    info_entities: "Entit\u00e0 informative aggiuntive (ID separati da virgola)",
    connectivity_entity: "Entit\u00e0 di connettivit\u00e0",
    connectivity_connected_state: "Valore di stato \"connesso\"",
    start_entity: "Entit\u00e0 pulsante Avvia",
    pause_entity: "Entit\u00e0 pulsante Pausa",
    resume_entity: "Entit\u00e0 pulsante Riprendi",
    stop_entity: "Entit\u00e0 pulsante Stop/Reset",
    section_program: "Programma", section_remaining: "Tempo rimanente",
    section_ready_at: "Pronto alle",
    section_progress: "Progresso % (sovrascrive stima)", section_door: "Sensore portello",
    section_alerts: "Avvisi", section_connectivity: "Connettivit\u00e0",
    section_info: "Entit\u00e0 informative aggiuntive", section_lines_order: "Ordine delle righe",
    info_count: "Numero di entit\u00e0 aggiuntive",
    section_alert_list: "Entit\u00e0 di avviso", alerts_add: "Aggiungi un avviso\u2026", list_other: "Altra entit\u00e0\u2026", list_remove: "Rimuovi",
    section_corner_list: "Interruttori negli angoli", corners_add: "Aggiungi un interruttore\u2026",
    info_label: "Nome visualizzato (opzionale)",
    info_value_map: "Corrispondenza dei valori (opzionale)",
    info_value_map_placeholder: "Una per riga, es.\n0: Pronto\n1: Lavaggio",
    info_hide_unit: "Nascondi l'unit\u00e0",
    state_map_placeholder: "Una per riga, es.\nReady: idle\nAborting: running\n*: running",
    info_drag: "Trascina per riordinare",
    section_start: "Pulsante Avvia", section_pause: "Pulsante Pausa",
    section_resume: "Pulsante Riprendi", section_stop: "Pulsante Stop/Reset",
    picker_icon: "Icona (opzionale)",
    type_oven: "Forno", type_microwave: "Microonde",
    type_hood: "Cappa aspirante", type_cooktop: "Piano cottura",
    preheating: "Preriscaldamento", standby: "In attesa",
    temperature: "Temperatura", fan_speed: "Velocit\u00e0",
    filter: "Filtro", power: "Potenza",
    power_level: "Livello di potenza", child_lock: "Sicurezza bambini",
    residual_heat: "Calore residuo", boost: "Intensivo",
    light: "Luce", filter_reset: "Reimposta filtro",
    zone: "Zona", zones_active: "zone attive",
    section_target_temperature: "Temperatura impostata", section_current_temperature: "Temperatura attuale",
    section_light: "Luce", section_heating: "Indicatore di riscaldamento",
    section_power_level: "Livello di potenza", section_fan: "Ventola",
    section_filter_life: "Durata del filtro", section_filter_reset: "Pulsante di reset del filtro",
    section_boost: "Modalit\u00e0 intensiva", section_child_lock: "Sicurezza bambini",
    section_power: "Consumo", section_zones: "Zone di cottura",
    target_temperature_entity: "Entit\u00e0 temperatura impostata", current_temperature_entity: "Entit\u00e0 temperatura attuale",
    light_entity: "Entit\u00e0 luce", heating_entity: "Entit\u00e0 riscaldamento (opzionale)",
    power_level_entity: "Entit\u00e0 livello di potenza", fan_entity: "Entit\u00e0 ventola",
    filter_life_entity: "Entit\u00e0 durata del filtro (%)", filter_reset_entity: "Entit\u00e0 pulsante di reset del filtro",
    boost_entity: "Entit\u00e0 modalit\u00e0 intensiva", child_lock_entity: "Entit\u00e0 sicurezza bambini",
    power_entity: "Entit\u00e0 potenza (W)", power_on_threshold: "In funzione sopra questa potenza (W)",
    zones_count: "Numero di zone di cottura", zone_level_entity: "Entit\u00e0 livello",
    section_toggle: "Interruttore", toggle: "Accensione",
    off_short: "Spento", toggle_entity: "Entit\u00e0 interruttore",
    zone_residual_entity: "Entit\u00e0 calore residuo", zone_name: "Nome della zona (opzionale)",
    type_fridge: "Frigorifero", type_kettle: "Bollitore",
    fridge_ok: "Normale", temp_high: "Temperatura alta",
    unplugged: "Scollegato", no_power: "Nessun consumo", section_plug: "Interruttore della presa", no_power_after: "Avvisa dopo (minuti senza consumo)", temperature_decimals: "Precisione della temperatura", precision_auto: "Come l'entit\u00e0", precision_0: "Al grado", precision_1: "Un decimale", kettle_heating: "In riscaldamento",
    kettle_off: "Spento", fridge_compartment: "Frigorifero",
    freezer_compartment: "Congelatore", ice_maker: "Fabbricatore di ghiaccio",
    since: "da", section_fridge_layout: "Configurazione",
    layout_single: "Una porta", layout_freezer_bottom: "Congelatore in basso",
    layout_freezer_top: "Congelatore in alto", layout_side_by_side: "Side by side", layout_wine: "Porta a vetro (cantinetta)",
    section_fridge_temperature: "Temperatura del frigorifero", section_freezer_temperature: "Temperatura del congelatore",
    section_freezer_door: "Sensore porta del congelatore", section_ice_maker: "Fabbricatore di ghiaccio",
    fridge_max_temperature: "Avvisa sopra questa temperatura", section_kettle_temperature: "Temperatura dell'acqua",
    ice_on: "In funzione", ice_off: "Spento", doors_closed: "Porte chiuse",
    fridge_door_open: "Frigorifero aperto", freezer_door_open: "Congelatore aperto",
    type_cooker: "Robot da cucina", type_coffee: "Macchina da caff\u00e8",
    water_empty: "Serbatoio dell'acqua vuoto", beans_empty: "Contenitore chicchi vuoto",
    tray_full: "Vaschetta raccogligocce piena", descale: "Decalcificazione da fare",
    speed: "Velocit\u00e0", section_speed: "Velocit\u00e0 della lama",
    section_water: "Serbatoio dell'acqua", section_beans: "Contenitore chicchi",
    section_tray: "Vaschetta raccogligocce", section_descaling: "Decalcificazione",
    cups: "Tazze", strength: "Intensit\u00e0",
    section_cups: "Numero di tazze", section_strength: "Intensit\u00e0 del caff\u00e8",
    type_rice_cooker: "Cuociriso", keep_warm: "Mantenimento in caldo",
    language: "Lingua", language_auto: "Segui Home Assistant",
    illustration_color: "Colore dell'elettrodomestico", color_auto: "Segui il tema",
    color_white: "Bianco", color_grey: "Grigio", color_black: "Nero",
    type_water_heater: "Scaldabagno", type_boiler: "Caldaia", type_heat_pump: "Pompa di calore",
    boiler_space_heating: "Riscaldamento", boiler_hot_water: "Acqua calda", boiler_burner: "Bruciatore acceso", boiler_starting: "Accensione", boiler_waiting: "Pausa bruciatore", hp_cooling: "Raffrescamento", hp_defrost: "Sbrinamento",
    section_space_heating: "Indicatore riscaldamento", section_hot_water: "Indicatore acqua calda", section_flow_temperature: "Temperatura di mandata", section_heat_output: "Calore prodotto", section_cop: "Coefficiente di prestazione (COP)", section_outdoor_temperature: "Temperatura esterna",
    section_cooling: "Indicatore raffrescamento", section_cooling_power: "Potenza in raffrescamento", section_cooling_output: "Freddo prodotto", section_hot_water_power: "Potenza per acqua calda", section_hot_water_output: "Calore prodotto per acqua calda",
    section_return_temperature: "Temperatura di ritorno", section_water_flow: "Portata d'acqua", section_compressor: "Compressore", hp_delta: "Delta", section_fan_speed: "Velocit\u00e0 della ventola",
    hp_flow_return: "Mandata e ritorno", no_hot_water: "Nessun bollitore", underfloor_heating: "Riscaldamento a pavimento invece dei radiatori",
    type_printer_3d: "Stampante 3D", section_nozzle_temperature: "Temperatura dell'ugello", section_nozzle_target: "Temperatura obiettivo dell'ugello",
    section_bed_temperature: "Temperatura del piatto", section_bed_target: "Temperatura obiettivo del piatto", section_chamber_temperature: "Temperatura della camera",
    section_current_layer: "Strato attuale", section_total_layers: "Strati totali", section_print_file: "File di stampa",
    section_print_stage: "Fase di stampa", section_printer_layout: "Telaio", layout_enclosed: "Chiusa",
    layout_open: "Aperta (piatto mobile)", unit_hours: "Ore", p3_nozzle: "Ugello",
    p3_bed: "Piatto", p3_chamber: "Camera", p3_layer: "Strato",
    p3_file: "File", p3_printing: "In stampa", p3_preparing: "Preparazione",
    p3_cancelled: "Annullata", p3_failed: "Non riuscita", p3_offline: "Offline",
    p3_attention: "Richiede attenzione", p3_leveling: "Livellamento del piatto", p3_filament: "Cambio filamento",
    p3_cooling: "Raffreddamento", p3_calibrating: "Calibrazione", p3_homing: "Azzeramento assi",
    section_printed_part: "Oggetto stampato", part_cube: "Cubo", part_pyramid: "Piramide", part_duck: "Paperella di gomma",
    type_pet_feeder: "Distributore di crocchette", feeder_ready: "Pronto", feeder_feeding: "Erogazione", section_portions_today: "Porzioni di oggi", section_weight_today: "Peso di oggi", section_portion_weight: "Peso della porzione", section_serving_size: "Dimensione della porzione", section_feeder_schedule: "Programmazione", section_last_feed: "Ultimo pasto", section_error: "Indicatore di errore", start_option: "Opzione da selezionare", start_value: "Valore da scrivere", portions: "porzioni",
    feeder_empty: "Serbatoio vuoto", feeder_level: "Serbatoio al {pct}", section_level: "Livello del cibo", level_empty_below: "Vuoto a questo livello o meno", level_max: "Capacit\u00e0 del serbatoio",
    section_feeder_layout: "Modello", layout_tower: "Torre, ciotola integrata", layout_canister: "Serbatoio tondo, ciotola separata",
    type_iron: "Ferro da stiro", section_iron_layout: "Modello", layout_iron: "Ferro da stiro", layout_generator: "Ferro con caldaia",
    iron_heating: "In riscaldamento", iron_off: "Spento", left_on: "Rimasto acceso", left_on_after: "Avvisa dopo (minuti acceso)",
    washer_dryer: "Lavasciuga (lava e asciuga)", step_drying: "Asciugatura", section_cycle_phase: "Fase del ciclo",
    step_prewash: "Prelavaggio", step_soaking: "Ammollo", step_weighing: "Pesatura", step_filling: "Carico acqua", step_washing: "Lavaggio", step_rinsing: "Risciacquo", step_draining: "Scarico", step_spinning: "Centrifuga", step_cooling: "Raffreddamento", step_anti_crease: "Antipiega", step_steam: "Vapore",
  },
  nl: {
    idle: "Inactief", running: "Actief", paused: "Gepauzeerd", done: "Klaar",
    delayed: "Uitgestelde start", error: "Fout", unknown: "Onbekend",
    program: "Programma", remaining: "resterend", ready_at: "klaar om", time_done: "Klaar",
    door_open: "Deur open", door_closed: "Deur dicht", alerts: "Meldingen",
    alerts_n_one: "{n} melding", alerts_n_few: "{n} meldingen", alerts_n_many: "{n} meldingen", alerts_n_other: "{n} meldingen",
    connected: "Verbonden", disconnected: "Niet verbonden",
    start: "Start", pause: "Pauze", resume: "Hervatten", stop: "Stop",
    name: "Naam", icon: "Pictogram", entity: "Entiteit",
    main_settings: "Hoofdentiteiten", display_settings: "Weergave",
    action_settings: "Bediening",
    group_general: "Algemene instellingen",
    compact: "Compacte modus (pictogram verbergen)",
    state_show_raw: "Altijd de ruwe tekst van de entiteit tonen in plaats van het vertaalde label",
    appliance_type: "Type apparaat",
    type_auto: "Automatisch detecteren", type_washer: "Wasmachine", type_dryer: "Droger", type_dishwasher: "Vaatwasser",
    state_entity: "Status-entiteit (verplicht)",
    program_entity: "Programma-entiteit",
    program_format: "Notatie programmanaam",
    program_format_raw: "Ruw", program_format_clean: "Opgeschoond",
    remaining_time_entity: "Entiteit resterende tijd",
    remaining_time_unit: "Eenheid resterende tijd",
    remaining_time_hide_when_idle: "Resterende tijd verbergen buiten gebruik",
    remaining_time_split: "Eindtijd op een aparte regel tonen",
    unit_auto: "Automatisch detecteren", unit_seconds: "Seconden", unit_minutes: "Minuten",
    progress_entity: "Voortgang %-entiteit (overschrijft schatting)",
    door_entity: "Deursensor-entiteit",
    door_open_state: "Statuswaarde \"open\"",
    door_invert: "Omkeren (status betekent dicht, niet open)",
    door_hide_in_list: "Niet tonen in infolijst",
    alerts_entity: "Meldingen-entiteit (op basis van attributen)",
    info_entities: "Extra info-entiteiten (entity-ID's gescheiden door komma's)",
    connectivity_entity: "Connectiviteits-entiteit",
    connectivity_connected_state: "Statuswaarde \"verbonden\"",
    start_entity: "Start-knopentiteit",
    pause_entity: "Pauze-knopentiteit",
    resume_entity: "Hervatten-knopentiteit",
    stop_entity: "Stop/reset-knopentiteit",
    section_program: "Programma", section_remaining: "Resterende tijd",
    section_ready_at: "Klaar om",
    section_progress: "Voortgang % (overschrijft schatting)", section_door: "Deursensor",
    section_alerts: "Meldingen", section_connectivity: "Connectiviteit",
    section_info: "Extra info-entiteiten", section_lines_order: "Volgorde van de regels",
    info_count: "Aantal extra entiteiten",
    section_alert_list: "Meldingsentiteiten", alerts_add: "Melding toevoegen\u2026", list_other: "Andere entiteit\u2026", list_remove: "Verwijderen",
    section_corner_list: "Schakelaars in de hoeken", corners_add: "Schakelaar toevoegen\u2026",
    info_label: "Weergavenaam (optioneel)",
    info_value_map: "Waardetoewijzing (optioneel)",
    info_value_map_placeholder: "E\u00e9n per regel, bijv.\n0: Gereed\n1: Wassen",
    info_hide_unit: "Eenheid verbergen",
    state_map_placeholder: "E\u00e9n per regel, bijv.\nReady: idle\nAborting: running\n*: running",
    info_drag: "Sleep om te herordenen",
    section_start: "Startknop", section_pause: "Pauzeknop",
    section_resume: "Hervattenknop", section_stop: "Stop/resetknop",
    picker_icon: "Pictogram (optioneel)",
    type_oven: "Oven", type_microwave: "Magnetron",
    type_hood: "Afzuigkap", type_cooktop: "Kookplaat",
    preheating: "Voorverwarmen", standby: "Stand-by",
    temperature: "Temperatuur", fan_speed: "Ventilatorstand",
    filter: "Filter", power: "Vermogen",
    power_level: "Vermogensstand", child_lock: "Kinderslot",
    residual_heat: "Restwarmte", boost: "Intensief",
    light: "Verlichting", filter_reset: "Filter resetten",
    zone: "Kookzone", zones_active: "actieve kookzones",
    section_target_temperature: "Ingestelde temperatuur", section_current_temperature: "Huidige temperatuur",
    section_light: "Verlichting", section_heating: "Verwarmingsindicator",
    section_power_level: "Vermogensstand", section_fan: "Ventilator",
    section_filter_life: "Filterlevensduur", section_filter_reset: "Filter-resetknop",
    section_boost: "Intensiefstand", section_child_lock: "Kinderslot",
    section_power: "Verbruik", section_zones: "Kookzones",
    target_temperature_entity: "Entiteit ingestelde temperatuur", current_temperature_entity: "Entiteit huidige temperatuur",
    light_entity: "Entiteit verlichting", heating_entity: "Entiteit verwarming (optioneel)",
    power_level_entity: "Entiteit vermogensstand", fan_entity: "Entiteit ventilator",
    filter_life_entity: "Entiteit filterlevensduur (%)", filter_reset_entity: "Entiteit filter-resetknop",
    boost_entity: "Entiteit intensiefstand", child_lock_entity: "Entiteit kinderslot",
    power_entity: "Entiteit vermogen (W)", power_on_threshold: "Draait boven dit vermogen (W)",
    zones_count: "Aantal kookzones", zone_level_entity: "Entiteit stand",
    section_toggle: "Aan/uit-schakelaar", toggle: "Aan/uit",
    off_short: "Uit", toggle_entity: "Entiteit aan/uit-schakelaar",
    zone_residual_entity: "Entiteit restwarmte", zone_name: "Naam van de kookzone (optioneel)",
    type_fridge: "Koelkast", type_kettle: "Waterkoker",
    fridge_ok: "Normaal", temp_high: "Temperatuur te hoog",
    unplugged: "Niet aangesloten", no_power: "Geen verbruik", section_plug: "Schakelaar van de stekker", no_power_after: "Waarschuwen na (minuten zonder verbruik)", temperature_decimals: "Temperatuurnauwkeurigheid", precision_auto: "Zoals de entiteit", precision_0: "Hele graden", precision_1: "E\u00e9n decimaal", kettle_heating: "Aan het koken",
    kettle_off: "Uit", fridge_compartment: "Koelkast",
    freezer_compartment: "Vriezer", ice_maker: "IJsmaker",
    since: "sinds", section_fridge_layout: "Indeling",
    layout_single: "E\u00e9n deur", layout_freezer_bottom: "Vriezer onderin",
    layout_freezer_top: "Vriezer bovenin", layout_side_by_side: "Side by side", layout_wine: "Glazen deur (wijnklimaatkast)",
    section_fridge_temperature: "Koelkasttemperatuur", section_freezer_temperature: "Vriezertemperatuur",
    section_freezer_door: "Deursensor vriezer", section_ice_maker: "IJsmaker",
    fridge_max_temperature: "Waarschuwen boven deze temperatuur", section_kettle_temperature: "Watertemperatuur",
    ice_on: "In bedrijf", ice_off: "Uit", doors_closed: "Deuren dicht",
    fridge_door_open: "Koelkast open", freezer_door_open: "Vriezer open",
    type_cooker: "Keukenmachine", type_coffee: "Koffiemachine",
    water_empty: "Waterreservoir leeg", beans_empty: "Bonenreservoir leeg",
    tray_full: "Lekbak vol", descale: "Ontkalken nodig",
    speed: "Snelheid", section_speed: "Messnelheid",
    section_water: "Waterreservoir", section_beans: "Bonenreservoir",
    section_tray: "Lekbak", section_descaling: "Ontkalken",
    cups: "Kopjes", strength: "Sterkte",
    section_cups: "Aantal kopjes", section_strength: "Koffiesterkte",
    type_rice_cooker: "Rijstkoker", keep_warm: "Warmhouden",
    language: "Taal", language_auto: "Home Assistant volgen",
    illustration_color: "Kleur van het apparaat", color_auto: "Thema volgen",
    color_white: "Wit", color_grey: "Grijs", color_black: "Zwart",
    type_water_heater: "Boiler", type_boiler: "Cv-ketel", type_heat_pump: "Warmtepomp",
    boiler_space_heating: "Verwarming", boiler_hot_water: "Warm water", boiler_burner: "Brander aan", boiler_starting: "Ontsteking", boiler_waiting: "Wachten", hp_cooling: "Koelen", hp_defrost: "Ontdooien",
    section_space_heating: "Cv-indicator", section_hot_water: "Warmwaterindicator", section_flow_temperature: "Aanvoertemperatuur", section_heat_output: "Warmteafgifte", section_cop: "Prestatieco\u00ebffici\u00ebnt (COP)", section_outdoor_temperature: "Buitentemperatuur",
    section_cooling: "Koelindicator", section_cooling_power: "Vermogen bij koelen", section_cooling_output: "Koelafgifte", section_hot_water_power: "Vermogen voor warm water", section_hot_water_output: "Warmteafgifte voor warm water",
    section_return_temperature: "Retourtemperatuur", section_water_flow: "Waterdebiet", section_compressor: "Compressor", hp_delta: "Delta", section_fan_speed: "Ventilatortoerental",
    hp_flow_return: "Aanvoer en retour", no_hot_water: "Geen boiler", underfloor_heating: "Vloerverwarming in plaats van radiatoren",
    type_printer_3d: "3D-printer", section_nozzle_temperature: "Nozzletemperatuur", section_nozzle_target: "Doeltemperatuur nozzle",
    section_bed_temperature: "Bedtemperatuur", section_bed_target: "Doeltemperatuur bed", section_chamber_temperature: "Temperatuur van de behuizing",
    section_current_layer: "Huidige laag", section_total_layers: "Totaal aantal lagen", section_print_file: "Printbestand",
    section_print_stage: "Printfase", section_printer_layout: "Frame", layout_enclosed: "Gesloten",
    layout_open: "Open frame (bewegend bed)", unit_hours: "Uren", p3_nozzle: "Nozzle",
    p3_bed: "Bed", p3_chamber: "Behuizing", p3_layer: "Laag",
    p3_file: "Bestand", p3_printing: "Bezig met printen", p3_preparing: "Voorbereiden",
    p3_cancelled: "Geannuleerd", p3_failed: "Mislukt", p3_offline: "Offline",
    p3_attention: "Aandacht vereist", p3_leveling: "Bed nivelleren", p3_filament: "Filament wisselen",
    p3_cooling: "Afkoelen", p3_calibrating: "Kalibreren", p3_homing: "Homen",
    section_printed_part: "Geprint object", part_cube: "Kubus", part_pyramid: "Piramide", part_duck: "Badeendje",
    type_pet_feeder: "Voerautomaat", feeder_ready: "Gereed", feeder_feeding: "Voeren", section_portions_today: "Porties vandaag", section_weight_today: "Gewicht vandaag", section_portion_weight: "Portiegewicht", section_serving_size: "Portiegrootte", section_feeder_schedule: "Schema", section_last_feed: "Laatste voeding", section_error: "Storingsindicator", start_option: "Te kiezen optie", start_value: "Te schrijven waarde", portions: "porties",
    feeder_empty: "Reservoir leeg", feeder_level: "Reservoir voor {pct} vol", section_level: "Voerniveau", level_empty_below: "Leeg bij of onder", level_max: "Inhoud van het reservoir",
    section_feeder_layout: "Model", layout_tower: "Toren, ingebouwde bak", layout_canister: "Rond reservoir, losse bak",
    type_iron: "Strijkijzer", section_iron_layout: "Model", layout_iron: "Strijkijzer", layout_generator: "Stoomgenerator",
    iron_heating: "Aan het koken", iron_off: "Uit", left_on: "Blijft aan", left_on_after: "Waarschuwen na (minuten aan)",
    washer_dryer: "Was-droogcombinatie (wast en droogt)", step_drying: "Drogen", section_cycle_phase: "Programmafase",
    step_prewash: "Voorwas", step_soaking: "Weken", step_weighing: "Wegen", step_filling: "Vullen", step_washing: "Wassen", step_rinsing: "Spoelen", step_draining: "Afpompen", step_spinning: "Centrifugeren", step_cooling: "Afkoelen", step_anti_crease: "Anti-kreuk", step_steam: "Stoom",
  },
  pt: {
    idle: "Inativo", running: "Em funcionamento", paused: "Em pausa", done: "Conclu\u00eddo",
    delayed: "In\u00edcio diferido", error: "Erro", unknown: "Desconhecido",
    program: "Programa", remaining: "restante", ready_at: "pronto \u00e0s", time_done: "Fim",
    door_open: "Porta aberta", door_closed: "Porta fechada", alerts: "Alertas",
    alerts_n_one: "{n} alerta", alerts_n_few: "{n} alertas", alerts_n_many: "{n} alertas", alerts_n_other: "{n} alertas",
    connected: "Conectado", disconnected: "Desconectado",
    start: "Iniciar", pause: "Pausa", resume: "Retomar", stop: "Parar",
    name: "Nome", icon: "\u00cdcone", entity: "Entidade",
    main_settings: "Entidades principais", display_settings: "Exibi\u00e7\u00e3o",
    action_settings: "Controlos",
    group_general: "Defini\u00e7\u00f5es gerais",
    compact: "Modo compacto (ocultar \u00edcone)",
    state_show_raw: "Mostrar sempre o texto bruto da entidade em vez do r\u00f3tulo traduzido",
    appliance_type: "Tipo de eletrodom\u00e9stico",
    type_auto: "Dete\u00e7\u00e3o autom\u00e1tica", type_washer: "M\u00e1quina de lavar", type_dryer: "Secadora", type_dishwasher: "M\u00e1quina de lavar loi\u00e7a",
    state_entity: "Entidade de estado (obrigat\u00f3ria)",
    program_entity: "Entidade de programa",
    program_format: "Formato do nome do programa",
    program_format_raw: "Bruto", program_format_clean: "Simplificado",
    remaining_time_entity: "Entidade de tempo restante",
    remaining_time_unit: "Unidade do tempo restante",
    remaining_time_hide_when_idle: "Ocultar tempo restante fora de funcionamento",
    remaining_time_split: "Mostrar a hora de fim numa linha \u00e0 parte",
    unit_auto: "Dete\u00e7\u00e3o autom\u00e1tica", unit_seconds: "Segundos", unit_minutes: "Minutos",
    progress_entity: "Entidade de progresso % (substitui a estimativa)",
    door_entity: "Entidade do sensor de porta",
    door_open_state: "Valor de estado \"aberta\"",
    door_invert: "Inverter (o estado significa fechada, n\u00e3o aberta)",
    door_hide_in_list: "N\u00e3o mostrar na lista de informa\u00e7\u00f5es",
    alerts_entity: "Entidade de alertas (tipo atributos)",
    info_entities: "Entidades de informa\u00e7\u00e3o adicionais (IDs separados por v\u00edrgula)",
    connectivity_entity: "Entidade de conetividade",
    connectivity_connected_state: "Valor de estado \"conectado\"",
    start_entity: "Entidade do bot\u00e3o Iniciar",
    pause_entity: "Entidade do bot\u00e3o Pausa",
    resume_entity: "Entidade do bot\u00e3o Retomar",
    stop_entity: "Entidade do bot\u00e3o Parar/Reiniciar",
    section_program: "Programa", section_remaining: "Tempo restante",
    section_ready_at: "Pronto \u00e0s",
    section_progress: "Progresso % (substitui estimativa)", section_door: "Sensor de porta",
    section_alerts: "Alertas", section_connectivity: "Conetividade",
    section_info: "Entidades de informa\u00e7\u00e3o adicionais", section_lines_order: "Ordem das linhas",
    info_count: "N\u00famero de entidades adicionais",
    section_alert_list: "Entidades de alerta", alerts_add: "Adicionar um alerta\u2026", list_other: "Outra entidade\u2026", list_remove: "Remover",
    section_corner_list: "Interruptores nos cantos", corners_add: "Adicionar um interruptor\u2026",
    info_label: "Nome exibido (opcional)",
    info_value_map: "Correspond\u00eancia de valores (opcional)",
    info_value_map_placeholder: "Uma por linha, ex.\n0: Pronto\n1: Lavagem",
    info_hide_unit: "Ocultar a unidade",
    state_map_placeholder: "Uma por linha, ex.\nReady: idle\nAborting: running\n*: running",
    info_drag: "Arraste para reordenar",
    section_start: "Bot\u00e3o Iniciar", section_pause: "Bot\u00e3o Pausa",
    section_resume: "Bot\u00e3o Retomar", section_stop: "Bot\u00e3o Parar/Reiniciar",
    picker_icon: "\u00cdcone (opcional)",
    type_oven: "Forno", type_microwave: "Micro-ondas",
    type_hood: "Exaustor", type_cooktop: "Placa de coz\u00ednha",
    preheating: "A pr\u00e9-aquecer", standby: "Em espera",
    temperature: "Temperatura", fan_speed: "Velocidade",
    filter: "Filtro", power: "Pot\u00eancia",
    power_level: "N\u00edvel de pot\u00eancia", child_lock: "Bloqueio para crian\u00e7as",
    residual_heat: "Calor residual", boost: "Intensivo",
    light: "Luz", filter_reset: "Repor filtro",
    zone: "Zona", zones_active: "zonas ativas",
    section_target_temperature: "Temperatura definida", section_current_temperature: "Temperatura atual",
    section_light: "Luz", section_heating: "Indicador de aquecimento",
    section_power_level: "N\u00edvel de pot\u00eancia", section_fan: "Ventilador",
    section_filter_life: "Vida do filtro", section_filter_reset: "Bot\u00e3o de reposi\u00e7\u00e3o do filtro",
    section_boost: "Modo intensivo", section_child_lock: "Bloqueio para crian\u00e7as",
    section_power: "Consumo", section_zones: "Zonas de cozedura",
    target_temperature_entity: "Entidade de temperatura definida", current_temperature_entity: "Entidade de temperatura atual",
    light_entity: "Entidade de luz", heating_entity: "Entidade de aquecimento (opcional)",
    power_level_entity: "Entidade de n\u00edvel de pot\u00eancia", fan_entity: "Entidade de ventilador",
    filter_life_entity: "Entidade de vida do filtro (%)", filter_reset_entity: "Entidade do bot\u00e3o de reposi\u00e7\u00e3o do filtro",
    boost_entity: "Entidade de modo intensivo", child_lock_entity: "Entidade de bloqueio para crian\u00e7as",
    power_entity: "Entidade de pot\u00eancia (W)", power_on_threshold: "Em funcionamento acima desta pot\u00eancia (W)",
    zones_count: "N\u00famero de zonas de cozedura", zone_level_entity: "Entidade de n\u00edvel",
    section_toggle: "Interruptor", toggle: "Ligar/Desligar",
    off_short: "Desligado", toggle_entity: "Entidade do interruptor",
    zone_residual_entity: "Entidade de calor residual", zone_name: "Nome da zona (opcional)",
    type_fridge: "Frigor\u00edfico", type_kettle: "Chaleira",
    fridge_ok: "Normal", temp_high: "Temperatura alta",
    unplugged: "Desligado da tomada", no_power: "Sem consumo", section_plug: "Interruptor da tomada", no_power_after: "Avisar ap\u00f3s (minutos sem consumo)", temperature_decimals: "Precis\u00e3o da temperatura", precision_auto: "Como a entidade", precision_0: "Ao grau", precision_1: "Uma casa decimal", kettle_heating: "A aquecer",
    kettle_off: "Desligada", fridge_compartment: "Frigor\u00edfico",
    freezer_compartment: "Congelador", ice_maker: "M\u00e1quina de gelo",
    since: "h\u00e1", section_fridge_layout: "Configura\u00e7\u00e3o",
    layout_single: "Uma porta", layout_freezer_bottom: "Congelador em baixo",
    layout_freezer_top: "Congelador em cima", layout_side_by_side: "Side by side", layout_wine: "Porta de vidro (garrafeira)",
    section_fridge_temperature: "Temperatura do frigor\u00edfico", section_freezer_temperature: "Temperatura do congelador",
    section_freezer_door: "Sensor da porta do congelador", section_ice_maker: "M\u00e1quina de gelo",
    fridge_max_temperature: "Avisar acima desta temperatura", section_kettle_temperature: "Temperatura da \u00e1gua",
    ice_on: "Em funcionamento", ice_off: "Desligada", doors_closed: "Portas fechadas",
    fridge_door_open: "Frigor\u00edfico aberto", freezer_door_open: "Congelador aberto",
    type_cooker: "Rob\u00f4 de cozinha", type_coffee: "M\u00e1quina de caf\u00e9",
    water_empty: "Dep\u00f3sito de \u00e1gua vazio", beans_empty: "Dep\u00f3sito de gr\u00e3os vazio",
    tray_full: "Bandeja de recolha cheia", descale: "Descalcifica\u00e7\u00e3o pendente",
    speed: "Velocidade", section_speed: "Velocidade da l\u00e2mina",
    section_water: "Dep\u00f3sito de \u00e1gua", section_beans: "Dep\u00f3sito de gr\u00e3os",
    section_tray: "Bandeja de recolha", section_descaling: "Descalcifica\u00e7\u00e3o",
    cups: "Ch\u00e1venas", strength: "Intensidade",
    section_cups: "N\u00famero de ch\u00e1venas", section_strength: "Intensidade do caf\u00e9",
    type_rice_cooker: "Panela de arroz", keep_warm: "A manter quente",
    language: "Idioma", language_auto: "Seguir o Home Assistant",
    illustration_color: "Cor do eletrodom\u00e9stico", color_auto: "Seguir o tema",
    color_white: "Branco", color_grey: "Cinzento", color_black: "Preto",
    type_water_heater: "Termoacumulador", type_boiler: "Caldeira", type_heat_pump: "Bomba de calor",
    boiler_space_heating: "Aquecimento", boiler_hot_water: "\u00c1gua quente", boiler_burner: "Queimador ligado", boiler_starting: "Igni\u00e7\u00e3o", boiler_waiting: "Pausa do queimador", hp_cooling: "Arrefecimento", hp_defrost: "Descongela\u00e7\u00e3o",
    section_space_heating: "Indicador de aquecimento central", section_hot_water: "Indicador de \u00e1gua quente", section_flow_temperature: "Temperatura de ida", section_heat_output: "Calor produzido", section_cop: "Coeficiente de desempenho (COP)", section_outdoor_temperature: "Temperatura exterior",
    section_cooling: "Indicador de arrefecimento", section_cooling_power: "Pot\u00eancia em arrefecimento", section_cooling_output: "Frio produzido", section_hot_water_power: "Pot\u00eancia para \u00e1gua quente", section_hot_water_output: "Calor produzido para \u00e1gua quente",
    section_return_temperature: "Temperatura de retorno", section_water_flow: "Caudal de \u00e1gua", section_compressor: "Compressor", hp_delta: "Delta", section_fan_speed: "Velocidade da ventoinha",
    hp_flow_return: "Ida e retorno", no_hot_water: "Sem dep\u00f3sito de \u00e1gua quente", underfloor_heating: "Piso radiante em vez de radiadores",
    type_printer_3d: "Impressora 3D", section_nozzle_temperature: "Temperatura do bico", section_nozzle_target: "Temperatura alvo do bico",
    section_bed_temperature: "Temperatura da mesa", section_bed_target: "Temperatura alvo da mesa", section_chamber_temperature: "Temperatura da c\u00e2mara",
    section_current_layer: "Camada atual", section_total_layers: "Total de camadas", section_print_file: "Arquivo de impress\u00e3o",
    section_print_stage: "Etapa de impress\u00e3o", section_printer_layout: "Estrutura", layout_enclosed: "Fechada",
    layout_open: "Aberta (mesa m\u00f3vel)", unit_hours: "Horas", p3_nozzle: "Bico",
    p3_bed: "Mesa", p3_chamber: "C\u00e2mara", p3_layer: "Camada",
    p3_file: "Arquivo", p3_printing: "Imprimindo", p3_preparing: "Preparando",
    p3_cancelled: "Cancelada", p3_failed: "Falhou", p3_offline: "Offline",
    p3_attention: "Requer aten\u00e7\u00e3o", p3_leveling: "Nivelando a mesa", p3_filament: "Trocando o filamento",
    p3_cooling: "Resfriando", p3_calibrating: "Calibrando", p3_homing: "Retornando \u00e0 origem",
    section_printed_part: "Pe\u00e7a impressa", part_cube: "Cubo", part_pyramid: "Pir\u00e2mide", part_duck: "Patinho de borracha",
    type_pet_feeder: "Alimentador autom\u00e1tico", feeder_ready: "Pronto", feeder_feeding: "A distribuir", section_portions_today: "Por\u00e7\u00f5es de hoje", section_weight_today: "Peso de hoje", section_portion_weight: "Peso da por\u00e7\u00e3o", section_serving_size: "Tamanho da por\u00e7\u00e3o", section_feeder_schedule: "Programa\u00e7\u00e3o", section_last_feed: "\u00daltima refei\u00e7\u00e3o", section_error: "Indicador de erro", start_option: "Op\u00e7\u00e3o a selecionar", start_value: "Valor a escrever", portions: "por\u00e7\u00f5es",
    feeder_empty: "Dep\u00f3sito vazio", feeder_level: "Dep\u00f3sito a {pct}", section_level: "N\u00edvel de comida", level_empty_below: "Vazio em ou abaixo de", level_max: "Capacidade do dep\u00f3sito",
    section_feeder_layout: "Modelo", layout_tower: "Torre, ta\u00e7a integrada", layout_canister: "Dep\u00f3sito redondo, ta\u00e7a \u00e0 parte",
    type_iron: "Ferro de engomar", section_iron_layout: "Modelo", layout_iron: "Ferro de engomar", layout_generator: "Gerador de vapor",
    iron_heating: "A aquecer", iron_off: "Desligada", left_on: "Ficou ligado", left_on_after: "Avisar ap\u00f3s (minutos ligado)",
    washer_dryer: "M\u00e1quina de lavar e secar (lava e seca)", step_drying: "Secagem", section_cycle_phase: "Fase do ciclo",
    step_prewash: "Pr\u00e9-lavagem", step_soaking: "Molho", step_weighing: "Pesagem", step_filling: "Enchimento", step_washing: "Lavagem", step_rinsing: "Enxaguamento", step_draining: "Escoamento", step_spinning: "Centrifuga\u00e7\u00e3o", step_cooling: "Arrefecimento", step_anti_crease: "Anti-vincos", step_steam: "Vapor",
  },
  sv: {
    idle: "Inaktiv", running: "Ig\u00e5ng", paused: "Pausad", done: "Klar",
    delayed: "F\u00f6rdr\u00f6jd start", error: "Fel", unknown: "Ok\u00e4nd",
    program: "Program", remaining: "kvar", ready_at: "klar kl.", time_done: "Klar",
    door_open: "Lucka \u00f6ppen", door_closed: "Lucka st\u00e4ngd", alerts: "Varningar",
    alerts_n_one: "{n} varning", alerts_n_few: "{n} varningar", alerts_n_many: "{n} varningar", alerts_n_other: "{n} varningar",
    connected: "Ansluten", disconnected: "Fr\u00e5nkopplad",
    start: "Start", pause: "Paus", resume: "\u00c5teruppta", stop: "Stopp",
    name: "Namn", icon: "Ikon", entity: "Entitet",
    main_settings: "Huvudentiteter", display_settings: "Visning",
    action_settings: "Styrning",
    group_general: "Allm\u00e4nna inst\u00e4llningar",
    compact: "Kompakt l\u00e4ge (d\u00f6lj ikon)",
    state_show_raw: "Visa alltid entitetens r\u00e5data ist\u00e4llet f\u00f6r den \u00f6versatta etiketten",
    appliance_type: "Typ av apparat",
    type_auto: "Automatisk identifiering", type_washer: "Tv\u00e4ttmaskin", type_dryer: "Torktumlare", type_dishwasher: "Diskmaskin",
    state_entity: "Statusentitet (obligatorisk)",
    program_entity: "Programentitet",
    program_format: "Format f\u00f6r programnamn",
    program_format_raw: "R\u00e5data", program_format_clean: "Rensat",
    remaining_time_entity: "Entitet f\u00f6r \u00e5terst\u00e5ende tid",
    remaining_time_unit: "Enhet f\u00f6r \u00e5terst\u00e5ende tid",
    remaining_time_hide_when_idle: "D\u00f6lj \u00e5terst\u00e5ende tid n\u00e4r den inte k\u00f6r",
    remaining_time_split: "Visa sluttiden p\u00e5 en egen rad",
    unit_auto: "Automatisk identifiering", unit_seconds: "Sekunder", unit_minutes: "Minuter",
    progress_entity: "F\u00f6rlopp %-entitet (\u00e5sidos\u00e4tter uppskattning)",
    door_entity: "Luckans sensorentitet",
    door_open_state: "Statusv\u00e4rde \"\u00f6ppen\"",
    door_invert: "Invertera (status betyder st\u00e4ngd, inte \u00f6ppen)",
    door_hide_in_list: "Visa inte i infolistan",
    alerts_entity: "Varningsentitet (attributbaserad)",
    info_entities: "Extra infoentiteter (entitets-ID separerade med kommatecken)",
    connectivity_entity: "Anslutningsentitet",
    connectivity_connected_state: "Statusv\u00e4rde \"ansluten\"",
    start_entity: "Startknappentitet",
    pause_entity: "Pausknappentitet",
    resume_entity: "\u00c5terupptaknappentitet",
    stop_entity: "Stopp-/\u00e5terst\u00e4llningsknappentitet",
    section_program: "Program", section_remaining: "\u00c5terst\u00e5ende tid",
    section_ready_at: "Klar kl.",
    section_progress: "F\u00f6rlopp % (\u00e5sidos\u00e4tter uppskattning)", section_door: "Luckans sensor",
    section_alerts: "Varningar", section_connectivity: "Anslutning",
    section_info: "Extra infoentiteter", section_lines_order: "Radernas ordning",
    info_count: "Antal extra entiteter",
    section_alert_list: "Varningsentiteter", alerts_add: "L\u00e4gg till en varning\u2026", list_other: "Annan entitet\u2026", list_remove: "Ta bort",
    section_corner_list: "Brytare i h\u00f6rnen", corners_add: "L\u00e4gg till en brytare\u2026",
    info_label: "Visningsnamn (valfritt)",
    info_value_map: "V\u00e4rdemappning (valfritt)",
    info_value_map_placeholder: "En per rad, t.ex.\n0: Klar\n1: Tv\u00e4tt",
    info_hide_unit: "D\u00f6lj enhet",
    state_map_placeholder: "En per rad, t.ex.\nReady: idle\nAborting: running\n*: running",
    info_drag: "Dra f\u00f6r att \u00e4ndra ordning",
    section_start: "Startknapp", section_pause: "Pausknapp",
    section_resume: "\u00c5terupptaknapp", section_stop: "Stopp-/\u00e5terst\u00e4llningsknapp",
    picker_icon: "Ikon (valfritt)",
    type_oven: "Ugn", type_microwave: "Mikrov\u00e5gsugn",
    type_hood: "K\u00f6ksfl\u00e4kt", type_cooktop: "H\u00e4ll",
    preheating: "F\u00f6rv\u00e4rmer", standby: "Standby",
    temperature: "Temperatur", fan_speed: "Fl\u00e4ktl\u00e4ge",
    filter: "Filter", power: "Effekt",
    power_level: "Effektl\u00e4ge", child_lock: "Barnl\u00e5s",
    residual_heat: "Restv\u00e4rme", boost: "Intensiv",
    light: "Belysning", filter_reset: "\u00c5terst\u00e4ll filter",
    zone: "Kokzon", zones_active: "aktiva kokzoner",
    section_target_temperature: "M\u00e5ltemperatur", section_current_temperature: "Aktuell temperatur",
    section_light: "Belysning", section_heating: "V\u00e4rmeindikator",
    section_power_level: "Effektl\u00e4ge", section_fan: "Fl\u00e4kt",
    section_filter_life: "Filterlivsl\u00e4ngd", section_filter_reset: "Knapp f\u00f6r filter\u00e5terst\u00e4llning",
    section_boost: "Intensivl\u00e4ge", section_child_lock: "Barnl\u00e5s",
    section_power: "F\u00f6rbrukning", section_zones: "Kokzoner",
    target_temperature_entity: "Entitet f\u00f6r m\u00e5ltemperatur", current_temperature_entity: "Entitet f\u00f6r aktuell temperatur",
    light_entity: "Entitet f\u00f6r belysning", heating_entity: "Entitet f\u00f6r uppv\u00e4rmning (valfritt)",
    power_level_entity: "Entitet f\u00f6r effektl\u00e4ge", fan_entity: "Entitet f\u00f6r fl\u00e4kt",
    filter_life_entity: "Entitet f\u00f6r filterlivsl\u00e4ngd (%)", filter_reset_entity: "Entitet f\u00f6r filter\u00e5terst\u00e4llningsknapp",
    boost_entity: "Entitet f\u00f6r intensivl\u00e4ge", child_lock_entity: "Entitet f\u00f6r barnl\u00e5s",
    power_entity: "Entitet f\u00f6r effekt (W)", power_on_threshold: "I drift \u00f6ver denna effekt (W)",
    zones_count: "Antal kokzoner", zone_level_entity: "Entitet f\u00f6r l\u00e4ge",
    section_toggle: "Str\u00f6mbrytare", toggle: "P\u00e5/av",
    off_short: "Av", toggle_entity: "Entitet f\u00f6r str\u00f6mbrytare",
    zone_residual_entity: "Entitet f\u00f6r restv\u00e4rme", zone_name: "Kokzonens namn (valfritt)",
    type_fridge: "Kylsk\u00e5p", type_kettle: "Vattenkokare",
    fridge_ok: "Normal", temp_high: "H\u00f6g temperatur",
    unplugged: "Urkopplad", no_power: "Ingen f\u00f6rbrukning", section_plug: "Uttagets str\u00f6mbrytare", no_power_after: "Varna efter (minuter utan f\u00f6rbrukning)", temperature_decimals: "Temperaturprecision", precision_auto: "Som entiteten", precision_0: "Hela grader", precision_1: "En decimal", kettle_heating: "V\u00e4rmer",
    kettle_off: "Av", fridge_compartment: "Kyl",
    freezer_compartment: "Frys", ice_maker: "Ismaskin",
    since: "sedan", section_fridge_layout: "Utf\u00f6rande",
    layout_single: "En d\u00f6rr", layout_freezer_bottom: "Frys nedtill",
    layout_freezer_top: "Frys upptill", layout_side_by_side: "Side by side", layout_wine: "Glasd\u00f6rr (vinkyl)",
    section_fridge_temperature: "Kyltemperatur", section_freezer_temperature: "Frystemperatur",
    section_freezer_door: "D\u00f6rrsensor frys", section_ice_maker: "Ismaskin",
    fridge_max_temperature: "Varna \u00f6ver denna temperatur", section_kettle_temperature: "Vattentemperatur",
    ice_on: "I drift", ice_off: "Av", doors_closed: "D\u00f6rrar st\u00e4ngda",
    fridge_door_open: "Kylen \u00f6ppen", freezer_door_open: "Frysen \u00f6ppen",
    type_cooker: "K\u00f6ksmaskin", type_coffee: "Kaffemaskin",
    water_empty: "Vattentanken \u00e4r tom", beans_empty: "B\u00f6nbeh\u00e5llaren \u00e4r tom",
    tray_full: "Droppsk\u00e5len \u00e4r full", descale: "Avkalkning beh\u00f6vs",
    speed: "Hastighet", section_speed: "Knivhastighet",
    section_water: "Vattentank", section_beans: "B\u00f6nbeh\u00e5llare",
    section_tray: "Droppsk\u00e5l", section_descaling: "Avkalkning",
    cups: "Koppar", strength: "Styrka",
    section_cups: "Antal koppar", section_strength: "Kaffestyrka",
    type_rice_cooker: "Riskokare", keep_warm: "Varmh\u00e5llning",
    language: "Spr\u00e5k", language_auto: "F\u00f6lj Home Assistant",
    illustration_color: "Apparatens f\u00e4rg", color_auto: "F\u00f6lj temat",
    color_white: "Vit", color_grey: "Gr\u00e5", color_black: "Svart",
    type_water_heater: "Varmvattenberedare", type_boiler: "Panna", type_heat_pump: "V\u00e4rmepump",
    boiler_space_heating: "Uppv\u00e4rmning", boiler_hot_water: "Varmvatten", boiler_burner: "Br\u00e4nnare p\u00e5", boiler_starting: "T\u00e4ndning", boiler_waiting: "V\u00e4ntar", hp_cooling: "Kylning", hp_defrost: "Avfrostning",
    section_space_heating: "Indikator f\u00f6r uppv\u00e4rmning", section_hot_water: "Indikator f\u00f6r varmvatten", section_flow_temperature: "Framledningstemperatur", section_heat_output: "V\u00e4rmeeffekt", section_cop: "V\u00e4rmefaktor (COP)", section_outdoor_temperature: "Utomhustemperatur",
    section_cooling: "Indikator f\u00f6r kylning", section_cooling_power: "Effekt vid kylning", section_cooling_output: "Kyleffekt", section_hot_water_power: "Effekt f\u00f6r varmvatten", section_hot_water_output: "V\u00e4rmeeffekt f\u00f6r varmvatten",
    section_return_temperature: "Returtemperatur", section_water_flow: "Vattenfl\u00f6de", section_compressor: "Kompressor", hp_delta: "Delta", section_fan_speed: "Fl\u00e4kthastighet",
    hp_flow_return: "Fram och retur", no_hot_water: "Ingen varmvattenberedare", underfloor_heating: "Golvv\u00e4rme i st\u00e4llet f\u00f6r radiatorer",
    type_printer_3d: "3D-skrivare", section_nozzle_temperature: "Munstyckets temperatur", section_nozzle_target: "Munstyckets m\u00e5ltemperatur",
    section_bed_temperature: "B\u00e4ddens temperatur", section_bed_target: "B\u00e4ddens m\u00e5ltemperatur", section_chamber_temperature: "Kammartemperatur",
    section_current_layer: "Aktuellt lager", section_total_layers: "Antal lager", section_print_file: "Utskriftsfil",
    section_print_stage: "Utskriftsfas", section_printer_layout: "Ram", layout_enclosed: "Sluten",
    layout_open: "\u00d6ppen ram (r\u00f6rlig b\u00e4dd)", unit_hours: "Timmar", p3_nozzle: "Munstycke",
    p3_bed: "B\u00e4dd", p3_chamber: "Kammare", p3_layer: "Lager",
    p3_file: "Fil", p3_printing: "Skriver ut", p3_preparing: "F\u00f6rbereder",
    p3_cancelled: "Avbruten", p3_failed: "Misslyckades", p3_offline: "Offline",
    p3_attention: "Kr\u00e4ver \u00e5tg\u00e4rd", p3_leveling: "Nivellerar b\u00e4dden", p3_filament: "Byter filament",
    p3_cooling: "Kyler", p3_calibrating: "Kalibrerar", p3_homing: "Nollst\u00e4ller axlar",
    section_printed_part: "Utskrivet objekt", part_cube: "Kub", part_pyramid: "Pyramid", part_duck: "Badanka",
    type_pet_feeder: "Foderautomat", feeder_ready: "Redo", feeder_feeding: "Matar", section_portions_today: "Portioner idag", section_weight_today: "Vikt idag", section_portion_weight: "Portionsvikt", section_serving_size: "Portionsstorlek", section_feeder_schedule: "Schema", section_last_feed: "Senaste matning", section_error: "Felindikator", start_option: "Alternativ att v\u00e4lja", start_value: "V\u00e4rde att skriva", portions: "portioner",
    feeder_empty: "Beh\u00e5llaren tom", feeder_level: "Beh\u00e5llaren {pct} full", section_level: "Foderm\u00e4ngd", level_empty_below: "Tom vid eller under", level_max: "Beh\u00e5llarens volym",
    section_feeder_layout: "Modell", layout_tower: "Torn, inbyggd sk\u00e5l", layout_canister: "Rund beh\u00e5llare, separat sk\u00e5l",
    type_iron: "Strykj\u00e4rn", section_iron_layout: "Modell", layout_iron: "Strykj\u00e4rn", layout_generator: "\u00c5ngstation",
    iron_heating: "V\u00e4rmer", iron_off: "Av", left_on: "St\u00e5r p\u00e5", left_on_after: "Varna efter (minuter p\u00e5slagen)",
    washer_dryer: "Kombinerad tv\u00e4tt/tork (tv\u00e4ttar och torkar)", step_drying: "Torkning", section_cycle_phase: "Programfas",
    step_prewash: "F\u00f6rtv\u00e4tt", step_soaking: "Bl\u00f6tl\u00e4ggning", step_weighing: "V\u00e4gning", step_filling: "P\u00e5fyllning", step_washing: "Tv\u00e4tt", step_rinsing: "Sk\u00f6ljning", step_draining: "T\u00f6mning", step_spinning: "Centrifugering", step_cooling: "Avsvalning", step_anti_crease: "Skrynkelskydd", step_steam: "\u00c5nga",
  },
  no: {
    idle: "Inaktiv", running: "I gang", paused: "Pauset", done: "Ferdig",
    delayed: "Utsatt start", error: "Feil", unknown: "Ukjent",
    program: "Program", remaining: "gjenst\u00e5r", ready_at: "ferdig kl.", time_done: "Ferdig",
    door_open: "D\u00f8r \u00e5pen", door_closed: "D\u00f8r lukket", alerts: "Varsler",
    alerts_n_one: "{n} varsel", alerts_n_few: "{n} varsler", alerts_n_many: "{n} varsler", alerts_n_other: "{n} varsler",
    connected: "Tilkoblet", disconnected: "Frakoblet",
    start: "Start", pause: "Pause", resume: "Gjenoppta", stop: "Stopp",
    name: "Navn", icon: "Ikon", entity: "Entitet",
    main_settings: "Hovedentiteter", display_settings: "Visning",
    action_settings: "Styring",
    group_general: "Generelle innstillinger",
    compact: "Kompakt modus (skjul ikon)",
    state_show_raw: "Vis alltid entitetens r\u00e5 tekst i stedet for den oversatte etiketten",
    appliance_type: "Apparattype",
    type_auto: "Automatisk gjenkjenning", type_washer: "Vaskemaskin", type_dryer: "T\u00f8rketrommel", type_dishwasher: "Oppvaskmaskin",
    state_entity: "Statusentitet (p\u00e5krevd)",
    program_entity: "Programentitet",
    program_format: "Format for programnavn",
    program_format_raw: "R\u00e5", program_format_clean: "Renset",
    remaining_time_entity: "Entitet for gjenv\u00e6rende tid",
    remaining_time_unit: "Enhet for gjenv\u00e6rende tid",
    remaining_time_hide_when_idle: "Skjul gjenst\u00e5ende tid n\u00e5r den ikke kj\u00f8rer",
    remaining_time_split: "Vis sluttidspunktet p\u00e5 en egen linje",
    unit_auto: "Automatisk gjenkjenning", unit_seconds: "Sekunder", unit_minutes: "Minutter",
    progress_entity: "Fremdrift %-entitet (overstyrer estimat)",
    door_entity: "Lukesensor-entitet",
    door_open_state: "Statusverdi \"\u00e5pen\"",
    door_invert: "Inverter (status betyr lukket, ikke \u00e5pen)",
    door_hide_in_list: "Ikke vis i infolisten",
    alerts_entity: "Varselentitet (attributtbasert)",
    info_entities: "Ekstra infoentiteter (entitets-IDer adskilt med komma)",
    connectivity_entity: "Tilkoblingsentitet",
    connectivity_connected_state: "Statusverdi \"tilkoblet\"",
    start_entity: "Startknapp-entitet",
    pause_entity: "Pauseknapp-entitet",
    resume_entity: "Gjenopptaknapp-entitet",
    stop_entity: "Stopp-/tilbakestillingsknapp-entitet",
    section_program: "Program", section_remaining: "Gjenv\u00e6rende tid",
    section_ready_at: "Ferdig kl.",
    section_progress: "Fremdrift % (overstyrer estimat)", section_door: "Lukesensor",
    section_alerts: "Varsler", section_connectivity: "Tilkobling",
    section_info: "Ekstra infoentiteter", section_lines_order: "Rekkef\u00f8lge p\u00e5 linjene",
    info_count: "Antall ekstra entiteter",
    section_alert_list: "Varselentiteter", alerts_add: "Legg til et varsel\u2026", list_other: "Annen entitet\u2026", list_remove: "Fjern",
    section_corner_list: "Brytere i hj\u00f8rnene", corners_add: "Legg til en bryter\u2026",
    info_label: "Visningsnavn (valgfritt)",
    info_value_map: "Verditilordning (valgfritt)",
    info_value_map_placeholder: "\u00c9n per linje, f.eks.\n0: Klar\n1: Vask",
    info_hide_unit: "Skjul enhet",
    state_map_placeholder: "\u00c9n per linje, f.eks.\nReady: idle\nAborting: running\n*: running",
    info_drag: "Dra for \u00e5 endre rekkef\u00f8lge",
    section_start: "Startknapp", section_pause: "Pauseknapp",
    section_resume: "Gjenopptaknapp", section_stop: "Stopp-/tilbakestillingsknapp",
    picker_icon: "Ikon (valgfritt)",
    type_oven: "Stekeovn", type_microwave: "Mikrob\u00f8lgeovn",
    type_hood: "Kj\u00f8kkenvifte", type_cooktop: "Koketopp",
    preheating: "Forvarmer", standby: "Hvilemodus",
    temperature: "Temperatur", fan_speed: "Viftetrinn",
    filter: "Filter", power: "Effekt",
    power_level: "Effekttrinn", child_lock: "Barnesikring",
    residual_heat: "Restvarme", boost: "Intensiv",
    light: "Lys", filter_reset: "Tilbakestill filter",
    zone: "Kokesone", zones_active: "aktive kokesoner",
    section_target_temperature: "M\u00e5ltemperatur", section_current_temperature: "N\u00e5v\u00e6rende temperatur",
    section_light: "Lys", section_heating: "Varmeindikator",
    section_power_level: "Effekttrinn", section_fan: "Vifte",
    section_filter_life: "Filterlevetid", section_filter_reset: "Knapp for filtertilbakestilling",
    section_boost: "Intensivmodus", section_child_lock: "Barnesikring",
    section_power: "Forbruk", section_zones: "Kokesoner",
    target_temperature_entity: "Enhet for m\u00e5ltemperatur", current_temperature_entity: "Enhet for n\u00e5v\u00e6rende temperatur",
    light_entity: "Enhet for lys", heating_entity: "Enhet for oppvarming (valgfritt)",
    power_level_entity: "Enhet for effekttrinn", fan_entity: "Enhet for vifte",
    filter_life_entity: "Enhet for filterlevetid (%)", filter_reset_entity: "Enhet for filtertilbakestillingsknapp",
    boost_entity: "Enhet for intensivmodus", child_lock_entity: "Enhet for barnesikring",
    power_entity: "Enhet for effekt (W)", power_on_threshold: "I drift over denne effekten (W)",
    zones_count: "Antall kokesoner", zone_level_entity: "Enhet for trinn",
    section_toggle: "Av/p\u00e5-bryter", toggle: "Av/p\u00e5",
    off_short: "Av", toggle_entity: "Enhet for av/p\u00e5-bryter",
    zone_residual_entity: "Enhet for restvarme", zone_name: "Navn p\u00e5 kokesonen (valgfritt)",
    type_fridge: "Kj\u00f8leskap", type_kettle: "Vannkoker",
    fridge_ok: "Normal", temp_high: "H\u00f8y temperatur",
    unplugged: "Frakoblet", no_power: "Ingen forbruk", section_plug: "Stikkontaktens bryter", no_power_after: "Varsle etter (minutter uten forbruk)", temperature_decimals: "Temperaturpresisjon", precision_auto: "Som entiteten", precision_0: "Hele grader", precision_1: "\u00c9n desimal", kettle_heating: "Varmer",
    kettle_off: "Av", fridge_compartment: "Kj\u00f8l",
    freezer_compartment: "Frys", ice_maker: "Ismaskin",
    since: "siden", section_fridge_layout: "Utf\u00f8relse",
    layout_single: "\u00c9n d\u00f8r", layout_freezer_bottom: "Frys nederst",
    layout_freezer_top: "Frys \u00f8verst", layout_side_by_side: "Side by side", layout_wine: "Glassd\u00f8r (vinkj\u00f8leskap)",
    section_fridge_temperature: "Kj\u00f8letemperatur", section_freezer_temperature: "Frysetemperatur",
    section_freezer_door: "D\u00f8rsensor for frys", section_ice_maker: "Ismaskin",
    fridge_max_temperature: "Varsle over denne temperaturen", section_kettle_temperature: "Vanntemperatur",
    ice_on: "I drift", ice_off: "Av", doors_closed: "D\u00f8rer lukket",
    fridge_door_open: "Kj\u00f8leskapet er \u00e5pent", freezer_door_open: "Fryseren er \u00e5pen",
    type_cooker: "Kj\u00f8kkenmaskin", type_coffee: "Kaffemaskin",
    water_empty: "Vanntanken er tom", beans_empty: "B\u00f8nnebeholderen er tom",
    tray_full: "Dryppsk\u00e5len er full", descale: "Avkalking trengs",
    speed: "Hastighet", section_speed: "Knivhastighet",
    section_water: "Vanntank", section_beans: "B\u00f8nnebeholder",
    section_tray: "Dryppsk\u00e5l", section_descaling: "Avkalking",
    cups: "Kopper", strength: "Styrke",
    section_cups: "Antall kopper", section_strength: "Kaffestyrke",
    type_rice_cooker: "Riskoker", keep_warm: "Varmholding",
    language: "Spr\u00e5k", language_auto: "F\u00f8lg Home Assistant",
    illustration_color: "Farge p\u00e5 apparatet", color_auto: "F\u00f8lg temaet",
    color_white: "Hvit", color_grey: "Gr\u00e5", color_black: "Svart",
    type_water_heater: "Varmtvannsbereder", type_boiler: "Kjele", type_heat_pump: "Varmepumpe",
    boiler_space_heating: "Oppvarming", boiler_hot_water: "Varmtvann", boiler_burner: "Brenner p\u00e5", boiler_starting: "Tenning", boiler_waiting: "Venter", hp_cooling: "Kj\u00f8ling", hp_defrost: "Avriming",
    section_space_heating: "Indikator for oppvarming", section_hot_water: "Indikator for varmtvann", section_flow_temperature: "Turtemperatur", section_heat_output: "Varmeeffekt", section_cop: "Effektfaktor (COP)", section_outdoor_temperature: "Utetemperatur",
    section_cooling: "Indikator for kj\u00f8ling", section_cooling_power: "Effekt ved kj\u00f8ling", section_cooling_output: "Kj\u00f8leeffekt", section_hot_water_power: "Effekt for varmtvann", section_hot_water_output: "Varmeeffekt for varmtvann",
    section_return_temperature: "Returtemperatur", section_water_flow: "Vannmengde", section_compressor: "Kompressor", hp_delta: "Delta", section_fan_speed: "Viftehastighet",
    hp_flow_return: "Tur og retur", no_hot_water: "Ingen varmtvannsbereder", underfloor_heating: "Gulvvarme i stedet for radiatorer",
    type_printer_3d: "3D-skriver", section_nozzle_temperature: "Dysetemperatur", section_nozzle_target: "M\u00e5ltemperatur for dysen",
    section_bed_temperature: "Sengetemperatur", section_bed_target: "M\u00e5ltemperatur for sengen", section_chamber_temperature: "Kammertemperatur",
    section_current_layer: "Gjeldende lag", section_total_layers: "Antall lag", section_print_file: "Utskriftsfil",
    section_print_stage: "Utskriftsfase", section_printer_layout: "Ramme", layout_enclosed: "Lukket",
    layout_open: "\u00c5pen ramme (bevegelig seng)", unit_hours: "Timer", p3_nozzle: "Dyse",
    p3_bed: "Seng", p3_chamber: "Kammer", p3_layer: "Lag",
    p3_file: "Fil", p3_printing: "Skriver ut", p3_preparing: "Forbereder",
    p3_cancelled: "Avbrutt", p3_failed: "Mislyktes", p3_offline: "Frakoblet",
    p3_attention: "Krever tilsyn", p3_leveling: "Nivellerer sengen", p3_filament: "Bytter filament",
    p3_cooling: "Kj\u00f8ler", p3_calibrating: "Kalibrerer", p3_homing: "Nullstiller akser",
    section_printed_part: "Utskrevet objekt", part_cube: "Kube", part_pyramid: "Pyramide", part_duck: "Badeand",
    type_pet_feeder: "F\u00f4rautomat", feeder_ready: "Klar", feeder_feeding: "Mater", section_portions_today: "Porsjoner i dag", section_weight_today: "Vekt i dag", section_portion_weight: "Porsjonsvekt", section_serving_size: "Porsjonsst\u00f8rrelse", section_feeder_schedule: "Tidsplan", section_last_feed: "Siste m\u00e5ltid", section_error: "Feilindikator", start_option: "Alternativ \u00e5 velge", start_value: "Verdi \u00e5 skrive", portions: "porsjoner",
    feeder_empty: "Beholder tom", feeder_level: "Beholder {pct} full", section_level: "F\u00f4rniv\u00e5", level_empty_below: "Tom ved eller under", level_max: "Beholderens volum",
    section_feeder_layout: "Modell", layout_tower: "T\u00e5rn, innebygd sk\u00e5l", layout_canister: "Rund beholder, separat sk\u00e5l",
    type_iron: "Strykejern", section_iron_layout: "Modell", layout_iron: "Strykejern", layout_generator: "Dampstasjon",
    iron_heating: "Varmer", iron_off: "Av", left_on: "St\u00e5r p\u00e5", left_on_after: "Varsle etter (minutter p\u00e5sl\u00e5tt)",
    washer_dryer: "Kombinert vaske-/t\u00f8rkemaskin (vasker og t\u00f8rker)", step_drying: "T\u00f8rking", section_cycle_phase: "Programfase",
    step_prewash: "Forvask", step_soaking: "Bl\u00f8tlegging", step_weighing: "Veiing", step_filling: "Vannfylling", step_washing: "Vask", step_rinsing: "Skylling", step_draining: "T\u00f8mming", step_spinning: "Sentrifugering", step_cooling: "Avkj\u00f8ling", step_anti_crease: "Antikr\u00f8ll", step_steam: "Damp",
  },
  da: {
    idle: "Inaktiv", running: "I gang", paused: "Sat p\u00e5 pause", done: "F\u00e6rdig",
    delayed: "Forsinket start", error: "Fejl", unknown: "Ukendt",
    program: "Program", remaining: "resterer", ready_at: "f\u00e6rdig kl.", time_done: "F\u00e6rdig",
    door_open: "L\u00e5ge \u00e5ben", door_closed: "L\u00e5ge lukket", alerts: "Advarsler",
    alerts_n_one: "{n} advarsel", alerts_n_few: "{n} advarsler", alerts_n_many: "{n} advarsler", alerts_n_other: "{n} advarsler",
    connected: "Forbundet", disconnected: "Afbrudt",
    start: "Start", pause: "Pause", resume: "Genoptag", stop: "Stop",
    name: "Navn", icon: "Ikon", entity: "Enhed",
    main_settings: "Hovedenheder", display_settings: "Visning",
    action_settings: "Betjening",
    group_general: "Generelle indstillinger",
    compact: "Kompakt tilstand (skjul ikon)",
    state_show_raw: "Vis altid enhedens r\u00e5 tekst i stedet for den oversatte etiket",
    appliance_type: "Apparattype",
    type_auto: "Automatisk registrering", type_washer: "Vaskemaskine", type_dryer: "T\u00f8rretumbler", type_dishwasher: "Opvaskemaskine",
    state_entity: "Statusenhed (p\u00e5kr\u00e6vet)",
    program_entity: "Programenhed",
    program_format: "Format for programnavn",
    program_format_raw: "R\u00e5", program_format_clean: "Renset",
    remaining_time_entity: "Enhed for resterende tid",
    remaining_time_unit: "Tidsenhed for resterende tid",
    remaining_time_hide_when_idle: "Skjul resterende tid uden for drift",
    remaining_time_split: "Vis sluttidspunktet p\u00e5 en separat linje",
    unit_auto: "Automatisk registrering", unit_seconds: "Sekunder", unit_minutes: "Minutter",
    progress_entity: "Fremgang %-enhed (tilsides\u00e6tter estimat)",
    door_entity: "L\u00e5gesensor-enhed",
    door_open_state: "Statusv\u00e6rdi \"\u00e5ben\"",
    door_invert: "Vend om (status betyder lukket, ikke \u00e5ben)",
    door_hide_in_list: "Vis ikke i infolisten",
    alerts_entity: "Advarselsenhed (attributbaseret)",
    info_entities: "Ekstra info-enheder (entitets-ID'er adskilt med komma)",
    connectivity_entity: "Forbindelsesenhed",
    connectivity_connected_state: "Statusv\u00e6rdi \"forbundet\"",
    start_entity: "Startknap-enhed",
    pause_entity: "Pauseknap-enhed",
    resume_entity: "Genoptagknap-enhed",
    stop_entity: "Stop-/nulstillingsknap-enhed",
    section_program: "Program", section_remaining: "Resterende tid",
    section_ready_at: "F\u00e6rdig kl.",
    section_progress: "Fremgang % (tilsides\u00e6tter estimat)", section_door: "L\u00e5gesensor",
    section_alerts: "Advarsler", section_connectivity: "Forbindelse",
    section_info: "Ekstra info-enheder", section_lines_order: "Linjernes r\u00e6kkef\u00f8lge",
    info_count: "Antal ekstra enheder",
    section_alert_list: "Advarselsenheder", alerts_add: "Tilf\u00f8j en advarsel\u2026", list_other: "Anden enhed\u2026", list_remove: "Fjern",
    section_corner_list: "Kontakter i hj\u00f8rnerne", corners_add: "Tilf\u00f8j en kontakt\u2026",
    info_label: "Vist navn (valgfrit)",
    info_value_map: "V\u00e6rditilknytning (valgfrit)",
    info_value_map_placeholder: "\u00c9n pr. linje, f.eks.\n0: Klar\n1: Vask",
    info_hide_unit: "Skjul enhed",
    state_map_placeholder: "\u00c9n pr. linje, f.eks.\nReady: idle\nAborting: running\n*: running",
    info_drag: "Tr\u00e6k for at \u00e6ndre r\u00e6kkef\u00f8lge",
    section_start: "Startknap", section_pause: "Pauseknap",
    section_resume: "Genoptagknap", section_stop: "Stop-/nulstillingsknap",
    picker_icon: "Ikon (valgfrit)",
    type_oven: "Ovn", type_microwave: "Mikroovn",
    type_hood: "Emh\u00e6tte", type_cooktop: "Kogeplade",
    preheating: "Forvarmer", standby: "Standby",
    temperature: "Temperatur", fan_speed: "Ventilatortrin",
    filter: "Filter", power: "Effekt",
    power_level: "Effekttrin", child_lock: "B\u00f8rnesikring",
    residual_heat: "Restvarme", boost: "Intensiv",
    light: "Lys", filter_reset: "Nulstil filter",
    zone: "Kogezone", zones_active: "aktive kogezoner",
    section_target_temperature: "M\u00e5ltemperatur", section_current_temperature: "Aktuel temperatur",
    section_light: "Lys", section_heating: "Varmeindikator",
    section_power_level: "Effekttrin", section_fan: "Ventilator",
    section_filter_life: "Filterlevetid", section_filter_reset: "Knap til filternulstilling",
    section_boost: "Intensivtilstand", section_child_lock: "B\u00f8rnesikring",
    section_power: "Forbrug", section_zones: "Kogezoner",
    target_temperature_entity: "Enhed for m\u00e5ltemperatur", current_temperature_entity: "Enhed for aktuel temperatur",
    light_entity: "Enhed for lys", heating_entity: "Enhed for opvarmning (valgfrit)",
    power_level_entity: "Enhed for effekttrin", fan_entity: "Enhed for ventilator",
    filter_life_entity: "Enhed for filterlevetid (%)", filter_reset_entity: "Enhed for filternulstillingsknap",
    boost_entity: "Enhed for intensivtilstand", child_lock_entity: "Enhed for b\u00f8rnesikring",
    power_entity: "Enhed for effekt (W)", power_on_threshold: "K\u00f8rer over denne effekt (W)",
    zones_count: "Antal kogezoner", zone_level_entity: "Enhed for trin",
    section_toggle: "T\u00e6nd/sluk-knap", toggle: "T\u00e6nd/sluk",
    off_short: "Slukket", toggle_entity: "Enhed for t\u00e6nd/sluk-knap",
    zone_residual_entity: "Enhed for restvarme", zone_name: "Kogezonens navn (valgfrit)",
    type_fridge: "K\u00f8leskab", type_kettle: "Elkedel",
    fridge_ok: "Normal", temp_high: "H\u00f8j temperatur",
    unplugged: "Ikke tilsluttet", no_power: "Intet forbrug", section_plug: "Stikkontaktens afbryder", no_power_after: "Advar efter (minutter uden forbrug)", temperature_decimals: "Temperaturpr\u00e6cision", precision_auto: "Som enheden", precision_0: "Hele grader", precision_1: "\u00c9n decimal", kettle_heating: "Varmer",
    kettle_off: "Slukket", fridge_compartment: "K\u00f8l",
    freezer_compartment: "Frys", ice_maker: "Ismaskine",
    since: "siden", section_fridge_layout: "Udf\u00f8relse",
    layout_single: "\u00c9n l\u00e5ge", layout_freezer_bottom: "Fryser nederst",
    layout_freezer_top: "Fryser \u00f8verst", layout_side_by_side: "Side by side", layout_wine: "Glasd\u00f8r (vink\u00f8leskab)",
    section_fridge_temperature: "K\u00f8letemperatur", section_freezer_temperature: "Frysetemperatur",
    section_freezer_door: "L\u00e5gesensor til fryser", section_ice_maker: "Ismaskine",
    fridge_max_temperature: "Advar over denne temperatur", section_kettle_temperature: "Vandtemperatur",
    ice_on: "I drift", ice_off: "Slukket", doors_closed: "L\u00e5ger lukket",
    fridge_door_open: "K\u00f8leskabet er \u00e5bent", freezer_door_open: "Fryseren er \u00e5ben",
    type_cooker: "K\u00f8kkenmaskine", type_coffee: "Kaffemaskine",
    water_empty: "Vandtanken er tom", beans_empty: "B\u00f8nnebeholderen er tom",
    tray_full: "Drypbakken er fuld", descale: "Afkalkning p\u00e5kr\u00e6vet",
    speed: "Hastighed", section_speed: "Knivhastighed",
    section_water: "Vandtank", section_beans: "B\u00f8nnebeholder",
    section_tray: "Drypbakke", section_descaling: "Afkalkning",
    cups: "Kopper", strength: "Styrke",
    section_cups: "Antal kopper", section_strength: "Kaffestyrke",
    type_rice_cooker: "Riskoger", keep_warm: "Varmholdning",
    language: "Sprog", language_auto: "F\u00f8lg Home Assistant",
    illustration_color: "Apparatets farve", color_auto: "F\u00f8lg temaet",
    color_white: "Hvid", color_grey: "Gr\u00e5", color_black: "Sort",
    type_water_heater: "Varmtvandsbeholder", type_boiler: "Kedel", type_heat_pump: "Varmepumpe",
    boiler_space_heating: "Opvarmning", boiler_hot_water: "Varmt vand", boiler_burner: "Br\u00e6nder t\u00e6ndt", boiler_starting: "T\u00e6nding", boiler_waiting: "Venter", hp_cooling: "K\u00f8ling", hp_defrost: "Afrimning",
    section_space_heating: "Indikator for opvarmning", section_hot_water: "Indikator for varmt vand", section_flow_temperature: "Freml\u00f8bstemperatur", section_heat_output: "Varmeydelse", section_cop: "Effektfaktor (COP)", section_outdoor_temperature: "Udetemperatur",
    section_cooling: "Indikator for k\u00f8ling", section_cooling_power: "Effekt ved k\u00f8ling", section_cooling_output: "K\u00f8leydelse", section_hot_water_power: "Effekt til varmt vand", section_hot_water_output: "Varmeydelse til varmt vand",
    section_return_temperature: "Returtemperatur", section_water_flow: "Vandflow", section_compressor: "Kompressor", hp_delta: "Delta", section_fan_speed: "Ventilatorhastighed",
    hp_flow_return: "Frem og retur", no_hot_water: "Ingen varmtvandsbeholder", underfloor_heating: "Gulvvarme i stedet for radiatorer",
    type_printer_3d: "3D-printer", section_nozzle_temperature: "Dysetemperatur", section_nozzle_target: "M\u00e5ltemperatur for dysen",
    section_bed_temperature: "Sengetemperatur", section_bed_target: "M\u00e5ltemperatur for sengen", section_chamber_temperature: "Kammertemperatur",
    section_current_layer: "Aktuelt lag", section_total_layers: "Antal lag", section_print_file: "Printfil",
    section_print_stage: "Printfase", section_printer_layout: "Ramme", layout_enclosed: "Lukket",
    layout_open: "\u00c5ben ramme (bev\u00e6gelig seng)", unit_hours: "Timer", p3_nozzle: "Dyse",
    p3_bed: "Seng", p3_chamber: "Kammer", p3_layer: "Lag",
    p3_file: "Fil", p3_printing: "Printer", p3_preparing: "Forbereder",
    p3_cancelled: "Annulleret", p3_failed: "Mislykkedes", p3_offline: "Offline",
    p3_attention: "Kr\u00e6ver handling", p3_leveling: "Nivellerer sengen", p3_filament: "Skifter filament",
    p3_cooling: "K\u00f8ler", p3_calibrating: "Kalibrerer", p3_homing: "Nulstiller akser",
    section_printed_part: "Printet emne", part_cube: "Terning", part_pyramid: "Pyramide", part_duck: "Badeand",
    type_pet_feeder: "Foderautomat", feeder_ready: "Klar", feeder_feeding: "Fodrer", section_portions_today: "Portioner i dag", section_weight_today: "V\u00e6gt i dag", section_portion_weight: "Portionsv\u00e6gt", section_serving_size: "Portionsst\u00f8rrelse", section_feeder_schedule: "Tidsplan", section_last_feed: "Sidste fodring", section_error: "Fejlindikator", start_option: "Valgmulighed", start_value: "V\u00e6rdi at skrive", portions: "portioner",
    feeder_empty: "Beholder tom", feeder_level: "Beholder {pct} fuld", section_level: "Foderm\u00e6ngde", level_empty_below: "Tom ved eller under", level_max: "Beholderens rumfang",
    section_feeder_layout: "Model", layout_tower: "T\u00e5rn, indbygget sk\u00e5l", layout_canister: "Rund beholder, separat sk\u00e5l",
    type_iron: "Strygejern", section_iron_layout: "Model", layout_iron: "Strygejern", layout_generator: "Dampstation",
    iron_heating: "Varmer", iron_off: "Slukket", left_on: "St\u00e5r t\u00e6ndt", left_on_after: "Advar efter (minutter t\u00e6ndt)",
    washer_dryer: "Vaske-t\u00f8rremaskine (vasker og t\u00f8rrer)", step_drying: "T\u00f8rring", section_cycle_phase: "Programfase",
    step_prewash: "Forvask", step_soaking: "Ibl\u00f8ds\u00e6tning", step_weighing: "Vejning", step_filling: "P\u00e5fyldning", step_washing: "Vask", step_rinsing: "Skylning", step_draining: "Udpumpning", step_spinning: "Centrifugering", step_cooling: "Afk\u00f8ling", step_anti_crease: "Antikr\u00f8l", step_steam: "Damp",
  },
  pl: {
    idle: "Bezczynny", running: "W trakcie", paused: "Wstrzymany", done: "Zako\u0144czony",
    delayed: "Op\u00f3\u017aniony start", error: "B\u0142\u0105d", unknown: "Nieznany",
    program: "Program", remaining: "pozosta\u0142o", ready_at: "koniec o", time_done: "Koniec",
    door_open: "Drzwiczki otwarte", door_closed: "Drzwiczki zamkni\u0119te", alerts: "Alerty",
    alerts_n_one: "{n} alert", alerts_n_few: "{n} alerty", alerts_n_many: "{n} alert\u00f3w", alerts_n_other: "{n} alertu",
    connected: "Po\u0142\u0105czono", disconnected: "Roz\u0142\u0105czono",
    start: "Start", pause: "Pauza", resume: "Wzn\u00f3w", stop: "Stop",
    name: "Nazwa", icon: "Ikona", entity: "Encja",
    main_settings: "G\u0142\u00f3wne encje", display_settings: "Wy\u015bwietlanie",
    action_settings: "Sterowanie",
    group_general: "Ustawienia og\u00f3lne",
    compact: "Tryb kompaktowy (ukryj ikon\u0119)",
    state_show_raw: "Zawsze pokazuj surowy tekst encji zamiast przet\u0142umaczonej etykiety",
    appliance_type: "Typ urz\u0105dzenia",
    type_auto: "Wykrywanie automatyczne", type_washer: "Pralka", type_dryer: "Suszarka", type_dishwasher: "Zmywarka",
    state_entity: "Encja stanu (wymagana)",
    program_entity: "Encja programu",
    program_format: "Format nazwy programu",
    program_format_raw: "Surowy", program_format_clean: "Uproszczony",
    remaining_time_entity: "Encja pozosta\u0142ego czasu",
    remaining_time_unit: "Jednostka pozosta\u0142ego czasu",
    remaining_time_hide_when_idle: "Ukryj pozosta\u0142y czas poza prac\u0105",
    remaining_time_split: "Pokazuj godzin\u0119 zako\u0144czenia w osobnym wierszu",
    unit_auto: "Wykrywanie automatyczne", unit_seconds: "Sekundy", unit_minutes: "Minuty",
    progress_entity: "Encja post\u0119pu % (nadpisuje szacowanie)",
    door_entity: "Encja czujnika drzwiczek",
    door_open_state: "Warto\u015b\u0107 stanu \"otwarte\"",
    door_invert: "Odwr\u00f3\u0107 (stan oznacza zamkni\u0119te, nie otwarte)",
    door_hide_in_list: "Nie pokazuj na li\u015bcie informacji",
    alerts_entity: "Encja alert\u00f3w (na podstawie atrybut\u00f3w)",
    info_entities: "Dodatkowe encje informacyjne (ID encji oddzielone przecinkami)",
    connectivity_entity: "Encja \u0142\u0105czno\u015bci",
    connectivity_connected_state: "Warto\u015b\u0107 stanu \"po\u0142\u0105czono\"",
    start_entity: "Encja przycisku Start",
    pause_entity: "Encja przycisku Pauza",
    resume_entity: "Encja przycisku Wzn\u00f3w",
    stop_entity: "Encja przycisku Stop/Reset",
    section_program: "Program", section_remaining: "Pozosta\u0142y czas",
    section_ready_at: "Koniec o",
    section_progress: "Post\u0119p % (nadpisuje szacowanie)", section_door: "Czujnik drzwiczek",
    section_alerts: "Alerty", section_connectivity: "\u0141\u0105czno\u015b\u0107",
    section_info: "Dodatkowe encje informacyjne", section_lines_order: "Kolejno\u015b\u0107 wierszy",
    info_count: "Liczba dodatkowych encji",
    section_alert_list: "Encje alert\u00f3w", alerts_add: "Dodaj alert\u2026", list_other: "Inna encja\u2026", list_remove: "Usu\u0144",
    section_corner_list: "Prze\u0142\u0105czniki w rogach", corners_add: "Dodaj prze\u0142\u0105cznik\u2026",
    info_label: "Nazwa wy\u015bwietlana (opcjonalnie)",
    info_value_map: "Mapowanie warto\u015bci (opcjonalnie)",
    info_value_map_placeholder: "Jedno na lini\u0119, np.\n0: Gotowe\n1: Pranie",
    info_hide_unit: "Ukryj jednostk\u0119",
    state_map_placeholder: "Jedno na lini\u0119, np.\nReady: idle\nAborting: running\n*: running",
    info_drag: "Przeci\u0105gnij, aby zmieni\u0107 kolejno\u015b\u0107",
    section_start: "Przycisk Start", section_pause: "Przycisk Pauza",
    section_resume: "Przycisk Wzn\u00f3w", section_stop: "Przycisk Stop/Reset",
    picker_icon: "Ikona (opcjonalnie)",
    type_oven: "Piekarnik", type_microwave: "Kuchenka mikrofalowa",
    type_hood: "Okap kuchenny", type_cooktop: "P\u0142yta grzewcza",
    preheating: "Nagrzewanie wst\u0119pne", standby: "Czuwanie",
    temperature: "Temperatura", fan_speed: "Bieg wentylatora",
    filter: "Filtr", power: "Moc",
    power_level: "Poziom mocy", child_lock: "Blokada rodzicielska",
    residual_heat: "Ciep\u0142o resztkowe", boost: "Intensywny",
    light: "O\u015bwietlenie", filter_reset: "Zresetuj filtr",
    zone: "Pole grzejne", zones_active: "aktywne pola grzejne",
    section_target_temperature: "Temperatura zadana", section_current_temperature: "Temperatura bie\u017c\u0105ca",
    section_light: "O\u015bwietlenie", section_heating: "Wska\u017anik grzania",
    section_power_level: "Poziom mocy", section_fan: "Wentylator",
    section_filter_life: "\u017bywotno\u015b\u0107 filtra", section_filter_reset: "Przycisk resetu filtra",
    section_boost: "Tryb intensywny", section_child_lock: "Blokada rodzicielska",
    section_power: "Zu\u017cycie", section_zones: "Pola grzejne",
    target_temperature_entity: "Encja temperatury zadanej", current_temperature_entity: "Encja temperatury bie\u017c\u0105cej",
    light_entity: "Encja o\u015bwietlenia", heating_entity: "Encja grzania (opcjonalnie)",
    power_level_entity: "Encja poziomu mocy", fan_entity: "Encja wentylatora",
    filter_life_entity: "Encja \u017cywotno\u015bci filtra (%)", filter_reset_entity: "Encja przycisku resetu filtra",
    boost_entity: "Encja trybu intensywnego", child_lock_entity: "Encja blokady rodzicielskiej",
    power_entity: "Encja mocy (W)", power_on_threshold: "Pracuje powy\u017cej tej mocy (W)",
    zones_count: "Liczba p\u00f3l grzejnych", zone_level_entity: "Encja poziomu",
    section_toggle: "W\u0142\u0105cznik", toggle: "Zasilanie",
    off_short: "Wy\u0142.", toggle_entity: "Encja w\u0142\u0105cznika",
    zone_residual_entity: "Encja ciep\u0142a resztkowego", zone_name: "Nazwa pola grzejnego (opcjonalnie)",
    type_fridge: "Lod\u00f3wka", type_kettle: "Czajnik",
    fridge_ok: "Normalnie", temp_high: "Wysoka temperatura",
    unplugged: "Od\u0142\u0105czona", no_power: "Brak poboru", section_plug: "W\u0142\u0105cznik gniazdka", no_power_after: "Ostrze\u017c po (minutach bez poboru)", temperature_decimals: "Dok\u0142adno\u015b\u0107 temperatury", precision_auto: "Jak encja", precision_0: "Do stopnia", precision_1: "Do dziesi\u0105tych", kettle_heating: "Grzeje",
    kettle_off: "Wy\u0142\u0105czony", fridge_compartment: "Ch\u0142odziarka",
    freezer_compartment: "Zamra\u017carka", ice_maker: "Kostkarka",
    since: "od", section_fridge_layout: "Uk\u0142ad",
    layout_single: "Jedne drzwi", layout_freezer_bottom: "Zamra\u017carka na dole",
    layout_freezer_top: "Zamra\u017carka u g\u00f3ry", layout_side_by_side: "Side by side", layout_wine: "Szklane drzwi (ch\u0142odziarka do wina)",
    section_fridge_temperature: "Temperatura ch\u0142odziarki", section_freezer_temperature: "Temperatura zamra\u017carki",
    section_freezer_door: "Czujnik drzwi zamra\u017carki", section_ice_maker: "Kostkarka",
    fridge_max_temperature: "Ostrzegaj powy\u017cej tej temperatury", section_kettle_temperature: "Temperatura wody",
    ice_on: "Pracuje", ice_off: "Wy\u0142\u0105czona", doors_closed: "Drzwi zamkni\u0119te",
    fridge_door_open: "Ch\u0142odziarka otwarta", freezer_door_open: "Zamra\u017carka otwarta",
    type_cooker: "Robot kuchenny", type_coffee: "Ekspres do kawy",
    water_empty: "Pusty zbiornik na wod\u0119", beans_empty: "Pusty pojemnik na ziarna",
    tray_full: "Pe\u0142na tacka ociekowa", descale: "Wymagane odkamienianie",
    speed: "Pr\u0119dko\u015b\u0107", section_speed: "Pr\u0119dko\u015b\u0107 no\u017ca",
    section_water: "Zbiornik na wod\u0119", section_beans: "Pojemnik na ziarna",
    section_tray: "Tacka ociekowa", section_descaling: "Odkamienianie",
    cups: "Fili\u017canki", strength: "Moc",
    section_cups: "Liczba fili\u017canek", section_strength: "Moc kawy",
    type_rice_cooker: "Ry\u017cowar", keep_warm: "Podtrzymywanie ciep\u0142a",
    language: "J\u0119zyk", language_auto: "Zgodnie z Home Assistant",
    illustration_color: "Kolor urz\u0105dzenia", color_auto: "Zgodnie z motywem",
    color_white: "Bia\u0142y", color_grey: "Szary", color_black: "Czarny",
    type_water_heater: "Podgrzewacz wody", type_boiler: "Kocio\u0142", type_heat_pump: "Pompa ciep\u0142a",
    boiler_space_heating: "Ogrzewanie", boiler_hot_water: "Ciep\u0142a woda", boiler_burner: "Palnik w\u0142\u0105czony", boiler_starting: "Zap\u0142on", boiler_waiting: "Oczekiwanie", hp_cooling: "Ch\u0142odzenie", hp_defrost: "Odszranianie",
    section_space_heating: "Wska\u017anik ogrzewania", section_hot_water: "Wska\u017anik ciep\u0142ej wody", section_flow_temperature: "Temperatura zasilania", section_heat_output: "Moc grzewcza", section_cop: "Wsp\u00f3\u0142czynnik efektywno\u015bci (COP)", section_outdoor_temperature: "Temperatura zewn\u0119trzna",
    section_cooling: "Wska\u017anik ch\u0142odzenia", section_cooling_power: "Moc przy ch\u0142odzeniu", section_cooling_output: "Moc ch\u0142odnicza", section_hot_water_power: "Moc na ciep\u0142\u0105 wod\u0119", section_hot_water_output: "Moc grzewcza na ciep\u0142\u0105 wod\u0119",
    section_return_temperature: "Temperatura powrotu", section_water_flow: "Przep\u0142yw wody", section_compressor: "Spr\u0119\u017carka", hp_delta: "Delta", section_fan_speed: "Pr\u0119dko\u015b\u0107 wentylatora",
    hp_flow_return: "Zasilanie i powr\u00f3t", no_hot_water: "Bez zasobnika CWU", underfloor_heating: "Ogrzewanie pod\u0142ogowe zamiast grzejnik\u00f3w",
    type_printer_3d: "Drukarka 3D", section_nozzle_temperature: "Temperatura dyszy", section_nozzle_target: "Temperatura docelowa dyszy",
    section_bed_temperature: "Temperatura sto\u0142u", section_bed_target: "Temperatura docelowa sto\u0142u", section_chamber_temperature: "Temperatura komory",
    section_current_layer: "Bie\u017c\u0105ca warstwa", section_total_layers: "Liczba warstw", section_print_file: "Plik wydruku",
    section_print_stage: "Etap drukowania", section_printer_layout: "Konstrukcja", layout_enclosed: "Zamkni\u0119ta",
    layout_open: "Otwarta rama (ruchomy st\u00f3\u0142)", unit_hours: "Godziny", p3_nozzle: "Dysza",
    p3_bed: "St\u00f3\u0142", p3_chamber: "Komora", p3_layer: "Warstwa",
    p3_file: "Plik", p3_printing: "Drukowanie", p3_preparing: "Przygotowanie",
    p3_cancelled: "Anulowano", p3_failed: "Nieudany", p3_offline: "Offline",
    p3_attention: "Wymaga uwagi", p3_leveling: "Poziomowanie sto\u0142u", p3_filament: "Zmiana filamentu",
    p3_cooling: "Ch\u0142odzenie", p3_calibrating: "Kalibracja", p3_homing: "Bazowanie",
    section_printed_part: "Drukowany obiekt", part_cube: "Sze\u015bcian", part_pyramid: "Piramida", part_duck: "Gumowa kaczuszka",
    type_pet_feeder: "Karmnik automatyczny", feeder_ready: "Gotowy", feeder_feeding: "Wydawanie", section_portions_today: "Porcje dzisiaj", section_weight_today: "Waga dzisiaj", section_portion_weight: "Waga porcji", section_serving_size: "Wielko\u015b\u0107 porcji", section_feeder_schedule: "Harmonogram", section_last_feed: "Ostatnie karmienie", section_error: "Wska\u017anik b\u0142\u0119du", start_option: "Opcja do wybrania", start_value: "Warto\u015b\u0107 do zapisania", portions: "porcji",
    feeder_empty: "Pusty zasobnik", feeder_level: "Zasobnik nape\u0142niony w {pct}", section_level: "Poziom karmy", level_empty_below: "Pusty przy tej warto\u015bci lub ni\u017cej", level_max: "Pojemno\u015b\u0107 zasobnika",
    section_feeder_layout: "Model", layout_tower: "Wie\u017ca, wbudowana miska", layout_canister: "Okr\u0105g\u0142y zasobnik, osobna miska",
    type_iron: "\u017belazko", section_iron_layout: "Model", layout_iron: "\u017belazko", layout_generator: "Generator pary",
    iron_heating: "Grzeje", iron_off: "Wy\u0142\u0105czony", left_on: "Pozosta\u0142o w\u0142\u0105czone", left_on_after: "Ostrze\u017c po (minutach w\u0142\u0105czenia)",
    washer_dryer: "Pralko-suszarka (pierze i suszy)", step_drying: "Suszenie", section_cycle_phase: "Faza programu",
    step_prewash: "Pranie wst\u0119pne", step_soaking: "Namaczanie", step_weighing: "Wa\u017cenie", step_filling: "Nape\u0142nianie", step_washing: "Pranie", step_rinsing: "P\u0142ukanie", step_draining: "Odpompowanie", step_spinning: "Wirowanie", step_cooling: "Sch\u0142adzanie", step_anti_crease: "Przeciw zagnieceniom", step_steam: "Para",
  },
  zh: {
    idle: "\u7a7a\u95f2", running: "\u8fd0\u884c\u4e2d", paused: "\u6682\u505c", done: "\u5b8c\u6210",
    delayed: "\u5ef6\u8fdf\u542f\u52a8", error: "\u9519\u8bef", unknown: "\u672a\u77e5",
    program: "\u7a0b\u5e8f", remaining: "\u5269\u4f59\u65f6\u95f4", ready_at: "\u9884\u8ba1\u5b8c\u6210", time_done: "\u5b8c\u6210",
    door_open: "\u95e8\u5df2\u5f00", door_closed: "\u95e8\u5df2\u5173", alerts: "\u8b66\u62a5",
    alerts_n_one: "{n} \u6761\u8b66\u62a5", alerts_n_few: "{n} \u6761\u8b66\u62a5", alerts_n_many: "{n} \u6761\u8b66\u62a5", alerts_n_other: "{n} \u6761\u8b66\u62a5",
    connected: "\u5df2\u8fde\u63a5", disconnected: "\u5df2\u65ad\u5f00",
    start: "\u5f00\u59cb", pause: "\u6682\u505c", resume: "\u7ee7\u7eed", stop: "\u505c\u6b62",
    name: "\u540d\u79f0", icon: "\u56fe\u6807", entity: "\u5b9e\u4f53",
    main_settings: "\u4e3b\u5b9e\u4f53", display_settings: "\u663e\u793a",
    action_settings: "\u63a7\u5236\u9879",
    group_general: "\u57fa\u7840\u8bbe\u7f6e",
    compact: "\u7cbe\u7b80\u6a21\u5f0f (\u9690\u85cf\u56fe\u6807)",
    state_show_raw: "\u663e\u793a\u5b9e\u4f53\u539f\u59cb\u72b6\u6001\u4fe1\u606f\u800c\u4e0d\u662f\u8f6c\u4e49\u540e\u6587\u672c",
    appliance_type: "\u8bbe\u5907\u7c7b\u578b",
    type_auto: "\u81ea\u52a8\u68c0\u6d4b", type_washer: "\u6d17\u8863\u673a", type_dryer: "\u5e72\u8863\u673a", type_dishwasher: "\u6d17\u7897\u673a",
    state_entity: "\u72b6\u6001\u5b9e\u4f53 (\u5fc5\u987b)",
    program_entity: "\u7a0b\u5e8f\u5b9e\u4f53",
    program_format: "\u7a0b\u5e8f\u540d\u79f0\u683c\u5f0f",
    program_format_raw: "\u539f\u59cb", program_format_clean: "\u6e05\u7406",
    remaining_time_entity: "\u5269\u4f59\u65f6\u95f4\u5b9e\u4f53",
    remaining_time_unit: "\u5269\u4f59\u65f6\u95f4\u5355\u4f4d",
    remaining_time_hide_when_idle: "\u672a\u8fd0\u884c\u65f6\u9690\u85cf\u65f6\u95f4\u663e\u793a",
    remaining_time_split: "\u5728\u5355\u72ec\u4e00\u884c\u663e\u793a\u7ed3\u675f\u65f6\u95f4",
    unit_auto: "\u81ea\u52a8\u68c0\u6d4b", unit_seconds: "\u79d2", unit_minutes: "\u5206",
    progress_entity: "\u8fdb\u5ea6\u767e\u5206\u6bd4\u5b9e\u4f53 (\u53ef\u9009 \u8986\u5199)",
    door_entity: "\u95e8\u4f20\u611f\u5668\u5b9e\u4f53",
    door_open_state: "\"\u5f00\u95e8\"\u72b6\u6001\u503c",
    door_invert: "\u53d6\u53cd (\u95e8\u72b6\u6001\u8868\u793a\u5173\u95e8\u72b6\u6001)",
    door_hide_in_list: "\u4e0d\u5728\u4fe1\u606f\u5217\u4e2d\u663e\u793a",
    alerts_entity: "\u8b66\u62a5\u5b9e\u4f53 (\u5c5e\u6027\u503c\u65b9\u5f0f)",
    info_entities: "\u989d\u5916\u4fe1\u606f\u5b9e\u4f53 (\u9017\u53f7\u5206\u9694\u5b9e\u4f53ID)",
    connectivity_entity: "\u8fde\u7f51\u72b6\u6001\u5b9e\u4f53",
    connectivity_connected_state: "\"\u5df2\u8fde\u63a5\"\u72b6\u6001\u503c",
    start_entity: "\u5f00\u59cb\u6309\u952e\u5b9e\u4f53",
    pause_entity: "\u6682\u505c\u6309\u952e\u5b9e\u4f53",
    resume_entity: "\u7ee7\u7eed\u6309\u952e\u5b9e\u4f53",
    stop_entity: "\u505c\u6b62/\u590d\u4f4d\u6309\u952e\u5b9e\u4f53",
    section_program: "\u7a0b\u5e8f", section_remaining: "\u5269\u4f59\u65f6\u95f4",
    section_ready_at: "\u9884\u8ba1\u5b8c\u6210",
    section_progress: "\u8fdb\u5ea6\u767e\u5206\u6bd4\u5b9e\u4f53 (\u8986\u5199)", section_door: "\u95e8\u4f20\u611f\u5668",
    section_alerts: "\u8b66\u62a5", section_connectivity: "\u8fde\u7f51\u72b6\u6001",
    section_info: "\u989d\u5916\u4fe1\u606f\u5b9e\u4f53", section_lines_order: "\u4fe1\u606f\u884c\u987a\u5e8f",
    info_count: "\u5b9e\u4f53\u6570\u91cf",
    section_alert_list: "\u8b66\u62a5\u5b9e\u4f53", alerts_add: "\u6dfb\u52a0\u8b66\u62a5\u2026", list_other: "\u5176\u4ed6\u5b9e\u4f53\u2026", list_remove: "\u79fb\u9664",
    section_corner_list: "\u89d2\u843d\u5f00\u5173", corners_add: "\u6dfb\u52a0\u5f00\u5173\u2026",
    info_label: "\u663e\u793a\u540d\u79f0 (\u53ef\u9009)",
    info_value_map: "\u503c\u6620\u5c04 (\u53ef\u9009)",
    info_value_map_placeholder: "\u6bcf\u4e2a\u503c\u4e00\u884c, \u4f8b\u5982\n0: \u5f85\u673a\n1: \u6d17\u6da4\u4e2d",
    info_hide_unit: "\u9690\u85cf\u5355\u4f4d",
    state_map_placeholder: "\u6bcf\u4e2a\u503c\u4e00\u884c, \u4f8b\u5982\nReady: idle\nAborting: running\n*: running",
    info_drag: "\u62d6\u62fd\u6392\u5e8f",
    section_start: "\u5f00\u59cb\u6309\u952e", section_pause: "\u6682\u505c\u6309\u952e",
    section_resume: "\u7ee7\u7eed\u6309\u952e", section_stop: "\u505c\u6b62/\u91cd\u7f6e\u6309\u952e",
    picker_icon: "\u56fe\u6807 (\u53ef\u9009)",
    type_oven: "\u70e4\u7bb1", type_microwave: "\u5fae\u6ce2\u7089",
    type_hood: "\u6cb9\u70df\u673a", type_cooktop: "\u7089\u53f0",
    preheating: "\u9884\u52a0\u70ed", standby: "\u5f85\u673a",
    temperature: "\u6e29\u5ea6", fan_speed: "\u98ce\u6247\u901f\u5ea6",
    filter: "\u8fc7\u6ee4\u5668", power: "\u529f\u7387",
    power_level: "\u52a0\u70ed\u6863\u4f4d", child_lock: "\u7ae5\u9501",
    residual_heat: "\u4f59\u70ed", boost: "\u5f3a\u529b",
    light: "\u7167\u660e", filter_reset: "\u91cd\u7f6e\u8fc7\u6ee4\u5668",
    zone: "\u533a\u57df", zones_active: "\u6fc0\u6d3b\u533a\u57df",
    section_target_temperature: "\u76ee\u6807\u6e29\u5ea6", section_current_temperature: "\u5f53\u524d\u6e29\u5ea6",
    section_light: "\u706f", section_heating: "\u52a0\u70ed\u6307\u793a\u706f",
    section_power_level: "\u52a0\u70ed\u6863\u4f4d", section_fan: "\u98ce\u6247",
    section_filter_life: "\u6ee4\u82af\u5bff\u547d", section_filter_reset: "\u91cd\u7f6e\u6ee4\u82af\u6309\u952e",
    section_boost: "\u5f3a\u529b\u6a21\u5f0f", section_child_lock: "\u7ae5\u9501",
    section_power: "\u80fd\u91cf\u6d88\u8017", section_zones: "\u52a0\u70ed\u533a\u57df",
    target_temperature_entity: "\u76ee\u6807\u6e29\u5ea6\u5b9e\u4f53", current_temperature_entity: "\u5f53\u524d\u6e29\u5ea6\u5b9e\u4f53",
    light_entity: "\u706f\u5b9e\u4f53", heating_entity: "\u52a0\u70ed\u5b9e\u4f53 (\u53ef\u9009)",
    power_level_entity: "\u52a0\u70ed\u6863\u4f4d\u5b9e\u4f53", fan_entity: "\u98ce\u6247\u5b9e\u4f53",
    filter_life_entity: "\u6ee4\u82af\u5bff\u547d\u767e\u5206\u6bd4\u5b9e\u4f53", filter_reset_entity: "\u91cd\u7f6e\u6ee4\u82af\u6309\u952e\u5b9e\u4f53",
    boost_entity: "\u5f3a\u529b\u6a21\u5f0f\u5b9e\u4f53", child_lock_entity: "\u7ae5\u9501\u5b9e\u4f53",
    power_entity: "\u80fd\u91cf (W) \u5b9e\u4f53", power_on_threshold: "\u5728\u6b64\u529f\u7387 (W) \u4ee5\u4e0a\u8fd0\u884c",
    zones_count: "\u52a0\u70ed\u533a\u57df\u6570\u91cf", zone_level_entity: "\u52a0\u70ed\u533a\u57df\u5b9e\u4f53",
    section_toggle: "\u7535\u6e90\u5f00\u5173", toggle: "\u7535\u6e90",
    off_short: "\u5173", toggle_entity: "\u7535\u6e90\u5f00\u5173\u5b9e\u4f53",
    zone_residual_entity: "\u4f59\u70ed\u5b9e\u4f53", zone_name: "\u533a\u57df\u540d\u79f0 (\u53ef\u9009)",
    type_fridge: "\u51b0\u7bb1", type_kettle: "\u70e7\u6c34\u58f6",
    fridge_ok: "\u6b63\u5e38", temp_high: "\u6e29\u5ea6\u8fc7\u9ad8",
    unplugged: "\u5df2\u65ad\u7535", no_power: "\u65e0\u8017\u7535", section_plug: "\u63d2\u5ea7\u5f00\u5173", no_power_after: "\u65e0\u8017\u7535\u591a\u5c11\u5206\u949f\u540e\u63d0\u9192", temperature_decimals: "\u6e29\u5ea6\u7cbe\u5ea6", precision_auto: "\u8ddf\u968f\u5b9e\u4f53", precision_0: "\u6574\u6570\u5ea6", precision_1: "\u4e00\u4f4d\u5c0f\u6570", kettle_heating: "\u52a0\u70ed\u4e2d",
    kettle_off: "\u5df2\u5173\u95ed", fridge_compartment: "\u51b7\u85cf\u5ba4",
    freezer_compartment: "\u51b7\u51bb\u5ba4", ice_maker: "\u5236\u51b0\u673a",
    since: "\u5df2\u6301\u7eed", section_fridge_layout: "\u7ed3\u6784",
    layout_single: "\u5355\u95e8", layout_freezer_bottom: "\u4e0b\u7f6e\u51b7\u51bb\u5ba4",
    layout_freezer_top: "\u4e0a\u7f6e\u51b7\u51bb\u5ba4", layout_side_by_side: "\u5bf9\u5f00\u95e8", layout_wine: "\u73bb\u7483\u95e8\uff08\u9152\u67dc\uff09",
    section_fridge_temperature: "\u51b7\u85cf\u5ba4\u6e29\u5ea6", section_freezer_temperature: "\u51b7\u51bb\u5ba4\u6e29\u5ea6",
    section_freezer_door: "\u51b7\u51bb\u5ba4\u95e8\u4f20\u611f\u5668", section_ice_maker: "\u5236\u51b0\u673a",
    fridge_max_temperature: "\u9ad8\u4e8e\u6b64\u6e29\u5ea6\u65f6\u63d0\u9192", section_kettle_temperature: "\u6c34\u6e29",
    ice_on: "\u8fd0\u884c\u4e2d", ice_off: "\u5df2\u5173\u95ed", doors_closed: "\u95e8\u5df2\u5173\u95ed",
    fridge_door_open: "\u51b7\u85cf\u5ba4\u95e8\u5df2\u6253\u5f00", freezer_door_open: "\u51b7\u51bb\u5ba4\u95e8\u5df2\u6253\u5f00",
    type_cooker: "\u6599\u7406\u673a", type_coffee: "\u5496\u5561\u673a",
    water_empty: "\u6c34\u7bb1\u5df2\u7a7a", beans_empty: "\u8c46\u4ed3\u5df2\u7a7a",
    tray_full: "\u63a5\u6c34\u76d8\u5df2\u6ee1", descale: "\u9700\u8981\u9664\u57a2",
    speed: "\u901f\u5ea6", section_speed: "\u6405\u62cc\u901f\u5ea6",
    section_water: "\u6c34\u7bb1", section_beans: "\u8c46\u4ed3",
    section_tray: "\u63a5\u6c34\u76d8", section_descaling: "\u9664\u57a2",
    cups: "\u676f\u6570", strength: "\u6d53\u5ea6",
    section_cups: "\u676f\u6570", section_strength: "\u5496\u5561\u6d53\u5ea6",
    type_rice_cooker: "\u7535\u996d\u7172", keep_warm: "\u4fdd\u6e29\u4e2d",
    language: "\u8bed\u8a00", language_auto: "\u8ddf\u968f Home Assistant",
    illustration_color: "\u8bbe\u5907\u989c\u8272", color_auto: "\u8ddf\u968f\u4e3b\u9898",
    color_white: "\u767d\u8272", color_grey: "\u7070\u8272", color_black: "\u9ed1\u8272",
    type_water_heater: "\u70ed\u6c34\u5668", type_boiler: "\u9505\u7089", type_heat_pump: "\u70ed\u6cf5",
    boiler_space_heating: "\u4f9b\u6696", boiler_hot_water: "\u70ed\u6c34", boiler_burner: "\u71c3\u70e7\u5668\u5df2\u70b9\u706b", boiler_starting: "\u70b9\u706b\u4e2d", boiler_waiting: "\u7b49\u5f85\u4e2d", hp_cooling: "\u5236\u51b7", hp_defrost: "\u9664\u971c",
    section_space_heating: "\u4f9b\u6696\u6307\u793a", section_hot_water: "\u70ed\u6c34\u6307\u793a", section_flow_temperature: "\u4f9b\u6c34\u6e29\u5ea6", section_heat_output: "\u5236\u70ed\u91cf", section_cop: "\u80fd\u6548\u6bd4 (COP)", section_outdoor_temperature: "\u5ba4\u5916\u6e29\u5ea6",
    section_cooling: "\u5236\u51b7\u6307\u793a", section_cooling_power: "\u5236\u51b7\u529f\u7387", section_cooling_output: "\u5236\u51b7\u91cf", section_hot_water_power: "\u70ed\u6c34\u529f\u7387", section_hot_water_output: "\u70ed\u6c34\u5236\u70ed\u91cf",
    section_return_temperature: "\u56de\u6c34\u6e29\u5ea6", section_water_flow: "\u6c34\u6d41\u91cf", section_compressor: "\u538b\u7f29\u673a", hp_delta: "\u6e29\u5dee", section_fan_speed: "\u98ce\u673a\u8f6c\u901f",
    hp_flow_return: "\u4f9b\u6c34\u4e0e\u56de\u6c34", no_hot_water: "\u65e0\u70ed\u6c34\u6c34\u7bb1", underfloor_heating: "\u5730\u6696\u4ee3\u66ff\u6563\u70ed\u5668",
    type_printer_3d: "3D \u6253\u5370\u673a", section_nozzle_temperature: "\u55b7\u5634\u6e29\u5ea6", section_nozzle_target: "\u55b7\u5634\u76ee\u6807\u6e29\u5ea6",
    section_bed_temperature: "\u70ed\u5e8a\u6e29\u5ea6", section_bed_target: "\u70ed\u5e8a\u76ee\u6807\u6e29\u5ea6", section_chamber_temperature: "\u8154\u4f53\u6e29\u5ea6",
    section_current_layer: "\u5f53\u524d\u5c42", section_total_layers: "\u603b\u5c42\u6570", section_print_file: "\u6253\u5370\u6587\u4ef6",
    section_print_stage: "\u6253\u5370\u9636\u6bb5", section_printer_layout: "\u673a\u8eab", layout_enclosed: "\u5c01\u95ed\u5f0f",
    layout_open: "\u5f00\u653e\u5f0f\uff08\u79fb\u52a8\u70ed\u5e8a\uff09", unit_hours: "\u5c0f\u65f6", p3_nozzle: "\u55b7\u5634",
    p3_bed: "\u70ed\u5e8a", p3_chamber: "\u8154\u4f53", p3_layer: "\u5c42",
    p3_file: "\u6587\u4ef6", p3_printing: "\u6253\u5370\u4e2d", p3_preparing: "\u51c6\u5907\u4e2d",
    p3_cancelled: "\u5df2\u53d6\u6d88", p3_failed: "\u5931\u8d25", p3_offline: "\u79bb\u7ebf",
    p3_attention: "\u9700\u8981\u5904\u7406", p3_leveling: "\u8c03\u5e73\u4e2d", p3_filament: "\u66f4\u6362\u8017\u6750",
    p3_cooling: "\u51b7\u5374\u4e2d", p3_calibrating: "\u6821\u51c6\u4e2d", p3_homing: "\u5f52\u4f4d\u4e2d",
    section_printed_part: "\u6253\u5370\u6a21\u578b", part_cube: "\u7acb\u65b9\u4f53", part_pyramid: "\u91d1\u5b57\u5854", part_duck: "\u6a61\u76ae\u9e2d",
    type_pet_feeder: "\u81ea\u52a8\u5582\u98df\u5668", feeder_ready: "\u5c31\u7eea", feeder_feeding: "\u6295\u5582\u4e2d", section_portions_today: "\u4eca\u65e5\u4efd\u6570", section_weight_today: "\u4eca\u65e5\u91cd\u91cf", section_portion_weight: "\u6bcf\u4efd\u91cd\u91cf", section_serving_size: "\u6bcf\u6b21\u4efd\u91cf", section_feeder_schedule: "\u8ba1\u5212", section_last_feed: "\u4e0a\u6b21\u6295\u5582", section_error: "\u6545\u969c\u6307\u793a", start_option: "\u8981\u9009\u62e9\u7684\u9009\u9879", start_value: "\u8981\u5199\u5165\u7684\u503c", portions: "\u4efd",
    feeder_empty: "\u6599\u6876\u5df2\u7a7a", feeder_level: "\u6599\u6876\u4f59\u91cf {pct}", section_level: "\u4f59\u91cf", level_empty_below: "\u4f4e\u4e8e\u6216\u7b49\u4e8e\u6b64\u503c\u89c6\u4e3a\u7a7a", level_max: "\u6599\u6876\u5bb9\u91cf",
    section_feeder_layout: "\u578b\u53f7", layout_tower: "\u5854\u5f0f\uff0c\u4e00\u4f53\u5f0f\u98df\u76c6", layout_canister: "\u5706\u5f62\u6599\u6876\uff0c\u72ec\u7acb\u98df\u76c6",
    type_iron: "\u71a8\u6597", section_iron_layout: "\u578b\u53f7", layout_iron: "\u71a8\u6597", layout_generator: "\u84b8\u6c7d\u53d1\u751f\u5668",
    iron_heating: "\u52a0\u70ed\u4e2d", iron_off: "\u5df2\u5173\u95ed", left_on: "\u4ecd\u7136\u5f00\u7740", left_on_after: "\u5f00\u542f\u591a\u5c11\u5206\u949f\u540e\u63d0\u9192",
    washer_dryer: "\u6d17\u70d8\u4e00\u4f53\u673a\uff08\u6d17\u6da4\u5e76\u70d8\u5e72\uff09", step_drying: "\u70d8\u5e72\u4e2d", section_cycle_phase: "\u7a0b\u5e8f\u9636\u6bb5",
    step_prewash: "\u9884\u6d17\u4e2d", step_soaking: "\u6d78\u6ce1\u4e2d", step_weighing: "\u79f0\u91cd\u4e2d", step_filling: "\u8fdb\u6c34\u4e2d", step_washing: "\u6d17\u6da4\u4e2d", step_rinsing: "\u6f02\u6d17\u4e2d", step_draining: "\u6392\u6c34\u4e2d", step_spinning: "\u8131\u6c34\u4e2d", step_cooling: "\u51b7\u5374\u4e2d", step_anti_crease: "\u9632\u76b1\u4e2d", step_steam: "\u84b8\u6c7d\u4e2d",
  },
  cs: {
    idle: "Ne\u010dinn\u00e9", running: "V provozu", paused: "Pozastaveno", done: "Dokon\u010deno",
    delayed: "Odlo\u017een\u00fd start", error: "Chyba", unknown: "Nezn\u00e1m\u00fd stav",
    program: "Program", remaining: "zb\u00fdv\u00e1", ready_at: "hotovo v", time_done: "Hotovo",
    door_open: "Dv\u00ed\u0159ka otev\u0159en\u00e1", door_closed: "Dv\u00ed\u0159ka zav\u0159en\u00e1", alerts: "Upozorn\u011bn\u00ed",
    alerts_n_one: "{n} upozorn\u011bn\u00ed", alerts_n_few: "{n} upozorn\u011bn\u00ed", alerts_n_many: "{n} upozorn\u011bn\u00ed", alerts_n_other: "{n} upozorn\u011bn\u00ed",
    connected: "P\u0159ipojeno", disconnected: "Odpojeno",
    start: "Spustit", pause: "Pozastavit", resume: "Pokra\u010dovat", stop: "Zastavit",
    name: "N\u00e1zev", icon: "Ikona", entity: "Entita",
    main_settings: "Hlavn\u00ed entity", display_settings: "Zobrazen\u00ed",
    action_settings: "Ovl\u00e1d\u00e1n\u00ed",
    group_general: "Obecn\u00e1 nastaven\u00ed",
    compact: "Kompaktn\u00ed re\u017eim (skr\u00fdt obr\u00e1zek)",
    state_show_raw: "V\u017edy zobrazit p\u016fvodn\u00ed text entity m\u00edsto p\u0159elo\u017een\u00e9ho popisku",
    appliance_type: "Typ spot\u0159ebi\u010de",
    type_auto: "Automaticky rozpoznat", type_washer: "Pra\u010dka", type_dryer: "Su\u0161i\u010dka", type_dishwasher: "My\u010dka n\u00e1dob\u00ed",
    state_entity: "Entita stavu (povinn\u00e1)",
    program_entity: "Entita programu",
    program_format: "Form\u00e1t n\u00e1zvu programu",
    program_format_raw: "P\u016fvodn\u00ed", program_format_clean: "Upraven\u00fd",
    remaining_time_entity: "Entita zb\u00fdvaj\u00edc\u00edho \u010dasu",
    remaining_time_unit: "Jednotka zb\u00fdvaj\u00edc\u00edho \u010dasu",
    remaining_time_hide_when_idle: "Skr\u00fdt zb\u00fdvaj\u00edc\u00ed \u010das, pokud spot\u0159ebi\u010d nen\u00ed v provozu",
    remaining_time_split: "Zobrazit \u010das dokon\u010den\u00ed na samostatn\u00e9m \u0159\u00e1dku",
    unit_auto: "Automaticky rozpoznat", unit_seconds: "Sekundy", unit_minutes: "Minuty",
    progress_entity: "Entita pr\u016fb\u011bhu v % (voliteln\u00e9 nahrazen\u00ed odhadu)",
    door_entity: "Entita sn\u00edma\u010de dv\u00ed\u0159ek",
    door_open_state: "Hodnota stavu \"otev\u0159eno\"",
    door_invert: "Obr\u00e1tit (stav znamen\u00e1 zav\u0159eno, nikoli otev\u0159eno)",
    door_hide_in_list: "Nezobrazovat v seznamu informac\u00ed",
    alerts_entity: "Entita upozorn\u011bn\u00ed (stav v atributech)",
    info_entities: "Dal\u0161\u00ed informa\u010dn\u00ed entity (ID entit odd\u011blen\u00e1 \u010d\u00e1rkou)",
    connectivity_entity: "Entita p\u0159ipojen\u00ed",
    connectivity_connected_state: "Hodnota stavu \"p\u0159ipojeno\"",
    start_entity: "Entita tla\u010d\u00edtka Spustit",
    pause_entity: "Entita tla\u010d\u00edtka Pozastavit",
    resume_entity: "Entita tla\u010d\u00edtka Pokra\u010dovat",
    stop_entity: "Entita tla\u010d\u00edtka Zastavit / resetovat",
    section_program: "Program", section_remaining: "Zb\u00fdvaj\u00edc\u00ed \u010das",
    section_ready_at: "Hotovo v",
    section_progress: "Pr\u016fb\u011bh v % (nahrazuje odhad)", section_door: "Sn\u00edma\u010d dv\u00ed\u0159ek",
    section_alerts: "Upozorn\u011bn\u00ed", section_connectivity: "P\u0159ipojen\u00ed",
    section_info: "Dal\u0161\u00ed informa\u010dn\u00ed entity", section_lines_order: "Po\u0159ad\u00ed \u0159\u00e1dk\u016f",
    info_count: "Po\u010det dal\u0161\u00edch entit",
    section_alert_list: "Entity upozorn\u011bn\u00ed", alerts_add: "P\u0159idat upozorn\u011bn\u00ed\u2026", list_other: "Jin\u00e1 entita\u2026", list_remove: "Odebrat",
    section_corner_list: "P\u0159ep\u00edna\u010de v roz\u00edch", corners_add: "P\u0159idat p\u0159ep\u00edna\u010d\u2026",
    info_label: "Zobrazovan\u00fd n\u00e1zev (voliteln\u00e9)",
    info_value_map: "Mapov\u00e1n\u00ed hodnot (voliteln\u00e9)",
    info_value_map_placeholder: "Jedna hodnota na \u0159\u00e1dek, nap\u0159.\n0: P\u0159ipraveno\n1: Pran\u00ed",
    info_hide_unit: "Skr\u00fdt jednotku",
    state_map_placeholder: "Jedna hodnota na \u0159\u00e1dek, nap\u0159.\nReady: idle\nAborting: running\n*: running",
    info_drag: "P\u0159eta\u017een\u00edm zm\u011b\u0148te po\u0159ad\u00ed",
    section_start: "Tla\u010d\u00edtko Spustit", section_pause: "Tla\u010d\u00edtko Pozastavit",
    section_resume: "Tla\u010d\u00edtko Pokra\u010dovat", section_stop: "Tla\u010d\u00edtko Zastavit / resetovat",
    picker_icon: "Ikona (voliteln\u00e9)",
    type_oven: "Trouba", type_microwave: "Mikrovlnn\u00e1 trouba",
    type_hood: "Digesto\u0159", type_cooktop: "Varn\u00e1 deska",
    preheating: "P\u0159edeh\u0159\u00edv\u00e1n\u00ed", standby: "Pohotovostn\u00ed re\u017eim",
    temperature: "Teplota", fan_speed: "Rychlost ventil\u00e1toru",
    filter: "Filtr", power: "P\u0159\u00edkon",
    power_level: "Stupe\u0148 v\u00fdkonu", child_lock: "D\u011btsk\u00e1 pojistka",
    residual_heat: "Zbytkov\u00e9 teplo", boost: "Zv\u00fd\u0161en\u00fd v\u00fdkon",
    light: "Osv\u011btlen\u00ed", filter_reset: "Resetovat filtr",
    zone: "Varn\u00e1 z\u00f3na", zones_active: "aktivn\u00ed varn\u00e9 z\u00f3ny",
    section_target_temperature: "C\u00edlov\u00e1 teplota", section_current_temperature: "Aktu\u00e1ln\u00ed teplota",
    section_light: "Osv\u011btlen\u00ed", section_heating: "Indik\u00e1tor oh\u0159evu",
    section_power_level: "Stupe\u0148 v\u00fdkonu", section_fan: "Ventil\u00e1tor",
    section_filter_life: "\u017divotnost filtru", section_filter_reset: "Tla\u010d\u00edtko resetov\u00e1n\u00ed filtru",
    section_boost: "Re\u017eim zv\u00fd\u0161en\u00e9ho v\u00fdkonu", section_child_lock: "D\u011btsk\u00e1 pojistka",
    section_power: "P\u0159\u00edkon", section_zones: "Varn\u00e9 z\u00f3ny",
    target_temperature_entity: "Entita c\u00edlov\u00e9 teploty", current_temperature_entity: "Entita aktu\u00e1ln\u00ed teploty",
    light_entity: "Entita osv\u011btlen\u00ed", heating_entity: "Entita oh\u0159evu (voliteln\u00e9)",
    power_level_entity: "Entita stupn\u011b v\u00fdkonu", fan_entity: "Entita ventil\u00e1toru",
    filter_life_entity: "Entita \u017eivotnosti filtru v %", filter_reset_entity: "Entita tla\u010d\u00edtka resetov\u00e1n\u00ed filtru",
    boost_entity: "Entita zv\u00fd\u0161en\u00e9ho v\u00fdkonu", child_lock_entity: "Entita d\u011btsk\u00e9 pojistky",
    power_entity: "Entita p\u0159\u00edkonu (W)", power_on_threshold: "V provozu nad t\u00edmto p\u0159\u00edkonem (W)",
    zones_count: "Po\u010det varn\u00fdch z\u00f3n", zone_level_entity: "Entita stupn\u011b v\u00fdkonu",
    section_toggle: "Vyp\u00edna\u010d", toggle: "Nap\u00e1jen\u00ed",
    off_short: "Vypnuto", toggle_entity: "Entita vyp\u00edna\u010de",
    zone_residual_entity: "Entita zbytkov\u00e9ho tepla", zone_name: "N\u00e1zev varn\u00e9 z\u00f3ny (voliteln\u00e9)",
    type_fridge: "Lednice", type_kettle: "Rychlovarn\u00e1 konvice",
    fridge_ok: "V po\u0159\u00e1dku", temp_high: "Vysok\u00e1 teplota",
    unplugged: "Odpojeno od nap\u00e1jen\u00ed", no_power: "\u017d\u00e1dn\u00e1 spot\u0159eba", section_plug: "Vyp\u00edna\u010d z\u00e1suvky", no_power_after: "Upozornit po (minut\u00e1ch bez spot\u0159eby)", temperature_decimals: "P\u0159esnost teploty", precision_auto: "Jako entita", precision_0: "Na cel\u00e9 stupn\u011b", precision_1: "Na desetiny", kettle_heating: "Oh\u0159\u00edv\u00e1n\u00ed",
    kettle_off: "Vypnuto", fridge_compartment: "Chladni\u010dka",
    freezer_compartment: "Mrazni\u010dka", ice_maker: "V\u00fdrobn\u00edk ledu",
    since: "po dobu", section_fridge_layout: "Uspo\u0159\u00e1d\u00e1n\u00ed",
    layout_single: "Jedny dve\u0159e", layout_freezer_bottom: "Mrazni\u010dka dole",
    layout_freezer_top: "Mrazni\u010dka naho\u0159e", layout_side_by_side: "Vedle sebe", layout_wine: "Sklen\u011bn\u00e9 dve\u0159e (vinot\u00e9ka)",
    section_fridge_temperature: "Teplota chladni\u010dky", section_freezer_temperature: "Teplota mrazni\u010dky",
    section_freezer_door: "Sn\u00edma\u010d dve\u0159\u00ed mrazni\u010dky", section_ice_maker: "V\u00fdrobn\u00edk ledu",
    fridge_max_temperature: "Upozornit nad touto teplotou", section_kettle_temperature: "Teplota vody",
    ice_on: "V provozu", ice_off: "Vypnuto", doors_closed: "Dve\u0159e zav\u0159en\u00e9",
    fridge_door_open: "Dve\u0159e chladni\u010dky otev\u0159en\u00e9", freezer_door_open: "Dve\u0159e mrazni\u010dky otev\u0159en\u00e9",
    type_cooker: "Kuchy\u0148sk\u00fd robot", type_coffee: "K\u00e1vovar",
    water_empty: "Pr\u00e1zdn\u00e1 n\u00e1dr\u017eka na vodu", beans_empty: "Pr\u00e1zdn\u00fd z\u00e1sobn\u00edk na k\u00e1vov\u00e1 zrna",
    tray_full: "Pln\u00e1 odkap\u00e1vac\u00ed miska", descale: "Je nutn\u00e9 odv\u00e1pn\u011bn\u00ed",
    speed: "Rychlost", section_speed: "Rychlost m\u00edch\u00e1n\u00ed",
    section_water: "N\u00e1dr\u017eka na vodu", section_beans: "Z\u00e1sobn\u00edk na k\u00e1vov\u00e1 zrna",
    section_tray: "Odkap\u00e1vac\u00ed miska", section_descaling: "Odv\u00e1pn\u011bn\u00ed",
    cups: "\u0160\u00e1lky", strength: "Intenzita",
    section_cups: "Po\u010det \u0161\u00e1lk\u016f", section_strength: "Intenzita k\u00e1vy",
    type_rice_cooker: "R\u00fd\u017eovar", keep_warm: "Udr\u017eov\u00e1n\u00ed teploty",
    language: "Jazyk", language_auto: "Podle Home Assistantu",
    illustration_color: "Barva spot\u0159ebi\u010de", color_auto: "Podle motivu",
    color_white: "B\u00edl\u00e1", color_grey: "\u0160ed\u00e1", color_black: "\u010cern\u00e1",
    type_water_heater: "Oh\u0159\u00edva\u010d vody", type_boiler: "Kotel", type_heat_pump: "Tepeln\u00e9 \u010derpadlo",
    boiler_space_heating: "Topen\u00ed", boiler_hot_water: "Tepl\u00e1 voda", boiler_burner: "Ho\u0159\u00e1k zapnut", boiler_starting: "Zapalov\u00e1n\u00ed", boiler_waiting: "\u010cek\u00e1n\u00ed", hp_cooling: "Chlazen\u00ed", hp_defrost: "Odmrazov\u00e1n\u00ed",
    section_space_heating: "Indik\u00e1tor topen\u00ed", section_hot_water: "Indik\u00e1tor tepl\u00e9 vody", section_flow_temperature: "Teplota topn\u00e9 vody", section_heat_output: "Tepeln\u00fd v\u00fdkon", section_cop: "Topn\u00fd faktor (COP)", section_outdoor_temperature: "Venkovn\u00ed teplota",
    section_cooling: "Indik\u00e1tor chlazen\u00ed", section_cooling_power: "P\u0159\u00edkon p\u0159i chlazen\u00ed", section_cooling_output: "Chladic\u00ed v\u00fdkon", section_hot_water_power: "P\u0159\u00edkon pro teplou vodu", section_hot_water_output: "Tepeln\u00fd v\u00fdkon pro teplou vodu",
    section_return_temperature: "Teplota zp\u00e1te\u010dky", section_water_flow: "Pr\u016ftok vody", section_compressor: "Kompresor", hp_delta: "Delta", section_fan_speed: "Ot\u00e1\u010dky ventil\u00e1toru",
    hp_flow_return: "P\u0159\u00edvod a zp\u00e1te\u010dka", no_hot_water: "Bez z\u00e1sobn\u00edku tepl\u00e9 vody", underfloor_heating: "Podlahov\u00e9 vyt\u00e1p\u011bn\u00ed m\u00edsto radi\u00e1tor\u016f",
    type_printer_3d: "3D tisk\u00e1rna", section_nozzle_temperature: "Teplota trysky", section_nozzle_target: "C\u00edlov\u00e1 teplota trysky",
    section_bed_temperature: "Teplota podlo\u017eky", section_bed_target: "C\u00edlov\u00e1 teplota podlo\u017eky", section_chamber_temperature: "Teplota komory",
    section_current_layer: "Aktu\u00e1ln\u00ed vrstva", section_total_layers: "Celkem vrstev", section_print_file: "Tiskov\u00fd soubor",
    section_print_stage: "F\u00e1ze tisku", section_printer_layout: "Konstrukce", layout_enclosed: "Uzav\u0159en\u00e1",
    layout_open: "Otev\u0159en\u00fd r\u00e1m (pohybliv\u00e1 podlo\u017eka)", unit_hours: "Hodiny", p3_nozzle: "Tryska",
    p3_bed: "Podlo\u017eka", p3_chamber: "Komora", p3_layer: "Vrstva",
    p3_file: "Soubor", p3_printing: "Tiskne", p3_preparing: "P\u0159\u00edprava",
    p3_cancelled: "Zru\u0161eno", p3_failed: "Nezda\u0159ilo se", p3_offline: "Offline",
    p3_attention: "Vy\u017eaduje pozornost", p3_leveling: "Vyrovn\u00e1v\u00e1n\u00ed podlo\u017eky", p3_filament: "V\u00fdm\u011bna filamentu",
    p3_cooling: "Chlazen\u00ed", p3_calibrating: "Kalibrace", p3_homing: "Naj\u00ed\u017ed\u011bn\u00ed do v\u00fdchoz\u00ed polohy",
    section_printed_part: "Ti\u0161t\u011bn\u00fd objekt", part_cube: "Krychle", part_pyramid: "Pyramida", part_duck: "Gumov\u00e1 kachni\u010dka",
    type_pet_feeder: "Krm\u00edtko", feeder_ready: "P\u0159ipraveno", feeder_feeding: "Krmen\u00ed", section_portions_today: "Porce dnes", section_weight_today: "Hmotnost dnes", section_portion_weight: "Hmotnost porce", section_serving_size: "Velikost porce", section_feeder_schedule: "Rozvrh", section_last_feed: "Posledn\u00ed krmen\u00ed", section_error: "Indik\u00e1tor chyby", start_option: "Mo\u017enost k v\u00fdb\u011bru", start_value: "Hodnota k z\u00e1pisu", portions: "porc\u00ed",
    feeder_empty: "Z\u00e1sobn\u00edk pr\u00e1zdn\u00fd", feeder_level: "Z\u00e1sobn\u00edk napln\u011bn na {pct}", section_level: "Mno\u017estv\u00ed krmiva", level_empty_below: "Pr\u00e1zdn\u00fd p\u0159i t\u00e9to hodnot\u011b nebo ni\u017e\u0161\u00ed", level_max: "Objem z\u00e1sobn\u00edku",
    section_feeder_layout: "Model", layout_tower: "V\u011b\u017e, vestav\u011bn\u00e1 miska", layout_canister: "Kulat\u00fd z\u00e1sobn\u00edk, samostatn\u00e1 miska",
    type_iron: "\u017dehli\u010dka", section_iron_layout: "Model", layout_iron: "\u017dehli\u010dka", layout_generator: "Parn\u00ed gener\u00e1tor",
    iron_heating: "Oh\u0159\u00edv\u00e1n\u00ed", iron_off: "Vypnuto", left_on: "Z\u016fstala zapnut\u00e1", left_on_after: "Upozornit po (minut\u00e1ch zapnut\u00ed)",
    washer_dryer: "Pra\u010dka se su\u0161i\u010dkou (pere a su\u0161\u00ed)", step_drying: "Su\u0161en\u00ed", section_cycle_phase: "F\u00e1ze programu",
    step_prewash: "P\u0159edp\u00edrka", step_soaking: "Nam\u00e1\u010den\u00ed", step_weighing: "V\u00e1\u017een\u00ed", step_filling: "Napou\u0161t\u011bn\u00ed", step_washing: "Pran\u00ed", step_rinsing: "M\u00e1ch\u00e1n\u00ed", step_draining: "Vypou\u0161t\u011bn\u00ed", step_spinning: "Odst\u0159e\u010fov\u00e1n\u00ed", step_cooling: "Chlazen\u00ed", step_anti_crease: "Proti poma\u010dk\u00e1n\u00ed", step_steam: "P\u00e1ra",
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
  return T[l] ? l : "en";
}
function t(hass, key) {
  const l = lang(hass);
  return (T[l] && T[l][key]) || T.en[key] || key;
}

// Each language names itself, so the list needs no translating.
const LANGUAGE_NAMES = {
  en: "English", fr: "Fran\u00e7ais", de: "Deutsch", es: "Espa\u00f1ol",
  it: "Italiano", nl: "Nederlands", pt: "Portugu\u00eas", sv: "Svenska",
  no: "Norsk", da: "Dansk", pl: "Polski", ru: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439",
  zh: "\u4e2d\u6587", cs: "\u010ce\u0161tina",
};

// A card can be pinned to one language whatever Home Assistant is set to.
// Someone running HA in English so error messages match what they find online
// may still want the card in their own language. Overriding the locale on a
// copy of hass leaves every t() call downstream working unchanged, and carries
// the choice to the dates as well, which share the same resolution.
function localizedHass(hass, cfg) {
  const want = cfg && cfg.language;
  const resolved = canonicalLanguage(want);
  if (!hass || !want || want === "auto" || !T[resolved]) return hass;
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
  idle: ["idle", "off", "standby", "veille", "eteint", "arret", "inactif", "inactive", "ready"],
  // Before "running": ovens report "Preheating", and the "heating" keyword
  // below cannot match it anyway (no word boundary inside "preheating").
  preheating: ["preheat", "pre-heat", "pre_heat", "prechauff", "vorheiz", "precalent", "voorverwarm"],
  // A rice cooker sits in this state for hours after it has finished, and so
  // does an oven on its warming setting. MIoT reports it as status 4,
  // "Keep-warm", and it is neither running nor done.
  keep_warm: ["keep.?warm", "keepwarm", "warming", "maintien", "au chaud",
    "warmhalten", "mantener caliente", "mantenimento", "warmhouden"],
  running: ["run", "wash", "spin", "dry", "rinsing", "heating", "cours", "on", "active", "marche", "actif",
    "cooking\\b(?!\\s*(?:complete|finished|done))", "cuisson\\b(?!\\s*termin)", "brewing", "baking",
    // Aborting is a cancelled cycle still draining, not an error and not
    // finished: the appliance is doing something until it stops.
    "abort"],
  paused: ["pause", "hold", "suspended"],
  done: ["end", "done", "finish", "complete", "termin"],
  delayed: ["delay", "differ", "scheduled", "programmed"],
  error: ["error", "fault", "alarm", "erreur"],
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
  // Hot water first: "chauffage eau chaude" is about the taps, not the radiators.
  if (f === "=h" || /\b(hw|dhw|ecs|acs)\b|\bhwc|tap.?water|heat.?water|hot.?water|eau.?chaude|sanitaire|warmwasser|agua.?caliente|acqua.?calda|warm.?water/.test(f)) return "hot_water";
  // Plain "heating" only after hot water has had its turn: on a boiler, a
  // heating that is not about the taps is about the radiators.
  if (f === "-h" || /\bch\b|starting.?ch|central.?heating|space.?heating|heat.?zones|\bheating\b|chauffage|heizung|heizbetrieb|calefaccion|riscaldamento|verwarming|\bcv\b/.test(f)) return "space_heating";
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
  if (/defrost|degivr|abtau|descongel|desescarch|sbrin|ontdooi|avfrost|avrim|afrim|odszran|odmraz/.test(f)) return "defrost";
  if (/\bcool(ing)?\b|refroidissement|rafraichissement|kuhlen|kuehlen|refrigeracion|raffrescamento|koelen|kylning|kjoling|koling|chlodzenie|chlazeni/.test(f)) return "cooling";
  const m = boilerModeOf(s, null);
  return HEAT_PUMP_MODES.includes(m) ? m : "";
}

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
  resuming: "printing", finishing: "printing", simulating: "printing",
  prepare: "preparing", init: "preparing", slicing: "preparing", busy: "preparing", startup: "preparing",
  starting: "preparing", starting_sd: "preparing", starting_streaming: "preparing",
  "self-testing": "preparing", self_testing: "preparing", checking: "preparing", file_checking: "preparing",
  printers_checking: "preparing", devices_testing: "preparing", exposure_testing: "preparing",
  downloading: "preparing", file_transferring: "preparing", transferring_file: "preparing",
  preheating: "preheating", heating: "preheating",
  paused: "paused", pause: "paused", pausing: "paused",
  attention: "attention",
  complete: "done", completed: "done", finished: "done", finish: "done",
  cancelled: "cancelled", canceled: "cancelled", cancelling: "cancelled", stopped: "cancelled", stopping: "cancelled",
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
  const norm = normalizeState(raw, stateMap);
  // A laundry machine or a dishwasher whose state names its step is running,
  // even on a word the card does not sort: LG reports soaking and detecting,
  // Whirlpool cycle_filling, and a step only exists inside a cycle. An entry
  // of state_map says what the state is, and is not second-guessed.
  if (norm === "unknown" && LAUNDRY_TYPES.includes(type) && raw !== undefined && raw !== null
    && mapInfoValue(String(raw).trim(), stateMap) === null && stepOfWord(raw)) return "running";
  return norm;
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

function normalizeState(raw, stateMap) {
  if (raw === undefined || raw === null) return "unknown";
  const s = String(raw).trim();
  if (["unknown", "unavailable", "none", ""].includes(s.toLowerCase())) return "unknown";
  if (stateMap && Object.prototype.hasOwnProperty.call(stateMap, s)) return mappedState(stateMap[s]);
  if (Object.prototype.hasOwnProperty.call(HOMEWHIZ_STATES, s)) return HOMEWHIZ_STATES[s];
  const flat = stripAccents(s);
  for (const norm of Object.keys(STATE_KEYWORD_PATTERNS)) {
    if (STATE_KEYWORD_PATTERNS[norm].some((re) => re.test(flat))) return norm;
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

function remainingSeconds(hass, entityId, unitCfg) {
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

function formatEta(totalSeconds) {
  const eta = new Date(Date.now() + totalSeconds * 1000);
  return eta.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function unitOf(hass, entityId) {
  const st = stateObj(hass, entityId);
  return (st && st.attributes.unit_of_measurement) || "";
}

function temperatureUnit(hass, entityId) {
  return (
    unitOf(hass, entityId) ||
    (hass.config && hass.config.unit_system && hass.config.unit_system.temperature) ||
    "\u00b0C"
  );
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
        return new Intl.DateTimeFormat(lang(hass), options).format(d);
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
  const tr = T[l] || T.en;
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
  program_entity: /program/i,
  remaining_time_entity: /time.?to.?end|remaining|finish.?in/i,
  door_entity: /door/i,
  alerts_entity: /alert/i,
  connectivity_entity: /connectiv/i,
  // A start delay is set, not pressed: HomeWhiz writes its own on a number.
  start_entity: /^(?!.*delay).*start/i,
  pause_entity: /pause/i,
  resume_entity: /resume/i,
  stop_entity: /stop|reset/i,
  power_entity: /_power$|power_w$|watt/i,
};

// The step of a cycle: Miele names it a program phase, Electrolux a cycle
// phase, SmartThings a job state, hOn a pr phase, HomeWhiz a sub state.
const PHASE_ENTITY_RE = /program.?phase|cycle.?phase|job.?state|pr.?phase|machine.?phase|sub.?state/i;

// Suggested only for the types that can actually use them, so a washing
// machine doesn't end up with a "filter life" field pre-filled.
const TYPE_AUTO_PATTERNS = {
  oven: {
    target_temperature_entity: /target.?temp|setpoint|temperature_setting/i,
    current_temperature_entity: /current.?temp|cavity.?temp|^(?!.*target).*temperature/i,
    light_entity: /light|lamp/i,
  },
  microwave: {
    power_level_entity: /power.?level|watt.?level/i,
  },
  hood: {
    fan_entity: /fan|hood|vent/i,
    light_entity: /light|lamp/i,
    filter_life_entity: /filter/i,
  },
  cooktop: {
    child_lock_entity: /child.?lock|lock/i,
  },
  fridge: {
    fridge_temperature_entity: /fridge|refriger|frigo|cooler/i,
    freezer_temperature_entity: /freezer|congel/i,
    freezer_door_entity: /freezer.?door|door.?freezer/i,
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
    temperature_entity: /temperature|water.?temp/i,
  },
  water_heater: {
    temperature_entity: /temperature|water.?temp/i,
    heating_entity: /heating|chauffe/i,
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
    compressor_entity: /(compressor|compresseur|kompressor|compresor)(?!.*(power|current|energy|hours|starts|count))/i,
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
    temperature_entity: /flow|supply|depart|temperature/i,
    hot_water_entity: /hot.?water|dhw|eau.?chaude/i,
    heating_entity: /central.?heating|chauffage/i,
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
    light_entity: /^(light|switch)\..*(light|led)/i,
    start_entity: /^(button|script)\..*start/i,
    pause_entity: /^(button|script)\..*pause/i,
    resume_entity: /^(button|script)\..*(resume|continue)/i,
    stop_entity: /^(button|script)\..*(?<!emergency_)(stop|cancel)/i,
    power_entity: /^sensor\.(?!.*(extruder|bed|chamber|heater|nozzle)).*(_power$|power_w$|watt)/i,
  },
  // A feeder's own words, read on an Aqara over Zigbee2MQTT and on a Tuya.
  // The schedule is only suggested when a readable one exists: the raw one is
  // a Python repr, which belongs in a template rather than on a card.
  pet_feeder: {
    start_entity: /^(button|script|automation|select|number)\..*(feed|start|distribu|croquette|portion)/i,
    portions_today_entity: /portions?.?(per.?day|today|du.?jour)|distributions?.?(per.?day|today|du.?jour)/i,
    weight_today_entity: /weight.?(per.?day|today)|poids.?du.?jour/i,
    portion_weight_entity: /portion.?weight|poids.?(d.)?une?.?portion/i,
    serving_size_entity: /serving.?size|feeding.?size|taille.*portion/i,
    schedule_entity: /schedule.?(pretty|text|readable)|planning/i,
    error_entity: /error|fault|defaut/i,
    level_entity: /food.?(level|remain)|level.?(of.)?food|lack.?of.?food|niveau.*croquette|remaining.?food/i,
  },
  coffee: {
    water_entity: /water.?tank|water.?level|reservoir/i,
    beans_entity: /bean.?container|bean.?empty/i,
    tray_entity: /drip.?tray|tray/i,
    descaling_entity: /descal|calc/i,
    cups_entity: /cups|multiple.?beverages|tasses/i,
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

function autoSuggest(hass, cfg) {
  if (!cfg.state_entity || !hass.states[cfg.state_entity]) return {};
  const siblings = siblingEntityIds(hass, cfg.state_entity).filter((id) => id !== cfg.state_entity);
  const type = detectApplianceType(cfg, hass.states[cfg.state_entity]);
  // Only ever fill fields the current type actually shows: a suggestion the
  // editor then hides is just a stray key in the user's YAML. Nor one its own
  // picker would refuse: a sensor whose name says start is no start button.
  const sections = sectionsForType(type);
  const allowed = new Set(sections.map((s) => s.field));
  const domains = Object.fromEntries(sections.map((s) => [s.field, s.includeDomains]));
  const patterns = { ...AUTO_PATTERNS, ...(TYPE_AUTO_PATTERNS[type] || {}) };
  const patch = {};
  // A machine whose name says it washes and dries gets the option written
  // down, so that the editor shows it ticked and the YAML says what the card
  // is doing, rather than both relying on the name for ever.
  if (type === "washer" && cfg.washer_dryer === undefined && isWasherDryer(cfg, hass.states[cfg.state_entity])) {
    patch.washer_dryer = true;
  }
  for (const [field, re] of Object.entries(patterns)) {
    if (cfg[field] || !allowed.has(field)) continue;
    const match = siblings.find((id) => re.test(id) && domains[field].includes(domainOf(id)));
    if (match) patch[field] = match;
  }
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
  // An iron, on its own or on the base of a steam generator. Nothing connects
  // one to Home Assistant, so it is read from the smart plug it is on, which
  // is why it is there: an iron left on is the one an owner worries about.
  iron: { iron: true },
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

// Same for a pet feeder: nothing else counts portions.
const FEEDER_ONLY_FIELDS = [
  "feeder_layout",
  "portions_today_entity",
  "weight_today_entity",
  "portion_weight_entity",
  "serving_size_entity",
  "last_feed_entity",
];

// Same for a 3D printer: nothing else has a nozzle or a print bed.
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
];

function caps(type) {
  return TYPE_CAPS[type] || TYPE_CAPS.washer;
}

function detectApplianceType(cfg, st) {
  if (cfg.appliance_type && cfg.appliance_type !== "auto") return cfg.appliance_type;
  // A fridge-only field settles it before any name matching: those keys mean
  // nothing on the other seven types, and a fridge may have no state entity
  // whose name could be matched in the first place.
  if (FRIDGE_ONLY_FIELDS.some((f) => cfg[f])) return "fridge";
  if (PRINTER_ONLY_FIELDS.some((f) => cfg[f])) return "printer_3d";
  if (FEEDER_ONLY_FIELDS.some((f) => cfg[f])) return "pet_feeder";
  const hay = `${cfg.icon || ""} ${cfg.state_entity || ""} ${(st && st.attributes.icon) || ""}`.toLowerCase();
  // Before everything else: a printer's entities are named after its maker or
  // its software, and a Bambu Lab one after its model ("p1s_...", "a1_...").
  if (/3d.?print|print.?3d|printer-3d|octoprint|prusa|bambu|klipper|moonraker|creality|elegoo|centauri|anycubic|kobra|flashforge|snapmaker|voron|reprap|duet3d|(^|[\s._])(x1c|x1e|p1s|p1p|p2s|a1|a1_mini|h2d|h2s)_|(^|[\s._-])ender[._-]?\d/.test(hay)) return "printer_3d";
  // A feeder names itself after what it holds as often as after what it is.
  if (/feeder|pet.?feed|croquette|kibble|futterautomat|comedero|alimentador|voerautomaat|foderautomat|f\u00f4rautomat|forautomat|karmnik|krmitko|\u5582\u98df|\u043a\u043e\u0440\u043c\u0443\u0448\u043a/.test(hay)) return "pet_feeder";
  // "microwave" before "oven": plenty of devices are named "microwave_oven".
  if (/microwave|micro.?onde|mikrowelle|magnetron|mikrob/.test(hay)) return "microwave";
  if (/coffee|cafeti|cafe|kaffee|espresso|cafetera|macchina.?caff|koffie|kaffemask|ekspres.?do.?kawy/.test(hay)) return "coffee";
  if (/rice.?cooker|ricecooker|cuiseur.?(a.?)?riz|reiskocher|arrocera|cuociriso|rijstkoker|multicooker.?rice/.test(hay)) return "rice_cooker";
  if (/cook.?processor|cookit|thermomix|robot.?cuiseur|companion|monsieur.?cuisine|cookeo|k\u00fcchenmaschine|kuchenmaschine|multicooker/.test(hay)) return "cooker";
  if (/wine.?(cooler|cellar|fridge)|cave.?(a|\u00e0).?vin|weink(u|ue|\u00fc)hl|weinklima|vinoteca|cantinetta|wijnklimaat|vinkyl|vinkj|vink\u00f8l|winiark|vinotek/.test(hay)) return "fridge";
  if (/fridge|freezer|frigo|r\u00e9frig|refrig|kuhlschrank|k\u00fchlschrank|nevera|frigor|koelkast|kyl(skap)?\b|kj\u00f8leskap|lod\u00f3wka|lodowka/.test(hay)) return "fridge";
  if (/kettle|bouilloire|wasserkocher|hervidor|bollitore|waterkoker|vattenkokare|vannkoker|elkedel|czajnik/.test(hay)) return "kettle";
  // An iron, and the steam generator that is one on a boiler. Spanish and
  // Portuguese call a griddle a plancha as well, so theirs is the ironing one:
  // plancha de ropa, centro de planchado, ferro de engomar.
  if (/\biron(ing)?\b|steam.?(generator|station)|fer.?a.?repasser|centrale.?vapeur|bugeleisen|dampfstation|dampfbugel|plancha.?de.?ropa|planchado|ferro.?(da.?stiro|de.?engomar|de.?passar)|strijkijzer|stoomgenerator|stryk(jarn|ejern)|strygejern|zelazko|generator.?pary|zehlicka|parni.?generator|\u0443\u0442\u044e\u0433|\u043f\u0430\u0440\u043e\u0433\u0435\u043d\u0435\u0440\u0430\u0442\u043e\u0440|\u71a8\u6597/.test(hay)) return "iron";
  // InComfort exposes an Intergas combi boiler as water_heater.boiler: the
  // domain says tank, the name says boiler, and the name is the one that knows.
  const eid = String(cfg.state_entity || "").toLowerCase();
  // First: a heat pump's own water heater is still the heat pump.
  if (/heat.?pump|pompe.?(a|\u00e0).?chaleur|w(a|ae|\u00e4)rmepumpe|bomba.?de.?calor|pompa.?di.?calore|warmtepomp|v(a|\u00e4)rmepump|pompa.?ciep|tepelne.?cerpadlo|ecodan|altherma|aquarea/.test(hay)) return "heat_pump";
  if (/^water_heater\..*(boiler|chaudiere)/.test(eid) && !/water.?boiler/.test(eid)) return "boiler";
  // Before the boiler: MDI names a storage tank "water-boiler", and water_heater
  // is the Home Assistant domain for one.
  if (/water.?heater|water.?boiler|chauffe.?eau|cumulus|warmwasserspeicher|termo.?electrico|scaldabagno|varmvattenberedare|varmtvannsbereder|podgrzewacz/.test(hay)) return "water_heater";
  if (/\bboiler|chaudiere|chaudi\u00e8re|heizkessel|gaskessel|caldaia|caldera|cv.?ketel|kocio\u0142|nefit/.test(hay)) return "boiler";
  if (/hood|hotte|abzug|extractor|exaustor|afzuigkap|emh|okap/.test(hay)) return "hood";
  if (/cooktop|hotplate|plaque|kochfeld|kookplaat|induction|induktion|kogeplade/.test(hay)) return "cooktop";
  if (/oven|four|backofen|horno|forno|piekarnik/.test(hay)) return "oven";
  // Before the dryer: a washer-dryer says "dry" in every language, and it is a
  // washer that also dries, not a dryer that also washes.
  if (WASHER_DRYER_RE.test(stripAccents(hay))) return "washer";
  if (/dry|dryer|seche|s\u00e8che|tumble/.test(hay)) return "dryer";
  if (/dish|vaisselle/.test(hay)) return "dishwasher";
  return "washer";
}

// A plug reports isolated 0 W readings while everything is fine. Measured
// on a real fridge, the longest such run lasted 13 to 15 minutes. Half an hour
// below the threshold is therefore the shortest delay that cannot produce a
// false alarm, and it doubles the observed worst case.
const FRIDGE_UNPLUGGED_AFTER_MS = 30 * 60 * 1000;
// A heater within five degrees of its target has arrived: printing holds
// them within a degree or two, and preheating starts from the room.
const P3_HEAT_MARGIN = 5;
// Height of a finished part on the drawing, in pixels.
const P3_PART_MAX = 40;
// A card that counts minutes of its own, the fridge without power and the
// iron left on, redraws on this beat: the count is shown in whole minutes, so
// half a minute is close enough to keep it honest.
const CLOCK_TICK_MS = 30 * 1000;
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

function fridgeHealth(unplugged, noPower, doorOpen, tempHigh) {
  if (unplugged) return "unplugged";
  if (noPower) return "no_power";
  if (doorOpen) return "door_open";
  if (tempHigh) return "temp_high";
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
      const num = parseFloat(raw);
      if (!isNaN(num)) {
        if (num > 0) {
          out.on = true;
          out.label = String(Math.round(num));
          out.intensity = Math.max(0, Math.min(1, num / 9));
          out.max = num >= 9;
        }
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
    // without pretending to know a level we don't have.
    out.level = 2;
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
};

const ILLUSTRATION_CSS = {
  printer_3d: (color) => `
        .p3-case {
          position: absolute; left: 6px; right: 6px; top: 2px; bottom: 5px; border-radius: 6px;
          background: linear-gradient(160deg, var(--ac-body-hi, #e6e6e6), var(--ac-body, var(--secondary-background-color, #d7d7d7)) 45%, var(--ac-body-lo, #aeb2b5));
          border: 1px solid var(--divider-color, #c7c7c7);
        }
        .p3-window {
          position: absolute; left: 6px; right: 6px; top: 6px; bottom: 18px; border-radius: 3px; overflow: hidden;
          background: #1b1e23; box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.35);
        }
        .machine.lit .p3-window { background: #2b3038; box-shadow: inset 0 6px 12px rgba(255, 236, 179, 0.35); }
        .p3-glass { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255, 255, 255, 0.10), transparent 45%); pointer-events: none; }
        .p3-rail { position: absolute; left: 3px; right: 3px; top: 8px; height: 3px; border-radius: 1px; background: #5f666e; }
        .p3-head {
          position: absolute; left: 50%; top: 4px; width: 14px; height: 12px; margin-left: -7px; z-index: 2;
          border-radius: 2px; background: linear-gradient(180deg, #e0e3e6, #aab0b6);
        }
        .p3-nozzle {
          position: absolute; left: 3px; bottom: -4px; width: 0; height: 0;
          border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 4px solid #8a9096;
        }
        .machine.nozzle-hot .p3-nozzle { border-top-color: #ff7043; }
        .p3-enclosed .p3-bed {
          position: absolute; left: 8px; right: 8px; top: calc(21px + var(--p3-h, 0px)); height: 4px; border-radius: 1px;
          background: #8f969d;
        }
        .p3-enclosed.parked .p3-bed { top: auto; bottom: 8px; }
        .machine.bed-hot .p3-bed { background: linear-gradient(180deg, #ffab91, #ff7043); box-shadow: 0 0 6px rgba(255, 112, 67, 0.55); }
        .p3-part {
          position: absolute; left: 50%; bottom: 100%; width: 26px; margin-left: -13px; height: var(--p3-h, 0px);
          overflow: hidden;
        }
        .p3-shape {
          position: absolute; left: 0; bottom: 0; width: 100%; height: 40px; border-radius: 1px 1px 0 0;
          background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.18) 0 1px, transparent 1px 3px), ${color};
        }
        .p3-part i { position: absolute; left: 0; right: 0; bottom: calc(var(--p3-h, 0px) - 2px); height: 2px; opacity: 0; background: rgba(255, 255, 255, 0.85); }
        .p3-part-pyramid .p3-part { width: 32px; margin-left: -16px; }
        .p3-part-pyramid .p3-shape { border-radius: 0; clip-path: polygon(50% 0, 100% 100%, 0 100%); }
        /* A rubber duck in one outline: tail, head, beak, and a round front. */
        .p3-part-duck .p3-part { width: 34px; margin-left: -17px; }
        .p3-part-duck .p3-shape {
          border-radius: 0;
          clip-path: path("M1 20 L10 24 Q13 23 15 20 C12 14 15 5 22 5 C27 5 29 8 29.5 10 L34 12.5 L34 14 L29.5 16 Q28 19 25 21 C31 22 33 26 33 30 C33 37 27 40 17 40 C7 40 2 36 2 31 C2 27 1 24 1 20 Z");
        }
        .p3-eye { position: absolute; left: 22px; top: 9px; width: 3px; height: 3px; border-radius: 50%; background: rgba(0, 0, 0, 0.55); }
        .p3-lcd {
          position: absolute; left: 10px; bottom: 4px; width: 30px; height: 9px; border-radius: 2px;
          background: #14161a; color: #4fc3f7; text-align: center; font: 600 7px/9px ui-monospace, "SF Mono", monospace;
        }
        .p3-knob { position: absolute; right: 10px; bottom: 5px; width: 7px; height: 7px; border-radius: 50%; background: #3b4048; }
        .p3-foot { position: absolute; bottom: 1px; width: 12px; height: 4px; border-radius: 0 0 2px 2px; background: #3b4048; }
        .p3-foot.f1 { left: 14px; }
        .p3-foot.f2 { right: 14px; }
        /* Open frame: two uprights and a top bar, a gantry that climbs with the
           part, and a bed on the base. */
        .p3-post { position: absolute; top: 6px; bottom: 17px; width: 4px; border-radius: 1px; background: #5f666e; }
        .p3-post.l { left: 12px; }
        .p3-post.r { right: 12px; }
        .p3-top { position: absolute; left: 12px; right: 12px; top: 6px; height: 4px; border-radius: 1px; background: #5f666e; }
        .p3-gantry { position: absolute; left: 12px; right: 12px; height: 16px; bottom: calc(22px + var(--p3-h, 0px)); }
        .p3-gantry::before { content: ""; position: absolute; left: 0; right: 0; top: 4px; height: 3px; border-radius: 1px; background: #5f666e; }
        .p3-gantry .p3-head { top: 0; }
        .p3-open .p3-bed { position: absolute; left: 18px; right: 18px; bottom: 18px; height: 4px; border-radius: 1px; background: #8f969d; }
        .p3-base {
          position: absolute; left: 6px; right: 6px; bottom: 3px; height: 14px; border-radius: 3px;
          background: linear-gradient(160deg, var(--ac-body-hi, #e6e6e6), var(--ac-body, var(--secondary-background-color, #d7d7d7)) 45%, var(--ac-body-lo, #aeb2b5));
          border: 1px solid var(--divider-color, #c7c7c7);
        }
        .p3-base .p3-lcd { bottom: 2px; }
        .p3-base .p3-knob { bottom: 3px; }
        @keyframes p3-move { from { transform: translateX(-14px); } to { transform: translateX(14px); } }
        @keyframes p3-draw { 0% { opacity: 0; } 30% { opacity: 0.9; } 100% { opacity: 0; } }
        .machine.moving .p3-head { animation: p3-move 1.6s ease-in-out infinite alternate; animation-delay: var(--anim-offset, 0s); }
        .machine.moving.has-part .p3-part i { animation: p3-draw 1.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
      `,
  laundry: (color) => `
        .mbody {
          position: absolute; inset: 0; border-radius: 10px;
          background: var(--ac-body, var(--secondary-background-color, #d7d7d7));
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
        .bezel-wrap {
          position: absolute; left: 50%; top: 62%; transform: translate(-50%, -50%);
          width: 64px; height: 64px; perspective: 220px;
        }
        .drum-hole { position: absolute; inset: 0; border-radius: 50%; background: #14161a; }
        .door {
          position: absolute; inset: 0; border-radius: 50%;
          background: var(--divider-color, #b0b0b0);
          box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.15);
          transform-origin: left center; transform: rotateY(0deg);
          transition: transform 0.4s ease;
        }
        .door.ajar { transform: rotateY(50deg); }
        .rim { position: absolute; inset: 5px; border-radius: 50%; background: #2b2f36; }
        .glass {
          position: absolute; inset: 6px; border-radius: 50%; overflow: hidden;
          background: rgba(140, 180, 220, 0.18);
        }
        .water-level { position: absolute; left: 0; right: 0; bottom: 0; height: 55%; overflow: hidden; }
        .wave {
          position: absolute; left: -58%; top: 39%; width: 170%; height: 266%;
          background: ${color}; opacity: 0.85;
          transition: background 1s linear;
        }
        .wave.wave2 { opacity: 0.45; }
        .machine.spinning .wave { border-radius: 58%; animation: waterspin 6s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.spinning .wave.wave2 { animation: waterspin 8s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes waterspin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .garments { position: absolute; inset: 0; }
        .garment {
          position: absolute; width: 22px; height: 27px; border-radius: 40px;
          background: ${color}; opacity: 0.85; transition: background 1s linear;
        }
        .garment.g1 { top: 29px; left: -6px; }
        .machine.spinning .garment.g1 { top: -5px; left: -12px; }
        .garment.g2 { top: 24px; left: 32px; transform: rotate(15deg); opacity: 0.5; }
        .garment.g3 { top: 33px; left: 13px; transform: rotate(-25deg); }
        .machine.spinning .garments { animation: tumble 2.6s linear infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes tumble { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        /* Spinning: the load whirls against the drum, several times faster
           than the wash turns it. */
        .machine.spinning.spin-cycle .garments { animation-duration: 0.7s; }
        /* Drying, on a washer-dryer: the drum is empty of water and warm, so
           the glass loses its cold cast and three wisps rise behind the load. */
        .machine.drying .glass { box-shadow: inset 0 0 12px rgba(255, 112, 67, 0.85); }
        .wd-heat { position: absolute; inset: 0; z-index: 0; }
        .wd-heat i {
          position: absolute; bottom: 2px; width: 5px; height: 16px; opacity: 0;
          background: linear-gradient(180deg, rgba(255, 183, 77, 0), rgba(255, 128, 40, 0.95));
          border-radius: 50% 50% 40% 40%; filter: blur(0.6px);
        }
        .wd-heat i:nth-child(1) { left: 26%; }
        .wd-heat i:nth-child(2) { left: 48%; height: 21px; }
        .wd-heat i:nth-child(3) { left: 68%; height: 14px; }
        .machine.drying .wd-heat i { animation: wd-rise 2.8s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.drying .wd-heat i:nth-child(2) { animation-delay: calc(-0.93s + var(--anim-offset, 0s)); }
        .machine.drying .wd-heat i:nth-child(3) { animation-delay: calc(-1.86s + var(--anim-offset, 0s)); }
        @keyframes wd-rise {
          0% { opacity: 0; transform: translateY(4px) scaleY(0.7); }
          35% { opacity: 0.9; }
          100% { opacity: 0; transform: translateY(-18px) scaleY(1.15); }
        }
  `,
  dishwasher: (color) => `
        /* A dishwasher is front-loading, but its door hinges at the bottom.
           Keep the same compact, CSS-only visual language as the other types. */
        .dw-body {
          position: absolute; inset: 0; border-radius: 10px 10px 6px 6px;
          background: linear-gradient(145deg, var(--ac-body, var(--secondary-background-color, #d7d7d7)), var(--ac-body-lo, #aeb2b5));
          border: 1px solid var(--divider-color, #c7c7c7);
          perspective: 260px;
        }
        .dw-controls {
          position: absolute; top: 6px; left: 8px; right: 8px; height: 12px;
          border: 1px solid rgba(255, 255, 255, 0.14); border-radius: 3px;
          background: rgba(20, 22, 23, 0.78);
        }
        .dw-controls::before,
        .dw-controls::after {
          content: ""; position: absolute; top: 3px; width: 4px; height: 4px;
          border-radius: 50%; background: #697078;
        }
        .dw-controls::before { right: 5px; }
        .dw-controls::after { right: 12px; }
        .dw-screen {
          position: absolute; top: 2px; left: 4px; width: 24px; height: 6px;
          border-radius: 2px; background: #16292e;
          box-shadow: inset 0 0 0 1px rgba(129, 213, 205, 0.3);
        }
        .dw-cavity {
          position: absolute; top: 22px; right: 8px; bottom: 8px; left: 8px;
          overflow: hidden; border: 3px solid #34383b; border-radius: 4px;
          background: linear-gradient(180deg, #33474f, #7d8f95);
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.34);
        }
        .machine.done .dw-plate {
          border-color: #b9f6ca;
          background: linear-gradient(90deg, transparent 0 22%, rgba(185, 246, 202, 0.62) 50%, transparent 78%);
          box-shadow: inset 0 0 0 1px rgba(185, 246, 202, 0.55), 0 0 8px rgba(105, 240, 174, 0.65);
        }
        .dw-rack {
          position: absolute; right: 10%; bottom: 13%; left: 10%; height: 34%;
          border-top: 1px solid rgba(222, 232, 235, 0.76);
          border-bottom: 1px solid rgba(222, 232, 235, 0.5);
          background: repeating-linear-gradient(90deg, transparent 0 7px, rgba(222, 232, 235, 0.58) 8px 9px);
          transform: perspective(100px) rotateX(18deg);
        }
        .dw-dishes {
          position: absolute; right: 15%; bottom: 17%; left: 15%; z-index: 1; height: 43%;
        }
        .dw-plate {
          position: absolute; bottom: 0; width: 9px; height: 18px;
          border: 1px solid rgba(240, 242, 244, 0.62); border-radius: 50%;
          background: linear-gradient(90deg, transparent 0 28%, rgba(240, 242, 244, 0.14) 50%, transparent 72%);
          box-shadow: inset 0 0 0 1px rgba(240, 242, 244, 0.12);
        }
        .dw-plate-a { left: 0; transform: rotate(-12deg); }
        .dw-plate-b { left: 23%; transform: rotate(-5deg); }
        .dw-plate-c { left: 47%; transform: rotate(5deg); }
        .dw-plate-d { right: 0; transform: rotate(12deg); }
        .dw-spray {
          position: absolute; top: 21%; left: 10%; width: 80%; height: 5px; z-index: 3;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent 0 3%, ${color} 10% 90%, transparent 97%);
          box-shadow: 0 0 6px ${color};
          /* Visible at rest too, in the state colour: once the glass clears for
             a paused or finished load, a half-faded arm reads as a rendering
             glitch rather than as an arm standing still. */
          opacity: 0.85; transform-origin: 50% 50%; transition: opacity 0.3s ease;
        }
        .dw-spray::before,
        .dw-spray::after {
          content: ""; position: absolute; top: 1px; width: 2px; height: 1px;
          border-radius: 50%; background: ${color};
        }
        .dw-spray::before { left: 22%; }
        .dw-spray::after { right: 22%; }
        .dw-spray-hub {
          position: absolute; top: 50%; left: 50%; width: 7px; height: 7px;
          border: 1px solid ${color}; border-radius: 50%; background: #2c2c2c;
          transform: translate(-50%, -50%);
        }
        .dw-drops { position: absolute; inset: 0; z-index: 4; pointer-events: none; }
        .dw-drop {
          position: absolute; top: 22%; width: 3px; height: 5px; border-radius: 60%;
          background: ${color}; opacity: 0; transform: translateY(-4px) scale(0.8);
        }
        .dw-drop-a { left: 25%; }
        .dw-drop-b { left: 38%; }
        .dw-drop-c { left: 51%; }
        .dw-drop-d { left: 64%; }
        .dw-drop-e { left: 75%; }
        .dw-water {
          position: absolute; right: 9%; bottom: 5%; left: 9%; z-index: 2; height: 12px;
          overflow: hidden; border-top: 1px solid ${color}; border-radius: 50% 50% 20% 20%;
          background: linear-gradient(180deg, rgba(33, 150, 243, 0.22), transparent 86%);
          opacity: 0.5; transition: opacity 0.3s ease;
        }
        .dw-wave {
          position: absolute; left: -8%; width: 116%; height: 7px;
          border-top: 1px solid ${color}; border-radius: 50%;
        }
        .dw-wave-a { top: 2px; }
        .dw-wave-b { top: 6px; left: 8%; opacity: 0.6; }
                /* Promoted to its own layer: a thin bar carrying a box-shadow is
           otherwise repainted at every angle, and the glow resampling reads as
           a vibration rather than as rotation. */
        .machine.spinning .dw-spray {
          opacity: 1; will-change: transform; backface-visibility: hidden;
          animation: dw-spray-spin 2.8s linear infinite; animation-delay: var(--anim-offset, 0s);
        }
        .machine.spinning .dw-drop { animation: dw-drop-fall 1.65s ease-in infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.spinning .dw-drop-a { animation-delay: calc(-0.3s + var(--anim-offset, 0s)); }
        .machine.spinning .dw-drop-b { animation-delay: calc(-0.95s + var(--anim-offset, 0s)); }
        .machine.spinning .dw-drop-c { animation-delay: calc(-0.58s + var(--anim-offset, 0s)); }
        .machine.spinning .dw-drop-d { animation-delay: calc(-1.15s + var(--anim-offset, 0s)); }
        .machine.spinning .dw-drop-e { animation-delay: calc(-0.76s + var(--anim-offset, 0s)); }
        .machine.spinning .dw-water { opacity: 0.82; animation: dw-water-pulse 2.2s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.spinning .dw-wave-a { animation: dw-wave-drift 1.8s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.spinning .dw-wave-b { animation: dw-wave-drift 2.4s ease-in-out infinite reverse; animation-delay: var(--anim-offset, 0s); }
        .dw-heat {
          position: absolute; top: 22px; right: 8px; bottom: 8px; left: 8px; z-index: 6;
          overflow: hidden; border-radius: 4px; opacity: 0; pointer-events: none;
          transition: opacity 0.35s ease;
        }
        .dw-heat i {
          position: absolute; bottom: 0; width: 15px; height: 34px; opacity: 0;
          background: linear-gradient(180deg, rgba(255, 183, 77, 0), rgba(255, 183, 77, 0.9) 45%, rgba(255, 138, 60, 0.95));
          clip-path: polygon(63% 0%, 79% 7%, 90% 14%, 93% 21%, 86% 29%, 73% 36%, 56% 43%, 42% 50%, 34% 57%, 35% 64%, 44% 71%, 60% 79%, 76% 86%, 88% 93%, 93% 100%, 67% 100%, 62% 93%, 50% 86%, 34% 79%, 18% 71%, 9% 64%, 8% 57%, 16% 50%, 30% 43%, 47% 36%, 60% 29%, 67% 21%, 64% 14%, 53% 7%, 37% 0%);
          filter: blur(0.5px);
        }
        .dw-heat-a { left: 3%; }
        .dw-heat-b { left: 24%; height: 27px !important; }
        .dw-heat-c { left: 44%; height: 22px !important; }
        .dw-heat-d { left: 64%; height: 29px !important; }
        .dw-heat-e { right: 3%; height: 24px !important; }
        /* Both drying phases show the same thing: heat rising across the full width
           of the machine. They differ only in where it sits, inside the cavity
           while drying and up at the door once the door is cracked open. The wash
           animation is paused underneath, since nothing is spraying any more. */
        .machine.phase-drying .dw-cavity,
        .machine.phase-ado_drying .dw-cavity {
          box-shadow: inset 0 0 20px rgba(255, 112, 67, 0.28);
        }
        .machine.phase-drying .dw-heat,
        .machine.phase-ado_drying .dw-heat { opacity: 1; }
        /* Ado drying pushes the steam further up the door, which is the only
           thing separating it from the plain drying phase. */
        .machine.phase-ado_drying .dw-heat i { height: 44px !important; }
        .machine.phase-drying .dw-heat i,
        .machine.phase-ado_drying .dw-heat i {
          animation: dw-heat-rise 2.4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s);
        }
        .machine.phase-drying .dw-heat i.dw-heat-b,
        .machine.phase-ado_drying .dw-heat i.dw-heat-b { animation-delay: calc(-0.48s + var(--anim-offset, 0s)); }
        .machine.phase-drying .dw-heat i.dw-heat-c,
        .machine.phase-ado_drying .dw-heat i.dw-heat-c { animation-delay: calc(-0.96s + var(--anim-offset, 0s)); }
        .machine.phase-drying .dw-heat i.dw-heat-d,
        .machine.phase-ado_drying .dw-heat i.dw-heat-d { animation-delay: calc(-1.44s + var(--anim-offset, 0s)); }
        .machine.phase-drying .dw-heat i.dw-heat-e,
        .machine.phase-ado_drying .dw-heat i.dw-heat-e { animation-delay: calc(-1.92s + var(--anim-offset, 0s)); }
        .machine.phase-drying .dw-spray,
        .machine.phase-drying .dw-water,
        .machine.phase-drying .dw-wave-a,
        .machine.phase-drying .dw-wave-b,
        .machine.phase-ado_drying .dw-spray,
        .machine.phase-ado_drying .dw-water,
        .machine.phase-ado_drying .dw-wave-a,
        .machine.phase-ado_drying .dw-wave-b {
          animation-play-state: paused; opacity: 0.12;
        }
        /* No water at all while drying: the drops are gone, not dimmed, and
           the rising steam takes the space they used to occupy. */
        .machine.phase-drying .dw-drops,
        .machine.phase-ado_drying .dw-drops { display: none; }
        /* The arm stays lit while drying, but in heat colour: blue reads as
           water, and there is no water left at this point in the cycle. */
        .machine.phase-drying .dw-spray,
        .machine.phase-ado_drying .dw-spray {
          background: linear-gradient(90deg, transparent, #ffa726, transparent);
          box-shadow: 0 0 5px rgba(255, 167, 38, 0.55);
          opacity: 0.6;
        }
        .machine.phase-drying .dw-spray-hub,
        .machine.phase-ado_drying .dw-spray-hub {
          border-color: #ffa726;
        }
        .machine.phase-drying .dw-door,
        .machine.phase-ado_drying .dw-door {
          box-shadow: inset 0 0 0 1px rgba(225, 235, 236, 0.3),
            inset 0 0 15px rgba(255, 112, 67, 0.32), 0 0 8px rgba(255, 112, 67, 0.3);
        }
        .dw-door {
          position: absolute; top: 22px; right: 8px; bottom: 8px; left: 8px; z-index: 5;
          padding: 0; border: 3px solid #34383b; border-radius: 4px;
          background: linear-gradient(180deg, rgba(14, 20, 24, 0.5), rgba(14, 20, 24, 0.74));
          box-shadow: inset 0 0 0 1px rgba(225, 235, 236, 0.3), 0 3px 5px rgba(0, 0, 0, 0.25);
          transform-origin: 50% 100%;
          transition: transform 0.42s cubic-bezier(.2, .75, .25, 1), box-shadow 0.42s ease;
        }
        .dw-door::after {
          content: ""; position: absolute; inset: 0; z-index: 1; border-radius: 2px;
          pointer-events: none;
          background: linear-gradient(116deg, rgba(255, 255, 255, 0.17) 0 17%, rgba(255, 255, 255, 0) 40%);
        }
        .dw-door::before {
          content: ""; position: absolute; top: 4px; right: 18%; left: 18%; height: 2px;
          border-radius: 8px; background: rgba(225, 231, 232, 0.6);
        }
        /* Clear whenever there is something in the tub worth seeing: a running
           cycle, a paused one, or a finished load waiting to be emptied. Opaque
           only at rest, and that contrast is what separates a shut door from an
           open one at a glance. */
        .machine.spinning .dw-door,
        .machine.done .dw-door,
        .machine.paused .dw-door {
          background: linear-gradient(180deg, rgba(18, 26, 30, 0.08), rgba(18, 26, 30, 0.3));
        }
        .dw-door.open {
          background: linear-gradient(180deg, #2c343a, #14191c);
          transform: rotateX(81deg) translateY(13px) translateZ(9px);
          box-shadow: 0 16px 14px rgba(0, 0, 0, 0.45);
        }
        @keyframes dw-spray-spin { to { transform: rotate(360deg); } }
        @keyframes dw-drop-fall {
          0% { opacity: 0; transform: translateY(-4px) scale(0.75); }
          22% { opacity: 0.85; }
          82% { opacity: 0.62; }
          100% { opacity: 0; transform: translateY(28px) scale(1); }
        }
        @keyframes dw-water-pulse { 0%, 100% { transform: scaleX(0.97); } 50% { transform: scaleX(1.02); } }
        @keyframes dw-wave-drift { 0%, 100% { transform: translateX(-3%); } 50% { transform: translateX(3%); } }
        @keyframes dw-heat-rise {
          /* Translation only. Animating scaleY on an element that is both
             clip-path shaped and blurred forces the polygon to be recomputed
             and the blur resampled every frame, which reads as a vibration
             rather than as steam. The volutes already differ by height. */
          0% { opacity: 0; transform: translateY(16px); }
          20% { opacity: 0.72; }
          75% { opacity: 0.72; }
          100% { opacity: 0; transform: translateY(-32px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .machine.spinning .dw-spray, .machine.spinning .dw-drop, .machine.spinning .dw-water,
          .machine.spinning .dw-wave-a, .machine.spinning .dw-wave-b,
          .machine.phase-drying .dw-heat i, .machine.phase-ado_drying .dw-heat i {
          animation-duration: 0.001ms !important; animation-iteration-count: 1 !important;
          }
        }
  `,
  oven: () => `
        .ov-body {
          position: absolute; inset: 0; border-radius: 10px;
          background: var(--ac-body, var(--secondary-background-color, #d7d7d7));
          border: 1px solid var(--divider-color, #c7c7c7);
        }
        .ov-panel { position: absolute; top: 6px; left: 8px; right: 8px; height: 12px; }
        .ov-disp {
          position: absolute; left: 0; top: 2px; min-width: 30px; height: 9px; padding: 0 2px;
          border-radius: 2px; background: #14161a; color: #ff7043; text-align: center;
          font: 600 6px/9px ui-monospace, "SF Mono", monospace; letter-spacing: 0.5px;
        }
        .ov-knob {
          position: absolute; top: 3px; right: 0; width: 7px; height: 7px;
          border-radius: 50%; background: var(--disabled-text-color, #9e9e9e);
        }
        .ov-knob.k2 { right: 12px; }
        .ov-doorwrap { position: absolute; left: 7px; right: 7px; top: 24px; bottom: 7px; perspective: 300px; }
        .ov-cavity { position: absolute; inset: 0; border-radius: 6px; background: #14161a; overflow: hidden; }
        .ov-elem { position: absolute; left: 7px; right: 7px; height: 3px; border-radius: 2px; background: #3b4048; }
        .ov-elem.top { top: 16px; }
        .ov-elem.bottom { bottom: 10px; }
        .ov-rack { position: absolute; left: 5px; right: 5px; top: 60%; height: 1px; background: #4c525b; }
        .ov-dish {
          position: absolute; left: 50%; top: 60%; width: 30px; height: 9px;
          transform: translate(-50%, -100%); border-radius: 3px 3px 2px 2px; background: #5b6069;
        }
        .machine.heating .ov-elem {
          background: #ff7043; box-shadow: 0 0 9px 1px #ff7043;
          animation: ov-ember 2.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s);
        }
        .machine.heating .ov-elem.bottom { animation-delay: calc(-1.3s + var(--anim-offset, 0s)); }
        .machine.heating .ov-cavity { box-shadow: inset 0 0 22px rgba(255, 112, 67, 0.45); }
        @keyframes ov-ember { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
        /* The lamp has to light the door glass, not the cavity behind it. With
           the door shut the glass is 94% opaque, so a cavity lit underneath is
           invisible: the rule worked and nobody could see it. Lighting the
           pane is also what a real oven looks like, the lamp reaching you
           through the window rather than off the back wall. */
        .machine.lit .ov-cavity {
          background: radial-gradient(ellipse at 50% 40%, rgba(255, 209, 102, 0.28), #14161a 72%);
        }
        .machine.lit .ov-glass {
          background: radial-gradient(ellipse at 50% 38%, rgba(104, 76, 38, 0.86), rgba(16, 18, 22, 0.94) 78%);
        }
        .ov-door {
          position: absolute; inset: 0; border-radius: 6px;
          background: var(--ac-body, var(--secondary-background-color, #d7d7d7));
          border: 1px solid var(--divider-color, #c7c7c7);
          transform-origin: bottom center; transform: rotateX(0deg); transition: transform 0.45s ease;
        }
        .ov-handle {
          position: absolute; left: 5px; right: 5px; top: 3px; height: 4px;
          border-radius: 2px; background: var(--disabled-text-color, #9e9e9e);
        }
        /* The resistances are drawn on the glass rather than seen through it: making
           the glass translucent enough to reveal the cavity washes the whole door out
           to a flat beige and you can no longer read what the oven is doing. */
        .ov-glass {
          position: absolute; left: 5px; right: 5px; top: 11px; bottom: 5px; border-radius: 4px;
          background: rgba(16, 18, 22, 0.94); box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.35);
          overflow: hidden; transition: box-shadow 0.4s ease;
        }
        .ov-glass::before, .ov-glass::after {
          content: ""; position: absolute; left: 8px; right: 8px; height: 3px; border-radius: 2px;
          background: #2a2e35; transition: background 0.4s ease;
        }
        .ov-glass::before { top: 8px; }
        .ov-glass::after { bottom: 8px; }
        .machine.heating .ov-glass {
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.35), inset 0 0 15px rgba(255, 112, 67, 0.32);
        }
        .machine.heating .ov-glass::before, .machine.heating .ov-glass::after {
          background: #ff7043; box-shadow: 0 0 8px 1px #ff7043;
          animation: ov-ember 2.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s);
        }
        .machine.heating .ov-glass::after { animation-delay: calc(-1.3s + var(--anim-offset, 0s)); }
        .machine.open .ov-door { transform: rotateX(-74deg); }
  `,
  microwave: () => `
        .mw-body {
          position: absolute; left: 0; right: 0; top: 17px; height: 74px; border-radius: 8px;
          background: var(--ac-body, var(--secondary-background-color, #d7d7d7));
          border: 1px solid var(--divider-color, #c7c7c7);
        }
        .mw-doorwrap { position: absolute; left: 5px; top: 5px; bottom: 5px; width: 65px; perspective: 280px; }
        .mw-cavity { position: absolute; inset: 0; border-radius: 4px; background: #14161a; overflow: hidden; }
        .mw-turn {
          position: absolute; left: 50%; top: 62%; width: 40px; height: 40px;
          transform: translate(-50%, -50%) scaleY(0.3);
        }
        .mw-plate { position: absolute; inset: 0; border-radius: 50%; background: #2b2f36; }
        .mw-food {
          position: absolute; left: 50%; top: 2px; width: 9px; height: 9px;
          margin-left: -4.5px; border-radius: 50%; background: #6d737c;
        }
        .machine.spinning .mw-turn { animation: mw-spin 3.4s linear infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes mw-spin {
          from { transform: translate(-50%, -50%) scaleY(0.3) rotate(0deg); }
          to { transform: translate(-50%, -50%) scaleY(0.3) rotate(360deg); }
        }
        .machine.spinning .mw-cavity {
          background: radial-gradient(ellipse at 50% 45%, rgba(255, 209, 102, 0.3), #14161a 70%);
          animation: mw-pulse 1.7s ease-in-out infinite; animation-delay: var(--anim-offset, 0s);
        }
        @keyframes mw-pulse { 0%, 100% { filter: brightness(0.88); } 50% { filter: brightness(1.15); } }
        .machine.spinning .mw-plate { background: #3a3128; }
        .machine.spinning .mw-food { background: #c98b4b; }
        .mw-door {
          position: absolute; inset: 0; border-radius: 4px;
          background: var(--ac-body, var(--secondary-background-color, #d7d7d7));
          border: 1px solid var(--divider-color, #c7c7c7);
          transform-origin: left center; transform: rotateY(0deg); transition: transform 0.45s ease;
        }
        .mw-mesh {
          position: absolute; left: 4px; right: 9px; top: 4px; bottom: 4px; border-radius: 3px;
          background:
            radial-gradient(circle, rgba(190, 200, 215, 0.34) 0.8px, transparent 1.1px) 0 0/5px 5px,
            rgba(18, 20, 24, 0.74);
          transition: background 0.4s ease;
        }
        /* Same reasoning as the oven glass: keep the grille dark and put a pool of
           warm light behind it, instead of lightening the grille itself. */
        .machine.spinning .mw-mesh {
          background:
            radial-gradient(circle, rgba(190, 200, 215, 0.42) 0.8px, transparent 1.1px) 0 0/5px 5px,
            radial-gradient(ellipse at 50% 58%, rgba(255, 183, 88, 0.5), transparent 72%),
            rgba(16, 18, 22, 0.8);
        }
        .mw-handle {
          position: absolute; right: 3px; top: 12px; bottom: 12px; width: 3px;
          border-radius: 2px; background: var(--disabled-text-color, #9e9e9e);
        }
        .machine.open .mw-door { transform: rotateY(-58deg); }
        .mw-panel { position: absolute; right: 3px; top: 5px; bottom: 5px; width: 19px; }
        .mw-disp {
          position: absolute; left: 0; right: 0; top: 0; height: 10px; border-radius: 2px;
          background: #14161a; color: #ffd166; text-align: center;
          font: 600 6px/10px ui-monospace, "SF Mono", monospace;
        }
        .mw-keys {
          position: absolute; left: 0; right: 0; top: 14px;
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px;
        }
        .mw-keys i { display: block; height: 4px; border-radius: 1px; background: var(--divider-color, #bdbdbd); }
  `,
  hood: (color) => `
        .hd-chimney {
          position: absolute; left: 50%; transform: translateX(-50%); top: 2px; width: 26px; height: 32px;
          border-radius: 3px 3px 0 0; background: var(--ac-body, var(--secondary-background-color, #d7d7d7));
          border: 1px solid var(--divider-color, #c7c7c7);
        }
        .hd-canopy {
          position: absolute; left: 5px; right: 5px; top: 33px; height: 26px;
          background: var(--ac-body, var(--secondary-background-color, #d7d7d7));
          border-bottom: 1px solid var(--divider-color, #c7c7c7);
          clip-path: polygon(20% 0, 80% 0, 100% 100%, 0 100%);
        }
        .hd-under { position: absolute; left: 5px; right: 5px; top: 58px; height: 6px; border-radius: 0 0 3px 3px; background: #2b2f36; }
        .hd-lamp { position: absolute; top: 61px; width: 7px; height: 3px; border-radius: 2px; background: #4c525b; }
        .hd-lamp.l1 { left: 22px; }
        .hd-lamp.l2 { right: 22px; }
        .machine.lit .hd-lamp { background: #ffd166; box-shadow: 0 0 7px 1px #ffd166; }
        .hd-beam {
          position: absolute; top: 64px; width: 30px; height: 40px; opacity: 0;
          background: linear-gradient(to bottom, rgba(255, 209, 102, 0.4), rgba(255, 209, 102, 0));
          clip-path: polygon(34% 0, 66% 0, 100% 100%, 0 100%);
          transition: opacity 0.3s ease;
        }
        .hd-beam.b1 { left: 11px; }
        .hd-beam.b2 { right: 11px; }
        .machine.lit .hd-beam { opacity: 1; }
        .hd-air {
          position: absolute; width: 9px; height: 9px; bottom: 6px;
          border-top: 2px solid ${color}; border-left: 2px solid ${color};
          border-radius: 1px; opacity: 0;
        }
        .hd-air.a1 { left: 26px; }
        .hd-air.a2 { left: 44px; }
        .hd-air.a3 { left: 62px; }
        .machine.fan .hd-air { animation: hd-rise linear infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.fan .hd-air.a2 { animation-delay: calc(-0.45s + var(--anim-offset, 0s)); }
        .machine.fan .hd-air.a3 { animation-delay: calc(-0.9s + var(--anim-offset, 0s)); }
        .machine.v1 .hd-air { animation-duration: 2.4s; }
        .machine.v2 .hd-air { animation-duration: 1.5s; }
        .machine.v3 .hd-air { animation-duration: 1s; }
        .machine.boost .hd-air { animation-duration: 0.55s; border-color: var(--warning-color, #ff9800); }
        /* At the lowest speed a single chevron reads as "barely moving"; three would
           look the same as full speed to anyone glancing at the card. */
        .machine.v1 .hd-air.a1, .machine.v1 .hd-air.a3 { display: none; }
        @keyframes hd-rise {
          0% { transform: translateY(0) rotate(45deg); opacity: 0; }
          25% { opacity: 0.95; }
          100% { transform: translateY(-30px) rotate(45deg); opacity: 0; }
        }
  `,
  cooktop: () => `
        .ck-top {
          position: absolute; inset: 4px 1px; border-radius: 9px; background: #1a1c20;
          border: 1px solid var(--divider-color, #c7c7c7); box-shadow: inset 0 0 14px rgba(0, 0, 0, 0.55);
        }
        .ck-zones {
          position: absolute; left: 6px; right: 6px; top: 8px; bottom: 22px;
          display: grid; gap: 3px; align-items: center; justify-items: center;
        }
        .ck-zones.g1 { grid-template-columns: minmax(0, 1fr); }
        .ck-zones.g2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .ck-zones.g3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .ck-zone {
          width: 30px; height: 30px; box-sizing: border-box;
          border-radius: 50%; border: 1.5px solid #383d45;
          display: flex; align-items: center; justify-content: center; color: #4c525b;
          font: 600 11px/1 ui-monospace, "SF Mono", monospace;
        }
        .ck-zones.g3 .ck-zone { width: 22px; height: 22px; font-size: 9px; }
        .ck-zone.on {
          border-color: #ff7043; color: #ff7043;
          background: radial-gradient(circle, rgba(255, 112, 67, 0.42), transparent 70%);
          box-shadow: 0 0 11px rgba(255, 112, 67, 0.55);
          opacity: calc(0.5 + var(--zi, 1) * 0.5);
          animation: ck-ember 3s ease-in-out infinite; animation-delay: var(--anim-offset, 0s);
        }
        .ck-zone.max {
          border-color: #ff3d00; color: #ff3d00;
          background: radial-gradient(circle, rgba(255, 61, 0, 0.55), transparent 72%);
          box-shadow: 0 0 15px rgba(255, 61, 0, 0.7);
        }
        /* Powered off but still hot: the one thing a cooktop card is actually for. */
        .ck-zone.residual {
          border-color: #7a3b2c; color: #b1543d; background: none;
          box-shadow: none; animation: none; animation-delay: var(--anim-offset, 0s); opacity: 1;
        }
        @keyframes ck-ember { 0%, 100% { filter: brightness(0.85); } 50% { filter: brightness(1.12); } }
        .ck-ctrl { position: absolute; left: 12px; right: 22px; bottom: 10px; display: flex; gap: 5px; justify-content: center; }
        .ck-ctrl i { display: block; width: 11px; height: 3px; border-radius: 2px; background: #383d45; }
        .ck-ctrl i.act { background: #ff7043; box-shadow: 0 0 6px #ff7043; }
        .ck-lock {
          position: absolute; right: 8px; bottom: 8px; width: 9px; height: 7px;
          border-radius: 1px; background: var(--warning-color, #ff9800);
        }
        .ck-lock::before {
          content: ""; position: absolute; left: 2px; top: -4px; width: 5px; height: 5px;
          border: 1.5px solid var(--warning-color, #ff9800); border-bottom: none; border-radius: 3px 3px 0 0;
        }
  `,
  fridge: () => `
        .fr-body {
          position: absolute; left: 12px; right: 12px; top: 2px; bottom: 2px;
          border-radius: 8px;
          background: linear-gradient(100deg, var(--ac-body, var(--secondary-background-color, #d7d7d7)) 0%, var(--ac-body-hi, #e6e6e6) 45%, var(--ac-body, var(--secondary-background-color, #d7d7d7)) 100%);
          border: 1px solid var(--divider-color, #c7c7c7);
        }
        /* The open-door view needs its own stacking context and a perspective,
           so the panels can swing without dragging the whole card into 3D. */
        .fr-wrap { position: absolute; left: 12px; right: 12px; top: 2px; bottom: 2px; perspective: 320px; }
        .fr-split { position: absolute; background: var(--divider-color, #c7c7c7); }
        .fr-split.h { left: 3px; right: 3px; height: 2px; }
        .fr-split.v { top: 3px; bottom: 3px; width: 2px; }
        .fr-handle { position: absolute; width: 3px; border-radius: 2px; background: var(--disabled-text-color, #9e9e9e); }
        .fr-lcd {
          position: absolute; height: 11px; min-width: 22px; padding: 0 3px;
          border-radius: 2px; background: #14161a; color: #4fc3f7; text-align: center;
          font: 600 7px/11px ui-monospace, "SF Mono", monospace;
        }
        .fr-lcd.freeze { color: #90caf9; }
        .fr-lcd.warn { color: var(--error-color, #f44336); }
        .fr-disp {
          position: absolute; border-radius: 3px; background: #20242b;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.6);
        }
        .fr-cav {
          position: absolute; z-index: 0; border-radius: 6px; overflow: hidden;
          background: radial-gradient(ellipse at 60% 40%, rgba(255, 209, 102, 0.3), #1a1d22 72%);
        }
        .fr-shelf { position: absolute; left: 4px; right: 4px; height: 1.5px; border-radius: 1px; background: #4c525b; }
        .fr-glass {
          position: absolute; border-radius: 4px; overflow: hidden; border: 2px solid #3b4048;
          background: radial-gradient(ellipse at 50% 0%, rgba(255, 224, 178, 0.35), rgba(26, 29, 34, 0.92) 70%);
        }
        .fr-glass::after {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(115deg, transparent 32%, rgba(255, 255, 255, 0.16) 40%, transparent 48%);
        }
        .fr-glass.empty { background: rgba(26, 29, 34, 0.5); }
        .fr-cav.off, .fr-glass.off { background: #15171b; }
        .fr-cav.off .fr-rack, .fr-glass.off .fr-rack { filter: brightness(0.35); }
        .fr-racks { position: absolute; left: 8px; right: 17px; top: 21px; bottom: 9px; }
        .fr-rack {
          position: absolute; left: 50%; width: 45px; margin-left: -22.5px; height: 9px; border-bottom: 1.5px solid #8d6e63;
          background:
            radial-gradient(circle at 4.5px 4.5px, #8e2439 0 2.6px, #3a0d17 2.8px 3.8px, transparent 4px) 0 0 / 18px 9px repeat-x,
            radial-gradient(circle at 13.5px 4.5px, #4a7a3f 0 2.6px, #13240f 2.8px 3.8px, transparent 4px) 0 0 / 18px 9px repeat-x;
        }
        .fr-door {
          position: absolute; z-index: 1; border-radius: 6px;
          background: linear-gradient(100deg, var(--ac-body, var(--secondary-background-color, #d7d7d7)), var(--ac-body-hi, #e6e6e6));
          border: 1px solid var(--divider-color, #c7c7c7);
          transform-origin: left center; transition: transform 0.45s ease;
        }
        /* An open door has to paint over the one below it: left to DOM order it
           would slide behind its neighbour instead. */
        .fr-door.swung { z-index: 3; transform: rotateY(-74deg); }
        /* Hinge on the outer edge, so on a side-by-side the right-hand door
           opens to the right rather than folding across the left one. */
        .fr-door.hinge-right { transform-origin: right center; }
        .fr-door.hinge-right.swung { transform: rotateY(74deg); }
        .fr-icebox { position: absolute; overflow: hidden; }
        .fr-cube { position: absolute; width: 5px; height: 5px; border-radius: 1px; background: #4fc3f7; opacity: 0; }
        .machine.ice .fr-cube { animation: fr-fall 1.8s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.ice .fr-cube.c2 { animation-delay: calc(-0.6s + var(--anim-offset, 0s)); }
        .machine.ice .fr-cube.c3 { animation-delay: calc(-1.2s + var(--anim-offset, 0s)); }
        /* Configured but not producing: the cubes stay, greyed, so the card
           still shows there is an ice maker. */
        .fr-icebox.off .fr-cube { opacity: 0.22; background: var(--disabled-text-color, #9e9e9e); animation: none; animation-delay: var(--anim-offset, 0s); }
        @keyframes fr-fall {
          0% { transform: translateY(0); opacity: 0; }
          15%, 80% { opacity: 0.95; }
          100% { transform: translateY(19px); opacity: 0; }
        }
  `,
  water_heater: () => `
        .wh-bracket { position: absolute; left: 40px; right: 40px; top: 1px; height: 5px; border-radius: 2px; background: #3b4048; }
        .wh-tank {
          position: absolute; left: 23px; right: 23px; top: 4px; bottom: 15px;
          border-radius: 25px / 14px; overflow: hidden;
          background: linear-gradient(90deg, var(--ac-body-lo, #aeb2b5), var(--ac-body, var(--secondary-background-color, #d7d7d7)) 30%,
            var(--ac-body-hi, #e6e6e6) 50%, var(--ac-body, var(--secondary-background-color, #d7d7d7)) 72%, var(--ac-body-lo, #aeb2b5));
          border: 1px solid var(--divider-color, #c7c7c7);
        }
        .wh-glass {
          position: absolute; left: 8px; right: 8px; top: 13px; bottom: 10px; border-radius: 7px; overflow: hidden;
          background: rgba(20, 24, 30, 0.10); box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.14);
        }
        .wh-water { position: absolute; inset: 0; background: rgba(79, 195, 247, 0.38); }
        .wh-hot {
          position: absolute; left: 0; right: 0; top: 0; height: calc(var(--wh-hot, 0) * 100%);
          background: linear-gradient(180deg, rgba(255, 87, 51, 0.72), rgba(255, 138, 60, 0.42));
          transition: height 1s ease;
        }
        .wh-lcd {
          position: absolute; left: 50%; transform: translateX(-50%); top: 22px; z-index: 3;
          height: 11px; min-width: 22px; padding: 0 3px; border-radius: 2px;
          background: #14161a; color: #4fc3f7; text-align: center;
          font: 600 7px/11px ui-monospace, "SF Mono", monospace;
        }
        .machine.heating .wh-lcd { color: #ff7043; }
        /* The element: a hairpin at the foot of the tank, where a real one sits.
           border-box, or the borders push it off the tank's axis. */
        .wh-coil {
          position: absolute; left: 50%; bottom: -3px; z-index: 2;
          box-sizing: border-box; width: 18px; height: 19px; margin-left: -9px;
          border: 3px solid #5f6770; border-bottom: none; border-radius: 7px 7px 0 0;
        }
        .machine.heating .wh-coil {
          border-color: #ff3d00;
          animation: wh-glow 1.2s ease-in-out infinite; animation-delay: var(--anim-offset, 0s);
        }
        @keyframes wh-glow {
          0%, 100% { box-shadow: 0 0 5px 1px rgba(255, 61, 0, 0.55), inset 0 0 3px rgba(255, 61, 0, 0.5); }
          50% { box-shadow: 0 0 10px 3px rgba(255, 61, 0, 0.9), inset 0 0 5px rgba(255, 61, 0, 0.8); }
        }
        .wh-heat { position: absolute; inset: 0; z-index: 1; opacity: 0; pointer-events: none; }
        .machine.heating .wh-heat { opacity: 1; }
        .wh-heat i {
          position: absolute; bottom: 6px; width: 11px; height: 32px; margin-left: -5.5px; opacity: 0;
          background: linear-gradient(180deg, rgba(255, 112, 67, 0), rgba(255, 112, 67, 0.85) 45%, rgba(255, 61, 0, 0.95));
          clip-path: polygon(63% 0%, 79% 7%, 90% 14%, 93% 21%, 86% 29%, 73% 36%, 56% 43%, 42% 50%, 34% 57%, 35% 64%, 44% 71%, 60% 79%, 76% 86%, 88% 93%, 93% 100%, 67% 100%, 62% 93%, 50% 86%, 34% 79%, 18% 71%, 9% 64%, 8% 57%, 16% 50%, 30% 43%, 47% 36%, 60% 29%, 67% 21%, 64% 14%, 53% 7%, 37% 0%);
        }
        .wh-heat i.wh-h1 { left: 22%; }
        .wh-heat i.wh-h2 { left: 50%; }
        .wh-heat i.wh-h3 { left: 78%; }
        .machine.heating .wh-heat i { animation: wh-rise 2.4s ease-in infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.heating .wh-heat i.wh-h2 { animation-delay: calc(-0.8s + var(--anim-offset, 0s)); }
        .machine.heating .wh-heat i.wh-h3 { animation-delay: calc(-1.6s + var(--anim-offset, 0s)); }
        @keyframes wh-rise {
          0% { transform: translateY(6px); opacity: 0; }
          25% { opacity: 0.9; }
          100% { transform: translateY(-30px); opacity: 0; }
        }
        .wh-pipe { position: absolute; bottom: 3px; width: 4px; height: 14px; border-radius: 0 0 2px 2px; }
        .wh-pipe.cold { left: 37px; background: #5aa9d6; }
        .wh-pipe.hot { right: 37px; background: #d9674a; }
  `,
  boiler: () => `
        .bl-box {
          position: absolute; left: 27px; right: 27px; top: 2px; height: 58px; border-radius: 5px;
          background: linear-gradient(160deg, var(--ac-body-hi, #e6e6e6), var(--ac-body, var(--secondary-background-color, #d7d7d7)) 45%, var(--ac-body-lo, #aeb2b5));
          border: 1px solid var(--divider-color, #c7c7c7);
        }
        .bl-lcd {
          position: absolute; left: 50%; transform: translateX(-50%); top: 6px;
          height: 10px; min-width: 20px; padding: 0 3px; border-radius: 2px;
          background: #14161a; color: #4fc3f7; text-align: center;
          font: 600 7px/10px ui-monospace, "SF Mono", monospace;
        }
        .machine.flame .bl-lcd { color: #ff7043; }
        .bl-window {
          position: absolute; left: 50%; top: 24px; width: 20px; height: 22px; margin-left: -10px;
          border-radius: 4px; background: #14161a; overflow: hidden;
        }
        .bl-flame {
          position: absolute; left: 50%; bottom: 2px; width: 14px; height: 18px; margin-left: -7px;
          transform-origin: 50% 100%; opacity: 0;
          background: linear-gradient(0deg, #2979ff 0%, #42a5f5 14%, #ffca28 34%, #ff9800 62%, #ff5722 100%);
          clip-path: polygon(46% 0%, 58% 30%, 70% 10%, 76% 44%, 90% 28%, 94% 64%, 86% 88%, 66% 100%, 34% 100%, 14% 88%, 6% 62%, 12% 32%, 26% 50%, 30% 18%, 42% 36%);
        }
        .machine.flame .bl-flame { opacity: 1; animation: bl-flicker 0.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-starting .bl-flame { width: 8px; height: 10px; margin-left: -4px; }
        @keyframes bl-flicker {
          0%, 100% { transform: scale(1, 1); }
          30% { transform: scale(0.92, 1.1); }
          60% { transform: scale(1.06, 0.9); }
        }
        .bl-pipe { position: absolute; background: #8a9096; }
        .bl-pipe.tap-down { left: 33px; top: 60px; width: 4px; height: 12px; }
        .bl-pipe.tap-arm { left: 12px; top: 70px; width: 25px; height: 4px; border-radius: 2px 0 0 2px; }
        .bl-pipe.tap-nose { left: 12px; top: 70px; width: 4px; height: 9px; border-radius: 2px 2px 1px 1px; }
        .bl-knob { position: absolute; left: 20px; top: 65px; width: 8px; height: 5px; border-radius: 2px 2px 0 0; background: #d9674a; }
        .bl-drop {
          position: absolute; left: 12px; top: 80px; width: 4px; height: 6px; opacity: 0;
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; background: #4fc3f7;
        }
        .machine.mode-hot_water .bl-pipe.tap-down,
        .machine.mode-hot_water .bl-pipe.tap-arm,
        .machine.mode-hot_water .bl-pipe.tap-nose { background: #ef5350; }
        .machine.mode-hot_water .bl-drop { animation: bl-drip 0.9s ease-in infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-hot_water .bl-drop.d2 { animation-delay: calc(-0.3s + var(--anim-offset, 0s)); }
        .machine.mode-hot_water .bl-drop.d3 { animation-delay: calc(-0.6s + var(--anim-offset, 0s)); }
        @keyframes bl-drip {
          0% { transform: translateY(0); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateY(24px); opacity: 0; }
        }
        .bl-pipe.rad-down { left: 59px; top: 60px; width: 4px; height: 30px; }
        .bl-pipe.rad-arm { left: 59px; top: 86px; width: 9px; height: 4px; }
        .bl-rad { position: absolute; left: 67px; right: 1px; top: 76px; height: 29px; }
        .bl-rad i {
          position: absolute; top: 0; bottom: 0; width: 5px; border-radius: 2px;
          background: var(--ac-body-lo, #aeb2b5); box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
        }
        .bl-rad i:nth-child(1) { left: 0; }
        .bl-rad i:nth-child(2) { left: 7px; }
        .bl-rad i:nth-child(3) { left: 14px; }
        .bl-rad i:nth-child(4) { left: 21px; }
        .machine.mode-space_heating .bl-pipe.rad-down,
        .machine.mode-space_heating .bl-pipe.rad-arm { background: #ff7043; }
        .machine.mode-space_heating .bl-rad i { background: linear-gradient(180deg, #ffab91, #ff7043); }
        .bl-waves { position: absolute; left: 67px; right: 1px; top: 48px; height: 28px; overflow: hidden; pointer-events: none; }
        .bl-waves i {
          position: absolute; bottom: 0; width: 8px; height: 24px; opacity: 0;
          background: linear-gradient(180deg, rgba(255, 112, 67, 0), rgba(255, 112, 67, 0.85) 45%, rgba(255, 87, 34, 0.95));
          clip-path: polygon(63% 0%, 79% 7%, 90% 14%, 93% 21%, 86% 29%, 73% 36%, 56% 43%, 42% 50%, 34% 57%, 35% 64%, 44% 71%, 60% 79%, 76% 86%, 88% 93%, 93% 100%, 67% 100%, 62% 93%, 50% 86%, 34% 79%, 18% 71%, 9% 64%, 8% 57%, 16% 50%, 30% 43%, 47% 36%, 60% 29%, 67% 21%, 64% 14%, 53% 7%, 37% 0%);
        }
        .bl-waves i.w1 { left: 0; }
        .bl-waves i.w2 { left: 10px; }
        .bl-waves i.w3 { left: 20px; }
        .machine.mode-space_heating .bl-waves i { animation: bl-rise 2.4s ease-in infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-space_heating .bl-waves i.w2 { animation-delay: calc(-0.8s + var(--anim-offset, 0s)); }
        .machine.mode-space_heating .bl-waves i.w3 { animation-delay: calc(-1.6s + var(--anim-offset, 0s)); }
        @keyframes bl-rise {
          0% { transform: translateY(18px); opacity: 0; }
          30% { opacity: 0.9; }
          100% { transform: translateY(-8px); opacity: 0; }
        }
  `,
  heat_pump: () => `
        .hp-unit {
          position: absolute; left: 2px; right: 2px; top: 4px; height: 60px; border-radius: 5px;
          background: linear-gradient(160deg, var(--ac-body-hi, #e6e6e6), var(--ac-body, var(--secondary-background-color, #d7d7d7)) 45%, var(--ac-body-lo, #aeb2b5));
          border: 1px solid var(--divider-color, #c7c7c7);
        }
        .hp-grille {
          position: absolute; left: 5px; top: 5px; width: 48px; height: 48px; border-radius: 50%;
          background: #14161a; overflow: hidden; box-shadow: 0 0 0 2px var(--ac-body-lo, #aeb2b5);
        }
        .hp-fan {
          position: absolute; inset: 5px; border-radius: 50%;
          background: conic-gradient(#6b737c 0 16%, transparent 16% 33.3%, #6b737c 33.3% 49.3%, transparent 49.3% 66.6%, #6b737c 66.6% 82.6%, transparent 82.6%);
        }
        .hp-hub { position: absolute; left: 50%; top: 50%; width: 9px; height: 9px; margin: -4.5px 0 0 -4.5px; border-radius: 50%; background: #8a9096; }
        .hp-guard { position: absolute; inset: 0; border-radius: 50%; background: repeating-radial-gradient(circle, transparent 0 5px, rgba(255, 255, 255, 0.14) 5px 6px); }
        .hp-frost { position: absolute; inset: 0; border-radius: 50%; opacity: 0; background: radial-gradient(circle, rgba(225, 245, 254, 0.15) 35%, rgba(225, 245, 254, 0.9) 100%); }
        .hp-side { position: absolute; left: 58px; right: 4px; top: 5px; bottom: 5px; }
        .hp-lcd {
          position: absolute; left: 0; right: 0; top: 0; height: 10px; border-radius: 2px;
          background: #14161a; color: #4fc3f7; text-align: center; font: 600 7px/10px ui-monospace, "SF Mono", monospace;
        }
        .hp-fins { position: absolute; left: 0; right: 0; top: 14px; bottom: 0; background: repeating-linear-gradient(180deg, var(--ac-body-lo, #aeb2b5) 0 1px, transparent 1px 4px); }
        .hp-foot { position: absolute; top: 65px; width: 10px; height: 4px; border-radius: 0 0 2px 2px; background: #3b4048; }
        .hp-foot.f1 { left: 6px; }
        .hp-foot.f2 { right: 6px; }
        /* Two pipes a circuit, the flow and the return. */
        .hp-pipe { position: absolute; top: 66px; width: 3px; height: 14px; background: #8a9096; overflow: hidden; }
        .hp-pipe.tank.flow { left: 20px; }
        .hp-pipe.tank.ret { left: 25px; }
        .hp-pipe.rad.flow { left: 62px; }
        .hp-pipe.rad.ret { left: 67px; }
        .hp-tank {
          position: absolute; left: 12px; top: 78px; width: 24px; height: 28px; border-radius: 8px / 5px; overflow: hidden;
          background: linear-gradient(90deg, var(--ac-body-lo, #aeb2b5), var(--ac-body, var(--secondary-background-color, #d7d7d7)) 35%, var(--ac-body-hi, #e6e6e6) 55%, var(--ac-body-lo, #aeb2b5));
          border: 1px solid var(--divider-color, #c7c7c7);
        }
        .hp-tank i { position: absolute; left: 0; right: 0; bottom: 0; height: 0; background: linear-gradient(180deg, rgba(255, 87, 51, 0.75), rgba(255, 138, 60, 0.45)); }
        .hp-rad { position: absolute; left: 58px; right: 2px; top: 80px; height: 26px; }
        .hp-rad i {
          position: absolute; top: 0; bottom: 0; width: 5px; border-radius: 2px;
          background: var(--ac-body-lo, #aeb2b5); box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
        }
        .hp-rad i:nth-child(1) { left: 0; }
        .hp-rad i:nth-child(2) { left: 7px; }
        .hp-rad i:nth-child(3) { left: 14px; }
        .hp-rad i:nth-child(4) { left: 21px; }
        .hp-rad i:nth-child(5) { left: 28px; }
        /* Underfloor heating as its symbol draws it (mdi:heating-coil): a pipe
           snaking across a slab seen from above at an angle, and the heat
           rising off it. The coil is drawn flat in a square and laid down at
           the slab's angle, so its runs lean exactly like the slab's edges. */
        .hp-floor { position: absolute; left: 56px; right: 2px; top: 78px; height: 28px; }
        .hp-slab { position: absolute; left: -2px; right: -2px; bottom: 2px; height: 15px; }
        .hp-coil {
          position: absolute; left: 50%; top: 50%; width: 30px; height: 30px; margin: -15px 0 0 -15px;
          background: var(--ac-body-lo, #9aa0a6); transform: scaleY(0.357) rotate(45deg);
        }
        /* Four runs and three bends, one bend a box: its two long borders are
           two runs, and its rounded side the bend between them. */
        .hp-coil b {
          position: absolute; left: 3px; right: 3px; height: 10px; box-sizing: border-box;
          border: 3px solid #6b737c; border-left: 0; border-radius: 0 5px 5px 0;
        }
        .hp-coil b:nth-child(1) { top: 2px; }
        .hp-coil b:nth-child(2) { top: 9px; border-left: 3px solid #6b737c; border-right: 0; border-radius: 5px 0 0 5px; }
        .hp-coil b:nth-child(3) { top: 16px; }
        .hp-floor i {
          position: absolute; bottom: 17px; width: 6px; height: 13px; opacity: 0;
          background: linear-gradient(180deg, rgba(255, 183, 77, 0), rgba(255, 138, 60, 0.95));
          clip-path: polygon(63% 0%, 79% 7%, 90% 14%, 93% 21%, 86% 29%, 73% 36%, 56% 43%, 42% 50%, 34% 57%, 35% 64%, 44% 71%, 60% 79%, 76% 86%, 88% 93%, 93% 100%, 67% 100%, 62% 93%, 50% 86%, 34% 79%, 18% 71%, 9% 64%, 8% 57%, 16% 50%, 30% 43%, 47% 36%, 60% 29%, 67% 21%, 64% 14%, 53% 7%, 37% 0%);
        }
        .hp-floor i:nth-child(1) { left: 9px; }
        .hp-floor i:nth-child(2) { left: 19px; height: 16px; }
        .hp-floor i:nth-child(3) { left: 29px; height: 11px; }
        .machine.mode-space_heating .hp-floor i { animation: hp-rise 2.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-space_heating .hp-floor i:nth-child(2) { animation-delay: calc(-0.87s + var(--anim-offset, 0s)); }
        .machine.mode-space_heating .hp-floor i:nth-child(3) { animation-delay: calc(-1.74s + var(--anim-offset, 0s)); }
        @keyframes hp-rise {
          0% { opacity: 0; transform: translateY(5px) scaleY(0.75); }
          35% { opacity: 0.85; }
          100% { opacity: 0; transform: translateY(-9px) scaleY(1.1); }
        }
        /* The pipes drop onto the near edge of the slab. */
        .machine.underfloor .hp-pipe.rad.flow { left: 54px; height: 30px; }
        .machine.underfloor .hp-pipe.rad.ret { left: 59px; height: 28px; }
        /* With no tank on the left, what is left stands in the middle. */
        .machine.no-tank .hp-pipe.rad.flow { left: 35px; }
        .machine.no-tank .hp-pipe.rad.ret { left: 40px; }
        .machine.no-tank .hp-rad { left: 31px; right: 29px; }
        .machine.no-tank .hp-floor { left: 31px; right: 27px; }
        .machine.no-tank.underfloor .hp-pipe.rad.flow { left: 29px; }
        .machine.no-tank.underfloor .hp-pipe.rad.ret { left: 34px; }
        .machine.fan .hp-fan { animation: hp-spin 1.1s linear infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes hp-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .machine.mode-space_heating .hp-lcd,
        .machine.mode-hot_water .hp-lcd { color: #ff7043; }
        /* Out hot and back cooler while it heats, out cold and back warmer
           while it cools: the two colours say which way the heat goes. */
        .machine.mode-space_heating .hp-pipe.rad.flow { background: #ff7043; }
        .machine.mode-space_heating .hp-pipe.rad.ret,
        .machine.mode-hot_water .hp-pipe.tank.ret { background: #4fc3f7; }
        .machine.mode-space_heating .hp-rad i { background: linear-gradient(180deg, #ffab91, #ff7043); animation: hp-glow 1.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-hot_water .hp-pipe.tank.flow { background: #ef5350; }
        .machine.mode-hot_water .hp-tank i { height: 100%; animation: hp-glow 1.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-space_heating .hp-coil { background: #ffe0d6; }
        .machine.mode-space_heating .hp-coil b { border-color: #ff7043; }
        .machine.mode-cooling .hp-pipe.rad.flow { background: #29b6f6; }
        .machine.mode-cooling .hp-pipe.rad.ret { background: #ff8a65; }
        .machine.mode-cooling .hp-rad i { background: linear-gradient(180deg, #b3e5fc, #29b6f6); }
        .machine.mode-cooling .hp-coil { background: #d8f1fd; }
        .machine.mode-cooling .hp-coil b { border-color: #29b6f6; }
        /* The water itself: light dashes running down the flow pipe and back
           up the return, on the circuit the pump is working. */
        .machine.flowing.mode-hot_water .hp-pipe.tank::after,
        .machine.flowing.mode-space_heating .hp-pipe.rad::after,
        .machine.flowing.mode-cooling .hp-pipe.rad::after {
          content: ""; position: absolute; inset: 0;
          background: repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0 2px, transparent 2px 6px);
          animation: hp-flow 0.8s linear infinite; animation-delay: var(--anim-offset, 0s);
        }
        .machine.flowing .hp-pipe.ret::after { animation-direction: reverse; }
        @keyframes hp-flow { from { background-position: 0 0; } to { background-position: 0 6px; } }
        @keyframes hp-glow { 0%, 100% { filter: brightness(0.9); } 50% { filter: brightness(1.15); } }
        .machine.mode-defrost .hp-frost { animation: hp-frost 2.4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-defrost .hp-fins { background: repeating-linear-gradient(180deg, #b3e5fc 0 1px, transparent 1px 4px); }
        @keyframes hp-frost { 0%, 100% { opacity: 0.35; } 50% { opacity: 0.9; } }
  `,
  pet_feeder: () => `
        /* Flat and face on, the way a feeder is always drawn: the lid, the
           hopper with its heap of kibble, the dark block that serves, and the
           bowl with a heap of its own. */
        /* Lid, dispenser and foot are the moulded shell, so they are what the
           appliance colour paints. Dark by default, which is how these
           machines are sold when they are not white. */
        .pf-lid {
          position: absolute; left: 14px; right: 14px; top: 3px; height: 7px; border-radius: 2px;
          background: var(--ac-body-lo, #343a40);
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.10);
        }
        /* The hopper and the bowl are clear plastic on every one of these
           machines, black body or white: they keep their own light tint rather
           than following the appliance colour, or a black feeder would show
           black kibble in a black tank. */
        .pf-body {
          position: absolute; left: 16px; right: 16px; top: 10px; height: 36px; overflow: hidden;
          background: linear-gradient(100deg, #f2f3f4, #e2e4e6);
          clip-path: polygon(0 0, 100% 0, 86% 100%, 14% 100%);
        }
        /* A heap, not a pattern: a block of kibble with a bumpy top. */
        .pf-heap { position: absolute; left: 0; right: 0; bottom: 0; height: var(--pf-fill, 12px); background: #8d6e63; }
        /* Nothing left to serve: the hopper is drawn empty, which is the whole
           point of saying so. */
        .machine.empty .pf-heap { display: none; }
        .pf-heap::before {
          content: ""; position: absolute; left: 0; right: 0; top: -4px; height: 9px;
          background: radial-gradient(circle at 4.5px 4.5px, #8d6e63 4.3px, transparent 4.7px) repeat-x;
          background-size: 9px 9px;
        }
        .pf-unit {
          position: absolute; left: 23px; right: 23px; top: 45px; height: 32px; border-radius: 3px;
          background: var(--ac-body, #343a40);
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.10);
        }
        .pf-unit i {
          position: absolute; left: 6px; right: 6px; bottom: 4px; height: 8px; border-radius: 2px;
          background: #1b1e23;
        }
        .pf-bowl {
          position: absolute; left: 25px; right: 25px; bottom: 11px; height: 20px; overflow: hidden;
          background: var(--ac-body-lo, #22262a); box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.10);
          clip-path: polygon(0 0, 100% 0, 84% 100%, 16% 100%);
        }
        .pf-dish { position: absolute; left: 2px; right: 2px; bottom: 0; height: 12px; background: #8d6e63; }
        .pf-dish::before {
          content: ""; position: absolute; left: 0; right: 0; top: -4px; height: 9px;
          background: radial-gradient(circle at 4.5px 4.5px, #8d6e63 4.3px, transparent 4.7px) repeat-x;
          background-size: 9px 9px;
        }
        .pf-base {
          position: absolute; left: 19px; right: 19px; bottom: 4px; height: 6px; border-radius: 2px;
          background: var(--ac-body-lo, #343a40); box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.10);
        }
        /* The cat, when there is something to be cross about: an empty tank or a
           jam. Its proportions are the ones every grumpy cat is drawn with: a
           head that takes half the height and nearly all the width, a small
           body tucked under it, and the tail curled round the front. */
        .pf-cat { position: absolute; left: 0; bottom: 3px; width: 42px; height: 44px; }
        .pf-cat .body {
          position: absolute; left: 9px; bottom: 0; width: 24px; height: 17px;
          border-radius: 12px 12px 9px 9px; background: #e7dbcf;
        }
        .pf-cat .paw {
          position: absolute; bottom: 0; width: 8px; height: 5px; border-radius: 4px 4px 3px 3px;
          background: #f6efe6;
        }
        .pf-cat .paw.l { left: 13px; }
        .pf-cat .paw.r { right: 13px; }
        .pf-cat .head {
          position: absolute; left: 1px; bottom: 12px; width: 40px; height: 30px;
          border-radius: 50% 50% 46% 46% / 46% 46% 54% 54%; background: #efe5da;
        }
        /* Small ears, set wide and tilted out, with the darker point a seal
           point cat carries. */
        .pf-cat .ear {
          position: absolute; bottom: 34px; width: 12px; height: 11px; background: #a1887f;
          clip-path: polygon(50% 0, 100% 100%, 0 100%);
        }
        .pf-cat .ear span {
          position: absolute; left: 50%; bottom: 0; width: 6px; height: 6px; margin-left: -3px;
          background: #d8b7ad; clip-path: polygon(50% 0, 100% 100%, 0 100%);
        }
        .pf-cat .ear.l { left: 0; transform: rotate(-18deg); }
        .pf-cat .ear.r { right: 0; transform: rotate(18deg); }
        /* The lids do the sulking: thick, level, and low over the eye. */
        /* The eye is a low almond, and most of it is lid: on a grumpy cat the
           open part is a slit, which is what makes the stare. */
        .pf-cat .eye {
          position: absolute; top: 10px; width: 11px; height: 7px; border-radius: 1px 1px 5px 5px;
          background: #bcd6e6; border-top: 4px solid #4a4a46; overflow: hidden;
        }
        /* A big pupil, cut off at the top by the lid: on both drawings it takes
           most of what the eye still shows. */
        .pf-cat .eye span {
          position: absolute; left: 50%; top: -1px; width: 6px; height: 6px; margin-left: -3px;
          border-radius: 50%; background: #3a3f45;
        }
        .pf-cat .eye.l { left: 5px; transform: rotate(7deg); }
        .pf-cat .eye.r { right: 5px; transform: rotate(-7deg); }
        .pf-cat .muzzle {
          position: absolute; left: 50%; bottom: 2px; width: 21px; height: 13px; margin-left: -10.5px;
          border-radius: 50%; background: #faf4ec;
        }
        .pf-cat .nose {
          position: absolute; left: 50%; bottom: 8px; width: 5px; height: 4px; margin-left: -2.5px;
          background: #c98f8f; clip-path: polygon(50% 100%, 100% 0, 0 0);
        }
        .pf-cat .mouth {
          position: absolute; bottom: 3px; width: 7px; height: 5px;
          border-top: 1.8px solid #7a675d; border-radius: 50%;
        }
        .pf-cat .mouth.l { left: 50%; margin-left: -7px; }
        .pf-cat .mouth.r { left: 50%; margin-left: 0; }
        .pf-cat .whisk {
          position: absolute; bottom: 8px; width: 12px; height: 1px; border-radius: 1px;
          background: rgba(122, 103, 93, 0.5);
        }
        .pf-cat .whisk.l { left: -5px; transform: rotate(9deg); box-shadow: 1px 4px 0 0 rgba(122, 103, 93, 0.4); }
        .pf-cat .whisk.r { right: -5px; transform: rotate(-9deg); box-shadow: -1px 4px 0 0 rgba(122, 103, 93, 0.4); }
        /* The tail comes round the front, as a sitting cat lays it. */
        .pf-cat .tail {
          position: absolute; left: -3px; bottom: -1px; width: 17px; height: 13px;
          border: 4.5px solid #d9ccbf; border-top-color: transparent; border-right-color: transparent;
          border-radius: 0 0 0 12px;
        }
        /* The warning sits straight above its head: the two say the same thing,
           so they are read together. */
        .pf-alert { position: absolute; left: 12px; top: 38px; width: 18px; height: 16px; }
        .pf-alert::before {
          content: ""; position: absolute; inset: 0; background: var(--error-color, #f44336);
          clip-path: polygon(50% 0, 100% 100%, 0 100%);
        }
        .pf-alert i { position: absolute; left: 50%; background: #fff; }
        .pf-alert .bar { top: 5.5px; width: 2.5px; height: 5px; margin-left: -1.25px; border-radius: 1.25px; }
        .pf-alert .dot { top: 12px; width: 2.5px; height: 2.5px; margin-left: -1.25px; border-radius: 50%; }
        .pf-fall { position: absolute; inset: 0; }
        .pf-fall i {
          position: absolute; left: 46px; top: 78px; width: 4px; height: 4px; border-radius: 50%;
          background: #8d6e63; opacity: 0;
        }
        .machine.feeding .pf-fall i { animation: pf-fall 0.8s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.feeding .pf-fall i:nth-child(2) { animation-delay: calc(-0.27s + var(--anim-offset, 0s)); }
        .machine.feeding .pf-fall i:nth-child(3) { animation-delay: calc(-0.54s + var(--anim-offset, 0s)); }
        @keyframes pf-fall {
          0% { opacity: 0; transform: translateY(0); }
          20% { opacity: 1; }
          85% { opacity: 1; }
          100% { opacity: 0; transform: translateY(7px); }
        }
        /* The other family: a round tank of smoked plastic on a round base,
           the buttons and the chute on its front, and the bowl set down in
           front of it rather than built in. White by default, the way these
           are sold. */
        .pfc-lid {
          position: absolute; left: 17px; right: 17px; top: 6px; height: 8px; border-radius: 4px 4px 2px 2px;
          background: var(--ac-body-hi, #ffffff); box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
        }
        .pfc-tank {
          position: absolute; left: 20px; right: 20px; top: 12px; height: 42px; overflow: hidden;
          border-radius: 2px 2px 10px 10px; background: #c9ced3;
        }
        .pfc-heap { position: absolute; left: 0; right: 0; bottom: 0; height: var(--pf-fill, 16px); background: #8d6e63; }
        .pfc-heap::before {
          content: ""; position: absolute; left: 0; right: 0; top: -4px; height: 9px;
          background: radial-gradient(circle at 4.5px 4.5px, #8d6e63 4.3px, transparent 4.7px) repeat-x;
          background-size: 9px 9px;
        }
        .machine.empty .pfc-heap { display: none; }
        /* The smoked plastic in front of the kibble, rounder at the sides. */
        .pfc-tank::after {
          content: ""; position: absolute; inset: 0; border-radius: inherit;
          background: linear-gradient(90deg, rgba(60, 66, 72, 0.30), rgba(255, 255, 255, 0.22) 38%, rgba(255, 255, 255, 0.05) 60%, rgba(60, 66, 72, 0.34));
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.10);
        }
        .pfc-base {
          position: absolute; left: 26px; right: 26px; top: 50px; bottom: 6px; border-radius: 3px 3px 7px 7px;
          background: linear-gradient(90deg, var(--ac-body-lo, #d8dcde), var(--ac-body-hi, #ffffff) 40%, var(--ac-body, #f1f3f4) 70%, var(--ac-body-lo, #d8dcde));
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.10);
        }
        .pfc-panel {
          position: absolute; left: 10px; right: 10px; top: 7px; height: 11px; border-radius: 5px;
          background: var(--ac-body-lo, #d8dcde);
        }
        .pfc-panel i {
          position: absolute; top: 2px; width: 6px; height: 7px; border-radius: 3px;
          background: var(--ac-body-hi, #ffffff); box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.18);
        }
        .pfc-panel i:first-child { left: 4px; }
        .pfc-panel i:last-child { right: 4px; }
        .pfc-chute {
          position: absolute; left: 11px; right: 11px; top: 21px; height: 8px; border-radius: 2px 2px 3px 3px;
          background: #1b1e23;
        }
        /* The bowl, apart and in front, with its kibble heaped over the rim. */
        .pfc-bowl {
          position: absolute; left: 5px; width: 52px; bottom: 3px; height: 17px;
          background: linear-gradient(180deg, var(--ac-body-lo, #d8dcde) 0 2px, var(--ac-body-hi, #ffffff) 2px, var(--ac-body, #f1f3f4) 70%, var(--ac-body-lo, #d8dcde));
          clip-path: polygon(0 0, 100% 0, 86% 100%, 14% 100%);
        }
        .pfc-dish { position: absolute; left: 10px; width: 42px; bottom: 16px; height: 6px; background: #8d6e63; }
        .pfc-dish::before {
          content: ""; position: absolute; left: 0; right: 0; top: -4px; height: 9px;
          background: radial-gradient(circle at 4.5px 4.5px, #8d6e63 4.3px, transparent 4.7px) repeat-x;
          background-size: 9px 9px;
        }
        /* The kibble leaves the dark mouth and lands on the heap in the bowl,
           just above its rim: a longer fall than the tower's. */
        .machine.canister .pf-fall i { left: 44px; top: 73px; }
        .machine.canister.feeding .pf-fall i { animation-name: pfc-fall; }
        @keyframes pfc-fall {
          0% { opacity: 0; transform: translateY(0); }
          20% { opacity: 1; }
          85% { opacity: 1; }
          100% { opacity: 0; transform: translateY(10px); }
        }
        .machine.canister .pf-cat { left: auto; right: 0; }
        .machine.canister .pf-alert { left: auto; right: 12px; }
  `,
  kettle: () => `
        .kt-base { position: absolute; left: 20px; right: 20px; bottom: 6px; height: 7px; border-radius: 3px; background: #3b4048; }
        .kt-body {
          position: absolute; left: 24px; right: 24px; top: 26px; bottom: 13px;
          background: var(--ac-body, var(--secondary-background-color, #d7d7d7));
          border: 1px solid var(--divider-color, #c7c7c7);
          border-radius: 4px 4px 10px 10px;
          clip-path: polygon(12% 0, 88% 0, 100% 100%, 0 100%); overflow: hidden;
        }
        .kt-water { position: absolute; left: 0; right: 0; bottom: 0; height: 52%; background: rgba(79, 195, 247, 0.34); }
        .kt-lcd {
          position: absolute; left: 50%; transform: translateX(-50%); top: 38px; z-index: 2;
          height: 11px; min-width: 24px; padding: 0 3px; border-radius: 2px;
          background: #14161a; color: #ff7043; text-align: center;
          font: 600 7px/11px ui-monospace, "SF Mono", monospace;
        }
        .kt-lid {
          position: absolute; left: 34px; right: 34px; top: 20px; height: 7px; border-radius: 3px;
          background: var(--ac-body, var(--secondary-background-color, #d7d7d7)); border: 1px solid var(--divider-color, #c7c7c7);
        }
        .kt-knob {
          position: absolute; left: 50%; transform: translateX(-50%); top: 15px; width: 9px; height: 5px;
          border-radius: 3px 3px 0 0; background: var(--disabled-text-color, #9e9e9e);
        }
        .kt-spout {
          position: absolute; left: 13px; top: 30px; width: 0; height: 0;
          border-left: 11px solid transparent;
          border-bottom: 9px solid var(--ac-body, var(--secondary-background-color, #d7d7d7));
          filter: drop-shadow(-1px 0 0 var(--divider-color, #c7c7c7));
        }
        .kt-handle {
          position: absolute; right: 8px; top: 30px; width: 17px; height: 40px;
          border: 3px solid var(--ac-body, var(--secondary-background-color, #d7d7d7)); border-left: none;
          border-radius: 0 14px 14px 0; box-shadow: 1px 0 0 var(--divider-color, #c7c7c7);
        }
        /* Heating: the base glows, the water bubbles and steam leaves the spout. */
        .machine.on .kt-base { background: #ff7043; box-shadow: 0 0 10px 1px #ff7043; }
        .kt-bub { position: absolute; bottom: 6px; width: 5px; height: 5px; border-radius: 50%; background: rgba(255, 255, 255, 0.75); opacity: 0; }
        .kt-bub.b1 { left: 34px; }
        .kt-bub.b2 { left: 46px; }
        .kt-bub.b3 { left: 57px; }
        .machine.on .kt-bub { animation: kt-rise 1.6s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.on .kt-bub.b2 { animation-delay: calc(-0.55s + var(--anim-offset, 0s)); }
        .machine.on .kt-bub.b3 { animation-delay: calc(-1.1s + var(--anim-offset, 0s)); }
        @keyframes kt-rise {
          0% { transform: translateY(0); opacity: 0; }
          25% { opacity: 0.85; }
          100% { transform: translateY(-26px); opacity: 0; }
        }
        .kt-steam {
          position: absolute; top: 14px; width: 5px; height: 14px; border-radius: 3px; opacity: 0;
          background: linear-gradient(to top, rgba(200, 215, 230, 0.75), rgba(200, 215, 230, 0));
        }
        .kt-steam.s1 { left: 12px; }
        .kt-steam.s2 { left: 20px; }
        .machine.on .kt-steam { animation: kt-steam 2.2s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.on .kt-steam.s2 { animation-delay: calc(-1.1s + var(--anim-offset, 0s)); }
        @keyframes kt-steam {
          0% { transform: translateY(6px) scaleY(0.6); opacity: 0; }
          35% { opacity: 0.9; }
          100% { transform: translateY(-10px) scaleY(1.25); opacity: 0; }
        }
  `,
  cooker: (color) => `
        .rc-base {
          position: absolute; left: 10px; right: 10px; top: 68px; bottom: 4px;
          border-radius: 7px;
          background: linear-gradient(160deg, var(--ac-body, var(--secondary-background-color, #d7d7d7)), var(--ac-body-lo, #bdbdbd));
          border: 1px solid var(--divider-color, #c7c7c7);
        }
        .rc-disp {
          position: absolute; left: 8px; top: 9px; width: 30px; height: 12px;
          border-radius: 2px; background: #14161a; color: ${color}; text-align: center;
          font: 600 7px/11px ui-monospace, "SF Mono", monospace;
        }
        .rc-dial {
          position: absolute; right: 8px; top: 7px; width: 16px; height: 16px;
          border-radius: 50%; background: var(--disabled-text-color, #9e9e9e);
          box-shadow: inset 0 -1px 2px rgba(0, 0, 0, 0.35);
        }
        /* The bowl is drawn as a jug rather than as opaque metal: the blade is
           the whole point of the drawing and has to be visible. */
        .rc-bowl {
          position: absolute; left: 20px; right: 20px; top: 19px; height: 50px; overflow: hidden;
          background: rgba(255, 255, 255, 0.7);
          border: 1.5px solid var(--disabled-text-color, #9e9e9e);
          clip-path: polygon(0 0, 100% 0, 88% 100%, 12% 100%);
        }
        .rc-food { position: absolute; left: 0; right: 0; bottom: 0; height: 50%; background: rgba(186, 148, 96, 0.75); }
        /* Two graduations, so the bowl reads as a measuring jug rather than as
           a paper bag once the contents are pale. */
        .rc-grad { position: absolute; right: 6px; width: 7px; height: 1px; background: var(--divider-color, #c7c7c7); }
        .rc-grad.g1 { top: 14px; }
        .rc-grad.g2 { top: 24px; }
        .rc-blade {
          position: absolute; left: 50%; bottom: 7px; width: 28px; height: 3.5px; margin-left: -14px;
          border-radius: 2px; background: #5a6068;
        }
        .rc-blade::before {
          content: ""; position: absolute; inset: 0; border-radius: 2px;
          background: #5a6068; transform: rotate(72deg);
        }
        .machine.mixing .rc-blade { animation: rc-spin linear infinite; animation-delay: var(--anim-offset, 0s); }
        /* The speed shows in how often the turn comes round, not in how fast
           the blade travels: a turn too quick to follow reads as a glitch. */
        .machine.s1 .rc-blade { animation-duration: 2.6s; }
        .machine.s2 .rc-blade { animation-duration: 1.6s; }
        .machine.s3 .rc-blade { animation-duration: 0.9s; }
        @keyframes rc-spin {
          0% { transform: rotate(0deg); animation-timing-function: cubic-bezier(0.4, 0, 0.3, 1); }
          68% { transform: rotate(360deg); }
          100% { transform: rotate(360deg); }
        }
        /* Heating shows as the element under the bowl, not as a halo around the
           whole base: a glow that big read as a rendering fault. */
        /* Sits exactly on the seam between bowl and base, where the element is. */
        .rc-heat {
          position: absolute; left: 24px; right: 24px; top: 67px; height: 4px;
          border-radius: 2px; background: transparent;
        }
        .machine.heating .rc-heat { background: #ff7043; box-shadow: 0 0 6px 0 #ff7043; }
        .machine.heating .rc-food { background: rgba(214, 140, 90, 0.8); }
        .rc-lid {
          position: absolute; left: 19px; right: 19px; top: 12px; height: 9px; border-radius: 5px;
          background: var(--ac-body, var(--secondary-background-color, #d7d7d7)); border: 1px solid var(--divider-color, #c7c7c7);
        }
        .rc-cap {
          position: absolute; left: 50%; top: 5px; width: 12px; height: 8px; margin-left: -6px;
          border-radius: 3px 3px 0 0; background: var(--disabled-text-color, #9e9e9e);
        }
        .rc-steam {
          position: absolute; top: 0; width: 4px; height: 12px; border-radius: 2px; opacity: 0;
          background: linear-gradient(to top, rgba(200, 215, 230, 0.8), rgba(200, 215, 230, 0));
        }
        .rc-steam.v1 { left: 38px; }
        .rc-steam.v2 { left: 54px; }
        .machine.heating .rc-steam { animation: rc-vapour 2.4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.heating .rc-steam.v2 { animation-delay: calc(-1.2s + var(--anim-offset, 0s)); }
        @keyframes rc-vapour {
          0% { transform: translateY(6px) scaleY(0.6); opacity: 0; }
          40% { opacity: 0.85; }
          100% { transform: translateY(-8px) scaleY(1.2); opacity: 0; }
        }
  `,
  coffee: (color) => `
        .cf-body {
          position: absolute; left: 14px; right: 14px; top: 2px; height: 64px; border-radius: 8px;
          background: linear-gradient(105deg, var(--ac-body, var(--secondary-background-color, #d7d7d7)), var(--ac-body-hi, #e6e6e6));
          border: 1px solid var(--divider-color, #c7c7c7);
        }
        .cf-hopper {
          position: absolute; left: 22px; right: 22px; top: 5px; height: 12px; border-radius: 3px;
          background: #2a2e35; overflow: hidden;
        }
        .cf-bean { position: absolute; top: 4px; width: 5px; height: 4px; border-radius: 50%; background: #8d6e63; }
        .cf-bean.b1 { left: 20%; }
        .cf-bean.b2 { left: 44%; top: 6px; }
        .cf-bean.b3 { left: 66%; }
        /* Empty hopper: the beans stay, greyed, so the drawing still reads as a
           bean machine rather than losing a part. */
        .machine.no-beans .cf-bean { background: var(--disabled-text-color, #9e9e9e); opacity: 0.35; }
        /* Strength shows as how full the hopper looks. */
        .machine.st1 .cf-bean.b2, .machine.st1 .cf-bean.b3 { display: none; }
        .machine.st2 .cf-bean.b3 { display: none; }
        .cf-disp {
          position: absolute; left: 50%; top: 23px; transform: translateX(-50%);
          min-width: 32px; height: 11px; padding: 0 3px; border-radius: 2px;
          background: #14161a; color: ${color}; text-align: center;
          font: 600 7px/11px ui-monospace, "SF Mono", monospace;
        }
        /* Three keys under the display: without them the body is a blank slab. */
        .cf-key { position: absolute; top: 42px; width: 7px; height: 7px; border-radius: 50%; background: var(--disabled-text-color, #9e9e9e); }
        .cf-key.k1 { left: 32px; }
        .cf-key.k2 { left: 44px; }
        .cf-key.k3 { left: 56px; }
        .machine.pouring .cf-key.k2 { background: ${color}; }
        .cf-tank {
          position: absolute; right: 2px; top: 14px; width: 11px; height: 44px; border-radius: 3px;
          background: rgba(255, 255, 255, 0.5); border: 1px solid var(--divider-color, #c7c7c7); overflow: hidden;
        }
        .cf-water { position: absolute; left: 0; right: 0; bottom: 0; height: 62%; background: rgba(79, 195, 247, 0.45); }
        .machine.no-water .cf-water { height: 8%; background: var(--warning-color, #ff9800); opacity: 0.7; }
        .cf-spout { position: absolute; top: 66px; width: 4px; height: 5px; border-radius: 0 0 2px 2px; background: #4c525b; }
        .cf-spout.p1 { left: 41px; }
        .cf-spout.p2 { left: 51px; }
        .cf-stream { position: absolute; top: 71px; width: 2px; height: 13px; background: #6d4c41; opacity: 0; }
        .cf-stream.p1 { left: 42px; }
        .cf-stream.p2 { left: 52px; }
        .machine.pouring .cf-stream { animation: cf-pour 0.7s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.pouring .cf-stream.p2 { animation-delay: calc(-0.35s + var(--anim-offset, 0s)); }
        @keyframes cf-pour {
          0% { opacity: 0; transform: scaleY(0.2); transform-origin: top; }
          30% { opacity: 0.9; transform: scaleY(1); }
          100% { opacity: 0.9; transform: scaleY(1); }
        }
        .cf-cup {
          position: absolute; top: 83px; height: 15px; overflow: hidden;
          background: #fafafa; border: 1px solid var(--divider-color, #c7c7c7);
          border-radius: 2px 2px 8px 8px;
        }
        .cf-cup.c1 { left: 34px; right: 34px; }
        .cf-cup.c2 { display: none; }
        /* Two cups: the spouts move apart to stand over one each, the way the
           machine's own swivel outlet does. */
        .machine.two-cups .cf-cup.c1 { left: 27px; right: 49px; }
        .machine.two-cups .cf-cup.c2 { display: block; left: 49px; right: 27px; }
        .machine.two-cups .cf-spout.p1 { left: 35px; }
        .machine.two-cups .cf-spout.p2 { left: 57px; }
        .machine.two-cups .cf-stream.p1 { left: 36px; }
        .machine.two-cups .cf-stream.p2 { left: 58px; }
        .machine.two-cups .cf-ear { right: 20px; }
        .cf-fill { position: absolute; left: 0; right: 0; bottom: 0; height: 0; background: #6d4c41; transition: height 0.6s linear; }
        .machine.pouring .cf-fill { height: 62%; }
        .cf-ear {
          position: absolute; right: 27px; top: 86px; width: 7px; height: 9px;
          border: 2px solid var(--divider-color, #c7c7c7); border-left: none; border-radius: 0 6px 6px 0;
        }
        .cf-tray {
          position: absolute; left: 24px; right: 24px; top: 100px; height: 4px; border-radius: 2px;
          background: var(--disabled-text-color, #9e9e9e);
        }
        .machine.tray-full .cf-tray { background: var(--warning-color, #ff9800); }
        .cf-steam {
          position: absolute; top: 72px; width: 4px; height: 10px; border-radius: 2px; opacity: 0;
          background: linear-gradient(to top, rgba(200, 215, 230, 0.8), rgba(200, 215, 230, 0));
        }
        .cf-steam.p1 { left: 36px; }
        .cf-steam.p2 { left: 56px; }
        .machine.pouring .cf-steam { animation: cf-wisp 2s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.pouring .cf-steam.p2 { animation-delay: calc(-1s + var(--anim-offset, 0s)); }
        @keyframes cf-wisp {
          0% { transform: translateY(4px) scaleY(0.6); opacity: 0; }
          40% { opacity: 0.8; }
          100% { transform: translateY(-7px) scaleY(1.2); opacity: 0; }
        }
  `,
  rice_cooker: (color) => `
        /* Squat and round, nothing like the cooker's tall jug: a rice cooker is
           a closed pot, so there is no interior to show. */
        .rk-body {
          position: absolute; left: 8px; right: 8px; top: 34px; bottom: 8px;
          border-radius: 12px 12px 16px 16px;
          background: linear-gradient(105deg, var(--ac-body, var(--secondary-background-color, #d7d7d7)), var(--ac-body-hi, #e9e9e9) 55%, var(--ac-body-lo, #cfcfcf));
          border: 1px solid var(--divider-color, #c7c7c7);
        }
        .rk-lid {
          position: absolute; left: 12px; right: 12px; top: 22px; height: 16px;
          border-radius: 12px 12px 4px 4px;
          background: linear-gradient(180deg, var(--ac-body-hi, #eeeeee), var(--ac-body, var(--secondary-background-color, #d7d7d7)));
          border: 1px solid var(--divider-color, #c7c7c7);
        }
        .rk-vent {
          position: absolute; left: 50%; top: 15px; width: 14px; height: 9px; margin-left: -7px;
          border-radius: 4px 4px 2px 2px; background: var(--disabled-text-color, #9e9e9e);
        }
        .rk-handle {
          position: absolute; left: 20px; right: 20px; top: 8px; height: 10px;
          border: 2.5px solid var(--disabled-text-color, #9e9e9e); border-bottom: none;
          border-radius: 10px 10px 0 0;
        }
        .rk-disp {
          position: absolute; left: 50%; top: 46px; transform: translateX(-50%);
          min-width: 32px; height: 12px; padding: 0 3px; border-radius: 2px;
          background: #14161a; color: ${color}; text-align: center;
          font: 600 8px/12px ui-monospace, "SF Mono", monospace;
        }
        .rk-key { position: absolute; top: 66px; width: 8px; height: 8px; border-radius: 50%; background: var(--disabled-text-color, #9e9e9e); }
        .rk-key.k1 { left: 32px; }
        .rk-key.k2 { left: 44px; }
        .rk-key.k3 { left: 56px; }
        /* The element is the plate under the pot, so the glow belongs at the
           foot rather than around the whole body. */
        .rk-foot {
          position: absolute; left: 20px; right: 20px; bottom: 4px; height: 4px;
          border-radius: 2px; background: var(--disabled-text-color, #9e9e9e);
        }
        .machine.heating .rk-foot { background: #ff7043; box-shadow: 0 0 7px 0 #ff7043; }
        .machine.warm .rk-foot { background: #ffb300; box-shadow: 0 0 6px 0 #ffb300; }
        .machine.warm .rk-key.k3 { background: #ffb300; }
        .rk-steam {
          position: absolute; top: 0; width: 5px; height: 13px; border-radius: 3px; opacity: 0;
          background: linear-gradient(to top, rgba(200, 215, 230, 0.8), rgba(200, 215, 230, 0));
        }
        .rk-steam.w1 { left: 40px; }
        .rk-steam.w2 { left: 51px; }
        .machine.heating .rk-steam { animation: rk-puff 2.3s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.heating .rk-steam.w2 { animation-delay: calc(-1.15s + var(--anim-offset, 0s)); }
        @keyframes rk-puff {
          0% { transform: translateY(7px) scaleY(0.6); opacity: 0; }
          40% { opacity: 0.9; }
          100% { transform: translateY(-8px) scaleY(1.25); opacity: 0; }
        }
  `,
  // An iron in profile, nose to the left: the soleplate, the shell rising to
  // the back, the tank inside it and the handle over the top. The same iron is
  // drawn smaller on the base of a steam generator.
  iron: () => `
        .ir { position: absolute; left: 0; right: 0; top: 0; bottom: 0; }
        .ir-shell {
          position: absolute; left: 8px; right: 10px; top: 44px; height: 26px;
          background: var(--ac-body, var(--secondary-background-color, #d7d7d7));
          border: 1px solid var(--divider-color, #c7c7c7); border-radius: 10px 16px 4px 4px;
          clip-path: polygon(0 100%, 12% 40%, 34% 10%, 100% 0, 100% 100%);
        }
        /* The tank sits inside the shell, so the shell's own outline cuts it:
           drawn beside it, it stuck out past the nose. */
        .ir-tank {
          position: absolute; left: 12px; right: 26px; top: 9px; height: 12px;
          border-radius: 7px 3px 3px 7px; background: rgba(79, 195, 247, 0.34);
        }
        .ir-top {
          position: absolute; left: 34px; right: 14px; top: 33px; height: 15px; border-radius: 9px 9px 0 0;
          background: var(--ac-body, var(--secondary-background-color, #d7d7d7));
          border: 1px solid var(--divider-color, #c7c7c7); border-bottom: none;
        }
        .ir-handle {
          position: absolute; left: 26px; right: 12px; top: 17px; height: 22px;
          border: 5px solid var(--ac-body, var(--secondary-background-color, #d7d7d7)); border-bottom: none;
          border-radius: 16px 10px 0 0; box-shadow: 0 -1px 0 var(--divider-color, #c7c7c7);
        }
        .ir-plate {
          position: absolute; left: 4px; right: 8px; top: 69px; height: 9px; background: #3b4048;
          border-radius: 2px 4px 4px 4px; clip-path: polygon(0 66%, 10% 0, 100% 0, 100% 100%, 3% 100%);
        }
        .ir-cord {
          position: absolute; right: 4px; top: 42px; width: 14px; height: 20px;
          border: 3px solid var(--disabled-text-color, #9e9e9e); border-left: none; border-top: none;
          border-radius: 0 0 12px 0;
        }
        /* Heating: the soleplate glows and steam leaves the nose. */
        .machine.heating .ir-plate { background: #ff7043; box-shadow: 0 0 10px 1px #ff7043; }
        /* Steam: four wisps off the nose, rising clear of the iron and
           drifting as they go. Kept tall and staggered so that two or three
           are always in the air rather than one appearing now and then. They
           are drawn inside the iron: on a generator it is scaled and lifted
           onto its base, and steam left on the card would rise from nowhere. */
        .ir-steam {
          position: absolute; width: 8px; height: 22px; border-radius: 5px; opacity: 0;
          background: linear-gradient(to top, rgba(176, 196, 214, 0.9), rgba(176, 196, 214, 0));
        }
        .ir-steam.s1 { left: 2px; top: 44px; }
        .ir-steam.s2 { left: 12px; top: 40px; }
        .ir-steam.s3 { left: 23px; top: 42px; }
        .ir-steam.s4 { left: 33px; top: 46px; }
        .machine.heating .ir-steam { animation: ir-puff 2.6s ease-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.heating .ir-steam.s2 { animation-delay: calc(-0.65s + var(--anim-offset, 0s)); }
        .machine.heating .ir-steam.s3 { animation-delay: calc(-1.3s + var(--anim-offset, 0s)); }
        .machine.heating .ir-steam.s4 { animation-delay: calc(-1.95s + var(--anim-offset, 0s)); }
        @keyframes ir-puff {
          0% { transform: translate(0, 10px) scale(0.45); opacity: 0; }
          20% { opacity: 0.95; }
          70% { opacity: 0.7; }
          100% { transform: translate(-7px, -34px) scale(1.35); opacity: 0; }
        }
        /* Left on for too long: the boiler's flame, its shape and its flicker,
           in front of the iron. Its blue root belongs to a gas burner and is
           dropped: nothing burns gas here. */
        .ir-fire {
          position: absolute; transform-origin: 50% 100%; opacity: 0;
          background: linear-gradient(0deg, #ffca28 0%, #ffa726 30%, #ff9800 60%, #ff5722 100%);
          clip-path: polygon(46% 0%, 58% 30%, 70% 10%, 76% 44%, 90% 28%, 94% 64%, 86% 88%, 66% 100%, 34% 100%, 14% 88%, 6% 62%, 12% 32%, 26% 50%, 30% 18%, 42% 36%);
        }
        .ir-fire.f1 { left: 8px; bottom: 28px; width: 18px; height: 32px; }
        .ir-fire.f2 { left: 28px; bottom: 30px; width: 26px; height: 48px; }
        .ir-fire.f3 { left: 56px; bottom: 30px; width: 20px; height: 38px; }
        .machine.left-on .ir-fire { opacity: 1; animation: ir-flicker 0.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.left-on .ir-fire.f2 { animation-delay: calc(-0.2s + var(--anim-offset, 0s)); }
        .machine.left-on .ir-fire.f3 { animation-delay: calc(-0.4s + var(--anim-offset, 0s)); }
        @keyframes ir-flicker {
          0%, 100% { transform: scale(1, 1); }
          30% { transform: scale(0.92, 1.1); }
          60% { transform: scale(1.06, 0.9); }
        }
        .machine.left-on .ir-plate { background: #ff5722; box-shadow: 0 0 14px 2px #ff5722; }
        /* The generator: the base carries the water tank, a dial and a lamp,
           and the iron rests on its mat rather than sinking into it. */
        .machine.generator .ir { transform: scale(0.74) translate(2px, -35px); transform-origin: 50% 100%; }
        .machine.generator .ir-fire.f1 { left: 12px; bottom: 52px; width: 16px; height: 28px; }
        .machine.generator .ir-fire.f2 { left: 29px; bottom: 54px; width: 23px; height: 42px; }
        .machine.generator .ir-fire.f3 { left: 54px; bottom: 52px; width: 18px; height: 32px; }
        .gen-base {
          position: absolute; left: 5px; right: 5px; bottom: 10px; height: 33px; border-radius: 7px 7px 10px 10px;
          background: var(--ac-body, var(--secondary-background-color, #d7d7d7));
          border: 1px solid var(--divider-color, #c7c7c7);
        }
        .gen-mat {
          position: absolute; left: 11px; right: 11px; bottom: 42px; height: 6px; border-radius: 4px 4px 0 0;
          background: var(--ac-body, var(--secondary-background-color, #d7d7d7));
          border: 1px solid var(--divider-color, #c7c7c7); border-bottom: none;
        }
        .gen-tank {
          position: absolute; left: 11px; width: 30px; bottom: 16px; height: 22px; border-radius: 4px 7px 7px 4px;
          background: rgba(79, 195, 247, 0.34); border: 1px solid rgba(0, 0, 0, 0.05);
        }
        .gen-dial {
          position: absolute; right: 12px; bottom: 19px; width: 14px; height: 14px; border-radius: 50%;
          background: var(--disabled-text-color, #9e9e9e);
        }
        .gen-led { position: absolute; right: 33px; bottom: 24px; width: 5px; height: 5px; border-radius: 50%; background: #8e9498; }
        .machine.generator.heating .gen-led { background: #ff7043; box-shadow: 0 0 6px 1px #ff7043; }
        .machine.generator.left-on .gen-led { background: #ff5722; box-shadow: 0 0 8px 2px #ff5722; }
        .gen-hose {
          position: absolute; right: 6px; top: 52px; width: 15px; height: 18px;
          border: 4px solid var(--disabled-text-color, #9e9e9e); border-left: none; border-top: none;
          border-radius: 0 0 12px 0;
        }
  `,
};

function illustrationCss(type, color) {
  const family = type === "dishwasher" ? "dishwasher" : LAUNDRY_TYPES.includes(type) ? "laundry" : type;
  const fn = ILLUSTRATION_CSS[family] || ILLUSTRATION_CSS.laundry;
  return fn(color);
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
function fridgeHtml(ctx) {
  const layout = ctx.layout || "freezer_bottom";
  // No temperature entity, no display: an empty dial would be worse than none.
  // A configured probe that stopped reporting shows dashes instead, since that
  // is a real state on a fridge whose plug is out but whose Zigbee sensor lives on.
  const lcd = (cls, style, v) =>
    v === undefined ? "" : `<div class="fr-lcd ${cls}" style="${style}">${esc(v)}</div>`;
  const icebox = (left, top, w) =>
    ctx.ice === undefined
      ? ""
      : `<div class="fr-icebox ${ctx.ice ? "" : "off"}" style="left:${left}px;top:${top}px;width:${w}px;height:19px">
           <div class="fr-cube c1" style="left:${(w / 2 - 8).toFixed(1)}px"></div>
           <div class="fr-cube c2" style="left:${(w / 2 - 2.5).toFixed(1)}px"></div>
           <div class="fr-cube c3" style="left:${(w / 2 + 3).toFixed(1)}px"></div>
         </div>`;
  const fT = ctx.fridgeTemp;
  const zT = layout === "single" ? undefined : ctx.freezerTemp;
  // Bottles lying on wooden racks, seen through the glass or with the door open.
  const racks = [3, 17, 31, 45, 59].map((y) => `<div class="fr-rack" style="top:${y}px"></div>`).join("");
  // Unplugged or drawing nothing: the light inside is out too.
  const off = ctx.dark ? " off" : "";
  const fCls = ctx.fridgeWarn ? "warn" : "";

  let body = "";
  let door = ["", ""];
  if (layout === "wine") {
    // A glass door: the display sits above the pane, and no ice maker.
    body = `<div class="fr-handle" style="right:8px;top:24px;bottom:24px"></div>
            ${lcd(fCls, "left:9px;top:5px", fT)}
            <div class="fr-glass${off}" style="left:6px;right:15px;top:19px;bottom:7px">${racks}</div>`;
    door = [`<div class="fr-handle" style="right:8px;top:24px;bottom:24px"></div>
            ${lcd(fCls, "left:9px;top:5px", fT)}
            <div class="fr-glass empty" style="left:6px;right:15px;top:19px;bottom:7px"></div>`, ""];
  } else if (layout === "single") {
    body = `<div class="fr-handle" style="right:8px;top:24px;bottom:24px"></div>
            ${lcd(fCls, "left:9px;top:9px", fT)}${icebox(14, 74, 22)}`;
    door = [body, ""];
  } else if (layout === "freezer_top") {
    body = `<div class="fr-split h" style="top:34%"></div>
            <div class="fr-handle" style="right:8px;top:10px;height:18px"></div>
            <div class="fr-handle" style="right:8px;top:42%;bottom:20px"></div>
            ${lcd("freeze", "left:9px;top:8px", zT)}
            ${lcd(fCls, "left:9px;top:40%", fT)}${icebox(14, 74, 22)}`;
    door = [
      `<div class="fr-handle" style="right:7px;top:10px;height:18px"></div>
       ${lcd("freeze", "left:9px;top:8px", zT)}`,
      `<div class="fr-handle" style="right:7px;top:9px;bottom:20px"></div>
       ${lcd(fCls, "left:9px;top:7px", fT)}${icebox(14, 39, 22)}`,
    ];
  } else if (layout === "side_by_side") {
    body = `<div class="fr-split v" style="left:42%"></div>
            <div class="fr-handle" style="left:34%;top:22px;bottom:22px"></div>
            <div class="fr-handle" style="left:47%;top:22px;bottom:22px"></div>
            <div class="fr-disp" style="left:3px;top:29px;width:20px;height:31px"></div>
            ${lcd("freeze", "left:4px;top:9px;min-width:19px;font-size:6px", zT)}
            ${lcd(fCls, "right:7px;top:9px;min-width:19px;font-size:6px", fT)}
            ${icebox(3, 33, 20)}`;
    // Handle on the side away from the hinge: right of the left door, and the
    // other way round for the right one.
    door = [
      `<div class="fr-handle" style="right:5px;top:22px;bottom:22px"></div>
       <div class="fr-disp" style="left:3px;top:29px;width:20px;height:31px"></div>
       ${lcd("freeze", "left:4px;top:9px;min-width:19px;font-size:6px", zT)}${icebox(3, 33, 20)}`,
      `<div class="fr-handle" style="left:5px;top:22px;bottom:22px"></div>
       ${lcd(fCls, "right:7px;top:9px;min-width:19px;font-size:6px", fT)}`,
    ];
  } else {
    body = `<div class="fr-split h" style="top:63%"></div>
            <div class="fr-handle" style="right:8px;top:26px;height:28px"></div>
            <div class="fr-handle" style="right:8px;top:70%;height:20px"></div>
            ${lcd(fCls, "left:9px;top:9px", fT)}
            ${lcd("freeze", "left:9px;top:70%", zT)}${icebox(14, 42, 22)}`;
    door = [
      `<div class="fr-handle" style="right:7px;top:26px;height:28px"></div>
       ${lcd(fCls, "left:9px;top:9px", fT)}${icebox(14, 42, 22)}`,
      `<div class="fr-handle" style="right:7px;top:8px;height:20px"></div>
       ${lcd("freeze", "left:9px;top:8px", zT)}`,
    ];
  }

  const open = !!ctx.doorOpen;
  const openFreezer = !!ctx.freezerDoorOpen;
  if (!open && !openFreezer) return `<div class="fr-body">${body}</div>`;

  const cav = (style) =>
    `<div class="fr-cav${off}" style="${style}">
       <div class="fr-shelf" style="top:28%"></div><div class="fr-shelf" style="top:62%"></div>
     </div>`;
  const panel = (style, content, on, hinge) =>
    `<div class="fr-door${on ? " swung" : ""}${hinge === "right" ? " hinge-right" : ""}" style="${style}">${content}</div>`;

  if (layout === "single") {
    return `<div class="fr-wrap">${cav("inset:0")}${panel("inset:0", door[0], open)}</div>`;
  }
  if (layout === "wine") {
    return `<div class="fr-wrap"><div class="fr-cav wine${off}" style="inset:0"><div class="fr-racks">${racks}</div></div>${panel("inset:0", door[0], open)}</div>`;
  }
  if (layout === "side_by_side") {
    return `<div class="fr-wrap">
        ${cav("left:0;width:42%;top:0;bottom:0")}${cav("left:42%;right:0;top:0;bottom:0")}
        ${panel("left:0;width:42%;top:0;bottom:0", door[0], openFreezer)}
        ${panel("left:42%;right:0;top:0;bottom:0", door[1], open, "right")}
      </div>`;
  }
  // Stacked layouts: the top door belongs to whichever compartment is on top.
  const cut = layout === "freezer_top" ? 34 : 63;
  const topOpen = layout === "freezer_top" ? openFreezer : open;
  const bottomOpen = layout === "freezer_top" ? open : openFreezer;
  return `<div class="fr-wrap">
      ${cav(`left:0;right:0;top:0;height:${cut}%`)}${cav(`left:0;right:0;top:${cut}%;bottom:0`)}
      ${panel(`left:0;right:0;top:0;height:${cut}%`, door[0], topOpen)}
      ${panel(`left:0;right:0;top:${cut}%;bottom:0`, door[1], bottomOpen)}
    </div>`;
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

  if (type === "dishwasher") {
    return `
        <div class="machine ${cls}">
          <div class="dw-body">
            <div class="dw-controls"><div class="dw-screen"></div></div>
            <div class="dw-cavity">
              <div class="dw-dishes" aria-hidden="true">
                <span class="dw-plate dw-plate-a"></span>
                <span class="dw-plate dw-plate-b"></span>
                <span class="dw-plate dw-plate-c"></span>
                <span class="dw-plate dw-plate-d"></span>
              </div>
              <div class="dw-rack"></div>
              <div class="dw-spray" aria-hidden="true"><span class="dw-spray-hub"></span></div>
              <div class="dw-drops" aria-hidden="true">
                <i class="dw-drop dw-drop-a"></i><i class="dw-drop dw-drop-b"></i>
                <i class="dw-drop dw-drop-c"></i><i class="dw-drop dw-drop-d"></i>
                <i class="dw-drop dw-drop-e"></i>
              </div>
              <div class="dw-water" aria-hidden="true">
                <span class="dw-wave dw-wave-a"></span><span class="dw-wave dw-wave-b"></span>
              </div>
                          </div>
            <div class="dw-heat" aria-hidden="true">
              <i class="dw-heat-a"></i><i class="dw-heat-b"></i><i class="dw-heat-c"></i><i class="dw-heat-d"></i><i class="dw-heat-e"></i>
            </div>
            <div class="dw-door ${ctx.doorOpen ? "open" : ""}" aria-hidden="true"></div>
          </div>
        </div>`;
  }

  if (LAUNDRY_TYPES.includes(type)) {
    const water = `
        <div class="water-level">
          <div class="wave"></div>
          <div class="wave wave2"></div>
        </div>`;
    const clothes = `
        <div class="garments">
          <div class="garment g1"></div>
          <div class="garment g2"></div>
          <div class="garment g3"></div>
        </div>`;
    // A washer-dryer empties its drum before it dries, so while it dries it is
    // a dryer: clothes turning in hot air, and the warm haze that goes with it.
    // A spin empties it too, and the clothes show, whirling with no heat.
    const glassContent = type === "dryer" || ctx.drying || ctx.spinCycle ? clothes : water;
    const heat = ctx.drying
      ? `
        <div class="wd-heat" aria-hidden="true"><i></i><i></i><i></i></div>`
      : "";
    return `
        <div class="machine ${[ctx.spinning ? "spinning" : "", ctx.drying ? "drying" : "", ctx.spinCycle ? "spin-cycle" : ""].filter(Boolean).join(" ")}">
          <div class="mbody">
            <div class="mpanel"></div>
            <div class="mknob"></div>
            <div class="mknob k2"></div>
          </div>
          <div class="bezel-wrap">
            <div class="drum-hole"></div>
            <div class="door ${ctx.doorOpen ? "ajar" : ""}">
              <div class="rim">
                <div class="glass">
                  ${heat}${glassContent}
                </div>
              </div>
            </div>
          </div>
        </div>`;
  }

  if (type === "pet_feeder") {
    // The tower serves into a bowl of its own; the round tank stands on a
    // base with the bowl set down in front of it, and holds a taller heap.
    const canister = ctx.feederLayout === "canister";
    const heapPx = canister ? 34 : 22;
    return `
        <div class="machine ${[canister ? "canister" : "", ctx.feeding ? "feeding" : "", ctx.feederEmpty ? "empty" : ""].filter(Boolean).join(" ")}"${
          ctx.feederFill === null || ctx.feederFill === undefined ? "" : ` style="--pf-fill:${(4 + (ctx.feederFill / 100) * heapPx).toFixed(1)}px"`}>${canister ? `
          <div class="pfc-base"><div class="pfc-panel"><i></i><i></i></div><div class="pfc-chute"></div></div>
          <div class="pfc-tank"><div class="pfc-heap"></div></div>
          <div class="pfc-lid"></div>
          <div class="pfc-dish"></div>
          <div class="pfc-bowl"></div>` : `
          <div class="pf-lid"></div>
          <div class="pf-body"><div class="pf-heap"></div></div>
          <div class="pf-unit"><i></i></div>
          <div class="pf-bowl"><div class="pf-dish"></div></div>
          <div class="pf-base"></div>`}
          <div class="pf-fall" aria-hidden="true"><i></i><i></i><i></i></div>${ctx.feederAlert ? `
          <div class="pf-cat" aria-hidden="true">
            <u class="ear l"><span></span></u><u class="ear r"><span></span></u>
            <u class="tail"></u>
            <b class="body"><span class="paw l"></span><span class="paw r"></span></b>
            <b class="head">
              <i class="whisk l"></i><i class="whisk r"></i>
              <i class="muzzle"></i>
              <i class="eye l"><span></span></i><i class="eye r"><span></span></i>
              <i class="nose"></i><i class="mouth l"></i><i class="mouth r"></i>
            </b>
          </div>
          <div class="pf-alert" aria-hidden="true"><i class="bar"></i><i class="dot"></i></div>` : ""}
        </div>`;
  }

  if (type === "oven") {
    return `
        <div class="machine ${cls}">
          <div class="ov-body">
            <div class="ov-panel">
              <div class="ov-disp">${esc(ctx.display || "--")}</div>
              <div class="ov-knob"></div>
              <div class="ov-knob k2"></div>
            </div>
            <div class="ov-doorwrap">
              <div class="ov-cavity">
                <div class="ov-elem top"></div>
                <div class="ov-rack"></div>
                <div class="ov-dish"></div>
                <div class="ov-elem bottom"></div>
              </div>
              <div class="ov-door">
                <div class="ov-handle"></div>
                <div class="ov-glass"></div>
              </div>
            </div>
          </div>
        </div>`;
  }

  if (type === "microwave") {
    return `
        <div class="machine ${cls}">
          <div class="mw-body">
            <div class="mw-doorwrap">
              <div class="mw-cavity">
                <div class="mw-turn"><div class="mw-plate"></div><div class="mw-food"></div></div>
              </div>
              <div class="mw-door">
                <div class="mw-mesh"></div>
                <div class="mw-handle"></div>
              </div>
            </div>
            <div class="mw-panel">
              <div class="mw-disp">${esc(ctx.display || "--")}</div>
              <div class="mw-keys">${"<i></i>".repeat(9)}</div>
            </div>
          </div>
        </div>`;
  }

  if (type === "hood") {
    const level = ctx.fanLevel || 0;
    const fanCls = `${level > 0 ? "fan" : ""} v${level} ${ctx.boost ? "boost" : ""}`;
    return `
        <div class="machine ${cls} ${fanCls}">
          <div class="hd-chimney"></div>
          <div class="hd-canopy"></div>
          <div class="hd-under"></div>
          <div class="hd-lamp l1"></div>
          <div class="hd-lamp l2"></div>
          <div class="hd-beam b1"></div>
          <div class="hd-beam b2"></div>
          <div class="hd-air a1"></div>
          <div class="hd-air a2"></div>
          <div class="hd-air a3"></div>
        </div>`;
  }

  if (type === "fridge") {
    return `<div class="machine ${cls} ${ctx.ice ? "ice" : ""}">${fridgeHtml(ctx)}</div>`;
  }

  if (type === "water_heater") {
    // Hot water sits on top of a real tank, so the warm layer grows down from
    // the dome as the water heats: 15 degrees is a cold tank, 65 a full one.
    const hot = ctx.tankTemp === null || ctx.tankTemp === undefined
      ? 0 : Math.max(0, Math.min(1, (ctx.tankTemp - 15) / 50));
    const lcd = ctx.display ? `<div class="wh-lcd">${esc(ctx.display)}</div>` : "";
    return `
        <div class="machine ${cls}" style="--wh-hot: ${hot.toFixed(2)}">
          <div class="wh-bracket"></div>
          <div class="wh-tank">
            <div class="wh-glass">
              <div class="wh-water"></div>
              <div class="wh-hot"></div>
              <div class="wh-heat"><i class="wh-h1"></i><i class="wh-h2"></i><i class="wh-h3"></i></div>
              <div class="wh-coil"></div>
            </div>
          </div>
          ${lcd}
          <div class="wh-pipe cold"></div>
          <div class="wh-pipe hot"></div>
        </div>`;
  }

  if (type === "boiler") {
    const mode = ctx.boilerMode || "idle";
    // A burner waiting its turn is out, like one on standby.
    const flame = mode !== "idle" && mode !== "waiting";
    const lcd = ctx.display ? `<div class="bl-lcd">${esc(ctx.display)}</div>` : "";
    return `
        <div class="machine ${cls} mode-${mode} ${flame ? "flame" : ""}">
          <div class="bl-box">
            ${lcd}
            <div class="bl-window"><div class="bl-flame"></div></div>
          </div>
          <div class="bl-pipe tap-down"></div>
          <div class="bl-pipe tap-arm"></div>
          <div class="bl-pipe tap-nose"></div>
          <div class="bl-knob"></div>
          <i class="bl-drop d1"></i><i class="bl-drop d2"></i><i class="bl-drop d3"></i>
          <div class="bl-pipe rad-down"></div>
          <div class="bl-pipe rad-arm"></div>
          <div class="bl-rad"><i></i><i></i><i></i><i></i></div>
          <div class="bl-waves"><i class="w1"></i><i class="w2"></i><i class="w3"></i></div>
        </div>`;
  }

  if (type === "heat_pump") {
    const mode = ctx.hpMode || "idle";
    // The fan turns whenever the pump works; it stops to defrost, as the real
    // one does while it melts the ice off its coil.
    const fan = ["space_heating", "hot_water", "cooling", "running"].includes(mode) && !ctx.compressorOff;
    // Water runs while the pump works a circuit: down the flow pipe and back
    // up the return, to the tank for hot water and to the emitter otherwise.
    const flowing = ["space_heating", "hot_water", "cooling"].includes(mode) && !ctx.compressorOff;
    const lcd = ctx.display ? `<div class="hp-lcd">${esc(ctx.display)}</div>` : "";
    const pipes = (circuit) => `<div class="hp-pipe ${circuit} flow"></div><div class="hp-pipe ${circuit} ret"></div>`;
    // A pump that heats no domestic hot water has no tank to draw, and what
    // takes its heat is a radiator or the floor.
    const tank = ctx.noTank ? "" : `
          ${pipes("tank")}
          <div class="hp-tank"><i></i></div>`;
    const emitter = ctx.underfloor
      ? `<div class="hp-floor"><i></i><i></i><i></i><div class="hp-slab"><div class="hp-coil"><b></b><b></b><b></b></div></div></div>`
      : `<div class="hp-rad"><i></i><i></i><i></i><i></i><i></i></div>`;
    return `
        <div class="machine ${cls} mode-${mode} ${fan ? "fan" : ""} ${flowing ? "flowing" : ""} ${ctx.noTank ? "no-tank" : ""} ${ctx.underfloor ? "underfloor" : ""}">
          <div class="hp-unit">
            <div class="hp-grille"><div class="hp-fan"></div><div class="hp-hub"></div><div class="hp-guard"></div><div class="hp-frost"></div></div>
            <div class="hp-side">${lcd}<div class="hp-fins"></div></div>
          </div>
          <div class="hp-foot f1"></div><div class="hp-foot f2"></div>${tank}
          ${pipes("rad")}
          ${emitter}
        </div>`;
  }

  if (type === "printer_3d") {
    const p = ctx.p3 || { layout: "enclosed", height: 0 };
    // The part grows with the job. On an enclosed printer the bed drops as it
    // grows, the head staying at the top; on an open frame the gantry climbs.
    const h = Math.round(Math.max(0, Math.min(1, p.height || 0)) * P3_PART_MAX);
    const lcd = ctx.display ? `<div class="p3-lcd">${esc(ctx.display)}</div>` : "";
    const flags = [
      `p3-${p.layout === "open" ? "open" : "enclosed"}`,
      `p3-part-${p.part || "cube"}`,
      p.moving ? "moving" : "",
      p.nozzleHot ? "nozzle-hot" : "",
      p.bedHot ? "bed-hot" : "",
      h > 0 ? "has-part" : "",
      p.parked ? "parked" : "",
    ].filter(Boolean).join(" ");
    const head = `<div class="p3-head"><div class="p3-nozzle"></div></div>`;
    // The whole part is drawn and only what is printed shows, from the bottom
    // up, the way a printer lays it down.
    const eye = p.part === "duck" ? `<b class="p3-eye"></b>` : "";
    const bed = `<div class="p3-bed"><div class="p3-part"><div class="p3-shape">${eye}<i></i></div></div></div>`;
    if (p.layout === "open") {
      return `
        <div class="machine ${cls} ${flags}" style="--p3-h:${h}px">
          <div class="p3-post l"></div>
          <div class="p3-post r"></div>
          <div class="p3-top"></div>
          <div class="p3-gantry">${head}</div>
          ${bed}
          <div class="p3-base">${lcd}<div class="p3-knob"></div></div>
        </div>`;
    }
    return `
        <div class="machine ${cls} ${flags}" style="--p3-h:${h}px">
          <div class="p3-case">
            <div class="p3-window">
              <div class="p3-rail"></div>
              ${head}
              ${bed}
              <div class="p3-glass"></div>
            </div>
            ${lcd}
            <div class="p3-knob"></div>
          </div>
          <div class="p3-foot f1"></div>
          <div class="p3-foot f2"></div>
        </div>`;
  }

  if (type === "iron") {
    // The iron alone, or the same iron on the base of a steam generator. The
    // base is drawn first, so the iron rests on it rather than through it.
    const base = ctx.ironLayout === "generator"
      ? `<div class="gen-base"></div><div class="gen-tank"></div><div class="gen-dial"></div>
          <div class="gen-led"></div><div class="gen-mat"></div><div class="gen-hose"></div>`
      : `<div class="ir-cord"></div>`;
    return `
        <div class="machine ${cls} ${ctx.ironLayout} ${ctx.leftOn ? "left-on" : ""}">
          ${base}
          <div class="ir">
            <div class="ir-steam s1"></div>
            <div class="ir-steam s2"></div>
            <div class="ir-steam s3"></div>
            <div class="ir-steam s4"></div>
            <div class="ir-handle"></div>
            <div class="ir-top"></div>
            <div class="ir-shell"><div class="ir-tank"></div></div>
            <div class="ir-plate"></div>
          </div>
          <div class="ir-fire f1"></div>
          <div class="ir-fire f2"></div>
          <div class="ir-fire f3"></div>
        </div>`;
  }

  if (type === "kettle") {
    // No timer and no progress: the drawing is the whole readout.
    const lcd = ctx.display ? `<div class="kt-lcd">${esc(ctx.display)}</div>` : "";
    return `
        <div class="machine ${cls} ${ctx.spinning ? "on" : ""}">
          ${lcd}
          <div class="kt-steam s1"></div>
          <div class="kt-steam s2"></div>
          <div class="kt-knob"></div>
          <div class="kt-lid"></div>
          <div class="kt-spout"></div>
          <div class="kt-handle"></div>
          <div class="kt-body">
            <div class="kt-water"></div>
            <div class="kt-bub b1"></div>
            <div class="kt-bub b2"></div>
            <div class="kt-bub b3"></div>
          </div>
          <div class="kt-base"></div>
        </div>`;
  }

  if (type === "cooker") {
    const sp = ctx.speed || 0;
    return `
        <div class="machine ${cls} ${sp > 0 ? "mixing" : ""} s${sp}">
          <div class="rc-steam v1"></div>
          <div class="rc-steam v2"></div>
          <div class="rc-cap"></div>
          <div class="rc-lid"></div>
          <div class="rc-bowl">
            <div class="rc-food"></div>
            <div class="rc-grad g1"></div>
            <div class="rc-grad g2"></div>
            <div class="rc-blade"></div>
          </div>
          <div class="rc-heat"></div>
          <div class="rc-base">
            ${ctx.display ? `<div class="rc-disp">${esc(ctx.display)}</div>` : ""}
            <div class="rc-dial"></div>
          </div>
        </div>`;
  }

  if (type === "coffee") {
    const flags = [
      ctx.spinning ? "pouring" : "",
      ctx.noWater ? "no-water" : "",
      ctx.noBeans ? "no-beans" : "",
      ctx.trayFull ? "tray-full" : "",
      ctx.cups >= 2 ? "two-cups" : "",
      `st${ctx.strength || 3}`,
    ].filter(Boolean).join(" ");
    return `
        <div class="machine ${cls} ${flags}">
          <div class="cf-body">
            <div class="cf-hopper">
              <div class="cf-bean b1"></div><div class="cf-bean b2"></div><div class="cf-bean b3"></div>
            </div>
            ${ctx.display ? `<div class="cf-disp">${esc(ctx.display)}</div>` : ""}
            <div class="cf-key k1"></div>
            <div class="cf-key k2"></div>
            <div class="cf-key k3"></div>
          </div>
          <div class="cf-tank"><div class="cf-water"${
            ctx.waterPct === null || ctx.waterPct === undefined
              ? ""
              : ` style="height:${Math.max(4, ctx.waterPct).toFixed(0)}%"`
          }></div></div>
          <div class="cf-spout p1"></div>
          <div class="cf-spout p2"></div>
          <div class="cf-stream p1"></div>
          <div class="cf-stream p2"></div>
          <div class="cf-steam p1"></div>
          <div class="cf-steam p2"></div>
          <div class="cf-ear"></div>
          <div class="cf-cup c1"><div class="cf-fill"></div></div>
          <div class="cf-cup c2"><div class="cf-fill"></div></div>
          <div class="cf-tray"></div>
        </div>`;
  }

  if (type === "rice_cooker") {
    return `
        <div class="machine ${cls} ${ctx.keepWarm ? "warm" : ""}">
          <div class="rk-steam w1"></div>
          <div class="rk-steam w2"></div>
          <div class="rk-handle"></div>
          <div class="rk-vent"></div>
          <div class="rk-lid"></div>
          <div class="rk-body">
            ${ctx.display ? `<div class="rk-disp">${esc(ctx.display)}</div>` : ""}
            <div class="rk-key k1"></div>
            <div class="rk-key k2"></div>
            <div class="rk-key k3"></div>
          </div>
          <div class="rk-foot"></div>
        </div>`;
  }

  if (type === "cooktop") {
    const zones = ctx.zones || [];
    const zonesHtml = zones
      .map((z) => {
        const zc = [z.on ? "on" : "", z.max ? "max" : "", z.residual ? "residual" : ""]
          .filter(Boolean)
          .join(" ");
        const title = z.title ? ` title="${esc(z.title)}"` : "";
        return `<div class="ck-zone ${zc}" style="--zi:${z.intensity.toFixed(2)}"${title}>${esc(z.label || "")}</div>`;
      })
      .join("");
    const act = ctx.anyZoneOn ? "act" : "";
    return `
        <div class="machine ${cls}">
          <div class="ck-top">
            <div class="ck-zones g${ctx.zoneColumns || 2}">${zonesHtml}</div>
            <div class="ck-ctrl"><i class="${act}"></i><i class="${act}"></i><i class="${act}"></i></div>
            ${ctx.childLock ? `<div class="ck-lock"></div>` : ""}
          </div>
        </div>`;
  }

  return "";
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
    if (!config || (!config.state_entity && !hasFridgeSource && !hasFeederSource)) {
      throw new Error("ha-appliance-card: 'state_entity' is required");
    }
    this._config = config;
    // A reconfiguration changes what is drawn without touching any state, so
    // the next hass must go through whatever the signature says.
    this._lastSignature = undefined;
    this._cycle = null;
    this._prevNormState = null;
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

  static getConfigElement() {
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

  disconnectedCallback() {
    this._clearClockTimer();
    this._clearCountdownTimer();
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

  // A control is not always a button. A pet feeder dispenses from a select set
  // to START (Aqara over Zigbee2MQTT) or from a number written with the number
  // of portions (Tuya), and a card that only knew how to press buttons would
  // be tied to one brand, which is the one thing this card refuses to be.
  _call(entityId, opts) {
    if (!this._hass || !entityId) return;
    const domain = domainOf(entityId);
    if (domain === "select" || domain === "input_select") {
      const option = (opts && opts.option) || soleOption(this._hass, entityId);
      // Without an option there is nothing to pick, and picking the wrong one
      // would run the wrong programme: open the entity and let the user choose.
      if (!option) return this._moreInfo(entityId);
      return this._hass.callService(domain, "select_option", { entity_id: entityId, option });
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
    if (domain === "button") {
      this._hass.callService("button", "press", { entity_id: entityId });
    } else if (["switch", "input_boolean", "fan", "light"].includes(domain)) {
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

  _moreInfo(entityId) {
    const ev = new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true });
    this.dispatchEvent(ev);
  }

  // What a tap on the card does. Home Assistant's own action config, the one
  // every dashboard already speaks, rather than a wording of the card's: a tap
  // opens the entity unless the YAML says otherwise (HACF). fire-dom-event is
  // the one the popup cards are built on: browser_mod listens for ll-custom
  // and reads the action itself, so the card hands it over whole.
  _tap(cfg) {
    const action = cfg.tap_action || {};
    const kind = action.action || "more-info";
    const entityId = action.entity || cfg.state_entity;
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
    const watts = cfg.power_entity ? numericState(hass, cfg.power_entity) : null;
    const hasThreshold = cfg.power_on_threshold !== undefined && cfg.power_on_threshold !== "";
    // Pointing state_entity at the power meter itself can only mean "derive the
    // state from it"; without a default threshold the card would print a bare
    // wattage as the appliance's state.
    const threshold = hasThreshold
      ? parseFloat(cfg.power_on_threshold)
      : cap.fridgeTemp
        ? 1
        : cfg.power_entity === cfg.state_entity
          ? 10
          : NaN;
    // A fridge is excluded here on purpose: its compressor cycles all day, so
    // reading the meter as a cycle state would report "finished" every twenty
    // minutes. What the meter says on a fridge is whether it is still plugged
    // in, and that is decided further down with the health summary.
    if (!cap.fridgeTemp && cfg.power_entity && isFinite(threshold)) {
      const derived = powerDerivedState(watts, threshold, this._powerWasRunning);
      if (derived) {
        // Only "running" flips the latch on. "done" must leave it set, or the
        // next render would fall straight back to "idle" and the finished
        // cycle would never be shown.
        if (derived === "running") this._powerWasRunning = true;
        else if (derived === "idle") this._powerWasRunning = false;
        norm = derived;
        powerDerived = true;
      }
    }

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
      ? (cfg.state_show_raw ? String(rawState) : cleanStateLabel(rawState))
      : t(hass, norm);

    const name = cfg.name || (st && st.attributes.friendly_name) || cfg.state_entity;

    // Program
    let programText = null;
    if (cfg.program_entity) {
      const pst = stateObj(hass, cfg.program_entity);
      if (pst && !["unknown", "unavailable"].includes(pst.state)) {
        programText = cap.printer3d ? printerFileName(pst.state) : programLabel(hass, pst, pst.state, cfg);
      }
    }

    // Remaining time / progress
    let remSec = null;
    if (cfg.remaining_time_entity) {
      // remaining_time_hide_when_idle cross-references the already-normalized
      // machine state so stale completion timestamps (integrations like
      // Samsung SmartThings keep reporting a past cycle's finish time after
      // the appliance goes idle) don't show a leftover "remaining time".
      // A printer keeps its last job's times once it is done with it, so it
      // hides them outside a job unless told otherwise; a pause is still one.
      const hideIdle = cfg.remaining_time_hide_when_idle !== undefined ? cfg.remaining_time_hide_when_idle : !!cap.printer3d;
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
    if (role === "out" || cfg.progress_entity || !cfg.remaining_time_entity) {
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
        doorOpen = dst.state === (cfg.door_open_state || "on");
        if (cfg.door_invert) doorOpen = !doorOpen;
      }
    }

    // Alerts
    const alerts = cfg.alerts_entity ? activeAlerts(hass, cfg.alerts_entity) : [];

    // Phase is optional. A phase sensor is useful for richer dishwasher
    // animation, but integrations that do not expose one must render exactly
    // as before. Unknown vendor phases are intentionally ignored as well.
    const phaseState = cfg.phase_entity ? stateObj(hass, cfg.phase_entity) : null;
    const phase = phaseState ? normalizeDishwasherPhase(phaseState.state, cfg.phase_map) : "";

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

    // Hood: fan speed, light and filter wear.
    let fan = { level: 0, boost: false, percentage: null, preset: null };
    if (cap.fan) {
      fan = hoodFanState(hass, cfg, norm);
      // Shown even at rest: this line is what opens the speed entity, so
      // hiding it while the hood is off removes the only way to set it.
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
      if (f !== null) {
        filterPct = Math.max(0, Math.min(100, f));
        extraLines.push({
          key: "filter",
          icon: "mdi:air-filter",
          label: t(hass, "filter"),
          value: `${Math.round(filterPct)} %`,
          warn: filterPct <= 15,
        });
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
        childLock = !!clst && ["on", "true", "locked"].includes(String(clst.state).toLowerCase());
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
        const v = numericState(hass, entityId);
        return v === null
          ? { value: null, text: "--\u00b0" }
          : { value: v, text: screenTemp(hass, cfg, entityId, v) };
      };
      const fridgeT = readTemp(cfg.fridge_temperature_entity);
      const freezerT = readTemp(cfg.freezer_temperature_entity);
      // A wine cooler keeps 10 to 14 degrees on purpose; past 18 the wine suffers.
      const wine = cfg.fridge_layout === "wine";
      const maxTemp = cfg.fridge_max_temperature === undefined || cfg.fridge_max_temperature === ""
        ? (wine ? 18 : 8)
        : parseFloat(cfg.fridge_max_temperature);
      const tempHigh = fridgeT.value !== null && isFinite(maxTemp) && fridgeT.value > maxTemp;

      let freezerDoorOpen = false;
      if (cfg.freezer_door_entity) {
        const fdst = stateObj(hass, cfg.freezer_door_entity);
        if (fdst) {
          freezerDoorOpen = fdst.state === (cfg.door_open_state || "on");
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
      let noPower = false;
      let belowMs = 0;
      if (cfg.power_entity && watts !== null && isFinite(threshold) && watts < threshold) {
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

      norm = fridgeHealth(unplugged, noPower, doorOpen || freezerDoorOpen, tempHigh);
      color = STATE_COLORS[norm];
      stateLabel = t(hass, norm);

      const twoDoors = !!(cfg.door_entity && cfg.freezer_door_entity);
      const doorLine = (open, openKey) => ({
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
            extraLines.push(doorLine(doorOpen, twoDoors ? "fridge_door_open" : "door_open"));
          }
          if (cfg.freezer_door_entity && (!twoDoors || freezerDoorOpen)) {
            extraLines.push(doorLine(freezerDoorOpen, twoDoors ? "freezer_door_open" : "door_open"));
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
      const noBeans = flagged(cfg.beans_entity, ON);
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
        } else if (String(rawState).trim().toLowerCase() === "off") {
          tankLabel = t(hass, "standby");
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
    if (cap.boilerMode) {
      if (cfg.hot_water_entity || cfg.heating_entity) {
        // Hot water takes priority on a combi boiler, so it wins a tie.
        // Both off while the flame is lit (frost protection, or only one of the
        // two indicators configured) is still a burner at work.
        boilerMode = cfg.hot_water_entity && isOn(cfg.hot_water_entity) ? "hot_water"
          : cfg.heating_entity && isOn(cfg.heating_entity) ? "space_heating"
          : isActiveState(norm) ? "burner" : "idle";
      } else if (!powerDerived) {
        boilerMode = boilerModeOf(rawState, cfg.state_map);
      }
      if (!boilerMode) {
        if (isActiveState(norm)) boilerMode = "burner";
        else if (norm === "idle" || norm === "done") boilerMode = "idle";
      }
      if (boilerMode) {
        if (!cfg.state_show_raw) stateLabel = t(hass, boilerMode === "idle" ? "standby" : `boiler_${boilerMode}`);
        color = boilerMode === "hot_water" ? "#ef5350"
          : boilerMode === "idle" || boilerMode === "waiting" ? STATE_COLORS.idle : "#ff7043";
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
      p3 = {
        layout: cfg.printer_layout === "open" ? "open" : "enclosed",
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
      const compKnown = !!compSt && !["unknown", "unavailable"].includes(compSt.state);
      const compHz = compKnown ? numericState(hass, cfg.compressor_entity) : null;
      const compOn = compKnown && (compHz !== null ? compHz > 0 : ["on", "true", "running"].includes(String(compSt.state).toLowerCase()));
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
      if (flow !== null && ret !== null) {
        const d = tempDecimals(cfg);
        extraLines.push({
          key: "delta",
          icon: "mdi:delta",
          label: t(hass, "hp_delta"),
          // Never in whole degrees: a heat pump works on a couple of them, and
          // rounding a delta of 4.4 to 4 hides most of what it says.
          value: keepTogether(`${fixedTemp(hass, Math.abs(flow - ret), d === 0 ? 1 : d === null ? 1 : d)} ${temperatureUnit(hass, cfg.temperature_entity)}`),
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
      hpLine(powerId, "power", cfg.power_icon || "mdi:flash", t(hass, "power"));
      hpLine(outputId, "heat_output", cooling ? "mdi:snowflake" : "mdi:heat-wave",
        t(hass, cooling ? "section_cooling_output" : "section_heat_output"));
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
            label: cooling ? "EER" : "COP",
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

    // Pet feeder: read like a fridge, since it is idle almost all the time.
    // Its state is worked out rather than reported, and what it did today is
    // the content of the card.
    let feeding = false;
    let feederEmpty = false;
    let feederAlert = false;
    let feederFill = null;
    if (cap.petFeeder) {
      const errSt = cfg.error_entity ? stateObj(hass, cfg.error_entity) : null;
      const errText = errSt ? String(errSt.state).toLowerCase() : "";
      // A feeder names its fault in one of three ways: a contact that turns on,
      // a word, or a code. Tuya reports a number on which zero is the only good
      // value, so anything else is a fault however it is spelled.
      const errCode = errText === "" ? NaN : Number(errText);
      const erred = !!errSt && (Number.isFinite(errCode)
        ? errCode !== 0
        : ["on", "true", "error", "problem", "fault"].includes(errText) || /jam|block|stuck|clog|bourrage/.test(errText));
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
      // A feeder that reports anything at all reports a pulse while it serves.
      feeding = !!st && ["on", "true", "dispensing", "feeding", "running"].includes(String(rawState).toLowerCase());
      norm = errEmpty || (levelEmpty && !erred) ? "feeder_empty"
        : erred ? "error"
        : feeding ? "feeder_feeding" : "feeder_ready";
      feederEmpty = norm === "feeder_empty";
      // Empty or jammed, the cat is equally unimpressed.
      feederAlert = feederEmpty || norm === "error";
      if (levelSt && !["unknown", "unavailable"].includes(levelSt.state)) {
        extraLines.push({
          key: "level",
          icon: feederEmpty ? "mdi:alert-circle-outline" : "mdi:silo",
          label: t(hass, "section_level"),
          value: keepTogether(levelPct !== null ? formatInfoValue(levelSt, hass, null, cfg, cfg.level_entity) : t(hass, feederEmpty ? "feeder_empty" : "feeder_ready")),
          entity: cfg.level_entity,
          warn: feederEmpty,
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
      // "Ready" is what a feeder is nearly all day long, so saying it says
      // nothing. At rest the line tells how full the tank is when that is
      // known and stays empty otherwise; serving, empty and a fault keep their
      // own words.
      if (!cfg.state_show_raw) {
        stateLabel = norm !== "feeder_ready" ? t(hass, norm)
          : feederFill === null ? ""
          : t(hass, "feeder_level").replace("{pct}",
            new Intl.NumberFormat(lang(hass), { style: "percent", maximumFractionDigits: 0 }).format(feederFill / 100));
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

    // An iron, read from the plug it is on: heating or off, and the state line
    // says so in its own words, since "running" says nothing of an iron.
    let leftOn = false;
    if (cap.iron) {
      if (norm === "running" || norm === "idle") {
        if (!cfg.state_show_raw) stateLabel = t(hass, norm === "running" ? "iron_heating" : "iron_off");
        if (norm === "running") color = "#ff7043";
      }
      // Left on: the one thing an owner puts a plug on an iron for. The card
      // counts the minutes itself, because a plug left on stops changing and
      // nothing would push the update that crosses the threshold. The count
      // starts when the state entity last changed, which on a switch is the
      // moment it was switched on; a meter moving with every watt only dates
      // from when the card first saw it heating.
      const afterMin = parseFloat(cfg.left_on_after);
      if (Number.isFinite(afterMin) && afterMin > 0 && isActiveState(norm)) {
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

    // Power draw is worth showing on any type once the entity is there.
    if (!cap.fridgeTemp && !cap.heatPump && cfg.power_entity && watts !== null) {
      extraLines.push({
        key: "power",
        icon: cfg.power_icon || "mdi:power-plug",
        label: t(hass, "power"),
        value: `${Math.round(watts)} ${unitOf(hass, cfg.power_entity) || "W"}`,
        entity: cfg.power_entity,
      });
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
        : applianceType === "iron" ? isActiveState(norm) : false,
      keepWarm: norm === "keep_warm",
      lit,
      display: displayText,
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
      feederLayout: cfg.feeder_layout === "canister" ? "canister" : "",
      ironLayout: cfg.iron_layout === "generator" ? "generator" : "",
      leftOn,
      tankTemp,
      boilerMode,
      hpMode,
      compressorOff,
      noTank: applianceType === "heat_pump" && !!cfg.no_hot_water,
      underfloor: applianceType === "heat_pump" && !!cfg.underfloor_heating,
      p3,
    };

    // A plain on/off control, for the types that have no cycle to start or
    // stop: a hood or a cooktop could report its state but never change it.
    let toggleOn = false;
    if (cfg.toggle_entity) {
      const tst = stateObj(hass, cfg.toggle_entity);
      toggleOn = !!tst && ["on", "true", "open"].includes(String(tst.state).toLowerCase());
    }

    // Action buttons
    const actions = [
      { key: "toggle", entity: cfg.toggle_entity, icon: "mdi:power", label: t(hass, "toggle"), on: toggleOn },
      { key: "start", entity: cfg.start_entity, icon: "mdi:play", label: t(hass, "start") },
      { key: "pause", entity: cfg.pause_entity, icon: "mdi:pause", label: t(hass, "pause") },
      { key: "resume", entity: cfg.resume_entity, icon: "mdi:play-pause", label: t(hass, "resume") },
      { key: "stop", entity: cfg.stop_entity, icon: "mdi:stop", label: t(hass, "stop") },
      cap.filter ? { key: "filter_reset", entity: cfg.filter_reset_entity, icon: "mdi:air-filter", label: t(hass, "filter_reset") } : {},
    ]
      .map((a) => (a.key && a.key !== "toggle" ? { ...a, option: cfg[`${a.key}_option`], value: cfg[`${a.key}_value`] } : a))
      // A button's icon can be swapped for another, `start_icon` and its
      // siblings: what a press does is the owner's business, and mdi:play
      // reads as "run a programme" where a feeder only drops a portion. The
      // editor does not offer it, since a menu long enough to hold every
      // icon of the card would be a menu nobody reads.
      .map((a) => (a.key && cfg[`${a.key}_icon`] ? { ...a, icon: cfg[`${a.key}_icon`] } : a))
      .filter((a) => a.entity && !cap.readOnly);

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
      illustrationCtx.boilerMode,
      illustrationCtx.hpMode,
      illustrationCtx.compressorOff,
      illustrationCtx.noTank,
      illustrationCtx.underfloor,
      illustrationCtx.leftOn,
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

    const styleTag = `
      <style>
        :host { font-size: 16px; --anim-offset: ${animOffset}s;${bodyVar} }
        ha-card { display: block; padding: 16px; position: relative; }
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
        .machine { position: relative; width: 96px; height: 108px; margin: 0 auto 8px; }
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
        /* Lines backed by an entity open its more-info dialog: that is where a
           venting level or a power level is actually changed, and it costs no
           extra height on the card. */
        .info-lines.compact { gap: 4px; }
        .info-lines.compact .info-line { font-size: 0.92em; }
        .info-lines.compact .info-line ha-icon { --mdc-icon-size: 18px; }
        .info-line.clickable { cursor: pointer; }
        /* A print file is one long word: it breaks anywhere rather than
           spilling out of the card. */
        .info-line.wrap span:last-child { min-width: 0; overflow-wrap: anywhere; }
        .info-line.warn { color: var(--error-color, #f44336); }
        .info-line.warn ha-icon { color: var(--error-color, #f44336); }
        .info-line.caution, .info-line.caution ha-icon { color: var(--warning-color, #ff9800); }
        .bar-row { margin-top: 4px; }
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
        .action-btn {
          display: flex; align-items: center; justify-content: center;
          width: 40px; height: 40px; flex-shrink: 0;
          border: 1px solid var(--divider-color, #e0e0e0);
          border-radius: 50%; cursor: pointer;
          background: var(--card-background-color, transparent);
          color: var(--primary-text-color, #1c1c1c);
        }
        .action-btn:hover { background: var(--secondary-background-color, rgba(0,0,0,0.04)); }
        .action-btn.on { color: var(--primary-color, #03a9f4); border-color: var(--primary-color, #03a9f4); }
        .action-btn ha-icon { --mdc-icon-size: 20px; }
      </style>
    `;

    const iconHtml = cfg.compact ? "" : illustrationHtml(applianceType, illustrationCtx);

    const stripNamePrefix = (friendlyName, entityId) => stripDeviceName(hass, friendlyName, entityId, name);

    let lines = [];
    if (programText) {
      lines.push(cap.printer3d
        ? { key: "file", icon: "mdi:file-outline", label: t(hass, "p3_file"), value: programText, wrap: true }
        : { key: "program", icon: "mdi:tag-outline", label: t(hass, "program"), value: programText });
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
          value: keepTogether(formatEta(remSec)),
        });
      } else {
        lines.push({
          key: "remaining",
          icon: "mdi:timer-outline",
          label: t(hass, "section_remaining"),
          value: remRounded > 0
            ? `${keepTogether(formatDuration(remSec, hass))}\u00a0\u00b7 ${keepTogether(`${t(hass, "ready_at")} ${formatEta(remSec)}`)}`
            : t(hass, "time_done"),
        });
      }
    }
    if (cap.door && !cap.fridgeTemp && cfg.door_entity && !cfg.door_hide_in_list) {
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
      const rank = (l) => {
        const at = l.key ? order.indexOf(l.key) : -1;
        return at === -1 ? order.length : at;
      };
      lines = lines
        .map((line, at) => ({ line, at }))
        .sort((a, b) => rank(a.line) - rank(b.line) || a.at - b.at)
        .map((x) => x.line);
    }
    // What the editor reads to offer an order: the lines actually drawn, in
    // the card's own language, rather than a second list to keep in step with
    // this one.
    this._drawnLines = lines.filter((l) => l.key).map((l) => ({ key: l.key, label: l.label }));
    const linesHtml = lines.length
      ? `<div class="info-lines${infoEntities.length > INFO_COMPACT_ABOVE ? " compact" : ""}">${lines
          .map((l) => ({ ...l, open: !!l.entity && entityUsable(hass, l.entity) }))
          .map(
            (l) =>
              `<div class="info-line ${l.warn ? "warn" : l.caution ? "caution" : ""}${l.open ? " clickable" : ""}${l.wrap ? " wrap" : ""}"${l.open ? ` data-more="${esc(l.entity)}"` : ""}><ha-icon icon="${esc(l.icon)}"></ha-icon><span class="label">${esc(l.label)}</span>${l.value ? `<span>${esc(l.value)}</span>` : ""}</div>`
          )
          .join("")}</div>`
      : "";

    // Bar priority: preheating beats cycle progress (it's the live information
    // while an oven climbs), and a hood has no cycle so its bar is the filter.
    let barPct = progressPct;
    let barColor = color;
    if (heatBarPct !== null) {
      barPct = heatBarPct;
      barColor = "#ff7043";
    } else if (cap.filter && filterPct !== null && progressPct === null) {
      barPct = filterPct;
      barColor = filterPct <= 15 ? "var(--error-color, #f44336)" : "var(--warning-color, #ff9800)";
    }

    const barHtml = barPct !== null
      ? `
        <div class="bar-row">
          <div class="bar"><div class="bar-fill" style="width:${barPct.toFixed(0)}%;background:${barColor}"></div></div>
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
    if (alertItems.length === 1) {
      alertsHtml = `<div class="alerts-wrap">${alertItem(alertItems[0], "alerts-pill")}</div></div>`;
    } else if (alertItems.length > 1) {
      const open = !!this._alertsOpen;
      alertsHtml = `<div class="alerts-wrap"><div class="alerts-pill" data-alerts-toggle="1" aria-expanded="${open}"><ha-icon icon="mdi:alert-circle"></ha-icon><span class="alert-label">${esc(alertsCountLabel(hass, alertItems.length))}</span><ha-icon class="caret" icon="mdi:chevron-${open ? "up" : "down"}"></ha-icon></div>${open
        ? `<div class="alerts-menu">${alertItems.map((a) => `${alertItem(a, "alert-row")}<ha-icon class="go" icon="mdi:chevron-right"></ha-icon></div>`).join("")}</div>`
        : ""}</div>`;
    }

    const actionsHtml = actions.length
      ? `<div class="actions-row">${actions
          .map(
            (a) =>
              `<div class="action-btn ${a.on ? "on" : ""}" data-entity="${esc(a.entity)}"${a.option ? ` data-option="${esc(a.option)}"` : ""}${a.value !== undefined && a.value !== null && a.value !== "" ? ` data-value="${esc(a.value)}"` : ""} title="${esc(a.label)}" aria-label="${esc(a.label)}"><ha-icon icon="${esc(a.icon)}"></ha-icon></div>`
          )
          .join("")}</div>`
      : "";

    const connBadgeHtml = connectivity !== null
      ? `<div class="conn-badge ${connectivity ? "" : "disconnected"}"><ha-icon icon="${connectivity ? "mdi:wifi" : "mdi:wifi-off"}"></ha-icon></div>`
      : "";

    const lightBadgeHtml = cap.light && cfg.light_entity
      ? `<div class="light-badge ${lit ? "on" : ""}" data-entity="${esc(cfg.light_entity)}" title="${esc(t(hass, "light"))}" aria-label="${esc(t(hass, "light"))}"><ha-icon icon="${lit ? "mdi:lightbulb-on" : "mdi:lightbulb-outline"}"></ha-icon></div>`
      : "";

    // The switches the user wants at hand: the first on the left, the second
    // on the right, each under what already sits in its corner. The icon says
    // what each one does and whether it holds.
    const cornersHtml = entityEntries(cfg.corner_entities, CORNERS_MAX)
      .filter((c) => stateObj(hass, c.entity))
      .map((c, i) => {
        const cst = stateObj(hass, c.entity);
        const on = cornerOn(cst);
        const icon = cornerIcon(hass, c);
        const label = c.label || stripNamePrefix(cst.attributes.friendly_name, c.entity);
        const side = i ? "right" : "left";
        const top = (side === "left" ? lightBadgeHtml : connBadgeHtml) ? 36 : 6;
        return `<div class="corner-btn ${side}${on ? " on" : ""}" style="top:${top}px" data-corner="${esc(c.entity)}" title="${esc(label)}" aria-label="${esc(label)}"><ha-icon icon="${esc(icon)}"></ha-icon></div>`;
      })
      .join("");

    this._root.innerHTML = `
      ${styleTag}
      <ha-card>
        ${lightBadgeHtml}
        ${connBadgeHtml}
        ${cornersHtml}
        <div class="top" id="header">
          ${iconHtml}
          <div class="name">${esc(name)}</div>
          ${stateLabel ? `<div class="state-line">${esc(stateLabel)}</div>` : ""}
        </div>
        ${barHtml}
        ${linesHtml}
        ${alertsHtml}
        ${actionsHtml}
      </ha-card>
    `;

    const header = this._root.getElementById("header");
    if (header) header.addEventListener("click", () => this._tap(cfg));
    this._root.querySelectorAll(".action-btn, .light-badge").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.stopPropagation();
        this._call(el.getAttribute("data-entity"), {
          option: el.getAttribute("data-option"),
          value: el.getAttribute("data-value"),
        });
      });
    });
    this._root.querySelectorAll(".info-line[data-more], .alert-row[data-more], .alerts-pill[data-more]").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.stopPropagation();
        this._moreInfo(el.getAttribute("data-more"));
      });
    });
    // A lock is opened rather than unlocked: a stray tap on a dashboard must
    // never unlock anything.
    this._root.querySelectorAll("[data-corner]").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.stopPropagation();
        const id = el.getAttribute("data-corner");
        if (domainOf(id) === "lock") this._moreInfo(id);
        else this._call(id);
      });
    });
    this._root.querySelectorAll("[data-alerts-toggle]").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.stopPropagation();
        this._alertsOpen = !this._alertsOpen;
        this._render();
      });
    });
  }
}

// ---------------------------------------------------------------------------
// Editor
// ---------------------------------------------------------------------------

const ACTION_DOMAINS = ["button", "switch", "script", "input_boolean"];
// A control can also be a list to pick from or a number to write, which is how
// pet feeders dispense. A power switch cannot, so this list is its own.
const START_DOMAINS = ACTION_DOMAINS.concat(["automation", "select", "input_select", "number", "input_number"]);

// Which types a section applies to. Anything cycle-shaped keeps the original
// program/time/door/controls set; a hood or a cooktop would only be cluttered
// by fields it can never fill.
const CYCLE_TYPES = ["washer", "dryer", "dishwasher", "oven", "microwave", "cooker", "coffee", "rice_cooker", "printer_3d"];
// A coffee machine has no door and a cooker's lid has no sensor, so neither
// belongs in the door section even though both run programs.
const DOOR_TYPES = ["washer", "dryer", "dishwasher", "oven", "microwave", "fridge"];
// A pet feeder has no cycle, but it does have one thing to press.
const START_TYPES = CYCLE_TYPES.concat(["pet_feeder"]);

const SECTIONS = [
  { field: "program_entity", types: CYCLE_TYPES.filter((ty) => ty !== "printer_3d"), labelKey: "section_program", includeDomains: ["select", "sensor", "input_select"], extra: (c, hass) => c._row("program_format", "program_format", {
      type: "select",
      options: [
        { value: "clean", label: t(hass, "program_format_clean") },
        { value: "raw", label: t(hass, "program_format_raw") },
      ],
    }) },
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
      c._row("door_hide_in_list", "door_hide_in_list", { type: "checkbox" }) },

  // Oven
  { field: "target_temperature_entity", types: ["oven", "cooker", "rice_cooker"], labelKey: "section_target_temperature", includeDomains: ["number", "sensor", "input_number"] },
  { field: "current_temperature_entity", types: ["oven", "cooker", "rice_cooker"], labelKey: "section_current_temperature", includeDomains: ["sensor", "number"] },
  { field: "heating_entity", types: ["oven", "cooker", "rice_cooker"], labelKey: "section_heating", includeDomains: ["binary_sensor", "sensor", "switch"] },

  // Microwave
  { field: "power_level_entity", types: ["microwave", "cooktop"], labelKey: "section_power_level", includeDomains: ["number", "select", "sensor", "input_number", "input_select"] },

  // Hood
  { field: "fan_entity", types: ["hood"], labelKey: "section_fan", includeDomains: ["fan", "select", "input_select", "sensor", "number", "input_number"] },
  { field: "boost_entity", types: ["hood"], labelKey: "section_boost", includeDomains: ["switch", "binary_sensor", "input_boolean"] },
  { field: "filter_life_entity", types: ["hood"], labelKey: "section_filter_life", includeDomains: ["sensor"] },
  { field: "filter_reset_entity", types: ["hood"], labelKey: "section_filter_reset", includeDomains: ACTION_DOMAINS },

  // Oven + hood
  { field: "light_entity", types: ["oven", "hood", "printer_3d"], labelKey: "section_light", includeDomains: ["light", "switch", "input_boolean", "binary_sensor"] },

  // Cooktop
  { field: "child_lock_entity", types: ["cooktop"], labelKey: "section_child_lock", includeDomains: ["binary_sensor", "switch", "lock"] },

  // Fridge. One option describes both the number of doors and where the
  // freezer sits, because on a real fridge those are the same fact.
  { field: "fridge_temperature_entity", types: ["fridge"], labelKey: "section_fridge_temperature", includeDomains: ["sensor", "number", "input_number"], extra: (c, hass) =>
      c._row("fridge_max_temperature", "fridge_max_temperature", { placeholder: c._config.fridge_layout === "wine" ? "18" : "8" })
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
  { field: "outdoor_temperature_entity", types: ["heat_pump"], labelKey: "section_outdoor_temperature", includeDomains: ["sensor"] },
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
  { field: "error_entity", types: ["pet_feeder"], labelKey: "section_error", includeDomains: ["binary_sensor", "sensor"] },

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
  { field: "toggle_entity", types: APPLIANCE_TYPES.filter((ty) => !caps(ty).readOnly), labelKey: "section_toggle", includeDomains: ACTION_DOMAINS.concat(["fan"]) },

  // Any type: a plug's power meter, optionally driving the state itself.
  { field: "power_entity", types: APPLIANCE_TYPES, labelKey: "section_power", includeDomains: ["sensor"], extra: (c) =>
      c._row("power_on_threshold", "power_on_threshold", { placeholder: caps(c._currentType()).fridgeTemp ? "1" : "10" })
      + (caps(c._currentType()).fridgeTemp ? c._row("no_power_after", "no_power_after", { placeholder: "30" }) : "") },

  { field: "alerts_entity", types: APPLIANCE_TYPES, labelKey: "section_alerts", includeDomains: ["sensor", "binary_sensor"] },
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
  { field: "pause_entity", types: CYCLE_TYPES, labelKey: "section_pause", includeDomains: ACTION_DOMAINS },
  { field: "resume_entity", types: CYCLE_TYPES, labelKey: "section_resume", includeDomains: ACTION_DOMAINS },
  { field: "stop_entity", types: CYCLE_TYPES, labelKey: "section_stop", includeDomains: ACTION_DOMAINS },
];

function sectionsForType(type) {
  return SECTIONS.filter((s) => !s.types || s.types.includes(type));
}

function setsEqual(a, b) {
  if (a.size !== b.size) return false;
  for (const v of a) if (!b.has(v)) return false;
  return true;
}

class ApplianceCardEditor extends HTMLElement {
  _currentType() {
    const st = this._hass && this._config ? stateObj(this._hass, this._config.state_entity) : null;
    return detectApplianceType(this._config || {}, st);
  }

  _sections() {
    return sectionsForType(this._currentType());
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
    const cardName = this._config.name || (card && card.attributes.friendly_name);
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
    const patch = autoSuggest(this._hass, this._config);
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
    const value = this._config[field] || "";
    if (opts.type === "checkbox") {
      return `
        <div class="row row-inline">
          <label><input type="checkbox" data-field="${field}" data-type="checkbox" ${this._config[field] ? "checked" : ""} /> ${t(hass, labelKey)}</label>
        </div>`;
    }
    if (opts.type === "select") {
      const options = opts.options
        .map((o) => `<option value="${esc(o.value)}" ${o.value === value ? "selected" : ""}>${esc(o.label)}</option>`)
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
        <label class="row-inline"><input type="checkbox" data-toggle="${section.field}" ${open ? "checked" : ""} /> ${t(hass, section.labelKey)}</label>
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
          options: [
            { value: "auto", label: t(hass, "type_auto") },
            { value: "washer", label: t(hass, "type_washer") },
            { value: "dryer", label: t(hass, "type_dryer") },
            { value: "dishwasher", label: t(hass, "type_dishwasher") },
            { value: "oven", label: t(hass, "type_oven") },
            { value: "microwave", label: t(hass, "type_microwave") },
            { value: "hood", label: t(hass, "type_hood") },
            { value: "cooktop", label: t(hass, "type_cooktop") },
            { value: "fridge", label: t(hass, "type_fridge") },
            { value: "kettle", label: t(hass, "type_kettle") },
            { value: "cooker", label: t(hass, "type_cooker") },
            { value: "coffee", label: t(hass, "type_coffee") },
            { value: "rice_cooker", label: t(hass, "type_rice_cooker") },
            { value: "water_heater", label: t(hass, "type_water_heater") },
            { value: "boiler", label: t(hass, "type_boiler") },
            { value: "heat_pump", label: t(hass, "type_heat_pump") },
            { value: "printer_3d", label: t(hass, "type_printer_3d") },
            { value: "pet_feeder", label: t(hass, "type_pet_feeder") },
          ],
        })}
        ${this._type === "washer" ? this._row("washer_dryer", "washer_dryer", { type: "checkbox" }) : ""}
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
          ],
        }) : ""}
        ${this._type === "pet_feeder" ? this._row("section_feeder_layout", "feeder_layout", {
          type: "select",
          options: [
            { value: "tower", label: t(hass, "layout_tower") },
            { value: "canister", label: t(hass, "layout_canister") },
          ],
        }) : ""}
        ${this._type === "iron" ? this._row("section_iron_layout", "iron_layout", {
          type: "select",
          options: [
            { value: "iron", label: t(hass, "layout_iron") },
            { value: "generator", label: t(hass, "layout_generator") },
          ],
        }) + this._row("left_on_after", "left_on_after", { placeholder: "30" }) : ""}
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
          ${this._row("illustration_color", "illustration_color", {
            type: "select",
            options: [{ value: "auto", label: t(hass, "color_auto") }].concat(
              Object.keys(BODY_COLORS).map((k) => ({ value: k, label: t(hass, `color_${k}`) }))
            ),
          })}
          ${this._row("compact", "compact", { type: "checkbox" })}
          ${this._row("state_show_raw", "state_show_raw", { type: "checkbox" })}
        </div>
        <div class="section">
          <div class="picker-slot" data-slot="state_entity"></div>
          <div class="picker-slot" data-slot="__state_map"></div>
        </div>
        ${this._sections().map((s) => this._sectionHtml(s)).join("")}
      </details>
      ${caps(this._type).zones ? `
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
      ${ENTITY_LISTS.map((list) => this._listPanel(list)).join("")}
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
    this._mountStateMap(this._root.querySelector('[data-slot="__state_map"]'));
    this._mountPicker(this._root.querySelector('[data-slot="state_entity"]'), "state_entity", {
      label: t(hass, "state_entity"),
      // A tank, a combi boiler and a heat pump are often their integration's
      // own water_heater or climate entity.
      includeDomains: ["sensor", "binary_sensor"].concat(
        { water_heater: ["water_heater"], boiler: ["water_heater"], heat_pump: ["climate", "water_heater"] }[this._type] || []),
    });
    for (const s of this._sections()) {
      if (this._open.has(s.field)) {
        this._mountPicker(this._root.querySelector(`[data-slot="${s.field}"]`), s.field, { includeDomains: s.includeDomains });
      }
    }
    if (caps(this._type).zones) {
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
  description: "Card for washers, dryers, dishwashers, ovens, microwaves, cooker hoods & cooktops. Works with any brand or integration via configurable entity mapping.",
});
