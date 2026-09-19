import React from 'react';
import {
  ShieldAlert,
  ExternalLink,
  Target,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Layers,
} from 'lucide-react';
import { CompetitorItem, MarketGapItem } from '../../types';

interface CompetitorGapsTabProps {
  competitors: CompetitorItem[];
  gaps: MarketGapItem[];
}

export const CompetitorGapsTab: React.FC<CompetitorGapsTabProps> = ({ competitors, gaps }) => {
  return (
    <div className="space-y-8">
      {/* Competitor Matrix Section (Section 14) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
              Competitive Intelligence Matrix (Section 14)
            </h2>
            <p className="text-xs text-zinc-700 mt-0.5">
              Direct, indirect, and substitute competitors mapped without fabrication
            </p>
          </div>
          <span className="text-xs text-zinc-700">
            {competitors.length} active players tracked
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {competitors.map((comp) => (
            <div
              key={comp.id}
              className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-zinc-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-zinc-100 text-zinc-800 border border-zinc-200">
                      {comp.category}
                    </span>
                    <h3 className="text-base font-bold text-zinc-900 mt-1">{comp.name}</h3>
                  </div>

                  {comp.requiresVerification ? (
                    <span
                      title="Data flagged for manual field verification"
                      className="px-2 py-0.5 text-[10px] font-semibold rounded-sm bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1"
                    >
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                      Verify Pricing
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[10px] font-semibold rounded-sm bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  )}
                </div>

                <p className="text-xs text-zinc-700 mb-3">{comp.description}</p>

                <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-200/80 mb-3 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-700 font-medium">Pricing:</span>
                    <span className="font-semibold text-zinc-900 text-right">{comp.pricing}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-700 font-medium">Model:</span>
                    <span className="font-semibold text-zinc-800 text-right">{comp.businessModel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-700 font-medium">Target:</span>
                    <span className="text-zinc-700 truncate max-w-[160px] text-right">
                      {comp.targetCustomer}
                    </span>
                  </div>
                </div>

                {/* Strengths & Weaknesses */}
                <div className="space-y-2 text-xs mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                      Strengths
                    </span>
                    <ul className="space-y-0.5 pl-3 list-disc text-zinc-700 text-[11px]">
                      {comp.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 block mb-1">
                      Weaknesses & Gaps
                    </span>
                    <ul className="space-y-0.5 pl-3 list-disc text-zinc-700 text-[11px]">
                      {comp.weaknesses.map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {comp.website && (
                <div className="pt-2 border-t border-zinc-100 flex justify-between items-center text-[11px]">
                  <a
                    href={comp.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-700 hover:text-zinc-900 font-medium flex items-center gap-1"
                  >
                    <span>Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-zinc-700">Confidence: {Math.round(comp.confidence * 100)}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Identified Market Gaps (Section 15) */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-4 h-4 text-zinc-700" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
            Identified Market Gaps & Strategic Wedges (Section 15)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {gaps.map((gap) => (
            <div
              key={gap.id}
              className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm bg-purple-100 text-purple-900 border border-purple-200">
                    {gap.gapType.replace(/_/g, ' ')}
                  </span>
                  <div className="text-right">
                    <span className="text-xs font-black text-purple-700">
                      Score: {gap.opportunityScore}
                    </span>
                    <span className="text-[10px] text-zinc-700 block">
                      {Math.round(gap.confidence * 100)}% confidence
                    </span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-zinc-900 mb-2">{gap.title}</h3>
                <p className="text-xs text-zinc-700 leading-relaxed mb-4">{gap.description}</p>
              </div>

              {gap.evidence && gap.evidence.length > 0 && (
                <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-200/80 text-[11px] text-zinc-700">
                  <strong className="text-zinc-800 block mb-0.5">Evidentiary Basis:</strong>
                  <span>{gap.evidence.join('; ')}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
