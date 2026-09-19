/**
 * In-Memory & File-Compatible Store for Founder Intelligence Platform
 * Supports full CRUD for Projects, Analyses, Sources, Evidence, Competitors, Personas, Experiments, Roadmap, Jobs, Chat.
 */

import {
  StartupProject,
  StartupAnalysis,
  ResearchSource,
  EvidenceItem,
  CompetitorItem,
  CustomerPersonaItem,
  MarketGapItem,
  ValidationExperiment,
  RoadmapItem,
  ChatMessage,
  AnalysisJob,
  User,
  FeatureFlags,
} from '../src/types';

// In-memory collections
const users: Map<string, User> = new Map();
const projects: Map<string, StartupProject> = new Map();
const analyses: Map<string, StartupAnalysis[]> = new Map(); // projectId -> analyses[]
const sources: Map<string, ResearchSource[]> = new Map(); // projectId -> sources[]
const evidences: Map<string, EvidenceItem[]> = new Map(); // analysisId -> evidences[]
const competitors: Map<string, CompetitorItem[]> = new Map(); // projectId -> competitors[]
const personas: Map<string, CustomerPersonaItem[]> = new Map(); // projectId -> personas[]
const gaps: Map<string, MarketGapItem[]> = new Map(); // projectId -> gaps[]
const experiments: Map<string, ValidationExperiment[]> = new Map(); // projectId -> experiments[]
const roadmaps: Map<string, RoadmapItem[]> = new Map(); // projectId -> items[]
const chatMessages: Map<string, ChatMessage[]> = new Map(); // projectId -> messages[]
const jobs: Map<string, AnalysisJob> = new Map(); // jobId -> job

export const featureFlags: FeatureFlags = {
  FEATURE_LIVE_SEARCH: true,
  FEATURE_COMPETITOR_ANALYSIS: true,
  FEATURE_OPPORTUNITY_ENGINE: true,
  FEATURE_PDF_EXPORT: true,
  FEATURE_AI_MENTOR: true,
  FEATURE_FINANCIAL_MODEL: true,
};

// Default system user
const DEFAULT_USER: User = {
  id: 'user_founder_01',
  email: 'founder@example.com',
  name: 'Alex Rivera',
  subscriptionTier: 'PRO',
  createdAt: new Date('2026-01-01').toISOString(),
  updatedAt: new Date().toISOString(),
};
users.set(DEFAULT_USER.id, DEFAULT_USER);

// ==========================================
// DEMO DATA SEEDING (Section 47: MediQuick)
// ==========================================
const MEDIQUICK_PROJECT_ID = 'proj_mediquick_demo';
const MEDIQUICK_ANALYSIS_ID = 'analysis_mediquick_v1';

const demoProject: StartupProject = {
  id: MEDIQUICK_PROJECT_ID,
  userId: DEFAULT_USER.id,
  name: 'MediQuick',
  description: 'Smart medication management and polypharmacy adherence platform with caregiver verification for elderly patients living independently.',
  industry: 'Digital Health / Elder Care',
  targetMarket: 'North America Elderly Care & Family Caregivers ($22B Market)',
  targetCustomer: 'Adult daughters/sons (ages 40-58) managing care for aging parents with 4+ daily prescriptions.',
  geography: 'United States & Canada',
  businessModel: 'B2C Freemium / Premium Caregiver Alerts ($19.99/mo) + B2B2C Home Care Agency Integration ($35/patient/mo)',
  budget: '$50,000 Seed Bootstrapped',
  stage: 'PROBLEM_VALIDATION',
  status: 'ACTIVE',
  isDemo: true,
  createdAt: '2026-03-01T10:00:00.000Z',
  updatedAt: '2026-03-15T14:30:00.000Z',
  lastResearchAt: '2026-03-15T14:30:00.000Z',
};

