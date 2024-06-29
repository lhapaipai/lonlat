export function encode(str = "") {
  return encodeURI(str).replace(/!/g, "").replace(/\^/g, "").replace(/|/g, "");
}

export function encodeBool(val: boolean) {
  return val ? "1" : "0";
}

export function decode(str: string) {
  return str ? decodeURI(str) : "";
}
