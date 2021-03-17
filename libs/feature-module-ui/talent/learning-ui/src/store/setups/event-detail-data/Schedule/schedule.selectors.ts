import { createSelector, createFeatureSelector } from '@ngrx/store';
import { getLearningState, ILearningState } from '../../../root/learning.state';
import { IEventScheduleState } from './schedule.state';

export const getEventScheduleState = createSelector(
  getLearningState,
  (state: ILearningState) => state.eventSchedule
);

export const isLoadingEventSchedule = createSelector(
  getEventScheduleState,
  (state: IEventScheduleState) => state.isLoading
);

export const getEventScheduleData = createSelector(
  getEventScheduleState,
  (state: IEventScheduleState) => state.eventSchedule
);

export const isProcessingEventSchedule = createSelector(
  getEventScheduleState,
  (state: IEventScheduleState) => state.isProcessing
);

export const showEventScheduleEditor = createSelector(
  getEventScheduleState,
  (state: IEventScheduleState) => state.showEventScheduleEditor
);

export const getEventHallData = createSelector(
  getEventScheduleState,
  (state: IEventScheduleState) => state.eventHall
);

export const showEventScheduleView = createSelector(
  getEventScheduleState,
  (state: IEventScheduleState) => state.showEventScheduleView
);