import React from 'react';
import { Link } from 'react-router-dom';
import { Occasion } from '@/features/occasion/types/occasions';
import VenueInfo from './VenueInfo';
import DateRange from '../../../components/common/DateRange';
import { UserGroupIcon, DocumentTextIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface OccasionCardProps {
  occasion: Occasion;
  onEdit?: (id: number) => void;
  onDetails?: (id: number) => void;
}

const OccasionCard: React.FC<OccasionCardProps> = ({ occasion, onEdit, onDetails }) => {
  return (
    <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 hover:border-accent/30 transition-all duration-300">
      <div className="relative h-48 rounded-t-xl overflow-hidden">
        <img
          src={occasion.venue.photo}
          alt={occasion.venue.name}
          className="w-full h-full object-cover"
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src = 'https://via.placeholder.com/800x400?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
        <h3 className="absolute bottom-4 left-4 right-4 text-xl font-display font-semibold text-white">
          {occasion.name}
        </h3>
      </div>

      <div className="p-6 space-y-4">
        <DateRange startDate={occasion.startDate} endDate={occasion.endDate} />
        <VenueInfo venue={occasion.venue} />

        <div className="pt-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => onEdit?.(occasion.id)}
            className="px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light transition-colors"
          >
            Szerkesztés
          </button>
          <button
            onClick={() => onDetails?.(occasion.id)}
            className="px-4 py-2 bg-navy/50 text-white rounded-lg border border-white/10 hover:border-accent/30 transition-colors"
          >
            Részletek
          </button>
          <Link
            to={`/occasions/${occasion.id}/participants`}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-navy/50 text-white rounded-lg border border-white/10 hover:border-accent/30 transition-colors"
          >
            <UserGroupIcon className="h-5 w-5" />
            <span>Résztvevők</span>
          </Link>
          <Link
            to={`/occasions/${occasion.id}/abstracts`}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-navy/50 text-white rounded-lg border border-white/10 hover:border-accent/30 transition-colors"
          >
            <DocumentTextIcon className="h-5 w-5" />
            <span>Absztraktok</span>
          </Link>
          <Link
            to={`/occasions/${occasion.id}/checkpoints`}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-navy/50 text-white rounded-lg border border-white/10 hover:border-accent/30 transition-colors"
          >
            <MapPinIcon className="h-5 w-5" />
            <span>Checkpointok</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OccasionCard;