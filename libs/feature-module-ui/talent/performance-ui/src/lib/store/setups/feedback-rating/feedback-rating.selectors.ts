import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IFeedbackRatingState } from './feedback-rating.state';
import { IFeedbackRating } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getFeedbackRatingState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.feedbackRating
);

export const isProcessingFeedbackRating = createSelector(
  getFeedbackRatingState,
  (state: IFeedbackRatingState) => state.isProcessing
);

export const showEditorFeedbackRating = createSelector(
  getFeedbackRatingState,
  (state: IFeedbackRatingState) => state.showEditor
);

export const showViewerFeedbackRating = createSelector(
  getFeedbackRatingState,
  (state: IFeedbackRatingState) => state.showViewer
);

export const getFeedbackRatingData = createSelector(
  getFeedbackRatingState,
  (state: IFeedbackRatingState) => state.feedbackRatingData
);
