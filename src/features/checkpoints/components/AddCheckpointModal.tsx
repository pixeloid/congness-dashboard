import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Checkpoint, CheckpointType, CheckpointStatus, CheckpointRestriction } from '@/features/checkpoints/types/checkpoints';

interface AddCheckpointModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (checkpoint: Omit<Checkpoint, 'id'>) => void;
}

const AddCheckpointModal: React.FC<AddCheckpointModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<CheckpointType>('general');
  const [status, setStatus] = useState<CheckpointStatus>('inactive');
  const [restriction, setRestriction] = useState<CheckpointRestriction>('none');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [requiresPassport, setRequiresPassport] = useState(false);
  const [price, setPrice] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name,
      description,
      type,
      status,
      restriction,
      location,
      capacity: capacity ? parseInt(capacity) : undefined,
      startTime: startTime || undefined,
      endTime: endTime || undefined,
      requiresPassport,
      price: price ? parseInt(price) : undefined,
      occasionId: 0 // This will be set by the parent component
    });

    // Reset form
    setName('');
    setDescription('');
    setType('general');
    setStatus('inactive');
    setRestriction('none');
    setLocation('');
    setCapacity('');
    setStartTime('');
    setEndTime('');
    setRequiresPassport(false);
    setPrice('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

        <div className="relative bg-navy-light rounded-xl shadow-xl w-full max-w-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-display font-semibold text-white">
              Add New Checkpoint
            </h3>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
                  required
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-white/70 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white/70 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-white/70 mb-1">
                  Type
                </label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value as CheckpointType)}
                  className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
                  required
                >
                  <option value="registration">Registration</option>
                  <option value="dining">Dining</option>
                  <option value="program">Program</option>
                  <option value="general">General</option>
                </select>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-white/70 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as CheckpointStatus)}
                  className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>

              <div>
                <label htmlFor="restriction" className="block text-sm font-medium text-white/70 mb-1">
                  Restriction
                </label>
                <select
                  id="restriction"
                  value={restriction}
                  onChange={(e) => setRestriction(e.target.value as CheckpointRestriction)}
                  className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
                  required
                >
                  <option value="none">None</option>
                  <option value="paid">Paid</option>
                  <option value="vip">VIP</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-white/70 mb-1">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
                />
              </div>

              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-white/70 mb-1">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  id="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-white/70 mb-1">
                  Capacity
                </label>
                <input
                  type="number"
                  id="capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  min="0"
                  className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-white/70 mb-1">
                  Price (EUR)
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="0"
                  className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="requiresPassport"
                checked={requiresPassport}
                onChange={(e) => setRequiresPassport(e.target.checked)}
                className="h-4 w-4 rounded border-white/10 bg-navy/30 text-accent focus:ring-accent/30"
              />
              <label htmlFor="requiresPassport" className="ml-2 text-sm text-white/70">
                Requires Passport
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-white/70 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light transition-colors"
              >
                Create Checkpoint
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCheckpointModal;