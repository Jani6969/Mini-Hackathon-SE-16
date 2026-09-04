'use client';

import React from 'react';
import { Search, X, Filter } from 'lucide-react';

const LANDING_SITES = [
  'All',
  'Negombo Main',
  'Pitipana',
  'Duwa Landing',
];

export default function FilterBar({
  search,
  setSearch,
  selectedMarket,
  setSelectedMarket,
  totalResults
}) {
  const hasActiveFilters = Boolean(search.trim()) || selectedMarket !== 'All';

  const handleReset = () => {
    setSearch('');
    setSelectedMarket('All');
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search fish (e.g. Balaya, Kelawalla, Thalapath, Isso)..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:bg-white transition"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Landing Site Selection Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <div className="flex items-center text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5 mr-1" />
            Site:
          </div>
          {LANDING_SITES.map((market) => {
            const isSelected = selectedMarket === market;
            return (
              <button
                key={market}
                onClick={() => setSelectedMarket(market)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  isSelected
                    ? 'bg-ocean-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {market}
              </button>
            );
          })}

          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="px-2.5 py-1.5 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg font-medium transition"
            >
              Reset
            </button>
          )}
        </div>

      </div>

      {/* Result Count Status */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <strong className="text-slate-800">{totalResults}</strong> fish price {totalResults === 1 ? 'record' : 'records'}
          {selectedMarket !== 'All' && <span> at <strong>{selectedMarket}</strong></span>}
          {search.trim() && <span> matching &ldquo;<strong>{search}</strong>&rdquo;</span>}
        </span>
      </div>
    </div>
  );
}
