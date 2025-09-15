import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Lead } from "../../types";
import { LeadTable } from "./index";

const leads: Lead[] = [
    { id: "1", name: "Alice", company: "Acme", email: "alice@acme.com", source: "Web", score: 80, status: "New" },
    { id: "2", name: "Bob", company: "Beta", email: "bob@beta.com", source: "Referral", score: 50, status: "Contacted" },
];

describe("LeadTable", () => {
    it("renders leads", () => {
        render(<LeadTable leads={leads} onOpen={() => { }} />);
        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.getByText("Bob")).toBeInTheDocument();
    });

    it("shows empty message when no leads", () => {
        render(<LeadTable leads={[]} onOpen={() => { }} />);
        expect(screen.getByText("No leads found.")).toBeInTheDocument();
    });
});
