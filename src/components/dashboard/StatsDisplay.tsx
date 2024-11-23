import React from 'react';
import { DashboardStat } from '@/types/dashboard';

interface StatsDisplayProps {
  stats: DashboardStat[];
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-2">
      {stats.map((stat, index) => (
        <div key={index} className="text-center p-4 bg-navy/50 rounded-lg border border-white/10 hover:border-accent/30 transition-colors">
          <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
          <p className="text-sm font-medium text-white/70 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsDisplay;