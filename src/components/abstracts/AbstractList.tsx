import React from 'react';
import { Abstract } from '@/types/abstract';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import AbstractStatusBadge from './AbstractStatusBadge';

interface AbstractListProps {
  abstracts: Abstract[];
  onSelect: (abstract: Abstract) => void;
}

const AbstractList: React.FC<AbstractListProps> = ({ abstracts, onSelect }) => {
  return (
    <div className="space-y-4">
      {abstracts.map((abstract) => (
        <div
          key={abstract.id}
          className="p-6 bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 hover:border-accent/30 transition-all cursor-pointer"
          onClick={() => onSelect(abstract)}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-display font-semibold text-white mb-2">
                {abstract.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-white/70">
                <span>
                  Submitted: {format(new Date(abstract.submittedAt!), 'PPP', { locale: hu })}
                </span>
                <AbstractStatusBadge status={abstract.status} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {abstract.keywords.map((keyword) => (
              <span
                key={keyword}
                className="px-2 py-1 text-sm bg-navy/50 text-white/70 rounded-lg"
              >
                {keyword}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            {abstract.authors.map((author) => (
              <div key={author.id} className="text-sm">
                <p className="text-white font-medium">{author.name}</p>
                <p className="text-white/70">{author.affiliation}</p>
                {author.isPresenting && (
                  <span className="text-xs text-accent">Presenting Author</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AbstractList;