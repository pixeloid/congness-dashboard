import React, { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const ProfilePage = () => {
  const { user, actions } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      actions.updateUser({ ...user, name, email });
      setIsEditing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold text-white mb-2">Profil</h1>
        <p className="text-lg text-white/70">Személyes adatok kezelése</p>
      </div>

      <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-accent/10 rounded-full p-3">
            <UserCircleIcon className="h-12 w-12 text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold text-white">{user?.name}</h2>
            <p className="text-white/70">
              {user?.occasionRoles.map(role => role.roles.map(r => r.role).join(', ')).join(' | ')}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-1">
              Név
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1">
              Email cím
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-accent/30 focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">
              Szerepkör
            </label>
            <div className="space-y-2">
              {user?.occasionRoles.map((occasionRole) => (
                <div key={occasionRole.occasionId} className="px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white">
                  <p className="text-sm text-white/70">Occasion {occasionRole.occasionId}</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {occasionRole.roles.map((role, index) => (
                      <span key={index} className="px-2 py-1 text-sm bg-accent/10 text-accent rounded-full">
                        {role.role}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-white/70 hover:text-white"
                >
                  Mégse
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light transition-colors"
                >
                  Mentés
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light transition-colors"
              >
                Szerkesztés
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;