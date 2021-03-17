import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IGradeManagementState } from './grade.state';
import { IEmployeesProfileState, getEmployeesProfileState } from '../../root';

export const getGradeManagementState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.gradeManagement
);

export const isProcessingGradeManagement = createSelector(
  getGradeManagementState,
  (state: IGradeManagementState) => state.isProcessing
);

export const showEditorGradeManagement = createSelector(
  getGradeManagementState,
  (state: IGradeManagementState) => state.showEditor
);

export const showViewerGradeManagement = createSelector(
  getGradeManagementState,
  (state: IGradeManagementState) => state.showViewer
);

export const getGradeManagementData = createSelector(
  getGradeManagementState,
  (state: IGradeManagementState) => state.data
);

export const getGradeManagementDocument = createSelector(
  getGradeManagementState,
  (state: IGradeManagementState) => state.isLoading
);

