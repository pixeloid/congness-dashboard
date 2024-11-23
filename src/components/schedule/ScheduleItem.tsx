import React, { useState, useRef, useEffect } from 'react';
import {
  UserGroupIcon,
  AcademicCapIcon,
  BeakerIcon,
  ClockIcon,
  CakeIcon,
  ChatBubbleLeftRightIcon,
  BuildingOffice2Icon,
  SparklesIcon,
  MusicalNoteIcon,
  DocumentDuplicateIcon,
  XMarkIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { ScheduleItem as ScheduleItemType } from '@/types/schedule';

interface ScheduleItemProps {
  item: ScheduleItemType;
  startTime?: Date;
  onRemove?: (id: string) => void;
  onUpdate?: (item: ScheduleItemType) => void;
}

const typeIcons = {
  meal: CakeIcon,
  break: ClockIcon,
  coffee: ClockIcon,
  lunch: CakeIcon,
  roundtable: ChatBubbleLeftRightIcon,
  workshop: BeakerIcon,
  assembly: BuildingOffice2Icon,
  optional: SparklesIcon,
  social: MusicalNoteIcon,
  session: AcademicCapIcon
};

const typeColors = {
  meal: 'bg-rose-400/10 border-rose-400/20 text-rose-400',
  break: 'bg-amber-400/10 border-amber-400/20 text-amber-400',
  coffee: 'bg-amber-400/10 border-amber-400/20 text-amber-400',
  lunch: 'bg-rose-400/10 border-rose-400/20 text-rose-400',
  roundtable: 'bg-blue-400/10 border-blue-400/20 text-blue-400',
  workshop: 'bg-purple-400/10 border-purple-400/20 text-purple-400',
  assembly: 'bg-emerald-400/10 border-emerald-400/20 text-emerald-400',
  optional: 'bg-indigo-400/10 border-indigo-400/20 text-indigo-400',
  social: 'bg-pink-400/10 border-pink-400/20 text-pink-400',
  session: 'bg-blue-400/10 border-blue-400/20 text-blue-400'
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('hu-HU', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

const ScheduleItem: React.FC<ScheduleItemProps> = ({ item, startTime, onRemove, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);
  const [editedDuration, setEditedDuration] = useState(item.duration);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const Icon = typeIcons[item.type] || AcademicCapIcon;
  const colorClasses = typeColors[item.type] || typeColors.session;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate?.({
      ...item,
      title: editedTitle,
      duration: parseInt(editedDuration.toString(), 10)
    });
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditedTitle(item.title);
      setEditedDuration(item.duration);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.(item.id);
  };

  return (
    <div className={clsx(
      'group p-3 rounded-lg border backdrop-blur-sm transition-all duration-200',
      'hover:shadow-lg touch-none select-none cursor-grab',
      colorClasses,
      { 'border-dashed': item.isTemplate }
    )}>
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Icon className="h-5 w-5 flex-shrink-0" />
          {item.isTemplate && (
            <DocumentDuplicateIcon className="h-3 w-3 absolute -right-1 -bottom-1 text-white/70" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-1">
              <input
                ref={inputRef}
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleSave}
                className="w-full px-1 py-0.5 bg-white/10 rounded text-sm"
              />
              <input
                type="number"
                value={editedDuration}
                onChange={(e) => setEditedDuration(parseInt(e.target.value, 10))}
                onKeyDown={handleKeyDown}
                onBlur={handleSave}
                className="w-20 px-1 py-0.5 bg-white/10 rounded text-xs"
                min="1"
                max="480"
              />
              <span className="text-xs ml-1">perc</span>
            </div>
          ) : (
            <>
              <p className="text-sm font-medium truncate">{item.title}</p>
              {startTime ? (
                <p className="text-xs opacity-70">
                  {formatTime(startTime)} - {formatTime(new Date(startTime.getTime() + item.duration * 60000))}
                </p>
              ) : (
                <p className="text-xs opacity-70">
                  {item.duration} perc
                </p>
              )}
            </>
          )}
        </div>
        {!item.isTemplate && !isEditing && (
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleEdit}
              className="p-1 rounded hover:bg-white/10 transition-colors"
            >
              <PencilIcon className="h-3 w-3" />
            </button>
            <button
              onClick={handleRemove}
              className="p-1 rounded hover:bg-white/10 transition-colors"
            >
              <XMarkIcon className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleItem;