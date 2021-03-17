import { Action } from '@ngrx/store';

import { IEmployeeStatus } from "@nutela/models/platform/lookup";


export enum EmployeeStatusActionTypes {

  SHOW_EDITOR = '[ EMPLOYEE STATUS] Show Editor',
  HIDE_EDITOR = '[EMPLOYEE STATUS] Hide Editor',

  PROCESSING = '[ EMPLOYEE STATUS] Processing',
  NOT_PROCESSING = '[ EMPLOYEE STATUS] Not Processing',

  LOAD_STATUS_DATA = '[ EMPLOYEE STATUS] Load EMPLOYEE STATUS Data',
  LOAD_STATUS_DATA_SUCCESS = '[ EMPLOYEE STATUS] Load EMPLOYEE STATUS Data Success',

  SAVE = '[EMPLOYEE STATUS] Save',
  SAVE_SUCCESS = '[ EMPLOYEE STATUS] Save Success', 

  UPDATE = '[UPDATE EMPLOYEE STATUS] UPDATE',
  UPDATE_SUCCESS = '[UPDATE EMPLOYEE STATUS] UPDATE Success', 

  DELETE = '[EMPLOYEE STATUS] DELETE',
}


export class ShowEditorEmployeeStatus implements Action {
  readonly type = EmployeeStatusActionTypes.SHOW_EDITOR;
}

export class HideEditorEmployeeStatus implements Action {
  readonly type = EmployeeStatusActionTypes.HIDE_EDITOR;
}

export class ProcessingEmployeeStatus implements Action {
  readonly type = EmployeeStatusActionTypes.PROCESSING;
}

export class NotProcessingEmployeeStatus implements Action {
  readonly type = EmployeeStatusActionTypes.NOT_PROCESSING;
}


export class LoadEmployeeStatusData implements Action {
  readonly type = EmployeeStatusActionTypes.LOAD_STATUS_DATA;
}

export class LoadEmployeeStatusSuccess implements Action {
  readonly type = EmployeeStatusActionTypes.LOAD_STATUS_DATA_SUCCESS;

  constructor(public payload: IEmployeeStatus[]) {}
}


export class SaveEmployeeStatus implements Action {
  readonly type = EmployeeStatusActionTypes.SAVE;

  constructor(public payload: {data: IEmployeeStatus}) {}
}

export class UpdateEmployeeStatus implements Action {
  readonly type = EmployeeStatusActionTypes.UPDATE;
  constructor(public payload: {data: IEmployeeStatus, recordId: number}) {}
}

export class DeleteEmployeeStatus implements Action {
  readonly type = EmployeeStatusActionTypes.DELETE;
  constructor(public payload: { recordId: number}) {}
}

export type EmployeeStatusActions =
  | ShowEditorEmployeeStatus
  | HideEditorEmployeeStatus 
  | ProcessingEmployeeStatus
  | NotProcessingEmployeeStatus
  | LoadEmployeeStatusData
  | LoadEmployeeStatusSuccess
  | SaveEmployeeStatus
  | UpdateEmployeeStatus;
