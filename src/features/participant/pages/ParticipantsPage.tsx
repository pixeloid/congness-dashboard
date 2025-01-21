import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ParticipantModal from '@/features/participant/components/ParticipantModal';
import ImportParticipantsModal from '@/features/participant/components/ImportParticipantsModal';
import { UserPlusIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { useParticipant } from '@/features/participant/hooks/queries/useParticipant';
import { Participant } from '@/features/participant/types/participants';
import ParticipantList from '@/features/participant/components/ParticipantList';

const ParticipantsPage = () => {
  const { occasionCode } = useParams<{ occasionCode: string }>();
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | undefined>(undefined);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const participantsService = useParticipant();
  const { mutate: createParticipant } = participantsService.useCreate(`/api/occasions/${occasionCode}`);
  const { mutate: updateParticipant } = participantsService.useUpdate(`/api/occasions/${occasionCode}`);
  const { mutate: deleteParticipant } = participantsService.useDelete(`/api/occasions/${occasionCode}`);

  const handleAddParticipant = (participant: Omit<Participant, 'id' | 'registrationDate'>) => {
    createParticipant({
      ...participant,
      occasion: `/api/occasions/${occasionCode}`
    });
  };

  const handleUpdateParticipant = (participant: Participant) => {
    updateParticipant({
      iri: participant['@id']!,
      updates: participant
    });
  };

  const handleEditClick = (participant: Participant) => {
    setSelectedParticipant(participant);
    setIsParticipantModalOpen(true);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center"></div>
      <div>
        <h1 className="text-4xl font-display font-bold text-white mb-2">Résztvevők</h1>
        <p className="text-lg text-white/70">Résztvevők kezelése és áttekintése</p>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => setIsImportModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-navy/50 text-white rounded-lg border border-white/10 hover:border-accent/30 transition-colors"
        >
          <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
          <span>Import CSV</span>
        </button>
        <button
          onClick={() => setIsParticipantModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light transition-colors"
        >
          <UserPlusIcon className="h-5 w-5 mr-2" />
          <span>Új Résztvevő</span>
        </button>
      </div>
      <ParticipantList
        onEditClick={handleEditClick}
        onDeleteClick={(id) => deleteParticipant(id)}
      />
      <ParticipantModal
        isOpen={isParticipantModalOpen}
        onClose={() => {
          setSelectedParticipant(undefined);
          setIsParticipantModalOpen(false);
        }}
        onAdd={handleAddParticipant}
        onUpdate={handleUpdateParticipant}
        participant={selectedParticipant}
      />
      <ImportParticipantsModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={(participants) => {
          participants.forEach(participant => {
            createParticipant({
              ...participant,
              occasion: `/api/occasions/${occasionCode}`
            });
          });
        }}
      />

    </div>
  );
};

export default ParticipantsPage;