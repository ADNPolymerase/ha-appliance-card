# HA Appliance Card

[![hacs_badge](https://img.shields.io/badge/HACS-Default-41BDF5.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-appliance-card?sort=semver)](https://github.com/ADNPolymerase/ha-appliance-card/releases)
[![HACS Action](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg)](https://www.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ADNPolymerase/ha-appliance-card/blob/main/LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/adnpolymerase)

<a href="https://buymeacoffee.com/adnpolymerase" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60"></a>
<a href="https://adnpolymerase.github.io/HA/" target="_blank"><img src="https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg" alt="Link to my github.io for my other projects" height="60"></a>

A Lovelace card for household appliances: washers, dryers, dishwashers, ovens, microwaves, cooker hoods, cooktops, fridges, kettles, cookers, coffee machines, rice cookers, air fryers, water heaters, boilers, heat pumps, 3D printers, pet feeders, irons, pellet stoves, air conditioners, dehumidifiers, space heaters, towel warmers and EV chargers. Cycle in progress, program, remaining time, temperature, alerts and controls.

No brand assumed: every field is an entity you pick, so it works with **any** integration (Electrolux, Samsung, LG, Home Connect, Miele, a plain smart plug…).

> Feedback and issues welcome.
> 🇫🇷 [Lire en français](README.fr.md)

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/screenshot.png" alt="HA Appliance Card screenshot" width="100%">

## Features

- **Twenty-five appliance types**, each with a CSS illustration that animates on the appliance's own data and stays still when idle. The type is detected on its own or set via `appliance_type`, and `compact: true` keeps only the text.
- **State normalization**: `Idle`, `RUNNING`, `wash`, `En marche`… are recognised (accent-insensitive) and sorted into idle, preheating, running, paused, done, delayed or error. An unknown state is shown as it came, minus the integration's namespace, and `state_map` sorts the rest, `"*"` catching everything left over.
- **The step, not an hour of *Running***: a washer, a dryer or a dishwasher names the step it is at (*Pre-wash*, *Washing*, *Rinsing*, *Spinning*, *Drying* and seven more), from a phase entity or from its own state, and the drum whirls while it spins. The time left is still the whole cycle's.
- **A washer-dryer is a washer that dries**: `washer_dryer: true`, and the drum shows water while it washes, then clothes turning in hot air while it dries. The step comes from the state itself or from a phase entity, and the state line reads *Washing* or *Drying*.
- **Each appliance says what matters for it**: a coffee machine what it is missing (water, beans, tray, descaling), a fridge its health (unplugged, door open, temperature high), a combi boiler what it is heating (central heating, hot water or standby), a 3D printer what the job is doing (preheating, bed levelling, changing filament), a pellet stove the phase of its fire (ignition, modulating, eco, cleaning), an air conditioner its mode and where it blows, an EV charger whether a car is plugged in and what the charge is doing (waiting for authorisation, charging, paused, scheduled, complete).
- **Works from a smart plug alone**: `power_entity` and `power_on_threshold` are enough to derive the state from consumption; `power_off_delay` keeps a pause from reading as the end, and `show_last_cycle` shows how long the last cycle ran.
- **Program, remaining time, progress bar, info lines, door, alerts, connectivity and controls** (start, pause, resume, stop), each optional.
- **14 languages** (EN, FR, DE, ES, IT, NL, PT, SV, NO, DA, PL, RU, ZH, CS), Home Assistant's or pinned on the card.
- **Visual editor** that pre-fills fields from the entities of the same device and only offers those the chosen type can use.

![Animated appliance types](https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/animated.gif)

## Installation

### HACS

1. In HACS, search for **HA Appliance Card** and install it.
2. Add a `custom:ha-appliance-card` card to your dashboard.

### Manually

1. Download `ha-appliance-card.js` from the [latest release](https://github.com/ADNPolymerase/ha-appliance-card/releases/latest) and drop it in `config/www/`.
2. Add the resource `/local/ha-appliance-card.js`, type **JavaScript module**, under **Settings > Dashboards > Resources**.
3. Add a `custom:ha-appliance-card` card. A manual install has to be repeated at every release.

## Configuration

Only `state_entity` is required, except on a fridge where a probe or a door contact is enough, and on an EV charger where its plug or its power meter is enough. In the visual editor, picking the state entity pre-fills the other fields.

| Option | Description |
|---|---|
| `state_entity` | **Required**, except on a fridge or an EV charger. Entity carrying the appliance's state, any domain. |
| `state_map` | Map raw state → `idle` \| `running` \| `preheating` \| `keep_warm` \| `paused` \| `done` \| `delayed` \| `error`. Sets the label, the colour and the animation. The key `"*"` catches every state left over (see below), and on a washer, a dryer or a dishwasher the steps (`washing`, `spinning`...) are targets too. Also in the visual editor. |
| `state_show_raw` | `true` shows the entity's own text instead of the card's label, as Home Assistant displays it (a climate reads `Cooling`, not `cool`). |
| `controls_activation` | How the control buttons answer a finger: `tap` (default) runs them at once, `hold` runs them only after a long press, `off` never runs them from the card (a long press opens the entity). In YAML, write it in quotes, `controls_activation: "off"`: a bare `off` is read as `false` (the card still takes it as `off`). Handy against stray taps and small fingers. |
| `name` | Card title. Defaults to the state entity's name. |
| `compact` | `true` hides the illustration. |
| `illustration_color` | `auto` (default, follows the theme) \| `white` \| `grey` \| `black` \| `red` (dark red). Only changes the casing, not the state colours. |
| `language` | `auto` (default, follows Home Assistant) or one of the 14 codes: `en`, `fr`, `de`, `es`, `it`, `nl`, `pt`, `sv`, `no`, `da`, `pl`, `ru`, `zh`, `cs`. `nb` and `nb-NO` give Norwegian. |
| `appliance_type` | `auto` (default) \| `washer` \| `dryer` \| `dishwasher` \| `oven` \| `microwave` \| `hood` \| `cooktop` \| `fridge` \| `kettle` \| `cooker` \| `coffee` \| `rice_cooker` \| `air_fryer` \| `water_heater` \| `boiler` \| `heat_pump` \| `printer_3d` \| `pet_feeder` \| `iron` \| `pellet_stove` \| `air_conditioner` \| `dehumidifier` \| `space_heater` \| `towel_warmer` \| `ev_charger`. |
| `tap_action` | What a tap on the card does, in Home Assistant's own words: `more-info` (default), `none`, `navigate`, `url`, `toggle`, `perform-action` or `fire-dom-event`, which is what the popup cards built on browser_mod listen for. In YAML only. |
| `toggle_entity` | Power button (`switch`, `button`, `script`, `input_boolean`, `fan`), highlighted while on. |
| `power_entity` / `power_on_threshold` / `power_icon` | Power sensor. With a threshold, the state is derived from it: *running* above, then *finished* when it falls back. Pointing `state_entity` at the same sensor enables it with a 10 W threshold. `power_icon` replaces `mdi:power-plug`. |
| `power_off_delay` | Minutes the power must stay under `power_on_threshold` before the cycle reads *Finished*, so a pause (a dishwasher drying, a washer soaking) is not taken for the end. Only when the state comes from the plug: an integration reports its pauses itself. 0 by default. |
| `show_last_cycle` | Adds a *Last cycle* line between cycles: how long it ran and when it ended, read from Home Assistant's history (seven days of the state, two days of a plug's power, pauses shorter than `power_off_delay` included). Appliances that run a cycle, the kettle and the iron. |
| `program_entity` / `program_format` | Program. `clean` (default) makes it readable (`LaundryCare.Washer.Program.Auto40` becomes *Auto 40*, `Rapid20Min` becomes *Rapid 20 Min*), `raw` shows it as-is. |
| `remaining_time_entity` / `remaining_time_unit` | Remaining time, in `auto` (default, from the entity's unit: s, min, h, ms, d, or `1:02:03`), `seconds`, `minutes` or `hours`, or a finish time (`timestamp`). It also draws the progress bar: the time run since the cycle began, pauses left out, over that time plus what is left. Opened mid-cycle, the card finds the start in the state history. |
| `remaining_time_hide_when_idle` | `true` only shows the remaining time while running, against stale finish times (SmartThings). |
| `remaining_time_split` | `true` puts the end time on its own line, for a narrow card. |
| `progress_entity` | 0-100 sensor replacing the estimate drawn from the remaining time. |
| `door_entity` / `door_open_state` / `door_invert` / `door_hide_in_list` | Door sensor, "open" state (default `on`), inversion, and hiding the line (the door is still drawn). |
| `alerts_entity` | Entity whose every *attribute* at on, true or active shows as an alert. |
| `alerts_entities` | Up to 8 alerts with an entity each (Home Connect's salt, rinse aid, i-Dos, filters…), as `{ entity, label?, icon? }` or a plain id, shown while on, true, active, *present* or *confirmed*: one under its own name, several behind their count (see *Alert entities*). |
| `connectivity_entity` / `connectivity_connected_state` | Connectivity, as a wifi icon, and the "connected" state (default `on`). |
| `corner_entities` | Up to 2 switches as icons in the top corners, the first on the left and the second on the right, as `{ entity, label?, icon? }` or a plain id. The icon says what each one does and whether it holds (a child lock, an automatic lock, a lock, a switch), and a tap toggles it. A `lock` only opens its dialog: a stray tap never unlocks anything. |
| `info_entities` | Up to 8 lines `{ entity, icon?, label?, value_map?, hide_unit? }`, any beyond are ignored, shown under the lines the card reads on its own. A tap opens the entity's dialog, which is how a tank or a filter gets reset from the card. Past 5 lines the spacing tightens. Values read as in Home Assistant, with the entity's display precision. `value_map` relabels raw values (see below), `hide_unit` drops the unit. |
| `lines_order` | The order of the info lines, as a list of their keys: `program`, `remaining`, `door`, the ones each type brings (`level`, `last_feed`, `flow_return`, `nozzle`…) and, for the lines you add, their entity id. The visual editor writes it for you by dragging. Lines left out keep their place after the ones named, and a line that is not showing is skipped. |
| `start_entity` / `pause_entity` / `resume_entity` / `stop_entity` | Controls, only shown when configured. A control is usually a `button`, a `script` or an `automation`, which is triggered rather than switched off, and can also be a `select` or a `number`: `start_option` says which option to pick (the card takes it on its own when the list holds only one), `start_value` what to write. The same goes for the other three, as `pause_option`, `stop_value` and so on. `start_icon` swaps the button's icon, as do `pause_icon`, `resume_icon`, `stop_icon`, `toggle_icon` and `filter_reset_icon`: `mdi:play` reads as a programme starting, which is not what every press does. In YAML only. |

Per type:

| Option | Types | Description |
|---|---|---|
| `washer_dryer` | washer | `true` for a machine that washes and then dries, as a checkbox under the appliance type. A name that says so is enough; `false` forces the plain washer back. |
| `phase_entity` / `phase_map` | washer, dryer, dishwasher | The step the cycle is at, named on the state line. See *Cycle steps* below. |
| `target_temperature_entity` / `current_temperature_entity` | oven, cooker, rice cooker | Setpoint and actual temperature. While climbing, the bar becomes a preheat gauge. |
| `heating_entity` | oven, cooker, rice cooker, water heater | Says whether it heats when the state entity cannot. Otherwise derived from the running state. |
| `light_entity` | oven, hood, 3D printer | Light, as a small toggle in the header. A lit printer's chamber lights up too. |
| `power_level_entity` | microwave, cooktop | Power level. On a cooktop it sets how brightly the zones glow. |
| `fan_entity` | hood | Speed: a `fan`'s percentage or preset, or a `select`, `sensor` or `number` mapped onto 1 to 3. Clicking the line opens the entity to change it. |
| `boost_entity` | hood | Intensive mode, when the preset doesn't say so. |
| `filter_life_entity` / `filter_reset_entity` | hood | Filter wear as a bar, and a reset button. |
| `filter_life_entity` / `filter_reset_entity` / `filter_due_below` | pet fountain | The filter's days or percent left, on a line, and a reset button. At or below `filter_due_below` (3 for days, 10 for percent by default) the state reads *Filter due* and the light turns orange. |
| `pump_clean_entity` / `pump_reset_entity` | pet fountain | The same for the pump: days or percent until it wants cleaning, against the same threshold, and a reset button. The state reads *Clean the pump*. |
| `water_level_entity` / `level_empty_below` | pet fountain | The water left, a percentage that fills the tank on the drawing, or a contact on when it runs low. At or below `level_empty_below` (10 by default) the state reads *Low water*, in red, ahead of everything else: a dry pump burns out. The jet then stops, as it does with the pump off, and the dish drops with the tank. |
| `zones` / `zones_layout` / `zones_count` | cooktop | Up to 6 zones `{ level_entity, residual_heat_entity?, name? }`, level as a number or a word (`boost`), `H` for residual heat. Layout `2x1` \| `2x2` \| `3x2`, and how many zones to draw without entities (default 4). |
| `child_lock_entity` | cooktop | Padlock on the illustration. |
| `fridge_layout` | fridge | `freezer_bottom` (default) \| `freezer_top` \| `side_by_side` \| `single` \| `wine` (glass door and bottles, for a wine cooler). |
| `fridge_temperature_entity` / `freezer_temperature_entity` / `fridge_max_temperature` / `temperature_hide_in_list` | fridge | Temperatures shown on the doors and in the list, `--°` when the probe goes quiet (`temperature_hide_in_list` leaves them on the doors only). Above the maximum (default 8 °C, 18 °C for `wine`), the state reads *Temperature high*. |
| `door_entity` / `freezer_door_entity` | fridge | Each door swings for its own sensor. |
| `ice_maker_entity` | fridge | Ice cubes fall while it produces. |
| `power_entity` / `power_on_threshold` / `no_power_after` | fridge | Staying below the threshold (default 1 W) for more than `no_power_after` minutes (default 30) reads *No power draw*, in orange: a long compressor pause looks the same. Counted from the reading's last change, so a page reload does not restart it. |
| `plug_entity` | fridge | The smart plug's switch. Off reads *Unplugged* at once. Unplugged or drawing nothing, the light inside goes out. |
| `temperature_decimals` | fridge, kettle, water heater, boiler, heat pump | `0` (default, whole degree), `1` (one decimal) or `auto` (the entity's display precision), on the appliance's screen and in the list. |
| `temperature_entity` | kettle, water heater, boiler, heat pump | Water temperature (flow temperature on a boiler or a heat pump), shown on the appliance and in the list. A `water_heater` entity provides its own. On a water heater the hot water fills the tank from 15 to 65 °C. |
| `state_entity` as `water_heater` | water heater | Its state is the mode (*Eco*, *Performance*…), shown as Home Assistant translates it. Heating then comes from `heating_entity`, a smart plug or MELCloud's `status` attribute. |
| `heating_entity` / `hot_water_entity` | boiler, heat pump | Central heating and hot water indicators; with both on, hot water wins. A heat pump has a cooling one as well, below. Without them the mode comes from `state_entity`: codes `-H`, `=H`, `0H` (Nefit, Bosch) or their numeric form `200`, `201`, `203`, with start-up (`0U`, `0C`, `0L` or `270`, `283`, `284`) read as *Ignition* and the burner's waits (`0A`, `0Y`, `0E` or `202`, `204`, `265`, `305`, `353`) as *Waiting*; `CH`, `HW`, `No`; those of InComfort, ebusd, myVAILLANT and MELCloud; or *central heating* and *hot water*. With the indicators off but the flame lit, it reads *Burner on*. `state_map` accepts `space_heating`, `hot_water`, `starting`, `waiting` and `idle`. With only the burner as `power_entity`, the flame lights without saying what for. |
| `state_entity` on a heat pump | heat pump | What the pump is doing: a `climate` entity's `hvac_action` (heating, cooling, defrosting, idle), MELCloud's `status` attribute (`heat_water`, `heat_zones`, `cool`, `defrost`, `standby`, `legionella`) or a sensor in words (*heating*, *hot water*, *cooling*, *defrost*, in 14 languages). The state of a `climate` or `water_heater` entity is the mode you picked, shown as-is when the entity says nothing about what the pump does. `state_map` accepts `space_heating`, `hot_water`, `cooling`, `defrost` and `idle`. The outdoor unit's fan turns while it works and stops to defrost; the tank or the radiator warms depending on the mode, and the water runs down the flow pipe and back up the return, out hot and back cooler while it heats, the other way round while it cools. |
| `cooling_entity` and the valves | heat pump | A cooling indicator, beside the heating and hot water ones. An indicator may also be a valve: HeishaMon's 2-way valve reads *Heating* or *Cooling* and its 3-way valve *Room* or *Tank*, whichever field they sit in. The tank comes first, then cooling, then heating. |
| `outdoor_temperature_entity` / `heat_output_entity` / `cop_entity` | heat pump | Outdoor temperature, heat output and COP, in the list. Without a COP entity, the card divides the heat output by `power_entity` once both are in W or kW. |
| `cooling_power_entity` / `cooling_output_entity` / `hot_water_power_entity` / `hot_water_output_entity` | heat pump | What the pump draws and makes while it cools and for the tank, for the integrations that measure each circuit apart (HeishaMon). The card reads the pair of the circuit the indicators point to, even at rest, and the heating pair otherwise. Cooling, the line reads *Cooling output* and the computed ratio *EER*. |
| `return_temperature_entity` | heat pump | The water coming back. Flow and return then share one line, as *42 °C → 36 °C*, and the card works out the Delta T on its own like it does the COP, in kelvin as the trade writes it (°F stays °F), always with a decimal since a heat pump works on a couple of degrees. Taken as a distance, so it stays positive while the pump cools the house. |
| `water_flow_entity` | heat pump | Flow rate, in the entity's own unit. |
| `compressor_entity` | heat pump | Frequency in hertz, or an on/off contact read as *Running* and *Off*. A compressor at rest stops the fan on the drawing and puts the indicators on *Standby*: the pump is only pushing water around, whichever way the valves point. At work, it turns a standby state into *Running*. |
| `fan_speed_entity` | heat pump | Fan speed, in the entity's own unit. |
| `no_hot_water` | heat pump | `true` drops the hot water tank from the drawing, for an installation that heats no domestic hot water. What is left stands in the middle. |
| `underfloor_heating` | heat pump | `true` draws a heated floor instead of a radiator, which is how most air-to-water installations emit their heat: the slab seen at an angle with its pipe snaking across it, and the heat rising off it while it warms. It turns blue when the pump cools the house. |
| `state_entity` on a 3D printer | 3D printer | The printer's status, as each integration sends it: `current_state` (OctoPrint), the printer's own sensor (PrusaLink), `print_status` (Bambu Lab, Creality), `current_print_state` (Moonraker, Klipper), `current_status` (Elegoo), `machine_status` (Flashforge), `job_state` (Anycubic). It reads *Printing*, *Preparing*, *Preheating*, *Paused*, *Needs attention*, *Finished*, *Cancelled*, *Failed*, *Error*, *Idle* or *Offline*. Most integrations say *printing* from the moment the start code heats up: while a heater is still more than 5 °C below its target and the part has not started, the card reads *Preheating* and the bar becomes a heating gauge. Outside a job the remaining time is hidden, since a printer keeps its last one. |
| `phase_entity` | 3D printer | What the job is busy with: Bambu Lab's `current_stage`, Elegoo's `print_status`. It reads *Preheating*, *Bed levelling*, *Changing filament*, *Cooling*, *Calibrating* or *Homing* during a job. |
| `program_entity` | 3D printer | The print file, without its folder or its slicer extension. |
| `nozzle_temperature_entity` / `nozzle_target_entity` / `bed_temperature_entity` / `bed_target_entity` / `chamber_temperature_entity` | 3D printer | Nozzle, bed and chamber, shown as *219 °C → 220 °C* until the target is reached. A target is a sensor or a `number` (Moonraker, Elegoo); without one, the card reads a `target` attribute on the reading (Creality). The nozzle temperature shows on the printer's screen, and a heater with a target glows. |
| `current_layer_entity` / `total_layers_entity` | 3D printer | The layer, as *84 / 190*. |
| `printer_layout` | 3D printer | `enclosed` (default: a chamber whose bed drops as the part grows) \| `open` (an open frame whose gantry climbs). The part grows with the progress, in the state's colour, and the head moves while it prints. |
| `printed_part` | 3D printer | The part on the bed: `cube` (default), `pyramid` or `duck` (a rubber duck). It shows from the bottom up as it prints. |
| `iron_layout` | iron | `iron` (default, the iron alone) \| `generator` (the same iron on the base of a steam generator). |
| `left_on_after` | iron | Minutes switched on after which the state line reads *Left on*, in red. Empty, it never does. |
| `feeder_layout` | pet feeder | `tower` (default, a square tank on its base) \| `canister` (a round tank on a round base) \| `double` (two outlets and two bowls). |
| `portions_today_entity` / `weight_today_entity` | pet feeder | What was served today, on one line. Without a weight entity the card works the grams out from `portion_weight_entity`, so nothing is assumed about the size of a meal. |
| `serving_size_entity` / `portion_weight_entity` | pet feeder | How many portions a serving holds, and what one weighs. |
| `schedule_entity` | pet feeder | The feeding plan, as the integration words it, on a line that wraps. |
| `last_feed_entity` | pet feeder | A timestamp of the last meal, when the integration gives one. Otherwise the card finds it: a `script` says when it last ran, whatever asked it to, a `button` carries the time of its last press, and the day's counter moves on every meal the feeder serves, including the ones it serves on its own schedule. |
| `level_entity` / `level_empty_below` / `level_max` | pet feeder | What is left in the tank: a percentage, which fills the hopper on the drawing and reads on the state line at rest (*Tank at 74%*), or a contact that only says *empty*. At or below `level_empty_below` (default 0) the state reads *Tank empty*, in orange, and the hopper is drawn empty, in the reading's own unit. A tank counted in grams or in litres fills the hopper, and gives its percentage, once `level_max` gives its capacity. |
| `error_entity` | pet feeder | Turns the state to *Error*, and to *Tank empty* when the error names itself (`no_food`, `empty`, and the same word in the other languages). A fault code counts as an error on any value but zero. |
| `state_entity` | pet feeder | Optional: a feeder is idle nearly all the time, so a control or a counter is a complete configuration. When it does report, *on* reads as *Dispensing* and the kibble falls. |
| `state_entity` / `phase_entity` | pellet stove | The phase of the fire: *Off*, *Ignition*, *Burning*, *Modulating*, *Eco standby*, *Cooling down*, *Cleaning* or *Alarm*. Read from a status sensor in `phase_entity` (Palazzetti's keys, Micronova's Agua IOT in the stove's own language, Edilkamin, Rika, Duepi), and otherwise from a `climate` entity's `hvac_action`, where *idle* is the eco standby. `state_map` accepts the eight phases, as `off`, `ignition`, `burning`, `modulating`, `eco`, `cooling`, `cleaning` and `alarm`. |
| `current_temperature_entity` / `target_temperature_entity` | pellet stove | Room and setpoint, as *20 °C → 21 °C* while the stove works towards it. A `climate` entity in `state_entity` gives both on its own. |
| `power_level_entity` / `flue_temperature_entity` / `fan_speed_entity` | pellet stove | The power stage, as *4 / 5* when the entity knows its range, and on the stove's screen while it burns; the flue gas temperature; the fan, a `fan` entity reading in percent. |
| `level_entity` / `level_empty_below` / `level_max` | pellet stove | The pellets in the hopper: a percentage, or a contact on when the reserve is reached (Agua IOT, Edilkamin). A level in centimetres or kilograms fills the hopper once `level_max` gives its capacity. Empty, the hopper turns red, and in alarm the state reads *Out of pellets*. |
| `error_entity` | pellet stove | The alarm: a word (*Ignition failed*), a count or a contact. Anything but *no alarm*, however the stove says it, puts the stove in alarm, with its words on a line and its code (*AL05*) on the screen. |
| `state_entity` | air conditioner | A `climate` entity: *Cooling*, *Heating*, *Drying*, *Fan only* or *Auto* as set, and from `hvac_action` *Standby* once the setpoint is reached, *Defrosting* and *Warming up*. The screen shows the mode's symbol and the setpoint, and the lines the room, the humidity and the fan. A plug reads *Running* or *Off*. `state_map` accepts `off`, `cool`, `heat`, `dry`, `fan`, `auto`, `idle` and `defrost`. |
| `vane_vertical_entity` / `vane_horizontal_entity` | air conditioner | The vanes, when they live in selects of their own (Panasonic, Midea); otherwise the `climate` entity's `swing_mode` and `swing_horizontal_mode`. Five positions from top to bottom and from left to right, or a swing, in each integration's words. |
| `state_entity` | dehumidifier | A `humidifier` entity: *Drying*, *Drying laundry* when its mode says so (Midea's clothes_dry), *Standby* once the humidity is reached, *Tank full*. The screen and a line give the humidity and its target. |
| `tank_entity` / `tank_full_above` / `current_humidity_entity` | dehumidifier | The tank, a contact on when full or a level in percent (full from `tank_full_above`, 100 by default), shown in the window at the bottom; a hygrometer for a dehumidifier on a plug. |
| `state_entity` / `heater_layout` | space heater | A `climate` entity: *Heating*, *Standby* once the setpoint is reached, *Fan only*. `heater_layout`: `fan` (fan heater, the default) or `oil` (oil-filled radiator). |
| `state_entity` | towel warmer | The pilot wire's mode: *Comfort*, *Eco*, *Frost protection*, *Boost*, *Drying*, read from a `climate` entity's preset (Heatzy, Atlantic) or from a select (NodOn). |
| `current_temperature_entity` / `target_temperature_entity` | space heater, towel warmer | Room and setpoint, when a `climate` entity does not carry them. |
| `fan_speed_entity` / `purifier_entity` / `outdoor_temperature_entity` / `defrost_entity` | air conditioner | The fan when the `climate` entity does not carry it; the purifier (nanoe, plasma), lit on the unit; the outdoor temperature; a defrost contact. |
| `speed_entity` | cooker | Blade speed, banded onto three speeds. |
| `state_entity` / `fryer_layout` | air fryer | The fryer's own words, as Philips (HomeID and the older HACS integration), Xiaomi and Cosori (VeSync) report them: *Preheating*, *Preheated*, *Cooking*, *Shake the basket*, *Basket out*, *Paused*, *Keeping warm*, *Finished*, *Delayed start*. `fryer_layout`: `basket` (the default), `window` (a window onto the basket) or `dual` (two baskets). |
| `basket_entity` / `shake_entity` / `basket2_state_entity` | air fryer | The basket sensor, on while it is out (Philips' drawer, Xiaomi's pot), which turns a cycle into *Basket out*; the shake reminder, which turns cooking into *Shake the basket*; the state of the second basket of a dual fryer, drawn apart and named on a line. |
| `water_entity` | coffee | Tank: a Home Connect boolean, or a level in % with *empty* below 10%. |
| `beans_entity` / `tray_entity` / `descaling_entity` | coffee | Beans empty, tray full, descaling due. |
| `cups_entity` | coffee | Number of cups: a count, a boolean or a beverage name (*2 Espressi*). |
| `strength_entity` | coffee | Coffee strength, as a number or a word. |
| `state_entity` | EV charger | The charger's status: *No vehicle*, *Plugged in*, *Awaiting authorisation*, *Charging*, *Discharging*, *Charging paused*, *Scheduled*, *Charging complete*, *Error* or *Offline*, read in the words of OCPP and of the integrations in Home Assistant (see *EV chargers*). `state_map` accepts the ten as `no_vehicle`, `connected`, `awaiting_auth`, `charging`, `discharging`, `paused`, `scheduled`, `done`, `error` and `offline`. Optional: without it the plug and the power meter say it. |
| `vehicle_entity` | EV charger | Whether a car is plugged in: a plug's contact, or a cable state in words (`disconnected`, `cable_only`, `vehicle_connected`, `vehicle_locked`). No car turns a recognised status into *No vehicle*, unless the status is an error. |
| `power_entity` / `power_on_threshold` | EV charger | The power, in the meter's own unit and precision (*7.4 kW*). The threshold is in W whatever that unit, 100 W by default: power flows above it. It only stands in for a missing status, and tells a car that has its charge from one that paused. |
| `session_energy_entity` | EV charger | The energy of the session, as *Charged 12.4 kWh*. |
| `discharge_power_entity` | EV charger | The power the car gives back (V2H, V2G), such as OCPP's `Power.Active.Export`, as *Discharge 7.4 kW*. Above `power_on_threshold`, the car is *Discharging* (see *Bidirectional charging*). |
| `current_limit_entity` | EV charger | The current limit, as *Current limit 16 A*. A tap opens the entity, which is where it is changed. |
| `error_entity` | EV charger | A contact on, a code other than 0, or a word other than *no error* (OCPP's `NoError`, `ok`, `none`) turns the state into *Error*, with the charger's words on a line. |

### Examples

```yaml
type: custom:ha-appliance-card
state_entity: sensor.washer_appliance_state
program_entity: select.washer_program_uid
remaining_time_entity: sensor.washer_time_to_end
door_entity: binary_sensor.washer_door_state
info_entities:
  - entity: select.washer_temperature
    icon: mdi:thermometer
pause_entity: button.washer_execute_command_pause
stop_entity: button.washer_execute_command_stopreset
```

```yaml
type: custom:ha-appliance-card
appliance_type: oven
state_entity: sensor.oven_state
target_temperature_entity: number.oven_setpoint
current_temperature_entity: sensor.oven_temperature
light_entity: light.oven_light
```

```yaml
type: custom:ha-appliance-card
appliance_type: cooktop
state_entity: sensor.cooktop_state
zones:
  - level_entity: sensor.cooktop_zone_1_level
    residual_heat_entity: binary_sensor.cooktop_zone_1_hot
    name: Front left
  - level_entity: sensor.cooktop_zone_2_level
```

```yaml
type: custom:ha-appliance-card
appliance_type: boiler
state_entity: sensor.boiler_display_code
temperature_entity: sensor.boiler_flow_temperature
```

```yaml
type: custom:ha-appliance-card
appliance_type: heat_pump
state_entity: climate.heat_pump_zone
hot_water_entity: binary_sensor.heat_pump_hot_water
temperature_entity: sensor.heat_pump_flow_temperature
outdoor_temperature_entity: sensor.heat_pump_outdoor_temperature
power_entity: sensor.heat_pump_power
heat_output_entity: sensor.heat_pump_heat_output
```

A Panasonic Aquarea on HeishaMon, with its valves and each circuit measured apart:

```yaml
type: custom:ha-appliance-card
appliance_type: heat_pump
state_entity: climate.aquarea_zone_1
hot_water_entity: sensor.aquarea_3_way_valve
heating_entity: sensor.aquarea_2_way_valve
cooling_entity: sensor.aquarea_2_way_valve
compressor_entity: sensor.aquarea_compressor_frequency
water_flow_entity: sensor.aquarea_pump_flow
power_entity: sensor.aquarea_heat_power_consumed
heat_output_entity: sensor.aquarea_heat_power_produced
cooling_power_entity: sensor.aquarea_thermal_cooling_power_consumption
cooling_output_entity: sensor.aquarea_thermal_cooling_power_production
hot_water_power_entity: sensor.aquarea_dhw_power_consumed
hot_water_output_entity: sensor.aquarea_dhw_power_produced
underfloor_heating: true
```

```yaml
type: custom:ha-appliance-card
appliance_type: printer_3d
state_entity: sensor.p1s_print_status
phase_entity: sensor.p1s_current_stage
progress_entity: sensor.p1s_print_progress
remaining_time_entity: sensor.p1s_remaining_time
program_entity: sensor.p1s_task_name
nozzle_temperature_entity: sensor.p1s_nozzle_temperature
nozzle_target_entity: sensor.p1s_nozzle_target_temperature
bed_temperature_entity: sensor.p1s_bed_temperature
bed_target_entity: sensor.p1s_bed_target_temperature
current_layer_entity: sensor.p1s_current_layer
total_layers_entity: sensor.p1s_total_layer_count
light_entity: light.p1s_chamber_light
```

With nothing but a smart plug:

```yaml
type: custom:ha-appliance-card
appliance_type: water_heater
state_entity: sensor.water_heater_plug_power
power_entity: sensor.water_heater_plug_power
power_on_threshold: 10
```

### Relabeling raw values (`value_map`)

When an integration reports a phase as a code or an untranslated token, `value_map` relabels it, per info line:

```yaml
info_entities:
  - entity: sensor.washing_machine_program_phase
    label: Phase
    value_map:
      0: Ready
      1: Washing
      18: Finished
```

Case is ignored and a value missing from the map is shown as-is. In the visual editor, it is one `code: label` line per entry.

### Dishwasher phases

With a `phase_entity`, `Drying` and `Ado Drying` replace the wash with orange steam rising up the door, higher for `Ado Drying`. `Prewash`, `Mainwash` and `Rinsing` keep the wash animation. These values are recognised out of the box, as are `Pre Wash`, `Wash`, `Rinse` and `Dry`, and `phase_map` translates the others:

```yaml
appliance_type: dishwasher
state_entity: sensor.dishwasher_state
phase_entity: sensor.dishwasher_cycle_phase
phase_map:
  Sechage: drying
```

An unrecognised value leaves the illustration as it is, and the phase also names the step on the state line (see *Cycle steps*).

### Irons

Nothing connects an iron to Home Assistant, which is why it is on a smart plug: the state comes from what it draws, and the drawing does the rest. Heating, the soleplate glows and steam leaves the nose. Two models are drawn, the iron alone and the same iron on the base of a steam generator.

`left_on_after` is the reason the plug is there. Past that many minutes switched on, the state line reads *Left on*, in red:

```yaml
type: custom:ha-appliance-card
appliance_type: iron
iron_layout: generator
state_entity: switch.iron_plug
power_entity: sensor.iron_plug_power
power_on_threshold: 20
left_on_after: 30
```

The card shows the alert; turning the iron off is an automation's job, on the same entity.

### Pet feeders

A feeder is read rather than run: no cycle, no programme, no door. Its state is worked out from what it reports, *Tank empty*, *Error* or *Dispensing*, and at rest the line tells how full the tank is, or nothing when the card cannot know. The card carries what was served today and when the last meal was. An empty tank is the one thing a feeder cannot fix by itself, so it takes the state line and empties the tank and the bowl on the drawing. A red warning triangle goes up with it, and it goes up for a jam as well, that time with the kibble still in the tank.

The control is the interesting part, because a feeder rarely has a button. This one dispenses from a list set to `START`, over Zigbee2MQTT:

```yaml
type: custom:ha-appliance-card
appliance_type: pet_feeder
start_entity: select.feeder_feed
portions_today_entity: sensor.feeder_portions_per_day
weight_today_entity: sensor.feeder_weight_per_day
portion_weight_entity: number.feeder_portion_weight
serving_size_entity: number.feeder_serving_size
schedule_entity: sensor.feeder_schedule
```

The option is not written down: a list whose only real option is `START` has nothing to ask. This one dispenses from a script instead, and counts its meals with a `history_stats` helper:

```yaml
type: custom:ha-appliance-card
appliance_type: pet_feeder
start_entity: script.feed_the_cat
portions_today_entity: sensor.feeder_meals_today
state_entity: binary_sensor.feeder_dispensing
```

An automation works as a control too, and a `utility_meter` makes a fine counter: `portions_today_entity` takes whatever counts the meals, and the day's total is read where the integration keeps it.

Three entities read as well as ten: a line only exists when its entity answers.

Three models are drawn, after the feeders people buy: a square tank on its base, a round tank on a round base, each with its bowl set down in front, and a double with two outlets on its front and a bowl under each. The small screen shows the time like the real ones, turns blue while the feeder serves, showing the portion when `serving_size_entity` is set, and red on an empty tank or an error. The child lock and the automatic lock go in the top corners, each showing whether it holds:

```yaml
feeder_layout: canister
corner_entities:
  - switch.feeder_auto_lock
  - switch.feeder_child_lock
```

### Pet fountains

A fountain runs all day, so like a feeder it is read rather than run. The water bubbles out of the spout and ripples across the dish while the pump runs, from a switch or the plug the fountain sits on. What it says otherwise is what needs a hand: the water first, then the filter, then the pump, each taking the state line and the light on its front over, orange for the filter and the pump, red and blinking for the water.

```yaml
type: custom:ha-appliance-card
appliance_type: pet_fountain
state_entity: switch.fountain_power
filter_life_entity: sensor.fountain_filter_days
filter_reset_entity: button.fountain_reset_filter
pump_clean_entity: sensor.fountain_pump_cleaning_days
pump_reset_entity: button.fountain_reset_pump
corner_entities:
  - switch.fountain_indicator_light
info_entities:
  - select.fountain_work_mode
```

A fountain that does not know its water level keeps the tank at a resting height on the drawing rather than reading as empty.

### Pellet stoves

A stove says more than on and off: it lights, burns, modulates, rests in eco once the room is warm, cools down and cleans its burn pot. The card reads that phase from the stove's status and draws it: the flame in the glass, the warm air above the grille, smoke at the flue while it lights, ash while it cleans, embers while it rests. The hopper beside the door shows the pellets left.

With the integration in Home Assistant itself, Palazzetti:

```yaml
type: custom:ha-appliance-card
appliance_type: pellet_stove
state_entity: climate.stove
phase_entity: sensor.stove_status
power_level_entity: number.stove_combustion_power
level_entity: sensor.stove_pellet_level
level_max: 40
```

The editor fills most of it from the stove's own entities, on Agua IOT (Extraflame, Ravelli, MCZ, Piazzetta and thirty more), Edilkamin, Rika and Duepi as well.

### Air conditioners

A split's indoor unit, with its mode's symbol and the setpoint on its screen. The air leaves as far down and as far to the side as the vanes point, faster with the fan, and swings with them; drying, the water goes back up into the unit, and defrosting, frost covers it. Panasonic Comfort Cloud:

```yaml
type: custom:ha-appliance-card
state_entity: climate.living_room
vane_vertical_entity: select.living_room_vertical_swing
vane_horizontal_entity: select.living_room_horizontal_swing
purifier_entity: switch.living_room_nanoe
outdoor_temperature_entity: sensor.living_room_outside_temperature
```

A `climate` entity that can cool is recognised on its own, and the editor fills the rest from the unit's entities.

### Air fryers

The screen shows the temperature while the fryer heats up or keeps the food warm, and the time left while it cooks. The heat rises above it and the seam over the basket glows; a basket pulled out comes forward, and one to shake wobbles. Through the window the fries toss in the heat, and on a dual fryer each basket shows its own state. Philips HomeID:

```yaml
type: custom:ha-appliance-card
state_entity: sensor.airfryer_status
fryer_layout: window
remaining_time_entity: sensor.airfryer_time_remaining
target_temperature_entity: sensor.airfryer_temperature
basket_entity: binary_sensor.airfryer_drawer
shake_entity: binary_sensor.airfryer_shake_reminder
```

An entity named after an air fryer (or Cosori's `cook_status`) is recognised on its own, and the editor fills the rest. On a smart plug alone, it reads *Cooking*, then *Finished*.

### Dehumidifiers, space heaters and towel warmers

A dehumidifier shows the humidity on its screen and the water it has taken in its tank; a fan heater glows behind its grille, an oil-filled radiator warms up its fins; a towel warmer shows the pilot wire's mode with the symbols of French radiators (sun, moon, snowflake). Warm air rises, the air a dehumidifier or a fan blows goes the other way.

All three work on a smart plug alone: above `power_on_threshold` they dry or heat, below it they rest while the plug is on and read *Off* once it is switched off.

```yaml
type: custom:ha-appliance-card
appliance_type: space_heater
heater_layout: oil
state_entity: switch.heater_plug
power_entity: sensor.heater_plug_power
power_on_threshold: 30
```

### EV chargers

A wallbox on the wall, its light in the colour of what the charger is doing: *No vehicle*, *Plugged in* (a car waiting), *Awaiting authorisation* (a card or the app), *Charging*, *Discharging* (the car giving energy back), *Charging paused* (by the box or by the car), *Scheduled*, *Charging complete* (the car still plugged in), *Error* or *Offline*. With a car plugged in, the plug leaves its holster and the cable runs off to the car; while it charges, the energy runs down the cable, glowing in the state's colour and faster the more power goes through (four paces, from a solar surplus to 22 kW), and stands still in a pause. The light breathes while charging and slowly while scheduled, and blinks for authorisation and, faster, on a fault. Seen live, a car being plugged in shows the plug riding the cable out to it, an unplugged one the cable winding back, and the end of a charge a flash of the light. With *reduce motion* set on the device, everything stays still. Any wallbox will do: the card reads the status in the words of OCPP and of the integrations in Home Assistant itself, `state_map` teaches it any other, and a box with no status at all is read from its plug and its power meter.

| Integration | Status | Words read |
|---|---|---|
| OCPP ([ocpp](https://github.com/lbbrhzn/ocpp), 1.6 and 2.0.1) | Status Connector | `Available`, `Reserved` → no vehicle; `Preparing` → plugged in; `Charging`; `SuspendedEVSE`, `SuspendedEV` → paused; `Finishing` → complete; `Faulted` → error |
| Peblar | State | `no_ev_connected` → no vehicle; `charging`; `suspended` → paused; `error`, `fault`, `invalid` → error |
| Ohme | Status | `unplugged` → no vehicle; `plugged_in` → plugged in; `pending_approval` → awaiting authorisation; `charging`; `paused`; `finished` → complete |
| Tesla Wall Connector | Status | `not_connected` → no vehicle; `connected`, `negotiating` → plugged in; `charging`, `charging_reduced`; `waiting_car` → paused; `charging_finished` → complete; `error` |
| NRGkick | Status | `standby` → no vehicle; `connected` → plugged in; `charging`; `error` |
| OpenEVSE | Charging status | `not_connected` → no vehicle; `connected` → plugged in; `charging`; `sleeping`, `disabled` → paused; `vent_required` and the faults (`gfci_fault`, `no_ground`, `stuck_relay`…) → error |
| Lektrico | State | `available` → no vehicle; `connected` → plugged in; `need_auth` → awaiting authorisation; `charging`; `paused`; `paused_by_scheduler` → scheduled; `error` |
| Blue Current | Activity | `available` → no vehicle; `charging`; `error`; `offline` |
| Webasto Next and Unite ([Modbus](https://github.com/tomwellnitz/Webasto-Next-Modbus)) | Charge Point State | `available`, `reserved` → no vehicle; `preparing` → plugged in; `charging`; `suspended`, `suspended_evse`, `suspended_ev` → paused; `finishing` → complete; `error`, `faulted` → error |
| Wallbox | Status description | `Charging`; `Discharging`; `Paused`, `Waiting for car demand`, `Waiting in queue by …` → paused; `Scheduled`; `Locked, car connected` → awaiting authorisation; `Error`, `Waiting MID failed` → error |
| Easee ([easee_hass](https://github.com/nordicopen/easee_hass)) | Status | `disconnected` → no vehicle; `awaiting_start` → plugged in; `awaiting_authorization` → awaiting authorisation; `charging`; `awaiting_load_balancing` → paused; `awaiting_scheduled_start`, `awaiting_smart_start` → scheduled; `completed` → complete; `error_*` → error |
| Zaptec ([zaptec](https://github.com/custom-components/zaptec)) | Charger mode | `disconnected` → no vehicle; `connected_requesting` → plugged in; `connected_charging` → charging; `connected_finished` → complete |
| go-e Charger | Car state | `Idle`, `Charger ready, no vehicle` → no vehicle; `Wait for car`, `Waiting for vehicle` → plugged in; `Charging`; `Complete` → complete; `Error` |
| Alfen ([alfen_wallbox](https://github.com/leeyuentuen/alfen_wallbox)) | Status code socket | `Available`, `Cable connected` → no vehicle; `EV connected` → plugged in; `Authorizing` → awaiting authorisation; `Charging normal`, `Solar charging` → charging; `Wait vehicle charging`, `Waiting for power` → paused; `Finish wait vehicle` → complete; `Error …` |
| myenergi Zappi | Plug status | `EV Disconnected` → no vehicle; `EV Connected` → plugged in; `Waiting for EV`, `EV ready to charge` → paused; `Charging`; `Fault` → error |
| Fronius Wattpilot, Hypervolt, SMA EV Charger, Charge Amps, Pod Point | Status | their words too: `wait car`, `no car`, `sleep_mode`, `active_mode`, `station_locked`, `suspended-ev`, `out-of-service`, `connected-waiting-for-schedule`… |
| Tessie, Greencell, Nexblue, TechnoVE, Shelly EVE01, Besen, Victron GX | Status | `idle`, `disconnected`, `charger_free` → no vehicle; `charger_insert`, `plugged_waiting` → plugged in; `waiting_for_rfid` → awaiting authorisation; `charger_wait`, `ev_waiting`, `lb_waiting` → paused; `delay_waiting`, `high_tariff_period` → scheduled; `charger_end`, `charged` → complete; `pilot_fault`, `error_evse` → error |

The status is read whatever its spelling: capitals, spaces, hyphens and commas fold away, so `Waiting for car demand`, `suspended-ev` and `charging_normal` meet the same words. A Wallbox's `Disconnected` may be the box off its cloud rather than no car: `state_map: {Disconnected: offline}` sets it right. go-e's car state comes translated into Home Assistant's language, and only the English words are read; evcc and openWB have no status entity, so give their plug and their power meter instead.

A word with no clear meaning stays as it comes, as on any other appliance: the Tesla's `booting`, the NRGkick's `wakeup`, the Lektrico's `updating_firmware` and `locked`. So does a word that means one thing on one charger and another elsewhere: the Tesla's `ready` is a car plugged in, a Wallbox's `Ready` a box with no car, and both read *Idle* (`state_map: {ready: connected}` for the Tesla). A car that stops taking energy (`SuspendedEV`, `suspended_ev`, the Tesla's `waiting_car`) reads *Charging complete* once the session holds energy and no power flows, which takes `session_energy_entity` and `power_entity`; otherwise it is a pause. A box that holds the energy back (`SuspendedEVSE`, a bare `suspended`) stays paused: it resumes on its own.

Home Assistant's own `unavailable` and `unknown` read *Offline*. A charger that reports OCPP's `Unavailable` as a word is mapped with `state_map`, since only the capital letter tells it apart (Blue Current's and the Unite's lowercase `unavailable` cannot be told apart, and read *Offline*). What wins, in order: an `error_entity` reporting an error, then *Offline*, then a `vehicle_entity` saying there is no car, which turns any recognised status but an error into *No vehicle*, then the status itself.

The Webasto Next, with the [Modbus integration](https://github.com/tomwellnitz/Webasto-Next-Modbus):

```yaml
type: custom:ha-appliance-card
appliance_type: ev_charger
state_entity: sensor.webasto_next_charge_point_state
vehicle_entity: sensor.webasto_next_cable_state
power_entity: sensor.webasto_next_active_power_total
session_energy_entity: sensor.webasto_next_charged_energy
current_limit_entity: number.webasto_next_charging_current_limit
start_entity: button.webasto_next_start_charging
stop_entity: button.webasto_next_stop_charging
```

A box with no status, from its plug and its meter: no car reads *No vehicle*, a car with the power above `power_on_threshold` *Charging*, a car without it *Plugged in*.

```yaml
type: custom:ha-appliance-card
appliance_type: ev_charger
vehicle_entity: binary_sensor.wallbox_plug
power_entity: sensor.wallbox_power
power_on_threshold: 500
```

A charger that reports the control pilot's letters of IEC 61851 is read through `state_map`, since a bare letter could mean anything on another entity:

```yaml
type: custom:ha-appliance-card
appliance_type: ev_charger
state_entity: sensor.wallbox_cp_state
state_map:
  A: no_vehicle
  B: connected
  C: charging
  D: charging
  E: error
  F: error
```

And OCPP's `Unavailable`, a connector taken out of service, the same way:

```yaml
state_map:
  Unavailable: offline
```

#### Bidirectional charging (V2H, V2G)

A car that gives energy back, to the home or to the grid, reads *Discharging*, in the violet of energy returned in Home Assistant's energy dashboard, and the energy runs up the cable from the car into the box, in a glow along the whole cable that shimmers. No standard gives a charger a status for it: OCPP keeps reporting a charge up to 2.1, ISO 15118-20 has no such state, and IEC 61851's control pilot carries no direction. So the card reads it where it is said:

- in a word, whole: `Discharging` (the Wallbox Quasar, Sigenergy's DC charger, the Volvo and Volkswagen integrations) and `v2g_discharging` (Renault);
- on a meter of its own, `discharge_power_entity`, above `power_on_threshold`: OCPP's `Power.Active.Export`, Tesla's Powershare power;
- below zero on `power_entity`, for a meter that counts the energy given back as negative (a Quasar over Modbus). A meter that counts both ways alike, such as the Wallbox cloud's, says nothing of the direction: the status does.

A car giving energy back discharges whatever the status calls it, since OCPP reports a charge; an error, *Offline* and a plug with no car still come first. A word that only contains the word is something else: a mode to choose (`immediateDischarging`), the home battery feeding the box (`ChargingBecauseDischargingPvBattery`). Nor is V2L read: a car powering a device through its own socket has no wallbox in the way.

An OCPP wallbox that can discharge, and a Wallbox Quasar:

```yaml
type: custom:ha-appliance-card
appliance_type: ev_charger
state_entity: sensor.wallbox_status_connector
power_entity: sensor.wallbox_power_active_import
discharge_power_entity: sensor.wallbox_power_active_export
```

```yaml
type: custom:ha-appliance-card
appliance_type: ev_charger
state_entity: sensor.wallbox_quasar_status_description
power_entity: sensor.wallbox_quasar_charging_power
current_limit_entity: number.wallbox_quasar_maximum_charging_current
```

An entity named after a wallbox in the card's languages, after its maker or after OCPP is recognised on its own, as is an enum status that lists a charger's words. The editor fills the plug, the meter, the power given back, the session, the current limit, the error and the start and stop buttons from the charger's own entities, never its restart or reset button.

### Cycle steps

While a washer, a dryer or a dishwasher runs, the state line names the step it is at rather than *Running* all the way through: *Pre-wash*, *Soaking*, *Weighing*, *Filling*, *Washing*, *Rinsing*, *Draining*, *Spinning*, *Drying*, *Cooling*, *Anti-crease* or *Steam*. While a washer spins, its drum empties and the laundry whirls. A paused, finished or delayed machine keeps its word, and the time left and the progress bar stay those of the whole cycle.

Where the step comes from depends on the integration:

| Integration | Where it says it | What to configure |
|---|---|---|
| LG ThinQ, Whirlpool, Midea | the state itself (`rinsing`, `cycle_spinning`, `Dry`) | nothing |
| Electrolux, AEG | `cyclePhase` (`Wash`, `Rinse`, `Spin`) | `phase_entity` |
| Miele, SmartThings | a phase entity (`program_phase`, `job_state`) | `phase_entity` |
| hOn (Candy, Hoover, Haier) | a numbered phase (`prPhase`) | `phase_entity` and `phase_map` |
| HomeWhiz (Beko, Grundig, Arçelik, Bauknecht) | its *Sub state* (`washer_substate_spin`, `dryer_message_cooling`) | `phase_entity` |
| Home Connect (Bosch, Siemens) | nowhere: the state stays *Run* all the way through | nothing to read |

A word from the phase entity that the card does not know is shown as it is written, except a HomeWhiz message that names no step (*Hello*, *Child lock*), which leaves *Running* in place. A HomeWhiz machine says a finished cycle in that message too, asking for the laundry back or calling the programme complete while its state goes back to *On*: still switched on, the card reads *Finished*. `phase_map` translates codes, into one of the steps above or into words of your own, and `state_map` takes the steps as targets too:

```yaml
appliance_type: washer
state_entity: sensor.washer_machine_state
phase_entity: sensor.washer_program_phase
phase_map:
  4: rinsing
  5: spinning
  9: Anti-allergy
```

### Washer-dryers

A washer-dryer is a washer with `washer_dryer: true`, not a type of its own: the option is a checkbox under the appliance type. Ticked, the drum shows water while the machine washes and clothes turning in hot air while it dries, read from the same step as the state line. A machine whose name says it washes and dries is recognised on its own.

Rinsing counts as washing, since the drum still has water in it. A step the card cannot read leaves the drawing as it is, so a cycle ending on an anti-crease or a cool-down keeps its clothes instead of filling with water again.

```yaml
appliance_type: washer
washer_dryer: true
state_entity: sensor.washer_dryer_machine_state
phase_entity: sensor.washer_dryer_program_phase
```

### Alert entities

Home Connect gives each alert an entity of its own: salt or rinse aid nearly empty, an i-Dos tank running low, a filter to clean. Listed in `alerts_entities`, each one shows while it is *present* or *confirmed* (acknowledged on the appliance, the salt still low), and goes once the appliance says *off*. A single alert shows in red under its own name; several gather behind their count, *2 alerts*, which opens their list. A tap on an alert opens its entity.

```yaml
appliance_type: dishwasher
state_entity: sensor.dishwasher_operation_state
alerts_entities:
  - sensor.dishwasher_salt_nearly_empty
  - sensor.dishwasher_rinse_aid_nearly_empty
  - entity: sensor.dishwasher_machine_care_reminder
    label: Run a care cycle
    icon: mdi:spray-bottle
```

Home Assistant creates these entities disabled: enable the ones you want on the device page first. The visual editor then finds them on its own, whatever language they were named in, and leaves out the events that only report on a program (finished, aborted). Its *Add an alert…* menu offers the appliance's own alerts only: its events, and the binary sensors that report a problem, a leak or a low battery. *Other entity…*, at the end of the menu, takes any entity from any appliance, a pet feeder's desiccant `binary_sensor` for instance, raised while it is on.

### Too many states (`"*"`)

A washer-dryer runs one long programme in a dozen named steps, and nearly all of them mean *running*. Rather than naming every one, name the few that are not and send the rest to a single category:

```yaml
state_map:
  Ready To Start: idle
  End Of Cycle: done
  "*": running
```

The catch-all comes last, so the states the card already knows keep their own meaning and only what is left over lands on it. The quotes are YAML's: a bare `*` starts an alias.

## Thanks

- [@chike-he](https://github.com/chike-he): Chinese translation ([#3](https://github.com/ADNPolymerase/ha-appliance-card/issues/3))
- [@pbarone](https://github.com/pbarone): `device_class: timestamp` support for the remaining time ([#2](https://github.com/ADNPolymerase/ha-appliance-card/pull/2))
- [@monsivar](https://github.com/monsivar): Norwegian Bokmal locale aliases ([#10](https://github.com/ADNPolymerase/ha-appliance-card/pull/10)) and the dedicated dishwasher illustration ([#11](https://github.com/ADNPolymerase/ha-appliance-card/pull/11))

## License

MIT. See [LICENSE](LICENSE).
