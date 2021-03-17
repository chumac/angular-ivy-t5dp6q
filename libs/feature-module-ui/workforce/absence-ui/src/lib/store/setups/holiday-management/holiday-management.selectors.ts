import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IPublicHolidayState } from './holiday-management.state';
import { IAbsenceState } from '../../root';


export const getStateHoliday = createFeatureSelector<IAbsenceState>('absence');

export const getPublicHolidayState = createSelector(getStateHoliday, (state: IAbsenceState) => state.holiday);

export const isProcessingPublicHoliday = createSelector(
  getPublicHolidayState,
  (state: IPublicHolidayState) => state.isProcessing
);

export const isLoadingPublicHoliday = createSelector(
  getPublicHolidayState,
  (state: IPublicHolidayState) => state.isLoading
);

export const showEditorPublicHoliday = createSelector(
  getPublicHolidayState,
  (state: IPublicHolidayState) => state.showEditor
);

export const getPublicHolidayData = createSelector(
  getPublicHolidayState,
  (state: IPublicHolidayState) => state.holidayData
);


