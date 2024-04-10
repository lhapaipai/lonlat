export type APISchemas = {
  GeocodeResponse: APISchemas["Address"] | APISchemas["Poi"] | APISchemas["Parcel"];
  GeocodeReverseResponse:
    | APISchemas["AddressReverse"]
    | APISchemas["PoiReverse"]
    | APISchemas["ParcelReverse"];
  Parcel: {
    /* @example Feature */
    type?: string;
    properties?: APISchemas["ParcelProperties"];
    geometry?: APISchemas["GeometryPoint"];
  };
  /* @example [object Object] */
  ParcelProperties: {
    /* Identifiant de la parcelle */
    id?: string;
    /* Code du département */
    departmentcode?: string;
    /* Code de la commune */
    municipalitycode?: string;
    /* Nom de la commune */
    city?: string;
    /* Code de l'ancienne commune */
    oldmunicipalitycode?: string;
    /* Code insee de l'arrondissement */
    districtcode?: string;
    /* Section cadastrale */
    section?: string;
    /* Numéro cadastral */
    number?: string;
    /* Feuille cadastrale */
    sheet?: string;
    truegeometry?: APISchemas["GeometryPolygon"];
    _score?: number;
    _type?: "parcel";
  };
  ParcelReverse: {
    /* @example Feature */
    type?: string;
    properties?: APISchemas["ParcelReverseProperties"];
    geometry?: APISchemas["GeometryPoint"];
  };
  /* @example [object Object] */
  ParcelReverseProperties: {
    /* Identifiant de la parcelle */
    id?: string;
    /* Code du département */
    departmentcode?: string;
    /* Code de la commune */
    municipalitycode?: string;
    /* Nom de la commune */
    city?: string;
    /* Code de l'ancienne commune */
    oldmunicipalitycode?: string;
    /* Code insee de l'arrondissement */
    districtcode?: string;
    /* Section cadastrale */
    section?: string;
    /* Numéro cadastral */
    number?: string;
    /* Feuille cadastrale */
    sheet?: string;
    truegeometry?: APISchemas["GeometryPolygon"];
    _score?: number;
    _type?: "parcel";
    distance?: number;
  };
  Address: {
    /* @example Feature */
    type?: string;
    properties?: APISchemas["AddressProperties"];
    geometry?: APISchemas["GeometryPoint"];
  };
  /* @example [object Object] */
  AddressProperties: {
    /* Libellé complet de l'adresse */
    label?: string;
    id?: string;
    postcode?: APISchemas["PostalCode"];
    /* Commune de l'adresse */
    city?: string;
    /* Arrondissement de l'adresse */
    district?: string;
    /* Rue de l'adresse */
    street?: string;
    housenumber?: string;
    citycode?: APISchemas["InseeCode"];
    /* Longitude de l'adresse */
    x?: number;
    /* Latitude de l'adresse */
    y?: number;
    score?: number;
    _score?: number;
    name?: string;
    type?: "housenumber" | "street" | "locality" | "municipality";
    /* Rétro-compatibilité */
    _type?: "address";
    context?: string;
    importance?: number;
  };
  AddressReverse: {
    /* @example Feature */
    type?: string;
    properties?: APISchemas["AddressReverseProperties"];
    geometry?: APISchemas["GeometryPoint"];
  };
  /* @example [object Object] */
  AddressReverseProperties: {
    /* Libellé complet de l'adresse */
    label?: string;
    id?: string;
    postcode?: APISchemas["PostalCode"];
    /* Commune de l'adresse */
    city?: string;
    /* Arrondissement de l'adresse */
    district?: string;
    /* Rue de l'adresse */
    street?: string;
    housenumber?: string;
    citycode?: APISchemas["InseeCode"];
    /* Longitude de l'adresse */
    x?: number;
    /* Latitude de l'adresse */
    y?: number;
    score?: number;
    _score?: number;
    name?: string;
    type?: "housenumber" | "street" | "locality" | "municipality";
    /* Rétro-compatibilité */
    _type?: "address";
    context?: string;
    importance?: number;
    distance?: number;
  };
  Poi: {
    /* @example Feature */
    type?: string;
    properties?: APISchemas["PoiProperties"];
    geometry?: APISchemas["GeometryPoint"];
  };
  /* @example [object Object] */
  PoiProperties: {
    /* Libellé du toponyme */
    toponym?: string;
    postcode?: Array<APISchemas["PostalCode"]>;
    citycode?: Array<APISchemas["InseeCode"]>;
    city?: Array<string>;
    category?: APISchemas["PoiType"];
    extrafields?: {};
    truegeometry?: APISchemas["Geometry"];
    _score?: number;
    _type?: "poi";
  };
  PoiReverse: {
    /* @example Feature */
    type?: string;
    properties?: APISchemas["PoiReverseProperties"];
    geometry?: APISchemas["GeometryPoint"];
  };
  /* @example [object Object] */
  PoiReverseProperties: {
    /* Libellé du toponyme */
    toponym?: string;
    postcode?: Array<APISchemas["PostalCode"]>;
    citycode?: Array<APISchemas["InseeCode"]>;
    city?: Array<string>;
    category?: APISchemas["PoiType"];
    extrafields?: {};
    truegeometry?: APISchemas["Geometry"];
    _score?: number;
    _type?: "poi";
    distance?: number;
  };
  PoiType: Array<string>;
  /* Code postal */
  PostalCode: string;
  /* Code INSEE */
  InseeCode: string;
  /* @example [object Object] */
  Geometry: { type?: APISchemas["GeometryType"]; coordinates?: Array<number> };
  /* @example [object Object] */
  GeometryPoint: { type?: "Point"; coordinates?: Array<number> };
  /* @example [object Object] */
  GeometryCircle: {
    type?: "Circle";
    coordinates?: Array<number>;
    radius?: number;
  };
  /* @example [object Object] */
  GeometryLineString: { type?: "LineString"; coordinates?: Array<number> };
  /* @example [object Object] */
  GeometryPolygon: { type?: "Polygon"; coordinates?: Array<number> };
  /* @example [object Object] */
  GeometryMultiPolygon: { type?: "MultiPolygon"; coordinates?: Array<number> };
  GeometryType: "Point" | "MultiPolygon" | "LineString";
  Index: "address" | "poi" | "parcel";
  HouseNumberInfos: {
    date?: string;
    kind?: APISchemas["AddressPositionKing"];
    source?: string;
  };
  AddressPositionKing: Array<
    | "entrance"
    | "building"
    | "staircase"
    | "unit"
    | "parcel"
    | "segment"
    | "utility"
    | "area"
    | "postal"
    | "unknown"
  >;
};

