import { Action } from '@ngrx/store';

import { IDepartment } from "@nutela/models/platform/lookup";


export enum DepartmentActionTypes {

  SHOW_EDITOR = '[ DEPARTMENT] Show Editor',
  HIDE_EDITOR = '[DEPARTMENT] Hide Editor',

  PROCESSING = '[ DEPARTMENT ] Processing',
  NOT_PROCESSING = '[ DEPARTMENT ] Not Processing',

  LOADING = '[ DEPARTMENT ] LOADING',
  NOT_LOADING = '[ DEPARTMENT ] Not LOADING',

  LOAD_DEPARTMENT_DATA = '[ DEPARTMENT] Load DEPARTMENT Data',
  LOAD_DEPARTMENT_DATA_SUCCESS = '[ DEPARTMENT] Load DEPARTMENT Data Success',

  SAVE = '[DEPARTMENT] Save',
  SAVE_SUCCESS = '[ DEPARTMENT] Save Success',

  UPDATE = '[UPDATE DEPARTMENT] UPDATE',
  UPDATE_SUCCESS = '[UPDATE DEPARTMENT] UPDATE Success',

  DELETE_DEPARTMENT_DATA = '[DEPARTMENT] Delete DEPARTMENT Data',
}


export class ShowEditorDepartment implements Action {
  readonly type = DepartmentActionTypes.SHOW_EDITOR;
}

export class HideEditorDepartment implements Action {
  readonly type = DepartmentActionTypes.HIDE_EDITOR;
}

export class ProcessingDepartment implements Action {
  readonly type = DepartmentActionTypes.PROCESSING;
}

export class NotProcessingDepartment implements Action {
  readonly type = DepartmentActionTypes.NOT_PROCESSING;
}

export class LoadingDepartment implements Action {
  readonly type = DepartmentActionTypes.LOADING;
}

export class NotLoadingDepartment implements Action {
  readonly type = DepartmentActionTypes.NOT_LOADING;
}


export class LoadDepartmentData implements Action {
  readonly type = DepartmentActionTypes.LOAD_DEPARTMENT_DATA;
}

export class LoadDepartmentSuccess implements Action {
  readonly type = DepartmentActionTypes.LOAD_DEPARTMENT_DATA_SUCCESS;
  constructor(public payload: IDepartment[]) {}
}

export class SaveDepartment implements Action {
  readonly type = DepartmentActionTypes.SAVE;
  constructor(public payload: {data: IDepartment}) {}
}

export class UpdateDepartment implements Action {
  readonly type = DepartmentActionTypes.UPDATE;
  constructor(public payload: {data: IDepartment, recordId: number}) {}
}

export class DeleteDepartment implements Action{
  readonly type =DepartmentActionTypes.DELETE_DEPARTMENT_DATA;
  constructor(public payload: { recordId: number}) {}
}

export type DepartmentActions =
  | ShowEditorDepartment
  | HideEditorDepartment
  | ProcessingDepartment
  | NotProcessingDepartment
  | LoadingDepartment
  | NotLoadingDepartment
  | LoadDepartmentData
  | LoadDepartmentSuccess
  | SaveDepartment
  | UpdateDepartment
  | DeleteDepartment;
