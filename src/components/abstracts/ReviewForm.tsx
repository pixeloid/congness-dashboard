import React, { useState } from 'react';

interface ReviewFormProps {
  onSubmit: (data: {
    rating: number;
    comments: string;
    recommendation: 'accept' | 'reject' | 'revise';
  }) => void;
  initialData?: {
    rating: number;
    comments: string;
    recommendation: 'accept' | 'reject' | 'revise';
  };
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, initialData }) => {
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [comments, setComments] = useState(initialData?.comments || '');
  const [recommendation, setRecommendation] = useState<'accept' | 'reject' | 'revise'>(
    initialData?.recommendation || 'accept'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      rating,
      comments,
      recommendation
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-white/70 mb-1">Értékelés (1-10)</label>
        <input
          type="number"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/70 mb-1">Megjegyzések</label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows={10}
          className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white resize-y"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/70 mb-1">Javaslat</label>
        <select
          value={recommendation}
          onChange={(e) => setRecommendation(e.target.value as 'accept' | 'reject' | 'revise')}
          className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
          required
        >
          <option value="accept">Elfogadás</option>
          <option value="reject">Elutasítás</option>
          <option value="revise">Átdolgozás</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light"
        >
          Bírálat beküldése
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;