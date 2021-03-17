import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILeaveProrateState } from './leave-proration.state';

import { IAbsenceState } from '../../root';

export const getStateProrate = createFeatureSelector<IAbsenceState>('absence');

export const getLeaveProrateState = createSelector(getStateProrate, (state: IAbsenceState) => state.leaveProrate);

export const isProcessingLeaveProrate = createSelector(
  getLeaveProrateState,
  (state: ILeaveProrateState) => state.isProcessing
);

export const isLoadingLeaveProrate = createSelector(
  getLeaveProrateState,
  (state: ILeaveProrateState) => state.isLoading
);

export const showEditorLeaveProrate = createSelector(
  getLeaveProrateState,
  (state: ILeaveProrateState) => state.showEditor
);

export const getLeaveProrateData = createSelector(
  getLeaveProrateState,
  (state: ILeaveProrateState) => state.prorateData
);


