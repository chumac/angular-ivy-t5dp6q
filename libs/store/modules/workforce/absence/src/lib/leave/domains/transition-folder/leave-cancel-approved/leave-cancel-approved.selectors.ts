import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILeaveCancelApprovedState } from './leave-cancel-approved.state';
import { ISelfServiceState } from '@nutela/store/self-service';
import { IAbsenceState } from '@nutela/feature-module-ui/workforce/absence-ui';

// const getSelfServiceState = createFeatureSelector<ISelfServiceState>('self-service');

const getSelfServiceState = createFeatureSelector<IAbsenceState>('absence');

export const getLeaveCancelApprovedState = createSelector(getSelfServiceState, (state: ISelfServiceState) => state.leaveCancelApproved);

export const isProcessingLeaveCancelApproved = createSelector(
  getLeaveCancelApprovedState,
  (state: ILeaveCancelApprovedState) => state.isProcessing
);

export const showEditorLeaveCancelApproved = createSelector(
  getLeaveCancelApprovedState,
  (state: ILeaveCancelApprovedState) => state.showEditor
);

