import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IPlanState } from './plan.state';
import { IPlan } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getPlanState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.planSetup
);

export const isProcessingPlan = createSelector(
  getPlanState,
  (state: IPlanState) => state.isProcessing
);

export const showEditorPlan = createSelector(
  getPlanState,
  (state: IPlanState) => state.showEditor
);

export const showViewerPlan = createSelector(
  getPlanState,
  (state: IPlanState) => state.showViewer
);

export const getPlanData = createSelector(
  getPlanState,
  (state: IPlanState) => state.planData
);

export const getPlanDocument = createSelector(
  getPlanState,
  (state: IPlanState) => state.document
);

export const getCurrentPlan = createSelector(
  getPlanState,
  (state: IPlanState) => state.currentPlan
);

export const isCurrentPlanReady = createSelector(getCurrentPlan, (data: IPlan) => {
  if (data) {
    return true;
  } else {
    return false;
  }
});
