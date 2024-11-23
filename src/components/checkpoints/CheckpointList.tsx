import React from 'react';
import { Checkpoint } from '@/types/checkpoints';
import { useCheckpointStore } from '@/store/checkpointStore';
import { format } from 'date-fns';
import {
  PencilIcon,
  TrashIcon,
  UserGroupIcon,
  ClockIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline';

interface CheckpointListProps {
  checkpoints: Checkpoint[];
  onUpdate: (id: number, updates: Partial<Checkpoint>) => void;
  onDelete: (id: number) => void;
}

const CheckpointList: React.FC<CheckpointListProps> = ({
  checkpoints,
  onUpdate,
  onDelete
}) => {
  const getCheckpointStats = useCheckpointStore(state => state.actions.getCheckpointStats);

  const getStatusColor = (status: Checkpoint['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-400/10 text-green-400 border-green-400/20';
      case 'inactive':
        return 'bg-red-400/10 text-red-400 border-red-400/20';
      case 'scheduled':
        return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20';
      default:
        return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
    }
  };

  const getTypeColor = (type: Checkpoint['type']) => {
    switch (type) {
      case 'registration':
        return 'bg-blue-400/10 text-blue-400 border-blue-400/20';
      case 'dining':
        return 'bg-purple-400/10 text-purple-400 border-purple-400/20';
      case 'program':
        return 'bg-pink-400/10 text-pink-400 border-pink-400/20';
      default:
        return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {checkpoints.map((checkpoint) => {
        const stats = getCheckpointStats(checkpoint.id);

        return (
          <div key={checkpoint.id} className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-display font-semibold text-white">
                      {checkpoint.name}
                    </h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full border ${getStatusColor(checkpoint.status)}`}>
                      {checkpoint.status}
                    </span>
                    <span className={`px-2 py-0.5 text-xs rounded-full border ${getTypeColor(checkpoint.type)}`}>
                      {checkpoint.type}
                    </span>
                  </div>
                  <p className="text-sm text-white/70 mt-1">{checkpoint.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onUpdate(checkpoint.id, {})}
                    className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(checkpoint.id)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                {checkpoint.location && (
                  <div className="flex items-center gap-2 text-white/70">
                    <MapPinIcon className="h-5 w-5 text-accent" />
                    <span>{checkpoint.location}</span>
                  </div>
                )}

                {(checkpoint.startTime && checkpoint.endTime) && (
                  <div className="flex items-center gap-2 text-white/70">
                    <ClockIcon className="h-5 w-5 text-accent" />
                    <span>
                      {format(new Date(checkpoint.startTime), 'HH:mm')} -
                      {format(new Date(checkpoint.endTime), 'HH:mm')}
                    </span>
                  </div>
                )}

                {checkpoint.price && (
                  <div className="flex items-center gap-2 text-white/70">
                    <CurrencyDollarIcon className="h-5 w-5 text-accent" />
                    <span>{checkpoint.price} EUR</span>
                  </div>
                )}

                {checkpoint.requiresPassport && (
                  <div className="flex items-center gap-2 text-white/70">
                    <IdentificationIcon className="h-5 w-5 text-accent" />
                    <span>Passport Required</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-display font-bold text-white">
                      {stats.uniqueVisitors}
                    </p>
                    <p className="text-sm text-white/70">Unique Visitors</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-display font-bold text-white">
                      {stats.totalVisits}
                    </p>
                    <p className="text-sm text-white/70">Total Visits</p>
                  </div>
                </div>
              </div>

              <button
                className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-navy/50 text-white rounded-lg border border-white/10 hover:border-accent/30 transition-colors"
              >
                <UserGroupIcon className="h-5 w-5" />
                <span>View Visits</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CheckpointList;