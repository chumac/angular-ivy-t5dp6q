export interface IPayrollPaymentHistory {
  payroll_profile_name: string;
  payroll_date?: Date;
  item_description: string;
  paygroup_id: string;
  employee_id: number;
  formula_text: string;
  pay_amount: number;
  currency_name: string;
  item_code: string;
  is_taxable: string;
  tax_amount?: number;
  tax_percent?: number;
  period_payment?: number;
  is_fixeddeduction_tax: string;
  taxable_amount?: number;
  sys_comments: string;
}