import { useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
  KeyboardSensor,
  closestCorners,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import DaySection from './DaySection';
import AddDayButton from './AddDayButton';
import PresentationPool from './PresentationPool';
import ScheduleItem from './ScheduleItem';
import { useScheduleStore } from '@/store/scheduleStore';
import { useDragHandlers } from './hooks/useDragHandlers';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';

const ScheduleEditor = () => {
  const { occasionId } = useParams<{ occasionId: string }>();
  const {
    schedule,
    templates,
    presentations,
    isLoading,
    actions
  } = useScheduleStore();

  useEffect(() => {
    if (occasionId) {
      actions.fetchSchedule(parseInt(occasionId, 10));
    }
  }, [occasionId, actions]);

  const {
    activeId,
    activeItem,
    handleDragStart,
    handleDragEnd
  } = useDragHandlers({
    schedule,
    presentations,
    templates
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!schedule) {
    return (
      <div className="p-6">
        <button
          onClick={() => occasionId && actions.initializeSchedule(parseInt(occasionId, 10))}
          className="px-4 py-2 bg-accent text-navy-dark rounded-lg"
        >
          Initialize Schedule
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-navy/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-display font-bold text-white">Conference Schedule</h2>
          <AddDayButton onAdd={actions.addDay} />
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <PresentationPool
            templates={templates}
            presentations={presentations}
          />

          <div className="space-y-8">
            {schedule.days.map((day) => (
              <DaySection
                key={day.id}
                day={day}
                onAddTrack={actions.addTrack}
                onAddSection={(trackId) => actions.addSection(day.id, trackId)}
              />
            ))}
          </div>

          <DragOverlay>
            {activeId && activeItem && (
              <div className="transform scale-105 opacity-85 cursor-grabbing">
                <ScheduleItem item={activeItem} />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default ScheduleEditor;