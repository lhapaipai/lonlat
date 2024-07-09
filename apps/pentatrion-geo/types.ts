import {
  BBox,
  Feature,
  Geometry,
  GeometryCollection,
  LineString,
  Point,
} from "geojson";
import { NoDataOption } from "pentatrion-design";

export interface LngLatObj {
  lng: number;
  lat: number;
}

export type GeocodeType = AddressType | LonLatType;

export type AddressType =
  | "housenumber"
  | "street"
  | "locality"
  | "municipality"
  | "unknown";
export type LonLatType = "lonlat";
export type WaypointType =
  | "summit" // sommet
  | "pass" // col
  | "lake" // lac
  | "waterfall" // cascade
  | "locality" // lieu-dit (v5: vallon)
  | "bisse" // bisse
  | "canyon" // canyon
  | "access" // acces
  | "climbing_outdoor" // site d'escalade
  | "climbing_indoor" // S.A.E.
  | "hut" // refuge
  | "gite" // gite
  | "shelter" // abri
  | "bivouac" // bivouac
  | "camp_site" // camping
  | "base_camp" // camp de base
  | "local_product" // produit locaux
  | "paragliding_takeoff" // deco
  | "paragliding_landing" // attero
  | "cave" // grotte
  | "waterpoint" // point d'eau/source
  | "weather_station" // station meteo
  | "webcam" // webcam
  | "virtual" // sur-WP virtuel
  | "slackline_spot" //
  | "misc"; // divers

export type GeolocationType = "geolocation";

export type FeatureProperties<T extends string = string> = {
  /** id and label are required for <select /> like components */

  id: string;
  /** computed name + short context for input string */
  label: string;

  name: string;
  context: string | null;

  score: number;
  type: T;

  originalProperties?: any;
};

type GeometryWithCoordinates = Exclude<Geometry, GeometryCollection>;

export type GeoOption<
  G extends GeometryWithCoordinates | null = GeometryWithCoordinates,
  T extends string = string,
> = {
  id: string;
  type: "Feature";
  properties: FeatureProperties<T>;
  geometry: G;
  bbox?: BBox | undefined;
};

// Prepared data
export type AddressGeoOption = GeoOption<Point, AddressType>;
export type LonLatGeoOption = GeoOption<Point, LonLatType>;
export type MountainGeoOption = GeoOption<Point, WaypointType>;
export type GeolocationGeoOption = GeoOption<Point, GeolocationType>;
export type CustomGeoOption = GeoOption<Point>;
export type PoiGeoOption = GeoOption<Point>;

export type AppGeoOption =
  | AddressGeoOption
  | LonLatGeoOption
  | MountainGeoOption
  | GeolocationGeoOption
  | PoiGeoOption
  | CustomGeoOption;

export type GeoPointOption = GeoOption<Point>;

export type PoiFeatureCollectionResponse = {
  type: "FeatureCollection";
  features: PoiGeoOption[];
  referenceHash: string;
};

export type WayPoint = GeoPointOption | NoDataOption;

export type RouteProperties = {
  wayPoints: GeoPointOption[];
  profile: "car" | "pedestrian" | "bike";
  optimization: "shortest" | "fastest" | "recommended";
  timeUnit?: "hour" | "minute" | "second";
  distanceUnit?: "meter" | "kilometer";
  distance: number;
  duration: number;
  ascent?: number;
  descent?: number;
  resource: string;
  hash: string;
  minima?: number[];
  maxima?: number[];
};

export type RouteFeatureResponse = Feature<LineString, RouteProperties>;

export type IsochroneOptions = {
  costType: "time" | "distance";
  costValue: number;
  direction: "departure" | "arrival";
  profile: "car" | "pedestrian";
  constraints: {
    avoidHighways?: boolean;
    avoidBridges?: boolean;
    avoidTunnels?: boolean;
  };
};

export type DirectionOptions = {
  profile: RouteProperties["profile"];
  optimization: RouteProperties["optimization"];
  constraints: {
    avoidHighways?: boolean;
    avoidTollways?: boolean;
    avoidBridges?: boolean;
    avoidTunnels?: boolean;
    avoidBorders?: boolean;
  };
};
