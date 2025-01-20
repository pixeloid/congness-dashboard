import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AbstractCategory, AbstractInvitation, AbstractSubmissionProcess } from '@/features/abstract/types/abstractSubmission';

interface AbstractSubmissionState {
  process: AbstractSubmissionProcess | null;
  categories: AbstractCategory[];
  invitations: AbstractInvitation[];
  isLoading: boolean;
  error: string | null;
  actions: {
    fetchSubmissionProcess: (code: number) => Promise<void>;
    updateSubmissionProcess: (code: number, updates: Partial<AbstractSubmissionProcess>) => Promise<void>;
    fetchCategories: (code: number) => Promise<void>;
    fetchInvitations: (code: number) => Promise<void>;
    addCategory: (category: Omit<AbstractCategory, 'id'>) => void;
    updateCategory: (id: number, updates: Partial<AbstractCategory>) => void;
    deleteCategory: (id: number) => void;
    sendInvitation: (email: string, code: number) => Promise<void>;
    resendInvitation: (id: number) => Promise<void>;
    validateInvitationToken: (token: string) => Promise<AbstractInvitation | null>;
    handleInvitationResponse: (token: string, accept: boolean) => Promise<void>;
  };
}

const dummyCategories: AbstractCategory[] = [
  {
    id: 1,
    name: "Clinical Research",
    description: "Original clinical research studies",
    maxWordCount: 300,
    isActive: true
  },
  {
    id: 2,
    name: "Basic Science",
    description: "Fundamental research and laboratory studies",
    maxWordCount: 250,
    isActive: true
  }
];

const dummyInvitations: AbstractInvitation[] = [
  {
    id: 1,
    email: "pending@example.com",
    token: "pending-token",
    occasionId: 1,
    categoryId: 1,
    status: "pending",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    invitedAt: new Date().toISOString()
  },
  {
    id: 2,
    email: "accepted@example.com",
    token: "accepted-token",
    occasionId: 1,
    categoryId: 1,
    status: "accepted",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    invitedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    respondedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    email: "rejected@example.com",
    token: "rejected-token",
    occasionId: 1,
    categoryId: 1,
    status: "rejected",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    invitedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    respondedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 4,
    email: "expired@example.com",
    token: "expired-token",
    occasionId: 1,
    categoryId: 1,
    status: "expired",
    expiresAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    invitedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const useAbstractSubmissionStore = create<AbstractSubmissionState>()(
  immer((set) => ({
    process: null,
    categories: [],
    invitations: [],
    isLoading: false,
    error: null,
    actions: {
      fetchSubmissionProcess: async (code) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call with shorter delay
          await new Promise(resolve => setTimeout(resolve, 100));
          set(state => {
            state.process = {
              id: 1,
              occasionId: code,
              isPublic: false,
              startDate: "2025-01-01T00:00:00Z",
              submissionDeadline: "2025-01-25T23:59:59Z",
              reviewDeadline: "2025-02-10T23:59:59Z",
              chiefReviewDeadline: "2025-02-20T23:59:59Z",
              endDate: "2025-03-01T23:59:59Z",
              maxAbstracts: 3,
              categories: dummyCategories,
              guidelines: "Sample guidelines"
            };
            state.isLoading = false;
          });
        } catch (error) {
          set({ error: 'Failed to fetch submission process', isLoading: false });
        }
      },
      updateSubmissionProcess: async (code: number, updates: Partial<AbstractSubmissionProcess>) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          set(state => {
            if (state.process && state.process.occasionId === code) {
              state.process = { ...state.process, ...updates };
            }
            state.isLoading = false;
          });
        } catch (error) {
          set({ error: 'Failed to update submission process', isLoading: false });
        }
      },

      fetchCategories: async () => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          set(state => {
            state.categories = dummyCategories;
            state.isLoading = false;
          });
        } catch (error) {
          set({ error: 'Failed to fetch categories', isLoading: false });
        }
      },

      fetchInvitations: async (code) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          set(state => {
            state.invitations = dummyInvitations.filter(i => i.occasionId === code);
            state.isLoading = false;
          });
        } catch (error) {
          set({ error: 'Failed to fetch invitations', isLoading: false });
        }
      },

      addCategory: (category) => {
        set(state => {
          const newId = Math.max(...state.categories.map(c => c.id), 0) + 1;
          state.categories.push({ ...category, id: newId });
        });
      },

      updateCategory: (id, updates) => {
        set(state => {
          const index = state.categories.findIndex(c => c.id === id);
          if (index !== -1) {
            state.categories[index] = { ...state.categories[index], ...updates };
          }
        });
      },

      deleteCategory: (id) => {
        set(state => {
          state.categories = state.categories.filter(c => c.id !== id);
        });
      },

      sendInvitation: async (email) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          set(state => {
            const newId = Math.max(...state.invitations.map(i => i.id), 0) + 1;
            state.invitations.push({
              id: newId,
              email,
              token: `token-${newId}`,
              occasionId: 1,
              categoryId: 1,
              status: 'pending',
              expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
              invitedAt: new Date().toISOString()
            });
            state.isLoading = false;
          });
        } catch (error) {
          set({ error: 'Failed to send invitation', isLoading: false });
        }
      },

      resendInvitation: async (id) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          set(state => {
            const invitation = state.invitations.find(i => i.id === id);
            if (invitation) {
              invitation.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
              invitation.invitedAt = new Date().toISOString();
            }
            state.isLoading = false;
          });
        } catch (error) {
          set({ error: 'Failed to resend invitation', isLoading: false });
        }
      },

      validateInvitationToken: async (token) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          const invitation = dummyInvitations.find(i => i.token === token && i.status === 'pending');
          set({ isLoading: false });
          return invitation || null;
        } catch (error) {
          set({ error: 'Failed to validate token', isLoading: false });
          return null;
        }
      },

      handleInvitationResponse: async (token, accept) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          set(state => {
            const invitation = state.invitations.find(i => i.token === token);
            if (invitation) {
              invitation.status = accept ? 'accepted' : 'rejected';
              invitation.respondedAt = new Date().toISOString();
            }
            state.isLoading = false;
          });
        } catch (error) {
          set({ error: 'Failed to handle response', isLoading: false });
        }
      }
    }
  }))
);