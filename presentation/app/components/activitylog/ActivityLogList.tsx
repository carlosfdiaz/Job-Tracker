import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WorkSearchForm from "../worksearchforms/WorkSearchForm";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faEdit, faFolderBlank, faFolderOpen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import type { Activity } from "app/types/FormTypes";
import { useState } from "react";

type ActivityLogListProps = {
    activities: Activity[];
    toggleActivityLog: () => void;
    updateActivities: (data: Activity[]) => void;
    editActivity: (data: Activity) => void;
};

export default function ActivityLogList(props: ActivityLogListProps) {
    const [activities, setActivities] = useState<Activity[]>(props.activities);

    const handleDeleteActivity = (id: number) => {
        setActivities((prevActivities) => prevActivities.filter((activity) => activity.id !== id));
        //Update Acitvities in parent
        props.updateActivities(activities);
    };

    return (
        <div className="h-full">
            <div className="flex items-center justify-between pb-1">
                <h1 className="text-2xl font-semibold">Search Activities</h1>
                <Button onClick={props.toggleActivityLog}>
                    New Activity
                    <FontAwesomeIcon icon={faPlus} className="cursor-pointer" />
                </Button>
            </div>

            {activities.length ? (
                activities.map((activity) => (
                    <Card key={activity.id}>
                        <CardContent>
                            <div className="grid grid-cols-[1fr_1fr_1fr_auto]">
                                <span>{activity.searchActivityData.activityDate?.toDateString()}</span>
                                <span>{activity.searchActivity}</span>
                                <span>{activity.searchActivityData.companyName}</span>
                                <div>
                                    <button onClick={() => props.editActivity(activity)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className="ml-2" onClick={() => handleDeleteActivity(activity.id)}>
                                        <FontAwesomeIcon icon={faTrash} className="danger" />
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <>
                    <h2 className="text-1xl font-semibold">There are no work search activities. Let's add some!</h2>
                    <div className="flex justify-center items-center h-80">
                        <FontAwesomeIcon icon={faFolderOpen} className="text-9xl text-gray-400"></FontAwesomeIcon>
                    </div>
                </>
            )}
        </div>
    );
}
