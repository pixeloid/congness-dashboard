import { ComponentType } from 'react';
import { IconProps } from '@heroicons/react/24/outline';

export interface DashboardStat {
  label: string;
  value: string;
}

export interface DashboardAction {
  label: string;
  onClick: () => void;
  primary?: boolean;
}

export interface DashboardSection {
  id: string;
  title: string;
  description: string;
  icon: ComponentType<IconProps>;
  stats?: DashboardStat[];
  actions?: DashboardAction[];
}