import { Action } from '@ngrx/store';
import { ILoanHistory } from "@nutela/models/workforce/employee-profiles";

export enum LoanHistoryActionTypes {
  HR_SHOW_EDITOR = '[LOAN HISTORY (HR)] Show Editor',
  HR_HIDE_EDITOR = '[LOAN HISTORY (HR)] Hide Editor',

  HR_SHOW_VIEWER = '[LOAN HISTORY (HR)] Show Viewer',
  HR_HIDE_VIEWER = '[LOAN HISTORY (HR)] Hide Viewer',

  HR_PROCESSING = '[LOAN HISTORY (HR)] Processing',
  HR_NOT_PROCESSING = '[LOAN HISTORY (HR)] Not Processing',

  HR_LOAD_APPROVED_DATA = '[LOAN HISTORY (HR)] Load Approved Data',
  HR_LOAD_APPROVED_DATA_SUCCESS = '[LOAN HISTORY (HR)] Load Approved Data Success',
  HR_LOAD_APPROVED_DATA_FAILURE = '[LOAN HISTORY (HR)] Load Approved Data Failure',

  HR_LOAD_AWAITING_APPROVAL_DATA = '[LOAN HISTORY (HR)] Load Awaiting Approval Data',
  HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[LOAN HISTORY (HR)] Load Awaiting Approval Data Success',
  HR_LOAD_AWAITING_APPROVAL_DATA_FAILURE = '[LOAN HISTORY (HR)] Load Awaiting Approval Data Failure',

  HR_RESET_DATA = '[LOAN HISTORY (HR)] Reset Data'
}

export class ShowEditorLoanHistory implements Action {
  readonly type = LoanHistoryActionTypes.HR_SHOW_EDITOR;
}

export class HideEditorLoanHistory implements Action {
  readonly type = LoanHistoryActionTypes.HR_HIDE_EDITOR;
}

export class ShowViewerLoanHistory implements Action {
  readonly type = LoanHistoryActionTypes.HR_SHOW_VIEWER;
}

export class HideViewerLoanHistory implements Action {
  readonly type = LoanHistoryActionTypes.HR_HIDE_VIEWER;
}

export class ProcessingLoanHistory implements Action {
  readonly type = LoanHistoryActionTypes.HR_PROCESSING;
}

export class NotProcessingLoanHistory implements Action {
  readonly type = LoanHistoryActionTypes.HR_NOT_PROCESSING;
}

export class LoadApprovedDataLoanHistory implements Action {
  readonly type = LoanHistoryActionTypes.HR_LOAD_APPROVED_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadApprovedDataLoanHistorySuccess implements Action {
  readonly type = LoanHistoryActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: ILoanHistory[]) {}
}

export class LoadAwaitingApprovalDataLoanHistory implements Action {
  readonly type = LoanHistoryActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadAwaitingApprovalDataLoanHistorySuccess implements Action {
  readonly type = LoanHistoryActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: ILoanHistory[]) {}
}

export class ResetLoanHistoryData implements Action {
  readonly type = LoanHistoryActionTypes.HR_RESET_DATA;
}

export type LoanHistoryActions = 
  | ShowEditorLoanHistory
  | HideEditorLoanHistory
  | ShowViewerLoanHistory
  | HideViewerLoanHistory
  | ProcessingLoanHistory
  | NotProcessingLoanHistory
  | LoadApprovedDataLoanHistory
  | LoadApprovedDataLoanHistorySuccess
  | LoadAwaitingApprovalDataLoanHistory
  | LoadAwaitingApprovalDataLoanHistorySuccess
  | ResetLoanHistoryData;