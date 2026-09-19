/**
 * Synthesis Agent (Sections 25, 26)
 * Synthesizes all multi-agent outputs, deterministic scores, and evidentiary audits
 * into a single cohesive, structured startup analysis report.
 */

import {
  StartupProject,
  StartupAnalysis,
  ResearchSource,
  EvidenceItem,
  MarketAnalysisData,
  CustomerPersonaItem,
  CompetitorItem,
  MarketGapItem,
  BusinessModelOption,
  UnitEconomicsModel,
  MVPPlan,
  ValidationExperiment,
  GTMStrategy,
  RiskItem,
  ContradictionAlert,
  RoadmapItem,
  FinalRecommendation,
} from '../../src/types';
import { calculateDeterministicScore } from './scoringEngine';
import { calculateConfidence } from './confidenceEngine';
import { getGeminiClient, GEMINI_MODELS } from '../gemini';

export interface SynthesisInputs {
  project: StartupProject;
  marketAnalysis: MarketAnalysisData;
  customerPersonas: CustomerPersonaItem[];
  competitors: CompetitorItem[];
  gaps: MarketGapItem[];
  businessModel: {
    primaryModel: string;
    options: BusinessModelOption[];
    unitEconomicsScenario: UnitEconomicsModel;
  };
  mvp: MVPPlan;
  experiments: ValidationExperiment[];
  gtm: GTMStrategy;
  risks: RiskItem[];
  contradictions: ContradictionAlert[];
  sources: ResearchSource[];
  evidence: EvidenceItem[];
  analysisId: string;
  version?: number;
}

