import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { occasions as initialOccasions } from '@/data/occasionsData';
import { Occasion, Venue } from '@/types/occasions';

interface OccasionsState {
  occasions: Occasion[];
  isLoading: boolean;
  error: string | null;
  selectedOccasion: Occasion | null;
  actions: {
    addOccasion: (occasion: Omit<Occasion, 'id'>) => void;
    updateOccasion: (id: number, updates: Partial<Occasion>) => void;
    deleteOccasion: (id: number) => void;
    updateVenue: (occasionId: number, updates: Partial<Venue>) => void;
    setSelectedOccasion: (occasion: Occasion | null) => void;
    fetchOccasions: () => Promise<void>;
  };
}

export const useOccasionsStore = create<OccasionsState>()(
  immer((set) => ({
    occasions: initialOccasions,
    isLoading: false,
    error: null,
    selectedOccasion: null,
    actions: {
      addOccasion: (occasion) => {
        set((state) => {
          const newId = Math.max(...state.occasions.map(o => o.id), 0) + 1;
          state.occasions.push({ ...occasion, id: newId });
        });
      },

      updateOccasion: (id, updates) => {
        set((state) => {
          const index = state.occasions.findIndex(o => o.id === id);
          if (index !== -1) {
            state.occasions[index] = { ...state.occasions[index], ...updates };
          }
        });
      },

      deleteOccasion: (id) => {
        set((state) => {
          state.occasions = state.occasions.filter(o => o.id !== id);
        });
      },

      updateVenue: (occasionId, updates) => {
        set((state) => {
          const occasion = state.occasions.find(o => o.id === occasionId);
          if (occasion) {
            occasion.venue = { ...occasion.venue, ...updates };
          }
        });
      },

      setSelectedOccasion: (occasion) => {
        set({ selectedOccasion: occasion });
      },

      fetchOccasions: async () => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          set({ occasions: initialOccasions, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch occasions', isLoading: false });
        }
      },
    },
  }))
);