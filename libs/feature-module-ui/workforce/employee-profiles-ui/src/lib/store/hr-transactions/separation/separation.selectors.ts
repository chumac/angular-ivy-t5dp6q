import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IEmployeesProfileState } from '../../root';
import { ISeparationTransactionState } from './separation.state';

const getState = createFeatureSelector<IEmployeesProfileState>('employeesProfile');
const getSeparationTransactionState = createSelector(getState, (state: IEmployeesProfileState) => state.separationTransaction);


export const getSeparationTransaction = createSelector(
  getSeparationTransactionState,
  (state: ISeparationTransactionState) => state.data
);

export const showEditorSeparationTransaction = createSelector(
  getSeparationTransactionState,
  (state: ISeparationTransactionState) => state.showEditor
);

export const showViewerSeparationTransaction = createSelector(
  getSeparationTransactionState,
  (state: ISeparationTransactionState) => state.showViewer
);


export const isProcessingSeparationTransaction = createSelector(
  getSeparationTransactionState,
  (state: ISeparationTransactionState) => state.isProcessing
);

export const isLoadingSeparationTransaction = createSelector(
  getSeparationTransactionState,
  (state: ISeparationTransactionState) => state.isLoading
);

export const getEmployeeListSeparationTransaction = createSelector(
  getSeparationTransactionState,
  (state: ISeparationTransactionState) => state.employeeList
);

export const getStatusSeparationTransaction = createSelector(
  getSeparationTransactionState,
  (state: ISeparationTransactionState) => state.status
);
export const getReasonSeparationTransaction = createSelector(
  getSeparationTransactionState,
  (state: ISeparationTransactionState) => state.reasons
);
export const getAllowanceSeparationTransaction = createSelector(
  getSeparationTransactionState,
  (state: ISeparationTransactionState) => state.allowance
);
export const getCurrencySeparationTransaction = createSelector(
  getSeparationTransactionState,
  (state: ISeparationTransactionState) => state.currency
);
