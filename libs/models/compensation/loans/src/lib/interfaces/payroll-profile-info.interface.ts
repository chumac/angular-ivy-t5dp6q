
export interface IPayrollProfileInfo {
  payroll_profile_id: number,
  code: string,
  description: string,
  current_period: string,
  is_runnable: boolean,
  run_cycle: number
}
