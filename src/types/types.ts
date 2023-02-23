
export type Airports = AirportData[];

export interface BaseAirport {
  name: string;
  id: number;
}

export interface AirportData extends BaseAirport {
  code: string;
  country: string;
  images: {
    thumb: string;
    small: string;
    full: string;
  };
  averageRating: number;
}

export type Connections = {
  [key: number]: number[];
}
