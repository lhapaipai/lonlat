export function isNotNull<T>(w: T | null): w is T {
  return w !== null;
}

export function getColorScheme(force = false): "dark" | "light" {
  const isDark =
    window && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const mode = isDark ? "dark" : "light";
  if (force) {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(mode);
  }
  return mode;
}
