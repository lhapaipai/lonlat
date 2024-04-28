## IGN vector styles

- correction des principales erreurs qui empêchent d'afficher les styles dans maplibre : voir [fix-ign](fix-ign.md)

- mise à jour des propriétés de style qui ont été dépréciées à l'aide du script `gl-style-migrate` (@maplibre/maplibre-gl-style-spec).

```bash
pnpm exec gl-style-migrate public/styles/ign-deprecated/PLAN.IGN/toponymes.json > public/styles/ign/PLAN.IGN/toponymes.json
```

- améliorations des calques en suivant les préconisations de mapbox : https://docs.mapbox.com/help/troubleshooting/mapbox-gl-js-performance/#use-vector-tileset-sources

impossible de mettre les polygones d'orographie dans un seul calque car nous n'avons pas de propriété qui nous permetterai de définir un `fill-sort-order`

Toponymes qui n'existent pas et qui font planter
```diff
{
      "id": "toponyme bati ponc autre",
      "type": "symbol",
      "source": "plan_ign",
      "source-layer": "toponyme_bati_ponc",
      "minzoom": 12,
      "filter": [
        "match",
        ["get", "txt_typo"],
-        ["BAT_ACTIVITE", "BAT_FORTIF", "BAT_VILLAGE_DETRUIT"],
+        ["BAT_FORTIF", "BAT_VILLAGE_DETRUIT"],
        true,
        false
      ],
      "layout": {
        "visibility": "visible",
        "symbol-placement": "point",
        "text-field": ["to-string", ["get", "texte"]],
        "text-anchor": "center",
        "text-size": 11,
        "text-allow-overlap": false,
        "text-padding": 1,
        "text-font": ["Source Sans Pro"]
      },
      "paint": { "text-color": "#532A2A" }
    },

-    {
-      "id": "toponyme bati ponc aerodrome 12",
-      "type": "symbol",
-      "source": "plan_ign",
-      "source-layer": "toponyme_bati_ponc",
-      "minzoom": 11,
-      "maxzoom": 12,
-      "filter": ["==", ["get", "txt_typo"], "AERODROME_PONC"],
-      "layout": {
-        "visibility": "visible",
-        "symbol-placement": "point",
-        "text-field": ["to-string", ["get", "texte"]],
-        "text-anchor": "bottom",
-        "text-offset": [0, -1.3],
-        "text-size": 9.5,
-        "text-allow-overlap": false,
-        "text-padding": 1,
-        "text-font": ["Source Sans Pro"]
-      },
-      "paint": {
-        "text-color": "#120049",
-        "text-halo-color": "rgba(255, 255, 255, 0.5)",
-        "text-halo-width": 2
-      }
-    },

{
      "id": "toponyme localite importance 2",
      "type": "symbol",
      "source": "plan_ign",
      "source-layer": "toponyme_localite_ponc",
      "minzoom": 4,
      "maxzoom": 13,
      "filter": [
        "match",
        ["get", "txt_typo"],
-        ["BAT_COMMUNE-2", "BAT_COMMUNE_2", "BAT_COMMUNE_2_T", "TYPO_A_2", "commune 2"],
+        ["BAT_COMMUNE-2", "BAT_COMMUNE_2", "BAT_COMMUNE_2_T", "commune 2"],
        true,
        false
      ],
      "layout": {
        "visibility": "visible",
        "symbol-placement": "point",
        "icon-image": "Localite",
        "icon-size": 0.25,
        "text-field": ["to-string", ["get", "texte"]],
        "text-size": ["interpolate", ["linear"], ["zoom"], 4, 10, 6, 17],
        "text-allow-overlap": true,
        "text-anchor": "bottom-left",
        "text-offset": [0.3, 0.2],
        "text-padding": 1,
        "text-transform": "uppercase",
        "text-font": [
          "step",
          ["zoom"],
          ["literal", ["Source Sans Pro Regular"]],
          7,
          ["literal", ["Source Sans Pro Bold"]],
          10,
          ["literal", ["Source Sans Pro Regular"]]
        ]
      },
      "paint": {
        "text-color": "#000000",
        "text-halo-color": "rgba(255, 255, 255, 0.5)",
        "text-halo-width": 3
      }
    }

{
      "id": "toponyme localite importance 1",
      "type": "symbol",
      "source": "plan_ign",
      "source-layer": "toponyme_localite_ponc",
      "minzoom": 3,
      "maxzoom": 13,
      "filter": [
        "match",
        ["get", "txt_typo"],
-        ["BAT_COMMUNE_1", "BAT_COMMUNE_1_T", "TYPO_A_1", "commune 1"],
+        ["BAT_COMMUNE_1", "BAT_COMMUNE_1_T", "commune 1"],
        true,
        false
      ],
      "layout": {
        "visibility": "visible",
        "symbol-placement": "point",
        "icon-image": "Localite",
        "icon-size": 0.3,
        "text-field": ["to-string", ["get", "texte"]],
        "text-size": ["interpolate", ["linear"], ["zoom"], 3, 10, 6, 20],
        "text-allow-overlap": false,
        "text-anchor": "bottom-left",
        "text-offset": [0.25, -0.1],
        "text-padding": 1,
        "text-transform": "uppercase",
        "text-font": [
          "step",
          ["zoom"],
          ["literal", ["Source Sans Pro Regular"]],
          7,
          ["literal", ["Source Sans Pro Bold"]],
          10,
          ["literal", ["Source Sans Pro Regular"]]
        ]
      },
      "paint": {
        "text-color": "#000000",
        "text-halo-color": "rgba(255, 255, 255, 0.5)",
        "text-halo-width": 4
      }
    }
```


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

pour les lignes avec un trait perpendiculaire on spécifie le même layout pour que les calques soient groupés : "line-cap" -> "butt"

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
