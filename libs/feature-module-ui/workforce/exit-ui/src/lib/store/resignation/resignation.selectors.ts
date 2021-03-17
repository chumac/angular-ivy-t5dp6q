import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IResignationState } from './resignation.state';
import { getState } from '../root/exit.selector';
import { IExitState } from '../root/exit.state';

export const getResignationState = createSelector(
  getState,
  (state: IExitState) => state.resignation
);

export const isLoadingResignations = createSelector(
  getResignationState,
  (state: IResignationState) => state.isLoading
);

export const isProcessingResignations = createSelector(
  getResignationState,
  (state: IResignationState) => state.isProcessing
);

export const showEditorValidate = createSelector(
  getResignationState,
  (state: IResignationState) => state.showValidateEditor
);

export const showViewerResponseResignation = createSelector(
  getResignationState,
  (state: IResignationState) => state.showViewerResponses
);


export const getResponsesDataResignation = createSelector(
  getResignationState,
  (state: IResignationState) => state.responsesData
);

export const getProcessListData = createSelector(
  getResignationState,
  (state: IResignationState) => state.processListData
);

export const getSubmittedResignationsDataResignation = createSelector(
  getResignationState,
  (state: IResignationState) => state.submittedData
);

export const getResignationTypes = createSelector(
  getResignationState,
  (state: IResignationState) => state.resignationTypes
);

export const getResignationDocument = createSelector(
  getResignationState,
  (state: IResignationState) => state.document
);

export const submitLetterSuccess = createSelector(
  getResignationState,
  (state: IResignationState) => state.submitSuccessful
);

export const getProxyResignations = createSelector(
  getResignationState,
  (state: IResignationState) => state.proxyResignations
);

export const getMySubordinates = createSelector(
  getResignationState,
  (state: IResignationState) => state.mySubordinates
);

export const getEmployeeInitiationStatus = createSelector(
  getResignationState,
  (state: IResignationState) => state.employeeProcessInitiated
);

export const getNumberofResponseNotifications = createSelector(
  getResignationState,
  (state: IResignationState) => state.numberOfNotifications
);

export const getExitInitiationStatus = createSelector(
  getResignationState,
  (state: IResignationState) => state.myProcessInitiated
);

export const interviewStarted = createSelector(
  getResignationState,
  (state: IResignationState) => state.interviewStarted
);

export const showResignEditor = createSelector(
  getResignationState,
  (state: IResignationState) => state.showEditor
);
