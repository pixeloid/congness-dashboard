import React from 'react';
import { useExhibitionsStore } from '@/store/exhibitionsStore';
import ExhibitionCard from '@/components/exhibitions/ExhibitionCard';
import ExhibitionFilters from '@/components/exhibitions/ExhibitionFilters';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import { PlusIcon } from '@heroicons/react/24/outline';

const ExhibitionsPage = () => {
  const { 
    exhibitions, 
    filters,
    isLoading, 
    error,
    actions: {
      setFilters,
      addExhibition
    }
  } = useExhibitionsStore();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Kiállítások</h1>
          <p className="text-lg text-white/70">Kiállítások és standok kezelése</p>
        </div>
        <button 
          onClick={() => addExhibition()}
          className="inline-flex items-center px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          <span>Új Kiállítás</span>
        </button>
      </div>

      <ExhibitionFilters filters={filters} onFilterChange={setFilters} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {exhibitions.map((exhibition) => (
          <ExhibitionCard
            key={exhibition.id}
            exhibition={exhibition}
          />
        ))}
      </div>
    </div>
  );
};

export default ExhibitionsPage;