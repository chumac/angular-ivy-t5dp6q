import { createSelector, createFeatureSelector } from '@ngrx/store';

import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';
import { IHrReboardBeneficiaryState } from './hr-reboard-beneficiary.state';

export const getHrReboardBeneficiaryState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.hrReboardBeneficiary
);


export const isProcessingHrReboardBeneficiary = createSelector(
  getHrReboardBeneficiaryState,
  (state: IHrReboardBeneficiaryState) => state.isProcessing
);

export const isLoadingHrReboardBeneficiary = createSelector(
  getHrReboardBeneficiaryState,
  (state: IHrReboardBeneficiaryState) => state.isLoading
);

export const showEditorHrReboardBeneficiary = createSelector(
  getHrReboardBeneficiaryState,
  (state: IHrReboardBeneficiaryState) => state.showEditor
);

export const showViewerHrReboardBeneficiary = createSelector(
  getHrReboardBeneficiaryState,
  (state: IHrReboardBeneficiaryState) => state.showViewer
);

export const getHrReboardBeneficiaryStateList = createSelector(
  getHrReboardBeneficiaryState,
  (state: IHrReboardBeneficiaryState) => state.stateList
);

export const getHrReboardBeneficiaryCityList = createSelector(
  getHrReboardBeneficiaryState,
  (state: IHrReboardBeneficiaryState) => state.cityList
);

export const getHrReboardBeneficiaryData = createSelector(
  getHrReboardBeneficiaryState,
  (state: IHrReboardBeneficiaryState) => state.data
);

export const getHrReboardBeneficiaryPhoto = createSelector(
  getHrReboardBeneficiaryState,
  (state: IHrReboardBeneficiaryState) => state.photo
);
