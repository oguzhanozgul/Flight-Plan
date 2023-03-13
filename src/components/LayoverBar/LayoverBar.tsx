import { Change } from "./Change";

import "../../pages/search/Search.css";

interface Props {
  layovers: string[];
}

export function LayoverBar({ layovers }: Props) {
  return (

    <div className="layoverGroup">

      <Change layovers={layovers.length} />

      <div className="layoverNames">
        <div className="layoverPlaceholder" />
        {
          layovers.map((layover) => (
            <span key={layover}>{layover}</span>
          ))
        }
        <div className="layoverPlaceholder" />
      </div>

    </div>
  );
}

export default LayoverBar;
