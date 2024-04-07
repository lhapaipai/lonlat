/**
 * maxZoom: 20
 */
export const getSwissOrthophotoURL = () => {
  return `https://wmts0.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg`;
  // return `https://wmts{0-9}.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg`;
};

/**
 * maxZoom: 29
 */
export const getSwissDefaultURL = () => {
  return `https://wmts0.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg`;
  // return `https://wmts{0-9}.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg`;
};

/**
 * maxZoom: 18
 */
export const getSwissScan25URL = () => {
  return `https://wmts0.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe-pk25.noscale/default/current/3857/{z}/{x}/{y}.jpeg`;
  // return `https://wmts{0-9}.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe-pk25.noscale/default/current/3857/{z}/{x}/{y}.jpeg`;
};
