import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import "@testing-library/jest-dom";
import WorkSearchForm from "../app/components/worksearchforms/WorkSearchForm";

describe("WorkSearchForm", () => {
    test("renders filled applications when date range is filled", async () => {
        const activity = {
            id: 0,
            dateRange: { from: new Date(6-29-2025), to: new Date(7-5-2025) },
            searchActivity: "Filled Applications",
            searchActivityData: {
                activityDate: null,
                notes: "",
                jobTitle: "Software Engineer",
                companyName: "",
                postingUrl: "",
            },
        };
        render(<WorkSearchForm handleActivityPublish={vi.fn()} isEditing={true} activity={activity} />);

        // 3. Assert form fields show up
        expect(await screen.findByLabelText(/activity date/i)).toBeInTheDocument();
    });
});
