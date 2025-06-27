import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchActivities } from "app/data/searchactivities";
import { Textarea } from "@/components/ui/textarea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { WeeklyRangeDatePicker } from "../RangeDatePicker";
import type { DateRange } from "react-day-picker";
import FilledApplicationsForm from "./FilledApplicationsForm";

type WorkLogFormData = {
    dateRange: [Date, Date] | null;
    searchActivity: string;
    jobTitle: string;
    companyName: string;
    postingUrl: string;
};

export default function WorkSearchForm() {
    const [formData, setFormData] = useState<WorkLogFormData>({
        dateRange: null,
        searchActivity: "Filled Applications",
        jobTitle: "Software Engineer",
        companyName: "",
        postingUrl: "",
    });
    const [showWeekError, setShowWeekError] = useState(false);
    const [postingUrlError, setPostingUrlError] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [calendarRange, setCalendarRange] = useState<DateRange | undefined>(undefined);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPostingUrlError(false);

        if (!formData.dateRange) {
            setShowWeekError(true);
            return;
        }

        try {
            new URL(formData.postingUrl);
        } catch {
            setPostingUrlError(true);
            return;
        }
        console.log("Form submitted with data:", formData);
    };

    const handleSetFormData = (data: any) => {
        if (data.name === "dateRange" && data.value) {
            setShowWeekError(false);
        }

        setFormData({
            ...formData,
            [data.name]: data.value,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
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
            </div>
            <FilledApplicationsForm handleSetFormData={handleSetFormData} formData={formData} postingUrlError={postingUrlError}></FilledApplicationsForm>

            <Button type="submit" className="mt-4 w-full cursor-pointer">
                Add Activity <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            </Button>
        </form>
    );
}
