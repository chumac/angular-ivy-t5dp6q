import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IHrProcessTransactionState } from './hr-process-transaction.state';
import { getProcessesState, IProcessesState } from '../../root/processes.state';

export const getHrProcessTransactionState = createSelector(
  getProcessesState,
  (state: IProcessesState) => state.hrProcessTransaction
);

export const isProcessingHrProcessTransaction = createSelector(
  getHrProcessTransactionState,
  (state: IHrProcessTransactionState) => state.isProcessing
);

export const showEditorHrProcessTransaction = createSelector(
  getHrProcessTransactionState,
  (state: IHrProcessTransactionState) => state.showEditor
);

export const showViewerHrProcessTransaction = createSelector(
  getHrProcessTransactionState,
  (state: IHrProcessTransactionState) => state.showViewer
);

export const getHrProcessTransactionData = createSelector(
  getHrProcessTransactionState,
  (state: IHrProcessTransactionState) => state.hrProcessTransactionData
);

export const getProcessFormArea = createSelector(
  getHrProcessTransactionState,
  (state: IHrProcessTransactionState) => state.area
);
