import { createSelector } from '@ngrx/store';

import { IEmployeesProfileState, getEmployeesProfileState } from '../../root/employees-profile.state';

import { ILoanHistoryState } from './loan-history.state';

export const getLoanHistoryState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.loanHistory
);

export const showEditorLoanHistory = createSelector(
  getLoanHistoryState,
  (state: ILoanHistoryState) => state.showEditor
);

export const showViewerLoanHistory = createSelector(
  getLoanHistoryState,
  (state: ILoanHistoryState) => state.showViewer
);

export const isLoanHistoryProcessing = createSelector(
  getLoanHistoryState,
  (state: ILoanHistoryState) => state.showViewer
);

export const getLoanHistoryApprovedData = createSelector(
  getLoanHistoryState,
  (state: ILoanHistoryState) => state.approvedData
);

export const getLoanHistoryAwaitingApprovalData = createSelector(
  getLoanHistoryState,
  (state: ILoanHistoryState) => state.awaitingApprovalData
);