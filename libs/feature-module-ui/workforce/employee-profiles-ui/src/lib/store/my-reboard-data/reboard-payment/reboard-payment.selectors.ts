import { createSelector } from '@ngrx/store';

import { IReboardPaymentState } from './reboard-payment.state';

import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';

export const getReboardPaymentState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.reboardPayment
);


export const isProcessingReboardPayment = createSelector(
  getReboardPaymentState,
  (state: IReboardPaymentState) => state.isProcessing
);

export const showEditorReboardPayment = createSelector(
  getReboardPaymentState,
  (state: IReboardPaymentState) => state.showEditor
);

export const showViewerReboardPayment = createSelector(
  getReboardPaymentState,
  (state: IReboardPaymentState) => state.showViewer
);

export const getReboardPaymentData = createSelector(
  getReboardPaymentState,
  (state: IReboardPaymentState) => state.data
);
