import React from 'react';
import { AbstractStatus } from '@/types/abstract';
import clsx from 'clsx';

interface AbstractStatusBadgeProps {
  status: AbstractStatus;
}

const statusStyles = {
  draft: 'bg-gray-400/10 text-gray-400 border-gray-400/20',
  submitted: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
  in_review: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
  accepted: 'bg-green-400/10 text-green-400 border-green-400/20',
  rejected: 'bg-red-400/10 text-red-400 border-red-400/20'
};

const statusLabels = {
  draft: 'Vázlat',
  submitted: 'Beadva',
  in_review: 'Bírálat alatt',
  accepted: 'Elfogadva',
  rejected: 'Elutasítva'
};

const AbstractStatusBadge: React.FC<AbstractStatusBadgeProps> = ({ status }) => {
  return (
    <span className={clsx(
      'px-2 py-1 text-sm rounded-full border',
      statusStyles[status]
    )}>
      {statusLabels[status]}
    </span>
  );
};

export default AbstractStatusBadge;