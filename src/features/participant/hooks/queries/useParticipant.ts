import { participantsService } from '@/features/participant/service/participantsService';
import { Participant } from '@/features/participant/types/participants';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Query keys
const PARTICIPANTS_KEYS = {
    all: ['participants'] as const,
    lists: () => [...PARTICIPANTS_KEYS.all, 'list'] as const,
    list: (filters: Record<string, unknown>, occasionCode: string) => [...PARTICIPANTS_KEYS.lists(), { filters, occasionCode }] as const,
    details: () => [...PARTICIPANTS_KEYS.all, 'detail'] as const,
    detail: (code: string) => [...PARTICIPANTS_KEYS.details(), code] as const,
};

// Queries
export function useParticipants(occasionCode: string, filters?: Record<string, unknown>) {
    return useQuery({
        queryKey: PARTICIPANTS_KEYS.list(filters ?? {}, occasionCode),
        queryFn: () => participantsService.getParticipants(occasionCode),
    });
}

export function useParticipant(code: string) {
    return useQuery({
        queryKey: PARTICIPANTS_KEYS.detail(code),
        queryFn: () => participantsService.getParticipant(code),
        enabled: Boolean(code),
    });
}

// Mutations
export function useCreateParticipant() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (participant: Omit<Participant, 'id'>) =>
            participantsService.createParticipant(participant),
        onSuccess: (newParticipant) => {
            // Invalidate list queries
            queryClient.invalidateQueries({
                queryKey: PARTICIPANTS_KEYS.lists(),
            });

            // Update cache optimistically
            queryClient.setQueryData(
                PARTICIPANTS_KEYS.detail(newParticipant.code!),
                newParticipant
            );
        },
    });
}

export function useUpdateParticipant() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ code, updates }: { code: string; updates: Partial<Participant> }) =>
            participantsService.updateParticipant(code, updates),
        onSuccess: (updatedParticipant) => {
            // Update lists
            queryClient.invalidateQueries({
                queryKey: PARTICIPANTS_KEYS.lists(),
            });

            // Update detail view
            queryClient.setQueryData(
                PARTICIPANTS_KEYS.detail(updatedParticipant.code!),
                updatedParticipant
            );
        },
    });
}

export function useDeleteParticipant() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (code: string) => participantsService.deleteParticipant(code),
        onSuccess: (_data, id) => {
            // Remove from lists
            queryClient.invalidateQueries({
                queryKey: PARTICIPANTS_KEYS.lists(),
            });

            // Remove detail cache
            queryClient.removeQueries({
                queryKey: PARTICIPANTS_KEYS.detail(id),
            });
        },
    });
}