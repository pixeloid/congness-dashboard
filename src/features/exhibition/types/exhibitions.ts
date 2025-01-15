export interface Exhibition {
  id: number;
  name: string;
  privacy_doc: string;
  enabledLeadCapture: boolean;
  banner?: string;
  pdf?: string;
  occasionId: number;
}

export interface ExhibitionStaff {
  id: number;
  name: string;
  email: string;
  exhibitionId: number;
}

export interface LeadCapture {
  id: number;
  notes: string;
  participantId: number;
  exhibitionId: number;
  capturedById: number;
  createdAt: string;
}

export interface ExhibitionFilters {
  search?: string;
  occasionId?: number;
}
