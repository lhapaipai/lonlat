import { useEffect, useState } from "react";
import { createEventSource } from "./util";
import { ApiCollection, ApiResource } from "~/types/jsonld";
import { useEventCallback, useEventListener } from "~/hooks";

export function useMercure<R extends ApiResource | ApiCollection<ApiResource>>(
  retrieved: R | null,
  onMessage: (message: ApiResource) => void,
) {
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  const stableOnMessage = useEventCallback(onMessage);

  useEventListener("beforeunload", () => {
    // 0 -> connecting, 1 -> open, 2 -> closed
    console.log("beforeunload close eventsource");

    if (eventSource && eventSource.readyState !== 2) {
      eventSource.close();
    }
  });

  useEffect(() => {
    if (eventSource) {
      console.log("open eventsource", eventSource);

      eventSource.addEventListener("message", (event) => stableOnMessage(JSON.parse(event.data)));
    }

    return () => {
      if (eventSource) {
        console.log("close eventsource");

        eventSource.close();
      }
    };
  }, [eventSource, stableOnMessage]);

  useEffect(() => {
    if (retrieved) {
      const collection = retrieved as ApiCollection<R>;
      const topics = collection["hydra:member"]
        ? collection["hydra:member"].map((item) => item["@id"])
        : [retrieved["@id"]];

      setEventSource(createEventSource(topics));
    } else {
      setEventSource(null);
    }
  }, [retrieved]);
}