const demoSources: ResearchSource[] = [
  {
    id: 'src_cdc_adherence',
    projectId: MEDIQUICK_PROJECT_ID,
    analysisId: MEDIQUICK_ANALYSIS_ID,
    url: 'https://www.cdc.gov/chronicdisease/resources/publications/factsheets/medication-adherence.htm',
    title: 'CDC Chronic Disease Factsheet: Medication Adherence in Older Adults',
    domain: 'cdc.gov',
    sourceType: 'GOVERNMENT',
    publicationDate: '2025-08-12',
    retrievedAt: '2026-03-15T11:00:00.000Z',
    credibility: 0.95,
    summary: 'Non-adherence to medications causes 30% to 50% of chronic disease treatment failures and an estimated 125,000 deaths per year in the US. Economic impact estimated at $100B-$289B annually.',
    createdAt: '2026-03-15T11:00:00.000Z',
  },
  {
    id: 'src_jama_polypharmacy',
    projectId: MEDIQUICK_PROJECT_ID,
    analysisId: MEDIQUICK_ANALYSIS_ID,
    url: 'https://jamanetwork.com/journals/jamainternalmedicine/article-abstract/2788392',
    title: 'JAMA Study: Polypharmacy and Adverse Drug Events in Independent Seniors',
    domain: 'jamanetwork.com',
    sourceType: 'ACADEMIC',
    publicationDate: '2025-04-18',
    retrievedAt: '2026-03-15T11:05:00.000Z',
    credibility: 0.95,
    summary: '67% of adults over 65 take 5 or more prescription drugs. Confusion over schedule and timing changes following hospital discharge is the leading proximate driver of acute readmission within 30 days.',
    createdAt: '2026-03-15T11:05:00.000Z',
  },
  {
    id: 'src_medisafe_pricing',
    projectId: MEDIQUICK_PROJECT_ID,
    analysisId: MEDIQUICK_ANALYSIS_ID,
    url: 'https://www.medisafe.com/pricing-plans',
    title: 'Medisafe Official Features and Premium Pricing Breakdown',
    domain: 'medisafe.com',
    sourceType: 'OFFICIAL_COMPANY',
    publicationDate: '2025-11-01',
    retrievedAt: '2026-03-15T11:10:00.000Z',
    credibility: 0.90,
    summary: 'Medisafe offers free basic medication reminders with Premium Medfriend sync at $4.99/month or $39.99/year. Reviews show caregiver sync drops intermittently on Android updates.',
    createdAt: '2026-03-15T11:10:00.000Z',
  },
  {
    id: 'src_aarp_caregiving',
    projectId: MEDIQUICK_PROJECT_ID,
    analysisId: MEDIQUICK_ANALYSIS_ID,
    url: 'https://www.aarp.org/research/topics/caregiving/info-2025/caregiving-in-the-united-states.html',
    title: 'AARP Caregiving in the US 2025 National Report',
    domain: 'aarp.org',
    sourceType: 'INDUSTRY_REPORT',
    publicationDate: '2025-06-20',
    retrievedAt: '2026-03-15T11:12:00.000Z',
    credibility: 0.85,
    summary: '53 million Americans provide unpaid care. 61% are women, and 48% say medication management is their highest anxiety friction point. Average out-of-pocket tech spend is $380/year.',
    createdAt: '2026-03-15T11:12:00.000Z',
  },
  {
    id: 'src_reddit_agingparents',
    projectId: MEDIQUICK_PROJECT_ID,
    analysisId: MEDIQUICK_ANALYSIS_ID,
    url: 'https://reddit.com/r/AgingParents/comments/medication_reminder_struggles_2025',
    title: 'r/AgingParents Community Thread: Smart pill dispensers vs simple notifications',
    domain: 'reddit.com',
    sourceType: 'COMMUNITY_FORUM',
    publicationDate: '2026-01-14',
    retrievedAt: '2026-03-15T11:15:00.000Z',
    credibility: 0.50,
    summary: 'Caregivers report that elderly parents press "Dismiss" on phone notifications without actually swallowing the pills. Physical dispensers ($300 Hero Health) are seen as too bulky and lock out pills on Wi-Fi dropouts.',
    createdAt: '2026-03-15T11:15:00.000Z',
  }
];

const demoEvidence: EvidenceItem[] = [
  {
    id: 'evi_01',
    analysisId: MEDIQUICK_ANALYSIS_ID,
    claim: 'Non-adherence to medications causes 125,000 preventable deaths and up to $289B in preventable healthcare costs in the US annually.',
    sourceId: 'src_cdc_adherence',
    sourceUrl: 'https://www.cdc.gov/chronicdisease/resources/publications/factsheets/medication-adherence.htm',
    sourceTitle: 'CDC Chronic Disease Factsheet',
    evidenceType: 'VERIFIED',
    confidence: 0.95,
    supportingText: 'Government epidemiological monitoring confirmed non-adherence rate between 30% and 50% for chronic therapies.',
    reasoning: 'Peer-reviewed federal epidemiological study with multi-year baseline data.',
    createdAt: '2026-03-15T11:20:00.000Z',
  },
  {
    id: 'evi_02',
    analysisId: MEDIQUICK_ANALYSIS_ID,
    claim: '67% of seniors over 65 live with polypharmacy (5+ distinct daily medications).',
    sourceId: 'src_jama_polypharmacy',
    sourceUrl: 'https://jamanetwork.com/journals/jamainternalmedicine/article-abstract/2788392',
    sourceTitle: 'JAMA Study: Polypharmacy in Independent Seniors',
    evidenceType: 'SOURCE_BACKED',
    confidence: 0.94,
    supportingText: 'Study of 8,400 Medicare beneficiaries demonstrated median count of 6.2 active prescription medications.',
    reasoning: 'Published medical journal analysis with rigorous sampling.',
    createdAt: '2026-03-15T11:22:00.000Z',
  },
  {
    id: 'evi_03',
    analysisId: MEDIQUICK_ANALYSIS_ID,
    claim: 'Market leader Medisafe charges $4.99/mo for family caregiver sync.',
    sourceId: 'src_medisafe_pricing',
    sourceUrl: 'https://www.medisafe.com/pricing-plans',
    sourceTitle: 'Medisafe Official Pricing',
    evidenceType: 'SOURCE_BACKED',
    confidence: 0.92,
    supportingText: 'Current public pricing lists Medisafe Premium at $4.99/month, $39.99/year.',
    reasoning: 'Official company public pricing page.',
    createdAt: '2026-03-15T11:23:00.000Z',
  },
  {
    id: 'evi_04',
    analysisId: MEDIQUICK_ANALYSIS_ID,
    claim: 'Caregivers have willingness-to-pay of $15-$25/month if the app reliably prevents emergency room visits.',
    evidenceType: 'HYPOTHESIS',
    confidence: 0.62,
    supportingText: 'AARP data indicates $380/yr average tech spend, but willingness to pay specifically for software-only verification without hardware remains unverified.',
    reasoning: 'Derived from indirect survey spend averages, not direct smoke-test commitment.',
    createdAt: '2026-03-15T11:25:00.000Z',
  },
  {
    id: 'evi_05',
    analysisId: MEDIQUICK_ANALYSIS_ID,
    claim: 'Computer vision pill verification can run directly in browser/mobile without specialized IoT dispensers.',
    evidenceType: 'MODEL_INFERENCE',
    confidence: 0.74,
    supportingText: 'Modern mobile edge models and Gemini Multimodal can classify blister packs and pill shapes, but lighting variance and senior motor tremors present real-world friction.',
    reasoning: 'Technical capability verified in controlled tests, edge-case reliability untested with target demographic.',
    createdAt: '2026-03-15T11:26:00.000Z',
  }
];

