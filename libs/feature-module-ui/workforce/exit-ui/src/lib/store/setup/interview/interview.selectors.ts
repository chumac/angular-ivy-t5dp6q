import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IInterviewState } from './interview.state';
import { IExitState } from '../../root';

export const getState = createFeatureSelector<IExitState>('exit');
export const getInterviewState = createSelector(
  getState,
  (state: IExitState) => state.interview
);

export const isProcessingInterview = createSelector(
  getInterviewState,
  (state: IInterviewState) => state.isProcessing
);

export const isLoadingInterview = createSelector(
  getInterviewState,
  (state: IInterviewState) => state.isLoading
);

export const showEditorInterviewForm = createSelector(
  getInterviewState,
  (state: IInterviewState) => state.showFormEditor
);

export const showEditorInterviewQuestion = createSelector(
  getInterviewState,
  (state: IInterviewState) => state.showQuestionEditor
);

export const showViewerInterviewForm = createSelector(
  getInterviewState,
  (state: IInterviewState) => state.showFormViewer
);

export const showViewerInterviewQuestion = createSelector(
  getInterviewState,
  (state: IInterviewState) => state.showQuestionViewer
);

export const getFormDataInterview = createSelector(
  getInterviewState,
  (state: IInterviewState) => state.interviewFormsData
);

export const getQuestionDataInterview = createSelector(
  getInterviewState,
  (state: IInterviewState) => state.questionsData
);
