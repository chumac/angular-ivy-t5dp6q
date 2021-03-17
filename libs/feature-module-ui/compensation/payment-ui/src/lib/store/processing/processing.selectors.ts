import { createSelector } from '@ngrx/store';

import { IProcessingState } from './processing.state';
import { getRootState, IRootState } from '../root/root.state';

export const getProcessingScheduleState = createSelector(
  getRootState,
  (state: IRootState) => state.processing
);

export const isLoadingProcessingSchedule = createSelector(
  getProcessingScheduleState,
  (state: IProcessingState) => state.isLoading
);

export const showProcessingScheduleViewer = createSelector(
  getProcessingScheduleState,
  (state: IProcessingState) => state.showViewer
);

export const getProcessingScheduleData = createSelector(
  getProcessingScheduleState,
  (state: IProcessingState) => state.processingData
);

export const getAwaitingApprovalData = createSelector(
  getProcessingScheduleState,
  (state: IProcessingState) => state.awaitingData
);
