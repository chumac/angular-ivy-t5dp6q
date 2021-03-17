import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IPayGroupState } from './pay-group.state';
import { IRootState } from '../../root/root.state';


const getState = createFeatureSelector<IRootState>('payroll');
const getPayGroupState = createSelector(getState, (state: IRootState) => state.payGroup);

export const getPayGroup = createSelector(
  getPayGroupState,
  (state: IPayGroupState) => state.data
);

export const getPayGroupFiltered = createSelector(
  getPayGroupState,
  (state: IPayGroupState) => state.filteredData
);

export const getPayGroupAwaitingApproval = createSelector(
  getPayGroupState,
  (state: IPayGroupState) => state.awaitingData
);


export const showEditorPayGroup = createSelector(
  getPayGroupState,
  (state: IPayGroupState) => state.showEditor
);

export const showViewerPayGroup = createSelector(
  getPayGroupState,
  (state: IPayGroupState) => state.showViewer
);


export const isProcessingPayGroup = createSelector(
  getPayGroupState,
  (state: IPayGroupState) => state.isProcessing
);

export const isLoadingPayGroup = createSelector(
  getPayGroupState,
  (state: IPayGroupState) => state.isLoading
);

export const getPayrollProfileSelectOptionPayGroup = createSelector(
  getPayGroupState,
  (state: IPayGroupState) => state.payrollSelectOption
);

export const getGradeSelectOptionPayGroup = createSelector(
  getPayGroupState,
  (state: IPayGroupState) => state.gradeSelectOption
);

export const getConfirmationStatus = createSelector(
  getPayGroupState,
  (state: IPayGroupState) => state.confirmationStatus
);

export const getCurrencies = createSelector(
  getPayGroupState,
  (state: IPayGroupState) => state.currencySelectOption
);

export const getRoleData = createSelector(
  getPayGroupState,
  (state: IPayGroupState) => state.roles
);

export const hasPaygroupAdminRole = createSelector(
  getPayGroupState,
  (state: IPayGroupState) => state.hasPaygroupAdminRole
);
