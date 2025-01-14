import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAbstractStore } from '@/store/abstractStore';
import ScheduleEditor from '../components/schedule/ScheduleEditor';
import { useScheduleStore } from '@/store/scheduleStore';

const SchedulePage: React.FC = () => {
  const { occasionId } = useParams<{ occasionId: string }>();
  const { abstracts, actions: abstractActions } = useAbstractStore();
  const { schedule, actions: scheduleActions } = useScheduleStore();

  useEffect(() => {
    if (occasionId) {
      // Fetch abstracts if not already loaded
      abstractActions.fetchAbstracts(parseInt(occasionId));
    }
  }, [occasionId, abstractActions]);

  useEffect(() => {
    if (abstracts.length > 0 && !schedule) {
      // Initialize schedule with accepted abstracts
      scheduleActions.initializeFromAbstracts(abstracts);
    }
  }, [abstracts, schedule, scheduleActions]);

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold text-white mb-2">Program Szerkesztő</h1>
        <p className="text-lg text-white/70 mb-8">Szerkessze a konferencia programját és időbeosztását</p>
      </div>

      <ScheduleEditor />
    </div>
  );
};

export default SchedulePage;