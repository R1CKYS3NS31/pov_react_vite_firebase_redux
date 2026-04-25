import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFetchData } from "./useFetchData";
import { getUserFirebase } from "../service/firebase/controller/user-firebase";
import { getPoVsByAuthorFirebase } from "../service/firebase/controller/pov-firebase";
import { useNotificationHandler } from "./useNotificationHandler";
import { setPovs } from "../service/redux/slices/pov/povSlice";

export const useProfile = (userId) => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (userPovsData) {
      dispatch(setPovs(userPovsData));
    }
  }, [userPovsData, dispatch]);

  const userPovs = userPovsData?.empty ? {
    size: 12,
    empty: true,
    content: [],
    totalPages: 1,
    totalElements: 0,
    number: 0,
  } : userPovsData;


  return {
    profile,
    userPovs,
    loadingProfile: loadingProfile || loadingPovs,
    notification,
    closeNotification,
  };
};
