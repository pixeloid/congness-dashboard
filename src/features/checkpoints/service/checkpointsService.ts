import { Checkpoint } from "@/features/checkpoints/types/checkpoints";
import { BaseService } from "@/services/BaseService";


export const checkpointsService = new BaseService<Checkpoint>('checkpoints');