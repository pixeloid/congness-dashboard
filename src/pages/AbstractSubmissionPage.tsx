import { useParams, useNavigate } from 'react-router-dom';
import AbstractForm from '@/components/abstracts/AbstractForm';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useAbstractStore } from '@/store/abstractStore';

const AbstractSubmissionPage = () => {
  const { occasionId } = useParams<{ occasionId: string }>();
  const navigate = useNavigate();

  const { isLoading, error, actions } = useAbstractStore();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-6 space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-white/70 hover:text-white"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        <span>Vissza az absztraktokhoz</span>
      </button>

      <div>
        <h1 className="text-4xl font-display font-bold text-white mb-2">
          Új Absztrakt Beküldése
        </h1>
        <p className="text-lg text-white/70">
          Töltse ki az alábbi űrlapot az absztrakt beküldéséhez
        </p>
      </div>

      <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 p-6">
        <AbstractForm
          onSubmit={(data) => {
            actions.submitAbstract({
              ...data,
              submitterId: 1, // TODO: Get from auth context
              occasionId: parseInt(occasionId!, 10)
            });
            navigate(-1);
          }}
        />
      </div>
    </div>
  );
};

export default AbstractSubmissionPage;