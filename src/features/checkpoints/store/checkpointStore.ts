import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  CheckpointFilters
} from '@/features/checkpoints/types/checkpoints';

interface CheckpointState {
  filters: CheckpointFilters;
  actions: {
    setFilters: (filters: CheckpointFilters) => void;
  };
}

export const useCheckpointStore = create<CheckpointState>()(
  immer((set) => ({
    filters: {},
    actions: {

      setFilters: (filters) => {
        set({ filters });
      },

    },
  }))
);