# HA Appliance Card

<a href="https://github.com/ADNPolymerase/ha-appliance-card/blob/main/README.fr.md"><img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/lang-fr.svg" alt="Lire en français" height="60"></a>

[![hacs_badge](https://img.shields.io/badge/HACS-Default-41BDF5.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-appliance-card?sort=semver)](https://github.com/ADNPolymerase/ha-appliance-card/releases)
[![HACS Action](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg)](https://www.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ADNPolymerase/ha-appliance-card/blob/main/LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/adnpolymerase)

<a href="https://buymeacoffee.com/adnpolymerase" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60"></a>
<a href="https://adnpolymerase.github.io/HA/" target="_blank"><img src="https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg" alt="Link to my github.io for my other projects" height="60"></a>

A Lovelace card that draws the appliances of your home and animates them from their real state: household appliances, heating, robots, pool, energy, network, lamps, cameras and many more.

**[Try the live demo](https://adnpolymerase.github.io/ha-appliance-card/docs/demo.html?view=live)**: every appliance animated in your browser, light or dark, no Home Assistant needed.

> Feedback and issues welcome.

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/screenshot.png" alt="HA Appliance Card screenshot" width="100%">

## Features

- **66 appliance types, more than 170 models drawn**, animated while they work and still when they stop. The type is detected on its own, from the entity and from the maker and model of its device, or set with `appliance_type`.
- **Any integration**: every field is an entity you pick. A plain smart plug is enough, its power tells whether the appliance heats, washes or spins.
- **State understood**: `Idle`, `RUNNING`, `wash`… become idle, running, paused, finished, delayed or error, with the step of the cycle (wash, rinse, spin…).
- **What matters for each appliance**: program, time left, door, alerts, levels, temperatures, energy and cost, today's running time.
- **Controls** (start, pause, stop, switch on) with protection against stray taps.
- **Full or compact**, in Home Assistant's light or dark theme.
- **15 languages** and a visual editor that pre-fills the fields from the device.

## Related projects

Some requests are better served by one of my other cards:

| You want | Card |
|---|---|
| A gate, a garage door or a front door with a smart lock | [HA Gate Card](https://github.com/ADNPolymerase/ha-gate-card) |
| A presence sensor (mmWave radar, PIR) | [Presence Sensor Card](https://github.com/ADNPolymerase/ha-presence-sensor-card) |
| A paper printer: ink or toner, trays, status message | [HA Printer Card](https://github.com/ADNPolymerase/ha-printer-card) |
| The level of a dosing tank (chlorine, pH-, pH+, flocculant) | [Dosing Tank Card](https://github.com/ADNPolymerase/ha-dosing-tank-card) |

## Gallery

Click a family to see its appliances at work.

<details>
<summary><b>Laundry and dishes</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-laundry.gif" alt="Laundry and dishes">

</details>

<details>
<summary><b>Kitchen</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-kitchen.gif" alt="Kitchen">

</details>

<details>
<summary><b>Pellet grills and smokers</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-grills.gif" alt="Pellet grills and smokers">

</details>

<details>
<summary><b>Heating and climate</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-climate.gif" alt="Heating and climate">

</details>

<details>
<summary><b>Thermostats and radiator valves</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-thermostats.gif" alt="Thermostats and radiator valves">

</details>

<details>
<summary><b>Air purifiers and fans</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-air.gif" alt="Air purifiers and fans">

</details>

<details>
<summary><b>Pets</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-pets.gif" alt="Pets">

</details>

<details>
<summary><b>Litter boxes</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-litter.gif" alt="Litter boxes">

</details>

<details>
<summary><b>Garage and workshop</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-garage.gif" alt="Garage and workshop">

</details>

<details>
<summary><b>Electric rides</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-mobility.gif" alt="Electric rides: scooters, e-bike, gyropode and motorcycle">

</details>

<details>
<summary><b>Network and servers</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-network.gif" alt="Network and servers">

</details>

<details>
<summary><b>Robots and vacuums: robots, mowers, stick vacuums and floor washers</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-robots.gif" alt="Robots and vacuums: robots, mowers, stick vacuums and floor washers">

</details>

<details>
<summary><b>Pool pumps</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-pool.gif" alt="Pool pumps">

</details>

<details>
<summary><b>Garden watering</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-watering.gif" alt="Garden watering">

</details>

<details>
<summary><b>Energy: solar panels and home batteries</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-energy.gif" alt="Energy: solar panels and home batteries">

</details>

<details>
<summary><b>Bathroom scales</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-scales.gif" alt="Bathroom scales">

</details>

<details>
<summary><b>UPSes</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-ups.gif" alt="UPSes">

</details>

<details>
<summary><b>Diffusers and ventilation</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-diffusers.gif" alt="Diffusers and ventilation">

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-ventilation.gif" alt="VMC">

</details>

<details>
<summary><b>Cameras</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-cameras.gif" alt="Cameras">

</details>

<details>
<summary><b>Lamps</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-lamps.gif" alt="Lamps">

</details>

<details>
<summary><b>Mailboxes and doorbells</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-mailboxes.gif" alt="Mailboxes and doorbells">

</details>

<details>
<summary><b>Smoke, CO and leak detectors</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-detectors.gif" alt="Smoke, CO and leak detectors">

</details>

<details>
<summary><b>Speakers</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-speakers.gif" alt="Speakers">

</details>

<details>
<summary><b>Game consoles</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-consoles.gif" alt="Game consoles">

</details>

<details>
<summary><b>Streaming boxes</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-streamers.gif" alt="Streaming boxes">

</details>

<details>
<summary><b>Temperature and humidity sensors</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-climate_sensors.png" alt="Temperature and humidity sensors">

</details>

<details>
<summary><b>Buffer tanks, circulators, solar thermal and wood stoves</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-heat_storage.gif" alt="Buffer tanks, circulators, solar thermal and wood stoves">

</details>

## Installation

### HACS

1. In HACS, search for **HA Appliance Card** and install it.
2. Add a `custom:ha-appliance-card` card to your dashboard.

### Manually

1. Download every file of the [latest release](https://github.com/ADNPolymerase/ha-appliance-card/releases/latest) (`ha-appliance-card.js`, its editor, its drawings and its language files) and drop them together in `config/www/`. Without the language files the card speaks English, and without a drawing's file the card shows no drawing.
2. Add the resource `/local/ha-appliance-card.js`, type **JavaScript module**, under **Settings > Dashboards > Resources**.
3. Add a `custom:ha-appliance-card` card. A manual install has to be repeated at every release.

## Configuration

Only `state_entity` is required, except on a fridge where a probe or a door contact is enough, and on an EV charger where its plug or its power meter is enough. In the visual editor, picking the state entity pre-fills the other fields.

<details>
<summary><b>Common options</b></summary>

| Option | Description |
|---|---|
| `state_entity` | **Required**, except on a fridge or an EV charger. Entity carrying the appliance's state, any domain. |
| `state_map` | Map raw state → `idle` \| `running` \| `preheating` \| `keep_warm` \| `paused` \| `done` \| `delayed` \| `error`. Sets the label, the colour and the animation. The key `"*"` catches every state left over (see below), and on a washer, a dryer or a dishwasher the steps (`washing`, `spinning`...) are targets too. Also in the visual editor. |
| `state_show_raw` | `true` shows the entity's own text instead of the card's label, as Home Assistant displays it (a climate reads `Cooling`, not `cool`). |
| `controls_activation` | How the control buttons answer a finger: `tap` (default) runs them at once, `confirm` asks for a second tap within 3 seconds (the button turns red in between), `hold` runs them only after a long press, `off` never runs them from the card (a long press opens the entity). In YAML, write it in quotes, `controls_activation: "off"`: a bare `off` is read as `false` (the card still takes it as `off`). Handy against stray taps and small fingers. On a phone, the Companion app vibrates when a control acts. |
| `controls_always` | On a machine that runs a cycle, each button only shows when it can act: start at rest, pause while running, resume in a pause, stop during a cycle or a delayed start, the power switch outside a cycle, and with the power switch off only the power switch. `true` shows every button all the time. |
| `show_unavailable_controls` | A button whose entity is missing or unavailable is left out. `true` shows it anyway. |
| `name` | Card title. Defaults to the name of the state entity's device ("Eaton3S550" rather than "Eaton3S550 Status code"), or to the entity's own name when it has no device; without one (a fridge, a pet feeder or an EV charger read from their other entities), the type's name. |
| `compact` | `true` hides the illustration. `side` draws it small (72 px) on the left, with the name and the state beside it, and the lines under them the width of the card. In both, the buttons and the corner switches move up onto the name's line, so the card has no row of buttons of its own. |
| `compact_lines` / `compact_lines_open` | With `compact: side`, where the information lines go: `below` (default, under the row the width of the card), `beside` (beside the drawing under the name, on two columns, the label shown on hover) or `toggle` (hidden, a chevron beside the name shows them beside the drawing and hides them again). The chevron's choice is kept by each browser for that card; `compact_lines_open: true` starts it open. |
| `illustration_size` | The drawing's size, from `0.3` to `1.6` times its own (default `1`), in every mode. The text keeps its size. A slider in the editor. |
| `font_scale` | The text's size, from `0.7` to `1.4` times its own (default `1`). The drawing keeps its size. A slider in the editor. |
| `show_name` / `show_state` | `false` hides the name, or the state line. Both shown by default. |
| `transparent` | `true` removes the card's background, border and shadow, for a card laid on a wall tablet's background. |
| `fill_height` | `true` makes the card take the full height of its slot, with the buttons at the bottom: two cards side by side then have the same height. Off by default, since next to a much taller card it would stretch to that card's height. |
| `illustration_frame` | `true` sets every drawing at the bottom of a frame of the full drawing height: two cards side by side whose drawings differ in height, such as a robot with its station next to one on a plain base, then have their floors level. Off by default. |
| `done_alert` | `true` makes a green badge pulse on the drawing when a cycle has finished, until the door opens or the badge is tapped. For appliances with a cycle (washer, dryer, dishwasher, oven…). |
| `illustration_color` | `auto` (default, follows the theme) \| `white` \| `grey` \| `black` \| `red` (dark red). Only changes the casing, not the state colours. |
| `language` | `auto` (default, follows Home Assistant) or one of the 15 codes: `en`, `fr`, `de`, `es`, `it`, `nl`, `pt`, `sv`, `no`, `da`, `pl`, `ru`, `zh`, `cs`, `hu`. `nb` and `nb-NO` give Norwegian. |
| `appliance_type` | `auto` (default) \| `washer` \| `dryer` \| `dishwasher` \| `oven` \| `microwave` \| `hood` \| `cooktop` \| `fridge` \| `kettle` \| `cooker` \| `coffee` \| `rice_cooker` \| `air_fryer` \| `pellet_grill` \| `water_heater` \| `boiler` \| `thermostat` \| `heat_pump` \| `printer_3d` \| `filament_dryer` \| `pet_feeder` \| `pet_fountain` \| `iron` \| `toaster` \| `pellet_stove` \| `air_conditioner` \| `dehumidifier` \| `humidifier` \| `space_heater` \| `towel_warmer` \| `air_purifier` \| `fan` \| `ev_charger` \| `hair_dryer` \| `screen` \| `network` \| `robot` \| `pool_pump` \| `scale` \| `ups` \| `solar` \| `home_battery` \| `camera` \| `diffuser` \| `hrv` \| `lamp` \| `mailbox` \| `water_pump` \| `floor_heating` \| `spa` \| `sauna` \| `aquarium` \| `meter` \| `christmas_tree` \| `mobility` \| `irrigation` \| `litter_box` \| `detector` \| `speaker` \| `console` \| `streamer` \| `climate_sensor` \| `storage_tank` \| `fresh_water_station` \| `solar_thermal` \| `wood_stove`. |
| `tap_action` | What a tap on the card does, in Home Assistant's own words: `more-info` (default: the state entity, or on a card without one what it reads in its place), `none`, `navigate`, `url`, `toggle`, `perform-action` or `fire-dom-event`, which is what the popup cards built on browser_mod listen for. In YAML only. |
| `illustration_tap_action` | A tap on the drawing alone, the rest of the card keeping `tap_action`: `toggle` (a lamp lit by touching it), `more-info`, `none`, or any of Home Assistant's actions. Left out, the drawing does what the card does. With `toggle`, the drawing answers like the buttons, as `controls_activation` says: a tap, two taps or a long press. |
| `show_toggle` | `false` takes away a lamp's on/off button, for a card switched by touching its drawing (`illustration_tap_action: toggle`). |
| `toggle_entity` | Power button (`switch`, `button`, `script`, `input_boolean`, `fan`), highlighted while on. On every type, the fridge included, where it is the only button; pair it with `controls_activation: confirm` for an appliance that must not be switched off by mistake. `hide_when_off: true` shows the state alone while it is off: *Off* whatever the state entity last said, no program, no time, no bar and no alert; on, it also drops an empty bar between cycles. `toggle_hide_when_off: true` hides the button while `state_entity` is off, for a button that only tunes a running appliance (a speed switch next to a separate motor switch). `toggle_icon` swaps its icon, and `toggle_icon_on` sets another while it is on. |
| `power_entity` / `power_on_threshold` / `power_icon` | Power sensor. With a threshold, the state is derived from it: *running* above, then *finished* when it falls back. With a smart plug's switch as `state_entity`, or the sensor itself, it is derived without one, against the threshold of the type (see *A smart plug alone*). A state from an integration keeps the say. `power_icon` replaces `mdi:power-plug`. |
| `source` | `plug` \| `integration`: where the card reads the appliance from. Unset, a smart plug's switch with a meter is a plug, anything else an integration. A plug-read card's editor shows only the plug, its meter and the sensors beside it, and its switch becomes the power button; `integration` keeps a switch from being taken for a plug. Not for a fridge or a screen, which read both together. |
| `power_off_delay` | Minutes the power must stay under `power_on_threshold` before the cycle reads *Finished*, so a pause (a dishwasher drying, a washer soaking) is not taken for the end. Only when the state comes from the plug: an integration reports its pauses itself. 0 by default, 20 on a dishwasher, which dries on next to nothing. |
| `speed_power_max` | A hood, an air purifier or a fan on a plug: its power at top speed, in watts. The speed is then read from what it draws: under a third of it the first speed, under two thirds the second, above that the third. A fan entity's percentage or preset always wins. |
| `speed_power_custom` | Sets the two steps by hand, `speed_power_2` and `speed_power_3`: the watts from which the fan is on its second and third speed, when the thirds do not fit. |
| `show_last_cycle` | Adds a *Last cycle* line between cycles: how long it ran and when it ended, read from Home Assistant's history (seven days of the state, two days of a plug's power, pauses shorter than `power_off_delay` included). Appliances that run a cycle, the kettle, the iron, the toaster and the hair dryer. |
| `energy_entity` | An energy counter (kWh or Wh) shown as an *Energy* line, such as a plug's consumption or a utility meter reset at each cycle. Every type except solar and the home battery. |
| `energy_price` | Price of one kWh, as a number (`0.2516`) or an entity whose state is the price: adds a *Cost* line, in Home Assistant's currency. |
| `show_elapsed` | Adds an *Elapsed* line during a cycle: how long it has run, pauses left out. From a plug, the start is read in the power history when the card opens mid-cycle. |
| `show_today` | Adds a *Today* line: how long the appliance has run since midnight and how many times it started, from the history of its plug (or of its state without a plug). Useful on a pump, a heater, a water heater. |
| `show_history` / `history_entity` / `history_hours` / `history_periods` | `true` adds a discreet *Last 24 h* button under the lines, which unfolds a curve of one reading, in the state's colour, with its minimum and maximum and a gap where the sensor was unavailable. The history is read only once unfolded, then kept five minutes. Left out, `history_entity` is what says the most about the type (a fridge's temperature, a network device's download rate, a pool's water, a UPS's load, a scale's weight), else the power meter, else the state when it is a number. `history_hours`: the period opened first, 24 by default. Unfolded, chips switch between periods: `history_periods` lists them (`24h, 7d, 30d`, the default, or hours), up to a year. Past two days the curve reads Home Assistant's statistics, kept for good (the raw history again for a sensor that keeps none). Over a week or a month, a washer, a dryer or a dishwasher draws a bar per day instead: the energy it used and the cycles it started, the days under a fortnight named under them, the total below. Off by default. |
| `program_entity` / `program_format` | Program. `clean` (default) makes it readable (`LaundryCare.Washer.Program.Auto40` becomes *Auto 40*, `Rapid20Min` becomes *Rapid 20 Min*), `raw` shows it as-is. With a `select` on a cycle appliance, a tap on the line between cycles opens its programs to pick one; during a cycle it is a plain line again. |
| `active_program_entity` | What is running now, for the integrations where `program_entity` only says what is selected and goes blank during a cycle (Home Connect, `homeconnect_local`). Read first during a cycle, while `program_entity` keeps its menu between cycles. |
| `delay_entity` | cycle appliances | A delayed start counting down, in seconds, minutes or as a start time (Home Connect's *StartInRelative*). While it runs the appliance reads *Delayed start*, a *Starts in* line gives the time left and the start time, and the bar fills up to the start. Hidden at 0. |
| `delay_set_entity` | cycle appliances | The delayed start set from the card between cycles: a `number` in seconds, minutes or hours by its unit (Home Connect's *StartInRelative* number), offered hour by hour up to its maximum with the time it would start, or a `select` and its own options. A *Delayed start* line opens them. A `time` entity is the time to finish at, as Samsung exposes it: the next 24 hours, half an hour apart, and *None* while it is unknown. Home Assistant cannot set a time back to unknown, so a delay is cancelled on the appliance or in its app. On a Samsung washer, pick the `time` entity: its `number` counts the hours until the cycle ends, not until it starts. |
| `remaining_time_entity` / `remaining_time_unit` | Remaining time, in `auto` (default, from the entity's unit: s, min, h, ms, d, or `1:02:03`), `seconds`, `minutes` or `hours`, or a finish time (`timestamp`). It also draws the progress bar: the time run since the cycle began, pauses left out, over that time plus what is left. Opened mid-cycle, the card finds the start in the state history. |
| `remaining_time_hide_when_idle` | `true` only shows the remaining time while running, against stale finish times (SmartThings). |
| `remaining_time_split` | `true` puts the end time on its own line, for a narrow card. |
| `progress_entity` | 0-100 sensor replacing the estimate drawn from the remaining time. |
| `door_entity` / `door_open_state` / `door_invert` / `door_hide_in_list` / `door_corner` | Door sensor, "open" state (by default `on` or `open`, for an enum sensor such as Home Connect), inversion, and hiding the line (the door is still drawn). `door_corner: true` shows the door as an icon in a top corner instead of a line, green when shut and orange when open. |
| `alerts_entity` | Entity whose every *attribute* at on, true or active shows as an alert. |
| `alerts_entities` | Up to 8 alerts with an entity each (Home Connect's salt, rinse aid, i-Dos, filters…), as `{ entity, label?, icon? }` or a plain id, shown while on, true, active, *present* or *confirmed*: one under its own name, several behind their count (see *Alert entities*). |
| `connectivity_entity` / `connectivity_connected_state` | Connectivity, as a wifi icon, and the "connected" state (default `on`). |
| `corner_entities` | Up to 2 switches as icons in the top corners, the first on the left and the second on the right, as `{ entity, label?, icon? }` or a plain id. The icon says what each one does and whether it holds (a child lock, an automatic lock, a lock, a switch), and a tap toggles it. A `lock` only opens its dialog: a stray tap never unlocks anything. |
| `info_entities` | Up to 8 lines `{ entity, icon?, label?, value_map?, hide_unit? }`, any beyond are ignored, shown under the lines the card reads on its own. A tap opens the entity's dialog, which is how a tank or a filter gets reset from the card. Past 5 lines the spacing tightens. Values read as in Home Assistant, with the entity's display precision. `value_map` relabels raw values (see below), `hide_unit` drops the unit. |
| `lines_order` | The order of the info lines, as a list of their keys: `program`, `remaining`, `door`, the ones each type brings (`level`, `last_feed`, `flow_return`, `nozzle`…) and, for the lines you add, their entity id. The visual editor writes it for you by dragging. Lines left out keep their place after the ones named, and a line that is not showing is skipped. |
| `hidden_lines` | Lines never to show, by the same keys as `lines_order` (`lamp_brightness`, `today`, `power`...). In the visual editor, the eye beside each line of *Line order*. |
| `start_entity` / `pause_entity` / `resume_entity` / `stop_entity` | Controls, only shown when configured. A control is usually a `button`, a `script` or an `automation`, which is triggered rather than switched off, and can also be a `select` or a `number`: `start_option` says which option to pick (the card takes it on its own when the list holds only one), `start_value` what to write. The same goes for the other three, as `pause_option`, `stop_value` and so on. `start_icon` swaps the button's icon, as do `pause_icon`, `resume_icon`, `stop_icon`, `toggle_icon` and `filter_reset_icon`: `mdi:play` reads as a programme starting, which is not what every press does. In YAML only. |

</details>

## Devices

One section per family of appliances: its options, then its guides. Each part opens with a click.

### Laundry and dishes

<details>
<summary><b>Options</b></summary>

| Option | Types | Description |
|---|---|---|
| `washer_dryer` | washer | `true` for a machine that washes and then dries, as a checkbox under the appliance type. A name that says so is enough; `false` forces the plain washer back. |
| `phase_entity` / `phase_map` | washer, dryer, dishwasher | The step the cycle is at, named on the state line. See *Cycle steps* below. |
| `iron_layout` | iron | `iron` (default, the iron alone) \| `generator` (the same iron on the base of a steam generator). |
| `iron_line_color` | iron | The colour of the line along the iron: `orange` (default) \| `blue` \| `body` (the colour of the appliance). |
| `hair_dryer_layout` | hair dryer | `pistol` (default, a classic dryer seen from the side) \| `ring` (a ring dryer seen from the front). |
| `heat_threshold` | hair dryer | Power from which the dryer blows hot air (300 W by default). Below it, only the fan runs. |
| `heat_threshold` / `spin_threshold` | washer, dishwasher, dryer | On a smart plug alone: the power from which it heats (1000 W by default, 600 W on a dryer) and from which a washer spins its drum (200 W). Below them a washer washes, a dryer cools the load, and a dishwasher under its threshold dries. |
| `detergent_level_entity` / `softener_level_entity` | washer | The detergent and softener tanks, a level in % or a low-level sensor: a line, amber when low. |
| `wash_temperature_entity` / `spin_speed_entity` | washer | The wash temperature and the spin speed, as lines. |
| `left_on_after` | iron | Minutes switched on, heating or ready, after which the state line reads *Left on*, in red, the soleplate burns and the steam turns to black smoke. Empty, it never does. |

</details>

<details>
<summary><b>Dishwasher phases</b></summary>

With a `phase_entity`, `Drying` and `Ado Drying` replace the wash with orange steam rising up the door, higher for `Ado Drying`. `Prewash`, `Mainwash` and `Rinsing` keep the wash animation. These values are recognised out of the box, as are `Pre Wash`, `Wash`, `Rinse` and `Dry`, and `phase_map` translates the others:

```yaml
appliance_type: dishwasher
state_entity: sensor.dishwasher_state
phase_entity: sensor.dishwasher_cycle_phase
phase_map:
  Sechage: drying
```

An unrecognised value leaves the illustration as it is, and the phase also names the step on the state line (see *Cycle steps*).

</details>

<details>
<summary><b>Irons</b></summary>

Nothing connects an iron to Home Assistant, which is why it is on a smart plug. Its switch says whether the iron is on, its meter whether it is heating and how hard: the soleplate turns red and steam billows from under it, a little on a light draw, a cloud at full power. At temperature the thermostat cuts out and the plug reads nothing: the iron is *Ready*, hot, two wisps of steam rising from it. Without a switch, a meter alone reads *Off* below the threshold.

Two models are drawn. The iron alone, after a classic steam iron, and the steam generator, after the Calor stations, whose iron lies on the slope of its tank and lifts nose up while it heats, its lamp glowing and steam running along the hose. `iron_line_color` sets the colour of the line along the iron: orange, blue, or the colour of the appliance.

`left_on_after` is the reason the plug is there. Past that many minutes switched on, heating or ready, the state line reads *Left on*, in red, small flames lick the soleplate and the steam turns to black smoke:

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

</details>

<details>
<summary><b>Hair dryers</b></summary>

Read from its smart plug: *Off* at `power_on_threshold` or below (10 W by default), *Cool air* while only the fan runs, *Hot air* from `heat_threshold` (300 W by default). The air leaves the nozzle, blue when cool, orange when hot, and harder on the high setting (from 1200 W). Without a meter, its switch only says *On* or *Off*. Two models: a classic dryer and a ring dryer.

```yaml
type: custom:ha-appliance-card
appliance_type: hair_dryer
hair_dryer_layout: ring
state_entity: switch.hair_dryer_plug
power_entity: sensor.hair_dryer_plug_power
```

</details>

<details>
<summary><b>Cycle steps</b></summary>

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

</details>

<details>
<summary><b>Washer-dryers</b></summary>

A washer-dryer is a washer with `washer_dryer: true`, not a type of its own: the option is a checkbox under the appliance type. Ticked, the drum shows water while the machine washes and clothes turning in hot air while it dries, read from the same step as the state line. A machine whose name says it washes and dries is recognised on its own.

Rinsing counts as washing, since the drum still has water in it. A step the card cannot read leaves the drawing as it is, so a cycle ending on an anti-crease or a cool-down keeps its clothes instead of filling with water again.

```yaml
appliance_type: washer
washer_dryer: true
state_entity: sensor.washer_dryer_machine_state
phase_entity: sensor.washer_dryer_program_phase
```

</details>

### Kitchen

<details>
<summary><b>Options</b></summary>

| Option | Types | Description |
|---|---|---|
| `target_temperature_entity` / `current_temperature_entity` | oven, cooker, rice cooker | Setpoint and actual temperature. While climbing, the bar becomes a preheat gauge. |
| `power_level_entity` | microwave, cooktop | Power level. On a cooktop it sets how brightly the zones glow. |
| `fan_entity` | hood | Speed: a `fan`'s percentage or preset, or a `select`, `sensor` or `number` mapped onto 1 to 3. Clicking the line opens the entity to change it. |
| `boost_entity` | hood | Intensive mode, when the preset doesn't say so. |
| `filter_life_entity` / `filter_reset_entity` | hood | Filter wear as a bar, and a reset button. |
| `zones` / `zones_layout` / `zones_count` | cooktop | Up to 6 zones `{ level_entity, residual_heat_entity?, name? }`, level as a number or a word (`boost`), `H` for residual heat. Layout `2x1` \| `2x2` \| `3x2`, and how many zones to draw without entities (default 4). |
| `child_lock_entity` | cooktop | Padlock on the illustration. |
| `fridge_layout` | fridge | Drawn in three-quarter view: `freezer_bottom` (default) \| `freezer_top` \| `side_by_side` \| `single` \| `wine` (glass door, bottles lying on wooden racks behind it, for a wine cooler) \| `chest` (a chest freezer, its lid lifting on its back hinge) \| `drawers` (an upright freezer, see-through drawers behind its door). On these two the freezer probe, or the fridge one, is on the display, and the warning threshold is -12 by default. |
| `fridge_temperature_entity` / `freezer_temperature_entity` / `fridge_max_temperature` / `temperature_hide_in_list` | fridge | Temperatures shown on the doors and in the list, from a sensor or a `climate` entity's current temperature, `--°` when the probe goes quiet (`temperature_hide_in_list` leaves them on the doors only). Above the maximum (default 8 °C, 18 °C for `wine`), the state reads *Temperature high*. |
| `door_entity` / `freezer_door_entity` | fridge | Each door turns on its hinge for its own sensor: its outside first, then its inside with its balconies, and the lit inside of the compartment. |
| `ice_maker_entity` | fridge | On `freezer_bottom`, adds an ice dispenser to the fridge door; the side-by-side always has one. Ice cubes fall into the glass while it produces. The other layouts have no dispenser. |
| `power_entity` / `power_on_threshold` / `no_power_threshold` / `no_power_after` | fridge | With nothing wrong, the state reads *Cooling* at or above the threshold and *Standby* below it: set the threshold between your fridge's draw at rest and while cooling (10 W for one that rests at 6 W). Staying below `no_power_threshold` (default 1 W, whatever the cooling threshold) for more than `no_power_after` minutes (default 30) reads *No power draw*, in orange: a long compressor pause looks the same. Counted from the reading's last change, so a page reload does not restart it. |
| `plug_entity` | fridge | The smart plug's switch. Off reads *Unplugged* at once. Unplugged or drawing nothing, the light inside goes out. |
| `kettle_layout` | kettle | `classic` (default, a jug in the appliance's colour) \| `steel` (a stainless steel kettle with a black handle). |
| `coffee_layout` | coffee machine | `silver` (default, a bean-to-cup machine in the appliance's colour, its tank on the side) \| `black` (black with a chrome front and a round screen). |
| `toaster_layout` | toaster | `two` (default, two slots) \| `four` (four slots, two levers) \| `long` (one long slot for two slices end to end). |
| `zone_power` | cooktop | On a smart plug alone, what one zone draws at full power (1500 W by default): the meter is spread over as many zones as it takes, each with a level from 1 to 9. |
| `meat_probe_entity` / `meat_probe_target_entity` | oven | The meat probe and its target, as one line. |
| `speed_entity` | cooker | Blade speed, banded onto three speeds. |
| `state_entity` / `fryer_layout` | air fryer | The fryer's own words, as Philips (HomeID and the older HACS integration), Xiaomi and Cosori (VeSync) report them: *Preheating*, *Preheated*, *Cooking*, *Shake the basket*, *Basket out*, *Paused*, *Keeping warm*, *Finished*, *Delayed start*. `fryer_layout`: `basket` (the default), `window` (a window onto the basket) or `dual` (two baskets). |
| `basket_entity` / `shake_entity` / `basket2_state_entity` | air fryer | The basket sensor, on while it is out (Philips' drawer, Xiaomi's pot), which turns a cycle into *Basket out*; the shake reminder, which turns cooking into *Shake the basket*; the state of the second basket of a dual fryer, drawn apart and named on a line. |
| `water_entity` | coffee | Tank: a Home Connect boolean, or a level in % with *empty* below 10%. |
| `beans_entity` / `tray_entity` / `descaling_entity` | coffee | Beans empty, tray full, descaling due. A missing tank or beans, or a full tray, frames that part of the drawing and lights a dot of the front panel orange. |
| `cups_entity` | coffee | Number of cups: a count, a boolean or a beverage name (*2 Espressi*). |
| `strength_entity` | coffee | Coffee strength, as a number or a word. |

</details>

<details>
<summary><b>Toasters</b></summary>

Read from its smart plug, like the iron: *Standby*, *Toasting* while it draws, then *Toast ready* for five minutes once the slices pop up. Toasting, the slots glow and the heat rises above them, and the lever is down. Three models: two slots, four slots and a long slot.

```yaml
type: custom:ha-appliance-card
appliance_type: toaster
toaster_layout: four
state_entity: switch.toaster_plug
power_entity: sensor.toaster_plug_power
power_on_threshold: 30
```

</details>

<details>
<summary><b>Air fryers</b></summary>

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

</details>

<details>
<summary><b>Pellet grills and smokers</b></summary>

`appliance_type: pellet_grill`, display only (#101). Four shapes, drawn from the makers' photographs: the grill temperature is written large on the body (orange while it climbs, green at the setpoint), the controller shows the setpoint, the probe has its own badge with a gauge towards its target, the seam of the lid glows while it heats, smoke rises from the back, thicker in Super Smoke, and the window in the hopper shows the pellets left.

```yaml
type: custom:ha-appliance-card
appliance_type: pellet_grill
state_entity: climate.traeger_climate
grill_state_entity: sensor.traeger_grill_state
pellet_level_entity: sensor.traeger_pellet_level
probe_entity: climate.traeger_probe_p0
probe_state_entity: sensor.traeger_probe_state_p0
probe_alarm_entity: binary_sensor.traeger_probe_alarm_p0
timer_end_entity: sensor.traeger_cook_timer_end
timer_complete_entity: binary_sensor.traeger_cook_timer_complete
error_entity: sensor.traeger_errors
super_smoke_entity: switch.traeger_smoke
keep_warm_entity: switch.traeger_keepwarm
```

| Option | Description |
|---|---|
| `state_entity` | The grill's `climate` entity, or its state sensor. |
| `large_temperature` | `false` removes the large temperature and the probe badge: the controller then shows the temperature, as on the real grill. On by default. |
| `grill_state_entity` | The state sensor when `state_entity` is the `climate`: *Asleep*, *Ready*, *Igniting*, *Preheating*, *Cooking*, *Cooling down*, *Shutting down*. Other integrations' words are read by what they say (`smoking`, `sear`, `cooling_down`, `flame_out`...). |
| `temperature_entity` / `target_temperature_entity` | The grill's temperature and setpoint when they are not on `state_entity`. The setpoint shows while heating and cooking. |
| `grill_layout` | `timberline` (no chimney), `drum` (chimney, hopper on the left, as Pit Boss and Z Grills), `cart` (recteq), `vertical`. Left out, chosen from the name. |
| `probe_entity` | The meat probe, a `climate` (temperature and target) or a `sensor`. The line and the cable only appear with a probe plugged in; a reading of 0 or less, or above 572, counts as none. |
| `probe_target_entity` | The probe's target when `probe_entity` is a plain `sensor`. |
| `probe_2_entity` / `probe_2_target_entity` | A second probe. |
| `pellet_level_entity` | Pellets left, in %, or a binary sensor that is on when the hopper is low. At 15 % or less, the line and the window turn red. |
| `probe_state_entity` / `probe_alarm_entity` | At temperature, the state reads *Probe at temperature*; a probe that fell out says so on its line. |
| `timer_end_entity` | The end of the cook timer: a date, a Unix time, a `timer`, a clock or the time left. The line shows while it counts down. |
| `timer_complete_entity` | *Timer finished*, while the grill is lit. |
| `error_entity` | A sensor reading `0` when all is well, or a binary sensor. |
| `super_smoke_entity` / `keep_warm_entity` | A line each while their switch is available. |

An entity named after Traeger, Pit Boss, recteq, Camp Chef, Grilla, GMG, PiFire or Z Grills is recognised on its own, and the editor fills in the rest. States and entity names were read from the code of these integrations: Traeger (`sebirdman/hass_traeger`, `Traeger-WiFire`), Pit Boss (`ha-pitboss`, `homeassistant-pitboss`, `ha-prime-polaris`), Camp Chef (`ha-campchef`, `ha-camp-chef-connect`), Grilla (`ha-grilla`), recteq, GMG (`gmg-ha`) and PiFire. Only a Traeger snapshot has been seen from a real grill.

On a smart plug alone (`power_entity`, with its switch if it has one): *Asleep*, *Ready* while the plug is on and draws nothing, *Igniting* above 150 W, *Cooking* from 15 W. A temperature or probe sensor can be added; `power_on_threshold` sets another limit.

</details>

### Heating, cooling and air

<details>
<summary><b>Options</b></summary>

| Option | Types | Description |
|---|---|---|
| `state_entity` as `water_heater` | water heater | Its state is the mode (*Eco*, *Performance*…), shown as Home Assistant translates it. Heating then comes from `heating_entity`, a smart plug or MELCloud's `status` attribute. |
| `heating_entity` / `hot_water_entity` | boiler, heat pump | Central heating and hot water indicators; with both on, hot water wins. A heat pump has a cooling one as well, below. Without them the mode comes from `state_entity`: codes `-H`, `=H`, `0H` (Nefit, Bosch) or their numeric form `200`, `201`, `203`, with start-up (`0U`, `0C`, `0L` or `270`, `283`, `284`) read as *Ignition* and the burner's waits (`0A`, `0Y`, `0E` or `202`, `204`, `265`, `305`, `353`) as *Waiting*; `CH`, `HW`, `No`; those of InComfort, ebusd, myVAILLANT and MELCloud; or *central heating* and *hot water*. With the indicators off but the flame lit, it reads *Burner on*. `state_map` accepts `space_heating`, `hot_water`, `starting`, `waiting` and `idle`. With only the burner as `power_entity`, the flame lights without saying what for. |
| `state_entity` on a heat pump | heat pump | What the pump is doing: a `climate` entity's `hvac_action` (heating, cooling, defrosting, idle), MELCloud's `status` attribute (`heat_water`, `heat_zones`, `cool`, `defrost`, `standby`, `legionella`) or a sensor in words (*heating*, *hot water*, *cooling*, *defrost*, in 14 languages). EMS-ESP's compressor activity (`sensor.boiler_hpactivity`, Bosch, Buderus, Junkers, Nefit) is read in all eleven languages EMS-ESP speaks, needs no `state_map`, and makes the card a heat pump on its own; picked in the editor, it fills the pump's other fields from their EMS-ESP short names, which stay the same in every language: `hptc1` as the flow, `hptc0` the return, `hpcompon` the compressor, `hpcurrpower` what it draws, `hppower` the heat it gives, `pc0flow`, `fanspd` and `outdoortemp`. `curflowtemp` is left out on purpose: on a heat pump it is the boiler module's sensor, often in a buffer tank. The state of a `climate` or `water_heater` entity is the mode you picked, shown as-is when the entity says nothing about what the pump does. `state_map` accepts `space_heating`, `hot_water`, `cooling`, `defrost` and `idle`. The outdoor unit's fan turns while it works and stops to defrost; the tank or the radiator warms depending on the mode, and the water runs down the flow pipe and back up the return, out hot and back cooler while it heats, the other way round while it cools. |
| `cooling_entity` and the valves | heat pump | A cooling indicator, beside the heating and hot water ones. An indicator may also be a valve: HeishaMon's 2-way valve reads *Heating* or *Cooling* and its 3-way valve *Room* or *Tank*, whichever field they sit in. The tank comes first, then cooling, then heating. |
| `outdoor_temperature_entity` / `heat_output_entity` / `cop_entity` | heat pump | Outdoor temperature, heat output and COP, in the list. Without a COP entity, the card divides the heat output by `power_entity` once both are in W or kW. |
| `cooling_power_entity` / `cooling_output_entity` / `hot_water_power_entity` / `hot_water_output_entity` | heat pump | What the pump draws and makes while it cools and for the tank, for the integrations that measure each circuit apart (HeishaMon). The card reads the pair of the circuit the indicators point to, even at rest, and the heating pair otherwise. Cooling, the line reads *Cooling output* and the computed ratio *EER*. |
| `heating_energy_entity` / `cooling_energy_entity` / `hot_water_energy_entity` | heat pump | What each circuit has consumed, in kWh (a daily or total meter). The line of the circuit in use is shown. In the editor, the heat pump's power fields only list sensors in W or kW and these only sensors in kWh, the entity already chosen excepted; `power_entity` reads *Power while heating*. A kWh sensor put in `power_entity` reads as *Energy*. |
| `return_temperature_entity` | heat pump | The water coming back. Flow and return then share one line, as *42 °C → 36 °C*, and the card works out the Delta T on its own like it does the COP, in kelvin as the trade writes it (°F stays °F), always with a decimal since a heat pump works on a couple of degrees. Taken as a distance, so it stays positive while the pump cools the house. |
| `water_flow_entity` | heat pump | Flow rate, in the entity's own unit. |
| `compressor_entity` | heat pump | Frequency in hertz, or an on/off contact read as *Running* and *Off*. A compressor at rest stops the fan on the drawing and puts the indicators on *Standby*: the pump is only pushing water around, whichever way the valves point. At work, it turns a standby state into *Running*. |
| `fan_speed_entity` | heat pump | Fan speed, in the entity's own unit. |
| `no_hot_water` | heat pump | `true` drops the hot water tank from the drawing, for an installation that heats no domestic hot water. What is left stands in the middle. |
| `underfloor_heating` | heat pump | `true` draws a heated floor instead of a radiator, which is how most air-to-water installations emit their heat: the slab seen at an angle with its pipe snaking across it, and the heat rising off it while it warms. It turns blue when the pump cools the house. |
| `thermostat_entity` / `thermostat_layout` | boiler | The boiler's room thermostat, a `climate` entity: it is drawn on the wall beside the boiler, its top level with the boiler's, with the room and the setpoint on its screen and a flame while it calls for heat, and the line *Room 19.5 °C → 21 °C* is added. `thermostat_layout` picks its drawing, `square`, `round` or `glass`; by default the thermostat's name decides (a Nest is round, an ecobee black glass). |
| `thermostat_layout` | thermostat | `square` (a white square with a dark screen: Netatmo, tado, Bosch CT100, Homematic IP) \| `round` (a steel ring around black glass that turns orange while it heats: Nest, Honeywell) \| `glass` (black glass with a light bar: ecobee, Bosch CT200) \| `valve` (a radiator valve seen close up: Sonoff, Aqara, Tuya, Danfoss, Fritz!). By default the name decides, and a climate entity that reports how far it opens is a valve. |
| `boiler_layout` | boiler | `wall` (default, a white wall boiler with its gauge and screen) \| `window` (a boiler whose burner shows through a window). |
| `towel_warmer_layout` | towel warmer | `ladder` (default, round bars between two uprights) \| `panel` (flat anthracite panels on one upright). |
| `diffuser_layout` | diffuser | `drop` (a wooden teardrop, Meross, Asakuki) \| `cone` \| `stone` (Vitruvi, Govee) \| `flame` (a flame-effect diffuser) \| `nebulizer` (glass on a wooden base). Left out, the name decides, a teardrop otherwise. Wood by default for the teardrop, the flame and the nebulizer, white for the others, or `illustration_color`. |
| `light_entity` / `tank_empty_entity` | diffuser | The diffuser's light: its colour lights the band and the floor. An empty tank sensor makes it *Tank empty*. Its `state_entity` is the mist: a switch, a fan (50 % or less is *Intermittent*), Meross's spray select (`eco` is *Light mist*, a lower mist; `intermittent` or `interval` is *Intermittent*) or a humidifier entity. A select gets a button that steps through its modes, a switch or a fan an on/off button. |
| `hrv_layout` | HRV | `diagram` (the two streams crossing in the exchanger) \| `one_duct` (a single-room unit, Lunos eGO, Zehnder ComfoAir 70) \| `pair` (two through-wall units, Lunos e2, Vents TwinFresh, that swap direction every 70 s) \| `single` (an extract-only unit in the attic, its ceiling vents and the outlet over the roof, fresh air coming in through the windows) \| `single_box` (the same extract unit drawn alone, its ducts in and its outlet) \| `single_basement` (the extract unit in the basement, its riser climbing to one ceiling vent per floor through the ceilings and the outlet leaving through the basement wall, #87). Left out, a name that says single flow, extract or hygro makes an extract-only unit. |
| `high_speed_entity` | HRV (single, single_box, single_basement) | A two-speed extract unit's speed switch: off is *Low speed*, on *High speed*, the fan turning three times faster. The `state_entity` stays its on and off. Set it as `toggle_entity` too and the button shows the speed, `mdi:fan-speed-1` or `mdi:fan-speed-2`, instead of a power sign. |
| `hrv_floors` | HRV (single_basement) | The floors above the basement, 1 to 3 (2 by default), each with its ceiling vent and its window inlet. |
| `zone_valves` | HRV (single_basement) | Up to four zone dampers (`valve`, `cover`, `switch`, `input_boolean` or `binary_sensor`), each `{entity, name, at}`. `at` places it: `riser` (on the riser by the unit, it closes every floor), `basement` (the basement's branch) or `floor_0`, `floor_1`, `floor_2` (one floor's branch, `floor_0` the ground floor). Without `at`, the first goes on the riser and the second on the basement. A damper is open unless it reads closed, off or at position 0: shut, its circle turns red and the air behind it fades. A line *Dampers* lists them with their state. |
| `speed_entities` | HRV | One entity per speed, in order (`input_boolean`, `switch` or `light`), for a unit run by its relays (#78). The speed is the one whose entity is on: the state reads *Speed 2*, a line *2 / 3*, and the fans turn faster with each speed. A *Speed* button opens a menu of the speeds that turns on the one picked and nothing else, leaving the others to the unit's own automations. A unit whose `state_entity` is a select of modes or a fan with presets keeps its *Mode* menu, the speed shown as a line. |
| `outdoor_temperature_entity` / `supply_temperature_entity` / `extract_temperature_entity` / `exhaust_temperature_entity` | HRV | The four temperatures, drawn at the ends of the ducts. |
| `bypass_entity` | HRV | The bypass: a switch or a binary sensor that is on, a position in %, or Vallox's cell state, whose *Defrosting* reads *Defrosting*. |
| `airflow_entity` / `filter_life_entity` / `filter_life_full` | HRV | The airflow and the filter, in days or in %, as lines, and the filter's life as the bar: its percentage, or its days out of `filter_life_full` (90 by default). 7 days or 10 % left (or `filter_due_below`) reads *Replace filter*. The `state_entity` is the unit's fan, climate or select: its speed, its *Boost* and *Away* presets. |
| `state_entity` (modes) | HRV | A select of modes, or a fan with presets, gets a *Mode* button that opens the list of modes over the page, next to the button. The state reads the mode the unit runs in (*Smart*, *Manual*, *Turbo*); a defrost, a bypass, a filter due or a pause still say themselves. Broan and Venmar ERVs over ESPHome ([broan_erv_uart](https://github.com/nspitko/broan_erv_uart)): `recirculate` reads *Recirculation* (the outdoor dampers close and the room air loops through the unit), `humidity` *Humidity control*, `int` *Intermittent* (and *Intermittent, paused* when both fans stand still), `turbo` and `max` *Boost*. |
| `supply_fan_entity` / `exhaust_fan_entity` / `fan_max_rpm` | HRV | Each fan's speed in rpm: each one turns at the speed of its motor, up to `fan_max_rpm` (2000 by default), and the line gives its rpm and its airflow (`airflow_entity` for supply, `exhaust_airflow_entity` for exhaust), the airflow also written by each fan on the drawing. Picking a Broan's mode select fills them in. |
| `fan_speed_entity` | HRV | The speed in %, when the unit keeps it in a number of its own. In *Manual*, a number gets a slider under the lines; so does `target_humidity_entity` under humidity control. |
| `current_humidity_entity` / `target_humidity_entity` / `humidity_control_entity` | HRV | The humidity and its setpoint, on a line and on the drawing while humidity control runs. The humidity control switch makes it *Humidity control* and gets a button. |
| `active_mode_entity` | HRV | The mode the unit runs in, when it differs from the one set (an ERV in smart mode picks its own). The state and the drawing follow it, a *Mode* line gives the one set, and the mode menu keeps the one set ticked. |
| `floor_layout` | floor_heating | `water` (default, a manifold on the wall and the loop under the tiles) \| `electric` (a heating cable on its mesh). |
| `heater_mode_entity` / `showers_entity` | water_heater | The heating mode (eco, boost...) and the showers available, as lines. |
| `pilot_mode_entity` / `window_entity` | space_heater, towel_warmer | The pilot wire mode, and a window contact: *Open* in amber. |
| `state_entity` / `phase_entity` | pellet stove | The phase of the fire: *Off*, *Ignition*, *Burning*, *Modulating*, *Eco standby*, *Cooling down*, *Cleaning* or *Alarm*. Read from a status sensor in `phase_entity` (Palazzetti's keys, Micronova's Agua IOT in the stove's own language, Edilkamin, Rika, Duepi), and otherwise from a `climate` entity's `hvac_action`, where *idle* is the eco standby. `state_map` accepts the eight phases, as `off`, `ignition`, `burning`, `modulating`, `eco`, `cooling`, `cleaning` and `alarm`. |
| `current_temperature_entity` / `target_temperature_entity` | pellet stove | Room and setpoint, as *20 °C → 21 °C* while the stove works towards it. A `climate` entity in `state_entity` gives both on its own. |
| `power_level_entity` / `flue_temperature_entity` / `fan_speed_entity` | pellet stove | The power stage, as *4 / 5* when the entity knows its range, and on the stove's screen while it burns; the flue gas temperature; the fan, a `fan` entity reading in percent. |
| `level_entity` / `level_empty_below` / `level_max` | pellet stove | The pellets in the hopper: a percentage, or a contact on when the reserve is reached (Agua IOT, Edilkamin). A level in centimetres or kilograms fills the hopper once `level_max` gives its capacity. Empty, the hopper turns red, and in alarm the state reads *Out of pellets*. |
| `error_entity` | pellet stove | The alarm: a word (*Ignition failed*), a count or a contact. Anything but *no alarm*, however the stove says it, puts the stove in alarm, with its words on a line and its code (*AL05*) on the screen. |
| `state_entity` | air conditioner | A `climate` entity: *Cooling*, *Heating*, *Drying*, *Fan only* or *Auto* as set, and from `hvac_action` *Standby* once the setpoint is reached, *Defrosting* and *Warming up*. The screen shows the mode's symbol and the setpoint, and the lines the room, the humidity and the fan. A plug reads *Running* or *Off*. `state_map` accepts `off`, `cool`, `heat`, `dry`, `fan`, `auto`, `idle` and `defrost`. |
| `vane_vertical_entity` / `vane_horizontal_entity` | air conditioner | The vanes, when they live in selects of their own (Panasonic, Midea); otherwise the `climate` entity's `swing_mode` and `swing_horizontal_mode`. Five positions from top to bottom and from left to right, or a swing, in each integration's words. |
| `state_entity` | dehumidifier | A `humidifier` entity: *Drying*, *Drying laundry* when its mode says so (Midea's clothes_dry), *Standby* once the humidity is reached, *Tank full*. The screen and a line give the humidity and its target. |
| `tank_entity` / `tank_full_above` / `current_humidity_entity` | dehumidifier | The tank, a contact on when full or a level in percent (full from `tank_full_above`, 100 by default), shown in the window at the bottom; a hygrometer for a dehumidifier on a plug. |
| `state_entity` | humidifier | A `humidifier` entity: *Humidifying*, *Standby* once its action says the humidity is reached, *Off*. A switch or a smart plug works too, running from 5 W. The mist rises from its nozzle while it runs. |
| `current_humidity_entity` / `target_humidity_entity` | humidifier | Only if they are apart from the `humidifier` entity, which gives both. The humidity is on its screen and as a line with its target. |
| `mist_level_entity` | humidifier | The mist level, on its screen: more levels, more mist, higher and faster. A `number` gets a slider on the card (VeSync, Dreo), a select a menu on its line (Tuya's level_1 to level_n). Without one, the mist follows a mode that says low, medium or high (SwitchBot, Xiaomi). |
| `night_light_entity` | humidifier | A soft light from the bottom of the tank, dim or bright, even with the humidifier off: a select (bright, dim, off), a light, a number or a switch. |
| `display_entity` | humidifier | Its screen goes dark while this is off: a switch, or a select or a light for its brightness (Xiaomi's LED). |
| `low_water_entity` / `water_level_entity` | humidifier | *Add water*: the water at the bottom of the tank, no more mist, a red drop flashing. A level in percent or in words (empty, low, medium, high, or Tuya's level_n) sets the height of the water; at 5 % or empty it reads the same. |
| `tank_lifted_entity` | humidifier | *Tank removed*: the tank lifts off its base with a warning, and wins over the rest. A problem sensor is on once lifted (VeSync), a connectivity sensor on while it is in place (Xiaomi): the card reads both. |
| `state_entity` / `heater_layout` | space heater | A `climate` entity: *Heating*, *Standby* once the setpoint is reached, *Fan only*. `heater_layout`: `fan` (fan heater, the default) or `oil` (oil-filled radiator). |
| `state_entity` | towel warmer | The pilot wire's mode: *Comfort*, *Eco*, *Frost protection*, *Boost*, *Drying*, read from a `climate` entity's preset (Heatzy, Atlantic) or from a select (NodOn). |
| `current_temperature_entity` / `target_temperature_entity` | space heater, towel warmer | Room and setpoint, when a `climate` entity does not carry them. |
| `fan_speed_entity` / `purifier_entity` / `outdoor_temperature_entity` / `defrost_entity` | air conditioner | The fan when the `climate` entity does not carry it; the purifier (nanoe, plasma), lit on the unit; the outdoor temperature; a defrost contact. |
| `state_entity` | air purifier | A `fan` entity: *Purifying*, *Auto*, *Night mode*, *Heating* or *Off*, from its state and its `preset_mode`, in the words of each integration (*sleep*, *night*, *Silent*, *Quiet*...). A `climate` entity (a Dyson Hot+Cool), a `select` naming the mode (LG, Haier, Midea) or a plug work too. `state_map` accepts `off`, `run`, `night` and `heat`. |
| `purifier_layout` | air purifier | `cylinder` (default, blowing out of its top) \| `box` (a square box with its fan on top) \| `ring` (a Dyson purifier tower) \| `ring_heat` (a Dyson Hot+Cool) \| `ring_humidify` (a Dyson Humidify+Cool, with its water tank) \| `ring_desk` (a round desk fan) \| `ring_heater` (a fan heater without a filter, such as the AM09) \| `ring_tower` (a slim tower fan, such as the AM07). A Dyson picks its own from its model or name. The drum is gold on the Formaldehyde and De-NOx models, silver on the others. The ring blows forward, turns from side to side while it oscillates and draws the air in while it blows backwards (`direction: reverse`). |
| `air_quality_entity` | air purifier | The air's quality on a four-step gauge (*Good*, *Fair*, *Poor*, *Very poor*) and a line: PM2.5 in µg/m³ (12, 35 and 55), a US AQI (50, 100, 150), Philips's allergen index from 1 to 12, or the words of VeSync, Winix, Coway, Dyson, IKEA, SmartThings, Matter and tuya-local. A scale the card cannot place shows no step. |
| `display_entity` | air purifier | An optional screen showing that entity's value, a PM2.5 reading or a temperature: on the front of the cylinder and the box, on the round screen of a Dyson, drawn larger than life so it can be read. |
| `humidifier_entity` / `deep_clean_entity` | air purifier | A Dyson Humidify+Cool: the `humidifier` entity gives the humidifying state, the mist and the humidity setpoint, the sensor the hours left before the deep clean. `low_water_entity`, `tank_lifted_entity` and `water_level_entity` also apply to it. |
| `night_mode_entity` / `heater_entity` | air purifier, fan | Night mode when it is a switch of its own (Dyson, Duux); the heating, from a `climate` entity's `hvac_action`, a switch or a select. Night dims the air and slows it, heat turns it orange to red, and both together give dim orange air. |
| `fan_layout` | fan | `stand` (default) \| `table` \| `ceiling` (the default for a fan named after the ceiling). |
| `oscillating` | fan | `true` for a fan on a plug that oscillates: the head turns and the air follows it. A `fan` entity that reports `oscillating` is believed instead. |
| `light_entity` / `wood_blades` / `fan_direction_inverted` | ceiling fan | The fan's light, drawn as a globe under the motor that lights up (no light, no globe); wooden blades; summer and winter swapped, for a fan whose `direction: forward` means winter. Summer draws the air up, winter sends the warm air under the ceiling back down, in orange. |

</details>

<details>
<summary><b>Thermostats and radiator valves</b></summary>

Any `climate` entity that heats: a thermostat on the wall, a radiator valve, a boiler's heating circuit (Bosch's `climate.hc1`), whatever the integration (Netatmo, Nest, ecobee, tado, Honeywell, Hive, Zigbee, Matter…). The state reads *Heating*, *Target reached*, *Eco*, *Away*, *Frost protection*, *Window open* (Better Thermostat, Versatile Thermostat) or *Off*, and the line *Room 19.5 °C → 21 °C*. A valve also says how far it has opened.

Four drawings, picked by `thermostat_layout` or by the name: a white square, a round one with its steel ring that turns orange while it heats, black glass, and a radiator valve seen close up, its head standing out from the radiator, the radiator warming while it heats. A thermostat makes no heat, so only the valve's radiator gives some off.

```yaml
type: custom:ha-appliance-card
appliance_type: thermostat
state_entity: climate.bedroom_trv
thermostat_layout: valve
```

On a boiler, `thermostat_entity` draws its room thermostat on the wall beside it:

```yaml
type: custom:ha-appliance-card
appliance_type: boiler
state_entity: sensor.boiler_display_code
temperature_entity: sensor.boiler_flow_temperature
thermostat_entity: climate.hc1
```

</details>

<details>
<summary><b>Pellet stoves</b></summary>

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

</details>

<details>
<summary><b>Air conditioners</b></summary>

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

</details>

<details>
<summary><b>Dehumidifiers, humidifiers, space heaters and towel warmers</b></summary>

A dehumidifier shows the humidity on its screen and the water it has taken in its tank; a humidifier does the opposite, its mist rising in blue from the nozzle at the level set, with its water, its night light and its screen in the tank and on its base, and sliders for its target and its mist; a fan heater glows behind its grille, an oil-filled radiator warms up its fins; a towel warmer shows the pilot wire's mode with the symbols of French radiators (sun, moon, snowflake). Warm air rises, the air a dehumidifier or a fan blows goes the other way.

All three work on a smart plug alone: above `power_on_threshold` they dry or heat, below it they rest while the plug is on and read *Off* once it is switched off.

```yaml
type: custom:ha-appliance-card
appliance_type: space_heater
heater_layout: oil
state_entity: switch.heater_plug
power_entity: sensor.heater_plug_power
power_on_threshold: 30
```

</details>

<details>
<summary><b>Air purifiers and fans</b></summary>

The air a purifier or a fan blows is drawn as dashed lines: blue, orange while it heats, dimmed and slow at night. The more it blows, the more lines: two up to 40 %, three up to 75 %, five above, or from the preset when there is no percentage (night, turbo, low, medium, high). A purifier also carries a four-step gauge of the air's quality, lit in its colour, and an optional screen.

A fan comes on a stand, on a desk or on the ceiling. Its natural wind blows in gusts, the blades speeding up and slowing down. A ceiling fan draws the air up in summer and sends the warm air back down in winter, and its light shows as a globe under the motor.

```yaml
type: custom:ha-appliance-card
appliance_type: air_purifier
purifier_layout: ring
state_entity: fan.living_room_purifier
air_quality_entity: sensor.living_room_pm2_5
display_entity: sensor.living_room_temperature
heater_entity: climate.living_room_purifier
```

```yaml
type: custom:ha-appliance-card
appliance_type: fan
fan_layout: ceiling
state_entity: fan.bedroom_ceiling
light_entity: light.bedroom_ceiling
wood_blades: true
```

</details>

### Buffer tanks, circulators, solar thermal and wood stoves

A buffer tank (`storage_tank`) fills with the colour of its layers, blue when cold and red when hot, one marker per probe at its height, its charge above it. The sources on its left (heat pump, boiler, solar, stove) and the consumers on its right (heating circuits, fresh water station) are piped in red for the flow and blue for the return, and the water moves in them while they run. A fresh water station (`fresh_water_station`) heats hot water on demand from the tank: the flow big on its screen while a tap is open, its pump turning. A heating circulator (`water_pump` with `pump_layout: circulator`, a Grundfos ALPHA, a Wilo Stratos and the like) sits on its flow pipe in the colour of its brand, its power on the display and its impeller turning at the speed it reports; a fault or a lost link (*No data*) shows on its display. Solar thermal collectors (`solar_thermal`), flat plates or evacuated tubes, send their heat down to the solar station and its pump; frost covers them below 0 °C, stagnation makes them shimmer. A log stove (`wood_stove`) burns, glows or stays cold by its temperature, with a dial on its flue and, with a water jacket, its flow and return and its pump.

<details>
<summary><b>Options</b></summary>

| Option | Types | Description |
|---|---|---|
| `state_entity` | buffer tank | Its top probe, or its only one. |
| `temperature_entities` | buffer tank | One to five probes, top to bottom, each a marker on the tank. They replace `state_entity` as the layers. |
| `charge_entity` | buffer tank | The charge its controller computes, in %. Without it, the card works it out from the layers between `charge_min_temp` (30 by default, 0 %) and `charge_max_temp` (60, 100 %). |
| `tank_volume` | buffer tank | Its volume in litres, for the energy stored above `charge_min_temp`, in kWh. |
| `sources` / `consumers` | buffer tank | Up to six entities each, with an optional `name`: a binary sensor, a switch, a pump or a status. A source running is *Loading*; otherwise *Charged* from 80 %, *Partly charged*, *Discharged* under 20 %. Anything but off, idle, 0 or the like counts as running (*Warmwasser*, *heating*...). |
| `state_entity` | fresh water station | Its flow, in L/min: above zero it is *Drawing hot water*. A pump or any on/off entity works too. |
| `temperature_entity` / `target_temperature_entity` | fresh water station | The outlet temperature, shown on its screen between draws, and its setpoint. |
| `primary_temperature_entity` / `cold_water_temperature_entity` | fresh water station | The tank's supply and the cold water. A supply under the setpoint plus `supply_margin` (5 by default, in K or °F) is *Supply too cold*. |
| `pump_entity` / `pump_modulation_entity` | fresh water station, solar thermal | The primary pump (it running is a draw) and its modulation in %. On solar thermal, a modulation under 60 % turns the pump slowly. |
| `circulation_entity` / `circulation_mode_entity` | fresh water station | The circulation pump, *Circulating* while it runs, and its mode or schedule as a line. |
| `fault_entity` | fresh water station, solar thermal, circulator | A problem sensor: *Fault* while on. On a circulator the display reads E, its ring flashes red and the impeller stops. |
| `circulator_model` | circulator | `grundfos` (red) \| `wilo` (green) \| `dab` (blue) \| `generic` (grey), the colour of its head. Left out, it is read from the name: Grundfos, ALPHA or MAGNA, Wilo, Stratos or Yonos, DAB or Evosta. |
| `power_entity` | circulator | Its power, large on its display. It runs from 2 W, unless `power_on_threshold` says otherwise. |
| `speed_entity` / `max_speed` | circulator | Its speed in rpm, out of `max_speed` (4500 by default): the impeller and the LED ring turn faster with it. Also a line. |
| `head_entity` / `flow_entity` / `voltage_entity` | circulator | Its head, its flow and its supply voltage, as lines. A head on its own makes a water pump a circulator. |
| `control_mode_entity` | circulator | Its control mode (AUTOADAPT, proportional or constant pressure, a speed), under the display and as a line. |
| `state_entity` | circulator | Switched on while every value it reports is gone means the link to it is down (Bluetooth, Modbus): *No data*, dashes on the display, rather than *Off*. |
| `state_entity` | solar thermal | The solar pump: *Loading* while it runs. |
| `collector_style` | solar thermal | `flat` (default) \| `tubes`. Left out, *tube* or *vacuum* in the name draws tubes. |
| `collector_temperature_entity` / `tank_temperature_entity` | solar thermal | The collector, on the station's screen, and the tank; their difference as a line. A collector at or below 0 °C is *Frost*. |
| `stagnation_temp` / `collector_shutdown_entity` | solar thermal | A collector at or above this temperature (120 °C by default), or the shutdown entity on, is *Stagnation*. |
| `tank_full_entity` | solar thermal | The tank at its maximum: *Tank full* while the pump rests. |
| `heat_power_entity` / `today_entity` | solar thermal | The heat it brings and the day's yield, as lines. |
| `state_entity` | wood stove | Its temperature, on the stove, the flue or the water. A status that is simply on is a fire. |
| `burning_temp` / `embers_temp` | wood stove | *Burning* from the first (120 by default), *Embers* from the second (50), *Cold* below. On water, something like 50 and 30. The dial reads to 400 degrees, or to 100 when `burning_temp` is under 100. |
| `temperature_scale` | wood stove | A factor for a raw value, `0.01` for a PLC sending 2130 for 21.3 °C. |
| `water_jacket` | wood stove | `true` draws the flow and return pipes at the back. |
| `flow_temperature_entity` / `return_temperature_entity` | wood stove | The water circuit, and its difference. Above `overheat_temp` (90 by default) the stove is *Overheating*. |
| `pump_entity` / `valve_entity` | wood stove | The circuit pump, worth a glance when stopped with the water hot, and the mixing valve, its position in %. |
| `temperature_entity` / `last_fire_entity` | wood stove | The room, and the last fire from a timestamp. |

```yaml
type: custom:ha-appliance-card
appliance_type: water_pump
pump_layout: circulator
circulator_model: grundfos
state_entity: switch.heating_pump
power_entity: sensor.alpha_power
speed_entity: sensor.alpha_speed
max_speed: 4500
head_entity: sensor.alpha_head
flow_entity: sensor.alpha_flow
control_mode_entity: select.alpha_control_mode
fault_entity: binary_sensor.alpha_fault
```

```yaml
type: custom:ha-appliance-card
appliance_type: storage_tank
state_entity: sensor.buffer_top
temperature_entities:
  - sensor.buffer_top
  - sensor.buffer_middle
  - sensor.buffer_bottom
tank_volume: 750
sources:
  - entity: sensor.boiler_hpactivity
    name: Heat pump
  - binary_sensor.solar_pump
consumers:
  - binary_sensor.heating_circuit_pump
```

```yaml
type: custom:ha-appliance-card
appliance_type: wood_stove
state_entity: sensor.stove_temperature
temperature_scale: 0.01
burning_temp: 50
embers_temp: 30
water_jacket: true
flow_temperature_entity: sensor.stove_flow
return_temperature_entity: sensor.stove_return
pump_entity: binary_sensor.stove_pump
valve_entity: cover.stove_mixer
```

</details>

### Pool, pumps, spa, sauna and aquarium

<details>
<summary><b>Options</b></summary>

| Option | Types | Description |
|---|---|---|
| `water_temperature_entity` / `air_temperature_entity` | pool pump | The water and the air, shown as lines. The water may be a `climate` entity (Pentair). |
| `ph_entity` / `redox_entity` | pool pump | The pH and the RedOx (ORP), shown as lines. |
| `filtration_time_entity` | pool pump | Time filtered today, in hours, minutes or seconds: *4h30*. |
| `pressure_entity` / `pressure_alert` | pool pump | The filter's pressure: the gauge's needle follows it, and at `pressure_alert` (1.8 bar by default) or above, with the pump running, it is an *Error*. |
| `pool_mode_entity` | pool pump | The pump's mode (auto, manual…), shown as a line. As the `state_entity`, a mode only says the pump runs when a `power_entity` draws over `power_on_threshold` (50 W by default). |
| `chlorine_pump_entity` / `chlorine_level_entity` | pool pump | An optional chlorine dosing pump: its tank and its long tube to the return pipe only show when it is given, and drops run down the tube while it injects. Its level, in %, fills the tank and turns orange at 15 % or less. |
| `backwash_entity` / `frost_entity` | pool pump | A backwash sends the dirty water to the drain, the pool stays still; frost protection frosts the pipes. A state that says backwash or frost does the same. |
| `pool_alert_entity` | pool pump | Anything that should raise the *Error*: the pump smokes and the gauge's needle swings. |
| `light_entity` | pool pump | The pool's light: it shines on the far wall, and the light switch sits in the corner of the card. |
| `pump_layout` | water_pump | `booster` (a pump on its pressure tank, with its controller) \| `sump` (a sump pit in cross-section, its float on its cable) \| `circulator` (a heating circulator, see *Buffer tanks, circulators, solar thermal and wood stoves*). Left out, a `level_entity`, a `high_level_entity` or a name that says sump makes a sump pump. On a smart plug left on with its `power_entity`, the pump pumps above `power_on_threshold`, waits below it, and reads *Switched off* once the plug is cut, in red on a sump pump. Without a power meter, the switch is the pump's own and off is only waiting. |
| `pressure_entity` | water_pump (booster) | The pressure, on the controller's display and as a line. Without it, the display shows the plug's power. |
| `level_entity` / `level_max` | water_pump (sump) | The water level, on the display, as a line and as the height of the water in the pit: a percentage, or a value out of `level_max`. From 90 % it reads *High level*. |
| `high_level_entity` | water_pump (sump) | A float switch or a high-level alarm: *High level*, the pit full and a beacon flashing. |
| `target_temperature_entity` | sauna | The temperature to reach: within three degrees, the sauna reads *Ready*. Left out, the thermostat's own target. |
| `bubbles_entity` | spa | The bubbles or jets: *Bubbles*, the water boiling with them, and a *Bubbles* button on a switch. `light_entity` lights the water. |
| `water_ph_entity` / `water_chlorine_entity` | spa, aquarium | The water's pH, and on a spa its chlorine, as lines. |
| `aquarium_filter_entity` | aquarium | The filter pump: *Stopped* in amber. |

</details>

<details>
<summary><b>Pool pumps</b></summary>

A sand filter with its multiport valve and its gauge, the pump with its clear strainer lid, the pipes and the pool. Its `state_entity` is the pump, a switch or a binary sensor: *Filtering* while it runs, the water flowing in the pipes, a jet turning in the strainer and the needle up; *Off* at rest. With a chlorine pump, *Chlorine injection* while it doses. *Backwash* sends the dirty water to the drain, *Frost protection* frosts the pipes, and an alert or a pressure too high is an *Error*. The light, the water, the air, the pH, the RedOx, the time filtered today, the pressure and the pump's mode are each optional. A smart plug's meter alone is enough.

```yaml
type: custom:ha-appliance-card
appliance_type: pool_pump
state_entity: binary_sensor.pool_pump
light_entity: switch.pool_light
water_temperature_entity: sensor.pool_water_temperature
ph_entity: sensor.pool_ph
redox_entity: sensor.pool_redox
filtration_time_entity: sensor.pool_filtration_today
chlorine_pump_entity: binary_sensor.pool_chlorine_pump
```

</details>

<details>
<summary><b>Pumps, underfloor heating, spa, sauna, aquarium, meter and Christmas tree</b></summary>

Each is read from its own entity, a thermostat's action or a smart plug's power with `power_on_threshold`, and each shows its reading on a display drawn large enough to read.

```yaml
type: custom:ha-appliance-card
appliance_type: water_pump
state_entity: switch.booster
pressure_entity: sensor.booster_pressure
```

```yaml
type: custom:ha-appliance-card
appliance_type: water_pump
pump_layout: sump
state_entity: switch.sump_pump
level_entity: sensor.sump_level
level_max: 100
high_level_entity: binary_sensor.sump_high_level
```

```yaml
type: custom:ha-appliance-card
appliance_type: spa
state_entity: climate.spa
bubbles_entity: switch.spa_bubbles
light_entity: light.spa
```

```yaml
type: custom:ha-appliance-card
appliance_type: meter
state_entity: sensor.linky_papp
tariff_entity: sensor.linky_ptec
```

```yaml
type: custom:ha-appliance-card
appliance_type: christmas_tree
state_entity: switch.christmas_tree
tree_palette: red_gold
```

An extract-only ventilation with two speeds: the stop switch is the state, the speed switch picks low or high.

```yaml
type: custom:ha-appliance-card
appliance_type: hrv
hrv_layout: single
state_entity: switch.vmc_power
high_speed_entity: switch.vmc_speed
```

A dual-flow unit run by three relays, one boolean per speed, read on its power meter (#78):

```yaml
type: custom:ha-appliance-card
appliance_type: hrv
state_entity: sensor.vmc_power
speed_entities:
  - input_boolean.vmc_1
  - input_boolean.vmc_2
  - input_boolean.vmc_3
```

A sump pump on a smart plug left on:

```yaml
type: custom:ha-appliance-card
appliance_type: water_pump
pump_layout: sump
state_entity: switch.sump_plug
power_entity: sensor.sump_plug_power
power_on_threshold: 20
```

An electric ride on its charger (#72): the plug is enough. Above 40 W it is *Charging* (the current runs from the charger to the ride, the charger's light pulses red), below it *Charged* (green light), and *Unplugged* when the plug is off, the ride greyed out and the cable on the floor. The threshold is set with `power_on_threshold`.

```yaml
type: custom:ha-appliance-card
appliance_type: mobility
mobility_layout: offroad
state_entity: switch.workshop_plug
power_entity: sensor.workshop_plug_power
battery_entity: sensor.scooter_battery   # optional
```

</details>

### Robots and garden

<details>
<summary><b>Options</b></summary>

| Option | Types | Description |
|---|---|---|
| `irrigation_layout` | irrigation | `sprinkler` (a pop-up spray head on its lawn) \| `tap` (a tap timer on the garden tap, its hose and nozzle) \| `drip` (a raised vegetable patch whose drip line drips and darkens the soil) \| `flowers` (a flower bed and its two oscillating micro-sprayers). Left out, a name that says Gardena, LinkTap, Sonoff, tap or timer makes a tap timer, *drip*, *potager* or *vegetable* a vegetable patch, *massif* or *flower* a flower bed. |
| `tap_model` / `tap_wall` | irrigation | The tap timer: `generic` or `sonoff` (Sonoff's black and orange Zigbee valve, read in the name too), on a wall of `brick` (default), white `render`, or `none`, the tap then standing on a pipe out of the ground. |
| `watering_duration_entity` | irrigation | The watering's duration (Sonoff's own, a number or a helper): the bar fills as it runs. Without it, the bar comes from the time since the watering started and `remaining_time_entity`. |
| `zone_entity` / `next_run_entity` | irrigation | The zone being watered and the next run, as lines. `remaining_time_entity` shows the time left on the drawing while it waters. |
| `rain_delay_entity` | irrigation | A rain delay, on or a number of hours: *Rain delay*, the rain falling on the lawn. |
| `soil_moisture_entity` | irrigation | The soil moisture, in %: a gauge on a stake in the lawn, and a line, amber below 25 %. |
| `robot_layout` | robot | `vacuum` \| `mop` \| `combo` (a robot that vacuums and mops: brush, pad and water tank on the robot, a wet floor behind it, a station that washes and empties) \| `mower` \| `stick` (a stick vacuum on its wall dock) \| `floor_washer` (a wet and dry floor washer in its station). Left out, a name that says stick, cordless or Dyson makes a stick vacuum, Tineco or floor washer a floor washer, a `lawn_mower` entity or a name that says mower, Landroid or Automower makes a mower, Braava or mop a mopping robot, and combo, hybrid or 2-in-1 a robot that does both. `pool` draws a pool robot whose cable follows it, with its `remaining_time_entity` on its power supply; a name that says pool, Dolphin, Maytronics, Aiper, Zodiac or Polaris picks it. |
| `robot_station` | robot | `station` (default: the vacuum's emptying station, the mop's washing station) \| `box` (a rectangular station, Ecovacs, Dreame or Mova style: the robot half in its low bay, the dust bin behind its front panel, the water tanks' levels on the front) \| `base` (a charging base alone). |
| `robot_station_color` | robot | The rectangular station's colour: `white` (default) \| `black` \| `gold` (white with a gold front panel). |
| `robot_camera` | robot | `true` draws a camera module on the robot's bumper, scanning ahead while it works. |
| `robot_clean_mode_entity` | robot (combo) | What the robot is set to do, a `select` such as Dreame's cleaning mode. Vacuuming: the brush turns on a dry floor. Mopping: the brush stops, the pad is wet. Both, mopping after sweeping or nothing set: both at once, since the card cannot tell which step it is on. A mop intensity at `off` means vacuuming only. Also shown as a line. |
| `shortcut_entities` | robot | Your saved cleaning routines, one `button` per routine (Dreame's shortcuts), `input_button`s or `script`s, or a single `select`. One *Shortcut* line opens a menu with their names; picking one starts it. Up to 12. |
| `robot_clean_tank_entity` / `robot_dirty_tank_entity` | robot (vacuum, mop, combo) | The station's clean and dirty water tanks: a level in %, or a binary sensor on when the clean one is empty or the dirty one full. Shown as lines, the clean one flagged at 15 % or less and the dirty one at 85 % or more, and drawn on the station's front. |
| `mower_style` | robot (mower) | `classic` \| `navimow` (a Segway Navimow: grey shell, round chrome lid on a ring of light, big orange front wheels). Left out, a name that says Navimow or Segway draws one. |
| `robot_shelter` | robot | `true` draws a shelter over a mower's base. The rain stops on its roof. |
| `robot_shelter_style` | robot | `lean_to` (default, a wooden lean-to with a corrugated roof) \| `shell` (a moulded shell on one leg) \| `garage` (a back wall curving into a long roof over the mower, on a dark mat, like the Navimow or Husqvarna garages). |
| `robot_shelter_color` | robot | The colour of the shell or garage (black by default for the garage): `white` (default) \| `grey` \| `black` \| `green` \| `orange`. |
| `away_threshold` | robot | A stick vacuum or a floor washer read from the plug its dock is on: above `power_on_threshold` (5 W by default) it is *Charging*, below it *Charged*, and at `away_threshold` (1 W by default) or less *Off the base*, in use or badly seated, its dock drawn empty. The plug switched off reads *Off*, whether it is the state entity or the card's switch (`toggle_entity`). |
| `robot_floor` | robot | The floor a vacuum or a mop works on: `rug` (default for a vacuum) \| `tiles` (default for a mop) \| `parquet` \| `smooth`. |
| `robot_controls` | robot | `true` adds the robot's own buttons, on a `vacuum` or `lawn_mower` entity: *Start* away from work, *Pause* at work, *Return to base* away from it. `controls_always: true` shows all three all the time. |
| `battery_corner` | robot | `true` moves the battery from the lines to a corner of the card, as an icon and its percentage, orange at 20 % or less. A tap opens its entity. |
| `robot_status_entity` | robot | The integration's detailed status, read for what the drawing can show: the station emptying the bin, washing or drying the pads, rain keeping a mower home, an edge cut. The `status` attribute of a vacuum entity is read without it. |
| `battery_entity` | robot | The battery, in %, when the robot's own entity does not carry it. On the base, *Charging* below 100 %, *Docked* above. |
| `robot_bin_entity` / `robot_water_entity` | robot | A full bin, an empty water tank: a binary sensor that is on, a sensor that says so, or a tank level in % (empty at 5 % or less, its level drawn in the robot). |
| `robot_rain_entity` | robot | Rain keeping a mower on its base: a cloud and its rain over the lawn. |
| `robot_winter` / `robot_winter_entity` | robot | A mower put away for the winter: `true`, or any on and off entity (an `input_boolean`, an automation by date). It reads *Winter storage* whatever its integration says, unplugged included, under snow falling on its lawn, its base and itself, with no line. |
| `robot_error_entity` | robot | The error, worded: the robot puffs smoke and its text is shown. *no error*, *none*, `0` and the like are not errors, in any of the card's languages (*Aucune erreur*, *Keine Fehler*...), so a template sensor that words an error code works as it is. |

</details>

<details>
<summary><b>Robots and vacuums: robots, mowers, stick vacuums and floor washers</b></summary>

Read from Home Assistant's own `vacuum` or `lawn_mower` entity: *Cleaning*, *Mopping* or *Mowing*, *Returning to base*, *Paused*, *Stopped*, *Charging* then *Docked* once full, *Error*. The robot leaves its base and goes back and forth over its floor, a rug, tiles or a lawn whose grass is cut under the mower, and its ring takes the colour of its state. A detailed status says more: the station emptying the bin, washing or drying the pads, *Edge cutting*, *Rain delay*. A full bin or an empty tank turns it orange; an error makes it smoke, with an anger mark. Its lines give the battery, the water tank and the error's text.

```yaml
type: custom:ha-appliance-card
state_entity: lawn_mower.landroid
robot_status_entity: sensor.landroid_status
battery_entity: sensor.landroid_battery
robot_error_entity: sensor.landroid_error
robot_shelter: true
```

A stick vacuum or a floor washer is read from the plug its dock or station is on, and the cable runs with current while it charges. A floor washer's own integration (Tineco) says more: off the base while in use, *Self-cleaning* with bubbles in the station, a full dirty water tank, an empty clean one, a tangled brush as an *Error*.

```yaml
type: custom:ha-appliance-card
appliance_type: robot
robot_layout: floor_washer
state_entity: sensor.tineco_vacuum_status
battery_entity: sensor.tineco_battery
robot_bin_entity: sensor.tineco_waste_water_tank
robot_water_entity: sensor.tineco_fresh_water_tank
robot_error_entity: sensor.tineco_brush_roller
```

</details>

### Pets

<details>
<summary><b>Options</b></summary>

| Option | Types | Description |
|---|---|---|
| `filter_life_entity` / `filter_reset_entity` / `filter_due_below` | pet fountain | The filter's life left, on a line, and a reset button (a button, a switch or a script). Days, hours, minutes and seconds are counted in days, a percentage stays one, and a date (the next change) gives the days left until it. At or below `filter_due_below` (3 for days, 10 for percent by default) the state reads *Filter due*, and the line and the light turn orange. |
| `pump_clean_entity` / `pump_reset_entity` | pet fountain | The same for the pump: the time or the date until it wants cleaning, against the same threshold, and a reset button. The state reads *Clean the pump*. |
| `pump_running_entity` | pet fountain | The pump, when the integration reads it apart from the power (Petkit's *Pump running*, Xiaomi's *watering* status): the water runs only while both say so. A *Pump last ran* line says when it last stopped, or *Running*. |
| `water_level_entity` / `level_empty_below` | pet fountain | The water left: a percentage, which fills the tank on the drawing; a word (`low`, `lack`, `shortage`, `level_1`… or `normal`, `medium`, `full`); or a contact, on when it runs low, or on while there is water for a moisture contact (Petlibro). A number in another unit (a level from 1 to 4, millilitres) is only read against `level_empty_below` when it is set. At or below `level_empty_below` (10 by default) the state reads *Low water*, in red, ahead of everything else: a dry pump burns out. The jet then stops, as it does with the pump off, and the plate runs dry. |
| `litter_layout` | litter_box | `globe` (a globe that turns on its base, Litter-Robot style) \| `box` (a closed box with a round entrance, Petkit Pura style). Left out, a name that says Petkit, Pura or box makes a box. The state is read in words or in Litter-Robot's codes (`rdy`, `ccp`, `cst`, `dfs`...): *Ready*, *Cleaning* (the full cycle: the globe or the drum turns, the litter stays flat at the bottom and the clumps are sifted out, then it levels and comes back), *Cat inside*, *Drawer full*, *Fault*. |
| `waste_drawer_entity` / `litter_level_entity` | litter_box | The waste drawer's fill and the litter level, in %: a gauge on the drawer and lines, amber from 80 % full or 20 % of litter left. |
| `pet_weight_entity` / `visits_entity` / `last_use_entity` | litter_box | The cat's weight, today's visits and the last use, as lines. |
| `cat_present_entity` | litter_box | A sensor that sees the cat: *Cat inside*, the cat in the doorway. |
| `feeder_layout` | pet feeder | `tower` (default, a square tank on its base) \| `canister` (a round tank on a round base) \| `double` (two outlets and two bowls) \| `dual_split` (two hoppers over one bowl split down the middle) \| `rotary` (plates on a turntable under a lid, for wet food). |
| `fountain_layout` | pet fountain | `square` (default, a square tank with a window on the water) \| `round` (a round drum with a steel rim, the light at the foot of the front). |
| `level_b_entity` | pet feeder | The second hopper's level, on a feeder with two (`dual_split`), read like `level_entity` and against the same `level_empty_below` and `level_max`. It fills the right-hand window, gets its own line, and empty it turns the state to *Tank empty* and leaves only its own half bare. At rest the state line shows the lower of the two levels, the hopper to refill first. The editor offers it only for `dual_split`. |
| `portions_today_entity` / `weight_today_entity` | pet feeder | What was served today, on one line. Without a weight entity the card works the grams out from `portion_weight_entity`, so nothing is assumed about the size of a meal. |
| `serving_size_entity` / `portion_weight_entity` | pet feeder | How many portions a serving holds, and what one weighs. |
| `schedule_entity` | pet feeder | The feeding plan, as the integration words it, on a line that wraps. |
| `last_feed_entity` | pet feeder | A timestamp of the last meal, when the integration gives one. Otherwise the card finds it: a `script` says when it last ran, whatever asked it to, a `button` carries the time of its last press, and the day's counter moves on every meal the feeder serves, including the ones it serves on its own schedule. |
| `level_entity` / `level_empty_below` / `level_max` | pet feeder | What is left in the tank: a percentage, which fills the hopper on the drawing and reads on the state line at rest (*Tank at 74%*), or a contact that only says *empty*. At or below `level_empty_below` (default 0) the state reads *Tank empty*, in orange, and the hopper is drawn empty, in the reading's own unit. A tank counted in grams or in litres fills the hopper, and gives its percentage, once `level_max` gives its capacity. |
| `error_entity` | pet feeder | Turns the state to *Error*, and to *Tank empty* when the error names itself (`no_food`, `empty`, and the same word in the other languages). A fault code counts as an error on any value but zero. |
| `state_entity` | pet feeder | Optional: a feeder is idle nearly all the time, so a control or a counter is a complete configuration. When it does report, *on* reads as *Dispensing* and the kibble falls. |

</details>

<details>
<summary><b>Pet feeders</b></summary>

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

An automation or an `input_button` works as a control too, and a `utility_meter` makes a fine counter: `portions_today_entity` takes whatever counts the meals, and the day's total is read where the integration keeps it.

A feeder that never says it is serving, like Aqara's C1 over Zigbee2MQTT, is drawn *Dispensing* for 30 seconds after the card's button is pressed, and when its portions or its weight of the day go up, whoever served the meal.

Three entities read as well as ten: a line only exists when its entity answers.

Three models are drawn, after the feeders people buy: a square tank with a window on its kibble, a round tank, each with a steel bowl set in its base, and a double whose two spouts feed a bowl each. The window fills to the level, the kibble drops into the bowl while a meal is served, and an empty tank leaves both bare. The small screen shows the time in green like the real ones, turns blue while the feeder serves, showing the portion when `serving_size_entity` is set, and red on an empty tank or an error. The child lock and the automatic lock go in the top corners, each showing whether it holds:

```yaml
feeder_layout: canister
corner_entities:
  - switch.feeder_auto_lock
  - switch.feeder_child_lock
```

Two more cover feeders that do not fit those three. `dual_split` has two hoppers side by side, say snacks on the left and kibble on the right, each with its own outlet over its own half of one wide bowl. Each hopper reads its own level, and one running empty leaves only its window and its half of the bowl bare:

```yaml
feeder_layout: dual_split
state_entity: binary_sensor.feeder_dispensing
level_entity: binary_sensor.feeder_hopper_1_low
level_b_entity: binary_sensor.feeder_hopper_2_low
```

`rotary` is a wet-food feeder: plates on a turntable under a lid with one opening. Serving opens it, so the state entity is whatever says the lid is open, and while it serves the turntable brings the next plate into the opening. Its level is the plates left, counted out of the plates it holds:

```yaml
feeder_layout: rotary
state_entity: switch.wet_feeder_lid
level_entity: counter.wet_feeder_plates_left
level_max: 3
```

</details>

<details>
<summary><b>Pet fountains</b></summary>

A fountain runs all day, so like a feeder it is read rather than run. While the pump runs the water wells up in a dome over the outlet, rings spread across the steel plate and drops spray off its edges, from a switch or the plug the fountain sits on. What it says otherwise is what needs a hand: the water first, then the filter, then the pump, each taking the state line and the light ring under the plate over, orange with a filter badge for the filter and the pump, red and blinking with a warning badge for the water.

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

A fountain that does not know its water level keeps the tank at a resting height on the drawing rather than reading as empty. One that is offline reads *Offline*, with no light and its water drawn grey.

The pump's state is read in the words of the fountain integrations, so a mode works as well as a switch: what stops it first (`off`, `Do not flow`, `closed`, `waterless`), then what runs it (`on`, `flowing`, `constant`, `intermittent`, `smart`, `auto`, `motion`, `open`…).

| Integration | Pump or mode | Water | Filter and pump |
|---|---|---|---|
| Petkit ([Jezza34000](https://github.com/Jezza34000/homeassistant_petkit), [RobertD502](https://github.com/RobertD502/home-assistant-petkit)) | Power switch; *Pump running* in `pump_running_entity`; `Continuous`, `Intermittent`, `Motion activated` | *Water lack warning*, or `normal`/`low`/`empty` | Filter in % or days, next flush as a date |
| Xiaomi ([xiaomi_miot](https://github.com/al-one/hass-xiaomi-miot), Xiaomi Home) | Switch; `Common`/`Smart`, `Auto`/`Interval`/`Constant`; status `watering`/`waterless` | No-water or water-shortage contact | Filter and cleaning in days or hours |
| Petlibro | `Flowing Water (Constant)`, `Intermittent Water (Scheduled)`, `Off` | Weight in %, or the water-state moisture contact | Filter and cleaning days |
| Catlink | `Flowing mode`, `Eco-mode`, `Smart mode` | Water level in % | Filter life in % |
| Tuya, tuya-local | Switch or valve (`open`/`closed`); `normal`, `smart`, `night`, `motion` | `level_1`…`level_3`, `low`/`medium`/`full`, or a contact | Filter and pump in minutes or days; reset switches |

</details>

### Energy and electric rides

<details>
<summary><b>Options</b></summary>

| Option | Types | Description |
|---|---|---|
| `battery_entity` / `battery_low` | UPS | The battery's charge, in %: the gauge on the UPS fills by fifths, orange at 40 % or less, red at `battery_low` (20 % by default) or less. On battery, at that level or with NUT's `LB`, it reads *Battery low*. |
| `runtime_entity` | UPS | The time left on the battery, in seconds as NUT gives it, or in minutes or hours: a line, and the UPS's screen while on battery. |
| `load_entity` / `nominal_power` | UPS | The load, in %: the energy flows faster as it grows, and 100 % or more is an *Overload*. With `nominal_power` (in W) and no `power_entity`, the line gives it in watts too. |
| `input_voltage_entity` | UPS | The voltage at the wall, as a line. Without a `state_entity`, below 100 V the UPS is on battery. |
| `mobility_layout` | electric ride | `scooter` \| `offroad` (an off-road scooter on double suspension, like the Ausom DT2 Pro) \| `ebike` \| `gyropode` \| `motorcycle`. Left out, it is read in the name: Ausom, Dualtron or off-road, bike or e-bike, gyropode, moto or Super Soco; a scooter otherwise. |
| `battery_entity` | electric ride | The ride's battery, in %: one bar of the gauge per quarter, the next one blinking while it charges, and *Charged* at 100 %. Without it, the bars fill from 0 to 4 in a loop while it charges. |
| `meter_layout` | meter | `linky` \| `box` (a digital electricity meter) \| `dome` (a round North American meter under its glass) \| `gas` (a diaphragm gas meter and its drums) \| `water` (a brass water meter, its drums, litre dials and star). Left out, a gas or water device class or name picks the gas or the water meter, a Linky otherwise. Its `state_entity` is either a rate (W, kW, m³/h, L/min), on the display and as a line, or an index (kWh, m³, L), on the drums, in use while it moved in the last two minutes. |
| `tariff_entity` | meter | The tariff period (BASE, HP, HC, a Tempo colour), on the display and as a line. |
| `today_entity` / `total_entity` | meter | Today's use (a `utility_meter` or the integration's own), and the index when the state is a rate, as lines and on the meter. |
| `high_power` | meter | From this power the meter reads *High use* and its LED beats fast. 3000 by default, in the unit of the state entity (VA or W). |
| `export_total_entity` | meter | The export register (kWh) of an electricity meter, as an *Export index* line. |
| `meter_direction` | meter | `auto` (default): power below zero is fed in, the meter reads *Feeding in* with a green LED \| `import`: a meter that only draws, a negative reading counts as no use \| `export`: a meter that only feeds in, whatever the sign. At 0 W an electricity meter reads *No use*. \| `inverted`: a meter counted the other way round, positive is fed in (GoodWe's `active_power`) |
| `range_entity` / `vehicle_lock_entity` | electric ride | The range left, and the lock: *Unlocked* in amber. |
| `power_entity` | solar | The power the panels produce, in W or kW: *Producing* above 15 % of `peak_power` (100 W without it), *Low production* below it in daylight, *Night* once the sun has set (`sun.sun`, or no power at all without it). The `state_entity` is optional: an inverter's status, whose words for a fault make an *Error*. |
| `peak_power` | solar | The panels' peak power, in W, which the *Low production* threshold is taken from. |
| `energy_today_entity` | solar | The energy produced today, shown as a line. |
| `solar_layout` | solar | `ground` (default, two panels on their frame) \| `roof` (a house with its panels on the roof). |
| `solar_alert_entity` | solar | Anything that should raise the *Error*: the inverter smokes. |
| `battery_entity` | home battery | The level, in %. It fills the gauge and the screen, and at 10 % or less the battery is *Low battery*, in red. |
| `power_entity` / `power_inverted` / `power_on_threshold` | home battery | One power, positive while it charges and negative while it discharges, or the other way with `power_inverted: true`. Powerwall, Fronius and Sonnen report it the other way: the card reads them so on its own, and `power_inverted: false` overrides it. Under `power_on_threshold` (10 W by default) either way, it is *Idle*, and *Full* at its charge limit. |
| `charge_power_entity` / `discharge_power_entity` | home battery | What goes in and what comes out, for the batteries that measure them apart (EcoFlow, Bluetti), in place of `power_entity`. |
| `reserve_entity` / `charge_limit_entity` | home battery | The backup reserve, drawn as a dashed line on the gauge and shown as a line, and the charge limit, *Full* once reached. |
| `battery_capacity` | home battery | The capacity, in kWh: with it the lines say how long until full, or until the reserve. |
| `battery_layout` | home battery | `wall` (a battery on the wall) \| `station` (a portable station). Left out, a name that says EcoFlow, Delta, Bluetti, Jackery, Anker or station makes a station. |
| `battery_alert_entity` | home battery | Anything that should raise the *Error*: a BMS fault. A state that says fault does the same. |
| `state_entity` | EV charger | The charger's status: *No vehicle*, *Plugged in*, *Awaiting authorisation*, *Charging*, *Discharging*, *Charging paused*, *Scheduled*, *Charging complete*, *Error* or *Offline*, read in the words of OCPP and of the integrations in Home Assistant (see *EV chargers*). `state_map` accepts the ten as `no_vehicle`, `connected`, `awaiting_auth`, `charging`, `discharging`, `paused`, `scheduled`, `done`, `error` and `offline`. Optional: without it the plug and the power meter say it. |
| `vehicle_entity` | EV charger | Whether a car is plugged in: a plug's contact, or a cable state in words (`disconnected`, `cable_only`, `vehicle_connected`, `vehicle_locked`). No car turns a recognised status into *No vehicle*, unless the status is an error. |
| `power_entity` / `power_on_threshold` | EV charger | The power, in the meter's own unit and precision (*7.4 kW*). The threshold is in W whatever that unit, 100 W by default: power flows above it. It only stands in for a missing status, and tells a car that has its charge from one that paused. |
| `session_energy_entity` | EV charger | The energy of the session, as *Charged 12.4 kWh*. |
| `discharge_power_entity` | EV charger | The power the car gives back (V2H, V2G), such as OCPP's `Power.Active.Export`, as *Discharge 7.4 kW*. Above `power_on_threshold`, the car is *Discharging* (see *Bidirectional charging*). |
| `current_limit_entity` | EV charger | The current limit, as *Current limit 16 A*. A tap opens the entity, which is where it is changed. |
| `error_entity` | EV charger | A contact on, a code other than 0, or a word other than *no error* (OCPP's `NoError`, `ok`, `none`) turns the state into *Error*, with the charger's words on a line. |

</details>

<details>
<summary><b>Solar panels and home batteries</b></summary>

Solar panels on their frame on the ground, or on the roof of a house. In production a gleam runs over the cells and the energy runs down the cable to the inverter, faster when the sun is strong; with little power a few clouds pass, and at night the moon and the stars are up. The power and the energy of the day are shown as lines.

```yaml
type: custom:ha-appliance-card
appliance_type: solar
power_entity: sensor.solar_power
energy_today_entity: sensor.solar_energy_today
peak_power: 800
solar_layout: roof
```

A home battery on the wall, or a portable station. Its gauge fills with its level, the energy comes in green while it charges and goes out orange while it discharges, and the screen shows the percentage. The reserve is a dashed line on the gauge, and with `battery_capacity` the lines say how long until full or until the reserve. `illustration_color` paints its casing.

```yaml
type: custom:ha-appliance-card
appliance_type: home_battery
battery_entity: sensor.delta_pro_battery_level
charge_power_entity: sensor.delta_pro_total_in_power
discharge_power_entity: sensor.delta_pro_total_out_power
reserve_entity: number.delta_pro_backup_reserve_level
battery_capacity: 3.6
battery_layout: station
```

</details>

<details>
<summary><b>UPSes</b></summary>

A UPS between the wall socket and the box it protects, with its screen, its three lights and its battery gauge. Its `state_entity` is NUT's status sensor, the one that reads `OL`, `OB DISCHRG` or `OL CHRG`, or the integration's text sensor (*Online*, *On Battery*): *On mains* with the energy flowing from the wall through the UPS, *charging* while it fills its battery; *On battery* once the mains is gone, the wall crossed out, the UPS beeping and its screen counting the time left; *Bypass* and *Off*. `LB` or a low charge on battery, `OVER` or a load of 100 %, and `RB` raise *Battery low*, *Overload* and *Replace battery*. The battery, the runtime, the load and the input voltage are lines. Home Assistant's NUT integration leaves `battery.runtime` disabled: enable it to get the time left.

```yaml
type: custom:ha-appliance-card
appliance_type: ups
state_entity: sensor.ups_status
battery_entity: sensor.ups_battery_charge
runtime_entity: sensor.ups_battery_runtime
load_entity: sensor.ups_load
input_voltage_entity: sensor.ups_input_voltage
nominal_power: 520
```

</details>

<details>
<summary><b>EV chargers</b></summary>

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

</details>

### Network, screens and 3D printers

<details>
<summary><b>Options</b></summary>

| Option | Types | Description |
|---|---|---|
| `state_entity` on a 3D printer | 3D printer | The printer's status, as each integration sends it: `current_state` (OctoPrint), the printer's own sensor (PrusaLink), `print_status` (Bambu Lab, Creality), `current_print_state` (Moonraker, Klipper), `current_status` (Elegoo), `machine_status` (Flashforge), `job_state` (Anycubic). It reads *Printing*, *Preparing*, *Preheating*, *Paused*, *Needs attention*, *Finished*, *Cancelled*, *Failed*, *Error*, *Idle* or *Offline*. Most integrations say *printing* from the moment the start code heats up: while a heater is still more than 5 °C below its target and the part has not started, the card reads *Preheating* and the bar becomes a heating gauge. Outside a job the remaining time is hidden, since a printer keeps its last one. |
| `phase_entity` | 3D printer | What the job is busy with: Bambu Lab's `current_stage`, Elegoo's `print_status`. It reads *Preheating*, *Bed levelling*, *Changing filament*, *Cooling*, *Calibrating* or *Homing* during a job. |
| `program_entity` | 3D printer | The print file, without its folder or its slicer extension. |
| `nozzle_temperature_entity` / `nozzle_target_entity` / `bed_temperature_entity` / `bed_target_entity` / `chamber_temperature_entity` | 3D printer | Nozzle, bed and chamber, shown as *219 °C → 220 °C* until the target is reached. A target is a sensor or a `number` (Moonraker, Elegoo); without one, the card reads a `target` attribute on the reading (Creality). The nozzle temperature shows on the printer's screen, and a heater with a target glows. |
| `current_layer_entity` / `total_layers_entity` | 3D printer | The layer, as *84 / 190*. |
| `printer_layout` | 3D printer | `enclosed` (default: a chamber whose bed drops as the part grows) \| `open` (an open frame whose gantry climbs). The part grows with the progress, in the state's colour, and the head moves while it prints. |
| `printed_part` | 3D printer | The part on the bed: `cube` (default), `pyramid` or `duck` (a rubber duck). It shows from the bottom up as it prints. |
| `printer_style` | 3D printer | The printer drawn: `bambu_x` (enclosed, Bambu Lab P1S or X1 style) \| `elegoo_c` (enclosed, Elegoo Centauri style) \| `bambu_a` (open, Bambu Lab A1 style) \| `elegoo_n` (open, Elegoo Neptune style) \| `classic` (the simple drawing, which follows `printer_layout`). Left out, the model in the entity or the name picks it (`p1s`, `x1c`, `bambu`, `a1`, `centauri`, `neptune`), unless `printer_layout` says otherwise. The enclosed ones lower their bed as the part grows, on the open ones the gantry climbs. |
| `ams_entities` | 3D printer | A filament box, up to 4 spools, one entity each. Its color, whether it is empty and whether it is the active one come from attributes: `color`, `empty`, `active` on Bambu Lab, `filament_color_hex` on Spoolman. A spool without a color is grey. Beside the printer, a tube carries the active spool's color to its roof. |
| `ams_position` | 3D printer | Where the box goes: `side` (default, the card needs the width) \| `top` (on the printer, better on a narrow card). |
| `ams_humidity_entity` / `ams_drying_entity` | 3D printer | The box's humidity, as a line, and whether it is drying: heat strokes above it and a line. |
| `screen_layout` | screen | `tv_feet` (default, a TV on two feet) \| `tv_stand` (a TV on a central stand) \| `tv_wall` (a wall-mounted TV) \| `projector` (a projector under its screen) \| `computer` (a monitor and its tower) \| `laptop` (an open laptop, its battery and charger read as a tablet's) \| `tablet_wall` (a wall tablet on its flat mount) \| `tablet_frame` (a tablet in a wooden frame, hung like a picture) \| `tablet_portrait` (an upright tablet with a light bar on top). Left out, a name that says projector, computer, laptop (MacBook, ThinkPad, notebook...) or tablet picks the model, and so does a `lock_entity`, or one of a tablet's fields below. |
| `screen_image` | screen | The picture a lit screen shows: `random` (default, a new one each time it comes on) or one of `sunset`, `aquarium`, `bars`, `football`, `space`, `bounce`, `desktop`, `code`, `pong`, `dashboard`. A tablet shows `dashboard` by default. A player that sends a cover shows it instead while it plays. |
| `media_entity` / `media2_entity` / `media3_entity` | screen | Up to three `media_player` entities that show something on this screen: the TV itself, and the box or console that actually has the picture. The card follows the one that plays, then the one paused, then the one on its home screen, then the one on; on a tie, the first. Its line names it and gives the app or source, the title, and *Muted*. Without a power meter, the players also say whether the screen is off, on standby or on. |
| `lock_entity` | screen | A computer's session lock: a `lock`, a `binary_sensor` of the lock class (off means locked) or a sensor that reads `locked`, as HASS.Agent, Go Hass Agent or the macOS app report it. Locked, the screen shows a padlock. |
| `source_entity` | screen | The screen's input: a `select` / `input_select` (such as a monitor's *Input source*) or a `media_player`, whose source list is used. The card shows the current input on a line and adds a button that opens the list to pick another. |
| `screensaver_entity` | screen (tablet) | The tablet's screensaver, such as Fully Kiosk's *Screensaver* switch. On, the card says *Screensaver* and draws a clock on the glass. As a switch, it also gets a button. |
| `laptop_style` | screen (laptop) | `classic` (a PC: thicker, the numeric keypad, the trackpad with its two buttons) \| `thin` (MacBook style). Left out, a name that says MacBook draws the thin one, anything else the classic one. |
| `laptop_color` | screen (laptop) | The laptop's colour: `silver` \| `space_grey` \| `black` \| `midnight` \| `gold` \| `rose`. Left out, the classic one is black and the thin one silver, unless `illustration_color` is set. |
| `charging_entity` | screen (tablet, laptop) | On its charger: a `binary_sensor` such as Fully Kiosk's *Plugged in*, or a sensor that reads `charging` or `full`. The cable and a bolt show while it charges, and the state says so. |
| `motion_entity` | screen (tablet) | What its front camera sees: on, the camera lights blue, and so does the light bar of the upright tablet. |
| `url_entity` | screen (tablet) | The page it shows, such as Fully Kiosk's *Current page*: the card keeps the path, without the address. |
| `brightness_entity` | screen (tablet) | Its brightness: a `number` of 0 to 255 as Fully Kiosk gives it, a percentage, or a light. |
| `last_interaction_entity` | screen (tablet) | When it was last touched: a timestamp sensor, or any entity whose last change is that moment. |
| `reload_entity` | screen (tablet) | A button that reloads its page, such as Fully Kiosk's *Load start URL*. |
| `restart_entity` | screen (tablet) | A button that restarts its app, such as Kiosk Satellite's *Restart app*. |
| `screenshot_entity` | screen (tablet) | A `camera` or `image` of its screen, such as Kiosk Satellite's *Screenshot*: shown on the glass instead of the drawn dashboard while the dashboard is on. |
| `tower_entity` | screen (computer) | The tower on a second plug: a `switch` adds a *Tower* button, a power `sensor` a *Tower* line. The tower's LED follows it, and the card reads *Tower on* while the monitor sleeps. |
| `battery_entity` | screen (tablet, laptop) | Its battery, shown in a corner of the card, orange at 20 % and below. |
| `network_layout` | network | `switch` \| `server` \| `nas` \| `rack` \| `router`. Left out, a name that says NAS, Synology, QNAP, Unraid, switch, server, rack, router, modem, Bbox, Livebox, Freebox or FRITZ!Box picks the model, disks make it a NAS, and a router's own fields make it a router. |
| `switch_ports` | network | The ports drawn on a switch: `8`, `16`, `24` or `32`. Left out, the smallest one that holds `ports_total`. |
| `ports_entity` / `ports_total` | network | The ports in use, and how many the switch has: one LED per port in use, in proportion past 32. Shown as *24/32*. |
| `poe_entity` | network | The PoE power drawn, added to the ports line. |
| `download_entity` / `upload_entity` | network | The traffic, in any unit (B/s, kB/s, MiB/s, Mbit/s…). Above `busy_threshold` (10 Mbit/s by default) the device is *Busy*. |
| `cpu_entity` / `memory_entity` / `volume_entity` | network | Processor and memory use, in %, and the volume used. A processor above 80 % is *Busy*. |
| `temperature_entity` | network | The device's temperature. At `temperature_alert` (70 °C by default) or above it is in *Alert*. |
| `fan_speed_entity` | network | A fan's speed: at 0 rpm the drawn fan stops. |
| `problem_entity` | network | Anything that should raise the *Alert*: a security status, a health sensor. |
| `clients_entity` | network (router) | How many clients are connected, as a line. |
| `wan_entity` | network (router) | The internet link, a connectivity sensor or a status that says `online` / `offline`: when it is down the router reads *No internet*, in alert. |
| `wifi_entity` | network (router) | The Wi-Fi, a switch: switched off, the waves stop rising from the antennas and the Wi-Fi light goes dark. |
| `disk1_entity` … `disk4_entity` / `bays` | network | One entity per disk, any of its own: the card reads all of them. Its LED is green when fine, blue while it reads or writes, dim while asleep, orange when to watch, red when it fails. `bays`: `1`, `2` or `4` bays drawn on a NAS, an empty bay has no tray. |

### Filament dryer

A filament dryer from the front, its spools standing side by side on their rollers, as wide as it holds. *Drying* from a switch, a smart plug (`power_entity`, above 15 W) or a sensor that says it.

| Option | Description |
|---|---|
| `spool_count` | How many spools it holds: `1`, `2` (default) or `4`. |
| `spool_colors` | Their colors, as a list of hex values such as `"#43a047"`. |
| `temperature_entity` / `humidity_entity` | Shown as lines and on its screen. |
| `remaining_time_entity` | The time left, while it dries. |

</details>

<details>
<summary><b>Screens: TVs, projectors, computers and wall tablets</b></summary>

Read from its smart plug: *Off* at 0 W (half a watt still counts as nothing), *Standby* up to `power_on_threshold` (20 W by default), *On* above it. On standby the light glows and the power line says what the standby costs; on, the screen shows a picture drawn at random, or the one set in `screen_image`. Without a meter, a `binary_sensor` as `state_entity`, a ping for instance, says *On* or *Off* by itself; a plug's switch only says it has power, so a box on standby then says *Standby*. Add the players that show something on it and the card says *Playing*, *Paused* or *Home screen*, with the app and the title. Five models: a TV on feet, on a stand or on the wall, a projector, a computer. Watch the bouncing logo long enough and it lands in a corner.

A wall tablet that shows a dashboard has three models of its own: flat on its mount, in a wooden frame, or upright with a light bar. Its screen switch, or the light Kiosk Satellite gives for it, says *Dashboard* or *Screen off*, its screensaver *Screensaver* with a clock on the glass. Its cable only hangs from it while it charges, its front camera lights when it sees someone, and its battery sits in a corner. Its screenshot, given as a camera, replaces the drawn dashboard. Buttons for the screen, the screensaver, a reload of the page and a restart of the app show for the entities given.

```yaml
type: custom:ha-appliance-card
appliance_type: screen
screen_layout: tv_wall
state_entity: switch.tv_plug
power_entity: sensor.tv_plug_power
power_on_threshold: 30
media_entity: media_player.lg_tv
media2_entity: media_player.apple_tv
```

```yaml
type: custom:ha-appliance-card
appliance_type: screen
screen_layout: tablet_frame
name: Hall tablet
state_entity: switch.hall_tablet_screen
screensaver_entity: switch.hall_tablet_screensaver
charging_entity: binary_sensor.hall_tablet_plugged_in
motion_entity: binary_sensor.hall_tablet_motion
battery_entity: sensor.hall_tablet_battery
url_entity: sensor.hall_tablet_current_page
brightness_entity: number.hall_tablet_screen_brightness
reload_entity: button.hall_tablet_load_start_url
```

</details>

<details>
<summary><b>Network: switches, servers, NAS and racks</b></summary>

Read from whatever it reports. Its `state_entity`, a ping, a router's tracker or a status, says *Online* or *Off*. Traffic above 10 Mbit/s, a busy processor or a disk at work make it *Busy*; a problem, a failed disk or a temperature of 70 °C make it *Alert*, and every LED turns red while the fan starts and stops. A disk to watch says so in orange. Its lines give the traffic, the load, the volume and the ports. In the editor, the card finds the readings on the device and on the devices that hang from it, disks included (Synology, UGREEN, Unraid, Glances). Five models: a switch of 8 to 32 ports, a server tower, a NAS of 1 to 4 bays, a rack, a router.

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-network-models.gif" alt="Switches of 8 to 32 ports and NAS of 1 to 4 bays">

```yaml
type: custom:ha-appliance-card
appliance_type: network
network_layout: nas
state_entity: device_tracker.nas
cpu_entity: sensor.nas_cpu_utilization_total
volume_entity: sensor.nas_volume_1_volume_used
download_entity: sensor.nas_download_throughput
disk1_entity: sensor.nas_drive_1_status
disk2_entity: sensor.nas_drive_2_status
```

</details>

### Around the house

<details>
<summary><b>Options</b></summary>

| Option | Types | Description |
|---|---|---|
| `weight_goal_entity` / `weight_goal` | scale | The weight goal, from a sensor or as a number (the sensor wins): a *Goal* line with what is left to lose or to gain, and *Goal reached* within half a unit. |
| `fat_ratio_entity` / `fat_mass_entity` | scale | Body fat, in % and in mass, on one *Fat* line. |
| `muscle_mass_entity` / `bone_mass_entity` | scale | Muscle and bone mass, as lines. |
| `camera_layout` | camera | `indoor` (a pan and tilt camera) \| `tube` (Netatmo Welcome) \| `outdoor` (a battery camera like an Arlo, on its wall bracket) \| `dome` (on the ceiling) \| `doorbell` (a video doorbell). Left out, a camera with a `ring_entity` or a name that says doorbell is a doorbell, a Netatmo indoor camera is a tube, a name that says dome a dome, and a name or a brand that says outdoor, garden, front, back, Arlo or spotlight an outdoor camera. |
| `ring_entity` | camera | The doorbell's button: a binary sensor on while it is pressed (Reolink's *visitor*), or an event entity (Ring, Nest, UniFi Protect), *Ringing* for 30 seconds after its last `ring`. The ring of light beats, then a *Last ring* line. |
| `motion_entity` | camera | A motion sensor: *Motion detected* while it is on, orange waves in front of the lens, then a *Last motion* line. A count above zero (Frigate) also means motion, and an `event` entity (Nest, Ring) means motion for 30 seconds after it fires. |
| `recording_entity` | camera | A recording sensor, for the integrations whose camera entity does not say *recording*. |
| `night_entity` | camera | The infrared mode: the ring of LEDs around the lens glows red, and a *Night vision* line. |
| `privacy_entity` | camera | A privacy switch (Reolink, Tapo): on, the camera is *Off*, its head bowed or its shutter closed. Netatmo's `monitoring` attribute does the same. Set it as `toggle_entity` too for a button. |
| `signal_entity` / `battery_entity` | camera | The Wi-Fi signal and the battery, as lines. An Arlo camera's own attributes are read without them. |
| `lamp_layout` | lamp | `bulb` \| `bedside` \| `floor` (an arc floor lamp) \| `torch` (a halogen torchiere, its light going up) \| `pendant` \| `strip` (a LED strip under a shelf) \| `spot` (recessed spots) \| `panels` (Nanoleaf-style panels) \| `desk` \| `wall` (a lantern on an outside wall) \| `garden_spot` (a spotlight on its spike, lighting a shrub) \| `bollard` (a small garden post along a path) \| `string` (Twinkly-style string lights) \| `curtain` (a light curtain in a window) \| `icicle` (icicle lights under a gutter) \| `festoon` (big bulbs on swags) \| `squares` (pixel squares, Twinkly Squares style). String, curtain and icicle lights twinkle while on, and with an effect each bulb takes its own hue. Left out, it is read from the name and the model: strip, WLED or Govee makes a strip, Nanoleaf or panel panels, bedside a bedside lamp, desk a desk lamp, halogen or uplight a torchiere, floor or arc a floor lamp, spot or GU10 spots, pendant or chandelier a pendant, Twinkly, fairy or string lights a string (curtain, icicle, festoon and Twinkly Squares their own shape), a garden spot or spike a garden spotlight, bollard or path light a garden post, wall, outdoor or garden a lantern; a bulb otherwise. |
| `mailbox_layout` | mailbox | `through` (through the wall, seen from the side, a door on each face) \| `through_3d` (the same box in three-quarter view: the street door with its letter flap, lock and name plate, the letters lying inside when it opens, the house door at the back) \| `classic` (a box on its post, seen from the front). Left out, a `back_door_entity` makes it a through-the-wall box. |
| `mailbox_color` | mailbox | In three-quarter view: `anthracite` (default) \| `white` \| `grey` \| `green` \| `brown`. |
| `mailbox_front` | mailbox | `left` (default) \| `right`: the side the street is on, for a through-the-wall box. |
| `mail_count_entity` | mailbox | A counter of the mail. The pile shows up to twelve letters, and the count is a line and a badge. |
| `mail_present_entity` | mailbox | Whether mail is inside: on when it arrives, off once collected (an `input_boolean` your automations set). Off, the box reads *Empty* with no letter and no badge, whatever a counter of the day still says; the count stays a line. |
| `front_door_entity` / `back_door_entity` | mailbox | The contacts on the street door and on the house door: *Front door open*, *Back door open*, the door swings open and daylight comes in, and a line for each. |
| `tree_palette` | christmas_tree | `multicolor` (default) \| `red_gold` \| `red_silver` \| `gold_silver` \| `blue_silver` \| `white_silver` \| `red_green`: the baubles, the lights, the tinsel, the star, the pot and the presents. |
| `presents` | christmas_tree | `auto` (default, presents under the tree on 24 and 25 December only) \| `show` \| `hide`. |
| `detector_layout` | detector | `smoke` (a smoke detector on the ceiling) \| `co` (a CO alarm on the wall, its display in ppm) \| `leak` (a leak sensor on the floor). Left out, the device class picks it (`smoke`, `carbon_monoxide` or `gas`, `moisture`), or the name. On is an alarm: the smoke rises to the ceiling, the CO display turns red, the water drips into a puddle. |
| `battery_entity` | detector | The battery, in % or as a low-battery sensor: a line, and the light turns amber at 20 % or less. |
| `test_entity` | detector | A button, script or switch that runs the alarm test: a *Test* button on the card. |
| `co_level_entity` | detector | The CO level, on the alarm's display and as a line. |
| `speaker_layout` | speaker | `smart` (HomePod) \| `homepod_mini` \| `sonos_one` \| `sonos_era100` \| `sonos_era300` \| `sonos_move` \| `soundbar` (Sonos Arc or Beam, under its TV) \| `bose_wave` (Wave SoundTouch) \| `bose_500` (Home Speaker 500) \| `bose_soundlink` (SoundLink Flex) \| `bose_soundbar` (Smart Soundbar, under its TV) \| `sonos_five` \| `sonos_play` \| `sonos_roam` \| `sonos_ray` (under its TV) \| `sonos_amp` \| `sonos_port` \| `bose_ultra` (Lifestyle Ultra) \| `bose_portable` (Portable Smart Speaker) \| `bose_amp` (Music Amplifier) \| `bookshelf` \| `echo_dot` \| `echo_dot_max` \| `nest_mini`. Left out, it is read in the name, then in the model of its device: HomePod mini, Era 100, Era 300, Move, Five, Play, Roam, Ray, Amp, Port, Arc, Beam, Lifestyle Ultra, Portable, Music Amplifier, Echo Dot Max, Wave, SoundLink, Flex, another Bose. The state is a `media_player`: what it plays, the artist, the source and the volume are lines. |
| `speaker_color` | speaker | `white` \| `black` \| `silver` \| `yellow` \| `orange` \| `blue`, each model in the colours it is sold in: a HomePod white or midnight, a HomePod mini in all five, a Sonos white or black, a Bose 500, Portable or Wave silver or black, a Lifestyle Ultra black or sand (`white`), an Echo Dot charcoal, white or blue, an Echo Dot Max white or black, a SoundLink black, white or blue. Left out, a colour in the name picks it (a HomePod named *white*), then `illustration_color`; otherwise each model has its own. |
| `console_layout` | game console | `ps1` \| `ps2` \| `ps3` \| `ps4` \| `ps4_pro` \| `ps5` \| `xbox` \| `xbox_360` \| `xbox_one` \| `xbox_series_x` \| `xbox_series_s` \| `switch` \| `switch_2` \| `switch_lite` \| `ps_vita` \| `nes` \| `snes` \| `n64` \| `gamecube` \| `wii` \| `megadrive`. Left out, it is read in the name (PS4 Pro, Series S, Switch Lite, N64...), a brand alone drawing its latest. The state is a `media_player` (PlayStation Network, Xbox, the PS4 integration), PlayStation Network's online status, a smart plug, or anything on and off: *Playing* while a game runs, *On* in its menus, *Rest mode* on standby, *Off*. Sparks rise while it plays, its light is lit when on and amber at rest. |
| `game_entity` | game console | The game being played, when the state does not say it (PlayStation Network's *Now playing* sensor). Without it, the media player's title. |
| `playtime_entity` / `playtime_left_entity` | game console | Today's play time and the time left, as a parental control counts them (Nintendo Switch Parental Controls), as lines. |
| `streamer_layout` | streaming box | `apple_tv` \| `fire_tv_cube` \| `fire_tv_stick` \| `google_tv_streamer` \| `chromecast` \| `shield` (the tube) \| `shield_pro` \| `roku` \| `mi_box` (Xiaomi TV Box) \| `freebox` (Freebox Player) \| `decoder` (an operator's set-top box: Orange, Bouygues, SFR...) \| `box` (any Android TV box) \| `stick` (any HDMI stick, a Roku stick in purple). Left out, it is read in the name, then in the device's maker and model (an Apple TV named after its room, a Fire TV by its Amazon model code). The state is a `media_player` (Apple TV, Android TV Remote, Android TV / Fire TV over ADB, Google Cast, Roku, Kodi, an operator's box), its `remote`, a smart plug or anything on and off: *Playing*, *Paused*, *Home screen*, *Standby* or *Off*. Lines: the app (its name, or its package turned into a name), the title, the series with its season and episode or the artist, the channel, the source, the time left and the volume. While it plays, the app's tile floats above the box in the app's colours (Netflix, YouTube, Disney+, Prime Video, Apple TV, Plex, Spotify, myCANAL, Kodi and others). With a smart plug, `power_entity` says on (4 W or more by default, `power_on_threshold`), standby or off. |
| `app_entity` | streaming box | The app in use, when the media player does not say it (an Android TV's current app over ADB, a sensor). |
| `climate_sensor_layout` | temperature sensor | `disc` (Sonoff SNZB-02P, ZG-227Z) \| `square` (SNZB-02) \| `cushion` (Aqara) \| `stick` (TH01) \| `lcd_stand` (SNZB-02D) \| `lcd_probe` (SNZB-02LD, SNZB-02WD) \| `lcd_round` (Tuya TS0201). Left out, read from the device's model, otherwise `disc`. |
| `humidity_entity` / `battery_entity` | temperature sensor | The humidity and the battery, as lines and on the screen of the models that have one. The battery line turns orange at 20 % or less. |
| `spots` | lamp | The number of spots drawn, 1 to 4. Left out, a light group draws one spot per light, up to four. |
| `timer_entity` | lamp | A select of durations (an auto-off timer): a pill showing the one chosen, which opens the list. |

</details>

<details>
<summary><b>Bathroom scales</b></summary>

A glass bathroom scale with its screen. Its `state_entity` is the weight sensor (Withings, Xiaomi, Eufy, a template...): the screen shows the last weight and glows for an hour after a weighing, and the state line says when it was (*Weighed 07:42*, or the date). With a goal, from a sensor (`weight_goal_entity`) or a number (`weight_goal`), the line gives what is left to lose or to gain, and within half a unit the screen turns green with a tick: *Goal reached*. Fat, muscle and bone are lines. A weight sensor in kg, lb or st, or a name that says scale or Withings, picks the type on its own.

```yaml
type: custom:ha-appliance-card
appliance_type: scale
state_entity: sensor.withings_weight
weight_goal_entity: sensor.withings_weight_goal
fat_ratio_entity: sensor.withings_fat_ratio
muscle_mass_entity: sensor.withings_muscle_mass
bone_mass_entity: sensor.withings_bone_mass
```

</details>

<details>
<summary><b>Cameras</b></summary>

A camera's state, not its picture: Home Assistant has cards for that. Its `state_entity` is the camera entity: *Idle*, *Streaming*, *Recording* and *Off* come from it, *Motion detected* from a motion sensor, and *Offline* from a connectivity sensor that is off. Four shapes, found from the name and the brand: a pan and tilt indoor camera, a Netatmo Welcome tube, an outdoor battery camera like an Arlo on its wall bracket, and a dome.

```yaml
type: custom:ha-appliance-card
state_entity: camera.aarlo_camera_avant
motion_entity: binary_sensor.aarlo_motion_camera_avant
connectivity_entity: binary_sensor.aarlo_connected_camera_avant
```

</details>

<details>
<summary><b>Lamps</b></summary>

Its `state_entity` is the light: *On* or *Off*, and on, its brightness, its colour temperature and its effect in the lines. The drawing takes the light's colour and dims down to a quarter with its brightness; an effect turns the hue of a strip's segments or of the panels. A switch or a helper works too, drawn in a warm white, and the card's button switches the lamp on and off. Seventeen shapes, found from the name or picked with `lamp_layout`.

```yaml
type: custom:ha-appliance-card
state_entity: light.bedside_lamp
lamp_layout: bedside
```

</details>

<details>
<summary><b>Mailboxes and doorbells</b></summary>

A mailbox's `state_entity` is its mail indicator (a binary sensor, a helper) or its counter: *Empty*, *Mail* with the count, *Front door open* and *Back door open* from the contacts on its doors. Up to twelve letters are drawn in the pile; a new one comes in through the slot when the count goes up. Two shapes: through the wall, the street on the left or on the right, and a classic box on its post. [ha-smart-mailbox](https://github.com/danyial/ha-smart-mailbox) gives all four entities.

```yaml
type: custom:ha-appliance-card
state_entity: binary_sensor.mailbox_mail
mail_count_entity: sensor.mailbox_delivery_counter
front_door_entity: binary_sensor.mailbox_flap
back_door_entity: binary_sensor.mailbox_door
```

A doorbell is a camera with its button in `ring_entity`:

```yaml
type: custom:ha-appliance-card
state_entity: camera.front_door
ring_entity: binary_sensor.front_door_visitor
motion_entity: binary_sensor.front_door_motion
```

</details>

<details>
<summary><b>Watering, litter boxes, detectors and speakers</b></summary>

A sprinkler waters while its switch or valve is on, and waits for the weather when its rain delay is set:

```yaml
type: custom:ha-appliance-card
appliance_type: irrigation
state_entity: switch.front_lawn
remaining_time_entity: sensor.front_lawn_time_left
rain_delay_entity: binary_sensor.rain_delay
soil_moisture_entity: sensor.lawn_moisture
```

A Litter-Robot reads its own status codes:

```yaml
type: custom:ha-appliance-card
appliance_type: litter_box
state_entity: sensor.litter_robot_status
waste_drawer_entity: sensor.litter_robot_waste_drawer
pet_weight_entity: sensor.litter_robot_pet_weight
```

A detector is a binary sensor, its device class picks the drawing:

```yaml
type: custom:ha-appliance-card
appliance_type: detector
state_entity: binary_sensor.kitchen_leak
battery_entity: sensor.kitchen_leak_battery
```

A game console on PlayStation Network, or a Switch with its parental control's play time:

```yaml
type: custom:ha-appliance-card
appliance_type: console
state_entity: media_player.playstation_5
game_entity: sensor.my_psn_now_playing
```

```yaml
type: custom:ha-appliance-card
appliance_type: console
console_layout: switch
state_entity: switch.switch_plug
power_entity: sensor.switch_plug_power
playtime_entity: sensor.switch_used_screen_time
playtime_left_entity: sensor.switch_screen_time_remaining
```

A streaming box is a media player, an Apple TV here, read from its device even when it is named after its room; or a set-top box on a smart plug:

```yaml
type: custom:ha-appliance-card
appliance_type: streamer
state_entity: media_player.living_room
```

```yaml
type: custom:ha-appliance-card
appliance_type: streamer
streamer_layout: decoder
state_entity: switch.tv_box_plug
power_entity: sensor.tv_box_plug_power
```

A temperature sensor shows its temperature as its state; on the models without a screen the thermometer fills up and changes colour:

```yaml
type: custom:ha-appliance-card
appliance_type: climate_sensor
state_entity: sensor.salon_temperature
humidity_entity: sensor.salon_humidity
battery_entity: sensor.salon_battery
climate_sensor_layout: lcd_stand
```

A speaker is a media player:

```yaml
type: custom:ha-appliance-card
appliance_type: speaker
speaker_layout: sonos_one
state_entity: media_player.living_room
```

A white HomePod, or a Bose read in its name: `media_player.wave_soundtouch` draws the Wave SoundTouch with no `speaker_layout`.

```yaml
type: custom:ha-appliance-card
appliance_type: speaker
speaker_layout: smart
speaker_color: white
state_entity: media_player.kitchen
```

</details>

### Options shared by several families

<details>
<summary><b>Options</b></summary>

| Option | Types | Description |
|---|---|---|
| `heating_entity` | oven, cooker, rice cooker, water heater | Says whether it heats when the state entity cannot. Otherwise derived from the running state. |
| `light_entity` | oven, hood, 3D printer | Light, as a small toggle in the header. A lit printer's chamber lights up too. |
| `temperature_decimals` | fridge, kettle, water heater, boiler, heat pump | `0` (default, whole degree), `1` (one decimal) or `auto` (the entity's display precision), on the appliance's screen and in the list. |
| `temperature_entity` | kettle, water heater, boiler, heat pump | Water temperature (flow temperature on a boiler or a heat pump), shown on the appliance and in the list. A `water_heater` entity provides its own. On a water heater the hot water fills the tank from 15 to 65 °C. |
| `temperature_entity` | floor_heating, spa, sauna, aquarium | The temperature on the display and as a line, from a sensor or a `climate` entity. Left out, a thermostat's `current_temperature` is used. |

</details>

## Guides

What works the same on every appliance. Each guide opens with a click.

<details>
<summary><b>A smart plug alone</b></summary>

Nothing connects most appliances to Home Assistant, but a smart plug with a meter reads them all the same. Its switch and its meter are enough:

```yaml
type: custom:ha-appliance-card
appliance_type: washer
state_entity: switch.washer_plug
power_entity: sensor.washer_plug_power
```

In the visual editor, *Source: A smart plug* keeps the menus short: the plug's switch, its meter and the sensors beside it, none of an integration's programme, time left or buttons. The plug's switch is the power button.

Each type knows the power it works at, so there is no threshold to set. Under it, a plug that is on reads *Standby*, and a cycle that ran reads *Finished*. `power_on_threshold` sets another.

| Type | Works above | What the meter says on top |
|---|---|---|
| washer | 10 W | *Heating* from 1000 W, *Spinning* from 200 W, *Washing* below (`heat_threshold`, `spin_threshold`) |
| dishwasher | 10 W | *Heating* from 1000 W, *Washing* below, then *Drying* for 20 minutes once it draws nothing (`power_off_delay`) |
| dryer | 10 W | *Drying* from 600 W, *Cooling* below |
| coffee machine, rice cooker | 200 W, 100 W | *Keeping warm* on a few watts |
| cooktop | 50 W | as many zones lit as it draws for, each with its level, then *Residual heat* for ten minutes (`zone_power`) |
| iron | 10 W | *Heating*, then *Ready* when its thermostat cuts out; the more it draws, the more steam |
| oven, microwave, kettle, air fryer, toaster, water heater | 50 W | *Running*, *Heating*, *Cooking* or *Toasting* |
| cooker, 3D printer | 20 W, 30 W | *Running* |
| space heater, dehumidifier, water pump, floor heating | 30 W | *Heating*, *Drying* or *Pumping* |
| towel warmer, pool pump, spa, sauna | 10 W, 50 W, 50 W, 100 W | *Comfort*, *Filtering* or *Heating* |
| humidifier | 5 W | *Humidifying* |
| hood, fan, air purifier | 5 W, 3 W, 3 W | *Off* at rest; with `speed_power_max`, the speed from what it draws |
| aquarium, Christmas tree, pet fountain | 3 W, 2 W, 1 W | lit, or the water running |

The fridge, the hair dryer, screens, chargers, robots on their dock, solar panels and batteries read their meter in their own way, described in their sections.

A state from an integration (Electrolux, Home Connect, SmartThings…) always says more than a meter, and keeps the say: the meter then only adds its power line.

**[Try it in the demo](https://adnpolymerase.github.io/ha-appliance-card/docs/demo.html?view=live&plug=1)**: every card there has nothing but a plug, and each power slider covers what its appliance really draws.

</details>

<details>
<summary><b>Examples</b></summary>

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

</details>

<details>
<summary><b>Relabeling raw values (<code>value_map</code>)</b></summary>

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

</details>

<details>
<summary><b>Alert entities</b></summary>

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

</details>

<details>
<summary><b>Too many states (<code>"*"</code>)</b></summary>

A washer-dryer runs one long programme in a dozen named steps, and nearly all of them mean *running*. Rather than naming every one, name the few that are not and send the rest to a single category:

```yaml
state_map:
  Ready To Start: idle
  End Of Cycle: done
  "*": running
```

The catch-all comes last, so the states the card already knows keep their own meaning and only what is left over lands on it. The quotes are YAML's: a bare `*` starts an alias.

</details>

## Thanks

- [@chike-he](https://github.com/chike-he): Chinese translation ([#3](https://github.com/ADNPolymerase/ha-appliance-card/issues/3))
- [@pbarone](https://github.com/pbarone): `device_class: timestamp` support for the remaining time ([#2](https://github.com/ADNPolymerase/ha-appliance-card/pull/2))
- [@monsivar](https://github.com/monsivar): Norwegian Bokmal locale aliases ([#10](https://github.com/ADNPolymerase/ha-appliance-card/pull/10)) and the dedicated dishwasher illustration ([#11](https://github.com/ADNPolymerase/ha-appliance-card/pull/11))

## License

MIT. See [LICENSE](LICENSE).
