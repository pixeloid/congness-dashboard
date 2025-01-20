import { useNavigate, useParams } from 'react-router-dom';
import DashboardGrid from '../components/dashboard/DashboardGrid';
import { getDashboardSections } from '@/data/dashboardData';
import { useOccasionService } from '@/features/occasion/hooks/queries/useOccasion';

const DashboardPage = () => {
  const { occasionCode } = useParams<{ occasionCode: string }>();
  const navigate = useNavigate();

  if (!occasionCode) {
    navigate('/select-occasion');
    return;
  }

  const { data: occasion, isLoading, error } = useOccasionService.useDetail(occasionCode);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const sections = occasion && getDashboardSections(occasion);

  return (
    sections && <div className="p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold text-white mb-2">Esemény Irányítópult</h1>
        <p className="text-lg text-white/70 mb-8">Üdvözöljük az eseménykezelő rendszerben</p>
      </div>

      <DashboardGrid sections={sections} />
    </div>
  );
};

export default DashboardPage;