const demoCompetitors: CompetitorItem[] = [
  {
    id: 'comp_medisafe',
    projectId: MEDIQUICK_PROJECT_ID,
    name: 'Medisafe',
    website: 'https://www.medisafe.com',
    product: 'Mobile pill reminder & tracker app with Medfriend alert',
    description: 'Largest consumer pill reminder app with 10M+ downloads. Primary focus on consumer direct reminders.',
    targetCustomer: 'Patients managing chronic illnesses directly.',
    pricing: 'Free basic; $4.99/mo or $39.99/yr for Medfriend sync.',
    businessModel: 'B2C Freemium + Pharma data partnerships',
    category: 'DIRECT',
    strengths: ['Massive brand recognition', 'Established drug interaction database', 'Pharma sponsor integrations'],
    weaknesses: ['Passive notifications easily dismissed', 'Caregiver UI is secondary', 'No photographic verification of dose intake'],
    evidence: ['Official pricing page', 'Google Play store 10M+ downloads'],
    confidence: 0.92,
  },
  {
    id: 'comp_hero_health',
    projectId: MEDIQUICK_PROJECT_ID,
    name: 'Hero Health',
    website: 'https://herohealth.com',
    product: 'Automated smart pill dispenser appliance + subscription',
    description: 'Hardware counter-top dispenser that sorts and dispenses pills at scheduled times.',
    targetCustomer: 'High-income families with elderly parents at home.',
    pricing: '$99 upfront setup fee + $29.99/mo subscription (12-month commitment).',
    businessModel: 'B2C Hardware + Recurring SaaS',
    category: 'INDIRECT',
    strengths: ['Physical locks prevent double-dosing', 'Strong caregiver peace of mind', 'Automatic sorting mechanism'],
    weaknesses: ['High upfront cost ($450+ first year)', 'Jams on gummy or split pills', 'Senior cannot travel outside home with appliance'],
    evidence: ['Hero Health Terms of Service and Hardware Spec Sheet'],
    confidence: 0.90,
  },
  {
    id: 'comp_pillpack',
    projectId: MEDIQUICK_PROJECT_ID,
    name: 'PillPack by Amazon Pharmacy',
    website: 'https://www.pillpack.com',
    product: 'Pre-sorted multi-dose medication pouches delivered monthly',
    description: 'Full-service pharmacy that packages daily prescriptions into date-and-time stamped packets.',
    targetCustomer: 'Seniors taking 3+ maintenance medications with standard Medicare Part D.',
    pricing: 'Standard insurance copays; packaging is free.',
    businessModel: 'Pharmacy prescription fulfillment dispensing margin',
    category: 'SUBSTITUTE',
    strengths: ['Eliminates pill sorting entirely', 'Amazon logistics backing', 'No software subscription cost'],
    weaknesses: ['Does not confirm whether the patient actually opened and ingested the packet', 'Slow to adjust on acute dose changes (e.g. antibiotics)'],
    evidence: ['Amazon Pharmacy official regulatory disclosures'],
    confidence: 0.94,
  },
  {
    id: 'comp_memotext',
    projectId: MEDIQUICK_PROJECT_ID,
    name: 'CarePredict / MemoText',
    website: 'https://carepredict.com',
    product: 'Wearable AI + senior activity sensor suite',
    description: 'Wearable sensors detecting activities of daily living (eating, bathing, medication posture).',
    targetCustomer: 'Assisted living facilities and home health agencies.',
    pricing: 'Enterprise contract $45-$80/resident/month.',
    businessModel: 'B2B enterprise SaaS + hardware',
    category: 'EMERGING',
    strengths: ['Passive telemetry without requiring screen taps', 'Predictive fall detection'],
    weaknesses: ['Too expensive for solo retail caregivers', 'Requires wearing device continuously'],
    evidence: ['Industry whitepaper on remote patient monitoring 2025'],
    confidence: 0.78,
    requiresVerification: true,
  }
];

