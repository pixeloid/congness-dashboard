import React, { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

const PublicAbstractForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState([{ name: '', email: '', affiliation: '', isPresenting: false }]);
  const [keywords, setKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [content, setContent] = useState('');

  const addAuthor = () => {
    setAuthors([...authors, { name: '', email: '', affiliation: '', isPresenting: false }]);
  };

  const removeAuthor = (index) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };

  const updateAuthor = (index, field, value) => {
    const newAuthors = [...authors];
    newAuthors[index] = { ...newAuthors[index], [field]: value };
    setAuthors(newAuthors);
  };

  const addKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      authors,
      keywords,
      content
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Authors
          </label>
          <button
            type="button"
            onClick={addAuthor}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Author
          </button>
        </div>
        
        <div className="space-y-4">
          {authors.map((author, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between mb-4">
                <h4 className="font-medium text-gray-900">Author {index + 1}</h4>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeAuthor(index)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={author.name}
                  onChange={(e) => updateAuthor(index, 'name', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={author.email}
                  onChange={(e) => updateAuthor(index, 'email', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="Affiliation"
                  value={author.affiliation}
                  onChange={(e) => updateAuthor(index, 'affiliation', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`presenting-${index}`}
                    checked={author.isPresenting}
                    onChange={(e) => updateAuthor(index, 'isPresenting', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                  />
                  <label htmlFor={`presenting-${index}`} className="ml-2 text-sm text-gray-700">
                    Presenting Author
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Keywords
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center"
            >
              {keyword}
              <button
                type="button"
                onClick={() => removeKeyword(keyword)}
                className="ml-1 text-blue-600 hover:text-blue-700"
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
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Add keyword"
          />
          <button
            type="button"
            onClick={addKeyword}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Abstract Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Abstract
        </button>
      </div>
    </form>
  );
};

export default PublicAbstractForm;