// Core role types
export enum UserRole {
  PARTICIPANT = 'participant',
  EXHIBITOR = 'exhibitor',
  EXHIBITION_STAFF = 'exhibition_staff',
  EVENT_MANAGER = 'event_manager',
  SCIENTIFIC_REVIEWER = 'scientific_reviewer',
  CHIEF_REVIEWER = 'chief_reviewer'
}

// Role-specific capabilities
export interface RoleCapabilities {
  canReview?: {
    expertise: string[];
    isChief?: boolean;
  };
  participantId?: number;
  exhibitionId?: number;
  staffId?: number;
}

// Role assignment for a specific occasion
export interface OccasionRole {
  role: UserRole;
  capabilities?: RoleCapabilities & {
    details?: {
      expertise?: string[];
      [key: string]: any;
    };
  };
}

// User's role in an occasion
export interface UserOccasionRole {
  occasionId: number;
  roles: OccasionRole[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  occasionRoles: UserOccasionRole[];
}

export enum AuthStatus {
  LOADING = 'loading',
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated'
}

export interface AuthState {
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;
  error: string | null;
}