
export interface IFixedAllowanceRate {
  fixedallow_id: number;
  pay_usedirect_amount: boolean;
  pay_amount: number;
  pay_formula_id: number;
  tax_amount: number;
  tax_percent: number;
  min_nontaxable: number;
  is_temporary: boolean;
  eff_period_from: Date;
  eff_period_to: Date;
  archive_status: boolean;
  approval_status: number;
  eligibility: number;
  eligibility_text_type: string;
  fixedallow_text: string;
  pay_formula_type: string;
  pay_currency_type: string;
  pay_currency_id: number;

  employeename?: string;
  is_rolled_over_yearly?: boolean;
  fa_empspec_id?: number;
  employee_id?: number;

  fa_groupspec_id?: number;
  paygroup_id?: number;
  paygroup_code?: string;
  paygroup_text?: string;
  shortname?: string;
  grade_id?: number;
  grade_text?: string;
  rank?: number;

  item_id?: number;
  is_global?: boolean;
}