export type APIEndpoints = {
  "/search": {
    responses: {
      get: {
        /* @example FeatureCollection */
        type?: string;
        features?: Array<APISchemas["GeocodeResponse"]>;
      };
    };
    requests: {
      method?: "get";
      query: {
        q: string;
        index?: APISchemas["Index"];
        limit?: number;
        lat?: number;
        lon?: number;
        returntruegeometry?: boolean;
        postcode?: APISchemas["PostalCode"];
        citycode?: APISchemas["InseeCode"];
        type?: "housenumber" | "street" | "locality" | "municipality";
        city?: string;
        category?: string;
        departmentcode?: string;
        municipalitycode?: string;
        oldmunicipalitycode?: string;
        districtcode?: string;
        section?: string;
        number?: string;
        sheet?: string;
      };
    };
  };
  "/reverse": {
    responses: {
      get: {
        /* @example FeatureCollection */
        type?: string;
        features?: Array<APISchemas["GeocodeReverseResponse"]>;
      };
    };
    requests: {
      method?: "get";
      query?: {
        searchgeom?: string;
        lon?: number;
        lat?: number;
        index?: APISchemas["Index"];
        limit?: number;
        returntruegeometry?: boolean;
        postcode?: APISchemas["PostalCode"];
        citycode?: APISchemas["InseeCode"];
        type?: "housenumber" | "street" | "locality" | "municipality";
        city?: string;
        category?: string;
        departmentcode?: string;
        municipalitycode?: string;
        oldmunicipalitycode?: string;
        districtcode?: string;
        section?: string;
        number?: string;
        sheet?: string;
      };
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
