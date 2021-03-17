import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILineManagerState } from './line-manager.state';
import { ILineManager } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getLineManagerState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.lineManagerSetup
);

export const isProcessingLineManager = createSelector(
  getLineManagerState,
  (state: ILineManagerState) => state.isProcessing
);

export const isProcessingGridLineManager = createSelector(
  getLineManagerState,
  (state: ILineManagerState) => state.isProcessingGrid
);

export const showEditorLineManager = createSelector(
  getLineManagerState,
  (state: ILineManagerState) => state.showEditor
);

export const showViewerLineManager = createSelector(
  getLineManagerState,
  (state: ILineManagerState) => state.showViewer
);

export const getLineManagerData = createSelector(
  getLineManagerState,
  (state: ILineManagerState) => state.lineManagerData
);

export const getLineManagerDocument = createSelector(
  getLineManagerState,
  (state: ILineManagerState) => state.document
);

export const getLineManagerPlanList = createSelector(
  getLineManagerState,
  (state: ILineManagerState) => state.planList
);

export const getLineManagerEmployeeList = createSelector(
  getLineManagerState,
  (state: ILineManagerState) => state.employeeList
);