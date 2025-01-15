import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  Checkpoint,
  CheckpointVisit,
  ParticipantPassport,
  CheckpointStats,
  CheckpointFilters
} from '@/features/checkpoints/types/checkpoints';

interface CheckpointState {
  checkpoints: Checkpoint[];
  visits: CheckpointVisit[];
  passports: ParticipantPassport[];
  filters: CheckpointFilters;
  isLoading: boolean;
  error: string | null;
  selectedCheckpoint: Checkpoint | null;
  actions: {
    addCheckpoint: (checkpoint: Omit<Checkpoint, 'id'>) => void;
    updateCheckpoint: (id: number, updates: Partial<Checkpoint>) => void;
    deleteCheckpoint: (id: number) => void;
    recordVisit: (
      checkpointId: number,
      participantId: number,
      staffId: number,
      notes?: string
    ) => void;
    validateVisit: (visitId: number) => void;
    createPassport: (participantId: number, occasionId: number) => void;
    getCheckpointStats: (checkpointId: number) => CheckpointStats;
    setFilters: (filters: CheckpointFilters) => void;
    setSelectedCheckpoint: (checkpoint: Checkpoint | null) => void;
    fetchCheckpoints: (occasionId: number) => Promise<void>;
    fetchParticipantPassport: (participantId: number, occasionId: number) => Promise<void>;
  };
}

// Mock data for development
const initialCheckpoints: Checkpoint[] = [
  {
    id: 1,
    name: "Main Registration",
    description: "Main entrance registration desk",
    type: "registration",
    status: "active",
    restriction: "none",
    occasionId: 1,
    location: "Main Hall",
    requiresPassport: false
  },
  {
    id: 2,
    name: "VIP Dinner",
    description: "Exclusive dinner event",
    type: "dining",
    status: "scheduled",
    restriction: "vip",
    occasionId: 1,
    location: "Restaurant",
    capacity: 50,
    startTime: "2024-03-15T19:00:00Z",
    endTime: "2024-03-15T22:00:00Z",
    requiresPassport: true,
    price: 100
  }
];

const initialVisits: CheckpointVisit[] = [
  {
    id: 1,
    checkpointId: 1,
    participantId: 1,
    timestamp: new Date().toISOString(),
    staffId: 1,
    validated: true
  }
];

const initialPassports: ParticipantPassport[] = [
  {
    id: 1,
    participantId: 1,
    occasionId: 1,
    checkpoints: [
      {
        checkpointId: 1,
        visitId: 1,
        timestamp: new Date().toISOString(),
        validated: true
      }
    ],
    completed: false
  }
];

export const useCheckpointStore = create<CheckpointState>()(
  immer((set, get) => ({
    checkpoints: initialCheckpoints,
    visits: initialVisits,
    passports: initialPassports,
    filters: {},
    isLoading: false,
    error: null,
    selectedCheckpoint: null,
    actions: {
      addCheckpoint: (checkpoint) => {
        set((state) => {
          const newId = Math.max(...state.checkpoints.map(c => c.id), 0) + 1;
          state.checkpoints.push({ ...checkpoint, id: newId });
        });
      },

      updateCheckpoint: (id, updates) => {
        set((state) => {
          const index = state.checkpoints.findIndex(c => c.id === id);
          if (index !== -1) {
            state.checkpoints[index] = { ...state.checkpoints[index], ...updates };
          }
        });
      },

      deleteCheckpoint: (id) => {
        set((state) => {
          state.checkpoints = state.checkpoints.filter(c => c.id !== id);
          state.visits = state.visits.filter(v => v.checkpointId !== id);
        });
      },

      recordVisit: (checkpointId, participantId, staffId, notes) => {
        set((state) => {
          const newId = Math.max(...state.visits.map(v => v.id), 0) + 1;
          const visit: CheckpointVisit = {
            id: newId,
            checkpointId,
            participantId,
            staffId,
            timestamp: new Date().toISOString(),
            notes,
            validated: false
          };
          state.visits.push(visit);

          // Update passport if exists
          const passport = state.passports.find(
            p => p.participantId === participantId
          );
          if (passport) {
            passport.checkpoints.push({
              checkpointId,
              visitId: newId,
              timestamp: visit.timestamp,
              validated: false
            });
          }
        });
      },

      validateVisit: (visitId) => {
        set((state) => {
          const visit = state.visits.find(v => v.id === visitId);
          if (visit) {
            visit.validated = true;

            // Update passport validation
            const passport = state.passports.find(p =>
              p.checkpoints.some(c => c.visitId === visitId)
            );
            if (passport) {
              const checkpoint = passport.checkpoints.find(c => c.visitId === visitId);
              if (checkpoint) {
                checkpoint.validated = true;
              }
            }
          }
        });
      },

      createPassport: (participantId, occasionId) => {
        set((state) => {
          const exists = state.passports.some(
            p => p.participantId === participantId && p.occasionId === occasionId
          );

          if (!exists) {
            const newId = Math.max(...state.passports.map(p => p.id), 0) + 1;
            state.passports.push({
              id: newId,
              participantId,
              occasionId,
              checkpoints: [],
              completed: false
            });
          }
        });
      },

      getCheckpointStats: (checkpointId) => {
        const state = get();
        const visits = state.visits.filter(v => v.checkpointId === checkpointId);
        const uniqueVisitors = new Set(visits.map(v => v.participantId)).size;
        const validatedVisits = visits.filter(v => v.validated).length;
        const lastVisit = visits.length > 0
          ? visits.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0].timestamp
          : undefined;

        return {
          totalVisits: visits.length,
          uniqueVisitors,
          lastVisit,
          validationRate: visits.length > 0 ? validatedVisits / visits.length : 0
        };
      },

      setFilters: (filters) => {
        set({ filters });
      },

      setSelectedCheckpoint: (checkpoint) => {
        set({ selectedCheckpoint: checkpoint });
      },

      fetchCheckpoints: async (occasionId) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          set((_state) => ({
            checkpoints: initialCheckpoints.filter(c => c.occasionId === occasionId),
            isLoading: false
          }));
        } catch (error) {
          set({ error: 'Failed to fetch checkpoints', isLoading: false });
        }
      },

      fetchParticipantPassport: async (participantId, occasionId) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          set((_state) => ({
            passports: initialPassports.filter(
              p => p.participantId === participantId && p.occasionId === occasionId
            ),
            isLoading: false
          }));
        } catch (error) {
          set({ error: 'Failed to fetch participant passport', isLoading: false });
        }
      },
    },
  }))
);