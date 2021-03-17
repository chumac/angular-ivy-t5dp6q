import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IEmployeesProfileState } from '../../root';
import { ICustomUserGroupSetupState } from './custom-user-group.state';

const getState = createFeatureSelector<IEmployeesProfileState>('employeesProfile');
const getCustomUserGroupSetupState = createSelector(getState, (state: IEmployeesProfileState) => state.customUserGroupSetup);


export const getDataCustomUserGroupSetup = createSelector(
  getCustomUserGroupSetupState,
  (state: ICustomUserGroupSetupState) => state.data
);

export const isProcessingCustomUserGroupSetup = createSelector(
  getCustomUserGroupSetupState,
  (state: ICustomUserGroupSetupState) => state.isProcessing
);

export const isLoadingCustomUserGroupSetup = createSelector(
  getCustomUserGroupSetupState,
  (state: ICustomUserGroupSetupState) => state.isLoading
);

export const showEditorCustomUserGroupSetup = createSelector(
  getCustomUserGroupSetupState,
  (state: ICustomUserGroupSetupState) => state.showEditor
);

export const showViewerCustomUserGroupSetup = createSelector(
  getCustomUserGroupSetupState,
  (state: ICustomUserGroupSetupState) => state.showViewer
);

export const getCustomUserGroupSetupDocument = createSelector(
  getCustomUserGroupSetupState,
  (state: ICustomUserGroupSetupState) => state.document
);

