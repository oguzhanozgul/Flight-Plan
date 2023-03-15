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
    large: string;
  };
  averageRating: number;
}

export type Connections = {
  [key: string]: number[];
}

export type ServiceResponse<T> = {
  data: T;
  success: boolean;
  message: string;
}
