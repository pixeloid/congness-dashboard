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

export interface Contact {
  name: string;
  email: string;
}

// Core Occasion type that connects all related entities
export interface Occasion {
  numParticipants?: number;
  '@id'?: string;
  code?: string;
  name: string;
  subtitle?: string;
  description?: string;
  url?: string;
  logo?: string;
  type: 'conference' | 'workshop' | 'training' | 'seminar';
  date_start: string;
  date_end: string;
  venue?: Venue;
  contact?: Contact;

  // Related entities
  schedule?: {
    id: string;
    days: any[]; // Imported from schedule types
  };
  abstracts?: {
    id: number;
    title: string;
    status: string;
  }[];
  exhibitions?: {
    id: number;
    name: string;
    exhibitors: {
      id: number;
      name: string;
    }[];
    hunts?: {
      id: number;
      name: string;
    }[];
  }[];
  checkpoints?: {
    id: number;
    name: string;
    type: string;
  }[];
}

// Store state interface
export interface OccasionState {
  occasions: Occasion[];
  selectedOccasion: Occasion | null;
  isLoading: boolean;
  error: string | null;
}