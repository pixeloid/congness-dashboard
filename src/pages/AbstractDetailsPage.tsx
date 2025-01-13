import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAbstractStore } from '@/store/abstractStore';
import { useAbstractSubmissionStore } from '@/store/abstractSubmissionStore';
import { useAuthStore } from '@/store/authStore';
import ReviewList from '@/components/abstracts/ReviewList';
import ReviewForm from '@/components/abstracts/ReviewForm';
import ReviewDeadlineCountdown from '@/components/abstracts/ReviewDeadlineCountdown';
import AbstractStatusBadge from '@/components/abstracts/AbstractStatusBadge';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import { ArrowLeftIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import { InformationCircleIcon } from '@heroicons/react/16/solid';
import clsx from 'clsx';

const AbstractDetailsPage = () => {
  const { abstractId, occasionId } = useParams<{ abstractId: string; occasionId: string }>();
  const navigate = useNavigate();
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  const { user } = useAuthStore();
  const { process } = useAbstractSubmissionStore();
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
  const { actions: submissionActions } = useAbstractSubmissionStore();

  const abstract = abstracts.find(a => a.id === Number(abstractId));
  const userReview = reviews.find(r => r.reviewerId === user?.id);
  const isReviewDeadlinePassed = process?.reviewDeadline && new Date(process.reviewDeadline) < new Date();


  useEffect(() => {
    if (abstractId) {
      fetchReviews(parseInt(abstractId, 10));
      if (occasionId) {
        submissionActions.fetchSubmissionProcess(parseInt(occasionId, 10));
      }
    }
  }, [abstractId, occasionId, fetchReviews, submissionActions]);



  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!abstract) return <ErrorMessage message="Abstract not found" />;

  const isReviewer = user?.role === 'scientific_reviewer' || user?.role === 'chief_reviewer';
  const canReview = isReviewer &&
    abstract.status === 'in_review' &&
    !userReview &&
    !isReviewDeadlinePassed;

  const canMakeDecision = user?.role === 'chief_reviewer' &&
    abstract.status === 'in_review' &&
    reviews.length >= 2 &&
    isReviewDeadlinePassed;

  const handleReviewSubmit = async (data: any) => {
    try {
      await submitReview({
        ...data,
        abstractId: abstract.id,
        reviewerId: user!.id,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      });
      setIsReviewFormOpen(false);
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

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
            <div className="flex items-center gap-4 text-sm text-white/70">
              <span>
                Submitted: {format(new Date(abstract.submittedAt || ''), 'PPP', { locale: hu })}
              </span>
              {process?.reviewDeadline && (
                <ReviewDeadlineCountdown deadline={process.reviewDeadline} />
              )}
              <AbstractStatusBadge status={abstract.status} />
            </div>
          </div>
          {isReviewer && !isReviewFormOpen && (
            <button
              onClick={() => setIsReviewFormOpen(true)}
              className={clsx(
                "inline-flex items-center px-4 py-2 rounded-lg transition-colors",
                canReview
                  ? "bg-accent text-navy-dark hover:bg-accent-light"
                  : "bg-navy/50 text-white/50 cursor-not-allowed"
              )}
              disabled={!canReview}
            >
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              {userReview
                ? "Már bírálva"
                : isReviewDeadlinePassed
                  ? "Bírálati határidő lejárt"
                  : "Bírálat hozzáadása"}
            </button>
          )}
        </div>

        <div className="prose prose-invert max-w-none">
          <p>{abstract.description}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {abstract.keywords.map((keyword) => (
            <span
              key={keyword}
              className="px-2 py-1 text-sm bg-navy/50 text-white/70 rounded-lg"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* ... rest of the component remains the same until the reviews section ... */}

      <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-display font-semibold text-white">
            Bírálatok
          </h2>
        </div>

        {isReviewFormOpen ? (
          <div className="mb-6">
            <ReviewForm
              onSubmit={handleReviewSubmit}
            />
          </div>
        ) : null}

        <ReviewList
          reviews={reviews}
          currentUserId={user?.id}
          onSelect={() => {/* TODO: Implement review details/edit */ }}
        />
      </div>

      {canMakeDecision && (
        <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 p-6">
          <h2 className="text-2xl font-display font-semibold text-white mb-6">
            Végső döntés (Bírálati időszak lezárult)
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => makeDecision(abstract.id, 'accept', 'oral')}
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Elfogadás szóbeli előadásként
            </button>
            <button
              onClick={() => makeDecision(abstract.id, 'accept', 'poster')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Elfogadás poszterként
            </button>
            <button
              onClick={() => makeDecision(abstract.id, 'reject')}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Elutasítás
            </button>
          </div>
        </div>
      )}

      {user?.role === 'chief_reviewer' && !isReviewDeadlinePassed && (
        <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-4 text-white/70">
            <InformationCircleIcon className="h-5 w-5" />
            <p>Végső döntések csak a bírálati határidő lejárta után hozhatók.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AbstractDetailsPage;