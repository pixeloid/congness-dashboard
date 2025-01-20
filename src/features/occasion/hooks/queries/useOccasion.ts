import { occasionsService } from '@/features/occasion/service/occasionsService';
import { Occasion } from '@/features/occasion/types/occasions';
import { ReactQueryService } from '@/services/ReactQueryService';

export const useOccasionService = new ReactQueryService<Occasion>('occasions', occasionsService);
