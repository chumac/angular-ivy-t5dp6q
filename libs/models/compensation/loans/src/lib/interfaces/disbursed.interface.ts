export interface IDisbursed  {
  employee_id: number,
  employee_number: string,
  employee_name: string,
  loan_id: number,
  loan_det_id: number,
  loan: string,
  book_date: Date,
  initial_loan_amount: number,
  monthly_deduction: number,
  interest_rate: number,
  tenor_months: number,
  moratorium: number,
  disburse_actual_date: Date,
  first_deduction_date: Date
}
