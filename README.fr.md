# HA Appliance Card

[![hacs_badge](https://img.shields.io/badge/HACS-Default-41BDF5.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-appliance-card?sort=semver)](https://github.com/ADNPolymerase/ha-appliance-card/releases)
[![HACS Action](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg)](https://www.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ADNPolymerase/ha-appliance-card/blob/main/LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/adnpolymerase)

<a href="https://buymeacoffee.com/adnpolymerase" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60"></a>
<a href="https://adnpolymerase.github.io/HA/" target="_blank"><img src="https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg" alt="Lien vers mon github.io pour mes autres projets" height="60"></a>

Une card Lovelace pour les appareils de cuisine et de buanderie : lave-linge, sèche-linge, lave-vaisselle, four, micro-ondes, hotte, plaque de cuisson, réfrigérateur, bouilloire, robot cuiseur, machine à café et cuiseur à riz. Cycle en cours, programme, temps restant, température, vitesse de ventilation, foyers de cuisson, état de la porte, alertes et commandes.

Aucune marque supposée : chaque champ est un mapping d'entité configurable, elle fonctionne donc avec **n'importe quelle** intégration (Electrolux, Samsung, LG, Home Connect, Miele, une prise connectée + capteurs template…).

> Retours et issues bienvenus.
> 🇬🇧 [Read in English](README.md)

![HA Appliance Card screenshot](https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/screenshot.fr.png)

## Fonctionnalités

- **Normalisation d'état** : `Idle`, `RUNNING`, `wash`, `En marche`… sont détectés automatiquement (insensible aux accents) et convertis en veille / préchauffage / en cours / en pause / terminé / différé / erreur. `state_map` couvre le reste ; les états inconnus sont affichés tels quels.
- **Douze types d'appareils**, chacun avec sa propre illustration animée : lave-linge (eau), sèche-linge (linge qui tourne), lave-vaisselle (bras d'aspersion), four (résistances qui rougeoient, porte qui bascule), micro-ondes (plateau qui tourne, cavité éclairée), hotte (flux d'air, faisceaux lumineux), plaque de cuisson (niveau par foyer et chaleur résiduelle), réfrigérateur (chaque porte s'ouvre pour son propre capteur, intérieur éclairé, glaçons qui tombent), bouilloire (socle rouge, bulles, vapeur), robot cuiseur (couteau qui tourne, résistance chaude, vapeur), machine à café (café qui coule, tasse qui se remplit, niveau du réservoir) et cuiseur à riz (vapeur, maintien au chaud). Statique à l'arrêt, auto-détectée ou choisie via `appliance_type`. `compact: true` ne garde que le texte.
- **Une machine à café dit ce qui lui manque** : réservoir vide, bac à grains vide, bac d'égouttage plein ou détartrage à faire prennent la ligne d'état dès que la machine ne coule pas, dans l'ordre où chacun t'empêche d'avoir ton café. Seul ce qui demande une action prend une ligne.
- **Un réfrigérateur rapporte sa santé, pas un cycle** : il ne s'arrête jamais, donc *En cours* serait vrai de lui à toute heure. La ligne d'état porte à la place la seule chose qui compte, dans l'ordre du coût à l'ignorer : débranché, une porte restée ouverte, une température au-dessus de la limite, sinon normal. En lecture seule, sans aucun bouton.
- **Fonctionne avec une simple prise connectée** : renseigne `power_entity` + `power_on_threshold` et l'état est déduit de la consommation (veille → en marche → terminé), sans aucune intégration de l'appareil.
- **Barre de progression** depuis un capteur de pourcentage direct, ou estimée côté client depuis le temps restant.
- **Programme, lignes d'info** (température, essorage…), **porte, alertes, connectivité** (icône wifi en haut à droite), chacun optionnel et indépendant.
- **Démarrer / Pause / Reprendre / Stop**, affichés uniquement pour les entités que tu configures.
- **Se dimensionne dans les dashboards Sections** : la card déclare sa largeur et sa hauteur, elle n'est plus compressée au point de replier ses lignes d'info.
- **Interface traduite en 13 langues** (EN, FR, DE, ES, IT, NL, PT, SV, NO, DA, PL, RU, ZH), suivant la langue de Home Assistant.
- **Éditeur visuel** : choisis l'entité d'état et les autres champs sont auto-suggérés depuis les entités sœurs du même appareil.

Les illustrations sont en CSS, pas en images, et elles s'animent sur les données de l'appareil : le couteau fait un tour par saccade à la vitesse remontée par le robot, le café coule dans une tasse ou deux, les glaçons tombent tant que la machine produit, la bouilloire bout et fume.

![Types d'appareils animés](https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/animated.fr.gif)

## Installation

### Par HACS

1. Dans HACS, cherche **HA Appliance Card** et installe-la.
2. Ajoute une card `custom:ha-appliance-card` à ton tableau de bord, en YAML ou via l'éditeur visuel.

### À la main

1. Télécharge `ha-appliance-card.js` depuis la [dernière release](https://github.com/ADNPolymerase/ha-appliance-card/releases/latest) et dépose-le dans `config/www/`.
2. Déclare la ressource dans **Paramètres > Tableaux de bord > Ressources**, URL `/local/ha-appliance-card.js`, type **Module JavaScript**.
3. Ajoute une card `custom:ha-appliance-card` à ton tableau de bord.

HACS tient la card à jour tout seul ; une installation manuelle est à refaire à chaque release.

## Configuration

Seule `state_entity` est obligatoire ; tout le reste est optionnel. Le réfrigérateur fait exception : une sonde de température ou un contact de porte suffisent à eux seuls, puisqu'un frigo n'a pas d'état à rapporter. Dans l'éditeur visuel, définir l'entité d'état pré-remplit automatiquement les autres champs quand une entité sœur correspondante est trouvée sur le même appareil ; chaque champ reste modifiable ou effaçable.

| Option | Description |
|---|---|
| `state_entity` | **Obligatoire**, sauf sur un réfrigérateur. Entité rapportant l'état général de l'appareil (n'importe quel domaine). |
| `state_map` | Map optionnelle : état brut → `idle`\|`running`\|`paused`\|`done`\|`delayed`\|`error`\|`keep_warm`. |
| `state_show_raw` | `true` pour afficher le texte brut plutôt que le libellé traduit (couleur/animation suivent toujours la catégorie détectée). |
| `name` | Titre de la card. Par défaut, le nom convivial de l'entité d'état. |
| `compact` | `true` pour masquer l'illustration et n'afficher que le texte. |
| `language` | `auto` (défaut) suit Home Assistant. N'importe lequel des treize codes livrés (`en`, `fr`, `de`, `es`, `it`, `nl`, `pt`, `sv`, `no`, `da`, `pl`, `ru`, `zh`) fixe cette card, et son éditeur, dans cette langue. Pour faire tourner Home Assistant dans une langue et lire une card dans une autre. |
| `appliance_type` | `auto` (défaut) \| `washer` \| `dryer` \| `dishwasher` \| `oven` \| `microwave` \| `hood` \| `cooktop` \| `fridge` \| `kettle` \| `cooker` \| `coffee` \| `rice_cooker`. L'éditeur visuel ne propose que les champs utilisables par le type choisi. |
| `toggle_entity` | Commande marche/arrêt, affichée en bouton d'alimentation sur la card et mise en évidence quand c'est allumé. N'importe quel `switch`/`button`/`script`/`input_boolean`/`fan`. Nommée ainsi pour ne pas être confondue avec `power_entity` ci-dessous, qui est le compteur de watts. |
| `power_entity` / `power_on_threshold` / `power_icon` | Capteur de puissance (W). Avec un seuil défini, l'état est déduit de la puissance plutôt que de `state_entity` : au-dessus du seuil c'est *en marche*, et la redescente sous le seuil signifie *terminé* jusqu'au prochain cycle. Pointer `state_entity` sur le même capteur de puissance suffit à l'activer, avec un seuil par défaut de 10 W. `power_icon` remplace l'icône par défaut `mdi:power-plug`. |
| `program_entity` / `program_format` | Entité du programme/cycle. `clean` (défaut) simplifie le motif courant `"<catégorie> Pr <nom>"`, retire l'espace de noms d'un enum Home Connect complet (`LaundryCare.Washer.Program.Auto40` s'affiche *Auto 40*) et détache une température ou une durée collée au nom (`Rapid20Min` s'affiche *Rapid 20 Min*). `raw` affiche l'état tel quel. |
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
| `target_temperature_entity` / `current_temperature_entity` | four, robot cuiseur, cuiseur à riz | Consigne et température réelle. Pendant la montée, la barre devient une jauge de chauffe et l'état affiche *Préchauffage*. |
| `heating_entity` | four, robot cuiseur, cuiseur à riz | Optionnel ; pilote le rougeoiement des résistances. À défaut, déduit de l'état en cours. |
| `light_entity` | four, hotte | Éclairage de la cavité / lampes de la hotte. Affiché en petite bascule dans l'en-tête de la card plutôt qu'en rangée de boutons, pour garder la card courte. |
| `power_level_entity` | micro-ondes, plaque | Niveau de puissance (ex. 800 W). Sur une plaque, c'est le niveau *global* remonté par les tables qui ne disent jamais quel foyer chauffe ; il pilote l'intensité du halo des foyers. |
| `fan_entity` | hotte | La source de la vitesse. La ligne reste visible hotte à l'arrêt (affichée *Arrêt*), car c'est en cliquant dessus qu'on change la vitesse.  Une entité `fan` utilise son pourcentage ou son preset ; un `select` (Home Connect expose le niveau de ventilation comme ça), un `sensor` ou un `number` est ramené sur une échelle 1–3, via la liste d'options quand elle existe. Un clic sur la ligne de vitesse ouvre l'entité pour la changer, sauf si l'intégration l'a passée en indisponible, auquel cas la ligne reste affichée mais n'est plus cliquable. |
| `boost_entity` | hotte | Mode intensif optionnel, quand le preset ne l'indique pas déjà. |
| `filter_life_entity` / `filter_reset_entity` | hotte | Usure du filtre à graisse (%) en barre, et un bouton de remise à zéro. |
| `zones` | plaque | Liste de `{ level_entity, residual_heat_entity?, name? }`, jusqu'à 6. Les niveaux peuvent être numériques (0–9) ou un mot (`boost`) ; un foyer éteint mais encore chaud affiche `H`. |
| `zones_layout` | plaque | `2x1` \| `2x2` \| `3x2`. Déduit du nombre de foyers par défaut. |
| `zones_count` | plaque | Nombre de foyers à dessiner quand aucune entité par foyer n'existe (4 par défaut). |
| `child_lock_entity` | plaque | Affiche un cadenas sur l'illustration. |
| `fridge_layout` | frigo | `freezer_bottom` (défaut) \| `freezer_top` \| `side_by_side` \| `single`. Une seule option, parce que sur un vrai frigo le nombre de portes et la position du congélateur sont le même fait. |
| `fridge_temperature_entity` / `freezer_temperature_entity` | frigo | Les deux afficheurs sur les portes. Un simple capteur de température posé dans le frigo suffit. Rien n'est dessiné sans l'entité ; une sonde qui cesse de répondre affiche `--°` plutôt qu'une valeur périmée, ce que fait un capteur Zigbee quand le frigo est débranché mais que le capteur, lui, continue. |
| `fridge_max_temperature` | frigo | Au-dessus, l'état passe en *Température haute* et l'afficheur vire au rouge. 8 °C par défaut. |
| `door_entity` / `freezer_door_entity` | frigo | Une porte par capteur : chaque battant s'ouvre pour le sien, charnière côté extérieur, et le compartiment éclairé apparaît derrière. Avec un seul capteur, seule la porte du réfrigérateur bouge. |
| `ice_maker_entity` | frigo | Les glaçons tombent quand elle produit et s'éteignent sinon. Sans entité, aucun distributeur n'est dessiné. |
| `power_entity` / `power_on_threshold` | frigo | Lu à l'envers sur un frigo : *rester sous* le seuil est le défaut, pas l'état de repos. 1 W par défaut. L'alerte attend 30 minutes, parce qu'une prise émet des 0 W isolés alors que tout va bien. Le plus long train mesuré sur un vrai frigo a duré 15 minutes. |
| `temperature_entity` | bouilloire | Température de l'eau, affichée sur le corps. Sans entité, aucun afficheur. |
| `speed_entity` | robot cuiseur | Vitesse du couteau, dessinée par la vitesse de rotation. Un nombre est ramené sur trois vitesses (un Thermomix va jusqu'à 10) ; un mot autre qu'*arrêt* (`Turbo`, `Pétrissage`) compte pour la plus rapide. La vraie valeur reste sur la ligne d'info. |
| `water_entity` | machine à café | Les deux formes marchent. Home Connect émet `ConsumerProducts.CoffeeMaker.Event.WaterTankEmpty`, donc l'entité est un booléen ; une cafetière filtre remonte plutôt un niveau, et là c'est le pourcentage qui est affiché et dessiné, avec *vide* sous 10 %. |
| `beans_entity` / `tray_entity` / `descaling_entity` | machine à café | Les trois autres événements Home Connect : `BeanContainerEmpty`, `DripTrayFull`, `DeviceShouldBeDescaled`. |
| `cups_entity` | machine à café | Combien de tasses arrivent. Un compte (les cafetières filtre vont de 1 à 12), un booléen (`Option.MultipleBeverages` chez Home Connect), ou un nom de boisson dont le pluriel est dans le mot (le select `product` de Jura : *2 Espressi*). Le dessin montre une tasse ou deux ; la ligne garde la vraie valeur. |
| `strength_entity` | machine à café | Force du café : `Option.BeanAmount` chez Home Connect, `coffee_strength` chez Jura. Nombres et mots sont ramenés sur le remplissage du bac à grains. |

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

- [@chike-he](https://github.com/chike-he) : traduction chinoise ([#3](https://github.com/ADNPolymerase/ha-appliance-card/issues/3))
- [@pbarone](https://github.com/pbarone) : prise en charge de `device_class: timestamp` pour le temps restant ([#2](https://github.com/ADNPolymerase/ha-appliance-card/pull/2))

## Licence

MIT. Voir [LICENSE](LICENSE).
