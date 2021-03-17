import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IImageState } from './image.state';

import { getEmployeesProfileState, IEmployeesProfileState } from '../../root/employees-profile.state';

export const getImageState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.image
);

export const getEmployeePhoto = createSelector(
  getImageState,
  (state: IImageState) => state.employeePhoto
);

export const getEmployeeFilePhoto = createSelector(
  getImageState,
  (state: IImageState) => state.employeeFilePhoto
);

export const isProcessingImage = createSelector(
  getImageState,
  (state: IImageState) => state.isProcessing
);

export const getEmployeePhotoAwaitingApproval = createSelector(
  getImageState,
  (state: IImageState) => state.awaitingApprovalEmployeePhoto
);

export const getReportsToEmployeePhoto = createSelector(
  getImageState,
  (state: IImageState) => state.reportsToEmployeePhoto
);

export const getSignature = createSelector(
  getImageState,
  (state: IImageState) => state.signature
);

export const showEditorEmployeePhoto = createSelector(
  getImageState,
  (state: IImageState) => state.showEditor
);

export const showViewerEmployeePhoto = createSelector(
  getImageState,
  (state: IImageState) => state.showViewer
);
