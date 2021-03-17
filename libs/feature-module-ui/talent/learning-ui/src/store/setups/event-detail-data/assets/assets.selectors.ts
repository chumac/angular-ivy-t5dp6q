import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IAssetsState } from './assets.state';
import { getLearningState, ILearningState } from '../../../root/learning.state';

export const getAssetsState = createSelector(
  getLearningState,
  (state: ILearningState) => state.eventAssets
);

export const getAssetsData = createSelector(
  getAssetsState,
  (state: IAssetsState) => state.AssetsData
);

export const getDocumentAssetsData = createSelector(
  getAssetsState,
  (state: IAssetsState) => state.document
);

export const getAssetsAvailableData = createSelector(
  getAssetsState,
  (state: IAssetsState) => state.assetsAvailableData
);

export const getAssetsType = createSelector(
  getAssetsState,
  (state: IAssetsState) => state.assetsType
);

export const isProcessingAssets = createSelector(
  getAssetsState,
  (state: IAssetsState) => state.isProcessing
);

export const showEditorAssets = createSelector(
  getAssetsState,
  (state: IAssetsState) => state.showEditor
);

export const showViewerAssets = createSelector(
  getAssetsState,
  (state: IAssetsState) => state.showViewer
);