import { useCallback } from "react";
import { CustomFetchOptions, fetchAPI, useNotifications } from "..";

const useFetch = () => {
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

export default useFetch;
