Service de tuiles vectorielles


https://geoservices.ign.fr/documentation/services/api-et-services-ogc/tuiles-vectorielles-tmswmts/styles


# Section isohypse

## style isohypse_monochrome_marron

url
- https://data.geopf.fr/annexes/ressources/vectorTiles/styles/ISOHYPSE/isohypse_monochrome_marron.json

la source `frontiere_france` n'existe pas

```diff
-    {
-      "source": "isohypse",
-      "source-layer": "frontiere_france",
-      "id": "Frontiere etat",
-      "type": "line",
-      "paint": {
-        "line-color": "rgba(178, 175, 219, 0.6)",
-        "line-width": {
-          "stops": [
-            [2, 2],
-            [3, 3.5],
-            [9, 5],
-            [14, 13],
-            [15, 20],
-            [16, 24],
-            [17, 42]
-          ]
-        }
-      },
-      "layout": {
-        "line-cap": "square",
-        "line-join": "bevel"
-      }
-    },
-    {
-      "source": "isohypse",
-      "source-layer": "frontiere_france",
-      "id": "Frontiere etat 2",
-      "type": "line",
-      "paint": {
-        "line-color": "#9F9CB8",
-        "line-width": {
-          "stops": [
-            [9, 1.5],
-            [14, 3.5],
-            [15, 5.5],
-            [16, 6.5],
-            [17, 11]
-          ]
-        },
-        "line-dasharray": [4, 2]
-      },
-      "layout": {
-        "line-cap": "square",
-        "line-join": "bevel"
-      }
-    }
```

## style isohypse_multicolore

url
- https://data.geopf.fr/annexes/ressources/vectorTiles/styles/ISOHYPSE/isohypse_multicolore.json

La police de caractère Ubuntu n'existe pas
Remplacer le terme "Ubuntu" par "Source Sans Pro"


la source `frontiere_france` n'existe pas

```diff
-    {
-      "source": "isohypse",
-      "source-layer": "frontiere_france",
-      "id": "Frontiere etat",
-      "type": "line",
-      "paint": {
-        "line-color": "rgba(178, 175, 219, 0.6)",
-        "line-width": {
-          "stops": [
-            [2, 2],
-            [3, 3.5],
-            [9, 5],
-            [14, 13],
-            [15, 20],
-            [16, 24],
-            [17, 42]
-          ]
-        }
-      },
-      "layout": {
-        "line-cap": "square",
-        "line-join": "bevel"
-      }
-    },
-    {
-      "source": "isohypse",
-      "source-layer": "frontiere_france",
-      "id": "Frontiere etat 2",
-      "type": "line",
-      "paint": {
-        "line-color": "#9F9CB8",
-        "line-width": {
-          "stops": [
-            [9, 1.5],
-            [14, 3.5],
-            [15, 5.5],
-            [16, 6.5],
-            [17, 11]
-          ]
-        },
-        "line-dasharray": [4, 2]
-      },
-      "layout": {
-        "line-cap": "square",
-        "line-join": "bevel"
-      }
-    }
```


# Section OCS GE

## style ocsge occupation et style ocsge couverture

urls :
- https://data.geopf.fr/annexes/ressources/vectorTiles/styles/OCSGE/ocsge_occupation.json
- https://data.geopf.fr/annexes/ressources/vectorTiles/styles/OCSGE/ocsge_couverture.json

Un calque apparait duppliqué

```diff
      {
        "id": "Autres formations non ligneuses",
        "source": "ocsge",
        "source-layer": "occupation_sol",
        "type": "fill",
        "paint": {
          "fill-color": "rgba(204,255,204,1)"
        },
        "filter": [
          "all",
          [
            "==",
            ["get", "code_cs"],
            "CS2.2.2"
          ]
        ]
      },
-      {
-        "id": "Autres formations non ligneuses",
-        "source": "ocsge",
-        "source-layer": "occupation_sol",
-        "type": "fill",
-        "paint": {
-          "fill-color": "rgba(204,255,204,1)"
-        },
-        "filter": [
-          "all",
-          [
-            "==",
-            ["get", "code_cs"],
-            "CS2.2.2"
-          ]
-        ]
-      }
```

