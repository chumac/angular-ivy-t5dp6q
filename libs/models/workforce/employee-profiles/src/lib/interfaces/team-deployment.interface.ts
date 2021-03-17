export interface  ITeamDeployment {
    id: number;
    employee_id: number;
    s_local_type: number;
    s_local_detail: number;
    structure_change: boolean;
    d_local_type: number;
    d_local_detail: number;
    effective_date: Date;
    is_temporary: boolean;
    revert_date: Date;
    role_change: boolean;
    c_position: number;
    p_position_id: number;
    o_position_id: string;
    reason_for_action: string;
    status: number;
    transaction_type: number;


    s_local_type_id: number;
    s_local_detail_id: number;
    d_local_type_id: number;
    d_local_detail_id: number;
    c_position_id: number;
    n_position_id: string;
    reports_to_change: boolean;
    report_to_id: number;
}
  