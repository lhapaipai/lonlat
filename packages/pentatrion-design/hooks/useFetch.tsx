import { useCallback } from "react";
import { CustomFetchOptions, fetchAPI } from "../lib";
import { useNotifications } from "./useNotifications";

export const useFetch = () => {
  // is it the good useNotifications ? from redux or not ??
  const notificationManager = useNotifications();

  const appFetch = useCallback(
    async (urlObjOrString: string | URL, enhancedOptions: CustomFetchOptions = {}) => {
      try {
        return await fetchAPI(urlObjOrString, enhancedOptions);
      } catch (err) {
        notificationManager.notifyError(err);
      }
    },
    [notificationManager],
  );

  return appFetch;
};
