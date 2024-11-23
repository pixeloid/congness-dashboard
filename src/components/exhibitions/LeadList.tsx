import React from 'react';
import { LeadCapture } from '@/types/exhibitions';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';

interface LeadListProps {
  leads: LeadCapture[];
}

const LeadList: React.FC<LeadListProps> = ({ leads }) => {
  return (
    <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Résztvevő ID</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Megjegyzések</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Rögzítve</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Rögzítette</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-white/5">
                <td className="px-6 py-4 text-white">{lead.participantId}</td>
                <td className="px-6 py-4 text-white/70">{lead.notes}</td>
                <td className="px-6 py-4 text-white/70">
                  {format(new Date(lead.createdAt), 'yyyy. MM. dd. HH:mm', { locale: hu })}
                </td>
                <td className="px-6 py-4 text-white/70">{lead.capturedById}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadList;