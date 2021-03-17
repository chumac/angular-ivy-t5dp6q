import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IObjectiveRatingState } from './objective-rating.state';
import { IObjectiveRating } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getObjectiveRatingState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.objectiveRatingSetup
);

export const isProcessingObjectiveRating = createSelector(
  getObjectiveRatingState,
  (state: IObjectiveRatingState) => state.isProcessing
);

export const showEditorObjectiveRating = createSelector(
  getObjectiveRatingState,
  (state: IObjectiveRatingState) => state.showEditor
);

export const showViewerObjectiveRating = createSelector(
  getObjectiveRatingState,
  (state: IObjectiveRatingState) => state.showViewer
);

export const getObjectiveRatingData = createSelector(
  getObjectiveRatingState,
  (state: IObjectiveRatingState) => state.objectiveRatingData
);

export const getObjectiveRatingDocument = createSelector(
  getObjectiveRatingState,
  (state: IObjectiveRatingState) => state.document
);
