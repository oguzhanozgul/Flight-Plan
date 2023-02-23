import * as React from 'react';

import { AirportGrid } from '../../AirportGrid';
import { SearchBar } from '../../SearchBar';

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
