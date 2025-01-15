import { useParams } from 'react-router-dom';
import { useOccasionsStore } from '@/features/occasion/store/occasionsStore';
import OccasionEditor from '@/features/occasion/components/OccasionEditor';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';

const OccasionDetailsPage = () => {
    const { occasionId } = useParams<{ occasionId: string }>();
    const { occasions, isLoading, error } = useOccasionsStore();
    const { actions } = useOccasionsStore();

    const occasion = occasions.find(o => o.id === parseInt(occasionId!, 10));

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;
    if (!occasion) return <ErrorMessage message="Occasion not found" />;

    return (
        <div className="p-6 space-y-8">
            <OccasionEditor
                occasion={occasion}
                onSave={(updates) => actions.updateOccasion(occasion.id, updates)}
            />
        </div>
    );
};

export default OccasionDetailsPage;