import { createSelector } from '@ngrx/store';
import { IHrReboardProfilePictureState } from './hr-reboard-profile-picture.state';
import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';

export const getHrReboardProfilePictureState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.hrReboardProfilePicture
);

export const isProcessingHrReboardProfilePicture = createSelector(
  getHrReboardProfilePictureState,
  (state: IHrReboardProfilePictureState) => state.isProcessing
);

export const getHrReboardProfilePicture = createSelector(
  getHrReboardProfilePictureState,
  (state: IHrReboardProfilePictureState) => state.employeePhoto
);

export const showEditorHrReboardProfilePicture = createSelector(
  getHrReboardProfilePictureState,
  (state: IHrReboardProfilePictureState) => state.showEditor
);

export const showViewerHrReboardProfilePicture = createSelector(
  getHrReboardProfilePictureState,
  (state: IHrReboardProfilePictureState) => state.showViewer
);
