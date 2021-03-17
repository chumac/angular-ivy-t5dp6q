import { createSelector } from '@ngrx/store';

import { IHrResignationState } from './hr-resignation.state';
import { getState } from '../root/exit.selector';
import { IExitState } from '../root/exit.state';

export const getHrResignationState = createSelector(
  getState,
  (state: IExitState) => state.hrResignation
);


export const showEditorResignation = createSelector(
  getHrResignationState,
  (state: IHrResignationState) => state.showEditor
);

export const isLoadingHrResignations = createSelector(
  getHrResignationState,
  (state: IHrResignationState) => state.isLoading
);

export const isProcessingHrResignations = createSelector(
  getHrResignationState,
  (state: IHrResignationState) => state.isProcessing
);

export const getSubmittedLetters = createSelector(
  getHrResignationState,
  (state: IHrResignationState) => state.submittedLetters
);

export const getResignationTypes = createSelector(
  getHrResignationState,
  (state: IHrResignationState) => state.resignationTypes
);

export const getResignationDocument = createSelector(
  getHrResignationState,
  (state: IHrResignationState) => state.document
);

export const getResponseQueue = createSelector(
  getHrResignationState,
  (state: IHrResignationState) => state.hrResponseQueue
);

export const getReportUrl = createSelector(
  getHrResignationState,
  (state: IHrResignationState) => state.reportUrl
);
