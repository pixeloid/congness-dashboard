import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, AuthStatus } from '@/store/authStore';
import { UserRole } from '@/types/auth';

export const useRequireAuth = (requiredRoles?: UserRole[]) => {
  const navigate = useNavigate();
  const { user, authStatus, actions } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      setIsChecking(true);
      await actions.checkAuth();
      setIsChecking(false);
    };

    checkAuthentication();
  }, [actions]);

  useEffect(() => {
    if (!isChecking && authStatus === AuthStatus.UNAUTHENTICATED) {
      navigate('/login');
      return;
    }

    if (!isChecking && authStatus === AuthStatus.AUTHENTICATED && user && requiredRoles) {
      const hasRequiredRole = user.occasionRoles.some(
        occasionRole => occasionRole.roles.some(
          role => requiredRoles.includes(role.role as UserRole)
        )
      );

      if (!hasRequiredRole) {
        navigate('/unauthorized');
      }
    }
  }, [isChecking, authStatus, user, requiredRoles, navigate]);

  return {
    user,
    isLoading: isChecking || authStatus === AuthStatus.LOADING
  };
};