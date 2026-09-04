'use client';

import React, { useState } from 'react';
import { Fish, User, Calendar, MapPin, Trash2, Loader2 } from 'lucide-react';

const MARKET_BADGES = {
  'Negombo Main': 'bg-blue-50 text-blue-700 border-blue-200',
  'Pitipana': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Duwa Landing': 'bg-amber-50 text-amber-700 border-amber-200',
};

export default function PriceCard({ priceRecord, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { _id, fish, market, price, seller, date } = priceRecord;

  const badgeStyle = MARKET_BADGES[market] || 'bg-slate-100 text-slate-700 border-slate-200';

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000); // Reset after 3 seconds if not confirmed
      return;
    }

    try {
      setIsDeleting(true);
      await onDelete(_id);
    } catch (err) {
      setIsDeleting(false);
      setConfirmDelete(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition border border-slate-200 flex flex-col justify-between relative group">
      
      {/* Top row: Fish name and Landing Site Badge */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-ocean-50 text-ocean-600 flex items-center justify-center shrink-0">
              <Fish className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-ocean-700 transition">
              {fish}
            </h3>
          </div>

          <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium border shrink-0 ${badgeStyle}`}>
            <MapPin className="w-3 h-3" />
            {market}
          </span>
        </div>

        {/* Price display */}
        <div className="my-3 pb-3 border-b border-slate-100 flex items-baseline gap-1.5">
          <span className="text-xs font-semibold text-slate-400 uppercase">LKR</span>
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Rs. {Number(price).toLocaleString()}
          </span>
          <span className="text-xs text-slate-500 font-medium">/ 1 kg</span>
        </div>
      </div>

      {/* Bottom meta: Reporter, Date, and Delete Action */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span>Reported by <strong>{seller}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{date || 'Today'}</span>
          </div>
        </div>

        {/* Delete button */}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          title={confirmDelete ? 'Click again to confirm deletion' : 'Delete price record'}
          className={`p-2 rounded-lg transition ${
            confirmDelete
              ? 'bg-rose-600 text-white font-semibold text-xs px-2.5 flex items-center gap-1'
              : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'
          }`}
        >
          {isDeleting ? (
            <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
          ) : confirmDelete ? (
            <span>Confirm?</span>
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </button>
      </div>

    </div>
  );
}
