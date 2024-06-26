/**
 * maxZoom: 20
 */
export const swissOrthophotoURL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
  (a) =>
    `https://wmts${a}.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg`,
);

/**
 * maxZoom: 29
 */
export const swissDefaultURL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
  (a) =>
    `https://wmts${a}.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg`,
);

/**
 * maxZoom: 18
 */
export const swissScan25URL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
  (a) =>
    `https://wmts${a}.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe-pk25.noscale/default/current/3857/{z}/{x}/{y}.jpeg`,
);
