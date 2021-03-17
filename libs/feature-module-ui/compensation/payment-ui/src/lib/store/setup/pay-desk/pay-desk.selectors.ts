import { createSelector } from '@ngrx/store';

import { IPayDeskState } from './pay-desk.state';
import { getRootState, IRootState } from '../../root/root.state';

export const getPayDeskState = createSelector(
  getRootState,
  (state: IRootState) => state.payDesk
);

export const isProcessing = createSelector(
  getPayDeskState,
  (state: IPayDeskState) => state.isProcessing
);

export const isLoading = createSelector(
  getPayDeskState,
  (state: IPayDeskState) => state.isLoading
);

export const showEditor = createSelector(
  getPayDeskState,
  (state: IPayDeskState) => state.showEditor
);

export const getPayDeskData = createSelector(
  getPayDeskState,
  (state: IPayDeskState) => state.data
);

export const getPaymentPlatformData = createSelector(
  getPayDeskState,
  (state: IPayDeskState) => state.paymentPlatforms
);
