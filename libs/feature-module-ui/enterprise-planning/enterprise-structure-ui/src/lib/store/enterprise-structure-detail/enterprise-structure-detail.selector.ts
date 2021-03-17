import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IEnterpriseStructureDetailState } from './enterprise-structure-detail.state';
import { IEnterpriseStructureState } from '../root';

const getState = createFeatureSelector<IEnterpriseStructureState>('enterpriseStructure');
const getEnterpriseStructureDetailsState = createSelector(getState, (state: IEnterpriseStructureState) => state.enterpriseStructureDetail);

export const isProcessingEnterpriseStructureDetail = createSelector(
  getEnterpriseStructureDetailsState,
  (state: IEnterpriseStructureDetailState) => state.isProcessing
);

export const showEditorEnterpriseStructureDetail = createSelector(
  getEnterpriseStructureDetailsState,
  (state: IEnterpriseStructureDetailState) => state.showEditor
);

export const showEditorSharedCode = createSelector(
  getEnterpriseStructureDetailsState,
  (state: IEnterpriseStructureDetailState) => state.showSharedCodeEditor
);

export const showEditorConnectEnterpriseStructureDetail = createSelector(
  getEnterpriseStructureDetailsState,
  (state: IEnterpriseStructureDetailState) => state.showEditorConnect
);

export const showEditorConnectChildrenEnterpriseStructureDetail = createSelector(
  getEnterpriseStructureDetailsState,
  (state: IEnterpriseStructureDetailState) => state.showEditorConnectChildren
);

export const showEditorAddCostCentreEnterpriseStructureDetail = createSelector(
  getEnterpriseStructureDetailsState,
  (state: IEnterpriseStructureDetailState) => state.showEditorAddCostCentre
);

export const showEditorRemoveCostCentreEnterpriseStructureDetail = createSelector(
  getEnterpriseStructureDetailsState,
  (state: IEnterpriseStructureDetailState) => state.showEditorRemoveCostCentre
);

export const showMoverEnterpriseStructureDetail = createSelector(
  getEnterpriseStructureDetailsState,
  (state: IEnterpriseStructureDetailState) => state.showMover
);

export const getEnterpriseStructureDetails = createSelector(
  getEnterpriseStructureDetailsState,
  (state: IEnterpriseStructureDetailState) => state.enterpriseStructureDetailList
);

export const getSelectedRows = createSelector(
  getEnterpriseStructureDetailsState,
  (state: IEnterpriseStructureDetailState) => state.selectedRows
);

export const getStructureNameAndId = createSelector(
  getEnterpriseStructureDetailsState,
  (state: IEnterpriseStructureDetailState) => state.structureNameAndId
);

export const getEnterpriseStructureLink = createSelector(
  getEnterpriseStructureDetailsState,
  (state: IEnterpriseStructureDetailState) => state.enterpriseStructureLink
);

export const getCostCentresData = createSelector(
  getEnterpriseStructureDetailsState,
  (state: IEnterpriseStructureDetailState) => state.costCentres
);

export const getByIdCostCentresData = createSelector(
  getEnterpriseStructureDetailsState,
  (state: IEnterpriseStructureDetailState) => state.costCentresById
);

export const getPositionsData = createSelector(
  getEnterpriseStructureDetailsState,
  (state: IEnterpriseStructureDetailState) => state.positionsDataList
);

