import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILoadObjectivesState } from './load-objectives.state';
import { IPerformanceState, getPerformanceState } from '../../root/performance.state';

 // export const getPerformanceState = createFeatureSelector<IPerformanceState>('performance');


export const getLoadObjectivesState = createSelector(
    getPerformanceState,
    (state: IPerformanceState) => state.loadObjectives
);


export const showEditorLoadObjectives = createSelector(
  getLoadObjectivesState,
  (state: ILoadObjectivesState) => state.showEditor
);

export const showViewerLoadObjectives = createSelector(
  getLoadObjectivesState,
  (state: ILoadObjectivesState) => state.showViewer
);

export const isProcessingLoadObjectives = createSelector(
  getLoadObjectivesState,
  (state: ILoadObjectivesState) => state.isProcessing
);

export const isProcessingDataGridLoadObjectives = createSelector(
  getLoadObjectivesState,
  (state: ILoadObjectivesState) => state.isProcessingDataGrid
);

export const objectiveExistsLoadObjectives = createSelector(
  getLoadObjectivesState,
  (state: ILoadObjectivesState) => state.objectiveExists
);

export const getLoadObjectivesPlanList = createSelector(
  getLoadObjectivesState,
  (state: ILoadObjectivesState) => state.planlist
);

export const getLoadObjectivesObjectiveData = createSelector(
  getLoadObjectivesState,
  (state: ILoadObjectivesState) => state.objectiveData
);

export const isValidatingLoadObjectives = createSelector(
  getLoadObjectivesState,
  (state: ILoadObjectivesState) => state.isValidating
);

export const isImportingLoadObjectives = createSelector(
  getLoadObjectivesState,
  (state: ILoadObjectivesState) => state.isImporting
);

export const validateBtnLoadObjectives = createSelector(
  getLoadObjectivesState,
  (state: ILoadObjectivesState) => state.validateBtn
);

export const importBtnLoadObjectives = createSelector(
  getLoadObjectivesState,
  (state: ILoadObjectivesState) => state.importBtn
);

export const resetBtnLoadObjectives = createSelector(
  getLoadObjectivesState,
  (state: ILoadObjectivesState) => state.resetBtn
);

export const selectBtnLoadObjectives = createSelector(
  getLoadObjectivesState,
  (state: ILoadObjectivesState) => state.selectBtn
);

export const hasIssuesLoadObjectives = createSelector(
  getLoadObjectivesState,
  (state: ILoadObjectivesState) => state.hasIssues
);
