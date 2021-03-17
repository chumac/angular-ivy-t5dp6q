import { createSelector } from '@ngrx/store';

import { IPendingScheduleState } from './pending.state';
import { getRootState, IRootState } from '../root/root.state';

export const getPendingScheduleState = createSelector(
  getRootState,
  (state: IRootState) => state.pending
);

export const isProcessingPendingSchedule = createSelector(
  getPendingScheduleState,
  (state: IPendingScheduleState) => state.isProcessing
);

export const isLoadingPendingSchedule = createSelector(
  getPendingScheduleState,
  (state: IPendingScheduleState) => state.isLoading
);

export const showPendingScheduleEditor = createSelector(
  getPendingScheduleState,
  (state: IPendingScheduleState) => state.showEditor
);

export const showPendingScheduleViewer = createSelector(
  getPendingScheduleState,
  (state: IPendingScheduleState) => state.showViewer
);

export const getNewScheduleData = createSelector(
  getPendingScheduleState,
  (state: IPendingScheduleState) => state.newScheduleData
);

export const getAwaitingSubmissionScheduleData = createSelector(
  getPendingScheduleState,
  (state: IPendingScheduleState) => state.awaitingSubmissionData
);

export const getPaymentPlatformData = createSelector(
  getPendingScheduleState,
  (state: IPendingScheduleState) => state.paymentPlatformData
);

export const getCurrencyData = createSelector(
  getPendingScheduleState,
  (state: IPendingScheduleState) => state.currencyData
);

export const getPaymentSourceData = createSelector(
  getPendingScheduleState,
  (state: IPendingScheduleState) => state.paymentSourceData
);

export const getPayrollProfileData = createSelector(
  getPendingScheduleState,
  (state: IPendingScheduleState) => state.payrollProfileData
);

export const getPayrollSourceData = createSelector(
  getPendingScheduleState,
  (state: IPendingScheduleState) => state.payrollSourceData
);

export const getPayrollDateData = createSelector(
  getPendingScheduleState,
  (state: IPendingScheduleState) => state.payrollDates
);

export const getAccountTypeData = createSelector(
  getPendingScheduleState,
  (state: IPendingScheduleState) => state.accountTypeData
);

export const isSubmittingPendingSchedule = createSelector(
  getPendingScheduleState,
  (state: IPendingScheduleState) => state.isSubmitting
);
