import { normalizeContentType, normalizeHeaders, normalizeInput } from "./util";
import { regularHandler, submissionHandler } from "./errors";

/**
 * Préfixe l'URL avec le domaine de l'api
 * headers est désormais une instance de Headers
 * ajoute l'entête : Content-Type: application/ld+json si le contenu
 * de body est une instance de FormData
 */

export interface FetchResponse {
  readonly response: Response;
  readonly json: any;
}

export function fetchAPI(input: RequestInfo, init: RequestInit = {}): Promise<FetchResponse> {
  input = normalizeInput(input);
  init = [normalizeHeaders, normalizeContentType].reduce(
    (init, normalize) => normalize(init),
    init,
  );

  if (init.method === "DELETE") {
    return fetch(input, init).then((response) => ({
      response,
      json: null,
    }));
  }

  return fetch(input, init)
    .then((response) =>
      response
        .json()
        .then<{ response: Response; json: object }>((json) => ({ response, json }))
        .catch(() => {
          throw new Error(response.statusText || "An error occurred.");
        }),
    )
    .then((data) => {
      if (!data.response.ok) {
        submissionHandler(data.response, data.json);
        regularHandler(data.response, data.json);
      }

      return data;
    });
}
