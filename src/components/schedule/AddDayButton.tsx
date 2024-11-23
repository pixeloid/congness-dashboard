import React from 'react';
import { CalendarIcon } from '@heroicons/react/24/outline';

interface AddDayButtonProps {
  onAdd: () => void;
}

const AddDayButton: React.FC<AddDayButtonProps> = ({ onAdd }) => {
  return (
    <button
      onClick={onAdd}
      className="inline-flex items-center px-4 py-2 rounded-lg bg-accent text-navy-dark hover:bg-accent-light transition-colors"
    >
      <CalendarIcon className="h-5 w-5 mr-2" />
      <span className="font-medium">Add Day</span>
    </button>
  );
};

export default AddDayButton;