import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IEmployeesProfileState } from '../../root';
import { IReInstateTransactionState } from './re-instate.state';

const getState = createFeatureSelector<IEmployeesProfileState>('employeesProfile');
const getReInstateTransactionState = createSelector(getState, (state: IEmployeesProfileState) => state.reInstateTransaction);


export const getReInstateTransaction = createSelector(
  getReInstateTransactionState,
  (state: IReInstateTransactionState) => state.data
);

export const showEditorReInstateTransaction = createSelector(
  getReInstateTransactionState,
  (state: IReInstateTransactionState) => state.showEditor
);

export const isProcessingReInstateTransaction = createSelector(
  getReInstateTransactionState,
  (state: IReInstateTransactionState) => state.isProcessing
);

export const isLoadingReInstateTransaction = createSelector(
  getReInstateTransactionState,
  (state: IReInstateTransactionState) => state.isLoading
);

export const getEmployeeListReInstateTransaction = createSelector(
  getReInstateTransactionState,
  (state: IReInstateTransactionState) => state.employeeList
);

export const getRecordCategoryReInstateTransaction = createSelector(
  getReInstateTransactionState,
  (state: IReInstateTransactionState) => state.recordCategory
);
