import { Occasion } from "@/features/occasion/types/occasions";
import { BaseService } from "@/services/BaseService";

class OccasionService extends BaseService<Occasion> { }

export const occasionsService = new OccasionService('occasions');