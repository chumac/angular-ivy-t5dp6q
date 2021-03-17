export interface ITimeAttendance {
    id: number,
    employee_id: number;
    action_id: number;
    employee_name: string;
    transaction_date: Date;
    clock_in_time: string;
    standard_time: string;
    day_type: string;
    day_name: string;
    employee_status: string;
    employee_status_text: string;
    absence_classification: string;
    adjustment_reason: string;
    adjustment_by: string;
    adjustment_date: Date;
}