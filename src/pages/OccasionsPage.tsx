import { useNavigate } from 'react-router-dom';
import { useOccasionsStore } from '@/store/occasionsStore';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import { PlusIcon, PencilIcon, MapPinIcon } from '@heroicons/react/24/outline';

const OccasionsPage = () => {
  const navigate = useNavigate();
  const { occasions, isLoading, error, actions } = useOccasionsStore();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Occasions</h1>
          <p className="text-lg text-white/70">Manage all occasions and events</p>
        </div>
        <button
          onClick={() => actions.addOccasion({
            name: 'New Occasion',
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
            venue: {
              name: '',
              address: '',
              coordinates: { lat: 0, lng: 0 },
              photo: '',
              description: '',
              url: 'https://'
            },
            contact: {
              name: '',
              email: ''
            }
          })}
          className="inline-flex items-center px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          <span>New Occasion</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {occasions.map((occasion) => (
          <div
            key={occasion.id}
            className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 p-6"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h2 className="text-xl font-display font-semibold text-white">
                  {occasion.name}
                </h2>
                {occasion.subtitle && (
                  <p className="text-white/70">{occasion.subtitle}</p>
                )}
                <div className="flex items-center gap-4 text-sm text-white/50">
                  <span>
                    {format(new Date(occasion.startDate), 'yyyy. MMMM d.', { locale: hu })} -
                    {format(new Date(occasion.endDate), 'yyyy. MMMM d.', { locale: hu })}
                  </span>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{occasion.venue.name}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate(`/occasions/${occasion.id}/details`)}
                  className="inline-flex items-center px-4 py-2 bg-navy/50 text-white rounded-lg border border-white/10 hover:border-accent/30 transition-colors"
                >
                  <PencilIcon className="h-5 w-5 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => navigate(`/occasions/${occasion.id}/dashboard`)}
                  className="px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light transition-colors"
                >
                  Open Dashboard
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OccasionsPage;