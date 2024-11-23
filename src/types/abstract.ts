export type AbstractStatus = 'draft' | 'submitted' | 'in_review' | 'accepted' | 'rejected';
export type PresentationType = 'oral' | 'poster';
export type ReviewStatus = 'pending' | 'in_progress' | 'completed' | 'overdue';

export interface Author {
  id: number;
  name: string;
  email: string;
  affiliation: string;
  isPresenting: boolean;
}

export interface Abstract {
  id: number;
  title: string;
  description: string;
  keywords: string[];
  authors: Author[];
  status: AbstractStatus;
  submittedAt?: string;
  submitterId: number;
  occasionId: number;
  presentationType?: PresentationType;
}

export interface Review {
  id: number;
  abstractId: number;
  reviewerId: number;
  rating: number;
  comments: string;
  recommendation: 'accept' | 'reject' | 'revise';
  status: ReviewStatus;
  assignedAt: string;
  completedAt?: string;
  deadline: string;
}

export interface Reviewer {
  id: number;
  userId: number;
  occasionId: number;
  expertise: string[];
  assignedAbstracts: number[];
}

export interface AbstractSubmission {
  id: number;
  email: string;
  token: string;
  occasionId: number;
  expiresAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}