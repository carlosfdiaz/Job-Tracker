import { useState, type FormEvent } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchActivities } from "app/data/searchactivities";
import { WeeklyRangeDatePicker } from "../RangeDatePicker";
import type { DateRange } from "react-day-picker";
import FilledApplicationsForm from "./FilledApplicationsForm";
import type { Activity } from "app/types/FormTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WorkSearchForm() {
    const [formData, setFormData] = useState<Activity>({
        id: 0,
        dateRange: null,
        searchActivity: "Filled Applications",
        searchActivityData: {
            activityDate: null,
            notes: "",
            jobTitle: "Software Engineer",
            companyName: "",
            postingUrl: "",
        },
    });
    const [calendarRange, setCalendarRange] = useState<DateRange | undefined>(undefined);

    const handleSetFormData = (data: { name: string; value: DateRange | undefined | string }) => {
        setFormData({
            ...formData,
            [data.name]: data.value,
        });
    };

    const handlePublishFormData = (data: any) => {
        // This function can be used to publish the form data to a server or API
        console.log("Publishing form data:", data);
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Work Search Avitity</CardTitle>
                </CardHeader>
                <CardContent>
                    <WeeklyRangeDatePicker
                        value={calendarRange}
                        onChange={(range) => {
                            setCalendarRange(range);
                            handleSetFormData({ name: "dateRange", value: range });
                        }}
                    />
                    <Label htmlFor="searchActivity" className="mb-1">
                        Work Search Activity
                    </Label>
                    <Select
                        value={formData.searchActivity}
                        onValueChange={(val) => {
                            handleSetFormData({
                                name: "searchActivity",
                                value: val,
                            });
                        }}
                    >
                        <SelectTrigger className="w-full text-base mb-3">
                            <SelectValue placeholder="Search Activity" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {SearchActivities.map((activity) => (
                                    <SelectItem className="text-base" key={activity.id} value={activity.option}>
                                        {activity.option}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {formData.dateRange && formData.dateRange.from && formData.dateRange.to && (
                        <FilledApplicationsForm handlePublishFormData={handlePublishFormData} allowedRange={calendarRange} />
                    )}
                </CardContent>
            </Card>
        </>
    );
}
