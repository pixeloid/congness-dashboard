import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Exhibition, ExhibitionFilters } from '@/types/exhibitions';

interface ExhibitionsState {
  exhibitions: Exhibition[];
  filters: ExhibitionFilters;
  isLoading: boolean;
  error: string | null;
  selectedExhibition: Exhibition | null;
  actions: {
    addExhibition: () => void;
    updateExhibition: (id: number, updates: Partial<Exhibition>) => void;
    deleteExhibition: (id: number) => void;
    setFilters: (filters: ExhibitionFilters) => void;
    setSelectedExhibition: (exhibition: Exhibition | null) => void;
    fetchExhibitions: () => Promise<void>;
  };
}

const initialExhibitions: Exhibition[] = [
  {
    id: 1,
    name: "Tech Innovations Expo",
    privacy_doc: "privacy_tech_expo.pdf",
    enabledLeadCapture: true,
    banner: "tech_expo_banner.jpg",
    occasionId: 1
  },
  {
    id: 2,
    name: "Medical Equipment Showcase",
    privacy_doc: "privacy_medical.pdf",
    enabledLeadCapture: true,
    banner: "medical_expo_banner.jpg",
    occasionId: 1
  }
];

export const useExhibitionsStore = create<ExhibitionsState>()(
  immer((set) => ({
    exhibitions: initialExhibitions,
    filters: {},
    isLoading: false,
    error: null,
    selectedExhibition: null,
    actions: {
      addExhibition: () => {
        set((state) => {
          const newId = Math.max(...state.exhibitions.map(e => e.id), 0) + 1;
          state.exhibitions.push({
            id: newId,
            name: "Új Kiállítás",
            privacy_doc: "",
            enabledLeadCapture: false,
            occasionId: 1
          });
        });
      },

      updateExhibition: (id, updates) => {
        set((state) => {
          const index = state.exhibitions.findIndex(e => e.id === id);
          if (index !== -1) {
            state.exhibitions[index] = { ...state.exhibitions[index], ...updates };
          }
        });
      },

      deleteExhibition: (id) => {
        set((state) => {
          state.exhibitions = state.exhibitions.filter(e => e.id !== id);
        });
      },

      setFilters: (filters) => {
        set({ filters });
      },

      setSelectedExhibition: (exhibition) => {
        set({ selectedExhibition: exhibition });
      },

      fetchExhibitions: async () => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          set({ exhibitions: initialExhibitions, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch exhibitions', isLoading: false });
        }
      },
    },
  }))
);