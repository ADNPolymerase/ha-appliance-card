# HA Appliance Card

[![hacs_badge](https://img.shields.io/badge/HACS-Default-41BDF5.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-appliance-card?sort=semver)](https://github.com/ADNPolymerase/ha-appliance-card/releases)
[![HACS Action](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg)](https://www.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ADNPolymerase/ha-appliance-card/blob/main/LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/adnpolymerase)

<a href="https://buymeacoffee.com/adnpolymerase" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60"></a>
<a href="https://adnpolymerase.github.io/HA/" target="_blank"><img src="https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg" alt="Lien vers mon github.io pour mes autres projets" height="60"></a>

Une card Lovelace pour les appareils de la maison : lave-linge, sèche-linge, lave-vaisselle, four, micro-ondes, hotte, plaque de cuisson, réfrigérateur, bouilloire, robot cuiseur, machine à café, cuiseur à riz, chauffe-eau, chaudière, pompe à chaleur, imprimante 3D et distributeur de croquettes. Cycle en cours, programme, temps restant, température, alertes et commandes.

Aucune marque supposée : chaque champ est une entité à choisir, elle fonctionne donc avec **n'importe quelle** intégration (Electrolux, Samsung, LG, Home Connect, Miele, une simple prise connectée…).

> Retours et issues bienvenus.
> 🇬🇧 [Read in English](README.md)

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/screenshot.fr.png" alt="HA Appliance Card screenshot" width="640">

## Fonctionnalités

- **Dix-sept types d'appareils**, chacun avec une illustration en CSS animée sur les données de l'appareil et statique à l'arrêt. Le type est détecté tout seul ou choisi via `appliance_type`, et `compact: true` ne garde que le texte.
- **Normalisation d'état** : `Idle`, `RUNNING`, `wash`, `En marche`… sont reconnus (sans tenir compte des accents) et classés en veille, préchauffage, en cours, en pause, terminé, différé ou erreur. Un état inconnu s'affiche tel quel, sans l'espace de noms de l'intégration, et `state_map` classe le reste, `"*"` ramassant tout ce qui dépasse.
- **L'étape, et non une heure d'*En cours*** : un lave-linge, un sèche-linge ou un lave-vaisselle nomme l'étape où il en est (*Prélavage*, *Lavage*, *Rinçage*, *Essorage*, *Séchage* et sept autres), d'après une entité de phase ou son propre état, et le tambour s'emballe pendant l'essorage. Le temps restant est toujours celui du cycle entier.
- **Une lavante-séchante est un lave-linge qui sèche** : `washer_dryer: true`, et le tambour montre de l'eau pendant le lavage, puis du linge qui tourne dans l'air chaud pendant le séchage. L'étape vient de l'état lui-même ou d'une entité de phase, et la ligne d'état lit *Lavage* ou *Séchage*.
- **Chaque appareil dit ce qui compte pour lui** : une machine à café ce qui lui manque (eau, grains, bac, détartrage), un réfrigérateur sa santé (débranché, porte ouverte, température haute), une chaudière mixte ce qu'elle chauffe (chauffage, eau chaude ou veille), une imprimante 3D ce que fait l'impression (préchauffage, nivellement, changement de filament).
- **Fonctionne avec une simple prise connectée** : `power_entity` et `power_on_threshold` suffisent à déduire l'état de la consommation.
- **Programme, temps restant, barre de progression, lignes d'info, porte, alertes, connectivité et commandes** (démarrer, pause, reprise, stop), chacun optionnel.
- **14 langues** (EN, FR, DE, ES, IT, NL, PT, SV, NO, DA, PL, RU, ZH, CS), celle de Home Assistant ou fixée sur la card.
- **Éditeur visuel** qui pré-remplit les champs depuis les entités du même appareil et ne propose que ceux utiles au type choisi.

![Types d'appareils animés](https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/animated.fr.gif)

## Installation

### Par HACS

1. Dans HACS, cherche **HA Appliance Card** et installe-la.
2. Ajoute une card `custom:ha-appliance-card` à ton tableau de bord.

### À la main

1. Télécharge `ha-appliance-card.js` depuis la [dernière release](https://github.com/ADNPolymerase/ha-appliance-card/releases/latest) et dépose-le dans `config/www/`.
2. Ajoute la ressource `/local/ha-appliance-card.js`, type **Module JavaScript**, dans **Paramètres > Tableaux de bord > Ressources**.
3. Ajoute une card `custom:ha-appliance-card`. Une installation manuelle est à refaire à chaque release.

## Configuration

Seule `state_entity` est obligatoire, sauf sur un réfrigérateur où une sonde ou un contact de porte suffit. Dans l'éditeur visuel, choisir l'entité d'état pré-remplit les autres champs.

| Option | Description |
|---|---|
| `state_entity` | **Obligatoire**, sauf sur un frigo. Entité portant l'état de l'appareil, de n'importe quel domaine. |
| `state_map` | Table état brut → `idle` \| `running` \| `preheating` \| `keep_warm` \| `paused` \| `done` \| `delayed` \| `error`. Fixe le libellé, la couleur et l'animation. La clé `"*"` ramasse tous les états qui dépassent (voir plus bas), et sur un lave-linge, un sèche-linge ou un lave-vaisselle les étapes (`washing`, `spinning`...) sont aussi des cibles. Aussi dans l'éditeur visuel. |
| `state_show_raw` | `true` affiche le texte brut plutôt que le libellé traduit. |
| `name` | Titre de la card. Par défaut, le nom de l'entité d'état. |
| `compact` | `true` masque l'illustration. |
| `illustration_color` | `auto` (défaut, suit le thème) \| `white` \| `grey` \| `black`. Ne change que la carrosserie, pas les couleurs d'état. |
| `language` | `auto` (défaut, suit Home Assistant) ou l'un des 14 codes : `en`, `fr`, `de`, `es`, `it`, `nl`, `pt`, `sv`, `no`, `da`, `pl`, `ru`, `zh`, `cs`. `nb` et `nb-NO` donnent le norvégien. |
| `appliance_type` | `auto` (défaut) \| `washer` \| `dryer` \| `dishwasher` \| `oven` \| `microwave` \| `hood` \| `cooktop` \| `fridge` \| `kettle` \| `cooker` \| `coffee` \| `rice_cooker` \| `water_heater` \| `boiler` \| `heat_pump` \| `printer_3d` \| `pet_feeder`. |
| `toggle_entity` | Bouton marche/arrêt (`switch`, `button`, `script`, `input_boolean`, `fan`), mis en évidence quand c'est allumé. |
| `power_entity` / `power_on_threshold` / `power_icon` | Capteur de puissance. Avec un seuil, l'état en est déduit : *en marche* au-dessus, puis *terminé* en redescendant. Pointer `state_entity` sur ce même capteur l'active avec un seuil de 10 W. `power_icon` remplace `mdi:power-plug`. |
| `program_entity` / `program_format` | Programme. `clean` (défaut) le rend lisible (`LaundryCare.Washer.Program.Auto40` devient *Auto 40*, `Rapid20Min` devient *Rapid 20 Min*), `raw` l'affiche tel quel. |
| `remaining_time_entity` / `remaining_time_unit` | Temps restant, en `auto` (défaut, d'après l'unité de l'entité : s, min, h, ms, d, ou `1:02:03`), `seconds`, `minutes` ou `hours`, ou une heure de fin (`timestamp`). Il donne aussi la barre de progression : le temps écoulé depuis le début du cycle, pauses retirées, sur ce temps plus ce qui reste. Ouverte en plein cycle, la carte retrouve le début dans l'historique de l'état. |
| `remaining_time_hide_when_idle` | `true` n'affiche le temps restant qu'en marche, contre les heures de fin périmées (SmartThings). |
| `remaining_time_split` | `true` met l'heure de fin sur sa propre ligne, pour une card étroite. |
| `progress_entity` | Capteur 0-100 qui remplace l'estimation tirée du temps restant. |
| `door_entity` / `door_open_state` / `door_invert` / `door_hide_in_list` | Capteur de porte, état « ouverte » (défaut `on`), inversion, et masquage de la ligne (la porte reste dessinée). |
| `alerts_entity` | Entité dont chaque *attribut* à on, true ou active s'affiche en alerte. |
| `alerts_entities` | Jusqu'à 8 alertes, une entité chacune (sel, liquide de rinçage, i-Dos, filtres… de Home Connect), en `{ entity, label?, icon? }` ou en simple identifiant, affichées tant qu'elles sont à on, true, active, *present* ou *confirmed* : une seule sous son propre nom, plusieurs derrière leur nombre (voir *Entités d'alerte*). |
| `connectivity_entity` / `connectivity_connected_state` | Connectivité, en icône wifi, et état « connecté » (défaut `on`). |
| `info_entities` | Jusqu'à 8 lignes `{ entity, icon?, label?, value_map?, hide_unit? }`, les suivantes sont ignorées, affichées sous les lignes que la carte lit d'elle-même. Un appui ouvre la fiche de l'entité, ce qui permet de réinitialiser un réservoir ou un filtre depuis la carte. Au-delà de 5 lignes, l'espacement se resserre. Les valeurs s'affichent comme dans Home Assistant, avec la précision d'affichage de l'entité. `value_map` renomme les valeurs brutes (voir plus bas), `hide_unit` masque l'unité. |
| `lines_order` | L'ordre des lignes d'info, donné par leurs clés : `program`, `remaining`, `door`, celles que chaque type apporte (`level`, `last_feed`, `flow_return`, `nozzle`…) et, pour les lignes ajoutées, leur identifiant d'entité. L'éditeur visuel l'écrit tout seul au glisser. Les lignes non citées gardent leur place après celles qui le sont, et une ligne qui ne s'affiche pas est ignorée. |
| `start_entity` / `pause_entity` / `resume_entity` / `stop_entity` | Commandes, affichées seulement si configurées. Une commande est d'ordinaire un `button`, un `script` ou une `automation`, qui est déclenchée et non désactivée, et peut aussi être un `select` ou un `number` : `start_option` dit quelle option choisir (la carte la prend toute seule quand la liste n'en propose qu'une), `start_value` ce qu'il faut écrire. Idem pour les trois autres, en `pause_option`, `stop_value` et ainsi de suite. |

Par type :

| Option | Types | Description |
|---|---|---|
| `washer_dryer` | lave-linge | `true` pour une machine qui lave puis sèche, sous forme de case sous le type d'appareil. Un nom qui le dit suffit ; `false` ramène le lave-linge ordinaire. |
| `phase_entity` / `phase_map` | lave-linge, sèche-linge, lave-vaisselle | L'étape du cycle, nommée sur la ligne d'état. Voir *Étapes du cycle* plus bas. |
| `target_temperature_entity` / `current_temperature_entity` | four, robot cuiseur, cuiseur à riz | Consigne et température réelle. Pendant la montée, la barre devient une jauge de préchauffage. |
| `heating_entity` | four, robot cuiseur, cuiseur à riz, chauffe-eau | Dit s'il chauffe quand l'entité d'état ne le dit pas. À défaut, déduit de l'état en cours. |
| `light_entity` | four, hotte, imprimante 3D | Éclairage, en petite bascule dans l'en-tête. Allumé, il éclaire aussi l'enceinte de l'imprimante. |
| `power_level_entity` | micro-ondes, plaque | Niveau de puissance. Sur une plaque, il règle l'intensité du halo des foyers. |
| `fan_entity` | hotte | Vitesse : pourcentage ou preset d'un `fan`, ou `select`, `sensor` ou `number` ramené sur 1 à 3. Un clic sur la ligne ouvre l'entité pour la changer. |
| `boost_entity` | hotte | Mode intensif, quand le preset ne le dit pas. |
| `filter_life_entity` / `filter_reset_entity` | hotte | Usure du filtre en barre, et bouton de remise à zéro. |
| `zones` / `zones_layout` / `zones_count` | plaque | Jusqu'à 6 foyers `{ level_entity, residual_heat_entity?, name? }`, niveau en chiffre ou en mot (`boost`), `H` pour la chaleur résiduelle. Disposition `2x1` \| `2x2` \| `3x2`, et nombre de foyers à dessiner sans entité (4 par défaut). |
| `child_lock_entity` | plaque | Cadenas sur l'illustration. |
| `fridge_layout` | frigo | `freezer_bottom` (défaut) \| `freezer_top` \| `side_by_side` \| `single` \| `wine` (porte vitrée et bouteilles, pour une cave à vin). |
| `fridge_temperature_entity` / `freezer_temperature_entity` / `fridge_max_temperature` / `temperature_hide_in_list` | frigo | Températures affichées sur les portes et dans la liste, `--°` si la sonde se tait (`temperature_hide_in_list` ne les laisse que sur les portes). Au-dessus du maximum (8 °C par défaut, 18 °C pour `wine`), l'état passe en *Température haute*. |
| `door_entity` / `freezer_door_entity` | frigo | Chaque porte s'ouvre pour son propre capteur. |
| `ice_maker_entity` | frigo | Les glaçons tombent quand elle produit. |
| `power_entity` / `power_on_threshold` / `no_power_after` | frigo | Rester sous le seuil (1 W par défaut) plus de `no_power_after` minutes (30 par défaut) signale *Aucune consommation*, en orange : une longue pause du compresseur ressemble à ça. Compté depuis le dernier changement de la mesure : recharger la page ne le remet pas à zéro. |
| `plug_entity` | frigo | L'interrupteur de la prise connectée. Coupé, l'état passe tout de suite en *Débranché*. Débranché ou sans consommation, la lumière intérieure s'éteint. |
| `temperature_decimals` | frigo, bouilloire, chauffe-eau, chaudière, pompe à chaleur | `0` (défaut, au degré), `1` (au dixième) ou `auto` (la précision d'affichage de l'entité), sur l'écran de l'appareil et dans la liste. |
| `temperature_entity` | bouilloire, chauffe-eau, chaudière, pompe à chaleur | Température de l'eau (de départ sur une chaudière ou une pompe à chaleur), affichée sur l'appareil et dans la liste. Une entité `water_heater` donne la sienne toute seule. Sur un chauffe-eau, l'eau chaude remplit la cuve de 15 à 65 °C. |
| `state_entity` en `water_heater` | chauffe-eau | Son état est le mode (*Éco*, *Performance*…), affiché tel que Home Assistant le traduit. La chauffe vient alors de `heating_entity`, d'une prise ou de l'attribut `status` de MELCloud. |
| `heating_entity` / `hot_water_entity` | chaudière, pompe à chaleur | Indicateurs chauffage et eau chaude ; allumés tous les deux, l'eau chaude l'emporte. Une pompe à chaleur a aussi celui du rafraîchissement, plus bas. Sans eux, le mode vient de `state_entity` : codes `-H`, `=H`, `0H` (Nefit, Bosch) ou leur forme numérique `200`, `201`, `203`, le démarrage (`0U`, `0C`, `0L` ou `270`, `283`, `284`) se lisant *Allumage* et les attentes du brûleur (`0A`, `0Y`, `0E` ou `202`, `204`, `265`, `305`, `353`) *En attente* ; `CH`, `HW`, `No` ; ceux d'InComfort, ebusd, myVAILLANT et MELCloud ; ou *chauffage* et *eau chaude*. Indicateurs éteints mais flamme allumée, elle affiche *Brûleur allumé*. `state_map` accepte `space_heating`, `hot_water`, `starting`, `waiting` et `idle`. Avec seulement le brûleur en `power_entity`, la flamme s'allume sans dire pour quoi. |
| `state_entity` sur une pompe à chaleur | pompe à chaleur | Ce que fait la pompe : le `hvac_action` d'une entité `climate` (chauffage, refroidissement, dégivrage, repos), l'attribut `status` de MELCloud (`heat_water`, `heat_zones`, `cool`, `defrost`, `standby`, `legionella`) ou un capteur en toutes lettres (*chauffage*, *eau chaude*, *refroidissement*, *dégivrage*, en 14 langues). L'état d'une entité `climate` ou `water_heater` est le mode que vous avez choisi, affiché tel quel quand l'entité ne dit rien de ce que fait la pompe. `state_map` accepte `space_heating`, `hot_water`, `cooling`, `defrost` et `idle`. Le ventilateur de l'unité extérieure tourne quand elle travaille et s'arrête pour dégivrer ; le ballon ou le radiateur chauffe selon le mode, et l'eau descend par le tuyau de départ et remonte par le retour, partie chaude et revenue plus froide quand la pompe chauffe, l'inverse quand elle rafraîchit. |
| `cooling_entity` et les vannes | pompe à chaleur | Un indicateur de rafraîchissement, à côté de ceux du chauffage et de l'eau chaude. Un indicateur peut aussi être une vanne : la vanne 2 voies de HeishaMon lit *Heating* ou *Cooling* et sa vanne 3 voies *Room* ou *Tank*, quel que soit le champ où on les met. Le ballon passe d'abord, puis le rafraîchissement, puis le chauffage. |
| `outdoor_temperature_entity` / `heat_output_entity` / `cop_entity` | pompe à chaleur | Température extérieure, chaleur produite et COP, dans la liste. Sans entité COP, la card divise la chaleur produite par `power_entity` dès que les deux sont en W ou en kW. |
| `cooling_power_entity` / `cooling_output_entity` / `hot_water_power_entity` / `hot_water_output_entity` | pompe à chaleur | Ce que la pompe consomme et produit en rafraîchissement et pour le ballon, pour les intégrations qui mesurent chaque circuit à part (HeishaMon). La carte lit la paire du circuit qu'indiquent les indicateurs, même à l'arrêt, et celle du chauffage sinon. En rafraîchissement, la ligne devient *Froid produit* et le rapport calculé *EER*. |
| `return_temperature_entity` | pompe à chaleur | L'eau qui revient. Départ et retour partagent alors une seule ligne, *42 °C → 36 °C*, et la carte calcule l'écart toute seule comme elle calcule le COP, toujours avec un dixième puisqu'une pompe à chaleur travaille sur quelques degrés. Pris comme une distance, donc positif même quand la pompe rafraîchit. |
| `water_flow_entity` | pompe à chaleur | Débit d'eau, dans l'unité de l'entité. |
| `compressor_entity` | pompe à chaleur | Fréquence en hertz, ou un contact tout ou rien lu *En marche* et *Éteint*. Un compresseur à l'arrêt arrête le ventilateur du dessin et met les indicateurs *En veille* : la pompe ne fait plus que brasser de l'eau, quel que soit le sens des vannes. En marche, il fait passer un état en veille à *En marche*. |
| `fan_speed_entity` | pompe à chaleur | Vitesse du ventilateur, dans l'unité de l'entité. |
| `no_hot_water` | pompe à chaleur | `true` retire le ballon du dessin, pour une installation qui ne fait pas d'eau chaude sanitaire. Ce qui reste se recentre. |
| `underfloor_heating` | pompe à chaleur | `true` dessine un plancher chauffant à la place du radiateur, ce qui est le cas de la plupart des installations air-eau : la dalle vue de biais avec son tuyau en serpentin, et la chaleur qui s'en échappe quand elle chauffe. Elle passe au bleu quand la pompe rafraîchit. |
| `state_entity` sur une imprimante 3D | imprimante 3D | L'état de l'imprimante, tel que chaque intégration l'envoie : `current_state` (OctoPrint), le capteur de l'imprimante (PrusaLink), `print_status` (Bambu Lab, Creality), `current_print_state` (Moonraker, Klipper), `current_status` (Elegoo), `machine_status` (Flashforge), `job_state` (Anycubic). Il se lit *Impression*, *Préparation*, *Préchauffage*, *En pause*, *Intervention requise*, *Terminé*, *Annulée*, *Échec*, *Erreur*, *En veille* ou *Hors ligne*. La plupart des intégrations disent *impression* dès que le code de départ chauffe : tant qu'une résistance reste à plus de 5 °C sous sa consigne et que la pièce n'a pas commencé, la card affiche *Préchauffage* et la barre devient une jauge de chauffe. Hors d'une impression, le temps restant est masqué, car l'imprimante garde celui du dernier travail. |
| `phase_entity` | imprimante 3D | Ce que fait l'impression : `current_stage` de Bambu Lab, `print_status` d'Elegoo. Il se lit *Préchauffage*, *Nivellement du plateau*, *Changement de filament*, *Refroidissement*, *Calibrage* ou *Mise à l'origine* pendant une impression. |
| `program_entity` | imprimante 3D | Le fichier imprimé, sans son dossier ni l'extension du trancheur. |
| `nozzle_temperature_entity` / `nozzle_target_entity` / `bed_temperature_entity` / `bed_target_entity` / `chamber_temperature_entity` | imprimante 3D | Buse, plateau et enceinte, affichés *219 °C → 220 °C* tant que la consigne n'est pas atteinte. Une consigne est un capteur ou un `number` (Moonraker, Elegoo) ; à défaut, la card lit un attribut `target` sur la mesure (Creality). La température de la buse s'affiche sur l'écran de l'imprimante, et une résistance qui a une consigne rougeoie. |
| `current_layer_entity` / `total_layers_entity` | imprimante 3D | La couche, en *84 / 190*. |
| `printer_layout` | imprimante 3D | `enclosed` (défaut : une enceinte dont le plateau descend quand la pièce monte) \| `open` (un cadre ouvert dont le portique monte). La pièce grandit avec la progression, dans la couleur de l'état, et la tête va et vient pendant l'impression. |
| `printed_part` | imprimante 3D | La pièce sur le plateau : `cube` (défaut), `pyramid` (pyramide) ou `duck` (un canard en plastique). Elle apparaît de bas en haut au fil de l'impression. |
| `portions_today_entity` / `weight_today_entity` | distributeur | Ce qui a été servi aujourd'hui, sur une seule ligne. Sans entité de poids, la carte calcule les grammes à partir de `portion_weight_entity` : rien n'est supposé sur la taille d'un repas. |
| `serving_size_entity` / `portion_weight_entity` | distributeur | Combien de portions par distribution, et ce que pèse une portion. |
| `schedule_entity` | distributeur | Le planning, dans les mots de l'intégration, sur une ligne qui s'enroule. |
| `last_feed_entity` | distributeur | L'horodatage du dernier repas, quand l'intégration en donne un. Sinon la carte le trouve : un `script` dit quand il a tourné pour la dernière fois, quoi qu'il l'ait demandé, un `button` porte l'heure de son dernier appui, et le compteur du jour bouge à chaque repas que le distributeur rapporte, y compris ceux qu'il sert sur son propre planning. |
| `level_entity` / `level_empty_below` / `level_max` | distributeur | Ce qui reste dans le réservoir : un pourcentage, qui remplit la trémie sur le dessin, ou un contact qui dit seulement *vide*. À `level_empty_below` ou en dessous (0 par défaut), dans l'unité du relevé, l'état lit *Réservoir vide*, en orange, et la trémie se vide. Un réservoir compté en grammes ou en litres remplit la trémie dès que `level_max` en donne la contenance. |
| `error_entity` | distributeur | Fait passer l'état en *Erreur*, et en *Réservoir vide* quand l'erreur se nomme elle-même (`no_food`, `empty`, et le même mot dans les autres langues). Un code de défaut vaut une erreur sur toute valeur autre que zéro. |
| `state_entity` | distributeur | Facultatif : un distributeur est au repos presque tout le temps, donc une commande ou un compteur suffisent. Quand il rapporte quelque chose, *on* se lit *Distribution* et les croquettes tombent. |
| `speed_entity` | robot cuiseur | Vitesse du couteau, ramenée sur trois vitesses. |
| `water_entity` | machine à café | Réservoir : booléen Home Connect, ou niveau en % avec *vide* sous 10 %. |
| `beans_entity` / `tray_entity` / `descaling_entity` | machine à café | Grains vides, bac plein, détartrage à faire. |
| `cups_entity` | machine à café | Nombre de tasses : un compte, un booléen ou un nom de boisson (*2 Espressi*). |
| `strength_entity` | machine à café | Force du café, en chiffre ou en mot. |

### Exemples

```yaml
type: custom:ha-appliance-card
state_entity: sensor.lave_linge_appliance_state
program_entity: select.lave_linge_program_uid
remaining_time_entity: sensor.lave_linge_time_to_end
door_entity: binary_sensor.lave_linge_door_state
info_entities:
  - entity: select.lave_linge_temperature
    icon: mdi:thermometer
pause_entity: button.lave_linge_execute_command_pause
stop_entity: button.lave_linge_execute_command_stopreset
```

```yaml
type: custom:ha-appliance-card
appliance_type: oven
state_entity: sensor.four_state
target_temperature_entity: number.four_consigne
current_temperature_entity: sensor.four_temperature
light_entity: light.four_eclairage
```

```yaml
type: custom:ha-appliance-card
appliance_type: cooktop
state_entity: sensor.plaque_state
zones:
  - level_entity: sensor.plaque_foyer_1_niveau
    residual_heat_entity: binary_sensor.plaque_foyer_1_chaud
    name: Avant gauche
  - level_entity: sensor.plaque_foyer_2_niveau
```

```yaml
type: custom:ha-appliance-card
appliance_type: boiler
state_entity: sensor.chaudiere_code_afficheur
temperature_entity: sensor.chaudiere_temperature_depart
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

Une Panasonic Aquarea sous HeishaMon, avec ses vannes et chaque circuit mesuré à part :

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

Avec une simple prise connectée :

```yaml
type: custom:ha-appliance-card
appliance_type: water_heater
state_entity: sensor.prise_cumulus_puissance
power_entity: sensor.prise_cumulus_puissance
power_on_threshold: 10
```

### Renommer des valeurs brutes (`value_map`)

Quand une intégration expose une phase en code ou en terme non traduit, `value_map` la renomme, ligne d'info par ligne d'info :

```yaml
info_entities:
  - entity: sensor.washing_machine_program_phase
    label: Phase
    value_map:
      0: Prêt
      1: Lavage
      18: Terminé
```

La casse est ignorée et une valeur absente de la table s'affiche telle quelle. Dans l'éditeur visuel, c'est une ligne `code: libellé` par correspondance.

### Phases du lave-vaisselle

Avec une `phase_entity`, `Drying` et `Ado Drying` remplacent le lavage par de la vapeur orange qui monte le long de la porte, plus haut pour `Ado Drying`. `Prewash`, `Mainwash` et `Rinsing` gardent l'animation de lavage. Ces valeurs sont reconnues d'office, comme `Pre Wash`, `Wash`, `Rinse` et `Dry`, et `phase_map` traduit les autres :

```yaml
appliance_type: dishwasher
state_entity: sensor.lave_vaisselle_etat
phase_entity: sensor.lave_vaisselle_phase
phase_map:
  Sechage: drying
```

Une valeur non reconnue laisse l'illustration en l'état, et la phase nomme aussi l'étape sur la ligne d'état (voir *Étapes du cycle*).

### Distributeurs de croquettes

Un distributeur se lit, il ne se pilote pas : pas de cycle, pas de programme, pas de porte. Son état est calculé à partir de ce qu'il rapporte, *Réservoir vide*, *Erreur*, *Distribution* ou *Prêt*, et la carte porte ce qui a été servi aujourd'hui et l'heure du dernier repas. Un réservoir vide est la seule chose qu'un distributeur ne peut pas régler tout seul : il prend la ligne d'état, et vide la trémie sur le dessin. Un triangle rouge se lève avec lui, et il se lève aussi pour un blocage, avec les croquettes toujours dans le réservoir cette fois.

La commande est le point intéressant, parce qu'un distributeur a rarement un bouton. Celui-ci distribue depuis une liste réglée sur `START`, via Zigbee2MQTT :

```yaml
type: custom:ha-appliance-card
appliance_type: pet_feeder
start_entity: select.croquettes_feed
portions_today_entity: sensor.croquettes_portions_per_day
weight_today_entity: sensor.croquettes_weight_per_day
portion_weight_entity: number.croquettes_portion_weight
serving_size_entity: number.croquettes_serving_size
schedule_entity: sensor.croquettes_planning
```

L'option n'est pas écrite : une liste dont la seule vraie option est `START` n'a rien à demander. Celui-là distribue par un script, et compte ses repas avec un helper `history_stats` :

```yaml
type: custom:ha-appliance-card
appliance_type: pet_feeder
start_entity: script.distribuer_croquettes
portions_today_entity: sensor.croquettes_distributions_du_jour
state_entity: binary_sensor.distributeur_distribution
```

Une automation fait aussi bien l'affaire comme commande, et un `utility_meter` fait un bon compteur : `portions_today_entity` prend ce qui compte les repas, là où l'intégration le tient.

Trois entités se lisent aussi bien que dix : une ligne n'existe que si son entité répond.

### Étapes du cycle

Pendant qu'un lave-linge, un sèche-linge ou un lave-vaisselle tourne, la ligne d'état nomme l'étape où il en est au lieu d'*En cours* du début à la fin : *Prélavage*, *Trempage*, *Pesée*, *Remplissage*, *Lavage*, *Rinçage*, *Vidange*, *Essorage*, *Séchage*, *Refroidissement*, *Anti-froissage* ou *Vapeur*. Pendant l'essorage d'un lave-linge, le tambour se vide et le linge s'emballe. Une machine en pause, terminée ou en départ différé garde son mot, et le temps restant comme la barre de progression restent ceux du cycle entier.

Où se trouve l'étape dépend de l'intégration :

| Intégration | Où elle le dit | À configurer |
|---|---|---|
| LG ThinQ, Whirlpool, Midea | l'état lui-même (`rinsing`, `cycle_spinning`, `Dry`) | rien |
| Electrolux, AEG | `cyclePhase` (`Wash`, `Rinse`, `Spin`) | `phase_entity` |
| Miele, SmartThings | une entité de phase (`program_phase`, `job_state`) | `phase_entity` |
| hOn (Candy, Hoover, Haier) | une phase numérotée (`prPhase`) | `phase_entity` et `phase_map` |
| Home Connect (Bosch, Siemens) | nulle part : l'état reste *Run* du début à la fin | rien à lire |

Un mot de l'entité de phase que la carte ne connaît pas s'affiche tel qu'il est écrit. `phase_map` traduit les codes, vers une des étapes ci-dessus ou vers vos propres mots, et `state_map` accepte aussi les étapes comme cibles :

```yaml
appliance_type: washer
state_entity: sensor.lave_linge_etat
phase_entity: sensor.lave_linge_phase
phase_map:
  4: rinsing
  5: spinning
  9: Anti-allergie
```

### Lavantes-séchantes

Une lavante-séchante est un lave-linge avec `washer_dryer: true`, et non un type à part : l'option est une case sous le type d'appareil. Cochée, le tambour montre de l'eau pendant le lavage et du linge qui tourne dans l'air chaud pendant le séchage, d'après la même étape que la ligne d'état. Une machine dont le nom dit qu'elle lave et sèche est reconnue toute seule.

Le rinçage compte pour du lavage, puisqu'il y a encore de l'eau dans le tambour. Une étape que la carte ne sait pas lire laisse le dessin en l'état : un cycle qui finit sur un anti-froissage ou un refroidissement garde son linge au lieu de se remplir d'eau.

```yaml
appliance_type: washer
washer_dryer: true
state_entity: sensor.lavante_sechante_etat
phase_entity: sensor.lavante_sechante_phase
```

### Entités d'alerte

Home Connect donne à chaque alerte une entité à part : sel ou liquide de rinçage presque vide, réservoir i-Dos bas, filtre à nettoyer. Listées dans `alerts_entities`, chacune s'affiche tant qu'elle est *present* ou *confirmed* (acquittée sur l'appareil, le sel toujours bas), et disparaît quand l'appareil passe à *off*. Une seule alerte s'affiche en rouge sous son propre nom ; plusieurs se rangent derrière leur nombre, *2 alertes*, qui ouvre leur liste. Un appui sur une alerte ouvre son entité.

```yaml
appliance_type: dishwasher
state_entity: sensor.lave_vaisselle_etat_de_fonctionnement
alerts_entities:
  - sensor.lave_vaisselle_sel_presque_vide
  - sensor.lave_vaisselle_liquide_de_rincage_presque_vide
  - entity: sensor.lave_vaisselle_rappel_d_entretien_de_la_machine
    label: Lancer un entretien
    icon: mdi:spray-bottle
```

Home Assistant crée ces entités désactivées : activez d'abord celles qui vous intéressent sur la page de l'appareil. L'éditeur visuel les trouve ensuite tout seul, quelle que soit la langue de leur nom, et laisse de côté les événements qui ne font que rendre compte d'un programme (terminé, interrompu). Son menu *Ajouter une alerte…* ne propose que les alertes de l'appareil : ses événements, et les capteurs binaires qui signalent un problème, une fuite ou une batterie faible. *Autre entité…*, en bas du menu, accepte n'importe quelle entité de n'importe quel appareil, le `binary_sensor` du déshydratant d'un distributeur par exemple, en alerte tant qu'il est à on.

### Trop d'états (`"*"`)

Une lavante-séchante déroule un seul long programme en une dizaine d'étapes nommées, qui veulent presque toutes dire *en cours*. Plutôt que de les nommer une par une, on nomme les quelques-unes qui n'en sont pas et on envoie le reste dans une seule catégorie :

```yaml
state_map:
  Ready To Start: idle
  End Of Cycle: done
  "*": running
```

Le fourre-tout passe en dernier : les états que la carte connaît déjà gardent leur sens, et seul ce qui dépasse y atterrit. Les guillemets sont ceux du YAML : un `*` nu ouvre un alias.

## Remerciements

- [@chike-he](https://github.com/chike-he) : traduction chinoise ([#3](https://github.com/ADNPolymerase/ha-appliance-card/issues/3))
- [@pbarone](https://github.com/pbarone) : prise en charge de `device_class: timestamp` pour le temps restant ([#2](https://github.com/ADNPolymerase/ha-appliance-card/pull/2))
- [@monsivar](https://github.com/monsivar) : alias de locale du bokmål norvégien ([#10](https://github.com/ADNPolymerase/ha-appliance-card/pull/10)) et illustration dédiée du lave-vaisselle ([#11](https://github.com/ADNPolymerase/ha-appliance-card/pull/11))

## Licence

MIT. Voir [LICENSE](LICENSE).
