import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { CheckpointFilters as Filters } from '@/features/checkpoints/types/checkpoints';

interface CheckpointFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

const typeOptions = [
  { value: '', label: 'All Types' },
  { value: 'registration', label: 'Registration' },
  { value: 'dining', label: 'Dining' },
  { value: 'program', label: 'Program' },
  { value: 'general', label: 'General' },
];

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'scheduled', label: 'Scheduled' },
];

const restrictionOptions = [
  { value: '', label: 'All Restrictions' },
  { value: 'none', label: 'None' },
  { value: 'paid', label: 'Paid' },
  { value: 'vip', label: 'VIP' },
  { value: 'staff', label: 'Staff' },
];

const CheckpointFilters: React.FC<CheckpointFiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex-1 min-w-[240px]">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
          <input
            type="text"
            placeholder="Search checkpoints..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
          />
        </div>
      </div>

      <select
        value={filters.type || ''}
        onChange={(e) => onFilterChange({ ...filters, type: e.target.value as any })}
        className="px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
      >
        {typeOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>

      <select
        value={filters.status || ''}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value as any })}
        className="px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
      >
        {statusOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>

      <select
        value={filters.restriction || ''}
        onChange={(e) => onFilterChange({ ...filters, restriction: e.target.value as any })}
        className="px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
      >
        {restrictionOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default CheckpointFilters;