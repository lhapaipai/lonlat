Service de tuiles vectorielles


https://geoservices.ign.fr/documentation/services/api-et-services-ogc/tuiles-vectorielles-tmswmts/styles


En premier lieu cette remarque concerne tous les fichers de style. J'ai du changer le `scheme` à `xyz` pour pouvoir afficher ma carte.

```diff
    "sources": {
        "bdtopo": {
          "type": "vector",
          "tiles": [
          "https://wxs.ign.fr/topographie/geoportail/tms/1.0.0/BDTOPO/{z}/{x}/{y}.pbf"
          ],
-          "scheme": "tms",
+          "scheme": "xyz",
          "url":"https://wxs.ign.fr/topographie/geoportail/tms/1.0.0/BDTOPO/metadata.json"
        }
    },
```


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
			"filter": [
				"==",
				"symbo",
				"SURF_PEAGE"
			],
			"paint": {
				"fill-color": "#F2DAAA",
-				"line-opacity": {
-					"stops": [
-						[
-							7,
-							0.6
-						],
-						[
-							14,
-							0.4
-						]
-					]
-				},
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
            "filter": [
                "==",
                "symbo",
                "BATI_PEAGE"
            ],
            "paint": {
                "fill-color": "#DCDCDC",
-                "line-opacity": {
-                    "stops": [
-                        [
-                            7,
-                            0.6
-                        ],
-                        [
-                            14,
-                            0.4
-                        ]
-                    ]
-                },
                "fill-outline-color": "#808080"
            }
        },
```

https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/transparent.json
```diff
		{
			"id": "bati sportif surfacique",
			"type": "line",
			"source": "plan_ign",
			"source-layer": "bati_surf",
			"layout": {
				"visibility": "visible",
				"line-cap": "round",
				"line-join": "round"
			},
			"filter": [
				"in",
				"symbo",
				"TENNIS_SURF",
				"SPORT_INDIF_SURF",
				"FOOT_SURF",
				"MULTI_SPORT_SURF",
				"PISTE_SPORT_SURF",
				"NATATION_SURF"
			],
			"paint": {
				"line-color": "#BCD9AB",
-				"fill-opacity": 0.9,
				"line-width": 2
			}
		},
