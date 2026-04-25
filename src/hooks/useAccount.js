import { useState, useCallback } from "react";
import { useNotificationHandler } from "./useNotificationHandler";
import {
  deleteUserFirebase,
  getUserFirebase,
  updateUserFirebase,
} from "../service/firebase/controller/user-firebase";
import { useFetchData } from "./useFetchData";
import { useAuth } from "./useAuth";
import {
  getMyPoVsFirebase,
  savePoVFirebase,
  deletePoVFirebase,
  updatePoVFirebase,
} from "../service/firebase/controller/pov-firebase";

export const useAccount = () => {
  const [updateUserAccountLoading, setUpdateUserAccountLoading] =
    useState(false);
  const [deleteUserAccountLoading, setDeleteUserAccountLoading] =
    useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const notificationHandler = useNotificationHandler();
  const { notification, notify, closeNotification, handleApiError } =
    notificationHandler;

  const { isAuthenticated, account: authAccount } = useAuth();

  const { data: userAccount, loading: userAccountLoading } = useFetchData(
    authAccount?.uid ? getUserFirebase : null,
    authAccount?.uid,
    { notificationHandler },
  );

  const { data: myPoVsData, loading: myPoVsLoading } = useFetchData(
    authAccount?.uid ? getMyPoVsFirebase : null,
    authAccount?.uid,
    { notificationHandler },
  );

  const account = (userAccount && userAccount.exists) ? userAccount : authAccount;
  const myPoVs = myPoVsData?.empty ? {
    size: 12,
    empty: true,
    content: [],
    totalPages: 1,
    totalElements: 0,
    number: 0,
  } : myPoVsData;

  const handleUpdateUserAccount = useCallback(
    (userData) => {
      const uid = account?.uid || account?.id;
      if (!uid) return;
      if (!isAuthenticated) {
        notify("You must be logged in to update your account!", "error");
        return;
      }
      setUpdateUserAccountLoading(true);
      return updateUserFirebase(uid, userData)
        .then((response) => {
          if (response) notify("User account updated successfully!", "success");
          return response;
        })
        .catch(handleApiError)
        .finally(() => setUpdateUserAccountLoading(false));
    },
    [notify, handleApiError, isAuthenticated, account],
  );

  const handleDeleteUserAccount = useCallback(() => {
    const uid = account?.uid || account?.id;
    if (!uid) return;
    if (!isAuthenticated) {
      notify("You must be logged in to delete your account!", "error");
      return;
    }
    setDeleteUserAccountLoading(true);
    return deleteUserFirebase(uid)
      .then((response) => {
        if (response) notify("User account deleted successfully!", "success");
        return response;
      })
      .catch(handleApiError)
      .finally(() => setDeleteUserAccountLoading(false));
  }, [notify, handleApiError, isAuthenticated, account]);


  
    const createPov = useCallback(
      (povData) => {
        setCreateLoading(true);
        return savePoVFirebase(povData)
          .then((response) => {
            if (response) notify("PoV created successfully!", "success");
            return response;
          })
          .catch(handleApiError)
          .finally(() => setCreateLoading(false));
      },
      [handleApiError, notify],
    );
  
    const updatePov = useCallback(
      (povId, povData) => {
        setUpdateLoading(true);
        return updatePoVFirebase(povId, povData)
          .then((response) => {
            if (response) notify("PoV updated successfully!", "success");
            return response;
          })
          .catch(handleApiError)
          .finally(() => setUpdateLoading(false));
      },
      [handleApiError, notify],
    );
  
    const deletePov = useCallback(
      (povId) => {
        setDeleteLoading(true);
        return deletePoVFirebase(povId)
          .then((response) => {
            if (response) notify("PoV deleted successfully!", "success");
            return response;
          })
          .catch(handleApiError)
          .finally(() => setDeleteLoading(false));
      },
      [handleApiError, notify],
    );
  
  

  const loading =
    userAccountLoading ||
    updateUserAccountLoading ||
    deleteUserAccountLoading ||
    createLoading ||
    updateLoading ||
    deleteLoading ||
    myPoVsLoading;

  return {
    account,
    myPoVs,
    createPov,
    updatePov,
    deletePov,
    loading,
    notification,
    closeNotification,
    updateAccount: handleUpdateUserAccount,
    deleteAccount: handleDeleteUserAccount,
  };
};
