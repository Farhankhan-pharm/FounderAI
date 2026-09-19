/**
 * Core Type Definitions for Founder Intelligence Platform
 * Evidence-backed AI Research Engine & Backend Architecture
 */

export type EvidenceType =
  | 'VERIFIED'
  | 'SOURCE_BACKED'
  | 'MODEL_INFERENCE'
  | 'HYPOTHESIS'
  | 'UNKNOWN';

export type JobStatus =
  | 'QUEUED'
  | 'RESEARCHING'
  | 'ANALYZING'
  | 'SYNTHESIZING'
  | 'COMPLETED'
  | 'FAILED';

export type ProjectStage =
  | 'IDEA'
  | 'PROBLEM_VALIDATION'
  | 'SOLUTION_DESIGN'
  | 'MVP_BUILDING'
  | 'EARLY_TRACTION'
  | 'SCALING';

export interface User {
  id: string;
  email: string;
  name: string;
  subscriptionTier: 'FREE' | 'PRO' | 'BUSINESS';
  createdAt: string;
  updatedAt: string;
}

export interface StartupProject {
  id: string;
  userId: string;
  name: string;
  description: string;
  industry: string;
  targetMarket: string;
  targetCustomer: string;
  geography: string;
  businessModel: string;
  budget: string;
  stage: ProjectStage;
  status: 'ACTIVE' | 'ARCHIVED' | 'ANALYZING';
  isDemo?: boolean;
  createdAt: string;
  updatedAt: string;
  lastResearchAt?: string;
}

export interface ResearchSource {
  id: string;
  projectId: string;
  analysisId?: string;
  url: string;
  title: string;
  domain: string;
  sourceType:
    | 'GOVERNMENT'
    | 'OFFICIAL_COMPANY'
    | 'ACADEMIC'
    | 'MAJOR_PUBLICATION'
    | 'INDUSTRY_REPORT'
    | 'REVIEW_PLATFORM'
    | 'COMMUNITY_FORUM'
    | 'BLOG'
    | 'UNKNOWN';
  publicationDate?: string;
  retrievedAt: string;
  credibility: number; // 0.0 - 1.0 heuristic score
  content?: string;
  summary: string;
  createdAt: string;
}

export interface EvidenceItem {
  id: string;
  analysisId?: string;
  claim: string;
  sourceId?: string;
  sourceUrl?: string;
  sourceTitle?: string;
  evidenceType: EvidenceType;
  confidence: number; // 0.0 - 1.0
  supportingText: string;
  reasoning?: string;
  createdAt: string;
}

export interface CompetitorItem {
  id: string;
  projectId: string;
  name: string;
  website: string;
  product?: string;
  description: string;
  targetCustomer: string;
  pricing: string;
  businessModel?: string;
  category: 'DIRECT' | 'INDIRECT' | 'SUBSTITUTE' | 'EMERGING';
  strengths: string[];
  weaknesses: string[];
  evidence?: string[];
  sourceIds?: string[];
  confidence: number;
  requiresVerification?: boolean;
}

export interface CustomerPainScore {
  overall: number; // 0 - 100
  urgency: number;
  frequency: number;
  economicImpact: number;
  existingFrustration: number;
  confidence: number;
}

export interface CustomerPersonaItem {
  id: string;
  projectId: string;
  name: string;
  roleDescription: string;
  description: string;
  painPoints: string[];
  buyingTriggers: string[];
  objections: string[];
  willingnessToPay: string;
  currentAlternatives: string[];
  jobsToBeDone: string[];
  painScore: CustomerPainScore;
}

export interface MarketGapItem {
  id: string;
  projectId: string;
  title: string;
  description: string;
  gapType:
    | 'UNDERSERVED_CUSTOMERS'
    | 'FEATURE_GAP'
    | 'PRICING_GAP'
    | 'GEOGRAPHIC_GAP'
    | 'DISTRIBUTION_GAP'
    | 'UX_GAP'
    | 'INTEGRATION_GAP'
    | 'TRUST_GAP'
    | 'WORKFLOW_GAP';
  evidence: string[];
  opportunityScore: number; // 0 - 100
  confidence: number; // 0.0 - 1.0
}

export interface BusinessModelOption {
  model: string;
  whyItCouldWork: string;
  pricingHypothesis: string;
  advantages: string[];
  risks: string[];
  assumptions: string[];
}

export interface UnitEconomicsModel {
  arpu: number; // Average Revenue Per User/Account per month
  grossMarginPercent: number; // e.g., 75 (%)
  cac: number; // Customer Acquisition Cost
  monthlyChurnPercent: number; // e.g., 3.5 (%)
  ltv: number; // ARPU * (GrossMargin / Churn)
  paybackMonths: number; // CAC / (ARPU * GrossMargin)
  disclaimer: string;
}

export interface MVPFeatureItem {
  feature: string;
  priority: 'MUST_BUILD' | 'SHOULD_BUILD' | 'LATER' | 'AVOID';
  reason: string;
  hypothesisTested: string;
}

export interface MVPPlan {
  coreHypothesis: string;
  targetTimeline: string;
  features: MVPFeatureItem[];
}

export interface ValidationExperiment {
  id: string;
  projectId: string;
  hypothesis: string;
  method:
    | 'CUSTOMER_INTERVIEWS'
    | 'LANDING_PAGE_SMOKE_TEST'
    | 'WAITLIST_PREORDER'
    | 'CONCIERGE_MVP'
    | 'COLD_OUTREACH'
    | 'PROTOTYPE_USABILITY'
    | 'PRICING_EXPERIMENT';
  targetParticipants: number;
  successCriteria: string[];
  failureCriteria: string[];
  estimatedTime: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PROPOSED' | 'IN_PROGRESS' | 'COMPLETED' | 'VALIDATED' | 'INVALIDATED';
  resultsNotes?: string;
}

