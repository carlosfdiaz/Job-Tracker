import WorkSearchForm from "app/components/WorkSearchForm";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
export function WorkSearchLog() {
    return (<>

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