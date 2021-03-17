export interface IExclusionTransaction {
    exclusion_id: number,
    exclusion_type: number,
    exclusion_type_text: string,
    exclude_by_percent: boolean,
    percent_value: string,
    amount_value: string,
    is_temp_exclusion: boolean,
    rule: string,
    start_date: Date,
    end_date: Date,
    reasonfor_exclusion: number,
    reasonfor_exclusion_text: string,
    exclusion_givento_empid: number,
    employee_name: string,
    disciplinary_action_id: string,
    disciplinary_action_id_text: string,
    separation_id: string,
    separation_id_text: string,
    unsuspend: boolean,
    unsuspend_reason: string,
    unsuspend_date: string,
    approval_status: number,
    rec_notes: string,
    other_type: string,
    other_id: string
}