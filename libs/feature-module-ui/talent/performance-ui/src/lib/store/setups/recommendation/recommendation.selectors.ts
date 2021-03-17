import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IRecommendationState } from './recommendation.state';
import { IPerformanceRecommendation } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getRecommendationState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.recommendation
);

export const isProcessingRecommendation = createSelector(
  getRecommendationState,
  (state: IRecommendationState) => state.isProcessing
);

export const showEditorRecommendation = createSelector(
  getRecommendationState,
  (state: IRecommendationState) => state.showEditor
);

export const showViewerRecommendation = createSelector(
  getRecommendationState,
  (state: IRecommendationState) => state.showViewer
);

export const getRecommendationData = createSelector(
  getRecommendationState,
  (state: IRecommendationState) => state.recommendationData
);
