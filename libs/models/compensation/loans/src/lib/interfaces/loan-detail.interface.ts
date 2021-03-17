export interface ILoanDetail {
  loandetail_id: number,
  book_date: Date,
  initial_loan_amount: number,
  effective_period: Date,
  monthly_deduction: number,
  interest_rate: number,
  loan_balance: number
}
