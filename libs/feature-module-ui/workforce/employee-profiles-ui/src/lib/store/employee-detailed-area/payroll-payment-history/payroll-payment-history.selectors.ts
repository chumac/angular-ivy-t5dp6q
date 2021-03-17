import { createSelector } from '@ngrx/store';

import { IEmployeesProfileState, getEmployeesProfileState } from '../../root/employees-profile.state';

import { IPayrollPaymentHistoryState } from './payroll-payment-history.state';

export const getPayrollPaymentHistoryState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.payrollPaymentHistory
);

export const showEditorPayrollPaymentHistory = createSelector(
  getPayrollPaymentHistoryState,
  (state: IPayrollPaymentHistoryState) => state.showEditor
);

export const showViewerPayrollPaymentHistory = createSelector(
  getPayrollPaymentHistoryState,
  (state: IPayrollPaymentHistoryState) => state.showViewer
);

export const isPayrollPaymentHistoryProcessing = createSelector(
  getPayrollPaymentHistoryState,
  (state: IPayrollPaymentHistoryState) => state.showViewer
);

export const getPayrollPaymentHistoryApprovedData = createSelector(
  getPayrollPaymentHistoryState,
  (state: IPayrollPaymentHistoryState) => state.approvedData
);

export const getPayrollPaymentHistoryAwaitingApprovalData = createSelector(
  getPayrollPaymentHistoryState,
  (state: IPayrollPaymentHistoryState) => state.awaitingApprovalData
);