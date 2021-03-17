import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILibraryLoadObjectivesState } from './library-load-objectives.state';
import { IPerformanceState, getPerformanceState } from '../../root/performance.state';

 // export const getPerformanceState = createFeatureSelector<IPerformanceState>('performance');


export const getLibraryLoadObjectivesState = createSelector(
    getPerformanceState,
    (state: IPerformanceState) => state.libraryLoadObjectives
);

export const getLibraryObjectiveData = createSelector(
  getLibraryLoadObjectivesState,
  (state: ILibraryLoadObjectivesState) => state.libraryObjectivesData
);

export const getLibraryPlanList = createSelector(
  getLibraryLoadObjectivesState,
  (state: ILibraryLoadObjectivesState) => state.planlist
);

export const libraryObjectiveExists = createSelector(
  getLibraryLoadObjectivesState,
  (state: ILibraryLoadObjectivesState) => state.libraryObjectiveExists
);

export const showEditorLibraryLoadObjectives = createSelector(
  getLibraryLoadObjectivesState,
  (state: ILibraryLoadObjectivesState) => state.showLibraryEditor
);

export const showViewerLibraryLoadObjectives = createSelector(
  getLibraryLoadObjectivesState,
  (state: ILibraryLoadObjectivesState) => state.showLibraryViewer
);

export const isProcessingLibraryLoadObjectives = createSelector(
  getLibraryLoadObjectivesState,
  (state: ILibraryLoadObjectivesState) => state.isProcessing
);

export const isProcessingDataGridLibraryLoadObjectives = createSelector(
  getLibraryLoadObjectivesState,
  (state: ILibraryLoadObjectivesState) => state.isProcessingDataGrid
);


export const isValidatingLibraryLoadObjectives = createSelector(
  getLibraryLoadObjectivesState,
  (state: ILibraryLoadObjectivesState) => state.isValidating
);

export const isImportingLibraryLoadObjectives = createSelector(
  getLibraryLoadObjectivesState,
  (state: ILibraryLoadObjectivesState) => state.isImporting
);

export const validateBtnLibraryLoadObjectives = createSelector(
  getLibraryLoadObjectivesState,
  (state: ILibraryLoadObjectivesState) => state.validateBtn
);

export const importBtnLibraryLoadObjectives = createSelector(
  getLibraryLoadObjectivesState,
  (state: ILibraryLoadObjectivesState) => state.importBtn
);

export const resetBtnLibraryLoadObjectives = createSelector(
  getLibraryLoadObjectivesState,
  (state: ILibraryLoadObjectivesState) => state.resetBtn
);

export const hasIssuesLibraryLoadObjectives = createSelector(
  getLibraryLoadObjectivesState,
  (state: ILibraryLoadObjectivesState) => state.hasIssues
);

export const selectBtnLibraryLoadObjectives = createSelector(
  getLibraryLoadObjectivesState,
  (state: ILibraryLoadObjectivesState) => state.selectBtn
);

export const getPerspectListLibraryLoadObjectives = createSelector(
  getLibraryLoadObjectivesState,
  (state: ILibraryLoadObjectivesState) => state.perspectiveList
);

export const getAnalysisListLibraryLoadObjectives = createSelector(
  getLibraryLoadObjectivesState,
  (state: ILibraryLoadObjectivesState) => state.analysisList
);

export const getAnalysisDetListLibraryLoadObjectives = createSelector(
  getLibraryLoadObjectivesState,
  (state: ILibraryLoadObjectivesState) => state.analysisDetList
);

export const getPositionListLibraryLoadObjectives = createSelector(
  getLibraryLoadObjectivesState,
  (state: ILibraryLoadObjectivesState) => state.positionList
);

export const getDesignationListLibraryLoadObjectives = createSelector(
  getLibraryLoadObjectivesState,
  (state: ILibraryLoadObjectivesState) => state.designationList
);

export const getGradeListLibraryLoadObjectives = createSelector(
  getLibraryLoadObjectivesState,
  (state: ILibraryLoadObjectivesState) => state.gradeList
);

export const getEmployeeListLibraryLoadObjectives = createSelector(
  getLibraryLoadObjectivesState,
  (state: ILibraryLoadObjectivesState) => state.employeeList
);
