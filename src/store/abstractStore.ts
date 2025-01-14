import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Abstract, Review, AbstractPresentation } from '@/types/abstract';
import { v4 as uuidv4 } from 'uuid';
import { abstracts as initialAbstracts } from '@/data/abstractsData';

// Mock review data
const initialReviews: Review[] = [
  {
    id: 1,
    abstractId: 1,
    reviewerId: 3, // Szakmai Bíráló 1 (Dr. Szabó Anna)
    rating: 8,
    comments: "Klinikai kutatás és neurológia szempontjából kiváló munka",
    recommendation: 'accept',
    status: 'completed',
    assignedAt: "2024-01-16T10:00:00Z",
    completedAt: "2024-01-18T15:30:00Z",
    deadline: "2024-03-01T23:59:59Z"
  },
  {
    id: 2,
    abstractId: 1,
    reviewerId: 4, // Szakmai Bíráló 2 (Dr. Kiss Márta)
    rating: 9,
    comments: "Kardiológia és orvosi technológia szempontjából jelentős eredmények",
    recommendation: 'accept',
    status: 'completed',
    assignedAt: "2024-01-16T10:00:00Z",
    completedAt: "2024-01-17T14:20:00Z",
    deadline: "2024-03-01T23:59:59Z"
  },
  {
    id: 3,
    abstractId: 2,
    reviewerId: 3,
    rating: 6,
    comments: "Klinikai kutatás és neurológia szempontjából megfelelő",
    recommendation: 'accept',
    status: 'completed',
    assignedAt: "2024-01-16T10:00:00Z",
    completedAt: "2024-01-19T11:45:00Z",
    deadline: "2024-01-20T23:59:59Z"
  },
  {
    id: 4,
    abstractId: 2,
    reviewerId: 4,
    rating: 4,
    comments: "Kardiológia és orvosi technológia szempontjából átgondolandó",
    recommendation: 'accept',
    status: 'completed',
    assignedAt: "2024-01-16T10:00:00Z",
    completedAt: "2024-01-18T09:15:00Z",
    deadline: "2024-01-20T23:59:59Z"
  },
  {
    id: 5,
    abstractId: 5,
    reviewerId: 3,
    rating: 8,
    comments: "Innovatív megközelítés, jól kidolgozott módszertan",
    recommendation: 'accept',
    status: 'completed',
    assignedAt: "2024-05-16T10:00:00Z",
    completedAt: "2024-05-18T15:30:00Z",
    deadline: "2024-06-01T23:59:59Z"
  },
  {
    id: 6,
    abstractId: 5,
    reviewerId: 4,
    rating: 9,
    comments: "Kiemelkedő kutatási eredmények",
    recommendation: 'accept',
    status: 'completed',
    assignedAt: "2024-05-16T10:00:00Z",
    completedAt: "2024-05-17T14:20:00Z",
    deadline: "2024-06-01T23:59:59Z"
  }
];

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
    createPresentation: (abstractId: number) => AbstractPresentation | null;
  };
}

export const useAbstractStore = create<AbstractState>()(
  immer((set, get) => ({
    abstracts: initialAbstracts,
    reviews: initialReviews,
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
            state.reviews = initialReviews.filter(r => r.abstractId === abstractId);
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
              assignedAt: new Date().toISOString(),
              completedAt: new Date().toISOString()
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

      createPresentation: (abstractId) => {
        const abstract = get().abstracts.find(a => a.id === abstractId);

        if (!abstract || abstract.status !== 'accepted' || !abstract.presentationType) {
          return null;
        }

        // Default durations based on presentation type
        const duration = abstract.presentationType === 'oral' ? 20 : 10;

        return {
          id: uuidv4(),
          title: abstract.title,
          description: abstract.description,
          authors: abstract.authors,
          duration,
          type: 'session',
          presentationType: abstract.presentationType,
          abstractId: abstract.id
        };
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