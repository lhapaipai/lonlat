## IGN vector styles

- correction des principales erreurs qui empêchent d'afficher les styles dans maplibre : voir [fix-ign](fix-ign.md)

- mise à jour des propriétés de style qui ont été dépréciées à l'aide du script `gl-style-migrate` (@maplibre/maplibre-gl-style-spec).

```bash
pnpm exec gl-style-migrate public/styles/ign-deprecated/PLAN.IGN/toponymes.json > public/styles/ign/PLAN.IGN/toponymes.json
```

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
