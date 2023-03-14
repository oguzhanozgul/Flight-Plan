import { AirportData } from "../types/types";

// LEGACY: Code used to parse the airport name with the older version of the API, not used anymore
export const parseAirportName = (rawName: string): string => {
  // This is not a perfect solution see Tel-Aviv for example.
  // Perfect solution is to have the API response normalized: instead of 1 field for City and Airport Name, which is
  // not always in the same format, we should have city: and airportName: separately.
  const beforeHyphen = /.*(?=-)/;
  const afterHyphen = /(?<=-).*/;

  const cityResult = rawName.match(beforeHyphen);
  const airportResult = rawName.match(afterHyphen);

  const cityName = cityResult ? cityResult[0].trim() : "";
  const airportName = airportResult ? airportResult[0].trim() : "";

  return `${cityName}${cityName ? ", " : ""}${airportName}`;
};

export const airportIdToCode = (id: number, airports: AirportData[]): string => airports.find(
  (airport) => airport.id === id,
)!.code;

export default parseAirportName;
