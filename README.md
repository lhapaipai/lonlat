<p align="center">
  <img width="128" src="https://raw.githubusercontent.com/lhapaipai/lonlat/main/extra/assets/public/graphics/logo/logo-shadow.svg" alt="Lonlat logo">
</p>

## Démo

<a href="https://lonlat.org">
<img src="https://raw.githubusercontent.com/lhapaipai/lonlat/main/extra/assets/public/graphics/screenshots/front.jpg" alt="Lonlat App" />
</a>

[LonLat App](https://lonlat.org)

<a href="https://storybook.lonlat.pentatrion.com">
<img src="https://raw.githubusercontent.com/lhapaipai/lonlat/main/extra/assets/public/graphics/screenshots/storybook.jpg" alt="Lonlat Storybook" />
</a>

[Storybook](https://storybook.lonlat.pentatrion.com)

<a href="https://maplibre-react-sandbox.lonlat.pentatrion.com/">
<img src="https://raw.githubusercontent.com/lhapaipai/lonlat/main/extra/assets/public/graphics/screenshots/maplibre-react-sandbox.jpg" alt="Maplibre react sandbox" />
</a>

[Maplibre react sandbox](https://maplibre-react-sandbox.lonlat.pentatrion.com/)

## Installation

dans le dossier `apps/front`
```bash
pnpm install
```

## Démarrage

Front
```bash
cd apps/front
pnpm dev
```

## Prérequis

### Nodejs

On passera par volta pour installer node (ce qui nous permet d'utiliser différentes version de node sur un même système)

```bash
# install Volta
curl https://get.volta.sh | bash

# install Node
volta install node@20

# start using Node
node --version
```

## Workspace / préconisations pour le futur

Afin de simplifier le développement initial, le design-system, maplibre-react-components le front ont été développés dans un mono-repo. À un moment donné les packages vont être dissociés afin de pouvoir avoir leur propre cycle de vie. Ils convient donc de simplifier cette future étape en suivant ces règles.

- `pentatrion-design` ne doit pas dépendre d'autres packages de ce dépôt. un alias `~design` a été créé et fait référence au dossier racine. il peut être utilisé au sein des fichiers du package.

- `maplibre-react-component` ne doit pas dépendre d'autres packages de ce dépôt

- `pentatrion-geo` dépend de `pentatrion-design` et de `maplibre-react-component`. un alias `~geo` a été créé et fait référence au dossier `src`. tout import de composants issus de `pentatrion-design` ou de `maplibre-react-component` doit se faire via leur nom complet. l'alias `~design` ne doit pas être utilisé.

- Actuellement le **storybook** couvre les 3 paquets. il a l'illusion d'être sur un seul et même paquet (c'est en partie pour cela qu'on a ces complications, mais ceci est temporaire car ce dernier sera divisé lorsque les paquets seront dissociés). cette fois-ci il faut utiliser les alias `~geo` et `~design` pour faire référence aux composants ou bien des chemins relatifs.
