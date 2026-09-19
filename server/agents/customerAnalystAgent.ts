/**
 * Customer Analyst Agent & Customer Pain Scorer (Sections 12, 13)
 * Analyzes buyer personas, jobs-to-be-done, buying triggers, objections, and calculates
 * the analytical Customer Pain Score (Urgency + Frequency + Economic Impact + Existing Frustration).
 */

import { CustomerPersonaItem, StartupProject, EvidenceItem } from '../../src/types';
import { getGeminiClient, GEMINI_MODELS } from '../gemini';

export async function analyzeCustomers(
  project: StartupProject,
  evidence: EvidenceItem[]
): Promise<CustomerPersonaItem[]> {
  const ai = getGeminiClient();

  if (ai) {
    try {
      const prompt = `You are an expert customer behavioral researcher.
Analyze the target customers and buyer personas for:
Startup: "${project.name}"
Description: ${project.description}
Target Market: ${project.targetMarket}
Target Customer: ${project.targetCustomer}

Available Evidence:
${evidence.map((e) => `- [${e.evidenceType}] ${e.claim}`).join('\n')}

CRITICAL MANDATE:
Do NOT claim "Customers definitely want this."
Frame claims carefully using evidence-based phrasing:
"Available evidence suggests..." or "This remains a hypothesis that should be validated."

Calculate Customer Pain Score for each persona:
Pain Score = (Urgency + Frequency + Economic Impact + Existing Frustration) / 4 (normalized 0-100).

Return ONLY valid JSON array with 2 personas (Primary & Secondary / Influencer):
[
  {
    "id": "pers_1",
    "projectId": "${project.id}",
    "name": "Persona Name & Archetype",
    "roleDescription": "Demographic & daily responsibility context",
    "description": "Available evidence suggests this persona experiences severe friction...",
    "painPoints": ["3-4 specific painful friction points"],
    "buyingTriggers": ["2-3 specific catalyst events that trigger a search for a solution"],
    "objections": ["2-3 reasons they would hesitate or reject buying"],
    "willingnessToPay": "Price tolerance hypothesis with caveats",
    "currentAlternatives": ["Current imperfect workarounds"],
    "jobsToBeDone": ["2-3 functional and emotional jobs-to-be-done"],
    "painScore": {
      "overall": 80,
      "urgency": 85,
      "frequency": 80,
      "economicImpact": 75,
      "existingFrustration": 80,
      "confidence": 0.75
    }
  }
]`;

      const response = await ai.models.generateContent({
        model: GEMINI_MODELS.FLASH,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text?.trim();
      if (text) {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p: any, i: number) => ({
            ...p,
            id: p.id || `pers_${Date.now()}_${i}`,
            projectId: project.id,
            painScore: {
              overall: Math.round(
                ((p.painScore?.urgency || 75) +
                  (p.painScore?.frequency || 75) +
                  (p.painScore?.economicImpact || 75) +
                  (p.painScore?.existingFrustration || 75)) /
                  4
              ),
              urgency: p.painScore?.urgency || 75,
              frequency: p.painScore?.frequency || 75,
              economicImpact: p.painScore?.economicImpact || 75,
              existingFrustration: p.painScore?.existingFrustration || 75,
              confidence: p.painScore?.confidence || 0.70,
            },
          }));
        }
      }
    } catch (err) {
      console.warn('AI customer persona analysis failed, using structured fallback:', err);
    }
  }

  // Domain analytical fallback
  return [
    {
      id: `pers_primary_${Date.now()}`,
      projectId: project.id,
      name: `Primary Decision Maker (${project.targetCustomer})`,
      roleDescription: `Frontline practitioner / consumer directly responsible for outcomes in ${project.industry}.`,
      description: `Available evidence suggests this user spends significant weekly hours dealing with fragmented workflows, although actual willingness to pay remains a hypothesis requiring verification.`,
      painPoints: [
        `High cognitive overhead managing disparate tools without a single source of truth.`,
        `Fear of catastrophic oversight, compliance breach, or operational delay.`,
        `Lack of actionable, closed-loop feedback when actions are completed.`,
      ],
      buyingTriggers: [
        `An acute operational failure or near-miss incident in the preceding 30 days.`,
        `Direct recommendation from an industry peer or trusted community advisor.`,
        `Budget cycle allocation where legacy manual hours must be cut.`,
      ],
      objections: [
        `"We already have established manual habits and change will cause disruption."`,
        `"Concerned that software will add setup time rather than saving time."`,
      ],
      willingnessToPay: `Hypothesized budget range: $20-$100/month or $500+/yr, dependent on proof of labor savings.`,
      currentAlternatives: [
        `Manual spreadsheets and email reminders.`,
        `Fragmented point solutions that do not communicate with each other.`,
      ],
      jobsToBeDone: [
        `Eliminate anxiety over unverified critical tasks without adding operational friction.`,
        `Generate an audit trail of completed operations with minimal manual entry.`,
      ],
      painScore: {
        overall: 80,
        urgency: 84,
        frequency: 82,
        economicImpact: 76,
        existingFrustration: 78,
        confidence: 0.78,
      },
    },
    {
      id: `pers_secondary_${Date.now()}`,
      projectId: project.id,
      name: `Secondary Beneficiary / Supervisor`,
      roleDescription: `Manager, executive sponsor, or affected stakeholder in ${project.geography}.`,
      description: `This stakeholder cares primarily about aggregate reporting, compliance certainty, and overall cost reduction.`,
      painPoints: [
        `Inability to monitor adherence or progress without interrupting team members.`,
        `Audit liability when operations cannot be verified retrospectively.`,
      ],
      buyingTriggers: [
        `Quarterly review highlighting operational bottlenecks.`,
        `Staff complaints regarding repetitive low-value manual tracking.`,
      ],
      objections: [
        `"Is the ROI high enough to justify another vendor subscription?"`,
        `"Will this integrate with our existing workflows?"`,
      ],
      willingnessToPay: `Willingness to fund team/enterprise licenses ($30-$150/seat/month) if compliance risk is mitigated.`,
      currentAlternatives: [`Ad-hoc weekly status meetings`, `Self-reported status emails`],
      jobsToBeDone: [
        `Provide executive peace of mind that operations are operating strictly within standards.`,
      ],
      painScore: {
        overall: 73,
        urgency: 70,
        frequency: 68,
        economicImpact: 82,
        existingFrustration: 72,
        confidence: 0.72,
      },
    },
  ];
}
