import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IPerspectiveState } from './perspective.state';
import { IPerspective } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getPerspectiveState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.perspectiveSetup
);

export const isProcessingPerspective = createSelector(
  getPerspectiveState,
  (state: IPerspectiveState) => state.isProcessing
);

export const showEditorPerspective = createSelector(
  getPerspectiveState,
  (state: IPerspectiveState) => state.showEditor
);

export const showViewerPerspective = createSelector(
  getPerspectiveState,
  (state: IPerspectiveState) => state.showViewer
);

export const getPerspectiveData = createSelector(
  getPerspectiveState,
  (state: IPerspectiveState) => state.perspectiveData
);

export const getPerspectiveDocument = createSelector(
  getPerspectiveState,
  (state: IPerspectiveState) => state.document
);
