import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IDisciplinaryRoleSetupState } from './disciplinary-role.state';
import { IEmployeesProfileState, getEmployeesProfileState } from '../../root';

export const getDisciplinaryRoleSetupState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.disciplinaryRoleSetup
);

export const isProcessingDisciplinaryRoleSetup = createSelector(
  getDisciplinaryRoleSetupState,
  (state: IDisciplinaryRoleSetupState) => state.isProcessing
);

export const isLoadingDisciplinaryRoleSetup = createSelector(
  getDisciplinaryRoleSetupState,
  (state: IDisciplinaryRoleSetupState) => state.isLoading
);

export const showEditorDisciplinaryRoleSetup = createSelector(
  getDisciplinaryRoleSetupState,
  (state: IDisciplinaryRoleSetupState) => state.showEditor
);

export const showViewerDisciplinaryRoleSetup = createSelector(
  getDisciplinaryRoleSetupState,
  (state: IDisciplinaryRoleSetupState) => state.showViewer
);

export const getDisciplinaryRoleSetupData = createSelector(
  getDisciplinaryRoleSetupState,
  (state: IDisciplinaryRoleSetupState) => state.data
);

