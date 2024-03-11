import { MapEventType } from "maplibre-gl";

type Prettify<T> = {
  [K in keyof T]: T[K];
} & unknown;

type A = Prettify<keyof MapEventType>;
