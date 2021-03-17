import { createSelector } from '@ngrx/store';

import { IClosureState } from './Closure.state';
import { ILoanState, getLoanState} from '../root/root.state';


export const getClosureState = createSelector(getLoanState, (state: ILoanState) => state.closure);

export const isProcessingClosure = createSelector(getClosureState, (state: IClosureState) => state.isProcessing );

export const isLoadingClosure = createSelector(getClosureState, (state: IClosureState) => state.isLoading );

export const showEditorClosure = createSelector(getClosureState, (state: IClosureState) => state.showEditor);

export const showViewerClosure = createSelector(getClosureState, (state: IClosureState) => state.showViewer);

export const getApplicationsDataClosures = createSelector(getClosureState, (state: IClosureState) => state.applicationsData);

export const getAwatingApprovalDataClosures = createSelector(getClosureState, (state: IClosureState) => state.closuresAwaitingApprovalData);

export const showViewerRepaymentSchedule = createSelector(
  getClosureState,
  (state: IClosureState) => state.showRepaymentScheduleViewer
);

export const showViewerGenericSchedule = createSelector(
  getClosureState,
  (state: IClosureState) => state.showGenericScheduleViewer
);

export const getRepaymentSchedule = createSelector(
  getClosureState,
  (state: IClosureState) => state.repaymentScheduleData
);

export const getGenericSchedule = createSelector(
  getClosureState,
  (state: IClosureState) => state.genericScheduleData
);
