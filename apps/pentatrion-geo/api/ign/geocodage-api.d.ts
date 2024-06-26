import { FeatureCollection, Geometry, Point, Polygon } from "geojson";

export type APISchemas = {
  GeocodeRequest: {
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

  ReverseRequest: {
    searchgeom?: string;
    lon: number;
    lat: number;
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

  AddressProperties: {
    /* Libellé complet de l'adresse */
    label: string;
    id: string;
    postcode: APISchemas["PostalCode"];
    /* Commune de l'adresse */
    city: string;
    /* Arrondissement de l'adresse */
    district: string;
    /* Rue de l'adresse */
    street: string;
    housenumber: string;
    citycode: APISchemas["InseeCode"];
    /* Longitude de l'adresse */
    x: number;
    /* Latitude de l'adresse */
    y: number;
    score: number;
    _score: number;
    name: string;
    type: "housenumber" | "street" | "locality" | "municipality";

    /* Rétro-compatibilité */
    _type: "address";
    context: string;
    importance: number;
  };
  AddressReverseProperties: APISchemas["AddressProperties"] & {
    distance: number;
  };

  ParcelProperties: {
    /* Identifiant de la parcelle */
    id: string;
    /* Code du département */
    departmentcode: string;
    /* Code de la commune */
    municipalitycode: string;
    /* Nom de la commune */
    city: string;
    /* Code de l'ancienne commune */
    oldmunicipalitycode: string;
    /* Code insee de l'arrondissement */
    districtcode: string;
    /* Section cadastrale */
    section: string;
    /* Numéro cadastral */
    number: string;
    /* Feuille cadastrale */
    sheet: string;
    truegeometry: Polygon;
    _score: number;
    _type: "parcel";
  };

  ParcelReverseProperties: APISchemas["ParcelProperties"] & {
    distance: number;
  };

  PoiProperties: {
    /* Libellé du toponyme */
    toponym: string;
    postcode: Array<APISchemas["PostalCode"]>;
    citycode: Array<APISchemas["InseeCode"]>;
    city: Array<string>;
    category: APISchemas["PoiType"];
    extrafields: {};
    truegeometry: Geometry;
    _score: number;
    _type: "poi";
  };

  PoiReverseProperties: APISchemas["PoiProperties"] & {
    distance: number;
  };

  PoiType: Array<string>;
  PostalCode: string;
  InseeCode: string;
  Index: "address" | "poi" | "parcel";
  HouseNumberInfos: {
    date: string;
    kind: APISchemas["AddressPositionKing"];
    source: string;
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
  "/geocodage/search": {
    responses: {
      get:
        | FeatureCollection<Point, APISchemas["AddressProperties"]>
        | FeatureCollection<Point, APISchemas["PoiProperties"]>
        | FeatureCollection<Point, APISchemas["ParcelProperties"]>;
    };
    requests: {
      method?: "get";
      query: APISchemas["GeocodeRequest"];
    };
  };
  "/geocodage/search?index=address": {
    responses: {
      get: FeatureCollection<Point, APISchemas["AddressProperties"]>;
    };
    requests: {
      method?: "get";
      query: APISchemas["GeocodeRequest"];
    };
  };
  "/geocodage/reverse": {
    responses: {
      get:
        | FeatureCollection<Point, APISchemas["AddressReverseProperties"]>
        | FeatureCollection<Point, APISchemas["PoiReverseProperties"]>
        | FeatureCollection<Point, APISchemas["ParcelReverseProperties"]>;
    };
    requests: {
      method?: "get";
      query: APISchemas["ReverseRequest"];
    };
  };
  "/geocodage/reverse?index=address": {
    responses: {
      get: FeatureCollection<Point, APISchemas["AddressReverseProperties"]>;
    };
    requests: {
      method?: "get";
      query: APISchemas["ReverseRequest"];
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
