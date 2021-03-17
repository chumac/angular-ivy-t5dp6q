import { Action } from '@ngrx/store';
import { ICompetencyProfile } from "@nutela/models/workforce/employee-profiles";

export enum CompetencyProfileActionTypes {
  HR_SHOW_EDITOR = '[COMPETENCY PROFILE (HR)] Show Editor',
  HR_HIDE_EDITOR = '[COMPETENCY PROFILE (HR)] Hide Editor',

  HR_SHOW_VIEWER = '[COMPETENCY PROFILE (HR)] Show Viewer',
  HR_HIDE_VIEWER = '[COMPETENCY PROFILE (HR)] Hide Viewer',

  HR_PROCESSING = '[COMPETENCY PROFILE (HR)] Processing',
  HR_NOT_PROCESSING = '[COMPETENCY PROFILE (HR)] Not Processing',

  HR_LOAD_APPROVED_DATA = '[COMPETENCY PROFILE (HR)] Load Approved Data',
  HR_LOAD_APPROVED_DATA_SUCCESS = '[COMPETENCY PROFILE (HR)] Load Approved Data Success',
  HR_LOAD_APPROVED_DATA_FAILURE = '[COMPETENCY PROFILE (HR)] Load Approved Data Failure',

  HR_LOAD_AWAITING_APPROVAL_DATA = '[COMPETENCY PROFILE (HR)] Load Awaiting Approval Data',
  HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[COMPETENCY PROFILE (HR)] Load Awaiting Approval Data Success',
  HR_LOAD_AWAITING_APPROVAL_DATA_FAILURE = '[COMPETENCY PROFILE (HR)] Load Awaiting Approval Data Failure',

  HR_RESET_DATA = '[COMPETENCY PROFILE (HR)] Reset Data'
}

export class ShowEditorCompetencyProfile implements Action {
  readonly type = CompetencyProfileActionTypes.HR_SHOW_EDITOR;
}

export class HideEditorCompetencyProfile implements Action {
  readonly type = CompetencyProfileActionTypes.HR_HIDE_EDITOR;
}

export class ShowViewerCompetencyProfile implements Action {
  readonly type = CompetencyProfileActionTypes.HR_SHOW_VIEWER;
}

export class HideViewerCompetencyProfile implements Action {
  readonly type = CompetencyProfileActionTypes.HR_HIDE_VIEWER;
}

export class ProcessingCompetencyProfile implements Action {
  readonly type = CompetencyProfileActionTypes.HR_PROCESSING;
}

export class NotProcessingCompetencyProfile implements Action {
  readonly type = CompetencyProfileActionTypes.HR_NOT_PROCESSING;
}

export class LoadApprovedDataCompetencyProfile implements Action {
  readonly type = CompetencyProfileActionTypes.HR_LOAD_APPROVED_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadApprovedDataCompetencyProfileSuccess implements Action {
  readonly type = CompetencyProfileActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: ICompetencyProfile[]) {}
}

export class LoadAwaitingApprovalDataCompetencyProfile implements Action {
  readonly type = CompetencyProfileActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadAwaitingApprovalDataCompetencyProfileSuccess implements Action {
  readonly type = CompetencyProfileActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: ICompetencyProfile[]) {}
}

export class ResetCompetencyProfileData implements Action {
  readonly type = CompetencyProfileActionTypes.HR_RESET_DATA;
}

export type CompetencyProfileActions = 
  | ShowEditorCompetencyProfile
  | HideEditorCompetencyProfile
  | ShowViewerCompetencyProfile
  | HideViewerCompetencyProfile
  | ProcessingCompetencyProfile
  | NotProcessingCompetencyProfile
  | LoadApprovedDataCompetencyProfile
  | LoadApprovedDataCompetencyProfileSuccess
  | LoadAwaitingApprovalDataCompetencyProfile
  | LoadAwaitingApprovalDataCompetencyProfileSuccess
  | ResetCompetencyProfileData;