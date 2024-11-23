import { useState } from 'react';
import { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import { Day, ScheduleItem } from '@/types/schedule';

interface UseDragHandlersProps {
  days: Day[];
  setDays: (days: Day[]) => void;
  presentations: ScheduleItem[];
  setPresentations: (presentations: ScheduleItem[] | ((prev: ScheduleItem[]) => ScheduleItem[])) => void;
  templates: ScheduleItem[];
}

interface DropTarget {
  type: string;
  trackId?: string;
  sectionId?: string;
}

export const useDragHandlers = ({
  days,
  setDays,
  presentations,
  setPresentations,
  templates
}: UseDragHandlersProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<ScheduleItem | null>(null);

  const findItem = (id: string): ScheduleItem | undefined => {
    const poolItem = [...presentations, ...templates].find(p => p.id === id);
    if (poolItem) return poolItem;

    for (const day of days) {
      for (const track of day.tracks) {
        const trackItem = track.presentations.find(p => p.id === id);
        if (trackItem) return trackItem;

        for (const section of track.sections) {
          const sectionItem = section.items.find(p => p.id === id);
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

    if (!over) {
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

    const newItem = sourceItem.isTemplate
      ? { ...sourceItem, id: uuidv4(), isTemplate: false }
      : { ...sourceItem };

    let itemAdded = false;

    const updatedDays = days.map(day => ({
      ...day,
      tracks: day.tracks.map(track => {
        if (targetData.type === 'track' && `track-${track.id}` === overId) {
          itemAdded = true;
          return {
            ...track,
            presentations: [...track.presentations, newItem]
          };
        }

        if (targetData.type === 'section') {
          return {
            ...track,
            sections: track.sections.map(section => {
              if (`section-${section.id}` === overId) {
                itemAdded = true;
                return {
                  ...section,
                  items: [...section.items, newItem]
                };
              }
              return section;
            })
          };
        }

        return track;
      })
    }));

    setDays(updatedDays);

    if (itemAdded && !sourceItem.isTemplate) {
      setPresentations((prev: ScheduleItem[]) => prev.filter(p => p.id !== activeId));
    }

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