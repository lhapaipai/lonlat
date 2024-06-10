export interface Town {
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
}

export type TownOption = Option & {
  label: string;
  value: string;
};

// @ts-ignore
import Fuse, { FuseResult } from "fuse.js";
import { Option } from "pentatrion-design";

export type FormattedItem<T> = T & {
  _formatted?: {
    [K in keyof T]?: any;
  };
};

// used only by prepareTownsResult
export function highlightFuseResult<T>(
  result: FuseResult<T>[],
): FormattedItem<T>[] {
  return result.map(({ item, matches }) => {
    const copy: FormattedItem<T> = { ...item, _formatted: {} };
    matches?.forEach(({ key, value, indices }: any) => {
      if (!key || !value) {
        return;
      }

      (copy as any)._formatted[key] = indices;
    });
    return copy;
  });
}

export function prepareTownsResult(towns: Town[], search: string) {
  const fuse = new Fuse(towns, {
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
    keys: ["nom_commune", "code_postal", "nom_departement", "context"],
  });

  const result = fuse.search(search);
  return highlightFuseResult(result);
}
