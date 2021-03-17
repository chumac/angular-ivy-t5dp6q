import { Action } from '@ngrx/store';
import { ISelectOption, INationalitySelectOption, IStateSelectOption } from '@nutela/models/core-data';
import { ILeaveEntitlement, ILeaveDailyData } from '@nutela/models/workforce/leave';

export enum LeaveReturnActionTypes {
  SHOW_EDITOR = '[LEAVE RETURN] Show Editor',
  HIDE_EDITOR = '[LEAVE RETURN] Hide Editor',

  PROCESSING = '[LEAVE RETURN] Processing',
  NOT_PROCESSING = '[LEAVE RETURN] Not Processing',

  SAVE = '[LEAVE RETURN] Save',
  SAVE_SUCCESS = '[LEAVE RETURN] Save Success',
  SAVE_FAILURE = '[LEAVE RETURN] Save Failure',
}

export class ShowEditorLeaveReturn implements Action {
  readonly type = LeaveReturnActionTypes.SHOW_EDITOR;
}

export class HideEditorLeaveReturn implements Action {
  readonly type = LeaveReturnActionTypes.HIDE_EDITOR;
}

export class ProcessingLeaveReturn implements Action {
  readonly type = LeaveReturnActionTypes.PROCESSING;
}

export class NotProcessingLeaveReturn implements Action {
  readonly type = LeaveReturnActionTypes.NOT_PROCESSING;
}

export class SaveLeaveReturn implements Action {
  readonly type = LeaveReturnActionTypes.SAVE; 

  constructor(public payload: { leaveReturnData: ILeaveDailyData, leaveTransId: number }) {}
}

export class SaveLeaveReturnSuccess implements Action {
  readonly type = LeaveReturnActionTypes.SAVE_SUCCESS;
}

export class SaveLeaveReturnFailure implements Action {
  readonly type =LeaveReturnActionTypes.SAVE_FAILURE;

  constructor(public error: any) {}
}


export type LeaveReturnActions =
  | ShowEditorLeaveReturn
  | HideEditorLeaveReturn
  | ProcessingLeaveReturn
  | NotProcessingLeaveReturn
  | SaveLeaveReturn
  | SaveLeaveReturnSuccess  
  | SaveLeaveReturnFailure;
