/* eslint-disable max-len */
import * as React from 'react';

import change0 from '../../assets/images/Change0.svg';
import change1 from '../../assets/images/Change1.svg';
import change2 from '../../assets/images/Change2.svg';
import change3 from '../../assets/images/Change3.svg';
import change4 from '../../assets/images/Change4.svg';
import change5 from '../../assets/images/Change5.svg';
interface Props {
  layovers: number;
}

export const Change = ({ layovers }: Props) => {
  switch (layovers) {
    case 0:
      return (
        <img src={change0} width="100%" height="auto" alt="direct flight" />
      );
    case 1:
      return (
        <img src={change1} width="100%" height="12px" alt="One change" />
      );
    case 2:
      return (
        <img src={change2} width="100%" height="auto" alt="Two changes" />
      );
    case 3:
      return (
        <img src={change3} width="100%" height="auto" alt="Three changes" />
      );
    case 4:
      return (
        <img src={change4} width="100%" height="auto" alt="Four changes" />
      );
    case 5:
      return (
        <img src={change5} width="100%" height="auto" alt="Five changes" />
      );

    default:
      break;
  }

  return (
    <img src={change0} width="100%" height="auto" alt="direct flight" />
  );
};
