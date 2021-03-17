import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IPositionSetupState } from './position.state';
import { IEmployeesProfileState, getEmployeesProfileState } from '../../root';

export const getPositionSetupState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.positionSetup
);

export const isProcessingPositionSetup = createSelector(
  getPositionSetupState,
  (state: IPositionSetupState) => state.isProcessing
);

export const isLoadingPositionSetup = createSelector(
  getPositionSetupState,
  (state: IPositionSetupState) => state.isLoading
);

export const showEditorPositionSetup = createSelector(
  getPositionSetupState,
  (state: IPositionSetupState) => state.showEditor
);

export const showViewerPositionSetup = createSelector(
  getPositionSetupState,
  (state: IPositionSetupState) => state.showViewer
);

export const getApprovedPositionSetupData = createSelector(
  getPositionSetupState,
  (state: IPositionSetupState) => state.approvedData
);

export const getAwaitingPositionSetupData = createSelector(
  getPositionSetupState,
  (state: IPositionSetupState) => state.awaitingData
);

export const getPositionSetupDocument = createSelector(
  getPositionSetupState,
  (state: IPositionSetupState) => state.document
);

export const getSpecificTypePosition = createSelector(
  getPositionSetupState,
  (state: IPositionSetupState) => state.specificType
);

export const getSpecificStructurePosition = createSelector(
  getPositionSetupState,
  (state: IPositionSetupState) => state.specificStructure
);

export const getCostCenterPosition = createSelector(
  getPositionSetupState,
  (state: IPositionSetupState) => state.costCenter
);

export const getPositionListPosition = createSelector(
  getPositionSetupState,
  (state: IPositionSetupState) => state.positionList
);

export const getGradeListPosition = createSelector(
  getPositionSetupState,
  (state: IPositionSetupState) => state.gradeList
);

export const getPositionCategoryPosition = createSelector(
  getPositionSetupState,
  (state: IPositionSetupState) => state.positionCategory
);

export const getStructurePosition = createSelector(
  getPositionSetupState,
  (state: IPositionSetupState) => state.getStructure
);
