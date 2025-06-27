
import { type DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";

type WeeklyRangeDatePickerProps = {
    value: DateRange | undefined;
    onChange: (range: DateRange | undefined) => void;
};

export function WeeklyRangeDatePicker({ value, onChange }: WeeklyRangeDatePickerProps) {
    const [open, setOpen] = useState(false);
  
    const handleDateSelect = (selectedDate: DateRange | undefined) => {
        onChange(selectedDate);
        if (selectedDate?.from && selectedDate?.to) {
            setOpen(false);
        }
    };
    return (
        <>
           <Label htmlFor="dateRange" className="mb-1">
                    Select a date range from Sunday to Saturday
                </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" id="date" className="w-full justify-between text-base h-9.5 mb-3">
                       {value?.from && value?.to
                            ? `${value.from.toLocaleDateString()} - ${value.to.toLocaleDateString()}`
                            : "Pick a date range"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="range"
                        defaultMonth={value?.from}
                        selected={value}
                        onSelect={handleDateSelect}
                        numberOfMonths={1}
                        max={6}
                        min={6}
                        className="rounded-lg border shadow-sm"
                    />
                    <div className="text-muted-foreground text-center text-xs">A minimum of 7 days is required</div>
                </PopoverContent>
            </Popover>
        </>
    );
}
