import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  AlertTriangle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Scale,
  Sparkles,
  TrendingUp,
  FileCheck2,
  Calendar,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { StartupAnalysis, StartupProject } from '../types';

interface ScoreOverviewCardProps {
  project: StartupProject;
  analysis: StartupAnalysis;
}

export const ScoreOverviewCard: React.FC<ScoreOverviewCardProps> = ({ project, analysis }) => {
  const [showMethodology, setShowMethodology] = useState(false);

  const getVerdictStyle = (verdict: string) => {
    switch (verdict) {
      case 'STRONG_GO':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          dot: 'bg-emerald-500',
          title: 'STRONG GO',
        };
      case 'CONDITIONAL_GO':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-300',
          dot: 'bg-amber-500',
          title: 'CONDITIONAL GO',
        };
      case 'PIVOT_RECOMMENDED':
        return {
          bg: 'bg-purple-50 text-purple-800 border-purple-300',
          dot: 'bg-purple-500',
          title: 'PIVOT RECOMMENDED',
        };
      case 'HIGH_RISK_DO_NOT_BUILD':
      default:
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-300',
          dot: 'bg-rose-500',
          title: 'HIGH RISK: DO NOT BUILD',
        };
    }
  };

  const verdictStyle = getVerdictStyle(analysis.recommendation?.verdict || 'CONDITIONAL_GO');

  return (
    <div className="bg-white rounded-xl border border-zinc-200 shadow-xs overflow-hidden mb-6">
      {/* Top Banner & Metadata */}
      <div className="bg-zinc-50 border-b border-zinc-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-zinc-900 tracking-tight">{project.name}</h1>
            {project.isDemo && (
              <span className="px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase rounded-sm bg-amber-100 text-amber-900 border border-amber-300">
                DEMO DATA
              </span>
            )}
            <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-zinc-200/80 text-zinc-800 border border-zinc-300/60">
              {project.stage.replace(/_/g, ' ')}
            </span>
          </div>
          <p className="text-xs text-zinc-700 mt-1">
            {project.industry} • {project.geography} • Budget: {project.budget}
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs text-zinc-700">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-zinc-600" />
            <span>Researched: {new Date(analysis.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-zinc-600" />
            <span>Version {analysis.version}</span>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Opportunity Score */}
        <div className="md:col-span-3 flex flex-col items-center justify-center p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-center">
          <div className="flex items-center gap-1 text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1">
            <Award className="w-3.5 h-3.5 text-zinc-700" />
            <span>AI Opportunity Score</span>
          </div>
          <div className="text-4xl font-extrabold text-zinc-900 tracking-tight my-1">
            {analysis.overallScore}
            <span className="text-lg text-zinc-600 font-normal"> / 100</span>
          </div>
          <p className="text-[11px] text-zinc-700 max-w-[180px]">
            Deterministic weighted analysis of demand, friction, and economics
          </p>
        </div>

        {/* Evidentiary Confidence Score */}
        <div className="md:col-span-3 flex flex-col items-center justify-center p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-center">
          <div className="flex items-center gap-1 text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Evidentiary Confidence</span>
          </div>
          <div className="text-4xl font-extrabold text-emerald-700 tracking-tight my-1">
            {analysis.confidence}%
          </div>
          <p className="text-[11px] text-zinc-700 max-w-[180px]">
            {analysis.confidenceDetails?.summary || 'Grounded in external sources & verified citations'}
          </p>
        </div>

        {/* Recommendation Verdict & Next Action */}
        <div className="md:col-span-6 flex flex-col justify-between h-full bg-white p-4 rounded-xl border border-zinc-200">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                Platform Recommendation
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${verdictStyle.bg}`}
              >
                <span className={`w-2 h-2 rounded-full ${verdictStyle.dot}`} />
                {verdictStyle.title}
              </span>
            </div>
            <p className="text-sm font-medium text-zinc-800 leading-snug">
              {analysis.recommendation?.primaryReason}
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-zinc-100 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-zinc-900">Immediate Next Action: </span>
              <span className="text-xs text-zinc-700">
                {analysis.recommendation?.immediateNextAction}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Methodology Toggle Footer */}
      <div className="px-6 py-2.5 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between">
        <button
          id="btn-toggle-methodology"
          onClick={() => setShowMethodology(!showMethodology)}
          className="text-xs font-semibold text-zinc-700 hover:text-zinc-900 flex items-center gap-1.5 transition-colors"
        >
          <Scale className="w-3.5 h-3.5 text-zinc-600" />
          <span>{showMethodology ? 'Hide' : 'View'} Deterministic Scoring Methodology (9 Dimensions)</span>
          {showMethodology ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <span className="text-[11px] text-zinc-600 hidden sm:inline">
          Never optimizes to flatter • Calculated using transparent weights
        </span>
      </div>

      {/* Expandable Deterministic Methodology Breakdown */}
      {showMethodology && (
        <div className="p-6 bg-zinc-900 text-zinc-100 border-t border-zinc-800 transition-all">
          <div className="mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Scoring Methodology & Dimension Matrix
            </h4>
            <p className="text-xs text-zinc-400 mt-0.5">
              {analysis.scores.methodology}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <div className="bg-zinc-800/80 p-3 rounded-lg border border-zinc-700/60">
              <span className="text-[11px] text-zinc-400 block font-medium">Market Demand (20%)</span>
              <span className="text-lg font-bold text-white">{analysis.scores.marketDemand}</span>
            </div>
            <div className="bg-zinc-800/80 p-3 rounded-lg border border-zinc-700/60">
              <span className="text-[11px] text-zinc-400 block font-medium">Customer Pain (15%)</span>
              <span className="text-lg font-bold text-white">{analysis.scores.customerPain}</span>
            </div>
            <div className="bg-zinc-800/80 p-3 rounded-lg border border-zinc-700/60">
              <span className="text-[11px] text-zinc-400 block font-medium">Competition (10%)</span>
              <span className="text-lg font-bold text-white">{analysis.scores.competition}</span>
            </div>
            <div className="bg-zinc-800/80 p-3 rounded-lg border border-zinc-700/60">
              <span className="text-[11px] text-zinc-400 block font-medium">Differentiation (15%)</span>
              <span className="text-lg font-bold text-white">{analysis.scores.differentiation}</span>
            </div>
            <div className="bg-zinc-800/80 p-3 rounded-lg border border-zinc-700/60">
              <span className="text-[11px] text-zinc-400 block font-medium">Monetization (15%)</span>
              <span className="text-lg font-bold text-white">{analysis.scores.monetization}</span>
            </div>
            <div className="bg-zinc-800/80 p-3 rounded-lg border border-zinc-700/60">
              <span className="text-[11px] text-zinc-400 block font-medium">Market Timing (10%)</span>
              <span className="text-lg font-bold text-white">{analysis.scores.timing}</span>
            </div>
            <div className="bg-zinc-800/80 p-3 rounded-lg border border-zinc-700/60">
              <span className="text-[11px] text-zinc-400 block font-medium">Distribution (5%)</span>
              <span className="text-lg font-bold text-white">{analysis.scores.distributionDifficulty}</span>
            </div>
            <div className="bg-zinc-800/80 p-3 rounded-lg border border-zinc-700/60">
              <span className="text-[11px] text-zinc-400 block font-medium">Execution (5%)</span>
              <span className="text-lg font-bold text-white">{analysis.scores.executionDifficulty}</span>
            </div>
            <div className="bg-zinc-800/80 p-3 rounded-lg border border-zinc-700/60">
              <span className="text-[11px] text-zinc-400 block font-medium">Risk Profile (5%)</span>
              <span className="text-lg font-bold text-white">{analysis.scores.risk}</span>
            </div>
            <div className="bg-emerald-950/40 p-3 rounded-lg border border-emerald-800/60">
              <span className="text-[11px] text-emerald-400 block font-medium">Confidence Factors</span>
              <span className="text-xs text-zinc-300">
                {analysis.confidenceDetails?.sourceCount || 0} sources •{' '}
                {analysis.confidenceDetails?.untestedAssumptionsCount || 0} assumptions
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
