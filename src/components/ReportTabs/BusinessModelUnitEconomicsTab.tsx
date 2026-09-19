import React, { useState } from 'react';
import {
  DollarSign,
  Calculator,
  Sliders,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { BusinessModelOption, UnitEconomicsModel, MVPPlan } from '../../types';

interface BusinessModelTabProps {
  businessModel: {
    primaryModel: string;
    options: BusinessModelOption[];
    unitEconomicsScenario: UnitEconomicsModel;
  };
  mvp: MVPPlan;
}

export const BusinessModelUnitEconomicsTab: React.FC<BusinessModelTabProps> = ({
  businessModel,
  mvp,
}) => {
  const initial = businessModel.unitEconomicsScenario;

  // Interactive scenario state
  const [arpu, setArpu] = useState<number>(initial.arpu || 25);
  const [grossMargin, setGrossMargin] = useState<number>(initial.grossMarginPercent || 80);
  const [cac, setCac] = useState<number>(initial.cac || 60);
  const [churn, setChurn] = useState<number>(initial.monthlyChurnPercent || 3.5);

  // Dynamic calculations
  const monthlyContribution = arpu * (grossMargin / 100);
  const churnFraction = Math.max(churn / 100, 0.005);
  const calculatedLtv = Math.round((monthlyContribution / churnFraction) * 100) / 100;
  const paybackMonths = Math.round((cac / Math.max(monthlyContribution, 0.1)) * 10) / 10;
  const ltvCacRatio = Math.round((calculatedLtv / Math.max(cac, 1)) * 10) / 10;

  return (
    <div className="space-y-8">
      {/* Interactive Unit Economics Scenario Simulator (Section 17) */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-zinc-700" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
              Unit Economics Scenario Simulator (Section 17)
            </h2>
          </div>
          <span className="text-[11px] font-mono text-zinc-700">
            Formula: LTV ≈ ARPU × GM% / Churn%
          </span>
        </div>

        <p className="text-xs text-zinc-700 mb-6">
          Adjust the variables below to evaluate sensitivity and test unit economic viability.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-4 bg-zinc-50 p-5 rounded-xl border border-zinc-200">
            {/* ARPU */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-zinc-800 mb-1">
                <span>Average Monthly Revenue Per User (ARPU):</span>
                <span className="font-mono text-zinc-900">${arpu}</span>
              </div>
              <input
                type="range"
                min="5"
                max="300"
                step="5"
                value={arpu}
                onChange={(e) => setArpu(Number(e.target.value))}
                className="w-full accent-zinc-900"
              />
            </div>

            {/* Gross Margin */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-zinc-800 mb-1">
                <span>Gross Margin %:</span>
                <span className="font-mono text-zinc-900">{grossMargin}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="95"
                step="5"
                value={grossMargin}
                onChange={(e) => setGrossMargin(Number(e.target.value))}
                className="w-full accent-zinc-900"
              />
            </div>

            {/* CAC */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-zinc-800 mb-1">
                <span>Customer Acquisition Cost (CAC):</span>
                <span className="font-mono text-zinc-900">${cac}</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="5"
                value={cac}
                onChange={(e) => setCac(Number(e.target.value))}
                className="w-full accent-zinc-900"
              />
            </div>

            {/* Monthly Churn */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-zinc-800 mb-1">
                <span>Monthly Churn %:</span>
                <span className="font-mono text-zinc-900">{churn}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={churn}
                onChange={(e) => setChurn(Number(e.target.value))}
                className="w-full accent-zinc-900"
              />
            </div>
          </div>

          {/* Results Summary Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div className="p-4 bg-zinc-900 text-white rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Modeled Lifetime Value (LTV)
              </span>
              <span className="text-2xl font-black text-emerald-400 mt-2">
                ${calculatedLtv}
              </span>
              <span className="text-[10px] text-zinc-400 mt-1">Based on {churn}% monthly churn</span>
            </div>

            <div className="p-4 bg-zinc-900 text-white rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                CAC Payback Period
              </span>
              <span className="text-2xl font-black text-zinc-100 mt-2">
                {paybackMonths} <span className="text-xs font-normal text-zinc-400">months</span>
              </span>
              <span className="text-[10px] text-zinc-400 mt-1">Target: &lt; 12 months</span>
            </div>

            <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">
                LTV : CAC Ratio
              </span>
              <span
                className={`text-2xl font-black mt-2 ${
                  ltvCacRatio >= 3.0 ? 'text-emerald-700' : ltvCacRatio >= 2.0 ? 'text-amber-700' : 'text-rose-700'
                }`}
              >
                {ltvCacRatio}x
              </span>
              <span className="text-[10px] text-zinc-700 mt-1">Target benchmark: ≥ 3.0x</span>
            </div>

            <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">
                Monthly Net Margin
              </span>
              <span className="text-2xl font-black text-zinc-900 mt-2">
                ${monthlyContribution.toFixed(2)}
              </span>
              <span className="text-[10px] text-zinc-700 mt-1">Per active account</span>
            </div>
          </div>
        </div>

        {/* Mandatory Heuristic Disclaimer (Section 17) */}
        <div className="mt-5 p-3.5 bg-amber-50/80 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">Simplified Scenario Model Notice: </strong>
            <span>{initial.disclaimer}</span>
          </div>
        </div>
      </div>

      {/* Business Model Options (Section 16) */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="w-4 h-4 text-zinc-700" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
            Evaluated Business Models & Pricing Hypotheses (Section 16)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {businessModel.options.map((opt, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-zinc-100">
                  <h3 className="text-base font-bold text-zinc-900">{opt.model}</h3>
                  {idx === 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm bg-emerald-100 text-emerald-900 border border-emerald-200">
                      Primary
                    </span>
                  )}
                </div>

                <p className="text-xs text-zinc-700 mb-3">{opt.whyItCouldWork}</p>

                <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200/80 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-700 block mb-1">
                    Pricing Hypothesis
                  </span>
                  <span className="text-xs font-semibold text-zinc-900">{opt.pricingHypothesis}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                      Advantages
                    </span>
                    <ul className="space-y-0.5 list-disc pl-3 text-zinc-700 text-[11px]">
                      {opt.advantages.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 block mb-1">
                      Key Risks
                    </span>
                    <ul className="space-y-0.5 list-disc pl-3 text-zinc-700 text-[11px]">
                      {opt.risks.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {opt.assumptions && opt.assumptions.length > 0 && (
                <div className="pt-2 border-t border-zinc-100 text-[11px] text-zinc-700">
                  <strong className="text-zinc-800">Assumption: </strong>
                  <span>{opt.assumptions.join('; ')}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MVP Feature Scope Matrix (Section 18) */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-zinc-700" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
              MVP Feature Scope & Anti-Bloat Matrix (Section 18)
            </h2>
          </div>
          <span className="text-xs font-medium text-zinc-700">
            Timeline: {mvp.targetTimeline}
          </span>
        </div>

        <p className="text-xs text-zinc-700 mb-5">
          <strong className="text-zinc-900">Core Hypothesis Being Tested: </strong>
          {mvp.coreHypothesis}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Must Build */}
          <div className="p-4 bg-emerald-50/40 rounded-xl border border-emerald-200">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-900 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Must Build (Core Loop)</span>
            </div>
            <div className="space-y-3">
              {mvp.features
                .filter((f) => f.priority === 'MUST_BUILD')
                .map((f, i) => (
                  <div key={i} className="p-2.5 bg-white rounded-lg border border-emerald-100 text-xs shadow-2xs">
                    <span className="font-bold text-zinc-900 block mb-0.5">{f.feature}</span>
                    <p className="text-zinc-700 text-[11px]">{f.reason}</p>
                    <span className="text-[10px] text-emerald-700 font-medium block mt-1">
                      Tests: {f.hypothesisTested}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Avoid / Defer */}
          <div className="p-4 bg-rose-50/40 rounded-xl border border-rose-200">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-900 mb-3">
              <XCircle className="w-4 h-4 text-rose-700" />
              <span>Explicitly Avoid / Defer (Scope Creep)</span>
            </div>
            <div className="space-y-3">
              {mvp.features
                .filter((f) => f.priority === 'AVOID')
                .map((f, i) => (
                  <div key={i} className="p-2.5 bg-white rounded-lg border border-rose-100 text-xs shadow-2xs">
                    <span className="font-bold text-zinc-900 block mb-0.5">{f.feature}</span>
                    <p className="text-zinc-700 text-[11px]">{f.reason}</p>
                    <span className="text-[10px] text-rose-700 font-medium block mt-1">
                      Tests: {f.hypothesisTested}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
