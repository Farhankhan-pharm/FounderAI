/**
 * Confidence Engine (Section 23)
 * Decouples Opportunity Score from Analytical Confidence Score.
 * Confidence calculates certainty of claims based on evidentiary rigor.
 */

import { ConfidenceBreakdown, ResearchSource, EvidenceItem, ContradictionAlert } from '../../src/types';

export function calculateConfidence(
  sources: ResearchSource[],
  evidences: EvidenceItem[],
  contradictions: ContradictionAlert[],
  untestedAssumptionsCount: number
): ConfidenceBreakdown {
  const sourceCount = sources.length;

  // 1. Average Credibility (0 - 100)
  const averageCredibility =
    sourceCount > 0
      ? sources.reduce((acc, s) => acc + s.credibility, 0) / sourceCount
      : 0.5;

  // 2. Direct Evidence Ratio (VERIFIED + SOURCE_BACKED vs Total)
  const directEvidenceItems = evidences.filter(
    (e) => e.evidenceType === 'VERIFIED' || e.evidenceType === 'SOURCE_BACKED'
  ).length;
  const directEvidenceRatio =
    evidences.length > 0 ? directEvidenceItems / evidences.length : 0.5;

  // 3. Source Volume Factor (min 1, max 8)
  const sourceVolumeScore = Math.min(sourceCount / 5, 1.0);

  // 4. Contradiction Penalty (each active contradiction deducts 4 points, capped at -20)
  const contradictionPenalty = Math.min(contradictions.length * 4, 20);

  // 5. Assumption Uncertainty (each untested assumption above 2 deducts 3 points)
  const assumptionPenalty = Math.min(Math.max(untestedAssumptionsCount - 2, 0) * 3, 15);

  // Base raw score
  let rawConfidence =
    (averageCredibility * 40) +
    (directEvidenceRatio * 35) +
    (sourceVolumeScore * 25) -
    contradictionPenalty -
    assumptionPenalty;

  const finalConfidence = Math.round(Math.min(Math.max(rawConfidence, 15), 98));

  let summary = '';
  if (finalConfidence >= 80) {
    summary = 'High evidential backing from peer-reviewed, government, or direct company data.';
  } else if (finalConfidence >= 60) {
    summary = 'Moderate confidence: Key market trends are supported, but critical unit economics and customer behavior remain hypotheses.';
  } else {
    summary = 'Low confidence: Limited verified external data; multiple untested fatal assumptions identified.';
  }

  return {
    overallConfidence: finalConfidence,
    sourceCount,
    averageCredibility: Math.round(averageCredibility * 100) / 100,
    directEvidenceRatio: Math.round(directEvidenceRatio * 100) / 100,
    contradictionPenalty: -contradictionPenalty,
    untestedAssumptionsCount,
    summary,
  };
}
