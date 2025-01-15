import React from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { hu } from 'date-fns/locale';
import { Occasion } from '@/features/occasion/types/occasions';
import { XMarkIcon, CalendarIcon, ViewColumnsIcon } from '@heroicons/react/24/outline';

interface EventDetailsProps {
    event: Occasion;
    onClose: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-white/95 dark:bg-navy-light/95 backdrop-blur-xl shadow-2xl"
        >
            <div className="relative h-full p-6 overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-navy/60 dark:text-white/60 hover:text-accent rounded-lg transition-colors"
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>

                {event.logo && (
                    <div className="relative h-48 -mx-6 -mt-6 mb-6">
                        <img
                            src={event.logo}
                            alt={event.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/95 dark:from-navy-light/95 to-transparent" />
                    </div>
                )}

                <h2 className="text-2xl font-display font-bold text-navy dark:text-white mb-2">
                    {event.name}
                </h2>
                <p className="text-navy/70 dark:text-white/70 mb-6">
                    {event.subtitle}
                </p>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-sm font-medium text-navy/60 dark:text-white/60 mb-2">
                            Description
                        </h3>
                        <p className="text-navy dark:text-white">
                            {event.description}
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
                                    {format(parseISO(event.startDate), 'PPP', { locale: hu })} -
                                </div>
                                <div>
                                    {format(parseISO(event.endDate), 'PPP', { locale: hu })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-navy/60 dark:text-white/60 mb-2">
                            Venue
                        </h3>
                        <div className="bg-navy/5 dark:bg-white/5 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <ViewColumnsIcon className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                                {event.venue && (<div>
                                    <div className="font-medium text-navy dark:text-white">
                                        {event.venue.name}
                                    </div>
                                    <div className="text-sm text-navy/70 dark:text-white/70">
                                        {event.venue.address}
                                    </div>
                                    <p className="text-sm text-navy/70 dark:text-white/70 mt-2">
                                        {event.venue.description}
                                    </p>
                                </div>)}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-navy/60 dark:text-white/60 mb-2">
                            Contact
                        </h3>
                        {event.contact && (
                            <div className="text-navy dark:text-white">
                                <div className="font-medium">{event.contact.name}</div>
                                <div className="text-sm text-navy/70 dark:text-white/70">
                                    {event.contact.email}
                                </div>
                            </div>)}
                    </div>

                    <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full px-4 py-3 bg-accent text-white text-center font-medium rounded-lg hover:bg-accent-light transition-colors shadow-lg hover:shadow-xl"
                    >
                        Visit Event Website
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default EventDetails;