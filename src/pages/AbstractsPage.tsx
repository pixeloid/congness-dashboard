import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAbstractStore } from '@/store/abstractStore';
import { useAbstractSubmissionStore } from '@/store/abstractSubmissionStore';
import AbstractList from '@/components/abstracts/AbstractList';
import AbstractFilters from '@/components/abstracts/AbstractFilters';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import { PlusIcon } from '@heroicons/react/24/outline';
import { AbstractStatus } from '@/types/abstract';

const AbstractsPage = () => {
  const { occasionId } = useParams<{ occasionId: string }>();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<{
    search?: string;
    status?: AbstractStatus;
    presentationType?: 'oral' | 'poster';
  }>({});

  const {
    abstracts,
    isLoading: abstractsLoading,
    error: abstractsError,
    actions: { fetchAbstracts }
  } = useAbstractStore();

  const {
    isLoading: invitationsLoading,
    error: invitationsError,
    actions
  } = useAbstractSubmissionStore();

  useEffect(() => {
    if (occasionId) {
      const id = parseInt(occasionId, 10);
      actions.fetchSubmissionProcess(id);
      fetchAbstracts(id);
      actions.fetchInvitations(id);
    }
  }, [occasionId, actions, fetchAbstracts]);

  const filteredAbstracts = abstracts.filter(abstract => {
    if (filters.status && abstract.status !== filters.status) return false;
    if (filters.presentationType && abstract.presentationType !== filters.presentationType) return false;
    if (filters.search) {
      const search = filters.search.toLowerCase();
      return (
        abstract.title.toLowerCase().includes(search) ||
        abstract.authors.some(author =>
          author.name.toLowerCase().includes(search) ||
          author.email.toLowerCase().includes(search)
        ) ||
        abstract.keywords.some(keyword =>
          keyword.toLowerCase().includes(search)
        )
      );
    }
    return true;
  });

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

      <AbstractFilters filters={filters} onFilterChange={setFilters} />

      <div className="mb-4 grid grid-cols-4 gap-4">
        {[
          { label: 'Total', value: abstracts.length },
          { label: 'Submitted', value: abstracts.filter(a => a.status === 'submitted').length },
          { label: 'In Review', value: abstracts.filter(a => a.status === 'in_review').length },
          { label: 'Accepted', value: abstracts.filter(a => a.status === 'accepted').length }
        ].map(stat => (
          <div key={stat.label} className="bg-navy/30 backdrop-blur-md rounded-lg border border-white/10 p-4">
            <p className="text-white/70 text-sm">{stat.label}</p>
            <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <AbstractList
        abstracts={filteredAbstracts}
        onSelect={(abstract) => {
          navigate(`/occasions/${occasionId}/abstracts/${abstract.id}`);
        }}
      />
    </div>
  );
};

export default AbstractsPage;