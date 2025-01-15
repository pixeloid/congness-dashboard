import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useDndContext } from '@dnd-kit/core';
import clsx from 'clsx';
import DraggableScheduleItem from './DraggableScheduleItem';

// Assuming Section is a type, you need to import it from the correct module
import { ScheduleItem, Section } from '@/features/schedule/types/schedule'; // Adjust the import path as necessary


interface SectionProps {
  section: Section | ScheduleItem;
  startTime: Date;
}

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('hu-HU', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const ScheduleSection: React.FC<SectionProps> = ({ section, startTime }) => {
  const { active } = useDndContext();
  let currentTime = new Date(startTime);
  const endTime = new Date(currentTime.getTime() +
    (section.items ? section.items.reduce((total, item) => total + item.duration, 0) : 0) * 60000);

  const { setNodeRef, isOver } = useDroppable({
    id: `section-${section.id}`,
    data: {
      type: 'section',
      sectionId: section.id
    }
  });

  const isDragging = Boolean(active);

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        'rounded-xl overflow-hidden border transition-all duration-200',
        {
          'border-accent shadow-lg shadow-accent/5': isOver,
          'border-white/10': !isDragging && !isOver,
          'border-accent/30': isDragging && !isOver
        }
      )}
    >
      <div className={clsx(
        'backdrop-blur-sm p-4',
        {
          'bg-navy-light/70': isOver,
          'bg-navy-light/50': !isOver
        }
      )}>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3">
              <h4 className="text-lg font-display font-semibold text-white">{section.title}</h4>
              <span className="text-sm text-white/70">
                {formatTime(startTime)} - {formatTime(endTime)}
              </span>
            </div>
            {section.description && (
              <p className="text-sm text-white/70 mt-1">{section.description}</p>
            )}
          </div>
        </div>
      </div>

      <div className={clsx(
        'p-4 space-y-2 backdrop-blur-sm transition-colors duration-200 min-h-[100px]',
        {
          'bg-navy/50': isOver,
          'bg-navy/30': !isDragging && !isOver,
          'bg-navy/40': isDragging && !isOver
        }
      )}>
        {section.items && section.items.map((item) => {
          const itemStartTime = new Date(currentTime);
          currentTime = new Date(currentTime.getTime() + item.duration * 60000);
          return (
            <DraggableScheduleItem
              key={item.id}
              item={item}
              startTime={itemStartTime}
              sectionId={section.id}
            />
          );
        })}

        {section.items && section.items.length === 0 && isOver && (
          <div className={clsx(
            'text-center py-8 transition-colors duration-200 rounded-lg border-2 border-dashed',
            'text-accent border-accent bg-accent/5'
          )}>
            <p>Drop here</p>
          </div>
        )}

        {section.items && section.items.length === 0 && !isOver && (
          <div className={clsx(
            'text-center py-8 transition-colors duration-200 rounded-lg border border-white/10',
            'text-white/40'
          )}>
            <p>Drop presentations here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleSection;