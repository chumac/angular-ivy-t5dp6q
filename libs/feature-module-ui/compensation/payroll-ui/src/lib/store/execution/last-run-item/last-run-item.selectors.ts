import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILastRunItemState } from './last-run-item.state';
import { IRootState } from '../../root/root.state';


const getState = createFeatureSelector<IRootState>('payroll');
const getLastRunItemState = createSelector(getState, (state: IRootState) => state.lastRunItem);


export const showStatusViewer = createSelector(
  getLastRunItemState,
  (state: ILastRunItemState) => state.showStatusViewer
);

export const showFigureViewer = createSelector(
  getLastRunItemState,
  (state: ILastRunItemState) => state.showFigureViewer
);

export const showFinalizeEditor = createSelector(
  getLastRunItemState,
  (state: ILastRunItemState) => state.showFinalizeEditor
);

export const getLastRunData = createSelector(
  getLastRunItemState,
  (state: ILastRunItemState) => state.lastRuns
);

export const getLastRunStatusData = createSelector(
  getLastRunItemState,
  (state: ILastRunItemState) => state.lastRunStatus
);

export const getEmployeeData = createSelector(
  getLastRunItemState,
  (state: ILastRunItemState) => state.employeeData
);

export const getPayslipData = createSelector(
  getLastRunItemState,
  (state: ILastRunItemState) => state.payslipData
);

export const isProcessingLastRun = createSelector(
  getLastRunItemState,
  (state: ILastRunItemState) => state.isProcessing
);

export const isLoadingLastRun = createSelector(
  getLastRunItemState,
  (state: ILastRunItemState) => state.isLoading
);

export const getCanCancelData = createSelector(
  getLastRunItemState,
  (state: ILastRunItemState) => state.canCancel
);

export const getSendForApprovalMessageData = createSelector(
  getLastRunItemState,
  (state: ILastRunItemState) => state.sendForApprovalMessage
);

export const getByIdPayrollProfileData = createSelector(
  getLastRunItemState,
  (state: ILastRunItemState) => state.payrollProfile
);

export const getReportUrlData = createSelector(
  getLastRunItemState,
  (state: ILastRunItemState) => state.reportUrl
);
