
export interface IFixedDeductionPaygroupRate {
  fd_groupspec_id: number;
  paygroup_id: number;
  fixeddeduct_id: number;
  usedirect_amount: boolean;
  currency_id: number;
  deduct_amount: number;
  deduct_formula_id: number;
  tax_amount: number;
  tax_percent: number;
  min_nontaxable: number;
  is_temporary: boolean;
  eff_period_from: Date;
  eff_period_to: Date;
  archive_status: boolean;
  approval_status: number;
  eligibility: number;
  paygroup_code: string;
  eligibility_text_type: string;
  paygroup_text: string;
  shortname: string;
  grade_id: number;
  grade_text: string;
  rank: number;
  deduct_currency_type: string;
  currency_text: string;
  deduct_formula_type: string;
  fixeddeduct_text: string;

  apply_emp_contribution: boolean;
  direct_amount: number;
  empcontribute_amount: number;
  empcontribute_formula_id: number;
  empcontribute_formula_type: number;
  empcontribute_usedirect_amount: boolean;
  employeeName: string;
  formula_id: number;
  formula_type: string;
}
