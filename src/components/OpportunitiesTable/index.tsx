import type { Opportunity } from "../../types";

export const OpportunitiesTable = ({ opportunities }: { opportunities: Opportunity[] }) => {
    if (!opportunities.length)
        return <div className="p-4 text-sm text-gray-500">No opportunities yet. Convert a lead to create.</div>;

    return (
        <table className="w-full table-auto text-sm">
            <thead>
                <tr className="text-left text-xs text-gray-500 border-b">
                    <th className="py-2">Name</th>
                    <th>Account</th>
                    <th>Stage</th>
                    <th className="text-right">Amount</th>
                </tr>
            </thead>
            <tbody>
                {opportunities.map((opp) => (
                    <tr key={opp.id} className="border-b last:border-b-0">
                        <td className="py-2">{opp.name}</td>
                        <td>{opp.accountName}</td>
                        <td>{opp.stage}</td>
                        <td className="text-right">{opp.amount ?? "-"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
