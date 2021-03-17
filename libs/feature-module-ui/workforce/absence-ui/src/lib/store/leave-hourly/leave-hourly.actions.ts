import { Action } from '@ngrx/store';
import { ISelectOption, INationalitySelectOption, IStateSelectOption } from '@nutela/models/core-data';
import { ILeaveEntitlement, ILeaveHourlyData } from '@nutela/models/workforce/leave';

export enum LeaveHourlyActionTypes {
  SHOW_EDITOR = '[LEAVE HOURLY] Show Editor',
  HIDE_EDITOR = '[LEAVE HOURLY] Hide Editor',

  PROCESSING = '[LEAVE HOURLY] Processing',
  NOT_PROCESSING = '[LEAVE HOURLY] Not Processing',

  LOAD_LEAVE_ENTITLEMENT = '[LEAVE HOURLY] Load Leave Entitlement',
  LOAD_LEAVE_ENTITLEMENT_SUCCESS = '[LEAVE HOURLY] Load Leave Entitlement Success',

  LOADING_LEAVE_HOURLY = '[LEAVE HOURLY] Loading Leave Hourly',
  NOT_LOADING_LEAVE_HOURLY = '[LEAVE HOURLY] Not Loading Leave Hourly',

  SAVE = '[LEAVE HOURLY] Save',
  SAVE_SUCCESS = '[LEAVE HOURLY] Save Success',
  SAVE_FAILURE = '[LEAVE HOURLY] Save Failure',

  LOAD_APPROVED_DATA = '[LEAVE HOURLY] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[LEAVE HOURLY] Load Approved Data Success',

  LOAD_AWAITING_APPROVAL_DATA = '[LEAVE HOURLY] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[LEAVE HOURLY] Load Awaiting Approval Data Success'
}

export class ShowEditorLeaveHourly implements Action {
  readonly type = LeaveHourlyActionTypes.SHOW_EDITOR;
}

export class HideEditorLeaveHourly implements Action {
  readonly type = LeaveHourlyActionTypes.HIDE_EDITOR;
}

export class ProcessingLeaveHourly implements Action {
  readonly type = LeaveHourlyActionTypes.PROCESSING;
}

export class NotProcessingLeaveHourly implements Action {
  readonly type = LeaveHourlyActionTypes.NOT_PROCESSING;
}

export class LoadingLeaveHourly implements Action {
  readonly type = LeaveHourlyActionTypes.LOADING_LEAVE_HOURLY;
}

export class NotLoadingLeaveHourly implements Action {
  readonly type = LeaveHourlyActionTypes.NOT_LOADING_LEAVE_HOURLY;
}


export class LoadEntitlementLeaveHourly implements Action {
  readonly type = LeaveHourlyActionTypes.LOAD_LEAVE_ENTITLEMENT;
}

export class LoadEntitlementLeaveHourlySuccess implements Action {
  readonly type = LeaveHourlyActionTypes.LOAD_LEAVE_ENTITLEMENT_SUCCESS;

  constructor(public payload: any) {}
}


export class SaveLeaveHourly implements Action {
  readonly type = LeaveHourlyActionTypes.SAVE;

  constructor(public payload: { leaveData: ILeaveHourlyData, saveMode: string }) {}
}

export class SaveLeaveHourlySuccess implements Action {
  readonly type = LeaveHourlyActionTypes.SAVE_SUCCESS;
}

export class SaveLeaveHourlyFailure implements Action {
  readonly type = LeaveHourlyActionTypes.SAVE_FAILURE;

  constructor(public error: any) {}
}

export class LoadApprovedDataLeaveHourly implements Action {
  readonly type = LeaveHourlyActionTypes.LOAD_APPROVED_DATA;
}

export class LoadApprovedDataLeaveHourlySuccess implements Action {
  readonly type = LeaveHourlyActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: ILeaveHourlyData[]) {}
}

export class LoadAwaitingApprovalDataLeaveHourly implements Action {
  readonly type = LeaveHourlyActionTypes.LOAD_AWAITING_APPROVAL_DATA;
}

export class LoadAwaitingApprovalDataLeaveHourlySuccess implements Action {
  readonly type = LeaveHourlyActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: ILeaveHourlyData[]) {}
}

export type LeaveHourlyActions =
  | ShowEditorLeaveHourly
  | HideEditorLeaveHourly
  | ProcessingLeaveHourly
  | NotProcessingLeaveHourly
  | LoadingLeaveHourly
  | NotLoadingLeaveHourly
  | LoadEntitlementLeaveHourly
  | LoadEntitlementLeaveHourlySuccess
  | SaveLeaveHourly
  | SaveLeaveHourlySuccess
  | SaveLeaveHourlyFailure
  | LoadApprovedDataLeaveHourly
  | LoadApprovedDataLeaveHourlySuccess
  | LoadAwaitingApprovalDataLeaveHourly
  | LoadAwaitingApprovalDataLeaveHourlySuccess;
