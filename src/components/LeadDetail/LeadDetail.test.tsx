import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Lead } from "../../types";
import { LeadDetail } from "./index";

const lead: Lead = { id: "1", name: "Alice", company: "Acme", email: "alice@acme.com", source: "Web", score: 80, status: "New" };

describe("LeadDetail", () => {
    it("renders lead details", () => {
        render(<LeadDetail lead={lead} onSave={() => new Promise(() => { })} onConvert={() => new Promise(() => { })} onCancel={() => { }} />);
        expect(screen.getByDisplayValue("alice@acme.com")).toBeInTheDocument();
        expect(screen.getByText("Alice")).toBeInTheDocument();
    });

    it("disables convert button for qualified lead", () => {
        const qualifiedLead: Lead = { ...lead, status: "Qualified" };
        render(<LeadDetail lead={qualifiedLead} onSave={() => new Promise(() => { })} onConvert={() => new Promise(() => { })} onCancel={() => { }} />);
        const btn = screen.getByText("Convert Lead") as HTMLButtonElement;
        expect(btn.disabled).toBe(true);
    });

    it("calls onSave when save button clicked", () => {
        const onSave = vi.fn();
        render(<LeadDetail lead={lead} onSave={onSave} onConvert={() => new Promise(() => { })} onCancel={() => { }} />);
        const input = screen.getByDisplayValue("alice@acme.com") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "new@acme.com" } });
        fireEvent.click(screen.getByText("Save"));
        expect(onSave).toHaveBeenCalled();
    });
});
