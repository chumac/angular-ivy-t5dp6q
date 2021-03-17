import { createSelector, } from '@ngrx/store';
import { IEmployeesProfileState, getEmployeesProfileState } from '../../root/employees-profile.state';


import { IHRBeneficiaryState } from './beneficiary.state';

export const getHRBeneficiaryState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.beneficiary
);

export const isProcessingBeneficiary = createSelector(
  getHRBeneficiaryState,
  (state: IHRBeneficiaryState) => state.isProcessing
);

export const showEditorHRBeneficiary = createSelector(
  getHRBeneficiaryState,
  (state: IHRBeneficiaryState) => state.showEditor
);

export const showViewerHRBeneficiary = createSelector(
  getHRBeneficiaryState,
  (state: IHRBeneficiaryState) => state.showViewer
);

export const getHRBeneficiaryStateList = createSelector(
  getHRBeneficiaryState,
  (state: IHRBeneficiaryState) => state.stateList
);

export const getHRBeneficiaryCityList = createSelector(
  getHRBeneficiaryState,
  (state: IHRBeneficiaryState) => state.cityList
);

export const getHRBeneficiaryApprovedData = createSelector(
  getHRBeneficiaryState,
  (state: IHRBeneficiaryState) => state.approvedData
);

export const getBeneficiaryAwaitingApprovalData = createSelector(
  getHRBeneficiaryState,
  (state: IHRBeneficiaryState) => state.awaitingApprovalData
);

export const getHRBeneficiaryApprovedDataMap = createSelector(getHRBeneficiaryState, (state: IHRBeneficiaryState) => state.approvedDataMap);

export const getBeneficiaryApprovedPhoto = createSelector(
  getHRBeneficiaryState,
  (state: IHRBeneficiaryState) => state.approvedPhoto
);

export const getBeneficiaryAwaitingApprovalPhoto = createSelector(
  getHRBeneficiaryState,
  (state: IHRBeneficiaryState) => state.awaitingApprovalPhoto
);
