import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCheckpointStore } from '@/store/checkpointStore';
import CheckpointList from '@/components/checkpoints/CheckpointList';
import CheckpointFilters from '@/components/checkpoints/CheckpointFilters';
import AddCheckpointModal from '@/components/checkpoints/AddCheckpointModal';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const CheckpointsPage = () => {
  const { occasionId } = useParams<{ occasionId: string }>();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const {
    checkpoints,
    filters,
    isLoading,
    error,
    actions: {
      fetchCheckpoints,
      setFilters,
      addCheckpoint,
      updateCheckpoint,
      deleteCheckpoint
    }
  } = useCheckpointStore();

  useEffect(() => {
    if (occasionId) {
      fetchCheckpoints(parseInt(occasionId, 10));
    }
  }, [occasionId, fetchCheckpoints]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Ellenőrzőpontok</h1>
          <p className="text-lg text-white/70">Ellenőrzőpontok kezelése és áttekintése</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          <span>Új Ellenőrzőpont</span>
        </button>
      </div>

      <CheckpointFilters filters={filters} onFilterChange={setFilters} />

      <CheckpointList
        checkpoints={checkpoints}
        onUpdate={updateCheckpoint}
        onDelete={deleteCheckpoint}
      />

      <AddCheckpointModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(checkpoint) => {
          addCheckpoint({
            ...checkpoint,
            occasionId: parseInt(occasionId!, 10)
          });
          setIsAddModalOpen(false);
        }}
      />
    </div>
  );
};

export default CheckpointsPage;