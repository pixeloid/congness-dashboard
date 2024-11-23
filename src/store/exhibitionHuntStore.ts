import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { 
  ExhibitionHunt, 
  ExhibitionHuntVisit,
  ExhibitionHuntParticipant,
  HuntFilters
} from '@/types/exhibitions';

interface ExhibitionHuntState {
  hunts: ExhibitionHunt[];
  huntVisits: ExhibitionHuntVisit[];
  huntParticipants: ExhibitionHuntParticipant[];
  filters: HuntFilters;
  isLoading: boolean;
  error: string | null;
  actions: {
    createHunt: (hunt: Omit<ExhibitionHunt, 'id'>) => void;
    updateHunt: (id: number, updates: Partial<ExhibitionHunt>) => void;
    deleteHunt: (id: number) => void;
    joinHunt: (huntId: number, participantId: number) => void;
    recordVisit: (participantId: number, huntId: number, notes?: string) => void;
    completeHunt: (huntId: number, participantId: number) => void;
    setFilters: (filters: HuntFilters) => void;
    fetchHunts: (occasionId: number) => Promise<void>;
    fetchParticipantHunts: (participantId: number) => Promise<void>;
    fetchHuntProgress: (huntId: number, participantId: number) => Promise<void>;
  };
}

const initialHunts: ExhibitionHunt[] = [
  {
    id: 1,
    name: "Tech Innovation Hunt",
    description: "Visit innovative tech exhibitions and collect points!",
    startDate: "2024-03-15T09:00:00Z",
    endDate: "2024-03-17T18:00:00Z",
    minVisits: 5,
    reward: "Special Tech Badge",
    occasionId: 1,
    status: 'active'
  }
];

const initialHuntParticipants: ExhibitionHuntParticipant[] = [
  {
    id: 1,
    huntId: 1,
    participantId: 1,
    joinedAt: new Date().toISOString(),
    totalPoints: 0,
    status: 'joined'
  }
];

const initialVisits: ExhibitionHuntVisit[] = [
  {
    id: 1,
    participantId: 1,
    huntExhibitionId: 1,
    visitedAt: new Date().toISOString(),
    points: 10,
    notes: "Great interest in AI solutions"
  }
];

export const useExhibitionHuntStore = create<ExhibitionHuntState>()(
  immer((set) => ({
    hunts: initialHunts,
    huntVisits: initialVisits,
    huntParticipants: initialHuntParticipants,
    filters: {},
    isLoading: false,
    error: null,
    actions: {
      createHunt: (hunt) => {
        set((state) => {
          const newId = Math.max(...state.hunts.map(h => h.id), 0) + 1;
          state.hunts.push({ ...hunt, id: newId });
        });
      },

      updateHunt: (id, updates) => {
        set((state) => {
          const index = state.hunts.findIndex(h => h.id === id);
          if (index !== -1) {
            state.hunts[index] = { ...state.hunts[index], ...updates };
          }
        });
      },

      deleteHunt: (id) => {
        set((state) => {
          state.hunts = state.hunts.filter(h => h.id !== id);
          state.huntParticipants = state.huntParticipants.filter(hp => hp.huntId !== id);
          state.huntVisits = state.huntVisits.filter(
            v => !state.huntParticipants.find(hp => hp.huntId === id)
          );
        });
      },

      joinHunt: (huntId, participantId) => {
        set((state) => {
          const existing = state.huntParticipants.find(
            hp => hp.huntId === huntId && hp.participantId === participantId
          );

          if (!existing) {
            const newId = Math.max(...state.huntParticipants.map(hp => hp.id), 0) + 1;
            state.huntParticipants.push({
              id: newId,
              huntId,
              participantId,
              joinedAt: new Date().toISOString(),
              totalPoints: 0,
              status: 'joined'
            });
          }
        });
      },

      recordVisit: (participantId, huntId, notes) => {
        set((state) => {
          const hunt = state.hunts.find(h => h.id === huntId);
          if (!hunt) return;

          const newId = Math.max(...state.huntVisits.map(v => v.id), 0) + 1;
          state.huntVisits.push({
            id: newId,
            participantId,
            huntExhibitionId: huntId,
            visitedAt: new Date().toISOString(),
            points: 10, // Default points per visit
            notes
          });

          // Update participant's progress
          const participant = state.huntParticipants.find(
            hp => hp.huntId === huntId && hp.participantId === participantId
          );

          if (participant) {
            participant.totalPoints += 10;
            participant.status = 'in_progress';

            // Check if hunt is completed
            const visitCount = state.huntVisits.filter(
              v => v.participantId === participantId && v.huntExhibitionId === huntId
            ).length;

            if (visitCount >= hunt.minVisits) {
              participant.status = 'completed';
              participant.completedAt = new Date().toISOString();
            }
          }
        });
      },

      completeHunt: (huntId, participantId) => {
        set((state) => {
          const participant = state.huntParticipants.find(
            hp => hp.huntId === huntId && hp.participantId === participantId
          );

          if (participant) {
            participant.status = 'completed';
            participant.completedAt = new Date().toISOString();
          }
        });
      },

      setFilters: (filters) => {
        set({ filters });
      },

      fetchHunts: async (occasionId) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          set((state) => ({
            hunts: initialHunts.filter(h => h.occasionId === occasionId),
            isLoading: false
          }));
        } catch (error) {
          set({ error: 'Failed to fetch exhibition hunts', isLoading: false });
        }
      },

      fetchParticipantHunts: async (participantId) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          set((state) => ({
            huntParticipants: initialHuntParticipants.filter(hp => hp.participantId === participantId),
            isLoading: false
          }));
        } catch (error) {
          set({ error: 'Failed to fetch participant hunts', isLoading: false });
        }
      },

      fetchHuntProgress: async (huntId, participantId) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          set((state) => ({
            huntVisits: initialVisits.filter(
              v => v.participantId === participantId
            ),
            isLoading: false
          }));
        } catch (error) {
          set({ error: 'Failed to fetch hunt progress', isLoading: false });
        }
      },
    },
  }))
);