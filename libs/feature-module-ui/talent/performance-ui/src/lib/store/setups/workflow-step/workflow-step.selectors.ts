import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IWorkflowStepState } from './workflow-step.state';
import { IWorkflowStep } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getWorkflowStepState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.workflowStepSetup
);

export const isProcessingWorkflowStep = createSelector(
  getWorkflowStepState,
  (state: IWorkflowStepState) => state.isProcessing
);

export const showEditorWorkflowStep = createSelector(
  getWorkflowStepState,
  (state: IWorkflowStepState) => state.showEditor
);

export const showViewerWorkflowStep = createSelector(
  getWorkflowStepState,
  (state: IWorkflowStepState) => state.showViewer
);

export const getWorkflowStepData = createSelector(
  getWorkflowStepState,
  (state: IWorkflowStepState) => state.workflowStepData
);

export const getDefinitionWorkflowStepData = createSelector(
  getWorkflowStepState,
  (state: IWorkflowStepState) => state.workflowDefList
);

export const getWorkflowStepDocument = createSelector(
  getWorkflowStepState,
  (state: IWorkflowStepState) => state.document
);
