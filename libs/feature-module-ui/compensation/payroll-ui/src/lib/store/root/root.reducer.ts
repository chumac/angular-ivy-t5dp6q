import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import { IRootState } from "./root.state";
import { calendarReducer } from "../calendar";
import { bankReducer } from "../dependencies/bank";
import { formulaReducer } from "../dependencies/formula";
import { defaultCurrencyReducer } from "../dependencies/default-currency";
import { payGroupReducer } from "../dependencies/pay-group";
import { currencyReducer } from "../dependencies/payment-currency";
import { pfaReducer } from "../dependencies/pfa";
import { profileReducer } from "../dependencies/profile";
import { fixedAllowanceReducer } from "../pay-elements/fixed-allowance/fixed-allowance.reducers";
import { fixedDeductionReducer } from "../pay-elements/fixed-deduction";
import { variableAllowanceReducer } from "../pay-elements/variable-allowance";
import { variableAllowanceTransactionReducer } from "../pay-elements/variable-allowance-transaction";
import { variableDeductionReducer } from "../pay-elements/variable-deduction";
import { variableDeductionTransactionReducer } from "../pay-elements/variable-deduction-transaction";
import { runReducer } from "../execution/run/run.reducers";
import { lastRunItemReducer } from "../execution/last-run-item/last-run-item.reducers";
import { payrollIntegrationReducer } from "../execution/payroll-integration/payroll-integration.reducers";
import { staffReducer } from "../setup/exclusions/new-staff-arrear/newstaff.reducers";
import { transactionReducer } from "../setup/transaction/transaction.reducers";
import { reliefReducer } from "../setup/regulation/reliefs-and-exemptions/reliefs.reducers";
import { taxManagementReducer } from "../setup/tax-management/tax-management.reducers";
import { salaryReviewReducer } from "../salary-review/salary-review.reducers";

export const rootReducer: ActionReducerMap<IRootState> = {
  calendar: calendarReducer,
  bank: bankReducer,
  formula: formulaReducer,
  defaultCurrency: defaultCurrencyReducer,
  payGroup: payGroupReducer,
  currency: currencyReducer,
  pfa: pfaReducer,
  profile: profileReducer,
  fixedAllowance: fixedAllowanceReducer,
  fixedDeduction: fixedDeductionReducer,
  variableAllowance: variableAllowanceReducer,
  variableAllowanceTransaction: variableAllowanceTransactionReducer,
  variableDeduction: variableDeductionReducer,
  variableDeductionTransaction: variableDeductionTransactionReducer,
  run: runReducer,
  payrollIntegration: payrollIntegrationReducer,
  staff : staffReducer,
  taxManagement: taxManagementReducer,
  lastRunItem: lastRunItemReducer,
  exclusionTransaction:transactionReducer,
  relief : reliefReducer,
  salary : salaryReviewReducer,
};

// export const getRootReducer = createFeatureSelector<IRootState>('payroll');
