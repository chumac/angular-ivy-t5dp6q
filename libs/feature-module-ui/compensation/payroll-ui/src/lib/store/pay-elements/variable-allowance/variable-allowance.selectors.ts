import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IVariableAllowanceState } from './variable-allowance.state';
import { IRootState } from '../../root/root.state';


const getState = createFeatureSelector<IRootState>('payroll');
const getVariableAllowanceState = createSelector(getState, (state: IRootState) => state.variableAllowance);

export const getVariableAllowance = createSelector(
  getVariableAllowanceState,
  (state: IVariableAllowanceState) => state.data
);

export const showEditorVariableAllowance = createSelector(
  getVariableAllowanceState,
  (state: IVariableAllowanceState) => state.showEditor
);

export const showViewerVariableAllowance = createSelector(
  getVariableAllowanceState,
  (state: IVariableAllowanceState) => state.showViewer
);

export const showRateViewerVariableAllowance = createSelector(
  getVariableAllowanceState,
  (state: IVariableAllowanceState) => state.showRateViewer
);

export const showRateEditorVariableAllowance = createSelector(
  getVariableAllowanceState,
  (state: IVariableAllowanceState) => state.showRateEditor
);


export const isProcessingVariableAllowance = createSelector(
  getVariableAllowanceState,
  (state: IVariableAllowanceState) => state.isProcessing
);

export const isLoadingVariableAllowance = createSelector(
  getVariableAllowanceState,
  (state: IVariableAllowanceState) => state.isLoading
);

export const getPayrollProfileListVariableAllowance = createSelector(
  getVariableAllowanceState,
  (state: IVariableAllowanceState) => state.payrollProfileList
);

export const getPaygroupListVariableAllowance = createSelector(
  getVariableAllowanceState,
  (state: IVariableAllowanceState) => state.paygroupList
);

export const getTransactionUnitListVariableAllowance = createSelector(
  getVariableAllowanceState,
  (state: IVariableAllowanceState) => state.transactionUnitList
);

export const getGroupNameListVariableAllowance = createSelector(
  getVariableAllowanceState,
  (state: IVariableAllowanceState) => state.groupNameList
);

export const getRatesVariableAllowance = createSelector(
  getVariableAllowanceState,
  (state: IVariableAllowanceState) => state.rates
);

export const getPayFormulaListVariableAllowance = createSelector(
  getVariableAllowanceState,
  (state: IVariableAllowanceState) => state.payFormulaList
);

export const getCurrencyListVariableAllowance = createSelector(
  getVariableAllowanceState,
  (state: IVariableAllowanceState) => state.currencyList
);

