import { Action } from '@ngrx/store';


import { ILeaveLimits} from '@nutela/models/workforce/leave';
import { ISelectOption } from '@nutela/models/core-data';

export enum LeaveLimitsActionTypes {

  SHOW_EDITOR = '[LEAVE LIMITS] Show Editor',
  HIDE_EDITOR = '[LEAVE LIMITS] Hide Editor',


  PROCESSING = '[LEAVE LIMITS] Processing',
  NOT_PROCESSING = '[LEAVE LIMITS] Not Processing',

  LOADING = '[LEAVE LIMITS] Loading',
  NOT_LOADING = '[LEAVE LIMITS] Not Loading',

  LOAD_LIMITS_DATA = '[LEAVE LIMITS] Load LIMITS Data',
  LOAD_LIMITS_DATA_SUCCESS = '[LEAVE LIMITS] Load LIMITS Data Success',

  LOAD_LEAVE_DATA = '[LEAVE LEAVE] Load LEAVE Data',
  LOAD_LEAVE_DATA_SUCCESS = '[LEAVE LEAVE] Load LEAVE Data Success',

  LOAD_GRADE_DATA = '[LEAVE GRADE] Load GRADE Data',
  LOAD_GRADE_DATA_SUCCESS = '[LEAVE GRADE] Load GRADE Data Success',

  SAVE = '[LEAVE LIMITS] Save',
  SAVE_SUCCESS = '[LEAVE LIMITS] Save Success',

  UPDATED = '[LEAVE LIMITS] UPDATED',
  UPDATED_SUCCESS = '[LEAVE LIMITS] Update Success',

  DELETE = '[LEAVE LIMITS] Delete Data',
}



export class ShowEditorLeaveLimits implements Action {
  readonly type = LeaveLimitsActionTypes.SHOW_EDITOR;
}

export class HideEditorLeaveLimits implements Action {
  readonly type = LeaveLimitsActionTypes.HIDE_EDITOR;
}


export class ProcessingLeaveLimits implements Action {
  readonly type = LeaveLimitsActionTypes.PROCESSING;
}

export class NotProcessingLeaveLimits implements Action {
  readonly type = LeaveLimitsActionTypes.NOT_PROCESSING;
}

export class LoadingLeaveLimits implements Action {
  readonly type = LeaveLimitsActionTypes.LOADING;
}

export class NotLoadingLeaveLimits implements Action {
  readonly type = LeaveLimitsActionTypes.NOT_LOADING;
}

export class LoadLeaveLimitsData implements Action {
  readonly type=LeaveLimitsActionTypes.LOAD_LIMITS_DATA;
}

export class LoadLeaveLimitsDataSuccess implements Action {
  readonly type = LeaveLimitsActionTypes.LOAD_LIMITS_DATA_SUCCESS;

  constructor(public payload: ILeaveLimits[]) {}
}

export class LoadLeave implements Action {
  readonly type =LeaveLimitsActionTypes.LOAD_LEAVE_DATA;
}

export class LoadLeaveSuccess implements Action {
  readonly type =LeaveLimitsActionTypes.LOAD_LEAVE_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadGrade implements Action {
  readonly type =LeaveLimitsActionTypes.LOAD_GRADE_DATA;
}

export class LoadGradeSuccess implements Action {
  readonly type =LeaveLimitsActionTypes.LOAD_GRADE_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}


export class SaveLeaveLimits implements Action {
  readonly type = LeaveLimitsActionTypes.SAVE;

  constructor(public payload: {data: ILeaveLimits, recordId: number}) {}
}

export class UpdateLeaveLimits implements Action {
  readonly type = LeaveLimitsActionTypes.UPDATED;

  constructor(public payload: {data: ILeaveLimits, recordId: number}) {}
}

export class DeleteLeaveLimits implements Action {
  readonly type = LeaveLimitsActionTypes.DELETE;

  constructor(public payload: {recordId: number}) {}
}

export type LeaveLimitsActions =
  | ShowEditorLeaveLimits
  | HideEditorLeaveLimits
  | ProcessingLeaveLimits
  | NotProcessingLeaveLimits
  | LoadingLeaveLimits
  | NotLoadingLeaveLimits
  | LoadLeaveLimitsData
  | LoadLeaveLimitsDataSuccess
  | LoadLeave
  | LoadLeaveSuccess
  | LoadGrade
  | LoadGradeSuccess
  | SaveLeaveLimits
  | UpdateLeaveLimits
  | DeleteLeaveLimits;
