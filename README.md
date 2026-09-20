# HA Appliance Card

[![hacs_badge](https://img.shields.io/badge/HACS-Default-41BDF5.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-appliance-card?sort=semver)](https://github.com/ADNPolymerase/ha-appliance-card/releases)
[![HACS Action](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg)](https://www.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ADNPolymerase/ha-appliance-card/blob/main/LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/adnpolymerase)

<a href="https://buymeacoffee.com/adnpolymerase" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60"></a>
<a href="https://adnpolymerase.github.io/HA/" target="_blank"><img src="https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg" alt="Link to my github.io for my other projects" height="60"></a>

A Lovelace card for household appliances: washers, dryers, dishwashers, ovens, microwaves, cooker hoods, cooktops, fridges, kettles, cookers, coffee machines, rice cookers, water heaters, boilers, heat pumps, 3D printers and pet feeders. Cycle in progress, program, remaining time, temperature, alerts and controls.

No brand assumed: every field is an entity you pick, so it works with **any** integration (Electrolux, Samsung, LG, Home Connect, Miele, a plain smart plug…).

> Feedback and issues welcome.
> 🇫🇷 [Lire en français](README.fr.md)

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/screenshot.png" alt="HA Appliance Card screenshot" width="640">

## Features

- **Seventeen appliance types**, each with a CSS illustration that animates on the appliance's own data and stays still when idle. The type is detected on its own or set via `appliance_type`, and `compact: true` keeps only the text.
- **State normalization**: `Idle`, `RUNNING`, `wash`, `En marche`… are recognised (accent-insensitive) and sorted into idle, preheating, running, paused, done, delayed or error. An unknown state is shown as it came, minus the integration's namespace, and `state_map` sorts the rest, `"*"` catching everything left over.
- **A washer-dryer is a washer that dries**: `washer_dryer: true`, and the drum shows water while it washes, then clothes turning in hot air while it dries. The step comes from the state itself or from a phase entity, and the state line reads *Washing* or *Drying*.
- **Each appliance says what matters for it**: a coffee machine what it is missing (water, beans, tray, descaling), a fridge its health (unplugged, door open, temperature high), a combi boiler what it is heating (central heating, hot water or standby), a 3D printer what the job is doing (preheating, bed levelling, changing filament).
- **Works from a smart plug alone**: `power_entity` and `power_on_threshold` are enough to derive the state from consumption.
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

Only `state_entity` is required, except on a fridge where a probe or a door contact is enough. In the visual editor, picking the state entity pre-fills the other fields.

| Option | Description |
|---|---|
| `state_entity` | **Required**, except on a fridge. Entity carrying the appliance's state, any domain. |
| `state_map` | Map raw state → `idle` \| `running` \| `preheating` \| `keep_warm` \| `paused` \| `done` \| `delayed` \| `error`. Sets the label, the colour and the animation. The key `"*"` catches every state left over (see below), and on a washer-dryer `washing` and `drying` name the step. Also in the visual editor. |
| `state_show_raw` | `true` shows the raw text instead of the translated label. |
| `name` | Card title. Defaults to the state entity's name. |
| `compact` | `true` hides the illustration. |
| `illustration_color` | `auto` (default, follows the theme) \| `white` \| `grey` \| `black`. Only changes the casing, not the state colours. |
| `language` | `auto` (default, follows Home Assistant) or one of the 14 codes: `en`, `fr`, `de`, `es`, `it`, `nl`, `pt`, `sv`, `no`, `da`, `pl`, `ru`, `zh`, `cs`. `nb` and `nb-NO` give Norwegian. |
| `appliance_type` | `auto` (default) \| `washer` \| `dryer` \| `dishwasher` \| `oven` \| `microwave` \| `hood` \| `cooktop` \| `fridge` \| `kettle` \| `cooker` \| `coffee` \| `rice_cooker` \| `water_heater` \| `boiler` \| `heat_pump` \| `printer_3d` \| `pet_feeder`. |
| `toggle_entity` | Power button (`switch`, `button`, `script`, `input_boolean`, `fan`), highlighted while on. |
| `power_entity` / `power_on_threshold` / `power_icon` | Power sensor. With a threshold, the state is derived from it: *running* above, then *finished* when it falls back. Pointing `state_entity` at the same sensor enables it with a 10 W threshold. `power_icon` replaces `mdi:power-plug`. |
| `program_entity` / `program_format` | Program. `clean` (default) makes it readable (`LaundryCare.Washer.Program.Auto40` becomes *Auto 40*, `Rapid20Min` becomes *Rapid 20 Min*), `raw` shows it as-is. |
| `remaining_time_entity` / `remaining_time_unit` | Remaining time, in `auto` (default, from the entity's unit: s, min, h, ms, d, or `1:02:03`), `seconds`, `minutes` or `hours`, or a finish time (`timestamp`). It also draws the progress bar: the time run since the cycle began, pauses left out, over that time plus what is left. Opened mid-cycle, the card finds the start in the state history. |
| `remaining_time_hide_when_idle` | `true` only shows the remaining time while running, against stale finish times (SmartThings). |
| `remaining_time_split` | `true` puts the end time on its own line, for a narrow card. |
| `progress_entity` | 0-100 sensor replacing the estimate drawn from the remaining time. |
| `door_entity` / `door_open_state` / `door_invert` / `door_hide_in_list` | Door sensor, "open" state (default `on`), inversion, and hiding the line (the door is still drawn). |
| `alerts_entity` | Entity whose every *attribute* at on, true or active shows as an alert. |
| `connectivity_entity` / `connectivity_connected_state` | Connectivity, as a wifi icon, and the "connected" state (default `on`). |
| `info_entities` | Up to 8 lines `{ entity, icon?, label?, value_map?, hide_unit? }`, any beyond are ignored. Past 5 lines the spacing tightens. Values read as in Home Assistant, with the entity's display precision. `value_map` relabels raw values (see below), `hide_unit` drops the unit. |
| `start_entity` / `pause_entity` / `resume_entity` / `stop_entity` | Controls, only shown when configured. A control is usually a `button`, a `script` or an `automation`, which is triggered rather than switched off, and can also be a `select` or a `number`: `start_option` says which option to pick (the card takes it on its own when the list holds only one), `start_value` what to write. The same goes for the other three, as `pause_option`, `stop_value` and so on. |

Per type:

| Option | Types | Description |
|---|---|---|
| `washer_dryer` | washer | `true` for a machine that washes and then dries, as a checkbox under the appliance type. A name that says so is enough; `false` forces the plain washer back. |
| `phase_entity` / `phase_map` | dishwasher, washer-dryer | Cycle phase, see below. On a dishwasher, YAML only. |
| `target_temperature_entity` / `current_temperature_entity` | oven, cooker, rice cooker | Setpoint and actual temperature. While climbing, the bar becomes a preheat gauge. |
| `heating_entity` | oven, cooker, rice cooker, water heater | Says whether it heats when the state entity cannot. Otherwise derived from the running state. |
| `light_entity` | oven, hood, 3D printer | Light, as a small toggle in the header. A lit printer's chamber lights up too. |
| `power_level_entity` | microwave, cooktop | Power level. On a cooktop it sets how brightly the zones glow. |
| `fan_entity` | hood | Speed: a `fan`'s percentage or preset, or a `select`, `sensor` or `number` mapped onto 1 to 3. Clicking the line opens the entity to change it. |
| `boost_entity` | hood | Intensive mode, when the preset doesn't say so. |
| `filter_life_entity` / `filter_reset_entity` | hood | Filter wear as a bar, and a reset button. |
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
| `heating_entity` / `hot_water_entity` | boiler, heat pump | Central heating and hot water indicators; with both on, hot water wins. Without them the mode comes from `state_entity`: codes `-H`, `=H`, `0H` (Nefit, Bosch) or their numeric form `200`, `201`, `203`, with start-up (`0U`, `0C`, `0L` or `270`, `283`, `284`) read as *Ignition* and the burner's waits (`0A`, `0Y`, `0E` or `202`, `204`, `265`, `305`, `353`) as *Waiting*; `CH`, `HW`, `No`; those of InComfort, ebusd, myVAILLANT and MELCloud; or *central heating* and *hot water*. With the indicators off but the flame lit, it reads *Burner on*. `state_map` accepts `space_heating`, `hot_water`, `starting`, `waiting` and `idle`. With only the burner as `power_entity`, the flame lights without saying what for. |
| `state_entity` on a heat pump | heat pump | What the pump is doing: a `climate` entity's `hvac_action` (heating, cooling, defrosting, idle), MELCloud's `status` attribute (`heat_water`, `heat_zones`, `cool`, `defrost`, `standby`, `legionella`) or a sensor in words (*heating*, *hot water*, *cooling*, *defrost*, in 14 languages). The state of a `climate` or `water_heater` entity is the mode you picked, shown as-is when the entity says nothing about what the pump does. `state_map` accepts `space_heating`, `hot_water`, `cooling`, `defrost` and `idle`. The outdoor unit's fan turns while it works and stops to defrost; the tank or the radiator warms depending on the mode. |
| `outdoor_temperature_entity` / `heat_output_entity` / `cop_entity` | heat pump | Outdoor temperature, heat output and COP, in the list. Without a COP entity, the card divides the heat output by `power_entity` once both are in W or kW. |
| `return_temperature_entity` | heat pump | The water coming back. Flow and return then share one line, as *42 °C → 36 °C*, and the card works out the delta on its own like it does the COP, always with a decimal since a heat pump works on a couple of degrees. Taken as a distance, so it stays positive while the pump cools the house. |
| `water_flow_entity` | heat pump | Flow rate, in the entity's own unit. |
| `compressor_entity` | heat pump | Frequency in hertz, or an on/off contact read as *Running* and *Off*. A compressor at rest stops the fan on the drawing: the pump is only pushing water around. |
| `fan_speed_entity` | heat pump | Fan speed, in the entity's own unit. |
| `no_hot_water` | heat pump | `true` drops the hot water tank from the drawing, for an installation that heats no domestic hot water. What is left stands in the middle. |
| `underfloor_heating` | heat pump | `true` draws a heated floor instead of a radiator, which is how most air-to-water installations emit their heat: the slab seen at an angle, its four panels, and the heat rising off it while it warms. It turns blue when the pump cools the house. |
| `state_entity` on a 3D printer | 3D printer | The printer's status, as each integration sends it: `current_state` (OctoPrint), the printer's own sensor (PrusaLink), `print_status` (Bambu Lab, Creality), `current_print_state` (Moonraker, Klipper), `current_status` (Elegoo), `machine_status` (Flashforge), `job_state` (Anycubic). It reads *Printing*, *Preparing*, *Preheating*, *Paused*, *Needs attention*, *Finished*, *Cancelled*, *Failed*, *Error*, *Idle* or *Offline*. Most integrations say *printing* from the moment the start code heats up: while a heater is still more than 5 °C below its target and the part has not started, the card reads *Preheating* and the bar becomes a heating gauge. Outside a job the remaining time is hidden, since a printer keeps its last one. |
| `phase_entity` | 3D printer | What the job is busy with: Bambu Lab's `current_stage`, Elegoo's `print_status`. It reads *Preheating*, *Bed levelling*, *Changing filament*, *Cooling*, *Calibrating* or *Homing* during a job. |
| `program_entity` | 3D printer | The print file, without its folder or its slicer extension. |
| `nozzle_temperature_entity` / `nozzle_target_entity` / `bed_temperature_entity` / `bed_target_entity` / `chamber_temperature_entity` | 3D printer | Nozzle, bed and chamber, shown as *219 °C → 220 °C* until the target is reached. A target is a sensor or a `number` (Moonraker, Elegoo); without one, the card reads a `target` attribute on the reading (Creality). The nozzle temperature shows on the printer's screen, and a heater with a target glows. |
| `current_layer_entity` / `total_layers_entity` | 3D printer | The layer, as *84 / 190*. |
| `printer_layout` | 3D printer | `enclosed` (default: a chamber whose bed drops as the part grows) \| `open` (an open frame whose gantry climbs). The part grows with the progress, in the state's colour, and the head moves while it prints. |
| `printed_part` | 3D printer | The part on the bed: `cube` (default), `pyramid` or `duck` (a rubber duck). It shows from the bottom up as it prints. |
| `portions_today_entity` / `weight_today_entity` | pet feeder | What was served today, on one line. Without a weight entity the card works the grams out from `portion_weight_entity`, so nothing is assumed about the size of a meal. |
| `serving_size_entity` / `portion_weight_entity` | pet feeder | How many portions a serving holds, and what one weighs. |
| `schedule_entity` | pet feeder | The feeding plan, as the integration words it, on a line that wraps. |
| `last_feed_entity` | pet feeder | A timestamp of the last meal, when the integration gives one. Otherwise the card finds it: a `script` says when it last ran, whatever asked it to, a `button` carries the time of its last press, and the day's counter moves on every meal the feeder serves, including the ones it serves on its own schedule. |
| `level_entity` / `level_empty_below` / `level_max` | pet feeder | What is left in the tank: a percentage, which fills the hopper on the drawing, or a contact that only says *empty*. At or below `level_empty_below` (default 0) the state reads *Tank empty*, in orange, and the hopper is drawn empty, in the reading's own unit. A tank counted in grams or in litres fills the hopper once `level_max` gives its capacity. |
| `error_entity` | pet feeder | Turns the state to *Error*, and to *Tank empty* when the error names itself (`no_food`, `empty`, and the same word in the other languages). A fault code counts as an error on any value but zero. |
| `state_entity` | pet feeder | Optional: a feeder is idle nearly all the time, so a control or a counter is a complete configuration. When it does report, *on* reads as *Dispensing* and the kibble falls. |
| `speed_entity` | cooker | Blade speed, banded onto three speeds. |
| `water_entity` | coffee | Tank: a Home Connect boolean, or a level in % with *empty* below 10%. |
| `beans_entity` / `tray_entity` / `descaling_entity` | coffee | Beans empty, tray full, descaling due. |
| `cups_entity` | coffee | Number of cups: a count, a boolean or a beverage name (*2 Espressi*). |
| `strength_entity` | coffee | Coffee strength, as a number or a word. |

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

The phase only changes the illustration, and an unrecognised value is ignored.

### Pet feeders

A feeder is read rather than run: no cycle, no programme, no door. Its state is worked out from what it reports, *Tank empty*, *Error*, *Dispensing* or *Ready*, and the card carries what was served today and when the last meal was. An empty tank is the one thing a feeder cannot fix by itself, so it takes the state line and empties the hopper on the drawing. A cat turns up beside it, distinctly unimpressed, with a red warning triangle, and it turns up for a jam as well, that time with the kibble still in the tank.

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

### Washer-dryers

A washer-dryer is a washer with `washer_dryer: true`, not a type of its own: the option is a checkbox under the appliance type. Ticked, the drum shows water while the machine washes and clothes turning in hot air while it dries, and the state line reads *Washing* or *Drying* rather than *Running*. A machine whose name says it washes and dries is recognised on its own.

Where the step comes from depends on the integration:

| Integration | Where it says it | What to configure |
|---|---|---|
| LG ThinQ, Midea | the state itself (`drying`, `Dry`) | nothing |
| Miele, SmartThings, hOn (Candy, Hoover, Haier) | a phase entity (`program_phase`, `job_state`, `prPhase`) | `phase_entity` |
| Electrolux, AEG | `cyclePhase`, which reads `Dry` | `phase_entity` |
| Home Connect (Bosch, Siemens), Whirlpool | nowhere: the operation state stays *Run* all the way through | `state_map`, or nothing |

Rinsing and spinning count as washing, since the drum still has water in it. A step the card cannot read leaves the drawing as it is, so a cycle ending on an anti-crease or a cool-down keeps its clothes instead of filling with water again. Vendor codes are translated by `phase_map`, and `state_map` accepts `washing` and `drying` as targets:

```yaml
appliance_type: washer
washer_dryer: true
state_entity: sensor.washer_dryer_machine_state
phase_entity: sensor.washer_dryer_program_phase
phase_map:
  4: drying
```

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
