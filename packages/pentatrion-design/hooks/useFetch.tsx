import { useCallback } from "react";
import { CustomFetchOptions, customFetch, useNotifications } from "..";

const useFetch = () => {
  const notificationManager = useNotifications();

  const appFetch = useCallback(
    async (urlObjOrString: string | URL, enhancedOptions: CustomFetchOptions = {}) => {
      try {
        return await customFetch(urlObjOrString, enhancedOptions);
      } catch (err) {
        notificationManager.notifyError(err);
      }
    },
    [notificationManager],
  );

  return appFetch;
};

export default useFetch;
