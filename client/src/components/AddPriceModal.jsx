'use client';

import React, { useState } from 'react';
import { X, PlusCircle, AlertCircle, Loader2 } from 'lucide-react';

const COMMON_FISH = [
  'Balaya (Skipjack)',
  'Kelawalla (Yellowfin)',
  'Hurulla',
  'Thalapath (Seer)',
  'Isso (Prawns)',
  'Paraw (Trevally)',
  'Koduwa (Barramundi)',
  'Salaya',
  'Kumbalawa'
];

const LANDING_SITES = [
  'Negombo Main',
  'Pitipana',
  'Duwa Landing'
];

export default function AddPriceModal({ isOpen, onClose, onPriceCreated }) {
  const today = new Date().toISOString().slice(0, 10);

  const [formData, setFormData] = useState({
    fish: '',
    market: 'Negombo Main',
    price: '',
    seller: '',
    date: today
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.fish.trim()) {
      newErrors.fish = 'Fish type is required';
    }

    if (!formData.market.trim()) {
      newErrors.market = 'Landing site is required';
    }

    const priceNum = Number(formData.price);
    if (!formData.price || isNaN(priceNum) || priceNum <= 0) {
      newErrors.price = 'Price must be greater than 0';
    } else if (priceNum > 10000) {
      newErrors.price = 'Price looks too high for one kilo (Max: 10,000)';
    }

    if (!formData.seller.trim()) {
      newErrors.seller = 'Reporter name is required';
    } else if (formData.seller.trim().length < 3) {
      newErrors.seller = 'Name must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await onPriceCreated({
        fish: formData.fish.trim(),
        market: formData.market.trim(),
        price: Number(formData.price),
        seller: formData.seller.trim(),
        date: formData.date || today
      });

      // Reset form on success
      setFormData({
        fish: '',
        market: 'Negombo Main',
        price: '',
        seller: '',
        date: today
      });
      setErrors({});
      onClose();
    } catch (err) {
      setServerError(err.message || 'Failed to submit price report');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-in fade-in zoom-in duration-150">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-ocean-900 to-slate-900 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-ocean-400" />
            <h2 className="text-lg font-bold">Report New Fish Price</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Server Error Alert */}
        {serverError && (
          <div className="m-6 mb-0 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-rose-700 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-500 mt-0.5" />
            <div>
              <p className="font-semibold">Unable to record price</p>
              <p className="text-xs mt-0.5">{serverError}</p>
            </div>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Fish Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Fish Type <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fish}
              onChange={(e) => {
                setFormData({ ...formData, fish: e.target.value });
                if (errors.fish) setErrors({ ...errors, fish: null });
              }}
              placeholder="e.g. Balaya (Skipjack)"
              className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:bg-white transition ${
                errors.fish ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300 focus:ring-ocean-500'
              }`}
            />
            {errors.fish && (
              <p className="text-xs text-rose-600 mt-1">{errors.fish}</p>
            )}

            {/* Quick Fish Suggestions */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-[11px] text-slate-400 self-center mr-1">Quick select:</span>
              {COMMON_FISH.slice(0, 5).map((fishName) => (
                <button
                  type="button"
                  key={fishName}
                  onClick={() => {
                    setFormData({ ...formData, fish: fishName });
                    if (errors.fish) setErrors({ ...errors, fish: null });
                  }}
                  className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-600 hover:bg-ocean-50 hover:text-ocean-700 transition"
                >
                  {fishName.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Landing Site & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Landing Site <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.market}
                onChange={(e) => {
                  setFormData({ ...formData, market: e.target.value });
                  if (errors.market) setErrors({ ...errors, market: null });
                }}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:bg-white transition"
              >
                {LANDING_SITES.map((site) => (
                  <option key={site} value={site}>
                    {site}
                  </option>
                ))}
              </select>
              {errors.market && (
                <p className="text-xs text-rose-600 mt-1">{errors.market}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Report Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Price & Reporter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Price (Rs. / 1 kg) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs text-slate-400 font-semibold">
                  Rs.
                </span>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={formData.price}
                  onChange={(e) => {
                    setFormData({ ...formData, price: e.target.value });
                    if (errors.price) setErrors({ ...errors, price: null });
                  }}
                  placeholder="950"
                  className={`w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:bg-white transition ${
                    errors.price ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300 focus:ring-ocean-500'
                  }`}
                />
              </div>
              {errors.price && (
                <p className="text-xs text-rose-600 mt-1">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Reporter / Seller <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.seller}
                onChange={(e) => {
                  setFormData({ ...formData, seller: e.target.value });
                  if (errors.seller) setErrors({ ...errors, seller: null });
                }}
                placeholder="e.g. Nimal Fernando"
                className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:bg-white transition ${
                  errors.seller ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300 focus:ring-ocean-500'
                }`}
              />
              {errors.seller && (
                <p className="text-xs text-rose-600 mt-1">{errors.seller}</p>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-ocean-600 hover:bg-ocean-700 rounded-lg shadow-sm shadow-ocean-600/30 flex items-center gap-2 transition disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Recording...</span>
                </>
              ) : (
                <span>Submit Price</span>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
