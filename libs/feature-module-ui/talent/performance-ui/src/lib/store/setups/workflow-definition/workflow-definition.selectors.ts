import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IWorkflowDefinitionState } from './workflow-definition.state';
import { IWorkflowDefinition } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getWorkflowDefinitionState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.workflowDefinitionSetup
);

export const isProcessingWorkflowDefinition = createSelector(
  getWorkflowDefinitionState,
  (state: IWorkflowDefinitionState) => state.isProcessing
);

export const showEditorWorkflowDefinition = createSelector(
  getWorkflowDefinitionState,
  (state: IWorkflowDefinitionState) => state.showEditor
);

export const showViewerWorkflowDefinition = createSelector(
  getWorkflowDefinitionState,
  (state: IWorkflowDefinitionState) => state.showViewer
);

export const getWorkflowDefinitionData = createSelector(
  getWorkflowDefinitionState,
  (state: IWorkflowDefinitionState) => state.workflowDefinitionData
);

export const getWorkflowDefinitionDocument = createSelector(
  getWorkflowDefinitionState,
  (state: IWorkflowDefinitionState) => state.document
);

export const getAnalysisListWorkflowDefinition = createSelector(
  getWorkflowDefinitionState,
  (state: IWorkflowDefinitionState) => state.analysisList
);

export const getAnalysisDetListWorkflowDefinition = createSelector(
  getWorkflowDefinitionState,
  (state: IWorkflowDefinitionState) => state.analysisDetList
);

export const getPositionListWorkflowDefinition = createSelector(
  getWorkflowDefinitionState,
  (state: IWorkflowDefinitionState) => state.positionList
);

export const getDesignationListWorkflowDefinition = createSelector(
  getWorkflowDefinitionState,
  (state: IWorkflowDefinitionState) => state.designationList
);

export const getGradeListWorkflowDefinition = createSelector(
  getWorkflowDefinitionState,
  (state: IWorkflowDefinitionState) => state.gradeList
);

export const getEmployeeListWorkflowDefinition = createSelector(
  getWorkflowDefinitionState,
  (state: IWorkflowDefinitionState) => state.employeeList
);
