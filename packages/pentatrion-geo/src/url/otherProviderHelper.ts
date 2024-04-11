export const osmURL = ["a", "b", "c"].map(
  (a) => `https://${a}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
);

export const googleOrthophotoURL = [0, 1, 2, 3].map(
  (a) => `https://khms${a}.google.com/kh/v=969?x={x}&y={y}&z={z}`,
);

export const googleOrthophotoLabelURL = [0, 1, 2, 3].map(
  (a) => `https://mt${a}.google.com/vt/lyrs=y&hl=fr&x={x}&y={y}&z={z}&s=Ga`,
);

export const googleRoadURL = [0, 1, 2, 3].map(
  (a) => `https://mt${a}.google.com/vt/lyrs=m&hl=fr&x={x}&y={y}&z={z}&s=Ga`,
);

export const googleReliefURL = [0, 1, 2, 3].map(
  (a) => `https://mt${a}.google.com/vt/lyrs=p&hl=fr&x={x}&y={y}&z={z}&s=Ga`,
);

export const googleStreetViewURL = [0, 1, 2, 3].map(
  (a) =>
    `https://mts${a}.googleapis.com/vt?hl=en-US&lyrs=svv|cb_client:apiv3&style=40,18&x={x}&y={y}&z={z}`,
);
