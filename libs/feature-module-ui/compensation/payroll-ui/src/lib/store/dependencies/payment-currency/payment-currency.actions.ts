import { Action } from '@ngrx/store';
import { ICurrency } from '@nutela/models/compensation/payroll';



export enum CurrencyActionTypes {

  SHOW_EDITOR = '[ CURRENCY] Show Editor',
  HIDE_EDITOR = '[CURRENCY] Hide Editor',

  PROCESSING = '[ CURRENCY ] Processing',
  NOT_PROCESSING = '[ CURRENCY ] Not Processing',

  LOADING = '[ CURRENCY ] LOADING',
  NOT_LOADING = '[ CURRENCY ] Not LOADING',

  LOAD_CURRENCY_DATA = '[ CURRENCY] Load CURRENCY Data',
  LOAD_CURRENCY_DATA_SUCCESS = '[ CURRENCY] Load CURRENCY Data Success',

  SAVE = '[CURRENCY] Save',
  SAVE_SUCCESS = '[ CURRENCY] Save Success',

  UPDATE = '[UPDATE CURRENCY] UPDATE',
  UPDATE_SUCCESS = '[UPDATE CURRENCY] UPDATE Success',

  DELETE_CURRENCY_DATA = '[CURRENCY] Delete CURRENCY Data',
}


export class ShowEditorCurrency implements Action {
  readonly type = CurrencyActionTypes.SHOW_EDITOR;
}

export class HideEditorCurrency implements Action {
  readonly type = CurrencyActionTypes.HIDE_EDITOR;
}

export class ProcessingCurrency implements Action {
  readonly type = CurrencyActionTypes.PROCESSING;
}

export class NotProcessingCurrency implements Action {
  readonly type = CurrencyActionTypes.NOT_PROCESSING;
}

export class LoadingCurrency implements Action {
  readonly type = CurrencyActionTypes.LOADING;
}

export class NotLoadingCurrency implements Action {
  readonly type = CurrencyActionTypes.NOT_LOADING;
}


export class LoadCurrencyData implements Action {
  readonly type = CurrencyActionTypes.LOAD_CURRENCY_DATA;
}

export class LoadCurrencySuccess implements Action {
  readonly type = CurrencyActionTypes.LOAD_CURRENCY_DATA_SUCCESS;
  constructor(public payload: ICurrency[]) {}
}

export class SaveCurrency implements Action {
  readonly type = CurrencyActionTypes.SAVE;
  constructor(public payload: {data: ICurrency}) {}
}

export class UpdateCurrency implements Action {
  readonly type = CurrencyActionTypes.UPDATE;
  constructor(public payload: {data: ICurrency, recordId: number}) {}
}

export class DeleteCurrency implements Action{
  readonly type =CurrencyActionTypes.DELETE_CURRENCY_DATA;
  constructor(public payload: { recordId: number}) {}
}

export type CurrencyActions =
  | ShowEditorCurrency
  | HideEditorCurrency
  | ProcessingCurrency
  | NotProcessingCurrency
  | LoadingCurrency
  | NotLoadingCurrency
  | LoadCurrencyData
  | LoadCurrencySuccess
  | SaveCurrency
  | UpdateCurrency
  | DeleteCurrency;
