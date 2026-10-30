# HA Appliance Card

[![hacs_badge](https://img.shields.io/badge/HACS-Default-41BDF5.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-appliance-card?sort=semver)](https://github.com/ADNPolymerase/ha-appliance-card/releases)
[![HACS Action](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg)](https://www.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ADNPolymerase/ha-appliance-card/blob/main/LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/adnpolymerase)

<a href="https://buymeacoffee.com/adnpolymerase" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60"></a>
<a href="https://adnpolymerase.github.io/HA/" target="_blank"><img src="https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg" alt="Link to my github.io for my other projects" height="60"></a>

A Lovelace card for household appliances: washers, dryers, dishwashers, ovens, microwaves, cooker hoods, cooktops, fridges, kettles, cookers, coffee machines, rice cookers, air fryers, water heaters, boilers, heat pumps, 3D printers, pet feeders, irons, toasters, hair dryers, pellet stoves, air conditioners, dehumidifiers, space heaters, towel warmers, air purifiers, fans, EV chargers, TVs, projectors, computers and wall tablets, network switches, servers, NAS and racks, robot vacuums, mops and mowers, stick vacuums and floor washers, pool pumps, bathroom scales, UPSes, solar panels and home batteries. Cycle in progress, program, remaining time, temperature, alerts and controls.

No brand assumed: every field is an entity you pick, so it works with **any** integration (Electrolux, Samsung, LG, Home Connect, Miele, a plain smart plug…).

**[Try the live demo](https://adnpolymerase.github.io/ha-appliance-card/docs/demo.html?view=live)**: every appliance animated in your browser, light or dark, no Home Assistant needed.

> Feedback and issues welcome.
> 🇫🇷 [Lire en français](README.fr.md)

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/screenshot.png" alt="HA Appliance Card screenshot" width="100%">

## Features

- **Forty-three appliance types**, each with a CSS illustration that animates on the appliance's own data and stays still when idle. The type is detected on its own or set via `appliance_type`, and `compact: true` keeps only the text.
- **State normalization**: `Idle`, `RUNNING`, `wash`, `En marche`… are recognised (accent-insensitive) and sorted into idle, preheating, running, paused, done, delayed or error. An unknown state is shown as it came, minus the integration's namespace, and `state_map` sorts the rest, `"*"` catching everything left over.
- **The step, not an hour of *Running***: a washer, a dryer or a dishwasher names the step it is at (*Pre-wash*, *Washing*, *Rinsing*, *Spinning*, *Drying* and seven more), from a phase entity or from its own state, and the drum whirls while it spins. The time left is still the whole cycle's.
- **A washer-dryer is a washer that dries**: `washer_dryer: true`, and the drum shows water while it washes, then clothes turning in hot air while it dries. The step comes from the state itself or from a phase entity, and the state line reads *Washing* or *Drying*.
- **Each appliance says what matters for it**: a coffee machine what it is missing (water, beans, tray, descaling), a fridge its health (unplugged, door open, temperature high), a combi boiler what it is heating (central heating, hot water or standby), a 3D printer what the job is doing (preheating, bed levelling, changing filament), a pellet stove the phase of its fire (ignition, modulating, eco, cleaning), an air conditioner its mode and where it blows, an EV charger whether a car is plugged in and what the charge is doing (waiting for authorisation, charging, paused, scheduled, complete).
- **The network as well**: a switch, a server, a NAS, a rack or a router (the box an ISP lends too), *Online*, *Busy* or in *Alert*, and *No internet* when a router loses its link. One LED per port in use, one per disk in its bay (fine, reading, asleep, to watch, failed), and the readings found on their own from Synology, UGREEN, Unraid or Glances.
- **Robots too**: a vacuum, a mop or a mower leaves its base and goes over its floor, comes back, and says when its station empties the bin or washes the pads, when rain keeps it home or when it is stuck. A stick vacuum on its wall dock and a floor washer in its station charge from a cable you see the current run along.
- **And the pool**: the sand filter, the pump and the pool, *Filtering*, *Chlorine injection* with an optional dosing pump, *Backwash* to the drain, *Frost protection*, and the light, the water, the pH and the RedOx in the lines.
- **Energy**: solar panels on the ground or on a roof, under the sun, a few clouds or the moon, *Producing*, *Low production* or *Night*; a home battery on the wall or a portable station, *Charging*, *Discharging*, *Idle*, *Full* or *Low battery*, its reserve drawn on its gauge and the time to full or until the reserve in the lines.
- **And the bathroom scale**: the last weight on its screen, lit for an hour after a weighing, what is left to the goal, and the fat, the muscles and the bones in the lines, from Withings or any weight sensor.
- **And the UPS**: the wall socket, the UPS and the box it keeps alive, *On mains* with the energy flowing through it, *On battery* with the wall crossed out, the UPS beeping and its screen counting the time left, *Battery low*, *Overload* and *Replace battery* read from NUT's own codes, and the battery, the runtime, the load and the input voltage in the lines.
- **And the lamps**: a bulb, a bedside lamp, an arc floor lamp, a halogen torchiere, a pendant, a LED strip, recessed spots, Nanoleaf-style panels, a desk lamp or a wall lantern, lit in the light's own colour and dimmed with its brightness; an effect turns the hue of a strip's segments or of the panels.
- **And the mailbox**: through the wall with its street and house doors, or a classic box on its post. The letters pile up to twelve, a new one comes in through the slot, and the doors swing open on their hinges. Cameras get a doorbell too, its ring of light beating when someone rings.
- **And the rest of the house**: a chest freezer and a drawer freezer that frost over while they cool, a booster set with its pressure on its controller and a sump pit whose float follows the water, a pool robot trailing its cable, underfloor heating on hot water or electric, a spa with its bubbles, a sauna whose stones glow, a planted aquarium, a Linky meter and a Christmas tree in seven classic colour schemes, its presents out on 24 and 25 December.
- **Works from a smart plug alone**: `power_entity` and `power_on_threshold` are enough to derive the state from consumption; `power_off_delay` keeps a pause from reading as the end, and `show_last_cycle` shows how long the last cycle ran.
- **Program, remaining time, progress bar, info lines, door, alerts, connectivity and controls** (start, pause, resume, stop), each optional.
- **14 languages** (EN, FR, DE, ES, IT, NL, PT, SV, NO, DA, PL, RU, ZH, CS), Home Assistant's or pinned on the card.
- **Visual editor** that pre-fills fields from the entities of the same device and only offers those the chosen type can use.

## Gallery

Click a family to see its appliances at work.

<details>
<summary><b>Laundry and dishes</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-laundry.gif" alt="Laundry and dishes" width="100%">

</details>

<details>
<summary><b>Kitchen</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-kitchen.gif" alt="Kitchen" width="100%">

</details>

<details>
<summary><b>Heating and climate</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-climate.gif" alt="Heating and climate" width="85%">

</details>

<details>
<summary><b>Air purifiers and fans</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-air.gif" alt="Air purifiers and fans" width="100%">

</details>

<details>
<summary><b>Pets</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-pets.gif" alt="Pets" width="60%">

</details>

<details>
<summary><b>Garage and workshop</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-garage.gif" alt="Garage and workshop" width="60%">

</details>

<details>
<summary><b>Network and servers</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-network.gif" alt="Network and servers" width="100%">

</details>

<details>
<summary><b>Robots and vacuums: robots, mowers, stick vacuums and floor washers</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-robots.gif" alt="Robots and vacuums: robots, mowers, stick vacuums and floor washers" width="100%">

</details>

<details>
<summary><b>Pool pumps</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-pool.gif" alt="Pool pumps" width="100%">

</details>

<details>
<summary><b>Energy: solar panels and home batteries</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-energy.gif" alt="Energy: solar panels and home batteries" width="100%">

</details>

<details>
<summary><b>Bathroom scales</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-scales.gif" alt="Bathroom scales" width="50%">

</details>

<details>
<summary><b>UPSes</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-ups.gif" alt="UPSes" width="100%">

</details>

<details>
<summary><b>Diffusers and ventilation</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-diffusers.gif" alt="Diffusers and ventilation" width="100%">

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-ventilation.gif" alt="VMC" width="100%">

</details>

<details>
<summary><b>Cameras</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-cameras.gif" alt="Cameras" width="100%">

</details>

<details>
<summary><b>Lamps</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-lamps.gif" alt="Lamps" width="100%">

</details>

<details>
<summary><b>Mailboxes and doorbells</b></summary>

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-mailboxes.gif" alt="Mailboxes and doorbells" width="100%">

</details>

## Installation

### HACS

1. In HACS, search for **HA Appliance Card** and install it.
2. Add a `custom:ha-appliance-card` card to your dashboard.

### Manually

1. Download every file of the [latest release](https://github.com/ADNPolymerase/ha-appliance-card/releases/latest) (`ha-appliance-card.js`, its editor and its language files) and drop them together in `config/www/`. Without the language files the card speaks English.
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
| `illustration_size` | The drawing's size, from `0.3` to `1.2` times its own (default `1`), in every mode. The text keeps its size. A slider in the editor. |
| `font_scale` | The text's size, from `0.7` to `1.4` times its own (default `1`). The drawing keeps its size. A slider in the editor. |
| `show_name` / `show_state` | `false` hides the name, or the state line. Both shown by default. |
| `transparent` | `true` removes the card's background, border and shadow, for a card laid on a wall tablet's background. |
| `fill_height` | `true` makes the card take the full height of its slot, with the buttons at the bottom: two cards side by side then have the same height. Off by default, since next to a much taller card it would stretch to that card's height. |
| `illustration_frame` | `true` sets every drawing at the bottom of a frame of the full drawing height: two cards side by side whose drawings differ in height, such as a robot with its station next to one on a plain base, then have their floors level. Off by default. |
| `done_alert` | `true` makes a green badge pulse on the drawing when a cycle has finished, until the door opens or the badge is tapped. For appliances with a cycle (washer, dryer, dishwasher, oven…). |
| `illustration_color` | `auto` (default, follows the theme) \| `white` \| `grey` \| `black` \| `red` (dark red). Only changes the casing, not the state colours. |
| `language` | `auto` (default, follows Home Assistant) or one of the 14 codes: `en`, `fr`, `de`, `es`, `it`, `nl`, `pt`, `sv`, `no`, `da`, `pl`, `ru`, `zh`, `cs`. `nb` and `nb-NO` give Norwegian. |
| `appliance_type` | `auto` (default) \| `washer` \| `dryer` \| `dishwasher` \| `oven` \| `microwave` \| `hood` \| `cooktop` \| `fridge` \| `kettle` \| `cooker` \| `coffee` \| `rice_cooker` \| `air_fryer` \| `water_heater` \| `boiler` \| `heat_pump` \| `printer_3d` \| `pet_feeder` \| `pet_fountain` \| `iron` \| `toaster` \| `pellet_stove` \| `air_conditioner` \| `dehumidifier` \| `space_heater` \| `towel_warmer` \| `air_purifier` \| `fan` \| `ev_charger` \| `hair_dryer` \| `screen` \| `network` \| `robot` \| `pool_pump` \| `scale` \| `ups` \| `solar` \| `home_battery` \| `camera` \| `diffuser` \| `hrv` \| `lamp` \| `mailbox` \| `water_pump` \| `floor_heating` \| `spa` \| `sauna` \| `aquarium` \| `meter` \| `christmas_tree`. |
| `tap_action` | What a tap on the card does, in Home Assistant's own words: `more-info` (default: the state entity, or on a card without one what it reads in its place), `none`, `navigate`, `url`, `toggle`, `perform-action` or `fire-dom-event`, which is what the popup cards built on browser_mod listen for. In YAML only. |
| `toggle_entity` | Power button (`switch`, `button`, `script`, `input_boolean`, `fan`), highlighted while on. On every type, the fridge included, where it is the only button; pair it with `controls_activation: confirm` for an appliance that must not be switched off by mistake. |
| `power_entity` / `power_on_threshold` / `power_icon` | Power sensor. With a threshold, the state is derived from it: *running* above, then *finished* when it falls back. Pointing `state_entity` at the same sensor enables it with a 10 W threshold. `power_icon` replaces `mdi:power-plug`. |
| `power_off_delay` | Minutes the power must stay under `power_on_threshold` before the cycle reads *Finished*, so a pause (a dishwasher drying, a washer soaking) is not taken for the end. Only when the state comes from the plug: an integration reports its pauses itself. 0 by default. |
| `speed_power_max` | A hood, an air purifier or a fan on a plug: its power at top speed, in watts. The speed is then read from what it draws: under a third of it the first speed, under two thirds the second, above that the third. A fan entity's percentage or preset always wins. |
| `speed_power_custom` | Sets the two steps by hand, `speed_power_2` and `speed_power_3`: the watts from which the fan is on its second and third speed, when the thirds do not fit. |
| `show_last_cycle` | Adds a *Last cycle* line between cycles: how long it ran and when it ended, read from Home Assistant's history (seven days of the state, two days of a plug's power, pauses shorter than `power_off_delay` included). Appliances that run a cycle, the kettle, the iron, the toaster and the hair dryer. |
| `energy_entity` | An energy counter (kWh or Wh) shown as an *Energy* line, such as a plug's consumption or a utility meter reset at each cycle. Every type except solar and the home battery. |
| `energy_price` | Price of one kWh, as a number (`0.2516`) or an entity whose state is the price: adds a *Cost* line, in Home Assistant's currency. |
| `show_elapsed` | Adds an *Elapsed* line during a cycle: how long it has run, pauses left out. From a plug, the start is read in the power history when the card opens mid-cycle. |
| `show_today` | Adds a *Today* line: how long the appliance has run since midnight and how many times it started, from the history of its plug (or of its state without a plug). Useful on a pump, a heater, a water heater. |
| `show_history` / `history_entity` / `history_hours` | `true` adds a discreet *Last 24 h* button under the lines, which unfolds a curve of one reading, in the state's colour, with its minimum and maximum and a gap where the sensor was unavailable. The history is read only once unfolded, then kept five minutes. Left out, `history_entity` is what says the most about the type (a fridge's temperature, a network device's download rate, a pool's water, a UPS's load, a scale's weight), else the power meter, else the state when it is a number. `history_hours`: 24 by default, 1 to 168. Off by default. |
| `program_entity` / `program_format` | Program. `clean` (default) makes it readable (`LaundryCare.Washer.Program.Auto40` becomes *Auto 40*, `Rapid20Min` becomes *Rapid 20 Min*), `raw` shows it as-is. |
| `delay_entity` | cycle appliances | A delayed start counting down, in seconds, minutes or as a start time (Home Connect's *StartInRelative*). While it runs the appliance reads *Delayed start*, a *Starts in* line gives the time left and the start time, and the bar fills up to the start. Hidden at 0. |
| `remaining_time_entity` / `remaining_time_unit` | Remaining time, in `auto` (default, from the entity's unit: s, min, h, ms, d, or `1:02:03`), `seconds`, `minutes` or `hours`, or a finish time (`timestamp`). It also draws the progress bar: the time run since the cycle began, pauses left out, over that time plus what is left. Opened mid-cycle, the card finds the start in the state history. |
| `remaining_time_hide_when_idle` | `true` only shows the remaining time while running, against stale finish times (SmartThings). |
| `remaining_time_split` | `true` puts the end time on its own line, for a narrow card. |
| `progress_entity` | 0-100 sensor replacing the estimate drawn from the remaining time. |
| `door_entity` / `door_open_state` / `door_invert` / `door_hide_in_list` / `door_corner` | Door sensor, "open" state (default `on`), inversion, and hiding the line (the door is still drawn). `door_corner: true` shows the door as an icon in a top corner instead of a line, green when shut and orange when open. |
| `alerts_entity` | Entity whose every *attribute* at on, true or active shows as an alert. |
| `alerts_entities` | Up to 8 alerts with an entity each (Home Connect's salt, rinse aid, i-Dos, filters…), as `{ entity, label?, icon? }` or a plain id, shown while on, true, active, *present* or *confirmed*: one under its own name, several behind their count (see *Alert entities*). |
| `connectivity_entity` / `connectivity_connected_state` | Connectivity, as a wifi icon, and the "connected" state (default `on`). |
| `corner_entities` | Up to 2 switches as icons in the top corners, the first on the left and the second on the right, as `{ entity, label?, icon? }` or a plain id. The icon says what each one does and whether it holds (a child lock, an automatic lock, a lock, a switch), and a tap toggles it. A `lock` only opens its dialog: a stray tap never unlocks anything. |
| `info_entities` | Up to 8 lines `{ entity, icon?, label?, value_map?, hide_unit? }`, any beyond are ignored, shown under the lines the card reads on its own. A tap opens the entity's dialog, which is how a tank or a filter gets reset from the card. Past 5 lines the spacing tightens. Values read as in Home Assistant, with the entity's display precision. `value_map` relabels raw values (see below), `hide_unit` drops the unit. |
| `lines_order` | The order of the info lines, as a list of their keys: `program`, `remaining`, `door`, the ones each type brings (`level`, `last_feed`, `flow_return`, `nozzle`…) and, for the lines you add, their entity id. The visual editor writes it for you by dragging. Lines left out keep their place after the ones named, and a line that is not showing is skipped. |
| `start_entity` / `pause_entity` / `resume_entity` / `stop_entity` | Controls, only shown when configured. A control is usually a `button`, a `script` or an `automation`, which is triggered rather than switched off, and can also be a `select` or a `number`: `start_option` says which option to pick (the card takes it on its own when the list holds only one), `start_value` what to write. The same goes for the other three, as `pause_option`, `stop_value` and so on. `start_icon` swaps the button's icon, as do `pause_icon`, `resume_icon`, `stop_icon`, `toggle_icon` and `filter_reset_icon`: `mdi:play` reads as a programme starting, which is not what every press does. In YAML only. |

</details>

<details>
<summary><b>Options per type</b></summary>

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
| `filter_life_entity` / `filter_reset_entity` / `filter_due_below` | pet fountain | The filter's life left, on a line, and a reset button (a button, a switch or a script). Days, hours, minutes and seconds are counted in days, a percentage stays one, and a date (the next change) gives the days left until it. At or below `filter_due_below` (3 for days, 10 for percent by default) the state reads *Filter due*, and the line and the light turn orange. |
| `pump_clean_entity` / `pump_reset_entity` | pet fountain | The same for the pump: the time or the date until it wants cleaning, against the same threshold, and a reset button. The state reads *Clean the pump*. |
| `pump_running_entity` | pet fountain | The pump, when the integration reads it apart from the power (Petkit's *Pump running*, Xiaomi's *watering* status): the water runs only while both say so. A *Pump last ran* line says when it last stopped, or *Running*. |
| `water_level_entity` / `level_empty_below` | pet fountain | The water left: a percentage, which fills the tank on the drawing; a word (`low`, `lack`, `shortage`, `level_1`… or `normal`, `medium`, `full`); or a contact, on when it runs low, or on while there is water for a moisture contact (Petlibro). A number in another unit (a level from 1 to 4, millilitres) is only read against `level_empty_below` when it is set. At or below `level_empty_below` (10 by default) the state reads *Low water*, in red, ahead of everything else: a dry pump burns out. The jet then stops, as it does with the pump off, and the dish drops with the tank. |
| `zones` / `zones_layout` / `zones_count` | cooktop | Up to 6 zones `{ level_entity, residual_heat_entity?, name? }`, level as a number or a word (`boost`), `H` for residual heat. Layout `2x1` \| `2x2` \| `3x2`, and how many zones to draw without entities (default 4). |
| `child_lock_entity` | cooktop | Padlock on the illustration. |
| `fridge_layout` | fridge | `freezer_bottom` (default) \| `freezer_top` \| `side_by_side` \| `single` \| `wine` (glass door and bottles, for a wine cooler) \| `chest` (a chest freezer) \| `drawers` (an upright freezer with see-through drawers). On these two the freezer probe, or the fridge one, is on the display, and the warning threshold is -12 by default. |
| `fridge_temperature_entity` / `freezer_temperature_entity` / `fridge_max_temperature` / `temperature_hide_in_list` | fridge | Temperatures shown on the doors and in the list, `--°` when the probe goes quiet (`temperature_hide_in_list` leaves them on the doors only). Above the maximum (default 8 °C, 18 °C for `wine`), the state reads *Temperature high*. |
| `door_entity` / `freezer_door_entity` | fridge | Each door swings for its own sensor. |
| `ice_maker_entity` | fridge | Ice cubes fall while it produces. |
| `power_entity` / `power_on_threshold` / `no_power_threshold` / `no_power_after` | fridge | With nothing wrong, the state reads *Cooling* at or above the threshold and *Standby* below it: set the threshold between your fridge's draw at rest and while cooling (10 W for one that rests at 6 W). Staying below `no_power_threshold` (default 1 W, whatever the cooling threshold) for more than `no_power_after` minutes (default 30) reads *No power draw*, in orange: a long compressor pause looks the same. Counted from the reading's last change, so a page reload does not restart it. |
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
| `kettle_layout` | kettle | `classic` (default, a jug in the appliance's colour) \| `steel` (a stainless steel kettle with a black handle). |
| `coffee_layout` | coffee machine | `silver` (default, a bean-to-cup machine in the appliance's colour, its tank on the side) \| `black` (black with a chrome front and a round screen). |
| `boiler_layout` | boiler | `wall` (default, a white wall boiler with its gauge and screen) \| `window` (a boiler whose burner shows through a window). |
| `towel_warmer_layout` | towel warmer | `ladder` (default, round bars between two uprights) \| `panel` (flat anthracite panels on one upright). |
| `iron_layout` | iron | `iron` (default, the iron alone) \| `generator` (the same iron on the base of a steam generator). |
| `toaster_layout` | toaster | `two` (default, two slots) \| `four` (four slots, two levers) \| `long` (one long slot for two slices end to end). |
| `hair_dryer_layout` | hair dryer | `pistol` (default, a classic dryer seen from the side) \| `ring` (a ring dryer seen from the front). |
| `heat_threshold` | hair dryer | Power from which the dryer blows hot air (300 W by default). Below it, only the fan runs. |
| `screen_layout` | screen | `tv_feet` (default, a TV on two feet) \| `tv_stand` (a TV on a central stand) \| `tv_wall` (a wall-mounted TV) \| `projector` (a projector under its screen) \| `computer` (a monitor and its tower) \| `tablet_wall` (a wall tablet on its flat mount) \| `tablet_frame` (a tablet in a wooden frame, hung like a picture) \| `tablet_portrait` (an upright tablet with a light bar on top). Left out, a name that says projector, computer or tablet picks the model, and so does a `lock_entity`, or one of a tablet's fields below. |
| `screen_image` | screen | The picture a lit screen shows: `random` (default, a new one each time it comes on) or one of `sunset`, `aquarium`, `bars`, `football`, `space`, `bounce`, `desktop`, `code`, `pong`, `dashboard`. A tablet shows `dashboard` by default. A player that sends a cover shows it instead while it plays. |
| `media_entity` / `media2_entity` / `media3_entity` | screen | Up to three `media_player` entities that show something on this screen: the TV itself, and the box or console that actually has the picture. The card follows the one that plays, then the one paused, then the one on its home screen, then the one on; on a tie, the first. Its line names it and gives the app or source, the title, and *Muted*. Without a power meter, the players also say whether the screen is off, on standby or on. |
| `lock_entity` | screen | A computer's session lock: a `lock`, a `binary_sensor` of the lock class (off means locked) or a sensor that reads `locked`, as HASS.Agent, Go Hass Agent or the macOS app report it. Locked, the screen shows a padlock. |
| `source_entity` | screen | The screen's input: a `select` / `input_select` (such as a monitor's *Input source*) or a `media_player`, whose source list is used. The card shows the current input on a line and adds a button that opens the list to pick another. |
| `screensaver_entity` | screen (tablet) | The tablet's screensaver, such as Fully Kiosk's *Screensaver* switch. On, the card says *Screensaver* and draws a clock on the glass. As a switch, it also gets a button. |
| `charging_entity` | screen (tablet) | On its charger: a `binary_sensor` such as Fully Kiosk's *Plugged in*, or a sensor that reads `charging` or `full`. The cable and a bolt show while it charges, and the state says so. |
| `motion_entity` | screen (tablet) | What its front camera sees: on, the camera lights blue, and so does the light bar of the upright tablet. |
| `url_entity` | screen (tablet) | The page it shows, such as Fully Kiosk's *Current page*: the card keeps the path, without the address. |
| `brightness_entity` | screen (tablet) | Its brightness: a `number` of 0 to 255 as Fully Kiosk gives it, a percentage, or a light. |
| `last_interaction_entity` | screen (tablet) | When it was last touched: a timestamp sensor, or any entity whose last change is that moment. |
| `reload_entity` | screen (tablet) | A button that reloads its page, such as Fully Kiosk's *Load start URL*. |
| `restart_entity` | screen (tablet) | A button that restarts its app, such as Kiosk Satellite's *Restart app*. |
| `screenshot_entity` | screen (tablet) | A `camera` or `image` of its screen, such as Kiosk Satellite's *Screenshot*: shown on the glass instead of the drawn dashboard while the dashboard is on. |
| `tower_entity` | screen (computer) | The tower on a second plug: a `switch` adds a *Tower* button, a power `sensor` a *Tower* line. The tower's LED follows it, and the card reads *Tower on* while the monitor sleeps. |
| `battery_entity` | screen (tablet) | Its battery, shown in a corner of the card, orange at 20 % and below. |
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
| `water_temperature_entity` / `air_temperature_entity` | pool pump | The water and the air, shown as lines. |
| `ph_entity` / `redox_entity` | pool pump | The pH and the RedOx (ORP), shown as lines. |
| `filtration_time_entity` | pool pump | Time filtered today, in hours, minutes or seconds: *4h30*. |
| `pressure_entity` / `pressure_alert` | pool pump | The filter's pressure: the gauge's needle follows it, and at `pressure_alert` (1.8 bar by default) or above, with the pump running, it is an *Error*. |
| `pool_mode_entity` | pool pump | The pump's mode (auto, manual…), shown as a line. As the `state_entity`, a mode only says the pump runs when a `power_entity` draws over `power_on_threshold` (50 W by default). |
| `chlorine_pump_entity` / `chlorine_level_entity` | pool pump | An optional chlorine dosing pump: its tank and its long tube to the return pipe only show when it is given, and drops run down the tube while it injects. Its level, in %, fills the tank and turns orange at 15 % or less. |
| `backwash_entity` / `frost_entity` | pool pump | A backwash sends the dirty water to the drain, the pool stays still; frost protection frosts the pipes. A state that says backwash or frost does the same. |
| `pool_alert_entity` | pool pump | Anything that should raise the *Error*: the pump smokes and the gauge's needle swings. |
| `light_entity` | pool pump | The pool's light: it shines on the far wall, and the light switch sits in the corner of the card. |
| `weight_goal_entity` / `weight_goal` | scale | The weight goal, from a sensor or as a number (the sensor wins): a *Goal* line with what is left to lose or to gain, and *Goal reached* within half a unit. |
| `fat_ratio_entity` / `fat_mass_entity` | scale | Body fat, in % and in mass, on one *Fat* line. |
| `muscle_mass_entity` / `bone_mass_entity` | scale | Muscle and bone mass, as lines. |
| `battery_entity` / `battery_low` | UPS | The battery's charge, in %: the gauge on the UPS fills by fifths, orange at 40 % or less, red at `battery_low` (20 % by default) or less. On battery, at that level or with NUT's `LB`, it reads *Battery low*. |
| `runtime_entity` | UPS | The time left on the battery, in seconds as NUT gives it, or in minutes or hours: a line, and the UPS's screen while on battery. |
| `load_entity` / `nominal_power` | UPS | The load, in %: the energy flows faster as it grows, and 100 % or more is an *Overload*. With `nominal_power` (in W) and no `power_entity`, the line gives it in watts too. |
| `input_voltage_entity` | UPS | The voltage at the wall, as a line. Without a `state_entity`, below 100 V the UPS is on battery. |
| `diffuser_layout` | diffuser | `drop` (a wooden teardrop, Meross, Asakuki) \| `cone` \| `stone` (Vitruvi, Govee) \| `flame` (a flame-effect diffuser) \| `nebulizer` (glass on a wooden base). Left out, the name decides, a teardrop otherwise. Wood by default for the teardrop, the flame and the nebulizer, white for the others, or `illustration_color`. |
| `light_entity` / `tank_empty_entity` | diffuser | The diffuser's light: its colour lights the band and the floor. An empty tank sensor makes it *Tank empty*. Its `state_entity` is the mist: a switch, a fan (50 % or less is *Intermittent*), Meross's spray select (`eco` is *Light mist*, a lower mist; `intermittent` or `interval` is *Intermittent*) or a humidifier entity. A select gets a button that steps through its modes, a switch or a fan an on/off button. |
| `hrv_layout` | HRV | `diagram` (the two streams crossing in the exchanger) \| `one_duct` (a single-room unit, Lunos eGO, Zehnder ComfoAir 70) \| `pair` (two through-wall units, Lunos e2, Vents TwinFresh, that swap direction every 70 s). |
| `outdoor_temperature_entity` / `supply_temperature_entity` / `extract_temperature_entity` / `exhaust_temperature_entity` | HRV | The four temperatures, drawn at the ends of the ducts. |
| `bypass_entity` | HRV | The bypass: a switch or a binary sensor that is on, a position in %, or Vallox's cell state, whose *Defrosting* reads *Defrosting*. |
| `airflow_entity` / `filter_life_entity` | HRV | The airflow and the filter, in days or in %, as lines. 7 days or 10 % left (or `filter_due_below`) reads *Replace filter*. The `state_entity` is the unit's fan, climate or select: its speed, its *Boost* and *Away* presets. |
| `state_entity` (modes) | HRV | A select of modes, or a fan with presets, gets a *Mode* button that opens the list of modes in the card. Broan and Venmar ERVs over ESPHome ([broan_erv_uart](https://github.com/nspitko/broan_erv_uart)): `recirculate` reads *Recirculation* (the outdoor dampers close and the room air loops through the unit), `humidity` *Humidity control*, `int` *Intermittent* (and *Intermittent, paused* when both fans stand still), `turbo` and `max` *Boost*. |
| `supply_fan_entity` / `exhaust_fan_entity` / `fan_max_rpm` | HRV | Each fan's speed in rpm: each one turns at the speed of its motor, up to `fan_max_rpm` (2000 by default), and the line gives its rpm and its airflow (`airflow_entity` for supply, `exhaust_airflow_entity` for exhaust). |
| `fan_speed_entity` | HRV | The speed in %, when the unit keeps it in a number of its own. |
| `current_humidity_entity` / `target_humidity_entity` / `humidity_control_entity` | HRV | The humidity and its setpoint, on a line and on the drawing while humidity control runs. The humidity control switch makes it *Humidity control* and gets a button. |
| `camera_layout` | camera | `indoor` (a pan and tilt camera) \| `tube` (Netatmo Welcome) \| `outdoor` (on its wall arm) \| `dome` (on the ceiling) \| `doorbell` (a video doorbell). Left out, a camera with a `ring_entity` or a name that says doorbell is a doorbell, a Netatmo indoor camera is a tube, a name that says dome a dome, and a name or a brand that says outdoor, garden, front, back, Arlo or spotlight an outdoor camera. |
| `ring_entity` | camera | The doorbell's button: a binary sensor on while it is pressed (Reolink's *visitor*), or an event entity (Ring, Nest, UniFi Protect), *Ringing* for 30 seconds after its last `ring`. The ring of light beats, then a *Last ring* line. |
| `motion_entity` | camera | A motion sensor: *Motion detected* while it is on, orange waves in front of the lens, then a *Last motion* line. |
| `recording_entity` | camera | A recording sensor, for the integrations whose camera entity does not say *recording*. |
| `night_entity` | camera | The infrared mode: the ring of LEDs around the lens glows red, and a *Night vision* line. |
| `privacy_entity` | camera | A privacy switch (Reolink, Tapo): on, the camera is *Off*, its head bowed or its shutter closed. Netatmo's `monitoring` attribute does the same. Set it as `toggle_entity` too for a button. |
| `signal_entity` / `battery_entity` | camera | The Wi-Fi signal and the battery, as lines. An Arlo camera's own attributes are read without them. |
| `lamp_layout` | lamp | `bulb` \| `bedside` \| `floor` (an arc floor lamp) \| `torch` (a halogen torchiere, its light going up) \| `pendant` \| `strip` (a LED strip under a shelf) \| `spot` (recessed spots) \| `panels` (Nanoleaf-style panels) \| `desk` \| `wall` (a lantern on an outside wall). Left out, it is read from the name and the model: strip, WLED or Govee makes a strip, Nanoleaf or panel panels, bedside a bedside lamp, desk a desk lamp, halogen or uplight a torchiere, floor or arc a floor lamp, spot or GU10 spots, pendant or chandelier a pendant, wall, outdoor or garden a lantern; a bulb otherwise. |
| `mailbox_layout` | mailbox | `through` (through the wall, seen from the side, a door on each face) \| `classic` (a box on its post, seen from the front). Left out, a `back_door_entity` makes it a through-the-wall box. |
| `mailbox_front` | mailbox | `left` (default) \| `right`: the side the street is on, for a through-the-wall box. |
| `mail_count_entity` | mailbox | A counter of the mail. The pile shows up to twelve letters, and the count is a line and a badge. |
| `front_door_entity` / `back_door_entity` | mailbox | The contacts on the street door and on the house door: *Front door open*, *Back door open*, the door swings open and daylight comes in, and a line for each. |
| `pump_layout` | water_pump | `booster` (a pump on its pressure tank, with its controller) \| `sump` (a sump pit in cross-section, its float on its cable). Left out, a `level_entity`, a `high_level_entity` or a name that says sump makes a sump pump. |
| `pressure_entity` | water_pump (booster) | The pressure, on the controller's display and as a line. Without it, the display shows the plug's power. |
| `level_entity` / `level_max` | water_pump (sump) | The water level, on the display, as a line and as the height of the water in the pit: a percentage, or a value out of `level_max`. From 90 % it reads *High level*. |
| `high_level_entity` | water_pump (sump) | A float switch or a high-level alarm: *High level*, the pit full and a beacon flashing. |
| `floor_layout` | floor_heating | `water` (default, a manifold on the wall and the loop under the tiles) \| `electric` (a heating cable on its mesh). |
| `temperature_entity` | floor_heating, spa, sauna, aquarium | The temperature on the display and as a line. Left out, a thermostat's `current_temperature` is used. |
| `target_temperature_entity` | sauna | The temperature to reach: within three degrees, the sauna reads *Ready*. Left out, the thermostat's own target. |
| `bubbles_entity` | spa | The bubbles or jets: *Bubbles*, the water boiling with them, and a *Bubbles* button on a switch. `light_entity` lights the water. |
| `tariff_entity` | meter | The tariff period (BASE, HP, HC, a Tempo colour), on the display and as a line. |
| `high_power` | meter | From this power the meter reads *High use* and its LED beats fast. 3000 by default, in the unit of the state entity (VA or W). |
| `tree_palette` | christmas_tree | `multicolor` (default) \| `red_gold` \| `red_silver` \| `gold_silver` \| `blue_silver` \| `white_silver` \| `red_green`: the baubles, the lights, the tinsel, the star, the pot and the presents. |
| `presents` | christmas_tree | `auto` (default, presents under the tree on 24 and 25 December only) \| `show` \| `hide`. |
| `spots` | lamp | The number of spots drawn, 1 to 4. Left out, a light group draws one spot per light, up to four. |
| `robot_layout` | robot | `vacuum` \| `mop` \| `mower` \| `stick` (a stick vacuum on its wall dock) \| `floor_washer` (a wet and dry floor washer in its station). Left out, a name that says stick, cordless or Dyson makes a stick vacuum, Tineco or floor washer a floor washer, a `lawn_mower` entity or a name that says mower, Landroid or Automower makes a mower, and Braava or mop a mopping robot. `pool` draws a pool robot whose cable follows it, with its `remaining_time_entity` on its power supply; a name that says pool, Dolphin, Maytronics, Aiper, Zodiac or Polaris picks it. |
| `robot_station` | robot | `station` (default: the vacuum's emptying station, the mop's washing station) \| `base` (a charging base alone). |
| `robot_shelter` | robot | `true` draws a shelter over a mower's base. The rain stops on its roof. |
| `robot_shelter_style` | robot | `lean_to` (default, a wooden lean-to with a corrugated roof) \| `shell` (a moulded shell on one leg). |
| `robot_shelter_color` | robot | The shell's colour: `white` (default) \| `grey` \| `black` \| `green` \| `orange`. |
| `away_threshold` | robot | A stick vacuum or a floor washer read from the plug its dock is on: above `power_on_threshold` (5 W by default) it is *Charging*, below it *Charged*, and at `away_threshold` (1 W by default) or less *Off the base*, in use or badly seated, its dock drawn empty. The plug switched off reads *Off*. |
| `robot_floor` | robot | The floor a vacuum or a mop works on: `rug` (default for a vacuum) \| `tiles` (default for a mop) \| `parquet` \| `smooth`. |
| `robot_controls` | robot | `true` adds the robot's own buttons, on a `vacuum` or `lawn_mower` entity: *Start* away from work, *Pause* at work, *Return to base* away from it. `controls_always: true` shows all three all the time. |
| `battery_corner` | robot | `true` moves the battery from the lines to a corner of the card, as an icon and its percentage, orange at 20 % or less. A tap opens its entity. |
| `robot_status_entity` | robot | The integration's detailed status, read for what the drawing can show: the station emptying the bin, washing or drying the pads, rain keeping a mower home, an edge cut. The `status` attribute of a vacuum entity is read without it. |
| `battery_entity` | robot | The battery, in %, when the robot's own entity does not carry it. On the base, *Charging* below 100 %, *Docked* above. |
| `robot_bin_entity` / `robot_water_entity` | robot | A full bin, an empty water tank: a binary sensor that is on, a sensor that says so, or a tank level in % (empty at 5 % or less, its level drawn in the robot). |
| `robot_rain_entity` | robot | Rain keeping a mower on its base: a cloud and its rain over the lawn. |
| `robot_error_entity` | robot | The error, worded: the robot puffs smoke and its text is shown. *no error*, *none*, `0` and the like are not errors, in any of the card's languages (*Aucune erreur*, *Keine Fehler*...), so a template sensor that words an error code works as it is. |
| `power_entity` | solar | The power the panels produce, in W or kW: *Producing* above 15 % of `peak_power` (100 W without it), *Low production* below it in daylight, *Night* once the sun has set (`sun.sun`, or no power at all without it). The `state_entity` is optional: an inverter's status, whose words for a fault make an *Error*. |
| `peak_power` | solar | The panels' peak power, in W, which the *Low production* threshold is taken from. |
| `energy_today_entity` | solar | The energy produced today, shown as a line. |
| `solar_layout` | solar | `ground` (default, two panels on their frame) \| `roof` (a house with its panels on the roof). |
| `solar_alert_entity` | solar | Anything that should raise the *Error*: the inverter smokes. |
| `battery_entity` | home battery | The level, in %. It fills the gauge and the screen, and at 10 % or less the battery is *Low battery*, in red. |
| `power_entity` / `power_inverted` / `power_on_threshold` | home battery | One power, positive while it charges and negative while it discharges, or the other way with `power_inverted: true`. Under `power_on_threshold` (10 W by default) either way, it is *Idle*, and *Full* at its charge limit. |
| `charge_power_entity` / `discharge_power_entity` | home battery | What goes in and what comes out, for the batteries that measure them apart (EcoFlow, Bluetti), in place of `power_entity`. |
| `reserve_entity` / `charge_limit_entity` | home battery | The backup reserve, drawn as a dashed line on the gauge and shown as a line, and the charge limit, *Full* once reached. |
| `battery_capacity` | home battery | The capacity, in kWh: with it the lines say how long until full, or until the reserve. |
| `battery_layout` | home battery | `wall` (a battery on the wall) \| `station` (a portable station). Left out, a name that says EcoFlow, Delta, Bluetti, Jackery, Anker or station makes a station. |
| `battery_alert_entity` | home battery | Anything that should raise the *Error*: a BMS fault. A state that says fault does the same. |
| `left_on_after` | iron | Minutes switched on after which the state line reads *Left on*, in red. Empty, it never does. |
| `feeder_layout` | pet feeder | `tower` (default, a square tank on its base) \| `canister` (a round tank on a round base) \| `double` (two outlets and two bowls) \| `dual_split` (two hoppers over one bowl split down the middle) \| `rotary` (plates on a turntable under a lid, for wet food). |
| `level_b_entity` | pet feeder | The second hopper's level, on a feeder with two (`dual_split`), read like `level_entity` and against the same `level_empty_below` and `level_max`. It fills the right-hand window, gets its own line, and empty it turns the state to *Tank empty* and leaves only its own half bare. At rest the state line shows the lower of the two levels, the hopper to refill first. The editor offers it only for `dual_split`. |
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
| `state_entity` | air purifier | A `fan` entity: *Purifying*, *Auto*, *Night mode*, *Heating* or *Off*, from its state and its `preset_mode`, in the words of each integration (*sleep*, *night*, *Silent*, *Quiet*...). A `climate` entity (a Dyson Hot+Cool), a `select` naming the mode (LG, Haier, Midea) or a plug work too. `state_map` accepts `off`, `run`, `night` and `heat`. |
| `purifier_layout` | air purifier | `cylinder` (default, blowing out of its top) \| `box` (a square box with its fan on top) \| `ring` (a bladeless ring, the default for a Dyson). The ring blows forward, turns from side to side while it oscillates and draws the air in while it blows backwards (`direction: reverse`). |
| `air_quality_entity` | air purifier | The air's quality on a four-step gauge (*Good*, *Fair*, *Poor*, *Very poor*) and a line: PM2.5 in µg/m³ (12, 35 and 55), a US AQI (50, 100, 150), Philips's allergen index from 1 to 12, or the words of VeSync, Winix, Coway, Dyson, IKEA, SmartThings, Matter and tuya-local. A scale the card cannot place shows no step. |
| `display_entity` | air purifier | An optional screen showing that entity's value, a PM2.5 reading or a temperature: on the front of the cylinder and the box, round above the gauge on the ring. |
| `night_mode_entity` / `heater_entity` | air purifier, fan | Night mode when it is a switch of its own (Dyson, Duux); the heating, from a `climate` entity's `hvac_action`, a switch or a select. Night dims the air and slows it, heat turns it orange, and both together give dim orange air. |
| `fan_layout` | fan | `stand` (default) \| `table` \| `ceiling` (the default for a fan named after the ceiling). |
| `oscillating` | fan | `true` for a fan on a plug that oscillates: the head turns and the air follows it. A `fan` entity that reports `oscillating` is believed instead. |
| `light_entity` / `wood_blades` / `fan_direction_inverted` | ceiling fan | The fan's light, drawn as a globe under the motor that lights up (no light, no globe); wooden blades; summer and winter swapped, for a fan whose `direction: forward` means winter. Summer draws the air up, winter sends the warm air under the ceiling back down, in orange. |
| `speed_entity` | cooker | Blade speed, banded onto three speeds. |
| `state_entity` / `fryer_layout` | air fryer | The fryer's own words, as Philips (HomeID and the older HACS integration), Xiaomi and Cosori (VeSync) report them: *Preheating*, *Preheated*, *Cooking*, *Shake the basket*, *Basket out*, *Paused*, *Keeping warm*, *Finished*, *Delayed start*. `fryer_layout`: `basket` (the default), `window` (a window onto the basket) or `dual` (two baskets). |
| `basket_entity` / `shake_entity` / `basket2_state_entity` | air fryer | The basket sensor, on while it is out (Philips' drawer, Xiaomi's pot), which turns a cycle into *Basket out*; the shake reminder, which turns cooking into *Shake the basket*; the state of the second basket of a dual fryer, drawn apart and named on a line. |
| `water_entity` | coffee | Tank: a Home Connect boolean, or a level in % with *empty* below 10%. |
| `beans_entity` / `tray_entity` / `descaling_entity` | coffee | Beans empty, tray full, descaling due. A missing tank or beans, or a full tray, frames that part of the drawing and lights a dot of the front panel orange. |
| `cups_entity` | coffee | Number of cups: a count, a boolean or a beverage name (*2 Espressi*). |
| `strength_entity` | coffee | Coffee strength, as a number or a word. |
| `state_entity` | EV charger | The charger's status: *No vehicle*, *Plugged in*, *Awaiting authorisation*, *Charging*, *Discharging*, *Charging paused*, *Scheduled*, *Charging complete*, *Error* or *Offline*, read in the words of OCPP and of the integrations in Home Assistant (see *EV chargers*). `state_map` accepts the ten as `no_vehicle`, `connected`, `awaiting_auth`, `charging`, `discharging`, `paused`, `scheduled`, `done`, `error` and `offline`. Optional: without it the plug and the power meter say it. |
| `vehicle_entity` | EV charger | Whether a car is plugged in: a plug's contact, or a cable state in words (`disconnected`, `cable_only`, `vehicle_connected`, `vehicle_locked`). No car turns a recognised status into *No vehicle*, unless the status is an error. |
| `power_entity` / `power_on_threshold` | EV charger | The power, in the meter's own unit and precision (*7.4 kW*). The threshold is in W whatever that unit, 100 W by default: power flows above it. It only stands in for a missing status, and tells a car that has its charge from one that paused. |
| `session_energy_entity` | EV charger | The energy of the session, as *Charged 12.4 kWh*. |
| `discharge_power_entity` | EV charger | The power the car gives back (V2H, V2G), such as OCPP's `Power.Active.Export`, as *Discharge 7.4 kW*. Above `power_on_threshold`, the car is *Discharging* (see *Bidirectional charging*). |
| `current_limit_entity` | EV charger | The current limit, as *Current limit 16 A*. A tap opens the entity, which is where it is changed. |
| `error_entity` | EV charger | A contact on, a code other than 0, or a word other than *no error* (OCPP's `NoError`, `ok`, `none`) turns the state into *Error*, with the charger's words on a line. |

</details>

## Examples and guides

One section per topic: click to open it.

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

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/family-network-models.gif" alt="Switches of 8 to 32 ports and NAS of 1 to 4 bays" width="100%">

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
<summary><b>Cameras</b></summary>

A camera's state, not its picture: Home Assistant has cards for that. Its `state_entity` is the camera entity: *Idle*, *Streaming*, *Recording* and *Off* come from it, *Motion detected* from a motion sensor, and *Offline* from a connectivity sensor that is off. Four shapes, found from the name and the brand: a pan and tilt indoor camera, a Netatmo Welcome tube, an outdoor camera on its arm and a dome.

```yaml
type: custom:ha-appliance-card
state_entity: camera.aarlo_camera_avant
motion_entity: binary_sensor.aarlo_motion_camera_avant
connectivity_entity: binary_sensor.aarlo_connected_camera_avant
```

</details>

<details>
<summary><b>Lamps</b></summary>

Its `state_entity` is the light: *On* or *Off*, and on, its brightness, its colour temperature and its effect in the lines. The drawing takes the light's colour and dims down to a quarter with its brightness; an effect turns the hue of a strip's segments or of the panels. A switch or a helper works too, drawn in a warm white, and the card's button switches the lamp on and off. Ten shapes, found from the name or picked with `lamp_layout`.

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

Three models are drawn, after the feeders people buy: a square tank on its base, a round tank on a round base, each with its bowl set down in front, and a double with two outlets on its front and a bowl under each. The small screen shows the time like the real ones, turns blue while the feeder serves, showing the portion when `serving_size_entity` is set, and red on an empty tank or an error. The child lock and the automatic lock go in the top corners, each showing whether it holds:

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

`rotary` is a wet-food feeder: plates on a turntable under a lid with one opening. Serving opens it, so the state entity is whatever says the lid is open, and the flap lifts on the plate in front. Its level is the plates left, counted out of the plates it holds:

```yaml
feeder_layout: rotary
state_entity: switch.wet_feeder_lid
level_entity: counter.wet_feeder_plates_left
level_max: 3
```

</details>

<details>
<summary><b>Pet fountains</b></summary>

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
<summary><b>Dehumidifiers, space heaters and towel warmers</b></summary>

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
