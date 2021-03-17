
export interface IFixedDeductionRate {
  fixeddeduct_id: number;
  usedirect_amount: boolean;
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
  eligibility_text_type: string;
  fixeddeduct_text: string;
  deduct_formula_type: string;
  currency_text?: string;
  currency_id: number;

  employeename?: string;
  is_rolled_over_yearly?: boolean;
  fd_empspec_id?: number;
  employee_id?: number;

  fd_groupspec_id?: number;
  paygroup_id?: number;
  paygroup_code?: string;
  paygroup_text?: string;
  shortname?: string;
  grade_id?: number;
  grade_text?: string;
  rank?: number;

  item_id?: number;
  is_global?: boolean;

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
