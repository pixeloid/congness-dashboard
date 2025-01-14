import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Schedule, Day, Track, Section, ScheduleItem } from '@/types/schedule';
import { AbstractPresentation } from '@/types/abstract';
import { v4 } from 'uuid';
import { addDays } from 'date-fns';

interface ScheduleState {
  schedule: Schedule | null;
  templates: ScheduleItem[];
  presentations: ScheduleItem[];
  isLoading: boolean;
  error: string | null;
  actions: {
    getSchedule: () => Schedule | null;
    initializeFromAbstracts: (abstracts: AbstractPresentation[]) => void;
    // Schedule actions
    initializeSchedule: (occasionId: number) => void;
    fetchSchedule: (occasionId: number) => Promise<void>;
    saveSchedule: () => Promise<void>;

    // Day actions
    addDay: () => void;
    removeDay: (dayId: string) => void;
    updateDay: (dayId: string, updates: Partial<Day>) => void;

    // Track actions
    addTrack: (dayId: string) => void;
    removeTrack: (dayId: string, trackId: string) => void;
    updateTrack: (dayId: string, trackId: string, updates: Partial<Track>) => void;

    // Section actions
    addSection: (dayId: string, trackId: string) => void;
    removeSection: (dayId: string, trackId: string, sectionId: string) => void;
    updateSection: (dayId: string, trackId: string, sectionId: string, updates: Partial<Section>) => void;

    // Item actions
    addItem: (dayId: string, trackId: string, sectionId: string | null, item: ScheduleItem) => void;
    removeItem: (dayId: string, trackId: string, sectionId: string | null, itemId: string) => void;
    updateItem: (dayId: string, trackId: string, sectionId: string | null, itemId: string, updates: Partial<ScheduleItem>) => void;
    moveItem: (source: {
      dayId: string;
      trackId: string;
      sectionId: string | null;
      itemId: string;
    }, destination: {
      dayId: string;
      trackId: string;
      sectionId: string | null;
    }) => void;
  };
}

