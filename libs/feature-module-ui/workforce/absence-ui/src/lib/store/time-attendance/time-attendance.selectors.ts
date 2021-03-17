import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ITimeAttendanceState } from './time-attendance.state';
import { IAbsenceState } from '../root';

export const getState = createFeatureSelector<IAbsenceState>('absence');

export const getTimeAttendanceState = createSelector(getState, (state: IAbsenceState) => state.timeAttendance);

export const isProcessingTimeAttendance = createSelector(
  getTimeAttendanceState,
  (state: ITimeAttendanceState) => state.isProcessing
);

export const isLoadingTimeAttendance = createSelector(
  getTimeAttendanceState,
  (state: ITimeAttendanceState) => state.isLoading
);

export const showEditorTimeAttendance = createSelector(
  getTimeAttendanceState,
  (state: ITimeAttendanceState) => state.showEditor
);

export const showViewerTimeAttendance = createSelector(
  getTimeAttendanceState,
  (state: ITimeAttendanceState) => state.showViewer
);

export const getTimeAttendanceData = createSelector(
  getTimeAttendanceState,
  (state: ITimeAttendanceState) => state.timeAttendanceData
);

export const getTimeAttendanceDataStatusList = createSelector(
  getTimeAttendanceState,
  (state: ITimeAttendanceState) => state.attendanceStatuslist
);
