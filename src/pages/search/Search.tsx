/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import { AirportData } from '../../types/types';
import { findAllPaths } from '../../utils/connectionsGraph';
import { airportIdToCode } from '../../utils/utils';
import { IconLeftArrow } from '../../assets/icons/IconLeftArrow';
import Spinner from '../../components/Spinner/Spinner';

import { Banner } from '../../components/Banner/Banner';
import { FlightImage } from '../../components/FlightImage/FlightImage';
import * as styles from './Search.scss';

export const Search = () => {
  const airports = useAppSelector(state => state.airports.airports);
  const airportsLoadingStatus = useAppSelector(state => state.airports.loadingState);
  const connectionsLoadingStatus = useAppSelector(state => state.connections.loadingState);
  const connections = useAppSelector(state => state.connections.connections);
  const [searchParams, _setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  if (airportsLoadingStatus === 'pending' || connectionsLoadingStatus === 'pending') {
    return <Spinner />;
  }
  if (airportsLoadingStatus === 'fail' || connectionsLoadingStatus === 'fail') {
    return (
      <>Error loading data.</>
    );
  }

  const handleBackButtonClick = () => navigate(-1);

  const airportFrom: AirportData | undefined = airports.find(airport => airport.id === parseInt(searchParams.get('from')!));
  const airportTo: AirportData | undefined = airports.find(airport => airport.id === parseInt(searchParams.get('to')!));

  let topSortedLayoversByCode: string[][] = [];
  if (airportFrom && airportTo) {
    const minNumberOfSearchResults = 50; // give me at least this number of results
    const maxConnectionLimit = 3; // but don't go higher than this number of connecting flights
    const allPaths: number[][] = findAllPaths(connections, airportFrom.id, airportTo.id, maxConnectionLimit, minNumberOfSearchResults);

    // sort by number of connections
    const allPathsSorted = [...allPaths].sort((a, b) => (a.length - b.length));

    const topSortedPathsById: number[][] = allPathsSorted.slice(0, minNumberOfSearchResults);
    const topSortedPathsByCode: string[][] = topSortedPathsById.map(resultId => resultId.map(id => airportIdToCode(id, airports)));
    topSortedLayoversByCode = topSortedPathsByCode.map(pathByCode => pathByCode.slice(1, pathByCode.length - 1));
  }

  return (
    <>
      {airportFrom && airportTo ?
        <div>
          <button className={styles.backButton} onClick={handleBackButtonClick} >
            <IconLeftArrow />
            Back
          </button>

          <div className={styles.background}>
            <div className={styles.overlay} />
            <img src={airportFrom.images.full} alt="Airport" />
            <img src={airportTo.images.full} alt="Airport" />
          </div>

          <div className={styles.content}>
            <div className={styles.header}>

              <div className={styles.airportDetails}>
                <h2 style={{ height: '48px' }}>{airportFrom.country}</h2>
                <p style={{ height: '30px' }}>{airportFrom.name}</p>
              </div>

              <div className={styles.flightImage}>
                <FlightImage />
              </div>

              <div className={styles.airportDetails}>
                <h2 style={{ height: '48px' }}>{airportTo.country}</h2>
                <p style={{ height: '30px' }}>{airportTo.name}</p>
              </div>

            </div>
            {topSortedLayoversByCode.map((pathByCode, index) => {
              return (
                <Banner
                  key={index}
                  from={airportFrom.code}
                  to={airportTo.code}
                  layovers={pathByCode} />
              );
            })
            }

          </div>
        </div>

        : <Navigate to="/" />
      }
    </>
  );
};
