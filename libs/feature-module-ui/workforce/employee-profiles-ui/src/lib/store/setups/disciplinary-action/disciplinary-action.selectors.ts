import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IDisciplinaryActionSetupState } from './disciplinary-action.state';
import { IEmployeesProfileState, getEmployeesProfileState } from '../../root';

export const getDisciplinaryActionSetupState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.disciplinaryActionSetup
);

export const isProcessingDisciplinaryActionSetup = createSelector(
  getDisciplinaryActionSetupState,
  (state: IDisciplinaryActionSetupState) => state.isProcessing
);

export const showEditorDisciplinaryActionSetup = createSelector(
  getDisciplinaryActionSetupState,
  (state: IDisciplinaryActionSetupState) => state.showEditor
);

export const showViewerDisciplinaryActionSetup = createSelector(
  getDisciplinaryActionSetupState,
  (state: IDisciplinaryActionSetupState) => state.showViewer
);

export const getDisciplinaryActionSetupData = createSelector(
  getDisciplinaryActionSetupState,
  (state: IDisciplinaryActionSetupState) => state.data
);

export const getDisciplinaryActionSetupDocument = createSelector(
  getDisciplinaryActionSetupState,
  (state: IDisciplinaryActionSetupState) => state.isLoading
);

