import React from 'react';
import DashboardGrid from '../components/dashboard/DashboardGrid';
import { dashboardSections } from '../data/dashboardData';

const DashboardPage = () => {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold text-white mb-2">Esemény Irányítópult</h1>
        <p className="text-lg text-white/70 mb-8">Üdvözöljük az eseménykezelő rendszerben</p>
      </div>
      
      <DashboardGrid sections={dashboardSections} />
    </div>
  );
};

export default DashboardPage;