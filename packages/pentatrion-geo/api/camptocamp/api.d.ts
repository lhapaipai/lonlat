/**
 * source : v6_api/c2corg_api/models/common/attributes.py
 */

/**
 * DOCUMENT: "d";
 *
 * MAP: "m";
 * USERPROFILE: "u";
 * XREPORT: "x";
 */
/**
 * r: route     -> Itinéraire
 * o: outing    -> Sortie
 * w: waypoint  -> Point de passage
 * i: image
 * b: book
 * c: article
 * a: area      -> Régions
 *
 */
export type ObjType = "d" | "a" | "c" | "i" | "m" | "o" | "r" | "u" | "w" | "b" | "x";

export type Lang = "fr" | "it" | "de" | "en" | "es" | "ca" | "eu" | "sl" | "zh";

export type WaypointType =
  | "access" // Accès routier / transports en commun
  | "base_camp" // camp de base
  | "bisse" // bisse
  | "bivouac" // bivouac
  | "camp_site" // camping
  | "canyon" // canyon
  | "cave" // grotte
  | "climbing_indoor" // S.A.E.
  | "climbing_outdoor" // site d'escalade
  | "gite" // gite
  | "hut" // refuge
  | "lake" // lac
  | "local_product" // produits locaux
  | "locality" // lieu-dit (v5: vallon)
  | "misc" // divers
  | "paragliding_landing" // attero
  | "paragliding_takeoff" // deco
  | "pass" // col
  | "shelter" // abri
  | "slackline_spot" //
  | "summit" // sommet
  | "virtual" // sur-WP virtuel
  | "waterfall" // cascade
  | "waterpoint" // point d'eau/source
  | "weather_station" // station meteo
  | "webcam"; // webcam

export type Activity =
  | "skitouring"
  | "snow_ice_mixed"
  | "mountain_climbing"
  | "rock_climbing"
  | "ice_climbing"
  | "hiking"
  | "snowshoeing"
  | "paragliding"
  | "mountain_biking"
  | "via_ferrata"
  | "slacklining";

export type GlobalRating =
  | "F"
  | "F+"
  | "PD-"
  | "PD"
  | "PD+"
  | "AD-"
  | "AD"
  | "AD+"
  | "D-"
  | "D"
  | "D+"
  | "TD-"
  | "TD"
  | "TD+"
  | "ED-"
  | "ED"
  | "ED+"
  | "ED4"
  | "ED5"
  | "ED6"
  | "ED7";

export type AreaType = "country" | "admin_limits" | "range";

/**
 * Qualité des informations saisies par les contributeurs
 */
export type QualityType = "empty" | "draft" | "medium" | "fine" | "great";

export type Orientation = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

export type APISchemas = {
  SearchRequest: {
    q: string;

    /**
     * langue. ex: fr
     */
    pl: string;

    limit?: number;
    offset?: number;

    t: ObjType;

    /**
     * permet de restreindre la recherche.
     * Utilise la projection EPSG:3857
     * ex: -1272016,4944532,2034955,6803481
     */
    bbox: string;
  };

  WaypointsRequest: {
    q?: string;
    /**
     * possibilité de saisir plusieurs types en les séparant par des virgules
     * ex: summit,pass
     */

    limit?: number;
    offset?: number;

    wtyp?: WaypointType | string;
    qa?: `${QualityType},${QualityType}`;

    /**
     * Terrain : proéminence
     */
    prom?: `${number},${number}`;

    /**
     * Terrain : altitude
     */
    walt?: `${number},${number}`;

    /**
     * langue dans laquelle a été rédigé l'article.
     * Ne signifie pas que le point est localisé dans le pays associé à la langue
     */
    l?: Lang;

    /**
     * ne renvoie que le champ dans la langue spécifiée. si aucun valeur a été spécifiée
     * pour cette langue renvoie dans la langue principale
     */
    pl?: Lang;

    /**
     * Tri par altitude
     */
    sort?: "elevation";

    /**
     * permet de restreindre la recherche.
     * Utilise la projection EPSG:3857
     * ex: -1272016,4944532,2034955,6803481 pour la france
     */
    bbox?: string;
  };

  WaypointsResponse: {
    documents: APISchemas["Waypoint"][];
    total: number;
  };

  SearchResponse: {
    waypoints: {
      documents: APISchemas["Document"][];
    };
    total: number;
  };

  Document: APISchemas["Waypoint"] | APISchemas["Route"];

  Area: {
    document_id: number;
    version: number;
    locales: APISchemas["LocaleItem"][];
    available_langs: null | Lang[];
    protected: boolean;
    type: "a";

    area_type: AreaType;
  };

  Waypoint: {
    document_id: number;
    version: number;
    locales: APISchemas["LocaleItem"][];
    available_langs: Lang[];
    protected: boolean;
    type: "w";

    areas: APISchemas["Area"][];

    waypoint_type: WaypointType;
    geometry: APISchemas["Geometry"];
    quality: QualityType;
    elevation: number;
  };

  Route: {
    document_id: number;
    version: number;
    locales: APISchemas["LocaleItem"][];
    available_langs: Lang[];
    protected: boolean;
    type: "r";

    areas: APISchemas["Area"][];

    activities: null | Activity[];
    geometry: APISchemas["Geometry"];
    quality: QualityType;
    elevation_min: number | null;
    elevation_max: number | null;
    height_diff_up: number | null;
    height_diff_down: number | null;
    height_diff_difficulties: number | null;
    orientations: Orientation[];
    global_rating: GlobalRating;
    engagement_rating: null;
    exposition_rock_rating: null;
    rock_free_rating: null;
    rock_required_rating: null;
    aid_rating: null;
    climbing_outdoor_type: null;
  };

  LocaleItem: {
    version: number;
    lang: Lang;
    title: string;
    title_prefix?: string;
    summary?: string | null;
  };

  Geometry: {
    version: number;
    /** Geojson stringifié */
    geom: string;

    has_geom_detail?: boolean;
  };
};

export type APIEndpoints = {
  "/waypoints": {
    requests: {
      method?: "get";
      query: APISchemas["WaypointsRequest"];
    };
    responses: {
      get: APISchemas["WaypointsResponse"];
    };
  };
  "/search": {
    responses: {
      get: APISchemas["SearchResponse"];
    };
    requests: {
      method?: "get";
      query: APISchemas["SearchRequest"];
    };
  };
};

export type APIPaths = keyof APIEndpoints;

export type APIRequests<T extends APIPaths> = APIEndpoints[T]["requests"];

export type APIMethods<T extends APIPaths> = NonNullable<APIRequests<T>["method"]>;

export type APIRequest<T extends APIPaths, M extends APIMethods<T>> = Omit<
  {
    [MM in APIMethods<T>]: APIRequests<T> & { method: MM };
  }[M],
  "method"
> & { method?: M };

type DefaultToGet<T extends string | undefined> = T extends string ? T : "get";

export type APIResponse<T extends APIPaths, M extends string | undefined> =
  DefaultToGet<M> extends keyof APIEndpoints[T]["responses"]
    ? APIEndpoints[T]["responses"][DefaultToGet<M>]
    : never;
