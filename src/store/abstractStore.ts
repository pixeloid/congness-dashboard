import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Abstract, Review } from '@/types/abstract';
import { abstracts as initialAbstracts } from '@/data/abstractsData';

interface AbstractState {
  abstracts: Abstract[];
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
  actions: {
    fetchAbstracts: (occasionId: number) => Promise<void>;
    fetchReviews: (abstractId: number) => Promise<void>;
    submitAbstract: (abstract: Omit<Abstract, 'id' | 'status' | 'submittedAt'>) => Promise<void>;
    submitReview: (review: Omit<Review, 'id' | 'status' | 'assignedAt'>) => Promise<void>;
    makeDecision: (abstractId: number, decision: 'accept' | 'reject', presentationType?: 'oral' | 'poster') => Promise<void>;
    inviteSubmitter: (email: string, occasionId: number) => Promise<void>;
  };
}

export const useAbstractStore = create<AbstractState>()(
  immer((set) => ({
    abstracts: initialAbstracts,
    reviews: [],
    isLoading: false,
    error: null,
    actions: {
      fetchAbstracts: async (occasionId) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          set(state => {
            state.abstracts = initialAbstracts.filter(a => a.occasionId === occasionId);
            state.isLoading = false;
          });
        } catch (error) {
          set({ error: 'Failed to fetch abstracts', isLoading: false });
        }
      },

      fetchReviews: async (abstractId) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          set(state => {
            state.reviews = []; // Replace with actual reviews
            state.isLoading = false;
          });
        } catch (error) {
          set({ error: 'Failed to fetch reviews', isLoading: false });
        }
      },

      submitAbstract: async (abstract) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          set(state => {
            const newId = Math.max(...state.abstracts.map(a => a.id), 0) + 1;
            state.abstracts.push({
              ...abstract,
              id: newId,
              status: 'submitted',
              submittedAt: new Date().toISOString()
            });
            state.isLoading = false;
          });
        } catch (error) {
          set({ error: 'Failed to submit abstract', isLoading: false });
        }
      },

      submitReview: async (review) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          set(state => {
            const newId = Math.max(...state.reviews.map(r => r.id), 0) + 1;
            state.reviews.push({
              ...review,
              id: newId,
              status: 'completed',
              assignedAt: new Date().toISOString()
            });
            state.isLoading = false;
          });
        } catch (error) {
          set({ error: 'Failed to submit review', isLoading: false });
        }
      },

      makeDecision: async (abstractId, decision, presentationType) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          set(state => {
            const abstract = state.abstracts.find(a => a.id === abstractId);
            if (abstract) {
              abstract.status = decision === 'accept' ? 'accepted' : 'rejected';
              if (presentationType) {
                abstract.presentationType = presentationType;
              }
            }
            state.isLoading = false;
          });
        } catch (error) {
          set({ error: 'Failed to make decision', isLoading: false });
        }
      },

      inviteSubmitter: async (email, occasionId) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          console.log(`Invitation sent to ${email} for occasion ${occasionId}`);
          set({ isLoading: false });
        } catch (error) {
          set({ error: 'Failed to send invitation', isLoading: false });
        }
      }
    }
  }))
);