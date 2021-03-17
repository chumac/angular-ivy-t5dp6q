export interface ILastRun {
  payrollrun_id: number;
  payroll_profile_id: number;
  payroll_period: Date;
  cutt_off_date: Date;
  payroll_run_date: Date;
  status: number;
  satus_text: string;
  is_last_run: number;
  grouprun_id: number;
  grouprun: number;
  grouprun_type: string;
  grouprun_value: string;
  is_scheduled: number;
  is_scheduled_text: string;
  scheduled_date: Date;
  use_payroll_acceleration: number;
  use_payroll_acceleration_text: string;
  total_employees_profiled: number;
  total_employees_run: number;
  a_rundate: Date;
  ignore_adjustments: boolean;
}
