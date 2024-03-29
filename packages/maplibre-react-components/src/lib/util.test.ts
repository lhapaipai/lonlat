import { describe, expect, test } from "vitest";
import { OtherProps } from "./MapManager";
import { filterOtherOptions } from "./util";

describe("util", () => {
  test("filterOtherOptions", () => {
    const options: OtherProps = {
      zoom: 3,
      onClick: () => {},
    };
    const [mapOptions, callbacks] = filterOtherOptions(options);

    expect(mapOptions).toEqual({ zoom: 3 });
    expect(Object.keys(callbacks)).toEqual(["onClick"]);
  });
});
