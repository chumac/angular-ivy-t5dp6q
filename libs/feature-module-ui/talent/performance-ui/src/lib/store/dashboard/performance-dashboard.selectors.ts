import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IPerformanceDashboardState } from './performance-dashboard.state';
import { getPerformanceState, IPerformanceState } from '../root/performance.state';

export const getPerformanceDashboardState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.performanceDashboard
);

export const isProcessingPerformanceDashboard = createSelector(
  getPerformanceDashboardState,
  (state: IPerformanceDashboardState) => state.isProcessing
);

export const getPerformanceDashboardMasters = createSelector(
  getPerformanceDashboardState,
  (state: IPerformanceDashboardState) => state.masters
);

export const getPerformanceDashboardObjectives = createSelector(
  getPerformanceDashboardState,
  (state: IPerformanceDashboardState) => state.objectives
);

export const isProcessingTeamPerformanceDashboard = createSelector(
  getPerformanceDashboardState,
  (state: IPerformanceDashboardState) => state.isProcessingTeam
);

export const getPerformanceDashboardTeamMasters = createSelector(
  getPerformanceDashboardState,
  (state: IPerformanceDashboardState) => state.teamMasters
);

export const getPerformanceDashboardTeamObjectives = createSelector(
  getPerformanceDashboardState,
  (state: IPerformanceDashboardState) => state.teamObjectives
);

export const getPerformanceDashboardCurrentPlan = createSelector(
  getPerformanceDashboardState,
  (state: IPerformanceDashboardState) => state.currentPlan
);
