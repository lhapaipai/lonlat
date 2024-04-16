import { Feature, LineString } from "geojson";

export type RouteProperties = {
  /* Contains total sums of duration, route distance and actual distance of the route. */
  summary: {
    /*
     * Total route distance in specified units.
     * Format: double
     * @example 12.6
     */
    distance: number /*
     * Total duration in seconds.
     * Format: double
     * @example 604
     */;
    duration: number /*
     * Total ascent in meters.
     * Format: double
     * @example 166.3
     */;
    ascent?: number /*
     * Total descent in meters.
     * Format: double
     * @example 201.3
     */;
    descent?: number;
    /* Format: int32 */
    transfers?: number;
    /* Format: int32 */
    fare?: number;
  };
  /* List containing the segments and its corresponding steps which make up the route. */
  segments: Array<{
    /*
     * Contains the distance of the segment in specified units.
     * Format: double
     * @example 253
     */
    distance: number /*
     * Contains the duration of the segment in seconds.
     * Format: double
     * @example 37.7
     */;
    duration: number;
    /* List containing the specific steps the segment consists of. */
    steps: Array<{
      /*
       * The distance for the step in metres.
       * Format: double
       * @example 245
       */
      distance: number /*
       * The duration for the step in seconds.
       * Format: double
       * @example 96.2
       */;
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
    }> /*
     * Contains the deviation compared to a straight line that would have the factor `1`. Double the Distance would be a `2`.
     * Format: double
     * @example 0.5
     */;
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
    avgspeed?: number /*
     *  Contains ascent of this segment in metres.
     * Format: double
     * @example 56.3
     */;
    ascent?: number /*
     * Contains descent of this segment in metres.
     * Format: double
     * @example 45.2
     */;
    descent?: number;
  }> /*
   * A bounding box which contains the entire route
   * @example 46.1336,6.4245,46.0547,6.5603
   */;
  bbox?: Array<number> /*
   * The geometry of the route. For JSON route responses this is an encoded polyline.
   * @example yuqlH{i~s@gaUe@VgEQFcBRbB_C
   */;
  geometry?: string /*
   * List containing the indices of way points corresponding to the *geometry*.
   * @example 0,23
   */;
  way_points: Array<number>;
  /* List of warnings that have been generated for the route */
  warnings?: Array<{
    /*
     * Identification code for the warning
     * Format: int32
     * @example 1
     */
    code?: number /*
     * The message associated with the warning
     * @example This route may go over restricted roads
     */;
    message?: string;
  }>;
  /* List containing the legs the route consists of. */
  legs?: Array<{
    /*
     * The type of the leg, possible values are currently 'walk' and 'pt'.
     * @example pt
     */
    type?: string /*
     * The departure location of the leg.
     * @example Dossenheim, Süd Bstg G1
     */;
    departure_location?: string /*
     * The headsign of the public transport vehicle of the leg.
     * @example Bismarckplatz - Speyererhof - EMBL - Boxberg - Mombertplatz
     */;
    trip_headsign?: string /*
     * The public transport route name of the leg.
     * @example RNV Bus 39A
     */;
    route_long_name?: string /*
     * The public transport route name (short version) of the leg.
     * @example 39A
     */;
    route_short_name?: string /*
     * The route description of the leg (if provided in the GTFS data set).
     * @example Bus
     */;
    route_desc?: string /*
     * The route type of the leg (if provided in the GTFS data set).
     * Format: int32
     * @example 1
     */;
    route_type?: number /*
     * The distance for the leg in metres.
     * Format: double
     * @example 245
     */;
    distance?: number /*
     * The duration for the leg in seconds.
     * Format: double
     * @example 96.2
     */;
    duration?: number /*
     * Departure date and time
     * Format: date-time
     * @example 2020-01-31T12:45:00+01:00
     */;
    departure?: string /*
     * Arrival date and time
     * Format: date-time
     * @example 2020-01-31T13:15:00+01:00
     */;
    arrival?: string /*
     * The feed ID this public transport leg based its information from.
     * @example gtfs_0
     */;
    feed_id?: string /*
     * The trip ID of this public transport leg.
     * @example trip_id: vrn-19-39A-1-2-21-H-8-Special-50-42
     */;
    trip_id?: string /*
     * The route ID of this public transport leg.
     * @example vrn-19-39A-1
     */;
    route_id?: string;
    /* Whether the legs continues in the same vehicle as the previous one. */
    is_in_same_vehicle_as_previous?: boolean /*
     * The geometry of the leg. This is an encoded polyline.
     * @example yuqlH{i~s@gaUe@VgEQFcBRbB_C
     */;
    geometry?: string;
    /* List containing the specific steps the segment consists of. */
    instructions?: Array<{
      /*
       * The distance for the step in metres.
       * Format: double
       * @example 245
       */
      distance?: number /*
       * The duration for the step in seconds.
       * Format: double
       * @example 96.2
       */;
      duration?: number /*
       * The [instruction](https://GIScience.github.io/openrouteservice/documentation/Instruction-Types.html) action for symbolisation purposes.
       * Format: int32
       * @example 1
       */;
      type?: number /*
       * The routing instruction text for the step.
       * @example Turn right onto Berliner Straße
       */;
      instruction?: string /*
       * The name of the next street.
       * @example Berliner Straße
       */;
      name?: string /*
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
      way_points?: Array<number>;
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
    }>;
    /* List containing the stops the along the leg. */
    stops?: Array<{
      /*
       * The ID of the stop.
       * @example de:08221:1138:0:O
       */
      stop_id?: string /*
       * The name of the stop.
       * @example Heidelberg, Alois-Link-Platz
       */;
      name?: string /*
       * The location of the stop.
       * @example 8.6912542,49.399979
       */;
      location?: Array<number> /*
       * Arrival time of the stop.
       * Format: date-time
       * @example 2022-07-04T13:22:00Z
       */;
      arrival_time?: string /*
       * Planned arrival time of the stop.
       * Format: date-time
       * @example 2022-07-04T13:22:00Z
       */;
      planned_arrival_time?: string /*
       * Predicted arrival time of the stop.
       * Format: date-time
       * @example 2022-07-04T13:22:00Z
       */;
      predicted_arrival_time?: string;
      /* Whether arrival at the stop was cancelled. */
      arrival_cancelled?: boolean /*
       * Departure time of the stop.
       * Format: date-time
       * @example 2022-07-04T13:22:00Z
       */;
      departure_time?: string /*
       * Planned departure time of the stop.
       * Format: date-time
       * @example 2022-07-04T13:22:00Z
       */;
      planned_departure_time?: string /*
       * Predicted departure time of the stop.
       * Format: date-time
       * @example 2022-07-04T13:22:00Z
       */;
      predicted_departure_time?: string;
      /* Whether departure at the stop was cancelled. */
      departure_cancelled?: boolean;
    }>;
  }>;
  /* List of extra info objects representing the extra info items that were requested for the route. */
  extras?: {
    /* An object representing one of the extra info items requested */
    [key: string]: {
      /*
* A list of values representing a section of the route. The individual values are:
Value 1: Indice of the staring point of the geometry for this section,
Value 2: Indice of the end point of the geoemetry for this sections,
Value 3: [Value](https://GIScience.github.io/openrouteservice/documentation/extra-info/Extra-Info.html) assigned to this section.
* @example 0,3,26,3,10,12
*/
      values?: Array<Array<number>>;
      /* List representing the summary of the extra info items. */
      summary?: Array<{
        /*
         * [Value](https://GIScience.github.io/openrouteservice/documentation/extra-info/Extra-Info.html) of a info category.
         * Format: double
         * @example 5
         */
        value?: number /*
         * Cumulative distance of this value.
         * Format: double
         * @example 123.1
         */;
        distance?: number /*
         * Category percentage of the entire route.
         * Format: double
         * @example 23.8
         */;
        amount?: number;
      }>;
    };
  } /*
   * Departure date and time
   * Format: date-time
   * @example 2020-01-31T12:45:00+01:00
   */;
  departure?: string /*
   * Arrival date and time
   * Format: date-time
   * @example 2020-01-31T13:15:00+01:00
   */;
  arrival?: string;
};

export type APISchemas = {
  /* Snapping service endpoint. */
  SnappingRequest: {
    /*
     * The locations to be snapped as array of `longitude/latitude` pairs.
     * @example 6.501,46.0916,6.5025,46.0839
     */
    locations: Array<Array<number>> /*
     * Arbitrary identification string of the request reflected in the meta information.
     * @example my_request
     */;
    id?: string /*
     * Maximum radius in meters around given coordinates to search for graph edges.
     * Format: double
     * @example 300
     */;
    radius: number;
  };
  /* Information about the openrouteservice engine used */
  EngineInfo: {
    /*
     * The backend version of the openrouteservice that was queried
     * @example 8.0
     */
    version?: string /*
     * The date that the service was last updated
     * @example 2019-02-07T14:28:11Z
     */;
    build_date?: string /*
     * The date that the graph data was last updated
     * @example 2019-02-07T14:28:11Z
     */;
    graph_date?: string;
  };
  /* The snapped locations as coordinates and snapping distance. */
  JSONLocation: {
    /*
     * {longitude},{latitude} coordinates of the closest accessible point on the routing graph
     * @example 8.678962,49.40783
     */
    location?: Array<number> /*
     * Name of the street the closest accessible point is situated on. Only for `resolve_locations=true` and only if name is available.
     * @example Bergheimer Straße
     */;
    name?: string /*
     * Distance between the `source/destination` Location and the used point on the routing graph in meters.
     * Format: double
     * @example 1.2
     */;
    snapped_distance?: number;
  };
  /* The Snapping Response contains the snapped coordinates. */
  SnappingResponse: {
    /* The snapped locations as coordinates and snapping distance. */
    locations?: Array<{
      /*
       * {longitude},{latitude} coordinates of the closest accessible point on the routing graph
       * @example 8.678962,49.40783
       */
      location?: Array<number> /*
       * Name of the street the closest accessible point is situated on. Only for `resolve_locations=true` and only if name is available.
       * @example Bergheimer Straße
       */;
      name?: string /*
       * Distance between the `source/destination` Location and the used point on the routing graph in meters.
       * Format: double
       * @example 1.2
       */;
      snapped_distance?: number;
    }>;
    /* Information about the request */
    metadata?: {
      /*
       * Copyright and attribution information
       * @example openrouteservice.org | OpenStreetMap contributors
       */
      attribution?: string /*
       * The MD5 hash of the OSM planet file that was used for generating graphs
       * @example c0327ba6
       */;
      osm_file_md5_hash?: string /*
       * The service that was requested
       * @example snap
       */;
      service?: string /*
       * Time that the request was made (UNIX Epoch time)
       * Format: int64
       * @example 1549549847974
       */;
      timestamp?: number;
      /* Snapping service endpoint. */
      query?: {
        /*
         * The locations to be snapped as array of `longitude/latitude` pairs.
         * @example 6.501,46.0916,6.5025,46.0839
         */
        locations: Array<Array<number>> /*
         * Arbitrary identification string of the request reflected in the meta information.
         * @example my_request
         */;
        id?: string /*
         * Maximum radius in meters around given coordinates to search for graph edges.
         * Format: double
         * @example 300
         */;
        radius: number;
      };
      /* Information about the openrouteservice engine used */
      engine?: {
        /*
         * The backend version of the openrouteservice that was queried
         * @example 8.0
         */
        version?: string /*
         * The date that the service was last updated
         * @example 2019-02-07T14:28:11Z
         */;
        build_date?: string /*
         * The date that the graph data was last updated
         * @example 2019-02-07T14:28:11Z
         */;
        graph_date?: string;
      } /*
       * System message
       * @example A message string configured in the service
       */;
      system_message?: string;
    };
  };
  /* Information about the request */
  SnappingResponseInfo: {
    /*
     * Copyright and attribution information
     * @example openrouteservice.org | OpenStreetMap contributors
     */
    attribution?: string /*
     * The MD5 hash of the OSM planet file that was used for generating graphs
     * @example c0327ba6
     */;
    osm_file_md5_hash?: string /*
     * The service that was requested
     * @example snap
     */;
    service?: string /*
     * Time that the request was made (UNIX Epoch time)
     * Format: int64
     * @example 1549549847974
     */;
    timestamp?: number;
    /* Snapping service endpoint. */
    query?: {
      /*
       * The locations to be snapped as array of `longitude/latitude` pairs.
       * @example 6.501,46.0916,6.5025,46.0839
       */
      locations: Array<Array<number>> /*
       * Arbitrary identification string of the request reflected in the meta information.
       * @example my_request
       */;
      id?: string /*
       * Maximum radius in meters around given coordinates to search for graph edges.
       * Format: double
       * @example 300
       */;
      radius: number;
    };
    /* Information about the openrouteservice engine used */
    engine?: {
      /*
       * The backend version of the openrouteservice that was queried
       * @example 8.0
       */
      version?: string /*
       * The date that the service was last updated
       * @example 2019-02-07T14:28:11Z
       */;
      build_date?: string /*
       * The date that the graph data was last updated
       * @example 2019-02-07T14:28:11Z
       */;
      graph_date?: string;
    } /*
     * System message
     * @example A message string configured in the service
     */;
    system_message?: string;
  };
  /* Information about the service and request */
  GeoJSONFeature: {
    /* GeoJSON type */
    type?: string;
    /* Feature properties */
    properties?: {
      /*
       * "Name of the street the closest accessible point is situated on. Only for `resolve_locations=true` and only if name is available.
       * @example Gerhart-Hauptmann-Straße
       */
      name?: string /*
       * Distance between the `source/destination` Location and the used point on the routing graph in meters.
       * Format: double
       * @example 0.02
       */;
      snapped_distance?: number /*
       * Index of the requested location
       * Format: int32
       */;
      source_id?: number;
    };
    /* Feature geometry */
    geometry?: {
      /* GeoJSON type */
      type?: string /*
       * Lon/Lat coordinates of the snapped location
       * @example 6.501,46.0916
       */;
      coordinates?: Array<number>;
    };
  };
  /* Feature properties */
  GeoJSONFeatureProperties: {
    /*
     * "Name of the street the closest accessible point is situated on. Only for `resolve_locations=true` and only if name is available.
     * @example Gerhart-Hauptmann-Straße
     */
    name?: string /*
     * Distance between the `source/destination` Location and the used point on the routing graph in meters.
     * Format: double
     * @example 0.02
     */;
    snapped_distance?: number /*
     * Index of the requested location
     * Format: int32
     */;
    source_id?: number;
  };
  /* Feature geometry */
  GeoJSONPointGeometry: {
    /* GeoJSON type */
    type?: string /*
     * Lon/Lat coordinates of the snapped location
     * @example 6.501,46.0916
     */;
    coordinates?: Array<number>;
  };
  /* The GeoJSON Snapping Response contains the snapped coordinates in GeoJSON format. */
  GeoJSONSnappingResponse: {
    /* GeoJSON type */
    type?: string;
    /* Information about the service and request */
    features?: Array<{
      /* GeoJSON type */
      type?: string;
      /* Feature properties */
      properties?: {
        /*
         * "Name of the street the closest accessible point is situated on. Only for `resolve_locations=true` and only if name is available.
         * @example Gerhart-Hauptmann-Straße
         */
        name?: string /*
         * Distance between the `source/destination` Location and the used point on the routing graph in meters.
         * Format: double
         * @example 0.02
         */;
        snapped_distance?: number /*
         * Index of the requested location
         * Format: int32
         */;
        source_id?: number;
      };
      /* Feature geometry */
      geometry?: {
        /* GeoJSON type */
        type?: string /*
         * Lon/Lat coordinates of the snapped location
         * @example 6.501,46.0916
         */;
        coordinates?: Array<number>;
      };
    }>;
    /* Information about the request */
    metadata?: {
      /*
       * Copyright and attribution information
       * @example openrouteservice.org | OpenStreetMap contributors
       */
      attribution?: string /*
       * The MD5 hash of the OSM planet file that was used for generating graphs
       * @example c0327ba6
       */;
      osm_file_md5_hash?: string /*
       * The service that was requested
       * @example snap
       */;
      service?: string /*
       * Time that the request was made (UNIX Epoch time)
       * Format: int64
       * @example 1549549847974
       */;
      timestamp?: number;
      /* Snapping service endpoint. */
      query?: {
        /*
         * The locations to be snapped as array of `longitude/latitude` pairs.
         * @example 6.501,46.0916,6.5025,46.0839
         */
        locations: Array<Array<number>> /*
         * Arbitrary identification string of the request reflected in the meta information.
         * @example my_request
         */;
        id?: string /*
         * Maximum radius in meters around given coordinates to search for graph edges.
         * Format: double
         * @example 300
         */;
        radius: number;
      };
      /* Information about the openrouteservice engine used */
      engine?: {
        /*
         * The backend version of the openrouteservice that was queried
         * @example 8.0
         */
        version?: string /*
         * The date that the service was last updated
         * @example 2019-02-07T14:28:11Z
         */;
        build_date?: string /*
         * The date that the graph data was last updated
         * @example 2019-02-07T14:28:11Z
         */;
        graph_date?: string;
      } /*
       * System message
       * @example A message string configured in the service
       */;
      system_message?: string;
    } /*
     * Bounding box that covers all returned snapping points
     * @example 46.1336,6.4245,46.0547,6.5603
     */;
    bbox?: Array<number>;
  };
  /* The JSON body request sent to the matrix service which defines options and parameters regarding the matrix to generate. */
  MatrixRequest: {
    /*
     * List of comma separated lists of `longitude,latitude` coordinates in WGS 84 (EPSG:4326)
     * @example 9.70093,48.477473,9.207916,49.153868,37.573242,55.801281,115.663757,38.106467
     */
    locations: Array<Array<number>> /*
     * Arbitrary identification string of the request reflected in the meta information.
     * @example my_request
     */;
    id?: string;
    /* A list of indices that refers to the list of locations (starting with `0`). `{index_1},{index_2}[,{index_N} ...]` or `all` (default). example `[0,3]` for the first and fourth locations  */
    sources?: Array<string>;
    /* A list of indices that refers to the list of locations (starting with `0`). `{index_1},{index_2}[,{index_N} ...]` or `all` (default). `[0,3]` for the first and fourth locations  */
    destinations?: Array<string>;
    /* Specifies a list of returned metrics.
"* `distance` - Returns distance matrix for specified points in defined `units`.
* `duration` - Returns duration matrix for specified points in **seconds**.
 */
    metrics?: Array<"distance" | "duration">;
    /* Specifies whether given locations are resolved or not. If the parameter value set to `true`, every element in `destinations` and `sources` will contain a `name` element that identifies the name of the closest street. Default is `false`.  */
    resolve_locations?: boolean;
    /* Specifies the distance unit.
Default: m. */
    units?: "m" | "km" | "mi";
  };
  /* The individual destinations of the matrix calculations. */
  JSON2DDestinations: {
    /*
     * {longitude},{latitude} coordinates of the closest accessible point on the routing graph
     * @example 8.678962,49.40783
     */
    location?: Array<number> /*
     * Name of the street the closest accessible point is situated on. Only for `resolve_locations=true` and only if name is available.
     * @example Bergheimer Straße
     */;
    name?: string /*
     * Distance between the `source/destination` Location and the used point on the routing graph in meters.
     * Format: double
     * @example 1.2
     */;
    snapped_distance?: number;
  };
  /* The individual sources of the matrix calculations. */
  JSON2DSources: {
    /*
     * {longitude},{latitude} coordinates of the closest accessible point on the routing graph
     * @example 8.678962,49.40783
     */
    location?: Array<number> /*
     * Name of the street the closest accessible point is situated on. Only for `resolve_locations=true` and only if name is available.
     * @example Bergheimer Straße
     */;
    name?: string /*
     * Distance between the `source/destination` Location and the used point on the routing graph in meters.
     * Format: double
     * @example 1.2
     */;
    snapped_distance?: number;
  };
  /* The Matrix Response contains one matrix for each specified `metrics` value. */
  MatrixResponse: {
    /* Information about the request */
    metadata?: {
      /*
       * ID of the request (as passed in by the query)
       * @example request123
       */
      id?: string /*
       * Copyright and attribution information
       * @example openrouteservice.org, OpenStreetMap contributors
       */;
      attribution?: string /*
       * The MD5 hash of the OSM planet file that was used for generating graphs
       * @example c0327ba6
       */;
      osm_file_md5_hash?: string /*
       * The service that was requested
       * @example matrix
       */;
      service?: string /*
       * Time that the request was made (UNIX Epoch time)
       * Format: int64
       * @example 1549549847974
       */;
      timestamp?: number;
      /* The JSON body request sent to the matrix service which defines options and parameters regarding the matrix to generate. */
      query?: {
        /*
         * List of comma separated lists of `longitude,latitude` coordinates in WGS 84 (EPSG:4326)
         * @example 9.70093,48.477473,9.207916,49.153868,37.573242,55.801281,115.663757,38.106467
         */
        locations: Array<Array<number>> /*
         * Arbitrary identification string of the request reflected in the meta information.
         * @example my_request
         */;
        id?: string;
        /* A list of indices that refers to the list of locations (starting with `0`). `{index_1},{index_2}[,{index_N} ...]` or `all` (default). example `[0,3]` for the first and fourth locations  */
        sources?: Array<string>;
        /* A list of indices that refers to the list of locations (starting with `0`). `{index_1},{index_2}[,{index_N} ...]` or `all` (default). `[0,3]` for the first and fourth locations  */
        destinations?: Array<string>;
        /* Specifies a list of returned metrics.
"* `distance` - Returns distance matrix for specified points in defined `units`.
* `duration` - Returns duration matrix for specified points in **seconds**.
 */
        metrics?: Array<"distance" | "duration">;
        /* Specifies whether given locations are resolved or not. If the parameter value set to `true`, every element in `destinations` and `sources` will contain a `name` element that identifies the name of the closest street. Default is `false`.  */
        resolve_locations?: boolean;
        /* Specifies the distance unit.
Default: m. */
        units?: "m" | "km" | "mi";
      };
      /* Information about the openrouteservice engine used */
      engine?: {
        /*
         * The backend version of the openrouteservice that was queried
         * @example 8.0
         */
        version?: string /*
         * The date that the service was last updated
         * @example 2019-02-07T14:28:11Z
         */;
        build_date?: string /*
         * The date that the graph data was last updated
         * @example 2019-02-07T14:28:11Z
         */;
        graph_date?: string;
      } /*
       * System message
       * @example A message string configured in the service
       */;
      system_message?: string;
    } /*
     * The durations of the matrix calculations.
     * @example 0,25,25,0
     */;
    durations?: Array<Array<number>> /*
     * The distances of the matrix calculations.
     * @example 0,0.25,0.25,0
     */;
    distances?: Array<Array<number>>;
    /* The individual destinations of the matrix calculations. */
    destinations?: Array<{
      /*
       * {longitude},{latitude} coordinates of the closest accessible point on the routing graph
       * @example 8.678962,49.40783
       */
      location?: Array<number> /*
       * Name of the street the closest accessible point is situated on. Only for `resolve_locations=true` and only if name is available.
       * @example Bergheimer Straße
       */;
      name?: string /*
       * Distance between the `source/destination` Location and the used point on the routing graph in meters.
       * Format: double
       * @example 1.2
       */;
      snapped_distance?: number;
    }>;
    /* The individual sources of the matrix calculations. */
    sources?: Array<{
      /*
       * {longitude},{latitude} coordinates of the closest accessible point on the routing graph
       * @example 8.678962,49.40783
       */
      location?: Array<number> /*
       * Name of the street the closest accessible point is situated on. Only for `resolve_locations=true` and only if name is available.
       * @example Bergheimer Straße
       */;
      name?: string /*
       * Distance between the `source/destination` Location and the used point on the routing graph in meters.
       * Format: double
       * @example 1.2
       */;
      snapped_distance?: number;
    }>;
  };
  /* Information about the request */
  MatrixResponseInfo: {
    /*
     * ID of the request (as passed in by the query)
     * @example request123
     */
    id?: string /*
     * Copyright and attribution information
     * @example openrouteservice.org, OpenStreetMap contributors
     */;
    attribution?: string /*
     * The MD5 hash of the OSM planet file that was used for generating graphs
     * @example c0327ba6
     */;
    osm_file_md5_hash?: string /*
     * The service that was requested
     * @example matrix
     */;
    service?: string /*
     * Time that the request was made (UNIX Epoch time)
     * Format: int64
     * @example 1549549847974
     */;
    timestamp?: number;
    /* The JSON body request sent to the matrix service which defines options and parameters regarding the matrix to generate. */
    query?: {
      /*
       * List of comma separated lists of `longitude,latitude` coordinates in WGS 84 (EPSG:4326)
       * @example 9.70093,48.477473,9.207916,49.153868,37.573242,55.801281,115.663757,38.106467
       */
      locations: Array<Array<number>> /*
       * Arbitrary identification string of the request reflected in the meta information.
       * @example my_request
       */;
      id?: string;
      /* A list of indices that refers to the list of locations (starting with `0`). `{index_1},{index_2}[,{index_N} ...]` or `all` (default). example `[0,3]` for the first and fourth locations  */
      sources?: Array<string>;
      /* A list of indices that refers to the list of locations (starting with `0`). `{index_1},{index_2}[,{index_N} ...]` or `all` (default). `[0,3]` for the first and fourth locations  */
      destinations?: Array<string>;
      /* Specifies a list of returned metrics.
"* `distance` - Returns distance matrix for specified points in defined `units`.
* `duration` - Returns duration matrix for specified points in **seconds**.
 */
      metrics?: Array<"distance" | "duration">;
      /* Specifies whether given locations are resolved or not. If the parameter value set to `true`, every element in `destinations` and `sources` will contain a `name` element that identifies the name of the closest street. Default is `false`.  */
      resolve_locations?: boolean;
      /* Specifies the distance unit.
Default: m. */
      units?: "m" | "km" | "mi";
    };
    /* Information about the openrouteservice engine used */
    engine?: {
      /*
       * The backend version of the openrouteservice that was queried
       * @example 8.0
       */
      version?: string /*
       * The date that the service was last updated
       * @example 2019-02-07T14:28:11Z
       */;
      build_date?: string /*
       * The date that the graph data was last updated
       * @example 2019-02-07T14:28:11Z
       */;
      graph_date?: string;
    } /*
     * System message
     * @example A message string configured in the service
     */;
    system_message?: string;
  };
  /* The JSON body request sent to the isochrones service which defines options and parameters regarding the isochrones to generate. */
  IsochronesRequest: {
    /*
     * Arbitrary identification string of the request reflected in the meta information.
     * @example my_request
     */
    id?: string /*
     * The locations to use for the route as an array of `longitude/latitude` pairs in WGS 84 (EPSG:4326)
     * @example 6.501,46.0916,6.5025,46.0839
     */;
    locations: Array<Array<number>>;
    /* `start` treats the location(s) as starting point, `destination` as goal. */
    location_type?: "start" | "destination" /*
     * Maximum range value of the analysis in **seconds** for time and **metres** for distance.Alternatively a comma separated list of specific range values. Ranges will be the same for all locations.
     * @example 300,200
     */;
    range: Array<number>;
    /* Specifies the isochrones reachability type. */
    range_type?: "time" | "distance";
    /* Specifies the distance units only if `range_type` is set to distance.
Default: m.  */
    units?: "m" | "km" | "mi" /*
     * Advanced options for routing
     * @example [object Object]
     */;
    options?: {
      /*
       * List of features to avoid.
       * @example highways
       */
      avoid_features?: Array<"highways" | "tollways" | "ferries" | "fords" | "steps"> /*
       * Specify which type of border crossing to avoid
       * @example controlled
       */;
      avoid_borders?: "all" | "controlled" | "none" /*
       * List of countries to exclude from matrix with `driving-*` profiles. Can be used together with `'avoid_borders': 'controlled'`. `[ 11, 193 ]` would exclude Austria and Switzerland. List of countries and application examples can be found [here](https://GIScience.github.io/openrouteservice/documentation/routing-options/Country-List.html). Also, ISO standard country codes cna be used in place of the numerical ids, for example, DE or DEU for Germany.
       * @example 11,193
       */;
      avoid_countries?: Array<string>;
      /* Definition of the vehicle type. */
      vehicle_type?: "hgv" | "bus" | "agricultural" | "delivery" | "forestry" | "goods" | "unknown";
      /* Specifies additional routing parameters. For all profiles except `driving-car`. */
      profile_params?: {
        /* Describe additional weightings to be applied to edges on the routing. */
        weightings?: {
          /*
 * Specifies the fitness level for `cycling-*` profiles.

 level: 0 = Novice, 1 = Moderate, 2 = Amateur, 3 = Pro. The prefered gradient increases with level.
 * Format: int32
 * @example 2
 */
          steepness_difficulty?: number /*
 * Specifies the Green factor for `foot-*` profiles.

factor: Multiplication factor range from 0 to 1. 0 is the green routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer ways through green areas over a shorter route.
 * Format: float
 * @example 0.4
 */;
          green?: number /*
 * Specifies the Quiet factor for foot-* profiles.

factor: Multiplication factor range from 0 to 1. 0 is the quiet routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer quiet ways over a shorter route.
 * Format: float
 * @example 0.8
 */;
          quiet?: number /*
 * Specifies the shadow factor for `foot-*` profiles.

factor: Multiplication factor range from 0 to 1. 0 is the shadow routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer ways through shadow areas over a shorter route.
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
          length?: number /*
           * Width restriction in metres.
           * Format: float
           * @example 5.6
           */;
          width?: number /*
           * Height restriction in metres.
           * Format: float
           * @example 4.2
           */;
          height?: number /*
           * Axleload restriction in tons.
           * Format: float
           * @example 50
           */;
          axleload?: number /*
           * Weight restriction in tons.
           * Format: float
           * @example 40
           */;
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
            | "impassable" /*
           * Specifies the maximum height of the sloped curb in metres. Values are `0.03`, `0.06` (default), `0.1`.
           * Format: float
           */;
          maximum_sloped_kerb?: number /*
           * Specifies the maximum incline as a percentage. `3`, `6` (default), `10`, `15.
           * Format: int32
           */;
          maximum_incline?: number /*
           * Specifies the minimum width of the footway in metres.
           * Format: float
           * @example 2.5
           */;
          minimum_width?: number;
        } /*
         * Specifies whether to enforce that only ways with known information on surface quality be taken into account - default false
         * @example true
         */;
        surface_quality_known?: boolean /*
         * Specifies if ways that might not be suitable (e.g. unknown pedestrian usage) should be included in finding routes - default false
         * @example true
         */;
        allow_unsuitable?: boolean;
      };
      /* Comprises areas to be avoided for the route. Formatted in GeoJSON as either a Polygon or Multipolygon object. */
      avoid_polygons?: {
        empty?: boolean;
        /* Comprises areas to be avoided for the route. Formatted in GeoJSON as either a Polygon or Multipolygon object. */
        [key: string]: {};
      } /*
       * Specifies the parameters for generating round trip routes.
       * @example [object Object]
       */;
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
    /* Specifies the area unit.
Default: m.  */
    area_units?: "m" | "km" | "mi";
    /* Specifies whether to return intersecting polygons.  */
    intersections?: boolean /*
     * List of isochrones attributes
     * @example area
     */;
    attributes?: Array<"area" | "reachfactor" | "total_pop"> /*
     * Interval of isochrones or equidistants. This is only used if a single range value is given. Value in **seconds** for time and **meters** for distance.
     * Format: double
     * @example 30
     */;
    interval?: number /*
 * Applies a level of generalisation to the isochrone polygons generated as a `smoothing_factor` between `0` and `100.0`.
Generalisation is produced by determining a maximum length of a connecting line between two points found on the outside of a containing polygon.
If the distance is larger than a threshold value, the line between the two points is removed and a smaller connecting line between other points is used.
Note that the minimum length of this connecting line is ~1333m, and so when the `smoothing_factor` results in a distance smaller than this, the minimum value is used.
The threshold value is determined as `(maximum_radius_of_isochrone / 100) * smoothing_factor`.
Therefore, a value closer to 100 will result in a more generalised shape.
The polygon generation algorithm is based on Duckham and al. (2008) `"Efficient generation of simple polygons for characterizing the shape of a set of points in the plane."`
 * Format: double
 * @example 25
 */;
    smoothing?: number;
  };
  /* Comprises areas to be avoided for the route. Formatted in GeoJSON as either a Polygon or Multipolygon object. */
  JSONObject: {
    empty?: boolean;
    /* Comprises areas to be avoided for the route. Formatted in GeoJSON as either a Polygon or Multipolygon object. */
    [key: string]: {};
  };
  /* Describe restrictions to be applied to edges on the routing. any edges that do not match these restrictions are not traversed. */
  Restrictions: {
    /*
     * Length restriction in metres.
     * Format: float
     * @example 8.4
     */
    length?: number /*
     * Width restriction in metres.
     * Format: float
     * @example 5.6
     */;
    width?: number /*
     * Height restriction in metres.
     * Format: float
     * @example 4.2
     */;
    height?: number /*
     * Axleload restriction in tons.
     * Format: float
     * @example 50
     */;
    axleload?: number /*
     * Weight restriction in tons.
     * Format: float
     * @example 40
     */;
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
      | "impassable" /*
     * Specifies the maximum height of the sloped curb in metres. Values are `0.03`, `0.06` (default), `0.1`.
     * Format: float
     */;
    maximum_sloped_kerb?: number /*
     * Specifies the maximum incline as a percentage. `3`, `6` (default), `10`, `15.
     * Format: int32
     */;
    maximum_incline?: number /*
     * Specifies the minimum width of the footway in metres.
     * Format: float
     * @example 2.5
     */;
    minimum_width?: number;
  };
  /* Specifies additional routing parameters. For all profiles except `driving-car`. */
  profileParameters: {
    /* Describe additional weightings to be applied to edges on the routing. */
    weightings?: {
      /*
 * Specifies the fitness level for `cycling-*` profiles.

 level: 0 = Novice, 1 = Moderate, 2 = Amateur, 3 = Pro. The prefered gradient increases with level.
 * Format: int32
 * @example 2
 */
      steepness_difficulty?: number /*
 * Specifies the Green factor for `foot-*` profiles.

factor: Multiplication factor range from 0 to 1. 0 is the green routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer ways through green areas over a shorter route.
 * Format: float
 * @example 0.4
 */;
      green?: number /*
 * Specifies the Quiet factor for foot-* profiles.

factor: Multiplication factor range from 0 to 1. 0 is the quiet routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer quiet ways over a shorter route.
 * Format: float
 * @example 0.8
 */;
      quiet?: number /*
 * Specifies the shadow factor for `foot-*` profiles.

factor: Multiplication factor range from 0 to 1. 0 is the shadow routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer ways through shadow areas over a shorter route.
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
      length?: number /*
       * Width restriction in metres.
       * Format: float
       * @example 5.6
       */;
      width?: number /*
       * Height restriction in metres.
       * Format: float
       * @example 4.2
       */;
      height?: number /*
       * Axleload restriction in tons.
       * Format: float
       * @example 50
       */;
      axleload?: number /*
       * Weight restriction in tons.
       * Format: float
       * @example 40
       */;
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
        | "impassable" /*
       * Specifies the maximum height of the sloped curb in metres. Values are `0.03`, `0.06` (default), `0.1`.
       * Format: float
       */;
      maximum_sloped_kerb?: number /*
       * Specifies the maximum incline as a percentage. `3`, `6` (default), `10`, `15.
       * Format: int32
       */;
      maximum_incline?: number /*
       * Specifies the minimum width of the footway in metres.
       * Format: float
       * @example 2.5
       */;
      minimum_width?: number;
    } /*
     * Specifies whether to enforce that only ways with known information on surface quality be taken into account - default false
     * @example true
     */;
    surface_quality_known?: boolean /*
     * Specifies if ways that might not be suitable (e.g. unknown pedestrian usage) should be included in finding routes - default false
     * @example true
     */;
    allow_unsuitable?: boolean;
  };
  /* Describe additional weightings to be applied to edges on the routing. */
  profileWeightings: {
    /*
 * Specifies the fitness level for `cycling-*` profiles.

 level: 0 = Novice, 1 = Moderate, 2 = Amateur, 3 = Pro. The prefered gradient increases with level.
 * Format: int32
 * @example 2
 */
    steepness_difficulty?: number /*
 * Specifies the Green factor for `foot-*` profiles.

factor: Multiplication factor range from 0 to 1. 0 is the green routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer ways through green areas over a shorter route.
 * Format: float
 * @example 0.4
 */;
    green?: number /*
 * Specifies the Quiet factor for foot-* profiles.

factor: Multiplication factor range from 0 to 1. 0 is the quiet routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer quiet ways over a shorter route.
 * Format: float
 * @example 0.8
 */;
    quiet?: number /*
 * Specifies the shadow factor for `foot-*` profiles.

factor: Multiplication factor range from 0 to 1. 0 is the shadow routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer ways through shadow areas over a shorter route.
 * Format: float
 * @example 0.4
 */;
    shadow?: number;
  } /*
   * Specifies the parameters for generating round trip routes.
   * @example [object Object]
   */;
  roundTripRouteOptions: {
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
  } /*
   * Advanced options for routing
   * @example [object Object]
   */;
  routeOptions: {
    /*
     * List of features to avoid.
     * @example highways
     */
    avoid_features?: Array<"highways" | "tollways" | "ferries" | "fords" | "steps"> /*
     * Specify which type of border crossing to avoid
     * @example controlled
     */;
    avoid_borders?: "all" | "controlled" | "none" /*
     * List of countries to exclude from matrix with `driving-*` profiles. Can be used together with `'avoid_borders': 'controlled'`. `[ 11, 193 ]` would exclude Austria and Switzerland. List of countries and application examples can be found [here](https://GIScience.github.io/openrouteservice/documentation/routing-options/Country-List.html). Also, ISO standard country codes cna be used in place of the numerical ids, for example, DE or DEU for Germany.
     * @example 11,193
     */;
    avoid_countries?: Array<string>;
    /* Definition of the vehicle type. */
    vehicle_type?: "hgv" | "bus" | "agricultural" | "delivery" | "forestry" | "goods" | "unknown";
    /* Specifies additional routing parameters. For all profiles except `driving-car`. */
    profile_params?: {
      /* Describe additional weightings to be applied to edges on the routing. */
      weightings?: {
        /*
 * Specifies the fitness level for `cycling-*` profiles.

 level: 0 = Novice, 1 = Moderate, 2 = Amateur, 3 = Pro. The prefered gradient increases with level.
 * Format: int32
 * @example 2
 */
        steepness_difficulty?: number /*
 * Specifies the Green factor for `foot-*` profiles.

factor: Multiplication factor range from 0 to 1. 0 is the green routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer ways through green areas over a shorter route.
 * Format: float
 * @example 0.4
 */;
        green?: number /*
 * Specifies the Quiet factor for foot-* profiles.

factor: Multiplication factor range from 0 to 1. 0 is the quiet routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer quiet ways over a shorter route.
 * Format: float
 * @example 0.8
 */;
        quiet?: number /*
 * Specifies the shadow factor for `foot-*` profiles.

factor: Multiplication factor range from 0 to 1. 0 is the shadow routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer ways through shadow areas over a shorter route.
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
        length?: number /*
         * Width restriction in metres.
         * Format: float
         * @example 5.6
         */;
        width?: number /*
         * Height restriction in metres.
         * Format: float
         * @example 4.2
         */;
        height?: number /*
         * Axleload restriction in tons.
         * Format: float
         * @example 50
         */;
        axleload?: number /*
         * Weight restriction in tons.
         * Format: float
         * @example 40
         */;
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
          | "impassable" /*
         * Specifies the maximum height of the sloped curb in metres. Values are `0.03`, `0.06` (default), `0.1`.
         * Format: float
         */;
        maximum_sloped_kerb?: number /*
         * Specifies the maximum incline as a percentage. `3`, `6` (default), `10`, `15.
         * Format: int32
         */;
        maximum_incline?: number /*
         * Specifies the minimum width of the footway in metres.
         * Format: float
         * @example 2.5
         */;
        minimum_width?: number;
      } /*
       * Specifies whether to enforce that only ways with known information on surface quality be taken into account - default false
       * @example true
       */;
      surface_quality_known?: boolean /*
       * Specifies if ways that might not be suitable (e.g. unknown pedestrian usage) should be included in finding routes - default false
       * @example true
       */;
      allow_unsuitable?: boolean;
    };
    /* Comprises areas to be avoided for the route. Formatted in GeoJSON as either a Polygon or Multipolygon object. */
    avoid_polygons?: {
      empty?: boolean;
      /* Comprises areas to be avoided for the route. Formatted in GeoJSON as either a Polygon or Multipolygon object. */
      [key: string]: {};
    } /*
     * Specifies the parameters for generating round trip routes.
     * @example [object Object]
     */;
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
  GeoJSONIsochroneBase: {
    type?: string;
    geometry?: {
      empty?: boolean;
      /* Comprises areas to be avoided for the route. Formatted in GeoJSON as either a Polygon or Multipolygon object. */
      [key: string]: {
        empty?: boolean;
        /* Comprises areas to be avoided for the route. Formatted in GeoJSON as either a Polygon or Multipolygon object. */
        [key: string]: {};
      };
    };
  };
  GeoJSONIsochronesResponse: {
    type?: string;
    /* Information about the request */
    metadata?: {
      /*
       * ID of the request (as passed in by the query)
       * @example request123
       */
      id?: string /*
       * Copyright and attribution information
       * @example openrouteservice.org | OpenStreetMap contributors
       */;
      attribution?: string /*
       * The MD5 hash of the OSM planet file that was used for generating graphs
       * @example c0327ba6
       */;
      osm_file_md5_hash?: string /*
       * The service that was requested
       * @example isochrones
       */;
      service?: string /*
       * Time that the request was made (UNIX Epoch time)
       * Format: int64
       * @example 1549549847974
       */;
      timestamp?: number;
      /* The JSON body request sent to the isochrones service which defines options and parameters regarding the isochrones to generate. */
      query?: {
        /*
         * Arbitrary identification string of the request reflected in the meta information.
         * @example my_request
         */
        id?: string /*
         * The locations to use for the route as an array of `longitude/latitude` pairs in WGS 84 (EPSG:4326)
         * @example 6.501,46.0916,6.5025,46.0839
         */;
        locations: Array<Array<number>>;
        /* `start` treats the location(s) as starting point, `destination` as goal. */
        location_type?: "start" | "destination" /*
         * Maximum range value of the analysis in **seconds** for time and **metres** for distance.Alternatively a comma separated list of specific range values. Ranges will be the same for all locations.
         * @example 300,200
         */;
        range: Array<number>;
        /* Specifies the isochrones reachability type. */
        range_type?: "time" | "distance";
        /* Specifies the distance units only if `range_type` is set to distance.
Default: m.  */
        units?: "m" | "km" | "mi" /*
         * Advanced options for routing
         * @example [object Object]
         */;
        options?: {
          /*
           * List of features to avoid.
           * @example highways
           */
          avoid_features?: Array<"highways" | "tollways" | "ferries" | "fords" | "steps"> /*
           * Specify which type of border crossing to avoid
           * @example controlled
           */;
          avoid_borders?: "all" | "controlled" | "none" /*
           * List of countries to exclude from matrix with `driving-*` profiles. Can be used together with `'avoid_borders': 'controlled'`. `[ 11, 193 ]` would exclude Austria and Switzerland. List of countries and application examples can be found [here](https://GIScience.github.io/openrouteservice/documentation/routing-options/Country-List.html). Also, ISO standard country codes cna be used in place of the numerical ids, for example, DE or DEU for Germany.
           * @example 11,193
           */;
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
            /* Describe additional weightings to be applied to edges on the routing. */
            weightings?: {
              /*
 * Specifies the fitness level for `cycling-*` profiles.

 level: 0 = Novice, 1 = Moderate, 2 = Amateur, 3 = Pro. The prefered gradient increases with level.
 * Format: int32
 * @example 2
 */
              steepness_difficulty?: number /*
 * Specifies the Green factor for `foot-*` profiles.

factor: Multiplication factor range from 0 to 1. 0 is the green routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer ways through green areas over a shorter route.
 * Format: float
 * @example 0.4
 */;
              green?: number /*
 * Specifies the Quiet factor for foot-* profiles.

factor: Multiplication factor range from 0 to 1. 0 is the quiet routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer quiet ways over a shorter route.
 * Format: float
 * @example 0.8
 */;
              quiet?: number /*
 * Specifies the shadow factor for `foot-*` profiles.

factor: Multiplication factor range from 0 to 1. 0 is the shadow routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer ways through shadow areas over a shorter route.
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
              length?: number /*
               * Width restriction in metres.
               * Format: float
               * @example 5.6
               */;
              width?: number /*
               * Height restriction in metres.
               * Format: float
               * @example 4.2
               */;
              height?: number /*
               * Axleload restriction in tons.
               * Format: float
               * @example 50
               */;
              axleload?: number /*
               * Weight restriction in tons.
               * Format: float
               * @example 40
               */;
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
                | "impassable" /*
               * Specifies the maximum height of the sloped curb in metres. Values are `0.03`, `0.06` (default), `0.1`.
               * Format: float
               */;
              maximum_sloped_kerb?: number /*
               * Specifies the maximum incline as a percentage. `3`, `6` (default), `10`, `15.
               * Format: int32
               */;
              maximum_incline?: number /*
               * Specifies the minimum width of the footway in metres.
               * Format: float
               * @example 2.5
               */;
              minimum_width?: number;
            } /*
             * Specifies whether to enforce that only ways with known information on surface quality be taken into account - default false
             * @example true
             */;
            surface_quality_known?: boolean /*
             * Specifies if ways that might not be suitable (e.g. unknown pedestrian usage) should be included in finding routes - default false
             * @example true
             */;
            allow_unsuitable?: boolean;
          };
          /* Comprises areas to be avoided for the route. Formatted in GeoJSON as either a Polygon or Multipolygon object. */
          avoid_polygons?: {
            empty?: boolean;
            /* Comprises areas to be avoided for the route. Formatted in GeoJSON as either a Polygon or Multipolygon object. */
            [key: string]: {};
          } /*
           * Specifies the parameters for generating round trip routes.
           * @example [object Object]
           */;
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
        /* Specifies the area unit.
Default: m.  */
        area_units?: "m" | "km" | "mi";
        /* Specifies whether to return intersecting polygons.  */
        intersections?: boolean /*
         * List of isochrones attributes
         * @example area
         */;
        attributes?: Array<"area" | "reachfactor" | "total_pop"> /*
         * Interval of isochrones or equidistants. This is only used if a single range value is given. Value in **seconds** for time and **meters** for distance.
         * Format: double
         * @example 30
         */;
        interval?: number /*
 * Applies a level of generalisation to the isochrone polygons generated as a `smoothing_factor` between `0` and `100.0`.
Generalisation is produced by determining a maximum length of a connecting line between two points found on the outside of a containing polygon.
If the distance is larger than a threshold value, the line between the two points is removed and a smaller connecting line between other points is used.
Note that the minimum length of this connecting line is ~1333m, and so when the `smoothing_factor` results in a distance smaller than this, the minimum value is used.
The threshold value is determined as `(maximum_radius_of_isochrone / 100) * smoothing_factor`.
Therefore, a value closer to 100 will result in a more generalised shape.
The polygon generation algorithm is based on Duckham and al. (2008) `"Efficient generation of simple polygons for characterizing the shape of a set of points in the plane."`
 * Format: double
 * @example 25
 */;
        smoothing?: number;
      };
      /* Information about the openrouteservice engine used */
      engine?: {
        /*
         * The backend version of the openrouteservice that was queried
         * @example 8.0
         */
        version?: string /*
         * The date that the service was last updated
         * @example 2019-02-07T14:28:11Z
         */;
        build_date?: string /*
         * The date that the graph data was last updated
         * @example 2019-02-07T14:28:11Z
         */;
        graph_date?: string;
      } /*
       * System message
       * @example A message string configured in the service
       */;
      system_message?: string;
    };
    features?: Array<{
      type?: string;
      geometry?: {
        empty?: boolean;
        /* Comprises areas to be avoided for the route. Formatted in GeoJSON as either a Polygon or Multipolygon object. */
        [key: string]: {
          empty?: boolean;
          /* Comprises areas to be avoided for the route. Formatted in GeoJSON as either a Polygon or Multipolygon object. */
          [key: string]: {};
        };
      };
    }> /*
     * Bounding box that covers all returned isochrones
     * @example 46.1336,6.4245,46.0547,6.5603
     */;
    bbox?: Array<number>;
  };
  /* Information about the request */
  IsochronesResponseInfo: {
    /*
     * ID of the request (as passed in by the query)
     * @example request123
     */
    id?: string /*
     * Copyright and attribution information
     * @example openrouteservice.org | OpenStreetMap contributors
     */;
    attribution?: string /*
     * The MD5 hash of the OSM planet file that was used for generating graphs
     * @example c0327ba6
     */;
    osm_file_md5_hash?: string /*
     * The service that was requested
     * @example isochrones
     */;
    service?: string /*
     * Time that the request was made (UNIX Epoch time)
     * Format: int64
     * @example 1549549847974
     */;
    timestamp?: number;
    /* The JSON body request sent to the isochrones service which defines options and parameters regarding the isochrones to generate. */
    query?: {
      /*
       * Arbitrary identification string of the request reflected in the meta information.
       * @example my_request
       */
      id?: string /*
       * The locations to use for the route as an array of `longitude/latitude` pairs in WGS 84 (EPSG:4326)
       * @example 6.501,46.0916,6.5025,46.0839
       */;
      locations: Array<Array<number>>;
      /* `start` treats the location(s) as starting point, `destination` as goal. */
      location_type?: "start" | "destination" /*
       * Maximum range value of the analysis in **seconds** for time and **metres** for distance.Alternatively a comma separated list of specific range values. Ranges will be the same for all locations.
       * @example 300,200
       */;
      range: Array<number>;
      /* Specifies the isochrones reachability type. */
      range_type?: "time" | "distance";
      /* Specifies the distance units only if `range_type` is set to distance.
Default: m.  */
      units?: "m" | "km" | "mi" /*
       * Advanced options for routing
       * @example [object Object]
       */;
      options?: {
        /*
         * List of features to avoid.
         * @example highways
         */
        avoid_features?: Array<"highways" | "tollways" | "ferries" | "fords" | "steps"> /*
         * Specify which type of border crossing to avoid
         * @example controlled
         */;
        avoid_borders?: "all" | "controlled" | "none" /*
         * List of countries to exclude from matrix with `driving-*` profiles. Can be used together with `'avoid_borders': 'controlled'`. `[ 11, 193 ]` would exclude Austria and Switzerland. List of countries and application examples can be found [here](https://GIScience.github.io/openrouteservice/documentation/routing-options/Country-List.html). Also, ISO standard country codes cna be used in place of the numerical ids, for example, DE or DEU for Germany.
         * @example 11,193
         */;
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
          /* Describe additional weightings to be applied to edges on the routing. */
          weightings?: {
            /*
 * Specifies the fitness level for `cycling-*` profiles.

 level: 0 = Novice, 1 = Moderate, 2 = Amateur, 3 = Pro. The prefered gradient increases with level.
 * Format: int32
 * @example 2
 */
            steepness_difficulty?: number /*
 * Specifies the Green factor for `foot-*` profiles.

factor: Multiplication factor range from 0 to 1. 0 is the green routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer ways through green areas over a shorter route.
 * Format: float
 * @example 0.4
 */;
            green?: number /*
 * Specifies the Quiet factor for foot-* profiles.

factor: Multiplication factor range from 0 to 1. 0 is the quiet routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer quiet ways over a shorter route.
 * Format: float
 * @example 0.8
 */;
            quiet?: number /*
 * Specifies the shadow factor for `foot-*` profiles.

factor: Multiplication factor range from 0 to 1. 0 is the shadow routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer ways through shadow areas over a shorter route.
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
            length?: number /*
             * Width restriction in metres.
             * Format: float
             * @example 5.6
             */;
            width?: number /*
             * Height restriction in metres.
             * Format: float
             * @example 4.2
             */;
            height?: number /*
             * Axleload restriction in tons.
             * Format: float
             * @example 50
             */;
            axleload?: number /*
             * Weight restriction in tons.
             * Format: float
             * @example 40
             */;
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
              | "impassable" /*
             * Specifies the maximum height of the sloped curb in metres. Values are `0.03`, `0.06` (default), `0.1`.
             * Format: float
             */;
            maximum_sloped_kerb?: number /*
             * Specifies the maximum incline as a percentage. `3`, `6` (default), `10`, `15.
             * Format: int32
             */;
            maximum_incline?: number /*
             * Specifies the minimum width of the footway in metres.
             * Format: float
             * @example 2.5
             */;
            minimum_width?: number;
          } /*
           * Specifies whether to enforce that only ways with known information on surface quality be taken into account - default false
           * @example true
           */;
          surface_quality_known?: boolean /*
           * Specifies if ways that might not be suitable (e.g. unknown pedestrian usage) should be included in finding routes - default false
           * @example true
           */;
          allow_unsuitable?: boolean;
        };
        /* Comprises areas to be avoided for the route. Formatted in GeoJSON as either a Polygon or Multipolygon object. */
        avoid_polygons?: {
          empty?: boolean;
          /* Comprises areas to be avoided for the route. Formatted in GeoJSON as either a Polygon or Multipolygon object. */
          [key: string]: {};
        } /*
         * Specifies the parameters for generating round trip routes.
         * @example [object Object]
         */;
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
      /* Specifies the area unit.
Default: m.  */
      area_units?: "m" | "km" | "mi";
      /* Specifies whether to return intersecting polygons.  */
      intersections?: boolean /*
       * List of isochrones attributes
       * @example area
       */;
      attributes?: Array<"area" | "reachfactor" | "total_pop"> /*
       * Interval of isochrones or equidistants. This is only used if a single range value is given. Value in **seconds** for time and **meters** for distance.
       * Format: double
       * @example 30
       */;
      interval?: number /*
 * Applies a level of generalisation to the isochrone polygons generated as a `smoothing_factor` between `0` and `100.0`.
Generalisation is produced by determining a maximum length of a connecting line between two points found on the outside of a containing polygon.
If the distance is larger than a threshold value, the line between the two points is removed and a smaller connecting line between other points is used.
Note that the minimum length of this connecting line is ~1333m, and so when the `smoothing_factor` results in a distance smaller than this, the minimum value is used.
The threshold value is determined as `(maximum_radius_of_isochrone / 100) * smoothing_factor`.
Therefore, a value closer to 100 will result in a more generalised shape.
The polygon generation algorithm is based on Duckham and al. (2008) `"Efficient generation of simple polygons for characterizing the shape of a set of points in the plane."`
 * Format: double
 * @example 25
 */;
      smoothing?: number;
    };
    /* Information about the openrouteservice engine used */
    engine?: {
      /*
       * The backend version of the openrouteservice that was queried
       * @example 8.0
       */
      version?: string /*
       * The date that the service was last updated
       * @example 2019-02-07T14:28:11Z
       */;
      build_date?: string /*
       * The date that the graph data was last updated
       * @example 2019-02-07T14:28:11Z
       */;
      graph_date?: string;
    } /*
     * System message
     * @example A message string configured in the service
     */;
    system_message?: string;
  };
  /* The request payload */
  graphExportService: {
    /*
     * The bounding box to use for the request as an array of `longitude/latitude` pairs
     * @example 6.501,46.0916,6.5025,46.0839
     */
    bbox: Array<Array<number>> /*
     * Arbitrary identification string of the request reflected in the meta information.
     * @example export_request
     */;
    id?: string;
  };
  /* Informs about possible difficulties like access restrictions on the generated route. Generates a corresponding `extras` object with the affected segments. */
  JSONWarning: {
    /*
     * Identification code for the warning
     * Format: int32
     * @example 1
     */
    code?: number /*
     * The message associated with the warning
     * @example This route may go over restricted roads
     */;
    message?: string;
  };
  JsonEdge: {
    /*
     * Id of the start point of the edge
     * Format: int32
     * @example 1
     */
    fromId?: number /*
     * Id of the end point of the edge
     * Format: int32
     * @example 2
     */;
    toId?: number /*
     * Weight of the corresponding edge in the given bounding box
     * Format: double
     * @example 123.45
     */;
    weight?: number;
  };
  JsonEdgeExtra: {
    /*
     * Id of the corresponding edge in the graph
     * @example 1
     */
    edgeId?: string /*
     * Extra info stored on the edge
     * @example [object Object]
     */;
    extra?: {};
  };
  /* The Export Response contains nodes and edge weights from the requested BBox */
  JsonExportResponse: {
    nodes?: Array<{
      /*
       * Id of the corresponding node in the graph
       * Format: int32
       * @example 1
       */
      nodeId?: number /*
       * {longitude},{latitude} coordinates of the closest accessible point on the routing graph
       * @example 8.678962,49.40783
       */;
      location?: Array<number>;
    }>;
    edges?: Array<{
      /*
       * Id of the start point of the edge
       * Format: int32
       * @example 1
       */
      fromId?: number /*
       * Id of the end point of the edge
       * Format: int32
       * @example 2
       */;
      toId?: number /*
       * Weight of the corresponding edge in the given bounding box
       * Format: double
       * @example 123.45
       */;
      weight?: number;
    }>;
    edges_extra?: Array<{
      /*
       * Id of the corresponding edge in the graph
       * @example 1
       */
      edgeId?: string /*
       * Extra info stored on the edge
       * @example [object Object]
       */;
      extra?: {};
    }>;
    /* Informs about possible difficulties like access restrictions on the generated route. Generates a corresponding `extras` object with the affected segments. */
    warning?: {
      /*
       * Identification code for the warning
       * Format: int32
       * @example 1
       */
      code?: number /*
       * The message associated with the warning
       * @example This route may go over restricted roads
       */;
      message?: string;
    };
    /* Format: int64 */
    nodes_count?: number;
    /* Format: int64 */
    edges_count?: number;
  };
  JsonNode: {
    /*
     * Id of the corresponding node in the graph
     * Format: int32
     * @example 1
     */
    nodeId?: number /*
     * {longitude},{latitude} coordinates of the closest accessible point on the routing graph
     * @example 8.678962,49.40783
     */;
    location?: Array<number>;
  } /*
   * Specifies whether alternative routes are computed, and parameters for the algorithm determining suitable alternatives.
   * @example [object Object]
   */;
  alternativeRoutes: {
    /*
     * Target number of alternative routes to compute. Service returns up to this number of routes that fulfill the share-factor and weight-factor constraints.
     * Format: int32
     * @example 2
     */
    target_count?: number /*
     * Maximum factor by which route weight may diverge from the optimal route. The default value of 1.4 means alternatives can be up to 1.4 times longer (costly) than the optimal route.
     * Format: double
     * @example 1.4
     */;
    weight_factor?: number /*
     * Maximum fraction of the route that alternatives may share with the optimal route. The default value of 0.6 means alternatives can share up to 60% of path segments with the optimal route.
     * Format: double
     * @example 0.6
     */;
    share_factor?: number;
  };
  /* The JSON body request sent to the routing service which defines options and parameters regarding the route to generate. */
  directionsService: {
    /*
     * The waypoints to use for the route as an array of `longitude/latitude` pairs in WGS 84 (EPSG:4326)
     * @example 6.501,46.0916,6.5025,46.0839,6.5058,46.0762
     */
    coordinates: Array<Array<number>> /*
     * Arbitrary identification string of the request reflected in the meta information.
     * @example my_request
     */;
    id?: string;
    /* Specifies the route preference */
    preference?: "fastest" | "shortest" | "recommended";
    /* Specifies the distance unit. */
    units?: "m" | "km" | "mi";
    /* Language for the route instructions. */
    language?: Language;
    /* Specifies whether to return geometry.  */
    geometry?: boolean;
    /* Specifies whether to return instructions. */
    instructions?: boolean;
    /* Select html for more verbose instructions. */
    instructions_format?: "html" | "text";
    /* Provides bearings of the entrance and all passed roundabout exits. Adds the `exit_bearings` array to the step object in the response.  */
    roundabout_exits?: boolean /*
     * List of route attributes
     * @example avgspeed,percentage
     */;
    attributes?: Array<"avgspeed" | "detourfactor" | "percentage">;
    /* Specifies whether the maneuver object is included into the step object or not.  */
    maneuvers?: boolean /*
     * A list of maximum distances (measured in metres) that limit the search of nearby road segments to every given waypoint. The values must be greater than 0, the value of -1 specifies using the maximum possible search radius. The number of radiuses correspond to the number of waypoints. If only a single value is given, it will be applied to all waypoints.
     * @example 200,-1,30
     */;
    radiuses?: Array<number> /*
 * Specifies a list of pairs (bearings and deviations) to filter the segments of the road network a waypoint can snap to.
"For example `bearings=[[45,10],[120,20]]`.
"Each pair is a comma-separated list that can consist of one or two float values, where the first value is the bearing and the second one is the allowed deviation from the bearing.
"The bearing can take values between `0` and `360` clockwise from true north. If the deviation is not set, then the default value of `100` degrees is used.
"The number of pairs must correspond to the number of waypoints.
"The number of bearings corresponds to the length of waypoints-1 or waypoints. If the bearing information for the last waypoint is given, then this will control the sector from which the destination waypoint may be reached.
"You can skip a bearing for a certain waypoint by passing an empty value for an array, e.g. `[30,20],[],[40,20]`.
 * @example 30,20,,40,20
 */;
    bearings?: Array<Array<number>>;
    /* Forces the route to keep going straight at waypoints restricting uturns there even if it would be faster. */
    continue_straight?: boolean;
    /* Specifies whether to return elevation values for points. Please note that elevation also gets encoded for json response encoded polyline. */
    elevation?: boolean /*
     * The extra info items to include in the response
     * @example waytype,surface
     */;
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
    > /*
     * Advanced options for routing
     * @example [object Object]
     */;
    options?: {
      /*
       * List of features to avoid.
       * @example highways
       */
      avoid_features?: Array<"highways" | "tollways" | "ferries" | "fords" | "steps"> /*
       * Specify which type of border crossing to avoid
       * @example controlled
       */;
      avoid_borders?: "all" | "controlled" | "none" /*
       * List of countries to exclude from matrix with `driving-*` profiles. Can be used together with `'avoid_borders': 'controlled'`. `[ 11, 193 ]` would exclude Austria and Switzerland. List of countries and application examples can be found [here](https://GIScience.github.io/openrouteservice/documentation/routing-options/Country-List.html). Also, ISO standard country codes cna be used in place of the numerical ids, for example, DE or DEU for Germany.
       * @example 11,193
       */;
      avoid_countries?: Array<string>;
      /* Definition of the vehicle type. */
      vehicle_type?: "hgv" | "bus" | "agricultural" | "delivery" | "forestry" | "goods" | "unknown";
      /* Specifies additional routing parameters. For all profiles except `driving-car`. */
      profile_params?: {
        /* Describe additional weightings to be applied to edges on the routing. */
        weightings?: {
          /*
 * Specifies the fitness level for `cycling-*` profiles.

 level: 0 = Novice, 1 = Moderate, 2 = Amateur, 3 = Pro. The prefered gradient increases with level.
 * Format: int32
 * @example 2
 */
          steepness_difficulty?: number /*
 * Specifies the Green factor for `foot-*` profiles.

factor: Multiplication factor range from 0 to 1. 0 is the green routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer ways through green areas over a shorter route.
 * Format: float
 * @example 0.4
 */;
          green?: number /*
 * Specifies the Quiet factor for foot-* profiles.

factor: Multiplication factor range from 0 to 1. 0 is the quiet routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer quiet ways over a shorter route.
 * Format: float
 * @example 0.8
 */;
          quiet?: number /*
 * Specifies the shadow factor for `foot-*` profiles.

factor: Multiplication factor range from 0 to 1. 0 is the shadow routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer ways through shadow areas over a shorter route.
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
          length?: number /*
           * Width restriction in metres.
           * Format: float
           * @example 5.6
           */;
          width?: number /*
           * Height restriction in metres.
           * Format: float
           * @example 4.2
           */;
          height?: number /*
           * Axleload restriction in tons.
           * Format: float
           * @example 50
           */;
          axleload?: number /*
           * Weight restriction in tons.
           * Format: float
           * @example 40
           */;
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
            | "impassable" /*
           * Specifies the maximum height of the sloped curb in metres. Values are `0.03`, `0.06` (default), `0.1`.
           * Format: float
           */;
          maximum_sloped_kerb?: number /*
           * Specifies the maximum incline as a percentage. `3`, `6` (default), `10`, `15.
           * Format: int32
           */;
          maximum_incline?: number /*
           * Specifies the minimum width of the footway in metres.
           * Format: float
           * @example 2.5
           */;
          minimum_width?: number;
        } /*
         * Specifies whether to enforce that only ways with known information on surface quality be taken into account - default false
         * @example true
         */;
        surface_quality_known?: boolean /*
         * Specifies if ways that might not be suitable (e.g. unknown pedestrian usage) should be included in finding routes - default false
         * @example true
         */;
        allow_unsuitable?: boolean;
      };
      /* Comprises areas to be avoided for the route. Formatted in GeoJSON as either a Polygon or Multipolygon object. */
      avoid_polygons?: {
        empty?: boolean;
        /* Comprises areas to be avoided for the route. Formatted in GeoJSON as either a Polygon or Multipolygon object. */
        [key: string]: {};
      } /*
       * Specifies the parameters for generating round trip routes.
       * @example [object Object]
       */;
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
    geometry_simplify?: boolean /*
     * Specifies the segments that should be skipped in the route calculation. A segment is the connection between two given coordinates and the counting starts with 1 for the connection between the first and second coordinate.
     * @example 2,4
     */;
    skip_segments?: Array<number> /*
     * Specifies whether alternative routes are computed, and parameters for the algorithm determining suitable alternatives.
     * @example [object Object]
     */;
    alternative_routes?: {
      /*
       * Target number of alternative routes to compute. Service returns up to this number of routes that fulfill the share-factor and weight-factor constraints.
       * Format: int32
       * @example 2
       */
      target_count?: number /*
       * Maximum factor by which route weight may diverge from the optimal route. The default value of 1.4 means alternatives can be up to 1.4 times longer (costly) than the optimal route.
       * Format: double
       * @example 1.4
       */;
      weight_factor?: number /*
       * Maximum fraction of the route that alternatives may share with the optimal route. The default value of 0.6 means alternatives can share up to 60% of path segments with the optimal route.
       * Format: double
       * @example 0.6
       */;
      share_factor?: number;
    } /*
     * The maximum speed specified by user.
     * Format: double
     * @example 90
     */;
    maximum_speed?: number /*
     * If true, return a public transport schedule starting at <departure> for the next <schedule_duration> minutes.
     * @example true
     */;
    schedule?: boolean /*
     * The time window when requesting a public transport schedule. The format is passed as ISO 8601 duration: https://en.wikipedia.org/wiki/ISO_8601#Durations
     * @example PT30M
     */;
    schedule_duration?: string /*
     * The maximum amount of entries that should be returned when requesting a schedule.
     * Format: int32
     * @example 3
     */;
    schedule_rows?: number /*
     * Maximum duration for walking access and egress of public transport. The value is passed in ISO 8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
     * @example PT30M
     */;
    walking_time?: string /*
     * Specifies if transfers as criterion should be ignored.
     * @example true
     */;
    ignore_transfers?: boolean;
  };
  /* An object representing one of the extra info items requested */
  JSONExtra: {
    /*
 * A list of values representing a section of the route. The individual values are:
Value 1: Indice of the staring point of the geometry for this section,
Value 2: Indice of the end point of the geoemetry for this sections,
Value 3: [Value](https://GIScience.github.io/openrouteservice/documentation/extra-info/Extra-Info.html) assigned to this section.
 * @example 0,3,26,3,10,12
 */
    values?: Array<Array<number>>;
    /* List representing the summary of the extra info items. */
    summary?: Array<{
      /*
       * [Value](https://GIScience.github.io/openrouteservice/documentation/extra-info/Extra-Info.html) of a info category.
       * Format: double
       * @example 5
       */
      value?: number /*
       * Cumulative distance of this value.
       * Format: double
       * @example 123.1
       */;
      distance?: number /*
       * Category percentage of the entire route.
       * Format: double
       * @example 23.8
       */;
      amount?: number;
    }>;
  };
  /* List representing the summary of the extra info items. */
  JSONExtraSummary: {
    /*
     * [Value](https://GIScience.github.io/openrouteservice/documentation/extra-info/Extra-Info.html) of a info category.
     * Format: double
     * @example 5
     */
    value?: number /*
     * Cumulative distance of this value.
     * Format: double
     * @example 123.1
     */;
    distance?: number /*
     * Category percentage of the entire route.
     * Format: double
     * @example 23.8
     */;
    amount?: number;
  };
  /* Leg of a route */
  JSONLeg: {
    /*
     * The type of the leg, possible values are currently 'walk' and 'pt'.
     * @example pt
     */
    type?: string /*
     * The departure location of the leg.
     * @example Dossenheim, Süd Bstg G1
     */;
    departure_location?: string /*
     * The headsign of the public transport vehicle of the leg.
     * @example Bismarckplatz - Speyererhof - EMBL - Boxberg - Mombertplatz
     */;
    trip_headsign?: string /*
     * The public transport route name of the leg.
     * @example RNV Bus 39A
     */;
    route_long_name?: string /*
     * The public transport route name (short version) of the leg.
     * @example 39A
     */;
    route_short_name?: string /*
     * The route description of the leg (if provided in the GTFS data set).
     * @example Bus
     */;
    route_desc?: string /*
     * The route type of the leg (if provided in the GTFS data set).
     * Format: int32
     * @example 1
     */;
    route_type?: number /*
     * The distance for the leg in metres.
     * Format: double
     * @example 245
     */;
    distance?: number /*
     * The duration for the leg in seconds.
     * Format: double
     * @example 96.2
     */;
    duration?: number /*
     * Departure date and time
     * Format: date-time
     * @example 2020-01-31T12:45:00+01:00
     */;
    departure?: string /*
     * Arrival date and time
     * Format: date-time
     * @example 2020-01-31T13:15:00+01:00
     */;
    arrival?: string /*
     * The feed ID this public transport leg based its information from.
     * @example gtfs_0
     */;
    feed_id?: string /*
     * The trip ID of this public transport leg.
     * @example trip_id: vrn-19-39A-1-2-21-H-8-Special-50-42
     */;
    trip_id?: string /*
     * The route ID of this public transport leg.
     * @example vrn-19-39A-1
     */;
    route_id?: string;
    /* Whether the legs continues in the same vehicle as the previous one. */
    is_in_same_vehicle_as_previous?: boolean /*
     * The geometry of the leg. This is an encoded polyline.
     * @example yuqlH{i~s@gaUe@VgEQFcBRbB_C
     */;
    geometry?: string;
    /* List containing the specific steps the segment consists of. */
    instructions?: Array<{
      /*
       * The distance for the step in metres.
       * Format: double
       * @example 245
       */
      distance?: number /*
       * The duration for the step in seconds.
       * Format: double
       * @example 96.2
       */;
      duration?: number /*
       * The [instruction](https://GIScience.github.io/openrouteservice/documentation/Instruction-Types.html) action for symbolisation purposes.
       * Format: int32
       * @example 1
       */;
      type?: number /*
       * The routing instruction text for the step.
       * @example Turn right onto Berliner Straße
       */;
      instruction?: string /*
       * The name of the next street.
       * @example Berliner Straße
       */;
      name?: string /*
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
      way_points?: Array<number>;
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
    }>;
    /* List containing the stops the along the leg. */
    stops?: Array<{
      /*
       * The ID of the stop.
       * @example de:08221:1138:0:O
       */
      stop_id?: string /*
       * The name of the stop.
       * @example Heidelberg, Alois-Link-Platz
       */;
      name?: string /*
       * The location of the stop.
       * @example 8.6912542,49.399979
       */;
      location?: Array<number> /*
       * Arrival time of the stop.
       * Format: date-time
       * @example 2022-07-04T13:22:00Z
       */;
      arrival_time?: string /*
       * Planned arrival time of the stop.
       * Format: date-time
       * @example 2022-07-04T13:22:00Z
       */;
      planned_arrival_time?: string /*
       * Predicted arrival time of the stop.
       * Format: date-time
       * @example 2022-07-04T13:22:00Z
       */;
      predicted_arrival_time?: string;
      /* Whether arrival at the stop was cancelled. */
      arrival_cancelled?: boolean /*
       * Departure time of the stop.
       * Format: date-time
       * @example 2022-07-04T13:22:00Z
       */;
      departure_time?: string /*
       * Planned departure time of the stop.
       * Format: date-time
       * @example 2022-07-04T13:22:00Z
       */;
      planned_departure_time?: string /*
       * Predicted departure time of the stop.
       * Format: date-time
       * @example 2022-07-04T13:22:00Z
       */;
      predicted_departure_time?: string;
      /* Whether departure at the stop was cancelled. */
      departure_cancelled?: boolean;
    }>;
  };
  /* Stop of a public transport leg */
  JSONPtStop: {
    /*
     * The ID of the stop.
     * @example de:08221:1138:0:O
     */
    stop_id?: string /*
     * The name of the stop.
     * @example Heidelberg, Alois-Link-Platz
     */;
    name?: string /*
     * The location of the stop.
     * @example 8.6912542,49.399979
     */;
    location?: Array<number> /*
     * Arrival time of the stop.
     * Format: date-time
     * @example 2022-07-04T13:22:00Z
     */;
    arrival_time?: string /*
     * Planned arrival time of the stop.
     * Format: date-time
     * @example 2022-07-04T13:22:00Z
     */;
    planned_arrival_time?: string /*
     * Predicted arrival time of the stop.
     * Format: date-time
     * @example 2022-07-04T13:22:00Z
     */;
    predicted_arrival_time?: string;
    /* Whether arrival at the stop was cancelled. */
    arrival_cancelled?: boolean /*
     * Departure time of the stop.
     * Format: date-time
     * @example 2022-07-04T13:22:00Z
     */;
    departure_time?: string /*
     * Planned departure time of the stop.
     * Format: date-time
     * @example 2022-07-04T13:22:00Z
     */;
    planned_departure_time?: string /*
     * Predicted departure time of the stop.
     * Format: date-time
     * @example 2022-07-04T13:22:00Z
     */;
    predicted_departure_time?: string;
    /* Whether departure at the stop was cancelled. */
    departure_cancelled?: boolean;
  };
  /* List containing the segments and its correspoding steps which make up the route. */
  JSONSegment: {
    /*
     * Contains the distance of the segment in specified units.
     * Format: double
     * @example 253
     */
    distance?: number /*
     * Contains the duration of the segment in seconds.
     * Format: double
     * @example 37.7
     */;
    duration?: number;
    /* List containing the specific steps the segment consists of. */
    steps?: Array<{
      /*
       * The distance for the step in metres.
       * Format: double
       * @example 245
       */
      distance?: number /*
       * The duration for the step in seconds.
       * Format: double
       * @example 96.2
       */;
      duration?: number /*
       * The [instruction](https://GIScience.github.io/openrouteservice/documentation/Instruction-Types.html) action for symbolisation purposes.
       * Format: int32
       * @example 1
       */;
      type?: number /*
       * The routing instruction text for the step.
       * @example Turn right onto Berliner Straße
       */;
      instruction?: string /*
       * The name of the next street.
       * @example Berliner Straße
       */;
      name?: string /*
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
      way_points?: Array<number>;
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
    }> /*
     * Contains the deviation compared to a straight line that would have the factor `1`. Double the Distance would be a `2`.
     * Format: double
     * @example 0.5
     */;
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
    avgspeed?: number /*
     *  Contains ascent of this segment in metres.
     * Format: double
     * @example 56.3
     */;
    ascent?: number /*
     * Contains descent of this segment in metres.
     * Format: double
     * @example 45.2
     */;
    descent?: number;
  };
  /* Step of a route segment */
  JSONStep: {
    /*
     * The distance for the step in metres.
     * Format: double
     * @example 245
     */
    distance?: number /*
     * The duration for the step in seconds.
     * Format: double
     * @example 96.2
     */;
    duration?: number /*
     * The [instruction](https://GIScience.github.io/openrouteservice/documentation/Instruction-Types.html) action for symbolisation purposes.
     * Format: int32
     * @example 1
     */;
    type?: number /*
     * The routing instruction text for the step.
     * @example Turn right onto Berliner Straße
     */;
    instruction?: string /*
     * The name of the next street.
     * @example Berliner Straße
     */;
    name?: string /*
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
    way_points?: Array<number>;
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
  /* Maneuver object of the step */
  JSONStepManeuver: {
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
  /* Contains total sums of duration, route distance and actual distance of the route. */
  JSONSummary: {
    /*
     * Total route distance in specified units.
     * Format: double
     * @example 12.6
     */
    distance?: number /*
     * Total duration in seconds.
     * Format: double
     * @example 604
     */;
    duration?: number /*
     * Total ascent in meters.
     * Format: double
     * @example 166.3
     */;
    ascent?: number /*
     * Total descent in meters.
     * Format: double
     * @example 201.3
     */;
    descent?: number;
    /* Format: int32 */
    transfers?: number;
    /* Format: int32 */
    fare?: number;
  };
  gpx: { gpxRouteElements?: Array<{}> };
  rte: {};
  GeoJSONRouteResponse: {
    type: "FeatureCollection";
    /* Information about the request */
    metadata: {
      /*
       * ID of the request (as passed in by the query)
       * @example request123
       */
      id?: string /*
       * Copyright and attribution information
       * @example openrouteservice.org | OpenStreetMap contributors
       */;
      attribution: string /*
       * The MD5 hash of the OSM planet file that was used for generating graphs
       * @example c0327ba6
       */;
      osm_file_md5_hash?: string /*
       * The service that was requested
       * @example routing
       */;
      service: string /*
       * Time that the request was made (UNIX Epoch time)
       * Format: int64
       * @example 1549549847974
       */;
      timestamp: number;
      /* The JSON body request sent to the routing service which defines options and parameters regarding the route to generate. */
      query: {
        /*
         * The waypoints to use for the route as an array of `longitude/latitude` pairs in WGS 84 (EPSG:4326)
         * @example 6.501,46.0916,6.5025,46.0839,6.5058,46.0762
         */
        coordinates: Array<Array<number>> /*
         * Arbitrary identification string of the request reflected in the meta information.
         * @example my_request
         */;
        id?: string;
        /* Specifies the route preference */
        preference?: "fastest" | "shortest" | "recommended";
        /* Specifies the distance unit. */
        units?: "m" | "km" | "mi";
        /* Language for the route instructions. */
        language?: Language;
        /* Specifies whether to return geometry.  */
        geometry?: boolean;
        /* Specifies whether to return instructions. */
        instructions?: boolean;
        /* Select html for more verbose instructions. */
        instructions_format?: "html" | "text";
        /* Provides bearings of the entrance and all passed roundabout exits. Adds the `exit_bearings` array to the step object in the response.  */
        roundabout_exits?: boolean /*
         * List of route attributes
         * @example avgspeed,percentage
         */;
        attributes?: Array<"avgspeed" | "detourfactor" | "percentage">;
        /* Specifies whether the maneuver object is included into the step object or not.  */
        maneuvers?: boolean /*
         * A list of maximum distances (measured in metres) that limit the search of nearby road segments to every given waypoint. The values must be greater than 0, the value of -1 specifies using the maximum possible search radius. The number of radiuses correspond to the number of waypoints. If only a single value is given, it will be applied to all waypoints.
         * @example 200,-1,30
         */;
        radiuses?: Array<number> /*
 * Specifies a list of pairs (bearings and deviations) to filter the segments of the road network a waypoint can snap to.
"For example `bearings=[[45,10],[120,20]]`.
"Each pair is a comma-separated list that can consist of one or two float values, where the first value is the bearing and the second one is the allowed deviation from the bearing.
"The bearing can take values between `0` and `360` clockwise from true north. If the deviation is not set, then the default value of `100` degrees is used.
"The number of pairs must correspond to the number of waypoints.
"The number of bearings corresponds to the length of waypoints-1 or waypoints. If the bearing information for the last waypoint is given, then this will control the sector from which the destination waypoint may be reached.
"You can skip a bearing for a certain waypoint by passing an empty value for an array, e.g. `[30,20],[],[40,20]`.
 * @example 30,20,,40,20
 */;
        bearings?: Array<Array<number>>;
        /* Forces the route to keep going straight at waypoints restricting uturns there even if it would be faster. */
        continue_straight?: boolean;
        /* Specifies whether to return elevation values for points. Please note that elevation also gets encoded for json response encoded polyline. */
        elevation?: boolean /*
         * The extra info items to include in the response
         * @example waytype,surface
         */;
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
        > /*
         * Advanced options for routing
         * @example [object Object]
         */;
        options?: {
          /*
           * List of features to avoid.
           * @example highways
           */
          avoid_features?: Array<"highways" | "tollways" | "ferries" | "fords" | "steps"> /*
           * Specify which type of border crossing to avoid
           * @example controlled
           */;
          avoid_borders?: "all" | "controlled" | "none" /*
           * List of countries to exclude from matrix with `driving-*` profiles. Can be used together with `'avoid_borders': 'controlled'`. `[ 11, 193 ]` would exclude Austria and Switzerland. List of countries and application examples can be found [here](https://GIScience.github.io/openrouteservice/documentation/routing-options/Country-List.html). Also, ISO standard country codes cna be used in place of the numerical ids, for example, DE or DEU for Germany.
           * @example 11,193
           */;
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
            /* Describe additional weightings to be applied to edges on the routing. */
            weightings?: {
              /*
 * Specifies the fitness level for `cycling-*` profiles.

 level: 0 = Novice, 1 = Moderate, 2 = Amateur, 3 = Pro. The prefered gradient increases with level.
 * Format: int32
 * @example 2
 */
              steepness_difficulty?: number /*
 * Specifies the Green factor for `foot-*` profiles.

factor: Multiplication factor range from 0 to 1. 0 is the green routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer ways through green areas over a shorter route.
 * Format: float
 * @example 0.4
 */;
              green?: number /*
 * Specifies the Quiet factor for foot-* profiles.

factor: Multiplication factor range from 0 to 1. 0 is the quiet routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer quiet ways over a shorter route.
 * Format: float
 * @example 0.8
 */;
              quiet?: number /*
 * Specifies the shadow factor for `foot-*` profiles.

factor: Multiplication factor range from 0 to 1. 0 is the shadow routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer ways through shadow areas over a shorter route.
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
              length?: number /*
               * Width restriction in metres.
               * Format: float
               * @example 5.6
               */;
              width?: number /*
               * Height restriction in metres.
               * Format: float
               * @example 4.2
               */;
              height?: number /*
               * Axleload restriction in tons.
               * Format: float
               * @example 50
               */;
              axleload?: number /*
               * Weight restriction in tons.
               * Format: float
               * @example 40
               */;
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
                | "impassable" /*
               * Specifies the maximum height of the sloped curb in metres. Values are `0.03`, `0.06` (default), `0.1`.
               * Format: float
               */;
              maximum_sloped_kerb?: number /*
               * Specifies the maximum incline as a percentage. `3`, `6` (default), `10`, `15.
               * Format: int32
               */;
              maximum_incline?: number /*
               * Specifies the minimum width of the footway in metres.
               * Format: float
               * @example 2.5
               */;
              minimum_width?: number;
            } /*
             * Specifies whether to enforce that only ways with known information on surface quality be taken into account - default false
             * @example true
             */;
            surface_quality_known?: boolean /*
             * Specifies if ways that might not be suitable (e.g. unknown pedestrian usage) should be included in finding routes - default false
             * @example true
             */;
            allow_unsuitable?: boolean;
          };
          /* Comprises areas to be avoided for the route. Formatted in GeoJSON as either a Polygon or Multipolygon object. */
          avoid_polygons?: {
            empty?: boolean;
            /* Comprises areas to be avoided for the route. Formatted in GeoJSON as either a Polygon or Multipolygon object. */
            [key: string]: {};
          } /*
           * Specifies the parameters for generating round trip routes.
           * @example [object Object]
           */;
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
        geometry_simplify?: boolean /*
         * Specifies the segments that should be skipped in the route calculation. A segment is the connection between two given coordinates and the counting starts with 1 for the connection between the first and second coordinate.
         * @example 2,4
         */;
        skip_segments?: Array<number> /*
         * Specifies whether alternative routes are computed, and parameters for the algorithm determining suitable alternatives.
         * @example [object Object]
         */;
        alternative_routes?: {
          /*
           * Target number of alternative routes to compute. Service returns up to this number of routes that fulfill the share-factor and weight-factor constraints.
           * Format: int32
           * @example 2
           */
          target_count?: number /*
           * Maximum factor by which route weight may diverge from the optimal route. The default value of 1.4 means alternatives can be up to 1.4 times longer (costly) than the optimal route.
           * Format: double
           * @example 1.4
           */;
          weight_factor?: number /*
           * Maximum fraction of the route that alternatives may share with the optimal route. The default value of 0.6 means alternatives can share up to 60% of path segments with the optimal route.
           * Format: double
           * @example 0.6
           */;
          share_factor?: number;
        } /*
         * The maximum speed specified by user.
         * Format: double
         * @example 90
         */;
        maximum_speed?: number /*
         * If true, return a public transport schedule starting at <departure> for the next <schedule_duration> minutes.
         * @example true
         */;
        schedule?: boolean /*
         * The time window when requesting a public transport schedule. The format is passed as ISO 8601 duration: https://en.wikipedia.org/wiki/ISO_8601#Durations
         * @example PT30M
         */;
        schedule_duration?: string /*
         * The maximum amount of entries that should be returned when requesting a schedule.
         * Format: int32
         * @example 3
         */;
        schedule_rows?: number /*
         * Maximum duration for walking access and egress of public transport. The value is passed in ISO 8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
         * @example PT30M
         */;
        walking_time?: string /*
         * Specifies if transfers as criterion should be ignored.
         * @example true
         */;
        ignore_transfers?: boolean;
      };
      /* Information about the openrouteservice engine used */
      engine: {
        /*
         * The backend version of the openrouteservice that was queried
         * @example 8.0
         */
        version: string /*
         * The date that the service was last updated
         * @example 2019-02-07T14:28:11Z
         */;
        build_date: string /*
         * The date that the graph data was last updated
         * @example 2019-02-07T14:28:11Z
         */;
        graph_date: string;
      } /*
       * System message
       * @example A message string configured in the service
       */;
      system_message?: string;
    };
    features: Feature<LineString, RouteProperties>[];
    /*
     * Bounding box that covers all returned routes
     * @example 46.1336,6.4245,46.0547,6.5603
     */
    bbox?: Array<number>;
  };
};

export type APIEndpoints = {
  "/v2/matrix/{profile}": {
    responses: { post: null };
    requests: {
      method: "post";
      urlParams: {
        profile:
          | "driving-car"
          | "driving-hgv"
          | "cycling-regular"
          | "cycling-road"
          | "cycling-mountain"
          | "cycling-electric"
          | "foot-walking"
          | "foot-hiking"
          | "wheelchair"
          | "public-transport";
      };
      body: {
        /*
         * List of comma separated lists of `longitude,latitude` coordinates in WGS 84 (EPSG:4326)
         * @example 9.70093,48.477473,9.207916,49.153868,37.573242,55.801281,115.663757,38.106467
         */
        locations: Array<Array<number>> /*
         * Arbitrary identification string of the request reflected in the meta information.
         * @example my_request
         */;
        id?: string;
        /* A list of indices that refers to the list of locations (starting with `0`). `{index_1},{index_2}[,{index_N} ...]` or `all` (default). example `[0,3]` for the first and fourth locations  */
        sources?: Array<string>;
        /* A list of indices that refers to the list of locations (starting with `0`). `{index_1},{index_2}[,{index_N} ...]` or `all` (default). `[0,3]` for the first and fourth locations  */
        destinations?: Array<string>;
        /* Specifies a list of returned metrics.
"* `distance` - Returns distance matrix for specified points in defined `units`.
* `duration` - Returns duration matrix for specified points in **seconds**.
 */
        metrics?: Array<"distance" | "duration">;
        /* Specifies whether given locations are resolved or not. If the parameter value set to `true`, every element in `destinations` and `sources` will contain a `name` element that identifies the name of the closest street. Default is `false`.  */
        resolve_locations?: boolean;
        /* Specifies the distance unit.
Default: m. */
        units?: "m" | "km" | "mi";
      };
    };
  };
  "/v2/isochrones/{profile}": {
    responses: { post: null };
    requests: {
      method: "post";
      urlParams: {
        profile:
          | "driving-car"
          | "driving-hgv"
          | "cycling-regular"
          | "cycling-road"
          | "cycling-mountain"
          | "cycling-electric"
          | "foot-walking"
          | "foot-hiking"
          | "wheelchair"
          | "public-transport";
      };
      body: {
        /*
         * Arbitrary identification string of the request reflected in the meta information.
         * @example my_request
         */
        id?: string /*
         * The locations to use for the route as an array of `longitude/latitude` pairs in WGS 84 (EPSG:4326)
         * @example 6.501,46.0916,6.5025,46.0839
         */;
        locations: Array<Array<number>>;
        /* `start` treats the location(s) as starting point, `destination` as goal. */
        location_type?: "start" | "destination" /*
         * Maximum range value of the analysis in **seconds** for time and **metres** for distance.Alternatively a comma separated list of specific range values. Ranges will be the same for all locations.
         * @example 300,200
         */;
        range: Array<number>;
        /* Specifies the isochrones reachability type. */
        range_type?: "time" | "distance";
        /* Specifies the distance units only if `range_type` is set to distance.
Default: m.  */
        units?: "m" | "km" | "mi" /*
         * Advanced options for routing
         * @example [object Object]
         */;
        options?: {
          /*
           * List of features to avoid.
           * @example highways
           */
          avoid_features?: Array<"highways" | "tollways" | "ferries" | "fords" | "steps"> /*
           * Specify which type of border crossing to avoid
           * @example controlled
           */;
          avoid_borders?: "all" | "controlled" | "none" /*
           * List of countries to exclude from matrix with `driving-*` profiles. Can be used together with `'avoid_borders': 'controlled'`. `[ 11, 193 ]` would exclude Austria and Switzerland. List of countries and application examples can be found [here](https://GIScience.github.io/openrouteservice/documentation/routing-options/Country-List.html). Also, ISO standard country codes cna be used in place of the numerical ids, for example, DE or DEU for Germany.
           * @example 11,193
           */;
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
            /* Describe additional weightings to be applied to edges on the routing. */
            weightings?: {
              /*
 * Specifies the fitness level for `cycling-*` profiles.

 level: 0 = Novice, 1 = Moderate, 2 = Amateur, 3 = Pro. The prefered gradient increases with level.
 * Format: int32
 * @example 2
 */
              steepness_difficulty?: number /*
 * Specifies the Green factor for `foot-*` profiles.

factor: Multiplication factor range from 0 to 1. 0 is the green routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer ways through green areas over a shorter route.
 * Format: float
 * @example 0.4
 */;
              green?: number /*
 * Specifies the Quiet factor for foot-* profiles.

factor: Multiplication factor range from 0 to 1. 0 is the quiet routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer quiet ways over a shorter route.
 * Format: float
 * @example 0.8
 */;
              quiet?: number /*
 * Specifies the shadow factor for `foot-*` profiles.

factor: Multiplication factor range from 0 to 1. 0 is the shadow routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer ways through shadow areas over a shorter route.
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
              length?: number /*
               * Width restriction in metres.
               * Format: float
               * @example 5.6
               */;
              width?: number /*
               * Height restriction in metres.
               * Format: float
               * @example 4.2
               */;
              height?: number /*
               * Axleload restriction in tons.
               * Format: float
               * @example 50
               */;
              axleload?: number /*
               * Weight restriction in tons.
               * Format: float
               * @example 40
               */;
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
                | "impassable" /*
               * Specifies the maximum height of the sloped curb in metres. Values are `0.03`, `0.06` (default), `0.1`.
               * Format: float
               */;
              maximum_sloped_kerb?: number /*
               * Specifies the maximum incline as a percentage. `3`, `6` (default), `10`, `15.
               * Format: int32
               */;
              maximum_incline?: number /*
               * Specifies the minimum width of the footway in metres.
               * Format: float
               * @example 2.5
               */;
              minimum_width?: number;
            } /*
             * Specifies whether to enforce that only ways with known information on surface quality be taken into account - default false
             * @example true
             */;
            surface_quality_known?: boolean /*
             * Specifies if ways that might not be suitable (e.g. unknown pedestrian usage) should be included in finding routes - default false
             * @example true
             */;
            allow_unsuitable?: boolean;
          };
          /* Comprises areas to be avoided for the route. Formatted in GeoJSON as either a Polygon or Multipolygon object. */
          avoid_polygons?: {
            empty?: boolean;
            /* Comprises areas to be avoided for the route. Formatted in GeoJSON as either a Polygon or Multipolygon object. */
            [key: string]: {};
          } /*
           * Specifies the parameters for generating round trip routes.
           * @example [object Object]
           */;
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
        /* Specifies the area unit.
Default: m.  */
        area_units?: "m" | "km" | "mi";
        /* Specifies whether to return intersecting polygons.  */
        intersections?: boolean /*
         * List of isochrones attributes
         * @example area
         */;
        attributes?: Array<"area" | "reachfactor" | "total_pop"> /*
         * Interval of isochrones or equidistants. This is only used if a single range value is given. Value in **seconds** for time and **meters** for distance.
         * Format: double
         * @example 30
         */;
        interval?: number /*
 * Applies a level of generalisation to the isochrone polygons generated as a `smoothing_factor` between `0` and `100.0`.
Generalisation is produced by determining a maximum length of a connecting line between two points found on the outside of a containing polygon.
If the distance is larger than a threshold value, the line between the two points is removed and a smaller connecting line between other points is used.
Note that the minimum length of this connecting line is ~1333m, and so when the `smoothing_factor` results in a distance smaller than this, the minimum value is used.
The threshold value is determined as `(maximum_radius_of_isochrone / 100) * smoothing_factor`.
Therefore, a value closer to 100 will result in a more generalised shape.
The polygon generation algorithm is based on Duckham and al. (2008) `"Efficient generation of simple polygons for characterizing the shape of a set of points in the plane."`
 * Format: double
 * @example 25
 */;
        smoothing?: number;
      };
    };
  };
  "/v2/directions/{profile}/geojson": {
    responses: { post: APISchemas["GeoJSONRouteResponse"] };
    requests: {
      method: "post";
      urlParams: {
        profile:
          | "driving-car"
          | "driving-hgv"
          | "cycling-regular"
          | "cycling-road"
          | "cycling-mountain"
          | "cycling-electric"
          | "foot-walking"
          | "foot-hiking"
          | "wheelchair"
          | "public-transport";
      };
      body: {
        /*
         * The waypoints to use for the route as an array of `longitude/latitude` pairs in WGS 84 (EPSG:4326)
         * @example 6.501,46.0916,6.5025,46.0839,6.5058,46.0762
         */
        coordinates: Array<Array<number>> /*
         * Arbitrary identification string of the request reflected in the meta information.
         * @example my_request
         */;
        id?: string;
        /* Specifies the route preference */
        preference?: "fastest" | "shortest" | "recommended";
        /* Specifies the distance unit. */
        units?: "m" | "km" | "mi";
        /* Language for the route instructions. */
        language?: Language;
        /* Specifies whether to return geometry.  */
        geometry?: boolean;
        /* Specifies whether to return instructions. */
        instructions?: boolean;
        /* Select html for more verbose instructions. */
        instructions_format?: "html" | "text";
        /* Provides bearings of the entrance and all passed roundabout exits. Adds the `exit_bearings` array to the step object in the response.  */
        roundabout_exits?: boolean /*
         * List of route attributes
         * @example avgspeed,percentage
         */;
        attributes?: Array<"avgspeed" | "detourfactor" | "percentage">;
        /* Specifies whether the maneuver object is included into the step object or not.  */
        maneuvers?: boolean /*
         * A list of maximum distances (measured in metres) that limit the search of nearby road segments to every given waypoint. The values must be greater than 0, the value of -1 specifies using the maximum possible search radius. The number of radiuses correspond to the number of waypoints. If only a single value is given, it will be applied to all waypoints.
         * @example 200,-1,30
         */;
        radiuses?: Array<number> /*
 * Specifies a list of pairs (bearings and deviations) to filter the segments of the road network a waypoint can snap to.
"For example `bearings=[[45,10],[120,20]]`.
"Each pair is a comma-separated list that can consist of one or two float values, where the first value is the bearing and the second one is the allowed deviation from the bearing.
"The bearing can take values between `0` and `360` clockwise from true north. If the deviation is not set, then the default value of `100` degrees is used.
"The number of pairs must correspond to the number of waypoints.
"The number of bearings corresponds to the length of waypoints-1 or waypoints. If the bearing information for the last waypoint is given, then this will control the sector from which the destination waypoint may be reached.
"You can skip a bearing for a certain waypoint by passing an empty value for an array, e.g. `[30,20],[],[40,20]`.
 * @example 30,20,,40,20
 */;
        bearings?: Array<Array<number>>;
        /* Forces the route to keep going straight at waypoints restricting uturns there even if it would be faster. */
        continue_straight?: boolean;
        /* Specifies whether to return elevation values for points. Please note that elevation also gets encoded for json response encoded polyline. */
        elevation?: boolean /*
         * The extra info items to include in the response
         * @example waytype,surface
         */;
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
        > /*
         * Advanced options for routing
         * @example [object Object]
         */;
        options?: {
          /*
           * List of features to avoid.
           * @example highways
           */
          avoid_features?: Array<"highways" | "tollways" | "ferries" | "fords" | "steps"> /*
           * Specify which type of border crossing to avoid
           * @example controlled
           */;
          avoid_borders?: "all" | "controlled" | "none" /*
           * List of countries to exclude from matrix with `driving-*` profiles. Can be used together with `'avoid_borders': 'controlled'`. `[ 11, 193 ]` would exclude Austria and Switzerland. List of countries and application examples can be found [here](https://GIScience.github.io/openrouteservice/documentation/routing-options/Country-List.html). Also, ISO standard country codes cna be used in place of the numerical ids, for example, DE or DEU for Germany.
           * @example 11,193
           */;
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
            /* Describe additional weightings to be applied to edges on the routing. */
            weightings?: {
              /*
 * Specifies the fitness level for `cycling-*` profiles.

 level: 0 = Novice, 1 = Moderate, 2 = Amateur, 3 = Pro. The prefered gradient increases with level.
 * Format: int32
 * @example 2
 */
              steepness_difficulty?: number /*
 * Specifies the Green factor for `foot-*` profiles.

factor: Multiplication factor range from 0 to 1. 0 is the green routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer ways through green areas over a shorter route.
 * Format: float
 * @example 0.4
 */;
              green?: number /*
 * Specifies the Quiet factor for foot-* profiles.

factor: Multiplication factor range from 0 to 1. 0 is the quiet routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer quiet ways over a shorter route.
 * Format: float
 * @example 0.8
 */;
              quiet?: number /*
 * Specifies the shadow factor for `foot-*` profiles.

factor: Multiplication factor range from 0 to 1. 0 is the shadow routing base factor without multiplying it by the manual factor and is already different from normal routing. 1 will prefer ways through shadow areas over a shorter route.
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
              length?: number /*
               * Width restriction in metres.
               * Format: float
               * @example 5.6
               */;
              width?: number /*
               * Height restriction in metres.
               * Format: float
               * @example 4.2
               */;
              height?: number /*
               * Axleload restriction in tons.
               * Format: float
               * @example 50
               */;
              axleload?: number /*
               * Weight restriction in tons.
               * Format: float
               * @example 40
               */;
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
                | "impassable" /*
               * Specifies the maximum height of the sloped curb in metres. Values are `0.03`, `0.06` (default), `0.1`.
               * Format: float
               */;
              maximum_sloped_kerb?: number /*
               * Specifies the maximum incline as a percentage. `3`, `6` (default), `10`, `15.
               * Format: int32
               */;
              maximum_incline?: number /*
               * Specifies the minimum width of the footway in metres.
               * Format: float
               * @example 2.5
               */;
              minimum_width?: number;
            } /*
             * Specifies whether to enforce that only ways with known information on surface quality be taken into account - default false
             * @example true
             */;
            surface_quality_known?: boolean /*
             * Specifies if ways that might not be suitable (e.g. unknown pedestrian usage) should be included in finding routes - default false
             * @example true
             */;
            allow_unsuitable?: boolean;
          };
          /* Comprises areas to be avoided for the route. Formatted in GeoJSON as either a Polygon or Multipolygon object. */
          avoid_polygons?: {
            empty?: boolean;
            /* Comprises areas to be avoided for the route. Formatted in GeoJSON as either a Polygon or Multipolygon object. */
            [key: string]: {};
          } /*
           * Specifies the parameters for generating round trip routes.
           * @example [object Object]
           */;
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
        geometry_simplify?: boolean /*
         * Specifies the segments that should be skipped in the route calculation. A segment is the connection between two given coordinates and the counting starts with 1 for the connection between the first and second coordinate.
         * @example 2,4
         */;
        skip_segments?: Array<number> /*
         * Specifies whether alternative routes are computed, and parameters for the algorithm determining suitable alternatives.
         * @example [object Object]
         */;
        alternative_routes?: {
          /*
           * Target number of alternative routes to compute. Service returns up to this number of routes that fulfill the share-factor and weight-factor constraints.
           * Format: int32
           * @example 2
           */
          target_count?: number /*
           * Maximum factor by which route weight may diverge from the optimal route. The default value of 1.4 means alternatives can be up to 1.4 times longer (costly) than the optimal route.
           * Format: double
           * @example 1.4
           */;
          weight_factor?: number /*
           * Maximum fraction of the route that alternatives may share with the optimal route. The default value of 0.6 means alternatives can share up to 60% of path segments with the optimal route.
           * Format: double
           * @example 0.6
           */;
          share_factor?: number;
        } /*
         * The maximum speed specified by user.
         * Format: double
         * @example 90
         */;
        maximum_speed?: number /*
         * If true, return a public transport schedule starting at <departure> for the next <schedule_duration> minutes.
         * @example true
         */;
        schedule?: boolean /*
         * The time window when requesting a public transport schedule. The format is passed as ISO 8601 duration: https://en.wikipedia.org/wiki/ISO_8601#Durations
         * @example PT30M
         */;
        schedule_duration?: string /*
         * The maximum amount of entries that should be returned when requesting a schedule.
         * Format: int32
         * @example 3
         */;
        schedule_rows?: number /*
         * Maximum duration for walking access and egress of public transport. The value is passed in ISO 8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
         * @example PT30M
         */;
        walking_time?: string /*
         * Specifies if transfers as criterion should be ignored.
         * @example true
         */;
        ignore_transfers?: boolean;
      };
    };
  };
  "/v2/status": { responses: { get: null }; requests: { method?: "get" } };
  "/v2/health": { responses: { get: null }; requests: { method?: "get" } };
  "/geocode/search": {
    responses: {
      get: {
        geocoding?: {};
        type?: string;
        features?: Array<{}>;
        bbox?: Array<number>;
      };
    };
    requests: {
      method?: "get";
      query: {
        api_key: string;
        text: string;
        /* Format: float */
        "focus.point.lon"?: number;
        /* Format: float */
        "focus.point.lat"?: number;
        /* Format: float */
        "boundary.rect.min_lon"?: number;
        /* Format: float */
        "boundary.rect.min_lat"?: number;
        /* Format: float */
        "boundary.rect.max_lon"?: number;
        /* Format: float */
        "boundary.rect.max_lat"?: number;
        /* Format: float */
        "boundary.circle.lon"?: number;
        /* Format: float */
        "boundary.circle.lat"?: number;
        /* Format: float */
        "boundary.circle.radius"?: number;
        "boundary.gid"?: string;
        "boundary.country"?: string;
        sources?: Array<"openstreetmap" | "openaddresses" | "whosonfirst" | "geonames">;
        layers?: Array<
          | "address"
          | "venue"
          | "neighbourhood"
          | "locality"
          | "borough"
          | "localadmin"
          | "county"
          | "macrocounty"
          | "region"
          | "macroregion"
          | "country"
          | "coarse"
        >;
        /* Format: int64 */
        size?: number;
      };
    };
  };
  "/geocode/search/structured": {
    responses: {
      get: {
        geocoding?: {};
        type?: string;
        features?: Array<{}>;
        bbox?: Array<number>;
      };
    };
    requests: {
      method?: "get";
      query: {
        api_key: string;
        address?: string;
        neighbourhood?: string;
        country?: string;
        postalcode?: string;
        region?: string;
        county?: string;
        locality?: string;
        borough?: string;
        /* Format: float */
        "focus.point.lon"?: number;
        /* Format: float */
        "focus.point.lat"?: number;
        /* Format: float */
        "boundary.rect.min_lon"?: number;
        /* Format: float */
        "boundary.rect.min_lat"?: number;
        /* Format: float */
        "boundary.rect.max_lon"?: number;
        /* Format: float */
        "boundary.rect.max_lat"?: number;
        /* Format: float */
        "boundary.circle.lon"?: number;
        /* Format: float */
        "boundary.circle.lat"?: number;
        /* Format: float */
        "boundary.circle.radius"?: number;
        "boundary.country"?: string;
        layers?: Array<
          | "address"
          | "venue"
          | "neighbourhood"
          | "locality"
          | "borough"
          | "localadmin"
          | "county"
          | "macrocounty"
          | "region"
          | "macroregion"
          | "country"
          | "coarse"
        >;
        sources?: Array<"openstreetmap" | "openaddresses" | "whosonfirst" | "geonames">;
        /* Format: int64 */
        size?: number;
      };
    };
  };
  "/geocode/reverse": {
    responses: {
      get: {
        geocoding?: {};
        type?: string;
        features?: Array<{}>;
        bbox?: Array<number>;
      };
    };
    requests: {
      method?: "get";
      query: {
        api_key: string;
        /* Format: float */
        "point.lon": number;
        /* Format: float */
        "point.lat": number;
        "boundary.circle.radius"?: number;
        /* Format: int64 */
        size?: number;
        layers?: Array<
          | "venue"
          | "address"
          | "street"
          | "neighbourhood"
          | "locality"
          | "borough"
          | "localadmin"
          | "county"
          | "macrocounty"
          | "region"
          | "macroregion"
          | "country"
          | "coarse"
        >;
        sources?: Array<"openstreetmap" | "openaddresses" | "whosonfirst" | "geonames">;
        "boundary.country"?: string;
      };
    };
  };
  "/pois": {
    responses: {
      /* The POI response GeoJSON FeatureCollection */
      post: {
        type?: string;
        features?: Array<{
          type?: string;
          geometry?: { type?: string; coordinates?: Array<number> };
          feature_properties?: {
            osm_id?: number;
            osm_type?: number;
            distance?: number;
            category_ids?: {
              category_id?: { category_name?: string; category_group?: number };
            };
            osm_tags?: {
              name?: string;
              address?: string;
              website?: string;
              opening_hours?: string;
              wheelchair?: string;
              distance?: string;
              fee?: string;
            };
          };
        }>;
      };
    };
    requests: {
      method: "post";
      body: {
        /*
 * Examples:
```
#### JSON bodies for POST requests
##### Pois around a buffered point
{
  "request": "pois",
  "geometry": {
    "bbox": [
      [8.8034, 53.0756],
      [8.7834, 53.0456]
    ],
    "geojson": {
      "type": "Point",
      "coordinates": [8.8034, 53.0756]
    },
    "buffer": 250
  }
}

##### Pois given categories
{
  "request": "pois",
  "geometry": {
    "bbox": [
      [8.8034, 53.0756],
      [8.7834, 53.0456]
    ],
    "geojson": {
      "type": "Point",
      "coordinates": [8.8034, 53.0756]
    },
    "buffer": 100
  },
  "limit": 200,
  "filters": {
    "category_ids": [180, 245]
  }
}

##### Pois given category groups
{
  "request": "pois",
  "geometry": {
    "bbox": [
      [8.8034, 53.0756],
      [8.7834, 53.0456]
    ],
    "geojson": {
      "type": "Point",
      "coordinates": [8.8034, 53.0756]
    },
    "buffer": 100
  },
  "limit": 200,
  "filters": {
    "category_group_ids": [160]
  }
}

##### Pois statistics
{
  "request": "stats",
  "geometry": {
    "bbox": [
      [8.8034, 53.0756],
      [8.7834, 53.0456]
    ],
    "geojson": {
      "type": "Point",
      "coordinates": [8.8034, 53.0756]
    },
    "buffer": 100
  }
}

##### Pois categories as a list
{
    "request": "list"
}
```

 * @example pois
 */
        request: "pois" | "stats" | "list";
        /* The geometry object which is a geojson or a bounding box object, optionally buffered. */
        geometry: {
          /*
           * Format: int64
           * @example 500
           */
          buffer?: number /*
           * The pattern for this bbox string is minlon,minlat,maxlon,maxlat
           * @example 53.075051,8.798952,53.080785,8.90716
           */;
          bbox?: Array<number>;
          /* This is a GeoJSON object. Is either Point, Polygon or LineString. */
          geojson?: {};
        } /*
         * Filters in terms of osm_tags which should be applied to the query.
         * @example {"fee":"no"}
         */;
        filters?: {
          /* @example 420 */
          category_group_ids?: Array<number>;
          /* @example 601,280 */
          category_ids?: Array<number> /*
           * Filter by name of the poi object.
           * @example Gas station,...
           */;
          name?: Array<string> /*
           * Filter example.
           * @example true,false,limited,designated
           */;
          wheelchair?: Array<string> /*
           * Filter example.
           * @example dedicated,true,false,separated,isolated,outside
           */;
          smoking?: Array<string> /*
           * Filter example.
           * @example true,false
           */;
          fee?: Array<string>;
        } /*
         * The limit of objects to be returned in the response.
         * Format: int64
         * @example 1000
         */;
        limit?: number /*
         * Either you can sort by category or the distance to the geometry object provided in the request.
         * @example category
         */;
        sortby?: "category" | "distance";
      };
    };
  };
  "/elevation/line": {
    responses: {
      post: {
        attribution?: string;
        version?: string;
        timestamp?: number;
        geometry?: { type?: string; coordinates?: Array<Array<number>> };
      };
    };
    requests: {
      method: "post";
      body: {
        /*
         * The input format the API has to expect.
         * @example encodedpolyline5
         */
        format_in: "geojson" | "polyline" | "encodedpolyline5" | "encodedpolyline6";
        /* The output format to be returned. */
        format_out?: "geojson" | "polyline" | "encodedpolyline5" | "encodedpolyline6";
        /* The elevation dataset to be used. */
        dataset?: "srtm" /*
 * * geojson: A geometry object of a LineString GeoJSON, e.g.
         {"type": "LineString",
          "coordinates": [[13.331302, 38.108433],[13.331273, 38.10849]]
         }
* polyline: A list of coordinate lists, e.g.
         [[13.331302, 38.108433], [13.331273, 38.10849]]

* encodedpolyline5: A <a href="https://developers.google.com/maps/documentation/utilities/polylinealgorithm">Google encoded polyline</a> with a coordinate precision of 5, e.g.
         u`rgFswjpAKD

* encodedpolyline6: A <a href="https://developers.google.com/maps/documentation/utilities/polylinealgorithm">Google encoded polyline</a> with a coordinate precision of 6, e.g.
         ap}tgAkutlXqBx@

 * @example u`rgFswjpAKD
 */;
        geometry: {};
      };
    };
  };
  "/elevation/point": {
    responses: {
      get: {
        attribution?: string;
        version?: string;
        timestamp?: number;
        geometry?: { type?: string; coordinates?: Array<number> };
      };
      post: {
        attribution?: string;
        version?: string;
        timestamp?: number;
        geometry?: { type?: string; coordinates?: Array<number> };
      };
    };
    requests:
      | {
          method?: "get";
          query: {
            api_key: string;
            geometry: Array<number>;
            format_out?: "geojson" | "point";
            dataset?: "srtm";
          };
        }
      | {
          method: "post";
          body: {
            /*
             * The input format the API has to expect.
             * @example point
             */
            format_in: "geojson" | "point";
            /* The output format to be returned. */
            format_out?: "geojson" | "point";
            /* The elevation dataset to be used. */
            dataset?: "srtm" /*
 * * geojson: A geometry object of a Point GeoJSON, e.g.
         {"type": "Point",
          "coordinates": [13.331273, 38.10849]
         }
* point: A coordinate list, e.g.
         [13.331273, 38.10849]

 * @example 13.331273,38.10849
 */;
            geometry: {};
          };
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
