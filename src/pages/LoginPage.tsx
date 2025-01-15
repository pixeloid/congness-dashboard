import React, { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import Logo from '@/components/common/Logo';
import { useAuthStore, AuthStatus } from '@/store/authStore';



const quickLoginUsers = [
  {
    name: "Event Manager",
    email: "nagy.janos@example.com",
    description: "Full access to event management"
  },
  {
    name: "Chief Reviewer",
    email: "kovacs.peter@example.com",
    description: "Can review and make final decisions"
  },
  {
    name: "Scientific Reviewer 1",
    email: "szabo.anna@example.com",
    description: "Clinical Research & Neurology expert"
  },
  {
    name: "Scientific Reviewer 2",
    email: "kiss.marta@example.com",
    description: "Cardiology & Medical Technology expert"
  }
];

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('emese.veres@ementin.hu');
  const [password, setPassword] = useState((import.meta as any).env.VITE_LOGIN_PASSWORD || '');

  const { authStatus, error, actions } = useAuthStore();
  const isLoading = authStatus === AuthStatus.LOADING;

  // Don't show loading state during initial auth check
  const showLoadingButton = isLoading && email.length > 0;

  // Redirect if already authenticated
  if (authStatus === AuthStatus.AUTHENTICATED) {
    return <Navigate to="/select-occasion" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await actions.login(email, password);
      const from = (location.state as any)?.from?.pathname || '/select-occasion';
      navigate(from, { replace: true });
    } catch (error) {
      // Error is handled by the store
    }
  };

  const handleQuickLogin = async (email: string) => {
    try {
      await actions.login(email, 'pass');
    } catch (error) {
      // Error is handled by the store
    }
  };

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Login Form */}
        <div className="space-y-8">
          <div className="flex flex-col items-center">
            <Logo className="h-12 w-auto mb-8" />
            <h2 className="text-3xl font-display font-bold text-white">
              Sign In
            </h2>
            <p className="mt-2 text-white/70">
              Sign in to access the dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/70">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/70">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {showLoadingButton ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Quick Access */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-display font-semibold text-white mb-2">
              Quick Access
            </h3>
            <p className="text-white/70">
              Select a role to sign in instantly
            </p>
          </div>

          <div className="grid gap-4">
            {quickLoginUsers.map((user) => (
              <button
                key={user.email}
                onClick={() => handleQuickLogin(user.email)}
                disabled={isLoading}
                className="p-4 bg-navy/30 border border-white/10 rounded-lg text-left hover:border-accent/30 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <h4 className="text-white font-medium group-hover:text-accent">
                  {user.name}
                </h4>
                <p className="text-sm text-white/70">
                  {user.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;