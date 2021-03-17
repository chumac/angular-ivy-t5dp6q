import { Action } from '@ngrx/store';

import { ILga } from "@nutela/models/platform/lookup";
import { ISelectOption } from '@nutela/models/core-data';


export enum LgaActionTypes {

  SHOW_EDITOR = '[ LGA] Show Editor',
  HIDE_EDITOR = '[LGA] Hide Editor',

  PROCESSING = '[ LGA] Processing',
  NOT_PROCESSING = '[ LGA] Not Processing',

  LOAD_LGA_DATA = '[ LGA] Load LGA Data',
  LOAD_LGA_DATA_SUCCESS = '[ LGA] Load LGA Data Success',


  LOAD_NATIONALITY_DATA = '[LGA] Load NATIONALITY Data',
  LOAD_NATIONALITY_DATA_SUCCESS = '[LGA] Load NATIONALITY Data Success',

  LOAD_STATE_DATA = '[LGA] Load STATE Data',
  LOAD_STATE_DATA_SUCCESS = '[LGA] Load STATE Data Success',

  SAVE = '[LGA] Save',
  SAVE_SUCCESS = '[ LGA] Save Success',

  UPDATE = '[LGA] UPDATE',
  UPDATE_SUCCESS = '[ LGA] UPDATE Success',

  DELETE = '[LGA] DELETE',
  CLEAR = '[LGA]  CLEAR',
  CLEAR_STATE = '[LGA]  CLEAR State',

}


export class ShowEditorLga implements Action {
  readonly type = LgaActionTypes.SHOW_EDITOR;
}

export class HideEditorLga implements Action {
  readonly type = LgaActionTypes.HIDE_EDITOR;
}

export class ProcessingLga implements Action {
  readonly type = LgaActionTypes.PROCESSING;
}

export class NotProcessingLga implements Action {
  readonly type = LgaActionTypes.NOT_PROCESSING;
}


export class LoadLgaData implements Action {
  readonly type = LgaActionTypes.LOAD_LGA_DATA;
  constructor(public payload: {stateId: number}) {}
}

export class LoadLgaSuccess implements Action {
  readonly type = LgaActionTypes.LOAD_LGA_DATA_SUCCESS;
  constructor(public payload: ILga[]) {}
}


export class LoadNationLga implements Action {
  readonly type = LgaActionTypes.LOAD_NATIONALITY_DATA;
}

export class LoadNationLgaSuccess implements Action {
  readonly type = LgaActionTypes.LOAD_NATIONALITY_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadLgaState implements Action {
  readonly type = LgaActionTypes.LOAD_STATE_DATA;
  constructor(public payload: {countryId: number}) {}
}

export class LoadLgaStateSuccess implements Action {
  readonly type = LgaActionTypes.LOAD_STATE_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class SaveLga implements Action {
  readonly type = LgaActionTypes.SAVE;
  constructor(public payload: {data: ILga, stateId: number}) {}
}

export class UpdateLga implements Action {
  readonly type = LgaActionTypes.UPDATE;
  constructor(public payload: {data: ILga,stateId:number, LgaId: number}) {}
}
export class DeleteLga implements Action {
  readonly type = LgaActionTypes.DELETE;
  constructor(public payload: {stateId: number, LgaId: number}) {}
}

export class ClearLga implements Action {
  readonly type = LgaActionTypes.CLEAR;
}

export class ClearStateLga implements Action {
  readonly type = LgaActionTypes.CLEAR_STATE;
}

export type LgaActions =
  | ShowEditorLga
  | HideEditorLga
  | ProcessingLga
  | NotProcessingLga
  | LoadLgaData
  | LoadLgaSuccess
  | LoadNationLga
  | LoadNationLgaSuccess
  | LoadLgaState
  | LoadLgaStateSuccess
  | ClearLga
  | ClearStateLga
  | UpdateLga
  | SaveLga
  | DeleteLga;
