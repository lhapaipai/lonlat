export function isNotNull<T>(data: T | null): data is T {
  return data !== null;
}
