import { ConfigState } from "./configSlice";
import { getColorScheme } from "~/lib/util";

export function stringifyConfig(configState: ConfigState) {
  const unusualConfig: {
    [key: string]: string;
  } = {};

  if (configState.readOnly) {
    unusualConfig["read-only"] = "1";
  }
  if (configState.mode === "dark") {
    unusualConfig.mode = "dark";
  }
  if (configState.distractionFree) {
    unusualConfig["distraction-free"] = "1";
  }

  return Object.entries(unusualConfig)
    .map((kv) => kv.join("_"))
    .join("|");
}

export function parseConfig(configStr: string | null): ConfigState | null {
  if (!configStr) {
    return null;
  }
  try {
    const config: ConfigState = {
      readOnly: false,
      tab: "search",
      searchEngine: "ign-address",
      coordsUnit: "lonlat",
      distractionFree: false,
      mode: getColorScheme(true),
    };
    const userConfig = Object.fromEntries(
      configStr.split("|").map((kv) => kv.split("_")),
    );

    if (userConfig["read-only"] && userConfig["read-only"] === "1") {
      config.readOnly = true;
    }
    if (
      userConfig["tab"] &&
      ["search", "direction", "help"].includes(userConfig["tab"])
    ) {
      config.tab = userConfig["tab"];
    }
    if (
      userConfig["distraction-free"] &&
      userConfig["distraction-free"] === "1"
    ) {
      config.distractionFree = true;
    }
    if (userConfig["mode"] && ["dark", "light"].includes(userConfig["mode"])) {
      config.mode = userConfig["mode"];
    }

    return config;
  } catch (err) {
    return null;
  }
}
