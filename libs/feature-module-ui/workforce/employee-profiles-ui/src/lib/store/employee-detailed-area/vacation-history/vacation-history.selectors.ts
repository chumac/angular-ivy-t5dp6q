import { createSelector } from '@ngrx/store';

import { IEmployeesProfileState, getEmployeesProfileState } from '../../root/employees-profile.state';

import { IVacationHistoryState } from './vacation-history.state';

export const getVacationHistoryState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.vacationHistory
);

export const showEditorVacationHistory = createSelector(
  getVacationHistoryState,
  (state: IVacationHistoryState) => state.showEditor
);

export const showViewerVacationHistory = createSelector(
  getVacationHistoryState,
  (state: IVacationHistoryState) => state.showViewer
);

export const isVacationHistoryProcessing = createSelector(
  getVacationHistoryState,
  (state: IVacationHistoryState) => state.showViewer
);

export const getVacationHistoryApprovedData = createSelector(
  getVacationHistoryState,
  (state: IVacationHistoryState) => state.approvedData
);

export const getVacationHistoryAwaitingApprovalData = createSelector(
  getVacationHistoryState,
  (state: IVacationHistoryState) => state.awaitingApprovalData
);