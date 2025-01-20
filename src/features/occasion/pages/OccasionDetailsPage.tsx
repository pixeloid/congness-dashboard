import { useParams } from 'react-router-dom';
import OccasionEditor from '@/features/occasion/components/OccasionEditor';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import { useOccasionService } from '@/features/occasion/hooks/queries/useOccasion';

const OccasionDetailsPage = () => {
    const { occasionCode } = useParams<{ occasionCode: string }>();
    const { data: occasion, isLoading, error } = useOccasionService.useDetail(occasionCode!);
    const { mutate, isPending: isUpdating, isError: isUpdateError, error: updateError } = useOccasionService.useUpdate();


    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error.message} />;
    if (!occasion) return <ErrorMessage message="Occasion not found" />;

    return (
        <div className="p-6 space-y-8">
            {isUpdating && <LoadingSpinner />}
            {isUpdateError && <ErrorMessage message={updateError?.message} />}
            <OccasionEditor
                occasion={occasion}
                onSave={(updates) => mutate({ iri: occasion['@id']!, updates })}
            />
        </div>
    );
};

export default OccasionDetailsPage;