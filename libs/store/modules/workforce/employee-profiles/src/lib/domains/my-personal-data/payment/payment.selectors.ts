import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IPaymentState } from './payment.state';

export const getPaymentState = createFeatureSelector<IPaymentState>('payment');

export const isProcessingPayment = createSelector(
  getPaymentState,
  (state: IPaymentState) => state.isProcessing
);

export const showEditorPayment = createSelector(
  getPaymentState,
  (state: IPaymentState) => state.showEditor
);

export const showViewerPayment = createSelector(
  getPaymentState,
  (state: IPaymentState) => state.showViewer
);

export const getPaymentApprovedData = createSelector(
  getPaymentState,
  (state: IPaymentState) => state.approvedData
);

export const getPaymentAwaitingApprovalData = createSelector(
  getPaymentState,
  (state: IPaymentState) => state.awaitingApprovalData
);
