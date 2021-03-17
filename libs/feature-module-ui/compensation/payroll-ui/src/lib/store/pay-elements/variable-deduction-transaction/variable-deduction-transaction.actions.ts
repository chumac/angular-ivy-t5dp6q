import { Action } from '@ngrx/store';
import { IVariableDeductionTransaction } from '@nutela/models/compensation/payroll';
import { ISelectOption } from '@nutela/models/core-data';



export enum VariableDeductionTransactionActionTypes {

  SHOW_EDITOR = '[ VARIABLE DEDUCTION TRANSACTION] Show Editor',
  HIDE_EDITOR = '[VARIABLE DEDUCTION TRANSACTION] Hide Editor',

  SHOW_VIEWER = '[ VARIABLE DEDUCTION TRANSACTION] Show Viewer',
  HIDE_VIEWER = '[VARIABLE DEDUCTION TRANSACTION] Hide Viewer',

  PROCESSING = '[ VARIABLE DEDUCTION TRANSACTION ] Processing',
  NOT_PROCESSING = '[ VARIABLE DEDUCTION TRANSACTION ] Not Processing',

  LOADING = '[ VARIABLE DEDUCTION TRANSACTION ] LOADING',
  NOT_LOADING = '[ VARIABLE DEDUCTION TRANSACTION ] Not LOADING',

  LOAD_VARIABLE_DEDUCTION_TRANSACTION_DATA = '[ VARIABLE DEDUCTION TRANSACTION] Load VARIABLE DEDUCTION TRANSACTION Data',
  LOAD_VARIABLE_DEDUCTION_TRANSACTION_DATA_SUCCESS = '[ VARIABLE DEDUCTION TRANSACTION] Load VARIABLE DEDUCTION TRANSACTION Data Success',

  LOAD_VARIABLE_DEDUCTION_LIST = '[ VARIABLE DEDUCTION TRANSACTION] Load Variable Deduction List',
  LOAD_VARIABLE_DEDUCTION_LIST_SUCCESS = '[ VARIABLE DEDUCTION TRANSACTION] Load Variable Deduction List Success',

  SAVE = '[VARIABLE DEDUCTION TRANSACTION] Save',
  SAVE_SUCCESS = '[ VARIABLE DEDUCTION TRANSACTION] Save Success',

  UPDATE = '[UPDATE VARIABLE DEDUCTION TRANSACTION] UPDATE',
  UPDATE_SUCCESS = '[UPDATE VARIABLE DEDUCTION TRANSACTION] UPDATE Success',

  DELETE_VARIABLE_DEDUCTION_TRANSACTION_DATA = '[VARIABLE DEDUCTION TRANSACTION] Delete VARIABLE DEDUCTION TRANSACTION Data',
}


export class ShowEditorVariableDeductionTransaction implements Action {
  readonly type = VariableDeductionTransactionActionTypes.SHOW_EDITOR;
}

export class HideEditorVariableDeductionTransaction implements Action {
  readonly type = VariableDeductionTransactionActionTypes.HIDE_EDITOR;
}

export class ShowViewerVariableDeductionTransaction implements Action {
  readonly type = VariableDeductionTransactionActionTypes.SHOW_VIEWER;
}

export class HideViewerVariableDeductionTransaction implements Action {
  readonly type = VariableDeductionTransactionActionTypes.HIDE_VIEWER;
}

export class ProcessingVariableDeductionTransaction implements Action {
  readonly type = VariableDeductionTransactionActionTypes.PROCESSING;
}

export class NotProcessingVariableDeductionTransaction implements Action {
  readonly type = VariableDeductionTransactionActionTypes.NOT_PROCESSING;
}

export class LoadingVariableDeductionTransaction implements Action {
  readonly type = VariableDeductionTransactionActionTypes.LOADING;
}

export class NotLoadingVariableDeductionTransaction implements Action {
  readonly type = VariableDeductionTransactionActionTypes.NOT_LOADING;
}


export class LoadVariableDeductionTransactionData implements Action {
  readonly type = VariableDeductionTransactionActionTypes.LOAD_VARIABLE_DEDUCTION_TRANSACTION_DATA;
}

export class LoadVariableDeductionTransactionSuccess implements Action {
  readonly type = VariableDeductionTransactionActionTypes.LOAD_VARIABLE_DEDUCTION_TRANSACTION_DATA_SUCCESS;
  constructor(public payload: IVariableDeductionTransaction[]) {}
}

export class LoadVariableDeductionListVariableDeductionTransaction implements Action {
  readonly type = VariableDeductionTransactionActionTypes.LOAD_VARIABLE_DEDUCTION_LIST;
}

export class LoadVariableDeductionListVariableDeductionTransactionSuccess implements Action {
  readonly type = VariableDeductionTransactionActionTypes.LOAD_VARIABLE_DEDUCTION_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class SaveVariableDeductionTransaction implements Action {
  readonly type = VariableDeductionTransactionActionTypes.SAVE;
  constructor(public payload: {data: IVariableDeductionTransaction}) {}
}

export class UpdateVariableDeductionTransaction implements Action {
  readonly type = VariableDeductionTransactionActionTypes.UPDATE;
  constructor(public payload: {data: IVariableDeductionTransaction, recordId: number}) {}
}

export class DeleteVariableDeductionTransaction implements Action{
  readonly type =VariableDeductionTransactionActionTypes.DELETE_VARIABLE_DEDUCTION_TRANSACTION_DATA;
  constructor(public payload: { recordId: number}) {}
}

export type VariableDeductionTransactionActions =
  | ShowEditorVariableDeductionTransaction
  | HideEditorVariableDeductionTransaction
  | ShowViewerVariableDeductionTransaction
  | HideViewerVariableDeductionTransaction
  | ProcessingVariableDeductionTransaction
  | NotProcessingVariableDeductionTransaction
  | LoadingVariableDeductionTransaction
  | NotLoadingVariableDeductionTransaction
  | LoadVariableDeductionTransactionData
  | LoadVariableDeductionTransactionSuccess
  | LoadVariableDeductionListVariableDeductionTransaction
  | LoadVariableDeductionListVariableDeductionTransactionSuccess
  | SaveVariableDeductionTransaction
  | UpdateVariableDeductionTransaction
  | DeleteVariableDeductionTransaction;
