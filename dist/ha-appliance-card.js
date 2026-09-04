const CARD_VERSION = "2.1.2";

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
    section_progress: "Progress % (override)", section_door: "Door sensor",
    section_alerts: "Alerts", section_connectivity: "Connectivity",
    section_info: "Extra info entities",
    info_count: "Number of extra entities",
    info_label: "Display name (optional)",
    info_value_map: "Value mapping (optional)",
    info_value_map_placeholder: "One per line, e.g.\n0: Ready\n1: Washing",
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
    unplugged: "Unplugged", kettle_heating: "Heating",
    kettle_off: "Off", fridge_compartment: "Fridge",
    freezer_compartment: "Freezer", ice_maker: "Ice maker",
    since: "for", section_fridge_layout: "Layout",
    layout_single: "One door", layout_freezer_bottom: "Freezer at the bottom",
    layout_freezer_top: "Freezer on top", layout_side_by_side: "Side by side",
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
  },
  fr: {
    idle: "En veille", running: "En cours", paused: "En pause", done: "Termin\u00e9",
    delayed: "D\u00e9part diff\u00e9r\u00e9", error: "Erreur", unknown: "Inconnu",
    program: "Programme", remaining: "restant", ready_at: "fin ~", time_done: "Fin",
    door_open: "Porte ouverte", door_closed: "Porte ferm\u00e9e", alerts: "Alertes",
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
    section_progress: "Progression % (remplace l'estimation)", section_door: "Capteur de porte",
    section_alerts: "Alertes", section_connectivity: "Connectivit\u00e9",
    section_info: "Entit\u00e9s d'info compl\u00e9mentaires",
    info_count: "Nombre d'entit\u00e9s suppl\u00e9mentaires",
    info_label: "Nom affich\u00e9 (optionnel)",
    info_value_map: "Correspondance des valeurs (optionnel)",
    info_value_map_placeholder: "Une par ligne, ex.\n0: Pr\u00eat\n1: Lavage",
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
    unplugged: "D\u00e9branch\u00e9", kettle_heating: "En chauffe",
    kettle_off: "\u00c0 l'arr\u00eat", fridge_compartment: "R\u00e9frig\u00e9rateur",
    freezer_compartment: "Cong\u00e9lateur", ice_maker: "Gla\u00e7ons",
    since: "depuis", section_fridge_layout: "Implantation",
    layout_single: "Une porte", layout_freezer_bottom: "Cong\u00e9lateur en bas",
    layout_freezer_top: "Cong\u00e9lateur en haut", layout_side_by_side: "Am\u00e9ricain",
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
  },
  ru: {
    idle: "\u041e\u0436\u0438\u0434\u0430\u043d\u0438\u0435", running: "\u0420\u0430\u0431\u043e\u0442\u0430\u0435\u0442", paused: "\u041d\u0430 \u043f\u0430\u0443\u0437\u0435", done: "\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u043e",
    delayed: "\u041e\u0442\u043b\u043e\u0436\u0435\u043d\u043d\u044b\u0439 \u0441\u0442\u0430\u0440\u0442", error: "\u041e\u0448\u0438\u0431\u043a\u0430", unknown: "\u041d\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043d\u043e",
    program: "\u041f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0430", remaining: "\u043e\u0441\u0442\u0430\u043b\u043e\u0441\u044c", ready_at: "\u043e\u043a\u043e\u043d\u0447\u0430\u043d\u0438\u0435 ~", time_done: "\u0413\u043e\u0442\u043e\u0432\u043e",
    door_open: "\u0414\u0432\u0435\u0440\u044c \u043e\u0442\u043a\u0440\u044b\u0442\u0430", door_closed: "\u0414\u0432\u0435\u0440\u044c \u0437\u0430\u043a\u0440\u044b\u0442\u0430", alerts: "\u041e\u043f\u043e\u0432\u0435\u0449\u0435\u043d\u0438\u044f",
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
    section_progress: "\u041f\u0440\u043e\u0433\u0440\u0435\u0441\u0441 % (\u043f\u0435\u0440\u0435\u043e\u043f\u0440\u0435\u0434\u0435\u043b\u0435\u043d\u0438\u0435)", section_door: "\u0414\u0430\u0442\u0447\u0438\u043a \u0434\u0432\u0435\u0440\u0438",
    section_alerts: "\u041e\u043f\u043e\u0432\u0435\u0449\u0435\u043d\u0438\u044f", section_connectivity: "\u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435",
    section_info: "\u0414\u043e\u043f. \u0441\u0443\u0449\u043d\u043e\u0441\u0442\u0438 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438",
    info_count: "\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0434\u043e\u043f. \u0441\u0443\u0449\u043d\u043e\u0441\u0442\u0435\u0439",
    info_label: "\u041e\u0442\u043e\u0431\u0440\u0430\u0436\u0430\u0435\u043c\u043e\u0435 \u0438\u043c\u044f (\u043d\u0435\u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e)",
    info_value_map: "\u0421\u043e\u043f\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0439 (\u043d\u0435\u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e)",
    info_value_map_placeholder: "\u041f\u043e \u043e\u0434\u043d\u043e\u043c\u0443 \u0432 \u0441\u0442\u0440\u043e\u043a\u0435, \u043d\u0430\u043f\u0440.\n0: \u0413\u043e\u0442\u043e\u0432\u043e\n1: \u0421\u0442\u0438\u0440\u043a\u0430",
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
    unplugged: "\u041e\u0442\u043a\u043b\u044e\u0447\u0451\u043d \u043e\u0442 \u0441\u0435\u0442\u0438", kettle_heating: "\u041d\u0430\u0433\u0440\u0435\u0432",
    kettle_off: "\u0412\u044b\u043a\u043b\u044e\u0447\u0435\u043d", fridge_compartment: "\u0425\u043e\u043b\u043e\u0434\u0438\u043b\u044c\u043d\u0438\u043a",
    freezer_compartment: "\u041c\u043e\u0440\u043e\u0437\u0438\u043b\u044c\u043d\u0438\u043a", ice_maker: "\u041b\u0435\u0434\u043e\u0433\u0435\u043d\u0435\u0440\u0430\u0442\u043e\u0440",
    since: "\u0443\u0436\u0435", section_fridge_layout: "\u041a\u043e\u043c\u043f\u043e\u043d\u043e\u0432\u043a\u0430",
    layout_single: "\u041e\u0434\u043d\u0430 \u0434\u0432\u0435\u0440\u044c", layout_freezer_bottom: "\u041c\u043e\u0440\u043e\u0437\u0438\u043b\u043a\u0430 \u0441\u043d\u0438\u0437\u0443",
    layout_freezer_top: "\u041c\u043e\u0440\u043e\u0437\u0438\u043b\u043a\u0430 \u0441\u0432\u0435\u0440\u0445\u0443", layout_side_by_side: "Side by side",
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
  },
  de: {
    idle: "Inaktiv", running: "L\u00e4uft", paused: "Pausiert", done: "Fertig",
    delayed: "Startverz\u00f6gerung", error: "Fehler", unknown: "Unbekannt",
    program: "Programm", remaining: "verbleibend", ready_at: "fertig um", time_done: "Fertig",
    door_open: "T\u00fcr offen", door_closed: "T\u00fcr geschlossen", alerts: "Warnungen",
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
    section_progress: "Fortschritt % (\u00dcberschreibung)", section_door: "T\u00fcrsensor",
    section_alerts: "Warnungen", section_connectivity: "Konnektivit\u00e4t",
    section_info: "Zus\u00e4tzliche Info-Entit\u00e4ten",
    info_count: "Anzahl zus\u00e4tzlicher Entit\u00e4ten",
    info_label: "Anzeigename (optional)",
    info_value_map: "Wertzuordnung (optional)",
    info_value_map_placeholder: "Eine pro Zeile, z. B.\n0: Bereit\n1: Waschen",
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
    unplugged: "Nicht angeschlossen", kettle_heating: "Heizt",
    kettle_off: "Aus", fridge_compartment: "K\u00fchlteil",
    freezer_compartment: "Gefrierteil", ice_maker: "Eisbereiter",
    since: "seit", section_fridge_layout: "Bauform",
    layout_single: "Eine T\u00fcr", layout_freezer_bottom: "Gefrierteil unten",
    layout_freezer_top: "Gefrierteil oben", layout_side_by_side: "Side-by-Side",
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
  },
  es: {
    idle: "Inactivo", running: "En marcha", paused: "En pausa", done: "Finalizado",
    delayed: "Inicio diferido", error: "Error", unknown: "Desconocido",
    program: "Programa", remaining: "restante", ready_at: "listo a las", time_done: "Fin",
    door_open: "Puerta abierta", door_closed: "Puerta cerrada", alerts: "Alertas",
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
    section_progress: "Progreso % (anula estimaci\u00f3n)", section_door: "Sensor de puerta",
    section_alerts: "Alertas", section_connectivity: "Conectividad",
    section_info: "Entidades de informaci\u00f3n adicionales",
    info_count: "N\u00famero de entidades adicionales",
    info_label: "Nombre mostrado (opcional)",
    info_value_map: "Correspondencia de valores (opcional)",
    info_value_map_placeholder: "Una por l\u00ednea, p. ej.\n0: Listo\n1: Lavado",
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
    unplugged: "Desenchufado", kettle_heating: "Calentando",
    kettle_off: "Apagado", fridge_compartment: "Frigor\u00edfico",
    freezer_compartment: "Congelador", ice_maker: "Fabricador de hielo",
    since: "desde hace", section_fridge_layout: "Distribuci\u00f3n",
    layout_single: "Una puerta", layout_freezer_bottom: "Congelador abajo",
    layout_freezer_top: "Congelador arriba", layout_side_by_side: "Side by side",
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
  },
  it: {
    idle: "Inattivo", running: "In funzione", paused: "In pausa", done: "Terminato",
    delayed: "Avvio ritardato", error: "Errore", unknown: "Sconosciuto",
    program: "Programma", remaining: "rimanente", ready_at: "pronto alle", time_done: "Fine",
    door_open: "Portello aperto", door_closed: "Portello chiuso", alerts: "Avvisi",
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
    section_progress: "Progresso % (sovrascrive stima)", section_door: "Sensore portello",
    section_alerts: "Avvisi", section_connectivity: "Connettivit\u00e0",
    section_info: "Entit\u00e0 informative aggiuntive",
    info_count: "Numero di entit\u00e0 aggiuntive",
    info_label: "Nome visualizzato (opzionale)",
    info_value_map: "Corrispondenza dei valori (opzionale)",
    info_value_map_placeholder: "Una per riga, es.\n0: Pronto\n1: Lavaggio",
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
    unplugged: "Scollegato", kettle_heating: "In riscaldamento",
    kettle_off: "Spento", fridge_compartment: "Frigorifero",
    freezer_compartment: "Congelatore", ice_maker: "Fabbricatore di ghiaccio",
    since: "da", section_fridge_layout: "Configurazione",
    layout_single: "Una porta", layout_freezer_bottom: "Congelatore in basso",
    layout_freezer_top: "Congelatore in alto", layout_side_by_side: "Side by side",
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
  },
  nl: {
    idle: "Inactief", running: "Actief", paused: "Gepauzeerd", done: "Klaar",
    delayed: "Uitgestelde start", error: "Fout", unknown: "Onbekend",
    program: "Programma", remaining: "resterend", ready_at: "klaar om", time_done: "Klaar",
    door_open: "Deur open", door_closed: "Deur dicht", alerts: "Meldingen",
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
    section_progress: "Voortgang % (overschrijft schatting)", section_door: "Deursensor",
    section_alerts: "Meldingen", section_connectivity: "Connectiviteit",
    section_info: "Extra info-entiteiten",
    info_count: "Aantal extra entiteiten",
    info_label: "Weergavenaam (optioneel)",
    info_value_map: "Waardetoewijzing (optioneel)",
    info_value_map_placeholder: "E\u00e9n per regel, bijv.\n0: Gereed\n1: Wassen",
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
    unplugged: "Niet aangesloten", kettle_heating: "Aan het koken",
    kettle_off: "Uit", fridge_compartment: "Koelkast",
    freezer_compartment: "Vriezer", ice_maker: "IJsmaker",
    since: "sinds", section_fridge_layout: "Indeling",
    layout_single: "E\u00e9n deur", layout_freezer_bottom: "Vriezer onderin",
    layout_freezer_top: "Vriezer bovenin", layout_side_by_side: "Side by side",
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
  },
  pt: {
    idle: "Inativo", running: "Em funcionamento", paused: "Em pausa", done: "Conclu\u00eddo",
    delayed: "In\u00edcio diferido", error: "Erro", unknown: "Desconhecido",
    program: "Programa", remaining: "restante", ready_at: "pronto \u00e0s", time_done: "Fim",
    door_open: "Porta aberta", door_closed: "Porta fechada", alerts: "Alertas",
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
    section_progress: "Progresso % (substitui estimativa)", section_door: "Sensor de porta",
    section_alerts: "Alertas", section_connectivity: "Conetividade",
    section_info: "Entidades de informa\u00e7\u00e3o adicionais",
    info_count: "N\u00famero de entidades adicionais",
    info_label: "Nome exibido (opcional)",
    info_value_map: "Correspond\u00eancia de valores (opcional)",
    info_value_map_placeholder: "Uma por linha, ex.\n0: Pronto\n1: Lavagem",
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
    unplugged: "Desligado da tomada", kettle_heating: "A aquecer",
    kettle_off: "Desligada", fridge_compartment: "Frigor\u00edfico",
    freezer_compartment: "Congelador", ice_maker: "M\u00e1quina de gelo",
    since: "h\u00e1", section_fridge_layout: "Configura\u00e7\u00e3o",
    layout_single: "Uma porta", layout_freezer_bottom: "Congelador em baixo",
    layout_freezer_top: "Congelador em cima", layout_side_by_side: "Side by side",
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
  },
  sv: {
    idle: "Inaktiv", running: "Ig\u00e5ng", paused: "Pausad", done: "Klar",
    delayed: "F\u00f6rdr\u00f6jd start", error: "Fel", unknown: "Ok\u00e4nd",
    program: "Program", remaining: "kvar", ready_at: "klar kl.", time_done: "Klar",
    door_open: "Lucka \u00f6ppen", door_closed: "Lucka st\u00e4ngd", alerts: "Varningar",
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
    section_progress: "F\u00f6rlopp % (\u00e5sidos\u00e4tter uppskattning)", section_door: "Luckans sensor",
    section_alerts: "Varningar", section_connectivity: "Anslutning",
    section_info: "Extra infoentiteter",
    info_count: "Antal extra entiteter",
    info_label: "Visningsnamn (valfritt)",
    info_value_map: "V\u00e4rdemappning (valfritt)",
    info_value_map_placeholder: "En per rad, t.ex.\n0: Klar\n1: Tv\u00e4tt",
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
    unplugged: "Urkopplad", kettle_heating: "V\u00e4rmer",
    kettle_off: "Av", fridge_compartment: "Kyl",
    freezer_compartment: "Frys", ice_maker: "Ismaskin",
    since: "sedan", section_fridge_layout: "Utf\u00f6rande",
    layout_single: "En d\u00f6rr", layout_freezer_bottom: "Frys nedtill",
    layout_freezer_top: "Frys upptill", layout_side_by_side: "Side by side",
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
  },
  no: {
    idle: "Inaktiv", running: "I gang", paused: "Pauset", done: "Ferdig",
    delayed: "Utsatt start", error: "Feil", unknown: "Ukjent",
    program: "Program", remaining: "gjenst\u00e5r", ready_at: "ferdig kl.", time_done: "Ferdig",
    door_open: "Luke \u00e5pen", door_closed: "Luke lukket", alerts: "Varsler",
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
    section_progress: "Fremdrift % (overstyrer estimat)", section_door: "Lukesensor",
    section_alerts: "Varsler", section_connectivity: "Tilkobling",
    section_info: "Ekstra infoentiteter",
    info_count: "Antall ekstra entiteter",
    info_label: "Visningsnavn (valgfritt)",
    info_value_map: "Verditilordning (valgfritt)",
    info_value_map_placeholder: "\u00c9n per linje, f.eks.\n0: Klar\n1: Vask",
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
    unplugged: "Frakoblet", kettle_heating: "Varmer",
    kettle_off: "Av", fridge_compartment: "Kj\u00f8l",
    freezer_compartment: "Frys", ice_maker: "Ismaskin",
    since: "siden", section_fridge_layout: "Utf\u00f8relse",
    layout_single: "\u00c9n d\u00f8r", layout_freezer_bottom: "Frys nederst",
    layout_freezer_top: "Frys \u00f8verst", layout_side_by_side: "Side by side",
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
  },
  da: {
    idle: "Inaktiv", running: "I gang", paused: "Sat p\u00e5 pause", done: "F\u00e6rdig",
    delayed: "Forsinket start", error: "Fejl", unknown: "Ukendt",
    program: "Program", remaining: "resterer", ready_at: "f\u00e6rdig kl.", time_done: "F\u00e6rdig",
    door_open: "L\u00e5ge \u00e5ben", door_closed: "L\u00e5ge lukket", alerts: "Advarsler",
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
    section_progress: "Fremgang % (tilsides\u00e6tter estimat)", section_door: "L\u00e5gesensor",
    section_alerts: "Advarsler", section_connectivity: "Forbindelse",
    section_info: "Ekstra info-enheder",
    info_count: "Antal ekstra enheder",
    info_label: "Vist navn (valgfrit)",
    info_value_map: "V\u00e6rditilknytning (valgfrit)",
    info_value_map_placeholder: "\u00c9n pr. linje, f.eks.\n0: Klar\n1: Vask",
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
    unplugged: "Ikke tilsluttet", kettle_heating: "Varmer",
    kettle_off: "Slukket", fridge_compartment: "K\u00f8l",
    freezer_compartment: "Frys", ice_maker: "Ismaskine",
    since: "siden", section_fridge_layout: "Udf\u00f8relse",
    layout_single: "\u00c9n l\u00e5ge", layout_freezer_bottom: "Fryser nederst",
    layout_freezer_top: "Fryser \u00f8verst", layout_side_by_side: "Side by side",
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
  },
  pl: {
    idle: "Bezczynny", running: "W trakcie", paused: "Wstrzymany", done: "Zako\u0144czony",
    delayed: "Op\u00f3\u017aniony start", error: "B\u0142\u0105d", unknown: "Nieznany",
    program: "Program", remaining: "pozosta\u0142o", ready_at: "koniec o", time_done: "Koniec",
    door_open: "Drzwiczki otwarte", door_closed: "Drzwiczki zamkni\u0119te", alerts: "Alerty",
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
    section_progress: "Post\u0119p % (nadpisuje szacowanie)", section_door: "Czujnik drzwiczek",
    section_alerts: "Alerty", section_connectivity: "\u0141\u0105czno\u015b\u0107",
    section_info: "Dodatkowe encje informacyjne",
    info_count: "Liczba dodatkowych encji",
    info_label: "Nazwa wy\u015bwietlana (opcjonalnie)",
    info_value_map: "Mapowanie warto\u015bci (opcjonalnie)",
    info_value_map_placeholder: "Jedno na lini\u0119, np.\n0: Gotowe\n1: Pranie",
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
    unplugged: "Od\u0142\u0105czona", kettle_heating: "Grzeje",
    kettle_off: "Wy\u0142\u0105czony", fridge_compartment: "Ch\u0142odziarka",
    freezer_compartment: "Zamra\u017carka", ice_maker: "Kostkarka",
    since: "od", section_fridge_layout: "Uk\u0142ad",
    layout_single: "Jedne drzwi", layout_freezer_bottom: "Zamra\u017carka na dole",
    layout_freezer_top: "Zamra\u017carka u g\u00f3ry", layout_side_by_side: "Side by side",
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
  },
  zh: {
    idle: "\u7a7a\u95f2", running: "\u8fd0\u884c\u4e2d", paused: "\u6682\u505c", done: "\u5b8c\u6210",
    delayed: "\u5ef6\u8fdf\u542f\u52a8", error: "\u9519\u8bef", unknown: "\u672a\u77e5",
    program: "\u7a0b\u5e8f", remaining: "\u5269\u4f59\u65f6\u95f4", ready_at: "\u9884\u8ba1\u5b8c\u6210", time_done: "\u5b8c\u6210",
    door_open: "\u95e8\u5df2\u5f00", door_closed: "\u95e8\u5df2\u5173", alerts: "\u8b66\u62a5",
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
    section_progress: "\u8fdb\u5ea6\u767e\u5206\u6bd4\u5b9e\u4f53 (\u8986\u5199)", section_door: "\u95e8\u4f20\u611f\u5668",
    section_alerts: "\u8b66\u62a5", section_connectivity: "\u8fde\u7f51\u72b6\u6001",
    section_info: "\u989d\u5916\u4fe1\u606f\u5b9e\u4f53",
    info_count: "\u5b9e\u4f53\u6570\u91cf",
    info_label: "\u663e\u793a\u540d\u79f0 (\u53ef\u9009)",
    info_value_map: "\u503c\u6620\u5c04 (\u53ef\u9009)",
    info_value_map_placeholder: "\u6bcf\u4e2a\u503c\u4e00\u884c, \u4f8b\u5982\n0: \u5f85\u673a\n1: \u6d17\u6da4\u4e2d",
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
    unplugged: "\u5df2\u65ad\u7535", kettle_heating: "\u52a0\u70ed\u4e2d",
    kettle_off: "\u5df2\u5173\u95ed", fridge_compartment: "\u51b7\u85cf\u5ba4",
    freezer_compartment: "\u51b7\u51bb\u5ba4", ice_maker: "\u5236\u51b0\u673a",
    since: "\u5df2\u6301\u7eed", section_fridge_layout: "\u7ed3\u6784",
    layout_single: "\u5355\u95e8", layout_freezer_bottom: "\u4e0b\u7f6e\u51b7\u51bb\u5ba4",
    layout_freezer_top: "\u4e0a\u7f6e\u51b7\u51bb\u5ba4", layout_side_by_side: "\u5bf9\u5f00\u95e8",
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
  },
  cs: {
    idle: "Ne\u010dinn\u00e9", running: "V provozu", paused: "Pozastaveno", done: "Dokon\u010deno",
    delayed: "Odlo\u017een\u00fd start", error: "Chyba", unknown: "Nezn\u00e1m\u00fd stav",
    program: "Program", remaining: "zb\u00fdv\u00e1", ready_at: "hotovo v", time_done: "Hotovo",
    door_open: "Dv\u00ed\u0159ka otev\u0159en\u00e1", door_closed: "Dv\u00ed\u0159ka zav\u0159en\u00e1", alerts: "Upozorn\u011bn\u00ed",
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
    section_progress: "Pr\u016fb\u011bh v % (nahrazuje odhad)", section_door: "Sn\u00edma\u010d dv\u00ed\u0159ek",
    section_alerts: "Upozorn\u011bn\u00ed", section_connectivity: "P\u0159ipojen\u00ed",
    section_info: "Dal\u0161\u00ed informa\u010dn\u00ed entity",
    info_count: "Po\u010det dal\u0161\u00edch entit",
    info_label: "Zobrazovan\u00fd n\u00e1zev (voliteln\u00e9)",
    info_value_map: "Mapov\u00e1n\u00ed hodnot (voliteln\u00e9)",
    info_value_map_placeholder: "Jedna hodnota na \u0159\u00e1dek, nap\u0159.\n0: P\u0159ipraveno\n1: Pran\u00ed",
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
    unplugged: "Odpojeno od nap\u00e1jen\u00ed", kettle_heating: "Oh\u0159\u00edv\u00e1n\u00ed",
    kettle_off: "Vypnuto", fridge_compartment: "Chladni\u010dka",
    freezer_compartment: "Mrazni\u010dka", ice_maker: "V\u00fdrobn\u00edk ledu",
    since: "po dobu", section_fridge_layout: "Uspo\u0159\u00e1d\u00e1n\u00ed",
    layout_single: "Jedny dve\u0159e", layout_freezer_bottom: "Mrazni\u010dka dole",
    layout_freezer_top: "Mrazni\u010dka naho\u0159e", layout_side_by_side: "Vedle sebe",
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
  if (!hass || !want || want === "auto" || !T[want]) return hass;
  return { ...hass, language: want, locale: { ...(hass.locale || {}), language: want } };
}

