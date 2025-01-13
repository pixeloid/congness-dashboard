import React, { useRef, useState } from 'react';
import { XMarkIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { Participant } from '@/types/participants';

interface ImportParticipantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (participants: Omit<Participant, 'id' | 'registrationDate'>[]) => void;
}

const ImportParticipantsModal: React.FC<ImportParticipantsModalProps> = ({ isOpen, onClose, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const rows = text.split('\n');
      const headers = rows[0].split(',').map(h => h.trim().toLowerCase());

      const participants = rows.slice(1)
        .filter(row => row.trim())
        .map(row => {
          const values = row.split(',').map(v => v.trim());
          const participant: any = {
            status: 'registered'
          };

          headers.forEach((header, index) => {
            if (header === 'role' && !['attendee', 'speaker', 'organizer', 'staff'].includes(values[index])) {
              participant[header] = 'attendee';
            } else {
              participant[header] = values[index];
            }
          });

          return participant;
        });

      onImport(participants);
      onClose();
    } catch (err) {
      setError('Error parsing CSV file. Please check the format.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative bg-navy-light rounded-xl shadow-xl w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-display font-semibold text-white">
              Résztvevők Importálása
            </h3>
            <button onClick={onClose} className="text-white/70 hover:text-white">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-white/70">
              A CSV fájl első sora tartalmazza a fejléceket: name, email, title, organization, role
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light"
              >
                <ArrowUpTrayIcon className="h-5 w-5" />
                CSV Fájl Kiválasztása
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <div className="mt-4 text-sm text-white/70">
              <h4 className="font-medium text-white mb-2">Példa CSV formátum:</h4>
              <pre className="bg-navy/30 p-2 rounded-lg overflow-x-auto">
                name,email,title,organization,role{'\n'}
                John Doe,john@example.com,Dr.,University,speaker{'\n'}
                Jane Smith,jane@example.com,PhD,Company,attendee
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportParticipantsModal;