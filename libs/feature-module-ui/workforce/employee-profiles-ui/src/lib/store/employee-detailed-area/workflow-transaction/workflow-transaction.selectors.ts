import { createSelector } from '@ngrx/store';

import { IEmployeesProfileState, getEmployeesProfileState } from '../../root/employees-profile.state';

import { IWorkflowTransactionState } from './workflow-transaction.state';

export const getWorkflowTransactionState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.workflowTransaction
);

export const showEditorWorkflowTransaction = createSelector(
  getWorkflowTransactionState,
  (state: IWorkflowTransactionState) => state.showEditor
);

export const showViewerWorkflowTransaction = createSelector(
  getWorkflowTransactionState,
  (state: IWorkflowTransactionState) => state.showViewer
);

export const isWorkflowTransactionProcessing = createSelector(
  getWorkflowTransactionState,
  (state: IWorkflowTransactionState) => state.showViewer
);

export const getWorkflowTransactionApprovedData = createSelector(
  getWorkflowTransactionState,
  (state: IWorkflowTransactionState) => state.approvedData
);

export const getWorkflowTransactionAwaitingApprovalData = createSelector(
  getWorkflowTransactionState,
  (state: IWorkflowTransactionState) => state.awaitingApprovalData
);