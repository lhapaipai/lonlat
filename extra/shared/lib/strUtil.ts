import Fuse from "fuse.js";
import { Town } from "../types";

export function highlight(str: string | undefined, indices: readonly [number, number][]) {
  if (!str) {
    return str;
  }
  const includeLastChar = 1;
  return indices.reduce<[number, string]>(
    ([offset, str], indice) => {
      const [from, to] = [indice[0] + offset, indice[1] + offset + includeLastChar];

      // eslint-disable-next-line prettier/prettier
      const newStr = `${str.substring(0, from)}<mark>${str.substring(from, to)}</mark>${str.substring(to)}`
      const newOffset = offset + (newStr.length - str.length);
      return [newOffset, newStr];
    },
    [0, str] as [number, string],
  )[1];
}

export interface HighlightZone {
  extract: string;
  highlighted: boolean;
}

export function parseHighlightIndices(
  str: string | undefined,
  indices: readonly [number, number][],
  minLength = 2,
) {
  if (!str) {
    return [];
  }

  const includeLastChar = 1;

  const parts: HighlightZone[] = [];
  let lastTo = 0;
  indices.forEach(([from, to]) => {
    if (to - from < minLength) {
      return;
    }

    if (from > lastTo) {
      parts.push({
        extract: str.substring(lastTo, from),
        highlighted: false,
      });
    }
    const realTo = to + includeLastChar;
    parts.push({
      extract: str.substring(from, realTo),
      highlighted: true,
    });
    lastTo = realTo;
  });
  if (lastTo < str.length) {
    parts.push({
      extract: str.substring(lastTo, str.length),
      highlighted: false,
    });
  }

  return parts;
}

export type FormattedItem<T> = T & {
  _formatted?: {
    [K in keyof T]?: HighlightZone[];
  };
};

export function highlightFuseResult<T>(result: Fuse.FuseResult<T>[]): T[] {
  return result.map(({ item, matches }) => {
    const copy: FormattedItem<T> = { ...item, _formatted: {} };
    matches?.forEach(({ key, value, indices }) => {
      if (!key || !value) {
        return;
      }

      (copy as any)._formatted[key] = parseHighlightIndices(value, indices);
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

  return highlightFuseResult(fuse.search(search));
}
