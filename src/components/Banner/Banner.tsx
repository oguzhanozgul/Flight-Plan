import * as React from 'react';

import { LayoverBar } from '../LayoverBar/LayoverBar';
import styles from './Search.scss';

interface Props {
  from: string;
  to: string;
  layovers: string[];
}

export const Banner = ({ from, to, layovers }: Props) => {
  const changesCount = layovers.length;

  return (
    <div className={styles.banner}>

      <div className={styles.travel}>
        <span className={styles.bannerAirportName}>{from}</span>

        <LayoverBar layovers={layovers} />

        <span className={styles.bannerAirportName}>{to}</span>
      </div>

      <div className={styles.summary}>
        <span>{changesCount === 0 ? 'Direct' : `${changesCount} change${changesCount > 1 ? 's' : ''}`}</span>
        <button className={styles.goButton}>Go!</button>
      </div>

    </div>
  );
};
