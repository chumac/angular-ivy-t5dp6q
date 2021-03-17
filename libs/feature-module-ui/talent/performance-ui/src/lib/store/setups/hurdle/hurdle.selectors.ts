import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IHurdleState } from './hurdle.state';
import { IHurdle } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getHurdleState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.hurdleSetup
);

export const isProcessingHurdle = createSelector(
  getHurdleState,
  (state: IHurdleState) => state.isProcessing
);

export const showEditorHurdle = createSelector(
  getHurdleState,
  (state: IHurdleState) => state.showEditor
);

export const showViewerHurdle = createSelector(
  getHurdleState,
  (state: IHurdleState) => state.showViewer
);

export const getHurdleData = createSelector(
  getHurdleState,
  (state: IHurdleState) => state.hurdleData
);

export const getHurdleDocument = createSelector(
  getHurdleState,
  (state: IHurdleState) => state.document
);
