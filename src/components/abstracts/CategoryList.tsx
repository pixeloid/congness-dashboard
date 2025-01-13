import React from 'react';
import { AbstractCategory } from '@/types/abstractSubmission';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface CategoryListProps {
  categories: AbstractCategory[];
  onEdit: (category: AbstractCategory) => void;
  onDelete: (id: number) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div 
          key={category.id}
          className="bg-navy/30 backdrop-blur-md rounded-lg border border-white/10 p-4"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-white">{category.name}</h3>
              <p className="text-sm text-white/70 mt-1">{category.description}</p>
              {category.maxWordCount && (
                <p className="text-sm text-white/70">
                  Max words: {category.maxWordCount}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(category)}
                className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete(category.id)}
                className="p-2 text-red-500/70 hover:text-red-500 rounded-lg hover:bg-red-500/10"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;