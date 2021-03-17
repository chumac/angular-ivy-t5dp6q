import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IWorkDefinitionState } from './work-definition.state';
import { IHRFoundationState } from '../root';

const getState = createFeatureSelector<IHRFoundationState>('hr-foundations');
const getWorkDefinitionState = createSelector(getState, (state: IHRFoundationState) => state.workDefinition);




export const isProcessingWorkDefinition = createSelector(
  getWorkDefinitionState,
  (state: IWorkDefinitionState) => state.isProcessing
);

export const isLoadingWorkDefinition = createSelector(
  getWorkDefinitionState,
  (state: IWorkDefinitionState) => state.isLoading
);

export const showEditorWorkDefinition = createSelector(
  getWorkDefinitionState,
  (state: IWorkDefinitionState) => state.showEditor
);

export const showStepWorkDefinition = createSelector(
  getWorkDefinitionState,
  (state: IWorkDefinitionState) => state.showStep
);


export const getWorkDefinitionApprovedData = createSelector(
  getWorkDefinitionState,
  (state: IWorkDefinitionState) => state.workDefinitionData
);

export const getPositionData = createSelector(
  getWorkDefinitionState,
  (state: IWorkDefinitionState) => state.position
);


export const getIndividualData = createSelector(
  getWorkDefinitionState,
  (state: IWorkDefinitionState) => state.individual
);

export const getRoleData = createSelector(
  getWorkDefinitionState,
  (state: IWorkDefinitionState) => state.role
);

export const getSendBack = createSelector(
  getWorkDefinitionState,
  (state: IWorkDefinitionState) => state.sendBack
);


