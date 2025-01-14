import { useState } from 'react';
import { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import { ScheduleItem } from '@/types/schedule';
import { useScheduleStore } from '@/store/scheduleStore';

interface UseDragHandlersProps {
  schedule: any;
  presentations: ScheduleItem[];
  templates: ScheduleItem[];
}

interface DropTarget {
  type: string;
  trackId?: string;
  sectionId?: string;
  dayId?: string;
}

export const useDragHandlers = ({
  schedule,
  presentations,
  templates
}: UseDragHandlersProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<ScheduleItem | null>(null);
  const { actions } = useScheduleStore();

  const findItem = (id: string): ScheduleItem | undefined => {
    const poolItem = [...presentations, ...templates].find(p => p.id === id);
    if (poolItem) return poolItem;

    if (!schedule?.days) return undefined;

    for (const day of schedule.days) {
      for (const track of day.tracks) {
        const trackItem: ScheduleItem | undefined = track.presentations.find((p: ScheduleItem) => p.id === id);
        if (trackItem) return trackItem;

        for (const section of track.sections) {
          const sectionItem: ScheduleItem | undefined = section.items.find((p: ScheduleItem) => p.id === id);
          if (sectionItem) return sectionItem;
        }
      }
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id.toString());

    const item = findItem(active.id.toString());
    if (item) {
      setActiveItem(item);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !schedule?.days) {
      setActiveId(null);
      setActiveItem(null);
      return;
    }

    const activeId = active.id.toString();
    const overId = over.id.toString();
    const targetData = over.data?.current as DropTarget | undefined;

    if (!targetData) {
      setActiveId(null);
      setActiveItem(null);
      return;
    }

    const sourceItem = findItem(activeId);
    if (!sourceItem) {
      setActiveId(null);
      setActiveItem(null);
      return;
    }

    // Extract day ID from track or section ID
    const dayId = targetData.dayId || overId.split('-')[1];
    const trackId = targetData.trackId || overId.split('-')[2];
    const sectionId = targetData.type === 'section' ? overId.split('-')[2] : null;

    // Create new item if it's a template
    const newItem = sourceItem.isTemplate
      ? { ...sourceItem, id: uuidv4(), isTemplate: false }
      : { ...sourceItem };

    // Add item to the target location
    actions.addItem(dayId, trackId, sectionId, newItem);

    setActiveId(null);
    setActiveItem(null);
  };

  return {
    activeId,
    activeItem,
    handleDragStart,
    handleDragEnd
  };
};