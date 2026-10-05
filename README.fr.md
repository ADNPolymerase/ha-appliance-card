# HA Appliance Card

[![hacs_badge](https://img.shields.io/badge/HACS-Default-41BDF5.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-appliance-card?sort=semver)](https://github.com/ADNPolymerase/ha-appliance-card/releases)
[![HACS Action](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/ADNPolymerase/ha-appliance-card/actions/workflows/hacs.yml)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg)](https://www.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ADNPolymerase/ha-appliance-card/blob/main/LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/adnpolymerase)

<a href="https://buymeacoffee.com/adnpolymerase" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60"></a>
<a href="https://adnpolymerase.github.io/HA/" target="_blank"><img src="https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg" alt="Lien vers mon github.io pour mes autres projets" height="60"></a>

Une card Lovelace pour les appareils de la maison : lave-linge, sèche-linge, lave-vaisselle, four, micro-ondes, hotte, plaque de cuisson, réfrigérateur, bouilloire, robot cuiseur, machine à café, cuiseur à riz, friteuse à air, chauffe-eau, chaudière, pompe à chaleur, imprimante 3D, distributeur de croquettes, fer à repasser, poêle à granulés, climatiseur, déshumidificateur, petit chauffage, sèche-serviettes et borne de recharge. Cycle en cours, programme, temps restant, température, alertes et commandes.

Aucune marque supposée : chaque champ est une entité à choisir, elle fonctionne donc avec **n'importe quelle** intégration (Electrolux, Samsung, LG, Home Connect, Miele, une simple prise connectée…).

> Retours et issues bienvenus.
> 🇬🇧 [Read in English](README.md)

<img src="https://raw.githubusercontent.com/ADNPolymerase/ha-appliance-card/main/docs/screenshot.fr.png" alt="HA Appliance Card screenshot" width="100%">

## Fonctionnalités

- **Vingt-cinq types d'appareils**, chacun avec une illustration en CSS animée sur les données de l'appareil et statique à l'arrêt. Le type est détecté tout seul ou choisi via `appliance_type`, et `compact: true` ne garde que le texte.
- **Normalisation d'état** : `Idle`, `RUNNING`, `wash`, `En marche`… sont reconnus (sans tenir compte des accents) et classés en veille, préchauffage, en cours, en pause, terminé, différé ou erreur. Un état inconnu s'affiche tel quel, sans l'espace de noms de l'intégration, et `state_map` classe le reste, `"*"` ramassant tout ce qui dépasse.
- **L'étape, et non une heure d'*En cours*** : un lave-linge, un sèche-linge ou un lave-vaisselle nomme l'étape où il en est (*Prélavage*, *Lavage*, *Rinçage*, *Essorage*, *Séchage* et sept autres), d'après une entité de phase ou son propre état, et le tambour s'emballe pendant l'essorage. Le temps restant est toujours celui du cycle entier.
- **Une lavante-séchante est un lave-linge qui sèche** : `washer_dryer: true`, et le tambour montre de l'eau pendant le lavage, puis du linge qui tourne dans l'air chaud pendant le séchage. L'étape vient de l'état lui-même ou d'une entité de phase, et la ligne d'état lit *Lavage* ou *Séchage*.
- **Chaque appareil dit ce qui compte pour lui** : une machine à café ce qui lui manque (eau, grains, bac, détartrage), un réfrigérateur sa santé (débranché, porte ouverte, température haute), une chaudière mixte ce qu'elle chauffe (chauffage, eau chaude ou veille), une imprimante 3D ce que fait l'impression (préchauffage, nivellement, changement de filament), un poêle à granulés la phase de son feu (allumage, modulation, éco, nettoyage), un climatiseur son mode et où il souffle, une borne de recharge si une voiture est branchée et ce que fait la charge (attente d'autorisation, en charge, en pause, programmée, terminée).
- **Fonctionne avec une simple prise connectée** : `power_entity` et `power_on_threshold` suffisent à déduire l'état de la consommation ; `power_off_delay` évite qu'une pause soit prise pour la fin, et `show_last_cycle` montre la durée du dernier cycle.
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

Seule `state_entity` est obligatoire, sauf sur un réfrigérateur où une sonde ou un contact de porte suffit, et sur une borne de recharge où sa prise ou son compteur suffit. Dans l'éditeur visuel, choisir l'entité d'état pré-remplit les autres champs.

| Option | Description |
|---|---|
| `state_entity` | **Obligatoire**, sauf sur un frigo ou une borne de recharge. Entité portant l'état de l'appareil, de n'importe quel domaine. |
| `state_map` | Table état brut → `idle` \| `running` \| `preheating` \| `keep_warm` \| `paused` \| `done` \| `delayed` \| `error`. Fixe le libellé, la couleur et l'animation. La clé `"*"` ramasse tous les états qui dépassent (voir plus bas), et sur un lave-linge, un sèche-linge ou un lave-vaisselle les étapes (`washing`, `spinning`...) sont aussi des cibles. Aussi dans l'éditeur visuel. |
| `state_show_raw` | `true` affiche le texte de l'entité plutôt que le libellé de la card, tel que Home Assistant l'affiche (un climatiseur lit `Froid`, pas `cool`). |
| `controls_activation` | Comment les boutons de commande réagissent : `tap` (par défaut) les actionne tout de suite, `hold` seulement après un appui long, `off` jamais depuis la card (un appui long ouvre l'entité). En YAML, l'écrire entre guillemets, `controls_activation: "off"` : un `off` nu est lu comme `false` (la card le traite quand même comme `off`). Utile contre les appuis accidentels et les petits doigts. |
| `name` | Titre de la card. Par défaut, le nom de l'entité d'état. |
| `compact` | `true` masque l'illustration. |
| `illustration_color` | `auto` (défaut, suit le thème) \| `white` \| `grey` \| `black` \| `red` (rouge foncé). Ne change que la carrosserie, pas les couleurs d'état. |
| `language` | `auto` (défaut, suit Home Assistant) ou l'un des 14 codes : `en`, `fr`, `de`, `es`, `it`, `nl`, `pt`, `sv`, `no`, `da`, `pl`, `ru`, `zh`, `cs`. `nb` et `nb-NO` donnent le norvégien. |
| `appliance_type` | `auto` (défaut) \| `washer` \| `dryer` \| `dishwasher` \| `oven` \| `microwave` \| `hood` \| `cooktop` \| `fridge` \| `kettle` \| `cooker` \| `coffee` \| `rice_cooker` \| `air_fryer` \| `water_heater` \| `boiler` \| `heat_pump` \| `printer_3d` \| `pet_feeder` \| `iron` \| `pellet_stove` \| `air_conditioner` \| `dehumidifier` \| `space_heater` \| `towel_warmer` \| `ev_charger`. |
| `tap_action` | Ce que fait un appui sur la carte, dans les mots de Home Assistant : `more-info` (défaut), `none`, `navigate`, `url`, `toggle`, `perform-action` ou `fire-dom-event`, celle qu'écoutent les cartes popup bâties sur browser_mod. En YAML seulement. |
| `toggle_entity` | Bouton marche/arrêt (`switch`, `button`, `script`, `input_boolean`, `fan`), mis en évidence quand c'est allumé. |
| `power_entity` / `power_on_threshold` / `power_icon` | Capteur de puissance. Avec un seuil, l'état en est déduit : *en marche* au-dessus, puis *terminé* en redescendant. Pointer `state_entity` sur ce même capteur l'active avec un seuil de 10 W. `power_icon` remplace `mdi:power-plug`. |
| `power_off_delay` | Nombre de minutes sous `power_on_threshold` avant que le cycle passe à *Terminé*, pour qu'une pause (un lave-vaisselle qui sèche, un lave-linge qui trempe) ne soit pas prise pour la fin. Seulement quand l'état vient de la prise : une intégration signale ses pauses elle-même. 0 par défaut. |
| `show_last_cycle` | Ajoute une ligne *Dernier cycle* entre deux cycles : sa durée et son heure de fin, lues dans l'historique de Home Assistant (sept jours de l'état, deux jours de la puissance d'une prise, pauses plus courtes que `power_off_delay` comprises). Appareils à cycle, bouilloire et fer à repasser. |
| `program_entity` / `program_format` | Programme. `clean` (défaut) le rend lisible (`LaundryCare.Washer.Program.Auto40` devient *Auto 40*, `Rapid20Min` devient *Rapid 20 Min*), `raw` l'affiche tel quel. |
| `remaining_time_entity` / `remaining_time_unit` | Temps restant, en `auto` (défaut, d'après l'unité de l'entité : s, min, h, ms, d, ou `1:02:03`), `seconds`, `minutes` ou `hours`, ou une heure de fin (`timestamp`). Il donne aussi la barre de progression : le temps écoulé depuis le début du cycle, pauses retirées, sur ce temps plus ce qui reste. Ouverte en plein cycle, la carte retrouve le début dans l'historique de l'état. |
| `remaining_time_hide_when_idle` | `true` n'affiche le temps restant qu'en marche, contre les heures de fin périmées (SmartThings). |
| `remaining_time_split` | `true` met l'heure de fin sur sa propre ligne, pour une card étroite. |
| `progress_entity` | Capteur 0-100 qui remplace l'estimation tirée du temps restant. |
| `door_entity` / `door_open_state` / `door_invert` / `door_hide_in_list` | Capteur de porte, état « ouverte » (défaut `on`), inversion, et masquage de la ligne (la porte reste dessinée). |
| `alerts_entity` | Entité dont chaque *attribut* à on, true ou active s'affiche en alerte. |
| `alerts_entities` | Jusqu'à 8 alertes, une entité chacune (sel, liquide de rinçage, i-Dos, filtres… de Home Connect), en `{ entity, label?, icon? }` ou en simple identifiant, affichées tant qu'elles sont à on, true, active, *present* ou *confirmed* : une seule sous son propre nom, plusieurs derrière leur nombre (voir *Entités d'alerte*). |
| `connectivity_entity` / `connectivity_connected_state` | Connectivité, en icône wifi, et état « connecté » (défaut `on`). |
| `corner_entities` | Jusqu'à 2 interrupteurs en icônes dans les coins du haut, le premier à gauche et le second à droite, en `{ entity, label?, icon? }` ou en simple identifiant. L'icône dit ce que fait chacun et s'il est enclenché (sécurité enfant, verrouillage automatique, verrou, interrupteur), et un appui le bascule. Un `lock` ouvre seulement sa fiche : un appui par erreur ne déverrouille jamais rien. |
| `info_entities` | Jusqu'à 8 lignes `{ entity, icon?, label?, value_map?, hide_unit? }`, les suivantes sont ignorées, affichées sous les lignes que la carte lit d'elle-même. Un appui ouvre la fiche de l'entité, ce qui permet de réinitialiser un réservoir ou un filtre depuis la carte. Au-delà de 5 lignes, l'espacement se resserre. Les valeurs s'affichent comme dans Home Assistant, avec la précision d'affichage de l'entité. `value_map` renomme les valeurs brutes (voir plus bas), `hide_unit` masque l'unité. |
| `lines_order` | L'ordre des lignes d'info, donné par leurs clés : `program`, `remaining`, `door`, celles que chaque type apporte (`level`, `last_feed`, `flow_return`, `nozzle`…) et, pour les lignes ajoutées, leur identifiant d'entité. L'éditeur visuel l'écrit tout seul au glisser. Les lignes non citées gardent leur place après celles qui le sont, et une ligne qui ne s'affiche pas est ignorée. |
| `start_entity` / `pause_entity` / `resume_entity` / `stop_entity` | Commandes, affichées seulement si configurées. Une commande est d'ordinaire un `button`, un `script` ou une `automation`, qui est déclenchée et non désactivée, et peut aussi être un `select` ou un `number` : `start_option` dit quelle option choisir (la carte la prend toute seule quand la liste n'en propose qu'une), `start_value` ce qu'il faut écrire. Idem pour les trois autres, en `pause_option`, `stop_value` et ainsi de suite. `start_icon` remplace l'icône du bouton, comme `pause_icon`, `resume_icon`, `stop_icon`, `toggle_icon` et `filter_reset_icon` : `mdi:play` se lit comme un programme qui démarre, ce que tout appui n'est pas. En YAML seulement. |

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
| `filter_life_entity` / `filter_reset_entity` / `filter_due_below` | fontaine | Les jours ou le pourcentage restants du filtre, sur une ligne, et un bouton de réinitialisation. À `filter_due_below` ou en dessous (3 pour des jours, 10 pour un pourcentage par défaut), l'état lit *Filtre à changer* et le voyant passe à l'orange. |
| `pump_clean_entity` / `pump_reset_entity` | fontaine | Pareil pour la pompe : les jours ou le pourcentage avant son nettoyage, avec le même seuil, et un bouton de réinitialisation. L'état lit *Pompe à nettoyer*. |
| `water_level_entity` / `level_empty_below` | fontaine | L'eau restante, un pourcentage qui remplit le réservoir sur le dessin, ou un contact allumé quand elle manque. À `level_empty_below` ou en dessous (10 par défaut), l'état lit *Peu d'eau*, en rouge, avant tout le reste : une pompe à sec grille. |
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
| `return_temperature_entity` | pompe à chaleur | L'eau qui revient. Départ et retour partagent alors une seule ligne, *42 °C → 36 °C*, et la carte calcule l'écart (Delta T) toute seule comme elle calcule le COP, en kelvin comme l'écrit le métier (les °F restent en °F), toujours avec un dixième puisqu'une pompe à chaleur travaille sur quelques degrés. Pris comme une distance, donc positif même quand la pompe rafraîchit. |
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
| `iron_layout` | fer | `iron` (défaut, le fer seul) \| `generator` (le même fer sur le socle d'une centrale vapeur). |
| `left_on_after` | fer | Minutes allumé au bout desquelles la ligne d'état affiche *Resté allumé*, en rouge. Vide, cela n'arrive jamais. |
| `feeder_layout` | distributeur | `tower` (défaut, un réservoir carré sur son socle) \| `canister` (un réservoir rond sur un socle rond) \| `double` (deux sorties et deux gamelles). |
| `portions_today_entity` / `weight_today_entity` | distributeur | Ce qui a été servi aujourd'hui, sur une seule ligne. Sans entité de poids, la carte calcule les grammes à partir de `portion_weight_entity` : rien n'est supposé sur la taille d'un repas. |
| `serving_size_entity` / `portion_weight_entity` | distributeur | Combien de portions par distribution, et ce que pèse une portion. |
| `schedule_entity` | distributeur | Le planning, dans les mots de l'intégration, sur une ligne qui s'enroule. |
| `last_feed_entity` | distributeur | L'horodatage du dernier repas, quand l'intégration en donne un. Sinon la carte le trouve : un `script` dit quand il a tourné pour la dernière fois, quoi qu'il l'ait demandé, un `button` porte l'heure de son dernier appui, et le compteur du jour bouge à chaque repas que le distributeur rapporte, y compris ceux qu'il sert sur son propre planning. |
| `level_entity` / `level_empty_below` / `level_max` | distributeur | Ce qui reste dans le réservoir : un pourcentage, qui remplit la trémie sur le dessin et se lit sur la ligne d'état au repos (*Réservoir à 74 %*), ou un contact qui dit seulement *vide*. À `level_empty_below` ou en dessous (0 par défaut), dans l'unité du relevé, l'état lit *Réservoir vide*, en orange, et la trémie se vide. Un réservoir compté en grammes ou en litres remplit la trémie, et donne son pourcentage, dès que `level_max` en donne la contenance. |
| `error_entity` | distributeur | Fait passer l'état en *Erreur*, et en *Réservoir vide* quand l'erreur se nomme elle-même (`no_food`, `empty`, et le même mot dans les autres langues). Un code de défaut vaut une erreur sur toute valeur autre que zéro. |
| `state_entity` | distributeur | Facultatif : un distributeur est au repos presque tout le temps, donc une commande ou un compteur suffisent. Quand il rapporte quelque chose, *on* se lit *Distribution* et les croquettes tombent. |
| `state_entity` / `phase_entity` | poêle | La phase du feu : *Éteint*, *Allumage*, *En chauffe*, *Modulation*, *Veille éco*, *Refroidissement*, *Nettoyage* ou *Alarme*. Lue sur un capteur de statut dans `phase_entity` (les clés de Palazzetti, l'Agua IOT de Micronova dans la langue du poêle, Edilkamin, Rika, Duepi), et sinon sur le `hvac_action` d'une entité `climate`, où *idle* est la veille éco. `state_map` accepte les huit phases : `off`, `ignition`, `burning`, `modulating`, `eco`, `cooling`, `cleaning` et `alarm`. |
| `current_temperature_entity` / `target_temperature_entity` | poêle | La pièce et la consigne, en *20 °C → 21 °C* tant que le poêle y travaille. Une entité `climate` dans `state_entity` donne les deux d'elle-même. |
| `power_level_entity` / `flue_temperature_entity` / `fan_speed_entity` | poêle | Le palier de puissance, en *4 / 5* quand l'entité connaît sa plage, et sur l'écran du poêle quand il chauffe ; la température des fumées ; la ventilation, en pourcentage pour une entité `fan`. |
| `level_entity` / `level_empty_below` / `level_max` | poêle | Les granulés de la trémie : un pourcentage, ou un contact allumé quand la réserve est atteinte (Agua IOT, Edilkamin). Un niveau en centimètres ou en kilos remplit la trémie une fois que `level_max` donne sa contenance. Vide, la trémie passe au rouge, et en alarme l'état se lit *Granulés épuisés*. |
| `error_entity` | poêle | L'alarme : un mot (*Échec d'allumage*), un compte ou un contact. Tout ce qui n'est pas *pas d'alarme*, quelle que soit la façon dont le poêle le dit, met le poêle en alarme, avec ses mots sur une ligne et son code (*AL05*) sur l'écran. |
| `state_entity` | climatiseur | Une entité `climate` : *Refroidissement*, *Chauffage*, *Déshumidification*, *Ventilation* ou *Auto* selon le mode, et d'après `hvac_action` *En veille* une fois la consigne atteinte, *Dégivrage* et *Préchauffage*. L'écran montre le symbole du mode et la consigne, les lignes la pièce, l'humidité et la ventilation. Sur une prise, *En cours* ou *Éteint*. `state_map` accepte `off`, `cool`, `heat`, `dry`, `fan`, `auto`, `idle` et `defrost`. |
| `vane_vertical_entity` / `vane_horizontal_entity` | climatiseur | Les volets, quand ils vivent dans des selects à eux (Panasonic, Midea) ; sinon le `swing_mode` et le `swing_horizontal_mode` de l'entité `climate`. Cinq positions de haut en bas et de gauche à droite, ou le balayage, dans les mots de chaque intégration. |
| `state_entity` | déshumidificateur | Une entité `humidifier` : *Déshumidification*, *Séchage du linge* quand son mode le dit (clothes_dry chez Midea), *En veille* une fois l'humidité atteinte, *Réservoir plein*. L'écran et une ligne donnent l'humidité et sa cible. |
| `tank_entity` / `tank_full_above` / `current_humidity_entity` | déshumidificateur | Le réservoir, un contact allumé quand il est plein ou un niveau en pourcentage (plein à partir de `tank_full_above`, 100 par défaut), montré dans la fenêtre du bas ; un hygromètre pour un déshumidificateur sur prise. |
| `state_entity` / `heater_layout` | petit chauffage | Une entité `climate` : *Chauffage*, *En veille* une fois la consigne atteinte, *Ventilation*. `heater_layout` : `fan` (radiateur soufflant, par défaut) ou `oil` (bain d'huile). |
| `state_entity` | sèche-serviettes | Le mode du fil pilote : *Confort*, *Éco*, *Hors-gel*, *Boost*, *Séchage*, lu sur le preset d'une entité `climate` (Heatzy, Atlantic) ou sur un select (NodOn). |
| `current_temperature_entity` / `target_temperature_entity` | petit chauffage, sèche-serviettes | La pièce et la consigne, quand une entité `climate` ne les porte pas. |
| `fan_speed_entity` / `purifier_entity` / `outdoor_temperature_entity` / `defrost_entity` | climatiseur | La ventilation quand l'entité `climate` ne la porte pas ; le purificateur (nanoe, plasma), allumé sur l'unité ; la température extérieure ; un contact de dégivrage. |
| `speed_entity` | robot cuiseur | Vitesse du couteau, ramenée sur trois vitesses. |
| `state_entity` / `fryer_layout` | friteuse à air | Les mots de la friteuse, tels que Philips (HomeID et l'ancienne intégration HACS), Xiaomi et Cosori (VeSync) les donnent : *Préchauffage*, *Préchauffée*, *Cuisson*, *Secouer le panier*, *Panier sorti*, *En pause*, *Maintien au chaud*, *Terminé*, *Départ différé*. `fryer_layout` : `basket` (par défaut), `window` (panier à hublot) ou `dual` (double panier). |
| `basket_entity` / `shake_entity` / `basket2_state_entity` | friteuse à air | Le capteur du panier, allumé quand il est sorti (le tiroir Philips, la cuve Xiaomi), qui fait passer un cycle en *Panier sorti* ; le rappel pour secouer, qui fait passer la cuisson en *Secouer le panier* ; l'état du second panier d'une friteuse double, dessiné à part et nommé sur une ligne. |
| `water_entity` | machine à café | Réservoir : booléen Home Connect, ou niveau en % avec *vide* sous 10 %. |
| `beans_entity` / `tray_entity` / `descaling_entity` | machine à café | Grains vides, bac plein, détartrage à faire. |
| `cups_entity` | machine à café | Nombre de tasses : un compte, un booléen ou un nom de boisson (*2 Espressi*). |
| `strength_entity` | machine à café | Force du café, en chiffre ou en mot. |
| `state_entity` | borne de recharge | Le statut de la borne : *Aucun véhicule*, *Véhicule branché*, *En attente d'autorisation*, *En charge*, *En décharge*, *Charge en pause*, *Charge programmée*, *Charge terminée*, *Erreur* ou *Hors ligne*, lu dans les mots d'OCPP et des intégrations de Home Assistant (voir *Bornes de recharge*). `state_map` accepte les dix : `no_vehicle`, `connected`, `awaiting_auth`, `charging`, `discharging`, `paused`, `scheduled`, `done`, `error` et `offline`. Facultatif : sans lui, la prise et le compteur le disent. |
| `vehicle_entity` | borne de recharge | Si une voiture est branchée : le contact d'une prise, ou l'état d'un câble en mots (`disconnected`, `cable_only`, `vehicle_connected`, `vehicle_locked`). Sans voiture, un statut reconnu devient *Aucun véhicule*, sauf une erreur. |
| `power_entity` / `power_on_threshold` | borne de recharge | La puissance, dans l'unité et la précision du compteur (*7,4 kW*). Le seuil est en W quelle que soit cette unité, 100 W par défaut : au-dessus, la puissance passe. Il ne sert qu'à défaut de statut, et à distinguer une voiture qui a sa charge d'une voiture en pause. |
| `session_energy_entity` | borne de recharge | L'énergie de la session, en *Chargé 12,4 kWh*. |
| `discharge_power_entity` | borne de recharge | La puissance que rend la voiture (V2H, V2G), comme le `Power.Active.Export` d'OCPP, en *Décharge 7,4 kW*. Au-dessus de `power_on_threshold`, la voiture est *En décharge* (voir *Charge bidirectionnelle*). |
| `current_limit_entity` | borne de recharge | La limite de courant, en *Limite de courant 16 A*. Un appui ouvre l'entité, qui est là où elle se règle. |
| `error_entity` | borne de recharge | Un contact allumé, un code autre que 0 ou un mot autre que *pas d'erreur* (le `NoError` d'OCPP, `ok`, `none`) fait passer l'état en *Erreur*, avec les mots de la borne sur une ligne. |

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

### Fers à repasser

Rien ne relie un fer à Home Assistant, et c'est bien pourquoi il est sur une prise connectée : l'état vient de ce qu'il consomme, le dessin fait le reste. En chauffe, la semelle rougit et la vapeur sort du nez. Deux modèles sont dessinés, le fer seul et le même fer sur le socle d'une centrale vapeur.

`left_on_after` est la raison d'être de la prise. Passé ce nombre de minutes allumé, la ligne d'état affiche *Resté allumé*, en rouge :

```yaml
type: custom:ha-appliance-card
appliance_type: iron
iron_layout: generator
state_entity: switch.prise_fer
power_entity: sensor.prise_fer_puissance
power_on_threshold: 20
left_on_after: 30
```

La carte montre l'alerte ; éteindre le fer reste le travail d'une automatisation, sur la même entité.

### Distributeurs de croquettes

Un distributeur se lit, il ne se pilote pas : pas de cycle, pas de programme, pas de porte. Son état est calculé à partir de ce qu'il rapporte, *Réservoir vide*, *Erreur* ou *Distribution*, et au repos la ligne dit à quel point le réservoir est plein, ou rien quand la carte ne peut pas le savoir. La carte porte ce qui a été servi aujourd'hui et l'heure du dernier repas. Un réservoir vide est la seule chose qu'un distributeur ne peut pas régler tout seul : il prend la ligne d'état, et vide le réservoir et la gamelle sur le dessin. Un triangle rouge se lève avec lui, et il se lève aussi pour un blocage, avec les croquettes toujours dans le réservoir cette fois.

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

Trois modèles sont dessinés, d'après les distributeurs du commerce : un réservoir carré sur son socle, un réservoir rond sur un socle rond, chacun avec sa gamelle posée devant, et un double avec deux sorties en façade et une gamelle sous chacune. Le petit écran affiche l'heure comme les vrais, passe en bleu pendant la distribution, avec la portion quand `serving_size_entity` est renseigné, et en rouge sur un réservoir vide ou une erreur. La sécurité enfant et le verrouillage automatique se placent dans les coins du haut, chacun montrant s'il est enclenché :

```yaml
feeder_layout: canister
corner_entities:
  - switch.distributeur_auto_lock
  - switch.distributeur_child_lock
```

### Fontaines à eau

Une fontaine tourne toute la journée, alors comme un distributeur elle se lit plus qu'elle ne se commande. L'eau sort du bec en bouillonnant et se ride dans la vasque tant que la pompe tourne, d'après un interrupteur ou la prise sur laquelle elle est branchée. Le reste de ce qu'elle dit, c'est ce qui demande un coup de main : l'eau d'abord, puis le filtre, puis la pompe, chacun prenant la ligne d'état et le voyant en façade, orange pour le filtre et la pompe, rouge et clignotant pour l'eau.

```yaml
type: custom:ha-appliance-card
appliance_type: pet_fountain
state_entity: switch.fontaine_alimentation
filter_life_entity: sensor.fontaine_jours_filtre
filter_reset_entity: button.fontaine_reinitialiser_filtre
pump_clean_entity: sensor.fontaine_jours_nettoyage_pompe
pump_reset_entity: button.fontaine_reinitialiser_pompe
corner_entities:
  - switch.fontaine_voyant
info_entities:
  - select.fontaine_mode
```

Une fontaine qui ne connaît pas son niveau d'eau garde un réservoir à mi-hauteur sur le dessin plutôt que de le montrer vide.

### Poêles à granulés

Un poêle en dit plus qu'allumé ou éteint : il s'allume, chauffe, module, se met en veille éco une fois la pièce chaude, refroidit et nettoie son brasier. La card lit cette phase sur le statut du poêle et la dessine : la flamme derrière la vitre, l'air chaud au-dessus de la grille, la fumée au conduit à l'allumage, les cendres au nettoyage, les braises en veille. La trémie à côté de la porte montre les granulés qui restent.

Avec l'intégration de Home Assistant lui-même, Palazzetti :

```yaml
type: custom:ha-appliance-card
appliance_type: pellet_stove
state_entity: climate.poele
phase_entity: sensor.poele_status
power_level_entity: number.poele_combustion_power
level_entity: sensor.poele_pellet_level
level_max: 40
```

L'éditeur en remplit l'essentiel depuis les entités du poêle, aussi sur Agua IOT (Extraflame, Ravelli, MCZ, Piazzetta et une trentaine d'autres), Edilkamin, Rika et Duepi.

### Climatiseurs

L'unité intérieure d'un split, avec le symbole du mode et la consigne sur son écran. L'air part aussi bas et aussi loin sur le côté que les volets le dirigent, plus vite avec la ventilation, et balaie avec eux ; en déshumidification l'eau remonte dans l'unité, au dégivrage le givre la recouvre. Panasonic Comfort Cloud :

```yaml
type: custom:ha-appliance-card
state_entity: climate.salon
vane_vertical_entity: select.salon_vertical_swing
vane_horizontal_entity: select.salon_horizontal_swing
purifier_entity: switch.salon_nanoe
outdoor_temperature_entity: sensor.salon_outside_temperature
```

Une entité `climate` qui sait refroidir est reconnue d'elle-même, et l'éditeur remplit le reste depuis les entités de l'unité.

### Friteuses à air

L'écran montre la température pendant la chauffe et le maintien au chaud, et le temps restant pendant la cuisson. La chaleur monte au-dessus et la jointure du panier rougeoie ; un panier sorti avance, un panier à secouer tremble. Derrière le hublot les frites sautent dans la chaleur, et sur une friteuse double chaque panier montre son propre état. Philips HomeID :

```yaml
type: custom:ha-appliance-card
state_entity: sensor.airfryer_status
fryer_layout: window
remaining_time_entity: sensor.airfryer_time_remaining
target_temperature_entity: sensor.airfryer_temperature
basket_entity: binary_sensor.airfryer_drawer
shake_entity: binary_sensor.airfryer_shake_reminder
```

Une entité qui porte le nom d'une friteuse (ou le `cook_status` de Cosori) est reconnue d'elle-même, et l'éditeur remplit le reste. Avec une simple prise connectée, elle affiche *Cuisson*, puis *Terminé*.

### Déshumidificateurs, petits chauffages et sèche-serviettes

Un déshumidificateur montre l'humidité sur son écran et l'eau récupérée dans son réservoir ; un radiateur soufflant rougeoie derrière sa grille, un bain d'huile chauffe ses ailettes ; un sèche-serviettes montre le mode du fil pilote avec les symboles des radiateurs (soleil, lune, flocon). L'air chaud monte, l'air soufflé par un déshumidificateur ou un ventilateur va dans l'autre sens.

Les trois fonctionnent avec une simple prise connectée : au-dessus de `power_on_threshold` ils déshumidifient ou chauffent, en dessous ils sont en veille tant que la prise est allumée, et *Éteint* une fois coupée.

```yaml
type: custom:ha-appliance-card
appliance_type: space_heater
heater_layout: oil
state_entity: switch.radiateur_prise
power_entity: sensor.radiateur_prise_power
power_on_threshold: 30
```

### Bornes de recharge

Une wallbox au mur, son voyant dans la couleur de ce que fait la borne : *Aucun véhicule*, *Véhicule branché* (une voiture qui attend), *En attente d'autorisation* (un badge ou l'appli), *En charge*, *En décharge* (la voiture qui rend de l'énergie), *Charge en pause* (par la borne ou par la voiture), *Charge programmée*, *Charge terminée* (la voiture encore branchée), *Erreur* ou *Hors ligne*. Avec une voiture branchée, la prise quitte son étui et le câble part vers la voiture ; pendant la charge, l'énergie court le long du câble, lumineuse dans la couleur de l'état et d'autant plus vite que la puissance est forte (quatre allures, d'un surplus solaire à 22 kW), et s'arrête pendant une pause. Le voyant respire pendant la charge et lentement quand elle est programmée, et clignote pour une autorisation et, plus vite, sur un défaut. Sous vos yeux, une voiture qu'on branche montre la prise qui suit le câble jusqu'à elle, une voiture qu'on débranche le câble qui revient, et la fin d'une charge un éclat du voyant. Avec *réduire les animations* activé sur l'appareil, rien ne bouge. N'importe quelle wallbox fait l'affaire : la card lit le statut dans les mots d'OCPP et des intégrations de Home Assistant lui-même, `state_map` lui apprend tous les autres, et une borne sans statut se lit sur sa prise et son compteur.

| Intégration | Statut | Mots lus |
|---|---|---|
| OCPP ([ocpp](https://github.com/lbbrhzn/ocpp), 1.6 et 2.0.1) | Status Connector | `Available`, `Reserved` → aucun véhicule ; `Preparing` → véhicule branché ; `Charging` ; `SuspendedEVSE`, `SuspendedEV` → en pause ; `Finishing` → terminée ; `Faulted` → erreur |
| Peblar | State | `no_ev_connected` → aucun véhicule ; `charging` ; `suspended` → en pause ; `error`, `fault`, `invalid` → erreur |
| Ohme | Status | `unplugged` → aucun véhicule ; `plugged_in` → véhicule branché ; `pending_approval` → en attente d'autorisation ; `charging` ; `paused` ; `finished` → terminée |
| Tesla Wall Connector | Status | `not_connected` → aucun véhicule ; `connected`, `negotiating` → véhicule branché ; `charging`, `charging_reduced` ; `waiting_car` → en pause ; `charging_finished` → terminée ; `error` |
| NRGkick | Status | `standby` → aucun véhicule ; `connected` → véhicule branché ; `charging` ; `error` |
| OpenEVSE | Charging status | `not_connected` → aucun véhicule ; `connected` → véhicule branché ; `charging` ; `sleeping`, `disabled` → en pause ; `vent_required` et les défauts (`gfci_fault`, `no_ground`, `stuck_relay`…) → erreur |
| Lektrico | State | `available` → aucun véhicule ; `connected` → véhicule branché ; `need_auth` → en attente d'autorisation ; `charging` ; `paused` ; `paused_by_scheduler` → programmée ; `error` |
| Blue Current | Activity | `available` → aucun véhicule ; `charging` ; `error` ; `offline` |
| Webasto Next et Unite ([Modbus](https://github.com/tomwellnitz/Webasto-Next-Modbus)) | Charge Point State | `available`, `reserved` → aucun véhicule ; `preparing` → véhicule branché ; `charging` ; `suspended`, `suspended_evse`, `suspended_ev` → en pause ; `finishing` → terminée ; `error`, `faulted` → erreur |
| Wallbox | Status description | `Charging` ; `Discharging` ; `Paused`, `Waiting for car demand`, `Waiting in queue by …` → en pause ; `Scheduled` ; `Locked, car connected` → en attente d'autorisation ; `Error`, `Waiting MID failed` → erreur |
| Easee ([easee_hass](https://github.com/nordicopen/easee_hass)) | Status | `disconnected` → aucun véhicule ; `awaiting_start` → véhicule branché ; `awaiting_authorization` → en attente d'autorisation ; `charging` ; `awaiting_load_balancing` → en pause ; `awaiting_scheduled_start`, `awaiting_smart_start` → programmée ; `completed` → terminée ; `error_*` → erreur |
| Zaptec ([zaptec](https://github.com/custom-components/zaptec)) | Charger mode | `disconnected` → aucun véhicule ; `connected_requesting` → véhicule branché ; `connected_charging` → en charge ; `connected_finished` → terminée |
| go-e Charger | Car state | `Idle`, `Charger ready, no vehicle` → aucun véhicule ; `Wait for car`, `Waiting for vehicle` → véhicule branché ; `Charging` ; `Complete` → terminée ; `Error` |
| Alfen ([alfen_wallbox](https://github.com/leeyuentuen/alfen_wallbox)) | Status code socket | `Available`, `Cable connected` → aucun véhicule ; `EV connected` → véhicule branché ; `Authorizing` → en attente d'autorisation ; `Charging normal`, `Solar charging` → en charge ; `Wait vehicle charging`, `Waiting for power` → en pause ; `Finish wait vehicle` → terminée ; `Error …` |
| myenergi Zappi | Plug status | `EV Disconnected` → aucun véhicule ; `EV Connected` → véhicule branché ; `Waiting for EV`, `EV ready to charge` → en pause ; `Charging` ; `Fault` → erreur |
| Fronius Wattpilot, Hypervolt, SMA EV Charger, Charge Amps, Pod Point | Status | leurs mots aussi : `wait car`, `no car`, `sleep_mode`, `active_mode`, `station_locked`, `suspended-ev`, `out-of-service`, `connected-waiting-for-schedule`… |
| Tessie, Greencell, Nexblue, TechnoVE, Shelly EVE01, Besen, Victron GX | Status | `idle`, `disconnected`, `charger_free` → aucun véhicule ; `charger_insert`, `plugged_waiting` → véhicule branché ; `waiting_for_rfid` → en attente d'autorisation ; `charger_wait`, `ev_waiting`, `lb_waiting` → en pause ; `delay_waiting`, `high_tariff_period` → programmée ; `charger_end`, `charged` → terminée ; `pilot_fault`, `error_evse` → erreur |

Le statut se lit quelle que soit son écriture : majuscules, espaces, tirets et virgules s'effacent, si bien que `Waiting for car demand`, `suspended-ev` et `charging_normal` retrouvent les mêmes mots. Le `Disconnected` d'une Wallbox peut être la borne coupée de son cloud plutôt qu'aucune voiture : `state_map: {Disconnected: offline}` le corrige. L'état du véhicule de go-e arrive traduit dans la langue de Home Assistant, et seuls les mots anglais sont lus ; evcc et openWB n'ont pas d'entité de statut, il faut alors leur donner leur prise et leur compteur.

Un mot au sens incertain reste tel qu'il vient, comme pour tout autre appareil : le `booting` de la Tesla, le `wakeup` de la NRGkick, les `updating_firmware` et `locked` de la Lektrico. De même pour un mot qui dit une chose sur une borne et une autre ailleurs : le `ready` de la Tesla est une voiture branchée, le `Ready` d'une Wallbox une borne sans voiture, et tous deux se lisent *Inactif* (`state_map: {ready: connected}` pour la Tesla). Une voiture qui cesse de prendre l'énergie (`SuspendedEV`, `suspended_ev`, le `waiting_car` de la Tesla) se lit *Charge terminée* une fois que la session contient de l'énergie et que la puissance ne passe plus, ce qui demande `session_energy_entity` et `power_entity` ; sinon c'est une pause. Une borne qui retient l'énergie (`SuspendedEVSE`, un `suspended` seul) reste en pause : elle reprend d'elle-même.

Les `unavailable` et `unknown` de Home Assistant se lisent *Hors ligne*. Une borne qui donne l'`Unavailable` d'OCPP comme un mot se règle avec `state_map`, puisque seule la majuscule l'en distingue (les `unavailable` en minuscules de Blue Current et de l'Unite ne peuvent pas l'être, et se lisent *Hors ligne*). Ce qui l'emporte, dans l'ordre : une `error_entity` qui signale une erreur, puis *Hors ligne*, puis une `vehicle_entity` qui dit qu'il n'y a pas de voiture, ce qui fait de tout statut reconnu sauf une erreur *Aucun véhicule*, puis le statut lui-même.

La Webasto Next, avec l'[intégration Modbus](https://github.com/tomwellnitz/Webasto-Next-Modbus) :

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

Une borne sans statut, par sa prise et son compteur : sans voiture elle se lit *Aucun véhicule*, avec une voiture et la puissance au-dessus de `power_on_threshold` *En charge*, avec une voiture sans puissance *Véhicule branché*.

```yaml
type: custom:ha-appliance-card
appliance_type: ev_charger
vehicle_entity: binary_sensor.wallbox_prise
power_entity: sensor.wallbox_puissance
power_on_threshold: 500
```

Une borne qui donne les lettres du pilote de contrôle de la norme IEC 61851 se lit par `state_map`, puisqu'une lettre seule pourrait vouloir dire n'importe quoi sur une autre entité :

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

Et l'`Unavailable` d'OCPP, un connecteur mis hors service, de la même façon :

```yaml
state_map:
  Unavailable: offline
```

#### Charge bidirectionnelle (V2H, V2G)

Une voiture qui rend de l'énergie, à la maison ou au réseau, se lit *En décharge*, dans le violet de l'énergie restituée du tableau de bord Énergie de Home Assistant, et l'énergie remonte le câble de la voiture vers la borne, dans une lueur qui scintille tout le long du câble. Aucune norme ne donne de statut à une borne pour cela : OCPP continue d'annoncer une charge jusqu'à la 2.1, l'ISO 15118-20 n'a pas d'état pour cela, et le fil pilote de l'IEC 61851 n'a pas de sens. La card le lit donc là où il se dit :

- dans un mot, entier : `Discharging` (la Wallbox Quasar, la borne DC de Sigenergy, les intégrations Volvo et Volkswagen) et `v2g_discharging` (Renault) ;
- sur un compteur à part, `discharge_power_entity`, au-dessus de `power_on_threshold` : le `Power.Active.Export` d'OCPP, la puissance Powershare de Tesla ;
- sous zéro sur `power_entity`, pour un compteur qui compte en négatif l'énergie rendue (une Quasar en Modbus). Un compteur qui compte les deux sens de la même façon, comme celui du cloud Wallbox, ne dit rien du sens : le statut le dit.

Une voiture qui rend de l'énergie est en décharge quel que soit le nom que lui donne le statut, puisque OCPP annonce une charge ; une erreur, *Hors ligne* et une prise sans voiture passent toujours avant. Un mot qui ne fait que contenir le mot est autre chose : un mode à choisir (`immediateDischarging`), la batterie de la maison qui alimente la borne (`ChargingBecauseDischargingPvBattery`). Le V2L n'est pas lu non plus : une voiture qui alimente un appareil par sa propre prise n'a pas de wallbox sur son chemin.

Une wallbox OCPP qui sait se décharger, et une Wallbox Quasar :

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

Une entité qui porte le nom d'une wallbox dans les langues de la card, de son fabricant ou d'OCPP est reconnue d'elle-même, comme un statut énuméré qui liste les mots d'une borne. L'éditeur remplit la prise, le compteur, la puissance rendue, la session, la limite de courant, l'erreur et les boutons de démarrage et d'arrêt depuis les entités de la borne, jamais son bouton de redémarrage ou de réinitialisation.

### Étapes du cycle

Pendant qu'un lave-linge, un sèche-linge ou un lave-vaisselle tourne, la ligne d'état nomme l'étape où il en est au lieu d'*En cours* du début à la fin : *Prélavage*, *Trempage*, *Pesée*, *Remplissage*, *Lavage*, *Rinçage*, *Vidange*, *Essorage*, *Séchage*, *Refroidissement*, *Anti-froissage* ou *Vapeur*. Pendant l'essorage d'un lave-linge, le tambour se vide et le linge s'emballe. Une machine en pause, terminée ou en départ différé garde son mot, et le temps restant comme la barre de progression restent ceux du cycle entier.

Où se trouve l'étape dépend de l'intégration :

| Intégration | Où elle le dit | À configurer |
|---|---|---|
| LG ThinQ, Whirlpool, Midea | l'état lui-même (`rinsing`, `cycle_spinning`, `Dry`) | rien |
| Electrolux, AEG | `cyclePhase` (`Wash`, `Rinse`, `Spin`) | `phase_entity` |
| Miele, SmartThings | une entité de phase (`program_phase`, `job_state`) | `phase_entity` |
| hOn (Candy, Hoover, Haier) | une phase numérotée (`prPhase`) | `phase_entity` et `phase_map` |
| HomeWhiz (Beko, Grundig, Arçelik, Bauknecht) | son *Sub state* (`washer_substate_spin`, `dryer_message_cooling`) | `phase_entity` |
| Home Connect (Bosch, Siemens) | nulle part : l'état reste *Run* du début à la fin | rien à lire |

Un mot de l'entité de phase que la carte ne connaît pas s'affiche tel qu'il est écrit, sauf un message de HomeWhiz qui ne nomme pas d'étape (*Hello*, *Child lock*), qui laisse *En cours*. Une machine HomeWhiz dit aussi la fin du cycle dans ce message, en réclamant le linge ou en annonçant le programme terminé alors que son état revient à *On* : encore allumée, la carte affiche *Terminé*. `phase_map` traduit les codes, vers une des étapes ci-dessus ou vers vos propres mots, et `state_map` accepte aussi les étapes comme cibles :

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
