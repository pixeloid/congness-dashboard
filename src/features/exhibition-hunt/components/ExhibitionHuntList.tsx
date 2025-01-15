import React, { useState } from 'react';
import { PencilIcon, TrashIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import EditHuntModal from './EditHuntModal';
import { format } from 'date-fns';
import { ExhibitionHunt } from '@/features/exhibition-hunt/types/exhibitionHunts';

interface ExhibitionHuntListProps {
  hunts: ExhibitionHunt[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, updates: Partial<ExhibitionHunt>) => void;
}

const ExhibitionHuntList: React.FC<ExhibitionHuntListProps> = ({
  hunts,
  onDelete,
  onUpdate
}) => {
  const [editingHunt, setEditingHunt] = useState<ExhibitionHunt | null>(null);

  const getStatusColor = (status: ExhibitionHunt['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-400/10 text-green-400 border-green-400/20';
      case 'completed':
        return 'bg-blue-400/10 text-blue-400 border-blue-400/20';
      case 'upcoming':
        return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20';
      default:
        return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {hunts.map((hunt) => (
          <div key={hunt.id} className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-display font-semibold text-white">
                      {hunt.name}
                    </h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full border ${getStatusColor(hunt.status)}`}>
                      {hunt.status}
                    </span>
                  </div>
                  <p className="text-sm text-white/70 mt-1">{hunt.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingHunt(hunt)}
                    className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(hunt.id)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm text-white/70">
                <div className="flex justify-between">
                  <span>Időtartam:</span>
                  <span>
                    {format(new Date(hunt.startDate), 'MM.dd.')} - {format(new Date(hunt.endDate), 'MM.dd.')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Min. látogatás:</span>
                  <span>{hunt.minVisits}</span>
                </div>
                {hunt.reward && (
                  <div className="flex justify-between">
                    <span>Jutalom:</span>
                    <span>{hunt.reward}</span>
                  </div>
                )}
              </div>

              <button
                className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-navy/50 text-white rounded-lg border border-white/10 hover:border-accent/30 transition-colors"
              >
                <UserGroupIcon className="h-5 w-5" />
                <span>Résztvevők Megtekintése</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingHunt && (
        <EditHuntModal
          hunt={editingHunt}
          isOpen={true}
          onClose={() => setEditingHunt(null)}
          onSave={(updates) => {
            onUpdate(editingHunt.id, updates);
            setEditingHunt(null);
          }}
        />
      )}
    </>
  );
}

export default ExhibitionHuntList;