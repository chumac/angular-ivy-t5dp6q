import { Action } from '@ngrx/store';
import { IReInstate } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';

export enum ReInstateTransactionActionTypes {

  SHOW_EDITOR = '[HR_TRANSACTION - REINSTATE] Show Editor',
  HIDE_EDITOR = '[HR_TRANSACTION - REINSTATE] Hide Editor',

  SHOW_VIEWER = '[HR_TRANSACTION - REINSTATE] Show Viewer',
  HIDE_VIEWER = '[HR_TRANSACTION - REINSTATE] Hide Viewer',

  PROCESSING = '[HR_TRANSACTION - REINSTATE] Processing',
  NOT_PROCESSING = '[HR_TRANSACTION - REINSTATE] Not Processing',

  LOADING = '[HR_TRANSACTION - REINSTATE] Loading',
  NOT_LOADING = '[HR_TRANSACTION - REINSTATE] Not Loading',

  LOAD_DATA = '[HR_TRANSACTION - REINSTATE] Load Data',
  LOAD_DATA_SUCCESS = '[HR_TRANSACTION - REINSTATE] Load Data Success',

  LOAD_EMPLOYEE_DATA = '[HR_TRANSACTION - REINSTATE] Load  EMPLOYEE  Data',
  LOAD_EMPLOYEE_DATA_SUCCESS = '[HR_TRANSACTION - REINSTATE] Load  EMPLOYEE Data Success',

  LOAD_RECORD_CATEGORY_DATA = '[HR_TRANSACTION - REINSTATE] Load  RECORD_CATEGORY  Data',
  LOAD_RECORD_CATEGORY_DATA_SUCCESS = '[HR_TRANSACTION - REINSTATE] Load  RECORD_CATEGORY Data Success',

  SAVE = '[HR_TRANSACTION - REINSTATE] Save',
  SAVE_SUCCESS = '[HR_TRANSACTION - REINSTATE] Save Success',

  UPDATE = '[HR_TRANSACTION - REINSTATE] UPDATE',

  DELETE = '[HR_TRANSACTION - REINSTATE] DELETE',
}


export class ShowEditorReInstateTransaction implements Action {
  readonly type = ReInstateTransactionActionTypes.SHOW_EDITOR;
}

export class HideEditorReInstateTransaction implements Action {
  readonly type = ReInstateTransactionActionTypes.HIDE_EDITOR;
}


export class ShowViewerReInstateTransaction implements Action {
  readonly type = ReInstateTransactionActionTypes.SHOW_VIEWER;
}

export class HideViewerReInstateTransaction implements Action {
  readonly type = ReInstateTransactionActionTypes.HIDE_VIEWER;
}


export class ProcessingReInstateTransaction implements Action {
  readonly type = ReInstateTransactionActionTypes.PROCESSING;
}

export class NotProcessingReInstateTransaction implements Action {
  readonly type = ReInstateTransactionActionTypes.NOT_PROCESSING;
}

export class LoadingReInstateTransaction implements Action {
  readonly type = ReInstateTransactionActionTypes.LOADING;
}

export class NotLoadingReInstateTransaction implements Action {
  readonly type = ReInstateTransactionActionTypes.NOT_LOADING;
}

export class LoadReInstateTransaction implements Action {
  readonly type = ReInstateTransactionActionTypes.LOAD_DATA;

  constructor() {}
}

export class LoadReInstateTransactionSuccess implements Action {
  readonly type = ReInstateTransactionActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IReInstate[]) {}
}

export class LoadEmployeeList implements Action {
  readonly type =ReInstateTransactionActionTypes.LOAD_EMPLOYEE_DATA;
}

export class LoadEmployeeListSuccess implements Action {
  readonly type =ReInstateTransactionActionTypes.LOAD_EMPLOYEE_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadRecordCategory implements Action {
  readonly type =ReInstateTransactionActionTypes.LOAD_RECORD_CATEGORY_DATA;
}

export class LoadRecordCategorySuccess implements Action {
  readonly type =ReInstateTransactionActionTypes.LOAD_RECORD_CATEGORY_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}


export class SaveReInstateTransaction implements Action {
  readonly type = ReInstateTransactionActionTypes.SAVE;

  constructor(public payload: {data: IReInstate}) {}
}

export class UpdateReInstateTransaction implements Action {
  readonly type = ReInstateTransactionActionTypes.UPDATE;

  constructor(public payload: {data: IReInstate, recordId:number}) {}
}

export class DeleteReInstateTransaction implements Action {
  readonly type = ReInstateTransactionActionTypes.DELETE;

  constructor(public payload: {recordId: number}) {}
}

export type ReInstateTransactionActions =
| ShowEditorReInstateTransaction
| HideEditorReInstateTransaction
| ShowViewerReInstateTransaction
| HideViewerReInstateTransaction
| ProcessingReInstateTransaction
| NotProcessingReInstateTransaction
| LoadingReInstateTransaction
| NotLoadingReInstateTransaction
| LoadReInstateTransaction
| LoadReInstateTransactionSuccess
| LoadEmployeeList
| LoadEmployeeListSuccess
| LoadRecordCategory
| LoadRecordCategorySuccess
| SaveReInstateTransaction
| UpdateReInstateTransaction
| DeleteReInstateTransaction;

