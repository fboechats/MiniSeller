export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';
export type LeadSort = 'score_desc' | 'score_asc';

export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: LeadStatus;
};

export type Opportunity = {
  id: string;
  name: string;
  stage: string;
  amount?: number | null;
  accountName: string;
};