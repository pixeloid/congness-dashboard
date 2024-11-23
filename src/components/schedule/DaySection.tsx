import React from 'react';
import TrackList from './TrackList';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Day } from '@/types/schedule';

interface DaySectionProps {
  day: Day;
  onAddTrack: (dayId: string) => void;
  onAddSection: (trackId: string) => void;
}

const DaySection: React.FC<DaySectionProps> = ({ day, onAddTrack, onAddSection }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-display font-semibold text-white">
            {format(day.date, 'PPPP', { locale: hu })}
          </h3>
          <p className="text-sm text-white/70">
            Kezdés: {format(day.startTime, 'HH:mm', { locale: hu })}
          </p>
        </div>
        <button
          onClick={() => onAddTrack(day.id)}
          className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          <PlusIcon className="h-4 w-4 mr-1.5" />
          <span className="text-sm font-medium">Add Track</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {day.tracks.map((track) => (
          <TrackList
            key={track.id}
            track={track}
            dayStartTime={day.startTime}
            onAddSection={onAddSection}
          />
        ))}
      </div>
    </div>
  );
};

export default DaySection;