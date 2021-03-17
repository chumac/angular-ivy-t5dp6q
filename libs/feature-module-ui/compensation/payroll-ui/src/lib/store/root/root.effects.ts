import { CalendarEffects } from "../calendar";
import { BankEffects } from "../dependencies/bank";
import { FormulaEffects } from "../dependencies/formula";
import { DefaultCurrencyEffects } from "../dependencies/default-currency";
import { PayGroupEffects } from "../dependencies/pay-group";
import { CurrencyEffects } from "../dependencies/payment-currency";
import { PfaEffects } from "../dependencies/pfa";
import { ProfileEffects } from "../dependencies/profile";
import { FixedDeductionEffects } from "../pay-elements/fixed-deduction";
import { FixedAllowanceEffects } from "../pay-elements/fixed-allowance";
import { VariableAllowanceEffects } from "../pay-elements/variable-allowance";
import { VariableAllowanceTransactionEffects } from "../pay-elements/variable-allowance-transaction";
import { VariableDeductionEffects } from "../pay-elements/variable-deduction";
import { VariableDeductionTransactionEffects } from "../pay-elements/variable-deduction-transaction";
import { LastRunItemEffects } from "../execution/last-run-item/last-run-item.effects";
import { RunEffects } from "../execution/run/run.effects";
import { StaffEffects } from "../setup/exclusions/new-staff-arrear/newstaff.effects";
import { TransactionEffects } from "../setup/transaction/transaction.effects";
import { ReliefEffects } from "../setup/regulation/reliefs-and-exemptions/reliefs.effects";
import { TaxManagementEffects } from "../setup/tax-management/tax-management.effects";
import { PayrollIntegrationEffects } from "../execution/payroll-integration/payroll-integration.effects";
import { SalaryReviewEffects } from "../salary-review/salary-review.effects";


export const rootEffects = [
  CalendarEffects, BankEffects, FormulaEffects, DefaultCurrencyEffects, PayGroupEffects,
  CurrencyEffects, PfaEffects,  ProfileEffects, FixedAllowanceEffects, FixedDeductionEffects,
  VariableAllowanceEffects, VariableAllowanceTransactionEffects, VariableDeductionEffects,
  VariableDeductionTransactionEffects,
  RunEffects,
  StaffEffects,
  LastRunItemEffects,
  TransactionEffects,
  ReliefEffects,
  TaxManagementEffects,
  PayrollIntegrationEffects,
  SalaryReviewEffects
  ]