# Section PCI

pci.json

```diff
-    "glyphs": "https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key={key}",
+    "glyphs":"https://data.geopf.fr/annexes/ressources/vectorTiles/fonts/{fontstack}/{range}.pbf",
```

puis remplacer le terme "SansSerif Bold Italic" par "Source Sans Pro Bold Italic"

# Section Plan IGN

## Les styles « orthophotos »

https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/toponymes.json
```diff
    {
      "id": "Routier surfacique - Péage surfacique",
      "type": "fill",
      "source": "plan_ign",
      "source-layer": "routier_surf",
      "maxzoom": 18,
      "layout": {
        "visibility": "visible"
      },
      "filter": ["==", "symbo", "SURF_PEAGE"],
      "paint": {
        "fill-color": "#F2DAAA",
-        "line-opacity": {
-          "stops": [
-            [7, 0.6],
-            [14, 0.4]
-          ]
-        },
        "fill-outline-color": "#E2A52A"
      }
    },
    {
      "id": "bati transport surfacique - bati peage",
      "type": "fill",
      "source": "plan_ign",
      "source-layer": "bati_surf",
      "minzoom": 13,
      "layout": {
        "visibility": "visible"
      },
      "filter": ["==", "symbo", "BATI_PEAGE"],
      "paint": {
        "fill-color": "#DCDCDC",
-        "line-opacity": {
-          "stops": [
-            [7, 0.6],
-            [14, 0.4]
-          ]
-        },
        "fill-outline-color": "#808080"
      }
    },
```


# Bd TOPO

## Bati étages

https://wxs.ign.fr/static/vectorTiles/styles/BDTOPO/bati_etages.json

Remplacer le terme "Ubuntu" par "Source Sans Pro"

Référence à des calques qui n'existent pas.

```diff
-    {
-      "id": "bass_hydro_union_labels",
-      "type": "symbol",
-      "source": "bdtopo",
-      "source-layer": "bass_hydro_union",
-      "minzoom": 4,
-      "layout": {
-        "text-field": "{toponyme}",
-        "text-font": ["Oswald Regular"],
-        "text-size": 12
-      },
-      "paint": {
-        "text-color": "#06394B",
-        "text-halo-color": "rgba(255, 250, 255, 1)",
-        "text-halo-width": 2
-      }
-    },
-    {
-      "id": "troncon_hydro_pe_labels",
-      "type": "symbol",
-      "source": "bdtopo",
-      "source-layer": "bass_hydro_union",
-      "minzoom": 4,
-      "layout": {
-        "text-field": "{toponyme}",
-        "text-font": ["Oswald Italic"],
-        "text-size": 10
-      },
-      "paint": {
-        "text-color": "#06394B",
-        "text-halo-color": "rgba(255, 250, 255, 1)",
-        "text-halo-width": 1
-      }
-    },
-
-    {
-      "id": "route_simplifiee_1",
-      "type": "line",
-      "source": "bdtopo",
-      "source-layer": "route_simplifiee",
-      "filter": ["all", ["==", "importance", "1"]],
-      "paint": { "line-color": "rgba(255, 255, 255, 1)", "line-width": 2 }
-    },
-    {
-      "id": "route_simplifiee_2",
-      "type": "line",
-      "source": "bdtopo",
-      "source-layer": "route_simplifiee",
-      "filter": ["all", ["==", "importance", "2"]],
-      "paint": { "line-color": "rgba(255, 255, 255, 1)", "line-width": 2 }
-    },
-    {
-      "id": "bass_hydro_union",
-      "type": "line",
-      "source": "bdtopo",
-      "source-layer": "bass_hydro_union",
-      "paint": { "line-color": "#06394B", "line-width": 2 }
-    },
-    {
-      "id": "zone_occupation_urbaine",
-      "type": "fill",
-      "source": "bdtopo",
-      "source-layer": "zone_occupation_sol",
-      "filter": ["all", ["==", "nature", "Bâti"]],
-      "paint": { "fill-color": "#E8D8E8" }
-    },
-    {
-      "id": "zone_occupation_activite",
-      "type": "fill",
-      "source": "bdtopo",
-      "source-layer": "zone_occupation_sol",
-      "filter": ["all", ["==", "nature", "Zone d'activités"]],
-      "paint": { "fill-color": "rgba(229, 210, 229, 1)" }
-    },

```

