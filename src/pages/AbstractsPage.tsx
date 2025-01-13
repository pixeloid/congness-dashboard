import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAbstractStore } from '@/store/abstractStore';
import { useAbstractSubmissionStore } from '@/store/abstractSubmissionStore';
import AbstractList from '@/components/abstracts/AbstractList';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import { PlusIcon } from '@heroicons/react/24/outline';

const AbstractsPage = () => {
  const { occasionId } = useParams<{ occasionId: string }>();
  const navigate = useNavigate();

  const {
    abstracts,
    isLoading: abstractsLoading,
    error: abstractsError,
    actions: { fetchAbstracts }
  } = useAbstractStore();

  const {
    isLoading: invitationsLoading,
    error: invitationsError,
    actions: { fetchInvitations }
  } = useAbstractSubmissionStore();

  useEffect(() => {
    if (occasionId) {
      const id = parseInt(occasionId, 10);
      fetchAbstracts(id);
      fetchInvitations(id);
    }
  }, [occasionId, fetchAbstracts, fetchInvitations]);

  if (abstractsLoading || invitationsLoading) return <LoadingSpinner />;
  if (abstractsError) return <ErrorMessage message={abstractsError} />;
  if (invitationsError) return <ErrorMessage message={invitationsError} />;

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Absztraktok</h1>
          <p className="text-lg text-white/70">Absztraktok és bírálatok kezelése</p>
        </div>
        <button
          onClick={() => navigate(`/occasions/${occasionId}/abstracts/new`)}
          className="inline-flex items-center px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          <span>Új Absztrakt</span>
        </button>
      </div>

      <AbstractList
        abstracts={abstracts}
        onSelect={(abstract) => {
          navigate(`/occasions/${occasionId}/abstracts/${abstract.id}`);
        }}
      />
    </div>
  );
};

export default AbstractsPage;