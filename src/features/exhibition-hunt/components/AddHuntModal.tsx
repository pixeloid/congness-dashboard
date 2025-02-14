import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface AddHuntModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (hunt: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    minVisits: number;
    reward?: string;
  }) => void;
}

const AddHuntModal: React.FC<AddHuntModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minVisits, setMinVisits] = useState(5);
  const [reward, setReward] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name,
      description,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      minVisits,
      reward: reward || undefined
    });
    setName('');
    setDescription('');
    setStartDate('');
    setEndDate('');
    setMinVisits(5);
    setReward('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative bg-navy-light rounded-xl shadow-xl w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-display font-semibold text-white">
              Új Vadászat Létrehozása
            </h3>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-1">
                Vadászat Neve
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
              <label htmlFor="description" className="block text-sm font-medium text-white/70 mb-1">
                Leírás
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-white/70 mb-1">
                  Kezdés
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
                  required
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-white/70 mb-1">
                  Befejezés
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="minVisits" className="block text-sm font-medium text-white/70 mb-1">
                Minimum Látogatások Száma
              </label>
              <input
                type="number"
                id="minVisits"
                value={minVisits}
                onChange={(e) => setMinVisits(parseInt(e.target.value))}
                min={1}
                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
                required
              />
            </div>

            <div>
              <label htmlFor="reward" className="block text-sm font-medium text-white/70 mb-1">
                Jutalom
              </label>
              <input
                type="text"
                id="reward"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-white/70 hover:text-white"
              >
                Mégse
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light transition-colors"
              >
                Létrehozás
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHuntModal;