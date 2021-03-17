import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IEmployeesProfileState } from '../../root';
import { ITransferState } from './transfer.state';

const getState = createFeatureSelector<IEmployeesProfileState>('employeesProfile');
const getTransferState = createSelector(getState, (state: IEmployeesProfileState) => state.transfer);


export const getApprovedDirectTransfer = createSelector(
  getTransferState,
  (state: ITransferState) => state.approvedDirect
);

export const getAwaitingDirectTransfer = createSelector(
  getTransferState,
  (state: ITransferState) => state.awaitingDirect
);

export const getImportTransfer = createSelector(
  getTransferState,
  (state: ITransferState) => state.import
);

export const showEditorTransfer = createSelector(
  getTransferState,
  (state: ITransferState) => state.showEditor
);

export const showViewerTransfer = createSelector(
  getTransferState,
  (state: ITransferState) => state.showViewer
);

export const isProcessingTransfer = createSelector(
  getTransferState,
  (state: ITransferState) => state.isProcessing
);

export const isLoadingTransfer = createSelector(
  getTransferState,
  (state: ITransferState) => state.isLoading
);

export const getBatchTransfer = createSelector(
  getTransferState,
  (state: ITransferState) => state.batch
);

export const getStatusTransfer = createSelector(
  getTransferState,
  (state: ITransferState) => state.status
);

export const getPositionTransfer = createSelector(
  getTransferState,
  (state: ITransferState) => state.position
);

export const getDesignationTransfer = createSelector(
  getTransferState,
  (state: ITransferState) => state.designation
);

export const getLocationTransfer = createSelector(
  getTransferState,
  (state: ITransferState) => state.location
);

export const getSpecificTypeTransfer = createSelector(
  getTransferState,
  (state: ITransferState) => state.specificType
);

export const getSpecificStructureTransfer = createSelector(
  getTransferState,
  (state: ITransferState) => state.specificStructure
);

export const getCostCenterTransfer = createSelector(
  getTransferState,
  (state: ITransferState) => state.costCenter
);

export const getStructureTransfer = createSelector(
  getTransferState,
  (state: ITransferState) => state.getStructure
);


export const getCurrentJobTransfer = createSelector(
  getTransferState,
  (state: ITransferState) => state.currentJob
);

export const getTreeRootTransfer = createSelector(
  getTransferState,
  (state: ITransferState) => state.treeRoot
);

export const getPicked = createSelector(
  getTransferState,
  (state: ITransferState) => state.picked
);

export const getTreeDetailsTransfer = createSelector(
  getTransferState,
  (state: ITransferState) => state.treeDetails
);
