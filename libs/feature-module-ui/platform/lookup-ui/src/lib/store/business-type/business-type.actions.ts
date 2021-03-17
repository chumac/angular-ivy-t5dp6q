import { Action } from '@ngrx/store';

import { IBusinessType } from "@nutela/models/platform/lookup";


export enum BusinessTypeActionTypes {

  SHOW_EDITOR = '[ BUSINESS_TYPE] Show Editor',
  HIDE_EDITOR = '[BUSINESS_TYPE] Hide Editor',

  PROCESSING = '[ BUSINESS_TYPE ] Processing',
  NOT_PROCESSING = '[ BUSINESS_TYPE ] Not Processing',

  LOAD_BUSINESS_TYPE_DATA = '[ BUSINESS_TYPE] Load BUSINESS TYPE Data',
  LOAD_BUSINESS_TYPE_DATA_SUCCESS = '[ BUSINESS TYPE] Load BUSINESS TYPE Data Success',

  SAVE = '[BUSINESS_TYPE] Save',
  SAVE_SUCCESS = '[ BUSINESS_TYPE] Save Success', 

  UPDATE = '[UPDATE BUSINESS_TYPE] UPDATE',
  UPDATE_SUCCESS = '[UPDATE BUSINESS_TYPE] UPDATE Success', 

  DELETE_BUSINESS_TYPE_DATA = '[BUSINESS_TYPE] Delete BUSINESS_TYPE Data',
}


export class ShowEditorBusinessType implements Action {
  readonly type = BusinessTypeActionTypes.SHOW_EDITOR;
}

export class HideEditorBusinessType implements Action {
  readonly type = BusinessTypeActionTypes.HIDE_EDITOR;
}

export class ProcessingBusinessType implements Action {
  readonly type = BusinessTypeActionTypes.PROCESSING;
}

export class NotProcessingBusinessType implements Action {
  readonly type = BusinessTypeActionTypes.NOT_PROCESSING;
}


export class LoadBusinessTypeData implements Action {
  readonly type = BusinessTypeActionTypes.LOAD_BUSINESS_TYPE_DATA;
}

export class LoadBusinessTypeSuccess implements Action {
  readonly type = BusinessTypeActionTypes.LOAD_BUSINESS_TYPE_DATA_SUCCESS;
  constructor(public payload: IBusinessType[]) {}
}

export class SaveBusinessType implements Action {
  readonly type = BusinessTypeActionTypes.SAVE;
  constructor(public payload: {data: IBusinessType}) {}
}

export class UpdateBusinessType implements Action {
  readonly type = BusinessTypeActionTypes.UPDATE;
  constructor(public payload: {data: IBusinessType, recordId: number}) {}
}

export class DeleteBusinessType implements Action{
  readonly type =BusinessTypeActionTypes.DELETE_BUSINESS_TYPE_DATA;
  constructor(public payload: { recordId: number}) {} 
}

export type BusinessTypeActions =
  | ShowEditorBusinessType
  | HideEditorBusinessType 
  | ProcessingBusinessType
  | NotProcessingBusinessType
  | LoadBusinessTypeData
  | LoadBusinessTypeSuccess
  | SaveBusinessType
  | UpdateBusinessType
  | DeleteBusinessType;
