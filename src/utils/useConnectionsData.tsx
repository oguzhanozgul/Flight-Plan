import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Connections } from 'src/types/types';

import { connectionsLoaded, connectionsLoading, connectionsLoadingFailed } from '../store/connectionsSlice';
import { useAppDispatch } from '../store/hooks';
import apiClient from '../utils/apiClient';
import { parseConnections } from '../utils/utils';

export function useConnectionsData() {
  const dispatch = useAppDispatch();

  // We fetch everything below. In a prod. application, we would only get the connections from
  // the source to destination, ideally even sorted by number of connections or other criteria
  // such as total time, total layover time, accomodation required, etc.
  const {
    data: connectionsData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<string>({
    queryFn: async () => {
      const { data } = await apiClient.get('connections/');

      return data;
    },
    queryKey: ['airport-connections'],
    retry: 5,
  });

  return useEffect(() => {
    // Upon successful fetch, we populate the state (which is persisted between page refreshes)
    // which we will use app-wide since we only have 1 related endpoint. We wouldn't do this
    // in a production application.
    if (isSuccess) {
      const connections: Connections = parseConnections(connectionsData);
      dispatch(
        connectionsLoaded({
          connections,
        }),
      );
    }
    // Handle error (I noticed I get 500 from the API often)
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
}
