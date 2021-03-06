import { Time } from "@angular/common";

export interface IProfile{
  payroll_profile_id:number;
  code:string;
  description:string;
  current_period:Date;
  coinage_rounding:number;
  allow_neg_pay:number;
  prorate_quarterly:number;
  prorate_halfyear:number;
  prorate_yearly:number;
  prorate_weekly:number;
  tax_mode:number;
  cut_off_day:number;
  payment_runday:number;
  finyear_start:Time;
  finyear_end:Time;
  upfront_treatment:number;
  tax_option:number;
  tax_rule:number;
  deduction_id:number;
  use_multi_currency:boolean;
  periodic_proration:number;
  use_security_group:boolean;
  security_group:string;
  master_rec_id:number;
  is_runnable:boolean;
  run_cycle:number;
  use_periodic_tax_for_adjusted_pay:boolean;
  payment_period_covered:number;
  include_current_period:boolean;
  location_type_id:number;
  location_detail_id:number;
  currency_id:number;
  def_currency_id:number;
  sys_rule:string;
  pay_currency_id:number;
  pay_exchange_rate:number;
  approval_status: number;
  archive_Status: boolean;
}
