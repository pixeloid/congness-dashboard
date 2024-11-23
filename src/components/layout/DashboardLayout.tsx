import React from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  CalendarIcon, 
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import Logo from '../common/Logo';
import { useAuthStore } from '@/store/authStore';

const navigation = [
  { name: 'Irányítópult', href: '/dashboard', icon: HomeIcon },
  { name: 'Program', href: '/schedule', icon: CalendarIcon },
  { name: 'Események', href: '/occasions', icon: BuildingOfficeIcon },
  { name: 'Kiállítások', href: '/exhibitions', icon: BuildingStorefrontIcon },
];

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, actions } = useAuthStore();

  const handleLogout = () => {
    actions.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-navy-dark">
      <div className="fixed inset-0 bg-gradient-radial from-navy via-primary to-navy opacity-80 pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-gradient-conic from-accent/20 via-secondary/20 to-accent/20 opacity-30 blur-3xl pointer-events-none z-0"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <nav className="sticky top-0 z-50 bg-navy/50 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20">
              <div className="flex items-center space-x-8">
                <Logo className="h-12 w-auto" />
                <div className="hidden md:flex space-x-4">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-accent text-navy-dark'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <item.icon className="h-5 w-5 mr-2" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <UserCircleIcon className="h-5 w-5 mr-2" />
                  {user?.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                  Kijelentkezés
                </button>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="flex-1 relative z-20">
          <div className="max-w-7xl mx-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;