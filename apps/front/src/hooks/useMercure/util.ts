import { apiEntrypoint, mercureHub } from "~/config/constants";

export const createEventSource = (topics: string[] | string): EventSource => {
  const mercureHubURL = new URL(mercureHub);
  (Array.isArray(topics) ? topics : [topics]).forEach((topic) =>
    mercureHubURL.searchParams.append("topic", String(new URL(topic, apiEntrypoint))),
  );

  return new EventSource(mercureHubURL.toString());
};

export const extractHubURL = (response: Response): URL | null => {
  const linkHeader = response.headers.get("Link");
  if (!linkHeader) {
    return null;
  }

  const matches = linkHeader.match(/<([^>]+)>;\s+rel=(?:mercure|"[^"]*mercure[^"]*")/);

  return matches && matches[1] ? new URL(matches[1], apiEntrypoint) : null;
};
