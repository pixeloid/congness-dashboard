import React from 'react';
import { format, parseISO } from 'date-fns';
import { hu } from 'date-fns/locale';
import { Occasion } from '@/features/occasion/types/occasions';
import clsx from 'clsx';
import {
  CalendarIcon,
  MapPinIcon,
  UserIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

interface AgendaViewProps {
  occasions: Occasion[];
  onSelectEvent: (event: Occasion) => void;
}

const AgendaView: React.FC<AgendaViewProps> = ({ occasions, onSelectEvent }) => {
  // Group events by month
  const groupedEvents = occasions.reduce((groups, event) => {
    const monthKey = format(parseISO(event.startDate), 'yyyy-MM');
    if (!groups[monthKey]) {
      groups[monthKey] = [];
    }
    groups[monthKey].push(event);
    return groups;
  }, {} as Record<string, Occasion[]>);

  return (
    <div className="space-y-8">
      {Object.entries(groupedEvents).map(([monthKey, events]) => (
        <div key={monthKey}>
          <h3 className="text-xl font-display font-semibold text-white mb-4">
            {format(parseISO(monthKey + '-01'), 'MMMM yyyy', { locale: hu })}
          </h3>

          <div className="space-y-4">
            {events.map((event) => (
              <button
                key={event.id}
                onClick={() => onSelectEvent(event)}
                className="w-full bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 text-left hover:border-accent/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* Event Type Badge */}
                  <div className={clsx(
                    'px-3 py-2 rounded-lg',
                    event.type === 'conference'
                      ? 'bg-blue-500/20 text-blue-500'
                      : event.type === 'workshop'
                        ? 'bg-purple-500/20 text-purple-500'
                        : event.type === 'training'
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-orange-500/20 text-orange-500'
                  )}>
                    {format(parseISO(event.startDate), 'd', { locale: hu })}
                  </div>

                  <div className="flex-1">
                    <h4 className="text-lg font-display font-semibold text-white mb-2">
                      {event.name}
                    </h4>
                    <p className="text-white/70 mb-4">{event.subtitle}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm text-white/60">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-accent" />
                        <span>
                          {format(parseISO(event.startDate), 'PPP', { locale: hu })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="h-5 w-5 text-accent" />
                        <span>{event.venue.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserIcon className="h-5 w-5 text-accent" />
                        <span>{event.contact.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowTopRightOnSquareIcon className="h-5 w-5 text-accent" />
                        <span>View Details</span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AgendaView;