import React from 'react';
import { ReviewStatus } from '@/features/abstract/types/abstract';
import clsx from 'clsx';

interface ReviewStatusBadgeProps {
  status: ReviewStatus;
}

const statusStyles = {
  pending: 'bg-gray-400/10 text-gray-400 border-gray-400/20',
  in_progress: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
  completed: 'bg-green-400/10 text-green-400 border-green-400/20',
  overdue: 'bg-red-400/10 text-red-400 border-red-400/20'
};

const statusLabels = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
  overdue: 'Overdue'
};

const ReviewStatusBadge: React.FC<ReviewStatusBadgeProps> = ({ status }) => {
  return (
    <span className={clsx(
      'px-2 py-1 text-sm rounded-full border',
      statusStyles[status]
    )}>
      {statusLabels[status]}
    </span>
  );
};

export default ReviewStatusBadge;