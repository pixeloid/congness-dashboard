import React, { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Paginator from '@/components/common/Paginator';

interface EntityListProps<Entity> {
    useService: (filters?: Record<string, unknown>, parentUrl?: string, page?: number) => {
        data: { items: Entity[], view?: any } | undefined;
        isLoading: boolean;
        refetch: () => void;
    };
    renderItem: (entity: Entity) => React.ReactNode;
    filters: Record<string, unknown>;
    setFilters: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
}

const EntityList = <Entity extends { '@id'?: string }>({
    useService,
    renderItem,
    filters,
    setFilters,
}: EntityListProps<Entity>) => {
    const [page, setPage] = useState(1);

    const { data: entities, isLoading, refetch } = useService({ ...filters, ...{ page: page } }, undefined, page);

    useEffect(() => {
        refetch();
    }, [filters, page]);

    useEffect(() => {
        setPage(1); // Reset to first page when filters change
    }, [filters]);

    return (
        <div>
            {entities && entities.view && (<Paginator view={entities.view} setPage={setPage} />)}
            <div className="flex space-x-4 mb-4">
                <input
                    type="text"
                    placeholder="Search"
                    value={filters.search as string || ''}
                    onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                    className="px-4 py-2 rounded-lg bg-white/10 text-white"
                />
                {/* Add more filter inputs as needed */}
            </div>
            <div className="grid grid-cols-1 gap-4">
                {isLoading && <LoadingSpinner />}
                {entities && entities.items.map((entity) => (
                    <div key={entity['@id']} className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 p-6">
                        {renderItem(entity)}
                    </div>
                ))}
            </div>
            {entities && entities.view && (<Paginator view={entities.view} setPage={setPage} />)}
        </div>
    );
};

export default EntityList;
