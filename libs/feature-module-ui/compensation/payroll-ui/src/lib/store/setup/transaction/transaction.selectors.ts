import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ITransactionState } from './transaction.state';
import { IRootState } from '../../root/root.state';


const getState = createFeatureSelector<IRootState>('payroll');
const getRunState = createSelector(getState, (state: IRootState) => state.exclusionTransaction);

export const getExclusionTransactionData = createSelector(
  getRunState,
  (state: ITransactionState) => state.exlusionTransactions
);

export const showEditorPayrollRun = createSelector(
  getRunState,
  (state: ITransactionState) => state.showEditor
);

export const showRecoverEditorPayrollRun = createSelector(
  getRunState,
  (state: ITransactionState) => state.showRecoverEditor
);


export const isLoadingExclusion = createSelector(
  getRunState,
  (state: ITransactionState) => state.isLoading
);

export const getExclusionScopeData = createSelector(
  getRunState,
  (state: ITransactionState) => state.exlusionScope
);
export const getExclusionActiveEmployeeData = createSelector(
  getRunState,
  (state: ITransactionState) => state.exlusionActiveEmployee
);
export const getExclusionReasonData = createSelector(
  getRunState,
  (state: ITransactionState) => state.exlusionReason
);

export const isProcessingExclusion = createSelector(
  getRunState,
  (state: ITransactionState) => state.isProcessing
);


export const getPayrollRunGroupSelectOption = createSelector(
  getRunState,
  (state: ITransactionState) => state.payrollGroupSelectOption
);

export const getPaymentGroupSelectOption = createSelector(
  getRunState,
  (state: ITransactionState) => state.paygroupSelectOption
);

export const getPayGradeSelectOption = createSelector(
  getRunState,
  (state: ITransactionState) => state.gradeSelectOption
);

export const getBrResponseBeforeRun = createSelector(
  getRunState,
  (state: ITransactionState) => state.canRun
);

export const getEmployeeSelectOption = createSelector(
  getRunState,
  (state: ITransactionState) => state.employeeSelectOption
);

export const getListOfPossibleReturns = createSelector(
  getRunState,
  (state: ITransactionState) => state.possibleReturns
);

export const showEditorExclusionTransaction = createSelector(
  getRunState,
  (state: ITransactionState) => state.showEditor
);

export const showCloseEditorExclusion = createSelector(
  getRunState,
  (state: ITransactionState) => state.showCloseEditor
);

export const getExclusionData = createSelector(
  getRunState,
  (state: ITransactionState) => state.getExclusionData
);


export const showCloseEditorPayrollRun = createSelector(
  getRunState,
  (state: ITransactionState) => state.showCloseEditor
);

export const showConfigureTransaction = createSelector(
  getRunState,
  (state: ITransactionState) => state.showConfigure
);

export const getConfigureTransactionData = createSelector(
  getRunState,
  (state: ITransactionState) => state.configureTransaction
);

export const showEditorConfigureCreate = createSelector(
  getRunState,
  (state: ITransactionState) => state.showConfigureCreate
);

export const getExclusionTypeData = createSelector(
  getRunState,
  (state: ITransactionState) => state.exlusionType
);

export const getConfigureTransactionDataEdit = createSelector(
  getRunState,
  (state: ITransactionState) => state.getconfigureTransactionEdit
);

export const getExclusionItemTypeData = createSelector(
  getRunState,
  (state: ITransactionState) => state.exlusionItemType
);

export const loadEditConfigureData = createSelector(
  getRunState,
  (state: ITransactionState) => state.getconfigureTransactionEdit
);

export const isProcessingCloseExclusion = createSelector(
  getRunState,
  (state: ITransactionState) => state.isProcessing
);
