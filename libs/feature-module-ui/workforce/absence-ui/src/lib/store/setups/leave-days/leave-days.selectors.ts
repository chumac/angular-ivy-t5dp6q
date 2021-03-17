import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILeaveDaysState } from './leave-days.state';
import { IAbsenceState } from '../../root';



export const getStateDays = createFeatureSelector<IAbsenceState>('absence');

export const getLeaveDaysState = createSelector(getStateDays, (state: IAbsenceState) => state.leaveDays);

export const isProcessingLeaveDays = createSelector(
  getLeaveDaysState,
  (state: ILeaveDaysState) => state.isProcessing
);

export const showEditorLeaveDays = createSelector(
  getLeaveDaysState,
  (state: ILeaveDaysState) => state.showEditor
);

export const getLeaveDaysData = createSelector(
  getLeaveDaysState,
  (state: ILeaveDaysState) => state.daysData
);


