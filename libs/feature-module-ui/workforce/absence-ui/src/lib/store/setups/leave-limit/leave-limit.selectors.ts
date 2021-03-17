import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILeaveLimitsState } from './leave-limit.state';

import { IAbsenceState } from '../../root';

export const getStateLimit = createFeatureSelector<IAbsenceState>('absence');

export const getLeaveLimitsState = createSelector(getStateLimit, (state: IAbsenceState) => state.leaveLimit);

export const isProcessingLeaveLimits = createSelector(
  getLeaveLimitsState,
  (state: ILeaveLimitsState) => state.isProcessing
);

export const isLoadingLeaveLimits = createSelector(
  getLeaveLimitsState,
  (state: ILeaveLimitsState) => state.isLoading
);

export const showEditorLeaveLimits = createSelector(
  getLeaveLimitsState,
  (state: ILeaveLimitsState) => state.showEditor
);

export const getLeaveLimitsData = createSelector(
  getLeaveLimitsState,
  (state: ILeaveLimitsState) => state.limitData
);

export const getLeave = createSelector(
  getLeaveLimitsState,
  (state: ILeaveLimitsState) => state.leave
);

export const getGrade = createSelector(
  getLeaveLimitsState,
  (state: ILeaveLimitsState) => state.grade
);
