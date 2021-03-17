import { createSelector } from '@ngrx/store';

import { IClosedState } from './closed.state';
import { getRootState, IRootState } from '../root/root.state';

export const getClosedScheduleState = createSelector(
  getRootState,
  (state: IRootState) => state.closed
);

export const isLoadingClosedSchedule = createSelector(
  getClosedScheduleState,
  (state: IClosedState) => state.isLoading
);

export const showClosedScheduleViewer = createSelector(
  getClosedScheduleState,
  (state: IClosedState) => state.showViewer
);

export const getClosedScheduleData = createSelector(
  getClosedScheduleState,
  (state: IClosedState) => state.closedData
);
