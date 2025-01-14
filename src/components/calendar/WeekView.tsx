import React from 'react';
import { format, addDays, startOfWeek, parseISO, isWithinInterval } from 'date-fns';
import { hu } from 'date-fns/locale';
import { Occasion } from '@/types/occasions';
import clsx from 'clsx';

interface WeekViewProps {
    currentDate: Date;
    occasions: Occasion[];
    onSelectEvent: (event: Occasion) => void;
}

const WeekView: React.FC<WeekViewProps> = ({ currentDate, occasions, onSelectEvent }) => {
    const weekStart = startOfWeek(currentDate);
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    const hours = Array.from({ length: 24 }, (_, i) => i);

    const getEventsForHour = (day: Date, hour: number) => {
        return occasions.filter(event => {
            const eventStart = parseISO(event.startDate);
            const eventEnd = parseISO(event.endDate);
            const hourStart = new Date(day.setHours(hour, 0, 0, 0));
            const hourEnd = new Date(day.setHours(hour, 59, 59, 999));
            return isWithinInterval(hourStart, { start: eventStart, end: eventEnd }) ||
                isWithinInterval(hourEnd, { start: eventStart, end: eventEnd });
        });
    };

    return (
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-8 border-b border-white/10">
                <div className="p-4 text-sm font-medium text-white/70" />
                {weekDays.map((day) => (
                    <div
                        key={day.toISOString()}
                        className="p-4 text-center border-l border-white/10"
                    >
                        <div className="text-sm font-medium text-white">
                            {format(day, 'EEEE', { locale: hu })}
                        </div>
                        <div className="text-sm text-white/70">
                            {format(day, 'MMM d', { locale: hu })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Time Grid */}
            <div className="relative">
                {hours.map((hour) => (
                    <div key={hour} className="grid grid-cols-8">
                        {/* Time Label */}
                        <div className="p-2 text-xs text-white/70 text-right">
                            {format(new Date().setHours(hour), 'HH:mm')}
                        </div>

                        {/* Day Columns */}
                        {weekDays.map((day) => {
                            const events = getEventsForHour(day, hour);
                            return (
                                <div
                                    key={day.toISOString()}
                                    className="min-h-[48px] border-l border-t border-white/10 relative"
                                >
                                    {events.map((event) => (
                                        <button
                                            key={event.id}
                                            onClick={() => onSelectEvent(event)}
                                            className={clsx(
                                                'absolute left-0 right-0 m-1 px-2 py-1 text-xs rounded truncate transition-colors',
                                                event.type === 'conference'
                                                    ? 'bg-blue-500/20 text-blue-500 hover:bg-blue-500/30'
                                                    : event.type === 'workshop'
                                                        ? 'bg-purple-500/20 text-purple-500 hover:bg-purple-500/30'
                                                        : event.type === 'training'
                                                            ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                                                            : 'bg-orange-500/20 text-orange-500 hover:bg-orange-500/30'
                                            )}
                                        >
                                            {event.name}
                                        </button>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeekView;