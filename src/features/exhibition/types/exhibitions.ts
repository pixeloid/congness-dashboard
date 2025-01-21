import { Filters } from "@/services/ReactQueryService";
export interface Exhibition {
  ['@id']?: string;
  name: string;
  status: 'active' | 'inactive' | 'scheduled';
  type: 'registration' | 'dining' | 'program';
  description: string;
  location?: string;
  startTime?: string;
  endTime?: string;
  price?: number;
  requiresPassport?: boolean;
  checkinsCount: number;
  privacy_doc: string;
  enabledLeadCapture: boolean;
  banner?: string;
  pdf?: string;
  occasionId: number;
}

export interface ExhibitionStaff {
  ['@id']?: string;
  name: string;
  email: string;
  exhibitionId: number;
}

export interface LeadCapture {
  ['@id']?: string;
  notes: string;
  participantId: number;
  exhibitionId: number;
  capturedById: number;
  createdAt: string;
}

export interface ExhibitionFilters extends Filters {
  search?: string;
  occasionId?: number;
}
