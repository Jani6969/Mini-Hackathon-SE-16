'use client';

import React from 'react';
import { Anchor, PlusCircle, RefreshCw, MapPin } from 'lucide-react';

export default function Header({ onOpenModal, onRefresh, isRefreshing }) {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-ocean-950 to-slate-900 text-white shadow-lg sticky top-0 z-40 border-b border-ocean-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Harbor Title */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-ocean-600 flex items-center justify-center shadow-md shadow-ocean-900/50">
              <Anchor className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Negombo Fish Price Board
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live Rates
                </span>
              </div>
              <p className="text-xs text-ocean-200 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-ocean-400" />
                Negombo Lagoon & Sea Landing Sites (මීගමුව මාළු මිල)
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Refresh price board"
              className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-ocean-400' : ''}`} />
            </button>

            <button
              onClick={onOpenModal}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-ocean-500 to-ocean-600 hover:from-ocean-600 hover:to-ocean-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-md shadow-ocean-600/30 transition transform active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report Price</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
