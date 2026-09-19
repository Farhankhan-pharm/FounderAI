import React, { useState } from 'react';
import {
  Rocket,
  FlaskConical,
  Compass,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  Target,
  ArrowRight,
  ListTodo,
} from 'lucide-react';
import { GTMStrategy, ValidationExperiment, RoadmapItem } from '../../types';

interface GtmExperimentsTabProps {
  gtm: GTMStrategy;
  experiments: ValidationExperiment[];
  roadmap: RoadmapItem[];
  onUpdateExperimentStatus?: (experimentId: string, newStatus: ValidationExperiment['status']) => void;
}

export const GtmExperimentsTab: React.FC<GtmExperimentsTabProps> = ({
  gtm,
  experiments: initialExperiments,
  roadmap,
  onUpdateExperimentStatus,
}) => {
  const [experiments, setExperiments] = useState<ValidationExperiment[]>(initialExperiments);

  const handleStatusToggle = (id: string) => {
    setExperiments((prev) =>
      prev.map((exp) => {
        if (exp.id === id) {
          const nextStatus: ValidationExperiment['status'] =
            exp.status === 'PROPOSED'
              ? 'IN_PROGRESS'
              : exp.status === 'IN_PROGRESS'
              ? 'COMPLETED'
              : 'PROPOSED';
          if (onUpdateExperimentStatus) {
            onUpdateExperimentStatus(id, nextStatus);
          }
          return { ...exp, status: nextStatus };
        }
        return exp;
      })
    );
  };

  return (
    <div className="space-y-8">
      {/* Go-To-Market Strategy Card (Section 20) */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Rocket className="w-4 h-4 text-zinc-700" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
            Go-To-Market & Initial Wedge Strategy (Section 20)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-700 block mb-1">
              Primary Distribution Channel
            </span>
            <span className="text-sm font-bold text-zinc-900 block mb-2">{gtm.primaryChannel}</span>
            <p className="text-xs text-zinc-700 leading-relaxed">{gtm.reason}</p>
          </div>

          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-700 block mb-1">
              Secondary Distribution Channels
            </span>
            <ul className="space-y-1.5 text-xs text-zinc-700">
              {gtm.secondaryChannels.map((ch, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-zinc-600 font-bold">•</span>
                  <span>{ch}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* First Campaign Proposal */}
        <div className="p-4 bg-zinc-900 text-white rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              First Validation Campaign:
            </span>
            <p className="text-xs text-zinc-200 font-medium">{gtm.firstCampaign}</p>
            <div className="mt-2 text-[11px] text-zinc-400 italic">
              Core Message: {gtm.message}
            </div>
          </div>

          <div className="shrink-0 p-2.5 bg-zinc-800 rounded-lg border border-zinc-700 text-xs text-zinc-300 max-w-xs">
            <strong className="text-white block mb-0.5">Campaign Test:</strong>
            {gtm.experiment}
          </div>
        </div>
      </div>

      {/* Validation Experiments Suite (Section 19) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-zinc-700" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
              Validation Experiments (Section 19)
            </h2>
          </div>
          <span className="text-xs text-zinc-700">
            Click status pill to toggle progress
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {experiments.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-zinc-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-zinc-100 text-zinc-800 border border-zinc-200">
                    {exp.method.replace(/_/g, ' ')}
                  </span>

                  <button
                    onClick={() => handleStatusToggle(exp.id)}
                    className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border transition-colors ${
                      exp.status === 'COMPLETED'
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : exp.status === 'IN_PROGRESS'
                        ? 'bg-blue-100 text-blue-900 border-blue-300'
                        : 'bg-zinc-100 text-zinc-700 border-zinc-300'
                    }`}
                  >
                    {exp.status.replace(/_/g, ' ')}
                  </button>
                </div>

                <p className="text-xs font-semibold text-zinc-900 mb-3 leading-snug">
                  "{exp.hypothesis}"
                </p>

                <div className="flex items-center justify-between text-[11px] text-zinc-700 mb-3 p-2 bg-zinc-50 rounded-lg border border-zinc-200/80">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-zinc-600" />
                    <span>N = {exp.targetParticipants}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-zinc-600" />
                    <span>{exp.estimatedTime}</span>
                  </div>
                  <span
                    className={`font-bold ${
                      exp.priority === 'HIGH' ? 'text-rose-600' : 'text-amber-600'
                    }`}
                  >
                    {exp.priority} Priority
                  </span>
                </div>

                {/* Criteria */}
                <div className="space-y-2 text-xs mb-2">
                  <div className="p-2.5 bg-emerald-50/40 rounded-lg border border-emerald-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Success Criteria
                    </span>
                    <ul className="space-y-0.5 text-[11px] text-zinc-700">
                      {exp.successCriteria.map((c, i) => (
                        <li key={i}>✓ {c}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-2.5 bg-rose-50/40 rounded-lg border border-rose-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 block mb-1 flex items-center gap-1">
                      <XCircle className="w-3 h-3 text-rose-600" />
                      Failure Criteria (Stop / Pivot)
                    </span>
                    <ul className="space-y-0.5 text-[11px] text-zinc-700">
                      {exp.failureCriteria.map((f, i) => (
                        <li key={i}>✕ {f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Execution Roadmap Phases */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <ListTodo className="w-4 h-4 text-zinc-700" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
            Execution Roadmap & Milestone Sequence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roadmap.map((item, idx) => (
            <div
              key={item.id}
              className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-700">
                    Phase {idx + 1}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-sm bg-zinc-200/80 text-zinc-800">
                    {item.estimatedDuration}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-zinc-900 mb-1">{item.title}</h4>
                <p className="text-xs text-zinc-700">{item.description}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-zinc-200/80 flex items-center justify-between text-[11px]">
                <span className="text-zinc-700">Priority: {item.priority}</span>
                <span className="font-semibold text-zinc-800">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
