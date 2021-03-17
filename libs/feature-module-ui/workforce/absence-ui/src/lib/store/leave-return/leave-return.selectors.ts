import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILeaveReturnState } from './leave-return.state';

import { IAbsenceState } from '../root';

export const getState = createFeatureSelector<IAbsenceState>('absence');

export const getLeaveReturnState = createSelector(getState, (state: IAbsenceState) => state.leaveReturn);

export const isProcessingLeaveReturn = createSelector(
  getLeaveReturnState,
  (state: ILeaveReturnState) => state.isProcessing
);

export const isLoadingLeaveReturn = createSelector(
  getLeaveReturnState,
  (state: ILeaveReturnState) => state.isLoading
);

export const showEditorLeaveReturn = createSelector(
  getLeaveReturnState,
  (state: ILeaveReturnState) => state.showEditor
);

