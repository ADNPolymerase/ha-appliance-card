# HA Appliance Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-appliance-card?sort=semver)](https://github.com/ADNPolymerase/ha-appliance-card/releases)
[![HACS Action](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg)](https://www.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ADNPolymerase/ha-appliance-card/blob/main/LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/adnpolymerase)

<a href="https://buymeacoffee.com/adnpolymerase" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60"></a>
<a href="https://adnpolymerase.github.io/HA/" target="_blank"><img src="https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg" alt="Link to my github.io for my other projects" height="60"></a>

A Lovelace card for kitchen and laundry appliances — washers, dryers, dishwashers, ovens, microwaves, cooker hoods and cooktops. Cycle in progress, program, remaining time, temperature, fan speed, cooking zones, door status, alerts and controls.

No brand assumed: every field is a configurable entity mapping, so it works with **any** integration (Electrolux, Samsung, LG, Home Connect, Miele, a smart plug + template sensors…).

> Feedback and issues welcome.
> 🇫🇷 [Lire en français](README.fr.md)

![HA Appliance Card screenshot](https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/screenshot.png)

## Features

- **State normalization**: `Idle`, `RUNNING`, `wash`, `En marche`… are auto-detected (accent-insensitive, 12 languages) and mapped to idle / running / paused / done / delayed / error. `state_map` covers anything else; unmatched states are shown as-is.
- **Seven appliance types**, each with its own animated illustration: washer (water), dryer (tumbling), dishwasher (spray arm), oven (glowing elements, door dropping open), microwave (turntable, lit cavity), cooker hood (rising airflow, light beams) and cooktop (per-zone level and residual heat). Static when idle, auto-detected or set via `appliance_type`. `compact: true` keeps only the text.
- **Works from a smart plug alone**: set `power_entity` + `power_on_threshold` and the state is derived from consumption — standby → running → finished — with no appliance integration at all.
- **Progress bar** from a direct percentage sensor, or estimated client-side from the remaining time.
- **Program, info lines** (temperature, spin speed…), **door, alerts, connectivity** (top-right wifi icon) — each optional and independent.
- **Start / pause / resume / stop** controls, only shown for the entities you configure.
- **Visual editor**: pick the state entity and the other fields are auto-suggested from sibling entities on the same device.

## Installation (HACS)

Not yet in the default HACS store — add it as a custom repository:

1. HACS → "⋮" menu → **Custom repositories**.
2. Repository: `https://github.com/ADNPolymerase/ha-appliance-card`, category: **Dashboard**.
3. Install **HA Appliance Card**, then add a `custom:ha-appliance-card` card (YAML or visual editor).

## Configuration

Only `state_entity` is required — everything else is optional. In the visual editor, setting the state entity auto-fills the other fields when a matching sibling entity is found on the same device; each field can still be changed or cleared.

| Option | Description |
|---|---|
| `state_entity` | **Required.** Entity reporting the appliance's overall state (any domain). |
| `state_map` | Optional map: raw state → `idle`\|`running`\|`paused`\|`done`\|`delayed`\|`error`. |
| `state_show_raw` | `true` to display the raw state text instead of the translated label (color/animation still follow the detected category). |
| `name` | Card title. Defaults to the state entity's friendly name. |
| `compact` | `true` to hide the illustration and show only text. |
| `appliance_type` | `auto` (default) \| `washer` \| `dryer` \| `dishwasher` \| `oven` \| `microwave` \| `hood` \| `cooktop`. The visual editor only offers the fields the chosen type can use. |
| `toggle_entity` | On/off control, shown as a power button on the card and highlighted while on. Any `switch`/`button`/`script`/`input_boolean`/`fan`. Named this way so it is not mistaken for `power_entity` below, which is the wattage meter. |
| `power_entity` / `power_on_threshold` / `power_icon` | Power sensor (W). With a threshold set, the state is derived from it instead of `state_entity`: above the threshold is *running*, and falling back below it is *finished* until the next run. Pointing `state_entity` at the same power sensor enables this on its own, with a default threshold of 10 W. `power_icon` overrides the default `mdi:power-plug`. |
| `program_entity` / `program_format` | Program/cycle entity. `clean` (default) trims common `"<category> Pr <name>"` patterns; `raw` shows the state as-is. |
| `remaining_time_entity` / `remaining_time_unit` | Remaining duration. Unit `auto` (default), `seconds`, or `minutes`. |
| `remaining_time_hide_when_idle` | `true` to only show remaining time while the appliance is running. Prevents stale completion timestamps (e.g. Samsung SmartThings keeping a past finish time after the cycle ends) from displaying. |
| `progress_entity` | Optional 0–100 sensor; overrides the client-side estimate. |
| `door_entity` / `door_open_state` / `door_invert` / `door_hide_in_list` | Door sensor, the state meaning "open" (default `on`), an invert toggle, and an option to keep the door out of the info list (it still shows on the illustration). |
| `alerts_entity` | Entity whose *attributes* are on/off flags; any "on/true/active" attribute is shown as an active alert. |
| `connectivity_entity` / `connectivity_connected_state` | Connectivity sensor and the state meaning "connected" (default `on`). |
| `info_entities` | Up to 5 `{ entity, icon?, label?, value_map? }` extra info lines (temperature, spin speed…). Entities with a `timestamp`/`date` device class are formatted in the local timezone using the Home Assistant language, like HA itself shows them. `value_map` relabels raw values, for integrations reporting a phase as a bare code or an untranslated token (see below). |
| `start_entity` / `pause_entity` / `resume_entity` / `stop_entity` | Button/switch/script entities wired to the corresponding control. Only configured ones are shown. |

Per type:

| Option | Types | Description |
|---|---|---|
| `target_temperature_entity` / `current_temperature_entity` | oven | Setpoint and actual temperature. While climbing, the bar becomes a preheat gauge and the state reads *Preheating*. |
| `heating_entity` | oven | Optional; drives the glowing elements. Falls back to the running state. |
| `light_entity` | oven, hood | Cavity light / hood lamps. Shown as a small toggle in the card header rather than a full button row, to keep the card short. |
| `power_level_entity` | microwave, cooktop | Power level (e.g. 800 W). On a cooktop it is the *global* level reported by hobs that never say which zone is heating; it sets how brightly the zones glow. |
| `fan_entity` | hood | The speed source. The line stays visible while the hood is off (shown as *Off*) — clicking it is how the speed gets changed.  A `fan` entity uses its percentage or preset; a `select` (Home Connect exposes the venting level that way), `sensor` or `number` is mapped onto a 1–3 scale, using the option list when there is one. Click the speed line to open the entity and change it — unless the integration has dropped it to unavailable, in which case the line stays visible but is no longer clickable. |
| `boost_entity` | hood | Optional intensive mode, when the preset doesn't already say so. |
| `filter_life_entity` / `filter_reset_entity` | hood | Grease filter wear (%) as a bar, and a reset button. |
| `zones` | cooktop | List of `{ level_entity, residual_heat_entity?, name? }`, up to 6. Levels can be numeric (0–9) or a word (`boost`); zones off but still hot show `H`. |
| `zones_layout` | cooktop | `2x1` \| `2x2` \| `3x2`. Derived from the number of zones by default. |
| `zones_count` | cooktop | How many zones to draw when no per-zone entity exists (default 4). |
| `child_lock_entity` | cooktop | Shows a padlock on the illustration. |

### Example

```yaml
type: custom:ha-appliance-card
state_entity: sensor.lave_linge_appliance_state
program_entity: select.lave_linge_program_uid
remaining_time_entity: sensor.lave_linge_time_to_end
door_entity: binary_sensor.lave_linge_door_state
alerts_entity: sensor.lave_linge_alerts
info_entities:
  - entity: select.lave_linge_temperature
    icon: mdi:thermometer
  - entity: select.lave_linge_spin_speed
    icon: mdi:rotate-3d-variant
pause_entity: button.lave_linge_execute_command_pause
stop_entity: button.lave_linge_execute_command_stopreset
```

### Oven, hood and cooktop examples

```yaml
type: custom:ha-appliance-card
appliance_type: oven
state_entity: sensor.oven_state
target_temperature_entity: number.oven_setpoint
current_temperature_entity: sensor.oven_temperature
door_entity: binary_sensor.oven_door
light_entity: light.oven_light
remaining_time_entity: sensor.oven_time_to_end
```

```yaml
type: custom:ha-appliance-card
appliance_type: hood
state_entity: fan.hood
fan_entity: fan.hood
light_entity: light.hood
filter_life_entity: sensor.hood_grease_filter
```

```yaml
type: custom:ha-appliance-card
appliance_type: cooktop
state_entity: sensor.cooktop_state
child_lock_entity: binary_sensor.cooktop_child_lock
zones:
  - level_entity: sensor.cooktop_zone_1_level
    residual_heat_entity: binary_sensor.cooktop_zone_1_hot
    name: Front left
  - level_entity: sensor.cooktop_zone_2_level
  - level_entity: sensor.cooktop_zone_3_level
  - level_entity: sensor.cooktop_zone_4_level
```

With nothing but a smart plug:

```yaml
type: custom:ha-appliance-card
appliance_type: oven
name: Oven
state_entity: sensor.oven_plug_power
power_entity: sensor.oven_plug_power
power_on_threshold: 10
```

### Relabeling raw values (`value_map`)

Some integrations report the cycle phase as a bare number or an untranslated
token. `value_map` turns those into readable text, per info entity:

```yaml
info_entities:
  - entity: sensor.washing_machine_program_phase
    icon: mdi:washing-machine
    label: Phase
    value_map:
      0: Ready
      1: Washing
      2: Rinsing
      3: Spinning
      18: Finished
```

Keys are matched against the raw state exactly first, then case-insensitively
(so `washing` also matches a state of `Washing`). Unmapped values are shown
as-is, and a mapped label replaces the value entirely (no unit is appended).

In the visual editor the same thing is edited as one `code: label` per line,
under each info entity. `=` also works as the separator, blank lines and lines
starting with `#` are ignored, and only the first `:` or `=` splits the line so
a label may itself contain one.

## License

MIT — see [LICENSE](LICENSE).
