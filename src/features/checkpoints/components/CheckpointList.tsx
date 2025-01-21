import React, { Fragment, useState } from 'react';
import { Checkpoint } from '@/features/checkpoints/types/checkpoints';
import EntityList from '@/components/common/EntityList';
import CheckpointItem from './CheckpointItem';
import { useCheckpoint } from '@/features/checkpoints/hooks/queries/useCheckpoint';
import { useParams } from 'react-router-dom';
import CheckpointFilters from '@/features/checkpoints/components/CheckpointFilters';
import { Filters } from '@/services/ReactQueryService';

interface CheckpointListProps {
  onUpdate: (checkpoint: Checkpoint) => void;
  onDelete: (checkpoint: Checkpoint) => void;
}

const CheckpointList: React.FC<CheckpointListProps> = ({ onUpdate, onDelete }) => {
  const { occasionCode } = useParams<{ occasionCode: string }>();
  const [filters, setFilters] = useState<Filters>({});

  const renderItem = (checkpoint: Checkpoint) => (
    <CheckpointItem
      key={checkpoint['@id']}
      checkpoint={checkpoint}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );

  return (
    <Fragment>
      <CheckpointFilters filters={filters} onFilterChange={setFilters} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <EntityList
          useService={(filters) => useCheckpoint().useList(filters, `/api/occasions/${occasionCode}`)}
          renderItem={renderItem}
          filters={{}}
        />
      </div>
    </Fragment>
  );
};

export default CheckpointList;