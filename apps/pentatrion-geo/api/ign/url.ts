// attributions : © <a target="_blank" href="https://www.geoportail.gouv.fr/">ign</a>

import { urlBuilder } from "./urlBuilder";

export const dataGeoserviceUrl = "https://data.geopf.fr";
export const legacyWMTSEndpoint = "https://wxs.ign.fr/{TOKEN}/geoportail/wmts";
export const geoplatformeWMTSPrivateEndpoint =
  "https://data.geopf.fr/private/wmts";
export const geoplatformeWMTSEndpoint = "https://data.geopf.fr/wmts";

/**
 * maxZoom: 20
 */
export const getIgnCadastreURL = () => {
  return new urlBuilder("CADASTRALPARCELS.PARCELLAIRE_EXPRESS", false)
    .setToken("essentiels")
    .set("STYLE", "PCI vecteur")
    .set("FORMAT", "image/png")
    .getUrl();
};

/**
 * https://geoservices.ign.fr/actualites/2023-11-20-acces-donnesnonlibres-gpf
 * maxZoom: 18
 */
export const getIgnDefaultScanURL = (ignToken: string) => {
  return new urlBuilder("GEOGRAPHICALGRIDSYSTEMS.MAPS")
    .setToken(ignToken)
    .getUrl();
};

/**
 * maxZoom 16
 */
export const getIgnScan25URL = (ignToken: string) => {
  return new urlBuilder("GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR")
    .setToken(ignToken)
    .getUrl();
};

/**
 * maxZoom: 19
 */
export const getIgnOrthophotoURL = () => {
  return new urlBuilder("ORTHOIMAGERY.ORTHOPHOTOS").getUrl();
};

export const getIgnExpressURL = () => {
  return new urlBuilder("GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2", false)
    .set("FORMAT", "image/png")
    .getUrl();
};

export const getIgnStreetsURL = () => {
  return new urlBuilder("GEOGRAPHICALGRIDSYSTEMS.MAPS.BDUNI.J1", false)
    .set("FORMAT", "image/png")
    .getUrl();
};
