import { IPayGroup } from "./paygroup.interface";
import { ICurrency } from "./currency.interface";
import { IFormula } from "./formula.interface";
import { IProfile } from "./profile.interface";

export interface IVariableAllowance {
  varallowance_id: number;
  code: string;
  description: string;
  ordering_rank: number;
  shortname: string;
  is_taxable: any;
  group_item: any;
  GroupnameInfo: IPayGroup;
  must_apply_for: any;
  transaction_unit: number;
  use_global_rate: any;
  rate_table: number;
  usedirect_amount: boolean;
  tax_amount: number;
  tax_percent: number;
  min_nontaxable: number;
  CurrencyInfo: ICurrency;
  direct_amount: number;
  FormulaInfo: IFormula;
  PayrollProfileInfo: IProfile;
  org_id: number;
  created_by: string;
  created_date: Date;
  last_modified_by: string;
  last_modified_date: Date;
  archive_status: boolean;
  approval_status: number;
  master_rec_id: number;
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
}
