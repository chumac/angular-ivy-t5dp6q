import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ISingleEmployeeLoadObjectivesState } from './single-employee-load-objectives.state';
import { IPerformanceState, getPerformanceState } from '../../root/performance.state';

 // export const getPerformanceState = createFeatureSelector<IPerformanceState>('performance');


export const getSingleEmployeeLoadObjectivesState = createSelector(
    getPerformanceState,
    (state: IPerformanceState) => state.singleEmployeeLoadObjectives
);

export const getSingleEmployeeObjectiveData = createSelector(
  getSingleEmployeeLoadObjectivesState,
  (state: ISingleEmployeeLoadObjectivesState) => state.singleEmployeeObjectivesData
);

export const getSingleEmployeePlanList = createSelector(
  getSingleEmployeeLoadObjectivesState,
  (state: ISingleEmployeeLoadObjectivesState) => state.planlist
);

export const getSingleLoadEmployeeList = createSelector(
  getSingleEmployeeLoadObjectivesState,
  (state: ISingleEmployeeLoadObjectivesState) => state.employeeList
);

export const singleEmployeeObjectiveExists = createSelector(
  getSingleEmployeeLoadObjectivesState,
  (state: ISingleEmployeeLoadObjectivesState) => state.singleEmployeeObjectiveExists
);

export const showEditorSingleEmployeeLoadObjectives = createSelector(
  getSingleEmployeeLoadObjectivesState,
  (state: ISingleEmployeeLoadObjectivesState) => state.showSingleEmployeeEditor
);

export const showViewerSingleEmployeeLoadObjectives = createSelector(
  getSingleEmployeeLoadObjectivesState,
  (state: ISingleEmployeeLoadObjectivesState) => state.showSingleEmployeeViewer
);

export const isProcessingSingleEmployeeLoadObjectives = createSelector(
  getSingleEmployeeLoadObjectivesState,
  (state: ISingleEmployeeLoadObjectivesState) => state.isProcessing
);

export const isProcessingDataGridSingleEmployeeLoadObjectives = createSelector(
  getSingleEmployeeLoadObjectivesState,
  (state: ISingleEmployeeLoadObjectivesState) => state.isProcessingDataGrid
);


export const isValidatingSingleEmployeeLoadObjectives = createSelector(
  getSingleEmployeeLoadObjectivesState,
  (state: ISingleEmployeeLoadObjectivesState) => state.isValidating
);

export const isImportingSingleEmployeeLoadObjectives = createSelector(
  getSingleEmployeeLoadObjectivesState,
  (state: ISingleEmployeeLoadObjectivesState) => state.isImporting
);

export const validateBtnSingleEmployeeLoadObjectives = createSelector(
  getSingleEmployeeLoadObjectivesState,
  (state: ISingleEmployeeLoadObjectivesState) => state.validateBtn
);

export const importBtnSingleEmployeeLoadObjectives = createSelector(
  getSingleEmployeeLoadObjectivesState,
  (state: ISingleEmployeeLoadObjectivesState) => state.importBtn
);

export const resetBtnSingleEmployeeLoadObjectives = createSelector(
  getSingleEmployeeLoadObjectivesState,
  (state: ISingleEmployeeLoadObjectivesState) => state.resetBtn
);

export const hasIssuesSingleEmployeeLoadObjectives = createSelector(
  getSingleEmployeeLoadObjectivesState,
  (state: ISingleEmployeeLoadObjectivesState) => state.hasIssues
);

export const selectBtnSingleEmployeeLoadObjectives = createSelector(
  getSingleEmployeeLoadObjectivesState,
  (state: ISingleEmployeeLoadObjectivesState) => state.selectBtn
);