const demoPersonas: CustomerPersonaItem[] = [
  {
    id: 'pers_sarah',
    projectId: MEDIQUICK_PROJECT_ID,
    name: 'Sarah M. (Primary: The Overwhelmed Daughter)',
    roleDescription: '47-year-old marketing manager, mother of two, caring for her 79-year-old father who lives 25 miles away.',
    description: 'Visits twice a week to organize his pillbox. Constantly anxious that her father will forget his blood thinner or take a duplicate dose.',
    painPoints: [
      'Constant nagging feeling of dread after work: "Did Dad take his 5 PM Eliquis?"',
      'Father says "Yes, I took it" out of pride even when he forgot.',
      'Emergency room visit 4 months ago due to hypotension from double-dosing.',
      'Frustrated by clunky smart dispensers that cost $400+ and jam.'
    ],
    buyingTriggers: [
      'A hospital discharge event or physician warning about non-adherence',
      'A near-miss incident where pills were left on the breakfast counter',
      'Beginning a high-risk medication regimen (blood thinners, cardiac drugs)'
    ],
    objections: [
      '"My dad refuses to use complicated technology or smartphones."',
      '"I already bought a 7-day plastic organizer; why do I need an app?"',
      '"Will this alert me at 3 AM for a missed vitamin?"'
    ],
    willingnessToPay: '$15 - $25/month for automated SMS confirmation and zero-effort senior interface.',
    currentAlternatives: ['Weekly plastic pill planner', 'Daily phone calls', 'Paper refrigerator checklists'],
    jobsToBeDone: [
      'Give me proof that my father took his exact prescribed doses today without requiring me to interrogate him.',
      'Alert me immediately if a critical window passes without verified consumption.'
    ],
    painScore: {
      overall: 82,
      urgency: 88,
      frequency: 85,
      economicImpact: 78,
      existingFrustration: 85,
      confidence: 0.88,
    }
  },
  {
    id: 'pers_arthur',
    projectId: MEDIQUICK_PROJECT_ID,
    name: 'Arthur M. (End User: The Independent Senior)',
    roleDescription: '79-year-old retired civil engineer with mild cognitive changes and hypertension.',
    description: 'Values independence fiercely. Dislikes being treated like a child or nagged. Wants clear, large-print reassurance.',
    painPoints: [
      'Pills look alike: three small white tablets taken at different hours.',
      'Loses track of whether a pill was taken 10 minutes ago or yesterday.',
      'Struggles with small touchscreen buttons and complex password logins.'
    ],
    buyingTriggers: ['Daughter sets up the system for him.'],
    objections: ['"I am not an invalid and I can remember my own medicine."'],
    willingnessToPay: '$0 (relies on family/insurance to sponsor tools).',
    currentAlternatives: ['Memory', 'Plastic dispenser', 'TV alarms'],
    jobsToBeDone: ['Make it obvious which pills to take right now, and confirm when I am done for the day.'],
    painScore: {
      overall: 71,
      urgency: 74,
      frequency: 80,
      economicImpact: 60,
      existingFrustration: 70,
      confidence: 0.82,
    }
  }
];

const demoGaps: MarketGapItem[] = [
  {
    id: 'gap_verification',
    projectId: MEDIQUICK_PROJECT_ID,
    title: 'Verification Gap: Notification Dismissal vs Actual Ingestion',
    description: 'Current apps (Medisafe, Apple Health) send alerts that users swipe away without consuming the medication. Physical smart boxes (Hero) are too bulky to travel with. No lightweight solution provides closed-loop verification.',
    gapType: 'WORKFLOW_GAP',
    evidence: [
      'CDC report highlights 42% of missed doses occur despite reminder alarms being acknowledged.',
      'Reddit r/AgingParents caregivers report seniors routinely dismiss alarms to silence ringing.'
    ],
    opportunityScore: 89,
    confidence: 0.86,
  },
  {
    id: 'gap_agency_bridge',
    projectId: MEDIQUICK_PROJECT_ID,
    title: 'B2B2C Caregiver-to-Home Care Agency Data Silo',
    description: 'Home care aides rotate shifts and have no real-time visibility into whether the morning family member administered the dose, causing duplicate medication or gaps.',
    gapType: 'INTEGRATION_GAP',
    evidence: ['AARP national survey notes 34% of seniors receive care from both family and paid outside aides.'],
    opportunityScore: 78,
    confidence: 0.79,
  }
];

const demoExperiments: ValidationExperiment[] = [
  {
    id: 'exp_01',
    projectId: MEDIQUICK_PROJECT_ID,
    hypothesis: 'Family caregivers will pre-order a $19/month SMS-based verification service if it requires zero app installation for the elderly parent.',
    method: 'LANDING_PAGE_SMOKE_TEST',
    targetParticipants: 100,
    successCriteria: ['>8% email waitlist conversion from targeted Reddit/Facebook caregiver ads', '>15 paid refundable deposit reservations ($5)'],
    failureCriteria: ['<2% conversion rate or average CAC exceeding $65'],
    estimatedTime: '10 days',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
  },
  {
    id: 'exp_02',
    projectId: MEDIQUICK_PROJECT_ID,
    hypothesis: 'Seniors over 75 will reliably send a 1-tap photo or reply "1" to a daily automated SMS prompt without assistance.',
    method: 'CONCIERGE_MVP',
    targetParticipants: 15,
    successCriteria: ['>85% on-time response rate across a 14-day concierge test run with 15 senior-caregiver pairs'],
    failureCriteria: ['More than 4 seniors abandon the prompt or report severe confusion'],
    estimatedTime: '14 days',
    priority: 'HIGH',
    status: 'PROPOSED',
  },
  {
    id: 'exp_03',
    projectId: MEDIQUICK_PROJECT_ID,
    hypothesis: 'Independent home care agencies will pay $35/patient/month to integrate adherence telemetry into their supervisory portals to reduce liability.',
    method: 'COLD_OUTREACH',
    targetParticipants: 30,
    successCriteria: ['At least 5 agency directors agree to a 30-day pilot letter of intent'],
    failureCriteria: ['Zero LOI commitments or feedback that liability concerns block 3rd party logs'],
    estimatedTime: '21 days',
    priority: 'MEDIUM',
    status: 'PROPOSED',
  }
];

