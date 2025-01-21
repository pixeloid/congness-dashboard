import { Exhibition } from "@/features/exhibition/types/exhibitions";
import { BaseService } from "@/services/BaseService";

export const exhibitionsService = new BaseService<Exhibition>('exhibitions');
