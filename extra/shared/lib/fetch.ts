type Options = RequestInit & {
  urlParams?: {
    [key: string]: string;
  };
  query?: {
    [key: string]: unknown;
  };
};

export async function withNotifierCustomFetch(
  urlObjOrString: string | URL,
  enhancedOptions: Options = {},
) {
  try {
    const response = await customFetch.apply(null, [urlObjOrString, enhancedOptions]);
    return response;
  } catch (err) {
    if (err instanceof FetchError) {
      console.log("FetchError error :", err, err.name, err.message);
    } else {
      throw err;
    }
  }
}

export async function customFetch(urlObjOrString: string | URL, enhancedOptions: Options = {}) {
  const { urlParams, query, ...options } = enhancedOptions;

  const url = urlObjOrString instanceof URL ? urlObjOrString : new URL(urlObjOrString);

  const body = "body" in options ? options["body"] : null;
  if (body && typeof body !== "string" && !(body instanceof FormData)) {
    options.headers = {
      ...(options.headers = {}),
      "Content-Type": "application/json",
    };
    options.body = JSON.stringify(body);
  }

  if (urlParams) {
    for (const [name, value] of Object.entries(urlParams)) {
      url.pathname = url.pathname.replace(`{${name}}`, value);
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

  const response = await fetch(url.toString(), options);

  if (response.status === 204) {
    return null;
  }

  if (response.headers.get("content-type")?.includes("application/json")) {
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

  throw new FetchError(dataText, response.status);
}

export class FetchError extends Error {
  constructor(
    message: string,
    public status: number,
    public data: object = {},
  ) {
    super(message);
    this.name = "FetchError";
  }
}
