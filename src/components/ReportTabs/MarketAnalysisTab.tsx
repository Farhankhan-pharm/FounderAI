import React from 'react';
import {
  TrendingUp,
  Shield,
  BarChart3,
  Compass,
  AlertCircle,
  CheckCircle2,
  FileCheck,
} from 'lucide-react';
import { MarketAnalysisData } from '../../types';

interface MarketAnalysisTabProps {
  market: MarketAnalysisData;
}

export const MarketAnalysisTab: React.FC<MarketAnalysisTabProps> = ({ market }) => {
  const tam = market.tamCalculation;

  return (
    <div className="space-y-6">
      {/* Market Structure Summary */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Compass className="w-4 h-4 text-zinc-700" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
            Market Structure & Sector Dynamics
          </h2>
        </div>
        <p className="text-sm text-zinc-800 leading-relaxed">{market.structureSummary}</p>
      </div>

      {/* TAM / SAM / SOM Calculation Card (Section 11) */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-zinc-700" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              TAM / SAM / SOM Addressable Market Sizing
            </h3>
          </div>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
              tam.status === 'CALCULATED'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-zinc-100 text-zinc-700 border-zinc-300'
            }`}
          >
            {tam.status === 'CALCULATED' ? 'Grounded Estimate' : 'Insufficient Data'}
          </span>
        </div>

        {tam.status === 'CALCULATED' ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-center">
                <span className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider block">
                  Total Addressable Market (TAM)
                </span>
                <span className="text-2xl font-extrabold text-zinc-900 mt-1 block">
                  ${(tam.tamValueUSD || 0).toLocaleString()}
                </span>
                <span className="text-[10px] text-zinc-700">Total theoretical universe spend</span>
              </div>

              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-center">
                <span className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider block">
                  Serviceable Addressable Market (SAM)
                </span>
                <span className="text-2xl font-extrabold text-zinc-900 mt-1 block">
                  ${(tam.samValueUSD || 0).toLocaleString()}
                </span>
                <span className="text-[10px] text-zinc-700">Target segment & regional reach</span>
              </div>

              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 text-center">
                <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block">
                  Serviceable Obtainable Market (SOM)
                </span>
                <span className="text-2xl font-extrabold text-emerald-700 mt-1 block">
                  ${(tam.somValueUSD || 0).toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-800">Realistic Year 3-5 Capture</span>
              </div>
            </div>

            <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-200/80 text-xs text-zinc-700 space-y-2">
              <div>
                <strong className="text-zinc-900">Calculation Methodology: </strong>
                <span>{tam.methodology}</span>
              </div>
              {tam.assumptions && tam.assumptions.length > 0 && (
                <div>
                  <strong className="text-zinc-900 block mb-1">Core Sizing Assumptions:</strong>
                  <ul className="list-disc pl-5 space-y-0.5">
                    {tam.assumptions.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}
              {tam.sources && tam.sources.length > 0 && (
                <div className="pt-2 text-[11px] text-zinc-700 border-t border-zinc-200 flex items-center gap-1">
                  <FileCheck className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Sources: {tam.sources.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6 bg-zinc-50 rounded-xl border border-dashed border-zinc-300 text-center">
            <AlertCircle className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
            <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wide">
              TAM / SAM / SOM Withheld (Strict Anti-Fabrication Rule)
            </h4>
            <p className="text-xs text-zinc-700 max-w-md mx-auto mt-1">
              {tam.methodology ||
                'Available research sources do not contain sufficient verified quantitative data to calculate reliable TAM figures without guessing.'}
            </p>
          </div>
        )}
      </div>

      {/* Drivers, Trends, Barriers Triad */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Drivers */}
        <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-emerald-700">
            <TrendingUp className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Market Drivers & Tailwinds</h3>
          </div>
          <ul className="space-y-2 text-xs text-zinc-700">
            {market.marketDrivers.map((d, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Trends */}
        <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-blue-700">
            <Compass className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Emerging Industry Trends</h3>
          </div>
          <ul className="space-y-2 text-xs text-zinc-700">
            {market.marketTrends.map((t, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Barriers */}
        <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-rose-700">
            <Shield className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Barriers to Entry</h3>
          </div>
          <ul className="space-y-2 text-xs text-zinc-700">
            {market.barriersToEntry.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
