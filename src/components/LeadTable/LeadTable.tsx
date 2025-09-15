import React from "react";
import type { Lead } from "../../types";
import { LeadRow } from "./LeadRow";

export const LeadTable: React.FC<{ leads: Lead[]; onOpen: (l: Lead) => void }> = ({
  leads,
  onOpen,
}) => {
  if (!leads.length)
    return <div className="p-6 text-center text-gray-500">No leads found.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] table-auto text-sm sm:text-xs">
        <thead>
          <tr className="text-left text-xs text-gray-500 border-b">
            <th className="py-2 px-2">Name</th>
            <th className="px-2">Company</th>
            <th className="px-2">Email</th>
            <th className="px-2">Source</th>
            <th className="text-right px-2">Score</th>
            <th className="text-right px-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((l) => (
            <LeadRow key={l.id} lead={l} onOpen={onOpen} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
