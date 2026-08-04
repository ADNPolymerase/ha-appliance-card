const CARD_VERSION = "0.3.0";

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
    info_drag: "Drag to reorder",
    section_start: "Start button", section_pause: "Pause button",
    section_resume: "Resume button", section_stop: "Stop / reset button",
    picker_icon: "Icon (optional)",
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
    info_drag: "Glisser pour r\u00e9organiser",
    section_start: "Bouton D\u00e9marrer", section_pause: "Bouton Pause",
    section_resume: "Bouton Reprendre", section_stop: "Bouton Stop / Reset",
    picker_icon: "Ic\u00f4ne (optionnel)",
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
    info_drag: "\u041f\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0434\u043b\u044f \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u043f\u043e\u0440\u044f\u0434\u043a\u0430",
    section_start: "\u041a\u043d\u043e\u043f\u043a\u0430 \u0421\u0442\u0430\u0440\u0442", section_pause: "\u041a\u043d\u043e\u043f\u043a\u0430 \u041f\u0430\u0443\u0437\u0430",
    section_resume: "\u041a\u043d\u043e\u043f\u043a\u0430 \u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c", section_stop: "\u041a\u043d\u043e\u043f\u043a\u0430 \u0421\u0442\u043e\u043f / \u0421\u0431\u0440\u043e\u0441",
    picker_icon: "\u0417\u043d\u0430\u0447\u043e\u043a (\u043d\u0435\u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e)",
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
    info_drag: "Zum Neuordnen ziehen",
    section_start: "Start-Taste", section_pause: "Pause-Taste",
    section_resume: "Fortsetzen-Taste", section_stop: "Stopp/Reset-Taste",
    picker_icon: "Symbol (optional)",
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
    info_drag: "Arrastrar para reordenar",
    section_start: "Bot\u00f3n Iniciar", section_pause: "Bot\u00f3n Pausa",
    section_resume: "Bot\u00f3n Reanudar", section_stop: "Bot\u00f3n Parar/Reiniciar",
    picker_icon: "Icono (opcional)",
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
    info_drag: "Trascina per riordinare",
    section_start: "Pulsante Avvia", section_pause: "Pulsante Pausa",
    section_resume: "Pulsante Riprendi", section_stop: "Pulsante Stop/Reset",
    picker_icon: "Icona (opzionale)",
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
    info_drag: "Sleep om te herordenen",
    section_start: "Startknop", section_pause: "Pauzeknop",
    section_resume: "Hervattenknop", section_stop: "Stop/resetknop",
    picker_icon: "Pictogram (optioneel)",
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
    info_drag: "Arraste para reordenar",
    section_start: "Bot\u00e3o Iniciar", section_pause: "Bot\u00e3o Pausa",
    section_resume: "Bot\u00e3o Retomar", section_stop: "Bot\u00e3o Parar/Reiniciar",
    picker_icon: "\u00cdcone (opcional)",
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
    info_drag: "Dra f\u00f6r att \u00e4ndra ordning",
    section_start: "Startknapp", section_pause: "Pausknapp",
    section_resume: "\u00c5terupptaknapp", section_stop: "Stopp-/\u00e5terst\u00e4llningsknapp",
    picker_icon: "Ikon (valfritt)",
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
    info_drag: "Dra for \u00e5 endre rekkef\u00f8lge",
    section_start: "Startknapp", section_pause: "Pauseknapp",
    section_resume: "Gjenopptaknapp", section_stop: "Stopp-/tilbakestillingsknapp",
    picker_icon: "Ikon (valgfritt)",
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
    info_drag: "Tr\u00e6k for at \u00e6ndre r\u00e6kkef\u00f8lge",
    section_start: "Startknap", section_pause: "Pauseknap",
    section_resume: "Genoptagknap", section_stop: "Stop-/nulstillingsknap",
    picker_icon: "Ikon (valgfrit)",
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
    info_drag: "Przeci\u0105gnij, aby zmieni\u0107 kolejno\u015b\u0107",
    section_start: "Przycisk Start", section_pause: "Przycisk Pauza",
    section_resume: "Przycisk Wzn\u00f3w", section_stop: "Przycisk Stop/Reset",
    picker_icon: "Ikona (opcjonalnie)",
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
  running: ["run", "wash", "spin", "dry", "rinsing", "heating", "cours", "on", "active", "marche", "actif"],
  paused: ["pause", "hold", "suspended"],
  done: ["end", "done", "finish", "complete", "termin"],
  delayed: ["delay", "differ", "scheduled", "programmed"],
  error: ["error", "fault", "alarm", "erreur"],
};

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

