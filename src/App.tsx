import { useEffect, useState } from 'react';
import { LeadDetail } from './components/LeadDetail';
import { LeadTable } from './components/LeadTable';
import { OpportunitiesTable } from './components/OpportunitiesTable';
import { SlideOver } from './components/SlideOver/SlideOver';
import initialLeads from './data/leads.json';
import { useLeads } from './hooks/useLeads';
import type { Lead } from './types';

export default function App() {
  const {
    visibleLeads,
    leads,
    loading,
    search,
    setSearch,
    filter,
    setFilter,
    sort,
    setSort,
    opps,
    updateLeadOptimistic,
    convertLead,
  } = useLeads(initialLeads as Lead[]);

  const [selected, setSelected] = useState<Lead | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const onOpen = (lead: Lead) => {
    const fresh = leads.find((l) => l.id === lead.id) || lead;
    setSelected(fresh);
  };

  const onClose = () => setSelected(null);

  const handleSave = async (id: string, patch: Partial<Lead>, simulateFail = false) => {
    try {
      await updateLeadOptimistic(id, patch, simulateFail);
      setSelected((prev) => (prev && prev.id === id ? { ...prev, ...patch } : prev));
      setToast('Saved successfully');
    } catch (e: any) {
      setToast(`Save error: ${e.message || String(e)}`);
      throw e;
    }
  };

  const handleConvert = async (id: string, opts: { amount?: number | null; stage?: string }) => {
    try {
      await convertLead(id, opts);
      setToast('Lead converted to opportunity');
      setSelected(null);
    } catch (e: any) {
      setToast(`Conversion error: ${e.message || String(e)}`);
      throw e;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <header className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Mini Seller</h1>
        <div className="flex gap-2 items-center">
          <div className="text-sm text-gray-600">
            Leads: <span className="font-medium">{visibleLeads.length}</span>
          </div>
          <div className="text-sm text-gray-600">
            Opportunities: <span className="font-medium">{opps.length}</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2 bg-white rounded-lg shadow p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="flex-1 w-full px-2 py-2 border rounded-md text-sm sm:px-3 sm:py-2"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="w-full sm:w-auto px-2 py-2 border rounded-md text-sm sm:px-3 sm:py-2"
            >
              <option value="All">All</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="w-full sm:w-auto px-2 py-2 border rounded-md text-sm sm:px-3 sm:py-2"
            >
              <option value="score_desc">Score ↓</option>
              <option value="score_asc">Score ↑</option>
            </select>
          </div>

          {loading ? (
            <div className="p-10 text-center text-gray-500">Loading...</div>
          ) : (
            <div className="overflow-x-auto w-full">
              <LeadTable leads={visibleLeads} onOpen={onOpen} />
            </div>
          )}
        </section>

        <aside className="bg-white rounded-lg shadow p-4">
          <h3 className="font-medium mb-3">Opportunities</h3>
          <div className="overflow-x-auto w-full">
            <OpportunitiesTable opportunities={opps} />
          </div>
        </aside>
      </div>

      <SlideOver open={!!selected} onClose={onClose}>
        {selected ? (
          <LeadDetail
            lead={selected}
            onSave={async (id, patch, simulateFail) => handleSave(id, patch, simulateFail)}
            onConvert={async (id, opts) => handleConvert(id, opts)}
            onCancel={onClose}
          />
        ) : (
          <div />
        )}
      </SlideOver>

      {toast && (
        <div className="fixed right-4 bottom-4 bg-black text-white px-4 py-2 rounded-md shadow z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