const demoRoadmap: RoadmapItem[] = [
  {
    id: 'rd_01',
    projectId: MEDIQUICK_PROJECT_ID,
    title: 'Caregiver SMS Concierge Pilot',
    description: 'Manually run Twilio automated SMS protocol with 15 senior-caregiver pairs to validate response compliance.',
    phase: 'PHASE_1_VALIDATION',
    priority: 'CRITICAL',
    status: 'IN_PROGRESS',
    estimatedDuration: '2 weeks',
  },
  {
    id: 'rd_02',
    projectId: MEDIQUICK_PROJECT_ID,
    title: 'Core Caregiver Web Portal & Escalation Engine',
    description: 'Build single-dashboard web app for family caregivers: medication schedules, missed-dose escalation matrix, audit trail.',
    phase: 'PHASE_2_MVP',
    priority: 'HIGH',
    status: 'TODO',
    estimatedDuration: '4 weeks',
  },
  {
    id: 'rd_03',
    projectId: MEDIQUICK_PROJECT_ID,
    title: 'HIPAA-Compliant Prescription Photo Recognition',
    description: 'Implement computer vision pill packaging classification for instant verification.',
    phase: 'PHASE_3_TRACTION',
    priority: 'MEDIUM',
    status: 'TODO',
    estimatedDuration: '6 weeks',
  }
];

