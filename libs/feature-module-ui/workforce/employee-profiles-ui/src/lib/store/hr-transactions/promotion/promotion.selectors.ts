import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IEmployeesProfileState } from '../../root';
import { IPromotionState } from './promotion.state';

const getState = createFeatureSelector<IEmployeesProfileState>('employeesProfile');
const getPromotionState = createSelector(getState, (state: IEmployeesProfileState) => state.promotion);


export const isLoadingPromotion = createSelector(
  getPromotionState,
  (state: IPromotionState) => state.isLoading
);

export const isProcessingPromotion = createSelector(
  getPromotionState,
  (state: IPromotionState) => state.isProcessing
);

export const showEditorPromotion = createSelector(
  getPromotionState,
  (state: IPromotionState) => state.showEditor
);

export const showSubmissionProcessEditorPromotion = createSelector(
  getPromotionState,
  (state: IPromotionState) => state.showSubmissionProcessEditor
);

export const showViewerPromotion = createSelector(
  getPromotionState,
  (state: IPromotionState) => state.showViewer
);

export const getPendingDataPromotion = createSelector(
  getPromotionState,
  (state: IPromotionState) => state.pendingData
);

export const getApprovedDataPromotion = createSelector(
  getPromotionState,
  (state: IPromotionState) => state.approvedData
);

export const getAwaitingApprovalDataPromotion = createSelector(
  getPromotionState,
  (state: IPromotionState) => state.awaitingData
);

export const getArrearsStatusDataPromotion = createSelector(
  getPromotionState,
  (state: IPromotionState) => state.arrearsStatus
);

export const getActionDataPromotion = createSelector(
  getPromotionState,
  (state: IPromotionState) => state.actions
);

export const getPaygradeSelectOptionDataPromotion = createSelector(
  getPromotionState,
  (state: IPromotionState) => state.paygradeData
);

export const getPaygroupSelectOptionDataPromotion = createSelector(
  getPromotionState,
  (state: IPromotionState) => state.paygroupData
);

export const getCurrentPaygradeSelectOptionDataPromotion = createSelector(
  getPromotionState,
  (state: IPromotionState) => state.currentPaygradeData
);

export const getCurrentPaygroupSelectOptionDataPromotion = createSelector(
  getPromotionState,
  (state: IPromotionState) => state.currentPaygroupData
);

export const getSubmissionProcessSelectOptionDataPromotion = createSelector(
  getPromotionState,
  (state: IPromotionState) => state.submissionProcess
);

export const getSelectedPromotion = createSelector(
  getPromotionState,
  (state: IPromotionState) => state.selectedPromotion
);

export const getEmployeeCurrentGradePaygroupDataPromotion = createSelector(
  getPromotionState,
  (state: IPromotionState) => state.employeeCurrentPayData
);

