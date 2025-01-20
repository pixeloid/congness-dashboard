import { HydraView } from '@/services/ReactQueryService';
import React from 'react';

interface PaginatorProps {
    view: HydraView;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Paginator: React.FC<PaginatorProps> = ({ view, setPage }) => {
    const maxPagesToShow = 6;
    const hasNextPage = view['hydra:next'] !== undefined;
    const totalPages = view['hydra:last'] ? Number(new URLSearchParams(view['hydra:last'].split('?')[1]).get('page')) : 1;
    const page = view['@id'] ? Number(new URLSearchParams(view['@id'].split('?')[1]).get('page')) : 1;
    const pages = Array.from({ length: Math.min(totalPages, maxPagesToShow) }, (_, i) => i + 1);
    return (
        <div className="flex justify-center mt-8 space-x-2">
            <button
                onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-white/10 text-white rounded-lg disabled:opacity-50"
            >
                Previous
            </button>
            {pages.map(p => (
                <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-4 py-2 rounded-lg ${p === page ? 'bg-accent text-white' : 'bg-white/10 text-white'}`}
                >
                    {p}
                </button>
            ))}
            <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={!hasNextPage}
                className="px-4 py-2 bg-white/10 text-white rounded-lg disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Paginator;
