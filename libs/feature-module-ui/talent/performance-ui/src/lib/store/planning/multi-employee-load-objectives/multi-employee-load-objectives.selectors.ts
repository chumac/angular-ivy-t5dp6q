import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IMultiEmployeeLoadObjectivesState } from './multi-employee-load-objectives.state';
import { IPerformanceState, getPerformanceState } from '../../root/performance.state';

 // export const getPerformanceState = createFeatureSelector<IPerformanceState>('performance');


export const getMultiEmployeeLoadObjectivesState = createSelector(
    getPerformanceState,
    (state: IPerformanceState) => state.multiEmployeeLoadObjectives
);


export const showEditorMultiEmployeeLoadObjectives = createSelector(
  getMultiEmployeeLoadObjectivesState,
  (state: IMultiEmployeeLoadObjectivesState) => state.showEditor
);

export const showViewerMultiEmployeeLoadObjectives = createSelector(
  getMultiEmployeeLoadObjectivesState,
  (state: IMultiEmployeeLoadObjectivesState) => state.showViewer
);

export const isProcessingMultiEmployeeLoadObjectives = createSelector(
  getMultiEmployeeLoadObjectivesState,
  (state: IMultiEmployeeLoadObjectivesState) => state.isProcessing
);

export const isProcessingDataGridMultiEmployeeLoadObjectives = createSelector(
  getMultiEmployeeLoadObjectivesState,
  (state: IMultiEmployeeLoadObjectivesState) => state.isProcessingDataGrid
);

export const objectiveExistsMultiEmployeeLoadObjectives = createSelector(
  getMultiEmployeeLoadObjectivesState,
  (state: IMultiEmployeeLoadObjectivesState) => state.objectiveExists
);

export const getMultiEmployeeLoadObjectivesPlanList = createSelector(
  getMultiEmployeeLoadObjectivesState,
  (state: IMultiEmployeeLoadObjectivesState) => state.planlist
);

export const getMultiEmployeeLoadObjectivesObjectiveData = createSelector(
  getMultiEmployeeLoadObjectivesState,
  (state: IMultiEmployeeLoadObjectivesState) => state.objectiveData
);

export const isValidatingMultiEmployeeLoadObjectives = createSelector(
  getMultiEmployeeLoadObjectivesState,
  (state: IMultiEmployeeLoadObjectivesState) => state.isValidating
);

export const isImportingMultiEmployeeLoadObjectives = createSelector(
  getMultiEmployeeLoadObjectivesState,
  (state: IMultiEmployeeLoadObjectivesState) => state.isImporting
);

export const validateBtnMultiEmployeeLoadObjectives = createSelector(
  getMultiEmployeeLoadObjectivesState,
  (state: IMultiEmployeeLoadObjectivesState) => state.validateBtn
);

export const importBtnMultiEmployeeLoadObjectives = createSelector(
  getMultiEmployeeLoadObjectivesState,
  (state: IMultiEmployeeLoadObjectivesState) => state.importBtn
);

export const resetBtnMultiEmployeeLoadObjectives = createSelector(
  getMultiEmployeeLoadObjectivesState,
  (state: IMultiEmployeeLoadObjectivesState) => state.resetBtn
);

export const selectBtnMultiEmployeeLoadObjectives = createSelector(
  getMultiEmployeeLoadObjectivesState,
  (state: IMultiEmployeeLoadObjectivesState) => state.selectBtn
);

export const hasIssuesMultiEmployeeLoadObjectives = createSelector(
  getMultiEmployeeLoadObjectivesState,
  (state: IMultiEmployeeLoadObjectivesState) => state.hasIssues
);
