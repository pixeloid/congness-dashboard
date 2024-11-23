export interface ScheduleItem {
  id: string;
  description?: string;
  title: string;
  duration: number;
  type: ScheduleItemType;
  isTemplate?: boolean;
  items?: ScheduleItem[];
}

type ScheduleItemType = 'meal' | 'break' | 'coffee' | 'lunch' | 'roundtable' | 'workshop' |
  'assembly' | 'optional' | 'social' | 'session';


export interface Section {
  id: string;
  title: string;
  description?: string;
  type: ScheduleItemType;
  duration: number;
  chairs?: string;
  items: ScheduleItem[];
}

export interface Track {
  id: string;
  title: string;
  presentations: ScheduleItem[];
  sections: Section[];
}

export interface Day {
  id: string;
  date: Date;
  startTime: Date;
  tracks: Track[];
}

export interface DraggableItemProps {
  item: ScheduleItem;
  startTime?: Date;
  trackId?: string;
  sectionId?: string;
  onRemove?: (id: string) => void;
  onUpdate?: (item: ScheduleItem) => void;
}