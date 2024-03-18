import { GeoFeature } from "pentatrion-geo";

export type Option = {
  value: string;
  label: string;
};

export type TownOption = Option & {
  insee: number;
  code_postal: number;
  latitude: number;
  longitude: number;
  nom_commune: string;
  code_departement: number;
  nom_departement: string;
  code_region: number;
  nom_region: string;
  context: string;
  population: number;
  icon: string;
  _formatted: {
    [key in string]: readonly RangeTuple[];
  };
};

export type GeoFeatureOption = Option & {
  feature: GeoFeature;
};
