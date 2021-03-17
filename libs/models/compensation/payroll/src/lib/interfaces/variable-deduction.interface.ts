import { IPayGroup } from "./paygroup.interface";
import { ICurrency } from "./currency.interface";
import { IFormula } from "./formula.interface";
import { IProfile } from "./profile.interface";

export interface IVariableDeduction {
  vardeduction_id: number;
  code: string;
  description: string;
  ordering_rank: number;
  shortname: string;
  addto_relief: any;
  group_item: any;
  GroupnameInfo: IPayGroup;
  must_apply_for: any;
  transaction_unit: number;
  use_global_rate: any;
  rate_table: number;
  usedirect_amount: boolean;
  relief_amount: number;
  relief_percent: number;
  CurrencyInfo: ICurrency;
  direct_amount: number;
  FormulaInfo: IFormula;
  PayrollProfileInfo: IProfile;
  ledger_account: string;
  sys_rule: string;
  groupname_id: number;
  groupname_id_text: string;
  currency_id: number;
  currency_id_text: string;
  formula_id: number;
  formula_id_text: string;
  payroll_profile: number;
  payroll_profile_text: string;
  approval_status: number;
}
