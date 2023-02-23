import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectedAirportChanged } from '../../store/selectionBoxesSlice';
import { AirportData } from '../../types/types';
import { airportIdToCode } from '../../utils/utils';

import * as styles from './Airport.scss';
import { Rating } from '../Rating/Rating';

interface Props {
  airportData: AirportData;
}

export const Airport = ({ airportData }: Props) => {
  const connections = useAppSelector(state => state.connections.connections);
  const airports = useAppSelector(state => state.airports.airports);
  const dispatch = useAppDispatch();

  const handleStartFromClick = () => {
    dispatch(
      selectedAirportChanged({
        id: airportData.id,
        type: 'from',
      }),
    );
  };

  const handleGoToClick = () => {
    dispatch(
      selectedAirportChanged({
        id: airportData.id,
        type: 'to',
      }),
    );
  };

  const myConnections = (): string[] => {
    return connections[airportData.id].map(connId => airportIdToCode(connId, airports));
  };

  return (
    <div className={styles.airport}>
      <img className={styles.image} src={airportData.images.small} alt={`${airportData.name} Airport in ${airportData.country}`} />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.basicInfo} style={{ height: '34px', marginBottom: '4px' }}>
          <h2>{airportData.country}</h2>
          <Rating rating={airportData.averageRating} />
        </div>
        <div className={styles.basicInfo} style={{ height: '30px', marginBottom: '16px' }}>
          <p>{airportData.name}</p>
        </div>
        <div className={styles.connectionHeadline}>
          Direct connections
        </div>
        <div className={styles.connections}>
          {myConnections().map((connectionCode, index) => <div key={connectionCode}>{index !== 0 ? ' | ' : ''}{connectionCode} </div>)}
        </div>
        <div className={styles.buttons}>
          <button className={styles.goButton} onClick={handleStartFromClick}>Start from</button>
          <button className={styles.goButton} onClick={handleGoToClick}>Go to</button>
        </div>
      </div>
    </div>
  );
};
