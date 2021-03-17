import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IVariableDeductionTransactionState } from './variable-deduction-transaction.state';
import { IRootState } from '../../root/root.state';


const getState = createFeatureSelector<IRootState>('payroll');
const getVariableDeductionTransactionState = createSelector(getState, (state: IRootState) => state.variableDeductionTransaction);

export const getVariableDeductionTransaction = createSelector(
  getVariableDeductionTransactionState,
  (state: IVariableDeductionTransactionState) => state.data
);


export const showEditorVariableDeductionTransaction = createSelector(
  getVariableDeductionTransactionState,
  (state: IVariableDeductionTransactionState) => state.showEditor
);

export const showViewerVariableDeductionTransaction = createSelector(
  getVariableDeductionTransactionState,
  (state: IVariableDeductionTransactionState) => state.showViewer
);

export const getVariableDeductionListVariableDeductionTransaction = createSelector(
  getVariableDeductionTransactionState,
  (state: IVariableDeductionTransactionState) => state.variableDeductionList
);


export const isProcessingVariableDeductionTransaction = createSelector(
  getVariableDeductionTransactionState,
  (state: IVariableDeductionTransactionState) => state.isProcessing
);

export const isLoadingVariableDeductionTransaction = createSelector(
  getVariableDeductionTransactionState,
  (state: IVariableDeductionTransactionState) => state.isLoading
);
