import { ICurrency } from "./currency.interface";
import { IFormula } from "./formula.interface";
import { IPayGroup } from "./paygroup.interface";
import { Time } from "@angular/common";
import { IProfile } from "./profile.interface";

export interface IFixedAllowance {
  allowance_id: number;
  code: string;
  description: string;
  pay_frequency: number;
  pay_frequency_text: string,
  max_payment: number;
  start_period: String;
  pay_at_startPeriod: boolean;
  shortname: string;
  prorate_allowance: boolean;
  payroll_type: number;
  payroll_type_text: string;
  is_taxable: boolean;
  is_earned_income: boolean;
  eligibility: number;
  eligibility_text_type: string,
  cumulate_allowance: boolean;
  cumulate_allowance_id: number;
  pay_usedirect_amount: boolean;
  pay_currency_id: number,
  CurrencyInfo: ICurrency;
  pay_amount: number;
  FormulaInfo: IFormula;
  tax_amount: number;
  tax_percent: number;
  min_nontaxable: number;
  group_item: boolean;
  groupname_id: number,
  GroupnameInfo: any;
  payitem_type: number;
  payitem_type_text: string,
  arrear_id: number;
  rank: number;
  is_upfront: boolean;
  ledger_account: string;
  can_subscribe: boolean;
  non_exclusion: boolean;
  temp_or_perm: boolean;
  eff_period_from: Time;
  eff_period_to: Time;
  payroll_profile: number;
  link_to: boolean;
  link_allowance_id: number;
  link_allowance_text: string,
  is_amortized: boolean;
  master_rec_id: number;
  use_confirm_or_employ_date: number;
  sys_rule: string;
  AmortizeInfo: IProfile;
  archive_status: number,
  approval_status: number,
  amortize_profile_id: number,
  amortize_profile_text: string,
  payroll_profile_text: string,
  pay_currency_type: string,
  pay_formula_type: string,
  groupname_text: string,
}
