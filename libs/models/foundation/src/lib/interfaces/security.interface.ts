export interface ISecurity {
    action_id: number;
    action_taken: number;
    user_name: string;
    username:string;
    role_name?: string[];
    action_taken_by: string;
    action_logged_date: Date;
    status: number;
    complete_date: Date;
    messages: string;
    comments: string;
    org_id: number;
    emp_id: number;
    logon_name:string;
    notify_flag: number;
}
