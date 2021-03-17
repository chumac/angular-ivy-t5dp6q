import { Action } from '@ngrx/store';


import { ILeaveDays} from '@nutela/models/workforce/leave';

export enum LeaveDaysActionTypes {

  SHOW_EDITOR = '[LEAVE DAYS] Show Editor',
  HIDE_EDITOR = '[LEAVE DAYS] Hide Editor',


  PROCESSING = '[LEAVE DAYS] Processing',
  NOT_PROCESSING = '[LEAVE DAYS] Not Processing',

  LOAD_DAYS_DATA = '[LEAVE DAYS] Load DAYS Data',
  LOAD_DAYS_DATA_SUCCESS = '[LEAVE DAYS] Load DAYS Data Success',

  SAVE = '[LEAVE DAYS] Save',
  SAVE_SUCCESS = '[LEAVE DAYS] Save Success',

  DELETE = '[LEAVE DAYS] Delete Data',
}




export class ShowEditorLeaveDays implements Action {
  readonly type = LeaveDaysActionTypes.SHOW_EDITOR;
}

export class HideEditorLeaveDays implements Action {
  readonly type = LeaveDaysActionTypes.HIDE_EDITOR;
}


export class ProcessingLeaveDays implements Action {
  readonly type = LeaveDaysActionTypes.PROCESSING;
}

export class NotProcessingLeaveDays implements Action {
  readonly type = LeaveDaysActionTypes.NOT_PROCESSING;
}

export class LoadLeaveDaysData implements Action {
  readonly type=LeaveDaysActionTypes.LOAD_DAYS_DATA;
}

export class LoadLeaveDaysDataSuccess implements Action {
  readonly type = LeaveDaysActionTypes.LOAD_DAYS_DATA_SUCCESS;

  constructor(public payload: ILeaveDays[]) {}
}


export class SaveLeaveDays implements Action {
  readonly type = LeaveDaysActionTypes.SAVE;

  constructor(public payload: {data: ILeaveDays,days:number, recordId: number}) {}
}

export class DeleteLeaveDays implements Action {
  readonly type = LeaveDaysActionTypes.DELETE;

  constructor(public payload: {recordId: number}) {}
}

export type LeaveDaysActions =
  | ShowEditorLeaveDays
  | HideEditorLeaveDays
  | ProcessingLeaveDays
  | NotProcessingLeaveDays
  | LoadLeaveDaysData
  | LoadLeaveDaysDataSuccess
  | SaveLeaveDays
  | DeleteLeaveDays;
