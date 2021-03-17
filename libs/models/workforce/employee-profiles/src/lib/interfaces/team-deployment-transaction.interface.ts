export interface ITeamDeploymentTransaction {
    id: number;
    employee_id: number;
    current_location_structure: number;
    current_location_details: number;
    new_location_structure: number;
    new_location_details: number;
    current_position: number;
    new_position: number;
    effective_date: Date;
    is_temporary: boolean;
    end_date: Date;
    revert_process_status: boolean;
    revert_master_id: number;
    revert_date: Date;
    is_historical: boolean;
    status: number;
    processed_date;
    email_onapproved: boolean;
    email_oneffectivedate: boolean;
    resumption_email_sent: boolean;
    has_resumed: boolean;
    resumption_date: Date;
    resumption_approval_status: number;
    resumption_remarks: string;
    resumption_created_by: string;
    resumption_created_date: Date;
    last_notice_date: Date;
    notify_count: number;
    reporting_to_id: number;
    narration: string;
    current_designation_id: number;
    new_designation_id: number;
    transaction_type: string;
}
  