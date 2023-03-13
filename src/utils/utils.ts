import { Connections } from "../types/types";

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

// LEGACY: Code used to parse the connections with the older version of the API, not used anymore
export const parseConnections = (connString: string): Connections => {
  const retVal: Connections = {};
  connString.split(/\r?\n/).forEach((connection) => {
    const [key, rest] = connection.split(/:/);
    retVal[key] = rest.trim().split(/,\s/).map((element) => parseInt(element));
  });

  return retVal;
};

export const airportIdToCode = (id: number, airports: Airports): string => airports.find((airport) => airport.id === id)!.code;

export default parseAirportName;
