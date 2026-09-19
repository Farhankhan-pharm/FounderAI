import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  Compass,
  Users,
  Target,
  Calculator,
  Rocket,
  ShieldAlert,
  FileCheck2,
  Bot,
  Share2,
  Sparkles,
  AlertCircle,
  Plus,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { ScoreOverviewCard } from './components/ScoreOverviewCard';
import { AnalysisJobProgress } from './components/AnalysisJobProgress';
import { ExecutiveSummaryTab } from './components/ReportTabs/ExecutiveSummaryTab';
import { MarketAnalysisTab } from './components/ReportTabs/MarketAnalysisTab';
import { CustomerPersonasTab } from './components/ReportTabs/CustomerPersonasTab';
import { CompetitorGapsTab } from './components/ReportTabs/CompetitorGapsTab';
import { BusinessModelUnitEconomicsTab } from './components/ReportTabs/BusinessModelUnitEconomicsTab';
import { GtmExperimentsTab } from './components/ReportTabs/GtmExperimentsTab';
import { RisksContradictionsTab } from './components/ReportTabs/RisksContradictionsTab';
import { EvidenceAuditTab } from './components/ReportTabs/EvidenceAuditTab';
import { FounderMentorTab } from './components/ReportTabs/FounderMentorTab';
import { ExportShareTab } from './components/ReportTabs/ExportShareTab';
import { OpportunityDiscoveryView } from './components/OpportunityDiscoveryView';
import { ArchitectureView } from './components/ArchitectureView';
import { ProjectIntakeModal } from './components/ProjectIntakeModal';
import { StartupProject, StartupAnalysis, AnalysisJob, DiscoveredOpportunity } from './types';

type ReportTab =
  | 'summary'
  | 'market'
  | 'customer'
  | 'competition'
  | 'economics'
  | 'gtm'
  | 'risks'
  | 'evidence'
  | 'mentor'
  | 'export';

