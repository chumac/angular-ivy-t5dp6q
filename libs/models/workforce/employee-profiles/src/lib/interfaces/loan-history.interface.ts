export interface ILoanHistory {
  employee_id: number;
  loan_id: number;
  loan: string;
  initial_loan_amount?: number;
  payroll_period?: Date;
  days_in_period?: number;
  monthly_ded_due: number;
  principal_ded_due?: number;
  monthly_ded_actual?: number;
  principal_ded_actual?: number;
  interest_ded_actual?: number;
  interest_ded_due?: number;
  loan_balance_bf?: number;
  final_balance?: number;
  overdue_monthly_ded?: number;
  overdue_monthly_interest?: number;
  disburse_transaction_date?: Date;
  disburse_actual_date?: Date;
  disburse_status: number;
  disburse_status_meaning: string;
  disburse_note: string;
  status?: number;
  currency_id?: number;
  currency_name: string;
}
