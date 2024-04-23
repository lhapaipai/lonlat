export function isNotNull<T>(w: T | null): w is T {
  return w !== null;
}