const demoAnalysis: StartupAnalysis = {
  id: MEDIQUICK_ANALYSIS_ID,
  projectId: MEDIQUICK_PROJECT_ID,
  version: 1,
  overallScore: 78.5,
  confidence: 84.0,
  executiveSummary: 'MediQuick targets a severe, high-consequence healthcare challenge: elderly polypharmacy non-adherence. While market demand and customer pain are exceptionally high, consumer willingness-to-pay for standalone reminder software is capped by free alternatives. MediQuick\'s differentiation hinges on solving the "Verification Gap"—proving the dose was actually swallowed without requiring a $400 hardware appliance. Recommendation is CONDITIONAL GO: Execute a concierge smoke test with 15 senior-caregiver pairs before building native software.',
  problemStatement: 'Family caregivers suffer chronic anxiety and elderly patients suffer preventable hospitalizations because existing medication apps only send passive reminders that are dismissed without ingestion.',
  proposedSolution: 'A zero-friction, SMS-and-photo adherence verification engine that confirms active medication ingestion and immediately escalates missed critical windows to adult children caregivers.',
  scores: {
    overall: 78.5,
    marketDemand: 88, // 20%
    customerPain: 92, // 15%
    competition: 64, // 10% (crowded with apps & hardware)
    differentiation: 79, // 15% (focus on closed-loop verification)
    monetization: 70, // 15% (B2C churn risk; B2B upside)
    timing: 85, // 10% (Silver tsunami demographics)
    distributionDifficulty: 65, // 5% (high CAC on eldercare channels)
    executionDifficulty: 72, // 5% (HIPAA compliance, senior UX)
    risk: 75, // 5% (liability and adherence failure risk)
    methodology: 'Deterministic weighted formula: (MarketDemand*0.20) + (CustomerPain*0.15) + (Competition*0.10) + (Differentiation*0.15) + (Monetization*0.15) + (Timing*0.10) + (Distribution*0.05) + (Execution*0.05) + (Risk*0.05).',
  },
  confidenceDetails: {
    overallConfidence: 84,
    sourceCount: 5,
    averageCredibility: 0.83,
    directEvidenceRatio: 0.78,
    contradictionPenalty: -5,
    untestedAssumptionsCount: 3,
    summary: 'High confidence in market need and clinical burden grounded in CDC and JAMA reports. Moderate uncertainty regarding B2C CAC efficiency and senior compliance without hardware locks.',
  },
  marketAnalysis: {
    structureSummary: 'The US eldercare technology market is valued at $22.4B, with 53 million unpaid caregivers. The sector is bifurcated between free consumer reminder apps with poor engagement and expensive proprietary hardware dispensers ($300-$500).',
    marketDrivers: [
      'Silver Tsunami: 10,000 Americans turn 65 every day through 2030.',
      'Hospital penalties under ACA for 30-day preventable readmissions.',
      'Rising caregiver labor shortage pushing families to remote monitoring.'
    ],
    marketTrends: [
      'Shift toward zero-install SMS and WhatsApp senior interfaces over native app downloads.',
      'Remote Patient Monitoring (RPM) Medicare CPT reimbursement codes (99453, 99454).',
      'Integration of pharmacy automated delivery with digital adherence logs.'
    ],
    barriersToEntry: [
      'High consumer acquisition cost ($40-$80 CAC on Meta/Google Ads for caregiver keywords).',
      'HIPAA and security compliance obligations for patient medical records.',
      'High churn due to senior mortality or transition to skilled nursing facilities.'
    ],
    tamCalculation: {
      status: 'CALCULATED',
      tamValueUSD: 14200000000,
      samValueUSD: 2400000000,
      somValueUSD: 18000000,
      methodology: 'Bottom-up calculation: 53M caregivers * 22% managing 4+ meds = 11.6M target US seniors. SAM targets independent living seniors with tech-enabled adult children (2.5M). SOM assumes 0.75% penetration (18,750 subscribers at $240/yr = $4.5M B2C + 35 Home Care Agency accounts).',
      assumptions: [
        'Average household annual software spend capped at $240/yr.',
        'Home care agency contract values average $15,000/yr for 35 patients.'
      ],
      sources: ['AARP Caregiving 2025 Study', 'CDC Chronic Disease Center', 'CMS Medicare Beneficiary Statistics'],
      confidence: 0.82,
    }
  },
  customerAnalysis: demoPersonas,
  painPoints: [
    { problem: 'Caregiver fear of acute medical crises from missed or duplicate cardiac/diabetic medication.', severity: 'CRITICAL', evidence: 'CDC estimates 125,000 deaths/yr in US from non-adherence.' },
    { problem: 'Senior resentment of nagging telephone check-ins from adult children.', severity: 'HIGH', evidence: 'AARP Caregiver Survey reports 48% cite medication tension as daily friction point.' },
    { problem: 'Smart dispensers cost $400+ and cannot travel outside the house.', severity: 'HIGH', evidence: 'Reddit r/AgingParents community feedback on Hero Health and Pillo dispenser failures.' }
  ],
  competitorAnalysis: demoCompetitors,
  gapAnalysis: demoGaps,
  differentiationStrategy: {
    coreMoat: 'Zero-Hardware Closed-Loop Verification: Combining frictionless SMS senior interaction with caregiver emergency escalation without requiring expensive counter-top dispensers.',
    defensibilityFactors: [
      'Proprietary adherence escalation workflows adapted to elderly sleep/wake cycles',
      'Caregiver network effects (multiple family members invited to rotating watch-shifts)',
      'B2B Home care agency integration partnerships'
    ],
    vulnerabilities: [
      'Medisafe or Apple Health could add SMS verification features natively',
      'Amazon Pharmacy could bundle free IoT dispensers with Prime prescription delivery'
    ]
  },
  businessModel: {
    primaryModel: 'B2C Caregiver Subscription ($19.99/mo) with B2B Home Care Agency Tier ($35/patient/mo)',
    options: [
      {
        model: 'B2C Direct Subscription',
        whyItCouldWork: 'Direct emotional appeal to anxious adult daughters with disposable income.',
        pricingHypothesis: '$19.99/month or $189/year after 14-day free trial.',
        advantages: ['Fast cycle feedback', 'Immediate cash flow', 'No complex procurement sales cycles'],
        risks: ['High customer acquisition cost', 'Elevated churn as patient condition deteriorates'],
        assumptions: ['Caregivers will self-pay without waiting for Medicare coverage.']
      },
      {
        model: 'B2B Home Health Agency SaaS',
        whyItCouldWork: 'Agencies face severe nurse aide turnover and state compliance audit scrutiny.',
        pricingHypothesis: '$35/patient/month flat licensing fee to agency.',
        advantages: ['Low churn', 'Higher contract value ($15k-$40k ACV)', 'Scales through professional channels'],
        risks: ['6-9 month enterprise sales cycles', 'Requires business associate agreements (BAA) and EHR integrations'],
        assumptions: ['Agencies have budget discretionary power for adherence risk tools.']
      }
    ],
    unitEconomicsScenario: {
      arpu: 24.50,
      grossMarginPercent: 78,
      cac: 62.00,
      monthlyChurnPercent: 4.2,
      ltv: 454.88, // 24.50 * 0.78 / 0.042
      paybackMonths: 3.24, // 62 / (24.50 * 0.78)
      disclaimer: 'Simplified scenario model assuming blended 70% B2C ($19.99/mo) and 30% B2B ($35/mo) customer base. Excludes customer support personnel overhead.'
    }
  },
  mvp: {
    coreHypothesis: 'Anxious caregivers will pay $19.99/month for automated 2-way SMS check-ins and missed-dose escalation alerts, with zero app install required on the parent\'s phone.',
    targetTimeline: '6 Weeks to Pilot Launch',
    features: [
      { feature: 'Automated 2-way SMS reminder prompts with 1-digit reply ("Reply 1 if taken")', priority: 'MUST_BUILD', reason: 'Zero friction for non-tech seniors; eliminates smartphone app adoption barrier.', hypothesisTested: 'Seniors will consistently reply to text prompts.' },
      { feature: 'Caregiver missed-dose escalation notification (push/SMS/call after 30 min window)', priority: 'MUST_BUILD', reason: 'Delivers the core emotional value proposition: peace of mind.', hypothesisTested: 'Caregivers value immediate escalation enough to pay.' },
      { feature: 'Single-screen caregiver web portal to manage schedules and audit logs', priority: 'MUST_BUILD', reason: 'Needed to onboard parent prescriptions and review history.', hypothesisTested: 'Caregivers can self-serve schedule onboarding.' },
      { feature: 'Computer vision blister pack photo verification', priority: 'SHOULD_BUILD', reason: 'Higher assurance for critical medications, but adds friction if camera angle is poor.', hypothesisTested: 'Seniors are willing and able to take legible pill photos.' },
      { feature: 'Smart Bluetooth pill bottle caps', priority: 'AVOID', reason: 'Hardware design and inventory capital burns runway prior to validating demand.', hypothesisTested: 'Hardware is required to achieve adherence.' },
      { feature: 'Full electronic health record (EHR) integrations', priority: 'AVOID', reason: 'Enterprise integrations introduce 6-month regulatory delays to early validation.', hypothesisTested: 'Clinical EHR sync is a prerequisite for consumer launch.' }
    ]
  },
  experiments: demoExperiments,
  goToMarket: {
    primaryChannel: 'Caregiver Support Communities & Word-of-Mouth Organic Referrals (AARP forums, Reddit r/AgingParents, Caregiver Facebook Groups)',
    secondaryChannels: ['Physician discharge planners & Geriatric care managers', 'Targeted Meta ads focused on "sandwich generation" women ages 40-55', 'Local independent home care agency partnerships'],
    reason: 'Caregivers make software purchasing decisions based on trusted peer recommendations during crisis moments (e.g., following a hospital discharge), where direct search ads are often prohibitively expensive ($6-$12 CPC).',
    firstCampaign: 'The "Never Wonder Again" 14-day Caregiver Challenge: Free 14-day automated SMS peace-of-mind pilot offered to 100 members of aging parent forums.',
    targetCustomer: 'Adult daughters (ages 42-56) who have experienced a medication scare within the last 6 months.',
    message: '"Stop the daily phone interrogation. Get instant confirmation the second Mom takes her heart medicine."',
    experiment: 'Run 5 targeted Reddit and Facebook community posts offering free concierge access in exchange for a 20-minute user feedback interview.'
  },
  risks: [
    { id: 'risk_01', risk: 'Medical Liability & False Sense of Security: Caregiver claims app failed to prevent stroke or critical missed dose.', category: 'REGULATORY', probability: 3, impact: 5, severity: 15, evidence: ['Standard healthcare disclaimer legal precedents'], mitigation: 'Explicit terms of service: MediQuick is a communication and logging aid, NOT a medical diagnostic or emergency life-support device.' },
    { id: 'risk_02', risk: 'High Consumer Churn: Patient passes away or is moved to 24/7 skilled nursing facility.', category: 'FINANCIAL', probability: 4, impact: 4, severity: 16, evidence: ['Senior tech industry benchmark average churn is 3.5%-5.5% monthly.'], mitigation: 'Diversify revenue into B2B Home Care Agencies where accounts represent multi-patient perpetual seats.' },
    { id: 'risk_03', risk: 'False Positive SMS Confirmation: Senior replies "1" out of habit without actually taking the pill.', category: 'PRODUCT', probability: 4, impact: 4, severity: 16, evidence: ['Community feedback indicates automatic habituated responses to recurring prompts.'], mitigation: 'Implement randomized micro-prompts (e.g., "Confirm taking the blue pill") and optional blister-pack photo verification.' }
  ],
  assumptions: [
    { assumption: 'Seniors will not feel offended or insulted by automated SMS check-ins.', criticality: 'FATAL', status: 'TESTING' },
    { assumption: 'Family caregivers have discretionary budget of $20/month for eldercare software.', criticality: 'HIGH', status: 'UNTESTED' },
    { assumption: 'Customer acquisition cost (CAC) can be kept below $65 through organic caregiver groups.', criticality: 'HIGH', status: 'UNTESTED' }
  ],
  contradictions: [
    {
      id: 'contra_01',
      topic: 'Senior Willingness to Use Mobile Devices for Health',
      claimA: {
        statement: 'AARP tech adoption survey indicates 82% of adults 70+ own a smartphone and use text messaging daily.',
        source: 'AARP Caregiving 2025 Study',
        credibility: 0.85
      },
      claimB: {
        statement: 'Caregivers on community forums report seniors struggle with capacitive touchscreens and frequently lock themselves out.',
        source: 'Reddit r/AgingParents',
        credibility: 0.50
      },
      synthesisNote: 'Ownership and casual texting does not equal capability to navigate multi-step apps. MediQuick must strictly use native SMS rather than requiring app store downloads or logins.',
      confidenceImpact: 'Moderate confidence reduction on native app interfaces; validates SMS-first approach.'
    }
  ],
  roadmap: demoRoadmap,
  recommendation: {
    verdict: 'CONDITIONAL_GO',
    primaryReason: 'High customer urgency and large demographic tailwind, but B2C software CAC and habituation risks require validating response compliance before capital expenditure on native mobile apps.',
    criticalConditions: [
      'Must achieve >80% response rate in 14-day concierge SMS pilot with 15 senior-caregiver pairs.',
      'Must acquire initial 100 waitlist reservations at a simulated CAC under $50.'
    ],
    immediateNextAction: 'Launch Experiment 1: Landing page smoke test targeted to Reddit r/AgingParents and Facebook caregiver groups.'
  },
  evidence: demoEvidence,
  researchSources: demoSources,
  createdAt: '2026-03-15T12:00:00.000Z',
};

