
export type Airports = AirportData[];

export interface BaseAirport {
  name: string;
  id: number;
}

export interface AirportData extends BaseAirport {
  code: string;
  city: string;
  country: string;
  images: {
    small: string;
    full: string;
  };
  averageRating: number;
}

export type Connection = {
  [key: string]: number[];
}

export type ServiceResponse<T> = {
  Data: T;
  Success: boolean;
  Message: string;
}