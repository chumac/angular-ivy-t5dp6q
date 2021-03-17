import { Action } from '@ngrx/store';
import { ISeparation } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';

export enum SeparationTransactionActionTypes {

  SHOW_EDITOR = '[HR_TRANSACTION - SEPARATIONS] Show Editor',
  HIDE_EDITOR = '[HR_TRANSACTION - SEPARATIONS] Hide Editor',

  SHOW_VIEWER = '[HR_TRANSACTION - SEPARATIONS] Show Viewer',
  HIDE_VIEWER = '[HR_TRANSACTION - SEPARATIONS] Hide Viewer',

  PROCESSING = '[HR_TRANSACTION - SEPARATIONS] Processing',
  NOT_PROCESSING = '[HR_TRANSACTION - SEPARATIONS] Not Processing',

  LOADING = '[HR_TRANSACTION - SEPARATIONS] Loading',
  NOT_LOADING = '[HR_TRANSACTION - SEPARATIONS] Not Loading',

  LOAD_DATA = '[HR_TRANSACTION - SEPARATIONS] Load Data',
  LOAD_DATA_SUCCESS = '[HR_TRANSACTION - SEPARATIONS] Load Data Success',

  LOAD_EMPLOYEE_DATA = '[HR_TRANSACTION - SEPARATIONS] Load  EMPLOYEE  Data',
  LOAD_EMPLOYEE_DATA_SUCCESS = '[HR_TRANSACTION - SEPARATIONS] Load  EMPLOYEE Data Success',

  LOAD_STATUS_DATA = '[HR_TRANSACTION - SEPARATIONS] Load  STATUS  Data',
  LOAD_STATUS_DATA_SUCCESS = '[HR_TRANSACTION - SEPARATIONS] Load  STATUS Data Success',

  LOAD_REASONS_DATA = '[HR_TRANSACTION - SEPARATIONS] Load  REASONS  Data',
  LOAD_REASONS_DATA_SUCCESS = '[HR_TRANSACTION - SEPARATIONS] Load  REASONS Data Success',

  LOAD_ALLOWANCE_DATA = '[HR_TRANSACTION - SEPARATIONS] Load  ALLOWANCE  Data',
  LOAD_ALLOWANCE_DATA_SUCCESS = '[HR_TRANSACTION - SEPARATIONS] Load  ALLOWANCE Data Success',

  LOAD_CURRENCY_DATA = '[HR_TRANSACTION - SEPARATIONS] Load  CURRENCY  Data',
  LOAD_CURRENCY_DATA_SUCCESS = '[HR_TRANSACTION - SEPARATIONS] Load  CURRENCY Data Success',

  SAVE = '[HR_TRANSACTION - SEPARATIONS] Save',
  SAVE_SUCCESS = '[HR_TRANSACTION - SEPARATIONS] Save Success',

  UPDATE = '[HR_TRANSACTION - SEPARATIONS] UPDATE',

  DELETE = '[HR_TRANSACTION - SEPARATIONS] DELETE',
}


export class ShowEditorSeparationTransaction implements Action {
  readonly type = SeparationTransactionActionTypes.SHOW_EDITOR;
}

export class HideEditorSeparationTransaction implements Action {
  readonly type = SeparationTransactionActionTypes.HIDE_EDITOR;
}


export class ShowViewerSeparationTransaction implements Action {
  readonly type = SeparationTransactionActionTypes.SHOW_VIEWER;
}

export class HideViewerSeparationTransaction implements Action {
  readonly type = SeparationTransactionActionTypes.HIDE_VIEWER;
}


export class ProcessingSeparationTransaction implements Action {
  readonly type = SeparationTransactionActionTypes.PROCESSING;
}

export class NotProcessingSeparationTransaction implements Action {
  readonly type = SeparationTransactionActionTypes.NOT_PROCESSING;
}

export class LoadingSeparationTransaction implements Action {
  readonly type = SeparationTransactionActionTypes.LOADING;
}

export class NotLoadingSeparationTransaction implements Action {
  readonly type = SeparationTransactionActionTypes.NOT_LOADING;
}

export class LoadSeparationTransaction implements Action {
  readonly type = SeparationTransactionActionTypes.LOAD_DATA;

  constructor() {}
}

export class LoadSeparationTransactionSuccess implements Action {
  readonly type = SeparationTransactionActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: ISeparation[]) {}
}

export class LoadEmployeeList implements Action {
  readonly type =SeparationTransactionActionTypes.LOAD_EMPLOYEE_DATA;
}

export class LoadEmployeeListSuccess implements Action {
  readonly type =SeparationTransactionActionTypes.LOAD_EMPLOYEE_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadStatus implements Action {
  readonly type =SeparationTransactionActionTypes.LOAD_STATUS_DATA;
}

export class LoadStatusSuccess implements Action {
  readonly type =SeparationTransactionActionTypes.LOAD_STATUS_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadReason implements Action {
  readonly type =SeparationTransactionActionTypes.LOAD_REASONS_DATA;
}

export class LoadReasonSuccess implements Action {
  readonly type =SeparationTransactionActionTypes.LOAD_REASONS_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}


export class LoadAllowance implements Action {
  readonly type =SeparationTransactionActionTypes.LOAD_ALLOWANCE_DATA;
}

export class LoadAllowanceSuccess implements Action {
  readonly type =SeparationTransactionActionTypes.LOAD_ALLOWANCE_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}

export class LoadCurrency implements Action {
  readonly type =SeparationTransactionActionTypes.LOAD_CURRENCY_DATA;
}

export class LoadCurrencySuccess implements Action {
  readonly type =SeparationTransactionActionTypes.LOAD_CURRENCY_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}


export class SaveSeparationTransaction implements Action {
  readonly type = SeparationTransactionActionTypes.SAVE;

  constructor(public payload: {data: ISeparation}) {}
}

export class UpdateSeparationTransaction implements Action {
  readonly type = SeparationTransactionActionTypes.UPDATE;

  constructor(public payload: {data: ISeparation, recordId:number}) {}
}

export class DeleteSeparationTransaction implements Action {
  readonly type = SeparationTransactionActionTypes.DELETE;

  constructor(public payload: {recordId: number}) {}
}

export type SeparationTransactionActions =
| ShowEditorSeparationTransaction
| HideEditorSeparationTransaction
| ShowViewerSeparationTransaction
| HideViewerSeparationTransaction
| ProcessingSeparationTransaction
| NotProcessingSeparationTransaction
| LoadingSeparationTransaction
| NotLoadingSeparationTransaction
| LoadSeparationTransaction
| LoadSeparationTransactionSuccess
| LoadEmployeeList
| LoadEmployeeListSuccess
| LoadStatus
| LoadStatusSuccess
| LoadReason
| LoadReasonSuccess
| LoadAllowance
| LoadAllowanceSuccess
| LoadCurrency
| LoadCurrencySuccess
| SaveSeparationTransaction
| UpdateSeparationTransaction
| DeleteSeparationTransaction;

