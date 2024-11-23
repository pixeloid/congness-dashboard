import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ExhibitionFilters as Filters } from '@/types/exhibitions';

interface ExhibitionFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

const ExhibitionFilters: React.FC<ExhibitionFiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex-1 min-w-[240px]">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
          <input
            type="text"
            placeholder="Keresés név alapján..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
          />
        </div>
      </div>
    </div>
  );
};

export default ExhibitionFilters;