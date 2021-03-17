import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IEmployeesProfileState } from '../../root';
import { ICustomUserGroupState } from './custom-user-group.state';

const getState = createFeatureSelector<IEmployeesProfileState>('employeesProfile');
const getCustomUserGroupState = createSelector(getState, (state: IEmployeesProfileState) => state.customUserGroup);


export const getApprovedDataCustomUserGroup = createSelector(
  getCustomUserGroupState,
  (state: ICustomUserGroupState) => state.approvedData
);

export const getAwaitingApprovalDataCustomUserGroup = createSelector(
  getCustomUserGroupState,
  (state: ICustomUserGroupState) => state.awaitingApprovalData
);

export const getCustomGroupsCustomUserGroup = createSelector(
  getCustomUserGroupState,
  (state: ICustomUserGroupState) => state.customGroups
);

export const getValuesCustomUserGroup = createSelector(
  getCustomUserGroupState,
  (state: ICustomUserGroupState) => state.values
);

export const isProcessingCustomUserGroup = createSelector(
  getCustomUserGroupState,
  (state: ICustomUserGroupState) => state.isProcessing
);

export const showEditorCustomUserGroup = createSelector(
  getCustomUserGroupState,
  (state: ICustomUserGroupState) => state.showEditor
);

export const showViewerCustomUserGroup = createSelector(
  getCustomUserGroupState,
  (state: ICustomUserGroupState) => state.showViewer
);

export const getCustomUserGroupDocument = createSelector(
  getCustomUserGroupState,
  (state: ICustomUserGroupState) => state.document
);