```


## Les styles d'imitation
https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/classique.json
```diff
-    {
-      "id": "transport_par_cable_dash",
-      "type": "line",
-      "source": "bdtopo",
-      "source-layer": "transport_par_cable",
-      "minzoom": 1,
-      "paint": {
-        "line-color": "rgba(0, 0, 0, 1)",
-        "line-dasharray": [
-          0.1,
-          0.8
-        ],
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
-    {
-        "id": "non_communication",
-        "type": "circle",
-        "source": "bdtopo",
-        "source-layer": "non_communication",
-        "paint": {
-            "circle-color": "#99c637",
-            "circle-stroke-color": "#000000",
-            "circle-opacity": 1,
-            "circle-stroke-width": 1,
-            "circle-radius": 6
-        }
-    },
-
-    {
-        "id": "point_du_reseau",
-        "type": "circle",
-        "source": "bdtopo",
-        "source-layer": "point_du_reseau",
-        "paint": {
-            "circle-color": "#000000",
-            "circle-stroke-color": "#000000",
-            "circle-opacity": 1,
-            "circle-stroke-width": 1,
-            "circle-radius": 3
-        }
-    },
-    {
-        "id": "point_de_repere",
-        "type": "circle",
-        "source": "bdtopo",
-        "source-layer": "point_de_repere",
-        "paint": {
-            "circle-color": "#549d2c",
-            "circle-stroke-color": "#000000",
-            "circle-opacity": 1,
-            "circle-stroke-width": 1,
-            "circle-radius": 5
-        }
-    },
```

remplacer la font Ubuntu
- Ubuntu Bold Italic
- Ubuntu Regular
- Ubuntu Italic
par : Source Sans Pro



# Section BD TOPO

remplacer la font Ubuntu
- Ubuntu
par : Source Sans Pro

https://wxs.ign.fr/static/vectorTiles/styles/BDTOPO/classique.json
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
-    {
-        "id": "non_communication",
-        "type": "circle",
-        "source": "bdtopo",
-        "source-layer": "non_communication",
-        "paint": {
-            "circle-color": "#99c637",
-            "circle-stroke-color": "#000000",
-            "circle-opacity": 1,
-            "circle-stroke-width": 1,
-            "circle-radius": 6
-        }
-    },
-    {
-        "id": "point_du_reseau",
-        "type": "circle",
-        "source": "bdtopo",
-        "source-layer": "point_du_reseau",
-        "paint": {
-            "circle-color": "#000000",
-            "circle-stroke-color": "#000000",
-            "circle-opacity": 1,
-            "circle-stroke-width": 1,
-            "circle-radius": 3
-        }
-    },
-    {
-        "id": "point_de_repere",
-        "type": "circle",
-        "source": "bdtopo",
-        "source-layer": "point_de_repere",
-        "paint": {
-            "circle-color": "#549d2c",
-            "circle-stroke-color": "#000000",
-            "circle-opacity": 1,
-            "circle-stroke-width": 1,
-            "circle-radius": 5
-        }
-    },
```

https://wxs.ign.fr/static/vectorTiles/styles/BDTOPO/bati.json
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

https://wxs.ign.fr/static/vectorTiles/styles/BDTOPO/hydrographie.json
dépendance des fonts à maptiler on est obligé de spécifier une clé maptiler, est-ce normal ?

https://wxs.ign.fr/static/vectorTiles/styles/BDTOPO/bati_date.json
remplacer font
Oswald par Source Sans Pro

https://wxs.ign.fr/static/vectorTiles/styles/BDTOPO/bati_etages.json
```diff
-    {
-      "id": "zone_occupation_urbaine",
-      "type": "fill",
-      "source": "bdtopo",
-      "source-layer": "zone_occupation_sol",
-      "filter": [
-        "all",
-        [
-          "==",
-          "nature",
-          "Bâti"
-        ]
-      ],
-      "paint": {
-        "fill-color": "#E8D8E8"
-      }
-    },
-    {
-      "id": "zone_occupation_activite",
-      "type": "fill",
-      "source": "bdtopo",
-      "source-layer": "zone_occupation_sol",
-      "filter": [
-        "all",
-        [
-          "==",
-          "nature",
-          "Zone d'activités"
-        ]
-      ],
-      "paint": {
-        "fill-color": "rgba(229, 210, 229, 1)"
-      }
-    },
-    {
-        "id": "bass_hydro_union_labels",
-        "type": "symbol",
-        "source": "bdtopo",
-        "source-layer": "bass_hydro_union",
-        "minzoom": 4,
-        "layout": {
-            "text-field": "{toponyme}",
-            "text-font": [
-                "Oswald Regular"
-            ],
-            "text-size": 12
-        },
-        "paint": {
-            "text-color": "#06394B",
-            "text-halo-color": "rgba(255, 250, 255, 1)",
-            "text-halo-width": 2
-        }
-    },
-    {
-        "id": "troncon_hydro_pe_labels",
-        "type": "symbol",
-        "source": "bdtopo",
-        "source-layer": "bass_hydro_union",
-        "minzoom": 4,
-        "layout": {
-            "text-field": "{toponyme}",
-            "text-font": [
-                "Oswald Italic"
-            ],
-            "text-size": 10
-        },
-        "paint": {
-            "text-color": "#06394B",
-            "text-halo-color": "rgba(255, 250, 255, 1)",
-            "text-halo-width": 1
-        }
-    },
-    {
-        "id": "bass_hydro_union",
-        "type": "line",
-        "source": "bdtopo",
-        "source-layer": "bass_hydro_union",
-        "paint": {
-            "line-color": "#06394B",
-            "line-width": 2
-        }
-    },
-    {
-        "id": "route_simplifiee_1",
-        "type": "line",
-        "source": "bdtopo",
-        "source-layer": "route_simplifiee",
-        "filter": [
-            "all",
-            [
-                "==",
-                "importance",
-                "1"
-            ]
-        ],
-        "paint": {
-            "line-color": "rgba(255, 255, 255, 1)",
-            "line-width": 2
-        }
-    },
-    {
-        "id": "route_simplifiee_2",
-        "type": "line",
-        "source": "bdtopo",
-        "source-layer": "route_simplifiee",
-        "filter": [
-            "all",
-            [
-                "==",
-                "importance",
-                "2"
-            ]
-        ],
-        "paint": {
-            "line-color": "rgba(255, 255, 255, 1)",
-            "line-width": 2
-        }
-    },
```

# Section Courbes de niveau

remplacer la font Ubuntu
- Ubuntu
par : Source Sans Pro


# Section Parcellaire Express

https://wxs.ign.fr/static/vectorTiles/styles/PCI/pci.json
https://wxs.ign.fr/static/vectorTiles/styles/PCI/noir_et_blanc.json

l'entrée glyphs fait référence à une URL de maptiler qui nécessite une clé API, est-ce normal ?


