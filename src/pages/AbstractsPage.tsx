import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAbstractStore } from '@/store/abstractStore';
import AbstractList from '@/components/abstracts/AbstractList';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import { PlusIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import InviteSubmitterModal from '@/components/abstracts/InviteSubmitterModal';

const AbstractsPage = () => {
  const { occasionId } = useParams<{ occasionId: string }>();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    abstracts,
    isLoading,
    error,
    actions: {
      fetchAbstracts,
      inviteSubmitter
    }
  } = useAbstractStore();

  useEffect(() => {
    if (occasionId) {
      fetchAbstracts(parseInt(occasionId, 10));
    }
  }, [occasionId, fetchAbstracts]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Absztraktok</h1>
          <p className="text-lg text-white/70">Absztraktok és bírálatok kezelése</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-navy/50 text-white rounded-lg border border-white/10 hover:border-accent/30 transition-colors"
          >
            <EnvelopeIcon className="h-5 w-5 mr-2" />
            <span>Szerző Meghívása</span>
          </button>
          <button
            onClick={() => {
              /* TODO: Navigate to submission form */
              navigate(`/occasions/${occasionId}/abstracts/new`);
            }}
            className="inline-flex items-center px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            <span>Új Absztrakt</span>
          </button>
        </div>
      </div>

      <AbstractList
        abstracts={abstracts}
        onSelect={(abstract) => {
          /* TODO: Navigate to abstract details */
          navigate(`/occasions/${occasionId}/abstracts/${abstract.id}`);
        }}
      />

      <InviteSubmitterModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={(email) => {
          inviteSubmitter(email, parseInt(occasionId!, 10));
          setIsInviteModalOpen(false);
        }}
      />
    </div>
  );
};

export default AbstractsPage;