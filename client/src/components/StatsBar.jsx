'use client';

import React from 'react';
import { TrendingUp, ArrowDownRight, ArrowUpRight, Scale, Store } from 'lucide-react';

export default function StatsBar({ prices }) {
  if (!prices || prices.length === 0) return null;

  const validPrices = prices.map(p => Number(p.price)).filter(n => !isNaN(n) && n > 0);
  const avgPrice = validPrices.length > 0 
    ? Math.round(validPrices.reduce((acc, curr) => acc + curr, 0) / validPrices.length) 
    : 0;

  const minPrice = validPrices.length > 0 ? Math.min(...validPrices) : 0;
  const maxPrice = validPrices.length > 0 ? Math.max(...validPrices) : 0;

  // Find unique landing sites
  const uniqueMarkets = new Set(prices.map(p => p.market)).size;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
      
      {/* Total Reports */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-ocean-50 text-ocean-600 flex items-center justify-center shrink-0">
          <Scale className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500">Live Reports</p>
          <p className="text-xl font-bold text-slate-900">{prices.length} <span className="text-xs font-normal text-slate-500">records</span></p>
        </div>
      </div>

      {/* Average Price */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500">Avg Market Price</p>
          <p className="text-xl font-bold text-slate-900">Rs. {avgPrice.toLocaleString()} <span className="text-xs font-normal text-slate-500">/kg</span></p>
        </div>
      </div>

      {/* Price Range (Min - Max) */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <ArrowDownRight className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500">Lowest / Highest</p>
          <p className="text-base font-bold text-slate-900">
            Rs. {minPrice} - {maxPrice}
          </p>
        </div>
      </div>

      {/* Active Landing Sites */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
          <Store className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500">Active Landing Sites</p>
          <p className="text-xl font-bold text-slate-900">{uniqueMarkets} <span className="text-xs font-normal text-slate-500">sites</span></p>
        </div>
      </div>

    </div>
  );
}
