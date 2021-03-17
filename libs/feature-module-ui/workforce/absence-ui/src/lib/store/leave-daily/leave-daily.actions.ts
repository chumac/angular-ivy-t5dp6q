import { Action } from '@ngrx/store';
import { ILeaveEntitlement, ILeaveDailyData, ILeaveContactInfo } from '@nutela/models/workforce/leave';

export enum LeaveDailyActionTypes {
  LOAD_ENTITLEMENTS = '[LEAVE DAILY] Load Entitlements',
  LOAD_ENTITLEMENTS_SUCCESS = '[LEAVE DAILY] Load Entitlements Success',
  LOAD_ENTITLEMENTS_FAILURE = '[LEAVE DAILY] Load Entitlements Failure',

  LOAD_APPROVED_DATA = '[LEAVE DAILY] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[LEAVE DAILY] Load Approved Data Success',

  LOAD_CONTACT_INFO = '[LEAVE DAILY] Load Contact Data',
  LOAD_CONTACT_INFO_SUCCESS = '[LEAVE DAILY] Load Contact Data Success',

  LOADING_LEAVE_DAILY = '[LEAVE DAILY] Loading Leave Daily',
  NOT_LOADING_LEAVE_DAILY = '[LEAVE DAILY] Not Loading Leave Daily',

  LOAD_AWAITING_APPROVAL_DATA = '[LEAVE DAILY] Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[LEAVE DAILY] Load Awaiting Approval Data Success'
}

export class LeaveDailyLoadEntitlements implements Action {
  readonly type = LeaveDailyActionTypes.LOAD_ENTITLEMENTS;

  constructor() {}
}

export class LeaveDailyLoadEntitlementsSuccess implements Action {
  readonly type = LeaveDailyActionTypes.LOAD_ENTITLEMENTS_SUCCESS;

  constructor(public payload: ILeaveEntitlement[]) {}
}

export class LeaveDailyLoadEntitlementsFailure implements Action {
  readonly type = LeaveDailyActionTypes.LOAD_ENTITLEMENTS_FAILURE;

  constructor(public error: any) {}
}

export class LoadingLeaveDaily implements Action {
  readonly type = LeaveDailyActionTypes.LOADING_LEAVE_DAILY;
}

export class NotLoadingLeaveDaily implements Action {
  readonly type = LeaveDailyActionTypes.NOT_LOADING_LEAVE_DAILY;
}

export class LoadApprovedDataLeaveDaily implements Action {
  readonly type = LeaveDailyActionTypes.LOAD_APPROVED_DATA;
}

export class LoadApprovedDataLeaveDailySuccess implements Action {
  readonly type = LeaveDailyActionTypes.LOAD_APPROVED_DATA_SUCCESS;

  constructor(public payload: ILeaveDailyData[]) {}
}

export class LoadAwaitingApprovalDataLeaveDaily implements Action {
  readonly type = LeaveDailyActionTypes.LOAD_AWAITING_APPROVAL_DATA;
}

export class LoadAwaitingApprovalDataLeaveDailySuccess implements Action {
  readonly type = LeaveDailyActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: ILeaveDailyData[]) {}
}

export class LoadLeaveContactInfo implements Action {
  readonly type = LeaveDailyActionTypes.LOAD_CONTACT_INFO;
}

export class LoadLeaveContactInfoSuccess implements Action {
  readonly type = LeaveDailyActionTypes.LOAD_CONTACT_INFO_SUCCESS;

  constructor(public payload: ILeaveContactInfo) {}
}

export type LeaveDailyActions =
  | LeaveDailyLoadEntitlements
  | LeaveDailyLoadEntitlementsSuccess
  | LeaveDailyLoadEntitlementsFailure
  | LoadingLeaveDaily
  | NotLoadingLeaveDaily
  | LoadApprovedDataLeaveDaily
  | LoadApprovedDataLeaveDailySuccess
  | LoadAwaitingApprovalDataLeaveDaily
  | LoadAwaitingApprovalDataLeaveDailySuccess
  | LoadLeaveContactInfo
  | LoadLeaveContactInfoSuccess;
