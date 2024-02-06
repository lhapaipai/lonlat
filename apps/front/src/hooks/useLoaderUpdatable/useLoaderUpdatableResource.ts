import { useLoaderData } from "react-router-dom";
import { useMercure } from "..";
import { useState } from "react";
import { ApiResource } from "~/types/jsonld";

export function useLoaderUpdatableResource<R extends ApiResource>() {
  const resource = useLoaderData() as R;
  const [updatedResource, setUpdatedResource] = useState<R | null>(null);

  function onMessage(message: ApiResource) {
    const resourceUpdated = message as R;

    if (1 === Object.keys(resourceUpdated).length) {
      throw new Response("", {
        status: 404,
        statusText: "Deleted",
      });
    } else {
      setUpdatedResource(resourceUpdated);
    }
  }

  useMercure<R>(resource, onMessage);

  return updatedResource ?? resource;
}
