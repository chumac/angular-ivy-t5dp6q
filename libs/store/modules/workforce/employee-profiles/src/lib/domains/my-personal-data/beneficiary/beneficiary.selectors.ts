import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IBeneficiaryState } from './beneficiary.state';

export const getBeneficiaryState = createFeatureSelector<IBeneficiaryState>('beneficiaries');

export const isProcessingBeneficiary = createSelector(
  getBeneficiaryState,
  (state: IBeneficiaryState) => state.isProcessing
);

export const showEditorBeneficiary = createSelector(
  getBeneficiaryState,
  (state: IBeneficiaryState) => state.showEditor
);

export const showViewerBeneficiary = createSelector(
  getBeneficiaryState,
  (state: IBeneficiaryState) => state.showViewer
);

export const getBeneficiaryStateList = createSelector(
  getBeneficiaryState,
  (state: IBeneficiaryState) => state.stateList
);

export const getBeneficiaryCityList = createSelector(
  getBeneficiaryState,
  (state: IBeneficiaryState) => state.cityList
);

export const getBeneficiaryApprovedData = createSelector(
  getBeneficiaryState,
  (state: IBeneficiaryState) => state.approvedData
);

export const getBeneficiaryAwaitingApprovalData = createSelector(
  getBeneficiaryState,
  (state: IBeneficiaryState) => state.awaitingApprovalData
);

export const getBeneficiaryApprovedDataMap = createSelector(getBeneficiaryState, (state: IBeneficiaryState) => state.approvedDataMap);

export const getBeneficiaryApprovedPhoto = createSelector(
  getBeneficiaryState,
  (state: IBeneficiaryState) => state.approvedPhoto
);

export const getBeneficiaryAwaitingApprovalPhoto = createSelector(
  getBeneficiaryState,
  (state: IBeneficiaryState) => state.awaitingApprovalPhoto
);