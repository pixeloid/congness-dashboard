import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import Logo from '@/components/common/Logo';
import { PencilIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import { useOccasions } from '@/features/occasion/hooks/queries/useOccasion';

const OccasionSelectionPage = () => {
  const navigate = useNavigate();
  const { data: occasions, isLoading, error } = useOccasions();
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error instanceof Error ? error.message : 'Error loading occasions'} />;
  if (!occasions) return null;

  return (
    <div className="min-h-screen bg-background-dark p-8">
      <div className="max-w-6xl mx-auto">
        <Logo className="h-12 w-auto mb-12" />

        <h1 className="text-4xl font-display font-bold text-white mb-8">
          Válasszon eseményt
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {occasions.map((occasion) => (
            <button
              className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 p-6 text-left hover:border-accent/30 transition-all"
              key={occasion.id}
            >
              <div className="flex justify-between items-start">
                <div
                  onClick={() => navigate(`/occasions/${occasion.code}/dashboard`)}
                  className="flex-1"
                >
                  <h2 className="text-xl font-display font-semibold text-white mb-2">
                    {occasion.name}
                  </h2>
                  <p className="text-white/70 text-sm mb-4">
                    {occasion.subtitle}
                  </p>
                  <div className="text-sm text-white/50">
                    {format(new Date(occasion.startDate), 'yyyy. MMMM d.', { locale: hu })} -
                    {format(new Date(occasion.endDate), 'yyyy. MMMM d.', { locale: hu })}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/occasions/${occasion.code}/details`);
                  }}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OccasionSelectionPage;