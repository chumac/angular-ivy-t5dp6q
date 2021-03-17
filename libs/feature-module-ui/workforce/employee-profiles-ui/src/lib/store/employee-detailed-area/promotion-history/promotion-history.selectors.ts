import { createSelector } from '@ngrx/store';

import { IEmployeesProfileState, getEmployeesProfileState } from '../../root/employees-profile.state';

import { IPromotionHistoryState } from './promotion-history.state';

export const getPromotionHistoryState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.promotionHistory
);

export const showEditorPromotionHistory = createSelector(
  getPromotionHistoryState,
  (state: IPromotionHistoryState) => state.showEditor
);

export const showViewerPromotionHistory = createSelector(
  getPromotionHistoryState,
  (state: IPromotionHistoryState) => state.showViewer
);

export const isPromotionHistoryProcessing = createSelector(
  getPromotionHistoryState,
  (state: IPromotionHistoryState) => state.showViewer
);

export const getPromotionHistoryApprovedData = createSelector(
  getPromotionHistoryState,
  (state: IPromotionHistoryState) => state.approvedData
);

export const getPromotionHistoryAwaitingApprovalData = createSelector(
  getPromotionHistoryState,
  (state: IPromotionHistoryState) => state.awaitingApprovalData
);