import { Feature, LineString, Point, Position } from "geojson";

type Step = {
  distance: number;
  duration: number /*
   * The [instruction](https://GIScience.github.io/openrouteservice/documentation/Instruction-Types.html) action for symbolisation purposes.
   * Format: int32
   * @example 1
   */;
  type: number /*
   * The routing instruction text for the step.
   * @example Turn right onto Berliner Straße
   */;
  instruction: string /*
   * The name of the next street.
   * @example Berliner Straße
   */;
  name: string /*
   * Only for roundabouts. Contains the number of the exit to take.
   * Format: int32
   * @example 2
   */;
  exit_number?: number /*
   * Contains the bearing of the entrance and all passed exits in a roundabout.
   * @example 10,45,60
   */;
  exit_bearings?: Array<number> /*
   * List containing the indices of the steps start- and endpoint corresponding to the *geometry*.
   * @example 45,48
   */;
  way_points: Array<number>;
  /* Maneuver object of the step */
  maneuver?: {
    /*
     * The coordinate of the point where a maneuver takes place.
     * @example 8.678962,49.407819
     */
    location?: Array<number> /*
     * The azimuth angle (in degrees) of the direction right before the maneuver.
     * Format: int32
     * @example 24
     */;
    bearing_before?: number /*
     * The azimuth angle (in degrees) of the direction right after the maneuver.
     * Format: int32
     * @example 96
     */;
    bearing_after?: number;
  };
};

type Segment = {
  distance: number;
  duration: number;

  steps: Step[];

  /**
   * Attributs ajoutés si explicitement demandé dans la requête avec "elevation"
   */
  ascent?: number;
  descent?: number;

  /**
   * attributs ajoutés si explicitement demandés dans la requête avec "attributes"
   * Contains the deviation compared to a straight line that would have the factor `1`. Double the Distance would be a `2`.
   */
  detourfactor?: number /*
   * Contains the proportion of the route in percent.
   * Format: double
   * @example 43.2
   */;
  percentage?: number /*
   * Contains the average speed of this segment in km/h.
   * Format: double
   * @example 56.3
   */;
  avgspeed?: number;
};

export type RouteProperties = {
  summary: {
    distance: number;
    duration: number;
  };
  /**
   * attributs ajoutés si explicitement demandés dans la requête avec "attributes"
   */
  ascent?: number;
  descent?: number;

  /**
   * Only if "instructions is set to true"
   */
  segments?: Segment[];
  /*
   * List containing the indices of way points corresponding to the *geometry*.
   * @example 0,23
   */
  way_points: Array<number>;
  /*
   * A bounding box which contains the entire route
   * @example 46.1336,6.4245,46.0547,6.5603
   */
  bbox?: Array<number>;
};

export type SearchProperties = {
  /** example: "polyline:8654039" */
  id: string;
  /** example: "openstreetmap:street:polyline:8654039" */
  gid: string;
  /** example: "street" */
  layer: string;

  /** example: "openstreetmap" */
  source: DataSource;
  /** example: "polyline:8654039" */
  source_id: string;

  /** example: "Impasse des Perrières" */
  name: string;
  /**
   * défini si layer est de type "street"
   *  example: "Impasse des Perrières" */
  street?: string;
  /** example: 1 */
  confidence: number;
  /** example: "exact" */
  match_type: string;
  /** example: "centroid" */
  accuracy: string;

  /** example: "France" */
  country: string;
  /** example: "whosonfirst:country:85633147" */
  country_gid: string;
  /** example: "FRA" */
  country_a: string;

  /** example: "Auvergne-Rhone-Alpes" */
  macroregion: string;
  /** example: "whosonfirst:macroregion:1108826389" */
  macroregion_gid: string;
  /** example: "AR" */
  macroregion_a: string;

  /** example: "Haute-Savoie" */
  region: string;
  /** example: "whosonfirst:region:85683227" */
  region_gid: string;
  /** example: "HS" */
  region_a: string;

  /** example: "Bonneville" */
  macrocounty: string;
  /** example: "whosonfirst:county:102065721" */
  macrocounty_gid: string;

  /** example: "Bonneville" */
  county: string;
  /** example: "whosonfirst:county:102065721" */
  county_gid: string;

  /** example: "Marignier" */
  localadmin: string;
  /** example: "whosonfirst:localadmin:404415575" */
  localadmin_gid: string;

  /** example: "Marignier" */
  locality: string;
  /** example: "whosonfirst:localadmin:404415575" */
  locality_gid: string;

  /** example: "Europe" */
  continent: string;
  /** example: "whosonfirst:continent:102191581" */
  continent_gid: string;

  /** example: "Impasse des Perrières, Marignier, France" */
  label: string;
};

