
export type CheckpointType = 'registration' | 'dining' | 'program' | 'general';
export type CheckpointStatus = 'active' | 'inactive' | 'scheduled';
export type CheckpointRestriction = 'none' | 'paid' | 'vip' | 'staff';

export interface Checkpoint {
  id: number;
  name: string;
  description?: string;
  type: CheckpointType;
  status: CheckpointStatus;
  restriction: CheckpointRestriction;
  occasionId: number;
  location?: string;
  capacity?: number;
  startTime?: string;
  endTime?: string;
  requiresPassport?: boolean;
  price?: number;
}

export interface CheckpointVisit {
  id: number;
  checkpointId: number;
  participantId: number;
  timestamp: string;
  staffId: number;
  notes?: string;
  validated: boolean;
}

export interface ParticipantPassport {
  id: number;
  participantId: number;
  occasionId: number;
  checkpoints: {
    checkpointId: number;
    visitId: number;
    timestamp: string;
    validated: boolean;
  }[];
  completed: boolean;
  completedAt?: string;
}

export interface CheckpointStats {
  totalVisits: number;
  uniqueVisitors: number;
  currentCapacity?: number;
  lastVisit?: string;
  validationRate: number;
}

export interface CheckpointFilters {
  type?: CheckpointType;
  status?: CheckpointStatus;
  restriction?: CheckpointRestriction;
  search?: string;
  occasionId?: number;
}