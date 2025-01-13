import React from 'react';
import { Review } from '@/types/abstract';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import ReviewStatusBadge from './ReviewStatusBadge';
import clsx from 'clsx';

interface ReviewListProps {
  reviews: Review[];
  currentUserId?: number;
  onSelect: (review: Review) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, currentUserId, onSelect }) => {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className={clsx(
            "p-6 bg-navy/30 backdrop-blur-md rounded-xl border transition-all cursor-pointer",
            review.reviewerId === currentUserId
              ? "border-accent/30 bg-accent/5"
              : "border-white/10 hover:border-accent/30"
          )}
          onClick={() => onSelect(review)}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-4 mb-2">
                {review.reviewerId === currentUserId && (
                  <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full border border-accent/20">
                    Your Review
                  </span>
                )}
                <span className="text-xl font-display font-semibold text-white">
                  Rating: {review.rating}/10
                </span>
                <ReviewStatusBadge status={review.status} />
              </div>
              <div className="flex items-center gap-4 text-sm text-white/70">
                <span>
                  Assigned: {format(new Date(review.assignedAt), 'PPP', { locale: hu })}
                </span>
                <span>
                  Due: {format(new Date(review.deadline), 'PPP', { locale: hu })}
                </span>
                {review.completedAt && (
                  <span>
                    Completed: {format(new Date(review.completedAt), 'PPP', { locale: hu })}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: review.comments }} />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="text-white/70">Recommendation:</span>
            <span className={clsx(
              'px-2 py-1 text-sm rounded-full',
              {
                'bg-green-400/10 text-green-400': review.recommendation === 'accept',
                'bg-red-400/10 text-red-400': review.recommendation === 'reject',
                'bg-yellow-400/10 text-yellow-400': review.recommendation === 'revise'
              }
            )}>
              {review.recommendation.charAt(0).toUpperCase() + review.recommendation.slice(1)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;