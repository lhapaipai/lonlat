## IGN vector styles

- correction des principales erreurs qui empêchent d'afficher les styles dans maplibre : voir [fix-ign](fix-ign.md)

- mise à jour des propriétés de style qui ont été dépréciées à l'aide du script `gl-style-migrate` (@maplibre/maplibre-gl-style-spec).

```bash
pnpm exec gl-style-migrate public/styles/ign-deprecated/PLAN.IGN/toponymes.json > public/styles/ign/PLAN.IGN/toponymes.json
```

- améliorations des calques en suivant les préconisations de mapbox : https://docs.mapbox.com/help/troubleshooting/mapbox-gl-js-performance/#use-vector-tileset-sources

impossible de mettre les polygones d'orographie dans un seul calque car nous n'avons pas de propriété qui nous permetterai de définir un `fill-sort-order`

```json
{
  "id": "orographie : relief",
  "type": "fill",
  "source": "plan_ign",
  "source-layer": "oro_relief",
  "minzoom": 0,
  "filter": [
    "match",
    ["get", "symbo"],
    [
      "HYPSO_0",
      "HYPSO_100",
      "HYPSO_200",
      "HYPSO_1000",
      "HYPSO_3000",
      "HYPSO_4000",
      "HYPSO_5000",
      "GLACIER"
    ],
    true,
    false
  ],
  "layout": { "visibility": "visible" },
  "paint": {
    "fill-color": [
      "match",
      ["get", "symbo"],
      "HYPSO_0",
      "#D6E5BA",
      "HYPSO_100",
      "#F7F2DA",
      "HYPSO_200",
      "#EBDEBF",
      "HYPSO_1000",
      "#DABE97",
      "HYPSO_3000",
      "#B28773",
      "HYPSO_4000",
      "#9E6A54",
      "HYPSO_5000",
      "#773A2B",
      "GLACIER",
      "#FFFFFF",
      "transparent"
    ],
    "fill-opacity": 1
  }
}
```

regroupement des calques
suppression des interpolations de couleur où la couleur ne varie presque pas entre le zoom 14 et 15.

on a des courbes de niveau dans `oro_courbe` identifiée par `symbo == "CNV_"` par contre je ne vois pas de `CUVETTE_`.

## Utile

source et couche à ajouter pour avoir un fond de carte openstreetmap
Pour le debug de couches comme les courbes de niveau


```
// source
    "orthophoto": {
      "type": "raster",
      "tiles": ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
      "tileSize": 256
    }


// layer
    {
      "id": "orthophoto",
      "type": "raster",
      "source": "orthophoto",
      "minzoom": 0,
      "maxzoom": 20
    },

```
