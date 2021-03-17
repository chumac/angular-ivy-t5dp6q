import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IWorkflowMapAlternateState } from './alt-workflow-map.state';
import { IHRFoundationState } from '../root';

const getState = createFeatureSelector<IHRFoundationState>('hr-foundations');
const getAltWorkflowMapState = createSelector(getState, (state: IHRFoundationState) => state.altWorkFlowMap);

export const isProcessingAltWorkflowMap = createSelector(
   getAltWorkflowMapState,
  (state: IWorkflowMapAlternateState) => state.isProcessing
);

export const isLoadingAltWorkflowMap = createSelector(
   getAltWorkflowMapState,
  (state: IWorkflowMapAlternateState) => state.isLoading
);

export const showEditorAltWorkflowMap = createSelector(
   getAltWorkflowMapState,
  (state: IWorkflowMapAlternateState) => state.showEditor
);

export const getAltWorkflowMapData = createSelector(
   getAltWorkflowMapState,
  (state: IWorkflowMapAlternateState) => state.altWorkMapData
);

export const getSingleAltWorkflowMapData = createSelector(
  getAltWorkflowMapState,
 (state: IWorkflowMapAlternateState) => state.singleMapData
);

export const getEntityData = createSelector(
  getAltWorkflowMapState,
  (state: IWorkflowMapAlternateState) => state.systemData
);

export const getWorkDefinitionData = createSelector(
  getAltWorkflowMapState,
  (state: IWorkflowMapAlternateState) => state.workDefinitionData
);

export const getCostCenter = createSelector(
  getAltWorkflowMapState,
  (state: IWorkflowMapAlternateState) => state.costCenter
);

export const getGrade = createSelector(
  getAltWorkflowMapState,
  (state: IWorkflowMapAlternateState) => state.grade
);

export const getForEmployee = createSelector(
  getAltWorkflowMapState,
  (state: IWorkflowMapAlternateState) => state.forEmployee
);

export const getPosition = createSelector(
  getAltWorkflowMapState,
  (state: IWorkflowMapAlternateState) => state.position
);

export const getPositionCategory = createSelector(
  getAltWorkflowMapState,
  (state: IWorkflowMapAlternateState) => state.positionCategory
);

export const getCategory = createSelector(
  getAltWorkflowMapState,
  (state: IWorkflowMapAlternateState) => state.category
);

export const getDesignation = createSelector(
  getAltWorkflowMapState,
  (state: IWorkflowMapAlternateState) => state.designation
);

export const getStaffGroup = createSelector(
  getAltWorkflowMapState,
  (state: IWorkflowMapAlternateState) => state.staffGroup
);
