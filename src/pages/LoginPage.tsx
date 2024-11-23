import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '@/components/common/Logo';
import { useAuthStore } from '@/store/authStore';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('nagy.janos@example.com');
  const [password, setPassword] = useState('pass');

  const { isLoading, error, actions } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await actions.login(email, password);
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      // Error is handled by the store
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Logo className="h-12 w-auto mb-8" />
          <h2 className="text-3xl font-display font-bold text-white">
            Bejelentkezés
          </h2>
          <p className="mt-2 text-white/70">
            Jelentkezzen be a folytatáshoz
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/70">
              Email cím
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
              Jelszó
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
            {isLoading ? 'Bejelentkezés...' : 'Bejelentkezés'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;