import React, { useState } from 'react';
import { Abstract } from '@/types/abstract';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import AbstractStatusBadge from './AbstractStatusBadge';
import { useAbstractSubmissionStore } from '@/store/abstractSubmissionStore';
import { useAbstractStore } from '@/store/abstractStore';
import ReviewDeadlineCountdown from './ReviewDeadlineCountdown';
import { ChevronDownIcon, ChevronUpIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import clsx from 'clsx';

interface AbstractListProps {
  abstracts: Abstract[];
  onSelect: (abstract: Abstract) => void;
}

const AbstractList: React.FC<AbstractListProps> = ({ abstracts, onSelect }) => {
  const { invitations } = useAbstractSubmissionStore();
  const { reviews } = useAbstractStore();
  const { process } = useAbstractSubmissionStore();
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const getInvitationDetails = (abstract: Abstract) => {
    const invitation = invitations.find(i => i.email === abstract.authors[0].email);
    if (!invitation) return null;
    return invitation;
  };

  const getReviewSummary = (abstractId: number) => {
    const abstractReviews = reviews.filter(r => r.abstractId === abstractId);
    if (abstractReviews.length === 0) return null;

    const avgRating = abstractReviews.reduce((sum, r) => sum + r.rating, 0) / abstractReviews.length;
    const recommendations = abstractReviews.reduce((acc, r) => {
      acc[r.recommendation] = (acc[r.recommendation] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalReviews: abstractReviews.length,
      avgRating,
      recommendations,
      completed: abstractReviews.filter(r => r.status === 'completed').length,
      pending: abstractReviews.filter(r => r.status === 'pending').length,
      overdue: abstractReviews.filter(r => r.status === 'overdue').length
    };
  };

  const toggleExpand = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      {abstracts.map((abstract) => {
        const invitation = getInvitationDetails(abstract);
        const isExpanded = expandedIds.includes(abstract.id);
        const reviewSummary = getReviewSummary(abstract.id);

        return (
          <div
            key={abstract.id}
            className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 hover:border-accent/30 transition-all cursor-pointer"
            onClick={() => onSelect(abstract)}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-display font-semibold text-white mb-2">
                      {abstract.title}
                    </h3>
                    <button
                      onClick={(e) => toggleExpand(abstract.id, e)}
                      className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronUpIcon className="h-5 w-5" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-white/70">
                    <span>
                      Submitted: {format(new Date(abstract.submittedAt || ''), 'PPP', { locale: hu })}
                    </span>
                    {process?.reviewDeadline && abstract.status === 'in_review' && (
                      <ReviewDeadlineCountdown deadline={process.reviewDeadline} />
                    )}
                    <AbstractStatusBadge status={abstract.status} />
                    {abstract.presentationType && (
                      <span className={clsx(
                        'px-2 py-1 text-xs rounded-full border',
                        abstract.presentationType === 'oral'
                          ? 'bg-blue-400/10 text-blue-400 border-blue-400/20'
                          : 'bg-purple-400/10 text-purple-400 border-purple-400/20'
                      )}>
                        {abstract.presentationType.charAt(0).toUpperCase() + abstract.presentationType.slice(1)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {reviewSummary && (
                <div className="mb-4 p-4 bg-navy/50 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-white">Bírálatok összegzése</h4>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        star <= Math.round(reviewSummary.avgRating / 2) ? (
                          <StarIconSolid key={star} className="h-4 w-4 text-yellow-400" />
                        ) : (
                          <StarIcon key={star} className="h-4 w-4 text-yellow-400/50" />
                        )
                      ))}
                      <span className="ml-2 text-sm text-white/70">
                        {reviewSummary.avgRating.toFixed(1)}/10
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-white/70 text-sm">Összes bírálat</p>
                      <p className="text-white font-medium">{reviewSummary.totalReviews}</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Befejezve</p>
                      <p className="text-green-400 font-medium">{reviewSummary.completed}</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Folyamatban</p>
                      <p className="text-yellow-400 font-medium">{reviewSummary.pending}</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Lejárt</p>
                      <p className="text-red-400 font-medium">{reviewSummary.overdue}</p>
                    </div>
                  </div>

                  {Object.keys(reviewSummary.recommendations).length > 0 && (
                    <div className="flex gap-3">
                      {Object.entries(reviewSummary.recommendations).map(([key, count]) => (
                        <div
                          key={key}
                          className={clsx(
                            'px-2 py-1 rounded-lg text-xs',
                            {
                              'bg-green-400/10 text-green-400': key === 'accept',
                              'bg-red-400/10 text-red-400': key === 'reject',
                              'bg-yellow-400/10 text-yellow-400': key === 'revise'
                            }
                          )}
                        >
                          {key.charAt(0).toUpperCase() + key.slice(1)}: {count}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {abstract.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-2 py-1 text-sm bg-navy/50 text-white/70 rounded-lg"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              {isExpanded && (
                <>
                  {invitation && (
                    <div className="mb-4 p-3 bg-navy/50 rounded-lg border border-white/10">
                      <h4 className="text-sm font-medium text-white mb-2">Meghívó részletei</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-white/70">Státusz</p>
                          <span className={clsx(
                            'inline-block px-2 py-1 mt-1 text-xs rounded-full border',
                            {
                              'bg-yellow-400/10 text-yellow-400 border-yellow-400/20': invitation.status === 'pending',
                              'bg-green-400/10 text-green-400 border-green-400/20': invitation.status === 'accepted',
                              'bg-red-400/10 text-red-400 border-red-400/20': invitation.status === 'rejected',
                              'bg-gray-400/10 text-gray-400 border-gray-400/20': invitation.status === 'expired'
                            }
                          )}>
                            {invitation.status.charAt(0).toUpperCase() + invitation.status.slice(1)}
                          </span>
                        </div>
                        <div>
                          <p className="text-white/70">Meghívás időpontja</p>
                          <p className="text-white mt-1">
                            {format(new Date(invitation.invitedAt), 'PPP', { locale: hu })}
                          </p>
                        </div>
                        {invitation.respondedAt && (
                          <div>
                            <p className="text-white/70">Válasz időpontja</p>
                            <p className="text-white mt-1">
                              {format(new Date(invitation.respondedAt), 'PPP', { locale: hu })}
                            </p>
                          </div>
                        )}
                        <div>
                          <p className="text-white/70">Lejárat időpontja</p>
                          <p className="text-white mt-1">
                            {format(new Date(invitation.expiresAt), 'PPP', { locale: hu })}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {abstract.authors.map((author) => (
                      <div key={author.id} className="p-4 bg-navy/50 rounded-lg border border-white/10">
                        <p className="text-white font-medium">{author.name}</p>
                        <p className="text-white/70 text-sm">{author.email}</p>
                        <p className="text-white/70 text-sm">{author.affiliation}</p>
                        {author.isPresenting && (
                          <span className="mt-2 inline-block px-2 py-1 text-xs bg-accent/10 text-accent rounded-full">
                            Előadó szerző
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AbstractList;