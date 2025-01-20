import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export type Filters = Record<string, unknown>;
export type HydraView = {
    '@id'?: string;
    '@type'?: string;
    'hydra:last'?: string;
    'hydra:first'?: string;
    'hydra:next'?: string;
    'hydra:previous'?: string;
};
export type PaginatedResponse<Entity> = {
    items: Entity[];
    view?: HydraView;
};

export type Service<Entity> = {
    getList: (filters?: Filters, parentUrl?: string) => Promise<PaginatedResponse<Entity>>;
    getDetail: (iri: string) => Promise<Entity>;
    create: (data: Omit<Entity, '@id'>, parentUrl?: string) => Promise<Entity>;
    update: (iri: string, updates: Partial<Entity>, parentUrl?: string) => Promise<Entity>;
    delete: (iri: string) => Promise<void>;
};

export class ReactQueryService<
    Entity extends { '@id'?: string },
    Filters extends Record<string, unknown> = Record<string, unknown>
> {
    private baseKey: string;
    private service: {
        getList: (filters?: Filters, parentUrl?: string) => Promise<PaginatedResponse<Entity>>;
        getDetail: (iri: string) => Promise<Entity>;
        create: (data: Omit<Entity, '@id'>, parentUrl?: string) => Promise<Entity>;
        update: (iri: string, updates: Partial<Entity>, parentUrl?: string) => Promise<Entity>;
        delete: (iri: string) => Promise<void>;
    };

    constructor(baseKey: string, service: ReactQueryService<Entity>['service']) {
        this.baseKey = baseKey;
        this.service = service;
    }

    /**
     * Generates query keys for CRUD operations.
     * Supports parent resources (subresources) via parentUrl.
     */
    getQueryKeys(parentUrl?: string) {
        return {
            all: [this.baseKey, parentUrl].filter(Boolean),
            lists: (filters: Filters = {} as Filters) =>
                [...this.getQueryKeys(parentUrl).all, 'list', { filters }] as const,
            details: () => [...this.getQueryKeys(parentUrl).all, 'detail'] as const,
            detail: (id: string | number) =>
                [...this.getQueryKeys(parentUrl).details(), id] as const,
        };
    }

    /**
     * Fetch a collection of resources.
     */
    useList(filters?: Filters, parentUrl?: string, page: number = 1) {
        return useQuery<PaginatedResponse<Entity>>({
            queryKey: [...this.getQueryKeys(parentUrl).lists(filters as Filters), page],
            queryFn: () => this.service.getList(filters as Filters, parentUrl),
            select: (data) => ({
                items: data.items,
                view: data.view,
            })
        });
    }

    /**
     * Fetch a single resource by ID.
     */
    useDetail(iri: string, parentUrl?: string) {
        return useQuery({
            queryKey: this.getQueryKeys(parentUrl).detail(iri),
            queryFn: () => this.service.getDetail(iri),
            enabled: Boolean(iri),
        });
    }

    useCreate(parentUrl?: string) {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data: Omit<Entity, '@id'>) => this.service.create(data),
            onMutate: async (newEntity) => {
                const listKey = this.getQueryKeys(parentUrl).lists();

                // Cancel ongoing queries for the specific list
                await queryClient.cancelQueries({ queryKey: listKey });

                // Snapshot the previous list data
                const previousList = queryClient.getQueryData<Entity[]>(listKey);

                // Optimistically update the list cache
                queryClient.setQueryData(listKey, (old: Entity[] | undefined) => {
                    return old
                        ? [...old, { ...newEntity, ['@id']: 'temp-id' }]
                        : [{ ...newEntity, ['@id']: 'temp-id' }];
                });

                return { previousList };
            },
            onError: (err, _newEntity, context) => {
                const listKey = this.getQueryKeys(parentUrl).lists();

                // Rollback to the previous list state if mutation fails
                queryClient.setQueryData(listKey, context?.previousList);
                toast.error(`Create failed: ${err.message}`);
            },
            onSuccess: (newEntity: Entity) => {
                const listKey = this.getQueryKeys(parentUrl).lists();

                // Replace temporary ID and invalidate the list cache
                queryClient.invalidateQueries({ queryKey: listKey });
                queryClient.setQueryData(this.getQueryKeys(parentUrl).detail(newEntity['@id']!), newEntity);
            },
            onSettled: () => {
                const listKey = this.getQueryKeys(parentUrl).lists();

                // Always refetch the list to ensure consistency
                queryClient.invalidateQueries({ queryKey: listKey });
            },
        });
    }
    /**
   * Update an existing resource by ID.
   */
    useUpdate(parentUrl?: string) {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({ iri, updates }: { iri: string; updates: Partial<Entity> }) =>
                this.service.update(iri, updates, parentUrl),
            onMutate: async ({ iri, updates }) => {
                await queryClient.cancelQueries({ queryKey: this.getQueryKeys(parentUrl).detail(iri) });

                const previousEntity = queryClient.getQueryData<Entity>(this.getQueryKeys(parentUrl).detail(iri));

                queryClient.setQueryData<Entity>(this.getQueryKeys(parentUrl).detail(iri), (old) => ({
                    ...old!,
                    ...updates,
                }));

                return { previousEntity };
            },
            onError: (err, { iri }, context) => {
                queryClient.setQueryData(this.getQueryKeys(parentUrl).detail(iri), context?.previousEntity);
                toast.error(`Update failed: ${err.message}`);
            },
            onSettled: (_data, _error, { iri }) => {
                queryClient.invalidateQueries({ queryKey: this.getQueryKeys(parentUrl).lists() });
                queryClient.invalidateQueries({ queryKey: this.getQueryKeys(parentUrl).detail(iri) });
            },
        });
    }
    /**
     * Delete a resource by ID.
     */
    useDelete(parentUrl?: string) {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (id: string) => this.service.delete(id),
            onError: (err, _id) => {
                toast.error(`Delete failed: ${err.message}`);
            },
            onSuccess: (_data, id) => {
                queryClient.invalidateQueries({ queryKey: this.getQueryKeys(parentUrl).lists() });
                queryClient.removeQueries({ queryKey: this.getQueryKeys(parentUrl).detail(id) });
            },
        });
    }
}
