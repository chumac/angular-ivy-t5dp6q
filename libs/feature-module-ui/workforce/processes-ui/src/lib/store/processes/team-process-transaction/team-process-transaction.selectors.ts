import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ITeamProcessTransactionState } from './team-process-transaction.state';
import { getProcessesState, IProcessesState } from '../../root/processes.state';

export const getTeamProcessTransactionState = createSelector(
  getProcessesState,
  (state: IProcessesState) => state.teamProcessTransaction
);

export const isProcessingTeamProcessTransaction = createSelector(
  getTeamProcessTransactionState,
  (state: ITeamProcessTransactionState) => state.isProcessing
);

export const showEditorTeamProcessTransaction = createSelector(
  getTeamProcessTransactionState,
  (state: ITeamProcessTransactionState) => state.showEditor
);

export const showViewerTeamProcessTransaction = createSelector(
  getTeamProcessTransactionState,
  (state: ITeamProcessTransactionState) => state.showViewer
);

export const getTeamProcessTransactionData = createSelector(
  getTeamProcessTransactionState,
  (state: ITeamProcessTransactionState) => state.teamProcessTransactionData
);

export const getProcessFormArea = createSelector(
  getTeamProcessTransactionState,
  (state: ITeamProcessTransactionState) => state.area
);
