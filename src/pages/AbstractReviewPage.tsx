import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAbstractStore } from '@/store/abstractStore';
import ReviewForm from '@/components/abstracts/ReviewForm';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const AbstractReviewPage = () => {
  const { abstractId } = useParams<{ abstractId: string }>();
  const navigate = useNavigate();
  
  const { abstracts, isLoading, error, actions } = useAbstractStore();
  const abstract = abstracts.find(a => a.id === Number(abstractId));

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!abstract) return <ErrorMessage message="Abstract not found" />;

  return (
    <div className="p-6 space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-white/70 hover:text-white"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        <span>Vissza az absztrakthoz</span>
      </button>

      <div>
        <h1 className="text-4xl font-display font-bold text-white mb-2">
          Bírálat Írása
        </h1>
        <p className="text-lg text-white/70">
          {abstract.title}
        </p>
      </div>

      <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 p-6">
        <ReviewForm
          onSubmit={(data) => {
            actions.submitReview({
              ...data,
              abstractId: abstract.id,
              reviewerId: 1, // TODO: Get from auth context
              deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
            });
            navigate(-1);
          }}
        />
      </div>
    </div>
  );
};

export default AbstractReviewPage;