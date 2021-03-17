import { Action } from '@ngrx/store';

import { INationality } from "@nutela/models/platform/lookup";


export enum NationalityActionTypes {

  SHOW_EDITOR = '[ NATIONALITY] Show Editor',
  HIDE_EDITOR = '[NATIONALITY] Hide Editor',

  PROCESSING = '[ NATIONALITY] Processing',
  NOT_PROCESSING = '[ NATIONALITY] Not Processing',

  LOAD_NATIONALITY_DATA = '[ NATIONALITY] Load NATIONALITY Data',
  LOAD_NATIONALITY_DATA_SUCCESS = '[ NATIONALITY] Load NATIONALITY Data Success',

  SAVE = '[NATIONALITY] Save',
  SAVE_SUCCESS = '[ NATIONALITY] Save Success', 

  UPDATE = '[NATIONALITY] UPDATE',
  UPDATE_SUCCESS = '[ NATIONALITY] UPDATE Success', 

  DELETE = '[NATIONALITY] DELETE',
}


export class ShowEditorNationality implements Action {
  readonly type = NationalityActionTypes.SHOW_EDITOR;
}

export class HideEditorNationality implements Action {
  readonly type = NationalityActionTypes.HIDE_EDITOR;
}

export class ProcessingNationality implements Action {
  readonly type = NationalityActionTypes.PROCESSING;
}

export class NotProcessingNationality implements Action {
  readonly type = NationalityActionTypes.NOT_PROCESSING;
}


export class LoadNationalityData implements Action {
  readonly type = NationalityActionTypes.LOAD_NATIONALITY_DATA;
}

export class LoadNationalitySuccess implements Action {
  readonly type = NationalityActionTypes.LOAD_NATIONALITY_DATA_SUCCESS;
  constructor(public payload: INationality[]) {}
}

export class SaveNationality implements Action {
  readonly type = NationalityActionTypes.SAVE;
  constructor(public payload: {data: INationality}) {}
}

export class UpdateNationality implements Action {
  readonly type = NationalityActionTypes.UPDATE;
  constructor(public payload: {data: INationality, recordId: number}) {}
}

export class DeleteNationality implements Action {
  readonly type = NationalityActionTypes.DELETE;
  constructor(public payload: {recordId: number}) {}
}

export type NationalityActions =
  | ShowEditorNationality
  | HideEditorNationality 
  | ProcessingNationality
  | NotProcessingNationality
  | LoadNationalityData
  | LoadNationalitySuccess
  | SaveNationality
  | UpdateNationality
  | DeleteNationality;
