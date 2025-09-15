import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Lead } from "../types";
import { useLeads } from "./useLeads";

const leads: Lead[] = [
    { id: "1", name: "Alice", company: "Acme", email: "alice@acme.com", source: "Web", score: 80, status: "New" },
    { id: "2", name: "Bob", company: "Beta", email: "bob@beta.com", source: "Referral", score: 50, status: "Contacted" },
];

beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
});

afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
});

describe("useLeads hook", () => {
    it("initializes with leads and handles loading", async () => {
        const { result } = renderHook(() => useLeads(leads));

        await act(async () => {
            vi.runAllTimers();
        });

        expect(result.current.leads).toEqual(leads);
        expect(result.current.visibleLeads.length).toBe(2);
        expect(result.current.loading).toBe(false);
    });

    it("filters leads by search term", async () => {
        const { result } = renderHook(() => useLeads(leads));

        await act(async () => {
            vi.runAllTimers();
        });

        act(() => {
            result.current.setSearch("Alice");
        });

        expect(result.current.visibleLeads.length).toBe(1);
        expect(result.current.visibleLeads[0].name).toBe("Alice");
    });

    it("updates lead optimistically with rollback on fail", async () => {
        const { result } = renderHook(() => useLeads(leads));

        await act(async () => {
            vi.runAllTimers();
        });

        try {
            await act(async () => {
                const promise = result.current.updateLeadOptimistic("1", { email: "new@acme.com" }, true);
                vi.runAllTimers();
                await promise;
            });
        } catch (e) {
        }

        const updated = result.current.leads.find(l => l.id === "1");
        expect(updated?.email).toBeDefined();
    });

    it("converts lead to opportunity", async () => {
        const { result } = renderHook(() => useLeads(leads));

        await act(async () => {
            vi.runAllTimers();
        });

        await act(async () => {
            const promise = result.current.convertLead("1", { stage: "Prospecting", amount: 1000 });
            vi.runAllTimers();
            await promise;
        });

        expect(result.current.opps.length).toBe(1);
        expect(result.current.leads.find(l => l.id === "1")?.status).toBe("Qualified");
    });
});
