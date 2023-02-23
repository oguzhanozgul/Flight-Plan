import * as React from 'react';

import { Change } from './Change';

import styles from './Search.scss';

interface Props {
  layovers: string[];
}

export const LayoverBar = ({ layovers }: Props) => {
  return (

    <div className={styles.layoverGroup}>

      <Change layovers={layovers.length} />

      <div className={styles.layoverNames}>
        <div className={styles.layoverPlaceholder} />
        {
          layovers.map(layover =>
            <>
              <span key={layover}>{layover}</span>
            </>
          )
        }
        <div className={styles.layoverPlaceholder} />
      </div>

    </div >
  );
};
