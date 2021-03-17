import { createSelector } from '@ngrx/store';

import { IScheduleState } from './schedule.state';
import { getRootState, IRootState } from '../root/root.state';

export const getScheduleState = createSelector(
  getRootState,
  (state: IRootState) => state.schedule
);

export const isProcessingSchedule = createSelector(
  getScheduleState,
  (state: IScheduleState) => state.isProcessing
);

export const isLoadingSchedule = createSelector(
  getScheduleState,
  (state: IScheduleState) => state.isLoading
);

export const showScheduleEditor = createSelector(
  getScheduleState,
  (state: IScheduleState) => state.showEditor
);

export const showScheduleViewer = createSelector(
  getScheduleState,
  (state: IScheduleState) => state.showViewer
);

export const getApprovedScheduleData = createSelector(
  getScheduleState,
  (state: IScheduleState) => state.approvedData
);

export const getAwaitingApprovalScheduleData = createSelector(
  getScheduleState,
  (state: IScheduleState) => state.awaitingData
);

export const getClosedScheduleData = createSelector(
  getScheduleState,
  (state: IScheduleState) => state.closedData
);

export const getCompletedScheduleData = createSelector(
  getScheduleState,
  (state: IScheduleState) => state.completedData
);

export const getPaymentPlatformData = createSelector(
  getScheduleState,
  (state: IScheduleState) => state.paymentPlatformData
);

export const getCurrencyData = createSelector(
  getScheduleState,
  (state: IScheduleState) => state.currencyData
);

export const getPaymentSourceData = createSelector(
  getScheduleState,
  (state: IScheduleState) => state.paymentSourceData
);

export const getPayrollProfileData = createSelector(
  getScheduleState,
  (state: IScheduleState) => state.payrollProfileData
);

export const getPayrollSourceData = createSelector(
  getScheduleState,
  (state: IScheduleState) => state.payrollSourceData
);

export const getAccountTypeData = createSelector(
  getScheduleState,
  (state: IScheduleState) => state.accountTypeData
);

export const isSavingSchedule = createSelector(
  getScheduleState,
  (state: IScheduleState) => state.isSaving
);
