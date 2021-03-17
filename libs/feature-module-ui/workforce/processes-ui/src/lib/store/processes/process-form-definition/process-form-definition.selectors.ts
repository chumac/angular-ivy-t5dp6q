import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IProcessFormDefinitionState } from './process-form-definition.state';
import { getProcessesState, IProcessesState } from '../../root/processes.state';

export const getProcessFormDefinitionState = createSelector(
  getProcessesState,
  (state: IProcessesState) => state.processFormDefinition
);

export const isProcessingProcessFormDefinition = createSelector(
  getProcessFormDefinitionState,
  (state: IProcessFormDefinitionState) => state.isProcessing
);

export const showEditorProcessFormDefinition = createSelector(
  getProcessFormDefinitionState,
  (state: IProcessFormDefinitionState) => state.showEditor
);

export const showViewerProcessFormDefinition = createSelector(
  getProcessFormDefinitionState,
  (state: IProcessFormDefinitionState) => state.showViewer
);

export const getProcessFormDefinitionData = createSelector(
  getProcessFormDefinitionState,
  (state: IProcessFormDefinitionState) => state.processFormDefinitionData
);

export const getProcessFormArea = createSelector(
  getProcessFormDefinitionState,
  (state: IProcessFormDefinitionState) => state.area
);
