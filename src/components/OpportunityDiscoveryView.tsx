import React, { useState, useEffect } from 'react';
import {
  Compass,
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Target,
  FlaskConical,
  Zap,
} from 'lucide-react';
import { DiscoveredOpportunity } from '../types';

interface OpportunityDiscoveryViewProps {
  onPromoteOpportunity: (opp: DiscoveredOpportunity) => void;
}

export const OpportunityDiscoveryView: React.FC<OpportunityDiscoveryViewProps> = ({
  onPromoteOpportunity,
}) => {
  const [industry, setIndustry] = useState('Commercial Trade Operations & Logistics');
  const [geography, setGeography] = useState('United States');
  const [budget, setBudget] = useState('$20,000');
  const [riskTolerance, setRiskTolerance] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
  const [opportunities, setOpportunities] = useState<DiscoveredOpportunity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOpportunities = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/opportunities/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry, geography, budget, riskTolerance }),
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setOpportunities(data);
      }
    } catch (err) {
      console.error('Failed to discover opportunities:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  return (
    <div className="space-y-6">
      {/* Engine Header & Parameters */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-white">
              <Compass className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-base font-bold text-zinc-900 tracking-tight">
                Opportunity Discovery & Venture Scout Engine (Sections 32, 33)
              </h1>
              <p className="text-xs text-zinc-700">
                Surfacing evidenced market gaps from customer complaints, regulatory shifts, and workflow bottlenecks.
              </p>
            </div>
          </div>

          <button
            onClick={fetchOpportunities}
            disabled={isLoading}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-200 text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center gap-2 self-start md:self-auto"
          >
            <Sparkles className={`w-3.5 h-3.5 text-emerald-400 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Scouting Gaps...' : 'Discover Evidenced Gaps'}</span>
          </button>
        </div>

        {/* Filter Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-zinc-100 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-zinc-700 mb-1">Target Sector</label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-300 rounded-lg p-2 text-zinc-900"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-zinc-700 mb-1">Geography</label>
            <input
              type="text"
              value={geography}
              onChange={(e) => setGeography(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-300 rounded-lg p-2 text-zinc-900"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-zinc-700 mb-1">Target Initial Budget</label>
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-300 rounded-lg p-2 text-zinc-900"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-zinc-700 mb-1">Risk Profile</label>
            <select
              value={riskTolerance}
              onChange={(e) => setRiskTolerance(e.target.value as any)}
              className="w-full bg-zinc-50 border border-zinc-300 rounded-lg p-2 text-zinc-900"
            >
              <option value="LOW">Low (Proven playbook, lower margin)</option>
              <option value="MEDIUM">Medium (Balanced workflow wedge)</option>
              <option value="HIGH">High (Regulatory or high-friction disruption)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Discovered Opportunities Grid */}
      <div className="space-y-4">
        {opportunities.map((opp, idx) => (
          <div
            key={opp.id}
            className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs hover:border-zinc-300 transition-colors"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-zinc-700">#{idx + 1}</span>
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm bg-zinc-100 text-zinc-800 border border-zinc-200">
                    {opp.industry}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm border ${
                      opp.difficulty === 'LOW'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : opp.difficulty === 'MEDIUM'
                        ? 'bg-blue-50 text-blue-800 border-blue-200'
                        : 'bg-rose-50 text-rose-800 border-rose-200'
                    }`}
                  >
                    {opp.difficulty} Execution Complexity
                  </span>
                </div>
                <h3 className="text-lg font-bold text-zinc-900">{opp.name}</h3>
                <p className="text-xs text-zinc-700 mt-0.5">{opp.problem}</p>
              </div>

              {/* Score and Promotion CTA */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-700 block">
                    Opportunity Score
                  </span>
                  <span className="text-2xl font-black text-zinc-900">
                    {opp.opportunityScore}
                    <span className="text-xs font-normal text-zinc-600"> / 100</span>
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold block">
                    {opp.confidence}% Confidence
                  </span>
                </div>

                <button
                  onClick={() => onPromoteOpportunity(opp)}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <span>Promote to Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Strategic Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 text-xs">
              <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200/80">
                <strong className="text-zinc-900 block mb-0.5">Target Buyer Archetype:</strong>
                <span className="text-zinc-700">{opp.customer}</span>
              </div>

              <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200/80">
                <strong className="text-zinc-900 block mb-0.5">Why Now Catalyst:</strong>
                <span className="text-zinc-700">{opp.whyNow}</span>
              </div>

              <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200/80">
                <strong className="text-zinc-900 block mb-0.5">Monetization Model:</strong>
                <span className="text-zinc-700">{opp.businessModel}</span>
              </div>
            </div>

            {/* Differentiation & 7-Day Plan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-3">
              <div className="p-3 bg-emerald-50/40 rounded-lg border border-emerald-100">
                <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-900 block mb-1 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-emerald-700" />
                  Structural Wedge & Differentiation
                </span>
                <p className="text-zinc-800 text-xs">{opp.differentiation}</p>
              </div>

              <div className="p-3 bg-blue-50/40 rounded-lg border border-blue-100">
                <span className="text-[10px] font-bold uppercase tracking-wide text-blue-900 block mb-1 flex items-center gap-1">
                  <FlaskConical className="w-3 h-3 text-blue-700" />
                  Immediate 7-Day Validation Experiment
                </span>
                <p className="text-zinc-800 text-xs">{opp.validationPlan}</p>
              </div>
            </div>

            {/* Evidentiary Claims */}
            {opp.evidence && opp.evidence.length > 0 && (
              <div className="pt-2.5 border-t border-zinc-100 flex flex-wrap items-center gap-3 text-[11px] text-zinc-700">
                <span className="font-semibold text-zinc-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Evidentiary Signal:
                </span>
                {opp.evidence.map((evi, i) => (
                  <span key={i} className="bg-zinc-50 px-2 py-0.5 rounded border border-zinc-200">
                    "{evi.claim}" — <strong className="text-zinc-800">{evi.source}</strong>
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
