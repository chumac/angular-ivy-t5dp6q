import { Action } from '@ngrx/store';
import { ITransferHistory } from "@nutela/models/workforce/employee-profiles";

export enum TransferHistoryActionTypes {
  HR_SHOW_EDITOR = '[TRANSFER HISTORY (HR)] Show Editor',
  HR_HIDE_EDITOR = '[TRANSFER HISTORY (HR)] Hide Editor',

  HR_SHOW_VIEWER = '[TRANSFER HISTORY (HR)] Show Viewer',
  HR_HIDE_VIEWER = '[TRANSFER HISTORY (HR)] Hide Viewer',

  HR_PROCESSING = '[TRANSFER HISTORY (HR)] Processing',
  HR_NOT_PROCESSING = '[TRANSFER HISTORY (HR)] Not Processing',

  HR_LOAD_APPROVED_DATA = '[TRANSFER HISTORY (HR)] Load Approved Data',
  HR_LOAD_APPROVED_DATA_SUCCESS = '[TRANSFER HISTORY (HR)] Load Approved Data Success',
  HR_LOAD_APPROVED_DATA_FAILURE = '[TRANSFER HISTORY (HR)] Load Approved Data Failure',

  HR_LOAD_AWAITING_APPROVAL_DATA = '[TRANSFER HISTORY (HR)] Load Awaiting Approval Data',
  HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[TRANSFER HISTORY (HR)] Load Awaiting Approval Data Success',
  HR_LOAD_AWAITING_APPROVAL_DATA_FAILURE = '[TRANSFER HISTORY (HR)] Load Awaiting Approval Data Failure',

  HR_RESET_DATA = '[TRANSFER HISTORY (HR)] Reset Data'
}

export class ShowEditorTransferHistory implements Action {
  readonly type = TransferHistoryActionTypes.HR_SHOW_EDITOR;
}

export class HideEditorTransferHistory implements Action {
  readonly type = TransferHistoryActionTypes.HR_HIDE_EDITOR;
}

export class ShowViewerTransferHistory implements Action {
  readonly type = TransferHistoryActionTypes.HR_SHOW_VIEWER;
}

export class HideViewerTransferHistory implements Action {
  readonly type = TransferHistoryActionTypes.HR_HIDE_VIEWER;
}

export class ProcessingTransferHistory implements Action {
  readonly type = TransferHistoryActionTypes.HR_PROCESSING;
}

export class NotProcessingTransferHistory implements Action {
  readonly type = TransferHistoryActionTypes.HR_NOT_PROCESSING;
}

export class LoadApprovedDataTransferHistory implements Action {
  readonly type = TransferHistoryActionTypes.HR_LOAD_APPROVED_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadApprovedDataTransferHistorySuccess implements Action {
  readonly type = TransferHistoryActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: ITransferHistory[]) {}
}

export class LoadAwaitingApprovalDataTransferHistory implements Action {
  readonly type = TransferHistoryActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadAwaitingApprovalDataTransferHistorySuccess implements Action {
  readonly type = TransferHistoryActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: ITransferHistory[]) {}
}

export class ResetTransferHistoryData implements Action {
  readonly type = TransferHistoryActionTypes.HR_RESET_DATA;
}

export type TransferHistoryActions = 
  | ShowEditorTransferHistory
  | HideEditorTransferHistory
  | ShowViewerTransferHistory
  | HideViewerTransferHistory
  | ProcessingTransferHistory
  | NotProcessingTransferHistory
  | LoadApprovedDataTransferHistory
  | LoadApprovedDataTransferHistorySuccess
  | LoadAwaitingApprovalDataTransferHistory
  | LoadAwaitingApprovalDataTransferHistorySuccess
  | ResetTransferHistoryData;