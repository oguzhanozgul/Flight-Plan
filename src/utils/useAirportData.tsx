import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { airportsLoaded, airportsLoading, airportsLoadingFailed } from '../store/airportsSlice';
import { useAppDispatch } from '../store/hooks';
import { Airports } from '../types/types';
import apiClient from '../utils/apiClient';

export function useAirportData() {
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
  } = useQuery<Airports>({
    queryFn: async () => {
      const { data } = await apiClient.get('airports/');

      return data;
    },
    queryKey: ['airport-data'],
    retry: 5,
  });

  return useEffect(() => {
    // Upon successful fetch, we populate the state (which is persisted between page refreshes)
    // which we will use app-wide since we only have 1 related endpoint. We wouldn't do this
    // in a production application.
    if (isSuccess) {
      dispatch(
        airportsLoaded({
          airports: airportData,
        }),
      );
    }
    // Handle error (I noticed I get 500 from the API often)
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
}
