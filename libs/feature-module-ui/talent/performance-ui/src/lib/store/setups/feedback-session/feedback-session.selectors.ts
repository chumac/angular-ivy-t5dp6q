import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IFeedbackSessionState } from './feedback-session.state';
import { IFeedbackSession } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getFeedbackSessionState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.feedbackSession
);

export const isProcessingFeedbackSession = createSelector(
  getFeedbackSessionState,
  (state: IFeedbackSessionState) => state.isProcessing
);

export const showEditorFeedbackSession = createSelector(
  getFeedbackSessionState,
  (state: IFeedbackSessionState) => state.showEditor
);

export const showViewerFeedbackSession = createSelector(
  getFeedbackSessionState,
  (state: IFeedbackSessionState) => state.showViewer
);

export const getFeedbackSessionData = createSelector(
  getFeedbackSessionState,
  (state: IFeedbackSessionState) => state.feedbackSessionData
);

export const getPlanListFeedbackSession = createSelector(
  getFeedbackSessionState,
  (state: IFeedbackSessionState) => state.planList
);

export const getFeedbackSessionDocument = createSelector(
  getFeedbackSessionState,
  (state: IFeedbackSessionState) => state.document
);
