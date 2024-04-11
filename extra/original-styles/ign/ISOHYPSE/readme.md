pas besoin de sprites ils ne sont pas utilisés.
```diff
-   "sprite": "https://data.geopf.fr/annexes/ressources/vectorTiles/styles/BDTOPO/sprite/sprite_bdtopo",
```

```diff
{
-  "filter": ["all", ["==", "altitude", 100]],
+  "filter": ["all", ["==", ["get", "altitude"], 100]],
  "source": "isohypse",
  "source-layer": "courbe",
  "maxzoom": 16,
  "id": "100m",
  "type": "line",
  "paint": {
    "line-color": "#cc8066",
-    "line-width": {
-      "stops": [
-        [6, 1],
-        [10, 2]
-      ]
+    "line-width": 2
    }
  },
  "layout": {
    "line-cap": "square",
    "line-join": "bevel"
  }
}
```
le stop définit une interpolation linéaire. en dessous un niveau de zoom de 6 la largeur de la ligne est à 1, au dessus de 10 elle est de 2. entre 6 et 10 elle est entre les 2.
Vu que nous n'avons pas de tuiles pour des zooms plus petit que 14, c'est inutile.


