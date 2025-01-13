export type UserRole = 'exhibitor' | 'exhibition_staff' | 'participant' | 'event_manager' | 'scientific_reviewer' | 'chief_reviewer';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  exhibitionId?: number;
  participantId?: number;
  exhibitorId?: number;
  isChiefReviewer?: boolean;
  expertise?: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}