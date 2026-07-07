# HA Appliance Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-appliance-card?sort=semver)](https://github.com/ADNPolymerase/ha-appliance-card/releases)
[![HACS Action](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg)](https://www.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ADNPolymerase/ha-appliance-card/blob/main/LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/adnpolymerase)

<a href="https://buymeacoffee.com/adnpolymerase" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60"></a>
<a href="https://adnpolymerase.github.io/HA/" target="_blank"><img src="https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg" alt="Lien vers mon github.io pour mes autres projets" height="60"></a>

Une card Lovelace Home Assistant pour lave-linge, sèche-linge et lave-vaisselle — cycle en cours, programme, temps restant, état de la porte, alertes et commandes.

Contrairement aux cards spécifiques à une marque, celle-ci ne suppose aucune intégration particulière. Chaque champ est un mapping d'entité configurable, elle fonctionne donc avec **n'importe quelle** intégration de lave-linge/sèche-linge/lave-vaisselle (Electrolux, Samsung, LG, Bosch/Siemens Home Connect, Miele, une simple prise connectée + capteurs template, etc.) du moment que tu la pointes vers les bonnes entités.

Interface multilingue (anglais, français, allemand, espagnol, italien, néerlandais, portugais, suédois, norvégien, danois, polonais — détectée automatiquement depuis Home Assistant).

> Statut : preview précoce. Retours et issues bienvenus.

> 🇬🇧 [Read in English](README.md)

![HA Appliance Card screenshot](https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/screenshot.fr.png)

## Fonctionnalités

- Fonctionne avec toutes les marques/intégrations : aucun ID d'entité codé en dur, tout est mappé dans la configuration de la card.
- Normalisation d'état : traduit n'importe quelle chaîne brute renvoyée par ton intégration (`Idle`, `Running`, `RUNNING`, `wash`, `Éteint`, `En marche`, ...) vers un vocabulaire commun en veille / en cours / en pause / terminé / différé / erreur, avec une détection automatique par mots-clés insensible aux accents et une surcharge explicite optionnelle via `state_map`. Pratique aussi pour un simple capteur template basé sur un seuil de puissance, pas seulement une vraie intégration d'électroménager. Si un état brut ne correspond à rien de connu, il est affiché tel quel plutôt qu'un "Inconnu" générique.
- Icône illustrée de l'appareil (lave-linge hublot avec eau animée, linge qui tourne pour un sèche-linge, bras d'aspersion pour un lave-vaisselle) — statique à l'arrêt, animée uniquement en cours de cycle. Type détecté automatiquement depuis l'entité/icône, ou choisi explicitement via `appliance_type`.
- Barre de progression : utilise un capteur de pourcentage direct si ton intégration en expose un, sinon l'estime côté client à partir du capteur de temps restant.
- Nom du programme, lignes d'info complémentaires (température, essorage, vapeur, ...), état de la porte et alertes — chacun optionnel et configurable indépendamment. Les libellés des lignes d'info suppriment automatiquement un préfixe de nom d'appareil répété (ex : une entité nommée "Lave-linge Pods" s'affiche juste "Pods").
- La porte est représentée entrouverte directement sur l'illustration quand elle est ouverte, en plus d'une ligne de texte ; la connectivité est affichée sous forme d'une petite icône wifi/wifi coupé en haut à droite plutôt qu'en ligne de texte.
- Commandes Démarrer / Pause / Reprendre / Stop (affichées uniquement pour les boutons/entités que tu configures).
- Mode compact pour masquer l'illustration et ne garder que le texte.
- Éditeur visuel : choisis l'entité d'état et la plupart des autres champs sont auto-suggérés à partir des entités sœurs du même appareil — modifiable via le sélecteur d'entité.

## Installation (HACS)

Cette card n'est pas encore dans le store HACS par défaut. Ajoute-la en dépôt personnalisé :

1. HACS → menu "⋮" (en haut à droite) → **Dépôts personnalisés**.
2. Dépôt : `https://github.com/ADNPolymerase/ha-appliance-card`, catégorie : **Dashboard** (Lovelace plugin).
3. Installe **HA Appliance Card**, puis recharge/vide le cache si la ressource ne se charge pas automatiquement.
4. Ajoute une card de type `custom:ha-appliance-card` sur un tableau de bord, via YAML ou l'éditeur visuel.

## Configuration

Seule `state_entity` est obligatoire — tout le reste est optionnel. Dans l'éditeur visuel, définir l'entité d'état pré-remplit automatiquement les autres champs quand une entité sœur correspondante est trouvée sur le même appareil ; chaque champ reste modifiable ou effaçable.

| Option | Description |
|---|---|
| `state_entity` | **Obligatoire.** Entité rapportant l'état général de l'appareil (n'importe quel domaine). |
| `state_map` | Map optionnelle chaîne d'état brute → `idle`\|`running`\|`paused`\|`done`\|`delayed`\|`error`, pour les intégrations dont le vocabulaire n'est pas auto-détecté. |
| `state_show_raw` | `true` pour toujours afficher le texte brut de l'entité plutôt que le libellé traduit de la catégorie (la couleur/l'animation suivent toujours la catégorie détectée). Désactivé par défaut ; pratique pour un simple capteur template basé sur un seuil de puissance, quand tu préfères voir ton propre texte plutôt qu'un "Idle"/"Running" générique. |
| `name` | Titre de la card. Par défaut, le nom convivial de l'entité d'état. |
| `compact` | `true` pour masquer l'illustration et n'afficher que le texte. |
| `appliance_type` | `auto` (défaut) \| `washer` \| `dryer` \| `dishwasher`. |
| `program_entity` / `program_format` | Entité contenant le programme/cycle sélectionné. `program_format: clean` (défaut) simplifie les motifs courants `"<catégorie> Pr <nom>"` ; `raw` affiche l'état tel quel. |
| `remaining_time_entity` / `remaining_time_unit` | Entité du temps restant. Unité `auto` (défaut, lue depuis l'entité), `seconds`, ou `minutes`. |
| `progress_entity` | Capteur 0–100 optionnel ; remplace l'estimation de progression côté client. |
| `door_entity` / `door_open_state` / `door_invert` | Capteur de porte, la valeur d'état signifiant "ouverte" (défaut `on`), et une bascule `invert` pour les capteurs où cet état signifie en réalité fermée. |
| `alerts_entity` | Une entité dont les *attributs* sont chacun un indicateur on/off (ex : `door: OFF`, `water_leak: ON`) ; tout attribut correspondant à une valeur "on/true/active" s'affiche comme alerte active. |
| `connectivity_entity` / `connectivity_connected_state` | Capteur de connectivité et la valeur d'état signifiant "connecté" (défaut `on`) ; affiché en icône wifi en haut à droite. |
| `info_entities` | Jusqu'à 5 entrées `{ entity, icon?, label? }` affichées en lignes d'info complémentaires (température, essorage, ...). L'éditeur visuel permet de choisir combien (0–5) et de personnaliser le nom affiché de chacune. |
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
