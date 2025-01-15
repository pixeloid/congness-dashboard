import api from "@/api/api";
import { Occasion } from "@/features/occasion/types/occasions";

export const occasionsService = {
    async getOccasions(): Promise<Occasion[]> {
        const response = await api.get<{ 'hydra:member': Occasion[] }>('/occasions');
        return response.data['hydra:member'];
    },

    async getOccasion(id: number): Promise<Occasion> {
        const response = await api.get<Occasion>(`/occasions/${id}`);
        return response.data;
    },

    async createOccasion(occasion: Omit<Occasion, 'id'>): Promise<Occasion> {
        const response = await api.post<Occasion>('/occasions', occasion);
        return response.data;
    },

    async updateOccasion(id: number, updates: Partial<Occasion>): Promise<Occasion> {
        const response = await api.patch<Occasion>(`/occasions/${id}`, updates);
        return response.data;
    },

    async deleteOccasion(id: number): Promise<void> {
        await api.delete(`/occasions/${id}`);
    }
};