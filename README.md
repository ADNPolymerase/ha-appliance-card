# HA Appliance Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-appliance-card?sort=semver)](https://github.com/ADNPolymerase/ha-appliance-card/releases)
[![HACS Action](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg)](https://www.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ADNPolymerase/ha-appliance-card/blob/main/LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/adnpolymerase)

<a href="https://buymeacoffee.com/adnpolymerase" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60"></a>
<a href="https://adnpolymerase.github.io/HA/" target="_blank"><img src="https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg" alt="Link to my github.io for my other projects" height="60"></a>

A Home Assistant Lovelace card for washers, dryers and dishwashers — cycle in progress, program, remaining time, door status, alerts and controls.

Unlike brand-specific cards, this one doesn't assume any particular integration. Every field is a configurable entity mapping, so it works with **any** washer/dryer/dishwasher integration (Electrolux, Samsung, LG, Bosch/Siemens Home Connect, Miele, a generic smart plug + template sensors, etc.) as long as you point it at the right entities.

Multilingual UI (English, French, German, Spanish, Italian, Dutch, Portuguese, Swedish, Norwegian, Danish, Polish, Russian — auto-detected from Home Assistant).

> Status: early preview. Feedback and issues welcome.

> 🇫🇷 [Lire en français](README.fr.md)

![HA Appliance Card screenshot](https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/screenshot.png)

## Features

- Works across brands/integrations: no hardcoded entity IDs, everything is mapped in the card config.
- State normalization: maps whatever raw string your integration reports (`Idle`, `Running`, `RUNNING`, `wash`, `Éteint`, `En marche`, ...) to a common idle / running / paused / done / delayed / error vocabulary, with automatic accent-insensitive keyword-based fallback and an optional explicit `state_map` override. Handy for plain power-threshold template sensors, not just real appliance integrations. If a raw state doesn't match anything, it's shown as-is instead of a generic "Unknown" label.
- Illustrated appliance icon (front-loading washer with animated water, tumbling clothes for dryers, spinning spray arm for dishwashers) — static when idle, animated only while running. Auto-detected from the entity/icon, or set explicitly via `appliance_type`.
- Progress bar: uses a direct percentage sensor if your integration exposes one, otherwise estimates it client-side from the remaining-time sensor.
- Program name, extra info lines (temperature, spin speed, steam level, ...), door state and alerts — each optional and independently configurable. Info line labels automatically drop a repeated device-name prefix (e.g. an entity named "Lave-linge Pods" shows as just "Pods").
- The door is shown ajar on the illustration itself while open, in addition to a text line; connectivity is shown as a small wifi/wifi-off icon in the top-right corner instead of a text line.
- Start / pause / resume / stop controls (only shown for the buttons/entities you configure).
- Compact mode to hide the illustration and keep only the text.
- Visual editor: pick the state entity and most other fields are auto-suggested from sibling entities on the same device — override any of them with the entity picker.

## Installation (HACS)

This card is not yet in the default HACS store. Add it as a custom repository:

1. HACS → the "⋮" menu (top right) → **Custom repositories**.
2. Repository: `https://github.com/ADNPolymerase/ha-appliance-card`, category: **Dashboard** (Lovelace plugin).
3. Install **HA Appliance Card**, then reload/clear cache if the resource doesn't pick up automatically.
4. Add a card of type `custom:ha-appliance-card` to a dashboard, either via YAML or the visual editor.

## Configuration

Only `state_entity` is required — everything else is optional. In the visual editor, setting the state entity auto-fills the other fields when a matching sibling entity is found on the same device; each field can still be changed or cleared.

| Option | Description |
|---|---|
| `state_entity` | **Required.** Entity reporting the appliance's overall state (any domain). |
| `state_map` | Optional map of raw state string → `idle`\|`running`\|`paused`\|`done`\|`delayed`\|`error`, for integrations whose wording isn't auto-detected. |
| `state_show_raw` | `true` to always display the entity's raw state text instead of the translated category label (color/animation still follow the detected category). Off by default; handy for a plain power-threshold template sensor where you'd rather see your own wording than a generic "Idle"/"Running". |
| `name` | Card title. Defaults to the state entity's friendly name. |
| `compact` | `true` to hide the illustration and show only text. |
| `appliance_type` | `auto` (default) \| `washer` \| `dryer` \| `dishwasher`. |
| `program_entity` / `program_format` | Entity holding the selected program/cycle. `program_format: clean` (default) trims common `"<category> Pr <name>"` patterns; `raw` shows the state as-is. |
| `remaining_time_entity` / `remaining_time_unit` | Entity with the remaining duration. Unit `auto` (default, read from the entity), `seconds`, or `minutes`. |
| `progress_entity` | Optional 0–100 sensor; overrides the client-side progress estimate. |
| `door_entity` / `door_open_state` / `door_invert` | Door sensor, the state value meaning "open" (default `on`), and an `invert` toggle for sensors where that state actually means closed. |
| `alerts_entity` | An entity whose *attributes* are individually on/off flags (e.g. `door: OFF`, `water_leak: ON`); any attribute matching an "on/true/active" value is shown as an active alert. |
| `connectivity_entity` / `connectivity_connected_state` | Connectivity sensor and the state value meaning "connected" (default `on`); shown as a top-right wifi icon. |
| `info_entities` | Up to 5 `{ entity, icon?, label? }` entries shown as extra info lines (temperature, spin speed, ...). The visual editor lets you pick how many (0–5) and override the displayed name for each. |
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
