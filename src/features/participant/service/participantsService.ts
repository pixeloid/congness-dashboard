import { Participant } from "@/features/participant/types/participants";
import { BaseService } from "@/services/BaseService";


export const participantsService = new BaseService<Participant>('participants');