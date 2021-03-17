import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ISelfServiceState } from '@nutela/store/self-service';
import { ILeaveDailyState } from './leave-daily.state';

const getSelfServiceState = createFeatureSelector<ISelfServiceState>('self-service');

export const getLeaveDailyState = createSelector(getSelfServiceState, (state: ISelfServiceState) => state.leaveDaily);

export const getLeaveEntitlements = createSelector(getLeaveDailyState, (state: ILeaveDailyState) => state.leaveEntitlements);

export const getLeaveDailyApprovedData = createSelector(getLeaveDailyState, (state: ILeaveDailyState) => state.approvedData);

export const getLeaveDailyAwaitingApprovalData = createSelector(getLeaveDailyState, (state: ILeaveDailyState) => state.awaitingApprovalData
);
