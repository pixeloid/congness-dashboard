import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOccasionsStore } from '@/store/occasionsStore';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import Logo from '@/components/common/Logo';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';

const OccasionSelectionPage = () => {
  const navigate = useNavigate();
  const { occasions, isLoading, error } = useOccasionsStore();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

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
              key={occasion.id}
              onClick={() => navigate(`/occasions/${occasion.id}/dashboard`)}
              className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 p-6 text-left hover:border-accent/30 transition-all"
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
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OccasionSelectionPage;