import React, { Fragment, useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
}

const EntityList = <Entity extends { '@id'?: string }>({
    useService,
    renderItem,
    filters,
}: EntityListProps<Entity>) => {
    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const urlFilters = useMemo(() => Object.fromEntries(query.entries()), [location.search]);
    const initialPage = useMemo(() => parseInt(query.get('page') || '1', 10), [query]);

    const [page, setPage] = useState(initialPage);
    const [previousEntities, setPreviousEntities] = useState<Entity[]>([]);

    const { data: entities, isLoading, refetch } = useService({ ...filters, ...urlFilters, page: page || 1 }, undefined, page);

    useEffect(() => {
        refetch();
    }, [filters, urlFilters, page]);

    useEffect(() => {
        if (entities && entities.items) {
            setPreviousEntities(entities.items);
        }
    }, [entities]);

    useEffect(() => {
        const newQuery = new URLSearchParams();
        Object.entries({ ...filters, page }).forEach(([key, value]) => {
            if (value) newQuery.set(key, value as unknown as string);
        });

        const currentQuery = new URLSearchParams(location.search);
        if (newQuery.toString() !== currentQuery.toString()) {
            navigate({ search: newQuery.toString() }, { replace: true });
        }
    }, [filters, page, navigate, location.search]);

    return (
        <Fragment>
            {entities && entities.view && (<Paginator view={entities.view} setPage={setPage} />)}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <LoadingSpinner />
                </div>
            )}
            {(entities ? entities.items : previousEntities).map((entity) => (
                <Fragment key={entity['@id']}>
                    {renderItem(entity)}
                </Fragment>
            ))}
            {entities && entities.view && (<Paginator view={entities.view} setPage={setPage} />)}
        </Fragment>
    );
};

export default EntityList;
