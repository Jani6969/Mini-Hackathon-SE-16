'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import StatsBar from '../components/StatsBar';
import FilterBar from '../components/FilterBar';
import PriceCard from '../components/PriceCard';
import AddPriceModal from '../components/AddPriceModal';
import { fetchPrices, createPrice, deletePrice } from '../services/api';
import { Fish, Plus, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';

export default function HomePage() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [search, setSearch] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('All');

  // Modal & Toast notification state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Fetch prices from Express backend
  const loadPrices = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) setLoading(true);
      else setRefreshing(true);
      setError(null);

      const data = await fetchPrices({
        search,
        market: selectedMarket
      });

      setPrices(data);
    } catch (err) {
      setError(err.message || 'Could not connect to Fish Price API');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [search, selectedMarket]);

  // Load prices when search or market filter changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadPrices();
    }, 250); // 250ms debounce for typing

    return () => clearTimeout(timeoutId);
  }, [loadPrices]);

  // Create new fish price handler
  const handlePriceCreated = async (entry) => {
    await createPrice(entry);
    showToast(`Price for "${entry.fish}" recorded successfully!`, 'success');
    await loadPrices(true);
  };

  // Delete price record handler
  const handleDeletePrice = async (id) => {
    await deletePrice(id);
    setPrices(prev => prev.filter(p => p._id !== id));
    showToast('Record deleted successfully', 'info');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      
      {/* Header */}
      <Header
        onOpenModal={() => setIsModalOpen(true)}
        onRefresh={() => loadPrices(true)}
        isRefreshing={refreshing}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Toast Notification */}
        {toast && (
          <div className="mb-6 flex justify-center animate-in fade-in slide-in-from-top-2 duration-200">
            <div className={`px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 text-sm font-medium border ${
              toast.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-slate-900 text-white border-slate-800'
            }`}>
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-ocean-400" />
              )}
              <span>{toast.message}</span>
            </div>
          </div>
        )}

        {/* Market Stats Overview */}
        <StatsBar prices={prices} />

        {/* Search and Market Filters */}
        <FilterBar
          search={search}
          setSearch={setSearch}
          selectedMarket={selectedMarket}
          setSelectedMarket={setSelectedMarket}
          totalResults={prices.length}
        />

        {/* Backend Connection Error */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 text-center text-rose-800 mb-8">
            <AlertCircle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
            <h3 className="text-base font-bold">Failed to load fish prices</h3>
            <p className="text-sm text-rose-600 mt-1 max-w-md mx-auto">{error}</p>
            <p className="text-xs text-slate-500 mt-3">
              Make sure the backend is running with <code>npm run dev</code> on <code>http://localhost:5000</code>.
            </p>
            <button
              onClick={() => loadPrices()}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-rose-600 text-white text-xs font-semibold rounded-lg hover:bg-rose-700 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Try Again
            </button>
          </div>
        )}

        {/* Price Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 animate-pulse h-44">
                <div className="h-5 bg-slate-200 rounded w-2/3 mb-3"></div>
                <div className="h-4 bg-slate-100 rounded w-1/3 mb-6"></div>
                <div className="h-8 bg-slate-200 rounded w-1/2 mb-4"></div>
                <div className="h-3 bg-slate-100 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : prices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {prices.map((record) => (
              <PriceCard
                key={record._id}
                priceRecord={record}
                onDelete={handleDeletePrice}
              />
            ))}
          </div>
        ) : !error ? (
          /* Empty State */
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-md mx-auto shadow-sm my-8">
            <div className="w-16 h-16 rounded-2xl bg-ocean-50 text-ocean-600 flex items-center justify-center mx-auto mb-4">
              <Fish className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No fish prices found</h3>
            <p className="text-sm text-slate-500 mb-6">
              {search || selectedMarket !== 'All'
                ? 'No fish records match your current search or landing site filter.'
                : 'No price reports have been submitted yet today.'}
            </p>
            <div className="flex justify-center gap-3">
              {(search || selectedMarket !== 'All') && (
                <button
                  onClick={() => {
                    setSearch('');
                    setSelectedMarket('All');
                  }}
                  className="px-4 py-2 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition"
                >
                  Clear Filters
                </button>
              )}
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 text-xs font-semibold bg-ocean-600 text-white hover:bg-ocean-700 rounded-lg shadow-sm transition flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Report First Price
              </button>
            </div>
          </div>
        ) : null}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>
            <strong>Negombo Fish Price Board</strong> &bull; SE3090 Mini Hackathon Project
          </p>
          <p className="mt-1 text-slate-400">
            Landing Sites: Negombo Main Harbor, Pitipana Fishery Harbour, Duwa Landing
          </p>
        </div>
      </footer>

      {/* Add Price Modal */}
      <AddPriceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPriceCreated={handlePriceCreated}
      />

    </div>
  );
}
