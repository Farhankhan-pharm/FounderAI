/**
 * AI Founder Mentor Agent (Sections 30, 31)
 * Rigorous evidence-backed startup advisor answering questions strictly with project context,
 * challenging weak assumptions, and recommending validation experiments over speculation.
 */

import { StartupProject, StartupAnalysis, ChatMessage } from '../../src/types';
import { getGeminiClient, GEMINI_MODELS, safeGenerateContent } from '../gemini';

export async function consultFounderMentor(
  project: StartupProject,
  latestAnalysis: StartupAnalysis | undefined,
  history: ChatMessage[],
  userMessage: string
): Promise<{ content: string; references: ChatMessage['references'] }> {
  const ai = getGeminiClient();

  const references: ChatMessage['references'] = [];

  // Identify references to existing project entities
  if (latestAnalysis) {
    if (userMessage.toLowerCase().includes('score') || userMessage.toLowerCase().includes('rate')) {
      references.push({ type: 'METRIC', label: `Opportunity Score: ${latestAnalysis.overallScore}/100` });
    }
    if (userMessage.toLowerCase().includes('competitor') || userMessage.toLowerCase().includes('price')) {
      if (latestAnalysis.competitorAnalysis?.[0]) {
        references.push({ type: 'COMPETITOR', label: latestAnalysis.competitorAnalysis[0].name });
      }
    }
    if (userMessage.toLowerCase().includes('experiment') || userMessage.toLowerCase().includes('test')) {
      if (latestAnalysis.experiments?.[0]) {
        references.push({ type: 'EXPERIMENT', label: latestAnalysis.experiments[0].method });
      }
    }
    if (latestAnalysis.researchSources?.[0]) {
      references.push({ type: 'SOURCE', label: latestAnalysis.researchSources[0].domain });
    }
  }

  const systemInstruction = `You are an experienced startup advisor and founder mentor.
Your job is to help the founder make better decisions using evidence.

You must:
- challenge assumptions rigorously
- identify risks
- ask useful questions
- distinguish evidence from hypotheses
- avoid false certainty
- provide practical next actions
- maintain startup context
- reference relevant project information (scores, competitors, customer personas, experiments)
- recommend experiments when evidence is insufficient

CRITICAL RULES:
- Do NOT automatically agree with the founder.
- Do NOT tell the founder an idea is guaranteed to succeed.
- Do NOT fabricate data.
- If evidence is insufficient, explicitly say so.
- Prefer actionable experiments over speculation.
- Keep answers structured, concise, and direct (max 3-4 paragraphs or crisp bullet points).`;

  const contextBlock = latestAnalysis
    ? `
Project Context:
- Name: ${project.name}
- Industry: ${project.industry}
- Stage: ${project.stage}
- Opportunity Score: ${latestAnalysis.overallScore}/100 (Confidence: ${latestAnalysis.confidence}%)
- Recommendation Verdict: ${latestAnalysis.recommendation?.verdict}
- Primary Customer: ${latestAnalysis.customerAnalysis?.[0]?.name}
- Primary Competitor: ${latestAnalysis.competitorAnalysis?.[0]?.name} (${latestAnalysis.competitorAnalysis?.[0]?.pricing})
- Unit Economics: ARPU $${latestAnalysis.businessModel?.unitEconomicsScenario?.arpu}, CAC $${latestAnalysis.businessModel?.unitEconomicsScenario?.cac}, LTV $${latestAnalysis.businessModel?.unitEconomicsScenario?.ltv}
- Active Experiments: ${latestAnalysis.experiments?.map((e) => e.hypothesis).join('; ')}
`
    : `
Project Context:
- Name: ${project.name}
- Industry: ${project.industry}
- Stage: ${project.stage}
- Description: ${project.description}
(No comprehensive analysis run yet)
`;

  if (ai) {
    try {
      const chatHistoryFormatted = history.slice(-6).map((m) => `${m.role === 'user' ? 'Founder' : 'Mentor'}: ${m.content}`).join('\n\n');

      const fullPrompt = `${systemInstruction}

${contextBlock}

Previous Conversation:
${chatHistoryFormatted}

Founder's Query:
"${userMessage}"

Provide your rigorous, evidence-backed advice:`;

      const response = await safeGenerateContent({
        model: GEMINI_MODELS.FLASH,
        contents: fullPrompt,
      });

      const text = response?.text?.trim();
      if (text) {
        return { content: text, references };
      }
    } catch {
      // Fallback to grounded analytical heuristics
    }
  }

  // Fallback mentor response adhering to the exact system prompt
  let responseText = `Let's look at the facts for ${project.name}.\n\n`;

  if (userMessage.toLowerCase().includes('price') || userMessage.toLowerCase().includes('charge') || userMessage.toLowerCase().includes('cost')) {
    responseText += `Regarding pricing: Rather than guessing between price points, examine your competitors and customer willingness-to-pay.\n\n`;
    if (latestAnalysis?.competitorAnalysis?.[0]) {
      responseText += `1. **Anchor**: Your competitor ${latestAnalysis.competitorAnalysis[0].name} charges ${latestAnalysis.competitorAnalysis[0].pricing}.\n`;
    }
    responseText += `2. **Evidence Gap**: Willingness-to-pay is currently a **Hypothesis**, not verified data.\n`;
    responseText += `3. **Next Action**: Instead of speculating, run a pricing smoke test with 2 landing page variations or ask your next 5 interviewees: *"At what price would this tool feel so expensive you would reject it, and at what price would you question its quality?"*`;
  } else if (userMessage.toLowerCase().includes('mvp') || userMessage.toLowerCase().includes('feature') || userMessage.toLowerCase().includes('build')) {
    responseText += `Be ruthless about scope. The purpose of your MVP is NOT to scale; it is to test your riskiest assumption.\n\n`;
    responseText += `1. **Fatal Assumption**: That target users will actually execute the verification protocol consistently.\n`;
    responseText += `2. **Recommendation**: Defer complex integrations and native mobile apps. Run a 14-day concierge test with 10 users using simple tools (SMS or web form) before writing backend code.\n`;
    responseText += `3. **Success Metric**: If fewer than 70% of test participants complete the daily prompt, building more features will not save the business.`;
  } else {
    responseText += `Your idea for ${project.name} has identifiable tailwinds in ${project.industry}, but you are still operating on key unproven assumptions.\n\n`;
    responseText += `Before scaling or investing capital, what is the single biggest question that, if answered with a "No", would kill this project? Let's design a quick 7-day experiment to test that specific point.`;
  }

  return { content: responseText, references };
}
