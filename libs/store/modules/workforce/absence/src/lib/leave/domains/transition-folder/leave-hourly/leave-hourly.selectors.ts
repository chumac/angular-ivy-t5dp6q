import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILeaveHourlyState } from './leave-hourly.state';
import { ISelfServiceState } from '@nutela/store/self-service';

const getSelfServiceState = createFeatureSelector<ISelfServiceState>('self-service');

export const getLeaveHourlyState = createSelector(getSelfServiceState, (state: ISelfServiceState) => state.leaveHourly);

export const isProcessingLeaveHourly = createSelector(
  getLeaveHourlyState,
  (state: ILeaveHourlyState) => state.isProcessing
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
