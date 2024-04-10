import { FeatureCollection, Geometry, Point, Polygon } from "geojson";

export type AddressProperties = {
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

export type AddressReverseProperties = AddressProperties & {
  distance: number;
};

export type ParcelProperties = {
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

export type ParcelReverseProperties = ParcelProperties & {
  distance: number;
};

export type PoiProperties = {
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

export type PoiReverseProperties = PoiProperties & {
  distance: number;
};

export type APISchemas = {
  GeocodeAddressResponse: FeatureCollection<Point, AddressProperties>;
  GeocodeParcelResponse: FeatureCollection<Point, ParcelProperties>;
  GeocodePoiResponse: FeatureCollection<Point, PoiProperties>;

  /* en fonction du paramètre index la réponse peut être l'un de ces 3 types. */
  GeocodeAddressReverseResponse: FeatureCollection<Point, AddressReverseProperties>;
  GeocodeParcelReverseResponse: FeatureCollection<Point, ParcelReverseProperties>;
  GeocodePoiReverseResponse: FeatureCollection<Point, PoiReverseProperties>;

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
        | APISchemas["GeocodeAddressResponse"]
        | APISchemas["GeocodePoiResponse"]
        | APISchemas["GeocodeParcelResponse"];
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
  "/geocodage/reverse": {
    responses: {
      get:
        | APISchemas["GeocodeAddressReverseResponse"]
        | APISchemas["GeocodePoiReverseResponse"]
        | APISchemas["GeocodeParcelReverseResponse"];
    };
    requests: {
      method?: "get";
      query: {
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
