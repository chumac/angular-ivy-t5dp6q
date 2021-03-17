import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILeaveCancelApprovedState } from './leave-cancel-approved.state';

import { IAbsenceState } from '../root';

export const getState = createFeatureSelector<IAbsenceState>('absence');

export const getLeaveCancelApprovedState = createSelector(getState, (state: IAbsenceState) => state.leaveCancelApproved);

export const isProcessingLeaveCancelApproved = createSelector(
  getLeaveCancelApprovedState,
  (state: ILeaveCancelApprovedState) => state.isProcessing
);

export const showEditorLeaveCancelApproved = createSelector(
  getLeaveCancelApprovedState,
  (state: ILeaveCancelApprovedState) => state.showEditor
);

