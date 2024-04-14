export type APISchemas = {
  point: string;
  coordinates: Array<APISchemas["point"]>;
  constraint: {
    constraintType?: "banned" | "preferred" | "unpreferred";
    key?: string;
    operator?: string;
    value?: string;
    threshold?: { key?: string; operator?: string; value?: string };
  };
  constraintIso: {
    constraintType?: "banned";
    key?: string;
    operator?: string;
    value?: string;
  };
  /* @example [object Object] */
  routeBody: {
    resource?: string;
    start?: APISchemas["point"];
    end?: APISchemas["point"];
    intermediates?: APISchemas["coordinates"];
    profile?: string;
    optimization?: string;
    constraints?: Array<APISchemas["constraint"]>;
    getSteps?: boolean;
    geometryFormat?: "geojson" | "polyline";
    getBbox?: boolean;
    distanceUnit?: string;
    timeUnit?: string;
    crs?: string;
    waysAttributes?: Array<string>;
  };
  errorResponse: { error?: { errorType?: string; message?: string } };
  itineraire: {
    start?: APISchemas["point"];
    end?: APISchemas["point"];
    geometry?: string;
    /* Format: float */
    duration?: number;
    /* Format: float */
    distance?: number;
    bbox?: string;
    /* Format: date */
    departure?: string;
    /* Format: date */
    arrival?: string;
    resource?: string;
    profile?: string;
    optimization?: string;
    crs?: string;
    constraints?: Array<APISchemas["constraint"]>;
    alerts?: Array<{ message?: string }>;
    portions?: Array<{
      start?: APISchemas["point"];
      end?: APISchemas["point"];
      /* Format: float */
      duration?: number;
      /* Format: float */
      distance?: number;
      bbox?: string;
      /* Format: date */
      departure?: string;
      /* Format: date */
      arrival?: string;
      steps?: Array<{
        id?: string;
        attributs?: Array<{ key?: string; value?: string }>;
        /* Format: float */
        duration?: number;
        /* Format: float */
        distance?: number;
        geometry?: string;
        instructions?: Array<{ message?: string }>;
        alerts?: Array<{ message?: string }>;
      }>;
    }>;
  };
  isochrone: {
    point?: APISchemas["point"];
    resource?: string;
    costType?: string;
    costValue?: number;
    profile?: string;
    direction?: string;
    constraints?: APISchemas["constraintIso"];
    crs?: string;
    geometry?: string;
    /* Format: date */
    departure?: string;
    /* Format: date */
    arrival?: string;
    alerts?: Array<{ message?: string }>;
  };
  /* @example [object Object] */
  isochroneBody: {
    point?: APISchemas["point"];
    resource?: string;
    costType?: "temps" | "distance";
    /* Format: float */
    costValue?: number;
    profile?: string;
    direction?: "départ" | "arrivé";
    constraints?: Array<APISchemas["constraintIso"]>;
    geometryFormat?: "geojson" | "polyline";
    distanceUnit?: string;
    timeUnit?: string;
    crs?: string;
  };
};

export type APIEndpoints = {
  "/route": {
    responses: { get: APISchemas["itineraire"]; post: APISchemas["itineraire"] };
    requests:
      | {
          method?: "get";
          query: {
            resource: string;
            start: APISchemas["point"];
            end: APISchemas["point"];
            intermediates?: APISchemas["coordinates"];
            profile?: string;
            optimization?: string;
            geometryFormat?: "geojson" | "polyline";
            constraints?: Array<string>;
            getSteps?: boolean;
            getBbox?: boolean;
            distanceUnit?: string;
            timeUnit?: string;
            crs?: string;
            waysAttributes?: Array<string>;
          };
        }
      | { method: "post"; body: APISchemas["routeBody"] };
  };
  "/isochrone": {
    responses: { get: APISchemas["isochrone"]; post: APISchemas["isochrone"] };
    requests:
      | {
          method?: "get";
          query: {};
        }
      | { method: "post"; body: APISchemas["isochroneBody"] };
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
