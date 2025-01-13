import React from 'react';
import { AbstractInvitation } from '@/types/abstractSubmission';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import clsx from 'clsx';

interface InvitationListProps {
  invitations: AbstractInvitation[];
  onResend: (id: number) => void;
}

const statusStyles = {
  pending: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
  accepted: 'bg-green-400/10 text-green-400 border-green-400/20',
  rejected: 'bg-red-400/10 text-red-400 border-red-400/20',
  expired: 'bg-gray-400/10 text-gray-400 border-gray-400/20'
};

const InvitationList: React.FC<InvitationListProps> = ({ invitations, onResend }) => {
  return (
    <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
.           <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Email</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Token</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Sent</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Expires</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-white/70">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {invitations.map((invitation) => (
              <tr key={invitation.id} className="hover:bg-white/5">
                <td className="px-6 py-4 text-white">{invitation.email}</td>
                <td className="px-6 py-4">
                  <span className={clsx(
                    'px-2 py-1 text-xs rounded-full border',
                    statusStyles[invitation.status]
                  )}>
                    {invitation.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-white/70">
                  {invitation.token}
                </td>
                <td className="px-6 py-4 text-white/70">
                  {format(new Date(invitation.invitedAt), 'PPP', { locale: hu })}
                </td>
                <td className="px-6 py-4 text-white/70">
                  {format(new Date(invitation.expiresAt), 'PPP', { locale: hu })}
                </td>
                <td className="px-6 py-4 text-right">
                  {invitation.status === 'pending' && (
                    <button
                      onClick={() => onResend(invitation.id)}
                      className="px-3 py-1 text-sm bg-accent/10 text-accent rounded hover:bg-accent/20"
                    >
                      Resend
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvitationList;