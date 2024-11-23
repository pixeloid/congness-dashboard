import React from 'react';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import { CalendarIcon } from '@heroicons/react/24/outline';

interface DateRangeProps {
  startDate: string;
  endDate: string;
}

const DateRange: React.FC<DateRangeProps> = ({ startDate, endDate }) => {
  return (
    <div className="flex items-center gap-2 text-white/70">
      <CalendarIcon className="h-5 w-5 text-accent" />
      <span>
        {format(new Date(startDate), 'yyyy. MMMM d.', { locale: hu })} - 
        {format(new Date(endDate), 'yyyy. MMMM d.', { locale: hu })}
      </span>
    </div>
  );
};

export default DateRange;