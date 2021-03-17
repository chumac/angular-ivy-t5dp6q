import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IContractPageDefinitionState } from './contract-page-definition.state';
import { IContractPageDefinition } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getContractPageDefinitionState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.contractPageDefinitionSetup
);

export const isProcessingContractPageDefinition = createSelector(
  getContractPageDefinitionState,
  (state: IContractPageDefinitionState) => state.isProcessing
);

export const showEditorContractPageDefinition = createSelector(
  getContractPageDefinitionState,
  (state: IContractPageDefinitionState) => state.showEditor
);

export const showViewerContractPageDefinition = createSelector(
  getContractPageDefinitionState,
  (state: IContractPageDefinitionState) => state.showViewer
);

export const getContractPageDefinitionData = createSelector(
  getContractPageDefinitionState,
  (state: IContractPageDefinitionState) => state.contractPageDefinitionData
);

export const getContractPageDefinitionDocument = createSelector(
  getContractPageDefinitionState,
  (state: IContractPageDefinitionState) => state.document
);

export const getContractPageListContractPageDefinition = createSelector(
  getContractPageDefinitionState,
  (state: IContractPageDefinitionState) => state.contractPagesList
);
