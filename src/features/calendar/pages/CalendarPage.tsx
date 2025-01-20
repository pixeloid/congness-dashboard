import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    addMonths,
    subMonths,
    getDay,
    format
} from 'date-fns';
import { hu } from 'date-fns/locale';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { Occasion } from '@/features/occasion/types/occasions';
import clsx from 'clsx';

// Import views
import MonthView from '../components/MonthView';
import WeekView from '../components/WeekView';
import AgendaView from '../components/AgendaView';
import EventDetails from '../components/EventDetails';
import ErrorMessage from '@/components/common/ErrorMessage';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useOccasionService } from '@/features/occasion/hooks/queries/useOccasion';

type ViewType = 'month' | 'week' | 'agenda';

const CalendarPage = () => {
    const { data: occasions, isLoading, error } = useOccasionService.useList();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewType, setViewType] = useState<ViewType>('month');
    const [selectedEvent, setSelectedEvent] = useState<Occasion | null>(null);

    // Calculate calendar grid for month view
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    const startingDayIndex = getDay(monthStart);
    const totalDays = daysInMonth.length + startingDayIndex;
    const totalWeeks = Math.ceil(totalDays / 7);
    const calendarDays = Array.from({ length: totalWeeks * 7 }, (_, i) => {
        const dayIndex = i - startingDayIndex;
        return dayIndex >= 0 && dayIndex < daysInMonth.length
            ? daysInMonth[dayIndex]
            : null;
    });

    // Navigation handlers
    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));


    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error.message} />;


    return occasions && (
        <div className=" bg-gradient-to-br from-navy-dark to-navy p-8">
            <div className="max-w-7xl mx-auto">
                {/* Calendar Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-display font-bold text-white">
                            Event Calendar
                        </h1>
                        <p className="text-lg text-white/70">
                            Browse and discover upcoming events
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* View Switcher */}
                        <div className="bg-white/5 backdrop-blur-md rounded-lg p-1 flex">
                            <button
                                onClick={() => setViewType('month')}
                                className={clsx(
                                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                                    viewType === 'month'
                                        ? 'bg-accent text-navy-dark'
                                        : 'text-white/70 hover:text-white'
                                )}
                            >
                                Month
                            </button>
                            <button
                                onClick={() => setViewType('week')}
                                className={clsx(
                                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                                    viewType === 'week'
                                        ? 'bg-accent text-navy-dark'
                                        : 'text-white/70 hover:text-white'
                                )}
                            >
                                Week
                            </button>
                            <button
                                onClick={() => setViewType('agenda')}
                                className={clsx(
                                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                                    viewType === 'agenda'
                                        ? 'bg-accent text-navy-dark'
                                        : 'text-white/70 hover:text-white'
                                )}
                            >
                                Agenda
                            </button>
                        </div>

                        {/* Month Navigation */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={prevMonth}
                                className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <ChevronLeftIcon className="h-5 w-5" />
                            </button>
                            <h2 className="text-lg font-display font-semibold text-white min-w-[160px] text-center">
                                {format(currentDate, 'MMMM yyyy', { locale: hu })}
                            </h2>
                            <button
                                onClick={nextMonth}
                                className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <ChevronRightIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Calendar Views */}
                {viewType === 'month' && (
                    <MonthView
                        currentDate={currentDate}
                        calendarDays={calendarDays}
                        occasions={occasions.items}
                        onSelectEvent={setSelectedEvent}
                    />
                )}

                {viewType === 'week' && (
                    <WeekView
                        currentDate={currentDate}
                        occasions={occasions.items}
                        onSelectEvent={setSelectedEvent}
                    />
                )}

                {viewType === 'agenda' && (
                    <AgendaView
                        occasions={occasions.items}
                        onSelectEvent={setSelectedEvent}
                    />
                )}

                {/* Event Details Flyout */}
                <AnimatePresence>
                    {selectedEvent && (
                        <EventDetails
                            event={selectedEvent}
                            onClose={() => setSelectedEvent(null)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CalendarPage;