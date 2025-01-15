import React from 'react';
import { MapPinIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { Venue } from '@/features/occasion/types/occasions';

interface VenueInfoProps {
  venue: Venue;
}

const VenueInfo: React.FC<VenueInfoProps> = ({ venue }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-2 text-white/70">
        <MapPinIcon className="h-5 w-5 flex-shrink-0 text-accent" />
        <div>
          <p className="font-medium text-white">{venue.name}</p>
          <p className="text-sm">{venue.address}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-white/70">
        <GlobeAltIcon className="h-5 w-5 text-accent" />
        <a
          href={venue.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm hover:text-accent transition-colors"
        >
          {new URL(venue.url).hostname}
        </a>
      </div>

      <p className="text-sm text-white/70">{venue.description}</p>
    </div>
  );
};

export default VenueInfo;