export default function App() {
  const [projects, setProjects] = useState<StartupProject[]>([]);
  const [activeProject, setActiveProject] = useState<StartupProject | null>(null);
  const [analysis, setAnalysis] = useState<StartupAnalysis | null>(null);
  const [activeView, setActiveView] = useState<'report' | 'opportunities' | 'architecture'>('report');
  const [activeTab, setActiveTab] = useState<ReportTab>('summary');
  const [activeJob, setActiveJob] = useState<AnalysisJob | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isIntakeOpen, setIsIntakeOpen] = useState<boolean>(false);
  const [isLoadingProject, setIsLoadingProject] = useState<boolean>(true);

  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Initial Load: Fetch Projects
  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data: StartupProject[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
          setActiveProject(data[0]);
          loadProjectAnalysis(data[0].id);
        }
      })
      .catch((err) => console.error('Failed to fetch projects:', err))
      .finally(() => setIsLoadingProject(false));

    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, []);

  // 2. Load Analysis for selected project
  const loadProjectAnalysis = async (projectId: string) => {
    try {
      const res = await fetch(`/api/projects/${projectId}/analysis`);
      if (res.ok) {
        const data = await res.json();
        setAnalysis(data);
      } else {
        setAnalysis(null);
      }
    } catch (err) {
      console.error('Failed to load analysis:', err);
      setAnalysis(null);
    }
  };

  // 3. Select Project Handler
  const handleSelectProject = (id: string) => {
    const selected = projects.find((p) => p.id === id);
    if (selected) {
      setActiveProject(selected);
      loadProjectAnalysis(selected.id);
      setActiveView('report');
    }
  };

  // 4. Trigger Analysis Job
  const handleRunAnalysis = async () => {
    if (!activeProject || isAnalyzing) return;
    setIsAnalyzing(true);

    try {
      const res = await fetch(`/api/projects/${activeProject.id}/analyze`, {
        method: 'POST',
      });
      const data = await res.json();

      if (data.jobId) {
        pollJobStatus(activeProject.id, data.jobId);
      }
    } catch (err) {
      console.error('Failed to trigger analysis job:', err);
      setIsAnalyzing(false);
    }
  };

  // 5. Poll Job Status
  const pollJobStatus = (projectId: string, jobId: string) => {
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);

    pollIntervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/projects/${projectId}/jobs/${jobId}`);
        if (!res.ok) return;

        const job: AnalysisJob = await res.json();
        setActiveJob(job);

        if (job.status === 'COMPLETED') {
          if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
          setIsAnalyzing(false);
          await loadProjectAnalysis(projectId);
          setTimeout(() => setActiveJob(null), 3000);
        } else if (job.status === 'FAILED') {
          if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
          setIsAnalyzing(false);
        }
      } catch (err) {
        console.error('Error polling job:', err);
      }
    }, 800);
  };

  // 6. Handle New Project Creation
  const handleCreateProject = async (projectData: Partial<StartupProject>) => {
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });
      const newProj = await res.json();

      setProjects((prev) => [newProj, ...prev]);
      setActiveProject(newProj);
      setActiveView('report');
      setIsIntakeOpen(false);

      // Automatically launch analysis
      setTimeout(() => {
        setIsAnalyzing(true);
        fetch(`/api/projects/${newProj.id}/analyze`, { method: 'POST' })
          .then((r) => r.json())
          .then((d) => {
            if (d.jobId) pollJobStatus(newProj.id, d.jobId);
          });
      }, 300);
    } catch (err) {
      console.error('Failed to create project:', err);
    }
  };

  // 7. Promote Discovered Opportunity to Project
  const handlePromoteOpportunity = (opp: DiscoveredOpportunity) => {
    handleCreateProject({
      name: opp.name,
      description: `${opp.problem} Value wedge: ${opp.differentiation}`,
      industry: opp.industry,
      targetMarket: opp.industry,
      targetCustomer: opp.customer,
      geography: opp.geography,
      businessModel: opp.businessModel,
      budget: '$20,000',
      stage: 'IDEA',
    });
  };

  const tabs: { id: ReportTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'summary', label: 'Overview & Verdict', icon: FileText },
    { id: 'market', label: 'Market & TAM', icon: Compass },
    { id: 'customer', label: 'Customer Personas', icon: Users },
    { id: 'competition', label: 'Competitors & Gaps', icon: Target },
    { id: 'economics', label: 'Economics & MVP', icon: Calculator },
    { id: 'gtm', label: 'GTM & Experiments', icon: Rocket },
    { id: 'risks', label: 'Risks & Contradictions', icon: ShieldAlert },
    { id: 'evidence', label: 'Evidence Audit', icon: FileCheck2 },
    { id: 'mentor', label: 'AI Founder Mentor', icon: Bot },
    { id: 'export', label: 'Export & Share', icon: Share2 },
  ];

  return (
    <div className="min-h-screen bg-zinc-100/60 text-zinc-900 font-sans antialiased flex flex-col">
      {/* Navbar */}
      <Navbar
        projects={projects}
        activeProject={activeProject}
        onSelectProject={handleSelectProject}
        onNewProject={() => setIsIntakeOpen(true)}
        activeView={activeView}
        onViewChange={setActiveView}
        onRunAnalysis={handleRunAnalysis}
        isAnalyzing={isAnalyzing}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Active Analysis Job Progress */}
        {activeJob && (activeJob.status === 'RESEARCHING' || activeJob.status === 'ANALYZING' || activeJob.status === 'SYNTHESIZING' || activeJob.status === 'QUEUED') && (
          <AnalysisJobProgress job={activeJob} />
        )}

        {/* VIEW 1: PROJECT REPORT & INTELLIGENCE */}
        {activeView === 'report' && (
          <div>
            {activeProject && analysis ? (
              <>
                {/* Score & Confidence Overview Banner */}
                <ScoreOverviewCard project={activeProject} analysis={analysis} />

                {/* Report Tabs Navigation */}
                <div className="flex items-center gap-1.5 overflow-x-auto border-b border-zinc-200 pb-2 mb-6 scrollbar-none">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        id={`tab-btn-${tab.id}`}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                          isActive
                            ? 'bg-zinc-900 text-white shadow-xs'
                            : 'bg-white text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 border border-zinc-200'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content Rendering */}
                <div>
                  {activeTab === 'summary' && <ExecutiveSummaryTab analysis={analysis} />}
                  {activeTab === 'market' && <MarketAnalysisTab market={analysis.marketAnalysis} />}
                  {activeTab === 'customer' && <CustomerPersonasTab personas={analysis.customerAnalysis} />}
                  {activeTab === 'competition' && (
                    <CompetitorGapsTab
                      competitors={analysis.competitorAnalysis}
                      gaps={analysis.gapAnalysis}
                    />
                  )}
                  {activeTab === 'economics' && (
                    <BusinessModelUnitEconomicsTab
                      businessModel={analysis.businessModel}
                      mvp={analysis.mvp}
                    />
                  )}
                  {activeTab === 'gtm' && (
                    <GtmExperimentsTab
                      gtm={analysis.goToMarket}
                      experiments={analysis.experiments}
                      roadmap={analysis.roadmap}
                    />
                  )}
                  {activeTab === 'risks' && (
                    <RisksContradictionsTab
                      risks={analysis.risks}
                      contradictions={analysis.contradictions}
                    />
                  )}
                  {activeTab === 'evidence' && (
                    <EvidenceAuditTab
                      evidence={analysis.evidence}
                      sources={analysis.researchSources}
                    />
                  )}
                  {activeTab === 'mentor' && (
                    <FounderMentorTab project={activeProject} analysis={analysis} />
                  )}
                  {activeTab === 'export' && (
                    <ExportShareTab project={activeProject} analysis={analysis} />
                  )}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl border border-zinc-200 p-12 text-center shadow-xs">
                <Sparkles className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-zinc-900">
                  {activeProject ? `Ready to Research "${activeProject.name}"` : 'No Project Selected'}
                </h3>
                <p className="text-xs text-zinc-700 max-w-md mx-auto mt-1 mb-6">
                  {activeProject
                    ? 'Execute the 14-step autonomous research pipeline to generate an evidence-backed intelligence dossier.'
                    : 'Select an existing project or create a new one to begin.'}
                </p>
                {activeProject && (
                  <button
                    onClick={handleRunAnalysis}
                    disabled={isAnalyzing}
                    className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors inline-flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Launch Autonomous Research Pipeline</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: OPPORTUNITY DISCOVERY */}
        {activeView === 'opportunities' && (
          <OpportunityDiscoveryView onPromoteOpportunity={handlePromoteOpportunity} />
        )}

        {/* VIEW 3: ARCHITECTURE & HEALTH */}
        {activeView === 'architecture' && <ArchitectureView />}
      </main>

      {/* Project Intake Modal */}
      <ProjectIntakeModal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
        onSubmit={handleCreateProject}
      />
    </div>
  );
}
