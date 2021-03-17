import { createSelector } from '@ngrx/store';

import { IEmployeesProfileState, getEmployeesProfileState } from '../../root/employees-profile.state';

import { ITrainingHistoryState } from './training-history.state';

export const getTrainingHistoryState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.trainingHistory
);

export const showEditorTrainingHistory = createSelector(
  getTrainingHistoryState,
  (state: ITrainingHistoryState) => state.showEditor
);

export const showViewerTrainingHistory = createSelector(
  getTrainingHistoryState,
  (state: ITrainingHistoryState) => state.showViewer
);

export const isTrainingHistoryProcessing = createSelector(
  getTrainingHistoryState,
  (state: ITrainingHistoryState) => state.showViewer
);

export const getTrainingHistoryApprovedData = createSelector(
  getTrainingHistoryState,
  (state: ITrainingHistoryState) => state.approvedData
);

export const getTrainingHistoryAwaitingApprovalData = createSelector(
  getTrainingHistoryState,
  (state: ITrainingHistoryState) => state.awaitingApprovalData
);