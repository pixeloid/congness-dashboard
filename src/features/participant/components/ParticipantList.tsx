import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import ParticipantStatusBadge from '@/features/participant/components/ParticipantStatusBadge';
import ParticipantRoleBadge from '@/features/participant/components/ParticipantRoleBadge';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useParticipantsStore } from '@/features/participant/store/participantsStore';
import { useParticipant } from '@/features/participant/hooks/queries/useParticipant';
import { Filters } from '@/services/ReactQueryService';
import { Participant } from '@/features/participant/types/participants';
import ParticipantFilters from '@/features/participant/components/ParticipantFilters';

interface ParticipantListProps {
    onEditClick: (participant: Participant) => void;
    onDeleteClick: (id: string) => void;
}

const ParticipantList: React.FC<ParticipantListProps> = ({ onEditClick, onDeleteClick }) => {
    const { occasionCode } = useParams<{ occasionCode: string }>();
    const participantsService = useParticipant();
    const { filters, actions: { setFilters } } = useParticipantsStore();
    const { data: participants, isLoading } = participantsService.useList(filters as Filters, `/api/occasions/${occasionCode}`);



    return (<Fragment>

        <ParticipantFilters filters={filters} onFilterChange={setFilters} />
        {isLoading && <LoadingSpinner />}
        <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Név</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Email</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Szerep</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Státusz</th>
                            <th className="px-6 py-4 text-right text-sm font-medium text-white/70">Műveletek</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {participants && participants.items.map((participant) => (
                            <tr key={participant['@id']} className="hover:bg-white/5">
                                <td className="px-6 py-4">
                                    <div>
                                        <div className="font-medium text-white">{`${participant.last_name} ${participant.first_name}`}</div>
                                        {participant.organization && (
                                            <div className="text-sm text-white/70">{participant.organization}</div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-white/70">{participant.email}</td>
                                <td className="px-6 py-4">
                                    <ParticipantRoleBadge role={participant.role} />
                                </td>
                                <td className="px-6 py-4">
                                    <ParticipantStatusBadge status={participant.status} />
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button
                                        onClick={() => onEditClick(participant)}
                                        className="px-3 py-1 text-sm bg-accent/10 text-accent rounded hover:bg-accent/20 transition-colors">
                                        Szerkesztés
                                    </button>
                                    <button
                                        onClick={() => onDeleteClick(participant['@id']!)}
                                        className="px-3 py-1 text-sm bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 transition-colors"
                                    >
                                        Törlés
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </Fragment>
    );
};

export default ParticipantList;
