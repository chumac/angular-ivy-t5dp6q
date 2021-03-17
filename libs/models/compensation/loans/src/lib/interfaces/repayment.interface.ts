import { ILoanDetail } from "./loan-detail.interface";
import { IEmployee } from "./employee.interface";

export interface ILoanRepayment {
  loanrepayments_id: number,
  loandetailsInfo: ILoanDetail,
  employeeInfo: IEmployee,
  repayment_type: number,
  amount: number,
  payment_instrument: number,
  reference: string,
  effective_period: Date,
  document_image: any,
  transaction_balance: number,
  transaction_interest: number,
  repayment_type_text: string
}
