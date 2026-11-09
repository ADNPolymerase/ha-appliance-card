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
  // Pellet grills: Traeger's, Pit Boss's, Camp Chef's, Grilla's, recteq's and
  // GMG's names for the same things.
  pellet_grill: {
    grill_state_entity: /^sensor\.(?!.*(probe|wifi|ota|heating|cook.?mode|active.?mode)).*(grill.?state|system.?status|running.?status|status|mode)$/i,
    temperature_entity: /^sensor\.(?!.*(target|set|probe|ambient)).*(grill.?temp|chamber.?temp|pit.?temp)/i,
    target_temperature_entity: /^(?!.*probe).*(target|set).?(grill.?)?temp/i,
    pellet_level_entity: /pellet/i,
    probe_entity: /^(?!.*(state|status|alarm|target|set|connect|present)).*(probe.?p?[01]?(.?temp(erature)?)?$|[._]p1.?temp)/i,
    probe_target_entity: /(target|set).*probe.?p?[01]?(.?temp(erature)?)?$|probe.?p?[01]?.?target|[._]p1.?target/i,
    probe_2_entity: /^(?!.*(state|status|alarm|target|set|connect|present)).*(probe.?p?[12](.?temp(erature)?)?$|[._]p2.?temp)/i,
    probe_2_target_entity: /(target|set).*probe.?p?2(.?temp(erature)?)?$|probe.?p?2.?target|[._]p2.?target/i,
    probe_state_entity: /probe.?state|probe.?status/i,
    probe_alarm_entity: /probe.?alarm/i,
    timer_end_entity: /^sensor\..*(cook.?timer.?(end|remaining)$|cook.?timer$|recipe.?time|timer.?end)/i,
    timer_complete_entity: /timer.?complete|timer.?done/i,
    error_entity: /(^|[._])errors?$|error.?code|any.?problem|(^|[._])problem$|(^|[._])fault$|fault.?present/i,
    super_smoke_entity: /(^|[._])smoke$|super.?smoke|smoke.?(mode|plus)/i,
    keep_warm_entity: /keep.?warm/i,
  },
  climate_sensor: { humidity_entity: /humid|hygro/i, battery_entity: /batter/i },
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
    humidifier_entity: /^humidifier\./i,
    deep_clean_entity: /deep.?clean/i,
    low_water_entity: /low.?water|water.?(lack|shortage|empty)|no.?water|tank.?empty/i,
    tank_lifted_entity: /lifted|detached|tank.?(removed|missing|off)/i,
    water_level_entity: /water.?level/i,
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
  // An Android TV's or a Fire TV's current app, from ADB or a sensor.
  streamer: {
    app_entity: /current.?app|app.?name|foreground.?app|running.?app|current.?activity/i,
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
  if (netLayoutOf(cfg, stateObj(hass, cfg.state_entity)) === "router") {
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
  if (!cfg.state_entity || !stateObj(hass, cfg.state_entity)) return {};
  const siblings = siblingEntityIds(hass, cfg.state_entity).filter((id) => id !== cfg.state_entity);
  const type = detectApplianceType(cfg, stateObj(hass, cfg.state_entity));
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
  if (type === "washer" && cfg.washer_dryer === undefined && isWasherDryer(cfg, stateObj(hass, cfg.state_entity))) {
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
  pellet_grill: { readOnly: true },
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
  // A streaming box: Apple TV, Fire TV, Chromecast, Shield, Roku, a set-top box.
  streamer: { ntStreamer: true },
  climate_sensor: { readOnly: true },
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
  pellet_grill: ["climate", "sensor"],
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
  streamer: ["media_player", "remote", "switch", "binary_sensor", "input_boolean", "sensor"],
  climate_sensor: ["sensor", "number", "input_number"],
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
const PURIFIER_ONLY_FIELDS = ["purifier_layout", "air_quality_entity", "display_entity", "humidifier_entity", "deep_clean_entity"];
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
  ["kitchen", ["dishwasher", "oven", "microwave", "hood", "cooktop", "fridge", "kettle", "cooker", "coffee", "rice_cooker", "air_fryer", "toaster", "pellet_grill"]],
  ["heating", ["water_heater", "boiler", "heat_pump", "thermostat", "pellet_stove", "space_heater", "towel_warmer", "floor_heating", "storage_tank", "fresh_water_station", "wood_stove"]],
  ["air", ["air_conditioner", "dehumidifier", "humidifier", "air_purifier", "fan", "diffuser", "hrv", "climate_sensor"]],
  ["home", ["screen", "iron", "hair_dryer", "printer_3d", "filament_dryer", "robot", "pool_pump", "scale", "camera", "lamp", "mailbox", "water_pump", "spa", "sauna", "aquarium", "christmas_tree", "mobility", "irrigation", "detector", "speaker", "console", "streamer"]],
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
  if (!cfg.humidifier_entity && HUMIDIFIER_ONLY_FIELDS.some((f) => cfg[f])) return "humidifier";
  // VeSync gives its humidifiers no class at all: the domain says it, unless
  // the name or the action say it dries.
  if (st && domainOf(cfg.state_entity) === "humidifier" && !DIFFUSER_ONLY_FIELDS.some((f) => cfg[f])) {
    const named = stripAccents(`${cfg.state_entity || ""} ${stHay(st)} ${cfg.name || ""}`).toLowerCase();
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
  for (const [ty, fields] of Object.entries(NT_ONLY_FIELDS)) if (!(ty === "humidifier" && cfg.humidifier_entity) && fields.some((f) => cfg[f] !== undefined && cfg[f] !== "")) return ty;
  {
    // A spa, a sauna, an aquarium, a meter, a Christmas tree and the rest of
    // the HACF drawings by their name, before a light makes a lamp of them.
    const named = stripAccents(`${cfg.icon || ""} ${cfg.state_entity || ""} ${stHay(st)} ${cfg.name || ""}`).toLowerCase();
    // A television that says it is one is no streaming box, Fire TV inside or not.
    for (const [ty, re] of NT_NAME_RES) if (re.test(named) && !(ty === "streamer" && st && st.attributes.device_class === "tv")) return ty;
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
    && (st.attributes.device_class === "speaker" || /sonos|homepod|echo|nest.?(audio|mini)|google.?home|speaker|enceinte|lautsprecher|altavoz|altoparlante|soundbar|barre.?de.?son|music.?assistant|airplay|snapcast|bose|wiim|bluesound|linkplay|heos|denon|marantz|yamaha|hivi/.test(stripAccents(`${cfg.state_entity} ${stHay(st)}`).toLowerCase()))) return "speaker";
  if (domainOf(cfg.state_entity) === "media_player" && st) return st.attributes.device_class === "receiver" ? "speaker" : "screen";
  {
    // A diffuser and a ventilation unit by their name or their maker's.
    const named = stripAccents(`${cfg.icon || ""} ${cfg.state_entity || ""} ${stHay(st)}`).toLowerCase();
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
  if (/purif|air.?clean|luftrein|depura|luchtrein|luftren|oczyszcz|cisticka|\u51c0\u5316|\u043e\u0447\u0438\u0441\u0442\u0438\u0442|dyson|blueair|blue.?pure|winix|levoit|coway|zhimi.?air|(^|[\s._])(core|vital).?\d{3}s|lv.?pur/.test(`${hay} ${stripAccents(stHay(st)).toLowerCase()}`)) return "air_purifier";
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
  if (/^climate\./.test(eid) && THERMOSTAT_NAME_RE.test(stripAccents(`${hay} ${stHay(st)}`.toLowerCase()))) return "thermostat";
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
  // A temperature sensor nothing above has claimed.
  if (st && domainOf(cfg.state_entity) === "sensor" && st.attributes.device_class === "temperature") return "climate_sensor";
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
// Height of a finished part on the drawing, in pixels.
const P3_PART_MAX = 40;
// A card that counts minutes of its own, the fridge without power and the
// iron left on, redraws on this beat: the count is shown in whole minutes, so
// half a minute is close enough to keep it honest.
const CLOCK_TICK_MS = 30 * 1000;
