import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IFeedbackFormsState } from './feedback-forms.state';
import { getLearningState, ILearningState } from '../../../root/learning.state';

export const getFeedbackFormsState = createSelector(
  getLearningState,
  (state: ILearningState) => state.eventFeedbackForms
);

export const getFeedbackFormsData = createSelector(
  getFeedbackFormsState,
  (state: IFeedbackFormsState) => state.FeedbackFormsData
);

export const getCustomFormsData = createSelector(
  getFeedbackFormsState,
  (state: IFeedbackFormsState) => state.CustomFormsData
);

export const getFeedbackFormsAvailableData = createSelector(
  getFeedbackFormsState,
  (state: IFeedbackFormsState) => state.FeedbackFormsAvailabilityData
);

export const getFeedbackFormsRoleData = createSelector(
  getFeedbackFormsState,
  (state: IFeedbackFormsState) => state.FeedbackFormsRoleData
);

export const isProcessingFeedbackForms = createSelector(
  getFeedbackFormsState,
  (state: IFeedbackFormsState) => state.isProcessing
);

export const showEditorFeedbackForms = createSelector(
  getFeedbackFormsState,
  (state: IFeedbackFormsState) => state.showEditor
);

export const showViewerFeedbackForms = createSelector(
  getFeedbackFormsState,
  (state: IFeedbackFormsState) => state.showViewer
);