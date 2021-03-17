

export interface IMyAction {
    id: number,
    process_type: number,
    process_type_text: string,
    process_id: number,
    process_note: string,
    employee_id: number,
    employee_name: string,
    event_id: number,
    description: string,
    owner_logon: string,
    role: number,
    role_text: string,
    status: number,
    status_text: string,
    created_date: string,
    exit_date: string
}

export interface IManagerOptOutEvent {
    nominated_replace_id: number,
    mgr_comment: string
}

export interface IFeedBackForm {
    id: number,
    json_string: string
}