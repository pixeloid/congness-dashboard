import React, { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Participant } from '@/features/participant/types/participants';

interface ParticipantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (participant: Omit<Participant, 'id' | 'registrationDate'>) => void;
  onUpdate: (participant: Participant) => void;
  participant?: Participant;
}

const ParticipantModal: React.FC<ParticipantModalProps> = ({ isOpen, onClose, onAdd, onUpdate, participant }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState<Participant['role']>('attendee');


  useEffect(() => {
    if (participant) {
      setFirstName(participant.first_name);
      setLastName(participant.last_name);
      setEmail(participant.email);
      setTitle(participant.title!);
      setOrganization(participant.organization!);
      setRole(participant.role);
    } else {
      setFirstName('');
      setLastName('');
      setEmail('');
      setTitle('');
      setOrganization('');
      setRole('attendee');
    }
  }, [participant]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (participant) {
      onUpdate({
        ...participant,
        first_name: firstName,
        last_name: lastName,
        email,
        title,
        organization,
        role,
      });
    } else {
      onAdd({
        first_name: firstName,
        last_name: lastName,
        email,
        title,
        organization,
        role,
        status: 'registered',
        occasion: '',
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

        <div className="relative bg-navy-light rounded-xl shadow-xl w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-display font-semibold text-white">
              Új Résztvevő
            </h3>
            <button onClick={onClose} className="text-white/70 hover:text-white">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">
                Vezetéknév
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">
                Keresztnév
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">
                Titulus
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">
                Szervezet
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">
                Szerepkör
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Participant['role'])}
                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
                required
              >
                <option value="attendee">Résztvevő</option>
                <option value="speaker">Előadó</option>
                <option value="organizer">Szervező</option>
                <option value="staff">Személyzet</option>
              </select>
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
                className="px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light"
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

export default ParticipantModal;