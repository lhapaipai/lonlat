import { useCallback } from "react";
import { CustomFetchOptions, fetchAPI } from "../../lib";
import { useContextNotifications } from ".";

export const useFetch = () => {
  // is it the good useContextNotifications ? from redux or not ??
  const notificationManager = useContextNotifications();

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
