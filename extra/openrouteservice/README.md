## Documentation

Openrouteservice Backend Documentation
https://giscience.github.io/openrouteservice/

Advanced Docker Setup
https://github.com/GIScience/openrouteservice/wiki/Advanced-Docker-Setup


## Installation

```bash
# download docker-compose.yml
wget https://raw.githubusercontent.com/GIScience/openrouteservice/v7.2.0/docker-compose.yml
```

```diff
# docker-compose.yml
- image: openrouteservice/openrouteservice:latest
+ image: openrouteservice/openrouteservice:v7.2.0
```


## Mise à jour des données

```diff
# docker-compose.yml

- - BUILD_GRAPHS=False # Forces the container to rebuild the graphs, e.g. when PBF is changed
+ - BUILD_GRAPHS=True # Forces the container to rebuild the graphs, e.g. when PBF is changed
```

et lancer `docker compose up` une fois. Après on pourra remettre la valeur d'origine.

Note: cette mise à jour prend une dizaine de minute avec des données comme la région rhône-alpes. Faire une requête pour vérifier que le nouveau graphe a bien été reconstruit. (sinon on peut avoir une erreur 500)

`http://localhost:8080/ors/v2/directions/driving-car?start=6.404428482055664,46.084304706472494&end=6.415157318115234,46.079184708676145`
```json

// erreur typique lorsque le graphe n'a pas fini d'être reconstruit.
{
  "error": {
    "code": 2099,
    "message": null
  },
  "info": {
    "engine": {
      "build_date": "2023-11-16T15:05:04Z",
      "version": "7.2.0"
    },
    "timestamp": 1710675477796
  }
}
```
