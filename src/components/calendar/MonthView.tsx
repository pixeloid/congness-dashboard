import React, { useState } from 'react';
import { format, isSameDay, isSameMonth, isWithinInterval, parseISO } from 'date-fns';
import { Occasion } from '@/types/occasions';
import clsx from 'clsx';

interface MonthViewProps {
    currentDate: Date;
    calendarDays: (Date | null)[];
    occasions: Occasion[];
    onSelectEvent: (event: Occasion) => void;
}

const MonthView: React.FC<MonthViewProps> = ({
    currentDate,
    calendarDays,
    occasions,
    onSelectEvent
}) => {
    const [selectedDayEvents, setSelectedDayEvents] = useState<Occasion[] | null>(null);

    const getEventsForDay = (day: Date) => {
        return occasions.filter(event => {
            const eventStart = parseISO(event.startDate);
            const eventEnd = parseISO(event.endDate);
            return isWithinInterval(day, { start: eventStart, end: eventEnd });
        });
    };

    const closeModal = () => setSelectedDayEvents(null);

    return (
        <div className="relative">
            {/* Calendar View */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
                <div className="grid grid-cols-7 border-b border-white/10">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div
                            key={day}
                            className="px-2 py-3 text-sm font-medium text-white/70 text-center"
                        >
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 auto-rows-fr">
                    {calendarDays.map((day, index) => {
                        if (!day) {
                            return (
                                <div
                                    key={index}
                                    className="min-h-[120px] border-b border-r border-white/10 bg-white/5"
                                />
                            );
                        }

                        const dayEvents = getEventsForDay(day);
                        const isToday = isSameDay(day, new Date());
                        const isCurrentMonth = isSameMonth(day, currentDate);

                        return (
                            <div
                                key={day.toISOString()}
                                className={clsx(
                                    'min-h-[120px] p-2 border-b border-r border-white/10',
                                    'transition-colors relative group',
                                    isCurrentMonth ? 'bg-transparent' : 'bg-white/5'
                                )}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span
                                        className={clsx(
                                            'inline-flex items-center justify-center w-6 h-6 rounded-full text-sm',
                                            isToday
                                                ? 'bg-accent text-navy-dark font-medium'
                                                : isCurrentMonth
                                                    ? 'text-white'
                                                    : 'text-white/40'
                                        )}
                                    >
                                        {format(day, 'd')}
                                    </span>
                                    {dayEvents.length > 0 && (
                                        <span className="text-xs text-white/60">
                                            {dayEvents.length} events
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    {dayEvents.slice(0, 3).map((event) => (
                                        <button
                                            key={event.id}
                                            onClick={() => onSelectEvent(event)}
                                            className={clsx(
                                                'w-full px-2 py-1 rounded text-left text-xs truncate transition-colors',
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
                                    {dayEvents.length > 3 && (
                                        <button
                                            onClick={() => setSelectedDayEvents(dayEvents)}
                                            className="w-full px-2 py-1 text-xs text-white/60 hover:text-white"
                                        >
                                            +{dayEvents.length - 3} more
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modal for Day Events */}
            {selectedDayEvents && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-lg p-4 relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-600 hover:text-black"
                        >
                            ✕
                        </button>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Events for the Day</h3>
                        <div className="space-y-3">
                            {selectedDayEvents.map((event) => (
                                <button
                                    key={event.id}
                                    onClick={() => {
                                        onSelectEvent(event);
                                        closeModal();
                                    }}
                                    className="p-3 w-full text-left rounded-lg border text-sm bg-gray-100 hover:bg-gray-200"
                                >
                                    <p className="font-semibold">{event.name}</p>
                                    <p className="text-xs text-gray-600 truncate">{event.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default MonthView;
