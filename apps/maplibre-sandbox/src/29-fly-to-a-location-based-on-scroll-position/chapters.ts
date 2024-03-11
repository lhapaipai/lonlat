import { LngLatLike } from "maplibre-gl";

export type ChapterName = keyof typeof chapters;

export const chapters = {
  baker: {
    bearing: 27,
    center: [-0.15591514, 51.51830379] as LngLatLike,
    zoom: 15.5,
    pitch: 20,
  },
  aldgate: {
    duration: 6000,
    center: [-0.07571203, 51.51424049] as LngLatLike,
    bearing: 150,
    zoom: 15,
    pitch: 0,
  },
  "london-bridge": {
    bearing: 90,
    center: [-0.08533793, 51.50438536] as LngLatLike,
    zoom: 13,
    speed: 0.6,
    pitch: 40,
  },
  woolwich: {
    bearing: 90,
    center: [0.05991101, 51.48752939] as LngLatLike,
    zoom: 12.3,
  },
  gloucester: {
    bearing: 45,
    center: [-0.18335806, 51.49439521] as LngLatLike,
    zoom: 15.3,
    pitch: 20,
    speed: 0.5,
  },
  "caulfield-gardens": {
    bearing: 180,
    center: [-0.19684993, 51.5033856] as LngLatLike,
    zoom: 12.3,
  },
  telegraph: {
    bearing: 90,
    center: [-0.10669358, 51.51433123] as LngLatLike,
    zoom: 17.3,
    pitch: 40,
  },
  "charing-cross": {
    bearing: 90,
    center: [-0.12416858, 51.50779757] as LngLatLike,
    zoom: 14.3,
    pitch: 20,
  },
};
