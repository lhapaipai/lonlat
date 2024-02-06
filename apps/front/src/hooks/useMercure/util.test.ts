import { afterEach, describe, expect, test, vi } from "vitest";
import { extractHubURL, createEventSource } from "./util";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("createEventSource()", () => {
  test("createEventSource to right topic", () => {
    const stub = vi.fn();
    vi.stubGlobal("EventSource", stub);

    createEventSource(new URL("http://other.com"), "/posts/1234");

    expect(stub).toHaveBeenCalledOnce();
    expect(stub).toHaveBeenCalledWith(
      "http://other.com/?topic=https%3A%2F%2Flocalhost%3A8000%2Fposts%2F1234",
    );
  });
});

describe("extractHubURL", () => {
  test("extract Hub URL from HTTP Header Link", () => {
    const response = new Response(null, {
      headers: {
        Link: `<https://localhost:8000/.well-known/mercure>; rel="mercure"`,
      },
    });

    expect(extractHubURL(response)?.href).toMatch("https://localhost:8000/.well-known/mercure");
  });

  test("extract Hub URL from Multiple HTTP Header Links", () => {
    const headers = new Headers();
    headers.append("Link", `<https://localhost:8000/.well-known/mercure>; rel="mercure"`);
    headers.append(
      "Link",
      `<https://localhost:8000/docs.jsonld>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"`,
    );
    const response = new Response(null, {
      headers,
    });

    expect(extractHubURL(response)?.href).toMatch("https://localhost:8000/.well-known/mercure");
  });

  test("extract Hub URL from Multiple HTTP Header Links in one line", () => {
    const headers = new Headers();
    headers.append(
      "Link",
      `<https://localhost:8000/docs.jsonld>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation", <https://localhost:8000/.well-known/mercure>; rel="mercure"`,
    );
    const response = new Response(null, {
      headers,
    });

    expect(extractHubURL(response)?.href).toMatch("https://localhost:8000/.well-known/mercure");
  });
});
