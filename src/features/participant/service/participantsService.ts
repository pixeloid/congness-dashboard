import api from "@/api/api";
import { Participant } from "@/features/participant/types/participants";

export const participantsService = {
    async getParticipants(occasionCode: string): Promise<Participant[]> {
        const response = await api.get<{ 'hydra:member': Participant[] }>(`/occasions/${occasionCode}/participants`);
        return response.data['hydra:member'];
    },

    async getParticipant(code: string): Promise<Participant> {
        const response = await api.get<Participant>(`/participants/${code}`);
        return response.data;
    },

    async createParticipant(Participant: Omit<Participant, 'id'>): Promise<Participant> {
        const response = await api.post<Participant>('/participants', Participant);
        return response.data;
    },

    async updateParticipant(code: string, updates: Partial<Participant>): Promise<Participant> {
        const response = await api.patch<Participant>(`/participants/${code}`, updates);
        return response.data;
    },

    async deleteParticipant(code: string): Promise<void> {
        await api.delete(`/participants/${code}`);
    }
};