import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Opportunity } from "../../types";
import { OpportunitiesTable } from "./index";

const opps: Opportunity[] = [
    { id: "o1", name: "Alice", stage: "Prospecting", amount: 1000, accountName: "Acme" },
];

describe("OpportunitiesTable", () => {
    it("renders opportunities", () => {
        render(<OpportunitiesTable opportunities={opps} />);
        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.getByText("Prospecting")).toBeInTheDocument();
        expect(screen.getByText("1000")).toBeInTheDocument();
    });

    it("shows empty message", () => {
        render(<OpportunitiesTable opportunities={[]} />);
        expect(screen.getByText("No opportunities yet. Convert a lead to create.")).toBeInTheDocument();
    });
});
