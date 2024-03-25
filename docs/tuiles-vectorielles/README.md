### Etalab (origine OSM)

https://www.etalab.gouv.fr/

uniquement la france, il propose plusieurs [flux de tuiles vectorielles](https://openmaptiles.geo.data.gouv.fr/) **basés sur les données OSM** pour les fonds de carte comme des flux de  données spatiales dédiés (cadastre, limites administrative,...).

```
https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json
https://openmaptiles.geo.data.gouv.fr/data/cadastre-dvf.json
https://openmaptiles.geo.data.gouv.fr/data/france-vector.json
```

va récupérer des sources vectorielles de la forme :

```
https://openmaptiles.geo.data.gouv.fr/data/france-vector/{z}/{x}/{y}.pbf
```

### ICGC

L'institut cartographique et géologique de la Catalogne propose de son côté plusieurs styles de fond de carte en tuiles vectorielles (basés sur les données OSM), disponibles sans restriction à l'échelle du monde. https://openicgc.github.io/

```
https://geoserveis.icgc.cat/contextmaps/icgc.json
https://geoserveis.icgc.cat/contextmaps/osm-bright.json
https://geoserveis.icgc.cat/contextmaps/fulldark.json
https://geoserveis.icgc.cat/contextmaps/night.json
https://geoserveis.icgc.cat/contextmaps/positron.json
https://geoserveis.icgc.cat/contextmaps/hibrid.json
```

### Maptiler Data

https://data.maptiler.com/downloads/tileset/osm/europe/france/

pour un usage privé il propose des extractions d'openstreetmap 2017 au format `.mbtiles`. on peut sélectionner la région souhaitée (monde europe france) pour un usage non commercial les données sont plus vieilles (2017-07-03).

cela permet d'héberger un serveur de cartes vectorielles très simplement en associant ces données à `Maptiler Server`

### Maplibre

https://demotiles.maplibre.org/style.json


### IGN

Service de tuiles vectorielles

docs:
- https://geoservices.ign.fr/documentation/services/services-geoplateforme/diffusion#70064 -> section `Service Géoplateforme de tuiles vectorielles TMS` fait référence au lien ci-dessous.
- marqué comme déprécié mais les urls ont été mises à jour : https://geoservices.ign.fr/documentation/services/api-et-services-ogc/tuiles-vectorielles-tmswmts/styles

chaque rubrique correspond à une source de données différente

`https://data.geopf.fr/annexes/ressources/vectorTiles/styles/{Layer}/{style}.json`

- Admin Express
    `adminexpress.json` : https://data.geopf.fr/annexes/ressources/vectorTiles/styles/ADMIN_EXPRESS/adminexpress.json

- BD TOPO
    - Le style "Classique"
        - `classique.json` : https://data.geopf.fr/annexes/ressources/vectorTiles/styles/BDTOPO/classique.json
    - Les styles thématiques
        - `bati.json` : https://data.geopf.fr/annexes/ressources/vectorTiles/styles/BDTOPO/bati.json
        - `hydrographie.json` : https://data.geopf.fr/annexes/ressources/vectorTiles/styles/BDTOPO/hydrographie.json
        - `routier.json` : https://data.geopf.fr/annexes/ressources/vectorTiles/styles/BDTOPO/routier.json
    - Les styles d'usage
        - `bati_date.json` : https://data.geopf.fr/annexes/ressources/vectorTiles/styles/BDTOPO/bati_date.json
        - `bati_etages.json` : https://data.geopf.fr/annexes/ressources/vectorTiles/styles/BDTOPO/bati_etages.json
- Courbes de niveau
    - `isohypse_multicolore.json` : https://data.geopf.fr/annexes/ressources/vectorTiles/styles/ISOHYPSE/isohypse_multicolore.json
    - `isohypse_marron.json` : https://data.geopf.fr/annexes/ressources/vectorTiles/styles/ISOHYPSE/isohypse_monochrome_marron.json
    - `isohypse_orange.json` : https://data.geopf.fr/annexes/ressources/vectorTiles/styles/ISOHYPSE/isohypse_monochrome_orange.json
- OCS GE
    - `ocsge_couverture.json` : https://data.geopf.fr/annexes/ressources/vectorTiles/styles/OCSGE/ocsge_couverture.json
    - `ocsge_usage.json` : https://data.geopf.fr/annexes/ressources/vectorTiles/styles/OCSGE/ocsge_usage.json
    - `ocsge_occupation.json` : https://data.geopf.fr/annexes/ressources/vectorTiles/styles/OCSGE/ocsge_occupation.json
- Parcellaire Express (PCI)
    - `noir_et_blanc.json` : https://data.geopf.fr/annexes/ressources/vectorTiles/styles/PCI/noir_et_blanc.json
    - `pci.json` : https://data.geopf.fr/annexes/ressources/vectorTiles/styles/PCI/pci.json
- Plan IGN
    - Le style « Standard »
        - `standard.json` : https://data.geopf.fr/annexes/ressources/vectorTiles/styles/PLAN.IGN/standard.json
    - Les styles de superpositions
        - `attenue.json` : Réduit le contraste en «blanchissant» les données, cela facilite la lecture de données superposées plus contrastées. : https://data.geopf.fr/annexes/ressources/vectorTiles/styles/PLAN.IGN/attenue.json
        - `gris.json` : Enlève la couleur, ce qui permet de faciliter la superposition de données métiers «colorées» sur le fond Plan IGN. : https://data.geopf.fr/annexes/ressources/vectorTiles/styles/PLAN.IGN/gris.json
        - `sans_toponymes.json` : Enlève les toponymes ce qui réduit la quantité d’informations visibles à l’écran. : https://data.geopf.fr/annexes/ressources/vectorTiles/styles/PLAN.IGN/sans_toponymes.json
    - Les styles « orthophotos » : Ils permettent de combiner le fond Photographies aériennes avec les infos essentielles de Plan IGN. Nous créons alors un fond de plan mixte très utile pour voir le terrain (sol et végétation) et les infos essentielles (bati/routes... pour le style transparent et/ou toponyme pour le style du même nom).
        - `toponymes.json` : https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/toponymes.json
        - `transparent.json` : n'existe plus ? 404
    - Le style de lecture : Avec le style Accentué, nous disposons d’un style plus visible en cas de contre-jour. Certains personnes qui ont des problèmes de vue peuvent aussi apprécier le contraste
        - `accentue.json` : https://data.geopf.fr/annexes/ressources/vectorTiles/styles/PLAN.IGN/accentue.json
    - Les styles « d'imitation » : Ils permettent de décliner facilement une nouvelle légende pour répondre à un usage spécifique, recopier un style connu ou faire de la communication sur les réseaux sociaux

    Avec les styles Classique et Epuré, nous essayons de faire des styles ressemblant à d’anciens fonds (Plan IGN v1) ou d’autres fonds actuels (SCAN 25, la carte topo classique de l’IGN).
        - `classique.json` : pas de mise en forme : https://data.geopf.fr/annexes/ressources/vectorTiles/styles/PLAN.IGN/classique.json
        - `epure.json` : bien : https://data.geopf.fr/annexes/ressources/vectorTiles/styles/PLAN.IGN/epure.json


## Génération des tuiles

PostGIS permet de directement générer des tuiles grâce à la fonction [ST_AsMVT](https://postgis.net/docs/ST_AsMVT.html) avec des [bonnes performances](https://blog.cleverelephant.ca/2019/08/postgis-3-mvt.html). C'est ce principe qui sera utilisé ici pour mettre en place un serveur de tuiles.

QGIS permet également de prégénérer des tuiles à partir de n'importe quel fichier vectoriel compatible ([`Boite à outils`](https://docs.qgis.org/3.16/fr/docs/user_manual/processing/toolbox.html) → `Ecrire des tuiles vectorielles`).

## Éditeurs de style

Editor ContextMaps (associé à icgc : https://eines.icgc.cat/contextmaps)

Maputnik : https://maputnik.github.io
