import React, { useState } from 'react';
import {
  FileCheck2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Cpu,
  Search,
  Filter,
} from 'lucide-react';
import { EvidenceItem, ResearchSource } from '../../types';

interface EvidenceAuditTabProps {
  evidence: EvidenceItem[];
  sources: ResearchSource[];
}

export const EvidenceAuditTab: React.FC<EvidenceAuditTabProps> = ({ evidence, sources }) => {
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredEvidence =
    filterType === 'ALL'
      ? evidence
      : evidence.filter((e) => e.evidenceType === filterType);

  const getEvidenceTypeBadge = (type: EvidenceItem['evidenceType']) => {
    switch (type) {
      case 'VERIFIED':
        return {
          bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          label: 'VERIFIED (Official / Peer-Reviewed)',
        };
      case 'SOURCE_BACKED':
        return {
          bg: 'bg-blue-100 text-blue-900 border-blue-300',
          label: 'SOURCE-BACKED (Report / Docs)',
        };
      case 'MODEL_INFERENCE':
        return {
          bg: 'bg-purple-100 text-purple-900 border-purple-300',
          label: 'MODEL INFERENCE (Calculated)',
        };
      case 'HYPOTHESIS':
        return {
          bg: 'bg-amber-100 text-amber-900 border-amber-300',
          label: 'HYPOTHESIS (Untested Assumption)',
        };
      case 'UNKNOWN':
      default:
        return {
          bg: 'bg-zinc-100 text-zinc-800 border-zinc-300',
          label: 'UNKNOWN (Data Absent)',
        };
    }
  };

  return (
    <div className="space-y-8">
      {/* Evidence Classification Explainer & Filter */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-zinc-700" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
                Evidence Audit & 5-State Classification (Sections 9, 10)
              </h2>
            </div>
            <p className="text-xs text-zinc-700 mt-0.5">
              Strict truthfulness policy: Distinguishing verified data from unproven founder hypotheses
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['ALL', 'VERIFIED', 'SOURCE_BACKED', 'MODEL_INFERENCE', 'HYPOTHESIS'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                  filterType === type
                    ? 'bg-zinc-900 text-white shadow-2xs'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200/80'
                }`}
              >
                {type.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Evidence Items List */}
        <div className="space-y-3.5 mt-5">
          {filteredEvidence.map((evi) => {
            const badge = getEvidenceTypeBadge(evi.evidenceType);
            return (
              <div
                key={evi.id}
                className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 flex flex-col justify-between gap-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm border ${badge.bg}`}
                  >
                    {badge.label}
                  </span>
                  <span className="text-[11px] font-semibold text-zinc-700">
                    Confidence: {Math.round(evi.confidence * 100)}%
                  </span>
                </div>

                <h4 className="text-xs font-bold text-zinc-900 leading-snug">
                  "{evi.claim}"
                </h4>

                {evi.supportingText && (
                  <p className="text-xs text-zinc-700 italic bg-white p-2.5 rounded-lg border border-zinc-200/70">
                    "{evi.supportingText}"
                  </p>
                )}

                <div className="pt-2 border-t border-zinc-200/60 flex flex-wrap items-center justify-between text-[11px] text-zinc-700 gap-2">
                  <div>
                    <strong className="text-zinc-800">Reasoning: </strong>
                    <span>{evi.reasoning}</span>
                  </div>
                  {evi.sourceUrl && (
                    <a
                      href={evi.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-700 hover:text-zinc-900 font-medium flex items-center gap-1 shrink-0"
                    >
                      <span>{evi.sourceTitle || 'View Source'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Research Sources Table */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-zinc-700" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
              Retrieved Research Sources ({sources.length})
            </h2>
          </div>
          <span className="text-xs text-zinc-700">
            Deduplicated & scored by domain credibility
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-700 uppercase font-semibold text-[10px]">
                <th className="pb-2">Source Title & Domain</th>
                <th className="pb-2">Type</th>
                <th className="pb-2">Credibility Score</th>
                <th className="pb-2">Retrieved Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {sources.map((src) => (
                <tr key={src.id} className="py-2.5">
                  <td className="py-2.5 pr-4">
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-zinc-900 hover:underline flex items-center gap-1.5"
                    >
                      <span className="truncate max-w-xs">{src.title}</span>
                      <ExternalLink className="w-3 h-3 text-zinc-600 shrink-0" />
                    </a>
                    <span className="text-[11px] text-zinc-700">{src.domain}</span>
                  </td>
                  <td className="py-2.5 pr-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-100 text-zinc-800 border border-zinc-200">
                      {src.sourceType}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4">
                    <span
                      className={`font-mono font-bold ${
                        src.credibility >= 0.9
                          ? 'text-emerald-700'
                          : src.credibility >= 0.7
                          ? 'text-blue-700'
                          : 'text-amber-700'
                      }`}
                    >
                      {src.credibility.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-2.5 text-zinc-700 max-w-sm line-clamp-2">
                    {src.summary}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
