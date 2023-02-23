import * as React from 'react';

import { IconStar } from '../../assets/icons/IconStar';
import { IconStarOutline } from '../../assets/icons/IconStarOutline';

import * as styles from './Rating.scss';

interface Props {
  rating: number;
}

export const Rating = ({ rating }: Props) => {
  const fullStarCount = Math.round(rating);
  const emptyStarCount = 5 - fullStarCount;

  return (
    <div className={styles.rating}>
      {Array.from({ length: fullStarCount }, (_, i) =>
        <IconStar key={i} />
      )}
      {Array.from({ length: emptyStarCount }, (_, i) =>
        <IconStarOutline key={i} />
      )}
    </div>
  );
};
