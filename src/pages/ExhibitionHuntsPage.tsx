import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExhibitionHuntStore } from '@/store/exhibitionHuntStore';
import { useExhibitionsStore } from '@/store/exhibitionsStore';
import ExhibitionHuntList from '@/components/exhibitions/ExhibitionHuntList';
import AddHuntModal from '@/components/exhibitions/AddHuntModal';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/24/outline';

const ExhibitionHuntsPage = () => {
  const { exhibitionId } = useParams<{ exhibitionId: string }>();
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { hunts, isLoading, error, actions } = useExhibitionHuntStore();
  const { exhibitions } = useExhibitionsStore();

  const exhibition = exhibitions.find(e => e.id === Number(exhibitionId));

  useEffect(() => {
    if (exhibitionId) {
      actions.fetchHunts(Number(exhibitionId));
    }
  }, [exhibitionId, actions]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!exhibition) return <ErrorMessage message="Exhibition not found" />;

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <button
            onClick={() => navigate('/exhibitions')}
            className="flex items-center text-white/70 hover:text-white mb-4"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            <span>Vissza a kiállításokhoz</span>
          </button>
          <h1 className="text-4xl font-display font-bold text-white">
            {exhibition.name} - Vadászatok
          </h1>
          <p className="text-lg text-white/70">
            Kiállítási vadászatok kezelése
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          <span>Új Vadászat</span>
        </button>
      </div>

      <ExhibitionHuntList
        hunts={hunts}
        onDelete={actions.deleteHunt}
        onUpdate={actions.updateHunt}
      />

      <AddHuntModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(hunt) => {
          actions.createHunt({
            ...hunt,
            occasionId: exhibition.occasionId,
            status: 'upcoming'
          });
          setIsAddModalOpen(false);
        }}
      />
    </div>
  );
};

export default ExhibitionHuntsPage;