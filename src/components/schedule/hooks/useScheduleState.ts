import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addDays } from 'date-fns';
import { Day, ScheduleItem } from '@/types/schedule';

export const useScheduleState = () => {
  const [templates] = useState<ScheduleItem[]>([
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
  ]);

  const [presentations, setPresentations] = useState<ScheduleItem[]>([
    {
      id: 'pres-1',
      title: 'Keynote Speech',
      duration: 60,
      type: 'session'
    },
    {
      id: 'pres-2',
      title: 'Workshop A',
      duration: 120,
      type: 'workshop'
    }
  ]);

  const [days, setDays] = useState<Day[]>([
    {
      id: 'day-1',
      date: new Date(2024, 5, 1),
      startTime: new Date(2024, 5, 1, 9, 0),
      tracks: [
        {
          id: 'track-1-1',
          title: 'Main Track',
          presentations: [],
          sections: []
        }
      ]
    }
  ]);

  const handleAddDay = () => {
    const lastDay = days[days.length - 1];
    const newDate = addDays(lastDay.date, 1);
    const newStartTime = new Date(newDate);
    newStartTime.setHours(9, 0, 0, 0);
    
    const newDay = {
      id: `day-${days.length + 1}`,
      date: newDate,
      startTime: newStartTime,
      tracks: [
        {
          id: `track-${days.length + 1}-1`,
          title: 'Main Track',
          presentations: [],
          sections: []
        }
      ]
    };
    setDays([...days, newDay]);
  };

  const handleAddTrack = (dayId: string) => {
    setDays(days.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          tracks: [
            ...day.tracks,
            {
              id: `track-${dayId}-${day.tracks.length + 1}`,
              title: `Track ${day.tracks.length + 1}`,
              presentations: [],
              sections: []
            }
          ]
        };
      }
      return day;
    }));
  };

  const handleAddSection = (trackId: string) => {
    setDays(days.map(day => ({
      ...day,
      tracks: day.tracks.map(track => {
        if (track.id === trackId) {
          return {
            ...track,
            sections: [
              ...track.sections,
              {
                id: uuidv4(),
                title: 'New Section',
                description: 'Section description',
                chairs: 'Section chairs',
                items: []
              }
            ]
          };
        }
        return track;
      })
    })));
  };

  return {
    templates,
    presentations,
    setPresentations,
    days,
    setDays,
    handleAddDay,
    handleAddTrack,
    handleAddSection
  };
};