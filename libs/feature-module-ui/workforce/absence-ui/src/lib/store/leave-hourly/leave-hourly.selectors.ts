import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILeaveHourlyState } from './leave-hourly.state';

import { IAbsenceState } from '../root';

export const getState = createFeatureSelector<IAbsenceState>('absence');

export const getLeaveHourlyState = createSelector(getState, (state: IAbsenceState) => state.leaveHourly);

export const isProcessingLeaveHourly = createSelector(
  getLeaveHourlyState,
  (state: ILeaveHourlyState) => state.isProcessing
);

export const isLoadingLeaveHourly = createSelector(
  getLeaveHourlyState,
  (state: ILeaveHourlyState) => state.isLoading
);

export const showEditorLeaveHourly = createSelector(
  getLeaveHourlyState,
  (state: ILeaveHourlyState) => state.showEditor
);

export const getEntitlementLeaveHourly = createSelector(
  getLeaveHourlyState,
  (state: ILeaveHourlyState) => state.hourlyLeaveEntitlement
);

export const getLeaveHourlyApprovedData = createSelector(
  getLeaveHourlyState,
  (state: ILeaveHourlyState) => state.approvedData
  );

export const getLeaveHourlyAwaitingApprovalData = createSelector(
  getLeaveHourlyState,
  (state: ILeaveHourlyState) => state.awaitingApprovalData
);
