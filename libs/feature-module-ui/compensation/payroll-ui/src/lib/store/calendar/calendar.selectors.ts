import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ICalendarState } from './calendar.state';
import { IRootState } from '../root/root.state';


const getState = createFeatureSelector<IRootState>('payroll');
const getCalendarState = createSelector(getState, (state: IRootState) => state.calendar);

export const getCalendar = createSelector(
  getCalendarState,
  (state: ICalendarState) => state.allData
);

export const getCalendarGlobal = createSelector(
  getCalendarState,
  (state: ICalendarState) => state.globalData
);

export const getCalendarGroup = createSelector(
  getCalendarState,
  (state: ICalendarState) => state.groupData
);

export const getCalendarEmployee = createSelector(
  getCalendarState,
  (state: ICalendarState) => state.personalData
);

export const getSingleCalendar = createSelector(
  getCalendarState,
  (state: ICalendarState) => state.singleData
);

export const showEditorCalendar = createSelector(
  getCalendarState,
  (state: ICalendarState) => state.showEditor
);

export const showViewerCalendar = createSelector(
  getCalendarState,
  (state: ICalendarState) => state.showViewer
);

export const showEditorProfileCalendar = createSelector(
  getCalendarState,
  (state: ICalendarState) => state.showProfileEditor
);


export const isProcessingCalendar = createSelector(
  getCalendarState,
  (state: ICalendarState) => state.isProcessing
);

export const isLoadingCalendar = createSelector(
  getCalendarState,
  (state: ICalendarState) => state.isLoading
);

export const getPayrollProfilesCalendar = createSelector(
  getCalendarState,
  (state: ICalendarState) => state.payProfiles
);

export const getPayrollProfileListCalendar = createSelector(
  getCalendarState,
  (state: ICalendarState) => state.payProfileList
);

export const getAllowanceListCalendar = createSelector(
  getCalendarState,
  (state: ICalendarState) => state.allowanceList
);

export const getDeductionListCalendar = createSelector(
  getCalendarState,
  (state: ICalendarState) => state.deductionList
);

export const getPaygroupListCalendar = createSelector(
  getCalendarState,
  (state: ICalendarState) => state.paygroupList
);
