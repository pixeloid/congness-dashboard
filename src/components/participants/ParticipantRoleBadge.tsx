import React from 'react';
import { Participant } from '@/types/participants';
import clsx from 'clsx';

interface ParticipantRoleBadgeProps {
  role: Participant['role'];
}

const roleStyles = {
  attendee: 'bg-gray-400/10 text-gray-400 border-gray-400/20',
  speaker: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
  organizer: 'bg-accent/10 text-accent border-accent/20',
  staff: 'bg-indigo-400/10 text-indigo-400 border-indigo-400/20',
};

const roleLabels = {
  attendee: 'Résztvevő',
  speaker: 'Előadó',
  organizer: 'Szervező',
  staff: 'Személyzet',
};

const ParticipantRoleBadge: React.FC<ParticipantRoleBadgeProps> = ({ role }) => {
  return (
    <span className={clsx(
      'px-2 py-1 rounded-full text-xs font-medium border',
      roleStyles[role]
    )}>
      {roleLabels[role]}
    </span>
  );
};

export default ParticipantRoleBadge;