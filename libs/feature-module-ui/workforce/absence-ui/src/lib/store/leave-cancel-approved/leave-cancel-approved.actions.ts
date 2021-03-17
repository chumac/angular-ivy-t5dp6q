import { Action } from '@ngrx/store';
import { ILeaveDailyData } from '@nutela/models/workforce/leave';

export enum LeaveCancelApprovedActionTypes {
  SHOW_EDITOR = '[LEAVE CANCEL APPROVED] Show Editor',
  HIDE_EDITOR = '[LEAVE CANCEL APPROVED] Hide Editor',

  PROCESSING = '[LEAVE CANCEL APPROVED] Processing',
  NOT_PROCESSING = '[LEAVE CANCEL APPROVED] Not Processing',

  SAVE = '[LEAVE CANCEL APPROVED] Save',
  SAVE_SUCCESS = '[LEAVE CANCEL APPROVED] Save Success',
  SAVE_FAILURE = '[LEAVE CANCEL APPROVED] Save Failure',
}

export class ShowEditorLeaveCancelApproved implements Action {
  readonly type = LeaveCancelApprovedActionTypes.SHOW_EDITOR;
}

export class HideEditorLeaveCancelApproved implements Action {
  readonly type = LeaveCancelApprovedActionTypes.HIDE_EDITOR;
}

export class ProcessingLeaveCancelApproved implements Action {
  readonly type = LeaveCancelApprovedActionTypes.PROCESSING;
}

export class NotProcessingLeaveCancelApproved implements Action {
  readonly type = LeaveCancelApprovedActionTypes.NOT_PROCESSING;
}

export class SaveLeaveCancelApproved implements Action {
  readonly type = LeaveCancelApprovedActionTypes.SAVE; 

  constructor(public payload: { leaveCancelApprovedData: ILeaveDailyData, leaveTransId: number }) {}
}

export class SaveLeaveCancelApprovedSuccess implements Action {
  readonly type = LeaveCancelApprovedActionTypes.SAVE_SUCCESS;
}

export class SaveLeaveCancelApprovedFailure implements Action {
  readonly type =LeaveCancelApprovedActionTypes.SAVE_FAILURE;

  constructor(public error: any) {}
}


export type LeaveCancelApprovedActions =
  | ShowEditorLeaveCancelApproved
  | HideEditorLeaveCancelApproved
  | ProcessingLeaveCancelApproved
  | NotProcessingLeaveCancelApproved
  | SaveLeaveCancelApproved
  | SaveLeaveCancelApprovedSuccess  
  | SaveLeaveCancelApprovedFailure;
