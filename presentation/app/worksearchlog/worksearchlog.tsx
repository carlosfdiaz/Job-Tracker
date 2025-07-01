import WorkSearchForm from "app/components/worksearchforms/WorkSearchForm";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ActivityLogList from "app/components/activitylog/ActivityLogList";
import type { Activity } from "app/types/FormTypes";
//import { createContext } from "react";

//const activityLogContext = createContext({});
export function WorkSearchLog() {
    const activities: Activity[] = [];

    const handleActivityPublish = (activity: Activity) => {
        //Get activity array max Id

        console.log("Publishing activity:", activity);
        activities.push(activity);
    };
    return (
        <>
            {/*<ActivityLogList></ActivityLogList>*/}
            <WorkSearchForm />
        </>
    );
}
