import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Abstract, Review, Reviewer, AbstractSubmission } from '@/types/abstract';
import { v4 as uuidv4 } from 'uuid';

interface AbstractState {
  abstracts: Abstract[];
  reviews: Review[];
  reviewers: Reviewer[];
  submissions: AbstractSubmission[];
  isLoading: boolean;
  error: string | null;
  actions: {
    inviteSubmitter: (email: string, occasionId: number) => void;
    submitAbstract: (abstract: Omit<Abstract, 'id' | 'status' | 'submittedAt'>) => void;
    updateAbstract: (id: number, updates: Partial<Abstract>) => void;
    assignReviewer: (abstractId: number, reviewerId: number, deadline: string) => void;
    submitReview: (review: Omit<Review, 'id' | 'status' | 'assignedAt'>) => void;
    updateReview: (id: number, updates: Partial<Review>) => void;
    makeDecision: (abstractId: number, decision: 'accept' | 'reject', presentationType?: 'oral' | 'poster') => void;
    addReviewer: (reviewer: Omit<Reviewer, 'id'>) => void;
    fetchAbstracts: (occasionId: number) => Promise<void>;
    fetchReviews: (abstractId: number) => Promise<void>;
  };
}

export const useAbstractStore = create<AbstractState>()(
  immer((set) => ({
    abstracts: [],
    reviews: [],
    reviewers: [],
    submissions: [],
    isLoading: false,
    error: null,
    actions: {
      inviteSubmitter: (email, occasionId) => {
        set((state) => {
          const token = uuidv4();
          state.submissions.push({
            id: state.submissions.length + 1,
            email,
            token,
            occasionId,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'pending'
          });
        });
      },

      submitAbstract: (abstract) => {
        set((state) => {
          state.abstracts.push({
            ...abstract,
            id: state.abstracts.length + 1,
            status: 'submitted',
            submittedAt: new Date().toISOString()
          });
        });
      },

      updateAbstract: (id, updates) => {
        set((state) => {
          const index = state.abstracts.findIndex(a => a.id === id);
          if (index !== -1) {
            state.abstracts[index] = { ...state.abstracts[index], ...updates };
          }
        });
      },

      assignReviewer: (abstractId, reviewerId, deadline) => {
        set((state) => {
          state.reviews.push({
            id: state.reviews.length + 1,
            abstractId,
            reviewerId,
            rating: 0,
            comments: '',
            recommendation: 'accept',
            status: 'pending',
            assignedAt: new Date().toISOString(),
            deadline
          });

          const reviewer = state.reviewers.find(r => r.id === reviewerId);
          if (reviewer) {
            reviewer.assignedAbstracts.push(abstractId);
          }
        });
      },

      submitReview: (review) => {
        set((state) => {
          state.reviews.push({
            ...review,
            id: state.reviews.length + 1,
            status: 'completed',
            assignedAt: new Date().toISOString(),
            completedAt: new Date().toISOString()
          });
        });
      },

      updateReview: (id, updates) => {
        set((state) => {
          const index = state.reviews.findIndex(r => r.id === id);
          if (index !== -1) {
            state.reviews[index] = { ...state.reviews[index], ...updates };
          }
        });
      },

      makeDecision: (abstractId, decision, presentationType) => {
        set((state) => {
          const abstract = state.abstracts.find(a => a.id === abstractId);
          if (abstract) {
            abstract.status = decision === 'accept' ? 'accepted' : 'rejected';
            if (decision === 'accept' && presentationType) {
              abstract.presentationType = presentationType;
            }
          }
        });
      },

      addReviewer: (reviewer) => {
        set((state) => {
          state.reviewers.push({
            ...reviewer,
            id: state.reviewers.length + 1
          });
        });
      },

      fetchAbstracts: async (occasionId) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          set((state) => ({
            abstracts: state.abstracts.filter(a => a.occasionId === occasionId),
            isLoading: false
          }));
        } catch (error) {
          set({ error: 'Failed to fetch abstracts', isLoading: false });
        }
      },

      fetchReviews: async (abstractId) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          set((state) => ({
            reviews: state.reviews.filter(r => r.abstractId === abstractId),
            isLoading: false
          }));
        } catch (error) {
          set({ error: 'Failed to fetch reviews', isLoading: false });
        }
      }
    }
  }))
);