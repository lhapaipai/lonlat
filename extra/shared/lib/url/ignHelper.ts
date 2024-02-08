// attributions : © <a target="_blank" href="https://www.geoportail.gouv.fr/">ign</a>

import { ignUrlBuilder } from "./ignUrlBuilder";

/**
 * maxZoom: 20
 */
export const getIgnCadastreURL = () => {
  return new ignUrlBuilder("CADASTRALPARCELS.PARCELLAIRE_EXPRESS", false)
    .set("STYLE", "bdparcellaire")
    .set("FORMAT", "image/png")
    .setToken("essentiels")
    .getUrl();
};

/**
 * maxZoom: 18
 */
export const getIgnDefaultScanURL = (ignToken: string) => {
  return new ignUrlBuilder("GEOGRAPHICALGRIDSYSTEMS.MAPS", false).setToken(ignToken).getUrl();
};

/**
 * maxZoom 16
 */
export const getIgnScan25URL = (ignToken: string) => {
  return new ignUrlBuilder("GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR", false)
    .setToken(ignToken)
    .getUrl();
};

/**
 * maxZoom: 19
 */
export const getIgnOrthophotoURL = () => {
  return new ignUrlBuilder("ORTHOIMAGERY.ORTHOPHOTOS").getUrl();
};

export const getIgnExpressURL = () => {
  return new ignUrlBuilder("GEOGRAPHICALGRIDSYSTEMS.PLANignV2").set("FORMAT", "image/png").getUrl();
};

export const getIgnStreetsURL = (ignToken: string) => {
  return new ignUrlBuilder("GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.NIVEAUXGRIS", false)
    .setToken(ignToken)
    .set("FORMAT", "image/png")
    .getUrl();
};
