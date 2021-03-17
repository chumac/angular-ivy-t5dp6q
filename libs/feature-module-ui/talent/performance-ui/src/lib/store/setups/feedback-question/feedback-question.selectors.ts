import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IFeedbackQuestionState } from './feedback-question.state';
import { IFeedbackQuestion } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getFeedbackQuestionState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.feedbackQuestion
);

export const isProcessingFeedbackQuestion = createSelector(
  getFeedbackQuestionState,
  (state: IFeedbackQuestionState) => state.isProcessing
);

export const showEditorFeedbackQuestion = createSelector(
  getFeedbackQuestionState,
  (state: IFeedbackQuestionState) => state.showEditor
);

export const showViewerFeedbackQuestion = createSelector(
  getFeedbackQuestionState,
  (state: IFeedbackQuestionState) => state.showViewer
);

export const getFeedbackQuestionData = createSelector(
  getFeedbackQuestionState,
  (state: IFeedbackQuestionState) => state.feedbackQuestionData
);

export const getPlanListFeedbackQuestion = createSelector(
  getFeedbackQuestionState,
  (state: IFeedbackQuestionState) => state.planList
);

export const getFeedbackQuestionDocument = createSelector(
  getFeedbackQuestionState,
  (state: IFeedbackQuestionState) => state.document
);
