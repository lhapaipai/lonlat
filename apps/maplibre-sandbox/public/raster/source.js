const IGN_KEY = "qrl6tau63cxrevja7t4uval5";

function ignLayer(key, layer, style, format) {
  return `https://wxs.ign.fr/${key}/wmts?layer=${layer}&style=${style}&tilematrixset=PM&Service=WMTS&Request=GetTile&Version=1.0.0&Format=${format}&TileMatrix={z}&TileCol={x}&TileRow={y}`;
}

let sources = {
  osm: {
    type: "raster",
    tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution: "OpenStreetMap Contributors",
    maxzoom: 19,
  },

  terrainTerrariumSource: {
    type: "raster-dem",
    tiles: ["	https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"],
    encoding: "terrarium",
    tileSize: 256,
  },
  terrainMapTilerSource: {
    type: "raster-dem",
    url: "https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=5MBwnNxTfGUDJh3LabgI",
    tileSize: 256,
  },
  hillShadedFromTerrain: {
    type: "raster-dem",
    url: "https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=5MBwnNxTfGUDJh3LabgI",
    tileSize: 256,
  },
  hillshadeSource: {
    // ne fonctionne pas
    type: "raster-dem",
    url: "https://api.maptiler.com/tiles/hillshade/tiles.json?key=5MBwnNxTfGUDJh3LabgI",
    tileSize: 256,
  },
};

// IGN

/*
  Ressources WMTS servies par l'ign avec la clé API `essentiels`

  clef: essentiels
  https://wxs.ign.fr/essentiels/geoportail/wmts?SERVICE=WMTS&REQUEST=GetCapabilities


  GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2 (image/png)
    -> Cartographie multi-échelles sur le territoire national, issue des bases de données vecteur de l’IGN, mis à jour régulièrement et réalisée selon un processus entièrement automatisé.
  ORTHOIMAGERY.ORTHOPHOTOS (image/jpeg)
    -> Photographies aériennes
  CADASTRALPARCELS.PARCELLAIRE_EXPRESS (image/png)
    -> Plan cadastral informatisé vecteur de la DGFIP.
      STYLE=normal 	Données brutes sans changement de palette
      déprécié STYLE=bdparcellaire_o 	Orange sur fond transparent
      déprécié STYLE=bdparcellaire_b B 	Blanc sur fond transparent
      déprécié STYLE=bdparcellaire 	Tracé noir sur fond transparent
 */
const ignEssentielsSources = {
  ignCadastre: {
    type: "raster",
    tiles: [
      ignLayer(
        "essentiels",
        "CADASTRALPARCELS.PARCELLAIRE_EXPRESS",
        "bdparcellaire",
        "image%2Fpng",
      ),
    ],
    tileSize: 256,
    attribution: '© <a target="_blank" href="https://www.geoportail.gouv.fr/">IGN</a>',
    maxzoom: 20,
  },
  ignExpress: {
    type: "raster",
    tiles: [ignLayer("essentiels", "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2", "normal", "image%2Fpng")],
    tileSize: 256,
    attribution: '© <a target="_blank" href="https://www.geoportail.gouv.fr/">IGN</a>',
    maxzoom: 19,
  },
  ignSatellite: {
    type: "raster",
    tiles: [ignLayer("essentiels", "ORTHOIMAGERY.ORTHOPHOTOS", "normal", "image%2Fjpeg")],
    tileSize: 256,
    attribution: '© <a target="_blank" href="https://www.geoportail.gouv.fr/">IGN</a>',
    maxzoom: 19,
  },
};

/* Ressources Tuiles vectorielles servies par Essentiels
  ADMIN_EXPRESS (application/x-protobuf)
    -> Limites administratives des collectivités territoriales. Régions, départements, cantons, communes, arrondissements (pour Paris, Lyon et Marseille) et établissements publics de coopération intercommunale (EPCI).
  PLAN.IGN (application/x-protobuf)
    ->

    il est possible de voir les styles associés
    https://geoservices.ign.fr/documentation/services/api-et-services-ogc/tuiles-vectorielles-tmswmts/styles

    -> attention pour les sources il convient de forcer le scheme à xyz (ce n'est pas tms)
    */
const ignEssentielsVector = {
  ignPlan: {
    type: "vector",
    url: "https://wxs.ign.fr/essentiels/geoportail/tms/1.0.0/PLAN.IGN/metadata.json/",
  },
};
/*
  Ressources WMTS servies par l'ign et nécessitant une clé API (scans)
  Les ressources ci-dessous sont délivrées par le service accessible sur l’URL :
  Elles sont accessibles après avoir créé une clé API sur le site des géoservices de l'IGN

  clef : qrl6tau63cxrevja7t4uval5
  https://wxs.ign.fr/CLEF/geoportail/wmts?SERVICE=WMTS&REQUEST=GetCapabilities<!-- Le paramètre CLEF étant à remplacer par votre clé personnelle à créer/gérer dans la rubrique "Mes Clés" de votre compte de profil "particulier" ou "professionnel" sur le site Géoservices -->

  Liste des ressources disponibles :
  Nom de la ressource 	Nom technique
  Cartes IGN
    -> GEOGRAPHICALGRIDSYSTEMS.MAPS

  Cartes SCAN 25® Touristique
    -> GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR
    -> Le produit SCAN 25® version 3 est une collection d'images cartographiques numériques en couleurs, obtenues par rasterisation des données servant à la réalisation des cartes de la série au 1 : 25 000. Le produit SCAN 25® version 3 se compose d'images numériques, sans habillage ni surchage, et d'indications de géoréférencement."
  Cartes SCAN 25® Touristique Lambert-93
    -> GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR.L93
    -> La carte topographique représente avec précision le relief, symbolisé par des courbes de niveaux, ainsi que les détails du terrain : routes, sentiers, constructions, bois, arbre isolé, rivière, source... &lt;/br&gt;En France, la carte topographique de base est réalisée par l'IGN. Le SCAN 25 Touristique comprend les pictogrammes du thème tourisme de la carte de base.
  SCAN OACI
    -> GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-OACI
    Les cartes OACI (Organisation de l'aviation civile internationale) ont été conçues pour le vol à vue (VFR : Visual Flights Rules). Elles proposent des informations aéronautiques fournies par le Service de l'information aéronautique (SIA) de la Direction générale de l'aviation civile (DGAC).
  */

// documentation services IGN d'images tuilées WMTS
// https://geoservices.ign.fr/documentation/services/api-et-services-ogc/images-tuilees-wmts-ogc
const ignKeySources = {
  ignTop: {
    type: "raster",
    tiles: [ignLayer(IGN_KEY, "GEOGRAPHICALGRIDSYSTEMS.MAPS", "normal", "image%2Fjpeg")],
    tileSize: 256,
    attribution: '© <a target="_blank" href="https://www.geoportail.gouv.fr/">IGN</a>',
    maxzoom: 18,
  },
  ignTop25: {
    type: "raster",
    tiles: [ignLayer(IGN_KEY, "GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR", "normal", "image%2Fjpeg")],
    tileSize: 256,
    attribution: '© <a target="_blank" href="https://www.geoportail.gouv.fr/">IGN</a>',
    maxzoom: 16,
  },
};
