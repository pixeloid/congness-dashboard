import { IconType } from 'react-icons';

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
  icon: IconType;
  stats?: DashboardStat[];
  actions?: DashboardAction[];
  description: string;
}