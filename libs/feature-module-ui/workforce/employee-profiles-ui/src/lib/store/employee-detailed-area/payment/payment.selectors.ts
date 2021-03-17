import { createSelector } from '@ngrx/store';

import { IEmployeesProfileState, getEmployeesProfileState } from '../../root/employees-profile.state';

import { IPaymentState } from './payment.state';

export const getPaymentState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.payment
);

export const showEditorPayment = createSelector(
  getPaymentState,
  (state: IPaymentState) => state.showEditor
);

export const showViewerPayment = createSelector(
  getPaymentState,
  (state: IPaymentState) => state.showViewer
);

export const isPaymentProcessing = createSelector(
  getPaymentState,
  (state: IPaymentState) => state.isProcessing
);

export const getPaymentApprovedData = createSelector(
  getPaymentState,
  (state: IPaymentState) => state.approvedData
);

export const getPaymentAwaitingApprovalData = createSelector(
  getPaymentState,
  (state: IPaymentState) => state.awaitingApprovalData
);
