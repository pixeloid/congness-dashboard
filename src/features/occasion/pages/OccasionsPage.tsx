import { PlusIcon } from '@heroicons/react/24/outline';
import { useOccasionService } from '@/features/occasion/hooks/queries/useOccasion';
import OccasionList from './OccasionList';

const OccasionsPage = () => {
  const createOccasion = useOccasionService.useCreate();

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Occasions</h1>
          <p className="text-lg text-white/70">Manage all occasions and events</p>
        </div>
        <button
          onClick={() => createOccasion.mutate({
            name: 'New Occasion',
            date_start: new Date().toISOString(),
            date_end: new Date().toISOString(),
            venue: {
              name: 'Jó helyszín',
              address: 'Budapest, Hungary',
              coordinates: { lat: 0, lng: 0 },
              photo: '',
              description: '',
              url: 'https://'
            },
            contact: {
              name: 'John Doe',
              email: 'john@doe.com',
            },
            type: 'conference' // Add the appropriate type value here
          })}
          className="inline-flex items-center px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          <span>New Occasion</span>
        </button>
      </div>

      <OccasionList />
    </div>
  );
}

export default OccasionsPage;