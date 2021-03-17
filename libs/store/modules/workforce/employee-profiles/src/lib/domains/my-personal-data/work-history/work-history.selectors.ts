import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IWorkHistoryState } from './work-history.state';

export const getWorkHistoryState = createFeatureSelector<IWorkHistoryState>('workHistory');

export const isProcessingWorkHistory = createSelector(
  getWorkHistoryState,
  (state: IWorkHistoryState) => state.isProcessing
);

export const showEditorWorkHistory = createSelector(
  getWorkHistoryState,
  (state: IWorkHistoryState) => state.showEditor
);

export const showViewerWorkHistory = createSelector(
  getWorkHistoryState,
  (state: IWorkHistoryState) => state.showViewer
);

export const getWorkHistoryApprovedData = createSelector(
  getWorkHistoryState,
  (state: IWorkHistoryState) => state.approvedData
);

export const getWorkHistoryAwaitingApprovalData = createSelector(
  getWorkHistoryState,
  (state: IWorkHistoryState) => state.awaitingApprovalData
);

export const getWorkHistoryDocument = createSelector(
  getWorkHistoryState,
  (state: IWorkHistoryState) => state.document
);

// export const getWorkHistoryInlineDocument = createSelector(
//   getWorkHistoryState,
//   (state: IWorkHistoryState) => state.inlineDocument
// );
