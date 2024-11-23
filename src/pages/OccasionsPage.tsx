import React from 'react';
import { useOccasionsStore } from '@/store/occasionsStore';
import OccasionCard from '@/components/occasions/OccasionCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import { PlusIcon } from '@heroicons/react/24/outline';

const OccasionsPage = () => {
  const { occasions, isLoading, error } = useOccasionsStore();

  const handleEdit = (id: number) => {
    console.log('Edit occasion:', id);
  };

  const handleDetails = (id: number) => {
    console.log('View details:', id);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Események Kezelése</h1>
          <p className="text-lg text-white/70">Konferenciák és események áttekintése</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light transition-colors">
          <PlusIcon className="h-5 w-5 mr-2" />
          <span>Új Esemény</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {occasions.map((occasion) => (
          <OccasionCard
            key={occasion.id}
            occasion={occasion}
            onEdit={handleEdit}
            onDetails={handleDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default OccasionsPage;