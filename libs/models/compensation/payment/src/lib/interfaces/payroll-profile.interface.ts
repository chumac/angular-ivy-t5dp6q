import { Time } from "@angular/common";

export interface IPayrollProfile {
  payroll_profile_id: number;
  code: string;
  description: string;
  current_period: Date;
  is_runnable: boolean;
  run_cycle: number;
  cut_off_day: number;
  payment_runday: number;
  use_multi_currency: boolean;
  tax_option: number;
  tax_rule: number;
  has_last_run: number;

  default_currency_text: string;
  profile_currency_text: string;
  exchange_rate?: number
}
