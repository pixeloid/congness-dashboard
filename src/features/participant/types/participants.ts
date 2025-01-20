export interface Participant {
  '@id'?: string;
  code?: string;
  first_name: string;
  last_name: string;
  email: string;
  title?: string;
  organization?: string;
  occasion: string;
  role: 'attendee' | 'speaker' | 'organizer' | 'staff';
  status: 'registered' | 'confirmed' | 'cancelled' | 'attended';
  badgeId?: string;
  dietaryRestrictions?: string[];
  notes?: string;
}

export interface ParticipantFilters {
  role?: string;
  status?: string;
  search?: string;
}