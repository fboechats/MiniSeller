import React from 'react';
import type { Lead } from '../../types';

type LeadRowProps = {
  lead: Lead;
  onOpen: (lead: Lead) => void;
};

export const LeadRow: React.FC<LeadRowProps> = ({ lead, onOpen }) => {
  return (
    <tr
      key={lead.id}
      className="cursor-pointer hover:bg-gray-50 transition-colors duration-150"
      onClick={() => onOpen(lead)}
    >
      <td className="py-2 px-3">{lead.name}</td>
      <td className="px-3">{lead.company}</td>
      <td className="px-3">{lead.email}</td>
      <td className="px-3">{lead.source}</td>
      <td className="px-3 text-right font-medium">{lead.score}</td>
      <td className="px-3 text-right">
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${lead.status === 'New'
              ? 'bg-blue-100 text-blue-800'
              : lead.status === 'Contacted'
                ? 'bg-yellow-100 text-yellow-800'
                : lead.status === 'Qualified'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
            }`}
        >
          {lead.status}
        </span>
      </td>
    </tr>
  );
};
