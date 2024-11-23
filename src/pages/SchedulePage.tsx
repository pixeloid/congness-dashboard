import React from 'react';
import ScheduleEditor from '../components/schedule/ScheduleEditor';

const SchedulePage: React.FC = () => {
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