import React from 'react';
import DashboardCard from './DashboardCard';
import { DashboardSection } from '@/types/dashboard';

interface DashboardGridProps {
  sections: DashboardSection[];
}

const DashboardGrid: React.FC<DashboardGridProps> = ({ sections }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sections.map((section) => (
        <DashboardCard key={section.id} {...section} />
      ))}
    </div>
  );
};

export default DashboardGrid;