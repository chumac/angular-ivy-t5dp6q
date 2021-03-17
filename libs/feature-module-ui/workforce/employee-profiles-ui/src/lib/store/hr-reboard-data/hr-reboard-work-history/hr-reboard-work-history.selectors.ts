import { createSelector } from '@ngrx/store';

import { IHrReboardWorkHistoryState } from './hr-reboard-work-history.state';
import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';

export const getHrReboardWorkHistoryState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.hrReboardWorkHistory
);

export const isProcessingHrReboardWorkHistory = createSelector(
  getHrReboardWorkHistoryState,
  (state: IHrReboardWorkHistoryState) => state.isProcessing
);

export const showEditorHrReboardWorkHistory = createSelector(
  getHrReboardWorkHistoryState,
  (state: IHrReboardWorkHistoryState) => state.showEditor
);

export const showViewerHrReboardWorkHistory = createSelector(
  getHrReboardWorkHistoryState,
  (state: IHrReboardWorkHistoryState) => state.showViewer
);

export const getHrReboardWorkHistoryData = createSelector(
  getHrReboardWorkHistoryState,
  (state: IHrReboardWorkHistoryState) => state.data
);

export const getHrReboardWorkHistoryDocument = createSelector(
  getHrReboardWorkHistoryState,
  (state: IHrReboardWorkHistoryState) => state.document
);
