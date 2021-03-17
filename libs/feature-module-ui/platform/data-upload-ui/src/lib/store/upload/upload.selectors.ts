import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IUploadState } from './upload.state';
import { IDataUploadState } from '../root';


const getState = createFeatureSelector<IDataUploadState>('data-upload');
const getUploadState = createSelector(getState, (state: IDataUploadState) => state.upload);

export const getUpload = createSelector(
  getUploadState,
  (state: IUploadState) => state.dataUpload
);

export const getTemplate = createSelector(
  getUploadState,
  (state: IUploadState) => state.templateData
);

export const showEditorUpload = createSelector(
  getUploadState,
  (state: IUploadState) => state.showEditor
);

export const showViewerUpload = createSelector(
  getUploadState,
  (state: IUploadState) => state.showViewer
);

export const isProcessingUpload = createSelector(
  getUploadState,
  (state: IUploadState) => state.isProcessing
);

export const isLoadingUpload = createSelector(
  getUploadState,
  (state: IUploadState) => state.isLoading
);

export const getDestination = createSelector(
  getUploadState,
  (state: IUploadState) => state.destination
);

export const getStatus = createSelector(
  getUploadState,
  (state: IUploadState) => state.status
);

export const getCurrentStatus = createSelector(
  getUploadState,
  (state: IUploadState) => state.currentStatus
);

export const getUploadStatus = createSelector(
  getUploadState,
  (state: IUploadState) => state.uploadStatus
);
