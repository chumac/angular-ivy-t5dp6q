import { Action } from '@ngrx/store';
import { IVariableAllowanceTransaction } from '@nutela/models/compensation/payroll';
import { ISelectOption } from '@nutela/models/core-data';



export enum VariableAllowanceTransactionActionTypes {

  SHOW_EDITOR = '[ VARIABLE ALLOWANCE TRANSACTION] Show Editor',
  HIDE_EDITOR = '[VARIABLE ALLOWANCE TRANSACTION] Hide Editor',

  SHOW_VIEWER = '[ VARIABLE ALLOWANCE TRANSACTION] Show Viewer',
  HIDE_VIEWER = '[VARIABLE ALLOWANCE TRANSACTION] Hide Viewer',

  PROCESSING = '[ VARIABLE ALLOWANCE TRANSACTION ] Processing',
  NOT_PROCESSING = '[ VARIABLE ALLOWANCE TRANSACTION ] Not Processing',

  LOADING = '[ VARIABLE ALLOWANCE TRANSACTION ] LOADING',
  NOT_LOADING = '[ VARIABLE ALLOWANCE TRANSACTION ] Not LOADING',

  LOAD_VARIABLE_ALLOWANCE_TRANSACTION_DATA = '[ VARIABLE ALLOWANCE TRANSACTION] Load VARIABLE ALLOWANCE TRANSACTION Data',
  LOAD_VARIABLE_ALLOWANCE_TRANSACTION_DATA_SUCCESS = '[ VARIABLE ALLOWANCE TRANSACTION] Load VARIABLE ALLOWANCE TRANSACTION Data Success',

  LOAD_VARIABLE_ALLOWANCE_LIST = '[ VARIABLE ALLOWANCE TRANSACTION] Load Variable Allowance List',
  LOAD_VARIABLE_ALLOWANCE_LIST_SUCCESS = '[ VARIABLE ALLOWANCE TRANSACTION] Load Variable Allowance List Success',

  SAVE = '[VARIABLE ALLOWANCE TRANSACTION] Save',
  SAVE_SUCCESS = '[ VARIABLE ALLOWANCE TRANSACTION] Save Success',

  UPDATE = '[UPDATE VARIABLE ALLOWANCE TRANSACTION] UPDATE',
  UPDATE_SUCCESS = '[UPDATE VARIABLE ALLOWANCE TRANSACTION] UPDATE Success',

  DELETE_VARIABLE_ALLOWANCE_TRANSACTION_DATA = '[VARIABLE ALLOWANCE TRANSACTION] Delete VARIABLE ALLOWANCE TRANSACTION Data',
}


export class ShowEditorVariableAllowanceTransaction implements Action {
  readonly type = VariableAllowanceTransactionActionTypes.SHOW_EDITOR;
}

export class HideEditorVariableAllowanceTransaction implements Action {
  readonly type = VariableAllowanceTransactionActionTypes.HIDE_EDITOR;
}

export class ShowViewerVariableAllowanceTransaction implements Action {
  readonly type = VariableAllowanceTransactionActionTypes.SHOW_VIEWER;
}

export class HideViewerVariableAllowanceTransaction implements Action {
  readonly type = VariableAllowanceTransactionActionTypes.HIDE_VIEWER;
}

export class ProcessingVariableAllowanceTransaction implements Action {
  readonly type = VariableAllowanceTransactionActionTypes.PROCESSING;
}

export class NotProcessingVariableAllowanceTransaction implements Action {
  readonly type = VariableAllowanceTransactionActionTypes.NOT_PROCESSING;
}

export class LoadingVariableAllowanceTransaction implements Action {
  readonly type = VariableAllowanceTransactionActionTypes.LOADING;
}

export class NotLoadingVariableAllowanceTransaction implements Action {
  readonly type = VariableAllowanceTransactionActionTypes.NOT_LOADING;
}


export class LoadVariableAllowanceTransactionData implements Action {
  readonly type = VariableAllowanceTransactionActionTypes.LOAD_VARIABLE_ALLOWANCE_TRANSACTION_DATA;
}

export class LoadVariableAllowanceTransactionSuccess implements Action {
  readonly type = VariableAllowanceTransactionActionTypes.LOAD_VARIABLE_ALLOWANCE_TRANSACTION_DATA_SUCCESS;
  constructor(public payload: IVariableAllowanceTransaction[]) {}
}

export class LoadVariableAllowanceListVariableAllowanceTransaction implements Action {
  readonly type = VariableAllowanceTransactionActionTypes.LOAD_VARIABLE_ALLOWANCE_LIST;
}

export class LoadVariableAllowanceListVariableAllowanceTransactionSuccess implements Action {
  readonly type = VariableAllowanceTransactionActionTypes.LOAD_VARIABLE_ALLOWANCE_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class SaveVariableAllowanceTransaction implements Action {
  readonly type = VariableAllowanceTransactionActionTypes.SAVE;
  constructor(public payload: {data: IVariableAllowanceTransaction}) {}
}

export class UpdateVariableAllowanceTransaction implements Action {
  readonly type = VariableAllowanceTransactionActionTypes.UPDATE;
  constructor(public payload: {data: IVariableAllowanceTransaction, recordId: number}) {}
}

export class DeleteVariableAllowanceTransaction implements Action{
  readonly type =VariableAllowanceTransactionActionTypes.DELETE_VARIABLE_ALLOWANCE_TRANSACTION_DATA;
  constructor(public payload: { recordId: number}) {}
}

export type VariableAllowanceTransactionActions =
  | ShowEditorVariableAllowanceTransaction
  | HideEditorVariableAllowanceTransaction
  | ShowViewerVariableAllowanceTransaction
  | HideViewerVariableAllowanceTransaction
  | ProcessingVariableAllowanceTransaction
  | NotProcessingVariableAllowanceTransaction
  | LoadingVariableAllowanceTransaction
  | NotLoadingVariableAllowanceTransaction
  | LoadVariableAllowanceTransactionData
  | LoadVariableAllowanceTransactionSuccess
  | LoadVariableAllowanceListVariableAllowanceTransaction
  | LoadVariableAllowanceListVariableAllowanceTransactionSuccess
  | SaveVariableAllowanceTransaction
  | UpdateVariableAllowanceTransaction
  | DeleteVariableAllowanceTransaction;
