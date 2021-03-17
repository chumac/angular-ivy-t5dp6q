import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILeaveApplyState } from './leave-apply.state';

import { IAbsenceState } from '../root';

export const getState = createFeatureSelector<IAbsenceState>('absence');

export const getLeaveApplyState = createSelector(getState, (state: IAbsenceState) => state.leaveApply);

export const isProcessingLeaveApply = createSelector(
  getLeaveApplyState,
  (state: ILeaveApplyState) => state.isProcessing
);

export const isProcessingFormLeaveApply = createSelector(
  getLeaveApplyState,
  (state: ILeaveApplyState) => state.isProcessingForm
);


export const showEditorLeaveApply = createSelector(
  getLeaveApplyState,
  (state: ILeaveApplyState) => state.showEditor
);

export const showFullFormLeaveApply = createSelector(
  getLeaveApplyState,
  (state: ILeaveApplyState) => state.showFullForm
);

export const getEntitlementLeaveApply = createSelector(
  getLeaveApplyState,
  (state: ILeaveApplyState) => state.leaveEntitlement
);



export const getLeaveApplyStateList = createSelector(
  getLeaveApplyState,
  (state: ILeaveApplyState) => state.stateList
);

export const getLeaveApplyCityList = createSelector(
  getLeaveApplyState,
  (state: ILeaveApplyState) => state.cityList
);

export const getLeaveApplyApprovedData = createSelector(
  getLeaveApplyState,
  (state: ILeaveApplyState) => state.approvedData
  );

export const getLeaveApplyAwaitingApprovalData = createSelector(
  getLeaveApplyState,
  (state: ILeaveApplyState) => state.awaitingApprovalData
);

export const getLeaveApplySubdetail= createSelector(
  getLeaveApplyState,
  (state: ILeaveApplyState) => state.leaveEntitlementSubdetail
);
