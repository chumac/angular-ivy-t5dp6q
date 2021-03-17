import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ISelfProcessTransactionState } from './self-process-transaction.state';
import { getProcessesState, IProcessesState } from '../../root/processes.state';

export const getSelfProcessTransactionState = createSelector(
  getProcessesState,
  (state: IProcessesState) => state.selfProcessTransaction
);

export const isProcessingSelfProcessTransaction = createSelector(
  getSelfProcessTransactionState,
  (state: ISelfProcessTransactionState) => state.isProcessing
);

export const showEditorSelfProcessTransaction = createSelector(
  getSelfProcessTransactionState,
  (state: ISelfProcessTransactionState) => state.showEditor
);

export const showViewerSelfProcessTransaction = createSelector(
  getSelfProcessTransactionState,
  (state: ISelfProcessTransactionState) => state.showViewer
);

export const getSelfProcessTransactionData = createSelector(
  getSelfProcessTransactionState,
  (state: ISelfProcessTransactionState) => state.selfProcessTransactionData
);

export const getProcessFormArea = createSelector(
  getSelfProcessTransactionState,
  (state: ISelfProcessTransactionState) => state.area
);
