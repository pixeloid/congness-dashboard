import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ParticipantFilters } from '@/features/participant/types/participants';

interface ParticipantsState {
  filters: ParticipantFilters;
  actions: {
    setFilters: (filters: ParticipantFilters) => void;
  };
}

export const useParticipantsStore = create<ParticipantsState>()(
  immer((set) => ({
    filters: {},
    actions: {

      setFilters: (filters) => {
        set({ filters });
      },

    },
  }))
);