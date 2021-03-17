import { Action } from '@ngrx/store';


import { ILeaveProrate} from '@nutela/models/workforce/leave';

export enum LeaveProrateActionTypes {

  SHOW_EDITOR = '[LEAVE PRORATE] Show Editor',
  HIDE_EDITOR = '[LEAVE PRORATE] Hide Editor',


  PROCESSING = '[LEAVE PRORATE] Processing',
  NOT_PROCESSING = '[LEAVE PRORATE] Not Processing',

  LOADING = '[LEAVE PRORATE] Loading',
  NOT_LOADING = '[LEAVE PRORATE] Not Loading',

  LOAD_PRORATE_DATA = '[LEAVE PRORATE] Load PRORATE Data',
  LOAD_PRORATE_DATA_SUCCESS = '[LEAVE PRORATE] Load PRORATE Data Success',

  LOAD_BUILD_DATA = '[LEAVE BUILD] Load BUILD Data',
  LOAD_RESET_DATA = '[LEAVE RESET] Load RESET Data',

  SAVE = '[LEAVE PRORATE] Save',
  SAVE_SUCCESS = '[LEAVE PRORATE] Save Success',

  UPDATED = '[LEAVE PRORATE] UPDATED',
  UPDATED_SUCCESS = '[LEAVE PRORATE] Update Success',

  DELETE = '[LEAVE PRORATE] Delete Data',
}



export class ShowEditorLeaveProrate implements Action {
  readonly type = LeaveProrateActionTypes.SHOW_EDITOR;
}

export class HideEditorLeaveProrate implements Action {
  readonly type = LeaveProrateActionTypes.HIDE_EDITOR;
}


export class ProcessingLeaveProrate implements Action {
  readonly type = LeaveProrateActionTypes.PROCESSING;
}

export class NotProcessingLeaveProrate implements Action {
  readonly type = LeaveProrateActionTypes.NOT_PROCESSING;
}

export class LoadingLeaveProrate implements Action {
  readonly type = LeaveProrateActionTypes.LOADING;
}

export class NotLoadingLeaveProrate implements Action {
  readonly type = LeaveProrateActionTypes.NOT_LOADING;
}

export class LoadLeaveProrateData implements Action {
  readonly type=LeaveProrateActionTypes.LOAD_PRORATE_DATA;
}

export class LoadLeaveProrateDataSuccess implements Action {
  readonly type = LeaveProrateActionTypes.LOAD_PRORATE_DATA_SUCCESS;

  constructor(public payload: ILeaveProrate[]) {}
}

export class LoadBuild implements Action {
  readonly type=LeaveProrateActionTypes.LOAD_BUILD_DATA;
}

export class LoadReset implements Action {
  readonly type=LeaveProrateActionTypes.LOAD_RESET_DATA;
}

export class SaveLeaveProrate implements Action {
  readonly type = LeaveProrateActionTypes.SAVE;

  constructor(public payload: {data: ILeaveProrate, recordId: number}) {}
}

export class UpdateLeaveProrate implements Action {
  readonly type = LeaveProrateActionTypes.UPDATED;

  constructor(public payload: {data: ILeaveProrate, recordId: number}) {}
}

export class DeleteLeaveProrate implements Action {
  readonly type = LeaveProrateActionTypes.DELETE;

  constructor(public payload: {recordId: number}) {}
}

export type LeaveProrateActions =
  | ShowEditorLeaveProrate
  | HideEditorLeaveProrate
  | ProcessingLeaveProrate
  | NotProcessingLeaveProrate
  | LoadingLeaveProrate
  | NotLoadingLeaveProrate
  | LoadLeaveProrateData
  | LoadLeaveProrateDataSuccess
  | SaveLeaveProrate
  | UpdateLeaveProrate
  | DeleteLeaveProrate
  | LoadBuild
  | LoadReset;
