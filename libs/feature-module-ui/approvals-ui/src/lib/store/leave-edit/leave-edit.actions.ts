import { Action } from '@ngrx/store';

import { IContact } from '@nutela/models/workforce/employee-profiles';
import { ILeaveDailyData } from '@nutela/models/workforce/leave';

export enum LeaveEditActionTypes {
  SHOW_EDITOR = '[APPROVALS - LEAVE EDIT] Show Editor',
  HIDE_EDITOR = '[APPROVALS - LEAVE EDIT] Hide Editor',

  PROCESSING = '[APPROVALS - LEAVE EDIT] Processing',
  NOT_PROCESSING = '[APPROVALS - LEAVE EDIT] Not Processing',

  LOAD_DATA = '[APPROVALS - LEAVE EDIT] Load Data',
  LOAD_DATA_SUCCESS = '[APPROVALS - LEAVE EDIT] Load Data Success',
  LOAD_DATA_FAILURE = '[APPROVALS - LEAVE EDIT] Load Data Failure',

  SAVE = '[APPROVALS - LEAVE EDIT] Save',
  SAVE_SUCCESS = '[APPROVALS - LEAVE EDIT] Save Success',
  SAVE_FAILURE = '[APPROVALS - LEAVE EDIT] Save Failure',

  RESET_LEAVE_DATA = '[APPROVALS - LEAVE EDIT] Reset Leave Data'
}

export class ShowEditorLeaveEdit implements Action {
  readonly type = LeaveEditActionTypes.SHOW_EDITOR;
}

export class HideEditorLeaveEdit implements Action {
  readonly type = LeaveEditActionTypes.HIDE_EDITOR;
}


export class ProcessingLeaveEdit implements Action {
  readonly type = LeaveEditActionTypes.PROCESSING;
}

export class NotProcessingLeaveEdit implements Action {
  readonly type = LeaveEditActionTypes.NOT_PROCESSING;
}


export class LoadDataLeaveEdit implements Action {
  readonly type = LeaveEditActionTypes.LOAD_DATA;

  constructor(public payload: number) {}
}

export class LoadDataLeaveEditSuccess implements Action {
  readonly type = LeaveEditActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: ILeaveDailyData) {}
}

export class LoadDataLeaveEditFailure implements Action {
  readonly type = LeaveEditActionTypes.LOAD_DATA_FAILURE;

  constructor(public error: any) {}
}



export class SaveLeaveEdit implements Action {
  readonly type = LeaveEditActionTypes.SAVE;

  constructor(public payload: {recordId: number, body: any}) {}
}

export class SaveLeaveEditSuccess implements Action {
  readonly type = LeaveEditActionTypes.SAVE_SUCCESS;
}

export class SaveLeaveEditFailure implements Action {
  readonly type =LeaveEditActionTypes.SAVE_FAILURE;

  constructor(public error: any) {}
}

export class ResetLeaveEditData implements Action {
  readonly type = LeaveEditActionTypes.RESET_LEAVE_DATA;
}

export type LeaveEditActions =
  | ShowEditorLeaveEdit
  | HideEditorLeaveEdit
  | ProcessingLeaveEdit
  | NotProcessingLeaveEdit
  | LoadDataLeaveEdit
  | LoadDataLeaveEditSuccess
  | LoadDataLeaveEditFailure
  | SaveLeaveEdit
  | SaveLeaveEditSuccess
  | SaveLeaveEditFailure
  | ResetLeaveEditData;
