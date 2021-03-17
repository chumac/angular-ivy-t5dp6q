import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILeaveDefinitionState } from './leave-definition.state';

import { IAbsenceState } from '../../root';

export const getStateDefinition = createFeatureSelector<IAbsenceState>('absence');

export const getLeaveDefinitionState = createSelector(getStateDefinition, (state: IAbsenceState) => state.leaveDefinition);

export const isProcessingLeaveDefinition = createSelector(
  getLeaveDefinitionState,
  (state: ILeaveDefinitionState) => state.isProcessing
);

export const isLoadingLeaveDefinition = createSelector(
  getLeaveDefinitionState,
  (state: ILeaveDefinitionState) => state.isLoading
);

export const showEditorLeaveDefinition = createSelector(
  getLeaveDefinitionState,
  (state: ILeaveDefinitionState) => state.showEditor
);

export const showViewerLeaveDefinition = createSelector(
  getLeaveDefinitionState,
  (state: ILeaveDefinitionState) => state.showViewer
);

export const getLeaveDefinitionData = createSelector(
  getLeaveDefinitionState,
  (state: ILeaveDefinitionState) => state.definitionData
);


