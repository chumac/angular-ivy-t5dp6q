import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IEnterpriseStructureTypeState } from './enterprise-structure-type.state';
import { IEnterpriseStructureState } from '../root';

const getState = createFeatureSelector<IEnterpriseStructureState>('enterpriseStructure');
const getEnterpriseStructureTypesState = createSelector(getState, (state: IEnterpriseStructureState) => state.enterpriseStructureType);

export const isProcessingEnterpriseStructureType = createSelector(
  getEnterpriseStructureTypesState,
  (state: IEnterpriseStructureTypeState) => state.isProcessing
);

export const isProcessingVirtualLinks = createSelector(
  getEnterpriseStructureTypesState,
  (state: IEnterpriseStructureTypeState) => state.isProcessingVlink
);

export const showEditorEnterpriseStructureType = createSelector(
  getEnterpriseStructureTypesState,
  (state: IEnterpriseStructureTypeState) => state.showEditor
);

export const showEditorVirtualLink = createSelector(
  getEnterpriseStructureTypesState,
  (state: IEnterpriseStructureTypeState) => state.showVLinkEditor
);

export const getEnterpriseStructureTypes = createSelector(
  getEnterpriseStructureTypesState,
  (state: IEnterpriseStructureTypeState) => state.enterpriseStructuretypes
);

export const getTransformedEnterpriseStructureTypes = createSelector(
  getEnterpriseStructureTypesState,
  (state: IEnterpriseStructureTypeState) => state.structureTransformed
);

export const getTransformedKnownTypes = createSelector(
  getEnterpriseStructureTypesState,
  (state: IEnterpriseStructureTypeState) => state.knownTypes
);

export const getVirtualLinks = createSelector(
  getEnterpriseStructureTypesState,
  (state: IEnterpriseStructureTypeState) => state.virtualLinks
);
