import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ParticipantFilters as Filters } from '@/features/participant/types/participants';

interface ParticipantFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

const roleOptions = [
  { value: '', label: 'Minden szerep' },
  { value: 'attendee', label: 'Résztvevő' },
  { value: 'speaker', label: 'Előadó' },
  { value: 'organizer', label: 'Szervező' },
  { value: 'staff', label: 'Személyzet' },
];

const statusOptions = [
  { value: '', label: 'Minden státusz' },
  { value: 'registered', label: 'Regisztrált' },
  { value: 'confirmed', label: 'Visszaigazolt' },
  { value: 'cancelled', label: 'Lemondott' },
  { value: 'attended', label: 'Részt vett' },
];

const ParticipantFilters: React.FC<ParticipantFiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex-1 min-w-[240px]">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
          <input
            type="text"
            placeholder="Keresés név vagy email alapján..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
          />
        </div>
      </div>

      <select
        value={filters.role || ''}
        onChange={(e) => onFilterChange({ ...filters, role: e.target.value })}
        className="px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
      >
        {roleOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>

      <select
        value={filters.status || ''}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
        className="px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
      >
        {statusOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default ParticipantFilters;