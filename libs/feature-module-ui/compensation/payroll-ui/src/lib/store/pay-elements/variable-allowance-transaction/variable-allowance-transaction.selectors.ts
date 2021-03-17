import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IVariableAllowanceTransactionState } from './variable-allowance-transaction.state';
import { IRootState } from '../../root/root.state';


const getState = createFeatureSelector<IRootState>('payroll');
const getVariableAllowanceTransactionState = createSelector(getState, (state: IRootState) => state.variableAllowanceTransaction);

export const getVariableAllowanceTransaction = createSelector(
  getVariableAllowanceTransactionState,
  (state: IVariableAllowanceTransactionState) => state.data
);


export const showEditorVariableAllowanceTransaction = createSelector(
  getVariableAllowanceTransactionState,
  (state: IVariableAllowanceTransactionState) => state.showEditor
);

export const showViewerVariableAllowanceTransaction = createSelector(
  getVariableAllowanceTransactionState,
  (state: IVariableAllowanceTransactionState) => state.showViewer
);

export const getVariableAllowanceListVariableAllowanceTransaction = createSelector(
  getVariableAllowanceTransactionState,
  (state: IVariableAllowanceTransactionState) => state.variableAllowanceList
);


export const isProcessingVariableAllowanceTransaction = createSelector(
  getVariableAllowanceTransactionState,
  (state: IVariableAllowanceTransactionState) => state.isProcessing
);

export const isLoadingVariableAllowanceTransaction = createSelector(
  getVariableAllowanceTransactionState,
  (state: IVariableAllowanceTransactionState) => state.isLoading
);
