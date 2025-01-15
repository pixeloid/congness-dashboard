import React, { useState } from 'react';
import { Author } from '@/features/abstract/types/abstract';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';

interface AbstractFormProps {
  onSubmit: (data: {
    title: string;
    description: string;
    keywords: string[];
    authors: Author[];
  }) => void;
  initialData?: {
    title: string;
    description: string;
    keywords: string[];
    authors: Author[];
  };
}

const AbstractForm: React.FC<AbstractFormProps> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [keywords, setKeywords] = useState<string[]>(initialData?.keywords || []);
  const [authors, setAuthors] = useState<Author[]>(initialData?.authors || []);
  const [newKeyword, setNewKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      keywords,
      authors
    });
  };

  const addKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const addAuthor = () => {
    setAuthors([
      ...authors,
      {
        id: authors.length + 1,
        name: '',
        email: '',
        affiliation: '',
        isPresenting: false
      }
    ]);
  };

  const updateAuthor = (index: number, updates: Partial<Author>) => {
    const newAuthors = [...authors];
    newAuthors[index] = { ...newAuthors[index], ...updates };
    setAuthors(newAuthors);
  };

  const removeAuthor = (index: number) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-white/70 mb-1">
          Abstract Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/70 mb-1">
          Abstract Content
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={10}
          className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white resize-y"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/70 mb-1">
          Keywords
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="px-2 py-1 bg-navy/30 rounded-lg text-white flex items-center gap-2"
            >
              {keyword}
              <button
                type="button"
                onClick={() => removeKeyword(keyword)}
                className="text-white/50 hover:text-white"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            className="flex-1 px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
            placeholder="Add keyword"
          />
          <button
            type="button"
            onClick={addKeyword}
            className="px-4 py-2 bg-accent text-navy-dark rounded-lg"
          >
            Add
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-white/70">
            Authors
          </label>
          <button
            type="button"
            onClick={addAuthor}
            className="flex items-center gap-1 text-sm text-accent hover:text-accent-light"
          >
            <PlusIcon className="h-4 w-4" />
            Add Author
          </button>
        </div>
        <div className="space-y-4">
          {authors.map((author, index) => (
            <div key={author.id} className="p-4 bg-navy/30 rounded-lg">
              <div className="flex justify-between mb-4">
                <h4 className="text-white font-medium">Author {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeAuthor(index)}
                  className="text-white/50 hover:text-white"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={author.name}
                  onChange={(e) => updateAuthor(index, { name: e.target.value })}
                  placeholder="Name"
                  className="px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
                  required
                />
                <input
                  type="email"
                  value={author.email}
                  onChange={(e) => updateAuthor(index, { email: e.target.value })}
                  placeholder="Email"
                  className="px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
                  required
                />
                <input
                  type="text"
                  value={author.affiliation}
                  onChange={(e) => updateAuthor(index, { affiliation: e.target.value })}
                  placeholder="Affiliation"
                  className="px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
                  required
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`presenting-${author.id}`}
                    checked={author.isPresenting}
                    onChange={(e) => updateAuthor(index, { isPresenting: e.target.checked })}
                    className="h-4 w-4 rounded border-white/10 bg-navy/30 text-accent"
                  />
                  <label htmlFor={`presenting-${author.id}`} className="ml-2 text-white/70">
                    Presenting Author
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light"
        >
          Submit Abstract
        </button>
      </div>
    </form>
  );
};

export default AbstractForm;