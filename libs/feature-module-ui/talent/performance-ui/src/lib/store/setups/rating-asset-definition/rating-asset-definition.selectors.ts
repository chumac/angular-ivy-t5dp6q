import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IRatingAssetDefinitionState } from './rating-asset-definition.state';
import { IRatingAssetDefinition } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getRatingAssetDefinitionState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.ratingAssetDefinitionSetup
);

export const isProcessingRatingAssetDefinition = createSelector(
  getRatingAssetDefinitionState,
  (state: IRatingAssetDefinitionState) => state.isProcessing
);

export const isLoadingRatingAssetDefinition = createSelector(
  getRatingAssetDefinitionState,
  (state: IRatingAssetDefinitionState) => state.isLoading
);

export const showEditorRatingAssetDefinition = createSelector(
  getRatingAssetDefinitionState,
  (state: IRatingAssetDefinitionState) => state.showEditor
);

export const showViewerRatingAssetDefinition = createSelector(
  getRatingAssetDefinitionState,
  (state: IRatingAssetDefinitionState) => state.showViewer
);

export const getRatingAssetDefinitionData = createSelector(
  getRatingAssetDefinitionState,
  (state: IRatingAssetDefinitionState) => state.ratingAssetDefinitionData
);

export const getRatingAssetDefinitionDocument = createSelector(
  getRatingAssetDefinitionState,
  (state: IRatingAssetDefinitionState) => state.document
);

export const getRatingAssetDefinitionPageList = createSelector(
  getRatingAssetDefinitionState,
  (state: IRatingAssetDefinitionState) => state.pageList
);
