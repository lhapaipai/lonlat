export const ignToken = import.meta.env.VITE_IGN_TOKEN as string;
export const maptilerToken = import.meta.env.VITE_MAPTILER_TOKEN as string;
export const googleMapsApiToken = import.meta.env.VITE_GOOGLE_MAPS_API_TOKEN as string;
export const openRouteServiceToken = import.meta.env.VITE_OPENROUTESERVICE_TOKEN as string;
export const openRouteServiceUrl = import.meta.env.VITE_OPENROUTESERVICE_URL as string;

export const debug = !!parseInt(import.meta.env.VITE_DEBUG) as boolean;

export const inputSearchDebounceDelay = parseInt(
  import.meta.env.VITE_SEARCH_DEBOUNCE_DELAY,
) as number;