export const useScheduleStore = create<ScheduleState>()(
  immer((set, get) => ({
    schedule: null,
    templates: [
      {
        id: 'template-meal',
        title: 'Étkezés',
        duration: 60,
        type: 'meal',
        isTemplate: true
      },
      {
        id: 'template-break',
        title: 'Szünet',
        duration: 15,
        type: 'break',
        isTemplate: true
      },
      {
        id: 'template-coffee',
        title: 'Kávészünet',
        duration: 30,
        type: 'coffee',
        isTemplate: true
      }
    ],
    presentations: [],
    isLoading: false,
    error: null,
    actions: {
      getSchedule: () => get().schedule,

      initializeFromAbstracts: (presentations) => {
        set(state => {
          if (!state.schedule) return;

          // Add all presentations to the first day's first track
          const firstDay = state.schedule.days[0];
          const firstTrack = firstDay?.tracks[0];

          if (firstDay && firstTrack) {
            presentations.forEach(presentation => {
              firstTrack.presentations.push(presentation);
            });
          }
        });
      },

      initializeSchedule: (occasionId) => {
        const startDate = new Date();
        startDate.setHours(9, 0, 0, 0);

        set({
          schedule: {
            id: v4(),
            occasionId,
            days: [{
              id: v4(),
              date: startDate,
              startTime: startDate,
              tracks: [{
                id: v4(),
                title: 'Main Track',
                presentations: [],
                sections: []
              }]
            }]
          }
        });
      },

      fetchSchedule: async (occasionId) => {
        set({ isLoading: true, error: null });
        try {
          // API call would go here
          await new Promise(resolve => setTimeout(resolve, 1000));
          set(state => {
            if (!state.schedule) {
              state.actions.initializeSchedule(occasionId);
            }
            state.isLoading = false;
          });
        } catch (error) {
          set({ error: 'Failed to fetch schedule', isLoading: false });
        }
      },

      saveSchedule: async () => {
        set({ isLoading: true, error: null });
        try {
          // API call would go here
          await new Promise(resolve => setTimeout(resolve, 1000));
          set({ isLoading: false });
        } catch (error) {
          set({ error: 'Failed to save schedule', isLoading: false });
        }
      },

      addDay: () => {
        set(state => {
          if (!state.schedule) return;

          const lastDay = state.schedule.days[state.schedule.days.length - 1];
          const newDate = addDays(lastDay.date, 1);
          const newStartTime = new Date(newDate);
          newStartTime.setHours(9, 0, 0, 0);

          state.schedule.days.push({
            id: v4(),
            date: newDate,
            startTime: newStartTime,
            tracks: [{
              id: v4(),
              title: 'Main Track',
              presentations: [],
              sections: []
            }]
          });
        });
      },

      removeDay: (dayId) => {
        set(state => {
          if (!state.schedule) return;
          state.schedule.days = state.schedule.days.filter(day => day.id !== dayId);
        });
      },

      updateDay: (dayId, updates) => {
        set(state => {
          if (!state.schedule) return;
          const dayIndex = state.schedule.days.findIndex(day => day.id === dayId);
          if (dayIndex !== -1) {
            state.schedule.days[dayIndex] = { ...state.schedule.days[dayIndex], ...updates };
          }
        });
      },

      addTrack: (dayId) => {
        set(state => {
          if (!state.schedule) return;
          const day = state.schedule.days.find(d => d.id === dayId);
          if (day) {
            day.tracks.push({
              id: v4(),
              title: `Track ${day.tracks.length + 1}`,
              presentations: [],
              sections: []
            });
          }
        });
      },

      removeTrack: (dayId, trackId) => {
        set(state => {
          if (!state.schedule) return;
          const day = state.schedule.days.find(d => d.id === dayId);
          if (day) {
            day.tracks = day.tracks.filter(track => track.id !== trackId);
          }
        });
      },

      updateTrack: (dayId, trackId, updates) => {
        set(state => {
          if (!state.schedule) return;
          const day = state.schedule.days.find(d => d.id === dayId);
          if (day) {
            const trackIndex = day.tracks.findIndex(t => t.id === trackId);
            if (trackIndex !== -1) {
              day.tracks[trackIndex] = { ...day.tracks[trackIndex], ...updates };
            }
          }
        });
      },

      addSection: (dayId, trackId) => {
        set(state => {
          if (!state.schedule) return;
          const day = state.schedule.days.find(d => d.id === dayId);
          if (day) {
            const track = day.tracks.find(t => t.id === trackId);
            if (track) {
              track.sections.push({
                id: v4(),
                title: 'New Section',
                description: '',
                type: 'session',
                duration: 0,
                items: []
              });
            }
          }
        });
      },

      removeSection: (dayId, trackId, sectionId) => {
        set(state => {
          if (!state.schedule) return;
          const day = state.schedule.days.find(d => d.id === dayId);
          if (day) {
            const track = day.tracks.find(t => t.id === trackId);
            if (track) {
              track.sections = track.sections.filter(s => s.id !== sectionId);
            }
          }
        });
      },

      updateSection: (dayId, trackId, sectionId, updates) => {
        set(state => {
          if (!state.schedule) return;
          const day = state.schedule.days.find(d => d.id === dayId);
          if (day) {
            const track = day.tracks.find(t => t.id === trackId);
            if (track) {
              const sectionIndex = track.sections.findIndex(s => s.id === sectionId);
              if (sectionIndex !== -1) {
                track.sections[sectionIndex] = { ...track.sections[sectionIndex], ...updates };
              }
            }
          }
        });
      },

      addItem: (dayId, trackId, sectionId, item) => {
        set(state => {
          if (!state.schedule) return;
          const day = state.schedule.days.find(d => d.id === dayId);
          if (!day) return;

          const track = day.tracks.find(t => t.id === trackId);
          if (!track) return;

          const newItem = item.isTemplate
            ? { ...item, id: v4(), isTemplate: false }
            : { ...item };

          if (sectionId) {
            const section = track.sections.find(s => s.id === sectionId);
            if (section) {
              section.items.push(newItem);
            }
          } else {
            track.presentations.push(newItem);
          }
        });
      },

      removeItem: (dayId, trackId, sectionId, itemId) => {
        set(state => {
          if (!state.schedule) return;
          const day = state.schedule.days.find(d => d.id === dayId);
          if (!day) return;

          const track = day.tracks.find(t => t.id === trackId);
          if (!track) return;

          if (sectionId) {
            const section = track.sections.find(s => s.id === sectionId);
            if (section) {
              section.items = section.items.filter(item => item.id !== itemId);
            }
          } else {
            track.presentations = track.presentations.filter(item => item.id !== itemId);
          }
        });
      },

      updateItem: (dayId, trackId, sectionId, itemId, updates) => {
        set(state => {
          if (!state.schedule) return;
          const day = state.schedule.days.find(d => d.id === dayId);
          if (!day) return;

          const track = day.tracks.find(t => t.id === trackId);
          if (!track) return;

          if (sectionId) {
            const section = track.sections.find(s => s.id === sectionId);
            if (section) {
              const itemIndex = section.items.findIndex(item => item.id === itemId);
              if (itemIndex !== -1) {
                section.items[itemIndex] = { ...section.items[itemIndex], ...updates };
              }
            }
          } else {
            const itemIndex = track.presentations.findIndex(item => item.id === itemId);
            if (itemIndex !== -1) {
              track.presentations[itemIndex] = { ...track.presentations[itemIndex], ...updates };
            }
          }
        });
      },

      moveItem: (source, destination) => {
        const state = get();
        if (!state.schedule) return;

        // Get the item from source
        let item: ScheduleItem | undefined;
        const sourceDay = state.schedule.days.find(d => d.id === source.dayId);
        if (!sourceDay) return;

        const sourceTrack = sourceDay.tracks.find(t => t.id === source.trackId);
        if (!sourceTrack) return;

        if (source.sectionId) {
          const sourceSection = sourceTrack.sections.find(s => s.id === source.sectionId);
          if (sourceSection) {
            item = sourceSection.items.find(i => i.id === source.itemId);
          }
        } else {
          item = sourceTrack.presentations.find(i => i.id === source.itemId);
        }

        if (!item) return;

        // Remove from source
        state.actions.removeItem(source.dayId, source.trackId, source.sectionId, source.itemId);

        // Add to destination
        state.actions.addItem(destination.dayId, destination.trackId, destination.sectionId, item);
      }
    }
  }))
);