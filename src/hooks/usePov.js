import { useFetchData } from "./useFetchData";
import {
  getPoVsPublishedFirebase,
  searchPoVsByTitleFirebase,
} from "../service/firebase/controller/pov-firebase";
import { useNotificationHandler } from "./useNotificationHandler";

export const usePov = ({
  search = "",
  page = 0,
  size = 12,
  sortBy = "createdAt",
} = {}) => {
 
  const notificationHandler = useNotificationHandler();
  const { notification, closeNotification } =
    notificationHandler;

  // Fetching all PoVs
  const { data: allPovsData, loading: allLoading } = useFetchData(
    getPoVsPublishedFirebase,
    { page, size, sortBy },
    { notificationHandler },
  );

  // Fetching searched PoVs
  const { data: searchedPovsData, loading: searchLoading } = useFetchData(
    search ? () => searchPoVsByTitleFirebase(search) : null,
    search,
    { notificationHandler },
  );

  const allPovs = allPovsData?.empty ? {
    size: 12,
    empty: true,
    content: [],
    totalPages: 1,
    totalElements: 0,
    number: 0,
  } : allPovsData;

  const searchedAllPovs = searchedPovsData?.empty ? {
    size: 12,
    empty: true,
    content: [],
    totalPages: 1,
    totalElements: 0,
    number: 0,
  } : searchedPovsData;

  return {
    allPovs,
    searchedAllPovs,
    loading: allLoading || searchLoading,
    closeNotification,
    notification,
  };
};
