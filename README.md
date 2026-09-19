# HA Appliance Card

[![hacs_badge](https://img.shields.io/badge/HACS-Default-41BDF5.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-appliance-card?sort=semver)](https://github.com/ADNPolymerase/ha-appliance-card/releases)
[![HACS Action](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg)](https://www.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ADNPolymerase/ha-appliance-card/blob/main/LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/adnpolymerase)

<a href="https://buymeacoffee.com/adnpolymerase" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60"></a>
<a href="https://adnpolymerase.github.io/HA/" target="_blank"><img src="https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg" alt="Link to my github.io for my other projects" height="60"></a>

A Lovelace card for household appliances: washers, dryers, dishwashers, ovens, microwaves, cooker hoods, cooktops, fridges, kettles, cookers, coffee machines, rice cookers, water heaters and boilers. Cycle in progress, program, remaining time, temperature, alerts and controls.

No brand assumed: every field is an entity you pick, so it works with **any** integration (Electrolux, Samsung, LG, Home Connect, Miele, a plain smart plug…).

> Feedback and issues welcome.
> 🇫🇷 [Lire en français](README.fr.md)

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/screenshot.png" alt="HA Appliance Card screenshot" width="640">

## Features

- **Fourteen appliance types**, each with a CSS illustration that animates on the appliance's own data and stays still when idle. The type is detected on its own or set via `appliance_type`, and `compact: true` keeps only the text.
- **State normalization**: `Idle`, `RUNNING`, `wash`, `En marche`… are recognised (accent-insensitive) and sorted into idle, preheating, running, paused, done, delayed or error. An unknown state is shown as it came, minus the integration's namespace, and `state_map` sorts the rest.
- **Each appliance says what matters for it**: a coffee machine what it is missing (water, beans, tray, descaling), a fridge its health (unplugged, door open, temperature high), a combi boiler what it is heating (central heating, hot water or standby).
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
| `state_map` | Map raw state → `idle` \| `running` \| `preheating` \| `keep_warm` \| `paused` \| `done` \| `delayed` \| `error`. Sets the label, the colour and the animation. Also in the visual editor. |
| `state_show_raw` | `true` shows the raw text instead of the translated label. |
| `name` | Card title. Defaults to the state entity's name. |
| `compact` | `true` hides the illustration. |
| `illustration_color` | `auto` (default, follows the theme) \| `white` \| `grey` \| `black`. Only changes the casing, not the state colours. |
| `language` | `auto` (default, follows Home Assistant) or one of the 14 codes: `en`, `fr`, `de`, `es`, `it`, `nl`, `pt`, `sv`, `no`, `da`, `pl`, `ru`, `zh`, `cs`. `nb` and `nb-NO` give Norwegian. |
| `appliance_type` | `auto` (default) \| `washer` \| `dryer` \| `dishwasher` \| `oven` \| `microwave` \| `hood` \| `cooktop` \| `fridge` \| `kettle` \| `cooker` \| `coffee` \| `rice_cooker` \| `water_heater` \| `boiler`. |
| `toggle_entity` | Power button (`switch`, `button`, `script`, `input_boolean`, `fan`), highlighted while on. |
| `power_entity` / `power_on_threshold` / `power_icon` | Power sensor. With a threshold, the state is derived from it: *running* above, then *finished* when it falls back. Pointing `state_entity` at the same sensor enables it with a 10 W threshold. `power_icon` replaces `mdi:power-plug`. |
| `program_entity` / `program_format` | Program. `clean` (default) makes it readable (`LaundryCare.Washer.Program.Auto40` becomes *Auto 40*, `Rapid20Min` becomes *Rapid 20 Min*), `raw` shows it as-is. |
| `remaining_time_entity` / `remaining_time_unit` | Remaining time, in `auto` (default), `seconds` or `minutes`. |
| `remaining_time_hide_when_idle` | `true` only shows the remaining time while running, against stale finish times (SmartThings). |
| `remaining_time_split` | `true` puts the end time on its own line, for a narrow card. |
| `progress_entity` | 0-100 sensor replacing the estimate drawn from the remaining time. |
| `door_entity` / `door_open_state` / `door_invert` / `door_hide_in_list` | Door sensor, "open" state (default `on`), inversion, and hiding the line (the door is still drawn). |
| `alerts_entity` | Entity whose every *attribute* at on, true or active shows as an alert. |
| `connectivity_entity` / `connectivity_connected_state` | Connectivity, as a wifi icon, and the "connected" state (default `on`). |
| `info_entities` | Up to 8 lines `{ entity, icon?, label?, value_map?, hide_unit? }`, any beyond are ignored. Past 5 lines the spacing tightens. Values read as in Home Assistant, with the entity's display precision. `value_map` relabels raw values (see below), `hide_unit` drops the unit. |
| `start_entity` / `pause_entity` / `resume_entity` / `stop_entity` | Controls, only shown when configured. |

Per type:

| Option | Types | Description |
|---|---|---|
| `phase_entity` / `phase_map` | dishwasher | Cycle phase, see below. YAML only. |
| `target_temperature_entity` / `current_temperature_entity` | oven, cooker, rice cooker | Setpoint and actual temperature. While climbing, the bar becomes a preheat gauge. |
| `heating_entity` | oven, cooker, rice cooker, water heater | Says whether it heats when the state entity cannot. Otherwise derived from the running state. |
| `light_entity` | oven, hood | Light, as a small toggle in the header. |
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
| `temperature_decimals` | fridge, kettle, water heater, boiler | `0` (default, whole degree), `1` (one decimal) or `auto` (the entity's display precision), on the appliance's screen and in the list. |
| `temperature_entity` | kettle, water heater, boiler | Water temperature (flow temperature on a boiler), shown on the appliance and in the list. A `water_heater` entity provides its own. On a water heater the hot water fills the tank from 15 to 65 °C. |
| `state_entity` as `water_heater` | water heater | Its state is the mode (*Eco*, *Performance*…), shown as Home Assistant translates it. Heating then comes from `heating_entity`, a smart plug or MELCloud's `status` attribute. |
| `heating_entity` / `hot_water_entity` | boiler | Central heating and hot water indicators; with both on, hot water wins. Without them the mode comes from `state_entity`: codes `-H`, `=H`, `0H` (Nefit, Bosch) or their numeric form `200`, `201`, `203`, with start-up (`0U`, `0C`, `0L` or `270`, `283`, `284`) read as *Ignition* and the burner's waits (`0A`, `0Y`, `0E` or `202`, `204`, `265`, `305`, `353`) as *Waiting*; `CH`, `HW`, `No`; those of InComfort, ebusd, myVAILLANT and MELCloud; or *central heating* and *hot water*. With the indicators off but the flame lit, it reads *Burner on*. `state_map` accepts `space_heating`, `hot_water`, `starting`, `waiting` and `idle`. With only the burner as `power_entity`, the flame lights without saying what for. |
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

## Thanks

- [@chike-he](https://github.com/chike-he): Chinese translation ([#3](https://github.com/ADNPolymerase/ha-appliance-card/issues/3))
- [@pbarone](https://github.com/pbarone): `device_class: timestamp` support for the remaining time ([#2](https://github.com/ADNPolymerase/ha-appliance-card/pull/2))
- [@monsivar](https://github.com/monsivar): Norwegian Bokmal locale aliases ([#10](https://github.com/ADNPolymerase/ha-appliance-card/pull/10)) and the dedicated dishwasher illustration ([#11](https://github.com/ADNPolymerase/ha-appliance-card/pull/11))

## License

MIT. See [LICENSE](LICENSE).
