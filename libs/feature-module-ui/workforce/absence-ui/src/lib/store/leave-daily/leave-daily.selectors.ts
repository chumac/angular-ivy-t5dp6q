import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILeaveDailyState } from './leave-daily.state';

import { IAbsenceState } from '../root';

export const getState = createFeatureSelector<IAbsenceState>('absence');

export const getLeaveDailyState = createSelector(getState, (state: IAbsenceState) => state.leaveDaily);

export const isLoadingLeaveDaily = createSelector(getLeaveDailyState, (state: ILeaveDailyState) => state.isLoading);

export const getLeaveEntitlements = createSelector(getLeaveDailyState, (state: ILeaveDailyState) => state.leaveEntitlements);

export const getLeaveDailyApprovedData = createSelector(getLeaveDailyState, (state: ILeaveDailyState) => state.approvedData);

export const getLeaveDailyAwaitingApprovalData = createSelector(getLeaveDailyState, (state: ILeaveDailyState) => state.awaitingApprovalData);

export const getLeaveContactInfo = createSelector(getLeaveDailyState, (state: ILeaveDailyState) => state.contactInfo);
