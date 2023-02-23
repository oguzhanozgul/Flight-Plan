import * as React from 'react';

import { AirportGrid } from '../../components/AirportGrid/AirportGrid';
import { SearchBar } from '../../components/SearchBar/SearchBar';

export const Home = () => {
  return (
    <div>
      <SearchBar />
      <div>
        <AirportGrid />
      </div>
    </div>
  );
};
