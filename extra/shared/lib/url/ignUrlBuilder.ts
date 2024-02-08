export type ignSearchParams = {
  SERVICE: "WMTS";
  REQUEST: "GetTile" | "GetCapabilities";
  VERSION: "1.0.0";
  TILEMATRIXSET: "PM";
  TILEMATRIX: "{z}";
  TILECOL: "{x}";
  TILEROW: "{y}";
  STYLE: "normal" | "bdparcellaire";
  FORMAT: "image/jpeg" | "image/png";
  LAYER: string;
};

export const legacyWMTSEndpoint = "https://wxs.ign.fr/{TOKEN}/geoportail/wmts";
export const geoplatformeWMTSEndpoint = "https://data.geopf.fr/wmts";

export class ignUrlBuilder {
  params: ignSearchParams = {
    SERVICE: "WMTS",
    REQUEST: "GetTile",
    VERSION: "1.0.0",
    TILEMATRIXSET: "PM",
    TILEMATRIX: "{z}",
    TILECOL: "{x}",
    TILEROW: "{y}",
    STYLE: "normal",
    FORMAT: "image/jpeg",
    LAYER: "",
  };
  isGeoplateforme = true;
  private token: string | null = null;

  constructor(layer: string, isGeoplateforme = true) {
    this.params.LAYER = layer;
    this.isGeoplateforme = isGeoplateforme;
  }

  public set<K extends keyof ignSearchParams>(key: K, value: ignSearchParams[K]) {
    this.params[key] = value;
    return this;
  }

  public setToken(token: string) {
    this.token = token;
    return this;
  }

  private getToken() {
    if (this.token !== null) {
      return this.token;
    }

    return "essentials";
  }

  public getUrl() {
    return (
      (this.isGeoplateforme
        ? geoplatformeWMTSEndpoint
        : legacyWMTSEndpoint.replace("{TOKEN}", this.getToken())) +
      "?" +
      // we can't use new URLSearchParams(this.params).toString() because
      // {x} will be urlencoded to %7Bx%7D...
      Object.entries(this.params)
        .map(([key, value]) => `${key}=${value}`)
        .join("&")
    );
  }
}
