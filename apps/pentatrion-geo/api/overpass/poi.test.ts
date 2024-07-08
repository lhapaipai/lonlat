import { describe, expect, test } from "vitest";
import { generatePoisQuery } from "./poi";
import { routeFeature } from "./_mock";

describe("overpass/poi", () => {
  test("generatePoisQuery", () => {
    const query = generatePoisQuery(routeFeature);
    expect(query).toMatchInlineSnapshot(`
      "[timeout:10][out:json];

      (
      node(around:1000,46.089394, 6.504217)[place~"^(city|town|village)$"];
      node(around:1000,46.076360513664184, 6.499201338292399)[place~"^(city|town|village)$"];
      node(around:1000,46.06457231470604, 6.492010808817581)[place~"^(city|town|village)$"];
      node(around:1000,46.05623498737896, 6.480818061364974)[place~"^(city|town|village)$"];
      node(around:1000,46.04610354576458, 6.471494293657612)[place~"^(city|town|village)$"];
      node(around:1000,46.03768596774658, 6.4563079779514)[place~"^(city|town|village)$"];
      node(around:1000,46.02926637908578, 6.441126288900309)[place~"^(city|town|village)$"];
      node(around:1000,46.016590570492966, 6.437850377128303)[place~"^(city|town|village)$"];
      node(around:1000,46.00534437108879, 6.446460250489171)[place~"^(city|town|village)$"];
      node(around:1000,45.99329354812823, 6.443749101923148)[place~"^(city|town|village)$"];
      node(around:1000,45.98175453901176, 6.442451776984696)[place~"^(city|town|village)$"];
      node(around:1000,45.972210792286496, 6.454862434906447)[place~"^(city|town|village)$"];
      node(around:1000,45.963163, 6.455105)[place~"^(city|town|village)$"];

      node(around:500,46.034607, 6.453465)[natural~"^(peak)$"];
      node(around:500,46.022279, 6.442456)[natural~"^(peak)$"];
      node(around:500,45.998894, 6.445979)[natural~"^(peak)$"];
      node(around:500,45.983811, 6.438724)[natural~"^(peak)$"];
      node(around:500,45.968303, 6.451486)[natural~"^(peak)$"];
      ); out;"
    `);
  });
});
