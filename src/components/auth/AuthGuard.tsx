import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { OccasionRole, UserRole } from '@/types/auth';
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
    // If no roles required or no occasion specified, allow access
    if (!allowedRoles || !occasionId) return true;

    // Must have user for role checks
    if (!user) return false;

    // Find user's roles for this occasion
    const occasionRole = user.occasionRoles.find(
      role => role.occasionId === parseInt(occasionId.toString(), 10)
    );

    if (!occasionRole) return false;

    // Check if user has any of the allowed roles
    return occasionRole.roles.some((userRole: OccasionRole) =>
      allowedRoles.includes(userRole.role as UserRole)
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