import WorkSearchForm from "app/components/worksearchforms/WorkSearchForm";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ActivityLogList from "app/components/AcititivyLog/ActivityLogList";
export function WorkSearchLog() {
    return (
        <>
        <ActivityLogList></ActivityLogList>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Work Search Avitity</CardTitle>
                </CardHeader>
                <CardContent>
                    <WorkSearchForm />
                </CardContent>
            </Card>
        </>
    );
}