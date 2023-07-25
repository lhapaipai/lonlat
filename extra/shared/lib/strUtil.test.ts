import { describe, expect, test } from "vitest";
import { highlight, highlightFuseResult, parseHighlightIndices } from "./strUtil";

describe("strUtil", () => {
  test("highlight", () => {
    const simple = highlight("route de Bonneville, 74100 Bonneville", [[9, 18]]);
    expect(simple).toBe("route de <mark>Bonneville</mark>, 74100 Bonneville");

    const multiple = highlight("route de Bonneville, 74100 Bonneville", [
      [9, 18],
      [27, 36],
    ]);
    expect(multiple).toBe("route de <mark>Bonneville</mark>, 74100 <mark>Bonneville</mark>");
  });

  test("parseHighlightIndices", () => {
    //                                      ***
    const simple = parseHighlightIndices("abcdefghijkl", [[2, 4]]);
    expect(simple).toEqual([
      {
        extract: "ab",
        highlighted: false,
      },
      {
        extract: "cde",
        highlighted: true,
      },
      {
        extract: "fghijkl",
        highlighted: false,
      },
    ]);

    //                                       ***
    const beginning = parseHighlightIndices("abcdefghijkl", [[0, 2]]);
    expect(beginning).toEqual([
      {
        extract: "abc",
        highlighted: true,
      },
      {
        extract: "defghijkl",
        highlighted: false,
      },
    ]);

    //                                   ***
    const end = parseHighlightIndices("abcde", [[2, 4]]);
    expect(end).toEqual([
      {
        extract: "ab",
        highlighted: false,
      },
      {
        extract: "cde",
        highlighted: true,
      },
    ]);

    const noHighlight = parseHighlightIndices("abcde", []);
    expect(noHighlight).toEqual([
      {
        extract: "abcde",
        highlighted: false,
      },
    ]);

    const allHighlight = parseHighlightIndices("abcde", [[0, 4]]);
    expect(allHighlight).toEqual([
      {
        extract: "abcde",
        highlighted: true,
      },
    ]);
  });

  test("highlightFuseResult", () => {
    const result = highlightFuseResult([
      {
        item: {
          longitude: 6.12551773598,
          nom_commune: "Annecy",
          nom_region: "Auvergne-Rhône-Alpes",
          context: "Annecy, Haute-Savoie, Auvergne-Rhône-Alpes",
        },
        refIndex: 0,
        matches: [
          { indices: [[0, 3]], value: "Annecy", key: "nom_commune" },
          {
            indices: [[0, 3]],
            value: "Annecy, Haute-Savoie, Auvergne-Rhône-Alpes",
            key: "context",
          },
        ],
        score: 0.000018578044550916993,
      },
    ]);

    expect(result).toMatchInlineSnapshot(`
      [
        {
          "_formatted": {
            "context": [
              {
                "extract": "Anne",
                "highlighted": true,
              },
              {
                "extract": "cy, Haute-Savoie, Auvergne-Rhône-Alpes",
                "highlighted": false,
              },
            ],
            "nom_commune": [
              {
                "extract": "Anne",
                "highlighted": true,
              },
              {
                "extract": "cy",
                "highlighted": false,
              },
            ],
          },
          "context": "Annecy, Haute-Savoie, Auvergne-Rhône-Alpes",
          "longitude": 6.12551773598,
          "nom_commune": "Annecy",
          "nom_region": "Auvergne-Rhône-Alpes",
        },
      ]
    `);
  });
});
