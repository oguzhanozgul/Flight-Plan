/* eslint-disable functional/immutable-data */
import { Connections } from '../types/types';

type AirportSearchBFSDS = {
  source: number;
  destination: number;
  connections: Connections;
  maxAirports: number;
  minNumberOfSearchResults: number;
}

export const findAllPaths = (
  connections: Connections,
  airportFrom: number,
  airportTo: number,
  maxConnections: number,
  minNumberOfSearchResults: number): number[][] => {
  const reductionToAccountForSourceAndDestination = 2;
  const maxAirports = maxConnections + reductionToAccountForSourceAndDestination;

  const airportSearchBreadthFSDS: AirportSearchBFSDS = {
    connections,
    destination: airportTo,
    maxAirports,
    minNumberOfSearchResults,
    source: airportFrom,
  };

  return bfs(airportSearchBreadthFSDS);
};

function bfs(airportSearchBFSDS: AirportSearchBFSDS): number[][] {
  const queue: number[][] = []; // a queue which will store the paths
  const foundPaths: number[][] = []; // array to keep the paths we found
  queue.push([airportSearchBFSDS.source]); // Initialize queue with the first path which is the source airport only

  // start traversing inside to outside
  while (queue.length) { // as long as there is a path in the queue
    if (foundPaths.length >= airportSearchBFSDS.minNumberOfSearchResults) { break; } // exit while if we found enough paths

    const currentPath = queue.shift()!; // move the first in line path from the queue to path variable
    if (currentPath.length > airportSearchBFSDS.maxAirports) { break; } // exit while if the path is longer than we want

    // check the last airport in the path and print if it's the destination
    const lastAirportInPath = currentPath[currentPath.length - 1];
    if (lastAirportInPath === airportSearchBFSDS.destination) {
      foundPaths.push(currentPath);
    }

    // then traverse all airports from the current airport and push their path to the queue
    const currentAirportConnections = airportSearchBFSDS.connections[lastAirportInPath];
    for (let i = 0; i < currentAirportConnections.length; i++) {
      // if (isNotVisited(lastNode[i], currentPath)) {
      if (!currentPath.includes(currentAirportConnections[i])) {
        const newPath = structuredClone(currentPath); // copy the current path to the new path
        newPath.push(currentAirportConnections[i]); // add the connection of the current airport to the new path
        queue.push(newPath); // push the new path to the queue to be processed next
      }
    }
  }

  return foundPaths;
}

export default findAllPaths;
