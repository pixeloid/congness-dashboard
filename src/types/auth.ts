export type UserRole = 'exhibitor' | 'exhibition_staff' | 'participant' | 'event_manager';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  exhibitionId?: number; // For exhibition staff
  participantId?: number; // For participants
  exhibitorId?: number; // For exhibitors
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}