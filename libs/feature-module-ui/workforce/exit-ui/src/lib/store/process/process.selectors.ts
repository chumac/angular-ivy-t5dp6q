import { createSelector } from '@ngrx/store';

import { IProcessState } from './process.state';
import { getState } from '../root/exit.selector';
import { IExitState } from '../root/exit.state';


export const getProcessState = createSelector(
  getState,
  (state: IExitState) => state.process
);

export const isLoadingExitProcess = createSelector(
  getProcessState,
  (state: IProcessState) => state.isLoading
);

export const isProcessingExitProcess = createSelector(
  getProcessState,
  (state: IProcessState) => state.isProcessing
);

export const isProcessingSaveData = createSelector(
  getProcessState,
  (state: IProcessState) => state.isProcessingSave
);

export const isProcessingRedirectData = createSelector(
  getProcessState,
  (state: IProcessState) => state.isProcessingRedirect
);

export const getProcessListData = createSelector(
  getProcessState,
  (state: IProcessState) => state.processListData
);

export const getSubmittedLetter = createSelector(
  getProcessState,
  (state: IProcessState) => state.submittedLetter
);

export const getCustomFormData = createSelector(
  getProcessState,
  (state: IProcessState) => state.customFormData
);


export const getInterviewLink = createSelector(
  getProcessState,
  (state: IProcessState) => state.interviewLink
);

export const getChecklistTypes = createSelector(
  getProcessState,
  (state: IProcessState) => state.checklistTypes
);

export const getChecklistResponseRow = createSelector(
  getProcessState,
  (state: IProcessState) => state.checklistResponseRow
);

export const getChecklistTransactions = createSelector(
  getProcessState,
  (state: IProcessState) => state.checklistTransactions
);

export const getLetterDocument = createSelector(
  getProcessState,
  (state: IProcessState) => state.document
);

export const getPendingResponses = createSelector(
  getProcessState,
  (state: IProcessState) => state.pendingResponses
);

export const showPendingResponses = createSelector(
  getProcessState,
  (state: IProcessState) => state.showPendingResponses
);

export const getSubmitStatus = createSelector(
  getProcessState,
  (state: IProcessState) => state.submitSuccess
);

export const getExitEmployeePhotoLM = createSelector(
  getProcessState,
  (state: IProcessState) => state.employeePhoto
);
