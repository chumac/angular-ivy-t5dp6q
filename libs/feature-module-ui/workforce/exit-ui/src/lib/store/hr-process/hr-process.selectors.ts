import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IHrProcessState } from './hr-process.state';
import { getState } from '../root/exit.selector';
import { IExitState } from '../root/exit.state';

export const getHrProcessState = createSelector(
  getState,
  (state: IExitState) => state.hrProcess
);

export const isLoadingHrProcessData = createSelector(
  getHrProcessState,
  (state: IHrProcessState) => state.isLoading
);

export const isProcessingHrProcessData = createSelector(
  getHrProcessState,
  (state: IHrProcessState) => state.isProcessing
);

export const getEmployeeProcessListData = createSelector(
  getHrProcessState,
  (state: IHrProcessState) => state.processListData
);

export const getEmployeeChecklistTransactions = createSelector(
  getHrProcessState,
  (state: IHrProcessState) => state.checklistTransactions
);

export const getEmployeeSubmittedLetter = createSelector(
  getHrProcessState,
  (state: IHrProcessState) => state.employeeSubmittedLetter
);

export const getFinalizeWorkflowData = createSelector(
  getHrProcessState,
  (state: IHrProcessState) => state.finalizeWorkflow
);

export const isUserAdmin = createSelector(
  getHrProcessState,
  (state: IHrProcessState) => state.isAdmin
);

export const getEmployeeLetterDocument = createSelector(
  getHrProcessState,
  (state: IHrProcessState) => state.document
);


export const getHRSubmitStatus = createSelector(
  getHrProcessState,
  (state: IHrProcessState) => state.submitSuccess
);

export const showEditorSeparation = createSelector(
  getHrProcessState,
  (state: IHrProcessState) => state.showEditor
);
