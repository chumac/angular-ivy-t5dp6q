import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IReviewerProcessTransactionState } from './reviewer-process-transaction.state';
import { getProcessesState, IProcessesState } from '../../root/processes.state';

export const getReviewerProcessTransactionState = createSelector(
  getProcessesState,
  (state: IProcessesState) => state.reviewerProcessTransaction
);

export const isProcessingReviewerProcessTransaction = createSelector(
  getReviewerProcessTransactionState,
  (state: IReviewerProcessTransactionState) => state.isProcessing
);

export const showEditorReviewerProcessTransaction = createSelector(
  getReviewerProcessTransactionState,
  (state: IReviewerProcessTransactionState) => state.showEditor
);

export const showViewerReviewerProcessTransaction = createSelector(
  getReviewerProcessTransactionState,
  (state: IReviewerProcessTransactionState) => state.showViewer
);

export const getReviewerProcessTransactionData = createSelector(
  getReviewerProcessTransactionState,
  (state: IReviewerProcessTransactionState) => state.reviewerProcessTransactionData
);