// ---------------------------------------------------------------------------
// State normalization, working across brands and integrations
// ---------------------------------------------------------------------------

const STATE_KEYWORDS = {
  idle: ["idle", "off", "standby", "veille", "eteint", "arret", "inactif", "ready_to_start", "ready to start"],
  // Before "running": ovens report "Preheating", and the "heating" keyword
  // below cannot match it anyway (no word boundary inside "preheating").
  preheating: ["preheat", "pre-heat", "pre_heat", "prechauff", "vorheiz", "precalent", "voorverwarm"],
  // A rice cooker sits in this state for hours after it has finished, and so
  // does an oven on its warming setting. MIoT reports it as status 4,
  // "Keep-warm", and it is neither running nor done.
  keep_warm: ["keep.?warm", "keepwarm", "warming", "maintien", "au chaud",
    "warmhalten", "mantener caliente", "mantenimento", "warmhouden"],
  running: ["run", "wash", "spin", "dry", "rinsing", "heating", "cours", "on", "active", "marche", "actif",
    "cooking\\b(?!\\s*(?:complete|finished|done))", "cuisson\\b(?!\\s*termin)", "brewing", "baking"],
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

function normalizeState(raw, stateMap) {
  if (raw === undefined || raw === null) return "unknown";
  const s = String(raw).trim();
  if (["unknown", "unavailable", "none", ""].includes(s.toLowerCase())) return "unknown";
  if (stateMap && Object.prototype.hasOwnProperty.call(stateMap, s)) {
    const target = stateMap[s];
    return MAPPABLE_STATES.includes(target) ? target : "unknown";
  }
  const flat = stripAccents(s);
  for (const norm of Object.keys(STATE_KEYWORD_PATTERNS)) {
    if (STATE_KEYWORD_PATTERNS[norm].some((re) => re.test(flat))) return norm;
  }
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
  temp_high: "var(--warning-color, #ff9800)",
  door_open: "var(--error-color, #f44336)",
  unplugged: "var(--error-color, #f44336)",
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

function formatInfoValue(st, hass, valueMap) {
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
  return `${st.state}${st.attributes.unit_of_measurement ? " " + st.attributes.unit_of_measurement : ""}`;
}

// Home Connect, and the home_connect_alt custom integration, report the
// programme as a fully qualified enum: LaundryCare.Washer.Program.Auto40. Four
// segments at least, and only the last one names the programme. Requiring
// three dots rather than one keeps a decimal such as "1.5 kg", or a two-part
// name, from being mistaken for a namespace and cut down to its tail.
const PROGRAM_ENUM = /^[A-Za-z][A-Za-z0-9]*(\.[A-Za-z0-9]+){3,}$/;

function cleanProgramName(raw) {
  if (!raw) return raw;
  // Many integrations report "<Category> Pr <ProgramName>": keep the meaningful part.
  const parts = String(raw).split(/\s+Pr\s+/i);
  let name = parts.length > 1 ? parts[1] : parts[0];
  if (PROGRAM_ENUM.test(name)) name = name.slice(name.lastIndexOf(".") + 1);
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

function humanizeEntityId(entityId) {
  const objectId = (entityId || "").split(".")[1] || entityId || "";
  return objectId.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
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
  power_entity: /_power$|power_w$|watt/i,
};

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
  kettle: {
    temperature_entity: /temperature|water.?temp/i,
  },
  cooker: {
    target_temperature_entity: /target.?temp|setpoint/i,
    current_temperature_entity: /current.?temp|^(?!.*target).*temperature/i,
    speed_entity: /speed|vitesse|drehzahl/i,
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
  // editor then hides is just a stray key in the user's YAML.
  const allowed = new Set(sectionsForType(type).map((s) => s.field));
  const patterns = { ...AUTO_PATTERNS, ...(TYPE_AUTO_PATTERNS[type] || {}) };
  const patch = {};
  for (const [field, re] of Object.entries(patterns)) {
    if (cfg[field] || !allowed.has(field)) continue;
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

function caps(type) {
  return TYPE_CAPS[type] || TYPE_CAPS.washer;
}

function detectApplianceType(cfg, st) {
  if (cfg.appliance_type && cfg.appliance_type !== "auto") return cfg.appliance_type;
  // A fridge-only field settles it before any name matching: those keys mean
  // nothing on the other seven types, and a fridge may have no state entity
  // whose name could be matched in the first place.
  if (FRIDGE_ONLY_FIELDS.some((f) => cfg[f])) return "fridge";
  const hay = `${cfg.icon || ""} ${cfg.state_entity || ""} ${(st && st.attributes.icon) || ""}`.toLowerCase();
  // "microwave" before "oven": plenty of devices are named "microwave_oven".
  if (/microwave|micro.?onde|mikrowelle|magnetron|mikrob/.test(hay)) return "microwave";
  if (/coffee|cafeti|cafe|kaffee|espresso|cafetera|macchina.?caff|koffie|kaffemask|ekspres.?do.?kawy/.test(hay)) return "coffee";
  if (/rice.?cooker|ricecooker|cuiseur.?(a.?)?riz|reiskocher|arrocera|cuociriso|rijstkoker|multicooker.?rice/.test(hay)) return "rice_cooker";
  if (/cook.?processor|cookit|thermomix|robot.?cuiseur|companion|monsieur.?cuisine|cookeo|k\u00fcchenmaschine|kuchenmaschine|multicooker/.test(hay)) return "cooker";
  if (/fridge|freezer|frigo|r\u00e9frig|refrig|kuhlschrank|k\u00fchlschrank|nevera|frigor|koelkast|kyl(skap)?\b|kj\u00f8leskap|lod\u00f3wka|lodowka/.test(hay)) return "fridge";
  if (/kettle|bouilloire|wasserkocher|hervidor|bollitore|waterkoker|vattenkokare|vannkoker|elkedel|czajnik/.test(hay)) return "kettle";
  if (/hood|hotte|abzug|extractor|exaustor|afzuigkap|emh|okap/.test(hay)) return "hood";
  if (/cooktop|hotplate|plaque|kochfeld|kookplaat|induction|induktion|kogeplade/.test(hay)) return "cooktop";
  if (/oven|four|backofen|horno|forno|piekarnik/.test(hay)) return "oven";
  if (/dry|dryer|seche|s\u00e8che|tumble/.test(hay)) return "dryer";
  if (/dish|vaisselle/.test(hay)) return "dishwasher";
  return "washer";
}

// A plug reports isolated 0 W readings while everything is fine. Measured
// on a real fridge, the longest such run lasted 13 to 15 minutes. Half an hour
// below the threshold is therefore the shortest delay that cannot produce a
// false alarm, and it doubles the observed worst case.
const FRIDGE_UNPLUGGED_AFTER_MS = 30 * 60 * 1000;
// The count is shown in whole minutes, so half a minute is close enough to
// keep it honest without redrawing for nothing.
const FRIDGE_TICK_MS = 30 * 1000;

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
function fridgeHealth(unplugged, doorOpen, tempHigh) {
  if (unplugged) return "unplugged";
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
const ILLUSTRATION_CSS = {
  laundry: (color) => `
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
          position: absolute; left: -25%; top: -75%; width: 150%; height: 150%;
          border-radius: 45%; background: ${color}; opacity: 0.85;
          transition: background 1s linear;
        }
        .wave.wave2 { opacity: 0.45; }
        .machine.spinning .wave { animation: waterspin 6s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.spinning .wave.wave2 { animation: waterspin 9s linear infinite reverse; animation-delay: var(--anim-offset, 0s); }
        @keyframes waterspin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .garments { position: absolute; inset: 0; }
        .garment {
          position: absolute; width: 15px; height: 10px; border-radius: 6px;
          background: ${color}; opacity: 0.85; transition: background 1s linear;
        }
        .garment.g1 { top: 9px; left: 12px; }
        .garment.g2 { top: 27px; left: 32px; transform: rotate(15deg); }
        .garment.g3 { top: 15px; left: 36px; transform: rotate(-25deg); }
        .machine.spinning .garments { animation: tumble 2.6s linear infinite; animation-delay: var(--anim-offset, 0s); }
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
        .machine.spinning .spray-arm { animation: spray-spin 0.7s linear infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes spray-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
  `,
  oven: () => `
        .ov-body {
          position: absolute; inset: 0; border-radius: 10px;
          background: var(--secondary-background-color, #d7d7d7);
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
        .machine.lit .ov-cavity {
          background: radial-gradient(ellipse at 50% 40%, rgba(255, 209, 102, 0.28), #14161a 72%);
        }
        .ov-door {
          position: absolute; inset: 0; border-radius: 6px;
          background: var(--secondary-background-color, #d7d7d7);
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
          background: var(--secondary-background-color, #d7d7d7);
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
          background: var(--secondary-background-color, #d7d7d7);
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
          border-radius: 3px 3px 0 0; background: var(--secondary-background-color, #d7d7d7);
          border: 1px solid var(--divider-color, #c7c7c7);
        }
        .hd-canopy {
          position: absolute; left: 5px; right: 5px; top: 33px; height: 26px;
          background: var(--secondary-background-color, #d7d7d7);
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
          background: linear-gradient(100deg, var(--secondary-background-color, #d7d7d7) 0%, #e6e6e6 45%, var(--secondary-background-color, #d7d7d7) 100%);
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
        .fr-door {
          position: absolute; z-index: 1; border-radius: 6px;
          background: linear-gradient(100deg, var(--secondary-background-color, #d7d7d7), #e6e6e6);
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
  kettle: () => `
        .kt-base { position: absolute; left: 20px; right: 20px; bottom: 6px; height: 7px; border-radius: 3px; background: #3b4048; }
        .kt-body {
          position: absolute; left: 24px; right: 24px; top: 26px; bottom: 13px;
          background: var(--secondary-background-color, #d7d7d7);
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
          background: var(--secondary-background-color, #d7d7d7); border: 1px solid var(--divider-color, #c7c7c7);
        }
        .kt-knob {
          position: absolute; left: 50%; transform: translateX(-50%); top: 15px; width: 9px; height: 5px;
          border-radius: 3px 3px 0 0; background: var(--disabled-text-color, #9e9e9e);
        }
        .kt-spout {
          position: absolute; left: 13px; top: 30px; width: 0; height: 0;
          border-left: 11px solid transparent;
          border-bottom: 9px solid var(--secondary-background-color, #d7d7d7);
          filter: drop-shadow(-1px 0 0 var(--divider-color, #c7c7c7));
        }
        .kt-handle {
          position: absolute; right: 8px; top: 30px; width: 17px; height: 40px;
          border: 3px solid var(--secondary-background-color, #d7d7d7); border-left: none;
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
          background: linear-gradient(160deg, var(--secondary-background-color, #d7d7d7), #bdbdbd);
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
          background: var(--secondary-background-color, #d7d7d7); border: 1px solid var(--divider-color, #c7c7c7);
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
          background: linear-gradient(105deg, var(--secondary-background-color, #d7d7d7), #e6e6e6);
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
          background: linear-gradient(105deg, var(--secondary-background-color, #d7d7d7), #e9e9e9 55%, #cfcfcf);
          border: 1px solid var(--divider-color, #c7c7c7);
        }
        .rk-lid {
          position: absolute; left: 12px; right: 12px; top: 22px; height: 16px;
          border-radius: 12px 12px 4px 4px;
          background: linear-gradient(180deg, #eeeeee, var(--secondary-background-color, #d7d7d7));
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
};

function illustrationCss(type, color) {
  const family = LAUNDRY_TYPES.includes(type) ? "laundry" : type;
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
  const fCls = ctx.fridgeWarn ? "warn" : "";

  let body = "";
  let door = ["", ""];
  if (layout === "single") {
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
    `<div class="fr-cav" style="${style}">
       <div class="fr-shelf" style="top:28%"></div><div class="fr-shelf" style="top:62%"></div>
     </div>`;
  const panel = (style, content, on, hinge) =>
    `<div class="fr-door${on ? " swung" : ""}${hinge === "right" ? " hinge-right" : ""}" style="${style}">${content}</div>`;

  if (layout === "single") {
    return `<div class="fr-wrap">${cav("inset:0")}${panel("inset:0", door[0], open)}</div>`;
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
  ]
    .filter(Boolean)
    .join(" ");

  if (LAUNDRY_TYPES.includes(type)) {
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
    }[type];
    return `
        <div class="machine ${ctx.spinning ? "spinning" : ""}">
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
                  ${glassContent}
                </div>
              </div>
            </div>
          </div>
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
    if (!config || (!config.state_entity && !hasFridgeSource)) {
      throw new Error("ha-appliance-card: 'state_entity' is required");
    }
    this._config = config;
    // A reconfiguration changes what is drawn without touching any state, so
    // the next hass must go through whatever the signature says.
    this._lastSignature = undefined;
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
    for (const e of cfg.info_entities || []) {
      const id = typeof e === "string" ? e : e && e.entity;
      if (id) ids.push(id);
    }
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

  _clearUnplugTimer() {
    if (this._unplugTimer) {
      clearInterval(this._unplugTimer);
      this._unplugTimer = null;
    }
  }

  disconnectedCallback() {
    this._clearUnplugTimer();
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
    const cfg = this._config;
    const hass = localizedHass(this._hass, cfg);
    if (!hass || !cfg) return;

    const st = stateObj(hass, cfg.state_entity);
    const rawState = st ? st.state : "unknown";
    let norm = normalizeState(rawState, cfg.state_map);

    // A power threshold, when configured, wins over the state entity: on a
    // smart-plug setup the state entity is the plug itself, which reads "on"
    // as soon as the appliance is plugged in and says nothing about whether
    // it is actually doing anything.
    const applianceType = detectApplianceType(cfg, st);
    const cap = caps(applianceType);
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
      ? String(rawState)
      : t(hass, norm);

    const name = cfg.name || (st && st.attributes.friendly_name) || cfg.state_entity;

    // Program
    let programText = null;
    if (cfg.program_entity) {
      const pst = stateObj(hass, cfg.program_entity);
      if (pst && !["unknown", "unavailable"].includes(pst.state)) {
        programText = programLabel(hass, pst, pst.state, cfg);
      }
    }

    // Remaining time / progress
    let remSec = null;
    if (cfg.remaining_time_entity) {
      // remaining_time_hide_when_idle cross-references the already-normalized
      // machine state so stale completion timestamps (integrations like
      // Samsung SmartThings keep reporting a past cycle's finish time after
      // the appliance goes idle) don't show a leftover "remaining time".
      if (!cfg.remaining_time_hide_when_idle || isActiveState(norm)) {
        remSec = remainingSeconds(hass, cfg.remaining_time_entity, cfg.remaining_time_unit);
      }
    }

    let progressPct = null;
    if (cfg.progress_entity) {
      const p = numericState(hass, cfg.progress_entity);
      if (p !== null) progressPct = Math.max(0, Math.min(100, p));
    } else if (remSec !== null) {
      if (isActiveState(norm)) {
        if (!isActiveState(this._prevNormState) || !this._runStartSeconds || remSec > this._runStartSeconds) {
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
      if (dst) {
        doorOpen = dst.state === (cfg.door_open_state || "on");
        if (cfg.door_invert) doorOpen = !doorOpen;
      }
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
          icon: "mdi:signal-cellular-2",
          label: t(hass, "power_level"),
          value: formatInfoValue(plst, hass),
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
            icon: "mdi:speedometer",
            label: t(hass, "power_level"),
            value: formatInfoValue(plst, hass),
            entity: cfg.power_level_entity,
          });
        }
      }
      const active = zones.filter((z) => z.on).length;
      if (configured.length && active > 0) {
        extraLines.push({
          icon: "mdi:circle-slice-8",
          label: t(hass, "section_zones"),
          value: `${active} / ${zones.length}`,
        });
      }
      if (cfg.child_lock_entity) {
        const clst = stateObj(hass, cfg.child_lock_entity);
        childLock = !!clst && ["on", "true", "locked"].includes(String(clst.state).toLowerCase());
        if (childLock) {
          extraLines.push({ icon: "mdi:lock", label: t(hass, "child_lock"), value: "" });
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
          : { value: v, text: `${Math.round(v)}\u00b0` };
      };
      const fridgeT = readTemp(cfg.fridge_temperature_entity);
      const freezerT = readTemp(cfg.freezer_temperature_entity);
      const maxTemp = cfg.fridge_max_temperature === undefined || cfg.fridge_max_temperature === ""
        ? 8
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
      let unplugged = false;
      let belowMs = 0;
      if (cfg.power_entity && watts !== null && isFinite(threshold) && watts < threshold) {
        if (!this._belowSince) this._belowSince = Date.now();
        belowMs = Date.now() - this._belowSince;
        unplugged = belowMs >= FRIDGE_UNPLUGGED_AFTER_MS;
      } else {
        this._belowSince = null;
      }
      // This line reads the clock, not the state: a plug sitting at 0 W stops
      // changing, so nothing pushes an update and the count would freeze where
      // it started. The card keeps its own beat while it is counting, which
      // also covers the moment the thirty minutes are up.
      this._clearUnplugTimer();
      if (this._belowSince) {
        this._unplugTimer = setInterval(() => this._render(), FRIDGE_TICK_MS);
      }

      norm = fridgeHealth(unplugged, doorOpen || freezerDoorOpen, tempHigh);
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
          extraLines.push({ icon: "mdi:door-closed", label: t(hass, "doors_closed"), value: "" });
        } else {
          if (cfg.door_entity && (!twoDoors || doorOpen)) {
            extraLines.push(doorLine(doorOpen, twoDoors ? "fridge_door_open" : "door_open"));
          }
          if (cfg.freezer_door_entity && (!twoDoors || freezerDoorOpen)) {
            extraLines.push(doorLine(freezerDoorOpen, twoDoors ? "freezer_door_open" : "door_open"));
          }
        }
      }
      if (cfg.fridge_temperature_entity) {
        extraLines.push({
          icon: "mdi:thermometer",
          label: t(hass, "fridge_compartment"),
          value: fridgeT.value === null ? "--" : `${Math.round(fridgeT.value)} ${unit}`,
          warn: tempHigh,
          entity: cfg.fridge_temperature_entity,
        });
      }
      if (cfg.freezer_temperature_entity) {
        extraLines.push({
          icon: "mdi:snowflake",
          label: t(hass, "freezer_compartment"),
          value: freezerT.value === null ? "--" : `${Math.round(freezerT.value)} ${unit}`,
          entity: cfg.freezer_temperature_entity,
        });
      }
      let ice;
      if (cfg.ice_maker_entity) {
        const ist = stateObj(hass, cfg.ice_maker_entity);
        ice = !!ist && ["on", "true", "running"].includes(String(ist.state).toLowerCase());
        extraLines.push({
          icon: "mdi:snowflake-variant",
          label: t(hass, "ice_maker"),
          value: t(hass, ice ? "ice_on" : "ice_off"),
          entity: cfg.ice_maker_entity,
        });
      }
      if (cfg.power_entity && watts !== null) {
        extraLines.push({
          icon: cfg.power_icon || "mdi:power-plug",
          label: t(hass, "power"),
          // While the plug reads low, how long it has been low is the whole
          // point: it is what separates a compressor pause from an unplugged fridge.
          value: this._belowSince
            ? `${Math.round(watts)} ${unitOf(hass, cfg.power_entity) || "W"} \u00b7 ${t(hass, "since")} ${formatDuration(Math.round(belowMs / 1000), hass)}`
            : `${Math.round(watts)} ${unitOf(hass, cfg.power_entity) || "W"}`,
          warn: unplugged,
          entity: cfg.power_entity,
        });
      }

      fridgeCtx = {
        layout: cfg.fridge_layout || "freezer_bottom",
        fridgeTemp: fridgeT.text,
        freezerTemp: freezerT.text,
        fridgeWarn: tempHigh || unplugged,
        freezerDoorOpen,
        ice,
      };
    } else {
      this._clearUnplugTimer();
      this._belowSince = null;
    }

    // Cooker: the blade turns at the speed the appliance reports, and the
    // temperature block above already drives the heat and the preheat gauge.
    let mixer = { level: 0, label: "" };
    if (cap.speed && cfg.speed_entity) {
      mixer = mixerSpeed(hass, cfg);
      extraLines.push({
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
        if (flag) extraLines.push({ icon: "mdi:alert-circle-outline", label: t(hass, key), value: "", warn: true });
      }
      const cupInfo = cupCount(hass, cfg.cups_entity);
      if (cfg.cups_entity && cupInfo.label) {
        extraLines.push({
          icon: "mdi:coffee-outline",
          label: t(hass, "cups"),
          value: cupInfo.label,
          entity: cfg.cups_entity,
        });
      }
      const strength = strengthLevel(hass, cfg.strength_entity);
      if (cfg.strength_entity && strength.label) {
        extraLines.push({
          icon: "mdi:coffee-maker",
          label: t(hass, "strength"),
          value: strength.label,
          entity: cfg.strength_entity,
        });
      }
      if (waterPct !== null) {
        extraLines.push({
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
          displayText = `${Math.round(kv)}\u00b0`;
          extraLines.push({
            icon: "mdi:thermometer-water",
            label: t(hass, "temperature"),
            value: `${Math.round(kv)} ${kunit}`,
            entity: cfg.temperature_entity,
          });
        }
      }
    }

    // Power draw is worth showing on any type once the entity is there.
    if (!cap.fridgeTemp && cfg.power_entity && watts !== null) {
      extraLines.push({
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
      heating: ["oven", "cooker", "rice_cooker"].includes(applianceType) ? heating : false,
      keepWarm: norm === "keep_warm",
      lit,
      display: displayText,
      fanLevel: fan.level,
      boost: fan.boost,
      zones,
      zoneColumns: zoneColumns(zones.length, cfg.zones_layout),
      anyZoneOn: zones.some((z) => z.on),
      childLock,
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
    ].filter((a) => a.entity && !cap.readOnly);

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
    ].join(",");
    if (animKey !== this._animKey) {
      this._animKey = animKey;
      this._animStart = Date.now();
    }
    const animOffset = -((Date.now() - this._animStart) / 1000);

    const styleTag = `
      <style>
        :host { font-size: 16px; --anim-offset: ${animOffset}s; }
        ha-card { display: block; padding: 16px; position: relative; }
        .conn-badge {
          position: absolute; top: 10px; right: 12px;
          --mdc-icon-size: 18px; color: var(--secondary-text-color, #767676);
        }
        .conn-badge.disconnected { color: var(--error-color, #f44336); }
        /* The light sits in the header rather than in the button row: on a
           hood it is the only control, and a full row for it made the card
           needlessly tall. */
        .light-badge {
          position: absolute; top: 10px; left: 12px; cursor: pointer;
          --mdc-icon-size: 20px; color: var(--secondary-text-color, #767676);
        }
        .light-badge.on { color: #ffb300; }
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
        .info-line.clickable { cursor: pointer; }
        .info-line.warn { color: var(--error-color, #f44336); }
        .info-line.warn ha-icon { color: var(--error-color, #f44336); }
        .bar-row { margin-top: 4px; }
        .bar { height: 6px; border-radius: 3px; background: var(--divider-color, #e0e0e0); overflow: hidden; }
        .bar-fill { height: 100%; background: ${color}; transition: width 1s linear; }
        .alerts-banner {
          margin-top: 10px; padding: 8px 12px; border-radius: 8px;
          background: rgba(244, 67, 54, 0.12); color: var(--error-color, #f44336);
          font-size: 1em; display: flex; align-items: center; gap: 6px;
        }
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

    const stripNamePrefix = (friendlyName, entityId) => {
      if (!friendlyName) return humanizeEntityId(entityId);
      const reg = hass.entities && hass.entities[entityId];
      const device = reg && reg.device_id && hass.devices && hass.devices[reg.device_id];
      const deviceName = (device && (device.name_by_user || device.name)) || name;
      if (deviceName && friendlyName.startsWith(`${deviceName} `)) {
        return friendlyName.slice(deviceName.length + 1);
      }
      return friendlyName;
    };

    const lines = [];
    if (programText) lines.push({ icon: "mdi:tag-outline", label: t(hass, "program"), value: programText });
    infoEntities.forEach((e) => {
      lines.push({
        icon: e.icon || e.st.attributes.icon || "mdi:information-outline",
        label: e.label || stripNamePrefix(e.st.attributes.friendly_name, e.entity),
        value: formatInfoValue(e.st, hass, e.value_map),
      });
    });
    if (remSec !== null) {
      const remRounded = Math.round(remSec / 60);
      lines.push({
        icon: "mdi:timer-outline",
        label: t(hass, "section_remaining"),
        value: remRounded > 0
          ? `${formatDuration(remSec, hass)} \u00b7 ${t(hass, "ready_at")} ${formatEta(remSec)}`
          : t(hass, "time_done"),
      });
    }
    if (cap.door && !cap.fridgeTemp && cfg.door_entity && !cfg.door_hide_in_list) {
      lines.push({
        icon: doorOpen ? "mdi:door-open" : "mdi:door-closed",
        label: doorOpen ? t(hass, "door_open") : t(hass, "door_closed"),
        value: "",
        warn: doorOpen,
      });
    }
    lines.push(...extraLines);
    const linesHtml = lines.length
      ? `<div class="info-lines">${lines
          .map((l) => ({ ...l, open: !!l.entity && entityUsable(hass, l.entity) }))
          .map(
            (l) =>
              `<div class="info-line ${l.warn ? "warn" : ""}${l.open ? " clickable" : ""}"${l.open ? ` data-more="${esc(l.entity)}"` : ""}><ha-icon icon="${esc(l.icon)}"></ha-icon><span class="label">${esc(l.label)}</span>${l.value ? `<span>${esc(l.value)}</span>` : ""}</div>`
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

    const alertsHtml = alerts.length
      ? `<div class="alerts-banner"><ha-icon icon="mdi:alert-circle"></ha-icon>${t(hass, "alerts")}: ${alerts.map(esc).join(", ")}</div>`
      : "";

    const actionsHtml = actions.length
      ? `<div class="actions-row">${actions
          .map(
            (a) =>
              `<div class="action-btn ${a.on ? "on" : ""}" data-entity="${esc(a.entity)}" title="${esc(a.label)}" aria-label="${esc(a.label)}"><ha-icon icon="${a.icon}"></ha-icon></div>`
          )
          .join("")}</div>`
      : "";

    const connBadgeHtml = connectivity !== null
      ? `<div class="conn-badge ${connectivity ? "" : "disconnected"}"><ha-icon icon="${connectivity ? "mdi:wifi" : "mdi:wifi-off"}"></ha-icon></div>`
      : "";

    const lightBadgeHtml = cap.light && cfg.light_entity
      ? `<div class="light-badge ${lit ? "on" : ""}" data-entity="${esc(cfg.light_entity)}" title="${esc(t(hass, "light"))}" aria-label="${esc(t(hass, "light"))}"><ha-icon icon="${lit ? "mdi:lightbulb-on" : "mdi:lightbulb-outline"}"></ha-icon></div>`
      : "";

    this._root.innerHTML = `
      ${styleTag}
      <ha-card>
        ${lightBadgeHtml}
        ${connBadgeHtml}
        <div class="top" id="header">
          ${iconHtml}
          <div class="name">${esc(name)}</div>
          <div class="state-line">${esc(stateLabel)}</div>
        </div>
        ${barHtml}
        ${linesHtml}
        ${alertsHtml}
        ${actionsHtml}
      </ha-card>
    `;

    const header = this._root.getElementById("header");
    if (header) header.addEventListener("click", () => this._moreInfo(cfg.state_entity));
    this._root.querySelectorAll(".action-btn, .light-badge").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.stopPropagation();
        this._call(el.getAttribute("data-entity"));
      });
    });
    this._root.querySelectorAll(".info-line[data-more]").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.stopPropagation();
        this._moreInfo(el.getAttribute("data-more"));
      });
    });
  }
}

// ---------------------------------------------------------------------------
// Editor
// ---------------------------------------------------------------------------

const ACTION_DOMAINS = ["button", "switch", "script", "input_boolean"];

// Which types a section applies to. Anything cycle-shaped keeps the original
// program/time/door/controls set; a hood or a cooktop would only be cluttered
// by fields it can never fill.
const CYCLE_TYPES = ["washer", "dryer", "dishwasher", "oven", "microwave", "cooker", "coffee", "rice_cooker"];
// A coffee machine has no door and a cooker's lid has no sensor, so neither
// belongs in the door section even though both run programs.
const DOOR_TYPES = ["washer", "dryer", "dishwasher", "oven", "microwave", "fridge"];

const SECTIONS = [
  { field: "program_entity", types: CYCLE_TYPES, labelKey: "section_program", includeDomains: ["select", "sensor", "input_select"], extra: (c, hass) => c._row("program_format", "program_format", {
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
      ],
    }) + c._row("remaining_time_hide_when_idle", "remaining_time_hide_when_idle", { type: "checkbox" }) },
  { field: "progress_entity", types: CYCLE_TYPES, labelKey: "section_progress", includeDomains: ["sensor", "input_number"] },
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
  { field: "light_entity", types: ["oven", "hood"], labelKey: "section_light", includeDomains: ["light", "switch", "input_boolean"] },

  // Cooktop
  { field: "child_lock_entity", types: ["cooktop"], labelKey: "section_child_lock", includeDomains: ["binary_sensor", "switch", "lock"] },

  // Fridge. One option describes both the number of doors and where the
  // freezer sits, because on a real fridge those are the same fact.
  { field: "fridge_temperature_entity", types: ["fridge"], labelKey: "section_fridge_temperature", includeDomains: ["sensor", "number", "input_number"], extra: (c) =>
      c._row("fridge_max_temperature", "fridge_max_temperature", { placeholder: "8" }) },
  { field: "freezer_temperature_entity", types: ["fridge"], labelKey: "section_freezer_temperature", includeDomains: ["sensor", "number", "input_number"] },
  { field: "freezer_door_entity", types: ["fridge"], labelKey: "section_freezer_door", includeDomains: ["binary_sensor", "sensor"] },
  { field: "ice_maker_entity", types: ["fridge"], labelKey: "section_ice_maker", includeDomains: ["switch", "binary_sensor", "sensor", "input_boolean"] },

  // Kettle
  { field: "temperature_entity", types: ["kettle"], labelKey: "section_kettle_temperature", includeDomains: ["sensor", "number", "input_number"] },

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
      c._row("power_on_threshold", "power_on_threshold", { placeholder: caps(c._currentType()).fridgeTemp ? "1" : "10" }) },

  { field: "alerts_entity", types: APPLIANCE_TYPES, labelKey: "section_alerts", includeDomains: ["sensor", "binary_sensor"] },
  { field: "connectivity_entity", types: APPLIANCE_TYPES, labelKey: "section_connectivity", includeDomains: ["binary_sensor", "sensor"], extra: (c, hass) => c._row("connectivity_connected_state", "connectivity_connected_state", { placeholder: "on" }) },
  { field: "start_entity", types: CYCLE_TYPES, labelKey: "section_start", includeDomains: ACTION_DOMAINS },
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
        zones: (this._config.zones || []).length > 0,
      };
    }
    if (this._infoCount === undefined) {
      const existing = (this._config.info_entities || []).length;
      this._infoCount = Math.min(5, existing || 3);
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
      if (patch.info_entities && this._panelOpen) {
        this._panelOpen.info = true;
        this._infoCount = Math.min(5, Math.max(this._infoCount || 0, patch.info_entities.length));
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

  _wireInfoDragAndDrop() {
    const rows = this._root.querySelectorAll(".info-row");
    let dragIndex = null;
    rows.forEach((row) => {
      row.addEventListener("dragstart", (ev) => {
        dragIndex = parseInt(row.getAttribute("data-drag-index"), 10);
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
        const dropIndex = parseInt(row.getAttribute("data-drag-index"), 10);
        if (dragIndex !== null) this._reorderInfoEntities(dragIndex, dropIndex);
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
          ],
        })}
        ${this._type === "fridge" ? this._row("section_fridge_layout", "fridge_layout", {
          type: "select",
          options: [
            { value: "freezer_bottom", label: t(hass, "layout_freezer_bottom") },
            { value: "freezer_top", label: t(hass, "layout_freezer_top") },
            { value: "side_by_side", label: t(hass, "layout_side_by_side") },
            { value: "single", label: t(hass, "layout_single") },
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
          ${this._row("compact", "compact", { type: "checkbox" })}
          ${this._row("state_show_raw", "state_show_raw", { type: "checkbox" })}
        </div>
        <div class="section">
          <div class="picker-slot" data-slot="state_entity"></div>
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
              ${[0, 1, 2, 3, 4, 5].map((n) => `<option value="${n}" ${n === this._infoCount ? "selected" : ""}>${n}</option>`).join("")}
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
            </div>
          </div>`).join("")}
      </details>
    `;

    this._wireTouchTracking();
    this._mountPicker(this._root.querySelector('[data-slot="state_entity"]'), "state_entity", {
      label: t(hass, "state_entity"),
      includeDomains: ["sensor", "binary_sensor"],
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
    }
    this._wireInfoDragAndDrop();

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
          if (field === "fridge_temperature_entity") delete this._config.fridge_max_temperature;
          if (field === "connectivity_entity") delete this._config.connectivity_connected_state;
          if (field === "power_entity") delete this._config.power_on_threshold;
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
