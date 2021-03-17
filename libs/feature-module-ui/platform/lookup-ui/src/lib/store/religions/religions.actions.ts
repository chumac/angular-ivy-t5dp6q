import { Action } from '@ngrx/store';

import { IReligions } from "@nutela/models/platform/lookup";


export enum ReligionsActionTypes {

  SHOW_EDITOR = '[ RELIGION] Show Editor',
  HIDE_EDITOR = '[RELIGION] Hide Editor',

  PROCESSING = '[ RELIGION] Processing',
  NOT_PROCESSING = '[ RELIGION] Not Processing',

  LOAD_RELIGION_DATA = '[ RELIGION] Load RELIGION Data',
  LOAD_RELIGION_DATA_SUCCESS = '[ RELIGION] Load RELIGION Data Success',

  SAVE = '[RELIGION] Save',
  SAVE_SUCCESS = '[ RELIGION] Save Success', 

  UPDATE = '[UPDATE RELIGION] UPDATE',
  UPDATE_SUCCESS = '[UPDATE RELIGION] UPDATE Success', 

  DELETE = '[RELIGION] DELETE',
}


export class ShowEditorReligions implements Action {
  readonly type = ReligionsActionTypes.SHOW_EDITOR;
}

export class HideEditorReligions implements Action {
  readonly type = ReligionsActionTypes.HIDE_EDITOR;
}

export class ProcessingReligions implements Action {
  readonly type = ReligionsActionTypes.PROCESSING;
}

export class NotProcessingReligions implements Action {
  readonly type = ReligionsActionTypes.NOT_PROCESSING;
}


export class LoadReligionsData implements Action {
  readonly type = ReligionsActionTypes.LOAD_RELIGION_DATA;
}

export class LoadReligionsSuccess implements Action {
  readonly type = ReligionsActionTypes.LOAD_RELIGION_DATA_SUCCESS;

  constructor(public payload: IReligions[]) {}
}


export class SaveReligions implements Action {
  readonly type = ReligionsActionTypes.SAVE;
  constructor(public payload: {data: IReligions}) {}
}

export class UpdateReligions implements Action {
  readonly type = ReligionsActionTypes.UPDATE;
  constructor(public payload: {data: IReligions, recordId: number}) {}
}

export class DeleteReligions implements Action {
  readonly type = ReligionsActionTypes.DELETE;
  constructor(public payload: {recordId: number}) {}
}

export type ReligionsActions =
  | ShowEditorReligions
  | HideEditorReligions 
  | ProcessingReligions
  | NotProcessingReligions
  | LoadReligionsData
  | LoadReligionsSuccess
  | SaveReligions
  | UpdateReligions;
