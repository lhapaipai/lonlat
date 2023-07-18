export function isValidMultiMode<V>(value: any, multiple: boolean): value is V & any[] {
  if (!multiple) {
    return false;
  }

  if (value !== undefined && !Array.isArray(value)) {
    console.warn("[Select] Incorrect usage : if using multiple mode, value must be an array");
    return false;
  }

  return true;
}
