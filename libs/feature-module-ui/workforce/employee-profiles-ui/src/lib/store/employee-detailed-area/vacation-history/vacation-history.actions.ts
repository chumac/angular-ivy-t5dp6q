import { Action } from '@ngrx/store';
import { IVacationHistory } from "@nutela/models/workforce/employee-profiles";

export enum VacationHistoryActionTypes {
  HR_SHOW_EDITOR = '[VACATION HISTORY (HR)] Show Editor',
  HR_HIDE_EDITOR = '[VACATION HISTORY (HR)] Hide Editor',

  HR_SHOW_VIEWER = '[VACATION HISTORY (HR)] Show Viewer',
  HR_HIDE_VIEWER = '[VACATION HISTORY (HR)] Hide Viewer',

  HR_PROCESSING = '[VACATION HISTORY (HR)] Processing',
  HR_NOT_PROCESSING = '[VACATION HISTORY (HR)] Not Processing',

  HR_LOAD_APPROVED_DATA = '[VACATION HISTORY (HR)] Load Approved Data',
  HR_LOAD_APPROVED_DATA_SUCCESS = '[VACATION HISTORY (HR)] Load Approved Data Success',
  HR_LOAD_APPROVED_DATA_FAILURE = '[VACATION HISTORY (HR)] Load Approved Data Failure',

  HR_LOAD_AWAITING_APPROVAL_DATA = '[VACATION HISTORY (HR)] Load Awaiting Approval Data',
  HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[VACATION HISTORY (HR)] Load Awaiting Approval Data Success',
  HR_LOAD_AWAITING_APPROVAL_DATA_FAILURE = '[VACATION HISTORY (HR)] Load Awaiting Approval Data Failure',

  HR_RESET_DATA = '[VACATION HISTORY (HR)] Reset Data'
}

export class ShowEditorVacationHistory implements Action {
  readonly type = VacationHistoryActionTypes.HR_SHOW_EDITOR;
}

export class HideEditorVacationHistory implements Action {
  readonly type = VacationHistoryActionTypes.HR_HIDE_EDITOR;
}

export class ShowViewerVacationHistory implements Action {
  readonly type = VacationHistoryActionTypes.HR_SHOW_VIEWER;
}

export class HideViewerVacationHistory implements Action {
  readonly type = VacationHistoryActionTypes.HR_HIDE_VIEWER;
}

export class ProcessingVacationHistory implements Action {
  readonly type = VacationHistoryActionTypes.HR_PROCESSING;
}

export class NotProcessingVacationHistory implements Action {
  readonly type = VacationHistoryActionTypes.HR_NOT_PROCESSING;
}

export class LoadApprovedDataVacationHistory implements Action {
  readonly type = VacationHistoryActionTypes.HR_LOAD_APPROVED_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadApprovedDataVacationHistorySuccess implements Action {
  readonly type = VacationHistoryActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IVacationHistory[]) {}
}

export class LoadAwaitingApprovalDataVacationHistory implements Action {
  readonly type = VacationHistoryActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadAwaitingApprovalDataVacationHistorySuccess implements Action {
  readonly type = VacationHistoryActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IVacationHistory[]) {}
}

export class ResetVacationHistoryData implements Action {
  readonly type = VacationHistoryActionTypes.HR_RESET_DATA;
}

export type VacationHistoryActions = 
  | ShowEditorVacationHistory
  | HideEditorVacationHistory
  | ShowViewerVacationHistory
  | HideViewerVacationHistory
  | ProcessingVacationHistory
  | NotProcessingVacationHistory
  | LoadApprovedDataVacationHistory
  | LoadApprovedDataVacationHistorySuccess
  | LoadAwaitingApprovalDataVacationHistory
  | LoadAwaitingApprovalDataVacationHistorySuccess
  | ResetVacationHistoryData;