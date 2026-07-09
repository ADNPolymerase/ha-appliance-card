# HA Appliance Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-appliance-card?sort=semver)](https://github.com/ADNPolymerase/ha-appliance-card/releases)
[![HACS Action](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg)](https://www.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ADNPolymerase/ha-appliance-card/blob/main/LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/adnpolymerase)

<a href="https://buymeacoffee.com/adnpolymerase" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60"></a>
<a href="https://adnpolymerase.github.io/HA/" target="_blank"><img src="https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg" alt="Lien vers mon github.io pour mes autres projets" height="60"></a>

Une card Lovelace pour lave-linge, sèche-linge et lave-vaisselle — cycle en cours, programme, temps restant, état de la porte, alertes et commandes.

Aucune marque supposée : chaque champ est un mapping d'entité configurable, elle fonctionne donc avec **n'importe quelle** intégration (Electrolux, Samsung, LG, Home Connect, Miele, une prise connectée + capteurs template…).

> Statut : préversion. Retours et issues bienvenus.
> 🇬🇧 [Read in English](README.md)

![HA Appliance Card screenshot](https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/screenshot.fr.png)

## Fonctionnalités

- **Normalisation d'état** : `Idle`, `RUNNING`, `wash`, `En marche`… sont détectés automatiquement (insensible aux accents, 12 langues) et convertis en veille / en cours / en pause / terminé / différé / erreur. `state_map` couvre le reste ; les états inconnus sont affichés tels quels.
- **Illustration animée** (eau du lave-linge, linge qui tourne, bras d'aspersion) — statique à l'arrêt, auto-détectée ou choisie via `appliance_type`. La porte est représentée entrouverte sur l'illustration quand elle est ouverte. `compact: true` ne garde que le texte.
- **Barre de progression** depuis un capteur de pourcentage direct, ou estimée côté client depuis le temps restant.
- **Programme, lignes d'info** (température, essorage…), **porte, alertes, connectivité** (icône wifi en haut à droite) — chacun optionnel et indépendant.
- **Démarrer / Pause / Reprendre / Stop**, affichés uniquement pour les entités que tu configures.
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
| `appliance_type` | `auto` (défaut) \| `washer` \| `dryer` \| `dishwasher`. |
| `program_entity` / `program_format` | Entité du programme/cycle. `clean` (défaut) simplifie les motifs courants `"<catégorie> Pr <nom>"` ; `raw` affiche l'état tel quel. |
| `remaining_time_entity` / `remaining_time_unit` | Temps restant. Unité `auto` (défaut), `seconds`, ou `minutes`. |
| `progress_entity` | Capteur 0–100 optionnel ; remplace l'estimation côté client. |
| `door_entity` / `door_open_state` / `door_invert` | Capteur de porte, l'état signifiant « ouverte » (défaut `on`), et une bascule d'inversion. |
| `alerts_entity` | Entité dont les *attributs* sont des indicateurs on/off ; tout attribut « on/true/active » s'affiche en alerte active. |
| `connectivity_entity` / `connectivity_connected_state` | Capteur de connectivité et l'état signifiant « connecté » (défaut `on`). |
| `info_entities` | Jusqu'à 5 entrées `{ entity, icon?, label? }` en lignes d'info (température, essorage…). |
| `start_entity` / `pause_entity` / `resume_entity` / `stop_entity` | Entités bouton/switch/script reliées à la commande correspondante. Seules celles configurées sont affichées. |

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

## Licence

MIT — voir [LICENSE](LICENSE).
