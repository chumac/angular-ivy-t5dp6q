import { createSelector } from '@ngrx/store';

import { IHrReboardPaymentState } from './hr-reboard-payment.state';

import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';

export const getHrReboardPaymentState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.hrReboardPayment
);


export const isProcessingHrReboardPayment = createSelector(
  getHrReboardPaymentState,
  (state: IHrReboardPaymentState) => state.isProcessing
);

export const showEditorHrReboardPayment = createSelector(
  getHrReboardPaymentState,
  (state: IHrReboardPaymentState) => state.showEditor
);

export const showViewerHrReboardPayment = createSelector(
  getHrReboardPaymentState,
  (state: IHrReboardPaymentState) => state.showViewer
);

export const getHrReboardPaymentData = createSelector(
  getHrReboardPaymentState,
  (state: IHrReboardPaymentState) => state.data
);
