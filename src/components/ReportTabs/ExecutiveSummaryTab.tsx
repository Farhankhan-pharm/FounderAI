import React from 'react';
import {
  FileText,
  AlertCircle,
  Lightbulb,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { StartupAnalysis } from '../../types';

interface ExecutiveSummaryTabProps {
  analysis: StartupAnalysis;
}

export const ExecutiveSummaryTab: React.FC<ExecutiveSummaryTabProps> = ({ analysis }) => {
  return (
    <div className="space-y-6">
      {/* Executive Summary Card */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-zinc-700" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
            Executive Briefing & Strategic Synthesis
          </h2>
        </div>
        <p className="text-sm text-zinc-800 leading-relaxed font-normal">
          {analysis.executiveSummary}
        </p>

        {/* Critical Conditions */}
        {analysis.recommendation?.criticalConditions && analysis.recommendation.criticalConditions.length > 0 && (
          <div className="mt-5 p-4 bg-amber-50/80 rounded-lg border border-amber-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
              Critical Conditions Prior to Capital Outlay
            </h4>
            <ul className="space-y-1.5">
              {analysis.recommendation.criticalConditions.map((cond, idx) => (
                <li key={idx} className="text-xs text-amber-900 flex items-start gap-2">
                  <span className="font-bold text-amber-700">•</span>
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Problem vs Solution Framing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-rose-700">
            <AlertCircle className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Identified Customer Problem</h3>
          </div>
          <p className="text-xs text-zinc-800 leading-relaxed font-medium">
            {analysis.problemStatement}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-emerald-700">
            <Lightbulb className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Proposed Value Wedge</h3>
          </div>
          <p className="text-xs text-zinc-800 leading-relaxed font-medium">
            {analysis.proposedSolution}
          </p>
        </div>
      </div>

      {/* Defensibility Moat & Vulnerabilities */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-3 flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-zinc-700" />
          Differentiation Strategy & Moat Analysis
        </h3>
        <p className="text-xs text-zinc-700 mb-4">
          <strong className="text-zinc-900">Core Defensibility Moat:</strong>{' '}
          {analysis.differentiationStrategy?.coreMoat}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200/80">
            <span className="text-[11px] font-bold text-emerald-800 block mb-2 uppercase tracking-wide">
              Structural Defensibility Factors
            </span>
            <ul className="space-y-1.5">
              {analysis.differentiationStrategy?.defensibilityFactors.map((f, i) => (
                <li key={i} className="text-xs text-zinc-700 flex items-start gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200/80">
            <span className="text-[11px] font-bold text-rose-800 block mb-2 uppercase tracking-wide">
              Key Vulnerabilities
            </span>
            <ul className="space-y-1.5">
              {analysis.differentiationStrategy?.vulnerabilities.map((v, i) => (
                <li key={i} className="text-xs text-zinc-700 flex items-start gap-1.5">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Critical Assumptions Audit */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-zinc-700" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              Core Assumptions Audit (Section 22)
            </h3>
          </div>
          <span className="text-[11px] text-zinc-700">
            Assumptions require empirical validation
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-700 uppercase font-semibold text-[10px]">
                <th className="pb-2">Assumption</th>
                <th className="pb-2">Criticality</th>
                <th className="pb-2">Current Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {analysis.assumptions.map((ass, idx) => (
                <tr key={idx} className="py-2.5">
                  <td className="py-2.5 pr-4 text-zinc-800 font-medium">{ass.assumption}</td>
                  <td className="py-2.5 pr-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ass.criticality === 'FATAL'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {ass.criticality}
                    </span>
                  </td>
                  <td className="py-2.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        ass.status === 'TESTING'
                          ? 'bg-blue-100 text-blue-800'
                          : ass.status === 'VALIDATED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-zinc-100 text-zinc-700'
                      }`}
                    >
                      {ass.status}
                    </span>
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
