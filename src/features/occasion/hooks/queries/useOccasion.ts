import { occasionsService } from '@/features/occasion/service/occasionsService';
import { Occasion } from '@/features/occasion/types/occasions';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Query keys
const OCCASIONS_KEYS = {
    all: ['occasions'] as const,
    lists: () => [...OCCASIONS_KEYS.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...OCCASIONS_KEYS.lists(), { filters }] as const,
    details: () => [...OCCASIONS_KEYS.all, 'detail'] as const,
    detail: (id: number) => [...OCCASIONS_KEYS.details(), id] as const,
};

// Queries
export function useOccasions(filters?: Record<string, unknown>) {
    return useQuery({
        queryKey: OCCASIONS_KEYS.list(filters ?? {}),
        queryFn: () => occasionsService.getOccasions(),
    });
}

export function useOccasion(id: number) {
    return useQuery({
        queryKey: OCCASIONS_KEYS.detail(id),
        queryFn: () => occasionsService.getOccasion(id),
        enabled: Boolean(id),
    });
}

// Mutations
export function useCreateOccasion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (occasion: Omit<Occasion, 'id'>) =>
            occasionsService.createOccasion(occasion),
        onSuccess: (newOccasion) => {
            // Invalidate list queries
            queryClient.invalidateQueries({
                queryKey: OCCASIONS_KEYS.lists(),
            });

            // Update cache optimistically
            queryClient.setQueryData(
                OCCASIONS_KEYS.detail(newOccasion.id),
                newOccasion
            );
        },
    });
}

export function useUpdateOccasion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: { id: number; updates: Partial<Occasion> }) =>
            occasionsService.updateOccasion(id, updates),
        onSuccess: (updatedOccasion) => {
            // Update lists
            queryClient.invalidateQueries({
                queryKey: OCCASIONS_KEYS.lists(),
            });

            // Update detail view
            queryClient.setQueryData(
                OCCASIONS_KEYS.detail(updatedOccasion.id),
                updatedOccasion
            );
        },
    });
}

export function useDeleteOccasion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => occasionsService.deleteOccasion(id),
        onSuccess: (_data, id) => {
            // Remove from lists
            queryClient.invalidateQueries({
                queryKey: OCCASIONS_KEYS.lists(),
            });

            // Remove detail cache
            queryClient.removeQueries({
                queryKey: OCCASIONS_KEYS.detail(id),
            });
        },
    });
}