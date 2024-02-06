import { useLoaderData } from "react-router-dom";
import { useMercure } from "..";
import { useState } from "react";
import { ApiCollection, ApiResource } from "~/types/jsonld";

export function useLoaderUpdatableCollection<R extends ApiResource>() {
  const collection = useLoaderData() as ApiCollection<R>;
  const [updatedCollection, setUpdatedCollection] = useState<ApiCollection<R> | null>(null);

  function onMessage(message: ApiResource) {
    const resourceUpdated = message as R;

    if (1 === Object.keys(resourceUpdated).length) {
      setUpdatedCollection({
        ...collection,
        "hydra:member": collection["hydra:member"].filter(
          (item) => item["@id"] !== resourceUpdated["@id"],
        ),
      });
    } else {
      setUpdatedCollection({
        ...collection,
        "hydra:member": collection["hydra:member"].map((item) => {
          if (item["@id"] !== resourceUpdated["@id"]) {
            return item;
          }
          return resourceUpdated;
        }),
      });
    }
  }

  useMercure<ApiCollection<R>>(collection, onMessage);

  return updatedCollection ?? collection;
}
