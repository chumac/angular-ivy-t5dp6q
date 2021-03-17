import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IRefereeState } from './referee.state';

export const getRefereeState = createFeatureSelector<IRefereeState>('personalReferees');

export const isProcessingReferee = createSelector(
  getRefereeState,
  (state: IRefereeState) => state.isProcessing
);

export const showEditorReferee = createSelector(
  getRefereeState,
  (state: IRefereeState) => state.showEditor
);

export const showViewerReferee = createSelector(
  getRefereeState,
  (state: IRefereeState) => state.showViewer
);

export const getRefereeApprovedData = createSelector(
  getRefereeState,
  (state: IRefereeState) => state.approvedData
);

export const getRefereeAwaitingApprovalData = createSelector(
  getRefereeState,
  (state: IRefereeState) => state.awaitingApprovalData
);

export const getRefereeDocument = createSelector(
  getRefereeState,
  (state: IRefereeState) => state.document
);

export const getRefereeInlineDocument = createSelector(
  getRefereeState,
  (state: IRefereeState) => state.inlineDocument
);

export const getRefereeApprovedPhoto = createSelector(
  getRefereeState,
  (state: IRefereeState) => state.approvedPhoto
);

export const getRefereeAwaitingApprovalPhoto = createSelector(
  getRefereeState,
  (state: IRefereeState) => state.awaitingApprovalPhoto
);