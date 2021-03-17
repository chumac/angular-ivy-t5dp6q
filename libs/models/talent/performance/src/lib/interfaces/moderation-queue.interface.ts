export interface IModerationQueue {
    id: number;
    workflow_process_id: number;
    employee_id: number;
    employee_name: string;
    submitted_date: Date;
    role: number;
    role_type: string;
    plan_id: number;
    plan_description: string;
    status: string;
    score: number;
}