export type APISchemas = {
  Getcapabilities: {
    info?: { name?: string; url?: string; description?: string }
    api?: {
      /* @example rest */
      name?: string
      /* @example 0.0.0 */
      version?: string
    }
    operations?: Array<{
      id?: string
      description?: string
      url?: string
      methods?: Array<"GET" | "POST" | "PUT" | "DELETE">
      parameters?: Array<{
        name?: string
        in?: string
        description?: string
        required?: boolean
        schema?: { type?: string; example?: string }
        example?: string
      }>
    }>
    indexes?: Array<{
      id?: string
      description?: string
      fields?: Array<{
        name?: string
        description?: string
        type?: string
        queryable?: boolean
        filter?: boolean
        values?: Array<unknown>
      }>
    }>
  }
  Response: { status: string; results: Array<APISchemas["Address"]> }
  Address: {
    country: string
    city: string
    /* Format: float */
    x: number
    /* Format: float */
    y: number
    zipcode: string
    street: string
    /* Format: int32 */
    classification: number
    kind: string
    fulltext: string
  }
  Error: { status: string; results: Array<{}> }
}

export type APIEndpoints = {
  "/getCapabilities": {
    responses: { get: APISchemas["Getcapabilities"] }
    requests: { method?: "get" }
  }
  "/": {
    responses: { get: APISchemas["Response"] }
    requests: {
      method?: "get"
      query: {
        text: string
        terr?: "METROPOLE" | "DOMTOM" | "75" | "75013" | "93160,97,77300"
        poiType?: string
        lonlat?: string
        type?:
          | "PositionOfInterest"
          | "StreetAddress"
          | "PositionOfInterest,StreetAddress"
        maximumResponses?: number
        bbox?: string
      }
    }
  }
}

export type APIPaths = keyof APIEndpoints

export type APIRequests<T extends APIPaths> = APIEndpoints[T]["requests"]

export type APIMethods<T extends APIPaths> = NonNullable<
  APIRequests<T>["method"]
>

export type APIRequest<T extends APIPaths, M extends APIMethods<T>> = Omit<
  {
    [MM in APIMethods<T>]: APIRequests<T> & { method: MM }
  }[M],
  "method"
> & { method?: M }

type DefaultToGet<T extends string | undefined> = T extends string ? T : "get"

export type APIResponse<
  T extends APIPaths,
  M extends string | undefined
> = DefaultToGet<M> extends keyof APIEndpoints[T]["responses"]
  ? APIEndpoints[T]["responses"][DefaultToGet<M>]
  : never