export async function synthesizeAnalysisReport(inputs: {
  project: StartupProject;
  marketAnalysis: MarketAnalysisData;
  customerPersonas: CustomerPersonaItem[];
  competitors: CompetitorItem[];
  gaps: MarketGapItem[];
  businessModel: {
    primaryModel: string;
    options: BusinessModelOption[];
    unitEconomicsScenario: UnitEconomicsModel;
  };
  mvp: MVPPlan;
  experiments: ValidationExperiment[];
  gtm: GTMStrategy;
  risks: RiskItem[];
  contradictions: ContradictionAlert[];
  sources: ResearchSource[];
  evidence: EvidenceItem[];
  analysisId: string;
  version?: number;
}): Promise<StartupAnalysis> {
  const {
    project,
    marketAnalysis,
    customerPersonas,
    competitors,
    gaps,
    businessModel,
    mvp,
    experiments,
    gtm,
    risks,
    contradictions,
    sources,
    evidence,
    analysisId,
    version = 1,
  } = inputs;

  // 1. Calculate Analytical Scores deterministically
  const avgCustomerPain =
    customerPersonas.length > 0
      ? customerPersonas.reduce((acc, p) => acc + p.painScore.overall, 0) / customerPersonas.length
      : 75;

  const scores = calculateDeterministicScore({
    marketDemand: marketAnalysis.tamCalculation.status === 'CALCULATED' ? 84 : 65,
    customerPain: avgCustomerPain,
    competition: competitors.length > 3 ? 62 : 78,
    differentiation: gaps.length > 0 ? 80 : 60,
    monetization: businessModel.unitEconomicsScenario.ltv > 300 ? 76 : 64,
    timing: 82,
    distributionDifficulty: 65,
    executionDifficulty: 70,
    risk: 74,
  });

  // 2. Calculate Confidence Breakdown
  const untestedAssumptions = 3;
  const confidenceDetails = calculateConfidence(
    sources,
    evidence,
    contradictions,
    untestedAssumptions
  );

  // 3. Formulate Roadmap
  const roadmap: RoadmapItem[] = [
    {
      id: `rd_val_${Date.now()}_1`,
      projectId: project.id,
      title: 'Customer Problem Validation & Smoke Test',
      description: 'Run targeted landing page smoke test and complete 15 in-depth customer interviews to validate demand.',
      phase: 'PHASE_1_VALIDATION',
      priority: 'CRITICAL',
      status: 'IN_PROGRESS',
      estimatedDuration: '2 - 3 Weeks',
    },
    {
      id: `rd_mvp_${Date.now()}_2`,
      projectId: project.id,
      title: 'Concierge / Closed-Loop Pilot MVP',
      description: 'Deploy minimal single-view verification dashboard with 10 early pilot users.',
      phase: 'PHASE_2_MVP',
      priority: 'HIGH',
      status: 'TODO',
      estimatedDuration: '4 - 6 Weeks',
    },
    {
      id: `rd_trac_${Date.now()}_3`,
      projectId: project.id,
      title: 'Community Distribution & B2B Partner Channel',
      description: 'Formalize 3 affiliate or distribution partnerships and initiate SEO content engine.',
      phase: 'PHASE_3_TRACTION',
      priority: 'MEDIUM',
      status: 'TODO',
      estimatedDuration: '8 Weeks',
    },
  ];

  // 4. Determine Rigorous Recommendation Verdict
  let verdict: FinalRecommendation['verdict'] = 'CONDITIONAL_GO';
  let primaryReason = '';
  let criticalConditions: string[] = [];
  let immediateNextAction = '';

  if (scores.overall >= 80 && confidenceDetails.overallConfidence >= 75) {
    verdict = 'STRONG_GO';
    primaryReason = 'High evidentiary backing confirms intense customer pain, viable unit economics, and distinct differentiation.';
    criticalConditions = [
      'Maintain CAC discipline during initial paid test campaigns.',
      'Achieve minimum 80% protocol compliance in pilot cohort.',
    ];
    immediateNextAction = 'Launch Experiment 1 (Landing Page Smoke Test) and begin onboarding waitlist.';
  } else if (scores.overall >= 65) {
    verdict = 'CONDITIONAL_GO';
    primaryReason = 'Strong market interest and customer friction, but willingness-to-pay and customer acquisition efficiency remain untested hypotheses.';
    criticalConditions = [
      'Validate that customer willingness-to-pay covers estimated CAC before writing software code.',
      'Confirm users will not habituate or bypass the verification protocol.',
    ];
    immediateNextAction = 'Conduct 15 customer validation interviews and run the proposed concierge pilot.';
  } else if (scores.differentiation < 60 || scores.competition < 50) {
    verdict = 'PIVOT_RECOMMENDED';
    primaryReason = 'Current positioning collides directly with entrenched incumbents without sufficient structural moat or distribution advantage.';
    criticalConditions = [
      'Narrow focus to a highly underserved niche rather than competing broadly.',
      'Rethink business model to avoid linear ad-auction bidding wars.',
    ];
    immediateNextAction = 'Interview non-consumers who rejected existing competitors to identify an overlooked workflow gap.';
  } else {
    verdict = 'HIGH_RISK_DO_NOT_BUILD';
    primaryReason = 'Economic assumptions do not justify capital outlay under current market barriers and severe adoption resistance.';
    criticalConditions = [
      'Requires fundamental change in market regulation or 10x breakthrough in distribution efficiency.',
    ];
    immediateNextAction = 'Archive concept or re-evaluate with a completely different target customer segment.';
  }

  const recommendation: FinalRecommendation = {
    verdict,
    primaryReason,
    criticalConditions,
    immediateNextAction,
  };

  // 5. Generate Executive Summary
  let executiveSummary = `${project.name} addresses ${project.description} within the ${project.industry} space in ${project.geography}. Our multi-agent investigation identified an Opportunity Score of ${scores.overall}/100 with an Evidentiary Confidence of ${confidenceDetails.overallConfidence}%. While market demand indicators and customer friction are substantive, success hinges on resolving the identified "${gaps[0]?.title || 'workflow verification gap'}" rather than building generic software. Recommendation: ${verdict}. Founders must execute immediate smoke testing before capital expenditure on software development.`;

  const ai = getGeminiClient();
  if (ai) {
    try {
      const summaryPrompt = `Generate a concise, objective 3-sentence executive summary for this startup intelligence report.
Startup: ${project.name}
Verdict: ${verdict}
Opportunity Score: ${scores.overall}
Confidence: ${confidenceDetails.overallConfidence}%
Core Gap: ${gaps[0]?.title}
Target Customer: ${project.targetCustomer}

Tone: Objective, rigorous, evidence-driven. Do NOT generate promotional praise or generic startup fluff.`;

      const sumRes = await ai.models.generateContent({
        model: GEMINI_MODELS.FLASH,
        contents: summaryPrompt,
      });
      const generatedText = sumRes.text?.trim();
      if (generatedText) {
        executiveSummary = generatedText;
      }
    } catch {
      // Keep deterministic summary
    }
  }

  // Compile pain points list
  const painPoints = customerPersonas.flatMap((p) =>
    p.painPoints.map((pt) => ({
      problem: pt,
      severity: 'HIGH',
      evidence: p.description,
    }))
  );

  return {
    id: analysisId,
    projectId: project.id,
    version,
    overallScore: scores.overall,
    confidence: confidenceDetails.overallConfidence,
    executiveSummary,
    problemStatement: `${project.targetCustomer} suffer persistent operational friction and anxiety due to fragmented, unverified workflows in ${project.industry}.`,
    proposedSolution: `A streamlined, closed-loop verification platform designed specifically for ${project.targetCustomer} with zero unnecessary UI overhead.`,
    scores,
    confidenceDetails,
    marketAnalysis,
    customerAnalysis: customerPersonas,
    painPoints,
    competitorAnalysis: competitors,
    gapAnalysis: gaps,
    differentiationStrategy: {
      coreMoat: `Proprietary Closed-Loop Verification: Solving the gap between alert dismissal and verified action without requiring expensive hardware.`,
      defensibilityFactors: [
        'High customer switching costs once historical audit compliance logs are established',
        'Direct multi-stakeholder notification escalation network effects',
        'Streamlined, zero-install user interface adapted to non-technical users',
      ],
      vulnerabilities: [
        'Incumbent copycat capability if market demand reaches large enterprise scale',
        'Platform risk if underlying communication APIs adjust delivery pricing',
      ],
    },
    businessModel,
    mvp,
    experiments,
    goToMarket: gtm,
    risks,
    assumptions: [
      { assumption: 'Target customers will commit time to verify operations on a daily basis.', criticality: 'FATAL', status: 'TESTING' },
      { assumption: 'Customer Acquisition Cost (CAC) can be kept below payback threshold via community channels.', criticality: 'HIGH', status: 'UNTESTED' },
      { assumption: 'Target buyers have discretionary budget to self-serve subscription payments.', criticality: 'HIGH', status: 'UNTESTED' },
    ],
    contradictions,
    roadmap,
    recommendation,
    evidence,
    researchSources: sources,
    createdAt: new Date().toISOString(),
  };
}
