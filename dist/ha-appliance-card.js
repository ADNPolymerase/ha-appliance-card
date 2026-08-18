const CARD_VERSION = "1.2.1";

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
// State normalization \u2014 works across brands/integrations
// ---------------------------------------------------------------------------

const STATE_KEYWORDS = {
  idle: ["idle", "off", "standby", "veille", "eteint", "arret", "inactif", "ready_to_start", "ready to start"],
  // Before "running": ovens report "Preheating", and the "heating" keyword
  // below cannot match it anyway (no word boundary inside "preheating").
  preheating: ["preheat", "pre-heat", "pre_heat", "prechauff", "vorheiz", "precalent", "voorverwarm"],
  running: ["run", "wash", "spin", "dry", "rinsing", "heating", "cours", "on", "active", "marche", "actif"],
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
// "Pending" \u2014 and "wash"/"dry"/"spin" still match gerund forms like
// "Washing"/"Drying"/"Spinning".
const STATE_KEYWORD_PATTERNS = Object.fromEntries(
  Object.entries(STATE_KEYWORDS).map(([norm, keywords]) => [
    norm,
    keywords.map((kw) => new RegExp(`\\b${kw}`, "i")),
  ])
);

function normalizeState(raw, stateMap) {
  if (raw === undefined || raw === null) return "unknown";
  const s = String(raw).trim();
  if (["unknown", "unavailable", "none", ""].includes(s.toLowerCase())) return "unknown";
  if (stateMap && Object.prototype.hasOwnProperty.call(stateMap, s)) return stateMap[s];
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
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function stateObj(hass, entityId) {
  return entityId && hass.states[entityId] ? hass.states[entityId] : null;
}

// An entity you cannot act on. Integrations routinely drop an option to
// unavailable while the appliance is off \u2014 Home Connect does it with a
// hood's venting level \u2014 and opening the more-info dialog of such an
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

function cleanProgramName(raw) {
  if (!raw) return raw;
  // Many integrations report "<Category> Pr <ProgramName>" \u2014 keep the meaningful part.
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
// door, and a cooktop has no cycle at all \u2014 offering those fields anyway
// would only be noise.
const TYPE_CAPS = {
  washer: { cycle: true, door: true },
  dryer: { cycle: true, door: true },
  dishwasher: { cycle: true, door: true },
  oven: { cycle: true, door: true, temperature: true, light: true, heating: true },
  microwave: { cycle: true, door: true, powerLevel: true },
  hood: { fan: true, light: true, filter: true, boost: true },
  cooktop: { zones: true, childLock: true },
};
const APPLIANCE_TYPES = Object.keys(TYPE_CAPS);
const LAUNDRY_TYPES = ["washer", "dryer", "dishwasher"];

function caps(type) {
  return TYPE_CAPS[type] || TYPE_CAPS.washer;
}

function detectApplianceType(cfg, st) {
  if (cfg.appliance_type && cfg.appliance_type !== "auto") return cfg.appliance_type;
  const hay = `${cfg.icon || ""} ${cfg.state_entity || ""} ${(st && st.attributes.icon) || ""}`.toLowerCase();
  // "microwave" before "oven": plenty of devices are named "microwave_oven".
  if (/microwave|micro.?onde|mikrowelle|magnetron|mikrob/.test(hay)) return "microwave";
  if (/hood|hotte|abzug|extractor|exaustor|afzuigkap|emh|okap/.test(hay)) return "hood";
  if (/cooktop|hotplate|plaque|kochfeld|kookplaat|induction|induktion|kogeplade/.test(hay)) return "cooktop";
  if (/oven|four|backofen|horno|forno|piekarnik/.test(hay)) return "oven";
  if (/dry|dryer|seche|s\u00e8che|tumble/.test(hay)) return "dryer";
  if (/dish|vaisselle/.test(hay)) return "dishwasher";
  return "washer";
}

// Derive a cycle state from a power meter. This is what makes the card usable
// with nothing but a smart plug: 3 W is standby, 1800 W is running, and the
// drop back below the threshold is the only "finished" signal such a setup can
// ever give. "done" is deliberately sticky until the next run \u2014 the same
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
          animation: ov-ember 2.6s ease-in-out infinite;
        }
        .machine.heating .ov-elem.bottom { animation-delay: -1.3s; }
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
          animation: ov-ember 2.6s ease-in-out infinite;
        }
        .machine.heating .ov-glass::after { animation-delay: -1.3s; }
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
        .machine.spinning .mw-turn { animation: mw-spin 3.4s linear infinite; }
        @keyframes mw-spin {
          from { transform: translate(-50%, -50%) scaleY(0.3) rotate(0deg); }
          to { transform: translate(-50%, -50%) scaleY(0.3) rotate(360deg); }
        }
        .machine.spinning .mw-cavity {
          background: radial-gradient(ellipse at 50% 45%, rgba(255, 209, 102, 0.3), #14161a 70%);
          animation: mw-pulse 1.7s ease-in-out infinite;
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
        .machine.fan .hd-air { animation: hd-rise linear infinite; }
        .machine.fan .hd-air.a2 { animation-delay: -0.45s; }
        .machine.fan .hd-air.a3 { animation-delay: -0.9s; }
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
          animation: ck-ember 3s ease-in-out infinite;
        }
        .ck-zone.max {
          border-color: #ff3d00; color: #ff3d00;
          background: radial-gradient(circle, rgba(255, 61, 0, 0.55), transparent 72%);
          box-shadow: 0 0 15px rgba(255, 61, 0, 0.7);
        }
        /* Powered off but still hot: the one thing a cooktop card is actually for. */
        .ck-zone.residual {
          border-color: #7a3b2c; color: #b1543d; background: none;
          box-shadow: none; animation: none; opacity: 1;
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
};

function illustrationCss(type, color) {
  const family = LAUNDRY_TYPES.includes(type) ? "laundry" : type;
  const fn = ILLUSTRATION_CSS[family] || ILLUSTRATION_CSS.laundry;
  return fn(color);
}

function attrEscape(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
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
              <div class="ov-disp">${ctx.display || "--"}</div>
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
              <div class="mw-disp">${ctx.display || "--"}</div>
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

  if (type === "cooktop") {
    const zones = ctx.zones || [];
    const zonesHtml = zones
      .map((z) => {
        const zc = [z.on ? "on" : "", z.max ? "max" : "", z.residual ? "residual" : ""]
          .filter(Boolean)
          .join(" ");
        const title = z.title ? ` title="${attrEscape(z.title)}"` : "";
        return `<div class="ck-zone ${zc}" style="--zi:${z.intensity.toFixed(2)}"${title}>${z.label || ""}</div>`;
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
    let norm = normalizeState(rawState, cfg.state_map);

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
      : cfg.power_entity === cfg.state_entity
        ? 10
        : NaN;
    if (cfg.power_entity && isFinite(threshold)) {
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

    const color = STATE_COLORS[norm] || STATE_COLORS.unknown;
    const rawIsMeaningless = ["unknown", "unavailable", "none", ""].includes(String(rawState).trim().toLowerCase());
    // When the raw state doesn't match any known vocabulary, show it as-is
    // instead of a generic "Unknown" label \u2014 common for custom template
    // sensors (e.g. power-threshold based presence) whose wording we can't
    // guess. Falls back to the translated label when there's truly no data.
    // state_show_raw opts into always showing the raw text (still colored/
    // animated per the detected category) for setups without a real
    // appliance integration, where the category label alone loses the
    // user's own wording.
    // Never echo the raw state when it came from the power meter: the "raw"
    // text there is a wattage, which is not a state anyone wants to read.
    const stateLabel = !powerDerived && (cfg.state_show_raw || norm === "unknown") && !rawIsMeaningless
      ? String(rawState)
      : t(hass, norm);

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
    const cap = caps(applianceType);
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
    if (applianceType === "microwave" && remSec !== null && remSec > 0) {
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
            ? "\u2014"
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
        // this case \u2014 they report a global power level but never say which
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

    // Power draw is worth showing on any type once the entity is there.
    if (cfg.power_entity && watts !== null) {
      extraLines.push({
        icon: cfg.power_icon || "mdi:power-plug",
        label: t(hass, "power"),
        value: `${Math.round(watts)} ${unitOf(hass, cfg.power_entity) || "W"}`,
        entity: cfg.power_entity,
      });
    }

    const illustrationCtx = {
      spinning: isActiveState(norm),
      doorOpen: cap.door && doorOpen,
      heating: applianceType === "oven" ? heating : false,
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
    ].filter((a) => a.entity);

    const spinning = isActiveState(norm);

    const styleTag = `
      <style>
        :host { font-size: 16px; }
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
    if (cap.door && cfg.door_entity && !cfg.door_hide_in_list) {
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
              `<div class="info-line ${l.warn ? "warn" : ""}${l.open ? " clickable" : ""}"${l.open ? ` data-more="${l.entity}"` : ""}><ha-icon icon="${l.icon}"></ha-icon><span class="label">${l.label}</span>${l.value ? `<span>${l.value}</span>` : ""}</div>`
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
      ? `<div class="alerts-banner"><ha-icon icon="mdi:alert-circle"></ha-icon>${t(hass, "alerts")}: ${alerts.join(", ")}</div>`
      : "";

    const actionsHtml = actions.length
      ? `<div class="actions-row">${actions
          .map(
            (a) =>
              `<div class="action-btn ${a.on ? "on" : ""}" data-entity="${a.entity}" title="${a.label}" aria-label="${a.label}"><ha-icon icon="${a.icon}"></ha-icon></div>`
          )
          .join("")}</div>`
      : "";

    const connBadgeHtml = connectivity !== null
      ? `<div class="conn-badge ${connectivity ? "" : "disconnected"}"><ha-icon icon="${connectivity ? "mdi:wifi" : "mdi:wifi-off"}"></ha-icon></div>`
      : "";

    const lightBadgeHtml = cap.light && cfg.light_entity
      ? `<div class="light-badge ${lit ? "on" : ""}" data-entity="${cfg.light_entity}" title="${t(hass, "light")}" aria-label="${t(hass, "light")}"><ha-icon icon="${lit ? "mdi:lightbulb-on" : "mdi:lightbulb-outline"}"></ha-icon></div>`
      : "";

    this._root.innerHTML = `
      ${styleTag}
      <ha-card>
        ${lightBadgeHtml}
        ${connBadgeHtml}
        <div class="top" id="header">
          ${iconHtml}
          <div class="name">${name}</div>
          <div class="state-line">${stateLabel}</div>
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
const CYCLE_TYPES = ["washer", "dryer", "dishwasher", "oven", "microwave"];

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
  { field: "door_entity", types: CYCLE_TYPES, labelKey: "section_door", includeDomains: ["binary_sensor", "sensor"], extra: (c, hass) =>
      c._row("door_open_state", "door_open_state", { placeholder: "on" }) +
      c._row("door_invert", "door_invert", { type: "checkbox" }) +
      c._row("door_hide_in_list", "door_hide_in_list", { type: "checkbox" }) },

  // Oven
  { field: "target_temperature_entity", types: ["oven"], labelKey: "section_target_temperature", includeDomains: ["number", "sensor", "input_number"] },
  { field: "current_temperature_entity", types: ["oven"], labelKey: "section_current_temperature", includeDomains: ["sensor", "number"] },
  { field: "heating_entity", types: ["oven"], labelKey: "section_heating", includeDomains: ["binary_sensor", "sensor", "switch"] },

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

  // Any type: the on/off control. Named toggle_entity rather than
  // power_switch_entity so it cannot be confused with power_entity below,
  // which is the wattage meter.
  { field: "toggle_entity", types: APPLIANCE_TYPES, labelKey: "section_toggle", includeDomains: ACTION_DOMAINS.concat(["fan"]) },

  // Any type: a plug's power meter, optionally driving the state itself.
  { field: "power_entity", types: APPLIANCE_TYPES, labelKey: "section_power", includeDomains: ["sensor"], extra: (c) =>
      c._row("power_on_threshold", "power_on_threshold", { placeholder: "10" }) },

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
    // that alone does not change which fields are filled in \u2014 so the open-set
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
  // anything \u2014 the card then reports an entity it can no longer find.
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
    picker.label = `${t(hass, labelKey)} ${index + 1}`;
    picker.includeDomains = includeDomains;
    picker.addEventListener("value-changed", (ev) => {
      const held = (this._zonesList()[index] || {})[field];
      if (!this._acceptsPick(held, ev.detail.value)) return;
      this._updateZone(index, { [field]: ev.detail.value || undefined });
    });
    slotEl.appendChild(picker);
  }

  _mountZoneName(slotEl, index) {
    const hass = this._hass;
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
  // must NOT tear down and recreate <ha-entity-picker> elements \u2014 that closes
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
    picker.label = `${t(hass, "entity")} ${index + 1}`;
    picker.addEventListener("value-changed", (ev) => {
      const held = (this._infoEntitiesList()[index] || {}).entity;
      if (!this._acceptsPick(held, ev.detail.value)) return;
      this._updateInfoEntity(index, { entity: ev.detail.value || undefined });
    });
    slotEl.appendChild(picker);
  }

  _mountInfoLabel(slotEl, index) {
    const hass = this._hass;
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
    const hass = this._hass;
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
    const hass = this._hass;
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
          ],
        })}
      </div>
      <details class="group" data-panel="general" ${this._panelOpen.general ? "open" : ""}>
        <summary>${t(hass, "group_general")}</summary>
        <div class="section">
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
  description: "Card for washers, dryers, dishwashers, ovens, microwaves, cooker hoods & cooktops \u2014 works with any brand/integration via configurable entity mapping.",
});
