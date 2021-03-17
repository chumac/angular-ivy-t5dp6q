import { Action } from '@ngrx/store';
import { IDisciplinaryAction } from "@nutela/models/workforce/employee-profiles";

export enum DisciplinaryActionActionTypes {
  HR_SHOW_EDITOR = '[DISCIPLINARY ACTION (HR)] Show Editor',
  HR_HIDE_EDITOR = '[DISCIPLINARY ACTION (HR)] Hide Editor',

  HR_SHOW_VIEWER = '[DISCIPLINARY ACTION (HR)] Show Viewer',
  HR_HIDE_VIEWER = '[DISCIPLINARY ACTION (HR)] Hide Viewer',

  HR_PROCESSING = '[DISCIPLINARY ACTION (HR)] Processing',
  HR_NOT_PROCESSING = '[DISCIPLINARY ACTION (HR)] Not Processing',

  HR_LOAD_APPROVED_DATA = '[DISCIPLINARY ACTION (HR)] Load Approved Data',
  HR_LOAD_APPROVED_DATA_SUCCESS = '[DISCIPLINARY ACTION (HR)] Load Approved Data Success',
  HR_LOAD_APPROVED_DATA_FAILURE = '[DISCIPLINARY ACTION (HR)] Load Approved Data Failure',

  HR_LOAD_AWAITING_APPROVAL_DATA = '[DISCIPLINARY ACTION (HR)] Load Awaiting Approval Data',
  HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[DISCIPLINARY ACTION (HR)] Load Awaiting Approval Data Success',
  HR_LOAD_AWAITING_APPROVAL_DATA_FAILURE = '[DISCIPLINARY ACTION (HR)] Load Awaiting Approval Data Failure',

  HR_RESET_DATA = '[DISCIPLINARY ACTION (HR)] Reset Data'
}

export class ShowEditorDisciplinaryAction implements Action {
  readonly type = DisciplinaryActionActionTypes.HR_SHOW_EDITOR;
}

export class HideEditorDisciplinaryAction implements Action {
  readonly type = DisciplinaryActionActionTypes.HR_HIDE_EDITOR;
}

export class ShowViewerDisciplinaryAction implements Action {
  readonly type = DisciplinaryActionActionTypes.HR_SHOW_VIEWER;
}

export class HideViewerDisciplinaryAction implements Action {
  readonly type = DisciplinaryActionActionTypes.HR_HIDE_VIEWER;
}

export class ProcessingDisciplinaryAction implements Action {
  readonly type = DisciplinaryActionActionTypes.HR_PROCESSING;
}

export class NotProcessingDisciplinaryAction implements Action {
  readonly type = DisciplinaryActionActionTypes.HR_NOT_PROCESSING;
}

export class LoadApprovedDataDisciplinaryAction implements Action {
  readonly type = DisciplinaryActionActionTypes.HR_LOAD_APPROVED_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadApprovedDataDisciplinaryActionSuccess implements Action {
  readonly type = DisciplinaryActionActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: IDisciplinaryAction[]) {}
}

export class LoadAwaitingApprovalDataDisciplinaryAction implements Action {
  readonly type = DisciplinaryActionActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadAwaitingApprovalDataDisciplinaryActionSuccess implements Action {
  readonly type = DisciplinaryActionActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: IDisciplinaryAction[]) {}
}

export class ResetDisciplinaryActionData implements Action {
  readonly type = DisciplinaryActionActionTypes.HR_RESET_DATA;
}

export type DisciplinaryActionActions = 
  | ShowEditorDisciplinaryAction
  | HideEditorDisciplinaryAction
  | ShowViewerDisciplinaryAction
  | HideViewerDisciplinaryAction
  | ProcessingDisciplinaryAction
  | NotProcessingDisciplinaryAction
  | LoadApprovedDataDisciplinaryAction
  | LoadApprovedDataDisciplinaryActionSuccess
  | LoadAwaitingApprovalDataDisciplinaryAction
  | LoadAwaitingApprovalDataDisciplinaryActionSuccess
  | ResetDisciplinaryActionData;