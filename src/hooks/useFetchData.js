import { useState, useEffect } from "react";
import { useNotificationHandler } from "./useNotificationHandler";

export const useFetchData = (
  fetchFunction,
  options = {},
  fetchOptions = {},
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!!fetchFunction);

  const internalHandler = useNotificationHandler();

  const optionsString = JSON.stringify(options);
  const { successMessage, errorMessage, notificationHandler } = fetchOptions;

  // Use the passed handler OR our internal own
  const handler = notificationHandler || internalHandler;
  const { notify, handleApiError } = handler;

  useEffect(() => {
    if (!fetchFunction) return;

    const fetchData = () => {
      setLoading(true);
      const parsedOptions = JSON.parse(optionsString);
      return fetchFunction(parsedOptions)
        .then((result) => {
          setData(result);
          if (successMessage) {
            notify(successMessage, "success");
          }
        })
        .catch((err) => {
          setData(null);
          if (errorMessage) notify(errorMessage, "error");
          else handleApiError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };


    fetchData();
  }, [
    fetchFunction,
    optionsString,
    handleApiError,
    notify,
    successMessage,
    errorMessage,
  ]);

  return { data, loading, ...handler };
};
