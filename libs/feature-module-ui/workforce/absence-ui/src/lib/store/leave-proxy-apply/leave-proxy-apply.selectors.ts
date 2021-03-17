import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILeaveProxyApplyState } from './leave-proxy-apply.state';

import { IAbsenceState } from '../root';

export const getState = createFeatureSelector<IAbsenceState>('absence');

export const getLeaveProxyApplyState = createSelector(getState, (state: IAbsenceState) => state.leaveProxyApply);

export const isProcessingLeaveProxyApply = createSelector(
  getLeaveProxyApplyState,
  (state: ILeaveProxyApplyState) => state.isProcessing
);

export const isLoadingLeaveProxyApply = createSelector(
  getLeaveProxyApplyState,
  (state: ILeaveProxyApplyState) => state.isLoading
);

export const isProcessingFormLeaveProxyApply = createSelector(
  getLeaveProxyApplyState,
  (state: ILeaveProxyApplyState) => state.isProcessingForm
);


export const showEditorLeaveProxyApply = createSelector(
  getLeaveProxyApplyState,
  (state: ILeaveProxyApplyState) => state.showEditor
);

export const showViewerLeaveProxyApply = createSelector(
  getLeaveProxyApplyState,
  (state: ILeaveProxyApplyState) => state.showViewer
);

export const showEditorLeaveProxyReset = createSelector(
  getLeaveProxyApplyState,
  (state: ILeaveProxyApplyState) => state.showResetEditor
);

export const showFullFormLeaveProxyApply = createSelector(
  getLeaveProxyApplyState,
  (state: ILeaveProxyApplyState) => state.showFullForm
);

export const getEntitlementLeaveProxyApply = createSelector(
  getLeaveProxyApplyState,
  (state: ILeaveProxyApplyState) => state.leaveEntitlement
);



export const getLeaveProxyApplyStateList = createSelector(
  getLeaveProxyApplyState,
  (state: ILeaveProxyApplyState) => state.stateList
);

export const getLeaveProxyApplyCityList = createSelector(
  getLeaveProxyApplyState,
  (state: ILeaveProxyApplyState) => state.cityList
);

export const getLeaveProxyApplyApprovedData = createSelector(
  getLeaveProxyApplyState,
  (state: ILeaveProxyApplyState) => state.approvedData
  );

export const getLeaveProxyApplyAwaitingApprovalData = createSelector(
  getLeaveProxyApplyState,
  (state: ILeaveProxyApplyState) => state.awaitingApprovalData
);

export const getLeaveProxyApplySubdetail= createSelector(
  getLeaveProxyApplyState,
  (state: ILeaveProxyApplyState) => state.leaveEntitlementSubdetail
);
