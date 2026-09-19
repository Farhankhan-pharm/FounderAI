import React from 'react';
import {
  ShieldCheck,
  Compass,
  FolderKanban,
  Plus,
  Sparkles,
  Server,
  FileSpreadsheet,
  AlertCircle,
} from 'lucide-react';
import { StartupProject } from '../types';

interface NavbarProps {
  projects: StartupProject[];
  activeProject: StartupProject | null;
  onSelectProject: (id: string) => void;
  onNewProject: () => void;
  activeView: 'report' | 'opportunities' | 'architecture';
  onViewChange: (view: 'report' | 'opportunities' | 'architecture') => void;
  onRunAnalysis: () => void;
  isAnalyzing: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  projects,
  activeProject,
  onSelectProject,
  onNewProject,
  activeView,
  onViewChange,
  onRunAnalysis,
  isAnalyzing,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center text-white shadow-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-zinc-900 tracking-tight text-base">
                  Founder<span className="text-zinc-600 font-semibold">AI</span>
                </span>
                <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-sm bg-zinc-100 text-zinc-700 border border-zinc-200 uppercase">
                  Intelligence Engine
                </span>
              </div>
              <p className="text-[11px] text-zinc-700 hidden sm:block">
                Evidence-Backed Startup Validation
              </p>
            </div>
          </div>

          {/* Navigation Views */}
          <div className="flex items-center bg-zinc-100 p-1 rounded-lg border border-zinc-200">
            <button
              id="nav-btn-report"
              onClick={() => onViewChange('report')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeView === 'report'
                  ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200/80 font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Project Report</span>
            </button>
            <button
              id="nav-btn-opportunities"
              onClick={() => onViewChange('opportunities')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeView === 'opportunities'
                  ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200/80 font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Opportunity Discovery</span>
            </button>
            <button
              id="nav-btn-arch"
              onClick={() => onViewChange('architecture')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeView === 'architecture'
                  ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200/80 font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>Architecture & Status</span>
            </button>
          </div>

          {/* Project Selector & Actions */}
          <div className="flex items-center gap-2.5">
            {activeView === 'report' && (
              <>
                <div className="relative">
                  <select
                    id="project-selector-dropdown"
                    value={activeProject?.id || ''}
                    onChange={(e) => onSelectProject(e.target.value)}
                    className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-xs rounded-lg px-3 py-1.5 pr-8 font-medium focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-colors"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} {p.isDemo ? '[DEMO DATA]' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  id="btn-reanalyze"
                  onClick={onRunAnalysis}
                  disabled={isAnalyzing}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    isAnalyzing
                      ? 'bg-zinc-100 text-zinc-400 border-zinc-200 cursor-not-allowed'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-900 shadow-xs'
                  }`}
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                  <span>{isAnalyzing ? 'Analyzing...' : 'Run Deep Analysis'}</span>
                </button>
              </>
            )}

            <button
              id="btn-new-project-intake"
              onClick={onNewProject}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-900 bg-white hover:bg-zinc-50 border border-zinc-300 rounded-lg transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Project</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
