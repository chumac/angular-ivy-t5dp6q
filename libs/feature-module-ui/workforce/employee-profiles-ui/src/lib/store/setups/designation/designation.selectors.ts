import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IDesignationSetupState } from './designation.state';
import { IEmployeesProfileState, getEmployeesProfileState } from '../../root';

export const getDesignationSetupState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.designationSetup
);

export const isProcessingDesignationSetup = createSelector(
  getDesignationSetupState,
  (state: IDesignationSetupState) => state.isProcessing
);

export const isLoadingDesignationSetup = createSelector(
  getDesignationSetupState,
  (state: IDesignationSetupState) => state.isLoading
);

export const showEditorDesignationSetup = createSelector(
  getDesignationSetupState,
  (state: IDesignationSetupState) => state.showEditor
);

export const showViewerDesignationSetup = createSelector(
  getDesignationSetupState,
  (state: IDesignationSetupState) => state.showViewer
);

export const getDesignationSetupData = createSelector(
  getDesignationSetupState,
  (state: IDesignationSetupState) => state.data
);

export const getAwaitingDesignationSetupData = createSelector(
  getDesignationSetupState,
  (state: IDesignationSetupState) => state.awaitingData
);

export const getPositionSelectOptionDesignationSetup = createSelector(
  getDesignationSetupState,
  (state: IDesignationSetupState) => state.positions
);

