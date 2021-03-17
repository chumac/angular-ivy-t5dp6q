import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IWorkflowMapState } from './workflow-map.state';
import { IHRFoundationState } from '../root';

const getState = createFeatureSelector<IHRFoundationState>('hr-foundations');
const getWorkflowMapState = createSelector(getState, (state: IHRFoundationState) => state.workFlowMap);

export const isProcessingWorkflowMap = createSelector(
  getWorkflowMapState,
  (state: IWorkflowMapState) => state.isProcessing
);

export const showEditorWorkflowMap = createSelector(
  getWorkflowMapState,
  (state: IWorkflowMapState) => state.showEditor
);

export const getEntityData = createSelector(
  getWorkflowMapState,
  (state: IWorkflowMapState) => state.systemData
);


export const getWorkDefinitionData = createSelector(
  getWorkflowMapState,
  (state: IWorkflowMapState) => state.workDefinitionData
);

export const getWorkflowMapApprovedData = createSelector(
  getWorkflowMapState,
  (state: IWorkflowMapState) => state.workFlowMapData
);