function formatInfoValue(st, hass) {
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
  if (/dry|dryer|seche|s\u00e8che|tumble/.test(hay)) return "dryer";
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
    const rawIsMeaningless = ["unknown", "unavailable", "none", ""].includes(String(rawState).trim().toLowerCase());
    // When the raw state doesn't match any known vocabulary, show it as-is
    // instead of a generic "Unknown" label \u2014 common for custom template
    // sensors (e.g. power-threshold based presence) whose wording we can't
    // guess. Falls back to the translated label when there's truly no data.
    // state_show_raw opts into always showing the raw text (still colored/
    // animated per the detected category) for setups without a real
    // appliance integration, where the category label alone loses the
    // user's own wording.
    const stateLabel = (cfg.state_show_raw || norm === "unknown") && !rawIsMeaningless ? String(rawState) : t(hass, norm);

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
      if (!cfg.remaining_time_hide_when_idle || norm === "running") {
        remSec = remainingSeconds(hass, cfg.remaining_time_entity, cfg.remaining_time_unit);
      }
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
        :host { font-size: 16px; }
        ha-card { display: block; padding: 16px; position: relative; }
        .conn-badge {
          position: absolute; top: 10px; right: 12px;
          --mdc-icon-size: 18px; color: var(--secondary-text-color, #767676);
        }
        .conn-badge.disconnected { color: var(--error-color, #f44336); }
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
        .name { font-size: 1.2em; font-weight: 500; color: var(--primary-text-color, #1c1c1c); }
        .state-line { font-size: 1.05em; color: ${color}; margin-top: 2px; }
        .info-lines { margin-top: 12px; display: flex; flex-direction: column; gap: 8px; }
        .info-line {
          display: flex; align-items: center; gap: 8px;
          font-size: 1em; color: var(--primary-text-color, #1c1c1c); text-align: left;
        }
        .info-line ha-icon { --mdc-icon-size: 20px; color: var(--secondary-text-color, #767676); flex-shrink: 0; }
        .info-line .label { color: var(--secondary-text-color, #767676); }
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
        .action-btn ha-icon { --mdc-icon-size: 20px; }
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
          <div class="bezel-wrap">
            <div class="drum-hole"></div>
            <div class="door ${doorOpen ? "ajar" : ""}">
              <div class="rim">
                <div class="glass">
                  ${glassContent}
                </div>
              </div>
            </div>
          </div>
        </div>`;

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
        value: formatInfoValue(e.st, hass),
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
    if (cfg.door_entity && !cfg.door_hide_in_list) {
      lines.push({
        icon: doorOpen ? "mdi:door-open" : "mdi:door-closed",
        label: doorOpen ? t(hass, "door_open") : t(hass, "door_closed"),
        value: "",
        warn: doorOpen,
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
              `<div class="action-btn" data-entity="${a.entity}" title="${a.label}" aria-label="${a.label}"><ha-icon icon="${a.icon}"></ha-icon></div>`
          )
          .join("")}</div>`
      : "";

    const connBadgeHtml = connectivity !== null
      ? `<div class="conn-badge ${connectivity ? "" : "disconnected"}"><ha-icon icon="${connectivity ? "mdi:wifi" : "mdi:wifi-off"}"></ha-icon></div>`
      : "";

    this._root.innerHTML = `
      ${styleTag}
      <ha-card>
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
    }) + c._row("remaining_time_hide_when_idle", "remaining_time_hide_when_idle", { type: "checkbox" }) },
  { field: "progress_entity", labelKey: "section_progress", includeDomains: ["sensor", "input_number"] },
  { field: "door_entity", labelKey: "section_door", includeDomains: ["binary_sensor", "sensor"], extra: (c, hass) =>
      c._row("door_open_state", "door_open_state", { placeholder: "on" }) +
      c._row("door_invert", "door_invert", { type: "checkbox" }) +
      c._row("door_hide_in_list", "door_hide_in_list", { type: "checkbox" }) },
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
    return new Set(SECTIONS.filter((s) => cfg[s.field]).map((s) => s.field));
  }

  setConfig(config) {
    this._config = { ...config };
    const newOpen = this._computeOpen(this._config);
    if (!this._open || !setsEqual(this._open, newOpen)) this._needsBuild = true;
    this._open = newOpen;
    if (!this._panelOpen) {
      this._panelOpen = { general: true, info: (this._config.info_entities || []).length > 0 };
    }
    if (this._infoCount === undefined) {
      const existing = (this._config.info_entities || []).length;
      this._infoCount = Math.min(5, existing || 3);
    }
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
      for (const s of SECTIONS) if (patch[s.field]) newOpen.add(s.field);
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
        .picker-slot input[type="text"] {
          width: 100%; padding: 8px 10px; border-radius: 4px; box-sizing: border-box;
          border: 1px solid var(--divider-color, #ccc);
          background: var(--card-background-color, white); color: var(--primary-text-color, #1c1c1c);
          font-size: 1em; font-family: inherit;
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
        ${SECTIONS.map((s) => this._sectionHtml(s)).join("")}
      </details>
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
            </div>
          </div>`).join("")}
      </details>
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
    for (let i = 0; i < this._infoCount; i++) {
      this._mountInfoPicker(this._root.querySelector(`[data-slot="__info_${i}"]`), i);
      this._mountInfoIcon(this._root.querySelector(`[data-slot="__info_icon_${i}"]`), i);
      this._mountInfoLabel(this._root.querySelector(`[data-slot="__info_label_${i}"]`), i);
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
          const section = SECTIONS.find((s) => s.field === field);
          if (section && section.field === "door_entity") {
            delete this._config.door_open_state;
            delete this._config.door_invert;
            delete this._config.door_hide_in_list;
          }
          if (section && section.field === "connectivity_entity") delete this._config.connectivity_connected_state;
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
  description: "Cycle/program card for washers, dryers & dishwashers \u2014 works with any brand/integration via configurable entity mapping.",
});
