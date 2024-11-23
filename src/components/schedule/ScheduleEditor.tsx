import { 
  DndContext, 
  DragOverlay,
  useSensor, 
  useSensors,
  TouchSensor,
  KeyboardSensor,
  closestCorners,
  PointerSensor
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import DaySection from './DaySection';
import AddDayButton from './AddDayButton';
import PresentationPool from './PresentationPool';
import ScheduleItem from './ScheduleItem';
import { useScheduleState } from './hooks/useScheduleState';
import { useDragHandlers } from './hooks/useDragHandlers';

const ScheduleEditor = () => {
  const {
    templates,
    presentations,
    setPresentations,
    days,
    setDays,
    handleAddDay,
    handleAddTrack,
    handleAddSection
  } = useScheduleState();

  const {
    activeId,
    activeItem,
    handleDragStart,
    handleDragEnd
  } = useDragHandlers({
    days,
    setDays,
    presentations,
    setPresentations,
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

  return (
    <div className="space-y-6">
      <div className="bg-navy/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-display font-bold text-white">Conference Schedule</h2>
          <AddDayButton onAdd={handleAddDay} />
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
            {days.map((day) => (
              <DaySection
                key={day.id}
                day={day}
                onAddTrack={handleAddTrack}
                onAddSection={handleAddSection}
              />
            ))}
          </div>

          <DragOverlay>
            {activeId && activeItem && (
              <div className="transform scale-105 opacity-85">
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