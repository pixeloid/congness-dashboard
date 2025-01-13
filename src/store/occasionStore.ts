import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Occasion, OccasionState } from '@/types/occasions';
import { Schedule } from '@/types/schedule';
import { Abstract } from '@/types/abstract';
import { Exhibition } from '@/types/exhibitions';
import { Checkpoint } from '@/types/checkpoints';
import { Participant } from '@/types/participants';

interface OccasionStore extends OccasionState {
  actions: {
    fetchOccasion: (id: number) => Promise<void>;
    updateOccasion: (id: number, updates: Partial<Occasion>) => void;
    
    // Related entity actions with proper types
    updateSchedule: (occasionId: number, scheduleData: Schedule) => void;
    updateAbstracts: (occasionId: number, abstracts: Abstract[]) => void;
    updateExhibitions: (occasionId: number, exhibitions: Exhibition[]) => void;
    updateCheckpoints: (occasionId: number, checkpoints: Checkpoint[]) => void;
    updateParticipants: (occasionId: number, participants: Participant[]) => void;
  };
}