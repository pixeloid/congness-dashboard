import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ExhibitionStaff } from '@/types/exhibitions';

interface ExhibitionStaffState {
  staff: ExhibitionStaff[];
  isLoading: boolean;
  error: string | null;
  actions: {
    addStaffMember: (exhibitionId: number, name: string, email: string) => void;
    updateStaffMember: (id: number, updates: Partial<ExhibitionStaff>) => void;
    deleteStaffMember: (id: number) => void;
    fetchStaff: (exhibitionId: number) => Promise<void>;
  };
}

const initialStaff: ExhibitionStaff[] = [
  {
    id: 1,
    name: "Kovács János",
    email: "kovacs.janos@example.com",
    exhibitionId: 1
  },
  {
    id: 2,
    name: "Nagy Éva",
    email: "nagy.eva@example.com",
    exhibitionId: 1
  }
];

export const useExhibitionStaffStore = create<ExhibitionStaffState>()(
  immer((set) => ({
    staff: initialStaff,
    isLoading: false,
    error: null,
    actions: {
      addStaffMember: (exhibitionId, name, email) => {
        set((state) => {
          const newId = Math.max(...state.staff.map(s => s.id), 0) + 1;
          state.staff.push({
            id: newId,
            name,
            email,
            exhibitionId
          });
        });
      },

      updateStaffMember: (id, updates) => {
        set((state) => {
          const index = state.staff.findIndex(s => s.id === id);
          if (index !== -1) {
            state.staff[index] = { ...state.staff[index], ...updates };
          }
        });
      },

      deleteStaffMember: (id) => {
        set((state) => {
          state.staff = state.staff.filter(s => s.id !== id);
        });
      },

      fetchStaff: async (exhibitionId) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          set((state) => ({
            staff: initialStaff.filter(s => s.exhibitionId === exhibitionId),
            isLoading: false
          }));
        } catch (error) {
          set({ error: 'Failed to fetch staff members', isLoading: false });
        }
      },
    },
  }))
);