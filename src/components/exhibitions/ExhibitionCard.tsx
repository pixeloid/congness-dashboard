import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Exhibition } from '@/types/exhibitions';
import { 
  UserGroupIcon, 
  QrCodeIcon,
  DocumentTextIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
  MapIcon
} from '@heroicons/react/24/outline';
import { useExhibitionsStore } from '@/store/exhibitionsStore';
import LeadCaptureModal from './LeadCaptureModal';
import { useLeadCaptureStore } from '@/store/leadCaptureStore';

interface ExhibitionCardProps {
  exhibition: Exhibition;
}

const ExhibitionCard: React.FC<ExhibitionCardProps> = ({ exhibition }) => {
  const { actions } = useExhibitionsStore();
  const leadCaptureActions = useLeadCaptureStore(state => state.actions);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const handleCaptureLead = (participantId: number, notes: string) => {
    leadCaptureActions.captureLead(
      exhibition.id,
      participantId,
      notes,
      1 // Current user ID (should come from auth context)
    );
    setIsLeadModalOpen(false);
  };

  return (
    <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 hover:border-accent/30 transition-all duration-300">
      <div className="relative h-48 rounded-t-xl overflow-hidden">
        {exhibition.banner ? (
          <img
            src={exhibition.banner}
            alt={exhibition.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-navy-light/50 flex items-center justify-center">
            <span className="text-white/30">No Banner</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
        <h3 className="absolute bottom-4 left-4 right-4 text-xl font-display font-semibold text-white">
          {exhibition.name}
        </h3>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2 text-white/70">
          <DocumentTextIcon className="h-5 w-5 text-accent" />
          <span className="text-sm">
            {exhibition.privacy_doc || 'No privacy document'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-white/70">
            <QrCodeIcon className="h-5 w-5 text-accent" />
            <span className="text-sm">
              {exhibition.enabledLeadCapture ? 'Lead Capture Enabled' : 'Lead Capture Disabled'}
            </span>
          </div>
        </div>

        <div className="pt-4 grid grid-cols-2 gap-2">
          <button 
            onClick={() => actions.updateExhibition(exhibition.id, {})}
            className="inline-flex items-center justify-center px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light transition-colors"
          >
            <PencilIcon className="h-5 w-5 mr-2" />
            <span>Szerkesztés</span>
          </button>
          <button 
            onClick={() => actions.deleteExhibition(exhibition.id)}
            className="inline-flex items-center justify-center px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
          >
            <TrashIcon className="h-5 w-5 mr-2" />
            <span>Törlés</span>
          </button>
          <Link 
            to={`/exhibitions/${exhibition.id}/staff`}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-navy/50 text-white rounded-lg border border-white/10 hover:border-accent/30 transition-colors"
          >
            <UserGroupIcon className="h-5 w-5" />
            <span>Személyzet</span>
          </Link>
          <Link 
            to={`/exhibitions/${exhibition.id}/hunts`}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-navy/50 text-white rounded-lg border border-white/10 hover:border-accent/30 transition-colors"
          >
            <MapIcon className="h-5 w-5" />
            <span>Vadászatok</span>
          </Link>
          {exhibition.enabledLeadCapture && (
            <button
              onClick={() => setIsLeadModalOpen(true)}
              className="col-span-2 flex items-center justify-center gap-2 px-4 py-2 bg-navy/50 text-white rounded-lg border border-white/10 hover:border-accent/30 transition-colors"
            >
              <UserPlusIcon className="h-5 w-5" />
              <span>Lead Rögzítése</span>
            </button>
          )}
        </div>
      </div>

      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        onCapture={handleCaptureLead}
      />
    </div>
  );
};

export default ExhibitionCard;