import React from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  GitCompare,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { RiskItem, ContradictionAlert } from '../../types';

interface RisksContradictionsTabProps {
  risks: RiskItem[];
  contradictions: ContradictionAlert[];
}

export const RisksContradictionsTab: React.FC<RisksContradictionsTabProps> = ({
  risks,
  contradictions,
}) => {
  // Sort risks by severity descending
  const sortedRisks = [...risks].sort((a, b) => b.severity - a.severity);

  return (
    <div className="space-y-8">
      {/* Contradiction Alerts (Section 24) */}
      {contradictions && contradictions.length > 0 && (
        <div className="bg-amber-50/60 rounded-xl border border-amber-300 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-amber-700" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-amber-950">
                Contradiction Detector Alerts (Section 24)
              </h2>
            </div>
            <span className="text-xs font-semibold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-md">
              {contradictions.length} Conflicting Evidence Signal
            </span>
          </div>

          <p className="text-xs text-amber-900 mb-5">
            The multi-agent research pipeline detected conflicting data between credible external sources.
            Our synthesis engine highlights these trade-offs to prevent false certainty.
          </p>

          <div className="space-y-4">
            {contradictions.map((contra) => (
              <div
                key={contra.id}
                className="bg-white rounded-xl border border-amber-200 p-5 shadow-2xs"
              >
                <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-3">
                  Topic: {contra.topic}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200">
                    <span className="text-[10px] font-bold uppercase text-blue-700 block mb-1">
                      Claim A: {contra.claimA.source} (Credibility: {contra.claimA.credibility})
                    </span>
                    <p className="text-xs text-zinc-800">"{contra.claimA.statement}"</p>
                  </div>

                  <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200">
                    <span className="text-[10px] font-bold uppercase text-purple-700 block mb-1">
                      Claim B: {contra.claimB.source} (Credibility: {contra.claimB.credibility})
                    </span>
                    <p className="text-xs text-zinc-800">"{contra.claimB.statement}"</p>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200/80 text-xs text-amber-950 space-y-1">
                  <div>
                    <strong className="font-bold">Synthesis Resolution: </strong>
                    <span>{contra.synthesisNote}</span>
                  </div>
                  <div className="text-[11px] text-amber-800">
                    <strong className="font-semibold">Confidence Impact: </strong>
                    <span>{contra.confidenceImpact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Forensic Risk Matrix (Section 21) */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-zinc-700" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
              Forensic Risk Matrix & Mitigations (Section 21)
            </h2>
          </div>
          <span className="text-xs text-zinc-700">
            Ranked by Severity Score (Probability × Impact)
          </span>
        </div>

        <div className="space-y-4">
          {sortedRisks.map((risk) => {
            const severityColor =
              risk.severity >= 15
                ? 'text-rose-700 bg-rose-50 border-rose-200'
                : risk.severity >= 10
                ? 'text-amber-700 bg-amber-50 border-amber-200'
                : 'text-blue-700 bg-blue-50 border-blue-200';

            return (
              <div
                key={risk.id}
                className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm bg-zinc-200/80 text-zinc-800 border border-zinc-300/60">
                      {risk.category}
                    </span>
                    <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-sm border ${severityColor}`}>
                      Severity: {risk.severity} / 25
                    </span>
                    <span className="text-[11px] text-zinc-700">
                      (Prob: {risk.probability}/5 • Imp: {risk.impact}/5)
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-zinc-900 my-1">{risk.risk}</h4>

                  <div className="mt-2 text-zinc-700">
                    <strong className="text-zinc-900">Strategic Mitigation: </strong>
                    <span>{risk.mitigation}</span>
                  </div>

                  {risk.evidence && risk.evidence.length > 0 && (
                    <div className="mt-1.5 text-[11px] text-zinc-700">
                      <strong>Basis: </strong>
                      <span>{risk.evidence.join('; ')}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
