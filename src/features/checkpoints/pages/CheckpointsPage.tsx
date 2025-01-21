import { useParams } from 'react-router-dom';
import CheckpointList from '@/features/checkpoints/components/CheckpointList';
import CheckpointFilters from '@/features/checkpoints/components/CheckpointFilters';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useCheckpoint } from '@/features/checkpoints/hooks/queries/useCheckpoint';
import CheckpointModal from '@/features/checkpoints/components/CheckpointModal';
import { Checkpoint } from '@/features/checkpoints/types/checkpoints';
import ConfirmModal from '@/components/common/ConfirmModal';

const CheckpointsPage = () => {
  const { occasionCode } = useParams<{ occasionCode: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<Checkpoint | undefined>(undefined);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [checkpointToDelete, setCheckpointToDelete] = useState<Checkpoint | undefined>(undefined);

  const checkpointService = useCheckpoint();
  const { mutate: updateCheckpoint } = checkpointService.useUpdate(`/api/occasions/${occasionCode}`);
  const { mutate: addCheckpoint } = checkpointService.useCreate(`/api/occasions/${occasionCode}`);
  const { mutate: deleteCheckpoint } = checkpointService.useDelete(`/api/occasions/${occasionCode}`);

  const handleAddCheckpoint = (checkpoint: Omit<Checkpoint, 'id' | 'occasion'>) => {
    addCheckpoint({
      ...checkpoint,
      occasion: `/api/occasions/${occasionCode}`
    });
    setIsModalOpen(false);
  }
  const handleUpdateCheckpoint = (checkpoint: Checkpoint) => {
    updateCheckpoint({ iri: checkpoint['@id']!, updates: checkpoint });
  };

  const handleEditClick = (checkpoint: Checkpoint) => {
    setSelectedCheckpoint(checkpoint);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCheckpoint(undefined);
    setIsModalOpen(false);
  };

  const handleAddClick = () => {
    setSelectedCheckpoint(undefined);
    setIsModalOpen(true);
  }

  const handleDeleteClick = (checkpoint: Checkpoint) => {
    setCheckpointToDelete(checkpoint);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (checkpointToDelete) {
      deleteCheckpoint(checkpointToDelete['@id']!);
      setCheckpointToDelete(undefined);
    }
    setIsConfirmModalOpen(false);
  };

  const handleCancelDelete = () => {
    setCheckpointToDelete(undefined);
    setIsConfirmModalOpen(false);
  };


  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Ellenőrzőpontok</h1>
          <p className="text-lg text-white/70">Ellenőrzőpontok kezelése és áttekintése</p>
        </div>
        <button
          onClick={() => handleAddClick()}
          className="inline-flex items-center px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          <span>Új Ellenőrzőpont</span>
        </button>
      </div>


      <CheckpointList
        onDelete={handleDeleteClick}
        onUpdate={handleEditClick}
      />

      <CheckpointModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddCheckpoint}
        onUpdate={handleUpdateCheckpoint}
        checkpoint={selectedCheckpoint}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message="Are you sure you want to delete this checkpoint?"
      />
    </div>
  );
};

export default CheckpointsPage;