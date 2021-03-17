import { createSelector } from '@ngrx/store';

import { ICompletedState } from './completed.state';
import { getRootState, IRootState } from '../root/root.state';

export const getCompletedScheduleState = createSelector(
  getRootState,
  (state: IRootState) => state.completed
);

export const isLoadingCompletedSchedule = createSelector(
  getCompletedScheduleState,
  (state: ICompletedState) => state.isLoading
);

export const showCompletedScheduleViewer = createSelector(
  getCompletedScheduleState,
  (state: ICompletedState) => state.showViewer
);

export const getCompletedScheduleData = createSelector(
  getCompletedScheduleState,
  (state: ICompletedState) => state.completedData
);
