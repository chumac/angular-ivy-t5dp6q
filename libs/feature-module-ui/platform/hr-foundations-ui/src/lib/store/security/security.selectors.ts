import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ISecurityState } from './security.state';
import { IHRFoundationState } from '../root';

const getState = createFeatureSelector<IHRFoundationState>('hr-foundations');
const getSecurityState = createSelector(getState, (state: IHRFoundationState) => state.security);

export const isProcessingSecurity = createSelector(
  getSecurityState,
  (state: ISecurityState) => state.isProcessing
);

export const isLoadingSecurity = createSelector(
  getSecurityState,
  (state: ISecurityState) => state.isLoading
);

export const isLoadingDropdownSecurity = createSelector(
  getSecurityState,
  (state: ISecurityState) => state.isLoadingDropdown
);

export const showEditorSecurity = createSelector(
  getSecurityState,
  (state: ISecurityState) => state.showEditor
);

export const showBulkEditorSecurity = createSelector(
  getSecurityState,
  (state: ISecurityState) => state.showBulkEditor
);

export const showTreeViewSecurity = createSelector(
  getSecurityState,
  (state: ISecurityState) => state.showTreeView
);

export const showViewerSecurity = createSelector(
  getSecurityState,
  (state: ISecurityState) => state.showViewer
);
export const getProcessedSecurityData = createSelector(
  getSecurityState,
  (state: ISecurityState) => state.processedData
);

export const getWaitingSecurityData = createSelector(
  getSecurityState,
  (state: ISecurityState) => state.waitingData
);

export const getIndividualData = createSelector(
  getSecurityState,
  (state: ISecurityState) => state.individual
);

export const getRoleData = createSelector(
  getSecurityState,
  (state: ISecurityState) => state.role
);

export const getUsers = createSelector(
  getSecurityState,
  (state: ISecurityState) => state.users
);

export const getSpecificType = createSelector(
  getSecurityState,
  (state: ISecurityState) => state.specificType
);

export const getSpecificStructure = createSelector(
  getSecurityState,
  (state: ISecurityState) => state.specificStructure
);

export const getSingleAction = createSelector(
  getSecurityState,
  (state: ISecurityState) => state.singleAction
);

export const getBulkAction = createSelector(
  getSecurityState,
  (state: ISecurityState) => state.bulkAction
);

