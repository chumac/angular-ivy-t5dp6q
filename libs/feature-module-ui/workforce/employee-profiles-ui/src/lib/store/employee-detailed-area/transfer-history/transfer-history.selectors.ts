import { createSelector } from '@ngrx/store';

import { IEmployeesProfileState, getEmployeesProfileState } from '../../root/employees-profile.state';

import { ITransferHistoryState } from './transfer-history.state';

export const getTransferHistoryState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.transferHistory
);

export const showEditorTransferHistory = createSelector(
  getTransferHistoryState,
  (state: ITransferHistoryState) => state.showEditor
);

export const showViewerTransferHistory = createSelector(
  getTransferHistoryState,
  (state: ITransferHistoryState) => state.showViewer
);

export const isTransferHistoryProcessing = createSelector(
  getTransferHistoryState,
  (state: ITransferHistoryState) => state.showViewer
);

export const getTransferHistoryApprovedData = createSelector(
  getTransferHistoryState,
  (state: ITransferHistoryState) => state.approvedData
);

export const getTransferHistoryAwaitingApprovalData = createSelector(
  getTransferHistoryState,
  (state: ITransferHistoryState) => state.awaitingApprovalData
);