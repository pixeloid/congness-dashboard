import { checkpointsService } from '@/features/checkpoints/service/checkpointsService';
import { Checkpoint } from '@/features/checkpoints/types/checkpoints';
import { ReactQueryService } from '@/services/ReactQueryService';

export const useCheckpoint = () =>
    new ReactQueryService<Checkpoint>('checkpoints', checkpointsService);
