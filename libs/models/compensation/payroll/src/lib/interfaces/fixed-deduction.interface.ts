import { IDeductCurrency } from "./deduct-currency.interface";
import { IFormula } from "./formula.interface";
import { IPayGroup } from "./paygroup.interface";
import { Time } from "@angular/common";
import { IProfile } from "./profile.interface";




export interface IFixedDeduction {
  deduction_id: number;
  code: string;
  description: string;
  deduct_frequency: number;
  max_deduct: number;
  start_period: string;
  deduct_at_startPeriod: boolean;
  shortname: string;
  prorate_deduction: boolean;
  payroll_type: number;
  is_statutory: boolean;
  cumulate_deduction: boolean;
  cumulate_deduction_id: number;
  eligibility: number;
  deduct_usedirect_amount: boolean;
  CurrencyInfo: IDeductCurrency;
  deduct_amount: number;
  FormulaInfo: IFormula;
  has_employer_contribution: boolean;
  empcontibute_usedirect_amount: boolean;
  empcontribute_amount: number;
  EmpFormulaInfo: IFormula;
  group_item: boolean;
  GroupnameInfo: IPayGroup;
  deductitem_type: number;
  rank: number;
  ledger_account: string;
  can_subscribe: boolean;
  non_exclusion: boolean;
  is_permanent: boolean;
  eff_period_from: Date;
  eff_period_to: Date;
  PayrollProfileInfo: IProfile;
  link_to: boolean;
  link_deduction_id: number;
  sys_rule: string;
  payroll_profile: number;
  groupname_id: number;

  approval_status: number;
  archive_status: boolean;
  cumulate_deduction_type_text: string;
  deduct_currency_id: number;
  deduct_currency_type_text: string;
  deduct_formula_id: number;
  deduct_formula_type_text: string;
  eligibility_type_text: string;
  empcontribute_formula_id: number;
  empcontribute_formula_type_text: string;
  groupname_type_text: string;
  link_deduction_type_text: string;
  payroll_profile_type_text: string;
  payroll_type_text: string;
  temp_or_perm: boolean;
}
