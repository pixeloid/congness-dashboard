import React from 'react';
import { Participant } from '@/types/participants';
import clsx from 'clsx';

interface ParticipantStatusBadgeProps {
  status: Participant['status'];
}

const statusStyles = {
  registered: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
  confirmed: 'bg-green-400/10 text-green-400 border-green-400/20',
  cancelled: 'bg-red-400/10 text-red-400 border-red-400/20',
  attended: 'bg-purple-400/10 text-purple-400 border-purple-400/20',
};

const statusLabels = {
  registered: 'Regisztrált',
  confirmed: 'Visszaigazolt',
  cancelled: 'Lemondott',
  attended: 'Részt vett',
};

const ParticipantStatusBadge: React.FC<ParticipantStatusBadgeProps> = ({ status }) => {
  return (
    <span className={clsx(
      'px-2 py-1 rounded-full text-xs font-medium border',
      statusStyles[status]
    )}>
      {statusLabels[status]}
    </span>
  );
};

export default ParticipantStatusBadge;