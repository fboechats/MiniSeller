import React from 'react';
import type { LeadSort, LeadStatus } from '../../types';

type LeadFiltersProps = {
    search: string;
    setSearch: (v: string) => void;
    filter: LeadStatus | 'All';
    setFilter: (v: LeadStatus | 'All') => void;
    sort: LeadSort;
    setSort: (v: LeadSort) => void;
};

export const LeadFilters: React.FC<LeadFiltersProps> = ({ search, setSearch, filter, setFilter, sort, setSort }) => {
    return (
        <div className="flex gap-2 mb-4">
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="flex-1 px-3 py-2 border rounded-md text-sm"
            />
            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as LeadStatus | 'All')}
                className="px-3 py-2 border rounded-md text-sm"
            >
                <option value="All">All</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
            </select>
            <select
                value={sort}
                onChange={(e) => setSort(e.target.value as LeadSort)}
                className="px-3 py-2 border rounded-md text-sm"
            >
                <option value="score_desc">Score ↓</option>
                <option value="score_asc">Score ↑</option>
            </select>
        </div>
    );
};
