import { useEffect, useState } from 'react';
import type { Lead, Opportunity } from '../types';
import { getJSON, setJSON } from '../utils/storage';

const LS_KEYS = {
  FILTER: 'msc.filter',
  SORT: 'msc.sort',
  SEARCH: 'msc.search',
  LEADS: 'msc.leads',
  OPPS: 'msc.opps'
};

export function useLeads(initialData: Lead[] = []) {
  const [leads, setLeads] = useState<Lead[]>(() => getJSON<Lead[]>(LS_KEYS.LEADS, initialData));
  const [opps, setOpps] = useState<Opportunity[]>(() => getJSON<Opportunity[]>(LS_KEYS.OPPS, []));
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(() => getJSON<string>(LS_KEYS.SEARCH, ''));
  const [filter, setFilter] = useState<'All' | Lead['status']>(() => getJSON(LS_KEYS.FILTER, 'All'));
  const [sort, setSort] = useState<'score_desc' | 'score_asc'>(() => getJSON(LS_KEYS.SORT, 'score_desc'));

  useEffect(() => { setJSON(LS_KEYS.SEARCH, search); }, [search]);
  useEffect(() => { setJSON(LS_KEYS.FILTER, filter); }, [filter]);
  useEffect(() => { setJSON(LS_KEYS.SORT, sort); }, [sort]);
  useEffect(() => { setJSON(LS_KEYS.LEADS, leads); }, [leads]);
  useEffect(() => { setJSON(LS_KEYS.OPPS, opps); }, [opps]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const t = setTimeout(() => {
      if (!mounted) return;
      setLeads(prev => prev.length ? prev : initialData);
      setLoading(false);
    }, 400);
    return () => { mounted = false; clearTimeout(t); };
  }, []);

  const visibleLeads = (() => {
    let list = leads.slice();
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(l => l.name.toLowerCase().includes(q) || l.company.toLowerCase().includes(q));
    }
    if (filter !== 'All') list = list.filter(l => l.status === filter);
    if (sort === 'score_desc') list.sort((a, b) => b.score - a.score);
    else list.sort((a, b) => a.score - b.score);
    return list;
  })();

  const updateLeadOptimistic = async (id: string, patch: Partial<Lead>, simulateFail = false) => {
    const prev = leads;
    setLeads(ls => ls.map(l => l.id === id ? { ...l, ...patch } : l));
    await new Promise(res => setTimeout(res, 300));
    if (simulateFail && import.meta.env.MODE !== 'test' && Math.random() < 0.2) {
      setLeads(prev);
      throw new Error('Simulated save failure');
    }
    return true;
  };

  const convertLead = async (id: string, data: { amount?: number | null; stage?: string }) => {
    const lead = leads.find(l => l.id === id);
    if (!lead) throw new Error('Lead not found');

    const opp: Opportunity = {
      id: `opp-${Date.now()}`,
      name: lead.name,
      stage: data.stage || 'Prospecting',
      amount: data.amount ?? null,
      accountName: lead.company
    };

    const prevLeads = leads;
    const prevOpps = opps;

    setLeads(s => s.map(l => l.id === id ? { ...l, status: 'Qualified' } : l));

    setOpps(s => [opp, ...s]);

    await new Promise(res => setTimeout(res, 350));

    if (import.meta.env.MODE !== 'test' && Math.random() < 0.12) {
      setLeads(prevLeads);
      setOpps(prevOpps);
      throw new Error('Simulated conversion failure');
    }

    return opp;
  };

  return {
    leads,
    opps,
    visibleLeads,
    loading,
    search,
    setSearch,
    filter,
    setFilter,
    sort,
    setSort,
    updateLeadOptimistic,
    convertLead,
    setLeads,
    setOpps
  } as const;
}
