import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowsRightLeftIcon,
  BuildingOffice2Icon,
  ChartBarIcon,
  CalendarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  MapPinIcon,
  BuildingStorefrontIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  CogIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { UserRole } from '@/types/auth';
import Logo from '@/components/common/Logo';
import ThemeToggle from '@/components/common/ThemeToggle';
import { useOccasionsStore } from '@/store/occasionsStore';
import { useAuthStore, AuthStatus } from '@/store/authStore';
import clsx from 'clsx';

interface NavigationItem {
  name: string;
  href: string;
  icon: any;
  roles?: UserRole[];
}

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [abstractsOpen, setAbstractsOpen] = useState(false);
  const { occasionId } = useParams<{ occasionId: string }>();
  const { occasions, actions: { setSelectedOccasion } } = useOccasionsStore();
  const { user, authStatus, actions: { logout } } = useAuthStore();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (authStatus === AuthStatus.UNAUTHENTICATED) {
      navigate('/login');
    }
  }, [authStatus, navigate]);

  // Find the current occasion with proper type checking
  const currentOccasion = occasionId ? occasions.find(o => o.id === parseInt(occasionId)) : null;

  const hasRole = (roles?: UserRole[]): boolean => {
    if (!roles || !user || !occasionId) return true;

    const occasionRole = user.occasionRoles.find(
      role => role.occasionId === parseInt(occasionId)
    );

    if (!occasionRole) return false;

    return occasionRole.roles.some(userRole =>
      roles.includes(userRole.role as UserRole)
    );
  };

  useEffect(() => {
    if (occasionId) {
      if (currentOccasion) {
        setSelectedOccasion(currentOccasion);
      }
    }
  }, [occasionId, occasions, setSelectedOccasion]);

  const handleSwitchOccasion = () => {
    navigate('/select-occasion');
  };

  const navigationItems: NavigationItem[] = [
    {
      name: 'Vezérlőpult',
      href: `dashboard`,
      icon: ChartBarIcon
    },
    {
      name: 'Időbeosztás',
      href: `schedule`,
      icon: CalendarIcon,
      roles: [UserRole.EVENT_MANAGER]
    },
    {
      name: 'Résztvevők',
      href: `participants`,
      icon: UserGroupIcon,
      roles: [UserRole.EVENT_MANAGER]
    },
    {
      name: 'Ellenőrzőpontok',
      href: `checkpoints`,
      icon: MapPinIcon,
      roles: [UserRole.EVENT_MANAGER]
    },
    {
      name: 'Kiállítók',
      href: `exhibitions`,
      icon: BuildingStorefrontIcon,
      roles: [UserRole.EVENT_MANAGER, UserRole.EXHIBITOR]
    }
  ];

  const abstractItems: NavigationItem[] = [
    {
      name: 'Összefoglalók',
      href: 'abstracts',
      icon: DocumentTextIcon,
      roles: [UserRole.EVENT_MANAGER, UserRole.SCIENTIFIC_REVIEWER, UserRole.CHIEF_REVIEWER]
    },
    {
      name: 'Összefoglaló feltöltése',
      href: 'abstracts/submit?token=pending-token',
      icon: DocumentTextIcon,
      roles: [UserRole.EVENT_MANAGER, UserRole.SCIENTIFIC_REVIEWER, UserRole.CHIEF_REVIEWER]
    },
    {
      name: 'Összefoglaló beállítások',
      href: 'abstracts/settings',
      icon: CogIcon,
      roles: [UserRole.EVENT_MANAGER]
    }
  ];

  return (
    <div className="min-h-screen bg-fixed bg-background-light dark:bg-background-dark">
      {/* Background gradients */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-radial from-accent/20 via-transparent to-transparent opacity-20" />
        <div className="absolute right-0 top-0 h-96 w-96 bg-gradient-radial from-secondary/20 via-transparent to-transparent opacity-20" />
        <div className="absolute left-1/2 bottom-0 h-96 w-96 -translate-x-1/2 bg-gradient-radial from-accent/20 via-transparent to-transparent opacity-20" />
      </div>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 text-white/70 hover:text-white lg:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar */}
      <div className={clsx(
        'fixed inset-y-0 left-0 z-50 w-64 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-sm transform transition-transform duration-300 lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Header section */}
          <div className="border-b border-white/10">
            <div className="p-4">
              <Logo className="h-8 w-auto" />
            </div>

            <div className="px-4 pb-4">
              <h2 className="text-lg font-display font-bold text-foreground-light dark:text-foreground-dark">
                {currentOccasion?.name}
              </h2>
              <button
                onClick={handleSwitchOccasion}
                className="mt-1 inline-flex items-center text-sm text-foreground-light/70 dark:text-foreground-dark/70 hover:text-accent transition-colors"
              >
                <ArrowsRightLeftIcon className="h-4 w-4 mr-1" />
                <span>Váltás</span>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 pt-4 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => {
              if (!hasRole(item.roles)) return null;

              const href = currentOccasion ? `/occasions/${currentOccasion.id}/${item.href}` : '#';
              return (
                <Link
                  key={item.name}
                  to={href}
                  className="flex items-center px-3 py-2 text-sm text-foreground-light/70 dark:text-foreground-dark/70 rounded-lg hover:bg-white/10 hover:text-accent transition-colors"
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}

            {/* Abstracts Dropdown */}
            <div>
              {hasRole([UserRole.EVENT_MANAGER, UserRole.SCIENTIFIC_REVIEWER, UserRole.CHIEF_REVIEWER]) && (
                <button
                  onClick={() => setAbstractsOpen(!abstractsOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-foreground-light/70 dark:text-foreground-dark/70 rounded-lg hover:bg-white/10 hover:text-accent transition-colors"
                >
                  <div className="flex items-center">
                    <DocumentTextIcon className="h-5 w-5 mr-3" />
                    <span>Absztraktok</span>
                  </div>
                  <ChevronDownIcon
                    className={clsx(
                      "h-4 w-4 transition-transform duration-200",
                      abstractsOpen ? "transform rotate-180" : ""
                    )}
                  />
                </button>
              )}
              {abstractsOpen && (
                <div className="ml-4 mt-1 space-y-1">
                  {abstractItems.filter(item => hasRole(item.roles)).map((item) => {
                    const href = currentOccasion ? `/occasions/${currentOccasion.id}/${item.href}` : '#';
                    return (
                      <Link
                        key={item.name}
                        to={href}
                        className="flex items-center px-3 py-2 text-sm text-foreground-light/70 dark:text-foreground-dark/70 rounded-lg hover:bg-white/10 hover:text-accent transition-colors"
                      >
                        <item.icon className="h-4 w-4 mr-3" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <UserIcon className="h-8 w-8 text-accent" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-foreground-light dark:text-foreground-dark">
                    {user?.name}
                  </p>
                  <p className="text-xs text-foreground-light/70 dark:text-foreground-dark/70">
                    {user?.email}
                  </p>
                </div>
              </div>
              <ThemeToggle />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Link
                to="/profile"
                className="text-sm text-foreground-light/70 dark:text-foreground-dark/70 hover:text-accent transition-colors"
              >
                Profil
              </Link>
              <button
                onClick={logout}
                className="text-sm text-foreground-light/70 dark:text-foreground-dark/70 hover:text-accent transition-colors"
              >
                Kijelentkezés
              </button>
            </div>
          </div>
          <button
            onClick={() => navigate('/occasions')}
            className="mt-4 w-full flex items-center px-3 py-2 text-sm text-foreground-light/70 dark:text-foreground-dark/70 rounded-lg hover:bg-white/10 hover:text-accent transition-colors"
          >
            <BuildingOffice2Icon className="h-5 w-5 mr-3" />
            Manage All Occasions
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;