import React, { useState } from 'react';
import { AbstractCategory } from '@/types/abstractSubmission';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (category: Omit<AbstractCategory, 'id'>) => void;
  initialData?: AbstractCategory;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [maxWordCount, setMaxWordCount] = useState(initialData?.maxWordCount?.toString() || '');
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      maxWordCount: maxWordCount ? parseInt(maxWordCount) : undefined,
      isActive
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative bg-navy-light rounded-xl shadow-xl w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">
              {initialData ? 'Edit Category' : 'New Category'}
            </h3>
            <button onClick={onClose} className="text-white/70 hover:text-white">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">
                Max Word Count
              </label>
              <input
                type="number"
                value={maxWordCount}
                onChange={(e) => setMaxWordCount(e.target.value)}
                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="h-4 w-4 rounded border-white/10 bg-navy/30 text-accent"
              />
              <label htmlFor="isActive" className="ml-2 text-sm text-white/70">
                Active
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-white/70 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light"
              >
                {initialData ? 'Save Changes' : 'Create Category'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;