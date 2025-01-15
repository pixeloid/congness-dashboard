import React from 'react';
import { Occasion } from '@/features/occasion/types/occasions';
import { format, parseISO } from 'date-fns';
import { hu } from 'date-fns/locale';

interface EventDetailsModalProps {
    events: Occasion[];
    onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ events, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-lg p-4 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-black"
                >
                    ✕
                </button>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Events Details</h3>
                <div className="space-y-3">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="p-3 rounded-lg border text-sm"
                            style={{
                                borderColor: 'lightgray',
                                backgroundColor: '#f9f9f9'
                            }}
                        >
                            <p className="font-semibold">{event.name}</p>
                            <p className="text-xs">{event.description}</p>
                            {event.venue && <p className="text-xs">{format(parseISO(event.startDate), 'PPP', { locale: hu })} at {event.venue.name}</p>}
                            {event.venue && <p className="text-xs">{event.venue.address}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventDetailsModal;
