import { Action } from '@ngrx/store';
import { IConfirmationInformation } from "@nutela/models/workforce/employee-profiles";

export enum ConfirmationInformationActionTypes {
  HR_SHOW_EDITOR = '[CONFIRMATION INFORMATION (HR)] Show Editor',
  HR_HIDE_EDITOR = '[CONFIRMATION INFORMATION (HR)] Hide Editor',

  HR_SHOW_VIEWER = '[CONFIRMATION INFORMATION (HR)] Show Viewer',
  HR_HIDE_VIEWER = '[CONFIRMATION INFORMATION (HR)] Hide Viewer',

  HR_PROCESSING = '[CONFIRMATION INFORMATION (HR)] Processing',
  HR_NOT_PROCESSING = '[CONFIRMATION INFORMATION (HR)] Not Processing',

  HR_LOAD_APPROVED_DATA = '[CONFIRMATION INFORMATION (HR)] Load Approved Data',
  HR_LOAD_APPROVED_DATA_SUCCESS = '[CONFIRMATION INFORMATION (HR)] Load Approved Data Success',
  HR_LOAD_APPROVED_DATA_FAILURE = '[CONFIRMATION INFORMATION (HR)] Load Approved Data Failure',

  HR_LOAD_AWAITING_APPROVAL_DATA = '[CONFIRMATION INFORMATION (HR)] Load Awaiting Approval Data',
  HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[CONFIRMATION INFORMATION (HR)] Load Awaiting Approval Data Success',
  HR_LOAD_AWAITING_APPROVAL_DATA_FAILURE = '[CONFIRMATION INFORMATION (HR)] Load Awaiting Approval Data Failure',

  HR_RESET_DATA = '[CONFIRMATION INFORMATION (HR)] Reset Data'
}

export class ShowEditorConfirmationInformation implements Action {
  readonly type = ConfirmationInformationActionTypes.HR_SHOW_EDITOR;
}

export class HideEditorConfirmationInformation implements Action {
  readonly type = ConfirmationInformationActionTypes.HR_HIDE_EDITOR;
}

export class ShowViewerConfirmationInformation implements Action {
  readonly type = ConfirmationInformationActionTypes.HR_SHOW_VIEWER;
}

export class HideViewerConfirmationInformation implements Action {
  readonly type = ConfirmationInformationActionTypes.HR_HIDE_VIEWER;
}

export class ProcessingConfirmationInformation implements Action {
  readonly type = ConfirmationInformationActionTypes.HR_PROCESSING;
}

export class NotProcessingConfirmationInformation implements Action {
  readonly type = ConfirmationInformationActionTypes.HR_NOT_PROCESSING;
}

export class LoadApprovedDataConfirmationInformation implements Action {
  readonly type = ConfirmationInformationActionTypes.HR_LOAD_APPROVED_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadApprovedDataConfirmationInformationSuccess implements Action {
  readonly type = ConfirmationInformationActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IConfirmationInformation[]) {}
}

export class LoadAwaitingApprovalDataConfirmationInformation implements Action {
  readonly type = ConfirmationInformationActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadAwaitingApprovalDataConfirmationInformationSuccess implements Action {
  readonly type = ConfirmationInformationActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IConfirmationInformation[]) {}
}

export class ResetConfirmationInformationData implements Action {
  readonly type = ConfirmationInformationActionTypes.HR_RESET_DATA;
}

export type ConfirmationInformationActions = 
  | ShowEditorConfirmationInformation
  | HideEditorConfirmationInformation
  | ShowViewerConfirmationInformation
  | HideViewerConfirmationInformation
  | ProcessingConfirmationInformation
  | NotProcessingConfirmationInformation
  | LoadApprovedDataConfirmationInformation
  | LoadApprovedDataConfirmationInformationSuccess
  | LoadAwaitingApprovalDataConfirmationInformation
  | LoadAwaitingApprovalDataConfirmationInformationSuccess
  | ResetConfirmationInformationData;