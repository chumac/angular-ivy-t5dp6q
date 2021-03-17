import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILeaveHourlyCancelApprovedState } from './leave-hourly-cancel-approved.state';

import { IAbsenceState } from '../root';

export const getState = createFeatureSelector<IAbsenceState>('absence');

export const getLeaveHourlyCancelApprovedState = createSelector(getState, (state: IAbsenceState) => state.leaveHourlyCancelApproved);

export const isProcessingLeaveHourlyCancelApproved = createSelector(
  getLeaveHourlyCancelApprovedState,
  (state: ILeaveHourlyCancelApprovedState) => state.isProcessing
);

export const showEditorLeaveHourlyCancelApproved = createSelector(
  getLeaveHourlyCancelApprovedState,
  (state: ILeaveHourlyCancelApprovedState) => state.showEditor
);

