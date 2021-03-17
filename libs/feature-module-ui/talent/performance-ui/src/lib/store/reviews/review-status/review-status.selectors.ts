import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IReviewStatusState } from './review-status.state';
import { IPerformanceState } from '../../root';

const getState = createFeatureSelector<IPerformanceState>('performance');
const getReviewStatusState = createSelector(getState, (state: IPerformanceState) => state.reviewStatus);

export const isProcessingReviewStatus = createSelector(
  getReviewStatusState,
  (state: IReviewStatusState) => state.isProcessing
);

export const showViewerReviewStatus = createSelector(
  getReviewStatusState,
  (state: IReviewStatusState) => state.showViewer
);

export const getObjectiveMaster = createSelector(
  getReviewStatusState,
  (state: IReviewStatusState) => state.objectiveMaster
);

export const loadingObjectiveMasterReviewStatus = createSelector(
  getReviewStatusState,
  (state: IReviewStatusState) => state.loadingObjectiveMaster
);

