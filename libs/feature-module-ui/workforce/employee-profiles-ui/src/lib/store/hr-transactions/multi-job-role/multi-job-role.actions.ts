import { Action } from '@ngrx/store';
import { IMultiRoleJob } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';

export enum MultiJobRoleTransactionActionTypes {

  SHOW_EDITOR = '[HR_TRANSACTION - MULTIJOBROLE] Show Editor',
  HIDE_EDITOR = '[HR_TRANSACTION - MULTIJOBROLE] Hide Editor',

  SHOW_VIEWER = '[HR_TRANSACTION - MULTIJOBROLE] Show Viewer',
  HIDE_VIEWER = '[HR_TRANSACTION - MULTIJOBROLE] Hide Viewer',

  PROCESSING = '[HR_TRANSACTION - MULTIJOBROLE] Processing',
  NOT_PROCESSING = '[HR_TRANSACTION - MULTIJOBROLE] Not Processing',

  LOADING = '[HR_TRANSACTION - MULTIJOBROLE] Loading',
  NOT_LOADING = '[HR_TRANSACTION - MULTIJOBROLE] Not Loading',

  LOAD_DATA = '[HR_TRANSACTION - MULTIJOBROLE] Load Data',
  LOAD_DATA_SUCCESS = '[HR_TRANSACTION - MULTIJOBROLE] Load Data Success',

  LOAD_EMPLOYEE_DATA = '[HR_TRANSACTION - MULTIJOBROLE] Load  EMPLOYEE  Data',
  LOAD_EMPLOYEE_DATA_SUCCESS = '[HR_TRANSACTION - MULTIJOBROLE] Load  EMPLOYEE Data Success',

  LOAD_POSITION_DATA = '[HR_TRANSACTION - MULTIJOBROLE] Load  POSITION  Data',
  LOAD_POSITION_DATA_SUCCESS = '[HR_TRANSACTION - MULTIJOBROLE] Load  POSITION Data Success',

  SAVE = '[HR_TRANSACTION - MULTIJOBROLE] Save',
  SAVE_SUCCESS = '[HR_TRANSACTION - MULTIJOBROLE] Save Success',

  UPDATE = '[HR_TRANSACTION - MULTIJOBROLE] UPDATE',

  DELETE = '[HR_TRANSACTION - MULTIJOBROLE] DELETE',
}


export class ShowEditorMultiJobRoleTransaction implements Action {
  readonly type = MultiJobRoleTransactionActionTypes.SHOW_EDITOR;
}

export class HideEditorMultiJobRoleTransaction implements Action {
  readonly type = MultiJobRoleTransactionActionTypes.HIDE_EDITOR;
}


export class ShowViewerMultiJobRoleTransaction implements Action {
  readonly type = MultiJobRoleTransactionActionTypes.SHOW_VIEWER;
}

export class HideViewerMultiJobRoleTransaction implements Action {
  readonly type = MultiJobRoleTransactionActionTypes.HIDE_VIEWER;
}


export class ProcessingMultiJobRoleTransaction implements Action {
  readonly type = MultiJobRoleTransactionActionTypes.PROCESSING;
}

export class NotProcessingMultiJobRoleTransaction implements Action {
  readonly type = MultiJobRoleTransactionActionTypes.NOT_PROCESSING;
}

export class LoadingMultiJobRoleTransaction implements Action {
  readonly type = MultiJobRoleTransactionActionTypes.LOADING;
}

export class NotLoadingMultiJobRoleTransaction implements Action {
  readonly type = MultiJobRoleTransactionActionTypes.NOT_LOADING;
}

export class LoadMultiJobRoleTransaction implements Action {
  readonly type = MultiJobRoleTransactionActionTypes.LOAD_DATA;


  constructor(public payload: {employeeId:number}) {}
}

export class LoadMultiJobRoleTransactionSuccess implements Action {
  readonly type = MultiJobRoleTransactionActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IMultiRoleJob[]) {}
}

export class LoadEmployeeList implements Action {
  readonly type =MultiJobRoleTransactionActionTypes.LOAD_EMPLOYEE_DATA;
}

export class LoadEmployeeListSuccess implements Action {
  readonly type =MultiJobRoleTransactionActionTypes.LOAD_EMPLOYEE_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadPositionList implements Action {
  readonly type =MultiJobRoleTransactionActionTypes.LOAD_POSITION_DATA;
}

export class LoadPositionListSuccess implements Action {
  readonly type =MultiJobRoleTransactionActionTypes.LOAD_POSITION_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}


export class SaveMultiJobRoleTransaction implements Action {
  readonly type = MultiJobRoleTransactionActionTypes.SAVE;

  constructor(public payload: {data: IMultiRoleJob, employeeId:number}) {}
}

export class UpdateMultiJobRoleTransaction implements Action {
  readonly type = MultiJobRoleTransactionActionTypes.UPDATE;

  constructor(public payload: {data: IMultiRoleJob, recordId:number, employeeId:number}) {}
}

export class DeleteMultiJobRoleTransaction implements Action {
  readonly type = MultiJobRoleTransactionActionTypes.DELETE;

  constructor(public payload: {recordId: any[], employeeId:number}) {}
}

export type MultiJobRoleTransactionActions =
| ShowEditorMultiJobRoleTransaction
| HideEditorMultiJobRoleTransaction
| ShowViewerMultiJobRoleTransaction
| HideViewerMultiJobRoleTransaction
| ProcessingMultiJobRoleTransaction
| NotProcessingMultiJobRoleTransaction
| LoadingMultiJobRoleTransaction
| NotLoadingMultiJobRoleTransaction
| LoadMultiJobRoleTransaction
| LoadMultiJobRoleTransactionSuccess
| LoadEmployeeList
| LoadEmployeeListSuccess
| LoadPositionList
| LoadPositionListSuccess
| SaveMultiJobRoleTransaction
| UpdateMultiJobRoleTransaction
| DeleteMultiJobRoleTransaction;

