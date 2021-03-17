import { Action } from '@ngrx/store';

import { IState } from "@nutela/models/platform/lookup";
import { ISelectOption } from '@nutela/models/core-data';


export enum StateActionTypes {

  SHOW_EDITOR = '[ State] Show Editor',
  HIDE_EDITOR = '[State] Hide Editor',

  PROCESSING = '[ State] Processing',
  NOT_PROCESSING = '[ State] Not Processing',

  LOAD_STATE_DATA = '[ STATE] Load STATE Data',
  LOAD_STATE_DATA_SUCCESS = '[ STATE] Load STATE Data Success',

  LOAD_NATIONALITY_DATA = '[ STATE] Load NATIONALITY Data',
  LOAD_NATIONALITY_DATA_SUCCESS = '[ STATE] Load NATIONALITY Data Success',

  SAVE = '[State] Save',
  SAVE_SUCCESS = '[ State] Save Success', 

  UPDATE = '[State] UPDATE',
  UPDATE_SUCCESS = '[ State] UPDATE Success',

  CLEAR= '[ STATE] Load Clear Data',
  DELETE = '[State] DELETE',
  
}


export class ShowEditorState implements Action {
  readonly type = StateActionTypes.SHOW_EDITOR;
}

export class HideEditorState implements Action {
  readonly type = StateActionTypes.HIDE_EDITOR;
}

export class ProcessingState implements Action {
  readonly type = StateActionTypes.PROCESSING;
}

export class NotProcessingState implements Action {
  readonly type = StateActionTypes.NOT_PROCESSING;
}


export class LoadStateData implements Action {
  readonly type = StateActionTypes.LOAD_STATE_DATA;
  constructor(public payload: {countryId: number}) {}
}

export class LoadStateSuccess implements Action {
  readonly type = StateActionTypes.LOAD_STATE_DATA_SUCCESS;
  constructor(public payload: IState[]) {}
}

export class LoadNation implements Action {
  readonly type = StateActionTypes.LOAD_NATIONALITY_DATA;
}

export class LoadNationSuccess implements Action {
  readonly type = StateActionTypes.LOAD_NATIONALITY_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}


export class SaveState implements Action {
  readonly type = StateActionTypes.SAVE;
  constructor(public payload: {data: IState, countryId: number}) {}
}

export class UpdateState implements Action {
  readonly type = StateActionTypes.UPDATE;
  constructor(public payload: {data: IState, countryId: number, recordId: number}) {}
}

export class DeleteState implements Action {
  readonly type = StateActionTypes.DELETE;
  constructor(public payload: {countryId: number, recordId: number}) {}
}

export class ClearState implements Action {
  readonly type = StateActionTypes.CLEAR;
}

export type StateActions =
  | ShowEditorState
  | HideEditorState 
  | ProcessingState
  | NotProcessingState
  | LoadStateData
  | LoadStateSuccess
  | LoadNation
  | LoadNationSuccess
  | SaveState
  | UpdateState
  | DeleteState
  | ClearState;
