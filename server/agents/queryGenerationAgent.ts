/**
 * Query Generation Agent (Section 7)
 * Produces highly specific, contextual research queries rather than generic search terms.
 */

import { getGeminiClient, GEMINI_MODELS } from '../gemini';
import { StartupProject } from '../../src/types';

export interface GeneratedQueries {
  marketQueries: string[];
  competitorQueries: string[];
  customerPainQueries: string[];
  pricingQueries: string[];
  trendQueries: string[];
  regulatoryQueries: string[];
}

export async function generateResearchQueries(project: StartupProject): Promise<GeneratedQueries> {
  const ai = getGeminiClient();

  const prompt = `You are an expert startup research intelligence agent.
Generate specific, targeted research queries to investigate this startup idea.
Never generate generic queries like "startup market trends".
Generate search queries that an investigative analyst would use to uncover real evidence, competitors, pricing, customer complaints, and market data.

Startup Context:
- Name: ${project.name}
- Description: ${project.description}
- Industry: ${project.industry}
- Target Market: ${project.targetMarket}
- Target Customer: ${project.targetCustomer}
- Geography: ${project.geography}
- Business Model: ${project.businessModel}

Return ONLY valid JSON matching this exact structure:
{
  "marketQueries": ["2-3 specific market sizing / demand queries"],
  "competitorQueries": ["2-3 specific direct and indirect competitor queries"],
  "customerPainQueries": ["2-3 specific customer complaints and pain point queries"],
  "pricingQueries": ["2-3 competitor pricing, willingness-to-pay, and tier queries"],
  "trendQueries": ["2-3 industry trends, adoption signals, and shift queries"],
  "regulatoryQueries": ["1-2 regulatory, compliance, or liability risk queries"]
}`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: GEMINI_MODELS.FLASH,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text?.trim();
      if (text) {
        const parsed = JSON.parse(text) as GeneratedQueries;
        if (Array.isArray(parsed.marketQueries) && parsed.marketQueries.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Query generation via Gemini failed, falling back to deterministic generator:', err);
    }
  }

  // Deterministic fallback query generator
  const ind = project.industry || 'technology';
  const cust = project.targetCustomer || 'buyers';
  const geo = project.geography || 'North America';
  const name = project.name;

  return {
    marketQueries: [
      `${ind} market size annual growth rate 2025 2026 ${geo}`,
      `total addressable market spend ${cust} ${ind} reports`,
      `industry demand drivers and market contraction risks in ${ind}`,
    ],
    competitorQueries: [
      `top funded companies software platforms for ${cust} in ${ind}`,
      `alternatives to existing solutions for ${project.description.slice(0, 60)}`,
      `G2 Capterra competitor comparison matrix ${ind} ${cust}`,
    ],
    customerPainQueries: [
      `biggest frustrations complaints ${cust} ${ind} Reddit discussion`,
      `why do ${cust} churn or cancel software services in ${ind}`,
      `unsolved workflow bottlenecks for ${cust}`,
    ],
    pricingQueries: [
      `typical software pricing tiers benchmarks for ${cust} in ${ind}`,
      `annual contract value ACV churn rate average for ${project.businessModel}`,
      `willingness to pay price sensitivity ${cust} ${ind}`,
    ],
    trendQueries: [
      `emerging technological disruptions and shifts in ${ind} 2025 2026`,
      `venture capital funding slowdown or acceleration in ${ind}`,
      `new distribution channels and acquisition tactics for ${cust}`,
    ],
    regulatoryQueries: [
      `compliance liability regulatory hurdles for ${name} in ${geo}`,
      `data privacy consumer protection requirements in ${ind}`,
    ],
  };
}
