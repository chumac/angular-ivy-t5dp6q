import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ITimeSheetState } from './time-sheet.state';

import { IRootState } from '../root';

export const getState = createFeatureSelector<IRootState>('time');

export const getTimeSheetState = createSelector(
  getState,
  (state: IRootState) => state.timeSheet
);

export const isLoadingTimeSheet = createSelector(
  getTimeSheetState,
  (state: ITimeSheetState) => state.isLoading
);

export const showEditorTimeSheet = createSelector(
  getTimeSheetState,
  (state: ITimeSheetState) => state.showEditor
);

export const getTimeSheetProjectById = createSelector(
  getTimeSheetState,
  (state: ITimeSheetState) => state.projects
);

export const showViewerTimeSheet = createSelector(
  getTimeSheetState,
  (state: ITimeSheetState) => state.showViewer
);

export const getTimeSheetApprovedData = createSelector(
  getTimeSheetState,
  (state: ITimeSheetState) => state.approvedData
);

export const getTimeSheetAwaitingApprovalData = createSelector(
  getTimeSheetState,
  (state: ITimeSheetState) => state.awaitingApprovalData
);


export const getTimeSheetDayStreamData = createSelector(
  getTimeSheetState,
  (state: ITimeSheetState) => state.dayStreamData
);

export const isLoadingDayStreamData = createSelector(
  getTimeSheetState,
  (state: ITimeSheetState) => state.isLoadingDayStream
);



export const isLoadingWorkStream2 = createSelector(
  getTimeSheetState,
  (state: ITimeSheetState) => state.isLoading
);

export const isLoadingWorkStream = (dayId: number) => createSelector(
  getTimeSheetState,
  (state: ITimeSheetState) => {
    const data = state.dayStreamData.filter(val => val.day_id === dayId).shift();
    if (data) {
      return data.isLoadingWorkStream;
    } else {
      return false;
    }
  }
);
