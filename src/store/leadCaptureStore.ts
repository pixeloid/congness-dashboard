import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { LeadCapture } from '@/types/exhibitions';

interface LeadCaptureState {
  leads: LeadCapture[];
  isLoading: boolean;
  error: string | null;
  actions: {
    captureLead: (
      exhibitionId: number,
      participantId: number,
      notes: string,
      capturedById: number
    ) => void;
    fetchLeads: (exhibitionId: number) => Promise<void>;
  };
}

const initialLeads: LeadCapture[] = [
  {
    id: 1,
    notes: "Interested in product A",
    participantId: 1,
    exhibitionId: 1,
    capturedById: 1,
    createdAt: new Date().toISOString()
  }
];

export const useLeadCaptureStore = create<LeadCaptureState>()(
  immer((set) => ({
    leads: initialLeads,
    isLoading: false,
    error: null,
    actions: {
      captureLead: (exhibitionId, participantId, notes, capturedById) => {
        set((state) => {
          const newId = Math.max(...state.leads.map(l => l.id), 0) + 1;
          state.leads.push({
            id: newId,
            notes,
            participantId,
            exhibitionId,
            capturedById,
            createdAt: new Date().toISOString()
          });
        });
      },

      fetchLeads: async (exhibitionId) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          set(() => ({
            leads: initialLeads.filter(l => l.exhibitionId === exhibitionId),
            isLoading: false
          }));
        } catch (error) {
          set({ error: 'Failed to fetch leads', isLoading: false });
        }
      },
    },
  }))
);