type DataSource =
  | "openstreetmap"
  // short name of openstreetmap (same result)
  | "osm"
  | "openaddresses"
  | "oa"
  | "whosonfirst"
  | "wof"
  | "geonames"
  | "gn";

type DataType =
  /* places with a street address */
  | "address"
  /** points of interest, businesses, things with walls */
  | "venue"
  /** a local administrative boundary, currently only used for New York City */
  | "borough"
  /** social communities, neighbourhoods */
  | "neighbourhood"

  // to Add ?
  | "street"
  | "dependency"
  | "macrohood"
  | "microhood"
  | "postalcode"

  /** towns, hamlets, cities */
  | "locality"

  /** local administrative boundaries */
  | "localadmin"

  /**
   * official governmental area; usually bigger than a locality,
   * almost always smaller than a region
   * ex: Bonneville
   */
  | "county"
  /** a related group of counties. Mostly in Europe. */
  | "macrocounty"
  /** states and provinces (ex: Bouches-du-Rhône) */
  | "region"
  /** a related group of regions. Mostly in Europe (ex: Rhône-Alpes) */
  | "macroregion"
  /** places that issue passports, nations, nation-states */
  | "country"
  | "continent"
  | "empire"
  | "ocean"
  | "marinearea"
  | "disputed"

  /** alias for simultaneously using all administrative layers (everything except venue and address) */
  | "coarse";

