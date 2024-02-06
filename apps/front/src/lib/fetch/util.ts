import { apiEntrypoint } from "~/config/constants";

export const normalizeUrl = (url: string) => {
  return String(new URL(url, apiEntrypoint));
};

export const normalizeInput = (input: RequestInfo): RequestInfo => {
  if (typeof input === "string") {
    return normalizeUrl(input);
  }

  return {
    ...input,
    url: normalizeUrl(input.url),
  };
};

export const normalizeHeaders = (options: RequestInit): RequestInit => {
  if (!(options.headers instanceof Headers)) {
    options.headers = new Headers(options.headers);
  }

  return options;
};

export const normalizeContentType = (options: RequestInit): RequestInit => {
  if (
    "undefined" !== options.body &&
    !(options.body instanceof FormData) &&
    options.headers instanceof Headers &&
    null === options.headers.get("Content-Type")
  ) {
    options.headers.set("Content-Type", "application/ld+json");
  }

  return options;
};
