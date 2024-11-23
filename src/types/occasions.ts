export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Venue {
  name: string;
  address: string;
  coordinates: Coordinates;
  photo: string;
  description: string;
  url: string;
}

export interface Occasion {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  venue: Venue;
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
    perPage: number;
  };
}