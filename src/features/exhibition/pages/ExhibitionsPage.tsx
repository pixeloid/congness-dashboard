import { useState } from 'react';
import { Exhibition } from '@/features/exhibition/types/exhibitions';
import EntityList from '@/components/common/EntityList';
import ExhibitionItem from '@/features/exhibition/components/ExhibitionItem';
import { useParams } from 'react-router-dom';
import ExhibitionFilters from '@/features/exhibition/components/ExhibitionFilters';
import { Filters } from '@/services/ReactQueryService';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useExhibition } from '@/features/exhibition/queries/useExhibition';

const ExhibitionsPage = () => {
  const { occasionCode } = useParams<{ occasionCode: string }>();
  const [filters, setFilters] = useState<Filters>({});

  const renderItem = (exhibition: Exhibition) => (
    <ExhibitionItem
      key={exhibition['@id']}
      exhibition={exhibition}
      onUpdate={() => { }}
      onDelete={() => { }}
    />
  );


  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Kiállítások</h1>
          <p className="text-lg text-white/70">Kiállítások és standok kezelése</p>
        </div>
        <button
          onClick={() => { }}
          className="inline-flex items-center px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          <span>Új Kiállítás</span>
        </button>
      </div>

      <ExhibitionFilters filters={filters} onFilterChange={setFilters} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <EntityList
          useService={(filters) => useExhibition().useList(filters, `/api/occasions/${occasionCode}`)}
          renderItem={renderItem}
          filters={filters}
        />
      </div>
    </div>
  );
};

export default ExhibitionsPage;