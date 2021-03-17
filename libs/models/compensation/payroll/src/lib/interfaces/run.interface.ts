export interface IRun {
  payroll_profile_id: number;
  payroll_period: Date;
  cut_off_date: Date;
  payroll_run_date: Date
  grouprun: number;
  grouprun_id : number;
  is_scheduled: number;
  schedule_date : Date;
  use_payroll_acceleration: boolean;
}
