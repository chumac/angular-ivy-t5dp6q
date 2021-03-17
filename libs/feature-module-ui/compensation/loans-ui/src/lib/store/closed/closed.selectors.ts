import { createSelector } from '@ngrx/store';

import { ILoanState, getLoanState} from '../root/root.state';
import { IClosedState } from './closed.state';


export const getClosedState = createSelector(getLoanState, (state: ILoanState) => state.closed);


export const isLoadingClosed = createSelector(getClosedState, (state: IClosedState) => state.isLoading );

export const showViewerClosed = createSelector(getClosedState, (state: IClosedState) => state.showViewer);

export const getClosedData = createSelector(getClosedState, (state: IClosedState) => state.closedData);

export const showViewerGenericSchedule = createSelector(
  getClosedState,
  (state: IClosedState) => state.showGenericScheduleViewer
);

export const showViewerRepaymentSchedule = createSelector(
  getClosedState,
  (state: IClosedState) => state.showRepaymentScheduleViewer
);

export const getRepaymentSchedule = createSelector(
  getClosedState,
  (state: IClosedState) => state.repaymentScheduleData
);

export const getGenericSchedule = createSelector(
  getClosedState,
  (state: IClosedState) => state.genericScheduleData
);
