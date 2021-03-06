import { IPayrollProfileInfo } from "./payroll-profile-info.interface";
import { IGroupNameInfo } from "./group-name-info.interface";
import { IDeductFromAllowanceInfo } from "./deduct-from-allowance-info.interface";

export interface ILoanDefinition {
  loan_id: number,
  code: string,
  description: string,
  shortname: string,
  ordering_rank: number,
  calculation_rule: number,
  payroll_profile_id: number,
  can_exclude: boolean,
  allow_rules_variation: boolean,
  allow_multiple: boolean,
  use_high_priority: boolean,
  use_system_deduction: boolean,
  principal_deduction_period: number,
  interest_deduction_period: number,
  allow_overdue_mgt: boolean,
  overdue_interest_rate: number,
  charge_interest: boolean,
  separate_interest: boolean,
  interest_code: string,
  interest_rate: number,
  tenor_years: number,
  tenor_months: number,
  tenor_days: number,
  groupitem: boolean,
  groupname_id: number,
  exclusion_criteria: string,
  exemption_criteria: string,
  deduct_from_allowance: boolean,
  deduct_from_allowance_id: number,
  ledger_account: string,
  interest_ledger_account: string,
  loan_policy_url: string,
  is_active: boolean,
  sys_rule: string,
  moratorium: number,
  int_payroll_profile_id: number
  PayrollProfileInfo: IPayrollProfileInfo,
  GroupnameInfo: IGroupNameInfo,
  DeductFromAllowanceInfo: IDeductFromAllowanceInfo,
  IntPayrollProfileInfo: IPayrollProfileInfo
}
