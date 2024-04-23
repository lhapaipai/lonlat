import { BBox, Geometry, GeometryCollection, Point } from "geojson";
import { GeoOption } from "pentatrion-design";

export type LngLatObj = {
  lng: number;
  lat: number;
};

export type GeocodeType = AddressType | LonLatType;

export type AddressType = "housenumber" | "street" | "locality" | "municipality" | "unknown";
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

export type AppGeoOption = AddressGeoOption | LonLatGeoOption | MountainGeoOption;
export type GeoPointOption = GeoOption<Point>;
