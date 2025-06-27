import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type FilledApplicationsFormProps = {
    handleSetFormData: (data: any) => void;
    formData: {
        jobTitle: string;
        companyName: string;
        postingUrl: string;
    };
    postingUrlError: boolean;
};

/*type FilledApplicationsFormData = {
    date: Date | undefined;
    notes: string;
    jobTitle: string;
    companyName: string;
    postingUrl: string;
};*/

export default function FilledApplicationsForm(props: FilledApplicationsFormProps) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);
    return (
        <>
            <form>
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
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div>
                        <Label htmlFor="postingUrl" className="mb-1">
                            Posting URL
                        </Label>
                        <Input name="postingUrl" required onChange={(event) => props.handleSetFormData(event.target)} />
                        {props.postingUrlError && <span className="formError">Enter a valid URL</span>}
                    </div>
                    <div>
                        <Label htmlFor="jobTitle" className="mb-1">
                            Job Title
                        </Label>
                        <Input name="jobTitle" required onChange={(event) => props.handleSetFormData(event.target)} value={props.formData.jobTitle} />
                    </div>
                    <div>
                        <Label htmlFor="companyName" className="mb-1">
                            Company Name
                        </Label>
                        <Input name="companyName" required onChange={(event) => props.handleSetFormData(event.target)} />
                    </div>
                </div>
                <Label className="mt-4">Notes</Label>
                <Textarea name="notes" className="mt-4" placeholder="Notes" onChange={(event) => props.handleSetFormData(event.target)} />

                <Button type="submit" className="mt-4 w-full cursor-pointer">
                    Add Activity <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </Button>
            </form>
        </>
    );
}
