import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import { useParticipantsStore } from '@/store/participantsStore';
import ParticipantStatusBadge from '@/components/participants/ParticipantStatusBadge';
import ParticipantRoleBadge from '@/components/participants/ParticipantRoleBadge';
import ParticipantFilters from '@/components/participants/ParticipantFilters';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

const ParticipantsPage = () => {
  const { occasionId } = useParams<{ occasionId: string }>();
  const {
    participants,
    filters,
    isLoading,
    error,
    actions: {
      fetchParticipants,
      setFilters,
      deleteParticipant
    }
  } = useParticipantsStore();

  useEffect(() => {
    if (occasionId) {
      fetchParticipants(parseInt(occasionId, 10));
    }
  }, [occasionId, fetchParticipants]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const filteredParticipants = participants.filter(participant => {
    if (filters.role && participant.role !== filters.role) return false;
    if (filters.status && participant.status !== filters.status) return false;
    if (filters.search) {
      const search = filters.search.toLowerCase();
      return (
        participant.name.toLowerCase().includes(search) ||
        participant.email.toLowerCase().includes(search)
      );
    }
    return true;
  });

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Résztvevők</h1>
          <p className="text-lg text-white/70">Résztvevők kezelése és áttekintése</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light transition-colors">
          <UserPlusIcon className="h-5 w-5 mr-2" />
          <span>Új Résztvevő</span>
        </button>
      </div>

      <ParticipantFilters filters={filters} onFilterChange={setFilters} />

      <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Név</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Email</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Szerep</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Státusz</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Regisztráció</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-white/70">Műveletek</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredParticipants.map((participant) => (
                <tr key={participant.id} className="hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-white">{participant.name}</div>
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
                  <td className="px-6 py-4 text-white/70">
                    {format(new Date(participant.registrationDate), 'yyyy. MM. dd. HH:mm', { locale: hu })}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="px-3 py-1 text-sm bg-accent/10 text-accent rounded hover:bg-accent/20 transition-colors">
                      Szerkesztés
                    </button>
                    <button
                      onClick={() => deleteParticipant(participant.id)}
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
    </div>
  );
};

export default ParticipantsPage;