## add-context.mjs

src: `town-74.json`
dst: `town-74-01.json`

```diff
{
    "insee": 74001,
    "code_postal": 74360,
    "latitude": 46.2661080816,
    "longitude": 6.7321620538,
    "nom_commune": "Abondance",
    "code_departement": 74,
    "nom_departement": "Haute-Savoie",
    "code_region": 84,
    "nom_region": "Auvergne-Rhône-Alpes",
+    "context": "Abondance, Haute-Savoie, Auvergne-Rhône-Alpes"
}
```

ajoute un champ `context` pour chaque entrée `${town.nom_commune}, ${town.nom_departement}, ${town.nom_region}`


## dedupe.mjs

src: `town-74-01.json`
dst: `town-74-02.json`

vérifie que la clé `insee` est bien unique entre toutes les entrées afin qu'elle soit utilisée comme clé primaire. (sinon retire les entrées en double)

## add-population.mjs

src: `town-74-02.json` et `population.json`
dst: `town-74-03.json`

à partir des infos de population par insee `population.json` ajoute un champ `population` et `icon` (dépendant de la population)

## format-geojson.mjs

src: `town-74-03.json`
dst: `town-74-04.geojson`

transforme notre fichier final en `geojson` de type `FeatureCollection`.


