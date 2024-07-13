<p align="center">
  <img width="128" src="https://raw.githubusercontent.com/lhapaipai/lonlat/main/extra/assets/public/graphics/logo/logo-shadow.svg" alt="Lonlat logo">
</p>

## Prérequis (Nodejs)

On passera par volta pour installer node (ce qui nous permet d'utiliser différentes version de node sur un même système)

```bash
# install Volta
curl https://get.volta.sh | bash

# install Node
volta install node@20

# start using Node
node --version
```

## Services tiers

Afin de fonctionner l'application doit être connectée à des services tiers :
- OpenRouteService
- Overpass API
- Google StreetView
- IGN

on créera un fichier `apps/front/.env.local` pour renseigner les variables d'environnement associées aux jetons et clés API.

pour le service OpenRouteService vous pouvez créer un compte sur `https://openrouteservice.org/` afin d'obtenir un token qu'on renseignera dans la variable d'environnement : `VITE_OPENROUTESERVICE_TOKEN`.

pour le service google StreetView il faudra également activer le service Maps JavaScript API chez google : https://console.cloud.google.com/google/maps-apis afin d'obtenir une clé API que l'on renseignera dans la variable d'environnement : `VITE_GOOGLE_MAPS_API_TOKEN`.

pour les services de l'IGN et Overpass API il n'y a pas besoin de renseigner de TOKEN.

### services en local

Afin d'être libre de faire tous nos tests sans limites il est possible
de créer des instances des services `OpenRouteService` et `Overpass API` sur notre machine avec Docker.

#### OpenRouteService avec Docker

documentation :
https://giscience.github.io/openrouteservice/run-instance/running-with-docker

Télécharger sur le site geofabrik : `https://download.geofabrik.de/europe/france.html` un fichier de données osm pour la région de votre choix et placez le dans le dossier `./docker/ors/files`.

openstreetmap.fr propose des extractions par départements
http://download.openstreetmap.fr/extracts/europe/france/

créez un fichier `docker-compose.override.yml` et référencez votre fichier dans la variable d'environnement `ors.engine.source_file`.

```yaml
# docker-compose.override.yml
services:
  ors-app:
    environment:
      ors.engine.source_file: /home/ors/files/rhone-alpes-latest.osm.pbf
```

premier lancement. Le service doit faire une première exécution qui va
générer le graphe de routage. À la suite de cela le service sera disponible.

```diff
# docker-compose.yml
services:
  ors-app:
    image: openrouteservice/openrouteservice:v8.1.0

    environment:
-      REBUILD_GRAPHS: False # Set to True to rebuild graphs on container start.
+      REBUILD_GRAPHS: True # Set to True to rebuild graphs on container start.
```

vous devrez ensuite lancer la commande `docker compose up ors-app` pour lancer la génération du graphe de routage. en fonction de la taille du fichier la génération peut prendre plus ou moins de temps
- monaco : quelques secondes
- rhône-alpes : 10 minutes

pour tester si la construction a réussi vous pouvez lancer sur la console la commande suivante en indiquant des coordonnées qui sont dans la zone que vous avez téléchargé.

```bash
curl "http://localhost:8080/ors/v2/directions/driving-car?start=6.5055,46.0894&end=6.4853,46.0769"
```

si vous recevez un message de ce type il faut encore patienter
```json

// erreur typique lorsque le graphe n'a pas fini d'être reconstruit.
{
  "error": {
    "code": 2099,
    "message": "Unable to get an appropriate route profile for RoutePreference = driving-car"
  },
  "info": {
    "engine": {
      "build_date": "2023-11-16T15:05:04Z",
      "version": "8.1.0"
    },
    "timestamp": 1710675477796
  }
}
```

si vous avez un résultat pertinent vous pouvez arrêter le service et remettre la variable d'environnement `REBUILD_GRAPHS` à `false`.

```diff
# docker-compose.yml
services:
  ors-app:
    image: openrouteservice/openrouteservice:v8.1.0

    environment:
-      REBUILD_GRAPHS: True
+      REBUILD_GRAPHS: False
```

vous pouvez maintenant renseigner la variable d'environnement `VITE_OPENROUTESERVICE_URL="http://localhost:8080/ors"` dans votre fichier `apps/front/.env.development.local`. La variable d'environnement `VITE_OPENROUTESERVICE_TOKEN` n'est plus nécessaire.

#### Overpass API avec Docker

il faudra surcharger la variable d'environnement `OVERPASS_PLANET_URL` par notre
propre url de données extraites. remarque l'extraction doit être au format `.osm.bz2`.

```yml
services:
  ors-app:
    environment:
      ors.engine.source_file: /home/ors/files/haute_savoie-latest.osm.pbf
  overpass-api:
    environment:
      OVERPASS_PLANET_URL: https://download.geofabrik.de/europe/france/rhone-alpes-latest.osm.bz2

      # on peut définir un fichier local
      OVERPASS_PLANET_URL: file:///data/haute_savoie-latest.osm.bz2
```

les extractions de département d'openstreetmap france ne sont disponible qu'au
format `.osm.pbf` on peut donc réaliser une conversion avant

```bash
sudo apt install osmium-tool
osmium cat haute_savoie-latest.osm.pbf -o haute_savoie-latest.osm.bz2
```

lancer docker une première fois

```bash
docker compose up overpass-api
```

lorsque le traitement est terminé la commande doit se fermer il faut le relancer une nouvelle fois pour que le service soit opérationel.

vous pouvez maintenant renseigner la variable d'environnement `VITE_OVERPASS_URL="http://localhost:7777"` dans votre fichier `apps/front/.env.development.local`.


## Installation

```bash
pnpm install
```

## Dévelopement

```bash
# si vous hébergez des instances des services tiers
docker compose up

pnpm run dev
```

## Applications

### [LonLat App](https://lonlat.org)

<a href="https://lonlat.org">
<img src="https://raw.githubusercontent.com/lhapaipai/lonlat/main/extra/assets/public/graphics/screenshots/front.jpg" alt="Lonlat App" />
</a>



Copier le fichier `.env` vers `.env.local` et renseigner les variables d'environnements

- mapTiler : pour la carte : Monde > Plan
- googleMapsApi : pour le street view
- openrouteservice : pour les itinéraires et la recherche mondiale.

```bash
cd apps/front
cp .env .env.local
pnpm dev
```



### [Maplibre react sandbox](https://maplibre-react-sandbox.lonlat.pentatrion.com)

<a href="https://maplibre-react-sandbox.lonlat.pentatrion.com/">
<img src="https://raw.githubusercontent.com/lhapaipai/lonlat/main/extra/assets/public/graphics/screenshots/maplibre-react-sandbox.jpg" alt="Maplibre react sandbox" />
</a>



## Mises à jour des paquets

eslint doit rester en version ^8 car les paquets `@typescript-eslint/...` ne sont pas encore compatible eslint v9
.
