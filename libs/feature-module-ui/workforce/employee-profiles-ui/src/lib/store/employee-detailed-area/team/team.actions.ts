import { Action } from '@ngrx/store';
import { ITeam } from "@nutela/models/workforce/employee-profiles";

export enum TeamActionTypes {
  HR_SHOW_EDITOR = '[TEAM (HR)] Show Editor',
  HR_HIDE_EDITOR = '[TEAM (HR)] Hide Editor',

  HR_SHOW_VIEWER = '[TEAM (HR)] Show Viewer',
  HR_HIDE_VIEWER = '[TEAM (HR)] Hide Viewer',

  HR_PROCESSING = '[TEAM (HR)] Processing',
  HR_NOT_PROCESSING = '[TEAM (HR)] Not Processing',

  HR_LOAD_APPROVED_DATA = '[TEAM (HR)] Load Approved Data',
  HR_LOAD_APPROVED_DATA_SUCCESS = '[TEAM (HR)] Load Approved Data Success',
  HR_LOAD_APPROVED_DATA_FAILURE = '[TEAM (HR)] Load Approved Data Failure',

  HR_LOAD_AWAITING_APPROVAL_DATA = '[TEAM (HR)] Load Awaiting Approval Data',
  HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[TEAM (HR)] Load Awaiting Approval Data Success',
  HR_LOAD_AWAITING_APPROVAL_DATA_FAILURE = '[TEAM (HR)] Load Awaiting Approval Data Failure',

  HR_RESET_DATA = '[TEAM (HR)] Reset Data'
}

export class ShowEditorTeam implements Action {
  readonly type = TeamActionTypes.HR_SHOW_EDITOR;
}

export class HideEditorTeam implements Action {
  readonly type = TeamActionTypes.HR_HIDE_EDITOR;
}

export class ShowViewerTeam implements Action {
  readonly type = TeamActionTypes.HR_SHOW_VIEWER;
}

export class HideViewerTeam implements Action {
  readonly type = TeamActionTypes.HR_HIDE_VIEWER;
}

export class ProcessingTeam implements Action {
  readonly type = TeamActionTypes.HR_PROCESSING;
}

export class NotProcessingTeam implements Action {
  readonly type = TeamActionTypes.HR_NOT_PROCESSING;
}

export class LoadApprovedDataTeam implements Action {
  readonly type = TeamActionTypes.HR_LOAD_APPROVED_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadApprovedDataTeamSuccess implements Action {
  readonly type = TeamActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: ITeam[]) {}
}

export class LoadAwaitingApprovalDataTeam implements Action {
  readonly type = TeamActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadAwaitingApprovalDataTeamSuccess implements Action {
  readonly type = TeamActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: ITeam[]) {}
}

export class ResetTeamData implements Action {
  readonly type = TeamActionTypes.HR_RESET_DATA;
}

export type TeamActions = 
  | ShowEditorTeam
  | HideEditorTeam
  | ShowViewerTeam
  | HideViewerTeam
  | ProcessingTeam
  | NotProcessingTeam
  | LoadApprovedDataTeam
  | LoadApprovedDataTeamSuccess
  | LoadAwaitingApprovalDataTeam
  | LoadAwaitingApprovalDataTeamSuccess
  | ResetTeamData;