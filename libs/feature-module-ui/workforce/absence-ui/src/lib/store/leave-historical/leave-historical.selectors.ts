import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILeaveHistoricalState } from './leave-historical.state';

import { IAbsenceState } from '../root';

export const getState = createFeatureSelector<IAbsenceState>('absence');

export const getLeaveHistoricalState = createSelector(getState, (state: IAbsenceState) => state.leaveHistorical);

export const isProcessingLeaveHistorical = createSelector(
  getLeaveHistoricalState,
  (state: ILeaveHistoricalState) => state.isProcessing
);

export const showEditorLeaveHistorical = createSelector(
  getLeaveHistoricalState,
  (state: ILeaveHistoricalState) => state.showEditor
);
