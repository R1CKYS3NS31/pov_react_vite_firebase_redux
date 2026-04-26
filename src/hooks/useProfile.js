import { useMemo } from "react";
import { useFetchData } from "./useFetchData";
import { getUserFirebase } from "../service/firebase/controller/user-firebase";
import { getPoVsByAuthorFirebase } from "../service/firebase/controller/pov-firebase";
import { useNotificationHandler } from "./useNotificationHandler";

export const useProfile = (userId) => {
  const notificationHandler = useNotificationHandler();
  const { notification, closeNotification } = notificationHandler;

  const { data: profile, loading: loadingProfile } = useFetchData(
    userId ? getUserFirebase : null,
    userId,
    { notificationHandler },
  );

  const { data: userPovsData, loading: loadingPovs } = useFetchData(
    userId ? getPoVsByAuthorFirebase : null,
    userId,
    { notificationHandler },
  );

  // Return data directly — do NOT dispatch into the global povs slice or it
  // will overwrite the public feed whenever a profile page is viewed.
  const userPovs = useMemo(() => {
    return userPovsData?.empty
      ? { size: 0, empty: true, content: [], totalPages: 1, totalElements: 0, number: 0 }
      : userPovsData;
  }, [userPovsData]);

  return {
    profile,
    userPovs,
    loadingProfile: loadingProfile || loadingPovs,
    notification,
    closeNotification,
  };
};

