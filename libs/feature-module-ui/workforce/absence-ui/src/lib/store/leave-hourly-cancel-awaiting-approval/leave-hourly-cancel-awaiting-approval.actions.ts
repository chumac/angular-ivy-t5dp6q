import { Action } from '@ngrx/store';

export enum LeaveHourlyCancelAwaitingApprovalActionTypes {
  REMOVE_HOURLY_AWAITING_APPROVAL_DATA = '[LEAVE HOURLY CANCEL AWAITING APPROVAL] Delete Awaiting Approval Data'
}

export class RemoveHourlyAwaitingApprovalDataLeaveDaily implements Action {
  readonly type = LeaveHourlyCancelAwaitingApprovalActionTypes.REMOVE_HOURLY_AWAITING_APPROVAL_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type LeaveHourlyCancelAwaitingApprovalActions =
  | RemoveHourlyAwaitingApprovalDataLeaveDaily;
