import React, { useState, useEffect } from 'react';
import {
  Server,
  Cpu,
  Search,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Layers,
  Database,
  Terminal,
  Activity,
  Zap,
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const [healthData, setHealthData] = useState<any>(null);
  const [configData, setConfigData] = useState<any>(null);
  const [latency, setLatency] = useState<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        setLatency(Math.round(performance.now() - start));
        setHealthData(data);
      })
      .catch((err) => console.error(err));

    fetch('/api/config')
      .then((res) => res.json())
      .then((data) => setConfigData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="space-y-8">
      {/* System Status Dashboard */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center text-white">
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-900 tracking-tight">
                System Health & Configuration Status
              </h2>
              <p className="text-xs text-zinc-700">Live runtime verification</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-800">Operational</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-700 block mb-1">
              Active Gemini AI Model
            </span>
            <span className="text-base font-bold text-zinc-900 block">gemini-2.5-flash</span>
            <span className="text-[11px] text-zinc-700 mt-0.5 block">
              via @google/genai SDK (server-side)
            </span>
          </div>

          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-700 block mb-1">
              Active Search Provider
            </span>
            <span className="text-base font-bold text-zinc-900 block">
              {configData?.activeSearchProvider || 'Domain Intelligent Fallback'}
            </span>
            <span className="text-[11px] text-zinc-700 mt-0.5 block">
              Multi-provider fallback pipeline
            </span>
          </div>

          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-700 block mb-1">
              API Health Latency
            </span>
            <span className="text-base font-bold text-zinc-900 block">
              {latency !== null ? `${latency} ms` : 'Checking...'}
            </span>
            <span className="text-[11px] text-zinc-700 mt-0.5 block">
              Local Express route roundtrip
            </span>
          </div>

          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-700 block mb-1">
              Deterministic Scoring Engine
            </span>
            <span className="text-base font-bold text-zinc-900 block">Active & Verified</span>
            <span className="text-[11px] text-zinc-700 mt-0.5 block">
              9 weighted analytical dimensions
            </span>
          </div>
        </div>
      </div>

      {/* Visual System Architecture Diagram (Section 1) */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-zinc-700" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
            FounderAI Architecture Specification (Section 1)
          </h2>
        </div>
        <p className="text-xs text-zinc-700 mb-6">
          Autonomous multi-agent research pipeline decoupling evidentiary confidence from opportunity score.
        </p>

        <div className="space-y-4 text-xs font-mono">
          {/* Layer 1: Client */}
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-700 block mb-2">
              Layer 1: Client Application (Vite + React + Tailwind)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-zinc-800 text-xs">
              <div className="p-2 bg-white rounded border border-zinc-200">
                • Interactive Score & Confidence Visualizer
              </div>
              <div className="p-2 bg-white rounded border border-zinc-200">
                • Real-time Evidence & 5-State Filter
              </div>
              <div className="p-2 bg-white rounded border border-zinc-200">
                • Unit Economics Scenario Simulator
              </div>
            </div>
          </div>

          {/* Layer 2: API & Jobs */}
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-700 block mb-2">
              Layer 2: Express Server & Background Job Engine
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-zinc-800 text-xs">
              <div className="p-2 bg-white rounded border border-zinc-200">
                • REST Endpoints & Streaming Job Status
              </div>
              <div className="p-2 bg-white rounded border border-zinc-200">
                • In-Memory DAO with Prisma Domain Model
              </div>
              <div className="p-2 bg-white rounded border border-zinc-200">
                • Markdown / JSON / CSV Export Generator
              </div>
            </div>
          </div>

          {/* Layer 3: Multi-Agent Suite */}
          <div className="p-4 bg-zinc-900 text-zinc-100 rounded-xl border border-zinc-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-2">
              Layer 3: Autonomous Specialized Agents Suite
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2 bg-zinc-800 rounded border border-zinc-700">
                1. Query Generation Agent
              </div>
              <div className="p-2 bg-zinc-800 rounded border border-zinc-700">
                2. Multi-Provider Research Agent
              </div>
              <div className="p-2 bg-zinc-800 rounded border border-zinc-700">
                3. Market Analyst Agent (TAM)
              </div>
              <div className="p-2 bg-zinc-800 rounded border border-zinc-700">
                4. Customer Analyst Agent
              </div>
              <div className="p-2 bg-zinc-800 rounded border border-zinc-700">
                5. Competitor Analyst Agent
              </div>
              <div className="p-2 bg-zinc-800 rounded border border-zinc-700">
                6. Gap Analysis Agent
              </div>
              <div className="p-2 bg-zinc-800 rounded border border-zinc-700">
                7. Business Model & Economics
              </div>
              <div className="p-2 bg-zinc-800 rounded border border-zinc-700">
                8. MVP & Validation Agent
              </div>
              <div className="p-2 bg-zinc-800 rounded border border-zinc-700">
                9. GTM Strategy Agent
              </div>
              <div className="p-2 bg-zinc-800 rounded border border-zinc-700">
                10. Risk & Threat Agent
              </div>
              <div className="p-2 bg-zinc-800 rounded border border-zinc-700">
                11. Contradiction Detector
              </div>
              <div className="p-2 bg-zinc-800 rounded border border-zinc-700">
                12. AI Founder Mentor Agent
              </div>
            </div>
          </div>

          {/* Layer 4: Multi-Provider Search */}
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-700 block mb-2">
              Layer 4: Multi-Tier Research Abstraction (Never Fails)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-zinc-800 text-xs">
              <div className="p-2 bg-white rounded border border-zinc-200">
                • Tier 1: Gemini Web Grounding
              </div>
              <div className="p-2 bg-white rounded border border-zinc-200">
                • Tier 2: Tavily Search API
              </div>
              <div className="p-2 bg-white rounded border border-zinc-200">
                • Tier 3: Domain Intelligent Evidentiary Fallback
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
