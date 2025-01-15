import React, { memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import ScheduleItem from './ScheduleItem';
import { DraggableItemProps } from '@/features/schedule/types/schedule';

const DraggableScheduleItem = memo(({
  item,
  startTime,
  trackId,
  sectionId,
  onRemove,
  onUpdate
}: DraggableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: item.id,
    data: {
      ...item,
      trackId,
      sectionId
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative',
    zIndex: isDragging ? 999 : 'auto',
    willChange: 'transform, opacity',
    touchAction: 'none',
  } as React.CSSProperties;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(
        'transform-gpu cursor-grab active:cursor-grabbing touch-none',
        isDragging && 'shadow-xl'
      )}
    >
      <ScheduleItem
        item={item}
        startTime={startTime}
        onRemove={onRemove}
        onUpdate={onUpdate}
      />
    </div>
  );
});

DraggableScheduleItem.displayName = 'DraggableScheduleItem';

export default DraggableScheduleItem;