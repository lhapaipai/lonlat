<p align="center">
  <img width="128" src="https://raw.githubusercontent.com/lhapaipai/lonlat/main/extra/shared/images/logo.svg" alt="Lonlat logo">
</p>


## Démarage

```bash
cd apps/api
# démarre les services docker (base de données) et un serveur Caddy pour l'API.
make dev
```


## Prérequis

### PHP

```bash
# ajout du dépôt ondrej/php dans la liste des dépôts
sudo LC_ALL=C.UTF-8 add-apt-repository ppa:ondrej/php

# mettre à jour les références à partir des nouveaux dépôts enregistrés
sudo apt-get update -y

sudo apt install php8.3-fpm php8.3-bcmath php8.3-intl php8.3-mbstring php8.3-xml php8.3-pgsql php8.3-gd php8.3-curl php8.3-xdebug

# vérifier
php --version

# demander de charger le service au démarrage
sudo systemctl enable php8.3-fpm.service
```

### Docker

```bash
# pour les outils de développement : PostgreSQL/maildev/PgAdmin

# ajouter la clé GPG
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# ajouter le dépôt Docker officiel
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# mettre à jour
sudo apt-get update

# installer Docker engine
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose

# activer docker au démarrage
sudo systemctl enable docker

# ajouter votre utilisateur au groupe docker
sudo usermod -aG docker <bertrand>

# redémarrer votre ordinateur et tester docker
docker run hello-world
```

### Nodejs

On passera par volta pour installer node (ce qui nous permet d'utiliser différentes version de node sur un même système)

```bash
# install Volta
curl https://get.volta.sh | bash

# install Node
volta install node@20

# start using Node
node --version
```

### Caddy

Télécharger le binaire de `xcaddy` sur : [Github xcaddy](https://github.com/caddyserver/xcaddy/releases)

Puis générer votre binaire caddy avec au moins ces 2 modules.
```shell
# génère un unique fichier binaire caddy dans votre répertoire courant
xcaddy build \
  --with github.com/dunglas/mercure/caddy \
  --with github.com/dunglas/vulcain/caddy

# on autorise caddy à utiliser les ports privilégiés
sudo setcap cap_net_bind_service=+ep ./caddy

sudo mv caddy /usr/local/bin

# créer le certificat racine
caddy trust
```

