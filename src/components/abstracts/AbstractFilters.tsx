import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { AbstractStatus } from '@/types/abstract';

interface AbstractFiltersProps {
    filters: {
        search?: string;
        status?: AbstractStatus;
        presentationType?: 'oral' | 'poster';
    };
    onFilterChange: (filters: any) => void;
}

const statusOptions = [
    { value: '', label: 'Minden státusz' },
    { value: 'submitted', label: 'Beadva' },
    { value: 'in_review', label: 'Bírálat alatt' },
    { value: 'accepted', label: 'Elfogadva' },
    { value: 'rejected', label: 'Elutasítva' }
];

const presentationOptions = [
    { value: '', label: 'Minden típus' },
    { value: 'oral', label: 'Szóbeli' },
    { value: 'poster', label: 'Poszter' }
];

const AbstractFilters: React.FC<AbstractFiltersProps> = ({ filters, onFilterChange }) => {
    return (
        <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[240px]">
                <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                    <input
                        type="text"
                        placeholder="Keresés cím vagy szerző alapján..."
                        value={filters.search || ''}
                        onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
                    />
                </div>
            </div>

            <select
                value={filters.status || ''}
                onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
                className="px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
            >
                {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>

            <select
                value={filters.presentationType || ''}
                onChange={(e) => onFilterChange({ ...filters, presentationType: e.target.value })}
                className="px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
            >
                {presentationOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
};

export default AbstractFilters;