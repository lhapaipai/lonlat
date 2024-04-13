## resize-thumbnails.ts

récupère les miniatures png (400x300) des calques de base provenant du dossier `extra/prepare-data/data/layer-thumbnails`.

et crée 2 miniatures 90x54 et 180x108 qu'il vient placer dans les dossiers `extra/prepare-data/data/{1,2}x`

## compose-sprite.ts

opération qui suit `resize-thumbnails.ts`. elle récupère tous les miniatures créés et vient composer un sprite de celles ci qui sera exporté dans le dossier `extra/prepare-data/dist/sprites`.
