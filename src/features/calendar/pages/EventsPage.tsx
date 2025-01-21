import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPinIcon,
    CalendarIcon,
    BuildingOffice2Icon,
    MagnifyingGlassIcon,
    AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import { useOccasionService } from '@/features/occasion/hooks/queries/useOccasion';
import Paginator from '@/components/common/Paginator';

// Event type categories with their colors
const eventTypes = {
    conference: { label: 'Conference', color: 'bg-blue-500' },
    workshop: { label: 'Workshop', color: 'bg-purple-500' },
    training: { label: 'Training', color: 'bg-green-500' },
    seminar: { label: 'Seminar', color: 'bg-orange-500' }
};

const EventsPage = () => {
    const [filters, setFilters] = useState({
        search: '',
        type: '',
        location: '',
        dateRange: 'all'
    });
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [page, setPage] = useState(1);

    const { data: occasions, error, isLoading, refetch } = useOccasionService.useList(filters, undefined);

    useEffect(() => {
        refetch();
    }, [filters, page, refetch]);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error.message} />;


    return (
        <div className="min-h-screen bg-gradient-to-br from-navy-dark to-navy">
            {/* Hero Section with Search */}
            <div className="relative h-96 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 via-transparent to-transparent opacity-20" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-display font-bold text-white text-center mb-6"
                    >
                        Discover Amazing Events
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-white/70 text-center mb-8 max-w-2xl"
                    >
                        Find and join the most exciting conferences, workshops, and seminars
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="w-full max-w-2xl relative"
                    >
                        <div className="relative">
                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-accent/30 focus:outline-none focus:ring-2 focus:ring-accent/30"
                            />
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white transition-colors"
                            >
                                <AdjustmentsHorizontalIcon className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Advanced Filters Panel */}
                        <AnimatePresence>
                            {isFilterOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="absolute top-full left-0 right-0 mt-2 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-white/70 mb-1">
                                                Event Type
                                            </label>
                                            <select
                                                value={filters.type}
                                                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                                                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                                            >
                                                <option value="">All Types</option>
                                                {Object.entries(eventTypes).map(([key, { label }]) => (
                                                    <option key={key} value={key}>{label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white/70 mb-1">
                                                Location
                                            </label>
                                            <input
                                                type="text"
                                                value={filters.location}
                                                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                                placeholder="Enter city or region"
                                                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white/70 mb-1">
                                                Date Range
                                            </label>
                                            <select
                                                value={filters.dateRange}
                                                onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                                                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                                            >
                                                <option value="all">All Dates</option>
                                                <option value="upcoming">Upcoming</option>
                                                <option value="thisMonth">This Month</option>
                                                <option value="past">Past Events</option>
                                            </select>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>

            {/* Events List */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {occasions && occasions.items.map((occasion, index) => (
                        <motion.div
                            key={occasion['@id']}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-white/95 dark:bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden hover:border-accent/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                        >
                            {/* Event Image/Banner */}
                            <div className="relative h-48 overflow-hidden">
                                {occasion.logo ? (
                                    <img
                                        src={occasion.logo}
                                        alt={occasion.name}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                            </div>

                            {/* Event Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-display font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                                    {occasion.name}
                                </h3>
                                <p className="text-navy/70 dark:text-white/70 text-sm mb-4">
                                    {occasion.subtitle}
                                </p>

                                {/* Event Details */}
                                <div className="space-y-2">
                                    {occasion.date_start && <div className="flex items-center text-navy/60 dark:text-white/60">
                                        <CalendarIcon className="h-5 w-5 mr-2" />
                                        <span className="text-sm">
                                            {format(new Date(occasion.date_start), 'PPP', { locale: hu })}
                                        </span>
                                    </div>}
                                    {occasion.venue && (
                                        <>
                                            <div className="flex items-center text-navy/60 dark:text-white/60">
                                                <MapPinIcon className="h-5 w-5 mr-2" />
                                                <span className="text-sm">{occasion.venue.name}</span>
                                            </div>
                                            <div className="flex items-center text-navy/60 dark:text-white/60">
                                                <BuildingOffice2Icon className="h-5 w-5 mr-2" />
                                                <span className="text-sm">{occasion.venue.address}</span>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Action Button */}
                                <button className="mt-6 w-full px-4 py-2 bg-accent text-white font-medium rounded-lg hover:bg-accent-light transition-colors shadow-lg hover:shadow-xl">
                                    View Details
                                </button>
                            </div>

                            {occasion.type && (
                                <div className="absolute top-4 right-4">
                                    <span className={`px-3 py-1 text-xs font-medium ${occasion.type === 'conference' ? 'bg-blue-500 text-white' :
                                        occasion.type === 'workshop' ? 'bg-purple-500 text-white' :
                                            occasion.type === 'training' ? 'bg-green-500 text-white' :
                                                'bg-orange-500 text-white'
                                        } rounded-full shadow-lg`}>
                                        {occasion.type.charAt(0).toUpperCase() + occasion.type.slice(1)}
                                    </span>
                                </div>)}
                        </motion.div>
                    ))}
                </div>

                <Paginator
                    setPage={setPage}
                    view={occasions!.view!}
                />
            </div>
        </div>
    );
};

export default EventsPage;