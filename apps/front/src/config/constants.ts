export const ignToken = import.meta.env.VITE_IGN_TOKEN as string;
export const ignTokenLegacy = import.meta.env.VITE_IGN_TOKEN_LEGACY as string;
export const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN as string;
export const maptilerToken = import.meta.env.VITE_MAPTILER_TOKEN as string;
export const googleMapsApiToken = import.meta.env.VITE_GOOGLE_MAPS_API_TOKEN as string;

export const mapTilerBasicStyleUrl = `https://api.maptiler.com/maps/basic-v2/style.json?key=${maptilerToken}`;
export const mapTilerStreetsStyleUrl = `https://api.maptiler.com/maps/streets/style.json?key=${maptilerToken}`;
export const ignPlanStyleUrl = `/styles/ign/PLAN.IGN/standard.json`;

export const marignier = { lng: 6.498, lat: 46.089 };
