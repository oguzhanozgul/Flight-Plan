import { LayoverBar } from "../LayoverBar/LayoverBar";
import "../../pages/search/Search.css";

interface Props {
  from: string;
  to: string;
  layovers: string[];
}

export function Banner({ from, to, layovers }: Props) {
  const changesCount = layovers.length;

  return (
    <div className="banner">

      <div className="travel">
        <span className="bannerAirportName">{from}</span>

        <LayoverBar layovers={layovers} />

        <span className="bannerAirportName">{to}</span>
      </div>

      <div className="summary">
        <span>{changesCount === 0 ? "Direct" : `${changesCount} change${changesCount > 1 ? "s" : ""}`}</span>
        <button className="goButton">Go!</button>
      </div>

    </div>
  );
}

export default Banner;
