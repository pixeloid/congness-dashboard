import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import clsx from 'clsx';
import DraggableScheduleItem from './DraggableScheduleItem';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Track } from '@/types/schedule';
import { useDndContext } from '@dnd-kit/core';
import ScheduleSection from '@/components/schedule/ScheduleSection';

interface TrackListProps {
  track: Track;
  dayStartTime: Date;
  onAddSection: (trackId: string) => void;
}

const TrackList: React.FC<TrackListProps> = ({ track, dayStartTime, onAddSection }) => {
  let currentTime = new Date(dayStartTime);
  const { active } = useDndContext();

  const { setNodeRef, isOver } = useDroppable({
    id: `track-${track.id}`,
    data: {
      type: 'track',
      trackId: track.id
    }
  });

  // Combine sections and presentations into a single sortable list
  const sortableItems = [
    ...track.presentations.map(item => ({ type: 'presentation', id: item.id, data: item })),
    ...track.sections.map(section => ({ type: 'section', id: section.id, data: section }))
  ];

  const isDragging = Boolean(active);
  const showDropArea = isDragging;

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        'rounded-xl border transition-all duration-200',
        {
          'border-accent shadow-lg shadow-accent/5': isOver,
          'border-white/10': !isOver,
          'border-accent/30': isDragging && !isOver
        }
      )}
    >
      <div className={clsx(
        'p-6 backdrop-blur-sm',
        {
          'bg-navy-light/70': isOver,
          'bg-navy-light/50': !isOver
        }
      )}>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-display font-semibold text-white">{track.title}</h3>
          <button
            onClick={() => onAddSection(track.id)}
            className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <PlusIcon className="h-4 w-4 mr-1.5" />
            <span className="text-sm font-medium">Add Section</span>
          </button>
        </div>
      </div>

      <div
        className={clsx(
          'p-6 space-y-4 min-h-[200px] transition-colors duration-200',
          {
            'bg-navy/50': isOver,
            'bg-navy/30': !isOver,
            'bg-navy/40': isDragging && !isOver
          }
        )}
      >
        <SortableContext items={sortableItems.map(item => item.id)} strategy={verticalListSortingStrategy}>
          {sortableItems.map((item) => {
            const itemStartTime = new Date(currentTime);

            if (item.type === 'presentation') {
              currentTime = new Date(currentTime.getTime() + item.data.duration * 60000);
              return (
                <DraggableScheduleItem
                  key={item.id}
                  item={item.data}
                  startTime={itemStartTime}
                  trackId={track.id}
                />
              );
            } else {
              const sectionDuration = (item.data.items ?? []).reduce((total: number, presentation) =>
                total + presentation.duration, 0);
              const sectionComponent = (
                <ScheduleSection
                  key={item.id}
                  section={item.data}
                  startTime={itemStartTime}
                />
              );
              currentTime = new Date(currentTime.getTime() + sectionDuration * 60000);
              return sectionComponent;
            }
          })}
        </SortableContext>

        {showDropArea && (
          <div
            className={clsx(
              'mt-4 text-center py-6 transition-colors duration-200 rounded-lg border-2 border-dashed',
              {
                'border-accent text-accent bg-accent/5': isOver,
                'border-white/10 text-white/40': !isOver
              }
            )}
          >
            <p>{isOver ? 'Drop here' : 'Drop to add'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackList;