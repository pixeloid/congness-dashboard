import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, isWithinInterval } from 'date-fns';
import { hu } from 'date-fns/locale';
import { Occasion } from '@/features/occasion/types/occasions';
import {
    CalendarIcon,
    MapPinIcon,
    ChevronRightIcon,
    ClockIcon,
    UserGroupIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { useOccasionService } from '@/features/occasion/hooks/queries/useOccasion';

const TimelinePage = () => {
    const [selectedEvent, setSelectedEvent] = useState<Occasion | null>(null);
    const [expandedMonth, setExpandedMonth] = useState<string | null>(null);
    const { data: occasions } = useOccasionService.useList();

    // Group events by month
    const groupedEvents = occasions?.items.reduce((groups, event) => {
        const monthKey = format(new Date(event.date_start), 'yyyy-MM');
        if (!groups[monthKey]) {
            groups[monthKey] = [];
        }
        groups[monthKey].push(event);
        return groups;
    }, {} as Record<string, Occasion[]>);

    // Check if events overlap
    const getOverlappingEvents = (event: Occasion, events: Occasion[]) => {
        const eventStart = new Date(event.date_start);
        const eventEnd = new Date(event.date_end);

        return events.filter(otherEvent => {
            if (otherEvent['@id'] === event['@id']) return false;
            const otherStart = new Date(otherEvent.date_start);
            const otherEnd = new Date(otherEvent.date_end);

            return isWithinInterval(eventStart, { start: otherStart, end: otherEnd }) ||
                isWithinInterval(eventEnd, { start: otherStart, end: otherEnd }) ||
                isWithinInterval(otherStart, { start: eventStart, end: eventEnd });
        });
    };

    // Calculate event duration in days
    const getEventDuration = (event: Occasion) => {
        const start = new Date(event.date_start);
        const end = new Date(event.date_end);
        return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    };

    return groupedEvents && (
        <div className="min-h-screen bg-gradient-to-br from-navy-dark to-navy p-8">
            <div className="max-w-6xl mx-auto">
                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-16 top-0 bottom-0 w-px bg-white/10" />

                    {Object.entries(groupedEvents).map(([monthKey, monthEvents]) => {
                        const isExpanded = expandedMonth === monthKey;
                        const monthDate = new Date(monthKey);
                        const hasOverlappingEvents = monthEvents.some(event =>
                            getOverlappingEvents(event, monthEvents).length > 0
                        );

                        return (
                            <div key={monthKey} className="mb-8">
                                {/* Month header */}
                                <button
                                    onClick={() => setExpandedMonth(isExpanded ? null : monthKey)}
                                    className="flex items-center gap-4 mb-4 group"
                                >
                                    <div className="w-32 text-right">
                                        <span className="text-lg font-display font-bold text-white">
                                            {format(monthDate, 'MMMM yyyy', { locale: hu })}
                                        </span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                                        <ChevronRightIcon
                                            className={`h-5 w-5 text-navy-dark transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                        />
                                    </div>
                                    {hasOverlappingEvents && (
                                        <span className="text-sm text-white/60">
                                            {monthEvents.length} events ({monthEvents.length - new Set(monthEvents.map(e => e.date_start)).size} overlapping)
                                        </span>
                                    )}
                                </button>

                                {/* Events */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="space-y-4"
                                        >
                                            {monthEvents.map((event, index) => {
                                                const overlappingEvents = getOverlappingEvents(event, monthEvents);
                                                const duration = getEventDuration(event);
                                                const isLongEvent = duration > 2;

                                                return (
                                                    <div key={event['@id']} className="relative pl-32 pr-4">
                                                        {/* Date bubble */}
                                                        <div className="absolute left-32 -translate-x-full flex items-center gap-4">
                                                            <div className="text-right w-24">
                                                                <div className="text-sm font-medium text-white">
                                                                    {format(new Date(event.date_start), 'd', { locale: hu })}
                                                                </div>
                                                                <div className="text-xs text-white/60">
                                                                    {format(new Date(event.date_start), 'EEEE', { locale: hu })}
                                                                </div>
                                                            </div>
                                                            <div className="w-4 h-4 rounded-full bg-white/10 border-2 border-accent" />
                                                        </div>

                                                        {/* Event card */}
                                                        <motion.div
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.1 }}
                                                            className={`
                                relative group bg-white/95 dark:bg-white/5 backdrop-blur-md rounded-xl 
                                border border-white/10 overflow-hidden hover:border-accent/30 
                                transition-all duration-300 hover:shadow-2xl hover:-translate-y-1
                                ${overlappingEvents.length > 0 ? 'ml-' + (overlappingEvents.length * 4) : ''}
                              `}
                                                            style={{
                                                                minHeight: isLongEvent ? '120px' : 'auto'
                                                            }}
                                                        >
                                                            <div className="p-4">
                                                                {/* Event header */}
                                                                <div className="flex justify-between items-start mb-2">
                                                                    <div>
                                                                        <h3 className="text-lg font-display font-semibold text-navy dark:text-white group-hover:text-accent transition-colors">
                                                                            {event.name}
                                                                        </h3>
                                                                        <p className="text-sm text-navy/70 dark:text-white/70">
                                                                            {event.subtitle}
                                                                        </p>
                                                                    </div>
                                                                    <span className={`
                                    px-3 py-1 text-xs font-medium rounded-full shadow-lg
                                    ${event.type === 'conference' ? 'bg-blue-500 text-white' :
                                                                            event.type === 'workshop' ? 'bg-purple-500 text-white' :
                                                                                event.type === 'training' ? 'bg-green-500 text-white' :
                                                                                    'bg-orange-500 text-white'}
                                  `}>
                                                                        {event.type}
                                                                    </span>
                                                                </div>

                                                                {/* Event details */}
                                                                <div className="flex items-center gap-4 text-sm text-navy/60 dark:text-white/60">
                                                                    <div className="flex items-center gap-1">
                                                                        <ClockIcon className="h-4 w-4" />
                                                                        <span>
                                                                            {duration} {duration === 1 ? 'day' : 'days'}
                                                                        </span>
                                                                    </div>{
                                                                        event.venue && <div className="flex items-center gap-1">
                                                                            <MapPinIcon className="h-4 w-4" />
                                                                            <span>{event.venue.name}</span>
                                                                        </div>}
                                                                </div>

                                                                {/* Overlapping events indicator */}
                                                                {overlappingEvents.length > 0 && (
                                                                    <div className="mt-2 flex items-center gap-2 text-xs text-navy/60 dark:text-white/60">
                                                                        <UserGroupIcon className="h-4 w-4" />
                                                                        <span>{overlappingEvents.length} parallel events</span>
                                                                    </div>
                                                                )}

                                                                {/* View details button */}
                                                                <button
                                                                    onClick={() => setSelectedEvent(event)}
                                                                    className="mt-3 px-4 py-1.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-light transition-colors shadow-lg hover:shadow-xl"
                                                                >
                                                                    View Details
                                                                </button>
                                                            </div>

                                                            {/* Duration indicator */}
                                                            {isLongEvent && (
                                                                <div
                                                                    className="absolute left-0 top-0 bottom-0 w-1 bg-accent"
                                                                    style={{
                                                                        background: `linear-gradient(to bottom, var(--tw-colors-accent) ${100 / duration}%, transparent)`
                                                                    }}
                                                                />
                                                            )}
                                                        </motion.div>
                                                    </div>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Event details flyout */}
            <AnimatePresence>
                {selectedEvent && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-white/95 dark:bg-navy-light/95 backdrop-blur-xl shadow-2xl"
                    >
                        <div className="relative h-full p-6 overflow-y-auto">
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="absolute top-4 right-4 p-2 text-navy/60 dark:text-white/60 hover:text-accent rounded-lg transition-colors"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>

                            {selectedEvent.logo && (
                                <div className="relative h-48 -mx-6 -mt-6 mb-6">
                                    <img
                                        src={selectedEvent.logo}
                                        alt={selectedEvent.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/95 dark:from-navy-light/95 to-transparent" />
                                </div>
                            )}

                            <h2 className="text-2xl font-display font-bold text-navy dark:text-white mb-2">
                                {selectedEvent.name}
                            </h2>
                            <p className="text-navy/70 dark:text-white/70 mb-6">
                                {selectedEvent.subtitle}
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-medium text-navy/60 dark:text-white/60 mb-2">
                                        Description
                                    </h3>
                                    <p className="text-navy dark:text-white">
                                        {selectedEvent.description}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-navy/60 dark:text-white/60 mb-2">
                                        Date & Time
                                    </h3>
                                    <div className="flex items-center gap-2 text-navy dark:text-white">
                                        <CalendarIcon className="h-5 w-5 text-accent" />
                                        <div>
                                            <div>
                                                {format(new Date(selectedEvent.date_start), 'PPP', { locale: hu })} -
                                            </div>
                                            <div>
                                                {format(new Date(selectedEvent.date_end), 'PPP', { locale: hu })}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-navy/60 dark:text-white/60 mb-2">
                                        Venue
                                    </h3>
                                    {selectedEvent.venue && (
                                        <div className="bg-navy/5 dark:bg-white/5 rounded-lg p-4">
                                            <div className="flex items-start gap-3">
                                                <MapPinIcon className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                                                <div>
                                                    <div className="font-medium text-navy dark:text-white">
                                                        {selectedEvent.venue.name}
                                                    </div>
                                                    <div className="text-sm text-navy/70 dark:text-white/70">
                                                        {selectedEvent.venue.address}
                                                    </div>
                                                    <p className="text-sm text-navy/70 dark:text-white/70 mt-2">
                                                        {selectedEvent.venue.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-navy/60 dark:text-white/60 mb-2">
                                        Contact
                                    </h3>
                                    {selectedEvent.contact && <div className="text-navy dark:text-white">
                                        <div className="font-medium">{selectedEvent.contact.name}</div>
                                        <div className="text-sm text-navy/70 dark:text-white/70">
                                            {selectedEvent.contact.email}
                                        </div>
                                    </div>
                                    }
                                </div>

                                <a
                                    href={selectedEvent.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full px-4 py-3 bg-accent text-white text-center font-medium rounded-lg hover:bg-accent-light transition-colors shadow-lg hover:shadow-xl"
                                >
                                    Visit Event Website
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TimelinePage;