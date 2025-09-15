import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SlideOver } from "./SlideOver";

describe("SlideOver", () => {
    it("renders content when open", () => {
        render(
            <SlideOver open={true} onClose={vi.fn()}>
                <div>Content</div>
            </SlideOver>
        );
        expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("does not render content when closed", () => {
        render(
            <SlideOver open={false} onClose={vi.fn()}>
                <div>Content</div>
            </SlideOver>
        );
        expect(screen.queryByText("Content")).not.toBeInTheDocument();
    });

    it("calls onClose when backdrop clicked", () => {
        const onClose = vi.fn();
        render(
            <SlideOver open={true} onClose={onClose}>
                <div>Content</div>
            </SlideOver>
        );
        fireEvent.click(screen.getByTestId("backdrop"));
        expect(onClose).toHaveBeenCalled();
    });
});
