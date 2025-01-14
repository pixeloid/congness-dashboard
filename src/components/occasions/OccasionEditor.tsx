import React, { useState } from 'react';
import { Occasion } from '@/types/occasions';
import { format } from 'date-fns';
import { MapPinIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

interface OccasionEditorProps {
    occasion: Occasion;
    onSave: (updates: Partial<Occasion>) => void;
}

const OccasionEditor: React.FC<OccasionEditorProps> = ({ occasion, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: occasion.name,
        subtitle: occasion.subtitle || '',
        description: occasion.description || '',
        url: occasion.url || '',
        startDate: format(new Date(occasion.startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(occasion.endDate), 'yyyy-MM-dd'),
        venue: {
            name: occasion.venue.name,
            address: occasion.venue.address,
            description: occasion.venue.description,
            url: occasion.venue.url,
            coordinates: {
                lat: occasion.venue.coordinates.lat,
                lng: occasion.venue.coordinates.lng
            }
        },
        contact: {
            name: occasion.contact.name,
            email: occasion.contact.email
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...formData,
            venue: {
                ...formData.venue,
                photo: occasion.venue.photo // Preserve existing photo
            }
        });
        setIsEditing(false);
    };

    if (!isEditing) {
        return (
            <div className="space-y-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-display font-bold text-white mb-2">
                            {occasion.name}
                        </h1>
                        {occasion.subtitle && (
                            <p className="text-xl text-white/70">{occasion.subtitle}</p>
                        )}
                    </div>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light transition-colors"
                    >
                        Edit Occasion
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Basic Info */}
                    <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 p-6">
                        <h2 className="text-xl font-display font-semibold text-white mb-4">
                            Basic Information
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white/70">Description</label>
                                <p className="text-white mt-1">{occasion.description}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/70">Website</label>
                                <a
                                    href={occasion.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent hover:text-accent-light mt-1 inline-block"
                                >
                                    {occasion.url}
                                </a>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/70">Dates</label>
                                <p className="text-white mt-1">
                                    {format(new Date(occasion.startDate), 'PPP')} -
                                    {format(new Date(occasion.endDate), 'PPP')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Venue Info */}
                    <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 p-6">
                        <h2 className="text-xl font-display font-semibold text-white mb-4">
                            Venue Information
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-2">
                                <MapPinIcon className="h-5 w-5 flex-shrink-0 text-accent mt-1" />
                                <div>
                                    <p className="font-medium text-white">{occasion.venue.name}</p>
                                    <p className="text-white/70">{occasion.venue.address}</p>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/70">Description</label>
                                <p className="text-white mt-1">{occasion.venue.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <GlobeAltIcon className="h-5 w-5 text-accent" />
                                <a
                                    href={occasion.venue.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent hover:text-accent-light"
                                >
                                    {new URL(occasion.venue.url).hostname}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 p-6">
                        <h2 className="text-xl font-display font-semibold text-white mb-4">
                            Contact Information
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white/70">Name</label>
                                <p className="text-white mt-1">{occasion.contact.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/70">Email</label>
                                <p className="text-white mt-1">{occasion.contact.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex justify-between items-start">
                <h1 className="text-4xl font-display font-bold text-white">
                    Edit Occasion
                </h1>
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 text-white/70 hover:text-white"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic Info */}
                <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 p-6">
                    <h2 className="text-xl font-display font-semibold text-white mb-4">
                        Basic Information
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-1">
                                Subtitle
                            </label>
                            <input
                                type="text"
                                value={formData.subtitle}
                                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-1">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-1">
                                Website URL
                            </label>
                            <input
                                type="url"
                                value={formData.url}
                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-white/70 mb-1">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/70 mb-1">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.endDate}
                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Venue Info */}
                <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 p-6">
                    <h2 className="text-xl font-display font-semibold text-white mb-4">
                        Venue Information
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-1">
                                Venue Name
                            </label>
                            <input
                                type="text"
                                value={formData.venue.name}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    venue: { ...formData.venue, name: e.target.value }
                                })}
                                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-1">
                                Address
                            </label>
                            <input
                                type="text"
                                value={formData.venue.address}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    venue: { ...formData.venue, address: e.target.value }
                                })}
                                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-1">
                                Description
                            </label>
                            <textarea
                                value={formData.venue.description}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    venue: { ...formData.venue, description: e.target.value }
                                })}
                                rows={3}
                                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-1">
                                Website URL
                            </label>
                            <input
                                type="url"
                                value={formData.venue.url}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    venue: { ...formData.venue, url: e.target.value }
                                })}
                                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-white/70 mb-1">
                                    Latitude
                                </label>
                                <input
                                    type="number"
                                    step="any"
                                    value={formData.venue.coordinates.lat}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        venue: {
                                            ...formData.venue,
                                            coordinates: {
                                                ...formData.venue.coordinates,
                                                lat: parseFloat(e.target.value)
                                            }
                                        }
                                    })}
                                    className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/70 mb-1">
                                    Longitude
                                </label>
                                <input
                                    type="number"
                                    step="any"
                                    value={formData.venue.coordinates.lng}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        venue: {
                                            ...formData.venue,
                                            coordinates: {
                                                ...formData.venue.coordinates,
                                                lng: parseFloat(e.target.value)
                                            }
                                        }
                                    })}
                                    className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 p-6">
                    <h2 className="text-xl font-display font-semibold text-white mb-4">
                        Contact Information
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-1">
                                Contact Name
                            </label>
                            <input
                                type="text"
                                value={formData.contact.name}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    contact: { ...formData.contact, name: e.target.value }
                                })}
                                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-1">
                                Contact Email
                            </label>
                            <input
                                type="email"
                                value={formData.contact.email}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    contact: { ...formData.contact, email: e.target.value }
                                })}
                                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default OccasionEditor;