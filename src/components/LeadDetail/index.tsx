import React, { useEffect, useState } from 'react';
import type { Lead } from '../../types';

type LeadDetailProps = {
  lead: Lead;
  onSave: (id: string, patch: Partial<Lead>, simulateFail?: boolean) => Promise<void>;
  onConvert: (id: string, opts: { amount?: number | null; stage?: string }) => Promise<void>;
  onCancel: () => void;
};

const STAGES = ['Prospecting', 'Qualification', 'Negotiation', 'Closed Won', 'Closed Lost'];

export const LeadDetail: React.FC<LeadDetailProps> = ({ lead, onSave, onConvert, onCancel }) => {
  const [email, setEmail] = useState(lead.email);
  const [status, setStatus] = useState<Lead['status']>(lead.status);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [stage, setStage] = useState(STAGES[0]);
  const [amount, setAmount] = useState<number | null>(null);
  const [converting, setConverting] = useState(false);

  useEffect(() => {
    setEmail(lead.email);
    setStatus(lead.status);
    setStage(STAGES[0]);
    setAmount(null);
    setEmailError(null);
  }, [lead]);

  const validateEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

  const handleSave = async () => {
    if (!validateEmail(email)) {
      setEmailError('Invalid email');
      return;
    }
    setEmailError(null);
    setSaving(true);
    try {
      await onSave(lead.id, { email, status });
    } finally {
      setSaving(false);
    }
  };

  const isConverted = status === 'Qualified';
  const canConvert = !isConverted;

  const handleConvert = async () => {
    setConverting(true);
    try {
      await onConvert(lead.id, { stage, amount });
    } finally {
      setConverting(false);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="p-4 bg-white border rounded-lg shadow-sm flex flex-col gap-4">
        <h3 className="text-lg font-medium text-gray-700">Edit Lead</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <div className="mt-1 text-gray-900">{lead.name}</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <div className="mt-1 text-gray-900">{lead.company}</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={`mt-1 block w-full px-3 py-2 rounded-md text-sm border ${emailError ? 'border-red-500' : 'border-gray-300'
              }`}
          />
          {emailError && <div className="text-red-500 text-sm mt-1">{emailError}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value as Lead['status'])}
            className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="h-10 bg-indigo-600 text-white px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={onCancel}
            className="h-10 bg-gray-300 text-gray-700 px-4 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>

      <div
        className={`p-4 border rounded-lg shadow-sm flex flex-col gap-4 ${canConvert ? 'bg-green-50 border-green-200' : 'bg-gray-100 border-gray-300'
          }`}
      >
        <h3 className={`text-lg font-medium ${canConvert ? 'text-green-700' : 'text-gray-500'}`}>
          Convert to Opportunity
        </h3>

        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="block text-sm font-medium">
              Stage
            </label>
            <select
              value={stage}
              onChange={e => setStage(e.target.value)}
              disabled={!canConvert}
              className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              {STAGES.map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Amount (optional)</label>
            <input
              type="number"
              value={amount ?? ''}
              onChange={e => setAmount(e.target.value ? Number(e.target.value) : null)}
              disabled={!canConvert}
              className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        <button
          onClick={handleConvert}
          disabled={!canConvert || converting}
          className={`h-10 w-full px-4 rounded-md ${canConvert
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-gray-400 text-gray-700 cursor-not-allowed'
            } disabled:opacity-50`}
        >
          {converting ? 'Converting...' : 'Convert Lead'}
        </button>

        {isConverted && (
          <div className="text-sm text-gray-500 mt-2">
            This lead has already been converted to an opportunity.
          </div>
        )}
      </div>
    </div>
  );
};
