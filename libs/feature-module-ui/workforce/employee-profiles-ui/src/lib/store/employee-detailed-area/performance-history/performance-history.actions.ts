import { Action } from '@ngrx/store';
import { IPerformanceHistory } from "@nutela/models/workforce/employee-profiles";

export enum PerformanceHistoryActionTypes {
  HR_SHOW_EDITOR = '[PERFORMANCE HISTORY (HR)] Show Editor',
  HR_HIDE_EDITOR = '[PERFORMANCE HISTORY (HR)] Hide Editor',

  HR_SHOW_VIEWER = '[PERFORMANCE HISTORY (HR)] Show Viewer',
  HR_HIDE_VIEWER = '[PERFORMANCE HISTORY (HR)] Hide Viewer',

  HR_PROCESSING = '[PERFORMANCE HISTORY (HR)] Processing',
  HR_NOT_PROCESSING = '[PERFORMANCE HISTORY (HR)] Not Processing',

  HR_LOAD_APPROVED_DATA = '[PERFORMANCE HISTORY (HR)] Load Approved Data',
  HR_LOAD_APPROVED_DATA_SUCCESS = '[PERFORMANCE HISTORY (HR)] Load Approved Data Success',
  HR_LOAD_APPROVED_DATA_FAILURE = '[PERFORMANCE HISTORY (HR)] Load Approved Data Failure',

  HR_LOAD_AWAITING_APPROVAL_DATA = '[PERFORMANCE HISTORY (HR)] Load Awaiting Approval Data',
  HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[PERFORMANCE HISTORY (HR)] Load Awaiting Approval Data Success',
  HR_LOAD_AWAITING_APPROVAL_DATA_FAILURE = '[PERFORMANCE HISTORY (HR)] Load Awaiting Approval Data Failure',

  HR_RESET_DATA = '[PERFORMANCE HISTORY (HR)] Reset Data'
}

export class ShowEditorPerformanceHistory implements Action {
  readonly type = PerformanceHistoryActionTypes.HR_SHOW_EDITOR;
}

export class HideEditorPerformanceHistory implements Action {
  readonly type = PerformanceHistoryActionTypes.HR_HIDE_EDITOR;
}

export class ShowViewerPerformanceHistory implements Action {
  readonly type = PerformanceHistoryActionTypes.HR_SHOW_VIEWER;
}

export class HideViewerPerformanceHistory implements Action {
  readonly type = PerformanceHistoryActionTypes.HR_HIDE_VIEWER;
}

export class ProcessingPerformanceHistory implements Action {
  readonly type = PerformanceHistoryActionTypes.HR_PROCESSING;
}

export class NotProcessingPerformanceHistory implements Action {
  readonly type = PerformanceHistoryActionTypes.HR_NOT_PROCESSING;
}

export class LoadApprovedDataPerformanceHistory implements Action {
  readonly type = PerformanceHistoryActionTypes.HR_LOAD_APPROVED_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadApprovedDataPerformanceHistorySuccess implements Action {
  readonly type = PerformanceHistoryActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IPerformanceHistory[]) {}
}

export class LoadAwaitingApprovalDataPerformanceHistory implements Action {
  readonly type = PerformanceHistoryActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadAwaitingApprovalDataPerformanceHistorySuccess implements Action {
  readonly type = PerformanceHistoryActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IPerformanceHistory[]) {}
}

export class ResetPerformanceHistoryData implements Action {
  readonly type = PerformanceHistoryActionTypes.HR_RESET_DATA;
}

export type PerformanceHistoryActions = 
  | ShowEditorPerformanceHistory
  | HideEditorPerformanceHistory
  | ShowViewerPerformanceHistory
  | HideViewerPerformanceHistory
  | ProcessingPerformanceHistory
  | NotProcessingPerformanceHistory
  | LoadApprovedDataPerformanceHistory
  | LoadApprovedDataPerformanceHistorySuccess
  | LoadAwaitingApprovalDataPerformanceHistory
  | LoadAwaitingApprovalDataPerformanceHistorySuccess
  | ResetPerformanceHistoryData;