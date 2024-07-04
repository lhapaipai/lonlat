doc:

résumé ici : https://wiki.openstreetmap.org/wiki/Overpass_API/Installation
bonne autre source et en français : https://wiki.geonov.fr/Overpass
sinon la doc exhaustive pour l'installation
- http://overpass-api.de/
  - Typical Installation
  - Complete Installation

télécharger le code source sur : https://wiki.openstreetmap.org/wiki/Overpass_API/versions

note il existe aussi ce github mais je n'ai pas pris les source depuis le github : https://github.com/drolbr/Overpass-API


```bash
./configure CXXFLAGS="-O3"
make

# cela va créer des exec dans le dossier bin
chmod a+x ./bin/init_osm3s.sh

mkdir data db

# télécharger une archive .osm.bz2 depuis les extractions geofabrik

./bin/init_osm3s.sh ./data/rhone-alpes-latest.osm.bz2 ./db .
```

## Lancement


```bash
# en avant plan
./bin/dispatcher --osm-base --db-dir=./db

# en arrière plan
nohup ./bin/dispatcher --osm-base --db-dir=./db &
```

si on lance une requête simple c'est bon.

```bash
[timeout:10][out:json];
node[natural]({{bbox}});
out;
```

par contre si l'on lance une requête impliquant des area cela plante

```bash
[timeout:10][out:json];
is_in(46.0918, 6.4978);
out;
```

## Ajouter les areas


pour répondre aux requêtes des area il faut lancer une autre instance en plus de `--osm-base`.

```bash
# lancer l'autre instance
./bin/dispatcher --areas --db-dir=./db

# puis lancer les mises à jour
./bin/rules_loop.sh db
```

cela devrait prendre 3 minutes voir les logs dans `db/rules_loop.log`
on peut alors quitter le script `./bin/rules_loop.sh db` (dans les 3 secondes par superstitions ?)
on doit laisser l'autre script `./bin/dispatcher --areas --db-dir=./db` toujours exécuté pour gérer les requêtes d'`area`.

## Fermer proprement

ouvrir un une console

```bash
./bin/dispatcher --osm-base --terminate
./bin/dispatcher --areas --terminate
```

## En cas de crash

Tuer le processus, empêche de relancer les scripts il faut supprimer la socket et l'emplacement mémoire

pour le programme principal
`db/osm3s_osm_base`
`/dev/shm/osm3s_osm_base`

pour les areas
`db/osm3s_areas`
`/dev/shm/osm3s_areas`

## Configuration apache

Les CORS sont gérés automatiquement.

`cat /etc/apache2/sites-available/overpass.localdomain.conf`
```bash


<VirtualHost *:80>
    ServerAdmin hugues@pentatrion.com
    ServerName overpass.localdomain

    Redirect "/" "https://overpass.localdomain/"
</VirtualHost>

<VirtualHost *:443>
    ServerAdmin hugues@pentatrion.com
    ServerName overpass.localdomain

    ExtFilterDefine gzip mode=output cmd=/usr/bin/gzip

    DocumentRoot '/mnt/partage/cartographie/osm-3s_v0.7.61/html'
    <Directory '/mnt/partage/cartographie/osm-3s_v0.7.61/html'>
        Options Indexes FollowSymLinks
        AllowOverride all
        Require all granted
    </Directory>

    ScriptAlias /api/ /mnt/partage/cartographie/osm-3s_v0.7.61/cgi-bin/

    <Directory '/mnt/partage/cartographie/osm-3s_v0.7.61/cgi-bin'>
        AllowOverride None
        Options +ExecCGI -MultiViews +SymLinksIfOwnerMatch
        Require all granted
    </Directory>

    ErrorLog /var/log/apache2/overpass.localdomain-error.log
    CustomLog /var/log/apache2/overpass.localdomain-access.log combined

    <IfFile "/etc/apache2/certs/overpass.localdomain/fullchain.pem">
        SSLEngine on
        SSLCertificateFile /etc/apache2/certs/overpass.localdomain/fullchain.pem
        SSLCertificateKeyFile /etc/apache2/certs/overpass.localdomain/privkey.pem
    </IfFile>

</VirtualHost>


```

## Tester son instance localement

https://overpass-turbo.eu/

-> paramètres Serveur : https://overpass.localdomain/api/


## Vérifier les processus en cours

```bash
ps -ef | grep dispatcher
```