// Seed demo project
projects.set(demoProject.id, demoProject);
analyses.set(demoProject.id, [demoAnalysis]);
sources.set(demoProject.id, demoSources);
evidences.set(demoAnalysis.id, demoEvidence);
competitors.set(demoProject.id, demoCompetitors);
personas.set(demoProject.id, demoPersonas);
gaps.set(demoProject.id, demoGaps);
experiments.set(demoProject.id, demoExperiments);
roadmaps.set(demoProject.id, demoRoadmap);

// Pre-seed a helpful mentor chat message
chatMessages.set(demoProject.id, [
  {
    id: 'msg_initial_mentor',
    projectId: demoProject.id,
    role: 'assistant',
    content: 'Welcome to the Founder Intelligence Platform. I am your AI Founder Mentor. I have thoroughly analyzed the MediQuick research report, including the CDC adherence factsheets, JAMA polypharmacy studies, Medisafe competitor pricing, and caregiver pain points.\n\nMy primary observation: While market demand is high, your biggest risk is that seniors habituate to SMS prompts and reply "1" without swallowing the pill. How would you like to stress-test your validation experiments or unit economics today?',
    references: [
      { type: 'METRIC', label: 'Pain Score: 82/100' },
      { type: 'COMPETITOR', label: 'Medisafe ($4.99/mo)' },
      { type: 'EXPERIMENT', label: 'Concierge Pilot (15 pairs)' }
    ],
    createdAt: '2026-03-15T12:05:00.000Z',
  }
]);

