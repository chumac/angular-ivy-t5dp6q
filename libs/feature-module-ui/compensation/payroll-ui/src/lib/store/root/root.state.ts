
import { createFeatureSelector } from '@ngrx/store';
import { ICalendarState } from '../calendar';
import { IBankState } from '../dependencies/bank';
import { IFormulaState } from '../dependencies/formula';
import { IPayGroupState } from '../dependencies/pay-group';
import { ICurrencyState } from '../dependencies/payment-currency';
import { IPfaState } from '../dependencies/pfa';
import { IProfileState } from '../dependencies/profile';
import { IFixedAllowanceState } from '../pay-elements/fixed-allowance/fixed-allowance.state';
import { IFixedDeductionState } from '../pay-elements/fixed-deduction';
import { IVariableAllowanceState } from '../pay-elements/variable-allowance';
import { IVariableAllowanceTransactionState } from '../pay-elements/variable-allowance-transaction';
import { IVariableDeductionState } from '../pay-elements/variable-deduction';
import { IVariableDeductionTransactionState } from '../pay-elements/variable-deduction-transaction';
import { IDefaultCurrencyState } from '../dependencies/default-currency';
import { IRunState } from '../execution/run/run.state';
import { ILastRunItemState } from '../execution/last-run-item/last-run-item.state';
// import { IStaffState } from '../setup/exclusions/new-staff-arrear/newstaff.state';
// import { ITransactionState } from '../setup/transaction';
// import { IReliefState } from '../setup/regulation/reliefs-and-exemptions';
// import { ITaxManagementState } from '../setup/tax-management/tax-management.state';
import { ITransactionState } from '../setup/transaction/transaction.state';
import { IReliefState } from '../setup/regulation/reliefs-and-exemptions/reliefs.state';
import { IStaffState } from '../setup/exclusions/new-staff-arrear/newstaff.state';
import { ITaxManagementState } from '../setup/tax-management/tax-management.state';
import { IPayrollIntegrationState } from '../execution/payroll-integration/payroll-integration.state';
import { ISalaryReviewState } from '../salary-review/salary-review.state';

export interface IRootState {
  calendar:ICalendarState;
  bank:IBankState,
  formula:IFormulaState,
  defaultCurrency:IDefaultCurrencyState,
  payGroup:IPayGroupState,
  currency:ICurrencyState,
  pfa:IPfaState,
  profile:IProfileState,
  fixedAllowance:IFixedAllowanceState,
  fixedDeduction:IFixedDeductionState,
  variableAllowance:IVariableAllowanceState,
  variableAllowanceTransaction:IVariableAllowanceTransactionState,
  variableDeduction:IVariableDeductionState,
  variableDeductionTransaction:IVariableDeductionTransactionState,
  run:IRunState,
  payrollIntegration: IPayrollIntegrationState,
  staff : IStaffState,
  taxManagement : ITaxManagementState,
  lastRunItem:ILastRunItemState,
  exclusionTransaction:ITransactionState,
  relief : IReliefState,
  salary : ISalaryReviewState,
}

export const initialState: IRootState = {
  // approval: null,
  // leaveEdit: null
  calendar: null,
  bank: null,
  formula: null,
  defaultCurrency: null,
  payGroup: null,
  currency: null,
  pfa: null,
  profile: null,
  fixedAllowance: null,
  fixedDeduction: null,
  variableAllowance: null,
  variableAllowanceTransaction: null,
  variableDeduction: null,
  variableDeductionTransaction: null,
  run: null,
  payrollIntegration: null,
  staff : null,
  taxManagement : null,
  lastRunItem: null,
  exclusionTransaction: null,
  relief:null,
  salary: null,
};

 export const getRootState = createFeatureSelector<IRootState>('payroll');
