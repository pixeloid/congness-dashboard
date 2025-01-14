import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserRole } from '@/types/auth';
import LoadingSpinner from '../common/LoadingSpinner';
import { useAuthStore, AuthStatus } from '@/store/authStore';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  occasionId?: number;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, allowedRoles, occasionId }) => {
  const { user, authStatus } = useAuthStore();
  const location = useLocation();

  const hasRequiredRole = (): boolean => {
    // If no roles required, allow access
    if (!allowedRoles) return true;

    // Must have user for role checks
    if (!user) return false;

    // If checking occasion-specific roles
    if (occasionId) {
      const occasionRole = user.occasionRoles.find(
        role => role.occasionId === parseInt(occasionId.toString(), 10)
      );

      if (!occasionRole) return false;

      return occasionRole.roles.some((userRole) =>
        allowedRoles.includes(userRole.role as UserRole)
      );
    }

    // For non-occasion routes, check if user has the role in any occasion
    return user.occasionRoles.some(role =>
      role.roles.some(userRole =>
        allowedRoles.includes(userRole.role as UserRole)
      )
    );
  };

  if (authStatus === AuthStatus.LOADING) {
    return <LoadingSpinner />;
  }

  if (authStatus === AuthStatus.UNAUTHENTICATED) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const hasRole = hasRequiredRole();
  if (!hasRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;