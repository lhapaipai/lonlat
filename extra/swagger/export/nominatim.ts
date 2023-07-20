export type APISchemas = {
  Format: "xml" | "json" | "jsonv2" | "geojson" | "geocodejson"
  SearchFeature: {
    /* @example Feature */
    type?: string
    properties?: APISchemas["SearchProperties"]
    bbox?: APISchemas["BBox"]
    geometry?:
      | APISchemas["Point"]
      | APISchemas["LineString"]
      | APISchemas["Polygon"]
  }
  SearchProperties: {
    /* @example 298248090 */
    place_id?: number
    /* @example relation */
    osm_type?: "relation"
    /* @example 104744 */
    osm_id?: number
    /* @example Saint-Gervais-les-Bains, Bonneville, Haute-Savoie, Auvergne-Rhône-Alpes, France métropolitaine, 74170, France */
    display_name?: string
    /* @example 16 */
    place_rank?: number
    /* @example boundary */
    category?: string
    /* @example administrative */
    type?: string
    /* @example 0.8145987538280018 */
    importance?: number
    /* @example https://nominatim.openstreetmap.org/ui/mapicons/poi_boundary_administrative.p.20.png */
    icon?: string
    address?: APISchemas["Address"]
  }
  ReverseFeature: {
    /* @example Feature */
    type?: string
    properties?: APISchemas["ReverseProperties"]
    bbox?: APISchemas["BBox"]
    geometry?:
      | APISchemas["Point"]
      | APISchemas["LineString"]
      | APISchemas["Polygon"]
  }
  ReverseProperties: { place_id?: number }
  LookupFeature: {
    /* @example Feature */
    type?: string
    properties?: APISchemas["LookupProperties"]
    bbox?: APISchemas["BBox"]
    geometry?:
      | APISchemas["Point"]
      | APISchemas["LineString"]
      | APISchemas["Polygon"]
  }
  LookupProperties: { place_id?: number }
  Status: {}
  Details: {}
  Address: {
    /* @example Saint-Gervais-les-Bains */
    village?: string
    /* @example Bonneville */
    municipality?: string
    /* @example Haute-Savoie */
    county?: string
    /* @example FR-74 */
    "ISO3166-2-lvl6"?: string
    /* @example Auvergne-Rhône-Alpes */
    state?: string
    /* @example FR-ARA */
    "ISO3166-2-lvl4"?: string
    /* @example France métropolitaine */
    region?: string
    /* @example 74170 */
    postcode?: string
    /* @example France */
    country?: string
    /* @example fr */
    country_code?: string
  }
  BBox: Array<number>
  /* GeoJSon fundamental geometry construct. A position is an array of numbers. There MUST be two or more elements. The first two elements are longitude and latitude, or easting and northing, precisely in that order and using decimal numbers. Altitude or elevation MAY be included as an optional third element. Implementations SHOULD NOT extend positions beyond three elements because the semantics of extra elements are unspecified and ambiguous. Historically, some implementations have used a fourth element to carry a linear referencing measure (sometimes denoted as "M") or a numerical timestamp, but in most situations a parser will not be able to properly interpret these values. The interpretation and meaning of additional elements is beyond the scope of this specification, and additional elements MAY be ignored by parsers. */
  Position: Array<number>
  /* GeoJSon fundamental geometry construct, array of two or more positions.
   */
  LineStringCoordinates: Array<APISchemas["Position"]>
  /* A linear ring is a closed LineString with four or more positions. The first and last positions are equivalent, and they MUST contain identical values; their representation SHOULD also be identical. A linear ring is the boundary of a surface or the boundary of a hole in a surface. A linear ring MUST follow the right-hand rule with respect to the area it bounds, i.e., exterior rings are counterclockwise, and holes are clockwise. */
  LinearRing: Array<APISchemas["Position"]>
  /* GeoJSon geometry */
  Point: { type: "Point"; coordinates: APISchemas["Position"] }
  /* GeoJSon geometry */
  MultiPoint: { coordinates: Array<APISchemas["Position"]> }
  /* GeoJSon geometry */
  LineString: { coordinates: APISchemas["LineStringCoordinates"] }
  /* GeoJSon geometry */
  MultiLineString: { coordinates: Array<APISchemas["LineStringCoordinates"]> }
  /* GeoJSon geometry */
  Polygon: { coordinates: Array<APISchemas["LinearRing"]> }
  /* GeoJSon geometry */
  MultiPolygon: { coordinates: Array<Array<APISchemas["LinearRing"]>> }
}

export type APIEndpoints = {
  "/search": {
    responses: { get: null }
    requests: {
      method?: "get"
      query?: {
        q?: string
        street?: string
        city?: string
        county?: string
        state?: string
        country?: string
        postalcode?: string
        format?: APISchemas["Format"]
        json_callback?: string
        addressdetails?: "0" | "1"
        extratags?: "0" | "1"
        namedetails?: "0" | "1"
        "accept-language"?: string
        countrycodes?: string
        exclude_place_ids?: string
        limit?: number
        viewbox?: string
        bounded?: "0" | "1"
        polygon_geojson?: "0" | "1"
        polygon_kml?: "0" | "1"
        polygon_svg?: "0" | "1"
        polygon_text?: "0" | "1"
        polygon_threshold?: number
        email?: string
        dedupe?: "0" | "1"
        debug?: "0" | "1"
      }
    }
  }
  "/reverse": {
    responses: { get: null }
    requests: {
      method?: "get"
      query: {
        lat: number
        lon: number
        format?: APISchemas["Format"]
        json_callback?: string
        addressdetails?: "0" | "1"
        extratags?: "0" | "1"
        namedetails?: "0" | "1"
        "accept-language"?: string
        zoom?: number
        polygon_geojson?: "0" | "1"
        polygon_kml?: "0" | "1"
        polygon_svg?: "0" | "1"
        polygon_text?: "0" | "1"
        polygon_threshold?: number
        email?: string
        debug?: "0" | "1"
      }
    }
  }
  "/lookup": {
    responses: { get: null }
    requests: {
      method?: "get"
      query: {
        osm_ids: number
        format?: APISchemas["Format"]
        json_callback?: string
        addressdetails?: "0" | "1"
        extratags?: "0" | "1"
        namedetails?: "0" | "1"
        "accept-language"?: string
        polygon_geojson?: "0" | "1"
        polygon_kml?: "0" | "1"
        polygon_svg?: "0" | "1"
        polygon_text?: "0" | "1"
        polygon_threshold?: number
        email?: string
        debug?: "0" | "1"
      }
    }
  }
  "/status": {
    responses: { get: null }
    requests: { method?: "get"; query?: { format?: "text" | "json" } }
  }
  "/deletable": { responses: { get: null }; requests: { method?: "get" } }
  "/polygons": { responses: { get: null }; requests: { method?: "get" } }
  "/details": {
    responses: { get: null }
    requests: {
      method?: "get"
      query: {
        osmtype: "N" | "W" | "R"
        osmid: number
        class?: string
        place_id?: number
        json_callback?: string
        pretty?: "0" | "1"
        addressdetails?: "0" | "1"
        keywords?: "0" | "1"
        linkedplaces?: "0" | "1"
        hierarchy?: "0" | "1"
        group_hierarchy?: "0" | "1"
        polygon_geojson?: "0" | "1"
        "accept-language"?: string
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