// Database Access Object (DAO)
export const db = {
  // Users
  getUser(id: string): User | undefined {
    return users.get(id) || DEFAULT_USER;
  },

  // Projects
  listProjects(): StartupProject[] {
    return Array.from(projects.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  getProject(id: string): StartupProject | undefined {
    return projects.get(id);
  },

  createProject(data: Partial<StartupProject>): StartupProject {
    const id = `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newProject: StartupProject = {
      id,
      userId: data.userId || DEFAULT_USER.id,
      name: data.name || 'Untitled Startup Project',
      description: data.description || '',
      industry: data.industry || 'General Tech',
      targetMarket: data.targetMarket || 'Global',
      targetCustomer: data.targetCustomer || 'Prospective Buyers',
      geography: data.geography || 'North America',
      businessModel: data.businessModel || 'B2B SaaS',
      budget: data.budget || '$10,000',
      stage: data.stage || 'IDEA',
      status: 'ACTIVE',
      isDemo: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    projects.set(id, newProject);
    return newProject;
  },

  updateProject(id: string, data: Partial<StartupProject>): StartupProject | undefined {
    const existing = projects.get(id);
    if (!existing) return undefined;
    const updated = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    projects.set(id, updated);
    return updated;
  },

  deleteProject(id: string): boolean {
    projects.delete(id);
    analyses.delete(id);
    sources.delete(id);
    competitors.delete(id);
    personas.delete(id);
    gaps.delete(id);
    experiments.delete(id);
    roadmaps.delete(id);
    chatMessages.delete(id);
    return true;
  },

  // Analyses
  getLatestAnalysis(projectId: string): StartupAnalysis | undefined {
    const projectAnalyses = analyses.get(projectId) || [];
    return projectAnalyses[projectAnalyses.length - 1];
  },

  getAllAnalyses(projectId: string): StartupAnalysis[] {
    return analyses.get(projectId) || [];
  },

  saveAnalysis(analysis: StartupAnalysis): StartupAnalysis {
    const projectAnalyses = analyses.get(analysis.projectId) || [];
    projectAnalyses.push(analysis);
    analyses.set(analysis.projectId, projectAnalyses);

    // Also update project's lastResearchAt
    const proj = projects.get(analysis.projectId);
    if (proj) {
      proj.lastResearchAt = analysis.createdAt;
      projects.set(proj.id, proj);
    }

    return analysis;
  },

  // Sources
  getSources(projectId: string): ResearchSource[] {
    return sources.get(projectId) || [];
  },

  saveSources(projectId: string, newSources: ResearchSource[]): void {
    const existing = sources.get(projectId) || [];
    // Deduplicate by URL
    const existingUrls = new Set(existing.map((s) => s.url.toLowerCase()));
    const filtered = newSources.filter((s) => !existingUrls.has(s.url.toLowerCase()));
    sources.set(projectId, [...existing, ...filtered]);
  },

  // Evidence
  getEvidence(analysisId: string): EvidenceItem[] {
    return evidences.get(analysisId) || [];
  },

  saveEvidence(analysisId: string, items: EvidenceItem[]): void {
    evidences.set(analysisId, items);
  },

  // Competitors
  getCompetitors(projectId: string): CompetitorItem[] {
    return competitors.get(projectId) || [];
  },

  saveCompetitors(projectId: string, items: CompetitorItem[]): void {
    competitors.set(projectId, items);
  },

  // Personas
  getPersonas(projectId: string): CustomerPersonaItem[] {
    return personas.get(projectId) || [];
  },

  savePersonas(projectId: string, items: CustomerPersonaItem[]): void {
    personas.set(projectId, items);
  },

  // Gaps
  getGaps(projectId: string): MarketGapItem[] {
    return gaps.get(projectId) || [];
  },

  saveGaps(projectId: string, items: MarketGapItem[]): void {
    gaps.set(projectId, items);
  },

  // Experiments
  getExperiments(projectId: string): ValidationExperiment[] {
    return experiments.get(projectId) || [];
  },

  saveExperiment(projectId: string, experiment: ValidationExperiment): ValidationExperiment {
    const current = experiments.get(projectId) || [];
    const index = current.findIndex((e) => e.id === experiment.id);
    if (index >= 0) {
      current[index] = experiment;
    } else {
      current.push(experiment);
    }
    experiments.set(projectId, current);
    return experiment;
  },

  // Roadmap
  getRoadmap(projectId: string): RoadmapItem[] {
    return roadmaps.get(projectId) || [];
  },

  saveRoadmap(projectId: string, items: RoadmapItem[]): void {
    roadmaps.set(projectId, items);
  },

  // Chat
  getChatMessages(projectId: string): ChatMessage[] {
    return chatMessages.get(projectId) || [];
  },

  addChatMessage(projectId: string, msg: Omit<ChatMessage, 'id' | 'createdAt'>): ChatMessage {
    const current = chatMessages.get(projectId) || [];
    const newMsg: ChatMessage = {
      ...msg,
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
    };
    current.push(newMsg);
    chatMessages.set(projectId, current);
    return newMsg;
  },

  // Analysis Jobs
  getJob(jobId: string): AnalysisJob | undefined {
    return jobs.get(jobId);
  },

  createJob(projectId: string): AnalysisJob {
    const job: AnalysisJob = {
      id: `job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      projectId,
      status: 'QUEUED',
      progressPercent: 5,
      currentStep: 'Initializing Research Engine',
      stepsCompleted: [],
      createdAt: new Date().toISOString(),
    };
    jobs.set(job.id, job);
    return job;
  },

  updateJob(jobId: string, updates: Partial<AnalysisJob>): AnalysisJob | undefined {
    const existing = jobs.get(jobId);
    if (!existing) return undefined;
    const updated = {
      ...existing,
      ...updates,
    };
    jobs.set(jobId, updated);
    return updated;
  },
};
