// attributions : © <a target="_blank" href="https://www.geoportail.gouv.fr/">ign</a>

import { ignUrlBuilder } from "./ignUrlBuilder";

/**
 * maxZoom: 20
 */
export const getIgnCadastreURL = () => {
  return new ignUrlBuilder("CADASTRALPARCELS.PARCELLAIRE_EXPRESS", false)
    .setToken("essentiels")
    .set("STYLE", "PCI vecteur")
    .set("FORMAT", "image/png")
    .getUrl();
};

/**
 * clé pour les données scan
 * https://geoservices.ign.fr/actualites/2023-11-20-acces-donnesnonlibres-gpf
 * maxZoom: 18
 */
export const getIgnDefaultScanURL = (ignToken: string) => {
  return new ignUrlBuilder("GEOGRAPHICALGRIDSYSTEMS.MAPS").setToken(ignToken).getUrl();
};

/**
 * clé pour les données scan
 * maxZoom 16
 */
export const getIgnScan25URL = (ignToken: string) => {
  return new ignUrlBuilder("GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR").setToken(ignToken).getUrl();
};

/**
 * maxZoom: 19
 */
export const getIgnOrthophotoURL = () => {
  return new ignUrlBuilder("ORTHOIMAGERY.ORTHOPHOTOS", false).getUrl();
};

export const getIgnExpressURL = () => {
  return new ignUrlBuilder("GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2", false)
    .set("FORMAT", "image/png")
    .getUrl();
};

export const getIgnStreetsURL = () => {
  return new ignUrlBuilder("GEOGRAPHICALGRIDSYSTEMS.MAPS.BDUNI.J1", false)
    .set("FORMAT", "image/png")
    .getUrl();
};
