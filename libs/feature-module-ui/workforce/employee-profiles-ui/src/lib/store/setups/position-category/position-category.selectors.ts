import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IPositionCategorySetupState } from './position-category.state';
import { IEmployeesProfileState, getEmployeesProfileState } from '../../root';

export const getPositionCategorySetupState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.positionCategorySetup
);

export const isProcessingPositionCategorySetup = createSelector(
  getPositionCategorySetupState,
  (state: IPositionCategorySetupState) => state.isProcessing
);

export const isLoadingPositionCategorySetup = createSelector(
  getPositionCategorySetupState,
  (state: IPositionCategorySetupState) => state.isLoading
);

export const showEditorPositionCategorySetup = createSelector(
  getPositionCategorySetupState,
  (state: IPositionCategorySetupState) => state.showEditor
);

export const showViewerPositionCategorySetup = createSelector(
  getPositionCategorySetupState,
  (state: IPositionCategorySetupState) => state.showViewer
);

export const getPositionCategorySetupData = createSelector(
  getPositionCategorySetupState,
  (state: IPositionCategorySetupState) => state.data
);

export const getPositionCategorySetupDocument = createSelector(
  getPositionCategorySetupState,
  (state: IPositionCategorySetupState) => state.document
);

