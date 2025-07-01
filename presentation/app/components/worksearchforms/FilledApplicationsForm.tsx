import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState, type FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import type { FilledApplicationsFormData } from "app/types/FormTypes";

type FilledApplicationsFormProps = {
    handlePublishFormData: (data: any) => void;
    allowedRange?: { from?: Date; to?: Date };
};

type FormFieldUpdate = { name: keyof FilledApplicationsFormData; value: string | Date };

export default function FilledApplicationsForm(props: FilledApplicationsFormProps) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [postingUrlError, setPostingUrlError] = useState<boolean>(false);
    const [activityDateError, setActivityDateError] = useState<boolean>(false);
    const [formData, setFormData] = useState<FilledApplicationsFormData>({
        activityDate: null,
        notes: "",
        jobTitle: "Software Engineer",
        companyName: "",
        postingUrl: "",
    });

    const handleSetFormData = (data: FormFieldUpdate) => {
        setFormData({
            ...formData,
            [data.name]: data.value,
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPostingUrlError(false);
        setActivityDateError(false);

        if (!formData.activityDate) {
            setActivityDateError(true);
            return;
        }

        /*try {
            new URL(formData.postingUrl);
        } catch {
            setPostingUrlError(true);
            return;
        }*/

        props.handlePublishFormData(formData);
        //reset form data after submission
        setFormData({
            activityDate: null,
            notes: "",
            jobTitle: "",
            companyName: "",
            postingUrl: "",
        });
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 mt-2">
                    <div>
                        <Label htmlFor="date" className="mb-1">
                            Activity Date
                        </Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" id="date" className="w-full justify-between text-base h-9.5">
                                    {date ? date.toLocaleDateString() : "Select date"}
                                    <ChevronDownIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                        setDate(date);
                                        setOpen(false);
                                        handleSetFormData({ name: "activityDate", value: date || new Date() });
                                    }}
                                    hidden={(day) => {
                                        // Only allow dates within allowedRange
                                        const from = props.allowedRange?.from;
                                        const to = props.allowedRange?.to;
                                        if (!from || !to) return false; // Don't hide any if range not set
                                        return day < from || day > to;
                                    }}
                                    hideNavigation
                                    disableNavigation
                                />
                            </PopoverContent>
                        </Popover>
                        {activityDateError && <span className="formError">Please select a date</span>}
                    </div>
                    <div>
                        <Label htmlFor="postingUrl" className="mb-1">
                            Posting URL
                        </Label>
                        <Input name="postingUrl" required onChange={(event) => handleSetFormData({ name: "postingUrl", value: event.target.value })} />
                        {/*postingUrlError && <span className="formError">Enter a valid URL</span>*/}
                    </div>
                    <div>
                        <Label htmlFor="jobTitle" className="mb-1">
                            Job Title
                        </Label>
                        <Input
                            name="jobTitle"
                            required
                            onChange={(event) => handleSetFormData({ name: "jobTitle", value: event.target.value })}
                            value={formData.jobTitle}
                        />
                    </div>
                    <div>
                        <Label htmlFor="companyName" className="mb-1">
                            Company Name
                        </Label>
                        <Input name="companyName" required onChange={(event) => handleSetFormData({ name: "companyName", value: event.target.value })} />
                    </div>
                </div>
                <Label className="mt-4">Notes</Label>
                <Textarea
                    name="notes"
                    className="mt-4"
                    placeholder="Notes"
                    onChange={(event) => handleSetFormData({ name: "notes", value: event.target.value })}
                />
                <Button type="submit" className="mt-4 w-full cursor-pointer">
                    Add Activity <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </Button>
            </form>
        </>
    );
}
