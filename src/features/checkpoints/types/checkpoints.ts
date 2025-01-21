import { Filters } from "@/services/ReactQueryService";

export type CheckpointType = 'registration' | 'dining' | 'program' | 'general';
export type CheckpointStatus = 'active' | 'inactive' | 'scheduled';
export type CheckpointRestriction = 'none' | 'paid' | 'vip' | 'staff';

export interface Checkpoint {
  '@id'?: string;
  name: string;
  description?: string;
  type: CheckpointType;
  status: CheckpointStatus;
  restriction: CheckpointRestriction;
  occasion: string;
  location?: string;
  capacity?: number;
  startTime?: string;
  endTime?: string;
  requiresPassport?: boolean;
  price?: number;
  checkinsCount?: number;
}

export interface CheckpointVisit {
  '@id'?: string;
  checkpointId: number;
  participantId: number;
  timestamp: string;
  staffId: number;
  notes?: string;
  validated: boolean;
}

export interface ParticipantPassport {
  '@id': string;
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

export interface CheckpointFilters extends Filters {
  type?: CheckpointType;
  status?: CheckpointStatus;
  restriction?: CheckpointRestriction;
  search?: string;
  occasionId?: number;
}