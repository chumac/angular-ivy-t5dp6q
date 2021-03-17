import { Action } from '@ngrx/store';
import { ILeaveDailyData } from '@nutela/models/workforce/leave';

export enum LeaveCancelAwaitingApprovalActionTypes {
  REMOVE_AWAITING_APPROVAL_DATA = '[LEAVE CANCEL AWAITING APPROVAL] Delete Awaiting Approval Data'
}

export class RemoveAwaitingApprovalDataLeaveDaily implements Action {
  readonly type = LeaveCancelAwaitingApprovalActionTypes.REMOVE_AWAITING_APPROVAL_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type LeaveCancelAwaitingApprovalActions =
  | RemoveAwaitingApprovalDataLeaveDaily;
