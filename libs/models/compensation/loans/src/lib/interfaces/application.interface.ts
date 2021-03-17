import { IEmployee } from "./employee.interface";
import { ILoanDefinitionInfo } from "./loan-definition-info.interface";
import { ICurrency } from "./currency.interface";

export interface IApplication {
  ess_loandetail_id: number,
  loanDefInfo: ILoanDefinitionInfo,
  EmployeeInfo: IEmployee,
  CurrencyInfo: ICurrency,
  loan_amount: number,
  effective_date: Date,
  monthly_deduction: number,
  interest_rate: number,
  tenor_years: number,
  tenor_months: number,
  tenor_days: number,
  narration: string,
  status: number,
  approval_status: number,
  moratorium: number,
  original_effective_date: Date,
  adjusted_effective_date: Date,
  is_proxy: string,
  proxy_user: string,
  proxy_date: Date
}
