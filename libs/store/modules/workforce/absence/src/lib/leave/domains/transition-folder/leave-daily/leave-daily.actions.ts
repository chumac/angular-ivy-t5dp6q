import { Action } from '@ngrx/store';
import { ILeaveEntitlement, ILeaveDailyData } from '@nutela/models/workforce/leave';

export enum LeaveDailyActionTypes {
  LOAD_ENTITLEMENTS = '[LEAVE DAILY] Load Entitlements',
  LOAD_ENTITLEMENTS_SUCCESS = '[LEAVE DAILY] Load Entitlements Success',
  LOAD_ENTITLEMENTS_FAILURE = '[LEAVE DAILY] Load Entitlements Failure',

  LOAD_APPROVED_DATA = '[LEAVE DAILY] Load Approved Data',
  LOAD_APPROVED_DATA_SUCCESS = '[LEAVE DAILY] Load Approved Data Success',

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

export type LeaveDailyActions =
  | LeaveDailyLoadEntitlements
  | LeaveDailyLoadEntitlementsSuccess
  | LeaveDailyLoadEntitlementsFailure
  | LoadApprovedDataLeaveDaily
  | LoadApprovedDataLeaveDailySuccess
  | LoadAwaitingApprovalDataLeaveDaily
  | LoadAwaitingApprovalDataLeaveDailySuccess;
