# HA Appliance Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-appliance-card?sort=semver)](https://github.com/ADNPolymerase/ha-appliance-card/releases)
[![HACS Action](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg)](https://www.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ADNPolymerase/ha-appliance-card/blob/main/LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/adnpolymerase)

<a href="https://buymeacoffee.com/adnpolymerase" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60"></a>
<a href="https://adnpolymerase.github.io/HA/" target="_blank"><img src="https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg" alt="Lien vers mon github.io pour mes autres projets" height="60"></a>

Une card Lovelace pour les appareils de cuisine et de buanderie — lave-linge, sèche-linge, lave-vaisselle, four, micro-ondes, hotte et plaque de cuisson. Cycle en cours, programme, temps restant, température, vitesse de ventilation, foyers de cuisson, état de la porte, alertes et commandes.

Aucune marque supposée : chaque champ est un mapping d'entité configurable, elle fonctionne donc avec **n'importe quelle** intégration (Electrolux, Samsung, LG, Home Connect, Miele, une prise connectée + capteurs template…).

> Retours et issues bienvenus.
> 🇬🇧 [Read in English](README.md)

![HA Appliance Card screenshot](https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/screenshot.fr.png)

## Fonctionnalités

- **Normalisation d'état** : `Idle`, `RUNNING`, `wash`, `En marche`… sont détectés automatiquement (insensible aux accents) et convertis en veille / préchauffage / en cours / en pause / terminé / différé / erreur. `state_map` couvre le reste ; les états inconnus sont affichés tels quels.
- **Sept types d'appareils**, chacun avec sa propre illustration animée : lave-linge (eau), sèche-linge (linge qui tourne), lave-vaisselle (bras d'aspersion), four (résistances qui rougeoient, porte qui bascule), micro-ondes (plateau qui tourne, cavité éclairée), hotte (flux d'air, faisceaux lumineux) et plaque de cuisson (niveau par foyer et chaleur résiduelle). Statique à l'arrêt, auto-détectée ou choisie via `appliance_type`. `compact: true` ne garde que le texte.
- **Fonctionne avec une simple prise connectée** : renseigne `power_entity` + `power_on_threshold` et l'état est déduit de la consommation — veille → en marche → terminé — sans aucune intégration de l'appareil.
- **Barre de progression** depuis un capteur de pourcentage direct, ou estimée côté client depuis le temps restant.
- **Programme, lignes d'info** (température, essorage…), **porte, alertes, connectivité** (icône wifi en haut à droite) — chacun optionnel et indépendant.
- **Démarrer / Pause / Reprendre / Stop**, affichés uniquement pour les entités que tu configures.
- **Interface traduite en 13 langues** (EN, FR, DE, ES, IT, NL, PT, SV, NO, DA, PL, RU, ZH), suivant la langue de Home Assistant.
- **Éditeur visuel** : choisis l'entité d'état et les autres champs sont auto-suggérés depuis les entités sœurs du même appareil.

## Installation (HACS)

Pas encore dans le store HACS par défaut — ajoute un dépôt personnalisé :

1. HACS → menu « ⋮ » → **Dépôts personnalisés**.
2. Dépôt : `https://github.com/ADNPolymerase/ha-appliance-card`, catégorie : **Dashboard**.
3. Installe **HA Appliance Card**, puis ajoute une card `custom:ha-appliance-card` (YAML ou éditeur visuel).

## Configuration

Seule `state_entity` est obligatoire — tout le reste est optionnel. Dans l'éditeur visuel, définir l'entité d'état pré-remplit automatiquement les autres champs quand une entité sœur correspondante est trouvée sur le même appareil ; chaque champ reste modifiable ou effaçable.

| Option | Description |
|---|---|
| `state_entity` | **Obligatoire.** Entité rapportant l'état général de l'appareil (n'importe quel domaine). |
| `state_map` | Map optionnelle : état brut → `idle`\|`running`\|`paused`\|`done`\|`delayed`\|`error`. |
| `state_show_raw` | `true` pour afficher le texte brut plutôt que le libellé traduit (couleur/animation suivent toujours la catégorie détectée). |
| `name` | Titre de la card. Par défaut, le nom convivial de l'entité d'état. |
| `compact` | `true` pour masquer l'illustration et n'afficher que le texte. |
| `appliance_type` | `auto` (défaut) \| `washer` \| `dryer` \| `dishwasher` \| `oven` \| `microwave` \| `hood` \| `cooktop`. L'éditeur visuel ne propose que les champs utilisables par le type choisi. |
| `toggle_entity` | Commande marche/arrêt, affichée en bouton d'alimentation sur la card et mise en évidence quand c'est allumé. N'importe quel `switch`/`button`/`script`/`input_boolean`/`fan`. Nommée ainsi pour ne pas être confondue avec `power_entity` ci-dessous, qui est le compteur de watts. |
| `power_entity` / `power_on_threshold` / `power_icon` | Capteur de puissance (W). Avec un seuil défini, l'état est déduit de la puissance plutôt que de `state_entity` : au-dessus du seuil c'est *en marche*, et la redescente sous le seuil signifie *terminé* jusqu'au prochain cycle. Pointer `state_entity` sur le même capteur de puissance suffit à l'activer, avec un seuil par défaut de 10 W. `power_icon` remplace l'icône par défaut `mdi:power-plug`. |
| `program_entity` / `program_format` | Entité du programme/cycle. `clean` (défaut) simplifie les motifs courants `"<catégorie> Pr <nom>"` ; `raw` affiche l'état tel quel. |
| `remaining_time_entity` / `remaining_time_unit` | Temps restant. Unité `auto` (défaut), `seconds`, ou `minutes`. |
| `remaining_time_hide_when_idle` | `true` pour n'afficher le temps restant que pendant la marche. Évite qu'une heure de fin périmée (Samsung SmartThings conserve celle du cycle précédent) reste affichée. |
| `progress_entity` | Capteur 0–100 optionnel ; remplace l'estimation côté client. |
| `door_entity` / `door_open_state` / `door_invert` / `door_hide_in_list` | Capteur de porte, l'état signifiant « ouverte » (défaut `on`), une bascule d'inversion, et une option pour ne pas faire figurer la porte dans la liste d'infos (elle reste visible sur l'illustration). |
| `alerts_entity` | Entité dont les *attributs* sont des indicateurs on/off ; tout attribut « on/true/active » s'affiche en alerte active. |
| `connectivity_entity` / `connectivity_connected_state` | Capteur de connectivité et l'état signifiant « connecté » (défaut `on`). |
| `info_entities` | Jusqu'à 5 entrées `{ entity, icon?, label?, value_map? }` en lignes d'info (température, essorage…). Les entités avec un device class `timestamp`/`date` sont formatées dans le fuseau horaire local et la langue de Home Assistant, comme HA les affiche. `value_map` renomme les valeurs brutes, pour les intégrations qui exposent une phase sous forme de code ou de terme non traduit (voir plus bas). |
| `start_entity` / `pause_entity` / `resume_entity` / `stop_entity` | Entités bouton/switch/script reliées à la commande correspondante. Seules celles configurées sont affichées. |

Par type :

| Option | Types | Description |
|---|---|---|
| `target_temperature_entity` / `current_temperature_entity` | four | Consigne et température réelle. Pendant la montée, la barre devient une jauge de préchauffage et l'état affiche *Préchauffage*. |
| `heating_entity` | four | Optionnel ; pilote le rougeoiement des résistances. À défaut, déduit de l'état en cours. |
| `light_entity` | four, hotte | Éclairage de la cavité / lampes de la hotte. Affiché en petite bascule dans l'en-tête de la card plutôt qu'en rangée de boutons, pour garder la card courte. |
| `power_level_entity` | micro-ondes, plaque | Niveau de puissance (ex. 800 W). Sur une plaque, c'est le niveau *global* remonté par les tables qui ne disent jamais quel foyer chauffe ; il pilote l'intensité du halo des foyers. |
| `fan_entity` | hotte | La source de la vitesse. La ligne reste visible hotte à l'arrêt (affichée *Arrêt*) — c'est en cliquant dessus qu'on change la vitesse.  Une entité `fan` utilise son pourcentage ou son preset ; un `select` (Home Connect expose le niveau de ventilation comme ça), un `sensor` ou un `number` est ramené sur une échelle 1–3, via la liste d'options quand elle existe. Un clic sur la ligne de vitesse ouvre l'entité pour la changer — sauf si l'intégration l'a passée en indisponible, auquel cas la ligne reste affichée mais n'est plus cliquable. |
| `boost_entity` | hotte | Mode intensif optionnel, quand le preset ne l'indique pas déjà. |
| `filter_life_entity` / `filter_reset_entity` | hotte | Usure du filtre à graisse (%) en barre, et un bouton de remise à zéro. |
| `zones` | plaque | Liste de `{ level_entity, residual_heat_entity?, name? }`, jusqu'à 6. Les niveaux peuvent être numériques (0–9) ou un mot (`boost`) ; un foyer éteint mais encore chaud affiche `H`. |
| `zones_layout` | plaque | `2x1` \| `2x2` \| `3x2`. Déduit du nombre de foyers par défaut. |
| `zones_count` | plaque | Nombre de foyers à dessiner quand aucune entité par foyer n'existe (4 par défaut). |
| `child_lock_entity` | plaque | Affiche un cadenas sur l'illustration. |

### Exemple

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

### Exemples four, hotte et plaque

```yaml
type: custom:ha-appliance-card
appliance_type: oven
state_entity: sensor.four_state
target_temperature_entity: number.four_consigne
current_temperature_entity: sensor.four_temperature
door_entity: binary_sensor.four_porte
light_entity: light.four_eclairage
remaining_time_entity: sensor.four_time_to_end
```

```yaml
type: custom:ha-appliance-card
appliance_type: hood
state_entity: fan.hotte
fan_entity: fan.hotte
light_entity: light.hotte
filter_life_entity: sensor.hotte_filtre_graisse
```

```yaml
type: custom:ha-appliance-card
appliance_type: cooktop
state_entity: sensor.plaque_state
child_lock_entity: binary_sensor.plaque_securite_enfant
zones:
  - level_entity: sensor.plaque_foyer_1_niveau
    residual_heat_entity: binary_sensor.plaque_foyer_1_chaud
    name: Avant gauche
  - level_entity: sensor.plaque_foyer_2_niveau
  - level_entity: sensor.plaque_foyer_3_niveau
  - level_entity: sensor.plaque_foyer_4_niveau
```

Avec une simple prise connectée :

```yaml
type: custom:ha-appliance-card
appliance_type: oven
name: Four
state_entity: sensor.prise_four_puissance
power_entity: sensor.prise_four_puissance
power_on_threshold: 10
```

### Renommer des valeurs brutes (`value_map`)

Certaines intégrations exposent la phase du cycle sous forme de simple nombre
ou de terme non traduit. `value_map` permet de les remplacer par du texte
lisible, entité d'info par entité d'info :

```yaml
info_entities:
  - entity: sensor.washing_machine_program_phase
    icon: mdi:washing-machine
    label: Phase
    value_map:
      0: Prêt
      1: Lavage
      2: Rinçage
      3: Essorage
      18: Terminé
```

Les clés sont d'abord comparées à l'état brut à l'identique, puis sans tenir
compte de la casse (donc `washing` correspond aussi à un état `Washing`). Les
valeurs non mappées sont affichées telles quelles, et un libellé mappé remplace
entièrement la valeur (aucune unité n'est ajoutée).

Dans l'éditeur visuel, la même chose se saisit sous forme d'une ligne
`code: libellé` par correspondance, sous chaque entité d'info. Le séparateur `=`
fonctionne aussi, les lignes vides et celles commençant par `#` sont ignorées,
et seul le premier `:` ou `=` découpe la ligne, donc un libellé peut lui-même en
contenir un.

## Remerciements

- [@chike-he](https://github.com/chike-he) — traduction chinoise ([#3](https://github.com/ADNPolymerase/ha-appliance-card/issues/3))
- [@pbarone](https://github.com/pbarone) — prise en charge de `device_class: timestamp` pour le temps restant ([#2](https://github.com/ADNPolymerase/ha-appliance-card/pull/2))

## Licence

MIT — voir [LICENSE](LICENSE).
