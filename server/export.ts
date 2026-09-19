/**
 * Export System (Section 40)
 * Generates Markdown, JSON, and CSV exports for research sources and structured analysis reports.
 */

import { StartupAnalysis, StartupProject } from '../src/types';

export function exportAnalysisToMarkdown(project: StartupProject, analysis: StartupAnalysis): string {
  return `# STARTUP INTELLIGENCE REPORT: ${project.name}
Generated: ${analysis.createdAt}
Project Stage: ${project.stage}
Industry: ${project.industry} | Geography: ${project.geography}

---

## 1. EXECUTIVE SUMMARY & VERDICT
- **Recommendation Verdict**: ${analysis.recommendation.verdict}
- **AI Opportunity Score**: ${analysis.overallScore} / 100
- **Evidentiary Confidence**: ${analysis.confidence}%
- **Primary Reason**: ${analysis.recommendation.primaryReason}
- **Immediate Next Action**: ${analysis.recommendation.immediateNextAction}

### Executive Summary
${analysis.executiveSummary}

---

## 2. DETERMINISTIC SCORE BREAKDOWN (0-100)
- Market Demand (20%): ${analysis.scores.marketDemand}
- Customer Pain (15%): ${analysis.scores.customerPain}
- Competition (10%): ${analysis.scores.competition}
- Differentiation (15%): ${analysis.scores.differentiation}
- Monetization (15%): ${analysis.scores.monetization}
- Timing (10%): ${analysis.scores.timing}
- Distribution Feasibility (5%): ${analysis.scores.distributionDifficulty}
- Execution Feasibility (5%): ${analysis.scores.executionDifficulty}
- Risk Profile (5%): ${analysis.scores.risk}

*Methodology: ${analysis.scores.methodology}*

---

## 3. MARKET & ADDRESSABLE OPPORTUNITY
${analysis.marketAnalysis.structureSummary}

### Market Drivers
${analysis.marketAnalysis.marketDrivers.map((d) => `- ${d}`).join('\n')}

### Market Trends
${analysis.marketAnalysis.marketTrends.map((t) => `- ${t}`).join('\n')}

### TAM / SAM / SOM Calculation
- **Status**: ${analysis.marketAnalysis.tamCalculation.status}
${
  analysis.marketAnalysis.tamCalculation.status === 'CALCULATED'
    ? `- **TAM**: $${(analysis.marketAnalysis.tamCalculation.tamValueUSD || 0).toLocaleString()} USD
- **SAM**: $${(analysis.marketAnalysis.tamCalculation.samValueUSD || 0).toLocaleString()} USD
- **SOM**: $${(analysis.marketAnalysis.tamCalculation.somValueUSD || 0).toLocaleString()} USD
- **Methodology**: ${analysis.marketAnalysis.tamCalculation.methodology}
- **Confidence**: ${Math.round((analysis.marketAnalysis.tamCalculation.confidence || 0) * 100)}%`
    : '- **Note**: Insufficient verified data exists in sources to publish reliable figures.'
}

---

## 4. CUSTOMER PERSONAS & PAIN SCORES
${analysis.customerAnalysis
  .map(
    (c) => `### ${c.name}
${c.roleDescription}
- **Description**: ${c.description}
- **Customer Pain Score**: ${c.painScore.overall} / 100 (Urgency: ${c.painScore.urgency}, Frequency: ${c.painScore.frequency}, Economic Impact: ${c.painScore.economicImpact}, Frustration: ${c.painScore.existingFrustration})
- **Buying Triggers**:
${c.buyingTriggers.map((b) => `  - ${b}`).join('\n')}
- **Objections**:
${c.objections.map((o) => `  - ${o}`).join('\n')}
- **Willingness to Pay**: ${c.willingnessToPay}`
  )
  .join('\n\n')}

---

## 5. COMPETITIVE INTELLIGENCE & GAPS
${analysis.competitorAnalysis
  .map(
    (comp) => `### ${comp.name} (${comp.category})
- **Website**: ${comp.website}
- **Pricing**: ${comp.pricing}
- **Strengths**: ${comp.strengths.join(', ')}
- **Weaknesses**: ${comp.weaknesses.join(', ')}
- **Verification Status**: ${comp.requiresVerification ? 'Requires External Verification' : 'Verified'}`
  )
  .join('\n\n')}

### Identified Market Gaps
${analysis.gapAnalysis
  .map(
    (gap) => `#### ${gap.title} (${gap.gapType})
${gap.description}
- Opportunity Score: ${gap.opportunityScore}/100 | Confidence: ${Math.round(gap.confidence * 100)}%`
  )
  .join('\n\n')}

---

## 6. BUSINESS MODEL & UNIT ECONOMICS SCENARIO
- **Primary Model**: ${analysis.businessModel.primaryModel}
- **ARPU**: $${analysis.businessModel.unitEconomicsScenario.arpu} / month
- **Gross Margin**: ${analysis.businessModel.unitEconomicsScenario.grossMarginPercent}%
- **Estimated CAC**: $${analysis.businessModel.unitEconomicsScenario.cac}
- **Monthly Churn**: ${analysis.businessModel.unitEconomicsScenario.monthlyChurnPercent}%
- **Modeled LTV**: $${analysis.businessModel.unitEconomicsScenario.ltv}
- **Payback Period**: ${analysis.businessModel.unitEconomicsScenario.paybackMonths} months

*Disclaimer: ${analysis.businessModel.unitEconomicsScenario.disclaimer}*

---

## 7. MVP ROADMAP & VALIDATION EXPERIMENTS
### Must-Build Core Features
${analysis.mvp.features
  .filter((f) => f.priority === 'MUST_BUILD')
  .map((f) => `- **${f.feature}**: ${f.reason} *(Tests: ${f.hypothesisTested})*`)
  .join('\n')}

### Features to Avoid
${analysis.mvp.features
  .filter((f) => f.priority === 'AVOID')
  .map((f) => `- **${f.feature}**: ${f.reason}`)
  .join('\n')}

### Validation Experiments
${analysis.experiments
  .map(
    (e, idx) => `#### Experiment ${idx + 1}: ${e.method} (${e.priority} Priority)
- **Hypothesis**: ${e.hypothesis}
- **Target Participants**: ${e.targetParticipants} | Timeline: ${e.estimatedTime}
- **Success Criteria**: ${e.successCriteria.join('; ')}
- **Failure Criteria**: ${e.failureCriteria.join('; ')}`
  )
  .join('\n\n')}

---

## 8. RISKS & CONTRADICTION AUDIT
${analysis.risks
  .map(
    (r) => `- **[${r.category}] ${r.risk}** (Severity: ${r.severity}/25)
  *Mitigation*: ${r.mitigation}`
  )
  .join('\n')}

${
  analysis.contradictions.length > 0
    ? `### Conflicting Evidentiary Alerts
${analysis.contradictions
  .map(
    (c) => `- **${c.topic}**:
  - Claim A: "${c.claimA.statement}" (${c.claimA.source})
  - Claim B: "${c.claimB.statement}" (${c.claimB.source})
  - *Resolution*: ${c.synthesisNote} (${c.confidenceImpact})`
  )
  .join('\n\n')}`
    : ''
}

---

## 9. RESEARCH SOURCES & EVIDENCE AUDIT
${analysis.evidence
  .map(
    (evi) => `- **[${evi.evidenceType}]** (Confidence: ${Math.round(evi.confidence * 100)}%)
  "${evi.claim}"
  *Supporting Text*: ${evi.supportingText}
  *Source*: ${evi.sourceTitle || 'Internal Analytical Deduction'}`
  )
  .join('\n\n')}
`;
}

export function exportSourcesToCSV(sources: StartupAnalysis['researchSources']): string {
  const headers = ['Title', 'URL', 'Domain', 'Source Type', 'Credibility Score', 'Summary', 'Retrieved Date'];
  const rows = sources.map((s) => [
    `"${(s.title || '').replace(/"/g, '""')}"`,
    `"${(s.url || '').replace(/"/g, '""')}"`,
    `"${(s.domain || '').replace(/"/g, '""')}"`,
    `"${s.sourceType}"`,
    s.credibility.toFixed(2),
    `"${(s.summary || '').replace(/"/g, '""')}"`,
    `"${s.retrievedAt}"`,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}
