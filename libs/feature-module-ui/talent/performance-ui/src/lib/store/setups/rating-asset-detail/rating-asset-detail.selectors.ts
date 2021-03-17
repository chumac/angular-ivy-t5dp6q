import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IRatingAssetDetailState } from './rating-asset-detail.state';
import { IRatingAssetDetail } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getRatingAssetDetailState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.ratingAssetDetailSetup
);

export const isProcessingRatingAssetDetail = createSelector(
  getRatingAssetDetailState,
  (state: IRatingAssetDetailState) => state.isProcessing
);

export const showEditorRatingAssetDetail = createSelector(
  getRatingAssetDetailState,
  (state: IRatingAssetDetailState) => state.showEditor
);

export const showViewerRatingAssetDetail = createSelector(
  getRatingAssetDetailState,
  (state: IRatingAssetDetailState) => state.showViewer
);

export const getRatingAssetDetailData = createSelector(
  getRatingAssetDetailState,
  (state: IRatingAssetDetailState) => state.ratingAssetDetailData
);

export const getRatingAssetDetailRatingTable = createSelector(
  getRatingAssetDetailState,
  (state: IRatingAssetDetailState) => state.ratingTableData
);

export const getRatingAssetDetailDocument = createSelector(
  getRatingAssetDetailState,
  (state: IRatingAssetDetailState) => state.document
);
