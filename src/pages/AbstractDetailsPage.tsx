import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAbstractStore } from '@/store/abstractStore';
import { useAuthStore } from '@/store/authStore';
import ReviewList from '@/components/abstracts/ReviewList';
import ReviewForm from '@/components/abstracts/ReviewForm';
import AbstractStatusBadge from '@/components/abstracts/AbstractStatusBadge';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';

const AbstractDetailsPage = () => {
  const { abstractId } = useParams<{ abstractId: string }>();
  const navigate = useNavigate();
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  const { user } = useAuthStore();
  const {
    abstracts,
    reviews,
    isLoading,
    error,
    actions: {
      fetchReviews,
      submitReview,
      makeDecision
    }
  } = useAbstractStore();

  const abstract = abstracts.find(a => a.id === Number(abstractId));

  useEffect(() => {
    if (abstractId) {
      fetchReviews(parseInt(abstractId, 10));
    }
  }, [abstractId, fetchReviews]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!abstract) return <ErrorMessage message="Abstract not found" />;

  const canReview = user?.role === 'event_manager';
  const canMakeDecision = user?.role === 'event_manager' && abstract.status === 'in_review';

  return (
    <div className="p-6 space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-white/70 hover:text-white"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        <span>Vissza az absztraktokhoz</span>
      </button>

      <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">
              {abstract.title}
            </h1>
            <div className="flex items-center gap-4 text-white/70">
              <AbstractStatusBadge status={abstract.status} />
              <span>
                Beküldve: {format(new Date(abstract.submittedAt!), 'PPP', { locale: hu })}
              </span>
            </div>
          </div>
        </div>

        <div className="prose prose-invert max-w-none mb-6">
          <div dangerouslySetInnerHTML={{ __html: abstract.description }} />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {abstract.keywords.map((keyword) => (
            <span
              key={keyword}
              className="px-2 py-1 text-sm bg-navy/50 text-white/70 rounded-lg"
            >
              {keyword}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {abstract.authors.map((author) => (
            <div
              key={author.id}
              className="p-4 bg-navy/30 rounded-lg border border-white/10"
            >
              <p className="text-white font-medium">{author.name}</p>
              <p className="text-white/70 text-sm">{author.email}</p>
              <p className="text-white/70 text-sm">{author.affiliation}</p>
              {author.isPresenting && (
                <span className="mt-2 inline-block px-2 py-1 text-xs bg-accent/10 text-accent rounded-full">
                  Presenting Author
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-display font-semibold text-white">
            Reviews
          </h2>
          {canReview && !isReviewFormOpen && (
            <button
              onClick={() => setIsReviewFormOpen(true)}
              className="px-4 py-2 bg-accent text-navy-dark rounded-lg"
            >
              Add Review
            </button>
          )}
        </div>

        {isReviewFormOpen ? (
          <div className="mb-6">
            <ReviewForm
              onSubmit={(data) => {
                submitReview({
                  ...data,
                  abstractId: abstract.id,
                  reviewerId: user!.id,
                  deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
                });
                setIsReviewFormOpen(false);
              }}
            />
          </div>
        ) : null}

        <ReviewList
          reviews={reviews}
          onSelect={() => {/* TODO: Implement review details/edit */ }}
        />
      </div>

      {canMakeDecision && (
        <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 p-6">
          <h2 className="text-2xl font-display font-semibold text-white mb-6">
            Final Decision
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => makeDecision(abstract.id, 'accept', 'oral')}
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Accept as Oral
            </button>
            <button
              onClick={() => makeDecision(abstract.id, 'accept', 'poster')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Accept as Poster
            </button>
            <button
              onClick={() => makeDecision(abstract.id, 'reject')}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AbstractDetailsPage;