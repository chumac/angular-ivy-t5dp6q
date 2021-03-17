import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IPlanOptionState } from './plan-option.state';
import { IPlanOption } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getPlanOptionState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.planOptionSetup
);

export const isProcessingPlanOption = createSelector(
  getPlanOptionState,
  (state: IPlanOptionState) => state.isProcessing
);

export const showEditorPlanOption = createSelector(
  getPlanOptionState,
  (state: IPlanOptionState) => state.showEditor
);

export const showViewerPlanOption = createSelector(
  getPlanOptionState,
  (state: IPlanOptionState) => state.showViewer
);

export const getPlanOptionData = createSelector(
  getPlanOptionState,
  (state: IPlanOptionState) => state.planOptionData
);

export const getPlanListPlanOption = createSelector(
  getPlanOptionState,
  (state: IPlanOptionState) => state.planList
);

export const getPlanOptionDocument = createSelector(
  getPlanOptionState,
  (state: IPlanOptionState) => state.document
);
