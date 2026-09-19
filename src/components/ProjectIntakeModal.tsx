import React, { useState } from 'react';
import { X, Sparkles, Plus, AlertCircle, Wand2 } from 'lucide-react';
import { StartupProject } from '../types';

interface ProjectIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: Partial<StartupProject>) => void;
}

export const ProjectIntakeModal: React.FC<ProjectIntakeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState('Healthcare & Eldercare');
  const [targetMarket, setTargetMarket] = useState('Senior Care & Home Health');
  const [targetCustomer, setTargetCustomer] = useState('Adult Children Caregivers & Home Care Agencies');
  const [geography, setGeography] = useState('United States');
  const [businessModel, setBusinessModel] = useState('B2C Subscription & B2B Institutional Licensing');
  const [budget, setBudget] = useState('$15,000');
  const [stage, setStage] = useState<StartupProject['stage']>('IDEA');

  if (!isOpen) return null;

  const handleFillTemplate = (type: 'logistics' | 'construction' | 'vet') => {
    if (type === 'logistics') {
      setName('DockTrace');
      setDescription('Automated truck detention time logger and automated invoice claims for independent owner-operators.');
      setIndustry('Supply Chain & Freight Logistics');
      setTargetMarket('North American Dry Van Trucking');
      setTargetCustomer('Independent Freight Drivers & Small Fleets');
      setGeography('United States');
      setBusinessModel('Usage Transaction Contingency (10% of recovered detention)');
      setBudget('$10,000');
      setStage('IDEA');
    } else if (type === 'construction') {
      setName('LienSync');
      setDescription('Automated conditional lien waiver exchange and instant ACH payment reconciliation for specialty commercial subcontractors.');
      setIndustry('Commercial Construction');
      setTargetMarket('Specialty Trade Subcontractors');
      setTargetCustomer('Commercial Electrical & HVAC Trade Subcontractors');
      setGeography('North America');
      setBusinessModel('B2B SaaS ($299/mo per subcontractor)');
      setBudget('$25,000');
      setStage('MVP_BUILDING');
    } else if (type === 'vet') {
      setName('VetLabRate');
      setDescription('Transparent reference laboratory diagnostic price comparison engine and automated invoice auditor for independent veterinary clinics.');
      setIndustry('Veterinary Medicine & Pet Health');
      setTargetMarket('Independent Veterinary Practices');
      setTargetCustomer('Veterinary Practice Owners & Hospital Managers');
      setGeography('United States & Canada');
      setBusinessModel('Marketplace Referral & Fee Savings Split');
      setBudget('$12,000');
      setStage('IDEA');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    onSubmit({
      name,
      description,
      industry,
      targetMarket,
      targetCustomer,
      geography,
      businessModel,
      budget,
      stage,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-xl max-w-2xl w-full my-8 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white">
              <Plus className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-900 tracking-tight">
                New Startup Intelligence Project
              </h2>
              <p className="text-xs text-zinc-700">
                Phase 1 Intake Questionnaire: Feeds the 14-Step Research Pipeline
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-700 hover:text-zinc-900 hover:bg-zinc-200/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Fill Templates */}
        <div className="px-6 py-2.5 bg-zinc-100/70 border-b border-zinc-200 flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-zinc-700 font-bold flex items-center gap-1 shrink-0">
            <Wand2 className="w-3 h-3 text-zinc-600" />
            Quick Template:
          </span>
          <button
            type="button"
            onClick={() => handleFillTemplate('construction')}
            className="px-2.5 py-0.5 rounded-full bg-white hover:bg-zinc-200/80 text-zinc-800 border border-zinc-300 transition-colors shrink-0"
          >
            Subcontractor Lien Waiver SaaS
          </button>
          <button
            type="button"
            onClick={() => handleFillTemplate('logistics')}
            className="px-2.5 py-0.5 rounded-full bg-white hover:bg-zinc-200/80 text-zinc-800 border border-zinc-300 transition-colors shrink-0"
          >
            Freight Detention Tracker
          </button>
          <button
            type="button"
            onClick={() => handleFillTemplate('vet')}
            className="px-2.5 py-0.5 rounded-full bg-white hover:bg-zinc-200/80 text-zinc-800 border border-zinc-300 transition-colors shrink-0"
          >
            Vet Diagnostic Comparison
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-zinc-800 mb-1">Startup Project Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. MediQuick, DockTrace"
                className="w-full bg-zinc-50 border border-zinc-300 rounded-lg p-2.5 text-zinc-900 focus:ring-1 focus:ring-zinc-900"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-800 mb-1">Current Stage</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as any)}
                className="w-full bg-zinc-50 border border-zinc-300 rounded-lg p-2.5 text-zinc-900 focus:ring-1 focus:ring-zinc-900"
              >
                <option value="IDEA">Idea Stage (Pre-Code)</option>
                <option value="PROBLEM_VALIDATION">Problem Validation</option>
                <option value="SOLUTION_DESIGN">Solution Design</option>
                <option value="MVP_BUILDING">MVP Prototype / Building</option>
                <option value="EARLY_TRACTION">Early Pilots / Initial Revenue</option>
                <option value="SCALING">Scaling / Growth</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-zinc-800 mb-1">
              Core Problem & Solution Description *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what painful problem exists and how your product solves it..."
              className="w-full bg-zinc-50 border border-zinc-300 rounded-lg p-2.5 text-zinc-900 focus:ring-1 focus:ring-zinc-900 leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-zinc-800 mb-1">Industry / Domain</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Healthcare, B2B SaaS"
                className="w-full bg-zinc-50 border border-zinc-300 rounded-lg p-2.5 text-zinc-900"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-800 mb-1">Target Customer Persona</label>
              <input
                type="text"
                value={targetCustomer}
                onChange={(e) => setTargetCustomer(e.target.value)}
                placeholder="e.g. Commercial HVAC Subcontractors"
                className="w-full bg-zinc-50 border border-zinc-300 rounded-lg p-2.5 text-zinc-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-zinc-800 mb-1">Geography</label>
              <input
                type="text"
                value={geography}
                onChange={(e) => setGeography(e.target.value)}
                placeholder="e.g. United States"
                className="w-full bg-zinc-50 border border-zinc-300 rounded-lg p-2.5 text-zinc-900"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-800 mb-1">Business Model</label>
              <input
                type="text"
                value={businessModel}
                onChange={(e) => setBusinessModel(e.target.value)}
                placeholder="e.g. B2B SaaS, Subscription"
                className="w-full bg-zinc-50 border border-zinc-300 rounded-lg p-2.5 text-zinc-900"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-800 mb-1">Target Budget</label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. $15,000"
                className="w-full bg-zinc-50 border border-zinc-300 rounded-lg p-2.5 text-zinc-900"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-zinc-700 hover:text-zinc-900 bg-white border border-zinc-300 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Create & Launch Analysis Pipeline</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
