import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { participants as initialParticipants } from '@/data/participantsData';
import { Participant, ParticipantFilters } from '@/features/participant/types/participants';

interface ParticipantsState {
  participants: Participant[];
  filters: ParticipantFilters;
  isLoading: boolean;
  error: string | null;
  selectedParticipant: Participant | null;
  actions: {
    addParticipant: (participant: Omit<Participant, 'id'>) => void;
    updateParticipant: (id: number, updates: Partial<Participant>) => void;
    deleteParticipant: (id: number) => void;
    setFilters: (filters: ParticipantFilters) => void;
    setSelectedParticipant: (participant: Participant | null) => void;
    fetchParticipants: (occasionId: number) => Promise<void>;
  };
}

export const useParticipantsStore = create<ParticipantsState>()(
  immer((set) => ({
    participants: initialParticipants,
    filters: {},
    isLoading: false,
    error: null,
    selectedParticipant: null,
    actions: {
      addParticipant: (participant) => {
        set((state) => {
          const newId = Math.max(...state.participants.map(p => p.id), 0) + 1;
          state.participants.push({ ...participant, id: newId });
        });
      },

      updateParticipant: (id, updates) => {
        set((state) => {
          const index = state.participants.findIndex(p => p.id === id);
          if (index !== -1) {
            state.participants[index] = { ...state.participants[index], ...updates };
          }
        });
      },

      deleteParticipant: (id) => {
        set((state) => {
          state.participants = state.participants.filter(p => p.id !== id);
        });
      },

      setFilters: (filters) => {
        set({ filters });
      },

      setSelectedParticipant: (participant) => {
        set({ selectedParticipant: participant });
      },

      fetchParticipants: async (occasionId: number) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          set({ participants: initialParticipants.filter(p => p.id === occasionId), isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch participants', isLoading: false });
        }
      },
    },
  }))
);