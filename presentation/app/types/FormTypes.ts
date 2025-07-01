export type FilledApplicationsFormData = {
    activityDate: Date | null;
    notes: string;
    jobTitle: string;
    companyName: string;
    postingUrl: string;
};

export type ContactWithRecruiterFormData = {
    activityDate: Date | null;
    notes: string;
    recruiterName: string;
    companyName: string;
    contactMethod: string; // e.g., Email, Phone, LinkedIn
};

export type Activity = {
    id: number;
    dateRange: { from: Date; to: Date } | null;
    searchActivity: string;
    searchActivityData: FilledApplicationsFormData | ContactWithRecruiterFormData;
};