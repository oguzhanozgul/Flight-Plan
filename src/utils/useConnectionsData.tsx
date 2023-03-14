import apiClient from "./apiClient";
import { Connections, ServiceResponse } from "../types/types";
import { connectionsLoaded, connectionsLoading, connectionsLoadingFailed } from "../store/connectionsSlice";
import { useAppDispatch } from "../store/hooks";
import { useEffect } from "react";
import { useQuery } from "react-query";

export const useConnectionsData = () => {
  const dispatch = useAppDispatch();

  // We fetch everything below. In a prod. application, we would only get the connections from
  // the source to destination, ideally even sorted by number of connections or other criteria
  // such as total time, total layover time, accommodation required, etc.
  const {
    data: connectionsData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<ServiceResponse<Connections>>({
    queryFn: async () => {
      const { data } = await apiClient.get("connection/");

      return data;
    },
    queryKey: ["airport-connections"],
    retry: 5,
  });

  return useEffect(() => {
    // Upon successful fetch, we populate the state which we will use app-wide since we only
    // have 1 related endpoint. We wouldn't do this in a production application.
    if (isSuccess) {
      dispatch(
        connectionsLoaded({
          connections: connectionsData.data,
        }),
      );
    }
    // Handle errors
    if (isError) {
      dispatch(
        connectionsLoadingFailed(),
      );
    }
    if (isLoading) {
      dispatch(
        connectionsLoading(),
      );
    }
  }, [isSuccess, isError, isLoading]);
};

export default useConnectionsData;
