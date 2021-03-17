import { Action } from '@ngrx/store';
import { ISeparation } from "@nutela/models/workforce/employee-profiles";

export enum SeparationActionTypes {
  HR_SHOW_EDITOR = '[Separation (HR)] Show Editor',
  HR_HIDE_EDITOR = '[Separation (HR)] Hide Editor',

  HR_SHOW_VIEWER = '[Separation (HR)] Show Viewer',
  HR_HIDE_VIEWER = '[Separation (HR)] Hide Viewer',

  HR_PROCESSING = '[Separation (HR)] Processing',
  HR_NOT_PROCESSING = '[Separation (HR)] Not Processing',

  HR_LOAD_APPROVED_DATA = '[Separation (HR)] Load Approved Data',
  HR_LOAD_APPROVED_DATA_SUCCESS = '[Separation (HR)] Load Approved Data Success',
  HR_LOAD_APPROVED_DATA_FAILURE = '[Separation (HR)] Load Approved Data Failure',

  HR_LOAD_AWAITING_APPROVAL_DATA = '[Separation (HR)] Load Awaiting Approval Data',
  HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[Separation (HR)] Load Awaiting Approval Data Success',
  HR_LOAD_AWAITING_APPROVAL_DATA_FAILURE = '[Separation (HR)] Load Awaiting Approval Data Failure',

  HR_RESET_DATA = '[Separation (HR)] Reset Data'
}

export class ShowEditorSeparation implements Action {
  readonly type = SeparationActionTypes.HR_SHOW_EDITOR;
}

export class HideEditorSeparation implements Action {
  readonly type = SeparationActionTypes.HR_HIDE_EDITOR;
}

export class ShowViewerSeparation implements Action {
  readonly type = SeparationActionTypes.HR_SHOW_VIEWER;
}

export class HideViewerSeparation implements Action {
  readonly type = SeparationActionTypes.HR_HIDE_VIEWER;
}

export class ProcessingSeparation implements Action {
  readonly type = SeparationActionTypes.HR_PROCESSING;
}

export class NotProcessingSeparation implements Action {
  readonly type = SeparationActionTypes.HR_NOT_PROCESSING;
}

export class LoadApprovedDataSeparation implements Action {
  readonly type = SeparationActionTypes.HR_LOAD_APPROVED_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadApprovedDataSeparationSuccess implements Action {
  readonly type = SeparationActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: ISeparation[]) {}
}

export class LoadAwaitingApprovalDataSeparation implements Action {
  readonly type = SeparationActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadAwaitingApprovalDataSeparationSuccess implements Action {
  readonly type = SeparationActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: ISeparation[]) {}
}

export class ResetSeparationData implements Action {
  readonly type = SeparationActionTypes.HR_RESET_DATA;
}

export type SeparationActions = 
  | ShowEditorSeparation
  | HideEditorSeparation
  | ShowViewerSeparation
  | HideViewerSeparation
  | ProcessingSeparation
  | NotProcessingSeparation
  | LoadApprovedDataSeparation
  | LoadApprovedDataSeparationSuccess
  | LoadAwaitingApprovalDataSeparation
  | LoadAwaitingApprovalDataSeparationSuccess
  | ResetSeparationData;