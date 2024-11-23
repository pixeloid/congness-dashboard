import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { UserRole } from '@/types/auth';

export const useRequireAuth = (requiredRoles?: UserRole[]) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const checkAuth = useAuthStore(state => state.actions.checkAuth);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      checkAuth();
    }
  }, [isAuthenticated, isLoading, checkAuth]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!isLoading && user && requiredRoles && !requiredRoles.includes(user.role)) {
      navigate('/unauthorized');
    }
  }, [isLoading, isAuthenticated, user, requiredRoles, navigate]);

  return { user, isLoading };
};