export interface GTMStrategy {
  primaryChannel: string;
  secondaryChannels: string[];
  reason: string;
  firstCampaign: string;
  targetCustomer: string;
  message: string;
  experiment: string;
}

export interface RiskItem {
  id: string;
  risk: string;
  category:
    | 'MARKET'
    | 'PRODUCT'
    | 'TECHNICAL'
    | 'FINANCIAL'
    | 'REGULATORY'
    | 'COMPETITION'
    | 'DISTRIBUTION'
    | 'ADOPTION';
  probability: number; // 1 - 5
  impact: number; // 1 - 5
  severity: number; // probability * impact (1 - 25)
  evidence: string[];
  mitigation: string;
}

export interface ContradictionAlert {
  id: string;
  topic: string;
  claimA: {
    statement: string;
    source: string;
    credibility: number;
  };
  claimB: {
    statement: string;
    source: string;
    credibility: number;
  };
  synthesisNote: string;
  confidenceImpact: string;
}

export interface RoadmapItem {
  id: string;
  projectId: string;
  title: string;
  description: string;
  phase: 'PHASE_1_VALIDATION' | 'PHASE_2_MVP' | 'PHASE_3_TRACTION' | 'PHASE_4_SCALE';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  estimatedDuration: string;
}

export interface TAMCalculation {
  status: 'CALCULATED' | 'INSUFFICIENT_DATA';
  tamValueUSD?: number;
  samValueUSD?: number;
  somValueUSD?: number;
  methodology?: string;
  assumptions?: string[];
  sources?: string[];
  confidence: number;
}

export interface MarketAnalysisData {
  structureSummary: string;
  marketDrivers: string[];
  marketTrends: string[];
  barriersToEntry: string[];
  tamCalculation: TAMCalculation;
}

export interface ScoringBreakdown {
  overall: number; // 0 - 100 weighted
  marketDemand: number; // 20%
  customerPain: number; // 15%
  competition: number; // 10%
  differentiation: number; // 15%
  monetization: number; // 15%
  timing: number; // 10%
  distributionDifficulty: number; // 5%
  executionDifficulty: number; // 5%
  risk: number; // 5% (lower risk = higher score)
  methodology: string;
}

export interface ConfidenceBreakdown {
  overallConfidence: number; // 0 - 100%
  sourceCount: number;
  averageCredibility: number;
  directEvidenceRatio: number;
  contradictionPenalty: number;
  untestedAssumptionsCount: number;
  summary: string;
}

export interface FinalRecommendation {
  verdict: 'STRONG_GO' | 'CONDITIONAL_GO' | 'PIVOT_RECOMMENDED' | 'HIGH_RISK_DO_NOT_BUILD';
  primaryReason: string;
  criticalConditions: string[];
  immediateNextAction: string;
}

export interface StartupAnalysis {
  id: string;
  projectId: string;
  version: number;
  overallScore: number;
  confidence: number;
  executiveSummary: string;
  problemStatement: string;
  proposedSolution: string;
  scores: ScoringBreakdown;
  confidenceDetails: ConfidenceBreakdown;
  marketAnalysis: MarketAnalysisData;
  customerAnalysis: CustomerPersonaItem[];
  painPoints: Array<{ problem: string; severity: string; evidence: string }>;
  competitorAnalysis: CompetitorItem[];
  gapAnalysis: MarketGapItem[];
  differentiationStrategy: {
    coreMoat: string;
    defensibilityFactors: string[];
    vulnerabilities: string[];
  };
  businessModel: {
    primaryModel: string;
    options: BusinessModelOption[];
    unitEconomicsScenario: UnitEconomicsModel;
  };
  mvp: MVPPlan;
  experiments: ValidationExperiment[];
  goToMarket: GTMStrategy;
  risks: RiskItem[];
  assumptions: Array<{ assumption: string; criticality: 'FATAL' | 'HIGH' | 'MEDIUM'; status: 'UNTESTED' | 'TESTING' | 'VALIDATED' }>;
  contradictions: ContradictionAlert[];
  roadmap: RoadmapItem[];
  recommendation: FinalRecommendation;
  evidence: EvidenceItem[];
  researchSources: ResearchSource[];
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  projectId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  references?: Array<{ type: 'COMPETITOR' | 'SOURCE' | 'EXPERIMENT' | 'METRIC'; label: string }>;
  createdAt: string;
}

export interface AnalysisJob {
  id: string;
  projectId: string;
  status: JobStatus;
  progressPercent: number;
  currentStep: string;
  stepsCompleted: string[];
  error?: string;
  createdAt: string;
  completedAt?: string;
  metrics?: {
    aiCalls: number;
    inputTokens: number;
    outputTokens: number;
    searchRequests: number;
    processingTimeMs: number;
    estimatedCostUSD: number;
  };
}

export interface DiscoveredOpportunity {
  id: string;
  name: string;
  problem: string;
  customer: string;
  whyNow: string;
  marketSignal: string;
  competition: string;
  businessModel: string;
  difficulty: 'LOW' | 'MEDIUM' | 'HIGH';
  differentiation: string;
  validationPlan: string;
  opportunityScore: number;
  confidence: number;
  evidence: Array<{ claim: string; source: string; type: EvidenceType }>;
  industry: string;
  geography: string;
}

export interface FeatureFlags {
  FEATURE_LIVE_SEARCH: boolean;
  FEATURE_COMPETITOR_ANALYSIS: boolean;
  FEATURE_OPPORTUNITY_ENGINE: boolean;
  FEATURE_PDF_EXPORT: boolean;
  FEATURE_AI_MENTOR: boolean;
  FEATURE_FINANCIAL_MODEL: boolean;
}
