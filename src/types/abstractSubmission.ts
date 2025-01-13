export interface AbstractCategory {
  id: number;
  name: string;
  description: string;
  maxWordCount?: number;
  isActive: boolean;
}

export interface AbstractInvitation {
  id: number;
  email: string;
  token: string;
  occasionId: number;
  categoryId: number;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  expiresAt: string;
  invitedAt: string;
  respondedAt?: string;
}

export interface AbstractSubmissionProcess {
  id: number;
  occasionId: number;
  isPublic: boolean;
  startDate: string;
  endDate: string;
  maxAbstracts: number;
  categories: AbstractCategory[];
  guidelines: string;
}