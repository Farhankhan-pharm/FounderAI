import React, { useState } from 'react';
import {
  Download,
  FileCode,
  FileSpreadsheet,
  Copy,
  Printer,
  Check,
  Share2,
  FileText,
} from 'lucide-react';
import { StartupProject, StartupAnalysis } from '../../types';

interface ExportShareTabProps {
  project: StartupProject;
  analysis: StartupAnalysis;
}

export const ExportShareTab: React.FC<ExportShareTabProps> = ({ project, analysis }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyMarkdown = async () => {
    try {
      const res = await fetch(`/api/projects/${project.id}/export/markdown`);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy markdown:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Export Actions Card */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <Share2 className="w-4 h-4 text-zinc-700" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
            Export & Share Intelligence Dossier (Section 40)
          </h2>
        </div>
        <p className="text-xs text-zinc-700 mb-6">
          Download structured research outputs, sync data with spreadsheets, or export formatted investor briefings.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Markdown */}
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs mb-1">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Markdown Report</span>
              </div>
              <p className="text-[11px] text-zinc-700">
                Complete structured executive briefing with all sections.
              </p>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <a
                href={`/api/projects/${project.id}/export/markdown`}
                download
                className="flex-1 py-1.5 px-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-semibold text-center transition-colors shadow-2xs"
              >
                Download .md
              </a>
              <button
                onClick={handleCopyMarkdown}
                title="Copy Markdown to Clipboard"
                className="p-1.5 bg-white border border-zinc-300 hover:bg-zinc-100 rounded-lg text-zinc-700 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* JSON */}
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs mb-1">
                <FileCode className="w-4 h-4 text-purple-600" />
                <span>JSON Schema</span>
              </div>
              <p className="text-[11px] text-zinc-700">
                Full machine-readable payload matching Section 26 JSON specification.
              </p>
            </div>

            <div className="mt-4">
              <a
                href={`/api/projects/${project.id}/export/json`}
                download
                className="block w-full py-1.5 px-2.5 bg-white border border-zinc-300 hover:bg-zinc-100 text-zinc-900 rounded-lg text-xs font-semibold text-center transition-colors shadow-2xs"
              >
                Download .json
              </a>
            </div>
          </div>

          {/* CSV Sources */}
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs mb-1">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Sources & Citations CSV</span>
              </div>
              <p className="text-[11px] text-zinc-700">
                Tabular citations with URLs, credibility scores, and domain metadata.
              </p>
            </div>

            <div className="mt-4">
              <a
                href={`/api/projects/${project.id}/export/csv`}
                download
                className="block w-full py-1.5 px-2.5 bg-white border border-zinc-300 hover:bg-zinc-100 text-zinc-900 rounded-lg text-xs font-semibold text-center transition-colors shadow-2xs"
              >
                Download .csv
              </a>
            </div>
          </div>

          {/* Print / PDF */}
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs mb-1">
                <Printer className="w-4 h-4 text-zinc-700" />
                <span>Printable / PDF Brief</span>
              </div>
              <p className="text-[11px] text-zinc-700">
                Clean browser print view styled for physical review or PDF export.
              </p>
            </div>

            <div className="mt-4">
              <button
                onClick={handlePrint}
                className="w-full py-1.5 px-2.5 bg-white border border-zinc-300 hover:bg-zinc-100 text-zinc-900 rounded-lg text-xs font-semibold transition-colors shadow-2xs flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print to PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Summary Preview */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs print:border-none print:shadow-none">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-4">
          Investor & Co-Founder Briefing Summary
        </h3>

        <div className="p-5 bg-zinc-50 rounded-xl border border-zinc-200 space-y-4 text-xs text-zinc-800 leading-relaxed font-mono">
          <div>
            <strong className="text-zinc-900 block font-bold">PROJECT: {project.name}</strong>
            <span className="text-zinc-700 text-[11px]">
              Stage: {project.stage} | Industry: {project.industry} | Geography: {project.geography}
            </span>
          </div>

          <div>
            <strong className="text-zinc-900 block font-bold">EXECUTIVE VERDICT:</strong>
            <span className="text-zinc-900 font-bold">
              {analysis.recommendation.verdict} — Opportunity Score: {analysis.overallScore}/100 | Evidentiary Confidence: {analysis.confidence}%
            </span>
          </div>

          <div>
            <strong className="text-zinc-900 block font-bold">IMMEDIATE MILESTONE:</strong>
            <span>{analysis.recommendation.immediateNextAction}</span>
          </div>

          <div>
            <strong className="text-zinc-900 block font-bold">CORE VALUE WEDGE:</strong>
            <span>{analysis.differentiationStrategy?.coreMoat}</span>
          </div>

          <div>
            <strong className="text-zinc-900 block font-bold">MODELED UNIT ECONOMICS:</strong>
            <span>
              ARPU ${analysis.businessModel.unitEconomicsScenario.arpu} • CAC ${analysis.businessModel.unitEconomicsScenario.cac} • LTV ${analysis.businessModel.unitEconomicsScenario.ltv} • Payback {analysis.businessModel.unitEconomicsScenario.paybackMonths} mo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
