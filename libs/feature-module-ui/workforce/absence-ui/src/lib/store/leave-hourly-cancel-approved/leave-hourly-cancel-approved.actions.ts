import { Action } from '@ngrx/store';
import { ILeaveHourlyData } from '@nutela/models/workforce/leave';

export enum LeaveHourlyCancelApprovedActionTypes {
  SHOW_EDITOR = '[LEAVE HOURLY CANCEL APPROVED] Show Editor',
  HIDE_EDITOR = '[LEAVE HOURLY CANCEL APPROVED] Hide Editor',

  PROCESSING = '[LEAVE HOURLY CANCEL APPROVED] Processing',
  NOT_PROCESSING = '[LEAVE HOURLY CANCEL APPROVED] Not Processing',

  SAVE = '[LEAVE HOURLY CANCEL APPROVED] Save',
  SAVE_SUCCESS = '[LEAVE HOURLY CANCEL APPROVED] Save Success',
  SAVE_FAILURE = '[LEAVE HOURLY CANCEL APPROVED] Save Failure',
}

export class ShowEditorLeaveHourlyCancelApproved implements Action {
  readonly type = LeaveHourlyCancelApprovedActionTypes.SHOW_EDITOR;
}

export class HideEditorLeaveHourlyCancelApproved implements Action {
  readonly type = LeaveHourlyCancelApprovedActionTypes.HIDE_EDITOR;
}

export class ProcessingLeaveHourlyCancelApproved implements Action {
  readonly type = LeaveHourlyCancelApprovedActionTypes.PROCESSING;
}

export class NotProcessingLeaveHourlyCancelApproved implements Action {
  readonly type = LeaveHourlyCancelApprovedActionTypes.NOT_PROCESSING;
}

export class SaveLeaveHourlyCancelApproved implements Action {
  readonly type = LeaveHourlyCancelApprovedActionTypes.SAVE; 

  constructor(public payload: { leaveCancelApprovedData: ILeaveHourlyData, leaveTransId: number }) {}
}

export class SaveLeaveHourlyCancelApprovedSuccess implements Action {
  readonly type = LeaveHourlyCancelApprovedActionTypes.SAVE_SUCCESS;
}

export class SaveLeaveHourlyCancelApprovedFailure implements Action {
  readonly type =LeaveHourlyCancelApprovedActionTypes.SAVE_FAILURE;

  constructor(public error: any) {}
}


export type LeaveHourlyCancelApprovedActions =
  | ShowEditorLeaveHourlyCancelApproved
  | HideEditorLeaveHourlyCancelApproved
  | ProcessingLeaveHourlyCancelApproved
  | NotProcessingLeaveHourlyCancelApproved
  | SaveLeaveHourlyCancelApproved
  | SaveLeaveHourlyCancelApprovedSuccess  
  | SaveLeaveHourlyCancelApprovedFailure;
