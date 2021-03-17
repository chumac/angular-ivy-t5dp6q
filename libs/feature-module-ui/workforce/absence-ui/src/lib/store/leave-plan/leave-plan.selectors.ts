import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILeavePlanState } from './leave-plan.state';

import { IAbsenceState } from '../root';

export const getState = createFeatureSelector<IAbsenceState>('absence');

export const getLeavePlanState = createSelector(getState, (state: IAbsenceState) => state.leavePlan);

export const isProcessingLeavePlan = createSelector(
  getLeavePlanState,
  (state: ILeavePlanState) => state.isProcessing
);

export const isLoadingLeavePlan = createSelector(
  getLeavePlanState,
  (state: ILeavePlanState) => state.isLoading
);

export const showEditorLeavePlan = createSelector(
  getLeavePlanState,
  (state: ILeavePlanState) => state.showEditor
);

export const showViewerLeavePlan = createSelector(
  getLeavePlanState,
  (state: ILeavePlanState) => state.showViewer
);

export const showModalLeavePlan = createSelector(
  getLeavePlanState,
  (state: ILeavePlanState) => state.showModal
);

export const showDetailEditorLeavePlan = createSelector(
  getLeavePlanState,
  (state: ILeavePlanState) => state.showDetailEditor
);


export const getLeavePlanApprovedData = createSelector(
  getLeavePlanState,
  (state: ILeavePlanState) => state.approvedData
  );

export const getLeavePlanAwaitingApprovalData = createSelector(
  getLeavePlanState,
  (state: ILeavePlanState) => state.awaitingApprovalData
);

export const getEntitlementLeavePlan = createSelector(
  getLeavePlanState,
  (state: ILeavePlanState) => state.leaveEntitlement
);

export const getLeavePlanStateList = createSelector(
  getLeavePlanState,
  (state: ILeavePlanState) => state.stateList
);

export const getLeavePlanCityList = createSelector(
  getLeavePlanState,
  (state: ILeavePlanState) => state.cityList
);

export const getLeavePlanIdentity = createSelector(
  getLeavePlanState,
  (state: ILeavePlanState) => state.leavePlanIdentity
);

export const getLeavePlanType = createSelector(
  getLeavePlanState,
  (state: ILeavePlanState) => state.leaveType
);
