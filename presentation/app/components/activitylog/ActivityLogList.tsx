import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WorkSearchForm from "../worksearchforms/WorkSearchForm";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

type SearchAvivity = {
    id: number;
    searchActivity: string;
    date: Date;
    dateRange: [Date, Date] | null;
    jobTitle: string;
    companyName: string;
    postingUrl: string;
};

export default function ActivityLogList() {
    const dummySearchActivities: SearchAvivity[] = [
        {
            id: 1,
            searchActivity: "Applied to job posting",
            date: new Date("2025-06-01T10:00:00Z"),
            dateRange: [new Date("2025-05-31"), new Date("2025-06-01")],
            jobTitle: "Frontend Developer",
            companyName: "TechCorp Inc.",
            postingUrl: "https://techcorp.example.com/jobs/frontend-developer",
        },
        {
            id: 2,
            searchActivity: "Saved job to tracker",
            date: new Date("2025-06-03T15:45:00Z"),
            dateRange: null,
            jobTitle: "Full Stack Engineer",
            companyName: "Innovatech",
            postingUrl: "https://innovatech.example.com/careers/fullstack",
        },
        {
            id: 3,
            searchActivity: "Contacted recruiter",
            date: new Date("2025-06-05T09:30:00Z"),
            dateRange: [new Date("2025-06-05"), new Date("2025-06-06")],
            jobTitle: "Backend Developer",
            companyName: "CodeWorks",
            postingUrl: "https://jobs.codeworks.com/backend-developer",
        },
        {
            id: 4,
            searchActivity: "Interview scheduled",
            date: new Date("2025-06-07T13:00:00Z"),
            dateRange: [new Date("2025-06-10"), new Date("2025-06-10")],
            jobTitle: "Software Engineer",
            companyName: "NextGen Solutions",
            postingUrl: "https://nextgensolutions.example.com/jobs/software-engineer",
        },
        {
            id: 5,
            searchActivity: "Rejected by employer",
            date: new Date("2025-06-09T17:20:00Z"),
            dateRange: null,
            jobTitle: "UI/UX Designer",
            companyName: "Creative Minds",
            postingUrl: "https://creativeminds.example.com/careers/ui-ux",
        },
    ];
    return (
        <div>
            <h1 className="text-2xl font-semibold">Search Activities</h1>
            {dummySearchActivities.map((activity) => (
                <Card key={activity.id}>
                    <CardContent>
                        <div className="grid grid-cols-[1fr_1fr_1fr_auto]">
                            <span>{activity.date.toDateString()}</span>
                            <span>{activity.searchActivity}</span>
                            <span>{activity.companyName}</span>
                            <div>
                                <button>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button className="ml-2">
                                    <FontAwesomeIcon icon={faTrash} className="danger" />
                                </button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