## Bati date

url: https://data.geopf.fr/annexes/ressources/vectorTiles/styles/BDTOPO/bati_date.json

Remplacer le terme "Ubuntu" par "Source Sans Pro"


## Routier

url: https://data.geopf.fr/annexes/ressources/vectorTiles/styles/BDTOPO/routier.json

Remplacer le terme "Ubuntu" par "Source Sans Pro"

## Hydrographie

url: https://data.geopf.fr/annexes/ressources/vectorTiles/styles/BDTOPO/hydrographie.json

```diff
-    "glyphs": "https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key={key}",
+    "glyphs":"https://data.geopf.fr/annexes/ressources/vectorTiles/fonts/{fontstack}/{range}.pbf",
```

Puis Remplacer le terme "Ubuntu" par "Source Sans Pro"

## Bati

url: https://data.geopf.fr/annexes/ressources/vectorTiles/styles/BDTOPO/bati.json

Remplacer le terme "Ubuntu" par "Source Sans Pro"

```diff
-    {
-      "id": "transport_par_cable_dash",
-      "type": "line",
-      "source": "bdtopo",
-      "source-layer": "transport_par_cable",
-      "minzoom": 1,
-      "paint": {
-        "line-color": "rgba(0, 0, 0, 1)",
-        "line-dasharray": [0.1, 0.8],
-        "line-width": 15
-      }
-    },
-    {
-      "id": "transport_par_cable_line",
-      "type": "line",
-      "source": "bdtopo",
-      "source-layer": "transport_par_cable",
-      "minzoom": 1,
-      "paint": {
-        "line-color": "rgba(0, 0, 0, 1)",
-        "line-width": 2.5
-      }
-    },
```

## Classique

url: https://data.geopf.fr/annexes/ressources/vectorTiles/styles/BDTOPO/classique.json

```diff
    {
      "id": "point_de_repere",
      "type": "circle",
      "source": "bdtopo",
      "source-layer": "point_de_repere",
      "paint": {
        "circle-color": "#549d2c",
        "circle-stroke-color": "#000000",
        "circle-opacity": 1,
        "circle-stroke-width": 1,
        "circle-radius": 5
      }
    },
    {
      "id": "point_du_reseau",
      "type": "circle",
      "source": "bdtopo",
      "source-layer": "point_du_reseau",
      "paint": {
        "circle-color": "#000000",
        "circle-stroke-color": "#000000",
        "circle-opacity": 1,
        "circle-stroke-width": 1,
        "circle-radius": 3
      }
    },
    {
      "id": "non_communication",
      "type": "circle",
      "source": "bdtopo",
      "source-layer": "non_communication",
      "paint": {
        "circle-color": "#99c637",
        "circle-stroke-color": "#000000",
        "circle-opacity": 1,
        "circle-stroke-width": 1,
        "circle-radius": 6
      }
    },
    {
      "id": "transport_par_cable_dash",
      "type": "line",
      "source": "bdtopo",
      "source-layer": "transport_par_cable",
      "minzoom": 1,
      "paint": {
        "line-color": "rgba(0, 0, 0, 1)",
        "line-dasharray": [0.1, 0.8],
        "line-width": 15
      }
    },
    {
      "id": "transport_par_cable_line",
      "type": "line",
      "source": "bdtopo",
      "source-layer": "transport_par_cable",
      "minzoom": 1,
      "paint": {
        "line-color": "rgba(0, 0, 0, 1)",
        "line-width": 2.5
      }
    },

```
Remplacer le terme "Ubuntu" par "Source Sans Pro"

# Section Admin express

## style admin express

Remplacer tout ce qui fait référence à "Open Sans" ou "Arial Unicode MS" par "Source Sans Pro"

```diff
-  "text-font": ["Open Sans Bold", "Arial Unicode MS Regular"]
+  "text-font": ["Source Sans Pro Bold"]
```
