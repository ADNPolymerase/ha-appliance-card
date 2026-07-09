# HA Appliance Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-appliance-card?sort=semver)](https://github.com/ADNPolymerase/ha-appliance-card/releases)
[![HACS Action](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg)](https://www.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ADNPolymerase/ha-appliance-card/blob/main/LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/adnpolymerase)

<a href="https://buymeacoffee.com/adnpolymerase" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60"></a>
<a href="https://adnpolymerase.github.io/HA/" target="_blank"><img src="https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg" alt="Link to my github.io for my other projects" height="60"></a>

A Lovelace card for washers, dryers and dishwashers — cycle in progress, program, remaining time, door status, alerts and controls.

No brand assumed: every field is a configurable entity mapping, so it works with **any** integration (Electrolux, Samsung, LG, Home Connect, Miele, a smart plug + template sensors…).

> Status: early preview. Feedback and issues welcome.
> 🇫🇷 [Lire en français](README.fr.md)

![HA Appliance Card screenshot](https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/screenshot.png)

## Features

- **State normalization**: `Idle`, `RUNNING`, `wash`, `En marche`… are auto-detected (accent-insensitive, 12 languages) and mapped to idle / running / paused / done / delayed / error. `state_map` covers anything else; unmatched states are shown as-is.
- **Animated illustration** (washer water, dryer tumbling, dishwasher spray arm) — static when idle, auto-detected or set via `appliance_type`. The door is shown ajar on the illustration while open. `compact: true` keeps only the text.
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
| `appliance_type` | `auto` (default) \| `washer` \| `dryer` \| `dishwasher`. |
| `program_entity` / `program_format` | Program/cycle entity. `clean` (default) trims common `"<category> Pr <name>"` patterns; `raw` shows the state as-is. |
| `remaining_time_entity` / `remaining_time_unit` | Remaining duration. Unit `auto` (default), `seconds`, or `minutes`. |
| `progress_entity` | Optional 0–100 sensor; overrides the client-side estimate. |
| `door_entity` / `door_open_state` / `door_invert` | Door sensor, the state meaning "open" (default `on`), and an invert toggle. |
| `alerts_entity` | Entity whose *attributes* are on/off flags; any "on/true/active" attribute is shown as an active alert. |
| `connectivity_entity` / `connectivity_connected_state` | Connectivity sensor and the state meaning "connected" (default `on`). |
| `info_entities` | Up to 5 `{ entity, icon?, label? }` extra info lines (temperature, spin speed…). |
| `start_entity` / `pause_entity` / `resume_entity` / `stop_entity` | Button/switch/script entities wired to the corresponding control. Only configured ones are shown. |

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

## License

MIT — see [LICENSE](LICENSE).
