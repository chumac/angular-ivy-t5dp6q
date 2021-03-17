import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILeaveApplyState } from './leave-apply.state';
import { ISelfServiceState } from '@nutela/store/self-service';

import { IAbsenceState } from '@nutela/feature-module-ui/workforce/absence-ui';

const getSelfServiceState = createFeatureSelector<IAbsenceState>('absence');

export const getLeaveApplyState = createSelector(getSelfServiceState, (state: ISelfServiceState) => state.leaveApply);

export const isProcessingLeaveApply = createSelector(
  getLeaveApplyState,
  (state: ILeaveApplyState) => state.isProcessing
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
