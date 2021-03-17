import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ISeparationReasonSetupState } from './separation-reason.state';
import { IEmployeesProfileState, getEmployeesProfileState } from '../../root';

export const getSeparationReasonSetupState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.separationReasonSetup
);

export const isProcessingSeparationReasonSetup = createSelector(
  getSeparationReasonSetupState,
  (state: ISeparationReasonSetupState) => state.isProcessing
);

export const showEditorSeparationReasonSetup = createSelector(
  getSeparationReasonSetupState,
  (state: ISeparationReasonSetupState) => state.showEditor
);

export const showViewerSeparationReasonSetup = createSelector(
  getSeparationReasonSetupState,
  (state: ISeparationReasonSetupState) => state.showViewer
);

export const getSeparationReasonSetupData = createSelector(
  getSeparationReasonSetupState,
  (state: ISeparationReasonSetupState) => state.data
);

export const isLoadingSeparationReasonSetup = createSelector(
  getSeparationReasonSetupState,
  (state: ISeparationReasonSetupState) => state.isLoading
);

