import WorkSearchForm from "app/components/worksearchforms/WorkSearchForm";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ActivityLogList from "app/components/activitylog/ActivityLogList";
import type { Activity } from "app/types/FormTypes";
import { useState } from "react";
//import { createContext } from "react";

//const activityLogContext = createContext({});
export function WorkSearchLog() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [showAcitivtyLog, setShowActivityLog] = useState<boolean>(false);
    const [activity, setActivity] = useState<Activity>();
    const [isEditingWorkSearchForm, setIsEditingWorkSearchForm] = useState<boolean>(false);

    const handleActivityPublish = (activity: Activity) => {
        if (isEditingWorkSearchForm) {
            const filteredActivities = activities.filter((existingActivity) => existingActivity.id !== activity.id);
            setActivities(() => {
                return [...filteredActivities, activity];
            });
            setIsEditingWorkSearchForm(false);
        } else {
            console.log("Publishing activity:", activity);
            setActivities((prevActivities) => {
                //Get activity array max Id
                const maxId = prevActivities.reduce((max, act) => (act.id > max ? act.id : max), 0);
                return [...prevActivities, { ...activity, id: maxId + 1 }];
            });
        }
        setShowActivityLog(true);
    };

    const updateActivities = (activities: Activity[]) => {
        setActivities(activities);
    };

    const toggleActivityLog = () => {
        setShowActivityLog((prev) => !prev);
    };

    const handleReceivedActivityToEdit = (data: Activity) => {
        console.log("MY RECEIVED ACTIVITY", data);
        setActivity(data);
        setShowActivityLog(false);
        setIsEditingWorkSearchForm(true);
    };

    if (showAcitivtyLog) {
        return (
            <ActivityLogList
                activities={activities}
                toggleActivityLog={toggleActivityLog}
                updateActivities={updateActivities}
                editActivity={handleReceivedActivityToEdit}
            />
        );
    } else {
        return <WorkSearchForm handleActivityPublish={handleActivityPublish} isEditing={isEditingWorkSearchForm} activity={activity} />;
    }
}
