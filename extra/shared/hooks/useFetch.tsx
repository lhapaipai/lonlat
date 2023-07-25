import { CustomFetchOptions, FetchError, customFetch, useNotifications } from "..";

const useFetch = async (urlObjOrString: string | URL, enhancedOptions: CustomFetchOptions = {}) => {
  const notificationManager = useNotifications();

  try {
    return await customFetch(urlObjOrString, enhancedOptions);
  } catch (err) {
    if (err instanceof FetchError) {
      notificationManager.addNotification(err.message);
    } else {
      throw err;
    }
  }
};

export default useFetch;
