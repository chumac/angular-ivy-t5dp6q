
export interface ILeaveTimeline {
  employee_name_grp: string;
  leave_details: string;
  type: string; // Daily/Hourly
  start_date: Date;
  end_date: Date;
  no_of_days: number;
  employee_id: number;
}
