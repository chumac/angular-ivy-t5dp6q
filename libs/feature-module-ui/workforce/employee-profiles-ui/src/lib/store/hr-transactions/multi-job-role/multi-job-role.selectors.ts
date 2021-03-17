import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IEmployeesProfileState } from '../../root';
import { IMultiJobRoleTransactionState } from './multi-job-role.state';

const getState = createFeatureSelector<IEmployeesProfileState>('employeesProfile');
const getMultiJobRoleTransactionState = createSelector(getState, (state: IEmployeesProfileState) => state.multiJobRoleTransaction);


export const getMultiJobRoleTransaction = createSelector(
  getMultiJobRoleTransactionState,
  (state: IMultiJobRoleTransactionState) => state.data
);

export const showEditorMultiJobRoleTransaction = createSelector(
  getMultiJobRoleTransactionState,
  (state: IMultiJobRoleTransactionState) => state.showEditor
);

export const isProcessingMultiJobRoleTransaction = createSelector(
  getMultiJobRoleTransactionState,
  (state: IMultiJobRoleTransactionState) => state.isProcessing
);

export const isLoadingMultiJobRoleTransaction = createSelector(
  getMultiJobRoleTransactionState,
  (state: IMultiJobRoleTransactionState) => state.isLoading
);

export const getEmployeeListMultiJobRoleTransaction = createSelector(
  getMultiJobRoleTransactionState,
  (state: IMultiJobRoleTransactionState) => state.employeeList
);

export const getPositionListMultiJobRoleTransaction = createSelector(
  getMultiJobRoleTransactionState,
  (state: IMultiJobRoleTransactionState) => state.positionList
);
