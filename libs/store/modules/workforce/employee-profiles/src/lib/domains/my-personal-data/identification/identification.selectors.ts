import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IIdentificationState } from './identification.state';

export const getIdentificationState = createFeatureSelector<IIdentificationState>('identification');

export const isProcessingIdentification = createSelector(
  getIdentificationState,
  (state: IIdentificationState) => state.isProcessing
);

export const showEditorIdentification = createSelector(
  getIdentificationState,
  (state: IIdentificationState) => state.showEditor
);

export const showViewerIdentification = createSelector(
  getIdentificationState,
  (state: IIdentificationState) => state.showViewer
);

export const getIdentificationApprovedData = createSelector(
  getIdentificationState,
  (state: IIdentificationState) => state.approvedData
);

export const getIdentificationAwaitingApprovalData = createSelector(
  getIdentificationState,
  (state: IIdentificationState) => state.awaitingApprovalData
);

export const getSignatureImage = createSelector(
  getIdentificationState,
  (state: IIdentificationState) => state.signature
);

export const getAwaitingApprovalSignatureImage = createSelector(
  getIdentificationState,
  (state: IIdentificationState) => state.awaitingApprovalSignature
);



