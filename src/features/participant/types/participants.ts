export interface Participant {
  id: number;
  code?: string;
  firstName: string;
  lastName: string;
  email: string;
  title?: string;
  organization?: string;
  role: 'attendee' | 'speaker' | 'organizer' | 'staff';
  status: 'registered' | 'confirmed' | 'cancelled' | 'attended';
  registrationDate: string;
  badgeId?: string;
  dietaryRestrictions?: string[];
  notes?: string;
}

export interface ParticipantFilters {
  role?: string;
  status?: string;
  search?: string;
}