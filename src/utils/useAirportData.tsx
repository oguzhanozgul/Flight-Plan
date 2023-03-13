import apiClient from "./apiClient";
import { airportsLoaded, airportsLoading, airportsLoadingFailed } from "../store/airportsSlice";
import { useAppDispatch } from "../store/hooks";
import { AirportData, ServiceResponse } from "../types/types";
import { useEffect } from "react";
import { useQuery } from "react-query";

export const useAirportData = () => {
  const dispatch = useAppDispatch();

  // We fetch everything below. In a prod. application, we would either paginate or
  // fetch with some criteria so that it only shows certain airports.
  // Also, we are using the below to also populate the SearchBar, but the needed
  // data for the SearchBar is much less, so ideally we can have an endpoint to only
  // get the name and country of the airports (may even be conditional on entering the first
  // few letters of in the search box)
  const {
    data: airportData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<ServiceResponse<AirportData[]>>({
    queryFn: async () => {
      const { data } = await apiClient.get("airport/");

      return data;
    },
    queryKey: ["airport-data"],
    retry: 5,
  });

  return useEffect(() => {
    // Upon successful fetch, we populate the state which we will use app-wide since we only
    // have 1 related endpoint. We wouldn't do this in a production application.
    if (isSuccess) {
      dispatch(
        airportsLoaded({
          airports: airportData.data,
        }),
      );
    }
    // Handle errors
    if (isError) {
      dispatch(
        airportsLoadingFailed(),
      );
    }
    if (isLoading) {
      dispatch(
        airportsLoading(),
      );
    }
  }, [isSuccess, isError, isLoading]);
};

export default useAirportData;
