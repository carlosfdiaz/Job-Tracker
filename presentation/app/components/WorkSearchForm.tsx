import "rsuite/DateRangePicker/styles/index.css";
import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import DateRangePicker from "rsuite/esm/DateRangePicker";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { SearchActivities } from "app/data/searchactivities";

type FormData = {
    dateRange: [Date, Date] | null;
    searchActivity: string;
    jobTitle: string;
}
export default function WorkSearchForm() {
    const [formData, setFormData] = useState<FormData>({
        dateRange: null,
        searchActivity: "Filled Applications",
        jobTitle: "Software Engineer"
    });
    const [showWeekError, setShowWeekError] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!formData.dateRange) {
            setShowWeekError(true);
            return;
        }
        console.log("Form submitted with data:", formData);
    }

    const handleSetFormData = (data: any) => {
        if (data.name === "dateRange" && data.value) {
            setShowWeekError(false);
        }

        setFormData({
            ...formData,
            [data.name]: data.value
        });
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                <div>
                    <Label htmlFor="dateRange" className="mb-1">Select Week</Label>
                    <DateRangePicker
                        className="w-full"
                        oneTap
                        showOneCalendar
                        hoverRange="week"
                        format="MM/dd/yy"
                        weekStart={0}
                        onChange={(data) => handleSetFormData({ value: data, name: "dateRange" })}

                    />
                    {showWeekError && <span className="formError">Please select a valid week</span>}
                </div>
                <div></div>
                <div>
                    <Label htmlFor="searchActivity" className="mb-1">Work Search Activity</Label>
                    <Select
                        value={formData.searchActivity}
                        onValueChange={(val) => {
                            handleSetFormData({ name: "searchActivity", value: val });
                        }}>
                        <SelectTrigger className="w-full text-base">
                            <SelectValue placeholder="Search Activity" />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectGroup>
                                {SearchActivities.map((activity) => (
                                    <SelectItem className="text-base" key={activity.id} value={activity.option}>{activity.option}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="typeOfJob" className="mb-1">Type of Job</Label>
                    <Input name="jobTitle" required onChange={(event) => handleSetFormData(event.target)} value={formData.jobTitle} />
                </div>
            </div>
            <Button type="submit" className="mt-4">Submit</Button>
        </form>

    );

}