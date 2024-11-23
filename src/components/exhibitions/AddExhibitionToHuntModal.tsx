import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface AddExhibitionToHuntModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (exhibitionId: number, points: number, captureLeads: boolean) => void;
}

const AddExhibitionToHuntModal: React.FC<AddExhibitionToHuntModalProps> = ({ 
  isOpen, 
  onClose, 
  onAdd 
}) => {
  const [exhibitionId, setExhibitionId] = useState('');
  const [points, setPoints] = useState('10');
  const [captureLeads, setCaptureLeads] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(Number(exhibitionId), Number(points), captureLeads);
    setExhibitionId('');
    setPoints('10');
    setCaptureLeads(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative bg-navy-light rounded-xl shadow-xl w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-display font-semibold text-white">
              Kiállítás Hozzáadása a Vadászathoz
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
              <label htmlFor="exhibitionId" className="block text-sm font-medium text-white/70 mb-1">
                Kiállítás
              </label>
              <input
                type="text"
                id="exhibitionId"
                value={exhibitionId}
                onChange={(e) => setExhibitionId(e.target.value)}
                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
                required
              />
            </div>

            <div>
              <label htmlFor="points" className="block text-sm font-medium text-white/70 mb-1">
                Pontszám
              </label>
              <input
                type="number"
                id="points"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                min="1"
                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="captureLeads"
                checked={captureLeads}
                onChange={(e) => setCaptureLeads(e.target.checked)}
                className="h-4 w-4 rounded border-white/10 bg-navy/30 text-accent focus:ring-accent/30"
              />
              <label htmlFor="captureLeads" className="ml-2 text-sm text-white/70">
                Lead Rögzítés Engedélyezése
              </label>
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
                Hozzáadás
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExhibitionToHuntModal;