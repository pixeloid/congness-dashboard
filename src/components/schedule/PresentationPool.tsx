import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import clsx from 'clsx';
import ScheduleItem from './ScheduleItem';
import { ScheduleItem as ScheduleItemType } from '@/types/schedule';

interface PresentationPoolProps {
  templates: ScheduleItemType[];
  presentations: ScheduleItemType[];
}

interface DraggableItemProps {
  item: ScheduleItemType;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: item.id,
    data: item
  });

  return (
    <div 
      ref={setNodeRef} 
      {...listeners} 
      {...attributes}
      className={clsx(
        'transition-all duration-200 transform-gpu',
        {
          'opacity-30': isDragging && !item.isTemplate,
          'scale-105 shadow-xl': isDragging,
        }
      )}
      style={{ 
        touchAction: 'none',
        willChange: 'transform',
        position: 'relative',
        zIndex: isDragging ? 999 : 'auto'
      }}
    >
      <ScheduleItem item={item} />
    </div>
  );
};

const PresentationPool: React.FC<PresentationPoolProps> = ({ templates, presentations }) => {
  return (
    <div className="space-y-8">
      <div className="bg-navy/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
        <h2 className="text-xl font-display font-semibold text-white mb-4">Előadások</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {presentations.map((item) => (
            <DraggableItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="bg-navy/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
        <h2 className="text-xl font-display font-semibold text-white mb-4">Program Sablonok</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {templates.map((item) => (
            <DraggableItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PresentationPool;