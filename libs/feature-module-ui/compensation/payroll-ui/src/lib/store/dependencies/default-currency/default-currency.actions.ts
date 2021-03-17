import { Action } from '@ngrx/store';
import { IDefaultCurrency } from '@nutela/models/compensation/payroll';



export enum DefaultCurrencyActionTypes {

  SHOW_EDITOR = '[ PAYROLL - DEFAULT CURRENCY ] Show Editor',
  HIDE_EDITOR = '[PAYROLL - DEFAULT CURRENCY ] Hide Editor',

  PROCESSING = '[ PAYROLL - DEFAULT CURRENCY  ] Processing',
  NOT_PROCESSING = '[ PAYROLL - DEFAULT CURRENCY  ] Not Processing',

  LOADING = '[ PAYROLL - DEFAULT CURRENCY  ] Loading',
  NOT_LOADING = '[ PAYROLL - DEFAULT CURRENCY  ] Not Loading',

  LOAD_DEFAULT_CURRENCY_DATA = '[ PAYROLL - DEFAULT CURRENCY] Load Default Currency Data',
  LOAD_DEFAULT_CURRENCY_DATA_SUCCESS = '[ PAYROLL - DEFAULT CURRENCY] Load Default Currency Data Success',

  SAVE = '[PAYROLL - DEFAULT CURRENCY] Save',
  SAVE_SUCCESS = '[ PAYROLL - DEFAULT CURRENCY] Save Success',

  UPDATE = '[ PAYROLL - DEFAULT CURRENCY] Update',
  UPDATE_SUCCESS = '[ PAYROLL - DEFAULT CURRENCY] Update Success',

  DELETE_DATA = '[ PAYROLL - DEFAULT CURRENCY ] Delete Record',
}


export class ShowEditorDefaultCurrency implements Action {
  readonly type = DefaultCurrencyActionTypes.SHOW_EDITOR;
}

export class HideEditorDefaultCurrency implements Action {
  readonly type = DefaultCurrencyActionTypes.HIDE_EDITOR;
}

export class ProcessingDefaultCurrency implements Action {
  readonly type = DefaultCurrencyActionTypes.PROCESSING;
}

export class NotProcessingDefaultCurrency implements Action {
  readonly type = DefaultCurrencyActionTypes.NOT_PROCESSING;
}

export class LoadingDefaultCurrency implements Action {
  readonly type = DefaultCurrencyActionTypes.LOADING;
}

export class NotLoadingDefaultCurrency implements Action {
  readonly type = DefaultCurrencyActionTypes.NOT_LOADING;
}


export class LoadDefaultCurrencyData implements Action {
  readonly type = DefaultCurrencyActionTypes.LOAD_DEFAULT_CURRENCY_DATA;
}

export class LoadDefaultCurrencySuccess implements Action {
  readonly type = DefaultCurrencyActionTypes.LOAD_DEFAULT_CURRENCY_DATA_SUCCESS;
  constructor(public payload: IDefaultCurrency[]) {}
}

export class SaveDefaultCurrency implements Action {
  readonly type = DefaultCurrencyActionTypes.SAVE;
  constructor(public payload: {data: IDefaultCurrency}) {}
}

export class UpdateDefaultCurrency implements Action {
  readonly type = DefaultCurrencyActionTypes.UPDATE;
  constructor(public payload: {data: IDefaultCurrency, recordId: number}) {}
}

export class DeleteDefaultCurrency implements Action{
  readonly type =DefaultCurrencyActionTypes.DELETE_DATA;
  constructor(public payload: { recordId: number}) {}
}

export type DefaultCurrencyActions =
  | ShowEditorDefaultCurrency
  | HideEditorDefaultCurrency
  | ProcessingDefaultCurrency
  | NotProcessingDefaultCurrency
  | LoadingDefaultCurrency
  | NotLoadingDefaultCurrency
  | LoadDefaultCurrencyData
  | LoadDefaultCurrencySuccess
  | SaveDefaultCurrency
  | UpdateDefaultCurrency
  | DeleteDefaultCurrency;
