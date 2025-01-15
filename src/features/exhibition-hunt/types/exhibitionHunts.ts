
export interface ExhibitionHunt {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    minVisits: number;
    reward?: string;
    occasionId: number;
    status: 'active' | 'completed' | 'upcoming';
}

export interface ExhibitionHuntParticipant {
    id: number;
    huntId: number;
    participantId: number;
    joinedAt: string;
    totalPoints: number;
    completedAt?: string;
    status: 'joined' | 'in_progress' | 'completed';
}

export interface ExhibitionHuntVisit {
    id: number;
    participantId: number;
    huntExhibitionId: number;
    visitedAt: string;
    points: number;
    notes?: string;
}


export interface HuntFilters {
    status?: 'active' | 'completed' | 'upcoming';
    occasionId?: number;
}