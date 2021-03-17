import { createSelector } from '@ngrx/store';

import { IEmployeesProfileState, getEmployeesProfileState } from '../../root/employees-profile.state';

import { IPerformanceHistoryState } from './performance-history.state';

export const getPerformanceHistoryState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.performanceHistory
);

export const showEditorPerformanceHistory = createSelector(
  getPerformanceHistoryState,
  (state: IPerformanceHistoryState) => state.showEditor
);

export const showViewerPerformanceHistory = createSelector(
  getPerformanceHistoryState,
  (state: IPerformanceHistoryState) => state.showViewer
);

export const isPerformanceHistoryProcessing = createSelector(
  getPerformanceHistoryState,
  (state: IPerformanceHistoryState) => state.showViewer
);

export const getPerformanceHistoryApprovedData = createSelector(
  getPerformanceHistoryState,
  (state: IPerformanceHistoryState) => state.approvedData
);

export const getPerformanceHistoryAwaitingApprovalData = createSelector(
  getPerformanceHistoryState,
  (state: IPerformanceHistoryState) => state.awaitingApprovalData
);