import { createSelector } from '@ngrx/store';

import { IReboardWorkHistoryState } from './reboard-work-history.state';
import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';

export const getReboardWorkHistoryState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.reboardWorkHistory
);

export const isProcessingReboardWorkHistory = createSelector(
  getReboardWorkHistoryState,
  (state: IReboardWorkHistoryState) => state.isProcessing
);

export const showEditorReboardWorkHistory = createSelector(
  getReboardWorkHistoryState,
  (state: IReboardWorkHistoryState) => state.showEditor
);

export const showViewerReboardWorkHistory = createSelector(
  getReboardWorkHistoryState,
  (state: IReboardWorkHistoryState) => state.showViewer
);

export const getReboardWorkHistoryData = createSelector(
  getReboardWorkHistoryState,
  (state: IReboardWorkHistoryState) => state.data
);

export const getReboardWorkHistoryDocument = createSelector(
  getReboardWorkHistoryState,
  (state: IReboardWorkHistoryState) => state.document
);
