
export interface ITransaction {
  loan_id: number,
  book_date: Date,
  currency_id: number,
  ess_source_id: number,
  initial_loan_amount: number,
  effective_period: Date,
  monthly_deduction: number,
  interest_rate: number,
  tenor_years: number,
  tenor_months: number,
  tenor_days: number,
  status: number,
  approval_status: number,
  loan_balance: number,
  uncleared_loan_balance: number,
  overdue_monthly_ded: number,
  overdue_monthly_interest: number,
  moratorium: number,
  disburse_transaction_date: Date,
  disburse_actual_date: Date,
  first_deduction_date: Date,
  disburse_status: number,
  disburse_note: string,
  prior_effective_date: Date,
  sys_note: string,
  manual_repay_bal: number,
  manual_repay_int: number,
  has_applied: boolean,
  doc_extension: string,
  doc_binary: string,
  doc_url: string,
  doc_guid: string,
  doc_size: number
}
