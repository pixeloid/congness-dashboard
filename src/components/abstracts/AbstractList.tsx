import React from 'react';
import { Abstract } from '@/types/abstract';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import AbstractStatusBadge from './AbstractStatusBadge';
import { useAbstractSubmissionStore } from '@/store/abstractSubmissionStore';
import clsx from 'clsx';

interface AbstractListProps {
  abstracts: Abstract[];
  onSelect: (abstract: Abstract) => void;
}

const AbstractList: React.FC<AbstractListProps> = ({ abstracts, onSelect }) => {
  const { invitations } = useAbstractSubmissionStore();

  const getInvitationDetails = (abstract: Abstract) => {
    const invitation = invitations.find(i => i.email === abstract.authors[0].email);
    if (!invitation) return null;
    return invitation;
  };

  return (
    <div className="space-y-4">
      {abstracts.map((abstract) => {
        const invitation = getInvitationDetails(abstract);

        return (
          <div
            key={abstract.id}
            className="p-6 bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 hover:border-accent/30 transition-all cursor-pointer"
            onClick={() => onSelect(abstract)}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-display font-semibold text-white mb-2">
                  {abstract.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-white/70">
                  <span>
                    Submitted: {format(new Date(abstract.submittedAt!), 'PPP', { locale: hu })}
                  </span>
                  <AbstractStatusBadge status={abstract.status} />
                </div>
              </div>
            </div>

            {invitation && (
              <div className="mb-4 p-3 bg-navy/50 rounded-lg border border-white/10">
                <h4 className="text-sm font-medium text-white mb-2">Invitation Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white/70">Status</p>
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
                    <p className="text-white/70">Invited At</p>
                    <p className="text-white mt-1">
                      {format(new Date(invitation.invitedAt), 'PPP', { locale: hu })}
                    </p>
                  </div>
                  {invitation.respondedAt && (
                    <div>
                      <p className="text-white/70">Responded At</p>
                      <p className="text-white mt-1">
                        {format(new Date(invitation.respondedAt), 'PPP', { locale: hu })}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-white/70">Expires At</p>
                    <p className="text-white mt-1">
                      {format(new Date(invitation.expiresAt), 'PPP', { locale: hu })}
                    </p>
                  </div>
                </div>
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

            <div className="flex flex-wrap gap-4">
              {abstract.authors.map((author) => (
                <div key={author.id} className="text-sm">
                  <p className="text-white font-medium">{author.name}</p>
                  <p className="text-white/70">{author.affiliation}</p>
                  {author.isPresenting && (
                    <span className="text-xs text-accent">Presenting Author</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AbstractList;