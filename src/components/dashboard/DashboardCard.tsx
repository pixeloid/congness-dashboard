import React from 'react';
import { DashboardSection } from '@/types/dashboard';
import StatsDisplay from './StatsDisplay';
import ActionButton from '../common/ActionButton';

const DashboardCard: React.FC<DashboardSection> = ({ 
  title, 
  description, 
  icon: Icon, 
  stats, 
  actions 
}) => {
  return (
    <div className="bg-navy/30 backdrop-blur-md rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 p-6 border border-white/10">
      <div className="flex items-center space-x-4 mb-4">
        {Icon && <Icon className="h-8 w-8 text-accent" />}
        <h3 className="text-xl font-display font-semibold text-white">{title}</h3>
      </div>
      <p className="text-white/70 mb-4 leading-relaxed">{description}</p>
      
      {stats && <StatsDisplay stats={stats} />}
      
      {actions && (
        <div className="mt-6 space-y-2">
          {actions.map((action, index) => (
            <ActionButton key={index} {...action} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardCard;