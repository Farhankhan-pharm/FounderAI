import React from 'react';
import { Sparkles, CheckCircle2, Clock, Activity, Cpu, Search, DollarSign } from 'lucide-react';
import { AnalysisJob } from '../types';

interface AnalysisJobProgressProps {
  job: AnalysisJob;
}

export const AnalysisJobProgress: React.FC<AnalysisJobProgressProps> = ({ job }) => {
  return (
    <div className="bg-white rounded-xl border border-zinc-200 shadow-xs p-6 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4 animate-spin" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-900 tracking-tight">
              Executing Research & Validation Pipeline
            </h3>
            <p className="text-xs text-zinc-700">{job.currentStep}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-zinc-900 bg-zinc-100 px-2 py-1 rounded-md border border-zinc-200">
            {job.progressPercent}%
          </span>
          <span className="px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase rounded-sm bg-blue-100 text-blue-900 border border-blue-200">
            {job.status}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-zinc-100 rounded-full h-2 mb-4 overflow-hidden">
        <div
          className="bg-zinc-900 h-2 rounded-full transition-all duration-300"
          style={{ width: `${job.progressPercent}%` }}
        />
      </div>

      {/* Steps Completed Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 my-4">
        {job.stepsCompleted.map((step, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 text-xs text-zinc-800 bg-zinc-50 px-2.5 py-1.5 rounded-md border border-zinc-200/80"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">{step}</span>
          </div>
        ))}
      </div>

      {/* Telemetry Footer */}
      {job.metrics && (
        <div className="pt-3 border-t border-zinc-100 flex flex-wrap items-center justify-between text-[11px] text-zinc-700 gap-4">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-zinc-600" />
            <span>AI Calls: {job.metrics.aiCalls}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-zinc-600" />
            <span>Search Requests: {job.metrics.searchRequests}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-zinc-600" />
            <span>Tokens: {(job.metrics.inputTokens + job.metrics.outputTokens).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-600" />
            <span>Elapsed: {Math.round(job.metrics.processingTimeMs / 1000)}s</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-zinc-600" />
            <span>Est. Cost: ${job.metrics.estimatedCostUSD}</span>
          </div>
        </div>
      )}
    </div>
  );
};
