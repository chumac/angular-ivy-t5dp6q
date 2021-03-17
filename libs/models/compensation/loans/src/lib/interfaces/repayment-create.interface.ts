

export interface IRepaymentCreate {
  employee_id: number,
  loandetail_id: number,
  repayment_type: number,
  amount: number,
  payment_instrument: number,
  reference: string,
  effective_period: Date,
  document_image: string
}
