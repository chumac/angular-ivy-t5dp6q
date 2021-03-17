import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IVariableDeductionState } from './variable-deduction.state';
import { IRootState } from '../../root/root.state';


const getState = createFeatureSelector<IRootState>('payroll');
const getVariableDeductionState = createSelector(getState, (state: IRootState) => state.variableDeduction);

export const getVariableDeduction = createSelector(
  getVariableDeductionState,
  (state: IVariableDeductionState) => state.data
);


export const showEditorVariableDeduction = createSelector(
  getVariableDeductionState,
  (state: IVariableDeductionState) => state.showEditor
);

export const showViewerVariableDeduction = createSelector(
  getVariableDeductionState,
  (state: IVariableDeductionState) => state.showViewer
);

export const showRateViewerVariableDeduction = createSelector(
  getVariableDeductionState,
  (state: IVariableDeductionState) => state.showRateViewer
);

export const showRateEditorVariableDeduction = createSelector(
  getVariableDeductionState,
  (state: IVariableDeductionState) => state.showRateEditor
);

export const isProcessingVariableDeduction = createSelector(
  getVariableDeductionState,
  (state: IVariableDeductionState) => state.isProcessing
);

export const isLoadingVariableDeduction = createSelector(
  getVariableDeductionState,
  (state: IVariableDeductionState) => state.isLoading
);

export const getPayrollProfileListVariableDeduction = createSelector(
  getVariableDeductionState,
  (state: IVariableDeductionState) => state.payrollProfileList
);

export const getPaygroupListVariableDeduction = createSelector(
  getVariableDeductionState,
  (state: IVariableDeductionState) => state.paygroupList
);

export const getTransactionUnitListVariableDeduction = createSelector(
  getVariableDeductionState,
  (state: IVariableDeductionState) => state.transactionUnitList
);

export const getGroupNameListVariableDeduction = createSelector(
  getVariableDeductionState,
  (state: IVariableDeductionState) => state.groupNameList
);

export const getRatesVariableDeduction = createSelector(
  getVariableDeductionState,
  (state: IVariableDeductionState) => state.rates
);

export const getFormulaListVariableDeduction = createSelector(
  getVariableDeductionState,
  (state: IVariableDeductionState) => state.formulaList
);

export const getCurrencyListVariableDeduction = createSelector(
  getVariableDeductionState,
  (state: IVariableDeductionState) => state.currencyList
);
