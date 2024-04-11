export type CustomFetchOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | { [key: string]: unknown };
  urlParams?: {
    [key: string]: string | number;
  };
  query?: {
    [key: string]: unknown;
  };
};

export async function fetchAPI(
  urlObjOrString: string | URL,
  enhancedOptions: CustomFetchOptions = {},
  baseUrl?: string,
  baseOptions?: RequestInit,
) {
  const { urlParams, query, body, ...rest } = enhancedOptions;

  let options: RequestInit = rest;

  let url: URL;

  if (urlObjOrString instanceof URL) {
    url = urlObjOrString;
  } else {
    const origin = baseUrl ? new URL(baseUrl).origin : window.location.origin;
    let prefix = baseUrl ? new URL(baseUrl).pathname : "";
    if (prefix === "/") {
      prefix = "";
    }
    url = new URL(`${prefix}${urlObjOrString}`, origin);
  }

  if (urlParams) {
    for (const [name, value] of Object.entries(urlParams)) {
      // %7B -> `{`
      // %7D -> `}`
      url.pathname = url.pathname.replace(`%7B${name}%7D`, value.toString());
    }
  }

  if (query) {
    for (const [name, value] of Object.entries(query)) {
      url.searchParams.set(
        name,
        typeof value === "object" ? JSON.stringify(value) : (value as any).toString(),
      );
    }
  }

  if (body && typeof body !== "string" && !(body instanceof FormData)) {
    options.headers = {
      ...(options.headers = {}),
      "Content-Type": "application/json",
    };
    options.body = JSON.stringify(body);
  }

  if (baseOptions) {
    const { headers: baseHeaders = {}, ...baseRest } = baseOptions;
    options = {
      ...baseRest,
      ...options,
      headers: {
        ...baseHeaders,
        ...options.headers,
      },
    };
  }

  const response = await fetch(url.toString(), options);

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json") || contentType?.includes("application/geo+json")) {
    const dataJson = await response.json();

    if (response.ok) {
      return dataJson;
    }

    if (!dataJson.message) {
      dataJson.message = "request Error";
    }

    throw new FetchError(dataJson.message, response.status, dataJson);
  }

  const dataText = await response.text();

  if (response.ok) {
    return dataText;
  }

  throw new FetchError(`${response.status} ${response.statusText}`, response.status, dataText);
}

export class FetchError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown,
  ) {
    super(message);
    this.name = "FetchError";
  }
}
