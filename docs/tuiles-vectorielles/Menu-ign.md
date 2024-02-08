https://geoservices.ign.fr/documentation
.
├── Services
│   ├── **Services Géoplateforme** Nouveaux services tout neufs !!
│   │   ├── Service Géoplateforme de calcul altimétrique
│   │   ├── Service Géoplateforme de calcul d'itinéraire et d'isochrone/isodistance
│   │   ├── Service Géoplateforme de découverte des métadonnées
│   │   ├── Service Géoplateforme de recherche
│   │   ├── Service Géoplateforme de téléchargement
│   │   ├── Services Géoplateforme de diffusion pour les images Tuilées WMTS !!
│   │   ├── Service Géoplateforme de géocodage
│   │   └── Service Géoplateforme d’autocomplétion
│   ├── Disponibilité
│   ├── **API et services OGC** La majorité des services qu'on pourra exploiter
│   │   ├── API Carto (REST)
│   │   ├── ~~Calcul altimétrique (REST)~~
│   │   ├── ~~Calcul d'isochrones - isodistances~~
│   │   ├── ~~Calcul d'itinéraires~~
│   │   ├── Données vecteur - WFS (OGC) -> voir https://geoservices.ign.fr/services-web
│   │   ├── ~~Géocodage 2.0~~
│   │   ├── ~~Images - WMS (OGC)~~ préférer les images tuilées plus bas
│   │   ├── ~~Images Tuilées - WMTS (OGC)~~ : https://geoservices.ign.fr/documentation/services/api-et-services-ogc/images-tuilees-wmts-ogc
│   │   ├── ~~Recherche Look4 (REST)~~ *service de recherche de la géoplateforme ?*
│   │   ├── Configuration locale (ex autoconfiguration) ???
│   │   ├── ~~Services de recherche CSW (OGC)~~ *service de recherche de la géoplateforme ?*
│   │   └── Tuiles vectorielles – TMS/WMTS
│   │       ├── ~~Le service~~
│   │       ├── **Connexion et requêtes** : https://geoservices.ign.fr/documentation/services/api-et-services-ogc/tuiles-vectorielles-tmswmts/connexion
│   │       ├── **Styles** : https://geoservices.ign.fr/documentation/services/api-et-services-ogc/tuiles-vectorielles-tmswmts/styles
│   │       └── ~~Tutoriel vidéo~~
│   ├── Utilisation Web : pas utile pour MapLibre
│   │   ├── Affichage WMTS
│   │   │   ├── CesiumJS et WMTS
│   │   │   ├── GMaps et WMTS
│   │   │   ├── Leaflet et WMTS
│   │   │   ├── OpenLayers et WMTS
│   │   │   └── iTowns et WMTS
│   │   ├── Bibliothèque d'accès : librairie créée par l'ign : https://github.com/IGNF/geoportal-access-lib/tree/develop
│   │   ├── Exemples
│   │   │   ├── Bibiothèque d’accès : Géocodage simple
│   │   │   ├── ... _plein d'exemples mais aucun avec Maplibre_
│   │   │   └── SDK Géoportail : utilisation des événements (mapLoaded)
│   │   ├── Extension pour Leaflet
│   │   ├── Extension pour OpenLayers
│   │   ├── Extension pour iTowns
│   │   └── SDK
│   │       ├── SDK 2D
│   │       └── SDK 3D
│   ├── Utilisation SIG
│   │   ├── Tutoriel ArcGis
│   │   │   ├── GPF - Utiliser les données libres en flux WMS/WMTS
│   │   │   └── GPF - Utiliser les données non libres en flux WMS/WMTS
│   │   ├── Tutoriel FME
│   │   ├── Tutoriel GEO Technologies
│   │   ├── Tutoriel GeoConcept
│   │   ├── Tutoriel IGNMap
│   │   ├── Tutoriel Maputnik
│   │   ├── Tutoriel OGR
│   │   └── Tutoriel QGIS
│   │       ├── GPF - Utiliser les données libres IGN en flux WMS/WMTS
│   │       ├── GPF - Utiliser les données non libres en flux WMS/WMTS
│   │       ├── Utiliser les données IGN en flux tuiles vectorielles
│   │       └── Utiliser les données IGN en flux WFS
│   ├── Utilisation mobile
│   ├── Les autres API IGN
│   └── Services dépréciés
│       ├── Autocomplétion (REST)
│       ├── Géocodage (OGC)
│       ├── Géocodage Bêta 1.0
│       │   ├── Documentation du géocodage
│       │   └── Documentation technique de l'API de géocodage
│       ├── Géocodage inverse (OGC)
│       ├── Isochrones - Isodistances dépréciés
│       └── Itinéraires dépréciés
├── Données -> **permet de récupérer du contenu mais pas utilisable directement avec maplibre**
│   ├── Cartes
│   │   ├── Plan IGN
│   │   ├── SCAN 25®
│   │   ├── SCAN 100®
│   │   ├── SCAN OACI
│   │   ├── SCAN 50® Mayotte
│   │   ├── SCAN 500 Guyane
│   │   ├── SCAN 1000®
│   │   ├── SCAN Régional®
│   │   └── SCAN Historique®
│   ├── Ortho-images
│   │   ├── BD ORTHO®
│   │   │   └── Rapports de contrôle qualité
│   │   ├── BD ORTHO® Historique
│   │   ├── PCRS
│   │   └── ORTHO-SAT®
│   ├── Bases de données au format vectoriel
│   │   ├── ADMIN EXPRESS
│   │   ├── ADRESSE PREMIUM
│   │   ├── BAN PLUS
│   │   ├── BCAE
│   │   ├── BD CARTO®
│   │   ├── BD CARTO® État-major
│   │   ├── BD Forêt®
│   │   ├── BD Haie
│   │   ├── BD TOPO®
│   │   ├── BDPR
│   │   ├── Contours... IRIS®
│   │   ├── Données de géodésie et nivellement
│   │   ├── DÉBROUSSAILLEMENT
│   │   ├── EGM
│   │   ├── GEOFLA®
│   │   ├── INPE
│   │   ├── IRIS... GE
│   │   ├── OCS GE
│   │   ├── ROUTE 500®
│   │   └── RPG
│   ├── Parcellaire cadastral
│   │   ├── Parcellaire Express (PCI)
│   │   │   └── Recalage des données métiers sur la géométrie post RPCU
│   │   └── BD PARCELLAIRE®
│   └── Modèles numériques 3D
│       ├── LiDAR HD
│       │   └── FAQ
│       ├── RGE ALTI®
│       ├── BD ALTI®
│       ├── Courbes de niveau
│       ├── Modèles Numériques de Surfaces correlés
│       └── NUALID
└── Applications