export type APISchemas = {
  DirectionsRequest: {
    /*
     * The waypoints to use for the route as an array of `longitude/latitude` pairs in WGS 84 (EPSG:4326)
     * @example 6.501,46.0916,6.5025,46.0839,6.5058,46.0762
     */
    coordinates: Position[];
    /*
     * Identifiant aléatoire qui peut être passé et qui est retourné dans la réponse.
     * afin d'associer la requête à la réponse.
     */
    id?: string;

    /* Specifies the route preference */
    preference?: "fastest" | "shortest" | "recommended";

    /* Valeur par défaut : "m" */
    units?: "m" | "km" | "mi";

    /* Language for the route instructions. */
    language?: Language;
    /* une requête suffixée par /geojson doit forcément renvoyer une géométrie  */
    geometry?: true;
    /* Specifies whether to return instructions. */
    instructions?: boolean;

    instructions_format?: "html" | "text";
    /* Provides bearings of the entrance and all passed roundabout exits. Adds the `exit_bearings` array to the step object in the response.  */
    roundabout_exits?: boolean;
    /*
     * List of route attributes
     * @example avgspeed,percentage
     */
    attributes?: Array<"avgspeed" | "detourfactor" | "percentage">;
    /* Specifies whether the maneuver object is included into the step object or not.  */
    maneuvers?: boolean;
    /*
     * A list of maximum distances (measured in metres) that limit the search of nearby road segments to every given waypoint. The values must be greater than 0, the value of -1 specifies using the maximum possible search radius. The number of radiuses correspond to the number of waypoints. If only a single value is given, it will be applied to all waypoints.
     * @example 200,-1,30
     */
    radiuses?: Array<number>;
    /**
     * Specifies a list of pairs (bearings and deviations) to filter the segments of the road network a waypoint can snap to.
     * "For example `bearings=[[45,10],[120,20]]`.
     * - Each pair is a comma-separated list that can consist of one or two float values, where the first
     *      value is the bearing and the second one is the allowed deviation from the bearing.
     * - The bearing can take values between `0` and `360` clockwise from true north. If the deviation is
     *      not set, then the default value of `100` degrees is used.
     * - The number of pairs must correspond to the number of waypoints.
     * - The number of bearings corresponds to the length of waypoints-1 or waypoints. If the bearing
     *      information for the last waypoint is given, then this will control the sector from which the
     *      destination waypoint may be reached.
     * - You can skip a bearing for a certain waypoint by passing an empty value for an array, e.g. `[30,20],[],[40,20]`.
     * @example 30,20,,40,20
     */
    bearings?: Array<Array<number>>;

    /*
      Force l'itinéraire à continuer tout droit aux waypoints restreignant les demi-tours à cet endroit,
      même si cela serait plus rapide.
    */
    continue_straight?: boolean;
    /* Specifies whether to return elevation values for points. Please note that elevation also gets encoded for json response encoded polyline. */
    elevation?: boolean;
    /*
     * The extra info items to include in the response
     * @example waytype,surface
     */
    extra_info?: Array<
      | "steepness"
      | "suitability"
      | "surface"
      | "waycategory"
      | "waytype"
      | "tollways"
      | "traildifficulty"
      | "osmid"
      | "roadaccessrestrictions"
      | "countryinfo"
      | "green"
      | "noise"
      | "csv"
      | "shadow"
    >;
    /**
     * Advanced options for routing
     * @example [object Object]
     */
    options?: {
      /**
       * List of features to avoid.
       * highways : Autoroutes
       * tollways : Sections à péage
       * fords : gués
       * steps : escaliers
       */
      avoid_features?: Array<
        "highways" | "tollways" | "ferries" | "fords" | "steps"
      >;
      /**
       * Specify which type of border crossing to avoid
       * @example controlled
       */
      avoid_borders?: "all" | "controlled" | "none";
      /**
       * List of countries to exclude from matrix with `driving-*` profiles. Can be used together with `'avoid_borders': 'controlled'`. `[ 11, 193 ]` would exclude Austria and Switzerland. List of countries and application examples can be found [here](https://GIScience.github.io/openrouteservice/documentation/routing-options/Country-List.html). Also, ISO standard country codes cna be used in place of the numerical ids, for example, DE or DEU for Germany.
       * @example 11,193
       */
      avoid_countries?: Array<string>;
      /* Definition of the vehicle type. */
      vehicle_type?:
        | "hgv"
        | "bus"
        | "agricultural"
        | "delivery"
        | "forestry"
        | "goods"
        | "unknown";
      /* Specifies additional routing parameters. For all profiles except `driving-car`. */
      profile_params?: {
        /** Describe additional weightings to be applied to edges on the routing. */
        weightings?: {
          /**
           * Specifies the fitness level for `cycling-*` profiles.
           *
           * level: 0 = Novice, 1 = Moderate, 2 = Amateur, 3 = Pro. The prefered gradient increases with level.
           * Format: int32
           * @example 2
           */
          steepness_difficulty?: number;
          /**
           * Specifies the Green factor for `foot-*` profiles.
           *
           * factor: Multiplication factor range from 0 to 1. 0 is the green routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer ways through green areas over a shorter route.
           * Format: float
           * @example 0.4
           */
          green?: number /*
           * Specifies the Quiet factor for foot-* profiles.
           *
           * factor: Multiplication factor range from 0 to 1. 0 is the quiet routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer quiet ways over a shorter route.
           * Format: float
           * @example 0.8
           */;
          quiet?: number /*
           * Specifies the shadow factor for `foot-*` profiles.
           *
           * factor: Multiplication factor range from 0 to 1. 0 is the shadow routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer ways through shadow areas over a shorter route.
           * Format: float
           * @example 0.4
           */;
          shadow?: number;
        };
        /* Describe restrictions to be applied to edges on the routing. any edges that do not match these restrictions are not traversed. */
        restrictions?: {
          /*
           * Length restriction in metres.
           * Format: float
           * @example 8.4
           */
          length?: number;
          /*
           * Width restriction in metres.
           * Format: float
           * @example 5.6
           */
          width?: number;
          /*
           * Height restriction in metres.
           * Format: float
           * @example 4.2
           */
          height?: number;
          /*
           * Axleload restriction in tons.
           * Format: float
           * @example 50
           */
          axleload?: number;
          /*
           * Weight restriction in tons.
           * Format: float
           * @example 40
           */
          weight?: number;
          /* Specifies whether to use appropriate routing for delivering hazardous goods and avoiding water protected areas. Default is `false`.  */
          hazmat?: boolean;
          /* Specifies the minimum surface type. Default is `sett`.  */
          surface_type?: string;
          /* Specifies the minimum grade of the route. Default is `grade1`.  */
          track_type?: string;
          /* Specifies the minimum smoothness of the route. Default is `good`. */
          smoothness_type?:
            | "excellent"
            | "good"
            | "intermediate"
            | "bad"
            | "very_bad"
            | "horrible"
            | "very_horrible"
            | "impassable";
          /*
           * Specifies the maximum height of the sloped curb in metres. Values are `0.03`, `0.06` (default), `0.1`.
           * Format: float
           */
          maximum_sloped_kerb?: number;
          /*
           * Specifies the maximum incline as a percentage. `3`, `6` (default), `10`, `15.
           * Format: int32
           */
          maximum_incline?: number;
          /*
           * Specifies the minimum width of the footway in metres.
           * Format: float
           * @example 2.5
           */
          minimum_width?: number;
        };
        /*
         * Specifies whether to enforce that only ways with known information on surface quality be taken into account - default false
         * @example true
         */
        surface_quality_known?: boolean;
        /*
         * Specifies if ways that might not be suitable (e.g. unknown pedestrian usage) should be included in finding routes - default false
         * @example true
         */
        allow_unsuitable?: boolean;
      };
      /* Comprises areas to be avoided for the route. Formatted in GeoJSON as either a Polygon or Multipolygon object. */
      avoid_polygons?: {
        empty?: boolean;
        /* Comprises areas to be avoided for the route. Formatted in GeoJSON as either a Polygon or Multipolygon object. */
        [key: string]: unknown;
      };
      /*
       * Specifies the parameters for generating round trip routes.
       * @example [object Object]
       */
      round_trip?: {
        /*
         * The target length of the route in `m` (note that this is a preferred value, but results may be different).
         * Format: float
         * @example 10000
         */
        length?: number /*
         * The number of points to use on the route. Larger values create more circular routes.
         * Format: int32
         * @example 5
         */;
        points?: number /*
         * A seed to use for adding randomisation to the overall direction of the generated route
         * Format: int64
         * @example 1
         */;
        seed?: number;
      };
    };
    /* Suppress warning messages in the response */
    suppress_warnings?: boolean;
    /* Specifies whether to simplify the geometry. Simplify geometry cannot be applied to routes with more than **one segment** and when `extra_info` is required. */
    geometry_simplify?: boolean;
    /*
     * Specifies the segments that should be skipped in the route calculation. A segment is the connection between two given coordinates and the counting starts with 1 for the connection between the first and second coordinate.
     * @example 2,4
     */
    skip_segments?: Array<number>;
    /*
     * Specifies whether alternative routes are computed, and parameters for the algorithm determining suitable alternatives.
     * @example [object Object]
     */
    alternative_routes?: {
      /*
       * Target number of alternative routes to compute. Service returns up to this number of routes that fulfill the share-factor and weight-factor constraints.
       * Format: int32
       * @example 2
       */
      target_count?: number;
      /*
       * Maximum factor by which route weight may diverge from the optimal route. The default value of 1.4 means alternatives can be up to 1.4 times longer (costly) than the optimal route.
       * Format: double
       * @example 1.4
       */
      weight_factor?: number;
      /*
       * Maximum fraction of the route that alternatives may share with the optimal route. The default value of 0.6 means alternatives can share up to 60% of path segments with the optimal route.
       * Format: double
       * @example 0.6
       */
      share_factor?: number;
    };
    /*
     * The maximum speed specified by user.
     * Format: double
     * @example 90
     */
    maximum_speed?: number;
    /*
     * If true, return a public transport schedule starting at <departure> for the next <schedule_duration> minutes.
     * @example true
     */
    schedule?: boolean;
    /*
     * The time window when requesting a public transport schedule. The format is passed as ISO 8601 duration: https://en.wikipedia.org/wiki/ISO_8601#Durations
     * @example PT30M
     */
    schedule_duration?: string;
    /*
     * The maximum amount of entries that should be returned when requesting a schedule.
     * Format: int32
     * @example 3
     */
    schedule_rows?: number;
    /*
     * Maximum duration for walking access and egress of public transport. The value is passed in ISO 8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
     * @example PT30M
     */
    walking_time?: string;
    /*
     * Specifies if transfers as criterion should be ignored.
     * @example true
     */
    ignore_transfers?: boolean;
  };

  DirectionsResponse: {
    type: "FeatureCollection";
    /* Information about the request */
    metadata: {
      /*
       * ID of the request (as passed in by the query)
       * @example request123
       */
      id?: string;
      /*
       * Copyright and attribution information
       * @example openrouteservice.org | OpenStreetMap contributors
       */
      attribution: string;
      /*
       * The MD5 hash of the OSM planet file that was used for generating graphs
       * @example c0327ba6
       */
      osm_file_md5_hash?: string;
      /*
       * The service that was requested
       * @example routing
       */
      service: "routing" | string;
      /*
       * Time that the request was made (UNIX Epoch time)
       * Format: int64
       * @example 1549549847974
       */
      timestamp: number;

      /* The JSON body request sent to the routing service which defines options and parameters regarding the route to generate. */
      query: APISchemas["DirectionsRequest"];

      /* Information about the openrouteservice engine used */
      engine: {
        version: string;
        build_date: string;
        graph_date: string;
      };
      /*
       * System message
       * @example A message string configured in the service
       */
      system_message?: string;
    };

    features: Feature<LineString, RouteProperties>[];
    /*
     * Bounding box that covers all returned routes
     * @example 46.1336,6.4245,46.0547,6.5603
     */
    bbox?: Array<number>;
  };

  SearchRequest: {
    text: string;

    /* Format for point/rect/circle float */

    "focus.point.lon"?: number;
    "focus.point.lat"?: number;

    "boundary.rect.min_lon"?: number;
    "boundary.rect.min_lat"?: number;
    "boundary.rect.max_lon"?: number;
    "boundary.rect.max_lat"?: number;

    "boundary.circle.lon"?: number;
    "boundary.circle.lat"?: number;
    "boundary.circle.radius"?: number;

    /**
     * Search within a parent administrative area
     * doc: https://github.com/pelias/documentation/blob/master/search.md#search-within-a-parent-administrative-area
     * example: "whosonfirst:region:85688585"
     */
    "boundary.gid"?: string;

    /**
     * Prioritize within a country
     * a comma separated list of alpha-2 or alpha-3 ISO-3166 country code.
     * iso-3166 reference : https://en.wikipedia.org/wiki/ISO_3166-1
     * example: "FR"
     */
    "boundary.country"?: string;

    /**
     * Filter by data source
     * The search examples so far have returned a mix of results from all the data
     * sources available to Pelias. Here are the sources being searched
     * use a comma separated list of sources
     * default: all sources -> osm,oa,gn,wof
     */
    sources?: DataSource[];
    /**
     * use a comma separated list of type
     * default: all layers: address,venue,neighbourhood,locality,borough,localadmin,county,macrocounty,region,macroregion,country,coarse,postalcode
     */
    layers?: DataType[];

    /**
     * Set the number of results returned
     * default: 10
     */
    size?: number;
  };

  SearchResponse: {
    geocoding: {
      version: string;
      attribution: string;
      query: APISchemas["SearchRequest"];
      warnings: string[];
      engine: {
        name: string;
        author: string;
        version: string;
      };
      timestamp: number;
    };
    type: "FeatureCollection";
    features: Feature<Point, SearchProperties>[];
    bbox: [number, number, number, number];
  };
};

