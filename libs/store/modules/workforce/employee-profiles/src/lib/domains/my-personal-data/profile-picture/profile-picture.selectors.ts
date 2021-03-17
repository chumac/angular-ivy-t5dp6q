import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IProfilePictureState } from './profile-picture.state';

export const getProfilePictureState = createFeatureSelector<IProfilePictureState>('profilePictureData');

export const isProcessingProfilePicture = createSelector(
  getProfilePictureState,
  (state: IProfilePictureState) => state.isProcessing
);

export const getProfilePicture = createSelector(
  getProfilePictureState,
  (state: IProfilePictureState) => state.approvedEmployeePhoto
);

export const getProfilePictureAwaitingApproval = createSelector(
  getProfilePictureState,
  (state: IProfilePictureState) => state.awaitingApprovalEmployeePhoto
);

export const showEditorProfilePicture = createSelector(
  getProfilePictureState,
  (state: IProfilePictureState) => state.showEditor
);

export const showViewerProfilePicture = createSelector(
  getProfilePictureState,
  (state: IProfilePictureState) => state.showViewer
);
