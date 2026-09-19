import React from 'react';
import { Users, AlertTriangle, Zap, Target, DollarSign, Repeat, CheckCircle } from 'lucide-react';
import { CustomerPersonaItem } from '../../types';

interface CustomerPersonasTabProps {
  personas: CustomerPersonaItem[];
}

export const CustomerPersonasTab: React.FC<CustomerPersonasTabProps> = ({ personas }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
            Target Customer Personas & Pain Scoring (Sections 12, 13)
          </h2>
          <p className="text-xs text-zinc-700 mt-0.5">
            Evaluates Urgency, Frequency, Economic Impact, and Frustration with evidence phrasing
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {personas.map((persona) => {
          const ps = persona.painScore;
          return (
            <div
              key={persona.id}
              className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Persona Header */}
                <div className="flex items-start justify-between gap-4 mb-3 pb-3 border-b border-zinc-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-700 block">
                      {persona.roleDescription}
                    </span>
                    <h3 className="text-base font-bold text-zinc-900 mt-0.5">{persona.name}</h3>
                  </div>

                  {/* Customer Pain Score Badge */}
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-700 block">
                      Pain Score
                    </span>
                    <span className="text-2xl font-black text-rose-600">
                      {ps.overall}
                      <span className="text-xs text-zinc-600 font-normal"> / 100</span>
                    </span>
                  </div>
                </div>

                {/* Evidence Framing Note */}
                <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200/80 mb-4 text-xs text-zinc-700 italic">
                  "{persona.description}"
                </div>

                {/* Pain Score Metrics Bar */}
                <div className="mb-5 p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-700 block mb-1">
                    Analytical Pain Score Breakdown
                  </span>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] text-zinc-700 mb-0.5">
                        <span>Urgency:</span>
                        <span className="font-bold text-zinc-900">{ps.urgency}/100</span>
                      </div>
                      <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-rose-500 h-1.5 rounded-full" style={{ width: `${ps.urgency}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] text-zinc-700 mb-0.5">
                        <span>Frequency:</span>
                        <span className="font-bold text-zinc-900">{ps.frequency}/100</span>
                      </div>
                      <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${ps.frequency}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] text-zinc-700 mb-0.5">
                        <span>Economic Impact:</span>
                        <span className="font-bold text-zinc-900">{ps.economicImpact}/100</span>
                      </div>
                      <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${ps.economicImpact}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] text-zinc-700 mb-0.5">
                        <span>Existing Frustration:</span>
                        <span className="font-bold text-zinc-900">{ps.existingFrustration}/100</span>
                      </div>
                      <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${ps.existingFrustration}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pain Points */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    Key Friction Points
                  </h4>
                  <ul className="space-y-1.5 text-xs text-zinc-700">
                    {persona.painPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buying Triggers & Objections */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200/80">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide block mb-1.5 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-emerald-600" />
                      Buying Triggers
                    </span>
                    <ul className="space-y-1 text-xs text-zinc-700">
                      {persona.buyingTriggers.map((trig, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-600">→</span>
                          <span>{trig}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200/80">
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wide block mb-1.5 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                      Objections
                    </span>
                    <ul className="space-y-1 text-xs text-zinc-700">
                      {persona.objections.map((obj, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-600">✕</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Willingness to Pay & Jobs To Be Done */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-zinc-700">
                    <DollarSign className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-zinc-900">Willingness to Pay: </strong>
                      <span>{persona.willingnessToPay}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-zinc-700">
                    <Target className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-zinc-900">Jobs To Be Done: </strong>
                      <span>{persona.jobsToBeDone.join(' • ')}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-zinc-700">
                    <Repeat className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-zinc-900">Current Workarounds: </strong>
                      <span>{persona.currentAlternatives.join('; ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
