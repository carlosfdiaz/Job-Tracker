import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchActivities } from "app/data/searchactivities";
import { WeeklyRangeDatePicker } from "../RangeDatePicker";
import type { DateRange } from "react-day-picker";
import FilledApplicationsForm from "./FilledApplicationsForm";
import type { Activity } from "app/types/FormTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ACTIVITY_OPTIONS } from "app/types/ActivityOptions";

type WorkSearchFormProps = {
    handleActivityPublish: (data: Activity) => void;
    activity?: Activity;
    isEditing: boolean;
};

export default function WorkSearchForm(props: WorkSearchFormProps) {
    const [formData, setFormData] = useState<Activity>(
        props.activity && props.isEditing
            ? props.activity
            : {
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
              }
    );
    const [calendarRange, setCalendarRange] = useState<DateRange | undefined>(
        props.activity && props.isEditing ? { from: props.activity?.dateRange?.from, to: props.activity?.dateRange?.to } : undefined
    );

    const handleSetFormData = (data: { name: string; value: DateRange | undefined | string }) => {
        setFormData({
            ...formData,
            [data.name]: data.value,
        });
    };

    const handlePublishFormData = (data: any) => {
        //Compile Work Search Form Fields && Search Activity Form Fields
        const activityData = {
            ...formData,
            searchActivityData: data,
        };
        console.log("Activity Data:", activityData);
        props.handleActivityPublish(activityData);
    };

    const displayFormFragment = () => {
        if (formData.dateRange && formData.dateRange.from && formData.dateRange.to) {
            switch (formData.searchActivity) {
                case ACTIVITY_OPTIONS.FilledApplications:
                    return (
                        <FilledApplicationsForm
                            handlePublishFormData={handlePublishFormData}
                            allowedRange={calendarRange}
                            formData={props.activity?.searchActivityData}
                            isEditing={props.isEditing}
                        />
                    );
            }
        }
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
                    {displayFormFragment()}
                </CardContent>
            </Card>
        </>
    );
}
