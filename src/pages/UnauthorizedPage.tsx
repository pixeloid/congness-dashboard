import { useNavigate } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Logo from '@/components/common/Logo';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <Logo className="h-12 w-auto mb-8" />

      <div className="text-center space-y-4">
        <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mx-auto" />
        <h1 className="text-3xl font-display font-bold text-white">
          Hozzáférés megtagadva
        </h1>
        <p className="text-white/70">
          Nincs jogosultsága az oldal megtekintéséhez.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light transition-colors"
        >
          Vissza a kezdőlapra
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;