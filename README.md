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

## Installation

```bash
pnpm install
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

### [Storybook](https://design.pentatrion.com)

<a href="https://storybook.lonlat.pentatrion.com">
<img src="https://raw.githubusercontent.com/lhapaipai/lonlat/main/extra/assets/public/graphics/screenshots/storybook.jpg" alt="Lonlat Storybook" />
</a>

```bash
cd apps/storybook
pnpm dev
```

### [Maplibre react sandbox](https://maplibre-react-sandbox.lonlat.pentatrion.com)

<a href="https://maplibre-react-sandbox.lonlat.pentatrion.com/">
<img src="https://raw.githubusercontent.com/lhapaipai/lonlat/main/extra/assets/public/graphics/screenshots/maplibre-react-sandbox.jpg" alt="Maplibre react sandbox" />
</a>


### [Maplibre React Components](https://maplibre-react-components.pentatrion.com)



