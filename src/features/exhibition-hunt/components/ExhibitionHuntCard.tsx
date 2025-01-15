import React from 'react';
import { useExhibitionHuntStore } from '@/features/exhibition-hunt/store/exhibitionHuntStore';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ExhibitionHunt } from '@/features/exhibition-hunt/types/exhibitionHunts';

interface ExhibitionHuntCardProps {
  hunt: ExhibitionHunt;
  onEdit: () => void;
}

const ExhibitionHuntCard: React.FC<ExhibitionHuntCardProps> = ({ hunt, onEdit }) => {
  const { actions } = useExhibitionHuntStore();

  return (
    <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 hover:border-accent/30 transition-all duration-300 p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-display font-semibold text-white mb-2">
            {hunt.name}
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => actions.deleteHunt(hunt.id)}
            className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionHuntCard;