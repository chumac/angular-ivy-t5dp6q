import { createSelector } from '@ngrx/store';

import { IScheduleDetailState } from './schedule-details.state';
import { getRootState, IRootState } from '../root/root.state';

export const getScheduleDetailsState = createSelector(
  getRootState,
  (state: IRootState) => state.scheduleDetail
);

export const isProcessingScheduleDetail = createSelector(
  getScheduleDetailsState,
  (state: IScheduleDetailState) => state.isProcessing
);

export const isUploadingScheduleDetail = createSelector(
  getScheduleDetailsState,
  (state: IScheduleDetailState) => state.isUploading
);

export const isLoadingScheduleDetail = createSelector(
  getScheduleDetailsState,
  (state: IScheduleDetailState) => state.isLoading
);

export const isValidatingRecordScheduleDetail = createSelector(
  getScheduleDetailsState,
  (state: IScheduleDetailState) => state.isValidatingRecord
);

export const isSubmittingScheduleDetail = createSelector(
  getScheduleDetailsState,
  (state: IScheduleDetailState) => state.isSubmitting
);

export const isRequeueingScheduleDetail = createSelector(
  getScheduleDetailsState,
  (state: IScheduleDetailState) => state.isRequeueing
);

export const isResetingScheduleDetail = createSelector(
  getScheduleDetailsState,
  (state: IScheduleDetailState) => state.isReseting
);

export const showEditorScheduleDetail = createSelector(
  getScheduleDetailsState,
  (state: IScheduleDetailState) => state.showEditor
);

export const showViewerScheduleDetail = createSelector(
  getScheduleDetailsState,
  (state: IScheduleDetailState) => state.showViewer
);

export const getScheduleDetailData = createSelector(
  getScheduleDetailsState,
  (state: IScheduleDetailState) => state.data
);

export const getSingleScheduleData = createSelector(
  getScheduleDetailsState,
  (state: IScheduleDetailState) => state.scheduleData
);

export const getCurrencyData = createSelector(
  getScheduleDetailsState,
  (state: IScheduleDetailState) => state.currencyData
);

export const getAccountTypeData = createSelector(
  getScheduleDetailsState,
  (state: IScheduleDetailState) => state.accountTypeData
);

export const isProcessingDataGrid = createSelector(
  getScheduleDetailsState,
  (state: IScheduleDetailState) => state.isProcessingDataGrid
);

export const isPaymentSuccess = createSelector(
  getScheduleDetailsState,
  (state: IScheduleDetailState) => state.paySuccess
);
