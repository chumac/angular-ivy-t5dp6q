import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILeaveHourlyCancelApprovedState } from './leave-hourly-cancel-approved.state';
import { ISelfServiceState } from '@nutela/store/self-service';

const getSelfServiceState = createFeatureSelector<ISelfServiceState>('self-service');

export const getLeaveHourlyCancelApprovedState = createSelector(getSelfServiceState, (state: ISelfServiceState) => state.leaveHourlyCancelApproved);

export const isProcessingLeaveHourlyCancelApproved = createSelector(
  getLeaveHourlyCancelApprovedState,
  (state: ILeaveHourlyCancelApprovedState) => state.isProcessing
);

export const showEditorLeaveHourlyCancelApproved = createSelector(
  getLeaveHourlyCancelApprovedState,
  (state: ILeaveHourlyCancelApprovedState) => state.showEditor
);

