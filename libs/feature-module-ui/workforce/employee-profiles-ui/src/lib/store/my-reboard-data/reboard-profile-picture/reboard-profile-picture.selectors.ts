import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IReboardProfilePictureState } from './reboard-profile-picture.state';
import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';

export const getReboardProfilePictureState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.reboardProfilePicture
);

export const isProcessingReboardProfilePicture = createSelector(
  getReboardProfilePictureState,
  (state: IReboardProfilePictureState) => state.isProcessing
);

export const getReboardProfilePicture = createSelector(
  getReboardProfilePictureState,
  (state: IReboardProfilePictureState) => state.employeePhoto
);

export const showEditorReboardProfilePicture = createSelector(
  getReboardProfilePictureState,
  (state: IReboardProfilePictureState) => state.showEditor
);

export const showViewerReboardProfilePicture = createSelector(
  getReboardProfilePictureState,
  (state: IReboardProfilePictureState) => state.showViewer
);
