import { participantsService } from '@/features/participant/service/participantsService';
import { Participant } from '@/features/participant/types/participants';
import { ReactQueryService } from '@/services/ReactQueryService';

export const useParticipant = () =>
    new ReactQueryService<Participant>('participants', participantsService);