export type ORSProfile =
  | "driving-car"
  // | "driving-hgv"
  | "cycling-regular"
  // | "cycling-road"
  // | "cycling-mountain"
  // | "cycling-electric"
  // | "foot-walking"
  | "foot-hiking";
// | "wheelchair"
// | "public-transport";

export type APIEndpoints = {
  "/v2/directions/{profile}/geojson": {
    responses: { post: APISchemas["DirectionsResponse"] };
    requests: {
      method: "post";
      urlParams: {
        profile: ORSProfile;
      };
      body: APISchemas["DirectionsRequest"];
    };
  };
  "/geocode/search": {
    requests: {
      method?: "get";
      query: APISchemas["SearchRequest"];
    };
    responses: {
      get: APISchemas["SearchResponse"];
    };
  };
};

type Language =
  | "cs"
  | "cs-cz"
  | "de"
  | "de-de"
  | "en"
  | "en-us"
  | "eo"
  | "eo-eo"
  | "es"
  | "es-es"
  | "fr"
  | "fr-fr"
  | "gr"
  | "gr-gr"
  | "he"
  | "he-il"
  | "hu"
  | "hu-hu"
  | "id"
  | "id-id"
  | "it"
  | "it-it"
  | "ja"
  | "ja-jp"
  | "ne"
  | "ne-np"
  | "nl"
  | "nl-nl"
  | "nb"
  | "nb-no"
  | "pl"
  | "pl-pl"
  | "pt"
  | "pt-pt"
  | "ro"
  | "ro-ro"
  | "ru"
  | "ru-ru"
  | "tr"
  | "tr-tr"
  | "zh"
  | "zh-cn";

export type APIPaths = keyof APIEndpoints;

export type APIRequests<T extends APIPaths> = APIEndpoints[T]["requests"];

export type APIMethods<T extends APIPaths> = NonNullable<
  APIRequests<T>["method"]
>;

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
