import { createSelector, createFeatureSelector } from '@ngrx/store';

import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';
import { IReboardBeneficiaryState } from './reboard-beneficiary.state';

export const getReboardBeneficiaryState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.reboardBeneficiary
);


export const isProcessingReboardBeneficiary = createSelector(
  getReboardBeneficiaryState,
  (state: IReboardBeneficiaryState) => state.isProcessing
);

export const isLoadingReboardBeneficiary = createSelector(
  getReboardBeneficiaryState,
  (state: IReboardBeneficiaryState) => state.isLoading
);

export const showEditorReboardBeneficiary = createSelector(
  getReboardBeneficiaryState,
  (state: IReboardBeneficiaryState) => state.showEditor
);

export const showViewerReboardBeneficiary = createSelector(
  getReboardBeneficiaryState,
  (state: IReboardBeneficiaryState) => state.showViewer
);

export const getReboardBeneficiaryStateList = createSelector(
  getReboardBeneficiaryState,
  (state: IReboardBeneficiaryState) => state.stateList
);

export const getReboardBeneficiaryCityList = createSelector(
  getReboardBeneficiaryState,
  (state: IReboardBeneficiaryState) => state.cityList
);

export const getReboardBeneficiaryData = createSelector(
  getReboardBeneficiaryState,
  (state: IReboardBeneficiaryState) => state.data
);

export const getReboardBeneficiaryPhoto = createSelector(
  getReboardBeneficiaryState,
  (state: IReboardBeneficiaryState) => state.photo
);
