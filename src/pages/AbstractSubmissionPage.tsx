import { useParams, useNavigate } from 'react-router-dom';
import { useAbstractStore } from '@/store/abstractStore';
import AbstractSubmissionFlow from '@/components/abstracts/AbstractSubmissionFlow';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';

const AbstractSubmissionPage = () => {
  const { occasionId } = useParams<{ occasionId: string }>();
  const navigate = useNavigate();
  const { isLoading, error } = useAbstractStore();

  const handleComplete = () => {
    navigate(`/occasions/${occasionId}/abstracts`);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold text-white mb-2">
          Submit Abstract
        </h1>
        <p className="text-lg text-white/70">
          Please complete the abstract submission form below
        </p>
      </div>

      <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 p-6">
        <AbstractSubmissionFlow 
          occasionId={parseInt(occasionId!, 10)}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
};

export default AbstractSubmissionPage;