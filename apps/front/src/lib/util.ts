export function isNotNull<T>(w: T | null): w is T {
  return w !== null;
}

export function getColorScheme(force = false): "dark" | "light" {
  const isDark =
    window &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const mode = isDark ? "dark" : "light";
  if (force) {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(mode);
  }
  return mode;
}

export function customReplaceState(
  data: any,
  unused: string,
  url?: string | URL | null,
): void {
  try {
    window.history.replaceState(data, unused, url);
    window.dispatchEvent(new CustomEvent("replacestate"));
  } catch (SecurityError) {
    // IE11 does not allow this if the page is within an iframe created
    // with iframe.contentWindow.document.write(...).
    // https://github.com/mapbox/mapbox-gl-js/issues/7410
  }
}
