import React from 'react';
import { ExhibitionStaff } from '@/features/exhibition/types/exhibitions';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface StaffListProps {
  staff: ExhibitionStaff[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, updates: Partial<ExhibitionStaff>) => void;
}

const StaffList: React.FC<StaffListProps> = ({ staff, onDelete, onUpdate }) => {
  return (
    <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Név</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Email</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-white/70">Műveletek</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {staff.map((member) => (
              <tr key={member.id} className="hover:bg-white/5">
                <td className="px-6 py-4 text-white">{member.name}</td>
                <td className="px-6 py-4 text-white/70">{member.email}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => onUpdate(member.id, {})}
                    className="px-3 py-1 text-sm bg-accent/10 text-accent rounded hover:bg-accent/20 transition-colors"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(member.id)}
                    className="px-3 py-1 text-sm bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 transition-colors"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffList;