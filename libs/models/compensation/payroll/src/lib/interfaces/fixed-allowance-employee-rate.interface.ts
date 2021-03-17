
export interface IFixedAllowanceEmployeeRate {
  fa_empspec_id: number;
  employee_id: number;
  fixedallow_id: number;
  pay_usedirect_amount: boolean;
  pay_currency_id: number;
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
  is_rolled_over_yearly: boolean;
  eligibility: number;
  eligibility_text_type: string;
  fixedallow_text: string;
  pay_currency_type: string;
  pay_formula_type: string;
  employeename: string;
}
