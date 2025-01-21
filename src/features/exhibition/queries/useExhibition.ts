import { exhibitionsService } from '@/features/exhibition/service/exhibitionsService';
import { Exhibition } from '@/features/exhibition/types/exhibitions';
import { ReactQueryService } from '@/services/ReactQueryService';

export const useExhibition = () =>
    new ReactQueryService<Exhibition>('exhibitions', exhibitionsService);
