import React from 'react';
import type { Lead } from '../../types';
import { LeadDetail } from '../LeadDetail';
import { SlideOver } from '../SlideOver/SlideOver';

type LeadSlideOverProps = {
    lead: Lead | null;
    onClose: () => void;
    onCancel: () => void;
    onSave: (id: string, patch: Partial<Lead>, simulateFail?: boolean) => Promise<void>;
    onConvert: (id: string, opts: { amount?: number | null; stage?: string }) => Promise<void>;
};

export const LeadSlideOver: React.FC<LeadSlideOverProps> = ({ lead, onClose, onSave, onConvert, onCancel }) => {
    return (
        <SlideOver open={!!lead} onClose={onClose}>
            {lead && <LeadDetail lead={lead} onSave={onSave} onConvert={onConvert} onCancel={onCancel} />}
        </SlideOver>
    );
};
