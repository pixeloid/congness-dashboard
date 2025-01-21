import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateRange } from '@/helpers/formatDateRange';
import { MapPinIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useOccasionService } from '@/features/occasion/hooks/queries/useOccasion';
import EntityList from '@/components/common/EntityList';
import { Filters } from '@/services/ReactQueryService';
import { Occasion } from '@/features/occasion/types/occasions';


const OccasionList: React.FC = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState<Filters>({
        search: '',
        type: '',
        location: '',
        dateRange: 'all'
    });

    const renderOccasion = (occasion: Occasion) => (
        <div className="flex justify-between items-start">
            <div className="space-y-2">
                <h2 className="text-xl font-display font-semibold text-white">
                    {occasion.name}
                </h2>
                {occasion.subtitle && (
                    <p className="text-white/70">{occasion.subtitle}</p>
                )}
                <div className="flex items-center gap-4 text-sm text-white/50">
                    <span>
                        {formatDateRange(occasion.date_start, occasion.date_end)}
                    </span>
                    {occasion.venue && <div className="flex items-center gap-2">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{occasion.venue.name}</span>
                    </div>}
                </div>
            </div>
            <div className="flex gap-4">
                <button
                    onClick={() => navigate(`/occasions/${occasion.code}/details`)}
                    className="inline-flex items-center px-4 py-2 bg-navy/50 text-white rounded-lg border border-white/10 hover:border-accent/30 transition-colors"
                >
                    <PencilIcon className="h-5 w-5 mr-2" />
                    Edit
                </button>
                <button
                    onClick={() => navigate(`/occasions/${occasion.code}/dashboard`)}
                    className="px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light transition-colors"
                >
                    Open Dashboard
                </button>
            </div>
        </div>
    );

    return (
        <EntityList
            useService={(filters, parentUrl, page) => useOccasionService.useList(filters, parentUrl, page)}
            renderItem={renderOccasion}
            filters={filters}
            setFilters={setFilters}
        />
    );
};

export default OccasionList;
